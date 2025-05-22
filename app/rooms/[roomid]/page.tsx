"use client"
import { useAuth } from '@/app/contexts/AuthProvider';
import { format, differenceInDays, addDays } from 'date-fns';
import { supabase } from '@/app/integration/supabase/client';
import { Enums, Tables, TablesInsert } from '@/app/integration/supabase/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, Bed, Calendar, CalendarIcon, CheckCircle, CheckIcon, ChevronLeft, Loader2, MinusIcon, PlusIcon, SquareDot, User } from 'lucide-react';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from '@/components/ui/Button';
import { id } from 'date-fns/locale';

const fetchRoomDetails = async (roomId: string): Promise<Tables<'rooms'> | null> => {
    if (!roomId) {
        console.error("fetchRoomDetails called with undefined roomId");
        return null;
    }
    const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', roomId)
        .single();

    if (error) {
        console.error('Error fetching room details:', error);
        throw new Error(error.message);
    }
    return data;
};

const RoomDetailPage = () => {

    const { roomId } = useParams<{ roomId: string }>();
    const { user } = useAuth();
    const queryClient = useQueryClient();
console.log("Room ID:", roomId);
    const { data: rooms, isLoading, error } = useQuery<Tables<'rooms'> | null>({
        queryKey: ['room', roomId],
        queryFn: () => {
            if (!roomId) return Promise.resolve(null);
            return fetchRoomDetails(roomId);
        },
        enabled: !!roomId,
    });

    const [bookingDetails, setBookingDetails] = useState<{
        checkInDate: Date;
        checkOutDate: Date;
        guests: number;
    }>({
        checkInDate: new Date(),
        checkOutDate: addDays(new Date(), 1),
        guests: 1,
    });
    const [totalCost, setTotalCost] = useState<number>(0);

    useEffect(() => {
        if (rooms && bookingDetails.checkInDate && bookingDetails.checkOutDate) {
            const nights = differenceInDays(bookingDetails.checkOutDate, bookingDetails.checkInDate);
            if (nights > 0) {
                setTotalCost(nights * Number(rooms.price_per_night));
            } else {
                setTotalCost(0);
            }
        }
    }, [rooms, bookingDetails.checkInDate, bookingDetails.checkOutDate]);

    const handleDateChange = (field: 'checkInDate' | 'checkOutDate', date?: Date) => {
        if (date) {
            setBookingDetails(prev => {
                const newDetails = { ...prev, [field]: date };
                if (field === 'checkInDate' && newDetails.checkOutDate <= date) {
                    newDetails.checkOutDate = addDays(date, 1);
                }
                if (field === 'checkOutDate' && newDetails.checkInDate >= date) {
                    newDetails.checkInDate = addDays(date, -1);
                }
                return newDetails;
            });
        }
    };

    const handleGuestChange = (amount: number) => {
        setBookingDetails(prev => ({
            ...prev,
            guests: Math.max(1, Math.min(prev.guests + amount, rooms?.capacity || 1)),
        }));
    };

    const createBookingMutation = useMutation({
        mutationFn: async (newBooking: TablesInsert<'bookings'>) => {
            const { data, error: insertError } = await supabase
                .from('bookings')
                .insert(newBooking)
                .select()
                .single();

            if (insertError) {
                console.error('Error creating booking:', insertError);
                throw insertError;
            }
            return data;
        },
        onSuccess: () => {
            toast("Booking Created Successfully");
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            //redirect('/booking-success');  Redirect to a success page
        },
        onError: (err: Error) => {
            toast.error(`Error creating booking: ${err.message}`);
        },
    });

    const handleBookingSubmit = async () => {
        if (!user) {
            toast.info("Please log in to book a room.");
            redirect('/login');
        }
        if (!rooms || !roomId) {
            toast.info("Room details not available.");
            return;
        }
        if (differenceInDays(bookingDetails.checkOutDate, bookingDetails.checkInDate) <= 0) {
            toast.info("Check-out date must be after check-in date.");
            return;
        }

        const bookingData: TablesInsert<'bookings'> = {
            user_id: user.id,
            room_id: roomId,
            check_in_date: format(bookingDetails.checkInDate, 'yyyy-MM-dd'),
            check_out_date: format(bookingDetails.checkOutDate, 'yyyy-MM-dd'),
            number_of_guests: bookingDetails.guests,
            total_amount: totalCost,
            status: 'Pending' as Enums<'booking_status_enum'>,
        };
        console.log("Submitting booking:", bookingData);
        createBookingMutation.mutate(bookingData);
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="h-12 w-12 animate-spin text-hotel-primary" />
        </div>
    );
    if (error || !rooms) return (
        <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
            <AlertCircle className="h-12 w-12 mb-4" />
            <p className="text-xl">Error loading room details.</p>
            <p>{error?.message || "The room could not be found."}</p>
            <Link href="/rooms" className="mt-4 btn-secondary">Back to Rooms</Link>
        </div>
    );

    const nights = differenceInDays(bookingDetails.checkOutDate, bookingDetails.checkInDate);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Navigation */}
            <div className="py-8 bg-white shadow-sm">
                <div className="hotel-container">
                    <Link href="/rooms" className="inline-flex items-center text-hotel-primary hover:text-hotel-secondary transition-colors">
                        <ChevronLeft size={20} className="mr-1" />
                        Back to Rooms
                    </Link>
                </div>
            </div>

            <div className="hotel-container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Room Images and Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={rooms.image_url || "https://images.unsplash.com/photo-1560185009-dddeb820c7b7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"}
                                alt={rooms.name}
                                className="w-full h-[400px] object-cover"
                            />
                            <div className="p-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-hotel-dark mb-4">{rooms.name}</h1>
                                <p className="text-hotel-muted mb-6">{rooms.description || "No description available."}</p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
                                    <div className="flex items-center text-hotel-dark">
                                        <User size={20} className="mr-2 text-hotel-primary" />
                                        <span>Capacity: {rooms.capacity} Guests</span>
                                    </div>
                                    <div className="flex items-center text-hotel-dark">
                                        <Bed size={20} className="mr-2 text-hotel-primary" />
                                        <span>Beds: {0} {/* TODO: Add beds to DB */}</span>
                                    </div>
                                    <div className="flex items-center text-hotel-dark">
                                        <SquareDot size={20} className="mr-2 text-hotel-primary" />
                                        <span>Size: {0} m² {/* TODO: Add size to DB */}</span>
                                    </div>
                                </div>

                                <h2 className="text-xl font-semibold text-hotel-dark mb-3">Amenities</h2>
                                {rooms.facilites && rooms.facilites.length > 0 ? (
                                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-hotel-muted">
                                        {rooms.facilites.map(facility => (
                                            <li key={facility} className="flex items-center">
                                                <CheckCircle size={16} className="mr-2 text-green-500" />
                                                {facility}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-hotel-muted">No specific amenities listed for this room.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <h2 className="text-2xl font-semibold text-hotel-dark mb-2">Book Your Stay</h2>
                            <div className="text-3xl font-bold text-hotel-primary mb-1">
                                ${Number(rooms.price_per_night).toFixed(2)} <span className="text-sm font-normal text-hotel-muted">/ night</span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="checkInDate" className="block text-sm font-medium text-hotel-dark mb-1">Check-in Date</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button className="w-full justify-start text-left font-normal cursor-pointer">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {bookingDetails.checkInDate ? format(bookingDetails.checkInDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <input
                                                type='date'
                                                value={bookingDetails.checkInDate.toDateString()}
                                                onChange={(e) => handleDateChange('checkInDate', e.target.value ? new Date(e.target.value) : undefined)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            //disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div>
                                    <label htmlFor="checkOutDate" className="block text-sm font-medium text-hotel-dark mb-1">Check-out Date</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button className="w-full justify-start text-left font-normal cursor-pointer">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {bookingDetails.checkOutDate ? format(bookingDetails.checkOutDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <input
                                                type='date'
                                                value={bookingDetails.checkOutDate.toDateString()}
                                                onChange={(e) => handleDateChange('checkOutDate', e.target.value ? new Date(e.target.value) : undefined)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            //disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div>
                                    <label htmlFor="guests" className="block text-sm font-medium text-hotel-dark mb-1">Guests</label>
                                    <div className="flex items-center justify-between border border-gray-300 rounded-md p-2">
                                        <Button onClick={() => handleGuestChange(-1)} disabled={bookingDetails.guests <= 1}>
                                            <MinusIcon className="h-4 w-4" />
                                        </Button>
                                        <span>{bookingDetails.guests} Guest{bookingDetails.guests > 1 ? 's' : ''}</span>
                                        <Button onClick={() => handleGuestChange(1)} disabled={bookingDetails.guests >= (rooms.capacity || 1)}>
                                            <PlusIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {nights > 0 && (
                                <div className="space-y-2 mb-6 text-sm">
                                    <div className="flex justify-between">
                                        <span>${Number(rooms.price_per_night).toFixed(2)} x {nights} night{nights > 1 ? 's' : ''}</span>
                                        <span>${(Number(rooms.price_per_night) * nights).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-lg text-hotel-dark">
                                        <span>Total</span>
                                        <span>${totalCost.toFixed(2)}</span>
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={handleBookingSubmit}
                                className="w-full btn-primary text-lg py-3"
                                disabled={createBookingMutation.isPending || nights <= 0}
                            >
                                {createBookingMutation.isPending ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : null}
                                Book Now
                            </Button>
                            {!user && (
                                <p className="text-xs text-center mt-2 text-hotel-muted">You need to <Link href="/login" className="underline hover:text-hotel-primary">log in</Link> to book.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailPage
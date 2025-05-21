"use client"
import { useAuth } from '@/app/contexts/AuthProvider';
import { format, differenceInDays, addDays } from 'date-fns';
import { supabase } from '@/app/integration/supabase/client';
import { Enums, Tables, TablesInsert } from '@/app/integration/supabase/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, Bed, Calendar, CheckIcon, Loader2, User } from 'lucide-react';
import Image from 'next/image';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Link from 'next/link';

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

    const { id: roomId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const queryClient = useQueryClient();

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
                .single(); // Assuming you want the created booking back

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
        <div className='py-24 px-4 bg-neutral-100'>
            <div className='w-full col-span-12'>
                <Image src={rooms?.image_url as string} alt='hotel-image'
                    height={400}
                    width={700}
                    className='w-full h-96 object-cover rounded-lg'
                />
            </div>

            <div className='grid grid-cols-12 gap-6 mt-8'>
                <div className='col-span-12 lg:col-span-8'>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-2xl font-bold'>{rooms?.name}</h2>
                            <div className='bg-yellow-600 rounded-full p-2 text-sm text-white text-center'>{rooms?.type ? "Featured Room" : "New"}</div>
                        </div>
                        <div className=''>
                            <span className='text-yellow-800 text-2xl font-bold'>{rooms?.price_per_night}</span> /night
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-8 text-sm text-neutral-500 mt-4">
                        <div className="flex items-center">
                            <User size={18} className="mr-1" />
                            <span>{rooms?.capacity} Guests</span>
                        </div>
                        <div className="flex items-center">
                            <Bed size={18} className="mr-1" />
                            <span>{rooms?.capacity} {rooms.capacity > 1 ? 'Beds' : 'Bed'}</span>
                        </div>
                        <div>
                            <span>{rooms.capacity} m²</span>
                        </div>
                    </div>

                    <hr className='text-neutral-300 mb-5' />

                    <div className='flex flex-col gap-4'>
                        <h2 className='text-xl font-bold'>Description</h2>
                        <p>Experience comfort and luxury in our {rooms?.name}</p>
                    </div>

                    <div className='flex flex-col gap-4 my-8'>
                        <h2 className='text-xl font-bold'>Room Facilites</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                            {rooms.facilites?.map((facility, index) => (
                                <div key={index} className="flex items-center">
                                    <CheckIcon size={16} className="text-yellow-800 mr-2" />
                                    <span>{facility}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className='text-neutral-300 mb-5' />

                    <div className='mt-8'>
                        <h2 className="text-xl font-semibold mb-4">Hotel Policies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold mb-2">Check-in / Check-out</h3>
                                <p className="text-sm text-hotel-muted mb-1">Check-in: After 3:00 PM</p>
                                <p className="text-sm text-hotel-muted">Check-out: Before 11:00 AM</p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">Cancellation</h3>
                                <p className="text-sm text-hotel-muted">
                                    Free cancellation up to 48 hours before check-in. Cancellations made within 48 hours of check-in are subject to a one-night charge.
                                </p>
                            </div>
                        </div>
                    </div>
                </div >

                <div className='col-span-4 lg:col-span-4'>
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <h2 className="text-xl font-semibold mb-4">Book This Room</h2>
                           
                        </div >
                    </div >
                </div >
            </div >
        </div >
    )
}

export default RoomDetailPage
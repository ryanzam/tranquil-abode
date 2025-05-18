"use client"
import { allRooms } from '@/app/data/MockData';
import { Bed, Calendar, CheckIcon, User } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

const RoomDetailPage = () => {

    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [guests, setGuests] = useState(1);

    const { roomid } = useParams();

    const room = allRooms.find((room) => room.id === Number(roomid));

    if (!room) {
        return <div className='text-center py-24'>Room not found</div>
    }

    return (
        <div className='py-24 px-4 bg-neutral-100'>
            <div className='w-full col-span-12'>
                <Image src={room?.image as string} alt='hotel-image'
                    height={400}
                    width={700}
                    className='w-full h-96 object-cover rounded-lg'
                />
            </div>

            <div className='grid grid-cols-12 gap-6 mt-8'>
                <div className='col-span-12 lg:col-span-8'>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-2xl font-bold'>{room?.name}</h2>
                            <div className='bg-yellow-600 rounded-full p-2 text-sm text-white text-center'>{room?.featured ? "Featured Room" : "New"}</div>
                        </div>
                        <div className=''>
                            <span className='text-yellow-800 text-2xl font-bold'>{room?.price}</span> /night
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-8 text-sm text-neutral-500 mt-4">
                        <div className="flex items-center">
                            <User size={18} className="mr-1" />
                            <span>{room?.capacity} Guests</span>
                        </div>
                        <div className="flex items-center">
                            <Bed size={18} className="mr-1" />
                            <span>{room?.beds} {room.beds > 1 ? 'Beds' : 'Bed'}</span>
                        </div>
                        <div>
                            <span>{room.size} m²</span>
                        </div>
                    </div>

                    <hr className='text-neutral-300 mb-5' />

                    <div className='flex flex-col gap-4'>
                        <h2 className='text-xl font-bold'>Description</h2>
                        <p>Experience comfort and luxury in our {room?.name}</p>
                    </div>

                    <div className='flex flex-col gap-4 my-8'>
                        <h2 className='text-xl font-bold'>Room Facilites</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                            {room.facilities.map((facility, index) => (
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
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Check-in Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-hotel-primary"
                                            value={checkInDate}
                                            onChange={(e) => setCheckInDate(e.target.value)}
                                            required
                                        />
                                        <Calendar className="absolute right-3 top-2 text-hotel-muted" size={18} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Check-out Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-hotel-primary"
                                            value={checkOutDate}
                                            onChange={(e) => setCheckOutDate(e.target.value)}
                                            required
                                        />
                                        <Calendar className="absolute right-3 top-2 text-hotel-muted" size={18} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Guests</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-hotel-primary"
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value))}
                                        required
                                    >
                                        {[...Array(room.capacity)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div className="flex justify-between items-center font-medium">
                                    <span>Total</span>
                                    <span className="text-xl text-hotel-primary">${room.price}</span>
                                </div>

                                <button className="w-full btn-primary" type="submit">
                                    Book Now
                                </button>

                                <p className="text-xs text-center text-hotel-muted">
                                    Payment will be collected at the hotel reception.
                                </p>
                            </form >
                        </div >
                    </div >
                </div >
            </div >
        </div >
    )
}

export default RoomDetailPage
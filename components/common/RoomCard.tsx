import { Bed, CheckIcon, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export interface RoomCardProps {
    id: string;
    name: string;
    image: string;
    price: number;
    capacity: number;
    beds: number;
    size: number;
    featured?: boolean;
    facilities?: string[];
}

const RoomCard: React.FC<RoomCardProps> = ({
    id,
    name,
    image,
    price,
    capacity,
    beds,
    size,
    featured = false,
    facilities = []
}) => {
    return (
        <div className="group relative block overflow-hidden shadow-md">
            <span
                className="absolute -top-px -right-px rounded-tr-3xl rounded-bl-3xl bg-yellow-800 px-6 py-4 font-medium tracking-widest text-white uppercase"
            >
                {featured ? "Featured" : "New"}
            </span>

            <img
                src={image}
                alt=""
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-gray-100 bg-white p-6">
                <h3 className="mt-4 text-lg font-medium text-gray-900">{name}</h3>

                <div className='grid grid-cols-3 py-3 text-neutral-500 text-sm'>
                    <div className='flex items-center'>
                        <User size={16} />
                        <span>{capacity} Guests</span>
                    </div>
                    <div className='flex items-center'>
                        <Bed size={16} />
                        {beds} {beds > 1 ? "Beds" : "Bed"}
                    </div>
                    <div className='flex items-center'>
                        <span>{size} m²</span>
                    </div>
                </div>

                {facilities.length > 0 && (
                    <div>
                        <ul className='grid grid-cols-2 gap-2 text-sm text-gray-500'>
                            {facilities.map((amenity, index) => (
                                <li className='flex items-center gap-1' key={index}>
                                    <CheckIcon size={14} color='#a65f00'/>
                                    <span>{amenity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className='flex items-center justify-between mt-2'>
                    <div className='flex items-center justify-center gap-1'>
                        <span className='text-yellow-800 text-xl font-bold'>{price}</span>
                        <span>/night</span>
                    </div>
                    <Link href={`/rooms/${id}`} className='inline-block rounded-md bg-yellow-800 px-4 py-2 text-center text-sm font-medium text-white transition duration-300 hover:bg-yellow-700'>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RoomCard
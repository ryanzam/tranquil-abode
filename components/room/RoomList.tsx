import { Loader2 } from 'lucide-react';
import React, { FC } from 'react'
import RoomCard, { RoomCardProps } from '../common/RoomCard';
import { Tables } from '@/app/integration/supabase/types';

interface RoomsListProps {
    rooms: Tables<'rooms'>[] | undefined
    isLoading: boolean;
    error: Error | null;
}

const RoomList: FC<RoomsListProps> = ({ rooms, isLoading, error }) => {
    return (
        <div className="lg:col-span-3 pt-4">
            <div className="flex justify-between items-center mb-6 pr-4">
                <h2 className="text-xl font-semibold">
                    {isLoading ? 'Loading rooms...' : error ? 'Error loading rooms' : `${rooms?.length || 0} Rooms Available`}
                </h2>
                <select className="px-3 py-2 border w-[200px] mt-0.5 rounded border-gray-300 shadow-sm sm:text-sm text-sm">
                    <option>Sort by: Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Highest Rated</option>
                </select>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-hotel-primary" />
                </div>
            )}

            {!isLoading && !error && rooms && rooms.length > 0 && (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-4">
                    {rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            id={room.id}
                            name={room.name}
                            image={room.image_url || "https://images.unsplash.com/photo-1560185009-dddeb820c7b7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"}
                            price={Number(room.price_per_night)}
                            capacity={room.capacity}
                            beds={0}
                            size={0}
                            facilities={room.facilites || []}
                        />
                    ))}
                </div>
            )}
            {!isLoading && !error && rooms?.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-hotel-muted">No rooms available matching your criteria.</p>
                    <p className="text-sm text-hotel-muted">Please adjust your filters and try again.</p>
                </div>
            )}
        </div>)
}

export default RoomList
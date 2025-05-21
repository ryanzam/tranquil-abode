"use client"

import React, { useEffect, useState } from 'react'
import RoomsHeader from '@/components/room/RoomsHeader';
import RoomsFilters from '@/components/room/RoomsFilters';
import RoomList from '@/components/room/RoomList';
import { Tables } from '../integration/supabase/types';
import { supabase } from '../integration/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchRooms = async (): Promise<Tables<'rooms'>[]> => {
    const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('price_per_night', { ascending: true });

    if (error) {
        console.error('Error fetching rooms:', error);
        throw new Error(error.message);
    }
    return data || [];
};

const RoomsPage = () => {

    const [filteredRooms, setFilteredRooms] = useState<Tables<'rooms'>[] | undefined>(undefined);

    const [price, setPrice] = useState();
    const [guests, setGuests] = useState();
    const [facilities, setFacilities] = useState<string[]>([]);

    const { data: rooms, isLoading, error } = useQuery<Tables<'rooms'>[], Error>({
        queryKey: ['rooms'],
        queryFn: fetchRooms,
    });

    useEffect(() => {
        if (rooms) {
            setFilteredRooms(rooms);
        }
    }, [rooms]);

    const handlePriceChange = (e: any) => {
        const value = e.target.value;
        setPrice(value);
    }

    const handleGuestsChange = (e: any) => {
        const value = e.target.value;
        setGuests(value);
    }

    const handleFacilitiesChange = (facility: string) => {
        setFacilities([...facilities, facility]);
    }

    const handleFilters = () => {
        let filtered = filteredRooms

        if (price) {
            filtered = filteredRooms?.filter(room => room.price_per_night <= price);
        }

        if (guests) {
            filtered = filteredRooms?.filter(room => room.capacity <= guests);
        }

        if (facilities.length > 0) {
            filtered = filteredRooms?.filter(room => facilities.every(facility => room.facilites?.includes(facility)));
        }

        setFilteredRooms(filtered);
    }

    return (
        <div>
            <RoomsHeader
                title="Our Rooms & Suites"
                subtitle="Discover the perfect accommodation for your stay, featuring elegant design, premium amenities, and exceptional comfort."
                backgroundImageUrl="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
            />

            <section className="section-padding">
                <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <RoomsFilters handlePriceChange={handlePriceChange}
                            handleGuestsChange={handleGuestsChange}
                            handleFacilitiesChange={handleFacilitiesChange}
                            handleFilters={handleFilters}
                        />

                        <RoomList rooms={filteredRooms} isLoading={isLoading} error={error} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RoomsPage
"use client"

import RoomCard from '@/components/common/RoomCard';
import React, { useState } from 'react'

const allRooms = [
    {
        id: 1,
        name: "Deluxe King Room",
        image: "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 99,
        capacity: 2,
        beds: 1,
        size: 32,
        featured: true,
        facilities: ["Free WiFi", "Breakfast", "Smart TV"]
    },
    {
        id: 2,
        name: "Premium Suite",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 199,
        capacity: 3,
        beds: 2,
        size: 45,
        featured: true,
        facilities: ["Free WiFi", "Breakfast", "Smart TV", "Balcony"]
    },
    {
        id: 3,
        name: "Executive Suite",
        image: "https://images.unsplash.com/photo-1594560913095-8cf34bab82ad?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 250,
        capacity: 4,
        beds: 2,
        size: 52,
        featured: true,
        facilities: ["Free WiFi", "Breakfast", "Smart TV", "City View"]
    },
    {
        id: 4,
        name: "Classic Double Room",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 159,
        capacity: 2,
        beds: 1,
        size: 28,
        facilities: ["Free WiFi", "Smart TV"]
    },
    {
        id: 5,
        name: "Family Room",
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 249,
        capacity: 4,
        beds: 2,
        size: 40,
        facilities: ["Free WiFi", "Breakfast", "Smart TV"]
    },
    {
        id: 6,
        name: "Penthouse Suite",
        image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 299,
        capacity: 4,
        beds: 2,
        size: 85,
        facilities: ["Free WiFi", "Breakfast", "Smart TV", "Terrace"]
    }
];

const facilitiesOptions = [
    "Free WiFi",
    "Breakfast",
    "Smart TV",
    "Balcony",
    "City View",
    "Terrace",
];

const RoomsPage = () => {

    const [filteredRooms, setFilteredRooms] = useState(allRooms);

    const [price, setPrice] = useState();
    const [guests, setGuests] = useState();
    const [facilities, setFacilities] = useState<string[]>([]);

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
        let filtered = allRooms;

        if (price) {
            filtered = filtered.filter(room => room.price <= price);
        }

        if (guests) {
            filtered = filtered.filter(room => room.capacity <= guests);
        }

        if (facilities.length > 0) {
            filtered = filtered.filter(room => facilities.every(facility => room.facilities.includes(facility)));
        }

        setFilteredRooms(filtered);
    }   

    return (
        <div>
            <div className='relative py-24 bg-gradient-to-b from-black/80 to-black/50'>
                <div
                    className="absolute inset-0 -z-10 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1580313356744-6ac9eeb8ae7e")' }}
                />
                <div className='pt-16 px-4 text-center text-white'>
                    <h2 className='font-bold text-3xl'>Our Rooms & Suites</h2>
                    <p className='mt-4'>
                        Discover the perfect accommodation for your stay, featuring elegant design,
                        premium facilities, and exceptional comfort.
                    </p>
                </div>
            </div>

            <section className="section-padding">
                <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="font-semibold text-xl mb-4">Filter Rooms</h2>

                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Price Range</h3>
                                    <input
                                        type="range"
                                        min="0"
                                        max="500"
                                        step="50"
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-800"
                                        onChange={handlePriceChange}
                                    />
                                    <div className="flex justify-between mt-2 text-sm">
                                        <span>$0</span>
                                        <span>$500</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Guests</h3>
                                    <select onChange={handleGuestsChange} className="w-full px-3 py-2 mt-0.5 rounded border-gray-300 shadow-sm sm:text-sm accent-amber-800">
                                        <option value="">Any</option>
                                        <option value="1">1 Guest</option>
                                        <option value="2">2 Guests</option>
                                        <option value="3">3 Guests</option>
                                        <option value="4">4+ Guests</option>
                                    </select>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-3">Facilities</h3>
                                    <div className="space-y-2">
                                        {facilitiesOptions.map((facility, index) => (
                                            <div key={index} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`facility-${index}`}
                                                    className="w-4 h-4 rounded border-gray-300 shadow-sm accent-amber-800"
                                                    onChange={() => handleFacilitiesChange(facility)}
                                                />
                                                <label htmlFor={`facility-${index}`} className="ml-2 text-sm">
                                                    {facility}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={handleFilters} className="btn-primary w-full mt-6 flex items-center justify-center">
                                    Apply Filters
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-3 pt-4">
                            <div className="flex justify-between items-center mb-6 pr-4">
                                <h2 className="text-xl font-semibold">
                                    {filteredRooms.length} Rooms Available
                                </h2>
                                <select className="px-3 py-2 border w-[200px] mt-0.5 rounded border-gray-300 shadow-sm sm:text-sm text-sm">
                                    <option>Sort by: Recommended</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Highest Rated</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-4">
                                {filteredRooms.map((room) => (
                                    <RoomCard key={room.id} {...room} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RoomsPage
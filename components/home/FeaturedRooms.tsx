import React from 'react'
import RoomCard from '../common/RoomCard';

// Mock data 
const featuredRooms = [
    {
        id: 1,
        name: "Deluxe King Room",
        image: "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 299,
        capacity: 2,
        beds: 1,
        size: 32,
        featured: true,
        amenities: ["Free WiFi", "Breakfast", "Smart TV", "Mini Bar"]
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
        amenities: ["Free WiFi", "Breakfast", "Smart TV", "Balcony"]
    },
    {
        id: 3,
        name: "Executive Suite",
        image: "https://images.unsplash.com/photo-1594560913095-8cf34bab82ad?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 99,
        capacity: 4,
        beds: 2,
        size: 52,
        featured: true,
        amenities: ["Free WiFi", "Breakfast", "Smart TV", "City View"]
    }
];

const FeaturedRooms = () => {
    return (
        <section className=' bg-neutral-100'>
            <div>
                <div className='text-center py-10'>
                    <h2 className='text-2xl font-bold'>Featured Rooms</h2>
                    <p className='mt-2'>Experience tranquility, comfort and luxury in our carefully rooms with best facilties.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {featuredRooms.map((room) => (
                        <RoomCard {...room} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedRooms
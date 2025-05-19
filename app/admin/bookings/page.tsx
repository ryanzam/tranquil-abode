import StatCard from '@/components/common/StatCard';
import { Badge, Bed, Calendar, CircleDollarSign, Edit, Home, Pencil, Plus, Trash, Trash2, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { allRooms, bookings } from '../../data/MockData';

const links = [
    { name: "Dashboard", path: "/admin", icon: <Home /> },
    { name: "Bookings", path: "/admin/bookings", icon: <Calendar /> },
    { name: "Rooms", path: "/admin/rooms", icon: <Bed /> },
    { name: "Guests", path: "/admin/guests", icon: <User /> },
];

const statCardData = [
    { title: "Total Rooms", total: 11, icon: <Bed /> },
    { title: "Occupied Rooms", total: 8, icon: <Calendar /> },
    { title: "Upcomming Bookings", total: 6, icon: <User /> },
    { title: "Monthly Revenue", total: 1800, icon: <CircleDollarSign /> },
]

const page = () => {
    return (
        <div className=''>
            <div className='bg-yellow-800 w-64 min-h-screen text-white fixed'>
                <div className='p-6'>
                    <Link href={"/admin"} className='font-bold text-xl'>TranquilAbode</Link>
                </div>
                <div>
                    {links.map((link) => (
                        <Link href={link.path} key={link.name} className='flex items-center p-4 hover:bg-yellow-700'>
                            <div className='text-2xl'>
                                {link.icon}
                            </div>
                            <span className='ml-4'>{link.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='p-6 bg-neutral-100 ml-64'>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-gray-500">Welcome to the hotel management dashboard</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">Today's Date: </span>
                        <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                </div>

                <div className='grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {statCardData.map((card) => (
                        <StatCard
                            key={card.title}
                            title={card.title}
                            number={card.total}
                            icon={card.icon}
                        />
                    ))}
                </div>

                <div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='font-bold'>Recent Bookings</h2>
                        <button className='text-white bg-yellow-800 px-4 py-2 rounded-md'>View All</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-200">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr className="*:font-medium *:text-gray-900">
                                    <th className="px-3 py-2 whitespace-nowrap">ID</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Guest</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Room</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Check In</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Check Out</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Status</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Amount</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {bookings.map((booking, index) => (
                                    <tr className="*:text-gray-900 *:first:font-medium" key={index}>
                                        <td className="px-3 py-2 whitespace-nowrap">{booking.id}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{booking.guest}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{booking.room}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{booking.checkIn}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{booking.checkOut}</td>
                                        <td className={`px-3 py-2 whitespace-nowrap
                                        ${booking.status == "Confirmed" ? "bg-green-300" : "bg-amber-200"}`
                                        }>{booking.status}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{booking.amount}</td>
                                        <td className="px-3 py-2 whitespace-nowrap flex items-center justify-between text-sm">
                                            <span className='cursor-pointer'><Edit size={16} /></span>
                                            <span className='cursor-pointer text-red-500'><Trash2 size={16} /></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Room Management</h2>
                        <div className="flex space-x-3 items-center justify-center">
                            <input
                                placeholder="Search rooms..."
                                className="pl-10 rounded-xl border border-yellow-800 py-2"
                            />
                            <button className="btn-primary hover:btn-primary/90 flex items-center">
                                <Plus className="h-4 w-4 mr-2" />
                                <span className=''>Add Room</span>
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left">ID</th>
                                    <th className="px-4 py-3 text-left">Room Name</th>
                                    <th className="px-4 py-3 text-left">Capacity</th>
                                    <th className="px-4 py-3 text-left">Price</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {allRooms.map((room) => (
                                    <tr key={room.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{room.id}</td>
                                        <td className="px-4 py-3">{room.name}</td>
                                        <td className="px-4 py-3">{room.capacity} Guests</td>
                                        <td className="px-4 py-3">${room.price}</td>
                                        <td className="px-4 py-3">
                                            Available
                                        </td>
                                        <td className="px-4 py-3 flex space-x-2">
                                            <button className="h-8 w-8 p-0">
                                                <Edit size={16} />
                                            </button>
                                            <button className="h-8 w-8 p-0 text-red-600">
                                                <Trash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
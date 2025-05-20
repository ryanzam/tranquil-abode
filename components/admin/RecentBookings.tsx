import { bookings } from '@/app/data/MockData'
import { Edit, Trash2 } from 'lucide-react'
import React from 'react'

const RecentBookings = () => {
    return (
        <div className="overflow-x-auto">
            <div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='font-bold'>Recent Bookings</h2>
                    <button className='text-white bg-yellow-800 px-4 py-2 rounded-md'>View All</button>
                </div>
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
    )
}

export default RecentBookings
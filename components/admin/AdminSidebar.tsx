import { useAuth } from '@/app/contexts/AuthProvider';
import { Bed, Calendar, Home, LogOut, User } from 'lucide-react';
import Link from 'next/link'
import React from 'react'

const links = [
    { name: "Dashboard", path: "/dashboard", icon: <Home /> },
    { name: "Bookings", path: "/dashboard/bookings", icon: <Calendar /> },
    { name: "Rooms", path: "/dashboard/rooms", icon: <Bed /> },
    { name: "Guests", path: "/dashboard/guests", icon: <User /> },
];

const AdminSidebar = () => {

    const { signOut } = useAuth();

    return (
        <div className='bg-yellow-800 w-64 min-h-screen text-white fixed'>
            <div className='p-6'>
                <Link href={"/"} className='font-bold text-xl'>TranquilAbode</Link>
            </div>
            <nav>
                {links.map((link) => (
                    <Link href={link.path} key={link.name} className='flex items-center p-4 hover:bg-yellow-700'>
                        <div className='text-2xl'>
                            {link.icon}
                        </div>
                        <span className='ml-4'>{link.name}</span>
                    </Link>
                ))}
            </nav>
            <div className="border-t border-hotel-primary/50">
                <button
                    onClick={signOut}
                    className="flex items-center p-4 hover:bg-yellow-700 w-full cursor-pointer"
                >
                    <LogOut size={18} className="mr-3" />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default AdminSidebar
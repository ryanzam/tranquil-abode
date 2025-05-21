"use client"

import StatCard from '@/components/common/StatCard';
import { Bed, Calendar, CircleDollarSign, User } from 'lucide-react';
import React, { useEffect } from 'react'
import { bookings } from '../data/MockData';
import { useAuth } from '../contexts/AuthProvider';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import RecentBookings from '@/components/admin/RecentBookings';
import ManageRooms from '@/components/admin/ManageRooms';

const statCardData = [
    { title: "Total Rooms", total: 11, icon: <Bed /> },
    { title: "Occupied Rooms", total: 8, icon: <Calendar /> },
    { title: "Upcomming Bookings", total: 6, icon: <User /> },
    { title: "Monthly Revenue", total: 1800, icon: <CircleDollarSign /> },
]

const DashboardPage = () => {

    const { loading: authLoading, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/auth/login')
        }
    }, [user, router])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className=''>
            <AdminSidebar />

            <div className='p-6 bg-neutral-100 ml-64'>
                <AdminHeader title='Dashboard' subtitle={`${user?.email}`} />

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
                <RecentBookings bookings={bookings} formatDate={formatDate} />
                <ManageRooms />
            </div>
        </div>
    )
}

export default DashboardPage
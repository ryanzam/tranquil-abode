"use client";

import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthProvider';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const { loading: authLoading, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/auth/login')
        }
    }, [user, router])

    return (
        <div className=''>
            <AdminSidebar />

            <div className='p-6 bg-neutral-100 ml-64'>
                <AdminHeader title='Dashboard' subtitle={`${user?.email}`} />

                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
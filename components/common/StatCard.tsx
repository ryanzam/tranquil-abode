import React from 'react'

interface StatCardProps {
    title: string;
    number: string | number;
    icon: React.ReactNode;
}

const StatCard = ({ title, number, icon }: StatCardProps) => {
    return (
        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center'>
            <h2 className='text-neutral-500'>{title}</h2>
            <div className='flex w-full justify-between items-center'>
                <div className='text-yellow-800 text-2xl font-bold'>{number}</div>
                <div className='bg-yellow-100 p-4 rounded-full'>{icon}</div>
            </div>
        </div>
    )
}

export default StatCard
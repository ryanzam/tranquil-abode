import React from 'react';

interface AdminHeaderProps {
    title: string;
    subtitle: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-gray-500">{subtitle}</p>
            </div>
            <div>
                <span className="text-sm text-gray-500">Today's Date: </span>
                <span className="font-medium">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>
    );
};

export default AdminHeader;
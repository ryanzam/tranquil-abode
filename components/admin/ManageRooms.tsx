import { Tables } from '@/app/integration/supabase/types';
import { Badge, Edit, Plus, Trash } from 'lucide-react'
import React, { FC } from 'react'

type Room = Tables<'rooms'>;

interface ManageRoomProps {
    rooms: Room[];
    onAddRoom: () => void;
    onEditRoom: (room: Room) => void;
    onDeleteRoom: (roomId: string) => void;
    isLoading: boolean;
}

const ManageRooms: FC<ManageRoomProps> = ({ rooms, onAddRoom, onEditRoom, onDeleteRoom, isLoading }) => {

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p>Loading rooms...</p>
            </div>
        );
    }

    return (
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
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Type</th>
                            <th className="px-4 py-3 text-left">Capacity</th>
                            <th className="px-4 py-3 text-left">Price/Night</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {rooms.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{room.name}</td>
                                <td className="px-4 py-3">{room.type || "N/A"}</td>
                                <td className="px-4 py-3">{room.capacity} Guests</td>
                                <td className="px-4 py-3">${room.price_per_night}</td>
                                <td className="px-4 py-3">
                                    <Badge className={
                                        `${room.status === 'Available'
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : room.status === 'Occupied'
                                                ? 'bg-blue-500 hover:bg-blue-600'
                                                : 'bg-yellow-500 hover:bg-yellow-600'
                                        } text-white`
                                    }>
                                        {room.status || "Unknown"}
                                    </Badge>
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
                {rooms.length === 0 && !isLoading && (
                    <p className="text-center py-4 text-gray-500">No rooms found.</p>
                )}
            </div>
        </div>
    )
}

export default ManageRooms
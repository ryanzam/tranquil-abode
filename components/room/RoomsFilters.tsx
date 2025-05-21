import { facilitiesOptions } from '@/app/data/MockData';
import React, { FC } from 'react'

interface RoomsFiltersProps {
    handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleGuestsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleFacilitiesChange: (facility: string) => void;
    handleFilters: () => void;
}

const RoomsFilters: FC<RoomsFiltersProps> = ({ handlePriceChange, handleGuestsChange, handleFacilitiesChange, handleFilters }) => {


    return (
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
    )
}

export default RoomsFilters
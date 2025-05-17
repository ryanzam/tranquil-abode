import { CheckIcon } from 'lucide-react'
import React from 'react'

const About = () => {
    return (
        <section className='py-16 px-4 bg-neutral-100'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                <div>
                    <h2 className='text-2xl font-bold'>Experience TranquilAbode Hospitality</h2>
                    <p className='pt-4'>TranquilAbode has been providing exceptional hospitality services for over 10 years.
                        Our dedication to guest satisfaction and attention to detail has earned us
                        numerous accolades in the hotel industry.
                    </p>
                    <ul className="space-y-4 mt-4">
                        <li className="flex items-start">
                            <CheckIcon className="text-hotel-secondary mr-2 mt-1" size={20} color='#a65f00'/>
                            <span>24/7 concierge service for personalized assistance</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="text-hotel-secondary mr-2 mt-1" size={20} color='#a65f00'/>
                            <span>Complimentary high-speed WiFi throughout the hotel</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="text-hotel-secondary mr-2 mt-1" size={20} color='#a65f00'/>
                            <span>Premium amenities and luxury toiletries in all rooms</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="text-hotel-secondary mr-2 mt-1" size={20} color='#a65f00'/>
                            <span>Multiple dining options with diverse cuisine choices</span>
                        </li>
                    </ul>
                </div>
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1618129180529-10c9982028d4"
                        alt="Hotel"
                        className="rounded-lg w-full h-auto shadow-lg"
                    />
                    <div className="absolute -bottom-5 -left-5 bg-white rounded-lg shadow-lg p-4 lg:p-6">
                        <div className="flex items-center mb-2">
                            <div className="text-hotel-secondary text-2xl font-bold mr-2 text-yellow-800">10+</div>
                            <div className="text-sm">Years of Excellence</div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-hotel-secondary text-2xl font-bold mr-2 text-yellow-800">15+</div>
                            <div className="text-sm">Luxury Rooms</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
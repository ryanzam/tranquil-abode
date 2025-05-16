import { HeartPulse, MountainSnow, UtensilsCrossed } from 'lucide-react';
import React from 'react'

const features = [
    {
        icon: <MountainSnow />,
        title: "Prime Location",
        description: "Situated in the heart of the city with convenient access to major attractions and transportation."
    },
    {
        icon: <UtensilsCrossed />,
        title: "Fine Dining",
        description: "Experience culinary excellence with our award-winning restaurant and personalized dining services."
    },
    {
        icon: <HeartPulse />,
        title: "Wellness Center",
        description: "Rejuvenate your body and mind at our state-of-the-art spa and fitness facilities."
    }
];

const HotelFeatures = () => {
    return (
        <div className='flex flex-row py-32 bg-neutral-200'>
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="rounded-lg border border-gray-100 bg-white p-4 shadow-xs transition hover:shadow-lg sm:p-6"
                >
                    <span className="inline-block rounded-sm bg-yellow-800 p-2 text-white">
                        {feature.icon}
                    </span>

                    <a href="#">
                        <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                            {feature.title}
                        </h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        {feature.description}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default HotelFeatures
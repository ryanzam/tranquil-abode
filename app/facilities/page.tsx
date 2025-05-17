import Link from 'next/link';
import React from 'react'

const facilities = [
    {
        id: 1,
        name: "Fine Dining Restaurant",
        description: "Our award-winning restaurant offers an exquisite dining experience with seasonal menus featuring local ingredients. Enjoy gourmet cuisine prepared by our talented culinary team.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        hours: "6:30 AM - 11:00 PM",
        features: [
            "Breakfast buffet",
            "À la carte lunch and dinner",
            "Private dining available",
            "Terrace seating with city views"
        ]
    },
    {
        id: 2,
        name: "Fitness Center",
        description: "Stay active during your stay at our fully equipped fitness center. Whether you prefer cardio workouts or strength training, our gym has the latest equipment for all your fitness needs.",
        image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        hours: "24/7 Access",
        features: [
            "Modern cardio equipment",
            "Free weights and machines",
            "Personal training services",
        ]
    },
    {
        id: 3,
        name: "Business Center",
        description: "Stay productive in our fully equipped business center. Whether you need to prepare for a meeting or catch up on emails, our business center provides all the essential services.",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        hours: "7:00 AM - 10:00 PM",
        features: [
            "High-speed internet access",
            "Private meeting rooms",
            "Video conferencing facilities",
            "Administrative assistance available"
        ]
    }
];


const FacilitiesPage = () => {

    return (
        <div>
            <div className='relative py-24 bg-gradient-to-b from-black/80 to-black/50'>
                <div
                    className="absolute inset-0 -z-10 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb")' }}
                />
                <div className='pt-16 px-4 text-center text-white'>
                    <h2 className='font-bold text-3xl'>Our Facilities</h2>
                    <p className='mt-4'>
                        Discover the exceptional facilities and services that make your stay at LuxStay a truly memorable experience.
                    </p>
                </div>
            </div>

            <section className='bg-neutral-200 px-4 py-16'>
                <div className='py-10 text-center'>
                    <h2 className='text-3xl font-bold'>Our exciting facilities</h2>
                    <p className='my-4'>At TranquilAbode, we pride ourselves on offering a comprehensive range of facilities to ensure your comfort, convenience, and enjoyment throughout your stay.</p>
                </div>

                <div className="space-y-16">
                    {facilities.map((facility, index) => (
                        <div key={facility.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <img
                                    src={facility.image}
                                    alt={facility.name}
                                    className="rounded-lg shadow-lg w-full h-72 object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">{facility.name}</h3>
                                <p className="text-hotel-muted mb-4">{facility.description}</p>
                                <p className="mb-4">
                                    <span className="font-medium">Hours:</span> {facility.hours}
                                </p>

                                <ul className="space-y-2">
                                    {facility.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-hotel-secondary mr-2">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-hotel-tertiary py-16 bg-neutral-200">
                <div className="hotel-container">
                    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience LuxStay?</h2>
                        <p className="text-hotel-muted mb-8 max-w-2xl mx-auto">
                            Book your stay now and enjoy access to all our premium facilities.
                            Our dedicated team is ready to ensure you have an unforgettable experience.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/rooms" className="btn-primary">
                                Book Your Stay
                            </Link>
                            <Link href="/contact" className="btn-outline">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FacilitiesPage
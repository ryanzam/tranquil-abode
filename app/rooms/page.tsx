import React from 'react'

const RoomsPage = () => {
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
        </div>
    )
}

export default RoomsPage
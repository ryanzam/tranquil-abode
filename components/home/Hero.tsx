import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className="relative h-screen min-h-[600px] w-full">
            <div className='absolute bg-cover inset-0 -z-10 ' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557127275-f8b5ba93e24e")' }} />
            <div
                className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32"
            >
                <div className="max-w-prose text-left">
                    <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
                        Experience Luxury
                        <strong className="text-yellow-700"> Tranquility </strong>
                        and Comfort
                    </h1>

                    <p className="mt-4 text-base text-pretty text-neutral-800 sm:text-lg/relaxed">
                        Discover the perfect blend of elegance and relaxation at Tranquil Abode with great views and exceptional service.
                    </p>

                    <div className="mt-4 flex gap-4 sm:mt-6">
                        <Link
                            className="inline-block rounded border border-yellow-800 text-white bg-yellow-800 px-5 py-3 font-bold shadow-sm transition-colors hover:bg-yellow-700"
                            href="/rooms"
                        >
                            Explore Rooms
                        </Link>

                        <Link
                            className="inline-block rounded border border-gray-200 px-5 py-3 font-bold text-neutral-800 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                            href="/facilities"
                        >
                            Our Facilities
                        </Link>
                    </div>
                </div>
            </div>

            <div className='bg-white p-3 absolute rounded-xl left-0 right-0 translate-y-1/2 w-[90%] mx-auto shadow-lg'>
                <form className='flex items-center justify-center gap-4' action="#">
                    <label htmlFor="checkin">
                        <span className="text-sm font-bold text-neutral-700"> Check in </span>

                        <input
                            type="date"
                            id="checkin"
                            className="mt-0.5 px-4 py-3 w-full rounded border-neutral-300 shadow-sm sm:text-sm"
                        />
                    </label>
                    <label htmlFor="checkout">
                        <span className="text-sm font-bold text-neutral-700"> Check out </span>

                        <input
                            type="date"
                            id="checkout"
                            className="mt-0.5 px-4 py-3 w-full rounded border-neutral-300 shadow-sm sm:text-sm"
                        />
                    </label>
                    <label htmlFor="guest">
                        <span className="text-sm font-bold text-neutral-700"> Guests </span>

                        <select className="w-full px-4 py-3 border border-gray-200 rounded-md text-hotel-dark focus:outline-none focus:ring-1 focus:ring-hotel-primary appearance-none bg-white">
                            <option>1 Adult</option>
                            <option>2 Adults</option>
                            <option>2 Adults, 1 Child</option>
                            <option>2 Adults, 2 Children</option>
                        </select>
                    </label>
                    <div>
                        <button className='flex items-center justify-between px-3 py-2 rounded bg-black text-white' >
                            <Search /> Search Availability
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Hero
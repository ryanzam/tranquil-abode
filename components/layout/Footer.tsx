import Link from 'next/link';
import React from 'react'

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-yellow-800 pt-16 pb-8 px-4">
            <div className="hotel-container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/20">
                    <div className="md:col-span-1">
                        <h3 className="font-bold text-xl text-white mb-4">TranquilAbode</h3>
                        <p className="text-white/70 mb-6 text-sm">
                            Experience luxury hospitality with personalized service and exceptional amenities in a prime location.
                        </p>
                    </div>

                    <div className="md:col-span-1">
                        <h4 className="text-white font-medium mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-white/70 text-sm hover:text-hotel-secondary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/rooms" className="text-white/70 text-sm hover:text-hotel-secondary transition-colors">
                                    Rooms & Suites
                                </Link>
                            </li>
                            <li>
                                <Link href="/facilities" className="text-white/70 text-sm hover:text-hotel-secondary transition-colors">
                                    Facilities
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h4 className="text-white font-medium mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="text-white/70 text-sm">
                                113 New Avenue, City Center
                            </li>
                            <li className="text-white/70 text-sm">
                                reservations@tranquilabode.com
                            </li>
                            <li className="text-white/70 text-sm">
                                +977 (056) 524-980
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h4 className="text-white font-medium mb-4">Subscribe</h4>
                        <p className="text-white/70 text-sm mb-4">
                            Stay updated with our latest offers and news.
                        </p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-2 bg-white/10 rounded-md text-white placeholder:text-white/50 focus:outline-none"
                            />
                            <button type="submit" className="py-2 px-4 rounded-md border border-white text-white text-sm hover:bg-yellow-700 transition-all">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 text-center">
                    <p className="text-white/50 text-sm">
                        © {currentYear} TranquilAbode. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
"use client"

import { AlignJustify, TreePalm, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Facilities', path: '/facilites' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Contact', path: '/contact' },
]

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <a className="flex items-center" href="/">
                            <span className="sr-only">Tranquil Abode</span>
                            <TreePalm />
                            <span className="font-bold text-gray-900">Tranquil Abode</span>
                        </a>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href={item.path}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <Link
                                    className="rounded-md px-5 py-2.5 text-sm font-medium bg-black text-white shadow-sm hover:bg-neutral-800"
                                    href="/login"
                                >
                                    Login
                                </Link>

                                <div className="hidden sm:flex">
                                    <Link
                                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium hover:bg-gray-200"
                                        href="/register"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>

                            <div className="block md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                                >
                                    {isMenuOpen ? <X /> : <AlignJustify />}
                                </button>
                            </div>

                            {isMenuOpen && (
                                <div className='md:hidden shadow-md w-full absolute pt-[180px]'>
                                    <div className='flex flex-col pt-14'>
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                className="block rounded-md px-4 py-2 text-sm text-gray-500 transition hover:bg-gray-100"
                                                href={item.path}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
"use client"

import { AlignJustify, TreePalm, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Facilities', path: '/facilities' },
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
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white
            ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <a className="flex items-center" href="/">
                            <span className="sr-only">TranquilAbode</span>
                            <TreePalm color='#754e0b' />
                            <span className="font-bold text-neutral-900 text-xl">TranquilAbode</span>
                        </a>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            className="text-neutral-900 transition hover:text-neutral-900/75"
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
                                    className="btn-primary"
                                    href="/login"
                                >
                                    Login
                                </Link>

                                <div className="hidden sm:flex">
                                    <Link
                                        className="btn-outline"
                                        href="/register"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>

                            <div className="block md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="rounded-sm bg-neutral-100 p-2 text-neutral-600 transition hover:text-neutral-600/75"
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
                                                className="block rounded-md px-4 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100"
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
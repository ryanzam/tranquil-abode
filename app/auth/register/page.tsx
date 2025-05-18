import Link from 'next/link'
import React from 'react'

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-neutral-100">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <Link href="/" className="text-yellow-800 font-bold text-2xl md:text-3xl">
                            TranquilAbode
                        </Link>
                        <h1 className="text-2xl font-bold mt-6 mb-2">Create an account</h1>
                        <p className="text-neutral-500 mt-4">
                            Sign up to manage your bookings and enjoy exclusive offers.
                        </p>
                    </div>

                    <form className="space-y-4">
                        <div className='flex gap-4'>
                            <div className="space-y-2">
                                <label htmlFor="firstname" className="text-sm font-medium">
                                    First Name
                                </label>
                                <input
                                    id="firstname"
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="w-full py-3 px-4 border border-neutral-300 rounded-lg focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="lastname" className="text-sm font-medium">
                                    Last Name
                                </label>
                                <input
                                    id="lastname"
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="w-full py-3 px-4 border border-neutral-300 rounded-lg focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="firstname" className="text-sm font-medium">
                                Phone
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                className="w-full py-3 px-4 border border-neutral-300 rounded-lg focus:outline-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full py-3 px-4 border border-neutral-300 rounded-lg focus:outline-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-xs text-hotel-primary hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full py-3 px-4 border border-neutral-300 rounded-lg focus:outline-none"
                                required
                            />
                            <p className="text-xs text-hotel-muted">
                                Password must be at least 8 characters long
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Confirm Password
                            </label>
                            <input
                                id="confirmpassword"
                                type="password"
                                placeholder="Enter your password again"
                                className="w-full py-3 px-4 border border-neutral-300 rounded-lg focus:outline-none"
                                required
                            />
                        </div>

                        <div className="flex items-start space-x-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1"
                                required
                            />
                            <label htmlFor="terms" className="text-xs text-hotel-muted">
                                I agree to the{" "}
                                <a href="#" className="text-hotel-primary hover:underline">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-hotel-primary hover:underline">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <button type="submit" className="w-full btn-primary hover:bth-primary/90">
                            Create an account
                        </button>
                    </form>

                    <div className="text-center space-y-4">
                        <p className="text-sm text-neutral-500 mt-4">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-hotel-primary hover:underline">
                                Login
                            </Link>
                        </p>

                        <p className="text-xs text-neutral-500 mt-4">
                            By signing in, you agree to our{" "}
                            <a href="#" className="text-hotel-primary hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-hotel-primary hover:underline">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
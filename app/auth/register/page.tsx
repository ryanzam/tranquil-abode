"use client"

import Link from 'next/link'
import React, { useEffect } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { useAuth } from '@/app/contexts/AuthProvider';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const signupSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    username: z.string().min(3, { message: "Username must be at least 3 characters." })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z.string(),
    terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const RegisterPage = () => {

    const { signUpWithPassword, loading: authLoading, user } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    useEffect(() => {
        if (user) {
            redirect('/dashboard');
        }
    }, [user, redirect]);

    const onSubmit = async (data: SignupFormValues) => {
        const { error, user: newUser } = await signUpWithPassword({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    username: data.username,
                }
            }
        });
        if (error) {
            toast.error(error.message || "Failed to sign up. Please try again.");
        } else if (newUser) {
            toast.success(newUser.identities && newUser.identities.length > 0 && newUser.identities[0].identity_data?.email_verified === false
                ? "Account created! Please check your email to verify your account."
                : "Account created successfully!");
                redirect("/auth/login");
        }
    };

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

                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex gap-4'>
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium">
                                    First Name
                                </label>
                                <input
                                    className='border rounded-md p-2 w-full border-yellow-800'
                                    {...register('firstName', { required: true })}
                                    type="text"
                                />
                                {errors.firstName && (
                                    <p role="alert" className='text-red-500 text-xs font-bold'>First name is required</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium">
                                    Last Name
                                </label>
                                <input
                                    className='border rounded-md p-2 w-full border-yellow-800'
                                    {...register('lastName', { required: true })}
                                    type="text"
                                />
                                {errors.lastName && (
                                    <p role="alert" className='text-red-500 text-xs font-bold'>Last name is required</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 flex flex-col">
                            <label htmlFor="username" className="text-sm font-medium">
                                Username
                            </label>
                            <input
                                className='border rounded-md p-2 w-full border-yellow-800'
                                {...register('username', { required: true })}
                                type="text"
                            />
                            {errors.username && (
                                <p role="alert" className='text-red-500 text-xs font-bold'>Username is required</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <input
                                className='border rounded-md p-2 w-full border-yellow-800'
                                {...register('email', { required: true })}
                                type="text"
                            />
                            {errors.email && (
                                <p role="alert" className='text-red-500 text-xs font-bold'>Email is required</p>
                            )}
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
                                className='border rounded-md p-2 w-full border-yellow-800'
                                {...register('password', { required: true })}
                                type="password"
                            />
                            {errors.password ? (
                                <p role="alert" className='text-red-500 text-xs font-bold'>Password is required</p>
                            ) : <p className="text-xs text-hotel-muted">
                                Password must be at least 8 characters long
                            </p>}

                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm Password
                            </label>
                            <input
                                className='border rounded-md p-2 w-full border-yellow-800'
                                {...register('confirmPassword', { required: true })}
                                type="password"
                            />
                            {errors.confirmPassword && (
                                <p role="alert" className='text-red-500 text-xs font-bold'>Confirm Password is required.</p>)}
                        </div>

                        <div className="space-x-2">
                            <div className='flex items-start mt-3'>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mt-1 rounded border-gray-300 shadow-sm"
                                    {...register('terms', { required: true })}
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
                            {errors.terms && (
                                <p role="alert" className='text-red-500 text-xs font-bold block'>You must accept the terms of service and privacy policy.</p>
                            )}
                        </div>

                        <button type="submit" className="w-full btn-primary hover:bth-primary/90 cursor-pointer" disabled={authLoading}>
                            {authLoading ? "Creating Account..." : "Create Account"}
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
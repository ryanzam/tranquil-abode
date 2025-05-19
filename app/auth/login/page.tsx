"use client"

import { useAuth } from '@/app/contexts/AuthProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginPage = () => {

  const { signInWithPassword, loading: authLoading, user } = useAuth()
  const router = useRouter()

  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const onSubmit = async (data: LoginFormValues) => {
    const { error } = await signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message || "Failed to sign in. Please check your credentials.");
    } else {
      toast.success("Signed in successfully!");
      redirect("/admin");
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
            <h1 className="text-2xl font-bold mt-6 mb-2">Welcome Back</h1>
            <p className="text-neutral-500 mt-4">
              Sign in to manage your bookings
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              {errors.password && (
                <p role="alert" className='text-red-500 text-xs font-bold'>Password is required</p>
              )}
            </div>

            <button type="submit" className="w-full btn-primary hover:bth-primary/90 cursor-pointer">
              {authLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center space-y-4">
            <p className="text-sm text-neutral-500 mt-4">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-hotel-primary hover:underline">
                Sign up
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

export default LoginPage
"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { AuthError, Session, SignUpWithPasswordCredentials, User } from '@supabase/supabase-js'
import { redirect } from "next/navigation";
import { supabase } from '../integration/supabase/client';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signInWithPassword: (credentials: SignUpWithPasswordCredentials) => Promise<{ error: AuthError | null }>;
    signUpWithPassword: (credentials: SignUpWithPasswordCredentials & { data?: Record<string, any> }) => Promise<{ error: AuthError | null; session: Session | null; user: User | null }>;
    signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setLoading(false);
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            if (event === 'SIGNED_IN') {
                setTimeout(() => redirect('/admin'), 0);
            } else if (event === 'SIGNED_OUT') {
                setTimeout(() => redirect('/login'), 0);
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, [redirect]);

    const signInWithPassword = async (credentials: SignUpWithPasswordCredentials) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword(credentials);
        setLoading(false);
        return { error };
    };

    const signUpWithPassword = async (credentials: SignUpWithPasswordCredentials & { data?: Record<string, any> }) => {
        setLoading(true);
        const { email, password, options } = credentials;
        const { data: authData, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: options?.data
            }
        });
        setLoading(false);
        return { error, session: authData.session, user: authData.user };
    };

    const signOut = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);
        return { error };
    };

    const value = {
        session,
        user,
        loading,
        signInWithPassword,
        signUpWithPassword,
        signOut,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
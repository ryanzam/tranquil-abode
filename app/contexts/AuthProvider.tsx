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
    fetchUserProfile: () => Promise<any | null>;
    profile: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSessionAndProfile = async () => {
            setLoading(true);
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            if (currentSession?.user) {
                await fetchUserProfile();
            } else {
                setLoading(false);
                setProfile(null);
            }
        };

        getSessionAndProfile();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
            setLoading(true);
            setSession(currentSession);
            const currentUser = currentSession?.user ?? null;
            setUser(currentUser);

            if (currentUser && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED')) {
                await fetchUserProfile();
            } else if (event === 'SIGNED_OUT') {
                setProfile(null);
                setLoading(false);
            } else if (!currentUser) {
                setProfile(null);
                setLoading(false);
            }

            if (event === 'SIGNED_IN' && currentSession) {
                setTimeout(() => redirect('/'), 0);
            } else if (event === 'SIGNED_OUT') {
                setTimeout(() => redirect('/login'), 0);
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, [redirect]);

    useEffect(() => {
        if (user?.id) {
            fetchUserProfile();
        } else {
            setProfile(null);
            setLoading(false);
        }
    }, [user?.id]);


    const fetchUserProfile = async () => {
        if (user) {
            setLoading(true);
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('username, avatar_url, phone_number')
                .eq('id', user.id)
                .single();

            if (profileError) {
                console.error('Error fetching profile:', profileError);
                setProfile(null);
                setLoading(false);
                return null;
            }

            const { data: rolesData, error: rolesError } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', user.id);

            if (rolesError) {
                const userProfileOnError = {
                    ...profileData,
                    roles: []
                };
                setProfile(userProfileOnError);
                setLoading(false);
                return userProfileOnError;
            }

            const userProfile = {
                ...profileData,
                roles: rolesData ? rolesData.map((r: { role: string }) => r.role) : []
            };

            setProfile(userProfile);
            setLoading(false);
            return userProfile;
        }
        setProfile(null);
        setLoading(false);
        return null;
    };

    const signInWithPassword = async (credentials: SignUpWithPasswordCredentials) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword(credentials);
        return { error };
    };

    const signUpWithPassword = async (credentials: SignUpWithPasswordCredentials & { data?: Record<string, any> }) => {
        setLoading(true);
        const { data: authData, error } = await supabase.auth.signUp(credentials);
        return { error, session: authData.session, user: authData.user };
    };

    const signOut = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        return { error };
    };

    const value = {
        session,
        user,
        profile,
        loading,
        signInWithPassword,
        signUpWithPassword,
        signOut,
        fetchUserProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
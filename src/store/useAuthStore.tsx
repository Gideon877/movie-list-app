// store.ts
import { AuthContextType } from '../utils/interfaces';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

export const useAuthStore = create<AuthContextType>()(
    persist<AuthContextType>(
        (set) => ({
            userId: null,
            authenticated: false,
            token: null,
            error: null,
            loading: false,
            logout: () => {
                set({
                    userId: null,
                    authenticated: false,
                    token: null,
                });
            },
            login: (id: string, token: string) => {
                set({
                    userId: id,
                    token: token,
                    authenticated: true,
                    loading: false,
                    error: null,
                });
            },
            setUserId: (id: string | null) => set({ userId: id }),
            setAuthenticated: (status: boolean) => set({ authenticated: status }),
            setToken: (token: string | null) => set({ token }),
            setError: (error: string | null) => set({ error }),
            setLoading: (loading: boolean) => set({ loading }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
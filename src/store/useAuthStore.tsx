// store.ts
import { AuthContextType } from '../utils/interfaces';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import {jwtDecode} from 'jwt-decode';


export const useAuthStore = create<AuthContextType>()(
    persist<AuthContextType>(
        (set, get) => ({
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
            verifyToken: () => {
                const state = get();
                const token = state.token;

                if (token) {
                    try {
                        const decodedToken: { exp: number } = jwtDecode(token);
                        if (decodedToken.exp * 1000 > Date.now()) {
                            return true; // Token is valid
                        } else {
                            set({ authenticated: false, token: null, userId: null });
                            return false; // Token is expired
                        }
                    } catch (error) {
                        console.error('Error decoding token:', error);
                        set({ authenticated: false, token: null, userId: null });
                        return false; // Error in decoding or invalid token
                    }
                }
                return false; // No token present
            }
        }),
        {
            name: 'auth-storage',
        }
    )
);
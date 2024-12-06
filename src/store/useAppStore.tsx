import { persist } from "zustand/middleware";
import { create } from 'zustand';
import { LoginStateProps, SignUpAuthState } from "../utils/interfaces";


interface AppStoreType {
    activeView: string | null;
    setActiveView: (view: string | null) => void;
}

export const useAppStore = create<AppStoreType>()(
    persist<AppStoreType>(
        (set) => ({
            activeView: null,
            setActiveView: (activeView: string | null) => set({ activeView })
        }),
        {
            name: 'app-storage'
        }
    )
)

export const useLoginStore = create<LoginStateProps>((set) => ({
    username: '',
    password: '',
    setPassword: (password: string | null) => set({ password }),
    setUsername: (username: string | null) => set({ username }),
}));

export const useSignUpStore = create<SignUpAuthState>((set) => ({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    loading: false,
    error: null,
    type: 'info',
    open: false,
    setOpen: (open: boolean) => set({ open }),
    setType: (type: 'success' | 'error' | 'info') => set({ type }), setFirstName: (firstName: string) => set({ firstName }),
    setLastName: (lastName: string) => set({ lastName }),
    setUsername: (username: string) => set({ username }),
    setPassword: (password: string) => set({ password }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
}));
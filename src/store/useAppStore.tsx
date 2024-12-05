import { persist } from "zustand/middleware";
import { create } from 'zustand';


interface  AppStoreType {
    activeView: string | null;
    setActiveView: (view: string | null) => void;
}

export const useAppStore = create<AppStoreType>()(
    persist<AppStoreType>(
        (set) => ({
            activeView: null,
            setActiveView: (activeView: string | null) => set({ activeView})
        }),
        {
            name: 'app-storage'
        }
    )
)
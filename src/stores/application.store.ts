import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Application } from "../interfaces/applications.interface";

type ApplicationState = {
    apps: Application[] | null;
    setApps: (apps: Application[] | null) => void;
    updateApps: (patch: Partial<Application>) => void;
    clearApps: () => void;
};

export const useAppStore = create<ApplicationState>()(
    persist(
        (set, get) => ({
            apps: null,

            // Remplace entièrement la société (ou la remet à null)
            setApps: (apps) => set({ apps }),

            // Met à jour partiellement la société existante
            updateApps: (patch) => {
                const current = get().apps;
                if (!current) return;
                set({ apps: { ...current, ...patch } });
            },

            // Vide le store
            clearApps: () => set({ apps: null }),
        }),
        {
            name: "application-store",
        }
    )
);
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Company } from "../interfaces/companies.interface";

type CompanyState = {
    comps: Company[] | null;
    setComps: (comps: Company[] | null) => void;
    updateComps: (patch: Partial<Company>) => void;
    clearComps: () => void;
};

export const useCompStore = create<CompanyState>()(
    persist(
        (set, get) => ({
            comps: [],

            // Remplace entièrement la société (ou la remet à null)
            setComps: (comps) => set({ comps }),


            // Met à jour partiellement la société existante
            updateComps: (patch) => {
                const current = get().comps;
                if (!current) return;
                set({ comps: { ...current, ...patch } });
            },



            // Vide le store
            clearComps: () => set({ comps: [] }),
        }),
        {
            name: "company-store",
        }
    )
);
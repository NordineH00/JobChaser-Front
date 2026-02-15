import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address } from "../interfaces/address.interface";

type AddressState = {
    address: Address[] | null;
    setAddress: (address: Address[] | null) => void;
    updateAddress: (patch: Partial<Address>) => void;
    clearAddress: () => void;
};

export const useAddressStore = create<AddressState>()(
    persist(
        (set, get) => ({
            address: null,

            // Remplace entièrement l'adresse (ou la remet à null)
            setAddress: (address) => set({ address }),

            // Met à jour partiellement la société existante
            updateAddress: (patch) => {
                const current = get().address;
                if (!current) return;
                set({ address: { ...current, ...patch } });
            },

            // Vide le store
            clearAddress: () => set({ address: null }),
        }),
        {
            name: "address-store",
        }
    )
);
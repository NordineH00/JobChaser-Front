import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Event, EventForm } from "../interfaces/events.interface";

type EventState = {
    events: Event[] | null;
    setEvent: (events: Event[] | null) => void;
    updateEvent: (id: string, patch: Partial<EventForm>) => void;
    clearEvent: () => void;
};

export const useEventStore = create<EventState>()(
    persist(
        (set, get) => ({
            events: null,

            // Remplace entièrement la société (ou la remet à null)
            setEvent: (events) => set({ events }),

            // Met à jour partiellement la société existante
            updateEvent: (id, patch) => {
                const updated = get().events?.map((e) =>
                    e.id === id ? { ...e, ...patch } : e
                );
                set({ events: updated });
            },

            // Vide le store
            clearEvent: () => set({ events: null }),
        }),
        {
            name: "application-store",
        }
    )
);
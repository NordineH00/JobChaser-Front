


import { useEventStore } from "../stores/event.store";
import { useApi } from "../hooks/useApi";
import type { Event, EventForm } from "../interfaces/events.interface";

const api = useApi();


export async function getAllEvents(): Promise<Event[]> {
    const { setEvent } = useEventStore.getState();

    try {
        const res = await api.get('/events');
        const data: Event[] = res.data ?? [];
        setEvent(data);
        return data;
    } catch (e: any) {
        console.error("Erreur lors de la récupération des entreprises :", e?.message ?? e);
        setEvent(null);
        return [];
    }
}

export async function getOneEvents(id: string): Promise<Event | undefined> {
    try {
        const res = await api.get(`/events/${id}`);
        return res.data;
    } catch (e: any) {
        console.error("Erreur lors de la récupération de la candidature :", e?.message ?? e);
        return undefined;
    }
}

export async function getEventsbyAppsId(id: string): Promise<Event[] | undefined> {
    try {
        const res = await api.get(`/events/application/${id}`);
        return res.data;
    } catch (e: any) {
        console.error("Erreur lors de la récupération de la candidature :", e?.message ?? e);
        return undefined;
    }
}

export async function updateEvents(id: string, event: EventForm): Promise<Event | undefined> {
    try {
        const res = await api.patch(`/events/${id}`, event);
        return res.data;
    } catch (e: any) {
        console.error("Erreur lors de la récupération de la candidature :", e?.message ?? e);
        return undefined;
    }
}
export const toDate = (s: string | null | undefined) => (s ? new Date(s) : null);
export const toIso = (d: Date | null | undefined) => (d ? d.toISOString() : null);

export const registrationNumberParsed = (
    value?: string | null
): number | undefined => {
    if (!value || value.trim() === "") return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
};

// Convertir date ISO en francçais
export const dateStr = (date: string | Date): string => {
    const d = typeof date === "string" ? new Date(date) : date;

    return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

// Format heure
export const timeStr = (date: Date): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

//Convertir 2025-11-02T14:53 en 2025-11-02T13:53:01.000Z 
export function toLocalDateTime(input: unknown): string {
    if (input == null) return "";                       // évite le crash si valeur absente

    const maybeDate = (input as any)?.toDate ? (input as any).toDate() : input;
    const d = maybeDate instanceof Date ? maybeDate : new Date(maybeDate as any);
    if (isNaN(d.getTime())) return "";                  // invalide → string vide

    // Convertit l'instant vers l'heure locale puis formate "YYYY-MM-DDTHH:mm"
    const offsetMin = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offsetMin * 60000);
    return local.toISOString().slice(0, 16);
}
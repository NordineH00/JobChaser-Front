export const ApplicationStatus = {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED",
    CLOSED: "CLOSED",
} as const;

export type ApplicationStatus = keyof typeof ApplicationStatus; // "PENDING" | "ACCEPTED" | ...

export const ApplicationStatusLabel: Record<ApplicationStatus, string> = {
    PENDING: "en attente",
    ACCEPTED: "acceptée",
    REJECTED: "refusée",
    CLOSED: "clôturée",
};
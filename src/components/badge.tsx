import type { Event } from "../interfaces/events.interface";

export const StatusBadge = ({ event }: { event: Event }) => (
    <span
        className={[
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
            event.eventStatus === "FINISHED" ? "bg-gray-100 text-gray-600" :
                event.eventStatus === "CANCELED" ? "bg-red-100 text-red-700" :
                    "bg-green-100 text-green-700",
        ].join(" ")}
    >
        {event.eventStatus}
    </span>
);
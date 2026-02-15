import React, { useEffect } from "react";


import { useSearchStore } from "../stores/search.store";
import { useEventStore } from "../stores/event.store";
import type { Event } from "../interfaces/events.interface";


let listApplication: any[] = []

const SearchModal: React.FC = () => {
  const events: Event[] | null = useEventStore((state) => state.events)
  if (!events) return <p>Aucun évènement disponible</p>
  const { query, results, setResults, reset, isOpen } = useSearchStore();

  // Filtrage dynamique des résultats
  useEffect(() => {
    if (query.trim() === "") {
      reset();
      return;
    }

    const q = query.toLowerCase();
    const apps = listApplication.filter(
      (app) =>
        app.jobTitle.toLowerCase().includes(q) ||
        app.companyName.toLowerCase().includes(q)
    );

    const evts = events.filter(
      (event: Event) =>
        event.jobTitle.toLowerCase().includes(q) ||
        event.companyName.toLowerCase().includes(q) ||
        event.eventType.toLowerCase().includes(q)
    );

    setResults([...apps, ...evts]);
  }, [query, setResults, reset]);

  if (!isOpen || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 w-full mt-1 rounded-md shadow-lg bg-white z-50 overflow-hidden">
      <ul>
        {results.map((item, i) => (
          <li key={i} className="p-3 hover:bg-gray-100 cursor-pointer transition flex flex-col">
            {"jobTitle" in item ? (
              <>
                <span className="font-medium text-gray-900">{item.jobTitle}</span>
                <span className="text-gray-600 text-sm">{item.companyName} — {item.status}</span>
              </>
            ) : (
              <>
                <span className="font-medium text-gray-900">{item.eventType}</span>
                <span className="text-gray-600 text-sm">
                  {item.jobTitle} chez {item.companyName} —{" "}
                  {new Date(item.dateTime).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchModal;

import { useRef, useEffect, useState } from "react";


import { useClickOutside } from "../hooks/useClickOutside";

import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import Carousel from "../components/Carousel";




import { useNavigate } from "react-router";
import { useSearchStore } from "../stores/search.store";
import { useAppStore } from "../stores/application.store";
import { useEventStore } from "../stores/event.store";
import { updateData } from "../utils/updateData";
import type { Application } from "../interfaces/applications.interface";
import type { Event } from "../interfaces/events.interface";
import { EventCard } from "../components/Card/EventCard";
import { ApplicationCard } from "../components/Card/ApplicationCard";



const Dashboard = () => {
  const navigate = useNavigate();
  const { close } = useSearchStore();


  const [applications, setApplications] = useState<Application[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const appsFromStore = useAppStore((state) => state.apps);
  const eventsFromStore = useEventStore((state) => state.events);

  // Conteneur englobant SearchBar + SearchModal
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // Fermer dropdown si clic à l’extérieur
  useClickOutside(searchContainerRef, () => close());

  useEffect(() => {

    updateData()
  }, []);


  useEffect(() => {
    setApplications(
      (appsFromStore ?? []).filter(a => a.appStatus === "PENDING")
    )

    setEvents(
      [...(eventsFromStore ?? [])].sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
    );
  }, [appsFromStore, eventsFromStore]);

  return (
    <div className="flex flex-col items-center w-full">
      <div ref={searchContainerRef} className="relative w-full max-w-md mb-8">
        {/* <SearchBar /> */}
        {/* <SearchModal /> */}
      </div>

      <Carousel
        title="Entretiens à venir"
        items={events}
        renderItem={(event) => <EventCard event={event} />}
      />

      <button
        onClick={() => navigate("/calendar")}
        className="my-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75"
      >
        Mon calendrier
      </button>

      <Carousel
        title="Candidatures en attente"
        items={applications}
        renderItem={(application) => <ApplicationCard application={application} />}
      />

      <button
        onClick={() => navigate("/applications")}
        className="my-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75"
      >
        Mes candidatures
      </button>
    </div>
  );
};

export default Dashboard;

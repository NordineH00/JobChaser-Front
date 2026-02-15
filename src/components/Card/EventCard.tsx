import { useNavigate } from "react-router";
import type { Event } from "../../interfaces/events.interface";
import { useCompStore } from "../../stores/company.store";
import { useAppStore } from "../../stores/application.store";

export const EventCard = ({ event }: { event: Event }) => {
  const navigate = useNavigate();
  const companys = useCompStore((state) => state.comps);
  const applications = useAppStore((state) => state.apps);

  const company = companys?.find((comp) => comp.id === event.companyId) ?? null;
  const application = applications?.find((comp) => comp.id === event.applicationId) ?? null;

  return (
    <button
      key={event.id}
      onClick={() => navigate(`/events/${event.id}`)}
      className="border rounded-lg p-4 mt-3 w-full text-center bg-white shadow transition-transform duration-200 hover:scale-110">
      <h3 className="font-bold text-lg text-black">{event.name}</h3>
      <h2 className="text-lg text-black">
        {event.eventType} {company ? `avec ${company.name}` : ""}
      </h2>
      <p className="text-gray-600">Poste : {application?.jobTitle}</p>
      <p className="text-sm text-gray-500">
        {new Date(event.startTime).toLocaleString("fr-FR", {
          dateStyle: "long",
          timeStyle: "short",
        })}
      </p>
      <p className="text-sm text-gray-500">Lieu: {event.address?.city}</p>
    </button>
  );
};

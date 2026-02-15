import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction"
import { useEventStore } from '../stores/event.store'
import { useState } from 'react'
import { useEffect } from 'react'
import type { Event } from '../interfaces/events.interface'
import { useNavigate } from 'react-router'
import type { EventClickArg } from '@fullcalendar/core/index.js'

const Calendar = () => {
  const navigate = useNavigate()
  const events = (useEventStore((state) => state.events) ?? []) as Event[];

  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  const handleDateClick = (arg: DateClickArg) => {
    console.log("arg", arg)
    const clickDate = arg.dateStr;
    const eventsOfTheDay = events.filter((e: Event) => {
      const start = typeof e.startTime === "string"
        ? e.startTime
        : e.startTime.toISOString();

      return start.split("T")[0] === clickDate;
    });
    setSelectedDate(clickDate);
    setSelectedEvents(eventsOfTheDay);
    setOpenModal(true);
    console.log("select date", eventsOfTheDay)
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [openModal]);

  const handleEventClick = (arg: EventClickArg) => {
    // si tu as passé `id` dans events[], tu le retrouves ici
    navigate(`/events/${arg.event.id}`);
  };

  if (events.length === 0) return <p>Aucun événement disponible</p>;

  return (
    <div className="relative">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        //locale={frLocale}
        initialView="dayGridMonth"
        weekends={true}
        timeZone="local"
        height="auto"
        dateClick={handleDateClick}
        events={events.map((e) => ({
          id: e.id,
          title: e.name,
          start: e.startTime,
          allDay: true,
        }))}
        eventClick={handleEventClick}
      />

      {/* Modal */}
      {openModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="min-h-full bg-black/40 p-4"
            onClick={() => setOpenModal(false)}
          >

            <div
              className="mx-auto max-w-l"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex flex-col rounded-xl bg-white shadow-xl p-6
                        max-h-[80vh] overflow-y-auto">
                <div className='flex justify-between mb-5'>
                  <h2 className="text-lg font-semibold">
                    Événements du {selectedDate}
                  </h2>
                  <button
                    onClick={() => navigate(`/events-create/${events}`)}
                    className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Ajouter un évènement
                  </button>
                </div>

                {selectedEvents.map((event) => (
                  <button key={event.id} onClick={()=> navigate(`/events/${event.id}`)}className="border rounded-lg p-3 mb-3 bg-gray-50">
                    <div className="font-semibold text-gray-800">{event.name}</div>
                    <div className="text-sm text-gray-600">{event.remark ?? "Aucune remarque"}</div>
                    <div className="text-sm text-gray-700">Statut : {event.eventStatus}</div>

                    {event.isRemote ? (
                      <>
                        <div className="mt-2 text-sm text-blue-600">
                          Logiciel : {event.meetingSoftware ?? "Inconnu"}
                        </div>
                        <div className="text-sm text-blue-500 break-all">
                          Lien :{" "}
                          <a
                            href={event.meetingURL ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {event.meetingURL ?? "Non renseigné"}
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="mt-2 text-sm text-gray-600">📍 Adresse IRL</div>
                    )}
                  </button>
                ))}

                <div className="mt-6 flex items-center justify-end gap-2 sticky bottom-0 bg-white pt-3">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
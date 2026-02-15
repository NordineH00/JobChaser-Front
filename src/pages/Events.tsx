import { EventCard } from "../components/Card/EventCard";
import { useEventStore } from "../stores/event.store";


const Events = () => {
  const events = useEventStore((state) => state.events)
  if (!events) return <p>Aucun évènement disponible</p>
  return (
    <div>
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </div>
  )
}

export default Events
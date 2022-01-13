import EventCard from "../EventCard";

const EventList = ({ title, events, showEventDates = false }) => {
  return (
    <ul>
      <h3>{title}</h3>
      {events.map((event) => (
        <EventCard key={event.id} event={event} showEventDate={showEventDates}></EventCard>
      ))}
    </ul>
  );
};

export default EventList;

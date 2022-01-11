import EventCard from "../EventCard/EventCard";

const EventList = ({ title, events }) => {
  return (
    <ul>
      <h3>{title}</h3>
      {events.map((event) => (
        <EventCard key={event.id} event={event}></EventCard>
      ))}
    </ul>
  );
};

export default EventList;

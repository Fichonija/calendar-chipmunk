import EventCard from "../event-card";

const EventList = ({ title, events, showEventDates = false, onEventClose }) => {
  return (
    <ul>
      <h3>{title}</h3>
      {events.map((event) => (
        <EventCard key={event.id} event={event} showEventDate={showEventDates} onClose={onEventClose}></EventCard>
      ))}
    </ul>
  );
};

export default EventList;

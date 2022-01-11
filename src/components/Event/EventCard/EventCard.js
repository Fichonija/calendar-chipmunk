import Card from "../../Card/Card";

const EventCard = ({ event, showEventDate = false }) => {
  const eventDate = showEventDate
    ? `${event.start.toLocaleString("hr-HR", { dateStyle: "full", timeStyle: "full" })} - ${event.end.toLocaleTimeString()}`
    : `${event.start.toLocaleTimeString()} - ${event.end.toLocaleTimeString()}`;

  return <Card title={event.summary} subtitle={eventDate}></Card>;
};

export default EventCard;

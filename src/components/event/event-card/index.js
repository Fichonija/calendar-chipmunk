import Card from "../../card";
import { getEventDurationFormatted } from "../../../lib/utility";

const EventCard = ({ event, showEventDate = false, onClose }) => {
  const eventDuration = getEventDurationFormatted(event, showEventDate);

  return <Card title={event.summary} subtitle={eventDuration} onClose={() => onClose(event.id)}></Card>;
};

export default EventCard;

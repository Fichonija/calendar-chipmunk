import Card from "../../Card/Card";
import { getEventDurationFormatted } from "../../../lib/utility";

const EventCard = ({ event, showEventDate = false }) => {
  const eventDuration = getEventDurationFormatted(event, showEventDate);

  return <Card title={event.summary} subtitle={eventDuration}></Card>;
};

export default EventCard;

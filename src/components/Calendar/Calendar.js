import { useEffect, useState } from "react";

import Card from "../Card/Card";
import { fetchCalendarEvents } from "../../lib/calendarApi";

import "./Calendar.css";

const Calendar = (props) => {
  const [events, setEvents] = useState([]);
  console.log(events);

  useEffect(() => {
    fetchCalendarEvents(props.token, props.email).then((eventsResult) => setEvents(eventsResult));
  }, []);

  return (
    <div>
      <p>Hello {props.username}</p>
      {events && (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <Card title={event.summary} startTime={event.start.toLocaleString()} endTime={event.end.toLocaleString()}></Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Calendar;

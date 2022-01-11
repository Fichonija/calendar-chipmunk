import { useEffect, useState } from "react";

import Card from "../Card/Card";
import { fetchCalendarEvents } from "../../lib/calendarApi";

import "./Calendar.css";

const Calendar = (props) => {
  const [events, setEvents] = useState([]);
  console.log(events);

  useEffect(() => {
    fetchCalendarEvents(props.token, props.email, props.numberOfDays).then((eventsResult) => setEvents(eventsResult));
  }, [props.email, props.numberOfDays, props.token]);

  return (
    <div>
      <p>
        Hello {props.username}. Showing results for {props.numberOfDays ? props.numberOfDays : 7} days.
      </p>
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

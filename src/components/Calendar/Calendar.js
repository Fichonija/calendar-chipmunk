import { useEffect, useState } from "react";

import Card from "../Card/Card";
import { fetchCalendarEvents } from "../../lib/calendarApi";

import "./Calendar.css";

const Calendar = (props) => {
  const [events, setEvents] = useState([]);
  console.log(events);

  useEffect(() => {
    fetchCalendarEvents(props.email, props.token).then((eventsResult) => setEvents(eventsResult));
  }, []);

  return (
    <div>
      <p>Hello {props.username}</p>
      {events && (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <Card title={event.summary}></Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Calendar;

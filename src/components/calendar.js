import { useEffect, useState } from "react";
import { CALENDAR_API_ROOT } from "../lib/constants";

const Calendar = (props) => {
  const [events, setEvents] = useState([]);
  console.log(props);
  console.log(events);

  useEffect(() => {
    fetch(`${CALENDAR_API_ROOT}/${props.email}/events?timeMin=2022-01-10T10:00:00Z&singleEvents=true&orderBy=startTime`, {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((reponse) => reponse.json())
      .then((result) => setEvents(result.items));
  }, []);

  return (
    <div>
      <p>Hello {props.username}</p>
      {events && (
        <ul>
          {events.map((event) => (
            <li key={event.id}>{event.summary}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Calendar;

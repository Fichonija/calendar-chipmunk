import { useEffect, useState } from "react";

import EventList from "../Event/EventList/EventList";
import { fetchCalendarEvents } from "../../lib/calendarApi";

import "./Calendar.css";

const Calendar = (props) => {
  const [eventsGroup, setEventsGroup] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(7);

  useEffect(() => {
    fetchCalendarEvents(props.token, props.email, numberOfDays).then((eventsResult) => setEventsGroup(eventsResult));
  }, [props.email, props.token, numberOfDays]);

  return (
    <div>
      <p>
        Hello {props.username}. Showing results for{" "}
        <select value={numberOfDays} onChange={(event) => setNumberOfDays(+event.target.value)}>
          <option value="1">1</option>
          <option value="7">7</option>
          <option value="30">30</option>
        </select>{" "}
        days.
      </p>
      {eventsGroup.map((eventGroup) => (
        <EventList key={eventGroup.key} title={eventGroup.key} events={eventGroup.events}></EventList>
      ))}
    </div>
  );
};

export default Calendar;

import { useEffect, useState } from "react";

import CardList from "../CardList/CardList";
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
        Hello {props.username}. Showing results for {numberOfDays} days.
      </p>
      {eventsGroup.map((eventGroup) => (
        <CardList key={eventGroup.startTimeFormatted} listTitle={eventGroup.startTimeFormatted} listItems={eventGroup.events}></CardList>
      ))}
    </div>
  );
};

export default Calendar;

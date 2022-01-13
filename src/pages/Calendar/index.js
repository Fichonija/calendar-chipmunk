import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import EventForm from "../../components/Event/EventForm";
import EventList from "../../components/Event/EventList";
import { fetchCalendarEvents, createCalendarEvent } from "../../lib/api";

import "./calendar.css";

const Calendar = (props) => {
  const [eventsGroup, setEventsGroup] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventCreated, setEventCreated] = useState(0);

  useEffect(() => {
    fetchCalendarEvents(numberOfDays).then((eventsResult) => setEventsGroup(eventsResult));
  }, [numberOfDays, eventCreated]);

  const handleEventSubmit = (event) => {
    console.log(event);
    createCalendarEvent(event).then((isCreated) => setEventCreated((value) => value + 1));
    setIsModalVisible(false);
  };

  if (eventsGroup) {
    return (
      <>
        <div className="calendar-header">
          <p>
            Showing results for{" "}
            <select value={numberOfDays} onChange={(event) => setNumberOfDays(+event.target.value)}>
              <option value="1">1</option>
              <option value="7">7</option>
              <option value="30">30</option>
            </select>{" "}
            days.
          </p>
          <button onClick={() => setIsModalVisible(true)}>Add event</button>
        </div>
        <div className="calendar-content">
          {eventsGroup.length === 0 ? (
            <p>No events in the following {numberOfDays} days.</p>
          ) : (
            eventsGroup.map((eventGroup) => (
              <EventList
                key={eventGroup.key}
                title={eventGroup.key}
                events={eventGroup.events}
                showEventDates={numberOfDays >= 30}
              ></EventList>
            ))
          )}
        </div>
        <Modal
          isVisible={isModalVisible}
          title="New event"
          render={() => <EventForm onSubmit={handleEventSubmit} />}
          onClose={() => setIsModalVisible(false)}
        />
      </>
    );
  } else {
    return <p>No user detected. Log in to see events</p>;
  }
};

export default Calendar;

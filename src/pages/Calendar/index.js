import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import EventForm from "../../components/event/event-form";
import EventList from "../../components/event/event-list";
import { useAuth } from "../../lib/context";
import { fetchCalendarEvents, createCalendarEvent, deleteCalendarEvent } from "../../lib/api";

import "./calendar.css";

const Calendar = () => {
  const [eventsGroup, setEventsGroup] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    fetchCalendarEvents(numberOfDays).then((eventsResult) => setEventsGroup(eventsResult));
  }, [numberOfDays]);

  const handleEventSubmit = (event) => {
    console.log("[CREATE EVENT]: " + event);
    createCalendarEvent(event)
      .then((isCreated) => fetchCalendarEvents(numberOfDays))
      .then((eventsResult) => setEventsGroup(eventsResult));
    setIsModalVisible(false);
  };

  const handleEventDelete = (eventId) => {
    console.log("[DELETE EVENT]: " + eventId);
    deleteCalendarEvent(eventId)
      .then((isDeleted) => fetchCalendarEvents(numberOfDays))
      .then((eventsResult) => setEventsGroup(eventsResult));
  };

  if (auth.userData) {
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
                onEventClose={handleEventDelete}
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
    return <p>Login to see the calendar</p>;
  }
};

export default Calendar;

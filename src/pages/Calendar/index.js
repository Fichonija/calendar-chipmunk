import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import EventForm from "../../components/event/event-form";
import EventList from "../../components/event/event-list";
import { fetchCalendarEvents, createCalendarEvent, deleteCalendarEvent } from "../../lib/api";

import "./calendar.css";

const Calendar = (props) => {
  const [eventsGroup, setEventsGroup] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(0);

  useEffect(() => {
    fetchCalendarEvents(numberOfDays).then((eventsResult) => setEventsGroup(eventsResult));
  }, [numberOfDays, refreshEvents]);

  const handleEventSubmit = (event) => {
    console.log("[CREATE EVENT]: " + event);
    createCalendarEvent(event).then((isCreated) => setRefreshEvents((value) => value + 1));
    setIsModalVisible(false);
  };

  const handleEventDelete = (eventId) => {
    console.log("[DELETE EVENT]: " + eventId);
    deleteCalendarEvent(eventId).then((isDeleted) => setRefreshEvents((value) => value + 1));
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
    return <p>No user detected. Log in to see events</p>;
  }
};

export default Calendar;

import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import ConfirmModal from "../../components/modal/confirm-modal";
import EventForm from "../../components/event/event-form";
import EventList from "../../components/event/event-list";
import { useAuth } from "../../lib/context";
import { fetchCalendarEvents, createCalendarEvent, deleteCalendarEvent } from "../../lib/api";

import "./calendar.css";

const Calendar = () => {
  const [eventsGroup, setEventsGroup] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [isNewEventModalVisible, setIsNewEventModalVisible] = useState(false);
  const [eventIdForDelete, setEventIdForDelete] = useState(null);

  const auth = useAuth();

  useEffect(() => {
    fetchCalendarEvents(numberOfDays).then((eventsResult) => setEventsGroup(eventsResult));
  }, [numberOfDays]);

  const handleEventSubmit = (event) => {
    console.log("[CREATE EVENT]: " + event);
    createCalendarEvent(event)
      .then((isCreated) => fetchCalendarEvents(numberOfDays))
      .then((eventsResult) => setEventsGroup(eventsResult));
    setIsNewEventModalVisible(false);
  };

  const handleEventDelete = () => {
    console.log("[DELETE EVENT]: " + eventIdForDelete);
    deleteCalendarEvent(eventIdForDelete)
      .then((isDeleted) => fetchCalendarEvents(numberOfDays))
      .then((eventsResult) => setEventsGroup(eventsResult));
    setEventIdForDelete(null);
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
          <button onClick={() => setIsNewEventModalVisible(true)}>Add event</button>
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
                onEventClose={(eventId) => setEventIdForDelete(eventId)}
              ></EventList>
            ))
          )}
        </div>
        <Modal
          isVisible={isNewEventModalVisible}
          title="New event"
          body={<EventForm onSubmit={handleEventSubmit} />}
          onClose={() => setIsNewEventModalVisible(false)}
        />
        <ConfirmModal
          isVisible={eventIdForDelete !== null}
          title="Delete event?"
          body={<p>This action will delete the selected event. Do you wish to continue?</p>}
          onConfirm={handleEventDelete}
          onClose={() => setEventIdForDelete(null)}
        />
      </>
    );
  } else {
    return <p>Login to see the calendar</p>;
  }
};

export default Calendar;

import { useEffect, useState } from "react";
import CalendarHeader from "./calendar-header";
import CalendarContent from "./calendar-content";
import { Modal, ConfirmModal } from "../../components/modal";
import { EventForm, EventList } from "../../components/event";
import { useAuth } from "../../lib/context";
import { fetchCalendarEvents, createCalendarEvent, deleteCalendarEvent } from "../../lib/api";

import "./calendar.css";

const Calendar = () => {
  const [eventGroups, setEventGroups] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [isNewEventModalVisible, setIsNewEventModalVisible] = useState(false);
  const [eventIdForDelete, setEventIdForDelete] = useState(null);

  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      fetchCalendarEvents(numberOfDays).then((eventsResult) => setEventGroups(eventsResult));
    }
  }, [auth.user, numberOfDays]);

  const handleEventSubmit = (event) => {
    createCalendarEvent(event)
      .then((isCreated) => fetchCalendarEvents(numberOfDays))
      .then((eventsResult) => setEventGroups(eventsResult));
    setIsNewEventModalVisible(false);
  };

  const handleEventDelete = () => {
    deleteCalendarEvent(eventIdForDelete)
      .then((isDeleted) => fetchCalendarEvents(numberOfDays))
      .then((eventsResult) => setEventGroups(eventsResult));
    setEventIdForDelete(null);
  };

  const modals = (
    <>
      {" "}
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
  if (auth.user) {
    return (
      <>
        <CalendarHeader
          numberOfDays={numberOfDays}
          onNumberOfDaysChanged={(newNumberOfDays) => setNumberOfDays(newNumberOfDays)}
          onAddEventClicked={() => setIsNewEventModalVisible(true)}
        />
        <CalendarContent
          numberOfDays={numberOfDays}
          eventGroups={eventGroups}
          renderEventGroup={(eventGroup) => (
            <EventList
              key={eventGroup.key}
              title={eventGroup.key}
              events={eventGroup.events}
              showEventDates={numberOfDays >= 30}
              onEventClose={(eventId) => setEventIdForDelete(eventId)}
            />
          )}
        />
        {modals}
      </>
    );
  } else {
    return <p>Login to see the calendar</p>;
  }
};

export default Calendar;

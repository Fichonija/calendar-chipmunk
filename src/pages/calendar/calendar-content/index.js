const CalendarContent = ({ eventGroups, numberOfDays, renderEventGroup }) => {
  return (
    <div className="calendar-content">
      {eventGroups.length === 0 ? (
        <p>
          No events in the following {numberOfDays} {numberOfDays > 1 ? "days" : "day"}.
        </p>
      ) : (
        eventGroups.map((eventGroup) => renderEventGroup(eventGroup))
      )}
    </div>
  );
};

export default CalendarContent;

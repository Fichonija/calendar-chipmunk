const CalendarHeader = ({ numberOfDays, onNumberOfDaysChanged, onAddEventClicked }) => {
  return (
    <div className="calendar-header">
      <p>
        Showing results for{" "}
        <select value={numberOfDays} onChange={(event) => onNumberOfDaysChanged(+event.target.value)}>
          <option value="1">1</option>
          <option value="7">7</option>
          <option value="30">30</option>
        </select>{" "}
        {numberOfDays > 1 ? "days" : "day"}.
      </p>
      <button onClick={onAddEventClicked}>Add event</button>
    </div>
  );
};

export default CalendarHeader;

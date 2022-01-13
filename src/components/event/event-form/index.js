import "./eventForm.css";

const EventForm = ({ onSubmit }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newEvent = {
      summary: event.target["event-form-input-summary"].value,
      start: {
        dateTime: `${event.target["event-form-input-date"].value}T${event.target["event-form-input-start"].value}:00`,
        timeZone: "Europe/Belgrade",
      },
      end: {
        dateTime: `${event.target["event-form-input-date"].value}T${event.target["event-form-input-end"].value}:00`,
        timeZone: "Europe/Belgrade",
      },
    };
    onSubmit(newEvent);

    event.target.reset();
  };

  return (
    <form id="event-form" onSubmit={handleFormSubmit}>
      <div className="event-form-section">
        <label htmlFor="event-form-input-summary">Event summary</label>
        <input id="event-form-input-summary" name="event-form-input-summary" type="text" required />
      </div>
      <div className="event-form-section">
        <label htmlFor="event-form-input-date">Event date</label>
        <input id="event-form-input-date" name="event-form-input-date" type="date" required />
      </div>
      <div className="event-form-section">
        <label htmlFor="event-form-input-start">Start time</label>
        <input id="event-form-input-start" name="event-form-input-start" type="time" required />
      </div>
      <div className="event-form-section">
        <label htmlFor="event-form-input-end">End time</label>
        <input id="event-form-input-end" name="event-form-input-end" type="time" required />
      </div>
      <div className="event-form-section">
        <button type="submit">Create event</button>
      </div>
    </form>
  );
};

export default EventForm;

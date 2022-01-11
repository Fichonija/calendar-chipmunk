const dateTimeFormatLongOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const dateTimeFormatShortOptions = {
  hour: "numeric",
  minute: "numeric",
};

export const getEventDurationFormatted = (event, isLongFormat = false) => {
  return isLongFormat
    ? `${event.start.toLocaleString("hr-HR", dateTimeFormatLongOptions)} - ${event.end.toLocaleString("hr-HR", dateTimeFormatShortOptions)}`
    : `${event.start.toLocaleString("hr-HR", dateTimeFormatShortOptions)} - ${event.end.toLocaleString(
        "hr-HR",
        dateTimeFormatShortOptions
      )}`;
};

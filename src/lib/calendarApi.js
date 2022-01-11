import { CALENDAR_API_ROOT } from "../lib/constants";

export const fetchCalendarEvents = async (accessToken, calendarId, forNumberOfDays = 7) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timeMax = new Date(today);
    timeMax.setDate(timeMax.getDate() + forNumberOfDays);

    const calendarResponse = await fetch(
      `${CALENDAR_API_ROOT}/${calendarId}/events?timeMin=${today.toISOString()}&timeMax=${timeMax.toISOString()}&singleEvents=true&orderBy=startTime`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const calendarResult = await calendarResponse.json();

    const events = calendarResult.items.map((event) => mapEvent(event));
    return events;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const mapEvent = (event) => {
  return { id: event.id, summary: event.summary, start: new Date(event.start.dateTime), end: new Date(event.end.dateTime) };
};

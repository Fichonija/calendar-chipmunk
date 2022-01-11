import getWeekOfMonth from "date-fns/getWeekOfMonth";

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

    const events = calendarResult.items.map((event) => normalizeEvent(event));
    const eventsGroup = groupEventsByDate(events, forNumberOfDays >= 30 ? "week" : "day");
    console.log(eventsGroup);
    return eventsGroup;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const normalizeEvent = (event) => {
  return { id: event.id, summary: event.summary, start: new Date(event.start.dateTime), end: new Date(event.end.dateTime) };
};

const groupEventsByDate = (events, groupBy = "day") => {
  const eventsGroup = [];

  for (const event of events) {
    const key =
      groupBy === "day"
        ? event.start.toLocaleString("hr-HR", { dateStyle: "full" })
        : `${event.start.toLocaleString("hr-HR", { month: "long" })} ${getWeekOfMonth(event.start)}. tjedan`;

    const foundEvent = eventsGroup.find((eg) => eg.key === key);
    if (foundEvent) {
      foundEvent.events.push(event);
    } else {
      eventsGroup.push({
        key,
        events: [event],
      });
    }
  }
  return eventsGroup;
};

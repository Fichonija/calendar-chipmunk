import getWeekOfMonth from "date-fns/getWeekOfMonth";
import AuthService from "./authService";
import { CALENDAR_API_ROOT } from "../lib/constants";

export const fetchCalendarEvents = async (forNumberOfDays = 7) => {
  try {
    const token = AuthService.getAccessToken();

    const calendarEventsResponse = await fetch(getEventsApiUrl(forNumberOfDays), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const calendarEvents = await calendarEventsResponse.json();

    return getEventsGroup(calendarEvents, forNumberOfDays >= 30 ? "week" : "day");
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const getEventsApiUrl = (forNumberOfDays) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const timeMax = new Date(today);
  timeMax.setDate(timeMax.getDate() + forNumberOfDays);

  const user = AuthService.getUserData();

  const eventsApiUrl = `${CALENDAR_API_ROOT}/${
    user.email
  }/events?timeMin=${today.toISOString()}&timeMax=${timeMax.toISOString()}&singleEvents=true&orderBy=startTime`;
  return eventsApiUrl;
};

const getEventsGroup = (calendarEvents, groupBy = "day") => {
  const events = calendarEvents.items.map((event) => normalizeEvent(event));
  const eventsGroup = groupEventsByDate(events, groupBy);
  return eventsGroup;
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
        : `${event.start.toLocaleString("hr-HR", { month: "long" })}, ${getWeekOfMonth(event.start)}. tjedan`;

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

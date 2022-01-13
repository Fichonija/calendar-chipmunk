import getWeekOfMonth from "date-fns/getWeekOfMonth";
import AuthService from "../services";
import { CALENDAR_API_ROOT } from "../constants";

export const fetchCalendarEvents = async (forNumberOfDays = 7) => {
  const calendarEventsResponse = await fetch(getEventsApiGetUrl(forNumberOfDays), {
    headers: {
      Authorization: `Bearer ${AuthService.getAccessToken()}`,
    },
  });
  if (calendarEventsResponse.ok) {
    const calendarEvents = await calendarEventsResponse.json();
    return getEventsGroup(calendarEvents, forNumberOfDays >= 30 ? "week" : "day");
  } else {
    return null;
  }
};

const getEventsApiGetUrl = (forNumberOfDays) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const timeMax = new Date(today);
  timeMax.setDate(timeMax.getDate() + forNumberOfDays);

  const eventsApiUrl = `${getEventsApiBaseUrl()}?timeMin=${today.toISOString()}&timeMax=${timeMax.toISOString()}&singleEvents=true&orderBy=startTime`;
  return eventsApiUrl;
};

const getEventsApiBaseUrl = () => {
  const user = AuthService.getUserData();
  return `${CALENDAR_API_ROOT}/${user.email}/events`;
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

export const createCalendarEvent = async (event) => {
  const createEventResponse = await fetch(getEventsApiBaseUrl(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AuthService.getAccessToken()}`,
    },
    body: JSON.stringify(event),
  });
  console.log("Created event: " + createEventResponse);
  return createEventResponse.ok;
};

export const deleteCalendarEvent = async (eventId) => {
  const deleteEventResponse = await fetch(`${getEventsApiBaseUrl()}/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${AuthService.getAccessToken()}`,
    },
  });
  console.log(deleteEventResponse);
  return deleteEventResponse.ok;
};

import getWeekOfMonth from "date-fns/getWeekOfMonth";
import { AuthService } from "../services";
import { CALENDAR_API_ROOT } from "../constants";

export const fetchCalendarEvents = async (forNumberOfDays = 7) => {
  if (!AuthService.isSignedIn()) {
    return;
  }

  const calendarEventsResponse = await fetch(getEventsApiGetUrl(forNumberOfDays), {
    headers: {
      Authorization: `Bearer ${AuthService.getToken()}`,
    },
  });
  if (calendarEventsResponse.ok) {
    const calendarEvents = await calendarEventsResponse.json();
    return getEventGroups(calendarEvents, forNumberOfDays >= 30 ? "week" : "day");
  } else {
    throwError(calendarEventsResponse);
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
  const user = AuthService.getUser();
  return `${CALENDAR_API_ROOT}/${user.email}/events`;
};

const getEventGroups = (calendarEvents, groupBy = "day") => {
  const events = calendarEvents.items.map((event) => normalizeEvent(event));
  const eventGroups = groupEventsByDate(events, groupBy);
  return eventGroups;
};

const normalizeEvent = (event) => {
  return { id: event.id, summary: event.summary, start: new Date(event.start.dateTime), end: new Date(event.end.dateTime) };
};

const groupEventsByDate = (events, groupBy = "day") => {
  const eventGroup = [];

  for (const event of events) {
    const key =
      groupBy === "day"
        ? event.start.toLocaleString("hr-HR", { dateStyle: "full" })
        : `${event.start.toLocaleString("hr-HR", { month: "long" })}, ${getWeekOfMonth(event.start)}. tjedan`;

    const foundEvent = eventGroup.find((eg) => eg.key === key);
    if (foundEvent) {
      foundEvent.events.push(event);
    } else {
      eventGroup.push({
        key,
        events: [event],
      });
    }
  }
  return eventGroup;
};

const throwError = async (errorResponse) => {
  const error = (await errorResponse.json()).error;
  throw new Error(`${error.status}: ${error.message}`);
};

export const createCalendarEvent = async (event) => {
  if (!AuthService.isSignedIn()) {
    return;
  }

  const createEventResponse = await fetch(getEventsApiBaseUrl(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AuthService.getToken()}`,
    },
    body: JSON.stringify(event),
  });
  if (!createEventResponse.ok) {
    throwError(createEventResponse);
  }
};

export const deleteCalendarEvent = async (eventId) => {
  if (!AuthService.isSignedIn()) {
    return;
  }

  const deleteEventResponse = await fetch(`${getEventsApiBaseUrl()}/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${AuthService.getToken()}`,
    },
  });
  if (!deleteEventResponse.ok) {
    throwError(deleteEventResponse);
  }
};

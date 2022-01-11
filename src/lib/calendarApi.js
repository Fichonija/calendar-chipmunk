import { CALENDAR_API_ROOT } from "../lib/constants";

export const fetchCalendarEvents = async (calendarId, accessToken) => {
  try {
    const now = new Date().toISOString();
    const calendarResponse = await fetch(`${CALENDAR_API_ROOT}/${calendarId}/events?timeMin=${now}&singleEvents=true&orderBy=startTime`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const calendarResult = await calendarResponse.json();
    return calendarResult;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

import { Event } from "./Event";
import { googleEventObject } from "./calendar_interfaces/googleEvent";

export async function getEvents(timeMin?: Date, timeMax?: Date, showDeleted?: boolean, singleEvents?: boolean, orderBy?: string, maxResults?: number): Promise<Event[]>{
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!googleApiKey) {
        throw new Error('Google API key is not defined.');
    }

    const parameters = {
        key: googleApiKey,
        timeMin: timeMin ? timeMin.toISOString() : "",
        timeMax: timeMax ? timeMax.toISOString() : "",
        showDeleted: showDeleted ? "True" : "False",
        singleEvents: singleEvents ? "True" : "False",
        orderBy: orderBy ? orderBy : "",
        maxResults: (maxResults || 5).toString(),
    };

    const queryString = new URLSearchParams(
        Object.entries(parameters).filter(([, value]) => value !== "")
    ).toString();

    console.log(`https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events?${queryString}`);

    const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events?${queryString}`
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const eventData = await res.json();

    return eventData.items!.map((item: googleEventObject) => new Event(item as googleEventObject));
}
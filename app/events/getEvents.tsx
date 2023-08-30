import { Event } from "./Event";
import { googleEventObject } from "./calendar_interfaces/googleEvent";

export interface GetEventsOptions {
    timeMin?: Date;
    timeMax?: Date;
    showDeleted?: boolean;
    singleEvents?: boolean;
    orderBy?: string;
    maxResults?: number;
    eventId?: string;
}

export async function getEvents(options: GetEventsOptions = {}): Promise<Event[]> {
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!googleApiKey) {
        throw new Error('Google API key is not defined.');
    }

    const {
        timeMin,
        timeMax,
        showDeleted,
        singleEvents,
        orderBy,
        maxResults = 50,
        eventId,
    } = options;

    const parameters = {
        key: googleApiKey,
        timeMin: timeMin ? timeMin.toISOString() : "",
        timeMax: timeMax ? timeMax.toISOString() : "",
        showDeleted: showDeleted ? "True" : "False",
        singleEvents: singleEvents ? "True" : "False",
        orderBy: orderBy ? orderBy : "",
        maxResults: maxResults.toString(),
        eventId: eventId ? eventId : "",
    };

    let queryString = new URLSearchParams(
        Object.entries(parameters).filter(([, value]) => value !== "")
    ).toString();

    queryString = `https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events?${queryString}`;

    //console.log(queryString);

    const res = await fetch(
        queryString
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const eventData = await res.json();

    return eventData.items!.map((item: googleEventObject) => new Event(item as googleEventObject));
}

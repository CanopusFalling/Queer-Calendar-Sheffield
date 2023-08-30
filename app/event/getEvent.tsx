import { Event } from "./Event";
import { googleEventObject } from "./calendar_interfaces/googleEvent";

export interface GetEventOptions {
    eventId?: string;
}

export async function getEvent(options: GetEventOptions = {}): Promise<Event> {
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!googleApiKey) {
        throw new Error('Google API key is not defined.');
    }

    const parameters = {
        key: googleApiKey,
    };

    let queryString = new URLSearchParams(
        Object.entries(parameters).filter(([, value]) => value !== "")
    ).toString();

    const {
        eventId,
    } = options;

    queryString = `https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events/${eventId}?${queryString}`;

    //console.log(queryString);

    const res = await fetch(
        queryString
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const eventData = await res.json();

    return new Event(eventData as googleEventObject);
}

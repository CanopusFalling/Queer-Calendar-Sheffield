import { Event } from "./Event";
import { googleEventObject } from "./calendar_interfaces/googleEvent";

export interface GetEventOptions {
    eventId?: string;
    iCalUID?: string;
}

export async function getEvent(options: GetEventOptions = {}): Promise<Event> {
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!googleApiKey) {
        throw new Error('Google API key is not defined.');
    }

    let queryString = `https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events`;

    if (options.eventId) {
        queryString += `/${options.eventId}?key=${googleApiKey}`;
    } else if (options.iCalUID) {
        queryString += `?key=${googleApiKey}&iCalUID=${options.iCalUID}`;
    } else {
        throw new Error('Either eventId or iCalUID must be provided in options.');
    }

    const res = await fetch(queryString);

    if (!res.ok) {
        throw new Error('Failed to fetch data from ' + queryString);
    }

    const eventData = await res.json();

    //console.log(eventData);

    let event;
    if (options.iCalUID) {
        event = new Event(eventData.items[0] as googleEventObject)
    } else {
        event = new Event(eventData as googleEventObject);
    }

    //console.log(event.toPlainObject());

    return event;
}

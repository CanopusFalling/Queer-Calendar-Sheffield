import React from 'react';
import { Cache } from 'memory-cache';
import sanitizeHtml from 'sanitize-html';

export const runtime = 'edge';

// Create Cache to cache the events results.
const cache = new Cache();
const CACHE_DURATION = 60 * 1000; // milliseconds

interface GoogleCalendarApiArguments {
    timeMin: Date,
    timeMax: Date,
    maxResults: Number,
}

interface EventListProps {
    requestArguments: GoogleCalendarApiArguments
}

interface Event {
    id: string;
    summary: string;
    description: string;
    start: {
        dateTime?: string;
        date?: string;
    };
    end: {
        dateTime?: string;
        date?: string;
    };
}

async function getEvents({ timeMin, timeMax, maxResults }: GoogleCalendarApiArguments) {
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!googleApiKey) {
        throw new Error('Google API key is not defined.');
    }

    // Check if the data is already cached
    const cachedData = cache.get('events');
    if (cachedData) {
        return cachedData;
    }

    const parameters = {
        key: googleApiKey,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        showDeleted: 'False',
        singleEvents: 'True',
        orderBy: 'starttime',
        maxResults: maxResults.toString(),
    };

    const queryString = new URLSearchParams(parameters).toString();

    console.log(`https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events?${queryString}`);

    const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events?${queryString}`
    );

    if (!res.ok) {
        //console.log(res)
        throw new Error('Failed to fetch data');
    }

    const eventData = await res.json();

    // Cache the fetched data
    cache.put('events', eventData, CACHE_DURATION);

    return eventData;
}

export default async function EventList({ requestArguments }: EventListProps) {
    const events = await getEvents(requestArguments);

    const sanitizeOptions = {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
        allowedAttributes: {
            a: ['href']
        }
    };

    const formatEventTime = (startDateTime: string, endDateTime: string) => {
        const startDate = new Date(startDateTime);
        const endDate = new Date(endDateTime);

        if (startDate.toDateString() === endDate.toDateString()) {
            const timeMin = startDate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false
            });
            const timeMax = endDate.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false
            });

            return `${timeMin} - ${timeMax}`;
        } else {
            // Different days, display both date and time
            return `${startDateTime} - ${endDateTime}`;
        }
    };

    const eventCards = events.items.map((event: Event) => {
        const { id, summary, description, start, end } = event;
        const sanitizedDescription = sanitizeHtml(description, sanitizeOptions);

        return (

            <div
                key={id}
                className="block rounded-lg bg-white mb-2 p-6 shadow dark:shadow-white/10 dark:bg-neutral-700">
                <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {summary}
                </h5>
                <p className="mb-2 leading-tight text-neutral-800 dark:text-neutral-50">
                    <b>Time: </b>
                    {formatEventTime(start.dateTime || start.date as string, end.dateTime || end.date as string)}
                </p>
                <div
                    className="mb-4 text-base text-neutral-600 dark:text-neutral-200"
                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
            </div>
        );
    });

    return <div className="p-6 dark:bg-neutral-800">{eventCards}</div>;
}

const currentDate = new Date();
const newDate = new Date(currentDate);
newDate.setMonth(currentDate.getMonth() + 1);

EventList.defaultProps = {
    requestArguments: {
        timeMin: currentDate,
        timeMax: newDate,
        maxResults: 50,
    }
}
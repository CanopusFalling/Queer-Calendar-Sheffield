import React from 'react';
import { Cache } from 'memory-cache';
import sanitizeHtml from 'sanitize-html';

export const runtime = 'edge';

const cache = new Cache();
const CACHE_DURATION = 60 * 1000; // milliseconds

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

async function getEvents() {
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
        timeMin: new Date().toISOString(),
        showDeleted: 'False',
        singleEvents: 'True',
        orderBy: 'startTime',
        maxResults: 50,
    };

    const queryString = new URLSearchParams(parameters).toString();

    const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events?${queryString}`
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const eventData = await res.json();

    // Cache the fetched data
    cache.put('events', eventData, CACHE_DURATION);

    return eventData;
}

export default async function HomePage() {
    const events = await getEvents();

    const sanitizeOptions = {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
        allowedAttributes: {
            a: ['href']
        }
    };

    const eventCards = events.items.map((event: Event) => {
        const { id, summary, description, start, end } = event;

        return (
            <div key={id} className="event-card">
                <h3>{summary}</h3>
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(description, sanitizeOptions) }} />
                <p>Start: {start.dateTime || start.date}</p>
                <p>End: {end.dateTime || end.date}</p>
            </div>
        );
    });

    return (
        <div className="event-list">
            {eventCards}
        </div>
    );
}
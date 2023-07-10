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
    maxResults: '50',
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
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      a: ['href']
    }
  };

  const formatEventTime = (startDateTime: string, endDateTime: string) => {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    if (startDate.toDateString() === endDate.toDateString()) {
      const startTime = startDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });
      const endTime = endDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });

      return `${startTime} - ${endTime}`;
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
        className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {summary}
        </h5>
        <p className="mb-2 leading-tight text-neutral-800 dark:text-neutral-50">
          <b>Time: </b>
          {formatEventTime(start.dateTime || start.date as string, end.dateTime || end.date as string)}
        </p>
        <p
          className="mb-4 text-base text-neutral-600 dark:text-neutral-200"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </div>
    );
  });

  return <div className="event-list">{eventCards}</div>;
}
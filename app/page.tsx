import React from 'react';
import { Cache } from 'memory-cache';
import sanitizeHtml from 'sanitize-html';
import DateTimeWithDST from './dateHandling';
import { start } from 'repl';

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
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
    allowedAttributes: {
      a: ['href']
    }
  };

  const eventCards = events.items.map((event: Event) => {
    const { id, summary, description, start, end } = event;
    const sanitizedDescription = sanitizeHtml(description, sanitizeOptions);

    let isFullDayEvent = start.dateTime == undefined && end.dateTime == undefined

    const startDate = new Date(start.dateTime || start.date as string)
    const endDate = new Date(end.dateTime || end.date as string)

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
          <DateTimeWithDST start={startDate} end={endDate} isFullDayEvent={isFullDayEvent} />
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
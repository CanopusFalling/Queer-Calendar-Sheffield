import React from 'react';
import Head from 'next/head';
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'

import { Cache } from 'memory-cache';
import sanitizeHtml from 'sanitize-html';

import DateTimeWithDST from './dateHandling';
import GoogleCalendarButton from './googleCalendarButton';
import ShareButton from "./shareButton";

import { Event } from './Event';

export const runtime = 'edge';

// Create Cache to cache the events results.
const cache = new Cache();
const CACHE_DURATION = 60 * 1000; // milliseconds

type Props = {
    params: {}
    searchParams: { eventId: string }
}

const getEvent = async (eventId: string) => {
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!googleApiKey) {
        throw new Error('Google API key is not defined.');
    }

    // Check if the data is already cached
    // const cachedData = cache.get('event');
    // if (cachedData) {
    //     return cachedData;
    // }

    const parameters = {
        key: googleApiKey,
    };

    const queryString = new URLSearchParams(parameters).toString();

    const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/queercalendarsheffield@gmail.com/events/${eventId}?${queryString}`
    );

    if (!response.ok) {
        //console.log(res)
        throw new Error('Failed to fetch data');
    }

    const eventData = await response.json();

    // Cache the fetched data
    // cache.put('event', eventData, CACHE_DURATION);

    return eventData as Event;
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { eventId } = searchParams;

    const event = await getEvent(eventId);

    return {
        title: event.summary,
        description: event.description,
    }
}

export default async function EventPage(req: any, res: any) {
    const { eventId } = req.searchParams;

    const event = await getEvent(eventId);

    if (!eventId) {
        redirect('/');
    }

    const sanitizeOptions = {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
        allowedAttributes: {
            a: ['href']
        }
    };

    const sanitizedDescription = sanitizeHtml(event.description, sanitizeOptions);

    const urlEncodedLocation = encodeURIComponent(event.location);

    return (
        <div
            key={eventId}
            className="block rounded-lg bg-white mb-2 p-6 shadow dark:shadow-white/10 dark:bg-neutral-700">
            <h5
                className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {event.summary}
            </h5>
            <p className="mb-2 leading-tight text-neutral-800 dark:text-neutral-50">
                <b>Time: </b>
                <DateTimeWithDST
                    start={new Date(event.start.dateTime || event.start.date as string)}
                    end={new Date(event.end.dateTime || event.end.date as string)}
                    isFullDayEvent={event.start.dateTime == undefined && event.end.dateTime == undefined} />
            </p>
            {event.location && (
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${urlEncodedLocation}`}>
                    <p className="mb-2 leading-tight text-neutral-800 dark:text-neutral-50">
                        <b>Location: </b> {event.location}
                    </p>
                </a>
            )}
            <div
                className="mb-4 text-base text-neutral-600 break-words dark:text-neutral-200"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
            <GoogleCalendarButton event={event} />
            <ShareButton event={event} />
        </div>
    );
}
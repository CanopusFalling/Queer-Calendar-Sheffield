import React from 'react';
import sanitizeHtml from 'sanitize-html';

import DateTimeWithDST from './dateHandling';
import GoogleCalendarButton from './googleCalendarButton';
import ShareButton from "./shareButton";

import { Event } from './Event';

export const runtime = 'edge';

interface GoogleCalendarButtonProps {
    event: Event;
}

const eventCard: React.FC<GoogleCalendarButtonProps> = ({ event }) => {
    const { id, summary, location, description, startTime, endTime, allDay} = event;

    const urlEncodedLocation = encodeURIComponent(location)

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
                <DateTimeWithDST
                    start={startTime}
                    end={endTime}
                    isFullDayEvent={allDay} />
            </p>
            {location && (
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${urlEncodedLocation}`}>
                    <p className="mb-2 leading-tight text-neutral-800 dark:text-neutral-50">
                        <b>Location: </b> {location}
                    </p>
                </a>
            )}
            <div
                className="mb-4 text-base text-neutral-600 break-words dark:text-neutral-200"
                dangerouslySetInnerHTML={{ __html: event.getMarkupDescription() }}
            />
            <GoogleCalendarButton event={event.toPlainObject()} />
            <ShareButton event={event.toPlainObject()} />
        </div>
    );
}

export default eventCard;
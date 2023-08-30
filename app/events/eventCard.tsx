import React from 'react';

import DateTimeWithDST from './dateHandling';
import GoogleCalendarButton from './googleCalendarButton';
import ShareButton from "./shareEventButton";

import { Event } from './Event';
import OpenLinkInNewWindowButton from '../components/buttons/openLinkInNewWindow';

export const runtime = 'edge';

interface EventCardProps {
    event: Event;
    linkEvent: boolean;
}

const eventCard: React.FC<EventCardProps> = ({ event, linkEvent }) => {
    const { id, summary, location, description, startTime, endTime, allDay } = event;

    const urlEncodedLocation = encodeURIComponent(location)

    const eventURL = `/events?eventId=${event.id}`;

    return (
        <div
            data-testid={`event-card-${id}`}
            key={id}
            className="block rounded-lg bg-white mb-2 p-6 shadow dark:shadow-white/10 dark:bg-neutral-700">
            <a href={eventURL}>
                <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {summary}
                </h5>
            </a>
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
            <div className="flex flex-wrap gap-4">
                {linkEvent && <OpenLinkInNewWindowButton url={eventURL} />}
                <GoogleCalendarButton event={event.toPlainObject()} />
                <ShareButton event={event.toPlainObject()} />
            </div>
        </div>
    );
}

export default eventCard;
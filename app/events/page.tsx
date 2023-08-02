import React from 'react';
import { redirect } from 'next/navigation'

import { getEvents } from './getEvents'
import EventCard from './eventCard';

export const runtime = 'edge';

export default async function EventPage(req: any, res: any) {
    const { eventId } = req.searchParams;

    const event = (await getEvents({eventId: eventId}))[0];

    if (!eventId) {
        redirect('/');
    }

    return (
        <EventCard event={event}/>
    );
}
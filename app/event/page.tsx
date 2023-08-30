import React from 'react';
import { redirect } from 'next/navigation'

import { getEvent } from './getEvent'
import EventCard from './eventCard';

export const runtime = 'edge';

export default async function EventPage(req: any, res: any) {
    const { eventId } = req.searchParams;

    const event = (await getEvent({ eventId: eventId }));

    if (!eventId) {
        redirect('/');
    }

    return (
        <EventCard event={event} linkEvent={false}/>
    );
}
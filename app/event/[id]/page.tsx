export const runtime = 'edge';

import React from 'react';

import { getEvent } from '../getEvent'
import EventCard from '../eventCard';

export default async function Page({ params }: { params: { id: string } }) {
    const eventId = params.id;

    const event = (await getEvent({ eventId: eventId }));

    return (
        <EventCard event={event} linkEvent={false}/>
    );
}
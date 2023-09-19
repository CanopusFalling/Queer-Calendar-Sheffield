export const runtime = 'edge';

import React from 'react';
import { redirect } from 'next/navigation';

import { getEvent } from '../../getEvent'
import EventCard from '../../eventCard';

export default async function Page({ params }: { params: { id: string, eventTitle: string }}) {
    const eventId = params.id;

    const event = (await getEvent({ eventId: eventId }));

    // Redirect the user if the title in the URL does not match.
    if(params.eventTitle != event.getURIEncodedName()){
        redirect(event.getPath());
    }

    return (
        <EventCard event={event} linkEvent={false}/>
    );
}
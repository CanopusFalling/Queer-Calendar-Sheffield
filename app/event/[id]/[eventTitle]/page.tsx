export const runtime = 'edge';

import React from 'react';
import { redirect } from 'next/navigation';

import { getEvent } from '../../getEvent'
import EventCard from '../../eventCard';
import EventNotFound from '../../event_not_found';

export default async function Page({ params }: { params: { id: string, eventTitle: string }}) {
    const eventId = params.id;

    let event;

    try {
        event = (await getEvent({ eventId: eventId }));
    } catch (error) {
        console.log(error)
        return (<EventNotFound/>);
    }

    // Redirect the user if the title in the URL does not match.
    if(params.eventTitle != event.getURIEncodedName()){
        redirect(event.getPath());
    }

    return (
        <EventCard event={event} linkEvent={false}/>
    );
}
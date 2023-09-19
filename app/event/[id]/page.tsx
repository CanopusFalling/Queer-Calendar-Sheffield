export const runtime = 'edge';
import React from 'react';

import { redirect } from 'next/navigation';

import { getEvent } from '../getEvent'
import EventNotFound from '../event_not_found';

export default async function Page({ params }: { params: { id: string } }) {
    const eventId = params.id;

    let event;

    try {
        event = (await getEvent({ eventId: eventId }));
    } catch (error) {
        console.log(error)
        return (<EventNotFound/>);
    }

    redirect(event.getPath());
}
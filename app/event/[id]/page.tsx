export const runtime = 'edge';

import React from 'react';
import { redirect } from 'next/navigation';

import { getEvent } from '../getEvent'
import EventCard from '../eventCard';

export default async function Page({ params }: { params: { id: string } }) {
    const eventId = params.id;

    const event = (await getEvent({ eventId: eventId }));

    redirect(event.getPath());
}
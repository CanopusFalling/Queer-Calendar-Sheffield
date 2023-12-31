import React from "react";

import EventCard from "./eventCard";

import { Event } from "./Event";

interface EventListProps {
  events: Event[];
}

export default async function EventList({ events }: EventListProps) {
  return (
    <>
      {events.map((event) => (
        <EventCard key={event.id} event={event} linkEvent={true} />
      ))}
    </>
  );
}

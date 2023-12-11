import React from "react";

import EventCard from "./eventCard";

import { Event } from "./Event";

interface EventListProps {
  events: Event[];
}

export default async function EventList({ events }: EventListProps) {
  //console.log(events)
  return (
    <div className="p-6 dark:bg-neutral-800">
      {events.map((event) => (
        <EventCard key={event.id} event={event} linkEvent={true} />
      ))}
    </div>
  );
}

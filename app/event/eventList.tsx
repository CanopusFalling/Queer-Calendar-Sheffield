import React from "react";

import EventCard from "./eventCard";

import { Event } from "./Event";

interface EventListProps {
  events: Event[];
}

export default async function EventList({ events }: EventListProps) {
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "ItemList",
    name: "Event List",
    numberOfItems: events.length,
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.summary,
        startDate: event.startTime.toDateString(),
        endDate: event.endTime.toDateString(),
        location: event.location,
        description: event.description,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {events.map((event) => (
        <EventCard key={event.id} event={event} linkEvent={true} />
      ))}
    </>
  );
}

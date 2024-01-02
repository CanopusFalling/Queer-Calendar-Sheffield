import React from "react";

import EventCard from "./eventCard";

import { Event } from "./Event";

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }: EventListProps) => {
  console.log(events);
  return (
    <>
      {events.map((event) => (
        <EventCard key={event.id} event={event} linkEvent={true} />
      ))}
    </>
  );
};

export default EventList;

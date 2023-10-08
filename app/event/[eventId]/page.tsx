export const runtime = "edge";
import React from "react";

import { redirect } from "next/navigation";

import { getEvent } from "../getEvent";
import EventNotFound from "../event_not_found";
import EventCard from "../eventCard";

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;

  let event;
  try {
    event = await getEvent({ eventId: eventId });
  } catch (error) {
    console.log(error);
    return <EventNotFound />;
  }

  return <EventCard event={event} linkEvent={false} />;
}

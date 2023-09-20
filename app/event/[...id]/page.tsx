export const runtime = "edge";
import React from "react";

import { redirect } from "next/navigation";

import { getEvent } from "../getEvent";
import EventNotFound from "../event_not_found";
import EventCard from "../eventCard";

export default async function Page({
  params,
}: {
  params: { id: [string, string] };
}) {
  const eventId = params.id[0];
  console.log(`Event ID: ${eventId}`)

  let event = await getEvent({ eventId: eventId });

  // try {
  //   event = await getEvent({ eventId: eventId });
  // } catch (error) {
  //   console.log(error);
  //   return <EventNotFound />;
  // }

  // Redirect the user if the title in the URL does not match.
  if (params.id[1] != event.getURIEncodedName()) {
    redirect(event.getPath());
  }

  return <EventCard event={event} linkEvent={false} />;
}

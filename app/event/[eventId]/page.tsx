export const runtime = "edge";
import React from "react";

import type { Metadata, ResolvingMetadata } from "next";

import { getEvent } from "../getEvent";
import EventNotFound from "../event_not_found";
import EventCard from "../eventCard";

type Props = {
  params: { eventId: string };
  searchParams: {};
};

async function fetchEvent(eventId: string) {
  try {
    const event = await getEvent({ eventId });
    return event;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  let event;

  try {
    event = await fetchEvent(params.eventId);
  } catch (error) {
    // Handle the error, e.g., log it or return a default metadata
    console.error("Error fetching event for metadata:", error);
    return {};
  }

  const openGraph = {
    title: event.summary,
    description: event.description,
    images: [],
    url: event.getPath(),
  };

  return {
    title: `${event.summary} | Queer Calendar Sheffield`,
    description: `${event.summary} | ${event.description}`,
    openGraph: openGraph,
  };
}

export default async function Page({ params, searchParams }: Props) {
  try {
    const event = await fetchEvent(params.eventId);
    return <EventCard event={event} linkEvent={false} />;
  } catch (error) {
    console.error("Error fetching event for page:", error);
    return <EventNotFound />;
  }
}

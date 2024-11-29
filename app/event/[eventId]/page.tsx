import React from "react";

import type { Metadata, ResolvingMetadata } from "next";

import { getEvent } from "../getEvent";
import EventNotFound from "../event_not_found";
import EventCard from "../eventCard";

type Props = {
  params: Promise<{ eventId: string }>;
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
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  let event;

  try {
    event = await fetchEvent((await params).eventId);
  } catch (error) {
    // Handle the error, e.g., log it or return a default metadata
    console.error("Error fetching event for metadata:", error);
    return {};
  }

  const openGraph = {
    title: event.summary,
    description: event.getTextDescription(),
    url: event.getPath(),
    images: [
      {
        url: "open-graph-banner.webp",
        width: 1200,
        height: 630,
        alt: 'A rainbow calendar icon with a heart shape in the centre of the icon and to the right of that the words "Queer Calendar Sheffield" in white, bold text each word on a new line all on a black background.',
      },
    ],
  };

  return {
    title: `${event.summary} | Queer Calendar Sheffield`,
    description: `${event.summary} | ${event.getTextDescription()}`,
    openGraph: openGraph,
  };
}

export default async function Page({ params }: Props) {
  try {
    const event = await fetchEvent((await params).eventId);
    return <EventCard event={event} linkEvent={false} />;
  } catch (error) {
    console.error("Error fetching event for page:", error);
    return <EventNotFound />;
  }
}

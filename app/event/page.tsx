import React from "react";
import { redirect } from "next/navigation";

import { getEvent } from "./getEvent";
import EventCard from "./eventCard";

export default async function EventPage(req: any, res: any) {
  const { eventId } = req.searchParams;

  if (!eventId) {
    redirect("/");
  }

  const event = await getEvent({ eventId: eventId });

  redirect(event.getPath());
}

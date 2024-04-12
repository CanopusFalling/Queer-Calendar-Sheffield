import { redirect } from "next/navigation";

import { getEvents } from "./getEvents";
import EventList from "./eventList";
import { GetEventsOptions } from "./getEvents";

export default async function EventPage(req: any, res: any) {
  // Check if can be redirected to a specific event on the `event/[id]` path.
  const specificEvent =
    Object.keys(req.searchParams).length === 1 &&
    req.searchParams.eventId !== undefined;

  if (specificEvent) {
    redirect(`event/${req.searchParams.eventId}`);
  } else {
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(currentDate.getMonth() + 1);
    const eventParams: GetEventsOptions = {
      singleEvents: true,
      timeMin: currentDate,
      timeMax: maxDate,
      orderBy: "startTime",
    };
    const events = await getEvents(eventParams);

    return <EventList events={events} />;
  }
}

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

    return (
      <>
        <div className="mx-4">
          <h1 className="mb-2 text-3xl font-bold bg-gradient-to-r">
            Upcoming Events
          </h1>
          <hr className="mb-3 border-0 w-full h-px bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 brightness-75 dark:brightness-100" />
        </div>
        <EventList events={events} />
      </>
    );
  }
}

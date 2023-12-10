import { getEvents } from "./event/getEvents";
import EventList from "./event/eventList";
import { GetEventsOptions } from "./event/getEvents";

export default async function HomePage() {
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

export const runtime = 'edge';

import { getEvents } from './events/getEvents';
import EventList from './events/eventList'
import { GetEventsOptions } from './events/getEvents'

export default async function HomePage() {
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(currentDate.getMonth() + 1);
  const eventParams: GetEventsOptions = {
    singleEvents: true,
    timeMin: currentDate,
    timeMax: maxDate,
    orderBy: "startTime"
  }
  const events = await getEvents(eventParams);

  return (

    <EventList events={events} />
  )
}
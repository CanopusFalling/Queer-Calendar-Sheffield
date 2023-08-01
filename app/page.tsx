export const runtime = 'edge';

import { getEvents } from './events/getEvents';
import EventList from './events/eventList'

export default async function HomePage() {
  const events = await getEvents();

  return (

    <EventList events={events}/>
  )
}
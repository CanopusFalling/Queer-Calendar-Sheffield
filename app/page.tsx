export const runtime = 'edge';

import EventList from './events/eventList'

export default async function HomePage() {
  return (
    <EventList />
  )
}
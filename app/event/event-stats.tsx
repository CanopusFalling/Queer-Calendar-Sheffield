import { getEvents } from "./getEvents";
import { GetEventsOptions } from "./getEvents";

export default async function EventStats() {
  const currentDate = new Date();
  const eventParams: GetEventsOptions = {
    singleEvents: true,
    maxResults: 2500,
    timeMin: currentDate,
  };
  const events = await getEvents(eventParams);

  let lastUpdated = events[0].lastModified;
  let EventsThisMonth = 0;

  events.forEach((event) => {
    if (event.lastModified > lastUpdated) {
      lastUpdated = event.lastModified;
    }
    if (
      currentDate.getMonth() == event.startTime.getMonth() &&
      currentDate.getFullYear() == event.startTime.getFullYear()
    ) {
      EventsThisMonth++;
    }
  });

  return (
    <section className="my-4 mb-8 m-auto max-w-xl border-purple-500 border rounded-3xl p-6">
      <h2 className="mb-2 text-3xl font-bold bg-gradient-to-r">
        Calendar Statistics
      </h2>
      <hr className="mb-3 border-0 w-full h-px bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 brightness-75 dark:brightness-100" />
      <span className="font-bold">Last Updated: </span>
      {lastUpdated.toLocaleDateString()} <br />
      <span className="font-bold">Events this Month: </span>
      {EventsThisMonth} <br />
    </section>
  );
}

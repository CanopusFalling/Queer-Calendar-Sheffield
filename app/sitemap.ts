import { MetadataRoute } from 'next';

import { getEvents } from './event/getEvents';
import { GetEventsOptions } from './event/getEvents';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let sitemap: MetadataRoute.Sitemap = [
    {
      url: 'https://queercalendarsheffield.co.uk/',
      lastModified: new Date(),
    },
    {
      url: 'https://queercalendarsheffield.co.uk/contributors',
      lastModified: new Date(),
    },
  ];

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 12);
  const eventParams: GetEventsOptions = {
    singleEvents: true,
    maxResults: 2500,
    timeMax: maxDate
  }
  const events = await getEvents(eventParams);

  events.forEach(event => {
    sitemap.push({
      url: `https://queercalendarsheffield.co.uk${event.getPath()}`,
      lastModified: event.lastModified.toISOString(),
    });
  });

  return sitemap;
}
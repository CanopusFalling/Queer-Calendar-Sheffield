import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://queercalendarsheffield.co.uk/',
      lastModified: new Date(),
    },
    {
      url: 'https://queercalendarsheffield.co.uk/contributors',
      lastModified: new Date(),
    },
  ]
}
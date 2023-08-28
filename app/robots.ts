import { MetadataRoute } from 'next'

const env = process.env.NODE_ENV;
const isProduction = env == 'production';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // Only allow the site to be scraped on the production deploy.
      allow: isProduction ? '/' : '',
      disallow: isProduction ? '' : '/',
    },
    sitemap: 'https://queercalendarsheffield.co.uk/sitemap.xml',
  }
}
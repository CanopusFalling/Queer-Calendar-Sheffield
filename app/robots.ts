import { MetadataRoute } from 'next'

const cfBranch = process.env.CF_PAGES_BRANCH;
const isProduction = cfBranch == 'main';

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
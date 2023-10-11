import { MetadataRoute } from "next";

const isProduction = process.env.CF_PRODUCTION == "1";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Only allow the site to be scraped on the production deploy.
      allow: isProduction ? "/" : "",
      disallow: isProduction ? "" : "/",
    },
    sitemap: "https://queercalendarsheffield.co.uk/sitemap.xml",
  };
}

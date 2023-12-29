// Export edge on the base layout.
export const runtime = "edge";

import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";

import type { Viewport, Metadata } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  let metadata: Metadata = {
    title: "Queer Calendar Sheffield",
    description: "Find out what queer events are on in Sheffield!",
    openGraph: {
      title: "Queer Calendar Sheffield",
      type: "website",
      images: [
        {
          url: "open-graph-banner.webp",
          width: 1200,
          height: 630,
          alt: 'A rainbow calendar icon with a heart shape in the centre of the icon and to the right of that the words "Queer Calendar Sheffield" in white, bold text each word on a new line all on a black background.',
        },
      ],
      siteName: "Queer Calendar Sheffield",
      locale: "en_GB",
      description: "A place to find queer and LGBTQ+ events in Sheffield.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Queer Calendar Sheffield",
      description: "A place to find queer and LGBTQ+ events in Sheffield.",
      images: [
        {
          url: "open-graph-banner.webp",
          width: 1200,
          height: 630,
          alt: 'A rainbow calendar icon with a heart shape in the centre of the icon and to the right of that the words "Queer Calendar Sheffield" in white, bold text each word on a new line all on a black background.',
        },
      ],
    },
    icons: {
      icon: "./favicon.ico",
    },
  };

  //Set a baseURL only if the environment is a production Env.
  if (process.env.CF_PRODUCTION == "1") {
    metadata.metadataBase = new URL("https://queercalendarsheffield.co.uk");
  } else if (process.env.CF_PAGES_URL) {
    metadata.metadataBase = new URL(process.env.CF_PAGES_URL as string);
  } else {
    metadata.metadataBase = new URL("https://queercalendarsheffield.co.uk");
  }

  return metadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className="block bg-white dark:shadow-white/10 dark:bg-neutral-800">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

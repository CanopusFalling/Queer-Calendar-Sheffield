import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://queercalendarsheffield.co.uk"),
  alternates: {
    canonical: "/",
  },
  title: "Queer Calendar Sheffield",
  description: "Find out what queer events are on in Sheffield!",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Queer Calendar Sheffield",
    url: "/",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="block bg-white dark:shadow-white/10 dark:bg-neutral-700">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

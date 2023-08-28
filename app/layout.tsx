import './globals.css';

import Header from './components/header';
import Footer from './components/footer';

export const metadata = {
  title: 'Queer Calendar Sheffield',
  description: 'Find out what queer events are on in Sheffield!',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Open Graph meta tags */}
        <meta name="og:image" content="open-graph-banner.webp"/>
        <meta property="og:image:type" content="image/webp"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        {/* Icon meta tags */}
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className='block bg-white dark:shadow-white/10 dark:bg-neutral-700'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

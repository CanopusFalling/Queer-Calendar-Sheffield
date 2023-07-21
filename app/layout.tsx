import './globals.css';

import Header from './header';
import Footer from './footer';

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
      <body className='block bg-white dark:shadow-white/10 dark:bg-neutral-700'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from '@/components/providers';
import '../index.css';

export const metadata: Metadata = {
  title: 'Enate — Ethiopian & Eritrean Restaurant',
  description: 'Enate serves vibrant Ethiopian and Eritrean vegan, vegetarian and traditional food, with coffee poured in ceremony.',
  icons: {
    icon: '/menu-assets/enate-logo-transparent.png',
    shortcut: '/menu-assets/enate-logo-transparent.png',
    apple: '/menu-assets/enate-logo-transparent.png',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Enate — Ethiopian & Eritrean Restaurant',
    description: 'Vibrant Ethiopian and Eritrean food, generous plates, and coffee poured with ceremony.',
    type: 'website',
    images: ['/menu-assets/enate-logo.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enate — Ethiopian & Eritrean Restaurant',
    description: 'Vibrant Ethiopian and Eritrean food, generous plates, and coffee poured with ceremony.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

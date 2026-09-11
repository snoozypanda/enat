import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from '@/components/providers';
import '../index.css';

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ember-and-stone-ten.vercel.app');

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: 'Enate Restaurant',
  title: {
    default: 'Enate | Ethiopian and Eritrean Cuisine in Soho, London',
    template: '%s | Enate Restaurant',
  },
  description: 'Enate serves authentic Ethiopian and Eritrean cuisine in Soho, London. Enjoy injera, tibs, doro wat, vegan and vegetarian dishes, sharing platters, and traditional coffee ceremonies.',
  keywords: [
    'Ethiopian restaurant Soho',
    'Eritrean restaurant London',
    'Ethiopian and Eritrean cuisine',
    'Ethiopian and Eritrean restaurant Soho',
    'Ethiopian food London',
    'Ethiopian restaurant near me',
    'Ethiopian vegan food London',
    'injera Soho',
    'doro wat London',
    'Ethiopian coffee ceremony London',
    'vegetarian Ethiopian restaurant',
    'Enate Restaurant',
  ],
  alternates: { canonical: '/' },
  icons: {
    icon: '/menu-assets/enate-logo-transparent.png',
    shortcut: '/menu-assets/enate-logo-transparent.png',
    apple: '/menu-assets/enate-logo-transparent.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    title: 'Enate | Ethiopian and Eritrean Cuisine in Soho, London',
    description: 'Authentic Ethiopian and Eritrean cuisine in Soho: generous sharing plates, vegan favourites and traditional coffee ceremonies.',
    url: '/',
    siteName: 'Enate Restaurant',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Enate Ethiopian and Eritrean Restaurant logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enate | Ethiopian and Eritrean Cuisine in Soho, London',
    description: 'Authentic Ethiopian and Eritrean cuisine in Soho: generous sharing plates, vegan favourites and traditional coffee ceremonies.',
    images: [{ url: '/opengraph-image', alt: 'Enate Ethiopian and Eritrean Restaurant logo' }],
  },
  category: 'restaurant',
  other: {
    'geo.region': 'GB-LND',
    'geo.placename': 'Soho, London',
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

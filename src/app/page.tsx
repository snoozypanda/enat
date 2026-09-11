import App from '@/App';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ember-and-stone-ten.vercel.app';

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${siteUrl}/#restaurant`,
  name: 'Enate Restaurant',
  alternateName: 'Enat',
  url: siteUrl,
  logo: `${siteUrl}/menu-assets/enate-logo-transparent.png`,
  image: `${siteUrl}/opengraph-image`,
  description: 'Authentic Ethiopian and Eritrean cuisine in Soho, London, serving traditional, vegan and vegetarian dishes plus Ethiopian coffee ceremonies.',
  servesCuisine: ['Ethiopian and Eritrean cuisine', 'Ethiopian', 'Eritrean', 'Vegan', 'Vegetarian'],
  priceRange: '££',
  telephone: '+442079460812',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '16 Bateman Street',
    addressLocality: 'London',
    addressRegion: 'Greater London',
    postalCode: 'W1D 3AH',
    addressCountry: 'GB',
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '17:30',
    closes: '23:00',
  }],
  acceptsReservations: true,
  hasMenu: `${siteUrl}/#menu`,
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      <App />
    </>
  );
}

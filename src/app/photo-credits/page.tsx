import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo credits — Enate',
  description: 'Source and licence information for food photography used by Enate.',
};

const credits = [
  {
    usedFor: 'Kategna, breakfast and starter imagery',
    source: 'Ethiopian meal on Pexels',
    href: 'https://www.pexels.com/photo/meal-on-plate-17486836/',
    licence: 'Pexels licence',
  },
  {
    usedFor: 'Hummus',
    source: 'Hummus on Pexels',
    href: 'https://www.pexels.com/photo/hummus-in-bowls-6252723/',
    licence: 'Pexels licence',
  },
  {
    usedFor: 'Samosa',
    source: 'Samosa on Unsplash',
    href: 'https://unsplash.com/photos/samosa-on-table-3oc6OzX4LaQ',
    licence: 'Unsplash licence',
  },
  {
    usedFor: 'Ful',
    source: 'Ful Medames on Wikimedia Commons',
    href: 'https://commons.wikimedia.org/wiki/File:Ful_Medames.JPG',
    licence: 'CC0',
  },
  {
    usedFor: 'Vegetarian dishes',
    source: 'Ethiopian fasting platter on Wikimedia Commons',
    href: 'https://commons.wikimedia.org/wiki/File:Ethiopian_fasting_platter.jpg',
    licence: 'CC0',
  },
  {
    usedFor: 'Doro Wot and chicken mains',
    source: 'USDA Food and Nutrition Service cultural food image',
    href: 'https://commons.wikimedia.org/wiki/File:MyPlate_gov_Cultural_Food_(20241025-USDA-FNS-UNK-0019).jpg',
    licence: 'Public domain',
  },
  {
    usedFor: 'Fish dishes',
    source: 'Fried fish on Unsplash',
    href: 'https://unsplash.com/photos/brown-bread-on-white-ceramic-plate-v7RqUKFdZ0A',
    licence: 'Unsplash licence',
  },
  {
    usedFor: 'Packages and platters',
    source: 'Ethiopian breakfast meals on Pexels',
    href: 'https://www.pexels.com/photo/breakfast-meals-on-plates-17486827/',
    licence: 'Pexels licence',
  },
  {
    usedFor: 'Coffee ceremony',
    source: 'Coffee ceremony on Unsplash',
    href: 'https://unsplash.com/photos/woman-in-purple-and-white-dress-sitting-on-brown-wooden-seat-us5Ti3ladQY',
    licence: 'Unsplash licence',
  },
];

export default function PhotoCreditsPage() {
  return (
    <main className="min-h-screen bg-[#242522] px-5 py-16 text-[#f4f2e9] md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-[#f3cf22]">Enate / photography</p>
        <h1 className="display mt-5 text-6xl leading-[.85] md:text-8xl">Photo<br /><em>credits.</em></h1>
        <p className="mt-10 max-w-2xl text-sm leading-7 text-[#f4f2e9]/70">
          The menu uses locally hosted food photography so the experience remains fast and dependable.
          Source pages and licences for the externally sourced images are listed below.
        </p>
        <ul className="mt-12 divide-y divide-[#f4f2e9]/15 border-y border-[#f4f2e9]/15">
          {credits.map((credit) => (
            <li key={credit.href} className="grid gap-2 py-5 sm:grid-cols-[.8fr_1.2fr_auto] sm:items-center">
              <span className="text-sm text-[#f4f2e9]/60">{credit.usedFor}</span>
              <a href={credit.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#f3cf22] hover:text-[#f4f2e9]">
                {credit.source}
              </a>
              <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#f4f2e9]/45">{credit.licence}</span>
            </li>
          ))}
        </ul>
        <a href="/" className="mt-10 inline-flex text-[11px] font-bold uppercase tracking-[.16em] text-[#f3cf22] hover:text-[#f4f2e9]">
          ← Back to Enate
        </a>
      </div>
    </main>
  );
}

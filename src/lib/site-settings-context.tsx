'use client';

import { createContext, useContext } from 'react';

export type SiteSettings = {
  streetAddress: string;
  cityPostcode: string;
  areaName: string;
  phone: string;
  email?: string;
  openDays: string;
  openHours: string;
  foundedYear: string;
};

export const defaultSiteSettings: SiteSettings = {
  streetAddress: '78 Goldhawk Rd',
  cityPostcode: 'London W12 8HA',
  areaName: "Shepherd's Bush",
  phone: '+44 (0)20 7946 0812',
  email: 'hello@enate.et',
  openDays: 'Mon—Sun',
  openHours: '8:30—23:00',
  foundedYear: '2024',
};

export const SiteSettingsContext = createContext<SiteSettings>(defaultSiteSettings);

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}

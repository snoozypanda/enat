import { menuCategories } from '@/lib/menu';

export const CATEGORY_STORAGE_KEY = 'enate-admin-categories-v1';

export const defaultMenuCategories = menuCategories.filter((category) => category !== 'the full menu');

export function readStoredCategories(): string[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === 'string' && item.trim().length > 0)) return null;
    return Array.from(new Set(parsed.map((item) => item.trim().toLowerCase())));
  } catch {
    return null;
  }
}

export function menuTabs(categories: string[]): string[] {
  const withoutFullMenu = categories.filter((category) => category !== 'the full menu');
  const starterIndex = withoutFullMenu.indexOf('starters');
  if (starterIndex === -1) return ['the full menu', ...withoutFullMenu];
  return [
    ...withoutFullMenu.slice(0, starterIndex + 1),
    'the full menu',
    ...withoutFullMenu.slice(starterIndex + 1),
  ];
}

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

/**
 * Keep catalogue categories in their reference order, then include valid
 * managed categories without ever showing an empty tab.
 */
export function reconcileMenuCategories(categories: string[], dishCategories: string[]): string[] {
  const available = new Set(dishCategories.map((category) => category.trim().toLowerCase()));
  const seen = new Set<string>();
  const result: string[] = [];

  const add = (value: string) => {
    const category = value.trim().toLowerCase();
    if (!category || category === 'the full menu' || !available.has(category) || seen.has(category)) return;
    seen.add(category);
    result.push(category);
  };

  defaultMenuCategories.forEach(add);
  categories.forEach(add);
  dishCategories.forEach(add);

  return menuTabs(result);
}

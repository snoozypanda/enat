import { menuDishes, type MenuDish } from '@/lib/menu';

export const MENU_STORAGE_KEY = 'enat-admin-menu-v2';

export type StoredMenuItem = MenuDish & {
  available: boolean;
};

function isStoredMenuItem(value: unknown): value is StoredMenuItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'string'
    && typeof item.name === 'string'
    && typeof item.category === 'string'
    && typeof item.description === 'string'
    && typeof item.detail === 'string'
    && typeof item.price === 'string'
    && typeof item.image === 'string'
    && typeof item.tag === 'string'
    && typeof item.available === 'boolean';
}

export function readStoredMenu(): StoredMenuItem[] | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(MENU_STORAGE_KEY);
    if (!stored) return null;
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.every(isStoredMenuItem) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Saved menus can predate dishes added to the catalogue. Merge them by id so
 * admins keep their edits while every current catalogue dish remains editable.
 */
export function mergeStoredMenuWithCatalog(items: StoredMenuItem[] | null): StoredMenuItem[] {
  const savedItems = items || [];
  const savedById = new Map(savedItems.map((item) => [item.id, item]));
  const catalogueIds = new Set(menuDishes.map((item) => item.id));

  return [
    ...menuDishes.map((item) => savedById.get(item.id) || { ...item, available: true }),
    ...savedItems.filter((item) => !catalogueIds.has(item.id)),
  ];
}

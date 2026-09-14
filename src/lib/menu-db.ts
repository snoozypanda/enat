import { neon } from '@neondatabase/serverless';
import { canonicalCatalogDishIds, menuDishes, type MenuDish } from '@/lib/menu';

export type ManagedMenuItem = MenuDish & { available: boolean };

type MenuRow = { items: unknown; catalog_revision: number };
const CATALOG_REVISION = 1;

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) throw new Error('Menu storage is not configured.');
  return neon(databaseUrl);
}

export function isManagedMenuItem(value: unknown): value is ManagedMenuItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'string'
    && typeof item.category === 'string'
    && typeof item.name === 'string'
    && typeof item.description === 'string'
    && typeof item.detail === 'string'
    && typeof item.price === 'string'
    && typeof item.image === 'string'
    && typeof item.tag === 'string'
    && typeof item.available === 'boolean';
}

export function isManagedMenu(value: unknown): value is ManagedMenuItem[] {
  return Array.isArray(value) && value.every(isManagedMenuItem);
}

async function ensureMenuTable() {
  const sql = getDatabase();
  await sql`CREATE TABLE IF NOT EXISTS menu_catalog (
    id BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (id = TRUE),
    items JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`ALTER TABLE menu_catalog ADD COLUMN IF NOT EXISTS catalog_revision INTEGER NOT NULL DEFAULT 0`;
  return sql;
}

function upgradeCurrentCatalogue(items: ManagedMenuItem[]): ManagedMenuItem[] {
  const savedById = new Map(items.map((item) => [item.id, item]));
  const catalogueIds = new Set(menuDishes.map((item) => item.id));

  return [
    ...menuDishes.map((dish) => {
      const saved = savedById.get(dish.id);
      if (!saved) return { ...dish, available: true };
      // Apply the supplied menu copy once, then let the admin edit it freely.
      return canonicalCatalogDishIds.has(dish.id) ? { ...dish, available: saved.available } : saved;
    }),
    ...items.filter((item) => !catalogueIds.has(item.id)),
  ];
}

export async function readMenu(): Promise<ManagedMenuItem[] | null> {
  const sql = await ensureMenuTable();
  const rows = await sql`SELECT items, catalog_revision FROM menu_catalog WHERE id = TRUE LIMIT 1` as unknown as MenuRow[];
  const items = rows[0]?.items;
  if (!isManagedMenu(items)) return null;
  if (rows[0].catalog_revision >= CATALOG_REVISION) return items;

  const upgraded = upgradeCurrentCatalogue(items);
  const serializedItems = JSON.stringify(upgraded);
  await sql`UPDATE menu_catalog
    SET items = ${serializedItems}::jsonb, catalog_revision = ${CATALOG_REVISION}, updated_at = NOW()
    WHERE id = TRUE`;
  return upgraded;
}

export async function saveMenu(items: ManagedMenuItem[]): Promise<void> {
  const sql = await ensureMenuTable();
  const serializedItems = JSON.stringify(items);
  await sql`INSERT INTO menu_catalog (id, items, catalog_revision)
    VALUES (TRUE, ${serializedItems}::jsonb, ${CATALOG_REVISION})
    ON CONFLICT (id) DO UPDATE SET items = EXCLUDED.items, catalog_revision = EXCLUDED.catalog_revision, updated_at = NOW()`;
}

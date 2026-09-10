import { neon } from '@neondatabase/serverless';
import type { MenuDish } from '@/lib/menu';

export type ManagedMenuItem = MenuDish & { available: boolean };

type MenuRow = { items: unknown };

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) throw new Error('Menu storage is not configured.');
  return neon(databaseUrl);
}

function isManagedMenuItem(value: unknown): value is ManagedMenuItem {
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
  return sql;
}

export async function readMenu(): Promise<ManagedMenuItem[] | null> {
  const sql = await ensureMenuTable();
  const rows = await sql`SELECT items FROM menu_catalog WHERE id = TRUE LIMIT 1` as unknown as MenuRow[];
  const items = rows[0]?.items;
  return isManagedMenu(items) ? items : null;
}

export async function saveMenu(items: ManagedMenuItem[]): Promise<void> {
  const sql = await ensureMenuTable();
  const serializedItems = JSON.stringify(items);
  await sql`INSERT INTO menu_catalog (id, items)
    VALUES (TRUE, ${serializedItems}::jsonb)
    ON CONFLICT (id) DO UPDATE SET items = EXCLUDED.items, updated_at = NOW()`;
}

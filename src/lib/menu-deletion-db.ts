import { neon } from '@neondatabase/serverless';

type DeletedMenuItemRow = { item_id: string };

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) throw new Error('Menu storage is not configured.');
  return neon(databaseUrl);
}

async function ensureDeletedMenuItemsTable() {
  const sql = getDatabase();
  await sql`CREATE TABLE IF NOT EXISTS deleted_menu_items (
    item_id TEXT PRIMARY KEY,
    deleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  return sql;
}

export async function listDeletedMenuItemIds(): Promise<string[]> {
  const sql = await ensureDeletedMenuItemsTable();
  const rows = await sql`SELECT item_id FROM deleted_menu_items` as unknown as DeletedMenuItemRow[];
  return rows.map((row) => row.item_id);
}

export async function deleteMenuItem(itemId: string): Promise<void> {
  const sql = await ensureDeletedMenuItemsTable();
  await sql`INSERT INTO deleted_menu_items (item_id) VALUES (${itemId}) ON CONFLICT (item_id) DO NOTHING`;
}

export async function restoreMenuItem(itemId: string): Promise<void> {
  const sql = await ensureDeletedMenuItemsTable();
  await sql`DELETE FROM deleted_menu_items WHERE item_id = ${itemId}`;
}

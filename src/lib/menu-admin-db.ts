import { neon } from '@neondatabase/serverless';

type AvailabilityRow = { item_id: string; available: boolean };

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) throw new Error('Menu storage is not configured.');
  return neon(databaseUrl);
}

async function ensureAvailabilityTable() {
  const sql = getDatabase();
  await sql`CREATE TABLE IF NOT EXISTS menu_item_availability (
    item_id TEXT PRIMARY KEY,
    available BOOLEAN NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  return sql;
}

export async function listMenuAvailability(): Promise<Record<string, boolean>> {
  const sql = await ensureAvailabilityTable();
  const rows = await sql`SELECT item_id, available FROM menu_item_availability` as unknown as AvailabilityRow[];
  return Object.fromEntries(rows.map((row) => [row.item_id, row.available]));
}

export async function setMenuAvailability(itemId: string, available: boolean): Promise<void> {
  const sql = await ensureAvailabilityTable();
  await sql`INSERT INTO menu_item_availability (item_id, available)
    VALUES (${itemId}, ${available})
    ON CONFLICT (item_id) DO UPDATE SET available = EXCLUDED.available, updated_at = NOW()`;
}

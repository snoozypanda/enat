import { neon } from '@neondatabase/serverless';
import { defaultMenuCategories } from '@/lib/category-storage';

type CategoryRow = { name: string };

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('Category storage is not configured.');
  return neon(databaseUrl);
}

async function ensureCategoriesTable() {
  const sql = getDatabase();
  await sql`CREATE TABLE IF NOT EXISTS menu_categories (
    name TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  for (const name of defaultMenuCategories) {
    await sql`INSERT INTO menu_categories (name) VALUES (${name}) ON CONFLICT (name) DO NOTHING`;
  }
  return sql;
}

export async function listCategories(): Promise<string[]> {
  const sql = await ensureCategoriesTable();
  const rows = await sql`SELECT name FROM menu_categories ORDER BY created_at ASC` as unknown as CategoryRow[];
  return rows.map((row) => row.name);
}

export async function createCategory(name: string): Promise<string> {
  const sql = await ensureCategoriesTable();
  const rows = await sql`INSERT INTO menu_categories (name) VALUES (${name}) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING name` as unknown as CategoryRow[];
  return rows[0].name;
}

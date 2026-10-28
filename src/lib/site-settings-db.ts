import { neon } from '@neondatabase/serverless';

export type SiteSettings = {
  /** e.g. "78 Goldhawk Rd" */
  streetAddress: string;
  /** e.g. "London W12 8HA" */
  cityPostcode: string;
  /** e.g. "Shepherd's Bush" */
  areaName: string;
  /** e.g. "+44 (0)20 7946 0812" */
  phone: string;
  /** e.g. "hello@enate.et" */
  email?: string;
  /** e.g. "Mon—Sun" */
  openDays: string;
  /** e.g. "8:30—23:00" */
  openHours: string;
  /** e.g. "2024" */
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

type SettingsRow = { settings: unknown };

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) throw new Error('Database is not configured.');
  return neon(databaseUrl);
}

async function ensureSettingsTable() {
  const sql = getDatabase();
  await sql`CREATE TABLE IF NOT EXISTS site_settings (
    id BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (id = TRUE),
    settings JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  return sql;
}

function isValidSettings(value: unknown): value is SiteSettings {
  if (typeof value !== 'object' || value === null) return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.streetAddress === 'string' &&
    typeof s.cityPostcode === 'string' &&
    typeof s.areaName === 'string' &&
    typeof s.phone === 'string' &&
    (s.email === undefined || typeof s.email === 'string') &&
    typeof s.openDays === 'string' &&
    typeof s.openHours === 'string' &&
    typeof s.foundedYear === 'string'
  );
}

export async function readSiteSettings(): Promise<SiteSettings> {
  const sql = await ensureSettingsTable();
  const rows = (await sql`SELECT settings FROM site_settings WHERE id = TRUE LIMIT 1`) as unknown as SettingsRow[];
  const stored = rows[0]?.settings;
  if (isValidSettings(stored)) {
    return {
      ...defaultSiteSettings,
      ...stored,
      email: typeof stored.email === 'string' && stored.email.trim() ? stored.email.trim() : defaultSiteSettings.email,
    };
  }
  return defaultSiteSettings;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  if (!isValidSettings(settings)) throw new Error('Invalid site settings.');
  const sql = await ensureSettingsTable();
  const serialized = JSON.stringify({
    ...defaultSiteSettings,
    ...settings,
    email: settings.email?.trim() || defaultSiteSettings.email,
  });
  await sql`INSERT INTO site_settings (id, settings)
    VALUES (TRUE, ${serialized}::jsonb)
    ON CONFLICT (id) DO UPDATE SET settings = EXCLUDED.settings, updated_at = NOW()`;
}

import { neon } from '@neondatabase/serverless';
import type { Reservation, ReservationRequest } from '@/lib/reservations';

type ReservationRow = {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: Reservation['guests'];
  note: string;
  status: Reservation['status'];
  created_at: string;
};

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) throw new Error('Reservation storage is not configured.');
  return neon(databaseUrl);
}

async function ensureReservationsTable() {
  const sql = getDatabase();
  await sql`CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    date DATE NOT NULL,
    time TEXT NOT NULL,
    guests TEXT NOT NULL,
    note TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`ALTER TABLE reservations ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE reservations ALTER COLUMN phone SET DEFAULT ''`;
  return sql;
}

export async function removeExpiredReservations(): Promise<number> {
  const sql = await ensureReservationsTable();
  const rows = await sql`DELETE FROM reservations WHERE date < CURRENT_DATE - INTERVAL '1 month' RETURNING id`;
  return rows.length;
}

function toReservation(row: ReservationRow): Reservation {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    date: row.date,
    time: row.time,
    guests: row.guests,
    note: row.note,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function createReservation(input: ReservationRequest): Promise<Reservation> {
  const sql = await ensureReservationsTable();
  await sql`DELETE FROM reservations WHERE date < CURRENT_DATE - INTERVAL '1 month'`;
  const id = crypto.randomUUID();
  const rows = await sql`INSERT INTO reservations (id, name, phone, date, time, guests, note)
    VALUES (${id}, ${input.name}, ${input.phone}, ${input.date}, ${input.time}, ${input.guests}, ${input.note})
    RETURNING id, name, phone, date::TEXT AS date, time, guests, note, status, created_at::TEXT` as unknown as ReservationRow[];
  return toReservation(rows[0]);
}

export async function listReservations(): Promise<Reservation[]> {
  const sql = await ensureReservationsTable();
  await sql`DELETE FROM reservations WHERE date < CURRENT_DATE - INTERVAL '1 month'`;
  const rows = await sql`SELECT id, name, phone, date::TEXT AS date, time, guests, note, status, created_at::TEXT
    FROM reservations
    ORDER BY date ASC, time ASC, created_at DESC` as unknown as ReservationRow[];
  return rows.map(toReservation);
}

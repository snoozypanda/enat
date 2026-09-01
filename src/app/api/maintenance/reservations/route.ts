import { NextRequest, NextResponse } from 'next/server';
import { removeExpiredReservations } from '@/lib/reservation-db';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    return NextResponse.json({ removed: await removeExpiredReservations() });
  } catch (error) {
    console.error('Unable to remove expired reservations', error);
    return NextResponse.json({ error: 'Cleanup failed.' }, { status: 503 });
  }
}

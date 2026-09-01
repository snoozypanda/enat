import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, isAdminSession } from '@/lib/admin-auth';
import { createReservation, listReservations } from '@/lib/reservation-db';
import { validateReservation } from '@/lib/reservations';

export const runtime = 'nodejs';

function isAdminRequest(request: NextRequest): boolean {
  return isAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function POST(request: NextRequest) {
  try {
    const validation = validateReservation(await request.json());
    if ('error' in validation) return NextResponse.json({ error: validation.error }, { status: 400 });

    const reservation = await createReservation(validation.data);
    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    console.error('Unable to create reservation', error);
    return NextResponse.json({ error: 'We could not send your enquiry. Please try again shortly.' }, { status: 503 });
  }
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    return NextResponse.json({ reservations: await listReservations() });
  } catch (error) {
    console.error('Unable to load reservations', error);
    return NextResponse.json({ error: 'Reservations are temporarily unavailable.' }, { status: 503 });
  }
}

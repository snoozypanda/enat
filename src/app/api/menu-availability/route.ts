import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, isAdminSession } from '@/lib/admin-auth';
import { listMenuAvailability, setMenuAvailability } from '@/lib/menu-admin-db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    return NextResponse.json({ availability: await listMenuAvailability() });
  } catch (error) {
    console.error('Unable to load menu availability', error);
    return NextResponse.json({ error: 'Menu availability is temporarily unavailable.' }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  const body: unknown = await request.json().catch(() => null);
  if (typeof body !== 'object' || body === null) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  const input = body as Record<string, unknown>;
  if (typeof input.itemId !== 'string' || input.itemId.length === 0 || input.itemId.length > 100 || typeof input.available !== 'boolean') {
    return NextResponse.json({ error: 'Invalid availability update.' }, { status: 400 });
  }

  try {
    await setMenuAvailability(input.itemId, input.available);
    return NextResponse.json({ itemId: input.itemId, available: input.available });
  } catch (error) {
    console.error('Unable to update menu availability', error);
    return NextResponse.json({ error: 'Could not update menu availability.' }, { status: 503 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, isAdminSession } from '@/lib/admin-auth';
import { isManagedMenu, readMenu, saveMenu } from '@/lib/menu-db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    return NextResponse.json({ items: await readMenu() });
  } catch (error) {
    console.error('Unable to load menu', error);
    return NextResponse.json({ error: 'Menu is temporarily unavailable.' }, { status: 503 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const items = typeof body === 'object' && body !== null ? (body as Record<string, unknown>).items : null;
  if (!isManagedMenu(items)) {
    return NextResponse.json({ error: 'Invalid menu update.' }, { status: 400 });
  }

  try {
    await saveMenu(items);
    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error('Unable to save menu', error);
    return NextResponse.json({ error: 'Could not save the menu.' }, { status: 503 });
  }
}

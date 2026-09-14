import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, isAdminSession } from '@/lib/admin-auth';
import { isManagedMenu, isManagedMenuItem, readMenu, saveMenu } from '@/lib/menu-db';
import { mergeStoredMenuWithCatalog } from '@/lib/menu-storage';

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

// Updating one dish must not upload the whole menu (and every embedded image)
// from a phone browser. It keeps the request small and reliable.
export async function PATCH(request: NextRequest) {
  if (!isAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const item = typeof body === 'object' && body !== null ? (body as Record<string, unknown>).item : null;
  if (!isManagedMenuItem(item)) {
    return NextResponse.json({ error: 'Invalid menu item.' }, { status: 400 });
  }

  try {
    const currentMenu = mergeStoredMenuWithCatalog(await readMenu());
    const exists = currentMenu.some((entry) => entry.id === item.id);
    const items = exists
      ? currentMenu.map((entry) => entry.id === item.id ? item : entry)
      : [...currentMenu, item];
    await saveMenu(items);
    return NextResponse.json({ saved: true, item });
  } catch (error) {
    console.error('Unable to update menu item', error);
    return NextResponse.json({ error: 'Could not save the menu item.' }, { status: 503 });
  }
}

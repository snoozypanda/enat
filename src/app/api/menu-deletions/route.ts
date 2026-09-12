import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, isAdminSession } from '@/lib/admin-auth';
import { deleteMenuItem, listDeletedMenuItemIds } from '@/lib/menu-deletion-db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    return NextResponse.json({ itemIds: await listDeletedMenuItemIds() });
  } catch (error) {
    console.error('Unable to load deleted menu items', error);
    return NextResponse.json({ error: 'Deleted menu items are temporarily unavailable.' }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const itemId = typeof body === 'object' && body !== null ? (body as Record<string, unknown>).itemId : null;
  if (typeof itemId !== 'string' || !/^[a-z0-9-]{1,100}$/i.test(itemId)) {
    return NextResponse.json({ error: 'Invalid menu item.' }, { status: 400 });
  }

  try {
    await deleteMenuItem(itemId);
    return NextResponse.json({ deleted: true, itemId });
  } catch (error) {
    console.error('Unable to delete menu item', error);
    return NextResponse.json({ error: 'Could not delete the menu item.' }, { status: 503 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, isAdminSession } from '@/lib/admin-auth';
import { createCategory, listCategories } from '@/lib/category-db';

export const runtime = 'nodejs';

function validCategory(value: unknown): value is string {
  return typeof value === 'string' && /^[a-z][a-z0-9 &'/-]{1,39}$/i.test(value.trim());
}

export async function GET() {
  try {
    return NextResponse.json({ categories: await listCategories() });
  } catch (error) {
    console.error('Unable to load categories', error);
    return NextResponse.json({ error: 'Categories are temporarily unavailable.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  const body: unknown = await request.json().catch(() => null);
  const name = typeof body === 'object' && body !== null ? (body as Record<string, unknown>).name : null;
  if (!validCategory(name)) return NextResponse.json({ error: 'Use 2–40 letters, numbers, spaces, apostrophes, or hyphens.' }, { status: 400 });

  try {
    return NextResponse.json({ category: await createCategory(name.trim().toLowerCase()) }, { status: 201 });
  } catch (error) {
    console.error('Unable to create category', error);
    return NextResponse.json({ error: 'Could not add that category.' }, { status: 503 });
  }
}

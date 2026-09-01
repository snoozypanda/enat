import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, createAdminSession, isAdminConfigurationPresent, passwordIsValid } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!isAdminConfigurationPresent()) return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });

  const body: unknown = await request.json().catch(() => null);
  const password = typeof body === 'object' && body !== null && typeof (body as Record<string, unknown>).password === 'string'
    ? (body as Record<string, string>).password
    : '';
  if (!passwordIsValid(password)) return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });

  const session = createAdminSession();
  if (!session) return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, session.value, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', expires: session.expiresAt, path: '/' });
  return response;
}

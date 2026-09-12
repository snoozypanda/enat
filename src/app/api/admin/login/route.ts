import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, createAdminSession, isAdminConfigurationPresent, passwordIsValid } from '@/lib/admin-auth';
import { clearLoginAttempts, loginAllowed, recordFailedLogin } from '@/lib/admin-login-limits';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!isAdminConfigurationPresent()) return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });

  const attemptKey = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!loginAllowed(attemptKey)) return NextResponse.json({ error: 'Too many sign-in attempts. Please try again in 15 minutes.' }, { status: 429 });

  const body: unknown = await request.json().catch(() => null);
  const password = typeof body === 'object' && body !== null && typeof (body as Record<string, unknown>).password === 'string'
    ? (body as Record<string, string>).password
    : '';
  if (!passwordIsValid(password)) {
    recordFailedLogin(attemptKey);
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const session = createAdminSession();
  if (!session) return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });
  clearLoginAttempts(attemptKey);
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, session.value, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', expires: session.expiresAt, path: '/' });
  return response;
}

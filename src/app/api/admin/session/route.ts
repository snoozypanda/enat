import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, isAdminSession } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: isAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value) });
}

import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, isAdminSession } from '@/lib/admin-auth';
import { readSiteSettings, saveSiteSettings, type SiteSettings } from '@/lib/site-settings-db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const settings = await readSiteSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Unable to load site settings', error);
    return NextResponse.json({ error: 'Site settings are temporarily unavailable.' }, { status: 503 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const settings = typeof body === 'object' && body !== null ? (body as Record<string, unknown>).settings : null;

  if (
    !settings ||
    typeof settings !== 'object' ||
    typeof (settings as SiteSettings).streetAddress !== 'string' ||
    typeof (settings as SiteSettings).cityPostcode !== 'string' ||
    typeof (settings as SiteSettings).areaName !== 'string' ||
    typeof (settings as SiteSettings).phone !== 'string' ||
    ((settings as SiteSettings).email !== undefined && typeof (settings as SiteSettings).email !== 'string') ||
    typeof (settings as SiteSettings).openDays !== 'string' ||
    typeof (settings as SiteSettings).openHours !== 'string' ||
    typeof (settings as SiteSettings).foundedYear !== 'string'
  ) {
    return NextResponse.json({ error: 'Invalid settings.' }, { status: 400 });
  }

  try {
    await saveSiteSettings(settings as SiteSettings);
    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error('Unable to save site settings', error);
    return NextResponse.json({ error: 'Could not save settings.' }, { status: 503 });
  }
}

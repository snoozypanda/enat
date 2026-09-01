import { createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_SESSION_COOKIE = 'enate_admin_session';
const sessionLifetimeMs = 1000 * 60 * 60 * 12;

function adminPassword(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

function sessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

export function isAdminConfigurationPresent(): boolean {
  return Boolean(adminPassword() && sessionSecret());
}

export function passwordIsValid(value: string): boolean {
  const expected = adminPassword();
  if (!expected) return false;
  const supplied = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return supplied.length === expectedBuffer.length && timingSafeEqual(supplied, expectedBuffer);
}

function sign(expiresAt: number): string | null {
  const secret = sessionSecret();
  return secret ? createHmac('sha256', secret).update(String(expiresAt)).digest('base64url') : null;
}

export function createAdminSession(): { value: string; expiresAt: Date } | null {
  const expiresAt = Date.now() + sessionLifetimeMs;
  const signature = sign(expiresAt);
  return signature ? { value: `${expiresAt}.${signature}`, expiresAt: new Date(expiresAt) } : null;
}

export function isAdminSession(value: string | undefined): boolean {
  if (!value) return false;
  const [expiresAtValue, signature] = value.split('.');
  const expiresAt = Number(expiresAtValue);
  const expectedSignature = Number.isFinite(expiresAt) ? sign(expiresAt) : null;
  if (!expectedSignature || !signature || expiresAt <= Date.now()) return false;
  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

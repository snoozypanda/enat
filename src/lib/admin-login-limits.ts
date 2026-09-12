const attempts = new Map<string, { count: number; resetAt: number }>();
const maxAttempts = 5;
const windowMs = 15 * 60 * 1000;

export function loginAllowed(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry) return true;
  if (entry.resetAt <= Date.now()) {
    attempts.delete(key);
    return true;
  }
  return entry.count < maxAttempts;
}

export function recordFailedLogin(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  attempts.set(key, { ...entry, count: entry.count + 1 });
}

export function clearLoginAttempts(key: string): void {
  attempts.delete(key);
}

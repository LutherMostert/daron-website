/**
 * In-memory sliding-window rate limiter.
 *
 * Used to cap chat + lead-capture abuse per-IP. Keeps the implementation
 * dependency-free for Week 0 launch — acceptable tradeoff:
 *
 * - Each serverless instance has its own Map, so a motivated attacker who
 *   hits Vercel enough times to spin up multiple instances can evade somewhat.
 *   In practice for a Walvis Bay ship-chandler site this is more than adequate.
 * - Memory resets on cold start (≤15 min of quiet traffic). That means buckets
 *   clear themselves — we don't need a cleanup cron.
 * - If abuse becomes a real issue, swap this for @upstash/ratelimit + KV with
 *   only the `checkRateLimit` signature staying the same.
 */
const buckets = new Map<string, number[]>();

export type RateLimitOptions = {
  /** Time window in milliseconds */
  windowMs: number;
  /** Max requests allowed inside the window */
  max: number;
};

export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfterSeconds: number };

export function checkRateLimit(
  key: string,
  opts: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - opts.windowMs;

  const timestamps = (buckets.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= opts.max) {
    const oldest = timestamps[0];
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + opts.windowMs - now) / 1000),
    );
    // Store the filtered array back so we don't keep stale entries forever.
    buckets.set(key, timestamps);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  buckets.set(key, timestamps);

  // Opportunistic cleanup: if the Map gets big, prune empty entries.
  if (buckets.size > 1000) {
    for (const [k, v] of buckets) {
      const pruned = v.filter((t) => t > windowStart);
      if (pruned.length === 0) buckets.delete(k);
      else buckets.set(k, pruned);
    }
  }

  return { allowed: true, remaining: opts.max - timestamps.length };
}

/**
 * Extract the client IP from a request, preferring headers the platform sets
 * and a client CANNOT spoof.
 *
 * The naive `x-forwarded-for[0]` is attacker-controlled (a client can send its
 * own `X-Forwarded-For: 1.2.3.4` and Vercel appends the real hop after it), so
 * trusting the *first* value lets an attacker rotate the value to defeat
 * per-IP limits and poison lead logs. We therefore prefer, in order:
 *   1. `x-vercel-forwarded-for` — set by Vercel's edge, inbound copies stripped.
 *   2. `x-real-ip` — the connecting IP as seen by the platform.
 *   3. the LAST hop in `x-forwarded-for` — the one added by the trusted proxy
 *      nearest us, rather than the client-supplied leftmost value.
 */
export function getClientIp(request: Request): string {
  const vercel = request.headers.get("x-vercel-forwarded-for")?.trim();
  if (vercel) return vercel.split(",")[0]!.trim();

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const hops = xff.split(",").map((h) => h.trim()).filter(Boolean);
    if (hops.length > 0) return hops[hops.length - 1]!;
  }

  return "unknown";
}

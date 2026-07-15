import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "@/lib/redis";

const buckets = new Map<string, number[]>();
const limiters = new Map<string, Ratelimit>();

export type RateLimitOptions = {
  windowMs: number;
  max: number;
};

export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfterSeconds: number };

/**
 * Shared rate limiting in production, with a small in-memory fallback for
 * local development. The public signature stays the same for all API routes.
 */
export async function checkRateLimit(
  key: string,
  opts: RateLimitOptions,
): Promise<RateLimitResult> {
  const redis = getRedis();
  if (redis) {
    const cacheKey = `${opts.max}:${opts.windowMs}`;
    let limiter = limiters.get(cacheKey);
    if (!limiter) {
      limiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(opts.max, `${Math.ceil(opts.windowMs / 1000)} s`),
        prefix: "daron:rate-limit",
        analytics: true,
      });
      limiters.set(cacheKey, limiter);
    }

    try {
      const result = await limiter.limit(key);
      if (result.success) {
        return { allowed: true, remaining: result.remaining };
      }
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
      };
    } catch (error) {
      console.error("[rate-limit] Redis unavailable; using local fallback", error);
    }
  }

  return checkMemoryRateLimit(key, opts);
}

function checkMemoryRateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowStart = now - opts.windowMs;
  const timestamps = (buckets.get(key) ?? []).filter((time) => time > windowStart);

  if (timestamps.length >= opts.max) {
    buckets.set(key, timestamps);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((timestamps[0] + opts.windowMs - now) / 1000)),
    };
  }

  timestamps.push(now);
  buckets.set(key, timestamps);
  if (buckets.size > 1000) {
    for (const [bucketKey, values] of buckets) {
      const active = values.filter((time) => time > windowStart);
      if (active.length === 0) buckets.delete(bucketKey);
      else buckets.set(bucketKey, active);
    }
  }

  return { allowed: true, remaining: opts.max - timestamps.length };
}

export function getClientIp(request: Request): string {
  const vercel = request.headers.get("x-vercel-forwarded-for")?.trim();
  if (vercel) return vercel.split(",")[0]!.trim();

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const hops = xff.split(",").map((hop) => hop.trim()).filter(Boolean);
    if (hops.length > 0) return hops[hops.length - 1]!;
  }

  return "unknown";
}

import { randomBytes } from "node:crypto";
import { getRedis } from "@/lib/redis";

const LEAD_TTL_SECONDS = 180 * 24 * 60 * 60;

export type LeadKind = "contact" | "chat";

function createReference(kind: LeadKind, timestamp: string) {
  const day = timestamp.slice(0, 10).replaceAll("-", "");
  const token = randomBytes(3).toString("hex").toUpperCase();
  return `${kind === "contact" ? "RFQ" : "CHAT"}-${day}-${token}`;
}

export async function persistLead(
  kind: LeadKind,
  entry: Record<string, unknown>,
): Promise<string> {
  const redis = getRedis();
  if (!redis) throw new Error("Durable lead storage is not configured.");

  const timestamp = String(entry.timestamp || new Date().toISOString());
  const reference = createReference(kind, timestamp);
  const stored = { ...entry, reference };
  const pipeline = redis.pipeline();
  pipeline.set(`daron:lead:${reference}`, stored, { ex: LEAD_TTL_SECONDS });
  pipeline.zadd("daron:leads", { score: Date.parse(timestamp) || Date.now(), member: reference });
  pipeline.zremrangebyscore("daron:leads", 0, Date.now() - LEAD_TTL_SECONDS * 1000);
  await pipeline.exec();
  return reference;
}

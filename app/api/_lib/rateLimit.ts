import { NextResponse } from "next/server";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 100;

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

function getClientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export function rateLimit(req: Request): NextResponse | null {
  const key = getClientKey(req);
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }

  bucket.count += 1;
  if (bucket.count > MAX_REQUESTS) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests, please try again later.",
      },
      { status: 429 },
    );
  }

  return null;
}

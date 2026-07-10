// Best-effort-Ratelimit je Client-IP: Token-Bucket in einer isolate-lokalen
// Map. Bewusst ohne KV/D1-Roundtrip — schützt vor Schleifen/Abuse, nicht
// gegen verteilte Angriffe (mehrere Isolates zählen getrennt).

const BUCKET_CAPACITY = 120;      // Requests
const REFILL_PER_SECOND = 2;      // = 120/min Dauerlast
const buckets = new Map();

export function checkRateLimit(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  let bucket = buckets.get(ip);
  if (!bucket) {
    bucket = { tokens: BUCKET_CAPACITY, updatedAt: now };
    buckets.set(ip, bucket);
    if (buckets.size > 10000) buckets.clear();
  }
  bucket.tokens = Math.min(
    BUCKET_CAPACITY,
    bucket.tokens + ((now - bucket.updatedAt) / 1000) * REFILL_PER_SECOND
  );
  bucket.updatedAt = now;
  if (bucket.tokens < 1) {
    return new Response(JSON.stringify({ error: 'Zu viele Anfragen', status: 429 }), {
      status: 429,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Retry-After': '10' },
    });
  }
  bucket.tokens -= 1;
  return null;
}

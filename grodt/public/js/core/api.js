// Fetch-Wrapper für /api/*: kurzer In-Memory-Cache + Deduplizierung
// gleichzeitiger identischer Anfragen.

const memCache = new Map();   // url → { until, data }
const inflight = new Map();   // url → Promise

const DEFAULT_TTL = {
  '/api/quotes': 8000,
  '/api/chart': 45000,
  '/api/search': 300000,
  '/api/fundamentals': 600000,
  '/api/news': 90000,
  '/api/movers': 90000,
};

function buildUrl(path, params) {
  const url = new URL(path, location.origin);
  for (const [k, v] of Object.entries(params || {})) {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
  }
  return url.toString();
}

export async function apiGet(path, params, { ttl, fresh = false } = {}) {
  const url = buildUrl(path, params);
  const effectiveTtl = ttl ?? DEFAULT_TTL[path] ?? 30000;

  if (!fresh) {
    const hit = memCache.get(url);
    if (hit && hit.until > Date.now()) return hit.data;
    const pending = inflight.get(url);
    if (pending) return pending;
  }

  const promise = (async () => {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const message = data?.error || `HTTP ${res.status}`;
      throw new ApiError(message, res.status);
    }
    memCache.set(url, { until: Date.now() + effectiveTtl, data });
    if (memCache.size > 300) {
      const now = Date.now();
      for (const [k, v] of memCache) if (v.until < now) memCache.delete(k);
    }
    return data;
  })();

  inflight.set(url, promise);
  try {
    return await promise;
  } finally {
    inflight.delete(url);
  }
}

export async function apiSend(path, method, body) {
  const res = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new ApiError(data?.error || `HTTP ${res.status}`, res.status);
    err.data = data;
    throw err;
  }
  return data;
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

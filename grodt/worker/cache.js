// Edge-Caching über caches.default: alle Nutzer/Geräte teilen sich einen
// Upstream-Abruf je normalisierter URL.

export const TTL = {
  QUOTES: 15,
  CHART_INTRADAY: 60,
  CHART_DAILY: 300,
  SEARCH: 21600,
  FUNDAMENTALS: 43200,
  NEWS: 300,
  MOVERS: 300,
};

// Client-seitige max-age-Werte (bewusst kürzer als die Edge-TTL).
export const CLIENT_MAX_AGE = {
  QUOTES: 10,
  CHART: 60,
  SEARCH: 3600,
  FUNDAMENTALS: 3600,
  NEWS: 120,
  MOVERS: 120,
};

/**
 * Liefert gecachte JSON-Antwort oder ruft fetcher() auf und cached das
 * Ergebnis. cacheKeyUrl muss eine kanonische URL der eigenen Origin sein
 * (Query-Parameter sortiert), damit identische Anfragen zusammenfallen.
 */
export async function cachedJson(ctx, cacheKeyUrl, edgeTtl, clientMaxAge, fetcher) {
  const cache = caches.default;
  const cacheKey = new Request(cacheKeyUrl, { method: 'GET' });

  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const data = await fetcher();
  const res = jsonResponse(data, {
    'Cache-Control': `public, max-age=${clientMaxAge}, s-maxage=${edgeTtl}`,
  });
  ctx.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}

export function jsonResponse(data, extraHeaders = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders },
  });
}

export function jsonError(message, status = 500) {
  return jsonResponse({ error: message, status }, { 'Cache-Control': 'no-store' }, status);
}

/** Kanonische Cache-URL: eigener Pfad + alphabetisch sortierte Parameter. */
export function canonicalUrl(origin, path, params) {
  const url = new URL(path, origin);
  for (const key of Object.keys(params).sort()) {
    if (params[key] !== undefined && params[key] !== '') url.searchParams.set(key, params[key]);
  }
  return url.toString();
}

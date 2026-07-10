// GRODT Service Worker: Offline-Shell (Precache) + Web Push.
// Bei jedem Release CACHE_VERSION erhöhen, damit Clients neue Dateien laden.
const CACHE_VERSION = 'grodt-v1';

const PRECACHE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'styles/tokens.css',
  'styles/layout.css',
  'styles/components.css',
  'vendor/lightweight-charts.standalone.production.mjs',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon-180.png',
  'js/app.js',
  'js/core/store.js',
  'js/core/api.js',
  'js/core/sync.js',
  'js/core/merge.js',
  'js/core/alertEval.js',
  'js/core/indicators.js',
  'js/core/finnhub.js',
  'js/core/push.js',
  'js/core/quotes.js',
  'js/core/format.js',
  'js/data/indices.js',
  'js/data/constituents.js',
  'js/views/markets.js',
  'js/views/watchlist.js',
  'js/views/portfolio.js',
  'js/views/news.js',
  'js/views/settings.js',
  'js/views/search.js',
  'js/views/detail.js',
  'js/views/fundamentals.js',
  'js/views/compare.js',
  'js/chart/chartController.js',
  'js/components/tabbar.js',
  'js/components/sparkline.js',
  'js/components/toast.js',
  'js/components/modal.js',
  'js/components/pullrefresh.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // API-Aufrufe niemals aus dem SW-Cache beantworten (Live-Daten!).
  if (url.pathname.startsWith('/api/') || event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: url.pathname.endsWith('/') }).then(
      (hit) =>
        hit ||
        fetch(event.request).then((res) => {
          // Nur eigene, erfolgreiche Antworten nachcachen.
          if (res.ok && url.origin === self.location.origin) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          }
          return res;
        })
    ).catch(() => caches.match('index.html'))
  );
});

// --- Web Push ---
// Wichtig für iOS: JEDES push-Event muss eine Notification anzeigen,
// sonst entzieht das System der App die Push-Berechtigung.
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: 'GRODT', body: event.data ? event.data.text() : '' };
  }
  event.waitUntil(
    self.registration.showNotification(data.title || 'GRODT Kursalarm', {
      body: data.body || '',
      icon: 'icons/icon-192.png',
      badge: 'icons/icon-192.png',
      data: { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) {
          client.navigate(target);
          return client.focus();
        }
      }
      return self.clients.openWindow(target);
    })
  );
});

self.addEventListener('pushsubscriptionchange', (event) => {
  // Client-Seite registriert sich beim nächsten App-Start neu; hier nur loggen.
  console.log('pushsubscriptionchange', event);
});

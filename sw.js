// LinguaLearn Service Worker — macht die App nach dem ersten Besuch
// vollständig offline nutzbar.
// WICHTIG: CACHE_VERSION bei jedem Release erhöhen, damit Clients
// die neuen Dateien bekommen.
const CACHE_VERSION = 'v8';
const CACHE_NAME = `lingualearn-${CACHE_VERSION}`;

// Komplette App-Shell — alles relative Pfade, funktioniert daher auf
// Root- wie Unterpfad-Hosting (Cloudflare Pages, eigener Server, …).
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './styles/main.css',
  './styles/button-animations.css',
  './styles/gamification.css',
  './assets/fontawesome/css/all.min.css',
  './assets/fontawesome/webfonts/fa-solid-900.woff2',
  './assets/fontawesome/webfonts/fa-solid-900.ttf',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './js/app.js',
  './js/data/decks/meta.js',
  './js/data/decks/da.js',
  './js/data/decks/el.js',
  './js/data/decks/fr.js',
  './js/data/decks/es.js',
  './js/data/decks/la.js',
  './js/data/decks/ru.js',
  './js/data/decks/ja.js',
  './core/userStore.js',
  './core/cosmetics.js',
  './ui/cosmetics.js',
  './ui/wotd.js',
  './ui/coursemap.js',
  './utils/cognate.js',
  './styles/cosmetics.css',
  './core/auth.js',
  './core/cardProgress.js',
  './core/course.js',
  './core/gamification.js',
  './core/progress.js',
  './core/session.js',
  './core/state.js',
  './core/stats.js',
  './ui/gami.js',
  './ui/navigation.js',
  './ui/settings.js',
  './ui/toast.js',
  './utils/helpers.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('lingualearn-') && k !== CACHE_NAME)
            .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Cache-first mit Netzwerk-Fallback; erfolgreiche Same-Origin-GETs
// werden nachgecacht (z. B. neue Dateien nach einem Update).
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});

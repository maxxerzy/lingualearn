// LinguaLearn Service Worker — macht die App nach dem ersten Besuch
// vollständig offline nutzbar.
// WICHTIG: CACHE_VERSION bei jedem Release erhöhen, damit Clients
// die neuen Dateien bekommen.
const CACHE_VERSION = 'v35';
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
  // Die Deck-Dateien selbst (zusammen ~800 KB) sind bewusst NICHT im
  // Precache: Beim ersten Start würde sonst jedes der sieben Decks
  // geladen, obwohl man meist nur eines lernt. Das Deck, das man
  // tatsächlich öffnet, landet über die Fetch-Regel unten im selben
  // Cache und ist danach offline verfügbar.
  './js/data/themes.js',
  './js/data/phrases/da.js',
  './js/data/phrases/el.js',
  './js/data/phrases/fr.js',
  './js/data/phrases/es.js',
  './js/data/phrases/la.js',
  './js/data/phrases/ru.js',
  './js/data/phrases/ja.js',
  './js/data/phrases/zh.js',
  './js/data/grammar/da.js',
  './js/data/grammar/el.js',
  './js/data/grammar/fr.js',
  './js/data/grammar/es.js',
  './js/data/grammar/la.js',
  './js/data/grammar/ru.js',
  './js/data/grammar/ja.js',
  './js/data/grammar/zh.js',
  './core/grammar.js',
  './core/reminder.js',
  './ui/grammar.js',
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
  './core/league.js',
  './core/quests.js',
  './core/shop.js',
  './ui/hub.js',
  './ui/dictionary.js',
  './ui/onboarding.js',
  './core/errorLog.js',
  './utils/feedback.js',
  './utils/speech.js',
  './core/sync.js',
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

// LinguaLearn Service Worker — macht die App nach dem ersten Besuch
// vollständig offline nutzbar.
// WICHTIG: CACHE_VERSION bei jedem Release erhöhen, damit Clients
// die neuen Dateien bekommen.
const CACHE_VERSION = 'v48';
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
  './core/placement.js',
  './core/gamification.js',
  './core/progress.js',
  './core/session.js',
  './core/session/shared.js',
  './core/session/flashcard.js',
  './core/session/multipleChoice.js',
  './core/session/courseMode.js',
  './core/session/grammarPhase.js',
  './core/session/practice.js',
  './core/session/blitz.js',
  './core/session/themeQuiz.js',
  './core/league.js',
  './core/friends.js',
  './core/quests.js',
  './core/shop.js',
  './ui/hub.js',
  './ui/dictionary.js',
  './ui/onboarding.js',
  './core/errorLog.js',
  './core/weakness.js',
  './core/offline.js',
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
  './utils/sentence.js',
  './utils/pronounce.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Die Seite fragt den Cache-Namen ab, um Deck-Dateien für den
// Offline-Betrieb vorab hineinzulegen (siehe `core/offline.js`).
// Der Name wandert mit jedem Release mit — deshalb wird er erfragt
// statt in der App gespiegelt.
self.addEventListener('message', event => {
  if (event.data?.type !== 'CACHE_NAME') return;
  event.ports?.[0]?.postMessage({ cacheName: CACHE_NAME, version: CACHE_VERSION });
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
//
// Nachgeschlagen und abgelegt wird immer unter der URL OHNE Suchteil:
// Ein fehlgeschlagener Deck-Import wird von `core/state.js` mit einem
// Wiederhol-Parameter erneut angefragt (Browser merken sich gescheiterte
// Module sonst dauerhaft). Ohne diese Vereinheitlichung läge dieselbe
// Datei mehrfach im Cache — und der spätere saubere Import fände sie nicht.
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const key = url.search ? (url.origin + url.pathname) : request;

  event.respondWith(
    caches.match(key).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(key, copy));
        }
        return response;
      });
    })
  );
});

// Auto-translate example sentences via MyMemory API (free, no auth required).
// Runs in the background so it never blocks deck selection or the UI.
const CACHE_KEY = 'lingualearn_translations';
const API_URL = 'https://api.mymemory.translated.net/get';
const LANG_MAP = {
  da: 'da|en', // Danish -> English (then English -> German)
  el: 'el|en'  // Greek  -> English
};
const REQUEST_TIMEOUT = 5000;

function getCachedTranslations() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

function saveCachedTranslations(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    console.warn('Could not save translations to localStorage');
  }
}

async function translateText(text, langPair) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    const res = await fetch(
      `${API_URL}?q=${encodeURIComponent(text)}&langpair=${langPair}&format=json`,
      { signal: controller.signal }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.responseStatus === 200 ? data.responseData.translatedText : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Apply any already-cached translations to the decks synchronously (instant).
function applyCachedTranslations(decks, cache) {
  for (const deck of Object.values(decks)) {
    if (!deck.cards) continue;
    for (const card of deck.cards) {
      if (card.example && cache[card.example]) {
        card.exampleDE = cache[card.example];
      }
    }
  }
}

export async function enrichDecksWithTranslations(decks) {
  const cache = getCachedTranslations();

  // 1) Instant pass: fill in everything we already have cached.
  applyCachedTranslations(decks, cache);

  // 2) Background pass: fetch the missing ones one at a time so we stay
  //    well under MyMemory's rate limits. This is non-blocking from the
  //    caller's perspective — the decks are already usable.
  let changed = false;

  for (const deck of Object.values(decks)) {
    if (!deck.cards) continue;

    const langPair = LANG_MAP[deck.language];
    if (!langPair) continue;

    for (const card of deck.cards) {
      if (!card.example || card.exampleDE) continue;

      // Step 1: deck language -> English
      const enText = await translateText(card.example, langPair);
      if (!enText || enText === card.example) continue;

      // Step 2: English -> German
      const translated = await translateText(enText, 'en|de');
      if (!translated) continue;

      card.exampleDE = translated;
      cache[card.example] = translated;
      changed = true;
    }
  }

  if (changed) {
    saveCachedTranslations(cache);
  }

  return decks;
}

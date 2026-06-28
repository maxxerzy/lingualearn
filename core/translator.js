// Auto-translate example sentences via MyMemory API (non-blocking)
const CACHE_KEY = 'lingualearn_translations';
const API_URL = 'https://api.mymemory.translated.net/get';
const LANG_MAP = { da: 'da|en', el: 'el|en' };
const BATCH_SIZE = 3; // Translate 3 at a time
const DELAY_MS = 200; // Delay between batches to avoid rate limiting

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
  } catch {}
}

async function translateText(text, langPair) {
  try {
    const res = await Promise.race([
      fetch(`${API_URL}?q=${encodeURIComponent(text)}&langpair=${langPair}&format=json`),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))
    ]);
    if (!res.ok) return null;
    const data = await res.json();
    return data.responseStatus === 200 ? data.responseData.translatedText : null;
  } catch {
    return null;
  }
}

// Background translation queue
let translationQueue = [];
let isTranslating = false;

async function processTranslationQueue(cache) {
  if (isTranslating || translationQueue.length === 0) return;

  isTranslating = true;
  while (translationQueue.length > 0) {
    const batch = translationQueue.splice(0, BATCH_SIZE);

    await Promise.all(batch.map(async (item) => {
      const { card, langPair, cacheKey, deckId } = item;

      if (cache[cacheKey]) {
        card.exampleDE = cache[cacheKey];
        return;
      }

      try {
        // Translate: deck language -> English -> German
        const langPairParts = langPair.split('|');
        const enText = await translateText(card.example, langPair);

        if (enText && enText !== card.example) {
          const deText = await translateText(enText, 'en|de');
          if (deText) {
            card.exampleDE = deText;
            cache[cacheKey] = deText;
          }
        }
      } catch {}
    }));

    saveCachedTranslations(cache);

    // Small delay before next batch to avoid rate limiting
    if (translationQueue.length > 0) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  isTranslating = false;
}

export function enrichDecksWithTranslations(decks) {
  const cache = getCachedTranslations();
  translationQueue = [];

  // Prepare translation queue (non-blocking)
  for (const [deckId, deck] of Object.entries(decks)) {
    if (!deck.cards) continue;

    for (const card of deck.cards) {
      if (!card.example) continue;

      const cacheKey = card.example;

      if (cache[cacheKey]) {
        card.exampleDE = cache[cacheKey];
      } else {
        const langPair = LANG_MAP[deck.language];
        if (langPair) {
          translationQueue.push({ card, langPair, cacheKey, deckId });
        }
      }
    }
  }

  // Start background processing (non-blocking)
  processTranslationQueue(cache);

  return decks;
}

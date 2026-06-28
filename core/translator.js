// Auto-translate example sentences via MyMemory API (free, no auth required)
const CACHE_KEY = 'lingualearn_translations';
const API_URL = 'https://api.mymemory.translated.net/get';
const LANG_MAP = {
  da: 'da|en', // Danish -> English (then we'll do English to German)
  el: 'el|en'  // Greek -> English
};

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
  try {
    const res = await fetch(
      `${API_URL}?q=${encodeURIComponent(text)}&langpair=${langPair}&format=json`,
      { timeout: 5000 }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.responseStatus === 200 ? data.responseData.translatedText : null;
  } catch {
    return null;
  }
}

export async function enrichDecksWithTranslations(decks) {
  const cache = getCachedTranslations();
  let changed = false;

  for (const [deckId, deck] of Object.entries(decks)) {
    if (!deck.cards) continue;

    for (const card of deck.cards) {
      if (!card.example) continue;

      const cacheKey = `${card.example}`;
      if (cache[cacheKey]) {
        card.exampleDE = cache[cacheKey];
        continue;
      }

      // Translate: deck language -> German (via English as intermediate)
      let translated = null;

      // Step 1: Translate from deck language to English
      const langPair = LANG_MAP[deck.language];
      if (langPair) {
        const enText = await translateText(card.example, langPair);

        // Step 2: Translate English to German
        if (enText && enText !== card.example) {
          translated = await translateText(enText, 'en|de');
        }
      }

      if (translated) {
        card.exampleDE = translated;
        cache[cacheKey] = translated;
        changed = true;
      }
    }
  }

  if (changed) {
    saveCachedTranslations(cache);
  }

  return decks;
}

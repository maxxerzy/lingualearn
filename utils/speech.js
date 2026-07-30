// Zentrale Sprachausgabe für alle Ansichten (Session, Wörterbuch, WOTD).
//
// Latein hat in Browsern keine eigene Stimme. Wir nähern die KLASSISCHE
// Aussprache über die deutsche Stimme an, indem der Text vorher
// lautgetreu umgeschrieben wird:
//   c  → k   (c immer hart: Caesar → „Kaisar")
//   ae → ei  (ae wie deutsches „ei")
//   oe → eu  (oe wie deutsches „eu")
//   v  → w   (v wie deutsches „w": salve → „salwe")
//   y  → ü   (griechisches y wie „ü")
const LANG_CODES = { da: 'da-DK', el: 'el-GR', fr: 'fr-FR', es: 'es-ES', la: 'de-DE', ru: 'ru-RU', ja: 'ja-JP' };

export function latinPron(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/ae/g, 'ei')
    .replace(/oe/g, 'eu')
    .replace(/c/g, 'k')
    .replace(/v/g, 'w')
    .replace(/y/g, 'ü');
}

// ── Sprechtempo (pro Konto einstellbar) ──────────────────────────
export const RATE_MIN = 0.5;
export const RATE_MAX = 1.2;
export const RATE_DEFAULT = 0.85;
const RATE_KEY = 'lingualearn_speechrate_';

function currentUser() {
  try { return localStorage.getItem('lingualearn_current_user') || ''; } catch { return ''; }
}

export function getSpeechRate() {
  try {
    const raw = localStorage.getItem(RATE_KEY + currentUser());
    const n = Number(raw);
    if (!raw || !Number.isFinite(n)) return RATE_DEFAULT;
    return Math.min(RATE_MAX, Math.max(RATE_MIN, n));
  } catch { return RATE_DEFAULT; }
}

export function setSpeechRate(value) {
  const n = Math.min(RATE_MAX, Math.max(RATE_MIN, Number(value) || RATE_DEFAULT));
  try { localStorage.setItem(RATE_KEY + currentUser(), String(n)); } catch { /* egal */ }
  return n;
}

// Sprechtempo als verständliche Bezeichnung (für die Einstellungen).
export function rateLabel(rate = getSpeechRate()) {
  if (rate <= 0.6) return 'sehr langsam';
  if (rate <= 0.75) return 'langsam';
  if (rate <= 0.95) return 'normal';
  if (rate <= 1.1) return 'zügig';
  return 'schnell';
}

export function speak(text, lang, rate) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const spoken = lang === 'la' ? latinPron(text) : text;
  const u = new SpeechSynthesisUtterance(spoken);
  u.lang = LANG_CODES[lang] || lang;
  const base = Number.isFinite(rate) ? rate : getSpeechRate();
  // Latein etwas ruhiger — die Umschrift liest sich sonst hastig.
  u.rate = lang === 'la' ? Math.max(RATE_MIN, base - 0.05) : base;
  window.speechSynthesis.speak(u);
}

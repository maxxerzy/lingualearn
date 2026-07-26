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

export function speak(text, lang, rate = 0.85) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const spoken = lang === 'la' ? latinPron(text) : text;
  const u = new SpeechSynthesisUtterance(spoken);
  u.lang = LANG_CODES[lang] || lang;
  u.rate = lang === 'la' ? 0.8 : rate;
  window.speechSynthesis.speak(u);
}

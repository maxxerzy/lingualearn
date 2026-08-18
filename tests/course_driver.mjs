// Ein Schritt im Lernkurs, gemeinsam genutzt von der Geräte-Matrix und
// dem Offline-Test: beantwortet die aktuelle Phase richtig und gibt
// zurück, in welcher Phase der Schritt stattfand ('done'/'gone' am Ende).
// Die Funktion läuft im Browser — sie darf nichts aus diesem Modul
// schließen, nur dynamische Importe der App benutzen.
export const courseStepFn = async () => {
  const st = (await import('/core/state.js')).getCurrentSession();
  if (!st || st.mode !== 'course') {
    return document.getElementById('learnArea')?.textContent.includes('geschafft') ? 'done' : 'gone';
  }
  const phase = st.phase === 'drill' ? 'drill'
    : document.getElementById('gramNext') ? 'grammar' : st.phase;
  // Grammatik-Übung: richtige Antwort über den gespeicherten Index.
  if (st.phase === 'drill' && st.currentPrompt
      && !document.querySelector('#mc-fb .correct, #mc-fb .incorrect')) {
    document.querySelector(`.drill-card .mc-option[data-oi="${st.currentPrompt.correctOi}"]`)?.click();
    return phase;
  }
  const gram = document.getElementById('gramNext');
  if (gram) { gram.click(); return phase; }
  const next = document.getElementById('courseNext');
  if (next) { next.click(); return phase; }
  if (st.phase === 'speak') { document.getElementById('courseSpeakOk')?.click(); return phase; }
  if (st.phase === 'talk') { document.getElementById('talkOk')?.click(); return phase; }
  // Satz hören: Bedeutung über den Index, Lücke über das Kartenwort.
  if (st.phase === 'hearing' && st.currentPrompt) {
    if (st.currentPrompt.variant === 'meaning') {
      document.querySelector(`.mc-option[data-idx="${st.currentPrompt.correctIdx}"]`)?.click();
    } else {
      const opts = [...document.querySelectorAll('.mc-option')];
      const i = opts.findIndex(o => o.querySelector('.mc-text')?.textContent.trim() === st.currentPrompt.card.back);
      opts[i >= 0 ? i : 0].click();
    }
    return phase;
  }
  // Dialog-Runde: passende Antwort über den gespeicherten Index wählen.
  if (st.phase === 'dialog' && st.currentPrompt && st.currentPrompt.correctIdx !== undefined) {
    document.querySelector(`.mc-option[data-idx="${st.currentPrompt.correctIdx}"]`)?.click();
    return phase;
  }
  // Paare-Brett: jedes Paar in Originalreihenfolge links→rechts antippen.
  const matchGrid = document.getElementById('matchGrid');
  if (matchGrid && st.currentPrompt?.pairs) {
    const nPairs = st.currentPrompt.pairs.length;   // Kopie: wird beim letzten Paar genullt
    for (let k = 0; k < nPairs; k++) {
      matchGrid.querySelector(`.match-btn[data-side="l"][data-i="${k}"]`)?.click();
      matchGrid.querySelector(`.match-btn[data-side="r"][data-i="${k}"]`)?.click();
    }
    return phase;
  }
  // Buchstaben-Kacheln: Buchstaben in Wort-Reihenfolge tippen (auto-check).
  const tilePool = document.getElementById('tilePool');
  if (tilePool) {
    [...tilePool.querySelectorAll('.build-tile')]
      .sort((a, b) => Number(a.dataset.i) - Number(b.dataset.i))
      .forEach(t => t.click());
    return phase;
  }
  const card = st.queue?.[0];
  const typeIn = document.getElementById('courseTypeInput');
  if (typeIn && card) {
    typeIn.value = card.back;
    document.getElementById('courseTypeCheck')?.click();
    return phase;
  }
  if (document.getElementById('courseCompYes') && st.currentPrompt) {
    document.getElementById(st.currentPrompt.isMatch ? 'courseCompYes' : 'courseCompNo').click();
    return phase;
  }
  const pool = document.getElementById('courseBuildPool');
  if (pool && st.currentPrompt?.tokens) {
    for (let k = 0; k < st.currentPrompt.tokens.length; k++) pool.querySelector(`.build-tile[data-i="${k}"]`)?.click();
    document.getElementById('courseBuildCheck')?.click();
    return phase;
  }
  const opts = [...document.querySelectorAll('.mc-option')];
  if (opts.length && card) {
    const answer = document.querySelector('.story-sent') ? card.exampleDE
      : st.phase === 'listen' ? card.front : card.back;
    const idx = opts.findIndex(o => o.querySelector('.mc-text')?.textContent.trim() === answer);
    opts[idx >= 0 ? idx : 0].click();
  }
  return phase;
};

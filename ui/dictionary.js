import { getDecks, loadDeck } from '../core/state.js';
import { getCardStates, MAX_LEVEL } from '../core/cardProgress.js';
import { speak } from '../utils/speech.js';

// Wörterbuch: alle bereits gesehenen Wörter des gewählten Decks,
// durchsuchbar, mit SRS-Stärke (Punkte) und Aussprache.

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function strengthDots(level) {
  let dots = '';
  for (let i = 1; i <= MAX_LEVEL; i++) dots += `<span class="dict-dot ${i <= level ? 'dict-dot--on' : ''}"></span>`;
  return dots;
}

export async function renderDictionary(filter = '') {
  const body = document.getElementById('dictBody');
  if (!body) return;
  const deckId = document.getElementById('deckSelect')?.value;
  const deck = await loadDeck(deckId);
  if (!deck?.cards?.length) { body.innerHTML = '<p class="dict-empty">Kein Deck gewählt.</p>'; return; }

  const states = getCardStates(deckId);
  const q = filter.trim().toLowerCase();
  const seen = deck.cards.filter(c => states[c.front]);
  const list = (q
    ? seen.filter(c => c.front.toLowerCase().includes(q) || String(c.back).toLowerCase().includes(q))
    : seen
  ).slice(0, 200);

  if (!seen.length) {
    body.innerHTML = `
      <div class="dict-empty">
        <p style="font-size:2rem">🦉</p>
        <p><b>Noch keine Wörter gelernt.</b></p>
        <p>Starte eine Session — jedes gesehene Wort landet hier.</p>
      </div>`;
    return;
  }
  if (!list.length) { body.innerHTML = '<p class="dict-empty">Kein Treffer.</p>'; return; }

  // Bei Latein steht das lateinische Wort vorn (Lernrichtung La→De).
  const rev = deck.language === 'la';
  body.innerHTML = `
    <p class="dict-count">${seen.length} Wörter gelernt · ${deck.name}</p>
    <ul class="dict-list">
      ${list.map(c => `
        <li class="dict-row">
          <div class="dict-words">
            <b>${esc(rev ? c.back : c.front)}</b>
            <span class="dict-back">${esc(rev ? c.front : c.back)}${c.roman ? ` · ${esc(c.roman)}` : ''}</span>
          </div>
          <span class="dict-strength" title="Stärke ${states[c.front].level}/${MAX_LEVEL}">${strengthDots(states[c.front].level)}</span>
          <button type="button" class="audio-btn dict-audio" data-say="${esc(c.back)}" title="Anhören"><i class="fas fa-volume-up"></i></button>
        </li>`).join('')}
    </ul>
    ${seen.length > 200 && !q ? '<p class="dict-count">… nutze die Suche für mehr.</p>' : ''}`;

  body.querySelectorAll('.dict-audio').forEach(btn =>
    btn.addEventListener('click', () => speak(btn.dataset.say, deck.language)));
}

export function initDictionary(activateView) {
  document.getElementById('dictBackBtn')?.addEventListener('click', () => activateView?.('learn'));
  document.getElementById('dictSearch')?.addEventListener('input', e => renderDictionary(e.target.value));
}

import { loadDeck } from '../core/state.js';
import { addBonusXp } from '../core/gamification.js';
import { createUserStore } from '../core/userStore.js';
import { renderGamiHeader } from './gami.js';
import { showToast } from './toast.js';

// „Wort des Tages": deterministisch aus dem gewählten Deck (Seed = Datum),
// einmal pro Tag mit einem kleinen XP-Bonus abschließbar.
const WOTD_XP = 5;
const store = createUserStore('lingualearn_wotd_', { defaults: () => ({ date: null, claimed: false }) });

export function reinitWotd() { store.reinit(); }

// „Wort des Tages" als Overlay (Knopf oben in der Konfiguration).
export function openWotd() {
  const modal = document.getElementById('wotdModal');
  if (!modal) return;
  renderWotd();
  modal.hidden = false;
}
export function closeWotd() {
  const modal = document.getElementById('wotdModal');
  if (modal) modal.hidden = true;
}
export function initWotdModal() {
  document.getElementById('wotdBtn')?.addEventListener('click', openWotd);
  const modal = document.getElementById('wotdModal');
  if (!modal) return;
  modal.querySelector('.modal__close')?.addEventListener('click', closeWotd);
  modal.querySelector('.modal__backdrop')?.addEventListener('click', closeWotd);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeWotd();
  });
}

const LANG_CODES = { da: 'da-DK', el: 'el-GR', fr: 'fr-FR', es: 'es-ES', la: 'la', ru: 'ru-RU', ja: 'ja-JP' };

function todayStr() { return new Date().toISOString().slice(0, 10); }
function dateSeed(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }

function speak(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = LANG_CODES[lang] || lang;
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

export function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function renderWotd() {
  const panel = document.getElementById('wotd');
  if (!panel) return;
  const deckId = document.getElementById('deckSelect')?.value;
  if (!deckId) { panel.hidden = true; return; }

  const deck = await loadDeck(deckId);
  if (!deck?.cards?.length) { panel.hidden = true; return; }

  const today = todayStr();
  const card = deck.cards[dateSeed(today + deckId) % deck.cards.length];
  const st = store.get();
  const claimed = st.date === today && st.claimed;

  const pron = [];
  if (card.roman) pron.push(esc(card.roman));
  if (card.ipa) pron.push('/' + esc(card.ipa) + '/');

  panel.hidden = false;
  panel.innerHTML = `
    <div class="wotd__deck">${esc(deck.name)}</div>
    <div class="wotd__row">
      <div class="wotd__word">
        <span class="wotd__de">${esc(card.front)}</span>
        <span class="wotd__arrow">→</span>
        <span class="wotd__target">${esc(card.back)}</span>
        <button type="button" class="audio-btn wotd__audio" title="Aussprache"><i class="fas fa-volume-up"></i></button>
      </div>
      ${pron.length ? `<div class="wotd__pron">${pron.join(' · ')}</div>` : ''}
    </div>
    ${card.example ? `<div class="wotd__ex">${esc(card.example)}${card.exampleDE ? ` — <span class="wotd__exde">${esc(card.exampleDE)}</span>` : ''}</div>` : ''}
    <button type="button" class="btn btn-primary btn-full wotd__claim" ${claimed ? 'disabled' : ''}>
      ${claimed ? '<i class="fas fa-check"></i> Heute erledigt' : `<i class="fas fa-gift"></i> Gelernt (+${WOTD_XP} XP)`}
    </button>
  `;

  panel.querySelector('.wotd__audio').addEventListener('click', () => speak(card.back, deck.language));
  const claimBtn = panel.querySelector('.wotd__claim');
  if (!claimed) {
    claimBtn.addEventListener('click', () => {
      addBonusXp(WOTD_XP);
      store.save({ date: today, claimed: true });
      renderGamiHeader();
      renderWotd();
      showToast(`<i class="fas fa-star toast__icon"></i><div class="toast__body"><b>Wort des Tages</b><span>+${WOTD_XP} XP — komm morgen wieder!</span></div>`);
    });
  }
}

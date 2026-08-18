import { loadDeck } from './state.js';
import { shuffleArray } from '../utils/helpers.js';
import { seedCardStates } from './cardProgress.js';
import { setIntroduced, lessonBoundaryAtOrBefore, lessonNumber } from './course.js';
import { enterFocus } from './session.js';
import { renderLearnWidgets } from '../ui/gami.js';

// Einstufungstest — „nicht jeder fängt bei Hallo an".
//
// Wer Schulfranzösisch oder Latein aus dem Unterricht mitbringt, müsste
// sonst 40 Lektionen abnicken, bevor etwas Neues kommt. Der Test sucht
// die Stelle im Deck, an der das Gelernte aufhört.
//
// Verfahren: Intervallhalbierung über die Deck-Reihenfolge (die Karten
// stehen thematisch von leicht nach schwer). Pro Runde werden ZWEI
// Wörter aus derselben Gegend gefragt — beide richtig heißt „das kannst
// du", sonst wird nach unten gesucht. Zwei Fragen je Schritt federn den
// Zufall ab, dass ausgerechnet ein bekanntes Wort daneben geht.
//
// Der Test verändert nichts, solange er läuft: Kursstand und Kartenlevel
// werden erst am Ende in einem Rutsch gesetzt — ein Abbruch lässt das
// Konto also unberührt.

export const PLACEMENT_ROUNDS = 10;          // 2 Fragen je Runde → ~20
const PER_ROUND = 2;
const MIN_WINDOW = 6;                        // feiner lohnt die Suche nicht

// Latein wird in Prüfungsrichtung gelernt (Latein → Deutsch).
const isReverse = deck => deck.language === 'la';
const promptOf = (deck, card) => (isReverse(deck) ? card.back : card.front);
const answerOf = (deck, card) => (isReverse(deck) ? card.front : card.back);

let state = null;

export function getPlacementState() { return state; }

// Auswahl der Frage-Karten einer Runde: aus einem Fenster um `mid`,
// ohne Wiederholungen.
function pickAround(cards, mid, used, n) {
  const out = [];
  const span = Math.max(6, Math.floor(cards.length * 0.02));
  const from = Math.max(0, mid - span);
  const to = Math.min(cards.length, mid + span + 1);
  const pool = shuffleArray(cards.slice(from, to).filter(c => !used.has(c.front)));
  for (const c of pool) {
    out.push(c);
    if (out.length >= n) break;
  }
  return out;
}

function buildOptions(deck, card) {
  const answer = answerOf(deck, card);
  const pool = shuffleArray(deck.cards.filter(c => answerOf(deck, c) !== answer)).slice(0, 3);
  return shuffleArray([card, ...pool]);
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Ablauf ───────────────────────────────────────────────────────

export async function startPlacement(deckId, onFinish) {
  const deck = await loadDeck(deckId);
  if (!deck?.cards?.length) return false;

  state = {
    deck, deckId, onFinish,
    lo: 0,
    hi: deck.cards.length,
    round: 0,
    asked: 0,
    used: new Set(),
    queue: [],
    roundRight: 0,
    roundMid: 0,
    right: [],
    wrong: [],
  };
  enterFocus('course');
  const title = document.getElementById('session-title');
  if (title) title.textContent = `${deck.name} — Einstufung`;
  nextRound();
  return true;
}

function done() {
  return state.round >= PLACEMENT_ROUNDS || (state.hi - state.lo) <= MIN_WINDOW;
}

function nextRound() {
  if (done()) { finish(); return; }
  const mid = Math.floor((state.lo + state.hi) / 2);
  const cards = pickAround(state.deck.cards, mid, state.used, PER_ROUND);
  if (!cards.length) { finish(); return; }
  cards.forEach(c => state.used.add(c.front));
  state.queue = cards;
  state.roundMid = mid;
  state.roundRight = 0;
  state.round++;
  renderQuestion();
}

function renderQuestion() {
  const area = document.getElementById('learnArea');
  if (!area || !state) return;
  const card = state.queue[0];
  const { deck } = state;
  const options = buildOptions(deck, card);
  state.options = options;
  state.current = card;

  const total = PLACEMENT_ROUNDS * PER_ROUND;
  area.innerHTML = `
    <div class="mc-card placement-card">
      <p class="fc-label">Einstufung · Frage ${state.asked + 1} von ${total}</p>
      <div class="fc-word mc-question">${esc(promptOf(deck, card))}</div>
      <p class="prompt">Was heißt das? Weißt du es nicht, wähle „Kenne ich nicht“.</p>
      <div class="mc-options" role="group" aria-label="Antwortmöglichkeiten">
        ${options.map((o, i) => `
          <button type="button" class="btn mc-option" data-idx="${i}">
            <span class="mc-key" aria-hidden="true">${'ABCD'[i]}</span>
            <span class="mc-text">${esc(answerOf(deck, o))}</span>
          </button>`).join('')}
      </div>
      <button type="button" class="btn placement-unknown" id="placementUnknown">
        <i class="fas fa-question"></i> Kenne ich nicht
      </button>
    </div>`;

  area.querySelectorAll('.mc-option').forEach(btn =>
    btn.addEventListener('click', () => answer(Number(btn.dataset.idx))));
  document.getElementById('placementUnknown')?.addEventListener('click', () => answer(-1));
  updateBar();
}

function updateBar() {
  const total = PLACEMENT_ROUNDS * PER_ROUND;
  const t = document.getElementById('progress-text');
  if (t) t.textContent = `${state.asked}/${total} Fragen`;
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = `${Math.round((state.asked / total) * 100)}%`;
}

function answer(idx) {
  if (!state?.current) return;
  const card = state.current;
  const correct = idx >= 0 && answerOf(state.deck, state.options[idx]) === answerOf(state.deck, card);
  state.asked++;
  if (correct) { state.roundRight++; state.right.push(card.front); }
  else state.wrong.push(card.front);

  state.queue.shift();
  state.current = null;
  if (state.queue.length) { renderQuestion(); return; }

  // Runde ausgewertet: nur wenn BEIDE saßen, wird weiter oben gesucht.
  if (state.roundRight >= PER_ROUND) state.lo = state.roundMid + 1;
  else state.hi = state.roundMid;
  updateBar();
  nextRound();
}

// ── Ergebnis anwenden ────────────────────────────────────────────

// Reine Rechnung, damit sie ohne Browser prüfbar ist: Aus der gefundenen
// Grenze werden die Karten-Startwerte abgeleitet.
export function placementSeeds(cards, known, rightSet, wrongSet) {
  const seeds = [];
  for (let i = 0; i < known && i < cards.length; i++) {
    const front = cards[i].front;
    // Im Test bestätigte Wörter starten höher, danebengegangene tiefer.
    const level = wrongSet.has(front) ? 1 : rightSet.has(front) ? 4 : 3;
    // Fälligkeiten über zwei Wochen streuen, sonst liegt der halbe
    // Grundwortschatz am selben Tag auf dem Stapel.
    seeds.push({ front, level, dueInDays: 1 + (i % 14) });
  }
  return seeds;
}

export function applyPlacement(deckId, cards, known, right = [], wrong = []) {
  const boundary = lessonBoundaryAtOrBefore(deckId, known);
  const seeds = placementSeeds(cards, boundary, new Set(right), new Set(wrong));
  const seeded = seedCardStates(deckId, seeds);
  setIntroduced(deckId, boundary);
  return { boundary, seeded };
}

function finish() {
  const { deckId, deck, lo, right, wrong, onFinish } = state;
  const { boundary } = applyPlacement(deckId, deck.cards, lo, right, wrong);
  const lesson = lessonNumber(deckId);
  const area = document.getElementById('learnArea');
  state = null;
  renderLearnWidgets();

  if (area) {
    area.innerHTML = `
      <div class="placement-result">
        <div class="placement-result__icon"><i class="fas fa-flag-checkered"></i></div>
        <h3>Einstufung fertig</h3>
        <p class="placement-result__lead">
          ${boundary > 0
            ? `Du kannst schon rund <b>${boundary}</b> ${boundary === 1 ? 'Wort' : 'Wörter'} dieses Decks.`
            : 'Wir fangen ganz vorne an — genau richtig.'}
        </p>
        <p class="placement-result__hint">
          Der Kurs startet bei <b>Lektion ${lesson}</b>. Die eingestuften Wörter
          kommen über die nächsten Tage zur Auffrischung zurück.
        </p>
        <button type="button" class="btn btn-primary" id="courseNext">
          <i class="fas fa-graduation-cap"></i> Lektion ${lesson} starten
        </button>
      </div>`;
    document.getElementById('courseNext')?.addEventListener('click', () => onFinish?.());
  } else {
    onFinish?.();
  }
}

import { loadDeck, setCurrentSession } from '../state.js';
import { updateProgress } from '../progress.js';
import { shuffleArray } from '../../utils/helpers.js';
import { clearErrors } from '../errorLog.js';
import { themePack } from '../weakness.js';
import { enterFocus, clearBlitzTimer, startErrorReview } from './shared.js';
import { showFlashcard } from './flashcard.js';
import { showMultipleChoice } from './multipleChoice.js';

// „Für dich": gespeicherte Fehler-Wörter als Karteikarten-Runde üben.
export async function startErrorReviewByFronts(deckId, fronts) {
  const deck = await loadDeck(deckId);
  const set = new Set(fronts);
  const cards = (deck?.cards || []).filter(c => set.has(c.front));
  if (!cards.length) return false;
  clearErrors(deckId);
  document.getElementById('view-learn')?.classList.add('session-active');
  startErrorReview(deck, deckId, cards);
  return true;
}

// Gezieltes Übungspaket zu einer Themen-Schwäche (Statistik / „Für dich").
// Genommen werden die schwächsten Wörter des Themas — Multiple Choice mit
// Wiederholungsschleife, damit falsch Beantwortetes in derselben Runde
// nochmal drankommt. Zählt ganz normal für SRS, XP und Statistik.
export async function startWeakThemePractice(deckId, theme) {
  const fronts = themePack(deckId, theme);
  if (!fronts.length) return false;
  const deck = await loadDeck(deckId);
  const order = new Map(fronts.map((f, i) => [f, i]));
  const cards = (deck?.cards || [])
    .filter(c => order.has(c.front))
    .sort((a, b) => order.get(a.front) - order.get(b.front));
  if (!cards.length) return false;

  clearBlitzTimer();
  const mode = cards.length >= 4 ? 'multiplechoice' : 'flashcard';
  const shuffled = shuffleArray([...cards]);
  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode,
    currentIndex: 0,
    correctAnswers: 0,
    gradedAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: false,
    queue: [...shuffled],
    reviewQueue: [],
    reviewRound: 1,
  };
  setCurrentSession(session);
  enterFocus(mode);
  document.getElementById('session-title').textContent = `Schwäche üben — ${theme}`;
  updateProgress();
  if (mode === 'multiplechoice') showMultipleChoice(); else showFlashcard();
  return true;
}

// Abgeschlossene Lektion vom Pfad aus wiederholen (Multiple Choice;
// bei sehr kleinen Lektionen Karteikarten). Abschluss vergoldet den Knoten.
export async function startLessonReview(deckId, lessonIdx) {
  const deck = await loadDeck(deckId);
  const sizes = deck?.lessonSizes;
  if (!deck || !sizes || lessonIdx < 0 || lessonIdx >= sizes.length) return false;
  let start = 0;
  for (let k = 0; k < lessonIdx; k++) start += sizes[k];
  const cards = deck.cards.slice(start, start + sizes[lessonIdx]);
  if (!cards.length) return false;

  const mode = cards.length >= 4 ? 'multiplechoice' : 'flashcard';
  const shuffled = shuffleArray([...cards]);
  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode,
    currentIndex: 0,
    correctAnswers: 0,
    gradedAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: false,
    reviewLesson: { deckId, index: lessonIdx },
    queue: [...shuffled],
    reviewQueue: [],
    reviewRound: 1,
  };
  setCurrentSession(session);
  enterFocus(mode);
  const title = deck.lessonTitles?.[lessonIdx];
  document.getElementById('session-title').textContent =
    `Lektion ${lessonIdx + 1}${title ? ' · ' + title : ''} — Wiederholung`;
  updateProgress();
  if (mode === 'multiplechoice') showMultipleChoice(); else showFlashcard();
  return true;
}
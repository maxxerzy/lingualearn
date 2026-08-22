import { loadDeck, setCurrentSession } from './state.js';
import { updateProgress } from './progress.js';
import { shuffleArray } from '../utils/helpers.js';
import { getDueFronts } from './cardProgress.js';
import { consumeXpBoost } from './gamification.js';
import {
  getSelectedMode, enterFocus, clearBlitzTimer, exitSession,
  reinitGold, reinitThemeBadges, getGoldLessons, getThemeBadges,
  resetGoldLessons, resetThemeBadges
} from './session/shared.js';
import { showFlashcard } from './session/flashcard.js';
import { showMultipleChoice } from './session/multipleChoice.js';
import { startCourseLesson } from './session/courseMode.js';
import { maybeStartGrammar } from './session/grammarPhase.js';
import { startLessonReview, startErrorReviewByFronts, startWeakThemePractice } from './session/practice.js';
import { startBlitz } from './session/blitz.js';
import { startThemeQuiz } from './session/themeQuiz.js';

export async function startSession() {
  clearBlitzTimer();
  const deckId = document.getElementById('deckSelect').value;
  const startBtn = document.getElementById('startBtn');
  if (startBtn) startBtn.disabled = true;

  const deck = await loadDeck(deckId);

  if (startBtn) startBtn.disabled = false;

  if (!deck?.cards?.length) {
    alert('Bitte wähle ein gültiges Deck aus.');
    return;
  }

  // Fällig-Modus (Einmal-Filter der „Für dich"-Leiste): nur Karten lernen,
  // deren Wiederholungsdatum erreicht ist; danach wird der Filter gelöst.
  let sessionCards = deck.cards;
  const dueChk = document.getElementById('dueOnly');
  if (dueChk?.checked) {
    dueChk.checked = false;
    const dueFronts = new Set(getDueFronts(deckId));
    const dueCards = deck.cards.filter(c => dueFronts.has(c.front));
    if (dueCards.length === 0) {
      alert('Keine fälligen Karten in diesem Deck — starte eine normale Session, um neue Karten zu lernen.');
      return;
    }
    sessionCards = dueCards;
  }

  const mode = getSelectedMode();

  enterFocus(mode);

  if (mode === 'course') {
    // Grammatik zuerst: steht vor dieser Lektion ein ungelesenes Kapitel
    // an (z. B. „So funktioniert Dänisch" vor Lektion 1), kommt es vor
    // die Vokabeln — Sprache lernen heißt auch Grammatik lernen.
    if (await maybeStartGrammar(deck, deckId)) return;
    startCourseLesson(deck, deckId);
    return;
  }

  const shuffled = shuffleArray([...sessionCards]);

  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode,
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: consumeXpBoost(),   // XP-Boost aus dem Shop einlösen
    // flashcard
    queue: [...shuffled],
    reviewQueue: [],
    reviewRound: 1
  };

  setCurrentSession(session);
  document.getElementById('session-title').textContent = `${deck.name}`;
  updateProgress();

  // Außerhalb des Lernkurses gibt es nur noch die Karteikarten; die
  // Multiple-Choice-Ansicht bleibt für Lektions-Wiederholungen erhalten.
  if (mode === 'multiplechoice') showMultipleChoice();
  else showFlashcard();
}

export {
  enterFocus, exitSession, reinitGold, reinitThemeBadges,
  getGoldLessons, getThemeBadges, resetGoldLessons, resetThemeBadges,
  startLessonReview, startErrorReviewByFronts, startWeakThemePractice,
  startBlitz, startThemeQuiz
};

import { getCurrentSession, setCurrentSession, getUserStats, setUserStats } from '../state.js';
import { updateProgress } from '../progress.js';
import { updateStats } from '../stats.js';
import { shuffleArray } from '../../utils/helpers.js';
import { latinPron } from '../../utils/speech.js';
import {
  speakWord, isReverse, promptText, answerText, promptLabel, answerLabel,
  promptAudioBtn, wirePromptAudio, exampleLine, wireExampleAudio, cognateChip,
  recordAnswerEffects, endSession, escHtml
} from './shared.js';

export function showFlashcard() {
  const session = getCurrentSession();
  if (!session || session.queue.length === 0) {
    endSession();
    return;
  }

  const card = session.queue[0];
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="flashcard-front">
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word">${escHtml(promptText(session, card))} ${promptAudioBtn(session)}</div>
      <div class="actions">
        <button type="button" class="btn btn-primary" id="showAnswer">
          <i class="fas fa-eye"></i> Antwort zeigen
        </button>
      </div>
      <div class="fc-queue-info">
        ${session.reviewRound > 1
          ? `<span class="review-badge"><i class="fas fa-redo"></i> Wiederholung ${session.reviewRound}</span>`
          : ''}
      </div>
    </div>
  `;

  wirePromptAudio(session, card);
  if (isReverse(session.deck)) speakWord(card.back, session.deck.language);
  document.getElementById('showAnswer').addEventListener('click', () => showFlashcardBack(card));
  updateProgress();
}

function showFlashcardBack(card) {
  const session = getCurrentSession();
  const lang = session.deck.language;
  const learnArea = document.getElementById('learnArea');

  // Pronunciation of the target word: IPA (+ romanization for non-Latin scripts).
  const ipaParts = [];
  if (card.ipa)   ipaParts.push(`<span class="fc-ipa-tip__ipa">/${escHtml(card.ipa)}/</span>`);
  if (card.roman) ipaParts.push(`<span class="fc-ipa-tip__roman">${escHtml(card.roman)}</span>`);
  // Latein: zusätzlich die klassische Aussprache in deutscher Umschrift.
  if (lang === 'la') ipaParts.push(`<span class="fc-ipa-tip__roman">gesprochen: „${escHtml(latinPron(card.back))}"</span>`);
  const ipaMarkup = ipaParts.join('');
  const pron = ipaParts.length > 0;

  // Der Aussprache-Knopf gehört immer zum fremdsprachigen Wort — bei
  // umgekehrter Richtung (Latein) steht das oben als Abfrage.
  const audioBtnHtml = `
        <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören">
          <i class="fas fa-volume-up"></i>
        </button>`;
  learnArea.innerHTML = `
    <div class="flashcard-back">
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word fc-word-source">${escHtml(promptText(session, card))}${isReverse(session.deck) ? audioBtnHtml : ''}</div>
      <div class="fc-arrow"><i class="fas fa-arrow-down"></i></div>
      <p class="fc-label">${answerLabel(session)}</p>
      <div class="fc-word fc-word-target">
        ${escHtml(answerText(session, card))}${isReverse(session.deck) ? '' : audioBtnHtml}
      </div>
      ${cognateChip(card)}
      ${card.example ? `
        <div class="fc-example-block">
          <p class="fc-example${pron ? ' has-ipa' : ''}"${pron ? ' tabindex="0"' : ''}>
            ${exampleLine(card.example)}
            ${pron ? `<span class="fc-ipa-tip" role="tooltip">
              <span class="fc-ipa-tip__word">${escHtml(card.back)}</span>${ipaMarkup}
            </span>` : ''}
          </p>
          ${card.exampleDE ? `<p class="fc-example-de">${escHtml(card.exampleDE)}</p>` : ''}
        </div>
      ` : ''}
      <div class="fc-rating">
        <p class="fc-rating-label">Wie gut wusstest du das?</p>
        <div class="actions">
          <button type="button" class="btn btn-easy" data-rating="easy">
            <i class="fas fa-star"></i> Einfach
          </button>
          <button type="button" class="btn btn-good" data-rating="good">Gut</button>
          <button type="button" class="btn btn-hard" data-rating="hard">Schwer</button>
          <button type="button" class="btn btn-again" data-rating="again">
            <i class="fas fa-redo"></i> Nochmal
          </button>
        </div>
      </div>
    </div>
  `;

  // Auto-play pronunciation
  speakWord(card.back, lang);

  document.getElementById('audioBtn').addEventListener('click', () => speakWord(card.back, lang));
  wireExampleAudio(lang);

  // Touch devices have no hover — let a tap toggle the pronunciation tooltip.
  const exampleEl = learnArea.querySelector('.fc-example.has-ipa');
  if (exampleEl) {
    exampleEl.addEventListener('click', () => exampleEl.classList.toggle('show-ipa'));
  }

  document.querySelectorAll('[data-rating]').forEach(btn => {
    btn.addEventListener('click', () => rateFlashcard(card, btn.dataset.rating));
  });
}

function rateFlashcard(card, rating) {
  const session = getCurrentSession();
  const userStats = getUserStats();

  session.queue.shift();
  session.currentIndex++;

  // „Nochmal" legt die Karte in die Wiederholungsrunde dieser Session.
  if (rating === 'again') {
    session.reviewQueue.push(card);
  }

  const isCorrect = rating !== 'again' && rating !== 'hard';
  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();

  recordAnswerEffects(session, card, isCorrect, rating);

  if (session.queue.length === 0) {
    if (session.reviewQueue.length > 0) {
      session.queue = shuffleArray([...session.reviewQueue]);
      session.reviewQueue = [];
      session.reviewRound++;
      session.currentIndex = 0;
      session.correctAnswers = 0;
    } else {
      setCurrentSession(session);
      endSession();
      return;
    }
  }

  setCurrentSession(session);
  updateProgress();
  showFlashcard();
}

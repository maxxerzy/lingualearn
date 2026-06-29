import { loadDeck, getCurrentSession, setCurrentSession, getUserStats, setUserStats } from './state.js';
import { updateProgress } from './progress.js';
import { updateStats } from './stats.js';
import { shuffleArray } from '../utils/helpers.js';

const LANG_CODES = { da: 'da-DK', el: 'el-GR', fr: 'fr-FR', es: 'es-ES', la: 'la', ru: 'ru-RU' };
const LANG_NAMES  = { da: 'Dänisch', el: 'Griechisch', fr: 'Französisch', es: 'Spanisch', la: 'Latein', ru: 'Russisch' };

function getLangCode(lang) {
  return LANG_CODES[lang] || lang;
}

function getLangName(lang) {
  return LANG_NAMES[lang] || lang;
}

function speakWord(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = getLangCode(lang);
  utt.rate = 0.85;
  window.speechSynthesis.speak(utt);
}

export function getSelectedMode() {
  const btn = document.querySelector('.mode-btn.active');
  return btn ? btn.dataset.mode : 'flashcard';
}

export async function startSession() {
  const deckId = document.getElementById('deckSelect').value;
  const startBtn = document.getElementById('startBtn');
  if (startBtn) startBtn.disabled = true;

  const deck = await loadDeck(deckId);

  if (startBtn) startBtn.disabled = false;

  if (!deck?.cards?.length) {
    alert('Bitte wähle ein gültiges Deck aus.');
    return;
  }

  const mode = getSelectedMode();
  const shuffled = shuffleArray([...deck.cards]);

  const session = {
    deck,
    cards: shuffled,
    mode,
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    // flashcard
    queue: [...shuffled],
    reviewQueue: [],
    reviewRound: 1
  };

  setCurrentSession(session);
  document.getElementById('session-title').textContent = `${deck.name}`;
  updateProgress();

  if (mode === 'flashcard') {
    showFlashcard();
  } else if (mode === 'multiplechoice') {
    showMultipleChoice();
  } else {
    showNextCard();
  }
}

// ── FLASHCARD MODE ───────────────────────────────────────────────

function showFlashcard() {
  const session = getCurrentSession();
  if (!session || session.queue.length === 0) {
    endSession();
    return;
  }

  const card = session.queue[0];
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="flashcard-front">
      <p class="fc-label">Deutsch</p>
      <div class="fc-word">${escHtml(card.front)}</div>
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

  document.getElementById('showAnswer').addEventListener('click', () => showFlashcardBack(card));
  updateProgress();
}

function showFlashcardBack(card) {
  const session = getCurrentSession();
  const lang = session.deck.language;
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="flashcard-back">
      <p class="fc-label">Deutsch</p>
      <div class="fc-word fc-word-source">${escHtml(card.front)}</div>
      <div class="fc-arrow"><i class="fas fa-arrow-down"></i></div>
      <p class="fc-label">${getLangName(lang)}</p>
      <div class="fc-word fc-word-target">
        ${escHtml(card.back)}
        <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören">
          <i class="fas fa-volume-up"></i>
        </button>
      </div>
      ${card.example ? `
        <p class="fc-example"><strong>${escHtml(card.example)}</strong></p>
        ${card.exampleDE ? `<p class="fc-example-de">${escHtml(card.exampleDE)}</p>` : ''}
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

  document.querySelectorAll('[data-rating]').forEach(btn => {
    btn.addEventListener('click', () => rateFlashcard(card, btn.dataset.rating));
  });
}

function rateFlashcard(card, rating) {
  const session = getCurrentSession();
  const userStats = getUserStats();

  session.queue.shift();
  session.currentIndex++;

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

// ── MULTIPLE CHOICE MODE ─────────────────────────────────────────

function showMultipleChoice() {
  const session = getCurrentSession();
  if (!session || session.currentIndex >= session.cards.length) {
    endSession();
    return;
  }

  const card = session.cards[session.currentIndex];
  const lang = session.deck.language;
  const options = buildMCOptions(card, session.cards);

  const learnArea = document.getElementById('learnArea');
  learnArea.innerHTML = `
    <div class="mc-card">
      <p class="fc-label">Deutsch</p>
      <div class="fc-word mc-question">${escHtml(card.front)}</div>
      <p class="prompt">${getLangName(lang)} — welche Übersetzung stimmt?</p>
      <div class="mc-options">
        ${options.map((opt, i) => `
          <button type="button" class="btn mc-option" data-idx="${i}">
            <span class="mc-key">${'ABCD'[i]}</span>
            <span class="mc-text">
              ${escHtml(opt.back)}
              <button type="button" class="audio-btn mc-audio" data-text="${escHtml(opt.back)}" title="Aussprache">
                <i class="fas fa-volume-up"></i>
              </button>
            </span>
          </button>
        `).join('')}
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentIndex++;
  session.currentPrompt = { card, options };
  setCurrentSession(session);
  updateProgress();

  learnArea.querySelectorAll('.mc-audio').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      speakWord(btn.dataset.text, lang);
    });
  });

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => checkMCAnswer(Number(btn.dataset.idx)));
  });
}

function buildMCOptions(card, cards) {
  const wrongs = shuffleArray(cards.filter(c => c.back !== card.back)).slice(0, 3);
  return shuffleArray([card, ...wrongs]);
}

function checkMCAnswer(selectedIdx) {
  const session = getCurrentSession();
  const userStats = getUserStats();
  const { card, options } = session.currentPrompt;
  const chosen = options[selectedIdx];
  const isCorrect = chosen.back === card.back;
  const correctIdx = options.findIndex(o => o.back === card.back);
  const lang = session.deck.language;

  document.querySelectorAll('.mc-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIdx) btn.classList.add('mc-correct');
    else if (i === selectedIdx && !isCorrect) btn.classList.add('mc-wrong');
  });

  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
    speakWord(card.back, lang);
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();
  session.currentPrompt = null;
  setCurrentSession(session);

  const fb = document.getElementById('mc-fb');
  fb.innerHTML = isCorrect
    ? `<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>`
    : `<div class="incorrect" style="margin-top:14px">
         <p>❌ Falsch — richtig: <b>${escHtml(card.back)}</b></p>
       </div>`;

  fb.innerHTML += `
    <div class="actions" style="margin-top:14px">
      <button type="button" class="btn btn-primary" id="mcNext">Weiter</button>
    </div>
  `;

  document.getElementById('mcNext').addEventListener('click', showMultipleChoice);
}

// ── COMPARISON MODE ──────────────────────────────────────────────

export function showNextCard() {
  const session = getCurrentSession();
  if (!session || session.currentIndex >= session.cards.length) {
    endSession();
    return;
  }

  const card = session.cards[session.currentIndex];
  const prompt = createComparisonPrompt(card, session.cards);
  renderComparisonCard(card, prompt, session.deck.language);
  session.currentIndex++;
  session.currentPrompt = { ...prompt, card };
  setCurrentSession(session);
  updateProgress();
}

function createComparisonPrompt(card, cards) {
  if (cards.length <= 1) return { translation: card.back, isMatch: true };

  if (Math.random() < 0.5) return { translation: card.back, isMatch: true };

  const alts = cards.filter(c => c.back !== card.back);
  if (alts.length === 0) return { translation: card.back, isMatch: true };

  return { translation: alts[Math.floor(Math.random() * alts.length)].back, isMatch: false };
}

function renderComparisonCard(card, prompt, lang) {
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="q">${escHtml(card.front)}</div>
    <p class="prompt">Stimmt diese Übersetzung?</p>
    <div class="comparison-card">
      <span class="word word-source">${escHtml(card.front)}</span>
      <i class="fas fa-arrow-right"></i>
      <span class="word word-target">
        ${escHtml(prompt.translation)}
        <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören">
          <i class="fas fa-volume-up"></i>
        </button>
      </span>
    </div>
    <div class="actions">
      <button type="button" class="btn btn-primary" id="answerMatch">
        <i class="fas fa-check"></i> Passt
      </button>
      <button type="button" class="btn btn-secondary" id="answerMismatch">
        <i class="fas fa-times"></i> Passt nicht
      </button>
      <button type="button" class="btn" id="skipCard">Überspringen</button>
    </div>
    <div id="fb"></div>
  `;

  document.getElementById('audioBtn').addEventListener('click', () => speakWord(prompt.translation, lang));
  document.getElementById('answerMatch').addEventListener('click', () => checkComparisonAnswer(true));
  document.getElementById('answerMismatch').addEventListener('click', () => checkComparisonAnswer(false));
  document.getElementById('skipCard').addEventListener('click', showNextCard);
}

function checkComparisonAnswer(userSaysMatch) {
  const fb = document.getElementById('fb');
  const session = getCurrentSession();
  const userStats = getUserStats();
  const prompt = session?.currentPrompt;

  if (!prompt) return;

  document.querySelectorAll('#learnArea .actions button').forEach(b => { b.disabled = true; });

  const isCorrect = userSaysMatch === prompt.isMatch;

  if (isCorrect) {
    fb.innerHTML = `
      <div class="correct">
        <p>✅ Richtig!</p>
        <p>Zuordnung: <b>${escHtml(prompt.card.front)}</b> → <b>${escHtml(prompt.card.back)}</b></p>
      </div>
      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn btn-primary" id="nextCard">Weiter</button>
      </div>
    `;
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  } else {
    fb.innerHTML = `
      <div class="incorrect">
        <p>❌ Falsch!</p>
        <p>Korrekt: <b>${escHtml(prompt.card.front)}</b> → <b>${escHtml(prompt.card.back)}</b></p>
      </div>
      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn btn-primary" id="nextCard">Weiter</button>
      </div>
    `;
  }

  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();
  session.currentPrompt = null;
  setCurrentSession(session);

  document.getElementById('nextCard').addEventListener('click', showNextCard);
}

// ── END SESSION ──────────────────────────────────────────────────

function endSession() {
  const session = getCurrentSession();
  const userStats = getUserStats();

  // Count completed session and track active days
  userStats.totalSessions = (userStats.totalSessions || 0) + 1;
  const today = new Date().toISOString().slice(0, 10);
  if (userStats.lastSessionDate !== today) {
    userStats.activeDays = (userStats.activeDays || 0) + 1;
    userStats.lastSessionDate = today;
  }
  setUserStats(userStats);
  updateStats();

  const total = session?.totalCards || session?.cards?.length || 0;
  const correct = session?.correctAnswers || 0;
  const rate = total > 0 ? Math.round((correct / total) * 100) : 0;

  document.getElementById('learnArea').innerHTML = `
    <h3 style="font-size:1.6rem;margin-bottom:12px">🎉 Session beendet!</h3>
    <p style="color:var(--gray);margin-bottom:6px">${correct} von ${total} Karten richtig</p>
    <p style="font-size:1.4rem;font-weight:700;color:var(--primary);margin-bottom:24px">${rate}%</p>
    <div class="actions">
      <button type="button" class="btn btn-primary" id="restartSession">
        <i class="fas fa-redo"></i> Noch einmal
      </button>
    </div>
  `;

  document.getElementById('restartSession').addEventListener('click', startSession);
  setCurrentSession(null);
}

// ── Helpers ──────────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

import { getUserStats, setCurrentSession, setUserStats } from '../../state.js';
import { updateProgress } from '../../progress.js';
import { shuffleArray } from '../../../utils/helpers.js';
import { playWrong } from '../../../utils/feedback.js';
import {
  answerLabel, answerText, buildMCOptions, courseBadge, escHtml, isReverse, markMcAnswer,
  mcOptionsMarkup, promptAudioBtn, promptLabel, promptText, recordAnswerEffects, speakWord, wirePromptAudio
} from '../shared.js';
import { courseGrade, courseFeedbackHtml } from './shared.js';
import { showCourseStep } from './lesson.js';

export function renderCourseWordMC(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  // Distraktoren nur aus bereits gelernten Wörtern.
  const options = buildMCOptions(card, session.knownCards);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card">
      ${courseBadge(`<i class="fas fa-dumbbell"></i> Wörter üben — noch ${session.queue.length}`)}
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word mc-question">${escHtml(promptText(session, card))} ${promptAudioBtn(session)}</div>
      <p class="prompt">${answerLabel(session)} — welche Übersetzung stimmt?</p>
      ${mcOptionsMarkup(options, { textOf: o => answerText(session, o) })}
    </div>
  `;

  wirePromptAudio(session, card);
  if (isReverse(session.deck)) speakWord(card.back, lang);
  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      if (isCorrect) speakWord(card.back, lang);

      courseGrade(session, card, isCorrect);

      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, '', answerText(session, card))}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Phase „Paare verbinden": 4 Wörter der Lektion und ihre Übersetzungen
// gemischt auf einem Brett — links antippen, rechts das Gegenstück.
// Ein Paar ohne Fehlversuch zählt als richtige Antwort für dieses Wort.
export function renderCourseMatch(session) {
  const lang = session.deck.language;
  const pairs = shuffleArray([...session.lessonCards]).slice(0, 4);
  const left = shuffleArray(pairs.map((c, i) => ({ c, i })));
  const right = shuffleArray(pairs.map((c, i) => ({ c, i })));
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card match-card">
      ${courseBadge('<i class="fas fa-link"></i> Paare verbinden')}
      <p class="prompt">Tippe ein Wort und dann seine Übersetzung:</p>
      <div class="match-grid" id="matchGrid">
        <div class="match-col">
          ${left.map(({ c, i }) => `<button type="button" class="btn match-btn" data-side="l" data-i="${i}">${escHtml(promptText(session, c))}</button>`).join('')}
        </div>
        <div class="match-col">
          ${right.map(({ c, i }) => `<button type="button" class="btn match-btn" data-side="r" data-i="${i}">${escHtml(answerText(session, c))}</button>`).join('')}
        </div>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { pairs: pairs.map(c => c.front) };
  setCurrentSession(session);

  const grid = document.getElementById('matchGrid');
  const missed = new Set();     // Paare mit Fehlversuch
  let selected = null;          // aktuell gewählter Knopf
  let solved = 0;

  grid.addEventListener('click', e => {
    const btn = e.target.closest('.match-btn');
    if (!btn || btn.disabled) return;

    if (!selected) {
      selected = btn;
      btn.classList.add('match-btn--selected');
      return;
    }
    if (btn === selected) {           // Abwahl
      btn.classList.remove('match-btn--selected');
      selected = null;
      return;
    }
    if (btn.dataset.side === selected.dataset.side) {   // Seite gewechselt
      selected.classList.remove('match-btn--selected');
      selected = btn;
      btn.classList.add('match-btn--selected');
      return;
    }

    const a = selected;
    selected = null;
    a.classList.remove('match-btn--selected');
    const card = pairs[Number(btn.dataset.i)];

    if (a.dataset.i === btn.dataset.i) {
      // Treffer: Paar einfrieren, Wort vorlesen, werten.
      [a, btn].forEach(el => { el.disabled = true; el.classList.add('match-btn--matched'); });
      speakWord(card.back, lang);
      const ok = !missed.has(btn.dataset.i);
      session.gradedAnswers++;
      if (ok) session.correctAnswers++;
      const userStats = getUserStats();
      if (ok) {
        userStats.learnedWords = (userStats.learnedWords || 0) + 1;
        userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
      }
      userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
      setUserStats(userStats);
      recordAnswerEffects(session, card, ok, ok);
      solved++;
      if (solved === pairs.length) {
        session.matchDone = true;
        session.currentIndex++;        // das Brett zählt als ein Schritt
        session.currentPrompt = null;
        setCurrentSession(session);
        updateProgress();
        document.getElementById('mc-fb').innerHTML = `
          <div class="correct" style="margin-top:14px"><p>✅ Alle Paare gefunden!</p></div>
          <div class="actions" style="margin-top:14px">
            <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
          </div>
        `;
        document.getElementById('courseNext').addEventListener('click', showCourseStep);
      }
    } else {
      // Daneben: beide kurz rot, das Zielpaar gilt als „mit Fehlversuch".
      missed.add(a.dataset.i);
      missed.add(btn.dataset.i);
      [a, btn].forEach(el => {
        el.classList.add('match-btn--wrong');
        setTimeout(() => el.classList.remove('match-btn--wrong'), 500);
      });
      playWrong();
    }
  });
}

// Schreib-Runde OHNE Tastatur: Das Zielwort wird aus Bausteinen
// zusammengesetzt — Einzelwörter aus Buchstaben-Kacheln, Wortgruppen aus
// Wort-Kacheln. Bewusst KEIN Eingabefeld: Für Griechisch, Russisch oder
// Japanisch ist die passende Tastatur auf dem Gerät meist gar nicht
// installiert; hier sind alle nötigen Zeichen immer da — antippen legt
// sie ab, erneutes Antippen holt sie zurück.
function renderCourseWordTiles(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const expected = answerText(session, card);
  const multi = /\s/.test(expected.trim());
  const letters = multi ? expected.trim().split(/\s+/) : expected.split('');
  const order = shuffleArray(letters.map((_, i) => i));
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card build-card">
      ${courseBadge(`<i class="fas fa-shapes"></i> Schreiben — noch ${session.queue.length}`)}
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word">${escHtml(promptText(session, card))} ${promptAudioBtn(session)}</div>
      <p class="prompt">Baue die Übersetzung aus den ${multi ? 'Wörtern' : 'Buchstaben'} (${answerLabel(session)}):</p>
      <div class="build-answer tile-answer" id="tileAnswer" aria-label="Deine Antwort"></div>
      <div class="build-pool" id="tilePool">
        ${order.map(i => `<button type="button" class="build-tile${multi ? '' : ' letter-tile'}" data-i="${i}">${escHtml(letters[i])}</button>`).join('')}
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { card };
  setCurrentSession(session);
  wirePromptAudio(session, card);

  const placed = [];
  const pool = document.getElementById('tilePool');
  const answerEl = document.getElementById('tileAnswer');

  const joiner = multi ? ' ' : '';
  const finish = isCorrect => {
    session.currentPrompt = null;
    document.querySelectorAll('.build-tile').forEach(t => (t.disabled = true));
    courseGrade(session, card, isCorrect);
    speakWord(card.back, lang);
    document.getElementById('mc-fb').innerHTML = `
      ${courseFeedbackHtml(isCorrect, card, '', expected)}
      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
      </div>
    `;
    document.getElementById('courseNext').addEventListener('click', showCourseStep);
  };

  pool.addEventListener('click', e => {
    const tile = e.target.closest('.build-tile');
    if (!tile || tile.disabled) return;
    tile.disabled = true;
    tile.classList.add('build-tile--used');
    placed.push(Number(tile.dataset.i));
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = tile.className.replace('build-tile--used', '').trim() + ' build-tile--placed';
    chip.dataset.i = tile.dataset.i;
    chip.textContent = letters[Number(tile.dataset.i)];
    answerEl.appendChild(chip);
    // Voll? Dann sofort prüfen — ein extra Knopf wäre nur ein Klick mehr.
    if (placed.length === letters.length) {
      finish(placed.map(i => letters[i]).join(joiner) === (multi ? expected.trim().split(/\s+/).join(' ') : expected));
    }
  });
  answerEl.addEventListener('click', e => {
    const chip = e.target.closest('.build-tile--placed');
    if (!chip || !session.currentPrompt) return;
    const i = Number(chip.dataset.i);
    placed.splice(placed.indexOf(i), 1);
    chip.remove();
    const orig = pool.querySelector(`.build-tile[data-i="${i}"]`);
    if (orig) { orig.disabled = false; orig.classList.remove('build-tile--used'); }
  });
}

// Phase „Auffrischung": fällige Karten aus früheren Lektionen als kurze
// Multiple-Choice-Runde. Falsch beantwortete kommen sofort wieder dran.
export function renderCourseReview(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const options = buildMCOptions(card, session.knownCards);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card">
      ${courseBadge(`<i class="fas fa-clock-rotate-left"></i> Auffrischung — noch ${session.queue.length}`)}
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word mc-question">${escHtml(promptText(session, card))} ${promptAudioBtn(session)}</div>
      <p class="prompt">Kennst du das noch?</p>
      ${mcOptionsMarkup(options, { textOf: o => answerText(session, o) })}
    </div>
  `;

  wirePromptAudio(session, card);
  if (isReverse(session.deck)) speakWord(card.back, lang);
  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      if (isCorrect) speakWord(card.back, lang);
      courseGrade(session, card, isCorrect);
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, '', answerText(session, card))}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Übungs-Variante „Vergleich": Stimmt diese Übersetzung? (Passt / Passt nicht)
export function renderCourseCompare(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const alts = session.knownCards.filter(c => c.back !== card.back && c.front !== card.front);
  const isMatch = alts.length === 0 || Math.random() < 0.5;
  const other = isMatch ? card : alts[Math.floor(Math.random() * alts.length)];
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card">
      ${courseBadge(`<i class="fas fa-scale-balanced"></i> Wörter üben — noch ${session.queue.length}`)}
      <p class="prompt">Stimmt diese Übersetzung?</p>
      <div class="comparison-card">
        <span class="word word-source">${escHtml(promptText(session, card))}</span>
        <i class="fas fa-arrow-right"></i>
        <span class="word word-target">
          ${escHtml(answerText(session, other))}
          <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören"><i class="fas fa-volume-up"></i></button>
        </span>
      </div>
      <div class="actions">
        <button type="button" class="btn btn-primary" id="courseCompYes"><i class="fas fa-check"></i> Passt</button>
        <button type="button" class="btn btn-secondary" id="courseCompNo"><i class="fas fa-times"></i> Passt nicht</button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { card, isMatch };
  setCurrentSession(session);
  document.getElementById('audioBtn').addEventListener('click', () => speakWord(card.back, lang));

  const answer = says => {
    const isCorrect = says === isMatch;
    document.getElementById('courseCompYes').disabled = true;
    document.getElementById('courseCompNo').disabled = true;
    session.currentPrompt = null;
    courseGrade(session, card, isCorrect);
    if (isCorrect) speakWord(card.back, lang);
    document.getElementById('mc-fb').innerHTML = `
      ${courseFeedbackHtml(isCorrect, card, `<p class="listen-reveal">${escHtml(promptText(session, card))} → <b>${escHtml(answerText(session, card))}</b></p>`, answerText(session, card))}
      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
      </div>
    `;
    document.getElementById('courseNext').addEventListener('click', showCourseStep);
  };
  document.getElementById('courseCompYes').addEventListener('click', () => answer(true));
  document.getElementById('courseCompNo').addEventListener('click', () => answer(false));
}

// Phase 5: SCHREIBEN — ein paar Wörter der Lektion selbst tippen
// (tolerant wie der frühere Tippen-Modus).
export function renderCourseWrite(session) {
  // Immer Bausteine, nie Tastatur — siehe renderCourseWordTiles.
  renderCourseWordTiles(session);
}
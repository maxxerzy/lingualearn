import { setCurrentSession } from '../../state.js';
import { updateProgress } from '../../progress.js';
import { shuffleArray } from '../../../utils/helpers.js';
import { recordGameAnswer } from '../../gamification.js';
import { renderGamiHeader, renderLearnWidgets } from '../../../ui/gami.js';
import { playCorrect, playWrong } from '../../../utils/feedback.js';
import { findGapSentence, joinSentence, splitSentence } from '../../../utils/sentence.js';
import {
  announceUnlocks, buildMCOptions, courseBadge, escHtml, exampleLine, getLangName, isReverse,
  markMcAnswer, mcOptionsMarkup, speakWord, wireExampleAudio
} from '../shared.js';
import { courseGrade, courseFeedbackHtml } from './shared.js';
import { showCourseStep } from './lesson.js';

export function renderCourseDialog(session) {
  const phrase = session.queue[0];
  const lang = session.deck.language;
  // Distraktoren: Antworten ANDERER Wendungen derselben Sprache.
  const others = shuffleArray((session.phrasePool || [])
    .filter(p => p.reply && p.reply !== phrase.reply)).slice(0, 2);
  const options = shuffleArray([phrase, ...others]);
  const correctIdx = options.indexOf(phrase);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card talk-card">
      ${courseBadge(`<i class="fas fa-comments"></i> Dialog — noch ${session.queue.length}`)}
      <div class="talk-bubble talk-bubble--other">
        <span class="talk-bubble__text">${escHtml(phrase.target)}</span>
        <button type="button" class="audio-btn" id="dialogSay" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </div>
      <p class="talk-reply-de">${escHtml(phrase.de)}</p>
      <p class="prompt">Was antwortest du?</p>
      <div class="mc-options" role="group" aria-label="Antwortmöglichkeiten">
        ${options.map((opt, i) => `
          <button type="button" class="btn mc-option" data-idx="${i}" aria-keyshortcuts="${i + 1} ${'abc'[i]}">
            <span class="mc-key" aria-hidden="true">${'ABC'[i]}</span>
            <span class="mc-text">${escHtml(opt.reply)}${opt.replyDe ? `<span class="dialog-reply-de">${escHtml(opt.replyDe)}</span>` : ''}</span>
          </button>`).join('')}
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { correctIdx };
  setCurrentSession(session);
  const say = () => speakWord(phrase.target, lang);
  say();
  document.getElementById('dialogSay').addEventListener('click', say);

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.idx);
      const isCorrect = idx === correctIdx;
      learnArea.querySelectorAll('.mc-option').forEach((b, i) => {
        b.disabled = true;
        if (i === correctIdx) b.classList.add('mc-correct');
        else if (i === idx && !isCorrect) b.classList.add('mc-wrong');
      });
      if (isCorrect) { playCorrect(); speakWord(phrase.reply, lang); } else playWrong();
      session.currentPrompt = null;
      dialogGrade(session, isCorrect);
      document.getElementById('mc-fb').innerHTML = `
        ${isCorrect
          ? '<div class="correct" style="margin-top:14px"><p>✅ Genau so antwortet man!</p></div>'
          : `<div class="incorrect" style="margin-top:14px"><p>❌ Passt nicht — die Antwort wäre: <b>${escHtml(phrase.reply)}</b>${phrase.replyDe ? ` („${escHtml(phrase.replyDe)}")` : ''}</p><p style="color:var(--gray);font-size:.85rem">Kommt gleich nochmal.</p></div>`}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Dialog-Wertung: wie die Kurs-Wertung, aber ohne SRS-Eintrag — die
// Wendungen sind keine Vokabelkarten des Decks.
function dialogGrade(session, isCorrect) {
  session.gradedAnswers++;
  if (isCorrect) {
    session.queue.shift();
    session.currentIndex++;
    session.correctAnswers++;
  } else {
    session.queue.push(session.queue.shift());
  }
  const { gained } = recordGameAnswer(isCorrect, { boost: !!session.boosted });
  session.xpFromAnswers = (session.xpFromAnswers || 0) + gained;
  setCurrentSession(session);
  renderGamiHeader();
  renderLearnWidgets();
  announceUnlocks();
  updateProgress();
}

// Satz-Variante „Satzbau": den Beispielsatz aus Kacheln zusammensetzen
// (bei Latein: die deutsche Übersetzung zur lateinischen Vorlage).
export function renderCourseBuild(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const rev = isReverse(session.deck);
  // Chinesisch/Japanisch werden zeichenweise sortiert (keine Leerzeichen).
  const splitLang = rev ? 'de' : lang;
  const tokens = splitSentence(rev ? card.exampleDE : card.example, splitLang);
  const order = shuffleArray(tokens.map((_, i) => i));
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card build-card">
      ${courseBadge(`<i class="fas fa-comment-dots"></i> Sätze üben — noch ${session.queue.length}`)}
      <p class="build-src">„${escHtml(rev ? card.example : card.exampleDE)}"</p>
      <p class="prompt">${rev ? 'Setze die deutsche Übersetzung zusammen:' : 'Setze den Satz zusammen:'}</p>
      <div class="build-answer" id="courseBuildAnswer" aria-label="Deine Antwort"></div>
      <div class="build-pool" id="courseBuildPool">
        ${order.map(i => `<button type="button" class="build-tile" data-i="${i}">${escHtml(tokens[i])}</button>`).join('')}
      </div>
      <div class="actions">
        <button type="button" class="btn btn-primary" id="courseBuildCheck" disabled>Prüfen</button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  const placed = [];
  session.currentPrompt = { card, tokens };
  setCurrentSession(session);
  const pool = document.getElementById('courseBuildPool');
  const answerEl = document.getElementById('courseBuildAnswer');
  const checkBtn = document.getElementById('courseBuildCheck');

  pool.addEventListener('click', e => {
    const tile = e.target.closest('.build-tile');
    if (!tile || tile.disabled) return;
    tile.disabled = true;
    tile.classList.add('build-tile--used');
    placed.push(Number(tile.dataset.i));
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'build-tile build-tile--placed';
    chip.dataset.i = tile.dataset.i;
    chip.textContent = tokens[Number(tile.dataset.i)];
    answerEl.appendChild(chip);
    checkBtn.disabled = placed.length !== tokens.length;
  });
  answerEl.addEventListener('click', e => {
    const chip = e.target.closest('.build-tile--placed');
    if (!chip) return;
    const i = Number(chip.dataset.i);
    placed.splice(placed.indexOf(i), 1);
    chip.remove();
    const orig = pool.querySelector(`.build-tile[data-i="${i}"]`);
    if (orig) { orig.disabled = false; orig.classList.remove('build-tile--used'); }
    checkBtn.disabled = placed.length !== tokens.length;
  });

  checkBtn.addEventListener('click', () => {
    const built = joinSentence(placed.map(i => tokens[i]), splitLang);
    const isCorrect = built === joinSentence(tokens, splitLang);
    checkBtn.disabled = true;
    document.querySelectorAll('.build-tile').forEach(t => (t.disabled = true));
    session.currentPrompt = null;
    courseGrade(session, card, isCorrect);
    if (isCorrect) speakWord(card.example, lang);
    document.getElementById('mc-fb').innerHTML = `
      ${isCorrect
        ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
        : `<div class="incorrect" style="margin-top:14px"><p>❌ Nicht ganz — richtig wäre:</p><p style="margin-top:6px"><b>${escHtml(rev ? card.exampleDE : card.example)}</b></p><p style="color:var(--gray);font-size:.85rem">Kommt gleich nochmal.</p></div>`}
      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
      </div>
    `;
    document.getElementById('courseNext').addEventListener('click', showCourseStep);
  });
}

// Satz-Variante „Bedeutung": Satz lesen/hören → deutsche Bedeutung wählen.
export function renderCourseMeaning(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const alts = shuffleArray(session.knownCards.filter(c => c.exampleDE && c.exampleDE !== card.exampleDE)).slice(0, 3);
  const options = shuffleArray([
    { text: card.exampleDE, correct: true },
    ...alts.map(c => ({ text: c.exampleDE, correct: false })),
  ]);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card story-card">
      ${courseBadge(`<i class="fas fa-comment-dots"></i> Sätze üben — noch ${session.queue.length}`)}
      <p class="story-sent">
        ${escHtml(card.example)}
        <button type="button" class="audio-btn" id="storyAudio" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </p>
      <p class="prompt">Was bedeutet dieser Satz?</p>
      <div class="mc-options">
        ${options.map((o, i) => `
          <button type="button" class="mc-option" data-idx="${i}">
            <span class="mc-key">${String.fromCharCode(65 + i)}</span>
            <span class="mc-text">${escHtml(o.text)}</span>
          </button>`).join('')}
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { card, options };
  setCurrentSession(session);
  speakWord(card.example, lang);
  document.getElementById('storyAudio').addEventListener('click', () => speakWord(card.example, lang));

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.idx);
      const correctIdx = options.findIndex(o => o.correct);
      const isCorrect = idx === correctIdx;
      document.querySelectorAll('.mc-option').forEach((b, i) => {
        b.disabled = true;
        if (i === correctIdx) b.classList.add('mc-correct');
        else if (i === idx) b.classList.add('mc-wrong');
      });
      session.currentPrompt = null;
      courseGrade(session, card, isCorrect);
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, '', card.exampleDE)}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Feedback-Text für die Kurs-Übungen (richtig / falsch mit Lösung).
// Phase 3: Sätze üben (Lückentext-Multiple-Choice).
export function renderCourseGapFill(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  // Distraktoren nur aus bereits gelernten Wörtern.
  const options = buildMCOptions(card, session.knownCards);
  const learnArea = document.getElementById('learnArea');

  // Sätze in der Warteschlange sind garantiert lückenfähig (Vorauswahl).
  const gapped = findGapSentence(card.example, card.back, lang);

  const question =
    `<p class="fc-label">${getLangName(lang)}</p>
       <div class="gap-sentence">${escHtml(gapped)}</div>
       <p class="prompt">Welches Wort gehört in die Lücke?</p>`;

  learnArea.innerHTML = `
    <div class="mc-card">
      ${courseBadge(`<i class="fas fa-comment-dots"></i> Sätze üben — noch ${session.queue.length}`)}
      ${question}
      ${mcOptionsMarkup(options)}
    </div>
  `;

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      if (isCorrect) speakWord(card.example || card.back, lang);

      courseGrade(session, card, isCorrect);

      const extra = `
        <p class="fc-example" style="margin-top:10px">${card.example ? exampleLine(card.example) : ''}</p>
        ${card.exampleDE ? `<p class="fc-example-de">${escHtml(card.exampleDE)}</p>` : ''}`;
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, extra)}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      wireExampleAudio(lang);
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

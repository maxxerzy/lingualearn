import { setCurrentSession } from '../../state.js';
import { updateProgress } from '../../progress.js';
import { latinPron } from '../../../utils/speech.js';
import {
  answerLabel, answerText, buildMCOptions, cognateChip, courseBadge, escHtml, exampleLine,
  isReverse, markMcAnswer, mcOptionsMarkup, promptLabel, promptText, speakWord, wireExampleAudio
} from '../shared.js';
import { courseGrade, courseFeedbackHtml } from './shared.js';
import { showCourseStep } from './lesson.js';
import { hasStrokeLang, openStrokeOrder } from '../../../ui/strokeOrder.js';

export function renderCourseTeach(session) {
  const chunk = session.chunks[session.chunkIdx];
  const card = chunk[session.teachPos];
  let wordsBefore = 0;
  for (let k = 0; k < session.chunkIdx; k++) wordsBefore += session.chunks[k].length;
  const wordNum = wordsBefore + session.teachPos + 1;
  const lang = session.deck.language;
  const learnArea = document.getElementById('learnArea');

  const ipaParts = [];
  if (card.ipa)   ipaParts.push(`<span class="course-ipa">/${escHtml(card.ipa)}/</span>`);
  if (card.roman) ipaParts.push(`<span class="course-roman">${escHtml(card.roman)}</span>`);
  if (lang === 'la') ipaParts.push(`<span class="course-roman">gesprochen: „${escHtml(latinPron(card.back))}"</span>`);

  // Bei Latein steht das lateinische Wort oben (Abfragerichtung La→De).
  const audioBtnHtml = `
        <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören">
          <i class="fas fa-volume-up"></i>
        </button>`;
  learnArea.innerHTML = `
    <div class="course-teach">
      ${courseBadge(`<i class="fas fa-lightbulb"></i> Neues Wort ${wordNum}/${session.lessonCards.length}`)}
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word fc-word-source">${escHtml(promptText(session, card))}${isReverse(session.deck) ? audioBtnHtml : ''}</div>
      <div class="fc-arrow"><i class="fas fa-arrow-down"></i></div>
      <p class="fc-label">${answerLabel(session)}</p>
      <div class="fc-word fc-word-target">
        ${escHtml(answerText(session, card))}${isReverse(session.deck) ? '' : audioBtnHtml}
      </div>
      ${ipaParts.length ? `<div class="course-pron">${ipaParts.join(' · ')}</div>` : ''}
      ${cognateChip(card)}
      ${hasStrokeLang(lang) ? `
        <button type="button" class="btn btn-secondary stroke-order-btn" id="strokeOrderBtn">
          <i class="fas fa-pen-fancy"></i> Strichfolge
        </button>
      ` : ''}
      ${card.example ? `
        <div class="fc-example-block">
          <p class="fc-example">${exampleLine(card.example)}</p>
          ${card.exampleDE ? `<p class="fc-example-de">${escHtml(card.exampleDE)}</p>` : ''}
        </div>
      ` : ''}
      <div class="actions" style="margin-top:18px">
        <button type="button" class="btn btn-primary" id="courseNext">
          Weiter <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;

  speakWord(card.back, lang);
  document.getElementById('audioBtn').addEventListener('click', () => speakWord(card.back, lang));
  wireExampleAudio(lang);
  if (hasStrokeLang(lang)) {
    document.getElementById('strokeOrderBtn').addEventListener('click', () => openStrokeOrder(lang, card.back));
  }
  document.getElementById('courseNext').addEventListener('click', () => {
    session.teachPos++;
    session.currentIndex++;
    setCurrentSession(session);
    updateProgress();
    showCourseStep();
  });
}

// Phase 2 (je Häppchen): HÖREN — das gehörte Wort seiner deutschen
// Bedeutung zuordnen. Autoplay + Wiederholen auf Knopfdruck.
export function renderCourseListen(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const options = buildMCOptions(card, session.knownCards);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card listen-card">
      ${courseBadge(`<i class="fas fa-headphones"></i> Hören — noch ${session.queue.length}`)}
      <button type="button" class="listen-play" id="listenPlay" title="Nochmal abspielen">
        <i class="fas fa-volume-up"></i>
      </button>
      <p class="prompt">Was bedeutet das gehörte Wort?</p>
      ${mcOptionsMarkup(options, { textOf: o => o.front })}
    </div>
  `;

  speakWord(card.back, lang);
  document.getElementById('listenPlay').addEventListener('click', () => speakWord(card.back, lang));

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      courseGrade(session, card, isCorrect);
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, `<p class="listen-reveal">${escHtml(card.back)} — <b>${escHtml(card.front)}</b></p>`, card.front)}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}
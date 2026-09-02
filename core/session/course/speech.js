import { getCurrentSession, setCurrentSession } from '../../state.js';
import { updateProgress } from '../../progress.js';
import { shuffleArray } from '../../../utils/helpers.js';
import { recordGameAnswer } from '../../gamification.js';
import { renderGamiHeader, renderLearnWidgets } from '../../../ui/gami.js';
import { playCorrect, playWrong } from '../../../utils/feedback.js';
import { comparePronunciation, mismatchHint } from '../../../utils/pronounce.js';
import { findGapSentence } from '../../../utils/sentence.js';
import { latinPron, speak } from '../../../utils/speech.js';
import {
  announceUnlocks, buildMCOptions, courseBadge, escHtml, getLangCode, markMcAnswer,
  mcOptionsMarkup, speakWord, timers
} from '../shared.js';
import { courseGrade, courseFeedbackHtml } from './shared.js';
import { showCourseStep } from './lesson.js';

const TYPO_MAP = { 'æ': 'ae', 'ø': 'o', 'å': 'a', 'ß': 'ss', 'œ': 'oe', 'ð': 'd', 'þ': 'th' };
function normAnswer(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[.,!?;:„“”"'’«»()¿¡]/g, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[æøåßœðþ]/g, ch => TYPO_MAP[ch] || ch)
    .replace(/\s+/g, ' ')
    .trim();
}

// Spracherkennung (Sprechen-Schritt im Kurs). Wo sie fehlt (z. B. iOS),
// weicht der Kurs auf Referenz-Audio + Selbsteinschätzung aus.
function speechRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

// Phase 4: SPRECHEN — jedes neue Wort einmal laut aussprechen. Mit
// Web-Speech-Erkennung, wo verfügbar; sonst Referenz-Audio + ehrliche
// Selbsteinschätzung (z. B. auf iOS).
function canRecordAudio() {
  return typeof MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
}

// Baustein-Anzeige des Vergleichs: abweichende Stellen sind markiert.
function pronPartsHtml(parts, charLevel) {
  return parts.map(p =>
    `<span class="pron-part${p.ok ? '' : ' pron-part--bad'}">${escHtml(p.text)}</span>`)
    .join(charLevel ? '' : ' ');
}

function pronCompareHtml(result) {
  return `
    <div class="pron-compare">
      <div class="pron-row">
        <span class="pron-label">Ziel</span>
        <span class="pron-text">${pronPartsHtml(result.target, result.charLevel)}</span>
      </div>
      <div class="pron-row">
        <span class="pron-label">Gehört</span>
        <span class="pron-text">${result.heard.length
          ? pronPartsHtml(result.heard, result.charLevel)
          : '<i>nichts verstanden</i>'}</span>
      </div>
      ${mismatchHint(result) ? `<p class="pron-hint">${escHtml(mismatchHint(result))}</p>` : ''}
    </div>`;
}

// Sprechen-Schritt.
//
// Drei Ausbaustufen, je nachdem was das Gerät kann:
//   'listen'  — Spracherkennung da: Wort-für-Wort-Abgleich, die
//               abweichende Stelle wird markiert.
//   'compare' — keine Erkennung (iOS Safari), aber Mikrofon: eigene
//               Aufnahme gegen die Referenzstimme, komplett auf dem
//               Gerät, nichts verlässt das Telefon.
//   'self'    — weder noch: Referenz hören und selbst einschätzen.
export function renderCourseSpeak(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const SR = speechRecognitionCtor();
  const mode = SR ? 'listen' : (canRecordAudio() ? 'compare' : 'self');
  const spoken = lang === 'la' ? latinPron(card.back) : card.back;
  const pron = [];
  if (card.roman) pron.push(escHtml(card.roman));
  if (card.ipa) pron.push('/' + escHtml(card.ipa) + '/');
  if (lang === 'la') pron.push(`gesprochen: „${escHtml(latinPron(card.back))}“`);
  const learnArea = document.getElementById('learnArea');

  const intro = mode === 'listen' ? ' — ich höre zu und zeige dir, wo es abwich'
    : mode === 'compare' ? ' — nimm dich auf und vergleiche' : ':';

  learnArea.innerHTML = `
    <div class="mc-card speak-card" data-speak-mode="${mode}">
      ${courseBadge(`<i class="fas fa-microphone"></i> Sprechen — noch ${session.queue.length}`)}
      <div class="fc-word fc-word-target">
        ${escHtml(card.back)}
        <button type="button" class="audio-btn" id="speakListen" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </div>
      <p class="fc-example-de" style="margin:2px 0 6px">${escHtml(card.front)}</p>
      ${pron.length ? `<p class="course-pron">${pron.join(' · ')}</p>` : ''}
      <p class="prompt">Hör zu und sprich das Wort laut nach${intro}</p>
      ${mode === 'listen' ? `<div class="actions">
        <button type="button" class="btn btn-primary" id="courseSpeakRec"><i class="fas fa-microphone"></i> Aufnehmen</button>
      </div>` : ''}
      ${mode === 'compare' ? `<div class="actions">
        <button type="button" class="btn btn-primary" id="courseSpeakRec"><i class="fas fa-microphone"></i> Aufnehmen</button>
      </div>
      <div class="pron-play" id="pronPlay" hidden>
        <button type="button" class="btn" id="pronPlayMine"><i class="fas fa-user"></i> Meine Aufnahme</button>
        <button type="button" class="btn" id="pronPlayRef"><i class="fas fa-volume-up"></i> Original</button>
      </div>` : ''}
      <div class="actions" style="margin-top:8px">
        <button type="button" class="btn ${mode === 'listen' ? '' : 'btn-good'}" id="courseSpeakOk"><i class="fas fa-check"></i> ${mode === 'compare' ? 'Klang gleich' : 'Hat geklappt'}</button>
        <button type="button" class="btn" id="courseSpeakRetry"><i class="fas fa-rotate-left"></i> Nochmal üben</button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  speakWord(card.back, lang);
  document.getElementById('speakListen').addEventListener('click', () => speakWord(card.back, lang));

  // Genau EIN Abschluss pro Karte — egal ob per Knopf oder Erkennung.
  // Ohne diesen Riegel könnte ein Klick während des Auto-Weiter-Fensters
  // dieselbe Karte doppelt werten und die nächste ungeübt überspringen.
  let settled = false;
  let activeRec = null;
  let mediaRec = null;
  let mineUrl = null;
  let micStream = null;
  const releaseMic = () => {
    try { micStream?.getTracks().forEach(t => t.stop()); } catch { /* schon zu */ }
    micStream = null;
  };
  const finish = ok => {
    if (settled) return;
    settled = true;
    if (timers.quiz) { clearTimeout(timers.quiz); timers.quiz = null; }
    try { activeRec?.abort(); } catch { /* Erkennung lief nicht mehr */ }
    try { mediaRec?.state === 'recording' && mediaRec.stop(); } catch { /* Aufnahme lief nicht */ }
    releaseMic();
    if (mineUrl) { URL.revokeObjectURL(mineUrl); mineUrl = null; }
    const st = getCurrentSession();
    if (!st || st.mode !== 'course' || st.phase !== 'speak') return;
    courseGrade(session, card, ok);
    showCourseStep();
  };
  document.getElementById('courseSpeakOk').addEventListener('click', () => finish(true));
  document.getElementById('courseSpeakRetry').addEventListener('click', () => finish(false));

  // ── Vergleichs-Modus: eigene Aufnahme gegen die Referenzstimme ──
  function wireCompare() {
    const btn = document.getElementById('courseSpeakRec');
    const row = document.getElementById('pronPlay');
    if (!btn || !row) return;
    btn.addEventListener('click', async () => {
      if (settled) return;
      if (mediaRec?.state === 'recording') { mediaRec.stop(); return; }
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        const fb = document.getElementById('mc-fb');
        if (fb) fb.innerHTML = '<div class="incorrect" style="margin-top:10px"><p>🎤 Kein Zugriff aufs Mikrofon — hör dir das Original an und schätze selbst ein.</p></div>';
        btn.disabled = true;
        return;
      }
      micStream = stream;
      const chunks = [];
      mediaRec = new MediaRecorder(stream);
      mediaRec.ondataavailable = e => { if (e.data?.size) chunks.push(e.data); };
      mediaRec.onstop = () => {
        releaseMic();
        btn.innerHTML = '<i class="fas fa-microphone"></i> Nochmal aufnehmen';
        if (!chunks.length) return;
        if (mineUrl) URL.revokeObjectURL(mineUrl);
        mineUrl = URL.createObjectURL(new Blob(chunks, { type: mediaRec.mimeType || 'audio/webm' }));
        row.hidden = false;
        const fb = document.getElementById('mc-fb');
        if (fb) fb.innerHTML = '<div class="pron-compare"><p class="pron-hint">Hör beides nacheinander an: klingt deins wie das Original?</p></div>';
      };
      btn.innerHTML = '<i class="fas fa-stop"></i> Aufnahme stoppen';
      mediaRec.start();
      // Kurz und schmerzlos — ein Wort braucht keine Minute.
      timers.quiz = setTimeout(() => {
        timers.quiz = null;
        try { mediaRec?.state === 'recording' && mediaRec.stop(); } catch { /* schon gestoppt */ }
      }, 4000);
    });
    document.getElementById('pronPlayMine')?.addEventListener('click', () => {
      if (!mineUrl) return;
      const a = new Audio(mineUrl);
      a.play().catch(() => { /* Autoplay-Sperre */ });
    });
    document.getElementById('pronPlayRef')?.addEventListener('click', () => speakWord(card.back, lang));
  }

  // Erkennung fällt aus (iOS, kein Netz, keine Erlaubnis) → auf den
  // Vergleichs-Modus umschalten statt den Nutzer ohne Rückmeldung zu lassen.
  function fallbackToCompare(reason) {
    if (settled || !canRecordAudio()) return false;
    const card_ = document.querySelector('.speak-card');
    const rec = document.getElementById('courseSpeakRec');
    if (!card_ || !rec) return false;
    card_.dataset.speakMode = 'compare';
    rec.disabled = false;
    rec.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen';
    if (!document.getElementById('pronPlay')) {
      rec.parentElement.insertAdjacentHTML('afterend', `
        <div class="pron-play" id="pronPlay" hidden>
          <button type="button" class="btn" id="pronPlayMine"><i class="fas fa-user"></i> Meine Aufnahme</button>
          <button type="button" class="btn" id="pronPlayRef"><i class="fas fa-volume-up"></i> Original</button>
        </div>`);
    }
    const ok = document.getElementById('courseSpeakOk');
    if (ok) ok.innerHTML = '<i class="fas fa-check"></i> Klang gleich';
    const fb = document.getElementById('mc-fb');
    if (fb) fb.innerHTML = `<div class="incorrect" style="margin-top:10px"><p>🎤 ${escHtml(reason)} — nimm dich stattdessen auf und vergleiche mit dem Original.</p></div>`;
    // Die Erkennungs-Klicks am alten Knopf sind mit ihm verschwunden,
    // deshalb neu verdrahten.
    const fresh = rec.cloneNode(true);
    rec.replaceWith(fresh);
    wireCompare();
    return true;
  }

  if (mode === 'compare') wireCompare();

  if (mode === 'listen') {
    document.getElementById('courseSpeakRec').addEventListener('click', () => {
      if (settled) return;
      const btn = document.getElementById('courseSpeakRec');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-microphone-lines"></i> Ich höre …';
      let done = false;
      const rec = new SR();
      activeRec = rec;
      rec.lang = lang === 'la' ? 'de-DE' : getLangCode(lang);
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      const finishRec = (result) => {
        if (done || settled) return;
        done = true;
        const fb = document.getElementById('mc-fb');
        const perfect = result.target.every(p => p.ok);
        if (fb) {
          // Knapp bestanden ist nicht dasselbe wie sauber getroffen —
          // sonst stünde „Klang gut" über einer rot markierten Stelle.
          const head = result.ok
            ? (perfect ? '✅ Klang gut!' : '✅ Reicht — eine Stelle war aber daneben:')
            : '🎤 Fast — schau, wo es abwich:';
          fb.innerHTML = `
            <div class="${result.ok ? 'correct' : 'incorrect'}" style="margin-top:10px">
              <p>${head}</p>
            </div>
            ${perfect && result.ok ? '' : pronCompareHtml(result)}`;
        }
        const pause = result.ok ? (perfect ? 900 : 2000) : 2600;
        timers.quiz = setTimeout(() => { timers.quiz = null; finish(result.ok); }, pause);
      };
      rec.onresult = e => {
        const alts = [...(e.results[0] || [])].map(a => a.transcript || '');
        // Beste Alternative gewinnt — die Erkennung liefert oft mehrere.
        let best = comparePronunciation(spoken, alts[0] || '', lang);
        for (const alt of alts.slice(1)) {
          const cand = comparePronunciation(spoken, alt, lang);
          if (cand.score > best.score) best = cand;
        }
        finishRec(best);
      };
      rec.onerror = e => {
        if (done) return;
        done = true;
        const why = e?.error === 'not-allowed' || e?.error === 'service-not-allowed'
          ? 'Die Erkennung darf nicht zuhören'
          : 'Die Erkennung ist hier nicht verfügbar';
        if (!fallbackToCompare(why)) {
          btn.disabled = false;
          btn.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen';
        }
      };
      rec.onend = () => { if (!done) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen'; } };
      try { rec.start(); } catch { if (!done) { done = true; if (!fallbackToCompare('Die Erkennung ließ sich nicht starten')) btn.disabled = false; } }
    });
  }
}

// Gemeinsame Auswertung für beide Übungsphasen.
// Richtig → Karte fertig (Schritt zählt), falsch → hinten wieder einreihen.
// Phase „Konversation": eine echte Alltagswendung hören, verstehen und
// laut nachsprechen — inklusive typischer Antwort des Gegenübers, damit
// man den Baustein sofort in einem Mini-Dialog erlebt.
export function renderCourseTalk(session) {
  const phrase = session.queue[0];
  const lang = session.deck.language;
  const SR = speechRecognitionCtor();
  const learnArea = document.getElementById('learnArea');

  const pron = [];
  if (phrase.roman) pron.push(escHtml(phrase.roman));
  if (lang === 'la') pron.push(`gesprochen: „${escHtml(latinPron(phrase.target))}"`);

  learnArea.innerHTML = `
    <div class="mc-card talk-card">
      ${courseBadge(`<i class="fas fa-comments"></i> Konversation — noch ${session.queue.length}`)}
      <p class="fc-label">${escHtml(phrase.de)}</p>
      <div class="talk-bubble talk-bubble--you">
        <span class="talk-bubble__text">${escHtml(phrase.target)}</span>
        <button type="button" class="audio-btn" id="talkSay" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </div>
      ${pron.length ? `<p class="course-pron">${pron.join(' · ')}</p>` : ''}
      ${phrase.reply ? `
        <div class="talk-bubble talk-bubble--other">
          <span class="talk-bubble__text">${escHtml(phrase.reply)}</span>
          <button type="button" class="audio-btn" id="talkReply" title="Antwort anhören"><i class="fas fa-volume-up"></i></button>
        </div>
        <p class="talk-reply-de">${escHtml(phrase.replyDe || '')}</p>` : ''}
      ${phrase.hint ? `<p class="talk-hint"><i class="fas fa-lightbulb"></i> ${escHtml(phrase.hint)}</p>` : ''}
      <p class="prompt">Sprich die Wendung laut nach${SR ? ' — ich höre zu' : ''}:</p>
      ${SR ? `<div class="actions">
        <button type="button" class="btn btn-primary" id="talkRec"><i class="fas fa-microphone"></i> Aufnehmen</button>
      </div>` : ''}
      <div class="actions" style="margin-top:8px">
        <button type="button" class="btn ${SR ? '' : 'btn-good'}" id="talkOk"><i class="fas fa-check"></i> Hat geklappt</button>
        <button type="button" class="btn" id="talkAgain"><i class="fas fa-rotate-left"></i> Nochmal hören</button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  const sayPhrase = () => speakWord(phrase.target, lang);
  sayPhrase();
  document.getElementById('talkSay').addEventListener('click', sayPhrase);
  document.getElementById('talkReply')?.addEventListener('click', () => speakWord(phrase.reply, lang));
  document.getElementById('talkAgain').addEventListener('click', sayPhrase);

  // Genau ein Abschluss pro Baustein (wie in der Sprech-Runde).
  let settled = false;
  let activeRec = null;
  const finish = () => {
    if (settled) return;
    settled = true;
    if (timers.quiz) { clearTimeout(timers.quiz); timers.quiz = null; }
    try { activeRec?.abort(); } catch { /* lief nicht mehr */ }
    const st = getCurrentSession();
    if (!st || st.mode !== 'course' || st.phase !== 'talk') return;
    talkGrade(session);
    showCourseStep();
  };
  document.getElementById('talkOk').addEventListener('click', finish);

  if (SR) {
    document.getElementById('talkRec').addEventListener('click', () => {
      if (settled) return;
      const btn = document.getElementById('talkRec');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-microphone-lines"></i> Ich höre …';
      let done = false;
      const rec = new SR();
      activeRec = rec;
      rec.lang = lang === 'la' ? 'de-DE' : getLangCode(lang);
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      const settle = (ok, heard) => {
        if (done || settled) return;
        done = true;
        const fb = document.getElementById('mc-fb');
        if (fb) fb.innerHTML = ok
          ? `<div class="correct" style="margin-top:10px"><p>✅ Sehr gut${heard ? ` — gehört: „${escHtml(heard)}"` : ''}!</p></div>`
          : `<div class="incorrect" style="margin-top:10px"><p>🎤 ${heard ? `Gehört: „${escHtml(heard)}" — ` : ''}hör noch einmal hin und sprich nach.</p></div>`;
        if (ok) timers.quiz = setTimeout(() => { timers.quiz = null; finish(); }, 800);
        else { btn.disabled = false; btn.innerHTML = '<i class="fas fa-microphone"></i> Nochmal aufnehmen'; }
      };
      rec.onresult = e => {
        const alts = [...(e.results[0] || [])].map(a => a.transcript || '');
        const target = normAnswer(lang === 'la' ? latinPron(phrase.target) : (phrase.roman || phrase.target));
        const ok = alts.some(t => {
          const h = normAnswer(t);
          if (!h) return false;
          if (h === target || target.includes(h) || h.includes(target)) return true;
          // Teiltreffer: die Hälfte der Wörter genügt für ein „gut gemacht".
          const words = target.split(' ').filter(w => w.length > 2);
          const hit = words.filter(w => h.includes(w)).length;
          return words.length > 0 && hit >= Math.ceil(words.length / 2);
        });
        settle(ok, alts[0] || '');
      };
      rec.onerror = () => { if (!done) { done = true; btn.disabled = false; btn.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen'; } };
      rec.onend = () => { if (!done) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-microphone"></i> Aufnehmen'; } };
      try { rec.start(); } catch { if (!done) { done = true; btn.disabled = false; } }
    });
  }
}

// Konversations-Bausteine sind keine Deck-Vokabeln — sie zählen für den
// Fortschritt und XP, aber nicht für den Karten-Lernstand (SRS).
// Phase „Satz hören": Verstehen scheitert im echten Gespräch selten am
// einzelnen Wort, sondern am Tempo eines ganzen Satzes. Zwei Varianten:
//   meaning — Satz nur HÖREN (kein Text!) und die Bedeutung wählen.
//   gap     — Satz hören, den Lückentext mitlesen, das fehlende Wort wählen.
export function renderCourseHearing(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  const learnArea = document.getElementById('learnArea');
  const badge = `<i class="fas fa-headphones"></i> Satz hören — noch ${session.queue.length}`;

  // Für die Bedeutungs-Variante braucht es zwei echte Alternativsätze.
  const alts = shuffleArray(session.knownCards.filter(c => c.exampleDE && c.exampleDE !== card.exampleDE)).slice(0, 2);
  const gapped = findGapSentence(card.example, card.back, lang);
  let variant = session.hearVariants?.[card.front] || 'meaning';
  if (variant === 'meaning' && alts.length < 2) variant = 'gap';
  if (variant === 'gap' && !gapped) variant = alts.length >= 2 ? 'meaning' : null;
  if (!variant) {                       // weder das eine noch das andere möglich
    session.queue.shift();
    setCurrentSession(session);
    showCourseStep();
    return;
  }

  const play = () => speakWord(card.example, lang);

  if (variant === 'meaning') {
    const options = shuffleArray([
      { text: card.exampleDE, correct: true },
      ...alts.map(c => ({ text: c.exampleDE, correct: false })),
    ]);
    const correctIdx = options.findIndex(o => o.correct);
    learnArea.innerHTML = `
      <div class="mc-card hear-card">
        ${courseBadge(badge)}
        <button type="button" class="listen-play" id="hearPlay" title="Nochmal anhören">
          <i class="fas fa-volume-up"></i>
        </button>
        <p class="prompt">Was bedeutet dieser Satz?</p>
        <div class="mc-options" role="group" aria-label="Antwortmöglichkeiten">
          ${options.map((o, i) => `
            <button type="button" class="mc-option" data-idx="${i}" aria-keyshortcuts="${i + 1} ${'abc'[i]}">
              <span class="mc-key" aria-hidden="true">${'ABC'[i]}</span>
              <span class="mc-text">${escHtml(o.text)}</span>
            </button>`).join('')}
        </div>
        <div id="mc-fb"></div>
      </div>
    `;
    session.currentPrompt = { card, variant, correctIdx };
    setCurrentSession(session);
    play();
    document.getElementById('hearPlay').addEventListener('click', play);

    learnArea.querySelectorAll('.mc-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.idx);
        const isCorrect = idx === correctIdx;
        learnArea.querySelectorAll('.mc-option').forEach((b, i) => {
          b.disabled = true;
          if (i === correctIdx) b.classList.add('mc-correct');
          else if (i === idx) b.classList.add('mc-wrong');
        });
        if (isCorrect) playCorrect(); else playWrong();
        session.currentPrompt = null;
        courseGrade(session, card, isCorrect);
        // Erst jetzt den Satz zeigen — vorher wäre es Lesen, nicht Hören.
        document.getElementById('mc-fb').innerHTML = `
          ${isCorrect
            ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig gehört!</p></div>'
            : '<div class="incorrect" style="margin-top:14px"><p>❌ Nicht ganz — hör noch mal hin.</p></div>'}
          <p class="hear-reveal">${escHtml(card.example)}</p>
          <div class="actions" style="margin-top:12px">
            <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
          </div>
        `;
        document.getElementById('courseNext').addEventListener('click', showCourseStep);
      });
    });
    return;
  }

  // Variante „gap": Lücke hören und lesen.
  const options = buildMCOptions(card, session.knownCards);
  learnArea.innerHTML = `
    <div class="mc-card hear-card">
      ${courseBadge(badge)}
      <button type="button" class="listen-play" id="hearPlay" title="Nochmal anhören">
        <i class="fas fa-volume-up"></i>
      </button>
      <div class="gap-sentence">${escHtml(gapped)}</div>
      <p class="prompt">Welches Wort hast du gehört?</p>
      ${mcOptionsMarkup(options, { textOf: o => o.back })}
    </div>
  `;
  session.currentPrompt = { card, variant, options };
  setCurrentSession(session);
  play();
  document.getElementById('hearPlay').addEventListener('click', play);

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      session.currentPrompt = null;
      courseGrade(session, card, isCorrect);
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, '', card.back)}
        <p class="hear-reveal">${escHtml(card.example)}</p>
        <div class="actions" style="margin-top:12px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Phase „Dialog": eine der eben gelernten Wendungen hören und die
// passende Antwort wählen — das ist der Moment, in dem aus Nachsprechen
// echte Konversation wird. Falsche Wahl → die Frage kommt nochmal.
function talkGrade(session) {
  session.queue.shift();
  session.currentIndex++;
  session.correctAnswers++;
  session.gradedAnswers++;
  const { gained } = recordGameAnswer(true, { boost: !!session.boosted });
  session.xpFromAnswers = (session.xpFromAnswers || 0) + gained;
  setCurrentSession(session);
  renderGamiHeader();
  renderLearnWidgets();
  announceUnlocks();
  updateProgress();
}
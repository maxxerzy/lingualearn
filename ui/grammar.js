import { loadDeck } from '../core/state.js';
import { loadGrammar, readChapters } from '../core/grammar.js';

// Grammatik-Übersicht: alle Kapitel der aktuellen Kurssprache zum
// Nachlesen — gelesene Kapitel sind markiert; der Lernkurs schiebt
// ungelesene Kapitel automatisch vor die passende Lektion.

let navigate = null;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function renderGrammarOverview() {
  const body = document.getElementById('grammarBody');
  if (!body) return;
  const deckId = document.getElementById('deckSelect')?.value;
  const deck = await loadDeck(deckId);
  if (!deck) { body.innerHTML = '<p class="dict-empty">Kein Deck gewählt.</p>'; return; }

  const chapters = await loadGrammar(deck.language);
  if (!chapters.length) {
    body.innerHTML = '<p class="dict-empty">Für dieses Deck gibt es (noch) keine Grammatik-Kapitel.</p>';
    return;
  }
  const read = new Set(readChapters(deckId));

  body.innerHTML = `
    <p class="dict-count">${deck.name} · ${chapters.length} Kapitel — ungelesene Kapitel erscheinen automatisch im Lernkurs</p>
    <ul class="grammar-chapters">
      ${chapters.map((ch, i) => `
        <li>
          <button type="button" class="grammar-chapter${read.has(ch.id) ? ' grammar-chapter--read' : ''}" data-ch="${i}">
            <span class="grammar-chapter__icon"><i class="fas ${ch.icon || 'fa-book-open'}"></i></span>
            <span class="grammar-chapter__main">
              <b>${esc(ch.title)}</b>
              <span>${ch.pages.length} Seiten · vor Lektion ${ch.beforeLesson}</span>
            </span>
            <span class="grammar-chapter__state">${read.has(ch.id) ? '<i class="fas fa-check"></i> gelesen' : '<i class="fas fa-book"></i> offen'}</span>
          </button>
        </li>`).join('')}
    </ul>
    <div id="grammarReader"></div>
  `;

  body.querySelectorAll('[data-ch]').forEach(btn =>
    btn.addEventListener('click', () => renderChapterReader(chapters[Number(btn.dataset.ch)])));
}

// Kapitel im Nachlese-Modus (alle Seiten untereinander, Ansicht scrollt).
function renderChapterReader(chapter) {
  const reader = document.getElementById('grammarReader');
  if (!reader) return;
  reader.innerHTML = `
    <div class="grammar-card grammar-card--reader">
      <h3 class="grammar-head"><i class="fas ${chapter.icon || 'fa-book-open'}"></i> ${esc(chapter.title)}</h3>
      ${chapter.pages.map(p => `
        <h4 class="grammar-subhead">${esc(p.heading)}</h4>
        <div class="grammar-body grammar-body--flow">${p.html}</div>`).join('')}
    </div>
  `;
  reader.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function initGrammar(activateView) {
  navigate = activateView;
  document.getElementById('grammarBackBtn')?.addEventListener('click', () => navigate?.('learn'));
  document.getElementById('grammarBtn')?.addEventListener('click', () => {
    navigate?.('grammar');
    renderGrammarOverview();
  });
}

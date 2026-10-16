import { getDecks, loadDeck } from '../core/state.js';
import { getCardStates, MAX_LEVEL } from '../core/cardProgress.js';
import { speak } from '../utils/speech.js';
import { escHtml as esc, todayStr } from '../utils/helpers.js';

// Wörterbuch: Schnelles, virtualisiertes Wörterbuch für bis zu 1.500+ Karten je Sprache.
// - Batch-Rendering (35 Wörter initial, Append on Scroll via IntersectionObserver)
// - 120 ms Debounced-Suche nach Zielwort, Übersetzung, Lautschrift (IPA) & Umschrift (Roman)
// - Filter-Tabs: Alle / Gelernt / Fällig / Gemeistert
// - Aussprache, Beispielsätze, Umschrift & phonetische Badges

const BATCH_SIZE = 35;
let activeFilter = 'all'; // 'all' | 'learned' | 'due' | 'mastered'
let searchQuery = '';
let currentDeckId = null;
let currentDeck = null;
let cachedCards = [];
let filteredCards = [];
let renderedCount = 0;
let sentinelObserver = null;
let debounceTimeout = null;

function strengthDots(level) {
  if (level === undefined || level === null) {
    return '<span class="dict-badge dict-badge--new">Neu</span>';
  }
  let dots = '';
  const bounded = Math.min(MAX_LEVEL, Math.max(0, level));
  for (let i = 1; i <= MAX_LEVEL; i++) {
    dots += `<span class="dict-dot ${i <= bounded ? 'dict-dot--on' : ''}"></span>`;
  }
  return dots;
}

function filterCardList(cards, states, filterMode, query, today) {
  let list = cards;

  // Filter nach Lernstatus
  if (filterMode === 'learned') {
    list = list.filter(c => states[c.front]);
  } else if (filterMode === 'due') {
    list = list.filter(c => {
      const st = states[c.front];
      return st && st.due && st.due <= today;
    });
  } else if (filterMode === 'mastered') {
    list = list.filter(c => {
      const st = states[c.front];
      return st && st.level >= MAX_LEVEL;
    });
  }

  // Filter nach Suchbegriff
  const q = query.trim().toLowerCase();
  if (q) {
    list = list.filter(c =>
      c._searchKey.includes(q)
    );
  }

  return list;
}

function createCardRow(c, rev, states) {
  const st = states[c.front];
  const target = rev ? c.front : c.back;
  const german = rev ? c.back : c.front;
  const levelTitle = st
    ? `Stufe ${Math.min(MAX_LEVEL, st.level)}/${MAX_LEVEL}${st.due ? ` · fällig: ${st.due}` : ''}`
    : 'Noch nicht gelernt';

  return `
    <li class="dict-row">
      <div class="dict-words">
        <div class="dict-primary">
          <b class="dict-target">${esc(target)}</b>
          ${c.ipa ? `<span class="dict-ipa" title="IPA-Lautschrift">[${esc(c.ipa)}]</span>` : ''}
          ${c.roman ? `<span class="dict-roman" title="Umschrift">${esc(c.roman)}</span>` : ''}
        </div>
        <div class="dict-back">${esc(german)}</div>
        ${c.example ? `
          <div class="dict-example" title="Beispielsatz">
            <span class="dict-ex-tgt">${esc(c.example)}</span>
            ${c.exampleDE ? `<span class="dict-ex-de"> · ${esc(c.exampleDE)}</span>` : ''}
          </div>` : ''}
      </div>
      <span class="dict-strength" title="${esc(levelTitle)}">${strengthDots(st?.level)}</span>
      <button type="button" class="audio-btn dict-audio" data-say="${esc(target)}" title="Aussprache anhören">
        <i class="fas fa-volume-up"></i>
      </button>
    </li>`;
}

function appendNextBatch() {
  const listEl = document.getElementById('dictList');
  const countEl = document.getElementById('dictCount');
  if (!listEl) return;

  const nextBatch = filteredCards.slice(renderedCount, renderedCount + BATCH_SIZE);
  if (!nextBatch.length) {
    disconnectSentinel();
    return;
  }

  const deck = currentDeck;
  const states = getCardStates(currentDeckId);
  const rev = deck?.language === 'la';

  const html = nextBatch.map(c => createCardRow(c, rev, states)).join('');
  listEl.insertAdjacentHTML('beforeend', html);
  renderedCount += nextBatch.length;

  if (countEl) {
    countEl.textContent = `${renderedCount} von ${filteredCards.length} ${filteredCards.length === 1 ? 'Wort' : 'Wörtern'} angezeigt · ${esc(deck?.name || '')}`;
  }

  if (renderedCount >= filteredCards.length) {
    disconnectSentinel();
  }
}

function setupSentinel() {
  disconnectSentinel();
  const sentinel = document.getElementById('dictSentinel');
  if (!sentinel || typeof IntersectionObserver === 'undefined') return;

  sentinelObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        appendNextBatch();
      }
    }
  }, { rootMargin: '200px' });

  sentinelObserver.observe(sentinel);
}

function disconnectSentinel() {
  if (sentinelObserver) {
    sentinelObserver.disconnect();
    sentinelObserver = null;
  }
  const sentinel = document.getElementById('dictSentinel');
  if (sentinel) {
    sentinel.hidden = (renderedCount >= filteredCards.length);
  }
}

export async function renderDictionary(filter = null) {
  const body = document.getElementById('dictBody');
  if (!body) return;

  if (filter !== null) {
    searchQuery = filter;
  }

  const deckId = document.getElementById('deckSelect')?.value;
  if (!deckId) {
    body.innerHTML = '<p class="dict-empty">Kein Deck gewählt.</p>';
    return;
  }

  // Deck bei Bedarf laden und indizieren
  if (deckId !== currentDeckId || !currentDeck) {
    currentDeckId = deckId;
    currentDeck = await loadDeck(deckId);
    if (!currentDeck?.cards?.length) {
      body.innerHTML = '<p class="dict-empty">Keine Karten in diesem Deck.</p>';
      return;
    }
    // Schneller Pre-Index für blitzschnelle Suche
    cachedCards = currentDeck.cards.map(c => ({
      ...c,
      _searchKey: `${c.front} ${c.back} ${c.roman || ''} ${c.ipa || ''}`.toLowerCase(),
    }));
  }

  const states = getCardStates(deckId);
  const today = todayStr();

  // Statistiken für Filter-Chips
  const totalCount = cachedCards.length;
  let learnedCount = 0;
  let dueCount = 0;
  let masteredCount = 0;

  for (const c of cachedCards) {
    const st = states[c.front];
    if (st) {
      learnedCount++;
      if (st.due && st.due <= today) dueCount++;
      if (st.level >= MAX_LEVEL) masteredCount++;
    }
  }

  filteredCards = filterCardList(cachedCards, states, activeFilter, searchQuery, today);
  renderedCount = 0;

  body.dataset.lang = currentDeck.language;

  // Header & Controls
  body.innerHTML = `
    <div class="dict-filters" role="tablist" aria-label="Wörterbuch Filter">
      <button type="button" class="dict-filter-chip ${activeFilter === 'all' ? 'dict-filter-chip--active' : ''}" data-filter="all">
        Alle (${totalCount})
      </button>
      <button type="button" class="dict-filter-chip ${activeFilter === 'learned' ? 'dict-filter-chip--active' : ''}" data-filter="learned">
        Gelernt (${learnedCount})
      </button>
      <button type="button" class="dict-filter-chip ${activeFilter === 'due' ? 'dict-filter-chip--active' : ''}" data-filter="due">
        Fällig (${dueCount})
      </button>
      <button type="button" class="dict-filter-chip ${activeFilter === 'mastered' ? 'dict-filter-chip--active' : ''}" data-filter="mastered">
        Gemeistert (${masteredCount})
      </button>
    </div>
    <p id="dictCount" class="dict-count"></p>
    ${filteredCards.length === 0 ? `
      <div class="dict-empty">
        <p style="font-size:2rem">🔍</p>
        <p><b>Keine Wörter gefunden.</b></p>
        <p>${searchQuery ? 'Versuche einen anderen Suchbegriff.' : 'Lerne neue Wörter in Sessions, um diesen Filter zu füllen.'}</p>
      </div>
    ` : `
      <ul id="dictList" class="dict-list"></ul>
      <div id="dictSentinel" class="dict-sentinel"></div>
    `}
  `;

  if (filteredCards.length > 0) {
    appendNextBatch();
    setupSentinel();
  }
}

export function initDictionary(activateView) {
  document.getElementById('dictBackBtn')?.addEventListener('click', () => activateView?.('learn'));

  const searchInput = document.getElementById('dictSearch');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        renderDictionary(e.target.value);
      }, 120);
    });
  }

  const body = document.getElementById('dictBody');
  if (!body) return;

  // Event Delegation für Audio-Buttons und Filter-Chips
  body.addEventListener('click', e => {
    // 1. Audio-Wiedergabe
    const audioBtn = e.target.closest('.dict-audio');
    if (audioBtn) {
      const lang = body.dataset.lang || getDecks()[document.getElementById('deckSelect')?.value]?.language;
      speak(audioBtn.dataset.say, lang);
      return;
    }

    // 2. Filter-Chips
    const chip = e.target.closest('.dict-filter-chip');
    if (chip && chip.dataset.filter) {
      activeFilter = chip.dataset.filter;
      renderDictionary();
    }
  });
}

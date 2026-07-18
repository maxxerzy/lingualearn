import { getDailyQuests, claimQuest } from '../core/quests.js';
import { getLeague, clearLastResult } from '../core/league.js';
import { SHOP, buy } from '../core/shop.js';
import { getGems, getInventory, getWager, startWager } from '../core/gamification.js';
import { showToast } from './toast.js';
import { startBlitz } from '../core/session.js';
import { renderGamiHeader } from './gami.js';

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

let activeTab = 'quests';

// ── Header-Diamantenzähler ───────────────────────────────────────
export function renderGems() {
  const el = document.getElementById('gemCount');
  if (el) el.textContent = getGems();
}

// ── Tagesquests ──────────────────────────────────────────────────
function questsHtml() {
  const quests = getDailyQuests();
  const items = quests.map(q => {
    const pct = Math.round((q.progress / q.goal) * 100);
    const state = q.claimed
      ? '<span class="quest__done"><i class="fas fa-check"></i> erledigt</span>'
      : q.done
        ? `<button type="button" class="quest__claim" data-claim="${q.id}"><i class="fas fa-gem"></i> +${q.gem} abholen</button>`
        : `<span class="quest__reward"><i class="fas fa-gem"></i> ${q.gem}</span>`;
    return `
      <li class="quest ${q.claimed ? 'quest--claimed' : q.done ? 'quest--done' : ''}">
        <span class="quest__icon"><i class="fas ${q.icon}"></i></span>
        <div class="quest__main">
          <div class="quest__top"><b>${esc(q.name)}</b>${state}</div>
          <div class="quest__bar"><span style="width:${pct}%"></span></div>
          <div class="quest__prog">${q.progress}/${q.goal}</div>
        </div>
      </li>`;
  }).join('');
  return `<p class="arena__hint">Erledige täglich 3 Aufgaben und sammle Diamanten. Neue Quests um Mitternacht.</p>
    <button type="button" class="blitz-cta" data-blitz>
      <span class="blitz-cta__icon"><i class="fas fa-bolt"></i></span>
      <span class="blitz-cta__main">
        <b>⚡ Blitzrunde</b>
        <span>60 Sekunden, so viele Antworten wie möglich — erste Runde des Tages bringt bis zu 15 💎</span>
      </span>
      <span class="blitz-cta__go">Start</span>
    </button>
    <ul class="quest-list">${items}</ul>`;
}

// ── Liga ─────────────────────────────────────────────────────────
function leagueHtml() {
  const L = getLeague();
  const banner = L.lastResult ? `
    <div class="league-banner league-banner--${L.lastResult.outcome}">
      ${L.lastResult.outcome === 'aufgestiegen' ? '🎉 Aufgestiegen!' :
        L.lastResult.outcome === 'abgestiegen' ? '⬇ Abgestiegen' : '✔ Liga gehalten'}
      — letzte Woche Platz ${L.lastResult.rank}. <button type="button" class="league-banner__x" data-league-dismiss>OK</button>
    </div>` : '';

  const rows = L.rows.map(r => {
    let zone = '';
    if (L.promoteCount && r.rank <= L.promoteCount) zone = 'promote';
    else if (L.demoteCount && r.rank > L.groupSize - L.demoteCount) zone = 'demote';
    return `
      <li class="lg-row ${r.you ? 'lg-row--you' : ''} ${zone ? 'lg-row--' + zone : ''}">
        <span class="lg-rank">${r.rank}</span>
        <span class="lg-name">${esc(r.name)}${r.you ? ' <b>(du)</b>' : ''}</span>
        <span class="lg-xp">${r.xp} XP</span>
      </li>`;
  }).join('');

  return `${banner}
    <div class="league-head" style="--lg:${L.division.color}">
      <span class="league-badge"><i class="fas ${L.division.icon}"></i></span>
      <div>
        <div class="league-title">${L.division.name}-Liga</div>
        <div class="league-sub">Platz ${L.you.rank} von ${L.groupSize} · noch ${L.daysLeft} ${L.daysLeft === 1 ? 'Tag' : 'Tage'}</div>
      </div>
    </div>
    <ul class="lg-legend">
      ${L.promoteCount ? `<li><span class="dot dot--promote"></span> Top ${L.promoteCount} steigen auf</li>` : ''}
      ${L.demoteCount ? `<li><span class="dot dot--demote"></span> Untere ${L.demoteCount} steigen ab</li>` : ''}
    </ul>
    <ol class="lg-list">${rows}</ol>`;
}

// ── Shop ─────────────────────────────────────────────────────────
function wagerHtml() {
  const w = getWager();
  if (w) {
    return `
      <li class="shop-item shop-item--wager">
        <span class="shop-item__icon"><i class="fas fa-dice"></i></span>
        <div class="shop-item__main">
          <b>Doppelt oder nichts läuft!</b>
          <span class="shop-item__desc">Halte deine Serie: ${w.progress}/7 Tagen geschafft.</span>
          <span class="shop-item__owned">Bei Erfolg: +100 Diamanten</span>
        </div>
        <span class="shop-item__buy" style="background:var(--light);color:var(--gray)">${w.progress}/7</span>
      </li>`;
  }
  return `
    <li class="shop-item shop-item--wager">
      <span class="shop-item__icon"><i class="fas fa-dice"></i></span>
      <div class="shop-item__main">
        <b>Doppelt oder nichts</b>
        <span class="shop-item__desc">Setze 50 💎 — halte 7 weitere Serientage und erhalte 100 💎 zurück.</span>
      </div>
      <button type="button" class="shop-item__buy" data-wager><i class="fas fa-gem"></i> 50</button>
    </li>`;
}

function shopHtml() {
  const inv = getInventory();
  const items = SHOP.map(s => {
    const owned = inv[s.item] || 0;
    const full = owned >= s.cap;
    return `
      <li class="shop-item">
        <span class="shop-item__icon"><i class="fas ${s.icon}"></i></span>
        <div class="shop-item__main">
          <b>${esc(s.name)}</b>
          <span class="shop-item__desc">${esc(s.desc)}</span>
          <span class="shop-item__owned">Im Vorrat: ${owned}/${s.cap}</span>
        </div>
        <button type="button" class="shop-item__buy" data-buy="${s.id}" ${full ? 'disabled' : ''}>
          ${full ? 'voll' : `<i class="fas fa-gem"></i> ${s.price}`}
        </button>
      </li>`;
  }).join('');
  return `<p class="arena__hint"><i class="fas fa-gem"></i> Du hast <b>${getGems()}</b> Diamanten. Verdiene mehr über Quests, Sessions & Erfolge.</p>
    <ul class="shop-list">${wagerHtml()}${items}</ul>`;
}

export function renderArena(tab = activeTab) {
  activeTab = tab;
  document.querySelectorAll('#arenaTabs .arena-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tab));
  const body = document.getElementById('arenaBody');
  if (!body) return;
  body.innerHTML = tab === 'league' ? leagueHtml() : tab === 'shop' ? shopHtml() : questsHtml();
  renderGems();
}

let navigateFn = null;

export function initArena(activateView) {
  navigateFn = activateView;
  document.getElementById('arenaBackBtn')?.addEventListener('click', () => navigateFn?.('learn'));
  document.querySelectorAll('#arenaTabs .arena-tab').forEach(t =>
    t.addEventListener('click', () => renderArena(t.dataset.tab)));

  const body = document.getElementById('arenaBody');
  body?.addEventListener('click', e => {
    const claim = e.target.closest('[data-claim]');
    const buyBtn = e.target.closest('[data-buy]');
    const dismiss = e.target.closest('[data-league-dismiss]');
    if (claim) {
      const q = claimQuest(claim.dataset.claim);
      if (q) {
        showToast(`<i class="fas fa-gem toast__icon"></i><div class="toast__body"><b>Quest erledigt!</b><span>+${q.gem} Diamanten${q.xp ? ` · +${q.xp} XP` : ''}</span></div>`);
        renderGamiHeader();
        renderArena('quests');
      }
    } else if (buyBtn) {
      const res = buy(buyBtn.dataset.buy);
      if (res.ok) {
        showToast(`<i class="fas ${res.item.icon} toast__icon"></i><div class="toast__body"><b>${res.item.name} gekauft</b><span>Jetzt ${res.count} im Vorrat</span></div>`);
        renderGamiHeader();
        renderArena('shop');
      } else {
        showToast(`<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>${res.err}</b></div>`, { variant: 'warn' });
      }
    } else if (e.target.closest('[data-blitz]')) {
      navigateFn?.('learn');
      startBlitz();
    } else if (e.target.closest('[data-wager]')) {
      const res = startWager();
      if (res.ok) {
        showToast('<i class="fas fa-dice toast__icon"></i><div class="toast__body"><b>Wette läuft! 🎲</b><span>7 Serientage halten → +100 Diamanten</span></div>');
        renderGamiHeader();
        renderArena('shop');
      } else {
        showToast(`<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>${res.err}</b></div>`, { variant: 'warn' });
      }
    } else if (dismiss) {
      clearLastResult();
      renderArena('league');
    }
  });
}

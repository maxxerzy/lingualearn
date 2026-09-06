import { getDailyQuests, claimQuest } from '../core/quests.js';
import { getLeague, clearLastResult } from '../core/league.js';
import { getFriendGroup, friendLeaderboard, createFriendGroup, joinFriendGroup,
         leaveFriendGroup, pullFriendGroup, isValidFriendCode } from '../core/friends.js';
import { getCurrentUser } from '../core/auth.js';
import { SHOP, buy } from '../core/shop.js';
import { getGems, getInventory, getWager, startWager, getGame } from '../core/gamification.js';
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
        <b>⚡ Blitzrunde${(getGame().bestBlitz || 0) > 0 ? ` <span class="blitz-cta__best"><i class="fas fa-trophy"></i> ${getGame().bestBlitz}</span>` : ''}</b>
        <span>60 Sekunden, so viele Antworten wie möglich — erste Runde des Tages bringt bis zu 15 💎</span>
      </span>
      <span class="blitz-cta__go">Start</span>
    </button>
    <ul class="quest-list">${items}</ul>`;
}

// ── Freundesliga: echte Freunde statt simulierter Gegner ─────────
// Eine Gruppe ist ein selbstgewählter Code, den man teilt. Ohne Gruppe
// bleibt die simulierte Wochenliga weiter der Fallback — sinnvoll für
// alle, die (noch) niemanden zum Mitlernen haben.
function friendsHtml() {
  const group = getFriendGroup();
  if (!group) {
    return `
      <div class="friends-panel">
        <h3 class="friends-panel__title"><i class="fas fa-user-group"></i> Echte Freunde</h3>
        <p class="arena__hint">Erstellt eine Gruppe oder tretet mit einem Code bei — eure Wochen-XP zählen gegeneinander, ganz ohne simulierte Gegner.</p>
        <div class="friends-join">
          <input type="text" id="friendNameInput" class="input" placeholder="Dein Anzeigename"
            maxlength="24" value="${esc(getCurrentUser() || '')}">
          <div class="friends-join__row">
            <input type="text" id="friendCodeInput" class="input friends-join__code" placeholder="Code eingeben"
              maxlength="10" autocapitalize="characters" autocomplete="off">
            <button type="button" class="btn" data-friend-join><i class="fas fa-right-to-bracket"></i> Beitreten</button>
          </div>
          <button type="button" class="btn btn-primary friends-join__create" data-friend-create>
            <i class="fas fa-plus"></i> Neue Gruppe erstellen
          </button>
        </div>
      </div>`;
  }

  const board = friendLeaderboard();
  const rows = (board?.rows || []).map(r => `
    <li class="lg-row ${r.you ? 'lg-row--you' : ''}">
      <span class="lg-rank">${r.rank}</span>
      <span class="lg-name">${esc(r.name)}${r.you ? ' <b>(du)</b>' : ''}</span>
      <span class="lg-xp">${r.xp} XP</span>
    </li>`).join('');

  return `
    <div class="friends-panel">
      <div class="friends-panel__head">
        <h3 class="friends-panel__title"><i class="fas fa-user-group"></i> ${esc(group.name)}s Gruppe</h3>
        <button type="button" class="friends-code" data-friend-copy title="Code kopieren">
          <i class="fas fa-copy"></i> ${esc(group.code)}
        </button>
      </div>
      ${board?.memberCount === 1
        ? '<p class="arena__hint">Teile den Code oben mit Freunden, damit sie beitreten können.</p>'
        : board?.stale
          ? '<p class="friends-stale"><i class="fas fa-rotate"></i> Stand nicht ganz frisch — <button type="button" class="friends-stale__btn" data-friend-refresh>aktualisieren</button></p>'
          : ''}
      <ol class="lg-list">${rows}</ol>
      <button type="button" class="btn btn-danger-outline friends-leave" data-friend-leave>
        <i class="fas fa-arrow-right-from-bracket"></i> Gruppe verlassen
      </button>
    </div>`;
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

  const hasGroup = !!getFriendGroup();
  return `${friendsHtml()}
    <hr class="friends-divider">
    ${hasGroup ? '<p class="arena__hint friends-sim-hint"><i class="fas fa-robot"></i> Simulierte Liga — deine Gruppe zählt hier nicht mit.</p>' : ''}
    ${banner}
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
  return `
    <div class="shop-balance" id="gemChip">
      <i class="fas fa-gem"></i>
      <div>
        <div class="shop-balance__num" id="gemCount">${getGems()}</div>
        <div class="shop-balance__label">Diamanten</div>
      </div>
      <span class="shop-balance__hint">Verdiene mehr über Quests, Sessions &amp; Erfolge</span>
    </div>
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

// ── Freundesliga: Aktionen ────────────────────────────────────────
function friendErrorText(reason) {
  return {
    'no-token': 'Dafür braucht es einen Konto-Schlüssel — bitte einmal einloggen.',
    'not-configured': 'Der Server ist für diese Funktion (noch) nicht eingerichtet.',
    'network': 'Keine Verbindung — bitte später erneut versuchen.',
    'offline': 'Ohne Internet geht das gerade nicht.',
    'bad-code': 'Der Code sieht nicht gültig aus (4–10 Zeichen, Buchstaben/Zahlen).',
    'bad-name': 'Bitte einen Anzeigenamen eintragen.',
    'group-full': 'Diese Gruppe ist bereits voll (20 Mitglieder).',
  }[reason] || 'Das hat gerade nicht geklappt.';
}

async function handleFriendJoin(joinBtn) {
  const nameInput = document.getElementById('friendNameInput');
  const codeInput = document.getElementById('friendCodeInput');
  const name = nameInput?.value || '';
  const isJoin = !!joinBtn;
  if (isJoin && !isValidFriendCode(codeInput?.value || '')) {
    showToast('<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>Ungültiger Code</b><span>4–10 Zeichen, Buchstaben oder Zahlen.</span></div>', { variant: 'warn' });
    return;
  }
  const btn = joinBtn || document.querySelector('[data-friend-create]');
  if (btn) { btn.disabled = true; }
  const res = isJoin ? await joinFriendGroup(codeInput.value, name) : await createFriendGroup(name);
  if (btn) { btn.disabled = false; }
  if (res.ok) {
    showToast('<i class="fas fa-user-group toast__icon"></i><div class="toast__body"><b>Gruppe bereit!</b><span>Teile den Code mit deinen Freunden.</span></div>');
    renderArena('league');
  } else {
    showToast(`<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>${friendErrorText(res.reason)}</b></div>`, { variant: 'warn' });
  }
}

async function copyFriendCode(btn) {
  const code = getFriendGroup()?.code;
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code);
    showToast('<i class="fas fa-copy toast__icon"></i><div class="toast__body"><b>Code kopiert</b><span>Jetzt an Freunde weitergeben.</span></div>');
  } catch {
    showToast(`<i class="fas fa-circle-info toast__icon"></i><div class="toast__body"><b>Code: ${esc(code)}</b><span>Kopieren nicht möglich — bitte abschreiben.</span></div>`, { variant: 'warn' });
  }
}

async function handleFriendRefresh(btn) {
  btn.disabled = true;
  const res = await pullFriendGroup();
  if (!res.ok) {
    showToast(`<i class="fas fa-circle-exclamation toast__icon"></i><div class="toast__body"><b>${friendErrorText(res.reason)}</b></div>`, { variant: 'warn' });
    btn.disabled = false;
    return;
  }
  renderArena('league');
}

async function handleFriendLeave(btn) {
  if (!confirm('Gruppe wirklich verlassen? Der Code bleibt gültig — du kannst später mit demselben Code wieder beitreten.')) return;
  btn.disabled = true;
  await leaveFriendGroup();
  renderArena('league');
}

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
    const friendCreate = e.target.closest('[data-friend-create]');
    const friendJoin = e.target.closest('[data-friend-join]');
    const friendCopy = e.target.closest('[data-friend-copy]');
    const friendRefresh = e.target.closest('[data-friend-refresh]');
    const friendLeave = e.target.closest('[data-friend-leave]');
    if (friendCreate || friendJoin) {
      handleFriendJoin(friendCreate ? null : friendJoin);
    } else if (friendCopy) {
      copyFriendCode(friendCopy);
    } else if (friendRefresh) {
      handleFriendRefresh(friendRefresh);
    } else if (friendLeave) {
      handleFriendLeave(friendLeave);
    } else if (claim) {
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

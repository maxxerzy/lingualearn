import {
  CATALOGS, THEMES, AVATARS, CARD_DESIGNS, BADGE_RARITY,
  getEquipped, isUnlocked, requirementText, equip,
} from '../core/cosmetics.js';
import { ACHIEVEMENTS, getGame } from '../core/gamification.js';

const THEME_SWATCH = {
  standard: 'linear-gradient(135deg,#4361ee,#3a0ca3)',
  ocean:    'linear-gradient(135deg,#0077b6,#00b4d8)',
  sunset:   'linear-gradient(135deg,#e5556e,#f4a261)',
  forest:   'linear-gradient(135deg,#2d6a4f,#74c69d)',
  dark:     'linear-gradient(135deg,#12161c,#2c3440)',
  royal:    'linear-gradient(135deg,#7b2cbf,#ffbe0b)',
  sakura:   'linear-gradient(135deg,#ffc9de,#d6336c)',
  retro:    'linear-gradient(135deg,#f4ecd8,#8b5e34)',
  lava:     'linear-gradient(135deg,#241412,#ff5c33)',
  neon:     'linear-gradient(135deg,#0b0f1a,#22d3ee)',
  galaxy:   'linear-gradient(135deg,#141026,#a78bfa)',
  sommer:   'linear-gradient(135deg,#ffe58a,#ff9e4a)',
  spuk:     'linear-gradient(135deg,#1a1026,#ff7b1c)',
  winter:   'linear-gradient(135deg,#e6f5fc,#4aa8d8)',
};
const RARITY_LABEL = { bronze: 'Bronze', silber: 'Silber', gold: 'Gold', legendaer: 'Legendär' };

// Wendet die ausgerüsteten Cosmetics auf die laufende Oberfläche an.
export function applyCosmetics() {
  const eq = getEquipped();

  // Theme (Standard = kein Attribut → main.css-Defaults)
  const root = document.documentElement;
  if (eq.theme && eq.theme !== 'standard') root.setAttribute('data-theme', eq.theme);
  else root.removeAttribute('data-theme');

  // Avatar-Icon im Header
  const avatar = AVATARS.find(a => a.id === eq.avatar) || AVATARS[0];
  const avatarEl = document.getElementById('userAvatar');
  if (avatarEl) avatarEl.className = `fas ${avatar.icon} user-chip__avatar`;

  // Titel-Chip
  const cat = CATALOGS.title.find(t => t.id === eq.title);
  const titleEl = document.getElementById('userTitle');
  if (titleEl) {
    if (cat) { titleEl.textContent = cat.name; titleEl.hidden = false; }
    else titleEl.hidden = true;
  }

  // Karten-Design auf dem Lernbereich (Element bleibt über Renders erhalten)
  const learn = document.getElementById('learnArea');
  if (learn) {
    CARD_DESIGNS.forEach(d => learn.classList.remove(`card--${d.id}`));
    if (eq.cardDesign && eq.cardDesign !== 'standard') learn.classList.add(`card--${eq.cardDesign}`);
  }
}

function cosmeticCard(type, item) {
  const eq = getEquipped();
  const unlocked = isUnlocked(item);
  const equipped = eq[type] === item.id;

  let swatch;
  if (type === 'theme') swatch = `<div class="cosmetic__swatch" style="background:${THEME_SWATCH[item.id] || '#4361ee'}"></div>`;
  else if (type === 'avatar') swatch = `<div class="cosmetic__swatch" style="background:linear-gradient(135deg,var(--primary),var(--secondary))"><i class="fas ${item.icon}"></i></div>`;
  else if (type === 'cardDesign') swatch = `<div class="cosmetic__swatch card--${item.id}" style="background:var(--surface);border:1px solid var(--light-gray)"></div>`;
  else swatch = `<div class="cosmetic__swatch" style="background:linear-gradient(135deg,var(--primary),var(--secondary));font-size:0.9rem;font-weight:700">${item.name}</div>`;

  const btn = equipped
    ? `<button class="cosmetic__btn" disabled>Ausgerüstet</button>`
    : unlocked
      ? `<button class="cosmetic__btn" data-equip-type="${type}" data-equip-id="${item.id}">Ausrüsten</button>`
      : `<button class="cosmetic__btn" disabled>Gesperrt</button>`;

  return `
    <div class="cosmetic${unlocked ? '' : ' cosmetic--locked'}${equipped ? ' cosmetic--equipped' : ''}">
      ${unlocked ? '' : '<i class="fas fa-lock cosmetic__lock"></i>'}
      ${swatch}
      <div class="cosmetic__name">${item.name}</div>
      <div class="cosmetic__req">${unlocked ? '' : requirementText(item)}</div>
      ${btn}
    </div>`;
}

function renderBadges() {
  const earned = new Set(Object.keys(getGame().achievements || {}));
  return `<div class="badge-shelf">${ACHIEVEMENTS.map(a => {
    const rarity = BADGE_RARITY[a.id] || 'bronze';
    const got = earned.has(a.id);
    return `
      <div class="badge badge--${rarity}${got ? ' badge--earned' : ''}" title="${a.desc}">
        <div class="badge__medal"><i class="fas ${got ? a.icon : 'fa-lock'}"></i></div>
        <div class="badge__name">${a.name}</div>
        <div class="badge__rarity">${RARITY_LABEL[rarity]}</div>
      </div>`;
  }).join('')}</div>`;
}

let activeCat = 'theme';

export function renderRewards(cat = activeCat) {
  activeCat = cat;
  document.querySelectorAll('.rewards-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.cat === cat));

  const body = document.getElementById('rewardsBody');
  if (!body) return;

  if (cat === 'badges') {
    body.innerHTML = renderBadges();
    return;
  }
  const items = CATALOGS[cat] || [];
  body.innerHTML = `<div class="cosmetic-grid">${items.map(i => cosmeticCard(cat, i)).join('')}</div>`;

  body.querySelectorAll('[data-equip-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (equip(btn.dataset.equipType, btn.dataset.equipId)) {
        applyCosmetics();
        renderRewards(cat);
      }
    });
  });
}

// Tab-Leiste einmalig verdrahten.
export function initRewards() {
  document.querySelectorAll('.rewards-tab').forEach(t =>
    t.addEventListener('click', () => renderRewards(t.dataset.cat)));
}

// Kleine, selbstschließende Einblendungen (unten rechts).
export function showToast(html, { variant = '', duration = 3500 } = {}) {
  let root = document.getElementById('toastRoot');
  if (!root) {
    root = document.createElement('div');
    root.id = 'toastRoot';
    // Vorlesehilfen sollen Hinweise mitbekommen, ohne den Fokus zu klauen.
    root.setAttribute('role', 'status');
    root.setAttribute('aria-live', 'polite');
    document.body.appendChild(root);
  }
  const t = document.createElement('div');
  t.className = 'toast' + (variant ? ` toast--${variant}` : '');
  t.innerHTML = html;
  root.appendChild(t);
  requestAnimationFrame(() => t.classList.add('toast--in'));
  setTimeout(() => {
    t.classList.remove('toast--in');
    setTimeout(() => t.remove(), 350);
  }, duration);
}

export function toastAchievements(list) {
  list.forEach((a, i) => {
    setTimeout(() => {
      showToast(
        `<i class="fas ${a.icon} toast__icon"></i>
         <div class="toast__body">
           <b>Erfolg freigeschaltet!</b>
           <span>${a.name} — ${a.desc}</span>
         </div>`,
        { variant: 'achieve', duration: 4200 }
      );
    }, i * 750);
  });
}

// Kurzer Konfetti-Regen (Level-Up, Streak-Truhe).
const CONFETTI_COLORS = ['#4361ee', '#f72585', '#ffd60a', '#2ec4b6', '#ff8a1e', '#9b5de5'];
export function confettiBurst(count = 26) {
  const wrap = document.createElement('div');
  wrap.className = 'confetti';
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + 'vw';
    s.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    s.style.animationDelay = (Math.random() * 0.4) + 's';
    s.style.animationDuration = (0.9 + Math.random() * 0.8) + 's';
    s.style.transform = `rotate(${Math.random() * 360}deg)`;
    wrap.appendChild(s);
  }
  document.body.appendChild(wrap);
  setTimeout(() => wrap.remove(), 2200);
}

const COSMETIC_LABEL = { theme: 'Theme', avatar: 'Avatar', title: 'Titel', cardDesign: 'Karten-Design' };

export function toastCosmetics(list) {
  list.forEach((c, i) => {
    setTimeout(() => {
      showToast(
        `<i class="fas fa-gift toast__icon"></i>
         <div class="toast__body">
           <b>Neu freigeschaltet!</b>
           <span>${COSMETIC_LABEL[c.type] || 'Belohnung'}: ${c.name} — unter „Belohnungen"</span>
         </div>`,
        { variant: 'achieve', duration: 4200 }
      );
    }, i * 750);
  });
}

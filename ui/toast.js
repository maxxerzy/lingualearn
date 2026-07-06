// Kleine, selbstschließende Einblendungen (unten rechts).
export function showToast(html, { variant = '', duration = 3500 } = {}) {
  let root = document.getElementById('toastRoot');
  if (!root) {
    root = document.createElement('div');
    root.id = 'toastRoot';
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

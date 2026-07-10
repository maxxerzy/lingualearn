// Hauptnavigation: Bottom-Tabbar am Phone, Sidebar am Desktop (CSS).

const TABS = [
  {
    route: '#/maerkte', label: 'Märkte',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 17l5-6 4 3 6-8"/><path d="M21 21H3V3"/></svg>',
  },
  {
    route: '#/watchlist', label: 'Watchlist',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.8l-5.8 3 1.1-6.4L2.6 9.8l6.5-.9z"/></svg>',
  },
  {
    route: '#/depot', label: 'Depot',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M3 12h18"/></svg>',
  },
  {
    route: '#/news', label: 'News',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5h16v14a2 2 0 01-2 2H6a2 2 0 01-2-2z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
  },
  {
    route: '#/mehr', label: 'Mehr',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
  },
];

export function renderTabbar() {
  const nav = document.getElementById('mainNav');
  nav.innerHTML = TABS.map(
    (tab) => `
      <a href="${tab.route}" data-route="${tab.route}">
        ${tab.icon}
        <span class="nav-label">${tab.label}</span>
      </a>`
  ).join('');
}

export function highlightTab(hash) {
  const base = `#/${(hash.split('/')[1] || 'maerkte')}`;
  for (const a of document.querySelectorAll('#mainNav a')) {
    a.classList.toggle('active', a.dataset.route === base);
  }
}

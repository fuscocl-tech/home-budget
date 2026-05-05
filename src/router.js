// URL-based tab routing.
// Exports activateTab() and related helpers used by the rest of the app.
// renderAll is registered via setRenderCallback() to avoid circular imports.

export const SECTIONS = {
  wallet: { navTab: 'budget', label: 'Wallet', tabs: [
    { tab: 'budget',   label: 'Budget' },
    { tab: 'bills',    label: 'Bills' },
    { tab: 'networth', label: 'Net Worth' },
    { tab: 'goals',    label: 'Goals' },
    { tab: 'insights', label: 'Insights' },
    { tab: 'build',    label: 'Build' },
  ]},
  plan: { navTab: 'planner', label: 'Plan', tabs: [
    { tab: 'planner',  label: 'Planner' },
    { tab: 'forecast', label: 'Forecast' },
    { tab: 'meals',    label: 'Meals' },
    { tab: 'lunchbox', label: 'Lunchbox' },
    { tab: 'pantry',   label: 'Pantry' },
    { tab: 'routines', label: 'Routines' },
    { tab: 'lists',    label: 'Lists' },
  ]},
  home: { navTab: 'documents', label: 'Home', tabs: [
    { tab: 'documents',   label: 'Documents' },
    { tab: 'vehicles',    label: 'Vehicles' },
    { tab: 'maintenance', label: 'Maintenance' },
    { tab: 'kids',        label: 'Kids' },
  ]},
};

// Registered by main.js after renderAll is defined
let _renderAll = () => {};
export function setRenderCallback(fn) { _renderAll = fn; }

export function _tabSection(tab) {
  for (const [key, sec] of Object.entries(SECTIONS)) {
    if (sec.tabs.some(t => t.tab === tab)) return key;
  }
  return null;
}

export function _activeTab() {
  const el = document.querySelector('.tab-panel.active');
  return el ? el.id.replace('tab-', '') : 'today';
}

export function _sectionPillsHtml(sectionKey, activeTab) {
  const sec = SECTIONS[sectionKey];
  if (!sec) return '';
  return `<div class="section-nav">
    <div class="section-breadcrumb">
      <a onclick="activateTab('today')">Today</a>
      <span class="sep">›</span>
      <span class="current">${sec.label}</span>
    </div>
    <div class="section-pills-wrap">
      <div class="section-pills" onscroll="_updatePillsOverflow(this.parentElement)">${sec.tabs.map(t =>
        `<button class="section-pill${t.tab === activeTab ? ' active' : ''}" onclick="activateTab('${t.tab}')">${t.label}</button>`
      ).join('')}</div>
      <div class="section-pills-chevron section-pills-chevron-r" aria-hidden="true">›</div>
      <div class="section-pills-chevron section-pills-chevron-l" aria-hidden="true">‹</div>
    </div>
  </div>`;
}

export function _updatePillsOverflow(wrap) {
  if (!wrap) return;
  const pills = wrap.querySelector('.section-pills');
  if (!pills) return;
  const canRight = pills.scrollWidth - pills.scrollLeft - pills.clientWidth > 4;
  const canLeft  = pills.scrollLeft > 4;
  wrap.classList.toggle('has-overflow-right', canRight);
  wrap.classList.toggle('has-overflow-left',  canLeft);
}

export function _activateTabInternal(tab) {
  if (tab === 'subscriptions') tab = 'bills';
  if (tab === 'scenarios')     tab = 'insights';
  if (tab === 'money')         tab = 'budget';
  if (tab === 'dashboard')     tab = 'budget';

  if (!document.getElementById('tab-' + tab)) tab = 'today';

  if (typeof window._checkSettingsUnsaved === 'function') {
    if (_activeTab() === 'settings' && tab !== 'settings') window._checkSettingsUnsaved(tab);
  }

  document.querySelectorAll('.nav-item, .nav-text-item, .bn-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

  const panel = document.getElementById('tab-' + tab);
  if (panel) panel.classList.add('active');

  const section = _tabSection(tab);
  if (section) {
    const navTab = SECTIONS[section].navTab;
    document.querySelectorAll(`[data-tab="${navTab}"]`).forEach(n => n.classList.add('active'));
  } else {
    document.querySelectorAll(`[data-tab="${tab}"]`).forEach(n => n.classList.add('active'));
  }

  document.body.dataset.section = section || tab;

  document.querySelectorAll('.static-section-header').forEach(h => h.classList.remove('active'));
  if (section) {
    const hdr = document.getElementById(section + '-section-header');
    if (hdr) {
      hdr.classList.add('active');
      const dateEl = document.getElementById(section + '-header-date');
      if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' });
      hdr.querySelectorAll('.section-pill').forEach(p => p.classList.toggle('active', p.dataset.pill === tab));
      requestAnimationFrame(() => hdr.querySelectorAll('.section-pills-wrap').forEach(_updatePillsOverflow));
    }
  }

  _renderAll();
}

export function activateTab(tab) {
  if (tab === 'subscriptions') tab = 'bills';
  if (tab === 'scenarios')     tab = 'insights';
  if (tab === 'money')         tab = 'budget';
  if (tab === 'dashboard')     tab = 'budget';

  const current = location.hash.slice(1) || 'today';
  if (current !== tab) {
    history.pushState({ tab }, '', '#' + tab);
  }
  _activateTabInternal(tab);
}

window.addEventListener('popstate', e => {
  const tab = (e.state?.tab) || location.hash.slice(1) || 'today';
  _activateTabInternal(tab);
});

(function _initRouteFromHash() {
  const tab = location.hash.slice(1) || 'today';
  history.replaceState({ tab }, '', tab === 'today' ? (location.pathname + location.search) : '#' + tab);
})();

// Guided walkthrough engine
import { state } from '../store.js';
import { escHtml } from './format.js';

// GUIDED WALKTHROUGH ENGINE
// ─────────────────────────────────────────────────
export let _guideSteps = [];
export let _guideIdx = 0;
export let _guideCleanup = null;

export function startGuide(steps) {
  _guideSteps = steps;
  _guideIdx = 0;
  _showGuideStep();
}

export function _showGuideStep() {
  // Clean up previous
  _cleanupGuide();

  if (_guideIdx >= _guideSteps.length) { endGuide(); return; }
  const step = _guideSteps[_guideIdx];

  // Navigate to tab if needed, then highlight after render
  if (step.tab && _activeTab() !== step.tab) {
    activateTab(step.tab);
    setTimeout(() => _highlightStep(step), 500);
  } else {
    setTimeout(() => _highlightStep(step), 100);
  }
}

export function _highlightStep(step) {
  const el = step.el ? (typeof step.el === 'string' ? document.querySelector(step.el) : step.el) : null;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'guide-overlay';
  overlay.onclick = () => endGuide();
  document.body.appendChild(overlay);

  // Spotlight on target element
  let spotlight = null;
  let rect = null;
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    rect = el.getBoundingClientRect();
    spotlight = document.createElement('div');
    spotlight.className = 'guide-spotlight guide-pulse';
    spotlight.style.cssText = `top:${rect.top - 6}px;left:${rect.left - 6}px;width:${rect.width + 12}px;height:${rect.height + 12}px;`;
    document.body.appendChild(spotlight);
  }

  // Tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'guide-tooltip';
  tooltip.innerHTML = `
    <div class="guide-tooltip-step">Step ${_guideIdx + 1} of ${_guideSteps.length}</div>
    <div class="guide-tooltip-title">${step.title}</div>
    <div class="guide-tooltip-text">${step.text}</div>
    <div class="guide-tooltip-actions">
      <button class="guide-tooltip-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="endGuide()">Skip</button>
      ${_guideIdx < _guideSteps.length - 1
        ? `<button class="guide-tooltip-btn" style="background:#0891b2;color:#fff" onclick="nextGuideStep()">Next</button>`
        : `<button class="guide-tooltip-btn" style="background:#0891b2;color:#fff" onclick="endGuide()">Done</button>`}
    </div>`;
  tooltip.onclick = e => e.stopPropagation();
  document.body.appendChild(tooltip);

  // Position tooltip relative to target
  if (rect) {
    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;
    let top = rect.bottom + 14;
    let left = rect.left + (rect.width / 2) - (tw / 2);
    // Keep on screen
    if (left < 12) left = 12;
    if (left + tw > window.innerWidth - 12) left = window.innerWidth - tw - 12;
    if (top + th > window.innerHeight - 12) top = rect.top - th - 14;
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  } else {
    tooltip.style.top = '50%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translate(-50%, -50%)';
  }

  _guideCleanup = () => {
    overlay.remove();
    if (spotlight) spotlight.remove();
    tooltip.remove();
  };

  // If step has an action to watch (e.g. user clicks the target), auto-advance
  if (step.watchClick && el) {
    const handler = () => {
      el.removeEventListener('click', handler);
      setTimeout(() => nextGuideStep(), 400);
    };
    el.addEventListener('click', handler);
  }
}

export function nextGuideStep() {
  _guideIdx++;
  _showGuideStep();
}

export function endGuide() {
  _cleanupGuide();
  _guideSteps = [];
  _guideIdx = 0;
}

export function _cleanupGuide() {
  if (_guideCleanup) { _guideCleanup(); _guideCleanup = null; }
}

// ── Pre-built guides for health score dimensions ──
export const HEALTH_GUIDES = {
  emergency: [
    { tab: 'goals', title: 'Create an Emergency Fund', text: 'An emergency fund covers 3-6 months of expenses. Let\'s set one up as a savings goal.', el: null },
    { tab: 'goals', title: 'Tap "+ New Goal"', text: 'This button creates a new savings goal. Set the name to "Emergency Fund" and the target to your 3-month expenses.', el: '[onclick*="openAddGoal"]', watchClick: true },
  ],
  savings: [
    { tab: 'budget', title: 'Improve your savings rate', text: 'Your savings rate is the gap between income and expenses. To improve it, you can either reduce expenses or increase income.', el: null },
    { tab: 'budget', title: 'Review your expenses', text: 'Look through your expenses below. Are there any you could reduce? Tap any expense to edit it.', el: '#budget-content' },
  ],
  tracking: [
    { tab: 'budget', title: 'Track your actual spending', text: 'Recording what you actually spend helps you stay on track. You can import your bank statement or log spends manually.', el: null },
    { tab: 'budget', title: 'Import transactions', text: 'Tap "Import Transactions" to upload a bank CSV, or use the + button to log individual spends.', el: '[onclick*="openCsvImport"]', watchClick: true },
  ],
  netWorth: [
    { tab: 'networth', title: 'Build your net worth picture', text: 'Add what you own (property, savings, super) as assets. Add what you owe (mortgage, loans, credit cards) as liabilities.', el: null },
    { tab: 'networth', title: 'Start adding', text: 'Use the buttons below to add your first asset or liability. Even rough numbers help build the picture.', el: '#networth-content' },
  ],
  goals: [
    { tab: 'goals', title: 'Set a financial goal', text: 'Goals keep you motivated — a holiday fund, debt payoff, or savings target. Let\'s create your first one.', el: null },
    { tab: 'goals', title: 'Tap "+ New Goal"', text: 'Choose a goal type, set a target amount, and start tracking your progress.', el: '[onclick*="openAddGoal"]', watchClick: true },
  ]
};

export function startHealthGuide(dimension) {
  const guide = HEALTH_GUIDES[dimension];
  if (guide) startGuide(guide);
}

export function safeRender(fn) {
  try {
    fn();
  } catch(e) {
    console.error('Render error in ' + fn.name + ':', e);
    if (typeof Sentry !== 'undefined') {
      Sentry.withScope(scope => {
        scope.setTag('renderer', fn.name || 'anonymous');
        Sentry.captureException(e);
      });
    }
  }
}

// ── Routine daily reset ──────────────────────────────────
// Called on app load. Clears today's completionState on any assignment
// whose last-recorded date is before the configured reset hour today.
// e.g. resetHour=6 → at 6am, yesterday's completions are wiped for today.

// ── Adult read-only view of a child's Today screen ───────
export let _cvReadOnly = false;

export function viewChildToday(kidId) {
  _cvReadOnly = true;
  const bar = document.getElementById('cv-readonly-bar');
  const btn = document.getElementById('cv-signout-btn');
  if (bar) bar.style.display = '';
  if (btn) btn.style.display = 'none';
  window.showChildView(kidId);
}

export function _cvViewCalendar(kidId) {
  _cvReadOnly = true;
  const bar = document.getElementById('cv-readonly-bar');
  const btn = document.getElementById('cv-signout-btn');
  if (bar) bar.style.display = '';
  if (btn) btn.style.display = 'none';
  window.showChildView(kidId);
  setTimeout(() => { _cvSwitchTab('calendar', kidId); }, 50);
}

export function exitChildView() {
  const ov = document.getElementById('child-view-overlay');
  ov.classList.add('hidden');
  ov.style.display = '';
  const bar = document.getElementById('cv-readonly-bar');
  const btn = document.getElementById('cv-signout-btn');
  if (bar) bar.style.display = 'none';
  if (btn) btn.style.display = '';
  const wasReadOnly = _cvReadOnly;
  _cvReadOnly = false;
  if (!wasReadOnly) {
    window._activeProfile = null;
    window.clearKidSession();
    window.switchProfile();
  }
}

// _recurrenceMatchesDate is the canonical copy in planner-utils.js
export { _recurrenceMatchesDate } from './planner-utils.js';

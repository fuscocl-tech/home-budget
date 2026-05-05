// Quick Add — FAB overlay for rapid expense/income/event entry
import { state } from '../store.js';
import { escHtml, aud, audD } from './format.js';
import { prefsGet } from '../prefs.js';

export function openQuickAdd() {
  _renderQAHub();
  document.getElementById('qa-overlay').classList.add('open');
  requestAnimationFrame(() => document.getElementById('qa-sheet').classList.add('open'));
}

export function closeQuickAdd() {
  document.getElementById('qa-sheet').classList.remove('open');
  document.getElementById('qa-overlay').classList.remove('open');
}

export function _renderQAHub() {
  document.getElementById('qa-sheet').innerHTML = `
    <div class="qa-handle"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px 4px">
      <span style="font-size:17px;font-weight:700;color:var(--ink);font-family:var(--sans)">Quick Add</span>
      <button onclick="closeQuickAdd()" style="background:none;border:none;font-size:24px;color:var(--muted);cursor:pointer;line-height:1;padding:4px">×</button>
    </div>

    <div class="qah-input-label">What would you like to do?</div>
    <div class="qah-input-row">
      <input id="qah-text" type="text" class="qah-bare" placeholder="e.g. coffee $4.50 · dentist 3rd June 2pm · pay electricity"
        onkeydown="if(event.key==='Enter')_qahSendText()">
      <button class="qah-ai-send" onclick="_qahSendText()" title="Submit">↑</button>
    </div>

    <div class="qah-grid">
      <div class="qah-tile" onclick="_qahAction('event')">
        <div class="qah-tile-icon" style="background:#EEF2FF">📅</div>
        <div class="qah-tile-label">Create Event</div>
        <div class="qah-tile-sub">Planner</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('expense')">
        <div class="qah-tile-icon" style="background:#FEF9C3">💸</div>
        <div class="qah-tile-label">Log Expense</div>
        <div class="qah-tile-sub">Wallet</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('income')">
        <div class="qah-tile-icon" style="background:#ECFDF5">💰</div>
        <div class="qah-tile-label">Add Income</div>
        <div class="qah-tile-sub">Wallet</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('bill')">
        <div class="qah-tile-icon" style="background:#FFF7ED">🧾</div>
        <div class="qah-tile-label">Enter Bill</div>
        <div class="qah-tile-sub">Wallet</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('chore')">
        <div class="qah-tile-icon" style="background:#F0FDF4">🧹</div>
        <div class="qah-tile-label">Create Chore</div>
        <div class="qah-tile-sub">Home</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('shopping')">
        <div class="qah-tile-icon" style="background:#F0F9FF">🛒</div>
        <div class="qah-tile-label">Shopping List</div>
        <div class="qah-tile-sub">Meals</div>
      </div>
    </div>

    <div class="qah-ask-row" onclick="_qahAction('ai')">
      <div class="qah-ask-icon">🐕</div>
      <div>
        <div class="qah-ask-label">Ask Toto</div>
        <div class="qah-ask-sub">Chat with your AI family assistant</div>
      </div>
    </div>
    <div style="height:max(12px,env(safe-area-inset-bottom))"></div>`;

  requestAnimationFrame(() => document.getElementById('qah-text')?.focus());
}

export function _qahAction(type) {
  closeQuickAdd();
  setTimeout(() => {
    if (type === 'event') {
      activateTab('planner');
      setTimeout(() => openPlannerModal(null, new Date().toISOString().slice(0,10)), 300);
    } else if (type === 'expense') {
      const expenses = window.getMonthData(window.selectedBudgetMonth).expenses;
      const lastId = parseInt(window._secureGet('toto_qa_last') || '0');
      _qaExpenseId = expenses.find(e => e.id === lastId)?.id ?? (expenses[0]?.id ?? null);
      _qaAmount = '';
      _renderQASheet(expenses);
      document.getElementById('qa-overlay').classList.add('open');
      requestAnimationFrame(() => document.getElementById('qa-sheet').classList.add('open'));
    } else if (type === 'income') {
      activateTab('budget');
      setTimeout(() => openAddIncome(), 300);
    } else if (type === 'bill') {
      activateTab('bills');
      setTimeout(() => openBillModal(), 300);
    } else if (type === 'chore') {
      activateTab('kids');
      setTimeout(() => { if (typeof renderChoreMgmt === 'function') renderChoreMgmt(); }, 300);
    } else if (type === 'shopping') {
      window._listsActiveType = 'food'; window._listsView = 'list'; activateTab('lists');
    } else if (type === 'ai') {
      if (typeof toggleTotoAssistant === 'function') toggleTotoAssistant();
    }
  }, 320);
}

export async function _qahSendText() {
  const text = document.getElementById('qah-text')?.value.trim();
  if (!text) { _qahAction('ai'); return; }

  // Show loading state
  const btn = document.querySelector('.qah-ai-send');
  if (btn) { btn.textContent = '…'; btn.disabled = true; }

  const today = new Date().toISOString().slice(0, 10);
  const prompt = `Today is ${today}. The user typed: "${text}"

Parse this into a structured action. Return ONLY raw JSON, no markdown.

Respond with one of these shapes:
{"type":"event","title":"...","date":"YYYY-MM-DD","time":"HH:MM"}
{"type":"expense","amount":0.00,"note":"..."}
{"type":"income","name":"...","amount":0.00}
{"type":"bill","name":"...","amount":0.00,"dueDate":"YYYY-MM-DD"}
{"type":"chore","name":"..."}
{"type":"shopping","name":"...","qty":"..."}
{"type":"unknown"}

Rules:
- If it mentions an appointment, meeting, event, or a date/time → event
- If it mentions spending, buying, paid, cost, $amount with no income context → expense
- If it mentions salary, earned, received, payment in → income
- If it mentions a bill, subscription, due, invoice → bill
- If it mentions a chore, task, clean, tidy, fix → chore
- If it mentions grocery, buy at store, shopping item → shopping
- Dates like "3rd June" = 2026-06-03, "next Monday" = calculate from today
- Times like "2pm" = "14:00"
- If genuinely unclear → unknown`;

  try {
    const key = state.settings?.claudeApiKey;
    const res = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 150, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await res.json();
    const raw = data.content?.[0]?.text?.trim() || '{"type":"unknown"}';
    const parsed = JSON.parse(raw.replace(/```[\w]*\n?/g, '').trim());
    closeQuickAdd();
    await _qahApplyParsed(parsed, text);
  } catch(e) {
    // On any error, fall back to AI chat
    closeQuickAdd();
    setTimeout(() => {
      if (typeof toggleTotoAssistant === 'function') toggleTotoAssistant();
      setTimeout(() => {
        const inp = document.getElementById('toto-input') || document.querySelector('.toto-msg-input');
        if (inp) { inp.value = text; inp.focus(); }
      }, 400);
    }, 320);
  }
}

export async function _qahApplyParsed(parsed, originalText) {
  const delay = ms => new Promise(r => setTimeout(r, ms));
  if (parsed.type === 'event') {
    activateTab('planner');
    await delay(320);
    openPlannerModal(null, parsed.date || new Date().toISOString().slice(0,10));
    await delay(200);
    const titleEl = document.getElementById('pe-title');
    const timeEl  = document.getElementById('pe-time');
    if (titleEl) titleEl.value = parsed.title || originalText;
    if (timeEl && parsed.time) timeEl.value = parsed.time;
    // Update the date display if date provided
    if (parsed.date) {
      const dateEl = document.getElementById('pe-date');
      const dispEl = document.getElementById('pm-start-display');
      if (dateEl) dateEl.value = parsed.date;
      if (dispEl && typeof _pmFmtDateShort === 'function') dispEl.textContent = _pmFmtDateShort(parsed.date);
    }
  } else if (parsed.type === 'expense') {
    const expenses = window.getMonthData(window.selectedBudgetMonth).expenses;
    const lastId = parseInt(window._secureGet('toto_qa_last') || '0');
    _qaExpenseId = expenses.find(e => e.id === lastId)?.id ?? (expenses[0]?.id ?? null);
    _qaAmount = parsed.amount ? String(parsed.amount) : '';
    _renderQASheet(expenses);
    document.getElementById('qa-overlay').classList.add('open');
    requestAnimationFrame(() => {
      document.getElementById('qa-sheet').classList.add('open');
      const noteEl = document.getElementById('qa-note');
      if (noteEl && parsed.note) noteEl.value = parsed.note;
    });
  } else if (parsed.type === 'income') {
    activateTab('budget');
    await delay(320);
    openAddIncome();
    await delay(200);
    const nameEl = document.getElementById('inc-name') || document.querySelector('#modal-body [id*="name"]');
    const amtEl  = document.getElementById('inc-amount') || document.querySelector('#modal-body [id*="amount"]');
    if (nameEl && parsed.name) nameEl.value = parsed.name;
    if (amtEl && parsed.amount) amtEl.value = parsed.amount;
  } else if (parsed.type === 'bill') {
    activateTab('bills');
    await delay(320);
    openBillModal();
    await delay(200);
    const nameEl = document.getElementById('bill-name');
    const amtEl  = document.getElementById('bill-amount');
    const dueEl  = document.getElementById('bill-due');
    if (nameEl && parsed.name) nameEl.value = parsed.name;
    if (amtEl && parsed.amount) amtEl.value = parsed.amount;
    if (dueEl && parsed.dueDate) dueEl.value = parsed.dueDate;
  } else if (parsed.type === 'chore') {
    activateTab('kids');
    await delay(320);
  } else if (parsed.type === 'shopping') {
    window._listsActiveType = 'food';
    window._listsView = 'list';
    activateTab('lists');
    await delay(320);
    const nameEl = document.getElementById('ls-quick-input');
    const qtyEl  = null;
    if (nameEl && parsed.name) { nameEl.value = parsed.name; nameEl.focus(); }
    if (qtyEl && parsed.qty) qtyEl.value = parsed.qty;
  } else {
    // Unknown — send to Toto AI
    if (typeof toggleTotoAssistant === 'function') toggleTotoAssistant();
    await delay(400);
    const inp = document.getElementById('toto-input') || document.querySelector('.toto-msg-input');
    if (inp) { inp.value = originalText; inp.focus(); }
  }
}

export function _renderQASheet(expensesArg) {
  const expenses = expensesArg || window.getMonthData(window.selectedBudgetMonth).expenses;
  const display  = _qaAmount ? `$${_qaAmount}` : '$0';
  const isZero   = !_qaAmount;

  const catPills = expenses.length
    ? expenses.map(e => `<button class="qa-cat${e.id === _qaExpenseId ? ' selected' : ''}" onclick="_qaSelectCat(${e.id})">${escHtml(e.name)}</button>`).join('')
    : `<span style="color:var(--text-muted);font-size:13px;padding:6px 4px">Add budget expenses first</span>`;

  const numKeys = ['1','2','3','4','5','6','7','8','9','.','0','⌫'];

  document.getElementById('qa-sheet').innerHTML = `
    <div class="qa-handle"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 20px 0">
      <span style="font-size:16px;font-weight:700">Log Spend</span>
      <button onclick="closeQuickAdd()" style="background:none;border:none;font-size:24px;color:var(--text-muted);cursor:pointer;line-height:1;padding:4px">×</button>
    </div>

    <div class="qa-amount-display${isZero ? ' zero' : ''}" id="qa-display">${display}</div>

    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);padding:0 20px 8px">Category</div>
    <div class="qa-cats" id="qa-cats">${catPills}</div>

    <div class="qa-numpad">
      ${numKeys.map(k => `<button class="qa-key${k==='⌫'?' qa-key-del':''}" onclick="_qaKey('${k}')">${k}</button>`).join('')}
    </div>

    <div style="padding:0 16px 12px;display:flex;flex-direction:column;gap:10px">
      <input class="form-input" type="text" maxlength="200" id="qa-note" placeholder="Note (optional)"
        style="border-radius:12px" autocomplete="off">
      <button class="btn btn-primary" onclick="saveQuickAdd()"
        style="height:54px;font-size:16px;font-weight:700;border-radius:14px;background:#0891b2;border-color:#0891b2">
        Save Spend
      </button>
    </div>`;
}

export function _qaKey(k) {
  if (k === '⌫') {
    _qaAmount = _qaAmount.slice(0, -1);
  } else if (k === '.') {
    if (!_qaAmount.includes('.')) _qaAmount += (_qaAmount ? '' : '0') + '.';
  } else {
    const parts = _qaAmount.split('.');
    if (parts[1] !== undefined && parts[1].length >= 2) return;
    if (_qaAmount.replace('.','').length >= 6) return;
    if (_qaAmount === '0' && k !== '.') _qaAmount = k;
    else _qaAmount += k;
  }
  const el = document.getElementById('qa-display');
  if (!el) return;
  const isZero = !_qaAmount;
  el.textContent = _qaAmount ? `$${_qaAmount}` : '$0';
  el.className = `qa-amount-display${isZero ? ' zero' : ''}`;
}

export function _qaSelectCat(id) {
  _qaExpenseId = id;
  document.querySelectorAll('.qa-cat').forEach(b => {
    b.classList.toggle('selected', parseInt(b.getAttribute('onclick').match(/\d+/)[0]) === id);
  });
}

export function saveQuickAdd() {
  const amount = parseFloat(_qaAmount);
  if (!amount || amount <= 0) {
    const el = document.getElementById('qa-display');
    if (el) { el.style.color = 'var(--danger)'; setTimeout(() => el.style.color = '', 600); }
    return;
  }
  if (!_qaExpenseId) {
    const cats = document.getElementById('qa-cats');
    if (cats) { cats.style.outline = '2px solid var(--danger)'; cats.style.borderRadius = '8px'; setTimeout(() => { cats.style.outline=''; }, 600); }
    return;
  }

  const note  = document.getElementById('qa-note')?.value.trim() || '';
  const today = new Date().toISOString().slice(0, 10);

  if (!state.budget.actuals[window.selectedBudgetMonth]) state.budget.actuals[window.selectedBudgetMonth] = {};
  const entries = window.getActualEntries(_qaExpenseId, window.selectedBudgetMonth);
  const newId   = entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1;
  entries.push({ id: newId, amount, date: today, note });
  state.budget.actuals[window.selectedBudgetMonth][_qaExpenseId] = entries;

  window._secureSet('toto_qa_last', String(_qaExpenseId));
  window.saveData(state);
  closeQuickAdd();
  window.renderAll();

  // FAB flash confirmation
  const fab = document.getElementById('qa-fab');
  if (fab) {
    fab.textContent = '✓';
    fab.style.background = '#10b981';
    setTimeout(() => { fab.textContent = '+'; fab.style.background = ''; }, 1800);
  }
}

// nextId, aud, audD, fmtDate, isOverdue imported from ./sections/format.js

// ─────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────

// Section definitions — maps each sub-tab to its section and pill config
// SECTIONS, _tabSection, _activeTab, _sectionPillsHtml, _updatePillsOverflow,
// _activateTabInternal, activateTab — all imported from ./router.js

// Router functions imported from ./router.js — see above imports.
// Nav item click listeners still needed here (DOM is ready at this point).
window.addEventListener('resize', () => {
  document.querySelectorAll('.section-pills-wrap').forEach(_updatePillsOverflow);
});
document.querySelectorAll('.nav-item, .nav-text-item').forEach(el => {
  el.addEventListener('click', () => activateTab(el.dataset.tab));
});

// ─────────────────────────────────────────────────

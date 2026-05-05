// Budget, expense groups, income/expense forms section
import { state } from '../store.js';
import { aud, audD, escHtml, escAttr, fmtDate, monthlyTotal, itemMonthly,
         freqLabel, freqDisplay, freqDisplayItem, freqLabelItem, nextId } from './format.js';
import { freqToMonthly } from '../utils.js';

export function renderExpenseGroups(expenses) {
  const groups   = state.categoryGroups || DEFAULT_DATA.categoryGroups;
  const actuals  = state.budget.actuals[window.selectedBudgetMonth] || {};
  const colors_e = (state.colors || {}).expense || {};

  // Categories assigned to any group
  const assignedCats = new Set(groups.flatMap(g => g.categories));
  // Any on-screen categories not in a group → put in virtual Ungrouped
  const ungroupedCats = [...new Set(expenses.map(e => e.category || 'Other'))].filter(c => !assignedCats.has(c));
  const displayGroups = ungroupedCats.length > 0
    ? [...groups, { id: 'ug', name: 'Ungrouped', icon: '📋', categories: ungroupedCats }]
    : groups;

  let html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:4px;align-items:start">';

  for (const group of displayGroups) {
    const items = expenses.filter(e => group.categories.includes(e.category || 'Other'));
    if (items.length === 0) continue;

    const budgeted = items.reduce((s, e) => s + itemMonthly(e), 0);
    const actual   = items.reduce((s, e) => s + window.getActual(e.id, window.selectedBudgetMonth), 0);
    const pct      = budgeted > 0 ? Math.round(actual / budgeted * 100) : 0;
    const barPct   = Math.min(100, pct);
    const barColor = pct >= 100 ? 'var(--danger)' : pct >= 80 ? 'var(--warning)' : 'var(--success)';
    const hasActual = actual > 0;
    const over = actual > budgeted && hasActual;
    const firstCat    = items[0] ? (items[0].category || 'Other') : 'Other';
    const headerColor = colors_e[firstCat] || window.colors.expense[firstCat] || '#94a3b8';

    html += `
    <div style="background:var(--surface);border:1px solid ${over ? 'var(--danger)' : 'var(--border)'};border-radius:10px;overflow:hidden">
      <!-- Always-visible title bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 14px;cursor:pointer;user-select:none;background:${headerColor}22;border-bottom:3px solid ${headerColor}" onclick="toggleGroupExpand('${group.id}')">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:20px">${group.icon}</span>
          <span style="font-weight:700;font-size:14px">${escHtml(group.name)}</span>
          <span style="font-size:11px;color:var(--text-muted)">${items.length} item${items.length !== 1 ? 's' : ''}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-weight:700;font-size:14px">${aud(budgeted)}<span style="font-size:11px;font-weight:400;color:var(--text-muted)">/mo</span></span>
          <span id="grp-arrow-${group.id}" style="color:var(--text-muted);font-size:11px;width:14px;text-align:center">▼</span>
        </div>
      </div>
      <!-- Always-visible progress bar -->
      <div style="padding:12px 14px;background:var(--surface2);border-top:1px solid var(--border)">
        <div style="background:var(--border);border-radius:99px;height:8px;overflow:hidden;margin-bottom:6px">
          <div style="height:100%;width:${barPct}%;background:${barColor};border-radius:99px"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:12px">
          <span style="color:${hasActual ? barColor : 'var(--text-muted)'}">
            ${hasActual ? `${aud(actual)} spent · ${pct}%${over ? ' — over budget!' : ''}` : 'No actuals entered yet'}
          </span>
          <span style="color:var(--text-muted)">${aud(budgeted)} budgeted</span>
        </div>
      </div>
      <!-- Collapsible items only -->
      <div id="grp-body-${group.id}" style="border-top:1px solid var(--border)">
        <div style="max-height:248px;overflow-y:auto">
        ${items.map(e => {
          const eMo    = itemMonthly(e);
          const eAct   = window.getActual(e.id, window.selectedBudgetMonth);
          const ePct   = eMo > 0 ? Math.min(100, Math.round(eAct / eMo * 100)) : 0;
          const eColor = colors_e[e.category || 'Other'] || window.colors.expense[e.category || 'Other'] || '#94a3b8';
          const eOver  = eAct > eMo && eAct > 0;
          const ringColor = eOver ? 'var(--danger)' : ePct >= 80 ? 'var(--warning)' : eAct > 0 ? eColor : 'var(--border)';
          const tipLabel = eAct > 0
            ? `${aud(eAct)} of ${aud(eMo)} · ${ePct}%${eOver ? ' over!' : ' used'}`
            : `No actuals · ${aud(eMo)} budgeted`;
          return `
          <div class="expense-row" style="--row-color:${eColor};display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border)">
            <div style="width:4px;height:36px;border-radius:2px;background:${eColor};flex-shrink:0"></div>
            <div style="flex:1;min-width:0;cursor:pointer" onclick="event.stopPropagation();openEditExpense(${e.id})">
              <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(e.name)}</div>
              <div style="font-size:11px;color:var(--text-muted)">${e.category || 'Other'}${e.vendor ? ` · ${escHtml(e.vendor)}` : ''} · ${freqDisplayItem(e)}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-right:4px">
              <div style="font-size:13px;font-weight:600">${aud(eMo)}/mo</div>
              ${eAct > 0
                ? `<div style="font-size:11px;font-weight:600;color:${eOver ? 'var(--danger)' : ePct >= 80 ? 'var(--warning)' : 'var(--success)'}">${aud(eAct)} actual${eOver ? ' ▲' : ''}</div>`
                : `<div style="font-size:11px;color:var(--text-muted);cursor:pointer" onclick="event.stopPropagation();window.editActual(${e.id})">+ add actual</div>`}
            </div>
            <div style="position:relative;flex-shrink:0;width:32px;height:32px;cursor:pointer"
                 onclick="event.stopPropagation();window.editActual(${e.id})"
                 onmouseenter="this.querySelector('svg').style.opacity='.25';this.querySelector('.ring-overlay').style.opacity='1'"
                 onmouseleave="this.querySelector('svg').style.opacity='1';this.querySelector('.ring-overlay').style.opacity='0'">
              <svg width="32" height="32" viewBox="0 0 36 36" style="transform:rotate(-90deg);transition:opacity .15s">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" stroke-width="3.5"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="${ringColor}" stroke-width="3.5"
                  stroke-dasharray="${ePct} 100" stroke-linecap="round"/>
              </svg>
              <div class="ring-overlay" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;transition:opacity .15s">
                <span style="font-size:9px;font-weight:700;color:${ringColor};line-height:1">${ePct}%</span>
              </div>
            </div>
          </div>`;
        }).join('')}
        </div>
      </div>
    </div>`;
  }
  html += '</div>';
  return html;
}

// ─────────────────────────────────────────────────

// Wallet allocation helpers — group expenses by category for the Betashares-style breakdown
export function _budgetAllocByCategory(monthData) {
  const expenses = (monthData.expenses || []).filter(e => !e.skipped);
  if (!expenses.length) return { segments: [], total: 0 };
  const byCategory = {};
  expenses.forEach(e => {
    const cat = e.category || 'Other';
    const amt = freqToMonthly(Number(e.amount) || 0, e.frequency);
    if (amt > 0) byCategory[cat] = (byCategory[cat] || 0) + amt;
  });
  const sorted = Object.entries(byCategory)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount);
  const total = sorted.reduce((s, c) => s + c.amount, 0);
  if (total === 0) return { segments: [], total: 0 };
  const top = sorted.slice(0, 6);
  const other = sorted.slice(6);
  const palette = ['#15803d', '#16a34a', '#22c55e', '#65a30d', '#84cc16', '#a3e635', '#94A3B8'];
  const segments = top.map((c, i) => ({
    name: c.name,
    amount: c.amount,
    pct: (c.amount / total) * 100,
    color: palette[i] || '#94A3B8'
  }));
  if (other.length) {
    const otherTotal = other.reduce((s, c) => s + c.amount, 0);
    segments.push({ name: 'Other', amount: otherTotal, pct: (otherTotal / total) * 100, color: palette[6] });
  }
  return { segments, total };
}

export const _TICKER_OVERRIDES = {
  'groceries':'GROC','grocery':'GROC','food':'FOOD','rent':'RENT','mortgage':'MORT',
  'fuel':'FUEL','petrol':'FUEL','transport':'TRSP','dining':'DINE','restaurants':'DINE',
  'eating out':'DINE','takeaway':'DINE','utilities':'UTIL','bills':'BILL','electricity':'ELEC',
  'gas':'GAS','water':'WATR','internet':'NET','phone':'PHNE','subscriptions':'SUBS',
  'streaming':'SUBS','insurance':'INSR','health':'HLTH','medical':'HLTH','savings':'SAVE',
  'entertainment':'ENT','travel':'TRVL','holiday':'TRVL','school':'EDU','education':'EDU',
  'kids':'KIDS','childcare':'KIDS','pets':'PETS','vehicle':'AUTO','car':'AUTO',
  'household':'HSE','clothing':'CLTH','gifts':'GIFT','charity':'GIVE','other':'OTHR'
};
export function _ticker(name) {
  const k = (name || 'other').toLowerCase().trim();
  if (_TICKER_OVERRIDES[k]) return _TICKER_OVERRIDES[k];
  return (name || 'OTHR').replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 4) || 'OTHR';
}
export function _categoryIcon(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('groc') || n.includes('food') || n.includes('supermarket')) return 'i-shopping-cart';
  if (n.includes('rent') || n.includes('mortgage') || n.includes('housing') || n.includes('home loan')) return 'i-home';
  if (n.includes('petrol') || n.includes('fuel') || n.includes('transport') || n.includes('uber') || n.includes('parking') || n.includes('toll')) return 'i-fuel';
  if (n.includes('dining') || n.includes('restaur') || n.includes('eat') || n.includes('takeaway')) return 'i-utensils';
  if (n.includes('utilit') || n.includes('electric') || n.includes('gas') || n.includes('water') || n.includes('internet') || n.includes('phone') || n.includes('bill')) return 'i-zap';
  if (n.includes('subscript') || n.includes('netflix') || n.includes('spotify') || n.includes('streaming')) return 'i-receipt';
  if (n.includes('vehicle') || n.includes('car') || n.includes('rego') || n.includes('motor') || n.includes('auto')) return 'i-car';
  if (n.includes('health') || n.includes('medic') || n.includes('pharm') || n.includes('doctor') || n.includes('dentist')) return 'i-pill';
  if (n.includes('insur')) return 'i-file-text';
  if (n.includes('school') || n.includes('education')) return 'i-clipboard-check';
  if (n.includes('kid') || n.includes('child')) return 'i-users';
  if (n.includes('pet')) return 'i-paw';
  if (n.includes('saving') || n.includes('invest')) return 'i-trophy';
  if (n.includes('travel') || n.includes('holiday')) return 'i-palm-tree';
  return 'i-receipt';
}

export function renderBudget() {
  try {
  const b = state.budget;
  const { income: mi, expenses: me } = window.getMonthData(window.selectedBudgetMonth);
  const totalIncome = monthlyTotal(mi);
  const totalBudgetExpenses = monthlyTotal(me);
  const surplus = totalIncome - totalBudgetExpenses;

  // Actuals for selected month
  const totalActual = me.reduce((sum, e) => sum + window.getActual(e.id, window.selectedBudgetMonth), 0);
  const totalVariance = totalBudgetExpenses - totalActual;

  const surplusClass = surplus >= 0 ? 'positive' : 'negative';
  const surplusLabel = surplus >= 0 ? 'Budget Surplus' : 'Budget Deficit';

  const daysInMonth = new Date(...selectedBudgetMonth.split('-').map((v,i) => i===1 ? v : +v), 0).getDate();
  const dayOfMonth = new Date().getDate();
  const pctMonth = Math.round(dayOfMonth / daysInMonth * 100);
  const spentPct = totalBudgetExpenses > 0 ? Math.round(totalActual / totalBudgetExpenses * 100) : 0;
  const prevMo = window.prevMonthStr(window.selectedBudgetMonth);

  let html = '';

  // ── Month picker — top of screen, drives all figures ──
  html += `
    <div class="wallet-month-bar">
      <button class="wallet-month-btn" onclick="window.prevMonth()">&#8249;</button>
      <div class="wallet-month-label">${window.monthLabel(window.selectedBudgetMonth)}</div>
      <button class="wallet-month-btn" onclick="window.nextMonth()">&#8250;</button>
    </div>`;

  // ── Summary hero card ──
  html += `
    <div class="summary-hero" onclick="toggleBudgetDetail()">
      <div class="summary-hero-label">${surplus >= 0 ? 'Monthly surplus' : 'Over budget'}</div>
      <div class="summary-hero-num">${aud(Math.abs(surplus))}</div>
      <div class="summary-hero-sub">${aud(totalIncome)} income · ${aud(totalBudgetExpenses)} expenses</div>
      <div class="summary-hero-expand" id="budget-expand-label">${_budgetDetailOpen ? 'Hide details ▲' : 'See breakdown ▼'}</div>
    </div>`;

  // Mini stat cards
  html += `
    <div class="summary-mini-grid">
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:#10b981">${aud(totalIncome)}</div>
        <div class="summary-mini-label">Income</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${aud(totalBudgetExpenses)}</div>
        <div class="summary-mini-label">Budgeted</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:${totalActual > totalBudgetExpenses ? '#ef4444' : '#18181b'}">${aud(totalActual)}</div>
        <div class="summary-mini-label">Actual spent</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${spentPct}%</div>
        <div class="summary-mini-label">of budget used</div>
      </div>
    </div>`;

  // ── Budget Allocation (collapsible) ──
  const alloc = _budgetAllocByCategory({ income: mi, expenses: me });
  if (alloc.segments.length) {
    const barHtml = alloc.segments.map(s => `<div style="background:${s.color};flex:${s.pct.toFixed(2)}"></div>`).join('');
    const listHtml = alloc.segments.map(s => {
      return `<div class="alloc-row">
        <div class="tdot" style="background:${s.color}"><svg viewBox="0 0 24 24"><use href="#${_categoryIcon(s.name)}"/></svg></div>
        <div class="body">
          <div class="ticker">${_ticker(s.name)}</div>
          <div class="name">${escHtml(s.name)}</div>
        </div>
        <div>
          <div class="pct">${Math.round(s.pct)}%</div>
          <div class="amt">${aud(s.amount)}</div>
        </div>
      </div>`;
    }).join('');
    html += `<div class="alloc-section" style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:${_allocExpanded?'12px':'0'}" onclick="_allocExpanded=!_allocExpanded;renderBudget()">
        <div class="alloc-title" style="margin-bottom:0">Budget Allocation</div>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)">${_allocExpanded?'▲':'▼'}</span>
      </div>
      <div class="alloc-bar" style="margin-bottom:${_allocExpanded?'12px':'0'}">${barHtml}</div>
      ${_allocExpanded ? `<div class="alloc-list">${listHtml}</div>` : ''}
      <div onclick="event.stopPropagation();_budgetDetailOpen=true;renderBudget();document.getElementById('budget-detail')?.scrollIntoView({behavior:'smooth',block:'start'})" style="margin-top:10px;text-align:center;font-size:12px;color:var(--iris-2);font-weight:500;cursor:pointer;font-family:var(--sans)">Manage income &amp; expenses in Detailed Breakdown ↓</div>
    </div>`;
  }

  // ── Detail panel (collapsible section) ──
  html += `<div class="alloc-section" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:${_budgetDetailOpen?'16px':'0'}" onclick="toggleBudgetDetail()">
      <div class="alloc-title" style="margin-bottom:0">Detailed Breakdown</div>
      <div style="display:flex;align-items:center;gap:10px">
        <button onclick="event.stopPropagation();openCsvImport()" style="padding:5px 12px;border-radius:99px;background:var(--purple-soft);color:var(--purple);border:none;font-size:12px;font-weight:600;cursor:pointer">Import</button>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)" id="budget-expand-chevron">${_budgetDetailOpen?'▲':'▼'}</span>
      </div>
    </div>
    <div class="detail-panel ${_budgetDetailOpen ? 'expanded' : 'collapsed'}" id="budget-detail" style="margin:0 -4px">`;

  const showCopyBanner = !window.isMonthCustomized(window.selectedBudgetMonth);
  if (showCopyBanner) {
    html += `<div style="display:flex;align-items:center;justify-content:space-between;background:var(--primary-light);border:1px solid #bfdbfe;border-radius:8px;padding:10px 16px;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div>
        <span style="font-size:13px;font-weight:600;color:var(--primary)">Using default budget</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="window.copyMonthFromPrevious('${window.selectedBudgetMonth}')">
        Copy from ${window.monthLabel(prevMo)}
      </button>
    </div>`;
  }

  // Planned events forecast widget
  html += renderBudgetForecast(window.selectedBudgetMonth, surplus);

  // Suggestion inbox (planner → budget approvals)
  html += renderBudgetSuggestions(window.selectedBudgetMonth);

  // Income — full width
  html += `
    <div class="section" style="margin-bottom:20px">
      <div class="section-header">
        <div>
          <div class="section-title">Income</div>
          <div class="section-subtitle">${aud(totalIncome)}/mo total</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddIncome()">+ Income</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Amount</th><th>Due</th><th>Repeats</th><th>Monthly</th><th></th></tr></thead>
          <tbody>
            ${mi.length === 0 ? `<tr><td colspan="6"><div class="empty"><div class="empty-icon">💵</div>Add your income sources</div></td></tr>` : mi.map(i => {
              const dueLabel = i.dueDate ? (() => { const [y,m,d] = i.dueDate.split('-'); return `${d}/${m}/${y}`; })() : '<span style="color:var(--text-muted)">—</span>';
              const incOneTimeBadge = i.recurring === false ? `<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>` : '';
              return `<tr>
              <td style="font-weight:500;border-left:4px solid ${window.colors.income}">${escHtml(i.name)}${incOneTimeBadge}</td>
              <td class="amount">${audD(i.amount)}</td>
              <td>${dueLabel}</td>
              <td style="color:var(--text-muted)">${freqDisplayItem(i)}</td>
              <td class="amount" style="color:var(--success)">${aud(itemMonthly(i))}/mo</td>
              <td class="actions">
                <button class="btn btn-ghost btn-sm" onclick="openEditIncome(${i.id})">✏️</button>
                <button class="btn btn-danger-ghost btn-sm" onclick="deleteIncome(${i.id})">🗑</button>
              </td>
            </tr>`;}).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Expenses with budget vs actual
  const hasActuals = totalActual > 0;

  // Category filter (table view only)
  const allCats = ['all', ...Array.from(new Set(me.map(e => e.category || 'Other'))).sort()];
  const filteredExpenses = window.expenseFilterCat === 'all' ? me : me.filter(e => (e.category || 'Other') === window.expenseFilterCat);
  const catBudget   = filteredExpenses.reduce((s, e) => s + itemMonthly(e), 0);
  const catActual   = filteredExpenses.reduce((s, e) => s + window.getActual(e.id, window.selectedBudgetMonth), 0);
  const catVariance = catBudget - catActual;
  const isFiltered  = window.expenseFilterCat !== 'all';

  html += `
    <div class="section">
      <div class="section-header">
        <div>
          <div class="section-title">Expenses</div>
          <div class="section-subtitle">
            Budget: ${aud(totalBudgetExpenses)}/mo
            ${totalActual > 0 ? ` · Actual: ${aud(totalActual)} · <span class="${totalVariance >= 0 ? 'var-under' : 'var-over'}">${totalVariance >= 0 ? '▼' : '▲'} ${aud(Math.abs(totalVariance))}</span>` : ''}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div style="display:flex;border:1px solid var(--border);border-radius:6px;overflow:hidden">
            <button onclick="setBudgetView('grouped')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;cursor:pointer;background:${window.budgetViewMode==='grouped'?'var(--primary)':'var(--surface)'};color:${window.budgetViewMode==='grouped'?'#fff':'var(--text-muted)'}">⊞ Groups</button>
            <button onclick="setBudgetView('table')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;border-left:1px solid var(--border);cursor:pointer;background:${window.budgetViewMode==='table'?'var(--primary)':'var(--surface)'};color:${window.budgetViewMode==='table'?'#fff':'var(--text-muted)'}">≡ Table</button>
          </div>
          ${window.budgetViewMode === 'table' ? `<select class="form-select" style="width:auto;padding:6px 10px;font-size:12px" onchange="window.setExpenseFilter(this.value)">
            ${allCats.map(c => `<option value="${c}" ${window.expenseFilterCat===c?'selected':''}>${c === 'all' ? 'All categories' : c}</option>`).join('')}
          </select>` : ''}
          <button class="btn btn-primary btn-sm" onclick="openAddExpense()">+ Expense</button>
        </div>
      </div>

      <div style="padding:16px 20px">
      ${window.budgetViewMode === 'grouped' ? renderExpenseGroups(me) : `
        <div class="table-wrap" style="margin:0 -20px">
          <table>
            <thead>
              <tr>
                ${window.thSort('name', 'Item')}
                ${window.thSort('category', 'Category')}
                ${window.thSort('frequency', 'Frequency')}
                ${window.thSort('due', 'Due')}
                ${window.thSort('budget', 'Budget/mo')}
                <th>Actual <span style="font-weight:400;text-transform:none;letter-spacing:0;font-size:10px;color:var(--text-muted)">(click to edit)</span></th>
                ${window.thSort('variance', 'Variance')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${filteredExpenses.length === 0
                ? `<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>${me.length === 0 ? 'Add your household expenses' : 'No expenses in this category'}</div></td></tr>`
                : (() => {
                    const sorted = [...filteredExpenses].sort((a, b) => {
                      if (!window.expenseSortCol) return 0;
                      let av, bv;
                      if (window.expenseSortCol === 'name')           { av = a.name.toLowerCase();                                    bv = b.name.toLowerCase(); }
                      else if (window.expenseSortCol === 'category')  { av = (a.category||'Other').toLowerCase();                     bv = (b.category||'Other').toLowerCase(); }
                      else if (window.expenseSortCol === 'frequency') { av = freqDisplayItem(a);                                      bv = freqDisplayItem(b); }
                      else if (window.expenseSortCol === 'due')       { av = a.dueDate || '\uffff';                                   bv = b.dueDate || '\uffff'; }
                      else if (window.expenseSortCol === 'budget')    { av = itemMonthly(a);                                          bv = itemMonthly(b); }
                      else if (window.expenseSortCol === 'actual')    { av = window.getActual(a.id, window.selectedBudgetMonth);                    bv = window.getActual(b.id, window.selectedBudgetMonth); }
                      else if (window.expenseSortCol === 'variance')  { av = itemMonthly(a)-window.getActual(a.id,window.selectedBudgetMonth);      bv = itemMonthly(b)-window.getActual(b.id,window.selectedBudgetMonth); }
                      else return 0;
                      return av < bv ? (window.expenseSortDir==='asc'?-1:1) : av > bv ? (window.expenseSortDir==='asc'?1:-1) : 0;
                    });
                    return sorted.map(e => {
                      const budgetMo = itemMonthly(e);
                      const actual   = window.getActual(e.id, window.selectedBudgetMonth);
                      const variance = budgetMo - actual;
                      const hasAct   = actual > 0;
                      let varianceHtml;
                      if (!hasAct) varianceHtml = `<span class="var-none">—</span>`;
                      else if (variance >= 0) varianceHtml = `<span class="var-under">▼ ${aud(variance)}</span>`;
                      else varianceHtml = `<span class="var-over">▲ ${aud(Math.abs(variance))}</span>`;
                      const dueLabel = e.dueDate ? (() => { const [y,mo,d] = e.dueDate.split('-'); return `${d}/${mo}/${y}`; })() : '<span style="color:var(--text-muted)">—</span>';
                      const rowColor = window.colors.expense[e.category || 'Other'] || '#94a3b8';
                      const oneTimeBadge = e.recurring === false ? `<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>` : '';
                      return `<tr>
                        <td style="font-weight:500;border-left:4px solid ${rowColor}">${escHtml(e.name)}${oneTimeBadge}${e.vendor ? `<br><span style="font-size:11px;font-weight:400;color:var(--text-muted)">${escHtml(e.vendor)}</span>` : ''}</td>
                        <td><span style="display:inline-block;padding:2px 10px;border-radius:99px;background:${rowColor};color:#fff;font-size:11px;font-weight:600;white-space:nowrap">${e.category || 'Other'}</span></td>
                        <td style="color:var(--text-muted)">${freqDisplayItem(e)}</td>
                        <td>${dueLabel}</td>
                        <td class="amount">${aud(budgetMo)}</td>
                        <td class="actual-cell amount" id="actual-${e.id}" onclick="window.editActual(${e.id})">${hasAct ? aud(actual) : '<span style="color:var(--text-muted);font-size:12px">+ add</span>'}</td>
                        <td>${varianceHtml}</td>
                        <td class="actions">
                          <button class="btn btn-ghost btn-sm" onclick="openEditExpense(${e.id})">✏️</button>
                          <button class="btn btn-danger-ghost btn-sm" onclick="deleteExpense(${e.id})">🗑</button>
                        </td>
                      </tr>`;
                    }).join('');
                  })()
              }
            </tbody>
            ${filteredExpenses.length > 0 ? `
            <tfoot>
              <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                <td colspan="4" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total ${isFiltered ? window.expenseFilterCat : 'all categories'}</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${aud(catBudget)}/mo</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${catActual > 0 ? aud(catActual) : '—'}</td>
                <td style="padding:11px 16px;font-weight:700">${catActual > 0 ? `<span class="${catVariance>=0?'var-under':'var-over'}">${catVariance>=0?'▼':'▲'} ${aud(Math.abs(catVariance))}</span>` : '—'}</td>
                <td></td>
              </tr>
            </tfoot>` : ''}
          </table>
        </div>`}
      </div>
    </div>
  `;

  // Close detail panel + wrapper section
  html += `</div></div>`; // end .detail-panel + .alloc-section

  document.getElementById('budget-content').innerHTML = html;
  } catch(e) {
    console.error('renderBudget error:', e);
    const el = document.getElementById('budget-content');
    if (el) el.innerHTML = `<div style="padding:24px;color:var(--alert);font-family:var(--mono);font-size:13px">Render error: ${escHtml(e.message)}<br><small>${escHtml(e.stack||'')}</small></div>`;
  }
}

export let _budgetDetailOpen = false;
export let _allocExpanded = false;
export function toggleBudgetDetail() {
  _budgetDetailOpen = !_budgetDetailOpen;
  const panel = document.getElementById('budget-detail');
  const heroLabel = document.getElementById('budget-expand-label');
  const chevron = document.getElementById('budget-expand-chevron');
  const wrapper = panel && panel.parentElement;
  if (panel) {
    panel.classList.toggle('collapsed', !_budgetDetailOpen);
    panel.classList.toggle('expanded', _budgetDetailOpen);
  }
  if (wrapper) wrapper.style.marginBottom = _budgetDetailOpen ? '16px' : '0';
  if (heroLabel) heroLabel.textContent = _budgetDetailOpen ? 'Hide details ▲' : 'See breakdown ▼';
  if (chevron) chevron.textContent = _budgetDetailOpen ? '▲' : '▼';
}

// ─────────────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────────────

export function openModal(title, bodyHtml, onSave) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-footer').innerHTML = `
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" id="modal-save-btn">Save</button>
  `;
  // Use onclick to avoid listener accumulation across multiple openModal calls
  window._modalSaveHandler = onSave;
  document.getElementById('modal-save-btn').onclick = () => window._modalSaveHandler?.();
  document.getElementById('modal-overlay').classList.remove('hidden');
}

export function closeModal() {
  window._pendingLogEntry = null;
  window._actualEditorRefresh = null;
  window._csvSuggestions = null;
  window._csvSuggestNames = null;
  document.getElementById('modal-body').innerHTML = '';
  document.getElementById('modal-footer').innerHTML = '';
  document.getElementById('modal-overlay').classList.add('hidden');
}

document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ─── Contract total ───────────────────────────────

export function openEditContractTotal() {
  openModal('Edit Contract Total', `
    <div class="form-group">
      <label class="form-label">Fixed Price Contract Total (AUD)</label>
      <input class="form-input" id="f-contract-total" type="number" max="99999999" value="${state.buildContract.total}" min="0">
    </div>
  `, () => {
    const v = parseFloat(document.getElementById('f-contract-total').value);
    if (!isNaN(v) && v > 0) {
      window.logActivity('Updated contract total', aud(v));
      state.buildContract.total = v;
      window.saveData(state);
      closeModal();
      window.renderAll();
    }
  });
}

// ─── Stages ───────────────────────────────────────

export function stageForm(s = {}) {
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Stage Name</label>
        <input class="form-input" id="f-stage-name" type="text" maxlength="200" value="${escAttr(s.name || '')}" placeholder="e.g. Base / Slab">
      </div>
      <div class="form-group">
        <label class="form-label">Amount (AUD)</label>
        <input class="form-input" id="f-stage-amount" type="number" max="99999999" value="${s.amount || ''}" min="0">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Expected Date</label>
        <input class="form-input" id="f-stage-expected" type="date" value="${s.expectedDate || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Paid Date</label>
        <input class="form-input" id="f-stage-paiddate" type="date" value="${s.paidDate || ''}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Invoice / Ref</label>
        <input class="form-input" id="f-stage-ref" type="text" maxlength="200" value="${escAttr(s.invoiceRef || '')}" placeholder="Optional">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="display:flex;align-items:center;gap:10px;padding-top:22px">
        <input type="checkbox" id="f-stage-paid" ${s.paid ? 'checked' : ''}>
        <label for="f-stage-paid" style="font-size:13px;cursor:pointer">Mark as paid</label>
      </div>
      <div class="form-group">
        <label class="form-label">Funding</label>
        <select class="form-select" id="f-stage-funding">
          <option value="loan"       ${(s.funding||'loan')==='loan'      ?'selected':''}>Loan</option>
          <option value="own-funds"  ${s.funding==='own-funds' ?'selected':''}>Own Funds</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-stage-notes" type="text" maxlength="200" value="${s.notes || ''}" placeholder="Optional">
    </div>
  `;
}

export function stageFromForm(id) {
  return {
    id,
    name:         document.getElementById('f-stage-name').value.trim(),
    amount:       parseFloat(document.getElementById('f-stage-amount').value) || 0,
    paid:         document.getElementById('f-stage-paid').checked,
    expectedDate: document.getElementById('f-stage-expected').value,
    paidDate:     document.getElementById('f-stage-paiddate').value,
    invoiceRef:   document.getElementById('f-stage-ref').value.trim(),
    funding:      document.getElementById('f-stage-funding').value,
    notes:        document.getElementById('f-stage-notes').value.trim(),
  };
}

export function openAddStage() {
  openModal('Add Contract Stage', stageForm(), () => {
    const s = stageFromForm(nextId(state.buildContract.stages));
    if (!s.name) return;
    window.logActivity('Added build stage', s.name);
    state.buildContract.stages.push(s);
    window.saveData(state); closeModal(); window.renderAll();
  });
}

export function openEditStage(id) {
  const s = state.buildContract.stages.find(x => x.id === id);
  openModal('Edit Stage', stageForm(s), () => {
    const updated = stageFromForm(id);
    window.logActivity('Edited build stage', updated.name || s.name);
    Object.assign(s, updated);
    window.saveData(state); closeModal(); window.renderAll();
  });
}

export function deleteStage(id) {
  if (!confirm('Delete this stage?')) return;
  const s = state.buildContract.stages.find(x => x.id === id);
  window.logActivity('Deleted build stage', s ? s.name : '');
  state.buildContract.stages = state.buildContract.stages.filter(s => s.id !== id);
  window.saveData(state); window.renderAll();
}

// ─── Variations ───────────────────────────────────

export function variationForm(v = {}) {
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Variation Ref</label>
        <input class="form-input" id="f-var-ref" type="text" maxlength="200" value="${escAttr(v.ref || '')}" placeholder="e.g. V001">
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-var-status">
          <option value="pending"  ${(v.status||'pending')==='pending'  ?'selected':''}>Pending</option>
          <option value="approved" ${v.status==='approved' ?'selected':''}>Approved</option>
          <option value="rejected" ${v.status==='rejected' ?'selected':''}>Rejected</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input class="form-input" id="f-var-name" type="text" maxlength="200" value="${escAttr(v.name || '')}" placeholder="e.g. Tile upgrade — master bathroom">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Amount (AUD)</label>
        <input class="form-input" id="f-var-amount" type="number" max="99999999" value="${v.amount !== undefined ? v.amount : ''}" placeholder="Use negative for credits">
      </div>
      <div class="form-group">
        <label class="form-label">Funding</label>
        <select class="form-select" id="f-var-funding">
          <option value="loan"      ${(v.funding||'loan')==='loan'     ?'selected':''}>Loan</option>
          <option value="own-funds" ${v.funding==='own-funds'?'selected':''}>Own Funds</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Date Raised</label>
        <input class="form-input" id="f-var-raised" type="date" value="${v.dateRaised || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Date Approved</label>
        <input class="form-input" id="f-var-approved" type="date" value="${v.dateApproved || ''}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-var-notes" type="text" maxlength="200" value="${escAttr(v.notes||'')}" placeholder="Optional">
    </div>
  `;
}

export function variationFromForm(id) {
  return {
    id,
    ref:          document.getElementById('f-var-ref').value.trim(),
    name:         document.getElementById('f-var-name').value.trim(),
    amount:       parseFloat(document.getElementById('f-var-amount').value) || 0,
    status:       document.getElementById('f-var-status').value,
    funding:      document.getElementById('f-var-funding').value,
    dateRaised:   document.getElementById('f-var-raised').value,
    dateApproved: document.getElementById('f-var-approved').value,
    notes:        document.getElementById('f-var-notes').value.trim(),
  };
}

export function openAddVariation() {
  openModal('Add Variation', variationForm(), () => {
    const v = variationFromForm(nextId(state.buildContract.variations));
    if (!v.name) return;
    window.logActivity('Added variation', `${v.ref ? v.ref+' · ' : ''}${v.name}`);
    state.buildContract.variations.push(v);
    window.saveData(state); renderBuild();
  });
}

export function openEditVariation(id) {
  const v = state.buildContract.variations.find(x => x.id === id);
  openModal('Edit Variation', variationForm(v), () => {
    const updated = variationFromForm(id);
    if (!updated.name) return;
    window.logActivity('Edited variation', `${updated.ref ? updated.ref+' · ' : ''}${updated.name}`);
    const idx = state.buildContract.variations.findIndex(x => x.id === id);
    if (idx !== -1) state.buildContract.variations[idx] = updated;
    window.saveData(state); renderBuild();
  });
}

export function deleteVariation(id) {
  if (!confirm('Delete this variation?')) return;
  const v = state.buildContract.variations.find(x => x.id === id);
  window.logActivity('Deleted variation', v ? v.name : '');
  state.buildContract.variations = state.buildContract.variations.filter(x => x.id !== id);
  window.saveData(state); renderBuild();
}

// ─── Extras ───────────────────────────────────────

export const EXTRA_STATUSES = [
  { value: 'not-quoted', label: 'Not Quoted' },
  { value: 'quoted',     label: 'Quoted' },
  { value: 'approved',   label: 'Approved' },
  { value: 'partial',    label: 'Partially Paid' },
  { value: 'paid',       label: 'Paid' },
];

export function extraForm(e = {}) {
  const currentStatus = e.status || (e.totalAmount ? 'approved' : 'not-quoted');
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-extra-name" type="text" maxlength="200" value="${escAttr(e.name || '')}" placeholder="e.g. Solar">
      </div>
      <div class="form-group">
        <label class="form-label">Vendor / Contractor</label>
        <input class="form-input" id="f-extra-vendor" type="text" maxlength="200" value="${escAttr(e.vendor || '')}" placeholder="Company name">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-extra-status">
          ${EXTRA_STATUSES.map(s => `<option value="${s.value}" ${currentStatus === s.value ? 'selected' : ''}>${s.label}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Due Date</label>
        <input class="form-input" id="f-extra-due" type="date" value="${e.dueDate || ''}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Total Cost (AUD)</label>
        <input class="form-input" id="f-extra-total" type="number" max="99999999" value="${e.totalAmount || ''}" min="0" placeholder="Leave blank if TBC">
      </div>
      <div class="form-group">
        <label class="form-label">Amount Paid (AUD)</label>
        <input class="form-input" id="f-extra-paid" type="number" max="99999999" value="${e.amountPaid || ''}" min="0">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Funding</label>
        <select class="form-select" id="f-extra-funding">
          <option value="loan"      ${(e.funding||'loan')==='loan'     ?'selected':''}>Loan</option>
          <option value="own-funds" ${e.funding==='own-funds'?'selected':''}>Own Funds</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <input class="form-input" id="f-extra-notes" type="text" maxlength="200" value="${escAttr(e.notes || '')}" placeholder="Optional">
      </div>
    </div>
  `;
}

export function extraFromForm(id) {
  return {
    id,
    name:        document.getElementById('f-extra-name').value.trim(),
    vendor:      document.getElementById('f-extra-vendor').value.trim(),
    status:      document.getElementById('f-extra-status').value,
    funding:     document.getElementById('f-extra-funding').value,
    totalAmount: parseFloat(document.getElementById('f-extra-total').value) || 0,
    amountPaid:  parseFloat(document.getElementById('f-extra-paid').value) || 0,
    dueDate:     document.getElementById('f-extra-due').value,
    notes:       document.getElementById('f-extra-notes').value.trim(),
  };
}

export function openAddExtra() {
  openModal('Add Outside Contract Item', extraForm(), () => {
    const e = extraFromForm(nextId(state.extras));
    if (!e.name) return;
    window.logActivity('Added extra item', e.name);
    state.extras.push(e);
    window.saveData(state); closeModal(); window.renderAll();
  });
}

export function openEditExtra(id) {
  const e = state.extras.find(x => x.id === id);
  openModal('Edit Item', extraForm(e), () => {
    const updated = extraFromForm(id);
    window.logActivity('Edited extra item', updated.name || e.name);
    Object.assign(e, updated);
    window.saveData(state); closeModal(); window.renderAll();
  });
}

export function deleteExtra(id) {
  if (!confirm('Delete this item?')) return;
  const e = state.extras.find(x => x.id === id);
  window.logActivity('Deleted extra item', e ? e.name : '');
  state.extras = state.extras.filter(e => e.id !== id);
  window.saveData(state); window.renderAll();
}

// ─── Income ───────────────────────────────────────

export function incomeForm(i = {}) {
  const displayDate = i.dueDate ? (() => { const [y,m,d] = i.dueDate.split('-'); return `${d}/${m}/${y}`; })() : '';
  const REPEATS = ['weekly','fortnightly','monthly','quarterly','annually','custom'];
  const isCustom = i.frequency === 'custom';
  return `
    <div class="form-group">
      <label class="form-label">Source / Description</label>
      <input class="form-input" id="f-inc-name" type="text" maxlength="200" value="${escAttr(i.name || '')}" placeholder="e.g. Salary — Chris">
    </div>
    <div class="form-group">
      <label class="form-label">Amount (AUD)</label>
      <input class="form-input" id="f-inc-amount" type="number" max="99999999" value="${i.amount || ''}" min="0">
    </div>
    <div class="form-group">
      <label class="form-label">Frequency</label>
      <select class="form-select" id="f-inc-freq" onchange="toggleCustomFreq('inc')">
        ${REPEATS.map(f => `<option value="${f}" ${(i.frequency||'monthly')===f?'selected':''}>${f === 'custom' ? 'Custom' : f.charAt(0).toUpperCase()+f.slice(1)}</option>`).join('')}
      </select>
      <div id="f-inc-custom-wrap" style="display:${isCustom ? 'flex' : 'none'};align-items:center;gap:8px;margin-top:8px">
        <span style="font-size:13px;color:var(--text-muted);white-space:nowrap">Every</span>
        <input class="form-input" id="f-inc-custom-n" type="number" max="99999999" min="1" value="${i.customEvery || ''}" style="width:70px" placeholder="e.g. 10">
        <select class="form-select" id="f-inc-custom-unit" style="flex:1">
          <option value="weeks" ${(i.customUnit||'weeks')==='weeks'?'selected':''}>weeks</option>
          <option value="months" ${i.customUnit==='months'?'selected':''}>months</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Due Date</label>
      <input type="hidden" id="f-inc-duedate" value="${i.dueDate || ''}">
      <div class="date-picker-wrap" id="dp-wrap">
        <div class="date-picker-trigger${i.dueDate ? ' has-value' : ''}" id="dp-trigger" onclick="openDatePicker(event)">
          <span id="dp-display">${displayDate || 'Select a date'}</span>
          <span style="opacity:0.5;font-size:15px">&#128197;</span>
        </div>
        <div class="date-picker-popup hidden" id="dp-popup"></div>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:0">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none">
        <input type="checkbox" id="f-inc-recurring" ${i.recurring === false ? '' : 'checked'} style="width:16px;height:16px;cursor:pointer">
        <span style="font-size:13px;font-weight:500">Recurring — carry forward to future months</span>
      </label>
      <p style="font-size:12px;color:var(--text-muted);margin-top:4px;margin-left:24px">Uncheck for one-time income that shouldn't copy forward.</p>
    </div>
  `;
}

export function incomeFromForm(id) {
  const freq = document.getElementById('f-inc-freq') ? document.getElementById('f-inc-freq').value : 'monthly';
  const recurringEl = document.getElementById('f-inc-recurring');
  const obj = {
    id,
    name:      document.getElementById('f-inc-name').value.trim(),
    amount:    parseFloat(document.getElementById('f-inc-amount').value) || 0,
    frequency: freq,
    dueDate:   document.getElementById('f-inc-duedate').value || null,
    recurring: recurringEl ? recurringEl.checked : true,
  };
  if (freq === 'custom') {
    obj.customEvery = parseInt(document.getElementById('f-inc-custom-n').value) || 1;
    obj.customUnit  = document.getElementById('f-inc-custom-unit').value;
  }
  return obj;
}

export function openAddIncome() {
  openModal('Add Income', incomeForm(), () => {
    const item = incomeFromForm(nextId(window.getMonthData(window.selectedBudgetMonth).income));
    if (!item.name) return;
    window.logActivity('Added income', item.name);
    window.confirmScope(
      () => {
        const mb = window.ensureMonthOverride(window.selectedBudgetMonth);
        item.id = nextId(mb.income);
        mb.income.push(item);
        window.saveData(state); window.renderAll();
      },
      () => {
        item.id = nextId(state.budget.income);
        state.budget.income.push(item);
        window.saveData(state); window.renderAll();
      }
    );
  });
}

export function openEditIncome(id) {
  const src = window.getMonthData(window.selectedBudgetMonth).income.find(x => x.id === id);
  openModal('Edit Income', incomeForm(src), () => {
    const updated = incomeFromForm(id);
    window.logActivity('Edited income', updated.name || (src && src.name) || '');
    window.confirmScope(
      () => {
        const mb = window.ensureMonthOverride(window.selectedBudgetMonth);
        const item = mb.income.find(x => x.id === id);
        if (item) Object.assign(item, updated); else mb.income.push(updated);
        window.saveData(state); window.renderAll();
      },
      () => {
        const item = state.budget.income.find(x => x.id === id);
        if (item) Object.assign(item, updated);
        window.saveData(state); window.renderAll();
      }
    );
  });
}

export function deleteIncome(id) {
  const src = window.getMonthData(window.selectedBudgetMonth).income.find(x => x.id === id);
  const name = src ? src.name : 'this income';
  window.logActivity('Deleted income', name);
  window._scopePending = null;
  document.getElementById('modal-title').textContent = 'Delete income';
  document.getElementById('modal-body').innerHTML = `
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Delete <strong style="color:var(--text)">${name}</strong>? Apply to
      <strong style="color:var(--text)">${window.monthLabel(window.selectedBudgetMonth)}</strong> only,
      or remove from all months?
    </p>`;
  window._scopePending = {
    onThisMonth: () => {
      const mb = window.ensureMonthOverride(window.selectedBudgetMonth);
      mb.income = mb.income.filter(i => i.id !== id);
      window.saveData(state); window.renderAll();
    },
    onAllMonths: () => {
      state.budget.income = state.budget.income.filter(i => i.id !== id);
      if (state.budget.months) Object.values(state.budget.months).forEach(m => { m.income = m.income.filter(i => i.id !== id); });
      window.saveData(state); window.renderAll();
    }
  };
  document.getElementById('modal-footer').innerHTML = `
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="window.doScopeAll()">Remove from all months</button>
    <button class="btn btn-danger" onclick="window.doScopeMonth()">Delete from ${window.monthLabel(window.selectedBudgetMonth)}</button>
  `;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

// ─── Expenses ─────────────────────────────────────

export function expenseForm(e = {}) {
  const displayDate = e.dueDate ? (() => { const [y,m,d] = e.dueDate.split('-'); return `${d}/${m}/${y}`; })() : '';
  const REPEATS = ['weekly','fortnightly','monthly','quarterly','annually','custom'];
  const isCustom = e.frequency === 'custom';
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Description</label>
        <input class="form-input" id="f-exp-name" type="text" maxlength="200" value="${escAttr(e.name || '')}" placeholder="e.g. Mortgage">
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="f-exp-cat">
          ${expenseCategories().map(c => `<option value="${c}" ${(e.category||'Other')===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Vendor <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="f-exp-vendor" type="text" maxlength="200" value="${escAttr(e.vendor || '')}" placeholder="e.g. ANZ, Woolworths, Netflix">
    </div>
    <div class="form-group">
      <label class="form-label">Amount (AUD)</label>
      <input class="form-input" id="f-exp-amount" type="number" max="99999999" value="${e.amount || ''}" min="0">
    </div>
    <div class="form-group">
      <label class="form-label">Frequency</label>
      <select class="form-select" id="f-exp-freq" onchange="toggleCustomFreq('exp')">
        ${REPEATS.map(f => `<option value="${f}" ${(e.frequency||'monthly')===f?'selected':''}>${f === 'custom' ? 'Custom' : f.charAt(0).toUpperCase()+f.slice(1)}</option>`).join('')}
      </select>
      <div id="f-exp-custom-wrap" style="display:${isCustom ? 'flex' : 'none'};align-items:center;gap:8px;margin-top:8px">
        <span style="font-size:13px;color:var(--text-muted);white-space:nowrap">Every</span>
        <input class="form-input" id="f-exp-custom-n" type="number" max="99999999" min="1" value="${e.customEvery || ''}" style="width:70px" placeholder="e.g. 10">
        <select class="form-select" id="f-exp-custom-unit" style="flex:1">
          <option value="weeks" ${(e.customUnit||'weeks')==='weeks'?'selected':''}>weeks</option>
          <option value="months" ${e.customUnit==='months'?'selected':''}>months</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Due Date</label>
      <input type="hidden" id="f-exp-duedate" value="${e.dueDate || ''}">
      <div class="date-picker-wrap" id="dp-wrap">
        <div class="date-picker-trigger${e.dueDate ? ' has-value' : ''}" id="dp-trigger" onclick="openDatePicker(event)">
          <span id="dp-display">${displayDate || 'Select a date'}</span>
          <span style="opacity:0.5;font-size:15px">&#128197;</span>
        </div>
        <div class="date-picker-popup hidden" id="dp-popup"></div>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:0">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none">
        <input type="checkbox" id="f-exp-recurring" ${e.recurring === false ? '' : 'checked'} style="width:16px;height:16px;cursor:pointer">
        <span style="font-size:13px;font-weight:500">Recurring — carry forward to future months</span>
      </label>
      <p style="font-size:12px;color:var(--text-muted);margin-top:4px;margin-left:24px">Uncheck for one-time expenses that shouldn't copy forward.</p>
    </div>
  `;
}

export function expenseFromForm(id) {
  const freq = document.getElementById('f-exp-freq') ? document.getElementById('f-exp-freq').value : 'monthly';
  const recurringEl = document.getElementById('f-exp-recurring');
  const obj = {
    id,
    name:      document.getElementById('f-exp-name').value.trim(),
    category:  document.getElementById('f-exp-cat').value,
    vendor:    (document.getElementById('f-exp-vendor')?.value || '').trim() || null,
    amount:    parseFloat(document.getElementById('f-exp-amount').value) || 0,
    frequency: freq,
    dueDate:   document.getElementById('f-exp-duedate').value || null,
    recurring: recurringEl ? recurringEl.checked : true,
  };
  if (freq === 'custom') {
    obj.customEvery = parseInt(document.getElementById('f-exp-custom-n').value) || 1;
    obj.customUnit  = document.getElementById('f-exp-custom-unit').value;
  }
  return obj;
}

export function toggleCustomFreq(prefix) {
  const val = document.getElementById(`f-${prefix}-freq`).value;
  const wrap = document.getElementById(`f-${prefix}-custom-wrap`);
  if (wrap) wrap.style.display = val === 'custom' ? 'flex' : 'none';
}

export function openAddExpense() {
  openModal('Add Expense', expenseForm(), () => {
    const item = expenseFromForm(nextId(window.getMonthData(window.selectedBudgetMonth).expenses));
    if (!item.name) return;
    window.logActivity('Added expense', `${item.name} (${item.category || 'Other'})`);
    window.confirmScope(
      () => {
        const mb = window.ensureMonthOverride(window.selectedBudgetMonth);
        item.id = nextId(mb.expenses);
        mb.expenses.push(item);
        window.saveData(state); window.renderAll();
      },
      () => {
        item.id = nextId(state.budget.expenses);
        state.budget.expenses.push(item);
        // Also add to current month's override so it appears immediately
        if (window.isMonthCustomized(window.selectedBudgetMonth)) {
          const mb = state.budget.months[window.selectedBudgetMonth];
          mb.expenses.push({ ...item, id: nextId(mb.expenses) });
        }
        window.saveData(state); window.renderAll();
      }
    );
  });
}

export function openEditExpense(id) {
  const src = window.getMonthData(window.selectedBudgetMonth).expenses.find(x => x.id === id);
  openModal('Edit Expense', expenseForm(src), () => {
    const updated = expenseFromForm(id);
    window.logActivity('Edited expense', `${updated.name || (src && src.name) || ''} (${updated.category || 'Other'})`);
    window.confirmScope(
      () => {
        const mb = window.ensureMonthOverride(window.selectedBudgetMonth);
        const item = mb.expenses.find(x => x.id === id);
        if (item) Object.assign(item, updated); else mb.expenses.push(updated);
        window.saveData(state); window.renderAll();
      },
      () => {
        const item = state.budget.expenses.find(x => x.id === id);
        if (item) Object.assign(item, updated);
        // Also update current month's override if it exists
        if (window.isMonthCustomized(window.selectedBudgetMonth)) {
          const mb = state.budget.months[window.selectedBudgetMonth];
          const mItem = mb.expenses.find(x => x.id === id);
          if (mItem) Object.assign(mItem, updated);
        }
        window.saveData(state); window.renderAll();
      }
    );
  });
  // Inject delete button at the start of the footer
  const delBtn = document.createElement('button');
  delBtn.className = 'btn btn-danger';
  delBtn.textContent = 'Delete';
  delBtn.style.marginRight = 'auto';
  delBtn.onclick = () => { closeModal(); deleteExpense(id); };
  const footer = document.getElementById('modal-footer');
  footer.insertBefore(delBtn, footer.firstChild);
}

export function deleteExpense(id) {
  const src = window.getMonthData(window.selectedBudgetMonth).expenses.find(x => x.id === id);
  const name = src ? src.name : 'this expense';
  window.logActivity('Deleted expense', name);
  window._scopePending = {
    onThisMonth: () => {
      const mb = window.ensureMonthOverride(window.selectedBudgetMonth);
      mb.expenses = mb.expenses.filter(e => e.id !== id);
      window.saveData(state); window.renderAll();
    },
    onAllMonths: () => {
      state.budget.expenses = state.budget.expenses.filter(e => e.id !== id);
      if (state.budget.months) Object.values(state.budget.months).forEach(m => { m.expenses = m.expenses.filter(e => e.id !== id); });
      window.saveData(state); window.renderAll();
    }
  };
  document.getElementById('modal-title').textContent = 'Delete expense';
  document.getElementById('modal-body').innerHTML = `
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Delete <strong style="color:var(--text)">${name}</strong>? Apply to
      <strong style="color:var(--text)">${window.monthLabel(window.selectedBudgetMonth)}</strong> only,
      or remove from all months?
    </p>`;
  document.getElementById('modal-footer').innerHTML = `
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="window.doScopeAll()">Remove from all months</button>
    <button class="btn btn-danger" onclick="window.doScopeMonth()">Delete from ${window.monthLabel(window.selectedBudgetMonth)}</button>
  `;
  document.getElementById('modal-overlay').classList.remove('hidden');
}


// ─────────────────────────────────────────────────

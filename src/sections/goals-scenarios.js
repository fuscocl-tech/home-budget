// Goals and Scenarios section
import { state } from '../store.js';
import { aud, audD, escHtml, escAttr, fmtDate, monthlyTotal, itemMonthly, nextId } from './format.js';
import { freqToMonthly } from '../utils.js';


export function renderGoals() {
  const goals = state.goals;
  const active = goals.filter(g => g.status === 'active');
  const achieved = goals.filter(g => g.status === 'achieved');

  let html = '';

  if (goals.length > 0) {
    html += `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:24px">
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700;color:var(--primary)">${active.length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Active goals</div>
        </div>
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700;color:var(--success)">${achieved.length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Achieved</div>
        </div>
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700">${goals.filter(g=>g.type==='spending'&&g.status==='active').length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Spending limits</div>
        </div>
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700">${goals.filter(g=>g.type==='savings'&&g.status==='active').length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Savings targets</div>
        </div>
      </div>`;
  }

  // Group: active first, then achieved, then abandoned
  const grouped = [
    ...goals.filter(g => g.status === 'active'),
    ...goals.filter(g => g.status === 'achieved'),
    ...goals.filter(g => g.status === 'abandoned'),
  ];

  html += `<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary" onclick="openAddGoal()">+ New Goal</button>
  </div>`;

  if (grouped.length === 0) {
    const curData = window.getMonthData(window.selectedBudgetMonth);
    const surplus = monthlyTotal(curData.income) - monthlyTotal(curData.expenses);
    const surplusHtml = surplus > 0
      ? `<div style="font-size:14px;color:#64748b;margin-bottom:4px">You have <strong style="color:#16a34a">${aud(surplus)}</strong> surplus each month.</div>
         <div style="font-size:13px;color:#64748b;margin-bottom:20px">Put it to work — set a goal and watch your progress.</div>`
      : `<div style="font-size:13px;color:#64748b;margin-bottom:20px">Set a goal and start working towards it.</div>`;
    const quickGoals = [
      { emoji:'🏖️', label:'Holiday fund' },
      { emoji:'🏠', label:'Renovation' },
      { emoji:'🆘', label:'Emergency fund' },
    ];
    const chips = quickGoals.map(g =>
      `<button onclick="openAddGoal()" style="padding:8px 14px;background:#ecfeff;border:1.5px solid #0891b2;border-radius:99px;font-size:12px;font-weight:600;color:#0891b2;cursor:pointer">${g.emoji} ${g.label}</button>`
    ).join('');
    html += `
      <div style="background:#fff;border:2px dashed #cbd5e1;border-radius:16px;padding:36px 24px;text-align:center;margin-top:8px">
        <div style="font-size:44px;margin-bottom:14px">🎯</div>
        <div style="font-size:17px;font-weight:700;color:#1e293b;margin-bottom:8px">No goals yet</div>
        ${surplusHtml}
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px">
          ${chips}
          <button onclick="openAddGoal()" style="padding:8px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:99px;font-size:12px;color:#64748b;cursor:pointer">+ Custom goal</button>
        </div>
        <button onclick="openAddGoal()" style="background:#0891b2;color:#fff;border:none;border-radius:10px;padding:12px 28px;font-size:14px;font-weight:600;cursor:pointer">Add my first goal →</button>
      </div>`;
  } else {
    grouped.forEach(g => {
      const typeInfo = GOAL_TYPES.find(t => t.value === g.type) || GOAL_TYPES[0];
      const prog = goalProgress(g);
      const statusBadge = {
        active:    `<span class="badge" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe">Active</span>`,
        achieved:  `<span class="badge paid">Achieved</span>`,
        abandoned: `<span class="badge" style="background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0">Abandoned</span>`,
      }[g.status] || '';

      const deadline = g.deadline ? (() => {
        const [y,m,d] = g.deadline.split('-');
        const daysLeft = Math.ceil((new Date(g.deadline) - new Date()) / 86400000);
        const label = `${d}/${m}/${y}`;
        if (daysLeft < 0) return `<span style="color:var(--danger)">${label} (overdue)</span>`;
        if (daysLeft <= 30) return `<span style="color:var(--warning,#f59e0b)">${label} (${daysLeft}d left)</span>`;
        return label;
      })() : '—';

      let progressHtml = '';
      if (prog.pct !== null) {
        const fillColor = g.type === 'spending'
          ? (prog.ok ? 'var(--success)' : 'var(--danger)')
          : 'var(--primary)';
        const pctDisplay = g.type === 'spending'
          ? (prog.ok ? `✓ Under limit` : `${Math.round(prog.pct)}% of limit`)
          : `${Math.round(prog.pct)}%`;
        progressHtml = `
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${Math.min(100,prog.pct)}%;background:${fillColor}"></div>
          </div>
          <div class="progress-label">
            <span>${prog.label}</span>
            <span style="font-weight:600;color:${fillColor}">${pctDisplay}</span>
          </div>`;
      } else {
        progressHtml = `<div style="font-size:12px;color:var(--text-muted);margin-top:8px">No actuals recorded yet</div>`;
      }

      html += `
        <div class="goal-card" style="opacity:${g.status==='abandoned'?'0.6':'1'}">
          <div class="goal-card-header">
            <div>
              <div class="goal-card-title">${typeInfo.icon} ${escHtml(g.name)}</div>
              <div class="goal-card-meta">
                ${typeInfo.label}${g.category ? ` · ${g.category}` : ''} · Target date: ${deadline}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
              ${statusBadge}
              ${g.status === 'active' ? `<button class="btn btn-ghost btn-sm" title="Mark achieved" onclick="markGoalAchieved(${g.id})">✓</button>` : ''}
              <button class="btn btn-ghost btn-sm" onclick="openEditGoal(${g.id})">✏️</button>
              <button class="btn btn-danger-ghost btn-sm" onclick="deleteGoal(${g.id})">🗑</button>
            </div>
          </div>
          ${progressHtml}
          ${g.notes ? `<div style="font-size:12px;color:var(--text-muted);margin-top:8px">${escHtml(g.notes)}</div>` : ''}
        </div>`;
    });
  }

  document.getElementById('goals-content').innerHTML = html;
}

export function goalForm(g = {}) {
  const type = g.type || 'spending';
  return `
    <div class="form-group">
      <label class="form-label">Goal Name</label>
      <input class="form-input" id="f-goal-name" type="text" maxlength="200" value="${escAttr(g.name || '')}" placeholder="e.g. Cut dining out">
    </div>
    <div class="form-group">
      <label class="form-label">Type</label>
      <select class="form-select" id="f-goal-type" onchange="toggleGoalFields()">
        ${GOAL_TYPES.map(t => `<option value="${t.value}" ${type===t.value?'selected':''}>${t.icon} ${t.label}</option>`).join('')}
      </select>
    </div>
    <div id="goal-spending-fields" style="display:${type==='spending'?'':'none'}">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Expense Category</label>
          <select class="form-select" id="f-goal-category">
            ${expenseCategories().map(c => `<option value="${c}" ${g.category===c?'selected':''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Monthly Limit (AUD)</label>
          <input class="form-input" id="f-goal-target-monthly" type="number" max="99999999" min="0" value="${g.targetMonthly||''}" placeholder="e.g. 300">
        </div>
      </div>
    </div>
    <div id="goal-savings-fields" style="display:${type==='savings'?'':'none'}">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Target Amount (AUD)</label>
          <input class="form-input" id="f-goal-target-total" type="number" max="99999999" min="0" value="${g.targetTotal||''}" placeholder="e.g. 50000">
        </div>
        <div class="form-group">
          <label class="form-label">Currently Saved (AUD)</label>
          <input class="form-input" id="f-goal-current-saved" type="number" max="99999999" min="0" value="${g.currentSaved||''}" placeholder="0">
        </div>
      </div>
    </div>
    <div id="goal-income-fields" style="display:${type==='income'?'':'none'}">
      <div class="form-group">
        <label class="form-label">Target Monthly Income (AUD)</label>
        <input class="form-input" id="f-goal-target-monthly-inc" type="number" max="99999999" min="0" value="${g.targetMonthly||''}" placeholder="e.g. 8000">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Target Date</label>
        <input class="form-input" id="f-goal-deadline" type="date" value="${g.deadline||''}">
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-goal-status">
          <option value="active"    ${(g.status||'active')==='active'?'selected':''}>Active</option>
          <option value="achieved"  ${g.status==='achieved'?'selected':''}>Achieved</option>
          <option value="abandoned" ${g.status==='abandoned'?'selected':''}>Abandoned</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-goal-notes" type="text" maxlength="200" value="${escAttr(g.notes||'')}" placeholder="Optional notes">
    </div>
  `;
}

export function toggleGoalFields() {
  const type = document.getElementById('f-goal-type').value;
  document.getElementById('goal-spending-fields').style.display = type === 'spending' ? '' : 'none';
  document.getElementById('goal-savings-fields').style.display  = type === 'savings'  ? '' : 'none';
  document.getElementById('goal-income-fields').style.display   = type === 'income'   ? '' : 'none';
}

export function goalFromForm(id) {
  const type = document.getElementById('f-goal-type').value;
  const obj = {
    id,
    name:     document.getElementById('f-goal-name').value.trim(),
    type,
    status:   document.getElementById('f-goal-status').value,
    deadline: document.getElementById('f-goal-deadline').value || null,
    notes:    document.getElementById('f-goal-notes').value.trim(),
  };
  if (type === 'spending') {
    obj.category      = document.getElementById('f-goal-category').value;
    obj.targetMonthly = parseFloat(document.getElementById('f-goal-target-monthly').value) || 0;
  }
  if (type === 'savings') {
    obj.targetTotal    = parseFloat(document.getElementById('f-goal-target-total').value) || 0;
    obj.currentSaved   = parseFloat(document.getElementById('f-goal-current-saved').value) || 0;
  }
  if (type === 'income') {
    obj.targetMonthly = parseFloat(document.getElementById('f-goal-target-monthly-inc').value) || 0;
  }
  return obj;
}

export function openAddGoal() {
  window.openModal('New Goal', goalForm(), () => {
    const g = goalFromForm(nextId(state.goals));
    if (!g.name) return;
    state.goals.push(g);
    window.saveData(state); window.closeModal(); renderGoals();
  });
}

export function openEditGoal(id) {
  const g = state.goals.find(x => x.id === id);
  window.openModal('Edit Goal', goalForm(g), () => {
    Object.assign(g, goalFromForm(id));
    window.saveData(state); window.closeModal(); renderGoals();
  });
}

export function deleteGoal(id) {
  if (!confirm('Delete this goal?')) return;
  state.goals = state.goals.filter(g => g.id !== id);
  window.saveData(state); renderGoals();
}

export function markGoalAchieved(id) {
  const g = state.goals.find(x => x.id === id);
  if (g) { g.status = 'achieved'; window.saveData(state); renderGoals(); }
}

// ─────────────────────────────────────────────────
// SCENARIOS
// ─────────────────────────────────────────────────

let openScenarioId = null;

export const ADJ_TYPES = [
  { value: 'add-income',     label: 'Add income source',      icon: '💰' },
  { value: 'remove-income',  label: 'Remove income source',   icon: '➖' },
  { value: 'reduce-income',  label: 'Reduce income amount',   icon: '📉' },
  { value: 'add-expense',    label: 'Add new expense',        icon: '➕' },
  { value: 'remove-expense', label: 'Remove expense',         icon: '✂️' },
  { value: 'reduce-expense', label: 'Reduce expense amount',  icon: '📉' },
];

export function calcScenario(scenario) {
  const base = window.getMonthData(window.selectedBudgetMonth);
  let income   = JSON.parse(JSON.stringify(base.income));
  let expenses = JSON.parse(JSON.stringify(base.expenses));

  (scenario.adjustments || []).forEach(adj => {
    if (adj.type === 'add-income') {
      income.push({ id: -(adj.id||0), name: adj.name, amount: adj.amount||0, frequency: adj.frequency||'monthly' });
    } else if (adj.type === 'remove-income') {
      income = income.filter(i => i.id !== adj.itemId);
    } else if (adj.type === 'reduce-income') {
      const i = income.find(x => x.id === adj.itemId);
      if (i) i.amount = adj.changeType === 'percent'
        ? Math.max(0, i.amount * (1 - adj.changeAmount/100))
        : Math.max(0, i.amount - (adj.changeAmount||0));
    } else if (adj.type === 'add-expense') {
      expenses.push({ id: -(adj.id||0), name: adj.name, amount: adj.amount||0, frequency: adj.frequency||'monthly', category: adj.category||'Other' });
    } else if (adj.type === 'remove-expense') {
      expenses = expenses.filter(e => e.id !== adj.itemId);
    } else if (adj.type === 'reduce-expense') {
      const e = expenses.find(x => x.id === adj.itemId);
      if (e) e.amount = adj.changeType === 'percent'
        ? Math.max(0, e.amount * (1 - adj.changeAmount/100))
        : Math.max(0, e.amount - (adj.changeAmount||0));
    }
  });

  return {
    income, expenses,
    totalIncome:   monthlyTotal(income),
    totalExpenses: monthlyTotal(expenses),
    surplus: monthlyTotal(income) - monthlyTotal(expenses),
  };
}

export function renderScenarios() {
  const scenarios = state.scenarios;
  const base = window.getMonthData(window.selectedBudgetMonth);
  const baseTotalIncome   = monthlyTotal(base.income);
  const baseTotalExpenses = monthlyTotal(base.expenses);
  const baseSurplus       = baseTotalIncome - baseTotalExpenses;

  let html = `<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary" onclick="openAddScenario()">+ New Scenario</button>
  </div>`;

  if (scenarios.length === 0) {
    html += `<div class="empty"><div class="empty-icon">🔬</div>No scenarios yet. Create one to model income changes, expense cuts, or lifestyle adjustments.</div>`;
  } else {
    scenarios.forEach(sc => {
      const result = calcScenario(sc);
      const incomeDiff   = result.totalIncome   - baseTotalIncome;
      const expenseDiff  = result.totalExpenses - baseTotalExpenses;
      const surplusDiff  = result.surplus       - baseSurplus;
      const isOpen = openScenarioId === sc.id;

      const diffBadge = (val, invertColors) => {
        if (val === 0) return `<span style="color:var(--text-muted)">no change</span>`;
        const pos = invertColors ? val < 0 : val > 0;
        const color = pos ? 'var(--success)' : 'var(--danger)';
        return `<span style="color:${color};font-weight:600">${val > 0 ? '+' : ''}${aud(val)}/mo</span>`;
      };

      html += `
        <div class="scenario-card">
          <div class="scenario-card-header" onclick="toggleScenario(${sc.id})">
            <div style="flex:1">
              <div style="font-weight:600;font-size:14px">${escHtml(sc.name)}</div>
              ${sc.description ? `<div style="font-size:12px;color:var(--text-muted);margin-top:2px">${escHtml(sc.description)}</div>` : ''}
            </div>
            <div style="display:flex;align-items:center;gap:12px;flex-shrink:0">
              <div style="text-align:right">
                <div style="font-size:11px;color:var(--text-muted)">Surplus impact</div>
                <div style="font-size:14px;font-weight:700;color:${surplusDiff>=0?'var(--success)':'var(--danger)'}">${surplusDiff>=0?'+':''}${aud(surplusDiff)}/mo</div>
              </div>
              <div style="display:flex;gap:4px">
                <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openEditScenario(${sc.id})">✏️</button>
                <button class="btn btn-danger-ghost btn-sm" onclick="event.stopPropagation();deleteScenario(${sc.id})">🗑</button>
              </div>
              <span style="color:var(--text-muted);font-size:18px">${isOpen ? '▲' : '▼'}</span>
            </div>
          </div>
          <div class="scenario-card-body${isOpen?' open':''}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <div style="font-size:13px;font-weight:600">Adjustments (${(sc.adjustments||[]).length})</div>
              <button class="btn btn-primary btn-sm" onclick="openAddAdjustment(${sc.id})">+ Adjustment</button>
            </div>
            <div class="adj-list">
              ${(sc.adjustments||[]).length === 0
                ? `<div style="font-size:13px;color:var(--text-muted);padding:8px 0">No adjustments yet. Add income or expense changes.</div>`
                : (sc.adjustments||[]).map(adj => {
                    const at = ADJ_TYPES.find(t => t.value === adj.type) || ADJ_TYPES[0];
                    let detail = '';
                    if (adj.type === 'add-income' || adj.type === 'add-expense') {
                      detail = `${escHtml(adj.name)} · ${aud(adj.amount||0)}/${adj.frequency||'mo'}${adj.category?' · '+adj.category:''}`;
                    } else if (adj.type === 'remove-income' || adj.type === 'remove-expense') {
                      detail = escHtml(adj.itemName || '—');
                    } else if (adj.type === 'reduce-income' || adj.type === 'reduce-expense') {
                      detail = `${escHtml(adj.itemName)} · reduce by ${adj.changeType==='percent'?adj.changeAmount+'%':aud(adj.changeAmount||0)}`;
                    }
                    return `<div class="adj-item">
                      <span class="adj-icon">${at.icon}</span>
                      <div style="flex:1">
                        <span style="font-weight:500">${at.label}</span>
                        <span style="color:var(--text-muted);margin-left:6px">${detail}</span>
                      </div>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteAdjustment(${sc.id},${adj.id})">🗑</button>
                    </div>`;
                  }).join('')
              }
            </div>
            <div class="scenario-compare">
              <div class="compare-col">
                <div class="compare-col-title">Current Budget</div>
                <div class="compare-row"><span>Monthly Income</span><span class="amount" style="color:var(--success)">${aud(baseTotalIncome)}</span></div>
                <div class="compare-row"><span>Monthly Expenses</span><span class="amount" style="color:var(--danger)">${aud(baseTotalExpenses)}</span></div>
                <div class="compare-row"><span>Monthly Surplus</span><span class="amount" style="color:${baseSurplus>=0?'var(--success)':'var(--danger)'}">${aud(baseSurplus)}</span></div>
                <div class="compare-row"><span style="color:var(--text-muted);font-size:12px">Annual surplus</span><span style="color:var(--text-muted);font-size:12px">${aud(baseSurplus*12)}</span></div>
              </div>
              <div class="compare-col" style="border:2px solid var(--primary)">
                <div class="compare-col-title" style="color:var(--primary)">Scenario: ${escHtml(sc.name)}</div>
                <div class="compare-row">
                  <span>Monthly Income</span>
                  <span class="amount" style="color:var(--success)">${aud(result.totalIncome)} ${incomeDiff!==0?`<small style="color:${incomeDiff>0?'var(--success)':'var(--danger)'}">(${incomeDiff>0?'+':''}${aud(incomeDiff)})</small>`:''}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Expenses</span>
                  <span class="amount" style="color:var(--danger)">${aud(result.totalExpenses)} ${expenseDiff!==0?`<small style="color:${expenseDiff<0?'var(--success)':'var(--danger)'}">(${expenseDiff>0?'+':''}${aud(expenseDiff)})</small>`:''}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Surplus</span>
                  <span class="amount" style="color:${result.surplus>=0?'var(--success)':'var(--danger)'};font-weight:700">${aud(result.surplus)}</span>
                </div>
                <div class="compare-row">
                  <span style="font-size:12px">Annual surplus</span>
                  <span style="font-size:12px;font-weight:600;color:${result.surplus>=0?'var(--success)':'var(--danger)'}">${aud(result.surplus*12)} ${surplusDiff!==0?`<small>(${surplusDiff>0?'+':''}${aud(surplusDiff*12)}/yr)</small>`:''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    });
  }

  document.getElementById('scenarios-content').innerHTML = html;
}

export function toggleScenario(id) {
  openScenarioId = openScenarioId === id ? null : id;
  renderScenarios();
}

export function scenarioForm(sc = {}) {
  return `
    <div class="form-group">
      <label class="form-label">Scenario Name</label>
      <input class="form-input" id="f-sc-name" type="text" maxlength="200" value="${escAttr(sc.name||'')}" placeholder="e.g. Pick up second job">
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input class="form-input" id="f-sc-desc" type="text" maxlength="200" value="${escAttr(sc.description||'')}" placeholder="Brief description of what you're testing">
    </div>
  `;
}

export function scenarioFromForm(id, existing = {}) {
  return {
    id,
    name:        document.getElementById('f-sc-name').value.trim(),
    description: document.getElementById('f-sc-desc').value.trim(),
    adjustments: existing.adjustments || [],
  };
}

export function openAddScenario() {
  window.openModal('New Scenario', scenarioForm(), () => {
    const sc = scenarioFromForm(nextId(state.scenarios));
    if (!sc.name) return;
    state.scenarios.push(sc);
    window.saveData(state); window.closeModal(); renderScenarios();
  });
}

export function openEditScenario(id) {
  const sc = state.scenarios.find(x => x.id === id);
  window.openModal('Edit Scenario', scenarioForm(sc), () => {
    const updated = scenarioFromForm(id, sc);
    Object.assign(sc, updated);
    window.saveData(state); window.closeModal(); renderScenarios();
  });
}

export function deleteScenario(id) {
  if (!confirm('Delete this scenario?')) return;
  state.scenarios = state.scenarios.filter(s => s.id !== id);
  if (openScenarioId === id) openScenarioId = null;
  window.saveData(state); renderScenarios();
}

export function adjForm(sc) {
  const base = window.getMonthData(window.selectedBudgetMonth);
  const incomeOpts = base.income.map(i => `<option value="${i.id}">${escHtml(i.name)} (${aud(itemMonthly(i))}/mo)</option>`).join('');
  const expenseOpts = base.expenses.map(e => `<option value="${e.id}">${escHtml(e.name)} (${aud(itemMonthly(e))}/mo)</option>`).join('');
  return `
    <div class="form-group">
      <label class="form-label">Adjustment Type</label>
      <select class="form-select" id="f-adj-type" onchange="toggleAdjFields()">
        ${ADJ_TYPES.map(t => `<option value="${t.value}">${t.icon} ${t.label}</option>`).join('')}
      </select>
    </div>
    <div id="adj-add-income" style="display:block">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Description</label>
          <input class="form-input" id="f-adj-name" type="text" maxlength="200" placeholder="e.g. Weekend job">
        </div>
        <div class="form-group">
          <label class="form-label">Amount (AUD)</label>
          <input class="form-input" id="f-adj-amount" type="number" max="99999999" min="0" placeholder="e.g. 800">
        </div>
      </div>
      <div class="form-row" id="adj-add-income-extra">
        <div class="form-group">
          <label class="form-label">Frequency</label>
          <select class="form-select" id="f-adj-freq">
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="monthly" selected>Monthly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
        <div class="form-group" id="adj-cat-wrap" style="display:none">
          <label class="form-label">Category</label>
          <select class="form-select" id="f-adj-cat">
            ${expenseCategories().map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
    <div id="adj-remove-income" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Income to Remove</label>
        <select class="form-select" id="f-adj-inc-sel">${incomeOpts || '<option value="">No income sources</option>'}</select>
      </div>
    </div>
    <div id="adj-reduce-income" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Income to Reduce</label>
        <select class="form-select" id="f-adj-inc-reduce-sel">${incomeOpts || '<option value="">No income sources</option>'}</select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Reduce by</label>
          <input class="form-input" id="f-adj-change-amount" type="number" max="99999999" min="0" placeholder="Amount">
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="form-select" id="f-adj-change-type-inc">
            <option value="flat">$ flat amount</option>
            <option value="percent">% percentage</option>
          </select>
        </div>
      </div>
    </div>
    <div id="adj-remove-expense" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Expense to Remove</label>
        <select class="form-select" id="f-adj-exp-sel">${expenseOpts || '<option value="">No expenses</option>'}</select>
      </div>
    </div>
    <div id="adj-reduce-expense" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Expense to Reduce</label>
        <select class="form-select" id="f-adj-exp-reduce-sel">${expenseOpts || '<option value="">No expenses</option>'}</select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Reduce by</label>
          <input class="form-input" id="f-adj-change-amount-exp" type="number" max="99999999" min="0" placeholder="Amount">
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="form-select" id="f-adj-change-type-exp">
            <option value="flat">$ flat amount</option>
            <option value="percent">% percentage</option>
          </select>
        </div>
      </div>
    </div>
  `;
}

export function toggleAdjFields() {
  const type = document.getElementById('f-adj-type').value;
  document.getElementById('adj-add-income').style.display     = (type === 'add-income' || type === 'add-expense') ? '' : 'none';
  document.getElementById('adj-add-income-extra').style.display = (type === 'add-income' || type === 'add-expense') ? '' : 'none';
  document.getElementById('adj-cat-wrap').style.display       = type === 'add-expense' ? '' : 'none';
  document.getElementById('adj-remove-income').style.display  = type === 'remove-income'  ? '' : 'none';
  document.getElementById('adj-reduce-income').style.display  = type === 'reduce-income'  ? '' : 'none';
  document.getElementById('adj-remove-expense').style.display = type === 'remove-expense' ? '' : 'none';
  document.getElementById('adj-reduce-expense').style.display = type === 'reduce-expense' ? '' : 'none';
}

export function openAddAdjustment(scenarioId) {
  const sc = state.scenarios.find(x => x.id === scenarioId);
  if (!sc) return;
  window.openModal('Add Adjustment', adjForm(sc), () => {
    const type = document.getElementById('f-adj-type').value;
    const base = window.getMonthData(window.selectedBudgetMonth);
    const adj = { id: nextId(sc.adjustments || []), type };
    if (type === 'add-income') {
      adj.name = document.getElementById('f-adj-name').value.trim();
      adj.amount = parseFloat(document.getElementById('f-adj-amount').value) || 0;
      adj.frequency = document.getElementById('f-adj-freq').value;
      if (!adj.name) return;
    } else if (type === 'add-expense') {
      adj.name = document.getElementById('f-adj-name').value.trim();
      adj.amount = parseFloat(document.getElementById('f-adj-amount').value) || 0;
      adj.frequency = document.getElementById('f-adj-freq').value;
      adj.category = document.getElementById('f-adj-cat').value;
      if (!adj.name) return;
    } else if (type === 'remove-income') {
      const sel = document.getElementById('f-adj-inc-sel');
      adj.itemId = parseInt(sel.value);
      adj.itemName = sel.options[sel.selectedIndex]?.text || '';
    } else if (type === 'reduce-income') {
      const sel = document.getElementById('f-adj-inc-reduce-sel');
      adj.itemId = parseInt(sel.value);
      adj.itemName = base.income.find(i => i.id === adj.itemId)?.name || '';
      adj.changeAmount = parseFloat(document.getElementById('f-adj-change-amount').value) || 0;
      adj.changeType = document.getElementById('f-adj-change-type-inc').value;
    } else if (type === 'remove-expense') {
      const sel = document.getElementById('f-adj-exp-sel');
      adj.itemId = parseInt(sel.value);
      adj.itemName = sel.options[sel.selectedIndex]?.text || '';
    } else if (type === 'reduce-expense') {
      const sel = document.getElementById('f-adj-exp-reduce-sel');
      adj.itemId = parseInt(sel.value);
      adj.itemName = base.expenses.find(e => e.id === adj.itemId)?.name || '';
      adj.changeAmount = parseFloat(document.getElementById('f-adj-change-amount-exp').value) || 0;
      adj.changeType = document.getElementById('f-adj-change-type-exp').value;
    }
    if (!sc.adjustments) sc.adjustments = [];
    sc.adjustments.push(adj);
    window.saveData(state); window.closeModal(); renderScenarios();
  });
}

export function deleteAdjustment(scenarioId, adjId) {
  const sc = state.scenarios.find(x => x.id === scenarioId);
  if (!sc) return;
  sc.adjustments = (sc.adjustments || []).filter(a => a.id !== adjId);
  window.saveData(state); renderScenarios();
}

// ─────────────────────────────────────────────────
// COLOUR SETTINGS
// ─────────────────────────────────────────────────


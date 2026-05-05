// Money Dashboard section
import { state } from '../store.js';
import { aud, audD, escHtml, monthlyTotal, itemMonthly } from './format.js';

export function prevMoneyMonth() {
  const [y, m] = selectedBudgetMonth.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  selectedBudgetMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  safeRender(renderMoneyDashboard);
  safeRender(renderBudget);
}

export function nextMoneyMonth() {
  const [y, m] = selectedBudgetMonth.split('-').map(Number);
  const d = new Date(y, m, 1);
  selectedBudgetMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  safeRender(renderMoneyDashboard);
  safeRender(renderBudget);
}

export function renderMoneyDashboard() {
  const md = getMonthData(selectedBudgetMonth);
  const income   = md.income;
  const expenses = md.expenses;

  const totalIncome   = monthlyTotal(income);
  const totalExpenses = monthlyTotal(expenses);
  const surplus       = totalIncome - totalExpenses;
  const savingsRate   = totalIncome > 0 ? Math.round(surplus / totalIncome * 100) : 0;

  // Group expenses by category
  const byCategory = {};
  expenses.forEach(e => {
    const cat = e.category || 'Other';
    byCategory[cat] = (byCategory[cat] || 0) + itemMonthly(e);
  });
  const sortedCats = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  const actuals     = state.budget.actuals[selectedBudgetMonth] || {};
  const totalActual = expenses.reduce((s, e) => s + getActual(e.id, selectedBudgetMonth), 0);
  const hasActuals  = totalActual > 0;

  // ── Month nav + KPI cards ──────────────────────
  let html = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
      <button class="btn btn-sm" onclick="prevMoneyMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${monthLabel(selectedBudgetMonth)}</span>
      <button class="btn btn-sm" onclick="nextMoneyMonth()" style="font-size:16px;padding:2px 10px">›</button>
      ${isMonthCustomized(selectedBudgetMonth) ? '<span style="margin-left:8px;font-size:12px;padding:2px 10px;background:#dbeafe;color:#1d4ed8;border-radius:99px">Custom month</span>' : ''}
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-label">Monthly Income</div>
        <div class="card-value green">${aud(totalIncome)}</div>
        <div class="card-sub">${income.length} source${income.length !== 1 ? 's' : ''}</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Expenses</div>
        <div class="card-value ${totalExpenses > totalIncome ? 'red' : ''}">${aud(totalExpenses)}</div>
        <div class="card-sub">${expenses.length} item${expenses.length !== 1 ? 's' : ''}</div>
      </div>
      <div class="card">
        <div class="card-label">${surplus >= 0 ? 'Surplus' : 'Deficit'}</div>
        <div class="card-value ${surplus >= 0 ? 'green' : 'red'}">${aud(Math.abs(surplus))}</div>
        <div class="card-sub">${surplus >= 0 ? 'left over each month' : 'overspending each month'}</div>
      </div>
      <div class="card">
        <div class="card-label">Savings Rate</div>
        <div class="card-value ${savingsRate >= 20 ? 'green' : savingsRate >= 10 ? 'orange' : 'red'}">${savingsRate}%</div>
        <div class="card-sub">of income remaining</div>
      </div>
    </div>
  `;

  // ── Two-column: Income | Expenses by category ──
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-bottom:20px">`;

  // Income list
  html += `
    <div class="section">
      <div class="section-header">
        <div class="section-title">Income</div>
        <span style="font-size:15px;font-weight:700;color:var(--success)">${aud(totalIncome)}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Frequency</th><th class="amount">Monthly</th></tr></thead>
          <tbody>
            ${income.length === 0
              ? '<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:20px">No income added yet</td></tr>'
              : income.map(item => {
                  const pct = totalIncome > 0 ? Math.round(itemMonthly(item) / totalIncome * 100) : 0;
                  return `<tr>
                    <td style="font-weight:500;border-left:4px solid #10b981">${escHtml(item.name)}</td>
                    <td style="color:var(--text-muted);font-size:12px">${freqDisplayItem(item)}</td>
                    <td class="amount">${aud(itemMonthly(item))} <span style="color:var(--text-muted);font-size:11px">${pct}%</span></td>
                  </tr>`;
                }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Expenses by category with progress bars
  html += `
    <div class="section">
      <div class="section-header">
        <div class="section-title">Expenses by Category</div>
        <span style="font-size:15px;font-weight:700;color:var(--danger)">${aud(totalExpenses)}</span>
      </div>
      <div style="padding:16px 20px">
        ${sortedCats.length === 0
          ? '<div style="color:var(--text-muted);text-align:center;padding:20px">No expenses added yet</div>'
          : sortedCats.map(([cat, amt]) => {
              const color = colors.expense[cat] || '#94a3b8';
              const pct   = totalExpenses > 0 ? (amt / totalExpenses * 100) : 0;
              const actualAmt = expenses
                .filter(e => (e.category || 'Other') === cat)
                .reduce((s, e) => s + (actuals[e.id] || 0), 0);
              const hasActualForCat = expenses.some(e => (e.category || 'Other') === cat && actuals[e.id] !== undefined);
              return `
                <div style="margin-bottom:16px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                    <span style="display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500">
                      <span style="width:11px;height:11px;border-radius:50%;background:${color};flex-shrink:0"></span>
                      ${cat}
                    </span>
                    <span style="font-size:13px;font-weight:600">${aud(amt)}
                      <span style="font-weight:400;color:var(--text-muted);font-size:11px">${Math.round(pct)}%</span>
                    </span>
                  </div>
                  <div style="height:7px;background:var(--surface2);border-radius:4px;overflow:hidden;position:relative">
                    <div style="height:100%;width:${pct.toFixed(1)}%;background:${color};border-radius:4px;opacity:0.85"></div>
                    ${hasActualForCat ? `<div style="position:absolute;top:0;height:100%;width:${Math.min(totalExpenses > 0 ? actualAmt/totalExpenses*100 : 0, 100).toFixed(1)}%;background:${color};border-radius:4px;border:1.5px solid #fff"></div>` : ''}
                  </div>
                  ${hasActualForCat ? `<div style="font-size:11px;color:var(--text-muted);margin-top:3px">Actual: ${aud(actualAmt)}</div>` : ''}
                </div>
              `;
            }).join('')}
      </div>
    </div>
  `;

  html += `</div>`;

  // ── Actuals vs Budget table ────────────────────
  if (hasActuals) {
    const budgetVsActual = totalExpenses - totalActual;
    html += `
      <div class="section" style="margin-bottom:20px">
        <div class="section-header">
          <div>
            <div class="section-title">Actuals — ${monthLabel(selectedBudgetMonth)}</div>
            <div class="section-subtitle">Recorded spending vs budget</div>
          </div>
          <div style="display:flex;gap:16px;align-items:center;font-size:13px;flex-wrap:wrap">
            <span>Budget: <strong>${aud(totalExpenses)}</strong></span>
            <span>Actual: <strong>${aud(totalActual)}</strong></span>
            <span style="font-weight:600;color:${budgetVsActual >= 0 ? 'var(--success)' : 'var(--danger)'}">
              ${budgetVsActual >= 0 ? '▼' : '▲'} ${aud(Math.abs(budgetVsActual))} ${budgetVsActual >= 0 ? 'under' : 'over'}
            </span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Expense</th><th>Category</th><th class="amount">Budget</th><th class="amount">Actual</th><th class="amount">Difference</th></tr></thead>
            <tbody>
              ${expenses.filter(e => actuals[e.id] !== undefined).map(e => {
                  const bud   = itemMonthly(e);
                  const act   = actuals[e.id] || 0;
                  const diff  = bud - act;
                  const color = colors.expense[e.category || 'Other'] || '#94a3b8';
                  return `<tr>
                    <td style="font-weight:500;border-left:4px solid ${color}">${escHtml(e.name)}</td>
                    <td><span style="display:inline-block;padding:2px 9px;border-radius:99px;background:${color};color:#fff;font-size:11px;font-weight:600">${e.category || 'Other'}</span></td>
                    <td class="amount">${aud(bud)}</td>
                    <td class="amount">${aud(act)}</td>
                    <td class="amount" style="font-weight:600;color:${diff >= 0 ? 'var(--success)' : 'var(--danger)'}">
                      ${diff >= 0 ? '−' : '+'}${aud(Math.abs(diff))}
                    </td>
                  </tr>`;
                }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ── 6-month trend chart ────────────────────────
  const last6     = getLast6Months();
  const trendData = last6.map(mo => {
    const md2 = getMonthData(mo);
    return {
      label:    monthShortLabel(mo),
      income:   monthlyTotal(md2.income),
      expenses: monthlyTotal(md2.expenses),
      actual:   Object.values(state.budget.actuals[mo] || {}).reduce((s, v) => s + v, 0)
    };
  });

  const maxVal = Math.max(...trendData.flatMap(d => [d.income, d.expenses, d.actual]), 1);
  const W = 600, PL = 64, PR = 12, PT = 12, PB = 32;
  const chartH = 180 - PT - PB;
  const chartW  = W - PL - PR;
  const groupW  = chartW / trendData.length;
  const barW    = groupW * 0.22;

  const yLines = [0, 0.25, 0.5, 0.75, 1].map(p => {
    const y = PT + chartH - p * chartH;
    return `<line x1="${PL}" y1="${y}" x2="${W-PR}" y2="${y}" stroke="#e2e8f0" stroke-width="1"/>
      <text x="${PL-5}" y="${y+4}" text-anchor="end" font-size="9" fill="#94a3b8">${aud(p * maxVal)}</text>`;
  }).join('');

  const bars = trendData.map((d, i) => {
    const x  = PL + i * groupW + groupW * 0.05;
    const iH = d.income   > 0 ? (d.income   / maxVal) * chartH : 0;
    const eH = d.expenses > 0 ? (d.expenses / maxVal) * chartH : 0;
    const aH = d.actual   > 0 ? (d.actual   / maxVal) * chartH : 0;
    const lx = x + barW + barW / 2 + groupW * 0.04;
    return `
      <rect x="${x}"                        y="${PT+chartH-iH}" width="${barW}" height="${iH}" fill="#10b981" opacity="0.75" rx="2"/>
      <rect x="${x+barW+groupW*0.06}"       y="${PT+chartH-eH}" width="${barW}" height="${eH}" fill="#3b82f6" opacity="0.7"  rx="2"/>
      ${d.actual > 0 ? `<rect x="${x+barW*2+groupW*0.12}" y="${PT+chartH-aH}" width="${barW}" height="${aH}" fill="${d.actual > d.expenses ? '#ef4444' : '#f59e0b'}" opacity="0.85" rx="2"/>` : ''}
      <text x="${lx}" y="${PT+chartH+16}" text-anchor="middle" font-size="10" fill="#64748b">${d.label}</text>
    `;
  }).join('');

  html += `
    <div class="section">
      <div class="section-header">
        <div class="section-title">6-Month Trend</div>
        <div class="chart-legend">
          <span><span class="legend-dot" style="background:#10b981"></span>Income</span>
          <span><span class="legend-dot" style="background:#3b82f6"></span>Budget</span>
          <span><span class="legend-dot" style="background:#f59e0b"></span>Actual (under)</span>
          <span><span class="legend-dot" style="background:#ef4444"></span>Actual (over)</span>
        </div>
      </div>
      <div style="padding:16px 20px 8px">
        <svg viewBox="0 0 ${W} ${PT+chartH+PB}" style="width:100%;height:auto;display:block">
          ${yLines}${bars}
        </svg>
      </div>
    </div>
  `;

  document.getElementById('money-content').innerHTML = html;
}

// ─────────────────────────────────────────────────

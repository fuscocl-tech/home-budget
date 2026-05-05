// Bills section
import { state } from '../store.js';
import { aud, escHtml, escAttr, nextId } from './format.js';
import { billNextDue, billDaysUntil } from '../utils.js';
import { prefsGet, prefsSet, prefsClear } from '../prefs.js';
import { SUB_CATS } from './subscriptions.js';


export const BILL_CATS = [
  { label: 'Mortgage / Rent',  icon: '🏠' },
  { label: 'Electricity',      icon: '⚡' },
  { label: 'Gas',              icon: '🔥' },
  { label: 'Water',            icon: '💧' },
  { label: 'Internet',         icon: '📡' },
  { label: 'Phone',            icon: '📱' },
  { label: 'Insurance',        icon: '🛡️' },
  { label: 'Car Registration', icon: '🚗' },
  { label: 'Rates & Taxes',    icon: '🏛️' },
  { label: 'Loan Repayment',   icon: '💳' },
  { label: 'Education',        icon: '📚' },
  { label: 'Subscriptions',    icon: '📺' },
  { label: 'Health',           icon: '🏥' },
  { label: 'Other',            icon: '📦' },
];
export const BILL_FREQS = ['Monthly','Fortnightly','Weekly','Quarterly','Annually'];

export function billCatIcon(cat) {
  const found = BILL_CATS.find(c => c.label === cat);
  return found ? found.icon : '📦';
}

// Returns next due date (Date object) for a bill from today
// billNextDue and billDaysUntil imported from ./utils.js

export function billDueBadge(days) {
  if (days < 0)  return `<span class="bill-due-badge overdue">Overdue ${Math.abs(days)}d</span>`;
  if (days === 0) return `<span class="bill-due-badge today">Due today</span>`;
  if (days <= 7)  return `<span class="bill-due-badge soon">Due in ${days}d</span>`;
  const next = new Date(); next.setDate(next.getDate() + days);
  return `<span class="bill-due-badge ok">${next.toLocaleDateString('en-AU',{day:'numeric',month:'short'})}</span>`;
}

export function billMonthlyEquiv(bill) {
  const amount = parseFloat(bill.amount) || 0;
  const map = { Weekly: 52/12, Fortnightly: 26/12, Monthly: 1, Quarterly: 1/3, Annually: 1/12 };
  return amount * (map[bill.frequency||'Monthly'] || 1);
}

export function renderBills() {
  const el = document.getElementById('bills-content');
  if (!el) return;
  const bills = state.bills || [];
  const subs  = state.subscriptions || [];
  const filter = window._billsSubsFilter;

  const EDIT_SVG   = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
  const DELETE_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`;

  // ── Stats ──────────────────────────────────────
  const billsMonthly = bills.reduce((s,b) => s + billMonthlyEquiv(b), 0);
  const subsMonthly  = subs.reduce((s,sub) => s + subMonthlyAmount(sub), 0);
  const totalMonthly = billsMonthly + subsMonthly;
  const overdueCount = bills.filter(b => billDaysUntil(b) < 0).length;
  const dueSoonCount = bills.filter(b => { const d = billDaysUntil(b); return d >= 0 && d <= 7; }).length;

  // ── 14-day strip (bills only) ──────────────────
  const today = new Date(); today.setHours(0,0,0,0);
  const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const strip = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() + i);
    const db = bills.filter(b => billNextDue(b).toDateString() === d.toDateString());
    const isToday = d.toDateString() === today.toDateString();
    const cls = [isToday && 'today', db.length && 'has-bill'].filter(Boolean).join(' ');
    return `<div class="bills-day" title="${db.map(b=>b.name).join(', ')}">
      <div class="bills-day-label">${DAY_NAMES[d.getDay()]}</div>
      <div class="bills-day-num ${cls}">${d.getDate()}</div>
      ${db.length ? `<div class="bills-day-dot"></div>` : '<div style="height:5px"></div>'}
    </div>`;
  }).join('');

  // ── Bill rows ──────────────────────────────────
  function billRow(b) {
    const days = billDaysUntil(b);
    const rowCls = days < 0 ? 'overdue' : days <= 7 ? 'due-soon' : '';
    const freqLabel = (b.frequency||'Monthly') !== 'Monthly' ? ` · ${b.frequency}` : '';
    return `<div class="bill-row ${rowCls}">
      <div class="bill-icon">${billCatIcon(b.category)}</div>
      <div class="bill-info">
        <div class="bill-name">${escHtml(b.name)}<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;background:#fef3c7;color:#92400e;margin-left:6px">BILL</span>${b._vehicleRef ? `<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#f0f9ff;color:#0369a1;margin-left:4px;cursor:pointer" onclick="event.stopPropagation();activateTab('vehicles')">Vehicle →</span>` : ''}${b._docRef ? `<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#f5f3ff;color:#6d28d9;margin-left:4px;cursor:pointer" onclick="event.stopPropagation();activateTab('documents')">Document →</span>` : ''}</div>
        <div class="bill-meta">${b.category||''}${freqLabel}${b.autopay?' · Autopay ✓':''}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="bill-amount">$${(parseFloat(b.amount)||0).toLocaleString()}</div>
        ${billDueBadge(days)}
      </div>
      ${days >= 0 ? `<button class="bill-paid-btn" onclick="markBillPaid('${b.id}')">✓ Paid</button>` : ''}
      <div class="bill-actions">
        <button class="icon-btn" title="Edit" onclick="openBillModal('${b.id}')">${EDIT_SVG}</button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteBill('${b.id}')">${DELETE_SVG}</button>
      </div>
    </div>`;
  }

  // ── Subscription rows ──────────────────────────
  function subRow(sub) {
    const monthly = subMonthlyAmount(sub);
    const freqAmt = sub.frequency === 'Annual' ? `$${parseFloat(sub.amount).toLocaleString()}/yr`
                  : sub.frequency === 'Weekly'  ? `$${parseFloat(sub.amount).toFixed(2)}/wk`
                  :                               `$${parseFloat(sub.amount).toFixed(2)}/mo`;
    const renewal = sub.renewalDate ? ` · Renews ${sub.renewalDate}` : '';
    return `<div class="bill-row">
      <div class="bill-icon">${subCatIcon(sub.category)}</div>
      <div class="bill-info">
        <div class="bill-name">${escHtml(sub.name)}<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;background:#ede9fe;color:#5b21b6;margin-left:6px">SUB</span></div>
        <div class="bill-meta">${sub.category||'Other'} · ${freqAmt}${renewal}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="bill-amount">$${monthly.toFixed(2)}<span style="font-size:11px;font-weight:400;color:#94a3b8">/mo</span></div>
      </div>
      <div class="bill-actions">
        <button class="icon-btn" title="Edit" onclick="openSubModal('${sub.id}')">${EDIT_SVG}</button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteSub('${sub.id}')">${DELETE_SVG}</button>
      </div>
    </div>`;
  }

  // ── Grouped bill sections ──────────────────────
  const sorted    = [...bills].sort((a,b) => billDaysUntil(a) - billDaysUntil(b));
  const overdue   = sorted.filter(b => billDaysUntil(b) < 0);
  const thisWeek  = sorted.filter(b => { const d=billDaysUntil(b); return d>=0&&d<=7; });
  const thisMonth = sorted.filter(b => { const d=billDaysUntil(b); return d>7&&d<=31; });
  const later     = sorted.filter(b => billDaysUntil(b) > 31);

  const showBills = filter === 'all' || filter === 'bills';
  const showSubs  = filter === 'all' || filter === 'subs';

  const pendingImport = window._subImportResults.filter(r => !window._subImportDismissed.has(r._key));

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;gap:4px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:3px">
        <button onclick="setBillsFilter('all')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${filter==='all'?'var(--primary)':'transparent'};color:${filter==='all'?'#fff':'var(--text-muted)'}">All (${bills.length+subs.length})</button>
        <button onclick="setBillsFilter('bills')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${filter==='bills'?'var(--primary)':'transparent'};color:${filter==='bills'?'#fff':'var(--text-muted)'}">Bills (${bills.length})</button>
        <button onclick="setBillsFilter('subs')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${filter==='subs'?'var(--primary)':'transparent'};color:${filter==='subs'?'#fff':'var(--text-muted)'}">Subscriptions (${subs.length})</button>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-secondary btn-sm" onclick="openSubModal()">+ Subscription</button>
        <button class="btn btn-primary btn-sm" onclick="openBillModal()">+ Bill</button>
      </div>
    </div>

    <div class="bills-summary">
      <div class="bills-stat">
        <div class="bills-stat-val">$${Math.round(totalMonthly).toLocaleString()}</div>
        <div class="bills-stat-lbl">Monthly total</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val">$${Math.round(totalMonthly*12).toLocaleString()}</div>
        <div class="bills-stat-lbl">Annual total</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val ${dueSoonCount>0?'warn':'ok'}">${dueSoonCount}</div>
        <div class="bills-stat-lbl">Due this week</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val ${overdueCount>0?'danger':'ok'}">${overdueCount}</div>
        <div class="bills-stat-lbl">Overdue</div>
      </div>
    </div>

    ${bills.length && showBills ? `
    <div class="bills-timeline">
      <div class="bills-timeline-title">Next 14 days</div>
      <div class="bills-strip">${strip}</div>
    </div>` : ''}

    ${pendingImport.length ? renderSubImportResults(pendingImport) : ''}

    <div class="bills-upcoming">
      ${showBills ? `
        ${overdue.length   ? `<div class="bills-upcoming-group">⚠ Overdue</div>${overdue.map(billRow).join('')}` : ''}
        ${thisWeek.length  ? `<div class="bills-upcoming-group">This week</div>${thisWeek.map(billRow).join('')}` : ''}
        ${thisMonth.length ? `<div class="bills-upcoming-group">This month</div>${thisMonth.map(billRow).join('')}` : ''}
        ${later.length     ? `<div class="bills-upcoming-group">Later</div>${later.map(billRow).join('')}` : ''}
        ${!bills.length    ? `<div style="padding:20px 0;color:var(--text-muted);font-size:13px">No bills yet — click <strong>+ Bill</strong> to add one.</div>` : ''}
      ` : ''}
      ${showSubs ? `
        ${subs.length ? `<div class="bills-upcoming-group">Subscriptions</div>${subs.map(subRow).join('')}` : `<div style="padding:20px 0;color:var(--text-muted);font-size:13px">No subscriptions yet — click <strong>+ Subscription</strong> to add one.</div>`}
      ` : ''}
    </div>

    <!-- Smart Import -->
    <details style="margin-top:24px;background:linear-gradient(135deg,#0f172a,#1e3a5f);border-radius:12px;padding:16px 20px;color:#fff">
      <summary style="cursor:pointer;font-size:13px;font-weight:700;list-style:none;display:flex;align-items:center;gap:8px">🤖 Smart Import — find subscriptions from bank CSV</summary>
      <div style="margin-top:14px">
        <div style="font-size:12px;color:rgba(255,255,255,0.65);margin-bottom:12px">Upload a bank statement CSV and AI will find subscriptions and bills you haven't tracked yet.</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <input type="text" maxlength="200" class="sub-api-input" id="sub-api-key" placeholder="Anthropic API key"
            value="${prefsGet('toto_ai_key')||''}"
            oninput="prefsSet('toto_ai_key', this.value)" style="flex:1;min-width:200px">
          <label class="sub-upload-btn" for="sub-csv-input">📎 Upload CSV</label>
          <input type="file" id="sub-csv-input" accept=".csv,.txt" style="display:none" onchange="handleSubCSV(event)">
        </div>
        <div id="sub-import-status" style="margin-top:10px;font-size:13px;color:rgba(255,255,255,0.7);display:none"></div>
      </div>
    </details>

    ${billsModal()}
    <div id="sub-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,0.2)">
        <h3 id="sub-modal-title" style="font-size:17px;font-weight:700;margin-bottom:20px">Add Subscription</h3>
        <input type="hidden" id="sub-edit-id">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Name</label>
            <input id="sub-name" type="text" maxlength="200" placeholder="e.g. Netflix, Spotify" class="form-input" style="width:100%">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Category</label>
              <select id="sub-cat" class="form-select" style="width:100%">
                ${SUB_CATS.map(c => `<option value="${c.label}">${c.icon} ${c.label}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Frequency</label>
              <select id="sub-freq" class="form-select" style="width:100%">
                <option>Monthly</option><option>Annual</option><option>Weekly</option>
              </select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Amount ($)</label>
              <input id="sub-amount" type="number" max="99999999" min="0" step="0.01" placeholder="0.00" class="form-input" style="width:100%">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Renewal date</label>
              <input id="sub-renewal" type="date" class="form-input" style="width:100%">
            </div>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:22px;justify-content:flex-end">
          <button class="btn btn-ghost" onclick="closeSubModal()">Cancel</button>
          <button class="btn btn-primary" onclick="saveSub()">Save</button>
        </div>
      </div>
    </div>`;
}

export function setBillsFilter(f) { window._billsSubsFilter = f; renderBills(); }
export function renderSubscriptions() { renderBills(); }

export function billsModal(id) {
  const bill = id ? (state.bills||[]).find(b => b.id === id) : null;
  const cats = BILL_CATS.map(c => `<option value="${c.label}" ${bill&&bill.category===c.label?'selected':''}>${c.icon} ${c.label}</option>`).join('');
  const freqs = BILL_FREQS.map(f => `<option value="${f}" ${(bill&&bill.frequency===f)||((!bill||!bill.frequency)&&f==='Monthly')?'selected':''}>${f}</option>`).join('');

  const inputStyle = 'width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none';
  const labelStyle = 'font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px';

  return `
    <div id="bill-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,0.2);max-height:90vh;overflow-y:auto">
        <h3 id="bill-modal-title" style="font-size:17px;font-weight:700;margin-bottom:20px">Add Bill</h3>
        <input type="hidden" id="bill-edit-id">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="${labelStyle}">Bill name</label>
            <input id="bill-name" type="text" maxlength="200" placeholder="e.g. AGL Electricity" style="${inputStyle}" value="${bill?escAttr(bill.name):''}">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="${labelStyle}">Category</label>
              <select id="bill-cat" style="${inputStyle};background:#fff">${cats}</select>
            </div>
            <div>
              <label style="${labelStyle}">Frequency</label>
              <select id="bill-freq" style="${inputStyle};background:#fff" onchange="toggleBillDayField()">${freqs}</select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="${labelStyle}">Amount ($)</label>
              <input id="bill-amount" type="number" max="99999999" min="0" step="1" placeholder="0" style="${inputStyle}" value="${bill?bill.amount:''}">
            </div>
            <div id="bill-day-wrap">
              <label style="${labelStyle}">Day of month due</label>
              <input id="bill-day" type="number" min="1" max="31" placeholder="e.g. 15" style="${inputStyle}" value="${bill&&bill.dueDay?bill.dueDay:''}">
            </div>
            <div id="bill-start-wrap" style="display:none">
              <label style="${labelStyle}">Next due date</label>
              <input id="bill-start" type="date" style="${inputStyle}" value="${bill&&bill.startDate?bill.startDate:''}">
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <input type="checkbox" id="bill-autopay" style="width:16px;height:16px;cursor:pointer" ${bill&&bill.autopay?'checked':''}>
            <label for="bill-autopay" style="font-size:13px;font-weight:500;cursor:pointer">Autopay / direct debit</label>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:22px;justify-content:flex-end">
          <button class="btn-outline" onclick="closeBillModal()">Cancel</button>
          <button class="btn btn-primary" onclick="saveBill()">Save</button>
        </div>
      </div>
    </div>`;
}

export function openBillModal(id) {
  const bill = id ? (state.bills||[]).find(b => b.id === id) : null;
  // Re-render modal section with the bill data
  renderBills();
  const modal = document.getElementById('bill-modal');
  if (!modal) return;
  document.getElementById('bill-modal-title').textContent = bill ? 'Edit Bill' : 'Add Bill';
  document.getElementById('bill-edit-id').value = id || '';
  if (bill) {
    document.getElementById('bill-name').value   = bill.name || '';
    document.getElementById('bill-cat').value    = bill.category || BILL_CATS[0].label;
    document.getElementById('bill-freq').value   = bill.frequency || 'Monthly';
    document.getElementById('bill-amount').value = bill.amount || '';
    document.getElementById('bill-day').value    = bill.dueDay || '';
    document.getElementById('bill-start').value  = bill.startDate || '';
    document.getElementById('bill-autopay').checked = !!bill.autopay;
  }
  toggleBillDayField();
  modal.style.display = 'flex';
}
export function closeBillModal() {
  const modal = document.getElementById('bill-modal');
  if (modal) modal.style.display = 'none';
}
export function toggleBillDayField() {
  const freq      = document.getElementById('bill-freq')?.value;
  const dayWrap   = document.getElementById('bill-day-wrap');
  const startWrap = document.getElementById('bill-start-wrap');
  if (!dayWrap || !startWrap) return;
  const isMonthly = freq === 'Monthly';
  dayWrap.style.display   = isMonthly ? 'block' : 'none';
  startWrap.style.display = isMonthly ? 'none' : 'block';
}
export function saveBill() {
  const name    = document.getElementById('bill-name').value.trim();
  const amount  = parseFloat(document.getElementById('bill-amount').value);
  const cat     = document.getElementById('bill-cat').value;
  const freq    = document.getElementById('bill-freq').value;
  const dueDay  = parseInt(document.getElementById('bill-day').value) || null;
  const start   = document.getElementById('bill-start').value || null;
  const autopay = document.getElementById('bill-autopay').checked;
  const id      = document.getElementById('bill-edit-id').value;
  if (!name || isNaN(amount)) return;
  const entry = { name, amount, category: cat, frequency: freq, autopay };
  if (freq === 'Monthly') entry.dueDay = dueDay;
  else entry.startDate = start;
  if (!state.bills) state.bills = [];
  if (id) {
    const idx = state.bills.findIndex(b => b.id === id);
    if (idx !== -1) state.bills[idx] = { ...state.bills[idx], ...entry };
  } else {
    state.bills.push({ id: uid(), ...entry });
  }
  window.saveData(state); closeBillModal(); renderBills();
}
export function deleteBill(id) {
  state.bills = (state.bills||[]).filter(b => b.id !== id);
  window.saveData(state); renderBills();
}
export function markBillPaid(id) {
  const bill = (state.bills||[]).find(b => b.id === id);
  if (!bill) return;
  bill.lastPaid = new Date().toISOString().slice(0,10);
  window.saveData(state); renderBills();
}


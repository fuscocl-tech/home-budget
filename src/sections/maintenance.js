// Household Maintenance section
import { state } from '../store.js';
import { aud, escHtml, escAttr, fmtDate, nextId, isOverdue } from './format.js';

export const MAINT_CATS = [
  { key: 'HVAC', icon: '❄️' },
  { key: 'Plumbing', icon: '🚿' },
  { key: 'Electrical', icon: '💡' },
  { key: 'Garden', icon: '🌿' },
  { key: 'Cleaning', icon: '🧹' },
  { key: 'Safety', icon: '🔥' },
  { key: 'Appliance', icon: '🔧' },
  { key: 'Exterior', icon: '🏠' },
  { key: 'Other', icon: '📋' }
];

export const MAINT_STARTERS = [
  { name: 'Gutters Cleaned', category: 'Exterior', intervalNum: 6, intervalUnit: 'months', icon: '🏠' },
  { name: 'Smoke Alarm Batteries', category: 'Safety', intervalNum: 12, intervalUnit: 'months', icon: '🔥' },
  { name: 'Pest Control', category: 'Exterior', intervalNum: 12, intervalUnit: 'months', icon: '🐛' },
  { name: 'AC Filter Cleaned', category: 'HVAC', intervalNum: 3, intervalUnit: 'months', icon: '❄️' },
  { name: 'Hot Water System Flush', category: 'Plumbing', intervalNum: 12, intervalUnit: 'months', icon: '🚿' },
  { name: 'Lawn Mowing', category: 'Garden', intervalNum: 2, intervalUnit: 'weeks', icon: '🌿' },
  { name: 'Oven Clean', category: 'Cleaning', intervalNum: 6, intervalUnit: 'months', icon: '🧹' },
  { name: 'Pool Maintenance', category: 'Exterior', intervalNum: 1, intervalUnit: 'months', icon: '🏊' },
  { name: 'Drains / Septic', category: 'Plumbing', intervalNum: 2, intervalUnit: 'years', icon: '🚿' },
  { name: 'Roof Inspection', category: 'Exterior', intervalNum: 2, intervalUnit: 'years', icon: '🏠' }
];

export function _maintNextDue(item) {
  if (!item.lastDone) return null;
  const d = new Date(item.lastDone);
  const n = item.intervalNum || 1;
  const u = item.intervalUnit || 'months';
  if (u === 'days') d.setDate(d.getDate() + n);
  else if (u === 'weeks') d.setDate(d.getDate() + n * 7);
  else if (u === 'months') d.setMonth(d.getMonth() + n);
  else if (u === 'years') d.setFullYear(d.getFullYear() + n);
  return d;
}

export function _maintDaysUntil(item) {
  const next = _maintNextDue(item);
  if (!next) return null;
  return Math.ceil((next - new Date()) / 86400000);
}

export function renderMaintenance() {
  const items = state.maintenance || [];
  const today = new Date();

  if (items.length === 0) {
    // Show starter suggestions
    const existing = new Set(items.map(i => i.name.toLowerCase()));
    const starters = MAINT_STARTERS.filter(s => !existing.has(s.name.toLowerCase()));

    document.getElementById('maintenance-content').innerHTML = `
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon">🔧</div>
        <p>No maintenance items tracked yet.</p>
        <button class="btn btn-primary" style="margin-top:12px" onclick="openMaintForm()">+ Add Item</button>
      </div>
      ${starters.length ? `
      <div style="margin-top:24px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add common items</div>
        <div class="maint-starter">
          ${starters.map((s, i) => `
            <button class="maint-starter-btn" onclick="quickAddMaint(${i})">
              <div class="maint-starter-name">${s.icon} ${escHtml(s.name)}</div>
              <div class="maint-starter-sub">Every ${s.intervalNum} ${s.intervalUnit}</div>
            </button>`).join('')}
        </div>
      </div>` : ''}`;
    return;
  }

  // Sort: overdue first, then due soon, then ok, then no schedule
  const sorted = [...items].map(item => {
    const days = _maintDaysUntil(item);
    return { ...item, _days: days };
  }).sort((a, b) => {
    if (a._days === null && b._days === null) return 0;
    if (a._days === null) return 1;
    if (b._days === null) return -1;
    return a._days - b._days;
  });

  const overdue = sorted.filter(i => i._days !== null && i._days < 0).length;
  const dueSoon = sorted.filter(i => i._days !== null && i._days >= 0 && i._days <= 14).length;

  let html = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${overdue > 0 ? `<span class="veh-badge red">${overdue} overdue</span>` : ''}
        ${dueSoon > 0 ? `<span class="veh-badge amber">${dueSoon} due soon</span>` : ''}
        <span style="font-size:13px;color:var(--text-muted)">${items.length} item${items.length !== 1 ? 's' : ''}</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openMaintForm()">+ Add Item</button>
    </div>`;

  sorted.forEach(item => {
    const days = item._days;
    let cls = 'ok', statusText = '';
    if (days === null) {
      cls = 'ok';
      statusText = item.lastDone ? `Last done ${new Date(item.lastDone).toLocaleDateString('en-AU', {day:'numeric',month:'short',year:'numeric'})}` : 'Never done';
    } else if (days < 0) {
      cls = 'overdue';
      statusText = `Overdue by ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''}`;
    } else if (days <= 14) {
      cls = 'due-soon';
      statusText = days === 0 ? 'Due today' : `Due in ${days} day${days !== 1 ? 's' : ''}`;
    } else {
      statusText = `Due ${_maintNextDue(item).toLocaleDateString('en-AU', {day:'numeric',month:'short'})}`;
    }

    const catMeta = MAINT_CATS.find(c => c.key === item.category) || MAINT_CATS[MAINT_CATS.length - 1];
    const interval = item.intervalNum ? `Every ${item.intervalNum} ${item.intervalUnit}` : '';

    html += `
      <div class="maint-item ${cls}">
        <div class="maint-row">
          <div class="maint-icon">${catMeta.icon}</div>
          <div class="maint-body">
            <div class="maint-name">${escHtml(item.name)}</div>
            <div class="maint-sub">${[statusText, interval, item.provider ? escHtml(item.provider) : ''].filter(Boolean).join(' · ')}</div>
          </div>
          <div class="maint-actions">
            <button class="maint-done-btn" onclick="event.stopPropagation();markMaintDone(${item.id})">✓ Done</button>
            <button class="btn btn-sm" onclick="openMaintForm(${item.id})">Edit</button>
          </div>
        </div>
        ${item.lastCost ? `<div style="font-size:11px;color:var(--text-muted);margin-top:6px;padding-left:48px">Last cost: ${aud(item.lastCost)}</div>` : ''}
      </div>`;
  });

  // Quick-add starters if fewer than 3 items
  if (items.length < 3) {
    const existing = new Set(items.map(i => i.name.toLowerCase()));
    const starters = MAINT_STARTERS.filter(s => !existing.has(s.name.toLowerCase()));
    if (starters.length) {
      html += `<div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add more</div>
        <div class="maint-starter">
          ${starters.slice(0, 6).map((s, i) => `
            <button class="maint-starter-btn" onclick="quickAddMaint(${i})">
              <div class="maint-starter-name">${s.icon} ${escHtml(s.name)}</div>
              <div class="maint-starter-sub">Every ${s.intervalNum} ${s.intervalUnit}</div>
            </button>`).join('')}
        </div>
      </div>`;
    }
  }

  document.getElementById('maintenance-content').innerHTML = html;
}

export function openMaintForm(editId) {
  const m = editId ? (state.maintenance || []).find(m => m.id === editId) : null;
  const isEdit = !!m;

  document.getElementById('modal-title').textContent = isEdit ? `Edit ${m.name}` : 'Add Maintenance Item';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="mf-name" type="text" maxlength="200" value="${m ? escAttr(m.name) : ''}" placeholder="e.g. Gutters Cleaned, Pest Control">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="mf-cat">
          ${MAINT_CATS.map(c => `<option value="${c.key}"${m && m.category === c.key ? ' selected' : ''}>${c.icon} ${c.key}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Provider</label>
        <input class="form-input" id="mf-provider" type="text" maxlength="200" value="${m ? escAttr(m.provider || '') : ''}" placeholder="e.g. Jim's Mowing, DIY">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Repeat Every</label>
        <div style="display:flex;gap:8px">
          <input class="form-input" id="mf-interval-num" type="number" max="99999999" min="1" value="${m ? m.intervalNum || 1 : 1}" style="width:70px">
          <select class="form-select" id="mf-interval-unit" style="flex:1">
            ${['days','weeks','months','years'].map(u => `<option value="${u}"${m && m.intervalUnit === u ? ' selected' : ''}>${u}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Last Done</label>
        <input class="form-input" id="mf-last" type="date" value="${m ? m.lastDone || '' : ''}">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Last Cost ($) <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="mf-cost" type="number" max="99999999" step="0.01" value="${m ? m.lastCost || '' : ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="mf-notes" type="text" maxlength="200" value="${m ? escAttr(m.notes || '') : ''}">
      </div>
    </div>`;

  document.getElementById('modal-footer').innerHTML = `
    ${isEdit ? `<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deleteMaint(${editId})">Delete</button>` : ''}
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveMaint(${editId || 'null'})">Save</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

export function saveMaint(editId) {
  const name = document.getElementById('mf-name')?.value.trim();
  if (!name) return;

  const data = {
    name,
    category: document.getElementById('mf-cat')?.value || 'Other',
    provider: document.getElementById('mf-provider')?.value.trim() || '',
    intervalNum: parseInt(document.getElementById('mf-interval-num')?.value) || 1,
    intervalUnit: document.getElementById('mf-interval-unit')?.value || 'months',
    lastDone: document.getElementById('mf-last')?.value || '',
    lastCost: parseFloat(document.getElementById('mf-cost')?.value) || 0,
    notes: document.getElementById('mf-notes')?.value.trim() || ''
  };

  if (editId) {
    const m = state.maintenance.find(m => m.id === editId);
    if (m) Object.assign(m, data);
  } else {
    data.id = state.maintenance.length ? Math.max(...state.maintenance.map(m => m.id)) + 1 : 1;
    state.maintenance.push(data);
  }

  window.saveData(state);
  window.closeModal();
  window.renderAll();
}

export function deleteMaint(id) {
  if (!confirm('Delete this maintenance item?')) return;
  state.maintenance = state.maintenance.filter(m => m.id !== id);
  window.saveData(state);
  window.closeModal();
  window.renderAll();
}

export function markMaintDone(id) {
  const m = state.maintenance.find(m => m.id === id);
  if (!m) return;
  const today = new Date().toISOString().slice(0, 10);
  m.lastDone = today;

  // Log cost to budget if there's a cost
  if (m.lastCost > 0) {
    const mo = today.slice(0, 7);
    const md = window.getMonthData(mo);
    let maintExp = md.expenses.find(e => (e.category || '').toLowerCase() === 'other' && (e.name || '').toLowerCase().includes('maintenance'))
                || md.expenses.find(e => (e.name || '').toLowerCase().includes('maintenance'));
    if (!maintExp) {
      maintExp = { id: nextId(state.budget.expenses), name: 'Home Maintenance', amount: 0, frequency: 'monthly', category: 'Other', dueDate: '', vendor: null };
      state.budget.expenses.push(maintExp);
      if (window.isMonthCustomized(mo)) {
        const mb = state.budget.months[mo];
        maintExp = { ...maintExp, id: nextId(mb.expenses) };
        mb.expenses.push(maintExp);
      }
    }
    if (!state.budget.actuals[mo]) state.budget.actuals[mo] = {};
    const entries = window.getActualEntries(maintExp.id, mo);
    entries.push({ id: entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1, amount: m.lastCost, date: today, note: `${m.name}${m.provider ? ' - ' + m.provider : ''}` });
    state.budget.actuals[mo][maintExp.id] = entries;
  }

  window.saveData(state);
  window.renderAll();
}

export function quickAddMaint(starterIdx) {
  const s = MAINT_STARTERS[starterIdx];
  if (!s) return;
  const data = {
    id: state.maintenance.length ? Math.max(...state.maintenance.map(m => m.id)) + 1 : 1,
    name: s.name,
    category: s.category,
    provider: '',
    intervalNum: s.intervalNum,
    intervalUnit: s.intervalUnit,
    lastDone: '',
    lastCost: 0,
    notes: ''
  };
  state.maintenance.push(data);
  window.saveData(state);
  window.renderAll();
}


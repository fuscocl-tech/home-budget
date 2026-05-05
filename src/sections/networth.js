// Net Worth section
import { state } from '../store.js';
import { aud, audD, fmtNW, escHtml, nextId } from './format.js';


export const NW_ASSET_CATS = ['Cash & Savings','Investments','Property','Superannuation','Vehicle','Other'];
const NW_LIAB_CATS  = ['Mortgage','Car Loan','Credit Card','Personal Loan','HECS/HELP','Other'];

// fmtNW imported from ./sections/format.js

export function renderNetWorth() {
  const el = document.getElementById('networth-content');
  if (!el) return;
  const nw = state.netWorth;
  const assets = nw.assets || [];
  const liabs  = nw.liabilities || [];
  const snaps  = nw.snapshots || [];

  const totalAssets = assets.reduce((s,a) => s + (parseFloat(a.value)||0), 0);
  const totalLiabs  = liabs.reduce((s,l) => s + (parseFloat(l.value)||0), 0);
  const netWorth    = totalAssets - totalLiabs;

  // Change vs previous snapshot
  let changeHtml = '';
  if (snaps.length >= 2) {
    const prev = snaps[snaps.length - 2].netWorth;
    const diff = netWorth - prev;
    const cls  = diff >= 0 ? 'up' : 'down';
    const sign = diff >= 0 ? '+' : '';
    changeHtml = `<span class="${cls}">${sign}${fmtNW(diff)}</span> vs last snapshot`;
  }

  if (!assets.length && !liabs.length) {
    el.innerHTML = `
      <div style="background:#fff;border:2px dashed #cbd5e1;border-radius:16px;padding:36px 24px;margin-top:8px">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
          <div style="font-size:40px">📊</div>
          <div>
            <div style="font-size:17px;font-weight:700;color:#1e293b">See your full financial picture</div>
            <div style="font-size:13px;color:#64748b;margin-top:4px">Add what you own and what you owe to calculate your net worth.</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
          <div style="background:#f0f9ff;border-radius:12px;padding:14px;display:flex;align-items:center;gap:14px">
            <span style="font-size:22px">🏦</span>
            <div>
              <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#0369a1;margin-bottom:4px">What you own</div>
              <div style="font-size:12px;color:#374151">Home value · Savings · Super / investments · Vehicles</div>
            </div>
          </div>
          <div style="background:#fef2f2;border-radius:12px;padding:14px;display:flex;align-items:center;gap:14px">
            <span style="font-size:22px">💳</span>
            <div>
              <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#b91c1c;margin-bottom:4px">What you owe</div>
              <div style="font-size:12px;color:#374151">Mortgage balance · Car loans · Credit cards · Personal loans</div>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:10px;justify-content:center">
          <button onclick="openNWModal('asset')" style="flex:1;background:#0891b2;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:600;cursor:pointer">+ Add an asset</button>
          <button onclick="openNWModal('liability')" style="flex:1;background:#fff;color:#0891b2;border:1.5px solid #0891b2;border-radius:10px;padding:12px;font-size:14px;font-weight:600;cursor:pointer">+ Add a liability</button>
        </div>
      </div>`;
    return;
  }

  el.innerHTML = `
    <div class="nw-hero">
      <div class="nw-hero-label">Net Worth</div>
      <div class="nw-hero-amount ${netWorth >= 0 ? 'positive' : 'negative'}">${fmtNW(netWorth)}</div>
      ${changeHtml ? `<div class="nw-hero-change">${changeHtml}</div>` : ''}
    </div>

    ${renderNWTargetCard(netWorth)}
    ${liabs.some(l => l.rate) ? renderNWDebtCard(liabs) : ''}
    ${snaps.length > 1 ? renderNWTrend(snaps) : ''}

    <div class="nw-cols">
      <div class="nw-col-card assets">
        <div class="nw-col-header">
          <span class="nw-col-title">Assets</span>
          <span class="nw-col-total">${fmtNW(totalAssets)}</span>
        </div>
        ${assets.length ? assets.map(a => nwItemRow(a,'asset')).join('') : '<div class="nw-empty">No assets yet</div>'}
        <div class="nw-add-row">
          <button class="btn-outline" style="font-size:12px;padding:6px 14px" onclick="openNWModal('asset')">+ Add asset</button>
        </div>
      </div>
      <div class="nw-col-card liabilities">
        <div class="nw-col-header">
          <span class="nw-col-title">Liabilities</span>
          <span class="nw-col-total">${fmtNW(totalLiabs)}</span>
        </div>
        ${liabs.length ? liabs.map(l => nwItemRow(l,'liability')).join('') : '<div class="nw-empty">No liabilities yet</div>'}
        <div class="nw-add-row">
          <button class="btn-outline" style="font-size:12px;padding:6px 14px" onclick="openNWModal('liability')">+ Add liability</button>
        </div>
      </div>
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;gap:12px;flex-wrap:wrap">
      <div style="font-size:13px;color:#64748b">
        ${snaps.length ? `Last snapshot: ${snaps[snaps.length-1].date}` : 'No snapshots yet — save one to track progress.'}
      </div>
      <button class="nw-snapshot-btn" onclick="saveNWSnapshot()">Save snapshot</button>
    </div>

  `;
}

export function nwItemRow(item, type) {
  let subLine = item.category || '';
  if (type === 'liability' && item.rate) {
    const bal  = parseFloat(item.value) || 0;
    const rate = parseFloat(item.rate);
    const monthlyInt = bal * rate / 1200;
    subLine += subLine ? ` · ` : '';
    subLine += `${rate}% p.a. · $${Math.round(monthlyInt).toLocaleString()}/mo interest`;
  }
  return `
    <div class="nw-item">
      <div style="flex:1;min-width:0">
        <div class="nw-item-name">${escHtml(item.name)}</div>
        ${subLine ? `<div class="nw-item-cat">${subLine}</div>` : ''}
      </div>
      <div class="nw-item-value">${fmtNW(parseFloat(item.value)||0)}</div>
      <div class="nw-item-actions">
        <button class="icon-btn" title="Edit" onclick="openNWModal('${type}','${item.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteNWItem('${type}','${item.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>`;
}

export function renderNWTargetCard(netWorth) {
  const t = state.netWorth.target || {};
  const target = parseFloat(t.amount) || 0;
  const byYear = parseInt(t.byYear) || 0;
  const currentYear = new Date().getFullYear();

  if (!target || !byYear) {
    return `
      <div class="nw-target-card">
        <div class="nw-target-header">
          <span class="nw-target-title">Your target</span>
          <button class="btn-outline" style="font-size:12px;padding:5px 12px" onclick="openNWTargetModal()">Set target</button>
        </div>
        <div class="nw-target-empty">
          <span style="font-size:28px">🎯</span>
          <span style="font-size:13px;color:#64748b">Set a net worth goal and track your progress towards it.</span>
        </div>
      </div>`;
  }

  const pct         = Math.min((netWorth / target) * 100, 100);
  const remaining   = Math.max(target - netWorth, 0);
  const yearsLeft   = Math.max(byYear - currentYear, 0);
  const monthsLeft  = yearsLeft * 12;
  const neededPerMo = monthsLeft > 0 ? Math.ceil(remaining / monthsLeft) : 0;
  const done        = netWorth >= target;

  // Velocity from snapshots
  const snaps = state.netWorth.snapshots || [];
  let velocityHtml = '';
  if (snaps.length >= 2) {
    const oldest = snaps[0];
    const newest = snaps[snaps.length - 1];
    const months = Math.max((new Date(newest.date) - new Date(oldest.date)) / (1000 * 60 * 60 * 24 * 30.5), 1);
    const growthPerMo = (newest.netWorth - oldest.netWorth) / months;
    if (growthPerMo > 0 && remaining > 0) {
      const projMonths   = Math.ceil(remaining / growthPerMo);
      const projYear     = currentYear + Math.floor(projMonths / 12);
      const onTrack      = projYear <= byYear;
      velocityHtml = `<div class="nw-target-stat">
        <div class="nw-target-stat-val" style="color:${onTrack?'#10b981':'#f59e0b'}">${onTrack ? '✓ On track' : '⚠ Off track'}</div>
        <div class="nw-target-stat-lbl">At current pace: ${projYear}</div>
      </div>`;
    }
  }

  return `
    <div class="nw-target-card">
      <div class="nw-target-header">
        <div>
          <div class="nw-target-title">Your target</div>
        </div>
        <button class="btn-outline" style="font-size:12px;padding:5px 12px" onclick="openNWTargetModal()">Edit</button>
      </div>
      <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
        <div class="nw-target-goal">${fmtNW(target)}</div>
        <div style="font-size:13px;color:#64748b">by ${byYear}</div>
      </div>
      <div class="nw-progress-track">
        <div class="nw-progress-fill ${done?'over':''}" style="width:${pct.toFixed(1)}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#94a3b8;margin-bottom:14px">
        <span>${pct.toFixed(0)}% there</span>
        <span>${done ? '🎉 Goal reached!' : fmtNW(remaining) + ' to go'}</span>
      </div>
      <div class="nw-target-stats">
        ${!done && yearsLeft > 0 ? `<div class="nw-target-stat">
          <div class="nw-target-stat-val">${yearsLeft} yr${yearsLeft!==1?'s':''}</div>
          <div class="nw-target-stat-lbl">Time remaining</div>
        </div>` : ''}
        ${!done && neededPerMo > 0 ? `<div class="nw-target-stat">
          <div class="nw-target-stat-val">$${neededPerMo.toLocaleString()}/mo</div>
          <div class="nw-target-stat-lbl">Required growth</div>
        </div>` : ''}
        ${velocityHtml}
      </div>
    </div>`;
}

export function renderNWDebtCard(liabs) {
  const withRate = liabs.filter(l => l.rate);
  if (!withRate.length) return '';

  const totalMonthlyInt = withRate.reduce((s,l) => {
    return s + (parseFloat(l.value)||0) * (parseFloat(l.rate)||0) / 1200;
  }, 0);

  const rows = withRate.map(l => {
    const bal     = parseFloat(l.value) || 0;
    const rate    = parseFloat(l.rate) || 0;
    const payment = parseFloat(l.monthlyPayment) || 0;
    const monthlyInt = bal * rate / 1200;
    let payoffHtml = '';
    if (payment > 0) {
      if (payment <= monthlyInt) {
        payoffHtml = `<span class="nw-debt-payoff warn">⚠ Paying interest only</span>`;
      } else {
        const r = rate / 1200;
        const n = -Math.log(1 - (r * bal / payment)) / Math.log(1 + r);
        if (isFinite(n) && n > 0) {
          const payoffDate = new Date();
          payoffDate.setMonth(payoffDate.getMonth() + Math.ceil(n));
          const mo   = payoffDate.toLocaleString('default', { month: 'short' });
          const yr   = payoffDate.getFullYear();
          const totalPaid = payment * Math.ceil(n);
          const totalInt  = totalPaid - bal;
          payoffHtml = `<span class="nw-debt-payoff" title="${fmtNW(totalInt)} total interest">Paid off ${mo} ${yr}</span>`;
        }
      }
    }
    return `<div class="nw-debt-row">
      <span class="nw-debt-name">${escHtml(l.name)}</span>
      <span class="nw-debt-rate">${rate}% p.a.</span>
      <span class="nw-debt-int">$${Math.round(monthlyInt).toLocaleString()}/mo interest</span>
      ${payoffHtml}
    </div>`;
  }).join('');

  return `
    <div class="nw-debt-card">
      <div class="nw-debt-header">
        <div style="display:flex;flex-direction:column;gap:2px">
          <span class="nw-debt-headline">Your debts cost you</span>
          <div style="display:flex;align-items:baseline;gap:6px">
            <span class="nw-debt-total">$${Math.round(totalMonthlyInt).toLocaleString()}</span>
            <span class="nw-debt-per">per month in interest</span>
          </div>
        </div>
      </div>
      ${rows}
      <div style="font-size:11px;color:#94a3b8;margin-top:12px">Add interest rates to your liabilities to see full breakdown.</div>
    </div>`;
}

export function openNWTargetModal() {
  const t = state.netWorth.target || {};
  document.getElementById('nw-t-amount').value = t.amount || '';
  document.getElementById('nw-t-year').value   = t.byYear || '';
  document.getElementById('nw-target-modal').style.display = 'flex';
}
export function closeNWTargetModal() {
  document.getElementById('nw-target-modal').style.display = 'none';
}
export function saveNWTarget() {
  const amount = parseFloat(document.getElementById('nw-t-amount').value);
  const byYear = parseInt(document.getElementById('nw-t-year').value);
  if (!amount || !byYear) return;
  if (!state.netWorth.target) state.netWorth.target = {};
  state.netWorth.target.amount = amount;
  state.netWorth.target.byYear = byYear;
  saveData(state); renderNetWorth();
  closeNWTargetModal();
}

export function renderNWTrend(snaps) {
  const recent = snaps.slice(-12);
  const max    = Math.max(...recent.map(s => Math.abs(s.netWorth)), 1);
  const bars   = recent.map(s => {
    const h   = Math.round((Math.abs(s.netWorth) / max) * 70);
    const cls = s.netWorth >= 0 ? 'pos' : 'neg';
    const mon = s.date ? s.date.slice(0,7) : '';
    return `<div class="nw-trend-bar-wrap">
      <div class="nw-trend-bar ${cls}" style="height:${h}px"></div>
      <div class="nw-trend-label">${mon}</div>
    </div>`;
  }).join('');
  return `
    <div class="nw-trend-card">
      <div class="nw-trend-title">Net Worth over time</div>
      <div class="nw-trend-chart">${bars}</div>
    </div>`;
}

let _nwModalType = 'asset';
export function _ensureNWModals() {
  if (document.getElementById('nw-modal')) return;
  const div = document.createElement('div');
  div.innerHTML = `
    <div id="nw-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,0.2)">
        <h3 id="nw-modal-title" style="font-size:17px;font-weight:700;margin-bottom:20px"></h3>
        <input type="hidden" id="nw-edit-id">
        <input type="hidden" id="nw-edit-type">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Name</label>
            <input id="nw-name" type="text" maxlength="200" placeholder="e.g. Home, Super, Credit card" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Category</label>
            <div id="nw-cat-wrap"></div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Value ($)</label>
            <input id="nw-value" type="number" max="99999999" min="0" step="100" placeholder="0" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
          </div>
          <div id="nw-debt-fields" style="display:none;flex-direction:column;gap:14px">
            <div style="border-top:1px solid var(--border);padding-top:14px;font-size:12px;font-weight:600;color:#64748b;letter-spacing:0.04em;text-transform:uppercase">Debt details (optional)</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div>
                <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Interest rate (% p.a.)</label>
                <input id="nw-rate" type="number" min="0" max="100" step="0.1" placeholder="e.g. 6.5" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
              </div>
              <div>
                <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Monthly repayment ($)</label>
                <input id="nw-payment" type="number" max="99999999" min="0" step="50" placeholder="e.g. 2000" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:22px;justify-content:flex-end">
          <button class="btn-outline" onclick="closeNWModal()">Cancel</button>
          <button class="btn btn-primary" onclick="saveNWItem()">Save</button>
        </div>
      </div>
    </div>
    <div id="nw-target-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,0.2)">
        <h3 style="font-size:17px;font-weight:700;margin-bottom:6px">Set your target</h3>
        <p style="font-size:13px;color:#64748b;margin-bottom:20px">What net worth do you want to reach, and by when?</p>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Target net worth ($)</label>
            <input id="nw-t-amount" type="number" max="99999999" min="0" step="10000" placeholder="e.g. 1000000" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">By year</label>
            <input id="nw-t-year" type="number" min="2025" max="2099" step="1" placeholder="e.g. 2040" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:22px;justify-content:flex-end">
          <button class="btn-outline" onclick="closeNWTargetModal()">Cancel</button>
          <button class="btn btn-primary" onclick="saveNWTarget()">Save target</button>
        </div>
      </div>
    </div>`;
  while (div.firstChild) document.body.appendChild(div.firstChild);
}

export function openNWModal(type, id) {
  _ensureNWModals();
  _nwModalType = type;
  const nw    = state.netWorth;
  const list  = type === 'asset' ? nw.assets : nw.liabilities;
  const cats  = type === 'asset' ? NW_ASSET_CATS : NW_LIAB_CATS;
  const item  = id ? list.find(x => x.id === id) : null;
  const modal = document.getElementById('nw-modal');
  if (!modal) return;
  document.getElementById('nw-modal-title').textContent = (item ? 'Edit' : 'Add') + ' ' + (type === 'asset' ? 'Asset' : 'Liability');
  document.getElementById('nw-edit-id').value   = id || '';
  document.getElementById('nw-edit-type').value = type;
  document.getElementById('nw-name').value    = item ? item.name : '';
  document.getElementById('nw-value').value   = item ? item.value : '';
  document.getElementById('nw-rate').value    = (item && item.rate) ? item.rate : '';
  document.getElementById('nw-payment').value = (item && item.monthlyPayment) ? item.monthlyPayment : '';
  const selectedCat = (item?.category) || cats[0];
  const catWrap = document.getElementById('nw-cat-wrap');
  if (catWrap) catWrap.innerHTML = customSelect('nw-cat', cats, selectedCat, val => { _csStore['nw-cat'].value = val; });
  const debtFields = document.getElementById('nw-debt-fields');
  if (debtFields) debtFields.style.display = type === 'liability' ? 'flex' : 'none';
  modal.style.display = 'flex';
}
export function closeNWModal() {
  const modal = document.getElementById('nw-modal');
  if (modal) modal.style.display = 'none';
}
export function saveNWItem() {
  const name    = document.getElementById('nw-name').value.trim();
  const value   = parseFloat(document.getElementById('nw-value').value);
  const cat     = _csStore['nw-cat']?.value || '';
  const type    = document.getElementById('nw-edit-type').value;
  const id      = document.getElementById('nw-edit-id').value;
  const rate    = parseFloat(document.getElementById('nw-rate').value) || 0;
  const payment = parseFloat(document.getElementById('nw-payment').value) || 0;
  if (!name || isNaN(value)) return;
  const list = type === 'asset' ? state.netWorth.assets : state.netWorth.liabilities;
  const entry = { name, value, category: cat };
  if (type === 'liability') { if (rate) entry.rate = rate; if (payment) entry.monthlyPayment = payment; }
  if (id) {
    const idx = list.findIndex(x => x.id === id);
    if (idx !== -1) list[idx] = { ...list[idx], ...entry };
  } else {
    list.push({ id: uid(), ...entry });
  }
  saveData(state); closeNWModal(); renderNetWorth();
}
export function deleteNWItem(type, id) {
  const list = type === 'asset' ? state.netWorth.assets : state.netWorth.liabilities;
  const idx  = list.findIndex(x => x.id === id);
  if (idx !== -1) { list.splice(idx, 1); saveData(state); renderNetWorth(); }
}
export function saveNWSnapshot() {
  const nw    = state.netWorth;
  const total = (nw.assets||[]).reduce((s,a) => s+(parseFloat(a.value)||0), 0)
              - (nw.liabilities||[]).reduce((s,l) => s+(parseFloat(l.value)||0), 0);
  const today = new Date().toISOString().slice(0,10);
  if (!nw.snapshots) nw.snapshots = [];
  const existing = nw.snapshots.findIndex(s => s.date === today);
  const entry    = { date: today, netWorth: total, assets: (nw.assets||[]).reduce((s,a)=>s+(parseFloat(a.value)||0),0), liabilities: (nw.liabilities||[]).reduce((s,l)=>s+(parseFloat(l.value)||0),0) };
  if (existing !== -1) nw.snapshots[existing] = entry;
  else nw.snapshots.push(entry);
  saveData(state); renderNetWorth();
}


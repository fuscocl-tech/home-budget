// Document Vault section
import { state } from '../store.js';
import { escHtml, escAttr, fmtDate, nextId, isOverdue } from './format.js';

export const DOC_CATS = [
  { key: 'Insurance', icon: '🛡️', bg: '#eff6ff' },
  { key: 'Identity', icon: '🪪', bg: '#ecfeff' },
  { key: 'Warranty', icon: '📦', bg: '#fffbeb' },
  { key: 'Financial', icon: '🏦', bg: '#faf5ff' },
  { key: 'Medical', icon: '🏥', bg: '#fef2f2' },
  { key: 'Property', icon: '🏠', bg: '#f0f9ff' },
  { key: 'Vehicle', icon: '🚗', bg: '#f5f3ff' },
  { key: 'Other', icon: '📄', bg: '#f8fafc' }
];

let _docSearch = '';

export function _docCatMeta(cat) {
  return DOC_CATS.find(c => c.key === cat) || DOC_CATS[DOC_CATS.length - 1];
}

export function renderDocuments() {
  const docs = state.documents || [];
  const today = new Date();

  // Filter by search
  const q = _docSearch.toLowerCase();
  const filtered = q ? docs.filter(d =>
    (d.name || '').toLowerCase().includes(q) ||
    (d.provider || '').toLowerCase().includes(q) ||
    (d.reference || '').toLowerCase().includes(q) ||
    (d.category || '').toLowerCase().includes(q) ||
    (d.notes || '').toLowerCase().includes(q)
  ) : docs;

  // Count expiring
  const expiringSoon = docs.filter(d => {
    if (!d.expiryDate) return false;
    const days = Math.ceil((new Date(d.expiryDate) - today) / 86400000);
    return days >= 0 && days <= 30;
  }).length;
  const expired = docs.filter(d => {
    if (!d.expiryDate) return false;
    return new Date(d.expiryDate) < today;
  }).length;

  // ── 2028 header (date + "Home" title + avatar) ──
  const homeDateLine = today.toLocaleDateString('en-AU', { weekday:'long', month:'long', day:'numeric' });
  const homeHeaderHtml = ``;

  // ── 2028 household hero card ──
  const householdName = (state.settings?.householdName) || 'Household';
  const memberCount = (state.kids?.allowances?.length || 0) + 2;
  const allGood = expired === 0 && expiringSoon === 0;
  const homeHeroHtml = `
    <div class="home-hero">
      <div>
        <div class="home-hero-label">Household</div>
        <div class="home-hero-val">${householdName}</div>
        <div class="home-hero-sub">${memberCount} members</div>
      </div>
      <div class="home-hero-badge" style="${allGood ? '' : 'background:#FFF8EC'}">
        <div class="home-hero-badge-val" style="${allGood ? '' : 'color:#F59E0B'}">${allGood ? '✓' : '!'}</div>
        <div class="home-hero-badge-label" style="${allGood ? '' : 'color:#F59E0B'}">${allGood ? 'All good' : `${expired + expiringSoon} due`}</div>
      </div>
    </div>`;

  if (docs.length === 0) {
    document.getElementById('documents-content').innerHTML = `
      ${homeHeaderHtml}
      ${homeHeroHtml}
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon">📋</div>
        <p>No documents tracked yet. Add insurance policies, warranties, passports and more.</p>
        <button class="btn btn-primary" style="margin-top:12px" onclick="openDocForm()">+ Add Document</button>
      </div>`;
    return;
  }

  // Summary bar
  let html = homeHeaderHtml + homeHeroHtml + `
    <div class="toto-sec-header" style="margin-top:6px"><span class="toto-sec-title">Documents</span></div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin:8px 20px 16px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${expired > 0 ? `<span class="veh-badge red">${expired} expired</span>` : ''}
        ${expiringSoon > 0 ? `<span class="veh-badge amber">${expiringSoon} expiring soon</span>` : ''}
        <span style="font-size:13px;color:var(--text-muted)">${docs.length} document${docs.length !== 1 ? 's' : ''}</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openDocForm()">+ Add Document</button>
    </div>
    <input class="doc-search" type="text" maxlength="200" placeholder="Search documents…" value="${_docSearch}" oninput="_docSearch=this.value;renderDocuments()" style="margin:0 20px;width:calc(100% - 40px)">`;

  // Group by category
  const byCategory = {};
  filtered.forEach(d => {
    const cat = d.category || 'Other';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(d);
  });

  // Render in DOC_CATS order
  DOC_CATS.forEach(catDef => {
    const catDocs = byCategory[catDef.key];
    if (!catDocs || !catDocs.length) return;

    html += `<div class="doc-cat-group">
      <div class="doc-cat-header">${catDef.icon} ${catDef.key} <span style="font-weight:400;text-transform:none">(${catDocs.length})</span></div>`;

    catDocs.sort((a, b) => {
      if (a.expiryDate && b.expiryDate) return new Date(a.expiryDate) - new Date(b.expiryDate);
      if (a.expiryDate) return -1;
      return 1;
    }).forEach(d => {
      let badge = '';
      if (d.expiryDate) {
        const days = Math.ceil((new Date(d.expiryDate) - today) / 86400000);
        if (days < 0) badge = `<span class="veh-badge red" style="font-size:11px">Expired ${Math.abs(days)}d ago</span>`;
        else if (days <= 30) badge = `<span class="veh-badge amber" style="font-size:11px">Expires in ${days}d</span>`;
        else badge = `<span class="veh-badge green" style="font-size:11px">${new Date(d.expiryDate).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })}</span>`;
      }

      const subParts = [d.provider ? escHtml(d.provider) : '', d.reference ? escHtml(d.reference) : '', d.storedAt ? `📍 ${escHtml(d.storedAt)}` : ''].filter(Boolean);

      html += `
        <div class="doc-card" onclick="openDocForm('${d.id}')">
          <div class="doc-cat-icon" style="background:${catDef.bg}">${catDef.icon}</div>
          <div class="doc-card-body">
            <div class="doc-card-name">${escHtml(d.name)}</div>
            ${subParts.length ? `<div class="doc-card-sub">${subParts.join(' · ')}</div>` : ''}
          </div>
          ${badge}
        </div>`;
    });

    html += `</div>`;
  });

  if (filtered.length === 0 && q) {
    html += `<div style="text-align:center;padding:24px;color:var(--text-muted)">No documents matching "${escHtml(q)}"</div>`;
  }

  document.getElementById('documents-content').innerHTML = html;
}

export function openDocForm(editId) {
  const d = editId ? (state.documents || []).find(d => d.id === editId) : null;
  const isEdit = !!d;

  document.getElementById('modal-title').textContent = isEdit ? `Edit Document` : 'Add Document';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">Document Name</label>
      <input class="form-input" id="df-name" type="text" maxlength="200" value="${d ? escAttr(d.name) : ''}" placeholder="e.g. Home & Contents Insurance">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="df-cat">
          ${DOC_CATS.map(c => `<option value="${c.key}"${d && d.category === c.key ? ' selected' : ''}>${c.icon} ${c.key}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Provider / Issuer</label>
        <input class="form-input" id="df-provider" type="text" maxlength="200" value="${d ? escAttr(d.provider || '') : ''}" placeholder="e.g. AAMI, Medicare">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Reference / Policy No.</label>
        <input class="form-input" id="df-ref" type="text" maxlength="200" value="${d ? escAttr(d.reference || '') : ''}" placeholder="POL-12345">
      </div>
      <div class="form-group">
        <label class="form-label">Expiry Date</label>
        <input class="form-input" id="df-expiry" type="date" value="${d ? d.expiryDate || '' : ''}">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Renewal Cost <span style="font-weight:400;color:var(--text-muted)">($, optional)</span></label>
        <input class="form-input" id="df-cost" type="number" max="99999999" step="0.01" value="${d ? d.renewalCost || '' : ''}" placeholder="1850">
      </div>
      <div class="form-group">
        <label class="form-label">Stored At</label>
        <input class="form-input" id="df-stored" type="text" maxlength="200" value="${d ? escAttr(d.storedAt || '') : ''}" placeholder="e.g. Filing cabinet, Google Drive, Email">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="df-notes" type="text" maxlength="200" value="${d ? escAttr(d.notes || '') : ''}" placeholder="e.g. $1000 excess, covers building + contents">
    </div>`;

  document.getElementById('modal-footer').innerHTML = `
    ${isEdit ? `<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deleteDoc(${editId})">Delete</button>` : ''}
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveDoc(${editId || 'null'})">Save</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

export function saveDoc(editId) {
  const name = document.getElementById('df-name')?.value.trim();
  if (!name) return;

  const data = {
    name,
    category: document.getElementById('df-cat')?.value || 'Other',
    provider: document.getElementById('df-provider')?.value.trim() || '',
    reference: document.getElementById('df-ref')?.value.trim() || '',
    expiryDate: document.getElementById('df-expiry')?.value || '',
    renewalCost: parseFloat(document.getElementById('df-cost')?.value) || 0,
    storedAt: document.getElementById('df-stored')?.value.trim() || '',
    notes: document.getElementById('df-notes')?.value.trim() || ''
  };

  if (editId) {
    const d = state.documents.find(d => d.id === editId);
    if (d) Object.assign(d, data);
  } else {
    data.id = state.documents.length ? Math.max(...state.documents.map(d => d.id)) + 1 : 1;
    state.documents.push(data);
  }

  // Sync to Bills if it has an expiry date and cost
  if (data.expiryDate && data.renewalCost > 0) {
    if (!state.bills) state.bills = [];
    const tag = `doc_${editId || data.id}`;
    const existing = state.bills.find(b => b._docRef === tag);
    const billEntry = {
      name: `${data.name}${data.provider ? ' - ' + data.provider : ''}`,
      amount: data.renewalCost,
      category: data.category === 'Vehicle' ? 'Insurance' : data.category,
      frequency: 'Annual',
      autopay: false,
      startDate: data.expiryDate,
      _docRef: tag
    };
    if (existing) Object.assign(existing, billEntry);
    else { billEntry.id = uid(); state.bills.push(billEntry); }
  }

  window.saveData(state);
  window.closeModal();
  window.renderAll();
}

export function deleteDoc(id) {
  if (!confirm('Delete this document?')) return;
  // Remove linked bill
  const tag = `doc_${id}`;
  state.bills = (state.bills || []).filter(b => b._docRef !== tag);
  state.documents = state.documents.filter(d => d.id !== id);
  window.saveData(state);
  window.closeModal();
  window.renderAll();
}


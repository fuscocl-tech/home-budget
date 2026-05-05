// Receipts (IndexedDB photo storage) + PWA install prompt
import { state } from '../store.js';
import { escHtml } from './format.js';

// RECEIPTS (IndexedDB)
// ─────────────────────────────────────────────────

export let receiptsDB = null;
export let receiptCounts = {};

export function getDB() {
  if (receiptsDB) return Promise.resolve(receiptsDB);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('home_finance_receipts', 1);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('receipts')) {
        const store = db.createObjectStore('receipts', { keyPath: 'id', autoIncrement: true });
        store.createIndex('itemKey', 'itemKey', { unique: false });
      }
    };
    req.onsuccess = e => { receiptsDB = e.target.result; resolve(receiptsDB); };
    req.onerror = () => reject(req.error);
  });
}

export async function refreshReceiptCounts() {
  const db = await getDB();
  return new Promise(resolve => {
    const req = db.transaction('receipts', 'readonly').objectStore('receipts').getAll();
    req.onsuccess = () => {
      receiptCounts = {};
      req.result.forEach(r => { receiptCounts[r.itemKey] = (receiptCounts[r.itemKey] || 0) + 1; });
      resolve();
    };
  });
}

export async function getReceipts(itemKey) {
  const db = await getDB();
  return new Promise(resolve => {
    const req = db.transaction('receipts', 'readonly').objectStore('receipts').index('itemKey').getAll(itemKey);
    req.onsuccess = () => resolve(req.result);
  });
}

export async function saveReceipt(itemKey, file) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('receipts', 'readwrite');
    const req = tx.objectStore('receipts').add({
      itemKey, fileName: file.name, fileType: file.type,
      fileSize: file.size, data: file, uploadedAt: new Date().toISOString()
    });
    req.onsuccess = () => resolve(); req.onerror = () => reject(req.error);
  });
}

export async function deleteReceiptById(id) {
  const db = await getDB();
  return new Promise(resolve => {
    const tx = db.transaction('receipts', 'readwrite');
    tx.objectStore('receipts').delete(id);
    tx.oncomplete = resolve;
  });
}

export function fundingBadge(f) {
  return f === 'own-funds'
    ? `<span class="badge" style="background:#ecfeff;color:#166534;border:1px solid #bbf7d0">Own Funds</span>`
    : `<span class="badge" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe">Loan</span>`;
}

export function attachBtn(itemKey, itemName) {
  const count = receiptCounts[itemKey] || 0;
  return `<button class="attach-btn${count ? ' has-files' : ''}" onclick="openReceiptsModal('${itemKey}','${itemName.replace(/'/g,'\\\'')}')" title="${count ? count + ' receipt(s)' : 'Add receipt'}">📎${count ? ` ${count}` : ''}</button>`;
}


export function fileSizeStr(bytes) {
  return bytes > 1048576 ? `${(bytes/1048576).toFixed(1)} MB` : `${Math.round(bytes/1024)} KB`;
}

export function fileIcon(type) {
  if (type === 'application/pdf') return '📄';
  if (type.startsWith('image/')) return '🖼️';
  return '📎';
}

export async function openReceiptsModal(itemKey, itemName) {
  window.openModal(`Receipts — ${itemName}`, '<div style="padding:20px;text-align:center;color:var(--text-muted)">Loading…</div>', () => {});
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="window.closeModal()">Close</button>`;
  await renderReceiptsList(itemKey, itemName);
}

export async function renderReceiptsList(itemKey, itemName) {
  const safeKey = itemKey;
  const safeName = itemName.replace(/'/g, '\\\'');
  const list = await getReceipts(itemKey);
  let html = '';

  if (list.length) {
    list.forEach(r => {
      const isLink = r.type === 'link';
      const icon = isLink ? '🔗' : fileIcon(r.fileType);
      const title = isLink ? (r.linkName || r.url) : r.fileName;
      const meta = isLink
        ? `<span style="color:var(--text-muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;max-width:260px">${r.url}</span>`
        : `<span>${fileSizeStr(r.fileSize)} · ${new Date(r.uploadedAt).toLocaleDateString('en-AU')}</span>`;
      const action = isLink
        ? `<button class="btn btn-ghost btn-sm" onclick="window.open('${r.url.replace(/'/g,'\\\'').replace(/"/g,'&quot;')}','_blank')">Open</button>`
        : `<button class="btn btn-ghost btn-sm" onclick="viewReceipt(${r.id})">View</button>`;
      html += `
        <div class="receipt-row">
          <div class="receipt-icon">${icon}</div>
          <div class="receipt-info">
            <div class="receipt-name">${title}</div>
            <div class="receipt-meta">${meta} · ${new Date(r.uploadedAt).toLocaleDateString('en-AU')}</div>
          </div>
          ${action}
          <button class="btn btn-danger-ghost btn-sm" onclick="removeReceipt(${r.id},'${safeKey}','${safeName}')" title="Delete">🗑</button>
        </div>`;
    });
  } else {
    html += `<div class="empty" style="padding:20px 0 16px"><div class="empty-icon">📎</div>No attachments yet</div>`;
  }

  // Add link form
  html += `
    <div style="border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:10px">
      <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:10px">🔗 Add Link</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <input class="form-input" id="link-url" type="url" placeholder="https://drive.google.com/…" style="font-size:13px">
        <div style="display:flex;gap:8px">
          <input class="form-input" id="link-name" type="text" maxlength="200" placeholder="Label (optional — e.g. Invoice #1234)" style="font-size:13px;flex:1">
          <button class="btn btn-primary btn-sm" onclick="addLink('${safeKey}','${safeName}')">Add</button>
        </div>
      </div>
    </div>`;

  // Upload area
  html += `
    <div class="drop-zone" id="drop-zone" onclick="document.getElementById('receipt-file-input').click()">
      <div class="drop-zone-icon">⬆️</div>
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:10px">Drop files here or click to upload</div>
      <div style="font-size:11px;color:var(--text-muted)">PDF, JPG, PNG, HEIC, WEBP</div>
      <input type="file" id="receipt-file-input" style="display:none" multiple accept=".pdf,.jpg,.jpeg,.png,.heic,.webp,image/*,application/pdf" onchange="uploadReceiptFiles('${safeKey}','${safeName}')" onclick="event.stopPropagation()">
    </div>`;

  document.getElementById('modal-body').innerHTML = html;

  const zone = document.getElementById('drop-zone');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', async e => {
    e.preventDefault(); zone.classList.remove('drag-over');
    await uploadFiles(itemKey, itemName, Array.from(e.dataTransfer.files));
  });
}

export async function addLink(itemKey, itemName) {
  const url = document.getElementById('link-url').value.trim();
  if (!url) { document.getElementById('link-url').focus(); return; }
  const linkName = document.getElementById('link-name').value.trim();
  const db = await getDB();
  await new Promise((resolve, reject) => {
    const tx = db.transaction('receipts', 'readwrite');
    const req = tx.objectStore('receipts').add({
      itemKey, type: 'link', url, linkName,
      uploadedAt: new Date().toISOString()
    });
    req.onsuccess = resolve; req.onerror = () => reject(req.error);
  });
  await refreshReceiptCounts();
  renderBuild();
  await renderReceiptsList(itemKey, itemName);
}

export async function uploadReceiptFiles(itemKey, itemName) {
  const input = document.getElementById('receipt-file-input');
  await uploadFiles(itemKey, itemName, Array.from(input.files));
}

export async function uploadFiles(itemKey, itemName, files) {
  for (const f of files) await saveReceipt(itemKey, f);
  await refreshReceiptCounts();
  renderBuild();
  await renderReceiptsList(itemKey, itemName);
}

export async function viewReceipt(id) {
  const db = await getDB();
  const r = await new Promise(resolve => {
    const req = db.transaction('receipts','readonly').objectStore('receipts').get(id);
    req.onsuccess = () => resolve(req.result);
  });
  if (r.type === 'link') { window.open(r.url, '_blank'); return; }
  const url = URL.createObjectURL(r.data);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}

export async function removeReceipt(id, itemKey, itemName) {
  if (!confirm('Delete this receipt?')) return;
  await deleteReceiptById(id);
  await refreshReceiptCounts();
  renderBuild();
  await renderReceiptsList(itemKey, itemName);
}

// ─── PWA install prompt ───────────────────────────
export let _installPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _installPrompt = e;
  const btn = document.getElementById('install-btn');
  if (btn) btn.style.display = 'flex';
});

window.addEventListener('appinstalled', () => {
  _installPrompt = null;
  const btn = document.getElementById('install-btn');
  if (btn) btn.style.display = 'none';
});

export function installApp() {
  if (!_installPrompt) return;
  _installPrompt.prompt();
  _installPrompt.userChoice.then(() => { _installPrompt = null; });
}

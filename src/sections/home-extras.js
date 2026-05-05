// Furniture and Appliances sections
import { state } from '../store.js';
import { aud, escHtml, escAttr, nextId, fmtDate } from './format.js';

export const FURN_ROOMS = ['Living Room','Dining Room','Kitchen','Master Bedroom','Bedroom 2','Bedroom 3','Study / Office','Bathroom','Laundry','Outdoor / Alfresco','Other'];

export function furnitureForm(f = {}) {
  const displayDate = f.deliveryDate ? (() => { const [y,m,d] = f.deliveryDate.split('-'); return `${d}/${m}/${y}`; })() : '';
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-furn-name" type="text" maxlength="200" value="${escAttr(f.name || '')}" placeholder="e.g. 3-seater sofa">
      </div>
      <div class="form-group">
        <label class="form-label">Room</label>
        <select class="form-select" id="f-furn-room">
          <option value="">— Select room —</option>
          ${FURN_ROOMS.map(r => `<option value="${r}" ${f.room===r?'selected':''}>${r}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Store / Vendor</label>
        <input class="form-input" id="f-furn-vendor" type="text" maxlength="200" value="${escAttr(f.vendor || '')}" placeholder="e.g. Nick Scali">
      </div>
      <div class="form-group">
        <label class="form-label">Price (AUD)</label>
        <input class="form-input" id="f-furn-price" type="number" max="99999999" value="${f.price || ''}" min="0" placeholder="Leave blank if TBC">
      </div>
    </div>
    <div class="form-row" style="align-items:flex-start">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-furn-status">
          <option value="to-purchase" ${(!f.status||f.status==='to-purchase')?'selected':''}>To Purchase</option>
          <option value="ordered"     ${f.status==='ordered'?'selected':''}>Ordered</option>
          <option value="delivered"   ${f.status==='delivered'?'selected':''}>Delivered</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Delivery Date</label>
        <input type="hidden" id="f-exp-duedate" value="${f.deliveryDate || ''}">
        <div class="date-picker-wrap" id="dp-wrap">
          <div class="date-picker-trigger${f.deliveryDate ? ' has-value' : ''}" id="dp-trigger" onclick="openDatePicker(event)">
            <span id="dp-display">${displayDate || 'Select a date'}</span>
            <span style="opacity:0.5;font-size:15px">&#128197;</span>
          </div>
          <div class="date-picker-popup hidden" id="dp-popup"></div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-furn-notes" type="text" maxlength="200" value="${escAttr(f.notes || '')}" placeholder="Optional — colour, dimensions, order number...">
    </div>
    <div class="form-group">
      <label class="form-label">Funding</label>
      <select class="form-select" id="f-furn-funding">
        <option value="own-funds" ${(f.funding||'own-funds')==='own-funds'?'selected':''}>Own Funds</option>
        <option value="loan"      ${f.funding==='loan'     ?'selected':''}>Loan</option>
      </select>
    </div>
  `;
}

export function furnitureFromForm(id) {
  return {
    id,
    name:         document.getElementById('f-furn-name').value.trim(),
    room:         document.getElementById('f-furn-room').value,
    vendor:       document.getElementById('f-furn-vendor').value.trim(),
    price:        parseFloat(document.getElementById('f-furn-price').value) || 0,
    status:       document.getElementById('f-furn-status').value,
    funding:      document.getElementById('f-furn-funding').value,
    deliveryDate: document.getElementById('f-exp-duedate').value || null,
    notes:        document.getElementById('f-furn-notes').value.trim(),
  };
}

export function openAddFurniture() {
  openModal('Add Furniture Item', furnitureForm(), () => {
    const f = furnitureFromForm(nextId(state.furniture));
    if (!f.name) return;
    logActivity('Added furniture', f.name);
    state.furniture.push(f);
    saveData(state); closeModal(); renderAll();
  });
}

export function openEditFurniture(id) {
  const f = state.furniture.find(x => x.id === id);
  openModal('Edit Furniture Item', furnitureForm(f), () => {
    const updated = furnitureFromForm(id);
    logActivity('Edited furniture', updated.name || f.name);
    Object.assign(f, updated);
    saveData(state); closeModal(); renderAll();
  });
}

export function deleteFurniture(id) {
  if (!confirm('Delete this item?')) return;
  const f = state.furniture.find(x => x.id === id);
  logActivity('Deleted furniture', f ? f.name : '');
  state.furniture = state.furniture.filter(f => f.id !== id);
  saveData(state); renderAll();
}

// ─────────────────────────────────────────────────
// APPLIANCES
// ─────────────────────────────────────────────────

export function applianceForm(a = {}) {
  const displayDate = a.deliveryDate ? (() => { const [y,m,d] = a.deliveryDate.split('-'); return `${d}/${m}/${y}`; })() : '';
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-appl-name" type="text" maxlength="200" value="${escAttr(a.name || '')}" placeholder="e.g. Dishwasher">
      </div>
      <div class="form-group">
        <label class="form-label">Room</label>
        <select class="form-select" id="f-appl-room">
          <option value="">— Select room —</option>
          ${FURN_ROOMS.map(r => `<option value="${r}" ${a.room===r?'selected':''}>${r}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Store / Vendor</label>
        <input class="form-input" id="f-appl-vendor" type="text" maxlength="200" value="${escAttr(a.vendor || '')}" placeholder="e.g. Harvey Norman">
      </div>
      <div class="form-group">
        <label class="form-label">Price (AUD)</label>
        <input class="form-input" id="f-appl-price" type="number" max="99999999" value="${a.price || ''}" min="0" placeholder="Leave blank if TBC">
      </div>
    </div>
    <div class="form-row" style="align-items:flex-start">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-appl-status">
          <option value="to-purchase" ${(!a.status||a.status==='to-purchase')?'selected':''}>To Purchase</option>
          <option value="ordered"     ${a.status==='ordered'?'selected':''}>Ordered</option>
          <option value="delivered"   ${a.status==='delivered'?'selected':''}>Delivered</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Delivery Date</label>
        <input type="hidden" id="f-exp-duedate" value="${a.deliveryDate || ''}">
        <div class="date-picker-wrap" id="dp-wrap">
          <div class="date-picker-trigger${a.deliveryDate ? ' has-value' : ''}" id="dp-trigger" onclick="openDatePicker(event)">
            <span id="dp-display">${displayDate || 'Select a date'}</span>
            <span style="opacity:0.5;font-size:15px">&#128197;</span>
          </div>
          <div class="date-picker-popup hidden" id="dp-popup"></div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-appl-notes" type="text" maxlength="200" value="${escAttr(a.notes || '')}" placeholder="Optional — model number, colour, order reference...">
    </div>
    <div class="form-group">
      <label class="form-label">Funding</label>
      <select class="form-select" id="f-appl-funding">
        <option value="own-funds" ${(a.funding||'own-funds')==='own-funds'?'selected':''}>Own Funds</option>
        <option value="loan"      ${a.funding==='loan'?'selected':''}>Loan</option>
      </select>
    </div>
  `;
}

export function applianceFromForm(id) {
  return {
    id,
    name:         document.getElementById('f-appl-name').value.trim(),
    room:         document.getElementById('f-appl-room').value,
    vendor:       document.getElementById('f-appl-vendor').value.trim(),
    price:        parseFloat(document.getElementById('f-appl-price').value) || 0,
    status:       document.getElementById('f-appl-status').value,
    funding:      document.getElementById('f-appl-funding').value,
    deliveryDate: document.getElementById('f-exp-duedate').value || null,
    notes:        document.getElementById('f-appl-notes').value.trim(),
  };
}

export function openAddAppliance() {
  openModal('Add Appliance', applianceForm(), () => {
    const a = applianceFromForm(nextId(state.appliances));
    if (!a.name) return;
    logActivity('Added appliance', a.name);
    state.appliances.push(a);
    saveData(state); closeModal(); renderAll();
  });
}

export function openEditAppliance(id) {
  const a = state.appliances.find(x => x.id === id);
  openModal('Edit Appliance', applianceForm(a), () => {
    const updated = applianceFromForm(id);
    logActivity('Edited appliance', updated.name || a.name);
    Object.assign(a, updated);
    saveData(state); closeModal(); renderAll();
  });
}

export function deleteAppliance(id) {
  if (!confirm('Delete this item?')) return;
  const a = state.appliances.find(x => x.id === id);
  logActivity('Deleted appliance', a ? a.name : '');
  state.appliances = state.appliances.filter(a => a.id !== id);
  saveData(state); renderAll();
}

// ─────────────────────────────────────────────────

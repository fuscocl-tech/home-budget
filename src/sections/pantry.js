// Pantry Stocktake section
import { state } from '../store.js';
import { escHtml, escAttr, nextId } from './format.js';

export const PANTRY_CATS = ['Fridge','Freezer','Pantry','Fruit & Veg','Spices','Drinks','Cleaning','Other'];

export const PANTRY_STARTERS = [
  { name:'Milk', cat:'Fridge' },{ name:'Eggs', cat:'Fridge' },{ name:'Cheese', cat:'Fridge' },{ name:'Butter', cat:'Fridge' },{ name:'Yoghurt', cat:'Fridge' },
  { name:'Chicken breast', cat:'Freezer' },{ name:'Mince', cat:'Freezer' },{ name:'Fish fillets', cat:'Freezer' },{ name:'Frozen veg', cat:'Freezer' },
  { name:'Pasta', cat:'Pantry' },{ name:'Rice', cat:'Pantry' },{ name:'Tinned tomatoes', cat:'Pantry' },{ name:'Olive oil', cat:'Pantry' },{ name:'Flour', cat:'Pantry' },{ name:'Sugar', cat:'Pantry' },{ name:'Bread', cat:'Pantry' },{ name:'Cereal', cat:'Pantry' },
  { name:'Onions', cat:'Fruit & Veg' },{ name:'Potatoes', cat:'Fruit & Veg' },{ name:'Bananas', cat:'Fruit & Veg' },{ name:'Apples', cat:'Fruit & Veg' },
  { name:'Salt', cat:'Spices' },{ name:'Pepper', cat:'Spices' },{ name:'Garlic', cat:'Spices' },
];

export function renderPantry() {
  const el = document.getElementById('pantry-content');
  if (!el) return;
  const items = state.meals.pantry || [];

  if (items.length === 0) {
    const starters = PANTRY_STARTERS;
    el.innerHTML = `
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon" style="font-size:48px">🥫</div>
        <p style="margin:12px 0">Track what's in your kitchen. Tap items you usually keep stocked.</p>
        <button class="btn btn-primary" onclick="openPantryForm()">+ Add Item</button>
      </div>
      <div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add common items</div>
        <div class="pantry-starter">
          ${starters.map(s => `<button class="pantry-starter-btn" onclick="quickAddPantry('${escAttr(s.name)}','${s.cat}')">${escHtml(s.name)}</button>`).join('')}
        </div>
      </div>`;
    return;
  }

  // Group by category
  const byCategory = {};
  PANTRY_CATS.forEach(c => byCategory[c] = []);
  items.forEach(item => {
    const cat = PANTRY_CATS.includes(item.cat) ? item.cat : 'Other';
    byCategory[cat].push(item);
  });

  // Count statuses
  const needCount = items.filter(i => i.status === 'need').length;
  const lowCount = items.filter(i => i.status === 'low').length;

  let html = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${needCount > 0 ? `<span class="veh-badge red">${needCount} need</span>` : ''}
        ${lowCount > 0 ? `<span class="veh-badge amber">${lowCount} low</span>` : ''}
        <span style="font-size:13px;color:var(--text-muted)">${items.length} items tracked</span>
      </div>
      <div style="display:flex;gap:8px">
        ${needCount > 0 ? `<button class="btn btn-sm" onclick="pantryToShoppingList()">Add ${needCount + lowCount} to shopping list</button>` : ''}
        <button class="btn btn-primary btn-sm" onclick="openPantryForm()">+ Add Item</button>
      </div>
    </div>`;

  PANTRY_CATS.forEach(cat => {
    const catItems = byCategory[cat];
    if (!catItems.length) return;
    html += `<div class="pantry-cat-header">${escHtml(cat)} (${catItems.length})</div>`;
    catItems.forEach(item => {
      const statusIcon = item.status === 'stocked' ? '✓' : item.status === 'low' ? '!' : '✗';
      const nextStatus = item.status === 'stocked' ? 'low' : item.status === 'low' ? 'need' : 'stocked';
      html += `<div class="pantry-item">
        <div class="pantry-status ${item.status}" onclick="cyclePantryStatus(${item.id})" title="Tap to change">${statusIcon}</div>
        <div class="pantry-body">
          <div class="pantry-name">${escHtml(item.name)}</div>
          ${item.qty ? `<div class="pantry-meta">${escHtml(item.qty)}</div>` : ''}
        </div>
        <div class="pantry-actions">
          <button class="btn btn-sm" style="font-size:11px" onclick="openPantryForm(${item.id})">Edit</button>
          <button class="btn btn-sm" style="font-size:11px;color:var(--danger)" onclick="deletePantryItem(${item.id})">×</button>
        </div>
      </div>`;
    });
  });

  // Quick-add more if fewer than 10 items
  if (items.length < 10) {
    const existing = new Set(items.map(i => i.name.toLowerCase()));
    const starters = PANTRY_STARTERS.filter(s => !existing.has(s.name.toLowerCase()));
    if (starters.length) {
      html += `<div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add more</div>
        <div class="pantry-starter">
          ${starters.slice(0, 12).map(s => `<button class="pantry-starter-btn" onclick="quickAddPantry('${escAttr(s.name)}','${s.cat}')">${escHtml(s.name)}</button>`).join('')}
        </div>
      </div>`;
    }
  }

  el.innerHTML = html;
}

export function cyclePantryStatus(id) {
  const item = (state.meals.pantry || []).find(i => i.id === id);
  if (!item) return;
  const cycle = { stocked: 'low', low: 'need', need: 'stocked' };
  item.status = cycle[item.status] || 'stocked';
  window.saveData(state);
  renderPantry();
}

export function openPantryForm(editId) {
  const item = editId ? (state.meals.pantry || []).find(i => i.id === editId) : null;

  document.getElementById('modal-title').textContent = item ? 'Edit Item' : 'Add Pantry Item';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="pf-name" type="text" maxlength="200" value="${item ? escAttr(item.name) : ''}" placeholder="e.g. Pasta, Milk, Chicken">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="pf-cat">
          ${PANTRY_CATS.map(c => `<option value="${c}"${item && item.cat === c ? ' selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Quantity <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="pf-qty" type="text" maxlength="200" value="${item ? escAttr(item.qty || '') : ''}" placeholder="e.g. 2 bags, 1L, 500g">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Status</label>
      <div style="display:flex;gap:8px">
        ${['stocked','low','need'].map(s => {
          const labels = { stocked:'Stocked', low:'Running Low', need:'Need to Buy' };
          const colors = { stocked:'#10b981', low:'#f59e0b', need:'#ef4444' };
          const active = (item?.status || 'stocked') === s;
          return `<label style="flex:1;cursor:pointer;text-align:center;padding:10px;border-radius:8px;border:2px solid ${active ? colors[s] : 'var(--border)'};background:${active ? colors[s] + '15' : 'var(--surface)'};font-size:12px;font-weight:600;color:${active ? colors[s] : 'var(--text-muted)'}">
            <input type="radio" name="pf-status" value="${s}" ${active ? 'checked' : ''} style="display:none">${labels[s]}
          </label>`;
        }).join('')}
      </div>
    </div>`;

  document.getElementById('modal-footer').innerHTML = `
    ${item ? `<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deletePantryItem(${editId});window.closeModal()">Delete</button>` : ''}
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="savePantryItem(${editId || 'null'})">Save</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

export function savePantryItem(editId) {
  const name = document.getElementById('pf-name')?.value.trim();
  if (!name) return;
  const data = {
    name,
    cat: document.getElementById('pf-cat')?.value || 'Other',
    qty: document.getElementById('pf-qty')?.value.trim() || '',
    status: document.querySelector('input[name="pf-status"]:checked')?.value || 'stocked'
  };

  const pantry = state.meals.pantry;
  if (editId) {
    const item = pantry.find(i => i.id === editId);
    if (item) Object.assign(item, data);
  } else {
    data.id = pantry.length ? Math.max(...pantry.map(i => i.id)) + 1 : 1;
    pantry.push(data);
  }
  window.saveData(state);
  window.closeModal();
  renderPantry();
}

export function deletePantryItem(id) {
  state.meals.pantry = (state.meals.pantry || []).filter(i => i.id !== id);
  window.saveData(state);
  renderPantry();
}

export function quickAddPantry(name, cat) {
  const pantry = state.meals.pantry;
  pantry.push({
    id: pantry.length ? Math.max(...pantry.map(i => i.id)) + 1 : 1,
    name, cat, qty: '', status: 'stocked'
  });
  window.saveData(state);
  renderPantry();
}

export function pantryToShoppingList() {
  const toAdd = (state.meals.pantry || []).filter(i => i.status === 'need' || i.status === 'low');
  if (!toAdd.length) return;
  if (!state.lists) state.lists = {};
  if (!state.lists.food) state.lists.food = { items: [], weeklyBudget: 200, budget: 0, stores: [], favourites: [], history: [] };
  const existing = state.lists.food.items;
  const aisleMap = { 'Fridge':'dairy', 'Freezer':'frozen', 'Pantry':'pantry', 'Fruit & Veg':'produce', 'Spices':'pantry', 'Drinks':'drinks', 'Cleaning':'cleaning', 'Other':'other' };
  let added = 0;
  toAdd.forEach(item => {
    if (!existing.some(e => e.name.toLowerCase() === item.name.toLowerCase() && e.state === 'active')) {
      existing.push({ id: 'si-' + Date.now() + '-' + added, name: item.name, quantity: 1, unit: 'units', notes: '', aisle: aisleMap[item.cat] || 'other', state: 'active', addedBy: 'pantry', addedAt: new Date().toISOString(), mealTag: 'Pantry', manualPrice: null, barcodeId: null });
      added++;
    }
  });
  if (added > 0) {
    window.saveData(state);
    _listsActiveType = 'food';
    _listsView = 'list';
    activateTab('lists');
  }
  // Brief confirmation
  const btn = document.querySelector('[onclick*="pantryToShoppingList"]');
  if (btn) {
    const orig = btn.textContent;
    btn.textContent = `Added ${added} items`;
    btn.style.color = 'var(--success)';
    setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 2000);
  }
}


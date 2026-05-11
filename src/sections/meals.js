// Meal Planner and Shopping Lists sections
import { state } from '../store.js';
import { aud, escHtml, escAttr, nextId } from './format.js';
import { prefsGet, prefsSet, prefsClear } from '../prefs.js';

export let _mealWeekOffset = 0;      // 0 = current week

export const SHOP_CATS = ['Produce','Meat & Seafood','Dairy & Eggs','Pantry','Bakery','Frozen','Household','Other'];
export const SHOP_ICONS = { 'Produce':'🥦','Meat & Seafood':'🥩','Dairy & Eggs':'🥛','Pantry':'🥫','Bakery':'🍞','Frozen':'🧊','Household':'🏠','Other':'🛒' };

// ── Section 10: Lists constants ──────────────────────────────────
export const LIST_TYPES = {
  food:     { label: 'Food',          emoji: '🛒', color: '#dcfce7', text: '#166534', aisles: true,  priceEst: true  },
  clothes:  { label: 'Clothes',       emoji: '👕', color: '#dbeafe', text: '#1e40af', aisles: false, priceEst: false },
  wishlist: { label: 'Wishlist',      emoji: '🎁', color: '#fce7f3', text: '#9d174d', aisles: false, priceEst: false },
  home:     { label: 'Home & Garden', emoji: '🛠', color: '#fef3c7', text: '#92400e', aisles: true,  priceEst: false },
  pharmacy: { label: 'Pharmacy',      emoji: '💊', color: '#ede9fe', text: '#5b21b6', aisles: true,  priceEst: false },
};

export const LIST_AISLES = {
  food: [
    { key: 'produce',  emoji: '🥦', label: 'Produce' },
    { key: 'dairy',    emoji: '🥛', label: 'Dairy & Eggs' },
    { key: 'bakery',   emoji: '🍞', label: 'Bakery' },
    { key: 'meat',     emoji: '🥩', label: 'Meat & Seafood' },
    { key: 'pantry',   emoji: '🥫', label: 'Pantry' },
    { key: 'frozen',   emoji: '🧊', label: 'Frozen' },
    { key: 'health',   emoji: '🧴', label: 'Health & Beauty' },
    { key: 'bathroom', emoji: '🚿', label: 'Bathroom' },
    { key: 'cleaning', emoji: '🧹', label: 'Cleaning' },
    { key: 'drinks',   emoji: '🍷', label: 'Drinks & Alcohol' },
    { key: 'other',    emoji: '🛒', label: 'Uncategorised' },
  ],
  home: [
    { key: 'tools',   emoji: '🔨', label: 'Tools & Hardware' },
    { key: 'garden',  emoji: '🌱', label: 'Garden' },
    { key: 'cleaning',emoji: '🧹', label: 'Cleaning' },
    { key: 'other',   emoji: '🛒', label: 'Other' },
  ],
  pharmacy: [
    { key: 'medicine', emoji: '💊', label: 'Medicine' },
    { key: 'skincare', emoji: '🧴', label: 'Skincare' },
    { key: 'vitamins', emoji: '💪', label: 'Vitamins' },
    { key: 'other',    emoji: '🛒', label: 'Other' },
  ],
};

export const FOOD_AISLE_LOOKUP = {
  milk:'dairy', cheese:'dairy', butter:'dairy', eggs:'dairy', yoghurt:'dairy', cream:'dairy',
  bread:'bakery', rolls:'bakery', muffin:'bakery', croissant:'bakery', baguette:'bakery',
  apple:'produce', banana:'produce', orange:'produce', strawberry:'produce', tomato:'produce', lettuce:'produce', spinach:'produce', carrot:'produce', broccoli:'produce', potato:'produce', onion:'produce', garlic:'produce', cucumber:'produce', capsicum:'produce', avocado:'produce', lemon:'produce', lime:'produce', grapes:'produce', mango:'produce', pineapple:'produce', watermelon:'produce',
  chicken:'meat', beef:'meat', mince:'meat', steak:'meat', pork:'meat', lamb:'meat', salmon:'meat', fish:'meat', tuna:'meat', prawn:'meat', sausage:'meat', bacon:'meat',
  rice:'pantry', pasta:'pantry', flour:'pantry', sugar:'pantry', oil:'pantry', vinegar:'pantry', salt:'pantry', pepper:'pantry', sauce:'pantry', stock:'pantry', beans:'pantry', lentils:'pantry', chickpeas:'pantry', cereal:'pantry', oats:'pantry', honey:'pantry', jam:'pantry', peanut:'pantry', coffee:'pantry', tea:'pantry', biscuit:'pantry', cracker:'pantry', chocolate:'pantry', chips:'pantry', nuts:'pantry',
  icecream:'frozen', peas:'frozen', corn:'frozen', pizza:'frozen',
  shampoo:'health', conditioner:'health', deodorant:'health', sunscreen:'health', moisturiser:'health', makeup:'health', lipstick:'health', mascara:'health', toothpaste:'bathroom', toothbrush:'bathroom', soap:'bathroom', toilet:'bathroom', razors:'bathroom', tampons:'bathroom', pads:'bathroom',
  detergent:'cleaning', bleach:'cleaning', sponge:'cleaning', dishwashing:'cleaning', bins:'cleaning', mop:'cleaning',
  water:'drinks', juice:'drinks', beer:'drinks', wine:'drinks', spirits:'drinks', softdrink:'drinks', soda:'drinks', kombucha:'drinks',
};

export function _inferAisle(name) {
  var lower = name.toLowerCase();
  var keys = Object.keys(FOOD_AISLE_LOOKUP);
  for (var i = 0; i < keys.length; i++) {
    if (lower.indexOf(keys[i]) !== -1) return FOOD_AISLE_LOOKUP[keys[i]];
  }
  return 'other';
}

export function _parseShopInput(raw) {
  var s = raw.trim();
  var qty = 1, unit = 'units', name = s;
  var m1 = s.match(/^(\d+(?:\.\d+)?)\s*(kg|g|L|l|ml|dozen|doz)\s+(.+)$/i);
  if (m1) {
    qty = parseFloat(m1[1]);
    unit = m1[2].toLowerCase() === 'l' ? 'L' : m1[2].toLowerCase() === 'doz' ? 'dozen' : m1[2];
    name = m1[3];
  } else {
    var m2 = s.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);
    if (m2) { qty = parseFloat(m2[1]); name = m2[2]; }
    else if (/^dozen\s+/i.test(s)) { qty = 1; unit = 'dozen'; name = s.replace(/^dozen\s+/i, ''); }
  }
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return { qty: qty, unit: unit, name: name };
}

// Lists state — exposed as window properties so onclick strings can assign them
let _listsActiveType = 'food';
let _listsView = 'selector';
export function _getListsActiveType() { return _listsActiveType; }
export function _setListsActiveType(v) { _listsActiveType = v; if (window._listsActiveType !== undefined) window._listsActiveType = v; }
export function _getListsView() { return _listsView; }
export function _setListsView(v) { _listsView = v; if (window._listsView !== undefined) window._listsView = v; }
// Define as window properties with getters/setters for onclick attribute compatibility
Object.defineProperty(window, '_listsActiveType', {
  get() { return _listsActiveType; },
  set(v) { _listsActiveType = v; },
  configurable: true,
});
Object.defineProperty(window, '_listsView', {
  get() { return _listsView; },
  set(v) { _listsView = v; },
  configurable: true,
});
// ── End Section 10 constants ─────────────────────────────────────

export function _mealWeekKey(offset) {
  const now = new Date();
  const daysToMon = now.getDay() === 0 ? -6 : 1 - now.getDay();
  const mon = new Date(now);
  mon.setDate(now.getDate() + daysToMon + (offset || 0) * 7);
  return mon.toISOString().slice(0, 10);
}

export function _mealWeekDates(weekKey) {
  const mon = new Date(weekKey + 'T00:00:00');
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); return d; });
}

export function renderMeals() {
  if (window._mealView === 'shopping') _renderShoppingList();
  else _renderMealPlan();
}

export function _renderMealPlan() {
  const weekKey = _mealWeekKey(_mealWeekOffset);
  const dates   = _mealWeekDates(weekKey);
  const plan    = state.meals.plan[weekKey] || {};
  const todayStr = new Date().toISOString().slice(0, 10);
  const DAYS  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const SLOTS = [{ key:'b', label:'Breakfast' }, { key:'l', label:'Lunch' }, { key:'d', label:'Dinner' }];

  const weekStart = dates[0].toLocaleDateString('en-AU', { day:'numeric', month:'short' });
  const weekEnd   = dates[6].toLocaleDateString('en-AU', { day:'numeric', month:'short' });

  const mealsFlat = [];
  for (let di = 0; di < 7; di++) {
    const dp = plan[di] || {};
    ['b','l','d'].forEach(s => { if (dp[s]) mealsFlat.push(dp[s]); });
  }

  let gridRows = '';
  SLOTS.forEach(slot => {
    gridRows += `<div class="meal-grid-label">${slot.label}</div>`;
    dates.forEach((date, di) => {
      const meal    = (plan[di] || {})[slot.key] || '';
      const isToday = date.toISOString().slice(0, 10) === todayStr;
      gridRows += `<div class="meal-cell${isToday ? ' today' : ''}" onclick="openMealEdit('${weekKey}',${di},'${slot.key}')">
        ${meal ? `<span class="meal-cell-text">${meal}${state.settings?.showCalories && (plan[di] || {})['cal_' + slot.key] ? `<br><span style="font-size:9px;color:var(--text-muted);font-weight:600">${(plan[di])['cal_' + slot.key]} cal</span>` : ''}</span>` : `<span class="meal-cell-plus">+</span>`}
      </div>`;
    });
  });

  document.getElementById('meals-content').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:8px">
        <button class="btn btn-sm" onclick="_mealWeekOffset--;renderMeals()" style="font-size:16px;padding:2px 10px">‹</button>
        <span style="font-size:15px;font-weight:600;min-width:150px;text-align:center">
          ${_mealWeekOffset === 0 ? 'This Week' : _mealWeekOffset === 1 ? 'Next Week' : _mealWeekOffset === -1 ? 'Last Week' : `${weekStart} – ${weekEnd}`}
        </span>
        <button class="btn btn-sm" onclick="_mealWeekOffset++;renderMeals()" style="font-size:16px;padding:2px 10px">›</button>
        ${_mealWeekOffset !== 0 ? `<button class="btn btn-sm" onclick="_mealWeekOffset=0;renderMeals()">This week</button>` : ''}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${mealsFlat.length > 0 ? `<button class="btn btn-sm" id="gen-shop-btn" onclick="generateShoppingList('${weekKey}')">🛒 Generate shopping list</button>` : ''}
        <button class="btn btn-primary btn-sm" onclick="_listsActiveType='food';_listsView='list';activateTab('lists')">Shopping list →</button>
      </div>
    </div>

    <div style="overflow-x:auto;margin-bottom:8px">
      <div class="meal-grid" style="min-width:560px">
        <div class="meal-grid-corner"></div>
        ${dates.map((date, i) => {
          const isToday = date.toISOString().slice(0, 10) === todayStr;
          return `<div class="meal-grid-header${isToday ? ' today' : ''}"><div>${DAYS[i]}</div><div style="font-size:10px;opacity:0.7">${date.getDate()}/${date.getMonth()+1}</div></div>`;
        }).join('')}
        ${gridRows}
        ${state.settings?.showCalories ? `<div class="meal-grid-label" style="font-weight:800;font-size:9px">Total</div>` + dates.map((date, di) => {
          const dp = plan[di] || {};
          const total = (dp.cal_b || 0) + (dp.cal_l || 0) + (dp.cal_d || 0);
          return `<div style="background:var(--surface);padding:6px;text-align:center;font-size:11px;font-weight:700;color:${total > 0 ? (total > 2500 ? 'var(--danger)' : total > 2000 ? 'var(--warning)' : 'var(--text)') : 'var(--border)'}">${total > 0 ? total.toLocaleString() : '—'}</div>`;
        }).join('') : ''}
      </div>
    </div>
    <p style="font-size:12px;color:var(--text-muted);margin-top:6px">Tap any cell to add or change a meal.</p>`;
}

export let _mealSuggestFilters = { cuisine: 'Any', price: 0, dietary: 'Any' };

const _MEAL_CUISINES = ['Any','Italian','Asian','Mexican','Indian','Mediterranean','Thai','Japanese','Middle Eastern','Australian'];
const _MEAL_DIETARY  = ['Any','Vegetarian','Vegan','Gluten-free','Quick (<30min)','Family-friendly'];

export function openMealEdit(weekKey, dayIdx, slot) {
  const DAYS_FULL = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const SLOTS_LBL = { b:'Breakfast', l:'Lunch', d:'Dinner' };
  const current = ((state.meals.plan[weekKey] || {})[dayIdx] || {})[slot] || '';
  const hasKey  = !!prefsGet('toto_ai_key');

  const seen = new Set();
  Object.values(state.meals.plan).forEach(week =>
    Object.values(week).forEach(day => {
      if (typeof day === 'object') ['b','l','d'].forEach(s => { if (day[s]) seen.add(day[s]); });
    })
  );
  const prev = [...seen].filter(m => m !== current).slice(0, 16);

  document.getElementById('modal-title').textContent = `${DAYS_FULL[dayIdx]} · ${SLOTS_LBL[slot]}`;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">Meal</label>
      <input class="form-input" id="meal-input" type="text" maxlength="200" value="${current.replace(/"/g,'&quot;')}"
        placeholder="e.g. Pasta Bolognese, Chicken stir-fry…" autocomplete="off">
    </div>

    ${hasKey ? `
    <div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:16px;background:var(--surface2)">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:12px">✨ AI Suggestions</div>

      <div style="margin-bottom:10px">
        <div class="form-label" style="margin-bottom:5px">Cuisine</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px" id="meal-f-cuisine">
          ${_MEAL_CUISINES.map(o => _mealPill('cuisine', o)).join('')}
        </div>
      </div>

      <div style="margin-bottom:12px">
        <div class="form-label" style="display:flex;justify-content:space-between;margin-bottom:5px">
          <span>Meal budget (per serve)</span>
          <span id="meal-price-lbl" style="color:#0891b2;font-weight:700">${_mealSuggestFilters.price > 0 ? '$'+_mealSuggestFilters.price : 'Any'}</span>
        </div>
        <input type="range" min="0" max="200" step="5" value="${_mealSuggestFilters.price}"
          style="width:100%;accent-color:#0891b2;cursor:pointer"
          oninput="_mealPriceSlide(+this.value)">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-top:2px">
          <span>Any price</span><span>$200</span>
        </div>
      </div>

      <div>
        <div class="form-label" style="margin-bottom:5px">Dietary / Style</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px" id="meal-f-dietary">
          ${_MEAL_DIETARY.map(o => _mealPill('dietary', o)).join('')}
        </div>
      </div>
      <div style="margin-bottom:12px"></div>

      <button class="btn btn-sm" id="meal-suggest-btn" onclick="_mealGetSuggestions('${slot}')"
        style="width:100%;justify-content:center">Get suggestions</button>
      <div id="meal-suggest-out" style="margin-top:10px"></div>
    </div>` : ''}

    ${prev.length ? `
    <div>
      <div class="form-label" style="margin-bottom:8px">Previous meals</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${prev.map(m => `<button style="padding:5px 12px;border-radius:99px;border:1px solid var(--border);background:var(--surface);font-size:12px;cursor:pointer"
          onclick="document.getElementById('meal-input').value='${m.replace(/'/g,"\\'")}'">${m}</button>`).join('')}
      </div>
    </div>` : ''}`;

  document.getElementById('modal-footer').innerHTML = `
    <button class="btn" onclick="saveMealSlot('${weekKey}',${dayIdx},'${slot}','')">Clear</button>
    <button class="btn btn-primary" onclick="saveMealSlot('${weekKey}',${dayIdx},'${slot}',document.getElementById('meal-input').value.trim())">Save</button>`;

  document.getElementById('modal-overlay').classList.remove('hidden');
  setTimeout(() => { const el = document.getElementById('meal-input'); if (el) { el.focus(); el.select(); } }, 80);
}

export function _mealPill(type, value) {
  const active = _mealSuggestFilters[type] === value;
  return `<button data-filter="${type}" data-val="${value}"
    onclick="_mealToggleFilter('${type}','${value}')"
    style="padding:4px 10px;border-radius:99px;font-size:12px;cursor:pointer;white-space:nowrap;
      border:1.5px solid ${active?'#0891b2':'var(--border)'};
      background:${active?'#ecfeff':'var(--surface)'};
      color:${active?'#0891b2':'var(--text)'}">${value}</button>`;
}

export function _mealToggleFilter(type, value) {
  _mealSuggestFilters[type] = value;
  document.querySelectorAll(`[data-filter="${type}"]`).forEach(btn => {
    const active = btn.dataset.val === value;
    btn.style.borderColor = active ? '#0891b2' : 'var(--border)';
    btn.style.background  = active ? '#ecfeff' : 'var(--surface)';
    btn.style.color       = active ? '#0891b2'  : 'var(--text)';
  });
}

export function _mealPriceSlide(val) {
  _mealSuggestFilters.price = val;
  const lbl = document.getElementById('meal-price-lbl');
  if (lbl) lbl.textContent = val > 0 ? `$${val}` : 'Any';
}

export async function _mealGetSuggestions(slot) {
  const key = prefsGet('toto_ai_key');
  if (!key) return;
  const btn = document.getElementById('meal-suggest-btn');
  const out = document.getElementById('meal-suggest-out');
  if (btn) { btn.textContent = '⏳ Thinking…'; btn.disabled = true; }
  if (out) out.innerHTML = '';

  const SLOTS_LBL = { b:'Breakfast', l:'Lunch', d:'Dinner' };
  const filters = [
    _mealSuggestFilters.cuisine !== 'Any' ? `Cuisine: ${_mealSuggestFilters.cuisine}` : '',
    _mealSuggestFilters.price   > 0       ? `Budget: up to $${_mealSuggestFilters.price} per serve` : '',
    _mealSuggestFilters.dietary !== 'Any' ? `Style: ${_mealSuggestFilters.dietary}` : '',
  ].filter(Boolean).join(', ') || 'No specific filters';

  const prompt = `Suggest 8 ${SLOTS_LBL[slot]} meal ideas. Filters: ${filters}.
Return ONLY a JSON array of meal names, no other text: ["Meal 1","Meal 2",...]`;

  try {
    const res = await fetch(CLAUDE_API, {
      method:'POST',
      headers:{'x-api-key':key,'anthropic-version':'2023-06-01','content-type':'application/json'},
      body: JSON.stringify({ model:'claude-haiku-4-5-20251001', max_tokens:256, messages:[{role:'user',content:prompt}] })
    });
    const data = await res.json();
    const match = data.content[0].text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON');
    const meals = JSON.parse(match[0]);
    if (out) out.innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:6px">
      ${meals.map(m => `<button style="padding:6px 12px;border-radius:99px;border:1px solid #0891b2;background:#ecfeff;color:#0891b2;font-size:12px;font-weight:500;cursor:pointer"
        onclick="document.getElementById('meal-input').value='${m.replace(/'/g,"\\'")}'">${m}</button>`).join('')}
    </div>`;
  } catch(err) {
    if (out) out.innerHTML = `<span style="font-size:12px;color:var(--danger)">⚠ ${err.message}</span>`;
  } finally {
    if (btn) { btn.textContent = 'Get suggestions'; btn.disabled = false; }
  }
}

export function saveMealSlot(weekKey, dayIdx, slot, value) {
  if (!state.meals.plan[weekKey]) state.meals.plan[weekKey] = {};
  if (!state.meals.plan[weekKey][dayIdx]) state.meals.plan[weekKey][dayIdx] = { b:'', l:'', d:'' };
  state.meals.plan[weekKey][dayIdx][slot] = value;
  // Clear old calorie estimate
  delete state.meals.plan[weekKey][dayIdx]['cal_' + slot];
  window.saveData(state);
  window.closeModal();
  _renderMealPlan();
  // Estimate calories async if enabled
  if (value && state.settings?.showCalories) _estimateMealCalories(weekKey, dayIdx, slot, value);
}

export async function _estimateMealCalories(weekKey, dayIdx, slot, mealName) {
  const key = prefsGet('toto_ai_key');
  if (!key || !mealName) return;
  try {
    const res = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 50,
        messages: [{ role: 'user', content: `Estimate the calories in this meal: "${mealName}". Return ONLY a number, nothing else. For example: 450` }]
      })
    });
    if (!res.ok) return;
    const data = await res.json();
    const cal = parseInt(data.content[0].text.trim().replace(/[^0-9]/g, ''));
    if (cal > 0 && cal < 5000 && state.meals.plan[weekKey]?.[dayIdx]) {
      state.meals.plan[weekKey][dayIdx]['cal_' + slot] = cal;
      window.saveData(state);
      _renderMealPlan();
    }
  } catch(e) { /* silent */ }
}

export function _renderShoppingList() {
  const items    = state.meals.shopping || [];
  const nDone    = items.filter(i => i.checked).length;
  const nTodo    = items.length - nDone;

  const byCategory = {};
  SHOP_CATS.forEach(c => byCategory[c] = []);
  items.forEach(i => { const c = SHOP_CATS.includes(i.cat) ? i.cat : 'Other'; byCategory[c].push(i); });

  let listHtml = '';
  SHOP_CATS.forEach(cat => {
    const catItems = byCategory[cat];
    if (!catItems.length) return;
    listHtml += `
      <div style="margin-bottom:18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:4px">
          ${SHOP_ICONS[cat]} ${cat}
        </div>
        ${catItems.map(item => `
          <div class="shop-row">
            <input type="checkbox" ${item.checked?'checked':''} onchange="toggleShopItem(${item.id},this.checked)"
              style="width:18px;height:18px;cursor:pointer;accent-color:#0891b2;flex-shrink:0">
            <span style="flex:1;font-size:14px;${item.checked?'text-decoration:line-through;color:var(--text-muted)':''}">${escHtml(item.name)}</span>
            ${item.qty ? `<span style="font-size:12px;color:var(--text-muted);white-space:nowrap">${item.qty}</span>` : ''}
            <button onclick="removeShopItem('${item.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:18px;line-height:1;padding:2px 4px">×</button>
          </div>`).join('')}
      </div>`;
  });

  if (!listHtml) listHtml = `<div class="empty"><div class="empty-icon">🛒</div><p>No items yet — generate from your meal plan or add manually below.</p></div>`;

  document.getElementById('meals-content').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px">
      <button class="btn btn-sm" onclick="window._mealView='plan';renderMeals()">← Meal Plan</button>
      <div style="display:flex;gap:8px">
        ${nDone > 0 ? `<button class="btn btn-sm" onclick="clearCheckedShopItems()">Remove ticked (${nDone})</button>` : ''}
      </div>
    </div>

    <div class="section" style="margin-bottom:20px">
      <div class="section-header"><div class="section-title">Add Item</div></div>
      <div style="padding:14px 20px;display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
        <div style="flex:2;min-width:140px">
          <div class="form-label">Item</div>
          <input class="form-input" id="shop-name" type="text" maxlength="200" placeholder="e.g. Chicken breast" autocomplete="off"
            onkeydown="if(event.key==='Enter')addShopItem()">
        </div>
        <div style="flex:1;min-width:80px">
          <div class="form-label">Qty</div>
          <input class="form-input" id="shop-qty" type="text" maxlength="200" placeholder="500g" autocomplete="off">
        </div>
        <div style="flex:1;min-width:120px">
          <div class="form-label">Category</div>
          <select class="form-select" id="shop-cat">
            ${SHOP_CATS.map(c => `<option value="${c}">${SHOP_ICONS[c]} ${c}</option>`).join('')}
          </select>
        </div>
        <button class="btn btn-primary" onclick="addShopItem()">Add</button>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-title">Shopping List</div>
        <span style="font-size:12px;color:var(--text-muted)">${nTodo} to get${nDone > 0 ? ` · ${nDone} done` : ''}</span>
      </div>
      <div style="padding:8px 20px 16px">${listHtml}</div>
    </div>`;
}

export function addShopItem() {
  const name = document.getElementById('shop-name')?.value.trim();
  if (!name) return;
  const qty = document.getElementById('shop-qty')?.value.trim() || '';
  const cat = document.getElementById('shop-cat')?.value || 'Other';
  const items = state.meals.shopping;
  items.push({ id: items.length ? Math.max(...items.map(i=>i.id))+1 : 1, name, qty, cat, checked:false });
  window.saveData(state);
  _renderShoppingList();
}

export function toggleShopItem(id, checked) {
  const item = state.meals.shopping.find(i => i.id === id);
  if (item) { item.checked = checked; window.saveData(state); }
}

export function removeShopItem(id) {
  state.meals.shopping = state.meals.shopping.filter(i => i.id !== id);
  window.saveData(state);
  _renderShoppingList();
}

export function clearCheckedShopItems() {
  state.meals.shopping = state.meals.shopping.filter(i => !i.checked);
  window.saveData(state);
  _renderShoppingList();
}

// ── Section 10: Toast helper (lightweight) ───────────────────────
export function _showToast(msg) {
  var existing = document.getElementById('ls-toast');
  if (existing) existing.remove();
  var el = document.createElement('div');
  el.id = 'ls-toast';
  el.textContent = msg;
  el.style.cssText = 'position:fixed;bottom:96px;left:50%;transform:translateX(-50%) translateY(20px);background:#1a1814;color:#fff;padding:10px 18px;border-radius:99px;font-size:13px;font-weight:600;z-index:9999;opacity:0;transition:opacity .2s,transform .2s;pointer-events:none;white-space:nowrap;max-width:80vw;text-align:center;font-family:var(--sans,system-ui,sans-serif)';
  document.body.appendChild(el);
  requestAnimationFrame(function() {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(function() {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(function() { if (el.parentNode) el.remove(); }, 300);
  }, 2400);
}

// ── Section 10: Lists CRUD ───────────────────────────────────────

export function _listsAddItem(type, name, qty, unit, aisle, notes, mealTag) {
  if (!state.lists) window._applyMigrations(state);
  var list = state.lists[type];
  if (!list) return;
  // duplicate check
  var dup = list.items.find(function(i) { return i.state === 'active' && i.name.toLowerCase() === name.toLowerCase(); });
  if (dup) { _showToast(escHtml(name) + ' is already on your list'); return false; }
  var item = {
    id: 'li-' + Date.now() + '-' + Math.random().toString(36).slice(2,6),
    name: name,
    quantity: qty || 1,
    unit: unit || 'units',
    notes: notes || '',
    aisle: aisle || (type === 'food' ? _inferAisle(name) : 'other'),
    state: 'active',
    addedBy: 'user',
    addedAt: new Date().toISOString(),
    stateChangedAt: null,
    mealTag: mealTag || null,
    manualPrice: null,
    barcodeId: null,
  };
  list.items.push(item);
  _listsAddFavourite(type, name);
  window.saveData(state);
  return true;
}

export function _listsSetState(type, id, newState) {
  if (!state.lists || !state.lists[type]) return;
  var item = state.lists[type].items.find(function(i) { return i.id === id; });
  if (!item) return;
  item.state = newState;
  item.stateChangedAt = new Date().toISOString();
  window.saveData(state);
  renderLists();
}

export function _listsDeleteItem(type, id) {
  if (!state.lists || !state.lists[type]) return;
  state.lists[type].items = state.lists[type].items.filter(function(i) { return i.id !== id; });
  window.saveData(state);
  renderLists();
}

export function _listsQuickAdd(type) {
  var inp = document.getElementById('ls-quick-input');
  if (!inp) return;
  var raw = inp.value.trim();
  if (!raw) return;
  var parsed = _parseShopInput(raw);
  var aisle = type === 'food' ? _inferAisle(parsed.name) : 'other';
  var added = _listsAddItem(type, parsed.name, parsed.qty, parsed.unit, aisle, '', null);
  if (added !== false) {
    inp.value = '';
    var preview = document.getElementById('ls-parse-preview');
    if (preview) preview.innerHTML = '';
    renderLists();
  }
}

export function _listsOpenAddForm(type, editId) {
  const isFood = type === 'food';
  const existing = state.lists?.[type]?.items || [];
  const item = editId ? existing.find(i => i.id === editId) : null;

  const cats = isFood ? PANTRY_CATS : ['Other'];
  const units = ['units','kg','g','L','ml','dozen'];

  document.getElementById('modal-title').textContent = item ? 'Edit Item' : 'Add Item';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="lf-name" type="text" maxlength="200"
        value="${item ? escAttr(item.name) : ''}" placeholder="e.g. Pasta, Milk, Chicken">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="lf-cat">
          ${cats.map(c => `<option value="${c}"${item && item.aisle === _pantryToAisle(c) ? ' selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Quantity <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="lf-qty" type="text" maxlength="200"
          value="${item ? escAttr(String(item.quantity || '')) : ''}" placeholder="e.g. 2 bags, 1L, 500g">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Unit</label>
      <select class="form-select" id="lf-unit">
        ${units.map(u => `<option value="${u}"${item && item.unit === u ? ' selected' : ''}>${u}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="lf-notes" type="text" maxlength="200"
        value="${item ? escAttr(item.notes || '') : ''}" placeholder="e.g. Get the organic one, only if on sale">
    </div>
    <div class="form-group">
      <label class="form-label">Status</label>
      <div style="display:flex;gap:8px">
        ${[['active','Still needed','#5B4CF5'],['got_it','Got it','#10b981'],['not_found','Not found','#ef4444']].map(([s, label, col]) => {
          const active = (item?.state || 'active') === s;
          return `<label style="flex:1;cursor:pointer;text-align:center;padding:10px;border-radius:8px;border:2px solid ${active ? col : 'var(--border)'};background:${active ? col + '15' : 'var(--surface)'};font-size:12px;font-weight:600;color:${active ? col : 'var(--text-muted)'}">
            <input type="radio" name="lf-state" value="${s}" ${active ? 'checked' : ''} style="display:none">${label}
          </label>`;
        }).join('')}
      </div>
    </div>`;

  document.getElementById('modal-footer').innerHTML = `
    ${item ? `<button class="btn" style="color:var(--danger);margin-right:auto" onclick="_listsDeleteItem('${type}','${editId}');window.closeModal()">Delete</button>` : ''}
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="_listsSaveForm('${type}','${editId||''}')">Save</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

export function _pantryToAisle(cat) {
  return { 'Fridge':'dairy','Freezer':'frozen','Pantry':'pantry','Fruit & Veg':'produce','Spices':'pantry','Drinks':'drinks','Cleaning':'cleaning','Other':'other' }[cat] || 'other';
}

export function _listsSaveForm(type, editId) {
  const name = document.getElementById('lf-name')?.value.trim();
  if (!name) return;
  const catVal  = document.getElementById('lf-cat')?.value || 'Other';
  const qtyRaw  = document.getElementById('lf-qty')?.value.trim() || '1';
  const unit    = document.getElementById('lf-unit')?.value || 'units';
  const notes   = document.getElementById('lf-notes')?.value.trim() || '';
  const state_  = document.querySelector('input[name="lf-state"]:checked')?.value || 'active';
  const qty     = parseFloat(qtyRaw) || 1;
  const aisle   = type === 'food' ? _pantryToAisle(catVal) : 'other';

  if (!state.lists) state.lists = {};
  if (!state.lists[type]) state.lists[type] = { items: [], weeklyBudget: 0, budget: 0, stores: [], favourites: [], history: [] };
  const items = state.lists[type].items;

  if (editId) {
    const item = items.find(i => i.id === editId);
    if (item) { item.name = name; item.quantity = qty; item.unit = unit; item.notes = notes; item.aisle = aisle; item.state = state_; }
  } else {
    // Duplicate check
    const dup = items.find(i => i.name.toLowerCase() === name.toLowerCase() && i.state === 'active');
    if (dup) { if (!confirm(`"${name}" is already on your list. Add another?`)) return; }
    items.push({ id: 'si-' + Date.now(), name, quantity: qty, unit, notes, aisle, state: state_, addedBy: window._currentUser?.uid || 'guest', addedAt: new Date().toISOString(), mealTag: null, manualPrice: null, barcodeId: null });
    _listsAddFavourite(type, name);
  }
  window.saveData(state);
  window.closeModal();
  renderLists();
}

export function _listsClearTrolley(type) {
  if (!state.lists || !state.lists[type]) return;
  var gotIt = state.lists[type].items.filter(function(i) { return i.state === 'got_it'; });
  if (!gotIt.length) return;
  if (confirm('Remove ' + gotIt.length + ' trolley item' + (gotIt.length !== 1 ? 's' : '') + '?')) {
    state.lists[type].items = state.lists[type].items.filter(function(i) { return i.state !== 'got_it'; });
    window.saveData(state);
    renderLists();
  }
}

export function _listsArchive(type) {
  if (!state.lists || !state.lists[type]) return;
  var list = state.lists[type];
  if (!list.history) list.history = [];
  list.history.push({ archivedAt: new Date().toISOString(), items: JSON.parse(JSON.stringify(list.items)) });
  list.items = [];
  window.saveData(state);
  _showToast('Shop archived!');
  renderLists();
}

export function _listsAddFavourite(type, name) {
  if (!state.lists || !state.lists[type]) return;
  var favs = state.lists[type].favourites;
  var existing = favs.find(function(f) { return f.name.toLowerCase() === name.toLowerCase(); });
  if (existing) { existing.addedCount = (existing.addedCount || 0) + 1; }
  else { favs.push({ name: name, addedCount: 1, pinned: false }); }
}

export function _listsAddUsual(type) {
  if (!state.lists || !state.lists[type]) return;
  var favs = state.lists[type].favourites;
  var pinned = favs.filter(function(f) { return f.pinned; });
  var toAdd = pinned.length ? pinned : favs.sort(function(a,b) { return (b.addedCount||0) - (a.addedCount||0); }).slice(0,5);
  var added = 0;
  toAdd.forEach(function(f) {
    var on = state.lists[type].items.find(function(i) { return i.state === 'active' && i.name.toLowerCase() === f.name.toLowerCase(); });
    if (!on) { _listsAddItem(type, f.name, 1, 'units', type === 'food' ? _inferAisle(f.name) : 'other', '', null); added++; }
  });
  if (added) renderLists();
  else _showToast('All usual items are already on the list');
}

export function _listsUpdateParsePreview() {
  var inp = document.getElementById('ls-quick-input');
  var preview = document.getElementById('ls-parse-preview');
  if (!inp || !preview) return;
  var raw = inp.value.trim();
  if (!raw) { preview.innerHTML = ''; return; }
  var p = _parseShopInput(raw);
  var chips = '';
  if (p.qty !== 1 || p.unit !== 'units') {
    chips += '<span class="ls-parse-chip">' + escHtml(String(p.qty)) + ' ' + escHtml(p.unit) + '</span>';
  }
  chips += '<span class="ls-parse-chip">' + escHtml(p.name) + '</span>';
  preview.innerHTML = chips;
}

export function renderLists() {
  var el = document.getElementById('lists-content');
  if (!el) return;
  if (!state.lists) window._applyMigrations(state);

  if (_listsView === 'selector') {
    _renderListsSelector(el);
  } else {
    _renderListsDetail(el, _listsActiveType);
  }
}

export function _renderListsSelector(el) {
  var html = '<div class="ls-screen">';
  html += '<div style="font-size:22px;font-weight:800;color:var(--ink,#1a1814);margin-bottom:4px">My Lists</div>';
  html += '<div style="font-size:13px;color:var(--muted,#8c8880);margin-bottom:20px">Tap a list to open it</div>';
  html += '<div class="ls-type-grid">';
  Object.keys(LIST_TYPES).forEach(function(type) {
    var cfg = LIST_TYPES[type];
    var list = (state.lists && state.lists[type]) ? state.lists[type] : { items: [] };
    var activeCount = list.items.filter(function(i) { return i.state === 'active'; }).length;
    html += '<div class="ls-type-card" onclick="_listsActiveType=\'' + type + '\';_listsView=\'list\';renderLists()">';
    html += '<div class="ls-type-icon" style="background:' + cfg.color + ';color:' + cfg.text + '">' + cfg.emoji + '</div>';
    html += '<div class="ls-type-label">' + escHtml(cfg.label) + '</div>';
    html += '<div class="ls-type-count">' + (activeCount > 0 ? activeCount + ' item' + (activeCount !== 1 ? 's' : '') : 'Empty') + '</div>';
    html += '</div>';
  });
  html += '</div>';
  html += '</div>';
  el.innerHTML = html;
}

export function _renderListsDetail(el, type) {
  var cfg = LIST_TYPES[type];
  var list = (state.lists && state.lists[type]) ? state.lists[type] : { items: [], weeklyBudget: 0, favourites: [] };
  var items = list.items || [];
  var active = items.filter(function(i) { return i.state === 'active'; });
  var gotIt  = items.filter(function(i) { return i.state === 'got_it'; });
  var notFound = items.filter(function(i) { return i.state === 'not_found'; });

  var html = '<div class="ls-screen">';

  // Back button
  html += '<button class="ls-back-btn" onclick="_listsView=\'selector\';renderLists()">← Lists</button>';

  // Header
  html += '<div class="ls-header">';
  html += '<div style="font-size:22px;margin-right:6px">' + cfg.emoji + '</div>';
  html += '<div class="ls-header-title">' + escHtml(cfg.label) + '</div>';
  html += '<div class="ls-sync-dot"></div>';
  html += '<div class="ls-header-count">' + active.length + ' to get</div>';
  html += '</div>';

  // Budget bar
  if (list.weeklyBudget > 0) {
    var spent = items.filter(function(i) { return i.state === 'got_it' && i.manualPrice; })
      .reduce(function(s, i) { return s + (i.manualPrice || 0); }, 0);
    var pct = Math.min(100, Math.round(spent / list.weeklyBudget * 100));
    var fillCls = pct > 100 ? 'over' : pct > 80 ? 'warn' : '';
    html += '<div class="ls-budget-bar-wrap">';
    html += '<div class="ls-budget-bar-meta"><span>$' + spent.toFixed(0) + ' spent</span><span>$' + list.weeklyBudget + ' budget</span></div>';
    html += '<div class="ls-budget-bar"><div class="ls-budget-fill ' + fillCls + '" style="width:' + pct + '%"></div></div>';
    html += '</div>';
  }

  // Favourite chips (top 5, not already active)
  var favs = (list.favourites || []).filter(function(f) {
    return !active.find(function(i) { return i.name.toLowerCase() === f.name.toLowerCase(); });
  }).sort(function(a,b) { return (b.addedCount||0) - (a.addedCount||0); }).slice(0, 5);
  if (favs.length > 0) {
    html += '<div class="ls-fav-chips">';
    favs.forEach(function(f) {
      html += '<button class="ls-fav-chip" onclick="_listsAddItem(\'' + type + '\',\'' + escHtml(f.name).replace(/'/g,'\\\'') + '\',1,\'units\',\'' + (type === 'food' ? _inferAisle(f.name) : 'other') + '\',\'\',null);renderLists()">+ ' + escHtml(f.name) + '</button>';
    });
    html += '</div>';
  }

  // Usual button
  if ((list.favourites || []).length > 0) {
    html += '<button class="ls-usual-btn" onclick="_listsAddUsual(\'' + type + '\')">The usual →</button>';
  }

  // Quick-add
  html += '<div class="ls-quick-add">';
  html += '<div class="ls-quick-add-row">';
  html += '<input class="ls-quick-input" id="ls-quick-input" type="text" placeholder="Add item…" autocomplete="off" oninput="_listsUpdateParsePreview()" onkeydown="if(event.key===\'Enter\')_listsQuickAdd(\'' + type + '\')">';
  html += '<button class="ls-quick-add-btn" onclick="_listsQuickAdd(\'' + type + '\')">Add</button>';
  html += '<button class="ls-quick-add-btn" style="background:var(--purple-soft);color:var(--iris-1);min-width:36px;padding:0 10px" onclick="_listsOpenAddForm(\'' + type + '\')">⋯</button>';
  html += '</div>';
  html += '<div class="ls-parse-preview" id="ls-parse-preview"></div>';
  html += '</div>';

  // Active items
  if (active.length > 0) {
    if (cfg.aisles) {
      var aisleList = LIST_AISLES[type] || [{ key: 'other', emoji: '🛒', label: 'Other' }];
      var byAisle = {};
      aisleList.forEach(function(a) { byAisle[a.key] = []; });
      active.forEach(function(i) {
        var k = i.aisle && byAisle[i.aisle] !== undefined ? i.aisle : 'other';
        if (!byAisle[k]) byAisle[k] = [];
        byAisle[k].push(i);
      });
      aisleList.forEach(function(a) {
        if (!byAisle[a.key] || !byAisle[a.key].length) return;
        html += '<div class="ls-aisle-header">' + a.emoji + ' ' + escHtml(a.label) + '</div>';
        byAisle[a.key].forEach(function(item) { html += _renderListItem(type, item); });
      });
    } else {
      active.forEach(function(item) { html += _renderListItem(type, item); });
    }
  } else {
    html += '<div style="text-align:center;padding:32px 0;color:var(--muted,#8c8880);font-size:14px">Nothing to get yet — add something above</div>';
  }

  // In the trolley
  if (gotIt.length > 0) {
    html += '<div class="ls-aisle-header">🛒 In the trolley</div>';
    gotIt.forEach(function(item) { html += _renderListItem(type, item); });
  }

  // Not found
  if (notFound.length > 0) {
    html += '<div class="ls-aisle-header">🚫 Not found</div>';
    notFound.forEach(function(item) { html += _renderListItem(type, item); });
  }

  // Footer actions
  html += '<div class="ls-footer-row">';
  if (gotIt.length > 0) {
    html += '<button class="ls-footer-btn" onclick="_listsClearTrolley(\'' + type + '\')">Clear trolley (' + gotIt.length + ')</button>';
  }
  if (active.length === 0 && items.length > 0) {
    html += '<button class="ls-footer-btn" style="background:var(--iris-2,#6366f1);color:#fff;border-color:var(--iris-2,#6366f1)" onclick="_listsArchive(\'' + type + '\')">Archive this shop</button>';
  }
  html += '</div>';

  html += '</div>'; // .ls-screen
  el.innerHTML = html;
}

export function _renderListItem(type, item) {
  var stateCls = item.state === 'got_it' ? 'got-it' : item.state === 'not_found' ? 'not-found' : '';
  var checkContent = item.state === 'got_it' ? '✓' : '';
  var nextState = item.state === 'active' ? 'got_it' : 'active';
  var qtyStr = (item.quantity && item.unit && item.unit !== 'units') ? item.quantity + ' ' + item.unit : (item.quantity && item.quantity !== 1 ? 'x' + item.quantity : '');
  var safeId = escHtml(item.id);
  var safeName = escHtml(item.name);
  var html = '<div class="ls-item ' + stateCls + '">';
  html += '<button class="ls-item-check" onclick="_listsSetState(\'' + type + '\',\'' + item.id + '\',\'' + nextState + '\')">' + checkContent + '</button>';
  html += '<div class="ls-item-body">';
  html += '<div class="ls-item-name">' + safeName + '</div>';
  if (qtyStr) html += '<div class="ls-item-qty">' + escHtml(qtyStr) + '</div>';
  if (item.notes) html += '<div class="ls-item-notes">' + escHtml(item.notes) + '</div>';
  html += '</div>';
  if (item.state === 'active') {
    html += '<button class="ls-item-notfound-btn" title="Not found" onclick="_listsSetState(\'' + type + '\',\'' + item.id + '\',\'not_found\')">🚫</button>';
  } else if (item.state === 'not_found') {
    html += '<button class="ls-item-notfound-btn" title="Mark active again" onclick="_listsSetState(\'' + type + '\',\'' + item.id + '\',\'active\')">↩</button>';
  }
  html += '<button class="ls-item-notfound-btn" title="Edit" onclick="_listsOpenAddForm(\'' + type + '\',\'' + item.id + '\')">✏️</button>';
  html += '<button class="ls-item-del" onclick="_listsDeleteItem(\'' + type + '\',\'' + item.id + '\')">×</button>';
  html += '</div>';
  return html;
}

// ── End Section 10 functions ─────────────────────────────────────

export async function generateShoppingList(weekKey) {
  const plan = state.meals.plan[weekKey] || {};
  const meals = [];
  for (let di = 0; di < 7; di++) {
    const dp = plan[di] || {};
    ['b','l','d'].forEach(s => { if (dp[s]) meals.push(dp[s]); });
  }
  if (!meals.length) return;

  const key = prefsGet('toto_ai_key');
  if (!key) { _listsActiveType = 'food'; _listsView = 'list'; activateTab('lists'); return; }

  const btn = document.getElementById('gen-shop-btn');
  if (btn) { btn.textContent = '⏳ Generating…'; btn.disabled = true; }

  const prompt = `Generate a grocery shopping list for these meals: ${meals.join(', ')}.

Return ONLY a JSON array:
[{"name":"Chicken breast","qty":"500g","cat":"Meat & Seafood"},{"name":"Pasta","qty":"400g","cat":"Pantry"}]

Categories must be one of: Produce, Meat & Seafood, Dairy & Eggs, Pantry, Bakery, Frozen, Household, Other.
Combine quantities where sensible. No duplicates. No other text.`;

  // Map old cat names to new aisle keys
  const catToAisle = { 'Produce':'produce', 'Meat & Seafood':'meat', 'Dairy & Eggs':'dairy', 'Pantry':'pantry', 'Bakery':'bakery', 'Frozen':'frozen', 'Household':'cleaning', 'Other':'other' };
  try {
    const res = await fetch(CLAUDE_API, {
      method:'POST',
      headers:{ 'x-api-key':key,'anthropic-version':'2023-06-01','content-type':'application/json' },
      body: JSON.stringify({ model:'claude-haiku-4-5-20251001', max_tokens:1024, messages:[{ role:'user', content:prompt }] })
    });
    const data = await res.json();
    const match = data.content[0].text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON');
    const newItems = JSON.parse(match[0]);
    if (!state.lists) state.lists = {};
    if (!state.lists.food) state.lists.food = { items: [], weeklyBudget: 200, budget: 0, stores: [], favourites: [], history: [] };
    const existing = state.lists.food.items;
    let idx = 0;
    newItems.forEach(item => {
      if (!existing.some(e => e.name.toLowerCase() === item.name.toLowerCase() && e.state === 'active')) {
        existing.push({ id: 'si-meal-' + Date.now() + '-' + idx++, name: item.name, quantity: 1, unit: 'units', notes: item.qty || '', aisle: catToAisle[item.cat] || (_inferAisle ? _inferAisle(item.name) : 'other'), state: 'active', addedBy: 'meals', addedAt: new Date().toISOString(), mealTag: 'Meal plan', manualPrice: null, barcodeId: null });
      }
    });
    window.saveData(state);
    _listsActiveType = 'food';
    _listsView = 'list';
    activateTab('lists');
  } catch(err) {
    if (btn) { btn.textContent = '🛒 Generate shopping list'; btn.disabled = false; }
  }
}

// ─────────────────────────────────────────────────
// VEHICLES

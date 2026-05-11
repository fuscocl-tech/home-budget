// Lunchbox planner section
import { state } from '../store.js';
import { escHtml, escAttr, nextId, fmtDate } from './format.js';
import { prefsGet } from '../prefs.js';

// LUNCHBOX PLANNER
// ─────────────────────────────────────────────────
export let _lbWeekOffset = 0;
export let _lbActiveKid = null;

export const LB_SLOTS = [
  { key: 'main', label: 'Main' },
  { key: 'snack', label: 'Snack' },
  { key: 'fruit', label: 'Fruit' },
  { key: 'drink', label: 'Drink' }
];

export const LB_ALLERGIES = ['Nuts','Dairy','Gluten','Eggs','Soy','Seafood','Sesame'];

export function renderLunchbox() {
  const el = document.getElementById('lunchbox-content');
  if (!el) return;
  const lb = state.meals.lunchbox;
  const profiles = lb.profiles || [];

  // No profiles yet — show setup
  if (profiles.length === 0) {
    el.innerHTML = `
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon" style="font-size:48px">🍱</div>
        <p style="margin:12px 0">Set up your child's profile to start planning school lunches.</p>
        <button class="btn btn-primary" onclick="openLunchboxProfile()">+ Add Child</button>
      </div>`;
    return;
  }

  // Default to first kid if none selected
  if (!_lbActiveKid || !profiles.find(p => p.id === _lbActiveKid)) {
    _lbActiveKid = profiles[0].id;
  }

  const kid = profiles.find(p => p.id === _lbActiveKid);
  const weekKey = _mealWeekKey(_lbWeekOffset);
  const dates = _mealWeekDates(weekKey).slice(0, 5); // Mon-Fri only
  const plan = (lb.plans[weekKey] || {})[_lbActiveKid] || {};
  const todayStr = new Date().toISOString().slice(0, 10);
  const DAYS = ['Mon','Tue','Wed','Thu','Fri'];

  // Kid tabs
  const kidTabs = profiles.map(p =>
    `<button class="lb-kid-tab${p.id === _lbActiveKid ? ' active' : ''}" onclick="_lbActiveKid='${p.id}';renderLunchbox()">${escHtml(p.name)}</button>`
  ).join('');

  // Week label
  const weekStart = dates[0].toLocaleDateString('en-AU', { day:'numeric', month:'short' });
  const weekEnd = dates[4].toLocaleDateString('en-AU', { day:'numeric', month:'short' });

  // Grid
  let gridRows = '';
  LB_SLOTS.forEach(slot => {
    gridRows += `<div class="lb-label">${slot.label}</div>`;
    dates.forEach((date, di) => {
      const dayPlan = plan[di] || {};
      const val = dayPlan[slot.key] || '';
      const isToday = date.toISOString().slice(0, 10) === todayStr;
      gridRows += `<div class="lb-cell${isToday ? ' today' : ''}" onclick="openLunchboxEdit('${weekKey}',${_lbActiveKid},${di},'${slot.key}')">
        ${val ? `<span class="lb-cell-text">${escHtml(val)}${state.settings?.showCalories && (plan[di] || {})['cal_' + slot.key] ? `<br><span style="font-size:8px;color:var(--text-muted);font-weight:600">${(plan[di])['cal_' + slot.key]} cal</span>` : ''}</span>` : `<span class="lb-cell-plus">+</span>`}
      </div>`;
    });
  });

  // Profile summary
  const allergies = (kid.allergies || []).map(a => `<span class="lb-tag allergy">${escHtml(a)}</span>`).join('');
  const dislikes = (kid.dislikes || []).map(d => `<span class="lb-tag dislike">${escHtml(d)}</span>`).join('');
  const favourites = (kid.favourites || []).map(f => `<span class="lb-tag fav">${escHtml(f)}</span>`).join('');
  const hasKey = !!localStorage.getItem('toto_ai_key');

  // Count filled slots
  const filledSlots = Object.values(plan).reduce((s, day) => s + Object.values(day || {}).filter(Boolean).length, 0);

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:16px">
      <div class="lb-kid-tabs">${kidTabs}
        <button class="lb-kid-tab" onclick="openLunchboxProfile()" style="border-style:dashed">+</button>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-sm" onclick="openLunchboxProfile('${kid.id}')">Edit profile</button>
      </div>
    </div>

    <div class="lb-profile-card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:15px;font-weight:700">${escHtml(kid.name)}</div>
        ${kid.school ? `<span style="font-size:12px;color:var(--text-muted)">${escHtml(kid.school)}</span>` : ''}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${allergies || ''}${dislikes || ''}${favourites || ''}
        ${!allergies && !dislikes && !favourites ? '<span style="font-size:12px;color:var(--text-muted)">No preferences set — edit profile to add allergies, dislikes, favourites</span>' : ''}
      </div>
      ${kid.schoolRules ? `<div style="font-size:11px;color:var(--text-muted);margin-top:6px">School rules: ${escHtml(kid.schoolRules)}</div>` : ''}
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;align-items:center;gap:8px">
        <button class="btn btn-sm" onclick="_lbWeekOffset--;renderLunchbox()" style="font-size:16px;padding:2px 10px">‹</button>
        <span style="font-size:14px;font-weight:700;min-width:140px;text-align:center">
          ${_lbWeekOffset === 0 ? 'This Week' : _lbWeekOffset === 1 ? 'Next Week' : `${weekStart} – ${weekEnd}`}
        </span>
        <button class="btn btn-sm" onclick="_lbWeekOffset++;renderLunchbox()" style="font-size:16px;padding:2px 10px">›</button>
        ${_lbWeekOffset !== 0 ? `<button class="btn btn-sm" onclick="_lbWeekOffset=0;renderLunchbox()">This week</button>` : ''}
      </div>
      <div style="display:flex;gap:8px">
        ${hasKey ? `<button class="btn btn-primary btn-sm" id="lb-ai-btn" onclick="aiPlanLunchbox('${weekKey}','${kid.id}')">Plan this week</button>` : ''}
        ${filledSlots > 0 ? `<button class="btn btn-sm" onclick="lbToShoppingList('${weekKey}','${kid.id}')">Add to shopping list</button>` : ''}
      </div>
    </div>

    <div style="overflow-x:auto">
      <div class="lb-grid" style="min-width:460px">
        <div class="lb-header"></div>
        ${dates.map((date, i) => {
          const isToday = date.toISOString().slice(0, 10) === todayStr;
          return `<div class="lb-header" style="${isToday ? 'background:#0891b2;color:#fff' : ''}">${DAYS[i]}<div style="font-size:9px;opacity:0.7">${date.getDate()}/${date.getMonth()+1}</div></div>`;
        }).join('')}
        ${gridRows}
        ${state.settings?.showCalories ? `<div class="lb-label" style="font-weight:800;font-size:9px">Total</div>` + dates.map((date, di) => {
          const dp = plan[di] || {};
          const total = (dp.cal_main || 0) + (dp.cal_snack || 0) + (dp.cal_fruit || 0) + (dp.cal_drink || 0);
          return `<div style="background:var(--surface);padding:6px;text-align:center;font-size:10px;font-weight:700;color:${total > 0 ? 'var(--text)' : 'var(--border)'}">${total > 0 ? total : '—'}</div>`;
        }).join('') : ''}
      </div>
    </div>`;
}

export function openLunchboxProfile(editId) {
  const p = editId ? (state.meals.lunchbox.profiles || []).find(p => p.id === editId) : null;

  document.getElementById('modal-title').textContent = p ? `Edit ${escHtml(p.name)}` : 'Add Child';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">Child's Name</label>
      <input class="form-input" id="lb-name" type="text" maxlength="200" value="${p ? escAttr(p.name) : ''}" placeholder="e.g. Jake">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">School</label>
        <input class="form-input" id="lb-school" type="text" maxlength="200" value="${p ? escAttr(p.school || '') : ''}" placeholder="e.g. Emmaus Christian">
      </div>
      <div class="form-group">
        <label class="form-label">School Rules</label>
        <input class="form-input" id="lb-rules" type="text" maxlength="200" value="${p ? escAttr(p.schoolRules || '') : ''}" placeholder="e.g. Nut-free zone">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Allergies <span style="font-weight:400;color:var(--text-muted)">(click to toggle)</span></label>
      <div id="lb-allergies" style="display:flex;flex-wrap:wrap;gap:6px">
        ${LB_ALLERGIES.map(a => {
          const active = p && (p.allergies || []).includes(a);
          return `<button type="button" class="lb-tag${active ? ' allergy' : ''}" style="cursor:pointer;${active ? '' : 'background:var(--surface2);color:var(--text-muted);border:1px solid var(--border)'}"
            onclick="this.classList.toggle('allergy');if(!this.classList.contains('allergy')){this.style.background='var(--surface2)';this.style.color='var(--text-muted)';this.style.borderColor='var(--border)'}else{this.style.background='#fef2f2';this.style.color='#dc2626';this.style.borderColor='#fca5a5'}"
            data-val="${a}">${a}</button>`;
        }).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Dislikes <span style="font-weight:400;color:var(--text-muted)">(comma separated)</span></label>
      <input class="form-input" id="lb-dislikes" type="text" maxlength="200" value="${p ? escAttr((p.dislikes || []).join(', ')) : ''}" placeholder="e.g. mushrooms, brown bread, olives">
    </div>
    <div class="form-group">
      <label class="form-label">Favourites <span style="font-weight:400;color:var(--text-muted)">(comma separated)</span></label>
      <input class="form-input" id="lb-favs" type="text" maxlength="200" value="${p ? escAttr((p.favourites || []).join(', ')) : ''}" placeholder="e.g. wraps, cheese, strawberries, pasta">
    </div>`;

  document.getElementById('modal-footer').innerHTML = `
    ${p ? `<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deleteLbProfile(${editId})">Delete</button>` : ''}
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveLbProfile(${editId || 'null'})">Save</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

export function saveLbProfile(editId) {
  const name = document.getElementById('lb-name')?.value.trim();
  if (!name) return;

  const allergies = [...document.querySelectorAll('#lb-allergies .allergy')].map(b => b.dataset.val);
  const dislikes = (document.getElementById('lb-dislikes')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
  const favourites = (document.getElementById('lb-favs')?.value || '').split(',').map(s => s.trim()).filter(Boolean);

  const data = {
    name,
    school: document.getElementById('lb-school')?.value.trim() || '',
    schoolRules: document.getElementById('lb-rules')?.value.trim() || '',
    allergies,
    dislikes,
    favourites
  };

  const profiles = state.meals.lunchbox.profiles;
  if (editId) {
    const p = profiles.find(p => p.id === editId);
    if (p) Object.assign(p, data);
  } else {
    data.id = profiles.length ? Math.max(...profiles.map(p => p.id)) + 1 : 1;
    profiles.push(data);
    _lbActiveKid = data.id;
  }

  window.saveData(state);
  window.closeModal();
  renderLunchbox();
}

export function deleteLbProfile(id) {
  if (!confirm('Delete this child profile and their lunchbox plans?')) return;
  state.meals.lunchbox.profiles = state.meals.lunchbox.profiles.filter(p => p.id !== id);
  // Clean up plans
  Object.keys(state.meals.lunchbox.plans).forEach(wk => {
    delete state.meals.lunchbox.plans[wk][id];
  });
  _lbActiveKid = null;
  window.saveData(state);
  window.closeModal();
  renderLunchbox();
}

export function openLunchboxEdit(weekKey, kidId, dayIdx, slot) {
  const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
  const SLOTS = { main:'Main', snack:'Snack', fruit:'Fruit', drink:'Drink' };
  const plan = (state.meals.lunchbox.plans[weekKey] || {})[kidId] || {};
  const current = (plan[dayIdx] || {})[slot] || '';

  // Collect previously used items for this slot
  const seen = new Set();
  Object.values(state.meals.lunchbox.plans).forEach(week => {
    Object.values(week).forEach(kidPlan => {
      Object.values(kidPlan).forEach(day => {
        if (day && day[slot]) seen.add(day[slot]);
      });
    });
  });
  const prev = [...seen].filter(v => v !== current).slice(0, 12);

  document.getElementById('modal-title').textContent = `${DAYS[dayIdx]} · ${SLOTS[slot]}`;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">${SLOTS[slot]}</label>
      <input class="form-input" id="lb-input" type="text" maxlength="200" value="${escAttr(current)}" placeholder="e.g. ${slot === 'main' ? 'Ham & cheese wrap' : slot === 'snack' ? 'Muesli bar' : slot === 'fruit' ? 'Apple' : 'Water'}" autocomplete="off">
    </div>
    ${prev.length ? `
    <div>
      <div class="form-label" style="margin-bottom:6px">Previous</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${prev.map(v => `<button style="padding:4px 12px;border-radius:99px;border:1px solid var(--border);background:var(--surface2);font-size:12px;cursor:pointer"
          onclick="document.getElementById('lb-input').value='${escAttr(v)}'">${escHtml(v)}</button>`).join('')}
      </div>
    </div>` : ''}`;

  document.getElementById('modal-footer').innerHTML = `
    <button class="btn" onclick="_saveLbSlot('${weekKey}',${kidId},${dayIdx},'${slot}','')">Clear</button>
    <button class="btn btn-primary" onclick="_saveLbSlot('${weekKey}',${kidId},${dayIdx},'${slot}',document.getElementById('lb-input').value.trim())">Save</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
  setTimeout(() => { const el = document.getElementById('lb-input'); if (el) { el.focus(); el.select(); } }, 80);
}

export function _saveLbSlot(weekKey, kidId, dayIdx, slot, value) {
  if (!state.meals.lunchbox.plans[weekKey]) state.meals.lunchbox.plans[weekKey] = {};
  if (!state.meals.lunchbox.plans[weekKey][kidId]) state.meals.lunchbox.plans[weekKey][kidId] = {};
  if (!state.meals.lunchbox.plans[weekKey][kidId][dayIdx]) state.meals.lunchbox.plans[weekKey][kidId][dayIdx] = {};
  state.meals.lunchbox.plans[weekKey][kidId][dayIdx][slot] = value;
  delete state.meals.lunchbox.plans[weekKey][kidId][dayIdx]['cal_' + slot];
  window.saveData(state);
  window.closeModal();
  renderLunchbox();
  if (value && state.settings?.showCalories) _estimateLbCalories(weekKey, kidId, dayIdx, slot, value);
}

export async function _estimateLbCalories(weekKey, kidId, dayIdx, slot, itemName) {
  const key = localStorage.getItem('toto_ai_key');
  if (!key || !itemName) return;
  try {
    const res = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 50,
        messages: [{ role: 'user', content: `Estimate the calories in this school lunch item: "${itemName}". Return ONLY a number, nothing else. For example: 250` }]
      })
    });
    if (!res.ok) return;
    const data = await res.json();
    const cal = parseInt(data.content[0].text.trim().replace(/[^0-9]/g, ''));
    if (cal > 0 && cal < 3000 && state.meals.lunchbox.plans[weekKey]?.[kidId]?.[dayIdx]) {
      state.meals.lunchbox.plans[weekKey][kidId][dayIdx]['cal_' + slot] = cal;
      window.saveData(state);
      renderLunchbox();
    }
  } catch(e) { /* silent */ }
}

export async function aiPlanLunchbox(weekKey, kidId) {
  const key = localStorage.getItem('toto_ai_key');
  if (!key) return;
  const kid = (state.meals.lunchbox.profiles || []).find(p => p.id === kidId);
  if (!kid) return;

  const btn = document.getElementById('lb-ai-btn');
  if (btn) { btn.textContent = 'Planning...'; btn.disabled = true; }

  const prompt = `Plan 5 days (Monday to Friday) of school lunches for a child:

Name: ${kid.name}
School: ${kid.school || 'not specified'}
Allergies: ${(kid.allergies || []).join(', ') || 'none'}
Dislikes: ${(kid.dislikes || []).join(', ') || 'none'}
Favourites: ${(kid.favourites || []).join(', ') || 'not specified'}
School rules: ${kid.schoolRules || 'none specified'}

Each day needs: main (sandwich/wrap/salad/pasta etc), snack, fruit, drink.
Keep it realistic — things a parent can prep in under 5 minutes.
Vary the options across the week. Respect all allergies strictly.
Use Australian food items and brands where relevant.

Return ONLY a JSON array, one object per day (Mon=0 to Fri=4).
${state.settings?.showCalories ? 'Include estimated calories for each item as cal_main, cal_snack, cal_fruit, cal_drink.' : ''}
[{"day":0,"main":"Ham & cheese wrap","snack":"Muesli bar","fruit":"Apple","drink":"Water"${state.settings?.showCalories ? ',"cal_main":320,"cal_snack":180,"cal_fruit":80,"cal_drink":0' : ''}},{"day":1,...}]

No markdown, no code fences, just raw JSON.`;

  try {
    const res = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 1024, messages: [{ role: 'user', content: prompt }] })
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const raw = data.content[0].text.replace(/```[\w]*\n?/g, '').trim();
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON');
    const days = JSON.parse(match[0]);

    if (!state.meals.lunchbox.plans[weekKey]) state.meals.lunchbox.plans[weekKey] = {};
    if (!state.meals.lunchbox.plans[weekKey][kidId]) state.meals.lunchbox.plans[weekKey][kidId] = {};

    days.forEach(d => {
      const dayData = {
        main: d.main || '',
        snack: d.snack || '',
        fruit: d.fruit || '',
        drink: d.drink || ''
      };
      if (d.cal_main) dayData.cal_main = d.cal_main;
      if (d.cal_snack) dayData.cal_snack = d.cal_snack;
      if (d.cal_fruit) dayData.cal_fruit = d.cal_fruit;
      if (d.cal_drink) dayData.cal_drink = d.cal_drink;
      state.meals.lunchbox.plans[weekKey][kidId][d.day] = dayData;
    });

    window.saveData(state);
    renderLunchbox();
  } catch (err) {
    console.error('Lunchbox AI error:', err);
    if (btn) { btn.textContent = 'Plan this week'; btn.disabled = false; }
  }
}

export function lbToShoppingList(weekKey, kidId) {
  const plan = (state.meals.lunchbox.plans[weekKey] || {})[kidId] || {};
  const items = new Set();
  Object.values(plan).forEach(day => {
    if (day.main)  items.add(day.main);
    if (day.snack) items.add(day.snack);
    if (day.fruit) items.add(day.fruit);
    // Skip drinks
  });

  if (!state.lists) state.lists = {};
  if (!state.lists.food) state.lists.food = { items: [], weeklyBudget: 200, budget: 0, stores: [], favourites: [], history: [] };
  const existing = state.lists.food.items;
  let added = 0;
  items.forEach(name => {
    if (!existing.some(e => e.name.toLowerCase() === name.toLowerCase() && e.state === 'active')) {
      existing.push({ id: 'si-lb-' + Date.now() + '-' + added, name, quantity: 1, unit: 'units', notes: '', aisle: _inferAisle ? _inferAisle(name) : 'other', state: 'active', addedBy: 'lunchbox', addedAt: new Date().toISOString(), mealTag: 'Lunchbox', manualPrice: null, barcodeId: null });
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
  const btn = document.querySelector('[onclick^="lbToShoppingList"]');
  if (btn) {
    const orig = btn.textContent;
    btn.textContent = `Added ${added} items`;
    btn.style.color = 'var(--success)';
    setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 2000);
  }
}

// ─────────────────────────────────────────────────
// HEALTH SCORE POPOVER
// ─────────────────────────────────────────────────
export function toggleHealthPopover(badge) {
  // Remove existing popover
  const existing = document.querySelector('.health-popover');
  if (existing) { existing.remove(); return; }

  const h = window._lastHealth;
  if (!h) return;

  const dimKeys = window._lastHealthGuides || ['savings','tracking','netWorth','emergency','goals'];
  const gradeColors = { A:'#10b981', B:'#0891b2', C:'#f59e0b', D:'#f97316', F:'#ef4444' };
  const gradeDescs = { A:'Excellent', B:'Good', C:'Fair — some areas need work', D:'Needs attention', F:'Critical — take action' };

  const dimTips = {
    'Savings Rate': h.dimensions[0].score >= 15 ? 'Healthy savings rate' : h.dimensions[0].score >= 8 ? 'Could save more each month' : 'Very little being saved',
    'Budget Tracking': h.dimensions[1].score >= 15 ? 'Consistently logging actuals' : h.dimensions[1].score >= 8 ? 'Some months tracked' : 'Not tracking actual spending',
    'Net Worth': h.dimensions[2].score >= 15 ? 'Assets outweigh liabilities' : h.dimensions[2].score >= 8 ? 'Building slowly' : 'Liabilities are high or no data',
    'Emergency Buffer': h.dimensions[3].score >= 15 ? '3+ months of expenses covered' : h.dimensions[3].score >= 8 ? 'Some buffer building' : 'Less than 1 month covered',
    'Goals': h.dimensions[4].score >= 15 ? 'Goals set and progressing' : h.dimensions[4].score >= 8 ? 'Goals need more progress' : 'No active goals set',
  };

  let dimsHtml = '';
  h.dimensions.forEach((dim, i) => {
    const pct = Math.round(dim.score / dim.max * 100);
    const barColor = pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
    const tip = dimTips[dim.label] || '';
    const guideKey = dimKeys[i];
    const showFix = dim.score < 15 && HEALTH_GUIDES[guideKey];

    dimsHtml += `<div class="health-dim">
      <div class="health-dim-header">
        <span class="health-dim-name">${dim.label}</span>
        <span class="health-dim-score" style="color:${barColor}">${dim.score}/${dim.max}</span>
      </div>
      <div class="health-dim-bar"><div class="health-dim-fill" style="width:${pct}%;background:${barColor}"></div></div>
      <div class="health-dim-tip">${tip}${showFix ? `<span class="health-dim-fix" onclick="document.querySelector('.health-popover').remove();startHealthGuide('${guideKey}')">Fix it →</span>` : ''}</div>
    </div>`;
  });

  const popover = document.createElement('div');
  popover.className = 'health-popover';
  popover.innerHTML = `
    <div class="health-popover-title" style="color:${gradeColors[h.grade] || '#71717a'}">Grade ${h.grade} — ${h.total}/100</div>
    <div class="health-popover-subtitle">${gradeDescs[h.grade] || ''}</div>
    ${dimsHtml}`;

  document.body.appendChild(popover);

  // Position near the badge
  const rect = badge.getBoundingClientRect();
  let top = rect.bottom + 10;
  let left = rect.left + (rect.width / 2) - 150;
  if (left < 12) left = 12;
  if (left + 300 > window.innerWidth - 12) left = window.innerWidth - 312;
  if (top + popover.offsetHeight > window.innerHeight - 12) top = rect.top - popover.offsetHeight - 10;
  popover.style.top = top + 'px';
  popover.style.left = left + 'px';

  // Close on click outside
  setTimeout(() => {
    const closer = (e) => {
      if (!popover.contains(e.target) && e.target !== badge) {
        popover.remove();
        document.removeEventListener('click', closer);
      }
    };
    document.addEventListener('click', closer);
  }, 10);
}

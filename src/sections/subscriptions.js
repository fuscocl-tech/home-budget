// Subscriptions section
import { state } from '../store.js';
import { aud, escHtml, escAttr, nextId } from './format.js';


export const SUB_CATS = [
  { label: 'Streaming',  icon: '📺' },
  { label: 'Music',      icon: '🎵' },
  { label: 'Software',   icon: '💻' },
  { label: 'Fitness',    icon: '💪' },
  { label: 'Gaming',     icon: '🎮' },
  { label: 'News',       icon: '📰' },
  { label: 'Insurance',  icon: '🛡️' },
  { label: 'Education',  icon: '📚' },
  { label: 'Other',      icon: '📦' },
];

export function subCatIcon(cat) {
  const found = SUB_CATS.find(c => c.label === cat);
  return found ? found.icon : '📦';
}

export function subMonthlyAmount(sub) {
  const amt = parseFloat(sub.amount) || 0;
  if (sub.frequency === 'Annual') return amt / 12;
  if (sub.frequency === 'Weekly') return amt * 52 / 12;
  return amt;
}

let _subImportResults = [];
let _subImportDismissed = new Set();


export function renderSubImportResults(results) {
  const rows = results.map(r => `
    <div class="sub-result-row">
      <div class="sub-result-icon">${subCatIcon(r.category)}</div>
      <div class="sub-result-info">
        <div class="sub-result-name">${escHtml(r.name)}</div>
        <div class="sub-result-meta">${escHtml(r.category)} · ${r.frequency} · ${escHtml(r.description||'')}</div>
      </div>
      <div class="sub-result-amount">$${parseFloat(r.amount).toFixed(2)}</div>
      <div class="sub-result-actions">
        <button class="sub-add-btn primary" onclick="addSubFromImport('${r._key}','subscription')">+ Subscription</button>
        <button class="sub-add-btn secondary" onclick="addSubFromImport('${r._key}','budget')">+ Budget</button>
        <button class="sub-add-btn dismiss" onclick="dismissSubResult('${r._key}')">✕</button>
      </div>
    </div>`).join('');

  return `<div class="sub-results-card">
    <div class="sub-results-header">
      <span class="sub-results-title">✨ Found ${results.length} item${results.length!==1?'s':''} not in your budget</span>
      <button class="btn-outline" style="font-size:12px;padding:5px 10px" onclick="_subImportResults=[];_subImportDismissed=new Set();renderSubscriptions()">Clear all</button>
    </div>
    ${rows}
  </div>`;
}

export function openSubModal(id) {
  const sub = id ? (state.subscriptions||[]).find(s => s.id === id) : null;
  document.getElementById('sub-modal-title').textContent = sub ? 'Edit Subscription' : 'Add Subscription';
  document.getElementById('sub-edit-id').value   = id || '';
  document.getElementById('sub-name').value      = sub ? sub.name : '';
  document.getElementById('sub-cat').value       = sub ? (sub.category||'Streaming') : 'Streaming';
  document.getElementById('sub-freq').value      = sub ? (sub.frequency||'Monthly') : 'Monthly';
  document.getElementById('sub-amount').value    = sub ? sub.amount : '';
  document.getElementById('sub-renewal').value   = sub ? (sub.renewalDate||'') : '';
  document.getElementById('sub-modal').style.display = 'flex';
}
export function closeSubModal() { document.getElementById('sub-modal').style.display = 'none'; }
export function saveSub() {
  const name    = document.getElementById('sub-name').value.trim();
  const amount  = parseFloat(document.getElementById('sub-amount').value);
  const cat     = document.getElementById('sub-cat').value;
  const freq    = document.getElementById('sub-freq').value;
  const renewal = document.getElementById('sub-renewal').value;
  const id      = document.getElementById('sub-edit-id').value;
  if (!name || isNaN(amount)) return;
  if (!state.subscriptions) state.subscriptions = [];
  const entry = { name, amount, category: cat, frequency: freq, renewalDate: renewal };
  if (id) {
    const idx = state.subscriptions.findIndex(s => s.id === id);
    if (idx !== -1) state.subscriptions[idx] = { ...state.subscriptions[idx], ...entry };
  } else {
    state.subscriptions.push({ id: uid(), ...entry });
  }
  saveData(state); closeSubModal(); renderSubscriptions();
}
export function deleteSub(id) {
  state.subscriptions = (state.subscriptions||[]).filter(s => s.id !== id);
  saveData(state); renderSubscriptions();
}

export async function handleSubCSV(event) {
  const file = event.target.files[0];
  if (!file) return;
  const key = localStorage.getItem('toto_ai_key');
  const status = document.getElementById('sub-import-status');
  if (!key) {
    if (status) { status.textContent = '⚠ Please enter your Anthropic API key above first.'; status.style.display = ''; }
    return;
  }
  const text = await file.text();
  const lines = text.split('\n').filter(l => l.trim()).slice(0, 200);
  if (status) { status.innerHTML = '<span class="sub-spinner"></span> Analysing your transactions…'; status.style.display = ''; }

  // Build context of existing expenses
  const existingNames = [
    ...(state.bills||[]).map(b => b.name),
    ...(state.subscriptions||[]).map(s => s.name),
    ...((state.budget.expenses||[]).map(e => e.name))
  ].join(', ');

  const prompt = `You are a financial assistant analysing Australian bank statement transactions to find recurring subscriptions and bills.

CSV transactions (up to 200 rows):
${lines.join('\n')}

Already tracked by the user (skip these): ${existingNames || 'none'}

Find any recurring subscriptions or bills NOT already tracked. For each one return a JSON array — no other text, just valid JSON:
[
  {
    "name": "Netflix",
    "amount": 22.99,
    "frequency": "Monthly",
    "category": "Streaming",
    "description": "Video streaming service",
    "type": "subscription"
  }
]

Categories must be one of: Streaming, Music, Software, Fitness, Gaming, News, Insurance, Education, Other.
Frequency must be one of: Monthly, Annual, Weekly.
If nothing new found, return [].`;

  try {
    const res = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!res.ok) { throw new Error(`API error ${res.status}`); }
    const data = await res.json();
    const raw  = data.content[0].text.trim();
    // Extract JSON array from response
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON found in response');
    const found = JSON.parse(match[0]);
    _subImportResults = found.map((r, i) => ({ ...r, _key: `import_${Date.now()}_${i}` }));
    _subImportDismissed = new Set();
    if (status) status.style.display = 'none';
    event.target.value = '';
    renderSubscriptions();
  } catch(err) {
    if (status) { status.textContent = `⚠ ${err.message}`; status.style.display = ''; }
  }
}

export function addSubFromImport(key, dest) {
  const item = _subImportResults.find(r => r._key === key);
  if (!item) return;
  if (dest === 'subscription') {
    if (!state.subscriptions) state.subscriptions = [];
    state.subscriptions.push({ id: uid(), name: item.name, amount: item.amount, category: item.category, frequency: item.frequency });
    saveData(state);
  } else {
    // Add to current month's budget as an expense
    const mb = ensureMonthOverride(selectedBudgetMonth);
    mb.expenses.push({ id: nextId(mb.expenses), name: item.name, amount: item.amount, frequency: 'monthly', category: 'Subscriptions', recurring: true });
    saveData(state);
  }
  _subImportDismissed.add(key);
  renderSubscriptions();
}

export function dismissSubResult(key) {
  _subImportDismissed.add(key);
  renderSubscriptions();
}


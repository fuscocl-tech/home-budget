// Bank CSV import — parse, AI-categorise, and apply transactions
import { state } from '../store.js';
import { escHtml, aud, audD, monthlyTotal } from './format.js';
import { prefsGet } from '../prefs.js';

// BANK CSV IMPORT
// ─────────────────────────────────────────────────
export let _csvRows   = []; // parsed { date, description, amount }
export let _csvReview = []; // { idx, date, description, amount, expenseId, checked }

export function openCsvImport() {
  document.getElementById('modal-title').textContent = 'Import Bank Transactions';
  document.getElementById('modal-body').innerHTML = `
    <div style="padding:4px 0">
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">
        Upload a CSV exported from your bank. Works with ANZ, CBA, Westpac, NAB and most Australian banks.
        Transactions will be matched to your <strong>${window.monthLabel(window.selectedBudgetMonth)}</strong> budget categories.
      </p>
      <label style="display:flex;flex-direction:column;align-items:center;justify-content:center;
        border:2px dashed var(--border);border-radius:12px;padding:32px 16px;cursor:pointer;
        gap:8px;background:var(--surface2);transition:border-color 0.15s"
        onmouseover="this.style.borderColor='var(--primary)'"
        onmouseout="this.style.borderColor='var(--border)'">
        <span style="font-size:32px">📄</span>
        <span style="font-weight:600;font-size:14px">Choose CSV file</span>
        <span style="font-size:12px;color:var(--text-muted)">or drag and drop</span>
        <input type="file" accept=".csv,.txt" style="display:none" onchange="handleCsvFile(event)">
      </label>
      <div id="csv-parse-status" style="display:none;margin-top:12px;font-size:13px;color:var(--danger)"></div>
    </div>`;
  document.getElementById('modal-footer').innerHTML = `<button class="btn" onclick="window.closeModal()">Cancel</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

export function parseBankCSV(text) {
  function parseCSVLine(line) {
    const fields = []; let cur = '', inQ = false;
    for (const c of line) {
      if (c === '"') inQ = !inQ;
      else if (c === ',' && !inQ) { fields.push(cur.trim()); cur = ''; }
      else cur += c;
    }
    fields.push(cur.trim());
    return fields.map(f => f.replace(/^"|"$/g, '').trim());
  }

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 2);
  if (lines.length < 2) return null;

  // Find header row (first row containing "date")
  let hi = 0;
  for (let i = 0; i < Math.min(6, lines.length); i++) {
    if (/date/i.test(lines[i])) { hi = i; break; }
  }
  const headers = parseCSVLine(lines[hi]).map(h => h.toLowerCase());

  const dateCol  = headers.findIndex(h => /date/.test(h));
  const descCol  = headers.findIndex(h => /desc|detail|narrat|payee|merchant|particular/.test(h));
  const amtCol   = headers.findIndex(h => /^amount$|^amt$/.test(h));
  const debitCol = headers.findIndex(h => /^debit$|withdrawal|^debit amount/.test(h));
  const catCol   = headers.findIndex(h => /^category$/.test(h));
  const subCatCol = headers.findIndex(h => /^subcategory$/.test(h));

  if (dateCol === -1 || (descCol === -1 && amtCol === -1 && debitCol === -1)) return null;

  const txns = [];
  for (let i = hi + 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    if (row.length < 2) continue;
    const date = (row[dateCol] || '').trim();
    const rawDesc = descCol !== -1 ? (row[descCol] || '').trim() : '';
    if (!rawDesc) continue;

    // Clean description: strip transaction type prefix + date code
    const description = rawDesc
      .replace(/^(Visa Purchase|Eftpos Debit|Osko Deposit|Internet Deposit|Debit Interest|Direct Debit|Direct Credit)\s+/i, '')
      .replace(/^\d{2}[A-Za-z]{3}[\d:]*\s+/, '')
      .replace(/\s{2,}/g, ' ')
      .trim() || rawDesc;

    let amount = 0;
    if (debitCol !== -1) {
      const v = parseFloat((row[debitCol] || '').replace(/[^0-9.]/g, ''));
      if (!isNaN(v) && v > 0) amount = v;
    } else if (amtCol !== -1) {
      const v = parseFloat((row[amtCol] || '').replace(/[^0-9.-]/g, ''));
      if (!isNaN(v) && v < 0) amount = Math.abs(v); // negative = debit
    }

    // Pick up bank's own category if available
    const bankCat = [
      catCol !== -1 ? (row[catCol] || '').trim() : '',
      subCatCol !== -1 ? (row[subCatCol] || '').trim() : ''
    ].filter(Boolean).join(' > ') || '';

    if (amount > 0) txns.push({ date, description, amount, bankCat });
  }
  return txns.length ? txns : null;
}

export async function handleCsvFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const text = await file.text();
  const txns = parseBankCSV(text);
  const status = document.getElementById('csv-parse-status');
  if (!txns) {
    if (status) { status.textContent = "Couldn't detect transactions. Check it's a bank CSV with a header row containing 'Date'."; status.style.display = ''; }
    return;
  }
  _csvRows = txns;
  _renderCsvPreview();
}

export function _renderCsvPreview() {
  const hasKey = !!window._secureGet('toto_ai_key');
  const preview = _csvRows.slice(0, 5);
  document.getElementById('modal-body').innerHTML = `
    <div>
      <div style="background:var(--success-light);border:1px solid #6ee7b7;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:13px;color:#155e75">
        Found <strong>${_csvRows.length} expense transactions</strong> in your CSV
      </div>
      <div class="table-wrap" style="margin-bottom:16px">
        <table>
          <thead><tr><th>Date</th><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
          <tbody>
            ${preview.map(t => `<tr>
              <td style="color:var(--text-muted);font-size:12px;white-space:nowrap">${t.date}</td>
              <td style="font-weight:500">${escHtml(t.description)}</td>
              <td class="amount">${audD(t.amount)}</td>
            </tr>`).join('')}
            ${_csvRows.length > 5 ? `<tr><td colspan="3" style="text-align:center;color:var(--text-muted);font-size:12px;padding:8px">+ ${_csvRows.length - 5} more rows…</td></tr>` : ''}
          </tbody>
        </table>
      </div>
      ${!hasKey ? `<div style="background:var(--warning-light);border:1px solid #fde68a;border-radius:8px;padding:10px 14px;font-size:13px;color:#92400e">
        ⚠ No API key — go to Settings › AI Assistant to enable auto-categorisation.
      </div>` : ''}
    </div>`;
  document.getElementById('modal-footer').innerHTML = `
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    ${hasKey
      ? `<button class="btn btn-primary" onclick="runCsvCategorise()">Categorise with AI →</button>`
      : `<button class="btn btn-primary" onclick="_renderCsvReview(null)">Assign Manually →</button>`}`;
}

export async function runCsvCategorise() {
  const key = window._secureGet('toto_ai_key');
  if (!key) { _renderCsvReview(null); return; }

  document.getElementById('modal-body').innerHTML = `
    <div style="text-align:center;padding:48px 16px">
      <div style="font-size:32px;margin-bottom:12px">🤖</div>
      <div style="font-weight:600;margin-bottom:6px">Categorising ${_csvRows.length} transactions…</div>
      <div style="font-size:12px;color:var(--text-muted)">Matching to your ${window.monthLabel(window.selectedBudgetMonth)} budget categories</div>
    </div>`;
  document.getElementById('modal-footer').innerHTML = '';

  const expenses = window.getMonthData(window.selectedBudgetMonth).expenses;
  const catList = expenses.map(e => `${e.id}: ${e.name}${e.category ? ' (' + e.category + ')' : ''}`).join('\n');

  // Check if bank categories are available for smarter grouping
  const hasBankCats = _csvRows.some(t => t.bankCat);

  // Build the items to send to AI — either bank categories or unique descriptions
  let promptItems, mapResultBack;

  // _csvSuggestions maps txIndex → suggested new expense name
  window._csvSuggestions = {};

  if (hasBankCats) {
    // Group by bank category — far fewer items to categorise
    const bankCatGroups = {};
    _csvRows.forEach((t, i) => {
      const cat = t.bankCat || 'Other';
      if (!bankCatGroups[cat]) bankCatGroups[cat] = { bankCat: cat, indices: [], sample: t.description };
      bankCatGroups[cat].indices.push(i);
    });
    const bankCatList = Object.values(bankCatGroups);
    promptItems = bankCatList.map((g, i) => ({ idx: i, bankCategory: g.bankCat, sample: g.sample }));
    mapResultBack = (assignments) => {
      const txMap = {};
      assignments.forEach(a => {
        const group = bankCatList[a.idx];
        if (group) group.indices.forEach(txIdx => {
          txMap[txIdx] = a.expenseId;
          if (a.suggest) _csvSuggestions[txIdx] = a.suggest;
        });
      });
      return txMap;
    };
  } else {
    // Deduplicate by description
    const descMap = {};
    _csvRows.forEach((t, i) => {
      const key2 = t.description.toUpperCase().replace(/\s+/g,' ').trim();
      if (!descMap[key2]) descMap[key2] = { desc: t.description, indices: [] };
      descMap[key2].indices.push(i);
    });
    const uniqueDescs = Object.values(descMap);
    promptItems = uniqueDescs.map((d, i) => ({ idx: i, description: d.desc }));
    mapResultBack = (assignments) => {
      const txMap = {};
      assignments.forEach(a => {
        const desc = uniqueDescs[a.idx];
        if (desc) desc.indices.forEach(txIdx => {
          txMap[txIdx] = a.expenseId;
          if (a.suggest) _csvSuggestions[txIdx] = a.suggest;
        });
      });
      return txMap;
    };
  }

  const itemType = hasBankCats ? 'bank categories' : 'unique transaction descriptions';
  const prompt = `You are categorising Australian bank transactions for a family budget app.

The user's EXISTING budget expense categories (id: name):
${catList || '(none yet)'}

Here are ${promptItems.length} ${itemType} from their bank statement (${_csvRows.length} total transactions):
${JSON.stringify(promptItems)}

For EACH item:
- If it matches an existing expense, use that expenseId
- If no existing expense fits, use expenseId -1 AND include a "suggest" field with a short category name to create (e.g. "Groceries", "Dining Out", "Transport", "Parking")
- For bank transfers, deposits, ATM withdrawals, fees → use expenseId -1 with NO suggest (genuinely skip these)

IMPORTANT: Return ONLY raw JSON array, no markdown, no code fences:
[{"idx":0,"expenseId":3},{"idx":1,"expenseId":-1,"suggest":"Dining Out"},{"idx":2,"expenseId":-1}]`;

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
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    const raw = data.content[0].text.replace(/```[\w]*\n?/g, '').trim();
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON in response');
    const assignments = JSON.parse(match[0]);
    const txMap = mapResultBack(assignments);
    _renderCsvReview(txMap);
  } catch(err) {
    document.getElementById('modal-body').innerHTML = `
      <div style="padding:8px">
        <div style="color:var(--danger);margin-bottom:10px">⚠ ${err.message}</div>
        <p style="font-size:13px;color:var(--text-muted)">You can still assign categories manually below.</p>
      </div>`;
    document.getElementById('modal-footer').innerHTML = `
      <button class="btn" onclick="window.closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="_renderCsvReview(null)" style="margin-left:8px">Assign Manually →</button>`;
  }
}

export function _renderCsvReview(aiMap) {
  const expenses = window.getMonthData(window.selectedBudgetMonth).expenses;
  const hasBankCats = _csvRows.some(t => t.bankCat);

  // Assign each transaction
  const txAssign = _csvRows.map((t, i) => ({
    ...t, idx: i, expenseId: aiMap ? (aiMap[i] ?? -1) : -1
  }));

  // Group by bank category if available, otherwise by expenseId
  const groupMap = {};
  txAssign.forEach(tx => {
    const groupKey = hasBankCats ? (tx.bankCat || 'Other') : String(tx.expenseId);
    if (!groupMap[groupKey]) groupMap[groupKey] = { key: groupKey, txns: [], total: 0 };
    groupMap[groupKey].txns.push(tx);
    groupMap[groupKey].total += tx.amount;
  });

  // Collect unique AI suggestions for new categories
  const suggestNames = {};  // "Dining Out" → negative ID
  let nextSuggestId = -100;
  const suggestions = window._csvSuggestions || {};

  _csvReview = Object.values(groupMap).map((g, i) => {
    // Pick best expense ID: majority vote from group's transactions
    let expenseId = -1;
    let suggest = '';
    if (aiMap) {
      const votes = {};
      g.txns.forEach(tx => {
        const eid = tx.expenseId;
        if (eid != null && eid !== -1) votes[eid] = (votes[eid] || 0) + 1;
      });
      const best = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
      if (best) expenseId = parseInt(best[0]);

      // If no match, pick the most common suggestion
      if (expenseId === -1) {
        const sugVotes = {};
        g.txns.forEach(tx => {
          const s = suggestions[tx.idx];
          if (s) sugVotes[s] = (sugVotes[s] || 0) + 1;
        });
        const bestSug = Object.entries(sugVotes).sort((a, b) => b[1] - a[1])[0];
        if (bestSug) {
          suggest = bestSug[0];
          if (!suggestNames[suggest]) suggestNames[suggest] = nextSuggestId--;
          expenseId = suggestNames[suggest];
        }
      }
    }
    return {
      gIdx: i,
      expenseId,
      suggest,
      total: Math.round(g.total * 100) / 100,
      count: g.txns.length,
      txns: g.txns,
      descs: [...new Set(g.txns.map(t => t.description))].slice(0, 4),
      label: hasBankCats ? g.key : null,
      checked: expenseId !== -1
    };
  }).sort((a, b) => b.total - a.total);

  // Store suggestion name lookup for apply step
  window._csvSuggestNames = {};
  Object.entries(suggestNames).forEach(([name, id]) => { window._csvSuggestNames[id] = name; });

  function expenseOpts(selId, suggestName) {
    let opts = `<option value="-1"${selId === -1 ? ' selected' : ''}>— Skip —</option>`;
    // Add "Create: X" options for all AI suggestions
    Object.entries(suggestNames).forEach(([name, id]) => {
      opts += `<option value="${id}"${selId === id ? ' selected' : ''}>➕ Create: ${escHtml(name)}</option>`;
    });
    // Existing expenses
    opts += expenses.map(e => `<option value="${e.id}"${e.id === selId ? ' selected' : ''}>${escHtml(e.name)}</option>`).join('');
    return opts;
  }

  const rows = _csvReview.map((g, i) => {
    const descPreview = g.descs.join(', ') + (g.count > g.descs.length ? ` +${g.count - g.descs.length} more` : '');
    const labelHtml = g.label ? `<div style="font-size:11px;font-weight:600;color:var(--primary);margin-bottom:2px">${escHtml(g.label)}</div>` : '';
    return `<tr>
      <td style="width:36px;padding:6px 8px"><input type="checkbox" id="csv-chk-${i}" ${g.checked ? 'checked' : ''} onchange="_csvToggle(${i},this.checked)"></td>
      <td>${labelHtml}<select style="font-size:12px;border:1px solid var(--border);border-radius:6px;padding:3px 6px;background:var(--surface);max-width:160px"
          onchange="_csvSetExpense(${i},+this.value)">${expenseOpts(g.expenseId)}</select></td>
      <td style="font-size:12px;text-align:center;font-weight:600">${g.count}</td>
      <td style="font-size:11px;color:var(--text-muted);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escAttr(descPreview)}">${escHtml(descPreview)}</td>
      <td class="amount" style="white-space:nowrap;font-weight:600">${audD(g.total)}</td>
    </tr>`;
  }).join('');

  const aiNote = aiMap ? `<div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">🤖 Transactions grouped by category — review and adjust as needed.</div>` : '';
  const checkedCount = _csvReview.filter(g => g.checked && g.expenseId !== -1).length;
  const checkedTxns  = _csvReview.filter(g => g.checked && g.expenseId !== -1).reduce((s, g) => s + g.count, 0);

  document.getElementById('modal-body').innerHTML = `
    <div>
      ${aiNote}
      <div class="table-wrap" style="max-height:340px;overflow-y:auto">
        <table>
          <thead><tr>
            <th style="width:36px"><input type="checkbox" checked onchange="_csvToggleAll(this.checked)"></th>
            <th>Category</th><th style="text-align:center">Txns</th><th>Descriptions</th><th style="text-align:right">Total</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;

  const pendingCount = _csvReview.filter(g => g.checked && g.expenseId === -1).length;
  document.getElementById('modal-footer').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:6px;width:100%">
      <div id="csv-pending-note" style="font-size:12px;color:var(--warning);text-align:right">${pendingCount > 0 ? `${pendingCount} checked group${pendingCount !== 1 ? 's' : ''} still need a category assigned` : ''}</div>
      <div style="display:flex;justify-content:flex-end;gap:10px">
        <button class="btn" onclick="window.closeModal()">Cancel</button>
        <button class="btn btn-primary" id="csv-apply-btn" onclick="applyCsvImport()"${checkedCount === 0 ? ' disabled' : ''}>
          Apply ${checkedCount} group${checkedCount !== 1 ? 's' : ''} (${checkedTxns} txns)
        </button>
      </div>
    </div>`;
}

export function _csvToggle(idx, checked) {
  _csvReview[idx].checked = checked;
  _csvUpdateApplyBtn();
}

export function _csvToggleAll(checked) {
  _csvReview.forEach((g, i) => {
    g.checked = checked;
    const el = document.getElementById(`csv-chk-${i}`);
    if (el) el.checked = checked;
  });
  _csvUpdateApplyBtn();
}

export function _csvSetExpense(idx, expenseId) {
  _csvReview[idx].expenseId = expenseId;
  _csvReview[idx].checked = true;
  const chk = document.getElementById(`csv-chk-${idx}`);
  if (chk) chk.checked = true;
  _csvUpdateApplyBtn();
}

export function _csvUpdateApplyBtn() {
  const ready   = _csvReview.filter(g => g.checked && g.expenseId !== -1);
  const pending = _csvReview.filter(g => g.checked && g.expenseId === -1);
  const groups  = ready.length;
  const txns    = ready.reduce((s, g) => s + g.count, 0);
  const btn     = document.getElementById('csv-apply-btn');
  if (btn) {
    btn.textContent = `Apply ${groups} group${groups !== 1 ? 's' : ''} (${txns} txns)`;
    btn.disabled = groups === 0;
  }
  const note = document.getElementById('csv-pending-note');
  if (note) note.textContent = pending.length > 0 ? `${pending.length} checked group${pending.length !== 1 ? 's' : ''} still need a category assigned` : '';
}

export function applyCsvImport() {
  const toApply = _csvReview.filter(g => g.checked && g.expenseId !== -1);
  if (!toApply.length) { window.closeModal(); return; }

  if (!state.budget.actuals[window.selectedBudgetMonth]) state.budget.actuals[window.selectedBudgetMonth] = {};
  const suggestNames = window._csvSuggestNames || {};
  const createdExpenses = {}; // suggestId → real expense ID

  toApply.forEach(g => {
    let eid = g.expenseId;

    // If it's a "Create: X" suggestion (negative ID < -1), create the budget expense
    if (eid < -1 && suggestNames[eid]) {
      if (!createdExpenses[eid]) {
        const newExp = {
          id: nextId(state.budget.expenses),
          name: suggestNames[eid],
          amount: 0,
          frequency: 'monthly',
          category: suggestNames[eid],
          dueDate: '',
          vendor: null
        };
        state.budget.expenses.push(newExp);
        // Also add to current month override if it exists
        if (window.isMonthCustomized(window.selectedBudgetMonth)) {
          const mb = state.budget.months[window.selectedBudgetMonth];
          mb.expenses.push({ ...newExp, id: nextId(mb.expenses) });
          createdExpenses[eid] = mb.expenses[mb.expenses.length - 1].id;
        } else {
          createdExpenses[eid] = newExp.id;
        }
      }
      eid = createdExpenses[eid];
    }

    const entries = window.getActualEntries(eid, window.selectedBudgetMonth);
    const nId     = entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1;
    const note    = g.descs.join(', ') + (g.count > g.descs.length ? ` +${g.count - g.descs.length} more` : '');
    entries.push({ id: nId, amount: g.total, date: g.txns[0].date, note: `${g.count} transactions: ${note}` });
    state.budget.actuals[window.selectedBudgetMonth][eid] = entries;
  });

  window.saveData(state);
  window.closeModal();
  window.renderAll();
}

// ─────────────────────────────────────────────────
// QUICK-ADD SPEND
// ─────────────────────────────────────────────────
export let _qaAmount     = '';
export let _qaExpenseId  = null;


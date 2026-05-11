// Onboarding flow — new user setup wizard
import { state } from '../store.js';
import { escHtml, escAttr } from './format.js';

// ─────────────────────────────────────────────────
// ONBOARDING
// ─────────────────────────────────────────────────

export const OB_EXPENSE_PRESETS = {
  building: [
    { name: 'Mortgage / Rent',  category: 'Mortgage / Rent',  amount: 3000 },
    { name: 'Groceries',        category: 'Groceries',         amount: 1200 },
    { name: 'Utilities',        category: 'Utilities',         amount: 400  },
    { name: 'Transport',        category: 'Transport',         amount: 500  },
    { name: 'Insurance',        category: 'Insurance',         amount: 350  },
    { name: 'Entertainment',    category: 'Entertainment',     amount: 200  },
  ],
  mortgage: [
    { name: 'Mortgage',         category: 'Mortgage / Rent',  amount: 3500 },
    { name: 'Groceries',        category: 'Groceries',         amount: 1200 },
    { name: 'Utilities',        category: 'Utilities',         amount: 400  },
    { name: 'Transport',        category: 'Transport',         amount: 500  },
    { name: 'Insurance',        category: 'Insurance',         amount: 350  },
    { name: 'Entertainment',    category: 'Entertainment',     amount: 200  },
  ],
  renting: [
    { name: 'Rent',             category: 'Mortgage / Rent',  amount: 2500 },
    { name: 'Groceries',        category: 'Groceries',         amount: 1200 },
    { name: 'Utilities',        category: 'Utilities',         amount: 300  },
    { name: 'Transport',        category: 'Transport',         amount: 500  },
    { name: 'Insurance',        category: 'Insurance',         amount: 250  },
    { name: 'Entertainment',    category: 'Entertainment',     amount: 200  },
  ],
  own: [
    { name: 'Groceries',        category: 'Groceries',         amount: 1200 },
    { name: 'Utilities',        category: 'Utilities',         amount: 400  },
    { name: 'Transport',        category: 'Transport',         amount: 500  },
    { name: 'Insurance',        category: 'Insurance',         amount: 400  },
    { name: 'Health',           category: 'Health',            amount: 300  },
    { name: 'Entertainment',    category: 'Entertainment',     amount: 300  },
  ],
};

export let _ob = {
  step: 1,
  adults: 2, adultNames: ['',''], adultAges: ['',''],
  kids: 0, kidProfiles: [],
  homeType: 'mortgage',
  incomes: [{ name: '', amount: '', frequency: 'Monthly' }],
  expenses: [],
  _emojiPickerOpen: null
};

export function obStepSequence() {
  return _ob.kids > 0 ? [1,2,3,4,5,6] : [1,2,4,5,6];
}
export function obStepPosition() {
  return obStepSequence().indexOf(_ob.step);
}

export function showOnboarding() {
  _ob = {
    step: 1,
    adults: 2, adultNames: ['',''], adultAges: ['',''],
    kids: 0, kidProfiles: [],
    homeType: 'mortgage',
    incomes: [{ name: '', amount: '', frequency: 'Monthly' }],
    expenses: [],
    _emojiPickerOpen: null
  };
  document.getElementById('onboarding-overlay').style.display = 'flex';
  renderObStep();
}
export function hideOnboarding() {
  document.getElementById('onboarding-overlay').style.display = 'none';
}

export function obSetAdults(n) {
  _ob.adults = n;
  while (_ob.adultNames.length < n) _ob.adultNames.push('');
  _ob.adultNames = _ob.adultNames.slice(0, n);
  while (_ob.adultAges.length < n) _ob.adultAges.push('');
  _ob.adultAges = _ob.adultAges.slice(0, n);
  renderObStep();
}

export function obSetKids(n) {
  _ob.kids = n;
  if (_ob.kidProfiles.length > n) _ob.kidProfiles = _ob.kidProfiles.slice(0, n);
  renderObStep();
}

export function obToggleEmojiPicker(i) {
  _ob._emojiPickerOpen = _ob._emojiPickerOpen === i ? null : i;
  renderObStep();
}

export function obPickEmoji(kidIdx, emoji) {
  _ob.kidProfiles[kidIdx].emoji = emoji;
  _ob._emojiPickerOpen = null;
  renderObStep();
}

export function obToggleExpenseSkip(i) {
  _ob.expenses[i].skipped = !_ob.expenses[i].skipped;
  renderObStep();
}

export function renderObStep() {
  const card = document.getElementById('onboarding-card');
  const seq  = obStepSequence();
  const pos  = obStepPosition();
  const step = _ob.step;

  const dots = seq.map((s, i) =>
    `<div class="ob-dot ${i < pos ? 'done' : i === pos ? 'active' : ''}"></div>`
  ).join('');

  let headerContent = '';
  let bodyContent   = '';
  let footerContent = '';

  /* ── Step 1: Welcome ─────────────────────────── */
  if (step === 1) {
    headerContent = `
      <div style="text-align:center;font-size:52px;margin-bottom:16px">🏡</div>
      <div class="ob-title" style="text-align:center">Welcome to Toto</div>
      <div class="ob-subtitle" style="text-align:center">Your personal assistant for life.<br>Takes about 4 minutes to set up.</div>`;

    bodyContent = `
      <div class="ob-welcome-feature"><span>✅</span> Budget, bills &amp; net worth</div>
      <div class="ob-welcome-feature"><span>✅</span> Meal planner &amp; lunchbox</div>
      <div class="ob-welcome-feature"><span>✅</span> Kids' chores &amp; rewards</div>`;

    footerContent = `
      <button class="ob-back" onclick="obSkip()">Skip setup</button>
      <button class="ob-next" onclick="obNext()">Let's get started →</button>`;

  /* ── Step 2: Household ───────────────────────── */
  } else if (step === 2) {
    headerContent = `
      <div class="ob-step-dots">${dots}</div>
      <div class="ob-title">Your household 🏠</div>
      <div class="ob-subtitle">Tell us who's home so we can tailor Toto for you.</div>`;

    const adultOpts = [1,2,3].map(n =>
      `<button class="ob-option ${_ob.adults===n?'selected':''}" onclick="obSetAdults(${n})">${n} adult${n>1?'s':''}</button>`
    ).join('');

    const nameInputs = _ob.adultNames.map((name, i) => `
      <div style="display:grid;grid-template-columns:1fr 90px;gap:8px;margin-bottom:10px">
        <div>
          <div class="ob-input-label">Adult ${i+1} name</div>
          <input class="ob-input" placeholder="${i===0?'e.g. Chris':'e.g. Sam'}" value="${escAttr(name)}"
            oninput="_ob.adultNames[${i}]=this.value"
            style="${_ob._nameError&&!name.trim()?'border-color:#ef4444':''}" required>
          ${_ob._nameError&&!name.trim() ? `<div style="font-size:11px;color:#ef4444;margin-top:3px">Please enter a name</div>` : ''}
        </div>
        <div>
          <div class="ob-input-label">Age (optional)</div>
          <input class="ob-input" type="number" min="18" max="99" placeholder="Age" value="${escAttr(String(_ob.adultAges[i]||''))}"
            oninput="_ob.adultAges[${i}]=this.value">
        </div>
      </div>`).join('');

    const kidOpts = [0,1,2,3,'4+'].map(n => {
      const val = n === '4+' ? 4 : n;
      return `<button class="ob-option ${_ob.kids===val?'selected':''}" onclick="obSetKids(${val})">${n===0?'No kids':n+(n===1?' kid':' kids')}</button>`;
    }).join('');

    const homeOpts = [
      { val:'renting',  label:'🏢 Renting' },
      { val:'mortgage', label:'🏠 Mortgage' },
      { val:'building', label:'🏗️ Building' },
      { val:'own',      label:'✅ Own outright' },
    ].map(o => `<button class="ob-option ${_ob.homeType===o.val?'selected':''}" onclick="_ob.homeType='${o.val}';renderObStep()">${o.label}</button>`).join('');

    bodyContent = `
      <span class="ob-label">Adults in your household</span>
      <div class="ob-options">${adultOpts}</div>
      ${nameInputs}
      <span class="ob-label" style="margin-top:4px">Home situation</span>
      <div class="ob-options">${homeOpts}</div>
      <span class="ob-label">Kids</span>
      <div class="ob-options" style="margin-bottom:0">${kidOpts}</div>`;

    footerContent = `
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obNext()">Continue →</button>`;

  /* ── Step 3: Kids ────────────────────────────── */
  } else if (step === 3) {
    if (_ob.kidProfiles.length < _ob.kids) {
      _ob.kidProfiles = Array.from({length: _ob.kids}, (_, i) =>
        _ob.kidProfiles[i] || { name: '', age: '', emoji: KID_EMOJIS[i % KID_EMOJIS.length] }
      );
    }

    headerContent = `
      <div class="ob-step-dots">${dots}</div>
      <div class="ob-title">Your kids 👶</div>
      <div class="ob-subtitle">We'll set up chores and lunchbox for each of them.</div>`;

    const kidRows = _ob.kidProfiles.map((kid, i) => {
      const pickerHtml = _ob._emojiPickerOpen === i ? `
        <div class="ob-emoji-picker">
          ${KID_EMOJIS.map(e => `<button onclick="obPickEmoji(${i},'${e}')">${e}</button>`).join('')}
        </div>` : '';
      return `
        <div style="margin-bottom:20px">
          <div class="ob-input-label" style="margin-bottom:8px">Kid ${i+1}</div>
          ${pickerHtml}
          <div class="ob-kid-row">
            <button class="ob-emoji-btn" onclick="obToggleEmojiPicker(${i})" title="Pick emoji">${escHtml(kid.emoji)}</button>
            <div>
              <div class="ob-input-label">Name</div>
              <input class="ob-input" placeholder="Name" value="${escAttr(kid.name)}"
                oninput="_ob.kidProfiles[${i}].name=this.value">
            </div>
            <div>
              <div class="ob-input-label">Age</div>
              <input class="ob-input" type="number" min="0" max="17" placeholder="Age" value="${escAttr(String(kid.age))}"
                oninput="_ob.kidProfiles[${i}].age=this.value">
            </div>
          </div>
        </div>`;
    }).join('');

    bodyContent = kidRows + `
      <button class="ob-add-link" onclick="_ob.kidProfiles.push({name:'',age:'',emoji:KID_EMOJIS[_ob.kidProfiles.length%KID_EMOJIS.length]});renderObStep()">+ Add a child</button>`;

    footerContent = `
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obNext()">Continue →</button>`;

  /* ── Step 4: Income ──────────────────────────── */
  } else if (step === 4) {
    headerContent = `
      <div class="ob-step-dots">${dots}</div>
      <div class="ob-title">Your income 💰</div>
      <div class="ob-subtitle">What's coming in each month?</div>`;

    const freqs = ['Weekly','Fortnightly','Monthly','Annual'];
    const rows = _ob.incomes.map((inc, i) => {
      const ph = _ob.adultNames[i] ? `${_ob.adultNames[i]}'s salary` : (i === 0 ? 'e.g. Salary' : 'e.g. Partner salary');
      const freqPills = freqs.map(f =>
        `<button class="ob-option ${inc.frequency===f?'selected':''}" style="padding:6px 14px;font-size:12px"
          onclick="_ob.incomes[${i}].frequency='${f}';renderObStep()">${f}</button>`
      ).join('');
      return `
        <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--hairline)">
          <div style="margin-bottom:10px">
            <div class="ob-input-label">Income source</div>
            <input class="ob-input" placeholder="${escAttr(ph)}" value="${escAttr(inc.name)}"
              oninput="_ob.incomes[${i}].name=this.value">
          </div>
          <div style="margin-bottom:10px">
            <div class="ob-input-label">Amount ($)</div>
            <input class="ob-input" type="number" max="99999999" min="0" placeholder="0" value="${inc.amount}"
              oninput="_ob.incomes[${i}].amount=this.value">
          </div>
          <div>
            <div class="ob-input-label">Frequency</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">${freqPills}</div>
          </div>
        </div>`;
    }).join('');

    bodyContent = `
      ${rows}
      ${_ob.incomes.length < 4 ? `<button class="ob-add-link" onclick="_ob.incomes.push({name:'',amount:'',frequency:'Monthly'});renderObStep()">+ Add another income source</button>` : ''}`;

    footerContent = `
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obNext()">Continue →</button>`;

  /* ── Step 5: Expenses ────────────────────────── */
  } else if (step === 5) {
    if (!_ob.expenses.length) {
      _ob.expenses = OB_EXPENSE_PRESETS[_ob.homeType].map(e => ({ ...e, skipped: false }));
      if (_ob.kids > 0) {
        _ob.expenses.push({ name: 'Kids activities / sport', category: 'Childcare / Education', amount: 300, skipped: false });
      }
    }

    headerContent = `
      <div class="ob-step-dots">${dots}</div>
      <div class="ob-title">Your main expenses 📋</div>
      <div class="ob-subtitle">Biggest regular costs — adjust to match your situation.</div>`;

    const rows = _ob.expenses.map((exp, i) => `
      <div class="ob-expense-row ${exp.skipped ? 'skipped' : ''}">
        <div>
          <div class="ob-expense-name">${escHtml(exp.name)}</div>
          <div class="ob-expense-cat">${exp.category}</div>
        </div>
        <div>
          <input class="ob-input" type="number" max="99999999" min="0" placeholder="0" value="${exp.amount}"
            oninput="_ob.expenses[${i}].amount=parseFloat(this.value)||0"
            style="text-align:right" ${exp.skipped ? 'disabled' : ''}>
          <button class="ob-skip-toggle" onclick="obToggleExpenseSkip(${i})">
            ${exp.skipped ? '+ Include' : '✕ Skip this'}
          </button>
        </div>
      </div>`).join('');

    bodyContent = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <p style="font-size:13px;color:var(--text-muted);margin:0">Monthly amounts — adjust to match your actual spending.</p>
        <button class="ob-add-link" onclick="obSkipExpenses()" style="white-space:nowrap;margin-left:12px">Add this later</button>
      </div>
      ${rows}`;

    footerContent = `
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obNext()">Continue →</button>`;

  /* ── Step 6: All Done ────────────────────────── */
  } else if (step === 6) {
    const monthlyIncome = _ob.incomes.reduce((s, inc) => {
      const amt = parseFloat(inc.amount) || 0;
      if (!amt) return s;
      const m = inc.frequency === 'Weekly' ? amt*52/12
              : inc.frequency === 'Fortnightly' ? amt*26/12
              : inc.frequency === 'Annual' ? amt/12 : amt;
      return s + m;
    }, 0);

    const monthlyExpenses = _ob.expenses
      .filter(e => !e.skipped)
      .reduce((s, e) => s + (parseFloat(e.amount)||0), 0);

    const namedAdults = _ob.adultNames.filter(n => n);
    const adultsDisplay = namedAdults.length > 0
      ? namedAdults.join(' & ')
      : `${_ob.adults} adult${_ob.adults > 1 ? 's' : ''}`;

    const homeLabel = { renting:'Renting', mortgage:'Mortgage', building:'Building', own:'Own outright' }[_ob.homeType] || '';

    const memberRows = [`
      <div class="ob-summary-member">
        <div class="ob-summary-avatar">👤</div>
        <div>
          <div style="font-size:14px;font-weight:600">${escHtml(adultsDisplay)}</div>
          <div style="font-size:12px;color:var(--text-muted)">Adults · ${homeLabel}</div>
        </div>
      </div>`];

    _ob.kidProfiles.forEach(kid => {
      if (!kid.name) return;
      memberRows.push(`
        <div class="ob-summary-member">
          <div class="ob-summary-avatar">${escHtml(kid.emoji)}</div>
          <div>
            <div style="font-size:14px;font-weight:600">${escHtml(kid.name)}${kid.age ? `, age ${kid.age}` : ''}</div>
            <div style="font-size:12px;color:var(--text-muted)">Chores &amp; lunchbox ready</div>
          </div>
        </div>`);
    });

    headerContent = `
      <div style="text-align:center;font-size:48px;margin-bottom:12px">🎉</div>
      <div class="ob-title" style="text-align:center">You're all set!</div>
      <div class="ob-subtitle" style="text-align:center">Here's what Toto knows about your household</div>`;

    bodyContent = `
      <div style="background:var(--surface2);border-radius:var(--r);padding:16px;margin-bottom:16px;border:1px solid var(--hairline)">
        ${memberRows.join('')}
      </div>
      <div style="display:flex;gap:12px">
        <div style="flex:1;background:#f0fdf4;border-radius:10px;padding:14px;text-align:center">
          <div style="font-size:20px;font-weight:700;color:#16a34a">$${Math.round(monthlyIncome).toLocaleString()}</div>
          <div style="color:var(--text-muted);font-size:11px">monthly income</div>
        </div>
        <div style="flex:1;background:#fff7ed;border-radius:10px;padding:14px;text-align:center">
          <div style="font-size:20px;font-weight:700;color:#ea580c">$${Math.round(monthlyExpenses).toLocaleString()}</div>
          <div style="color:var(--text-muted);font-size:11px">monthly expenses</div>
        </div>
      </div>`;

    footerContent = `
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obFinish()">Take me to my dashboard →</button>`;
  }

  card.innerHTML = `
    <div class="ob-header">${headerContent}</div>
    <div class="ob-body">${bodyContent}</div>
    <div class="ob-footer">${footerContent}</div>`;
}

export function obNext() {
  const seq = obStepSequence();
  const pos = obStepPosition();
  if (pos >= seq.length - 1) { obFinish(); return; }

  // Validate adult names on step 2
  if (_ob.step === 2) {
    const missing = _ob.adultNames.some(n => !n.trim());
    if (missing) { _ob._nameError = true; renderObStep(); return; }
    _ob._nameError = false;
  }

  const nextStep = seq[pos + 1];

  if (nextStep === 3) {
    _ob.kidProfiles = Array.from({length: _ob.kids}, (_, i) =>
      _ob.kidProfiles[i] || { name: '', age: '', emoji: KID_EMOJIS[i % KID_EMOJIS.length] }
    );
  }

  if (nextStep === 5 && !_ob.expenses.length) {
    _ob.expenses = OB_EXPENSE_PRESETS[_ob.homeType].map(e => ({ ...e, skipped: false }));
    if (_ob.kids > 0) {
      _ob.expenses.push({ name: 'Kids activities / sport', category: 'Childcare / Education', amount: 300, skipped: false });
    }
  }

  _ob.step = nextStep;
  renderObStep();
}

export function obBack() {
  const seq = obStepSequence();
  const pos = obStepPosition();
  if (pos <= 0) return;
  _ob.step = seq[pos - 1];
  renderObStep();
}

export function obSkip() {
  state.onboarded = true;
  window.saveData(state);
  hideOnboarding();
}

export function obSkipExpenses() {
  _ob.expenses = [];
  const seq = obStepSequence();
  const pos = obStepPosition();
  _ob.step = seq[pos + 1];
  renderObStep();
}

export function obFinish() {
  // Save household profile members
  state.householdProfile.members = [];
  for (let i = 0; i < _ob.adults; i++) {
    state.householdProfile.members.push({ role: 'adult', name: _ob.adultNames[i] || '', age: _ob.adultAges[i] ? parseInt(_ob.adultAges[i]) : null });
  }

  // Save kid profiles to household, kids.profiles, and lunchbox
  if (!state.kids) state.kids = { profiles: [], chores: [], prizes: [], completions: [], redemptions: [] };
  if (!state.meals) state.meals = {};
  if (!state.meals.lunchbox) state.meals.lunchbox = { profiles: [] };
  if (!state.meals.lunchbox.profiles) state.meals.lunchbox.profiles = [];

  // Clear existing kid profiles/lunchbox so re-running onboarding doesn't stack duplicates
  state.kids.profiles = [];
  state.meals.lunchbox.profiles = [];
  _ob.kidProfiles.forEach(kid => {
    state.householdProfile.members.push({ role: 'child', name: kid.name, age: kid.age ? parseInt(kid.age) : null, emoji: kid.emoji });
    if (!kid.name) return;
    const id = nextId(state.kids.profiles);
    state.kids.profiles.push({ id, name: kid.name, age: kid.age ? parseInt(kid.age) : null, emoji: kid.emoji });
    state.meals.lunchbox.profiles.push({ id, name: kid.name, emoji: kid.emoji });
  });

  state.householdProfile.homeType = _ob.homeType;

  // Save income to current month budget
  const mb = window.ensureMonthOverride(window.selectedBudgetMonth);
  _ob.incomes.forEach((inc, i) => {
    const amount = parseFloat(inc.amount);
    if (!amount) return;
    const monthly = inc.frequency === 'Weekly' ? amount*52/12
                  : inc.frequency === 'Fortnightly' ? amount*26/12
                  : inc.frequency === 'Annual' ? amount/12 : amount;
    const name = inc.name || (_ob.adultNames[i] ? `${_ob.adultNames[i]}'s salary` : `Income ${i+1}`);
    mb.income.push({ id: nextId(mb.income), name, amount: monthly, frequency: 'monthly', category: 'Salary' });
  });

  // Save expenses (excluding skipped)
  _ob.expenses.forEach(exp => {
    if (exp.skipped || !exp.amount) return;
    mb.expenses.push({ id: nextId(mb.expenses), name: exp.name, amount: exp.amount, frequency: 'monthly', category: exp.category, recurring: true });
  });

  state.onboarded = true;
  window.saveData(state);
  hideOnboarding();
  window.renderAll();
}

// Colour settings, Household profile, and AI Insights section
import { state } from '../store.js';
import { aud, audD, escHtml, escAttr, fmtDate, monthlyTotal, itemMonthly, nextId } from './format.js';
import { freqToMonthly } from '../utils.js';
import { prefsGet, prefsSet, prefsClear } from '../prefs.js';
import { expenseCategories, incomeCategories } from './build.js';

export const COLORS_KEY = 'home_finance_colors_v1';

export const DEFAULT_COLORS = {
  expense: {
    'Mortgage / Rent':       '#6366f1',
    'Insurance':             '#8b5cf6',
    'Utilities':             '#06b6d4',
    'Groceries':             '#10b981',
    'Transport':             '#f59e0b',
    'Childcare / Education': '#3b82f6',
    'Health':                '#ef4444',
    'Entertainment':         '#f97316',
    'Subscriptions':         '#84cc16',
    'Dining Out':            '#14b8a6',
    'Clothing':              '#ec4899',
    'Personal Care':         '#a855f7',
    'Savings / Investment':  '#22c55e',
    'Other':                 '#94a3b8',
  },
  income: '#10b981',
  build: {
    contract:   '#3b82f6',
    extras:     '#f59e0b',
    furniture:  '#8b5cf6',
    appliances: '#ef4444',
  }
};

export function loadColors() {
  try {
    const raw = prefsGet(COLORS_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_COLORS));
    const c = JSON.parse(raw);
    if (!c.expense) c.expense = {};
    if (!c.build)   c.build   = {};
    if (!c.income)  c.income  = DEFAULT_COLORS.income;
    expenseCategories().forEach(cat => { if (!c.expense[cat]) c.expense[cat] = DEFAULT_COLORS.expense[cat] || '#94a3b8'; });
    Object.keys(DEFAULT_COLORS.build).forEach(k => { if (!c.build[k]) c.build[k] = DEFAULT_COLORS.build[k]; });
    return c;
  } catch(e) { return JSON.parse(JSON.stringify(DEFAULT_COLORS)); }
}

export function saveColors(c) { prefsSet(COLORS_KEY, JSON.stringify(c)); }

let colors = loadColors();
Object.defineProperty(window, 'colors', { get() { return colors; }, set(v) { colors = v; }, configurable: true });

export function updateColor(type, key, value) {
  if (type === 'expense') colors.expense[key] = value;
  else if (type === 'income') colors.income = value;
  else if (type === 'build') colors.build[key] = value;
  saveColors(colors);
  renderBudget();
  renderBuild();
  renderDashboard();
}

export function profileAdults()   { return (state.householdProfile.members||[]).filter(m=>m.role==='adult').length  || 1; }
export function profileChildren() { return (state.householdProfile.members||[]).filter(m=>m.role==='child').length; }

export function addHouseholdMember(role) {
  state.householdProfile.members.push({ role: role||'adult', age: null });
  _markSettingsDirty(); renderSettings();
}
export function removeHouseholdMember(idx) {
  const m = state.householdProfile.members[idx];
  if (!m) return;
  const label = m.name || (m.role === 'child' ? 'this child' : 'this adult');
  if (!confirm(`Remove ${label} from the household?\n\nThis cannot be undone.`)) return;
  // Also clean up kids.profiles if this is a named child
  if (m.role === 'child' && m.name) {
    const kid = (state.kids?.profiles || []).find(k => k.name === m.name);
    if (kid) {
      state.kids.profiles    = state.kids.profiles.filter(k => k.id !== kid.id);
      state.kids.chores      = state.kids.chores.filter(c => c.assignedTo !== kid.id);
      state.kids.completions = state.kids.completions.filter(c => c.kidId !== kid.id);
      state.kids.redemptions = state.kids.redemptions.filter(r => r.kidId !== kid.id);
      if (state.meals?.lunchbox?.profiles)
        state.meals.lunchbox.profiles = state.meals.lunchbox.profiles.filter(p => p.id !== kid.id);
      if (String(window.getDeviceProfile()) === String(kid.id)) window.setDeviceProfile('adult');
    }
  }
  state.householdProfile.members.splice(idx, 1);
  window.saveData(state); window.renderAll();
}
export function updateMember(idx, field, value) {
  const m = state.householdProfile.members[idx];
  if (!m) return;
  m[field] = value;
  _markSettingsDirty();
  if (field === 'role' || field === 'name') renderSettings();
}
export function addPet(type) {
  state.householdProfile.pets.push({ type: type||'dog', name: '' });
  _markSettingsDirty(); renderSettings();
}
export function removePet(idx) {
  state.householdProfile.pets.splice(idx, 1);
  _markSettingsDirty(); renderSettings();
}
export function updatePet(idx, field, value) {
  const p = state.householdProfile.pets[idx];
  if (!p) return;
  p[field] = value;
  _markSettingsDirty();
}
export function updateCars(n) {
  state.householdProfile.cars = n;
  _markSettingsDirty();
}

// ─────────────────────────────────────────────────
// INSIGHTS
// ─────────────────────────────────────────────────

export function getBenchmarks(monthlyIncome, adults, children) {
  const people = adults + children;
  // Australian household benchmarks (ABS Household Expenditure Survey + MoneySmart + ACCC)
  return [
    {
      category: 'Mortgage / Rent',
      min: monthlyIncome * 0.20,
      max: monthlyIncome * 0.30,
      label: '20–30% of income',
      source: 'ABS / MoneySmart',
      needs: true
    },
    {
      category: 'Groceries',
      min: 380 + (adults - 1) * 260 + children * 160,
      max: 560 + (adults - 1) * 360 + children * 220,
      label: `$${Math.round(380 + (adults-1)*260 + children*160)}–$${Math.round(560 + (adults-1)*360 + children*220)}/month for ${people} ${people===1?'person':'people'}`,
      source: 'ABS HES 2022',
      needs: true
    },
    {
      category: 'Transport',
      min: monthlyIncome * 0.08,
      max: monthlyIncome * 0.15,
      label: '8–15% of income',
      source: 'ABS HES 2022',
      needs: true
    },
    {
      category: 'Utilities',
      min: 180 + adults * 25 + children * 15,
      max: 360 + adults * 40 + children * 25,
      label: `$${Math.round(180+adults*25+children*15)}–$${Math.round(360+adults*40+children*25)}/month`,
      source: 'AER / ABS',
      needs: true
    },
    {
      category: 'Insurance',
      min: 180 + adults * 40 + children * 20,
      max: 420 + adults * 60 + children * 30,
      label: `$${Math.round(180+adults*40+children*20)}–$${Math.round(420+adults*60+children*30)}/month`,
      source: 'APRA industry avg',
      needs: true
    },
    {
      category: 'Health',
      min: 60 * adults + 30 * children,
      max: 180 * adults + 60 * children,
      label: `$${60*adults+30*children}–$${180*adults+60*children}/month`,
      source: 'AIHW / ABS',
      needs: true
    },
    ...(children > 0 ? [{
      category: 'Childcare / Education',
      min: 700 * children,
      max: 2200 * children,
      label: `$700–$2,200/month per child (before subsidies)`,
      source: 'ACCC Childcare Report',
      needs: true
    }] : []),
    {
      category: 'Dining Out',
      min: monthlyIncome * 0.02,
      max: monthlyIncome * 0.05,
      label: '2–5% of income',
      source: 'MoneySmart',
      needs: false
    },
    {
      category: 'Entertainment',
      min: monthlyIncome * 0.02,
      max: monthlyIncome * 0.05,
      label: '2–5% of income',
      source: 'MoneySmart',
      needs: false
    },
    {
      category: 'Subscriptions',
      min: 30,
      max: 120,
      label: '$30–$120/month',
      source: 'Industry average',
      needs: false
    },
    {
      category: 'Clothing',
      min: 50 * adults + 30 * children,
      max: 150 * adults + 80 * children,
      label: `$${50*adults+30*children}–$${150*adults+80*children}/month`,
      source: 'ABS HES 2022',
      needs: false
    },
    {
      category: 'Savings / Investment',
      min: monthlyIncome * 0.10,
      max: monthlyIncome * 0.20,
      label: '10–20% of income (aim for 20%)',
      source: '50/30/20 rule',
      needs: false
    },
  ];
}

export function getBenchmarkStatus(actual, min, max) {
  if (actual < min * 0.9) return 'under';
  if (actual > max * 1.1) return 'over';
  return 'within';
}

export const INSIGHTS_KEY = 'home_finance_ai_key';

export function getAIKey() { return prefsGet(INSIGHTS_KEY) || ''; }
export function saveAIKey(k) { prefsSet(INSIGHTS_KEY, k); }

// ─── Spending pattern engine ──────────────────────

export function getCategoryHistoryData() {
  const months = window.getLast6Months();
  const catData = {};
  months.forEach(mo => {
    const md = window.getMonthData(mo);
    const budByCat = {}, actByCat = {};
    md.expenses.forEach(e => {
      const cat = e.category || 'Other';
      budByCat[cat] = (budByCat[cat] || 0) + itemMonthly(e);
      const actual = window.getActual(e.id, mo);
      if (actual > 0) actByCat[cat] = (actByCat[cat] || 0) + actual;
    });
    const allCats = new Set([...Object.keys(budByCat), ...Object.keys(actByCat)]);
    allCats.forEach(cat => {
      if (!catData[cat]) catData[cat] = [];
      catData[cat].push({ mo, budget: budByCat[cat]||0, actual: actByCat[cat]||0, hasActual: (actByCat[cat]||0) > 0 });
    });
  });
  return catData;
}

export function detectSpendingPatterns(catData) {
  const patterns = [];
  Object.entries(catData).forEach(([cat, months]) => {
    const withActual = months.filter(m => m.hasActual);
    if (withActual.length < 2) return;
    const overCount  = withActual.filter(m => m.budget > 0 && m.actual > m.budget * 1.05).length;
    const underCount = withActual.filter(m => m.budget > 0 && m.actual < m.budget * 0.92).length;
    const avgDiff    = withActual.reduce((s,m) => s + (m.actual - m.budget), 0) / withActual.length;
    const recent3    = months.slice(-3).filter(m => m.hasActual);
    const older3     = months.slice(0,3).filter(m => m.hasActual);
    const recentAvg  = recent3.length ? recent3.reduce((s,m)=>s+m.actual,0)/recent3.length : 0;
    const olderAvg   = older3.length  ? older3.reduce((s,m)=>s+m.actual,0)/older3.length   : 0;
    const trend      = olderAvg > 50 ? (recentAvg - olderAvg) / olderAvg : 0;

    if (overCount >= 3 && avgDiff > 20) {
      patterns.push({ cat, level:'warning', icon:'⚠️',
        title:`Consistently over on ${cat}`,
        body:`Over budget ${overCount}/${withActual.length} months, avg +${aud(Math.abs(avgDiff))}/mo. Consider raising the budget or cutting back.`,
        months: withActual });
    } else if (underCount >= 4 && months[months.length-1]?.budget > 0) {
      patterns.push({ cat, level:'good', icon:'✅',
        title:`Consistently under on ${cat}`,
        body:`Under budget ${underCount}/${withActual.length} months, avg ${aud(Math.abs(avgDiff))}/mo less. You may be able to reallocate this budget elsewhere.`,
        months: withActual });
    } else if (trend > 0.25 && recentAvg > 50) {
      patterns.push({ cat, level:'warning', icon:'📈',
        title:`${cat} trending up`,
        body:`Spending up ${Math.round(trend*100)}% over recent months — now averaging ${aud(recentAvg)}/mo. Worth keeping an eye on.`,
        months: withActual });
    } else if (trend < -0.25 && olderAvg > 50) {
      patterns.push({ cat, level:'good', icon:'📉',
        title:`${cat} trending down`,
        body:`Down ${Math.round(Math.abs(trend)*100)}% recently — now ${aud(recentAvg)}/mo. Nice improvement.`,
        months: withActual });
    }
  });
  return patterns
    .sort((a,b) => (['warning','alert','good','info'].indexOf(a.level)) - (['warning','alert','good','info'].indexOf(b.level)))
    .slice(0, 6);
}

export function renderCategoryBreakdown() {
  const md = window.getMonthData(window.selectedBudgetMonth);
  if (md.expenses.length === 0) return '';
  const byCat = {};
  md.expenses.forEach(e => {
    const cat = e.category || 'Other';
    if (!byCat[cat]) byCat[cat] = { budget:0, actual:0 };
    byCat[cat].budget += itemMonthly(e);
    byCat[cat].actual += window.getActual(e.id, window.selectedBudgetMonth);
  });
  const entries = Object.entries(byCat)
    .filter(([,v]) => v.budget > 0 || v.actual > 0)
    .sort((a,b) => Math.max(b[1].budget,b[1].actual) - Math.max(a[1].budget,a[1].actual));
  if (!entries.length) return '';
  const maxVal = Math.max(...entries.flatMap(([,v]) => [v.budget, v.actual]), 1);

  const rows = entries.map(([cat, v]) => {
    const hasActual = v.actual > 0;
    const bPct = (v.budget / maxVal * 100).toFixed(1);
    const aPct = (v.actual / maxVal * 100).toFixed(1);
    const diff = v.actual - v.budget;
    const cls  = !hasActual ? '' : diff > 5 ? 'over' : diff < -5 ? 'under' : '';
    const diffLabel = !hasActual
      ? '<span class="spi-no-actual">no actuals</span>'
      : diff > 5  ? `<span class="spi-over">+${aud(diff)}</span>`
      : diff < -5 ? `<span class="spi-under">${aud(diff)}</span>`
      : `<span class="spi-on">on track</span>`;
    return `<div class="spi-cat-row">
      <div class="spi-cat-label">${cat}</div>
      <div class="spi-cat-bars">
        <div class="spi-bar-wrap"><div class="spi-bar-budget" style="width:${bPct}%"></div>${hasActual?`<div class="spi-bar-actual ${cls}" style="width:${aPct}%"></div>`:''}</div>
      </div>
      <div class="spi-cat-amounts"><span>${aud(v.budget)}</span>${diffLabel}</div>
    </div>`;
  }).join('');

  return `<div class="spi-breakdown">
    <div class="spi-breakdown-header">
      <span style="font-size:13px;font-weight:700">Budget vs Actual — ${window.monthLabel(window.selectedBudgetMonth)}</span>
      <div style="display:flex;gap:14px;font-size:11px;color:var(--text-muted)">
        <span><span class="spi-legend spi-legend-budget"></span>Budget</span>
        <span><span class="spi-legend spi-legend-actual"></span>Actual</span>
      </div>
    </div>
    ${rows}
  </div>`;
}

export function renderSpendingPatterns() {
  const catData  = getCategoryHistoryData();
  const patterns = detectSpendingPatterns(catData);
  const breakdown = renderCategoryBreakdown();

  const levelStyle = {
    warning: { bg:'#fffbeb', border:'#fcd34d', title:'#92400e' },
    good:    { bg:'#ecfeff', border:'#86efac', title:'#166534' },
    alert:   { bg:'#fef2f2', border:'#fca5a5', title:'#991b1b' },
    info:    { bg:'#f8fafc', border:'#cbd5e1', title:'#475569' },
  };

  const patternCards = patterns.length === 0
    ? `<div class="spi-empty-state">Add actuals in Monthly Budget over a few months to unlock pattern detection.</div>`
    : `<div class="spi-patterns-grid">${patterns.map(p => {
        const s = levelStyle[p.level] || levelStyle.info;
        const maxAct = Math.max(...(p.months||[]).map(m=>m.actual), 1);
        const sparkBars = (p.months||[]).map(m => {
          const h = Math.max(Math.round(m.actual/maxAct*20), m.hasActual?2:0);
          const color = !m.hasActual ? '#e2e8f0' : m.actual > m.budget*1.05 ? '#ef4444' : m.actual < m.budget*0.95 ? '#10b981' : '#2563eb';
          return `<div class="spi-spark-bar" style="height:${h}px;background:${color}"></div>`;
        }).join('');
        return `<div class="spi-pattern-card" style="background:${s.bg};border:1.5px solid ${s.border}">
          <div class="spi-pattern-icon">${p.icon}</div>
          <div>
            <div class="spi-pattern-title" style="color:${s.title}">${escHtml(p.title)}</div>
            <div class="spi-pattern-body">${escHtml(p.body)}</div>
            <div class="spi-sparkline">${sparkBars}</div>
          </div>
        </div>`;
      }).join('')}</div>`;

  return `<div class="spi-section">
    <div class="spi-section-title">📊 Spending Patterns — Last 6 Months</div>
    ${breakdown}
    ${patternCards}
  </div>`;
}

export function generateSmartInsights() {
  const md           = window.getMonthData(window.selectedBudgetMonth);
  const totalIncome  = monthlyTotal(md.income);
  const totalExpenses= monthlyTotal(md.expenses);
  const surplus      = totalIncome - totalExpenses;
  const savingsRate  = totalIncome > 0 ? surplus / totalIncome * 100 : 0;

  const byCategory = {};
  md.expenses.forEach(e => {
    const cat = e.category || 'Other';
    byCategory[cat] = (byCategory[cat] || 0) + itemMonthly(e);
  });
  const sortedCats = Object.entries(byCategory).sort((a,b) => b[1]-a[1]);

  const last6    = window.getLast6Months();
  const avg6Exp  = last6.reduce((s, mo) => s + monthlyTotal(window.getMonthData(mo).expenses), 0) / 6;
  const avg6Inc  = last6.reduce((s, mo) => s + monthlyTotal(window.getMonthData(mo).income),   0) / 6;

  const insights = [];

  // Savings rate
  if (savingsRate >= 20) {
    insights.push({ level:'good',    icon:'🌟', title:'Excellent savings rate',
      body:`You're saving ${Math.round(savingsRate)}% of income — above the recommended 20%. Keep it up and consider putting the surplus toward your goals.` });
  } else if (savingsRate >= 10) {
    insights.push({ level:'ok',      icon:'📈', title:'Decent savings rate',
      body:`You're saving ${Math.round(savingsRate)}% of income. Pushing to 20% would mean an extra ${aud((totalIncome * 0.2) - surplus)}/month going toward your future.` });
  } else if (savingsRate > 0) {
    insights.push({ level:'warning', icon:'⚠️', title:'Low savings rate',
      body:`Only ${Math.round(savingsRate)}% of income is being saved (${aud(surplus)}/month). Look for the biggest discretionary expense you can reduce.` });
  } else if (totalIncome > 0) {
    insights.push({ level:'alert',   icon:'🚨', title:'Spending exceeds income',
      body:`You're spending ${aud(Math.abs(surplus))} more than you earn each month. This requires urgent attention — identify what can be cut immediately.` });
  }

  // Trend vs 6-month average
  if (avg6Exp > 0) {
    const diff = totalExpenses - avg6Exp;
    const pct  = Math.round(Math.abs(diff) / avg6Exp * 100);
    if (diff > avg6Exp * 0.1) {
      insights.push({ level:'warning', icon:'📊', title:'Expenses above your average',
        body:`This month's expenses are ${pct}% above your 6-month average (${aud(avg6Exp)}). The extra ${aud(diff)} could be a one-off — worth reviewing.` });
    } else if (diff < -avg6Exp * 0.08 && avg6Exp > 0) {
      insights.push({ level:'good',    icon:'📊', title:'Expenses below your average',
        body:`Nice — this month you spent ${pct}% less than your 6-month average. That's ${aud(Math.abs(diff))} extra in your pocket.` });
    }
  }

  // Top expense category
  if (sortedCats.length > 0) {
    const [topCat, topAmt] = sortedCats[0];
    const pct = totalExpenses > 0 ? Math.round(topAmt / totalExpenses * 100) : 0;
    if (pct > 45 && topCat !== 'Mortgage / Rent') {
      insights.push({ level:'warning', icon:'💸', title:`${topCat} is dominating your budget`,
        body:`${topCat} makes up ${pct}% of your total expenses (${aud(topAmt)}/month). Reducing this by 20% would save ${aud(topAmt * 0.2)}/month.` });
    }
  }

  // Dining Out
  const dining = byCategory['Dining Out'] || 0;
  if (dining > 0 && totalExpenses > 0 && dining / totalExpenses > 0.08) {
    insights.push({ level:'ok', icon:'🍽️', title:'Dining out is notable',
      body:`You're spending ${aud(dining)}/month dining out. Cooking at home 2–3 more times a week could save ${aud(dining * 0.35)}/month.` });
  }

  // Income diversity
  if (md.income.length === 1 && totalIncome > 0) {
    insights.push({ level:'info', icon:'💡', title:'Single income source',
      body:'You rely on one income stream. Even a small side income (freelance, rental, etc.) would significantly improve your financial resilience.' });
  }

  // Build costs buffer
  const contractPaid     = state.buildContract.stages.filter(s=>s.paid).reduce((s,x)=>s+x.amount,0);
  const contractRemaining= state.buildContract.total - contractPaid;
  if (contractRemaining > 0 && surplus > 0) {
    const monthsBuffer = Math.round(contractRemaining / surplus);
    insights.push({ level:'info', icon:'🏗️', title:'Build payments still ahead',
      body:`You have ${aud(contractRemaining)} left in contract payments. At your current savings rate that represents ${monthsBuffer} month${monthsBuffer !== 1 ? 's' : ''} of surplus — plan accordingly.` });
  }

  // Goals
  const activeGoals = (state.goals || []).filter(g => !g.achieved);
  if (activeGoals.length > 0 && surplus > 0) {
    insights.push({ level:'good', icon:'🎯', title:`${activeGoals.length} active goal${activeGoals.length > 1 ? 's' : ''}`,
      body:`Your ${aud(surplus)}/month surplus can work toward your goals. Review the Goals page to see progress and adjust contributions.` });
  }

  // Empty budget
  if (md.expenses.length === 0) {
    insights.push({ level:'info', icon:'📝', title:'Add your expenses',
      body:'Head to Monthly Budget and add your regular expenses to unlock personalised insights.' });
  }

  return insights;
}

export const PROXY_URL = 'https://home-finance-proxy.fuscocl.workers.dev';

export async function runAIInsights() {
  const btn = document.getElementById('ai-run-btn');
  btn.disabled = true;
  btn.textContent = 'Analysing…';

  const md           = window.getMonthData(window.selectedBudgetMonth);
  const totalIncome  = monthlyTotal(md.income);
  const totalExpenses= monthlyTotal(md.expenses);
  const surplus      = totalIncome - totalExpenses;
  const savingsRate  = totalIncome > 0 ? Math.round(surplus / totalIncome * 100) : 0;

  const byCategory = {};
  md.expenses.forEach(e => {
    byCategory[e.category || 'Other'] = (byCategory[e.category || 'Other'] || 0) + itemMonthly(e);
  });

  const last6 = window.getLast6Months().map(mo => {
    const m = window.getMonthData(mo);
    return { month: mo, income: monthlyTotal(m.income), expenses: monthlyTotal(m.expenses) };
  });

  const benchmarks = getBenchmarks(totalIncome, profileAdults(), profileChildren())
    .filter(b => byCategory[b.category] !== undefined)
    .map(b => ({
      category: b.category,
      yourSpend: Math.round(byCategory[b.category] || 0),
      benchmarkMin: Math.round(b.min),
      benchmarkMax: Math.round(b.max),
      benchmarkLabel: b.label,
      status: getBenchmarkStatus(byCategory[b.category] || 0, b.min, b.max)
    }));

  const budgetSummary = {
    month: window.monthLabel(window.selectedBudgetMonth),
    household: (function() {
      const hp = state.householdProfile || {};
      const members = (hp.members||[]);
      const adults = members.filter(m=>m.role==='adult');
      const children = members.filter(m=>m.role==='child');
      return {
        adults: adults.length || 2,
        children: children.length,
        totalPeople: members.length || 2,
        memberAges: members.map(m=>({ role:m.role, age:m.age })),
        pets: (hp.pets||[]).map(p=>p.type),
        cars: hp.cars||0
      };
    })(),
    monthlyIncome: totalIncome,
    monthlyExpenses: totalExpenses,
    surplus,
    savingsRatePct: savingsRate,
    expensesByCategory: byCategory,
    benchmarkComparisons: benchmarks,
    incomeStreams: md.income.map(i => ({ name: i.name, monthlyAmount: itemMonthly(i) })),
    last6MonthsTrend: last6,
    activeGoals: (state.goals || []).filter(g => !g.achieved).map(g => ({ name: g.name, type: g.type })),
    buildRemaining: state.buildContract.total - state.buildContract.stages.filter(s=>s.paid).reduce((s,x)=>s+x.amount,0),
    currency: 'AUD'
  };

  const prompt = `You are a friendly but direct personal finance advisor for an Australian family. Analyse their budget data and benchmark comparisons, then give 4-6 concise, specific, actionable insights.

Budget data for ${budgetSummary.month}:
${JSON.stringify(budgetSummary, null, 2)}

Focus especially on:
- Where their spending is above or below Australian household benchmarks for their household size
- How their 50/30/20 split compares to the ideal
- Specific opportunities to improve based on the benchmark data
- What they're doing well compared to benchmarks

Format your response as a JSON array of insight objects, each with:
- "title": short headline (max 8 words)
- "body": 1-2 sentences with specific numbers from the data
- "level": one of "good", "ok", "warning", "alert", "info"
- "icon": a single relevant emoji
- "action": one-line actionable recommendation (optional)

Reply with ONLY the JSON array, no other text.`;

  try {
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${res.status}`);
    }

    const data = await res.json();
    let text = data.content[0].text.trim();
    // Strip markdown code fences if present
    text = text.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/,'').trim();
    const aiInsights = JSON.parse(text);
    renderInsightCards(aiInsights, true);
  } catch(err) {
    let msg = err.message;
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('CORS')) {
      msg = `CORS blocked — the browser can't call the Anthropic API directly. We need a small proxy (Cloudflare Worker). Ask me to set it up — it takes 5 minutes and is free.`;
    }
    document.getElementById('ai-output').innerHTML = `
      <div style="padding:16px 20px;background:var(--danger-light);border-radius:8px;color:var(--danger);font-size:13px">
        <strong>Error:</strong> ${msg}
      </div>`;
  } finally {
    btn.disabled = false;
    btn.textContent = '✨ Generate AI Insights';
  }
}

export function renderInsightCards(insights, isAI) {
  const levelStyles = {
    good:    { bg:'#ecfeff', border:'#86efac', icon_bg:'#dcfce7', text:'#166534' },
    ok:      { bg:'#eff6ff', border:'#93c5fd', icon_bg:'#dbeafe', text:'#1e40af' },
    warning: { bg:'#fffbeb', border:'#fcd34d', icon_bg:'#fef3c7', text:'#92400e' },
    alert:   { bg:'#fef2f2', border:'#fca5a5', icon_bg:'#fee2e2', text:'#991b1b' },
    info:    { bg:'#f8fafc', border:'#cbd5e1', icon_bg:'#f1f5f9', text:'#475569' },
  };

  const html = insights.map(ins => {
    const s = levelStyles[ins.level] || levelStyles.info;
    return `
      <div style="background:${s.bg};border:1.5px solid ${s.border};border-radius:12px;padding:16px 18px;display:flex;gap:14px;align-items:flex-start">
        <div style="width:38px;height:38px;border-radius:10px;background:${s.icon_bg};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${ins.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:14px;color:${s.text};margin-bottom:4px">${escHtml(ins.title)}</div>
          <div style="font-size:13px;color:var(--text);line-height:1.5">${escHtml(ins.body)}</div>
          ${ins.action ? `<div style="margin-top:8px;font-size:12px;font-weight:600;color:${s.text}">→ ${escHtml(ins.action)}</div>` : ''}
        </div>
      </div>`;
  }).join('');

  document.getElementById('ai-output').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px">
      ${isAI ? `<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-muted);margin-bottom:4px"><span>✨</span> Generated by Claude AI · ${window.monthLabel(window.selectedBudgetMonth)}</div>` : ''}
      ${html}
    </div>`;
}

export function renderBenchmarksSection(income, adults, children, byCategory) {
  const benchmarks = getBenchmarks(income, adults, children);
  const people = adults + children;

  // 50/30/20 calculation
  const NEEDS_CATS  = ['Mortgage / Rent','Insurance','Utilities','Groceries','Transport','Health','Childcare / Education'];
  const WANTS_CATS  = ['Dining Out','Entertainment','Subscriptions','Clothing','Personal Care'];
  const SAVING_CATS = ['Savings / Investment'];

  const needsTotal   = Object.entries(byCategory).filter(([c]) => NEEDS_CATS.includes(c)).reduce((s,[,v]) => s+v, 0);
  const wantsTotal   = Object.entries(byCategory).filter(([c]) => WANTS_CATS.includes(c)).reduce((s,[,v]) => s+v, 0);
  const savingsTotal = Object.entries(byCategory).filter(([c]) => SAVING_CATS.includes(c)).reduce((s,[,v]) => s+v, 0);
  const needsPct   = income > 0 ? Math.round(needsTotal   / income * 100) : 0;
  const wantsPct   = income > 0 ? Math.round(wantsTotal   / income * 100) : 0;
  const savingsPct = income > 0 ? Math.round(savingsTotal / income * 100) : 0;

  function ruleBar(label, actual, target, color) {
    const pct = Math.min(actual, 100);
    const over = actual > target;
    return `
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
          <span style="font-weight:600">${label}</span>
          <span style="color:${over ? 'var(--danger)' : 'var(--success)'};font-weight:600">
            ${actual}% <span style="font-weight:400;color:var(--text-muted)">/ ${target}% target</span>
          </span>
        </div>
        <div style="height:8px;background:var(--surface2);border-radius:4px;overflow:hidden;position:relative">
          <div style="position:absolute;left:0;top:0;height:100%;width:${Math.min(target,100)}%;border-right:2px dashed #94a3b8;z-index:1"></div>
          <div style="height:100%;width:${pct}%;background:${over ? 'var(--danger)' : color};border-radius:4px;opacity:0.85;transition:width .3s"></div>
        </div>
      </div>`;
  }

  // Benchmark rows
  const rows = benchmarks.filter(b => byCategory[b.category] !== undefined || b.category === 'Savings / Investment').map(b => {
    const actual = byCategory[b.category] || 0;
    const status = getBenchmarkStatus(actual, b.min, b.max);
    const statusColor = status === 'under' ? '#3b82f6' : status === 'within' ? '#10b981' : '#ef4444';
    const statusLabel = status === 'under' ? 'Below avg' : status === 'within' ? 'On track' : 'Above avg';
    const barPct = b.max > 0 ? Math.min(actual / (b.max * 1.5) * 100, 100) : 0;
    const benchmarkPct = b.max > 0 ? Math.min(b.max / (b.max * 1.5) * 100, 100) : 0;
    const catColor = colors.expense[b.category] || '#94a3b8';
    return `
      <tr>
        <td style="border-left:3px solid ${catColor};font-weight:500">${b.category}</td>
        <td class="amount" style="font-weight:600">${actual > 0 ? aud(actual) : '<span style="color:var(--text-muted)">—</span>'}</td>
        <td style="color:var(--text-muted);font-size:12px">${b.label}</td>
        <td style="min-width:100px">
          <div style="position:relative;height:8px;background:var(--surface2);border-radius:4px;overflow:hidden">
            <div style="position:absolute;left:0;top:0;height:100%;width:${benchmarkPct.toFixed(1)}%;background:#e2e8f0;border-radius:4px"></div>
            ${actual > 0 ? `<div style="position:absolute;left:0;top:0;height:100%;width:${barPct.toFixed(1)}%;background:${statusColor};border-radius:4px;opacity:0.85"></div>` : ''}
          </div>
        </td>
        <td><span style="font-size:11px;padding:2px 7px;border-radius:99px;background:${statusColor}20;color:${statusColor};font-weight:600;white-space:nowrap">${statusLabel}</span></td>
        <td style="font-size:11px;color:var(--text-muted)">${b.source}</td>
      </tr>`;
  }).join('');

  return `
    <div class="section" style="margin-bottom:20px">
      <div class="section-header">
        <div>
          <div class="section-title">Budget Benchmarks</div>
          <div class="section-subtitle">Australian household averages for ${adults} adult${adults!==1?'s':''}${children > 0 ? ` + ${children} child${children!==1?'ren':''}` : ''} · Sources: ABS HES 2022, MoneySmart, ACCC</div>
        </div>
        <a href="/home-budget/#" onclick="activateTab('settings');return false"
           style="font-size:12px;color:var(--primary)">Edit household profile</a>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;padding:4px 20px 16px">
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">50/30/20 Rule</div>
          ${ruleBar('Needs (housing, food, transport…)', needsPct, 50, '#3b82f6')}
          ${ruleBar('Wants (dining, entertainment…)',    wantsPct, 30, '#f59e0b')}
          ${ruleBar('Savings / investments',             savingsPct, 20, '#10b981')}
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Dashed line = target. ${income === 0 ? 'Add income to activate.' : ''}</div>
        </div>
        <div style="font-size:12px;color:var(--text-muted)">
          <div style="font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px;color:var(--text-muted)">Your split vs 50/30/20</div>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            ${[
              { label:'Needs', pct:needsPct, target:50, amt:needsTotal, color:'#3b82f6' },
              { label:'Wants', pct:wantsPct, target:30, amt:wantsTotal, color:'#f59e0b' },
              { label:'Saving', pct:savingsPct, target:20, amt:savingsTotal, color:'#10b981' },
            ].map(r => `
              <div style="text-align:center;min-width:70px">
                <div style="font-size:22px;font-weight:800;color:${r.pct > r.target * 1.1 ? 'var(--danger)' : r.pct >= r.target * 0.8 ? r.color : 'var(--text-muted)'}">${r.pct}%</div>
                <div style="font-size:11px;font-weight:600;color:var(--text-muted)">${r.label}</div>
                <div style="font-size:11px;color:var(--text-muted)">${aud(r.amt)}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>

      ${rows ? `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Category</th><th class="amount">Your spend</th><th>Benchmark range</th><th>Bar</th><th>Status</th><th>Source</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>` : `<div style="padding:16px 20px;color:var(--text-muted);font-size:13px">Add expenses to see benchmark comparisons.</div>`}
    </div>`;
}

export function renderInsights() {
  const aiKey   = getAIKey();
  const smart   = generateSmartInsights();
  const md      = window.getMonthData(window.selectedBudgetMonth);
  const income  = monthlyTotal(md.income);
  const exp     = monthlyTotal(md.expenses);
  const surplus = income - exp;
  const rate    = income > 0 ? Math.round(surplus / income * 100) : 0;
  const adults   = profileAdults();
  const children = profileChildren();

  const byCategory = {};
  md.expenses.forEach(e => {
    const cat = e.category || 'Other';
    byCategory[cat] = (byCategory[cat] || 0) + itemMonthly(e);
  });

  // Health score
  let score = 0;
  if (rate >= 20) score += 40; else if (rate >= 10) score += 28; else if (rate > 0) score += 14;
  if (md.income.length > 1) score += 10;
  if ((state.goals || []).some(g => !g.achieved)) score += 15;
  const contractPaid = state.buildContract.stages.filter(s=>s.paid).reduce((s,x)=>s+x.amount,0);
  if (contractPaid > 0) score += 10;
  if (exp > 0 && exp < income) score += 25;
  const scoreColor = score >= 70 ? '#10b981' : score >= 45 ? '#f59e0b' : '#ef4444';
  const scoreLabel = score >= 70 ? 'Great shape' : score >= 45 ? 'On track' : 'Needs attention';

  document.getElementById('insights-content').innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap">
      <button class="btn btn-sm" onclick="prevInsightsMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${window.monthLabel(window.selectedBudgetMonth)}</span>
      <button class="btn btn-sm" onclick="nextInsightsMonth()" style="font-size:16px;padding:2px 10px">›</button>
    </div>

    <div class="cards" style="margin-bottom:24px">
      <div class="card" style="border-top:3px solid ${scoreColor}">
        <div class="card-label">Financial Health</div>
        <div class="card-value" style="color:${scoreColor}">${score}/100</div>
        <div class="card-sub">${scoreLabel}</div>
      </div>
      <div class="card">
        <div class="card-label">Savings Rate</div>
        <div class="card-value ${rate >= 20 ? 'green' : rate >= 10 ? 'orange' : 'red'}">${rate}%</div>
        <div class="card-sub">${aud(Math.max(surplus,0))}/month saved</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Surplus</div>
        <div class="card-value ${surplus >= 0 ? 'green' : 'red'}">${aud(Math.abs(surplus))}</div>
        <div class="card-sub">${surplus >= 0 ? 'available' : 'overspending'}</div>
      </div>
      <div class="card">
        <div class="card-label">Income / Expenses</div>
        <div class="card-value">${aud(income)}</div>
        <div class="card-sub">vs ${aud(exp)} out</div>
      </div>
    </div>

    ${renderBenchmarksSection(income, adults, children, byCategory)}

    ${renderSpendingPatterns()}

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;margin-top:4px">

      <!-- Smart insights -->
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">💡 Budget Health</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${generateSmartInsightsHTML(smart)}
        </div>
      </div>

      <!-- AI insights panel -->
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">✨ AI Insights (Claude)</div>
        <div style="margin-bottom:12px">
          <button class="btn btn-primary" id="ai-run-btn" onclick="runAIInsights()" style="width:100%;justify-content:center">✨ Generate AI Insights</button>
        </div>
        <div id="ai-output">
          <div style="padding:32px 20px;text-align:center;color:var(--text-muted);font-size:13px;background:var(--surface2);border-radius:12px;border:1.5px dashed var(--border)">
            Click Generate to get personalised AI insights from Claude.
          </div>
        </div>
      </div>

    </div>
  `;
}

export function generateSmartInsightsHTML(insights) {
  const levelStyles = {
    good:    { bg:'#ecfeff', border:'#86efac', text:'#166534' },
    ok:      { bg:'#eff6ff', border:'#93c5fd', text:'#1e40af' },
    warning: { bg:'#fffbeb', border:'#fcd34d', text:'#92400e' },
    alert:   { bg:'#fef2f2', border:'#fca5a5', text:'#991b1b' },
    info:    { bg:'#f8fafc', border:'#cbd5e1', text:'#475569' },
  };
  return insights.map(ins => {
    const s = levelStyles[ins.level] || levelStyles.info;
    return `
      <div style="background:${s.bg};border:1.5px solid ${s.border};border-radius:10px;padding:14px 16px;display:flex;gap:12px;align-items:flex-start">
        <span style="font-size:20px;flex-shrink:0;line-height:1.3">${ins.icon}</span>
        <div>
          <div style="font-weight:700;font-size:13px;color:${s.text};margin-bottom:3px">${escHtml(ins.title)}</div>
          <div style="font-size:12px;color:var(--text);line-height:1.5">${escHtml(ins.body)}</div>
        </div>
      </div>`;
  }).join('');
}

export function prevInsightsMonth() {
  const [y, m] = window.selectedBudgetMonth.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  window.selectedBudgetMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  window.safeRender(renderInsights);
  window.safeRender(renderMoneyDashboard);
  window.safeRender(renderBudget);
}

export function nextInsightsMonth() {
  const [y, m] = window.selectedBudgetMonth.split('-').map(Number);
  const d = new Date(y, m, 1);
  window.selectedBudgetMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  window.safeRender(renderInsights);
  window.safeRender(renderMoneyDashboard);
  window.safeRender(renderBudget);
}

// ─── Category Group management ────────────────────

export const GROUP_ICONS = [
  '🏠','🏡','🏗️','🔑','💡','🔌','🚿','🛋️','🛏️','🪴',
  '🍽️','🍕','🍔','🛒','🥗','🍷','☕','🍰','🥩','🧃',
  '🚗','🚙','🚌','✈️','⛽','🚕','🏎️','🚲','🛵','🚂',
  '👨‍👩‍👧','👶','📚','🏫','💊','🏥','💅','💆','🧴','👕',
  '🎮','🎬','🎵','🏋️','📺','🎲','🏄','🎯','🎨','🎭',
  '💰','💳','🏦','📈','💸','🪙','💎','📊','🏆','💼',
  '📦','🛍️','🎁','🔧','🛠️','📱','💻','🧹','🧺','🖨️',
  '🐕','🐈','🐠','🌱','☀️','❄️','🎄','🎂','⚽','🧸',
];

export function openEmojiPickerModal(currentIcon, onSelect) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9999;display:flex;align-items:center;justify-content:center';
  overlay.innerHTML = `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;width:340px;max-width:95vw;box-shadow:0 8px 32px rgba(0,0,0,0.35)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <span style="font-weight:700;font-size:15px">Choose Icon</span>
        <button id="emoji-picker-close" style="background:none;border:none;cursor:pointer;font-size:20px;color:var(--text-muted);line-height:1">&times;</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:4px;max-height:220px;overflow-y:auto">
        ${GROUP_ICONS.map(e => `
          <button data-emoji="${e}" style="font-size:20px;width:100%;aspect-ratio:1;border:2px solid ${e===currentIcon?'var(--primary)':'transparent'};border-radius:6px;cursor:pointer;background:${e===currentIcon?'var(--primary)22':'transparent'};transition:background .1s" title="${e}">${e}</button>
        `).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#emoji-picker-close').onclick = () => document.body.removeChild(overlay);
  overlay.querySelectorAll('[data-emoji]').forEach(btn => {
    btn.onclick = () => {
      onSelect(btn.dataset.emoji);
      document.body.removeChild(overlay);
    };
  });
  overlay.addEventListener('click', e => { if (e.target === overlay) document.body.removeChild(overlay); });
}

export function openAddCategoryGroup() {
  window.openModal('Add Category Group', `
    <div class="form-row">
      <div class="form-group" style="flex:0 0 auto">
        <label class="form-label">Icon</label>
        <button type="button" id="f-grp-icon-btn" style="width:56px;height:44px;font-size:24px;border:1px solid var(--border);border-radius:6px;background:var(--surface2);cursor:pointer" title="Choose icon">📦</button>
        <input type="hidden" id="f-grp-icon" value="📦">
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">Group Name</label>
        <input class="form-input" id="f-grp-name" type="text" maxlength="200" placeholder="e.g. Housing">
      </div>
    </div>
  `, () => {
    const icon = document.getElementById('f-grp-icon').value || '📦';
    const name = document.getElementById('f-grp-name').value.trim();
    if (!name) return;
    const id = nextId(state.categoryGroups);
    state.categoryGroups.push({ id, name, icon, categories: [] });
    window.logActivity('Added category group', name);
    window.saveData(state); window.closeModal(); renderSettings();
  });
  // Wire up icon picker after modal renders
  document.getElementById('f-grp-icon-btn').addEventListener('click', () => {
    const current = document.getElementById('f-grp-icon').value;
    openEmojiPickerModal(current, emoji => {
      document.getElementById('f-grp-icon').value = emoji;
      document.getElementById('f-grp-icon-btn').textContent = emoji;
    });
  });
}

export function openIconPickerForGroup(groupId) {
  const g = state.categoryGroups.find(x => x.id === groupId);
  if (!g) return;
  openEmojiPickerModal(g.icon, emoji => {
    updateCategoryGroup(groupId, 'icon', emoji);
    const btn = document.getElementById(`grp-icon-btn-${groupId}`);
    if (btn) btn.textContent = emoji;
  });
}

export function deleteCategoryGroup(id) {
  const g = state.categoryGroups.find(x => x.id === id);
  if (!confirm(`Delete group "${g ? g.name : ''}"? Categories will become unassigned.`)) return;
  state.categoryGroups = state.categoryGroups.filter(x => x.id !== id);
  window.logActivity('Deleted category group', g ? g.name : '');
  window.saveData(state); renderSettings();
}

export function updateCategoryGroup(id, field, value) {
  const g = state.categoryGroups.find(x => x.id === id);
  if (!g) return;
  g[field] = value;
  window.saveData(state);
}

export function addCatToGroup(groupId, cat) {
  if (!cat) return;
  // Add to master list if it's a new category
  if (!expenseCategories().includes(cat)) {
    if (!state.expenseCategories) state.expenseCategories = expenseCategories().slice();
    state.expenseCategories.push(cat);
  }
  // Remove from any other group first
  state.categoryGroups.forEach(g => { g.categories = g.categories.filter(c => c !== cat); });
  const g = state.categoryGroups.find(x => x.id === groupId);
  if (g) g.categories.push(cat);
  window.saveData(state); renderSettings();
}

export function openAddCatToGroup(groupId) {
  const allCats = expenseCategories();
  const assignedElsewhere = new Set((state.categoryGroups||[]).filter(x=>x.id!==groupId).flatMap(x=>x.categories));
  const grp = state.categoryGroups.find(x => x.id === groupId);
  const alreadyIn = new Set(grp ? grp.categories : []);
  const available = allCats.filter(c => !alreadyIn.has(c) && !assignedElsewhere.has(c));

  window.openModal('Add Category to Group', `
    ${available.length > 0 ? `
    <div class="form-group" style="margin-bottom:16px">
      <label class="form-label">Pick an existing category</label>
      <div style="display:flex;flex-wrap:wrap;gap:6px" id="cat-pick-list">
        ${available.map(c => `
          <button type="button" onclick="
            document.querySelectorAll('#cat-pick-list button').forEach(b=>b.style.background='');
            this.style.background='var(--primary)22';this.style.borderColor='var(--primary)';
            document.getElementById('f-cat-new').value='';
            document.getElementById('f-cat-selected').value=this.dataset.cat
          " data-cat="${c.replace(/"/g,'&quot;')}" style="padding:5px 12px;border:1px solid var(--border);border-radius:20px;background:var(--surface2);font-size:13px;cursor:pointer">${c}</button>
        `).join('')}
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="flex:1;height:1px;background:var(--border)"></div>
      <span style="font-size:12px;color:var(--text-muted)">or create new</span>
      <div style="flex:1;height:1px;background:var(--border)"></div>
    </div>
    ` : `<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">All existing categories are already assigned. Create a new one below.</p>`}
    <div class="form-group">
      <label class="form-label">New category name</label>
      <input class="form-input" id="f-cat-new" type="text" maxlength="200" placeholder="e.g. Pet Care" oninput="
        if(this.value.trim()){
          document.querySelectorAll('#cat-pick-list button').forEach(b=>b.style.background='');
          document.getElementById('f-cat-selected').value='';
        }
      ">
    </div>
    <input type="hidden" id="f-cat-selected" value="">
  `, () => {
    const selected = document.getElementById('f-cat-selected').value;
    const newName  = document.getElementById('f-cat-new').value.trim();
    const cat = newName || selected;
    if (!cat) return;
    addCatToGroup(groupId, cat);
    window.closeModal();
  });
}

export function removeCatFromGroup(groupId, cat) {
  const g = state.categoryGroups.find(x => x.id === groupId);
  if (!g) return;
  g.categories = g.categories.filter(c => c !== cat);
  window.saveData(state); renderSettings();
}

// ─────────────────────────────────────────────────

export let _settingsDirty = false;
export let _settingsSnapshot = null;

export function _markSettingsDirty() {
  if (!_settingsDirty) {
    // Take snapshot on first change so we can revert
    _settingsSnapshot = JSON.parse(JSON.stringify(state));
  }
  _settingsDirty = true;
  const bar = document.getElementById('settings-save-bar');
  if (bar) bar.style.display = 'flex';
}

export function saveSettingsChanges() {
  _settingsDirty = false;
  _settingsSnapshot = null;
  window.saveData(state);
  const bar = document.getElementById('settings-save-bar');
  if (bar) bar.style.display = 'none';
  // Brief confirmation
  const btn = document.getElementById('settings-save-btn');
  if (btn) { const orig = btn.textContent; btn.textContent = 'Saved'; btn.style.background = '#10b981'; setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1500); }
  window.renderAll();
}

export function cancelSettingsChanges() {
  if (_settingsSnapshot) {
    // Restore state from snapshot
    Object.assign(state, _settingsSnapshot);
  }
  _settingsDirty = false;
  _settingsSnapshot = null;
  const bar = document.getElementById('settings-save-bar');
  if (bar) bar.style.display = 'none';
  renderSettings();
}

export function _checkSettingsUnsaved(targetTab) {
  if (_settingsDirty) {
    if (confirm('You have unsaved changes in Settings. Save before leaving?')) {
      saveSettingsChanges();
    } else {
      cancelSettingsChanges();
    }
  }
}

export function updateSetting(key, value) {
  if (!state.settings) state.settings = {};
  state.settings[key] = value;
  _markSettingsDirty();
}

export function saveApiKey() {
  const val = document.getElementById('settings-api-key')?.value.trim();
  if (!val) return;
  prefsSet('toto_ai_key', val);
  prefsSet('toto_ai_key_meta', JSON.stringify({ addedAt: new Date().toISOString(), prefix: val.slice(0, 10), suffix: val.slice(-4) }));
  const status = document.getElementById('api-key-status');
  if (status) { status.textContent = '✓ Key saved!'; status.style.color = 'var(--success)'; setTimeout(() => { status.textContent = ''; status.style.color = ''; }, 2000); }
  // Refresh the summary card
  const card = document.getElementById('api-key-summary');
  if (card) card.outerHTML = _renderApiKeySummary();
}

export function removeApiKey() {
  if (!confirm('Remove saved API key? Toto and cost estimation will stop working.')) return;
  prefsClear('toto_ai_key');
  prefsClear('toto_ai_key_meta');
  renderSettings();
}

export function _renderApiKeySummary() {
  const key = prefsGet('toto_ai_key');
  if (!key) return '<div id="api-key-summary"></div>';
  const meta = JSON.parse(prefsGet('toto_ai_key_meta') || '{}');
  const added = meta.addedAt ? new Date(meta.addedAt).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' }) : 'Unknown date';
  const masked = meta.prefix ? `${meta.prefix}${'•'.repeat(20)}${meta.suffix}` : `${key.slice(0,10)}${'•'.repeat(20)}${key.slice(-4)}`;
  return `
    <div id="api-key-summary" style="margin-top:14px;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;display:flex;align-items:center;gap:14px;max-width:480px">
      <div style="font-size:24px">🔑</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px">Active Key</div>
        <div style="font-size:13px;font-family:monospace;color:var(--text);word-break:break-all">${masked}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Added ${added} · Powers Toto chat, event cost estimation &amp; CSV import</div>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="removeApiKey()" style="color:var(--danger);flex-shrink:0">Remove</button>
    </div>`;
}

export function toggleSettingsSection(key) {
  const body = document.getElementById(`sacc-body-${key}`);
  const chev = document.getElementById(`sacc-chev-${key}`);
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  if (chev) chev.textContent = isOpen ? '▼' : '▲';
  if (isOpen) _settingsOpen.delete(key); else _settingsOpen.add(key);
}

export function clearActivityLog() {
  if (!confirm('Clear the entire activity log? This cannot be undone.')) return;
  state.activityLog = [];
  window.saveData(state);
  renderSettings();
}

export function addCategory(type) {
  const input = document.getElementById(`new-cat-${type}`);
  const name = (input.value || '').trim();
  if (!name) { input.focus(); return; }
  const list = type === 'expense' ? state.expenseCategories : state.incomeCategories;
  if (list.includes(name)) { alert('That category already exists.'); return; }
  list.push(name);
  window.logActivity(`Added ${type} category`, name);
  _markSettingsDirty();
  input.value = '';
  renderSettings();
}

export function removeCategory(type, name) {
  const list = type === 'expense' ? state.expenseCategories : state.incomeCategories;
  const inUse = type === 'expense'
    ? state.budget.expenses.some(e => e.category === name) ||
      Object.values(state.budget.months || {}).some(m => (m.expenses||[]).some(e => e.category === name))
    : false;
  if (inUse) {
    if (!confirm(`"${name}" is used by existing expenses. Remove anyway?`)) return;
  }
  const idx = list.indexOf(name);
  if (idx !== -1) list.splice(idx, 1);
  window.logActivity(`Removed ${type} category`, name);
  _markSettingsDirty();
  renderSettings();
}

// → src/sections/settings.js

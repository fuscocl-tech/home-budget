// Dev tools — fixture loading and state reset (not shipped in production)
import { state } from '../store.js';

// DEV TOOLS
// ─────────────────────────────────────────────────────────────────────────

export function _devToolsOpen() {
  const overlay = document.getElementById('dev-tools-overlay');
  const sheet   = document.getElementById('dev-tools-sheet');
  const body    = document.getElementById('dev-tools-body');
  if (!overlay || !sheet) return;

  const today = new Date().toISOString().slice(0,10);
  const tomorrow = new Date(Date.now()+86400000).toISOString().slice(0,10);
  const in3 = new Date(Date.now()+3*86400000).toISOString().slice(0,10);
  const in7 = new Date(Date.now()+7*86400000).toISOString().slice(0,10);
  const prevMo = new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().slice(0,7);
  const curMo  = today.slice(0,7);

  const sections = [
    {
      label: '💰 Wallet — full budget',
      desc: 'Income, expenses, actuals, bills, goals, net worth',
      fn: '_devLoadWallet'
    },
    {
      label: '👨‍👩‍👧 Kids zone',
      desc: 'Two kids, chores, prizes, completions, redemptions',
      fn: '_devLoadKids'
    },
    {
      label: '📋 Routines',
      desc: 'Morning & evening routines with steps, assigned to kids',
      fn: '_devLoadRoutines'
    },
    {
      label: '📅 Planner & events',
      desc: 'Events today, tomorrow, this week, recurring',
      fn: '_devLoadPlanner'
    },
    {
      label: '🏠 Home — docs, vehicles, maintenance',
      desc: 'Documents expiring, vehicle rego, maintenance tasks',
      fn: '_devLoadHome'
    },
    {
      label: '🍽 Meals & lunchbox',
      desc: 'This week\'s meal plan + kids lunchbox entries',
      fn: '_devLoadMeals'
    },
    {
      label: '🌟 Load everything',
      desc: 'All of the above in one shot',
      fn: '_devLoadAll',
      primary: true
    },
    {
      label: '🗑 Reset to empty',
      desc: 'Clears all state back to defaults',
      fn: '_devReset',
      danger: true
    }
  ];

  body.innerHTML = sections.map(s => `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--hairline-soft)">
      <div>
        <div style="font-size:14px;font-weight:600;color:var(--ink)">${s.label}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px;font-family:var(--mono)">${s.desc}</div>
      </div>
      <button onclick="${s.fn}();_devToolsClose()" style="
        padding:8px 16px;border-radius:99px;border:none;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;
        background:${s.danger?'var(--alert-soft)':s.primary?'var(--ink)':'var(--purple-soft)'};
        color:${s.danger?'var(--alert)':s.primary?'#fff':'var(--purple)'};
      ">Load</button>
    </div>`).join('') +
    `<div style="margin-top:16px;padding:12px;background:var(--hairline-soft);border-radius:12px">
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Current state</div>
      <div style="font-family:var(--mono);font-size:11px;color:var(--ink-soft);line-height:1.8">
        Bills: ${(state.bills||[]).length} ·
        Budget items: ${(state.budget?.expenses||[]).length} ·
        Goals: ${(state.goals||[]).length} ·
        Kids: ${(state.kids?.profiles||[]).length} ·
        Routines: ${(state.routines||[]).length} ·
        Events: ${(state.planner?.events||[]).length}
      </div>
    </div>`;

  overlay.style.display = 'block';
  sheet.style.display = 'block';
}

export function _devToolsClose() {
  document.getElementById('dev-tools-overlay').style.display = 'none';
  document.getElementById('dev-tools-sheet').style.display = 'none';
}

export function _devLoadWallet() {
  const curMo = new Date().toISOString().slice(0,7);
  const prevMo = new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().slice(0,7);
  state.budget.income = [
    { id: uid(), name: 'Salary', category: 'Salary', amount: 8500, frequency: 'monthly' },
    { id: uid(), name: 'Freelance', category: 'Freelance / Contract', amount: 1200, frequency: 'monthly' },
  ];
  state.budget.expenses = [
    { id: uid(), name: 'Mortgage', category: 'Mortgage / Rent', amount: 2800, frequency: 'monthly' },
    { id: uid(), name: 'Groceries', category: 'Groceries', amount: 900, frequency: 'monthly' },
    { id: uid(), name: 'Electricity', category: 'Utilities', amount: 220, frequency: 'monthly' },
    { id: uid(), name: 'Internet', category: 'Utilities', amount: 89, frequency: 'monthly' },
    { id: uid(), name: 'Car insurance', category: 'Insurance', amount: 180, frequency: 'monthly' },
    { id: uid(), name: 'Dining out', category: 'Dining Out', amount: 350, frequency: 'monthly' },
    { id: uid(), name: 'Netflix', category: 'Subscriptions', amount: 23, frequency: 'monthly' },
    { id: uid(), name: 'Spotify', category: 'Subscriptions', amount: 12, frequency: 'monthly' },
    { id: uid(), name: 'Gym', category: 'Health', amount: 75, frequency: 'monthly' },
    { id: uid(), name: 'Kids activities', category: 'Childcare / Education', amount: 280, frequency: 'monthly' },
  ];
  // Actuals — partially spent this month
  const actuals = {};
  state.budget.expenses.forEach(e => { actuals[e.id] = Math.round(parseFloat(e.amount) * (0.4 + Math.random() * 0.7)); });
  state.budget.actuals[curMo] = actuals;

  const _bd = (offsetDays) => { const d = new Date(); d.setDate(d.getDate() + offsetDays); return d.getDate(); };
  const _bm = (offsetDays) => { const d = new Date(); d.setDate(d.getDate() + offsetDays); return d.getMonth() + 1; };
  state.bills = [
    { id: uid(), name: 'Electricity', amount: 180, dueDay: _bd(0), dueMonth: _bm(0), category: 'Utilities' },
    { id: uid(), name: 'Council rates', amount: 420, dueDay: _bd(1), dueMonth: _bm(1), category: 'Other' },
    { id: uid(), name: 'Phone plan', amount: 45, dueDay: _bd(2), dueMonth: _bm(2), category: 'Utilities' },
    { id: uid(), name: 'Water bill', amount: 185, dueDay: _bd(4), dueMonth: _bm(4), category: 'Utilities' },
    { id: uid(), name: 'Internet', amount: 89, dueDay: _bd(5), dueMonth: _bm(5), category: 'Utilities' },
    { id: uid(), name: 'Spotify', amount: 12, dueDay: _bd(6), dueMonth: _bm(6), category: 'Subscriptions' },
    { id: uid(), name: 'Home insurance', amount: 290, dueDay: _bd(14), dueMonth: _bm(14), category: 'Insurance' },
  ];
  state.goals = [
    { id: uid(), name: 'Emergency fund', type: 'emergency', targetAmount: 25000, currentAmount: 11200, deadline: '' },
    { id: uid(), name: 'Europe holiday', type: 'holiday', targetAmount: 8000, currentAmount: 2400, deadline: '2026-12-01' },
    { id: uid(), name: 'New car', type: 'vehicle', targetAmount: 35000, currentAmount: 7800, deadline: '2027-06-01' },
  ];
  state.netWorth = {
    assets: [
      { id: uid(), name: 'Home', category: 'Property', amount: 850000 },
      { id: uid(), name: 'Super', category: 'Super', amount: 142000 },
      { id: uid(), name: 'Savings', category: 'Savings', amount: 28000 },
      { id: uid(), name: 'Car', category: 'Vehicle', amount: 22000 },
    ],
    liabilities: [
      { id: uid(), name: 'Mortgage', category: 'Mortgage', amount: 520000 },
      { id: uid(), name: 'Car loan', category: 'Loan', amount: 12000 },
    ],
    snapshots: [],
    target: { amount: 1500000, byYear: 2040 }
  };
  state.settings = { ...state.settings, adultName: 'Robert Gentilcore', householdName: 'Gentilcore Family' };
  window.saveData(state); window.renderAll();
}

export function _devLoadKids() {
  const todayKey = _routineTodayKey();
  const kid1id = uid(); const kid2id = uid();
  const chore1 = uid(); const chore2 = uid(); const chore3 = uid();
  const prize1 = uid(); const prize2 = uid();
  state.kids = {
    profiles: [
      { id: kid1id, name: 'Amy', emoji: '🌸', dob: '2015-03-14', pinHash: null },
      { id: kid2id, name: 'Johnny', emoji: '⚡', dob: '2013-07-22', pinHash: null },
    ],
    chores: [
      { id: chore1, name: 'Make bed', emoji: '🛏️', assignedTo: kid1id, points: 5, frequency: 'Daily' },
      { id: chore2, name: 'Tidy room', emoji: '🧹', assignedTo: kid1id, points: 10, frequency: 'Daily' },
      { id: chore3, name: 'Take out bins', emoji: '🗑️', assignedTo: kid2id, points: 15, frequency: 'Weekly' },
    ],
    prizes: [
      { id: prize1, name: 'Extra screen time', emoji: '📱', pointCost: 30 },
      { id: prize2, name: 'Movie night pick', emoji: '🎬', pointCost: 50 },
      { id: uid(), name: 'Takeaway dinner choice', emoji: '🍕', pointCost: 80 },
    ],
    completions: [
      { id: uid(), kidId: kid1id, choreId: chore1, status: 'approved', ts: new Date().toISOString(), completedAt: new Date().toISOString() },
      { id: uid(), kidId: kid1id, choreId: chore2, status: 'pending', ts: new Date().toISOString() },
      { id: uid(), kidId: kid2id, choreId: chore3, status: 'approved', ts: new Date().toISOString(), completedAt: new Date().toISOString() },
    ],
    redemptions: [
      { id: uid(), kidId: kid1id, prizeId: prize1, status: 'pending', ts: new Date().toISOString() },
    ],
    notifications: [],
    allowances: [],
  };
  state.childEvents = [
    { id: uid(), title: 'Soccer training', emoji: '⚽', date: new Date().toISOString().slice(0,10), time: '17:00', assignedTo: [kid2id], isHouseholdWide: false, createdBy: 'dev' },
    { id: uid(), title: 'Piano lesson', emoji: '🎹', date: new Date(Date.now()+86400000).toISOString().slice(0,10), time: '15:30', assignedTo: [kid1id], isHouseholdWide: false, createdBy: 'dev' },
    { id: uid(), title: 'Family dinner', emoji: '🍽️', date: new Date(Date.now()+2*86400000).toISOString().slice(0,10), time: '19:00', assignedTo: [], isHouseholdWide: true, createdBy: 'dev' },
  ];
  window.saveData(state); window.renderAll();
}

export function _devLoadRoutines() {
  const todayKey = _routineTodayKey();
  const kid1 = state.kids?.profiles?.[0];
  const kid2 = state.kids?.profiles?.[1];
  const morningSteps = [
    { id: uid(), label: 'Make bed', emoji: '🛏️', points: 5, durationMin: 2 },
    { id: uid(), label: 'Shower', emoji: '🚿', points: 5, durationMin: 10 },
    { id: uid(), label: 'Breakfast', emoji: '🥣', points: 5, durationMin: 15 },
    { id: uid(), label: 'Pack bag', emoji: '🎒', points: 5, durationMin: 5 },
  ];
  const eveningSteps = [
    { id: uid(), label: 'Homework', emoji: '📚', points: 10, durationMin: 30 },
    { id: uid(), label: 'Tidy room', emoji: '🧹', points: 5, durationMin: 10 },
    { id: uid(), label: 'Brush teeth', emoji: '🦷', points: 5, durationMin: 3 },
  ];
  const adultMorning = [
    { id: uid(), label: 'Exercise', emoji: '💪', points: 0, durationMin: 30 },
    { id: uid(), label: 'Meditate', emoji: '🧘', points: 0, durationMin: 10 },
    { id: uid(), label: 'Plan the day', emoji: '📋', points: 0, durationMin: 5 },
    { id: uid(), label: 'Vitamins', emoji: '💊', points: 0, durationMin: 1 },
  ];
  const adultEvening = [
    { id: uid(), label: 'Tidy kitchen', emoji: '🍽️', points: 0, durationMin: 10 },
    { id: uid(), label: 'Review the day', emoji: '🪞', points: 0, durationMin: 5 },
    { id: uid(), label: 'Read', emoji: '📖', points: 0, durationMin: 20 },
    { id: uid(), label: 'Lights out', emoji: '💤', points: 0, durationMin: 0 },
  ];
  const hour = new Date().getHours();
  const r1id = uid(); const r2id = uid(); const r3id = uid(); const r4id = uid();
  const routines = [
    { id: r1id, name: 'Morning', emoji: '☀️', ownerType: 'adult', ownerId: 'dev', sharedWith: [], steps: adultMorning, pointsPerCompletion: 0, triggerTime: '07:00', recurrence: { type:'weekdays', startDate:'2026-01-01' }, skippedDates: [], pausePeriods: [], completions: {} },
    { id: r2id, name: 'Evening', emoji: '🌙', ownerType: 'adult', ownerId: 'dev', sharedWith: [], steps: adultEvening, pointsPerCompletion: 0, triggerTime: `${String(hour).padStart(2,'0')}:00`, recurrence: { type:'daily', startDate:'2026-01-01' }, skippedDates: [], pausePeriods: [], completions: {} },
    { id: r3id, name: 'Morning routine', emoji: '🌤️', ownerType: 'household', ownerId: 'dev', sharedWith: [], steps: morningSteps, pointsPerCompletion: 10, triggerTime: '07:30', recurrence: { type:'weekdays', startDate:'2026-01-01' }, skippedDates: [], pausePeriods: [] },
    { id: r4id, name: 'Evening routine', emoji: '🌙', ownerType: 'household', ownerId: 'dev', sharedWith: [], steps: eveningSteps, pointsPerCompletion: 10, triggerTime: `${String(hour).padStart(2,'0')}:00`, recurrence: { type:'daily', startDate:'2026-01-01' }, skippedDates: [], pausePeriods: [] },
  ];
  state.routines = [...(state.routines||[]).filter(r=>r.ownerType!=='adult'&&r.ownerType!=='household'), ...routines];
  // Assignments for kids
  const assignments = [];
  if (kid1) {
    const a = { id: uid(), routineId: r3id, childId: kid1.id, completionState: {} };
    a.completionState[todayKey] = [morningSteps[0].id, morningSteps[1].id]; // 2 done
    assignments.push(a);
    assignments.push({ id: uid(), routineId: r4id, childId: kid1.id, completionState: {} });
  }
  if (kid2) {
    assignments.push({ id: uid(), routineId: r3id, childId: kid2.id, completionState: {} });
    assignments.push({ id: uid(), routineId: r4id, childId: kid2.id, completionState: {} });
  }
  state.routineAssignments = [...(state.routineAssignments||[]), ...assignments];
  // Partial adult morning completion
  const morningRoutine = routines[0];
  morningRoutine.completions[todayKey] = [adultMorning[0].id, adultMorning[1].id];
  window.saveData(state); window.renderAll();
}

export function _devLoadPlanner() {
  const today = new Date().toISOString().slice(0,10);
  const tomorrow = new Date(Date.now()+86400000).toISOString().slice(0,10);
  const in3 = new Date(Date.now()+3*86400000).toISOString().slice(0,10);
  const in5 = new Date(Date.now()+5*86400000).toISOString().slice(0,10);
  const in7 = new Date(Date.now()+7*86400000).toISOString().slice(0,10);
  const members = _plannerMembers();
  const m1 = members[0]?.id || 'everyone';
  const m2 = members[1]?.id || m1;
  state.planner = { events: [
    { id: uid(), title: 'School drop-off', category: 'family', date: today, time: '08:30', memberIds: [m1], allDay: false, recurrence: { type:'weekdays', startDate:'2026-01-01' } },
    { id: uid(), title: 'Team standup', category: 'work', date: today, time: '09:00', memberIds: [m1], allDay: false },
    { id: uid(), title: 'Dentist appointment', category: 'health', date: today, time: '14:00', memberIds: [m1], allDay: false },
    { id: uid(), title: 'Dinner reservation', category: 'social', date: today, time: '19:30', memberIds: ['everyone'], allDay: false },
    { id: uid(), title: 'Parent–teacher night', category: 'family', date: tomorrow, time: '18:00', memberIds: [m1, m2], allDay: false },
    { id: uid(), title: 'Grocery run', category: 'family', date: tomorrow, time: '10:00', memberIds: [m1], allDay: false },
    { id: uid(), title: 'Weekend hike', category: 'social', date: in3, time: '08:00', memberIds: ['everyone'], allDay: false },
    { id: uid(), title: 'Car service', category: 'home', date: in5, time: '09:00', memberIds: [m1], allDay: false },
    { id: uid(), title: "Amy's birthday", category: 'family', date: in7, allDay: true, memberIds: ['everyone'] },
  ]};
  window.saveData(state); window.renderAll();
}

export function _devLoadHome() {
  const today = new Date().toISOString().slice(0,10);
  const in14 = new Date(Date.now()+14*86400000).toISOString().slice(0,10);
  const in60 = new Date(Date.now()+60*86400000).toISOString().slice(0,10);
  const past7  = new Date(Date.now()-7*86400000).toISOString().slice(0,10);
  const past30 = new Date(Date.now()-30*86400000).toISOString().slice(0,10);
  const past90 = new Date(Date.now()-90*86400000).toISOString().slice(0,10);
  state.documents = [
    { id: uid(), name: 'Passport — Robert', provider: 'DFAT', expiryDate: in14 },
    { id: uid(), name: 'Home insurance', provider: 'NRMA', expiryDate: in60 },
    { id: uid(), name: 'Working with children check', provider: 'Service NSW', expiryDate: past30 },
    { id: uid(), name: 'First aid certificate', provider: 'St John', expiryDate: past7 },
  ];
  state.vehicles = [
    { id: uid(), name: 'Tesla Model 3', make: 'Tesla', model: 'Model 3', plate: 'ABC123', regoExpiry: in60, insurance: { provider: 'NRMA', renewalDate: in60 } },
    { id: uid(), name: 'Toyota RAV4', make: 'Toyota', model: 'RAV4', plate: 'XYZ789', regoExpiry: past7, insurance: { provider: 'AAMI', renewalDate: in60 } },
  ];
  state.maintenance = [
    { id: uid(), name: 'Gutter clean', provider: "Jim's", nextDue: past90, frequency: 'Biannual', notes: 'Both sides' },
    { id: uid(), name: 'Car service — RAV4', provider: 'Toyota Service', nextDue: past30, frequency: 'Annual', notes: '15,000km service' },
    { id: uid(), name: 'Termite inspection', provider: 'Rentokil', nextDue: past7, frequency: 'Annual', notes: '' },
    { id: uid(), name: 'HVAC filter', provider: '', nextDue: in14, frequency: 'Quarterly', notes: '' },
    { id: uid(), name: 'Smoke alarm test', provider: '', nextDue: in60, frequency: 'Annual', notes: '' },
  ];
  state.householdProfile = {
    ...state.householdProfile,
    members: [
      { role: 'adult', name: 'Robert', age: 38, emoji: '👨' },
      { role: 'adult', name: 'Sarah', age: 36, emoji: '👩' },
    ]
  };
  window.saveData(state); window.renderAll();
}

export function _devLoadMeals() {
  const weekKey = typeof _mealWeekKey === 'function' ? _mealWeekKey(0) : 'week-0';
  const meals = {};
  const options = [
    ['Porridge', 'Sandwich & apple', 'Chicken stir-fry'],
    ['Eggs on toast', 'Leftovers', 'Beef tacos'],
    ['Smoothie', 'Caesar salad', 'Pasta bolognese'],
    ['Avocado toast', 'Sushi', 'Lamb roast'],
    ['Cereal', 'Toasted sandwich', 'Fish & chips'],
    ['Pancakes', 'Fruit bowl', 'BBQ'],
    ['French toast', 'Cold cuts', 'Pizza night'],
  ];
  for (let d = 0; d < 7; d++) {
    meals[d] = { b: options[d][0], l: options[d][1], d: options[d][2] };
  }
  if (!state.meals) state.meals = { plan: {}, shopping: [], lunchbox: { profiles: [], plans: {} }, pantry: [] };
  state.meals.plan[weekKey] = meals;
  // Lunchbox for kids
  const kid1 = state.kids?.profiles?.[0];
  if (kid1) {
    const lbWeek = typeof _mealWeekKey === 'function' ? _mealWeekKey(0) : weekKey;
    if (!state.meals.lunchbox.plans) state.meals.lunchbox.plans = {};
    if (!state.meals.lunchbox.plans[lbWeek]) state.meals.lunchbox.plans[lbWeek] = {};
    const dow = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    state.meals.lunchbox.plans[lbWeek][kid1.id] = {};
    state.meals.lunchbox.plans[lbWeek][kid1.id][dow] = { main: '🥪 Vegemite sandwich', snack: '🍫 Muesli bar', fruit: '🍎 Apple', drink: '💧 Water' };
  }
  // Dev data for lists
  if (!state.lists) window._applyMigrations(state);
  const now8601 = new Date().toISOString();
  state.lists.food.items = [
    { id:'dev-f1', name:'Milk', quantity:2, unit:'L', notes:'', aisle:'dairy', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-f2', name:'Eggs', quantity:1, unit:'dozen', notes:'Free range', aisle:'dairy', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-f3', name:'Chicken breast', quantity:500, unit:'g', notes:'', aisle:'meat', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-f4', name:'Spinach', quantity:1, unit:'units', notes:'', aisle:'produce', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-f5', name:'Bread', quantity:1, unit:'units', notes:'Sourdough', aisle:'bakery', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-f6', name:'Pasta', quantity:500, unit:'g', notes:'', aisle:'pantry', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-f7', name:'Beer', quantity:1, unit:'units', notes:'', aisle:'drinks', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-f8', name:'Avocado', quantity:2, unit:'units', notes:'', aisle:'produce', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-f9', name:'Butter', quantity:1, unit:'units', notes:'Salted', aisle:'dairy', state:'got_it', addedBy:'dev', addedAt:now8601, stateChangedAt:now8601, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-f10', name:'Orange juice', quantity:1, unit:'L', notes:'', aisle:'drinks', state:'got_it', addedBy:'dev', addedAt:now8601, stateChangedAt:now8601, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-f11', name:'Oat milk', quantity:1, unit:'L', notes:'', aisle:'dairy', state:'not_found', addedBy:'dev', addedAt:now8601, stateChangedAt:now8601, mealTag:null, manualPrice:null, barcodeId:null },
  ];
  state.lists.food.weeklyBudget = 200;
  state.lists.food.favourites = [
    { name:'Milk', addedCount:8, pinned:true },
    { name:'Eggs', addedCount:7, pinned:true },
    { name:'Bread', addedCount:6, pinned:false },
    { name:'Chicken breast', addedCount:5, pinned:false },
    { name:'Butter', addedCount:4, pinned:false },
  ];
  state.lists.wishlist.items = [
    { id:'dev-w1', name:'AirPods Pro', quantity:1, unit:'units', notes:'Gen 2', aisle:'other', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-w2', name:'Standing desk mat', quantity:1, unit:'units', notes:'', aisle:'other', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
    { id:'dev-w3', name:'Kindle Paperwhite', quantity:1, unit:'units', notes:'', aisle:'other', state:'active', addedBy:'dev', addedAt:now8601, stateChangedAt:null, mealTag:null, manualPrice:null, barcodeId:null },
  ];

  window.saveData(state); window.renderAll();
}

export function _devLoadAll() {
  _devLoadWallet();
  _devLoadKids();
  _devLoadRoutines();
  _devLoadPlanner();
  _devLoadHome();
  _devLoadMeals();
}

export function _devReset() {
  if (!confirm('Reset all data to empty defaults?')) return;
  const fresh = JSON.parse(JSON.stringify(DEFAULT_DATA));
  fresh.onboarded = true;
  fresh.setupProgressDismissed = false;
  _replaceState(fresh);
  window.saveData(fresh);
  window.renderAll();
}


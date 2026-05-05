import './styles/main.css';
import './firebase.js';
import { freqToMonthly, billNextDue, billDaysUntil } from './utils.js';
import { state, _initState, _replaceState, subscribe, getState, registerSectionRenderers } from './store.js';
import {
  SECTIONS, _tabSection, _activeTab, _sectionPillsHtml,
  _updatePillsOverflow, _activateTabInternal, activateTab, setRenderCallback,
} from './router.js';
import {
  escHtml, escAttr, sanitiseState,
  aud, audD, fmtNW, fmtDate, isOverdue,
  freqLabel, freqDisplay, freqDisplayItem, freqLabelItem, itemMonthly, monthlyTotal,
  nextId,
} from './sections/format.js';
import {
  renderVehicles, openVehicleForm, saveVehicle, _syncVehicleBill,
  deleteVehicle, openServiceForm, saveService, deleteService,
} from './sections/vehicles.js';
import {
  _docCatMeta, renderDocuments, openDocForm, saveDoc, deleteDoc, DOC_CATS,
} from './sections/documents.js';
import {
  _maintNextDue, _maintDaysUntil, renderMaintenance, openMaintForm, saveMaint,
  deleteMaint, markMaintDone, quickAddMaint, MAINT_CATS, MAINT_STARTERS,
} from './sections/maintenance.js';
import {
  renderPantry, cyclePantryStatus, openPantryForm, savePantryItem,
  deletePantryItem, quickAddPantry, pantryToShoppingList, PANTRY_CATS, PANTRY_STARTERS,
} from './sections/pantry.js';
import {
  renderNetWorth, nwItemRow, renderNWTargetCard, renderNWDebtCard,
  openNWTargetModal, closeNWTargetModal, saveNWTarget, renderNWTrend,
  _ensureNWModals, openNWModal, closeNWModal, saveNWItem, deleteNWItem,
  saveNWSnapshot, NW_ASSET_CATS,
} from './sections/networth.js';
import {
  billCatIcon, billDueBadge, billMonthlyEquiv, renderBills, setBillsFilter,
  renderSubscriptions, billsModal, openBillModal, closeBillModal,
  toggleBillDayField, saveBill, deleteBill, markBillPaid, BILL_CATS, BILL_FREQS,
} from './sections/bills.js';
import {
  subCatIcon, subMonthlyAmount, renderSubImportResults, openSubModal, closeSubModal,
  saveSub, deleteSub, handleSubCSV, addSubFromImport, dismissSubResult, SUB_CATS,
} from './sections/subscriptions.js';
import {
  PLANNER_CATS, PLANNER_MEMBER_PALETTE, _plannerCollapseState, _typeADimsExpanded,
  _plannerMonth, _plannerView, _plannerSelectedDay, _plannerExpanded,
  _plannerFilterMembers, _plannerDetailEvId, _plannerVisibleEvents,
  _plannerEventsForDate, _plannerEvMemberIds, _plannerEvPrimaryMember, _plannerEvWhoLabel,
  _plannerMemberById, _plannerMembers, _plannerFmt12h, _plannerRecurrenceLabel,
  _plannerNudges, _plannerRenderDaySheetList, _renderPlannerAgenda,
  _renderPlannerEventRow, _renderPlannerMonthGrid, _renderPlannerWeekStrip,
  _plannerOpenDaySheet, _plannerHandleDaySheetClick, _plannerOpenDetail,
  _plannerHandleDetailClick, _plannerEditFromDetail, _plannerCloseDetail,
  _plannerOpenLifeSheet, _plannerHandleLifeSheetClick, _plannerCloseLifeSheet,
  _plannerOpenShare, _plannerHandleShareClick, _plannerCloseShare, _plannerCopyShareUrl,
  _plannerShareVia, _plannerSelectDay, _plannerGoToday, _plannerNextMonth, _plannerPrevMonth,
  _plannerSetView, _plannerToggleFilter, _plannerToggleSection,
  _pmDpOpen, _pmDpOutsideClick, _pmDpPrev, _pmDpNext, _pmDpToday,
  _pmDpSelect, _pmDpClear, _pmDpRender, _pmDpTarget, _pmFmtDate, _pmFmtDateShort,
  _pmHandleCatChange, _pmRenderMemberPicker, _pmSelectedMembers, _pmToggleMember, _pmToggleAllDay,
  _plannerOpenModalFromSheet, openPlannerModal, savePlannerEvent, deletePlannerEvent,
  renderPlanner, renderForecast, renderBudgetSuggestions, renderBudgetForecast,
  _forecastMonth, _prevForecastMonth, _nextForecastMonth,
  _pushAllEventsToBudget, suggestEventToBudget, unpushEventFromBudget,
  estimatePlannerEvent, estimateAllEvents, togglePlannerCard, togglePlannerEstimate,
  _autoCreateRecurringEvents, _addRecurrenceToDate, _getNthDayOfMonth, getSeasonalNudges,
  goToPlannerDay, _renderNudgeSection, approveSuggestion, dismissSuggestion,
} from './sections/planner.js';
import {
  openTotoAssistant, closeTotoAssistant, toggleTotoAssistant, sendTotoMessage,
  _totoSend, _totoSendSuggestion, _totoHistory, _totoOpen, _totoTyping,
  _totoInitPanel, _totoAppendMessage, _totoShowTyping, _totoRemoveTyping,
  _buildTotoContext, TOTO_SUGGESTIONS,
} from './sections/toto.js';
import {
  FOOD_AISLE_LOOKUP, LIST_AISLES, LIST_TYPES, SHOP_CATS, SHOP_ICONS,
  _estimateMealCalories, _inferAisle, _listsAddFavourite,
  _listsAddItem, _listsAddUsual, _listsArchive, _listsClearTrolley,
  _listsDeleteItem, _listsOpenAddForm, _listsQuickAdd, _listsSaveForm,
  _listsSetState, _listsUpdateParsePreview,
  _mealGetSuggestions, _mealPill, _mealPriceSlide, _mealSuggestFilters,
  _mealToggleFilter, _mealWeekDates, _mealWeekKey, _mealWeekOffset,
  _pantryToAisle, _parseShopInput, _renderListItem, _renderListsDetail,
  _renderListsSelector, _renderMealPlan, _renderShoppingList, _showToast,
  addShopItem, clearCheckedShopItems, generateShoppingList, openMealEdit,
  removeShopItem, renderLists, renderMeals, saveMealSlot, toggleShopItem,
} from './sections/meals.js';
import {
  FURN_ROOMS, applianceForm, applianceFromForm, deleteAppliance, deleteFurniture,
  furnitureForm, furnitureFromForm, openAddAppliance, openAddFurniture,
  openEditAppliance, openEditFurniture,
} from './sections/home-extras.js';

// Wire login buttons immediately — modules are deferred so DOMContentLoaded
// has already fired. Using lambdas means guestMode/signInWithGoogle are
// looked up at click time (after the full module has run), not at bind time.
document.getElementById('btn-guest-mode')?.addEventListener('click', () => guestMode());
document.getElementById('btn-google-signin')?.addEventListener('click', () => signInWithGoogle());

// ─────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

const NAV_GROUPS = {};

function toggleNavGroup(name) {
  const iconBtn      = document.getElementById(`icon-group-${name}`);
  const iconChildren = document.getElementById(`icon-group-${name}-children`);
  const textBtn      = document.getElementById(`text-group-${name}`);
  const textChildren = document.getElementById(`text-group-${name}-children`);
  const isOpen = iconChildren && iconChildren.classList.contains('open');
  if (iconBtn)      iconBtn.classList.toggle('open', !isOpen);
  if (iconChildren) iconChildren.classList.toggle('open', !isOpen);
  if (textBtn)      textBtn.classList.toggle('open', !isOpen);
  if (textChildren) textChildren.classList.toggle('open', !isOpen);
}

function openNavGroupFor(tab) {
  for (const [name, tabs] of Object.entries(NAV_GROUPS)) {
    if (tabs.includes(tab)) {
      const iconChildren = document.getElementById(`icon-group-${name}-children`);
      if (iconChildren && !iconChildren.classList.contains('open')) toggleNavGroup(name);
      return;
    }
  }
}

// ─────────────────────────────────────────────────
// FIREBASE
// ─────────────────────────────────────────────────
// fbAuth and fbStore are set by src/firebase.js, which is imported above.
// fbAuth shim API: onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, currentUser
// fbStore shim API: .collection(path).doc(id).{get, set, delete, onSnapshot}

// Global error capture — catches unhandled promise rejections and JS exceptions
// that fall outside safeRender. Sentry also installs its own handlers, but we
// add a fallback console log so errors are visible without Sentry.
window.addEventListener('unhandledrejection', e => {
  console.error('[unhandledrejection]', e.reason);
});
window.addEventListener('error', e => {
  console.error('[uncaughtError]', e.message, e.filename, e.lineno);
});

// ── Per-household Firestore path ──────────────────────────────────────────
// Each household's data lives at families/{ownerUID}.
// The owner's UID is stored in localStorage so invited members always sync
// to the right household even after signing out and back in.
const HOUSEHOLD_OWNER_KEY    = 'toto_household_owner';
const PENDING_HOUSEHOLD_KEY  = 'toto_pending_household'; // set from invite URL

function _getHouseholdOwnerUID() {
  // Invited member arriving via link: pending household takes priority
  return sessionStorage.getItem(PENDING_HOUSEHOLD_KEY)
      || _secureGet(HOUSEHOLD_OWNER_KEY)
      || _currentUser?.uid
      || null;
}

function _getHouseholdDocRef() {
  const ownerUID = _getHouseholdOwnerUID();
  if (!ownerUID) return null;
  return fbStore.collection('families').doc(ownerUID);
}

function _setHouseholdOwner(uid) {
  _secureSet(HOUSEHOLD_OWNER_KEY, uid);
  sessionStorage.removeItem(PENDING_HOUSEHOLD_KEY);
}

let _currentUser    = null;
let _guestMode      = false;
let _fsUnsubscribe  = null;
let _pendingLogEntry = null;

function logActivity(action, detail) {
  _pendingLogEntry = {
    ts:     new Date().toISOString(),
    name:   _currentUser ? (_currentUser.displayName || _currentUser.email || 'Unknown') : 'Unknown',
    photo:  _currentUser ? (_currentUser.photoURL || '') : '',
    action,
    detail: detail || ''
  };
}

function signInWithGoogle() {
  const provider = new fbAuth.GoogleAuthProvider();
  fbAuth.signInWithPopup(provider).catch(err => {
    const el = document.getElementById('login-error');
    if (el) { el.textContent = err.message; el.style.display = ''; }
  });
}

function guestMode() {
  _guestMode = true;
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.add('hidden');
  if (!state.onboarded) {
    showOnboarding();
  } else {
    const _hashTab = location.hash.slice(1);
    if (_hashTab && document.getElementById('tab-' + _hashTab)) {
      history.replaceState({ tab: _hashTab }, '', '#' + _hashTab);
      _activateTabInternal(_hashTab);
    } else {
      renderAll();
    }
    handleDeviceRouting();
  }
}

function signOutUser() {
  if (_fsUnsubscribe) { _fsUnsubscribe(); _fsUnsubscribe = null; }
  _deviceRoutingDone = false;
  _activeProfile = null;
  clearKidSession();
  // Do NOT clear HOUSEHOLD_OWNER_KEY — invited members need it on next login
  fbAuth.signOut();
}

function _applyMigrations(d) {
  if (!d.budget) d.budget = { income: [], expenses: [], actuals: {}, months: {} };
  if (!d.budget.actuals) d.budget.actuals = {};
  if (!d.budget.months) d.budget.months = {};
  if (!d.budget.suggestions) d.budget.suggestions = [];
  if (!d.goals) d.goals = [];
  if (!d.scenarios) d.scenarios = [];
  if (!d.furniture) d.furniture = [];
  if (!d.appliances) d.appliances = [];
  if (!d.planner) d.planner = { events: [] };

  // Section 10: Lists migration
  if (!d.lists) {
    d.lists = {
      food:     { items: [], budget: 0, weeklyBudget: 200, stores: [], favourites: [], history: [] },
      clothes:  { items: [], budget: 0, weeklyBudget: 0,   stores: [], favourites: [], history: [] },
      wishlist: { items: [], budget: 0, weeklyBudget: 0,   stores: [], favourites: [], history: [] },
      home:     { items: [], budget: 0, weeklyBudget: 0,   stores: [], favourites: [], history: [] },
      pharmacy: { items: [], budget: 0, weeklyBudget: 0,   stores: [], favourites: [], history: [] },
    };
    if (d.meals && d.meals.shopping && d.meals.shopping.length) {
      d.lists.food.items = d.meals.shopping.map(function(i, idx) {
        return {
          id: 'si-' + idx,
          name: i.name,
          quantity: 1,
          unit: 'units',
          notes: '',
          aisle: i.cat || 'other',
          state: i.checked ? 'got_it' : 'active',
          addedBy: 'migration',
          addedAt: new Date().toISOString(),
          mealTag: null,
          manualPrice: null,
          barcodeId: null,
        };
      });
    }
  }
  ['food','clothes','wishlist','home','pharmacy'].forEach(function(t) {
    if (!d.lists[t]) d.lists[t] = { items: [], budget: 0, weeklyBudget: 0, stores: [], favourites: [], history: [] };
    if (!d.lists[t].items) d.lists[t].items = [];
    if (!d.lists[t].stores) d.lists[t].stores = [];
    if (!d.lists[t].favourites) d.lists[t].favourites = [];
    if (!d.lists[t].history) d.lists[t].history = [];
  });

  return d;
}

function _startFirestoreSync() {
  if (_fsUnsubscribe) _fsUnsubscribe();

  // If this user has no stored household owner yet, they are the owner
  if (!_secureGet(HOUSEHOLD_OWNER_KEY) && !sessionStorage.getItem(PENDING_HOUSEHOLD_KEY)) {
    _setHouseholdOwner(_currentUser.uid);
  }

  const docRef = _getHouseholdDocRef();
  if (!docRef) { console.error('No household doc ref'); return; }

  _fsUnsubscribe = docRef.onSnapshot(async snap => {
    if (snap.exists) {
      const d = _applyMigrations(snap.data());
      Object.assign(state, d);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      // New household — check if there's legacy data to migrate from family/shared
      const legacy = await fbStore.collection('family').doc('shared').get().catch(() => null);
      if (legacy && legacy.exists) {
        const d = _applyMigrations(legacy.data());
        Object.assign(state, d);
        docRef.set(state).catch(() => {});
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } else {
        // Genuinely new user: push local state up
        docRef.set(state).catch(() => {});
      }
    }
    refreshReceiptCounts().then(() => {
      _autoCreateRecurringEvents();
      // Apply URL hash route before renderAll so the correct tab renders first
      const _hashTab = location.hash.slice(1);
      if (_hashTab && document.getElementById('tab-' + _hashTab)) {
        history.replaceState({ tab: _hashTab }, '', '#' + _hashTab);
        _activateTabInternal(_hashTab);
      } else {
        renderAll();
      }
      if (!state.onboarded) {
        showOnboarding();
      } else {
        const pendingToken    = sessionStorage.getItem(_PENDING_INVITE_KEY);
        const postInviteToken = sessionStorage.getItem('toto_post_invite_action');
        if (pendingToken || postInviteToken) {
          sessionStorage.removeItem('toto_post_invite_action');
          _handlePendingInvite();
        } else {
          handleDeviceRouting();
        }
      }
    });
  }, err => {
    console.error('Firestore sync error:', err);
    renderAll();
    if (!state.onboarded) showOnboarding();
  });
}

// Defer auth listener until the Firebase module script has set up fbAuth.
function _initAuthListener() {
  fbAuth.onAuthStateChanged(user => {
    if (_guestMode && !user) return;
    _currentUser = user;
    const overlay       = document.getElementById('login-overlay');
    const headerAvatar  = document.getElementById('header-avatar');
    const headerSignOut = document.getElementById('header-sign-out');

  if (user) {
    if (overlay)       overlay.classList.add('hidden');
    if (headerAvatar)  { headerAvatar.src = user.photoURL || ''; headerAvatar.style.display = 'block'; }
    if (headerSignOut) headerSignOut.style.display = 'block';
    _startFirestoreSync();
  } else {
    if (overlay)       overlay.classList.remove('hidden');
    if (headerAvatar)  headerAvatar.style.display = 'none';
    if (headerSignOut) headerSignOut.style.display = 'none';
    if (_fsUnsubscribe) { _fsUnsubscribe(); _fsUnsubscribe = null; }
    const pendingToken = sessionStorage.getItem(_PENDING_INVITE_KEY);
    const banner  = document.getElementById('login-invite-banner');
    const tagline = document.getElementById('login-tagline');
    if (pendingToken && banner) {
      banner.style.display = 'block';
      if (tagline) tagline.style.display = 'none';
    }
  }
  });
}

// src/firebase.js runs before this code so fbAuth is always available here.
_initAuthListener();

// ─────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────

const STORAGE_KEY = 'home_finance_v1';

// ── Security: HTML escaping for user-generated content ──
// ─── Custom Select Component ───────────────────────
let _csActive = null;
const _csStore = {};

function customSelect(id, options, value, onChange) {
  _csStore[id] = { options, value, onChange };
  const label = (options.find(o => (o.value ?? o) === value) || options[0]);
  const labelText = label?.label ?? label?.value ?? label ?? '';
  return `<div class="cs-wrap">
    <button type="button" class="cs-trigger" id="cs-${id}" onclick="event.stopPropagation();_csOpen('${id}',this)">
      <span id="cs-label-${id}">${escHtml(String(labelText))}</span>
      <span class="cs-chevron">▼</span>
    </button>
  </div>`;
}

function _csOpen(id, triggerEl) {
  if (_csActive) { _csActive.remove(); _csActive = null; document.querySelectorAll('.cs-trigger.open').forEach(el => el.classList.remove('open')); }
  const store = _csStore[id];
  if (!store) return;
  triggerEl.classList.add('open');
  const rect = triggerEl.getBoundingClientRect();
  const dd = document.createElement('div');
  dd.className = 'cs-dropdown';
  dd.style.left  = rect.left + 'px';
  dd.style.width = Math.max(rect.width, 180) + 'px';
  const spaceBelow = window.innerHeight - rect.bottom - 8;
  const spaceAbove = rect.top - 8;
  const listH = Math.min(260, store.options.length * 43);
  dd.style.top = (spaceBelow >= listH || spaceBelow >= spaceAbove)
    ? (rect.bottom + 4) + 'px'
    : Math.max(8, rect.top - listH - 4) + 'px';
  store.options.forEach(opt => {
    const val   = opt.value ?? opt;
    const label = opt.label ?? opt.value ?? opt;
    const el = document.createElement('div');
    el.className = 'cs-option' + (val === store.value ? ' cs-selected' : '');
    el.textContent = label;
    el.addEventListener('click', e => {
      e.stopPropagation();
      store.value = val;
      const labelEl = document.getElementById('cs-label-' + id);
      if (labelEl) labelEl.textContent = label;
      store.onChange(val);
      dd.remove(); _csActive = null;
      triggerEl.classList.remove('open');
    });
    dd.appendChild(el);
  });
  document.body.appendChild(dd);
  _csActive = dd;
}

document.addEventListener('click', () => {
  if (_csActive) { _csActive.remove(); _csActive = null; document.querySelectorAll('.cs-trigger.open').forEach(el => el.classList.remove('open')); }
});

// Auto-upgrade all .form-select elements in a container
function upgradeSelects(container) {
  if (!container) return;
  container.querySelectorAll('select.form-select:not(.cs-upgraded)').forEach(sel => {
    sel.classList.add('cs-upgraded');
    const csId = (sel.id || ('cs' + Math.random().toString(36).slice(2, 7))) + '__cs';
    const options = Array.from(sel.options).map(o => ({ value: o.value, label: o.text }));
    const currentVal = sel.value || options[0]?.value || '';
    // Hide native select but keep it in DOM so save functions can still read .value
    sel.style.cssText = 'position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;overflow:hidden';
    const wrap = document.createElement('div');
    wrap.className = 'cs-wrap';
    wrap.innerHTML = customSelect(csId, options, currentVal, val => {
      sel.value = val;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    });
    sel.parentNode.insertBefore(wrap, sel);
  });
}

// Single observer — upgrades selects in any modal the moment it opens
(function () {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  new MutationObserver(() => {
    if (!overlay.classList.contains('hidden')) {
      upgradeSelects(document.getElementById('modal-body'));
    }
  }).observe(overlay, { attributes: true, attributeFilter: ['class'] });
})();
// ───────────────────────────────────────────────────

// escHtml, escAttr, sanitiseState imported from ./sections/format.js
const CLAUDE_API  = 'https://wandering-mouse-3925.fuscocl.workers.dev';

const DEFAULT_DATA = {
  buildContract: {
    total: 790000,
    stages: [
      { id: 1, name: 'Deposit',               amount: 39500,  paid: false, paidDate: '', expectedDate: '', invoiceRef: '', funding: 'loan', notes: '' },
      { id: 2, name: 'Base / Slab',            amount: 79000,  paid: false, paidDate: '', expectedDate: '', invoiceRef: '', funding: 'loan', notes: '' },
      { id: 3, name: 'Frame',                  amount: 118500, paid: false, paidDate: '', expectedDate: '', invoiceRef: '', funding: 'loan', notes: '' },
      { id: 4, name: 'Lock-up / Enclosed',     amount: 276500, paid: false, paidDate: '', expectedDate: '', invoiceRef: '', funding: 'loan', notes: '' },
      { id: 5, name: 'Fixing / Fitout',        amount: 197500, paid: false, paidDate: '', expectedDate: '', invoiceRef: '', funding: 'loan', notes: '' },
      { id: 6, name: 'Practical Completion',   amount: 79000,  paid: false, paidDate: '', expectedDate: '', invoiceRef: '', funding: 'loan', notes: '' },
    ],
    variations: []
  },
  extras: [
    { id: 1, name: 'Solar',        vendor: '', totalAmount: 0, amountPaid: 0, dueDate: '', notes: '' },
    { id: 2, name: 'Landscaping',  vendor: '', totalAmount: 0, amountPaid: 0, dueDate: '', notes: '' },
  ],
  furniture: [],
  appliances: [],
  goals: [],
  scenarios: [],
  kids: { profiles: [], chores: [], prizes: [], completions: [], redemptions: [] },
  netWorth: { assets: [], liabilities: [], snapshots: [], target: { amount: 0, byYear: 0 } },
  bills: [],
  subscriptions: [],
  planner: { events: [] },
  meals: { plan: {}, shopping: [], lunchbox: { profiles: [], plans: {} }, pantry: [] },
  vehicles: [],
  documents: [],
  maintenance: [],
  onboarded: false,
  setupProgressDismissed: false,
  activityLog: [],
  householdProfile: {
    members: [{ role: 'adult', age: null }, { role: 'adult', age: null }],
    pets: [],
    cars: 1,
    invites: [],
    authorizedUsers: []
  },
  expenseCategories: ['Mortgage / Rent', 'Insurance', 'Utilities', 'Groceries', 'Transport', 'Childcare / Education', 'Health', 'Entertainment', 'Subscriptions', 'Dining Out', 'Clothing', 'Personal Care', 'Savings / Investment', 'Other'],
  incomeCategories: ['Salary', 'Freelance / Contract', 'Rental Income', 'Government / Benefits', 'Investment', 'Other'],
  budget: {
    income: [],
    expenses: [],
    actuals: {},
    months: {}
  },
  settings: {
    autoFillMonths: false
  },
  categoryGroups: [
    { id: 1, name: 'Housing',         icon: '🏠', categories: ['Mortgage / Rent', 'Utilities', 'Insurance'] },
    { id: 2, name: 'Food & Dining',   icon: '🍽️', categories: ['Groceries', 'Dining Out'] },
    { id: 3, name: 'Transport',       icon: '🚗', categories: ['Transport'] },
    { id: 4, name: 'Family & Health', icon: '👨‍👩‍👧', categories: ['Childcare / Education', 'Health', 'Personal Care'] },
    { id: 5, name: 'Lifestyle',       icon: '🎮', categories: ['Entertainment', 'Subscriptions', 'Clothing'] },
    { id: 6, name: 'Savings',         icon: '💰', categories: ['Savings / Investment'] },
    { id: 7, name: 'Other',           icon: '📦', categories: ['Other'] }
  ],
  // ── ROUTINES START ── default state
  routines: [],
  routineAssignments: [],
  // ── ROUTINES END ── default state
  childEvents: []
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const d = JSON.parse(raw);
    if (!d.budget.actuals) d.budget.actuals = {};
    if (!d.budget.months)  d.budget.months  = {};
    if (!d.budget.suggestions) d.budget.suggestions = [];
    if (!d.goals)      d.goals      = [];
    if (!d.scenarios)  d.scenarios  = [];
    if (!d.netWorth) d.netWorth = { assets: [], liabilities: [], snapshots: [] };
    if (!d.netWorth.snapshots) d.netWorth.snapshots = [];
    if (!d.netWorth.target) d.netWorth.target = { amount: 0, byYear: 0 };
    if (!d.bills) d.bills = [];
    if (!d.subscriptions) d.subscriptions = [];
    if (d.onboarded === undefined) d.onboarded = true; // existing users skip onboarding
    if (!d.planner) d.planner = { events: [] };
    if (d.planner?.events) d.planner.events.forEach(e => {
      if (!e.recurring) e.recurring = 'none';
      // Migrate legacy recurring string → rich recurrence object
      if (!e.recurrence && e.recurring && e.recurring !== 'none') {
        const legacyMap = { weekly:{type:'interval',intervalDays:7}, fortnightly:{type:'interval',intervalDays:14}, monthly:{type:'interval',intervalDays:30}, quarterly:{type:'interval',intervalDays:91}, yearly:{type:'interval',intervalDays:365} };
        const mapped = legacyMap[e.recurring];
        if (mapped) e.recurrence = { ...mapped, startDate: e.date || new Date().toISOString().slice(0,10) };
      }
    });
    if (!d.kids) d.kids = { profiles: [], chores: [], prizes: [], completions: [], redemptions: [] };
    if (!d.kids.profiles)    d.kids.profiles    = [];
    if (!d.kids.chores)      d.kids.chores      = [];
    if (!d.kids.prizes)      d.kids.prizes      = [];
    if (!d.kids.completions) d.kids.completions = [];
    if (!d.kids.redemptions) d.kids.redemptions = [];
    // Deduplicate kids.profiles by name (keeps last entry which has the most data)
    const _seenKidNames = new Map();
    d.kids.profiles.forEach(k => { if (k.name) _seenKidNames.set(k.name.toLowerCase(), k); });
    if (_seenKidNames.size < d.kids.profiles.length) {
      d.kids.profiles = Array.from(_seenKidNames.values());
    }
    if (!d.furniture) d.furniture = [];
    if (!d.appliances) d.appliances = [];
    if (!d.activityLog) d.activityLog = [];
    if (!d.householdProfile) {
      d.householdProfile = { members: [{ role:'adult', age:null },{ role:'adult', age:null }], pets: [], cars: 1 };
    } else if ('adults' in d.householdProfile) {
      // migrate old { adults, children } → new richer format
      const a = d.householdProfile.adults || 2;
      const c = d.householdProfile.children || 0;
      d.householdProfile = {
        members: [
          ...Array.from({length: a}, () => ({ role:'adult', age:null })),
          ...Array.from({length: c}, () => ({ role:'child', age:null }))
        ],
        pets: [],
        cars: 1
      };
    }
    if (!d.householdProfile.pets)  d.householdProfile.pets = [];
    if (d.householdProfile.cars === undefined) d.householdProfile.cars = 1;
    if (!d.householdProfile.invites) d.householdProfile.invites = [];
    if (!d.householdProfile.authorizedUsers) d.householdProfile.authorizedUsers = [];
    // Migrate: backfill member names from kids.profiles and income sources
    (d.householdProfile.members || []).forEach((m, i) => {
      if (m.name) return; // already has a name
      if (m.role === 'child') {
        // Try to match by index into kids.profiles
        const kp = (d.kids?.profiles || [])[i - (d.householdProfile.members||[]).filter((x,j)=>j<i&&x.role==='adult').length];
        if (kp?.name) { m.name = kp.name; if (!m.age && kp.age) m.age = kp.age; if (!m.emoji && kp.emoji) m.emoji = kp.emoji; }
      } else {
        // Try to infer adult name from income source (e.g. "Robert's salary" → "Robert")
        const incomes = (d.budget?.income || []);
        const adultIdx = (d.householdProfile.members||[]).filter((x,j)=>j<i&&x.role==='adult').length;
        const inc = incomes[adultIdx];
        if (inc?.name) {
          const match = inc.name.match(/^([^'\s]+)'s\s/i) || inc.name.match(/^([^'\s]+)\s/);
          if (match) m.name = match[1];
        }
      }
    });
    if (!d.meals) d.meals = { plan: {}, shopping: [] };
    if (!d.meals.plan) d.meals.plan = {};
    if (!d.meals.shopping) d.meals.shopping = [];
    if (!d.meals.lunchbox) d.meals.lunchbox = { profiles: [], plans: {} };
    if (!d.meals.lunchbox.profiles) d.meals.lunchbox.profiles = [];
    if (!d.meals.lunchbox.plans) d.meals.lunchbox.plans = {};
    if (!d.meals.pantry) d.meals.pantry = [];
    if (!d.vehicles) d.vehicles = [];
    if (!d.documents) d.documents = [];
    if (!d.maintenance) d.maintenance = [];
    // ── ROUTINES START ── migration
    if (!d.routines) d.routines = [];
    if (!d.routineAssignments) d.routineAssignments = [];
    const _assignedRoutineIds = new Set((d.routineAssignments || []).map(a => a.routineId));
    d.routines.forEach(r => {
      if (!r.completions)       r.completions       = {};
      if (!r.sharedWith)        r.sharedWith        = [];
      if (!r.assignedTo)        r.assignedTo        = [];
      if (!r.linkedFrom)        r.linkedFrom        = null;
      if (!r.linkedType)        r.linkedType        = null;
      if (r.pointsPerCompletion === undefined) r.pointsPerCompletion = 0;
      (r.steps || []).forEach(s => { if (s.points === undefined) s.points = 0; });
      if (!r.skippedDates)  r.skippedDates  = [];
      if (!r.pausePeriods)  r.pausePeriods  = [];
      if (!r.recurrence)    r.recurrence    = { type: 'daily', startDate: (r.lastEditedAt || new Date().toISOString()).slice(0,10) };
      // Scope repair: derive ownerType from routineAssignments rather than defaulting
      // everything to 'adult'. A routine that appears in routineAssignments is household-scoped.
      if (!r.ownerType || !r.ownerId) {
        if (_assignedRoutineIds.has(r.id)) {
          r.ownerType = 'household';
          r.ownerId   = 'household';
        } else {
          r.ownerType = 'adult';
          r.ownerId   = 'guest';
        }
      }
      // Integrity: a routine in routineAssignments MUST be household-scoped.
      if (_assignedRoutineIds.has(r.id) && r.ownerType !== 'household') {
        r.ownerType = 'household';
        r.ownerId   = 'household';
      }
      // Strip pre-populated steps from old default adult routines
      if (r.ownerType === 'adult' && r.ownerId === 'guest' && r.steps?.length > 0) {
        const defaultLabels = new Set(['Make bed','Shower','Breakfast','Exercise','Plan the day',
                               'Tidy kitchen','Prep tomorrow','Family time','Read','Lights out']);
        if (r.steps.every(s => defaultLabels.has(s.label))) r.steps = [];
      }
    });
    // Migrate assignments: ensure completionState exists; backfill from routine.completions
    // if it was previously stored there (pre-spec behaviour).
    d.routineAssignments.forEach(a => {
      if (!a.completionState) {
        const r = d.routines.find(r => r.id === a.routineId);
        // Backfill: move any existing routine.completions into the assignment
        a.completionState = (r && Object.keys(r.completions || {}).length)
          ? JSON.parse(JSON.stringify(r.completions))
          : {};
      }
      if (!a.archivedCompletionState) a.archivedCompletionState = null;
      if (!a.childIds) {
        // Old single-child assignments: promote childId to childIds array
        a.childIds = a.childId ? [a.childId] : [];
      }
    });
    // After backfilling, clear completions from household routines — they now live on assignments
    d.routines.forEach(r => {
      if (r.ownerType === 'household') r.completions = {};
    });
    if (!d.childEvents) d.childEvents = [];
    d.childEvents.forEach(ev => {
      if (!ev.recurrence)                 ev.recurrence      = null;
      if (!ev.assignedTo)                 ev.assignedTo      = [];
      if (ev.isHouseholdWide === undefined) ev.isHouseholdWide = false;
    });
    // ── ROUTINES END ── migration
    if (!d.settings) d.settings = { autoFillMonths: false };
    if (!d.settings.notifStyle) d.settings.notifStyle = 'focus-timeline';
    if (d.settings.routineResetHour === undefined) d.settings.routineResetHour = 0;
    if (!d.kids.notifications) d.kids.notifications = [];
    if (d.settings.typeAMode === undefined) d.settings.typeAMode = false;
    if (!d.settings.typeAStreak) d.settings.typeAStreak = 0;
    if (!d.settings.typeALastReset) d.settings.typeALastReset = '';
    if (!d.settings.typeADismissedMission) d.settings.typeADismissedMission = '';
    if (!d.settings.typeAMissionShownDate) d.settings.typeAMissionShownDate = '';
    if (!d.settings.typeAMissionId) d.settings.typeAMissionId = '';
    if (!d.settings.typeALastResetDate) d.settings.typeALastResetDate = '';
    if (!d.categoryGroups) d.categoryGroups = JSON.parse(JSON.stringify(DEFAULT_DATA.categoryGroups));
    if (!d.buildContract.variations) d.buildContract.variations = [];
    d.buildContract.stages.forEach(s => { if (!s.expectedDate) s.expectedDate = ''; });
    if (!d.expenseCategories) d.expenseCategories = JSON.parse(JSON.stringify(DEFAULT_DATA.expenseCategories));
    if (!d.incomeCategories)  d.incomeCategories  = JSON.parse(JSON.stringify(DEFAULT_DATA.incomeCategories));
    // migrate dueDay → dueDate
    if (d.budget && d.budget.expenses) {
      const now = new Date();
      d.budget.expenses.forEach(e => {
        if (e.dueDay && !e.dueDate) {
          const y = now.getFullYear(), mo = now.getMonth() + 1;
          const day = Math.min(e.dueDay, new Date(y, mo, 0).getDate());
          e.dueDate = `${y}-${String(mo).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          delete e.dueDay;
        }
        if (e.frequency === 'annual') e.frequency = 'annually';
      });
    }
    return d;
  } catch(e) { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}

function saveData(data) {
  sanitiseState(data);
  if (_pendingLogEntry) {
    if (!data.activityLog) data.activityLog = [];
    data.activityLog.unshift(_pendingLogEntry);
    if (data.activityLog.length > 200) data.activityLog.length = 200;
    _pendingLogEntry = null;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  if (_currentUser) {
    const _docRef = _getHouseholdDocRef();
    if (_docRef) _docRef.set(data).catch(err => {
      console.error('Firestore save error:', err);
    });
  }
}
// Expose so store.js setState() can call it without a circular import
window._saveData = saveData;

// ─── Household Access ──────────────────────────────
// ─── Device Registration Model ─────────────────────
const DEVICE_KEY      = 'toto_device_profile';  // 'adult' | 'shared' | kidId
const KID_SESSION_KEY = 'toto_kid_session';      // kidId persisted so kid stays logged in

let _activeProfile      = null;  // null = adult, or { id, name, emoji, role:'child' }
let _deviceRoutingDone  = false; // prevent re-running on every Firestore update
let _pinAttempts        = 0;
let _pinLockUntil       = 0;
let _pinBuffer          = '';
let _pinTargetId        = null;

// ── Secure storage abstraction ───────────────────────────────────────────────
// On iOS (Capacitor native) we write to the Keychain via @capacitor/preferences.
// On web we fall back to localStorage. Reads are synchronous (from an in-memory
// cache pre-warmed at startup); writes are fire-and-forget async to both stores.
const _secureCache = {};

function _capacitorPrefs() {
  return window.Capacitor?.Plugins?.Preferences ?? null;
}

async function _securePrewarm(keys) {
  const prefs = _capacitorPrefs();
  for (const key of keys) {
    if (prefs) {
      try {
        const { value } = await prefs.get({ key });
        _secureCache[key] = value;
      } catch(_) {
        _secureCache[key] = localStorage.getItem(key);
      }
    } else {
      _secureCache[key] = localStorage.getItem(key);
    }
  }
}

function _secureGet(key)       { return key in _secureCache ? _secureCache[key] : localStorage.getItem(key); }
function _secureSet(key, val)  {
  _secureCache[key] = val;
  localStorage.setItem(key, val);
  const prefs = _capacitorPrefs();
  if (prefs) prefs.set({ key, value: val }).catch(() => {});
}
function _secureClear(key)     {
  delete _secureCache[key];
  localStorage.removeItem(key);
  const prefs = _capacitorPrefs();
  if (prefs) prefs.remove({ key }).catch(() => {});
}

function getDeviceProfile()      { return _secureGet(DEVICE_KEY); }
function setDeviceProfile(val)   { _secureSet(DEVICE_KEY, val); }
function clearDeviceProfile()    { _secureClear(DEVICE_KEY); }
function getKidSession()         { return _secureGet(KID_SESSION_KEY); }
function setKidSession(kidId)    { _secureSet(KID_SESSION_KEY, String(kidId)); }
function clearKidSession()       { _secureClear(KID_SESSION_KEY); }

// Pre-warm cache immediately so synchronous getters work by the time auth resolves.
_securePrewarm([HOUSEHOLD_OWNER_KEY, DEVICE_KEY, KID_SESSION_KEY]);

async function _hashPin(pin, salt) {
  // Salt should be the household owner UID so the same PIN hashes differently per household.
  // 'toto-pin-' kept as fallback for legacy hashes before UID was available.
  const saltStr = salt || 'toto-pin-';
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(saltStr + pin));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// Called after Firestore loads — runs only once per sign-in session.
function handleDeviceRouting() {
  if (_deviceRoutingDone) return;
  if (!state.onboarded) return;
  _deviceRoutingDone = true;
  const device = getDeviceProfile();

  if (!device) { showDeviceSetup(); return; }

  if (device === 'adult') {
    _activeProfile = null;
    _updateSwitchBtn();
    return; // straight into app — renderAll already called by Firestore callback
  }

  if (device === 'shared') {
    showProfileSelector();
    return;
  }

  // It's a specific kid's device
  const kid = (state.kids?.profiles || []).find(k => k.id === device);
  if (!kid) { clearDeviceProfile(); showDeviceSetup(); return; }

  // If they already logged in this session, skip PIN
  if (String(getKidSession()) === String(kid.id)) {
    _activeProfile = { id: kid.id, name: kid.name, emoji: kid.emoji, role: 'child' };
    _applyActiveProfile();
    return;
  }

  // Need PIN (or go straight in if no PIN set)
  if (kid.pinHash) {
    _pinTargetId = kid.id;
    _pinBuffer   = '';
    _pinAttempts = 0;
    _showPinScreen(kid);
  } else {
    _activeProfile = { id: kid.id, name: kid.name, emoji: kid.emoji, role: 'child' };
    setKidSession(kid.id);
    _applyActiveProfile();
  }
}

// "Who uses this device?" — shown once per device
function showDeviceSetup() {
  const members = state.householdProfile?.members || [];
  const adults  = members.filter(m => m.role === 'adult' && m.name);
  const kids    = state.kids?.profiles || [];

  let rows = '';

  // Always show an Adult option
  const adultLabel = adults.length ? adults.map(a => a.name).join(' / ') : 'Adult';
  rows += `<div class="profile-card" onclick="assignDevice('adult')">
    <div class="profile-avatar">👤</div>
    <div style="flex:1">
      <div style="font-size:15px;font-weight:700;color:#1e293b">${escHtml(adultLabel)}</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">Adult — opens straight to the full app</div>
    </div>
  </div>`;

  kids.forEach(kid => {
    rows += `<div class="profile-card" onclick="assignDevice('${kid.id}')">
      <div class="profile-avatar">${escHtml(kid.emoji||'😊')}</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${escHtml(kid.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">Kid's device — ${kid.pinHash ? 'requires PIN to open' : 'no PIN set yet'}</div>
      </div>
    </div>`;
  });

  if (!kids.length) {
    rows += `<div style="padding:12px 16px;background:#fef9c3;border-radius:10px;font-size:13px;color:#854d0e">No kids set up yet. Add kids in the Kids tab first, then assign a device.</div>`;
  }

  rows += `<div class="profile-card" onclick="assignDevice('shared')" style="border-style:dashed">
    <div class="profile-avatar">👨‍👩‍👧‍👦</div>
    <div style="flex:1">
      <div style="font-size:15px;font-weight:700;color:#1e293b">Everyone (shared)</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">Shows profile picker every time the app opens</div>
    </div>
  </div>`;

  document.getElementById('profile-list').innerHTML = rows;
  document.getElementById('profile-overlay-title').textContent = 'Who uses this device?';
  document.getElementById('profile-overlay-sub').textContent   = 'Set it once — the app will open straight to the right view. You can change this any time in Settings.';
  document.getElementById('profile-overlay').classList.remove('hidden');
}

function assignDevice(val) {
  setDeviceProfile(val);
  _deviceRoutingDone = true; // prevent auto-routing from overriding this choice
  document.getElementById('profile-overlay').classList.add('hidden');

  if (val === 'adult') {
    _activeProfile = null;
    _updateSwitchBtn();
    renderAll();
  } else if (val === 'shared') {
    showProfileSelector();
  } else {
    // Kid device — go to PIN or straight in
    const kid = (state.kids?.profiles || []).find(k => k.id === val);
    if (!kid) {
      // Kid deleted since assignment — fall back to adult view
      _activeProfile = null;
      _applyChildNav();
      renderAll();
      return;
    }
    if (kid.pinHash) {
      _pinTargetId = kid.id; _pinBuffer = ''; _pinAttempts = 0;
      _showPinScreen(kid);
    } else {
      _activeProfile = { id: kid.id, name: kid.name, emoji: kid.emoji, role: 'child' };
      setKidSession(kid.id);
      _applyActiveProfile();
    }
  }
}

// Shared-device profile picker (shown each time on shared devices)
function showProfileSelector() {
  document.getElementById('pin-overlay').classList.add('hidden');
  const members = state.householdProfile?.members || [];
  const adults  = members.filter(m => m.role === 'adult' && m.name);
  const kids    = state.kids?.profiles || [];

  let rows = '';
  adults.forEach((m, i) => {
    const hasPin = !!m.pinHash;
    rows += `<div class="profile-card" onclick="_pickAdult(${i})">
      <div class="profile-avatar">🧑</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${escHtml(m.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">${i===0?'Owner':'Member'} · ${hasPin ? 'PIN login' : 'Tap to enter'}</div>
      </div>
      <div style="font-size:12px;color:#0891b2;font-weight:600">${hasPin ? 'PIN →' : 'Enter →'}</div>
    </div>`;
  });
  kids.forEach(kid => {
    rows += `<div class="profile-card" onclick="_pickKid('${kid.id}')">
      <div class="profile-avatar">${escHtml(kid.emoji||'😊')}</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${escHtml(kid.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">Kid · ${kid.pinHash?'PIN login':'Tap to enter'}</div>
      </div>
      <div style="font-size:12px;color:#0891b2;font-weight:600">${kid.pinHash?'PIN →':'Enter →'}</div>
    </div>`;
  });

  document.getElementById('profile-list').innerHTML = rows;
  document.getElementById('profile-overlay-title').textContent = "Who's using Toto?";
  document.getElementById('profile-overlay-sub').textContent   = 'Tap your name to continue';
  document.getElementById('profile-overlay').classList.remove('hidden');
}

function _pickAdult(memberIndex) {
  const members = state.householdProfile?.members || [];
  const adults  = members.filter(m => m.role === 'adult' && m.name);
  const m = adults[memberIndex ?? 0];
  if (m?.pinHash) {
    _pinTargetId   = 'adult:' + (memberIndex ?? 0);
    _pinBuffer     = '';
    _pinAttempts   = 0;
    _pinLockUntil  = 0;
    _showPinScreen({ emoji: '🧑', name: m.name, _isAdult: true, _memberIndex: memberIndex ?? 0 });
    return;
  }
  _activeProfile = null;
  clearKidSession();
  document.getElementById('profile-overlay').classList.add('hidden');
  _applyActiveProfile();
}

function _pickKid(kidId) {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (!kid) return;
  if (kid.pinHash) {
    _pinTargetId = kidId; _pinBuffer = ''; _pinAttempts = 0;
    _showPinScreen(kid);
  } else {
    _activeProfile = { id: kid.id, name: kid.name, emoji: kid.emoji, role: 'child' };
    setKidSession(kid.id);
    document.getElementById('profile-overlay').classList.add('hidden');
    _applyActiveProfile();
  }
}

function _showPinScreen(profile) {
  document.getElementById('profile-overlay').classList.add('hidden');
  document.getElementById('pin-avatar').textContent    = profile.emoji || (profile._isAdult ? '🧑' : '😊');
  document.getElementById('pin-greeting').textContent  = `Hi ${profile.name}! 👋`;
  document.getElementById('pin-sub').textContent       = 'Enter your PIN to continue';
  document.getElementById('pin-error').textContent     = '';
  _renderPinDots();
  _renderPinPad();
  document.getElementById('pin-overlay').classList.remove('hidden');
}

function _renderPinDots() {
  const el = document.getElementById('pin-dots');
  if (!el) return;
  el.innerHTML = [0,1,2,3].map(i =>
    `<div class="pin-dot ${i < _pinBuffer.length ? 'filled' : ''}">${i < _pinBuffer.length ? '●' : ''}</div>`
  ).join('');
}

function _renderPinPad() {
  const el = document.getElementById('pin-pad');
  if (!el) return;
  const now = Date.now();
  const locked = now < _pinLockUntil;
  if (locked) {
    const secs = Math.ceil((_pinLockUntil - now) / 1000);
    document.getElementById('pin-error').textContent = `Too many attempts — try again in ${secs}s`;
    el.innerHTML = '';
    setTimeout(_renderPinPad, 1000);
    return;
  }
  el.innerHTML = [1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k =>
    k === '' ? `<div class="pin-key empty"></div>`
             : `<div class="pin-key" onclick="_pinKey('${k}')">${k}</div>`
  ).join('');
}

function _pinKey(k) {
  if (Date.now() < _pinLockUntil) return;
  if (k === '⌫') { _pinBuffer = _pinBuffer.slice(0,-1); _renderPinDots(); return; }
  if (_pinBuffer.length >= 4) return;
  _pinBuffer += k;
  _renderPinDots();
  if (_pinBuffer.length === 4) _verifyPin();
}

function _updateSwitchBtn() {
  const btn = document.getElementById('header-switch-profile');
  if (!btn) return;
  const device = getDeviceProfile();
  // Show switch button on kid devices (so parent can take over) and shared devices
  btn.style.display = (device && device !== 'adult') ? '' : 'none';
}

function _applyActiveProfile() {
  _updateSwitchBtn();
  _applyChildNav();
  if (_activeProfile?.role === 'child') {
    window.kidsView = _activeProfile.id;
    activateTab('kids');
    showChildView(_activeProfile.id);
  } else {
    // Restore all nav items when switching back to adult
    document.querySelectorAll('.nav-item, .nav-text-item').forEach(el => el.style.display = '');
  }
  renderAll();
}

function _applyChildNav() {
  const isKid = _activeProfile?.role === 'child';
  document.body.classList.toggle('kid-mode', isKid);

  const label = document.getElementById('kid-banner-label');
  if (label && isKid) {
    label.textContent = `${_activeProfile.emoji || '😊'} ${_activeProfile.name}'s view`;
  }

  const device = getDeviceProfile();
  const switchBtn = document.getElementById('header-switch-profile');
  if (switchBtn) {
    const show = device && device !== 'adult';
    switchBtn.style.display = show ? '' : 'none';
    if (show) {
      if (isKid) {
        switchBtn.textContent = '👨‍👩‍👧 Parent';
      } else {
        const kid = (state.kids?.profiles || []).find(k => k.id === device);
        switchBtn.textContent = kid ? `Back to ${kid.name}` : 'Switch';
      }
    }
  }
}

// "Switch" — two-way toggle depending on current state
function switchProfile() {
  const device = getDeviceProfile();

  if (_activeProfile?.role === 'child') {
    // Currently in kid mode → give parent temporary access
    clearKidSession();
    _activeProfile = null;
    _applyChildNav();
    renderAll();
  } else {
    // Currently in adult mode → hand back to the assigned profile
    if (device === 'shared') {
      showProfileSelector();
    } else if (device && device !== 'adult') {
      const kid = (state.kids?.profiles || []).find(k => k.id === device);
      if (kid) {
        if (kid.pinHash) {
          _pinTargetId = kid.id;
          _pinBuffer = '';
          _pinAttempts = 0;
          _showPinScreen(kid);
        } else {
          _activeProfile = { id: kid.id, name: kid.name, emoji: kid.emoji, role: 'child' };
          setKidSession(kid.id);
          _applyActiveProfile();
        }
      }
    }
  }
}

async function setKidPin(kidId, pin) {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (!kid || pin.length !== 4) return;
  kid.pinHash = await _hashPin(pin, _getHouseholdOwnerUID());
  saveData(state);
}

function clearKidPin(kidId) {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (!kid) return;
  delete kid.pinHash;
  saveData(state);
}

// ── Adult PIN ─────────────────────────────────────────
function setAdultPin(adultIndex) {
  const adults = (state.householdProfile?.members || []).filter(m => m.role === 'adult' && m.name);
  const m = adults[adultIndex];
  if (!m) return;
  _adultPinTarget = adultIndex;
  _adultPinFirst  = '';
  _adultPinBuf    = '';
  _adultPinStep   = 'enter';
  _renderAdultPinModal();
  document.getElementById('adult-pin-modal').classList.remove('hidden');
}

function clearAdultPin(adultIndex) {
  const adults = (state.householdProfile?.members || []).filter(m => m.role === 'adult' && m.name);
  if (!adults[adultIndex]) return;
  delete adults[adultIndex].pinHash;
  saveData(state);
  renderSettings();
}

let _adultPinTarget = 0;
let _adultPinStep   = 'enter'; // enter | confirm
let _adultPinFirst  = '';
let _adultPinBuf    = '';

function _renderAdultPinModal() {
  const adults = (state.householdProfile?.members || []).filter(m => m.role === 'adult' && m.name);
  const m = adults[_adultPinTarget];
  if (!m) return;
  const isEnter  = _adultPinStep === 'enter';
  const title    = isEnter ? (m.pinHash ? 'Change your PIN 🔢' : 'Set your PIN 🔢') : 'Confirm your PIN ✅';
  const sub      = isEnter ? 'Pick 4 numbers — used on shared devices' : 'Enter it again to confirm';
  const dotsHtml = [0,1,2,3].map(i => {
    const filled = i < _adultPinBuf.length;
    return `<div style="width:52px;height:60px;border:2px solid ${filled?'#0891b2':'#e2e8f0'};border-radius:10px;background:${filled?'#ecfeff':'#f8fafc'};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#0891b2">${filled?'●':''}</div>`;
  }).join('');
  const padHtml = [1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k =>
    k === '' ? `<div></div>`
             : `<div onclick="_adultPinKey('${k}')" style="height:52px;border:1.5px solid #e2e8f0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;color:#374151;cursor:pointer;background:#fff;-webkit-tap-highlight-color:transparent;user-select:none">${k}</div>`
  ).join('');

  document.getElementById('adult-pin-modal-body').innerHTML = `
    <div style="font-size:40px;margin-bottom:12px">${isEnter ? '🔢' : '✅'}</div>
    <div style="font-size:18px;font-weight:700;color:#1e293b;margin-bottom:6px">${title}</div>
    <div style="font-size:13px;color:#64748b;margin-bottom:20px">${sub}</div>
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px">${dotsHtml}</div>
    <div id="adult-pin-error" style="font-size:13px;color:#ef4444;min-height:18px;margin-bottom:12px"></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:220px;margin:0 auto 20px">${padHtml}</div>
    <button onclick="document.getElementById('adult-pin-modal').classList.add('hidden')" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`;
}

function _adultPinKey(k) {
  if (k === '⌫') { _adultPinBuf = _adultPinBuf.slice(0, -1); _renderAdultPinModal(); return; }
  if (_adultPinBuf.length >= 4) return;
  _adultPinBuf += k;
  _renderAdultPinModal();
  if (_adultPinBuf.length === 4) _adultPinSubmit();
}

async function _adultPinSubmit() {
  if (_adultPinStep === 'enter') {
    _adultPinFirst = _adultPinBuf;
    _adultPinBuf   = '';
    _adultPinStep  = 'confirm';
    _renderAdultPinModal();
  } else {
    if (_adultPinBuf !== _adultPinFirst) {
      _adultPinBuf = ''; _adultPinFirst = ''; _adultPinStep = 'enter';
      _renderAdultPinModal();
      const err = document.getElementById('adult-pin-error');
      if (err) err.textContent = "Those didn't match — try again";
      return;
    }
    const adults = (state.householdProfile?.members || []).filter(m => m.role === 'adult' && m.name);
    adults[_adultPinTarget].pinHash = await _hashPin(_adultPinBuf, _getHouseholdOwnerUID());
    saveData(state);
    document.getElementById('adult-pin-modal').classList.add('hidden');
    renderSettings();
  }
}

// ── Child View — Section 7 ────────────────────────────
// All functions here apply to child profiles only.

function _cvAgeBracket(kid) {
  const age = Number(kid.age || 0);
  if (age < 5)  return 'tiny-tots';
  if (age < 8)  return 'early-reader';
  if (age < 12) return 'independent';
  return 'tween';
}

function _cvTimeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// Returns true if routine's time window is currently active.
// Active = current hour >= triggerTime hour AND < triggerTime hour + 6.
// If no triggerTime, treat as always active.
function _cvRoutineIsActive(routine) {
  if (!routine.triggerTime) return true;
  const [trigH, trigM] = routine.triggerTime.split(':').map(Number);
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const startMins = trigH * 60 + (trigM || 0);
  const endMins   = startMins + 360; // 6-hour window
  return nowMins >= startMins && nowMins < endMins;
}

function _cvRoutineAvailLabel(routine) {
  if (!routine.triggerTime) return '';
  const [trigH] = routine.triggerTime.split(':').map(Number);
  if (trigH < 12) return 'Available this morning';
  if (trigH < 17) return 'Available this afternoon';
  return 'Available tonight';
}

// Fires confetti burst inside the overlay
function _cvConfetti() {
  const ov = document.getElementById('child-view-overlay');
  if (!ov) return;
  let wrap = document.getElementById('cv-confetti-wrap');
  if (wrap) wrap.remove();
  wrap = document.createElement('div');
  wrap.id = 'cv-confetti-wrap';
  wrap.className = 'cv2-confetti-wrap';
  ov.appendChild(wrap);
  const colors = ['#5B4CF5','#7C3AED','#F59E0B','#10B981','#F43F5E','#FBBF24'];
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'cv2-confetti-particle';
    p.style.cssText = `
      left:${Math.random()*100}%;
      background:${colors[i % colors.length]};
      width:${6 + Math.random()*8}px;
      height:${6 + Math.random()*8}px;
      animation-duration:${1.4 + Math.random()*1.4}s;
      animation-delay:${Math.random()*0.6}s;
    `;
    wrap.appendChild(p);
  }
  setTimeout(() => { if (wrap.parentNode) wrap.remove(); }, 3500);
}

function showChildView(kidId) {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (!kid) return;

  _cvActiveKidId = kidId;
  _cvActiveTab   = 'today';
  const k       = state.kids;
  const bal     = kidBalance(k, kid.id);
  const bracket = _cvAgeBracket(kid);
  const isTiny  = bracket === 'tiny-tots';
  const isTween = bracket === 'tween';
  // In read-only mode all interactive buttons/taps are disabled
  const ro      = _cvReadOnly;

  // Header
  const ov = document.getElementById('child-view-overlay');
  document.getElementById('cv-avatar').textContent   = kid.emoji || '😊';
  document.getElementById('cv-name').innerHTML       = `<span class="ember-text">${escHtml(kid.name)}</span>`;
  document.getElementById('cv-greeting').textContent = _cvTimeGreeting() + '!';

  // Points nudge (hidden for Tiny Tots; read-only doesn't show nudge)
  const earnedToday = (k.completions || []).filter(c =>
    c.kidId === kid.id && c.status === 'approved' &&
    new Date(c.completedAt || c.ts).toDateString() === new Date().toDateString()
  ).reduce((sum, c) => {
    const chore = (k.chores || []).find(ch => ch.id === c.choreId);
    return sum + (chore?.points || 0);
  }, 0);
  const nudgeEl = document.getElementById('cv-nudge');
  if (earnedToday > 0 && !isTiny && !ro) {
    nudgeEl.textContent = `You've earned ⭐ ${earnedToday} points today — keep going!`;
    nudgeEl.style.display = '';
  } else {
    nudgeEl.style.display = 'none';
  }

  // Age bracket class on overlay
  ov.className = ov.className.replace(/cv2-age-\S+/g, '').trim();
  if (bracket === 'early-reader') ov.classList.add('cv2-age-early');
  if (isTiny)  ov.classList.add('cv2-age-tiny');
  if (isTween) ov.classList.add('cv2-age-tween');

  // Show/hide nav bar; reset to Today tab
  const navEl = document.getElementById('cv-nav');
  if (navEl) navEl.style.display = isTiny ? 'none' : '';
  document.getElementById('cv-nav-today')?.classList.add('active');
  document.getElementById('cv-nav-calendar')?.classList.remove('active');
  document.getElementById('cv-nav-prizes')?.classList.remove('active');
  // Update prizes badge
  _cvUpdatePrizesBadge(kid);

  // ── ROUTINES START ── child view section
  const todayStr      = new Date().toISOString().slice(0, 10);
  const myAssignments = (state.routineAssignments || []).filter(a => {
    if (a.childId !== kid.id) return false;
    const r = (state.routines || []).find(r => r.id === a.routineId);
    return r && _routineMatchesDate(r, todayStr);
  });
  const todayKey      = _routineTodayKey();
  let routinesHtml    = '';
  let totalTasksDone  = 0;
  let totalTasks      = 0;

  if (myAssignments.length) {
    myAssignments.forEach(assignment => {
      const routine = (state.routines || []).find(r => r.id === assignment.routineId);
      if (!routine) return;
      const done    = assignment.completionState?.[todayKey] || [];
      const total   = routine.steps.length;
      const pct     = total > 0 ? Math.round(done.length / total * 100) : 0;
      const allDone = done.length === total && total > 0;
      const active  = _cvRoutineIsActive(routine);
      totalTasks    += total;
      totalTasksDone += done.length;

      const lockLabel   = active ? '' : _cvRoutineAvailLabel(routine);
      const streak      = _assignmentStreak(assignment, total);
      // Count fully-completed days in the last 7 (excluding today) for history nudge
      const last7       = _assignmentHistory(assignment, total, 7);
      const completedDaysLast7 = last7.filter(h => h.done === h.total && h.total > 0).length;
      routinesHtml += `<div class="cv2-card${active ? '' : ' cv2-card--locked'}" style="margin-bottom:10px">
        <div class="cv2-routine-header">
          <div class="cv2-routine-title">
            <span>${routine.emoji}</span>
            <span class="cv2-routine-name">${escHtml(routine.name)}</span>
            ${streak > 0 && !isTiny ? `<span style="font-size:11px;font-weight:700;color:#f59e0b;background:#fffbeb;border-radius:99px;padding:2px 8px">🔥 ${streak}d</span>` : ''}
          </div>
          ${active
            ? `<span class="cv2-routine-frac">${done.length}/${total}${routine.pointsPerCompletion > 0 ? ` · ⭐${routine.pointsPerCompletion}` : ''}</span>`
            : `<span class="cv2-routine-lock">🔒 ${escHtml(lockLabel)}</span>`
          }
        </div>
        <div class="cv2-progress"><div class="cv2-progress-fill" style="width:${pct}%"></div></div>
        ${completedDaysLast7 > 0 && !isTiny ? `<div style="padding:4px 16px 0;font-size:11px;color:#94a3b8">Completed ${completedDaysLast7} of the last 7 days</div>` : ''}
        <div class="cv2-steps">`;

      if (!total) {
        routinesHtml += `<div style="padding:12px 16px;font-size:13px;color:#94a3b8;text-align:center">No steps added yet</div>`;
      } else {
        routine.steps.forEach(step => {
          const isDone  = done.includes(step.id);
          const canTick = active && !ro;
          const check   = isDone
            ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`
            : '';
          routinesHtml += `<div class="cv2-step${canTick ? '' : ''}" style="${canTick ? '' : 'cursor:default'}"
            ${canTick ? `onclick="_routineToggleStepKid(${JSON.stringify(routine.id)},${JSON.stringify(step.id)},'${kid.id}')"` : ''}>
            <div class="cv2-step-check${isDone ? ' cv2-step-check--done' : ''}">${check}</div>
            <span class="cv2-step-emoji">${step.emoji}</span>
            <span class="cv2-step-label${isDone ? ' cv2-step-label--done' : ''}">${escHtml(step.label)}</span>
            ${step.points > 0 && !isTiny ? `<span class="cv2-step-pts">⭐ ${step.points}</span>` : ''}
          </div>`;
        });
      }

      routinesHtml += `</div>`;
      if (allDone) {
        const streak = _assignmentStreak(assignment, total);
        const streakMsg = streak > 1 ? ` · 🔥 ${streak} day streak!` : '';
        routinesHtml += `<div class="cv2-routine-done">✓ All done! Great work${routine.pointsPerCompletion > 0 && !isTiny ? ` · ⭐ ${routine.pointsPerCompletion} bonus pts` : ''}!${streakMsg}</div>`;
      } else if (active) {
        // Show streak under routine header if they have one going
        const streak = _assignmentStreak(assignment, total);
        if (streak > 0 && !isTiny) {
          routinesHtml += `<div style="padding:4px 16px 8px;font-size:11px;font-weight:700;color:#f59e0b">🔥 ${streak} day streak — keep it up!</div>`;
        }
      }
      routinesHtml += `</div>`;
    });
  }
  // ── ROUTINES END ── child view section

  // Chores (hidden if none)
  const myChores = (k.chores || []).filter(c =>
    (c.assignedTo === kid.id || c.assignedTo === 'all') && !c._isRoutine
  );
  const pending = (k.completions || []).filter(c => c.kidId === kid.id && c.status === 'pending');
  totalTasks    += myChores.length;
  totalTasksDone += myChores.filter(ch => pending.some(p => p.choreId === ch.id)).length;

  let choresHtml = '';
  if (myChores.length) {
    myChores.forEach(ch => {
      const isDone = pending.some(p => p.choreId === ch.id);
      choresHtml += `<div class="cv2-chore">
        <span class="cv2-chore-emoji">${ch.emoji || '📋'}</span>
        <div class="cv2-chore-info">
          <div class="cv2-chore-name">${escHtml(ch.name)}</div>
          ${!isTiny ? `<div class="cv2-chore-pts">⭐ ${ch.points} · ${ch.frequency}</div>` : ''}
        </div>
        ${isDone
          ? `<span class="cv2-chore-done-badge">${isTiny ? '⭐' : 'Waiting ✓'}</span>`
          : ro
            ? `<span class="cv2-chore-done-badge" style="background:#F0EFF8;color:#A1A1AA">Not done</span>`
            : `<button class="cv2-chore-btn" onclick="markChoreChildView('${kid.id}','${ch.id}')">${isTiny ? '✅' : 'Done ✓'}</button>`
        }
      </div>`;
    });
  }

  // Lunchbox (hidden if nothing entered today)
  // Resolve lunchbox profile: match by kid.id first, then fall back to matching by name
  const weekKey  = _mealWeekKey(0);
  const dow      = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const lbPlans  = state.meals?.lunchbox?.plans?.[weekKey] || {};
  const lbProfId = lbPlans[kid.id] !== undefined ? kid.id
    : ((state.meals?.lunchbox?.profiles || []).find(p =>
        p.name?.toLowerCase() === kid.name?.toLowerCase())?.id ?? kid.id);
  const dayPlan  = (lbPlans[lbProfId]?.[dow]) || {};
  const lbSlots  = ['main','snack','fruit','drink'];
  const lbItems  = lbSlots.map(s => dayPlan[s]).filter(Boolean);
  const slotEmojis = { main:'🥪', snack:'🍪', fruit:'🍎', drink:'🥤' };
  let lbHtml = '';
  if (lbItems.length) {
    let chips = '';
    lbSlots.forEach(s => {
      if (!dayPlan[s]) return;
      chips += `<div class="cv2-lb-chip">${slotEmojis[s]}${isTiny ? '' : ' ' + escHtml(dayPlan[s])}</div>`;
    });
    lbHtml = `<div class="cv2-group">
      <div class="cv2-group-heading">🥪 Lunchbox</div>
      <div class="cv2-card cv2-card--warm">
        <div class="cv2-lb-chips">${chips}</div>
      </div>
    </div>`;
  }

  // Today's events (child events + everyone planner events, sorted by time, hidden if none)
  const { events: todayEvents } = _cvEventsForDate(kid, todayStr);
  const sortedEvents = [...todayEvents].sort((a,b) => (a.time||'99:99').localeCompare(b.time||'99:99'));
  let eventsHtml = '';
  if (sortedEvents.length && !isTiny) {
    let rows = sortedEvents.map(ev => `
      <div class="cv2-event-row">
        <span class="cv2-event-time">${ev.time ? _cvFmt12h(ev.time) : ''}</span>
        <div class="cv2-event-bar"></div>
        <span class="cv2-event-emoji">${ev.emoji}</span>
        <div class="cv2-event-body">
          <div class="cv2-event-title">${escHtml(ev.label)}</div>
          ${ev.notes ? `<div class="cv2-event-sub">${escHtml(ev.notes)}</div>` : ''}
        </div>
      </div>`).join('');
    eventsHtml = `<div class="cv2-group">
      <div class="cv2-group-heading">📅 Today's Events</div>
      <div class="cv2-card">${rows}</div>
    </div>`;
  }

  // Prizes teaser — tap to go to Prizes tab (shown for non-tiny, non-read-only)
  const prizes = k.prizes || [];
  const affordable = prizes.filter(pr => bal >= pr.pointCost);
  let prizeStoreHtml = '';
  if (!isTiny) {
    const teaserContent = affordable.length
      ? `<div style="display:flex;align-items:center;gap:10px;padding:14px 15px">
          <span style="font-size:28px">${affordable[0].emoji || '🎁'}</span>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:700;color:#18181B">You can afford ${affordable.length} prize${affordable.length>1?'s':''}!</div>
            <div style="font-size:11px;color:#A1A1AA;margin-top:1px">⭐ ${bal} pts · Tap to visit the Prize Store</div>
          </div>
          <span style="font-size:18px;color:#94a3b8">›</span>
        </div>`
      : `<div style="display:flex;align-items:center;gap:10px;padding:14px 15px">
          <span style="font-size:28px">🏆</span>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:700;color:#18181B">Prize Store</div>
            <div style="font-size:11px;color:#A1A1AA;margin-top:1px">⭐ ${bal} pts · Keep earning!</div>
          </div>
          <span style="font-size:18px;color:#94a3b8">›</span>
        </div>`;
    prizeStoreHtml = `<div class="cv2-group">
      <div class="cv2-group-heading">🏆 Prizes</div>
      <div class="cv2-card cv2-card--warm" style="cursor:pointer" onclick="_cvSwitchTab('prizes','${kid.id}')">
        ${teaserContent}
      </div>
    </div>`;
  }

  // Prize / chore approval notifications (unread for this kid)
  const notifs = (k.notifications || []).filter(n => n.kidId === kid.id && !n.read);
  let notifHtml = '';
  if (notifs.length && !ro) {
    notifHtml = notifs.map(n => {
      const approved = n.type === 'prize_approved';
      const cls      = approved ? 'cv2-notif-bar--approved' : 'cv2-notif-bar--declined';
      const msg      = approved
        ? `${n.prizeEmoji} <strong>${escHtml(n.prizeName)}</strong> approved! You can redeem it now.`
        : `${n.prizeEmoji} <strong>${escHtml(n.prizeName)}</strong> request was declined.`;
      return `<div class="cv2-notif-bar ${cls}">
        <span>${msg}</span>
        <button class="cv2-notif-dismiss" onclick="_cvDismissNotif('${n.id}','${kid.id}')">×</button>
      </div>`;
    }).join('');
  }

  // Check full-day celebration (all routines + chores done)
  const allDoneToday = totalTasks > 0 && totalTasksDone === totalTasks;

  let mainHtml;
  if (allDoneToday && !ro) {
    mainHtml = `<div class="cv2-celebration">
      <div class="cv2-celeb-emoji">${isTiny ? '🌟' : '🏆'}</div>
      <div class="cv2-celeb-title">${isTiny ? '🎉 Yay!' : `Amazing work, ${escHtml(kid.name)}!`}</div>
      <div class="cv2-celeb-sub">${isTiny ? 'All done! You\'re a star!' : 'You\'ve finished everything for today. You\'re a superstar! ⭐'}</div>
    </div>
    ${eventsHtml}${lbHtml}${prizeStoreHtml}`;
  } else {
    mainHtml = notifHtml;
    if (bracket !== 'tiny-tots' && !ro) {
      mainHtml += `<button class="cv2-week-shortcut" onclick="_cvSwitchTab('calendar','${kid.id}')">📅 See my week →</button>`;
    }
    if (myAssignments.length) {
      mainHtml += `<div class="cv2-group">
        <div class="cv2-group-heading">📋 My Routines</div>
        ${routinesHtml}
      </div>`;
    }
    if (myChores.length) {
      mainHtml += `<div class="cv2-group">
        <div class="cv2-group-heading">🧹 Chores</div>
        <div class="cv2-card">${choresHtml}</div>
      </div>`;
    }
    mainHtml += eventsHtml;
    mainHtml += lbHtml;
    mainHtml += prizeStoreHtml;
  }

  document.getElementById('cv-content').innerHTML = mainHtml;

  ov.classList.remove('hidden');
  ov.style.display = 'flex';

  if (allDoneToday && !ro) _cvConfetti();
}

// ── Prizes tab ──────────────────────────────────────────────────

function _cvUpdatePrizesBadge(kid) {
  const badgeEl = document.getElementById('cv-prizes-badge');
  if (!badgeEl) return;
  const k = state.kids;
  const bal = kidBalance(k, kid.id);
  const unreadNotifs = (k.notifications || []).filter(n => n.kidId === kid.id && !n.read).length;
  const newlyAffordable = (k.prizes || []).filter(p => bal >= p.pointCost).length;
  const count = unreadNotifs + (newlyAffordable > 0 && unreadNotifs === 0 ? newlyAffordable : 0);
  if (count > 0) {
    badgeEl.textContent = count > 9 ? '9+' : String(count);
    badgeEl.style.display = '';
  } else {
    badgeEl.style.display = 'none';
  }
}

function _cvRenderPrizesTab(kid) {
  const k   = state.kids;
  const bal = kidBalance(k, kid.id);
  const bracket = _cvAgeBracket(kid);
  const isTiny  = bracket === 'tiny-tots';
  const ro      = _cvReadOnly;
  const prizes  = k.prizes || [];

  // Mark notifications as read when the user visits Prizes tab
  let notifsDirty = false;
  (k.notifications || []).filter(n => n.kidId === kid.id && !n.read).forEach(n => {
    n.read = true; notifsDirty = true;
  });
  if (notifsDirty) saveData(state);
  _cvUpdatePrizesBadge(kid);

  const balDisplay = isTiny
    ? `${'⭐'.repeat(Math.min(bal, 10))}${bal > 10 ? '+' : ''}`
    : `${bal}`;

  // Balance hero
  let html = `<div class="cv2-prizes-balance">
    <div class="cv2-prizes-balance-left">
      <div class="cv2-prizes-balance-pts">${isTiny ? balDisplay : `⭐ ${balDisplay}`}</div>
      <div class="cv2-prizes-balance-lbl">${isTiny ? 'stars earned' : 'points to spend'}</div>
    </div>
    <span class="cv2-prizes-balance-emoji">🏆</span>
  </div>`;

  // Prize list
  html += `<div class="cv2-group-heading" style="margin-bottom:8px">Prizes</div>`;
  if (!prizes.length) {
    html += `<div style="text-align:center;padding:24px 0;color:#A1A1AA;font-size:13px">No prizes set up yet</div>`;
  } else {
    html += `<div class="cv2-card cv2-card--warm" style="margin-bottom:18px">`;
    prizes.forEach(pr => {
      const canAfford = bal >= pr.pointCost;
      html += `<div class="cv2-prize">
        <span class="cv2-prize-emoji">${pr.emoji || '🎁'}</span>
        <div class="cv2-prize-info">
          <div class="cv2-prize-name">${escHtml(pr.name)}</div>
          ${!isTiny ? `<div class="cv2-prize-cost">⭐ ${pr.pointCost} points</div>` : ''}
        </div>
        <button class="cv2-prize-btn ${canAfford ? 'cv2-prize-btn--can' : 'cv2-prize-btn--cant'}"
          ${canAfford && !ro ? `onclick="_cvShowPrizeConfirm('${kid.id}','${pr.id}')"` : 'disabled'}>
          ${canAfford ? (isTiny ? '🎁' : 'Redeem') : (isTiny ? '🔒' : `⭐ ${pr.pointCost}`)}
        </button>
      </div>`;
    });
    html += `</div>`;
  }

  // Redemption history
  const history = (k.redemptions || [])
    .filter(r => r.kidId === kid.id)
    .sort((a,b) => (b.ts||b.requestedAt||0) > (a.ts||a.requestedAt||0) ? 1 : -1)
    .slice(0, 8);
  if (history.length) {
    html += `<div class="cv2-group-heading" style="margin-bottom:8px">Recent</div>`;
    html += `<div class="cv2-card">`;
    history.forEach(r => {
      const pr = prizes.find(p => p.id === r.prizeId);
      if (!pr) return;
      const statusMap = {
        approved: { label:'✓ Approved', bg:'#f0fdf4', color:'#15803d' },
        rejected: { label:'Declined',   bg:'#fef2f2', color:'#b91c1c' },
        pending:  { label:'⏳ Waiting', bg:'#fffbeb', color:'#854d0e' },
      };
      const s = statusMap[r.status] || statusMap.pending;
      const when = r.approvedAt || r.ts || r.requestedAt;
      const whenLabel = when ? new Date(when).toLocaleDateString('en-AU', { day:'numeric', month:'short' }) : '';
      html += `<div class="cv2-redeem-history-row">
        <span style="font-size:20px">${pr.emoji || '🎁'}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:#18181B">${escHtml(pr.name)}</div>
          ${whenLabel ? `<div style="font-size:11px;color:#94a3b8">${whenLabel}</div>` : ''}
        </div>
        <span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:99px;background:${s.bg};color:${s.color}">${s.label}</span>
      </div>`;
    });
    html += `</div>`;
  }

  const contentEl = document.getElementById('cv-content');
  if (contentEl) contentEl.innerHTML = html;
}

// ── CHILD CALENDAR START ────────────────────────────────────────
let _cvActiveKidId   = null;
let _cvActiveTab     = 'today';
let _cvCalView       = '7day';   // '7day' | 'month'
let _cvSelectedDate  = null;     // tapped day in month view
let _cvExpandedRoutines = new Set(); // routineIds expanded in day schedule

function _cvSwitchTab(tab, kidId) {
  if (kidId) _cvActiveKidId = kidId;
  _cvActiveTab = tab;
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(_cvActiveKidId));
  if (!kid) return;
  const bracket = _cvAgeBracket(kid);
  const navEl   = document.getElementById('cv-nav');
  if (navEl) navEl.style.display = bracket === 'tiny-tots' ? 'none' : '';
  document.getElementById('cv-nav-today')?.classList.toggle('active', tab === 'today');
  document.getElementById('cv-nav-calendar')?.classList.toggle('active', tab === 'calendar');
  document.getElementById('cv-nav-prizes')?.classList.toggle('active', tab === 'prizes');
  if (tab === 'today') {
    showChildView(_cvActiveKidId);
  } else if (tab === 'prizes') {
    _cvRenderPrizesTab(kid);
  } else {
    _cvSelectedDate = null;
    _cvRenderCalendar(kid);
  }
}

// Returns rich event objects for a given date, keeping full refs for schedule rendering.
function _cvEventsForDate(kid, dateStr) {
  // Routines — include routine+assignment ref for step rendering
  const routines = (state.routineAssignments || [])
    .filter(a => a.childId === kid.id)
    .map(a => {
      const r = (state.routines || []).find(r => r.id === a.routineId);
      return r && _routineMatchesDate(r, dateStr) ? { type:'routine', routine:r, assignment:a, label:r.name, emoji:r.emoji, color:'#7C3AED', tag:'Routine', time:r.triggerTime||null } : null;
    }).filter(Boolean);

  // Child events (assigned specifically to this kid, all kids, or household-wide)
  const childEvs = (state.childEvents || []).filter(ev => {
    const ids = Array.isArray(ev.assignedTo) ? ev.assignedTo : [ev.assignedTo];
    const assigned = ids.includes(kid.id) || ids.includes('all') || ev.isHouseholdWide;
    if (!assigned) return false;
    return ev.recurrence ? _recurrenceMatchesDate(ev.recurrence, dateStr) : ev.date === dateStr;
  }).map(ev => ({ type:'event', label:ev.title, emoji:ev.emoji||'📅', color:'#10b981', tag:'Event', notes:ev.notes, time:ev.time||null }));

  // Planner events assigned to 'everyone' — these belong on every family member's calendar
  const plannerEvs = (state.planner?.events || []).filter(ev => {
    const ids = _plannerEvMemberIds(ev);
    if (!ids.includes('everyone')) return false;
    if (ev.recurrence && ev.recurrence.type !== 'one_time') return _recurrenceMatchesDate(ev.recurrence, dateStr);
    if (ev.endDate && ev.endDate > ev.date) return dateStr >= ev.date && dateStr <= ev.endDate;
    return ev.date === dateStr;
  }).map(ev => ({ type:'event', label:ev.title, emoji: (PLANNER_CATS[ev.category]?.emoji || '📅'), color:'#10b981', tag:'Event', notes:ev.notes||'', time:ev.time||null }));

  const events = [...childEvs, ...plannerEvs];

  // Chores — no time, shown at bottom
  const chores = (state.kids?.chores || [])
    .filter(c => (c.assignedTo === kid.id || c.assignedTo === 'all') && !c._isRoutine)
    .map(c => ({ type:'chore', label:c.name, emoji:c.emoji||'📋', color:'#ec4899', tag:'Chore', time:null }));

  return { routines, events, chores };
}

// Formats HH:MM → 9:30 am
function _cvFmt12h(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${h >= 12 ? 'pm' : 'am'}`;
}

// Toggle a routine expanded/collapsed in the day schedule
function _cvToggleRoutineExpand(routineId) {
  if (_cvExpandedRoutines.has(routineId)) _cvExpandedRoutines.delete(routineId);
  else _cvExpandedRoutines.add(routineId);
  // Re-render just the schedule panel without losing scroll position
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(_cvActiveKidId));
  if (!kid) return;
  if (_cvCalView === '7day' || _cvAgeBracket(kid) === 'early-reader') {
    const todayStr = new Date().toISOString().slice(0,10);
    _cvRefreshSchedulePanel(kid, todayStr);
  } else {
    _cvRefreshSchedulePanel(kid, _cvSelectedDate);
  }
}

// Tick a routine step from the calendar (writes to completionState for that date)
function _cvToggleStepFromCal(routineId, stepId, dateStr) {
  if (_cvReadOnly) return;
  const assignment = _routineGetAssignment(routineId, _cvActiveKidId);
  if (!assignment) return;
  if (!assignment.completionState) assignment.completionState = {};
  const key = dateStr; // use the calendar date, not necessarily today
  if (!assignment.completionState[key]) assignment.completionState[key] = [];
  const idx = assignment.completionState[key].indexOf(stepId);
  const ticking = idx === -1;
  if (ticking) assignment.completionState[key].push(stepId);
  else assignment.completionState[key].splice(idx, 1);

  // Award points only when ticking on today
  const todayStr = new Date().toISOString().slice(0,10);
  if (ticking && dateStr === todayStr) {
    const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
    if (routine) {
      const step = routine.steps.find(s => s.id === stepId);
      if ((step?.points || 0) > 0) _routineAwardStepPoints(routine, step, _cvActiveKidId);
      const total = routine.steps.length;
      const done  = assignment.completionState[key].length;
      if (done === total && total > 0 && (routine.pointsPerCompletion || 0) > 0)
        _routineAwardPoints(routine, _cvActiveKidId);
    }
  }

  saveData(state);
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(_cvActiveKidId));
  if (kid) _cvRefreshSchedulePanel(kid, dateStr);
}

// Re-renders only the schedule panel (below the strip/grid) without touching the calendar chrome
function _cvRefreshSchedulePanel(kid, dateStr) {
  const panelId = _cvCalView === 'month' ? 'cv-day-panel' : 'cv-schedule-panel';
  const el = document.getElementById(panelId);
  if (!el) return;
  el.innerHTML = _cvScheduleHtml(kid, dateStr);
}

// Builds the full day schedule HTML for a given kid + date
function _cvScheduleHtml(kid, dateStr) {
  if (!dateStr) return '';
  const { routines, events, chores } = _cvEventsForDate(kid, dateStr);
  const dateKey = dateStr; // completionState key

  if (!routines.length && !events.length && !chores.length) {
    return `<div style="text-align:center;padding:28px 0;color:#A1A1AA;font-size:13px">Nothing scheduled</div>`;
  }

  // Merge routines + events, sort by time
  const timed = [
    ...routines.map(r => ({ ...r, sortKey: r.time || '23:59' })),
    ...events.map(e => ({ ...e, sortKey: e.time || '23:59' }))
  ].sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  let html = '';

  if (timed.length) {
    html += `<div class="cv-sched-section-hdr">Schedule</div>`;
    timed.forEach(item => {
      if (item.type === 'routine') {
        html += _cvRoutineSchedCard(item.routine, item.assignment, dateKey);
      } else {
        html += `<div class="cv-sched-item">
          <div class="cv-sched-row">
            <span class="cv-sched-time">${item.time ? _cvFmt12h(item.time) : ''}</span>
            <div class="cv-sched-color-bar" style="background:${item.color}"></div>
            <span class="cv-sched-emoji">${item.emoji}</span>
            <div class="cv-sched-body">
              <div class="cv-sched-title">${escHtml(item.label)}</div>
              ${item.notes ? `<div class="cv-sched-sub">${escHtml(item.notes)}</div>` : ''}
            </div>
            <span class="cv-sched-tag" style="background:${item.color}20;color:${item.color}">${item.tag}</span>
          </div>
        </div>`;
      }
    });
  }

  if (chores.length) {
    html += `<div class="cv-sched-section-hdr">Chores</div>`;
    chores.forEach(c => {
      const pending = (state.kids?.completions || []).some(x => x.kidId === kid.id && x.choreId === (state.kids?.chores||[]).find(ch=>ch.name===c.label)?.id && x.status === 'pending');
      html += `<div class="cv-sched-item">
        <div class="cv-sched-row">
          <span class="cv-sched-time"></span>
          <div class="cv-sched-color-bar" style="background:${c.color}"></div>
          <span class="cv-sched-emoji">${c.emoji}</span>
          <div class="cv-sched-body">
            <div class="cv-sched-title">${escHtml(c.label)}</div>
          </div>
          ${pending ? `<span class="cv-sched-tag" style="background:#fef9c320;color:#854d0e">Waiting ✓</span>` : `<span class="cv-sched-tag" style="background:${c.color}20;color:${c.color}">Chore</span>`}
        </div>
      </div>`;
    });
  }

  return html;
}

// Builds a single expandable routine card for the schedule
function _cvRoutineSchedCard(routine, assignment, dateKey) {
  const done     = assignment.completionState?.[dateKey] || [];
  const total    = routine.steps.length;
  const pct      = total > 0 ? Math.round(done.length / total * 100) : 0;
  const allDone  = done.length === total && total > 0;
  const expanded = _cvExpandedRoutines.has(routine.id);

  const progressHtml = total > 0 ? `
    <div class="cv-sched-progress">
      <div class="cv-sched-prog-bar"><div class="cv-sched-prog-fill" style="width:${pct}%"></div></div>
      <span style="font-size:11px;color:#94a3b8;font-weight:600">${done.length}/${total}</span>
    </div>` : '';

  let stepsHtml = '';
  if (expanded && total > 0) {
    stepsHtml = `<div class="cv-sched-steps">`;
    routine.steps.forEach(step => {
      const isDone   = done.includes(step.id);
      const canTick  = !_cvReadOnly;
      const check    = isDone ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>` : '';
      stepsHtml += `<div class="cv-sched-step" ${canTick ? `onclick="_cvToggleStepFromCal(${JSON.stringify(routine.id)},${JSON.stringify(step.id)},'${dateKey}')"` : 'style="cursor:default"'}>
        <div class="cv-sched-step-check${isDone ? ' cv-sched-step-check--done' : ''}">${check}</div>
        <span class="cv-sched-step-emoji">${step.emoji}</span>
        <span class="cv-sched-step-label${isDone ? ' cv-sched-step-label--done' : ''}">${escHtml(step.label)}</span>
        ${step.points > 0 ? `<span class="cv-sched-step-pts">⭐ ${step.points}</span>` : ''}
      </div>`;
    });
    stepsHtml += `</div>`;
    if (allDone) {
      stepsHtml += `<div style="text-align:center;padding:8px;font-size:12px;font-weight:700;color:#5B4CF5;background:#f5f3ff">✓ All done! 🎉</div>`;
    }
  }

  return `<div class="cv-sched-item">
    <div class="cv-sched-row" style="cursor:pointer" onclick="_cvToggleRoutineExpand(${JSON.stringify(routine.id)})">
      <span class="cv-sched-time">${routine.triggerTime ? _cvFmt12h(routine.triggerTime) : ''}</span>
      <div class="cv-sched-color-bar" style="background:#7C3AED"></div>
      <span class="cv-sched-emoji">${routine.emoji}</span>
      <div class="cv-sched-body">
        <div class="cv-sched-title">${escHtml(routine.name)}</div>
        ${allDone ? `<div class="cv-sched-sub" style="color:#5B4CF5;font-weight:700">✓ Complete</div>` : routine.triggerTime ? `<div class="cv-sched-sub">${_cvFmt12h(routine.triggerTime)}</div>` : ''}
      </div>
      ${progressHtml}
      <button class="cv-sched-expand-btn">${expanded ? '▲' : '▼'}</button>
    </div>
    ${stepsHtml}
  </div>`;
}

function _cvRenderCalendar(kid) {
  if (!kid) return;
  const bracket   = _cvAgeBracket(kid);
  const isEarly   = bracket === 'early-reader';
  const view      = isEarly ? '7day' : _cvCalView;
  const todayStr  = new Date().toISOString().slice(0, 10);
  const contentEl = document.getElementById('cv-content');
  if (!contentEl) return;

  let html = '';
  if (!isEarly) {
    html += `<div style="display:flex;gap:8px;margin-bottom:14px">
      <button class="cv2-nav-tab cv-cal-month-toggle" style="border-radius:99px;padding:6px 16px;flex:none;${view==='7day'?'color:#5B4CF5;border-bottom-color:#5B4CF5':''}"
        onclick="_cvCalViewToggle('7day','${kid.id}')">Week</button>
      <button class="cv2-nav-tab cv-cal-month-toggle" style="border-radius:99px;padding:6px 16px;flex:none;${view==='month'?'color:#5B4CF5;border-bottom-color:#5B4CF5':''}"
        onclick="_cvCalViewToggle('month','${kid.id}')">Month</button>
    </div>`;
  }
  html += view === '7day' ? _cvRender7Day(kid, todayStr) : _cvRenderMonth(kid, todayStr);
  contentEl.innerHTML = html;
}

function _cvCalViewToggle(view, kidId) {
  _cvCalView = view;
  _cvSelectedDate = null;
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (kid) _cvRenderCalendar(kid);
}

function _cvRender7Day(kid, todayStr) {
  const DOW = ['S','M','T','W','T','F','S'];
  const anchor = new Date(todayStr + 'T12:00:00');
  let html = `<div class="cv-week-strip">`;
  for (let i = 0; i < 7; i++) {
    const d  = new Date(anchor); d.setDate(anchor.getDate() + i);
    const ds = d.toISOString().slice(0, 10);
    const isT = ds === todayStr;
    const { routines, events, chores } = _cvEventsForDate(kid, ds);
    const allItems = [...routines, ...events, ...chores];
    const dots = allItems.slice(0,3).map(e=>`<div class="cv-cal-dot" style="background:${e.color}"></div>`).join('');
    html += `<div class="cv-week-cell ${isT?'cv-today':''}" onclick="_cvWeekDayTap('${ds}','${kid.id}')">
      <div class="cv-week-dow">${DOW[d.getDay()]}</div>
      <div class="cv-week-date">${d.getDate()}</div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:3px">${dots}</div>
    </div>`;
  }
  html += `</div>`;
  // Today's schedule below the strip
  const dateLabel = new Date(todayStr + 'T12:00:00').toLocaleDateString('en-AU', { weekday:'long', day:'numeric', month:'long' });
  html += `<div style="font-size:13px;font-weight:700;color:#1e293b;margin:10px 0 2px">${escHtml(dateLabel)}</div>`;
  html += `<div id="cv-schedule-panel">${_cvScheduleHtml(kid, todayStr)}</div>`;
  return html;
}

// Tapping a day in 7-day view updates the schedule panel below
function _cvWeekDayTap(dateStr, kidId) {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (!kid) return;
  _cvExpandedRoutines.clear();
  // Update selected day highlighting
  document.querySelectorAll('.cv-week-cell').forEach(el => {
    el.classList.toggle('cv-today', el.getAttribute('onclick')?.includes(`'${dateStr}'`));
  });
  const dateLabel = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-AU', { weekday:'long', day:'numeric', month:'long' });
  const panelEl = document.getElementById('cv-schedule-panel');
  if (panelEl) {
    panelEl.previousElementSibling.textContent = dateLabel;
    panelEl.innerHTML = _cvScheduleHtml(kid, dateStr);
  }
}

function _cvRenderMonth(kid, todayStr) {
  const now   = new Date(todayStr + 'T12:00:00');
  const year  = now.getFullYear(), month = now.getMonth();
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DOW_H  = ['S','M','T','W','T','F','S'];
  const firstDow    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const selDate     = _cvSelectedDate || todayStr;

  let html = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
    <span style="font-size:14px;font-weight:800;color:#18181B">${MONTHS[month]} ${year}</span>
  </div>`;
  html += `<div class="cv-cal-grid">`;
  DOW_H.forEach(d => { html += `<div class="cv-cal-day-hdr">${d}</div>`; });
  for (let i = 0; i < firstDow; i++) html += `<div class="cv-cal-cell cv-other"></div>`;
  for (let day = 1; day <= daysInMonth; day++) {
    const ds  = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const isT = ds === todayStr;
    const isSel = ds === selDate;
    const { routines, events, chores } = _cvEventsForDate(kid, ds);
    const allItems = [...routines, ...events, ...chores];
    const dots = allItems.slice(0,3).map(e=>`<div class="cv-cal-dot" style="background:${e.color}"></div>`).join('');
    html += `<div class="cv-cal-cell ${isT?'cv-today':''} ${isSel&&!isT?'cv-cal-cell--sel':''}" onclick="_cvMonthDayTap('${ds}','${kid.id}')">
      <div class="cv-cal-cell-num">${day}</div>
      <div style="display:flex;flex-direction:column;align-items:center">${dots}</div>
    </div>`;
  }
  html += `</div>`;

  // Day detail panel below grid
  const panelLabel = new Date(selDate + 'T12:00:00').toLocaleDateString('en-AU', { weekday:'long', day:'numeric', month:'long' });
  html += `<div class="cv-month-day-panel">
    <div class="cv-month-day-panel-title">${escHtml(panelLabel)}</div>
    <div id="cv-day-panel">${_cvScheduleHtml(kid, selDate)}</div>
  </div>`;
  return html;
}

function _cvMonthDayTap(dateStr, kidId) {
  _cvSelectedDate = dateStr;
  _cvExpandedRoutines.clear();
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (kid) _cvRenderCalendar(kid);
}

function _cvShowDayDetail(dateStr, kidId) {
  // Legacy — redirects to the new inline panel system
  _cvMonthDayTap(dateStr, kidId);
}
// ── CHILD CALENDAR END ──────────────────────────────────────────

function _cvDismissNotif(notifId, kidId) {
  const n = (state.kids?.notifications || []).find(x => x.id === notifId);
  if (n) n.read = true;
  saveData(state);
  showChildView(kidId);
}

function _cvShowPrizeConfirm(kidId, prizeId) {
  const prize = (state.kids?.prizes || []).find(p => String(p.id) === String(prizeId));
  if (!prize) return;
  const html = `<div class="cv2-confirm">
    <div class="cv2-confirm-emoji">${prize.emoji || '🎁'}</div>
    <div class="cv2-confirm-title">${escHtml(prize.name)}</div>
    <div class="cv2-confirm-cost">⭐ ${prize.pointCost} points</div>
    <button class="cv2-confirm-send" onclick="redeemPrizeChildView('${kidId}','${prizeId}')">
      Send request ✉️
    </button>
    <button class="cv2-confirm-cancel" onclick="_cvSwitchTab('prizes','${kidId}')">Cancel</button>
  </div>`;
  document.getElementById('cv-content').innerHTML = html;
}

function markChoreChildView(kidId, choreId) {
  const existing = state.kids.completions.find(c => c.kidId === kidId && c.choreId === choreId && c.status === 'pending');
  if (existing) return;
  state.kids.completions.push({ id: uid(), kidId, choreId, status: 'pending', ts: new Date().toISOString() });
  saveData(state);
  showChildView(kidId);
}

function redeemPrizeChildView(kidId, prizeId) {
  state.kids.redemptions.push({ id: uid(), kidId, prizeId, status: 'pending', ts: new Date().toISOString() });
  saveData(state);
  _cvSwitchTab('prizes', kidId);
}

function switchToKidMode(kidId) {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (!kid) return;
  _activeProfile = { id: kid.id, name: kid.name, emoji: kid.emoji, role: 'child' };
  setKidSession(kid.id);
  showChildView(kidId);
}

// ──────────────────────────────────────────────────────
// ── Household Invite System (A1–A4) ──────────────────
// ──────────────────────────────────────────────────────
let _inviteRole    = 'member';
let _inviteToken   = null;  // token being shown after generation
let _inviteJourneyInv = null; // invite object being processed by the joinee

function _setInviteRole(role) {
  _inviteRole = role;
  const mBtn = document.getElementById('inv-role-member');
  const oBtn = document.getElementById('inv-role-owner');
  if (!mBtn || !oBtn) return;
  if (role === 'member') {
    mBtn.style.borderColor = '#0d9488'; mBtn.style.background = '#f0fdfa'; mBtn.style.color = '#0d9488';
    oBtn.style.borderColor = 'var(--border)'; oBtn.style.background = 'var(--surface)'; oBtn.style.color = 'var(--text-muted)';
  } else {
    oBtn.style.borderColor = '#0d9488'; oBtn.style.background = '#f0fdfa'; oBtn.style.color = '#0d9488';
    mBtn.style.borderColor = 'var(--border)'; mBtn.style.background = 'var(--surface)'; mBtn.style.color = 'var(--text-muted)';
  }
}

function generateInvite(memberIdx, memberName) {
  const emailEl = document.getElementById('inv-email');
  const email   = emailEl ? emailEl.value.trim() : '';
  const inviterName = (state.householdProfile.members || []).find(m => m.role === 'adult')?.name || 'Someone';
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const inv = {
    id: uid(),
    email,
    role: _inviteRole,
    inviterName,
    memberName: memberName || null,
    memberIdx:  memberIdx  != null ? memberIdx : null,
    createdAt: new Date().toISOString(),
    expiresAt,
    status: 'pending'
  };
  if (!state.householdProfile.invites) state.householdProfile.invites = [];
  state.householdProfile.invites.push(inv);
  saveData(state);
  _inviteToken = inv.id;
  const link = _getInviteUrl(inv.id);
  const linkWrap = document.getElementById('invite-link-wrap');
  const formWrap = document.getElementById('invite-form-wrap');
  const disp     = document.getElementById('invite-link-display');
  if (linkWrap) { linkWrap.dataset.invEmail = email; linkWrap.dataset.invToken = inv.id; linkWrap.style.display = 'block'; }
  if (formWrap) formWrap.style.display = 'none';
  if (disp)     disp.textContent = link;
}

function inviteMember(memberIdx) {
  const m = (state.householdProfile.members || [])[memberIdx];
  if (!m) return;
  const inviterName = (state.householdProfile.members || []).find((mb, i) => mb.role === 'adult' && i === 0)?.name || 'Someone';
  const expiresAt   = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const inv = {
    id: uid(),
    email: '',
    role: 'member',
    inviterName,
    memberName: m.name || null,
    memberIdx,
    createdAt: new Date().toISOString(),
    expiresAt,
    status: 'pending'
  };
  if (!state.householdProfile.invites) state.householdProfile.invites = [];
  state.householdProfile.invites.push(inv);
  saveData(state);
  // Show a modal/sheet with the link
  const link = _getInviteUrl(inv.id);
  const name  = escHtml(m.name || 'this person');
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9000;display:flex;align-items:center;justify-content:center;padding:24px';
  modal.innerHTML = `<div style="background:#fff;border-radius:16px;padding:24px;max-width:400px;width:100%">
    <div style="font-size:18px;font-weight:700;margin-bottom:6px">Invite ${name} 🔗</div>
    <div style="font-size:13px;color:#64748b;margin-bottom:16px">Share this link with ${name}. It expires in 7 days.</div>
    <div style="font-size:12px;word-break:break-all;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-bottom:14px">${link}</div>
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <button onclick="navigator.clipboard.writeText('${link}').then(()=>{this.textContent='✓ Copied!';setTimeout(()=>this.textContent='📋 Copy link',2000)})"
        style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:13px;font-weight:600;cursor:pointer">📋 Copy link</button>
      <button onclick="window.open('mailto:?subject=Join+my+Toto+household&body=Hi!+I\\'ve+invited+you+to+join+my+Toto+household.+Click+here+to+accept:+${encodeURIComponent(link)}','_blank')"
        style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:13px;font-weight:600;cursor:pointer">✉️ Email</button>
    </div>
    <button onclick="this.closest('div[style*=\"position:fixed\"]').remove();renderSettings()"
      style="width:100%;padding:10px;border:none;border-radius:8px;background:#0d9488;color:#fff;font-size:14px;font-weight:700;cursor:pointer">Done</button>
  </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) { modal.remove(); renderSettings(); } });
}

function _ensureKidProfileAndPin(name) {
  if (!name) return;
  let kidProfile = (state.kids?.profiles || []).find(k => k.name && k.name.toLowerCase() === name.toLowerCase());
  if (!kidProfile) {
    if (!state.kids) state.kids = { profiles: [], chores: [], prizes: [], completions: [], redemptions: [] };
    const member = (state.householdProfile.members || []).find(m => m.name && m.name.toLowerCase() === name.toLowerCase());
    const id = nextId(state.kids.profiles);
    kidProfile = { id, name, age: member?.age || null, emoji: member?.emoji || '🧒' };
    state.kids.profiles.push(kidProfile);
    if (!state.meals?.lunchbox?.profiles) { if (!state.meals) state.meals = {}; if (!state.meals.lunchbox) state.meals.lunchbox = { profiles: [] }; }
    state.meals.lunchbox.profiles.push({ id, name, emoji: kidProfile.emoji });
    saveData(state);
  }
  openPinSetup(kidProfile.id);
}

function _copyInviteLinkForMember(token) {
  navigator.clipboard.writeText(_getInviteUrl(token)).then(() => {
    const btn = event.target;
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
}

function _getInviteUrl(token) {
  const ownerUID = _getHouseholdOwnerUID() || '';
  return window.location.origin + window.location.pathname + '?invite=' + token + '&h=' + ownerUID;
}

function copyInviteLink() {
  const token = document.getElementById('invite-link-wrap')?.dataset.invToken || _inviteToken;
  if (!token) return;
  navigator.clipboard.writeText(_getInviteUrl(token)).then(() => {
    const btn = event.target;
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
}

function sendInviteEmail() {
  const wrap  = document.getElementById('invite-link-wrap');
  const token = wrap?.dataset.invToken || _inviteToken;
  const email = wrap?.dataset.invEmail || '';
  if (!token) return;
  const inv = (state.householdProfile.invites || []).find(i => i.id === token);
  const inviterName = inv?.inviterName || 'Your partner';
  const link = _getInviteUrl(token);
  const subject = encodeURIComponent(`${inviterName} invited you to join their Toto household`);
  const body = encodeURIComponent(`Hi,\n\n${inviterName} has invited you to join their Toto household — a shared family finance and planning app.\n\nClick the link below to accept the invite (expires in 7 days):\n\n${link}\n\nSee you there!`);
  window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
}

function revokeInvite(inviteId) {
  if (!confirm('Revoke this invite link?')) return;
  const inv = (state.householdProfile.invites || []).find(i => i.id === inviteId);
  if (inv) inv.status = 'revoked';
  saveData(state);
  renderSettings();
}

// ── Invite landing (called on app load if ?invite= in URL) ──
const _PENDING_INVITE_KEY = 'toto_pending_invite';

function _checkInviteOnLoad() {
  const params      = new URLSearchParams(window.location.search);
  const token       = params.get('invite');
  const householdH  = params.get('h');
  if (!token) return;
  sessionStorage.setItem(_PENDING_INVITE_KEY, token);
  if (householdH) sessionStorage.setItem(PENDING_HOUSEHOLD_KEY, householdH);
  // Strip params from URL so refresh doesn't re-trigger
  window.history.replaceState({}, '', window.location.pathname + window.location.hash);
}

function _handlePendingInvite() {
  const token = sessionStorage.getItem(_PENDING_INVITE_KEY);
  if (!token) return;
  const inv = (state.householdProfile.invites || []).find(i => i.id === token);
  if (!inv) {
    sessionStorage.removeItem(_PENDING_INVITE_KEY);
    return;
  }
  if (inv.status !== 'pending' || new Date(inv.expiresAt) < new Date()) {
    sessionStorage.removeItem(_PENDING_INVITE_KEY);
    _showInviteExpired(inv);
    return;
  }
  sessionStorage.removeItem(_PENDING_INVITE_KEY);
  _inviteJourneyInv = inv;
  _showInviteA1(inv);
}

function _showInviteA1(inv) {
  const members = state.householdProfile.members || [];
  const adults  = members.filter(m => m.role === 'adult');
  const kids    = members.filter(m => m.role === 'child');
  const surplus = (() => {
    const now = new Date();
    const key = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const m = getOrCreateMonthData(key);
    const inc = (m.income || []).reduce((s,i) => s + freqToMonthly(Number(i.amount)||0, i.frequency), 0);
    const exp = (m.expenses || []).filter(e => !e.skipped).reduce((s,e) => s + freqToMonthly(Number(e.amount)||0, e.frequency), 0);
    return inc - exp;
  })();

  const membersHtml = [
    ...adults.map(m => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ecfeff,#ccfbf1);display:flex;align-items:center;justify-content:center;font-size:20px">👤</div>
        <div><div style="font-size:14px;font-weight:600">${escHtml(m.name || 'Adult')}</div><div style="font-size:12px;color:#64748b">Adult · Owner</div></div>
      </div>`),
    ...kids.map(m => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#fef9c3,#fde68a);display:flex;align-items:center;justify-content:center;font-size:20px">${m.emoji || '🧒'}</div>
        <div><div style="font-size:14px;font-weight:600">${escHtml(m.name || 'Kid')}</div><div style="font-size:12px;color:#64748b">Kid · age ${m.age || '?'}</div></div>
      </div>`)
  ].join('');

  const html = `
    <div style="text-align:center;font-size:56px;margin-bottom:20px;margin-top:8px">🏡</div>
    <div style="font-size:22px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:6px;line-height:1.3">${escHtml(inv.inviterName || 'Someone')} invited you to join their Toto household</div>
    <div style="font-size:14px;color:#64748b;text-align:center;margin-bottom:28px">You'll get shared access to budget, meals, kids &amp; home — everything in one place.</div>

    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:20px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin-bottom:12px">Your household</div>
      ${membersHtml}
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0">
        <div style="width:40px;height:40px;border-radius:50%;border:2px dashed #0d9488;display:flex;align-items:center;justify-content:center;font-size:20px;color:#0d9488">+</div>
        <div><div style="font-size:14px;font-weight:600;color:#0d9488">You — joining now</div><div style="font-size:12px;color:#64748b">New member</div></div>
      </div>
    </div>

    ${surplus !== 0 ? `
    <div style="display:flex;gap:12px;margin-bottom:20px">
      <div style="flex:1;background:#f0fdf4;border-radius:12px;padding:14px;text-align:center">
        <div style="font-size:20px;font-weight:700;color:#16a34a">$${Math.abs(surplus).toLocaleString()}</div>
        <div style="font-size:11px;color:#64748b;margin-top:2px">monthly ${surplus >= 0 ? 'surplus' : 'deficit'}</div>
      </div>
    </div>` : ''}

    ${inv.email ? `<div style="font-size:12px;color:#94a3b8;text-align:center;margin-bottom:16px">Invite sent to <strong style="color:#475569">${escHtml(inv.email)}</strong> · Expires ${new Date(inv.expiresAt).toLocaleDateString()}</div>` : ''}

    <button onclick="_acceptInviteAndContinue()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:10px">Accept invite →</button>
    <div style="text-align:center"><a href="#" onclick="event.preventDefault();_dismissInviteFlow()" style="font-size:13px;color:#94a3b8;text-decoration:none">Not you? Ignore this invite</a></div>
  `;

  _renderInviteFlow(html);
}

function _showInviteA3() {
  const inv = _inviteJourneyInv;
  const userName = _currentUser?.displayName?.split(' ')[0] || 'there';
  const members  = state.householdProfile.members || [];
  const adults   = members.filter(m => m.role === 'adult');
  const kids     = members.filter(m => m.role === 'child');
  const surplus  = (() => {
    const now = new Date();
    const key = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const m = getOrCreateMonthData(key);
    const inc = (m.income || []).reduce((s,i) => s + freqToMonthly(Number(i.amount)||0, i.frequency), 0);
    const exp = (m.expenses || []).filter(e => !e.skipped).reduce((s,e) => s + freqToMonthly(Number(e.amount)||0, e.frequency), 0);
    return inc - exp;
  })();
  const goals = (state.goals || []).length;

  const membersHtml = [
    ...adults.map((m, idx) => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ecfeff,#ccfbf1);display:flex;align-items:center;justify-content:center;font-size:20px">👤</div>
        <div>
          <div style="font-size:14px;font-weight:600">${escHtml(m.name || 'Adult')}${idx === adults.length - 1 ? ' — <span style="color:#0d9488">that\'s you!</span>' : ''}</div>
          <div style="font-size:12px;color:#64748b">${idx === 0 ? 'Owner · set up the household' : 'Member · just joined'}</div>
        </div>
      </div>`),
    ...kids.map(m => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#fef9c3,#fde68a);display:flex;align-items:center;justify-content:center;font-size:20px">${m.emoji || '🧒'}</div>
        <div><div style="font-size:14px;font-weight:600">${escHtml(m.name || 'Kid')}</div><div style="font-size:12px;color:#64748b">Kid · age ${m.age || '?'}</div></div>
      </div>`)
  ].join('');

  const html = `
    <div style="text-align:center;font-size:56px;margin-bottom:12px;margin-top:8px">🎉</div>
    <div style="font-size:24px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:6px">You're in, ${escHtml(userName)}!</div>
    <div style="font-size:14px;color:#64748b;text-align:center;margin-bottom:24px">Welcome to ${escHtml(inv?.inviterName || 'the')}'s Toto household.</div>

    <div style="background:#f0fdfa;border:1px solid #ccfbf1;border-radius:16px;padding:20px;margin-bottom:20px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#0d9488;margin-bottom:10px">Your household</div>
      ${membersHtml}
    </div>

    <div style="display:flex;gap:12px;margin-bottom:24px">
      ${surplus !== 0 ? `<div style="flex:1;background:#f8fafc;border-radius:12px;padding:14px;text-align:center;border:1px solid #e2e8f0"><div style="font-size:20px;font-weight:700;color:#16a34a">$${Math.abs(surplus).toLocaleString()}</div><div style="font-size:11px;color:#64748b">monthly ${surplus >= 0 ? 'surplus' : 'deficit'}</div></div>` : ''}
      ${goals > 0 ? `<div style="flex:1;background:#f8fafc;border-radius:12px;padding:14px;text-align:center;border:1px solid #e2e8f0"><div style="font-size:20px;font-weight:700;color:#0d9488">${goals}</div><div style="font-size:11px;color:#64748b">goal${goals !== 1 ? 's' : ''} tracked</div></div>` : ''}
    </div>

    <button onclick="_showInviteA4()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer">Take a quick tour →</button>
  `;
  _renderInviteFlow(html);
}

let _inviteTourSlide = 0;
const _TOUR_SLIDES = [
  { emoji: '💰', title: 'The Kitty', desc: 'Budget, bills, goals & net worth. See where the money goes each month.' },
  { emoji: '📅', title: 'Plan', desc: 'Weekly planner, meal plans & the kids\' lunchboxes. One place for the week ahead.' },
  { emoji: '🏠', title: 'Home', desc: 'Documents, vehicles & maintenance reminders. Never miss a rego or warranty renewal.' },
];

function _showInviteA4() {
  _inviteTourSlide = 0;
  _renderTourSlide();
}

function _renderTourSlide() {
  const slide = _TOUR_SLIDES[_inviteTourSlide];
  const dotsHtml = _TOUR_SLIDES.map((_, i) =>
    `<div style="width:${i===_inviteTourSlide?20:8}px;height:8px;border-radius:99px;background:${i===_inviteTourSlide?'#0d9488':'#e2e8f0'};transition:all .2s"></div>`
  ).join('');

  const isLast = _inviteTourSlide === _TOUR_SLIDES.length - 1;

  const html = `
    <div style="margin-top:12px">
      <div style="text-align:center;font-size:64px;margin-bottom:16px">${slide.emoji}</div>
      <div style="font-size:22px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:10px">${slide.title}</div>
      <div style="font-size:15px;color:#64748b;text-align:center;margin-bottom:32px;line-height:1.6">${slide.desc}</div>
      <div style="display:flex;justify-content:center;gap:6px;margin-bottom:32px">${dotsHtml}</div>
      <button onclick="${isLast ? '_showInviteIncomePrompt()' : '_inviteTourSlide++;_renderTourSlide()'}"
        style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:10px">
        ${isLast ? 'Done →' : 'Next →'}
      </button>
      ${!isLast ? `<button onclick="_showInviteIncomePrompt()" style="width:100%;background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:8px">Skip tour</button>` : ''}
    </div>
  `;
  _renderInviteFlow(html);
}

function _showInviteIncomePrompt() {
  const html = `
    <div style="text-align:center;margin-top:12px">
      <div style="font-size:56px;margin-bottom:16px">💰</div>
      <div style="font-size:20px;font-weight:800;color:#1e293b;margin-bottom:8px">One last thing</div>
      <div style="font-size:14px;color:#64748b;margin-bottom:24px;line-height:1.6">Want to add your income so the budget is complete? This is the one thing only you can fill in.</div>

      <div id="invite-income-form" style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:20px;text-align:left">
        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:12px">Your income source</div>
        <input id="inv-inc-name" type="text" placeholder="e.g. My salary" class="form-input" style="width:100%;margin-bottom:10px">
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="inv-inc-amount" type="number" placeholder="Amount $" class="form-input" style="flex:1">
          <select id="inv-inc-freq" class="form-select" style="flex:1">
            <option>Monthly</option>
            <option>Fortnightly</option>
            <option>Weekly</option>
            <option>Annual</option>
          </select>
        </div>
        <button onclick="_saveInviteIncome()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:10px;padding:11px;font-size:14px;font-weight:700;cursor:pointer">Add income &amp; go to dashboard →</button>
      </div>

      <button onclick="_finishInviteJourney()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px">Skip — I'll add it later</button>
    </div>
  `;
  _renderInviteFlow(html);
}

function _saveInviteIncome() {
  const name   = document.getElementById('inv-inc-name')?.value.trim() || '';
  const amount = parseFloat(document.getElementById('inv-inc-amount')?.value) || 0;
  const freq   = document.getElementById('inv-inc-freq')?.value || 'Monthly';
  if (name || amount) {
    if (!state.budget.income) state.budget.income = [];
    state.budget.income.push({ id: nextId(state.budget.income), name, amount, frequency: freq });
    saveData(state);
  }
  _finishInviteJourney();
}

function _acceptInviteAndContinue() {
  const inv = _inviteJourneyInv;
  if (!_currentUser) {
    // Need to sign in first — store intent and trigger Google sign-in
    sessionStorage.setItem('toto_post_invite_action', inv?.id || '');
    signInWithGoogle();
    return;
  }
  _recordInviteAcceptance(inv);
  _showInviteA3();
}

function _recordInviteAcceptance(inv) {
  if (!inv) return;
  inv.status = 'accepted';
  const user = _currentUser;

  // Persist which household this member belongs to
  const ownerUID = _getHouseholdOwnerUID();
  if (ownerUID) _setHouseholdOwner(ownerUID);

  if (!state.householdProfile.authorizedUsers) state.householdProfile.authorizedUsers = [];
  const already = state.householdProfile.authorizedUsers.some(u => u.uid === user.uid);
  if (!already) {
    state.householdProfile.authorizedUsers.push({
      uid: user.uid,
      name: user.displayName || '',
      email: user.email || '',
      role: inv.role || 'member',
      joinedAt: new Date().toISOString()
    });
  }
  // Add to household members list if not already there by first name
  const members   = state.householdProfile.members || [];
  const firstName = (user.displayName || '').split(' ')[0];
  if (firstName && !members.some(m => m.name === firstName)) {
    state.householdProfile.members.push({ role: 'adult', name: firstName, age: null });
  }
  saveData(state);
}

function _finishInviteJourney() {
  _inviteJourneyInv = null;
  _dismissInviteFlow();
  renderAll();
  handleDeviceRouting();
}

function _showInviteExpired(inv) {
  const html = `
    <div style="text-align:center;margin-top:40px">
      <div style="font-size:56px;margin-bottom:16px">⏰</div>
      <div style="font-size:20px;font-weight:800;color:#1e293b;margin-bottom:8px">This invite has expired</div>
      <div style="font-size:14px;color:#64748b;margin-bottom:24px">The 7-day window has passed. Ask ${escHtml(inv?.inviterName || 'the household owner')} to send a new invite link.</div>
      <button onclick="_dismissInviteFlow()" style="background:#0d9488;color:#fff;border:none;border-radius:12px;padding:12px 28px;font-size:14px;font-weight:700;cursor:pointer">OK</button>
    </div>
  `;
  _renderInviteFlow(html);
}

function _renderInviteFlow(html) {
  document.getElementById('invite-flow-content').innerHTML = html;
  const ov = document.getElementById('invite-flow-overlay');
  ov.classList.remove('hidden');
  ov.style.display = 'flex';
  ov.scrollTop = 0;
}

function _dismissInviteFlow() {
  const ov = document.getElementById('invite-flow-overlay');
  ov.classList.add('hidden');
  ov.style.display = '';
}

// ── PIN Setup (full-screen pad) ───────────────────────
// ── PIN Setup — C1 gate · C2 hello · enter · confirm · C4 tour ──────────
const PIN_HARD_LOCK_KEY  = 'toto_pin_hard_';   // + kidId
const PIN_TOTAL_ATT_KEY  = 'toto_pin_att_';    // + kidId

let _psoKidId    = null;
let _psoStep     = 'gate';  // gate|hello|enter|confirm|tour
let _psoFirst    = '';
let _psoBuf      = '';
let _psoTourSlide = 0;
let _psoHoldTimer = null;

function openPinSetup(kidId) {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (!kid) return;
  _psoKidId  = kidId;
  _psoBuf    = '';
  _psoFirst  = '';
  // Skip gate/hello if PIN already exists (parent is changing it)
  _psoStep   = kid.pinHash ? 'enter' : 'gate';
  _psoRender();
  const ov = document.getElementById('pin-setup-overlay');
  ov.classList.remove('hidden');
}

function closePinSetupOverlay() {
  if (_psoHoldTimer) { clearInterval(_psoHoldTimer); _psoHoldTimer = null; }
  const el = document.getElementById('pin-setup-overlay');
  el.classList.add('hidden');
  _psoKidId = null;
}

function _psoRender() {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(_psoKidId));
  if (!kid) return;
  const scr = document.getElementById('pso-screen');
  if (!scr) return;

  const emoji = kid.emoji || '🧒';
  const name  = escHtml(kid.name);

  // Background colour per step
  const bgs = { gate:'#f8fafc', hello:'linear-gradient(160deg,#f0fdfa,#ecfeff)',
                enter:'#f8fafc', confirm:'#f8fafc', tour:'#f8fafc' };
  document.getElementById('pin-setup-overlay').style.background = bgs[_psoStep] || '#f8fafc';

  if (_psoStep === 'gate') {
    // ── C1: Parent approval gate ──────────────────
    scr.innerHTML = `
      <div style="font-size:56px;margin-bottom:16px">${emoji}</div>
      <div style="font-size:20px;font-weight:800;color:#1e293b;margin-bottom:8px">Setting up ${name}'s account</div>
      <div style="font-size:14px;color:#64748b;margin-bottom:8px;line-height:1.6">A parent needs to approve this first.</div>
      <div style="font-size:13px;color:#94a3b8;margin-bottom:28px">Hold the button below to confirm you're a parent.</div>

      <div style="position:relative;margin-bottom:20px">
        <button id="pso-hold-btn"
          onmousedown="_psoHoldStart()" ontouchstart="_psoHoldStart()"
          onmouseup="_psoHoldEnd()"    ontouchend="_psoHoldEnd()"
          onmouseleave="_psoHoldEnd()"
          style="width:100%;padding:16px;border:2px solid #0d9488;border-radius:12px;background:#f0fdfa;font-size:15px;font-weight:700;color:#0d9488;cursor:pointer;position:relative;overflow:hidden;user-select:none;-webkit-user-select:none">
          <div id="pso-hold-fill" style="position:absolute;inset:0;background:#0d9488;opacity:.12;transform:scaleX(0);transform-origin:left;transition:none;pointer-events:none"></div>
          <span>Hold to approve as parent</span>
        </button>
      </div>
      <button onclick="closePinSetupOverlay()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`;

  } else if (_psoStep === 'hello') {
    // ── C2: Hello screen ──────────────────────────
    scr.innerHTML = `
      <div style="font-size:72px;margin-bottom:16px;animation:pso-bounce .6s ease">${emoji}</div>
      <div style="font-size:26px;font-weight:800;color:#0f172a;margin-bottom:8px">Hi ${name}! 👋</div>
      <div style="font-size:15px;color:#64748b;margin-bottom:28px">Welcome to your Toto.<br>Let's get you set up!</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:28px;text-align:left">
        <div style="display:flex;align-items:center;gap:12px;background:#fff;border-radius:12px;padding:14px;border:1px solid #e2e8f0">
          <span style="font-size:22px">📋</span>
          <span style="font-size:14px;font-weight:600;color:#374151">Your chores &amp; how to earn coins</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;background:#fff;border-radius:12px;padding:14px;border:1px solid #e2e8f0">
          <span style="font-size:22px">🏆</span>
          <span style="font-size:14px;font-weight:600;color:#374151">Prizes you can win</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;background:#fff;border-radius:12px;padding:14px;border:1px solid #e2e8f0">
          <span style="font-size:22px">🍱</span>
          <span style="font-size:14px;font-weight:600;color:#374151">Your lunchbox this week</span>
        </div>
      </div>
      <button onclick="_psoStep='enter';_psoRender()"
        style="width:100%;padding:15px;background:#0d9488;color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer">
        Let's go! →
      </button>`;

  } else if (_psoStep === 'enter' || _psoStep === 'confirm') {
    // ── PIN entry / confirm ───────────────────────
    const isEnter   = _psoStep === 'enter';
    const title     = isEnter ? (kid.pinHash ? `Change ${name}'s PIN` : 'Choose your secret code 🔢') : 'Type it again ✅';
    const sub       = isEnter ? 'Pick 4 numbers only you know!' : 'Just to make sure!';
    const dotsHtml  = [0,1,2,3].map(i => {
      const filled = i < _psoBuf.length;
      return `<div style="width:52px;height:60px;border:2px solid ${filled?'#0d9488':'#e2e8f0'};border-radius:10px;background:${filled?'#f0fdfa':'#f8fafc'};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#0d9488">${filled?'●':''}</div>`;
    }).join('');
    const padHtml   = [1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k =>
      k === '' ? `<div></div>`
               : `<div onclick="_psoKey('${k}')" style="height:52px;border:1.5px solid #e2e8f0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;color:#374151;cursor:pointer;background:#fff;-webkit-tap-highlight-color:transparent;user-select:none">${k}</div>`
    ).join('');

    scr.innerHTML = `
      <div style="font-size:40px;margin-bottom:12px">${isEnter ? '🔢' : '✅'}</div>
      <div style="font-size:18px;font-weight:700;color:#1e293b;margin-bottom:6px">${title}</div>
      <div style="font-size:13px;color:#64748b;margin-bottom:20px">${sub}</div>
      <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px">${dotsHtml}</div>
      <div id="pso-error" style="font-size:13px;color:#ef4444;min-height:18px;margin-bottom:12px"></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:220px;margin:0 auto 20px">${padHtml}</div>
      <button onclick="closePinSetupOverlay()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`;

  } else if (_psoStep === 'tour') {
    // ── C4: Quick tour ────────────────────────────
    const slides = [
      { bg:'linear-gradient(160deg,#fef9c3,#fde68a)', emoji:'⭐', titleCol:'#92400e',
        title:'Earn coins!', body:'Do your chores to collect coins.<br>Save up for prizes!', bodyCol:'#78350f' },
      { bg:'linear-gradient(160deg,#ede9fe,#ddd6fe)', emoji:'🏆', titleCol:'#5b21b6',
        title:'Prize store', body:'See what you can win and how<br>many coins you need.', bodyCol:'#4c1d95' },
      { bg:'linear-gradient(160deg,#ecfeff,#cffafe)', emoji:'🍱', titleCol:'#0e7490',
        title:'Lunchbox', body:"See what's in your lunchbox<br>each day this week.", bodyCol:'#155e75' },
    ];
    const s = slides[_psoTourSlide];
    const isLast = _psoTourSlide === slides.length - 1;
    const dotsHtml = slides.map((_,i) =>
      `<div style="width:${i===_psoTourSlide?20:8}px;height:8px;border-radius:99px;background:${i===_psoTourSlide?'#0d9488':'#e2e8f0'};transition:all .2s"></div>`
    ).join('');

    document.getElementById('pin-setup-overlay').style.background = s.bg;
    scr.innerHTML = `
      <div style="font-size:72px;margin-bottom:16px">${s.emoji}</div>
      <div style="font-size:22px;font-weight:800;color:${s.titleCol};margin-bottom:10px">${s.title}</div>
      <div style="font-size:15px;color:${s.bodyCol};margin-bottom:32px;line-height:1.6">${s.body}</div>
      <div style="display:flex;justify-content:center;gap:6px;margin-bottom:28px">${dotsHtml}</div>
      <button onclick="${isLast ? '_psoTourDone()' : '_psoTourSlide++;_psoRender()'}"
        style="width:100%;padding:15px;background:#0d9488;color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin-bottom:10px">
        ${isLast ? 'Done! →' : 'Next →'}
      </button>
      ${!isLast ? `<button onclick="_psoTourDone()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Skip</button>` : ''}`;
  }
}

// Hold-to-approve for parent gate
function _psoHoldStart() {
  if (_psoHoldTimer) return;
  let progress = 0;
  const fill = document.getElementById('pso-hold-fill');
  if (fill) { fill.style.transition = 'none'; fill.style.transform = 'scaleX(0)'; }
  _psoHoldTimer = setInterval(() => {
    progress += 50;
    const pct = Math.min(progress / 2000, 1);
    if (fill) { fill.style.transition = 'none'; fill.style.transform = `scaleX(${pct})`; }
    if (progress >= 2000) {
      clearInterval(_psoHoldTimer);
      _psoHoldTimer = null;
      _psoStep = 'hello';
      _psoRender();
    }
  }, 50);
}
function _psoHoldEnd() {
  if (_psoHoldTimer) { clearInterval(_psoHoldTimer); _psoHoldTimer = null; }
  const fill = document.getElementById('pso-hold-fill');
  if (fill) { fill.style.transition = 'transform .3s'; fill.style.transform = 'scaleX(0)'; }
}

function _psoKey(k) {
  if (k === '⌫') {
    _psoBuf = _psoBuf.slice(0,-1);
    _psoRender();
    return;
  }
  if (_psoBuf.length >= 4) return;
  _psoBuf += k;
  _psoRender();
  if (_psoBuf.length === 4) _psoSubmit();
}

async function _psoSubmit() {
  if (_psoStep === 'enter') {
    _psoFirst = _psoBuf;
    _psoBuf   = '';
    _psoStep  = 'confirm';
    _psoRender();
  } else if (_psoStep === 'confirm') {
    if (_psoBuf !== _psoFirst) {
      _psoBuf = ''; _psoFirst = ''; _psoStep = 'enter';
      _psoRender();
      const err = document.getElementById('pso-error');
      if (err) err.textContent = "Those didn't match — try again 🙈";
      return;
    }
    await setKidPin(_psoKidId, _psoBuf);
    const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(_psoKidId));
    // If this was first-time setup (came through hello), show tour
    if (kid && !kid._pinWasSet) {
      _psoTourSlide = 0;
      _psoStep = 'tour';
      _psoRender();
    } else {
      closePinSetupOverlay();
      renderKids();
      renderSettings();
    }
    kid._pinWasSet = true;
  }
}

function _psoTourDone() {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(_psoKidId));
  closePinSetupOverlay();
  if (kid) showChildView(kid.id);
}

// ── Improved rate limiting: hard lock at 10 total attempts ──────────────
function _getPinTotalAttempts(kidId) {
  return parseInt(_secureGet(PIN_TOTAL_ATT_KEY + kidId) || '0');
}
function _incPinTotalAttempts(kidId) {
  const n = _getPinTotalAttempts(kidId) + 1;
  _secureSet(PIN_TOTAL_ATT_KEY + kidId, String(n));
  return n;
}
function _resetPinAttempts(kidId) {
  _secureClear(PIN_TOTAL_ATT_KEY + kidId);
  _secureClear(PIN_HARD_LOCK_KEY  + kidId);
}
function _isPinHardLocked(kidId) {
  return _secureGet(PIN_HARD_LOCK_KEY + kidId) === '1';
}
function _setPinHardLock(kidId) {
  _secureSet(PIN_HARD_LOCK_KEY + kidId, '1');
}

// Override _verifyPin to use improved rate limiting
async function _verifyPin() {
  const hash = await _hashPin(_pinBuffer, _getHouseholdOwnerUID());

  // Adult PIN
  if (typeof _pinTargetId === 'string' && _pinTargetId.startsWith('adult:')) {
    const memberIndex = parseInt(_pinTargetId.split(':')[1]);
    const adults = (state.householdProfile?.members || []).filter(m => m.role === 'adult' && m.name);
    const m = adults[memberIndex];
    if (!m) return;
    if (hash === m.pinHash) {
      _pinAttempts = 0;
      _activeProfile = null;
      clearKidSession();
      document.getElementById('pin-overlay').classList.add('hidden');
      _applyActiveProfile();
    } else {
      _pinAttempts++;
      _pinBuffer = '';
      _renderPinDots();
      if (_pinAttempts >= 3) {
        _pinLockUntil = Date.now() + 30000;
        _pinAttempts  = 0;
        _renderPinPad();
      } else {
        document.getElementById('pin-error').textContent =
          `Wrong PIN — ${3 - _pinAttempts} tr${3 - _pinAttempts !== 1 ? 'ies' : 'y'} left`;
      }
    }
    return;
  }

  // Child PIN
  const kid = (state.kids?.profiles || []).find(k => k.id === _pinTargetId);
  if (!kid) return;

  // Hard lock check
  if (_isPinHardLocked(kid.id)) {
    document.getElementById('pin-error').textContent = 'PIN locked — ask mum or dad to reset it 🔒';
    document.getElementById('pin-pad').innerHTML = '';
    _showParentLockNotification(kid);
    return;
  }

  if (hash === kid.pinHash) {
    _resetPinAttempts(kid.id);
    _pinAttempts = 0;
    _activeProfile = { id: kid.id, name: kid.name, emoji: kid.emoji, role: 'child' };
    setKidSession(kid.id);
    document.getElementById('pin-overlay').classList.add('hidden');
    _applyActiveProfile();
  } else {
    _pinBuffer = '';
    _renderPinDots();
    _pinAttempts++;
    const total = _incPinTotalAttempts(kid.id);

    if (total >= 10) {
      _setPinHardLock(kid.id);
      _pinLockUntil = 0;
      document.getElementById('pin-error').textContent = 'PIN locked — ask mum or dad to reset it 🔒';
      document.getElementById('pin-pad').innerHTML = '';
      _showParentLockNotification(kid);
    } else if (_pinAttempts >= 3) {
      _pinLockUntil = Date.now() + 30000;
      _pinAttempts  = 0;
      _renderPinPad();
    } else {
      const attLeft = 3 - _pinAttempts;
      document.getElementById('pin-error').textContent =
        `Wrong PIN — ${attLeft} try${attLeft !== 1 ? 's' : ''} left`;
    }
  }
}

function _showParentLockNotification(kid) {
  // Show a persistent banner so a parent knows when they next open the app
  if (!state.notifications) state.notifications = [];
  const already = state.notifications.some(n => n.type === 'pin-lock' && n.kidId === kid.id);
  if (!already) {
    state.notifications.unshift({
      id: uid(), type: 'pin-lock', kidId: kid.id,
      msg: `${kid.name}'s PIN has been locked after too many failed attempts. Reset it in Settings → Household.`,
      ts: new Date().toISOString(), read: false
    });
    saveData(state);
  }
}

// Admin: reset hard lock for a kid (called from settings)
function resetKidPinLock(kidId) {
  _resetPinAttempts(kidId);
  _pinAttempts = 0;
  _pinLockUntil = 0;
  renderSettings();
}
// ── End PIN setup ───────────────────────────────────────────────────────

// ─── Per-month budget helpers ──────────────────────
function getMonthData(monthStr) {
  const m = state.budget.months && state.budget.months[monthStr];
  return m || { income: state.budget.income, expenses: state.budget.expenses };
}

function isMonthCustomized(monthStr) {
  return !!(state.budget.months && state.budget.months[monthStr]);
}

function ensureMonthOverride(monthStr) {
  if (!state.budget.months) state.budget.months = {};
  if (!state.budget.months[monthStr]) {
    state.budget.months[monthStr] = {
      income:   JSON.parse(JSON.stringify(state.budget.income)),
      expenses: JSON.parse(JSON.stringify(state.budget.expenses))
    };
  }
  return state.budget.months[monthStr];
}

function prevMonthStr(monthStr) {
  const [y, m] = monthStr.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}

function copyMonthFromPrevious(toMonth) {
  const fromMonth = prevMonthStr(toMonth);
  const fromData  = getMonthData(fromMonth);
  if (!state.budget.months) state.budget.months = {};
  state.budget.months[toMonth] = {
    income:   JSON.parse(JSON.stringify(fromData.income.filter(i => i.recurring !== false))),
    expenses: JSON.parse(JSON.stringify(fromData.expenses.filter(e => e.recurring !== false)))
  };
  logActivity('Auto-filled', `${monthLabel(toMonth)} copied from ${monthLabel(fromMonth)}`);
  saveData(state);
  safeRender(renderBudget);
  safeRender(renderMoneyDashboard);
}

// ─── Scope confirmation modal ──────────────────────
let _scopePending = null;

function confirmScope(onThisMonth, onAllMonths) {
  _scopePending = { onThisMonth, onAllMonths };
  const mLabel = monthLabel(selectedBudgetMonth);
  document.getElementById('modal-title').textContent = 'Apply changes';
  document.getElementById('modal-body').innerHTML = `
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Apply this change to <strong style="color:var(--text)">${mLabel}</strong> only,
      or update the default for all months?
    </p>
    ${isMonthCustomized(selectedBudgetMonth) ? `<p style="font-size:12px;color:var(--primary);margin-top:10px;margin-bottom:0">
      <em>${mLabel}</em> already has its own custom budget.</p>` : ''}
  `;
  document.getElementById('modal-footer').innerHTML = `
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="doScopeAll()">Apply to all months</button>
    <button class="btn btn-primary" onclick="doScopeMonth()">Apply to ${mLabel}</button>
  `;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function doScopeMonth() {
  if (_scopePending) { _scopePending.onThisMonth(); _scopePending = null; }
  closeModal();
}

function doScopeAll() {
  if (_scopePending) { _scopePending.onAllMonths(); _scopePending = null; }
  closeModal();
}

_initState(loadData());
// `state` is the Proxy from store.js — all existing `state.x` reads/writes work unchanged.
_checkInviteOnLoad(); // run immediately on script parse — strips ?invite= from URL
// Daily routine reset check — clears stale completion records if past reset hour
setTimeout(() => { try { _routineCheckDailyReset(); } catch(e) {} }, 0);
let selectedBudgetMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
let budgetViewMode = 'grouped'; // 'grouped' | 'table'
let _settingsOpen = new Set(['ai', 'household']); // accordion open sections
let _billsSubsFilter = 'all'; // 'all' | 'bills' | 'subs'

// ─── Mini date picker ─────────────────────────────
let dpViewYear = new Date().getFullYear();
let dpViewMonth = new Date().getMonth() + 1;

function dpDateInput() {
  return document.getElementById('f-exp-duedate') || document.getElementById('f-inc-duedate');
}

function openDatePicker(evt) {
  evt.stopPropagation();
  const popup = document.getElementById('dp-popup');
  if (!popup) return;
  const val = (dpDateInput() || {}).value || '';
  if (val) {
    [dpViewYear, dpViewMonth] = val.split('-').map(Number);
  } else {
    const n = new Date(); dpViewYear = n.getFullYear(); dpViewMonth = n.getMonth() + 1;
  }
  popup.classList.remove('hidden');
  renderDpCalendar();
  function onOut(e) {
    const wrap = document.getElementById('dp-wrap');
    if (wrap && !wrap.contains(e.target)) popup.classList.add('hidden');
    else document.addEventListener('click', onOut, { once: true });
  }
  document.addEventListener('click', onOut, { once: true });
}

function renderDpCalendar() {
  const popup = document.getElementById('dp-popup');
  if (!popup) return;
  const year = dpViewYear, month = dpViewMonth;
  const firstDow = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const sel = (dpDateInput() || {}).value || '';
  const label = new Date(year, month - 1, 1).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });

  let html = `
    <div class="dp-nav">
      <button class="dp-nav-btn" onclick="dpPrevMonth(event)">&#8249;</button>
      <span class="dp-month-label">${label}</span>
      <button class="dp-nav-btn" onclick="dpNextMonth(event)">&#8250;</button>
    </div>
    <div class="dp-grid">
      ${['S','M','T','W','T','F','S'].map(d => `<div class="dp-day-hdr">${d}</div>`).join('')}
  `;
  for (let i = 0; i < firstDow; i++) html += `<div class="dp-day dp-other"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = today.getFullYear()===year && today.getMonth()+1===month && today.getDate()===d;
    const cls = ['dp-day', isToday?'dp-today':'', sel===ds?'dp-selected':''].filter(Boolean).join(' ');
    html += `<div class="${cls}" onclick="dpSelectDate('${ds}',event)">${d}</div>`;
  }
  html += `</div>`;
  if (sel) html += `<div class="dp-clear"><button class="dp-clear-btn" onclick="dpClearDate(event)">Clear date</button></div>`;
  popup.innerHTML = html;
}

function dpPrevMonth(evt) {
  evt.stopPropagation();
  if (dpViewMonth === 1) { dpViewMonth = 12; dpViewYear--; } else dpViewMonth--;
  renderDpCalendar();
}

function dpNextMonth(evt) {
  evt.stopPropagation();
  if (dpViewMonth === 12) { dpViewMonth = 1; dpViewYear++; } else dpViewMonth++;
  renderDpCalendar();
}

function dpSelectDate(ds, evt) {
  if (evt) evt.stopPropagation();
  const inp = dpDateInput(); if (inp) inp.value = ds;
  const [y, m, d] = ds.split('-');
  document.getElementById('dp-display').textContent = `${d}/${m}/${y}`;
  document.getElementById('dp-trigger').classList.add('has-value');
  document.getElementById('dp-popup').classList.add('hidden');
  const rw = document.getElementById('dp-repeats-wrap');
  if (rw) rw.style.display = '';
}

function dpClearDate(evt) {
  evt.stopPropagation();
  const inp = dpDateInput(); if (inp) inp.value = '';
  document.getElementById('dp-display').textContent = 'Select a date';
  document.getElementById('dp-trigger').classList.remove('has-value');
  document.getElementById('dp-popup').classList.add('hidden');
  const rw = document.getElementById('dp-repeats-wrap');
  if (rw) rw.style.display = 'none';
}

function prevMonth() {
  const [y, m] = selectedBudgetMonth.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  selectedBudgetMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  renderBudget();
}

function nextMonth() {
  const [y, m] = selectedBudgetMonth.split('-').map(Number);
  const d = new Date(y, m, 1);
  selectedBudgetMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  if (state.settings && state.settings.autoFillMonths && !isMonthCustomized(selectedBudgetMonth)) {
    copyMonthFromPrevious(selectedBudgetMonth);
    return;
  }
  renderBudget();
}

function monthLabel(ym) {
  const [y, m] = ym.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
}

function monthShortLabel(ym) {
  const [y, m] = ym.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString('en-AU', { month: 'short', year: '2-digit' });
}

function getLast6Months() {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`);
  }
  return months;
}

function getActualEntries(expenseId, month) {
  const raw = (state.budget.actuals[month] || {})[expenseId];
  if (!raw) return [];
  // Migrate legacy single number
  if (typeof raw === 'number') return [{ id: 1, amount: raw, date: '', note: '' }];
  return Array.isArray(raw) ? raw : [];
}

function getActual(expenseId, month) {
  return getActualEntries(expenseId, month).reduce((s, e) => s + (e.amount || 0), 0);
}

function setActual(expenseId, month, val) {
  // Legacy compat — wraps single value as entry array
  if (!state.budget.actuals[month]) state.budget.actuals[month] = {};
  const existing = getActualEntries(expenseId, month);
  if (existing.length === 1 && !existing[0].date && !existing[0].note) {
    state.budget.actuals[month][expenseId] = [{ ...existing[0], amount: val }];
  } else {
    state.budget.actuals[month][expenseId] = [{ id: 1, amount: val, date: '', note: '' }];
  }
  saveData(state);
}

function openActualEditor(expenseId) {
  const md = getMonthData(selectedBudgetMonth);
  const expense = md.expenses.find(e => e.id === expenseId);
  if (!expense) return;
  const budgeted = itemMonthly(expense);

  function entriesHtml() {
    const entries = getActualEntries(expenseId, selectedBudgetMonth);
    const total   = entries.reduce((s, e) => s + (e.amount || 0), 0);
    const pct     = budgeted > 0 ? Math.round(total / budgeted * 100) : 0;
    const barColor = pct >= 100 ? 'var(--danger)' : pct >= 80 ? 'var(--warning)' : 'var(--success)';
    return `
      <div style="background:var(--surface2);border-radius:8px;padding:12px 14px;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
          <span style="font-size:13px;color:var(--text-muted)">Budgeted this month</span>
          <span style="font-weight:700;font-size:15px">${aud(budgeted)}</span>
        </div>
        <div style="background:var(--border);border-radius:99px;height:8px;overflow:hidden;margin-bottom:6px">
          <div style="height:100%;width:${Math.min(100,pct)}%;background:${barColor};border-radius:99px"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:12px">
          <span style="font-weight:600;color:${barColor}">${aud(total)} spent · ${pct}%</span>
          <span style="color:${pct>=100?'var(--danger)':'var(--text-muted)'}">${pct>=100?'Over by '+aud(total-budgeted):aud(budgeted-total)+' remaining'}</span>
        </div>
      </div>
      ${entries.length > 0 ? `
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:8px">Entries</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${entries.map((en,i) => `
          <div style="display:flex;align-items:center;gap:10px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:8px 12px">
            <div style="flex:1">
              <span style="font-weight:600;font-size:13px">${aud(en.amount)}</span>
              ${en.date ? `<span style="font-size:12px;color:var(--text-muted);margin-left:8px">${fmtDate(en.date)}</span>` : ''}
              ${en.note ? `<span style="font-size:12px;color:var(--text-muted);margin-left:8px">— ${escHtml(en.note)}</span>` : ''}
            </div>
            <button onclick="removeActualEntry(${expenseId},${i})" style="background:none;border:none;cursor:pointer;color:var(--danger);font-size:16px;line-height:1;padding:0 2px">&times;</button>
          </div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 12px 0;font-size:13px;font-weight:700;border-top:1px solid var(--border);margin-top:8px">
          <span>Total</span><span>${aud(total)}</span>
        </div>
      </div>` : `<p style="font-size:13px;color:var(--text-muted);margin-bottom:14px">No entries yet for ${monthLabel(selectedBudgetMonth)}.</p>`}
      <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:8px">Add Entry</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
        <div style="flex:0 0 110px">
          <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:3px">Amount</label>
          <input type="number" max="99999999" id="ae-amount" class="form-input" placeholder="0.00" min="0" step="0.01" style="width:100%">
        </div>
        <div style="flex:0 0 140px">
          <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:3px">Date (optional)</label>
          <input type="date" id="ae-date" class="form-input" style="width:100%">
        </div>
        <div style="flex:1;min-width:120px">
          <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:3px">Note (optional)</label>
          <input type="text" maxlength="200" id="ae-note" class="form-input" placeholder="e.g. Week 1 fill-up" style="width:100%">
        </div>
        <button class="btn btn-primary btn-sm" onclick="addActualEntry(${expenseId})" style="flex-shrink:0;height:38px">Add</button>
      </div>
    `;
  }

  function refreshModal() {
    document.getElementById('actual-editor-body').innerHTML = entriesHtml();
  }

  window._actualEditorRefresh = refreshModal;

  document.getElementById('modal-title').textContent = `Actuals — ${expense.name}`;
  document.getElementById('modal-body').innerHTML = `<div id="actual-editor-body">${entriesHtml()}</div>`;
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-primary" onclick="closeModal();renderBudget()">Done</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function addActualEntry(expenseId) {
  const amount = parseFloat(document.getElementById('ae-amount').value);
  if (!amount || amount <= 0) return;
  const date = document.getElementById('ae-date').value || '';
  const note = document.getElementById('ae-note').value.trim();
  if (!state.budget.actuals[selectedBudgetMonth]) state.budget.actuals[selectedBudgetMonth] = {};
  const entries = getActualEntries(expenseId, selectedBudgetMonth);
  entries.push({ id: (entries.length ? Math.max(...entries.map(e=>e.id))+1 : 1), amount, date, note });
  state.budget.actuals[selectedBudgetMonth][expenseId] = entries;
  saveData(state);
  if (window._actualEditorRefresh) window._actualEditorRefresh();
}

function removeActualEntry(expenseId, idx) {
  if (!state.budget.actuals[selectedBudgetMonth]) return;
  const entries = getActualEntries(expenseId, selectedBudgetMonth);
  entries.splice(idx, 1);
  state.budget.actuals[selectedBudgetMonth][expenseId] = entries;
  saveData(state);
  if (window._actualEditorRefresh) window._actualEditorRefresh();
}

function editActual(expenseId) {
  openActualEditor(expenseId);
}

// ─────────────────────────────────────────────────
// BANK CSV IMPORT
// ─────────────────────────────────────────────────
let _csvRows   = []; // parsed { date, description, amount }
let _csvReview = []; // { idx, date, description, amount, expenseId, checked }

function openCsvImport() {
  document.getElementById('modal-title').textContent = 'Import Bank Transactions';
  document.getElementById('modal-body').innerHTML = `
    <div style="padding:4px 0">
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">
        Upload a CSV exported from your bank. Works with ANZ, CBA, Westpac, NAB and most Australian banks.
        Transactions will be matched to your <strong>${monthLabel(selectedBudgetMonth)}</strong> budget categories.
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
  document.getElementById('modal-footer').innerHTML = `<button class="btn" onclick="closeModal()">Cancel</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function parseBankCSV(text) {
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

async function handleCsvFile(event) {
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

function _renderCsvPreview() {
  const hasKey = !!localStorage.getItem('toto_ai_key');
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
    <button class="btn" onclick="closeModal()">Cancel</button>
    ${hasKey
      ? `<button class="btn btn-primary" onclick="runCsvCategorise()">Categorise with AI →</button>`
      : `<button class="btn btn-primary" onclick="_renderCsvReview(null)">Assign Manually →</button>`}`;
}

async function runCsvCategorise() {
  const key = localStorage.getItem('toto_ai_key');
  if (!key) { _renderCsvReview(null); return; }

  document.getElementById('modal-body').innerHTML = `
    <div style="text-align:center;padding:48px 16px">
      <div style="font-size:32px;margin-bottom:12px">🤖</div>
      <div style="font-weight:600;margin-bottom:6px">Categorising ${_csvRows.length} transactions…</div>
      <div style="font-size:12px;color:var(--text-muted)">Matching to your ${monthLabel(selectedBudgetMonth)} budget categories</div>
    </div>`;
  document.getElementById('modal-footer').innerHTML = '';

  const expenses = getMonthData(selectedBudgetMonth).expenses;
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
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="_renderCsvReview(null)" style="margin-left:8px">Assign Manually →</button>`;
  }
}

function _renderCsvReview(aiMap) {
  const expenses = getMonthData(selectedBudgetMonth).expenses;
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
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="csv-apply-btn" onclick="applyCsvImport()"${checkedCount === 0 ? ' disabled' : ''}>
          Apply ${checkedCount} group${checkedCount !== 1 ? 's' : ''} (${checkedTxns} txns)
        </button>
      </div>
    </div>`;
}

function _csvToggle(idx, checked) {
  _csvReview[idx].checked = checked;
  _csvUpdateApplyBtn();
}

function _csvToggleAll(checked) {
  _csvReview.forEach((g, i) => {
    g.checked = checked;
    const el = document.getElementById(`csv-chk-${i}`);
    if (el) el.checked = checked;
  });
  _csvUpdateApplyBtn();
}

function _csvSetExpense(idx, expenseId) {
  _csvReview[idx].expenseId = expenseId;
  _csvReview[idx].checked = true;
  const chk = document.getElementById(`csv-chk-${idx}`);
  if (chk) chk.checked = true;
  _csvUpdateApplyBtn();
}

function _csvUpdateApplyBtn() {
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

function applyCsvImport() {
  const toApply = _csvReview.filter(g => g.checked && g.expenseId !== -1);
  if (!toApply.length) { closeModal(); return; }

  if (!state.budget.actuals[selectedBudgetMonth]) state.budget.actuals[selectedBudgetMonth] = {};
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
        if (isMonthCustomized(selectedBudgetMonth)) {
          const mb = state.budget.months[selectedBudgetMonth];
          mb.expenses.push({ ...newExp, id: nextId(mb.expenses) });
          createdExpenses[eid] = mb.expenses[mb.expenses.length - 1].id;
        } else {
          createdExpenses[eid] = newExp.id;
        }
      }
      eid = createdExpenses[eid];
    }

    const entries = getActualEntries(eid, selectedBudgetMonth);
    const nId     = entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1;
    const note    = g.descs.join(', ') + (g.count > g.descs.length ? ` +${g.count - g.descs.length} more` : '');
    entries.push({ id: nId, amount: g.total, date: g.txns[0].date, note: `${g.count} transactions: ${note}` });
    state.budget.actuals[selectedBudgetMonth][eid] = entries;
  });

  saveData(state);
  closeModal();
  renderAll();
}

// ─────────────────────────────────────────────────
// QUICK-ADD SPEND
// ─────────────────────────────────────────────────
let _qaAmount     = '';
let _qaExpenseId  = null;

function openQuickAdd() {
  _renderQAHub();
  document.getElementById('qa-overlay').classList.add('open');
  requestAnimationFrame(() => document.getElementById('qa-sheet').classList.add('open'));
}

function closeQuickAdd() {
  document.getElementById('qa-sheet').classList.remove('open');
  document.getElementById('qa-overlay').classList.remove('open');
}

function _renderQAHub() {
  document.getElementById('qa-sheet').innerHTML = `
    <div class="qa-handle"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px 4px">
      <span style="font-size:17px;font-weight:700;color:var(--ink);font-family:var(--sans)">Quick Add</span>
      <button onclick="closeQuickAdd()" style="background:none;border:none;font-size:24px;color:var(--muted);cursor:pointer;line-height:1;padding:4px">×</button>
    </div>

    <div class="qah-input-label">What would you like to do?</div>
    <div class="qah-input-row">
      <input id="qah-text" type="text" class="qah-bare" placeholder="e.g. coffee $4.50 · dentist 3rd June 2pm · pay electricity"
        onkeydown="if(event.key==='Enter')_qahSendText()">
      <button class="qah-ai-send" onclick="_qahSendText()" title="Submit">↑</button>
    </div>

    <div class="qah-grid">
      <div class="qah-tile" onclick="_qahAction('event')">
        <div class="qah-tile-icon" style="background:#EEF2FF">📅</div>
        <div class="qah-tile-label">Create Event</div>
        <div class="qah-tile-sub">Planner</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('expense')">
        <div class="qah-tile-icon" style="background:#FEF9C3">💸</div>
        <div class="qah-tile-label">Log Expense</div>
        <div class="qah-tile-sub">Wallet</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('income')">
        <div class="qah-tile-icon" style="background:#ECFDF5">💰</div>
        <div class="qah-tile-label">Add Income</div>
        <div class="qah-tile-sub">Wallet</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('bill')">
        <div class="qah-tile-icon" style="background:#FFF7ED">🧾</div>
        <div class="qah-tile-label">Enter Bill</div>
        <div class="qah-tile-sub">Wallet</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('chore')">
        <div class="qah-tile-icon" style="background:#F0FDF4">🧹</div>
        <div class="qah-tile-label">Create Chore</div>
        <div class="qah-tile-sub">Home</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('shopping')">
        <div class="qah-tile-icon" style="background:#F0F9FF">🛒</div>
        <div class="qah-tile-label">Shopping List</div>
        <div class="qah-tile-sub">Meals</div>
      </div>
    </div>

    <div class="qah-ask-row" onclick="_qahAction('ai')">
      <div class="qah-ask-icon">🐕</div>
      <div>
        <div class="qah-ask-label">Ask Toto</div>
        <div class="qah-ask-sub">Chat with your AI family assistant</div>
      </div>
    </div>
    <div style="height:max(12px,env(safe-area-inset-bottom))"></div>`;

  requestAnimationFrame(() => document.getElementById('qah-text')?.focus());
}

function _qahAction(type) {
  closeQuickAdd();
  setTimeout(() => {
    if (type === 'event') {
      activateTab('planner');
      setTimeout(() => openPlannerModal(null, new Date().toISOString().slice(0,10)), 300);
    } else if (type === 'expense') {
      const expenses = getMonthData(selectedBudgetMonth).expenses;
      const lastId = parseInt(localStorage.getItem('toto_qa_last') || '0');
      _qaExpenseId = expenses.find(e => e.id === lastId)?.id ?? (expenses[0]?.id ?? null);
      _qaAmount = '';
      _renderQASheet(expenses);
      document.getElementById('qa-overlay').classList.add('open');
      requestAnimationFrame(() => document.getElementById('qa-sheet').classList.add('open'));
    } else if (type === 'income') {
      activateTab('budget');
      setTimeout(() => openAddIncome(), 300);
    } else if (type === 'bill') {
      activateTab('bills');
      setTimeout(() => openBillModal(), 300);
    } else if (type === 'chore') {
      activateTab('kids');
      setTimeout(() => { if (typeof renderChoreMgmt === 'function') renderChoreMgmt(); }, 300);
    } else if (type === 'shopping') {
      window._listsActiveType = 'food'; window._listsView = 'list'; activateTab('lists');
    } else if (type === 'ai') {
      if (typeof toggleTotoAssistant === 'function') toggleTotoAssistant();
    }
  }, 320);
}

async function _qahSendText() {
  const text = document.getElementById('qah-text')?.value.trim();
  if (!text) { _qahAction('ai'); return; }

  // Show loading state
  const btn = document.querySelector('.qah-ai-send');
  if (btn) { btn.textContent = '…'; btn.disabled = true; }

  const today = new Date().toISOString().slice(0, 10);
  const prompt = `Today is ${today}. The user typed: "${text}"

Parse this into a structured action. Return ONLY raw JSON, no markdown.

Respond with one of these shapes:
{"type":"event","title":"...","date":"YYYY-MM-DD","time":"HH:MM"}
{"type":"expense","amount":0.00,"note":"..."}
{"type":"income","name":"...","amount":0.00}
{"type":"bill","name":"...","amount":0.00,"dueDate":"YYYY-MM-DD"}
{"type":"chore","name":"..."}
{"type":"shopping","name":"...","qty":"..."}
{"type":"unknown"}

Rules:
- If it mentions an appointment, meeting, event, or a date/time → event
- If it mentions spending, buying, paid, cost, $amount with no income context → expense
- If it mentions salary, earned, received, payment in → income
- If it mentions a bill, subscription, due, invoice → bill
- If it mentions a chore, task, clean, tidy, fix → chore
- If it mentions grocery, buy at store, shopping item → shopping
- Dates like "3rd June" = 2026-06-03, "next Monday" = calculate from today
- Times like "2pm" = "14:00"
- If genuinely unclear → unknown`;

  try {
    const key = state.settings?.claudeApiKey;
    const res = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 150, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await res.json();
    const raw = data.content?.[0]?.text?.trim() || '{"type":"unknown"}';
    const parsed = JSON.parse(raw.replace(/```[\w]*\n?/g, '').trim());
    closeQuickAdd();
    await _qahApplyParsed(parsed, text);
  } catch(e) {
    // On any error, fall back to AI chat
    closeQuickAdd();
    setTimeout(() => {
      if (typeof toggleTotoAssistant === 'function') toggleTotoAssistant();
      setTimeout(() => {
        const inp = document.getElementById('toto-input') || document.querySelector('.toto-msg-input');
        if (inp) { inp.value = text; inp.focus(); }
      }, 400);
    }, 320);
  }
}

async function _qahApplyParsed(parsed, originalText) {
  const delay = ms => new Promise(r => setTimeout(r, ms));
  if (parsed.type === 'event') {
    activateTab('planner');
    await delay(320);
    openPlannerModal(null, parsed.date || new Date().toISOString().slice(0,10));
    await delay(200);
    const titleEl = document.getElementById('pe-title');
    const timeEl  = document.getElementById('pe-time');
    if (titleEl) titleEl.value = parsed.title || originalText;
    if (timeEl && parsed.time) timeEl.value = parsed.time;
    // Update the date display if date provided
    if (parsed.date) {
      const dateEl = document.getElementById('pe-date');
      const dispEl = document.getElementById('pm-start-display');
      if (dateEl) dateEl.value = parsed.date;
      if (dispEl && typeof _pmFmtDateShort === 'function') dispEl.textContent = _pmFmtDateShort(parsed.date);
    }
  } else if (parsed.type === 'expense') {
    const expenses = getMonthData(selectedBudgetMonth).expenses;
    const lastId = parseInt(localStorage.getItem('toto_qa_last') || '0');
    _qaExpenseId = expenses.find(e => e.id === lastId)?.id ?? (expenses[0]?.id ?? null);
    _qaAmount = parsed.amount ? String(parsed.amount) : '';
    _renderQASheet(expenses);
    document.getElementById('qa-overlay').classList.add('open');
    requestAnimationFrame(() => {
      document.getElementById('qa-sheet').classList.add('open');
      const noteEl = document.getElementById('qa-note');
      if (noteEl && parsed.note) noteEl.value = parsed.note;
    });
  } else if (parsed.type === 'income') {
    activateTab('budget');
    await delay(320);
    openAddIncome();
    await delay(200);
    const nameEl = document.getElementById('inc-name') || document.querySelector('#modal-body [id*="name"]');
    const amtEl  = document.getElementById('inc-amount') || document.querySelector('#modal-body [id*="amount"]');
    if (nameEl && parsed.name) nameEl.value = parsed.name;
    if (amtEl && parsed.amount) amtEl.value = parsed.amount;
  } else if (parsed.type === 'bill') {
    activateTab('bills');
    await delay(320);
    openBillModal();
    await delay(200);
    const nameEl = document.getElementById('bill-name');
    const amtEl  = document.getElementById('bill-amount');
    const dueEl  = document.getElementById('bill-due');
    if (nameEl && parsed.name) nameEl.value = parsed.name;
    if (amtEl && parsed.amount) amtEl.value = parsed.amount;
    if (dueEl && parsed.dueDate) dueEl.value = parsed.dueDate;
  } else if (parsed.type === 'chore') {
    activateTab('kids');
    await delay(320);
  } else if (parsed.type === 'shopping') {
    window._listsActiveType = 'food';
    window._listsView = 'list';
    activateTab('lists');
    await delay(320);
    const nameEl = document.getElementById('ls-quick-input');
    const qtyEl  = null;
    if (nameEl && parsed.name) { nameEl.value = parsed.name; nameEl.focus(); }
    if (qtyEl && parsed.qty) qtyEl.value = parsed.qty;
  } else {
    // Unknown — send to Toto AI
    if (typeof toggleTotoAssistant === 'function') toggleTotoAssistant();
    await delay(400);
    const inp = document.getElementById('toto-input') || document.querySelector('.toto-msg-input');
    if (inp) { inp.value = originalText; inp.focus(); }
  }
}

function _renderQASheet(expensesArg) {
  const expenses = expensesArg || getMonthData(selectedBudgetMonth).expenses;
  const display  = _qaAmount ? `$${_qaAmount}` : '$0';
  const isZero   = !_qaAmount;

  const catPills = expenses.length
    ? expenses.map(e => `<button class="qa-cat${e.id === _qaExpenseId ? ' selected' : ''}" onclick="_qaSelectCat(${e.id})">${escHtml(e.name)}</button>`).join('')
    : `<span style="color:var(--text-muted);font-size:13px;padding:6px 4px">Add budget expenses first</span>`;

  const numKeys = ['1','2','3','4','5','6','7','8','9','.','0','⌫'];

  document.getElementById('qa-sheet').innerHTML = `
    <div class="qa-handle"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 20px 0">
      <span style="font-size:16px;font-weight:700">Log Spend</span>
      <button onclick="closeQuickAdd()" style="background:none;border:none;font-size:24px;color:var(--text-muted);cursor:pointer;line-height:1;padding:4px">×</button>
    </div>

    <div class="qa-amount-display${isZero ? ' zero' : ''}" id="qa-display">${display}</div>

    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);padding:0 20px 8px">Category</div>
    <div class="qa-cats" id="qa-cats">${catPills}</div>

    <div class="qa-numpad">
      ${numKeys.map(k => `<button class="qa-key${k==='⌫'?' qa-key-del':''}" onclick="_qaKey('${k}')">${k}</button>`).join('')}
    </div>

    <div style="padding:0 16px 12px;display:flex;flex-direction:column;gap:10px">
      <input class="form-input" type="text" maxlength="200" id="qa-note" placeholder="Note (optional)"
        style="border-radius:12px" autocomplete="off">
      <button class="btn btn-primary" onclick="saveQuickAdd()"
        style="height:54px;font-size:16px;font-weight:700;border-radius:14px;background:#0891b2;border-color:#0891b2">
        Save Spend
      </button>
    </div>`;
}

function _qaKey(k) {
  if (k === '⌫') {
    _qaAmount = _qaAmount.slice(0, -1);
  } else if (k === '.') {
    if (!_qaAmount.includes('.')) _qaAmount += (_qaAmount ? '' : '0') + '.';
  } else {
    const parts = _qaAmount.split('.');
    if (parts[1] !== undefined && parts[1].length >= 2) return;
    if (_qaAmount.replace('.','').length >= 6) return;
    if (_qaAmount === '0' && k !== '.') _qaAmount = k;
    else _qaAmount += k;
  }
  const el = document.getElementById('qa-display');
  if (!el) return;
  const isZero = !_qaAmount;
  el.textContent = _qaAmount ? `$${_qaAmount}` : '$0';
  el.className = `qa-amount-display${isZero ? ' zero' : ''}`;
}

function _qaSelectCat(id) {
  _qaExpenseId = id;
  document.querySelectorAll('.qa-cat').forEach(b => {
    b.classList.toggle('selected', parseInt(b.getAttribute('onclick').match(/\d+/)[0]) === id);
  });
}

function saveQuickAdd() {
  const amount = parseFloat(_qaAmount);
  if (!amount || amount <= 0) {
    const el = document.getElementById('qa-display');
    if (el) { el.style.color = 'var(--danger)'; setTimeout(() => el.style.color = '', 600); }
    return;
  }
  if (!_qaExpenseId) {
    const cats = document.getElementById('qa-cats');
    if (cats) { cats.style.outline = '2px solid var(--danger)'; cats.style.borderRadius = '8px'; setTimeout(() => { cats.style.outline=''; }, 600); }
    return;
  }

  const note  = document.getElementById('qa-note')?.value.trim() || '';
  const today = new Date().toISOString().slice(0, 10);

  if (!state.budget.actuals[selectedBudgetMonth]) state.budget.actuals[selectedBudgetMonth] = {};
  const entries = getActualEntries(_qaExpenseId, selectedBudgetMonth);
  const newId   = entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1;
  entries.push({ id: newId, amount, date: today, note });
  state.budget.actuals[selectedBudgetMonth][_qaExpenseId] = entries;

  localStorage.setItem('toto_qa_last', String(_qaExpenseId));
  saveData(state);
  closeQuickAdd();
  renderAll();

  // FAB flash confirmation
  const fab = document.getElementById('qa-fab');
  if (fab) {
    fab.textContent = '✓';
    fab.style.background = '#10b981';
    setTimeout(() => { fab.textContent = '+'; fab.style.background = ''; }, 1800);
  }
}

// nextId, aud, audD, fmtDate, isOverdue imported from ./sections/format.js

// ─────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────

// Section definitions — maps each sub-tab to its section and pill config
// SECTIONS, _tabSection, _activeTab, _sectionPillsHtml, _updatePillsOverflow,
// _activateTabInternal, activateTab — all imported from ./router.js

// Router functions imported from ./router.js — see above imports.
// Nav item click listeners still needed here (DOM is ready at this point).
window.addEventListener('resize', () => {
  document.querySelectorAll('.section-pills-wrap').forEach(_updatePillsOverflow);
});
document.querySelectorAll('.nav-item, .nav-text-item').forEach(el => {
  el.addEventListener('click', () => activateTab(el.dataset.tab));
});

// ─────────────────────────────────────────────────
// MONEY DASHBOARD
// ─────────────────────────────────────────────────

function prevMoneyMonth() {
  const [y, m] = selectedBudgetMonth.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  selectedBudgetMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  safeRender(renderMoneyDashboard);
  safeRender(renderBudget);
}

function nextMoneyMonth() {
  const [y, m] = selectedBudgetMonth.split('-').map(Number);
  const d = new Date(y, m, 1);
  selectedBudgetMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  safeRender(renderMoneyDashboard);
  safeRender(renderBudget);
}

function renderMoneyDashboard() {
  const md = getMonthData(selectedBudgetMonth);
  const income   = md.income;
  const expenses = md.expenses;

  const totalIncome   = monthlyTotal(income);
  const totalExpenses = monthlyTotal(expenses);
  const surplus       = totalIncome - totalExpenses;
  const savingsRate   = totalIncome > 0 ? Math.round(surplus / totalIncome * 100) : 0;

  // Group expenses by category
  const byCategory = {};
  expenses.forEach(e => {
    const cat = e.category || 'Other';
    byCategory[cat] = (byCategory[cat] || 0) + itemMonthly(e);
  });
  const sortedCats = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  const actuals     = state.budget.actuals[selectedBudgetMonth] || {};
  const totalActual = expenses.reduce((s, e) => s + getActual(e.id, selectedBudgetMonth), 0);
  const hasActuals  = totalActual > 0;

  // ── Month nav + KPI cards ──────────────────────
  let html = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
      <button class="btn btn-sm" onclick="prevMoneyMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${monthLabel(selectedBudgetMonth)}</span>
      <button class="btn btn-sm" onclick="nextMoneyMonth()" style="font-size:16px;padding:2px 10px">›</button>
      ${isMonthCustomized(selectedBudgetMonth) ? '<span style="margin-left:8px;font-size:12px;padding:2px 10px;background:#dbeafe;color:#1d4ed8;border-radius:99px">Custom month</span>' : ''}
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-label">Monthly Income</div>
        <div class="card-value green">${aud(totalIncome)}</div>
        <div class="card-sub">${income.length} source${income.length !== 1 ? 's' : ''}</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Expenses</div>
        <div class="card-value ${totalExpenses > totalIncome ? 'red' : ''}">${aud(totalExpenses)}</div>
        <div class="card-sub">${expenses.length} item${expenses.length !== 1 ? 's' : ''}</div>
      </div>
      <div class="card">
        <div class="card-label">${surplus >= 0 ? 'Surplus' : 'Deficit'}</div>
        <div class="card-value ${surplus >= 0 ? 'green' : 'red'}">${aud(Math.abs(surplus))}</div>
        <div class="card-sub">${surplus >= 0 ? 'left over each month' : 'overspending each month'}</div>
      </div>
      <div class="card">
        <div class="card-label">Savings Rate</div>
        <div class="card-value ${savingsRate >= 20 ? 'green' : savingsRate >= 10 ? 'orange' : 'red'}">${savingsRate}%</div>
        <div class="card-sub">of income remaining</div>
      </div>
    </div>
  `;

  // ── Two-column: Income | Expenses by category ──
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-bottom:20px">`;

  // Income list
  html += `
    <div class="section">
      <div class="section-header">
        <div class="section-title">Income</div>
        <span style="font-size:15px;font-weight:700;color:var(--success)">${aud(totalIncome)}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Frequency</th><th class="amount">Monthly</th></tr></thead>
          <tbody>
            ${income.length === 0
              ? '<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:20px">No income added yet</td></tr>'
              : income.map(item => {
                  const pct = totalIncome > 0 ? Math.round(itemMonthly(item) / totalIncome * 100) : 0;
                  return `<tr>
                    <td style="font-weight:500;border-left:4px solid #10b981">${escHtml(item.name)}</td>
                    <td style="color:var(--text-muted);font-size:12px">${freqDisplayItem(item)}</td>
                    <td class="amount">${aud(itemMonthly(item))} <span style="color:var(--text-muted);font-size:11px">${pct}%</span></td>
                  </tr>`;
                }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Expenses by category with progress bars
  html += `
    <div class="section">
      <div class="section-header">
        <div class="section-title">Expenses by Category</div>
        <span style="font-size:15px;font-weight:700;color:var(--danger)">${aud(totalExpenses)}</span>
      </div>
      <div style="padding:16px 20px">
        ${sortedCats.length === 0
          ? '<div style="color:var(--text-muted);text-align:center;padding:20px">No expenses added yet</div>'
          : sortedCats.map(([cat, amt]) => {
              const color = colors.expense[cat] || '#94a3b8';
              const pct   = totalExpenses > 0 ? (amt / totalExpenses * 100) : 0;
              const actualAmt = expenses
                .filter(e => (e.category || 'Other') === cat)
                .reduce((s, e) => s + (actuals[e.id] || 0), 0);
              const hasActualForCat = expenses.some(e => (e.category || 'Other') === cat && actuals[e.id] !== undefined);
              return `
                <div style="margin-bottom:16px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                    <span style="display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500">
                      <span style="width:11px;height:11px;border-radius:50%;background:${color};flex-shrink:0"></span>
                      ${cat}
                    </span>
                    <span style="font-size:13px;font-weight:600">${aud(amt)}
                      <span style="font-weight:400;color:var(--text-muted);font-size:11px">${Math.round(pct)}%</span>
                    </span>
                  </div>
                  <div style="height:7px;background:var(--surface2);border-radius:4px;overflow:hidden;position:relative">
                    <div style="height:100%;width:${pct.toFixed(1)}%;background:${color};border-radius:4px;opacity:0.85"></div>
                    ${hasActualForCat ? `<div style="position:absolute;top:0;height:100%;width:${Math.min(totalExpenses > 0 ? actualAmt/totalExpenses*100 : 0, 100).toFixed(1)}%;background:${color};border-radius:4px;border:1.5px solid #fff"></div>` : ''}
                  </div>
                  ${hasActualForCat ? `<div style="font-size:11px;color:var(--text-muted);margin-top:3px">Actual: ${aud(actualAmt)}</div>` : ''}
                </div>
              `;
            }).join('')}
      </div>
    </div>
  `;

  html += `</div>`;

  // ── Actuals vs Budget table ────────────────────
  if (hasActuals) {
    const budgetVsActual = totalExpenses - totalActual;
    html += `
      <div class="section" style="margin-bottom:20px">
        <div class="section-header">
          <div>
            <div class="section-title">Actuals — ${monthLabel(selectedBudgetMonth)}</div>
            <div class="section-subtitle">Recorded spending vs budget</div>
          </div>
          <div style="display:flex;gap:16px;align-items:center;font-size:13px;flex-wrap:wrap">
            <span>Budget: <strong>${aud(totalExpenses)}</strong></span>
            <span>Actual: <strong>${aud(totalActual)}</strong></span>
            <span style="font-weight:600;color:${budgetVsActual >= 0 ? 'var(--success)' : 'var(--danger)'}">
              ${budgetVsActual >= 0 ? '▼' : '▲'} ${aud(Math.abs(budgetVsActual))} ${budgetVsActual >= 0 ? 'under' : 'over'}
            </span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Expense</th><th>Category</th><th class="amount">Budget</th><th class="amount">Actual</th><th class="amount">Difference</th></tr></thead>
            <tbody>
              ${expenses.filter(e => actuals[e.id] !== undefined).map(e => {
                  const bud   = itemMonthly(e);
                  const act   = actuals[e.id] || 0;
                  const diff  = bud - act;
                  const color = colors.expense[e.category || 'Other'] || '#94a3b8';
                  return `<tr>
                    <td style="font-weight:500;border-left:4px solid ${color}">${escHtml(e.name)}</td>
                    <td><span style="display:inline-block;padding:2px 9px;border-radius:99px;background:${color};color:#fff;font-size:11px;font-weight:600">${e.category || 'Other'}</span></td>
                    <td class="amount">${aud(bud)}</td>
                    <td class="amount">${aud(act)}</td>
                    <td class="amount" style="font-weight:600;color:${diff >= 0 ? 'var(--success)' : 'var(--danger)'}">
                      ${diff >= 0 ? '−' : '+'}${aud(Math.abs(diff))}
                    </td>
                  </tr>`;
                }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ── 6-month trend chart ────────────────────────
  const last6     = getLast6Months();
  const trendData = last6.map(mo => {
    const md2 = getMonthData(mo);
    return {
      label:    monthShortLabel(mo),
      income:   monthlyTotal(md2.income),
      expenses: monthlyTotal(md2.expenses),
      actual:   Object.values(state.budget.actuals[mo] || {}).reduce((s, v) => s + v, 0)
    };
  });

  const maxVal = Math.max(...trendData.flatMap(d => [d.income, d.expenses, d.actual]), 1);
  const W = 600, PL = 64, PR = 12, PT = 12, PB = 32;
  const chartH = 180 - PT - PB;
  const chartW  = W - PL - PR;
  const groupW  = chartW / trendData.length;
  const barW    = groupW * 0.22;

  const yLines = [0, 0.25, 0.5, 0.75, 1].map(p => {
    const y = PT + chartH - p * chartH;
    return `<line x1="${PL}" y1="${y}" x2="${W-PR}" y2="${y}" stroke="#e2e8f0" stroke-width="1"/>
      <text x="${PL-5}" y="${y+4}" text-anchor="end" font-size="9" fill="#94a3b8">${aud(p * maxVal)}</text>`;
  }).join('');

  const bars = trendData.map((d, i) => {
    const x  = PL + i * groupW + groupW * 0.05;
    const iH = d.income   > 0 ? (d.income   / maxVal) * chartH : 0;
    const eH = d.expenses > 0 ? (d.expenses / maxVal) * chartH : 0;
    const aH = d.actual   > 0 ? (d.actual   / maxVal) * chartH : 0;
    const lx = x + barW + barW / 2 + groupW * 0.04;
    return `
      <rect x="${x}"                        y="${PT+chartH-iH}" width="${barW}" height="${iH}" fill="#10b981" opacity="0.75" rx="2"/>
      <rect x="${x+barW+groupW*0.06}"       y="${PT+chartH-eH}" width="${barW}" height="${eH}" fill="#3b82f6" opacity="0.7"  rx="2"/>
      ${d.actual > 0 ? `<rect x="${x+barW*2+groupW*0.12}" y="${PT+chartH-aH}" width="${barW}" height="${aH}" fill="${d.actual > d.expenses ? '#ef4444' : '#f59e0b'}" opacity="0.85" rx="2"/>` : ''}
      <text x="${lx}" y="${PT+chartH+16}" text-anchor="middle" font-size="10" fill="#64748b">${d.label}</text>
    `;
  }).join('');

  html += `
    <div class="section">
      <div class="section-header">
        <div class="section-title">6-Month Trend</div>
        <div class="chart-legend">
          <span><span class="legend-dot" style="background:#10b981"></span>Income</span>
          <span><span class="legend-dot" style="background:#3b82f6"></span>Budget</span>
          <span><span class="legend-dot" style="background:#f59e0b"></span>Actual (under)</span>
          <span><span class="legend-dot" style="background:#ef4444"></span>Actual (over)</span>
        </div>
      </div>
      <div style="padding:16px 20px 8px">
        <svg viewBox="0 0 ${W} ${PT+chartH+PB}" style="width:100%;height:auto;display:block">
          ${yLines}${bars}
        </svg>
      </div>
    </div>
  `;

  document.getElementById('money-content').innerHTML = html;
}

// ─────────────────────────────────────────────────
// FINANCIAL HEALTH SCORE
// ─────────────────────────────────────────────────

function calcFinancialHealth() {
  const curData = getMonthData(selectedBudgetMonth);
  const monthlyIncome   = monthlyTotal(curData.income);
  const monthlyExpenses = monthlyTotal(curData.expenses);
  const surplus     = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? surplus / monthlyIncome : null;

  // 1. Savings Rate (0-20)
  let savingsScore;
  if (monthlyIncome === 0)      savingsScore = 10;
  else if (savingsRate >= 0.20) savingsScore = 20;
  else if (savingsRate >= 0)    savingsScore = Math.round(savingsRate / 0.20 * 20);
  else                          savingsScore = 0;

  // 2. Budget Tracking (0-20) — how consistently actuals are recorded + under budget
  const recentMonths = getLast6Months().slice(3);
  let trackedCount = 0, underCount = 0;
  recentMonths.forEach(mo => {
    const md2 = getMonthData(mo);
    if (md2.expenses.some(e => getActualEntries(e.id, mo).length > 0)) {
      trackedCount++;
      const totalActual = md2.expenses.reduce((s, e) => s + getActual(e.id, mo), 0);
      if (totalActual <= monthlyTotal(md2.expenses)) underCount++;
    }
  });
  const trackScore = trackedCount === 0 ? 5
    : Math.round((trackedCount / 3) * 10 + (underCount / trackedCount) * 10);

  // 3. Net Worth (0-20) — debt-to-asset ratio
  const nwAssets = (state.netWorth.assets||[]).reduce((s,a)=>s+(parseFloat(a.value)||0),0);
  const nwLiabs  = (state.netWorth.liabilities||[]).reduce((s,l)=>s+(parseFloat(l.value)||0),0);
  const netWorth = nwAssets - nwLiabs;
  let nwScore;
  if (nwAssets === 0 && nwLiabs === 0) nwScore = 10;
  else if (netWorth <= 0) nwScore = Math.max(0, 3);
  else {
    const debtRatio = nwLiabs > 0 ? nwLiabs / nwAssets : 0;
    nwScore = debtRatio < 0.3 ? 20 : debtRatio < 0.6 ? 15 : debtRatio < 0.8 ? 10 : 6;
  }

  // 4. Emergency Buffer (0-20) — months of expenses covered by assets
  let bufScore;
  if (monthlyExpenses === 0) bufScore = 10;
  else {
    const months = nwAssets / monthlyExpenses;
    bufScore = months >= 6 ? 20 : months >= 3 ? 15 : months >= 1 ? 8 : nwAssets === 0 ? 5 : 3;
  }

  // 5. Goals (0-20) — having goals + average progress
  const activeGoals = (state.goals||[]).filter(g => g.status !== 'achieved');
  let goalScore;
  if (activeGoals.length === 0) goalScore = 8;
  else {
    const avgPct = activeGoals.reduce((s,g) => s + Math.min((g.saved||0) / (g.target||1), 1), 0) / activeGoals.length;
    goalScore = 10 + Math.round(avgPct * 10);
  }

  const total = savingsScore + trackScore + nwScore + bufScore + goalScore;
  const grade = total >= 85 ? 'A' : total >= 70 ? 'B' : total >= 55 ? 'C' : total >= 40 ? 'D' : 'F';
  const color = total >= 80 ? '#10b981' : total >= 60 ? '#f59e0b' : total >= 40 ? '#f97316' : '#ef4444';

  // Personalised insight — worst dimension
  const dimTips = [
    { score: savingsScore, tip: `Boost your savings rate — aim for 20%+ of income (currently ${monthlyIncome > 0 ? Math.round((savingsRate||0)*100) : 0}%)` },
    { score: trackScore,   tip: 'Log actuals monthly in the Budget tab to stay on track' },
    { score: nwScore,      tip: 'Reduce liabilities or grow assets to strengthen your net worth' },
    { score: bufScore,     tip: `Build an emergency fund of 3–6 months expenses (${aud(monthlyExpenses*3)}–${aud(monthlyExpenses*6)})` },
    { score: goalScore,    tip: 'Set specific savings goals in the Goals tab to stay focused' },
  ];
  const worst = [...dimTips].sort((a,b) => a.score - b.score)[0];
  const insight = worst.score < 12 ? worst.tip : 'Great shape — stay consistent and keep building your financial cushion.';

  return {
    total, grade, color, insight,
    dimensions: [
      { label: 'Savings Rate',     score: savingsScore, max: 20 },
      { label: 'Budget Tracking',  score: trackScore,   max: 20 },
      { label: 'Net Worth',        score: nwScore,      max: 20 },
      { label: 'Emergency Buffer', score: bufScore,     max: 20 },
      { label: 'Goals',            score: goalScore,    max: 20 },
    ]
  };
}

// ─────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────

const _SECTION_COLORS = { Wallet:'#059669', Plan:'#0891b2', Home:'#7c3aed' };

function _sectionTag(section) {
  if (!section) return '';
  const color = _SECTION_COLORS[section] || '#71717a';
  return `<span style="font-size:10px;font-weight:700;color:${color};margin-right:6px">${section}</span>`;
}

function _tlItem(c) {
  const dotColor = { red:'#ef4444', amber:'#f59e0b', green:'#10b981', blue:'#0891b2' }[c.cls] || '#a1a1aa';
  const clickAttr = c.onclick ? c.onclick : c.tab ? `activateTab('${c.tab}')` : '';
  return `<div class="notif-tl-item">
    <div class="notif-tl-dot" style="background:${dotColor}"></div>
    <div class="notif-tl-body"><div class="notif-tl-title">${_sectionTag(c.section)}${c.title}</div>${c.sub ? `<div class="notif-tl-sub">${c.sub}</div>` : ''}</div>
    <div class="notif-tl-action" onclick="${clickAttr}">${c.action.replace(' →','')}</div>
  </div>`;
}

function _renderContextBanners(tab) {
  // Context-aware banners on sub-pages
  const banners = [];
  if (tab === 'budget') {
    const md = getMonthData(selectedBudgetMonth);
    md.expenses.forEach(e => {
      const budgeted = itemMonthly(e);
      const actual = getActual(e.id, selectedBudgetMonth);
      if (budgeted > 0 && actual / budgeted >= 0.8 && actual < budgeted) {
        banners.push({ cls: 'amber', text: `${escHtml(e.name)} at ${Math.round(actual/budgeted*100)}% — ${aud(budgeted - actual)} left`, tab: null });
      } else if (budgeted > 0 && actual >= budgeted) {
        banners.push({ cls: 'red', text: `${escHtml(e.name)} over budget by ${aud(actual - budgeted)}`, tab: null });
      }
    });
  }
  return banners.slice(0, 2).map(b =>
    `<div class="notif-banner ${b.cls}">
      <div class="notif-banner-dot" style="background:${b.cls === 'red' ? '#ef4444' : '#f59e0b'}"></div>
      <div class="notif-banner-body" style="color:${b.cls === 'red' ? '#991b1b' : '#92400e'}">${b.text}</div>
    </div>`
  ).join('');
}

// ─────────────────────────────────────────────────
// TYPE A MODE — LIFE SCORE + MISSIONS
// ─────────────────────────────────────────────────
function calcLifeScore() {
  const dims = [];
  const today = new Date();
  const curMonth = selectedBudgetMonth;

  // ── Household context ─────────────────────────────────────────
  const adults    = (state.householdProfile?.members || []).filter(m => m.role === 'adult');
  const kidProfiles = state.kids?.profiles || [];
  const hasKids   = kidProfiles.length > 0;
  const householdSize = Math.max(1, adults.length) + kidProfiles.length;

  // ── 1. Budget ─────────────────────────────────────────────────
  const md = getMonthData(curMonth);
  const hasIncome   = md.income.length > 0;
  const hasExpenses = md.expenses.length > 0;
  const hasActuals  = md.expenses.some(e => getActualEntries(e.id, curMonth).length > 0);
  const budgetScore = (hasIncome ? 30 : 0) + (hasExpenses ? 30 : 0) + (hasActuals ? 40 : 0);
  dims.push({ key: 'budget', label: 'Budget', score: budgetScore,
    tip: !hasIncome ? 'Add your income sources' : !hasExpenses ? 'Add your expenses' : !hasActuals ? 'Log actual spending this month' : 'On track',
    tab: 'budget' });

  // ── 2. Meals — target scaled to household size ────────────────
  // Solo: only dinners matter (7). Small family (2–3): 14. Full family (4+): 21.
  const weekKey  = _mealWeekKey(0);
  const mealPlan = state.meals?.plan?.[weekKey] || {};
  let mealsFilled = 0;
  const mealsTarget = householdSize === 1 ? 7 : householdSize <= 3 ? 14 : 21;
  for (let d = 0; d < 7; d++) {
    const dp = mealPlan[d] || {};
    if (householdSize === 1) { if (dp.d) mealsFilled++; }
    else if (householdSize <= 3) { if (dp.l) mealsFilled++; if (dp.d) mealsFilled++; }
    else { if (dp.b) mealsFilled++; if (dp.l) mealsFilled++; if (dp.d) mealsFilled++; }
  }
  const mealsPct = Math.round(mealsFilled / mealsTarget * 80);
  // Shopping list: now reads from state.lists.food (new system)
  const foodItems      = state.lists?.food?.items || [];
  const activeFood     = foodItems.filter(i => i.state === 'active').length;
  const gotItFood      = foodItems.filter(i => i.state === 'got_it').length;
  const hasActiveList  = activeFood > 0 || gotItFood > 0;
  const mealsScore     = mealsPct + (hasActiveList ? 20 : 0);
  dims.push({ key: 'meals', label: 'Meals', score: Math.min(100, mealsScore),
    tip: mealsFilled === 0 ? 'Plan this week\'s meals' : mealsFilled < mealsTarget ? `${mealsFilled}/${mealsTarget} meals planned` : !hasActiveList ? 'Add items to your shopping list' : 'Meals sorted',
    tab: 'meals' });

  // ── 3. Home ───────────────────────────────────────────────────
  const maintItems   = state.maintenance || [];
  const maintOverdue = maintItems.filter(m => { const d = _maintDaysUntil(m); return d !== null && d < 0; }).length;
  const maintScore   = maintItems.length === 0 ? 30 : Math.max(0, 100 - maintOverdue * 25);
  const vehicleItems = state.vehicles || [];
  const vehIssues    = vehicleItems.filter(v => {
    if (v.regoExpiry && Math.ceil((new Date(v.regoExpiry) - today) / 86400000) < 30) return true;
    if (v.insurance?.renewalDate && Math.ceil((new Date(v.insurance.renewalDate) - today) / 86400000) < 30) return true;
    return false;
  }).length;
  const docItems    = state.documents || [];
  const docExpiring = docItems.filter(d => d.expiryDate && Math.ceil((new Date(d.expiryDate) - today) / 86400000) < 30).length;
  const vehWeight   = vehicleItems.length > 0 ? 0.3 : 0;
  const docWeight   = 0.3;
  const maintWeight = 1 - vehWeight - docWeight;
  const homeScore   = Math.max(0, Math.min(100, Math.round(
    (maintScore * maintWeight) +
    (vehicleItems.length > 0 ? Math.max(0, 100 - vehIssues * 30) * vehWeight : 0) +
    ((docItems.length > 0 ? Math.max(0, 100 - docExpiring * 20) : 50) * docWeight)
  )));
  dims.push({ key: 'home', label: 'Home', score: homeScore,
    tip: maintOverdue > 0 ? `${maintOverdue} maintenance overdue` : vehIssues > 0 ? 'Vehicle rego or insurance expiring' : docExpiring > 0 ? 'Documents expiring soon' : maintItems.length === 0 ? 'Add maintenance items to track' : 'Home is sorted',
    tab: 'maintenance' });

  // ── 4. Family — only included if household has kids ───────────
  if (hasKids) {
    const lbPlans  = state.meals?.lunchbox?.plans || {};
    const lbWeekKey = _mealWeekKey(0);
    let lbFilled = 0, lbTotal = kidProfiles.length * 20;
    kidProfiles.forEach(p => {
      const plan = (lbPlans[lbWeekKey] || {})[p.id] || {};
      for (let d = 0; d < 5; d++) { const dp = plan[d] || {}; if (dp.main) lbFilled++; if (dp.snack) lbFilled++; if (dp.fruit) lbFilled++; if (dp.drink) lbFilled++; }
    });
    // Chore completion today
    const todayKey   = typeof _routineTodayKey === 'function' ? _routineTodayKey() : new Date().toISOString().slice(0,10).replace(/-/g,'');
    const chores     = state.kids?.chores || [];
    const completions = state.kids?.completions || [];
    const pendingApprovals = completions.filter(c => c.status === 'pending').length;
    const approvedToday    = completions.filter(c => c.status === 'approved' && c.completedAt?.startsWith(new Date().toISOString().slice(0,10))).length;
    const choreScore = chores.length === 0 ? 50 : Math.max(0, 100 - pendingApprovals * 10 + approvedToday * 5);
    const lbScore    = lbTotal > 0 ? Math.round(lbFilled / lbTotal * 100) : 50;
    const familyScore = Math.min(100, Math.round(lbScore * 0.5 + Math.min(100, choreScore) * 0.5));
    dims.push({ key: 'family', label: 'Family', score: familyScore,
      tip: lbFilled === 0 ? 'Plan school lunches this week' : pendingApprovals > 0 ? `${pendingApprovals} chore approval${pendingApprovals !== 1 ? 's' : ''} waiting` : 'Family is sorted',
      tab: 'kids' });
  }

  // ── 5. Goals ──────────────────────────────────────────────────
  const goals       = state.goals || [];
  const activeGoals = goals.filter(g => g.status === 'active');
  const avgProgress = activeGoals.length > 0
    ? activeGoals.reduce((s, g) => s + Math.min((g.saved || g.currentAmount || 0) / (g.target || g.targetAmount || 1), 1), 0) / activeGoals.length * 100
    : 0;
  const goalsScore = goals.length === 0 ? 20 : Math.round(30 + avgProgress * 0.7);
  dims.push({ key: 'goals', label: 'Goals', score: Math.min(100, goalsScore),
    tip: goals.length === 0 ? 'Set a savings or spending goal' : avgProgress < 30 ? 'Make progress on your goals' : 'Goals progressing well',
    tab: 'goals' });

  // ── 6. Habits — adult routine completion + streak ─────────────
  const myRoutines = typeof _routinesForCurrentUser === 'function' ? _routinesForCurrentUser() : [];
  if (myRoutines.length > 0) {
    const todayKey = typeof _routineTodayKey === 'function' ? _routineTodayKey() : new Date().toISOString().slice(0,10).replace(/-/g,'');
    const completedRoutines = myRoutines.filter(r => {
      const done  = (r.completions?.[todayKey] || []).length;
      return r.steps.length > 0 && done === r.steps.length;
    });
    const completionPct = Math.round(completedRoutines.length / myRoutines.length * 100);
    // Best streak across all routines
    const bestStreak = myRoutines.reduce((best, r) => {
      const s = typeof _routineStreak === 'function' ? _routineStreak(r) : 0;
      return Math.max(best, s);
    }, 0);
    const streakPts  = Math.min(40, Math.round(bestStreak / 10 * 40));
    const setupPts   = 20;
    const habitsScore = Math.min(100, setupPts + Math.round(completionPct * 0.4) + streakPts);
    dims.push({ key: 'habits', label: 'Habits', score: habitsScore,
      tip: completedRoutines.length === 0 ? 'Complete a routine today' : bestStreak < 3 ? 'Keep your streak going' : `${bestStreak}-day streak — keep it up`,
      tab: 'routines' });
  }

  // ── 7. Plan — calendar + bills + documents ────────────────────
  const todayStr    = new Date().toISOString().slice(0,10);
  const in7         = new Date(Date.now() + 7*86400000).toISOString().slice(0,10);
  const eventsAhead = (state.planner?.events || []).filter(e => e.date >= todayStr && e.date <= in7).length;
  const billsOverdue = (state.bills || []).filter(b => { const d = billDaysUntil(b); return d !== null && d < 0; }).length;
  const docsExpired  = (state.documents || []).filter(d => d.expiryDate && new Date(d.expiryDate) < today).length;
  const planScore    = Math.min(100, Math.round(
    (eventsAhead > 0 ? 40 : 10) +
    Math.max(0, 30 - billsOverdue * 15) +
    Math.max(0, 30 - docsExpired * 15)
  ));
  dims.push({ key: 'plan', label: 'Plan', score: planScore,
    tip: billsOverdue > 0 ? `${billsOverdue} bill${billsOverdue !== 1 ? 's' : ''} overdue` : docsExpired > 0 ? `${docsExpired} document${docsExpired !== 1 ? 's' : ''} expired` : eventsAhead === 0 ? 'Add something to your calendar' : 'Plan looks good',
    tab: 'planner' });

  // ── Total = average of all active dims ────────────────────────
  const total = Math.round(dims.reduce((s, d) => s + d.score, 0) / dims.length);
  return { total, dims };
}

function generateMission() {
  const life = calcLifeScore();
  const today = new Date().toISOString().slice(0, 10);
  const dismissed = state.settings?.typeADismissedMission || '';
  const sorted = [...life.dims].sort((a, b) => a.score - b.score);
  const missions = [];

  sorted.forEach(dim => {
    if (dim.key === 'budget' && dim.score < 70) {
      if (!getMonthData(selectedBudgetMonth).income.length)
        missions.push({ id: 'add-income', title: 'Add your income sources', sub: 'Takes about 1 minute', tab: 'budget', impact: 40 });
      else if (!getMonthData(selectedBudgetMonth).expenses.length)
        missions.push({ id: 'add-expenses', title: 'Set up your monthly expenses', sub: 'List your regular costs', tab: 'budget', impact: 35 });
      else
        missions.push({ id: 'log-actuals', title: 'Log this month\'s actual spending', sub: 'Import a bank statement or add manually', tab: 'budget', impact: 30 });
    }
    if (dim.key === 'meals' && dim.score < 70) {
      const weekKey = _mealWeekKey(0);
      const plan    = state.meals?.plan?.[weekKey] || {};
      const dinnersFilled = Object.values(plan).filter(d => d.d).length;
      const foodItems = (state.lists?.food?.items || []).filter(i => i.state === 'active').length;
      if (dinnersFilled < 3)
        missions.push({ id: 'plan-dinners', title: 'Plan this week\'s dinners', sub: 'Just the evening meals — takes 2 minutes', tab: 'meals', impact: 25 });
      else if (foodItems === 0)
        missions.push({ id: 'shopping-list', title: 'Add items to your shopping list', sub: 'Start with essentials you need this week', tab: 'lists', impact: 15 });
    }
    if (dim.key === 'home' && dim.score < 70) {
      const overdue = (state.maintenance || []).filter(m => { const d = _maintDaysUntil(m); return d !== null && d < 0; });
      if (overdue.length)
        missions.push({ id: 'maint-overdue', title: `Clear overdue: ${escHtml(overdue[0].name)}`, sub: 'Mark it done or reschedule', tab: 'maintenance', impact: 20 });
      else if (!(state.maintenance || []).length)
        missions.push({ id: 'setup-maint', title: 'Set up household maintenance', sub: 'Add items like gutters, pest control, smoke alarms', tab: 'maintenance', impact: 20 });
    }
    if (dim.key === 'family' && dim.score < 70) {
      const pending = (state.kids?.completions || []).filter(c => c.status === 'pending').length;
      const lbProfiles = state.kids?.profiles || [];
      if (pending > 0)
        missions.push({ id: 'approve-chores', title: `Review ${pending} chore approval${pending !== 1 ? 's' : ''}`, sub: 'Kids are waiting for your sign-off', tab: 'kids', impact: 20 });
      else if (lbProfiles.length > 0)
        missions.push({ id: 'plan-lunchbox', title: 'Plan school lunches this week', sub: 'AI can do it in one tap', tab: 'lunchbox', impact: 18 });
    }
    if (dim.key === 'goals' && dim.score < 50) {
      if (!(state.goals || []).length)
        missions.push({ id: 'add-goal', title: 'Set your first savings goal', sub: 'Holiday fund, emergency savings, or debt payoff', tab: 'goals', impact: 15 });
    }
    if (dim.key === 'habits' && dim.score < 70) {
      const myRoutines = typeof _routinesForCurrentUser === 'function' ? _routinesForCurrentUser() : [];
      if (myRoutines.length === 0)
        missions.push({ id: 'create-routine', title: 'Create your first daily routine', sub: 'Morning or evening — takes 2 minutes to set up', tab: 'routines', impact: 25 });
      else
        missions.push({ id: 'complete-routine', title: 'Complete a routine today', sub: 'Tap each step as you go', tab: 'today', impact: 20 });
    }
    if (dim.key === 'plan' && dim.score < 70) {
      const todayStr = new Date().toISOString().slice(0,10);
      const in7      = new Date(Date.now() + 7*86400000).toISOString().slice(0,10);
      const eventsAhead = (state.planner?.events || []).filter(e => e.date >= todayStr && e.date <= in7).length;
      if (eventsAhead === 0)
        missions.push({ id: 'add-event', title: 'Add something to your calendar', sub: 'Even one event this week helps keep life organised', tab: 'planner', impact: 15 });
      else
        missions.push({ id: 'review-bills', title: 'Review upcoming bills', sub: 'Make sure nothing catches you off guard', tab: 'bills', impact: 15 });
    }
  });

  // Filter out dismissed, sort by impact
  const available = missions.filter(m => m.id !== dismissed).sort((a, b) => b.impact - a.impact);
  return available[0] || null;
}

function dismissMission(missionId) {
  if (!state.settings) state.settings = {};
  state.settings.typeADismissedMission = missionId;
  saveData(state);
  // Close lightbox if open
  const lb = document.querySelector('.mission-lightbox');
  if (lb) lb.remove();
  renderToday();
}

function completeMission(missionId) {
  if (!state.settings) state.settings = {};
  // Reset tracking — mission completed, new one tomorrow
  state.settings.typeAMissionId = '';
  state.settings.typeAMissionShownDate = '';
  state.settings.typeADismissedMission = missionId;
  saveData(state);
  const lb = document.querySelector('.mission-lightbox');
  if (lb) lb.remove();
}

function _missionDaysIgnored() {
  const shownDate = state.settings?.typeAMissionShownDate;
  if (!shownDate) return 0;
  const diff = Math.floor((new Date() - new Date(shownDate)) / 86400000);
  return Math.max(0, diff);
}

function _showMissionLightbox(mission) {
  // Don't show if already showing
  if (document.querySelector('.mission-lightbox')) return;

  const days = _missionDaysIgnored();
  const clickAttr = mission.onclick
    ? mission.onclick
    : mission.tab ? `activateTab('${mission.tab}')` : '';

  const lb = document.createElement('div');
  lb.className = 'mission-lightbox';
  lb.innerHTML = `
    <div class="mission-lightbox-card">
      <div class="mission-lightbox-icon">⚡</div>
      <div class="mission-lightbox-title">${mission.title}</div>
      <div class="mission-lightbox-sub">${mission.sub}</div>
      <div class="mission-lightbox-days">This has been waiting ${days} day${days !== 1 ? 's' : ''}</div>
      <div class="mission-lightbox-actions">
        <button class="mission-lightbox-btn" style="background:rgba(255,255,255,0.2);color:#fff" onclick="dismissMission('${mission.id}')">Skip</button>
        <button class="mission-lightbox-btn" style="background:#fff;color:#0891b2" onclick="completeMission('${mission.id}');${clickAttr}">Do it now</button>
      </div>
    </div>`;
  lb.addEventListener('click', e => { if (e.target === lb) dismissMission(mission.id); });
  document.body.appendChild(lb);
}

function _checkMissionEscalation() {
  if (!state.settings?.typeAMode) return;
  const mission = generateMission();
  if (!mission) return;

  const today = new Date().toISOString().slice(0, 10);

  // Track when this mission was first shown
  if (state.settings.typeAMissionId !== mission.id) {
    state.settings.typeAMissionId = mission.id;
    state.settings.typeAMissionShownDate = today;
    saveData(state);
    return; // Day 1 — just the card
  }

  // Day 2+ — show lightbox
  const days = _missionDaysIgnored();
  if (days >= 1) {
    setTimeout(() => _showMissionLightbox(mission), 1500);
  }
}

// ── Weekly Reset Wizard ──
function openWeeklyReset() {
  const life = calcLifeScore();
  const curData = getMonthData(selectedBudgetMonth);
  const totalActual = curData.expenses.reduce((s, e) => s + getActual(e.id, selectedBudgetMonth), 0);
  const totalBudget = monthlyTotal(curData.expenses);
  const weekKey = _mealWeekKey(1); // Next week
  const nextWeekPlan = state.meals?.plan?.[weekKey] || {};
  const nextMealsFilled = Object.values(nextWeekPlan).reduce((s, d) => s + (d.b?1:0) + (d.l?1:0) + (d.d?1:0), 0);
  const overdueMaint = (state.maintenance || []).filter(m => { const d = _maintDaysUntil(m); return d !== null && d < 0; }).length;
  const dueSoonBills = (state.bills || []).filter(b => { const d = billDaysUntil(b); return d >= 0 && d <= 7; });
  const pantryNeed = (state.meals?.pantry || []).filter(i => i.status === 'need' || i.status === 'low').length;

  const overlay = document.createElement('div');
  overlay.className = 'reset-overlay';
  overlay.innerHTML = `
    <div class="reset-card">
      <div class="reset-header">
        <h2>Weekly Reset</h2>
        <p>5 minutes to get your week sorted</p>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 1 of 5</div>
        <div class="reset-step-title">Review this month's spending</div>
        <div class="reset-step-sub">${totalActual > 0 ? `You've spent ${aud(totalActual)} of ${aud(totalBudget)} budgeted` : 'No actuals logged yet this month'}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('budget')">Review budget</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 2 of 5</div>
        <div class="reset-step-title">Plan next week's meals</div>
        <div class="reset-step-sub">${nextMealsFilled > 0 ? `${nextMealsFilled}/21 meals planned` : 'Nothing planned for next week yet'}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();_mealWeekOffset=1;activateTab('meals')">Plan meals</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 3 of 5</div>
        <div class="reset-step-title">Check the pantry</div>
        <div class="reset-step-sub">${pantryNeed > 0 ? `${pantryNeed} items need restocking` : (state.meals?.pantry || []).length > 0 ? 'Pantry looks good' : 'Not set up yet'}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('pantry')">Stocktake</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 4 of 5</div>
        <div class="reset-step-title">Upcoming bills</div>
        <div class="reset-step-sub">${dueSoonBills.length > 0 ? `${dueSoonBills.length} bill${dueSoonBills.length !== 1 ? 's' : ''} due this week — ${aud(dueSoonBills.reduce((s, b) => s + (parseFloat(b.amount) || 0), 0))}` : 'No bills due this week'}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('bills')">Review bills</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 5 of 5</div>
        <div class="reset-step-title">Household maintenance</div>
        <div class="reset-step-sub">${overdueMaint > 0 ? `${overdueMaint} item${overdueMaint !== 1 ? 's' : ''} overdue` : 'Everything up to date'}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('maintenance')">Check maintenance</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-footer">
        <button class="reset-step-btn" style="background:#0891b2;color:#fff;padding:10px 24px;font-size:14px" onclick="completeWeeklyReset()">Done — I'm reset</button>
      </div>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function completeWeeklyReset() {
  const overlay = document.querySelector('.reset-overlay');
  if (overlay) overlay.remove();

  if (!state.settings) state.settings = {};
  const today = new Date().toISOString().slice(0, 10);
  const lastReset = state.settings.typeALastResetDate || '';

  // Check if this continues the streak (within 9 days of last reset)
  if (lastReset) {
    const daysSince = Math.floor((new Date() - new Date(lastReset)) / 86400000);
    if (daysSince <= 9) {
      state.settings.typeAStreak = (state.settings.typeAStreak || 0) + 1;
    } else {
      state.settings.typeAStreak = 1; // Streak broken, start fresh
    }
  } else {
    state.settings.typeAStreak = 1;
  }

  state.settings.typeALastResetDate = today;
  saveData(state);
  renderToday();
}

function _renderLifeScore() {
  const life  = calcLifeScore();
  const circ  = 2 * Math.PI * 22;
  const arc   = (life.total / 100 * circ).toFixed(1);
  // Use app design tokens — iris for high, amber for mid, ember for low
  const ringColor = life.total >= 80 ? 'var(--good,#10b981)' : life.total >= 60 ? 'var(--iris-2)' : life.total >= 40 ? 'var(--amber,#f59e0b)' : 'var(--ember,#f97316)';
  const tagline   = life.total >= 80 ? 'Crushing it — keep going' : life.total >= 60 ? 'Good shape — a few things to tidy' : life.total >= 40 ? 'Getting there — some gaps to fill' : 'Just getting started';
  const chevron   = _typeADimsExpanded ? '▲' : '▼';

  const dimsHtml = life.dims.map(d => {
    const barColor = d.score >= 75 ? 'var(--good,#10b981)' : d.score >= 50 ? 'var(--iris-2)' : d.score >= 30 ? 'var(--amber,#f59e0b)' : 'var(--ember,#f97316)';
    const pctColor = d.score >= 75 ? 'var(--good,#10b981)' : d.score >= 50 ? 'var(--iris-1)' : d.score >= 30 ? 'var(--amber,#f59e0b)' : 'var(--ember,#f97316)';
    return `<div class="life-dim">
      <div class="life-dim-row">
        <span class="life-dim-name">${d.label}</span>
        <span class="life-dim-pct" style="color:${pctColor}">${d.score}%</span>
      </div>
      <div class="life-dim-bar"><div class="life-dim-fill" style="width:${d.score}%;background:${barColor}"></div></div>
      <div class="life-dim-tip">
        ${d.tip}
        ${d.score < 70 && d.tab ? `<span style="color:var(--iris-1);font-weight:700;cursor:pointer" onclick="activateTab('${d.tab}')">Fix →</span>` : ''}
      </div>
    </div>`;
  }).join('');

  return `<div class="life-score-card">
    <div class="life-score-header" onclick="_typeADimsExpanded=!_typeADimsExpanded;renderToday()">
      <div class="life-score-ring">
        <svg viewBox="0 0 56 56" width="56" height="56">
          <circle cx="28" cy="28" r="22" fill="none" stroke="var(--hairline)" stroke-width="5"/>
          <circle cx="28" cy="28" r="22" fill="none" stroke="${ringColor}" stroke-width="5"
            stroke-dasharray="${arc} ${circ}" stroke-linecap="round" transform="rotate(-90 28 28)"/>
        </svg>
        <div class="life-score-num" style="color:${ringColor}">${life.total}</div>
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:16px;font-weight:800;color:var(--ink);letter-spacing:-.01em;font-family:var(--sans)">Life Score</div>
        <div style="font-size:12px;color:var(--ink-soft);margin-top:3px;font-family:var(--sans)">${tagline}</div>
        ${state.settings?.typeAStreak > 1 ? `<div style="margin-top:5px;display:inline-flex;align-items:center;gap:5px;background:var(--amber-soft,#FFF7ED);border-radius:99px;padding:2px 10px"><span style="font-size:12px">🔥</span><span style="font-family:var(--mono);font-size:11px;font-weight:700;color:var(--ember,#f97316)">${state.settings.typeAStreak} week streak</span></div>` : ''}
      </div>
      <span style="font-size:10px;color:var(--muted);flex-shrink:0">${chevron}</span>
    </div>
    ${_typeADimsExpanded ? `
      <div style="margin-top:14px;border-top:1px solid var(--hairline-soft);padding-top:4px">
        ${dimsHtml}
        <button onclick="openWeeklyReset()" style="margin-top:14px;width:100%;padding:10px;background:linear-gradient(135deg,var(--iris-1),var(--iris-2));color:#fff;border:none;border-radius:99px;font-size:13px;font-weight:700;cursor:pointer;font-family:var(--sans);letter-spacing:.01em">Weekly Reset — 5 minutes</button>
      </div>` : ''}
  </div>`;
}

function _renderMissionCard() {
  const mission = generateMission();
  if (!mission) return '';

  const days = _missionDaysIgnored();
  const clickAttr = mission.onclick
    ? `onclick="${mission.onclick}"`
    : mission.tab ? `onclick="activateTab('${mission.tab}')"` : '';

  return `<div class="mission-card" ${clickAttr}>
    <div class="mission-label">${days > 0 ? `Day ${days + 1} — still waiting` : 'Today\'s Mission'}</div>
    <div class="mission-title">${mission.title}</div>
    <div class="mission-sub">${mission.sub}</div>
    <div class="mission-actions">
      <button class="mission-btn" style="background:rgba(255,255,255,0.2);color:#fff" onclick="event.stopPropagation();dismissMission('${mission.id}')">Not today</button>
      <button class="mission-btn" style="background:#fff;color:#0891b2" ${clickAttr}>Let's do it</button>
    </div>
  </div>`;
}

function setupProgressTasks() {
  const curData = getMonthData(selectedBudgetMonth);
  const members = state.householdProfile?.members || [];
  const adults  = members.filter(m => m.role === 'adult');
  const kids    = members.filter(m => m.role === 'child');
  const tasks   = [];

  tasks.push({ id:'members',  label:'Add your household members',     done: adults.length > 0,                                                    tab: null });
  tasks.push({ id:'income',   label:'Set up income sources',          done: (curData.income||[]).length > 0,                                       tab: 'budget' });
  tasks.push({ id:'expenses', label:'Add monthly expenses',           done: (curData.expenses||[]).length > 0,                                     tab: 'budget' });

  if (kids.length > 0)
    tasks.push({ id:'kids',   label:'Add kids to your household',     done: true,                                                                  tab: null });

  if (adults.length >= 2) {
    const partnerName = adults[1]?.name || 'your partner';
    const inviteDone  = (state.householdProfile.authorizedUsers || []).length > 0 ||
                        (state.householdProfile.invites || []).some(i => i.status === 'accepted');
    tasks.push({ id:'invite', label:`Invite ${partnerName} to your household`, done: inviteDone, tab: 'settings', settingsSection: 'household-access' });
  }

  tasks.push({ id:'goals',    label:'Set your first savings goal',    done: (state.goals||[]).length > 0,                                          tab: 'goals' });
  tasks.push({ id:'networth', label:'Add your net worth (assets & debts)', done: (state.netWorth?.assets||[]).length > 0 || (state.netWorth?.liabilities||[]).length > 0, tab: 'networth' });
  tasks.push({ id:'vehicles', label:'Add your vehicles',              done: (state.vehicles||[]).length > 0,                                       tab: 'vehicles' });

  if (kids.length > 0) {
    const kidName = kids[0]?.name || 'your child';
    tasks.push({ id:'chores', label:`Set up ${escHtml(kidName)}'s first chores`, done: (state.kids?.chores||[]).length > 0,                        tab: 'kids' });
  }

  return tasks;
}

let _spExpanded    = false;
let _spDoneExpanded = false;

function _refreshSetupProgress() {
  const el = document.getElementById('setup-progress-card');
  if (el) el.innerHTML = renderSetupProgress();
}

function renderSetupProgress() {
  if (state.setupProgressDismissed) return '';

  const tasks   = setupProgressTasks();
  const doneTasks  = tasks.filter(t => t.done);
  const todoTasks  = tasks.filter(t => !t.done);
  const done    = doneTasks.length;
  const total   = tasks.length;
  const pct     = Math.round(done / total * 100);

  if (done === total) {
    return `<div class="td-card td-card-win" style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <span style="font-size:22px">🎉</span>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:700;color:var(--good)">Setup complete!</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px">Your household is fully configured.</div>
      </div>
      <button onclick="state.setupProgressDismissed=true;saveData(state);renderToday()" style="font-size:12px;color:var(--muted);background:none;border:none;cursor:pointer;font-weight:600;padding:0">Dismiss</button>
    </div>`;
  }

  const r = 22; const circ = 2 * Math.PI * r;
  const progressSvg = `
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r="${r}" fill="none" stroke="var(--hairline)" stroke-width="4"/>
      <circle cx="26" cy="26" r="${r}" fill="none" stroke="var(--purple)" stroke-width="4"
        stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${(circ - pct/100*circ).toFixed(1)}"
        stroke-linecap="round" transform="rotate(-90 26 26)"/>
    </svg>
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:10px;font-weight:700;color:var(--purple)">${pct}%</div>`;

  const chevron = _spExpanded ? '▲' : '▼';
  const header = `
    <div onclick="_spExpanded=!_spExpanded;_refreshSetupProgress()" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none">
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--ink)">Finish setting up Toto</div>
        <div style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:3px">${done} of ${total} complete</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <div style="position:relative;width:52px;height:52px">${progressSvg}</div>
        <span style="font-size:10px;color:var(--muted-soft)">${chevron}</span>
      </div>
    </div>
    <div style="background:var(--hairline);border-radius:99px;height:4px;margin-top:14px;overflow:hidden">
      <div style="width:${pct}%;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--iris-2),var(--iris-3))"></div>
    </div>`;

  if (!_spExpanded) {
    return `<div class="td-card" style="margin-bottom:10px">${header}</div>`;
  }

  const nextTask = todoTasks[0];
  const todoHtml = todoTasks.map(t => {
    const isNext = t === nextTask;
    const clickFn = t.settingsSection
      ? `activateTab('${t.tab}');setTimeout(()=>{const el=document.getElementById('acc-${t.settingsSection||''}');if(el&&!el.classList.contains('open')){el.querySelector('.acc-header')?.click();}el?.scrollIntoView({behavior:'smooth',block:'start'})},200)`
      : t.tab ? `activateTab('${t.tab}')` : '';
    const click = clickFn ? `onclick="${clickFn}"` : '';
    return `<div style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;background:${isNext?'var(--purple-tint)':'transparent'};border:1px solid ${isNext?'var(--purple-mid,#DDD6FE)':'var(--hairline)'};cursor:${t.tab?'pointer':'default'}" ${click}>
      <div style="width:20px;height:20px;border-radius:50%;border:2px solid ${isNext?'var(--purple)':'var(--hairline)'};flex-shrink:0"></div>
      <span style="font-size:13px;flex:1;color:var(--ink);font-weight:${isNext?'500':'400'}">${t.label}</span>
      ${t.tab ? `<span style="font-size:11px;color:${isNext?'var(--purple)':'var(--muted-soft)'};font-weight:600">Go →</span>` : ''}
    </div>`;
  }).join('');

  const doneHtml = doneTasks.map(t => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;border:1px solid var(--good-soft)">
      <div style="width:20px;height:20px;border-radius:50%;background:var(--good);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;flex-shrink:0">✓</div>
      <span style="font-size:13px;flex:1;text-decoration:line-through;color:var(--muted)">${t.label}</span>
    </div>`).join('');

  const doneSection = done > 0 ? `
    <div style="margin-top:10px;border-top:1px solid var(--hairline-soft);padding-top:10px">
      <div onclick="_spDoneExpanded=!_spDoneExpanded;_refreshSetupProgress()" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:4px 0;margin-bottom:${_spDoneExpanded?'8px':'0'}">
        <span style="font-size:12px;font-weight:600;color:var(--good)">${done} done</span>
        <span style="font-size:10px;color:var(--muted-soft)">${_spDoneExpanded?'▲':'▼'}</span>
      </div>
      ${_spDoneExpanded ? `<div style="display:flex;flex-direction:column;gap:5px">${doneHtml}</div>` : ''}
    </div>` : '';

  return `
    <div class="td-card" style="margin-bottom:10px">
      ${header}
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:14px">${todoHtml}</div>
      ${doneSection}
      <div style="text-align:center;margin-top:12px">
        <button onclick="state.setupProgressDismissed=true;saveData(state);renderToday()" style="font-size:12px;color:var(--muted);background:none;border:none;cursor:pointer">Dismiss · I'll do this later</button>
      </div>
    </div>`;
}

// Allocation bar colour palette (graduated red → amber → grey → black)
const _ALLOC_COLORS = ['#FF3B3B', '#FF8A65', '#FFB088', '#FCD34D', '#94A3B8', '#27272a'];

function _todayAllocSegments(monthData) {
  const expenses = (monthData.expenses || [])
    .filter(e => !e.skipped)
    .map(e => ({ name: e.name || 'Other', amount: freqToMonthly(Number(e.amount) || 0, e.frequency) }))
    .filter(e => e.amount > 0)
    .sort((a, b) => b.amount - a.amount);
  if (!expenses.length) return { segments: [], total: 0 };
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const top = expenses.slice(0, 5);
  const other = expenses.slice(5);
  const segments = top.map((e, i) => ({
    name: e.name,
    pct: (e.amount / total) * 100,
    color: _ALLOC_COLORS[i] || '#94A3B8'
  }));
  if (other.length) {
    const otherTotal = other.reduce((s, e) => s + e.amount, 0);
    segments.push({ name: 'Other', pct: (otherTotal / total) * 100, color: _ALLOC_COLORS[5] });
  }
  return { segments, total };
}

function _briefIcon(card) {
  const t = (card.title || '').toLowerCase();
  if (t.includes('dinner') || t.includes('lunch') || t.includes('meal')) return 'i-chef-hat';
  if (t.includes('rego') || t.includes('vehicle')) return 'i-car';
  if (t.includes('health:')) return 'i-activity';
  if (t.includes('over budget')) return 'i-zap';
  if (t.includes('left in budget') || t.includes('budget')) return 'i-wallet';
  if (t.includes('bill') || t.includes('due')) return 'i-receipt';
  if (t.includes('expir')) return 'i-file-text';
  if (t.includes('overdue') || t.includes('maintenance')) return 'i-clipboard-check';
  if (card.section === 'Plan') return 'i-calendar';
  if (card.section === 'Home') return 'i-home';
  if (card.section === 'Wallet') return 'i-wallet';
  return 'i-clipboard-check';
}

// Map a card's section/title to a 2028 chip class
function _chipClassFor(card) {
  const s = card.section;
  if (s === 'Wallet') return 'money';
  if (s === 'Plan')   return 'social';
  if (s === 'Home')   return 'work';
  if (s === 'Family') return 'family';
  return 'study';
}
function _chipLabelFor(card) {
  const s = card.section;
  return (s || 'Task').toLowerCase();
}

// Week strip — 7 days centred on today (-3..+3)
function _renderWeekStrip() {
  const initials = ['S','M','T','W','T','F','S'];
  const today = new Date();
  // Mon-anchored week: index Monday as day 0
  const dow = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const monday = new Date(today); monday.setDate(today.getDate() - dow);
  // Collect activity dates from bills + planner + maintenance
  const activity = new Set();
  (state.bills || []).forEach(b => { const d = b.dueDate || b.nextDue; if (d) activity.add(d.slice(0,10)); });
  (state.planner?.events || []).forEach(e => { if (e.date) activity.add(e.date.slice(0,10)); });
  (state.maintenance || []).forEach(m => { if (m.nextDue) activity.add(m.nextDue.slice(0,10)); });
  const cells = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday); d.setDate(monday.getDate() + i);
    const iso = d.toISOString().slice(0,10);
    const isToday = d.toDateString() === today.toDateString();
    const isPast  = d < today && !isToday;
    const initIdx = d.getDay();
    const cls = isToday ? 'ws-day today' : (isPast ? 'ws-day past' : 'ws-day');
    const hasCls = activity.has(iso) ? ' has' : '';
    cells.push(`<div class="${cls}${hasCls}"><div class="ws-init">${initials[initIdx]}</div><div class="ws-num">${d.getDate()}</div><div class="ws-dot"></div></div>`);
  }
  return `<div class="week-strip">${cells.join('')}</div>`;
}

// Life areas — 4 cards. Counts derive from existing cards array passed in.
function _renderLifeAreas(cards) {
  const sections = [
    { cls:'money',  label:'Money',  match: c => c.section === 'Wallet', icon:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>', track:'#DDD6FE', stroke:'#5B4CF5' },
    { cls:'family', label:'Family', match: c => /kid|chore|family|riley|mia|child/i.test(c.title || ''), icon:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>', track:'#A7F3D0', stroke:'#10B981' },
    { cls:'work',   label:'Home',   match: c => c.section === 'Home', icon:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', track:'#FDE9B0', stroke:'#F59E0B' },
    { cls:'social', label:'Plan',   match: c => c.section === 'Plan', icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', track:'#FECDD3', stroke:'#F43F5E' },
  ];
  return `<div class="life-grid">` + sections.map(s => {
    const items = (cards || []).filter(s.match);
    const count = items.length;
    const pending = items.filter(c => c.cls === 'red' || c.cls === 'amber').length;
    const ratio = count > 0 ? Math.max(0, 1 - (pending / count)) : 1;
    const offset = (82 - ratio * 82).toFixed(1);
    return `<div class="life-card ${s.cls}" onclick="activateTab('${s.cls === 'money' ? 'budget' : s.cls === 'family' ? 'kids' : s.cls === 'work' ? 'documents' : 'planner'}')">
      <div class="life-card-top">
        <div class="life-icon-box"><svg viewBox="0 0 24 24">${s.icon}</svg></div>
        <svg class="arc-ring" width="34" height="34" viewBox="0 0 34 34">
          <circle class="arc-track" cx="17" cy="17" r="13" stroke="${s.track}"/>
          <circle class="arc-progress" cx="17" cy="17" r="13" stroke="${s.stroke}" stroke-dashoffset="${offset}"/>
        </svg>
      </div>
      <div class="life-label">${s.label}</div>
      <div class="life-count">${pending || count}</div>
      <div class="life-sub">${pending ? `pending` : (count ? 'all clear' : 'nothing yet')}</div>
    </div>`;
  }).join('') + `</div>`;
}

function _briefRow(card) {
  const onclickAttr = card.onclick ? card.onclick : (card.tab ? `activateTab('${card.tab}')` : '');
  const icon = _briefIcon(card);
  const cls = ['red','amber','green','blue'].includes(card.cls) ? card.cls : 'grey';
  return `<div class="brief-row"${onclickAttr ? ` onclick="${onclickAttr}"` : ''}>
    <div class="brief-glyph ${cls}"><svg viewBox="0 0 24 24"><use href="#${icon}"/></svg></div>
    <div class="brief-body">
      <div class="t">${card.title || ''}</div>
      ${card.sub ? `<div class="s">${card.sub}</div>` : ''}
    </div>
    <svg class="brief-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  </div>`;
}

function renderToday() {
  const el = document.getElementById('today-content');
  if (!el) return;

  const now = new Date();
  const hour = now.getHours();
  const todayStr = now.toISOString().slice(0,10);

  // Day part
  function getDayPart(h) {
    if (h < 5)  return 'overnight';
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    if (h < 21) return 'evening';
    return 'night';
  }
  const dayPart = getDayPart(hour);
  const greetWords = {
    morning: 'Good morning,',
    afternoon: 'Good afternoon,',
    evening: 'Wind down,',
    night: 'Tomorrow at a glance —',
    overnight: 'Still up,',
  };
  const greetWord = greetWords[dayPart] || 'Hello,';
  const name = (_currentUser?.displayName?.split(' ')[0])
    || (state.settings?.adultName?.split(' ')[0])
    || (state.settings?.adults?.[0]?.name?.split(' ')[0])
    || (state.householdProfile?.members?.find(m => m.role === 'adult')?.name?.split(' ')[0])
    || '';
  const dateLine = now.toLocaleDateString('en-AU', { weekday:'long', month:'long', day:'numeric' }).toUpperCase();

  // ── Build cards ──
  const cards = [];

  // PRIORITY + SLIPPING — paired square tiles
  const billsDue = (state.bills || []).map(b => ({ ...b, days: billDaysUntil(b) })).filter(b => b.days !== null && b.days <= 2).sort((a,b) => a.days - b.days);
  const maintOverdue = (state.maintenance || []).filter(m => { const d = _maintDaysUntil(m); return d !== null && d < 0; });
  const docsExpired = (state.documents || []).filter(d => d.expiryDate && new Date(d.expiryDate) < now);
  const regoExpired = (state.vehicles || []).filter(v => v.regoExpiry && new Date(v.regoExpiry) < now);
  const slipping = [];
  (state.documents||[]).forEach(d => { if (d.expiryDate && new Date(d.expiryDate) < now) slipping.push({ label: escHtml(d.name), sub: 'Document expired', cls: 'alert', tab: 'documents' }); });
  (state.maintenance||[]).forEach(m => { const d = _maintDaysUntil(m); if (d !== null && d < 0) slipping.push({ label: escHtml(m.name), sub: `${Math.abs(d)}d overdue`, cls: 'watch', tab: 'maintenance' }); });
  (state.vehicles||[]).forEach(v => { if (v.regoExpiry && new Date(v.regoExpiry) < now) slipping.push({ label: escHtml(v.name)+' rego', sub: 'Expired', cls: 'alert', tab: 'vehicles' }); });

  const hasHeadsUp = billsDue.length > 0;
  const hasSlipping = slipping.length > 0;

  if (hasHeadsUp || hasSlipping) {
    // Heads Up tile
    const huSubLabel = billsDue.length === 1
      ? (billsDue[0].days === 0 ? 'due today' : billsDue[0].days === 1 ? 'due tomorrow' : `due in ${billsDue[0].days} days`)
      : `bill${billsDue.length !== 1 ? 's' : ''} due soon`;
    const huTile = hasHeadsUp ? `
      <div onclick="_tdOpenHeadsUpSheet()" style="flex:1;min-width:0;background:var(--purple-soft);border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(91,76,245,.15);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(91,76,245,.08);position:relative;overflow:hidden">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(91,76,245,.18) 0%,transparent 70%);pointer-events:none"></div>
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--iris-2);margin-bottom:6px">Heads Up</div>
          <div style="font-size:36px;font-weight:800;color:var(--iris-1);letter-spacing:-.05em;line-height:1">${billsDue.length}</div>
          <div style="font-size:12px;color:var(--iris-2);margin-top:3px">${huSubLabel}</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--iris-1)">View all →</div>
      </div>` : `
      <div style="flex:1;min-width:0;background:#F0FDF4;border-radius:var(--r-lg);padding:16px;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(16,185,129,.18);box-shadow:0 1px 0 rgba(255,255,255,.9) inset">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#059669;margin-bottom:6px">Heads Up</div>
          <div style="font-size:36px;font-weight:800;color:var(--good);letter-spacing:-.05em;line-height:1">✓</div>
          <div style="font-size:12px;color:#059669;margin-top:3px">no bills due</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--good)">All clear</div>
      </div>`;

    // Slipping tile
    const slTile = hasSlipping ? `
      <div onclick="_tdOpenSlippingSheet()" style="flex:1;min-width:0;background:#FFF4EE;border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(249,115,22,.18);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(249,115,22,.06);position:relative;overflow:hidden">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.15) 0%,transparent 70%);pointer-events:none"></div>
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c2410c;margin-bottom:6px">Slipping</div>
          <div style="font-size:36px;font-weight:800;color:var(--ember);letter-spacing:-.05em;line-height:1">${slipping.length}</div>
          <div style="font-size:12px;color:#c2410c;margin-top:3px">item${slipping.length !== 1 ? 's' : ''} overdue</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--ember)">View all →</div>
      </div>` : `
      <div style="flex:1;min-width:0;background:#F0FDF4;border-radius:var(--r-lg);padding:16px;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(16,185,129,.18);box-shadow:0 1px 0 rgba(255,255,255,.9) inset">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#059669;margin-bottom:6px">Slipping</div>
          <div style="font-size:36px;font-weight:800;color:var(--good);letter-spacing:-.05em;line-height:1">✓</div>
          <div style="font-size:12px;color:#059669;margin-top:3px">all clear</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--good)">Nothing overdue</div>
      </div>`;

    cards.push({ type: 'priority', urgency: billsDue.length > 0 ? 3 : hasSlipping ? 2 : 0,
      html: `<div style="display:flex;gap:12px;margin-bottom:12px">${huTile}${slTile}</div>` });
  }

  // SCHEDULE CARD — today's events (or tomorrow if evening)
  const scheduleDate = (dayPart === 'evening' || dayPart === 'night') ? new Date(now.getTime() + 86400000).toISOString().slice(0,10) : todayStr;
  const scheduleLabel = scheduleDate === todayStr ? 'Today' : 'Tomorrow';
  const todayEvs = _plannerEventsForDate ? _plannerEventsForDate(scheduleDate) : [];
  if (todayEvs.length > 0) {
    const nowMins = now.getHours()*60 + now.getMinutes();
    const items = todayEvs.slice(0,4).map((ev, i, arr) => {
      const timeLabel = ev.allDay || !ev.time ? 'All day' : _plannerFmt12h ? _plannerFmt12h(ev.time) : ev.time;
      const who = _plannerEvWhoLabel ? _plannerEvWhoLabel(ev) : '';
      const mb  = _plannerEvPrimaryMember ? _plannerEvPrimaryMember(ev) : { dot: 'var(--iris-2)' };
      const cat = PLANNER_CATS ? (PLANNER_CATS[ev.category] || PLANNER_CATS.other) : { emoji: '📅', label: '' };
      const evMins = ev.time ? parseInt(ev.time.split(':')[0])*60 + parseInt(ev.time.split(':')[1]) : -1;
      const isNow = scheduleDate === todayStr && evMins >= 0 && nowMins >= evMins && nowMins < evMins + 90;
      const isLast = i === Math.min(todayEvs.length, 4) - 1;
      const catBg   = cat.color || '#f1f5f9';
      const catText = cat.text  || '#475569';
      const catBorder = catText.replace(/^#/, '');
      return `<div class="pl-agenda-ev" style="margin-bottom:${isLast?'0':'8px'}">
        <div class="pl-agenda-time-col">
          <span class="pl-agenda-time">${timeLabel}</span>
        </div>
        <div class="pl-agenda-timeline">
          <div class="pl-agenda-dot${isNow?' now':''}" style="color:${catText};background:${isNow?catText:catBg}"></div>
          ${isLast ? '' : '<div class="pl-agenda-line"></div>'}
        </div>
        <div class="pl-agenda-card" style="background:${catBg};border-color:${catText}22" onclick="activateTab('planner');setTimeout(()=>_plannerOpenDetail&&_plannerOpenDetail('${ev.id}'),120)">
          <div class="pl-agenda-card-title">${escHtml(ev.title)}</div>
          <div class="pl-agenda-card-meta">
            <span class="pl-agenda-who-dot" style="background:${mb.dot}"></span>
            <span>${who}</span>
          </div>
          ${cat.label ? `<div class="pl-agenda-cat-pill" style="background:${catText}1a;color:${catText}">${cat.emoji} ${cat.label}</div>` : ''}
        </div>
      </div>`;
    }).join('');
    cards.push({ type: 'schedule', urgency: 1,
      html: `<div class="td-card td-card-schedule" style="padding:0;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;border-bottom:1px solid rgba(24,24,27,.06)">
          <div class="td-card-meta" style="margin-bottom:0"><span class="td-meta-label">${scheduleLabel}</span><span class="td-meta-count" style="margin-left:2px">${todayEvs.length}</span></div>
          <span style="font-size:12px;font-weight:600;color:var(--iris-2);cursor:pointer" onclick="activateTab('planner')">See all →</span>
        </div>
        <div style="padding:12px 16px">${items}</div>
      </div>` });
  }

  // MONEY CARD
  const curData = getMonthData(selectedBudgetMonth);
  const totalIncome = monthlyTotal(curData.income);
  const totalExpenses = monthlyTotal(curData.expenses);
  const surplus = totalIncome - totalExpenses;
  const totalActual = (curData.expenses||[]).reduce((s,e) => s + getActual(e.id, selectedBudgetMonth), 0);
  const daysLeft = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate() - now.getDate();
  const spentPct = totalExpenses > 0 ? Math.min(100, Math.round(totalActual / totalExpenses * 100)) : 0;
  if (totalIncome > 0 || totalExpenses > 0) {
    const statusCls = surplus >= 0 ? '' : 'td-money-status-watch';
    const statusLabel = surplus >= 0 ? 'On track' : 'Over budget';
    const surplusAmt = Math.abs(surplus);
    const flags = [];
    billsDue.forEach(b => flags.push(`<span class="td-money-flag td-money-flag-watch">${escHtml(b.name)} due ${b.days===0?'today':b.days===1?'tomorrow':'in '+b.days+'d'}</span>`));
    cards.push({ type: 'money', urgency: 0,
      html: `<div class="td-card td-card-money">
        <div class="td-money-row">
          <div>
            <div class="td-card-meta"><span class="td-meta-label">${now.toLocaleDateString('en-AU',{month:'long',year:'numeric'})}</span></div>
            <div class="money-amount"><span class="money-amount-currency">$</span>${surplusAmt.toLocaleString('en-AU',{maximumFractionDigits:0})}<span class="money-amount-suffix">${surplus>=0?'left':'over'}</span></div>
          </div>
          <span class="td-money-status ${statusCls}">${statusLabel}</span>
        </div>
        <div class="td-money-bar"><div class="td-money-bar-fill" style="width:${spentPct}%"></div></div>
        <div class="td-money-flags">${flags.join('')}<span class="td-money-flag">${daysLeft} days left</span></div>
      </div>` });
  }

  // ROUTINES CARD — logged-in user's routines, filtered by time of day
  const allMyRoutines = typeof _routinesForCurrentUser === 'function'
    ? _routinesForCurrentUser().filter(r => _routineMatchesDate(r, todayStr))
    : [];
  // Time filter: show routine if within 90min before triggerTime OR within 6hr active window
  function _tdRoutineVisible(r) {
    if (!r.triggerTime) return true;
    const [trigH, trigM] = r.triggerTime.split(':').map(Number);
    const nowMins   = now.getHours() * 60 + now.getMinutes();
    const startMins = trigH * 60 + (trigM || 0);
    return nowMins >= startMins - 90 && nowMins < startMins + 360;
  }
  const myRoutines = allMyRoutines.filter(_tdRoutineVisible);
  // Always show routines that are started today even if window has passed
  const todayKey = typeof _routineTodayKey === 'function' ? _routineTodayKey() : todayStr.replace(/-/g,'');
  const startedRoutines = allMyRoutines.filter(r => !_tdRoutineVisible(r) && (r.completions?.[todayKey]||[]).length > 0);
  const visibleRoutines = [...new Set([...myRoutines, ...startedRoutines])];

  if (visibleRoutines.length > 0) {
    const routineCards = visibleRoutines.map(r => {
      const completedSteps = (r.completions?.[todayKey] || []).map(String);
      const total = r.steps.length;
      const done  = completedSteps.length;
      const pct   = total > 0 ? Math.round(done / total * 100) : 0;
      const allDone = done === total && total > 0;
      const isActive = _tdRoutineVisible(r);
      const timeLabel = r.triggerTime ? `<span style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-left:6px">${r.triggerTime}</span>` : '';

      // Steps with duration and tick
      const stepsHtml = r.steps.map(step => {
        const isDone = completedSteps.includes(String(step.id));
        const dur = step.durationMin ? `<span style="font-family:var(--mono);font-size:10px;color:var(--muted-soft);margin-left:auto;padding-left:8px;flex-shrink:0">${step.durationMin}m</span>` : '';
        return `<div class="td-routine-step ${isDone?'td-routine-step-done':''}" onclick="_tdToggleStep('${r.id}','${step.id}')">
          <div class="td-routine-check ${isDone?'td-routine-check-done':''}">
            ${isDone ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
          </div>
          <span class="td-routine-step-emoji">${step.emoji||''}</span>
          <span class="td-routine-step-label ${isDone?'td-routine-step-label-done':''}">${escHtml(step.label)}</span>
          ${step.points ? `<span class="td-routine-step-pts">+${step.points}</span>` : ''}
          ${dur}
        </div>`;
      }).join('');

      const cardCls = allDone ? 'td-routine-card-done' : !isActive ? 'td-routine-card-locked' : 'td-routine-card-active';
      return `<div class="td-routine-card ${cardCls}">
        <div class="td-routine-header">
          <span style="font-size:20px">${r.emoji||'📋'}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;color:var(--ink)">${escHtml(r.name)}${timeLabel}</div>
            <div style="height:3px;background:var(--hairline);border-radius:99px;margin-top:6px;overflow:hidden">
              <div style="width:${pct}%;height:100%;border-radius:99px;background:${allDone?'var(--good)':'linear-gradient(90deg,var(--iris-2),var(--iris-3))'}"></div>
            </div>
          </div>
          <span style="font-family:var(--mono);font-size:11px;color:${allDone?'var(--good)':'var(--muted)'}">
            ${allDone ? '✓ Done' : `${done}/${total}`}
          </span>
        </div>
        ${isActive && total > 0 ? `<div class="td-routine-steps">${stepsHtml}</div>` : ''}
        ${!isActive ? `<div style="font-size:11px;color:var(--muted-soft);padding:4px 0 2px;font-family:var(--mono)">${_cvRoutineAvailLabel ? _cvRoutineAvailLabel(r) : ''}</div>` : ''}
      </div>`;
    }).join('');

    cards.push({ type: 'kids', urgency: 0,
      html: `<div class="td-card td-card-kids" style="padding:16px 18px">
        <div class="td-card-meta" style="margin-bottom:10px"><span class="td-meta-label">My Routines</span><span class="td-meta-count">${visibleRoutines.length}</span></div>
        ${routineCards}
      </div>` });
  }

  // slipping array built above in paired tiles block

  // UPCOMING CARD — next 7 days
  const in7 = new Date(now.getTime() + 7*86400000).toISOString().slice(0,10);
  const upcomingEvs = (state.planner?.events||[]).filter(e => e.date > todayStr && e.date <= in7).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3);
  const upcomingBills = (state.bills||[]).map(b=>({...b,days:billDaysUntil(b)})).filter(b=>b.days!==null&&b.days>2&&b.days<=7);
  if (upcomingEvs.length + upcomingBills.length > 0) {
    const items = [
      ...upcomingEvs.map(e => {
        const d = new Date(e.date+'T12:00:00');
        const label = d.toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'});
        const timeStr = (!e.allDay && e.time) ? (_plannerFmt12h ? _plannerFmt12h(e.time) : e.time) : '';
        return `<div class="td-up-row td-clickable" onclick="activateTab('planner');setTimeout(()=>_plannerOpenDetail&&_plannerOpenDetail('${e.id}'),120)">
          <div style="display:flex;flex-direction:column;gap:1px;min-width:60px;flex-shrink:0">
            <span class="td-up-date">${label}</span>
            ${timeStr ? `<span style="font-family:var(--mono);font-size:10px;color:var(--iris-2);font-weight:600">${timeStr}</span>` : ''}
          </div>
          <span class="td-up-title" style="flex:1">${escHtml(e.title)}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hairline)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>`;
      }),
      ...upcomingBills.map(b => `<div class="td-up-row td-clickable" onclick="activateTab('bills')">
        <span class="td-up-date">In ${b.days}d</span>
        <span class="td-up-title" style="flex:1">${escHtml(b.name)} <span style="font-family:var(--mono);color:var(--muted)">$${parseFloat(b.amount).toFixed(0)}</span></span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hairline)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`)
    ].slice(0,4).join('');
    cards.push({ type: 'upcoming', urgency: 0,
      html: `<div class="td-card">
        <div class="td-card-meta"><span class="td-meta-label">Coming up</span><span class="td-meta-count">${upcomingEvs.length + upcomingBills.length}</span></div>
        <div class="td-up-list">${items}</div>
      </div>` });
  }

  // WIN CARD — streaks / achievements
  const streakKids = (state.kids?.profiles||[]).map(kid => {
    const assignments = (state.routineAssignments||[]).filter(a=>a.childId===kid.id);
    let bestStreak = 0;
    assignments.forEach(a => {
      const r = (state.routines||[]).find(r=>r.id===a.routineId);
      if (r) { const s = _assignmentStreak ? _assignmentStreak(a, r.steps.length) : 0; if (s > bestStreak) bestStreak = s; }
    });
    return { kid, streak: bestStreak };
  }).filter(x => x.streak >= 3);
  if (streakKids.length > 0) {
    const s = streakKids[0];
    cards.push({ type: 'win', urgency: 0,
      html: `<div class="td-card td-card-win">
        <div class="td-card-meta"><span class="td-meta-label" style="color:var(--lime-deep)">Win</span></div>
        <div class="td-card-headline" style="font-family:var(--serif);font-style:italic">${escHtml(s.kid.name)} did every routine. ${s.streak} days running.</div>
      </div>` });
  }

  // LISTS + KIDS — paired square notification tiles
  {
    const foodList = state.lists && state.lists.food ? state.lists.food : { items: [] };
    const activeFood = (foodList.items || []).filter(i => i.state === 'active');
    const gotIt     = (foodList.items || []).filter(i => i.state === 'got_it');
    const k = state.kids;
    const pendingApprovals = k ? ((k.completions||[]).filter(c=>c.status==='pending').length + (k.redemptions||[]).filter(r=>r.status==='pending').length) : 0;
    const hasKids = state.kids?.profiles?.length > 0;

    const shopTile = `
      <div onclick="_listsActiveType='food';_listsView='list';activateTab('lists')" style="flex:1;min-width:0;background:var(--purple-soft);border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:130px;border:1px solid rgba(91,76,245,.12);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(91,76,245,.08)">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--iris-2);margin-bottom:6px">Shopping List</div>
          <div style="font-size:28px;font-weight:800;color:var(--iris-1);letter-spacing:-.04em;line-height:1">${activeFood.length}</div>
          <div style="font-size:12px;color:var(--iris-2);margin-top:2px">${activeFood.length === 1 ? 'item' : 'items'}${gotIt.length > 0 ? ` · ${gotIt.length} in trolley` : ''}</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--iris-1);margin-top:10px">View list →</div>
      </div>`;

    const kidsTile = hasKids ? `
      <div onclick="activateTab('kids')" style="flex:1;min-width:0;background:${pendingApprovals > 0 ? '#FFF7ED' : '#F0FDF4'};border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:130px;border:1px solid ${pendingApprovals > 0 ? 'rgba(249,115,22,.15)' : 'rgba(16,185,129,.15)'};box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(22,20,15,.05)">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${pendingApprovals > 0 ? '#c2410c' : '#059669'};margin-bottom:6px">Kids</div>
          <div style="font-size:28px;font-weight:800;color:${pendingApprovals > 0 ? 'var(--ember)' : 'var(--good)'};letter-spacing:-.04em;line-height:1">${pendingApprovals > 0 ? pendingApprovals : '✓'}</div>
          <div style="font-size:12px;color:${pendingApprovals > 0 ? '#c2410c' : '#059669'};margin-top:2px">${pendingApprovals > 0 ? `approval${pendingApprovals !== 1 ? 's' : ''} pending` : 'all clear'}</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:${pendingApprovals > 0 ? 'var(--ember)' : 'var(--good)'};margin-top:10px">${pendingApprovals > 0 ? 'Review →' : 'View kids →'}</div>
      </div>` : '';

    cards.push({ type: 'lists', urgency: pendingApprovals > 0 ? 1 : 0,
      html: `<div style="display:flex;gap:12px;margin-bottom:12px">${shopTile}${kidsTile}</div>` });
  }

  // Briefing line
  function generateBriefing() {
    const calmByPart = {
      overnight: 'Quiet night.',
      morning:   'Quiet day ahead.',
      afternoon: 'Quiet afternoon.',
      evening:   'Quiet evening.',
      night:     'Nothing pressing tonight.',
    };
    const sentences = [];
    if (todayEvs.length >= 3) {
      sentences.push(`${todayEvs.length} things on the calendar.`);
    } else if (todayEvs.length === 0 && slipping.length === 0 && billsDue.length === 0) {
      sentences.push(calmByPart[dayPart] || 'Quiet day ahead.');
    }
    if (billsDue.length > 0) {
      const b = billsDue[0];
      sentences.push(`${b.name} ${b.days===0?'is due today':'is due tomorrow'}.`);
    }
    if (sentences.length === 0) sentences.push(calmByPart[dayPart] || 'Quiet day ahead.');
    return sentences.slice(0,2).join(' ');
  }
  const briefing = generateBriefing();

  // Sort cards: priority first, then by urgency desc
  const typeOrder = { priority:0, schedule:1, money:2, lists:3, kids:4, slipping:5, upcoming:6, win:7 };
  cards.sort((a,b) => (typeOrder[a.type]??9) - (typeOrder[b.type]??9));

  const cardsHtml = cards.map(c=>c.html).join('');
  const calmState = cards.length <= 1 ? `<div class="td-calm">You're sorted.<br>See you tomorrow.</div>` : '';

  // Render setup progress if needed
  const setupHtml = typeof renderSetupProgress === 'function' ? `<div id="setup-progress-card">${renderSetupProgress()}</div>` : '';

  el.innerHTML = `
    <div class="td-app-header">
      <div class="td-logo">TOTO</div>
      <div class="td-header-icons">
        <button class="td-icon-btn td-icon-btn-iris" onclick="toggleTotoAssistant()" title="Ask Toto" aria-label="Ask Toto" style="font-size:16px">🐕</button>
        <button class="td-icon-btn td-icon-btn-iris" onclick="toggleInsightSheet()" title="Insights" aria-label="Insights">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </button>
        <button class="td-icon-btn" onclick="activateTab('settings')" title="Settings" aria-label="Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
      </div>
    </div>

    <div class="td-greeting">
      <div class="td-greeting-date">${dateLine}</div>
      <div class="td-greeting-line">
        ${greetWord} <span class="iris-text">${name ? name+'.' : 'you.'}</span>
      </div>
      <div class="td-greeting-brief">${escHtml(briefing)}</div>
    </div>

    ${setupHtml}
    ${state.settings?.typeAMode ? `
      ${_renderLifeScore()}
      ${_renderMissionCard()}
    ` : ''}
    ${cardsHtml}
    ${calmState}
  `;

  // Type A mission escalation check
  if (state.settings?.typeAMode) _checkMissionEscalation();

  // Async AI briefing
  if (typeof _fetchAIBriefing === 'function') {
    const health = typeof calcFinancialHealth === 'function' ? calcFinancialHealth() : null;
    const mealWeekKey = typeof _mealWeekKey === 'function' ? _mealWeekKey(0) : null;
    const todayMeals = mealWeekKey ? (state.meals?.plan?.[mealWeekKey]?.[now.getDay()===0?6:now.getDay()-1]) || {} : {};
    _fetchAIBriefing(cards.map(c=>({title:c.type})), surplus, daysLeft, todayMeals, health);
  }
}

function _tdOpenHeadsUpSheet() {
  const now = new Date();
  const billsDue = (state.bills || []).map(b => ({ ...b, days: billDaysUntil(b) })).filter(b => b.days !== null && b.days <= 2).sort((a,b) => a.days - b.days);
  if (!billsDue.length) return;
  const totalDue = billsDue.reduce((s,b) => s + (parseFloat(b.amount)||0), 0);
  const rows = billsDue.map(b => {
    const dayLabel = b.days === 0 ? 'Due today' : b.days === 1 ? 'Tomorrow' : `In ${b.days} days`;
    const badgeCls = b.days === 0 ? 'background:#FEF2F2;color:#b91c1c' : b.days === 1 ? 'background:#FFF4EE;color:#c2410c' : 'background:var(--paper);color:var(--muted)';
    const amt = b.amount ? `$${parseFloat(b.amount).toLocaleString('en-AU',{minimumFractionDigits:2,maximumFractionDigits:2})}` : '';
    const dotGlow = b.days === 0 ? 'box-shadow:0 0 0 3px rgba(239,68,68,.2)' : b.days === 1 ? 'box-shadow:0 0 0 3px rgba(249,115,22,.2)' : '';
    return `<div style="display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--hairline);gap:14px">
      <div style="width:8px;height:8px;border-radius:50%;background:${b.days===0?'#ef4444':b.days===1?'var(--ember)':'var(--iris-2)'};flex-shrink:0;${dotGlow}"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:var(--ink)">${escHtml(b.name)}</div>
        ${b.notes ? `<div style="font-size:11px;color:var(--muted);margin-top:2px;font-family:var(--mono)">${escHtml(b.notes)}</div>` : ''}
      </div>
      <div style="text-align:right;flex-shrink:0">
        ${amt ? `<div style="font-family:var(--mono);font-size:13px;font-weight:600;color:var(--iris-1)">${amt}</div>` : ''}
        <div style="display:inline-block;font-family:var(--mono);font-size:10px;font-weight:700;border-radius:99px;padding:2px 8px;margin-top:3px;${badgeCls}">${dayLabel}</div>
      </div>
    </div>`;
  }).join('');
  const footer = `<div style="padding:14px 18px;border-top:1px solid var(--hairline);display:flex;align-items:center;justify-content:space-between">
    <div>
      <div style="font-family:var(--mono);font-size:11px;color:var(--muted)">Total due</div>
      <div style="font-family:var(--mono);font-size:15px;font-weight:700;color:var(--ink)">$${totalDue.toLocaleString('en-AU',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
    </div>
    <button onclick="activateTab('bills');_tdCloseSheet()" style="background:linear-gradient(135deg,var(--iris-1),var(--iris-2));color:#fff;border:none;border-radius:99px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer">Pay bills →</button>
  </div>`;
  _tdOpenSheet('Heads Up', rows + footer);
}

function _tdOpenSlippingSheet() {
  const now = new Date();
  const slipping = [];
  (state.documents||[]).forEach(d => { if (d.expiryDate && new Date(d.expiryDate) < now) slipping.push({ label: d.name, sub: 'Documents', badge: 'Expired', cls: 'alert', tab: 'documents' }); });
  (state.maintenance||[]).forEach(m => { const d = _maintDaysUntil(m); if (d !== null && d < 0) slipping.push({ label: m.name, sub: 'Maintenance', badge: `${Math.abs(d)}d overdue`, cls: 'watch', tab: 'maintenance' }); });
  (state.vehicles||[]).forEach(v => { if (v.regoExpiry && new Date(v.regoExpiry) < now) slipping.push({ label: v.name+' rego', sub: 'Vehicles', badge: 'Expired', cls: 'alert', tab: 'vehicles' }); });
  if (!slipping.length) return;
  const rows = slipping.map(s => {
    const dotColor = s.cls === 'alert' ? '#ef4444' : 'var(--ember)';
    const dotGlow  = s.cls === 'alert' ? 'box-shadow:0 0 0 3px rgba(239,68,68,.15)' : 'box-shadow:0 0 0 3px rgba(249,115,22,.18)';
    const badgeBg  = s.cls === 'alert' ? 'background:#FEF2F2;color:#b91c1c' : 'background:#FFF4EE;color:#c2410c';
    return `<div onclick="activateTab('${s.tab}');_tdCloseSheet()" style="display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--hairline);gap:14px;cursor:pointer">
      <div style="width:8px;height:8px;border-radius:50%;background:${dotColor};flex-shrink:0;${dotGlow}"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:var(--ink)">${escHtml(s.label)}</div>
        <div style="font-size:11px;color:var(--muted);margin-top:2px;font-family:var(--mono)">${s.sub}</div>
      </div>
      <div style="display:inline-block;font-family:var(--mono);font-size:10px;font-weight:700;border-radius:99px;padding:2px 8px;${badgeBg}">${s.badge}</div>
    </div>`;
  }).join('');
  const footer = `<div style="padding:14px 18px;border-top:1px solid var(--hairline);display:flex;justify-content:flex-end">
    <button onclick="_tdCloseSheet()" style="background:linear-gradient(135deg,#ea6c0a,var(--ember));color:#fff;border:none;border-radius:99px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer">Done</button>
  </div>`;
  _tdOpenSheet('Slipping', rows + footer);
}

function _tdOpenSheet(title, bodyHtml) {
  let el = document.getElementById('td-sheet-overlay');
  if (!el) {
    el = document.createElement('div');
    el.id = 'td-sheet-overlay';
    el.style.cssText = 'position:fixed;inset:0;z-index:1200;display:flex;flex-direction:column;justify-content:flex-end;background:rgba(0,0,0,.4)';
    el.onclick = (e) => { if (e.target === el) _tdCloseSheet(); };
    document.body.appendChild(el);
  }
  el.innerHTML = `
    <div id="td-sheet-panel" style="background:var(--pearl);border-radius:24px 24px 0 0;max-height:80vh;display:flex;flex-direction:column;padding-bottom:env(safe-area-inset-bottom,16px)">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 18px 14px;border-bottom:1px solid var(--hairline);flex-shrink:0">
        <div style="width:36px;height:4px;background:var(--hairline);border-radius:99px;position:absolute;top:10px;left:50%;transform:translateX(-50%)"></div>
        <div style="font-size:17px;font-weight:800;color:var(--ink);letter-spacing:-.015em">${escHtml(title)}</div>
        <button onclick="_tdCloseSheet()" style="background:var(--paper);border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:15px;color:var(--muted);display:flex;align-items:center;justify-content:center">×</button>
      </div>
      <div style="overflow-y:auto;flex:1">${bodyHtml}</div>
    </div>`;
  el.style.display = 'flex';
}

function _tdCloseSheet() {
  const el = document.getElementById('td-sheet-overlay');
  if (el) el.style.display = 'none';
}

function _tdToggleStep(routineId, stepId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const key = _routineTodayKey();
  if (!routine.completions) routine.completions = {};
  if (!routine.completions[key]) routine.completions[key] = [];
  // Normalise all stored IDs to strings for consistent comparison
  routine.completions[key] = routine.completions[key].map(String);
  const sid = String(stepId);
  const idx = routine.completions[key].indexOf(sid);
  if (idx === -1) routine.completions[key].push(sid);
  else routine.completions[key].splice(idx, 1);
  saveData(state);
  renderToday();
}

function toggleInsightSheet() {
  const insights = [];
  const now = new Date();
  const curData = getMonthData(selectedBudgetMonth);
  const totalIncome = monthlyTotal(curData.income);
  const totalExpenses = monthlyTotal(curData.expenses);
  const surplus = totalIncome - totalExpenses;
  if (surplus < 0) insights.push({ headline: 'Spending is ahead of budget this month.', detail: `You're $${Math.abs(surplus).toFixed(0)} over.`, action: 'budget' });
  (state.documents||[]).filter(d=>d.expiryDate).forEach(d=>{
    const days = Math.ceil((new Date(d.expiryDate)-now)/86400000);
    if (days>=0&&days<=30) insights.push({ headline: `${d.name} expires in ${days} day${days!==1?'s':''}.`, detail:'Keep it updated.', action:'documents'});
  });
  if (insights.length === 0) insights.push({ headline: 'All clear. Nothing to flag.', detail: 'Check back later.', action: null });
  const html = insights.map(i=>`<div style="padding:16px 0;border-bottom:1px solid var(--hairline)">
    <div style="font-family:var(--serif);font-style:italic;font-size:17px;font-weight:400;margin-bottom:4px;color:var(--ink)">${escHtml(i.headline)}</div>
    <div style="font-size:13px;color:var(--muted)">${escHtml(i.detail)}</div>
    ${i.action?`<button onclick="activateTab('${i.action}');closeQuickAdd&&closeQuickAdd()" style="margin-top:10px;padding:7px 14px;border-radius:99px;background:var(--ink);color:var(--pearl);font-size:12px;font-weight:500;border:none;cursor:pointer">View →</button>`:''}
  </div>`).join('');
  if (typeof openModal === 'function') {
    openModal('💡 Insights', `<div style="padding:0 4px">${html}</div>`, null);
  }
}
let _lastBriefingDate = '';
let _cachedBriefing = '';

async function _fetchAIBriefing(cards, surplus, daysLeft, todayMeals, health) {
  const key = localStorage.getItem('toto_ai_key');
  if (!key) return;

  // Cache: only call AI once per day
  const todayStr = new Date().toISOString().slice(0, 10);
  if (_lastBriefingDate === todayStr && _cachedBriefing) {
    const el = document.getElementById('today-briefing-text');
    if (el) el.textContent = _cachedBriefing;
    return;
  }

  const redItems = cards.filter(c => c.cls === 'red').map(c => c.title);
  const amberItems = cards.filter(c => c.cls === 'amber').map(c => c.title);

  const context = [
    `Budget: ${aud(Math.abs(surplus))} ${surplus >= 0 ? 'surplus' : 'over budget'}, ${daysLeft} days left in the month`,
    `Health score: ${health.total}/100 (${health.grade})`,
    redItems.length ? `Urgent: ${redItems.join(', ')}` : '',
    amberItems.length ? `Coming up: ${amberItems.join(', ')}` : '',
    todayMeals.d ? `Dinner tonight: ${todayMeals.d}` : 'No dinner planned',
    `${(state.goals||[]).filter(g=>g.status!=='achieved').length} active goals`,
  ].filter(Boolean).join('. ');

  const prompt = `You are Toto, a friendly family personal assistant app. Write a 2-sentence daily briefing for the user based on this context:

${context}

Rules:
- Warm, conversational, like a helpful friend
- Lead with the most important thing
- Mention dinner if planned
- Keep it under 40 words
- No emojis, no bullet points, just flowing text
- Don't start with "Here's" or "Today"`;

  try {
    const res = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 100, messages: [{ role: 'user', content: prompt }] })
    });
    if (!res.ok) return;
    const data = await res.json();
    const text = data.content[0].text.trim().replace(/^["']|["']$/g, '');
    _cachedBriefing = text;
    _lastBriefingDate = todayStr;
    const el = document.getElementById('today-briefing-text');
    if (el) el.textContent = text;
  } catch(e) { /* silent fail — keep template */ }
}

function renderDashboard() {
  const d = state;
  const c = d.buildContract;

  // ── Net worth ──
  const nwAssets = (d.netWorth.assets||[]).reduce((s,a) => s+(parseFloat(a.value)||0), 0);
  const nwLiabs  = (d.netWorth.liabilities||[]).reduce((s,l) => s+(parseFloat(l.value)||0), 0);
  const netWorth = nwAssets - nwLiabs;
  const snaps    = d.netWorth.snapshots||[];
  let nwChangeHtml = '';
  if (snaps.length >= 2) {
    const diff = netWorth - snaps[snaps.length-2].netWorth;
    const cls  = diff >= 0 ? 'up' : 'dn';
    nwChangeHtml = `<span class="${cls}">${diff>=0?'+':''}${fmtNW(diff)}</span> vs last snapshot`;
  }

  // ── Budget ──
  const curMonth     = selectedBudgetMonth;
  const curData      = getMonthData(curMonth);
  const monthlyIncome    = monthlyTotal(curData.income);
  const monthlyExpenses  = monthlyTotal(curData.expenses);
  const surplus          = monthlyIncome - monthlyExpenses;
  const subMonthly       = (d.subscriptions||[]).reduce((s,sub) => s+subMonthlyAmount(sub), 0);
  const billsThisMonth   = (d.bills||[]).filter(b => { const days = billDaysUntil(b); return days >= 0 && days <= 31; })
                            .reduce((s,b) => s+(parseFloat(b.amount)||0), 0);

  // ── Upcoming bills ──
  const upcomingBills = [...(d.bills||[])]
    .filter(b => billDaysUntil(b) >= -1)
    .sort((a,b) => billDaysUntil(a) - billDaysUntil(b))
    .slice(0, 5);

  // ── Goals ──
  const activeGoals = (d.goals||[]).filter(g => g.status !== 'achieved').slice(0, 4);

  // ── Build contract ──
  const contractPaid    = c.stages.filter(s=>s.paid).reduce((s,st)=>s+st.amount,0);
  const approvedVars    = (c.variations||[]).filter(v=>v.status==='approved').reduce((s,v)=>s+(v.amount||0),0);
  const revisedTotal    = c.total + approvedVars;
  const contractPct     = Math.round(contractPaid / revisedTotal * 100);
  const nextStage       = c.stages.find(s=>!s.paid);

  // ── Kids pending ──
  const pendingKids = ((d.kids||{}).completions||[]).filter(c=>c.status==='pending').length
                    + ((d.kids||{}).redemptions||[]).filter(r=>r.status==='pending').length;

  // ── 6-month budget chart ──
  const last6        = getLast6Months();
  const totalBudgetMo = monthlyTotal(curData.expenses);
  const chartData    = last6.map(mo => {
    const actual = Object.values(state.budget.actuals[mo]||{}).reduce((s,v)=>s+v,0);
    return { label: monthShortLabel(mo), budget: totalBudgetMo, actual };
  });
  const hasChart = totalBudgetMo > 0 || chartData.some(d=>d.actual>0);

  // ── Financial health score ──
  const health = calcFinancialHealth();
  const circ = 251.3;
  const arc  = ((health.total / 100) * circ).toFixed(1);
  const dimBars = health.dimensions.map(dim => {
    const pct = Math.round(dim.score / dim.max * 100);
    const barColor = pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
    return `
      <div style="display:grid;grid-template-columns:130px 1fr 30px;align-items:center;gap:8px">
        <span style="font-size:12px;color:var(--text-muted);white-space:nowrap">${dim.label}</span>
        <div style="height:6px;background:var(--border);border-radius:4px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:${barColor};border-radius:4px;transition:width 0.4s"></div>
        </div>
        <span style="font-size:11px;font-weight:600;color:${barColor};text-align:right">${dim.score}/${dim.max}</span>
      </div>`;
  }).join('');
  const healthHtml = `
    <div class="db-widget" style="margin:0 24px 20px">
      <div class="db-widget-header">
        <span class="db-widget-title">Financial Health Score</span>
      </div>
      <div style="display:grid;grid-template-columns:120px 1fr;gap:20px;align-items:center;padding:16px 20px 12px">
        <div style="text-align:center">
          <svg viewBox="0 0 100 100" width="110" height="110" style="display:block;margin:0 auto">
            <g transform="rotate(-90 50 50)">
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" stroke-width="10"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="${health.color}" stroke-width="10"
                stroke-dasharray="${arc} ${circ}" stroke-linecap="round"/>
            </g>
            <text x="50" y="47" text-anchor="middle" font-size="24" font-weight="800" fill="${health.color}">${health.total}</text>
            <text x="50" y="63" text-anchor="middle" font-size="13" font-weight="600" fill="#94a3b8">Grade ${health.grade}</text>
          </svg>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">${dimBars}</div>
      </div>
      <div style="padding:0 20px 14px;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:10px;margin-top:4px">
        💡 ${health.insight}
      </div>
    </div>`;

  let chartHtml = '';
  if (hasChart) {
    const maxVal = Math.max(...chartData.flatMap(d=>[d.budget,d.actual]),1);
    const W=600,PL=58,PR=10,PT=10,PB=30,chartH=140;
    const chartW=W-PL-PR, groupW=chartW/chartData.length, barW=groupW*0.28, gap=groupW*0.04;
    const yLines = [0,0.25,0.5,0.75,1].map(p => {
      const y=PT+chartH-p*chartH;
      return `<line x1="${PL}" y1="${y}" x2="${W-PR}" y2="${y}" stroke="#e2e8f0" stroke-width="1"/>
        <text x="${PL-5}" y="${y+4}" text-anchor="end" font-size="9" fill="#94a3b8">${aud(p*maxVal)}</text>`;
    }).join('');
    const bars = chartData.map((d,i) => {
      const x=PL+i*groupW+groupW*0.08;
      const bH=d.budget>0?(d.budget/maxVal)*chartH:0;
      const aH=d.actual>0?(d.actual/maxVal)*chartH:0;
      const aColor=d.actual>d.budget?'#ef4444':'#10b981';
      return `<rect x="${x}" y="${PT+chartH-bH}" width="${barW}" height="${bH}" fill="#2563eb" opacity="0.65" rx="2"/>
        <rect x="${x+barW+gap}" y="${PT+chartH-aH}" width="${barW}" height="${aH}" fill="${aColor}" opacity="0.8" rx="2"/>
        <text x="${x+barW+gap/2+barW/2}" y="${PT+chartH+16}" text-anchor="middle" font-size="10" fill="#64748b">${d.label}</text>`;
    }).join('');
    chartHtml = `<div class="db-widget">
      <div class="db-widget-header">
        <span class="db-widget-title">Budget vs Actual — Last 6 Months</span>
        <div class="chart-legend" style="font-size:11px">
          <span><span class="legend-dot" style="background:#2563eb;opacity:0.65"></span>Budget</span>
          <span><span class="legend-dot" style="background:#10b981"></span>Under</span>
          <span><span class="legend-dot" style="background:#ef4444"></span>Over</span>
        </div>
      </div>
      <div style="padding:12px 16px 8px">
        <svg viewBox="0 0 ${W} ${PT+chartH+PB}" style="width:100%;height:auto;display:block">${yLines}${bars}</svg>
      </div>
    </div>`;
  }

  const html = `
    <!-- Hero row: net worth + 4 stats -->
    <div class="db-hero-row">
      <div class="db-nw-card" onclick="activateTab('networth')" style="cursor:pointer">
        <div>
          <div class="db-nw-label">Net Worth</div>
          <div class="db-nw-amount">${fmtNW(netWorth)}</div>
          ${nwChangeHtml ? `<div class="db-nw-change">${nwChangeHtml}</div>` : ''}
        </div>
        <div style="font-size:12px;opacity:0.6;margin-top:12px">${aud(nwAssets)} assets · ${aud(nwLiabs)} liabilities</div>
      </div>
      <div class="db-stats-col">
        <div class="db-stat">
          <div class="db-stat-val ${surplus>=0?'green':'red'}">${aud(Math.abs(surplus))}</div>
          <div class="db-stat-lbl">Monthly ${surplus>=0?'surplus':'deficit'}</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val teal">$${Math.round(billsThisMonth).toLocaleString()}</div>
          <div class="db-stat-lbl">Bills this month</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val">$${Math.round(subMonthly).toLocaleString()}</div>
          <div class="db-stat-lbl">Subscriptions/mo</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val">${aud(monthlyIncome)}</div>
          <div class="db-stat-lbl">Monthly income</div>
        </div>
      </div>
    </div>

    <!-- This week strip -->
    <div class="db-widget" style="margin:0 24px 20px">
      <div class="db-widget-header">
        <span class="db-widget-title">This Week</span>
        <button class="db-widget-link" onclick="activateTab('planner')">Open planner →</button>
      </div>
      <div style="padding:12px 16px 14px">${renderWeeklyStrip()}</div>
    </div>

    <!-- Financial health score -->
    ${healthHtml}

    <!-- Two-column widgets -->
    <div class="db-grid">
      <div>
        <!-- Upcoming bills -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Upcoming Bills</span>
            <button class="db-widget-link" onclick="activateTab('bills')">View all →</button>
          </div>
          ${upcomingBills.length ? upcomingBills.map(b => {
            const days = billDaysUntil(b);
            const badge = days < 0 ? `<span class="bill-due-badge overdue">Overdue</span>`
                        : days === 0 ? `<span class="bill-due-badge today">Today</span>`
                        : days <= 7  ? `<span class="bill-due-badge soon">${days}d</span>`
                        : `<span class="bill-due-badge ok">${billNextDue(b).toLocaleDateString('en-AU',{day:'numeric',month:'short'})}</span>`;
            return `<div class="db-bill-row">
              <div class="db-bill-icon">${billCatIcon(b.category)}</div>
              <div class="db-bill-name">${escHtml(b.name)}</div>
              ${badge}
              <div class="db-bill-amount">${aud(parseFloat(b.amount)||0)}</div>
            </div>`;
          }).join('') : `<div class="db-empty-row">No upcoming bills — <button class="db-widget-link" onclick="activateTab('bills')">add one</button></div>`}
        </div>

        <!-- Goals -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Goals</span>
            <button class="db-widget-link" onclick="activateTab('goals')">View all →</button>
          </div>
          ${activeGoals.length ? activeGoals.map(g => {
            const pct = Math.min(Math.round(((g.saved||0)/(g.target||1))*100),100);
            return `<div class="db-goal-row">
              <div class="db-goal-top">
                <span class="db-goal-name">${g.emoji||'🎯'} ${escHtml(g.name)}</span>
                <span class="db-goal-pct">${aud(g.saved||0)} of ${aud(g.target||0)} · ${pct}%</span>
              </div>
              <div class="db-goal-bar"><div class="db-goal-fill" style="width:${pct}%"></div></div>
            </div>`;
          }).join('') : `<div class="db-empty-row">No active goals — <button class="db-widget-link" onclick="activateTab('goals')">add one</button></div>`}
        </div>
      </div>

      <div>
        <!-- Budget this month -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Budget · ${monthLabel(curMonth)}</span>
            <button class="db-widget-link" onclick="activateTab('budget')">Edit →</button>
          </div>
          <div class="db-budget-row">
            <span class="db-budget-label">Income</span>
            <span class="db-budget-val" style="color:#10b981">${aud(monthlyIncome)}</span>
          </div>
          <div class="db-budget-row">
            <span class="db-budget-label">Expenses</span>
            <span class="db-budget-val" style="color:#ef4444">${aud(monthlyExpenses)}</span>
          </div>
          <div class="db-budget-row" style="border-top:2px solid var(--border)">
            <span class="db-budget-label" style="font-weight:700">${surplus>=0?'Surplus':'Deficit'}</span>
            <span class="db-budget-val" style="color:${surplus>=0?'#10b981':'#ef4444'}">${aud(Math.abs(surplus))}</span>
          </div>
        </div>

        ${pendingKids > 0 ? `
        <!-- Kids pending approvals -->
        <div class="db-widget" style="border-color:#fde68a">
          <div class="db-widget-header" style="background:#fffbeb">
            <span class="db-widget-title">⭐ Kids Zone — ${pendingKids} pending approval${pendingKids!==1?'s':''}</span>
            <button class="db-widget-link" onclick="activateTab('kids')">Review →</button>
          </div>
        </div>` : ''}

        <!-- Build contract -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Build Contract</span>
            <button class="db-widget-link" onclick="activateTab('build')">View →</button>
          </div>
          <div style="padding:14px 18px">
            <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px">
              <span style="font-weight:600">${aud(contractPaid)} paid</span>
              <span style="color:#94a3b8">${contractPct}% of ${aud(revisedTotal)}</span>
            </div>
            <div class="db-build-bar" style="margin:0 0 10px">
              <div class="db-build-fill" style="width:${contractPct}%"></div>
            </div>
            ${nextStage ? `<div style="font-size:12px;color:#64748b">Next: <strong>${escHtml(nextStage.name)}</strong> — ${aud(nextStage.amount)}</div>` : '<div style="font-size:12px;color:#10b981;font-weight:600">✓ All stages paid</div>'}
          </div>
        </div>
      </div>
    </div>

    ${chartHtml}
  `;

  document.getElementById('dashboard-content').innerHTML = html;
}

// ─────────────────────────────────────────────────
// BUILD COSTS
// ─────────────────────────────────────────────────

function renderBuild() {
  const c = state.buildContract;
  const contractPaid = c.stages.filter(s => s.paid).reduce((sum, s) => sum + s.amount, 0);
  const contractRemaining = c.total - contractPaid;
  const paidStages = c.stages.filter(s => s.paid).length;
  const totalStages = c.stages.length;

  // Variations totals
  const variations = c.variations || [];
  const approvedVarTotal = variations.filter(v => v.status === 'approved').reduce((s, v) => s + (v.amount || 0), 0);
  const pendingVarTotal  = variations.filter(v => v.status === 'pending').reduce((s, v) => s + (v.amount || 0), 0);
  const revisedTotal     = c.total + approvedVarTotal;

  let html = `
    <div class="section" style="border-left:4px solid ${colors.build.contract}">
      <div class="section-header">
        <div>
          <div class="section-title">Fixed Price Contract</div>
          <div class="section-subtitle">${paidStages} of ${totalStages} stages paid · ${Math.round(contractPaid/c.total*100)}% of original contract</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="openEditContractTotal()">Edit contract</button>
          <button class="btn btn-primary btn-sm" onclick="openAddStage()">+ Stage</button>
        </div>
      </div>

      <!-- Contract summary row -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1px;background:var(--border);border-bottom:1px solid var(--border)">
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Original Contract</div>
          <div style="font-size:18px;font-weight:700">${aud(c.total)}</div>
        </div>
        ${approvedVarTotal !== 0 ? `
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Approved Variations</div>
          <div style="font-size:18px;font-weight:700;color:${approvedVarTotal > 0 ? 'var(--danger)' : 'var(--success)'}">${approvedVarTotal > 0 ? '+' : ''}${aud(approvedVarTotal)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Revised Total</div>
          <div style="font-size:18px;font-weight:700;color:var(--primary)">${aud(revisedTotal)}</div>
        </div>` : ''}
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Paid to Date</div>
          <div style="font-size:18px;font-weight:700;color:var(--success)">${aud(contractPaid)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Remaining</div>
          <div style="font-size:18px;font-weight:700;color:var(--danger)">${aud(revisedTotal - contractPaid)}</div>
        </div>
        ${pendingVarTotal > 0 ? `
        <div style="background:#fffbeb;padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#92400e;margin-bottom:4px">Pending Variations</div>
          <div style="font-size:18px;font-weight:700;color:#d97706">+${aud(pendingVarTotal)}</div>
        </div>` : ''}
      </div>

      <!-- Visual stage timeline -->
      <div style="padding:16px 20px;border-bottom:1px solid var(--border)">
        <div style="display:flex;gap:0;position:relative">
          ${c.stages.map((s, idx) => {
            const pct = ((s.amount / c.total) * 100).toFixed(0);
            const isNext = !s.paid && c.stages.slice(0, idx).every(x => x.paid);
            const bg = s.paid ? '#dcfce7' : isNext ? '#dbeafe' : 'var(--surface2)';
            const border = s.paid ? '#16a34a' : isNext ? 'var(--primary)' : 'var(--border)';
            const textColor = s.paid ? '#15803d' : isNext ? 'var(--primary)' : 'var(--text-muted)';
            const icon = s.paid ? '✓' : isNext ? '→' : `${idx+1}`;
            const dateLabel = s.paid && s.paidDate ? fmtDate(s.paidDate) : (s.expectedDate ? 'Exp. '+fmtDate(s.expectedDate) : '');
            const overdue = !s.paid && s.expectedDate && isOverdue(s.expectedDate);
            return `
            <div style="flex:1;min-width:0;border:1px solid ${overdue ? 'var(--danger)' : border};border-radius:8px;padding:10px 10px 8px;margin-right:${idx < c.stages.length-1 ? '6px' : '0'};background:${overdue ? '#fef2f2' : bg};cursor:pointer;position:relative" onclick="openEditStage(${s.id})" title="Edit ${escAttr(s.name)}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
                <span style="font-size:11px;font-weight:700;color:${overdue ? 'var(--danger)' : textColor};width:20px;height:20px;border-radius:50%;background:${s.paid ? '#16a34a' : isNext ? 'var(--primary)' : '#94a3b8'};color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">${icon}</span>
                <span style="font-size:11px;color:${overdue ? 'var(--danger)' : 'var(--text-muted)'};font-weight:600">${pct}%</span>
              </div>
              <div style="font-size:12px;font-weight:600;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px">${escHtml(s.name)}</div>
              <div style="font-size:12px;font-weight:700;color:${s.paid ? '#15803d' : 'var(--text)'}">${aud(s.amount)}</div>
              ${dateLabel ? `<div style="font-size:10px;color:${overdue ? 'var(--danger)' : 'var(--text-muted)'};margin-top:2px">${overdue ? '⚠ ' : ''}${dateLabel}</div>` : ''}
            </div>`;
          }).join('')}
        </div>
        <div class="progress-bar" style="height:8px;margin-top:12px;border-radius:4px">
          <div class="progress-fill green" style="width:${Math.min(100, Math.round(contractPaid/c.total*100))}%;border-radius:4px"></div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>Stage</th><th>Amount</th><th>% of Contract</th><th>Status</th><th>Funding</th><th>Expected</th><th>Paid Date</th><th>Invoice Ref</th><th></th></tr></thead>
          <tbody>
            ${c.stages.map(s => {
              const pct = ((s.amount / c.total) * 100).toFixed(1);
              const overdue = !s.paid && s.expectedDate && isOverdue(s.expectedDate);
              const badge = s.paid
                ? `<span class="badge paid">Paid</span>`
                : overdue
                  ? `<span class="badge overdue">Overdue</span>`
                  : `<span class="badge unpaid">Upcoming</span>`;
              return `<tr>
                <td style="font-weight:500">${escHtml(s.name)}</td>
                <td class="amount">${aud(s.amount)}</td>
                <td style="color:var(--text-muted)">${pct}%</td>
                <td>${badge}</td>
                <td>${fundingBadge(s.funding || 'loan')}</td>
                <td>${s.expectedDate ? fmtDate(s.expectedDate) : '<span style="color:var(--text-muted)">—</span>'}</td>
                <td>${fmtDate(s.paidDate)}</td>
                <td style="color:var(--text-muted)">${escHtml(s.invoiceRef || '—')}</td>
                <td class="actions">
                  ${attachBtn(`stage-${s.id}`, escAttr(s.name))}
                  <button class="btn btn-ghost btn-sm" onclick="openEditStage(${s.id})">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="deleteStage(${s.id})">🗑</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // ── Contract Variations ─────────────────────────
  const varStatusBadge = {
    'pending':  `<span class="badge" style="background:#fef9c3;color:#854d0e;border:1px solid #fde047">Pending</span>`,
    'approved': `<span class="badge paid">Approved</span>`,
    'rejected': `<span class="badge" style="background:#fee2e2;color:#991b1b">Rejected</span>`,
  };

  html += `
    <div class="section" style="border-left:4px solid #8b5cf6">
      <div class="section-header">
        <div>
          <div class="section-title">Contract Variations</div>
          <div class="section-subtitle">
            ${variations.length === 0 ? 'No variations yet' :
              `${variations.filter(v=>v.status==='approved').length} approved · ${variations.filter(v=>v.status==='pending').length} pending · ${approvedVarTotal >= 0 ? '+' : ''}${aud(approvedVarTotal)} net impact`}
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddVariation()">+ Variation</button>
      </div>
      ${variations.length === 0
        ? `<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No variations raised yet. Builder-initiated or owner-requested changes to the contract will appear here.</div>`
        : `<div class="table-wrap">
            <table>
              <thead><tr><th>Ref</th><th>Description</th><th>Amount</th><th>Status</th><th>Funding</th><th>Raised</th><th>Approved</th><th>Notes</th><th></th></tr></thead>
              <tbody>
                ${variations.map(v => `<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${escHtml(v.ref || '—')}</td>
                  <td style="font-weight:500">${escHtml(v.name)}</td>
                  <td class="amount" style="color:${(v.amount||0) < 0 ? 'var(--success)' : 'var(--danger)'};font-weight:600">${v.amount > 0 ? '+' : ''}${aud(v.amount)}</td>
                  <td>${varStatusBadge[v.status] || varStatusBadge['pending']}</td>
                  <td>${fundingBadge(v.funding || 'loan')}</td>
                  <td>${fmtDate(v.dateRaised)}</td>
                  <td>${fmtDate(v.dateApproved)}</td>
                  <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(v.notes || '—')}</td>
                  <td class="actions">
                    <button class="btn btn-ghost btn-sm" onclick="openEditVariation(${v.id})">✏️</button>
                    <button class="btn btn-danger-ghost btn-sm" onclick="deleteVariation(${v.id})">🗑</button>
                  </td>
                </tr>`).join('')}
              </tbody>
              <tfoot>
                <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                  <td colspan="2" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Net approved variations</td>
                  <td class="amount" style="padding:11px 16px;font-weight:700;color:${approvedVarTotal >= 0 ? 'var(--danger)' : 'var(--success)'}">${approvedVarTotal > 0 ? '+' : ''}${aud(approvedVarTotal)}</td>
                  <td colspan="6" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">Revised contract: <strong>${aud(revisedTotal)}</strong>${pendingVarTotal > 0 ? ` · <span style="color:#d97706">+${aud(pendingVarTotal)} pending</span>` : ''}</td>
                </tr>
              </tfoot>
            </table>
          </div>`}
    </div>
  `;

  // Extras
  const extras = state.extras;
  const extrasTotalCost = extras.reduce((sum, e) => sum + (e.totalAmount || 0), 0);
  const extrasPaid = extras.reduce((sum, e) => sum + (e.amountPaid || 0), 0);

  html += `
    <div class="section" style="border-left:4px solid ${colors.build.extras}">
      <div class="section-header">
        <div>
          <div class="section-title">Outside Contract</div>
          <div class="section-subtitle">Landscaping, solar, and other extras</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          ${extrasTotalCost > 0 ? `<span class="contract-total-badge">${aud(extrasPaid)} / ${aud(extrasTotalCost)}</span>` : ''}
          <button class="btn btn-primary btn-sm" onclick="openAddExtra()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Vendor</th><th>Total Cost</th><th>Paid</th><th>Remaining</th><th>Due Date</th><th>Status</th><th>Funding</th><th></th></tr></thead>
          <tbody>
            ${extras.length === 0 ? `<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>No items yet. Add landscaping, solar, or other extras.</div></td></tr>` : extras.map(e => {
              const rem = (e.totalAmount || 0) - (e.amountPaid || 0);
              const statusBadge = {
                'not-quoted': `<span class="badge unpaid">Not Quoted</span>`,
                'quoted':     `<span class="badge pending">Quoted</span>`,
                'approved':   `<span class="badge" style="background:#ede9fe;color:#5b21b6">Approved</span>`,
                'partial':    `<span class="badge partial">Partially Paid</span>`,
                'paid':       `<span class="badge paid">Paid</span>`,
              };
              const od = e.dueDate && isOverdue(e.dueDate) && e.status !== 'paid';
              const badge = statusBadge[e.status || 'not-quoted'] + (od ? ` <span class="badge overdue">Overdue</span>` : '');
              return `<tr>
                <td style="font-weight:500">${escHtml(e.name)}</td>
                <td>${e.vendor ? escHtml(e.vendor) : '<span style="color:var(--text-muted)">—</span>'}</td>
                <td class="amount">${e.totalAmount ? aud(e.totalAmount) : '<span class="amount muted">TBC</span>'}</td>
                <td class="amount">${aud(e.amountPaid)}</td>
                <td class="amount ${rem > 0 ? '' : 'muted'}">${rem > 0 ? aud(rem) : '—'}</td>
                <td>${fmtDate(e.dueDate)}</td>
                <td>${badge}</td>
                <td>${fundingBadge(e.funding || 'loan')}</td>
                <td class="actions">
                  ${attachBtn(`extra-${e.id}`, escAttr(e.name))}
                  <button class="btn btn-ghost btn-sm" onclick="openEditExtra(${e.id})">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="deleteExtra(${e.id})">🗑</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // ── Furniture ──────────────────────────────────
  const furn = state.furniture;
  const furnTotal    = furn.reduce((s, f) => s + (f.price || 0), 0);
  const furnPurchased = furn.filter(f => f.status === 'delivered' || f.status === 'ordered');
  const furnToBuy    = furn.filter(f => f.status === 'to-purchase');
  const furnCostDone = furnPurchased.reduce((s, f) => s + (f.price || 0), 0);
  const furnCostLeft = furnToBuy.reduce((s, f) => s + (f.price || 0), 0);

  const FURN_ROOMS = ['Living Room','Dining Room','Kitchen','Master Bedroom','Bedroom 2','Bedroom 3','Study / Office','Bathroom','Laundry','Outdoor / Alfresco','Other'];

  html += `
    <div class="section" style="border-left:4px solid ${colors.build.furniture}">
      <div class="section-header">
        <div>
          <div class="section-title">Furniture</div>
          <div class="section-subtitle">${furn.length} items · ${aud(furnCostDone)} purchased · ${aud(furnCostLeft)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${furn.length > 0 ? `
          <div style="display:flex;gap:6px">
            <span class="badge paid">${furn.filter(f=>f.status==='delivered').length} delivered</span>
            <span class="badge partial">${furn.filter(f=>f.status==='ordered').length} ordered</span>
            <span class="badge unpaid">${furnToBuy.length} to buy</span>
          </div>` : ''}
          <button class="btn btn-primary btn-sm" onclick="openAddFurniture()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${furn.length === 0
              ? `<tr><td colspan="8"><div class="empty"><div class="empty-icon">🛋️</div>No furniture items yet. Add sofas, beds, appliances and more.</div></td></tr>`
              : furn.map(f => {
                  const statusMap = {
                    'to-purchase': `<span class="badge unpaid">To Purchase</span>`,
                    'ordered':     `<span class="badge partial">Ordered</span>`,
                    'delivered':   `<span class="badge paid">Delivered</span>`,
                  };
                  const delivOd = f.deliveryDate && f.status !== 'delivered' && isOverdue(f.deliveryDate);
                  return `<tr>
                    <td style="font-weight:500">${escHtml(f.name)}</td>
                    <td style="color:var(--text-muted)">${escHtml(f.room || '—')}</td>
                    <td>${f.vendor ? escHtml(f.vendor) : '<span style="color:var(--text-muted)">—</span>'}</td>
                    <td class="amount">${f.price ? aud(f.price) : '<span class="amount muted">TBC</span>'}</td>
                    <td>${statusMap[f.status] || statusMap['to-purchase']}</td>
                    <td>${fundingBadge(f.funding || 'own-funds')}</td>
                    <td>${f.deliveryDate ? (delivOd ? `<span class="badge overdue">${fmtDate(f.deliveryDate)}</span>` : fmtDate(f.deliveryDate)) : '<span style="color:var(--text-muted)">—</span>'}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(f.notes || '—')}</td>
                    <td class="actions">
                      ${attachBtn(`furniture-${f.id}`, escAttr(f.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditFurniture(${f.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteFurniture(${f.id})">🗑</button>
                    </td>
                  </tr>`;
                }).join('')}
          </tbody>
          ${furn.length > 0 ? `
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${aud(furnTotal)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${aud(furnCostDone)} purchased · ${aud(furnCostLeft)} still to buy
              </td>
            </tr>
          </tfoot>` : ''}
        </table>
      </div>
    </div>
  `;

  // ── Appliances ──────────────────────────────────
  const appl = state.appliances;
  const applTotal     = appl.reduce((s, a) => s + (a.price || 0), 0);
  const applPurchased = appl.filter(a => a.status === 'delivered' || a.status === 'ordered');
  const applToBuy     = appl.filter(a => a.status === 'to-purchase');
  const applCostDone  = applPurchased.reduce((s, a) => s + (a.price || 0), 0);
  const applCostLeft  = applToBuy.reduce((s, a) => s + (a.price || 0), 0);

  html += `
    <div class="section" style="border-left:4px solid ${colors.build.appliances}">
      <div class="section-header">
        <div>
          <div class="section-title">Appliances</div>
          <div class="section-subtitle">${appl.length} items · ${aud(applCostDone)} purchased · ${aud(applCostLeft)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${appl.length > 0 ? `
          <div style="display:flex;gap:6px">
            <span class="badge paid">${appl.filter(a=>a.status==='delivered').length} delivered</span>
            <span class="badge partial">${appl.filter(a=>a.status==='ordered').length} ordered</span>
            <span class="badge unpaid">${applToBuy.length} to buy</span>
          </div>` : ''}
          <button class="btn btn-primary btn-sm" onclick="openAddAppliance()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${appl.length === 0
              ? `<tr><td colspan="9"><div class="empty"><div class="empty-icon">🍳</div>No appliances yet. Add fridges, dishwashers, ovens and more.</div></td></tr>`
              : appl.map(a => {
                  const statusMap = {
                    'to-purchase': `<span class="badge unpaid">To Purchase</span>`,
                    'ordered':     `<span class="badge partial">Ordered</span>`,
                    'delivered':   `<span class="badge paid">Delivered</span>`,
                  };
                  const delivOd = a.deliveryDate && a.status !== 'delivered' && isOverdue(a.deliveryDate);
                  return `<tr>
                    <td style="font-weight:500">${escHtml(a.name)}</td>
                    <td style="color:var(--text-muted)">${escHtml(a.room || '—')}</td>
                    <td>${a.vendor ? escHtml(a.vendor) : '<span style="color:var(--text-muted)">—</span>'}</td>
                    <td class="amount">${a.price ? aud(a.price) : '<span class="amount muted">TBC</span>'}</td>
                    <td>${statusMap[a.status] || statusMap['to-purchase']}</td>
                    <td>${fundingBadge(a.funding || 'own-funds')}</td>
                    <td>${a.deliveryDate ? (delivOd ? `<span class="badge overdue">${fmtDate(a.deliveryDate)}</span>` : fmtDate(a.deliveryDate)) : '<span style="color:var(--text-muted)">—</span>'}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(a.notes || '—')}</td>
                    <td class="actions">
                      ${attachBtn(`appliance-${a.id}`, escAttr(a.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditAppliance(${a.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteAppliance(${a.id})">🗑</button>
                    </td>
                  </tr>`;
                }).join('')}
          </tbody>
          ${appl.length > 0 ? `
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${aud(applTotal)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${aud(applCostDone)} purchased · ${aud(applCostLeft)} still to buy
              </td>
            </tr>
          </tfoot>` : ''}
        </table>
      </div>
    </div>
  `;

  document.getElementById('build-content').innerHTML = html;
}

// ─────────────────────────────────────────────────
// MONTHLY BUDGET
// ─────────────────────────────────────────────────

// freqToMonthly imported from ./utils.js

// freqLabel, freqDisplay, freqDisplayItem, freqLabelItem, itemMonthly, monthlyTotal
// imported from ./sections/format.js

function expenseCategories() { return state.expenseCategories || DEFAULT_DATA.expenseCategories; }
function incomeCategories()  { return state.incomeCategories  || DEFAULT_DATA.incomeCategories; }

// ─────────────────────────────────────────────────
// GOALS
// ─────────────────────────────────────────────────

const GOAL_TYPES = [
  { value: 'spending',  label: 'Spending Limit',   icon: '📉' },
  { value: 'savings',   label: 'Savings Target',   icon: '🏦' },
  { value: 'income',    label: 'Income Target',    icon: '📈' },
];

function goalProgress(g) {
  if (g.type === 'spending') {
    // Use latest month actual for that category
    const months = Object.keys(state.budget.actuals).sort().reverse();
    let actual = null;
    for (const m of months) {
      const catTotal = (getMonthData(m).expenses || [])
        .filter(e => (e.category || 'Other') === g.category)
        .reduce((s, e) => s + (state.budget.actuals[m]?.[e.id] || 0), 0);
      if (catTotal > 0) { actual = catTotal; break; }
    }
    const target = g.targetMonthly || 0;
    if (actual === null) return { pct: null, label: 'No actuals yet', actual: null, target };
    const pct = target > 0 ? Math.max(0, Math.min(100, (actual / target) * 100)) : 0;
    const ok = actual <= target;
    return { pct, label: `${aud(actual)} actual vs ${aud(target)} limit`, actual, target, ok };
  }
  if (g.type === 'savings') {
    const cur = g.currentSaved || 0;
    const tgt = g.targetTotal || 1;
    const pct = Math.min(100, (cur / tgt) * 100);
    return { pct, label: `${aud(cur)} of ${aud(tgt)} saved`, ok: cur >= tgt };
  }
  if (g.type === 'income') {
    const cur = monthlyTotal(getMonthData(selectedBudgetMonth).income);
    const tgt = g.targetMonthly || 1;
    const pct = Math.min(100, (cur / tgt) * 100);
    return { pct, label: `${aud(cur)}/mo of ${aud(tgt)}/mo target`, ok: cur >= tgt };
  }
  return { pct: 0, label: '', ok: false };
}

function renderGoals() {
  const goals = state.goals;
  const active = goals.filter(g => g.status === 'active');
  const achieved = goals.filter(g => g.status === 'achieved');

  let html = '';

  if (goals.length > 0) {
    html += `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:24px">
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700;color:var(--primary)">${active.length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Active goals</div>
        </div>
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700;color:var(--success)">${achieved.length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Achieved</div>
        </div>
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700">${goals.filter(g=>g.type==='spending'&&g.status==='active').length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Spending limits</div>
        </div>
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700">${goals.filter(g=>g.type==='savings'&&g.status==='active').length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Savings targets</div>
        </div>
      </div>`;
  }

  // Group: active first, then achieved, then abandoned
  const grouped = [
    ...goals.filter(g => g.status === 'active'),
    ...goals.filter(g => g.status === 'achieved'),
    ...goals.filter(g => g.status === 'abandoned'),
  ];

  html += `<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary" onclick="openAddGoal()">+ New Goal</button>
  </div>`;

  if (grouped.length === 0) {
    const curData = getMonthData(selectedBudgetMonth);
    const surplus = monthlyTotal(curData.income) - monthlyTotal(curData.expenses);
    const surplusHtml = surplus > 0
      ? `<div style="font-size:14px;color:#64748b;margin-bottom:4px">You have <strong style="color:#16a34a">${aud(surplus)}</strong> surplus each month.</div>
         <div style="font-size:13px;color:#64748b;margin-bottom:20px">Put it to work — set a goal and watch your progress.</div>`
      : `<div style="font-size:13px;color:#64748b;margin-bottom:20px">Set a goal and start working towards it.</div>`;
    const quickGoals = [
      { emoji:'🏖️', label:'Holiday fund' },
      { emoji:'🏠', label:'Renovation' },
      { emoji:'🆘', label:'Emergency fund' },
    ];
    const chips = quickGoals.map(g =>
      `<button onclick="openAddGoal()" style="padding:8px 14px;background:#ecfeff;border:1.5px solid #0891b2;border-radius:99px;font-size:12px;font-weight:600;color:#0891b2;cursor:pointer">${g.emoji} ${g.label}</button>`
    ).join('');
    html += `
      <div style="background:#fff;border:2px dashed #cbd5e1;border-radius:16px;padding:36px 24px;text-align:center;margin-top:8px">
        <div style="font-size:44px;margin-bottom:14px">🎯</div>
        <div style="font-size:17px;font-weight:700;color:#1e293b;margin-bottom:8px">No goals yet</div>
        ${surplusHtml}
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px">
          ${chips}
          <button onclick="openAddGoal()" style="padding:8px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:99px;font-size:12px;color:#64748b;cursor:pointer">+ Custom goal</button>
        </div>
        <button onclick="openAddGoal()" style="background:#0891b2;color:#fff;border:none;border-radius:10px;padding:12px 28px;font-size:14px;font-weight:600;cursor:pointer">Add my first goal →</button>
      </div>`;
  } else {
    grouped.forEach(g => {
      const typeInfo = GOAL_TYPES.find(t => t.value === g.type) || GOAL_TYPES[0];
      const prog = goalProgress(g);
      const statusBadge = {
        active:    `<span class="badge" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe">Active</span>`,
        achieved:  `<span class="badge paid">Achieved</span>`,
        abandoned: `<span class="badge" style="background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0">Abandoned</span>`,
      }[g.status] || '';

      const deadline = g.deadline ? (() => {
        const [y,m,d] = g.deadline.split('-');
        const daysLeft = Math.ceil((new Date(g.deadline) - new Date()) / 86400000);
        const label = `${d}/${m}/${y}`;
        if (daysLeft < 0) return `<span style="color:var(--danger)">${label} (overdue)</span>`;
        if (daysLeft <= 30) return `<span style="color:var(--warning,#f59e0b)">${label} (${daysLeft}d left)</span>`;
        return label;
      })() : '—';

      let progressHtml = '';
      if (prog.pct !== null) {
        const fillColor = g.type === 'spending'
          ? (prog.ok ? 'var(--success)' : 'var(--danger)')
          : 'var(--primary)';
        const pctDisplay = g.type === 'spending'
          ? (prog.ok ? `✓ Under limit` : `${Math.round(prog.pct)}% of limit`)
          : `${Math.round(prog.pct)}%`;
        progressHtml = `
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${Math.min(100,prog.pct)}%;background:${fillColor}"></div>
          </div>
          <div class="progress-label">
            <span>${prog.label}</span>
            <span style="font-weight:600;color:${fillColor}">${pctDisplay}</span>
          </div>`;
      } else {
        progressHtml = `<div style="font-size:12px;color:var(--text-muted);margin-top:8px">No actuals recorded yet</div>`;
      }

      html += `
        <div class="goal-card" style="opacity:${g.status==='abandoned'?'0.6':'1'}">
          <div class="goal-card-header">
            <div>
              <div class="goal-card-title">${typeInfo.icon} ${escHtml(g.name)}</div>
              <div class="goal-card-meta">
                ${typeInfo.label}${g.category ? ` · ${g.category}` : ''} · Target date: ${deadline}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
              ${statusBadge}
              ${g.status === 'active' ? `<button class="btn btn-ghost btn-sm" title="Mark achieved" onclick="markGoalAchieved(${g.id})">✓</button>` : ''}
              <button class="btn btn-ghost btn-sm" onclick="openEditGoal(${g.id})">✏️</button>
              <button class="btn btn-danger-ghost btn-sm" onclick="deleteGoal(${g.id})">🗑</button>
            </div>
          </div>
          ${progressHtml}
          ${g.notes ? `<div style="font-size:12px;color:var(--text-muted);margin-top:8px">${escHtml(g.notes)}</div>` : ''}
        </div>`;
    });
  }

  document.getElementById('goals-content').innerHTML = html;
}

function goalForm(g = {}) {
  const type = g.type || 'spending';
  return `
    <div class="form-group">
      <label class="form-label">Goal Name</label>
      <input class="form-input" id="f-goal-name" type="text" maxlength="200" value="${escAttr(g.name || '')}" placeholder="e.g. Cut dining out">
    </div>
    <div class="form-group">
      <label class="form-label">Type</label>
      <select class="form-select" id="f-goal-type" onchange="toggleGoalFields()">
        ${GOAL_TYPES.map(t => `<option value="${t.value}" ${type===t.value?'selected':''}>${t.icon} ${t.label}</option>`).join('')}
      </select>
    </div>
    <div id="goal-spending-fields" style="display:${type==='spending'?'':'none'}">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Expense Category</label>
          <select class="form-select" id="f-goal-category">
            ${expenseCategories().map(c => `<option value="${c}" ${g.category===c?'selected':''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Monthly Limit (AUD)</label>
          <input class="form-input" id="f-goal-target-monthly" type="number" max="99999999" min="0" value="${g.targetMonthly||''}" placeholder="e.g. 300">
        </div>
      </div>
    </div>
    <div id="goal-savings-fields" style="display:${type==='savings'?'':'none'}">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Target Amount (AUD)</label>
          <input class="form-input" id="f-goal-target-total" type="number" max="99999999" min="0" value="${g.targetTotal||''}" placeholder="e.g. 50000">
        </div>
        <div class="form-group">
          <label class="form-label">Currently Saved (AUD)</label>
          <input class="form-input" id="f-goal-current-saved" type="number" max="99999999" min="0" value="${g.currentSaved||''}" placeholder="0">
        </div>
      </div>
    </div>
    <div id="goal-income-fields" style="display:${type==='income'?'':'none'}">
      <div class="form-group">
        <label class="form-label">Target Monthly Income (AUD)</label>
        <input class="form-input" id="f-goal-target-monthly-inc" type="number" max="99999999" min="0" value="${g.targetMonthly||''}" placeholder="e.g. 8000">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Target Date</label>
        <input class="form-input" id="f-goal-deadline" type="date" value="${g.deadline||''}">
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-goal-status">
          <option value="active"    ${(g.status||'active')==='active'?'selected':''}>Active</option>
          <option value="achieved"  ${g.status==='achieved'?'selected':''}>Achieved</option>
          <option value="abandoned" ${g.status==='abandoned'?'selected':''}>Abandoned</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-goal-notes" type="text" maxlength="200" value="${escAttr(g.notes||'')}" placeholder="Optional notes">
    </div>
  `;
}

function toggleGoalFields() {
  const type = document.getElementById('f-goal-type').value;
  document.getElementById('goal-spending-fields').style.display = type === 'spending' ? '' : 'none';
  document.getElementById('goal-savings-fields').style.display  = type === 'savings'  ? '' : 'none';
  document.getElementById('goal-income-fields').style.display   = type === 'income'   ? '' : 'none';
}

function goalFromForm(id) {
  const type = document.getElementById('f-goal-type').value;
  const obj = {
    id,
    name:     document.getElementById('f-goal-name').value.trim(),
    type,
    status:   document.getElementById('f-goal-status').value,
    deadline: document.getElementById('f-goal-deadline').value || null,
    notes:    document.getElementById('f-goal-notes').value.trim(),
  };
  if (type === 'spending') {
    obj.category      = document.getElementById('f-goal-category').value;
    obj.targetMonthly = parseFloat(document.getElementById('f-goal-target-monthly').value) || 0;
  }
  if (type === 'savings') {
    obj.targetTotal    = parseFloat(document.getElementById('f-goal-target-total').value) || 0;
    obj.currentSaved   = parseFloat(document.getElementById('f-goal-current-saved').value) || 0;
  }
  if (type === 'income') {
    obj.targetMonthly = parseFloat(document.getElementById('f-goal-target-monthly-inc').value) || 0;
  }
  return obj;
}

function openAddGoal() {
  openModal('New Goal', goalForm(), () => {
    const g = goalFromForm(nextId(state.goals));
    if (!g.name) return;
    state.goals.push(g);
    saveData(state); closeModal(); renderGoals();
  });
}

function openEditGoal(id) {
  const g = state.goals.find(x => x.id === id);
  openModal('Edit Goal', goalForm(g), () => {
    Object.assign(g, goalFromForm(id));
    saveData(state); closeModal(); renderGoals();
  });
}

function deleteGoal(id) {
  if (!confirm('Delete this goal?')) return;
  state.goals = state.goals.filter(g => g.id !== id);
  saveData(state); renderGoals();
}

function markGoalAchieved(id) {
  const g = state.goals.find(x => x.id === id);
  if (g) { g.status = 'achieved'; saveData(state); renderGoals(); }
}

// ─────────────────────────────────────────────────
// SCENARIOS
// ─────────────────────────────────────────────────

let openScenarioId = null;

const ADJ_TYPES = [
  { value: 'add-income',     label: 'Add income source',      icon: '💰' },
  { value: 'remove-income',  label: 'Remove income source',   icon: '➖' },
  { value: 'reduce-income',  label: 'Reduce income amount',   icon: '📉' },
  { value: 'add-expense',    label: 'Add new expense',        icon: '➕' },
  { value: 'remove-expense', label: 'Remove expense',         icon: '✂️' },
  { value: 'reduce-expense', label: 'Reduce expense amount',  icon: '📉' },
];

function calcScenario(scenario) {
  const base = getMonthData(selectedBudgetMonth);
  let income   = JSON.parse(JSON.stringify(base.income));
  let expenses = JSON.parse(JSON.stringify(base.expenses));

  (scenario.adjustments || []).forEach(adj => {
    if (adj.type === 'add-income') {
      income.push({ id: -(adj.id||0), name: adj.name, amount: adj.amount||0, frequency: adj.frequency||'monthly' });
    } else if (adj.type === 'remove-income') {
      income = income.filter(i => i.id !== adj.itemId);
    } else if (adj.type === 'reduce-income') {
      const i = income.find(x => x.id === adj.itemId);
      if (i) i.amount = adj.changeType === 'percent'
        ? Math.max(0, i.amount * (1 - adj.changeAmount/100))
        : Math.max(0, i.amount - (adj.changeAmount||0));
    } else if (adj.type === 'add-expense') {
      expenses.push({ id: -(adj.id||0), name: adj.name, amount: adj.amount||0, frequency: adj.frequency||'monthly', category: adj.category||'Other' });
    } else if (adj.type === 'remove-expense') {
      expenses = expenses.filter(e => e.id !== adj.itemId);
    } else if (adj.type === 'reduce-expense') {
      const e = expenses.find(x => x.id === adj.itemId);
      if (e) e.amount = adj.changeType === 'percent'
        ? Math.max(0, e.amount * (1 - adj.changeAmount/100))
        : Math.max(0, e.amount - (adj.changeAmount||0));
    }
  });

  return {
    income, expenses,
    totalIncome:   monthlyTotal(income),
    totalExpenses: monthlyTotal(expenses),
    surplus: monthlyTotal(income) - monthlyTotal(expenses),
  };
}

function renderScenarios() {
  const scenarios = state.scenarios;
  const base = getMonthData(selectedBudgetMonth);
  const baseTotalIncome   = monthlyTotal(base.income);
  const baseTotalExpenses = monthlyTotal(base.expenses);
  const baseSurplus       = baseTotalIncome - baseTotalExpenses;

  let html = `<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary" onclick="openAddScenario()">+ New Scenario</button>
  </div>`;

  if (scenarios.length === 0) {
    html += `<div class="empty"><div class="empty-icon">🔬</div>No scenarios yet. Create one to model income changes, expense cuts, or lifestyle adjustments.</div>`;
  } else {
    scenarios.forEach(sc => {
      const result = calcScenario(sc);
      const incomeDiff   = result.totalIncome   - baseTotalIncome;
      const expenseDiff  = result.totalExpenses - baseTotalExpenses;
      const surplusDiff  = result.surplus       - baseSurplus;
      const isOpen = openScenarioId === sc.id;

      const diffBadge = (val, invertColors) => {
        if (val === 0) return `<span style="color:var(--text-muted)">no change</span>`;
        const pos = invertColors ? val < 0 : val > 0;
        const color = pos ? 'var(--success)' : 'var(--danger)';
        return `<span style="color:${color};font-weight:600">${val > 0 ? '+' : ''}${aud(val)}/mo</span>`;
      };

      html += `
        <div class="scenario-card">
          <div class="scenario-card-header" onclick="toggleScenario(${sc.id})">
            <div style="flex:1">
              <div style="font-weight:600;font-size:14px">${escHtml(sc.name)}</div>
              ${sc.description ? `<div style="font-size:12px;color:var(--text-muted);margin-top:2px">${escHtml(sc.description)}</div>` : ''}
            </div>
            <div style="display:flex;align-items:center;gap:12px;flex-shrink:0">
              <div style="text-align:right">
                <div style="font-size:11px;color:var(--text-muted)">Surplus impact</div>
                <div style="font-size:14px;font-weight:700;color:${surplusDiff>=0?'var(--success)':'var(--danger)'}">${surplusDiff>=0?'+':''}${aud(surplusDiff)}/mo</div>
              </div>
              <div style="display:flex;gap:4px">
                <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openEditScenario(${sc.id})">✏️</button>
                <button class="btn btn-danger-ghost btn-sm" onclick="event.stopPropagation();deleteScenario(${sc.id})">🗑</button>
              </div>
              <span style="color:var(--text-muted);font-size:18px">${isOpen ? '▲' : '▼'}</span>
            </div>
          </div>
          <div class="scenario-card-body${isOpen?' open':''}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <div style="font-size:13px;font-weight:600">Adjustments (${(sc.adjustments||[]).length})</div>
              <button class="btn btn-primary btn-sm" onclick="openAddAdjustment(${sc.id})">+ Adjustment</button>
            </div>
            <div class="adj-list">
              ${(sc.adjustments||[]).length === 0
                ? `<div style="font-size:13px;color:var(--text-muted);padding:8px 0">No adjustments yet. Add income or expense changes.</div>`
                : (sc.adjustments||[]).map(adj => {
                    const at = ADJ_TYPES.find(t => t.value === adj.type) || ADJ_TYPES[0];
                    let detail = '';
                    if (adj.type === 'add-income' || adj.type === 'add-expense') {
                      detail = `${escHtml(adj.name)} · ${aud(adj.amount||0)}/${adj.frequency||'mo'}${adj.category?' · '+adj.category:''}`;
                    } else if (adj.type === 'remove-income' || adj.type === 'remove-expense') {
                      detail = escHtml(adj.itemName || '—');
                    } else if (adj.type === 'reduce-income' || adj.type === 'reduce-expense') {
                      detail = `${escHtml(adj.itemName)} · reduce by ${adj.changeType==='percent'?adj.changeAmount+'%':aud(adj.changeAmount||0)}`;
                    }
                    return `<div class="adj-item">
                      <span class="adj-icon">${at.icon}</span>
                      <div style="flex:1">
                        <span style="font-weight:500">${at.label}</span>
                        <span style="color:var(--text-muted);margin-left:6px">${detail}</span>
                      </div>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteAdjustment(${sc.id},${adj.id})">🗑</button>
                    </div>`;
                  }).join('')
              }
            </div>
            <div class="scenario-compare">
              <div class="compare-col">
                <div class="compare-col-title">Current Budget</div>
                <div class="compare-row"><span>Monthly Income</span><span class="amount" style="color:var(--success)">${aud(baseTotalIncome)}</span></div>
                <div class="compare-row"><span>Monthly Expenses</span><span class="amount" style="color:var(--danger)">${aud(baseTotalExpenses)}</span></div>
                <div class="compare-row"><span>Monthly Surplus</span><span class="amount" style="color:${baseSurplus>=0?'var(--success)':'var(--danger)'}">${aud(baseSurplus)}</span></div>
                <div class="compare-row"><span style="color:var(--text-muted);font-size:12px">Annual surplus</span><span style="color:var(--text-muted);font-size:12px">${aud(baseSurplus*12)}</span></div>
              </div>
              <div class="compare-col" style="border:2px solid var(--primary)">
                <div class="compare-col-title" style="color:var(--primary)">Scenario: ${escHtml(sc.name)}</div>
                <div class="compare-row">
                  <span>Monthly Income</span>
                  <span class="amount" style="color:var(--success)">${aud(result.totalIncome)} ${incomeDiff!==0?`<small style="color:${incomeDiff>0?'var(--success)':'var(--danger)'}">(${incomeDiff>0?'+':''}${aud(incomeDiff)})</small>`:''}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Expenses</span>
                  <span class="amount" style="color:var(--danger)">${aud(result.totalExpenses)} ${expenseDiff!==0?`<small style="color:${expenseDiff<0?'var(--success)':'var(--danger)'}">(${expenseDiff>0?'+':''}${aud(expenseDiff)})</small>`:''}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Surplus</span>
                  <span class="amount" style="color:${result.surplus>=0?'var(--success)':'var(--danger)'};font-weight:700">${aud(result.surplus)}</span>
                </div>
                <div class="compare-row">
                  <span style="font-size:12px">Annual surplus</span>
                  <span style="font-size:12px;font-weight:600;color:${result.surplus>=0?'var(--success)':'var(--danger)'}">${aud(result.surplus*12)} ${surplusDiff!==0?`<small>(${surplusDiff>0?'+':''}${aud(surplusDiff*12)}/yr)</small>`:''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    });
  }

  document.getElementById('scenarios-content').innerHTML = html;
}

function toggleScenario(id) {
  openScenarioId = openScenarioId === id ? null : id;
  renderScenarios();
}

function scenarioForm(sc = {}) {
  return `
    <div class="form-group">
      <label class="form-label">Scenario Name</label>
      <input class="form-input" id="f-sc-name" type="text" maxlength="200" value="${escAttr(sc.name||'')}" placeholder="e.g. Pick up second job">
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input class="form-input" id="f-sc-desc" type="text" maxlength="200" value="${escAttr(sc.description||'')}" placeholder="Brief description of what you're testing">
    </div>
  `;
}

function scenarioFromForm(id, existing = {}) {
  return {
    id,
    name:        document.getElementById('f-sc-name').value.trim(),
    description: document.getElementById('f-sc-desc').value.trim(),
    adjustments: existing.adjustments || [],
  };
}

function openAddScenario() {
  openModal('New Scenario', scenarioForm(), () => {
    const sc = scenarioFromForm(nextId(state.scenarios));
    if (!sc.name) return;
    state.scenarios.push(sc);
    saveData(state); closeModal(); renderScenarios();
  });
}

function openEditScenario(id) {
  const sc = state.scenarios.find(x => x.id === id);
  openModal('Edit Scenario', scenarioForm(sc), () => {
    const updated = scenarioFromForm(id, sc);
    Object.assign(sc, updated);
    saveData(state); closeModal(); renderScenarios();
  });
}

function deleteScenario(id) {
  if (!confirm('Delete this scenario?')) return;
  state.scenarios = state.scenarios.filter(s => s.id !== id);
  if (openScenarioId === id) openScenarioId = null;
  saveData(state); renderScenarios();
}

function adjForm(sc) {
  const base = getMonthData(selectedBudgetMonth);
  const incomeOpts = base.income.map(i => `<option value="${i.id}">${escHtml(i.name)} (${aud(itemMonthly(i))}/mo)</option>`).join('');
  const expenseOpts = base.expenses.map(e => `<option value="${e.id}">${escHtml(e.name)} (${aud(itemMonthly(e))}/mo)</option>`).join('');
  return `
    <div class="form-group">
      <label class="form-label">Adjustment Type</label>
      <select class="form-select" id="f-adj-type" onchange="toggleAdjFields()">
        ${ADJ_TYPES.map(t => `<option value="${t.value}">${t.icon} ${t.label}</option>`).join('')}
      </select>
    </div>
    <div id="adj-add-income" style="display:block">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Description</label>
          <input class="form-input" id="f-adj-name" type="text" maxlength="200" placeholder="e.g. Weekend job">
        </div>
        <div class="form-group">
          <label class="form-label">Amount (AUD)</label>
          <input class="form-input" id="f-adj-amount" type="number" max="99999999" min="0" placeholder="e.g. 800">
        </div>
      </div>
      <div class="form-row" id="adj-add-income-extra">
        <div class="form-group">
          <label class="form-label">Frequency</label>
          <select class="form-select" id="f-adj-freq">
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="monthly" selected>Monthly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
        <div class="form-group" id="adj-cat-wrap" style="display:none">
          <label class="form-label">Category</label>
          <select class="form-select" id="f-adj-cat">
            ${expenseCategories().map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
    <div id="adj-remove-income" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Income to Remove</label>
        <select class="form-select" id="f-adj-inc-sel">${incomeOpts || '<option value="">No income sources</option>'}</select>
      </div>
    </div>
    <div id="adj-reduce-income" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Income to Reduce</label>
        <select class="form-select" id="f-adj-inc-reduce-sel">${incomeOpts || '<option value="">No income sources</option>'}</select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Reduce by</label>
          <input class="form-input" id="f-adj-change-amount" type="number" max="99999999" min="0" placeholder="Amount">
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="form-select" id="f-adj-change-type-inc">
            <option value="flat">$ flat amount</option>
            <option value="percent">% percentage</option>
          </select>
        </div>
      </div>
    </div>
    <div id="adj-remove-expense" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Expense to Remove</label>
        <select class="form-select" id="f-adj-exp-sel">${expenseOpts || '<option value="">No expenses</option>'}</select>
      </div>
    </div>
    <div id="adj-reduce-expense" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Expense to Reduce</label>
        <select class="form-select" id="f-adj-exp-reduce-sel">${expenseOpts || '<option value="">No expenses</option>'}</select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Reduce by</label>
          <input class="form-input" id="f-adj-change-amount-exp" type="number" max="99999999" min="0" placeholder="Amount">
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="form-select" id="f-adj-change-type-exp">
            <option value="flat">$ flat amount</option>
            <option value="percent">% percentage</option>
          </select>
        </div>
      </div>
    </div>
  `;
}

function toggleAdjFields() {
  const type = document.getElementById('f-adj-type').value;
  document.getElementById('adj-add-income').style.display     = (type === 'add-income' || type === 'add-expense') ? '' : 'none';
  document.getElementById('adj-add-income-extra').style.display = (type === 'add-income' || type === 'add-expense') ? '' : 'none';
  document.getElementById('adj-cat-wrap').style.display       = type === 'add-expense' ? '' : 'none';
  document.getElementById('adj-remove-income').style.display  = type === 'remove-income'  ? '' : 'none';
  document.getElementById('adj-reduce-income').style.display  = type === 'reduce-income'  ? '' : 'none';
  document.getElementById('adj-remove-expense').style.display = type === 'remove-expense' ? '' : 'none';
  document.getElementById('adj-reduce-expense').style.display = type === 'reduce-expense' ? '' : 'none';
}

function openAddAdjustment(scenarioId) {
  const sc = state.scenarios.find(x => x.id === scenarioId);
  if (!sc) return;
  openModal('Add Adjustment', adjForm(sc), () => {
    const type = document.getElementById('f-adj-type').value;
    const base = getMonthData(selectedBudgetMonth);
    const adj = { id: nextId(sc.adjustments || []), type };
    if (type === 'add-income') {
      adj.name = document.getElementById('f-adj-name').value.trim();
      adj.amount = parseFloat(document.getElementById('f-adj-amount').value) || 0;
      adj.frequency = document.getElementById('f-adj-freq').value;
      if (!adj.name) return;
    } else if (type === 'add-expense') {
      adj.name = document.getElementById('f-adj-name').value.trim();
      adj.amount = parseFloat(document.getElementById('f-adj-amount').value) || 0;
      adj.frequency = document.getElementById('f-adj-freq').value;
      adj.category = document.getElementById('f-adj-cat').value;
      if (!adj.name) return;
    } else if (type === 'remove-income') {
      const sel = document.getElementById('f-adj-inc-sel');
      adj.itemId = parseInt(sel.value);
      adj.itemName = sel.options[sel.selectedIndex]?.text || '';
    } else if (type === 'reduce-income') {
      const sel = document.getElementById('f-adj-inc-reduce-sel');
      adj.itemId = parseInt(sel.value);
      adj.itemName = base.income.find(i => i.id === adj.itemId)?.name || '';
      adj.changeAmount = parseFloat(document.getElementById('f-adj-change-amount').value) || 0;
      adj.changeType = document.getElementById('f-adj-change-type-inc').value;
    } else if (type === 'remove-expense') {
      const sel = document.getElementById('f-adj-exp-sel');
      adj.itemId = parseInt(sel.value);
      adj.itemName = sel.options[sel.selectedIndex]?.text || '';
    } else if (type === 'reduce-expense') {
      const sel = document.getElementById('f-adj-exp-reduce-sel');
      adj.itemId = parseInt(sel.value);
      adj.itemName = base.expenses.find(e => e.id === adj.itemId)?.name || '';
      adj.changeAmount = parseFloat(document.getElementById('f-adj-change-amount-exp').value) || 0;
      adj.changeType = document.getElementById('f-adj-change-type-exp').value;
    }
    if (!sc.adjustments) sc.adjustments = [];
    sc.adjustments.push(adj);
    saveData(state); closeModal(); renderScenarios();
  });
}

function deleteAdjustment(scenarioId, adjId) {
  const sc = state.scenarios.find(x => x.id === scenarioId);
  if (!sc) return;
  sc.adjustments = (sc.adjustments || []).filter(a => a.id !== adjId);
  saveData(state); renderScenarios();
}

// ─────────────────────────────────────────────────
// COLOUR SETTINGS
// ─────────────────────────────────────────────────

const COLORS_KEY = 'home_finance_colors_v1';

const DEFAULT_COLORS = {
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

function loadColors() {
  try {
    const raw = localStorage.getItem(COLORS_KEY);
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

function saveColors(c) { localStorage.setItem(COLORS_KEY, JSON.stringify(c)); }

let colors = loadColors();

function updateColor(type, key, value) {
  if (type === 'expense') colors.expense[key] = value;
  else if (type === 'income') colors.income = value;
  else if (type === 'build') colors.build[key] = value;
  saveColors(colors);
  renderBudget();
  renderBuild();
  renderDashboard();
}

function profileAdults()   { return (state.householdProfile.members||[]).filter(m=>m.role==='adult').length  || 1; }
function profileChildren() { return (state.householdProfile.members||[]).filter(m=>m.role==='child').length; }

function addHouseholdMember(role) {
  state.householdProfile.members.push({ role: role||'adult', age: null });
  _markSettingsDirty(); renderSettings();
}
function removeHouseholdMember(idx) {
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
      if (String(getDeviceProfile()) === String(kid.id)) setDeviceProfile('adult');
    }
  }
  state.householdProfile.members.splice(idx, 1);
  saveData(state); renderAll();
}
function updateMember(idx, field, value) {
  const m = state.householdProfile.members[idx];
  if (!m) return;
  m[field] = value;
  _markSettingsDirty();
  if (field === 'role' || field === 'name') renderSettings();
}
function addPet(type) {
  state.householdProfile.pets.push({ type: type||'dog', name: '' });
  _markSettingsDirty(); renderSettings();
}
function removePet(idx) {
  state.householdProfile.pets.splice(idx, 1);
  _markSettingsDirty(); renderSettings();
}
function updatePet(idx, field, value) {
  const p = state.householdProfile.pets[idx];
  if (!p) return;
  p[field] = value;
  _markSettingsDirty();
}
function updateCars(n) {
  state.householdProfile.cars = n;
  _markSettingsDirty();
}

// ─────────────────────────────────────────────────
// INSIGHTS
// ─────────────────────────────────────────────────

function getBenchmarks(monthlyIncome, adults, children) {
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

function getBenchmarkStatus(actual, min, max) {
  if (actual < min * 0.9) return 'under';
  if (actual > max * 1.1) return 'over';
  return 'within';
}

const INSIGHTS_KEY = 'home_finance_ai_key';

function getAIKey() { return localStorage.getItem(INSIGHTS_KEY) || ''; }
function saveAIKey(k) { localStorage.setItem(INSIGHTS_KEY, k); }

// ─── Spending pattern engine ──────────────────────

function getCategoryHistoryData() {
  const months = getLast6Months();
  const catData = {};
  months.forEach(mo => {
    const md = getMonthData(mo);
    const budByCat = {}, actByCat = {};
    md.expenses.forEach(e => {
      const cat = e.category || 'Other';
      budByCat[cat] = (budByCat[cat] || 0) + itemMonthly(e);
      const actual = getActual(e.id, mo);
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

function detectSpendingPatterns(catData) {
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

function renderCategoryBreakdown() {
  const md = getMonthData(selectedBudgetMonth);
  if (md.expenses.length === 0) return '';
  const byCat = {};
  md.expenses.forEach(e => {
    const cat = e.category || 'Other';
    if (!byCat[cat]) byCat[cat] = { budget:0, actual:0 };
    byCat[cat].budget += itemMonthly(e);
    byCat[cat].actual += getActual(e.id, selectedBudgetMonth);
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
      <span style="font-size:13px;font-weight:700">Budget vs Actual — ${monthLabel(selectedBudgetMonth)}</span>
      <div style="display:flex;gap:14px;font-size:11px;color:var(--text-muted)">
        <span><span class="spi-legend spi-legend-budget"></span>Budget</span>
        <span><span class="spi-legend spi-legend-actual"></span>Actual</span>
      </div>
    </div>
    ${rows}
  </div>`;
}

function renderSpendingPatterns() {
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

function generateSmartInsights() {
  const md           = getMonthData(selectedBudgetMonth);
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

  const last6    = getLast6Months();
  const avg6Exp  = last6.reduce((s, mo) => s + monthlyTotal(getMonthData(mo).expenses), 0) / 6;
  const avg6Inc  = last6.reduce((s, mo) => s + monthlyTotal(getMonthData(mo).income),   0) / 6;

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

const PROXY_URL = 'https://home-finance-proxy.fuscocl.workers.dev';

async function runAIInsights() {
  const btn = document.getElementById('ai-run-btn');
  btn.disabled = true;
  btn.textContent = 'Analysing…';

  const md           = getMonthData(selectedBudgetMonth);
  const totalIncome  = monthlyTotal(md.income);
  const totalExpenses= monthlyTotal(md.expenses);
  const surplus      = totalIncome - totalExpenses;
  const savingsRate  = totalIncome > 0 ? Math.round(surplus / totalIncome * 100) : 0;

  const byCategory = {};
  md.expenses.forEach(e => {
    byCategory[e.category || 'Other'] = (byCategory[e.category || 'Other'] || 0) + itemMonthly(e);
  });

  const last6 = getLast6Months().map(mo => {
    const m = getMonthData(mo);
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
    month: monthLabel(selectedBudgetMonth),
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

function renderInsightCards(insights, isAI) {
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
      ${isAI ? `<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-muted);margin-bottom:4px"><span>✨</span> Generated by Claude AI · ${monthLabel(selectedBudgetMonth)}</div>` : ''}
      ${html}
    </div>`;
}

function renderBenchmarksSection(income, adults, children, byCategory) {
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

function renderInsights() {
  const aiKey   = getAIKey();
  const smart   = generateSmartInsights();
  const md      = getMonthData(selectedBudgetMonth);
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
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${monthLabel(selectedBudgetMonth)}</span>
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

function generateSmartInsightsHTML(insights) {
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

function prevInsightsMonth() {
  const [y, m] = selectedBudgetMonth.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  selectedBudgetMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  safeRender(renderInsights);
  safeRender(renderMoneyDashboard);
  safeRender(renderBudget);
}

function nextInsightsMonth() {
  const [y, m] = selectedBudgetMonth.split('-').map(Number);
  const d = new Date(y, m, 1);
  selectedBudgetMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  safeRender(renderInsights);
  safeRender(renderMoneyDashboard);
  safeRender(renderBudget);
}

// ─── Category Group management ────────────────────

const GROUP_ICONS = [
  '🏠','🏡','🏗️','🔑','💡','🔌','🚿','🛋️','🛏️','🪴',
  '🍽️','🍕','🍔','🛒','🥗','🍷','☕','🍰','🥩','🧃',
  '🚗','🚙','🚌','✈️','⛽','🚕','🏎️','🚲','🛵','🚂',
  '👨‍👩‍👧','👶','📚','🏫','💊','🏥','💅','💆','🧴','👕',
  '🎮','🎬','🎵','🏋️','📺','🎲','🏄','🎯','🎨','🎭',
  '💰','💳','🏦','📈','💸','🪙','💎','📊','🏆','💼',
  '📦','🛍️','🎁','🔧','🛠️','📱','💻','🧹','🧺','🖨️',
  '🐕','🐈','🐠','🌱','☀️','❄️','🎄','🎂','⚽','🧸',
];

function openEmojiPickerModal(currentIcon, onSelect) {
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

function openAddCategoryGroup() {
  openModal('Add Category Group', `
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
    logActivity('Added category group', name);
    saveData(state); closeModal(); renderSettings();
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

function openIconPickerForGroup(groupId) {
  const g = state.categoryGroups.find(x => x.id === groupId);
  if (!g) return;
  openEmojiPickerModal(g.icon, emoji => {
    updateCategoryGroup(groupId, 'icon', emoji);
    const btn = document.getElementById(`grp-icon-btn-${groupId}`);
    if (btn) btn.textContent = emoji;
  });
}

function deleteCategoryGroup(id) {
  const g = state.categoryGroups.find(x => x.id === id);
  if (!confirm(`Delete group "${g ? g.name : ''}"? Categories will become unassigned.`)) return;
  state.categoryGroups = state.categoryGroups.filter(x => x.id !== id);
  logActivity('Deleted category group', g ? g.name : '');
  saveData(state); renderSettings();
}

function updateCategoryGroup(id, field, value) {
  const g = state.categoryGroups.find(x => x.id === id);
  if (!g) return;
  g[field] = value;
  saveData(state);
}

function addCatToGroup(groupId, cat) {
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
  saveData(state); renderSettings();
}

function openAddCatToGroup(groupId) {
  const allCats = expenseCategories();
  const assignedElsewhere = new Set((state.categoryGroups||[]).filter(x=>x.id!==groupId).flatMap(x=>x.categories));
  const grp = state.categoryGroups.find(x => x.id === groupId);
  const alreadyIn = new Set(grp ? grp.categories : []);
  const available = allCats.filter(c => !alreadyIn.has(c) && !assignedElsewhere.has(c));

  openModal('Add Category to Group', `
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
    closeModal();
  });
}

function removeCatFromGroup(groupId, cat) {
  const g = state.categoryGroups.find(x => x.id === groupId);
  if (!g) return;
  g.categories = g.categories.filter(c => c !== cat);
  saveData(state); renderSettings();
}

// ─────────────────────────────────────────────────

let _settingsDirty = false;
let _settingsSnapshot = null;

function _markSettingsDirty() {
  if (!_settingsDirty) {
    // Take snapshot on first change so we can revert
    _settingsSnapshot = JSON.parse(JSON.stringify(state));
  }
  _settingsDirty = true;
  const bar = document.getElementById('settings-save-bar');
  if (bar) bar.style.display = 'flex';
}

function saveSettingsChanges() {
  _settingsDirty = false;
  _settingsSnapshot = null;
  saveData(state);
  const bar = document.getElementById('settings-save-bar');
  if (bar) bar.style.display = 'none';
  // Brief confirmation
  const btn = document.getElementById('settings-save-btn');
  if (btn) { const orig = btn.textContent; btn.textContent = 'Saved'; btn.style.background = '#10b981'; setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1500); }
  renderAll();
}

function cancelSettingsChanges() {
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

function _checkSettingsUnsaved(targetTab) {
  if (_settingsDirty) {
    if (confirm('You have unsaved changes in Settings. Save before leaving?')) {
      saveSettingsChanges();
    } else {
      cancelSettingsChanges();
    }
  }
}

function updateSetting(key, value) {
  if (!state.settings) state.settings = {};
  state.settings[key] = value;
  _markSettingsDirty();
}

function saveApiKey() {
  const val = document.getElementById('settings-api-key')?.value.trim();
  if (!val) return;
  localStorage.setItem('toto_ai_key', val);
  localStorage.setItem('toto_ai_key_meta', JSON.stringify({ addedAt: new Date().toISOString(), prefix: val.slice(0, 10), suffix: val.slice(-4) }));
  const status = document.getElementById('api-key-status');
  if (status) { status.textContent = '✓ Key saved!'; status.style.color = 'var(--success)'; setTimeout(() => { status.textContent = ''; status.style.color = ''; }, 2000); }
  // Refresh the summary card
  const card = document.getElementById('api-key-summary');
  if (card) card.outerHTML = _renderApiKeySummary();
}

function removeApiKey() {
  if (!confirm('Remove saved API key? Toto and cost estimation will stop working.')) return;
  localStorage.removeItem('toto_ai_key');
  localStorage.removeItem('toto_ai_key_meta');
  renderSettings();
}

function _renderApiKeySummary() {
  const key = localStorage.getItem('toto_ai_key');
  if (!key) return '<div id="api-key-summary"></div>';
  const meta = JSON.parse(localStorage.getItem('toto_ai_key_meta') || '{}');
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

function toggleSettingsSection(key) {
  const body = document.getElementById(`sacc-body-${key}`);
  const chev = document.getElementById(`sacc-chev-${key}`);
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  if (chev) chev.textContent = isOpen ? '▼' : '▲';
  if (isOpen) _settingsOpen.delete(key); else _settingsOpen.add(key);
}

function clearActivityLog() {
  if (!confirm('Clear the entire activity log? This cannot be undone.')) return;
  state.activityLog = [];
  saveData(state);
  renderSettings();
}

function addCategory(type) {
  const input = document.getElementById(`new-cat-${type}`);
  const name = (input.value || '').trim();
  if (!name) { input.focus(); return; }
  const list = type === 'expense' ? state.expenseCategories : state.incomeCategories;
  if (list.includes(name)) { alert('That category already exists.'); return; }
  list.push(name);
  logActivity(`Added ${type} category`, name);
  _markSettingsDirty();
  input.value = '';
  renderSettings();
}

function removeCategory(type, name) {
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
  logActivity(`Removed ${type} category`, name);
  _markSettingsDirty();
  renderSettings();
}

function renderSettings() {
  function safeId(s) { return s.replace(/[^a-z0-9]/gi, '_'); }
  function swatch(type, key, label, color) {
    const sid = `${type}_${safeId(key)}`;
    return `
      <div class="color-row">
        <div class="color-dot" id="dot-${sid}" style="background:${color}"></div>
        <span>${label}</span>
        <input type="color" value="${color}"
          oninput="document.getElementById('dot-${sid}').style.background=this.value"
          onchange="updateColor('${type}','${key}',this.value)">
      </div>`;
  }

  const rawData = localStorage.getItem(STORAGE_KEY);
  const dataSize = rawData ? (rawData.length / 1024).toFixed(1) : 0;
  const dataStatus = rawData
    ? `<span style="color:var(--success);font-weight:600">✓ Data found in localStorage (${dataSize} KB)</span>`
    : `<span style="color:var(--danger);font-weight:600">⚠ No data in localStorage</span>`;

  const log = state.activityLog || [];

  function fmtLogTime(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })
      + ' ' + d.toLocaleTimeString('en-AU', { hour:'2-digit', minute:'2-digit' });
  }

  function avatarHtml(entry) {
    if (entry.photo) return `<img src="${entry.photo}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0" onerror="this.style.display='none'">`;
    const initial = (entry.name || '?')[0].toUpperCase();
    return `<div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${initial}</div>`;
  }

  const actionColors = {
    'Added':   '#10b981',
    'Edited':  '#3b82f6',
    'Deleted': '#ef4444',
    'Updated': '#f59e0b',
    'Imported':'#8b5cf6',
    'Removed': '#ef4444',
  };

  function actionBadgeColor(action) {
    const word = action.split(' ')[0];
    return actionColors[word] || '#94a3b8';
  }

  function acc(key, title, subtitle, bodyHtml, headerExtra) {
    const isOpen = _settingsOpen.has(key);
    return `
      <div class="sacc-item">
        <div class="sacc-hdr" onclick="toggleSettingsSection('${key}')">
          <div style="flex:1;min-width:0">
            <div class="sacc-title">${title}</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
            ${headerExtra || ''}
            <span class="sacc-chev" id="sacc-chev-${key}">${isOpen ? '▲' : '▼'}</span>
          </div>
        </div>
        <div class="sacc-body" id="sacc-body-${key}" style="display:${isOpen ? 'block' : 'none'}">
          ${subtitle ? `<div style="padding:12px 20px 0;font-size:12px;color:var(--text-muted)">${subtitle}</div>` : ''}
          ${bodyHtml}
        </div>
      </div>`;
  }

  const petIcons = { dog:'🐕', cat:'🐈', bird:'🐦' };

  // ── 2028: profile hero on top of accordion settings ──
  const settingsDateLine = new Date().toLocaleDateString('en-AU', { weekday:'long', month:'long', day:'numeric' });
  const adultName = (state.settings?.adultName) || (state.settings?.adults?.[0]?.name) || 'You';
  const adultEmail = (state.settings?.email) || '';
  const profileInitial = adultName.charAt(0).toUpperCase();
  const scrHeader = `
    <div class="settings-profile" style="margin:0 0 8px">
      <div class="profile-avatar-lg">${profileInitial}</div>
      <div style="flex:1;min-width:0">
        <div class="profile-name">${escHtml(adultName)}</div>
        ${adultEmail ? `<div class="profile-email">${escHtml(adultEmail)}</div>` : ''}
        <div style="margin-top:6px"><span class="t-chip work" style="font-size:10px">Admin</span></div>
      </div>
      <button onclick="fbAuth&&fbAuth.signOut().then(()=>location.reload())" style="background:none;border:none;cursor:pointer;color:var(--muted);font-size:12px;font-weight:600;padding:0;white-space:nowrap">Sign out</button>
    </div>
    <div class="toto-sec-header" style="margin-top:6px"><span class="toto-sec-title">Settings</span></div>`;

  let html = scrHeader +
    acc('ai', '🤖 AI Assistant (Toto)', 'Powers cost estimation, Toto chat, and CSV import analysis', `
      <div class="section-body">
        <div style="margin-bottom:8px;font-size:13px;font-weight:600">Anthropic API Key</div>
        <div style="display:flex;gap:8px;align-items:center;max-width:480px">
          <input type="password" class="form-input" id="settings-api-key" style="flex:1"
            placeholder="sk-ant-api03-..."
            value="${localStorage.getItem('toto_ai_key')||''}">
          <button class="btn btn-primary" onclick="saveApiKey()">Save</button>
        </div>
        <p id="api-key-status" style="font-size:12px;color:var(--text-muted);margin-top:6px"></p>
        ${_renderApiKeySummary()}
      </div>`) +

    acc('prefs', 'Budget Preferences', 'Controls how month-to-month budget data is managed', `
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" id="pref-autofill" ${(state.settings||{}).autoFillMonths ? 'checked' : ''}
            onchange="updateSetting('autoFillMonths', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Auto-fill new months from previous month</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">When you navigate forward to a month with no data, automatically copy all recurring items from the previous month.</p>
          </div>
        </label>
      </div>`) +

    acc('kids-prefs', '👧 Kids & Routines', 'Daily reset time for routines and chores', `
      <div class="section-body">
        <div style="margin-bottom:6px;font-size:13px;font-weight:600">Routine reset time</div>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Completed tasks reset each day at this time. Default is midnight (12:00 am).</p>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          ${[0,4,5,6].map(h => {
            const label = h === 0 ? 'Midnight' : h === 4 ? '4 am' : h === 5 ? '5 am' : '6 am';
            const sel   = (state.settings?.routineResetHour ?? 0) === h;
            return `<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;font-weight:${sel?'700':'500'};color:${sel?'var(--primary)':'var(--text)'}">
              <input type="radio" name="reset-hour" value="${h}" ${sel?'checked':''} style="accent-color:var(--primary)"
                onchange="state.settings.routineResetHour=${h};_markSettingsDirty();saveData(state);renderSettings()">
              ${label}
            </label>`;
          }).join('')}
        </div>
      </div>`) +

    acc('meals-prefs', 'Meal Preferences', 'Calorie tracking and meal display options', `
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(state.settings||{}).showCalories ? 'checked' : ''}
            onchange="updateSetting('showCalories', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Show calorie estimates on meals</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">AI estimates calories for each meal. Shows per-meal calories and daily totals in the meal planner and lunchbox grids.</p>
          </div>
        </label>
      </div>`) +

    acc('typea', 'Type A Mode', state.settings?.typeAMode ? 'Active — daily missions and life score' : 'Off — turn on for guided organisation', `
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(state.settings||{}).typeAMode ? 'checked' : ''}
            onchange="updateSetting('typeAMode', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Enable Type A Mode</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">Adds a Life Score, daily missions, and guided organisation to your Today screen. Toto takes the lead and tells you what to do next.</p>
          </div>
        </label>
        ${state.settings?.typeAMode ? `
        <div style="margin-top:16px;padding:14px;background:var(--surface2);border-radius:10px">
          <div style="font-size:13px;font-weight:700;margin-bottom:8px">Current Life Score</div>
          <div style="font-size:28px;font-weight:900;color:#0891b2">${calcLifeScore().total}%</div>
          ${state.settings?.typeAStreak > 0 ? `<div class="streak-badge" style="margin-top:8px">🔥 ${state.settings.typeAStreak} week streak</div>` : ''}
        </div>` : ''}
      </div>`) +

    acc('notif', 'Notification Style', 'Choose how Toto shows alerts on the Today screen', `
      <div class="section-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px">
          ${[
            { val:'focus-timeline', label:'Focus + Timeline', desc:'One big card + chronological feed' },
            { val:'focus', label:'Focus Card', desc:'One urgent item at a time' },
            { val:'stack', label:'Stack', desc:'Card deck with count badge' },
            { val:'timeline', label:'Timeline Only', desc:'Chronological feed grouped by urgency' },
            { val:'banners', label:'Banners', desc:'Subtle alerts at the top' },
          ].map(o => `<label style="display:block;cursor:pointer;border:2px solid ${(state.settings?.notifStyle||'focus-timeline')===o.val?'#0891b2':'var(--border)'};border-radius:12px;padding:14px;background:${(state.settings?.notifStyle||'focus-timeline')===o.val?'#ecfeff':'var(--surface)'}">
            <input type="radio" name="notif-style" value="${o.val}" ${(state.settings?.notifStyle||'focus-timeline')===o.val?'checked':''} onchange="state.settings.notifStyle=this.value;_markSettingsDirty();renderSettings();renderToday()" style="display:none">
            <div style="font-size:13px;font-weight:700;margin-bottom:2px">${o.label}</div>
            <div style="font-size:11px;color:var(--text-muted)">${o.desc}</div>
          </label>`).join('')}
        </div>
      </div>`) +

    acc('log', 'Activity Log', `${log.length} recorded action${log.length !== 1 ? 's' : ''} — synced across all devices`, `
      ${log.length === 0
        ? `<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No activity recorded yet. Changes you and your family make will appear here.</div>`
        : `<div style="max-height:400px;overflow-y:auto">
            ${log.slice(0, 100).map(entry => `
              <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border)">
                ${avatarHtml(entry)}
                <div style="flex:1;min-width:0">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px">
                    <span style="font-weight:600;font-size:13px">${escHtml(entry.name)}</span>
                    <span style="display:inline-block;padding:2px 10px;border-radius:99px;font-size:11px;font-weight:600;color:#fff;background:${actionBadgeColor(entry.action)}">${escHtml(entry.action)}</span>
                    ${entry.detail ? `<span style="font-size:13px;color:var(--text)">${escHtml(entry.detail)}</span>` : ''}
                  </div>
                  <div style="font-size:11px;color:var(--text-muted)">${fmtLogTime(entry.ts)}</div>
                </div>
              </div>`).join('')}
          </div>`}`,
      log.length > 0 ? `<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();clearActivityLog()" style="color:var(--danger)">Clear log</button>` : '') +

    acc('data', 'Data &amp; Recovery', dataStatus, `
      <div class="section-body">
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
          <button class="btn btn-secondary btn-sm" onclick="exportData()">Export JSON backup</button>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('import-file').click()">Import JSON backup</button>
          <input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)">
        </div>
        ${rawData ? `<button class="btn btn-ghost btn-sm" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display?'':'none'">Show raw localStorage data</button>
          <pre style="display:none;margin-top:8px;background:var(--surface2);padding:12px;border-radius:8px;font-size:11px;overflow:auto;max-height:200px;white-space:pre-wrap;word-break:break-all">${rawData.replace(/</g,'&lt;')}</pre>` : ''}
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
          <div style="font-size:13px;font-weight:600;color:var(--danger);margin-bottom:4px">Danger zone</div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Permanently deletes all household data from this device and the cloud. Cannot be undone.</div>
          <button class="btn btn-sm" style="background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;font-weight:600" onclick="resetAllData()">Reset all data…</button>
        </div>
      </div>`) +

    (() => {
      const _members     = state.householdProfile.members || [];
      const _invites     = state.householdProfile.invites || [];
      const _authedUsers = state.householdProfile.authorizedUsers || [];
      const _petIcons    = petIcons;

      const memberCards = _members.map((m, i) => {
        const isAdult = m.role === 'adult';
        const isOwner = isAdult && i === 0;
        const avatar  = m.emoji || (isAdult ? '🧑' : '🧒');
        const label   = isOwner ? 'Owner' : isAdult ? 'Adult' : 'Child';
        const labelBg = isOwner ? '#fef9c3' : isAdult ? '#e0f2fe' : '#f0fdf4';
        const labelCol= isOwner ? '#854d0e' : isAdult ? '#0369a1' : '#16a34a';

        // ── Access status for this member ──
        let accessHtml = '';
        if (isAdult) {
          const adultIndex = _members.slice(0, i).filter(x => x.role === 'adult').length;
          const hasAdultPin = !!m.pinHash;
          const adultPinHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;margin-top:8px;background:${hasAdultPin?'#f0fdf4':'var(--surface2)'};border-radius:8px;border:1px solid ${hasAdultPin?'#bbf7d0':'var(--border)'}">
            <span style="font-size:16px">🔢</span>
            <div style="flex:1">
              <div style="font-size:12px;font-weight:600;color:${hasAdultPin?'#16a34a':'var(--text)'}">Shared device PIN · ${hasAdultPin ? 'Set ✓' : 'Not set'}</div>
              <div style="font-size:11px;color:var(--text-muted)">${hasAdultPin ? 'Required when signing in on a shared device' : 'Optional — protects your profile on shared devices'}</div>
            </div>
            <button onclick="event.stopPropagation();setAdultPin(${adultIndex})" style="padding:6px 10px;border:1px solid ${hasAdultPin?'#bbf7d0':'var(--border)'};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${hasAdultPin ? 'Change' : 'Set PIN'}</button>
            ${hasAdultPin ? `<button onclick="event.stopPropagation();clearAdultPin(${adultIndex})" style="padding:6px 10px;border:1px solid #fecaca;border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:#b91c1c;cursor:pointer">Remove</button>` : ''}
          </div>`;

          if (isOwner) {
            accessHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
              <span style="font-size:16px">✅</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:#16a34a">Google login · Owner</div>
                <div style="font-size:11px;color:#64748b">Full access · Set up this household</div>
              </div>
            </div>` + adultPinHtml;
          } else {
            // Check if this adult has joined via invite
            const joined = _authedUsers.find(u => u.name && m.name && u.name.toLowerCase().includes(m.name.toLowerCase().split(' ')[0]));
            // Check for a pending invite for this member
            const pending = _invites.find(inv => inv.memberName === m.name && inv.status === 'pending' && new Date(inv.expiresAt) > new Date());
            const accepted = _invites.find(inv => inv.memberName === m.name && inv.status === 'accepted');

            if (joined || accepted) {
              accessHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
                <span style="font-size:16px">✅</span>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:#16a34a">Google login · Member</div>
                  <div style="font-size:11px;color:#64748b">${escHtml((joined||{}).email || 'Joined via invite')}</div>
                </div>
              </div>` + adultPinHtml;
            } else if (pending) {
              const expiry = new Date(pending.expiresAt).toLocaleDateString();
              accessHtml = `<div style="padding:10px 12px;background:#fef9c3;border-radius:8px;border:1px solid #fde68a">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:16px">⏳</span>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:#854d0e">Invite pending</div>
                    <div style="font-size:11px;color:#78350f">Expires ${expiry}${pending.email ? ' · ' + escHtml(pending.email) : ''}</div>
                  </div>
                </div>
                <div style="display:flex;gap:6px">
                  <button onclick="event.stopPropagation();_copyInviteLinkForMember('${pending.id}')" style="flex:1;padding:6px;border:1px solid #fde68a;border-radius:6px;background:#fff;font-size:11px;font-weight:600;color:#854d0e;cursor:pointer">📋 Copy link</button>
                  <button onclick="event.stopPropagation();revokeInvite('${pending.id}')" style="padding:6px 10px;border:1px solid #fecaca;border-radius:6px;background:#fff;font-size:11px;font-weight:600;color:#ef4444;cursor:pointer">Revoke</button>
                </div>
              </div>` + adultPinHtml;
            } else {
              accessHtml = `<div style="padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:16px">🔗</span>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:var(--text)">No app access yet</div>
                    <div style="font-size:11px;color:var(--text-muted)">Send an invite link so ${escHtml(m.name || 'this person')} can join</div>
                  </div>
                </div>
                <button onclick="event.stopPropagation();inviteMember(${i})" class="btn btn-primary btn-sm" style="width:100%">Invite to join →</button>
              </div>` + adultPinHtml;
            }
          }
        } else {
          // Child — PIN access
          const kidProfile = (state.kids?.profiles || []).find(k => k.name && m.name && k.name.toLowerCase() === m.name.toLowerCase());
          const hasPin  = !!(kidProfile?.pinHash);
          const hasName = !!(m.name && m.name.trim());

          const isHardLocked = kidProfile && _isPinHardLocked ? _isPinHardLocked(kidProfile.id) : false;

          if (isHardLocked) {
            accessHtml = `<div style="padding:10px 12px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:16px">🔒</span>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:#b91c1c">PIN locked</div>
                  <div style="font-size:11px;color:#64748b">Too many failed attempts</div>
                </div>
              </div>
              <button onclick="event.stopPropagation();resetKidPinLock(${kidProfile.id})" style="width:100%;padding:7px;border:1px solid #fecaca;border-radius:6px;background:#fff;font-size:12px;font-weight:600;color:#b91c1c;cursor:pointer">Reset PIN lock</button>
            </div>`;
          } else if (!hasName) {
            accessHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="font-size:12px;color:var(--text-muted)">Enter a name above to enable PIN login</div>
            </div>`;
          } else if (!kidProfile) {
            accessHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:var(--text)">PIN login · Not set up</div>
                <div style="font-size:11px;color:var(--text-muted)">Save changes first, then set a PIN for ${escHtml(m.name)}</div>
              </div>
              <button onclick="event.stopPropagation();_ensureKidProfileAndPin('${escAttr(m.name)}')" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">Set PIN</button>
            </div>`;
          } else {
            accessHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:${hasPin?'#f0fdf4':'var(--surface2)'};border-radius:8px;border:1px solid ${hasPin?'#bbf7d0':'var(--border)'}">
              <span style="font-size:16px">🔢</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:${hasPin?'#16a34a':'var(--text)'}">PIN login · ${hasPin ? 'Set up ✓' : 'Not set up'}</div>
                <div style="font-size:11px;color:var(--text-muted)">${hasPin ? 'PIN is active — tap to change it' : 'Set a PIN so ' + escHtml(m.name) + ' can log in'}</div>
              </div>
              <button onclick="event.stopPropagation();openPinSetup(${kidProfile.id})" style="padding:6px 10px;border:1px solid ${hasPin?'#bbf7d0':'var(--border)'};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${hasPin ? 'Change' : 'Set PIN'}</button>
            </div>`;
          }
        }

        return `
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)">
          <div style="display:flex;align-items:center;gap:12px;padding:14px 16px">
            <div style="width:42px;height:42px;border-radius:50%;background:${isAdult?'linear-gradient(135deg,#ecfeff,#ccfbf1)':'linear-gradient(135deg,#fef9c3,#fde68a)'};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${avatar}</div>
            <div style="flex:1;min-width:0">
              <input type="text" maxlength="50" class="form-input" style="font-weight:600;font-size:14px;width:100%;color:var(--text);padding:4px 8px;border-radius:6px"
                placeholder="Enter name…"
                value="${escAttr(m.name || '')}"
                onchange="updateMember(${i},'name',this.value)">
              <div style="display:flex;align-items:center;gap:6px;margin-top:6px">
                <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:2px 7px;border-radius:99px;background:${labelBg};color:${labelCol};flex-shrink:0">${label}</span>
                <span style="font-size:12px;color:var(--text-muted);flex-shrink:0">·</span>
                <input type="number" class="form-input" style="width:52px;font-size:12px;padding:2px 6px;border-radius:6px"
                  placeholder="Age" min="0" max="120"
                  value="${m.age !== null && m.age !== undefined ? m.age : ''}"
                  onchange="updateMember(${i},'age',this.value===''?null:parseInt(this.value))">
                <span style="font-size:12px;color:var(--text-muted);flex-shrink:0">yrs</span>
              </div>
            </div>
            <button onclick="removeHouseholdMember(${i})" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:18px;line-height:1;padding:4px;opacity:.6;flex-shrink:0" title="Remove from household">&times;</button>
          </div>
          <div style="padding:0 16px 14px">${accessHtml}</div>
        </div>`;
      }).join('');

      const petsHtml = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <span style="font-weight:600;font-size:13px">Pets</span>
          <div style="display:flex;gap:6px">
            <button class="btn btn-ghost btn-sm" onclick="addPet('dog')">+ Dog</button>
            <button class="btn btn-ghost btn-sm" onclick="addPet('cat')">+ Cat</button>
            <button class="btn btn-ghost btn-sm" onclick="addPet('other')">+ Other</button>
          </div>
        </div>
        ${(state.householdProfile.pets||[]).length === 0 ? `<p style="color:var(--text-muted);font-size:13px">No pets added.</p>` : ''}
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
          ${(state.householdProfile.pets||[]).map((p,i) => {
            const petIcon = _petIcons[p.type] || '🐾';
            return `<div style="display:flex;align-items:center;gap:12px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 14px">
              <span style="font-size:20px;width:28px;text-align:center">${petIcon}</span>
              <select class="form-select" style="width:110px" onchange="updatePet(${i},'type',this.value);renderSettings()">
                <option value="dog"${p.type==='dog'?' selected':''}>Dog</option>
                <option value="cat"${p.type==='cat'?' selected':''}>Cat</option>
                <option value="bird"${p.type==='bird'?' selected':''}>Bird</option>
                <option value="other"${p.type==='other'?' selected':''}>Other</option>
              </select>
              <input type="text" maxlength="200" class="form-input" style="flex:1;min-width:120px" placeholder="Name (optional)"
                value="${(p.name||'').replace(/"/g,'&quot;')}"
                oninput="updatePet(${i},'name',this.value)">
              <button onclick="removePet(${i})" style="background:none;border:none;cursor:pointer;color:var(--danger);font-size:20px;line-height:1;padding:0 4px;opacity:0.7" title="Remove">&times;</button>
            </div>`;
          }).join('')}
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:20px">🚗</span>
          <input type="number" class="form-input" style="width:90px" min="0" max="20"
            value="${state.householdProfile.cars||0}" onchange="updateCars(parseInt(this.value)||0)">
          <span style="color:var(--text-muted);font-size:13px">vehicle(s) registered to this household</span>
        </div>`;

      return acc('household', '🏠 Household', 'People, pets, and access for everyone in your home', `
        <div class="section-body">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <span style="font-weight:600;font-size:13px">Members</span>
            <div style="display:flex;gap:6px">
              <button class="btn btn-ghost btn-sm" onclick="addHouseholdMember('adult')">+ Adult</button>
              <button class="btn btn-ghost btn-sm" onclick="addHouseholdMember('child')">+ Child</button>
            </div>
          </div>
          ${_members.length === 0 ? `<p style="color:var(--text-muted);font-size:13px;margin-bottom:16px">No members yet.</p>` : ''}
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
            ${memberCards}
          </div>
          <div style="border-top:1px solid var(--border);padding-top:20px;margin-top:4px">
            ${petsHtml}
          </div>
        </div>`);
    })() +

    acc('cats', 'Expense &amp; Income Categories', 'Manage categories available in dropdowns', `
      <div class="section-body">
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Expense Categories</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
          ${expenseCategories().map(cat => `
            <span style="display:inline-flex;align-items:center;gap:6px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:5px 10px 5px 12px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:${colors.expense[cat] || '#94a3b8'};flex-shrink:0"></span>
              ${cat}
              <button onclick="removeCategory('expense','${cat.replace(/'/g,"\\'")}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:16px;line-height:1;padding:0 2px" title="Remove">&times;</button>
            </span>`).join('')}
        </div>
        <div style="display:flex;gap:8px;max-width:420px;margin-bottom:24px">
          <input id="new-cat-expense" type="text" maxlength="200" class="form-input" placeholder="New expense category…" onkeydown="if(event.key==='Enter')addCategory('expense')" style="flex:1">
          <button class="btn btn-primary btn-sm" onclick="addCategory('expense')">Add</button>
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Income Categories</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
          ${incomeCategories().map(cat => `
            <span style="display:inline-flex;align-items:center;gap:6px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:5px 10px 5px 12px;font-size:13px">
              ${cat}
              <button onclick="removeCategory('income','${cat.replace(/'/g,"\\'")}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:16px;line-height:1;padding:0 2px" title="Remove">&times;</button>
            </span>`).join('')}
        </div>
        <div style="display:flex;gap:8px;max-width:420px">
          <input id="new-cat-income" type="text" maxlength="200" class="form-input" placeholder="New income category…" onkeydown="if(event.key==='Enter')addCategory('income')" style="flex:1">
          <button class="btn btn-primary btn-sm" onclick="addCategory('income')">Add</button>
        </div>
      </div>`) +

    acc('groups', 'Expense Category Groups', 'Group categories for the grouped budget view', `
      <div class="section-body">
        ${(state.categoryGroups||[]).map(g => `
          <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px 14px;margin-bottom:10px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <button id="grp-icon-btn-${g.id}" type="button" onclick="openIconPickerForGroup(${g.id})" style="width:52px;height:40px;font-size:22px;border:1px solid var(--border);border-radius:6px;background:var(--surface);cursor:pointer" title="Choose icon">${g.icon}</button>
              <input type="text" maxlength="200" class="form-input" style="flex:1;font-weight:600" value="${g.name.replace(/"/g,'&quot;')}"
                onchange="updateCategoryGroup(${g.id},'name',this.value)">
              <button class="btn btn-danger-ghost btn-sm" onclick="deleteCategoryGroup(${g.id})">Delete</button>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
              ${g.categories.map(cat => `
                <span style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:4px 10px 4px 12px;font-size:13px">
                  ${cat}
                  <button onclick="removeCatFromGroup(${g.id},'${cat.replace(/'/g,"\\'")}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:15px;line-height:1;padding:0 2px">&times;</button>
                </span>`).join('')}
              ${g.categories.length === 0 ? `<span style="font-size:13px;color:var(--text-muted);font-style:italic">No categories assigned</span>` : ''}
            </div>
            <button class="btn btn-ghost btn-sm" onclick="openAddCatToGroup(${g.id})" style="font-size:12px">+ Add Category</button>
          </div>`).join('')}
        ${(state.categoryGroups||[]).length === 0 ? `<p style="color:var(--text-muted);font-size:13px">No groups yet.</p>` : ''}
      </div>`,
      `<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openAddCategoryGroup()">+ Group</button>`) +

    acc('colours', 'Colours', 'Customise category and section colour accents', `
      <div class="section-body">
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Expense Category Colours</div>
        <div class="color-grid" style="margin-bottom:24px">
          ${expenseCategories().map(cat => swatch('expense', cat, cat, colors.expense[cat] || DEFAULT_COLORS.expense[cat] || '#94a3b8')).join('')}
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Income Colour</div>
        <div class="color-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,220px));margin-bottom:24px">
          ${swatch('income', 'income', 'Income', colors.income)}
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Build Cost Colours</div>
        <div class="color-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,220px))">
          ${swatch('build', 'contract',   'Fixed Price Contract',  colors.build.contract)}
          ${swatch('build', 'extras',     'Outside Contract',      colors.build.extras)}
          ${swatch('build', 'furniture',  'Furniture',             colors.build.furniture)}
          ${swatch('build', 'appliances', 'Appliances',            colors.build.appliances)}
        </div>
      </div>`) +
  '';

  // Setup checklist section
  html += acc('setup-checklist', '✅ Setup Checklist', 'The setup progress card shown on your dashboard',
    `<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Show on dashboard</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${state.setupProgressDismissed ? 'Currently hidden' : 'Currently visible'}</div>
        </div>
        <button onclick="event.stopPropagation();state.setupProgressDismissed=${!state.setupProgressDismissed};saveData(state);_refreshSetupProgress();renderSettings()" class="btn btn-secondary btn-sm">
          ${state.setupProgressDismissed ? 'Show again' : 'Hide'}
        </button>
      </div>
    </div>`);

  // Device profile section
  const device = getDeviceProfile();
  const deviceKids = state.kids?.profiles || [];
  const deviceLabel = !device ? 'Not configured'
    : device === 'adult' ? 'Adult — opens straight to the full app'
    : device === 'shared' ? 'Shared — shows profile picker on open'
    : (deviceKids.find(k => k.id === device)?.name || 'Unknown') + ' — kid device';

  html += acc('this-device', '📱 This Device', `Assigned to: ${deviceLabel}`,
    `<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Assigned to</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${escHtml(deviceLabel)}</div>
        </div>
        <button onclick="event.stopPropagation();showDeviceSetup()" class="btn btn-secondary btn-sm">Change</button>
      </div>
    </div>`);


  /* ── DEV TOOLS — remove before release ── */
  html += `<div style="margin-top:24px;padding:16px;border:2px dashed #f59e0b;border-radius:12px;background:#fffbeb">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#92400e;margin-bottom:12px">⚠️ Dev Tools — Remove before release</div>
    <button onclick="showProfileSelector()" class="btn btn-secondary" style="width:100%">🔄 Open profile switcher (shared device)</button>
  </div>`;

  html += `<div class="settings-save-bar" id="settings-save-bar" style="display:${_settingsDirty ? 'flex' : 'none'}">
    <div class="unsaved-dot"></div>
    <div class="unsaved-text">Unsaved changes</div>
    <button class="btn" onclick="cancelSettingsChanges()">Cancel</button>
    <button class="btn btn-primary" id="settings-save-btn" onclick="saveSettingsChanges()">Save</button>
  </div>`;

  document.getElementById('settings-content').innerHTML = html;
}

function resetAllData() {
  if (!confirm('This will permanently delete ALL household data — budget, kids, goals, everything — from this device and the cloud.\n\nThis cannot be undone. Are you sure?')) return;
  if (!confirm('Last chance. All data will be gone. Continue?')) return;
  // Clear Firestore document
  if (_currentUser && fbStore) {
    const _resetDocRef = _getHouseholdDocRef();
    if (_resetDocRef) _resetDocRef.delete().catch(() => {});
  }
  // Clear local storage (both data and household pointer)
  localStorage.removeItem(STORAGE_KEY);
  _secureClear(HOUSEHOLD_OWNER_KEY);
  // Sign out and reload — will trigger fresh onboarding
  if (_fsUnsubscribe) { _fsUnsubscribe(); _fsUnsubscribe = null; }
  fbAuth.signOut().then(() => { window.location.reload(); });
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `home-budget-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function importData(evt) {
  const file = evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported.budget) { alert('Invalid backup file — missing budget data.'); return; }
      if (!confirm('This will replace ALL current data with the backup. Continue?')) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
      location.reload();
    } catch(err) { alert('Failed to read backup file: ' + err.message); }
  };
  reader.readAsText(file);
}

// ─── Category Groups ──────────────────────────────

function toggleGroupExpand(id) {
  const content = document.getElementById(`grp-body-${id}`);
  const arrow   = document.getElementById(`grp-arrow-${id}`);
  if (!content) return;
  const open = content.style.display !== 'none';
  content.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▼' : '▲';
}

function setBudgetView(mode) {
  budgetViewMode = mode;
  renderBudget();
}

function renderExpenseGroups(expenses) {
  const groups   = state.categoryGroups || DEFAULT_DATA.categoryGroups;
  const actuals  = state.budget.actuals[selectedBudgetMonth] || {};
  const colors_e = (state.colors || {}).expense || {};

  // Categories assigned to any group
  const assignedCats = new Set(groups.flatMap(g => g.categories));
  // Any on-screen categories not in a group → put in virtual Ungrouped
  const ungroupedCats = [...new Set(expenses.map(e => e.category || 'Other'))].filter(c => !assignedCats.has(c));
  const displayGroups = ungroupedCats.length > 0
    ? [...groups, { id: 'ug', name: 'Ungrouped', icon: '📋', categories: ungroupedCats }]
    : groups;

  let html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:4px;align-items:start">';

  for (const group of displayGroups) {
    const items = expenses.filter(e => group.categories.includes(e.category || 'Other'));
    if (items.length === 0) continue;

    const budgeted = items.reduce((s, e) => s + itemMonthly(e), 0);
    const actual   = items.reduce((s, e) => s + getActual(e.id, selectedBudgetMonth), 0);
    const pct      = budgeted > 0 ? Math.round(actual / budgeted * 100) : 0;
    const barPct   = Math.min(100, pct);
    const barColor = pct >= 100 ? 'var(--danger)' : pct >= 80 ? 'var(--warning)' : 'var(--success)';
    const hasActual = actual > 0;
    const over = actual > budgeted && hasActual;
    const firstCat    = items[0] ? (items[0].category || 'Other') : 'Other';
    const headerColor = colors_e[firstCat] || colors.expense[firstCat] || '#94a3b8';

    html += `
    <div style="background:var(--surface);border:1px solid ${over ? 'var(--danger)' : 'var(--border)'};border-radius:10px;overflow:hidden">
      <!-- Always-visible title bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 14px;cursor:pointer;user-select:none;background:${headerColor}22;border-bottom:3px solid ${headerColor}" onclick="toggleGroupExpand('${group.id}')">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:20px">${group.icon}</span>
          <span style="font-weight:700;font-size:14px">${escHtml(group.name)}</span>
          <span style="font-size:11px;color:var(--text-muted)">${items.length} item${items.length !== 1 ? 's' : ''}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-weight:700;font-size:14px">${aud(budgeted)}<span style="font-size:11px;font-weight:400;color:var(--text-muted)">/mo</span></span>
          <span id="grp-arrow-${group.id}" style="color:var(--text-muted);font-size:11px;width:14px;text-align:center">▼</span>
        </div>
      </div>
      <!-- Always-visible progress bar -->
      <div style="padding:12px 14px;background:var(--surface2);border-top:1px solid var(--border)">
        <div style="background:var(--border);border-radius:99px;height:8px;overflow:hidden;margin-bottom:6px">
          <div style="height:100%;width:${barPct}%;background:${barColor};border-radius:99px"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:12px">
          <span style="color:${hasActual ? barColor : 'var(--text-muted)'}">
            ${hasActual ? `${aud(actual)} spent · ${pct}%${over ? ' — over budget!' : ''}` : 'No actuals entered yet'}
          </span>
          <span style="color:var(--text-muted)">${aud(budgeted)} budgeted</span>
        </div>
      </div>
      <!-- Collapsible items only -->
      <div id="grp-body-${group.id}" style="border-top:1px solid var(--border)">
        <div style="max-height:248px;overflow-y:auto">
        ${items.map(e => {
          const eMo    = itemMonthly(e);
          const eAct   = getActual(e.id, selectedBudgetMonth);
          const ePct   = eMo > 0 ? Math.min(100, Math.round(eAct / eMo * 100)) : 0;
          const eColor = colors_e[e.category || 'Other'] || colors.expense[e.category || 'Other'] || '#94a3b8';
          const eOver  = eAct > eMo && eAct > 0;
          const ringColor = eOver ? 'var(--danger)' : ePct >= 80 ? 'var(--warning)' : eAct > 0 ? eColor : 'var(--border)';
          const tipLabel = eAct > 0
            ? `${aud(eAct)} of ${aud(eMo)} · ${ePct}%${eOver ? ' over!' : ' used'}`
            : `No actuals · ${aud(eMo)} budgeted`;
          return `
          <div class="expense-row" style="--row-color:${eColor};display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border)">
            <div style="width:4px;height:36px;border-radius:2px;background:${eColor};flex-shrink:0"></div>
            <div style="flex:1;min-width:0;cursor:pointer" onclick="event.stopPropagation();openEditExpense(${e.id})">
              <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(e.name)}</div>
              <div style="font-size:11px;color:var(--text-muted)">${e.category || 'Other'}${e.vendor ? ` · ${escHtml(e.vendor)}` : ''} · ${freqDisplayItem(e)}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-right:4px">
              <div style="font-size:13px;font-weight:600">${aud(eMo)}/mo</div>
              ${eAct > 0
                ? `<div style="font-size:11px;font-weight:600;color:${eOver ? 'var(--danger)' : ePct >= 80 ? 'var(--warning)' : 'var(--success)'}">${aud(eAct)} actual${eOver ? ' ▲' : ''}</div>`
                : `<div style="font-size:11px;color:var(--text-muted);cursor:pointer" onclick="event.stopPropagation();editActual(${e.id})">+ add actual</div>`}
            </div>
            <div style="position:relative;flex-shrink:0;width:32px;height:32px;cursor:pointer"
                 onclick="event.stopPropagation();editActual(${e.id})"
                 onmouseenter="this.querySelector('svg').style.opacity='.25';this.querySelector('.ring-overlay').style.opacity='1'"
                 onmouseleave="this.querySelector('svg').style.opacity='1';this.querySelector('.ring-overlay').style.opacity='0'">
              <svg width="32" height="32" viewBox="0 0 36 36" style="transform:rotate(-90deg);transition:opacity .15s">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" stroke-width="3.5"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="${ringColor}" stroke-width="3.5"
                  stroke-dasharray="${ePct} 100" stroke-linecap="round"/>
              </svg>
              <div class="ring-overlay" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;transition:opacity .15s">
                <span style="font-size:9px;font-weight:700;color:${ringColor};line-height:1">${ePct}%</span>
              </div>
            </div>
          </div>`;
        }).join('')}
        </div>
      </div>
    </div>`;
  }
  html += '</div>';
  return html;
}

// ─────────────────────────────────────────────────

// Wallet allocation helpers — group expenses by category for the Betashares-style breakdown
function _budgetAllocByCategory(monthData) {
  const expenses = (monthData.expenses || []).filter(e => !e.skipped);
  if (!expenses.length) return { segments: [], total: 0 };
  const byCategory = {};
  expenses.forEach(e => {
    const cat = e.category || 'Other';
    const amt = freqToMonthly(Number(e.amount) || 0, e.frequency);
    if (amt > 0) byCategory[cat] = (byCategory[cat] || 0) + amt;
  });
  const sorted = Object.entries(byCategory)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount);
  const total = sorted.reduce((s, c) => s + c.amount, 0);
  if (total === 0) return { segments: [], total: 0 };
  const top = sorted.slice(0, 6);
  const other = sorted.slice(6);
  const palette = ['#15803d', '#16a34a', '#22c55e', '#65a30d', '#84cc16', '#a3e635', '#94A3B8'];
  const segments = top.map((c, i) => ({
    name: c.name,
    amount: c.amount,
    pct: (c.amount / total) * 100,
    color: palette[i] || '#94A3B8'
  }));
  if (other.length) {
    const otherTotal = other.reduce((s, c) => s + c.amount, 0);
    segments.push({ name: 'Other', amount: otherTotal, pct: (otherTotal / total) * 100, color: palette[6] });
  }
  return { segments, total };
}

const _TICKER_OVERRIDES = {
  'groceries':'GROC','grocery':'GROC','food':'FOOD','rent':'RENT','mortgage':'MORT',
  'fuel':'FUEL','petrol':'FUEL','transport':'TRSP','dining':'DINE','restaurants':'DINE',
  'eating out':'DINE','takeaway':'DINE','utilities':'UTIL','bills':'BILL','electricity':'ELEC',
  'gas':'GAS','water':'WATR','internet':'NET','phone':'PHNE','subscriptions':'SUBS',
  'streaming':'SUBS','insurance':'INSR','health':'HLTH','medical':'HLTH','savings':'SAVE',
  'entertainment':'ENT','travel':'TRVL','holiday':'TRVL','school':'EDU','education':'EDU',
  'kids':'KIDS','childcare':'KIDS','pets':'PETS','vehicle':'AUTO','car':'AUTO',
  'household':'HSE','clothing':'CLTH','gifts':'GIFT','charity':'GIVE','other':'OTHR'
};
function _ticker(name) {
  const k = (name || 'other').toLowerCase().trim();
  if (_TICKER_OVERRIDES[k]) return _TICKER_OVERRIDES[k];
  return (name || 'OTHR').replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 4) || 'OTHR';
}
function _categoryIcon(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('groc') || n.includes('food') || n.includes('supermarket')) return 'i-shopping-cart';
  if (n.includes('rent') || n.includes('mortgage') || n.includes('housing') || n.includes('home loan')) return 'i-home';
  if (n.includes('petrol') || n.includes('fuel') || n.includes('transport') || n.includes('uber') || n.includes('parking') || n.includes('toll')) return 'i-fuel';
  if (n.includes('dining') || n.includes('restaur') || n.includes('eat') || n.includes('takeaway')) return 'i-utensils';
  if (n.includes('utilit') || n.includes('electric') || n.includes('gas') || n.includes('water') || n.includes('internet') || n.includes('phone') || n.includes('bill')) return 'i-zap';
  if (n.includes('subscript') || n.includes('netflix') || n.includes('spotify') || n.includes('streaming')) return 'i-receipt';
  if (n.includes('vehicle') || n.includes('car') || n.includes('rego') || n.includes('motor') || n.includes('auto')) return 'i-car';
  if (n.includes('health') || n.includes('medic') || n.includes('pharm') || n.includes('doctor') || n.includes('dentist')) return 'i-pill';
  if (n.includes('insur')) return 'i-file-text';
  if (n.includes('school') || n.includes('education')) return 'i-clipboard-check';
  if (n.includes('kid') || n.includes('child')) return 'i-users';
  if (n.includes('pet')) return 'i-paw';
  if (n.includes('saving') || n.includes('invest')) return 'i-trophy';
  if (n.includes('travel') || n.includes('holiday')) return 'i-palm-tree';
  return 'i-receipt';
}

function renderBudget() {
  try {
  const b = state.budget;
  const { income: mi, expenses: me } = getMonthData(selectedBudgetMonth);
  const totalIncome = monthlyTotal(mi);
  const totalBudgetExpenses = monthlyTotal(me);
  const surplus = totalIncome - totalBudgetExpenses;

  // Actuals for selected month
  const totalActual = me.reduce((sum, e) => sum + getActual(e.id, selectedBudgetMonth), 0);
  const totalVariance = totalBudgetExpenses - totalActual;

  const surplusClass = surplus >= 0 ? 'positive' : 'negative';
  const surplusLabel = surplus >= 0 ? 'Budget Surplus' : 'Budget Deficit';

  const daysInMonth = new Date(...selectedBudgetMonth.split('-').map((v,i) => i===1 ? v : +v), 0).getDate();
  const dayOfMonth = new Date().getDate();
  const pctMonth = Math.round(dayOfMonth / daysInMonth * 100);
  const spentPct = totalBudgetExpenses > 0 ? Math.round(totalActual / totalBudgetExpenses * 100) : 0;
  const prevMo = prevMonthStr(selectedBudgetMonth);

  let html = '';

  // ── Month picker — top of screen, drives all figures ──
  html += `
    <div class="wallet-month-bar">
      <button class="wallet-month-btn" onclick="prevMonth()">&#8249;</button>
      <div class="wallet-month-label">${monthLabel(selectedBudgetMonth)}</div>
      <button class="wallet-month-btn" onclick="nextMonth()">&#8250;</button>
    </div>`;

  // ── Summary hero card ──
  html += `
    <div class="summary-hero" onclick="toggleBudgetDetail()">
      <div class="summary-hero-label">${surplus >= 0 ? 'Monthly surplus' : 'Over budget'}</div>
      <div class="summary-hero-num">${aud(Math.abs(surplus))}</div>
      <div class="summary-hero-sub">${aud(totalIncome)} income · ${aud(totalBudgetExpenses)} expenses</div>
      <div class="summary-hero-expand" id="budget-expand-label">${_budgetDetailOpen ? 'Hide details ▲' : 'See breakdown ▼'}</div>
    </div>`;

  // Mini stat cards
  html += `
    <div class="summary-mini-grid">
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:#10b981">${aud(totalIncome)}</div>
        <div class="summary-mini-label">Income</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${aud(totalBudgetExpenses)}</div>
        <div class="summary-mini-label">Budgeted</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:${totalActual > totalBudgetExpenses ? '#ef4444' : '#18181b'}">${aud(totalActual)}</div>
        <div class="summary-mini-label">Actual spent</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${spentPct}%</div>
        <div class="summary-mini-label">of budget used</div>
      </div>
    </div>`;

  // ── Budget Allocation (collapsible) ──
  const alloc = _budgetAllocByCategory({ income: mi, expenses: me });
  if (alloc.segments.length) {
    const barHtml = alloc.segments.map(s => `<div style="background:${s.color};flex:${s.pct.toFixed(2)}"></div>`).join('');
    const listHtml = alloc.segments.map(s => {
      return `<div class="alloc-row">
        <div class="tdot" style="background:${s.color}"><svg viewBox="0 0 24 24"><use href="#${_categoryIcon(s.name)}"/></svg></div>
        <div class="body">
          <div class="ticker">${_ticker(s.name)}</div>
          <div class="name">${escHtml(s.name)}</div>
        </div>
        <div>
          <div class="pct">${Math.round(s.pct)}%</div>
          <div class="amt">${aud(s.amount)}</div>
        </div>
      </div>`;
    }).join('');
    html += `<div class="alloc-section" style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:${_allocExpanded?'12px':'0'}" onclick="_allocExpanded=!_allocExpanded;renderBudget()">
        <div class="alloc-title" style="margin-bottom:0">Budget Allocation</div>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)">${_allocExpanded?'▲':'▼'}</span>
      </div>
      <div class="alloc-bar" style="margin-bottom:${_allocExpanded?'12px':'0'}">${barHtml}</div>
      ${_allocExpanded ? `<div class="alloc-list">${listHtml}</div>` : ''}
      <div onclick="event.stopPropagation();_budgetDetailOpen=true;renderBudget();document.getElementById('budget-detail')?.scrollIntoView({behavior:'smooth',block:'start'})" style="margin-top:10px;text-align:center;font-size:12px;color:var(--iris-2);font-weight:500;cursor:pointer;font-family:var(--sans)">Manage income &amp; expenses in Detailed Breakdown ↓</div>
    </div>`;
  }

  // ── Detail panel (collapsible section) ──
  html += `<div class="alloc-section" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:${_budgetDetailOpen?'16px':'0'}" onclick="toggleBudgetDetail()">
      <div class="alloc-title" style="margin-bottom:0">Detailed Breakdown</div>
      <div style="display:flex;align-items:center;gap:10px">
        <button onclick="event.stopPropagation();openCsvImport()" style="padding:5px 12px;border-radius:99px;background:var(--purple-soft);color:var(--purple);border:none;font-size:12px;font-weight:600;cursor:pointer">Import</button>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)" id="budget-expand-chevron">${_budgetDetailOpen?'▲':'▼'}</span>
      </div>
    </div>
    <div class="detail-panel ${_budgetDetailOpen ? 'expanded' : 'collapsed'}" id="budget-detail" style="margin:0 -4px">`;

  const showCopyBanner = !isMonthCustomized(selectedBudgetMonth);
  if (showCopyBanner) {
    html += `<div style="display:flex;align-items:center;justify-content:space-between;background:var(--primary-light);border:1px solid #bfdbfe;border-radius:8px;padding:10px 16px;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div>
        <span style="font-size:13px;font-weight:600;color:var(--primary)">Using default budget</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="copyMonthFromPrevious('${selectedBudgetMonth}')">
        Copy from ${monthLabel(prevMo)}
      </button>
    </div>`;
  }

  // Planned events forecast widget
  html += renderBudgetForecast(selectedBudgetMonth, surplus);

  // Suggestion inbox (planner → budget approvals)
  html += renderBudgetSuggestions(selectedBudgetMonth);

  // Income — full width
  html += `
    <div class="section" style="margin-bottom:20px">
      <div class="section-header">
        <div>
          <div class="section-title">Income</div>
          <div class="section-subtitle">${aud(totalIncome)}/mo total</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddIncome()">+ Income</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Amount</th><th>Due</th><th>Repeats</th><th>Monthly</th><th></th></tr></thead>
          <tbody>
            ${mi.length === 0 ? `<tr><td colspan="6"><div class="empty"><div class="empty-icon">💵</div>Add your income sources</div></td></tr>` : mi.map(i => {
              const dueLabel = i.dueDate ? (() => { const [y,m,d] = i.dueDate.split('-'); return `${d}/${m}/${y}`; })() : '<span style="color:var(--text-muted)">—</span>';
              const incOneTimeBadge = i.recurring === false ? `<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>` : '';
              return `<tr>
              <td style="font-weight:500;border-left:4px solid ${colors.income}">${escHtml(i.name)}${incOneTimeBadge}</td>
              <td class="amount">${audD(i.amount)}</td>
              <td>${dueLabel}</td>
              <td style="color:var(--text-muted)">${freqDisplayItem(i)}</td>
              <td class="amount" style="color:var(--success)">${aud(itemMonthly(i))}/mo</td>
              <td class="actions">
                <button class="btn btn-ghost btn-sm" onclick="openEditIncome(${i.id})">✏️</button>
                <button class="btn btn-danger-ghost btn-sm" onclick="deleteIncome(${i.id})">🗑</button>
              </td>
            </tr>`;}).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Expenses with budget vs actual
  const hasActuals = totalActual > 0;

  // Category filter (table view only)
  const allCats = ['all', ...Array.from(new Set(me.map(e => e.category || 'Other'))).sort()];
  const filteredExpenses = expenseFilterCat === 'all' ? me : me.filter(e => (e.category || 'Other') === expenseFilterCat);
  const catBudget   = filteredExpenses.reduce((s, e) => s + itemMonthly(e), 0);
  const catActual   = filteredExpenses.reduce((s, e) => s + getActual(e.id, selectedBudgetMonth), 0);
  const catVariance = catBudget - catActual;
  const isFiltered  = expenseFilterCat !== 'all';

  html += `
    <div class="section">
      <div class="section-header">
        <div>
          <div class="section-title">Expenses</div>
          <div class="section-subtitle">
            Budget: ${aud(totalBudgetExpenses)}/mo
            ${totalActual > 0 ? ` · Actual: ${aud(totalActual)} · <span class="${totalVariance >= 0 ? 'var-under' : 'var-over'}">${totalVariance >= 0 ? '▼' : '▲'} ${aud(Math.abs(totalVariance))}</span>` : ''}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div style="display:flex;border:1px solid var(--border);border-radius:6px;overflow:hidden">
            <button onclick="setBudgetView('grouped')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;cursor:pointer;background:${budgetViewMode==='grouped'?'var(--primary)':'var(--surface)'};color:${budgetViewMode==='grouped'?'#fff':'var(--text-muted)'}">⊞ Groups</button>
            <button onclick="setBudgetView('table')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;border-left:1px solid var(--border);cursor:pointer;background:${budgetViewMode==='table'?'var(--primary)':'var(--surface)'};color:${budgetViewMode==='table'?'#fff':'var(--text-muted)'}">≡ Table</button>
          </div>
          ${budgetViewMode === 'table' ? `<select class="form-select" style="width:auto;padding:6px 10px;font-size:12px" onchange="setExpenseFilter(this.value)">
            ${allCats.map(c => `<option value="${c}" ${expenseFilterCat===c?'selected':''}>${c === 'all' ? 'All categories' : c}</option>`).join('')}
          </select>` : ''}
          <button class="btn btn-primary btn-sm" onclick="openAddExpense()">+ Expense</button>
        </div>
      </div>

      <div style="padding:16px 20px">
      ${budgetViewMode === 'grouped' ? renderExpenseGroups(me) : `
        <div class="table-wrap" style="margin:0 -20px">
          <table>
            <thead>
              <tr>
                ${thSort('name', 'Item')}
                ${thSort('category', 'Category')}
                ${thSort('frequency', 'Frequency')}
                ${thSort('due', 'Due')}
                ${thSort('budget', 'Budget/mo')}
                <th>Actual <span style="font-weight:400;text-transform:none;letter-spacing:0;font-size:10px;color:var(--text-muted)">(click to edit)</span></th>
                ${thSort('variance', 'Variance')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${filteredExpenses.length === 0
                ? `<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>${me.length === 0 ? 'Add your household expenses' : 'No expenses in this category'}</div></td></tr>`
                : (() => {
                    const sorted = [...filteredExpenses].sort((a, b) => {
                      if (!expenseSortCol) return 0;
                      let av, bv;
                      if (expenseSortCol === 'name')           { av = a.name.toLowerCase();                                    bv = b.name.toLowerCase(); }
                      else if (expenseSortCol === 'category')  { av = (a.category||'Other').toLowerCase();                     bv = (b.category||'Other').toLowerCase(); }
                      else if (expenseSortCol === 'frequency') { av = freqDisplayItem(a);                                      bv = freqDisplayItem(b); }
                      else if (expenseSortCol === 'due')       { av = a.dueDate || '\uffff';                                   bv = b.dueDate || '\uffff'; }
                      else if (expenseSortCol === 'budget')    { av = itemMonthly(a);                                          bv = itemMonthly(b); }
                      else if (expenseSortCol === 'actual')    { av = getActual(a.id, selectedBudgetMonth);                    bv = getActual(b.id, selectedBudgetMonth); }
                      else if (expenseSortCol === 'variance')  { av = itemMonthly(a)-getActual(a.id,selectedBudgetMonth);      bv = itemMonthly(b)-getActual(b.id,selectedBudgetMonth); }
                      else return 0;
                      return av < bv ? (expenseSortDir==='asc'?-1:1) : av > bv ? (expenseSortDir==='asc'?1:-1) : 0;
                    });
                    return sorted.map(e => {
                      const budgetMo = itemMonthly(e);
                      const actual   = getActual(e.id, selectedBudgetMonth);
                      const variance = budgetMo - actual;
                      const hasAct   = actual > 0;
                      let varianceHtml;
                      if (!hasAct) varianceHtml = `<span class="var-none">—</span>`;
                      else if (variance >= 0) varianceHtml = `<span class="var-under">▼ ${aud(variance)}</span>`;
                      else varianceHtml = `<span class="var-over">▲ ${aud(Math.abs(variance))}</span>`;
                      const dueLabel = e.dueDate ? (() => { const [y,mo,d] = e.dueDate.split('-'); return `${d}/${mo}/${y}`; })() : '<span style="color:var(--text-muted)">—</span>';
                      const rowColor = colors.expense[e.category || 'Other'] || '#94a3b8';
                      const oneTimeBadge = e.recurring === false ? `<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>` : '';
                      return `<tr>
                        <td style="font-weight:500;border-left:4px solid ${rowColor}">${escHtml(e.name)}${oneTimeBadge}${e.vendor ? `<br><span style="font-size:11px;font-weight:400;color:var(--text-muted)">${escHtml(e.vendor)}</span>` : ''}</td>
                        <td><span style="display:inline-block;padding:2px 10px;border-radius:99px;background:${rowColor};color:#fff;font-size:11px;font-weight:600;white-space:nowrap">${e.category || 'Other'}</span></td>
                        <td style="color:var(--text-muted)">${freqDisplayItem(e)}</td>
                        <td>${dueLabel}</td>
                        <td class="amount">${aud(budgetMo)}</td>
                        <td class="actual-cell amount" id="actual-${e.id}" onclick="editActual(${e.id})">${hasAct ? aud(actual) : '<span style="color:var(--text-muted);font-size:12px">+ add</span>'}</td>
                        <td>${varianceHtml}</td>
                        <td class="actions">
                          <button class="btn btn-ghost btn-sm" onclick="openEditExpense(${e.id})">✏️</button>
                          <button class="btn btn-danger-ghost btn-sm" onclick="deleteExpense(${e.id})">🗑</button>
                        </td>
                      </tr>`;
                    }).join('');
                  })()
              }
            </tbody>
            ${filteredExpenses.length > 0 ? `
            <tfoot>
              <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                <td colspan="4" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total ${isFiltered ? expenseFilterCat : 'all categories'}</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${aud(catBudget)}/mo</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${catActual > 0 ? aud(catActual) : '—'}</td>
                <td style="padding:11px 16px;font-weight:700">${catActual > 0 ? `<span class="${catVariance>=0?'var-under':'var-over'}">${catVariance>=0?'▼':'▲'} ${aud(Math.abs(catVariance))}</span>` : '—'}</td>
                <td></td>
              </tr>
            </tfoot>` : ''}
          </table>
        </div>`}
      </div>
    </div>
  `;

  // Close detail panel + wrapper section
  html += `</div></div>`; // end .detail-panel + .alloc-section

  document.getElementById('budget-content').innerHTML = html;
  } catch(e) {
    console.error('renderBudget error:', e);
    const el = document.getElementById('budget-content');
    if (el) el.innerHTML = `<div style="padding:24px;color:var(--alert);font-family:var(--mono);font-size:13px">Render error: ${escHtml(e.message)}<br><small>${escHtml(e.stack||'')}</small></div>`;
  }
}

let _budgetDetailOpen = false;
let _allocExpanded = false;
function toggleBudgetDetail() {
  _budgetDetailOpen = !_budgetDetailOpen;
  const panel = document.getElementById('budget-detail');
  const heroLabel = document.getElementById('budget-expand-label');
  const chevron = document.getElementById('budget-expand-chevron');
  const wrapper = panel && panel.parentElement;
  if (panel) {
    panel.classList.toggle('collapsed', !_budgetDetailOpen);
    panel.classList.toggle('expanded', _budgetDetailOpen);
  }
  if (wrapper) wrapper.style.marginBottom = _budgetDetailOpen ? '16px' : '0';
  if (heroLabel) heroLabel.textContent = _budgetDetailOpen ? 'Hide details ▲' : 'See breakdown ▼';
  if (chevron) chevron.textContent = _budgetDetailOpen ? '▲' : '▼';
}

// ─────────────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────────────

function openModal(title, bodyHtml, onSave) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-footer').innerHTML = `
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" id="modal-save-btn">Save</button>
  `;
  // Use onclick to avoid listener accumulation across multiple openModal calls
  window._modalSaveHandler = onSave;
  document.getElementById('modal-save-btn').onclick = () => window._modalSaveHandler?.();
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  _pendingLogEntry = null;
  window._actualEditorRefresh = null;
  window._csvSuggestions = null;
  window._csvSuggestNames = null;
  document.getElementById('modal-body').innerHTML = '';
  document.getElementById('modal-footer').innerHTML = '';
  document.getElementById('modal-overlay').classList.add('hidden');
}

document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ─── Contract total ───────────────────────────────

function openEditContractTotal() {
  openModal('Edit Contract Total', `
    <div class="form-group">
      <label class="form-label">Fixed Price Contract Total (AUD)</label>
      <input class="form-input" id="f-contract-total" type="number" max="99999999" value="${state.buildContract.total}" min="0">
    </div>
  `, () => {
    const v = parseFloat(document.getElementById('f-contract-total').value);
    if (!isNaN(v) && v > 0) {
      logActivity('Updated contract total', aud(v));
      state.buildContract.total = v;
      saveData(state);
      closeModal();
      renderAll();
    }
  });
}

// ─── Stages ───────────────────────────────────────

function stageForm(s = {}) {
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Stage Name</label>
        <input class="form-input" id="f-stage-name" type="text" maxlength="200" value="${escAttr(s.name || '')}" placeholder="e.g. Base / Slab">
      </div>
      <div class="form-group">
        <label class="form-label">Amount (AUD)</label>
        <input class="form-input" id="f-stage-amount" type="number" max="99999999" value="${s.amount || ''}" min="0">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Expected Date</label>
        <input class="form-input" id="f-stage-expected" type="date" value="${s.expectedDate || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Paid Date</label>
        <input class="form-input" id="f-stage-paiddate" type="date" value="${s.paidDate || ''}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Invoice / Ref</label>
        <input class="form-input" id="f-stage-ref" type="text" maxlength="200" value="${escAttr(s.invoiceRef || '')}" placeholder="Optional">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="display:flex;align-items:center;gap:10px;padding-top:22px">
        <input type="checkbox" id="f-stage-paid" ${s.paid ? 'checked' : ''}>
        <label for="f-stage-paid" style="font-size:13px;cursor:pointer">Mark as paid</label>
      </div>
      <div class="form-group">
        <label class="form-label">Funding</label>
        <select class="form-select" id="f-stage-funding">
          <option value="loan"       ${(s.funding||'loan')==='loan'      ?'selected':''}>Loan</option>
          <option value="own-funds"  ${s.funding==='own-funds' ?'selected':''}>Own Funds</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-stage-notes" type="text" maxlength="200" value="${s.notes || ''}" placeholder="Optional">
    </div>
  `;
}

function stageFromForm(id) {
  return {
    id,
    name:         document.getElementById('f-stage-name').value.trim(),
    amount:       parseFloat(document.getElementById('f-stage-amount').value) || 0,
    paid:         document.getElementById('f-stage-paid').checked,
    expectedDate: document.getElementById('f-stage-expected').value,
    paidDate:     document.getElementById('f-stage-paiddate').value,
    invoiceRef:   document.getElementById('f-stage-ref').value.trim(),
    funding:      document.getElementById('f-stage-funding').value,
    notes:        document.getElementById('f-stage-notes').value.trim(),
  };
}

function openAddStage() {
  openModal('Add Contract Stage', stageForm(), () => {
    const s = stageFromForm(nextId(state.buildContract.stages));
    if (!s.name) return;
    logActivity('Added build stage', s.name);
    state.buildContract.stages.push(s);
    saveData(state); closeModal(); renderAll();
  });
}

function openEditStage(id) {
  const s = state.buildContract.stages.find(x => x.id === id);
  openModal('Edit Stage', stageForm(s), () => {
    const updated = stageFromForm(id);
    logActivity('Edited build stage', updated.name || s.name);
    Object.assign(s, updated);
    saveData(state); closeModal(); renderAll();
  });
}

function deleteStage(id) {
  if (!confirm('Delete this stage?')) return;
  const s = state.buildContract.stages.find(x => x.id === id);
  logActivity('Deleted build stage', s ? s.name : '');
  state.buildContract.stages = state.buildContract.stages.filter(s => s.id !== id);
  saveData(state); renderAll();
}

// ─── Variations ───────────────────────────────────

function variationForm(v = {}) {
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Variation Ref</label>
        <input class="form-input" id="f-var-ref" type="text" maxlength="200" value="${escAttr(v.ref || '')}" placeholder="e.g. V001">
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-var-status">
          <option value="pending"  ${(v.status||'pending')==='pending'  ?'selected':''}>Pending</option>
          <option value="approved" ${v.status==='approved' ?'selected':''}>Approved</option>
          <option value="rejected" ${v.status==='rejected' ?'selected':''}>Rejected</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input class="form-input" id="f-var-name" type="text" maxlength="200" value="${escAttr(v.name || '')}" placeholder="e.g. Tile upgrade — master bathroom">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Amount (AUD)</label>
        <input class="form-input" id="f-var-amount" type="number" max="99999999" value="${v.amount !== undefined ? v.amount : ''}" placeholder="Use negative for credits">
      </div>
      <div class="form-group">
        <label class="form-label">Funding</label>
        <select class="form-select" id="f-var-funding">
          <option value="loan"      ${(v.funding||'loan')==='loan'     ?'selected':''}>Loan</option>
          <option value="own-funds" ${v.funding==='own-funds'?'selected':''}>Own Funds</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Date Raised</label>
        <input class="form-input" id="f-var-raised" type="date" value="${v.dateRaised || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Date Approved</label>
        <input class="form-input" id="f-var-approved" type="date" value="${v.dateApproved || ''}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-var-notes" type="text" maxlength="200" value="${escAttr(v.notes||'')}" placeholder="Optional">
    </div>
  `;
}

function variationFromForm(id) {
  return {
    id,
    ref:          document.getElementById('f-var-ref').value.trim(),
    name:         document.getElementById('f-var-name').value.trim(),
    amount:       parseFloat(document.getElementById('f-var-amount').value) || 0,
    status:       document.getElementById('f-var-status').value,
    funding:      document.getElementById('f-var-funding').value,
    dateRaised:   document.getElementById('f-var-raised').value,
    dateApproved: document.getElementById('f-var-approved').value,
    notes:        document.getElementById('f-var-notes').value.trim(),
  };
}

function openAddVariation() {
  openModal('Add Variation', variationForm(), () => {
    const v = variationFromForm(nextId(state.buildContract.variations));
    if (!v.name) return;
    logActivity('Added variation', `${v.ref ? v.ref+' · ' : ''}${v.name}`);
    state.buildContract.variations.push(v);
    saveData(state); renderBuild();
  });
}

function openEditVariation(id) {
  const v = state.buildContract.variations.find(x => x.id === id);
  openModal('Edit Variation', variationForm(v), () => {
    const updated = variationFromForm(id);
    if (!updated.name) return;
    logActivity('Edited variation', `${updated.ref ? updated.ref+' · ' : ''}${updated.name}`);
    const idx = state.buildContract.variations.findIndex(x => x.id === id);
    if (idx !== -1) state.buildContract.variations[idx] = updated;
    saveData(state); renderBuild();
  });
}

function deleteVariation(id) {
  if (!confirm('Delete this variation?')) return;
  const v = state.buildContract.variations.find(x => x.id === id);
  logActivity('Deleted variation', v ? v.name : '');
  state.buildContract.variations = state.buildContract.variations.filter(x => x.id !== id);
  saveData(state); renderBuild();
}

// ─── Extras ───────────────────────────────────────

const EXTRA_STATUSES = [
  { value: 'not-quoted', label: 'Not Quoted' },
  { value: 'quoted',     label: 'Quoted' },
  { value: 'approved',   label: 'Approved' },
  { value: 'partial',    label: 'Partially Paid' },
  { value: 'paid',       label: 'Paid' },
];

function extraForm(e = {}) {
  const currentStatus = e.status || (e.totalAmount ? 'approved' : 'not-quoted');
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-extra-name" type="text" maxlength="200" value="${escAttr(e.name || '')}" placeholder="e.g. Solar">
      </div>
      <div class="form-group">
        <label class="form-label">Vendor / Contractor</label>
        <input class="form-input" id="f-extra-vendor" type="text" maxlength="200" value="${escAttr(e.vendor || '')}" placeholder="Company name">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-extra-status">
          ${EXTRA_STATUSES.map(s => `<option value="${s.value}" ${currentStatus === s.value ? 'selected' : ''}>${s.label}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Due Date</label>
        <input class="form-input" id="f-extra-due" type="date" value="${e.dueDate || ''}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Total Cost (AUD)</label>
        <input class="form-input" id="f-extra-total" type="number" max="99999999" value="${e.totalAmount || ''}" min="0" placeholder="Leave blank if TBC">
      </div>
      <div class="form-group">
        <label class="form-label">Amount Paid (AUD)</label>
        <input class="form-input" id="f-extra-paid" type="number" max="99999999" value="${e.amountPaid || ''}" min="0">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Funding</label>
        <select class="form-select" id="f-extra-funding">
          <option value="loan"      ${(e.funding||'loan')==='loan'     ?'selected':''}>Loan</option>
          <option value="own-funds" ${e.funding==='own-funds'?'selected':''}>Own Funds</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <input class="form-input" id="f-extra-notes" type="text" maxlength="200" value="${escAttr(e.notes || '')}" placeholder="Optional">
      </div>
    </div>
  `;
}

function extraFromForm(id) {
  return {
    id,
    name:        document.getElementById('f-extra-name').value.trim(),
    vendor:      document.getElementById('f-extra-vendor').value.trim(),
    status:      document.getElementById('f-extra-status').value,
    funding:     document.getElementById('f-extra-funding').value,
    totalAmount: parseFloat(document.getElementById('f-extra-total').value) || 0,
    amountPaid:  parseFloat(document.getElementById('f-extra-paid').value) || 0,
    dueDate:     document.getElementById('f-extra-due').value,
    notes:       document.getElementById('f-extra-notes').value.trim(),
  };
}

function openAddExtra() {
  openModal('Add Outside Contract Item', extraForm(), () => {
    const e = extraFromForm(nextId(state.extras));
    if (!e.name) return;
    logActivity('Added extra item', e.name);
    state.extras.push(e);
    saveData(state); closeModal(); renderAll();
  });
}

function openEditExtra(id) {
  const e = state.extras.find(x => x.id === id);
  openModal('Edit Item', extraForm(e), () => {
    const updated = extraFromForm(id);
    logActivity('Edited extra item', updated.name || e.name);
    Object.assign(e, updated);
    saveData(state); closeModal(); renderAll();
  });
}

function deleteExtra(id) {
  if (!confirm('Delete this item?')) return;
  const e = state.extras.find(x => x.id === id);
  logActivity('Deleted extra item', e ? e.name : '');
  state.extras = state.extras.filter(e => e.id !== id);
  saveData(state); renderAll();
}

// ─── Income ───────────────────────────────────────

function incomeForm(i = {}) {
  const displayDate = i.dueDate ? (() => { const [y,m,d] = i.dueDate.split('-'); return `${d}/${m}/${y}`; })() : '';
  const REPEATS = ['weekly','fortnightly','monthly','quarterly','annually','custom'];
  const isCustom = i.frequency === 'custom';
  return `
    <div class="form-group">
      <label class="form-label">Source / Description</label>
      <input class="form-input" id="f-inc-name" type="text" maxlength="200" value="${escAttr(i.name || '')}" placeholder="e.g. Salary — Chris">
    </div>
    <div class="form-group">
      <label class="form-label">Amount (AUD)</label>
      <input class="form-input" id="f-inc-amount" type="number" max="99999999" value="${i.amount || ''}" min="0">
    </div>
    <div class="form-group">
      <label class="form-label">Frequency</label>
      <select class="form-select" id="f-inc-freq" onchange="toggleCustomFreq('inc')">
        ${REPEATS.map(f => `<option value="${f}" ${(i.frequency||'monthly')===f?'selected':''}>${f === 'custom' ? 'Custom' : f.charAt(0).toUpperCase()+f.slice(1)}</option>`).join('')}
      </select>
      <div id="f-inc-custom-wrap" style="display:${isCustom ? 'flex' : 'none'};align-items:center;gap:8px;margin-top:8px">
        <span style="font-size:13px;color:var(--text-muted);white-space:nowrap">Every</span>
        <input class="form-input" id="f-inc-custom-n" type="number" max="99999999" min="1" value="${i.customEvery || ''}" style="width:70px" placeholder="e.g. 10">
        <select class="form-select" id="f-inc-custom-unit" style="flex:1">
          <option value="weeks" ${(i.customUnit||'weeks')==='weeks'?'selected':''}>weeks</option>
          <option value="months" ${i.customUnit==='months'?'selected':''}>months</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Due Date</label>
      <input type="hidden" id="f-inc-duedate" value="${i.dueDate || ''}">
      <div class="date-picker-wrap" id="dp-wrap">
        <div class="date-picker-trigger${i.dueDate ? ' has-value' : ''}" id="dp-trigger" onclick="openDatePicker(event)">
          <span id="dp-display">${displayDate || 'Select a date'}</span>
          <span style="opacity:0.5;font-size:15px">&#128197;</span>
        </div>
        <div class="date-picker-popup hidden" id="dp-popup"></div>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:0">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none">
        <input type="checkbox" id="f-inc-recurring" ${i.recurring === false ? '' : 'checked'} style="width:16px;height:16px;cursor:pointer">
        <span style="font-size:13px;font-weight:500">Recurring — carry forward to future months</span>
      </label>
      <p style="font-size:12px;color:var(--text-muted);margin-top:4px;margin-left:24px">Uncheck for one-time income that shouldn't copy forward.</p>
    </div>
  `;
}

function incomeFromForm(id) {
  const freq = document.getElementById('f-inc-freq') ? document.getElementById('f-inc-freq').value : 'monthly';
  const recurringEl = document.getElementById('f-inc-recurring');
  const obj = {
    id,
    name:      document.getElementById('f-inc-name').value.trim(),
    amount:    parseFloat(document.getElementById('f-inc-amount').value) || 0,
    frequency: freq,
    dueDate:   document.getElementById('f-inc-duedate').value || null,
    recurring: recurringEl ? recurringEl.checked : true,
  };
  if (freq === 'custom') {
    obj.customEvery = parseInt(document.getElementById('f-inc-custom-n').value) || 1;
    obj.customUnit  = document.getElementById('f-inc-custom-unit').value;
  }
  return obj;
}

function openAddIncome() {
  openModal('Add Income', incomeForm(), () => {
    const item = incomeFromForm(nextId(getMonthData(selectedBudgetMonth).income));
    if (!item.name) return;
    logActivity('Added income', item.name);
    confirmScope(
      () => {
        const mb = ensureMonthOverride(selectedBudgetMonth);
        item.id = nextId(mb.income);
        mb.income.push(item);
        saveData(state); renderAll();
      },
      () => {
        item.id = nextId(state.budget.income);
        state.budget.income.push(item);
        saveData(state); renderAll();
      }
    );
  });
}

function openEditIncome(id) {
  const src = getMonthData(selectedBudgetMonth).income.find(x => x.id === id);
  openModal('Edit Income', incomeForm(src), () => {
    const updated = incomeFromForm(id);
    logActivity('Edited income', updated.name || (src && src.name) || '');
    confirmScope(
      () => {
        const mb = ensureMonthOverride(selectedBudgetMonth);
        const item = mb.income.find(x => x.id === id);
        if (item) Object.assign(item, updated); else mb.income.push(updated);
        saveData(state); renderAll();
      },
      () => {
        const item = state.budget.income.find(x => x.id === id);
        if (item) Object.assign(item, updated);
        saveData(state); renderAll();
      }
    );
  });
}

function deleteIncome(id) {
  const src = getMonthData(selectedBudgetMonth).income.find(x => x.id === id);
  const name = src ? src.name : 'this income';
  logActivity('Deleted income', name);
  _scopePending = null;
  document.getElementById('modal-title').textContent = 'Delete income';
  document.getElementById('modal-body').innerHTML = `
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Delete <strong style="color:var(--text)">${name}</strong>? Apply to
      <strong style="color:var(--text)">${monthLabel(selectedBudgetMonth)}</strong> only,
      or remove from all months?
    </p>`;
  _scopePending = {
    onThisMonth: () => {
      const mb = ensureMonthOverride(selectedBudgetMonth);
      mb.income = mb.income.filter(i => i.id !== id);
      saveData(state); renderAll();
    },
    onAllMonths: () => {
      state.budget.income = state.budget.income.filter(i => i.id !== id);
      if (state.budget.months) Object.values(state.budget.months).forEach(m => { m.income = m.income.filter(i => i.id !== id); });
      saveData(state); renderAll();
    }
  };
  document.getElementById('modal-footer').innerHTML = `
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="doScopeAll()">Remove from all months</button>
    <button class="btn btn-danger" onclick="doScopeMonth()">Delete from ${monthLabel(selectedBudgetMonth)}</button>
  `;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

// ─── Expenses ─────────────────────────────────────

function expenseForm(e = {}) {
  const displayDate = e.dueDate ? (() => { const [y,m,d] = e.dueDate.split('-'); return `${d}/${m}/${y}`; })() : '';
  const REPEATS = ['weekly','fortnightly','monthly','quarterly','annually','custom'];
  const isCustom = e.frequency === 'custom';
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Description</label>
        <input class="form-input" id="f-exp-name" type="text" maxlength="200" value="${escAttr(e.name || '')}" placeholder="e.g. Mortgage">
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="f-exp-cat">
          ${expenseCategories().map(c => `<option value="${c}" ${(e.category||'Other')===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Vendor <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="f-exp-vendor" type="text" maxlength="200" value="${escAttr(e.vendor || '')}" placeholder="e.g. ANZ, Woolworths, Netflix">
    </div>
    <div class="form-group">
      <label class="form-label">Amount (AUD)</label>
      <input class="form-input" id="f-exp-amount" type="number" max="99999999" value="${e.amount || ''}" min="0">
    </div>
    <div class="form-group">
      <label class="form-label">Frequency</label>
      <select class="form-select" id="f-exp-freq" onchange="toggleCustomFreq('exp')">
        ${REPEATS.map(f => `<option value="${f}" ${(e.frequency||'monthly')===f?'selected':''}>${f === 'custom' ? 'Custom' : f.charAt(0).toUpperCase()+f.slice(1)}</option>`).join('')}
      </select>
      <div id="f-exp-custom-wrap" style="display:${isCustom ? 'flex' : 'none'};align-items:center;gap:8px;margin-top:8px">
        <span style="font-size:13px;color:var(--text-muted);white-space:nowrap">Every</span>
        <input class="form-input" id="f-exp-custom-n" type="number" max="99999999" min="1" value="${e.customEvery || ''}" style="width:70px" placeholder="e.g. 10">
        <select class="form-select" id="f-exp-custom-unit" style="flex:1">
          <option value="weeks" ${(e.customUnit||'weeks')==='weeks'?'selected':''}>weeks</option>
          <option value="months" ${e.customUnit==='months'?'selected':''}>months</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Due Date</label>
      <input type="hidden" id="f-exp-duedate" value="${e.dueDate || ''}">
      <div class="date-picker-wrap" id="dp-wrap">
        <div class="date-picker-trigger${e.dueDate ? ' has-value' : ''}" id="dp-trigger" onclick="openDatePicker(event)">
          <span id="dp-display">${displayDate || 'Select a date'}</span>
          <span style="opacity:0.5;font-size:15px">&#128197;</span>
        </div>
        <div class="date-picker-popup hidden" id="dp-popup"></div>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:0">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none">
        <input type="checkbox" id="f-exp-recurring" ${e.recurring === false ? '' : 'checked'} style="width:16px;height:16px;cursor:pointer">
        <span style="font-size:13px;font-weight:500">Recurring — carry forward to future months</span>
      </label>
      <p style="font-size:12px;color:var(--text-muted);margin-top:4px;margin-left:24px">Uncheck for one-time expenses that shouldn't copy forward.</p>
    </div>
  `;
}

function expenseFromForm(id) {
  const freq = document.getElementById('f-exp-freq') ? document.getElementById('f-exp-freq').value : 'monthly';
  const recurringEl = document.getElementById('f-exp-recurring');
  const obj = {
    id,
    name:      document.getElementById('f-exp-name').value.trim(),
    category:  document.getElementById('f-exp-cat').value,
    vendor:    (document.getElementById('f-exp-vendor')?.value || '').trim() || null,
    amount:    parseFloat(document.getElementById('f-exp-amount').value) || 0,
    frequency: freq,
    dueDate:   document.getElementById('f-exp-duedate').value || null,
    recurring: recurringEl ? recurringEl.checked : true,
  };
  if (freq === 'custom') {
    obj.customEvery = parseInt(document.getElementById('f-exp-custom-n').value) || 1;
    obj.customUnit  = document.getElementById('f-exp-custom-unit').value;
  }
  return obj;
}

function toggleCustomFreq(prefix) {
  const val = document.getElementById(`f-${prefix}-freq`).value;
  const wrap = document.getElementById(`f-${prefix}-custom-wrap`);
  if (wrap) wrap.style.display = val === 'custom' ? 'flex' : 'none';
}

function openAddExpense() {
  openModal('Add Expense', expenseForm(), () => {
    const item = expenseFromForm(nextId(getMonthData(selectedBudgetMonth).expenses));
    if (!item.name) return;
    logActivity('Added expense', `${item.name} (${item.category || 'Other'})`);
    confirmScope(
      () => {
        const mb = ensureMonthOverride(selectedBudgetMonth);
        item.id = nextId(mb.expenses);
        mb.expenses.push(item);
        saveData(state); renderAll();
      },
      () => {
        item.id = nextId(state.budget.expenses);
        state.budget.expenses.push(item);
        // Also add to current month's override so it appears immediately
        if (isMonthCustomized(selectedBudgetMonth)) {
          const mb = state.budget.months[selectedBudgetMonth];
          mb.expenses.push({ ...item, id: nextId(mb.expenses) });
        }
        saveData(state); renderAll();
      }
    );
  });
}

function openEditExpense(id) {
  const src = getMonthData(selectedBudgetMonth).expenses.find(x => x.id === id);
  openModal('Edit Expense', expenseForm(src), () => {
    const updated = expenseFromForm(id);
    logActivity('Edited expense', `${updated.name || (src && src.name) || ''} (${updated.category || 'Other'})`);
    confirmScope(
      () => {
        const mb = ensureMonthOverride(selectedBudgetMonth);
        const item = mb.expenses.find(x => x.id === id);
        if (item) Object.assign(item, updated); else mb.expenses.push(updated);
        saveData(state); renderAll();
      },
      () => {
        const item = state.budget.expenses.find(x => x.id === id);
        if (item) Object.assign(item, updated);
        // Also update current month's override if it exists
        if (isMonthCustomized(selectedBudgetMonth)) {
          const mb = state.budget.months[selectedBudgetMonth];
          const mItem = mb.expenses.find(x => x.id === id);
          if (mItem) Object.assign(mItem, updated);
        }
        saveData(state); renderAll();
      }
    );
  });
  // Inject delete button at the start of the footer
  const delBtn = document.createElement('button');
  delBtn.className = 'btn btn-danger';
  delBtn.textContent = 'Delete';
  delBtn.style.marginRight = 'auto';
  delBtn.onclick = () => { closeModal(); deleteExpense(id); };
  const footer = document.getElementById('modal-footer');
  footer.insertBefore(delBtn, footer.firstChild);
}

function deleteExpense(id) {
  const src = getMonthData(selectedBudgetMonth).expenses.find(x => x.id === id);
  const name = src ? src.name : 'this expense';
  logActivity('Deleted expense', name);
  _scopePending = {
    onThisMonth: () => {
      const mb = ensureMonthOverride(selectedBudgetMonth);
      mb.expenses = mb.expenses.filter(e => e.id !== id);
      saveData(state); renderAll();
    },
    onAllMonths: () => {
      state.budget.expenses = state.budget.expenses.filter(e => e.id !== id);
      if (state.budget.months) Object.values(state.budget.months).forEach(m => { m.expenses = m.expenses.filter(e => e.id !== id); });
      saveData(state); renderAll();
    }
  };
  document.getElementById('modal-title').textContent = 'Delete expense';
  document.getElementById('modal-body').innerHTML = `
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Delete <strong style="color:var(--text)">${name}</strong>? Apply to
      <strong style="color:var(--text)">${monthLabel(selectedBudgetMonth)}</strong> only,
      or remove from all months?
    </p>`;
  document.getElementById('modal-footer').innerHTML = `
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="doScopeAll()">Remove from all months</button>
    <button class="btn btn-danger" onclick="doScopeMonth()">Delete from ${monthLabel(selectedBudgetMonth)}</button>
  `;
  document.getElementById('modal-overlay').classList.remove('hidden');
}


// ─────────────────────────────────────────────────
// RENDER ALL
// ─────────────────────────────────────────────────

// ─────────────────────────────────────────────────
// FURNITURE
// ─────────────────────────────────────────────────

// → src/sections/home-extras.js
// CALENDAR
// ─────────────────────────────────────────────────

let expenseSortCol = null;
let expenseSortDir = 'asc';
let expenseFilterCat = 'all';

function setExpenseFilter(val) {
  expenseFilterCat = val;
  renderBudget();
}

function sortExpenses(col) {
  expenseSortDir = expenseSortCol === col && expenseSortDir === 'asc' ? 'desc' : 'asc';
  expenseSortCol = col;
  renderBudget();
}

function thSort(col, label, extra = '') {
  const active = expenseSortCol === col;
  const icon = active ? (expenseSortDir === 'asc' ? '↑' : '↓') : '↕';
  return `<th class="sortable${active ? ' sort-active' : ''}" onclick="sortExpenses('${col}')">${label}${extra}<span class="sort-icon">${icon}</span></th>`;
}


function ordinal(n) {
  const s = ['th','st','nd','rd'];
  const v = n % 100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
}


// ─────────────────────────────────────────────────
// MEAL PLANNER
// ─────────────────────────────────────────────────
let _mealView       = 'plan'; // 'plan' | 'shopping'
// → src/sections/meals.js
// ─────────────────────────────────────────────────

// → src/sections/vehicles.js
// ─────────────────────────────────────────────────
// DOCUMENT VAULT
// ─────────────────────────────────────────────────
// → src/sections/documents.js
// ─────────────────────────────────────────────────
// HOUSEHOLD MAINTENANCE
// ─────────────────────────────────────────────────
// → src/sections/maintenance.js
// ─────────────────────────────────────────────────
// PANTRY STOCKTAKE
// ─────────────────────────────────────────────────

// → src/sections/pantry.js
// ─────────────────────────────────────────────────
// NET WORTH
// ─────────────────────────────────────────────────

// → src/sections/networth.js
// ─────────────────────────────────────────────────
// BILLS
// ─────────────────────────────────────────────────

// → src/sections/bills.js
// ─────────────────────────────────────────────────
// SUBSCRIPTIONS
// ─────────────────────────────────────────────────

// → src/sections/subscriptions.js
// ─────────────────────────────────────────────────
// PLANNER
// ─────────────────────────────────────────────────

// → src/sections/planner.js

// ─────────────────────────────────────────────────
// TOTO ASSISTANT
// ─────────────────────────────────────────────────

// → src/sections/toto.js

// ─────────────────────────────────────────────────────────────────────────
// DEV TOOLS
// ─────────────────────────────────────────────────────────────────────────

function _devToolsOpen() {
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

function _devToolsClose() {
  document.getElementById('dev-tools-overlay').style.display = 'none';
  document.getElementById('dev-tools-sheet').style.display = 'none';
}

function _devLoadWallet() {
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
  saveData(state); renderAll();
}

function _devLoadKids() {
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
  saveData(state); renderAll();
}

function _devLoadRoutines() {
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
  saveData(state); renderAll();
}

function _devLoadPlanner() {
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
  saveData(state); renderAll();
}

function _devLoadHome() {
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
  saveData(state); renderAll();
}

function _devLoadMeals() {
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
  if (!state.lists) _applyMigrations(state);
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

  saveData(state); renderAll();
}

function _devLoadAll() {
  _devLoadWallet();
  _devLoadKids();
  _devLoadRoutines();
  _devLoadPlanner();
  _devLoadHome();
  _devLoadMeals();
}

function _devReset() {
  if (!confirm('Reset all data to empty defaults?')) return;
  const fresh = JSON.parse(JSON.stringify(DEFAULT_DATA));
  fresh.onboarded = true;
  fresh.setupProgressDismissed = false;
  _replaceState(fresh);
  saveData(fresh);
  renderAll();
}

// Init — rendering is triggered by Firestore onSnapshot after auth resolves

// ── Expose all app functions as globals for HTML onclick attributes ──────────
window._acceptInviteAndContinue = _acceptInviteAndContinue;
window._addRecurrenceToDate = _addRecurrenceToDate;
window._adultPinKey = _adultPinKey;
window._adultPinSubmit = _adultPinSubmit;
window._applyActiveProfile = _applyActiveProfile;
window._applyChildNav = _applyChildNav;
window._applyMigrations = _applyMigrations;
window._assignmentCompletedToday = _assignmentCompletedToday;
window._assignmentHistory = _assignmentHistory;
window._assignmentStreak = _assignmentStreak;
window._autoCreateRecurringEvents = _autoCreateRecurringEvents;
window._briefIcon = _briefIcon;
window._briefRow = _briefRow;
window._budgetAllocByCategory = _budgetAllocByCategory;
window._buildTotoContext = _buildTotoContext;
window._capacitorPrefs = _capacitorPrefs;
window._categoryIcon = _categoryIcon;
window._checkInviteOnLoad = _checkInviteOnLoad;
window._checkMissionEscalation = _checkMissionEscalation;
window._checkSettingsUnsaved = _checkSettingsUnsaved;
window._chipClassFor = _chipClassFor;
window._chipLabelFor = _chipLabelFor;
window._cleanupGuide = _cleanupGuide;
window._copyInviteLinkForMember = _copyInviteLinkForMember;
window._csOpen = _csOpen;
window._csvSetExpense = _csvSetExpense;
window._csvToggle = _csvToggle;
window._csvToggleAll = _csvToggleAll;
window._csvUpdateApplyBtn = _csvUpdateApplyBtn;
window._cvAgeBracket = _cvAgeBracket;
window._cvCalViewToggle = _cvCalViewToggle;
window._cvConfetti = _cvConfetti;
window._cvDismissNotif = _cvDismissNotif;
window._cvEventsForDate = _cvEventsForDate;
window._cvFmt12h = _cvFmt12h;
window._cvMonthDayTap = _cvMonthDayTap;
window._cvRefreshSchedulePanel = _cvRefreshSchedulePanel;
window._cvRender7Day = _cvRender7Day;
window._cvRenderCalendar = _cvRenderCalendar;
window._cvRenderMonth = _cvRenderMonth;
window._cvRenderPrizesTab = _cvRenderPrizesTab;
window._cvRoutineAvailLabel = _cvRoutineAvailLabel;
window._cvRoutineIsActive = _cvRoutineIsActive;
window._cvRoutineSchedCard = _cvRoutineSchedCard;
window._cvScheduleHtml = _cvScheduleHtml;
window._cvShowDayDetail = _cvShowDayDetail;
window._cvShowPrizeConfirm = _cvShowPrizeConfirm;
window._cvSwitchTab = _cvSwitchTab;
window._cvTimeGreeting = _cvTimeGreeting;
window._cvToggleRoutineExpand = _cvToggleRoutineExpand;
window._cvToggleStepFromCal = _cvToggleStepFromCal;
window._cvUpdatePrizesBadge = _cvUpdatePrizesBadge;
window._cvViewCalendar = _cvViewCalendar;
window._cvWeekDayTap = _cvWeekDayTap;
window._deleteChildEvent = _deleteChildEvent;
window._devLoadAll = _devLoadAll;
window._devLoadHome = _devLoadHome;
window._devLoadKids = _devLoadKids;
window._devLoadMeals = _devLoadMeals;
window._devLoadPlanner = _devLoadPlanner;
window._devLoadRoutines = _devLoadRoutines;
window._devLoadWallet = _devLoadWallet;
window._devReset = _devReset;
window._devToolsClose = _devToolsClose;
window._devToolsOpen = _devToolsOpen;
window._dismissInviteFlow = _dismissInviteFlow;
window._docCatMeta = _docCatMeta;
window._ensureKidProfileAndPin = _ensureKidProfileAndPin;
window._ensureNWModals = _ensureNWModals;
window._estimateLbCalories = _estimateLbCalories;
window._estimateMealCalories = _estimateMealCalories;
window._fetchAIBriefing = _fetchAIBriefing;
window._finishInviteJourney = _finishInviteJourney;
window._getHouseholdDocRef = _getHouseholdDocRef;
window._getHouseholdOwnerUID = _getHouseholdOwnerUID;
window._getInviteUrl = _getInviteUrl;
window._getNthDayOfMonth = _getNthDayOfMonth;
window._getPinTotalAttempts = _getPinTotalAttempts;
window._handlePendingInvite = _handlePendingInvite;
window._hashPin = _hashPin;
window._highlightStep = _highlightStep;
window._incPinTotalAttempts = _incPinTotalAttempts;
window._inferAisle = _inferAisle;
window._initAuthListener = _initAuthListener;
window._isPinHardLocked = _isPinHardLocked;
window._listsAddFavourite = _listsAddFavourite;
window._listsAddItem = _listsAddItem;
window._listsAddUsual = _listsAddUsual;
window._listsArchive = _listsArchive;
window._listsClearTrolley = _listsClearTrolley;
window._listsDeleteItem = _listsDeleteItem;
window._listsOpenAddForm = _listsOpenAddForm;
window._listsQuickAdd = _listsQuickAdd;
window._listsSaveForm = _listsSaveForm;
window._listsSetState = _listsSetState;
window._listsUpdateParsePreview = _listsUpdateParsePreview;
window._maintDaysUntil = _maintDaysUntil;
window._maintNextDue = _maintNextDue;
window._markSettingsDirty = _markSettingsDirty;
window._mealGetSuggestions = _mealGetSuggestions;
window._mealPill = _mealPill;
window._mealPriceSlide = _mealPriceSlide;
window._mealToggleFilter = _mealToggleFilter;
window._mealWeekDates = _mealWeekDates;
window._mealWeekKey = _mealWeekKey;
window._missionDaysIgnored = _missionDaysIgnored;
window._nextForecastMonth = _nextForecastMonth;
window._openChildEventModal = _openChildEventModal;
window._pantryToAisle = _pantryToAisle;
window._parseShopInput = _parseShopInput;
window._pickAdult = _pickAdult;
window._pickKid = _pickKid;
window._pinKey = _pinKey;
window._plannerCloseDaySheet = _plannerCloseDaySheet;
window._plannerCloseDetail = _plannerCloseDetail;
window._plannerCloseLifeSheet = _plannerCloseLifeSheet;
window._plannerCloseShare = _plannerCloseShare;
window._plannerCopyShareUrl = _plannerCopyShareUrl;
window._plannerEditFromDetail = _plannerEditFromDetail;
window._plannerEvMemberIds = _plannerEvMemberIds;
window._plannerEvPrimaryMember = _plannerEvPrimaryMember;
window._plannerEvWhoLabel = _plannerEvWhoLabel;
window._plannerEventsForDate = _plannerEventsForDate;
window._plannerFmt12h = _plannerFmt12h;
window._plannerGoToday = _plannerGoToday;
window._plannerHandleDaySheetClick = _plannerHandleDaySheetClick;
window._plannerHandleDetailClick = _plannerHandleDetailClick;
window._plannerHandleLifeSheetClick = _plannerHandleLifeSheetClick;
window._plannerHandleShareClick = _plannerHandleShareClick;
window._plannerMemberById = _plannerMemberById;
window._plannerMembers = _plannerMembers;
window._plannerNextMonth = _plannerNextMonth;
window._plannerNudges = _plannerNudges;
window._plannerOpenDaySheet = _plannerOpenDaySheet;
window._plannerOpenDetail = _plannerOpenDetail;
window._plannerOpenLifeSheet = _plannerOpenLifeSheet;
window._plannerOpenModalFromSheet = _plannerOpenModalFromSheet;
window._plannerOpenShare = _plannerOpenShare;
window._plannerPrevMonth = _plannerPrevMonth;
window._plannerRecurrenceLabel = _plannerRecurrenceLabel;
window._plannerRenderDaySheetList = _plannerRenderDaySheetList;
window._plannerSelectDay = _plannerSelectDay;
window._plannerSetView = _plannerSetView;
window._plannerShareVia = _plannerShareVia;
window._plannerToggleFilter = _plannerToggleFilter;
window._plannerToggleSection = _plannerToggleSection;
window._plannerVisibleEvents = _plannerVisibleEvents;
window._pmDpClear = _pmDpClear;
window._pmDpNext = _pmDpNext;
window._pmDpOpen = _pmDpOpen;
window._pmDpOutsideClick = _pmDpOutsideClick;
window._pmDpPrev = _pmDpPrev;
window._pmDpRender = _pmDpRender;
window._pmDpSelect = _pmDpSelect;
window._pmDpToday = _pmDpToday;
window._pmFmtDate = _pmFmtDate;
window._pmFmtDateShort = _pmFmtDateShort;
window._pmHandleCatChange = _pmHandleCatChange;
window._pmRenderMemberPicker = _pmRenderMemberPicker;
window._pmToggleAllDay = _pmToggleAllDay;
window._pmToggleMember = _pmToggleMember;
window._prevForecastMonth = _prevForecastMonth;
window._psoHoldEnd = _psoHoldEnd;
window._psoHoldStart = _psoHoldStart;
window._psoKey = _psoKey;
window._psoRender = _psoRender;
window._psoSubmit = _psoSubmit;
window._psoTourDone = _psoTourDone;
window._pushAllEventsToBudget = _pushAllEventsToBudget;
window._qaKey = _qaKey;
window._qaSelectCat = _qaSelectCat;
window._qahAction = _qahAction;
window._qahApplyParsed = _qahApplyParsed;
window._qahSendText = _qahSendText;
window._recordInviteAcceptance = _recordInviteAcceptance;
window._recurrenceMatchesDate = _recurrenceMatchesDate;
window._refreshSetupProgress = _refreshSetupProgress;
window._renderAdultPinModal = _renderAdultPinModal;
window._renderAdultRoutines = _renderAdultRoutines;
window._renderApiKeySummary = _renderApiKeySummary;
window._renderChildEventsMgmt = _renderChildEventsMgmt;
window._renderChildRoutines = _renderChildRoutines;
window._renderContextBanners = _renderContextBanners;
window._renderCsvPreview = _renderCsvPreview;
window._renderCsvReview = _renderCsvReview;
window._renderInviteFlow = _renderInviteFlow;
window._renderLifeAreas = _renderLifeAreas;
window._renderLifeScore = _renderLifeScore;
window._renderListItem = _renderListItem;
window._renderListsDetail = _renderListsDetail;
window._renderListsSelector = _renderListsSelector;
window._renderMealPlan = _renderMealPlan;
window._renderMissionCard = _renderMissionCard;
window._renderNudgeSection = _renderNudgeSection;
window._renderPinDots = _renderPinDots;
window._renderPinPad = _renderPinPad;
window._renderPlannerAgenda = _renderPlannerAgenda;
window._renderPlannerEventRow = _renderPlannerEventRow;
window._renderPlannerMonthGrid = _renderPlannerMonthGrid;
window._renderPlannerWeekStrip = _renderPlannerWeekStrip;
window._renderQAHub = _renderQAHub;
window._renderQASheet = _renderQASheet;
window._renderRoutinesTodayCard = _renderRoutinesTodayCard;
window._renderShoppingList = _renderShoppingList;
window._renderSuggestionsSection = _renderSuggestionsSection;
window._renderTourSlide = _renderTourSlide;
window._renderWeekStrip = _renderWeekStrip;
window._resetPinAttempts = _resetPinAttempts;
window._routineAddStep = _routineAddStep;
window._routineAddSuggestion = _routineAddSuggestion;
window._routineAssertScope = _routineAssertScope;
window._routineAvailableSuggestions = _routineAvailableSuggestions;
window._routineAwardPoints = _routineAwardPoints;
window._routineAwardStepPoints = _routineAwardStepPoints;
window._routineCheckDailyReset = _routineCheckDailyReset;
window._routineCompletedToday = _routineCompletedToday;
window._routineCreate = _routineCreate;
window._routineCurrentUserId = _routineCurrentUserId;
window._routineDateKey = _routineDateKey;
window._routineDelete = _routineDelete;
window._routineDeleteChild = _routineDeleteChild;
window._routineDeleteStep = _routineDeleteStep;
window._routineDragEnd = _routineDragEnd;
window._routineDragOver = _routineDragOver;
window._routineDragStart = _routineDragStart;
window._routineDrop = _routineDrop;
window._routineDuplicateFromJoined = _routineDuplicateFromJoined;
window._routineDuplicateTo = _routineDuplicateTo;
window._routineEdit = _routineEdit;
window._routineEditStep = _routineEditStep;
window._routineEditSuggestion = _routineEditSuggestion;
window._routineExpandSugg = _routineExpandSugg;
window._routineGetAssignment = _routineGetAssignment;
window._routineHistory = _routineHistory;
window._routineIntelNudge = _routineIntelNudge;
window._routineIsOwner = _routineIsOwner;
window._routineJoin = _routineJoin;
window._routineKids = _routineKids;
window._routineLeave = _routineLeave;
window._routineManageAssignments = _routineManageAssignments;
window._routineMatchesDate = _routineMatchesDate;
window._routineNextId = _routineNextId;
window._routineOtherAdults = _routineOtherAdults;
window._routinePauseMenu = _routinePauseMenu;
window._routinePropagateStepAdd = _routinePropagateStepAdd;
window._routinePropagateStepDelete = _routinePropagateStepDelete;
window._routineRecurrenceCollect = _routineRecurrenceCollect;
window._routineRecurrenceFormHtml = _routineRecurrenceFormHtml;
window._routineRecurrenceSummaryUpdate = _routineRecurrenceSummaryUpdate;
window._routineRecurrenceTypeChange = _routineRecurrenceTypeChange;
window._routineRemovePause = _routineRemovePause;
window._routineResetToday = _routineResetToday;
window._routineResetTodayAllKids = _routineResetTodayAllKids;
window._routineResetTodayKid = _routineResetTodayKid;
window._routineSaveValidated = _routineSaveValidated;
window._routineSetTab = _routineSetTab;
window._routineShareMenu = _routineShareMenu;
window._routineShowHistory = _routineShowHistory;
window._routineSkipDay = _routineSkipDay;
window._routineStreak = _routineStreak;
window._routineTodayKey = _routineTodayKey;
window._routineToggleAssignment = _routineToggleAssignment;
window._routineToggleShare = _routineToggleShare;
window._routineToggleStep = _routineToggleStep;
window._routineToggleStepKid = _routineToggleStepKid;
window._routineToggleSugg = _routineToggleSugg;
window._routineTypeSelect = _routineTypeSelect;
window._routineUnassign = _routineUnassign;
window._routinesForCurrentUser = _routinesForCurrentUser;
window._routinesForHousehold = _routinesForHousehold;
window._saveInviteIncome = _saveInviteIncome;
window._saveLbSlot = _saveLbSlot;
window._sectionTag = _sectionTag;
window._secureClear = _secureClear;
window._secureGet = _secureGet;
window._securePrewarm = _securePrewarm;
window._secureSet = _secureSet;
window._setHouseholdOwner = _setHouseholdOwner;
window._setInviteRole = _setInviteRole;
window._setPinHardLock = _setPinHardLock;
window._showGuideStep = _showGuideStep;
window._showInviteA1 = _showInviteA1;
window._showInviteA3 = _showInviteA3;
window._showInviteA4 = _showInviteA4;
window._showInviteExpired = _showInviteExpired;
window._showInviteIncomePrompt = _showInviteIncomePrompt;
window._showMissionLightbox = _showMissionLightbox;
window._showParentLockNotification = _showParentLockNotification;
window._showPinScreen = _showPinScreen;
window._showToast = _showToast;
window._startFirestoreSync = _startFirestoreSync;
window._syncVehicleBill = _syncVehicleBill;
window._tdCloseSheet = _tdCloseSheet;
window._tdOpenHeadsUpSheet = _tdOpenHeadsUpSheet;
window._tdOpenSheet = _tdOpenSheet;
window._tdOpenSlippingSheet = _tdOpenSlippingSheet;
window._tdToggleStep = _tdToggleStep;
window._ticker = _ticker;
window._tlItem = _tlItem;
window._todayAllocSegments = _todayAllocSegments;
window._totoAppendMessage = _totoAppendMessage;
window._totoInitPanel = _totoInitPanel;
window._totoRemoveTyping = _totoRemoveTyping;
window._totoSend = _totoSend;
window._totoSendSuggestion = _totoSendSuggestion;
window._totoShowTyping = _totoShowTyping;
window._updateSwitchBtn = _updateSwitchBtn;
window._verifyPin = _verifyPin;
window.addActualEntry = addActualEntry;
window.addCatToGroup = addCatToGroup;
window.addCategory = addCategory;
window.addHouseholdMember = addHouseholdMember;
window.addLink = addLink;
window.addPet = addPet;
window.addSavings = addSavings;
window.addShopItem = addShopItem;
window.addSubFromImport = addSubFromImport;
window.adjForm = adjForm;
window.aiPlanLunchbox = aiPlanLunchbox;
window.applianceForm = applianceForm;
window.applianceFromForm = applianceFromForm;
window.applyCsvImport = applyCsvImport;
window.approveCompletion = approveCompletion;
window.approveRedemption = approveRedemption;
window.approveSuggestion = approveSuggestion;
window.assignDevice = assignDevice;
window.attachBtn = attachBtn;
window.aud = aud;
window.audD = audD;
window.billCatIcon = billCatIcon;
window.billDueBadge = billDueBadge;
window.billMonthlyEquiv = billMonthlyEquiv;
window.billsModal = billsModal;
window.calcFinancialHealth = calcFinancialHealth;
window.calcLifeScore = calcLifeScore;
window.calcScenario = calcScenario;
window.cancelSettingsChanges = cancelSettingsChanges;
window.clearActivityLog = clearActivityLog;
window.clearAdultPin = clearAdultPin;
window.clearCheckedShopItems = clearCheckedShopItems;
window.clearDeviceProfile = clearDeviceProfile;
window.clearKidPin = clearKidPin;
window.clearKidSession = clearKidSession;
window.closeBillModal = closeBillModal;
window.closeModal = closeModal;
window.closeNWModal = closeNWModal;
window.closeNWTargetModal = closeNWTargetModal;
window.closePinSetupOverlay = closePinSetupOverlay;
window.closeQuickAdd = closeQuickAdd;
window.closeSubModal = closeSubModal;
window.closeTotoAssistant = closeTotoAssistant;
window.completeMission = completeMission;
window.completeWeeklyReset = completeWeeklyReset;
window.confirmScope = confirmScope;
window.copyInviteLink = copyInviteLink;
window.copyMonthFromPrevious = copyMonthFromPrevious;
window.customSelect = customSelect;
window.cyclePantryStatus = cyclePantryStatus;
window.deleteAdjustment = deleteAdjustment;
window.deleteAppliance = deleteAppliance;
window.deleteBill = deleteBill;
window.deleteCategoryGroup = deleteCategoryGroup;
window.deleteChore = deleteChore;
window.deleteDoc = deleteDoc;
window.deleteExpense = deleteExpense;
window.deleteExtra = deleteExtra;
window.deleteFurniture = deleteFurniture;
window.deleteGoal = deleteGoal;
window.deleteIncome = deleteIncome;
window.deleteKid = deleteKid;
window.deleteLbProfile = deleteLbProfile;
window.deleteMaint = deleteMaint;
window.deleteNWItem = deleteNWItem;
window.deletePantryItem = deletePantryItem;
window.deletePlannerEvent = deletePlannerEvent;
window.deletePrize = deletePrize;
window.deleteReceiptById = deleteReceiptById;
window.deleteScenario = deleteScenario;
window.deleteService = deleteService;
window.deleteStage = deleteStage;
window.deleteSub = deleteSub;
window.deleteVariation = deleteVariation;
window.deleteVehicle = deleteVehicle;
window.detectSpendingPatterns = detectSpendingPatterns;
window.dismissMission = dismissMission;
window.dismissSubResult = dismissSubResult;
window.dismissSuggestion = dismissSuggestion;
window.doScopeAll = doScopeAll;
window.doScopeMonth = doScopeMonth;
window.dpClearDate = dpClearDate;
window.dpDateInput = dpDateInput;
window.dpNextMonth = dpNextMonth;
window.dpPrevMonth = dpPrevMonth;
window.dpSelectDate = dpSelectDate;
window.editActual = editActual;
window.emojiPicker = emojiPicker;
window.endGuide = endGuide;
window.ensureMonthOverride = ensureMonthOverride;
window.escAttr = escAttr;
window.escHtml = escHtml;
window.estimateAllEvents = estimateAllEvents;
window.estimatePlannerEvent = estimatePlannerEvent;
window.exitChildView = exitChildView;
window.expenseCategories = expenseCategories;
window.expenseForm = expenseForm;
window.expenseFromForm = expenseFromForm;
window.exportData = exportData;
window.extraForm = extraForm;
window.extraFromForm = extraFromForm;
window.fileIcon = fileIcon;
window.fileSizeStr = fileSizeStr;
window.fmtDate = fmtDate;
window.fmtNW = fmtNW;
window.freqDisplay = freqDisplay;
window.freqDisplayItem = freqDisplayItem;
window.freqLabel = freqLabel;
window.freqLabelItem = freqLabelItem;
window.fundingBadge = fundingBadge;
window.furnitureForm = furnitureForm;
window.furnitureFromForm = furnitureFromForm;
window.generateInvite = generateInvite;
window.generateMission = generateMission;
window.generateShoppingList = generateShoppingList;
window.generateSmartInsights = generateSmartInsights;
window.generateSmartInsightsHTML = generateSmartInsightsHTML;
window.getAIKey = getAIKey;
window.getActual = getActual;
window.getActualEntries = getActualEntries;
window.getBenchmarkStatus = getBenchmarkStatus;
window.getBenchmarks = getBenchmarks;
window.getCategoryHistoryData = getCategoryHistoryData;
window.getDB = getDB;
window.getDeviceProfile = getDeviceProfile;
window.getKidSession = getKidSession;
window.getLast6Months = getLast6Months;
window.getMonthData = getMonthData;
window.getReceipts = getReceipts;
window.getSeasonalNudges = getSeasonalNudges;
window.goToPlannerDay = goToPlannerDay;
window.goalForm = goalForm;
window.goalFromForm = goalFromForm;
window.goalProgress = goalProgress;
window.guestMode = guestMode;
window.handleCsvFile = handleCsvFile;
window.handleDeviceRouting = handleDeviceRouting;
window.handleSubCSV = handleSubCSV;
window.hideOnboarding = hideOnboarding;
window.importData = importData;
window.incomeCategories = incomeCategories;
window.incomeForm = incomeForm;
window.incomeFromForm = incomeFromForm;
window.installApp = installApp;
window.inviteMember = inviteMember;
window.isMonthCustomized = isMonthCustomized;
window.isOverdue = isOverdue;
window.itemMonthly = itemMonthly;
window.kidBalance = kidBalance;
window.lbToShoppingList = lbToShoppingList;
window.loadColors = loadColors;
window.loadData = loadData;
window.logActivity = logActivity;
window.markBillPaid = markBillPaid;
window.markChoreChildView = markChoreChildView;
window.markChoreDone = markChoreDone;
window.markGoalAchieved = markGoalAchieved;
window.markMaintDone = markMaintDone;
window.monthLabel = monthLabel;
window.monthShortLabel = monthShortLabel;
window.monthlyTotal = monthlyTotal;
window.nextGuideStep = nextGuideStep;
window.nextId = nextId;
window.nextInsightsMonth = nextInsightsMonth;
window.nextMoneyMonth = nextMoneyMonth;
window.nextMonth = nextMonth;
window.nwItemRow = nwItemRow;
window.obBack = obBack;
window.obFinish = obFinish;
window.obNext = obNext;
window.obPickEmoji = obPickEmoji;
window.obSetAdults = obSetAdults;
window.obSetKids = obSetKids;
window.obSkip = obSkip;
window.obSkipExpenses = obSkipExpenses;
window.obStepPosition = obStepPosition;
window.obStepSequence = obStepSequence;
window.obToggleEmojiPicker = obToggleEmojiPicker;
window.obToggleExpenseSkip = obToggleExpenseSkip;
window.openActualEditor = openActualEditor;
window.openAddAdjustment = openAddAdjustment;
window.openAddAppliance = openAddAppliance;
window.openAddCatToGroup = openAddCatToGroup;
window.openAddCategoryGroup = openAddCategoryGroup;
window.openAddExpense = openAddExpense;
window.openAddExtra = openAddExtra;
window.openAddFurniture = openAddFurniture;
window.openAddGoal = openAddGoal;
window.openAddIncome = openAddIncome;
window.openAddKidModal = openAddKidModal;
window.openAddScenario = openAddScenario;
window.openAddStage = openAddStage;
window.openAddVariation = openAddVariation;
window.openBillModal = openBillModal;
window.openChoreModal = openChoreModal;
window.openCsvImport = openCsvImport;
window.openDatePicker = openDatePicker;
window.openDocForm = openDocForm;
window.openEditAppliance = openEditAppliance;
window.openEditContractTotal = openEditContractTotal;
window.openEditExpense = openEditExpense;
window.openEditExtra = openEditExtra;
window.openEditFurniture = openEditFurniture;
window.openEditGoal = openEditGoal;
window.openEditIncome = openEditIncome;
window.openEditKidModal = openEditKidModal;
window.openEditScenario = openEditScenario;
window.openEditStage = openEditStage;
window.openEditVariation = openEditVariation;
window.openEmojiPickerModal = openEmojiPickerModal;
window.openIconPickerForGroup = openIconPickerForGroup;
window.openLunchboxEdit = openLunchboxEdit;
window.openLunchboxProfile = openLunchboxProfile;
window.openMaintForm = openMaintForm;
window.openMealEdit = openMealEdit;
window.openModal = openModal;
window.openNWModal = openNWModal;
window.openNWTargetModal = openNWTargetModal;
window.openNavGroupFor = openNavGroupFor;
window.openPantryForm = openPantryForm;
window.openPinSetup = openPinSetup;
window.openPlannerModal = openPlannerModal;
window.openPrizeModal = openPrizeModal;
window.openQuickAdd = openQuickAdd;
window.openReceiptsModal = openReceiptsModal;
window.openSavingsModal = openSavingsModal;
window.openServiceForm = openServiceForm;
window.openSubModal = openSubModal;
window.openTotoAssistant = openTotoAssistant;
window.openVehicleForm = openVehicleForm;
window.openWeeklyReset = openWeeklyReset;
window.ordinal = ordinal;
window.pantryToShoppingList = pantryToShoppingList;
window.parseBankCSV = parseBankCSV;
window.pickEmoji = pickEmoji;
window.pickedEmoji = pickedEmoji;
window.prevInsightsMonth = prevInsightsMonth;
window.prevMoneyMonth = prevMoneyMonth;
window.prevMonth = prevMonth;
window.prevMonthStr = prevMonthStr;
window.profileAdults = profileAdults;
window.profileChildren = profileChildren;
window.quickAddMaint = quickAddMaint;
window.quickAddPantry = quickAddPantry;
window.redeemPrizeChildView = redeemPrizeChildView;
window.refreshReceiptCounts = refreshReceiptCounts;
window.rejectCompletion = rejectCompletion;
window.rejectRedemption = rejectRedemption;
window.removeActualEntry = removeActualEntry;
window.removeApiKey = removeApiKey;
window.removeCatFromGroup = removeCatFromGroup;
window.removeCategory = removeCategory;
window.removeHouseholdMember = removeHouseholdMember;
window.removePet = removePet;
window.removeReceipt = removeReceipt;
window.removeShopItem = removeShopItem;
window.renderAll = renderAll;
window.renderApprovals = renderApprovals;
window.renderBenchmarksSection = renderBenchmarksSection;
window.renderBills = renderBills;
window.renderBudget = renderBudget;
window.renderBudgetForecast = renderBudgetForecast;
window.renderBudgetSuggestions = renderBudgetSuggestions;
window.renderBuild = renderBuild;
window.renderCategoryBreakdown = renderCategoryBreakdown;
window.renderChoreMgmt = renderChoreMgmt;
window.renderDashboard = renderDashboard;
window.renderDocuments = renderDocuments;
window.renderDpCalendar = renderDpCalendar;
window.renderExpenseGroups = renderExpenseGroups;
window.renderForecast = renderForecast;
window.renderGoals = renderGoals;
window.renderInsightCards = renderInsightCards;
window.renderInsights = renderInsights;
window.renderKidView = renderKidView;
window.renderKids = renderKids;
window.renderKidsOverview = renderKidsOverview;
window.renderKidsParent = renderKidsParent;
window.renderLists = renderLists;
window.renderLunchbox = renderLunchbox;
window.renderMaintenance = renderMaintenance;
window.renderMeals = renderMeals;
window.renderMoneyDashboard = renderMoneyDashboard;
window.renderNWDebtCard = renderNWDebtCard;
window.renderNWTargetCard = renderNWTargetCard;
window.renderNWTrend = renderNWTrend;
window.renderNetWorth = renderNetWorth;
window.renderObStep = renderObStep;
window.renderPantry = renderPantry;
window.renderPlanner = renderPlanner;
window.renderPrizeMgmt = renderPrizeMgmt;
window.renderReceiptsList = renderReceiptsList;
window.renderRoutines = renderRoutines;
window.renderScenarios = renderScenarios;
window.renderSettings = renderSettings;
window.renderSetupProgress = renderSetupProgress;
window.renderSpendingPatterns = renderSpendingPatterns;
window.renderSubImportResults = renderSubImportResults;
window.renderSubscriptions = renderSubscriptions;
window.renderToday = renderToday;
window.renderVehicles = renderVehicles;
window.requestRedemption = requestRedemption;
window.resetAllData = resetAllData;
window.resetKidPinLock = resetKidPinLock;
window.revokeInvite = revokeInvite;
window.runAIInsights = runAIInsights;
window.runCsvCategorise = runCsvCategorise;
window.safeRender = safeRender;
window.sanitiseState = sanitiseState;
window.saveAIKey = saveAIKey;
window.saveApiKey = saveApiKey;
window.saveBill = saveBill;
window.saveChore = saveChore;
window.saveColors = saveColors;
window.saveData = saveData;
window.saveDoc = saveDoc;
window.saveKid = saveKid;
window.saveLbProfile = saveLbProfile;
window.saveMaint = saveMaint;
window.saveMealSlot = saveMealSlot;
window.saveNWItem = saveNWItem;
window.saveNWSnapshot = saveNWSnapshot;
window.saveNWTarget = saveNWTarget;
window.savePantryItem = savePantryItem;
window.savePlannerEvent = savePlannerEvent;
window.savePrize = savePrize;
window.saveQuickAdd = saveQuickAdd;
window.saveReceipt = saveReceipt;
window.saveService = saveService;
window.saveSettingsChanges = saveSettingsChanges;
window.saveSub = saveSub;
window.saveVehicle = saveVehicle;
window.scenarioForm = scenarioForm;
window.scenarioFromForm = scenarioFromForm;
window.sendInviteEmail = sendInviteEmail;
window.sendTotoMessage = sendTotoMessage;
window.setActual = setActual;
window.setAdultPin = setAdultPin;
window.setBillsFilter = setBillsFilter;
window.setBudgetView = setBudgetView;
window.setDeviceProfile = setDeviceProfile;
window.setExpenseFilter = setExpenseFilter;
window.setKidPin = setKidPin;
window.setKidSession = setKidSession;
window.setupProgressTasks = setupProgressTasks;
window.showChildView = showChildView;
window.showDeviceSetup = showDeviceSetup;
window.showOnboarding = showOnboarding;
window.showProfileSelector = showProfileSelector;
window.signInWithGoogle = signInWithGoogle;
window.signOutUser = signOutUser;
window.sortExpenses = sortExpenses;
window.stageForm = stageForm;
window.stageFromForm = stageFromForm;
window.startGuide = startGuide;
window.startHealthGuide = startHealthGuide;
window.subCatIcon = subCatIcon;
window.subMonthlyAmount = subMonthlyAmount;
window.suggestEventToBudget = suggestEventToBudget;
window.switchProfile = switchProfile;
window.switchToKidMode = switchToKidMode;
window.thSort = thSort;
window.toggleAdjFields = toggleAdjFields;
window.toggleBillDayField = toggleBillDayField;
window.toggleBudgetDetail = toggleBudgetDetail;
window.toggleCustomFreq = toggleCustomFreq;
window.toggleGoalFields = toggleGoalFields;
window.toggleGroupExpand = toggleGroupExpand;
window.toggleHealthPopover = toggleHealthPopover;
window.toggleInsightSheet = toggleInsightSheet;
window.toggleNavGroup = toggleNavGroup;
window.togglePlannerCard = togglePlannerCard;
window.togglePlannerEstimate = togglePlannerEstimate;
window.toggleScenario = toggleScenario;
window.toggleSettingsSection = toggleSettingsSection;
window.toggleShopItem = toggleShopItem;
window.toggleSidebar = toggleSidebar;
window.toggleTotoAssistant = toggleTotoAssistant;
window.uid = uid;
window.unpushEventFromBudget = unpushEventFromBudget;
window.updateCars = updateCars;
window.updateCategoryGroup = updateCategoryGroup;
window.updateColor = updateColor;
window.updateMember = updateMember;
window.updatePet = updatePet;
window.updateSetting = updateSetting;
window.upgradeSelects = upgradeSelects;
window.uploadFiles = uploadFiles;
window.uploadReceiptFiles = uploadReceiptFiles;
window.variationForm = variationForm;
window.variationFromForm = variationFromForm;
window.viewChildToday = viewChildToday;
window.viewReceipt = viewReceipt;

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
import {
  prevMoneyMonth, nextMoneyMonth, renderMoneyDashboard,
} from './sections/money-dashboard.js';
import {
  renderSetupProgress, renderToday, renderDashboard, toggleInsightSheet,
  _todayAllocSegments, _briefIcon, _chipClassFor, _chipLabelFor,
  _renderWeekStrip, _renderLifeAreas, _briefRow,
  _tdOpenHeadsUpSheet, _tdOpenSlippingSheet, _tdOpenSheet, _tdCloseSheet, _tdToggleStep,
  _lastBriefingDate, _cachedBriefing, _fetchAIBriefing,
} from './sections/today.js';
import {
  renderSettings, resetAllData, exportData, importData,
  toggleGroupExpand, setBudgetView,
} from './sections/settings.js';
import {
  GOAL_TYPES, expenseCategories, goalProgress, incomeCategories, renderBuild,
} from './sections/build.js';
import {
  ADJ_TYPES, COLORS_KEY, DEFAULT_COLORS, GROUP_ICONS, INSIGHTS_KEY, PROXY_URL,
  _checkSettingsUnsaved, _markSettingsDirty, _renderApiKeySummary,
  _settingsDirty, _settingsSnapshot,
  addCatToGroup, addCategory, addHouseholdMember, addPet,
  adjForm, calcScenario, cancelSettingsChanges, clearActivityLog,
  deleteAdjustment, deleteCategoryGroup, deleteGoal, deleteScenario,
  detectSpendingPatterns, generateSmartInsights, generateSmartInsightsHTML,
  getAIKey, getBenchmarkStatus, getBenchmarks, getCategoryHistoryData,
  goalForm, goalFromForm, loadColors, markGoalAchieved,
  nextInsightsMonth, prevInsightsMonth,
  openAddAdjustment, openAddCatToGroup, openAddCategoryGroup,
  openAddGoal, openAddScenario, openEditGoal, openEditScenario,
  openEmojiPickerModal, openIconPickerForGroup,
  profileAdults, profileChildren, removeApiKey, removeCatFromGroup,
  removeCategory, removeHouseholdMember, removePet,
  renderBenchmarksSection, renderCategoryBreakdown, renderGoals,
  renderInsightCards, renderInsights, renderScenarios, renderSpendingPatterns,
  runAIInsights, saveAIKey, saveApiKey, saveColors, saveSettingsChanges,
  scenarioForm, scenarioFromForm,
  toggleAdjFields, toggleGoalFields, toggleScenario, toggleSettingsSection,
  updateCars, updateCategoryGroup, updateColor, updateMember, updatePet, updateSetting,
} from './sections/insights.js';
import {
  EXTRA_STATUSES, _allocExpanded, _budgetAllocByCategory, _budgetDetailOpen, _categoryIcon,
  _ticker, closeModal, openModal,
  deleteExpense, deleteExtra, deleteIncome, deleteStage, deleteVariation,
  expenseForm, expenseFromForm, extraForm, extraFromForm,
  incomeForm, incomeFromForm,
  openAddExpense, openAddExtra, openAddIncome, openAddStage, openAddVariation,
  openEditContractTotal, openEditExpense, openEditExtra, openEditIncome,
  openEditStage, openEditVariation,
  renderBudget, renderExpenseGroups,
  stageForm, stageFromForm, toggleBudgetDetail, toggleCustomFreq,
  variationForm, variationFromForm,
} from './sections/budget.js';

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

// → src/sections/money-dashboard.js
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

// → src/sections/today.js
// BUILD COSTS
// ─────────────────────────────────────────────────

// → src/sections/build.js
// → src/sections/insights.js
// → src/sections/budget.js
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

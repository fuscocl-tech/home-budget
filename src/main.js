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
  _forecastMonth, _prevForecastMonth, _nextForecastMonth,
  _recurrenceMatchesDate,
} from './sections/planner-utils.js';
import { renderForecast, estimateAllEvents } from './sections/forecast.js';
import {
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
  renderPlanner, renderBudgetSuggestions, renderBudgetForecast,
  _pushAllEventsToBudget, suggestEventToBudget, unpushEventFromBudget,
  estimatePlannerEvent, togglePlannerCard, togglePlannerEstimate,
  _autoCreateRecurringEvents, _addRecurrenceToDate, _getNthDayOfMonth, getSeasonalNudges,
  goToPlannerDay, _renderNudgeSection, approveSuggestion, dismissSuggestion,
  _plannerCloseDaySheet,
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
  ADJ_TYPES,
  adjForm, calcScenario, deleteAdjustment, deleteGoal, deleteScenario,
  goalForm, goalFromForm, markGoalAchieved,
  openAddAdjustment, openAddGoal, openAddScenario, openEditGoal, openEditScenario,
  renderGoals, renderScenarios, scenarioForm, scenarioFromForm,
  toggleAdjFields, toggleGoalFields, toggleScenario,
} from './sections/goals-scenarios.js';
import {
  COLORS_KEY, DEFAULT_COLORS, GROUP_ICONS, INSIGHTS_KEY, PROXY_URL,
  _checkSettingsUnsaved, _markSettingsDirty, _renderApiKeySummary,
  _settingsDirty, _settingsSnapshot,
  addCatToGroup, addCategory, addHouseholdMember, addPet,
  cancelSettingsChanges, clearActivityLog,
  deleteCategoryGroup,
  detectSpendingPatterns, generateSmartInsights, generateSmartInsightsHTML,
  getAIKey, getBenchmarkStatus, getBenchmarks, getCategoryHistoryData,
  loadColors,
  nextInsightsMonth, prevInsightsMonth,
  openAddCatToGroup, openAddCategoryGroup,
  openEmojiPickerModal, openIconPickerForGroup,
  profileAdults, profileChildren, removeApiKey, removeCatFromGroup,
  removeCategory, removeHouseholdMember, removePet,
  renderBenchmarksSection, renderCategoryBreakdown,
  renderInsightCards, renderInsights, renderSpendingPatterns,
  runAIInsights, saveAIKey, saveApiKey, saveColors, saveSettingsChanges,
  toggleSettingsSection,
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
import {
  dpDateInput, openDatePicker, renderDpCalendar,
  dpPrevMonth, dpNextMonth, dpSelectDate, dpClearDate,
} from './sections/date-picker.js';
import {
  openCsvImport, parseBankCSV, handleCsvFile, _renderCsvPreview, runCsvCategorise,
  _renderCsvReview, _csvToggle, _csvToggleAll, _csvSetExpense, _csvUpdateApplyBtn, applyCsvImport,
} from './sections/csv-import.js';
import {
  openQuickAdd, closeQuickAdd, _renderQAHub, _qahAction, _qahSendText, _qahApplyParsed,
  _renderQASheet, _qaKey, _qaSelectCat, saveQuickAdd,
} from './sections/quick-add.js';
import {
  _applyChildNav, _cvAgeBracket, _cvTimeGreeting, _cvRoutineIsActive, _cvRoutineAvailLabel,
  _cvConfetti, _cvUpdatePrizesBadge, _cvRenderPrizesTab, _cvSwitchTab, _cvEventsForDate,
  _cvFmt12h, _cvToggleRoutineExpand, _cvToggleStepFromCal, _cvRefreshSchedulePanel,
  _cvScheduleHtml, _cvRoutineSchedCard, _cvRenderCalendar, _cvCalViewToggle,
  _cvRender7Day, _cvWeekDayTap, _cvRenderMonth, _cvMonthDayTap, _cvShowDayDetail,
  _cvDismissNotif, _cvShowPrizeConfirm, markChoreChildView, redeemPrizeChildView, switchToKidMode,
  _adultPinKey, _adultPinSubmit, _adultPinStep, _adultPinFirst, _adultPinTarget, _adultPinBuf,
  _cvActiveKidId, _cvSelectedDate, _cvExpandedRoutines, _cvActiveTab,
  _renderAdultPinModal, setKidPin, clearAdultPin, setAdultPin, showChildView, switchProfile,
  clearKidPin, _cvCalView,
} from './sections/child-view.js';
import {
  _devToolsOpen, _devToolsClose, _devLoadWallet, _devLoadKids, _devLoadRoutines,
  _devLoadPlanner, _devLoadHome, _devLoadMeals, _devLoadAll, _devReset,
} from './sections/dev-tools.js';
import { renderLunchbox, LB_SLOTS, LB_ALLERGIES, _lbActiveKid, _lbWeekOffset,
  _saveLbSlot, aiPlanLunchbox, deleteLbProfile, lbToShoppingList, openLunchboxEdit,
  openLunchboxProfile, saveLbProfile, _estimateLbCalories, toggleHealthPopover,
} from './sections/lunchbox.js';
import {
  HEALTH_GUIDES, _cleanupGuide, _cvViewCalendar, _guideCleanup, _guideIdx, _guideSteps,
  _highlightStep, startGuide, startHealthGuide, nextGuideStep, endGuide, _showGuideStep,
  _cvReadOnly, exitChildView, viewChildToday,
} from './sections/guide.js';
import {
  renderRoutines, _routineCheckDailyReset, _routineMatchesDate, _routinesForCurrentUser,
  _routinesForHousehold, _routineCurrentUserId, _routineKids, _routineOtherAdults,
  _routineIsOwner, _routineTodayKey, _routineDateKey, _routineGetAssignment,
  _routineCompletedToday, _routineStreak, _routineHistory, _assignmentCompletedToday,
  _assignmentHistory, _assignmentStreak, _routineToggleStep, _routineToggleStepKid,
  _routineToggleSugg, _routineExpandSugg, _routineSetTab, _routineCreate, _routineEdit,
  _routineDelete, _routineDeleteChild, _routineJoin, _routineLeave, _routineUnassign,
  _routineManageAssignments, _routineToggleAssignment, _routineAddStep, _routineDeleteStep,
  _routineEditStep, _routinePropagateStepAdd, _routinePropagateStepDelete, _routineTypeSelect,
  _routineRecurrenceFormHtml, _routineRecurrenceTypeChange, _routineRecurrenceCollect,
  _routineRecurrenceSummaryUpdate, _routineSaveValidated, _routineAssertScope,
  _routineShareMenu, _routineToggleShare, _routineDuplicateTo, _routineDuplicateFromJoined,
  _routinePauseMenu, _routineRemovePause, _routineSkipDay, _routineShowHistory,
  _routineIntelNudge, _routineAwardPoints, _routineAwardStepPoints, _routineAddSuggestion,
  _routineEditSuggestion, _routineAvailableSuggestions, _routineNextId, _routineResetToday,
  _routineResetTodayKid, _routineResetTodayAllKids, _renderAdultRoutines, _renderChildRoutines,
  _renderRoutinesTodayCard, _renderSuggestionsSection, _routineDragStart, _routineDragOver,
  _routineDragEnd, _routineDrop, ROUTINE_SUGGESTIONS, SUGG_PREVIEW,
  _routineSuggCollapsed, _routineSuggExpanded, _routineActiveTab, _routineDragIdx,
} from './sections/routines.js';
import {
  renderKids, renderKidsParent, renderKidsOverview, renderChoreMgmt, renderPrizeMgmt,
  renderApprovals, renderKidView, _renderChildEventsMgmt, _deleteChildEvent,
  _openChildEventModal, approveCompletion, rejectCompletion, approveRedemption,
  rejectRedemption, deleteChore, deletePrize, deleteKid, openAddKidModal, openEditKidModal,
  saveKid, openChoreModal, saveChore, openPrizeModal, savePrize, requestRedemption,
  markChoreDone, addSavings, openSavingsModal, emojiPicker, pickEmoji, pickedEmoji,
  kidBalance, CHILD_EVENT_EMOJIS, CHORE_EMOJIS, KID_EMOJIS, PRIZE_EMOJIS,
  kidsView, kidsParentTab,
} from './sections/kids.js';
import {
  getDB, refreshReceiptCounts, getReceipts, saveReceipt, deleteReceiptById, fundingBadge,
  attachBtn, fileSizeStr, fileIcon, openReceiptsModal, renderReceiptsList, addLink,
  uploadReceiptFiles, uploadFiles, viewReceipt, removeReceipt, installApp,
} from './sections/receipts.js';
import {
  hideOnboarding, showOnboarding, obBack, obFinish, obNext, obPickEmoji, obSetAdults,
  obSetKids, obSkip, obSkipExpenses, obStepPosition, obStepSequence, obToggleEmojiPicker,
  obToggleExpenseSkip, renderObStep, OB_EXPENSE_PRESETS,
} from './sections/onboarding.js';

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
Object.defineProperty(window, '_fsUnsubscribe', { get() { return _fsUnsubscribe; }, set(v) { _fsUnsubscribe = v; }, configurable: true });
let _pendingLogEntry = null;
Object.defineProperty(window, '_pendingLogEntry', { get() { return _pendingLogEntry; }, set(v) { _pendingLogEntry = v; }, configurable: true });
Object.defineProperty(window, '_currentUser', { get() { return _currentUser; }, set(v) { _currentUser = v; }, configurable: true });

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

async function guestMode() {
  _guestMode = true;
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.add('hidden');
  await _prewarmReady;
  if (!state.onboarded) {
    state.onboarded = true;
    saveData(state);
  }
  const _hashTab = location.hash.slice(1);
  if (_hashTab && document.getElementById('tab-' + _hashTab)) {
    history.replaceState({ tab: _hashTab }, '', '#' + _hashTab);
    _activateTabInternal(_hashTab);
  } else {
    renderAll();
  }
  handleDeviceRouting();
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

  // Fix household routines saved with ownerId="dev" by dev-tools fixture
  if (d.routines) {
    d.routines.forEach(function(r) {
      if (r.ownerType === 'household' && r.ownerId !== 'household') r.ownerId = 'household';
    });
  }

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
      _secureSet(STORAGE_KEY, JSON.stringify(state));
    } else {
      // New household — check if there's legacy data to migrate from family/shared
      const legacy = await fbStore.collection('family').doc('shared').get().catch(() => null);
      if (legacy && legacy.exists) {
        const d = _applyMigrations(legacy.data());
        Object.assign(state, d);
        docRef.set(state).catch(() => {});
        _secureSet(STORAGE_KEY, JSON.stringify(state));
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
        state.onboarded = true;
        saveData(state);
      }
      const pendingToken    = sessionStorage.getItem(_PENDING_INVITE_KEY);
      const postInviteToken = sessionStorage.getItem('toto_post_invite_action');
      if (pendingToken || postInviteToken) {
        sessionStorage.removeItem('toto_post_invite_action');
        _handlePendingInvite();
      } else {
        handleDeviceRouting();
      }
    });
  }, err => {
    console.error('Firestore sync error:', err);
    renderAll();
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
window.STORAGE_KEY = STORAGE_KEY;

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
    const raw = _secureGet(STORAGE_KEY);
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
    // Remove routines with missing/null IDs — they can never be correctly targeted
    d.routines = d.routines.filter(r => r.id != null && r.id !== 'null' && r.id !== '');
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
  _secureSet(STORAGE_KEY, JSON.stringify(data));
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
// Expose mutable state that child-view.js (a separate ES module) needs to read/write.
Object.defineProperty(window, '_activeProfile',     { get() { return _activeProfile; },     set(v) { _activeProfile = v; },     configurable: true });
Object.defineProperty(window, '_deviceRoutingDone', { get() { return _deviceRoutingDone; }, set(v) { _deviceRoutingDone = v; }, configurable: true });
Object.defineProperty(window, '_pinAttempts',       { get() { return _pinAttempts; },       set(v) { _pinAttempts = v; },       configurable: true });
Object.defineProperty(window, '_pinBuffer',         { get() { return _pinBuffer; },         set(v) { _pinBuffer = v; },         configurable: true });
Object.defineProperty(window, '_pinTargetId',       { get() { return _pinTargetId; },       set(v) { _pinTargetId = v; },       configurable: true });

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
const _prewarmReady = _securePrewarm([
  HOUSEHOLD_OWNER_KEY,
  DEVICE_KEY,
  KID_SESSION_KEY,
  STORAGE_KEY,
  'toto_ai_key',
  'toto_ai_key_meta',
  'toto_qa_last',
  'home_finance_colors_v1',
]);

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

// → src/sections/child-view.js
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
Object.defineProperty(window, '_scopePending', { get() { return _scopePending; }, set(v) { _scopePending = v; }, configurable: true });

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

function safeRender(fn) {
  try {
    fn();
  } catch(e) {
    const msg = e?.message || String(e);
    const stack = e?.stack || '';
    console.error('Render error in ' + (fn.name || '?') + ': ' + msg + '\n' + stack);
    if (typeof Sentry !== 'undefined') {
      Sentry.withScope(scope => {
        scope.setTag('renderer', fn.name || 'anonymous');
        Sentry.captureException(e);
      });
    }
  }
}

// Use arrow wrappers so undefined renderers don't crash module init.
const _TAB_RENDERERS = {
  today:       [() => renderToday()],
  money:       [() => renderMoneyDashboard()],
  dashboard:   [() => renderDashboard()],
  budget:      [() => renderBudget()],
  bills:       [() => renderBills()],
  networth:    [() => renderNetWorth()],
  goals:       [() => renderGoals()],
  scenarios:   [() => renderScenarios()],
  insights:    [() => renderInsights()],
  build:       [() => renderBuild()],
  settings:    [() => renderSettings()],
  kids:        [() => renderKids()],
  planner:     [() => renderPlanner()],
  forecast:    [() => renderForecast()],
  meals:       [() => renderMeals()],
  lunchbox:    [() => renderLunchbox()],
  pantry:      [() => renderPantry()],
  vehicles:    [() => renderVehicles()],
  documents:   [() => renderDocuments()],
  maintenance: [() => renderMaintenance()],
  routines:    [() => renderRoutines()],
  lists:       [() => renderLists()],
};

let _splashHidden = false;
function renderAll() {
  _applyChildNav();
  safeRender(renderToday);
  const active = _activeTab();
  const fns = _TAB_RENDERERS[active];
  if (fns) fns.forEach(fn => safeRender(fn));
  if (!_splashHidden) {
    _splashHidden = true;
    window.Capacitor?.Plugins?.SplashScreen?.hide().catch(() => {});
  }
}
subscribe(renderAll);
setRenderCallback(renderAll);
registerSectionRenderers(_TAB_RENDERERS, renderAll);

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

_initState(loadData());
// `state` is the Proxy from store.js — all existing `state.x` reads/writes work unchanged.
_checkInviteOnLoad(); // run immediately on script parse — strips ?invite= from URL
// Daily routine reset check — clears stale completion records if past reset hour
setTimeout(() => { try { _routineCheckDailyReset(); } catch(e) {} }, 0);
let selectedBudgetMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
let budgetViewMode = 'grouped'; // 'grouped' | 'table'
Object.defineProperty(window, 'budgetViewMode', { get() { return budgetViewMode; }, set(v) { budgetViewMode = v; }, configurable: true });
Object.defineProperty(window, 'selectedBudgetMonth', { get() { return selectedBudgetMonth; }, set(v) { selectedBudgetMonth = v; }, configurable: true });
let _settingsOpen = new Set(['ai', 'household']); // accordion open sections
window._settingsOpen = _settingsOpen; // Set reference — mutations visible everywhere
let _billsSubsFilter = 'all'; // 'all' | 'bills' | 'subs'
Object.defineProperty(window, '_billsSubsFilter', { get() { return _billsSubsFilter; }, set(v) { _billsSubsFilter = v; }, configurable: true });

// ─── Mini date picker ─────────────────────────────
let dpViewYear = new Date().getFullYear();
Object.defineProperty(window, 'dpViewYear', { get() { return dpViewYear; }, set(v) { dpViewYear = v; }, configurable: true });
let dpViewMonth = new Date().getMonth() + 1;
Object.defineProperty(window, 'dpViewMonth', { get() { return dpViewMonth; }, set(v) { dpViewMonth = v; }, configurable: true });

// → src/sections/date-picker.js
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
// → src/sections/csv-import.js
// → src/sections/quick-add.js
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
Object.defineProperty(window, '_spExpanded', { get() { return _spExpanded; }, set(v) { _spExpanded = v; }, configurable: true });
let _spDoneExpanded = false;
Object.defineProperty(window, '_spDoneExpanded', { get() { return _spDoneExpanded; }, set(v) { _spDoneExpanded = v; }, configurable: true });

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
Object.defineProperty(window, 'expenseSortCol', { get() { return expenseSortCol; }, set(v) { expenseSortCol = v; }, configurable: true });
let expenseSortDir = 'asc';
Object.defineProperty(window, 'expenseSortDir', { get() { return expenseSortDir; }, set(v) { expenseSortDir = v; }, configurable: true });
let expenseFilterCat = 'all';
Object.defineProperty(window, 'expenseFilterCat', { get() { return expenseFilterCat; }, set(v) { expenseFilterCat = v; }, configurable: true });

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
Object.defineProperty(window, '_mealView', { get() { return _mealView; }, set(v) { _mealView = v; }, configurable: true });
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
// → src/sections/dev-tools.js
// Init — rendering is triggered by Firestore onSnapshot after auth resolves

// ── Expose all app functions as globals for HTML onclick attributes ──────────
window._acceptInviteAndContinue = _acceptInviteAndContinue;
window._addRecurrenceToDate = _addRecurrenceToDate;
window._adultPinKey = _adultPinKey;
window._adultPinSubmit = _adultPinSubmit;
window._applyActiveProfile = _applyActiveProfile;
window._applyChildNav = _applyChildNav;
window._applyMigrations = _applyMigrations;
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
window._cvWeekDayTap = _cvWeekDayTap;
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
window._refreshSetupProgress = _refreshSetupProgress;
window._renderAdultPinModal = _renderAdultPinModal;
window._renderApiKeySummary = _renderApiKeySummary;
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
window._renderShoppingList = _renderShoppingList;
window._renderTourSlide = _renderTourSlide;
window._renderWeekStrip = _renderWeekStrip;
window._resetPinAttempts = _resetPinAttempts;
window._saveInviteIncome = _saveInviteIncome;
window._sectionTag = _sectionTag;
window._secureClear = _secureClear;
window._secureGet = _secureGet;
window._securePrewarm = _securePrewarm;
window._secureSet = _secureSet;
// Aliases used by inline onclick/oninput strings in section templates
window.prefsGet = _secureGet;
window.prefsSet = _secureSet;
window.prefsClear = _secureClear;
window._setHouseholdOwner = _setHouseholdOwner;
window._setInviteRole = _setInviteRole;
window._setPinHardLock = _setPinHardLock;
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
window._updatePillsOverflow = _updatePillsOverflow;
window._updateSwitchBtn = _updateSwitchBtn;
window._verifyPin = _verifyPin;
window.activateTab = activateTab;
window.addActualEntry = addActualEntry;
window.addCatToGroup = addCatToGroup;
window.addCategory = addCategory;
window.addHouseholdMember = addHouseholdMember;
window.addPet = addPet;
window.addShopItem = addShopItem;
window.addSubFromImport = addSubFromImport;
window.adjForm = adjForm;
window.applianceForm = applianceForm;
window.applianceFromForm = applianceFromForm;
window.applyCsvImport = applyCsvImport;
window.approveSuggestion = approveSuggestion;
window.assignDevice = assignDevice;
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
window.deleteDoc = deleteDoc;
window.deleteExpense = deleteExpense;
window.deleteExtra = deleteExtra;
window.deleteFurniture = deleteFurniture;
window.deleteGoal = deleteGoal;
window.deleteIncome = deleteIncome;
window.deleteMaint = deleteMaint;
window.deleteNWItem = deleteNWItem;
window.deletePantryItem = deletePantryItem;
window.deletePlannerEvent = deletePlannerEvent;
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
window.ensureMonthOverride = ensureMonthOverride;
window.escAttr = escAttr;
window.escHtml = escHtml;
window.estimateAllEvents = estimateAllEvents;
window.estimatePlannerEvent = estimatePlannerEvent;
window.expenseCategories = expenseCategories;
window.expenseForm = expenseForm;
window.expenseFromForm = expenseFromForm;
window.exportData = exportData;
window.extraForm = extraForm;
window.extraFromForm = extraFromForm;
window.fmtDate = fmtDate;
window.fmtNW = fmtNW;
window.freqDisplay = freqDisplay;
window.freqDisplayItem = freqDisplayItem;
window.freqLabel = freqLabel;
window.freqLabelItem = freqLabelItem;
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
window.getDeviceProfile = getDeviceProfile;
window.getKidSession = getKidSession;
window.getLast6Months = getLast6Months;
window.getMonthData = getMonthData;
window.getSeasonalNudges = getSeasonalNudges;
window.goToPlannerDay = goToPlannerDay;
window.goalForm = goalForm;
window.goalFromForm = goalFromForm;
window.goalProgress = goalProgress;
window.guestMode = guestMode;
window.handleCsvFile = handleCsvFile;
window.handleDeviceRouting = handleDeviceRouting;
window.handleSubCSV = handleSubCSV;
window.importData = importData;
window.incomeCategories = incomeCategories;
window.incomeForm = incomeForm;
window.incomeFromForm = incomeFromForm;
window.inviteMember = inviteMember;
window.isMonthCustomized = isMonthCustomized;
window.isOverdue = isOverdue;
window.itemMonthly = itemMonthly;
window.loadColors = loadColors;
window.loadData = loadData;
window.logActivity = logActivity;
window.markBillPaid = markBillPaid;
window.markChoreChildView = markChoreChildView;
window.markGoalAchieved = markGoalAchieved;
window.markMaintDone = markMaintDone;
window.monthLabel = monthLabel;
window.monthShortLabel = monthShortLabel;
window.monthlyTotal = monthlyTotal;
window.nextId = nextId;
window.nextInsightsMonth = nextInsightsMonth;
window.nextMoneyMonth = nextMoneyMonth;
window.nextMonth = nextMonth;
window.nwItemRow = nwItemRow;
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
window.openAddScenario = openAddScenario;
window.openAddStage = openAddStage;
window.openAddVariation = openAddVariation;
window.openBillModal = openBillModal;
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
window.openEditScenario = openEditScenario;
window.openEditStage = openEditStage;
window.openEditVariation = openEditVariation;
window.openEmojiPickerModal = openEmojiPickerModal;
window.openIconPickerForGroup = openIconPickerForGroup;
window.openMaintForm = openMaintForm;
window.openMealEdit = openMealEdit;
window.openModal = openModal;
window.openNWModal = openNWModal;
window.openNWTargetModal = openNWTargetModal;
window.openNavGroupFor = openNavGroupFor;
window.openPantryForm = openPantryForm;
window.openPinSetup = openPinSetup;
window.openPlannerModal = openPlannerModal;
window.openQuickAdd = openQuickAdd;
window.openServiceForm = openServiceForm;
window.openSubModal = openSubModal;
window.openTotoAssistant = openTotoAssistant;
window.openVehicleForm = openVehicleForm;
window.openWeeklyReset = openWeeklyReset;
window.ordinal = ordinal;
window.pantryToShoppingList = pantryToShoppingList;
window.parseBankCSV = parseBankCSV;
window.prevInsightsMonth = prevInsightsMonth;
window.prevMoneyMonth = prevMoneyMonth;
window.prevMonth = prevMonth;
window.prevMonthStr = prevMonthStr;
window.profileAdults = profileAdults;
window.profileChildren = profileChildren;
window.quickAddMaint = quickAddMaint;
window.quickAddPantry = quickAddPantry;
window.redeemPrizeChildView = redeemPrizeChildView;
window.removeActualEntry = removeActualEntry;
window.removeApiKey = removeApiKey;
window.removeCatFromGroup = removeCatFromGroup;
window.removeCategory = removeCategory;
window.removeHouseholdMember = removeHouseholdMember;
window.removePet = removePet;
window.removeShopItem = removeShopItem;
window.renderAll = renderAll;
window.renderBenchmarksSection = renderBenchmarksSection;
window.renderBills = renderBills;
window.renderBudget = renderBudget;
window.renderBudgetForecast = renderBudgetForecast;
window.renderBudgetSuggestions = renderBudgetSuggestions;
window.renderBuild = renderBuild;
window.renderCategoryBreakdown = renderCategoryBreakdown;
window.renderDashboard = renderDashboard;
window.renderDocuments = renderDocuments;
window.renderDpCalendar = renderDpCalendar;
window.renderExpenseGroups = renderExpenseGroups;
window.renderForecast = renderForecast;
window.renderGoals = renderGoals;
window.renderInsightCards = renderInsightCards;
window.renderInsights = renderInsights;
window.renderLists = renderLists;
window.renderLunchbox = renderLunchbox;
window.renderMaintenance = renderMaintenance;
window.renderMeals = renderMeals;
window.renderMoneyDashboard = renderMoneyDashboard;
window.renderNWDebtCard = renderNWDebtCard;
window.renderNWTargetCard = renderNWTargetCard;
window.renderNWTrend = renderNWTrend;
window.renderNetWorth = renderNetWorth;
window.renderPantry = renderPantry;
window.renderPlanner = renderPlanner;
window.renderRoutines = renderRoutines;
window.renderScenarios = renderScenarios;
window.renderSettings = renderSettings;
window.renderSetupProgress = renderSetupProgress;
window.renderSpendingPatterns = renderSpendingPatterns;
window.renderSubImportResults = renderSubImportResults;
window.renderSubscriptions = renderSubscriptions;
window.renderToday = renderToday;
window.renderVehicles = renderVehicles;
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
window.saveColors = saveColors;
window.saveData = saveData;
window.saveDoc = saveDoc;
window.saveMaint = saveMaint;
window.saveMealSlot = saveMealSlot;
window.saveNWItem = saveNWItem;
window.saveNWSnapshot = saveNWSnapshot;
window.saveNWTarget = saveNWTarget;
window.savePantryItem = savePantryItem;
window.savePlannerEvent = savePlannerEvent;
window.saveQuickAdd = saveQuickAdd;
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
window.showProfileSelector = showProfileSelector;
window.signInWithGoogle = signInWithGoogle;
window.signOutUser = signOutUser;
window.sortExpenses = sortExpenses;
window.stageForm = stageForm;
window.stageFromForm = stageFromForm;
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
window.DEFAULT_DATA = DEFAULT_DATA;
window.unpushEventFromBudget = unpushEventFromBudget;
window.updateCars = updateCars;
window.updateCategoryGroup = updateCategoryGroup;
window.updateColor = updateColor;
window.updateMember = updateMember;
window.updatePet = updatePet;
window.updateSetting = updateSetting;
window.upgradeSelects = upgradeSelects;
window.variationForm = variationForm;
window.variationFromForm = variationFromForm;

// ── Lunchbox ──────────────────────────────────────────────────────────────
window.LB_ALLERGIES = LB_ALLERGIES;
window.LB_SLOTS = LB_SLOTS;
window._estimateLbCalories = _estimateLbCalories;
window._lbActiveKid = _lbActiveKid;
window._lbWeekOffset = _lbWeekOffset;
window._saveLbSlot = _saveLbSlot;
window.aiPlanLunchbox = aiPlanLunchbox;
window.deleteLbProfile = deleteLbProfile;
window.lbToShoppingList = lbToShoppingList;
window.openLunchboxEdit = openLunchboxEdit;
window.openLunchboxProfile = openLunchboxProfile;
window.saveLbProfile = saveLbProfile;
// ── Guide ─────────────────────────────────────────────────────────────────
window.HEALTH_GUIDES = HEALTH_GUIDES;
window._cleanupGuide = _cleanupGuide;
window._cvReadOnly = _cvReadOnly;
window._cvViewCalendar = _cvViewCalendar;
window._guideCleanup = _guideCleanup;
window._guideIdx = _guideIdx;
window._guideSteps = _guideSteps;
window._highlightStep = _highlightStep;
window._recurrenceMatchesDate = _recurrenceMatchesDate;
window._showGuideStep = _showGuideStep;
window.endGuide = endGuide;
window.exitChildView = exitChildView;
window.nextGuideStep = nextGuideStep;
window.startGuide = startGuide;
window.startHealthGuide = startHealthGuide;
window.toggleHealthPopover = toggleHealthPopover;
window.viewChildToday = viewChildToday;
// ── Routines ──────────────────────────────────────────────────────────────
window.ROUTINE_SUGGESTIONS = ROUTINE_SUGGESTIONS;
window.SUGG_PREVIEW = SUGG_PREVIEW;
window._assignmentCompletedToday = _assignmentCompletedToday;
window._assignmentHistory = _assignmentHistory;
window._assignmentStreak = _assignmentStreak;
window._renderAdultRoutines = _renderAdultRoutines;
window._renderChildRoutines = _renderChildRoutines;
window._renderRoutinesTodayCard = _renderRoutinesTodayCard;
window._renderSuggestionsSection = _renderSuggestionsSection;
window._routineActiveTab = _routineActiveTab;
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
window._routineDragIdx = _routineDragIdx;
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
window._routineSuggCollapsed = _routineSuggCollapsed;
window._routineSuggExpanded = _routineSuggExpanded;
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
// ── Kids ──────────────────────────────────────────────────────────────────
window.CHILD_EVENT_EMOJIS = CHILD_EVENT_EMOJIS;
window.CHORE_EMOJIS = CHORE_EMOJIS;
window.KID_EMOJIS = KID_EMOJIS;
window.PRIZE_EMOJIS = PRIZE_EMOJIS;
window._deleteChildEvent = _deleteChildEvent;
window._openChildEventModal = _openChildEventModal;
window._renderChildEventsMgmt = _renderChildEventsMgmt;
window.addSavings = addSavings;
window.approveCompletion = approveCompletion;
window.approveRedemption = approveRedemption;
window.deleteChore = deleteChore;
window.deleteKid = deleteKid;
window.deletePrize = deletePrize;
window.emojiPicker = emojiPicker;
window.kidBalance = kidBalance;
window.kidsParentTab = kidsParentTab;
window.kidsView = kidsView;
window.markChoreDone = markChoreDone;
window.openAddKidModal = openAddKidModal;
window.openChoreModal = openChoreModal;
window.openEditKidModal = openEditKidModal;
window.openPrizeModal = openPrizeModal;
window.openSavingsModal = openSavingsModal;
window.pickEmoji = pickEmoji;
window.pickedEmoji = pickedEmoji;
window.rejectCompletion = rejectCompletion;
window.rejectRedemption = rejectRedemption;
window.renderApprovals = renderApprovals;
window.renderChoreMgmt = renderChoreMgmt;
window.renderKidView = renderKidView;
window.renderKids = renderKids;
window.renderKidsOverview = renderKidsOverview;
window.renderKidsParent = renderKidsParent;
window.renderPrizeMgmt = renderPrizeMgmt;
window.requestRedemption = requestRedemption;
window.saveChore = saveChore;
window.saveKid = saveKid;
window.savePrize = savePrize;
// ── Receipts ──────────────────────────────────────────────────────────────
window.addLink = addLink;
window.attachBtn = attachBtn;
window.deleteReceiptById = deleteReceiptById;
window.fileIcon = fileIcon;
window.fileSizeStr = fileSizeStr;
window.fundingBadge = fundingBadge;
window.getDB = getDB;
window.getReceipts = getReceipts;
window.installApp = installApp;
window.openReceiptsModal = openReceiptsModal;
window.refreshReceiptCounts = refreshReceiptCounts;
window.removeReceipt = removeReceipt;
window.renderReceiptsList = renderReceiptsList;
window.saveReceipt = saveReceipt;
window.uploadFiles = uploadFiles;
window.uploadReceiptFiles = uploadReceiptFiles;
window.viewReceipt = viewReceipt;
// ── Onboarding ────────────────────────────────────────────────────────────
window.OB_EXPENSE_PRESETS = OB_EXPENSE_PRESETS;
window.hideOnboarding = hideOnboarding;
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
window.renderObStep = renderObStep;
window.showOnboarding = showOnboarding;

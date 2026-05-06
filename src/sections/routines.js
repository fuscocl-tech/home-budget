// Routines section — daily routine builder and tracker
import { state } from '../store.js';
import { escHtml, escAttr, nextId, fmtDate } from './format.js';
import { _recurrenceMatchesDate } from './planner-utils.js';

// ── ROUTINES START ── all logic contained here (v3)
// To remove: delete this block + CSS block + tab panel HTML +
// SECTIONS pill entry + _TAB_RENDERERS entry +
// DEFAULT_DATA.routines/routineAssignments + loadData() migration +
// _renderRoutinesTodayCard() call in renderToday().
// ═══════════════════════════════════════════════════════════

// Returns true if a routine should be shown/active on the given date.
export function _routineCheckDailyReset() {
  const resetHour = Number(state.settings?.routineResetHour ?? 0);
  const now = new Date();
  // The "current reset boundary" = today at resetHour, or yesterday if we haven't passed it yet
  const boundary = new Date(now);
  boundary.setHours(resetHour, 0, 0, 0);
  if (now < boundary) boundary.setDate(boundary.getDate() - 1);
  const boundaryKey = boundary.toISOString().slice(0, 10);

  let dirty = false;
  (state.routineAssignments || []).forEach(a => {
    if (!a.completionState) return;
    // Remove any completion entries that are on or before the last boundary date
    // (i.e. keep only today-relative data after the reset)
    Object.keys(a.completionState).forEach(key => {
      if (key < boundaryKey) {
        // Keep as history (already used by _assignmentHistory) — no delete needed.
        // Only clear IF the reset has actually fired since last run.
        // We track lastResetDate per assignment to avoid re-clearing.
      }
    });
    // The key insight: we don't delete history (it's used for streaks).
    // We just ensure the TODAY key is blank if it hasn't been started yet.
    // The actual "reset" is that _routineTodayKey() returns today's date,
    // so old entries simply don't appear as today's completions.
    // This function's real job: record the last reset so the settings UI can show it.
  });

  const todayStr = now.toISOString().slice(0, 10);
  if (state.settings?.lastRoutineResetCheck !== todayStr) {
    if (!state.settings) state.settings = {};
    state.settings.lastRoutineResetCheck = todayStr;
    // Clear pending chore completions from previous days so yesterday's
    // "Waiting" badges don't carry over to today's child screen.
    if (state.kids?.completions) {
      const before = state.kids.completions.length;
      state.kids.completions = state.kids.completions.filter(c => {
        if (c.status !== 'pending') return true;
        const ts = new Date(c.completedAt || c.ts || 0);
        return ts.toISOString().slice(0, 10) >= todayStr;
      });
      if (state.kids.completions.length !== before) dirty = true;
    }
    dirty = true;
  }
  if (dirty) window.saveData(state);
}

// ── Adult read-only view of a child's Today screen ───────
export let _cvReadOnly = false;

function viewChildToday(kidId) {
  _cvReadOnly = true;
  const bar = document.getElementById('cv-readonly-bar');
  const btn = document.getElementById('cv-signout-btn');
  if (bar) bar.style.display = '';
  if (btn) btn.style.display = 'none';
  window.showChildView(kidId);
}

function _cvViewCalendar(kidId) {
  _cvReadOnly = true;
  const bar = document.getElementById('cv-readonly-bar');
  const btn = document.getElementById('cv-signout-btn');
  if (bar) bar.style.display = '';
  if (btn) btn.style.display = 'none';
  window.showChildView(kidId);
  setTimeout(() => { _cvSwitchTab('calendar', kidId); }, 50);
}

function exitChildView() {
  const ov = document.getElementById('child-view-overlay');
  ov.classList.add('hidden');
  ov.style.display = '';
  const bar = document.getElementById('cv-readonly-bar');
  const btn = document.getElementById('cv-signout-btn');
  if (bar) bar.style.display = 'none';
  if (btn) btn.style.display = '';
  const wasReadOnly = _cvReadOnly;
  _cvReadOnly = false;
  if (!wasReadOnly) {
    window._activeProfile = null;
    window.clearKidSession();
    window.switchProfile();
  }
}

// ═══════════════════════════════════════════════════════════

export function _routineMatchesDate(routine, dateStr) {
  if (!routine) return false;
  if ((routine.pausePeriods || []).some(p => dateStr >= p.from && (!p.to || dateStr <= p.to))) return false;
  if ((routine.skippedDates || []).includes(dateStr)) return false;
  return _recurrenceMatchesDate(routine.recurrence || null, dateStr);
}

// ── Suggestion library (not stored in state) ─────────────────
export const ROUTINE_SUGGESTIONS = {
  morning: [
    { label: 'Make bed',      emoji: '🛏',  durationMin: 2  },
    { label: 'Shower',        emoji: '🚿',  durationMin: 10 },
    { label: 'Breakfast',     emoji: '🍳',  durationMin: 15 },
    { label: 'Exercise',      emoji: '💪',  durationMin: 20 },
    { label: 'Meditate',      emoji: '🧘',  durationMin: 10 },
    { label: 'Plan the day',  emoji: '📋',  durationMin: 5  },
    { label: 'Read',          emoji: '📚',  durationMin: 15 },
    { label: 'Vitamins',      emoji: '💊',  durationMin: 1  },
    { label: 'Walk',          emoji: '🚶',  durationMin: 20 },
    { label: 'Journaling',    emoji: '✍️',  durationMin: 10 }
  ],
  evening: [
    { label: 'Tidy kitchen',   emoji: '🍽',  durationMin: 10 },
    { label: 'Prep tomorrow',  emoji: '👔',  durationMin: 5  },
    { label: 'Family time',    emoji: '👨‍👩‍👧', durationMin: 30 },
    { label: 'Read',           emoji: '📚',  durationMin: 20 },
    { label: 'Lights out',     emoji: '💤',  durationMin: 0  },
    { label: 'Stretch',        emoji: '🤸',  durationMin: 10 },
    { label: 'Review the day', emoji: '🪞',  durationMin: 5  },
    { label: 'Skincare',       emoji: '🧴',  durationMin: 5  },
    { label: 'No screens',     emoji: '📵',  durationMin: 0  },
    { label: 'Brush teeth',    emoji: '🦷',  durationMin: 3  }
  ],
  general: [
    { label: 'Drink water',    emoji: '💧',  durationMin: 1  },
    { label: 'Check messages', emoji: '📱',  durationMin: 5  },
    { label: 'Quick tidy',     emoji: '🧹',  durationMin: 5  },
    { label: 'Gratitude',      emoji: '🙏',  durationMin: 3  }
  ]
};

// ── Helpers ──────────────────────────────────────────────────

export function _routineDateKey(date) {
  const d = date || new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
export function _routineTodayKey() { return _routineDateKey(new Date()); }
export function _routineCurrentUserId() { return window._currentUser?.uid || 'guest'; }

// Adult-scoped only — never returns household/child routines
export function _routinesForCurrentUser() {
  const _uid = _routineCurrentUserId();
  return (state.routines || []).filter(r =>
    r.ownerType === 'adult' &&
    (r.ownerId === _uid || (r.sharedWith || []).includes(_uid))
  );
}

// Household/child-scoped only
export function _routinesForHousehold() {
  return (state.routines || []).filter(r => r.ownerType === 'household');
}

export function _routineIsOwner(r) { return r.ownerId === _routineCurrentUserId(); }
export function _routineKids()     { return state.kids?.profiles || []; }
export function _routineNextId()   { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

export function _routineOtherAdults() {
  const _uid = _routineCurrentUserId();
  return (state.householdProfile?.authorizedUsers || []).filter(u => u.uid !== window.uid);
}

// ── Per-child assignment accessors ───────────────────────────
// All child completion state lives on the assignment, not on the routine.

export function _routineGetAssignment(routineId, childId) {
  return (state.routineAssignments || []).find(
    a => a.routineId === routineId && a.childId === childId
  );
}

export function _assignmentCompletedToday(assignment) {
  return (assignment?.completionState?.[_routineTodayKey()] || []).length;
}

export function _assignmentStreak(assignment, totalSteps) {
  if (!assignment) return 0;
  let streak = 0;
  const d = new Date();
  while (true) {
    const done = (assignment.completionState?.[_routineDateKey(d)] || []).length;
    if (done === totalSteps && totalSteps > 0) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}

export function _assignmentHistory(assignment, totalSteps, days) {
  const result = [];
  const d = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(d);
    date.setDate(d.getDate() - i);
    const key = _routineDateKey(date);
    const done = (assignment?.completionState?.[key] || []).length;
    result.push({ key, label: date.getDate(), done, total: totalSteps });
  }
  return result;
}

// ── Adult completion state (still on routine.completions) ─────

export function _routineCompletedToday(routine) {
  return (routine.completions?.[_routineTodayKey()] || []).length;
}

export function _routineStreak(routine) {
  let streak = 0;
  const d = new Date();
  while (true) {
    const done = routine.completions?.[_routineDateKey(d)] || [];
    if (done.length === routine.steps.length && routine.steps.length > 0) {
      streak++; d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}

export function _routineHistory(routine, days) {
  const result = [];
  const d = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(d);
    date.setDate(d.getDate() - i);
    const key = _routineDateKey(date);
    const done = (routine.completions?.[key] || []).length;
    result.push({ key, label: date.getDate(), done, total: routine.steps.length });
  }
  return result;
}

// ── Suggestions helpers ───────────────────────────────────────

export function _routineAvailableSuggestions(routine) {
  const existingLabels = new Set(routine.steps.map(s => s.label.toLowerCase()));
  const nameL = routine.name.toLowerCase();
  let pool;
  if (nameL.includes('morning'))
    pool = [...ROUTINE_SUGGESTIONS.morning, ...ROUTINE_SUGGESTIONS.general];
  else if (nameL.includes('evening') || nameL.includes('night') || nameL.includes('bed'))
    pool = [...ROUTINE_SUGGESTIONS.evening, ...ROUTINE_SUGGESTIONS.general];
  else
    pool = [...ROUTINE_SUGGESTIONS.morning, ...ROUTINE_SUGGESTIONS.evening, ...ROUTINE_SUGGESTIONS.general];
  return pool.filter(s => !existingLabels.has(s.label.toLowerCase()));
}

// ── Write-time scope validation ───────────────────────────────

export function _routineAssertScope(routine) {
  if (routine.ownerType === 'household') {
    if (routine.ownerId !== 'household')
      throw new Error(`Scope violation: household routine has ownerId="${routine.ownerId}"`);
  } else if (routine.ownerType === 'adult') {
    if (!routine.ownerId || routine.ownerId === 'household')
      throw new Error(`Scope violation: adult routine has ownerId="${routine.ownerId}"`);
  } else {
    throw new Error(`Scope violation: unknown ownerType="${routine.ownerType}"`);
  }
}

export function _routineSaveValidated(label) {
  (state.routines || []).forEach(r => {
    try { _routineAssertScope(r); }
    catch(e) { console.error(`[Routines] ${label}:`, e.message, r); }
  });
  window.saveData(state);
}

// ── Intelligence nudge (adult only) ──────────────────────────

export function _routineIntelNudge() {
  const routines = _routinesForCurrentUser();
  const now = new Date();
  const hour = now.getHours();
  for (const r of routines) {
    const done  = _routineCompletedToday(r);
    const total = r.steps.length;
    if (!total) continue;
    const [trigH] = (r.triggerTime || '00:00').split(':').map(Number);
    const streak   = _routineStreak(r);
    if (hour >= trigH + 1 && done === 0) return { icon: r.emoji, text: `Your ${r.name} routine hasn't been started yet.` };
    if (streak > 0 && streak % 7 === 0) return { icon: '🔥', text: `${streak}-day streak on your ${r.name} routine — keep it up!` };
    if (done > 0 && done === total - 1) return { icon: r.emoji, text: `One step left in your ${r.name} routine!` };
  }
  return null;
}

// ── Today card ────────────────────────────────────────────────

export function _renderRoutinesTodayCard() {
  const todayStr   = new Date().toISOString().slice(0, 10);
  const myRoutines = _routinesForCurrentUser().filter(r => _routineMatchesDate(r, todayStr));
  if (!myRoutines.length) return '';
  const now = new Date();
  const hour = now.getHours();
  const rows = myRoutines.map(r => {
    const done  = _routineCompletedToday(r);
    const total = r.steps.length;
    const pct   = total > 0 ? Math.round(done / total * 100) : 0;
    const [trigH] = (r.triggerTime || '00:00').split(':').map(Number);
    const isOverdue = hour >= trigH + 1 && done === 0 && total > 0;
    return `<div class="routine-today-row">
      <div class="routine-today-emoji">${r.emoji}</div>
      <div class="routine-today-name">${escHtml(r.name)}</div>
      ${isOverdue ? `<span class="routine-today-nudge">Not started</span>` : ''}
      <div class="routine-today-progress">
        <div class="routine-today-bar-wrap"><div class="routine-today-bar-fill" style="width:${pct}%"></div></div>
        <span class="routine-today-frac">${done}/${total}</span>
      </div>
    </div>`;
  }).join('');
  const nudge = _routineIntelNudge();
  const nudgeHtml = nudge ? `<div class="routine-intel-nudge" onclick="activateTab('routines')" style="margin-bottom:8px">
    <div class="routine-intel-icon">${nudge.icon}</div>
    <div class="routine-intel-body"><div class="routine-intel-label">Routines</div>${escHtml(nudge.text)}</div>
  </div>` : '';
  return `${nudgeHtml}<div class="routines-today-card" onclick="activateTab('routines')">
    <div class="routines-today-header">
      <span class="routines-today-title">Routines</span>
      <span class="routines-today-link">View all →</span>
    </div>
    <div class="routines-today-rows">${rows}</div>
  </div>`;
}

// ── Tab state ─────────────────────────────────────────────────

export let _routineActiveTab = 'mine';
Object.defineProperty(window, '_routineActiveTab', { get() { return _routineActiveTab; }, set(v) { _routineActiveTab = v; }, configurable: true });

// ── Main render ───────────────────────────────────────────────

export function renderRoutines() {
  const el = document.getElementById('routines-content');
  if (!el) return;
  const kids = _routineKids();
  const showKidsTab = kids.length > 0;

  let html = `<div class="page-header" style="margin-bottom:4px">
    <h1>Routines</h1>
    <p>Build consistent daily habits</p>
  </div>
  <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary btn-sm" onclick="_routineCreate()">＋ New routine</button>
  </div>`;

  if (showKidsTab) {
    html += `<div class="routine-tab-bar">
      <button class="routine-tab${_routineActiveTab === 'mine' ? ' active' : ''}" onclick="_routineSetTab('mine')">My Routines</button>
      <button class="routine-tab${_routineActiveTab === 'children' ? ' active' : ''}" onclick="_routineSetTab('children')">Children's Routines</button>
    </div>`;
  }

  html += _routineActiveTab === 'children' && showKidsTab
    ? _renderChildRoutines(kids)
    : _renderAdultRoutines();

  el.innerHTML = html;
}

export function _routineSetTab(tab) { _routineActiveTab = tab; renderRoutines(); }

// ── Adult routines view ───────────────────────────────────────

export function _renderAdultRoutines() {
  // Lazy UID claim: migrate guest-owned routines once the user has a real UID
  const _uid = _routineCurrentUserId();
  let claimed = false;
  (state.routines || []).forEach(r => {
    if (r.ownerType === 'adult' && (r.ownerId === 'guest' || r.ownerId === 'dev')) { r.ownerId = _uid; claimed = true; }
  });
  if (claimed) _routineSaveValidated('lazy-uid-claim');

  const todayStr   = new Date().toISOString().slice(0, 10);
  const myRoutines = _routinesForCurrentUser().filter(r => _routineMatchesDate(r, todayStr));
  const todayKey   = _routineTodayKey();
  let html = '';

  if (!myRoutines.length) {
    return `<div style="text-align:center;padding:32px 20px;color:var(--text-muted)">
      <div style="font-size:40px;margin-bottom:12px">📋</div>
      <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px">No routines yet</div>
      <div style="font-size:13px">Tap ＋ New routine to get started.</div>
    </div>
    <div class="routine-new-card" onclick="_routineCreate()">
      <span style="font-size:22px">＋</span>
      <span class="routine-new-card-label">Create new routine</span>
    </div>`;
  }

  myRoutines.forEach(routine => {
    const isOwner      = _routineIsOwner(routine);
    const isJoined     = routine.linkedType === 'join';
    const isSharedToMe = !isOwner && (routine.sharedWith || []).includes(window.uid);
    const done         = routine.completions?.[todayKey] || [];
    const total        = routine.steps.length;
    const pct          = total > 0 ? Math.round(done.length / total * 100) : 0;
    const allDone      = done.length === total && total > 0;
    const streak       = _routineStreak(routine);
    const totalMins    = routine.steps.reduce((s, st) => s + (st.durationMin || 0), 0);
    const canEdit      = isOwner && !isJoined;

    let ownerBadge = '';
    if (isJoined)     ownerBadge = `<span class="routine-owner-badge routine-joined-badge">🔗 Joined</span>`;
    else if (routine.linkedType === 'duplicate') ownerBadge = `<span class="routine-owner-badge">📋 Duplicated</span>`;
    else if (isSharedToMe) ownerBadge = `<span class="routine-owner-badge routine-shared-badge">👥 Shared with you</span>`;

    const stepsHtml = routine.steps.map((step, idx) => {
      const isDone = done.includes(step.id);
      return `<div class="routine-step"${canEdit ? ` draggable="true" data-routine="'${routine.id}'" data-step="'${step.id}'" data-idx="${idx}"
          ondragstart="_routineDragStart(event)" ondragover="_routineDragOver(event)"
          ondrop="_routineDrop(event,'${routine.id}')" ondragend="_routineDragEnd(event)"` : ''}>
        ${canEdit ? `<span class="routine-step-grab" title="Drag to reorder">⠿</span>` : '<span style="width:18px;flex-shrink:0"></span>'}
        <div class="routine-step-check${isDone ? ' done' : ''}" onclick="_routineToggleStep('${routine.id}','${step.id}')">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span class="routine-step-emoji">${step.emoji}</span>
        <span class="routine-step-label${isDone ? ' done' : ''}">${escHtml(step.label)}</span>
        ${step.durationMin ? `<span class="routine-step-dur">${step.durationMin}m</span>` : ''}
        ${step.notes ? `<span class="routine-step-dur" style="font-style:italic">${escHtml(step.notes)}</span>` : ''}
      </div>`;
    }).join('');

    // Icon buttons for the card header — always visible actions
    const skippedToday = (routine.skippedDates || []).includes(new Date().toISOString().slice(0,10));
    const headerIcons = canEdit ? `
      <button class="btn btn-sm btn-ghost" onclick="_routineSkipDay('${routine.id}')" title="${skippedToday ? 'Un-skip today' : 'Skip today'}" style="${skippedToday ? 'color:#d97706' : ''}">${skippedToday ? '⏭' : '⏭'}</button>
      <button class="btn btn-sm btn-ghost" onclick="_routinePauseMenu('${routine.id}')" title="Pause">⏸</button>
      <button class="btn btn-sm btn-ghost" onclick="_routineEdit('${routine.id}')" title="Edit">✏️</button>
      <button class="btn btn-sm btn-ghost" style="color:#ef4444" onclick="_routineDelete('${routine.id}')" title="Delete">🗑</button>` : '';

    // Bottom row: secondary actions only
    let btns = `<button class="btn btn-sm btn-secondary" onclick="_routineResetToday('${routine.id}')">↺ Reset today</button>
      <button class="btn btn-sm btn-secondary" onclick="_routineShowHistory('${routine.id}',null)">📅 History</button>`;
    if (canEdit) {
      btns += `<button class="btn btn-sm btn-secondary" onclick="_routineShareMenu('${routine.id}')">👥 Share</button>`;
    } else if (isJoined) {
      btns += `<button class="btn btn-sm btn-secondary" onclick="_routineDuplicateFromJoined('${routine.id}')">📋 Duplicate to mine</button>
        <button class="btn btn-sm btn-ghost" style="color:#ef4444;margin-left:auto" onclick="_routineLeave('${routine.id}')">Leave</button>`;
    } else if (isSharedToMe) {
      btns += `<button class="btn btn-sm btn-secondary" onclick="_routineDuplicateTo('${routine.id}')">📋 Duplicate to mine</button>
        <button class="btn btn-sm btn-secondary" onclick="_routineJoin('${routine.id}')">🔗 Join (stay in sync)</button>`;
    }

    html += `<div class="routine-card">
      <div class="routine-card-header">
        <div class="routine-card-title">${routine.emoji} ${escHtml(routine.name)}</div>
        <div style="display:flex;align-items:center;gap:2px;flex-wrap:wrap">
          ${streak > 0 ? `<span class="routine-streak" style="margin-right:4px">🔥 ${streak}d</span>` : ''}
          ${ownerBadge ? `<span style="margin-right:4px">${ownerBadge}</span>` : ''}
          ${headerIcons}
        </div>
      </div>
      <div class="routine-card-meta">${totalMins ? `${totalMins}min · ` : ''}${routine.triggerTime}${skippedToday ? ' · <span style="color:#d97706;font-weight:700">Skipped today</span>' : ''}</div>
      <div class="routine-progress-row">
        <div class="routine-progress-bar-wrap"><div class="routine-progress-bar-fill" style="width:${pct}%"></div></div>
        <span class="routine-progress-label">${done.length}/${total}</span>
      </div>
      <div class="routine-steps">${stepsHtml}</div>
      ${allDone ? `<div class="routine-all-done">✓ Complete — great work!</div>` : ''}
      ${canEdit ? `<button class="routine-add-step-btn" onclick="_routineAddStep('${routine.id}')">+ Add step</button>` : ''}
      ${canEdit ? _renderSuggestionsSection(routine) : ''}
      <div class="routine-card-btns" style="margin-top:12px">${btns}</div>
    </div>`;
  });

  html += `<div class="routine-new-card" onclick="_routineCreate()">
    <span style="font-size:22px">＋</span>
    <span class="routine-new-card-label">Create new routine</span>
  </div>`;

  return html;
}

// ── Suggestions ───────────────────────────────────────────────

export const _routineSuggCollapsed = {};
export const _routineSuggExpanded  = {};
export const SUGG_PREVIEW = 3;

export function _routineToggleSugg(routineId) { _routineSuggCollapsed[routineId] = !_routineSuggCollapsed[routineId]; renderRoutines(); }
export function _routineExpandSugg(routineId) { _routineSuggExpanded[routineId]  = true; renderRoutines(); }

export function _renderSuggestionsSection(routine) {
  const suggestions  = _routineAvailableSuggestions(routine);
  if (!suggestions.length) return '';
  const isOpen       = !_routineSuggCollapsed[routine.id];
  const showAll      = !!_routineSuggExpanded[routine.id];
  const visible      = showAll ? suggestions : suggestions.slice(0, SUGG_PREVIEW);
  const hiddenCount  = suggestions.length - SUGG_PREVIEW;
  const isChild = routine.ownerType === 'household';
  const rowsHtml = visible.map(s => `
    <div class="routine-suggestion-row"
      onclick="_routineAddSuggestion('${routine.id}','${escHtml(s.label).replace(/'/g,"\\'")}','${s.emoji}',${s.durationMin})" style="cursor:pointer">
      <span class="routine-suggestion-emoji" style="pointer-events:none">${s.emoji}</span>
      <span class="routine-suggestion-label" style="pointer-events:none">${escHtml(s.label)}</span>
      ${s.durationMin ? `<span class="routine-suggestion-dur" style="pointer-events:none">${s.durationMin}m</span>` : ''}
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;margin-left:auto;pointer-events:none">
        ${isChild ? `<button class="btn btn-sm btn-ghost" style="padding:2px 7px;font-size:12px;pointer-events:auto"
          onclick="event.stopPropagation();_routineEditSuggestion('${routine.id}','${escHtml(s.label).replace(/'/g,"\\'")}','${s.emoji}',${s.durationMin})"
          title="Add with points">✏️</button>` : ''}
        <span class="routine-suggestion-add" style="pointer-events:none">+</span>
      </div>
    </div>`).join('');
  const moreBtn = !showAll && hiddenCount > 0
    ? `<button class="btn btn-sm btn-ghost" style="margin-top:4px;width:100%;font-size:12px" onclick="_routineExpandSugg('${routine.id}')">Show ${hiddenCount} more ▼</button>`
    : '';
  return `<div class="routine-suggestions">
    <div class="routine-suggestions-toggle${isOpen ? ' open' : ''}" onclick="_routineToggleSugg('${routine.id}')">
      <span>Suggested steps (${suggestions.length})</span><span class="chevron">▼</span>
    </div>
    <div class="routine-suggestions-list" style="display:${isOpen ? 'flex' : 'none'};flex-direction:column">
      ${rowsHtml}${moreBtn}
    </div>
  </div>`;
}

export function _routineEditSuggestion(routineId, label, emoji, durationMin) {
  window.openModal('Add step', `
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Label</label>
        <input class="form-input" id="rse-label" value="${escHtml(label)}" maxlength="40"></div>
      <div><label class="form-label">Emoji</label>
        <input class="form-input" id="rse-emoji" value="${emoji}" maxlength="4" style="width:64px"></div>
    </div>
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Duration (min)</label>
        <input class="form-input" id="rse-dur" type="number" min="0" max="120" value="${durationMin || 0}"></div>
      <div style="flex:1"><label class="form-label">Points</label>
        <input class="form-input" id="rse-pts" type="number" min="0" max="999" placeholder="0"></div>
    </div>
    <div class="form-group"><label class="form-label">Notes (optional)</label>
      <input class="form-input" id="rse-notes" placeholder="e.g. 20 min walk or gym" maxlength="80">
    </div>
  `, () => {
    const finalLabel = document.getElementById('rse-label')?.value.trim() || label;
    _routineAddSuggestion(routineId, finalLabel,
      document.getElementById('rse-emoji')?.value.trim() || emoji,
      parseInt(document.getElementById('rse-dur')?.value) || 0,
      parseInt(document.getElementById('rse-pts')?.value) || 0,
      document.getElementById('rse-notes')?.value.trim() || ''
    );
  });
}

export function _routineAddSuggestion(routineId, label, emoji, durationMin, points, notes) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const allUsed = new Set([
    ...routine.steps.map(s => s.id),
    ...Object.values(routine.completions || {}).flat(),
    ...(state.routineAssignments || [])
      .filter(a => a.routineId === routineId)
      .flatMap(a => Object.values(a.completionState || {}).flat())
  ]);
  let newId = Math.max(0, ...allUsed) + 1;
  while (allUsed.has(newId)) newId++;
  routine.steps.push({ id: newId, label, emoji, durationMin: durationMin || 0, points: points || 0, notes: notes || '' });
  _routinePropagateStepAdd(routine.id, routine.steps[routine.steps.length - 1]);
  window.saveData(state);
  renderRoutines();
}

// ── Children's routines view ──────────────────────────────────
// Organised by routine (not by child). Each routine card shows:
//   - Step builder (add/suggest/drag)
//   - Inline child assignment chips
//   - Per-child progress (if assigned to >1 child, show each child's bar)

export function _renderChildRoutines(kids) {
  const assignments       = state.routineAssignments || [];
  const householdRoutines = _routinesForHousehold();
  const todayKey          = _routineTodayKey();

  if (!householdRoutines.length) {
    return `<div style="text-align:center;padding:32px 20px;color:var(--text-muted)">
      <div style="font-size:40px;margin-bottom:12px">👧</div>
      <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px">No children's routines yet</div>
      <div style="font-size:13px">Tap ＋ New routine to create one, then assign it to your children.</div>
    </div>
    <div class="routine-new-card" onclick="_routineCreate('child')">
      <span style="font-size:22px">＋</span>
      <span class="routine-new-card-label">Create children's routine</span>
    </div>`;
  }

  let html = '';

  householdRoutines.forEach(routine => {
    const routineAssignments = assignments.filter(a => a.routineId === routine.id);
    const assignedKids = routineAssignments
      .map(a => ({ kid: kids.find(k => k.id === a.childId), assignment: a }))
      .filter(x => x.kid);
    const totalSteps = routine.steps.length;

    // ── Inline child assignment chips ─────────────────────────
    const childChipsHtml = kids.map(kid => {
      const isAssigned = routineAssignments.some(a => a.childId === kid.id);
      return `<span class="routine-member-chip${isAssigned ? ' active' : ''}"
        onclick="_routineToggleAssignment('${routine.id}','${kid.id}')"
        title="${isAssigned ? 'Remove' : 'Assign'} ${escHtml(kid.name)}">
        ${kid.emoji || '👤'} ${escHtml(kid.name)}
      </span>`;
    }).join('');

    // ── Per-child progress rows ────────────────────────────────
    const progressRowsHtml = assignedKids.length
      ? assignedKids.map(({ kid, assignment }) => {
          const done    = assignment.completionState?.[todayKey] || [];
          const pct     = totalSteps > 0 ? Math.round(done.length / totalSteps * 100) : 0;
          const streak  = _assignmentStreak(assignment, totalSteps);
          const allDone = done.length === totalSteps && totalSteps > 0;
          return `<div style="display:flex;align-items:center;gap:8px;padding:4px 0">
            <span style="font-size:14px;width:22px;text-align:center;flex-shrink:0">${kid.emoji || '👤'}</span>
            <span style="font-size:12px;font-weight:600;color:var(--text);flex-shrink:0;min-width:52px">${escHtml(kid.name)}</span>
            <div class="routine-progress-bar-wrap" style="flex:1">
              <div class="routine-progress-bar-fill" style="width:${pct}%"></div>
            </div>
            <span class="routine-progress-label">${done.length}/${totalSteps}</span>
            ${streak > 0 ? `<span class="routine-streak" style="font-size:11px;padding:2px 7px">🔥${streak}</span>` : ''}
            ${allDone ? `<span style="font-size:12px;color:var(--section-accent,#0891b2);font-weight:700">✓</span>` : ''}
          </div>`;
        }).join('')
      : `<div style="font-size:12px;color:var(--text-muted);padding:4px 0">No children assigned yet — tap a name above to assign.</div>`;

    // ── Step list (adult editable) ─────────────────────────────
    const stepsHtml = routine.steps.map((step, idx) => `
      <div class="routine-step" draggable="true"
          data-routine="'${routine.id}'" data-step="'${step.id}'" data-idx="${idx}"
          ondragstart="_routineDragStart(event)" ondragover="_routineDragOver(event)"
          ondrop="_routineDrop(event,'${routine.id}')" ondragend="_routineDragEnd(event)">
        <span class="routine-step-grab">⠿</span>
        <span class="routine-step-emoji">${step.emoji}</span>
        <span class="routine-step-label">${escHtml(step.label)}</span>
        ${step.durationMin ? `<span class="routine-step-dur">${step.durationMin}m</span>` : ''}
        ${step.notes ? `<span class="routine-step-dur" style="font-style:italic">${escHtml(step.notes)}</span>` : ''}
        <div style="display:flex;align-items:center;gap:4px;margin-left:auto;flex-shrink:0">
          ${step.points > 0 ? `<span style="font-size:10px;font-weight:700;background:#fef9c3;color:#854d0e;padding:2px 6px;border-radius:99px">⭐${step.points}</span>` : ''}
          <button onclick="event.stopPropagation();_routineEditStep('${routine.id}','${step.id}')"
            style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:13px;padding:0 3px;line-height:1" title="Edit step">✏️</button>
          <button onclick="event.stopPropagation();_routineDeleteStep('${routine.id}','${step.id}',false)"
            style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:14px;padding:0 3px;line-height:1" title="Remove step">✕</button>
        </div>
      </div>`).join('');

    const childSkippedToday = (routine.skippedDates || []).includes(new Date().toISOString().slice(0,10));
    html += `<div class="routine-card">
      <div class="routine-card-header">
        <div class="routine-card-title">${routine.emoji} ${escHtml(routine.name)}</div>
        <div style="display:flex;align-items:center;gap:2px">
          <span style="font-size:11px;color:var(--text-muted);margin-right:4px">${routine.triggerTime}</span>
          <button class="btn btn-sm btn-ghost" onclick="_routineSkipDay('${routine.id}')" title="${childSkippedToday ? 'Un-skip today' : 'Skip today'}" style="${childSkippedToday ? 'color:#d97706' : ''}">⏭</button>
          <button class="btn btn-sm btn-ghost" onclick="_routinePauseMenu('${routine.id}')" title="Pause">⏸</button>
          <button class="btn btn-sm btn-ghost" onclick="_routineEdit('${routine.id}')" title="Edit">✏️</button>
          <button class="btn btn-sm btn-ghost" style="color:#ef4444" onclick="_routineDeleteChild('${routine.id}')" title="Delete">🗑</button>
        </div>
      </div>
      ${childSkippedToday ? `<div style="font-size:11px;color:#d97706;font-weight:700;margin-bottom:8px">⏭ Skipped today</div>` : ''}

      <!-- Assigned children -->
      <div style="margin-bottom:12px">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Assigned to</div>
        <div class="routine-member-chips">${childChipsHtml}</div>
      </div>

      <!-- Per-child progress (only if assigned) -->
      ${assignedKids.length ? `<div style="margin-bottom:12px">${progressRowsHtml}</div>` : `<div style="margin-bottom:8px">${progressRowsHtml}</div>`}

      <!-- Steps -->
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Steps</div>
      <div class="routine-steps">${stepsHtml || `<div style="font-size:13px;color:var(--text-muted);padding:8px 0">No steps yet — add from suggestions or create your own.</div>`}</div>
      <button class="routine-add-step-btn" onclick="_routineAddStep('${routine.id}')">+ Add step</button>
      ${_renderSuggestionsSection(routine)}

      <!-- Actions -->
      <div class="routine-card-btns" style="margin-top:12px">
        <button class="btn btn-sm btn-secondary" onclick="_routineResetTodayAllKids('${routine.id}')">↺ Reset today</button>
        <button class="btn btn-sm btn-secondary" onclick="_routineShowHistory('${routine.id}',null)">📅 History</button>
        ${routine.pointsPerCompletion > 0 ? `<span style="font-size:12px;color:var(--text-muted);align-self:center">⭐ ${routine.pointsPerCompletion} pts</span>` : ''}
      </div>
    </div>`;
  });

  html += `<div class="routine-new-card" onclick="_routineCreate('child')">
    <span style="font-size:22px">＋</span>
    <span class="routine-new-card-label">Create children's routine</span>
  </div>`;

  return html;
}

// Delete a child (household) routine and all its assignments
export function _routineDeleteChild(routineId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  if (!confirm(`Delete "${routine.name}"? All assignments and history will be removed.`)) return;
  state.routines = state.routines.filter(r => r.id !== routineId);
  state.routineAssignments = (state.routineAssignments || []).filter(a => a.routineId !== routineId);
  window.saveData(state); renderRoutines();
}

// ── Step toggles ──────────────────────────────────────────────

// Adult toggle — completions live on routine
export function _routineToggleStep(routineId, stepId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine || routine.ownerType !== 'adult') return;
  const key = _routineTodayKey();
  if (!routine.completions) routine.completions = {};
  if (!routine.completions[key]) routine.completions[key] = [];
  const idx = routine.completions[key].indexOf(stepId);
  if (idx === -1) routine.completions[key].push(stepId);
  else routine.completions[key].splice(idx, 1);
  window.saveData(state);
  renderRoutines();
}

// Child toggle — completions live on the assignment record
export function _routineToggleStepKid(routineId, stepId, childId) {
  const assignment = _routineGetAssignment(routineId, childId);
  if (!assignment) return;
  if (!assignment.completionState) assignment.completionState = {};
  const key = _routineTodayKey();
  if (!assignment.completionState[key]) assignment.completionState[key] = [];
  const idx = assignment.completionState[key].indexOf(stepId);
  const ticking = idx === -1; // true = marking done, false = unmarking
  if (ticking) assignment.completionState[key].push(stepId);
  else assignment.completionState[key].splice(idx, 1);

  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (routine && ticking) {
    const step = routine.steps.find(s => s.id === stepId);
    // Award per-step points immediately when ticked
    if ((step?.points || 0) > 0) {
      _routineAwardStepPoints(routine, step, childId);
    }
    // Award completion bonus when all steps done
    const total = routine.steps.length;
    const done  = assignment.completionState[key].length;
    if (done === total && total > 0 && (routine.pointsPerCompletion || 0) > 0) {
      _routineAwardPoints(routine, childId);
    }
  }

  window.saveData(state);
  // Refresh child view if we're in it, otherwise refresh routines tab
  if (window._activeProfile?.role === 'child') window.showChildView(childId);
  else renderRoutines();
}

export function _routineAwardStepPoints(routine, step, childId) {
  if (!state.kids) return;
  if (!state.kids.completions) state.kids.completions = [];
  if (!state.kids.chores) state.kids.chores = [];
  const syntheticId = `routine-'${routine.id}'-step-'${step.id}'`;
  // Ensure a matching synthetic chore exists
  const existing = state.kids.chores.find(c => c.id === syntheticId);
  if (!existing) {
    state.kids.chores.push({ id: syntheticId, name: `${routine.name}: ${step.label}`,
      emoji: step.emoji, points: step.points, frequency: 'daily',
      assignedTo: childId, _isRoutine: true, _isStep: true });
  } else {
    existing.points = step.points;
  }
  // Only award once per day per step
  const todayStr = new Date().toDateString();
  const already = state.kids.completions.some(c =>
    c.choreId === syntheticId && c.kidId === childId &&
    new Date(c.completedAt).toDateString() === todayStr && c.status === 'approved'
  );
  if (!already) {
    state.kids.completions.push({ id: window.uid(), choreId: syntheticId, kidId: childId,
      completedAt: Date.now(), status: 'approved', _fromRoutine: true });
  }
}

export function _routineAwardPoints(routine, childId) {
  if (!state.kids) return;
  if (!state.kids.completions) state.kids.completions = [];
  // Create a synthetic chore completion for the points system
  const syntheticChoreId = `routine-'${routine.id}'`;
  // Ensure a matching "chore" entry exists so kidBalance can read the points
  if (!state.kids.chores) state.kids.chores = [];
  const existing = state.kids.chores.find(c => c.id === syntheticChoreId);
  if (!existing) {
    state.kids.chores.push({ id: syntheticChoreId, name: routine.name, emoji: routine.emoji,
      points: routine.pointsPerCompletion, frequency: 'daily', assignedTo: childId, _isRoutine: true });
  } else {
    existing.points = routine.pointsPerCompletion;
  }
  // Only award once per day
  const todayStr = new Date().toDateString();
  const alreadyAwarded = state.kids.completions.some(c =>
    c.choreId === syntheticChoreId && c.kidId === childId &&
    new Date(c.completedAt).toDateString() === todayStr && c.status === 'approved'
  );
  if (!alreadyAwarded) {
    state.kids.completions.push({ id: window.uid(), choreId: syntheticChoreId, kidId: childId,
      completedAt: Date.now(), status: 'approved', _fromRoutine: true });
  }
}

// ── Reset ─────────────────────────────────────────────────────

export function _routineResetToday(routineId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  delete routine.completions[_routineTodayKey()];
  window.saveData(state); renderRoutines();
}

export function _routineSkipDay(routineId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const today = new Date().toISOString().slice(0, 10);
  if (!routine.skippedDates) routine.skippedDates = [];
  if (routine.skippedDates.includes(today)) {
    routine.skippedDates = routine.skippedDates.filter(d => d !== today);
  } else {
    routine.skippedDates.push(today);
  }
  window.saveData(state); renderRoutines();
}

export function _routinePauseMenu(routineId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  if (!routine.pausePeriods) routine.pausePeriods = [];
  const today = new Date().toISOString().slice(0, 10);
  const activePauses = routine.pausePeriods.filter(p => !p.to || p.to >= today);
  const pauseListHtml = activePauses.length
    ? `<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Active pauses</div>${
        activePauses.map((p,i) => `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:13px;border-bottom:1px solid var(--border)">
          <span style="flex:1">${p.from}${p.to ? ' → '+p.to : ' (indefinite)'}${p.reason ? ' · '+escHtml(p.reason) : ''}</span>
          <button class="btn btn-ghost btn-sm" style="color:#ef4444;padding:2px 6px" onclick="_routineRemovePause(${routineId},${routine.pausePeriods.indexOf(p)})">Remove</button>
        </div>`).join('')
      }</div>` : '';
  window.openModal('Pause routine', `
    ${pauseListHtml}
    <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Add pause period</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div><label class="form-label">From</label>
        <input class="form-input" id="rp-from" type="date" value="${today}" style="width:150px"></div>
      <div><label class="form-label">Until <span style="font-size:11px;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="rp-to" type="date" style="width:150px"></div>
    </div>
    <div class="form-group"><label class="form-label">Reason (optional)</label>
      <input class="form-input" id="rp-reason" placeholder="e.g. School holidays" maxlength="60"></div>
  `, () => {
    const from   = document.getElementById('rp-from')?.value;
    if (!from) return;
    const to     = document.getElementById('rp-to')?.value   || undefined;
    const reason = document.getElementById('rp-reason')?.value.trim() || undefined;
    routine.pausePeriods.push({ from, to, reason });
    window.saveData(state); window.closeModal(); renderRoutines();
  });
}

export function _routineRemovePause(routineId, pauseIdx) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine || !routine.pausePeriods) return;
  routine.pausePeriods.splice(pauseIdx, 1);
  window.saveData(state); window.closeModal(); renderRoutines();
}

export function _routineResetTodayKid(routineId, childId) {
  const assignment = _routineGetAssignment(routineId, childId);
  if (!assignment) return;
  if (assignment.completionState) delete assignment.completionState[_routineTodayKey()];
  window.saveData(state); renderRoutines();
}

export function _routineResetTodayAllKids(routineId) {
  const key = _routineTodayKey();
  (state.routineAssignments || []).filter(a => a.routineId === routineId).forEach(a => {
    if (a.completionState) delete a.completionState[key];
  });
  window.saveData(state); renderRoutines();
}

// ── Drag-to-reorder ───────────────────────────────────────────

export let _routineDragIdx = null;
Object.defineProperty(window, '_routineDragIdx', { get() { return _routineDragIdx; }, set(v) { _routineDragIdx = v; }, configurable: true });
export function _routineDragStart(e) { _routineDragIdx = parseInt(e.currentTarget.dataset.idx); e.currentTarget.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; }
export function _routineDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; document.querySelectorAll('.routine-step.drag-over').forEach(el => el.classList.remove('drag-over')); e.currentTarget.classList.add('drag-over'); }
export function _routineDrop(e, routineId) {
  e.preventDefault();
  const toIdx = parseInt(e.currentTarget.dataset.idx);
  if (_routineDragIdx === null || _routineDragIdx === toIdx) return;
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const moved = routine.steps.splice(_routineDragIdx, 1)[0];
  routine.steps.splice(toIdx, 0, moved);
  _routineDragIdx = null;
  window.saveData(state); renderRoutines();
}
export function _routineDragEnd(e) { e.currentTarget.classList.remove('dragging'); document.querySelectorAll('.routine-step.drag-over').forEach(el => el.classList.remove('drag-over')); _routineDragIdx = null; }

// ── Add step ──────────────────────────────────────────────────

export function _routineAddStep(routineId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const isChildRoutine = routine.ownerType === 'household';
  window.openModal('Add step', `
    <div class="form-group"><label class="form-label">Label</label>
      <input class="form-input" id="rs-label" placeholder="e.g. Meditate" maxlength="40">
    </div>
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Emoji</label>
        <input class="form-input" id="rs-emoji" placeholder="🧘" maxlength="4"></div>
      <div style="flex:1"><label class="form-label">Duration (min)</label>
        <input class="form-input" id="rs-dur" type="number" min="0" max="120" placeholder="10"></div>
    </div>
    ${isChildRoutine ? `<div class="form-group"><label class="form-label">Points for this step <span style="font-size:11px;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="rs-pts" type="number" min="0" max="999" placeholder="0" style="width:90px"></div>` : ''}
    <div class="form-group"><label class="form-label">Notes (optional)</label>
      <input class="form-input" id="rs-notes" placeholder="e.g. 20 min walk or gym" maxlength="80">
    </div>`, () => {
    const label = document.getElementById('rs-label')?.value.trim();
    if (!label) return;
    const allUsed = new Set([
      ...routine.steps.map(s => s.id),
      ...Object.values(routine.completions || {}).flat(),
      ...(state.routineAssignments || []).filter(a => a.routineId === routineId)
        .flatMap(a => Object.values(a.completionState || {}).flat())
    ]);
    let newId = Math.max(0, ...allUsed) + 1;
    while (allUsed.has(newId)) newId++;
    const step = { id: newId, label,
      emoji: document.getElementById('rs-emoji')?.value.trim() || '✅',
      durationMin: parseInt(document.getElementById('rs-dur')?.value) || 0,
      points: isChildRoutine ? (parseInt(document.getElementById('rs-pts')?.value) || 0) : 0,
      notes: document.getElementById('rs-notes')?.value.trim() || '' };
    routine.steps.push(step);
    _routinePropagateStepAdd(routine.id, step);
    window.saveData(state); window.closeModal(); renderRoutines();
  });
  setTimeout(() => document.getElementById('rs-label')?.focus(), 100);
}

export function _routinePropagateStepAdd(sourceId, newStep) {
  (state.routines || []).forEach(r => {
    if (r.linkedType === 'join' && r.linkedFrom === sourceId && !r.steps.some(s => s.label === newStep.label)) {
      const newId = Math.max(0, ...r.steps.map(s => s.id), 0) + 1;
      r.steps.push({ ...newStep, id: newId });
    }
  });
}

export function _routinePropagateStepDelete(sourceId, deletedLabel) {
  (state.routines || []).forEach(r => {
    if (r.linkedType === 'join' && r.linkedFrom === sourceId)
      r.steps = r.steps.filter(s => s.label !== deletedLabel);
  });
}

// ── Edit routine ──────────────────────────────────────────────

export function _routineEdit(routineId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const isChildRoutine = routine.ownerType === 'household';
  const stepsRows = routine.steps.map(s => `
    <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:16px">${s.emoji}</span>
      <span style="flex:1;font-size:13px;font-weight:500">${escHtml(s.label)}</span>
      <span style="font-size:11px;color:var(--text-muted)">${s.durationMin || 0}m</span>
      ${isChildRoutine ? `<span style="font-size:11px;color:var(--text-muted)">⭐${s.points || 0}</span>` : ''}
      <button class="btn btn-sm btn-ghost" style="color:#ef4444" onclick="_routineDeleteStep(${routineId},${s.id},true)">✕</button>
    </div>`).join('');

  // Points field only for child (household) routines
  const pointsField = routine.ownerType === 'household' ? `
    <div class="form-group"><label class="form-label">Points on completion</label>
      <input class="form-input" id="re-pts" type="number" min="0" max="999" value="${routine.pointsPerCompletion || 0}" style="width:90px">
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Awarded to the child when all steps are done</div>
    </div>` : '';

  window.openModal(`Edit: ${routine.emoji} ${routine.name}`, `
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Name</label>
        <input class="form-input" id="re-name" value="${escHtml(routine.name)}" maxlength="30"></div>
      <div><label class="form-label">Emoji</label>
        <input class="form-input" id="re-emoji" value="${routine.emoji}" maxlength="4" style="width:64px"></div>
    </div>
    <div class="form-group"><label class="form-label">Trigger time</label>
      <input class="form-input" id="re-time" type="time" value="${routine.triggerTime}" style="width:130px">
    </div>
    ${pointsField}
    ${_routineRecurrenceFormHtml(routine.recurrence)}
    <div class="form-group"><label class="form-label">Steps</label><div>${stepsRows}</div></div>
  `, () => {
    const name  = document.getElementById('re-name')?.value.trim();
    const emoji = document.getElementById('re-emoji')?.value.trim();
    const time  = document.getElementById('re-time')?.value;
    if (name)  routine.name  = name;
    if (emoji) routine.emoji = emoji;
    if (time)  routine.triggerTime = time;
    if (routine.ownerType === 'household') {
      const pts = parseInt(document.getElementById('re-pts')?.value);
      if (!isNaN(pts)) routine.pointsPerCompletion = pts;
    }
    routine.recurrence   = _routineRecurrenceCollect();
    routine.lastEditedBy = _routineCurrentUserId();
    routine.lastEditedAt = new Date().toISOString();
    window.saveData(state); window.closeModal(); renderRoutines();
  });
  setTimeout(() => { _routineRecurrenceSummaryUpdate(); }, 100);
}

// fromEditModal: true = re-open the Edit routine modal after deletion
//                false/undefined = just close and re-render the card
export function _routineDeleteStep(routineId, stepId, fromEditModal) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const deleted = routine.steps.find(s => s.id === stepId);
  routine.steps = routine.steps.filter(s => s.id !== stepId);
  Object.keys(routine.completions || {}).forEach(k => {
    routine.completions[k] = routine.completions[k].filter(id => id !== stepId);
  });
  (state.routineAssignments || []).filter(a => a.routineId === routineId).forEach(a => {
    Object.keys(a.completionState || {}).forEach(k => {
      a.completionState[k] = a.completionState[k].filter(id => id !== stepId);
    });
  });
  if (deleted) _routinePropagateStepDelete(routine.id, deleted.label);
  window.saveData(state);
  if (fromEditModal) { window.closeModal(); _routineEdit(routineId); }
  else { window.closeModal(); renderRoutines(); }
}

export function _routineEditStep(routineId, stepId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const step = routine.steps.find(s => s.id === stepId);
  if (!step) return;
  const isChild = routine.ownerType === 'household';
  window.openModal('Edit step', `
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Label</label>
        <input class="form-input" id="rst-label" value="${escHtml(step.label)}" maxlength="40"></div>
      <div><label class="form-label">Emoji</label>
        <input class="form-input" id="rst-emoji" value="${step.emoji}" maxlength="4" style="width:64px"></div>
    </div>
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Duration (min)</label>
        <input class="form-input" id="rst-dur" type="number" min="0" max="120" value="${step.durationMin || 0}"></div>
      ${isChild ? `<div style="flex:1"><label class="form-label">Points</label>
        <input class="form-input" id="rst-pts" type="number" min="0" max="999" value="${step.points || 0}"></div>` : ''}
    </div>
    <div class="form-group"><label class="form-label">Notes (optional)</label>
      <input class="form-input" id="rst-notes" value="${escHtml(step.notes || '')}" maxlength="80">
    </div>
  `, () => {
    const label = document.getElementById('rst-label')?.value.trim();
    if (!label) return;
    step.label = label;
    step.emoji = document.getElementById('rst-emoji')?.value.trim() || step.emoji;
    step.durationMin = parseInt(document.getElementById('rst-dur')?.value) || 0;
    step.notes = document.getElementById('rst-notes')?.value.trim() || '';
    if (isChild) step.points = parseInt(document.getElementById('rst-pts')?.value) || 0;
    window.saveData(state);
    window.closeModal();
    renderRoutines();
  });
}

// ── Manage assignments (multi-child) ──────────────────────────

export function _routineManageAssignments(routineId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const kids = _routineKids();
  if (!kids.length) { window.openModal('Assign', `<p style="color:var(--text-muted);font-size:13px">No children in this household yet.</p>`, () => window.closeModal()); return; }
  const assignments = state.routineAssignments || [];
  const rows = kids.map(kid => {
    const isAssigned = assignments.some(a => a.routineId === routineId && a.childId === kid.id);
    return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:22px">${kid.emoji || '👤'}</span>
      <span style="flex:1;font-size:14px;font-weight:600">${escHtml(kid.name)}</span>
      <button class="btn btn-sm ${isAssigned ? 'btn-danger-ghost' : 'btn-primary'}"
        onclick="_routineToggleAssignment(${routineId},'${kid.id}')">
        ${isAssigned ? 'Remove' : 'Assign'}
      </button>
    </div>`;
  }).join('');
  window.openModal(`${routine.emoji} ${routine.name} — Assigned to`, `
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Each child tracks their own progress independently.</p>
    ${rows}
  `, () => window.closeModal());
}

export function _routineToggleAssignment(routineId, childId) {
  if (!state.routineAssignments) state.routineAssignments = [];
  const existing = _routineGetAssignment(routineId, childId);
  if (existing) {
    // Unassign: archive completion state silently (chip tap is reversible)
    existing.archivedCompletionState = JSON.parse(JSON.stringify(existing.completionState || {}));
    existing.archivedAt = new Date().toISOString();
    state.routineAssignments = state.routineAssignments.filter(a => !(a.routineId === routineId && a.childId === childId));
  } else {
    state.routineAssignments.push({
      id: window.uid(), routineId, childId,
      assignedBy: _routineCurrentUserId(), assignedAt: new Date().toISOString(),
      completionState: {}, archivedCompletionState: null, childIds: [childId]
    });
  }
  window.saveData(state); renderRoutines();
}

// ── Create routine ────────────────────────────────────────────
// Simplified: just type (Adult/Child), name, emoji, time.
// Assignment happens after creation on the card itself.

// ── Recurrence form helpers ───────────────────────────────────

export function _routineRecurrenceFormHtml(rec) {
  const t   = rec?.type         || 'daily';
  const sD  = rec?.startDate    || new Date().toISOString().slice(0, 10);
  const eD  = rec?.endDate      || '';
  const iDy = rec?.intervalDays || 2;
  const sel = rec?.days         || [];
  const DOW = [['1','Mon'],['2','Tue'],['3','Wed'],['4','Thu'],['5','Fri'],['6','Sat'],['0','Sun']];
  return `
    <div class="form-group">
      <label class="form-label">Repeat</label>
      <select class="form-input" id="rn-rec-type" onchange="_routineRecurrenceTypeChange()" style="width:100%;max-width:240px">
        <option value="daily"         ${t==='daily'         ?'selected':''}>Every day</option>
        <option value="weekdays"      ${t==='weekdays'      ?'selected':''}>Weekdays only (Mon–Fri)</option>
        <option value="weekends"      ${t==='weekends'      ?'selected':''}>Weekends only</option>
        <option value="specific_days" ${t==='specific_days' ?'selected':''}>Specific days…</option>
        <option value="interval"      ${t==='interval'      ?'selected':''}>Every N days…</option>
        <option value="one_time"      ${t==='one_time'      ?'selected':''}>One time only</option>
      </select>
    </div>
    <div id="rn-rec-days" style="display:${t==='specific_days'?'flex':'none'};gap:6px;flex-wrap:wrap;margin-bottom:12px">
      ${DOW.map(([v,l])=>`<label style="display:flex;align-items:center;cursor:pointer;padding:5px 10px;border-radius:99px;border:1.5px solid ${sel.includes(v)?'var(--primary)':'var(--border)'};background:${sel.includes(v)?'var(--primary-light)':'transparent'};font-size:12px;font-weight:600">
        <input type="checkbox" value="${v}" name="rn-rec-dow" ${sel.includes(v)?'checked':''} style="display:none" onchange="_routineRecurrenceSummaryUpdate()"> ${l}
      </label>`).join('')}
    </div>
    <div id="rn-rec-interval" style="display:${t==='interval'?'flex':'none'};align-items:center;gap:8px;margin-bottom:12px">
      <label class="form-label" style="margin:0;white-space:nowrap">Every</label>
      <input class="form-input" id="rn-rec-interval-days" type="number" min="2" max="365" value="${iDy}" style="width:70px" oninput="_routineRecurrenceSummaryUpdate()">
      <span style="font-size:13px;color:var(--text-muted)">days</span>
    </div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px">
      <div><label class="form-label">Start date</label>
        <input class="form-input" id="rn-rec-start" type="date" value="${sD}" style="width:150px"></div>
      <div><label class="form-label">End date <span style="font-size:11px;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="rn-rec-end" type="date" value="${eD}" style="width:150px"></div>
    </div>
    <div id="rn-rec-summary" style="font-size:12px;color:var(--primary);font-weight:600;padding:8px 12px;background:var(--primary-light);border-radius:8px;margin-bottom:4px"></div>`;
}

export function _routineRecurrenceTypeChange() {
  const t = document.getElementById('rn-rec-type')?.value;
  if (!t) return;
  document.getElementById('rn-rec-days').style.display     = t === 'specific_days' ? 'flex' : 'none';
  document.getElementById('rn-rec-interval').style.display = t === 'interval'      ? 'flex' : 'none';
  _routineRecurrenceSummaryUpdate();
}

export function _routineRecurrenceSummaryUpdate() {
  const el = document.getElementById('rn-rec-summary');
  if (!el) return;
  const t = document.getElementById('rn-rec-type')?.value;
  const MAP = { daily:'Every day', weekdays:'Mon – Fri', weekends:'Sat & Sun', one_time:'Once only' };
  if (MAP[t]) { el.textContent = MAP[t]; return; }
  if (t === 'specific_days') {
    const names = [...document.querySelectorAll('input[name="rn-rec-dow"]:checked')]
      .map(c => (['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][c.value]));
    el.textContent = names.length ? names.join(', ') : 'No days selected';
  } else if (t === 'interval') {
    const n = document.getElementById('rn-rec-interval-days')?.value || 2;
    el.textContent = `Every ${n} days`;
  }
}

export function _routineRecurrenceCollect() {
  const t = document.getElementById('rn-rec-type')?.value || 'daily';
  const startDate = document.getElementById('rn-rec-start')?.value || new Date().toISOString().slice(0, 10);
  const endDate   = document.getElementById('rn-rec-end')?.value || undefined;
  const rec = { type: t, startDate };
  if (endDate) rec.endDate = endDate;
  if (t === 'specific_days')
    rec.days = [...document.querySelectorAll('input[name="rn-rec-dow"]:checked')].map(c => c.value);
  if (t === 'interval')
    rec.intervalDays = parseInt(document.getElementById('rn-rec-interval-days')?.value) || 2;
  return rec;
}

export function _routineCreate(preselectType) {
  // preselectType: undefined = default to 'adult', 'child' = child tab context
  const defaultIsChild = preselectType === 'child';

  window.openModal('New routine', `
    <div class="form-group">
      <label class="form-label">Routine type</label>
      <div class="routine-for-picklist">
        <label class="routine-for-option${!defaultIsChild ? ' selected' : ''}" id="rn-type-adult" onclick="_routineTypeSelect('adult')">
          <input type="radio" name="rn-type" value="adult" ${!defaultIsChild ? 'checked' : ''} style="display:none">
          <span class="routine-for-avatar">🧑</span>
          <span class="routine-for-name">Adult</span>
        </label>
        <label class="routine-for-option${defaultIsChild ? ' selected' : ''}" id="rn-type-child" onclick="_routineTypeSelect('child')">
          <input type="radio" name="rn-type" value="child" ${defaultIsChild ? 'checked' : ''} style="display:none">
          <span class="routine-for-avatar">👧</span>
          <span class="routine-for-name">Child</span>
        </label>
      </div>
    </div>
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Name</label>
        <input class="form-input" id="rn-name" placeholder="e.g. Morning, Bedtime" maxlength="30"></div>
      <div><label class="form-label">Emoji</label>
        <input class="form-input" id="rn-emoji" placeholder="📋" maxlength="4" style="width:64px"></div>
    </div>
    <div class="form-group"><label class="form-label">Trigger time</label>
      <input class="form-input" id="rn-time" type="time" value="${defaultIsChild ? '19:30' : '08:00'}" style="width:130px">
    </div>
    <div class="form-group" id="rn-pts-group" style="display:${defaultIsChild ? 'block' : 'none'}">
      <label class="form-label">Points on completion <span style="font-size:11px;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="rn-pts" type="number" min="0" max="999" placeholder="0" style="width:90px">
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Awarded when the child completes all steps</div>
    </div>
    ${_routineRecurrenceFormHtml(null)}
  `, () => {
    const name = document.getElementById('rn-name')?.value.trim();
    if (!name) return;
    const type       = document.querySelector('input[name="rn-type"]:checked')?.value || 'adult';
    const emoji      = document.getElementById('rn-emoji')?.value.trim() || '📋';
    const time       = document.getElementById('rn-time')?.value || (type === 'child' ? '19:30' : '08:00');
    const pts        = parseInt(document.getElementById('rn-pts')?.value) || 0;
    const currentUid = _routineCurrentUserId();
    const routineId  = _routineNextId();
    const recurrence = _routineRecurrenceCollect();

    if (type === 'adult') {
      const r = { id: routineId, name, emoji, triggerTime: time,
        steps: [], completions: {}, assignedTo: [],
        ownerType: 'adult', ownerId: currentUid,
        sharedWith: [], linkedFrom: null, linkedType: null, pointsPerCompletion: 0,
        recurrence, skippedDates: [], pausePeriods: [] };
      _routineAssertScope(r);
      state.routines.push(r);
      _routineSaveValidated('create:adult');
      window.closeModal();
      _routineActiveTab = 'mine';
    } else {
      const r = { id: routineId, name, emoji, triggerTime: time,
        steps: [], completions: {}, assignedTo: [],
        ownerType: 'household', ownerId: 'household',
        sharedWith: [], linkedFrom: null, linkedType: null, pointsPerCompletion: pts,
        createdBy: currentUid, lastEditedBy: currentUid, lastEditedAt: new Date().toISOString(),
        recurrence, skippedDates: [], pausePeriods: [] };
      _routineAssertScope(r);
      state.routines.push(r);
      _routineSaveValidated('create:child');
      window.closeModal();
      _routineActiveTab = 'children';
    }
    renderRoutines();
  });
  setTimeout(() => { document.getElementById('rn-name')?.focus(); _routineRecurrenceSummaryUpdate(); }, 100);
}

export function _routineTypeSelect(type) {
  document.querySelectorAll('input[name="rn-type"]').forEach(r => r.checked = r.value === type);
  document.getElementById('rn-type-adult')?.classList.toggle('selected', type === 'adult');
  document.getElementById('rn-type-child')?.classList.toggle('selected', type === 'child');
  const timeInput = document.getElementById('rn-time');
  if (timeInput) timeInput.value = type === 'child' ? '19:30' : '08:00';
  const ptsGroup = document.getElementById('rn-pts-group');
  if (ptsGroup) ptsGroup.style.display = type === 'child' ? 'block' : 'none';
}

// ── Delete / leave / unassign ─────────────────────────────────

export function _routineDelete(routineId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  if (!confirm(`Delete "${routine.name}"? This cannot be undone.`)) return;
  state.routines = state.routines.filter(r => r.id !== routineId);
  state.routineAssignments = (state.routineAssignments || []).filter(a => a.routineId !== routineId);
  window.saveData(state); renderRoutines();
}

export function _routineLeave(routineId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  if (!confirm(`Leave "${routine.name}"? Your completion history will be removed.`)) return;
  state.routines = state.routines.filter(r => r.id !== routineId);
  window.saveData(state); renderRoutines();
}

export function _routineUnassign(routineId, kidId) {
  if (!confirm('Unassign this child? Their completion history will be archived.')) return;
  const assignment = _routineGetAssignment(routineId, kidId);
  if (assignment) {
    assignment.archivedCompletionState = JSON.parse(JSON.stringify(assignment.completionState || {}));
    assignment.archivedAt = new Date().toISOString();
  }
  state.routineAssignments = (state.routineAssignments || []).filter(
    a => !(a.routineId === routineId && a.childId === kidId)
  );
  // Delete routine only if no remaining assignments
  if (!(state.routineAssignments || []).some(a => a.routineId === routineId))
    state.routines = state.routines.filter(r => r.id !== routineId);
  window.saveData(state); renderRoutines();
}

// ── Sharing (adult routines) ──────────────────────────────────

export function _routineShareMenu(routineId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const others = _routineOtherAdults();
  if (!others.length) {
    window.openModal('Share routine', `<p style="color:var(--text-muted);font-size:13px">No other adults have joined yet. Invite them via Settings → Household first.</p>`, () => window.closeModal());
    return;
  }
  const alreadyShared = routine.sharedWith || [];
  const rows = others.map(u => {
    const isShared = alreadyShared.includes(u.uid);
    return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
      <span style="flex:1;font-size:14px;font-weight:500">${escHtml(u.name || u.email || u.uid)}</span>
      <button class="btn btn-sm ${isShared ? 'btn-danger-ghost' : 'btn-primary'}"
        onclick="_routineToggleShare(${routineId},'${u.uid}')">
        ${isShared ? 'Remove' : 'Share'}
      </button>
    </div>`;
  }).join('');
  window.openModal(`Share: ${routine.emoji} ${routine.name}`, `
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Shared routines are view-only. The recipient can duplicate or join.</p>
    ${rows}
  `, () => window.closeModal());
}

export function _routineToggleShare(routineId, targetUid) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  if (!routine.sharedWith) routine.sharedWith = [];
  const idx = routine.sharedWith.indexOf(targetUid);
  if (idx === -1) routine.sharedWith.push(targetUid);
  else routine.sharedWith.splice(idx, 1);
  window.saveData(state); window.closeModal(); _routineShareMenu(routineId);
}

// ── Duplicate / Join ──────────────────────────────────────────

export function _routineDuplicateTo(sourceId) {
  const source = (state.routines || []).find(r => r.id === sourceId);
  if (!source) return;
  const _uid = _routineCurrentUserId();
  const r = { ...JSON.parse(JSON.stringify(source)), id: _routineNextId(),
    ownerId: window.uid, ownerType: 'adult', sharedWith: [], completions: {},
    linkedFrom: sourceId, linkedType: 'duplicate' };
  state.routines.push(r); window.saveData(state); window.closeModal(); renderRoutines();
}

export function _routineJoin(sourceId) {
  const source = (state.routines || []).find(r => r.id === sourceId);
  if (!source) return;
  const _uid = _routineCurrentUserId();
  if ((state.routines || []).some(r => r.linkedFrom === sourceId && r.linkedType === 'join' && r.ownerId === window.uid)) {
    alert('You have already joined this routine.'); return;
  }
  const r = { ...JSON.parse(JSON.stringify(source)), id: _routineNextId(),
    ownerId: window.uid, ownerType: 'adult', sharedWith: [], completions: {},
    linkedFrom: sourceId, linkedType: 'join' };
  state.routines.push(r); window.saveData(state); window.closeModal(); renderRoutines();
}

export function _routineDuplicateFromJoined(joinedId) {
  const joined = (state.routines || []).find(r => r.id === joinedId);
  if (joined?.linkedFrom) _routineDuplicateTo(joined.linkedFrom);
}

// ── History modal ─────────────────────────────────────────────
// childId: null for adult routine, kid.id for child assignment

export function _routineShowHistory(routineId, childId) {
  const routine = (state.routines || []).find(r => String(r.id) === String(routineId));
  if (!routine) return;
  const total = routine.steps.length;

  let history, streak, title;
  if (childId) {
    const assignment = _routineGetAssignment(routineId, childId);
    const kid = _routineKids().find(k => k.id === childId);
    history = _assignmentHistory(assignment, total, 90);
    streak  = _assignmentStreak(assignment, total);
    title   = `${routine.emoji} ${routine.name} — ${kid?.name || 'Child'}`;
  } else {
    history = _routineHistory(routine, 90);
    streak  = _routineStreak(routine);
    title   = `${routine.emoji} ${routine.name} — History`;
  }

  const completeDays = history.filter(h => h.done === h.total && h.total > 0).length;
  const partialDays  = history.filter(h => h.done > 0 && h.done < h.total).length;
  const dotsHtml = history.map(h => {
    const cls    = h.done === h.total && h.total > 0 ? 'full' : h.done > 0 ? 'partial' : 'empty';
    const symbol = h.done === h.total && h.total > 0 ? '✓' : h.done > 0 ? `${h.done}` : '';
    return `<div class="routine-history-dot ${cls}" title="${h.key}: ${h.done}/${h.total}">${symbol}</div>`;
  }).join('');

  window.openModal(title, `
    <div style="display:flex;gap:20px;margin-bottom:16px">
      <div style="text-align:center"><div style="font-size:28px;font-weight:900">🔥 ${streak}</div><div style="font-size:11px;color:var(--text-muted);font-weight:600">Current streak</div></div>
      <div style="text-align:center"><div style="font-size:28px;font-weight:900;color:#10b981">${completeDays}</div><div style="font-size:11px;color:var(--text-muted);font-weight:600">Full days (90d)</div></div>
      <div style="text-align:center"><div style="font-size:28px;font-weight:900;color:#f59e0b">${partialDays}</div><div style="font-size:11px;color:var(--text-muted);font-weight:600">Partial days</div></div>
    </div>
    <div class="routine-history-label">Last 90 days</div>
    <div class="routine-history-grid">${dotsHtml}</div>
    <div style="display:flex;gap:12px;margin-top:10px;font-size:11px;color:var(--text-muted)">
      <span><span style="display:inline-block;width:12px;height:12px;background:var(--section-accent,#0891b2);border-radius:3px;margin-right:4px;vertical-align:middle"></span>Complete</span>
      <span><span style="display:inline-block;width:12px;height:12px;background:var(--primary-light,#eff6ff);border:1.5px solid var(--section-accent,#0891b2);border-radius:3px;margin-right:4px;vertical-align:middle"></span>Partial</span>
      <span><span style="display:inline-block;width:12px;height:12px;background:var(--surface2);border-radius:3px;margin-right:4px;vertical-align:middle"></span>Missed</span>
    </div>
  `, () => window.closeModal());
}

// Child view — kid-mode overlay (routines, chores, prizes, calendar)
import { state } from '../store.js';
import { escHtml, fmtDate } from './format.js';
import { _recurrenceMatchesDate } from './planner-utils.js';

export function _applyChildNav() {
  const isKid = window._activeProfile?.role === 'child';
  document.body.classList.toggle('kid-mode', isKid);

  const label = document.getElementById('kid-banner-label');
  if (label && isKid) {
    label.textContent = `${window._activeProfile.emoji || '😊'} ${window._activeProfile.name}'s view`;
  }

  const device = window.getDeviceProfile();
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
export function switchProfile() {
  const device = window.getDeviceProfile();

  if (window._activeProfile?.role === 'child') {
    // Currently in kid mode → give parent temporary access
    window.clearKidSession();
    window._activeProfile = null;
    _applyChildNav();
    window.renderAll();
  } else {
    // Currently in adult mode → hand back to the assigned profile
    if (device === 'shared') {
      window.showProfileSelector();
    } else if (device && device !== 'adult') {
      const kid = (state.kids?.profiles || []).find(k => k.id === device);
      if (kid) {
        if (kid.pinHash) {
          window._pinTargetId = kid.id;
          window._pinBuffer = '';
          window._pinAttempts = 0;
          window._showPinScreen(kid);
        } else {
          window._activeProfile = { id: kid.id, name: kid.name, emoji: kid.emoji, role: 'child' };
          window.setKidSession(kid.id);
          window._applyActiveProfile();
        }
      }
    }
  }
}

export async function setKidPin(kidId, pin) {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (!kid || pin.length !== 4) return;
  kid.pinHash = await window._hashPin(pin, window._getHouseholdOwnerUID());
  window.saveData(state);
}

export function clearKidPin(kidId) {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (!kid) return;
  delete kid.pinHash;
  window.saveData(state);
}

// ── Adult PIN ─────────────────────────────────────────
export function setAdultPin(adultIndex) {
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

export function clearAdultPin(adultIndex) {
  const adults = (state.householdProfile?.members || []).filter(m => m.role === 'adult' && m.name);
  if (!adults[adultIndex]) return;
  delete adults[adultIndex].pinHash;
  window.saveData(state);
  renderSettings();
}

export let _adultPinTarget = 0;
export let _adultPinStep   = 'enter'; // enter | confirm
export let _adultPinFirst  = '';
export let _adultPinBuf    = '';

export function _renderAdultPinModal() {
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

export function _adultPinKey(k) {
  if (k === '⌫') { _adultPinBuf = _adultPinBuf.slice(0, -1); _renderAdultPinModal(); return; }
  if (_adultPinBuf.length >= 4) return;
  _adultPinBuf += k;
  _renderAdultPinModal();
  if (_adultPinBuf.length === 4) _adultPinSubmit();
}

export async function _adultPinSubmit() {
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
    adults[_adultPinTarget].pinHash = await window._hashPin(_adultPinBuf, window._getHouseholdOwnerUID());
    window.saveData(state);
    document.getElementById('adult-pin-modal').classList.add('hidden');
    renderSettings();
  }
}

// ── Child View — Section 7 ────────────────────────────
// All functions here apply to child profiles only.

export function _cvAgeBracket(kid) {
  const age = Number(kid.age || 0);
  if (age < 5)  return 'tiny-tots';
  if (age < 8)  return 'early-reader';
  if (age < 12) return 'independent';
  return 'tween';
}

export function _cvTimeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// Returns true if routine's time window is currently active.
// Active = current hour >= triggerTime hour AND < triggerTime hour + 6.
// If no triggerTime, treat as always active.
export function _cvRoutineIsActive(routine) {
  if (!routine.triggerTime) return true;
  const [trigH, trigM] = routine.triggerTime.split(':').map(Number);
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const startMins = trigH * 60 + (trigM || 0);
  const endMins   = startMins + 360; // 6-hour window
  return nowMins >= startMins && nowMins < endMins;
}

export function _cvRoutineAvailLabel(routine) {
  if (!routine.triggerTime) return '';
  const [trigH] = routine.triggerTime.split(':').map(Number);
  if (trigH < 12) return 'Available this morning';
  if (trigH < 17) return 'Available this afternoon';
  return 'Available tonight';
}

// Fires confetti burst inside the overlay
export function _cvConfetti() {
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

export function showChildView(kidId) {
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

export function _cvUpdatePrizesBadge(kid) {
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

export function _cvRenderPrizesTab(kid) {
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
  if (notifsDirty) window.saveData(state);
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
export let _cvActiveKidId   = null;
export let _cvActiveTab     = 'today';
export let _cvCalView       = '7day';   // '7day' | 'month'
export let _cvSelectedDate  = null;     // tapped day in month view
export let _cvExpandedRoutines = new Set(); // routineIds expanded in day schedule

export function _cvSwitchTab(tab, kidId) {
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
export function _cvEventsForDate(kid, dateStr) {
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
export function _cvFmt12h(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${h >= 12 ? 'pm' : 'am'}`;
}

// Toggle a routine expanded/collapsed in the day schedule
export function _cvToggleRoutineExpand(routineId) {
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
export function _cvToggleStepFromCal(routineId, stepId, dateStr) {
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

  window.saveData(state);
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(_cvActiveKidId));
  if (kid) _cvRefreshSchedulePanel(kid, dateStr);
}

// Re-renders only the schedule panel (below the strip/grid) without touching the calendar chrome
export function _cvRefreshSchedulePanel(kid, dateStr) {
  const panelId = _cvCalView === 'month' ? 'cv-day-panel' : 'cv-schedule-panel';
  const el = document.getElementById(panelId);
  if (!el) return;
  el.innerHTML = _cvScheduleHtml(kid, dateStr);
}

// Builds the full day schedule HTML for a given kid + date
export function _cvScheduleHtml(kid, dateStr) {
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
export function _cvRoutineSchedCard(routine, assignment, dateKey) {
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

export function _cvRenderCalendar(kid) {
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

export function _cvCalViewToggle(view, kidId) {
  _cvCalView = view;
  _cvSelectedDate = null;
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (kid) _cvRenderCalendar(kid);
}

export function _cvRender7Day(kid, todayStr) {
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
export function _cvWeekDayTap(dateStr, kidId) {
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

export function _cvRenderMonth(kid, todayStr) {
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

export function _cvMonthDayTap(dateStr, kidId) {
  _cvSelectedDate = dateStr;
  _cvExpandedRoutines.clear();
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (kid) _cvRenderCalendar(kid);
}

export function _cvShowDayDetail(dateStr, kidId) {
  // Legacy — redirects to the new inline panel system
  _cvMonthDayTap(dateStr, kidId);
}
// ── CHILD CALENDAR END ──────────────────────────────────────────

export function _cvDismissNotif(notifId, kidId) {
  const n = (state.kids?.notifications || []).find(x => x.id === notifId);
  if (n) n.read = true;
  window.saveData(state);
  showChildView(kidId);
}

export function _cvShowPrizeConfirm(kidId, prizeId) {
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

export function markChoreChildView(kidId, choreId) {
  const existing = state.kids.completions.find(c => c.kidId === kidId && c.choreId === choreId && c.status === 'pending');
  if (existing) return;
  state.kids.completions.push({ id: uid(), kidId, choreId, status: 'pending', ts: new Date().toISOString() });
  window.saveData(state);
  showChildView(kidId);
}

export function redeemPrizeChildView(kidId, prizeId) {
  state.kids.redemptions.push({ id: uid(), kidId, prizeId, status: 'pending', ts: new Date().toISOString() });
  window.saveData(state);
  _cvSwitchTab('prizes', kidId);
}

export function switchToKidMode(kidId) {
  const kid = (state.kids?.profiles || []).find(k => String(k.id) === String(kidId));
  if (!kid) return;
  window._activeProfile = { id: kid.id, name: kid.name, emoji: kid.emoji, role: 'child' };
  window.setKidSession(kid.id);
  showChildView(kidId);
}

// ──────────────────────────────────────────────────────

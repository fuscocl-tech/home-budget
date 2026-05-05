// Planner section
import { state } from '../store.js';
import { aud, escHtml, escAttr, fmtDate, nextId, monthlyTotal, itemMonthly } from './format.js';
import { prefsGet } from '../prefs.js';
import {
  PLANNER_CATS, PLANNER_MEMBER_PALETTE,
  _plannerMembers, _plannerMemberById, _plannerEvMemberIds, _plannerEvPrimaryMember,
  _plannerEvWhoLabel, _plannerRecurrenceLabel, _plannerVisibleEvents, _plannerEventsForDate,
  _plannerFmt12h,
} from './planner-utils.js';
import { estimateAllEvents } from './forecast.js';

export function renderPlanner() {
  const el = document.getElementById('planner-content');
  if (!el) return;
  if (!state.planner) state.planner = { events: [] };

  const today = new Date().toISOString().slice(0,10);
  const members = _plannerMembers();
  const EVERYONE = { id:'everyone', name:'Everyone', emoji:'👨‍👩‍👧', dot:'#94a3b8', bg:'#f1f5f9', text:'#475569' };

  // ── Member legend ──
  // Build smart initials: first letter unique, else first+second
  const allMembers = [...members, EVERYONE];
  const firstLetters = allMembers.map(m => m.name[0].toUpperCase());
  const initials = allMembers.map((m, i) => {
    if (m.id === 'everyone') return '👨‍👩‍👧';
    const first = m.name[0].toUpperCase();
    const isDup = firstLetters.filter(l => l === first).length > 1;
    return isDup ? (m.name[0] + (m.name[1] || '')).toUpperCase() : first;
  });
  const legendHtml = allMembers.map((m, i) => {
    const isEv = m.id === 'everyone';
    const isActive = isEv ? _plannerFilterMembers.size === 0 : _plannerFilterMembers.has(m.id);
    const isDimmed = !isActive && _plannerFilterMembers.size > 0 && !isEv;
    const avatarContent = isEv
      ? `<span style="font-size:14px">👨‍👩‍👧</span>`
      : `<span>${initials[i]}</span>`;
    return `<div class="pl-legend-chip ${isActive?'active':''} ${isDimmed?'dimmed':''}"
      onclick="_plannerToggleFilter('${m.id}')">
      <div class="pl-chip-avatar" style="background:${m.bg};color:${m.text}">${avatarContent}</div>
      <span>${m.name}</span>
    </div>`;
  }).join('');

  // ── Calendar body ──
  let calHtml = '';
  if (_plannerView === 'month') {
    calHtml = _renderPlannerMonthGrid();
  } else {
    calHtml = _renderPlannerWeekStrip();
  }

  // ── Life areas ──
  const in30 = new Date(); in30.setDate(in30.getDate()+30);
  const in30Str = in30.toISOString().slice(0,10);
  const upcoming = _plannerVisibleEvents().filter(e => e.date >= today && e.date <= in30Str);
  let lifeTotal = 0;
  const lifeHtml = Object.entries(PLANNER_CATS).map(([key, cat]) => {
    const catEvs = upcoming.filter(e => e.category === key);
    if (catEvs.length) lifeTotal += catEvs.length;
    const nextEv = catEvs[0];
    const nextLabel = nextEv
      ? escHtml(nextEv.title) + (nextEv.date ? ` · ${new Date(nextEv.date+'T12:00:00').toLocaleDateString('en-AU',{day:'numeric',month:'short'})}` : '')
      : 'Nothing planned';
    return `<div class="pl-life-tile" onclick="_plannerOpenLifeSheet('${key}')">
      <div class="pl-life-tile-top">
        <div class="pl-life-tile-icon" style="background:${cat.color||'#F4F4F5'}">${cat.emoji}</div>
        <div>
          <div class="pl-life-tile-name">${cat.label}</div>
          <div class="pl-life-tile-count">${catEvs.length} event${catEvs.length!==1?'s':''}</div>
        </div>
      </div>
      <div class="pl-life-tile-next">${nextLabel}</div>
    </div>`;
  }).join('');

  // ── Nudges ──
  const nudges = _plannerNudges();
  const nudgeHtml = nudges.map(n => {
    const daysLabel = n.days < 0 ? 'Now!' : n.days === 0 ? 'Today!' : n.days === 1 ? 'Tomorrow' : `In ${n.days} days`;
    const urgencyColor = n.days <= 0 ? '#ef4444' : n.days === 1 ? 'var(--good)' : n.days <= 3 ? '#f59e0b' : 'var(--iris-1)';
    const iconBg = n.days <= 0 ? '#FEF2F2' : n.days === 1 ? '#ECFDF5' : n.days <= 3 ? '#FFF7ED' : '#EEF2FF';
    return `<div class="pl-nudge-tile">
      <div class="pl-nudge-tile-icon" style="background:${iconBg}">${n.emoji}</div>
      <div class="pl-nudge-tile-body">
        <div class="pl-nudge-tile-title">${escHtml(n.title)}</div>
        <div class="pl-nudge-tile-sub">${escHtml(n.body)}</div>
      </div>
      <div class="pl-nudge-tile-day" style="color:${urgencyColor}">${daysLabel}</div>
    </div>`;
  }).join('');

  const lifeOpen = _plannerCollapseState['life-areas'];
  const nudgeOpen = _plannerCollapseState['nudge'];
  const todayMonth = today.slice(0,7);

  const dateLine = new Date().toLocaleDateString('en-AU', { weekday:'long', month:'long', day:'numeric' });
  el.innerHTML = `
    <div style="position:relative;display:flex;flex-direction:column;height:100%;overflow:hidden">

      <!-- Month bar (wallet style) -->
      <div class="pl-month-bar">
        <button class="pl-nav-arrow" onclick="_plannerPrevMonth()">&#8249;</button>
        <div class="pl-month-label">${new Date(_plannerMonth + '-01').toLocaleDateString('en-AU',{month:'long',year:'numeric'})}</div>
        <button class="pl-nav-arrow" onclick="_plannerNextMonth()">&#8250;</button>
      </div>

      <!-- Filter tile: view toggle + members + calendar strip -->
      <div class="pl-control-tile">
        <div class="pl-sub-bar">
          <div class="pl-view-toggle">
            <button class="pl-view-btn ${_plannerMonth===todayMonth&&_plannerSelectedDay===today?'active':''}" onclick="_plannerGoToday()">Today</button>
            <button class="pl-view-btn ${_plannerView==='week'?'active':''}" onclick="_plannerSetView('week')">Week</button>
            <button class="pl-view-btn ${_plannerView==='month'?'active':''}" onclick="_plannerSetView('month')">Month</button>
          </div>
          <button class="pl-add-btn" onclick="openPlannerModal(null,'${_plannerSelectedDay||today}')">+</button>
        </div>
        <div class="pl-legend">${legendHtml}</div>
        ${_plannerView==='month' ? `
          <div style="border-bottom:1px solid rgba(24,24,27,.06);padding:0 6px">
            <div class="pl-month-hdr">
              <div class="pl-month-hdr-cell">M</div><div class="pl-month-hdr-cell">T</div>
              <div class="pl-month-hdr-cell">W</div><div class="pl-month-hdr-cell">T</div>
              <div class="pl-month-hdr-cell">F</div><div class="pl-month-hdr-cell">S</div>
              <div class="pl-month-hdr-cell">S</div>
            </div>
            ${calHtml}
          </div>` : calHtml}
        <div style="height:10px"></div>
      </div>

      <!-- Scrollable body -->
      <div style="flex:1;overflow-y:auto;">

        <!-- Inline agenda (week + month view) -->
        ${_renderPlannerAgenda(_plannerSelectedDay)}

        <!-- Life areas -->
        <div class="pl-section-card">
          <div class="pl-section-card-hdr" onclick="_plannerToggleSection('life-areas')">
            <div class="pl-section-card-title">
              Life Areas
              <span style="font-size:11px;font-weight:700;background:var(--iris-1);color:#fff;padding:1px 8px;border-radius:99px;letter-spacing:0">${lifeTotal}</span>
            </div>
            <button class="pl-section-card-toggle">${lifeOpen?'Hide':'Show'}</button>
          </div>
          ${lifeOpen ? `<div class="pl-section-card-body"><div class="pl-life-grid">${lifeHtml}</div></div>` : ''}
        </div>

        <!-- Nudges -->
        ${nudges.length > 0 ? `
        <div class="pl-section-card">
          <div class="pl-section-card-hdr" onclick="_plannerToggleSection('nudge')">
            <div class="pl-section-card-title">
              Heads up 🐕
              <span style="font-size:11px;font-weight:700;background:#f59e0b;color:#fff;padding:1px 8px;border-radius:99px;letter-spacing:0">${nudges.length}</span>
            </div>
            <button class="pl-section-card-toggle">${nudgeOpen?'Hide':'Show'}</button>
          </div>
          ${nudgeOpen ? `<div class="pl-section-card-body">${nudgeHtml}</div>` : ''}
        </div>` : ''}

        <div style="height:24px"></div>

      </div>

      <!-- Day sheet (hidden, kept for compatibility) -->
      <div class="pl-day-sheet-overlay" id="pl-day-sheet-overlay" onclick="_plannerHandleDaySheetClick(event)" style="display:none">
        <div class="pl-day-sheet" id="pl-day-sheet">
          <div class="pl-sheet-handle" onclick="_plannerCloseDaySheet()"></div>
          <div class="pl-sheet-header">
            <div>
              <div class="pl-sheet-title" id="pl-sheet-title"></div>
              <div class="pl-sheet-date" id="pl-sheet-date"></div>
            </div>
            <button class="pl-sheet-add" id="pl-sheet-add-btn" data-date="${_plannerSelectedDay}" onclick="_plannerOpenModalFromSheet()">+ Add</button>
          </div>
          <div class="pl-sheet-list" id="pl-sheet-list"></div>
        </div>
      </div>

      <!-- Life area sheet -->
      <div class="pl-life-overlay" id="pl-life-overlay" onclick="_plannerHandleLifeSheetClick(event)">
        <div class="pl-life-sheet">
          <div class="pl-sheet-handle" onclick="_plannerCloseLifeSheet()"></div>
          <div class="pl-life-sheet-header">
            <div class="pl-life-sheet-icon" id="pl-life-sheet-icon"></div>
            <div class="pl-life-sheet-title" id="pl-life-sheet-title"></div>
            <div class="pl-life-sheet-count" id="pl-life-sheet-count"></div>
          </div>
          <div class="pl-life-sheet-list" id="pl-life-sheet-list"></div>
        </div>
      </div>

      <!-- Event detail sheet -->
      <div class="pl-detail-overlay" id="pl-detail-overlay" onclick="_plannerHandleDetailClick(event)">
        <div class="pl-detail-sheet" id="pl-detail-sheet">
          <div class="pl-sheet-handle" onclick="_plannerCloseDetail()"></div>
          <div class="pl-detail-color-bar" id="pl-detail-color-bar"></div>
          <div class="pl-detail-header">
            <div class="pl-detail-title-row">
              <div class="pl-detail-title" id="pl-detail-title"></div>
              <button class="pl-detail-edit-btn" onclick="_plannerEditFromDetail()">Edit</button>
            </div>
          </div>
          <div class="pl-detail-body" id="pl-detail-body"></div>
        </div>
      </div>

      <!-- Share sheet -->
      <div class="pl-share-overlay" id="pl-share-overlay" onclick="_plannerHandleShareClick(event)">
        <div class="pl-share-sheet">
          <div class="pl-sheet-handle" onclick="_plannerCloseShare()"></div>
          <div class="pl-share-header">
            <div class="pl-share-title">Share this event</div>
            <div class="pl-share-sub" id="pl-share-sub"></div>
          </div>
          <div class="pl-share-url-box">
            <div class="pl-share-url-text" id="pl-share-url"></div>
            <button class="pl-share-copy-btn" id="pl-share-copy-btn" onclick="_plannerCopyShareUrl()">Copy</button>
          </div>
          <div class="pl-share-actions">
            <div class="pl-share-action" onclick="_plannerShareVia('sms')"><span style="font-size:20px">💬</span>SMS</div>
            <div class="pl-share-action" onclick="_plannerShareVia('whatsapp')"><span style="font-size:20px">💚</span>WhatsApp</div>
            <div class="pl-share-action" onclick="_plannerShareVia('email')"><span style="font-size:20px">📧</span>Email</div>
          </div>
          <div class="pl-share-note">🔗 Recipients don't need the Toto app — they'll see a branded Toto page with the event details. The link expires after 30 days.</div>
        </div>
      </div>

    </div>`;

  // Day sheet only opens on explicit user tap, never on initial render
}

export function _renderPlannerMonthGrid() {
  const [y, m] = _plannerMonth.split('-').map(Number);
  const today = new Date().toISOString().slice(0, 10);
  const firstDow = new Date(y, m-1, 1).getDay();
  const startOffset = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(y, m, 0).getDate();
  const daysInPrev  = new Date(y, m-1, 0).getDate();

  let cells = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    const mo = m - 1 || 12;
    const yr = mo === 12 ? y - 1 : y;
    cells.push({ dateStr: `${yr}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`, day: d, muted: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ dateStr: `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`, day: d, muted: false });
  }
  const tail = cells.length % 7 === 0 ? 0 : 7 - (cells.length % 7);
  for (let d = 1; d <= tail; d++) {
    const mo = m + 1 > 12 ? 1 : m + 1;
    const yr = mo === 1 ? y + 1 : y;
    cells.push({ dateStr: `${yr}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`, day: d, muted: true });
  }

  const grid = cells.map(cell => {
    const isToday    = cell.dateStr === today;
    const isSelected = cell.dateStr === _plannerSelectedDay;
    const dayEvs     = cell.dateStr ? _plannerEventsForDate(cell.dateStr) : [];
    const memberDots = [...new Set(dayEvs.flatMap(e => _plannerEvMemberIds(e)))].filter(id => id !== 'everyone').slice(0,3);
    const dots = memberDots.map(mid => {
      const mb = _plannerMemberById(mid);
      return `<div class="pl-cell-dot" style="background:${mb.dot}"></div>`;
    }).join('');
    const more = dayEvs.length > 3 ? `<div style="font-size:8px;color:var(--text-muted);font-weight:600">+</div>` : '';
    return `<div class="pl-cal-cell ${cell.muted?'muted':''} ${isToday?'today':''} ${isSelected?'selected':''}"
                 onclick="_plannerSelectDay('${cell.dateStr}')">
      <div class="pl-cell-num">${cell.day}</div>
      <div class="pl-cell-dots">${dots}${more}</div>
    </div>`;
  }).join('');

  return `<div class="pl-month-grid">${grid}</div>`;
}

export function _renderPlannerWeekStrip() {
  const anchor = new Date(_plannerSelectedDay + 'T12:00:00');
  const dow = anchor.getDay();
  const monday = new Date(anchor);
  monday.setDate(anchor.getDate() - (dow === 0 ? 6 : dow - 1));
  const today = new Date().toISOString().slice(0,10);
  const initials = ['S','M','T','W','T','F','S'];
  const days = Array.from({length:7}, (_,i) => {
    const d = new Date(monday); d.setDate(monday.getDate()+i);
    return { date: d, dateStr: d.toISOString().slice(0,10) };
  });
  const cells = days.map(({date, dateStr}) => {
    const isToday    = dateStr === today;
    const isSelected = dateStr === _plannerSelectedDay;
    const dayEvs     = _plannerEventsForDate(dateStr);
    const hasEvs     = dayEvs.length > 0;
    // dot colour: purple on selected/today, member colour otherwise
    const memberDots = [...new Set(dayEvs.flatMap(e => _plannerEvMemberIds(e)))].filter(id => id !== 'everyone').slice(0,3);
    const dotColor = isSelected
      ? 'rgba(255,255,255,0.6)'
      : memberDots.length ? _plannerMemberById(memberDots[0]).dot : '#C4C2D4';
    const cls = isSelected
      ? 'ws-day selected' + (isToday ? ' today-outline' : '')
      : isToday ? 'ws-day today-outline' : 'ws-day';
    const hasCls = hasEvs ? ' has' : '';
    return `<div class="${cls}${hasCls}" onclick="_plannerSelectDay('${dateStr}')">
      <div class="ws-init">${initials[date.getDay()]}</div>
      <div class="ws-num">${date.getDate()}</div>
      <div class="ws-dot" style="${hasEvs ? `background:${dotColor}` : ''}"></div>
    </div>`;
  });
  return `<div class="week-strip">${cells.join('')}</div>`;
}

export function _renderPlannerEventRow(ev) {
  const cat = PLANNER_CATS[ev.category] || PLANNER_CATS.other;
  const isOpen = _plannerExpanded.has(ev.id);
  const estimates = ev.estimates || [];
  const accepted = estimates.filter(e => e.accepted);
  const acceptedTotal = accepted.reduce((s,e) => s+(e.amount||0), 0);
  const allTotal = estimates.reduce((s,e) => s+(e.amount||0), 0);

  let sideBadge = ev.pushed
    ? `<span class="planner-pushed-badge">✓ In budget</span>`
    : estimates.length > 0
      ? `<span style="font-size:12px;color:var(--text-muted)">$${acceptedTotal.toLocaleString('en-AU')}</span>`
      : '';
  const _recurringLabels = { weekly:'Weekly', fortnightly:'Fortnightly', monthly:'Monthly', quarterly:'Quarterly', yearly:'Annually' };
  const _recLabel = _plannerRecurrenceLabel(ev);
  if (_recLabel) sideBadge = `<span class="recurring-badge">🔄 ${_recLabel}</span> ` + sideBadge;

  let body = '';
  if (isOpen) {
    body = `<div class="planner-event-body">`;
    if (ev.notes) body += `<p class="planner-notes">${escHtml(ev.notes)}</p>`;
    if (estimates.length > 0) {
      body += estimates.map(est => `
        <div class="planner-estimate-row">
          <div class="planner-estimate-check ${est.accepted?'accepted':''}" onclick="togglePlannerEstimate('${ev.id}','${est.id}')">
            ${est.accepted ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
          </div>
          <div class="planner-estimate-name"><div>${escHtml(est.name)}</div><div class="planner-estimate-cat">${escHtml(est.category)}</div></div>
          <div class="planner-estimate-amount">$${est.amount.toLocaleString('en-AU')}</div>
        </div>`).join('');
      body += `<div class="planner-estimate-footer">
        <div class="planner-total">All: <strong>$${allTotal.toLocaleString('en-AU')}</strong> · Selected: <strong>$${acceptedTotal.toLocaleString('en-AU')}</strong></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${!ev.pushed ? `<button class="planner-ai-btn" id="ai-btn-${ev.id}" onclick="estimatePlannerEvent('${ev.id}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>Re-estimate</button>` : ''}
          ${ev.pushed === true
            ? `<button class="planner-push-btn" style="background:var(--danger)" onclick="unpushEventFromBudget('${ev.id}')">Remove from budget</button>`
            : ev.pushed === 'suggested'
              ? `<button class="planner-push-btn" style="background:#f59e0b;cursor:default" disabled>⏳ Pending approval</button>`
              : `<button class="planner-push-btn" ${accepted.length===0?'disabled':''} onclick="suggestEventToBudget('${ev.id}')">→ Suggest to budget</button>`}
        </div>
      </div>`;
    } else if (cat.financial) {
      body += `<div style="text-align:center;padding:16px 0">
        <p style="color:var(--text-muted);font-size:13px;margin-bottom:12px">Let Toto estimate the costs.</p>
        <button class="planner-ai-btn" id="ai-btn-${ev.id}" onclick="estimatePlannerEvent('${ev.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          Estimate costs with AI
        </button>
      </div>`;
    }
    body += `</div>`;
  }

  return `<div class="planner-event-card" id="planner-ev-${ev.id}">
    <div class="planner-event-header" onclick="togglePlannerCard('${ev.id}')">
      <div class="planner-event-type-badge" style="background:${cat.color};color:${cat.text}">${cat.emoji}</div>
      <div class="planner-event-meta">
        <div class="planner-event-title">${escHtml(ev.title)}</div>
        <div class="planner-event-date">${cat.label}</div>
      </div>
      <div class="planner-event-side">
        ${sideBadge}
        <button onclick="event.stopPropagation();openPlannerModal('${ev.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);padding:4px;border-radius:6px;display:flex" title="Edit">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <svg class="planner-chevron ${isOpen?'open':''}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
    ${body}
  </div>`;
}

export function _plannerPrevMonth() {
  const [y, m] = _plannerMonth.split('-').map(Number);
  const yr2 = m === 1 ? y-1 : y, mo2 = m === 1 ? 12 : m-1;
  _plannerMonth = `${yr2}-${String(mo2).padStart(2,'0')}`;
  _plannerSelectedDay = `${yr2}-${String(mo2).padStart(2,'0')}-01`;
  renderPlanner();
}
export function _plannerNextMonth() {
  const [y, m] = _plannerMonth.split('-').map(Number);
  const yr2 = m === 12 ? y+1 : y, mo2 = m === 12 ? 1 : m+1;
  _plannerMonth = `${yr2}-${String(mo2).padStart(2,'0')}`;
  _plannerSelectedDay = `${yr2}-${String(mo2).padStart(2,'0')}-01`;
  renderPlanner();
}
export function _plannerSelectDay(dateStr) {
  _plannerSelectedDay = dateStr;
  _plannerMonth = dateStr.slice(0,7);
  renderPlanner();
}

export function _renderPlannerAgenda(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const today = new Date().toISOString().slice(0,10);
  const isToday = dateStr === today;
  const dayLabel = isToday ? 'Today' : d.toLocaleDateString('en-AU', {weekday:'long'});
  const dateLabel = d.toLocaleDateString('en-AU', {day:'numeric', month:'long', year:'numeric'});

  const dayEvs = _plannerEventsForDate(dateStr)
    .sort((a,b) => {
      if (a.allDay && !b.allDay) return -1;
      if (!a.allDay && b.allDay) return 1;
      return (a.time||'99:99').localeCompare(b.time||'99:99');
    });

  let evHtml = '';
  if (dayEvs.length === 0) {
    evHtml = `<div class="pl-agenda-empty">Nothing planned — enjoy the quiet ☀️<br><span style="color:var(--iris-1);cursor:pointer;font-weight:600;font-size:13px" onclick="openPlannerModal(null,'${dateStr}')">+ Add an event</span></div>`;
  } else {
    evHtml = `<div class="pl-agenda-list">${dayEvs.map(ev => {
      const mb  = _plannerEvPrimaryMember(ev);
      const cat = PLANNER_CATS[ev.category] || PLANNER_CATS.other;
      const timeLabel = ev.allDay || !ev.time ? 'All day' : _plannerFmt12h(ev.time);
      const who = _plannerEvWhoLabel(ev);
      const nowMins = new Date().getHours()*60 + new Date().getMinutes();
      const evMins = ev.time ? parseInt(ev.time.split(':')[0])*60 + parseInt(ev.time.split(':')[1]) : -1;
      const isNow = dateStr === new Date().toISOString().slice(0,10) && evMins >= 0 && nowMins >= evMins && nowMins < evMins + 90;
      const catBg   = cat.color || '#f1f5f9';
      const catText = cat.text  || '#475569';
      return `<div class="pl-agenda-ev">
        <div class="pl-agenda-time-col">
          <span class="pl-agenda-time">${timeLabel}</span>
        </div>
        <div class="pl-agenda-timeline">
          <div class="pl-agenda-dot${isNow?' now':''}" style="color:${catText};background:${isNow?catText:catBg}"></div>
          <div class="pl-agenda-line"></div>
        </div>
        <div class="pl-agenda-card" style="background:${catBg};border-color:${catText}22" onclick="_plannerOpenDetail('${ev.id}')">
          <div class="pl-agenda-card-title">${escHtml(ev.title)}</div>
          <div class="pl-agenda-card-meta">
            <span class="pl-agenda-who-dot" style="background:${mb.dot}"></span>
            <span>${who}</span>
          </div>
          ${cat.label ? `<div class="pl-agenda-cat-pill" style="background:${catText}1a;color:${catText}">${cat.emoji} ${cat.label}</div>` : ''}
        </div>
      </div>`;
    }).join('')}</div>`;
  }

  return `<div class="pl-section-card pl-agenda">
    <div class="pl-agenda-hdr" style="padding:14px 16px 12px;margin-bottom:0;border-bottom:${dayEvs.length?'1px solid rgba(24,24,27,.06)':'none'}">
      <div>
        <span class="pl-agenda-date">${dayLabel}</span>
        <span class="pl-agenda-sub" style="margin-left:8px">${dateLabel}</span>
      </div>
      <button class="pl-agenda-add" onclick="openPlannerModal(null,'${dateStr}')">+ Add</button>
    </div>
    <div style="padding:${dayEvs.length?'12px 16px':'0'}">${evHtml}</div>
  </div>`;
}
export function goToPlannerDay(dateStr) {
  _plannerMonth = dateStr.slice(0, 7);
  _plannerSelectedDay = dateStr;
  activateTab('planner');
}
export function _plannerGoToday() {
  const today = new Date().toISOString().slice(0,10);
  _plannerMonth = today.slice(0,7);
  _plannerSelectedDay = today;
  renderPlanner();
}
export function _plannerSetView(v) {
  _plannerView = v;
  _plannerCollapseState['life-areas'] = v === 'week';
  _plannerCollapseState['nudge']      = v === 'week';
  renderPlanner();
}
export function _plannerToggleSection(key) {
  _plannerCollapseState[key] = !_plannerCollapseState[key];
  renderPlanner();
}
export function _plannerToggleFilter(id) {
  if (id === 'everyone') { _plannerFilterMembers.clear(); }
  else if (_plannerFilterMembers.has(id)) { _plannerFilterMembers.delete(id); }
  else { _plannerFilterMembers.add(id); }
  renderPlanner();
}

// Day bottom sheet
export function _plannerOpenDaySheet(dateStr) {
  const el = document.getElementById('pl-day-sheet-overlay');
  if (!el) return;
  const d = new Date(dateStr + 'T12:00:00');
  const today = new Date().toISOString().slice(0,10);
  document.getElementById('pl-sheet-title').textContent = dateStr === today ? 'Today' : d.toLocaleDateString('en-AU',{weekday:'long'});
  document.getElementById('pl-sheet-date').textContent  = d.toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'});
  document.getElementById('pl-sheet-add-btn').dataset.date = dateStr;
  _plannerRenderDaySheetList(dateStr);
  el.classList.add('open');
}
export function _plannerRenderDaySheetList(dateStr) {
  const dayEvs = _plannerEventsForDate(dateStr)
    .sort((a,b) => (a.time||'99:99').localeCompare(b.time||'99:99'));
  const list = document.getElementById('pl-sheet-list');
  if (!list) return;
  if (dayEvs.length === 0) {
    list.innerHTML = `<div class="pl-sheet-empty">Nothing planned. <span style="color:var(--primary);cursor:pointer;font-weight:600" onclick="_plannerOpenModalFromSheet()">Add an event →</span></div>`;
    return;
  }
  list.innerHTML = dayEvs.map((ev, i) => {
    const mb  = _plannerEvPrimaryMember(ev);
    const cat = PLANNER_CATS[ev.category] || PLANNER_CATS.other;
    const who = _plannerEvWhoLabel(ev);
    const timeLabel = ev.allDay || !ev.time ? 'All day' : _plannerFmt12h(ev.time);
    return `<div class="pl-sheet-ev" onclick="_plannerOpenDetail('${ev.id}')">
      <div class="pl-sheet-ev-time">${timeLabel}</div>
      <div class="pl-sheet-ev-bar" style="background:${mb.dot}"></div>
      <div style="flex:1;min-width:0">
        <div class="pl-sheet-ev-title">${escHtml(ev.title)}</div>
        <div class="pl-sheet-ev-meta">${who} · ${cat.emoji} ${cat.label}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4D4D8" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>`;
  }).join('');
}
export function _plannerCloseDaySheet() {
  const el = document.getElementById('pl-day-sheet-overlay');
  if (el) el.classList.remove('open');
}
export function _plannerHandleDaySheetClick(e) {
  if (e.target === document.getElementById('pl-day-sheet-overlay')) _plannerCloseDaySheet();
}
export function _plannerOpenModalFromSheet() {
  const dateStr = document.getElementById('pl-sheet-add-btn')?.dataset?.date || _plannerSelectedDay;
  _plannerCloseDaySheet();
  openPlannerModal(null, dateStr);
}

// Life area sheet
export function _plannerOpenLifeSheet(catKey) {
  const catDef = PLANNER_CATS[catKey];
  if (!catDef) return;
  const today = new Date().toISOString().slice(0,10);
  const catEvs = (state.planner?.events || [])
    .filter(e => e.category === catKey && e.date >= today)
    .sort((a,b) => a.date.localeCompare(b.date));
  document.getElementById('pl-life-sheet-icon').textContent  = catDef.emoji;
  document.getElementById('pl-life-sheet-title').textContent = catDef.label;
  document.getElementById('pl-life-sheet-count').textContent = catEvs.length + ' upcoming';
  let html = '';
  if (catEvs.length === 0) {
    html = `<div class="pl-sheet-empty">No upcoming ${catDef.label.toLowerCase()} events.</div>`;
  } else {
    let lastMonth = '';
    catEvs.forEach(ev => {
      const monthKey = ev.date.slice(0,7);
      if (monthKey !== lastMonth) {
        const d = new Date(ev.date + 'T12:00:00');
        html += `<div class="pl-life-day-hdr">${d.toLocaleDateString('en-AU',{month:'long',year:'numeric'})}</div>`;
        lastMonth = monthKey;
      }
      const mb  = _plannerEvPrimaryMember(ev);
      const who = _plannerEvWhoLabel(ev);
      const d   = new Date(ev.date + 'T12:00:00');
      html += `<div class="pl-life-ev-row" onclick="_plannerCloseLifeSheet();_plannerOpenDetail('${ev.id}')">
        <div class="pl-life-ev-date">${d.toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'})}</div>
        <div class="pl-life-ev-bar" style="background:${mb.dot}"></div>
        <div class="pl-life-ev-content">
          <div class="pl-life-ev-title">${escHtml(ev.title)}</div>
          <div class="pl-life-ev-meta">${who}${ev.time?' · '+_plannerFmt12h(ev.time):''}</div>
        </div>
      </div>`;
    });
  }
  document.getElementById('pl-life-sheet-list').innerHTML = html;
  document.getElementById('pl-life-overlay').classList.add('open');
}
export function _plannerCloseLifeSheet() {
  document.getElementById('pl-life-overlay')?.classList.remove('open');
}
export function _plannerHandleLifeSheetClick(e) {
  if (e.target === document.getElementById('pl-life-overlay')) _plannerCloseLifeSheet();
}

// Event detail sheet
export function _plannerOpenDetail(evId) {
  const ev = (state.planner?.events||[]).find(e => e.id === evId);
  if (!ev) return;
  _plannerDetailEvId = evId;
  const mb  = _plannerEvPrimaryMember(ev);
  const cat = PLANNER_CATS[ev.category] || PLANNER_CATS.other;
  const ids = _plannerEvMemberIds(ev);
  document.getElementById('pl-detail-title').textContent = ev.title;
  document.getElementById('pl-detail-color-bar').style.background = mb.dot;
  const startD = new Date(ev.date + 'T12:00:00');
  let dateStr = startD.toLocaleDateString('en-AU',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  let timeStr = ev.allDay ? 'All day' : (ev.time ? _plannerFmt12h(ev.time) : '');
  if (!ev.allDay && ev.endTime) timeStr += ' – ' + _plannerFmt12h(ev.endTime);
  const allMb = (ids.includes('everyone') ? [{id:'everyone',name:'Everyone',emoji:'👨‍👩‍👧',dot:'#94a3b8',bg:'#f1f5f9',text:'#475569'}] : ids.map(id => _plannerMemberById(id)));
  const whoChips = allMb.map(m => `<span style="display:inline-flex;align-items:center;gap:5px;background:${m.bg};color:${m.text};padding:4px 10px;border-radius:99px;font-size:12px;font-weight:600">${m.emoji} ${m.name}</span>`).join(' ');
  const estimates = ev.estimates || [];
  const accepted = estimates.filter(e => e.accepted);
  const total = accepted.reduce((s,e)=>s+(e.amount||0),0);
  const rows = [
    { icon:'📅', label:'Date', value: dateStr },
    timeStr ? { icon:'🕐', label:'Time', value: timeStr } : null,
    ev.location ? { icon:'📍', label:'Address', value: escHtml(ev.location) } : null,
    { icon:'👥', label:'Who', value: `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">${whoChips}</div>` },
    { icon: cat.emoji, label:'Category', value: cat.label },
    _plannerRecurrenceLabel(ev) ? { icon:'🔄', label:'Repeats', value: _plannerRecurrenceLabel(ev) } : null,
    total > 0 ? { icon:'💰', label:'Est. cost', value: `$${total.toLocaleString('en-AU')}` } : null,
    ev.notes ? { icon:'📝', label:'Notes', value: escHtml(ev.notes) } : null,
  ].filter(Boolean);
  document.getElementById('pl-detail-body').innerHTML =
    rows.map(r => `<div class="pl-detail-row">
      <div class="pl-detail-icon">${r.icon}</div>
      <div style="flex:1;min-width:0">
        <div class="pl-detail-row-label">${r.label}</div>
        <div class="pl-detail-row-value">${r.value}</div>
      </div>
    </div>`).join('') +
    (cat.financial ? `<button class="planner-ai-btn" style="width:100%;justify-content:center;margin-top:16px" onclick="_plannerCloseDetail();estimatePlannerEvent('${evId}')">✦ Estimate costs with AI</button>` : '') +
    `<button class="pl-detail-share-btn" onclick="_plannerOpenShare('${evId}')">🔗 Share this event</button>`;
  document.getElementById('pl-detail-overlay').classList.add('open');
}
export function _plannerCloseDetail() {
  document.getElementById('pl-detail-overlay')?.classList.remove('open');
  _plannerDetailEvId = null;
}
export function _plannerHandleDetailClick(e) {
  if (e.target === document.getElementById('pl-detail-overlay')) _plannerCloseDetail();
}
export function _plannerEditFromDetail() {
  const id = _plannerDetailEvId;
  _plannerCloseDetail();
  if (id) openPlannerModal(id);
}

export function _plannerOpenShare(evId) {
  const ev = (state.planner?.events||[]).find(e => e.id === evId);
  if (!ev) return;
  const slug = ev.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  const token = Math.random().toString(36).slice(2,10);
  const url = `https://toto.app/event/${slug}-${token}`;
  const subEl = document.getElementById('pl-share-sub');
  const urlEl = document.getElementById('pl-share-url');
  const copyBtn = document.getElementById('pl-share-copy-btn');
  if (subEl) subEl.textContent = ev.title;
  if (urlEl) urlEl.textContent = url;
  if (copyBtn) { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }
  document.getElementById('pl-share-overlay')?.classList.add('open');
}
export function _plannerCloseShare() {
  document.getElementById('pl-share-overlay')?.classList.remove('open');
}
export function _plannerHandleShareClick(e) {
  if (e.target === document.getElementById('pl-share-overlay')) _plannerCloseShare();
}
export function _plannerCopyShareUrl() {
  const url = document.getElementById('pl-share-url')?.textContent;
  if (url) navigator.clipboard?.writeText(url).catch(()=>{});
  const btn = document.getElementById('pl-share-copy-btn');
  if (btn) { btn.textContent = 'Copied!'; btn.classList.add('copied'); setTimeout(()=>{ btn.textContent='Copy'; btn.classList.remove('copied'); }, 2000); }
}
export function _plannerShareVia(method) {
  const url = document.getElementById('pl-share-url')?.textContent || '';
  const ev  = (state.planner?.events||[]).find(e => e.id === _plannerDetailEvId);
  const text = ev ? `${ev.title} — ${url}` : url;
  if (method==='sms')      window.open(`sms:?body=${encodeURIComponent(text)}`);
  if (method==='whatsapp') window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  if (method==='email')    window.open(`mailto:?subject=${encodeURIComponent(ev?.title||'Event')}&body=${encodeURIComponent(text)}`);
}

export function _plannerNudges() {
  function daysUntil(d) { return Math.ceil((d - new Date().setHours(0,0,0,0)) / 86400000); }
  function getNthDay(y, m, dow, n) { const d = new Date(y,m,1); while(d.getDay()!==dow) d.setDate(d.getDate()+1); d.setDate(d.getDate()+(n-1)*7); return d; }
  const y = new Date().getFullYear();
  return [
    { emoji:'🧾', title:'EOFY', days: daysUntil(new Date(y,5,30)), body:'Tax time — accountant fees, donations, prepayments' },
    { emoji:'🎄', title:'Christmas', days: daysUntil(new Date(y,11,25)), body:'Gifts, travel, food — start budgeting early' },
    { emoji:'💐', title:"Mother's Day", days: daysUntil(getNthDay(y,4,0,2)), body:'Gift, brunch or dinner for Mum' },
    { emoji:'👔', title:"Father's Day", days: daysUntil(getNthDay(y,8,0,1)), body:'Gift or outing for Dad' },
  ].filter(n => n.days >= -3 && n.days <= 60).sort((a,b)=>a.days-b.days);
}

export function togglePlannerCard(id) {
  if (_plannerExpanded.has(id)) _plannerExpanded.delete(id);
  else _plannerExpanded.add(id);
  renderPlanner();
}

// ── Weekly strip ──────────────────────────────────
// renderWeeklyStrip replaced by _renderPlannerWeekStrip

export function togglePlannerEstimate(eventId, estId) {
  const ev = (state.planner?.events || []).find(e => e.id === eventId);
  if (!ev) return;
  const est = (ev.estimates || []).find(e => e.id === estId);
  if (!est) return;
  est.accepted = !est.accepted;
  window.saveData(state);
  renderPlanner();
}

export function suggestEventToBudget(eventId) {
  const ev = (state.planner?.events || []).find(e => e.id === eventId);
  if (!ev) return;
  const accepted = (ev.estimates || []).filter(e => e.accepted);
  if (!accepted.length) return;
  const monthStr = ev.date.slice(0, 7);
  if (!state.budget.suggestions) state.budget.suggestions = [];
  // Remove any previous suggestions from this event
  state.budget.suggestions = state.budget.suggestions.filter(s => s.eventId !== ev.id);
  accepted.forEach(est => {
    state.budget.suggestions.push({
      id: 'sug-' + Date.now() + '-' + Math.random().toString(36).slice(2,5),
      month: monthStr,
      eventId: ev.id,
      eventTitle: ev.title,
      estId: est.id,
      name: est.name,
      amount: est.amount,
      category: est.category,
      status: 'pending'
    });
  });
  ev.pushed = 'suggested';
  window.saveData(state);
  _plannerExpanded.add(eventId);
  renderPlanner();
  const monthFmt = new Date(monthStr+'-15').toLocaleDateString('en-AU',{month:'long',year:'numeric'});
  // If on a different month, offer to navigate
  if (monthStr !== window.selectedBudgetMonth) {
    if (confirm(`${accepted.length} suggestion${accepted.length>1?'s':''} sent to ${monthFmt} budget.\n\nGo to Monthly Budget to approve them?`)) {
      window.selectedBudgetMonth = monthStr;
      activateTab('budget');
    }
  } else {
    window.safeRender(renderBudget);
  }
}

export function approveSuggestion(sugId) {
  const sug = (state.budget.suggestions||[]).find(s => s.id === sugId);
  if (!sug) return;
  const mb = window.ensureMonthOverride(sug.month);
  mb.expenses.push({
    id: nextId(mb.expenses),
    name: `${sug.name} (${sug.eventTitle})`,
    amount: sug.amount,
    frequency: 'monthly',
    category: sug.category,
    recurring: false,
    _plannerEventId: sug.eventId
  });
  sug.status = 'approved';
  // If all suggestions for this event are resolved, mark event as pushed
  const ev = (state.planner?.events||[]).find(e => e.id === sug.eventId);
  if (ev) {
    const pending = (state.budget.suggestions||[]).filter(s => s.eventId === ev.id && s.status === 'pending');
    if (pending.length === 0) ev.pushed = true;
  }
  window.saveData(state);
  window.safeRender(renderBudget);
  window.safeRender(renderPlanner);
}

export function dismissSuggestion(sugId) {
  const sug = (state.budget.suggestions||[]).find(s => s.id === sugId);
  if (!sug) return;
  sug.status = 'dismissed';
  const ev = (state.planner?.events||[]).find(e => e.id === sug.eventId);
  if (ev) {
    const pending = (state.budget.suggestions||[]).filter(s => s.eventId === ev.id && s.status === 'pending');
    if (pending.length === 0) ev.pushed = ev.pushed === 'suggested' ? false : ev.pushed;
  }
  window.saveData(state);
  window.safeRender(renderBudget);
}

export function renderBudgetSuggestions(monthStr) {
  const pending = (state.budget?.suggestions||[]).filter(s => s.month === monthStr && s.status === 'pending');
  if (!pending.length) return '';
  const grouped = {};
  pending.forEach(s => { if (!grouped[s.eventTitle]) grouped[s.eventTitle] = []; grouped[s.eventTitle].push(s); });
  const rows = pending.map(s => `
    <div class="suggestion-row">
      <span class="suggestion-event-tag">📅 ${escHtml(s.eventTitle)}</span>
      <div style="flex:1;min-width:0">
        <div class="suggestion-name">${escHtml(s.name)}</div>
        <div class="suggestion-cat">${s.category}</div>
      </div>
      <span class="suggestion-amount">${aud(s.amount)}</span>
      <button class="suggestion-approve" onclick="approveSuggestion('${s.id}')">✓ Approve</button>
      <button class="suggestion-dismiss" onclick="dismissSuggestion('${s.id}')">✕</button>
    </div>`).join('');
  return `<div class="suggestion-inbox">
    <div class="suggestion-inbox-header">
      <span style="font-size:16px">📥</span>
      <span class="suggestion-inbox-title">Suggested from Planner</span>
      <span class="suggestion-inbox-count">${pending.length} pending</span>
    </div>
    ${rows}
  </div>`;
}

export function unpushEventFromBudget(eventId) {
  const ev = (state.planner?.events || []).find(e => e.id === eventId);
  if (!ev) return;
  // Remove approved budget items
  Object.values(state.budget.months || {}).forEach(mb => {
    mb.expenses = (mb.expenses || []).filter(e => e._plannerEventId !== eventId);
  });
  state.budget.expenses = (state.budget.expenses || []).filter(e => e._plannerEventId !== eventId);
  // Remove suggestions
  state.budget.suggestions = (state.budget.suggestions||[]).filter(s => s.eventId !== eventId);
  ev.pushed = false;
  window.saveData(state);
  renderPlanner();
  window.safeRender(renderBudget);
}

export function deletePlannerEvent(id) {
  if (!confirm('Delete this event and remove it from the budget?')) return;
  unpushEventFromBudget(id);
  state.planner.events = state.planner.events.filter(e => e.id !== id);
  _plannerExpanded.delete(id);
  window.saveData(state);
  window.closeModal();
  renderPlanner();
}

export async function estimatePlannerEvent(eventId) {
  const key = prefsGet('toto_ai_key');
  if (!key) {
    alert('Add your AI API key in Settings to use cost estimation.');
    return;
  }
  const ev = (state.planner?.events || []).find(e => e.id === eventId);
  if (!ev) return;

  const btn = document.getElementById(`ai-btn-${eventId}`);
  if (btn) { btn.disabled = true; btn.textContent = '✦ Estimating…'; }

  const adults = (state.householdProfile?.members || []).filter(m => m.role === 'adult').length || 2;
  const kids   = (state.householdProfile?.members || []).filter(m => m.role === 'child').length || 0;
  const eventDate = new Date(ev.date + 'T12:00:00').toLocaleDateString('en-AU', { day:'numeric', month:'long', year:'numeric' });

  const prompt = `You are a family finance assistant for an Australian family. Suggest realistic cost estimates for the following life event.

Event: ${ev.title}
Category: ${(PLANNER_CATS[ev.category]||PLANNER_CATS.other).label}
Date: ${eventDate}
Notes: ${ev.notes || 'none provided'}
Family size: ${adults} adult(s), ${kids} child(ren)

Return ONLY a JSON array — no explanation, no markdown fences:
[{"name":"Item description","amount":150,"category":"Category"}]

Rules:
- Use realistic 2025 Australian dollar amounts
- Round to nearest $5 or $10
- Maximum 6 items
- Consider family size when relevant
- Use ONLY these categories: Transport, Accommodation, Food & Dining, Entertainment, Gifts, Clothing, Health, Education, Shopping, Other`;

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
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    const text = data.content?.[0]?.text || '';
    const match = text.match(/\[[\s\S]*?\]/);
    if (!match) throw new Error('No JSON array in response');
    const items = JSON.parse(match[0]);
    ev.estimates = items.map((item, i) => ({
      id: `est-${Date.now()}-${i}`,
      name: item.name,
      amount: Number(item.amount) || 0,
      category: item.category || 'Other',
      accepted: true
    }));
    _plannerExpanded.add(eventId);
    window.saveData(state);
    renderPlanner();
  } catch (err) {
    console.error('Planner estimate error:', err);
    if (btn) { btn.disabled = false; btn.innerHTML = '✦ Try again'; }
    alert('Could not estimate costs. Check your AI API key in Settings.');
  }
}

// ── Planner modal member picker state ──
export let _pmSelectedMembers = new Set();
export let _pmDpTarget = 'start';
let _pmDpMonth  = new Date().toISOString().slice(0,7);

export function openPlannerModal(id, presetDate) {
  const ev = id ? (state.planner?.events||[]).find(e => e.id === id) : null;
  const defaultDate = presetDate || _plannerSelectedDay || new Date().toISOString().slice(0,10);

  _pmSelectedMembers = new Set();
  _pmDpTarget = 'start';
  _pmDpMonth  = (ev?.date || defaultDate).slice(0,7);

  // Pre-select members
  if (ev) {
    _plannerEvMemberIds(ev).forEach(id => _pmSelectedMembers.add(id));
  } else if (_plannerFilterMembers.size > 0) {
    _plannerFilterMembers.forEach(id => _pmSelectedMembers.add(id));
  }

  document.getElementById('modal-title').textContent = ev ? 'Edit Event' : 'Add Event';
  document.getElementById('modal-body').innerHTML = `
    <!-- Who -->
    <div class="form-group">
      <label class="form-label">Who</label>
      <div id="pm-member-picker" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px"></div>
    </div>
    <!-- Title -->
    <div class="form-group">
      <label class="form-label">Title *</label>
      <input class="form-input" id="pe-title" placeholder="e.g. Mia's swimming lesson" value="${ev?escAttr(ev.title):''}">
    </div>
    <!-- All day -->
    <div class="form-group">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" id="pe-allday" onchange="_pmToggleAllDay()" style="width:16px;height:16px;accent-color:var(--primary);cursor:pointer" ${ev?.allDay?'checked':''}>
        <span style="font-size:14px;font-weight:500;color:var(--text)">All day event</span>
      </label>
    </div>
    <!-- Start date + time -->
    <div style="display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,0.85fr);gap:8px" class="form-group">
      <div>
        <label class="form-label">Start date *</label>
        <input type="hidden" id="pe-date" value="${ev?ev.date:defaultDate}">
        <button type="button" class="form-input" id="pm-start-trigger" onclick="_pmDpOpen('start')" style="text-align:left;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
          <span id="pm-start-display">${_pmFmtDateShort(ev?ev.date:defaultDate)}</span>
        </button>
      </div>
      <div id="pm-start-time-col" style="min-width:0;overflow:hidden">
        <label class="form-label">Start time</label>
        <input class="form-input" id="pe-time" type="time" value="${ev?.time||''}" style="width:100%;max-width:100%;min-width:0;box-sizing:border-box;padding:11px 6px;font-size:13px;-webkit-appearance:none;appearance:none">
      </div>
    </div>
    <!-- End date + time -->
    <div style="display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,0.85fr);gap:8px" class="form-group" id="pm-end-group">
      <div>
        <label class="form-label">End date</label>
        <input type="hidden" id="pe-end-date" value="${ev?.endDate||''}">
        <button type="button" class="form-input" id="pm-end-trigger" onclick="_pmDpOpen('end')" style="text-align:left;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${ev?.endDate?'var(--text)':'var(--text-muted)'}">
          <span id="pm-end-display">${ev?.endDate?_pmFmtDateShort(ev.endDate):'Same day'}</span>
        </button>
      </div>
      <div id="pm-end-time-col" style="min-width:0;overflow:hidden">
        <label class="form-label">End time</label>
        <input class="form-input" id="pe-end-time" type="time" value="${ev?.endTime||''}" style="width:100%;max-width:100%;min-width:0;box-sizing:border-box;padding:11px 6px;font-size:13px;-webkit-appearance:none;appearance:none">
      </div>
    </div>
    <!-- Category -->
    <div class="form-group">
      <label class="form-label">Category</label>
      <select class="form-input" id="pe-cat" style="max-width:240px">
        ${Object.entries(PLANNER_CATS).map(([k,v])=>`<option value="${k}" ${(ev?.category||'other')===k?'selected':''}>${v.emoji} ${v.label}</option>`).join('')}
      </select>
    </div>
    <!-- Recurrence (shared engine) -->
    ${_routineRecurrenceFormHtml(ev?.recurrence || { type: 'one_time', startDate: (ev?.date || defaultDate) })}
    <!-- Address -->
    <div class="form-group">
      <label class="form-label">Address <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="pe-location" placeholder="e.g. 123 Main St, Sydney" value="${ev?escAttr(ev.location||''):''}">
    </div>
    <!-- Notes -->
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(helps AI estimate costs)</span></label>
      <textarea class="form-input" id="pe-notes" rows="2" placeholder="e.g. Flying from Sydney, 5 nights, gift budget ~$100">${ev?escHtml(ev.notes||''):''}</textarea>
    </div>`;

  document.getElementById('modal-footer').innerHTML = `
    ${ev ? `<button class="btn btn-danger" onclick="deletePlannerEvent('${ev.id}')">Delete</button>` : '<span></span>'}
    <div style="display:flex;gap:8px">
      <button class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="pm-save-btn" onclick="savePlannerEvent(${ev?`'${ev.id}'`:'null'})">Save</button>
    </div>`;
  document.getElementById('modal-footer').style.justifyContent = 'space-between';
  document.getElementById('modal-overlay').classList.remove('hidden');

  _pmRenderMemberPicker();
  _pmToggleAllDay();
  _pmHandleCatChange();
  setTimeout(() => { _routineRecurrenceSummaryUpdate(); }, 100);
}

export function _pmFmtDate(d) {
  if (!d) return '';
  return new Date(d + 'T12:00:00').toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'});
}
export function _pmFmtDateShort(d) {
  if (!d) return '';
  return new Date(d + 'T12:00:00').toLocaleDateString('en-AU',{day:'numeric',month:'short'});
}

export function _pmRenderMemberPicker() {
  const members = _plannerMembers();
  const EVERYONE = { id:'everyone', name:'Everyone', emoji:'👨‍👩‍👧', dot:'#94a3b8', bg:'#f1f5f9', text:'#475569' };
  const picker = document.getElementById('pm-member-picker');
  if (!picker) return;
  const allPeople = [EVERYONE, ...members];
  picker.innerHTML = allPeople.map(m => {
    const isEv = m.id === 'everyone';
    const isSelected = isEv ? _pmSelectedMembers.size === 0 : _pmSelectedMembers.has(m.id);
    return `<button type="button" style="display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:99px;font-size:12px;font-weight:600;border:2px solid ${isSelected?m.dot:'transparent'};background:${m.bg};color:${m.text};cursor:pointer;transition:all .15s" onclick="_pmToggleMember('${m.id}')">
      ${m.emoji} ${m.name}
    </button>`;
  }).join('');
  // Save button colour
  const firstId = [..._pmSelectedMembers][0];
  const firstMember = firstId ? members.find(m => m.id === firstId) : null;
  const saveBtn = document.getElementById('pm-save-btn');
  if (saveBtn) saveBtn.style.background = firstMember ? firstMember.dot : '';
}

export function _pmToggleMember(id) {
  if (id === 'everyone') { _pmSelectedMembers.clear(); }
  else if (_pmSelectedMembers.has(id)) { _pmSelectedMembers.delete(id); }
  else { _pmSelectedMembers.add(id); }
  _pmRenderMemberPicker();
}

export function _pmToggleAllDay() {
  const isAllDay = document.getElementById('pe-allday')?.checked;
  const startCol = document.getElementById('pm-start-time-col');
  const endCol   = document.getElementById('pm-end-time-col');
  if (startCol) startCol.style.display = isAllDay ? 'none' : '';
  if (endCol)   endCol.style.display   = isAllDay ? 'none' : '';
}

export function _pmHandleCatChange() {
  // No-op — recurrence is now handled by the shared recurrence form
}

// Date picker for planner modal (portal approach)
export function _pmDpOpen(target) {
  _pmDpTarget = target;
  const triggerId = target === 'end' ? 'pm-end-trigger' : 'pm-start-trigger';
  const trigger = document.getElementById(triggerId);
  if (!trigger) return;

  let popover = document.getElementById('pm-dp-popover');
  if (!popover) {
    popover = document.createElement('div');
    popover.id = 'pm-dp-popover';
    popover.style.cssText = 'display:none;position:fixed;width:260px;background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.16);padding:14px;z-index:9999';
    document.body.appendChild(popover);
    document.addEventListener('click', _pmDpOutsideClick);
  }

  _pmDpMonth = (document.getElementById('pe-date')?.value || new Date().toISOString().slice(0,10)).slice(0,7);
  _pmDpRender(popover);

  const r = trigger.getBoundingClientRect();
  popover.style.top  = (r.bottom + 6) + 'px';
  popover.style.left = Math.max(8, Math.min(r.left, window.innerWidth - 272)) + 'px';
  popover.style.display = 'block';
}

export function _pmDpOutsideClick(e) {
  const pop = document.getElementById('pm-dp-popover');
  const startT = document.getElementById('pm-start-trigger');
  const endT   = document.getElementById('pm-end-trigger');
  if (pop && !pop.contains(e.target) && e.target !== startT && e.target !== endT && !startT?.contains(e.target) && !endT?.contains(e.target)) {
    if (pop) pop.style.display = 'none';
  }
}

export function _pmDpRender(pop) {
  if (!pop) pop = document.getElementById('pm-dp-popover');
  if (!pop) return;
  const [y, m] = _pmDpMonth.split('-').map(Number);
  const today = new Date().toISOString().slice(0,10);
  const selected = _pmDpTarget === 'end'
    ? document.getElementById('pe-end-date')?.value || ''
    : document.getElementById('pe-date')?.value || '';
  const firstDow = new Date(y, m-1, 1).getDay();
  const startOff = firstDow === 0 ? 6 : firstDow - 1;
  const daysInM  = new Date(y, m, 0).getDate();
  const daysInPrev = new Date(y, m-1, 0).getDate();
  const _monthLabelStr = new Date(y, m-1, 15).toLocaleDateString('en-AU',{month:'long',year:'numeric'});
  let cells = [];
  for (let i = startOff-1; i >= 0; i--) cells.push({day:daysInPrev-i,muted:true,dateStr:null});
  for (let d=1;d<=daysInM;d++) { const ds=`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`; cells.push({day:d,muted:false,dateStr:ds}); }
  const tail = cells.length%7===0?0:7-cells.length%7;
  for (let d=1;d<=tail;d++) cells.push({day:d,muted:true,dateStr:null});
  const grid = cells.map(c => {
    const isSel = c.dateStr && c.dateStr === selected;
    const isTod = c.dateStr === today;
    const style = isSel ? 'background:#2563eb;color:#fff;border-radius:50%' : isTod ? 'color:#2563eb;font-weight:700' : c.muted ? 'color:#d1d5db' : '';
    return `<button type="button" onclick="_pmDpSelect('${c.dateStr}')" ${!c.dateStr?'disabled':''} style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:12px;border:none;background:none;cursor:${c.dateStr?'pointer':'default'};font-family:inherit;${style}">${c.day}</button>`;
  }).join('');
  pop.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <button type="button" onclick="_pmDpPrev()" style="width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;cursor:pointer;font-size:16px;color:#64748b">‹</button>
      <div style="font-size:14px;font-weight:700;color:#1e293b">${_monthLabelStr}</div>
      <button type="button" onclick="_pmDpNext()" style="width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;cursor:pointer;font-size:16px;color:#64748b">›</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;margin-bottom:4px">
      ${['M','T','W','T','F','S','S'].map(d=>`<div style="text-align:center;font-size:10px;font-weight:700;color:#94a3b8;padding:3px 0">${d}</div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px">${grid}</div>
    <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px solid #e2e8f0">
      <button type="button" onclick="_pmDpClear()" style="font-size:13px;font-weight:600;color:#2563eb;background:none;border:none;cursor:pointer">Clear</button>
      <button type="button" onclick="_pmDpToday()" style="font-size:13px;font-weight:600;color:#2563eb;background:none;border:none;cursor:pointer">Today</button>
    </div>`;
}

export function _pmDpSelect(dateStr) {
  if (!dateStr) return;
  const inputId   = _pmDpTarget === 'end' ? 'pe-end-date'    : 'pe-date';
  const displayId = _pmDpTarget === 'end' ? 'pm-end-display' : 'pm-start-display';
  const input = document.getElementById(inputId);
  const disp  = document.getElementById(displayId);
  if (input) input.value = dateStr;
  if (disp)  { disp.textContent = _pmFmtDateShort(dateStr); disp.style.color = '#1e293b'; }
  _pmDpMonth = dateStr.slice(0,7);
  document.getElementById('pm-dp-popover').style.display = 'none';
}
export function _pmDpClear() {
  _pmDpSelect('');
  const displayId = _pmDpTarget === 'end' ? 'pm-end-display' : 'pm-start-display';
  const disp = document.getElementById(displayId);
  if (disp) { disp.textContent = _pmDpTarget === 'end' ? 'Same day' : ''; disp.style.color = '#94a3b8'; }
}
export function _pmDpToday() { _pmDpSelect(new Date().toISOString().slice(0,10)); }
export function _pmDpPrev() {
  const [y,m] = _pmDpMonth.split('-').map(Number);
  const yr2 = m===1?y-1:y, mo2 = m===1?12:m-1;
  _pmDpMonth = `${yr2}-${String(mo2).padStart(2,'0')}`;
  _pmDpRender();
}
export function _pmDpNext() {
  const [y,m] = _pmDpMonth.split('-').map(Number);
  const yr2 = m===12?y+1:y, mo2 = m===12?1:m+1;
  _pmDpMonth = `${yr2}-${String(mo2).padStart(2,'0')}`;
  _pmDpRender();
}

export function savePlannerEvent(id) {
  const title     = document.getElementById('pe-title').value.trim();
  const cat       = document.getElementById('pe-cat').value;
  const date      = document.getElementById('pe-date').value;
  const endDate   = document.getElementById('pe-end-date')?.value || '';
  const allDay    = document.getElementById('pe-allday')?.checked || false;
  const time      = allDay ? '' : (document.getElementById('pe-time')?.value || '');
  const endTime   = allDay ? '' : (document.getElementById('pe-end-time')?.value || '');
  const notes      = document.getElementById('pe-notes').value.trim();
  const location   = document.getElementById('pe-location')?.value.trim() || '';
  const recurrence = _routineRecurrenceCollect();
  // Keep legacy recurring field so _autoCreateRecurringEvents still works for old copies
  const recurringLegacy = recurrence.type === 'one_time' ? 'none' : 'none';
  const memberIds  = _pmSelectedMembers.size > 0 ? [..._pmSelectedMembers] : ['everyone'];
  if (!title || !date) { alert('Title and date are required.'); return; }
  if (!state.planner) state.planner = { events: [] };
  if (id) {
    const ev = state.planner.events.find(e => e.id === id);
    if (ev) { ev.title=title; ev.category=cat; ev.date=date; ev.endDate=endDate||date; ev.allDay=allDay; ev.time=time; ev.endTime=endTime; ev.notes=notes; ev.location=location; ev.recurrence=recurrence; ev.recurring=recurringLegacy; ev.memberIds=memberIds; }
  } else {
    const newId = 'ev-' + Date.now();
    state.planner.events.push({ id:newId, title, category:cat, date, endDate:endDate||date, allDay, time, endTime, notes, location, recurrence, recurring:recurringLegacy, memberIds, estimates:[], pushed:false });
    _plannerExpanded.add(newId);
    _plannerSelectedDay = date;
    _plannerMonth = date.slice(0,7);
  }
  window.saveData(state);
  window.closeModal();
  renderPlanner();
}

// ─────────────────────────────────────────────────
// FORECAST + SEASONAL NUDGES + RECURRING EVENTS
// ─────────────────────────────────────────────────

// ── Feature 1: Budget forecast widget ────────────
export function renderBudgetForecast(monthStr, regularSurplus) {
  const plannerEvs = (state.planner?.events || [])
    .filter(e => e.date?.slice(0,7) === monthStr && (e.estimates||[]).some(x => x.accepted));
  if (plannerEvs.length === 0) return '';

  const totalEvCost = plannerEvs.reduce((s, ev) =>
    s + (ev.estimates||[]).filter(e=>e.accepted).reduce((t,e)=>t+(e.amount||0),0), 0);
  const forecastSurplus = regularSurplus - totalEvCost;
  const unpushed = plannerEvs.filter(e => !e.pushed);

  const rows = plannerEvs.map(ev => {
    const cat  = PLANNER_CATS[ev.category] || PLANNER_CATS.other;
    const cost = (ev.estimates||[]).filter(e=>e.accepted).reduce((s,e)=>s+(e.amount||0),0);
    const dl   = new Date(ev.date+'T12:00:00').toLocaleDateString('en-AU',{day:'numeric',month:'short'});
    return `<div class="forecast-row">
      <span class="forecast-ev-name">${cat.emoji} ${escHtml(ev.title)}</span>
      <span class="forecast-ev-date">${dl}</span>
      <span class="forecast-ev-cost">${aud(cost)}</span>
      ${ev.pushed
        ? `<span class="forecast-pushed">✓ In budget</span>`
        : ev.pushed === 'suggested'
          ? `<span class="forecast-pushed" style="color:#f59e0b">⏳ Pending</span>`
          : `<button class="forecast-unpushed" onclick="suggestEventToBudget('${ev.id}')">+ Suggest</button>`}
    </div>`;
  }).join('');

  return `<div class="forecast-widget">
    <div class="forecast-header">
      <span class="forecast-header-title">📅 Planned Events — ${aud(totalEvCost)} this month</span>
      ${unpushed.length > 1 ? `<button class="forecast-push-all" onclick="_pushAllEventsToBudget('${monthStr}')">Suggest all to budget</button>` : ''}
    </div>
    ${rows}
    <div class="forecast-total">
      <span class="forecast-total-label">Forecast surplus after events</span>
      <span style="font-weight:800;font-size:15px;color:${forecastSurplus>=0?'#10b981':'#ef4444'}">${aud(Math.abs(forecastSurplus))} ${forecastSurplus>=0?'surplus':'deficit'}</span>
    </div>
  </div>`;
}

export function _pushAllEventsToBudget(monthStr) {
  const unpushed = (state.planner?.events || [])
    .filter(e => e.date?.slice(0,7) === monthStr && !e.pushed && (e.estimates||[]).some(x=>x.accepted));
  unpushed.forEach(ev => suggestEventToBudget(ev.id));
  renderBudget();
}

// ── Feature 2: Seasonal nudges ────────────────────
export function _getNthDayOfMonth(year, month, dow, nth) {
  // month: 0-based, dow: 0=Sun, nth: 1-based
  let count = 0;
  for (let d = 1; d <= 31; d++) {
    const dt = new Date(year, month, d);
    if (dt.getMonth() !== month) break;
    if (dt.getDay() === dow) { count++; if (count === nth) return dt; }
  }
}

export function getSeasonalNudges() {
  const today = new Date(); today.setHours(0,0,0,0);
  const y = today.getFullYear();
  const daysUntil = d => Math.ceil((d - today) / 86400000);

  const candidates = [
    // Fixed dates
    { d: new Date(y, 3, 25), emoji:'🌿', title:"Anzac Day",      body:"Public holiday — any plans or travel?" },
    { d: new Date(y, 5, 30), emoji:'🧾', title:"EOFY",           body:"Tax time — accountant fees, donations, prepayments" },
    { d: new Date(y, 11,25), emoji:'🎄', title:"Christmas",      body:"Gifts, travel, food — start budgeting early" },
    { d: new Date(y, 11,26), emoji:'🛍️', title:"Boxing Day",     body:"Sales, travel, family catch-ups" },
    { d: new Date(y+1,0, 1), emoji:'🎆', title:"New Year's",     body:"Celebrations, travel plans" },
    // Computed
    { d: _getNthDayOfMonth(y, 4, 0, 2), emoji:'💐', title:"Mother's Day",  body:"Gift, brunch or dinner for Mum" },
    { d: _getNthDayOfMonth(y, 8, 0, 1), emoji:'👔', title:"Father's Day",  body:"Gift or outing for Dad" },
    { d: _getNthDayOfMonth(y,10, 2, 1), emoji:'🏆', title:"Melbourne Cup", body:"Event day — sweepstakes, lunch, outfits" },
    // School holidays (approximate NSW/VIC — Term breaks)
    { d: new Date(y, 3, 6),  emoji:'🎒', title:"Term 1 Holidays", body:"2 weeks — activities, childcare, day trips" },
    { d: new Date(y, 6, 5),  emoji:'🎒', title:"Term 2 Holidays", body:"2 weeks — winter school holidays" },
    { d: new Date(y, 8,19),  emoji:'🎒', title:"Term 3 Holidays", body:"2 weeks — spring school holidays" },
    { d: new Date(y,11,18),  emoji:'🎒', title:"Summer Holidays", body:"6 weeks — the big one, plan early" },
  ].filter(c => c.d); // remove any undefined (e.g. if _getNthDayOfMonth returns undefined)

  return candidates
    .map(c => ({ ...c, days: daysUntil(c.d) }))
    .filter(c => c.days >= -3 && c.days <= 45)  // -3 allows "just started"
    .sort((a,b) => a.days - b.days)
    .slice(0, 4);
}

export function _renderNudgeSection() {
  const nudges = getSeasonalNudges();
  if (nudges.length === 0) return '';
  const cards = nudges.map(n => {
    const daysLabel = n.days < 0 ? 'Now!' : n.days === 0 ? 'Today!' : n.days === 1 ? 'Tomorrow' : `In ${n.days} days`;
    return `<div class="nudge-card" onclick="openTotoAssistant();_totoSend('Help me plan for ${escAttr(n.title)}')">
      <div class="nudge-card-icon">${n.emoji}</div>
      <div class="nudge-card-title">${escHtml(n.title)}</div>
      <div class="nudge-card-days">${daysLabel}</div>
      <div class="nudge-card-body">${escHtml(n.body)}</div>
    </div>`;
  }).join('');
  return `<div class="nudge-section">
    <div class="diary-section-title">Heads up from Toto 🐕</div>
    <div class="nudge-row">${cards}</div>
  </div>`;
}

// ── Feature 3: Recurring events ───────────────────
export function _addRecurrenceToDate(date, recurrence) {
  const d = new Date(date);
  switch (recurrence) {
    case 'weekly':      d.setDate(d.getDate() + 7);    break;
    case 'fortnightly': d.setDate(d.getDate() + 14);   break;
    case 'monthly':     d.setMonth(d.getMonth() + 1);  break;
    case 'quarterly':   d.setMonth(d.getMonth() + 3);  break;
    case 'yearly':      d.setFullYear(d.getFullYear() + 1); break;
  }
  return d;
}

export function _autoCreateRecurringEvents() {
  if (!state.planner?.events) return;
  const events = state.planner.events;
  const today  = new Date(); today.setHours(0,0,0,0);
  let changed  = false;

  // Window: how far ahead to pre-create occurrences per frequency
  const windowMonths = { weekly:3, fortnightly:3, monthly:6, quarterly:12, yearly:24 };

  // Only source events (not auto-generated copies)
  const sources = events.filter(e => e.recurring && e.recurring !== 'none' && !e._recurringSourceId);

  sources.forEach(source => {
    const freq = source.recurring;
    const winEnd = new Date(today);
    winEnd.setMonth(winEnd.getMonth() + (windowMonths[freq] || 12));

    // Advance from source date to first occurrence >= today
    let cur = new Date(source.date + 'T12:00:00');
    while (cur < today) cur = _addRecurrenceToDate(cur, freq);

    // Walk forward generating expected dates
    let safety = 0;
    while (cur <= winEnd && safety++ < 200) {
      const dateStr = cur.toISOString().slice(0, 10);
      // Check if this occurrence already exists (source itself or a copy)
      const exists = events.some(e =>
        e.date === dateStr &&
        (e.id === source.id || e._recurringSourceId === source.id)
      );
      if (!exists) {
        events.push({
          id: 'ev-' + Date.now() + '-r' + Math.random().toString(36).slice(2, 6),
          title: source.title,
          category: source.category,
          date: dateStr,
          notes: source.notes || '',
          recurring: freq,
          _recurringSourceId: source.id,
          estimates: (source.estimates || []).map(e => ({ ...e, id: 'est-' + Date.now() + Math.random(), accepted: true })),
          pushed: false,
        });
        changed = true;
      }
      cur = _addRecurrenceToDate(cur, freq);
    }
  });

  if (changed) window.saveData(state);
}

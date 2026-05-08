// Kids zone — profiles, chores, prizes, approvals, events
import { state } from '../store.js';
import { escHtml, escAttr, nextId, fmtDate } from './format.js';

// ─────────────────────────────────────────────────
// KIDS ZONE
// ─────────────────────────────────────────────────

export let kidsView = 'parent';
export let kidsParentTab = 'overview';
Object.defineProperty(window, 'kidsView',       { get() { return kidsView; },       set(v) { kidsView = v; },       configurable: true });
Object.defineProperty(window, 'kidsParentTab',  { get() { return kidsParentTab; },  set(v) { kidsParentTab = v; },  configurable: true });
export function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

export function renderKids() {
  const el = document.getElementById('kids-content');
  if (!el) return;
  const k = state.kids;
  if (kidsView === 'parent') {
    const pendingCount = k.completions.filter(c => c.status === 'pending').length +
                         k.redemptions.filter(r => r.status === 'pending').length;
    renderKidsParent(el, k, pendingCount);
  } else {
    const kid = k.profiles.find(p => p.id === kidsView);
    if (kid) renderKidView(el, k, kid);
    else { kidsView = 'parent'; renderKids(); }
  }
}

export function kidBalance(k, kidId) {
  const earned = k.completions.filter(c => c.kidId === kidId && c.status === 'approved')
    .reduce((s, c) => s + (k.chores.find(ch => ch.id === c.choreId)?.points || 0), 0);
  const spent = k.redemptions.filter(r => r.kidId === kidId && r.status === 'approved')
    .reduce((s, r) => s + (k.prizes.find(p => p.id === r.prizeId)?.pointCost || 0), 0);
  return earned - spent;
}

export function renderKidsParent(el, k, pendingCount) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'chores',   label: 'Chores' },
    { id: 'prizes',   label: 'Prize Shelf' },
    { id: 'approvals',label: `Approvals${pendingCount ? ` <span style="background:#ef4444;color:#fff;border-radius:99px;padding:1px 7px;font-size:11px;vertical-align:middle;margin-left:4px">${pendingCount}</span>` : ''}` },
    { id: 'events',   label: '📅 Events' },
  ];

  let html = `
    <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
      <button class="btn btn-primary" style="padding:8px 14px;font-size:13px" onclick="openAddKidModal()">+ Add Kid</button>
    </div>
    <div style="display:flex;gap:4px;margin-bottom:24px;border-bottom:1px solid var(--border)">
      ${tabs.map(t => `<button onclick="kidsParentTab='${t.id}';renderKids()" style="padding:8px 16px;border:none;background:none;cursor:pointer;font-size:13px;font-weight:500;color:${kidsParentTab===t.id?'#0891b2':'#64748b'};border-bottom:2px solid ${kidsParentTab===t.id?'#0891b2':'transparent'};margin-bottom:-1px;transition:all 0.15s">${t.label}</button>`).join('')}
    </div>`;

  if (kidsParentTab === 'overview')   html += renderKidsOverview(k);
  else if (kidsParentTab === 'chores')  html += renderChoreMgmt(k);
  else if (kidsParentTab === 'prizes')  html += renderPrizeMgmt(k);
  else if (kidsParentTab === 'approvals') html += renderApprovals(k);
  else if (kidsParentTab === 'events')    html += _renderChildEventsMgmt();
  el.innerHTML = html;
}

export function renderKidsOverview(k) {
  if (!k.profiles.length) return `
    <div style="text-align:center;padding:60px 20px">
      <div style="font-size:52px;margin-bottom:12px">👨‍👩‍👧‍👦</div>
      <p style="font-size:16px;font-weight:600;color:#1e293b;margin-bottom:8px">No kids added yet</p>
      <p style="color:#64748b;margin-bottom:20px">Add your kids to start assigning chores and prizes</p>
      <button class="btn btn-primary" onclick="openAddKidModal()">+ Add Kid</button>
    </div>`;

  let html = `<div class="kids-grid">`;
  k.profiles.forEach(kid => {
    const bal = kidBalance(k, kid.id);
    const myChores = k.chores.filter(c => c.assignedTo === kid.id || c.assignedTo === 'all').length;
    const pending = k.completions.filter(c => c.kidId === kid.id && c.status === 'pending').length;
    html += `
      <div class="kid-card" style="cursor:default">
        <button onclick="openEditKidModal('${kid.id}')" style="position:absolute;top:10px;right:10px;background:none;border:none;cursor:pointer;color:#cbd5e1;font-size:14px;padding:2px 5px;border-radius:var(--r-sm)" title="Edit">✏️</button>
        <div onclick="kidsView='${kid.id}';renderKids()" style="cursor:pointer">
          <div class="kid-avatar">${kid.emoji}</div>
          <div class="kid-name">${escHtml(kid.name)}</div>
          <div class="kid-points">${bal}</div>
          <div class="kid-points-label">⭐ points</div>
          <div style="display:flex;gap:10px;font-size:12px;color:var(--text-muted);margin-top:4px">
            <span>📋 ${myChores}</span>
            ${pending ? `<span style="color:var(--watch);font-weight:600">⏳ ${pending}</span>` : ''}
            ${kid.savings ? `<span style="color:#0891b2">💰 $${kid.savings.toFixed(0)}</span>` : ''}
          </div>
        </div>
        <button onclick="window.switchToKidMode('${kid.id}')" style="width:100%;margin-top:10px;padding:8px;background:#ecfeff;border:1.5px solid #0891b2;border-radius:var(--r-sm);font-size:12px;color:#0891b2;font-weight:600;cursor:pointer">
          Switch to ${escHtml(kid.name)}'s view →
        </button>
        <button onclick="viewChildToday('${kid.id}')" style="width:100%;margin-top:6px;padding:7px;background:#f5f3ff;border:1px solid #ddd6fe;border-radius:var(--r-sm);font-size:12px;color:#5B4CF5;font-weight:600;cursor:pointer">
          👁 View ${escHtml(kid.name)}'s Today
        </button>
        <button onclick="_cvViewCalendar('${kid.id}')" style="width:100%;margin-top:6px;padding:7px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--r-sm);font-size:12px;color:#15803d;font-weight:600;cursor:pointer">
          📅 View ${escHtml(kid.name)}'s Calendar
        </button>
        <button onclick="window.openPinSetup('${kid.id}')" style="width:100%;margin-top:6px;padding:7px;background:${kid.pinHash?'var(--good-light)':'var(--watch-light)'};border:1px solid ${kid.pinHash?'var(--good-soft)':'var(--watch-soft)'};border-radius:var(--r-sm);font-size:12px;color:${kid.pinHash?'var(--good)':'var(--watch)'};font-weight:600;cursor:pointer">
          ${kid.pinHash ? '🔒 PIN set — change' : '🔓 Set PIN for login'}
        </button>
      </div>`;
  });
  html += `</div>`;
  return html;
}

export function renderChoreMgmt(k) {
  let html = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <span style="font-size:15px;font-weight:600">All Chores</span>
    <button class="btn btn-primary btn-sm" onclick="openChoreModal()">+ Add Chore</button>
  </div>`;
  if (!k.chores.length) {
    const firstKid = k.profiles[0];
    const kidName = firstKid?.name || 'your child';
    const kidEmoji = firstKid?.emoji || '👦';
    const suggestions = [
      { emoji:'🛏️', label:'Make bed' },
      { emoji:'🍽️', label:'Clear table' },
      { emoji:'🐕', label:'Feed pet' },
    ];
    const chips = suggestions.map(s =>
      `<button onclick="openChoreModal()" style="padding:7px 14px;background:#fef9c3;border:1.5px solid #eab308;border-radius:99px;font-size:12px;font-weight:600;color:#854d0e;cursor:pointer">${s.emoji} ${s.label}</button>`
    ).join('');
    return html + `
      <div style="background:#fff;border:2px dashed #cbd5e1;border-radius:16px;padding:36px 24px;text-align:center;margin-top:8px">
        <div style="font-size:44px;margin-bottom:10px">${kidEmoji}</div>
        <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:6px">${escHtml(kidName)} has no chores yet</div>
        <div style="font-size:13px;color:#64748b;margin-bottom:18px">Add chores to help ${escHtml(kidName)} earn coins and unlock prizes.</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px">
          ${chips}
          <button onclick="openChoreModal()" style="padding:7px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:99px;font-size:12px;color:#64748b;cursor:pointer">+ Custom</button>
        </div>
        <button onclick="openChoreModal()" style="background:#eab308;color:#fff;border:none;border-radius:10px;padding:12px 28px;font-size:14px;font-weight:600;cursor:pointer">Add first chore →</button>
      </div>`;
  }
  k.chores.forEach(ch => {
    const who = ch.assignedTo === 'all' ? 'All kids' : (k.profiles.find(p => p.id === ch.assignedTo)?.name || '?');
    html += `<div class="chore-item">
      <div class="chore-emoji">${ch.emoji}</div>
      <div style="flex:1"><div class="chore-name">${escHtml(ch.name)}</div><div class="chore-meta">${escHtml(who)} · ${ch.frequency}</div></div>
      <div class="chore-pts">⭐ ${ch.points}</div>
      <button onclick="openChoreModal('${ch.id}')" class="btn btn-ghost btn-sm">✏️</button>
      <button onclick="deleteChore('${ch.id}')" class="btn btn-ghost btn-sm" style="color:#ef4444">🗑</button>
    </div>`;
  });
  return html;
}

export function renderPrizeMgmt(k) {
  let html = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <span style="font-size:15px;font-weight:600">Prize Shelf</span>
    <button class="btn btn-primary btn-sm" onclick="openPrizeModal()">+ Add Prize</button>
  </div>`;
  if (!k.prizes.length) return html + `<div class="empty"><div class="empty-icon">🎁</div><p>No prizes yet — add something for the kids to work towards</p></div>`;
  k.prizes.forEach(pr => {
    html += `<div class="prize-card">
      <div class="prize-icon">${pr.emoji}</div>
      <div style="flex:1"><div class="prize-name">${escHtml(pr.name)}</div><div class="prize-desc">${escHtml(pr.description || pr.type)}</div></div>
      <div class="prize-cost">⭐ ${pr.pointCost}</div>
      <button onclick="openPrizeModal('${pr.id}')" class="btn btn-ghost btn-sm">✏️</button>
      <button onclick="deletePrize('${pr.id}')" class="btn btn-ghost btn-sm" style="color:#ef4444">🗑</button>
    </div>`;
  });
  return html;
}

export function renderApprovals(k) {
  const pc = k.completions.filter(c => c.status === 'pending');
  const pr = k.redemptions.filter(r => r.status === 'pending');
  if (!pc.length && !pr.length) return `<div style="text-align:center;padding:48px 20px"><div style="font-size:40px;margin-bottom:12px">✅</div><p style="font-weight:600;color:#1e293b">All caught up!</p><p style="color:#64748b;font-size:13px">No pending approvals</p></div>`;
  let html = '';
  if (pc.length) {
    html += `<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;margin-bottom:10px">Completed Chores</div>`;
    pc.forEach(comp => {
      const kid = k.profiles.find(p => p.id === comp.kidId);
      const ch  = k.chores.find(c => c.id === comp.choreId);
      if (!kid || !ch) return;
      html += `<div class="chore-item pending-approval" style="margin-bottom:10px">
        <div class="chore-emoji">${ch.emoji}</div>
        <div style="flex:1"><div class="chore-name">${escHtml(ch.name)}</div><div class="chore-meta">${kid.emoji} ${escHtml(kid.name)} · ${new Date(comp.completedAt).toLocaleDateString()}</div></div>
        <div class="chore-pts">⭐ ${ch.points}</div>
        <button class="approve-btn" onclick="approveCompletion('${comp.id}')">Approve</button>
        <button class="reject-btn" onclick="rejectCompletion('${comp.id}')">Reject</button>
      </div>`;
    });
  }
  if (pr.length) {
    html += `<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;margin:20px 0 10px">Prize Redemptions</div>`;
    pr.forEach(red => {
      const kid   = k.profiles.find(p => p.id === red.kidId);
      const prize = k.prizes.find(p => p.id === red.prizeId);
      if (!kid || !prize) return;
      html += `<div class="prize-card pending-redemption" style="margin-bottom:10px">
        <div class="prize-icon">${prize.emoji}</div>
        <div style="flex:1"><div class="prize-name">${escHtml(prize.name)}</div><div class="prize-desc">${kid.emoji} ${escHtml(kid.name)} wants this</div></div>
        <div class="prize-cost">⭐ ${prize.pointCost}</div>
        <button class="approve-btn" onclick="approveRedemption('${red.id}')">Approve</button>
        <button class="reject-btn" onclick="rejectRedemption('${red.id}')">Reject</button>
      </div>`;
    });
  }
  return html;
}

export function renderKidView(el, k, kid) {
  const bal = kidBalance(k, kid.id);
  const myChores = k.chores.filter(c => c.assignedTo === kid.id || c.assignedTo === 'all');
  const pendingChoreIds = new Set(k.completions.filter(c => c.kidId === kid.id && c.status === 'pending').map(c => c.choreId));
  const todayStr = new Date().toDateString();
  const doneTodayIds = new Set(k.completions.filter(c => c.kidId === kid.id && c.status === 'approved' && new Date(c.completedAt).toDateString() === todayStr).map(c => c.choreId));

  let html = `
    <button onclick="kidsView='parent';kidsParentTab='overview';renderKids()" class="btn btn-ghost btn-sm" style="margin-bottom:16px">← Parent view</button>

    <div style="background:linear-gradient(135deg,#0891b2,#0e7490);border-radius:16px;padding:24px 28px;color:#fff;margin-bottom:24px;display:flex;align-items:center;gap:20px">
      <div style="font-size:48px;background:rgba(255,255,255,0.15);border-radius:50%;width:72px;height:72px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${kid.emoji}</div>
      <div style="flex:1">
        <div style="font-size:13px;opacity:0.75">Hey there,</div>
        <div style="font-size:24px;font-weight:800">${escHtml(kid.name)}!</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:44px;font-weight:800;line-height:1">${bal}</div>
        <div style="font-size:13px;opacity:0.75">⭐ points</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div>
        <div style="font-size:15px;font-weight:700;margin-bottom:12px">My Chores 📋</div>`;

  if (!myChores.length) {
    html += `<div style="color:#64748b;font-size:13px;padding:20px;text-align:center;background:#f8fafc;border-radius:10px">No chores assigned yet!</div>`;
  } else {
    myChores.forEach(ch => {
      const isPending  = pendingChoreIds.has(ch.id);
      const isDoneToday = doneTodayIds.has(ch.id);
      html += `<div class="chore-item ${isPending ? 'pending-approval' : isDoneToday ? 'done-today' : ''}">
        <div class="chore-emoji">${ch.emoji}</div>
        <div style="flex:1"><div class="chore-name">${escHtml(ch.name)}</div><div class="chore-meta">${isPending ? '⏳ Waiting...' : isDoneToday ? '✅ Done!' : ch.frequency}</div></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <div class="chore-pts">⭐ ${ch.points}</div>
          ${!isPending && !isDoneToday ? `<button class="approve-btn" style="font-size:11px;padding:3px 9px" onclick="markChoreDone('${ch.id}','${kid.id}')">Done! 🙋</button>` : ''}
        </div>
      </div>`;
    });
  }

  html += `</div><div>
    <div style="background:linear-gradient(135deg,#ecfeff,#ccfbf1);border:1px solid #99f6e4;border-radius:var(--r);padding:16px 18px;margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#0891b2">💰 Savings Jar</div>
      <div style="font-size:28px;font-weight:800;color:#0e7490;margin:4px 0">$${(kid.savings||0).toFixed(2)}</div>
      <button onclick="openSavingsModal('${kid.id}')" style="background:none;border:1px solid #0891b2;color:#0891b2;border-radius:6px;padding:4px 12px;font-size:12px;cursor:pointer;font-weight:600">+ Add</button>
    </div>
    <div style="font-size:15px;font-weight:700;margin-bottom:12px">Prize Shelf 🎁</div>`;

  if (!k.prizes.length) {
    html += `<div style="color:#64748b;font-size:13px;padding:20px;text-align:center;background:#f8fafc;border-radius:10px">No prizes on the shelf yet!</div>`;
  } else {
    k.prizes.forEach(pr => {
      const canAfford = bal >= pr.pointCost;
      const isPendingRed = k.redemptions.some(r => r.prizeId === pr.id && r.kidId === kid.id && r.status === 'pending');
      html += `<div class="prize-card ${canAfford && !isPendingRed ? 'can-afford' : ''} ${isPendingRed ? 'pending-redemption' : ''}">
        <div class="prize-icon">${pr.emoji}</div>
        <div style="flex:1"><div class="prize-name">${escHtml(pr.name)}</div><div class="prize-desc">${isPendingRed ? '⏳ Pending...' : canAfford ? '✅ You can get this!' : `${pr.pointCost - bal} pts to go`}</div></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <div class="prize-cost">⭐ ${pr.pointCost}</div>
          ${canAfford && !isPendingRed ? `<button onclick="requestRedemption('${pr.id}','${kid.id}')" style="background:#0891b2;color:#fff;border:none;border-radius:6px;padding:3px 9px;font-size:11px;cursor:pointer;font-weight:600">Redeem!</button>` : ''}
        </div>
      </div>`;
    });
  }

  html += `</div></div>`;
  el.innerHTML = html;
}

// ── Child Events management ─────────────────────────
export function _renderChildEventsMgmt() {
  const events = state.childEvents || [];
  const kids   = state.kids?.profiles || [];
  let html = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <span style="font-size:15px;font-weight:600">Child Events</span>
    <button class="btn btn-primary btn-sm" onclick="_openChildEventModal()">+ Add Event</button>
  </div>`;
  if (!events.length) {
    return html + `<div style="text-align:center;padding:40px 20px;color:#64748b">
      <div style="font-size:36px;margin-bottom:10px">📅</div>
      <div style="font-size:14px;font-weight:600;margin-bottom:6px">No events yet</div>
      <div style="font-size:13px">Add activities, appointments and school days for your kids</div>
    </div>`;
  }
  const sorted = [...events].sort((a,b) => (a.date||'').localeCompare(b.date||''));
  sorted.forEach(ev => {
    const ids = Array.isArray(ev.assignedTo) ? ev.assignedTo : [ev.assignedTo];
    const who = ev.isHouseholdWide || ids.includes('all')
      ? 'All kids'
      : ids.map(id => kids.find(k=>k.id===id)?.name || '?').join(', ');
    const recLabel = ev.recurrence ? ` · 🔁 ${({daily:'Daily',weekdays:'Weekdays',weekends:'Weekends',specific_days:'Selected days',interval:`Every ${ev.recurrence.intervalDays}d`,one_time:'Once'})[ev.recurrence.type]||''}` : '';
    html += `<div style="display:flex;align-items:center;gap:12px;padding:12px;background:#fff;border:1px solid var(--hairline);border-radius:var(--r);margin-bottom:8px">
      <span style="font-size:22px">${ev.emoji||'📅'}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:#18181B">${escHtml(ev.title)}</div>
        <div style="font-size:11px;color:#64748b">${ev.date||''}${ev.time?' · '+ev.time:''}${recLabel} · ${who}</div>
      </div>
      <button onclick="_openChildEventModal('${ev.id}')" class="btn btn-ghost btn-sm">✏️</button>
      <button onclick="_deleteChildEvent('${ev.id}')" class="btn btn-ghost btn-sm" style="color:#ef4444">🗑</button>
    </div>`;
  });
  return html;
}

export const CHILD_EVENT_EMOJIS = ['📅','⚽','🏊','🎓','🎂','🎨','🏃','🎭','🚌','🎡','🏖','🎪'];

export function _openChildEventModal(id) {
  const ev   = id ? (state.childEvents||[]).find(e=>e.id===id) : null;
  const kids = state.kids?.profiles || [];
  window.openModal(ev ? 'Edit Event' : 'Add Event', `
    ${id ? `<input type="hidden" id="ce-id" value="${id}">` : ''}
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Title</label>
        <input class="form-input" id="ce-title" value="${escAttr(ev?.title||'')}" placeholder="e.g. Swimming lesson" autofocus maxlength="50"></div>
      <div><label class="form-label">Emoji</label>
        <input class="form-input" id="ce-emoji" value="${ev?.emoji||'📅'}" maxlength="4" style="width:64px"></div>
    </div>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div class="form-group"><label class="form-label">Date</label>
        <input class="form-input" id="ce-date" type="date" value="${ev?.date||new Date().toISOString().slice(0,10)}" style="width:150px"></div>
      <div class="form-group"><label class="form-label">Time (optional)</label>
        <input class="form-input" id="ce-time" type="time" value="${ev?.time||''}" style="width:130px"></div>
    </div>
    <div class="form-group"><label class="form-label">Assign to</label>
      <select class="form-input" id="ce-who" style="max-width:240px">
        <option value="all" ${(!ev||(ev.isHouseholdWide||ev.assignedTo==='all'||ev.assignedTo?.includes?.('all')))?'selected':''}>All kids</option>
        ${kids.map(k=>`<option value="${k.id}" ${(Array.isArray(ev?.assignedTo)&&ev.assignedTo.includes(k.id))?'selected':''}>${k.emoji||''} ${escHtml(k.name)}</option>`).join('')}
      </select>
    </div>
    ${_routineRecurrenceFormHtml(ev?.recurrence||null)}
    <div class="form-group"><label class="form-label">Notes (optional)</label>
      <input class="form-input" id="ce-notes" value="${escAttr(ev?.notes||'')}" placeholder="e.g. Bring water bottle" maxlength="200"></div>
  `, () => {
    const title = document.getElementById('ce-title')?.value.trim();
    if (!title) return;
    const emoji = document.getElementById('ce-emoji')?.value.trim() || '📅';
    const date  = document.getElementById('ce-date')?.value;
    const time  = document.getElementById('ce-time')?.value || undefined;
    const who   = document.getElementById('ce-who')?.value;
    const notes = document.getElementById('ce-notes')?.value.trim() || '';
    const recurrence = _routineRecurrenceCollect();
    const existingId = document.getElementById('ce-id')?.value;
    if (!state.childEvents) state.childEvents = [];
    if (existingId) {
      const existing = state.childEvents.find(e=>e.id===existingId);
      if (existing) Object.assign(existing, { title, emoji, date, time, notes, recurrence, isHouseholdWide: who==='all', assignedTo: who==='all'?'all':[who] });
    } else {
      state.childEvents.push({ id:uid(), title, emoji, date, time, notes, recurrence,
        assignedTo: who==='all'?'all':[who], isHouseholdWide: who==='all',
        createdBy: _routineCurrentUserId() });
    }
    window.saveData(state); window.closeModal(); renderKids();
  });
  setTimeout(() => { _routineRecurrenceSummaryUpdate(); }, 100);
}

export function _deleteChildEvent(id) {
  if (!confirm('Delete this event?')) return;
  state.childEvents = (state.childEvents||[]).filter(e=>e.id!==id);
  window.saveData(state); renderKids();
}

// ── Actions ────────────────────────────────────────
export function markChoreDone(choreId, kidId) {
  state.kids.completions.push({ id: uid(), choreId, kidId, completedAt: Date.now(), status: 'pending' });
  window.saveData(state); renderKids();
}
export function approveCompletion(id) {
  const c = state.kids.completions.find(c => c.id === id);
  if (c) { c.status = 'approved'; c.approvedAt = Date.now(); }
  window.saveData(state); renderKids();
}
export function rejectCompletion(id) {
  const c = state.kids.completions.find(c => c.id === id);
  if (c) c.status = 'rejected';
  window.saveData(state); renderKids();
}
export function requestRedemption(prizeId, kidId) {
  state.kids.redemptions.push({ id: uid(), prizeId, kidId, requestedAt: Date.now(), status: 'pending' });
  window.saveData(state); renderKids();
}
export function approveRedemption(id) {
  const r = state.kids.redemptions.find(r => r.id === id);
  if (r) {
    r.status = 'approved'; r.approvedAt = Date.now();
    const prize = (state.kids.prizes || []).find(p => p.id === r.prizeId);
    if (!state.kids.notifications) state.kids.notifications = [];
    state.kids.notifications.push({
      id: uid(), kidId: r.kidId, type: 'prize_approved',
      prizeId: r.prizeId, prizeName: prize?.name || 'Prize',
      prizeEmoji: prize?.emoji || '🎁', ts: Date.now(), read: false
    });
  }
  window.saveData(state); renderKids();
}
export function rejectRedemption(id) {
  const r = state.kids.redemptions.find(r => r.id === id);
  if (r) {
    r.status = 'rejected';
    const prize = (state.kids.prizes || []).find(p => p.id === r.prizeId);
    if (!state.kids.notifications) state.kids.notifications = [];
    state.kids.notifications.push({
      id: uid(), kidId: r.kidId, type: 'prize_declined',
      prizeId: r.prizeId, prizeName: prize?.name || 'Prize',
      prizeEmoji: prize?.emoji || '🎁', ts: Date.now(), read: false
    });
  }
  window.saveData(state); renderKids();
}
export function deleteChore(id) { state.kids.chores = state.kids.chores.filter(c => c.id !== id); window.saveData(state); renderKids(); }
export function deletePrize(id) { state.kids.prizes = state.kids.prizes.filter(p => p.id !== id); window.saveData(state); renderKids(); }

// ── Emoji pickers ──────────────────────────────────
export const KID_EMOJIS   = ['😊','🦁','🐯','🐻','🦊','🐸','🐧','🦋','🌟','🎈','🚀','⚡'];
export const CHORE_EMOJIS = ['🧹','🍽','🐕','🛏','📚','🌿','🧺','🗑','🧽','🚿','🛒','🪴'];
export const PRIZE_EMOJIS = ['🍦','🎬','🎮','🍕','🎁','💰','🏖','🎡','🎨','👟','📱','🎭'];

export function emojiPicker(list, selected) {
  return `<div style="display:flex;flex-wrap:wrap;gap:6px" id="emoji-pick">
    ${list.map(e => `<button type="button" onclick="pickEmoji(this)" data-e="${e}" style="font-size:22px;padding:5px 8px;border-radius:7px;border:2px solid ${e===selected?'#0891b2':'var(--border)'};background:${e===selected?'#ecfeff':'none'};cursor:pointer;transition:all 0.1s">${e}</button>`).join('')}
  </div>`;
}
export function pickEmoji(btn) {
  btn.closest('#emoji-pick').querySelectorAll('button').forEach(b => { b.style.borderColor='var(--border)'; b.style.background='none'; });
  btn.style.borderColor='#0891b2'; btn.style.background='#ecfeff';
}
export function pickedEmoji(fallback) {
  const btn = document.querySelector('#emoji-pick button[style*="#0891b2"]');
  return btn ? btn.dataset.e : fallback;
}

// ── Modals ─────────────────────────────────────────
export function openAddKidModal() { openEditKidModal(null); }
export function openEditKidModal(id) {
  const kid = id ? state.kids.profiles.find(p => String(p.id) === String(id)) : null;
  document.getElementById('modal-title').textContent = kid ? 'Edit Kid' : 'Add Kid';
  document.getElementById('modal-body').innerHTML = `
    ${id ? `<input type="hidden" id="k-id" value="${id}">` : ''}
    <div class="form-group"><label class="form-label">Name</label><input class="form-input" id="k-name" value="${escAttr(kid?.name||'')}" placeholder="e.g. Emma" autofocus></div>
    <div class="form-group"><label class="form-label">Avatar</label>${emojiPicker(KID_EMOJIS, kid?.emoji||'😊')}</div>
    <div class="form-group">
      <label class="form-label">Age</label>
      <input class="form-input" id="k-age" type="number" min="1" max="18" value="${escAttr(String(kid?.age||''))}" placeholder="e.g. 8">
      <div style="font-size:11px;color:var(--text-muted);margin-top:5px;line-height:1.5">
        Age determines how ${escHtml(kid?.name || 'your child')} sees their Today screen —
        larger tap targets and emoji-only for younger kids, a cleaner layout for tweens.
        You can update this any time.
      </div>
    </div>
    ${id ? `<div style="margin-top:8px"><button class="btn btn-danger btn-sm" onclick="deleteKid('${id}')">Delete ${escHtml(kid.name)}</button></div>` : ''}
  `;
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="window.closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveKid()">Save</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}
export function saveKid() {
  const name = document.getElementById('k-name').value.trim(); if (!name) return;
  const age  = parseInt(document.getElementById('k-age').value) || null;
  const emoji = pickedEmoji('😊');
  const id = document.getElementById('k-id')?.value;
  if (id) { const k = state.kids.profiles.find(p => String(p.id) === String(id)); if (k) Object.assign(k, {name, emoji, age}); }
  else state.kids.profiles.push({ id: uid(), name, emoji, age, savings: 0 });
  window.saveData(state); window.closeModal(); renderKids();
}
export function deleteKid(id) {
  const kid = state.kids.profiles.find(p => String(p.id) === String(id));
  if (!kid) return;
  if (!confirm(`Remove ${kid.name} from this household?\n\nThis will permanently delete their chores, prizes and points history. This cannot be undone.`)) return;
  state.kids.profiles     = state.kids.profiles.filter(p => p.id !== id);
  state.kids.chores       = state.kids.chores.filter(c => c.assignedTo !== id);
  state.kids.completions  = state.kids.completions.filter(c => c.kidId !== id);
  state.kids.redemptions  = state.kids.redemptions.filter(r => r.kidId !== id);
  if (state.meals?.lunchbox?.profiles) {
    state.meals.lunchbox.profiles = state.meals.lunchbox.profiles.filter(p => p.id !== id);
  }
  if (state.childEvents) {
    state.childEvents = state.childEvents.filter(ev => {
      if (ev.isHouseholdWide) return true;
      const ids = Array.isArray(ev.assignedTo) ? ev.assignedTo : [ev.assignedTo];
      const remaining = ids.filter(x => x !== id);
      if (!remaining.length) return false;
      ev.assignedTo = remaining;
      return true;
    });
  }
  // If this device was assigned to the deleted kid, reset to adult
  if (window.getDeviceProfile() === id) { window.setDeviceProfile('adult'); }
  window.saveData(state); window.closeModal(); kidsView = 'parent'; renderKids();
}

export function openChoreModal(id) {
  const ch = id ? state.kids.chores.find(c => c.id === id) : null;
  const kids = state.kids.profiles;
  document.getElementById('modal-title').textContent = ch ? 'Edit Chore' : 'Add Chore';
  document.getElementById('modal-body').innerHTML = `
    ${id ? `<input type="hidden" id="c-id" value="${id}">` : ''}
    <div class="form-group"><label class="form-label">Chore Name</label><input class="form-input" id="c-name" value="${escAttr(ch?.name||'')}" placeholder="e.g. Tidy bedroom" autofocus></div>
    <div class="form-group"><label class="form-label">Emoji</label>${emojiPicker(CHORE_EMOJIS, ch?.emoji||'🧹')}</div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Points</label><input class="form-input" id="c-pts" type="number" max="99999999" min="1" value="${ch?.points||10}"></div>
      <div class="form-group"><label class="form-label">Frequency</label><select class="form-select" id="c-freq"><option value="daily" ${ch?.frequency==='daily'?'selected':''}>Daily</option><option value="weekly" ${ch?.frequency==='weekly'?'selected':''}>Weekly</option><option value="once" ${ch?.frequency==='once'?'selected':''}>One-off</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Assign to</label><select class="form-select" id="c-who"><option value="all">All kids</option>${kids.map(k=>`<option value="${k.id}" ${ch?.assignedTo===k.id?'selected':''}>${k.emoji} ${escHtml(k.name)}</option>`).join('')}</select></div>
  `;
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="window.closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveChore()">Save Chore</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}
export function saveChore() {
  const name = document.getElementById('c-name').value.trim(); if (!name) return;
  const points = parseInt(document.getElementById('c-pts').value)||10;
  const frequency = document.getElementById('c-freq').value;
  const assignedTo = document.getElementById('c-who').value;
  const emoji = pickedEmoji('🧹');
  const id = document.getElementById('c-id')?.value;
  if (id) { const c = state.kids.chores.find(c=>c.id===id); if(c) Object.assign(c,{name,emoji,points,frequency,assignedTo}); }
  else state.kids.chores.push({ id: uid(), name, emoji, points, frequency, assignedTo });
  window.saveData(state); window.closeModal(); renderKids();
}

export function openPrizeModal(id) {
  const pr = id ? state.kids.prizes.find(p => String(p.id) === String(id)) : null;
  document.getElementById('modal-title').textContent = pr ? 'Edit Prize' : 'Add Prize';
  document.getElementById('modal-body').innerHTML = `
    ${id ? `<input type="hidden" id="p-id" value="${id}">` : ''}
    <div class="form-group"><label class="form-label">Prize Name</label><input class="form-input" id="p-name" value="${escAttr(pr?.name||'')}" placeholder="e.g. Movie night" autofocus></div>
    <div class="form-group"><label class="form-label">Emoji</label>${emojiPicker(PRIZE_EMOJIS, pr?.emoji||'🎁')}</div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Point Cost</label><input class="form-input" id="p-cost" type="number" max="99999999" min="1" value="${pr?.pointCost||50}"></div>
      <div class="form-group"><label class="form-label">Type</label><select class="form-select" id="p-type"><option value="outing" ${pr?.type==='outing'?'selected':''}>Outing</option><option value="cash" ${pr?.type==='cash'?'selected':''}>Cash</option><option value="voucher" ${pr?.type==='voucher'?'selected':''}>Voucher</option><option value="custom" ${pr?.type==='custom'?'selected':''}>Custom</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Description (optional)</label><input class="form-input" id="p-desc" value="${escAttr(pr?.description||'')}" placeholder="e.g. Any movie of your choice"></div>
  `;
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="window.closeModal()">Cancel</button><button class="btn btn-primary" onclick="savePrize()">Save Prize</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}
export function savePrize() {
  const name = document.getElementById('p-name').value.trim(); if (!name) return;
  const pointCost = parseInt(document.getElementById('p-cost').value)||50;
  const type = document.getElementById('p-type').value;
  const description = document.getElementById('p-desc').value.trim();
  const emoji = pickedEmoji('🎁');
  const id = document.getElementById('p-id')?.value;
  if (id) { const p = state.kids.prizes.find(p=>p.id===id); if(p) Object.assign(p,{name,emoji,pointCost,type,description}); }
  else state.kids.prizes.push({ id: uid(), name, emoji, pointCost, type, description });
  window.saveData(state); window.closeModal(); renderKids();
}

export function openSavingsModal(kidId) {
  const kid = state.kids.profiles.find(p => p.id === kidId); if (!kid) return;
  document.getElementById('modal-title').textContent = `${kid.emoji} ${kid.name}'s Savings Jar`;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group"><label class="form-label">Current balance: $${(kid.savings||0).toFixed(2)}</label>
    <input class="form-input" id="s-amount" type="number" max="99999999" step="0.01" placeholder="Amount to add e.g. 5.00" autofocus></div>
    <div class="form-group"><label class="form-label">Note (optional)</label><input class="form-input" id="s-note" placeholder="e.g. Birthday money from Grandma"></div>
  `;
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="window.closeModal()">Cancel</button><button class="btn btn-primary" onclick="addSavings('${kidId}')">Add to Jar 💰</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}
export function addSavings(kidId) {
  const amount = parseFloat(document.getElementById('s-amount').value)||0; if (!amount) return;
  const kid = state.kids.profiles.find(p => p.id === kidId);
  if (kid) kid.savings = (kid.savings||0) + amount;
  window.saveData(state); window.closeModal(); renderKids();
}

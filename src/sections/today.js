// Today screen, setup progress, Type A / Life Score, dashboard
import { state } from '../store.js';
import { aud, audD, escHtml, fmtDate, isOverdue, monthlyTotal, itemMonthly, nextId } from './format.js';
import { billNextDue, billDaysUntil } from '../utils.js';
import { prefsGet, prefsSet, prefsClear } from '../prefs.js';

export function renderSetupProgress() {
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
export const _ALLOC_COLORS = ['#FF3B3B', '#FF8A65', '#FFB088', '#FCD34D', '#94A3B8', '#27272a'];

export function _todayAllocSegments(monthData) {
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

export function _briefIcon(card) {
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
export function _chipClassFor(card) {
  const s = card.section;
  if (s === 'Wallet') return 'money';
  if (s === 'Plan')   return 'social';
  if (s === 'Home')   return 'work';
  if (s === 'Family') return 'family';
  return 'study';
}
export function _chipLabelFor(card) {
  const s = card.section;
  return (s || 'Task').toLowerCase();
}

// Week strip — 7 days centred on today (-3..+3)
export function _renderWeekStrip() {
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
export function _renderLifeAreas(cards) {
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

export function _briefRow(card) {
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

export function renderToday() {
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

export function _tdOpenHeadsUpSheet() {
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

export function _tdOpenSlippingSheet() {
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

export function _tdOpenSheet(title, bodyHtml) {
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

export function _tdCloseSheet() {
  const el = document.getElementById('td-sheet-overlay');
  if (el) el.style.display = 'none';
}

export function _tdToggleStep(routineId, stepId) {
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

export function toggleInsightSheet() {
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
export let _lastBriefingDate = '';
export let _cachedBriefing = '';

export async function _fetchAIBriefing(cards, surplus, daysLeft, todayMeals, health) {
  const key = prefsGet('toto_ai_key');
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

export function renderDashboard() {
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

// Shared Planner utilities — constants, member helpers, event helpers
import { state } from '../store.js';

// Pure recurrence engine — no state, no side-effects.
// Single canonical copy used by planner-utils, routines, child-view, and guide.
export function _recurrenceMatchesDate(recurrence, dateStr) {
  if (!recurrence) return true;
  const { type, days, intervalDays, startDate, endDate } = recurrence;
  if (startDate && dateStr < startDate) return false;
  if (endDate   && dateStr > endDate)   return false;
  const d = new Date(dateStr + 'T12:00:00');
  const dow = d.getDay(); // 0=Sun..6=Sat
  switch (type) {
    case 'daily':         return true;
    case 'weekdays':      return dow >= 1 && dow <= 5;
    case 'weekends':      return dow === 0 || dow === 6;
    case 'specific_days': return Array.isArray(days) && days.includes(String(dow));
    case 'interval': {
      if (!startDate || !intervalDays) return false;
      const start = new Date(startDate + 'T12:00:00');
      const diff  = Math.round((d - start) / 86400000);
      return diff >= 0 && diff % intervalDays === 0;
    }
    case 'one_time': return dateStr === startDate;
    default:         return true;
  }
}

export const PLANNER_CATS = {
  work:    { label: 'Work',    emoji: '💼', color: '#dbeafe', text: '#1e40af', financial: false },
  study:   { label: 'Study',   emoji: '📚', color: '#fef3c7', text: '#92400e', financial: false },
  social:  { label: 'Social',  emoji: '🎉', color: '#ede9fe', text: '#5b21b6', financial: true  },
  family:  { label: 'Family',  emoji: '👨‍👩‍👧', color: '#fce7f3', text: '#9d174d', financial: false },
  travel:  { label: 'Travel',  emoji: '✈️',  color: '#e0f2fe', text: '#075985', financial: true  },
  health:  { label: 'Health',  emoji: '🏥', color: '#fef2f2', text: '#991b1b', financial: true  },
  finance: { label: 'Finance', emoji: '💰', color: '#ecfeff', text: '#155e75', financial: true  },
  home:    { label: 'Home',    emoji: '🏠', color: '#ecfeff', text: '#166534', financial: true  },
  school:  { label: 'School',  emoji: '🏫', color: '#fff7ed', text: '#9a3412', financial: true  },
  other:   { label: 'Other',   emoji: '📦', color: '#f1f5f9', text: '#475569', financial: false },
};

export let _plannerMonth = new Date().toISOString().slice(0, 7);
export let _plannerSelectedDay = new Date().toISOString().slice(0,10);
export let _plannerExpanded = new Set();
export let _plannerView = 'week'; // 'week' | 'month'
export let _plannerFilterMembers = new Set();
export let _plannerCollapseState = { 'life-areas': false, 'nudge': false };
export let _typeADimsExpanded = false;
export let _plannerDetailEvId = null;
// Expose mutable state on window so planner.js (separate module) can read/write via onclick strings
Object.defineProperty(window, '_plannerMonth',        { get() { return _plannerMonth; },        set(v) { _plannerMonth = v; },        configurable: true });
Object.defineProperty(window, '_plannerSelectedDay',  { get() { return _plannerSelectedDay; },  set(v) { _plannerSelectedDay = v; },  configurable: true });
Object.defineProperty(window, '_plannerView',         { get() { return _plannerView; },         set(v) { _plannerView = v; },         configurable: true });
Object.defineProperty(window, '_plannerDetailEvId',   { get() { return _plannerDetailEvId; },   set(v) { _plannerDetailEvId = v; },   configurable: true });
Object.defineProperty(window, '_typeADimsExpanded',   { get() { return _typeADimsExpanded; },   set(v) { _typeADimsExpanded = v; },   configurable: true });
// Object references (Sets/objects) — expose directly so mutations are visible everywhere
window._plannerExpanded       = _plannerExpanded;
window._plannerFilterMembers  = _plannerFilterMembers;
window._plannerCollapseState  = _plannerCollapseState;

export const PLANNER_MEMBER_PALETTE = [
  { dot:'#2563eb', bg:'#dbeafe', text:'#1e40af' },
  { dot:'#db2777', bg:'#fce7f3', text:'#9d174d' },
  { dot:'#d97706', bg:'#fef3c7', text:'#92400e' },
  { dot:'#7c3aed', bg:'#ede9fe', text:'#5b21b6' },
  { dot:'#16a34a', bg:'#dcfce7', text:'#166534' },
  { dot:'#0891b2', bg:'#ecfeff', text:'#155e75' },
  { dot:'#ea580c', bg:'#ffedd5', text:'#9a3412' },
  { dot:'#be185d', bg:'#fdf2f8', text:'#831843' },
];

export function _plannerMembers() {
  const household = state.householdProfile?.members || [];
  const kids = state.kids?.profiles || [];
  const result = [];
  let pi = 0;
  household.forEach((m, i) => {
    const pal = PLANNER_MEMBER_PALETTE[pi % PLANNER_MEMBER_PALETTE.length];
    if (m.role === 'adult' && m.name) {
      result.push({ id: 'adult-' + i, name: m.name, emoji: m.emoji || '🧑', ...pal });
      pi++;
    }
  });
  kids.forEach((k, i) => {
    const pal = PLANNER_MEMBER_PALETTE[pi % PLANNER_MEMBER_PALETTE.length];
    result.push({ id: k.id || 'kid-' + i, name: k.name, emoji: k.emoji || '🧒', ...pal });
    pi++;
  });
  if (result.length === 0) {
    result.push({ id: 'adult-0', name: 'Everyone', emoji: '👨‍👩‍👧', ...PLANNER_MEMBER_PALETTE[0] });
  }
  return result;
}

export function _plannerMemberById(id) {
  if (!id || id === 'everyone') return { id:'everyone', name:'Everyone', emoji:'👨‍👩‍👧', dot:'#94a3b8', bg:'#f1f5f9', text:'#475569' };
  return _plannerMembers().find(m => m.id === id) || { id:'everyone', name:'Everyone', emoji:'👨‍👩‍👧', dot:'#94a3b8', bg:'#f1f5f9', text:'#475569' };
}

export function _plannerEvMemberIds(ev) {
  if (Array.isArray(ev.memberIds)) return ev.memberIds;
  if (ev.memberId) return [ev.memberId];
  return ['everyone'];
}

export function _plannerEvPrimaryMember(ev) {
  const ids = _plannerEvMemberIds(ev);
  const first = ids.find(id => id !== 'everyone');
  return _plannerMemberById(first || 'everyone');
}

export function _plannerEvWhoLabel(ev) {
  const ids = _plannerEvMemberIds(ev);
  if (ids.includes('everyone') || ids.length === 0) return 'Everyone';
  return ids.map(id => _plannerMemberById(id).name).join(', ');
}

// Returns a human-readable recurrence label for an event, or '' if one-time.
export function _plannerRecurrenceLabel(ev) {
  // New rich recurrence
  if (ev.recurrence && ev.recurrence.type && ev.recurrence.type !== 'one_time') {
    const MAP = { daily:'Every day', weekdays:'Mon–Fri', weekends:'Sat & Sun' };
    if (MAP[ev.recurrence.type]) return MAP[ev.recurrence.type];
    if (ev.recurrence.type === 'specific_days') {
      const names = (ev.recurrence.days||[]).map(d => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d]).join(', ');
      return names || 'Specific days';
    }
    if (ev.recurrence.type === 'interval') return `Every ${ev.recurrence.intervalDays} days`;
  }
  // Legacy recurring string
  const LEG = { weekly:'Every week', fortnightly:'Every 2 weeks', monthly:'Every month', quarterly:'Every 3 months', yearly:'Annually' };
  if (ev.recurring && ev.recurring !== 'none') return LEG[ev.recurring] || ev.recurring;
  return '';
}

export function _plannerVisibleEvents() {
  const all = state.planner?.events || [];
  if (_plannerFilterMembers.size === 0) return all;
  return all.filter(e => {
    const ids = _plannerEvMemberIds(e);
    if (ids.includes('everyone')) return true;
    return [..._plannerFilterMembers].some(id => ids.includes(id));
  });
}

// Returns visible events that match a given date — respects recurrence.
export function _plannerEventsForDate(dateStr) {
  return _plannerVisibleEvents().filter(e => {
    // Legacy auto-generated copies match by exact date
    if (e._recurringSourceId) return e.date === dateStr;
    // New recurrence engine
    if (e.recurrence && e.recurrence.type !== 'one_time') {
      return _recurrenceMatchesDate(e.recurrence, dateStr);
    }
    // One-time or no recurrence — exact date match (or within endDate range)
    if (e.endDate && e.endDate > e.date) {
      return dateStr >= e.date && dateStr <= e.endDate;
    }
    return e.date === dateStr;
  });
}

export function _plannerFmt12h(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2,'0')}${h >= 12 ? 'pm' : 'am'}`;
}
export let _forecastMonth = new Date().toISOString().slice(0, 7);

export function _prevForecastMonth() {
  const [y, m] = _forecastMonth.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  _forecastMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  renderForecast();
}
export function _nextForecastMonth() {
  const [y, m] = _forecastMonth.split('-').map(Number);
  const d = new Date(y, m, 1);
  _forecastMonth = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  renderForecast();
}

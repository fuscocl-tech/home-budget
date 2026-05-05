// Pure formatting and utility functions — no DOM, Firebase, or state dependencies.
import { freqToMonthly } from '../utils.js';

// ── HTML escaping ─────────────────────────────────────────────────────────────

export function escHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escAttr(str) {
  return escHtml(str).replace(/\\/g, '\\\\');
}

// ── Currency formatting ───────────────────────────────────────────────────────

const _fmt  = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
const _fmtD = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function aud(n)  { return _fmt.format(n || 0); }
export function audD(n) { return _fmtD.format(n || 0); }

export function fmtNW(n) {
  const abs = Math.abs(n);
  const s = abs >= 1e6 ? (abs/1e6).toFixed(2)+'M' : abs >= 1e3 ? (abs/1e3).toFixed(1)+'k' : abs.toFixed(0);
  return (n < 0 ? '-$' : '$') + s;
}

// ── Date formatting ───────────────────────────────────────────────────────────

export function fmtDate(d) {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

export function isOverdue(dueDate) {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

// ── Frequency helpers ─────────────────────────────────────────────────────────

export function freqLabel(f) {
  return { daily:'/day', weekly:'/wk', fortnightly:'/fn', monthly:'/mo', quarterly:'/qtr', annually:'/yr', annual:'/yr' }[f] || '/mo';
}

export function freqDisplay(f) {
  return { daily:'Daily', weekly:'Weekly', fortnightly:'Fortnightly', monthly:'Monthly', quarterly:'Quarterly', annually:'Annually', annual:'Annually', custom:'Custom' }[f] || 'Monthly';
}

export function freqDisplayItem(item) {
  if ((item.frequency || 'monthly') === 'custom') {
    return `Every ${item.customEvery || 1} ${item.customUnit || 'weeks'}`;
  }
  return freqDisplay(item.frequency || 'monthly');
}

export function freqLabelItem(item) {
  if ((item.frequency || 'monthly') === 'custom') {
    const n = item.customEvery || 1;
    const u = item.customUnit === 'months' ? 'mo' : 'wk';
    return `/${n}${u}`;
  }
  return freqLabel(item.frequency || 'monthly');
}

export function itemMonthly(item) {
  const freq = item.frequency || 'monthly';
  if (freq === 'custom') {
    const n = item.customEvery || 1;
    return item.customUnit === 'months'
      ? (item.amount || 0) / n
      : (item.amount || 0) * 52 / (n * 12);
  }
  return freqToMonthly(item.amount || 0, freq);
}

export function monthlyTotal(items) {
  return items.reduce((sum, i) => sum + itemMonthly(i), 0);
}

// ── Array helpers ─────────────────────────────────────────────────────────────

export function nextId(arr) {
  return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
}

// ── State sanitisation ────────────────────────────────────────────────────────

export function sanitiseState(data) {
  const MAX_STR = 500;
  function walk(obj) {
    if (!obj || typeof obj !== 'object') return;
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string' && obj[key].length > MAX_STR) {
        obj[key] = obj[key].slice(0, MAX_STR);
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach(item => walk(item));
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        walk(obj[key]);
      }
    }
  }
  walk(data);
}

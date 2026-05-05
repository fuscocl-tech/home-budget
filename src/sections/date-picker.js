// Date picker — shared inline calendar used across sections
import { state } from '../store.js';

export function dpDateInput() {
  return document.getElementById('f-exp-duedate') || document.getElementById('f-inc-duedate');
}

export function openDatePicker(evt) {
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

export function renderDpCalendar() {
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

export function dpPrevMonth(evt) {
  evt.stopPropagation();
  if (dpViewMonth === 1) { dpViewMonth = 12; dpViewYear--; } else dpViewMonth--;
  renderDpCalendar();
}

export function dpNextMonth(evt) {
  evt.stopPropagation();
  if (dpViewMonth === 12) { dpViewMonth = 1; dpViewYear++; } else dpViewMonth++;
  renderDpCalendar();
}

export function dpSelectDate(ds, evt) {
  if (evt) evt.stopPropagation();
  const inp = dpDateInput(); if (inp) inp.value = ds;
  const [y, m, d] = ds.split('-');
  document.getElementById('dp-display').textContent = `${d}/${m}/${y}`;
  document.getElementById('dp-trigger').classList.add('has-value');
  document.getElementById('dp-popup').classList.add('hidden');
  const rw = document.getElementById('dp-repeats-wrap');
  if (rw) rw.style.display = '';
}

export function dpClearDate(evt) {
  evt.stopPropagation();
  const inp = dpDateInput(); if (inp) inp.value = '';
  document.getElementById('dp-display').textContent = 'Select a date';
  document.getElementById('dp-trigger').classList.remove('has-value');
  document.getElementById('dp-popup').classList.add('hidden');
  const rw = document.getElementById('dp-repeats-wrap');
  if (rw) rw.style.display = 'none';
}


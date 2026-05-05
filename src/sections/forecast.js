// Financial Forecast section
import { state } from '../store.js';
import { aud, escHtml, fmtDate, monthlyTotal, itemMonthly } from './format.js';
import { prefsGet } from '../prefs.js';
import {
  PLANNER_CATS, PLANNER_MEMBER_PALETTE,
  _plannerMembers, _plannerMemberById, _plannerEvMemberIds, _plannerEvPrimaryMember,
  _plannerEvWhoLabel, _plannerRecurrenceLabel, _plannerVisibleEvents, _plannerEventsForDate,
  _plannerFmt12h, _prevForecastMonth, _nextForecastMonth,
} from './planner-utils.js';

export function renderForecast() {
  const el = document.getElementById('forecast-content');
  if (!el) return;

  const events = (state.planner?.events || []).filter(ev => ev.date && ev.date.startsWith(_forecastMonth));
  const curData = getMonthData(_forecastMonth);
  const surplus = monthlyTotal(curData.income) - monthlyTotal(curData.expenses);

  // Group events by week
  const [fy, fm] = _forecastMonth.split('-').map(Number);
  const daysInMonth = new Date(fy, fm, 0).getDate();
  const weeks = [];
  let weekStart = 1;
  while (weekStart <= daysInMonth) {
    const ws = new Date(fy, fm - 1, weekStart);
    let weekEnd = weekStart;
    while (weekEnd < daysInMonth && new Date(fy, fm - 1, weekEnd + 1).getDay() !== 1) weekEnd++;
    weeks.push({ start: weekStart, end: weekEnd, events: [] });
    weekStart = weekEnd + 1;
  }

  events.sort((a, b) => a.date.localeCompare(b.date)).forEach(ev => {
    const day = parseInt(ev.date.split('-')[2]);
    const week = weeks.find(w => day >= w.start && day <= w.end);
    if (week) week.events.push(ev);
  });

  const eventsWithEstimates = events.filter(ev => ev.estimates && ev.estimates.length > 0);
  const eventsWithoutEstimates = events.filter(ev => !ev.estimates || ev.estimates.length === 0);
  const totalEstimated = events.reduce((s, ev) => s + (ev.estimates || []).filter(e => e.accepted).reduce((t, e) => t + (e.amount || 0), 0), 0);
  const gap = surplus - totalEstimated;

  const moLabel = new Date(fy, fm - 1).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
  const hasKey = !!prefsGet('toto_ai_key');

  // ── Month nav ──
  let html = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:8px">
        <button class="btn btn-sm" onclick="_prevForecastMonth()" style="font-size:16px;padding:2px 10px">‹</button>
        <span style="font-size:15px;font-weight:700;min-width:160px;text-align:center">${moLabel}</span>
        <button class="btn btn-sm" onclick="_nextForecastMonth()" style="font-size:16px;padding:2px 10px">›</button>
      </div>
      ${hasKey && eventsWithoutEstimates.length > 0 ? `
        <button class="btn btn-primary btn-sm" id="estimate-all-btn" onclick="estimateAllEvents()">
          Estimate all (${eventsWithoutEstimates.length} events)
        </button>` : ''}
    </div>`;

  if (events.length === 0) {
    html += `<div class="empty" style="margin-top:24px"><div class="empty-icon">📅</div><p>No events planned for ${moLabel}. Add events in the Planner tab.</p>
      <button class="btn btn-primary" style="margin-top:12px" onclick="activateTab('planner')">Go to Planner</button></div>`;
    el.innerHTML = html;
    return;
  }

  // ── Summary cards ──
  html += `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px">
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Estimated Total</div>
        <div style="font-size:22px;font-weight:800;color:var(--danger)">${aud(totalEstimated)}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Budget Surplus</div>
        <div style="font-size:22px;font-weight:800;color:${surplus >= 0 ? 'var(--success)' : 'var(--danger)'}">${aud(Math.abs(surplus))}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">${gap >= 0 ? 'Remaining After Events' : 'Shortfall'}</div>
        <div style="font-size:22px;font-weight:800;color:${gap >= 0 ? 'var(--success)' : 'var(--danger)'}">${gap >= 0 ? '' : '-'}${aud(Math.abs(gap))}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Events</div>
        <div style="font-size:22px;font-weight:800">${events.length}</div>
        ${eventsWithoutEstimates.length > 0 ? `<div style="font-size:11px;color:var(--warning);margin-top:2px">${eventsWithoutEstimates.length} not yet estimated</div>` : ''}
      </div>
    </div>`;

  // ── Weekly breakdown ──
  weeks.forEach((week, wi) => {
    if (week.events.length === 0) return;
    const weekTotal = week.events.reduce((s, ev) => s + (ev.estimates || []).filter(e => e.accepted).reduce((t, e) => t + (e.amount || 0), 0), 0);
    const startLabel = new Date(fy, fm - 1, week.start).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
    const endLabel   = new Date(fy, fm - 1, week.end).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });

    html += `
      <div class="section" style="margin-bottom:16px">
        <div class="section-header">
          <div>
            <div class="section-title">Week ${wi + 1}</div>
            <div class="section-subtitle">${startLabel} – ${endLabel}</div>
          </div>
          <span style="font-size:15px;font-weight:700;color:${weekTotal > 0 ? 'var(--danger)' : 'var(--text-muted)'}">${weekTotal > 0 ? aud(weekTotal) : 'No estimates'}</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Event</th><th>Category</th><th class="amount">Estimated</th><th></th></tr></thead>
            <tbody>
              ${week.events.map(ev => {
                const cat = PLANNER_CATS[ev.category] || PLANNER_CATS.other;
                const evTotal = (ev.estimates || []).filter(e => e.accepted).reduce((s, e) => s + (e.amount || 0), 0);
                const dateLabel = new Date(ev.date + 'T12:00:00').toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric' });
                const hasEst = ev.estimates && ev.estimates.length > 0;
                return `<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${dateLabel}</td>
                  <td style="font-weight:500">${escHtml(ev.title)}</td>
                  <td><span style="display:inline-block;padding:2px 8px;border-radius:99px;background:${cat.color};color:${cat.text};font-size:11px;font-weight:600">${cat.label}</span></td>
                  <td class="amount" style="font-weight:600;${hasEst ? '' : 'color:var(--text-muted)'}">${hasEst ? aud(evTotal) : '—'}</td>
                  <td style="text-align:right">
                    ${hasEst
                      ? `<details style="font-size:11px;color:var(--text-muted)"><summary style="cursor:pointer">breakdown</summary>
                          <div style="padding:4px 0">${ev.estimates.filter(e=>e.accepted).map(e => `<div style="display:flex;justify-content:space-between;gap:12px;padding:2px 0"><span>${escHtml(e.name)}</span><span>${aud(e.amount)}</span></div>`).join('')}</div>
                        </details>`
                      : hasKey ? `<button class="btn btn-sm" style="font-size:11px" onclick="estimatePlannerEvent('${ev.id}')">Estimate</button>` : '<span style="font-size:11px;color:var(--text-muted)">No API key</span>'}
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  });

  // ── Category breakdown ──
  const byCat = {};
  events.forEach(ev => {
    (ev.estimates || []).filter(e => e.accepted).forEach(e => {
      const cat = e.category || 'Other';
      byCat[cat] = (byCat[cat] || 0) + (e.amount || 0);
    });
  });
  const sortedCats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
  if (sortedCats.length > 0) {
    html += `
      <div class="section">
        <div class="section-header"><div class="section-title">By Category</div></div>
        <div style="padding:16px 20px">
          ${sortedCats.map(([cat, amt]) => {
            const pct = totalEstimated > 0 ? (amt / totalEstimated * 100) : 0;
            return `<div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                <span style="font-weight:500">${cat}</span>
                <span style="font-weight:600">${aud(amt)} <span style="font-weight:400;color:var(--text-muted)">${Math.round(pct)}%</span></span>
              </div>
              <div style="height:6px;background:var(--border);border-radius:4px;overflow:hidden">
                <div style="height:100%;width:${pct.toFixed(1)}%;background:#0891b2;border-radius:4px"></div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
  }

  el.innerHTML = html;
}

export async function estimateAllEvents() {
  const key = prefsGet('toto_ai_key');
  if (!key) return;

  const events = (state.planner?.events || []).filter(ev =>
    ev.date && ev.date.startsWith(_forecastMonth) && (!ev.estimates || ev.estimates.length === 0)
  );
  if (!events.length) return;

  const btn = document.getElementById('estimate-all-btn');
  if (btn) { btn.textContent = '⏳ Estimating…'; btn.disabled = true; }

  const adults = (state.householdProfile?.members || []).filter(m => m.role === 'adult').length || 2;
  const kids   = (state.householdProfile?.members || []).filter(m => m.role === 'child').length || 0;

  const eventList = events.map(ev => ({
    id: ev.id,
    title: ev.title,
    category: (PLANNER_CATS[ev.category] || PLANNER_CATS.other).label,
    date: ev.date,
    notes: ev.notes || ''
  }));

  const prompt = `You are a family finance assistant for an Australian family (${adults} adult${adults>1?'s':''}, ${kids} child${kids!==1?'ren':''}).

Estimate realistic costs for each of these events:
${JSON.stringify(eventList)}

Return ONLY a JSON array — one entry per event, each containing the event id and an items array:
[{"id":"event-id","items":[{"name":"Description","amount":150,"category":"Food & Dining"}]}]

Rules:
- Use realistic 2025 Australian dollar amounts
- Round to nearest $5 or $10
- Maximum 6 items per event
- Consider family size
- Categories: Transport, Accommodation, Food & Dining, Entertainment, Gifts, Clothing, Health, Education, Shopping, Other
- No markdown, no code fences, just raw JSON`;

  try {
    const res = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 4096, messages: [{ role: 'user', content: prompt }] })
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const raw = data.content[0].text.replace(/```[\w]*\n?/g, '').trim();
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON');
    const results = JSON.parse(match[0]);

    results.forEach(r => {
      const ev = (state.planner?.events || []).find(e => e.id === r.id);
      if (ev && r.items) {
        ev.estimates = r.items.map((item, i) => ({
          id: `est-${Date.now()}-${i}`,
          name: item.name,
          amount: Number(item.amount) || 0,
          category: item.category || 'Other',
          accepted: true
        }));
      }
    });

    saveData(state);
    renderForecast();
  } catch(err) {
    if (btn) { btn.textContent = `Estimate all (${events.length} events)`; btn.disabled = false; }
    console.error('Batch estimate error:', err);
  }
}

// Projects section — family project planner (Slice 1: foundation)
// Templates + manual create + list + detail. AI on-ramp comes in Slice 2.
//
// Data model: state.projects[i] = {
//   id, name, emoji, template, status, members, isFamilyGoal,
//   goalKidPointsTarget, startDate, endDate, budget, location, notes,
//   tasks: [{ id, name, done, dueDate }],
//   bookings: [], quotes: [], stages: [],   // template-specific, populated later
//   createdAt
// }
//
// state.activeFamilyGoalProjectId — id of the project flagged as the household's
// current active family goal (only one at a time).

import { state } from '../store.js';
import { aud, escHtml, escAttr, nextId, fmtDate } from './format.js';
import { prefsGet } from '../prefs.js';

const CLAUDE_API = 'https://api.anthropic.com/v1/messages';

// ── Template definitions ──────────────────────────────────
export const PROJECT_TEMPLATES = {
  holiday: {
    label: 'Holiday',
    emoji: '✈️',
    sub: 'FLIGHTS · ACCOM · PACKING',
    heroGradient: 'linear-gradient(135deg, #0F4D8B 0%, #2E96D7 100%)',
    sections: ['tasks', 'bookings'],
    defaultTasks: [
      { name: 'Book flights' },
      { name: 'Book accommodation' },
      { name: 'Travel insurance' },
      { name: 'Check passports valid 6+ months' },
      { name: 'Stop the mail' },
      { name: 'House sitter / dog boarding' },
    ],
  },
  reno: {
    label: 'Reno / build',
    emoji: '🌳',
    sub: 'QUOTES · STAGES · PHOTOS',
    heroGradient: 'linear-gradient(135deg, #166534 0%, #4D7C0F 100%)',
    sections: ['tasks', 'quotes', 'stages'],
    defaultTasks: [
      { name: 'Get 3 quotes' },
      { name: 'Council approval (if needed)' },
      { name: 'Sign contract' },
      { name: 'Schedule start date' },
      { name: 'Materials list' },
      { name: 'Final walkthrough' },
    ],
  },
  party: {
    label: 'Party / event',
    emoji: '🎉',
    sub: 'GUESTS · FOOD · DECOR',
    heroGradient: 'linear-gradient(135deg, #BE123C 0%, #F472B6 100%)',
    sections: ['tasks'],
    defaultTasks: [
      { name: 'Send invitations' },
      { name: 'Confirm headcount' },
      { name: 'Order cake' },
      { name: 'Decorations' },
      { name: 'Food / catering' },
      { name: 'Music / entertainment' },
    ],
  },
  'life-event': {
    label: 'Big life event',
    emoji: '👶',
    sub: 'BABY · MOVE · SCHOOL',
    heroGradient: 'linear-gradient(135deg, #5B21B6 0%, #A78BFA 100%)',
    sections: ['tasks'],
    defaultTasks: [
      { name: 'Make a checklist' },
      { name: 'Tell key people' },
      { name: 'Update insurance / paperwork' },
      { name: 'Set a budget' },
      { name: 'Plan the timeline' },
    ],
  },
  seasonal: {
    label: 'Seasonal',
    emoji: '🎄',
    sub: 'XMAS · HOLS · BIRTHDAYS',
    heroGradient: 'linear-gradient(135deg, #B91C1C 0%, #F59E0B 100%)',
    sections: ['tasks'],
    defaultTasks: [
      { name: 'Set the budget' },
      { name: 'Make a gift list' },
      { name: 'Plan meals / hosting' },
      { name: 'Travel arrangements' },
    ],
  },
  custom: {
    label: 'Custom',
    emoji: '✨',
    sub: 'START FROM SCRATCH',
    heroGradient: 'linear-gradient(135deg, #4B5563 0%, #9CA3AF 100%)',
    sections: ['tasks'],
    defaultTasks: [],
  },
};

const STATUS_LABELS = {
  planning: { label: 'Planning', color: '#6B5CFF', bg: '#EFEDFF' },
  active:   { label: 'Active',   color: '#065F46', bg: '#DCFCE7' },
  done:     { label: 'Done',     color: '#52525B', bg: '#F4F4F5' },
  paused:   { label: 'Paused',   color: '#92400E', bg: '#FEF3C7' },
};

// ── Module-local state ────────────────────────────────────
let _projectsView = 'list';        // list | new | detail | ai-draft
let _activeProjectId = null;
let _newProjectTemplate = null;    // when in 'new' view, which template the user picked
let _aiDraft = null;               // structured draft returned by Claude
let _aiPrompt = '';                // last user prompt (for "Tweak it")
let _aiBusy = false;
let _aiError = '';

export function _getProjectsView() { return _projectsView; }
export function _setProjectsView(v) { _projectsView = v; }

// Expose to window so legacy onclick handlers can drive it
Object.defineProperty(window, '_projectsView', {
  get() { return _projectsView; },
  set(v) { _projectsView = v; },
  configurable: true,
});
Object.defineProperty(window, '_activeProjectId', {
  get() { return _activeProjectId; },
  set(v) { _activeProjectId = v; },
  configurable: true,
});
Object.defineProperty(window, '_newProjectTemplate', {
  get() { return _newProjectTemplate; },
  set(v) { _newProjectTemplate = v; },
  configurable: true,
});

// ── Helpers ──────────────────────────────────────────────
function _ensureProjectsState() {
  if (!state.projects) state.projects = [];
  if (state.activeFamilyGoalProjectId === undefined) state.activeFamilyGoalProjectId = null;
}

export function _projectsList() {
  _ensureProjectsState();
  return state.projects;
}

export function _findProject(id) {
  _ensureProjectsState();
  return state.projects.find(p => p.id === id);
}

function _projectMembers(p) {
  const all = (state.householdProfile?.members || [])
    .filter(m => m.role === 'adult' && m.name)
    .map((m, i) => ({ id: 'a' + i, name: m.name, role: 'adult' }));
  const kids = (state.kids?.profiles || []).map(k => ({ id: 'k' + k.id, name: k.name, role: 'child', emoji: k.emoji }));
  const pool = [...all, ...kids];
  return (p.members || []).map(mid => pool.find(m => m.id === mid)).filter(Boolean);
}

function _projectSpent(p) {
  // Sum of bookings cost + manual transactions tagged to project
  const bookings = (p.bookings || []).reduce((s, b) => s + (b.cost || 0), 0);
  return bookings + (p.spentManual || 0);
}

function _projectProgress(p) {
  const total = (p.tasks || []).length;
  const done = (p.tasks || []).filter(t => t.done).length;
  return { total, done, pct: total > 0 ? Math.round(done / total * 100) : 0 };
}

function _todayISO() { return new Date().toISOString().slice(0, 10); }

// ── Top-level render ─────────────────────────────────────
export function renderProjects() {
  const el = document.getElementById('projects-content');
  if (!el) return;
  _ensureProjectsState();

  if (_projectsView === 'detail' && _activeProjectId) {
    const p = _findProject(_activeProjectId);
    if (!p) { _projectsView = 'list'; _activeProjectId = null; return renderProjects(); }
    el.innerHTML = _renderProjectDetail(p);
  } else if (_projectsView === 'ai-draft') {
    el.innerHTML = _renderAiDraft();
  } else if (_projectsView === 'new') {
    el.innerHTML = _renderNewProjectFlow();
  } else {
    el.innerHTML = _renderProjectsHome();
  }
}

// ── Projects list (home) ─────────────────────────────────
function _renderProjectsHome() {
  const projects = _projectsList();
  const active = projects.filter(p => p.status === 'active');
  const planning = projects.filter(p => p.status === 'planning');
  const done = projects.filter(p => p.status === 'done');
  const paused = projects.filter(p => p.status === 'paused');

  const intro = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px 6px;gap:10px">
      <div>
        <div style="font-size:11px;font-family:var(--mono);font-weight:600;color:var(--muted);letter-spacing:0.5px;text-transform:uppercase">${active.length} active · ${planning.length} planning</div>
      </div>
      <button class="btn btn-primary" style="border-radius:99px;padding:9px 16px;font-size:13px;font-weight:600" onclick="_projectsOpenNew()">+ New project</button>
    </div>`;

  if (projects.length === 0) {
    return intro + `
      <div style="margin:40px 20px;text-align:center;padding:40px 20px;background:var(--paper);border:1px dashed var(--hairline);border-radius:24px">
        <div style="font-size:48px;margin-bottom:14px">📋</div>
        <div style="font-size:16px;font-weight:600;color:var(--ink);margin-bottom:6px">No projects yet</div>
        <div style="font-size:13px;color:var(--muted);line-height:1.5;max-width:280px;margin:0 auto 20px">
          Plan a holiday, manage a reno, organise a party — Toto can keep track of the tasks, costs and timing.
        </div>
        <button class="btn btn-primary" style="border-radius:99px;padding:11px 22px;font-weight:600" onclick="_projectsOpenNew()">+ Start your first project</button>
      </div>`;
  }

  const sections = [];
  if (active.length)   sections.push(_renderProjectGroup('Active', active));
  if (planning.length) sections.push(_renderProjectGroup('Planning', planning));
  if (paused.length)   sections.push(_renderProjectGroup('Paused', paused));
  if (done.length)     sections.push(_renderProjectGroup('Done', done));

  return intro + sections.join('');
}

function _renderProjectGroup(title, items) {
  return `
    <div style="margin:14px 0 0">
      <div style="padding:6px 20px 8px;font-size:11px;font-family:var(--mono);font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px">${escHtml(title)}</div>
      <div style="display:flex;flex-direction:column;gap:10px;padding:0 16px">
        ${items.map(_renderProjectCard).join('')}
      </div>
    </div>`;
}

function _renderProjectCard(p) {
  const tpl = PROJECT_TEMPLATES[p.template] || PROJECT_TEMPLATES.custom;
  const status = STATUS_LABELS[p.status] || STATUS_LABELS.planning;
  const prog = _projectProgress(p);
  const spent = _projectSpent(p);
  const dateLine = p.startDate
    ? (p.endDate ? `${fmtDate(p.startDate)}–${fmtDate(p.endDate)}` : `From ${fmtDate(p.startDate)}`)
    : '';
  const members = _projectMembers(p).slice(0, 4);
  const isGoal = state.activeFamilyGoalProjectId === p.id;

  return `
    <div style="background:var(--paper);border:1px solid ${isGoal ? 'var(--purple)' : 'var(--hairline)'};border-radius:20px;overflow:hidden;cursor:pointer" onclick="_projectsOpenDetail('${p.id}')">
      <div style="padding:14px 16px 12px;background:${tpl.heroGradient};color:#fff">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
          <div>
            <div style="font-size:11px;font-family:var(--mono);text-transform:uppercase;letter-spacing:0.5px;opacity:0.8;margin-bottom:3px">
              ${tpl.emoji} ${tpl.label}${isGoal ? ' · ⭐ Family goal' : ''}
            </div>
            <div style="font-size:18px;font-weight:700;letter-spacing:-0.3px">${escHtml(p.name)}</div>
            ${dateLine ? `<div style="font-size:11px;opacity:0.85;font-family:var(--mono);margin-top:3px">${dateLine}</div>` : ''}
          </div>
          <span style="background:rgba(255,255,255,0.20);font-family:var(--mono);font-size:9px;font-weight:600;padding:3px 8px;border-radius:6px;letter-spacing:0.3px;text-transform:uppercase;flex-shrink:0">${status.label}</span>
        </div>
      </div>
      <div style="padding:12px 16px;display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div style="flex:1;min-width:0">
          ${prog.total > 0 ? `
            <div style="font-size:11px;color:var(--muted);font-family:var(--mono);margin-bottom:5px">${prog.done}/${prog.total} TASKS · ${prog.pct}%</div>
            <div style="height:5px;background:var(--hairline);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${prog.pct}%;background:var(--purple);border-radius:99px"></div>
            </div>
          ` : `<div style="font-size:11px;color:var(--muted);font-family:var(--mono)">No tasks yet</div>`}
        </div>
        ${p.budget > 0 ? `
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:11px;color:var(--muted);font-family:var(--mono)">BUDGET</div>
            <div style="font-size:13px;font-weight:600;color:var(--ink)">${aud(spent)} / ${aud(p.budget)}</div>
          </div>` : ''}
      </div>
      ${members.length > 0 ? `
        <div style="padding:0 16px 12px;display:flex;gap:4px">
          ${members.map(m => `<div style="width:22px;height:22px;border-radius:50%;background:${m.role === 'child' ? '#FF6B5C' : '#5B4CF5'};color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;border:1.5px solid var(--paper)">${m.role === 'child' && m.emoji ? m.emoji : (m.name[0] || '?').toUpperCase()}</div>`).join('')}
        </div>` : ''}
    </div>`;
}

// ── New project flow (template gallery + form) ───────────
function _renderNewProjectFlow() {
  if (_newProjectTemplate) return _renderCreateForm(_newProjectTemplate);
  return _renderTemplateGallery();
}

function _renderTemplateGallery() {
  const back = `<div style="padding:14px 20px 6px"><button onclick="_projectsBackToList()" style="background:none;border:none;color:var(--muted);font-size:13px;font-family:var(--sans);cursor:pointer;padding:0">← Back</button></div>`;

  const hasKey = !!prefsGet('toto_ai_key');
  const errMsg = _aiError ? `<div style="margin-top:10px;font-size:12px;color:#FCA5A5">${escHtml(_aiError)}</div>` : '';

  const aiCard = hasKey ? `
    <div style="margin:8px 16px 0;background:linear-gradient(160deg,#221F1A 0%,#16140F 100%);border-radius:24px;padding:18px;color:#fff;position:relative">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-family:var(--mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:rgba(255,255,255,0.55)">🐕 Toto · <span style="color:var(--iris-1)">powered by AI</span></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);border-radius:16px;padding:12px 14px">
        <textarea id="proj-ai-input" rows="3" placeholder='e.g. "Bali holiday in October, $8K budget, just our family"' style="flex:1;background:transparent;border:none;outline:none;color:#fff;font-size:13px;font-family:var(--sans);line-height:1.4;resize:none;min-height:60px" ${_aiBusy ? 'disabled' : ''}>${escAttr(_aiPrompt)}</textarea>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;gap:10px">
        <span style="font-family:var(--mono);font-size:10px;color:rgba(255,255,255,0.45);letter-spacing:0.3px">${_aiBusy ? 'TOTO IS THINKING…' : 'TELL TOTO WHAT TO PLAN'}</span>
        <button onclick="_projectsAiSubmit()" ${_aiBusy ? 'disabled' : ''} style="background:linear-gradient(135deg,var(--iris-2),var(--purple));color:#fff;border:none;border-radius:99px;padding:9px 18px;font-size:12px;font-weight:600;cursor:${_aiBusy ? 'wait' : 'pointer'};font-family:var(--sans);opacity:${_aiBusy ? 0.6 : 1}">${_aiBusy ? '…' : 'Go →'}</button>
      </div>
      ${errMsg}
    </div>` : `
    <div style="margin:8px 16px 0;background:var(--paper);border:1px dashed var(--hairline);border-radius:24px;padding:18px;color:var(--ink-soft)">
      <div style="font-family:var(--mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted);margin-bottom:8px">🐕 Toto · powered by AI</div>
      <div style="font-size:13px;line-height:1.5">Add your AI key in Settings to let Toto plan projects from a chat. Or just pick a template below.</div>
    </div>`;

  const divider = `<div style="margin:18px 20px 10px;display:flex;align-items:center;gap:10px;color:var(--muted)"><span style="flex:1;height:1px;background:var(--hairline)"></span><span style="font-family:var(--mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px">or pick a template</span><span style="flex:1;height:1px;background:var(--hairline)"></span></div>`;

  const grid = `
    <div style="margin:0 16px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${Object.entries(PROJECT_TEMPLATES).map(([key, t]) => `
        <div style="background:var(--paper);border:1px ${key==='custom'?'dashed':'solid'} var(--hairline);border-radius:18px;padding:14px 12px;cursor:pointer;display:flex;flex-direction:column;gap:6px;${key==='custom'?'background:var(--paper-warm);':''}" onclick="_projectsPickTemplate('${key}')">
          <span style="font-size:24px;line-height:1">${t.emoji}</span>
          <span style="font-size:13px;font-weight:600;color:var(--ink);line-height:1.2">${t.label}</span>
          <span style="font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:0.3px">${t.sub}</span>
        </div>`).join('')}
    </div>`;

  return back + `<div style="padding:0 20px 6px"><div style="font-size:24px;font-weight:700;letter-spacing:-0.5px">New project</div><div style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:4px">CHOOSE A STARTING POINT</div></div>` + aiCard + divider + grid + `<div style="height:24px"></div>`;
}

function _renderCreateForm(templateKey) {
  const tpl = PROJECT_TEMPLATES[templateKey];
  if (!tpl) { _newProjectTemplate = null; return _renderTemplateGallery(); }

  const memberPool = [
    ...((state.householdProfile?.members || [])
      .filter(m => m.role === 'adult' && m.name)
      .map((m, i) => ({ id: 'a' + i, name: m.name, role: 'adult' }))),
    ...((state.kids?.profiles || [])
      .map(k => ({ id: 'k' + k.id, name: k.name, role: 'child', emoji: k.emoji }))),
  ];

  const back = `<div style="padding:14px 20px 6px"><button onclick="_projectsPickTemplate(null)" style="background:none;border:none;color:var(--muted);font-size:13px;font-family:var(--sans);cursor:pointer;padding:0">← Pick another template</button></div>`;

  return back + `
    <div style="padding:0 20px 6px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <span style="font-size:34px">${tpl.emoji}</span>
        <div>
          <div style="font-size:22px;font-weight:700;letter-spacing:-0.4px">New ${tpl.label.toLowerCase()}</div>
          <div style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:2px">FILL THE BASICS, EDIT MORE LATER</div>
        </div>
      </div>
    </div>
    <form id="projects-create-form" onsubmit="event.preventDefault();_projectsSaveNew('${templateKey}')" style="margin:6px 16px 0;background:var(--paper);border:1px solid var(--hairline);border-radius:20px;padding:18px;display:flex;flex-direction:column;gap:14px">
      <label style="display:flex;flex-direction:column;gap:4px">
        <span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px">Name</span>
        <input id="proj-name" required maxlength="60" placeholder="e.g. Bali holiday" style="border:1px solid var(--hairline);border-radius:10px;padding:9px 12px;font-size:14px;font-family:var(--sans);color:var(--ink);background:var(--paper-warm)">
      </label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <label style="display:flex;flex-direction:column;gap:4px">
          <span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px">Start</span>
          <input id="proj-start" type="date" style="border:1px solid var(--hairline);border-radius:10px;padding:9px 12px;font-size:14px;font-family:var(--sans);color:var(--ink);background:var(--paper-warm)">
        </label>
        <label style="display:flex;flex-direction:column;gap:4px">
          <span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px">End</span>
          <input id="proj-end" type="date" style="border:1px solid var(--hairline);border-radius:10px;padding:9px 12px;font-size:14px;font-family:var(--sans);color:var(--ink);background:var(--paper-warm)">
        </label>
      </div>
      <label style="display:flex;flex-direction:column;gap:4px">
        <span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px">Budget (AUD)</span>
        <input id="proj-budget" type="number" min="0" step="100" placeholder="0" style="border:1px solid var(--hairline);border-radius:10px;padding:9px 12px;font-size:14px;font-family:var(--sans);color:var(--ink);background:var(--paper-warm)">
      </label>
      <label style="display:flex;flex-direction:column;gap:4px">
        <span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px">Location <span style="color:var(--muted-soft);text-transform:none;font-weight:500">(optional)</span></span>
        <input id="proj-location" maxlength="100" placeholder="e.g. Bali, Indonesia" style="border:1px solid var(--hairline);border-radius:10px;padding:9px 12px;font-size:14px;font-family:var(--sans);color:var(--ink);background:var(--paper-warm)">
      </label>
      <div style="display:flex;flex-direction:column;gap:6px">
        <span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px">Who's involved</span>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${memberPool.map(m => `
            <label style="display:flex;align-items:center;gap:6px;background:var(--paper-warm);border:1px solid var(--hairline);border-radius:99px;padding:5px 10px;cursor:pointer;font-size:12px">
              <input type="checkbox" name="proj-member" value="${m.id}" style="margin:0">
              <span>${m.role === 'child' && m.emoji ? m.emoji + ' ' : ''}${escHtml(m.name)}</span>
            </label>`).join('')}
          ${memberPool.length === 0 ? `<span style="font-size:12px;color:var(--muted)">No members set up yet — add them in Settings.</span>` : ''}
        </div>
      </div>
      <label style="display:flex;flex-direction:column;gap:4px">
        <span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px">Notes <span style="color:var(--muted-soft);text-transform:none;font-weight:500">(optional)</span></span>
        <textarea id="proj-notes" rows="2" maxlength="500" style="border:1px solid var(--hairline);border-radius:10px;padding:9px 12px;font-size:14px;font-family:var(--sans);color:var(--ink);background:var(--paper-warm);resize:vertical"></textarea>
      </label>

      <div style="background:var(--purple-tint);border:1px solid var(--purple-soft);border-radius:12px;padding:10px 12px;font-size:12px;color:var(--ink-soft);line-height:1.4">
        <strong>${tpl.defaultTasks.length} starter task${tpl.defaultTasks.length === 1 ? '' : 's'}</strong> will be added automatically — you can tick them off, swap them, or delete what doesn't apply.
      </div>

      <div style="display:flex;gap:8px;margin-top:4px">
        <button type="button" class="btn btn-secondary" onclick="_projectsPickTemplate(null)" style="flex:1;padding:12px;justify-content:center">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="event.preventDefault();_projectsSaveNew('${templateKey}')" style="flex:1;padding:12px;justify-content:center">Create project →</button>
      </div>
    </form>
    <div style="height:24px"></div>`;
}

// ── Project detail ───────────────────────────────────────
function _renderProjectDetail(p) {
  const tpl = PROJECT_TEMPLATES[p.template] || PROJECT_TEMPLATES.custom;
  const status = STATUS_LABELS[p.status] || STATUS_LABELS.planning;
  const prog = _projectProgress(p);
  const spent = _projectSpent(p);
  const remaining = (p.budget || 0) - spent;
  const isGoal = state.activeFamilyGoalProjectId === p.id;
  const dateLine = p.startDate
    ? (p.endDate ? `${fmtDate(p.startDate)} – ${fmtDate(p.endDate)}` : `From ${fmtDate(p.startDate)}`)
    : 'No dates set';
  const members = _projectMembers(p);

  const back = `<div style="padding:14px 20px 6px"><button onclick="_projectsBackToList()" style="background:none;border:none;color:var(--muted);font-size:13px;font-family:var(--sans);cursor:pointer;padding:0">← All projects</button></div>`;

  const hero = `
    <div style="margin:6px 16px 0;background:${tpl.heroGradient};border-radius:24px;padding:18px;color:#fff">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="flex:1;min-width:0">
          <div style="display:inline-block;background:rgba(255,255,255,0.20);font-family:var(--mono);font-size:9px;font-weight:600;padding:3px 8px;border-radius:6px;letter-spacing:0.3px;text-transform:uppercase;margin-bottom:8px">
            ${tpl.emoji} ${tpl.label}${isGoal ? ' · ⭐ FAMILY GOAL' : ''}
          </div>
          <div style="font-size:24px;font-weight:700;letter-spacing:-0.5px;line-height:1.1">${escHtml(p.name)}</div>
          <div style="font-family:var(--mono);font-size:11px;color:rgba(255,255,255,0.75);margin-top:4px">${dateLine}${p.location ? ' · ' + escHtml(p.location) : ''}</div>
        </div>
        <select onchange="_projectsSetStatus('${p.id}',this.value)" style="background:rgba(255,255,255,0.15);color:#fff;border:none;border-radius:8px;padding:5px 8px;font-family:var(--mono);font-size:10px;font-weight:600;letter-spacing:0.3px;text-transform:uppercase;cursor:pointer">
          ${Object.entries(STATUS_LABELS).map(([k, v]) => `<option value="${k}" ${p.status===k?'selected':''}>${v.label}</option>`).join('')}
        </select>
      </div>
      ${prog.total > 0 ? `
        <div style="margin-top:14px">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
            <span style="font-family:var(--mono);font-size:10px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:0.5px">Tasks</span>
            <span style="font-size:14px;font-weight:600">${prog.done} of ${prog.total}</span>
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.15);border-radius:99px;overflow:hidden">
            <div style="height:100%;background:#fff;border-radius:99px;width:${prog.pct}%"></div>
          </div>
        </div>` : ''}
    </div>`;

  const budget = (p.budget > 0) ? `
    <div style="margin:12px 16px 0;background:var(--paper);border:1px solid var(--hairline);border-radius:20px;padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
        <span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px">Budget</span>
        <span style="font-size:13px;font-weight:600;color:var(--ink)">${aud(p.budget)}</span>
      </div>
      <div style="height:8px;background:var(--hairline-soft);border-radius:99px;overflow:hidden;margin-top:6px">
        <div style="height:100%;background:${remaining < 0 ? 'var(--ember)' : 'var(--watch)'};border-radius:99px;width:${Math.min(100, p.budget > 0 ? (spent / p.budget * 100) : 0)}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:6px;font-family:var(--mono)">
        <span><span style="color:var(--watch)">●</span> ${aud(spent)} spent</span>
        <span><span style="color:${remaining < 0 ? 'var(--ember)' : 'var(--good)'}">●</span> ${remaining < 0 ? aud(-remaining) + ' over' : aud(remaining) + ' left'}</span>
      </div>
    </div>` : '';

  const membersBlock = members.length > 0 ? `
    <div style="margin:12px 16px 0;background:var(--paper);border:1px solid var(--hairline);border-radius:20px;padding:14px 16px">
      <div style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Who's involved</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${members.map(m => `<div style="display:flex;align-items:center;gap:6px;background:var(--paper-warm);border:1px solid var(--hairline);border-radius:99px;padding:4px 10px 4px 4px;font-size:12px">
          <span style="width:22px;height:22px;border-radius:50%;background:${m.role === 'child' ? '#FF6B5C' : '#5B4CF5'};color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600">${m.role === 'child' && m.emoji ? m.emoji : (m.name[0] || '?').toUpperCase()}</span>
          <span>${escHtml(m.name)}</span>
        </div>`).join('')}
      </div>
    </div>` : '';

  const tasks = `
    <div style="margin:18px 20px 6px;display:flex;align-items:center;justify-content:space-between">
      <span style="font-size:14px;font-weight:600;color:var(--ink)">Tasks</span>
      <button onclick="_projectsAddTask('${p.id}')" style="background:none;border:none;color:var(--purple);font-size:12px;font-weight:600;font-family:var(--mono);text-transform:uppercase;letter-spacing:0.5px;cursor:pointer;padding:0">+ Add</button>
    </div>
    <div style="margin:0 16px;background:var(--paper);border:1px solid var(--hairline);border-radius:18px;overflow:hidden">
      ${(p.tasks || []).length === 0 ? `
        <div style="padding:18px;text-align:center;color:var(--muted);font-size:13px">No tasks yet · tap "+ Add" to get started</div>
      ` : (p.tasks || []).map(t => `
        <div style="display:flex;align-items:center;gap:10px;padding:11px 14px;border-bottom:1px solid var(--hairline-soft)">
          <div onclick="_projectsToggleTask('${p.id}','${t.id}')" style="width:20px;height:20px;border-radius:50%;border:1.5px solid ${t.done ? 'var(--good)' : 'var(--muted-soft)'};background:${t.done ? 'var(--good)' : 'transparent'};color:#fff;flex-shrink:0;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:11px">${t.done ? '✓' : ''}</div>
          <div style="flex:1;font-size:13px;color:var(--ink);${t.done ? 'text-decoration:line-through;color:var(--muted)' : ''}">${escHtml(t.name)}</div>
          <button onclick="_projectsDeleteTask('${p.id}','${t.id}')" style="background:none;border:none;color:var(--muted-soft);font-size:14px;cursor:pointer;padding:4px">×</button>
        </div>`).join('')}
    </div>`;

  // Family goal toggle
  const goalCard = `
    <div style="margin:12px 16px 0;background:${isGoal ? 'var(--purple-soft)' : 'var(--paper)'};border:1px solid ${isGoal ? 'var(--purple)' : 'var(--hairline)'};border-radius:20px;padding:14px 16px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:${isGoal ? 'var(--purple)' : 'var(--ink)'}">⭐ Family goal</div>
          <div style="font-size:11px;color:var(--muted);margin-top:3px;line-height:1.4">${isGoal ? 'Kids contribute chore points towards this project. Set their target below.' : 'Make this the active project kids contribute their chore points to.'}</div>
        </div>
        <button onclick="_projectsToggleFamilyGoal('${p.id}')" style="background:${isGoal ? 'var(--purple)' : 'var(--paper-warm)'};color:${isGoal ? '#fff' : 'var(--ink)'};border:1px solid ${isGoal ? 'var(--purple)' : 'var(--hairline)'};border-radius:99px;padding:6px 12px;font-size:12px;font-weight:600;font-family:var(--sans);cursor:pointer">${isGoal ? 'Active' : 'Set as goal'}</button>
      </div>
      ${isGoal ? `
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--purple-soft)">
          <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink-soft)">
            <span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;flex-shrink:0">Kids' target</span>
            <input type="number" min="0" step="100" value="${p.goalKidPointsTarget || 0}" onchange="_projectsSetGoalTarget('${p.id}', this.value)" style="border:1px solid var(--hairline);border-radius:8px;padding:5px 8px;width:80px;font-size:12px;font-family:var(--mono);background:var(--paper)">
            <span style="font-size:11px;color:var(--muted)">points</span>
          </label>
        </div>` : ''}
    </div>`;

  const notes = (p.notes && p.notes.trim()) ? `
    <div style="margin:12px 16px 0;background:var(--paper);border:1px solid var(--hairline);border-radius:20px;padding:14px 16px">
      <div style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Notes</div>
      <div style="font-size:13px;color:var(--ink-soft);line-height:1.5;white-space:pre-wrap">${escHtml(p.notes)}</div>
    </div>` : '';

  const danger = `
    <div style="margin:18px 16px 0;display:flex;justify-content:center">
      <button onclick="_projectsDelete('${p.id}')" style="background:none;border:none;color:var(--ember);font-size:12px;font-weight:600;font-family:var(--sans);cursor:pointer;padding:8px">Delete project</button>
    </div>`;

  return back + hero + budget + membersBlock + goalCard + tasks + notes + danger + `<div style="height:24px"></div>`;
}

// ── Actions / handlers ───────────────────────────────────
export function _projectsOpenNew() {
  _projectsView = 'new';
  _newProjectTemplate = null;
  renderProjects();
}

export function _projectsBackToList() {
  _projectsView = 'list';
  _activeProjectId = null;
  _newProjectTemplate = null;
  renderProjects();
}

export function _projectsOpenDetail(id) {
  _projectsView = 'detail';
  _activeProjectId = id;
  renderProjects();
}

export function _projectsPickTemplate(key) {
  _newProjectTemplate = key;
  renderProjects();
}

export function _projectsSaveNew(templateKey) {
  const tpl = PROJECT_TEMPLATES[templateKey];
  if (!tpl) return;
  const name = (document.getElementById('proj-name')?.value || '').trim();
  if (!name) {
    document.getElementById('proj-name')?.focus();
    return;
  }
  const startDate = document.getElementById('proj-start')?.value || '';
  const endDate   = document.getElementById('proj-end')?.value || '';
  const budget    = parseFloat(document.getElementById('proj-budget')?.value) || 0;
  const location  = (document.getElementById('proj-location')?.value || '').trim();
  const notes     = (document.getElementById('proj-notes')?.value || '').trim();
  const memberInputs = document.querySelectorAll('input[name="proj-member"]:checked');
  const members = Array.from(memberInputs).map(i => i.value);

  _ensureProjectsState();
  const project = {
    id: 'proj-' + nextId(state.projects || []),
    name,
    emoji: tpl.emoji,
    template: templateKey,
    status: 'planning',
    members,
    isFamilyGoal: false,
    goalKidPointsTarget: 0,
    startDate,
    endDate,
    budget,
    location,
    notes,
    spentManual: 0,
    tasks: tpl.defaultTasks.map(t => ({
      id: 't-' + Date.now().toString(36) + Math.random().toString(36).slice(2),
      name: t.name,
      done: false,
      dueDate: '',
    })),
    bookings: [],
    quotes: [],
    stages: [],
    createdAt: new Date().toISOString(),
  };
  state.projects.push(project);
  window.saveData(state);

  _activeProjectId = project.id;
  _projectsView = 'detail';
  _newProjectTemplate = null;
  renderProjects();
}

export function _projectsDelete(id) {
  if (!confirm('Delete this project? This cannot be undone.')) return;
  _ensureProjectsState();
  state.projects = state.projects.filter(p => p.id !== id);
  if (state.activeFamilyGoalProjectId === id) state.activeFamilyGoalProjectId = null;
  window.saveData(state);
  _projectsBackToList();
}

export function _projectsSetStatus(id, status) {
  const p = _findProject(id);
  if (!p) return;
  p.status = status;
  window.saveData(state);
  renderProjects();
}

export function _projectsToggleFamilyGoal(id) {
  _ensureProjectsState();
  state.activeFamilyGoalProjectId = state.activeFamilyGoalProjectId === id ? null : id;
  window.saveData(state);
  renderProjects();
}

export function _projectsSetGoalTarget(id, val) {
  const p = _findProject(id);
  if (!p) return;
  p.goalKidPointsTarget = Math.max(0, parseInt(val, 10) || 0);
  window.saveData(state);
}

export function _projectsToggleTask(projId, taskId) {
  const p = _findProject(projId);
  if (!p) return;
  const t = (p.tasks || []).find(x => x.id === taskId);
  if (!t) return;
  t.done = !t.done;
  if (t.done) t.completedAt = new Date().toISOString(); else delete t.completedAt;
  window.saveData(state);
  renderProjects();
}

export function _projectsAddTask(projId) {
  const p = _findProject(projId);
  if (!p) return;
  const name = (window.prompt('Task name:', '') || '').trim();
  if (!name) return;
  if (!p.tasks) p.tasks = [];
  p.tasks.push({ id: 't-' + Date.now().toString(36) + Math.random().toString(36).slice(2), name, done: false, dueDate: '' });
  window.saveData(state);
  renderProjects();
}

export function _projectsDeleteTask(projId, taskId) {
  const p = _findProject(projId);
  if (!p) return;
  p.tasks = (p.tasks || []).filter(t => t.id !== taskId);
  window.saveData(state);
  renderProjects();
}

// ── AI on-ramp ────────────────────────────────────────────
const AI_SCHEMA_PROMPT = `You are Toto, a family planning assistant. The user has tapped "+ New project" and described what they want to plan. Extract a structured project draft.

Return ONLY a JSON object (no markdown, no commentary) with this exact shape:
{
  "name": "<short project name, max 40 chars>",
  "template": "holiday" | "reno" | "party" | "life-event" | "seasonal" | "custom",
  "startDate": "<YYYY-MM-DD or empty string>",
  "endDate": "<YYYY-MM-DD or empty string>",
  "budget": <number, 0 if not specified>,
  "location": "<location or empty string>",
  "notes": "<brief notes from the user's description, or empty string>",
  "tasks": ["<task 1>", "<task 2>", ...]
}

Pick the best-fitting template. Templates:
- "holiday" — trips, vacations, getaways
- "reno" — building, renovating, landscaping, major home work
- "party" — birthdays, parties, celebrations, single events
- "life-event" — new baby, moving house, getting a pet, big milestones
- "seasonal" — Christmas, Easter, school holidays, recurring annual events
- "custom" — anything else

Tasks: include 4-8 actionable starter tasks specific to the project. The user's description may include specific items to do — include those.

Dates: today's date is %TODAY%. Convert relative dates ("in October", "next month", "school holidays") to YYYY-MM-DD. Use Australian context. If the user mentions a duration ("two weeks"), set endDate accordingly. Leave dates as empty strings if not implied.

Budget: if the user says "$8K" or "around 8 grand", that's 8000. If they don't mention money, return 0.

Output ONLY the JSON. No prose, no \`\`\`json fences.`;

export async function _projectsAiSubmit() {
  const input = document.getElementById('proj-ai-input');
  const text = (input?.value || '').trim();
  if (!text) { input?.focus(); return; }

  const key = prefsGet('toto_ai_key');
  if (!key) {
    _aiError = 'Add your AI key in Settings first.';
    renderProjects();
    return;
  }

  _aiPrompt = text;
  _aiBusy = true;
  _aiError = '';
  renderProjects();

  const today = new Date().toISOString().slice(0, 10);
  const system = AI_SCHEMA_PROMPT.replace('%TODAY%', today);

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
        max_tokens: 800,
        system,
        messages: [{ role: 'user', content: text }],
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'API error');
    const reply = data.content?.[0]?.text || '';
    const json = _extractJson(reply);
    if (!json || !json.name || !json.template) throw new Error('Toto came back with an unexpected reply. Try again.');
    if (!PROJECT_TEMPLATES[json.template]) json.template = 'custom';

    _aiDraft = {
      name:       String(json.name || '').slice(0, 60),
      template:   json.template,
      startDate:  json.startDate || '',
      endDate:    json.endDate || '',
      budget:     Math.max(0, parseFloat(json.budget) || 0),
      location:   String(json.location || ''),
      notes:      String(json.notes || ''),
      tasks:      Array.isArray(json.tasks) ? json.tasks.filter(t => t && typeof t === 'string').slice(0, 12) : [],
    };
    _aiBusy = false;
    _projectsView = 'ai-draft';
    renderProjects();
  } catch (err) {
    _aiBusy = false;
    _aiError = err.message || 'Something went wrong. Try again.';
    renderProjects();
  }
}

function _extractJson(text) {
  if (!text) return null;
  // Try direct parse first
  try { return JSON.parse(text); } catch {}
  // Try fenced JSON
  const fenced = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
  if (fenced) { try { return JSON.parse(fenced[1]); } catch {} }
  // Try first {...} block
  const braced = text.match(/\{[\s\S]*\}/);
  if (braced) { try { return JSON.parse(braced[0]); } catch {} }
  return null;
}

function _renderAiDraft() {
  const d = _aiDraft;
  if (!d) { _projectsView = 'new'; return _renderNewProjectFlow(); }
  const tpl = PROJECT_TEMPLATES[d.template] || PROJECT_TEMPLATES.custom;
  const dateLine = d.startDate
    ? (d.endDate ? `${fmtDate(d.startDate)} – ${fmtDate(d.endDate)}` : `From ${fmtDate(d.startDate)}`)
    : '';

  const back = `<div style="padding:14px 20px 6px"><button onclick="_projectsAiBack()" style="background:none;border:none;color:var(--muted);font-size:13px;font-family:var(--sans);cursor:pointer;padding:0">← Tweak it</button></div>`;

  const userBubble = `
    <div style="margin:0 20px 0;background:var(--paper);border:1px solid var(--hairline);border-radius:18px 18px 18px 4px;padding:12px 14px;font-size:13px;line-height:1.45;color:var(--ink-soft)">
      <div style="font-family:var(--mono);font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:5px">YOU SAID</div>
      ${escHtml(_aiPrompt)}
    </div>`;

  const totoMsg = `
    <div style="margin:8px 20px 0;display:flex;gap:10px;align-items:flex-start">
      <div style="width:32px;height:32px;border-radius:50%;background:var(--ink);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🐕</div>
      <div style="flex:1;background:var(--ink);color:#fff;border-radius:4px 18px 18px 18px;padding:12px 14px;font-size:13px;line-height:1.4">Sounds like a <strong style="color:var(--lime);font-weight:600">${tpl.label.toLowerCase()}</strong>! Here's a draft — confirm or tweak.</div>
    </div>`;

  const draftCard = `
    <div style="margin:12px 16px 0;background:var(--paper);border:1.5px solid var(--purple);border-radius:24px;padding:18px;box-shadow:0 8px 24px -4px rgba(91,76,245,0.18)">
      <div style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--purple);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px">⬩ Draft project</div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <span style="font-size:34px">${tpl.emoji}</span>
        <div style="font-size:22px;font-weight:700;letter-spacing:-0.5px;color:var(--ink)">${escHtml(d.name)}</div>
      </div>
      <span style="display:inline-block;background:var(--purple-soft);color:var(--purple);font-family:var(--mono);font-size:10px;font-weight:600;padding:3px 8px;border-radius:6px;letter-spacing:0.3px;text-transform:uppercase;margin-bottom:14px">${tpl.emoji} ${tpl.label} template</span>

      ${dateLine ? `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--hairline-soft)"><span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;min-width:64px">Dates</span><span style="font-size:13px;color:var(--ink);flex:1">${dateLine}</span></div>` : ''}
      ${d.budget > 0 ? `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--hairline-soft)"><span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;min-width:64px">Budget</span><span style="font-size:13px;color:var(--ink);flex:1">${aud(d.budget)}</span></div>` : ''}
      ${d.location ? `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--hairline-soft)"><span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;min-width:64px">Location</span><span style="font-size:13px;color:var(--ink);flex:1">${escHtml(d.location)}</span></div>` : ''}
      ${d.notes ? `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-top:1px solid var(--hairline-soft)"><span style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;min-width:64px;padding-top:1px">Notes</span><span style="font-size:13px;color:var(--ink-soft);flex:1;line-height:1.4;white-space:pre-wrap">${escHtml(d.notes)}</span></div>` : ''}

      ${d.tasks.length > 0 ? `
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--hairline-soft)">
          <div style="font-family:var(--mono);font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Auto-added · ${d.tasks.length} tasks</div>
          ${d.tasks.map(t => `<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink-soft);padding:5px 0">○ ${escHtml(t)}</div>`).join('')}
        </div>` : ''}
    </div>`;

  const actions = `
    <div style="display:flex;gap:8px;margin:14px 16px 0">
      <button onclick="_projectsAiBack()" style="flex:1;background:var(--paper);color:var(--ink);border:1px solid var(--hairline);border-radius:14px;padding:14px;font-size:13px;font-weight:600;font-family:var(--sans);cursor:pointer">Tweak it</button>
      <button onclick="_projectsAiConfirm()" style="flex:1;background:linear-gradient(135deg,var(--iris-2),var(--purple));color:#fff;border:none;border-radius:14px;padding:14px;font-size:13px;font-weight:600;font-family:var(--sans);cursor:pointer;box-shadow:0 8px 24px -4px rgba(91,76,245,0.30)">Looks good →</button>
    </div>
    <div style="height:24px"></div>`;

  return back + userBubble + totoMsg + draftCard + actions;
}

export function _projectsAiBack() {
  _aiDraft = null;
  _aiError = '';
  _projectsView = 'new';
  _newProjectTemplate = null;
  renderProjects();
}

export function _projectsAiConfirm() {
  const d = _aiDraft;
  if (!d) return;
  _ensureProjectsState();
  const tpl = PROJECT_TEMPLATES[d.template] || PROJECT_TEMPLATES.custom;
  const project = {
    id: 'proj-' + nextId(state.projects || []),
    name: d.name,
    emoji: tpl.emoji,
    template: d.template,
    status: 'planning',
    members: [],
    isFamilyGoal: false,
    goalKidPointsTarget: 0,
    startDate: d.startDate || '',
    endDate: d.endDate || '',
    budget: d.budget || 0,
    location: d.location || '',
    notes: d.notes || '',
    spentManual: 0,
    tasks: d.tasks.map(name => ({ id: 't-' + Date.now().toString(36) + Math.random().toString(36).slice(2), name, done: false, dueDate: '' })),
    bookings: [],
    quotes: [],
    stages: [],
    createdAt: new Date().toISOString(),
  };
  state.projects.push(project);
  window.saveData(state);

  _aiDraft = null;
  _aiPrompt = '';
  _activeProjectId = project.id;
  _projectsView = 'detail';
  renderProjects();
}

// Expose handlers for legacy onclick attributes
window._projectsOpenNew = _projectsOpenNew;
window._projectsBackToList = _projectsBackToList;
window._projectsOpenDetail = _projectsOpenDetail;
window._projectsPickTemplate = _projectsPickTemplate;
window._projectsSaveNew = _projectsSaveNew;
window._projectsDelete = _projectsDelete;
window._projectsSetStatus = _projectsSetStatus;
window._projectsToggleFamilyGoal = _projectsToggleFamilyGoal;
window._projectsSetGoalTarget = _projectsSetGoalTarget;
window._projectsToggleTask = _projectsToggleTask;
window._projectsAddTask = _projectsAddTask;
window._projectsDeleteTask = _projectsDeleteTask;
window._projectsAiSubmit = _projectsAiSubmit;
window._projectsAiBack = _projectsAiBack;
window._projectsAiConfirm = _projectsAiConfirm;

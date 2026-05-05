// Settings section
import { state } from '../store.js';
import { escHtml, escAttr, aud } from './format.js';

export function renderSettings() {
  function safeId(s) { return s.replace(/[^a-z0-9]/gi, '_'); }
  function swatch(type, key, label, color) {
    const sid = `${type}_${safeId(key)}`;
    return `
      <div class="color-row">
        <div class="color-dot" id="dot-${sid}" style="background:${color}"></div>
        <span>${label}</span>
        <input type="color" value="${color}"
          oninput="document.getElementById('dot-${sid}').style.background=this.value"
          onchange="updateColor('${type}','${key}',this.value)">
      </div>`;
  }

  const rawData = localStorage.getItem(STORAGE_KEY);
  const dataSize = rawData ? (rawData.length / 1024).toFixed(1) : 0;
  const dataStatus = rawData
    ? `<span style="color:var(--success);font-weight:600">✓ Data found in localStorage (${dataSize} KB)</span>`
    : `<span style="color:var(--danger);font-weight:600">⚠ No data in localStorage</span>`;

  const log = state.activityLog || [];

  function fmtLogTime(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })
      + ' ' + d.toLocaleTimeString('en-AU', { hour:'2-digit', minute:'2-digit' });
  }

  function avatarHtml(entry) {
    if (entry.photo) return `<img src="${entry.photo}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0" onerror="this.style.display='none'">`;
    const initial = (entry.name || '?')[0].toUpperCase();
    return `<div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${initial}</div>`;
  }

  const actionColors = {
    'Added':   '#10b981',
    'Edited':  '#3b82f6',
    'Deleted': '#ef4444',
    'Updated': '#f59e0b',
    'Imported':'#8b5cf6',
    'Removed': '#ef4444',
  };

  function actionBadgeColor(action) {
    const word = action.split(' ')[0];
    return actionColors[word] || '#94a3b8';
  }

  function acc(key, title, subtitle, bodyHtml, headerExtra) {
    const isOpen = _settingsOpen.has(key);
    return `
      <div class="sacc-item">
        <div class="sacc-hdr" onclick="toggleSettingsSection('${key}')">
          <div style="flex:1;min-width:0">
            <div class="sacc-title">${title}</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
            ${headerExtra || ''}
            <span class="sacc-chev" id="sacc-chev-${key}">${isOpen ? '▲' : '▼'}</span>
          </div>
        </div>
        <div class="sacc-body" id="sacc-body-${key}" style="display:${isOpen ? 'block' : 'none'}">
          ${subtitle ? `<div style="padding:12px 20px 0;font-size:12px;color:var(--text-muted)">${subtitle}</div>` : ''}
          ${bodyHtml}
        </div>
      </div>`;
  }

  const petIcons = { dog:'🐕', cat:'🐈', bird:'🐦' };

  // ── 2028: profile hero on top of accordion settings ──
  const settingsDateLine = new Date().toLocaleDateString('en-AU', { weekday:'long', month:'long', day:'numeric' });
  const adultName = (state.settings?.adultName) || (state.settings?.adults?.[0]?.name) || 'You';
  const adultEmail = (state.settings?.email) || '';
  const profileInitial = adultName.charAt(0).toUpperCase();
  const scrHeader = `
    <div class="settings-profile" style="margin:0 0 8px">
      <div class="profile-avatar-lg">${profileInitial}</div>
      <div style="flex:1;min-width:0">
        <div class="profile-name">${escHtml(adultName)}</div>
        ${adultEmail ? `<div class="profile-email">${escHtml(adultEmail)}</div>` : ''}
        <div style="margin-top:6px"><span class="t-chip work" style="font-size:10px">Admin</span></div>
      </div>
      <button onclick="fbAuth&&fbAuth.signOut().then(()=>location.reload())" style="background:none;border:none;cursor:pointer;color:var(--muted);font-size:12px;font-weight:600;padding:0;white-space:nowrap">Sign out</button>
    </div>
    <div class="toto-sec-header" style="margin-top:6px"><span class="toto-sec-title">Settings</span></div>`;

  let html = scrHeader +
    acc('ai', '🤖 AI Assistant (Toto)', 'Powers cost estimation, Toto chat, and CSV import analysis', `
      <div class="section-body">
        <div style="margin-bottom:8px;font-size:13px;font-weight:600">Anthropic API Key</div>
        <div style="display:flex;gap:8px;align-items:center;max-width:480px">
          <input type="password" class="form-input" id="settings-api-key" style="flex:1"
            placeholder="sk-ant-api03-..."
            value="${localStorage.getItem('toto_ai_key')||''}">
          <button class="btn btn-primary" onclick="saveApiKey()">Save</button>
        </div>
        <p id="api-key-status" style="font-size:12px;color:var(--text-muted);margin-top:6px"></p>
        ${_renderApiKeySummary()}
      </div>`) +

    acc('prefs', 'Budget Preferences', 'Controls how month-to-month budget data is managed', `
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" id="pref-autofill" ${(state.settings||{}).autoFillMonths ? 'checked' : ''}
            onchange="updateSetting('autoFillMonths', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Auto-fill new months from previous month</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">When you navigate forward to a month with no data, automatically copy all recurring items from the previous month.</p>
          </div>
        </label>
      </div>`) +

    acc('kids-prefs', '👧 Kids & Routines', 'Daily reset time for routines and chores', `
      <div class="section-body">
        <div style="margin-bottom:6px;font-size:13px;font-weight:600">Routine reset time</div>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Completed tasks reset each day at this time. Default is midnight (12:00 am).</p>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          ${[0,4,5,6].map(h => {
            const label = h === 0 ? 'Midnight' : h === 4 ? '4 am' : h === 5 ? '5 am' : '6 am';
            const sel   = (state.settings?.routineResetHour ?? 0) === h;
            return `<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;font-weight:${sel?'700':'500'};color:${sel?'var(--primary)':'var(--text)'}">
              <input type="radio" name="reset-hour" value="${h}" ${sel?'checked':''} style="accent-color:var(--primary)"
                onchange="state.settings.routineResetHour=${h};_markSettingsDirty();saveData(state);renderSettings()">
              ${label}
            </label>`;
          }).join('')}
        </div>
      </div>`) +

    acc('meals-prefs', 'Meal Preferences', 'Calorie tracking and meal display options', `
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(state.settings||{}).showCalories ? 'checked' : ''}
            onchange="updateSetting('showCalories', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Show calorie estimates on meals</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">AI estimates calories for each meal. Shows per-meal calories and daily totals in the meal planner and lunchbox grids.</p>
          </div>
        </label>
      </div>`) +

    acc('typea', 'Type A Mode', state.settings?.typeAMode ? 'Active — daily missions and life score' : 'Off — turn on for guided organisation', `
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(state.settings||{}).typeAMode ? 'checked' : ''}
            onchange="updateSetting('typeAMode', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Enable Type A Mode</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">Adds a Life Score, daily missions, and guided organisation to your Today screen. Toto takes the lead and tells you what to do next.</p>
          </div>
        </label>
        ${state.settings?.typeAMode ? `
        <div style="margin-top:16px;padding:14px;background:var(--surface2);border-radius:10px">
          <div style="font-size:13px;font-weight:700;margin-bottom:8px">Current Life Score</div>
          <div style="font-size:28px;font-weight:900;color:#0891b2">${calcLifeScore().total}%</div>
          ${state.settings?.typeAStreak > 0 ? `<div class="streak-badge" style="margin-top:8px">🔥 ${state.settings.typeAStreak} week streak</div>` : ''}
        </div>` : ''}
      </div>`) +

    acc('notif', 'Notification Style', 'Choose how Toto shows alerts on the Today screen', `
      <div class="section-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px">
          ${[
            { val:'focus-timeline', label:'Focus + Timeline', desc:'One big card + chronological feed' },
            { val:'focus', label:'Focus Card', desc:'One urgent item at a time' },
            { val:'stack', label:'Stack', desc:'Card deck with count badge' },
            { val:'timeline', label:'Timeline Only', desc:'Chronological feed grouped by urgency' },
            { val:'banners', label:'Banners', desc:'Subtle alerts at the top' },
          ].map(o => `<label style="display:block;cursor:pointer;border:2px solid ${(state.settings?.notifStyle||'focus-timeline')===o.val?'#0891b2':'var(--border)'};border-radius:12px;padding:14px;background:${(state.settings?.notifStyle||'focus-timeline')===o.val?'#ecfeff':'var(--surface)'}">
            <input type="radio" name="notif-style" value="${o.val}" ${(state.settings?.notifStyle||'focus-timeline')===o.val?'checked':''} onchange="state.settings.notifStyle=this.value;_markSettingsDirty();renderSettings();renderToday()" style="display:none">
            <div style="font-size:13px;font-weight:700;margin-bottom:2px">${o.label}</div>
            <div style="font-size:11px;color:var(--text-muted)">${o.desc}</div>
          </label>`).join('')}
        </div>
      </div>`) +

    acc('log', 'Activity Log', `${log.length} recorded action${log.length !== 1 ? 's' : ''} — synced across all devices`, `
      ${log.length === 0
        ? `<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No activity recorded yet. Changes you and your family make will appear here.</div>`
        : `<div style="max-height:400px;overflow-y:auto">
            ${log.slice(0, 100).map(entry => `
              <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border)">
                ${avatarHtml(entry)}
                <div style="flex:1;min-width:0">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px">
                    <span style="font-weight:600;font-size:13px">${escHtml(entry.name)}</span>
                    <span style="display:inline-block;padding:2px 10px;border-radius:99px;font-size:11px;font-weight:600;color:#fff;background:${actionBadgeColor(entry.action)}">${escHtml(entry.action)}</span>
                    ${entry.detail ? `<span style="font-size:13px;color:var(--text)">${escHtml(entry.detail)}</span>` : ''}
                  </div>
                  <div style="font-size:11px;color:var(--text-muted)">${fmtLogTime(entry.ts)}</div>
                </div>
              </div>`).join('')}
          </div>`}`,
      log.length > 0 ? `<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();clearActivityLog()" style="color:var(--danger)">Clear log</button>` : '') +

    acc('data', 'Data &amp; Recovery', dataStatus, `
      <div class="section-body">
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
          <button class="btn btn-secondary btn-sm" onclick="exportData()">Export JSON backup</button>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('import-file').click()">Import JSON backup</button>
          <input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)">
        </div>
        ${rawData ? `<button class="btn btn-ghost btn-sm" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display?'':'none'">Show raw localStorage data</button>
          <pre style="display:none;margin-top:8px;background:var(--surface2);padding:12px;border-radius:8px;font-size:11px;overflow:auto;max-height:200px;white-space:pre-wrap;word-break:break-all">${rawData.replace(/</g,'&lt;')}</pre>` : ''}
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
          <div style="font-size:13px;font-weight:600;color:var(--danger);margin-bottom:4px">Danger zone</div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Permanently deletes all household data from this device and the cloud. Cannot be undone.</div>
          <button class="btn btn-sm" style="background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;font-weight:600" onclick="resetAllData()">Reset all data…</button>
        </div>
      </div>`) +

    (() => {
      const _members     = state.householdProfile.members || [];
      const _invites     = state.householdProfile.invites || [];
      const _authedUsers = state.householdProfile.authorizedUsers || [];
      const _petIcons    = petIcons;

      const memberCards = _members.map((m, i) => {
        const isAdult = m.role === 'adult';
        const isOwner = isAdult && i === 0;
        const avatar  = m.emoji || (isAdult ? '🧑' : '🧒');
        const label   = isOwner ? 'Owner' : isAdult ? 'Adult' : 'Child';
        const labelBg = isOwner ? '#fef9c3' : isAdult ? '#e0f2fe' : '#f0fdf4';
        const labelCol= isOwner ? '#854d0e' : isAdult ? '#0369a1' : '#16a34a';

        // ── Access status for this member ──
        let accessHtml = '';
        if (isAdult) {
          const adultIndex = _members.slice(0, i).filter(x => x.role === 'adult').length;
          const hasAdultPin = !!m.pinHash;
          const adultPinHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;margin-top:8px;background:${hasAdultPin?'#f0fdf4':'var(--surface2)'};border-radius:8px;border:1px solid ${hasAdultPin?'#bbf7d0':'var(--border)'}">
            <span style="font-size:16px">🔢</span>
            <div style="flex:1">
              <div style="font-size:12px;font-weight:600;color:${hasAdultPin?'#16a34a':'var(--text)'}">Shared device PIN · ${hasAdultPin ? 'Set ✓' : 'Not set'}</div>
              <div style="font-size:11px;color:var(--text-muted)">${hasAdultPin ? 'Required when signing in on a shared device' : 'Optional — protects your profile on shared devices'}</div>
            </div>
            <button onclick="event.stopPropagation();setAdultPin(${adultIndex})" style="padding:6px 10px;border:1px solid ${hasAdultPin?'#bbf7d0':'var(--border)'};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${hasAdultPin ? 'Change' : 'Set PIN'}</button>
            ${hasAdultPin ? `<button onclick="event.stopPropagation();clearAdultPin(${adultIndex})" style="padding:6px 10px;border:1px solid #fecaca;border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:#b91c1c;cursor:pointer">Remove</button>` : ''}
          </div>`;

          if (isOwner) {
            accessHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
              <span style="font-size:16px">✅</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:#16a34a">Google login · Owner</div>
                <div style="font-size:11px;color:#64748b">Full access · Set up this household</div>
              </div>
            </div>` + adultPinHtml;
          } else {
            // Check if this adult has joined via invite
            const joined = _authedUsers.find(u => u.name && m.name && u.name.toLowerCase().includes(m.name.toLowerCase().split(' ')[0]));
            // Check for a pending invite for this member
            const pending = _invites.find(inv => inv.memberName === m.name && inv.status === 'pending' && new Date(inv.expiresAt) > new Date());
            const accepted = _invites.find(inv => inv.memberName === m.name && inv.status === 'accepted');

            if (joined || accepted) {
              accessHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
                <span style="font-size:16px">✅</span>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:#16a34a">Google login · Member</div>
                  <div style="font-size:11px;color:#64748b">${escHtml((joined||{}).email || 'Joined via invite')}</div>
                </div>
              </div>` + adultPinHtml;
            } else if (pending) {
              const expiry = new Date(pending.expiresAt).toLocaleDateString();
              accessHtml = `<div style="padding:10px 12px;background:#fef9c3;border-radius:8px;border:1px solid #fde68a">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:16px">⏳</span>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:#854d0e">Invite pending</div>
                    <div style="font-size:11px;color:#78350f">Expires ${expiry}${pending.email ? ' · ' + escHtml(pending.email) : ''}</div>
                  </div>
                </div>
                <div style="display:flex;gap:6px">
                  <button onclick="event.stopPropagation();_copyInviteLinkForMember('${pending.id}')" style="flex:1;padding:6px;border:1px solid #fde68a;border-radius:6px;background:#fff;font-size:11px;font-weight:600;color:#854d0e;cursor:pointer">📋 Copy link</button>
                  <button onclick="event.stopPropagation();revokeInvite('${pending.id}')" style="padding:6px 10px;border:1px solid #fecaca;border-radius:6px;background:#fff;font-size:11px;font-weight:600;color:#ef4444;cursor:pointer">Revoke</button>
                </div>
              </div>` + adultPinHtml;
            } else {
              accessHtml = `<div style="padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:16px">🔗</span>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:var(--text)">No app access yet</div>
                    <div style="font-size:11px;color:var(--text-muted)">Send an invite link so ${escHtml(m.name || 'this person')} can join</div>
                  </div>
                </div>
                <button onclick="event.stopPropagation();inviteMember(${i})" class="btn btn-primary btn-sm" style="width:100%">Invite to join →</button>
              </div>` + adultPinHtml;
            }
          }
        } else {
          // Child — PIN access
          const kidProfile = (state.kids?.profiles || []).find(k => k.name && m.name && k.name.toLowerCase() === m.name.toLowerCase());
          const hasPin  = !!(kidProfile?.pinHash);
          const hasName = !!(m.name && m.name.trim());

          const isHardLocked = kidProfile && _isPinHardLocked ? _isPinHardLocked(kidProfile.id) : false;

          if (isHardLocked) {
            accessHtml = `<div style="padding:10px 12px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:16px">🔒</span>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:#b91c1c">PIN locked</div>
                  <div style="font-size:11px;color:#64748b">Too many failed attempts</div>
                </div>
              </div>
              <button onclick="event.stopPropagation();resetKidPinLock(${kidProfile.id})" style="width:100%;padding:7px;border:1px solid #fecaca;border-radius:6px;background:#fff;font-size:12px;font-weight:600;color:#b91c1c;cursor:pointer">Reset PIN lock</button>
            </div>`;
          } else if (!hasName) {
            accessHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="font-size:12px;color:var(--text-muted)">Enter a name above to enable PIN login</div>
            </div>`;
          } else if (!kidProfile) {
            accessHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:var(--text)">PIN login · Not set up</div>
                <div style="font-size:11px;color:var(--text-muted)">Save changes first, then set a PIN for ${escHtml(m.name)}</div>
              </div>
              <button onclick="event.stopPropagation();_ensureKidProfileAndPin('${escAttr(m.name)}')" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">Set PIN</button>
            </div>`;
          } else {
            accessHtml = `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:${hasPin?'#f0fdf4':'var(--surface2)'};border-radius:8px;border:1px solid ${hasPin?'#bbf7d0':'var(--border)'}">
              <span style="font-size:16px">🔢</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:${hasPin?'#16a34a':'var(--text)'}">PIN login · ${hasPin ? 'Set up ✓' : 'Not set up'}</div>
                <div style="font-size:11px;color:var(--text-muted)">${hasPin ? 'PIN is active — tap to change it' : 'Set a PIN so ' + escHtml(m.name) + ' can log in'}</div>
              </div>
              <button onclick="event.stopPropagation();openPinSetup(${kidProfile.id})" style="padding:6px 10px;border:1px solid ${hasPin?'#bbf7d0':'var(--border)'};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${hasPin ? 'Change' : 'Set PIN'}</button>
            </div>`;
          }
        }

        return `
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)">
          <div style="display:flex;align-items:center;gap:12px;padding:14px 16px">
            <div style="width:42px;height:42px;border-radius:50%;background:${isAdult?'linear-gradient(135deg,#ecfeff,#ccfbf1)':'linear-gradient(135deg,#fef9c3,#fde68a)'};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${avatar}</div>
            <div style="flex:1;min-width:0">
              <input type="text" maxlength="50" class="form-input" style="font-weight:600;font-size:14px;width:100%;color:var(--text);padding:4px 8px;border-radius:6px"
                placeholder="Enter name…"
                value="${escAttr(m.name || '')}"
                onchange="updateMember(${i},'name',this.value)">
              <div style="display:flex;align-items:center;gap:6px;margin-top:6px">
                <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:2px 7px;border-radius:99px;background:${labelBg};color:${labelCol};flex-shrink:0">${label}</span>
                <span style="font-size:12px;color:var(--text-muted);flex-shrink:0">·</span>
                <input type="number" class="form-input" style="width:52px;font-size:12px;padding:2px 6px;border-radius:6px"
                  placeholder="Age" min="0" max="120"
                  value="${m.age !== null && m.age !== undefined ? m.age : ''}"
                  onchange="updateMember(${i},'age',this.value===''?null:parseInt(this.value))">
                <span style="font-size:12px;color:var(--text-muted);flex-shrink:0">yrs</span>
              </div>
            </div>
            <button onclick="removeHouseholdMember(${i})" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:18px;line-height:1;padding:4px;opacity:.6;flex-shrink:0" title="Remove from household">&times;</button>
          </div>
          <div style="padding:0 16px 14px">${accessHtml}</div>
        </div>`;
      }).join('');

      const petsHtml = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <span style="font-weight:600;font-size:13px">Pets</span>
          <div style="display:flex;gap:6px">
            <button class="btn btn-ghost btn-sm" onclick="addPet('dog')">+ Dog</button>
            <button class="btn btn-ghost btn-sm" onclick="addPet('cat')">+ Cat</button>
            <button class="btn btn-ghost btn-sm" onclick="addPet('other')">+ Other</button>
          </div>
        </div>
        ${(state.householdProfile.pets||[]).length === 0 ? `<p style="color:var(--text-muted);font-size:13px">No pets added.</p>` : ''}
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
          ${(state.householdProfile.pets||[]).map((p,i) => {
            const petIcon = _petIcons[p.type] || '🐾';
            return `<div style="display:flex;align-items:center;gap:12px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 14px">
              <span style="font-size:20px;width:28px;text-align:center">${petIcon}</span>
              <select class="form-select" style="width:110px" onchange="updatePet(${i},'type',this.value);renderSettings()">
                <option value="dog"${p.type==='dog'?' selected':''}>Dog</option>
                <option value="cat"${p.type==='cat'?' selected':''}>Cat</option>
                <option value="bird"${p.type==='bird'?' selected':''}>Bird</option>
                <option value="other"${p.type==='other'?' selected':''}>Other</option>
              </select>
              <input type="text" maxlength="200" class="form-input" style="flex:1;min-width:120px" placeholder="Name (optional)"
                value="${(p.name||'').replace(/"/g,'&quot;')}"
                oninput="updatePet(${i},'name',this.value)">
              <button onclick="removePet(${i})" style="background:none;border:none;cursor:pointer;color:var(--danger);font-size:20px;line-height:1;padding:0 4px;opacity:0.7" title="Remove">&times;</button>
            </div>`;
          }).join('')}
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:20px">🚗</span>
          <input type="number" class="form-input" style="width:90px" min="0" max="20"
            value="${state.householdProfile.cars||0}" onchange="updateCars(parseInt(this.value)||0)">
          <span style="color:var(--text-muted);font-size:13px">vehicle(s) registered to this household</span>
        </div>`;

      return acc('household', '🏠 Household', 'People, pets, and access for everyone in your home', `
        <div class="section-body">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <span style="font-weight:600;font-size:13px">Members</span>
            <div style="display:flex;gap:6px">
              <button class="btn btn-ghost btn-sm" onclick="addHouseholdMember('adult')">+ Adult</button>
              <button class="btn btn-ghost btn-sm" onclick="addHouseholdMember('child')">+ Child</button>
            </div>
          </div>
          ${_members.length === 0 ? `<p style="color:var(--text-muted);font-size:13px;margin-bottom:16px">No members yet.</p>` : ''}
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
            ${memberCards}
          </div>
          <div style="border-top:1px solid var(--border);padding-top:20px;margin-top:4px">
            ${petsHtml}
          </div>
        </div>`);
    })() +

    acc('cats', 'Expense &amp; Income Categories', 'Manage categories available in dropdowns', `
      <div class="section-body">
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Expense Categories</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
          ${expenseCategories().map(cat => `
            <span style="display:inline-flex;align-items:center;gap:6px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:5px 10px 5px 12px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:${colors.expense[cat] || '#94a3b8'};flex-shrink:0"></span>
              ${cat}
              <button onclick="removeCategory('expense','${cat.replace(/'/g,"\\'")}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:16px;line-height:1;padding:0 2px" title="Remove">&times;</button>
            </span>`).join('')}
        </div>
        <div style="display:flex;gap:8px;max-width:420px;margin-bottom:24px">
          <input id="new-cat-expense" type="text" maxlength="200" class="form-input" placeholder="New expense category…" onkeydown="if(event.key==='Enter')addCategory('expense')" style="flex:1">
          <button class="btn btn-primary btn-sm" onclick="addCategory('expense')">Add</button>
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Income Categories</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
          ${incomeCategories().map(cat => `
            <span style="display:inline-flex;align-items:center;gap:6px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:5px 10px 5px 12px;font-size:13px">
              ${cat}
              <button onclick="removeCategory('income','${cat.replace(/'/g,"\\'")}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:16px;line-height:1;padding:0 2px" title="Remove">&times;</button>
            </span>`).join('')}
        </div>
        <div style="display:flex;gap:8px;max-width:420px">
          <input id="new-cat-income" type="text" maxlength="200" class="form-input" placeholder="New income category…" onkeydown="if(event.key==='Enter')addCategory('income')" style="flex:1">
          <button class="btn btn-primary btn-sm" onclick="addCategory('income')">Add</button>
        </div>
      </div>`) +

    acc('groups', 'Expense Category Groups', 'Group categories for the grouped budget view', `
      <div class="section-body">
        ${(state.categoryGroups||[]).map(g => `
          <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px 14px;margin-bottom:10px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <button id="grp-icon-btn-${g.id}" type="button" onclick="openIconPickerForGroup(${g.id})" style="width:52px;height:40px;font-size:22px;border:1px solid var(--border);border-radius:6px;background:var(--surface);cursor:pointer" title="Choose icon">${g.icon}</button>
              <input type="text" maxlength="200" class="form-input" style="flex:1;font-weight:600" value="${g.name.replace(/"/g,'&quot;')}"
                onchange="updateCategoryGroup(${g.id},'name',this.value)">
              <button class="btn btn-danger-ghost btn-sm" onclick="deleteCategoryGroup(${g.id})">Delete</button>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
              ${g.categories.map(cat => `
                <span style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:4px 10px 4px 12px;font-size:13px">
                  ${cat}
                  <button onclick="removeCatFromGroup(${g.id},'${cat.replace(/'/g,"\\'")}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:15px;line-height:1;padding:0 2px">&times;</button>
                </span>`).join('')}
              ${g.categories.length === 0 ? `<span style="font-size:13px;color:var(--text-muted);font-style:italic">No categories assigned</span>` : ''}
            </div>
            <button class="btn btn-ghost btn-sm" onclick="openAddCatToGroup(${g.id})" style="font-size:12px">+ Add Category</button>
          </div>`).join('')}
        ${(state.categoryGroups||[]).length === 0 ? `<p style="color:var(--text-muted);font-size:13px">No groups yet.</p>` : ''}
      </div>`,
      `<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openAddCategoryGroup()">+ Group</button>`) +

    acc('colours', 'Colours', 'Customise category and section colour accents', `
      <div class="section-body">
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Expense Category Colours</div>
        <div class="color-grid" style="margin-bottom:24px">
          ${expenseCategories().map(cat => swatch('expense', cat, cat, colors.expense[cat] || DEFAULT_COLORS.expense[cat] || '#94a3b8')).join('')}
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Income Colour</div>
        <div class="color-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,220px));margin-bottom:24px">
          ${swatch('income', 'income', 'Income', colors.income)}
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Build Cost Colours</div>
        <div class="color-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,220px))">
          ${swatch('build', 'contract',   'Fixed Price Contract',  colors.build.contract)}
          ${swatch('build', 'extras',     'Outside Contract',      colors.build.extras)}
          ${swatch('build', 'furniture',  'Furniture',             colors.build.furniture)}
          ${swatch('build', 'appliances', 'Appliances',            colors.build.appliances)}
        </div>
      </div>`) +
  '';

  // Setup checklist section
  html += acc('setup-checklist', '✅ Setup Checklist', 'The setup progress card shown on your dashboard',
    `<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Show on dashboard</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${state.setupProgressDismissed ? 'Currently hidden' : 'Currently visible'}</div>
        </div>
        <button onclick="event.stopPropagation();state.setupProgressDismissed=${!state.setupProgressDismissed};saveData(state);_refreshSetupProgress();renderSettings()" class="btn btn-secondary btn-sm">
          ${state.setupProgressDismissed ? 'Show again' : 'Hide'}
        </button>
      </div>
    </div>`);

  // Device profile section
  const device = getDeviceProfile();
  const deviceKids = state.kids?.profiles || [];
  const deviceLabel = !device ? 'Not configured'
    : device === 'adult' ? 'Adult — opens straight to the full app'
    : device === 'shared' ? 'Shared — shows profile picker on open'
    : (deviceKids.find(k => k.id === device)?.name || 'Unknown') + ' — kid device';

  html += acc('this-device', '📱 This Device', `Assigned to: ${deviceLabel}`,
    `<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Assigned to</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${escHtml(deviceLabel)}</div>
        </div>
        <button onclick="event.stopPropagation();showDeviceSetup()" class="btn btn-secondary btn-sm">Change</button>
      </div>
    </div>`);


  /* ── DEV TOOLS — remove before release ── */
  html += `<div style="margin-top:24px;padding:16px;border:2px dashed #f59e0b;border-radius:12px;background:#fffbeb">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#92400e;margin-bottom:12px">⚠️ Dev Tools — Remove before release</div>
    <button onclick="showProfileSelector()" class="btn btn-secondary" style="width:100%">🔄 Open profile switcher (shared device)</button>
  </div>`;

  html += `<div class="settings-save-bar" id="settings-save-bar" style="display:${_settingsDirty ? 'flex' : 'none'}">
    <div class="unsaved-dot"></div>
    <div class="unsaved-text">Unsaved changes</div>
    <button class="btn" onclick="cancelSettingsChanges()">Cancel</button>
    <button class="btn btn-primary" id="settings-save-btn" onclick="saveSettingsChanges()">Save</button>
  </div>`;

  document.getElementById('settings-content').innerHTML = html;
}

export function resetAllData() {
  if (!confirm('This will permanently delete ALL household data — budget, kids, goals, everything — from this device and the cloud.\n\nThis cannot be undone. Are you sure?')) return;
  if (!confirm('Last chance. All data will be gone. Continue?')) return;
  // Clear Firestore document
  if (_currentUser && fbStore) {
    const _resetDocRef = _getHouseholdDocRef();
    if (_resetDocRef) _resetDocRef.delete().catch(() => {});
  }
  // Clear local storage (both data and household pointer)
  localStorage.removeItem(STORAGE_KEY);
  _secureClear(HOUSEHOLD_OWNER_KEY);
  // Sign out and reload — will trigger fresh onboarding
  if (_fsUnsubscribe) { _fsUnsubscribe(); _fsUnsubscribe = null; }
  fbAuth.signOut().then(() => { window.location.reload(); });
}

export function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `home-budget-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function importData(evt) {
  const file = evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported.budget) { alert('Invalid backup file — missing budget data.'); return; }
      if (!confirm('This will replace ALL current data with the backup. Continue?')) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
      location.reload();
    } catch(err) { alert('Failed to read backup file: ' + err.message); }
  };
  reader.readAsText(file);
}

// ─── Category Groups ──────────────────────────────

export function toggleGroupExpand(id) {
  const content = document.getElementById(`grp-body-${id}`);
  const arrow   = document.getElementById(`grp-arrow-${id}`);
  if (!content) return;
  const open = content.style.display !== 'none';
  content.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▼' : '▲';
}

export function setBudgetView(mode) {
  budgetViewMode = mode;
  renderBudget();
}


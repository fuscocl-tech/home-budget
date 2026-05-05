// Toto AI Assistant section
import { state } from '../store.js';
import { escHtml } from './format.js';
import { prefsGet, prefsSet, prefsClear } from '../prefs.js';

export let _totoOpen = false;
export let _totoHistory = []; // { role, content }
export let _totoTyping = false;

export const TOTO_SUGGESTIONS = [
  { icon:'📅', text:'What should I plan for this month?' },
  { icon:'💸', text:'Any upcoming events I should budget for?' },
  { icon:'🎒', text:'Help me plan for school holidays' },
  { icon:'✈️', text:'I have a trip coming up — what do I need to organise?' },
];

export function toggleTotoAssistant() {
  _totoOpen ? closeTotoAssistant() : openTotoAssistant();
}

export function openTotoAssistant() {
  _totoOpen = true;
  document.getElementById('toto-panel').classList.add('open');
  if (_totoHistory.length === 0) _totoInitPanel();
}

export function closeTotoAssistant() {
  _totoOpen = false;
  document.getElementById('toto-panel').classList.remove('open');
}

export function _totoInitPanel() {
  // Build proactive suggestions based on context
  const todayStr = new Date().toISOString().slice(0,10);
  const in7 = new Date(); in7.setDate(in7.getDate()+7);
  const in7Str = in7.toISOString().slice(0,10);
  const events = state.planner?.events || [];
  const soonEvs = events.filter(e => e.date >= todayStr && e.date <= in7Str);

  const contextSuggestions = [];
  soonEvs.slice(0,2).forEach(ev => {
    const cat = PLANNER_CATS[ev.category] || PLANNER_CATS.other;
    const dateLabel = new Date(ev.date+'T12:00:00').toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'});
    if (cat.financial && (!ev.estimates || ev.estimates.length === 0)) {
      contextSuggestions.push({ icon: cat.emoji, text: `${escHtml(ev.title)} is ${dateLabel} — want me to estimate costs?` });
    } else if (ev.date === todayStr) {
      contextSuggestions.push({ icon: cat.emoji, text: `You have "${escHtml(ev.title)}" today — anything to prepare?` });
    }
  });

  const seasonalNudges = getSeasonalNudges().slice(0, 2).map(n => ({
    icon: n.emoji, text: `Help me plan for ${escHtml(n.title)} (${n.days <= 0 ? 'now!' : `in ${n.days} days`})`
  }));
  const allSuggestions = [...contextSuggestions, ...seasonalNudges, ...TOTO_SUGGESTIONS].slice(0, 4);
  const sugEl = document.getElementById('toto-suggestions');
  sugEl.innerHTML = allSuggestions.map(s =>
    `<button class="toto-suggestion" onclick="_totoSendSuggestion(this)">${s.icon} ${s.text}</button>`
  ).join('');

  // Greeting message
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const adults = (state.householdProfile?.members||[]).filter(m=>m.role==='adult').length || 2;
  const kids   = (state.householdProfile?.members||[]).filter(m=>m.role==='child').length || 0;
  const familyStr = kids > 0 ? ` and ${kids} kid${kids>1?'s':''}` : '';

  _totoAppendMessage('toto', `${greet}! 👋 I'm Toto, your family planning assistant. You have ${adults} adult${adults>1?'s':''}${familyStr} in your household.\n\nI can help you plan events, estimate costs, and make sure nothing slips through the cracks. What would you like to work on?`);
}

export function _totoSendSuggestion(btn) {
  const text = btn.textContent.trim();
  btn.closest('.toto-suggestions').style.display = 'none';
  _totoSend(text);
}

export async function sendTotoMessage() {
  const input = document.getElementById('toto-input');
  const text = input.value.trim();
  if (!text || _totoTyping) return;
  input.value = '';
  document.getElementById('toto-suggestions').style.display = 'none';
  _totoSend(text);
}

export async function _totoSend(text) {
  const key = prefsGet('toto_ai_key');
  if (!key) {
    _totoAppendMessage('toto', "To chat with me, you'll need to add your AI API key in Settings. It only takes a second! ⚙️");
    return;
  }

  _totoAppendMessage('user', text);
  _totoHistory.push({ role: 'user', content: text });

  _totoTyping = true;
  document.getElementById('toto-send').disabled = true;
  const typingId = _totoShowTyping();

  try {
    const system = _buildTotoContext();
    const res = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system,
        messages: _totoHistory
      })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Try again?";
    _totoHistory.push({ role: 'assistant', content: reply });
    _totoRemoveTyping(typingId);
    _totoAppendMessage('toto', reply);
  } catch(err) {
    _totoRemoveTyping(typingId);
    _totoAppendMessage('toto', "Oops, something went wrong. Check your internet connection and try again.");
  } finally {
    _totoTyping = false;
    document.getElementById('toto-send').disabled = false;
    document.getElementById('toto-input').focus();
  }
}

export function _buildTotoContext() {
  const todayStr = new Date().toISOString().slice(0,10);
  const todayFmt = new Date().toLocaleDateString('en-AU',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const adults = (state.householdProfile?.members||[]).filter(m=>m.role==='adult').length || 2;
  const kids   = (state.householdProfile?.members||[]).filter(m=>m.role==='child').length || 0;

  const in60 = new Date(); in60.setDate(in60.getDate()+60);
  const upcomingEvs = (state.planner?.events||[])
    .filter(e => e.date >= todayStr && e.date <= in60.toISOString().slice(0,10))
    .sort((a,b)=>a.date.localeCompare(b.date))
    .slice(0,15)
    .map(e => {
      const cat = PLANNER_CATS[e.category]||PLANNER_CATS.other;
      const d = new Date(e.date+'T12:00:00').toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'});
      const est = (e.estimates||[]).filter(x=>x.accepted).reduce((s,x)=>s+(x.amount||0),0);
      return `- ${d}: ${e.title} (${cat.label})${est>0?' — $'+est.toLocaleString('en-AU')+' budgeted':''}${e.notes?' — Notes: '+e.notes:''}`;
    }).join('\n') || 'None';

  const curData = getMonthData(selectedBudgetMonth);
  const income  = monthlyTotal(curData.income);
  const expenses = monthlyTotal(curData.expenses);
  const surplus = income - expenses;

  const goals = (state.goals||[]).filter(g=>g.status!=='achieved').slice(0,4)
    .map(g=>`${g.name} ($${(g.saved||0).toLocaleString()}/$${(g.target||0).toLocaleString()})`).join(', ') || 'None';

  return `You are Toto, a warm and practical AI assistant for a family finance and life planning app called Toto. You help Australian families plan their lives and stay on top of their money.

Today: ${todayFmt}
Family: ${adults} adult${adults>1?'s':''}${kids>0?`, ${kids} child${kids>1?'ren':''}`:''}
Monthly budget: Income $${income.toLocaleString('en-AU')}, Expenses $${expenses.toLocaleString('en-AU')}, ${surplus>=0?'Surplus':'Deficit'} $${Math.abs(surplus).toLocaleString('en-AU')}
Active goals: ${goals}

Upcoming events (next 60 days):
${upcomingEvs}

Personality: friendly, warm, concise. Use Australian spelling and context. You can:
- Help plan upcoming events and what to organise
- Suggest realistic cost estimates for activities
- Spot things they might have forgotten (school holidays, gift buying, etc.)
- Give practical financial advice around upcoming events
- Keep responses to 3-5 sentences unless a list is genuinely helpful`;
}

export function _totoAppendMessage(role, text) {
  const el = document.getElementById('toto-messages');
  const div = document.createElement('div');
  div.className = `toto-msg ${role}`;
  const formattedText = text.replace(/\n/g, '<br>');
  if (role === 'toto') {
    div.innerHTML = `<div class="toto-msg-avatar">🐕</div><div class="toto-msg-bubble">${formattedText}</div>`;
  } else {
    div.innerHTML = `<div class="toto-msg-bubble">${formattedText}</div>`;
  }
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
}

export function _totoShowTyping() {
  const el = document.getElementById('toto-messages');
  const id = 'toto-typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'toto-msg toto';
  div.id = id;
  div.innerHTML = `<div class="toto-msg-avatar">🐕</div><div class="toto-msg-bubble"><div class="toto-typing"><span></span><span></span><span></span></div></div>`;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
  return id;
}

export function _totoRemoveTyping(id) {
  document.getElementById(id)?.remove();
}

// ─── Service Worker ───────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/home-budget/sw.js', { scope: '/home-budget/' })
    .catch(err => console.warn('SW registration failed:', err));
}

// Init — rendering is triggered by Firestore onSnapshot after auth resolves

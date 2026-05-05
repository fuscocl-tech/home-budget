# TOTO — Architecture Review & Modernisation Roadmap

**Prepared:** May 2026  
**Reviewed by:** Claude (senior full-stack audit)  
**Scope:** Full codebase audit — security, performance, scalability, maintainability

---

## Executive Summary

TOTO is a well-designed product in a single-file PWA body that was never meant to grow this large. The user experience, design system, and feature depth are genuinely impressive for a side project — a senior developer would immediately recognise the product thinking. What they'd wince at is the delivery vehicle: a 1.2MB, 23,421-line HTML file with no tests, no build pipeline, exposed credentials, and missing Firestore security rules.

The good news: nothing here is irreversible. The architecture can be modernised incrementally without rebuilding the product. The priority order matters — security issues need to be addressed before any user growth.

**Overall verdict (out of 5):**  
Product quality: ⭐⭐⭐⭐⭐ (5/5)  
Engineering quality: ⭐⭐ (2/5 today) → fixable to ⭐⭐⭐⭐⭐ (5/5) with a structured effort

---

## Critical Issues — Fix Before Any Growth

These are not technical debt. They are active risks.

### 1. Firestore security rules are missing

**Current state:** No `firebase.json` and no `firestore.rules` file exists in the codebase. Firebase projects default to **open read/write** on new collections until rules are explicitly set. Anyone who knows the project ID (`home-budget-b0f28`) can read every family's financial data, children's names, dates of birth, vehicle plates, and passwords.

**Fix:** Create `firestore.rules` immediately.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Households: only the owner or an authorised member can read/write
    match /families/{uid} {
      allow read, write: if request.auth != null
        && (request.auth.uid == uid
            || request.auth.uid in resource.data.householdProfile.authorizedUsers);
    }

    // Admin reports: owner-only
    match /analytics_snapshots/{doc} {
      allow read: if request.auth != null
        && exists(/databases/$(database)/documents/admin_users/$(request.auth.uid));
    }

    match /admin_users/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false;
    }

    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Effort:** 30 minutes. **Risk if ignored:** Critical.

---

### 2. Firebase credentials in source control

**Current state:** The Firebase API key (`AIzaSyBiQq8lIf5yCKGDyinGjLaeAE100u7vF90`) is hardcoded in `index.html` and committed to the GitHub repository.

**Context:** Firebase API keys are not secret in the same way as backend API keys — they are designed to be public and are restricted by Firestore security rules and Firebase App Check. The real risk is that the key reveals the project ID, and without security rules (see above) that's all an attacker needs.

**Fix:**  
1. Fix the Firestore rules first (that's the real protection).  
2. Move config to a `.env` file excluded from git, injected at build time.  
3. Enable **Firebase App Check** — requires app attestation (iOS DeviceCheck, web reCAPTCHA v3) before any Firestore read/write is allowed. This is the correct long-term control.
4. Add `firebase.json` to `.gitignore` if it contains sensitive project config.

**Effort:** 2 hours including App Check setup. **Risk if ignored:** High (combined with missing rules).

---

### 3. Child PIN hashing is weak

**Current state:** Child PINs are hashed client-side before storage. The implementation uses a simple custom hash with no salt and no use of `crypto.subtle`. The state object (including PIN hashes) is stored unencrypted in `localStorage` and in Firestore.

**Fix:**

```javascript
async function _hashPin(pin, uid) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin + uid); // uid as per-user salt
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}
```

Use the household owner UID as a salt so the same PIN hashes differently per household. `crypto.subtle` is available in all modern browsers and in WKWebView (iOS Capacitor).

**Effort:** 2 hours (replace hash function + migrate existing hashes on next login). **Risk if ignored:** Medium.

---

## High Priority — Address Within Next 2 Releases

### 4. The monolithic file must be split

**Current state:** `index.html` is 1.2MB and 23,421 lines. It contains:
- 3,893 lines of CSS
- 340+ JavaScript functions
- All HTML markup
- All business logic, rendering, utilities, and constants

A senior developer would refuse to touch a PR for this file — merge conflicts are guaranteed, feature isolation is impossible, and any change risks breaking something unrelated.

**Recommended split:**

```
src/
├── index.html              (~200 lines — shell only)
├── css/
│   ├── tokens.css          (design variables)
│   ├── layout.css          (sidebar, nav, main)
│   ├── components.css      (cards, buttons, forms)
│   ├── today.css           (today screen)
│   └── sections/           (per-section CSS)
├── js/
│   ├── core/
│   │   ├── state.js        (DEFAULT_DATA, loadData, saveData, migrations)
│   │   ├── firebase.js     (auth, firestore init, sync)
│   │   ├── router.js       (SECTIONS, _TAB_RENDERERS, activateTab)
│   │   └── utils.js        (escHtml, uid, aud, safeRender, logActivity)
│   ├── sections/
│   │   ├── today.js        (renderToday + all today helpers)
│   │   ├── budget.js       (renderBudget, income/expense CRUD)
│   │   ├── planner.js      (renderPlanner, event management)
│   │   ├── kids.js         (kids zone, chores, rewards)
│   │   ├── lists.js        (shopping lists)
│   │   ├── meals.js        (meal planning)
│   │   ├── routines.js     (routines + completions)
│   │   ├── wallet.js       (bills, goals, net worth)
│   │   └── home.js         (documents, vehicles, maintenance)
│   ├── features/
│   │   ├── type-a.js       (life score, missions, weekly reset)
│   │   ├── ai.js           (Claude API calls, quick-add parsing)
│   │   └── child-mode.js   (kid view, PIN, routing)
│   └── main.js             (app init, auth listener, renderAll)
```

**How to migrate without rewriting:** Use native ES modules (`type="module"` on the script tag). Extract one file at a time, starting with `utils.js` and `state.js` — they have no dependencies on other app code and are the safest to extract first.

**Effort:** 3–5 days. **Impact:** Transforms developer experience entirely.

---

### 5. No build pipeline

**Current state:** The deployment workflow is:
1. Edit `index.html`
2. `cp index.html www/index.html`
3. `npx cap copy ios`
4. Build in Xcode

There is no minification, no dead code elimination, no source maps, no asset hashing, and no automated deployment.

**Recommended build setup (Vite — minimal config, no framework required):**

```bash
npm install --save-dev vite
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    outDir: 'www',
    rollupOptions: {
      input: 'src/index.html'
    }
  }
});
```

**What this gives you:**
- Bundle splitting (CSS separate from JS)
- Minification (1.2MB → ~200KB typical)
- Source maps for debugging
- Hot module reload in development
- Asset fingerprinting (cache busting)
- `npm run build` produces the `www/` folder that Capacitor copies

**Effort:** 1 day to configure. **Impact:** Significant — every deploy is cleaner and smaller.

---

### 6. No tests

**Current state:** `npm test` prints "Error: no test specified". No unit tests, no integration tests, no snapshot tests exist.

**What to test first (highest return):**

| Test type | Target | Framework |
|-----------|--------|-----------|
| Unit | `calcLifeScore()`, `billDaysUntil()`, `freqToMonthly()`, `_inferAisle()`, `_parseShopInput()` | Vitest |
| Unit | State migrations in `_applyMigrations()` | Vitest |
| Integration | `saveData()` → `loadData()` round-trip | Vitest |
| Integration | Firestore sync (mock Firestore) | Vitest + firebase-admin emulator |
| E2E | Sign in → add bill → see on Today screen | Playwright |

**Minimum viable test suite (start here):**

```bash
npm install --save-dev vitest
```

```javascript
// src/core/state.test.js
import { describe, it, expect } from 'vitest';
import { freqToMonthly, billDaysUntil } from './utils';

describe('freqToMonthly', () => {
  it('converts weekly to monthly', () => {
    expect(freqToMonthly(100, 'weekly')).toBeCloseTo(433.33, 1);
  });
  it('returns monthly unchanged', () => {
    expect(freqToMonthly(500, 'monthly')).toBe(500);
  });
});
```

**Coverage target for v1 test suite:** 80% of business logic functions (not render functions — those are better covered by E2E).

**Effort:** 2 days for a meaningful initial suite. **Impact:** Prevents regressions on every change going forward.

---

### 7. State management is a global mutable object

**Current state:** The entire app state lives in a single `let state = loadData()` global variable. Every function in the app can mutate it directly. `saveData(state)` is called 17+ times in various places. There is no change tracking, no immutability, no diffing.

**Problems this causes:**
- A bug in one section can corrupt state for an unrelated section
- `renderAll()` re-renders every tab on every save (expensive)
- Impossible to implement undo/redo
- Impossible to detect what actually changed

**Recommended pattern — lightweight reactive store:**

```javascript
// src/core/store.js
let _state = loadData();
const _listeners = new Set();

export function getState() {
  return _state;
}

export function setState(updater) {
  const next = produce(_state, updater); // immer.js or manual spread
  _state = next;
  saveData(_state);
  _listeners.forEach(fn => fn(_state));
}

export function subscribe(fn) {
  _listeners.add(fn);
  return () => _listeners.delete(fn); // unsubscribe
}
```

Each section subscribes to state changes and re-renders only itself when its slice changes. This is the core pattern used by Redux, Zustand, and MobX — but doesn't require any of them.

**Effort:** 3 days to refactor into this pattern alongside the file split. **Impact:** Eliminates entire classes of bugs.

---

## Medium Priority — Next Quarter

### 8. Inline styles everywhere

**Current state:** 1,824 instances of `style="..."` in dynamically generated HTML. Dynamic values (`style="width:${pct}%"`) are legitimate, but static styles (`style="font-size:13px;font-weight:700;color:var(--ink)"`) should be classes.

**Fix:** For any static style string that appears more than twice, extract to a CSS class. The design token system (`--ink`, `--iris-1` etc.) is already excellent — it just needs to be used consistently via classes rather than inline.

```css
/* Instead of style="font-size:13px;font-weight:700;color:var(--ink)" */
.label-strong {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}
```

**Effort:** Ongoing, 1 week of cleanup. **Impact:** Smaller HTML, consistent theming, easier dark mode.

---

### 9. No error monitoring

**Current state:** Errors are swallowed by `safeRender()` and logged to the console. There is no visibility into what's failing in production on real devices.

**Fix:** Add Sentry (or the Firebase Crashlytics equivalent for web — `@firebase/analytics`). One line of setup gives you:
- JavaScript error stack traces from production
- Which device/OS/version caused the error
- How often it happens
- Breadcrumbs of what the user did before the error

```javascript
import * as Sentry from "@sentry/browser";
Sentry.init({ dsn: "YOUR_DSN", release: "toto@1.0.0" });
```

Wrap `safeRender()` to report to Sentry instead of silently swallowing:

```javascript
function safeRender(fn) {
  try {
    fn();
  } catch(e) {
    Sentry.captureException(e, { extra: { renderer: fn.name } });
  }
}
```

**Effort:** 2 hours. **Impact:** You stop flying blind in production.

---

### 10. No CI/CD pipeline

**Current state:** All deployments are manual. The risk is that a bad edit gets pushed directly to the iOS app without any automated checks.

**Recommended GitHub Actions pipeline:**

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy-preview:
    if: github.ref != 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: npx firebase hosting:channel:deploy pr-${{ github.event.number }}
```

This means every PR gets a live preview URL and no broken build can merge to main.

**Effort:** 1 day. **Impact:** Catches regressions before they reach users.

---

### 11. `localStorage` stores sensitive financial data unencrypted

**Current state:** The full state object — including income, expenses, net worth, children's DOBs, and PIN hashes — is stored as plain JSON in `localStorage`. On a shared device or jailbroken phone, this is trivially readable.

**Fix options (in order of effort):**

1. **Use `@capacitor/preferences` instead of `localStorage`** — already installed. On iOS this uses the native Keychain/secure enclave via `NSUserDefaults` which is encrypted by iOS at rest. One-line change.

2. **Encrypt sensitive fields before writing** — use `crypto.subtle.encrypt` (AES-GCM) with a key derived from the user's UID + a device-specific nonce. Decrypt on read.

3. **Store only non-sensitive data locally** — keep planner events and lists in `localStorage`, and require Firestore for financial data (bills, budget, net worth). Sensitive data is never on device.

Option 1 is the quick win since the dependency is already installed.

**Effort:** 4 hours for option 1. **Impact:** Meaningful improvement for iOS security posture.

---

### 12. `renderAll()` is too expensive

**Current state:** `renderAll()` calls every section's render function regardless of what changed. Adding a bill triggers `renderBudget()`, `renderMeals()`, `renderPlanner()`, `renderRoutines()` etc.

**Fix:** Add a dirty-flag system. Each section declares which state slices it depends on. `saveData()` detects which slices changed and only re-renders affected sections.

```javascript
const SECTION_DEPS = {
  budget:   ['budget', 'bills'],
  planner:  ['planner'],
  today:    ['bills', 'planner', 'routines', 'maintenance', 'documents', 'lists'],
  kids:     ['kids', 'routines', 'routineAssignments'],
  meals:    ['meals', 'lists'],
  home:     ['maintenance', 'vehicles', 'documents'],
};

function saveData(data, changedKeys = []) {
  // ...save logic...
  if (changedKeys.length === 0) { renderAll(); return; }
  Object.entries(SECTION_DEPS).forEach(([section, deps]) => {
    if (deps.some(d => changedKeys.includes(d))) {
      safeRender(_TAB_RENDERERS[section]?.[0]);
    }
  });
}
```

**Effort:** 2 days. **Impact:** Noticeably faster UI on mid-range devices.

---

## Lower Priority — Strategic Improvements

### 13. Upgrade to Firebase Modular SDK

**Current state:** Using Firebase compat SDK v9.23.0 (the `firebase-app-compat.js` pattern). This is an older compatibility shim that doesn't support tree-shaking — the entire Firebase SDK loads regardless of what features are used.

**Fix:** Migrate to the modular Firebase v10/v11 SDK. This alone typically reduces Firebase bundle size by 40–60%.

```javascript
// Before (compat)
import firebase from 'firebase/compat/app';
firebase.initializeApp(config);
const db = firebase.firestore();

// After (modular)
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
const app = initializeApp(config);
const db = getFirestore(app);
```

**Effort:** 1 day. **Impact:** Smaller bundle, access to latest Firebase features.

---

### 14. Introduce a proper data access layer

**Current state:** Firestore reads and writes are scattered across the codebase. `saveData()` always writes the full state object as a single Firestore document. For large households this could exceed Firestore's 1MB document limit, and every tiny change rewrites the entire document.

**Recommended pattern — subcollections per domain:**

```
families/{uid}/                    ← household metadata only
families/{uid}/budget/{month}      ← one doc per month
families/{uid}/events/{eventId}    ← individual events
families/{uid}/lists/{listId}      ← individual lists
families/{uid}/routines/{id}       ← individual routines
```

**Benefits:**
- Each section syncs independently
- Partial writes (no 1MB risk)
- Offline support per-section
- Easier to implement field-level Firestore security rules
- Can paginate historical data (months, events)

This is a bigger migration but is the correct long-term architecture for a multi-user household app.

**Effort:** 1 week. **Impact:** Scalability, offline resilience, data integrity.

---

### 15. Offline support is incomplete

**Current state:** `sw.js` exists (57 lines) and caches the app shell. But the app renders blank if Firestore is unavailable — there is no offline-first data layer.

**Fix:** Use Firestore's built-in offline persistence:

```javascript
import { enableIndexedDbPersistence } from 'firebase/firestore';
enableIndexedDbPersistence(db).catch(err => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open — persistence only works in one
  }
});
```

With this enabled, all Firestore reads/writes are cached in IndexedDB. The app works fully offline, queues writes, and syncs when reconnected. This is a one-line change that gives full offline support.

**Effort:** 2 hours. **Impact:** High — the app is installed on mobile and users expect it to work without connectivity.

---

### 16. No URL-based routing

**Current state:** Navigation is entirely DOM-based (`activateTab()`). There is no URL history, no deep links, no back-button support. Users can't share a link to a specific section.

**Fix:** Use the History API to sync the URL with the active tab:

```javascript
function activateTab(tab) {
  // ... existing logic ...
  history.pushState({ tab }, '', `#${tab}`);
}

window.addEventListener('popstate', (e) => {
  if (e.state?.tab) activateTab(e.state.tab);
});

// On load, restore from URL
const hash = location.hash.slice(1);
if (hash && _TAB_RENDERERS[hash]) activateTab(hash);
```

**Effort:** 4 hours. **Impact:** Deep linking, back button support, shareable URLs.

---

## What a Senior Developer Would Say

**What they'd admire:**
- The design system is exceptional — consistent tokens, `--iris-*`, `--ember`, `--good`, `--muted`, applied everywhere
- `safeRender()` is a sensible pattern for a single-file app — errors don't cascade
- The `SECTIONS` / `_TAB_RENDERERS` routing map is clean and easy to extend
- `_applyMigrations()` shows thoughtful schema versioning — most side projects never do this
- The product breadth (budget + planner + kids + shopping + routines + Type A) in a single file is genuinely impressive
- `escHtml()` is used correctly in most places — XSS wasn't an afterthought
- `confirmScope()` (apply to this month or all months) is a thoughtful UX pattern with matching implementation
- `billDaysUntil()`, `freqToMonthly()` — these are pure functions that could drop straight into a test suite

**What they'd flag immediately:**
1. Missing Firestore security rules — would raise a blocker on any PR
2. The 23K line file — "this is a ship of Theseus, not an app"
3. No tests — "how do you know anything works when you change something?"
4. No build pipeline — "you're deploying source code to production"
5. Sensitive data unencrypted in localStorage
6. `renderAll()` on every save — "this will crawl on a three-year-old phone"

---

## Recommended Implementation Order

| # | Task | Effort | Priority | Impact |
|---|------|--------|----------|--------|
| 1 | Write Firestore security rules | 30 min | 🔴 Now | Security |
| 2 | Enable Firebase App Check | 2 hrs | 🔴 Now | Security |
| 3 | Fix PIN hashing (crypto.subtle) | 2 hrs | 🔴 Now | Security |
| 4 | Switch localStorage → @capacitor/preferences | 4 hrs | 🔴 Now | Security |
| 5 | Add Sentry error monitoring | 2 hrs | 🟠 Soon | Observability |
| 6 | Add Vitest + first 20 unit tests | 2 days | 🟠 Soon | Quality |
| 7 | Set up Vite build pipeline | 1 day | 🟠 Soon | Performance |
| 8 | Set up GitHub Actions CI | 1 day | 🟠 Soon | Quality |
| 9 | Split index.html into modules | 5 days | 🟠 Soon | Maintainability |
| 10 | Implement reactive store pattern | 3 days | 🟡 Quarter | Architecture |
| 11 | Targeted render (dirty flags) | 2 days | 🟡 Quarter | Performance |
| 12 | Enable Firestore offline persistence | 2 hrs | 🟡 Quarter | Resilience |
| 13 | URL-based routing (History API) | 4 hrs | 🟡 Quarter | UX |
| 14 | Upgrade to Firebase Modular SDK | 1 day | 🟡 Quarter | Performance |
| 15 | Firestore subcollection architecture | 1 week | 🟢 Strategic | Scalability |
| 16 | E2E tests (Playwright) | 2 days | 🟢 Strategic | Quality |

---

## The Goal State

After completing items 1–9, a senior developer joining the project would find:

- A `src/` directory with ~15 focused files, each under 500 lines
- A `vitest` test suite covering all business logic
- A `vite build` that produces a minified, fingerprinted bundle in `www/`
- A GitHub Actions pipeline that runs tests and builds on every PR
- A Firestore rules file committed to the repo alongside the code
- Sentry dashboard showing real errors from real users
- `@capacitor/preferences` handling all sensitive local data

At that point the codebase matches the product — and a senior developer would be genuinely impressed by both.

---

*This document was generated from a full static analysis of the codebase. All line numbers reference `index.html` at commit `f48fa7f` (3 May 2026).*

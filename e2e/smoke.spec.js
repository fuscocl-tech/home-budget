// @ts-check
import { test, expect } from '@playwright/test';

// Minimal seeded state that bypasses onboarding and device setup.
const SEED_STATE = {
  onboarded: true,
  setupProgressDismissed: true,
  householdProfile: {
    members: [{ role: 'adult', name: 'Test User', age: null }],
    pets: [],
    cars: 1,
    invites: [],
    authorizedUsers: [],
  },
  budget: { income: [], expenses: [], actuals: {}, months: {}, suggestions: [] },
  bills: [],
  subscriptions: [],
  goals: [],
  scenarios: [],
  netWorth: { assets: [], liabilities: [], snapshots: [], target: { amount: 0, byYear: 0 } },
  planner: { events: [] },
  meals: { plan: {}, shopping: [], lunchbox: { profiles: [], plans: {} }, pantry: [] },
  kids: { profiles: [], chores: [], prizes: [], completions: [], redemptions: [] },
  vehicles: [],
  documents: [],
  maintenance: [],
  furniture: [],
  appliances: [],
  activityLog: [],
  buildContract: { total: 0, stages: [], variations: [] },
  extras: [],
  lists: {},
  routines: [],
  routineAssignments: [],
  settings: {},
};

async function seedAndLoad(page, extraState = {}, hash = '') {
  // addInitScript runs before any page JS — sets localStorage and bypasses
  // Firebase auth entirely by stubbing it out before the app initialises.
  await page.addInitScript(({ state, deviceProfile }) => {
    // Seed app state and device profile
    localStorage.setItem('home_finance_v1', JSON.stringify(state));
    localStorage.setItem('toto_device_profile', deviceProfile);

    // Stub Firebase before the app's firebase.js runs so auth never blocks
    // Signal to firebase.js to skip real Firebase init
    window.__FIREBASE_STUB__ = true;
  }, { state: { ...SEED_STATE, ...extraState }, deviceProfile: 'adult' });

  await page.goto('/' + (hash ? hash : ''));

  // Firebase is stubbed so auth never fires — call guestMode() directly
  // if the login overlay is still showing after a short wait.
  await page.waitForTimeout(500);
  const loginOverlay = page.locator('#login-overlay');
  const isLoggedIn = await loginOverlay.evaluate(el => el.classList.contains('hidden')).catch(() => false);
  if (!isLoggedIn) {
    // Try the guest button first, fall back to calling guestMode() directly
    const guestBtn = page.getByRole('button', { name: /continue without sign in/i });
    if (await guestBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await guestBtn.click();
    } else {
      await page.evaluate(() => window.guestMode && window.guestMode());
    }
  }

  // Wait for the login overlay to be hidden
  await expect(loginOverlay).toHaveClass(/hidden/, { timeout: 10000 });

  // Wait for today content to be visible (confirms renderAll() ran)
  await expect(page.locator('#today-content')).toBeVisible({ timeout: 10000 });
}

// ── Smoke: app loads ─────────────────────────────────────────────────────────

test('app loads and shows Today screen', async ({ page }) => {
  await seedAndLoad(page);
  await expect(page.locator('#today-content')).toBeVisible();
});

// ── Navigation: sidebar nav ──────────────────────────────────────────────────

test('clicking Wallet sidebar nav opens budget tab', async ({ page }) => {
  await seedAndLoad(page);
  await page.locator('[data-tab="budget"]').first().click();
  await expect(page.locator('#tab-budget')).toHaveClass(/active/);
});

test('clicking Planner sidebar nav opens planner tab', async ({ page }) => {
  await seedAndLoad(page);
  await page.locator('[data-tab="planner"]').first().click();
  await expect(page.locator('#tab-planner')).toHaveClass(/active/);
});

test('settings icon button opens settings tab', async ({ page }) => {
  await seedAndLoad(page);
  await page.locator('button[onclick*="activateTab(\'settings\')"]').first().click();
  await expect(page.locator('#tab-settings')).toHaveClass(/active/);
  await expect(page.locator('#tab-settings')).toBeVisible();
});

// ── Section pill sub-navigation ──────────────────────────────────────────────

test('Bills section pill opens bills tab', async ({ page }) => {
  await seedAndLoad(page);
  await page.locator('[data-tab="budget"]').first().click();
  await expect(page.locator('#tab-budget')).toHaveClass(/active/);
  await page.locator('.section-pill[data-pill="bills"]').first().click();
  await expect(page.locator('#tab-bills')).toHaveClass(/active/);
});

// ── URL routing ──────────────────────────────────────────────────────────────

test('URL hash navigates to correct tab on load', async ({ page }) => {
  await page.addInitScript(({ state, deviceProfile }) => {
    localStorage.setItem('home_finance_v1', JSON.stringify(state));
    localStorage.setItem('toto_device_profile', deviceProfile);
    window.__FIREBASE_STUB__ = true;
  }, { state: SEED_STATE, deviceProfile: 'adult' });

  await page.goto('/#budget');

  await page.waitForTimeout(500);
  const loginOverlay = page.locator('#login-overlay');
  const isLoggedIn = await loginOverlay.evaluate(el => el.classList.contains('hidden')).catch(() => false);
  if (!isLoggedIn) {
    const guestBtn = page.getByRole('button', { name: /continue without sign in/i });
    if (await guestBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await guestBtn.click();
    } else {
      await page.evaluate(() => window.guestMode && window.guestMode());
    }
  }

  await expect(loginOverlay).toHaveClass(/hidden/, { timeout: 10000 });
  await expect(page.locator('#tab-budget')).toHaveClass(/active/, { timeout: 10000 });
});

test('back button returns to previous tab', async ({ page }) => {
  await seedAndLoad(page);

  await page.locator('[data-tab="budget"]').first().click();
  await expect(page.locator('#tab-budget')).toHaveClass(/active/);

  await page.locator('[data-tab="planner"]').first().click();
  await expect(page.locator('#tab-planner')).toHaveClass(/active/);

  await page.goBack();
  await expect(page.locator('#tab-budget')).toHaveClass(/active/);
});

// ── Adding a bill ────────────────────────────────────────────────────────────

test('can open add bill form', async ({ page }) => {
  await seedAndLoad(page);

  await page.locator('[data-tab="budget"]').first().click();
  await page.locator('.section-pill[data-pill="bills"]').first().click();
  await expect(page.locator('#tab-bills')).toHaveClass(/active/);

  const addBtn = page.getByRole('button', { name: /^\+ Bill$/i }).first();
  await expect(addBtn).toBeVisible({ timeout: 5000 });
  await addBtn.click();

  await expect(page.locator('#bill-modal')).toBeVisible({ timeout: 5000 });
});

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
  await page.addInitScript(({ state, deviceProfile }) => {
    localStorage.setItem('home_finance_v1', JSON.stringify(state));
    localStorage.setItem('toto_device_profile', deviceProfile);
  }, { state: { ...SEED_STATE, ...extraState }, deviceProfile: 'adult' });

  await page.goto('/' + (hash ? hash : ''));

  // Guest mode bypasses Firebase Auth
  const guestBtn = page.getByRole('button', { name: /continue without sign in/i });
  if (await guestBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await guestBtn.click();
  }

  // Wait for the Today tab to be active (app has loaded)
  await expect(page.locator('#tab-today')).toHaveClass(/active/, { timeout: 10000 });
}

// ── Smoke: app loads ─────────────────────────────────────────────────────────

test('app loads and shows Today screen', async ({ page }) => {
  await seedAndLoad(page);
  await expect(page.locator('#today-content')).toBeVisible();
});

// ── Navigation: sidebar nav ──────────────────────────────────────────────────

test('clicking Wallet sidebar nav opens budget tab', async ({ page }) => {
  await seedAndLoad(page);
  // Wallet nav item has data-tab="budget"
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
  // Settings is in the header as an icon button
  await page.locator('button[onclick*="activateTab(\'settings\')"]').first().click();
  await expect(page.locator('#tab-settings')).toHaveClass(/active/);
  await expect(page.locator('#tab-settings')).toBeVisible();
});

// ── Section pill sub-navigation ──────────────────────────────────────────────

test('Bills section pill opens bills tab', async ({ page }) => {
  await seedAndLoad(page);
  // Navigate to Wallet first to reveal the section pill strip
  await page.locator('[data-tab="budget"]').first().click();
  await expect(page.locator('#tab-budget')).toHaveClass(/active/);
  // Click the Bills pill
  await page.locator('.section-pill[data-pill="bills"]').first().click();
  await expect(page.locator('#tab-bills')).toHaveClass(/active/);
});

// ── URL routing ──────────────────────────────────────────────────────────────

test('URL hash navigates to correct tab on load', async ({ page }) => {
  await page.addInitScript(({ state, deviceProfile }) => {
    localStorage.setItem('home_finance_v1', JSON.stringify(state));
    localStorage.setItem('toto_device_profile', deviceProfile);
  }, { state: SEED_STATE, deviceProfile: 'adult' });

  await page.goto('/#budget');

  const guestBtn = page.getByRole('button', { name: /continue without sign in/i });
  if (await guestBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await guestBtn.click();
  }

  await expect(page.locator('#tab-budget')).toHaveClass(/active/, { timeout: 10000 });
});

test('back button returns to previous tab', async ({ page }) => {
  await seedAndLoad(page);

  // Navigate to budget
  await page.locator('[data-tab="budget"]').first().click();
  await expect(page.locator('#tab-budget')).toHaveClass(/active/);

  // Navigate to planner
  await page.locator('[data-tab="planner"]').first().click();
  await expect(page.locator('#tab-planner')).toHaveClass(/active/);

  // Go back — should return to budget
  await page.goBack();
  await expect(page.locator('#tab-budget')).toHaveClass(/active/);
});

// ── Adding a bill ────────────────────────────────────────────────────────────

test('can open add bill form', async ({ page }) => {
  await seedAndLoad(page);

  // Go to Wallet → Bills
  await page.locator('[data-tab="budget"]').first().click();
  await page.locator('.section-pill[data-pill="bills"]').first().click();
  await expect(page.locator('#tab-bills')).toHaveClass(/active/);

  // Look for the "+ Bill" button
  const addBtn = page.getByRole('button', { name: /^\+ Bill$/i }).first();
  await expect(addBtn).toBeVisible({ timeout: 5000 });
  await addBtn.click();

  // The "Add Bill" modal should appear
  await expect(page.locator('#bill-modal')).toBeVisible({ timeout: 5000 });
});

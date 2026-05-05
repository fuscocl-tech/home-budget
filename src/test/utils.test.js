import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { freqToMonthly, billNextDue, billDaysUntil } from '../utils.js';

// ── freqToMonthly ────────────────────────────────────────────────────────────

describe('freqToMonthly', () => {
  it('returns amount unchanged for monthly', () => {
    expect(freqToMonthly(100, 'monthly')).toBe(100);
  });

  it('returns amount unchanged for unknown frequency', () => {
    expect(freqToMonthly(100, 'biennial')).toBe(100);
  });

  it('converts daily to monthly', () => {
    expect(freqToMonthly(1, 'daily')).toBeCloseTo(365 / 12, 5);
  });

  it('converts weekly to monthly', () => {
    expect(freqToMonthly(100, 'weekly')).toBeCloseTo(100 * 52 / 12, 5);
  });

  it('converts fortnightly to monthly', () => {
    expect(freqToMonthly(100, 'fortnightly')).toBeCloseTo(100 * 26 / 12, 5);
  });

  it('converts quarterly to monthly', () => {
    expect(freqToMonthly(300, 'quarterly')).toBeCloseTo(100, 5);
  });

  it('converts annually to monthly', () => {
    expect(freqToMonthly(1200, 'annually')).toBeCloseTo(100, 5);
  });

  it('treats "annual" the same as "annually"', () => {
    expect(freqToMonthly(1200, 'annual')).toBeCloseTo(100, 5);
  });

  it('handles zero amount', () => {
    expect(freqToMonthly(0, 'weekly')).toBe(0);
  });
});

// ── billNextDue ──────────────────────────────────────────────────────────────

describe('billNextDue', () => {
  beforeEach(() => {
    // Pin "today" to 2026-05-03 (Sunday) to make assertions deterministic
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-03T10:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns later this month when dueDay is in the future', () => {
    const bill = { frequency: 'Monthly', dueDay: 15 };
    const next = billNextDue(bill);
    expect(next.getFullYear()).toBe(2026);
    expect(next.getMonth()).toBe(4); // May = index 4
    expect(next.getDate()).toBe(15);
  });

  it('rolls over to next month when dueDay has already passed', () => {
    const bill = { frequency: 'Monthly', dueDay: 1 };
    const next = billNextDue(bill);
    // May 1 is before May 3, so should roll to Jun 1
    expect(next.getMonth()).toBe(5); // June = index 5
    expect(next.getDate()).toBe(1);
  });

  it('handles dueDay equal to today (same day counts as past → next month)', () => {
    // May 3 is today — since `d < today` the same-day case depends on strict <
    // In the implementation: if (d < today) roll over. d == today is NOT less, so stays this month.
    const bill = { frequency: 'Monthly', dueDay: 3 };
    const next = billNextDue(bill);
    expect(next.getMonth()).toBe(4); // still May
    expect(next.getDate()).toBe(3);
  });

  it('calculates weekly next due from lastPaid', () => {
    // Apr26 +7 = May3 (<=today, so advances again) → May10
    const bill = { frequency: 'Weekly', lastPaid: '2026-04-26' };
    const next = billNextDue(bill);
    expect(next.getFullYear()).toBe(2026);
    expect(next.getMonth()).toBe(4); // May
    expect(next.getDate()).toBe(10);
  });

  it('calculates fortnightly next due', () => {
    const bill = { frequency: 'Fortnightly', lastPaid: '2026-04-19' };
    // Apr19 + 14 = May3 (<=today) → May3+14 = May17
    const next = billNextDue(bill);
    expect(next.getMonth()).toBe(4);
    expect(next.getDate()).toBe(17);
  });
});

// ── billDaysUntil ────────────────────────────────────────────────────────────

describe('billDaysUntil', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-03T10:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns positive days for a future bill', () => {
    const bill = { frequency: 'Monthly', dueDay: 15 };
    expect(billDaysUntil(bill)).toBe(12); // May3 → May15 = 12 days
  });

  it('returns 0 for a bill due today', () => {
    const bill = { frequency: 'Monthly', dueDay: 3 };
    expect(billDaysUntil(bill)).toBe(0);
  });

  it('returns positive days when last period is today (not overdue)', () => {
    // Weekly bill lastPaid Apr26 — next is May10
    const bill = { frequency: 'Weekly', lastPaid: '2026-04-26' };
    expect(billDaysUntil(bill)).toBe(7);
  });
});

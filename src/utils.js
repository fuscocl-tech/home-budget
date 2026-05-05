// Pure utility functions extracted from index.html.
// These have no DOM or Firebase dependencies and are safe to unit-test.

export function freqToMonthly(amount, freq) {
  if (freq === 'daily')        return amount * 365 / 12;
  if (freq === 'weekly')       return amount * 52 / 12;
  if (freq === 'fortnightly')  return amount * 26 / 12;
  if (freq === 'quarterly')    return amount / 3;
  if (freq === 'annually' || freq === 'annual') return amount / 12;
  return amount; // monthly
}

export function billNextDue(bill) {
  const today = new Date(); today.setHours(0,0,0,0);
  const freq  = bill.frequency || 'Monthly';

  if (freq === 'Monthly') {
    const day = parseInt(bill.dueDay) || 1;
    let d = new Date(today.getFullYear(), today.getMonth(), day);
    if (d < today) d = new Date(today.getFullYear(), today.getMonth() + 1, day);
    return d;
  }

  const base = bill.lastPaid ? new Date(bill.lastPaid) : (bill.startDate ? new Date(bill.startDate) : today);
  base.setHours(0,0,0,0);
  const periodDays = { Weekly: 7, Fortnightly: 14, Quarterly: 91, Annually: 365 }[freq] || 30;
  let next = new Date(base);
  while (next <= today) next = new Date(next.getTime() + periodDays * 86400000);
  return next;
}

export function billDaysUntil(bill) {
  const today = new Date(); today.setHours(0,0,0,0);
  const next  = billNextDue(bill);
  return Math.round((next - today) / 86400000);
}

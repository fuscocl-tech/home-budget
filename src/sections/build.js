// Build Costs section
import { state } from '../store.js';
import { aud, escHtml, escAttr, nextId, fmtDate } from './format.js';

export function renderBuild() {
  const c = state.buildContract;
  const contractPaid = c.stages.filter(s => s.paid).reduce((sum, s) => sum + s.amount, 0);
  const contractRemaining = c.total - contractPaid;
  const paidStages = c.stages.filter(s => s.paid).length;
  const totalStages = c.stages.length;

  // Variations totals
  const variations = c.variations || [];
  const approvedVarTotal = variations.filter(v => v.status === 'approved').reduce((s, v) => s + (v.amount || 0), 0);
  const pendingVarTotal  = variations.filter(v => v.status === 'pending').reduce((s, v) => s + (v.amount || 0), 0);
  const revisedTotal     = c.total + approvedVarTotal;

  let html = `
    <div class="section" style="border-left:4px solid ${colors.build.contract}">
      <div class="section-header">
        <div>
          <div class="section-title">Fixed Price Contract</div>
          <div class="section-subtitle">${paidStages} of ${totalStages} stages paid · ${Math.round(contractPaid/c.total*100)}% of original contract</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="openEditContractTotal()">Edit contract</button>
          <button class="btn btn-primary btn-sm" onclick="openAddStage()">+ Stage</button>
        </div>
      </div>

      <!-- Contract summary row -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1px;background:var(--border);border-bottom:1px solid var(--border)">
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Original Contract</div>
          <div style="font-size:18px;font-weight:700">${aud(c.total)}</div>
        </div>
        ${approvedVarTotal !== 0 ? `
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Approved Variations</div>
          <div style="font-size:18px;font-weight:700;color:${approvedVarTotal > 0 ? 'var(--danger)' : 'var(--success)'}">${approvedVarTotal > 0 ? '+' : ''}${aud(approvedVarTotal)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Revised Total</div>
          <div style="font-size:18px;font-weight:700;color:var(--primary)">${aud(revisedTotal)}</div>
        </div>` : ''}
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Paid to Date</div>
          <div style="font-size:18px;font-weight:700;color:var(--success)">${aud(contractPaid)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Remaining</div>
          <div style="font-size:18px;font-weight:700;color:var(--danger)">${aud(revisedTotal - contractPaid)}</div>
        </div>
        ${pendingVarTotal > 0 ? `
        <div style="background:#fffbeb;padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#92400e;margin-bottom:4px">Pending Variations</div>
          <div style="font-size:18px;font-weight:700;color:#d97706">+${aud(pendingVarTotal)}</div>
        </div>` : ''}
      </div>

      <!-- Visual stage timeline -->
      <div style="padding:16px 20px;border-bottom:1px solid var(--border)">
        <div style="display:flex;gap:0;position:relative">
          ${c.stages.map((s, idx) => {
            const pct = ((s.amount / c.total) * 100).toFixed(0);
            const isNext = !s.paid && c.stages.slice(0, idx).every(x => x.paid);
            const bg = s.paid ? '#dcfce7' : isNext ? '#dbeafe' : 'var(--surface2)';
            const border = s.paid ? '#16a34a' : isNext ? 'var(--primary)' : 'var(--border)';
            const textColor = s.paid ? '#15803d' : isNext ? 'var(--primary)' : 'var(--text-muted)';
            const icon = s.paid ? '✓' : isNext ? '→' : `${idx+1}`;
            const dateLabel = s.paid && s.paidDate ? fmtDate(s.paidDate) : (s.expectedDate ? 'Exp. '+fmtDate(s.expectedDate) : '');
            const overdue = !s.paid && s.expectedDate && isOverdue(s.expectedDate);
            return `
            <div style="flex:1;min-width:0;border:1px solid ${overdue ? 'var(--danger)' : border};border-radius:8px;padding:10px 10px 8px;margin-right:${idx < c.stages.length-1 ? '6px' : '0'};background:${overdue ? '#fef2f2' : bg};cursor:pointer;position:relative" onclick="openEditStage(${s.id})" title="Edit ${escAttr(s.name)}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
                <span style="font-size:11px;font-weight:700;color:${overdue ? 'var(--danger)' : textColor};width:20px;height:20px;border-radius:50%;background:${s.paid ? '#16a34a' : isNext ? 'var(--primary)' : '#94a3b8'};color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">${icon}</span>
                <span style="font-size:11px;color:${overdue ? 'var(--danger)' : 'var(--text-muted)'};font-weight:600">${pct}%</span>
              </div>
              <div style="font-size:12px;font-weight:600;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px">${escHtml(s.name)}</div>
              <div style="font-size:12px;font-weight:700;color:${s.paid ? '#15803d' : 'var(--text)'}">${aud(s.amount)}</div>
              ${dateLabel ? `<div style="font-size:10px;color:${overdue ? 'var(--danger)' : 'var(--text-muted)'};margin-top:2px">${overdue ? '⚠ ' : ''}${dateLabel}</div>` : ''}
            </div>`;
          }).join('')}
        </div>
        <div class="progress-bar" style="height:8px;margin-top:12px;border-radius:4px">
          <div class="progress-fill green" style="width:${Math.min(100, Math.round(contractPaid/c.total*100))}%;border-radius:4px"></div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>Stage</th><th>Amount</th><th>% of Contract</th><th>Status</th><th>Funding</th><th>Expected</th><th>Paid Date</th><th>Invoice Ref</th><th></th></tr></thead>
          <tbody>
            ${c.stages.map(s => {
              const pct = ((s.amount / c.total) * 100).toFixed(1);
              const overdue = !s.paid && s.expectedDate && isOverdue(s.expectedDate);
              const badge = s.paid
                ? `<span class="badge paid">Paid</span>`
                : overdue
                  ? `<span class="badge overdue">Overdue</span>`
                  : `<span class="badge unpaid">Upcoming</span>`;
              return `<tr>
                <td style="font-weight:500">${escHtml(s.name)}</td>
                <td class="amount">${aud(s.amount)}</td>
                <td style="color:var(--text-muted)">${pct}%</td>
                <td>${badge}</td>
                <td>${fundingBadge(s.funding || 'loan')}</td>
                <td>${s.expectedDate ? fmtDate(s.expectedDate) : '<span style="color:var(--text-muted)">—</span>'}</td>
                <td>${fmtDate(s.paidDate)}</td>
                <td style="color:var(--text-muted)">${escHtml(s.invoiceRef || '—')}</td>
                <td class="actions">
                  ${attachBtn(`stage-${s.id}`, escAttr(s.name))}
                  <button class="btn btn-ghost btn-sm" onclick="openEditStage(${s.id})">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="deleteStage(${s.id})">🗑</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // ── Contract Variations ─────────────────────────
  const varStatusBadge = {
    'pending':  `<span class="badge" style="background:#fef9c3;color:#854d0e;border:1px solid #fde047">Pending</span>`,
    'approved': `<span class="badge paid">Approved</span>`,
    'rejected': `<span class="badge" style="background:#fee2e2;color:#991b1b">Rejected</span>`,
  };

  html += `
    <div class="section" style="border-left:4px solid #8b5cf6">
      <div class="section-header">
        <div>
          <div class="section-title">Contract Variations</div>
          <div class="section-subtitle">
            ${variations.length === 0 ? 'No variations yet' :
              `${variations.filter(v=>v.status==='approved').length} approved · ${variations.filter(v=>v.status==='pending').length} pending · ${approvedVarTotal >= 0 ? '+' : ''}${aud(approvedVarTotal)} net impact`}
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddVariation()">+ Variation</button>
      </div>
      ${variations.length === 0
        ? `<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No variations raised yet. Builder-initiated or owner-requested changes to the contract will appear here.</div>`
        : `<div class="table-wrap">
            <table>
              <thead><tr><th>Ref</th><th>Description</th><th>Amount</th><th>Status</th><th>Funding</th><th>Raised</th><th>Approved</th><th>Notes</th><th></th></tr></thead>
              <tbody>
                ${variations.map(v => `<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${escHtml(v.ref || '—')}</td>
                  <td style="font-weight:500">${escHtml(v.name)}</td>
                  <td class="amount" style="color:${(v.amount||0) < 0 ? 'var(--success)' : 'var(--danger)'};font-weight:600">${v.amount > 0 ? '+' : ''}${aud(v.amount)}</td>
                  <td>${varStatusBadge[v.status] || varStatusBadge['pending']}</td>
                  <td>${fundingBadge(v.funding || 'loan')}</td>
                  <td>${fmtDate(v.dateRaised)}</td>
                  <td>${fmtDate(v.dateApproved)}</td>
                  <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(v.notes || '—')}</td>
                  <td class="actions">
                    <button class="btn btn-ghost btn-sm" onclick="openEditVariation(${v.id})">✏️</button>
                    <button class="btn btn-danger-ghost btn-sm" onclick="deleteVariation(${v.id})">🗑</button>
                  </td>
                </tr>`).join('')}
              </tbody>
              <tfoot>
                <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                  <td colspan="2" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Net approved variations</td>
                  <td class="amount" style="padding:11px 16px;font-weight:700;color:${approvedVarTotal >= 0 ? 'var(--danger)' : 'var(--success)'}">${approvedVarTotal > 0 ? '+' : ''}${aud(approvedVarTotal)}</td>
                  <td colspan="6" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">Revised contract: <strong>${aud(revisedTotal)}</strong>${pendingVarTotal > 0 ? ` · <span style="color:#d97706">+${aud(pendingVarTotal)} pending</span>` : ''}</td>
                </tr>
              </tfoot>
            </table>
          </div>`}
    </div>
  `;

  // Extras
  const extras = state.extras;
  const extrasTotalCost = extras.reduce((sum, e) => sum + (e.totalAmount || 0), 0);
  const extrasPaid = extras.reduce((sum, e) => sum + (e.amountPaid || 0), 0);

  html += `
    <div class="section" style="border-left:4px solid ${colors.build.extras}">
      <div class="section-header">
        <div>
          <div class="section-title">Outside Contract</div>
          <div class="section-subtitle">Landscaping, solar, and other extras</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          ${extrasTotalCost > 0 ? `<span class="contract-total-badge">${aud(extrasPaid)} / ${aud(extrasTotalCost)}</span>` : ''}
          <button class="btn btn-primary btn-sm" onclick="openAddExtra()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Vendor</th><th>Total Cost</th><th>Paid</th><th>Remaining</th><th>Due Date</th><th>Status</th><th>Funding</th><th></th></tr></thead>
          <tbody>
            ${extras.length === 0 ? `<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>No items yet. Add landscaping, solar, or other extras.</div></td></tr>` : extras.map(e => {
              const rem = (e.totalAmount || 0) - (e.amountPaid || 0);
              const statusBadge = {
                'not-quoted': `<span class="badge unpaid">Not Quoted</span>`,
                'quoted':     `<span class="badge pending">Quoted</span>`,
                'approved':   `<span class="badge" style="background:#ede9fe;color:#5b21b6">Approved</span>`,
                'partial':    `<span class="badge partial">Partially Paid</span>`,
                'paid':       `<span class="badge paid">Paid</span>`,
              };
              const od = e.dueDate && isOverdue(e.dueDate) && e.status !== 'paid';
              const badge = statusBadge[e.status || 'not-quoted'] + (od ? ` <span class="badge overdue">Overdue</span>` : '');
              return `<tr>
                <td style="font-weight:500">${escHtml(e.name)}</td>
                <td>${e.vendor ? escHtml(e.vendor) : '<span style="color:var(--text-muted)">—</span>'}</td>
                <td class="amount">${e.totalAmount ? aud(e.totalAmount) : '<span class="amount muted">TBC</span>'}</td>
                <td class="amount">${aud(e.amountPaid)}</td>
                <td class="amount ${rem > 0 ? '' : 'muted'}">${rem > 0 ? aud(rem) : '—'}</td>
                <td>${fmtDate(e.dueDate)}</td>
                <td>${badge}</td>
                <td>${fundingBadge(e.funding || 'loan')}</td>
                <td class="actions">
                  ${attachBtn(`extra-${e.id}`, escAttr(e.name))}
                  <button class="btn btn-ghost btn-sm" onclick="openEditExtra(${e.id})">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="deleteExtra(${e.id})">🗑</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // ── Furniture ──────────────────────────────────
  const furn = state.furniture;
  const furnTotal    = furn.reduce((s, f) => s + (f.price || 0), 0);
  const furnPurchased = furn.filter(f => f.status === 'delivered' || f.status === 'ordered');
  const furnToBuy    = furn.filter(f => f.status === 'to-purchase');
  const furnCostDone = furnPurchased.reduce((s, f) => s + (f.price || 0), 0);
  const furnCostLeft = furnToBuy.reduce((s, f) => s + (f.price || 0), 0);

  const FURN_ROOMS = ['Living Room','Dining Room','Kitchen','Master Bedroom','Bedroom 2','Bedroom 3','Study / Office','Bathroom','Laundry','Outdoor / Alfresco','Other'];

  html += `
    <div class="section" style="border-left:4px solid ${colors.build.furniture}">
      <div class="section-header">
        <div>
          <div class="section-title">Furniture</div>
          <div class="section-subtitle">${furn.length} items · ${aud(furnCostDone)} purchased · ${aud(furnCostLeft)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${furn.length > 0 ? `
          <div style="display:flex;gap:6px">
            <span class="badge paid">${furn.filter(f=>f.status==='delivered').length} delivered</span>
            <span class="badge partial">${furn.filter(f=>f.status==='ordered').length} ordered</span>
            <span class="badge unpaid">${furnToBuy.length} to buy</span>
          </div>` : ''}
          <button class="btn btn-primary btn-sm" onclick="openAddFurniture()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${furn.length === 0
              ? `<tr><td colspan="8"><div class="empty"><div class="empty-icon">🛋️</div>No furniture items yet. Add sofas, beds, appliances and more.</div></td></tr>`
              : furn.map(f => {
                  const statusMap = {
                    'to-purchase': `<span class="badge unpaid">To Purchase</span>`,
                    'ordered':     `<span class="badge partial">Ordered</span>`,
                    'delivered':   `<span class="badge paid">Delivered</span>`,
                  };
                  const delivOd = f.deliveryDate && f.status !== 'delivered' && isOverdue(f.deliveryDate);
                  return `<tr>
                    <td style="font-weight:500">${escHtml(f.name)}</td>
                    <td style="color:var(--text-muted)">${escHtml(f.room || '—')}</td>
                    <td>${f.vendor ? escHtml(f.vendor) : '<span style="color:var(--text-muted)">—</span>'}</td>
                    <td class="amount">${f.price ? aud(f.price) : '<span class="amount muted">TBC</span>'}</td>
                    <td>${statusMap[f.status] || statusMap['to-purchase']}</td>
                    <td>${fundingBadge(f.funding || 'own-funds')}</td>
                    <td>${f.deliveryDate ? (delivOd ? `<span class="badge overdue">${fmtDate(f.deliveryDate)}</span>` : fmtDate(f.deliveryDate)) : '<span style="color:var(--text-muted)">—</span>'}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(f.notes || '—')}</td>
                    <td class="actions">
                      ${attachBtn(`furniture-${f.id}`, escAttr(f.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditFurniture(${f.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteFurniture(${f.id})">🗑</button>
                    </td>
                  </tr>`;
                }).join('')}
          </tbody>
          ${furn.length > 0 ? `
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${aud(furnTotal)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${aud(furnCostDone)} purchased · ${aud(furnCostLeft)} still to buy
              </td>
            </tr>
          </tfoot>` : ''}
        </table>
      </div>
    </div>
  `;

  // ── Appliances ──────────────────────────────────
  const appl = state.appliances;
  const applTotal     = appl.reduce((s, a) => s + (a.price || 0), 0);
  const applPurchased = appl.filter(a => a.status === 'delivered' || a.status === 'ordered');
  const applToBuy     = appl.filter(a => a.status === 'to-purchase');
  const applCostDone  = applPurchased.reduce((s, a) => s + (a.price || 0), 0);
  const applCostLeft  = applToBuy.reduce((s, a) => s + (a.price || 0), 0);

  html += `
    <div class="section" style="border-left:4px solid ${colors.build.appliances}">
      <div class="section-header">
        <div>
          <div class="section-title">Appliances</div>
          <div class="section-subtitle">${appl.length} items · ${aud(applCostDone)} purchased · ${aud(applCostLeft)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${appl.length > 0 ? `
          <div style="display:flex;gap:6px">
            <span class="badge paid">${appl.filter(a=>a.status==='delivered').length} delivered</span>
            <span class="badge partial">${appl.filter(a=>a.status==='ordered').length} ordered</span>
            <span class="badge unpaid">${applToBuy.length} to buy</span>
          </div>` : ''}
          <button class="btn btn-primary btn-sm" onclick="openAddAppliance()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${appl.length === 0
              ? `<tr><td colspan="9"><div class="empty"><div class="empty-icon">🍳</div>No appliances yet. Add fridges, dishwashers, ovens and more.</div></td></tr>`
              : appl.map(a => {
                  const statusMap = {
                    'to-purchase': `<span class="badge unpaid">To Purchase</span>`,
                    'ordered':     `<span class="badge partial">Ordered</span>`,
                    'delivered':   `<span class="badge paid">Delivered</span>`,
                  };
                  const delivOd = a.deliveryDate && a.status !== 'delivered' && isOverdue(a.deliveryDate);
                  return `<tr>
                    <td style="font-weight:500">${escHtml(a.name)}</td>
                    <td style="color:var(--text-muted)">${escHtml(a.room || '—')}</td>
                    <td>${a.vendor ? escHtml(a.vendor) : '<span style="color:var(--text-muted)">—</span>'}</td>
                    <td class="amount">${a.price ? aud(a.price) : '<span class="amount muted">TBC</span>'}</td>
                    <td>${statusMap[a.status] || statusMap['to-purchase']}</td>
                    <td>${fundingBadge(a.funding || 'own-funds')}</td>
                    <td>${a.deliveryDate ? (delivOd ? `<span class="badge overdue">${fmtDate(a.deliveryDate)}</span>` : fmtDate(a.deliveryDate)) : '<span style="color:var(--text-muted)">—</span>'}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(a.notes || '—')}</td>
                    <td class="actions">
                      ${attachBtn(`appliance-${a.id}`, escAttr(a.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditAppliance(${a.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteAppliance(${a.id})">🗑</button>
                    </td>
                  </tr>`;
                }).join('')}
          </tbody>
          ${appl.length > 0 ? `
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${aud(applTotal)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${aud(applCostDone)} purchased · ${aud(applCostLeft)} still to buy
              </td>
            </tr>
          </tfoot>` : ''}
        </table>
      </div>
    </div>
  `;

  document.getElementById('build-content').innerHTML = html;
}

// ─────────────────────────────────────────────────
// MONTHLY BUDGET
// ─────────────────────────────────────────────────

// freqToMonthly imported from ./utils.js

// freqLabel, freqDisplay, freqDisplayItem, freqLabelItem, itemMonthly, monthlyTotal
// imported from ./sections/format.js

export function expenseCategories() { return state.expenseCategories || DEFAULT_DATA.expenseCategories; }
export function incomeCategories()  { return state.incomeCategories  || DEFAULT_DATA.incomeCategories; }

// ─────────────────────────────────────────────────
// GOALS
// ─────────────────────────────────────────────────

export const GOAL_TYPES = [
  { value: 'spending',  label: 'Spending Limit',   icon: '📉' },
  { value: 'savings',   label: 'Savings Target',   icon: '🏦' },
  { value: 'income',    label: 'Income Target',    icon: '📈' },
];

export function goalProgress(g) {
  if (g.type === 'spending') {
    // Use latest month actual for that category
    const months = Object.keys(state.budget.actuals).sort().reverse();
    let actual = null;
    for (const m of months) {
      const catTotal = (getMonthData(m).expenses || [])
        .filter(e => (e.category || 'Other') === g.category)
        .reduce((s, e) => s + (state.budget.actuals[m]?.[e.id] || 0), 0);
      if (catTotal > 0) { actual = catTotal; break; }
    }
    const target = g.targetMonthly || 0;
    if (actual === null) return { pct: null, label: 'No actuals yet', actual: null, target };
    const pct = target > 0 ? Math.max(0, Math.min(100, (actual / target) * 100)) : 0;
    const ok = actual <= target;
    return { pct, label: `${aud(actual)} actual vs ${aud(target)} limit`, actual, target, ok };
  }
  if (g.type === 'savings') {
    const cur = g.currentSaved || 0;
    const tgt = g.targetTotal || 1;
    const pct = Math.min(100, (cur / tgt) * 100);
    return { pct, label: `${aud(cur)} of ${aud(tgt)} saved`, ok: cur >= tgt };
  }
  if (g.type === 'income') {
    const cur = monthlyTotal(getMonthData(selectedBudgetMonth).income);
    const tgt = g.targetMonthly || 1;
    const pct = Math.min(100, (cur / tgt) * 100);
    return { pct, label: `${aud(cur)}/mo of ${aud(tgt)}/mo target`, ok: cur >= tgt };
  }
  return { pct: 0, label: '', ok: false };
}


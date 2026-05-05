// Vehicles section
import { state } from '../store.js';
import { aud, escHtml, escAttr, fmtDate, nextId } from './format.js';


export function renderVehicles() {
  const vehicles = state.vehicles || [];

  if (vehicles.length === 0) {
    document.getElementById('vehicles-content').innerHTML = `
      <div style="background:#fff;border:2px dashed #cbd5e1;border-radius:16px;padding:36px 24px;margin-top:8px">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
          <div style="font-size:40px">🚗</div>
          <div>
            <div style="font-size:17px;font-weight:700;color:#1e293b">No vehicles yet</div>
            <div style="font-size:13px;color:#64748b;margin-top:4px">Track rego, insurance and service reminders — never miss a renewal.</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:24px">
          <div style="background:#f0f9ff;border-radius:10px;padding:12px;text-align:center">
            <div style="font-size:20px;margin-bottom:4px">📋</div>
            <div style="font-size:11px;font-weight:600;color:#374151">Rego tracking</div>
          </div>
          <div style="background:#f0fdf4;border-radius:10px;padding:12px;text-align:center">
            <div style="font-size:20px;margin-bottom:4px">🛡️</div>
            <div style="font-size:11px;font-weight:600;color:#374151">Insurance</div>
          </div>
          <div style="background:#fef9c3;border-radius:10px;padding:12px;text-align:center">
            <div style="font-size:20px;margin-bottom:4px">🔧</div>
            <div style="font-size:11px;font-weight:600;color:#374151">Services</div>
          </div>
        </div>
        <button onclick="openVehicleForm()" style="width:100%;background:#0891b2;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:600;cursor:pointer">Add your first vehicle →</button>
      </div>`;
    return;
  }

  let html = `<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary btn-sm" onclick="openVehicleForm()">+ Add Vehicle</button>
  </div>`;

  vehicles.forEach(v => {
    const today = new Date();
    const badges = [];

    // Rego badge
    if (v.regoExpiry) {
      const regoDays = Math.ceil((new Date(v.regoExpiry) - today) / 86400000);
      if (regoDays < 0) badges.push({ cls: 'red', text: `Rego expired ${Math.abs(regoDays)}d ago` });
      else if (regoDays <= 30) badges.push({ cls: 'amber', text: `Rego expires in ${regoDays}d` });
      else badges.push({ cls: 'green', text: `Rego: ${new Date(v.regoExpiry).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })}` });
    }

    // Insurance badge
    if (v.insurance && v.insurance.renewalDate) {
      const insDays = Math.ceil((new Date(v.insurance.renewalDate) - today) / 86400000);
      if (insDays < 0) badges.push({ cls: 'red', text: `Insurance expired ${Math.abs(insDays)}d ago` });
      else if (insDays <= 30) badges.push({ cls: 'amber', text: `Insurance renews in ${insDays}d` });
      else badges.push({ cls: 'green', text: `Insured until ${new Date(v.insurance.renewalDate).toLocaleDateString('en-AU', { day:'numeric', month:'short' })}` });
    }

    // Service badge
    if (v.serviceInterval && v.odometer && v.services && v.services.length > 0) {
      const lastService = v.services.sort((a, b) => b.odometer - a.odometer)[0];
      const kmSince = v.odometer.reading - lastService.odometer;
      const kmUntil = v.serviceInterval - kmSince;
      if (kmUntil <= 0) badges.push({ cls: 'red', text: `Service overdue by ${Math.abs(kmUntil).toLocaleString()}km` });
      else if (kmUntil <= 2000) badges.push({ cls: 'amber', text: `Service due in ${kmUntil.toLocaleString()}km` });
      else badges.push({ cls: 'green', text: `Next service in ${kmUntil.toLocaleString()}km` });
    }

    const badgesHtml = badges.map(b => `<span class="veh-badge ${b.cls}">${b.text}</span>`).join('');

    // Stats
    const totalServiceCost = (v.services || []).reduce((s, svc) => s + (svc.cost || 0), 0);
    // Annual cost: rego + insurance + services in last 12 months
    const twelveMonthsAgo = new Date(); twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
    const recentServiceCost = (v.services || []).filter(s => s.date && new Date(s.date) >= twelveMonthsAgo).reduce((s, svc) => s + (svc.cost || 0), 0);
    const regoBill = (state.bills || []).find(b => b._vehicleRef === `vehicle_${v.id}_rego`);
    const insBill  = (state.bills || []).find(b => b._vehicleRef === `vehicle_${v.id}_insurance`);
    const annualCost = recentServiceCost + (regoBill ? parseFloat(regoBill.amount) || 0 : 0) + (insBill ? parseFloat(insBill.amount) || 0 : 0);
    const monthlyCost = Math.round(annualCost / 12);

    html += `
      <div class="veh-card">
        <div class="veh-card-header">
          <div class="veh-icon">${v.fuel === 'ev' ? '⚡' : '🚗'}</div>
          <div style="flex:1;min-width:0">
            <div class="veh-name">${escHtml(v.name)}</div>
            ${v.plate ? `<span class="veh-plate">${escHtml(v.plate)}${v.state ? ' · ' + v.state : ''}</span>` : ''}
          </div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-sm" onclick="openVehicleForm(${v.id})">Edit</button>
            <button class="btn btn-sm" style="color:var(--danger)" onclick="deleteVehicle(${v.id})">Delete</button>
          </div>
        </div>

        ${badgesHtml ? `<div class="veh-badges">${badgesHtml}</div>` : ''}

        <div class="veh-stat-grid">
          ${v.odometer ? `<div class="veh-stat"><div class="veh-stat-label">Odometer</div><div class="veh-stat-value">${v.odometer.reading.toLocaleString()} km</div></div>` : ''}
          ${v.fuel ? `<div class="veh-stat"><div class="veh-stat-label">Fuel</div><div class="veh-stat-value" style="text-transform:capitalize">${v.fuel}</div></div>` : ''}
          ${v.insurance && v.insurance.provider ? `<div class="veh-stat"><div class="veh-stat-label">Insurer</div><div class="veh-stat-value">${escHtml(v.insurance.provider)}</div></div>` : ''}
          <div class="veh-stat"><div class="veh-stat-label">Services (all time)</div><div class="veh-stat-value">${aud(totalServiceCost)}</div></div>
          ${annualCost > 0 ? `<div class="veh-stat"><div class="veh-stat-label">Annual Cost</div><div class="veh-stat-value">${aud(annualCost)}</div></div>` : ''}
          ${monthlyCost > 0 ? `<div class="veh-stat"><div class="veh-stat-label">Monthly Cost</div><div class="veh-stat-value">${aud(monthlyCost)}/mo</div></div>` : ''}
        </div>

        ${regoBill || insBill ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
          ${regoBill ? `<span style="font-size:11px;color:#0369a1;cursor:pointer;font-weight:600" onclick="activateTab('bills')">Rego bill: ${aud(parseFloat(regoBill.amount)||0)} →</span>` : ''}
          ${insBill ? `<span style="font-size:11px;color:#0369a1;cursor:pointer;font-weight:600" onclick="activateTab('bills')">Insurance bill: ${aud(parseFloat(insBill.amount)||0)} →</span>` : ''}
          <span style="font-size:11px;color:var(--text-muted);cursor:pointer" onclick="activateTab('budget')">See in Budget →</span>
        </div>` : ''}

        <!-- Service History -->
        <div class="section" style="margin-top:8px">
          <div class="section-header">
            <div class="section-title">Service History</div>
            <button class="btn btn-sm" onclick="openServiceForm(${v.id})">+ Add Service</button>
          </div>
          ${(v.services || []).length === 0
            ? `<div style="padding:16px 20px;color:var(--text-muted);font-size:13px;text-align:center">No service records yet</div>`
            : `<div class="table-wrap"><table>
                <thead><tr><th>Date</th><th>Type</th><th>Odometer</th><th>Provider</th><th class="amount">Cost</th><th></th></tr></thead>
                <tbody>
                  ${[...v.services].sort((a,b) => new Date(b.date) - new Date(a.date)).map(s => `<tr>
                    <td style="white-space:nowrap">${s.date ? new Date(s.date).toLocaleDateString('en-AU', {day:'numeric',month:'short',year:'numeric'}) : '—'}</td>
                    <td style="font-weight:500">${escHtml(s.type || '—')}</td>
                    <td>${s.odometer ? s.odometer.toLocaleString() + ' km' : '—'}</td>
                    <td style="color:var(--text-muted)">${escHtml(s.provider || '—')}</td>
                    <td class="amount">${s.cost ? aud(s.cost) : '—'}</td>
                    <td><button class="btn btn-sm" style="color:var(--danger);font-size:11px" onclick="deleteService(${v.id},${s.id})">×</button></td>
                  </tr>`).join('')}
                </tbody>
              </table></div>`}
        </div>
      </div>`;
  });

  document.getElementById('vehicles-content').innerHTML = html;
}

export function openVehicleForm(editId) {
  const v = editId ? (state.vehicles || []).find(v => v.id === editId) : null;
  const isEdit = !!v;

  document.getElementById('modal-title').textContent = isEdit ? `Edit ${v.name}` : 'Add Vehicle';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">Vehicle Name</label>
      <input class="form-input" id="vf-name" type="text" maxlength="200" value="${v ? escAttr(v.name) : ''}" placeholder="e.g. Mitsubishi Outlander">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Plate Number</label>
        <input class="form-input" id="vf-plate" type="text" maxlength="200" value="${v ? escAttr(v.plate || '') : ''}" placeholder="ABC123" style="text-transform:uppercase">
      </div>
      <div class="form-group">
        <label class="form-label">State</label>
        <select class="form-select" id="vf-state">
          ${['SA','VIC','NSW','QLD','WA','TAS','NT','ACT'].map(s => `<option value="${s}"${v && v.state === s ? ' selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Fuel Type</label>
        <select class="form-select" id="vf-fuel">
          ${['petrol','diesel','hybrid','ev','lpg'].map(f => `<option value="${f}"${v && v.fuel === f ? ' selected' : ''}>${f.charAt(0).toUpperCase() + f.slice(1)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Rego Expiry</label>
        <input class="form-input" id="vf-rego" type="date" value="${v ? v.regoExpiry || '' : ''}">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Odometer (km)</label>
        <input class="form-input" id="vf-odo" type="number" max="99999999" value="${v && v.odometer ? v.odometer.reading : ''}" placeholder="42350">
      </div>
      <div class="form-group">
        <label class="form-label">Service Interval (km)</label>
        <input class="form-input" id="vf-interval" type="number" max="99999999" value="${v ? v.serviceInterval || '' : '10000'}" placeholder="10000">
      </div>
    </div>
    <div style="border-top:1px solid var(--border);padding-top:16px;margin-top:8px">
      <div style="font-size:13px;font-weight:600;margin-bottom:12px">Insurance</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group">
          <label class="form-label">Provider</label>
          <input class="form-input" id="vf-ins-provider" type="text" maxlength="200" value="${v && v.insurance ? escAttr(v.insurance.provider || '') : ''}" placeholder="e.g. AAMI">
        </div>
        <div class="form-group">
          <label class="form-label">Policy Number</label>
          <input class="form-input" id="vf-ins-policy" type="text" maxlength="200" value="${v && v.insurance ? escAttr(v.insurance.policyNo || '') : ''}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Renewal Date</label>
        <input class="form-input" id="vf-ins-renewal" type="date" value="${v && v.insurance ? v.insurance.renewalDate || '' : ''}">
      </div>
    </div>`;

  document.getElementById('modal-footer').innerHTML = `
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveVehicle(${editId || 'null'})">Save</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

export function saveVehicle(editId) {
  const name = document.getElementById('vf-name')?.value.trim();
  if (!name) return;

  const data = {
    name,
    plate: (document.getElementById('vf-plate')?.value || '').trim().toUpperCase(),
    state: document.getElementById('vf-state')?.value || 'SA',
    fuel: document.getElementById('vf-fuel')?.value || 'petrol',
    regoExpiry: document.getElementById('vf-rego')?.value || '',
    odometer: {
      reading: parseInt(document.getElementById('vf-odo')?.value) || 0,
      date: new Date().toISOString().slice(0, 10)
    },
    serviceInterval: parseInt(document.getElementById('vf-interval')?.value) || 10000,
    insurance: {
      provider: document.getElementById('vf-ins-provider')?.value.trim() || '',
      policyNo: document.getElementById('vf-ins-policy')?.value.trim() || '',
      renewalDate: document.getElementById('vf-ins-renewal')?.value || ''
    }
  };

  if (editId) {
    const v = state.vehicles.find(v => v.id === editId);
    if (v) Object.assign(v, data);
  } else {
    data.id = state.vehicles.length ? Math.max(...state.vehicles.map(v => v.id)) + 1 : 1;
    data.services = [];
    state.vehicles.push(data);
  }

  // Sync rego & insurance to Bills & Subscriptions
  if (!state.bills) state.bills = [];
  _syncVehicleBill(data, 'rego', `Rego - ${data.name}`, data.regoExpiry, 0, 'Insurance');
  if (data.insurance && data.insurance.renewalDate) {
    _syncVehicleBill(data, 'insurance', `Insurance - ${data.name}`, data.insurance.renewalDate, 0, 'Insurance');
  }

  window.saveData(state);
  window.closeModal();
  window.renderAll();
}

export function _syncVehicleBill(vehicle, type, name, dueDate, amount, category) {
  if (!dueDate) return;
  // Tag format: vehicle bill entries carry a _vehicleRef to link back
  const tag = `vehicle_${vehicle.id || vehicle.name}_${type}`;
  const existing = state.bills.find(b => b._vehicleRef === tag);
  const entry = {
    name,
    amount: amount || (existing ? existing.amount : 0),
    category,
    frequency: 'Annual',
    autopay: false,
    startDate: dueDate,
    _vehicleRef: tag
  };
  if (existing) {
    Object.assign(existing, entry);
  } else {
    entry.id = uid();
    state.bills.push(entry);
  }
}

export function deleteVehicle(id) {
  if (!confirm('Delete this vehicle and all its service history?')) return;
  // Remove linked bills
  const tag = `vehicle_${id}_`;
  state.bills = (state.bills || []).filter(b => !(b._vehicleRef && b._vehicleRef.startsWith(tag)));
  state.vehicles = state.vehicles.filter(v => v.id !== id);
  window.saveData(state);
  window.renderAll();
}

export function openServiceForm(vehicleId) {
  document.getElementById('modal-title').textContent = 'Add Service Record';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">Service Type</label>
      <select class="form-select" id="sf-type">
        <option value="Full service">Full service</option>
        <option value="Oil change">Oil change</option>
        <option value="Tyres">Tyres</option>
        <option value="Brakes">Brakes</option>
        <option value="Battery">Battery</option>
        <option value="Inspection">Inspection</option>
        <option value="Repair">Repair</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" id="sf-date" type="date" value="${new Date().toISOString().slice(0,10)}">
      </div>
      <div class="form-group">
        <label class="form-label">Odometer (km)</label>
        <input class="form-input" id="sf-odo" type="number" max="99999999" placeholder="42350">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Provider</label>
        <input class="form-input" id="sf-provider" type="text" maxlength="200" placeholder="e.g. Ultra Tune">
      </div>
      <div class="form-group">
        <label class="form-label">Cost ($)</label>
        <input class="form-input" id="sf-cost" type="number" max="99999999" step="0.01" placeholder="450">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="sf-notes" type="text" maxlength="200" placeholder="e.g. Replaced timing belt">
    </div>`;

  document.getElementById('modal-footer').innerHTML = `
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveService(${vehicleId})">Save</button>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

export function saveService(vehicleId) {
  const v = state.vehicles.find(v => v.id === vehicleId);
  if (!v) return;
  if (!v.services) v.services = [];

  const svc = {
    id: v.services.length ? Math.max(...v.services.map(s => s.id)) + 1 : 1,
    date: document.getElementById('sf-date')?.value || '',
    odometer: parseInt(document.getElementById('sf-odo')?.value) || 0,
    type: document.getElementById('sf-type')?.value || 'Full service',
    provider: document.getElementById('sf-provider')?.value.trim() || '',
    cost: parseFloat(document.getElementById('sf-cost')?.value) || 0,
    notes: document.getElementById('sf-notes')?.value.trim() || ''
  };

  v.services.push(svc);

  // Update odometer if service odometer is higher
  if (svc.odometer > (v.odometer?.reading || 0)) {
    v.odometer = { reading: svc.odometer, date: svc.date };
  }

  // Log cost as budget actual under a Transport/Car expense
  if (svc.cost > 0 && svc.date) {
    const mo = svc.date.slice(0, 7); // YYYY-MM
    const md = window.getMonthData(mo);
    // Find a car/transport expense, or create one
    let carExp = md.expenses.find(e => e.name && e.name.toLowerCase().includes(v.name.toLowerCase()))
              || md.expenses.find(e => (e.category || '').toLowerCase() === 'transport')
              || md.expenses.find(e => (e.name || '').toLowerCase().includes('car'));
    if (!carExp) {
      carExp = { id: nextId(state.budget.expenses), name: `Car - ${v.name}`, amount: 0, frequency: 'monthly', category: 'Transport', dueDate: '', vendor: null };
      state.budget.expenses.push(carExp);
      if (window.isMonthCustomized(mo)) {
        const mb = state.budget.months[mo];
        carExp = { ...carExp, id: nextId(mb.expenses) };
        mb.expenses.push(carExp);
      }
    }
    if (!state.budget.actuals[mo]) state.budget.actuals[mo] = {};
    const entries = window.getActualEntries(carExp.id, mo);
    entries.push({ id: entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1, amount: svc.cost, date: svc.date, note: `${v.name}: ${svc.type}${svc.provider ? ' @ ' + svc.provider : ''}` });
    state.budget.actuals[mo][carExp.id] = entries;
  }

  window.saveData(state);
  window.closeModal();
  window.renderAll();
}

export function deleteService(vehicleId, serviceId) {
  const v = state.vehicles.find(v => v.id === vehicleId);
  if (!v) return;
  v.services = (v.services || []).filter(s => s.id !== serviceId);
  window.saveData(state);
  window.renderAll();
}


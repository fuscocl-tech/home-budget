import"./firebase-DD2PS53O.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t){return t===`daily`?e*365/12:t===`weekly`?e*52/12:t===`fortnightly`?e*26/12:t===`quarterly`?e/3:t===`annually`||t===`annual`?e/12:e}function t(e){let t=new Date;t.setHours(0,0,0,0);let n=e.frequency||`Monthly`;if(n===`Monthly`){let n=parseInt(e.dueDay)||1,r=new Date(t.getFullYear(),t.getMonth(),n);return r<t&&(r=new Date(t.getFullYear(),t.getMonth()+1,n)),r}let r=e.lastPaid?new Date(e.lastPaid):e.startDate?new Date(e.startDate):t;r.setHours(0,0,0,0);let i={Weekly:7,Fortnightly:14,Quarterly:91,Annually:365}[n]||30,a=new Date(r);for(;a<=t;)a=new Date(a.getTime()+i*864e5);return a}function n(e){let n=new Date;n.setHours(0,0,0,0);let r=t(e);return Math.round((r-n)/864e5)}var r={},i=new Set;function a(e){return i.add(e),()=>i.delete(e)}function o(e){r=e}var s=new Proxy({},{get(e,t){if(t!==`then`)return r[t]},set(e,t,n){return r[t]=n,!0},has(e,t){return t in r},ownKeys(){return Reflect.ownKeys(r)},getOwnPropertyDescriptor(e,t){let n=Object.getOwnPropertyDescriptor(r,t);return n?{...n,configurable:!0}:void 0}}),c={wallet:{navTab:`budget`,label:`Wallet`,tabs:[{tab:`budget`,label:`Budget`},{tab:`bills`,label:`Bills`},{tab:`networth`,label:`Net Worth`},{tab:`goals`,label:`Goals`},{tab:`insights`,label:`Insights`},{tab:`build`,label:`Build`}]},plan:{navTab:`planner`,label:`Plan`,tabs:[{tab:`planner`,label:`Planner`},{tab:`forecast`,label:`Forecast`},{tab:`meals`,label:`Meals`},{tab:`lunchbox`,label:`Lunchbox`},{tab:`pantry`,label:`Pantry`},{tab:`routines`,label:`Routines`},{tab:`lists`,label:`Lists`}]},home:{navTab:`documents`,label:`Home`,tabs:[{tab:`documents`,label:`Documents`},{tab:`vehicles`,label:`Vehicles`},{tab:`maintenance`,label:`Maintenance`},{tab:`kids`,label:`Kids`}]}},l=()=>{};function u(e){l=e}function d(e){for(let[t,n]of Object.entries(c))if(n.tabs.some(t=>t.tab===e))return t;return null}function f(){let e=document.querySelector(`.tab-panel.active`);return e?e.id.replace(`tab-`,``):`today`}function p(e){if(!e)return;let t=e.querySelector(`.section-pills`);if(!t)return;let n=t.scrollWidth-t.scrollLeft-t.clientWidth>4,r=t.scrollLeft>4;e.classList.toggle(`has-overflow-right`,n),e.classList.toggle(`has-overflow-left`,r)}function m(e){e===`subscriptions`&&(e=`bills`),e===`scenarios`&&(e=`insights`),e===`money`&&(e=`budget`),e===`dashboard`&&(e=`budget`),document.getElementById(`tab-`+e)||(e=`today`),typeof window._checkSettingsUnsaved==`function`&&f()===`settings`&&e!==`settings`&&window._checkSettingsUnsaved(e),document.querySelectorAll(`.nav-item, .nav-text-item, .bn-item`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.tab-panel`).forEach(e=>e.classList.remove(`active`));let t=document.getElementById(`tab-`+e);t&&t.classList.add(`active`);let n=d(e);if(n){let e=c[n].navTab;document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`))}else document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`));if(document.body.dataset.section=n||e,document.querySelectorAll(`.static-section-header`).forEach(e=>e.classList.remove(`active`)),n){let t=document.getElementById(n+`-section-header`);if(t){t.classList.add(`active`);let r=document.getElementById(n+`-header-date`);r&&(r.textContent=new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`})),t.querySelectorAll(`.section-pill`).forEach(t=>t.classList.toggle(`active`,t.dataset.pill===e)),requestAnimationFrame(()=>t.querySelectorAll(`.section-pills-wrap`).forEach(p))}}l()}function h(e){e===`subscriptions`&&(e=`bills`),e===`scenarios`&&(e=`insights`),e===`money`&&(e=`budget`),e===`dashboard`&&(e=`budget`),(location.hash.slice(1)||`today`)!==e&&history.pushState({tab:e},``,`#`+e),m(e)}window.addEventListener(`popstate`,e=>{m(e.state?.tab||location.hash.slice(1)||`today`)}),(function(){let e=location.hash.slice(1)||`today`;history.replaceState({tab:e},``,e===`today`?location.pathname+location.search:`#`+e)})();function g(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function _(e){return g(e).replace(/\\/g,`\\\\`)}var v=new Intl.NumberFormat(`en-AU`,{style:`currency`,currency:`AUD`,maximumFractionDigits:0}),y=new Intl.NumberFormat(`en-AU`,{style:`currency`,currency:`AUD`,minimumFractionDigits:2,maximumFractionDigits:2});function b(e){return v.format(e||0)}function x(e){return y.format(e||0)}function S(e){let t=Math.abs(e),n=t>=1e6?(t/1e6).toFixed(2)+`M`:t>=1e3?(t/1e3).toFixed(1)+`k`:t.toFixed(0);return(e<0?`-$`:`$`)+n}function C(e){if(!e)return`—`;let[t,n,r]=e.split(`-`);return`${r}/${n}/${t}`}function w(e){return e?new Date(e)<new Date:!1}function T(e){return{daily:`/day`,weekly:`/wk`,fortnightly:`/fn`,monthly:`/mo`,quarterly:`/qtr`,annually:`/yr`,annual:`/yr`}[e]||`/mo`}function ee(e){return{daily:`Daily`,weekly:`Weekly`,fortnightly:`Fortnightly`,monthly:`Monthly`,quarterly:`Quarterly`,annually:`Annually`,annual:`Annually`,custom:`Custom`}[e]||`Monthly`}function E(e){return(e.frequency||`monthly`)===`custom`?`Every ${e.customEvery||1} ${e.customUnit||`weeks`}`:ee(e.frequency||`monthly`)}function te(e){return(e.frequency||`monthly`)===`custom`?`/${e.customEvery||1}${e.customUnit===`months`?`mo`:`wk`}`:T(e.frequency||`monthly`)}function D(t){let n=t.frequency||`monthly`;if(n===`custom`){let e=t.customEvery||1;return t.customUnit===`months`?(t.amount||0)/e:(t.amount||0)*52/(e*12)}return e(t.amount||0,n)}function O(e){return e.reduce((e,t)=>e+D(t),0)}function k(e){return e.length?Math.max(...e.map(e=>e.id))+1:1}function A(e){function t(e){if(!(!e||typeof e!=`object`))for(let n of Object.keys(e))typeof e[n]==`string`&&e[n].length>500?e[n]=e[n].slice(0,500):Array.isArray(e[n])?e[n].forEach(e=>t(e)):typeof e[n]==`object`&&e[n]!==null&&t(e[n])}t(e)}function ne(){let e=s.vehicles||[];if(e.length===0){document.getElementById(`vehicles-content`).innerHTML=`
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
      </div>`;return}let t=`<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary btn-sm" onclick="openVehicleForm()">+ Add Vehicle</button>
  </div>`;e.forEach(e=>{let n=new Date,r=[];if(e.regoExpiry){let t=Math.ceil((new Date(e.regoExpiry)-n)/864e5);t<0?r.push({cls:`red`,text:`Rego expired ${Math.abs(t)}d ago`}):t<=30?r.push({cls:`amber`,text:`Rego expires in ${t}d`}):r.push({cls:`green`,text:`Rego: ${new Date(e.regoExpiry).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}`})}if(e.insurance&&e.insurance.renewalDate){let t=Math.ceil((new Date(e.insurance.renewalDate)-n)/864e5);t<0?r.push({cls:`red`,text:`Insurance expired ${Math.abs(t)}d ago`}):t<=30?r.push({cls:`amber`,text:`Insurance renews in ${t}d`}):r.push({cls:`green`,text:`Insured until ${new Date(e.insurance.renewalDate).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`})}if(e.serviceInterval&&e.odometer&&e.services&&e.services.length>0){let t=e.services.sort((e,t)=>t.odometer-e.odometer)[0],n=e.odometer.reading-t.odometer,i=e.serviceInterval-n;i<=0?r.push({cls:`red`,text:`Service overdue by ${Math.abs(i).toLocaleString()}km`}):i<=2e3?r.push({cls:`amber`,text:`Service due in ${i.toLocaleString()}km`}):r.push({cls:`green`,text:`Next service in ${i.toLocaleString()}km`})}let i=r.map(e=>`<span class="veh-badge ${e.cls}">${e.text}</span>`).join(``),a=(e.services||[]).reduce((e,t)=>e+(t.cost||0),0),o=new Date;o.setFullYear(o.getFullYear()-1);let c=(e.services||[]).filter(e=>e.date&&new Date(e.date)>=o).reduce((e,t)=>e+(t.cost||0),0),l=(s.bills||[]).find(t=>t._vehicleRef===`vehicle_${e.id}_rego`),u=(s.bills||[]).find(t=>t._vehicleRef===`vehicle_${e.id}_insurance`),d=c+(l&&parseFloat(l.amount)||0)+(u&&parseFloat(u.amount)||0),f=Math.round(d/12);t+=`
      <div class="veh-card">
        <div class="veh-card-header">
          <div class="veh-icon">${e.fuel===`ev`?`⚡`:`🚗`}</div>
          <div style="flex:1;min-width:0">
            <div class="veh-name">${g(e.name)}</div>
            ${e.plate?`<span class="veh-plate">${g(e.plate)}${e.state?` · `+e.state:``}</span>`:``}
          </div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-sm" onclick="openVehicleForm(${e.id})">Edit</button>
            <button class="btn btn-sm" style="color:var(--danger)" onclick="deleteVehicle(${e.id})">Delete</button>
          </div>
        </div>

        ${i?`<div class="veh-badges">${i}</div>`:``}

        <div class="veh-stat-grid">
          ${e.odometer?`<div class="veh-stat"><div class="veh-stat-label">Odometer</div><div class="veh-stat-value">${e.odometer.reading.toLocaleString()} km</div></div>`:``}
          ${e.fuel?`<div class="veh-stat"><div class="veh-stat-label">Fuel</div><div class="veh-stat-value" style="text-transform:capitalize">${e.fuel}</div></div>`:``}
          ${e.insurance&&e.insurance.provider?`<div class="veh-stat"><div class="veh-stat-label">Insurer</div><div class="veh-stat-value">${g(e.insurance.provider)}</div></div>`:``}
          <div class="veh-stat"><div class="veh-stat-label">Services (all time)</div><div class="veh-stat-value">${b(a)}</div></div>
          ${d>0?`<div class="veh-stat"><div class="veh-stat-label">Annual Cost</div><div class="veh-stat-value">${b(d)}</div></div>`:``}
          ${f>0?`<div class="veh-stat"><div class="veh-stat-label">Monthly Cost</div><div class="veh-stat-value">${b(f)}/mo</div></div>`:``}
        </div>

        ${l||u?`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
          ${l?`<span style="font-size:11px;color:#0369a1;cursor:pointer;font-weight:600" onclick="activateTab('bills')">Rego bill: ${b(parseFloat(l.amount)||0)} →</span>`:``}
          ${u?`<span style="font-size:11px;color:#0369a1;cursor:pointer;font-weight:600" onclick="activateTab('bills')">Insurance bill: ${b(parseFloat(u.amount)||0)} →</span>`:``}
          <span style="font-size:11px;color:var(--text-muted);cursor:pointer" onclick="activateTab('budget')">See in Budget →</span>
        </div>`:``}

        <!-- Service History -->
        <div class="section" style="margin-top:8px">
          <div class="section-header">
            <div class="section-title">Service History</div>
            <button class="btn btn-sm" onclick="openServiceForm(${e.id})">+ Add Service</button>
          </div>
          ${(e.services||[]).length===0?`<div style="padding:16px 20px;color:var(--text-muted);font-size:13px;text-align:center">No service records yet</div>`:`<div class="table-wrap"><table>
                <thead><tr><th>Date</th><th>Type</th><th>Odometer</th><th>Provider</th><th class="amount">Cost</th><th></th></tr></thead>
                <tbody>
                  ${[...e.services].sort((e,t)=>new Date(t.date)-new Date(e.date)).map(t=>`<tr>
                    <td style="white-space:nowrap">${t.date?new Date(t.date).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`}):`—`}</td>
                    <td style="font-weight:500">${g(t.type||`—`)}</td>
                    <td>${t.odometer?t.odometer.toLocaleString()+` km`:`—`}</td>
                    <td style="color:var(--text-muted)">${g(t.provider||`—`)}</td>
                    <td class="amount">${t.cost?b(t.cost):`—`}</td>
                    <td><button class="btn btn-sm" style="color:var(--danger);font-size:11px" onclick="deleteService(${e.id},${t.id})">×</button></td>
                  </tr>`).join(``)}
                </tbody>
              </table></div>`}
        </div>
      </div>`}),document.getElementById(`vehicles-content`).innerHTML=t}function re(e){let t=e?(s.vehicles||[]).find(t=>t.id===e):null,n=!!t;document.getElementById(`modal-title`).textContent=n?`Edit ${t.name}`:`Add Vehicle`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Vehicle Name</label>
      <input class="form-input" id="vf-name" type="text" maxlength="200" value="${t?_(t.name):``}" placeholder="e.g. Mitsubishi Outlander">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Plate Number</label>
        <input class="form-input" id="vf-plate" type="text" maxlength="200" value="${t?_(t.plate||``):``}" placeholder="ABC123" style="text-transform:uppercase">
      </div>
      <div class="form-group">
        <label class="form-label">State</label>
        <select class="form-select" id="vf-state">
          ${[`SA`,`VIC`,`NSW`,`QLD`,`WA`,`TAS`,`NT`,`ACT`].map(e=>`<option value="${e}"${t&&t.state===e?` selected`:``}>${e}</option>`).join(``)}
        </select>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Fuel Type</label>
        <select class="form-select" id="vf-fuel">
          ${[`petrol`,`diesel`,`hybrid`,`ev`,`lpg`].map(e=>`<option value="${e}"${t&&t.fuel===e?` selected`:``}>${e.charAt(0).toUpperCase()+e.slice(1)}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Rego Expiry</label>
        <input class="form-input" id="vf-rego" type="date" value="${t&&t.regoExpiry||``}">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Odometer (km)</label>
        <input class="form-input" id="vf-odo" type="number" max="99999999" value="${t&&t.odometer?t.odometer.reading:``}" placeholder="42350">
      </div>
      <div class="form-group">
        <label class="form-label">Service Interval (km)</label>
        <input class="form-input" id="vf-interval" type="number" max="99999999" value="${t?t.serviceInterval||``:`10000`}" placeholder="10000">
      </div>
    </div>
    <div style="border-top:1px solid var(--border);padding-top:16px;margin-top:8px">
      <div style="font-size:13px;font-weight:600;margin-bottom:12px">Insurance</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group">
          <label class="form-label">Provider</label>
          <input class="form-input" id="vf-ins-provider" type="text" maxlength="200" value="${t&&t.insurance?_(t.insurance.provider||``):``}" placeholder="e.g. AAMI">
        </div>
        <div class="form-group">
          <label class="form-label">Policy Number</label>
          <input class="form-input" id="vf-ins-policy" type="text" maxlength="200" value="${t&&t.insurance?_(t.insurance.policyNo||``):``}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Renewal Date</label>
        <input class="form-input" id="vf-ins-renewal" type="date" value="${t&&t.insurance&&t.insurance.renewalDate||``}">
      </div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveVehicle(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function ie(e){let t=document.getElementById(`vf-name`)?.value.trim();if(!t)return;let n={name:t,plate:(document.getElementById(`vf-plate`)?.value||``).trim().toUpperCase(),state:document.getElementById(`vf-state`)?.value||`SA`,fuel:document.getElementById(`vf-fuel`)?.value||`petrol`,regoExpiry:document.getElementById(`vf-rego`)?.value||``,odometer:{reading:parseInt(document.getElementById(`vf-odo`)?.value)||0,date:new Date().toISOString().slice(0,10)},serviceInterval:parseInt(document.getElementById(`vf-interval`)?.value)||1e4,insurance:{provider:document.getElementById(`vf-ins-provider`)?.value.trim()||``,policyNo:document.getElementById(`vf-ins-policy`)?.value.trim()||``,renewalDate:document.getElementById(`vf-ins-renewal`)?.value||``}};if(e){let t=s.vehicles.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=s.vehicles.length?Math.max(...s.vehicles.map(e=>e.id))+1:1,n.services=[],s.vehicles.push(n);s.bills||(s.bills=[]),j(n,`rego`,`Rego - ${n.name}`,n.regoExpiry,0,`Insurance`),n.insurance&&n.insurance.renewalDate&&j(n,`insurance`,`Insurance - ${n.name}`,n.insurance.renewalDate,0,`Insurance`),window.saveData(s),window.closeModal(),window.renderAll()}function j(e,t,n,r,i,a){if(!r)return;let o=`vehicle_${e.id||e.name}_${t}`,c=s.bills.find(e=>e._vehicleRef===o),l={name:n,amount:i||(c?c.amount:0),category:a,frequency:`Annual`,autopay:!1,startDate:r,_vehicleRef:o};c?Object.assign(c,l):(l.id=uid(),s.bills.push(l))}function ae(e){if(!confirm(`Delete this vehicle and all its service history?`))return;let t=`vehicle_${e}_`;s.bills=(s.bills||[]).filter(e=>!(e._vehicleRef&&e._vehicleRef.startsWith(t))),s.vehicles=s.vehicles.filter(t=>t.id!==e),window.saveData(s),window.renderAll()}function oe(e){document.getElementById(`modal-title`).textContent=`Add Service Record`,document.getElementById(`modal-body`).innerHTML=`
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
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveService(${e})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function M(e){let t=s.vehicles.find(t=>t.id===e);if(!t)return;t.services||(t.services=[]);let n={id:t.services.length?Math.max(...t.services.map(e=>e.id))+1:1,date:document.getElementById(`sf-date`)?.value||``,odometer:parseInt(document.getElementById(`sf-odo`)?.value)||0,type:document.getElementById(`sf-type`)?.value||`Full service`,provider:document.getElementById(`sf-provider`)?.value.trim()||``,cost:parseFloat(document.getElementById(`sf-cost`)?.value)||0,notes:document.getElementById(`sf-notes`)?.value.trim()||``};if(t.services.push(n),n.odometer>(t.odometer?.reading||0)&&(t.odometer={reading:n.odometer,date:n.date}),n.cost>0&&n.date){let e=n.date.slice(0,7),r=window.getMonthData(e),i=r.expenses.find(e=>e.name&&e.name.toLowerCase().includes(t.name.toLowerCase()))||r.expenses.find(e=>(e.category||``).toLowerCase()===`transport`)||r.expenses.find(e=>(e.name||``).toLowerCase().includes(`car`));if(!i&&(i={id:k(s.budget.expenses),name:`Car - ${t.name}`,amount:0,frequency:`monthly`,category:`Transport`,dueDate:``,vendor:null},s.budget.expenses.push(i),window.isMonthCustomized(e))){let t=s.budget.months[e];i={...i,id:k(t.expenses)},t.expenses.push(i)}s.budget.actuals[e]||(s.budget.actuals[e]={});let a=window.getActualEntries(i.id,e);a.push({id:a.length?Math.max(...a.map(e=>e.id))+1:1,amount:n.cost,date:n.date,note:`${t.name}: ${n.type}${n.provider?` @ `+n.provider:``}`}),s.budget.actuals[e][i.id]=a}window.saveData(s),window.closeModal(),window.renderAll()}function se(e,t){let n=s.vehicles.find(t=>t.id===e);n&&(n.services=(n.services||[]).filter(e=>e.id!==t),window.saveData(s),window.renderAll())}var ce=[{key:`Insurance`,icon:`🛡️`,bg:`#eff6ff`},{key:`Identity`,icon:`🪪`,bg:`#ecfeff`},{key:`Warranty`,icon:`📦`,bg:`#fffbeb`},{key:`Financial`,icon:`🏦`,bg:`#faf5ff`},{key:`Medical`,icon:`🏥`,bg:`#fef2f2`},{key:`Property`,icon:`🏠`,bg:`#f0f9ff`},{key:`Vehicle`,icon:`🚗`,bg:`#f5f3ff`},{key:`Other`,icon:`📄`,bg:`#f8fafc`}],le=``;function ue(e){return ce.find(t=>t.key===e)||ce[ce.length-1]}function de(){let e=s.documents||[],t=new Date;le.toLowerCase();let n=e,r=e.filter(e=>{if(!e.expiryDate)return!1;let n=Math.ceil((new Date(e.expiryDate)-t)/864e5);return n>=0&&n<=30}).length,i=e.filter(e=>e.expiryDate?new Date(e.expiryDate)<t:!1).length;t.toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`});let a=s.settings?.householdName||`Household`,o=(s.kids?.allowances?.length||0)+2,c=i===0&&r===0,l=`
    <div class="home-hero">
      <div>
        <div class="home-hero-label">Household</div>
        <div class="home-hero-val">${a}</div>
        <div class="home-hero-sub">${o} members</div>
      </div>
      <div class="home-hero-badge" style="${c?``:`background:#FFF8EC`}">
        <div class="home-hero-badge-val" style="${c?``:`color:#F59E0B`}">${c?`✓`:`!`}</div>
        <div class="home-hero-badge-label" style="${c?``:`color:#F59E0B`}">${c?`All good`:`${i+r} due`}</div>
      </div>
    </div>`;if(e.length===0){document.getElementById(`documents-content`).innerHTML=`
      
      ${l}
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon">📋</div>
        <p>No documents tracked yet. Add insurance policies, warranties, passports and more.</p>
        <button class="btn btn-primary" style="margin-top:12px" onclick="openDocForm()">+ Add Document</button>
      </div>`;return}let u=``+l+`
    <div class="toto-sec-header" style="margin-top:6px"><span class="toto-sec-title">Documents</span></div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin:8px 20px 16px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${i>0?`<span class="veh-badge red">${i} expired</span>`:``}
        ${r>0?`<span class="veh-badge amber">${r} expiring soon</span>`:``}
        <span style="font-size:13px;color:var(--text-muted)">${e.length} document${e.length===1?``:`s`}</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openDocForm()">+ Add Document</button>
    </div>
    <input class="doc-search" type="text" maxlength="200" placeholder="Search documents…" value="${le}" oninput="_docSearch=this.value;renderDocuments()" style="margin:0 20px;width:calc(100% - 40px)">`,d={};n.forEach(e=>{let t=e.category||`Other`;d[t]||(d[t]=[]),d[t].push(e)}),ce.forEach(e=>{let n=d[e.key];!n||!n.length||(u+=`<div class="doc-cat-group">
      <div class="doc-cat-header">${e.icon} ${e.key} <span style="font-weight:400;text-transform:none">(${n.length})</span></div>`,n.sort((e,t)=>e.expiryDate&&t.expiryDate?new Date(e.expiryDate)-new Date(t.expiryDate):e.expiryDate?-1:1).forEach(n=>{let r=``;if(n.expiryDate){let e=Math.ceil((new Date(n.expiryDate)-t)/864e5);r=e<0?`<span class="veh-badge red" style="font-size:11px">Expired ${Math.abs(e)}d ago</span>`:e<=30?`<span class="veh-badge amber" style="font-size:11px">Expires in ${e}d</span>`:`<span class="veh-badge green" style="font-size:11px">${new Date(n.expiryDate).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}</span>`}let i=[n.provider?g(n.provider):``,n.reference?g(n.reference):``,n.storedAt?`📍 ${g(n.storedAt)}`:``].filter(Boolean);u+=`
        <div class="doc-card" onclick="openDocForm(${n.id})">
          <div class="doc-cat-icon" style="background:${e.bg}">${e.icon}</div>
          <div class="doc-card-body">
            <div class="doc-card-name">${g(n.name)}</div>
            ${i.length?`<div class="doc-card-sub">${i.join(` · `)}</div>`:``}
          </div>
          ${r}
        </div>`}),u+=`</div>`)}),n.length,document.getElementById(`documents-content`).innerHTML=u}function fe(e){let t=e?(s.documents||[]).find(t=>t.id===e):null,n=!!t;document.getElementById(`modal-title`).textContent=n?`Edit Document`:`Add Document`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Document Name</label>
      <input class="form-input" id="df-name" type="text" maxlength="200" value="${t?_(t.name):``}" placeholder="e.g. Home & Contents Insurance">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="df-cat">
          ${ce.map(e=>`<option value="${e.key}"${t&&t.category===e.key?` selected`:``}>${e.icon} ${e.key}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Provider / Issuer</label>
        <input class="form-input" id="df-provider" type="text" maxlength="200" value="${t?_(t.provider||``):``}" placeholder="e.g. AAMI, Medicare">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Reference / Policy No.</label>
        <input class="form-input" id="df-ref" type="text" maxlength="200" value="${t?_(t.reference||``):``}" placeholder="POL-12345">
      </div>
      <div class="form-group">
        <label class="form-label">Expiry Date</label>
        <input class="form-input" id="df-expiry" type="date" value="${t&&t.expiryDate||``}">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Renewal Cost <span style="font-weight:400;color:var(--text-muted)">($, optional)</span></label>
        <input class="form-input" id="df-cost" type="number" max="99999999" step="0.01" value="${t&&t.renewalCost||``}" placeholder="1850">
      </div>
      <div class="form-group">
        <label class="form-label">Stored At</label>
        <input class="form-input" id="df-stored" type="text" maxlength="200" value="${t?_(t.storedAt||``):``}" placeholder="e.g. Filing cabinet, Google Drive, Email">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="df-notes" type="text" maxlength="200" value="${t?_(t.notes||``):``}" placeholder="e.g. $1000 excess, covers building + contents">
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${n?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deleteDoc(${e})">Delete</button>`:``}
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveDoc(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function pe(e){let t=document.getElementById(`df-name`)?.value.trim();if(!t)return;let n={name:t,category:document.getElementById(`df-cat`)?.value||`Other`,provider:document.getElementById(`df-provider`)?.value.trim()||``,reference:document.getElementById(`df-ref`)?.value.trim()||``,expiryDate:document.getElementById(`df-expiry`)?.value||``,renewalCost:parseFloat(document.getElementById(`df-cost`)?.value)||0,storedAt:document.getElementById(`df-stored`)?.value.trim()||``,notes:document.getElementById(`df-notes`)?.value.trim()||``};if(e){let t=s.documents.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=s.documents.length?Math.max(...s.documents.map(e=>e.id))+1:1,s.documents.push(n);if(n.expiryDate&&n.renewalCost>0){s.bills||(s.bills=[]);let t=`doc_${e||n.id}`,r=s.bills.find(e=>e._docRef===t),i={name:`${n.name}${n.provider?` - `+n.provider:``}`,amount:n.renewalCost,category:n.category===`Vehicle`?`Insurance`:n.category,frequency:`Annual`,autopay:!1,startDate:n.expiryDate,_docRef:t};r?Object.assign(r,i):(i.id=uid(),s.bills.push(i))}window.saveData(s),window.closeModal(),window.renderAll()}function me(e){if(!confirm(`Delete this document?`))return;let t=`doc_${e}`;s.bills=(s.bills||[]).filter(e=>e._docRef!==t),s.documents=s.documents.filter(t=>t.id!==e),window.saveData(s),window.closeModal(),window.renderAll()}var he=[{key:`HVAC`,icon:`❄️`},{key:`Plumbing`,icon:`🚿`},{key:`Electrical`,icon:`💡`},{key:`Garden`,icon:`🌿`},{key:`Cleaning`,icon:`🧹`},{key:`Safety`,icon:`🔥`},{key:`Appliance`,icon:`🔧`},{key:`Exterior`,icon:`🏠`},{key:`Other`,icon:`📋`}],ge=[{name:`Gutters Cleaned`,category:`Exterior`,intervalNum:6,intervalUnit:`months`,icon:`🏠`},{name:`Smoke Alarm Batteries`,category:`Safety`,intervalNum:12,intervalUnit:`months`,icon:`🔥`},{name:`Pest Control`,category:`Exterior`,intervalNum:12,intervalUnit:`months`,icon:`🐛`},{name:`AC Filter Cleaned`,category:`HVAC`,intervalNum:3,intervalUnit:`months`,icon:`❄️`},{name:`Hot Water System Flush`,category:`Plumbing`,intervalNum:12,intervalUnit:`months`,icon:`🚿`},{name:`Lawn Mowing`,category:`Garden`,intervalNum:2,intervalUnit:`weeks`,icon:`🌿`},{name:`Oven Clean`,category:`Cleaning`,intervalNum:6,intervalUnit:`months`,icon:`🧹`},{name:`Pool Maintenance`,category:`Exterior`,intervalNum:1,intervalUnit:`months`,icon:`🏊`},{name:`Drains / Septic`,category:`Plumbing`,intervalNum:2,intervalUnit:`years`,icon:`🚿`},{name:`Roof Inspection`,category:`Exterior`,intervalNum:2,intervalUnit:`years`,icon:`🏠`}];function _e(e){if(!e.lastDone)return null;let t=new Date(e.lastDone),n=e.intervalNum||1,r=e.intervalUnit||`months`;return r===`days`?t.setDate(t.getDate()+n):r===`weeks`?t.setDate(t.getDate()+n*7):r===`months`?t.setMonth(t.getMonth()+n):r===`years`&&t.setFullYear(t.getFullYear()+n),t}function ve(e){let t=_e(e);return t?Math.ceil((t-new Date)/864e5):null}function ye(){let e=s.maintenance||[];if(e.length===0){let t=new Set(e.map(e=>e.name.toLowerCase())),n=ge.filter(e=>!t.has(e.name.toLowerCase()));document.getElementById(`maintenance-content`).innerHTML=`
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon">🔧</div>
        <p>No maintenance items tracked yet.</p>
        <button class="btn btn-primary" style="margin-top:12px" onclick="openMaintForm()">+ Add Item</button>
      </div>
      ${n.length?`
      <div style="margin-top:24px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add common items</div>
        <div class="maint-starter">
          ${n.map((e,t)=>`
            <button class="maint-starter-btn" onclick="quickAddMaint(${t})">
              <div class="maint-starter-name">${e.icon} ${g(e.name)}</div>
              <div class="maint-starter-sub">Every ${e.intervalNum} ${e.intervalUnit}</div>
            </button>`).join(``)}
        </div>
      </div>`:``}`;return}let t=[...e].map(e=>{let t=ve(e);return{...e,_days:t}}).sort((e,t)=>e._days===null&&t._days===null?0:e._days===null?1:t._days===null?-1:e._days-t._days),n=t.filter(e=>e._days!==null&&e._days<0).length,r=t.filter(e=>e._days!==null&&e._days>=0&&e._days<=14).length,i=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${n>0?`<span class="veh-badge red">${n} overdue</span>`:``}
        ${r>0?`<span class="veh-badge amber">${r} due soon</span>`:``}
        <span style="font-size:13px;color:var(--text-muted)">${e.length} item${e.length===1?``:`s`}</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openMaintForm()">+ Add Item</button>
    </div>`;if(t.forEach(e=>{let t=e._days,n=`ok`,r=``;t===null?(n=`ok`,r=e.lastDone?`Last done ${new Date(e.lastDone).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}`:`Never done`):t<0?(n=`overdue`,r=`Overdue by ${Math.abs(t)} day${Math.abs(t)===1?``:`s`}`):t<=14?(n=`due-soon`,r=t===0?`Due today`:`Due in ${t} day${t===1?``:`s`}`):r=`Due ${_e(e).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`;let a=he.find(t=>t.key===e.category)||he[he.length-1],o=e.intervalNum?`Every ${e.intervalNum} ${e.intervalUnit}`:``;i+=`
      <div class="maint-item ${n}">
        <div class="maint-row">
          <div class="maint-icon">${a.icon}</div>
          <div class="maint-body">
            <div class="maint-name">${g(e.name)}</div>
            <div class="maint-sub">${[r,o,e.provider?g(e.provider):``].filter(Boolean).join(` · `)}</div>
          </div>
          <div class="maint-actions">
            <button class="maint-done-btn" onclick="event.stopPropagation();markMaintDone(${e.id})">✓ Done</button>
            <button class="btn btn-sm" onclick="openMaintForm(${e.id})">Edit</button>
          </div>
        </div>
        ${e.lastCost?`<div style="font-size:11px;color:var(--text-muted);margin-top:6px;padding-left:48px">Last cost: ${b(e.lastCost)}</div>`:``}
      </div>`}),e.length<3){let t=new Set(e.map(e=>e.name.toLowerCase())),n=ge.filter(e=>!t.has(e.name.toLowerCase()));n.length&&(i+=`<div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add more</div>
        <div class="maint-starter">
          ${n.slice(0,6).map((e,t)=>`
            <button class="maint-starter-btn" onclick="quickAddMaint(${t})">
              <div class="maint-starter-name">${e.icon} ${g(e.name)}</div>
              <div class="maint-starter-sub">Every ${e.intervalNum} ${e.intervalUnit}</div>
            </button>`).join(``)}
        </div>
      </div>`)}document.getElementById(`maintenance-content`).innerHTML=i}function be(e){let t=e?(s.maintenance||[]).find(t=>t.id===e):null,n=!!t;document.getElementById(`modal-title`).textContent=n?`Edit ${t.name}`:`Add Maintenance Item`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="mf-name" type="text" maxlength="200" value="${t?_(t.name):``}" placeholder="e.g. Gutters Cleaned, Pest Control">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="mf-cat">
          ${he.map(e=>`<option value="${e.key}"${t&&t.category===e.key?` selected`:``}>${e.icon} ${e.key}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Provider</label>
        <input class="form-input" id="mf-provider" type="text" maxlength="200" value="${t?_(t.provider||``):``}" placeholder="e.g. Jim's Mowing, DIY">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Repeat Every</label>
        <div style="display:flex;gap:8px">
          <input class="form-input" id="mf-interval-num" type="number" max="99999999" min="1" value="${t&&t.intervalNum||1}" style="width:70px">
          <select class="form-select" id="mf-interval-unit" style="flex:1">
            ${[`days`,`weeks`,`months`,`years`].map(e=>`<option value="${e}"${t&&t.intervalUnit===e?` selected`:``}>${e}</option>`).join(``)}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Last Done</label>
        <input class="form-input" id="mf-last" type="date" value="${t&&t.lastDone||``}">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Last Cost ($) <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="mf-cost" type="number" max="99999999" step="0.01" value="${t&&t.lastCost||``}">
      </div>
      <div class="form-group">
        <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="mf-notes" type="text" maxlength="200" value="${t?_(t.notes||``):``}">
      </div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${n?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deleteMaint(${e})">Delete</button>`:``}
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveMaint(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function xe(e){let t=document.getElementById(`mf-name`)?.value.trim();if(!t)return;let n={name:t,category:document.getElementById(`mf-cat`)?.value||`Other`,provider:document.getElementById(`mf-provider`)?.value.trim()||``,intervalNum:parseInt(document.getElementById(`mf-interval-num`)?.value)||1,intervalUnit:document.getElementById(`mf-interval-unit`)?.value||`months`,lastDone:document.getElementById(`mf-last`)?.value||``,lastCost:parseFloat(document.getElementById(`mf-cost`)?.value)||0,notes:document.getElementById(`mf-notes`)?.value.trim()||``};if(e){let t=s.maintenance.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=s.maintenance.length?Math.max(...s.maintenance.map(e=>e.id))+1:1,s.maintenance.push(n);window.saveData(s),window.closeModal(),window.renderAll()}function Se(e){confirm(`Delete this maintenance item?`)&&(s.maintenance=s.maintenance.filter(t=>t.id!==e),window.saveData(s),window.closeModal(),window.renderAll())}function Ce(e){let t=s.maintenance.find(t=>t.id===e);if(!t)return;let n=new Date().toISOString().slice(0,10);if(t.lastDone=n,t.lastCost>0){let e=n.slice(0,7),r=window.getMonthData(e),i=r.expenses.find(e=>(e.category||``).toLowerCase()===`other`&&(e.name||``).toLowerCase().includes(`maintenance`))||r.expenses.find(e=>(e.name||``).toLowerCase().includes(`maintenance`));if(!i&&(i={id:k(s.budget.expenses),name:`Home Maintenance`,amount:0,frequency:`monthly`,category:`Other`,dueDate:``,vendor:null},s.budget.expenses.push(i),window.isMonthCustomized(e))){let t=s.budget.months[e];i={...i,id:k(t.expenses)},t.expenses.push(i)}s.budget.actuals[e]||(s.budget.actuals[e]={});let a=window.getActualEntries(i.id,e);a.push({id:a.length?Math.max(...a.map(e=>e.id))+1:1,amount:t.lastCost,date:n,note:`${t.name}${t.provider?` - `+t.provider:``}`}),s.budget.actuals[e][i.id]=a}window.saveData(s),window.renderAll()}function we(e){let t=ge[e];if(!t)return;let n={id:s.maintenance.length?Math.max(...s.maintenance.map(e=>e.id))+1:1,name:t.name,category:t.category,provider:``,intervalNum:t.intervalNum,intervalUnit:t.intervalUnit,lastDone:``,lastCost:0,notes:``};s.maintenance.push(n),window.saveData(s),window.renderAll()}var Te=[`Fridge`,`Freezer`,`Pantry`,`Fruit & Veg`,`Spices`,`Drinks`,`Cleaning`,`Other`],Ee=[{name:`Milk`,cat:`Fridge`},{name:`Eggs`,cat:`Fridge`},{name:`Cheese`,cat:`Fridge`},{name:`Butter`,cat:`Fridge`},{name:`Yoghurt`,cat:`Fridge`},{name:`Chicken breast`,cat:`Freezer`},{name:`Mince`,cat:`Freezer`},{name:`Fish fillets`,cat:`Freezer`},{name:`Frozen veg`,cat:`Freezer`},{name:`Pasta`,cat:`Pantry`},{name:`Rice`,cat:`Pantry`},{name:`Tinned tomatoes`,cat:`Pantry`},{name:`Olive oil`,cat:`Pantry`},{name:`Flour`,cat:`Pantry`},{name:`Sugar`,cat:`Pantry`},{name:`Bread`,cat:`Pantry`},{name:`Cereal`,cat:`Pantry`},{name:`Onions`,cat:`Fruit & Veg`},{name:`Potatoes`,cat:`Fruit & Veg`},{name:`Bananas`,cat:`Fruit & Veg`},{name:`Apples`,cat:`Fruit & Veg`},{name:`Salt`,cat:`Spices`},{name:`Pepper`,cat:`Spices`},{name:`Garlic`,cat:`Spices`}];function De(){let e=document.getElementById(`pantry-content`);if(!e)return;let t=s.meals.pantry||[];if(t.length===0){e.innerHTML=`
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon" style="font-size:48px">🥫</div>
        <p style="margin:12px 0">Track what's in your kitchen. Tap items you usually keep stocked.</p>
        <button class="btn btn-primary" onclick="openPantryForm()">+ Add Item</button>
      </div>
      <div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add common items</div>
        <div class="pantry-starter">
          ${Ee.map(e=>`<button class="pantry-starter-btn" onclick="quickAddPantry('${_(e.name)}','${e.cat}')">${g(e.name)}</button>`).join(``)}
        </div>
      </div>`;return}let n={};Te.forEach(e=>n[e]=[]),t.forEach(e=>{n[Te.includes(e.cat)?e.cat:`Other`].push(e)});let r=t.filter(e=>e.status===`need`).length,i=t.filter(e=>e.status===`low`).length,a=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${r>0?`<span class="veh-badge red">${r} need</span>`:``}
        ${i>0?`<span class="veh-badge amber">${i} low</span>`:``}
        <span style="font-size:13px;color:var(--text-muted)">${t.length} items tracked</span>
      </div>
      <div style="display:flex;gap:8px">
        ${r>0?`<button class="btn btn-sm" onclick="pantryToShoppingList()">Add ${r+i} to shopping list</button>`:``}
        <button class="btn btn-primary btn-sm" onclick="openPantryForm()">+ Add Item</button>
      </div>
    </div>`;if(Te.forEach(e=>{let t=n[e];t.length&&(a+=`<div class="pantry-cat-header">${g(e)} (${t.length})</div>`,t.forEach(e=>{let t=e.status===`stocked`?`✓`:e.status===`low`?`!`:`✗`;e.status===`stocked`||e.status,a+=`<div class="pantry-item">
        <div class="pantry-status ${e.status}" onclick="cyclePantryStatus(${e.id})" title="Tap to change">${t}</div>
        <div class="pantry-body">
          <div class="pantry-name">${g(e.name)}</div>
          ${e.qty?`<div class="pantry-meta">${g(e.qty)}</div>`:``}
        </div>
        <div class="pantry-actions">
          <button class="btn btn-sm" style="font-size:11px" onclick="openPantryForm(${e.id})">Edit</button>
          <button class="btn btn-sm" style="font-size:11px;color:var(--danger)" onclick="deletePantryItem(${e.id})">×</button>
        </div>
      </div>`}))}),t.length<10){let e=new Set(t.map(e=>e.name.toLowerCase())),n=Ee.filter(t=>!e.has(t.name.toLowerCase()));n.length&&(a+=`<div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add more</div>
        <div class="pantry-starter">
          ${n.slice(0,12).map(e=>`<button class="pantry-starter-btn" onclick="quickAddPantry('${_(e.name)}','${e.cat}')">${g(e.name)}</button>`).join(``)}
        </div>
      </div>`)}e.innerHTML=a}function Oe(e){let t=(s.meals.pantry||[]).find(t=>t.id===e);t&&(t.status={stocked:`low`,low:`need`,need:`stocked`}[t.status]||`stocked`,window.saveData(s),De())}function ke(e){let t=e?(s.meals.pantry||[]).find(t=>t.id===e):null;document.getElementById(`modal-title`).textContent=t?`Edit Item`:`Add Pantry Item`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="pf-name" type="text" maxlength="200" value="${t?_(t.name):``}" placeholder="e.g. Pasta, Milk, Chicken">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="pf-cat">
          ${Te.map(e=>`<option value="${e}"${t&&t.cat===e?` selected`:``}>${e}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Quantity <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="pf-qty" type="text" maxlength="200" value="${t?_(t.qty||``):``}" placeholder="e.g. 2 bags, 1L, 500g">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Status</label>
      <div style="display:flex;gap:8px">
        ${[`stocked`,`low`,`need`].map(e=>{let n={stocked:`Stocked`,low:`Running Low`,need:`Need to Buy`},r={stocked:`#10b981`,low:`#f59e0b`,need:`#ef4444`},i=(t?.status||`stocked`)===e;return`<label style="flex:1;cursor:pointer;text-align:center;padding:10px;border-radius:8px;border:2px solid ${i?r[e]:`var(--border)`};background:${i?r[e]+`15`:`var(--surface)`};font-size:12px;font-weight:600;color:${i?r[e]:`var(--text-muted)`}">
            <input type="radio" name="pf-status" value="${e}" ${i?`checked`:``} style="display:none">${n[e]}
          </label>`}).join(``)}
      </div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${t?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deletePantryItem(${e});window.closeModal()">Delete</button>`:``}
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="savePantryItem(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Ae(e){let t=document.getElementById(`pf-name`)?.value.trim();if(!t)return;let n={name:t,cat:document.getElementById(`pf-cat`)?.value||`Other`,qty:document.getElementById(`pf-qty`)?.value.trim()||``,status:document.querySelector(`input[name="pf-status"]:checked`)?.value||`stocked`},r=s.meals.pantry;if(e){let t=r.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=r.length?Math.max(...r.map(e=>e.id))+1:1,r.push(n);window.saveData(s),window.closeModal(),De()}function je(e){s.meals.pantry=(s.meals.pantry||[]).filter(t=>t.id!==e),window.saveData(s),De()}function Me(e,t){let n=s.meals.pantry;n.push({id:n.length?Math.max(...n.map(e=>e.id))+1:1,name:e,cat:t,qty:``,status:`stocked`}),window.saveData(s),De()}function Ne(){let e=(s.meals.pantry||[]).filter(e=>e.status===`need`||e.status===`low`);if(!e.length)return;s.lists||(s.lists={}),s.lists.food||(s.lists.food={items:[],weeklyBudget:200,budget:0,stores:[],favourites:[],history:[]});let t=s.lists.food.items,n={Fridge:`dairy`,Freezer:`frozen`,Pantry:`pantry`,"Fruit & Veg":`produce`,Spices:`pantry`,Drinks:`drinks`,Cleaning:`cleaning`,Other:`other`},r=0;e.forEach(e=>{t.some(t=>t.name.toLowerCase()===e.name.toLowerCase()&&t.state===`active`)||(t.push({id:`si-`+Date.now()+`-`+r,name:e.name,quantity:1,unit:`units`,notes:``,aisle:n[e.cat]||`other`,state:`active`,addedBy:`pantry`,addedAt:new Date().toISOString(),mealTag:`Pantry`,manualPrice:null,barcodeId:null}),r++)}),r>0&&(window.saveData(s),_listsActiveType=`food`,_listsView=`list`,activateTab(`lists`));let i=document.querySelector(`[onclick*="pantryToShoppingList"]`);if(i){let e=i.textContent;i.textContent=`Added ${r} items`,i.style.color=`var(--success)`,setTimeout(()=>{i.textContent=e,i.style.color=``},2e3)}}var Pe=[`Cash & Savings`,`Investments`,`Property`,`Superannuation`,`Vehicle`,`Other`],Fe=[`Mortgage`,`Car Loan`,`Credit Card`,`Personal Loan`,`HECS/HELP`,`Other`];function Ie(){let e=document.getElementById(`networth-content`);if(!e)return;let t=s.netWorth,n=t.assets||[],r=t.liabilities||[],i=t.snapshots||[],a=n.reduce((e,t)=>e+(parseFloat(t.value)||0),0),o=r.reduce((e,t)=>e+(parseFloat(t.value)||0),0),c=a-o,l=``;if(i.length>=2){let e=c-i[i.length-2].netWorth;l=`<span class="${e>=0?`up`:`down`}">${e>=0?`+`:``}${S(e)}</span> vs last snapshot`}if(!n.length&&!r.length){e.innerHTML=`
      <div style="background:#fff;border:2px dashed #cbd5e1;border-radius:16px;padding:36px 24px;margin-top:8px">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
          <div style="font-size:40px">📊</div>
          <div>
            <div style="font-size:17px;font-weight:700;color:#1e293b">See your full financial picture</div>
            <div style="font-size:13px;color:#64748b;margin-top:4px">Add what you own and what you owe to calculate your net worth.</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
          <div style="background:#f0f9ff;border-radius:12px;padding:14px;display:flex;align-items:center;gap:14px">
            <span style="font-size:22px">🏦</span>
            <div>
              <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#0369a1;margin-bottom:4px">What you own</div>
              <div style="font-size:12px;color:#374151">Home value · Savings · Super / investments · Vehicles</div>
            </div>
          </div>
          <div style="background:#fef2f2;border-radius:12px;padding:14px;display:flex;align-items:center;gap:14px">
            <span style="font-size:22px">💳</span>
            <div>
              <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#b91c1c;margin-bottom:4px">What you owe</div>
              <div style="font-size:12px;color:#374151">Mortgage balance · Car loans · Credit cards · Personal loans</div>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:10px;justify-content:center">
          <button onclick="openNWModal('asset')" style="flex:1;background:#0891b2;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:600;cursor:pointer">+ Add an asset</button>
          <button onclick="openNWModal('liability')" style="flex:1;background:#fff;color:#0891b2;border:1.5px solid #0891b2;border-radius:10px;padding:12px;font-size:14px;font-weight:600;cursor:pointer">+ Add a liability</button>
        </div>
      </div>`;return}e.innerHTML=`
    <div class="nw-hero">
      <div class="nw-hero-label">Net Worth</div>
      <div class="nw-hero-amount ${c>=0?`positive`:`negative`}">${S(c)}</div>
      ${l?`<div class="nw-hero-change">${l}</div>`:``}
    </div>

    ${Re(c)}
    ${r.some(e=>e.rate)?ze(r):``}
    ${i.length>1?Ue(i):``}

    <div class="nw-cols">
      <div class="nw-col-card assets">
        <div class="nw-col-header">
          <span class="nw-col-title">Assets</span>
          <span class="nw-col-total">${S(a)}</span>
        </div>
        ${n.length?n.map(e=>Le(e,`asset`)).join(``):`<div class="nw-empty">No assets yet</div>`}
        <div class="nw-add-row">
          <button class="btn-outline" style="font-size:12px;padding:6px 14px" onclick="openNWModal('asset')">+ Add asset</button>
        </div>
      </div>
      <div class="nw-col-card liabilities">
        <div class="nw-col-header">
          <span class="nw-col-title">Liabilities</span>
          <span class="nw-col-total">${S(o)}</span>
        </div>
        ${r.length?r.map(e=>Le(e,`liability`)).join(``):`<div class="nw-empty">No liabilities yet</div>`}
        <div class="nw-add-row">
          <button class="btn-outline" style="font-size:12px;padding:6px 14px" onclick="openNWModal('liability')">+ Add liability</button>
        </div>
      </div>
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;gap:12px;flex-wrap:wrap">
      <div style="font-size:13px;color:#64748b">
        ${i.length?`Last snapshot: ${i[i.length-1].date}`:`No snapshots yet — save one to track progress.`}
      </div>
      <button class="nw-snapshot-btn" onclick="saveNWSnapshot()">Save snapshot</button>
    </div>

  `}function Le(e,t){let n=e.category||``;if(t===`liability`&&e.rate){let t=parseFloat(e.value)||0,r=parseFloat(e.rate),i=t*r/1200;n+=n?` · `:``,n+=`${r}% p.a. · $${Math.round(i).toLocaleString()}/mo interest`}return`
    <div class="nw-item">
      <div style="flex:1;min-width:0">
        <div class="nw-item-name">${g(e.name)}</div>
        ${n?`<div class="nw-item-cat">${n}</div>`:``}
      </div>
      <div class="nw-item-value">${S(parseFloat(e.value)||0)}</div>
      <div class="nw-item-actions">
        <button class="icon-btn" title="Edit" onclick="openNWModal('${t}','${e.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteNWItem('${t}','${e.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>`}function Re(e){let t=s.netWorth.target||{},n=parseFloat(t.amount)||0,r=parseInt(t.byYear)||0,i=new Date().getFullYear();if(!n||!r)return`
      <div class="nw-target-card">
        <div class="nw-target-header">
          <span class="nw-target-title">Your target</span>
          <button class="btn-outline" style="font-size:12px;padding:5px 12px" onclick="openNWTargetModal()">Set target</button>
        </div>
        <div class="nw-target-empty">
          <span style="font-size:28px">🎯</span>
          <span style="font-size:13px;color:#64748b">Set a net worth goal and track your progress towards it.</span>
        </div>
      </div>`;let a=Math.min(e/n*100,100),o=Math.max(n-e,0),c=Math.max(r-i,0),l=c*12,u=l>0?Math.ceil(o/l):0,d=e>=n,f=s.netWorth.snapshots||[],p=``;if(f.length>=2){let e=f[0],t=f[f.length-1],n=Math.max((new Date(t.date)-new Date(e.date))/(1e3*60*60*24*30.5),1),a=(t.netWorth-e.netWorth)/n;if(a>0&&o>0){let e=Math.ceil(o/a),t=i+Math.floor(e/12),n=t<=r;p=`<div class="nw-target-stat">
        <div class="nw-target-stat-val" style="color:${n?`#10b981`:`#f59e0b`}">${n?`✓ On track`:`⚠ Off track`}</div>
        <div class="nw-target-stat-lbl">At current pace: ${t}</div>
      </div>`}}return`
    <div class="nw-target-card">
      <div class="nw-target-header">
        <div>
          <div class="nw-target-title">Your target</div>
        </div>
        <button class="btn-outline" style="font-size:12px;padding:5px 12px" onclick="openNWTargetModal()">Edit</button>
      </div>
      <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
        <div class="nw-target-goal">${S(n)}</div>
        <div style="font-size:13px;color:#64748b">by ${r}</div>
      </div>
      <div class="nw-progress-track">
        <div class="nw-progress-fill ${d?`over`:``}" style="width:${a.toFixed(1)}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#94a3b8;margin-bottom:14px">
        <span>${a.toFixed(0)}% there</span>
        <span>${d?`🎉 Goal reached!`:S(o)+` to go`}</span>
      </div>
      <div class="nw-target-stats">
        ${!d&&c>0?`<div class="nw-target-stat">
          <div class="nw-target-stat-val">${c} yr${c===1?``:`s`}</div>
          <div class="nw-target-stat-lbl">Time remaining</div>
        </div>`:``}
        ${!d&&u>0?`<div class="nw-target-stat">
          <div class="nw-target-stat-val">$${u.toLocaleString()}/mo</div>
          <div class="nw-target-stat-lbl">Required growth</div>
        </div>`:``}
        ${p}
      </div>
    </div>`}function ze(e){let t=e.filter(e=>e.rate);if(!t.length)return``;let n=t.reduce((e,t)=>e+(parseFloat(t.value)||0)*(parseFloat(t.rate)||0)/1200,0),r=t.map(e=>{let t=parseFloat(e.value)||0,n=parseFloat(e.rate)||0,r=parseFloat(e.monthlyPayment)||0,i=t*n/1200,a=``;if(r>0)if(r<=i)a=`<span class="nw-debt-payoff warn">⚠ Paying interest only</span>`;else{let e=n/1200,i=-Math.log(1-e*t/r)/Math.log(1+e);if(isFinite(i)&&i>0){let e=new Date;e.setMonth(e.getMonth()+Math.ceil(i));let n=e.toLocaleString(`default`,{month:`short`}),o=e.getFullYear();a=`<span class="nw-debt-payoff" title="${S(r*Math.ceil(i)-t)} total interest">Paid off ${n} ${o}</span>`}}return`<div class="nw-debt-row">
      <span class="nw-debt-name">${g(e.name)}</span>
      <span class="nw-debt-rate">${n}% p.a.</span>
      <span class="nw-debt-int">$${Math.round(i).toLocaleString()}/mo interest</span>
      ${a}
    </div>`}).join(``);return`
    <div class="nw-debt-card">
      <div class="nw-debt-header">
        <div style="display:flex;flex-direction:column;gap:2px">
          <span class="nw-debt-headline">Your debts cost you</span>
          <div style="display:flex;align-items:baseline;gap:6px">
            <span class="nw-debt-total">$${Math.round(n).toLocaleString()}</span>
            <span class="nw-debt-per">per month in interest</span>
          </div>
        </div>
      </div>
      ${r}
      <div style="font-size:11px;color:#94a3b8;margin-top:12px">Add interest rates to your liabilities to see full breakdown.</div>
    </div>`}function Be(){let e=s.netWorth.target||{};document.getElementById(`nw-t-amount`).value=e.amount||``,document.getElementById(`nw-t-year`).value=e.byYear||``,document.getElementById(`nw-target-modal`).style.display=`flex`}function Ve(){document.getElementById(`nw-target-modal`).style.display=`none`}function He(){let e=parseFloat(document.getElementById(`nw-t-amount`).value),t=parseInt(document.getElementById(`nw-t-year`).value);!e||!t||(s.netWorth.target||(s.netWorth.target={}),s.netWorth.target.amount=e,s.netWorth.target.byYear=t,window.saveData(s),Ie(),Ve())}function Ue(e){let t=e.slice(-12),n=Math.max(...t.map(e=>Math.abs(e.netWorth)),1);return`
    <div class="nw-trend-card">
      <div class="nw-trend-title">Net Worth over time</div>
      <div class="nw-trend-chart">${t.map(e=>{let t=Math.round(Math.abs(e.netWorth)/n*70);return`<div class="nw-trend-bar-wrap">
      <div class="nw-trend-bar ${e.netWorth>=0?`pos`:`neg`}" style="height:${t}px"></div>
      <div class="nw-trend-label">${e.date?e.date.slice(0,7):``}</div>
    </div>`}).join(``)}</div>
    </div>`}function We(){if(document.getElementById(`nw-modal`))return;let e=document.createElement(`div`);for(e.innerHTML=`
    <div id="nw-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,0.2)">
        <h3 id="nw-modal-title" style="font-size:17px;font-weight:700;margin-bottom:20px"></h3>
        <input type="hidden" id="nw-edit-id">
        <input type="hidden" id="nw-edit-type">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Name</label>
            <input id="nw-name" type="text" maxlength="200" placeholder="e.g. Home, Super, Credit card" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Category</label>
            <div id="nw-cat-wrap"></div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Value ($)</label>
            <input id="nw-value" type="number" max="99999999" min="0" step="100" placeholder="0" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
          </div>
          <div id="nw-debt-fields" style="display:none;flex-direction:column;gap:14px">
            <div style="border-top:1px solid var(--border);padding-top:14px;font-size:12px;font-weight:600;color:#64748b;letter-spacing:0.04em;text-transform:uppercase">Debt details (optional)</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div>
                <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Interest rate (% p.a.)</label>
                <input id="nw-rate" type="number" min="0" max="100" step="0.1" placeholder="e.g. 6.5" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
              </div>
              <div>
                <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Monthly repayment ($)</label>
                <input id="nw-payment" type="number" max="99999999" min="0" step="50" placeholder="e.g. 2000" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:22px;justify-content:flex-end">
          <button class="btn-outline" onclick="closeNWModal()">Cancel</button>
          <button class="btn btn-primary" onclick="saveNWItem()">Save</button>
        </div>
      </div>
    </div>
    <div id="nw-target-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,0.2)">
        <h3 style="font-size:17px;font-weight:700;margin-bottom:6px">Set your target</h3>
        <p style="font-size:13px;color:#64748b;margin-bottom:20px">What net worth do you want to reach, and by when?</p>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Target net worth ($)</label>
            <input id="nw-t-amount" type="number" max="99999999" min="0" step="10000" placeholder="e.g. 1000000" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">By year</label>
            <input id="nw-t-year" type="number" min="2025" max="2099" step="1" placeholder="e.g. 2040" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none">
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:22px;justify-content:flex-end">
          <button class="btn-outline" onclick="closeNWTargetModal()">Cancel</button>
          <button class="btn btn-primary" onclick="saveNWTarget()">Save target</button>
        </div>
      </div>
    </div>`;e.firstChild;)document.body.appendChild(e.firstChild)}function Ge(e,t){We();let n=s.netWorth,r=e===`asset`?n.assets:n.liabilities,i=e===`asset`?Pe:Fe,a=t?r.find(e=>e.id===t):null,o=document.getElementById(`nw-modal`);if(!o)return;document.getElementById(`nw-modal-title`).textContent=(a?`Edit`:`Add`)+` `+(e===`asset`?`Asset`:`Liability`),document.getElementById(`nw-edit-id`).value=t||``,document.getElementById(`nw-edit-type`).value=e,document.getElementById(`nw-name`).value=a?a.name:``,document.getElementById(`nw-value`).value=a?a.value:``,document.getElementById(`nw-rate`).value=a&&a.rate?a.rate:``,document.getElementById(`nw-payment`).value=a&&a.monthlyPayment?a.monthlyPayment:``;let c=a?.category||i[0],l=document.getElementById(`nw-cat-wrap`);l&&(l.innerHTML=window.customSelect(`nw-cat`,i,c,e=>{_csStore[`nw-cat`].value=e}));let u=document.getElementById(`nw-debt-fields`);u&&(u.style.display=e===`liability`?`flex`:`none`),o.style.display=`flex`}function Ke(){let e=document.getElementById(`nw-modal`);e&&(e.style.display=`none`)}function qe(){let e=document.getElementById(`nw-name`).value.trim(),t=parseFloat(document.getElementById(`nw-value`).value),n=_csStore[`nw-cat`]?.value||``,r=document.getElementById(`nw-edit-type`).value,i=document.getElementById(`nw-edit-id`).value,a=parseFloat(document.getElementById(`nw-rate`).value)||0,o=parseFloat(document.getElementById(`nw-payment`).value)||0;if(!e||isNaN(t))return;let c=r===`asset`?s.netWorth.assets:s.netWorth.liabilities,l={name:e,value:t,category:n};if(r===`liability`&&(a&&(l.rate=a),o&&(l.monthlyPayment=o)),i){let e=c.findIndex(e=>e.id===i);e!==-1&&(c[e]={...c[e],...l})}else c.push({id:uid(),...l});window.saveData(s),Ke(),Ie()}function Je(e,t){let n=e===`asset`?s.netWorth.assets:s.netWorth.liabilities,r=n.findIndex(e=>e.id===t);r!==-1&&(n.splice(r,1),window.saveData(s),Ie())}function Ye(){let e=s.netWorth,t=(e.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0)-(e.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),n=new Date().toISOString().slice(0,10);e.snapshots||(e.snapshots=[]);let r=e.snapshots.findIndex(e=>e.date===n),i={date:n,netWorth:t,assets:(e.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),liabilities:(e.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0)};r===-1?e.snapshots.push(i):e.snapshots[r]=i,window.saveData(s),Ie()}function N(e){return window._secureGet(e)}function Xe(e,t){window._secureSet(e,t)}function Ze(e){window._secureClear(e)}var Qe=[{label:`Streaming`,icon:`📺`},{label:`Music`,icon:`🎵`},{label:`Software`,icon:`💻`},{label:`Fitness`,icon:`💪`},{label:`Gaming`,icon:`🎮`},{label:`News`,icon:`📰`},{label:`Insurance`,icon:`🛡️`},{label:`Education`,icon:`📚`},{label:`Other`,icon:`📦`}];function $e(e){let t=Qe.find(t=>t.label===e);return t?t.icon:`📦`}function et(e){let t=parseFloat(e.amount)||0;return e.frequency===`Annual`?t/12:e.frequency===`Weekly`?t*52/12:t}var tt=[],nt=new Set;Object.defineProperty(window,`_subImportResults`,{get(){return tt},set(e){tt=e},configurable:!0}),Object.defineProperty(window,`_subImportDismissed`,{get(){return nt},set(e){nt=e},configurable:!0});function rt(e){let t=e.map(e=>`
    <div class="sub-result-row">
      <div class="sub-result-icon">${$e(e.category)}</div>
      <div class="sub-result-info">
        <div class="sub-result-name">${g(e.name)}</div>
        <div class="sub-result-meta">${g(e.category)} · ${e.frequency} · ${g(e.description||``)}</div>
      </div>
      <div class="sub-result-amount">$${parseFloat(e.amount).toFixed(2)}</div>
      <div class="sub-result-actions">
        <button class="sub-add-btn primary" onclick="addSubFromImport('${e._key}','subscription')">+ Subscription</button>
        <button class="sub-add-btn secondary" onclick="addSubFromImport('${e._key}','budget')">+ Budget</button>
        <button class="sub-add-btn dismiss" onclick="dismissSubResult('${e._key}')">✕</button>
      </div>
    </div>`).join(``);return`<div class="sub-results-card">
    <div class="sub-results-header">
      <span class="sub-results-title">✨ Found ${e.length} item${e.length===1?``:`s`} not in your budget</span>
      <button class="btn-outline" style="font-size:12px;padding:5px 10px" onclick="_subImportResults=[];_subImportDismissed=new Set();renderSubscriptions()">Clear all</button>
    </div>
    ${t}
  </div>`}function it(e){let t=e?(s.subscriptions||[]).find(t=>t.id===e):null;document.getElementById(`sub-modal-title`).textContent=t?`Edit Subscription`:`Add Subscription`,document.getElementById(`sub-edit-id`).value=e||``,document.getElementById(`sub-name`).value=t?t.name:``,document.getElementById(`sub-cat`).value=t&&t.category||`Streaming`,document.getElementById(`sub-freq`).value=t&&t.frequency||`Monthly`,document.getElementById(`sub-amount`).value=t?t.amount:``,document.getElementById(`sub-renewal`).value=t&&t.renewalDate||``,document.getElementById(`sub-modal`).style.display=`flex`}function at(){document.getElementById(`sub-modal`).style.display=`none`}function ot(){let e=document.getElementById(`sub-name`).value.trim(),t=parseFloat(document.getElementById(`sub-amount`).value),n=document.getElementById(`sub-cat`).value,r=document.getElementById(`sub-freq`).value,i=document.getElementById(`sub-renewal`).value,a=document.getElementById(`sub-edit-id`).value;if(!e||isNaN(t))return;s.subscriptions||(s.subscriptions=[]);let o={name:e,amount:t,category:n,frequency:r,renewalDate:i};if(a){let e=s.subscriptions.findIndex(e=>e.id===a);e!==-1&&(s.subscriptions[e]={...s.subscriptions[e],...o})}else s.subscriptions.push({id:uid(),...o});window.saveData(s),at(),renderSubscriptions()}function st(e){s.subscriptions=(s.subscriptions||[]).filter(t=>t.id!==e),window.saveData(s),renderSubscriptions()}async function ct(e){let t=e.target.files[0];if(!t)return;let n=N(`toto_ai_key`),r=document.getElementById(`sub-import-status`);if(!n){r&&(r.textContent=`⚠ Please enter your Anthropic API key above first.`,r.style.display=``);return}let i=(await t.text()).split(`
`).filter(e=>e.trim()).slice(0,200);r&&(r.innerHTML=`<span class="sub-spinner"></span> Analysing your transactions…`,r.style.display=``);let a=[...(s.bills||[]).map(e=>e.name),...(s.subscriptions||[]).map(e=>e.name),...(s.budget.expenses||[]).map(e=>e.name)].join(`, `),o=`You are a financial assistant analysing Australian bank statement transactions to find recurring subscriptions and bills.

CSV transactions (up to 200 rows):
${i.join(`
`)}

Already tracked by the user (skip these): ${a||`none`}

Find any recurring subscriptions or bills NOT already tracked. For each one return a JSON array — no other text, just valid JSON:
[
  {
    "name": "Netflix",
    "amount": 22.99,
    "frequency": "Monthly",
    "category": "Streaming",
    "description": "Video streaming service",
    "type": "subscription"
  }
]

Categories must be one of: Streaming, Music, Software, Fitness, Gaming, News, Insurance, Education, Other.
Frequency must be one of: Monthly, Annual, Weekly.
If nothing new found, return [].`;try{let t=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":n,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:1024,messages:[{role:`user`,content:o}]})});if(!t.ok)throw Error(`API error ${t.status}`);let i=(await t.json()).content[0].text.trim().match(/\[[\s\S]*\]/);if(!i)throw Error(`No JSON found in response`);tt=JSON.parse(i[0]).map((e,t)=>({...e,_key:`import_${Date.now()}_${t}`})),nt=new Set,r&&(r.style.display=`none`),e.target.value=``,renderSubscriptions()}catch(e){r&&(r.textContent=`⚠ ${e.message}`,r.style.display=``)}}function lt(e,t){let n=tt.find(t=>t._key===e);if(n){if(t===`subscription`)s.subscriptions||(s.subscriptions=[]),s.subscriptions.push({id:uid(),name:n.name,amount:n.amount,category:n.category,frequency:n.frequency}),window.saveData(s);else{let e=window.ensureMonthOverride(window.selectedBudgetMonth);e.expenses.push({id:k(e.expenses),name:n.name,amount:n.amount,frequency:`monthly`,category:`Subscriptions`,recurring:!0}),window.saveData(s)}nt.add(e),renderSubscriptions()}}function ut(e){nt.add(e),renderSubscriptions()}var dt=[{label:`Mortgage / Rent`,icon:`🏠`},{label:`Electricity`,icon:`⚡`},{label:`Gas`,icon:`🔥`},{label:`Water`,icon:`💧`},{label:`Internet`,icon:`📡`},{label:`Phone`,icon:`📱`},{label:`Insurance`,icon:`🛡️`},{label:`Car Registration`,icon:`🚗`},{label:`Rates & Taxes`,icon:`🏛️`},{label:`Loan Repayment`,icon:`💳`},{label:`Education`,icon:`📚`},{label:`Subscriptions`,icon:`📺`},{label:`Health`,icon:`🏥`},{label:`Other`,icon:`📦`}],ft=[`Monthly`,`Fortnightly`,`Weekly`,`Quarterly`,`Annually`];function pt(e){let t=dt.find(t=>t.label===e);return t?t.icon:`📦`}function mt(e){if(e<0)return`<span class="bill-due-badge overdue">Overdue ${Math.abs(e)}d</span>`;if(e===0)return`<span class="bill-due-badge today">Due today</span>`;if(e<=7)return`<span class="bill-due-badge soon">Due in ${e}d</span>`;let t=new Date;return t.setDate(t.getDate()+e),`<span class="bill-due-badge ok">${t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}</span>`}function ht(e){return(parseFloat(e.amount)||0)*({Weekly:52/12,Fortnightly:26/12,Monthly:1,Quarterly:1/3,Annually:1/12}[e.frequency||`Monthly`]||1)}function gt(){let e=document.getElementById(`bills-content`);if(!e)return;let r=s.bills||[],i=s.subscriptions||[],a=window._billsSubsFilter,o=`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,c=`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,l=r.reduce((e,t)=>e+ht(t),0)+i.reduce((e,t)=>e+subMonthlyAmount(t),0),u=r.filter(e=>n(e)<0).length,d=r.filter(e=>{let t=n(e);return t>=0&&t<=7}).length,f=new Date;f.setHours(0,0,0,0);let p=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],m=Array.from({length:14},(e,n)=>{let i=new Date(f);i.setDate(i.getDate()+n);let a=r.filter(e=>t(e).toDateString()===i.toDateString()),o=[i.toDateString()===f.toDateString()&&`today`,a.length&&`has-bill`].filter(Boolean).join(` `);return`<div class="bills-day" title="${a.map(e=>e.name).join(`, `)}">
      <div class="bills-day-label">${p[i.getDay()]}</div>
      <div class="bills-day-num ${o}">${i.getDate()}</div>
      ${a.length?`<div class="bills-day-dot"></div>`:`<div style="height:5px"></div>`}
    </div>`}).join(``);function h(e){let t=n(e),r=t<0?`overdue`:t<=7?`due-soon`:``,i=(e.frequency||`Monthly`)===`Monthly`?``:` · ${e.frequency}`;return`<div class="bill-row ${r}">
      <div class="bill-icon">${pt(e.category)}</div>
      <div class="bill-info">
        <div class="bill-name">${g(e.name)}<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;background:#fef3c7;color:#92400e;margin-left:6px">BILL</span>${e._vehicleRef?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#f0f9ff;color:#0369a1;margin-left:4px;cursor:pointer" onclick="event.stopPropagation();activateTab('vehicles')">Vehicle →</span>`:``}${e._docRef?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#f5f3ff;color:#6d28d9;margin-left:4px;cursor:pointer" onclick="event.stopPropagation();activateTab('documents')">Document →</span>`:``}</div>
        <div class="bill-meta">${e.category||``}${i}${e.autopay?` · Autopay ✓`:``}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="bill-amount">$${(parseFloat(e.amount)||0).toLocaleString()}</div>
        ${mt(t)}
      </div>
      ${t>=0?`<button class="bill-paid-btn" onclick="markBillPaid('${e.id}')">✓ Paid</button>`:``}
      <div class="bill-actions">
        <button class="icon-btn" title="Edit" onclick="openBillModal('${e.id}')">${o}</button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteBill('${e.id}')">${c}</button>
      </div>
    </div>`}function _(e){let t=subMonthlyAmount(e),n=e.frequency===`Annual`?`$${parseFloat(e.amount).toLocaleString()}/yr`:e.frequency===`Weekly`?`$${parseFloat(e.amount).toFixed(2)}/wk`:`$${parseFloat(e.amount).toFixed(2)}/mo`,r=e.renewalDate?` · Renews ${e.renewalDate}`:``;return`<div class="bill-row">
      <div class="bill-icon">${subCatIcon(e.category)}</div>
      <div class="bill-info">
        <div class="bill-name">${g(e.name)}<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;background:#ede9fe;color:#5b21b6;margin-left:6px">SUB</span></div>
        <div class="bill-meta">${e.category||`Other`} · ${n}${r}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="bill-amount">$${t.toFixed(2)}<span style="font-size:11px;font-weight:400;color:#94a3b8">/mo</span></div>
      </div>
      <div class="bill-actions">
        <button class="icon-btn" title="Edit" onclick="openSubModal('${e.id}')">${o}</button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteSub('${e.id}')">${c}</button>
      </div>
    </div>`}let v=[...r].sort((e,t)=>n(e)-n(t)),y=v.filter(e=>n(e)<0),b=v.filter(e=>{let t=n(e);return t>=0&&t<=7}),x=v.filter(e=>{let t=n(e);return t>7&&t<=31}),S=v.filter(e=>n(e)>31),C=a===`all`||a===`bills`,w=a===`all`||a===`subs`,T=window._subImportResults.filter(e=>!window._subImportDismissed.has(e._key));e.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;gap:4px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:3px">
        <button onclick="setBillsFilter('all')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${a===`all`?`var(--primary)`:`transparent`};color:${a===`all`?`#fff`:`var(--text-muted)`}">All (${r.length+i.length})</button>
        <button onclick="setBillsFilter('bills')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${a===`bills`?`var(--primary)`:`transparent`};color:${a===`bills`?`#fff`:`var(--text-muted)`}">Bills (${r.length})</button>
        <button onclick="setBillsFilter('subs')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${a===`subs`?`var(--primary)`:`transparent`};color:${a===`subs`?`#fff`:`var(--text-muted)`}">Subscriptions (${i.length})</button>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-secondary btn-sm" onclick="openSubModal()">+ Subscription</button>
        <button class="btn btn-primary btn-sm" onclick="openBillModal()">+ Bill</button>
      </div>
    </div>

    <div class="bills-summary">
      <div class="bills-stat">
        <div class="bills-stat-val">$${Math.round(l).toLocaleString()}</div>
        <div class="bills-stat-lbl">Monthly total</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val">$${Math.round(l*12).toLocaleString()}</div>
        <div class="bills-stat-lbl">Annual total</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val ${d>0?`warn`:`ok`}">${d}</div>
        <div class="bills-stat-lbl">Due this week</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val ${u>0?`danger`:`ok`}">${u}</div>
        <div class="bills-stat-lbl">Overdue</div>
      </div>
    </div>

    ${r.length&&C?`
    <div class="bills-timeline">
      <div class="bills-timeline-title">Next 14 days</div>
      <div class="bills-strip">${m}</div>
    </div>`:``}

    ${T.length?renderSubImportResults(T):``}

    <div class="bills-upcoming">
      ${C?`
        ${y.length?`<div class="bills-upcoming-group">⚠ Overdue</div>${y.map(h).join(``)}`:``}
        ${b.length?`<div class="bills-upcoming-group">This week</div>${b.map(h).join(``)}`:``}
        ${x.length?`<div class="bills-upcoming-group">This month</div>${x.map(h).join(``)}`:``}
        ${S.length?`<div class="bills-upcoming-group">Later</div>${S.map(h).join(``)}`:``}
        ${r.length?``:`<div style="padding:20px 0;color:var(--text-muted);font-size:13px">No bills yet — click <strong>+ Bill</strong> to add one.</div>`}
      `:``}
      ${w?`
        ${i.length?`<div class="bills-upcoming-group">Subscriptions</div>${i.map(_).join(``)}`:`<div style="padding:20px 0;color:var(--text-muted);font-size:13px">No subscriptions yet — click <strong>+ Subscription</strong> to add one.</div>`}
      `:``}
    </div>

    <!-- Smart Import -->
    <details style="margin-top:24px;background:linear-gradient(135deg,#0f172a,#1e3a5f);border-radius:12px;padding:16px 20px;color:#fff">
      <summary style="cursor:pointer;font-size:13px;font-weight:700;list-style:none;display:flex;align-items:center;gap:8px">🤖 Smart Import — find subscriptions from bank CSV</summary>
      <div style="margin-top:14px">
        <div style="font-size:12px;color:rgba(255,255,255,0.65);margin-bottom:12px">Upload a bank statement CSV and AI will find subscriptions and bills you haven't tracked yet.</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <input type="text" maxlength="200" class="sub-api-input" id="sub-api-key" placeholder="Anthropic API key"
            value="${N(`toto_ai_key`)||``}"
            oninput="prefsSet('toto_ai_key', this.value)" style="flex:1;min-width:200px">
          <label class="sub-upload-btn" for="sub-csv-input">📎 Upload CSV</label>
          <input type="file" id="sub-csv-input" accept=".csv,.txt" style="display:none" onchange="handleSubCSV(event)">
        </div>
        <div id="sub-import-status" style="margin-top:10px;font-size:13px;color:rgba(255,255,255,0.7);display:none"></div>
      </div>
    </details>

    ${yt()}
    <div id="sub-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,0.2)">
        <h3 id="sub-modal-title" style="font-size:17px;font-weight:700;margin-bottom:20px">Add Subscription</h3>
        <input type="hidden" id="sub-edit-id">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Name</label>
            <input id="sub-name" type="text" maxlength="200" placeholder="e.g. Netflix, Spotify" class="form-input" style="width:100%">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Category</label>
              <select id="sub-cat" class="form-select" style="width:100%">
                ${Qe.map(e=>`<option value="${e.label}">${e.icon} ${e.label}</option>`).join(``)}
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Frequency</label>
              <select id="sub-freq" class="form-select" style="width:100%">
                <option>Monthly</option><option>Annual</option><option>Weekly</option>
              </select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Amount ($)</label>
              <input id="sub-amount" type="number" max="99999999" min="0" step="0.01" placeholder="0.00" class="form-input" style="width:100%">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px">Renewal date</label>
              <input id="sub-renewal" type="date" class="form-input" style="width:100%">
            </div>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:22px;justify-content:flex-end">
          <button class="btn btn-ghost" onclick="closeSubModal()">Cancel</button>
          <button class="btn btn-primary" onclick="saveSub()">Save</button>
        </div>
      </div>
    </div>`}function _t(e){window._billsSubsFilter=e,gt()}function vt(){gt()}function yt(e){let t=e?(s.bills||[]).find(t=>t.id===e):null,n=dt.map(e=>`<option value="${e.label}" ${t&&t.category===e.label?`selected`:``}>${e.icon} ${e.label}</option>`).join(``),r=ft.map(e=>`<option value="${e}" ${t&&t.frequency===e||(!t||!t.frequency)&&e===`Monthly`?`selected`:``}>${e}</option>`).join(``),i=`width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none`,a=`font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px`;return`
    <div id="bill-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,0.2);max-height:90vh;overflow-y:auto">
        <h3 id="bill-modal-title" style="font-size:17px;font-weight:700;margin-bottom:20px">Add Bill</h3>
        <input type="hidden" id="bill-edit-id">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="${a}">Bill name</label>
            <input id="bill-name" type="text" maxlength="200" placeholder="e.g. AGL Electricity" style="${i}" value="${t?_(t.name):``}">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="${a}">Category</label>
              <select id="bill-cat" style="${i};background:#fff">${n}</select>
            </div>
            <div>
              <label style="${a}">Frequency</label>
              <select id="bill-freq" style="${i};background:#fff" onchange="toggleBillDayField()">${r}</select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="${a}">Amount ($)</label>
              <input id="bill-amount" type="number" max="99999999" min="0" step="1" placeholder="0" style="${i}" value="${t?t.amount:``}">
            </div>
            <div id="bill-day-wrap">
              <label style="${a}">Day of month due</label>
              <input id="bill-day" type="number" min="1" max="31" placeholder="e.g. 15" style="${i}" value="${t&&t.dueDay?t.dueDay:``}">
            </div>
            <div id="bill-start-wrap" style="display:none">
              <label style="${a}">Next due date</label>
              <input id="bill-start" type="date" style="${i}" value="${t&&t.startDate?t.startDate:``}">
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <input type="checkbox" id="bill-autopay" style="width:16px;height:16px;cursor:pointer" ${t&&t.autopay?`checked`:``}>
            <label for="bill-autopay" style="font-size:13px;font-weight:500;cursor:pointer">Autopay / direct debit</label>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:22px;justify-content:flex-end">
          <button class="btn-outline" onclick="closeBillModal()">Cancel</button>
          <button class="btn btn-primary" onclick="saveBill()">Save</button>
        </div>
      </div>
    </div>`}function bt(e){let t=e?(s.bills||[]).find(t=>t.id===e):null;gt();let n=document.getElementById(`bill-modal`);n&&(document.getElementById(`bill-modal-title`).textContent=t?`Edit Bill`:`Add Bill`,document.getElementById(`bill-edit-id`).value=e||``,t&&(document.getElementById(`bill-name`).value=t.name||``,document.getElementById(`bill-cat`).value=t.category||dt[0].label,document.getElementById(`bill-freq`).value=t.frequency||`Monthly`,document.getElementById(`bill-amount`).value=t.amount||``,document.getElementById(`bill-day`).value=t.dueDay||``,document.getElementById(`bill-start`).value=t.startDate||``,document.getElementById(`bill-autopay`).checked=!!t.autopay),St(),n.style.display=`flex`)}function xt(){let e=document.getElementById(`bill-modal`);e&&(e.style.display=`none`)}function St(){let e=document.getElementById(`bill-freq`)?.value,t=document.getElementById(`bill-day-wrap`),n=document.getElementById(`bill-start-wrap`);if(!t||!n)return;let r=e===`Monthly`;t.style.display=r?`block`:`none`,n.style.display=r?`none`:`block`}function Ct(){let e=document.getElementById(`bill-name`).value.trim(),t=parseFloat(document.getElementById(`bill-amount`).value),n=document.getElementById(`bill-cat`).value,r=document.getElementById(`bill-freq`).value,i=parseInt(document.getElementById(`bill-day`).value)||null,a=document.getElementById(`bill-start`).value||null,o=document.getElementById(`bill-autopay`).checked,c=document.getElementById(`bill-edit-id`).value;if(!e||isNaN(t))return;let l={name:e,amount:t,category:n,frequency:r,autopay:o};if(r===`Monthly`?l.dueDay=i:l.startDate=a,s.bills||(s.bills=[]),c){let e=s.bills.findIndex(e=>e.id===c);e!==-1&&(s.bills[e]={...s.bills[e],...l})}else s.bills.push({id:uid(),...l});window.saveData(s),xt(),gt()}function wt(e){s.bills=(s.bills||[]).filter(t=>t.id!==e),window.saveData(s),gt()}function Tt(e){let t=(s.bills||[]).find(t=>t.id===e);t&&(t.lastPaid=new Date().toISOString().slice(0,10),window.saveData(s),gt())}var P={work:{label:`Work`,emoji:`💼`,color:`#dbeafe`,text:`#1e40af`,financial:!1},study:{label:`Study`,emoji:`📚`,color:`#fef3c7`,text:`#92400e`,financial:!1},social:{label:`Social`,emoji:`🎉`,color:`#ede9fe`,text:`#5b21b6`,financial:!0},family:{label:`Family`,emoji:`👨‍👩‍👧`,color:`#fce7f3`,text:`#9d174d`,financial:!1},travel:{label:`Travel`,emoji:`✈️`,color:`#e0f2fe`,text:`#075985`,financial:!0},health:{label:`Health`,emoji:`🏥`,color:`#fef2f2`,text:`#991b1b`,financial:!0},finance:{label:`Finance`,emoji:`💰`,color:`#ecfeff`,text:`#155e75`,financial:!0},home:{label:`Home`,emoji:`🏠`,color:`#ecfeff`,text:`#166534`,financial:!0},school:{label:`School`,emoji:`🏫`,color:`#fff7ed`,text:`#9a3412`,financial:!0},other:{label:`Other`,emoji:`📦`,color:`#f1f5f9`,text:`#475569`,financial:!1}};new Date().toISOString().slice(0,7),new Date().toISOString().slice(0,10);var Et=new Set,Dt=[{dot:`#2563eb`,bg:`#dbeafe`,text:`#1e40af`},{dot:`#db2777`,bg:`#fce7f3`,text:`#9d174d`},{dot:`#d97706`,bg:`#fef3c7`,text:`#92400e`},{dot:`#7c3aed`,bg:`#ede9fe`,text:`#5b21b6`},{dot:`#16a34a`,bg:`#dcfce7`,text:`#166534`},{dot:`#0891b2`,bg:`#ecfeff`,text:`#155e75`},{dot:`#ea580c`,bg:`#ffedd5`,text:`#9a3412`},{dot:`#be185d`,bg:`#fdf2f8`,text:`#831843`}];function Ot(){let e=s.householdProfile?.members||[],t=s.kids?.profiles||[],n=[],r=0;return e.forEach((e,t)=>{let i=Dt[r%Dt.length];e.role===`adult`&&e.name&&(n.push({id:`adult-`+t,name:e.name,emoji:e.emoji||`🧑`,...i}),r++)}),t.forEach((e,t)=>{let i=Dt[r%Dt.length];n.push({id:e.id||`kid-`+t,name:e.name,emoji:e.emoji||`🧒`,...i}),r++}),n.length===0&&n.push({id:`adult-0`,name:`Everyone`,emoji:`👨‍👩‍👧`,...Dt[0]}),n}function kt(e){return!e||e===`everyone`?{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}:Ot().find(t=>t.id===e)||{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}}function At(e){return Array.isArray(e.memberIds)?e.memberIds:e.memberId?[e.memberId]:[`everyone`]}function jt(e){return kt(At(e).find(e=>e!==`everyone`)||`everyone`)}function Mt(e){let t=At(e);return t.includes(`everyone`)||t.length===0?`Everyone`:t.map(e=>kt(e).name).join(`, `)}function Nt(e){if(e.recurrence&&e.recurrence.type&&e.recurrence.type!==`one_time`){let t={daily:`Every day`,weekdays:`Mon–Fri`,weekends:`Sat & Sun`};if(t[e.recurrence.type])return t[e.recurrence.type];if(e.recurrence.type===`specific_days`)return(e.recurrence.days||[]).map(e=>[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`][e]).join(`, `)||`Specific days`;if(e.recurrence.type===`interval`)return`Every ${e.recurrence.intervalDays} days`}return e.recurring&&e.recurring!==`none`?{weekly:`Every week`,fortnightly:`Every 2 weeks`,monthly:`Every month`,quarterly:`Every 3 months`,yearly:`Annually`}[e.recurring]||e.recurring:``}function Pt(){let e=s.planner?.events||[];return Et.size===0?e:e.filter(e=>{let t=At(e);return t.includes(`everyone`)?!0:[...Et].some(e=>t.includes(e))})}function Ft(e){return Pt().filter(t=>t._recurringSourceId?t.date===e:t.recurrence&&t.recurrence.type!==`one_time`?_recurrenceMatchesDate(t.recurrence,e):t.endDate&&t.endDate>t.date?e>=t.date&&e<=t.endDate:t.date===e)}function It(e){if(!e)return``;let[t,n]=e.split(`:`).map(Number);return`${t%12||12}:${String(n).padStart(2,`0`)}${t>=12?`pm`:`am`}`}var Lt=new Date().toISOString().slice(0,7);function Rt(){let[e,t]=Lt.split(`-`).map(Number),n=new Date(e,t-2,1);Lt=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,renderForecast()}function zt(){let[e,t]=Lt.split(`-`).map(Number),n=new Date(e,t,1);Lt=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,renderForecast()}function Bt(){let e=document.getElementById(`forecast-content`);if(!e)return;let t=(s.planner?.events||[]).filter(e=>e.date&&e.date.startsWith(_forecastMonth)),n=window.getMonthData(_forecastMonth),r=O(n.income)-O(n.expenses),[i,a]=_forecastMonth.split(`-`).map(Number),o=new Date(i,a,0).getDate(),c=[],l=1;for(;l<=o;){new Date(i,a-1,l);let e=l;for(;e<o&&new Date(i,a-1,e+1).getDay()!==1;)e++;c.push({start:l,end:e,events:[]}),l=e+1}t.sort((e,t)=>e.date.localeCompare(t.date)).forEach(e=>{let t=parseInt(e.date.split(`-`)[2]),n=c.find(e=>t>=e.start&&t<=e.end);n&&n.events.push(e)}),t.filter(e=>e.estimates&&e.estimates.length>0);let u=t.filter(e=>!e.estimates||e.estimates.length===0),d=t.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),f=r-d,p=new Date(i,a-1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`}),m=!!N(`toto_ai_key`),h=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:8px">
        <button class="btn btn-sm" onclick="_prevForecastMonth()" style="font-size:16px;padding:2px 10px">‹</button>
        <span style="font-size:15px;font-weight:700;min-width:160px;text-align:center">${p}</span>
        <button class="btn btn-sm" onclick="_nextForecastMonth()" style="font-size:16px;padding:2px 10px">›</button>
      </div>
      ${m&&u.length>0?`
        <button class="btn btn-primary btn-sm" id="estimate-all-btn" onclick="estimateAllEvents()">
          Estimate all (${u.length} events)
        </button>`:``}
    </div>`;if(t.length===0){h+=`<div class="empty" style="margin-top:24px"><div class="empty-icon">📅</div><p>No events planned for ${p}. Add events in the Planner tab.</p>
      <button class="btn btn-primary" style="margin-top:12px" onclick="activateTab('planner')">Go to Planner</button></div>`,e.innerHTML=h;return}h+=`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px">
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Estimated Total</div>
        <div style="font-size:22px;font-weight:800;color:var(--danger)">${b(d)}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Budget Surplus</div>
        <div style="font-size:22px;font-weight:800;color:${r>=0?`var(--success)`:`var(--danger)`}">${b(Math.abs(r))}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">${f>=0?`Remaining After Events`:`Shortfall`}</div>
        <div style="font-size:22px;font-weight:800;color:${f>=0?`var(--success)`:`var(--danger)`}">${f>=0?``:`-`}${b(Math.abs(f))}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Events</div>
        <div style="font-size:22px;font-weight:800">${t.length}</div>
        ${u.length>0?`<div style="font-size:11px;color:var(--warning);margin-top:2px">${u.length} not yet estimated</div>`:``}
      </div>
    </div>`,c.forEach((e,t)=>{if(e.events.length===0)return;let n=e.events.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),r=new Date(i,a-1,e.start).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),o=new Date(i,a-1,e.end).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});h+=`
      <div class="section" style="margin-bottom:16px">
        <div class="section-header">
          <div>
            <div class="section-title">Week ${t+1}</div>
            <div class="section-subtitle">${r} – ${o}</div>
          </div>
          <span style="font-size:15px;font-weight:700;color:${n>0?`var(--danger)`:`var(--text-muted)`}">${n>0?b(n):`No estimates`}</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Event</th><th>Category</th><th class="amount">Estimated</th><th></th></tr></thead>
            <tbody>
              ${e.events.map(e=>{let t=P[e.category]||P.other,n=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),r=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`}),i=e.estimates&&e.estimates.length>0;return`<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${r}</td>
                  <td style="font-weight:500">${g(e.title)}</td>
                  <td><span style="display:inline-block;padding:2px 8px;border-radius:99px;background:${t.color};color:${t.text};font-size:11px;font-weight:600">${t.label}</span></td>
                  <td class="amount" style="font-weight:600;${i?``:`color:var(--text-muted)`}">${i?b(n):`—`}</td>
                  <td style="text-align:right">
                    ${i?`<details style="font-size:11px;color:var(--text-muted)"><summary style="cursor:pointer">breakdown</summary>
                          <div style="padding:4px 0">${e.estimates.filter(e=>e.accepted).map(e=>`<div style="display:flex;justify-content:space-between;gap:12px;padding:2px 0"><span>${g(e.name)}</span><span>${b(e.amount)}</span></div>`).join(``)}</div>
                        </details>`:m?`<button class="btn btn-sm" style="font-size:11px" onclick="estimatePlannerEvent('${e.id}')">Estimate</button>`:`<span style="font-size:11px;color:var(--text-muted)">No API key</span>`}
                  </td>
                </tr>`}).join(``)}
            </tbody>
          </table>
        </div>
      </div>`});let _={};t.forEach(e=>{(e.estimates||[]).filter(e=>e.accepted).forEach(e=>{let t=e.category||`Other`;_[t]=(_[t]||0)+(e.amount||0)})});let v=Object.entries(_).sort((e,t)=>t[1]-e[1]);v.length>0&&(h+=`
      <div class="section">
        <div class="section-header"><div class="section-title">By Category</div></div>
        <div style="padding:16px 20px">
          ${v.map(([e,t])=>{let n=d>0?t/d*100:0;return`<div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                <span style="font-weight:500">${e}</span>
                <span style="font-weight:600">${b(t)} <span style="font-weight:400;color:var(--text-muted)">${Math.round(n)}%</span></span>
              </div>
              <div style="height:6px;background:var(--border);border-radius:4px;overflow:hidden">
                <div style="height:100%;width:${n.toFixed(1)}%;background:#0891b2;border-radius:4px"></div>
              </div>
            </div>`}).join(``)}
        </div>
      </div>`),e.innerHTML=h}async function Vt(){let e=N(`toto_ai_key`);if(!e)return;let t=(s.planner?.events||[]).filter(e=>e.date&&e.date.startsWith(_forecastMonth)&&(!e.estimates||e.estimates.length===0));if(!t.length)return;let n=document.getElementById(`estimate-all-btn`);n&&(n.textContent=`⏳ Estimating…`,n.disabled=!0);let r=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,i=(s.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,a=t.map(e=>({id:e.id,title:e.title,category:(P[e.category]||P.other).label,date:e.date,notes:e.notes||``})),o=`You are a family finance assistant for an Australian family (${r} adult${r>1?`s`:``}, ${i} child${i===1?``:`ren`}).

Estimate realistic costs for each of these events:
${JSON.stringify(a)}

Return ONLY a JSON array — one entry per event, each containing the event id and an items array:
[{"id":"event-id","items":[{"name":"Description","amount":150,"category":"Food & Dining"}]}]

Rules:
- Use realistic 2025 Australian dollar amounts
- Round to nearest $5 or $10
- Maximum 6 items per event
- Consider family size
- Categories: Transport, Accommodation, Food & Dining, Entertainment, Gifts, Clothing, Health, Education, Shopping, Other
- No markdown, no code fences, just raw JSON`;try{let t=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":e,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:4096,messages:[{role:`user`,content:o}]})});if(!t.ok)throw Error(`API ${t.status}`);let n=(await t.json()).content[0].text.replace(/```[\w]*\n?/g,``).trim().match(/\[[\s\S]*\]/);if(!n)throw Error(`No JSON`);JSON.parse(n[0]).forEach(e=>{let t=(s.planner?.events||[]).find(t=>t.id===e.id);t&&e.items&&(t.estimates=e.items.map((e,t)=>({id:`est-${Date.now()}-${t}`,name:e.name,amount:Number(e.amount)||0,category:e.category||`Other`,accepted:!0})))}),window.saveData(s),Bt()}catch(e){n&&(n.textContent=`Estimate all (${t.length} events)`,n.disabled=!1),console.error(`Batch estimate error:`,e)}}function F(){let e=document.getElementById(`planner-content`);if(!e)return;s.planner||(s.planner={events:[]});let t=new Date().toISOString().slice(0,10),n=Ot(),r={id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`},i=[...n,r],a=i.map(e=>e.name[0].toUpperCase()),o=i.map((e,t)=>{if(e.id===`everyone`)return`👨‍👩‍👧`;let n=e.name[0].toUpperCase();return a.filter(e=>e===n).length>1?(e.name[0]+(e.name[1]||``)).toUpperCase():n}),c=i.map((e,t)=>{let n=e.id===`everyone`,r=n?_plannerFilterMembers.size===0:_plannerFilterMembers.has(e.id),i=!r&&_plannerFilterMembers.size>0&&!n,a=n?`<span style="font-size:14px">👨‍👩‍👧</span>`:`<span>${o[t]}</span>`;return`<div class="pl-legend-chip ${r?`active`:``} ${i?`dimmed`:``}"
      onclick="_plannerToggleFilter('${e.id}')">
      <div class="pl-chip-avatar" style="background:${e.bg};color:${e.text}">${a}</div>
      <span>${e.name}</span>
    </div>`}).join(``),l=``;l=_plannerView===`month`?Ht():Ut();let u=new Date;u.setDate(u.getDate()+30);let d=u.toISOString().slice(0,10),f=Pt().filter(e=>e.date>=t&&e.date<=d),p=0,m=Object.entries(P).map(([e,t])=>{let n=f.filter(t=>t.category===e);n.length&&(p+=n.length);let r=n[0],i=r?g(r.title)+(r.date?` · ${new Date(r.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`:``):`Nothing planned`;return`<div class="pl-life-tile" onclick="_plannerOpenLifeSheet('${e}')">
      <div class="pl-life-tile-top">
        <div class="pl-life-tile-icon" style="background:${t.color||`#F4F4F5`}">${t.emoji}</div>
        <div>
          <div class="pl-life-tile-name">${t.label}</div>
          <div class="pl-life-tile-count">${n.length} event${n.length===1?``:`s`}</div>
        </div>
      </div>
      <div class="pl-life-tile-next">${i}</div>
    </div>`}).join(``),h=vn(),_=h.map(e=>{let t=e.days<0?`Now!`:e.days===0?`Today!`:e.days===1?`Tomorrow`:`In ${e.days} days`,n=e.days<=0?`#ef4444`:e.days===1?`var(--good)`:e.days<=3?`#f59e0b`:`var(--iris-1)`;return`<div class="pl-nudge-tile">
      <div class="pl-nudge-tile-icon" style="background:${e.days<=0?`#FEF2F2`:e.days===1?`#ECFDF5`:e.days<=3?`#FFF7ED`:`#EEF2FF`}">${e.emoji}</div>
      <div class="pl-nudge-tile-body">
        <div class="pl-nudge-tile-title">${g(e.title)}</div>
        <div class="pl-nudge-tile-sub">${g(e.body)}</div>
      </div>
      <div class="pl-nudge-tile-day" style="color:${n}">${t}</div>
    </div>`}).join(``),v=_plannerCollapseState[`life-areas`],y=_plannerCollapseState.nudge,b=t.slice(0,7);new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`}),e.innerHTML=`
    <div style="position:relative;display:flex;flex-direction:column;height:100%;overflow:hidden">

      <!-- Month bar (wallet style) -->
      <div class="pl-month-bar">
        <button class="pl-nav-arrow" onclick="_plannerPrevMonth()">&#8249;</button>
        <div class="pl-month-label">${new Date(_plannerMonth+`-01`).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</div>
        <button class="pl-nav-arrow" onclick="_plannerNextMonth()">&#8250;</button>
      </div>

      <!-- Filter tile: view toggle + members + calendar strip -->
      <div class="pl-control-tile">
        <div class="pl-sub-bar">
          <div class="pl-view-toggle">
            <button class="pl-view-btn ${_plannerMonth===b&&_plannerSelectedDay===t?`active`:``}" onclick="_plannerGoToday()">Today</button>
            <button class="pl-view-btn ${_plannerView===`week`?`active`:``}" onclick="_plannerSetView('week')">Week</button>
            <button class="pl-view-btn ${_plannerView===`month`?`active`:``}" onclick="_plannerSetView('month')">Month</button>
          </div>
          <button class="pl-add-btn" onclick="openPlannerModal(null,'${_plannerSelectedDay||t}')">+</button>
        </div>
        <div class="pl-legend">${c}</div>
        ${_plannerView===`month`?`
          <div style="border-bottom:1px solid rgba(24,24,27,.06);padding:0 6px">
            <div class="pl-month-hdr">
              <div class="pl-month-hdr-cell">M</div><div class="pl-month-hdr-cell">T</div>
              <div class="pl-month-hdr-cell">W</div><div class="pl-month-hdr-cell">T</div>
              <div class="pl-month-hdr-cell">F</div><div class="pl-month-hdr-cell">S</div>
              <div class="pl-month-hdr-cell">S</div>
            </div>
            ${l}
          </div>`:l}
        <div style="height:10px"></div>
      </div>

      <!-- Scrollable body -->
      <div style="flex:1;overflow-y:auto;">

        <!-- Inline agenda (week + month view) -->
        ${Jt(_plannerSelectedDay)}

        <!-- Life areas -->
        <div class="pl-section-card">
          <div class="pl-section-card-hdr" onclick="_plannerToggleSection('life-areas')">
            <div class="pl-section-card-title">
              Life Areas
              <span style="font-size:11px;font-weight:700;background:var(--iris-1);color:#fff;padding:1px 8px;border-radius:99px;letter-spacing:0">${p}</span>
            </div>
            <button class="pl-section-card-toggle">${v?`Hide`:`Show`}</button>
          </div>
          ${v?`<div class="pl-section-card-body"><div class="pl-life-grid">${m}</div></div>`:``}
        </div>

        <!-- Nudges -->
        ${h.length>0?`
        <div class="pl-section-card">
          <div class="pl-section-card-hdr" onclick="_plannerToggleSection('nudge')">
            <div class="pl-section-card-title">
              Heads up 🐕
              <span style="font-size:11px;font-weight:700;background:#f59e0b;color:#fff;padding:1px 8px;border-radius:99px;letter-spacing:0">${h.length}</span>
            </div>
            <button class="pl-section-card-toggle">${y?`Hide`:`Show`}</button>
          </div>
          ${y?`<div class="pl-section-card-body">${_}</div>`:``}
        </div>`:``}

        <div style="height:24px"></div>

      </div>

      <!-- Day sheet (hidden, kept for compatibility) -->
      <div class="pl-day-sheet-overlay" id="pl-day-sheet-overlay" onclick="_plannerHandleDaySheetClick(event)" style="display:none">
        <div class="pl-day-sheet" id="pl-day-sheet">
          <div class="pl-sheet-handle" onclick="_plannerCloseDaySheet()"></div>
          <div class="pl-sheet-header">
            <div>
              <div class="pl-sheet-title" id="pl-sheet-title"></div>
              <div class="pl-sheet-date" id="pl-sheet-date"></div>
            </div>
            <button class="pl-sheet-add" id="pl-sheet-add-btn" data-date="${_plannerSelectedDay}" onclick="_plannerOpenModalFromSheet()">+ Add</button>
          </div>
          <div class="pl-sheet-list" id="pl-sheet-list"></div>
        </div>
      </div>

      <!-- Life area sheet -->
      <div class="pl-life-overlay" id="pl-life-overlay" onclick="_plannerHandleLifeSheetClick(event)">
        <div class="pl-life-sheet">
          <div class="pl-sheet-handle" onclick="_plannerCloseLifeSheet()"></div>
          <div class="pl-life-sheet-header">
            <div class="pl-life-sheet-icon" id="pl-life-sheet-icon"></div>
            <div class="pl-life-sheet-title" id="pl-life-sheet-title"></div>
            <div class="pl-life-sheet-count" id="pl-life-sheet-count"></div>
          </div>
          <div class="pl-life-sheet-list" id="pl-life-sheet-list"></div>
        </div>
      </div>

      <!-- Event detail sheet -->
      <div class="pl-detail-overlay" id="pl-detail-overlay" onclick="_plannerHandleDetailClick(event)">
        <div class="pl-detail-sheet" id="pl-detail-sheet">
          <div class="pl-sheet-handle" onclick="_plannerCloseDetail()"></div>
          <div class="pl-detail-color-bar" id="pl-detail-color-bar"></div>
          <div class="pl-detail-header">
            <div class="pl-detail-title-row">
              <div class="pl-detail-title" id="pl-detail-title"></div>
              <button class="pl-detail-edit-btn" onclick="_plannerEditFromDetail()">Edit</button>
            </div>
          </div>
          <div class="pl-detail-body" id="pl-detail-body"></div>
        </div>
      </div>

      <!-- Share sheet -->
      <div class="pl-share-overlay" id="pl-share-overlay" onclick="_plannerHandleShareClick(event)">
        <div class="pl-share-sheet">
          <div class="pl-sheet-handle" onclick="_plannerCloseShare()"></div>
          <div class="pl-share-header">
            <div class="pl-share-title">Share this event</div>
            <div class="pl-share-sub" id="pl-share-sub"></div>
          </div>
          <div class="pl-share-url-box">
            <div class="pl-share-url-text" id="pl-share-url"></div>
            <button class="pl-share-copy-btn" id="pl-share-copy-btn" onclick="_plannerCopyShareUrl()">Copy</button>
          </div>
          <div class="pl-share-actions">
            <div class="pl-share-action" onclick="_plannerShareVia('sms')"><span style="font-size:20px">💬</span>SMS</div>
            <div class="pl-share-action" onclick="_plannerShareVia('whatsapp')"><span style="font-size:20px">💚</span>WhatsApp</div>
            <div class="pl-share-action" onclick="_plannerShareVia('email')"><span style="font-size:20px">📧</span>Email</div>
          </div>
          <div class="pl-share-note">🔗 Recipients don't need the Toto app — they'll see a branded Toto page with the event details. The link expires after 30 days.</div>
        </div>
      </div>

    </div>`}function Ht(){let[e,t]=_plannerMonth.split(`-`).map(Number),n=new Date().toISOString().slice(0,10),r=new Date(e,t-1,1).getDay(),i=r===0?6:r-1,a=new Date(e,t,0).getDate(),o=new Date(e,t-1,0).getDate(),s=[];for(let n=i-1;n>=0;n--){let r=o-n,i=t-1||12,a=i===12?e-1:e;s.push({dateStr:`${a}-${String(i).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`,day:r,muted:!0})}for(let n=1;n<=a;n++)s.push({dateStr:`${e}-${String(t).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,day:n,muted:!1});let c=s.length%7==0?0:7-s.length%7;for(let n=1;n<=c;n++){let r=t+1>12?1:t+1,i=r===1?e+1:e;s.push({dateStr:`${i}-${String(r).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,day:n,muted:!0})}return`<div class="pl-month-grid">${s.map(e=>{let t=e.dateStr===n,r=e.dateStr===_plannerSelectedDay,i=e.dateStr?Ft(e.dateStr):[],a=[...new Set(i.flatMap(e=>At(e)))].filter(e=>e!==`everyone`).slice(0,3).map(e=>`<div class="pl-cell-dot" style="background:${kt(e).dot}"></div>`).join(``),o=i.length>3?`<div style="font-size:8px;color:var(--text-muted);font-weight:600">+</div>`:``;return`<div class="pl-cal-cell ${e.muted?`muted`:``} ${t?`today`:``} ${r?`selected`:``}"
                 onclick="_plannerSelectDay('${e.dateStr}')">
      <div class="pl-cell-num">${e.day}</div>
      <div class="pl-cell-dots">${a}${o}</div>
    </div>`}).join(``)}</div>`}function Ut(){let e=new Date(_plannerSelectedDay+`T12:00:00`),t=e.getDay(),n=new Date(e);n.setDate(e.getDate()-(t===0?6:t-1));let r=new Date().toISOString().slice(0,10),i=[`S`,`M`,`T`,`W`,`T`,`F`,`S`];return`<div class="week-strip">${Array.from({length:7},(e,t)=>{let r=new Date(n);return r.setDate(n.getDate()+t),{date:r,dateStr:r.toISOString().slice(0,10)}}).map(({date:e,dateStr:t})=>{let n=t===r,a=t===_plannerSelectedDay,o=Ft(t),s=o.length>0,c=[...new Set(o.flatMap(e=>At(e)))].filter(e=>e!==`everyone`).slice(0,3),l=a?`rgba(255,255,255,0.6)`:c.length?kt(c[0]).dot:`#C4C2D4`;return`<div class="${a?`ws-day selected`+(n?` today-outline`:``):n?`ws-day today-outline`:`ws-day`}${s?` has`:``}" onclick="_plannerSelectDay('${t}')">
      <div class="ws-init">${i[e.getDay()]}</div>
      <div class="ws-num">${e.getDate()}</div>
      <div class="ws-dot" style="${s?`background:${l}`:``}"></div>
    </div>`}).join(``)}</div>`}function Wt(e){let t=P[e.category]||P.other,n=_plannerExpanded.has(e.id),r=e.estimates||[],i=r.filter(e=>e.accepted),a=i.reduce((e,t)=>e+(t.amount||0),0),o=r.reduce((e,t)=>e+(t.amount||0),0),s=e.pushed?`<span class="planner-pushed-badge">✓ In budget</span>`:r.length>0?`<span style="font-size:12px;color:var(--text-muted)">$${a.toLocaleString(`en-AU`)}</span>`:``,c=Nt(e);c&&(s=`<span class="recurring-badge">🔄 ${c}</span> `+s);let l=``;return n&&(l=`<div class="planner-event-body">`,e.notes&&(l+=`<p class="planner-notes">${g(e.notes)}</p>`),r.length>0?(l+=r.map(t=>`
        <div class="planner-estimate-row">
          <div class="planner-estimate-check ${t.accepted?`accepted`:``}" onclick="togglePlannerEstimate('${e.id}','${t.id}')">
            ${t.accepted?`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`:``}
          </div>
          <div class="planner-estimate-name"><div>${g(t.name)}</div><div class="planner-estimate-cat">${g(t.category)}</div></div>
          <div class="planner-estimate-amount">$${t.amount.toLocaleString(`en-AU`)}</div>
        </div>`).join(``),l+=`<div class="planner-estimate-footer">
        <div class="planner-total">All: <strong>$${o.toLocaleString(`en-AU`)}</strong> · Selected: <strong>$${a.toLocaleString(`en-AU`)}</strong></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${e.pushed?``:`<button class="planner-ai-btn" id="ai-btn-${e.id}" onclick="estimatePlannerEvent('${e.id}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>Re-estimate</button>`}
          ${e.pushed===!0?`<button class="planner-push-btn" style="background:var(--danger)" onclick="unpushEventFromBudget('${e.id}')">Remove from budget</button>`:e.pushed===`suggested`?`<button class="planner-push-btn" style="background:#f59e0b;cursor:default" disabled>⏳ Pending approval</button>`:`<button class="planner-push-btn" ${i.length===0?`disabled`:``} onclick="suggestEventToBudget('${e.id}')">→ Suggest to budget</button>`}
        </div>
      </div>`):t.financial&&(l+=`<div style="text-align:center;padding:16px 0">
        <p style="color:var(--text-muted);font-size:13px;margin-bottom:12px">Let Toto estimate the costs.</p>
        <button class="planner-ai-btn" id="ai-btn-${e.id}" onclick="estimatePlannerEvent('${e.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          Estimate costs with AI
        </button>
      </div>`),l+=`</div>`),`<div class="planner-event-card" id="planner-ev-${e.id}">
    <div class="planner-event-header" onclick="togglePlannerCard('${e.id}')">
      <div class="planner-event-type-badge" style="background:${t.color};color:${t.text}">${t.emoji}</div>
      <div class="planner-event-meta">
        <div class="planner-event-title">${g(e.title)}</div>
        <div class="planner-event-date">${t.label}</div>
      </div>
      <div class="planner-event-side">
        ${s}
        <button onclick="event.stopPropagation();openPlannerModal('${e.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);padding:4px;border-radius:6px;display:flex" title="Edit">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <svg class="planner-chevron ${n?`open`:``}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
    ${l}
  </div>`}function Gt(){let[e,t]=_plannerMonth.split(`-`).map(Number),n=t===1?e-1:e,r=t===1?12:t-1;_plannerMonth=`${n}-${String(r).padStart(2,`0`)}`,_plannerSelectedDay=`${n}-${String(r).padStart(2,`0`)}-01`,F()}function Kt(){let[e,t]=_plannerMonth.split(`-`).map(Number),n=t===12?e+1:e,r=t===12?1:t+1;_plannerMonth=`${n}-${String(r).padStart(2,`0`)}`,_plannerSelectedDay=`${n}-${String(r).padStart(2,`0`)}-01`,F()}function qt(e){_plannerSelectedDay=e,_plannerMonth=e.slice(0,7),F()}function Jt(e){let t=new Date(e+`T12:00:00`),n=e===new Date().toISOString().slice(0,10)?`Today`:t.toLocaleDateString(`en-AU`,{weekday:`long`}),r=t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`long`,year:`numeric`}),i=Ft(e).sort((e,t)=>e.allDay&&!t.allDay?-1:!e.allDay&&t.allDay?1:(e.time||`99:99`).localeCompare(t.time||`99:99`)),a=``;return a=i.length===0?`<div class="pl-agenda-empty">Nothing planned — enjoy the quiet ☀️<br><span style="color:var(--iris-1);cursor:pointer;font-weight:600;font-size:13px" onclick="openPlannerModal(null,'${e}')">+ Add an event</span></div>`:`<div class="pl-agenda-list">${i.map(t=>{let n=jt(t),r=P[t.category]||P.other,i=t.allDay||!t.time?`All day`:It(t.time),a=Mt(t),o=new Date().getHours()*60+new Date().getMinutes(),s=t.time?parseInt(t.time.split(`:`)[0])*60+parseInt(t.time.split(`:`)[1]):-1,c=e===new Date().toISOString().slice(0,10)&&s>=0&&o>=s&&o<s+90,l=r.color||`#f1f5f9`,u=r.text||`#475569`;return`<div class="pl-agenda-ev">
        <div class="pl-agenda-time-col">
          <span class="pl-agenda-time">${i}</span>
        </div>
        <div class="pl-agenda-timeline">
          <div class="pl-agenda-dot${c?` now`:``}" style="color:${u};background:${c?u:l}"></div>
          <div class="pl-agenda-line"></div>
        </div>
        <div class="pl-agenda-card" style="background:${l};border-color:${u}22" onclick="_plannerOpenDetail('${t.id}')">
          <div class="pl-agenda-card-title">${g(t.title)}</div>
          <div class="pl-agenda-card-meta">
            <span class="pl-agenda-who-dot" style="background:${n.dot}"></span>
            <span>${a}</span>
          </div>
          ${r.label?`<div class="pl-agenda-cat-pill" style="background:${u}1a;color:${u}">${r.emoji} ${r.label}</div>`:``}
        </div>
      </div>`}).join(``)}</div>`,`<div class="pl-section-card pl-agenda">
    <div class="pl-agenda-hdr" style="padding:14px 16px 12px;margin-bottom:0;border-bottom:${i.length?`1px solid rgba(24,24,27,.06)`:`none`}">
      <div>
        <span class="pl-agenda-date">${n}</span>
        <span class="pl-agenda-sub" style="margin-left:8px">${r}</span>
      </div>
      <button class="pl-agenda-add" onclick="openPlannerModal(null,'${e}')">+ Add</button>
    </div>
    <div style="padding:${i.length?`12px 16px`:`0`}">${a}</div>
  </div>`}function Yt(e){_plannerMonth=e.slice(0,7),_plannerSelectedDay=e,activateTab(`planner`)}function Xt(){let e=new Date().toISOString().slice(0,10);_plannerMonth=e.slice(0,7),_plannerSelectedDay=e,F()}function Zt(e){_plannerView=e,_plannerCollapseState[`life-areas`]=e===`week`,_plannerCollapseState.nudge=e===`week`,F()}function Qt(e){_plannerCollapseState[e]=!_plannerCollapseState[e],F()}function $t(e){e===`everyone`?_plannerFilterMembers.clear():_plannerFilterMembers.has(e)?_plannerFilterMembers.delete(e):_plannerFilterMembers.add(e),F()}function en(e){let t=document.getElementById(`pl-day-sheet-overlay`);if(!t)return;let n=new Date(e+`T12:00:00`),r=new Date().toISOString().slice(0,10);document.getElementById(`pl-sheet-title`).textContent=e===r?`Today`:n.toLocaleDateString(`en-AU`,{weekday:`long`}),document.getElementById(`pl-sheet-date`).textContent=n.toLocaleDateString(`en-AU`,{day:`numeric`,month:`long`,year:`numeric`}),document.getElementById(`pl-sheet-add-btn`).dataset.date=e,tn(e),t.classList.add(`open`)}function tn(e){let t=Ft(e).sort((e,t)=>(e.time||`99:99`).localeCompare(t.time||`99:99`)),n=document.getElementById(`pl-sheet-list`);if(n){if(t.length===0){n.innerHTML=`<div class="pl-sheet-empty">Nothing planned. <span style="color:var(--primary);cursor:pointer;font-weight:600" onclick="_plannerOpenModalFromSheet()">Add an event →</span></div>`;return}n.innerHTML=t.map((e,t)=>{let n=jt(e),r=P[e.category]||P.other,i=Mt(e),a=e.allDay||!e.time?`All day`:It(e.time);return`<div class="pl-sheet-ev" onclick="_plannerOpenDetail('${e.id}')">
      <div class="pl-sheet-ev-time">${a}</div>
      <div class="pl-sheet-ev-bar" style="background:${n.dot}"></div>
      <div style="flex:1;min-width:0">
        <div class="pl-sheet-ev-title">${g(e.title)}</div>
        <div class="pl-sheet-ev-meta">${i} · ${r.emoji} ${r.label}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4D4D8" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>`}).join(``)}}function nn(){let e=document.getElementById(`pl-day-sheet-overlay`);e&&e.classList.remove(`open`)}function rn(e){e.target===document.getElementById(`pl-day-sheet-overlay`)&&nn()}function an(){let e=document.getElementById(`pl-sheet-add-btn`)?.dataset?.date||_plannerSelectedDay;nn(),An(null,e)}function on(e){let t=P[e];if(!t)return;let n=new Date().toISOString().slice(0,10),r=(s.planner?.events||[]).filter(t=>t.category===e&&t.date>=n).sort((e,t)=>e.date.localeCompare(t.date));document.getElementById(`pl-life-sheet-icon`).textContent=t.emoji,document.getElementById(`pl-life-sheet-title`).textContent=t.label,document.getElementById(`pl-life-sheet-count`).textContent=r.length+` upcoming`;let i=``;if(r.length===0)i=`<div class="pl-sheet-empty">No upcoming ${t.label.toLowerCase()} events.</div>`;else{let e=``;r.forEach(t=>{let n=t.date.slice(0,7);if(n!==e){let r=new Date(t.date+`T12:00:00`);i+=`<div class="pl-life-day-hdr">${r.toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</div>`,e=n}let r=jt(t),a=Mt(t),o=new Date(t.date+`T12:00:00`);i+=`<div class="pl-life-ev-row" onclick="_plannerCloseLifeSheet();_plannerOpenDetail('${t.id}')">
        <div class="pl-life-ev-date">${o.toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`})}</div>
        <div class="pl-life-ev-bar" style="background:${r.dot}"></div>
        <div class="pl-life-ev-content">
          <div class="pl-life-ev-title">${g(t.title)}</div>
          <div class="pl-life-ev-meta">${a}${t.time?` · `+It(t.time):``}</div>
        </div>
      </div>`})}document.getElementById(`pl-life-sheet-list`).innerHTML=i,document.getElementById(`pl-life-overlay`).classList.add(`open`)}function sn(){document.getElementById(`pl-life-overlay`)?.classList.remove(`open`)}function cn(e){e.target===document.getElementById(`pl-life-overlay`)&&sn()}function ln(e){let t=(s.planner?.events||[]).find(t=>t.id===e);if(!t)return;_plannerDetailEvId=e;let n=jt(t),r=P[t.category]||P.other,i=At(t);document.getElementById(`pl-detail-title`).textContent=t.title,document.getElementById(`pl-detail-color-bar`).style.background=n.dot;let a=new Date(t.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}),o=t.allDay?`All day`:t.time?It(t.time):``;!t.allDay&&t.endTime&&(o+=` – `+It(t.endTime));let c=(i.includes(`everyone`)?[{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}]:i.map(e=>kt(e))).map(e=>`<span style="display:inline-flex;align-items:center;gap:5px;background:${e.bg};color:${e.text};padding:4px 10px;border-radius:99px;font-size:12px;font-weight:600">${e.emoji} ${e.name}</span>`).join(` `),l=(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),u=[{icon:`📅`,label:`Date`,value:a},o?{icon:`🕐`,label:`Time`,value:o}:null,t.location?{icon:`📍`,label:`Address`,value:g(t.location)}:null,{icon:`👥`,label:`Who`,value:`<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">${c}</div>`},{icon:r.emoji,label:`Category`,value:r.label},Nt(t)?{icon:`🔄`,label:`Repeats`,value:Nt(t)}:null,l>0?{icon:`💰`,label:`Est. cost`,value:`$${l.toLocaleString(`en-AU`)}`}:null,t.notes?{icon:`📝`,label:`Notes`,value:g(t.notes)}:null].filter(Boolean);document.getElementById(`pl-detail-body`).innerHTML=u.map(e=>`<div class="pl-detail-row">
      <div class="pl-detail-icon">${e.icon}</div>
      <div style="flex:1;min-width:0">
        <div class="pl-detail-row-label">${e.label}</div>
        <div class="pl-detail-row-value">${e.value}</div>
      </div>
    </div>`).join(``)+(r.financial?`<button class="planner-ai-btn" style="width:100%;justify-content:center;margin-top:16px" onclick="_plannerCloseDetail();estimatePlannerEvent('${e}')">✦ Estimate costs with AI</button>`:``)+`<button class="pl-detail-share-btn" onclick="_plannerOpenShare('${e}')">🔗 Share this event</button>`,document.getElementById(`pl-detail-overlay`).classList.add(`open`)}function un(){document.getElementById(`pl-detail-overlay`)?.classList.remove(`open`),_plannerDetailEvId=null}function dn(e){e.target===document.getElementById(`pl-detail-overlay`)&&un()}function fn(){let e=_plannerDetailEvId;un(),e&&An(e)}function pn(e){let t=(s.planner?.events||[]).find(t=>t.id===e);if(!t)return;let n=`https://toto.app/event/${t.title.toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/(^-|-$)/g,``)}-${Math.random().toString(36).slice(2,10)}`,r=document.getElementById(`pl-share-sub`),i=document.getElementById(`pl-share-url`),a=document.getElementById(`pl-share-copy-btn`);r&&(r.textContent=t.title),i&&(i.textContent=n),a&&(a.textContent=`Copy`,a.classList.remove(`copied`)),document.getElementById(`pl-share-overlay`)?.classList.add(`open`)}function mn(){document.getElementById(`pl-share-overlay`)?.classList.remove(`open`)}function hn(e){e.target===document.getElementById(`pl-share-overlay`)&&mn()}function gn(){let e=document.getElementById(`pl-share-url`)?.textContent;e&&navigator.clipboard?.writeText(e).catch(()=>{});let t=document.getElementById(`pl-share-copy-btn`);t&&(t.textContent=`Copied!`,t.classList.add(`copied`),setTimeout(()=>{t.textContent=`Copy`,t.classList.remove(`copied`)},2e3))}function _n(e){let t=document.getElementById(`pl-share-url`)?.textContent||``,n=(s.planner?.events||[]).find(e=>e.id===_plannerDetailEvId),r=n?`${n.title} — ${t}`:t;e===`sms`&&window.open(`sms:?body=${encodeURIComponent(r)}`),e===`whatsapp`&&window.open(`https://wa.me/?text=${encodeURIComponent(r)}`),e===`email`&&window.open(`mailto:?subject=${encodeURIComponent(n?.title||`Event`)}&body=${encodeURIComponent(r)}`)}function vn(){function e(e){return Math.ceil((e-new Date().setHours(0,0,0,0))/864e5)}function t(e,t,n,r){let i=new Date(e,t,1);for(;i.getDay()!==n;)i.setDate(i.getDate()+1);return i.setDate(i.getDate()+(r-1)*7),i}let n=new Date().getFullYear();return[{emoji:`🧾`,title:`EOFY`,days:e(new Date(n,5,30)),body:`Tax time — accountant fees, donations, prepayments`},{emoji:`🎄`,title:`Christmas`,days:e(new Date(n,11,25)),body:`Gifts, travel, food — start budgeting early`},{emoji:`💐`,title:`Mother's Day`,days:e(t(n,4,0,2)),body:`Gift, brunch or dinner for Mum`},{emoji:`👔`,title:`Father's Day`,days:e(t(n,8,0,1)),body:`Gift or outing for Dad`}].filter(e=>e.days>=-3&&e.days<=60).sort((e,t)=>e.days-t.days)}function yn(e){_plannerExpanded.has(e)?_plannerExpanded.delete(e):_plannerExpanded.add(e),F()}function bn(e,t){let n=(s.planner?.events||[]).find(t=>t.id===e);if(!n)return;let r=(n.estimates||[]).find(e=>e.id===t);r&&(r.accepted=!r.accepted,window.saveData(s),F())}function xn(e){let t=(s.planner?.events||[]).find(t=>t.id===e);if(!t)return;let n=(t.estimates||[]).filter(e=>e.accepted);if(!n.length)return;let r=t.date.slice(0,7);s.budget.suggestions||(s.budget.suggestions=[]),s.budget.suggestions=s.budget.suggestions.filter(e=>e.eventId!==t.id),n.forEach(e=>{s.budget.suggestions.push({id:`sug-`+Date.now()+`-`+Math.random().toString(36).slice(2,5),month:r,eventId:t.id,eventTitle:t.title,estId:e.id,name:e.name,amount:e.amount,category:e.category,status:`pending`})}),t.pushed=`suggested`,window.saveData(s),_plannerExpanded.add(e),F();let i=new Date(r+`-15`).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`});r===window.selectedBudgetMonth?window.safeRender(renderBudget):confirm(`${n.length} suggestion${n.length>1?`s`:``} sent to ${i} budget.\n\nGo to Monthly Budget to approve them?`)&&(window.selectedBudgetMonth=r,activateTab(`budget`))}function Sn(e){let t=(s.budget.suggestions||[]).find(t=>t.id===e);if(!t)return;let n=window.ensureMonthOverride(t.month);n.expenses.push({id:k(n.expenses),name:`${t.name} (${t.eventTitle})`,amount:t.amount,frequency:`monthly`,category:t.category,recurring:!1,_plannerEventId:t.eventId}),t.status=`approved`;let r=(s.planner?.events||[]).find(e=>e.id===t.eventId);r&&(s.budget.suggestions||[]).filter(e=>e.eventId===r.id&&e.status===`pending`).length===0&&(r.pushed=!0),window.saveData(s),window.safeRender(renderBudget),window.safeRender(F)}function Cn(e){let t=(s.budget.suggestions||[]).find(t=>t.id===e);if(!t)return;t.status=`dismissed`;let n=(s.planner?.events||[]).find(e=>e.id===t.eventId);n&&(s.budget.suggestions||[]).filter(e=>e.eventId===n.id&&e.status===`pending`).length===0&&(n.pushed=n.pushed===`suggested`?!1:n.pushed),window.saveData(s),window.safeRender(renderBudget)}function wn(e){let t=(s.budget?.suggestions||[]).filter(t=>t.month===e&&t.status===`pending`);if(!t.length)return``;let n={};t.forEach(e=>{n[e.eventTitle]||(n[e.eventTitle]=[]),n[e.eventTitle].push(e)});let r=t.map(e=>`
    <div class="suggestion-row">
      <span class="suggestion-event-tag">📅 ${g(e.eventTitle)}</span>
      <div style="flex:1;min-width:0">
        <div class="suggestion-name">${g(e.name)}</div>
        <div class="suggestion-cat">${e.category}</div>
      </div>
      <span class="suggestion-amount">${b(e.amount)}</span>
      <button class="suggestion-approve" onclick="approveSuggestion('${e.id}')">✓ Approve</button>
      <button class="suggestion-dismiss" onclick="dismissSuggestion('${e.id}')">✕</button>
    </div>`).join(``);return`<div class="suggestion-inbox">
    <div class="suggestion-inbox-header">
      <span style="font-size:16px">📥</span>
      <span class="suggestion-inbox-title">Suggested from Planner</span>
      <span class="suggestion-inbox-count">${t.length} pending</span>
    </div>
    ${r}
  </div>`}function Tn(e){let t=(s.planner?.events||[]).find(t=>t.id===e);t&&(Object.values(s.budget.months||{}).forEach(t=>{t.expenses=(t.expenses||[]).filter(t=>t._plannerEventId!==e)}),s.budget.expenses=(s.budget.expenses||[]).filter(t=>t._plannerEventId!==e),s.budget.suggestions=(s.budget.suggestions||[]).filter(t=>t.eventId!==e),t.pushed=!1,window.saveData(s),F(),window.safeRender(renderBudget))}function En(e){confirm(`Delete this event and remove it from the budget?`)&&(Tn(e),s.planner.events=s.planner.events.filter(t=>t.id!==e),_plannerExpanded.delete(e),window.saveData(s),window.closeModal(),F())}async function Dn(e){let t=N(`toto_ai_key`);if(!t){alert(`Add your AI API key in Settings to use cost estimation.`);return}let n=(s.planner?.events||[]).find(t=>t.id===e);if(!n)return;let r=document.getElementById(`ai-btn-${e}`);r&&(r.disabled=!0,r.textContent=`✦ Estimating…`);let i=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,a=(s.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,o=new Date(n.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`long`,year:`numeric`}),c=`You are a family finance assistant for an Australian family. Suggest realistic cost estimates for the following life event.

Event: ${n.title}
Category: ${(P[n.category]||P.other).label}
Date: ${o}
Notes: ${n.notes||`none provided`}
Family size: ${i} adult(s), ${a} child(ren)

Return ONLY a JSON array — no explanation, no markdown fences:
[{"name":"Item description","amount":150,"category":"Category"}]

Rules:
- Use realistic 2025 Australian dollar amounts
- Round to nearest $5 or $10
- Maximum 6 items
- Consider family size when relevant
- Use ONLY these categories: Transport, Accommodation, Food & Dining, Entertainment, Gifts, Clothing, Health, Education, Shopping, Other`;try{let r=((await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:512,messages:[{role:`user`,content:c}]})})).json()).content?.[0]?.text||``).match(/\[[\s\S]*?\]/);if(!r)throw Error(`No JSON array in response`);n.estimates=JSON.parse(r[0]).map((e,t)=>({id:`est-${Date.now()}-${t}`,name:e.name,amount:Number(e.amount)||0,category:e.category||`Other`,accepted:!0})),_plannerExpanded.add(e),window.saveData(s),F()}catch(e){console.error(`Planner estimate error:`,e),r&&(r.disabled=!1,r.innerHTML=`✦ Try again`),alert(`Could not estimate costs. Check your AI API key in Settings.`)}}var I=new Set,On=`start`,kn=new Date().toISOString().slice(0,7);function An(e,t){let n=e?(s.planner?.events||[]).find(t=>t.id===e):null,r=t||_plannerSelectedDay||new Date().toISOString().slice(0,10);I=new Set,On=`start`,kn=(n?.date||r).slice(0,7),n?At(n).forEach(e=>I.add(e)):_plannerFilterMembers.size>0&&_plannerFilterMembers.forEach(e=>I.add(e)),document.getElementById(`modal-title`).textContent=n?`Edit Event`:`Add Event`,document.getElementById(`modal-body`).innerHTML=`
    <!-- Who -->
    <div class="form-group">
      <label class="form-label">Who</label>
      <div id="pm-member-picker" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px"></div>
    </div>
    <!-- Title -->
    <div class="form-group">
      <label class="form-label">Title *</label>
      <input class="form-input" id="pe-title" placeholder="e.g. Mia's swimming lesson" value="${n?_(n.title):``}">
    </div>
    <!-- All day -->
    <div class="form-group">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" id="pe-allday" onchange="_pmToggleAllDay()" style="width:16px;height:16px;accent-color:var(--primary);cursor:pointer" ${n?.allDay?`checked`:``}>
        <span style="font-size:14px;font-weight:500;color:var(--text)">All day event</span>
      </label>
    </div>
    <!-- Start date + time -->
    <div style="display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,0.85fr);gap:8px" class="form-group">
      <div>
        <label class="form-label">Start date *</label>
        <input type="hidden" id="pe-date" value="${n?n.date:r}">
        <button type="button" class="form-input" id="pm-start-trigger" onclick="_pmDpOpen('start')" style="text-align:left;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
          <span id="pm-start-display">${Mn(n?n.date:r)}</span>
        </button>
      </div>
      <div id="pm-start-time-col" style="min-width:0;overflow:hidden">
        <label class="form-label">Start time</label>
        <input class="form-input" id="pe-time" type="time" value="${n?.time||``}" style="width:100%;max-width:100%;min-width:0;box-sizing:border-box;padding:11px 6px;font-size:13px;-webkit-appearance:none;appearance:none">
      </div>
    </div>
    <!-- End date + time -->
    <div style="display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,0.85fr);gap:8px" class="form-group" id="pm-end-group">
      <div>
        <label class="form-label">End date</label>
        <input type="hidden" id="pe-end-date" value="${n?.endDate||``}">
        <button type="button" class="form-input" id="pm-end-trigger" onclick="_pmDpOpen('end')" style="text-align:left;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${n?.endDate?`var(--text)`:`var(--text-muted)`}">
          <span id="pm-end-display">${n?.endDate?Mn(n.endDate):`Same day`}</span>
        </button>
      </div>
      <div id="pm-end-time-col" style="min-width:0;overflow:hidden">
        <label class="form-label">End time</label>
        <input class="form-input" id="pe-end-time" type="time" value="${n?.endTime||``}" style="width:100%;max-width:100%;min-width:0;box-sizing:border-box;padding:11px 6px;font-size:13px;-webkit-appearance:none;appearance:none">
      </div>
    </div>
    <!-- Category -->
    <div class="form-group">
      <label class="form-label">Category</label>
      <select class="form-input" id="pe-cat" style="max-width:240px">
        ${Object.entries(P).map(([e,t])=>`<option value="${e}" ${(n?.category||`other`)===e?`selected`:``}>${t.emoji} ${t.label}</option>`).join(``)}
      </select>
    </div>
    <!-- Recurrence (shared engine) -->
    ${_routineRecurrenceFormHtml(n?.recurrence||{type:`one_time`,startDate:n?.date||r})}
    <!-- Address -->
    <div class="form-group">
      <label class="form-label">Address <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="pe-location" placeholder="e.g. 123 Main St, Sydney" value="${n?_(n.location||``):``}">
    </div>
    <!-- Notes -->
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(helps AI estimate costs)</span></label>
      <textarea class="form-input" id="pe-notes" rows="2" placeholder="e.g. Flying from Sydney, 5 nights, gift budget ~$100">${n?g(n.notes||``):``}</textarea>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${n?`<button class="btn btn-danger" onclick="deletePlannerEvent('${n.id}')">Delete</button>`:`<span></span>`}
    <div style="display:flex;gap:8px">
      <button class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="pm-save-btn" onclick="savePlannerEvent(${n?`'${n.id}'`:`null`})">Save</button>
    </div>`,document.getElementById(`modal-footer`).style.justifyContent=`space-between`,document.getElementById(`modal-overlay`).classList.remove(`hidden`),Nn(),Fn(),setTimeout(()=>{_routineRecurrenceSummaryUpdate()},100)}function jn(e){return e?new Date(e+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`}):``}function Mn(e){return e?new Date(e+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}):``}function Nn(){let e=Ot(),t={id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`},n=document.getElementById(`pm-member-picker`);if(!n)return;n.innerHTML=[t,...e].map(e=>`<button type="button" style="display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:99px;font-size:12px;font-weight:600;border:2px solid ${(e.id===`everyone`?I.size===0:I.has(e.id))?e.dot:`transparent`};background:${e.bg};color:${e.text};cursor:pointer;transition:all .15s" onclick="_pmToggleMember('${e.id}')">
      ${e.emoji} ${e.name}
    </button>`).join(``);let r=[...I][0],i=r?e.find(e=>e.id===r):null,a=document.getElementById(`pm-save-btn`);a&&(a.style.background=i?i.dot:``)}function Pn(e){e===`everyone`?I.clear():I.has(e)?I.delete(e):I.add(e),Nn()}function Fn(){let e=document.getElementById(`pe-allday`)?.checked,t=document.getElementById(`pm-start-time-col`),n=document.getElementById(`pm-end-time-col`);t&&(t.style.display=e?`none`:``),n&&(n.style.display=e?`none`:``)}function In(){}function Ln(e){On=e;let t=e===`end`?`pm-end-trigger`:`pm-start-trigger`,n=document.getElementById(t);if(!n)return;let r=document.getElementById(`pm-dp-popover`);r||(r=document.createElement(`div`),r.id=`pm-dp-popover`,r.style.cssText=`display:none;position:fixed;width:260px;background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.16);padding:14px;z-index:9999`,document.body.appendChild(r),document.addEventListener(`click`,Rn)),kn=(document.getElementById(`pe-date`)?.value||new Date().toISOString().slice(0,10)).slice(0,7),zn(r);let i=n.getBoundingClientRect();r.style.top=i.bottom+6+`px`,r.style.left=Math.max(8,Math.min(i.left,window.innerWidth-272))+`px`,r.style.display=`block`}function Rn(e){let t=document.getElementById(`pm-dp-popover`),n=document.getElementById(`pm-start-trigger`),r=document.getElementById(`pm-end-trigger`);t&&!t.contains(e.target)&&e.target!==n&&e.target!==r&&!n?.contains(e.target)&&!r?.contains(e.target)&&t&&(t.style.display=`none`)}function zn(e){if(e||(e=document.getElementById(`pm-dp-popover`)),!e)return;let[t,n]=kn.split(`-`).map(Number),r=new Date().toISOString().slice(0,10),i=On===`end`?document.getElementById(`pe-end-date`)?.value||``:document.getElementById(`pe-date`)?.value||``,a=new Date(t,n-1,1).getDay(),o=a===0?6:a-1,s=new Date(t,n,0).getDate(),c=new Date(t,n-1,0).getDate(),l=new Date(t,n-1,15).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`}),u=[];for(let e=o-1;e>=0;e--)u.push({day:c-e,muted:!0,dateStr:null});for(let e=1;e<=s;e++){let r=`${t}-${String(n).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`;u.push({day:e,muted:!1,dateStr:r})}let d=u.length%7==0?0:7-u.length%7;for(let e=1;e<=d;e++)u.push({day:e,muted:!0,dateStr:null});let f=u.map(e=>{let t=e.dateStr&&e.dateStr===i,n=e.dateStr===r,a=t?`background:#2563eb;color:#fff;border-radius:50%`:n?`color:#2563eb;font-weight:700`:e.muted?`color:#d1d5db`:``;return`<button type="button" onclick="_pmDpSelect('${e.dateStr}')" ${e.dateStr?``:`disabled`} style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:12px;border:none;background:none;cursor:${e.dateStr?`pointer`:`default`};font-family:inherit;${a}">${e.day}</button>`}).join(``);e.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <button type="button" onclick="_pmDpPrev()" style="width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;cursor:pointer;font-size:16px;color:#64748b">‹</button>
      <div style="font-size:14px;font-weight:700;color:#1e293b">${l}</div>
      <button type="button" onclick="_pmDpNext()" style="width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;cursor:pointer;font-size:16px;color:#64748b">›</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;margin-bottom:4px">
      ${[`M`,`T`,`W`,`T`,`F`,`S`,`S`].map(e=>`<div style="text-align:center;font-size:10px;font-weight:700;color:#94a3b8;padding:3px 0">${e}</div>`).join(``)}
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px">${f}</div>
    <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px solid #e2e8f0">
      <button type="button" onclick="_pmDpClear()" style="font-size:13px;font-weight:600;color:#2563eb;background:none;border:none;cursor:pointer">Clear</button>
      <button type="button" onclick="_pmDpToday()" style="font-size:13px;font-weight:600;color:#2563eb;background:none;border:none;cursor:pointer">Today</button>
    </div>`}function Bn(e){if(!e)return;let t=On===`end`?`pe-end-date`:`pe-date`,n=On===`end`?`pm-end-display`:`pm-start-display`,r=document.getElementById(t),i=document.getElementById(n);r&&(r.value=e),i&&(i.textContent=Mn(e),i.style.color=`#1e293b`),kn=e.slice(0,7),document.getElementById(`pm-dp-popover`).style.display=`none`}function Vn(){Bn(``);let e=On===`end`?`pm-end-display`:`pm-start-display`,t=document.getElementById(e);t&&(t.textContent=On===`end`?`Same day`:``,t.style.color=`#94a3b8`)}function Hn(){Bn(new Date().toISOString().slice(0,10))}function Un(){let[e,t]=kn.split(`-`).map(Number),n=t===1?e-1:e,r=t===1?12:t-1;kn=`${n}-${String(r).padStart(2,`0`)}`,zn()}function Wn(){let[e,t]=kn.split(`-`).map(Number),n=t===12?e+1:e,r=t===12?1:t+1;kn=`${n}-${String(r).padStart(2,`0`)}`,zn()}function Gn(e){let t=document.getElementById(`pe-title`).value.trim(),n=document.getElementById(`pe-cat`).value,r=document.getElementById(`pe-date`).value,i=document.getElementById(`pe-end-date`)?.value||``,a=document.getElementById(`pe-allday`)?.checked||!1,o=a?``:document.getElementById(`pe-time`)?.value||``,c=a?``:document.getElementById(`pe-end-time`)?.value||``,l=document.getElementById(`pe-notes`).value.trim(),u=document.getElementById(`pe-location`)?.value.trim()||``,d=_routineRecurrenceCollect(),f=(d.type,`none`),p=I.size>0?[...I]:[`everyone`];if(!t||!r){alert(`Title and date are required.`);return}if(s.planner||(s.planner={events:[]}),e){let m=s.planner.events.find(t=>t.id===e);m&&(m.title=t,m.category=n,m.date=r,m.endDate=i||r,m.allDay=a,m.time=o,m.endTime=c,m.notes=l,m.location=u,m.recurrence=d,m.recurring=f,m.memberIds=p)}else{let e=`ev-`+Date.now();s.planner.events.push({id:e,title:t,category:n,date:r,endDate:i||r,allDay:a,time:o,endTime:c,notes:l,location:u,recurrence:d,recurring:f,memberIds:p,estimates:[],pushed:!1}),_plannerExpanded.add(e),_plannerSelectedDay=r,_plannerMonth=r.slice(0,7)}window.saveData(s),window.closeModal(),F()}function Kn(e,t){let n=(s.planner?.events||[]).filter(t=>t.date?.slice(0,7)===e&&(t.estimates||[]).some(e=>e.accepted));if(n.length===0)return``;let r=n.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),i=t-r,a=n.filter(e=>!e.pushed),o=n.map(e=>{let t=P[e.category]||P.other,n=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),r=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});return`<div class="forecast-row">
      <span class="forecast-ev-name">${t.emoji} ${g(e.title)}</span>
      <span class="forecast-ev-date">${r}</span>
      <span class="forecast-ev-cost">${b(n)}</span>
      ${e.pushed?`<span class="forecast-pushed">✓ In budget</span>`:e.pushed===`suggested`?`<span class="forecast-pushed" style="color:#f59e0b">⏳ Pending</span>`:`<button class="forecast-unpushed" onclick="suggestEventToBudget('${e.id}')">+ Suggest</button>`}
    </div>`}).join(``);return`<div class="forecast-widget">
    <div class="forecast-header">
      <span class="forecast-header-title">📅 Planned Events — ${b(r)} this month</span>
      ${a.length>1?`<button class="forecast-push-all" onclick="_pushAllEventsToBudget('${e}')">Suggest all to budget</button>`:``}
    </div>
    ${o}
    <div class="forecast-total">
      <span class="forecast-total-label">Forecast surplus after events</span>
      <span style="font-weight:800;font-size:15px;color:${i>=0?`#10b981`:`#ef4444`}">${b(Math.abs(i))} ${i>=0?`surplus`:`deficit`}</span>
    </div>
  </div>`}function qn(e){(s.planner?.events||[]).filter(t=>t.date?.slice(0,7)===e&&!t.pushed&&(t.estimates||[]).some(e=>e.accepted)).forEach(e=>xn(e.id)),renderBudget()}function Jn(e,t,n,r){let i=0;for(let a=1;a<=31;a++){let o=new Date(e,t,a);if(o.getMonth()!==t)break;if(o.getDay()===n&&(i++,i===r))return o}}function Yn(){let e=new Date;e.setHours(0,0,0,0);let t=e.getFullYear(),n=t=>Math.ceil((t-e)/864e5);return[{d:new Date(t,3,25),emoji:`🌿`,title:`Anzac Day`,body:`Public holiday — any plans or travel?`},{d:new Date(t,5,30),emoji:`🧾`,title:`EOFY`,body:`Tax time — accountant fees, donations, prepayments`},{d:new Date(t,11,25),emoji:`🎄`,title:`Christmas`,body:`Gifts, travel, food — start budgeting early`},{d:new Date(t,11,26),emoji:`🛍️`,title:`Boxing Day`,body:`Sales, travel, family catch-ups`},{d:new Date(t+1,0,1),emoji:`🎆`,title:`New Year's`,body:`Celebrations, travel plans`},{d:Jn(t,4,0,2),emoji:`💐`,title:`Mother's Day`,body:`Gift, brunch or dinner for Mum`},{d:Jn(t,8,0,1),emoji:`👔`,title:`Father's Day`,body:`Gift or outing for Dad`},{d:Jn(t,10,2,1),emoji:`🏆`,title:`Melbourne Cup`,body:`Event day — sweepstakes, lunch, outfits`},{d:new Date(t,3,6),emoji:`🎒`,title:`Term 1 Holidays`,body:`2 weeks — activities, childcare, day trips`},{d:new Date(t,6,5),emoji:`🎒`,title:`Term 2 Holidays`,body:`2 weeks — winter school holidays`},{d:new Date(t,8,19),emoji:`🎒`,title:`Term 3 Holidays`,body:`2 weeks — spring school holidays`},{d:new Date(t,11,18),emoji:`🎒`,title:`Summer Holidays`,body:`6 weeks — the big one, plan early`}].filter(e=>e.d).map(e=>({...e,days:n(e.d)})).filter(e=>e.days>=-3&&e.days<=45).sort((e,t)=>e.days-t.days).slice(0,4)}function Xn(){let e=Yn();return e.length===0?``:`<div class="nudge-section">
    <div class="diary-section-title">Heads up from Toto 🐕</div>
    <div class="nudge-row">${e.map(e=>{let t=e.days<0?`Now!`:e.days===0?`Today!`:e.days===1?`Tomorrow`:`In ${e.days} days`;return`<div class="nudge-card" onclick="openTotoAssistant();_totoSend('Help me plan for ${_(e.title)}')">
      <div class="nudge-card-icon">${e.emoji}</div>
      <div class="nudge-card-title">${g(e.title)}</div>
      <div class="nudge-card-days">${t}</div>
      <div class="nudge-card-body">${g(e.body)}</div>
    </div>`}).join(``)}</div>
  </div>`}function Zn(e,t){let n=new Date(e);switch(t){case`weekly`:n.setDate(n.getDate()+7);break;case`fortnightly`:n.setDate(n.getDate()+14);break;case`monthly`:n.setMonth(n.getMonth()+1);break;case`quarterly`:n.setMonth(n.getMonth()+3);break;case`yearly`:n.setFullYear(n.getFullYear()+1);break}return n}function Qn(){if(!s.planner?.events)return;let e=s.planner.events,t=new Date;t.setHours(0,0,0,0);let n=!1,r={weekly:3,fortnightly:3,monthly:6,quarterly:12,yearly:24};e.filter(e=>e.recurring&&e.recurring!==`none`&&!e._recurringSourceId).forEach(i=>{let a=i.recurring,o=new Date(t);o.setMonth(o.getMonth()+(r[a]||12));let s=new Date(i.date+`T12:00:00`);for(;s<t;)s=Zn(s,a);let c=0;for(;s<=o&&c++<200;){let t=s.toISOString().slice(0,10);e.some(e=>e.date===t&&(e.id===i.id||e._recurringSourceId===i.id))||(e.push({id:`ev-`+Date.now()+`-r`+Math.random().toString(36).slice(2,6),title:i.title,category:i.category,date:t,notes:i.notes||``,recurring:a,_recurringSourceId:i.id,estimates:(i.estimates||[]).map(e=>({...e,id:`est-`+Date.now()+Math.random(),accepted:!0})),pushed:!1}),n=!0),s=Zn(s,a)}}),n&&window.saveData(s)}var $n=!1,er=[],tr=!1,nr=[{icon:`📅`,text:`What should I plan for this month?`},{icon:`💸`,text:`Any upcoming events I should budget for?`},{icon:`🎒`,text:`Help me plan for school holidays`},{icon:`✈️`,text:`I have a trip coming up — what do I need to organise?`}];function rr(){$n?ar():ir()}function ir(){$n=!0,document.getElementById(`toto-panel`).classList.add(`open`),er.length===0&&or()}function ar(){$n=!1,document.getElementById(`toto-panel`).classList.remove(`open`)}function or(){let e=new Date().toISOString().slice(0,10),t=new Date;t.setDate(t.getDate()+7);let n=t.toISOString().slice(0,10),r=(s.planner?.events||[]).filter(t=>t.date>=e&&t.date<=n),i=[];r.slice(0,2).forEach(t=>{let n=PLANNER_CATS[t.category]||PLANNER_CATS.other,r=new Date(t.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`});n.financial&&(!t.estimates||t.estimates.length===0)?i.push({icon:n.emoji,text:`${g(t.title)} is ${r} — want me to estimate costs?`}):t.date===e&&i.push({icon:n.emoji,text:`You have "${g(t.title)}" today — anything to prepare?`})});let a=getSeasonalNudges().slice(0,2).map(e=>({icon:e.emoji,text:`Help me plan for ${g(e.title)} (${e.days<=0?`now!`:`in ${e.days} days`})`})),o=[...i,...a,...nr].slice(0,4),c=document.getElementById(`toto-suggestions`);c.innerHTML=o.map(e=>`<button class="toto-suggestion" onclick="_totoSendSuggestion(this)">${e.icon} ${e.text}</button>`).join(``);let l=new Date().getHours(),u=l<12?`Good morning`:l<17?`Good afternoon`:`Good evening`,d=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,f=(s.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,p=f>0?` and ${f} kid${f>1?`s`:``}`:``;dr(`toto`,`${u}! 👋 I'm Toto, your family planning assistant. You have ${d} adult${d>1?`s`:``}${p} in your household.\n\nI can help you plan events, estimate costs, and make sure nothing slips through the cracks. What would you like to work on?`)}function sr(e){let t=e.textContent.trim();e.closest(`.toto-suggestions`).style.display=`none`,lr(t)}async function cr(){let e=document.getElementById(`toto-input`),t=e.value.trim();!t||tr||(e.value=``,document.getElementById(`toto-suggestions`).style.display=`none`,lr(t))}async function lr(e){let t=N(`toto_ai_key`);if(!t){dr(`toto`,`To chat with me, you'll need to add your AI API key in Settings. It only takes a second! ⚙️`);return}dr(`user`,e),er.push({role:`user`,content:e}),tr=!0,document.getElementById(`toto-send`).disabled=!0;let n=fr();try{let e=ur(),r=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:600,system:e,messages:er})})).json()).content?.[0]?.text||`Sorry, I couldn't get a response. Try again?`;er.push({role:`assistant`,content:r}),pr(n),dr(`toto`,r)}catch{pr(n),dr(`toto`,`Oops, something went wrong. Check your internet connection and try again.`)}finally{tr=!1,document.getElementById(`toto-send`).disabled=!1,document.getElementById(`toto-input`).focus()}}function ur(){let e=new Date().toISOString().slice(0,10),t=new Date().toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}),n=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,r=(s.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,i=new Date;i.setDate(i.getDate()+60);let a=(s.planner?.events||[]).filter(t=>t.date>=e&&t.date<=i.toISOString().slice(0,10)).sort((e,t)=>e.date.localeCompare(t.date)).slice(0,15).map(e=>{let t=PLANNER_CATS[e.category]||PLANNER_CATS.other,n=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`}),r=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0);return`- ${n}: ${e.title} (${t.label})${r>0?` — $`+r.toLocaleString(`en-AU`)+` budgeted`:``}${e.notes?` — Notes: `+e.notes:``}`}).join(`
`)||`None`,o=window.getMonthData(window.selectedBudgetMonth),c=monthlyTotal(o.income),l=monthlyTotal(o.expenses),u=c-l,d=(s.goals||[]).filter(e=>e.status!==`achieved`).slice(0,4).map(e=>`${e.name} ($${(e.saved||0).toLocaleString()}/$${(e.target||0).toLocaleString()})`).join(`, `)||`None`;return`You are Toto, a warm and practical AI assistant for a family finance and life planning app called Toto. You help Australian families plan their lives and stay on top of their money.

Today: ${t}
Family: ${n} adult${n>1?`s`:``}${r>0?`, ${r} child${r>1?`ren`:``}`:``}
Monthly budget: Income $${c.toLocaleString(`en-AU`)}, Expenses $${l.toLocaleString(`en-AU`)}, ${u>=0?`Surplus`:`Deficit`} $${Math.abs(u).toLocaleString(`en-AU`)}
Active goals: ${d}

Upcoming events (next 60 days):
${a}

Personality: friendly, warm, concise. Use Australian spelling and context. You can:
- Help plan upcoming events and what to organise
- Suggest realistic cost estimates for activities
- Spot things they might have forgotten (school holidays, gift buying, etc.)
- Give practical financial advice around upcoming events
- Keep responses to 3-5 sentences unless a list is genuinely helpful`}function dr(e,t){let n=document.getElementById(`toto-messages`),r=document.createElement(`div`);r.className=`toto-msg ${e}`;let i=t.replace(/\n/g,`<br>`);e===`toto`?r.innerHTML=`<div class="toto-msg-avatar">🐕</div><div class="toto-msg-bubble">${i}</div>`:r.innerHTML=`<div class="toto-msg-bubble">${i}</div>`,n.appendChild(r),n.scrollTop=n.scrollHeight}function fr(){let e=document.getElementById(`toto-messages`),t=`toto-typing-`+Date.now(),n=document.createElement(`div`);return n.className=`toto-msg toto`,n.id=t,n.innerHTML=`<div class="toto-msg-avatar">🐕</div><div class="toto-msg-bubble"><div class="toto-typing"><span></span><span></span><span></span></div></div>`,e.appendChild(n),e.scrollTop=e.scrollHeight,t}function pr(e){document.getElementById(e)?.remove()}`serviceWorker`in navigator&&navigator.serviceWorker.register(`/home-budget/sw.js`,{scope:`/home-budget/`}).catch(e=>console.warn(`SW registration failed:`,e));var mr=[`Produce`,`Meat & Seafood`,`Dairy & Eggs`,`Pantry`,`Bakery`,`Frozen`,`Household`,`Other`],hr={Produce:`🥦`,"Meat & Seafood":`🥩`,"Dairy & Eggs":`🥛`,Pantry:`🥫`,Bakery:`🍞`,Frozen:`🧊`,Household:`🏠`,Other:`🛒`},gr={food:{label:`Food`,emoji:`🛒`,color:`#dcfce7`,text:`#166534`,aisles:!0,priceEst:!0},clothes:{label:`Clothes`,emoji:`👕`,color:`#dbeafe`,text:`#1e40af`,aisles:!1,priceEst:!1},wishlist:{label:`Wishlist`,emoji:`🎁`,color:`#fce7f3`,text:`#9d174d`,aisles:!1,priceEst:!1},home:{label:`Home & Garden`,emoji:`🛠`,color:`#fef3c7`,text:`#92400e`,aisles:!0,priceEst:!1},pharmacy:{label:`Pharmacy`,emoji:`💊`,color:`#ede9fe`,text:`#5b21b6`,aisles:!0,priceEst:!1}},_r={food:[{key:`produce`,emoji:`🥦`,label:`Produce`},{key:`dairy`,emoji:`🥛`,label:`Dairy & Eggs`},{key:`bakery`,emoji:`🍞`,label:`Bakery`},{key:`meat`,emoji:`🥩`,label:`Meat & Seafood`},{key:`pantry`,emoji:`🥫`,label:`Pantry`},{key:`frozen`,emoji:`🧊`,label:`Frozen`},{key:`health`,emoji:`🧴`,label:`Health & Beauty`},{key:`bathroom`,emoji:`🚿`,label:`Bathroom`},{key:`cleaning`,emoji:`🧹`,label:`Cleaning`},{key:`drinks`,emoji:`🍷`,label:`Drinks & Alcohol`},{key:`other`,emoji:`🛒`,label:`Uncategorised`}],home:[{key:`tools`,emoji:`🔨`,label:`Tools & Hardware`},{key:`garden`,emoji:`🌱`,label:`Garden`},{key:`cleaning`,emoji:`🧹`,label:`Cleaning`},{key:`other`,emoji:`🛒`,label:`Other`}],pharmacy:[{key:`medicine`,emoji:`💊`,label:`Medicine`},{key:`skincare`,emoji:`🧴`,label:`Skincare`},{key:`vitamins`,emoji:`💪`,label:`Vitamins`},{key:`other`,emoji:`🛒`,label:`Other`}]},vr={milk:`dairy`,cheese:`dairy`,butter:`dairy`,eggs:`dairy`,yoghurt:`dairy`,cream:`dairy`,bread:`bakery`,rolls:`bakery`,muffin:`bakery`,croissant:`bakery`,baguette:`bakery`,apple:`produce`,banana:`produce`,orange:`produce`,strawberry:`produce`,tomato:`produce`,lettuce:`produce`,spinach:`produce`,carrot:`produce`,broccoli:`produce`,potato:`produce`,onion:`produce`,garlic:`produce`,cucumber:`produce`,capsicum:`produce`,avocado:`produce`,lemon:`produce`,lime:`produce`,grapes:`produce`,mango:`produce`,pineapple:`produce`,watermelon:`produce`,chicken:`meat`,beef:`meat`,mince:`meat`,steak:`meat`,pork:`meat`,lamb:`meat`,salmon:`meat`,fish:`meat`,tuna:`meat`,prawn:`meat`,sausage:`meat`,bacon:`meat`,rice:`pantry`,pasta:`pantry`,flour:`pantry`,sugar:`pantry`,oil:`pantry`,vinegar:`pantry`,salt:`pantry`,pepper:`pantry`,sauce:`pantry`,stock:`pantry`,beans:`pantry`,lentils:`pantry`,chickpeas:`pantry`,cereal:`pantry`,oats:`pantry`,honey:`pantry`,jam:`pantry`,peanut:`pantry`,coffee:`pantry`,tea:`pantry`,biscuit:`pantry`,cracker:`pantry`,chocolate:`pantry`,chips:`pantry`,nuts:`pantry`,icecream:`frozen`,peas:`frozen`,corn:`frozen`,pizza:`frozen`,shampoo:`health`,conditioner:`health`,deodorant:`health`,sunscreen:`health`,moisturiser:`health`,makeup:`health`,lipstick:`health`,mascara:`health`,toothpaste:`bathroom`,toothbrush:`bathroom`,soap:`bathroom`,toilet:`bathroom`,razors:`bathroom`,tampons:`bathroom`,pads:`bathroom`,detergent:`cleaning`,bleach:`cleaning`,sponge:`cleaning`,dishwashing:`cleaning`,bins:`cleaning`,mop:`cleaning`,water:`drinks`,juice:`drinks`,beer:`drinks`,wine:`drinks`,spirits:`drinks`,softdrink:`drinks`,soda:`drinks`,kombucha:`drinks`};function yr(e){for(var t=e.toLowerCase(),n=Object.keys(vr),r=0;r<n.length;r++)if(t.indexOf(n[r])!==-1)return vr[n[r]];return`other`}function br(e){var t=e.trim(),n=1,r=`units`,i=t,a=t.match(/^(\d+(?:\.\d+)?)\s*(kg|g|L|l|ml|dozen|doz)\s+(.+)$/i);if(a)n=parseFloat(a[1]),r=a[2].toLowerCase()===`l`?`L`:a[2].toLowerCase()===`doz`?`dozen`:a[2],i=a[3];else{var o=t.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);o?(n=parseFloat(o[1]),i=o[2]):/^dozen\s+/i.test(t)&&(n=1,r=`dozen`,i=t.replace(/^dozen\s+/i,``))}return i=i.charAt(0).toUpperCase()+i.slice(1),{qty:n,unit:r,name:i}}var xr=`food`,Sr=`selector`;Object.defineProperty(window,`_listsActiveType`,{get(){return xr},set(e){xr=e},configurable:!0}),Object.defineProperty(window,`_listsView`,{get(){return Sr},set(e){Sr=e},configurable:!0});function Cr(e){let t=new Date,n=t.getDay()===0?-6:1-t.getDay(),r=new Date(t);return r.setDate(t.getDate()+n+(e||0)*7),r.toISOString().slice(0,10)}function wr(e){let t=new Date(e+`T00:00:00`);return Array.from({length:7},(e,n)=>{let r=new Date(t);return r.setDate(t.getDate()+n),r})}function Tr(){window._mealView===`shopping`?Ir():Er()}function Er(){let e=Cr(0),t=wr(e),n=s.meals.plan[e]||{},r=new Date().toISOString().slice(0,10),i=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],a=[{key:`b`,label:`Breakfast`},{key:`l`,label:`Lunch`},{key:`d`,label:`Dinner`}];t[0].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),t[6].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});let o=[];for(let e=0;e<7;e++){let t=n[e]||{};[`b`,`l`,`d`].forEach(e=>{t[e]&&o.push(t[e])})}let c=``;a.forEach(i=>{c+=`<div class="meal-grid-label">${i.label}</div>`,t.forEach((t,a)=>{let o=(n[a]||{})[i.key]||``,l=t.toISOString().slice(0,10)===r;c+=`<div class="meal-cell${l?` today`:``}" onclick="openMealEdit('${e}',${a},'${i.key}')">
        ${o?`<span class="meal-cell-text">${o}${s.settings?.showCalories&&(n[a]||{})[`cal_`+i.key]?`<br><span style="font-size:9px;color:var(--text-muted);font-weight:600">${n[a][`cal_`+i.key]} cal</span>`:``}</span>`:`<span class="meal-cell-plus">+</span>`}
      </div>`})}),document.getElementById(`meals-content`).innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:8px">
        <button class="btn btn-sm" onclick="_mealWeekOffset--;renderMeals()" style="font-size:16px;padding:2px 10px">‹</button>
        <span style="font-size:15px;font-weight:600;min-width:150px;text-align:center">
          This Week
        </span>
        <button class="btn btn-sm" onclick="_mealWeekOffset++;renderMeals()" style="font-size:16px;padding:2px 10px">›</button>
        
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${o.length>0?`<button class="btn btn-sm" id="gen-shop-btn" onclick="generateShoppingList('${e}')">🛒 Generate shopping list</button>`:``}
        <button class="btn btn-primary btn-sm" onclick="_listsActiveType='food';_listsView='list';activateTab('lists')">Shopping list →</button>
      </div>
    </div>

    <div style="overflow-x:auto;margin-bottom:8px">
      <div class="meal-grid" style="min-width:560px">
        <div class="meal-grid-corner"></div>
        ${t.map((e,t)=>`<div class="meal-grid-header${e.toISOString().slice(0,10)===r?` today`:``}"><div>${i[t]}</div><div style="font-size:10px;opacity:0.7">${e.getDate()}/${e.getMonth()+1}</div></div>`).join(``)}
        ${c}
        ${s.settings?.showCalories?`<div class="meal-grid-label" style="font-weight:800;font-size:9px">Total</div>`+t.map((e,t)=>{let r=n[t]||{},i=(r.cal_b||0)+(r.cal_l||0)+(r.cal_d||0);return`<div style="background:var(--surface);padding:6px;text-align:center;font-size:11px;font-weight:700;color:${i>0?i>2500?`var(--danger)`:i>2e3?`var(--warning)`:`var(--text)`:`var(--border)`}">${i>0?i.toLocaleString():`—`}</div>`}).join(``):``}
      </div>
    </div>
    <p style="font-size:12px;color:var(--text-muted);margin-top:6px">Tap any cell to add or change a meal.</p>`}var L={cuisine:`Any`,price:0,dietary:`Any`},Dr=[`Any`,`Italian`,`Asian`,`Mexican`,`Indian`,`Mediterranean`,`Thai`,`Japanese`,`Middle Eastern`,`Australian`],Or=[`Any`,`Vegetarian`,`Vegan`,`Gluten-free`,`Quick (<30min)`,`Family-friendly`];function kr(e,t,n){let r=[`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`,`Sunday`],i={b:`Breakfast`,l:`Lunch`,d:`Dinner`},a=((s.meals.plan[e]||{})[t]||{})[n]||``,o=!!N(`toto_ai_key`),c=new Set;Object.values(s.meals.plan).forEach(e=>Object.values(e).forEach(e=>{typeof e==`object`&&[`b`,`l`,`d`].forEach(t=>{e[t]&&c.add(e[t])})}));let l=[...c].filter(e=>e!==a).slice(0,16);document.getElementById(`modal-title`).textContent=`${r[t]} · ${i[n]}`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Meal</label>
      <input class="form-input" id="meal-input" type="text" maxlength="200" value="${a.replace(/"/g,`&quot;`)}"
        placeholder="e.g. Pasta Bolognese, Chicken stir-fry…" autocomplete="off">
    </div>

    ${o?`
    <div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:16px;background:var(--surface2)">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:12px">✨ AI Suggestions</div>

      <div style="margin-bottom:10px">
        <div class="form-label" style="margin-bottom:5px">Cuisine</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px" id="meal-f-cuisine">
          ${Dr.map(e=>Ar(`cuisine`,e)).join(``)}
        </div>
      </div>

      <div style="margin-bottom:12px">
        <div class="form-label" style="display:flex;justify-content:space-between;margin-bottom:5px">
          <span>Meal budget (per serve)</span>
          <span id="meal-price-lbl" style="color:#0891b2;font-weight:700">${L.price>0?`$`+L.price:`Any`}</span>
        </div>
        <input type="range" min="0" max="200" step="5" value="${L.price}"
          style="width:100%;accent-color:#0891b2;cursor:pointer"
          oninput="_mealPriceSlide(+this.value)">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-top:2px">
          <span>Any price</span><span>$200</span>
        </div>
      </div>

      <div>
        <div class="form-label" style="margin-bottom:5px">Dietary / Style</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px" id="meal-f-dietary">
          ${Or.map(e=>Ar(`dietary`,e)).join(``)}
        </div>
      </div>
      <div style="margin-bottom:12px"></div>

      <button class="btn btn-sm" id="meal-suggest-btn" onclick="_mealGetSuggestions('${n}')"
        style="width:100%;justify-content:center">Get suggestions</button>
      <div id="meal-suggest-out" style="margin-top:10px"></div>
    </div>`:``}

    ${l.length?`
    <div>
      <div class="form-label" style="margin-bottom:8px">Previous meals</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${l.map(e=>`<button style="padding:5px 12px;border-radius:99px;border:1px solid var(--border);background:var(--surface);font-size:12px;cursor:pointer"
          onclick="document.getElementById('meal-input').value='${e.replace(/'/g,`\\'`)}'">${e}</button>`).join(``)}
      </div>
    </div>`:``}`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn" onclick="saveMealSlot('${e}',${t},'${n}','')">Clear</button>
    <button class="btn btn-primary" onclick="saveMealSlot('${e}',${t},'${n}',document.getElementById('meal-input').value.trim())">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`),setTimeout(()=>{let e=document.getElementById(`meal-input`);e&&(e.focus(),e.select())},80)}function Ar(e,t){let n=L[e]===t;return`<button data-filter="${e}" data-val="${t}"
    onclick="_mealToggleFilter('${e}','${t}')"
    style="padding:4px 10px;border-radius:99px;font-size:12px;cursor:pointer;white-space:nowrap;
      border:1.5px solid ${n?`#0891b2`:`var(--border)`};
      background:${n?`#ecfeff`:`var(--surface)`};
      color:${n?`#0891b2`:`var(--text)`}">${t}</button>`}function jr(e,t){L[e]=t,document.querySelectorAll(`[data-filter="${e}"]`).forEach(e=>{let n=e.dataset.val===t;e.style.borderColor=n?`#0891b2`:`var(--border)`,e.style.background=n?`#ecfeff`:`var(--surface)`,e.style.color=n?`#0891b2`:`var(--text)`})}function Mr(e){L.price=e;let t=document.getElementById(`meal-price-lbl`);t&&(t.textContent=e>0?`$${e}`:`Any`)}async function Nr(e){let t=N(`toto_ai_key`);if(!t)return;let n=document.getElementById(`meal-suggest-btn`),r=document.getElementById(`meal-suggest-out`);n&&(n.textContent=`⏳ Thinking…`,n.disabled=!0),r&&(r.innerHTML=``);let i={b:`Breakfast`,l:`Lunch`,d:`Dinner`},a=[L.cuisine===`Any`?``:`Cuisine: ${L.cuisine}`,L.price>0?`Budget: up to $${L.price} per serve`:``,L.dietary===`Any`?``:`Style: ${L.dietary}`].filter(Boolean).join(`, `)||`No specific filters`,o=`Suggest 8 ${i[e]} meal ideas. Filters: ${a}.
Return ONLY a JSON array of meal names, no other text: ["Meal 1","Meal 2",...]`;try{let e=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:256,messages:[{role:`user`,content:o}]})})).json()).content[0].text.match(/\[[\s\S]*\]/);if(!e)throw Error(`No JSON`);let n=JSON.parse(e[0]);r&&(r.innerHTML=`<div style="display:flex;flex-wrap:wrap;gap:6px">
      ${n.map(e=>`<button style="padding:6px 12px;border-radius:99px;border:1px solid #0891b2;background:#ecfeff;color:#0891b2;font-size:12px;font-weight:500;cursor:pointer"
        onclick="document.getElementById('meal-input').value='${e.replace(/'/g,`\\'`)}'">${e}</button>`).join(``)}
    </div>`)}catch(e){r&&(r.innerHTML=`<span style="font-size:12px;color:var(--danger)">⚠ ${e.message}</span>`)}finally{n&&(n.textContent=`Get suggestions`,n.disabled=!1)}}function Pr(e,t,n,r){s.meals.plan[e]||(s.meals.plan[e]={}),s.meals.plan[e][t]||(s.meals.plan[e][t]={b:``,l:``,d:``}),s.meals.plan[e][t][n]=r,delete s.meals.plan[e][t][`cal_`+n],window.saveData(s),window.closeModal(),Er(),r&&s.settings?.showCalories&&Fr(e,t,n,r)}async function Fr(e,t,n,r){let i=N(`toto_ai_key`);if(!(!i||!r))try{let a=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":i,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:50,messages:[{role:`user`,content:`Estimate the calories in this meal: "${r}". Return ONLY a number, nothing else. For example: 450`}]})});if(!a.ok)return;let o=await a.json(),c=parseInt(o.content[0].text.trim().replace(/[^0-9]/g,``));c>0&&c<5e3&&s.meals.plan[e]?.[t]&&(s.meals.plan[e][t][`cal_`+n]=c,window.saveData(s),Er())}catch{}}function Ir(){let e=s.meals.shopping||[],t=e.filter(e=>e.checked).length,n=e.length-t,r={};mr.forEach(e=>r[e]=[]),e.forEach(e=>{r[mr.includes(e.cat)?e.cat:`Other`].push(e)});let i=``;mr.forEach(e=>{let t=r[e];t.length&&(i+=`
      <div style="margin-bottom:18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:4px">
          ${hr[e]} ${e}
        </div>
        ${t.map(e=>`
          <div class="shop-row">
            <input type="checkbox" ${e.checked?`checked`:``} onchange="toggleShopItem(${e.id},this.checked)"
              style="width:18px;height:18px;cursor:pointer;accent-color:#0891b2;flex-shrink:0">
            <span style="flex:1;font-size:14px;${e.checked?`text-decoration:line-through;color:var(--text-muted)`:``}">${g(e.name)}</span>
            ${e.qty?`<span style="font-size:12px;color:var(--text-muted);white-space:nowrap">${e.qty}</span>`:``}
            <button onclick="removeShopItem(${e.id})" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:18px;line-height:1;padding:2px 4px">×</button>
          </div>`).join(``)}
      </div>`)}),i||(i=`<div class="empty"><div class="empty-icon">🛒</div><p>No items yet — generate from your meal plan or add manually below.</p></div>`),document.getElementById(`meals-content`).innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px">
      <button class="btn btn-sm" onclick="window._mealView='plan';renderMeals()">← Meal Plan</button>
      <div style="display:flex;gap:8px">
        ${t>0?`<button class="btn btn-sm" onclick="clearCheckedShopItems()">Remove ticked (${t})</button>`:``}
      </div>
    </div>

    <div class="section" style="margin-bottom:20px">
      <div class="section-header"><div class="section-title">Add Item</div></div>
      <div style="padding:14px 20px;display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
        <div style="flex:2;min-width:140px">
          <div class="form-label">Item</div>
          <input class="form-input" id="shop-name" type="text" maxlength="200" placeholder="e.g. Chicken breast" autocomplete="off"
            onkeydown="if(event.key==='Enter')addShopItem()">
        </div>
        <div style="flex:1;min-width:80px">
          <div class="form-label">Qty</div>
          <input class="form-input" id="shop-qty" type="text" maxlength="200" placeholder="500g" autocomplete="off">
        </div>
        <div style="flex:1;min-width:120px">
          <div class="form-label">Category</div>
          <select class="form-select" id="shop-cat">
            ${mr.map(e=>`<option value="${e}">${hr[e]} ${e}</option>`).join(``)}
          </select>
        </div>
        <button class="btn btn-primary" onclick="addShopItem()">Add</button>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-title">Shopping List</div>
        <span style="font-size:12px;color:var(--text-muted)">${n} to get${t>0?` · ${t} done`:``}</span>
      </div>
      <div style="padding:8px 20px 16px">${i}</div>
    </div>`}function Lr(){let e=document.getElementById(`shop-name`)?.value.trim();if(!e)return;let t=document.getElementById(`shop-qty`)?.value.trim()||``,n=document.getElementById(`shop-cat`)?.value||`Other`,r=s.meals.shopping;r.push({id:r.length?Math.max(...r.map(e=>e.id))+1:1,name:e,qty:t,cat:n,checked:!1}),window.saveData(s),Ir()}function Rr(e,t){let n=s.meals.shopping.find(t=>t.id===e);n&&(n.checked=t,window.saveData(s))}function zr(e){s.meals.shopping=s.meals.shopping.filter(t=>t.id!==e),window.saveData(s),Ir()}function Br(){s.meals.shopping=s.meals.shopping.filter(e=>!e.checked),window.saveData(s),Ir()}function Vr(e){var t=document.getElementById(`ls-toast`);t&&t.remove();var n=document.createElement(`div`);n.id=`ls-toast`,n.textContent=e,n.style.cssText=`position:fixed;bottom:96px;left:50%;transform:translateX(-50%) translateY(20px);background:#1a1814;color:#fff;padding:10px 18px;border-radius:99px;font-size:13px;font-weight:600;z-index:9999;opacity:0;transition:opacity .2s,transform .2s;pointer-events:none;white-space:nowrap;max-width:80vw;text-align:center;font-family:var(--sans,system-ui,sans-serif)`,document.body.appendChild(n),requestAnimationFrame(function(){n.style.opacity=`1`,n.style.transform=`translateX(-50%) translateY(0)`}),setTimeout(function(){n.style.opacity=`0`,n.style.transform=`translateX(-50%) translateY(10px)`,setTimeout(function(){n.parentNode&&n.remove()},300)},2400)}function Hr(e,t,n,r,i,a,o){s.lists||window._applyMigrations(s);var c=s.lists[e];if(c){if(c.items.find(function(e){return e.state===`active`&&e.name.toLowerCase()===t.toLowerCase()}))return Vr(g(t)+` is already on your list`),!1;var l={id:`li-`+Date.now()+`-`+Math.random().toString(36).slice(2,6),name:t,quantity:n||1,unit:r||`units`,notes:a||``,aisle:i||(e===`food`?yr(t):`other`),state:`active`,addedBy:`user`,addedAt:new Date().toISOString(),stateChangedAt:null,mealTag:o||null,manualPrice:null,barcodeId:null};return c.items.push(l),Zr(e,t),window.saveData(s),!0}}function Ur(e,t,n){if(!(!s.lists||!s.lists[e])){var r=s.lists[e].items.find(function(e){return e.id===t});r&&(r.state=n,r.stateChangedAt=new Date().toISOString(),window.saveData(s),ei())}}function Wr(e,t){!s.lists||!s.lists[e]||(s.lists[e].items=s.lists[e].items.filter(function(e){return e.id!==t}),window.saveData(s),ei())}function Gr(e){var t=document.getElementById(`ls-quick-input`);if(t){var n=t.value.trim();if(n){var r=br(n),i=e===`food`?yr(r.name):`other`;if(Hr(e,r.name,r.qty,r.unit,i,``,null)!==!1){t.value=``;var a=document.getElementById(`ls-parse-preview`);a&&(a.innerHTML=``),ei()}}}}function Kr(e,t){let n=e===`food`,r=s.lists?.[e]?.items||[],i=t?r.find(e=>e.id===t):null,a=n?PANTRY_CATS:[`Other`],o=[`units`,`kg`,`g`,`L`,`ml`,`dozen`];document.getElementById(`modal-title`).textContent=i?`Edit Item`:`Add Item`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="lf-name" type="text" maxlength="200"
        value="${i?_(i.name):``}" placeholder="e.g. Pasta, Milk, Chicken">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="lf-cat">
          ${a.map(e=>`<option value="${e}"${i&&i.aisle===qr(e)?` selected`:``}>${e}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Quantity <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="lf-qty" type="text" maxlength="200"
          value="${i?_(String(i.quantity||``)):``}" placeholder="e.g. 2 bags, 1L, 500g">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Unit</label>
      <select class="form-select" id="lf-unit">
        ${o.map(e=>`<option value="${e}"${i&&i.unit===e?` selected`:``}>${e}</option>`).join(``)}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="lf-notes" type="text" maxlength="200"
        value="${i?_(i.notes||``):``}" placeholder="e.g. Get the organic one, only if on sale">
    </div>
    <div class="form-group">
      <label class="form-label">Status</label>
      <div style="display:flex;gap:8px">
        ${[[`active`,`Still needed`,`#5B4CF5`],[`got_it`,`Got it`,`#10b981`],[`not_found`,`Not found`,`#ef4444`]].map(([e,t,n])=>{let r=(i?.state||`active`)===e;return`<label style="flex:1;cursor:pointer;text-align:center;padding:10px;border-radius:8px;border:2px solid ${r?n:`var(--border)`};background:${r?n+`15`:`var(--surface)`};font-size:12px;font-weight:600;color:${r?n:`var(--text-muted)`}">
            <input type="radio" name="lf-state" value="${e}" ${r?`checked`:``} style="display:none">${t}
          </label>`}).join(``)}
      </div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${i?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="_listsDeleteItem('${e}','${t}');window.closeModal()">Delete</button>`:``}
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="_listsSaveForm('${e}','${t||``}')">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function qr(e){return{Fridge:`dairy`,Freezer:`frozen`,Pantry:`pantry`,"Fruit & Veg":`produce`,Spices:`pantry`,Drinks:`drinks`,Cleaning:`cleaning`,Other:`other`}[e]||`other`}function Jr(e,t){let n=document.getElementById(`lf-name`)?.value.trim();if(!n)return;let r=document.getElementById(`lf-cat`)?.value||`Other`,i=document.getElementById(`lf-qty`)?.value.trim()||`1`,a=document.getElementById(`lf-unit`)?.value||`units`,o=document.getElementById(`lf-notes`)?.value.trim()||``,c=document.querySelector(`input[name="lf-state"]:checked`)?.value||`active`,l=parseFloat(i)||1,u=e===`food`?qr(r):`other`;s.lists||(s.lists={}),s.lists[e]||(s.lists[e]={items:[],weeklyBudget:0,budget:0,stores:[],favourites:[],history:[]});let d=s.lists[e].items;if(t){let e=d.find(e=>e.id===t);e&&(e.name=n,e.quantity=l,e.unit=a,e.notes=o,e.aisle=u,e.state=c)}else{if(d.find(e=>e.name.toLowerCase()===n.toLowerCase()&&e.state===`active`)&&!confirm(`"${n}" is already on your list. Add another?`))return;d.push({id:`si-`+Date.now(),name:n,quantity:l,unit:a,notes:o,aisle:u,state:c,addedBy:window._currentUser?.uid||`guest`,addedAt:new Date().toISOString(),mealTag:null,manualPrice:null,barcodeId:null}),Zr(e,n)}window.saveData(s),window.closeModal(),ei()}function Yr(e){if(!(!s.lists||!s.lists[e])){var t=s.lists[e].items.filter(function(e){return e.state===`got_it`});t.length&&confirm(`Remove `+t.length+` trolley item`+(t.length===1?``:`s`)+`?`)&&(s.lists[e].items=s.lists[e].items.filter(function(e){return e.state!==`got_it`}),window.saveData(s),ei())}}function Xr(e){if(!(!s.lists||!s.lists[e])){var t=s.lists[e];t.history||(t.history=[]),t.history.push({archivedAt:new Date().toISOString(),items:JSON.parse(JSON.stringify(t.items))}),t.items=[],window.saveData(s),Vr(`Shop archived!`),ei()}}function Zr(e,t){if(!(!s.lists||!s.lists[e])){var n=s.lists[e].favourites,r=n.find(function(e){return e.name.toLowerCase()===t.toLowerCase()});r?r.addedCount=(r.addedCount||0)+1:n.push({name:t,addedCount:1,pinned:!1})}}function Qr(e){if(!(!s.lists||!s.lists[e])){var t=s.lists[e].favourites,n=t.filter(function(e){return e.pinned}),r=n.length?n:t.sort(function(e,t){return(t.addedCount||0)-(e.addedCount||0)}).slice(0,5),i=0;r.forEach(function(t){s.lists[e].items.find(function(e){return e.state===`active`&&e.name.toLowerCase()===t.name.toLowerCase()})||(Hr(e,t.name,1,`units`,e===`food`?yr(t.name):`other`,``,null),i++)}),i?ei():Vr(`All usual items are already on the list`)}}function $r(){var e=document.getElementById(`ls-quick-input`),t=document.getElementById(`ls-parse-preview`);if(!(!e||!t)){var n=e.value.trim();if(!n){t.innerHTML=``;return}var r=br(n),i=``;(r.qty!==1||r.unit!==`units`)&&(i+=`<span class="ls-parse-chip">`+g(String(r.qty))+` `+g(r.unit)+`</span>`),i+=`<span class="ls-parse-chip">`+g(r.name)+`</span>`,t.innerHTML=i}}function ei(){var e=document.getElementById(`lists-content`);e&&(s.lists||window._applyMigrations(s),Sr===`selector`?ti(e):ni(e,xr))}function ti(e){var t=`<div class="ls-screen">`;t+=`<div style="font-size:22px;font-weight:800;color:var(--ink,#1a1814);margin-bottom:4px">My Lists</div>`,t+=`<div style="font-size:13px;color:var(--muted,#8c8880);margin-bottom:20px">Tap a list to open it</div>`,t+=`<div class="ls-type-grid">`,Object.keys(gr).forEach(function(e){var n=gr[e],r=(s.lists&&s.lists[e]?s.lists[e]:{items:[]}).items.filter(function(e){return e.state===`active`}).length;t+=`<div class="ls-type-card" onclick="_listsActiveType='`+e+`';_listsView='list';renderLists()">`,t+=`<div class="ls-type-icon" style="background:`+n.color+`;color:`+n.text+`">`+n.emoji+`</div>`,t+=`<div class="ls-type-label">`+g(n.label)+`</div>`,t+=`<div class="ls-type-count">`+(r>0?r+` item`+(r===1?``:`s`):`Empty`)+`</div>`,t+=`</div>`}),t+=`</div>`,t+=`</div>`,e.innerHTML=t}function ni(e,t){var n=gr[t],r=s.lists&&s.lists[t]?s.lists[t]:{items:[],weeklyBudget:0,favourites:[]},i=r.items||[],a=i.filter(function(e){return e.state===`active`}),o=i.filter(function(e){return e.state===`got_it`}),c=i.filter(function(e){return e.state===`not_found`}),l=`<div class="ls-screen">`;if(l+=`<button class="ls-back-btn" onclick="_listsView='selector';renderLists()">← Lists</button>`,l+=`<div class="ls-header">`,l+=`<div style="font-size:22px;margin-right:6px">`+n.emoji+`</div>`,l+=`<div class="ls-header-title">`+g(n.label)+`</div>`,l+=`<div class="ls-sync-dot"></div>`,l+=`<div class="ls-header-count">`+a.length+` to get</div>`,l+=`</div>`,r.weeklyBudget>0){var u=i.filter(function(e){return e.state===`got_it`&&e.manualPrice}).reduce(function(e,t){return e+(t.manualPrice||0)},0),d=Math.min(100,Math.round(u/r.weeklyBudget*100)),f=d>100?`over`:d>80?`warn`:``;l+=`<div class="ls-budget-bar-wrap">`,l+=`<div class="ls-budget-bar-meta"><span>$`+u.toFixed(0)+` spent</span><span>$`+r.weeklyBudget+` budget</span></div>`,l+=`<div class="ls-budget-bar"><div class="ls-budget-fill `+f+`" style="width:`+d+`%"></div></div>`,l+=`</div>`}var p=(r.favourites||[]).filter(function(e){return!a.find(function(t){return t.name.toLowerCase()===e.name.toLowerCase()})}).sort(function(e,t){return(t.addedCount||0)-(e.addedCount||0)}).slice(0,5);if(p.length>0&&(l+=`<div class="ls-fav-chips">`,p.forEach(function(e){l+=`<button class="ls-fav-chip" onclick="_listsAddItem('`+t+`','`+g(e.name).replace(/'/g,`\\'`)+`',1,'units','`+(t===`food`?yr(e.name):`other`)+`','',null);renderLists()">+ `+g(e.name)+`</button>`}),l+=`</div>`),(r.favourites||[]).length>0&&(l+=`<button class="ls-usual-btn" onclick="_listsAddUsual('`+t+`')">The usual →</button>`),l+=`<div class="ls-quick-add">`,l+=`<div class="ls-quick-add-row">`,l+=`<input class="ls-quick-input" id="ls-quick-input" type="text" placeholder="Add item…" autocomplete="off" oninput="_listsUpdateParsePreview()" onkeydown="if(event.key==='Enter')_listsQuickAdd('`+t+`')">`,l+=`<button class="ls-quick-add-btn" onclick="_listsQuickAdd('`+t+`')">Add</button>`,l+=`<button class="ls-quick-add-btn" style="background:var(--purple-soft);color:var(--iris-1);min-width:36px;padding:0 10px" onclick="_listsOpenAddForm('`+t+`')">⋯</button>`,l+=`</div>`,l+=`<div class="ls-parse-preview" id="ls-parse-preview"></div>`,l+=`</div>`,a.length>0)if(n.aisles){var m=_r[t]||[{key:`other`,emoji:`🛒`,label:`Other`}],h={};m.forEach(function(e){h[e.key]=[]}),a.forEach(function(e){var t=e.aisle&&h[e.aisle]!==void 0?e.aisle:`other`;h[t]||(h[t]=[]),h[t].push(e)}),m.forEach(function(e){!h[e.key]||!h[e.key].length||(l+=`<div class="ls-aisle-header">`+e.emoji+` `+g(e.label)+`</div>`,h[e.key].forEach(function(e){l+=ri(t,e)}))})}else a.forEach(function(e){l+=ri(t,e)});else l+=`<div style="text-align:center;padding:32px 0;color:var(--muted,#8c8880);font-size:14px">Nothing to get yet — add something above</div>`;o.length>0&&(l+=`<div class="ls-aisle-header">🛒 In the trolley</div>`,o.forEach(function(e){l+=ri(t,e)})),c.length>0&&(l+=`<div class="ls-aisle-header">🚫 Not found</div>`,c.forEach(function(e){l+=ri(t,e)})),l+=`<div class="ls-footer-row">`,o.length>0&&(l+=`<button class="ls-footer-btn" onclick="_listsClearTrolley('`+t+`')">Clear trolley (`+o.length+`)</button>`),a.length===0&&i.length>0&&(l+=`<button class="ls-footer-btn" style="background:var(--iris-2,#6366f1);color:#fff;border-color:var(--iris-2,#6366f1)" onclick="_listsArchive('`+t+`')">Archive this shop</button>`),l+=`</div>`,l+=`</div>`,e.innerHTML=l}function ri(e,t){var n=t.state===`got_it`?`got-it`:t.state===`not_found`?`not-found`:``,r=t.state===`got_it`?`✓`:``,i=t.state===`active`?`got_it`:`active`,a=t.quantity&&t.unit&&t.unit!==`units`?t.quantity+` `+t.unit:t.quantity&&t.quantity!==1?`x`+t.quantity:``;g(t.id);var o=g(t.name),s=`<div class="ls-item `+n+`">`;return s+=`<button class="ls-item-check" onclick="_listsSetState('`+e+`','`+t.id+`','`+i+`')">`+r+`</button>`,s+=`<div class="ls-item-body">`,s+=`<div class="ls-item-name">`+o+`</div>`,a&&(s+=`<div class="ls-item-qty">`+g(a)+`</div>`),t.notes&&(s+=`<div class="ls-item-notes">`+g(t.notes)+`</div>`),s+=`</div>`,t.state===`active`?s+=`<button class="ls-item-notfound-btn" title="Not found" onclick="_listsSetState('`+e+`','`+t.id+`','not_found')">🚫</button>`:t.state===`not_found`&&(s+=`<button class="ls-item-notfound-btn" title="Mark active again" onclick="_listsSetState('`+e+`','`+t.id+`','active')">↩</button>`),s+=`<button class="ls-item-notfound-btn" title="Edit" onclick="_listsOpenAddForm('`+e+`','`+t.id+`')">✏️</button>`,s+=`<button class="ls-item-del" onclick="_listsDeleteItem('`+e+`','`+t.id+`')">×</button>`,s+=`</div>`,s}async function ii(e){let t=s.meals.plan[e]||{},n=[];for(let e=0;e<7;e++){let r=t[e]||{};[`b`,`l`,`d`].forEach(e=>{r[e]&&n.push(r[e])})}if(!n.length)return;let r=N(`toto_ai_key`);if(!r){xr=`food`,Sr=`list`,activateTab(`lists`);return}let i=document.getElementById(`gen-shop-btn`);i&&(i.textContent=`⏳ Generating…`,i.disabled=!0);let a=`Generate a grocery shopping list for these meals: ${n.join(`, `)}.

Return ONLY a JSON array:
[{"name":"Chicken breast","qty":"500g","cat":"Meat & Seafood"},{"name":"Pasta","qty":"400g","cat":"Pantry"}]

Categories must be one of: Produce, Meat & Seafood, Dairy & Eggs, Pantry, Bakery, Frozen, Household, Other.
Combine quantities where sensible. No duplicates. No other text.`,o={Produce:`produce`,"Meat & Seafood":`meat`,"Dairy & Eggs":`dairy`,Pantry:`pantry`,Bakery:`bakery`,Frozen:`frozen`,Household:`cleaning`,Other:`other`};try{let e=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":r,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:1024,messages:[{role:`user`,content:a}]})})).json()).content[0].text.match(/\[[\s\S]*\]/);if(!e)throw Error(`No JSON`);let t=JSON.parse(e[0]);s.lists||(s.lists={}),s.lists.food||(s.lists.food={items:[],weeklyBudget:200,budget:0,stores:[],favourites:[],history:[]});let n=s.lists.food.items,i=0;t.forEach(e=>{n.some(t=>t.name.toLowerCase()===e.name.toLowerCase()&&t.state===`active`)||n.push({id:`si-meal-`+Date.now()+`-`+ i++,name:e.name,quantity:1,unit:`units`,notes:e.qty||``,aisle:o[e.cat]||(yr?yr(e.name):`other`),state:`active`,addedBy:`meals`,addedAt:new Date().toISOString(),mealTag:`Meal plan`,manualPrice:null,barcodeId:null})}),window.saveData(s),xr=`food`,Sr=`list`,activateTab(`lists`)}catch{i&&(i.textContent=`🛒 Generate shopping list`,i.disabled=!1)}}var ai=[`Living Room`,`Dining Room`,`Kitchen`,`Master Bedroom`,`Bedroom 2`,`Bedroom 3`,`Study / Office`,`Bathroom`,`Laundry`,`Outdoor / Alfresco`,`Other`];function oi(e={}){let t=e.deliveryDate?(()=>{let[t,n,r]=e.deliveryDate.split(`-`);return`${r}/${n}/${t}`})():``;return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-furn-name" type="text" maxlength="200" value="${_(e.name||``)}" placeholder="e.g. 3-seater sofa">
      </div>
      <div class="form-group">
        <label class="form-label">Room</label>
        <select class="form-select" id="f-furn-room">
          <option value="">— Select room —</option>
          ${ai.map(t=>`<option value="${t}" ${e.room===t?`selected`:``}>${t}</option>`).join(``)}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Store / Vendor</label>
        <input class="form-input" id="f-furn-vendor" type="text" maxlength="200" value="${_(e.vendor||``)}" placeholder="e.g. Nick Scali">
      </div>
      <div class="form-group">
        <label class="form-label">Price (AUD)</label>
        <input class="form-input" id="f-furn-price" type="number" max="99999999" value="${e.price||``}" min="0" placeholder="Leave blank if TBC">
      </div>
    </div>
    <div class="form-row" style="align-items:flex-start">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-furn-status">
          <option value="to-purchase" ${!e.status||e.status===`to-purchase`?`selected`:``}>To Purchase</option>
          <option value="ordered"     ${e.status===`ordered`?`selected`:``}>Ordered</option>
          <option value="delivered"   ${e.status===`delivered`?`selected`:``}>Delivered</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Delivery Date</label>
        <input type="hidden" id="f-exp-duedate" value="${e.deliveryDate||``}">
        <div class="date-picker-wrap" id="dp-wrap">
          <div class="date-picker-trigger${e.deliveryDate?` has-value`:``}" id="dp-trigger" onclick="openDatePicker(event)">
            <span id="dp-display">${t||`Select a date`}</span>
            <span style="opacity:0.5;font-size:15px">&#128197;</span>
          </div>
          <div class="date-picker-popup hidden" id="dp-popup"></div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-furn-notes" type="text" maxlength="200" value="${_(e.notes||``)}" placeholder="Optional — colour, dimensions, order number...">
    </div>
    <div class="form-group">
      <label class="form-label">Funding</label>
      <select class="form-select" id="f-furn-funding">
        <option value="own-funds" ${(e.funding||`own-funds`)===`own-funds`?`selected`:``}>Own Funds</option>
        <option value="loan"      ${e.funding===`loan`?`selected`:``}>Loan</option>
      </select>
    </div>
  `}function si(e){return{id:e,name:document.getElementById(`f-furn-name`).value.trim(),room:document.getElementById(`f-furn-room`).value,vendor:document.getElementById(`f-furn-vendor`).value.trim(),price:parseFloat(document.getElementById(`f-furn-price`).value)||0,status:document.getElementById(`f-furn-status`).value,funding:document.getElementById(`f-furn-funding`).value,deliveryDate:document.getElementById(`f-exp-duedate`).value||null,notes:document.getElementById(`f-furn-notes`).value.trim()}}function ci(){window.openModal(`Add Furniture Item`,oi(),()=>{let e=si(k(s.furniture));e.name&&(window.logActivity(`Added furniture`,e.name),s.furniture.push(e),window.saveData(s),window.closeModal(),window.renderAll())})}function li(e){let t=s.furniture.find(t=>t.id===e);window.openModal(`Edit Furniture Item`,oi(t),()=>{let n=si(e);window.logActivity(`Edited furniture`,n.name||t.name),Object.assign(t,n),window.saveData(s),window.closeModal(),window.renderAll()})}function ui(e){if(!confirm(`Delete this item?`))return;let t=s.furniture.find(t=>t.id===e);window.logActivity(`Deleted furniture`,t?t.name:``),s.furniture=s.furniture.filter(t=>t.id!==e),window.saveData(s),window.renderAll()}function di(e={}){let t=e.deliveryDate?(()=>{let[t,n,r]=e.deliveryDate.split(`-`);return`${r}/${n}/${t}`})():``;return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-appl-name" type="text" maxlength="200" value="${_(e.name||``)}" placeholder="e.g. Dishwasher">
      </div>
      <div class="form-group">
        <label class="form-label">Room</label>
        <select class="form-select" id="f-appl-room">
          <option value="">— Select room —</option>
          ${ai.map(t=>`<option value="${t}" ${e.room===t?`selected`:``}>${t}</option>`).join(``)}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Store / Vendor</label>
        <input class="form-input" id="f-appl-vendor" type="text" maxlength="200" value="${_(e.vendor||``)}" placeholder="e.g. Harvey Norman">
      </div>
      <div class="form-group">
        <label class="form-label">Price (AUD)</label>
        <input class="form-input" id="f-appl-price" type="number" max="99999999" value="${e.price||``}" min="0" placeholder="Leave blank if TBC">
      </div>
    </div>
    <div class="form-row" style="align-items:flex-start">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-appl-status">
          <option value="to-purchase" ${!e.status||e.status===`to-purchase`?`selected`:``}>To Purchase</option>
          <option value="ordered"     ${e.status===`ordered`?`selected`:``}>Ordered</option>
          <option value="delivered"   ${e.status===`delivered`?`selected`:``}>Delivered</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Delivery Date</label>
        <input type="hidden" id="f-exp-duedate" value="${e.deliveryDate||``}">
        <div class="date-picker-wrap" id="dp-wrap">
          <div class="date-picker-trigger${e.deliveryDate?` has-value`:``}" id="dp-trigger" onclick="openDatePicker(event)">
            <span id="dp-display">${t||`Select a date`}</span>
            <span style="opacity:0.5;font-size:15px">&#128197;</span>
          </div>
          <div class="date-picker-popup hidden" id="dp-popup"></div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-appl-notes" type="text" maxlength="200" value="${_(e.notes||``)}" placeholder="Optional — model number, colour, order reference...">
    </div>
    <div class="form-group">
      <label class="form-label">Funding</label>
      <select class="form-select" id="f-appl-funding">
        <option value="own-funds" ${(e.funding||`own-funds`)===`own-funds`?`selected`:``}>Own Funds</option>
        <option value="loan"      ${e.funding===`loan`?`selected`:``}>Loan</option>
      </select>
    </div>
  `}function fi(e){return{id:e,name:document.getElementById(`f-appl-name`).value.trim(),room:document.getElementById(`f-appl-room`).value,vendor:document.getElementById(`f-appl-vendor`).value.trim(),price:parseFloat(document.getElementById(`f-appl-price`).value)||0,status:document.getElementById(`f-appl-status`).value,funding:document.getElementById(`f-appl-funding`).value,deliveryDate:document.getElementById(`f-exp-duedate`).value||null,notes:document.getElementById(`f-appl-notes`).value.trim()}}function pi(){window.openModal(`Add Appliance`,di(),()=>{let e=fi(k(s.appliances));e.name&&(window.logActivity(`Added appliance`,e.name),s.appliances.push(e),window.saveData(s),window.closeModal(),window.renderAll())})}function mi(e){let t=s.appliances.find(t=>t.id===e);window.openModal(`Edit Appliance`,di(t),()=>{let n=fi(e);window.logActivity(`Edited appliance`,n.name||t.name),Object.assign(t,n),window.saveData(s),window.closeModal(),window.renderAll()})}function hi(e){if(!confirm(`Delete this item?`))return;let t=s.appliances.find(t=>t.id===e);window.logActivity(`Deleted appliance`,t?t.name:``),s.appliances=s.appliances.filter(t=>t.id!==e),window.saveData(s),window.renderAll()}function gi(){let[e,t]=window.selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t-2,1);window.selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,window.safeRender(vi),window.safeRender(renderBudget)}function _i(){let[e,t]=window.selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t,1);window.selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,window.safeRender(vi),window.safeRender(renderBudget)}function vi(){let e=window.getMonthData(window.selectedBudgetMonth),t=e.income,n=e.expenses,r=O(t),i=O(n),a=r-i,o=r>0?Math.round(a/r*100):0,c={};n.forEach(e=>{let t=e.category||`Other`;c[t]=(c[t]||0)+D(e)});let l=Object.entries(c).sort((e,t)=>t[1]-e[1]),u=s.budget.actuals[window.selectedBudgetMonth]||{},d=n.reduce((e,t)=>e+window.getActual(t.id,window.selectedBudgetMonth),0),f=d>0,p=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
      <button class="btn btn-sm" onclick="prevMoneyMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${window.monthLabel(window.selectedBudgetMonth)}</span>
      <button class="btn btn-sm" onclick="nextMoneyMonth()" style="font-size:16px;padding:2px 10px">›</button>
      ${window.isMonthCustomized(window.selectedBudgetMonth)?`<span style="margin-left:8px;font-size:12px;padding:2px 10px;background:#dbeafe;color:#1d4ed8;border-radius:99px">Custom month</span>`:``}
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-label">Monthly Income</div>
        <div class="card-value green">${b(r)}</div>
        <div class="card-sub">${t.length} source${t.length===1?``:`s`}</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Expenses</div>
        <div class="card-value ${i>r?`red`:``}">${b(i)}</div>
        <div class="card-sub">${n.length} item${n.length===1?``:`s`}</div>
      </div>
      <div class="card">
        <div class="card-label">${a>=0?`Surplus`:`Deficit`}</div>
        <div class="card-value ${a>=0?`green`:`red`}">${b(Math.abs(a))}</div>
        <div class="card-sub">${a>=0?`left over each month`:`overspending each month`}</div>
      </div>
      <div class="card">
        <div class="card-label">Savings Rate</div>
        <div class="card-value ${o>=20?`green`:o>=10?`orange`:`red`}">${o}%</div>
        <div class="card-sub">of income remaining</div>
      </div>
    </div>
  `;if(p+=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-bottom:20px">`,p+=`
    <div class="section">
      <div class="section-header">
        <div class="section-title">Income</div>
        <span style="font-size:15px;font-weight:700;color:var(--success)">${b(r)}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Frequency</th><th class="amount">Monthly</th></tr></thead>
          <tbody>
            ${t.length===0?`<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:20px">No income added yet</td></tr>`:t.map(e=>{let t=r>0?Math.round(D(e)/r*100):0;return`<tr>
                    <td style="font-weight:500;border-left:4px solid #10b981">${g(e.name)}</td>
                    <td style="color:var(--text-muted);font-size:12px">${freqDisplayItem(e)}</td>
                    <td class="amount">${b(D(e))} <span style="color:var(--text-muted);font-size:11px">${t}%</span></td>
                  </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `,p+=`
    <div class="section">
      <div class="section-header">
        <div class="section-title">Expenses by Category</div>
        <span style="font-size:15px;font-weight:700;color:var(--danger)">${b(i)}</span>
      </div>
      <div style="padding:16px 20px">
        ${l.length===0?`<div style="color:var(--text-muted);text-align:center;padding:20px">No expenses added yet</div>`:l.map(([e,t])=>{let r=colors.expense[e]||`#94a3b8`,a=i>0?t/i*100:0,o=n.filter(t=>(t.category||`Other`)===e).reduce((e,t)=>e+(u[t.id]||0),0),s=n.some(t=>(t.category||`Other`)===e&&u[t.id]!==void 0);return`
                <div style="margin-bottom:16px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                    <span style="display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500">
                      <span style="width:11px;height:11px;border-radius:50%;background:${r};flex-shrink:0"></span>
                      ${e}
                    </span>
                    <span style="font-size:13px;font-weight:600">${b(t)}
                      <span style="font-weight:400;color:var(--text-muted);font-size:11px">${Math.round(a)}%</span>
                    </span>
                  </div>
                  <div style="height:7px;background:var(--surface2);border-radius:4px;overflow:hidden;position:relative">
                    <div style="height:100%;width:${a.toFixed(1)}%;background:${r};border-radius:4px;opacity:0.85"></div>
                    ${s?`<div style="position:absolute;top:0;height:100%;width:${Math.min(i>0?o/i*100:0,100).toFixed(1)}%;background:${r};border-radius:4px;border:1.5px solid #fff"></div>`:``}
                  </div>
                  ${s?`<div style="font-size:11px;color:var(--text-muted);margin-top:3px">Actual: ${b(o)}</div>`:``}
                </div>
              `}).join(``)}
      </div>
    </div>
  `,p+=`</div>`,f){let e=i-d;p+=`
      <div class="section" style="margin-bottom:20px">
        <div class="section-header">
          <div>
            <div class="section-title">Actuals — ${window.monthLabel(window.selectedBudgetMonth)}</div>
            <div class="section-subtitle">Recorded spending vs budget</div>
          </div>
          <div style="display:flex;gap:16px;align-items:center;font-size:13px;flex-wrap:wrap">
            <span>Budget: <strong>${b(i)}</strong></span>
            <span>Actual: <strong>${b(d)}</strong></span>
            <span style="font-weight:600;color:${e>=0?`var(--success)`:`var(--danger)`}">
              ${e>=0?`▼`:`▲`} ${b(Math.abs(e))} ${e>=0?`under`:`over`}
            </span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Expense</th><th>Category</th><th class="amount">Budget</th><th class="amount">Actual</th><th class="amount">Difference</th></tr></thead>
            <tbody>
              ${n.filter(e=>u[e.id]!==void 0).map(e=>{let t=D(e),n=u[e.id]||0,r=t-n,i=colors.expense[e.category||`Other`]||`#94a3b8`;return`<tr>
                    <td style="font-weight:500;border-left:4px solid ${i}">${g(e.name)}</td>
                    <td><span style="display:inline-block;padding:2px 9px;border-radius:99px;background:${i};color:#fff;font-size:11px;font-weight:600">${e.category||`Other`}</span></td>
                    <td class="amount">${b(t)}</td>
                    <td class="amount">${b(n)}</td>
                    <td class="amount" style="font-weight:600;color:${r>=0?`var(--success)`:`var(--danger)`}">
                      ${r>=0?`−`:`+`}${b(Math.abs(r))}
                    </td>
                  </tr>`}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `}let m=window.getLast6Months().map(e=>{let t=window.getMonthData(e);return{label:window.monthShortLabel(e),income:O(t.income),expenses:O(t.expenses),actual:Object.values(s.budget.actuals[e]||{}).reduce((e,t)=>e+t,0)}}),h=Math.max(...m.flatMap(e=>[e.income,e.expenses,e.actual]),1),_=524/m.length,v=_*.22,y=[0,.25,.5,.75,1].map(e=>{let t=148-e*136;return`<line x1="64" y1="${t}" x2="588" y2="${t}" stroke="#e2e8f0" stroke-width="1"/>
      <text x="59" y="${t+4}" text-anchor="end" font-size="9" fill="#94a3b8">${b(e*h)}</text>`}).join(``),x=m.map((e,t)=>{let n=64+t*_+_*.05,r=e.income>0?e.income/h*136:0,i=e.expenses>0?e.expenses/h*136:0,a=e.actual>0?e.actual/h*136:0,o=n+v+v/2+_*.04;return`
      <rect x="${n}"                        y="${148-r}" width="${v}" height="${r}" fill="#10b981" opacity="0.75" rx="2"/>
      <rect x="${n+v+_*.06}"       y="${148-i}" width="${v}" height="${i}" fill="#3b82f6" opacity="0.7"  rx="2"/>
      ${e.actual>0?`<rect x="${n+v*2+_*.12}" y="${148-a}" width="${v}" height="${a}" fill="${e.actual>e.expenses?`#ef4444`:`#f59e0b`}" opacity="0.85" rx="2"/>`:``}
      <text x="${o}" y="164" text-anchor="middle" font-size="10" fill="#64748b">${e.label}</text>
    `}).join(``);p+=`
    <div class="section">
      <div class="section-header">
        <div class="section-title">6-Month Trend</div>
        <div class="chart-legend">
          <span><span class="legend-dot" style="background:#10b981"></span>Income</span>
          <span><span class="legend-dot" style="background:#3b82f6"></span>Budget</span>
          <span><span class="legend-dot" style="background:#f59e0b"></span>Actual (under)</span>
          <span><span class="legend-dot" style="background:#ef4444"></span>Actual (over)</span>
        </div>
      </div>
      <div style="padding:16px 20px 8px">
        <svg viewBox="0 0 600 180" style="width:100%;height:auto;display:block">
          ${y}${x}
        </svg>
      </div>
    </div>
  `,document.getElementById(`money-content`).innerHTML=p}function yi(){if(s.setupProgressDismissed)return``;let e=window.setupProgressTasks(),t=e.filter(e=>e.done),n=e.filter(e=>!e.done),r=t.length,i=e.length,a=Math.round(r/i*100);if(r===i)return`<div class="td-card td-card-win" style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <span style="font-size:22px">🎉</span>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:700;color:var(--good)">Setup complete!</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px">Your household is fully configured.</div>
      </div>
      <button onclick="state.setupProgressDismissed=true;window.saveData(state);renderToday()" style="font-size:12px;color:var(--muted);background:none;border:none;cursor:pointer;font-weight:600;padding:0">Dismiss</button>
    </div>`;let o=2*Math.PI*22,c=`
    <div onclick="window._spExpanded=!window._spExpanded;window._refreshSetupProgress()" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none">
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--ink)">Finish setting up Toto</div>
        <div style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:3px">${r} of ${i} complete</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <div style="position:relative;width:52px;height:52px">${`
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r="22" fill="none" stroke="var(--hairline)" stroke-width="4"/>
      <circle cx="26" cy="26" r="22" fill="none" stroke="var(--purple)" stroke-width="4"
        stroke-dasharray="${o.toFixed(1)}" stroke-dashoffset="${(o-a/100*o).toFixed(1)}"
        stroke-linecap="round" transform="rotate(-90 26 26)"/>
    </svg>
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:10px;font-weight:700;color:var(--purple)">${a}%</div>`}</div>
        <span style="font-size:10px;color:var(--muted-soft)">${window._spExpanded?`▲`:`▼`}</span>
      </div>
    </div>
    <div style="background:var(--hairline);border-radius:99px;height:4px;margin-top:14px;overflow:hidden">
      <div style="width:${a}%;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--iris-2),var(--iris-3))"></div>
    </div>`;if(!window._spExpanded)return`<div class="td-card" style="margin-bottom:10px">${c}</div>`;let l=n[0],u=n.map(e=>{let t=e===l,n=e.settingsSection?`activateTab('${e.tab}');setTimeout(()=>{const el=document.getElementById('acc-${e.settingsSection||``}');if(el&&!el.classList.contains('open')){el.querySelector('.acc-header')?.click();}el?.scrollIntoView({behavior:'smooth',block:'start'})},200)`:e.tab?`activateTab('${e.tab}')`:``,r=n?`onclick="${n}"`:``;return`<div style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;background:${t?`var(--purple-tint)`:`transparent`};border:1px solid ${t?`var(--purple-mid,#DDD6FE)`:`var(--hairline)`};cursor:${e.tab?`pointer`:`default`}" ${r}>
      <div style="width:20px;height:20px;border-radius:50%;border:2px solid ${t?`var(--purple)`:`var(--hairline)`};flex-shrink:0"></div>
      <span style="font-size:13px;flex:1;color:var(--ink);font-weight:${t?`500`:`400`}">${e.label}</span>
      ${e.tab?`<span style="font-size:11px;color:${t?`var(--purple)`:`var(--muted-soft)`};font-weight:600">Go →</span>`:``}
    </div>`}).join(``),d=t.map(e=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;border:1px solid var(--good-soft)">
      <div style="width:20px;height:20px;border-radius:50%;background:var(--good);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;flex-shrink:0">✓</div>
      <span style="font-size:13px;flex:1;text-decoration:line-through;color:var(--muted)">${e.label}</span>
    </div>`).join(``);return`
    <div class="td-card" style="margin-bottom:10px">
      ${c}
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:14px">${u}</div>
      ${r>0?`
    <div style="margin-top:10px;border-top:1px solid var(--hairline-soft);padding-top:10px">
      <div onclick="window._spDoneExpanded=!window._spDoneExpanded;window._refreshSetupProgress()" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:4px 0;margin-bottom:${window._spDoneExpanded?`8px`:`0`}">
        <span style="font-size:12px;font-weight:600;color:var(--good)">${r} done</span>
        <span style="font-size:10px;color:var(--muted-soft)">${window._spDoneExpanded?`▲`:`▼`}</span>
      </div>
      ${window._spDoneExpanded?`<div style="display:flex;flex-direction:column;gap:5px">${d}</div>`:``}
    </div>`:``}
      <div style="text-align:center;margin-top:12px">
        <button onclick="state.setupProgressDismissed=true;window.saveData(state);renderToday()" style="font-size:12px;color:var(--muted);background:none;border:none;cursor:pointer">Dismiss · I'll do this later</button>
      </div>
    </div>`}var bi=[`#FF3B3B`,`#FF8A65`,`#FFB088`,`#FCD34D`,`#94A3B8`,`#27272a`];function xi(e){let t=(e.expenses||[]).filter(e=>!e.skipped).map(e=>({name:e.name||`Other`,amount:freqToMonthly(Number(e.amount)||0,e.frequency)})).filter(e=>e.amount>0).sort((e,t)=>t.amount-e.amount);if(!t.length)return{segments:[],total:0};let n=t.reduce((e,t)=>e+t.amount,0),r=t.slice(0,5),i=t.slice(5),a=r.map((e,t)=>({name:e.name,pct:e.amount/n*100,color:bi[t]||`#94A3B8`}));if(i.length){let e=i.reduce((e,t)=>e+t.amount,0);a.push({name:`Other`,pct:e/n*100,color:bi[5]})}return{segments:a,total:n}}function Si(e){let t=(e.title||``).toLowerCase();return t.includes(`dinner`)||t.includes(`lunch`)||t.includes(`meal`)?`i-chef-hat`:t.includes(`rego`)||t.includes(`vehicle`)?`i-car`:t.includes(`health:`)?`i-activity`:t.includes(`over budget`)?`i-zap`:t.includes(`left in budget`)||t.includes(`budget`)?`i-wallet`:t.includes(`bill`)||t.includes(`due`)?`i-receipt`:t.includes(`expir`)?`i-file-text`:t.includes(`overdue`)||t.includes(`maintenance`)?`i-clipboard-check`:e.section===`Plan`?`i-calendar`:e.section===`Home`?`i-home`:e.section===`Wallet`?`i-wallet`:`i-clipboard-check`}function Ci(e){let t=e.section;return t===`Wallet`?`money`:t===`Plan`?`social`:t===`Home`?`work`:t===`Family`?`family`:`study`}function wi(e){return(e.section||`Task`).toLowerCase()}function Ti(){let e=[`S`,`M`,`T`,`W`,`T`,`F`,`S`],t=new Date,n=t.getDay()===0?6:t.getDay()-1,r=new Date(t);r.setDate(t.getDate()-n);let i=new Set;(s.bills||[]).forEach(e=>{let t=e.dueDate||e.nextDue;t&&i.add(t.slice(0,10))}),(s.planner?.events||[]).forEach(e=>{e.date&&i.add(e.date.slice(0,10))}),(s.maintenance||[]).forEach(e=>{e.nextDue&&i.add(e.nextDue.slice(0,10))});let a=[];for(let n=0;n<7;n++){let o=new Date(r);o.setDate(r.getDate()+n);let s=o.toISOString().slice(0,10),c=o.toDateString()===t.toDateString(),l=o<t&&!c,u=o.getDay(),d=c?`ws-day today`:l?`ws-day past`:`ws-day`,f=i.has(s)?` has`:``;a.push(`<div class="${d}${f}"><div class="ws-init">${e[u]}</div><div class="ws-num">${o.getDate()}</div><div class="ws-dot"></div></div>`)}return`<div class="week-strip">${a.join(``)}</div>`}function Ei(e){return`<div class="life-grid">`+[{cls:`money`,label:`Money`,match:e=>e.section===`Wallet`,icon:`<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>`,track:`#DDD6FE`,stroke:`#5B4CF5`},{cls:`family`,label:`Family`,match:e=>/kid|chore|family|riley|mia|child/i.test(e.title||``),icon:`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>`,track:`#A7F3D0`,stroke:`#10B981`},{cls:`work`,label:`Home`,match:e=>e.section===`Home`,icon:`<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,track:`#FDE9B0`,stroke:`#F59E0B`},{cls:`social`,label:`Plan`,match:e=>e.section===`Plan`,icon:`<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,track:`#FECDD3`,stroke:`#F43F5E`}].map(t=>{let n=(e||[]).filter(t.match),r=n.length,i=n.filter(e=>e.cls===`red`||e.cls===`amber`).length,a=(82-(r>0?Math.max(0,1-i/r):1)*82).toFixed(1);return`<div class="life-card ${t.cls}" onclick="activateTab('${t.cls===`money`?`budget`:t.cls===`family`?`kids`:t.cls===`work`?`documents`:`planner`}')">
      <div class="life-card-top">
        <div class="life-icon-box"><svg viewBox="0 0 24 24">${t.icon}</svg></div>
        <svg class="arc-ring" width="34" height="34" viewBox="0 0 34 34">
          <circle class="arc-track" cx="17" cy="17" r="13" stroke="${t.track}"/>
          <circle class="arc-progress" cx="17" cy="17" r="13" stroke="${t.stroke}" stroke-dashoffset="${a}"/>
        </svg>
      </div>
      <div class="life-label">${t.label}</div>
      <div class="life-count">${i||r}</div>
      <div class="life-sub">${i?`pending`:r?`all clear`:`nothing yet`}</div>
    </div>`}).join(``)+`</div>`}function Di(e){let t=e.onclick?e.onclick:e.tab?`activateTab('${e.tab}')`:``,n=Si(e),r=[`red`,`amber`,`green`,`blue`].includes(e.cls)?e.cls:`grey`;return`<div class="brief-row"${t?` onclick="${t}"`:``}>
    <div class="brief-glyph ${r}"><svg viewBox="0 0 24 24"><use href="#${n}"/></svg></div>
    <div class="brief-body">
      <div class="t">${e.title||``}</div>
      ${e.sub?`<div class="s">${e.sub}</div>`:``}
    </div>
    <svg class="brief-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  </div>`}function Oi(){let e=document.getElementById(`today-content`);if(!e)return;let t=new Date,r=t.getHours(),i=t.toISOString().slice(0,10);function a(e){return e<5?`overnight`:e<12?`morning`:e<17?`afternoon`:e<21?`evening`:`night`}let o=a(r),c={morning:`Good morning,`,afternoon:`Good afternoon,`,evening:`Wind down,`,night:`Tomorrow at a glance —`,overnight:`Still up,`}[o]||`Hello,`,l=window._currentUser?.displayName?.split(` `)[0]||s.settings?.adultName?.split(` `)[0]||s.settings?.adults?.[0]?.name?.split(` `)[0]||s.householdProfile?.members?.find(e=>e.role===`adult`)?.name?.split(` `)[0]||``,u=t.toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`}).toUpperCase(),d=[],f=(s.bills||[]).map(e=>({...e,days:n(e)})).filter(e=>e.days!==null&&e.days<=2).sort((e,t)=>e.days-t.days);(s.maintenance||[]).filter(e=>{let t=window._maintDaysUntil(e);return t!==null&&t<0}),(s.documents||[]).filter(e=>e.expiryDate&&new Date(e.expiryDate)<t),(s.vehicles||[]).filter(e=>e.regoExpiry&&new Date(e.regoExpiry)<t);let p=[];(s.documents||[]).forEach(e=>{e.expiryDate&&new Date(e.expiryDate)<t&&p.push({label:g(e.name),sub:`Document expired`,cls:`alert`,tab:`documents`})}),(s.maintenance||[]).forEach(e=>{let t=window._maintDaysUntil(e);t!==null&&t<0&&p.push({label:g(e.name),sub:`${Math.abs(t)}d overdue`,cls:`watch`,tab:`maintenance`})}),(s.vehicles||[]).forEach(e=>{e.regoExpiry&&new Date(e.regoExpiry)<t&&p.push({label:g(e.name)+` rego`,sub:`Expired`,cls:`alert`,tab:`vehicles`})});let m=f.length>0,h=p.length>0;if(m||h){let e=f.length===1?f[0].days===0?`due today`:f[0].days===1?`due tomorrow`:`due in ${f[0].days} days`:`bill${f.length===1?``:`s`} due soon`,t=m?`
      <div onclick="_tdOpenHeadsUpSheet()" style="flex:1;min-width:0;background:var(--purple-soft);border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(91,76,245,.15);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(91,76,245,.08);position:relative;overflow:hidden">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(91,76,245,.18) 0%,transparent 70%);pointer-events:none"></div>
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--iris-2);margin-bottom:6px">Heads Up</div>
          <div style="font-size:36px;font-weight:800;color:var(--iris-1);letter-spacing:-.05em;line-height:1">${f.length}</div>
          <div style="font-size:12px;color:var(--iris-2);margin-top:3px">${e}</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--iris-1)">View all →</div>
      </div>`:`
      <div style="flex:1;min-width:0;background:#F0FDF4;border-radius:var(--r-lg);padding:16px;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(16,185,129,.18);box-shadow:0 1px 0 rgba(255,255,255,.9) inset">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#059669;margin-bottom:6px">Heads Up</div>
          <div style="font-size:36px;font-weight:800;color:var(--good);letter-spacing:-.05em;line-height:1">✓</div>
          <div style="font-size:12px;color:#059669;margin-top:3px">no bills due</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--good)">All clear</div>
      </div>`,n=h?`
      <div onclick="_tdOpenSlippingSheet()" style="flex:1;min-width:0;background:#FFF4EE;border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(249,115,22,.18);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(249,115,22,.06);position:relative;overflow:hidden">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.15) 0%,transparent 70%);pointer-events:none"></div>
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c2410c;margin-bottom:6px">Slipping</div>
          <div style="font-size:36px;font-weight:800;color:var(--ember);letter-spacing:-.05em;line-height:1">${p.length}</div>
          <div style="font-size:12px;color:#c2410c;margin-top:3px">item${p.length===1?``:`s`} overdue</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--ember)">View all →</div>
      </div>`:`
      <div style="flex:1;min-width:0;background:#F0FDF4;border-radius:var(--r-lg);padding:16px;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(16,185,129,.18);box-shadow:0 1px 0 rgba(255,255,255,.9) inset">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#059669;margin-bottom:6px">Slipping</div>
          <div style="font-size:36px;font-weight:800;color:var(--good);letter-spacing:-.05em;line-height:1">✓</div>
          <div style="font-size:12px;color:#059669;margin-top:3px">all clear</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--good)">Nothing overdue</div>
      </div>`;d.push({type:`priority`,urgency:f.length>0?3:h?2:0,html:`<div style="display:flex;gap:12px;margin-bottom:12px">${t}${n}</div>`})}let _=o===`evening`||o===`night`?new Date(t.getTime()+864e5).toISOString().slice(0,10):i,v=_===i?`Today`:`Tomorrow`,y=_plannerEventsForDate?_plannerEventsForDate(_):[];if(y.length>0){let e=t.getHours()*60+t.getMinutes(),n=y.slice(0,4).map((t,n,r)=>{let a=t.allDay||!t.time?`All day`:_plannerFmt12h?_plannerFmt12h(t.time):t.time,o=_plannerEvWhoLabel?_plannerEvWhoLabel(t):``,s=_plannerEvPrimaryMember?_plannerEvPrimaryMember(t):{dot:`var(--iris-2)`},c=PLANNER_CATS?PLANNER_CATS[t.category]||PLANNER_CATS.other:{emoji:`📅`,label:``},l=t.time?parseInt(t.time.split(`:`)[0])*60+parseInt(t.time.split(`:`)[1]):-1,u=_===i&&l>=0&&e>=l&&e<l+90,d=n===Math.min(y.length,4)-1,f=c.color||`#f1f5f9`,p=c.text||`#475569`;return p.replace(/^#/,``),`<div class="pl-agenda-ev" style="margin-bottom:${d?`0`:`8px`}">
        <div class="pl-agenda-time-col">
          <span class="pl-agenda-time">${a}</span>
        </div>
        <div class="pl-agenda-timeline">
          <div class="pl-agenda-dot${u?` now`:``}" style="color:${p};background:${u?p:f}"></div>
          ${d?``:`<div class="pl-agenda-line"></div>`}
        </div>
        <div class="pl-agenda-card" style="background:${f};border-color:${p}22" onclick="activateTab('planner');setTimeout(()=>_plannerOpenDetail&&_plannerOpenDetail('${t.id}'),120)">
          <div class="pl-agenda-card-title">${g(t.title)}</div>
          <div class="pl-agenda-card-meta">
            <span class="pl-agenda-who-dot" style="background:${s.dot}"></span>
            <span>${o}</span>
          </div>
          ${c.label?`<div class="pl-agenda-cat-pill" style="background:${p}1a;color:${p}">${c.emoji} ${c.label}</div>`:``}
        </div>
      </div>`}).join(``);d.push({type:`schedule`,urgency:1,html:`<div class="td-card td-card-schedule" style="padding:0;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;border-bottom:1px solid rgba(24,24,27,.06)">
          <div class="td-card-meta" style="margin-bottom:0"><span class="td-meta-label">${v}</span><span class="td-meta-count" style="margin-left:2px">${y.length}</span></div>
          <span style="font-size:12px;font-weight:600;color:var(--iris-2);cursor:pointer" onclick="activateTab('planner')">See all →</span>
        </div>
        <div style="padding:12px 16px">${n}</div>
      </div>`})}let b=window.getMonthData(window.selectedBudgetMonth),x=O(b.income),S=O(b.expenses),C=x-S,w=(b.expenses||[]).reduce((e,t)=>e+window.getActual(t.id,window.selectedBudgetMonth),0),T=new Date(t.getFullYear(),t.getMonth()+1,0).getDate()-t.getDate(),ee=S>0?Math.min(100,Math.round(w/S*100)):0;if(x>0||S>0){let e=C>=0?``:`td-money-status-watch`,n=C>=0?`On track`:`Over budget`,r=Math.abs(C),i=[];f.forEach(e=>i.push(`<span class="td-money-flag td-money-flag-watch">${g(e.name)} due ${e.days===0?`today`:e.days===1?`tomorrow`:`in `+e.days+`d`}</span>`)),d.push({type:`money`,urgency:0,html:`<div class="td-card td-card-money">
        <div class="td-money-row">
          <div>
            <div class="td-card-meta"><span class="td-meta-label">${t.toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</span></div>
            <div class="money-amount"><span class="money-amount-currency">$</span>${r.toLocaleString(`en-AU`,{maximumFractionDigits:0})}<span class="money-amount-suffix">${C>=0?`left`:`over`}</span></div>
          </div>
          <span class="td-money-status ${e}">${n}</span>
        </div>
        <div class="td-money-bar"><div class="td-money-bar-fill" style="width:${ee}%"></div></div>
        <div class="td-money-flags">${i.join(``)}<span class="td-money-flag">${T} days left</span></div>
      </div>`})}let E=typeof _routinesForCurrentUser==`function`?_routinesForCurrentUser().filter(e=>_routineMatchesDate(e,i)):[];function te(e){if(!e.triggerTime)return!0;let[n,r]=e.triggerTime.split(`:`).map(Number),i=t.getHours()*60+t.getMinutes(),a=n*60+(r||0);return i>=a-90&&i<a+360}let D=E.filter(te),k=typeof _routineTodayKey==`function`?_routineTodayKey():i.replace(/-/g,``),A=E.filter(e=>!te(e)&&(e.completions?.[k]||[]).length>0),ne=[...new Set([...D,...A])];if(ne.length>0){let e=ne.map(e=>{let t=(e.completions?.[k]||[]).map(String),n=e.steps.length,r=t.length,i=n>0?Math.round(r/n*100):0,a=r===n&&n>0,o=te(e),s=e.triggerTime?`<span style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-left:6px">${e.triggerTime}</span>`:``,c=e.steps.map(n=>{let r=t.includes(String(n.id)),i=n.durationMin?`<span style="font-family:var(--mono);font-size:10px;color:var(--muted-soft);margin-left:auto;padding-left:8px;flex-shrink:0">${n.durationMin}m</span>`:``;return`<div class="td-routine-step ${r?`td-routine-step-done`:``}" onclick="_tdToggleStep('${e.id}','${n.id}')">
          <div class="td-routine-check ${r?`td-routine-check-done`:``}">
            ${r?`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``}
          </div>
          <span class="td-routine-step-emoji">${n.emoji||``}</span>
          <span class="td-routine-step-label ${r?`td-routine-step-label-done`:``}">${g(n.label)}</span>
          ${n.points?`<span class="td-routine-step-pts">+${n.points}</span>`:``}
          ${i}
        </div>`}).join(``);return`<div class="td-routine-card ${a?`td-routine-card-done`:o?`td-routine-card-active`:`td-routine-card-locked`}">
        <div class="td-routine-header">
          <span style="font-size:20px">${e.emoji||`📋`}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;color:var(--ink)">${g(e.name)}${s}</div>
            <div style="height:3px;background:var(--hairline);border-radius:99px;margin-top:6px;overflow:hidden">
              <div style="width:${i}%;height:100%;border-radius:99px;background:${a?`var(--good)`:`linear-gradient(90deg,var(--iris-2),var(--iris-3))`}"></div>
            </div>
          </div>
          <span style="font-family:var(--mono);font-size:11px;color:${a?`var(--good)`:`var(--muted)`}">
            ${a?`✓ Done`:`${r}/${n}`}
          </span>
        </div>
        ${o&&n>0?`<div class="td-routine-steps">${c}</div>`:``}
        ${o?``:`<div style="font-size:11px;color:var(--muted-soft);padding:4px 0 2px;font-family:var(--mono)">${_cvRoutineAvailLabel?_cvRoutineAvailLabel(e):``}</div>`}
      </div>`}).join(``);d.push({type:`kids`,urgency:0,html:`<div class="td-card td-card-kids" style="padding:16px 18px">
        <div class="td-card-meta" style="margin-bottom:10px"><span class="td-meta-label">My Routines</span><span class="td-meta-count">${ne.length}</span></div>
        ${e}
      </div>`})}let re=new Date(t.getTime()+7*864e5).toISOString().slice(0,10),ie=(s.planner?.events||[]).filter(e=>e.date>i&&e.date<=re).sort((e,t)=>e.date.localeCompare(t.date)).slice(0,3),j=(s.bills||[]).map(e=>({...e,days:n(e)})).filter(e=>e.days!==null&&e.days>2&&e.days<=7);if(ie.length+j.length>0){let e=[...ie.map(e=>{let t=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`}),n=!e.allDay&&e.time?_plannerFmt12h?_plannerFmt12h(e.time):e.time:``;return`<div class="td-up-row td-clickable" onclick="activateTab('planner');setTimeout(()=>_plannerOpenDetail&&_plannerOpenDetail('${e.id}'),120)">
          <div style="display:flex;flex-direction:column;gap:1px;min-width:60px;flex-shrink:0">
            <span class="td-up-date">${t}</span>
            ${n?`<span style="font-family:var(--mono);font-size:10px;color:var(--iris-2);font-weight:600">${n}</span>`:``}
          </div>
          <span class="td-up-title" style="flex:1">${g(e.title)}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hairline)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>`}),...j.map(e=>`<div class="td-up-row td-clickable" onclick="activateTab('bills')">
        <span class="td-up-date">In ${e.days}d</span>
        <span class="td-up-title" style="flex:1">${g(e.name)} <span style="font-family:var(--mono);color:var(--muted)">$${parseFloat(e.amount).toFixed(0)}</span></span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hairline)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`)].slice(0,4).join(``);d.push({type:`upcoming`,urgency:0,html:`<div class="td-card">
        <div class="td-card-meta"><span class="td-meta-label">Coming up</span><span class="td-meta-count">${ie.length+j.length}</span></div>
        <div class="td-up-list">${e}</div>
      </div>`})}let ae=(s.kids?.profiles||[]).map(e=>{let t=(s.routineAssignments||[]).filter(t=>t.childId===e.id),n=0;return t.forEach(e=>{let t=(s.routines||[]).find(t=>t.id===e.routineId);if(t){let r=_assignmentStreak?_assignmentStreak(e,t.steps.length):0;r>n&&(n=r)}}),{kid:e,streak:n}}).filter(e=>e.streak>=3);if(ae.length>0){let e=ae[0];d.push({type:`win`,urgency:0,html:`<div class="td-card td-card-win">
        <div class="td-card-meta"><span class="td-meta-label" style="color:var(--lime-deep)">Win</span></div>
        <div class="td-card-headline" style="font-family:var(--serif);font-style:italic">${g(e.kid.name)} did every routine. ${e.streak} days running.</div>
      </div>`})}{let e=s.lists&&s.lists.food?s.lists.food:{items:[]},t=(e.items||[]).filter(e=>e.state===`active`),n=(e.items||[]).filter(e=>e.state===`got_it`),r=s.kids,i=r?(r.completions||[]).filter(e=>e.status===`pending`).length+(r.redemptions||[]).filter(e=>e.status===`pending`).length:0,a=s.kids?.profiles?.length>0,o=`
      <div onclick="_listsActiveType='food';_listsView='list';activateTab('lists')" style="flex:1;min-width:0;background:var(--purple-soft);border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:130px;border:1px solid rgba(91,76,245,.12);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(91,76,245,.08)">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--iris-2);margin-bottom:6px">Shopping List</div>
          <div style="font-size:28px;font-weight:800;color:var(--iris-1);letter-spacing:-.04em;line-height:1">${t.length}</div>
          <div style="font-size:12px;color:var(--iris-2);margin-top:2px">${t.length===1?`item`:`items`}${n.length>0?` · ${n.length} in trolley`:``}</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--iris-1);margin-top:10px">View list →</div>
      </div>`,c=a?`
      <div onclick="activateTab('kids')" style="flex:1;min-width:0;background:${i>0?`#FFF7ED`:`#F0FDF4`};border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:130px;border:1px solid ${i>0?`rgba(249,115,22,.15)`:`rgba(16,185,129,.15)`};box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(22,20,15,.05)">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${i>0?`#c2410c`:`#059669`};margin-bottom:6px">Kids</div>
          <div style="font-size:28px;font-weight:800;color:${i>0?`var(--ember)`:`var(--good)`};letter-spacing:-.04em;line-height:1">${i>0?i:`✓`}</div>
          <div style="font-size:12px;color:${i>0?`#c2410c`:`#059669`};margin-top:2px">${i>0?`approval${i===1?``:`s`} pending`:`all clear`}</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:${i>0?`var(--ember)`:`var(--good)`};margin-top:10px">${i>0?`Review →`:`View kids →`}</div>
      </div>`:``;d.push({type:`lists`,urgency:+(i>0),html:`<div style="display:flex;gap:12px;margin-bottom:12px">${o}${c}</div>`})}function oe(){let e={overnight:`Quiet night.`,morning:`Quiet day ahead.`,afternoon:`Quiet afternoon.`,evening:`Quiet evening.`,night:`Nothing pressing tonight.`},t=[];if(y.length>=3?t.push(`${y.length} things on the calendar.`):y.length===0&&p.length===0&&f.length===0&&t.push(e[o]||`Quiet day ahead.`),f.length>0){let e=f[0];t.push(`${e.name} ${e.days===0?`is due today`:`is due tomorrow`}.`)}return t.length===0&&t.push(e[o]||`Quiet day ahead.`),t.slice(0,2).join(` `)}let M=oe(),se={priority:0,schedule:1,money:2,lists:3,kids:4,slipping:5,upcoming:6,win:7};d.sort((e,t)=>(se[e.type]??9)-(se[t.type]??9));let ce=d.map(e=>e.html).join(``),le=d.length<=1?`<div class="td-calm">You're sorted.<br>See you tomorrow.</div>`:``,ue=typeof yi==`function`?`<div id="setup-progress-card">${yi()}</div>`:``;if(e.innerHTML=`
    <div class="td-app-header">
      <div class="td-logo">TOTO</div>
      <div class="td-header-icons">
        <button class="td-icon-btn td-icon-btn-iris" onclick="toggleTotoAssistant()" title="Ask Toto" aria-label="Ask Toto" style="font-size:16px">🐕</button>
        <button class="td-icon-btn td-icon-btn-iris" onclick="toggleInsightSheet()" title="Insights" aria-label="Insights">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </button>
        <button class="td-icon-btn" onclick="activateTab('settings')" title="Settings" aria-label="Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
      </div>
    </div>

    <div class="td-greeting">
      <div class="td-greeting-date">${u}</div>
      <div class="td-greeting-line">
        ${c} <span class="iris-text">${l?l+`.`:`you.`}</span>
      </div>
      <div class="td-greeting-brief">${g(M)}</div>
    </div>

    ${ue}
    ${s.settings?.typeAMode?`
      ${window._renderLifeScore()}
      ${window._renderMissionCard()}
    `:``}
    ${ce}
    ${le}
  `,s.settings?.typeAMode&&window._checkMissionEscalation(),typeof Li==`function`){let e=typeof window.calcFinancialHealth==`function`?window.calcFinancialHealth():null,n=typeof _mealWeekKey==`function`?_mealWeekKey(0):null,r=n&&s.meals?.plan?.[n]?.[t.getDay()===0?6:t.getDay()-1]||{};Li(d.map(e=>({title:e.type})),C,T,r,e)}}function ki(){let e=(s.bills||[]).map(e=>({...e,days:n(e)})).filter(e=>e.days!==null&&e.days<=2).sort((e,t)=>e.days-t.days);if(!e.length)return;let t=e.reduce((e,t)=>e+(parseFloat(t.amount)||0),0);ji(`Heads Up`,e.map(e=>{let t=e.days===0?`Due today`:e.days===1?`Tomorrow`:`In ${e.days} days`,n=e.days===0?`background:#FEF2F2;color:#b91c1c`:e.days===1?`background:#FFF4EE;color:#c2410c`:`background:var(--paper);color:var(--muted)`,r=e.amount?`$${parseFloat(e.amount).toLocaleString(`en-AU`,{minimumFractionDigits:2,maximumFractionDigits:2})}`:``,i=e.days===0?`box-shadow:0 0 0 3px rgba(239,68,68,.2)`:e.days===1?`box-shadow:0 0 0 3px rgba(249,115,22,.2)`:``;return`<div style="display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--hairline);gap:14px">
      <div style="width:8px;height:8px;border-radius:50%;background:${e.days===0?`#ef4444`:e.days===1?`var(--ember)`:`var(--iris-2)`};flex-shrink:0;${i}"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:var(--ink)">${g(e.name)}</div>
        ${e.notes?`<div style="font-size:11px;color:var(--muted);margin-top:2px;font-family:var(--mono)">${g(e.notes)}</div>`:``}
      </div>
      <div style="text-align:right;flex-shrink:0">
        ${r?`<div style="font-family:var(--mono);font-size:13px;font-weight:600;color:var(--iris-1)">${r}</div>`:``}
        <div style="display:inline-block;font-family:var(--mono);font-size:10px;font-weight:700;border-radius:99px;padding:2px 8px;margin-top:3px;${n}">${t}</div>
      </div>
    </div>`}).join(``)+`<div style="padding:14px 18px;border-top:1px solid var(--hairline);display:flex;align-items:center;justify-content:space-between">
    <div>
      <div style="font-family:var(--mono);font-size:11px;color:var(--muted)">Total due</div>
      <div style="font-family:var(--mono);font-size:15px;font-weight:700;color:var(--ink)">$${t.toLocaleString(`en-AU`,{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
    </div>
    <button onclick="activateTab('bills');_tdCloseSheet()" style="background:linear-gradient(135deg,var(--iris-1),var(--iris-2));color:#fff;border:none;border-radius:99px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer">Pay bills →</button>
  </div>`)}function Ai(){let e=new Date,t=[];(s.documents||[]).forEach(n=>{n.expiryDate&&new Date(n.expiryDate)<e&&t.push({label:n.name,sub:`Documents`,badge:`Expired`,cls:`alert`,tab:`documents`})}),(s.maintenance||[]).forEach(e=>{let n=window._maintDaysUntil(e);n!==null&&n<0&&t.push({label:e.name,sub:`Maintenance`,badge:`${Math.abs(n)}d overdue`,cls:`watch`,tab:`maintenance`})}),(s.vehicles||[]).forEach(n=>{n.regoExpiry&&new Date(n.regoExpiry)<e&&t.push({label:n.name+` rego`,sub:`Vehicles`,badge:`Expired`,cls:`alert`,tab:`vehicles`})}),t.length&&ji(`Slipping`,t.map(e=>{let t=e.cls===`alert`?`#ef4444`:`var(--ember)`,n=e.cls===`alert`?`box-shadow:0 0 0 3px rgba(239,68,68,.15)`:`box-shadow:0 0 0 3px rgba(249,115,22,.18)`,r=e.cls===`alert`?`background:#FEF2F2;color:#b91c1c`:`background:#FFF4EE;color:#c2410c`;return`<div onclick="activateTab('${e.tab}');_tdCloseSheet()" style="display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--hairline);gap:14px;cursor:pointer">
      <div style="width:8px;height:8px;border-radius:50%;background:${t};flex-shrink:0;${n}"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:var(--ink)">${g(e.label)}</div>
        <div style="font-size:11px;color:var(--muted);margin-top:2px;font-family:var(--mono)">${e.sub}</div>
      </div>
      <div style="display:inline-block;font-family:var(--mono);font-size:10px;font-weight:700;border-radius:99px;padding:2px 8px;${r}">${e.badge}</div>
    </div>`}).join(``)+`<div style="padding:14px 18px;border-top:1px solid var(--hairline);display:flex;justify-content:flex-end">
    <button onclick="_tdCloseSheet()" style="background:linear-gradient(135deg,#ea6c0a,var(--ember));color:#fff;border:none;border-radius:99px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer">Done</button>
  </div>`)}function ji(e,t){let n=document.getElementById(`td-sheet-overlay`);n||(n=document.createElement(`div`),n.id=`td-sheet-overlay`,n.style.cssText=`position:fixed;inset:0;z-index:1200;display:flex;flex-direction:column;justify-content:flex-end;background:rgba(0,0,0,.4)`,n.onclick=e=>{e.target===n&&Mi()},document.body.appendChild(n)),n.innerHTML=`
    <div id="td-sheet-panel" style="background:var(--pearl);border-radius:24px 24px 0 0;max-height:80vh;display:flex;flex-direction:column;padding-bottom:env(safe-area-inset-bottom,16px)">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 18px 14px;border-bottom:1px solid var(--hairline);flex-shrink:0">
        <div style="width:36px;height:4px;background:var(--hairline);border-radius:99px;position:absolute;top:10px;left:50%;transform:translateX(-50%)"></div>
        <div style="font-size:17px;font-weight:800;color:var(--ink);letter-spacing:-.015em">${g(e)}</div>
        <button onclick="_tdCloseSheet()" style="background:var(--paper);border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:15px;color:var(--muted);display:flex;align-items:center;justify-content:center">×</button>
      </div>
      <div style="overflow-y:auto;flex:1">${t}</div>
    </div>`,n.style.display=`flex`}function Mi(){let e=document.getElementById(`td-sheet-overlay`);e&&(e.style.display=`none`)}function Ni(e,t){let n=(s.routines||[]).find(t=>String(t.id)===String(e));if(!n)return;let r=_routineTodayKey();n.completions||(n.completions={}),n.completions[r]||(n.completions[r]=[]),n.completions[r]=n.completions[r].map(String);let i=String(t),a=n.completions[r].indexOf(i);a===-1?n.completions[r].push(i):n.completions[r].splice(a,1),window.saveData(s),Oi()}function Pi(){let e=[],t=new Date,n=window.getMonthData(window.selectedBudgetMonth),r=O(n.income)-O(n.expenses);r<0&&e.push({headline:`Spending is ahead of budget this month.`,detail:`You're $${Math.abs(r).toFixed(0)} over.`,action:`budget`}),(s.documents||[]).filter(e=>e.expiryDate).forEach(n=>{let r=Math.ceil((new Date(n.expiryDate)-t)/864e5);r>=0&&r<=30&&e.push({headline:`${n.name} expires in ${r} day${r===1?``:`s`}.`,detail:`Keep it updated.`,action:`documents`})}),e.length===0&&e.push({headline:`All clear. Nothing to flag.`,detail:`Check back later.`,action:null});let i=e.map(e=>`<div style="padding:16px 0;border-bottom:1px solid var(--hairline)">
    <div style="font-family:var(--serif);font-style:italic;font-size:17px;font-weight:400;margin-bottom:4px;color:var(--ink)">${g(e.headline)}</div>
    <div style="font-size:13px;color:var(--muted)">${g(e.detail)}</div>
    ${e.action?`<button onclick="activateTab('${e.action}');closeQuickAdd&&closeQuickAdd()" style="margin-top:10px;padding:7px 14px;border-radius:99px;background:var(--ink);color:var(--pearl);font-size:12px;font-weight:500;border:none;cursor:pointer">View →</button>`:``}
  </div>`).join(``);typeof window.openModal==`function`&&window.openModal(`💡 Insights`,`<div style="padding:0 4px">${i}</div>`,null)}var Fi=``,Ii=``;async function Li(e,t,n,r,i){let a=N(`toto_ai_key`);if(!a)return;let o=new Date().toISOString().slice(0,10);if(Fi===o&&Ii){let e=document.getElementById(`today-briefing-text`);e&&(e.textContent=Ii);return}let c=e.filter(e=>e.cls===`red`).map(e=>e.title),l=e.filter(e=>e.cls===`amber`).map(e=>e.title),u=`You are Toto, a friendly family personal assistant app. Write a 2-sentence daily briefing for the user based on this context:

${[`Budget: ${b(Math.abs(t))} ${t>=0?`surplus`:`over budget`}, ${n} days left in the month`,`Health score: ${i.total}/100 (${i.grade})`,c.length?`Urgent: ${c.join(`, `)}`:``,l.length?`Coming up: ${l.join(`, `)}`:``,r.d?`Dinner tonight: ${r.d}`:`No dinner planned`,`${(s.goals||[]).filter(e=>e.status!==`achieved`).length} active goals`].filter(Boolean).join(`. `)}

Rules:
- Warm, conversational, like a helpful friend
- Lead with the most important thing
- Mention dinner if planned
- Keep it under 40 words
- No emojis, no bullet points, just flowing text
- Don't start with "Here's" or "Today"`;try{let e=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":a,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:100,messages:[{role:`user`,content:u}]})});if(!e.ok)return;let t=(await e.json()).content[0].text.trim().replace(/^["']|["']$/g,``);Ii=t,Fi=o;let n=document.getElementById(`today-briefing-text`);n&&(n.textContent=t)}catch{}}function Ri(){let e=s,r=e.buildContract,i=(e.netWorth.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),a=(e.netWorth.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),o=i-a,c=e.netWorth.snapshots||[],l=``;if(c.length>=2){let e=o-c[c.length-2].netWorth;l=`<span class="${e>=0?`up`:`dn`}">${e>=0?`+`:``}${fmtNW(e)}</span> vs last snapshot`}let u=window.selectedBudgetMonth,d=window.getMonthData(u),f=O(d.income),p=O(d.expenses),m=f-p,h=(e.subscriptions||[]).reduce((e,t)=>e+subMonthlyAmount(t),0),_=(e.bills||[]).filter(e=>{let t=n(e);return t>=0&&t<=31}).reduce((e,t)=>e+(parseFloat(t.amount)||0),0),v=[...e.bills||[]].filter(e=>n(e)>=-1).sort((e,t)=>n(e)-n(t)).slice(0,5),y=(e.goals||[]).filter(e=>e.status!==`achieved`).slice(0,4),x=r.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),S=(r.variations||[]).filter(e=>e.status===`approved`).reduce((e,t)=>e+(t.amount||0),0),C=r.total+S,w=Math.round(x/C*100),T=r.stages.find(e=>!e.paid),ee=((e.kids||{}).completions||[]).filter(e=>e.status===`pending`).length+((e.kids||{}).redemptions||[]).filter(e=>e.status===`pending`).length,E=window.getLast6Months(),te=O(d.expenses),D=E.map(e=>{let t=Object.values(s.budget.actuals[e]||{}).reduce((e,t)=>e+t,0);return{label:window.monthShortLabel(e),budget:te,actual:t}}),k=te>0||D.some(e=>e.actual>0),A=window.calcFinancialHealth(),ne=251.3,re=(A.total/100*ne).toFixed(1),ie=A.dimensions.map(e=>{let t=Math.round(e.score/e.max*100),n=t>=75?`#10b981`:t>=50?`#f59e0b`:`#ef4444`;return`
      <div style="display:grid;grid-template-columns:130px 1fr 30px;align-items:center;gap:8px">
        <span style="font-size:12px;color:var(--text-muted);white-space:nowrap">${e.label}</span>
        <div style="height:6px;background:var(--border);border-radius:4px;overflow:hidden">
          <div style="height:100%;width:${t}%;background:${n};border-radius:4px;transition:width 0.4s"></div>
        </div>
        <span style="font-size:11px;font-weight:600;color:${n};text-align:right">${e.score}/${e.max}</span>
      </div>`}).join(``),j=`
    <div class="db-widget" style="margin:0 24px 20px">
      <div class="db-widget-header">
        <span class="db-widget-title">Financial Health Score</span>
      </div>
      <div style="display:grid;grid-template-columns:120px 1fr;gap:20px;align-items:center;padding:16px 20px 12px">
        <div style="text-align:center">
          <svg viewBox="0 0 100 100" width="110" height="110" style="display:block;margin:0 auto">
            <g transform="rotate(-90 50 50)">
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" stroke-width="10"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="${A.color}" stroke-width="10"
                stroke-dasharray="${re} ${ne}" stroke-linecap="round"/>
            </g>
            <text x="50" y="47" text-anchor="middle" font-size="24" font-weight="800" fill="${A.color}">${A.total}</text>
            <text x="50" y="63" text-anchor="middle" font-size="13" font-weight="600" fill="#94a3b8">Grade ${A.grade}</text>
          </svg>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">${ie}</div>
      </div>
      <div style="padding:0 20px 14px;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:10px;margin-top:4px">
        💡 ${A.insight}
      </div>
    </div>`,ae=``;if(k){let e=Math.max(...D.flatMap(e=>[e.budget,e.actual]),1),t=532/D.length,n=t*.28,r=t*.04;ae=`<div class="db-widget">
      <div class="db-widget-header">
        <span class="db-widget-title">Budget vs Actual — Last 6 Months</span>
        <div class="chart-legend" style="font-size:11px">
          <span><span class="legend-dot" style="background:#2563eb;opacity:0.65"></span>Budget</span>
          <span><span class="legend-dot" style="background:#10b981"></span>Under</span>
          <span><span class="legend-dot" style="background:#ef4444"></span>Over</span>
        </div>
      </div>
      <div style="padding:12px 16px 8px">
        <svg viewBox="0 0 600 180" style="width:100%;height:auto;display:block">${[0,.25,.5,.75,1].map(t=>{let n=150-t*140;return`<line x1="58" y1="${n}" x2="590" y2="${n}" stroke="#e2e8f0" stroke-width="1"/>
        <text x="53" y="${n+4}" text-anchor="end" font-size="9" fill="#94a3b8">${b(t*e)}</text>`}).join(``)}${D.map((i,a)=>{let o=58+a*t+t*.08,s=i.budget>0?i.budget/e*140:0,c=i.actual>0?i.actual/e*140:0,l=i.actual>i.budget?`#ef4444`:`#10b981`;return`<rect x="${o}" y="${150-s}" width="${n}" height="${s}" fill="#2563eb" opacity="0.65" rx="2"/>
        <rect x="${o+n+r}" y="${150-c}" width="${n}" height="${c}" fill="${l}" opacity="0.8" rx="2"/>
        <text x="${o+n+r/2+n/2}" y="166" text-anchor="middle" font-size="10" fill="#64748b">${i.label}</text>`}).join(``)}</svg>
      </div>
    </div>`}let oe=`
    <!-- Hero row: net worth + 4 stats -->
    <div class="db-hero-row">
      <div class="db-nw-card" onclick="activateTab('networth')" style="cursor:pointer">
        <div>
          <div class="db-nw-label">Net Worth</div>
          <div class="db-nw-amount">${fmtNW(o)}</div>
          ${l?`<div class="db-nw-change">${l}</div>`:``}
        </div>
        <div style="font-size:12px;opacity:0.6;margin-top:12px">${b(i)} assets · ${b(a)} liabilities</div>
      </div>
      <div class="db-stats-col">
        <div class="db-stat">
          <div class="db-stat-val ${m>=0?`green`:`red`}">${b(Math.abs(m))}</div>
          <div class="db-stat-lbl">Monthly ${m>=0?`surplus`:`deficit`}</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val teal">$${Math.round(_).toLocaleString()}</div>
          <div class="db-stat-lbl">Bills this month</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val">$${Math.round(h).toLocaleString()}</div>
          <div class="db-stat-lbl">Subscriptions/mo</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val">${b(f)}</div>
          <div class="db-stat-lbl">Monthly income</div>
        </div>
      </div>
    </div>

    <!-- This week strip -->
    <div class="db-widget" style="margin:0 24px 20px">
      <div class="db-widget-header">
        <span class="db-widget-title">This Week</span>
        <button class="db-widget-link" onclick="activateTab('planner')">Open planner →</button>
      </div>
      <div style="padding:12px 16px 14px">${renderWeeklyStrip()}</div>
    </div>

    <!-- Financial health score -->
    ${j}

    <!-- Two-column widgets -->
    <div class="db-grid">
      <div>
        <!-- Upcoming bills -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Upcoming Bills</span>
            <button class="db-widget-link" onclick="activateTab('bills')">View all →</button>
          </div>
          ${v.length?v.map(e=>{let r=n(e),i=r<0?`<span class="bill-due-badge overdue">Overdue</span>`:r===0?`<span class="bill-due-badge today">Today</span>`:r<=7?`<span class="bill-due-badge soon">${r}d</span>`:`<span class="bill-due-badge ok">${t(e).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}</span>`;return`<div class="db-bill-row">
              <div class="db-bill-icon">${billCatIcon(e.category)}</div>
              <div class="db-bill-name">${g(e.name)}</div>
              ${i}
              <div class="db-bill-amount">${b(parseFloat(e.amount)||0)}</div>
            </div>`}).join(``):`<div class="db-empty-row">No upcoming bills — <button class="db-widget-link" onclick="activateTab('bills')">add one</button></div>`}
        </div>

        <!-- Goals -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Goals</span>
            <button class="db-widget-link" onclick="activateTab('goals')">View all →</button>
          </div>
          ${y.length?y.map(e=>{let t=Math.min(Math.round((e.saved||0)/(e.target||1)*100),100);return`<div class="db-goal-row">
              <div class="db-goal-top">
                <span class="db-goal-name">${e.emoji||`🎯`} ${g(e.name)}</span>
                <span class="db-goal-pct">${b(e.saved||0)} of ${b(e.target||0)} · ${t}%</span>
              </div>
              <div class="db-goal-bar"><div class="db-goal-fill" style="width:${t}%"></div></div>
            </div>`}).join(``):`<div class="db-empty-row">No active goals — <button class="db-widget-link" onclick="activateTab('goals')">add one</button></div>`}
        </div>
      </div>

      <div>
        <!-- Budget this month -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Budget · ${window.monthLabel(u)}</span>
            <button class="db-widget-link" onclick="activateTab('budget')">Edit →</button>
          </div>
          <div class="db-budget-row">
            <span class="db-budget-label">Income</span>
            <span class="db-budget-val" style="color:#10b981">${b(f)}</span>
          </div>
          <div class="db-budget-row">
            <span class="db-budget-label">Expenses</span>
            <span class="db-budget-val" style="color:#ef4444">${b(p)}</span>
          </div>
          <div class="db-budget-row" style="border-top:2px solid var(--border)">
            <span class="db-budget-label" style="font-weight:700">${m>=0?`Surplus`:`Deficit`}</span>
            <span class="db-budget-val" style="color:${m>=0?`#10b981`:`#ef4444`}">${b(Math.abs(m))}</span>
          </div>
        </div>

        ${ee>0?`
        <!-- Kids pending approvals -->
        <div class="db-widget" style="border-color:#fde68a">
          <div class="db-widget-header" style="background:#fffbeb">
            <span class="db-widget-title">⭐ Kids Zone — ${ee} pending approval${ee===1?``:`s`}</span>
            <button class="db-widget-link" onclick="activateTab('kids')">Review →</button>
          </div>
        </div>`:``}

        <!-- Build contract -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Build Contract</span>
            <button class="db-widget-link" onclick="activateTab('build')">View →</button>
          </div>
          <div style="padding:14px 18px">
            <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px">
              <span style="font-weight:600">${b(x)} paid</span>
              <span style="color:#94a3b8">${w}% of ${b(C)}</span>
            </div>
            <div class="db-build-bar" style="margin:0 0 10px">
              <div class="db-build-fill" style="width:${w}%"></div>
            </div>
            ${T?`<div style="font-size:12px;color:#64748b">Next: <strong>${g(T.name)}</strong> — ${b(T.amount)}</div>`:`<div style="font-size:12px;color:#10b981;font-weight:600">✓ All stages paid</div>`}
          </div>
        </div>
      </div>
    </div>

    ${ae}
  `;document.getElementById(`dashboard-content`).innerHTML=oe}function zi(){function e(e){return e.replace(/[^a-z0-9]/gi,`_`)}function t(t,n,r,i){let a=`${t}_${e(n)}`;return`
      <div class="color-row">
        <div class="color-dot" id="dot-${a}" style="background:${i}"></div>
        <span>${r}</span>
        <input type="color" value="${i}"
          oninput="document.getElementById('dot-${a}').style.background=this.value"
          onchange="updateColor('${t}','${n}',this.value)">
      </div>`}let n=N(STORAGE_KEY),r=n?(n.length/1024).toFixed(1):0,i=n?`<span style="color:var(--success);font-weight:600">✓ Data found in device storage (${r} KB)</span>`:`<span style="color:var(--danger);font-weight:600">⚠ No data in device storage</span>`,a=s.activityLog||[];function o(e){let t=new Date(e);return t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})+` `+t.toLocaleTimeString(`en-AU`,{hour:`2-digit`,minute:`2-digit`})}function c(e){return e.photo?`<img src="${e.photo}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0" onerror="this.style.display='none'">`:`<div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${(e.name||`?`)[0].toUpperCase()}</div>`}let l={Added:`#10b981`,Edited:`#3b82f6`,Deleted:`#ef4444`,Updated:`#f59e0b`,Imported:`#8b5cf6`,Removed:`#ef4444`};function u(e){return l[e.split(` `)[0]]||`#94a3b8`}function d(e,t,n,r,i){let a=_settingsOpen.has(e);return`
      <div class="sacc-item">
        <div class="sacc-hdr" onclick="toggleSettingsSection('${e}')">
          <div style="flex:1;min-width:0">
            <div class="sacc-title">${t}</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
            ${i||``}
            <span class="sacc-chev" id="sacc-chev-${e}">${a?`▲`:`▼`}</span>
          </div>
        </div>
        <div class="sacc-body" id="sacc-body-${e}" style="display:${a?`block`:`none`}">
          ${n?`<div style="padding:12px 20px 0;font-size:12px;color:var(--text-muted)">${n}</div>`:``}
          ${r}
        </div>
      </div>`}let f={dog:`🐕`,cat:`🐈`,bird:`🐦`};new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`});let p=s.settings?.adultName||s.settings?.adults?.[0]?.name||`You`,m=s.settings?.email||``,h=`
    <div class="settings-profile" style="margin:0 0 8px">
      <div class="profile-avatar-lg">${p.charAt(0).toUpperCase()}</div>
      <div style="flex:1;min-width:0">
        <div class="profile-name">${g(p)}</div>
        ${m?`<div class="profile-email">${g(m)}</div>`:``}
        <div style="margin-top:6px"><span class="t-chip work" style="font-size:10px">Admin</span></div>
      </div>
      <button onclick="fbAuth&&fbAuth.signOut().then(()=>location.reload())" style="background:none;border:none;cursor:pointer;color:var(--muted);font-size:12px;font-weight:600;padding:0;white-space:nowrap">Sign out</button>
    </div>
    <div class="toto-sec-header" style="margin-top:6px"><span class="toto-sec-title">Settings</span></div>`+d(`ai`,`🤖 AI Assistant (Toto)`,`Powers cost estimation, Toto chat, and CSV import analysis`,`
      <div class="section-body">
        <div style="margin-bottom:8px;font-size:13px;font-weight:600">Anthropic API Key</div>
        <div style="display:flex;gap:8px;align-items:center;max-width:480px">
          <input type="password" class="form-input" id="settings-api-key" style="flex:1"
            placeholder="sk-ant-api03-..."
            value="${N(`toto_ai_key`)||``}">
          <button class="btn btn-primary" onclick="saveApiKey()">Save</button>
        </div>
        <p id="api-key-status" style="font-size:12px;color:var(--text-muted);margin-top:6px"></p>
        ${_renderApiKeySummary()}
      </div>`)+d(`prefs`,`Budget Preferences`,`Controls how month-to-month budget data is managed`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" id="pref-autofill" ${(s.settings||{}).autoFillMonths?`checked`:``}
            onchange="updateSetting('autoFillMonths', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Auto-fill new months from previous month</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">When you navigate forward to a month with no data, automatically copy all recurring items from the previous month.</p>
          </div>
        </label>
      </div>`)+d(`kids-prefs`,`👧 Kids & Routines`,`Daily reset time for routines and chores`,`
      <div class="section-body">
        <div style="margin-bottom:6px;font-size:13px;font-weight:600">Routine reset time</div>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Completed tasks reset each day at this time. Default is midnight (12:00 am).</p>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          ${[0,4,5,6].map(e=>{let t=e===0?`Midnight`:e===4?`4 am`:e===5?`5 am`:`6 am`,n=(s.settings?.routineResetHour??0)===e;return`<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;font-weight:${n?`700`:`500`};color:${n?`var(--primary)`:`var(--text)`}">
              <input type="radio" name="reset-hour" value="${e}" ${n?`checked`:``} style="accent-color:var(--primary)"
                onchange="state.settings.routineResetHour=${e};_markSettingsDirty();window.saveData(state);renderSettings()">
              ${t}
            </label>`}).join(``)}
        </div>
      </div>`)+d(`meals-prefs`,`Meal Preferences`,`Calorie tracking and meal display options`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(s.settings||{}).showCalories?`checked`:``}
            onchange="updateSetting('showCalories', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Show calorie estimates on meals</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">AI estimates calories for each meal. Shows per-meal calories and daily totals in the meal planner and lunchbox grids.</p>
          </div>
        </label>
      </div>`)+d(`typea`,`Type A Mode`,s.settings?.typeAMode?`Active — daily missions and life score`:`Off — turn on for guided organisation`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(s.settings||{}).typeAMode?`checked`:``}
            onchange="updateSetting('typeAMode', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Enable Type A Mode</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">Adds a Life Score, daily missions, and guided organisation to your Today screen. Toto takes the lead and tells you what to do next.</p>
          </div>
        </label>
        ${s.settings?.typeAMode?`
        <div style="margin-top:16px;padding:14px;background:var(--surface2);border-radius:10px">
          <div style="font-size:13px;font-weight:700;margin-bottom:8px">Current Life Score</div>
          <div style="font-size:28px;font-weight:900;color:#0891b2">${window.calcLifeScore().total}%</div>
          ${s.settings?.typeAStreak>0?`<div class="streak-badge" style="margin-top:8px">🔥 ${s.settings.typeAStreak} week streak</div>`:``}
        </div>`:``}
      </div>`)+d(`notif`,`Notification Style`,`Choose how Toto shows alerts on the Today screen`,`
      <div class="section-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px">
          ${[{val:`focus-timeline`,label:`Focus + Timeline`,desc:`One big card + chronological feed`},{val:`focus`,label:`Focus Card`,desc:`One urgent item at a time`},{val:`stack`,label:`Stack`,desc:`Card deck with count badge`},{val:`timeline`,label:`Timeline Only`,desc:`Chronological feed grouped by urgency`},{val:`banners`,label:`Banners`,desc:`Subtle alerts at the top`}].map(e=>`<label style="display:block;cursor:pointer;border:2px solid ${(s.settings?.notifStyle||`focus-timeline`)===e.val?`#0891b2`:`var(--border)`};border-radius:12px;padding:14px;background:${(s.settings?.notifStyle||`focus-timeline`)===e.val?`#ecfeff`:`var(--surface)`}">
            <input type="radio" name="notif-style" value="${e.val}" ${(s.settings?.notifStyle||`focus-timeline`)===e.val?`checked`:``} onchange="state.settings.notifStyle=this.value;_markSettingsDirty();renderSettings();renderToday()" style="display:none">
            <div style="font-size:13px;font-weight:700;margin-bottom:2px">${e.label}</div>
            <div style="font-size:11px;color:var(--text-muted)">${e.desc}</div>
          </label>`).join(``)}
        </div>
      </div>`)+d(`log`,`Activity Log`,`${a.length} recorded action${a.length===1?``:`s`} — synced across all devices`,`
      ${a.length===0?`<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No activity recorded yet. Changes you and your family make will appear here.</div>`:`<div style="max-height:400px;overflow-y:auto">
            ${a.slice(0,100).map(e=>`
              <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border)">
                ${c(e)}
                <div style="flex:1;min-width:0">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px">
                    <span style="font-weight:600;font-size:13px">${g(e.name)}</span>
                    <span style="display:inline-block;padding:2px 10px;border-radius:99px;font-size:11px;font-weight:600;color:#fff;background:${u(e.action)}">${g(e.action)}</span>
                    ${e.detail?`<span style="font-size:13px;color:var(--text)">${g(e.detail)}</span>`:``}
                  </div>
                  <div style="font-size:11px;color:var(--text-muted)">${o(e.ts)}</div>
                </div>
              </div>`).join(``)}
          </div>`}`,a.length>0?`<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();clearActivityLog()" style="color:var(--danger)">Clear log</button>`:``)+d(`data`,`Data &amp; Recovery`,i,`
      <div class="section-body">
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
          <button class="btn btn-secondary btn-sm" onclick="exportData()">Export JSON backup</button>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('import-file').click()">Import JSON backup</button>
          <input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)">
        </div>
        ${n?`<button class="btn btn-ghost btn-sm" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display?'':'none'">Show raw device storage data</button>
          <pre style="display:none;margin-top:8px;background:var(--surface2);padding:12px;border-radius:8px;font-size:11px;overflow:auto;max-height:200px;white-space:pre-wrap;word-break:break-all">${n.replace(/</g,`&lt;`)}</pre>`:``}
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
          <div style="font-size:13px;font-weight:600;color:var(--danger);margin-bottom:4px">Danger zone</div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Permanently deletes all household data from this device and the cloud. Cannot be undone.</div>
          <button class="btn btn-sm" style="background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;font-weight:600" onclick="resetAllData()">Reset all data…</button>
        </div>
      </div>`)+(()=>{let e=s.householdProfile.members||[],t=s.householdProfile.invites||[],n=s.householdProfile.authorizedUsers||[],r=f,i=e.map((r,i)=>{let a=r.role===`adult`,o=a&&i===0,c=r.emoji||(a?`🧑`:`🧒`),l=o?`Owner`:a?`Adult`:`Child`,u=o?`#fef9c3`:a?`#e0f2fe`:`#f0fdf4`,d=o?`#854d0e`:a?`#0369a1`:`#16a34a`,f=``;if(a){let a=e.slice(0,i).filter(e=>e.role===`adult`).length,s=!!r.pinHash,c=`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;margin-top:8px;background:${s?`#f0fdf4`:`var(--surface2)`};border-radius:8px;border:1px solid ${s?`#bbf7d0`:`var(--border)`}">
            <span style="font-size:16px">🔢</span>
            <div style="flex:1">
              <div style="font-size:12px;font-weight:600;color:${s?`#16a34a`:`var(--text)`}">Shared device PIN · ${s?`Set ✓`:`Not set`}</div>
              <div style="font-size:11px;color:var(--text-muted)">${s?`Required when signing in on a shared device`:`Optional — protects your profile on shared devices`}</div>
            </div>
            <button onclick="event.stopPropagation();setAdultPin(${a})" style="padding:6px 10px;border:1px solid ${s?`#bbf7d0`:`var(--border)`};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${s?`Change`:`Set PIN`}</button>
            ${s?`<button onclick="event.stopPropagation();clearAdultPin(${a})" style="padding:6px 10px;border:1px solid #fecaca;border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:#b91c1c;cursor:pointer">Remove</button>`:``}
          </div>`;if(o)f=`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
              <span style="font-size:16px">✅</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:#16a34a">Google login · Owner</div>
                <div style="font-size:11px;color:#64748b">Full access · Set up this household</div>
              </div>
            </div>`+c;else{let e=n.find(e=>e.name&&r.name&&e.name.toLowerCase().includes(r.name.toLowerCase().split(` `)[0])),a=t.find(e=>e.memberName===r.name&&e.status===`pending`&&new Date(e.expiresAt)>new Date),o=t.find(e=>e.memberName===r.name&&e.status===`accepted`);f=e||o?`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
                <span style="font-size:16px">✅</span>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:#16a34a">Google login · Member</div>
                  <div style="font-size:11px;color:#64748b">${g((e||{}).email||`Joined via invite`)}</div>
                </div>
              </div>`+c:a?`<div style="padding:10px 12px;background:#fef9c3;border-radius:8px;border:1px solid #fde68a">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:16px">⏳</span>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:#854d0e">Invite pending</div>
                    <div style="font-size:11px;color:#78350f">Expires ${new Date(a.expiresAt).toLocaleDateString()}${a.email?` · `+g(a.email):``}</div>
                  </div>
                </div>
                <div style="display:flex;gap:6px">
                  <button onclick="event.stopPropagation();window._copyInviteLinkForMember('${a.id}')" style="flex:1;padding:6px;border:1px solid #fde68a;border-radius:6px;background:#fff;font-size:11px;font-weight:600;color:#854d0e;cursor:pointer">📋 Copy link</button>
                  <button onclick="event.stopPropagation();window.revokeInvite('${a.id}')" style="padding:6px 10px;border:1px solid #fecaca;border-radius:6px;background:#fff;font-size:11px;font-weight:600;color:#ef4444;cursor:pointer">Revoke</button>
                </div>
              </div>`+c:`<div style="padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:16px">🔗</span>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:var(--text)">No app access yet</div>
                    <div style="font-size:11px;color:var(--text-muted)">Send an invite link so ${g(r.name||`this person`)} can join</div>
                  </div>
                </div>
                <button onclick="event.stopPropagation();window.inviteMember(${i})" class="btn btn-primary btn-sm" style="width:100%">Invite to join →</button>
              </div>`+c}}else{let e=(s.kids?.profiles||[]).find(e=>e.name&&r.name&&e.name.toLowerCase()===r.name.toLowerCase()),t=!!e?.pinHash,n=!!(r.name&&r.name.trim());f=e&&window._isPinHardLocked&&window._isPinHardLocked(e.id)?`<div style="padding:10px 12px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:16px">🔒</span>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:#b91c1c">PIN locked</div>
                  <div style="font-size:11px;color:#64748b">Too many failed attempts</div>
                </div>
              </div>
              <button onclick="event.stopPropagation();window.resetKidPinLock(${e.id})" style="width:100%;padding:7px;border:1px solid #fecaca;border-radius:6px;background:#fff;font-size:12px;font-weight:600;color:#b91c1c;cursor:pointer">Reset PIN lock</button>
            </div>`:n?e?`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:${t?`#f0fdf4`:`var(--surface2)`};border-radius:8px;border:1px solid ${t?`#bbf7d0`:`var(--border)`}">
              <span style="font-size:16px">🔢</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:${t?`#16a34a`:`var(--text)`}">PIN login · ${t?`Set up ✓`:`Not set up`}</div>
                <div style="font-size:11px;color:var(--text-muted)">${t?`PIN is active — tap to change it`:`Set a PIN so `+g(r.name)+` can log in`}</div>
              </div>
              <button onclick="event.stopPropagation();window.openPinSetup(${e.id})" style="padding:6px 10px;border:1px solid ${t?`#bbf7d0`:`var(--border)`};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${t?`Change`:`Set PIN`}</button>
            </div>`:`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:var(--text)">PIN login · Not set up</div>
                <div style="font-size:11px;color:var(--text-muted)">Save changes first, then set a PIN for ${g(r.name)}</div>
              </div>
              <button onclick="event.stopPropagation();window._ensureKidProfileAndPin('${_(r.name)}')" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">Set PIN</button>
            </div>`:`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="font-size:12px;color:var(--text-muted)">Enter a name above to enable PIN login</div>
            </div>`}return`
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)">
          <div style="display:flex;align-items:center;gap:12px;padding:14px 16px">
            <div style="width:42px;height:42px;border-radius:50%;background:${a?`linear-gradient(135deg,#ecfeff,#ccfbf1)`:`linear-gradient(135deg,#fef9c3,#fde68a)`};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${c}</div>
            <div style="flex:1;min-width:0">
              <input type="text" maxlength="50" class="form-input" style="font-weight:600;font-size:14px;width:100%;color:var(--text);padding:4px 8px;border-radius:6px"
                placeholder="Enter name…"
                value="${_(r.name||``)}"
                onchange="updateMember(${i},'name',this.value)">
              <div style="display:flex;align-items:center;gap:6px;margin-top:6px">
                <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:2px 7px;border-radius:99px;background:${u};color:${d};flex-shrink:0">${l}</span>
                <span style="font-size:12px;color:var(--text-muted);flex-shrink:0">·</span>
                <input type="number" class="form-input" style="width:52px;font-size:12px;padding:2px 6px;border-radius:6px"
                  placeholder="Age" min="0" max="120"
                  value="${r.age!==null&&r.age!==void 0?r.age:``}"
                  onchange="updateMember(${i},'age',this.value===''?null:parseInt(this.value))">
                <span style="font-size:12px;color:var(--text-muted);flex-shrink:0">yrs</span>
              </div>
            </div>
            <button onclick="removeHouseholdMember(${i})" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:18px;line-height:1;padding:4px;opacity:.6;flex-shrink:0" title="Remove from household">&times;</button>
          </div>
          <div style="padding:0 16px 14px">${f}</div>
        </div>`}).join(``),a=`
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <span style="font-weight:600;font-size:13px">Pets</span>
          <div style="display:flex;gap:6px">
            <button class="btn btn-ghost btn-sm" onclick="addPet('dog')">+ Dog</button>
            <button class="btn btn-ghost btn-sm" onclick="addPet('cat')">+ Cat</button>
            <button class="btn btn-ghost btn-sm" onclick="addPet('other')">+ Other</button>
          </div>
        </div>
        ${(s.householdProfile.pets||[]).length===0?`<p style="color:var(--text-muted);font-size:13px">No pets added.</p>`:``}
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
          ${(s.householdProfile.pets||[]).map((e,t)=>`<div style="display:flex;align-items:center;gap:12px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 14px">
              <span style="font-size:20px;width:28px;text-align:center">${r[e.type]||`🐾`}</span>
              <select class="form-select" style="width:110px" onchange="updatePet(${t},'type',this.value);renderSettings()">
                <option value="dog"${e.type===`dog`?` selected`:``}>Dog</option>
                <option value="cat"${e.type===`cat`?` selected`:``}>Cat</option>
                <option value="bird"${e.type===`bird`?` selected`:``}>Bird</option>
                <option value="other"${e.type===`other`?` selected`:``}>Other</option>
              </select>
              <input type="text" maxlength="200" class="form-input" style="flex:1;min-width:120px" placeholder="Name (optional)"
                value="${(e.name||``).replace(/"/g,`&quot;`)}"
                oninput="updatePet(${t},'name',this.value)">
              <button onclick="removePet(${t})" style="background:none;border:none;cursor:pointer;color:var(--danger);font-size:20px;line-height:1;padding:0 4px;opacity:0.7" title="Remove">&times;</button>
            </div>`).join(``)}
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:20px">🚗</span>
          <input type="number" class="form-input" style="width:90px" min="0" max="20"
            value="${s.householdProfile.cars||0}" onchange="updateCars(parseInt(this.value)||0)">
          <span style="color:var(--text-muted);font-size:13px">vehicle(s) registered to this household</span>
        </div>`;return d(`household`,`🏠 Household`,`People, pets, and access for everyone in your home`,`
        <div class="section-body">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <span style="font-weight:600;font-size:13px">Members</span>
            <div style="display:flex;gap:6px">
              <button class="btn btn-ghost btn-sm" onclick="addHouseholdMember('adult')">+ Adult</button>
              <button class="btn btn-ghost btn-sm" onclick="addHouseholdMember('child')">+ Child</button>
            </div>
          </div>
          ${e.length===0?`<p style="color:var(--text-muted);font-size:13px;margin-bottom:16px">No members yet.</p>`:``}
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
            ${i}
          </div>
          <div style="border-top:1px solid var(--border);padding-top:20px;margin-top:4px">
            ${a}
          </div>
        </div>`)})()+d(`cats`,`Expense &amp; Income Categories`,`Manage categories available in dropdowns`,`
      <div class="section-body">
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Expense Categories</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
          ${expenseCategories().map(e=>`
            <span style="display:inline-flex;align-items:center;gap:6px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:5px 10px 5px 12px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:${colors.expense[e]||`#94a3b8`};flex-shrink:0"></span>
              ${e}
              <button onclick="removeCategory('expense','${e.replace(/'/g,`\\'`)}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:16px;line-height:1;padding:0 2px" title="Remove">&times;</button>
            </span>`).join(``)}
        </div>
        <div style="display:flex;gap:8px;max-width:420px;margin-bottom:24px">
          <input id="new-cat-expense" type="text" maxlength="200" class="form-input" placeholder="New expense category…" onkeydown="if(event.key==='Enter')addCategory('expense')" style="flex:1">
          <button class="btn btn-primary btn-sm" onclick="addCategory('expense')">Add</button>
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Income Categories</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
          ${incomeCategories().map(e=>`
            <span style="display:inline-flex;align-items:center;gap:6px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:5px 10px 5px 12px;font-size:13px">
              ${e}
              <button onclick="removeCategory('income','${e.replace(/'/g,`\\'`)}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:16px;line-height:1;padding:0 2px" title="Remove">&times;</button>
            </span>`).join(``)}
        </div>
        <div style="display:flex;gap:8px;max-width:420px">
          <input id="new-cat-income" type="text" maxlength="200" class="form-input" placeholder="New income category…" onkeydown="if(event.key==='Enter')addCategory('income')" style="flex:1">
          <button class="btn btn-primary btn-sm" onclick="addCategory('income')">Add</button>
        </div>
      </div>`)+d(`groups`,`Expense Category Groups`,`Group categories for the grouped budget view`,`
      <div class="section-body">
        ${(s.categoryGroups||[]).map(e=>`
          <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px 14px;margin-bottom:10px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <button id="grp-icon-btn-${e.id}" type="button" onclick="openIconPickerForGroup(${e.id})" style="width:52px;height:40px;font-size:22px;border:1px solid var(--border);border-radius:6px;background:var(--surface);cursor:pointer" title="Choose icon">${e.icon}</button>
              <input type="text" maxlength="200" class="form-input" style="flex:1;font-weight:600" value="${e.name.replace(/"/g,`&quot;`)}"
                onchange="updateCategoryGroup(${e.id},'name',this.value)">
              <button class="btn btn-danger-ghost btn-sm" onclick="deleteCategoryGroup(${e.id})">Delete</button>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
              ${e.categories.map(t=>`
                <span style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:4px 10px 4px 12px;font-size:13px">
                  ${t}
                  <button onclick="removeCatFromGroup(${e.id},'${t.replace(/'/g,`\\'`)}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:15px;line-height:1;padding:0 2px">&times;</button>
                </span>`).join(``)}
              ${e.categories.length===0?`<span style="font-size:13px;color:var(--text-muted);font-style:italic">No categories assigned</span>`:``}
            </div>
            <button class="btn btn-ghost btn-sm" onclick="openAddCatToGroup(${e.id})" style="font-size:12px">+ Add Category</button>
          </div>`).join(``)}
        ${(s.categoryGroups||[]).length===0?`<p style="color:var(--text-muted);font-size:13px">No groups yet.</p>`:``}
      </div>`,`<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openAddCategoryGroup()">+ Group</button>`)+d(`colours`,`Colours`,`Customise category and section colour accents`,`
      <div class="section-body">
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Expense Category Colours</div>
        <div class="color-grid" style="margin-bottom:24px">
          ${expenseCategories().map(e=>t(`expense`,e,e,colors.expense[e]||DEFAULT_COLORS.expense[e]||`#94a3b8`)).join(``)}
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Income Colour</div>
        <div class="color-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,220px));margin-bottom:24px">
          ${t(`income`,`income`,`Income`,colors.income)}
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Build Cost Colours</div>
        <div class="color-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,220px))">
          ${t(`build`,`contract`,`Fixed Price Contract`,colors.build.contract)}
          ${t(`build`,`extras`,`Outside Contract`,colors.build.extras)}
          ${t(`build`,`furniture`,`Furniture`,colors.build.furniture)}
          ${t(`build`,`appliances`,`Appliances`,colors.build.appliances)}
        </div>
      </div>`);h+=d(`setup-checklist`,`✅ Setup Checklist`,`The setup progress card shown on your dashboard`,`<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Show on dashboard</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${s.setupProgressDismissed?`Currently hidden`:`Currently visible`}</div>
        </div>
        <button onclick="event.stopPropagation();state.setupProgressDismissed=${!s.setupProgressDismissed};window.saveData(state);window._refreshSetupProgress();renderSettings()" class="btn btn-secondary btn-sm">
          ${s.setupProgressDismissed?`Show again`:`Hide`}
        </button>
      </div>
    </div>`);let v=window.getDeviceProfile(),y=s.kids?.profiles||[],b=v?v===`adult`?`Adult — opens straight to the full app`:v===`shared`?`Shared — shows profile picker on open`:(y.find(e=>e.id===v)?.name||`Unknown`)+` — kid device`:`Not configured`;h+=d(`this-device`,`📱 This Device`,`Assigned to: ${b}`,`<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Assigned to</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${g(b)}</div>
        </div>
        <button onclick="event.stopPropagation();window.showDeviceSetup()" class="btn btn-secondary btn-sm">Change</button>
      </div>
    </div>`),h+=`<div style="margin-top:24px;padding:16px;border:2px dashed #f59e0b;border-radius:12px;background:#fffbeb">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#92400e;margin-bottom:12px">⚠️ Dev Tools — Remove before release</div>
    <button onclick="window.showProfileSelector()" class="btn btn-secondary" style="width:100%">🔄 Open profile switcher (shared device)</button>
  </div>`,h+=`<div class="settings-save-bar" id="settings-save-bar" style="display:${_settingsDirty?`flex`:`none`}">
    <div class="unsaved-dot"></div>
    <div class="unsaved-text">Unsaved changes</div>
    <button class="btn" onclick="cancelSettingsChanges()">Cancel</button>
    <button class="btn btn-primary" id="settings-save-btn" onclick="saveSettingsChanges()">Save</button>
  </div>`,document.getElementById(`settings-content`).innerHTML=h}function Bi(){if(confirm(`This will permanently delete ALL household data — budget, kids, goals, everything — from this device and the cloud.

This cannot be undone. Are you sure?`)&&confirm(`Last chance. All data will be gone. Continue?`)){if(window._currentUser&&fbStore){let e=window._getHouseholdDocRef();e&&e.delete().catch(()=>{})}Ze(STORAGE_KEY),window._secureClear(HOUSEHOLD_OWNER_KEY),window._fsUnsubscribe&&(window._fsUnsubscribe(),window._fsUnsubscribe=null),fbAuth.signOut().then(()=>{window.location.reload()})}}function Vi(){let e=new Blob([JSON.stringify(s,null,2)],{type:`application/json`}),t=document.createElement(`a`);t.href=URL.createObjectURL(e),t.download=`home-budget-backup-${new Date().toISOString().slice(0,10)}.json`,t.click(),URL.revokeObjectURL(t.href)}function Hi(e){let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target.result);if(!t.budget){alert(`Invalid backup file — missing budget data.`);return}if(!confirm(`This will replace ALL current data with the backup. Continue?`))return;Xe(STORAGE_KEY,JSON.stringify(t)),location.reload()}catch(e){alert(`Failed to read backup file: `+e.message)}},n.readAsText(t)}function Ui(e){let t=document.getElementById(`grp-body-${e}`),n=document.getElementById(`grp-arrow-${e}`);if(!t)return;let r=t.style.display!==`none`;t.style.display=r?`none`:`block`,n&&(n.textContent=r?`▼`:`▲`)}function Wi(e){window.budgetViewMode=e,renderBudget()}function Gi(){let e=s.buildContract,t=e.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0);e.total-t;let n=e.stages.filter(e=>e.paid).length,r=e.stages.length,i=e.variations||[],a=i.filter(e=>e.status===`approved`).reduce((e,t)=>e+(t.amount||0),0),o=i.filter(e=>e.status===`pending`).reduce((e,t)=>e+(t.amount||0),0),c=e.total+a,l=`
    <div class="section" style="border-left:4px solid ${colors.build.contract}">
      <div class="section-header">
        <div>
          <div class="section-title">Fixed Price Contract</div>
          <div class="section-subtitle">${n} of ${r} stages paid · ${Math.round(t/e.total*100)}% of original contract</div>
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
          <div style="font-size:18px;font-weight:700">${b(e.total)}</div>
        </div>
        ${a===0?``:`
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Approved Variations</div>
          <div style="font-size:18px;font-weight:700;color:${a>0?`var(--danger)`:`var(--success)`}">${a>0?`+`:``}${b(a)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Revised Total</div>
          <div style="font-size:18px;font-weight:700;color:var(--primary)">${b(c)}</div>
        </div>`}
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Paid to Date</div>
          <div style="font-size:18px;font-weight:700;color:var(--success)">${b(t)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Remaining</div>
          <div style="font-size:18px;font-weight:700;color:var(--danger)">${b(c-t)}</div>
        </div>
        ${o>0?`
        <div style="background:#fffbeb;padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#92400e;margin-bottom:4px">Pending Variations</div>
          <div style="font-size:18px;font-weight:700;color:#d97706">+${b(o)}</div>
        </div>`:``}
      </div>

      <!-- Visual stage timeline -->
      <div style="padding:16px 20px;border-bottom:1px solid var(--border)">
        <div style="display:flex;gap:0;position:relative">
          ${e.stages.map((t,n)=>{let r=(t.amount/e.total*100).toFixed(0),i=!t.paid&&e.stages.slice(0,n).every(e=>e.paid),a=t.paid?`#dcfce7`:i?`#dbeafe`:`var(--surface2)`,o=t.paid?`#16a34a`:i?`var(--primary)`:`var(--border)`,s=t.paid?`#15803d`:i?`var(--primary)`:`var(--text-muted)`,c=t.paid?`✓`:i?`→`:`${n+1}`,l=t.paid&&t.paidDate?C(t.paidDate):t.expectedDate?`Exp. `+C(t.expectedDate):``,u=!t.paid&&t.expectedDate&&isOverdue(t.expectedDate);return`
            <div style="flex:1;min-width:0;border:1px solid ${u?`var(--danger)`:o};border-radius:8px;padding:10px 10px 8px;margin-right:${n<e.stages.length-1?`6px`:`0`};background:${u?`#fef2f2`:a};cursor:pointer;position:relative" onclick="openEditStage(${t.id})" title="Edit ${_(t.name)}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
                <span style="font-size:11px;font-weight:700;color:${u?`var(--danger)`:s};width:20px;height:20px;border-radius:50%;background:${t.paid?`#16a34a`:i?`var(--primary)`:`#94a3b8`};color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">${c}</span>
                <span style="font-size:11px;color:${u?`var(--danger)`:`var(--text-muted)`};font-weight:600">${r}%</span>
              </div>
              <div style="font-size:12px;font-weight:600;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px">${g(t.name)}</div>
              <div style="font-size:12px;font-weight:700;color:${t.paid?`#15803d`:`var(--text)`}">${b(t.amount)}</div>
              ${l?`<div style="font-size:10px;color:${u?`var(--danger)`:`var(--text-muted)`};margin-top:2px">${u?`⚠ `:``}${l}</div>`:``}
            </div>`}).join(``)}
        </div>
        <div class="progress-bar" style="height:8px;margin-top:12px;border-radius:4px">
          <div class="progress-fill green" style="width:${Math.min(100,Math.round(t/e.total*100))}%;border-radius:4px"></div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>Stage</th><th>Amount</th><th>% of Contract</th><th>Status</th><th>Funding</th><th>Expected</th><th>Paid Date</th><th>Invoice Ref</th><th></th></tr></thead>
          <tbody>
            ${e.stages.map(t=>{let n=(t.amount/e.total*100).toFixed(1),r=!t.paid&&t.expectedDate&&isOverdue(t.expectedDate),i=t.paid?`<span class="badge paid">Paid</span>`:r?`<span class="badge overdue">Overdue</span>`:`<span class="badge unpaid">Upcoming</span>`;return`<tr>
                <td style="font-weight:500">${g(t.name)}</td>
                <td class="amount">${b(t.amount)}</td>
                <td style="color:var(--text-muted)">${n}%</td>
                <td>${i}</td>
                <td>${fundingBadge(t.funding||`loan`)}</td>
                <td>${t.expectedDate?C(t.expectedDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                <td>${C(t.paidDate)}</td>
                <td style="color:var(--text-muted)">${g(t.invoiceRef||`—`)}</td>
                <td class="actions">
                  ${attachBtn(`stage-${t.id}`,_(t.name))}
                  <button class="btn btn-ghost btn-sm" onclick="openEditStage(${t.id})">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="deleteStage(${t.id})">🗑</button>
                </td>
              </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `,u={pending:`<span class="badge" style="background:#fef9c3;color:#854d0e;border:1px solid #fde047">Pending</span>`,approved:`<span class="badge paid">Approved</span>`,rejected:`<span class="badge" style="background:#fee2e2;color:#991b1b">Rejected</span>`};l+=`
    <div class="section" style="border-left:4px solid #8b5cf6">
      <div class="section-header">
        <div>
          <div class="section-title">Contract Variations</div>
          <div class="section-subtitle">
            ${i.length===0?`No variations yet`:`${i.filter(e=>e.status===`approved`).length} approved · ${i.filter(e=>e.status===`pending`).length} pending · ${a>=0?`+`:``}${b(a)} net impact`}
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddVariation()">+ Variation</button>
      </div>
      ${i.length===0?`<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No variations raised yet. Builder-initiated or owner-requested changes to the contract will appear here.</div>`:`<div class="table-wrap">
            <table>
              <thead><tr><th>Ref</th><th>Description</th><th>Amount</th><th>Status</th><th>Funding</th><th>Raised</th><th>Approved</th><th>Notes</th><th></th></tr></thead>
              <tbody>
                ${i.map(e=>`<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${g(e.ref||`—`)}</td>
                  <td style="font-weight:500">${g(e.name)}</td>
                  <td class="amount" style="color:${(e.amount||0)<0?`var(--success)`:`var(--danger)`};font-weight:600">${e.amount>0?`+`:``}${b(e.amount)}</td>
                  <td>${u[e.status]||u.pending}</td>
                  <td>${fundingBadge(e.funding||`loan`)}</td>
                  <td>${C(e.dateRaised)}</td>
                  <td>${C(e.dateApproved)}</td>
                  <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g(e.notes||`—`)}</td>
                  <td class="actions">
                    <button class="btn btn-ghost btn-sm" onclick="openEditVariation(${e.id})">✏️</button>
                    <button class="btn btn-danger-ghost btn-sm" onclick="deleteVariation(${e.id})">🗑</button>
                  </td>
                </tr>`).join(``)}
              </tbody>
              <tfoot>
                <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                  <td colspan="2" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Net approved variations</td>
                  <td class="amount" style="padding:11px 16px;font-weight:700;color:${a>=0?`var(--danger)`:`var(--success)`}">${a>0?`+`:``}${b(a)}</td>
                  <td colspan="6" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">Revised contract: <strong>${b(c)}</strong>${o>0?` · <span style="color:#d97706">+${b(o)} pending</span>`:``}</td>
                </tr>
              </tfoot>
            </table>
          </div>`}
    </div>
  `;let d=s.extras,f=d.reduce((e,t)=>e+(t.totalAmount||0),0),p=d.reduce((e,t)=>e+(t.amountPaid||0),0);l+=`
    <div class="section" style="border-left:4px solid ${colors.build.extras}">
      <div class="section-header">
        <div>
          <div class="section-title">Outside Contract</div>
          <div class="section-subtitle">Landscaping, solar, and other extras</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          ${f>0?`<span class="contract-total-badge">${b(p)} / ${b(f)}</span>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddExtra()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Vendor</th><th>Total Cost</th><th>Paid</th><th>Remaining</th><th>Due Date</th><th>Status</th><th>Funding</th><th></th></tr></thead>
          <tbody>
            ${d.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>No items yet. Add landscaping, solar, or other extras.</div></td></tr>`:d.map(e=>{let t=(e.totalAmount||0)-(e.amountPaid||0),n={"not-quoted":`<span class="badge unpaid">Not Quoted</span>`,quoted:`<span class="badge pending">Quoted</span>`,approved:`<span class="badge" style="background:#ede9fe;color:#5b21b6">Approved</span>`,partial:`<span class="badge partial">Partially Paid</span>`,paid:`<span class="badge paid">Paid</span>`},r=e.dueDate&&isOverdue(e.dueDate)&&e.status!==`paid`,i=n[e.status||`not-quoted`]+(r?` <span class="badge overdue">Overdue</span>`:``);return`<tr>
                <td style="font-weight:500">${g(e.name)}</td>
                <td>${e.vendor?g(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                <td class="amount">${e.totalAmount?b(e.totalAmount):`<span class="amount muted">TBC</span>`}</td>
                <td class="amount">${b(e.amountPaid)}</td>
                <td class="amount ${t>0?``:`muted`}">${t>0?b(t):`—`}</td>
                <td>${C(e.dueDate)}</td>
                <td>${i}</td>
                <td>${fundingBadge(e.funding||`loan`)}</td>
                <td class="actions">
                  ${attachBtn(`extra-${e.id}`,_(e.name))}
                  <button class="btn btn-ghost btn-sm" onclick="openEditExtra(${e.id})">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="deleteExtra(${e.id})">🗑</button>
                </td>
              </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `;let m=s.furniture,h=m.reduce((e,t)=>e+(t.price||0),0),v=m.filter(e=>e.status===`delivered`||e.status===`ordered`),y=m.filter(e=>e.status===`to-purchase`),x=v.reduce((e,t)=>e+(t.price||0),0),S=y.reduce((e,t)=>e+(t.price||0),0);l+=`
    <div class="section" style="border-left:4px solid ${colors.build.furniture}">
      <div class="section-header">
        <div>
          <div class="section-title">Furniture</div>
          <div class="section-subtitle">${m.length} items · ${b(x)} purchased · ${b(S)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${m.length>0?`
          <div style="display:flex;gap:6px">
            <span class="badge paid">${m.filter(e=>e.status===`delivered`).length} delivered</span>
            <span class="badge partial">${m.filter(e=>e.status===`ordered`).length} ordered</span>
            <span class="badge unpaid">${y.length} to buy</span>
          </div>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddFurniture()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${m.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">🛋️</div>No furniture items yet. Add sofas, beds, appliances and more.</div></td></tr>`:m.map(e=>{let t={"to-purchase":`<span class="badge unpaid">To Purchase</span>`,ordered:`<span class="badge partial">Ordered</span>`,delivered:`<span class="badge paid">Delivered</span>`},n=e.deliveryDate&&e.status!==`delivered`&&isOverdue(e.deliveryDate);return`<tr>
                    <td style="font-weight:500">${g(e.name)}</td>
                    <td style="color:var(--text-muted)">${g(e.room||`—`)}</td>
                    <td>${e.vendor?g(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td class="amount">${e.price?b(e.price):`<span class="amount muted">TBC</span>`}</td>
                    <td>${t[e.status]||t[`to-purchase`]}</td>
                    <td>${fundingBadge(e.funding||`own-funds`)}</td>
                    <td>${e.deliveryDate?n?`<span class="badge overdue">${C(e.deliveryDate)}</span>`:C(e.deliveryDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g(e.notes||`—`)}</td>
                    <td class="actions">
                      ${attachBtn(`furniture-${e.id}`,_(e.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditFurniture(${e.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteFurniture(${e.id})">🗑</button>
                    </td>
                  </tr>`}).join(``)}
          </tbody>
          ${m.length>0?`
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${b(h)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${b(x)} purchased · ${b(S)} still to buy
              </td>
            </tr>
          </tfoot>`:``}
        </table>
      </div>
    </div>
  `;let w=s.appliances,T=w.reduce((e,t)=>e+(t.price||0),0),ee=w.filter(e=>e.status===`delivered`||e.status===`ordered`),E=w.filter(e=>e.status===`to-purchase`),te=ee.reduce((e,t)=>e+(t.price||0),0),D=E.reduce((e,t)=>e+(t.price||0),0);l+=`
    <div class="section" style="border-left:4px solid ${colors.build.appliances}">
      <div class="section-header">
        <div>
          <div class="section-title">Appliances</div>
          <div class="section-subtitle">${w.length} items · ${b(te)} purchased · ${b(D)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${w.length>0?`
          <div style="display:flex;gap:6px">
            <span class="badge paid">${w.filter(e=>e.status===`delivered`).length} delivered</span>
            <span class="badge partial">${w.filter(e=>e.status===`ordered`).length} ordered</span>
            <span class="badge unpaid">${E.length} to buy</span>
          </div>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddAppliance()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${w.length===0?`<tr><td colspan="9"><div class="empty"><div class="empty-icon">🍳</div>No appliances yet. Add fridges, dishwashers, ovens and more.</div></td></tr>`:w.map(e=>{let t={"to-purchase":`<span class="badge unpaid">To Purchase</span>`,ordered:`<span class="badge partial">Ordered</span>`,delivered:`<span class="badge paid">Delivered</span>`},n=e.deliveryDate&&e.status!==`delivered`&&isOverdue(e.deliveryDate);return`<tr>
                    <td style="font-weight:500">${g(e.name)}</td>
                    <td style="color:var(--text-muted)">${g(e.room||`—`)}</td>
                    <td>${e.vendor?g(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td class="amount">${e.price?b(e.price):`<span class="amount muted">TBC</span>`}</td>
                    <td>${t[e.status]||t[`to-purchase`]}</td>
                    <td>${fundingBadge(e.funding||`own-funds`)}</td>
                    <td>${e.deliveryDate?n?`<span class="badge overdue">${C(e.deliveryDate)}</span>`:C(e.deliveryDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g(e.notes||`—`)}</td>
                    <td class="actions">
                      ${attachBtn(`appliance-${e.id}`,_(e.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditAppliance(${e.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteAppliance(${e.id})">🗑</button>
                    </td>
                  </tr>`}).join(``)}
          </tbody>
          ${w.length>0?`
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${b(T)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${b(te)} purchased · ${b(D)} still to buy
              </td>
            </tr>
          </tfoot>`:``}
        </table>
      </div>
    </div>
  `,document.getElementById(`build-content`).innerHTML=l}function Ki(){return s.expenseCategories||DEFAULT_DATA.expenseCategories}function qi(){return s.incomeCategories||DEFAULT_DATA.incomeCategories}function Ji(e){if(e.type===`spending`){let t=Object.keys(s.budget.actuals).sort().reverse(),n=null;for(let r of t){let t=(window.getMonthData(r).expenses||[]).filter(t=>(t.category||`Other`)===e.category).reduce((e,t)=>e+(s.budget.actuals[r]?.[t.id]||0),0);if(t>0){n=t;break}}let r=e.targetMonthly||0;if(n===null)return{pct:null,label:`No actuals yet`,actual:null,target:r};let i=r>0?Math.max(0,Math.min(100,n/r*100)):0,a=n<=r;return{pct:i,label:`${b(n)} actual vs ${b(r)} limit`,actual:n,target:r,ok:a}}if(e.type===`savings`){let t=e.currentSaved||0,n=e.targetTotal||1;return{pct:Math.min(100,t/n*100),label:`${b(t)} of ${b(n)} saved`,ok:t>=n}}if(e.type===`income`){let t=monthlyTotal(window.getMonthData(window.selectedBudgetMonth).income),n=e.targetMonthly||1;return{pct:Math.min(100,t/n*100),label:`${b(t)}/mo of ${b(n)}/mo target`,ok:t>=n}}return{pct:0,label:``,ok:!1}}function Yi(){let e=s.goals,t=e.filter(e=>e.status===`active`),n=e.filter(e=>e.status===`achieved`),r=``;e.length>0&&(r+=`
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:24px">
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700;color:var(--primary)">${t.length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Active goals</div>
        </div>
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700;color:var(--success)">${n.length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Achieved</div>
        </div>
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700">${e.filter(e=>e.type===`spending`&&e.status===`active`).length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Spending limits</div>
        </div>
        <div class="section" style="padding:16px 20px;margin-bottom:0">
          <div style="font-size:24px;font-weight:700">${e.filter(e=>e.type===`savings`&&e.status===`active`).length}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Savings targets</div>
        </div>
      </div>`);let i=[...e.filter(e=>e.status===`active`),...e.filter(e=>e.status===`achieved`),...e.filter(e=>e.status===`abandoned`)];if(r+=`<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary" onclick="openAddGoal()">+ New Goal</button>
  </div>`,i.length===0){let e=window.getMonthData(window.selectedBudgetMonth),t=O(e.income)-O(e.expenses),n=t>0?`<div style="font-size:14px;color:#64748b;margin-bottom:4px">You have <strong style="color:#16a34a">${b(t)}</strong> surplus each month.</div>
         <div style="font-size:13px;color:#64748b;margin-bottom:20px">Put it to work — set a goal and watch your progress.</div>`:`<div style="font-size:13px;color:#64748b;margin-bottom:20px">Set a goal and start working towards it.</div>`,i=[{emoji:`🏖️`,label:`Holiday fund`},{emoji:`🏠`,label:`Renovation`},{emoji:`🆘`,label:`Emergency fund`}].map(e=>`<button onclick="openAddGoal()" style="padding:8px 14px;background:#ecfeff;border:1.5px solid #0891b2;border-radius:99px;font-size:12px;font-weight:600;color:#0891b2;cursor:pointer">${e.emoji} ${e.label}</button>`).join(``);r+=`
      <div style="background:#fff;border:2px dashed #cbd5e1;border-radius:16px;padding:36px 24px;text-align:center;margin-top:8px">
        <div style="font-size:44px;margin-bottom:14px">🎯</div>
        <div style="font-size:17px;font-weight:700;color:#1e293b;margin-bottom:8px">No goals yet</div>
        ${n}
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px">
          ${i}
          <button onclick="openAddGoal()" style="padding:8px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:99px;font-size:12px;color:#64748b;cursor:pointer">+ Custom goal</button>
        </div>
        <button onclick="openAddGoal()" style="background:#0891b2;color:#fff;border:none;border-radius:10px;padding:12px 28px;font-size:14px;font-weight:600;cursor:pointer">Add my first goal →</button>
      </div>`}else i.forEach(e=>{let t=GOAL_TYPES.find(t=>t.value===e.type)||GOAL_TYPES[0],n=goalProgress(e),i={active:`<span class="badge" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe">Active</span>`,achieved:`<span class="badge paid">Achieved</span>`,abandoned:`<span class="badge" style="background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0">Abandoned</span>`}[e.status]||``,a=e.deadline?(()=>{let[t,n,r]=e.deadline.split(`-`),i=Math.ceil((new Date(e.deadline)-new Date)/864e5),a=`${r}/${n}/${t}`;return i<0?`<span style="color:var(--danger)">${a} (overdue)</span>`:i<=30?`<span style="color:var(--warning,#f59e0b)">${a} (${i}d left)</span>`:a})():`—`,o=``;if(n.pct!==null){let t=e.type===`spending`?n.ok?`var(--success)`:`var(--danger)`:`var(--primary)`,r=e.type===`spending`?n.ok?`✓ Under limit`:`${Math.round(n.pct)}% of limit`:`${Math.round(n.pct)}%`;o=`
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${Math.min(100,n.pct)}%;background:${t}"></div>
          </div>
          <div class="progress-label">
            <span>${n.label}</span>
            <span style="font-weight:600;color:${t}">${r}</span>
          </div>`}else o=`<div style="font-size:12px;color:var(--text-muted);margin-top:8px">No actuals recorded yet</div>`;r+=`
        <div class="goal-card" style="opacity:${e.status===`abandoned`?`0.6`:`1`}">
          <div class="goal-card-header">
            <div>
              <div class="goal-card-title">${t.icon} ${g(e.name)}</div>
              <div class="goal-card-meta">
                ${t.label}${e.category?` · ${e.category}`:``} · Target date: ${a}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
              ${i}
              ${e.status===`active`?`<button class="btn btn-ghost btn-sm" title="Mark achieved" onclick="markGoalAchieved(${e.id})">✓</button>`:``}
              <button class="btn btn-ghost btn-sm" onclick="openEditGoal(${e.id})">✏️</button>
              <button class="btn btn-danger-ghost btn-sm" onclick="deleteGoal(${e.id})">🗑</button>
            </div>
          </div>
          ${o}
          ${e.notes?`<div style="font-size:12px;color:var(--text-muted);margin-top:8px">${g(e.notes)}</div>`:``}
        </div>`});document.getElementById(`goals-content`).innerHTML=r}function Xi(e={}){let t=e.type||`spending`;return`
    <div class="form-group">
      <label class="form-label">Goal Name</label>
      <input class="form-input" id="f-goal-name" type="text" maxlength="200" value="${_(e.name||``)}" placeholder="e.g. Cut dining out">
    </div>
    <div class="form-group">
      <label class="form-label">Type</label>
      <select class="form-select" id="f-goal-type" onchange="toggleGoalFields()">
        ${GOAL_TYPES.map(e=>`<option value="${e.value}" ${t===e.value?`selected`:``}>${e.icon} ${e.label}</option>`).join(``)}
      </select>
    </div>
    <div id="goal-spending-fields" style="display:${t===`spending`?``:`none`}">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Expense Category</label>
          <select class="form-select" id="f-goal-category">
            ${expenseCategories().map(t=>`<option value="${t}" ${e.category===t?`selected`:``}>${t}</option>`).join(``)}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Monthly Limit (AUD)</label>
          <input class="form-input" id="f-goal-target-monthly" type="number" max="99999999" min="0" value="${e.targetMonthly||``}" placeholder="e.g. 300">
        </div>
      </div>
    </div>
    <div id="goal-savings-fields" style="display:${t===`savings`?``:`none`}">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Target Amount (AUD)</label>
          <input class="form-input" id="f-goal-target-total" type="number" max="99999999" min="0" value="${e.targetTotal||``}" placeholder="e.g. 50000">
        </div>
        <div class="form-group">
          <label class="form-label">Currently Saved (AUD)</label>
          <input class="form-input" id="f-goal-current-saved" type="number" max="99999999" min="0" value="${e.currentSaved||``}" placeholder="0">
        </div>
      </div>
    </div>
    <div id="goal-income-fields" style="display:${t===`income`?``:`none`}">
      <div class="form-group">
        <label class="form-label">Target Monthly Income (AUD)</label>
        <input class="form-input" id="f-goal-target-monthly-inc" type="number" max="99999999" min="0" value="${e.targetMonthly||``}" placeholder="e.g. 8000">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Target Date</label>
        <input class="form-input" id="f-goal-deadline" type="date" value="${e.deadline||``}">
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-goal-status">
          <option value="active"    ${(e.status||`active`)===`active`?`selected`:``}>Active</option>
          <option value="achieved"  ${e.status===`achieved`?`selected`:``}>Achieved</option>
          <option value="abandoned" ${e.status===`abandoned`?`selected`:``}>Abandoned</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-goal-notes" type="text" maxlength="200" value="${_(e.notes||``)}" placeholder="Optional notes">
    </div>
  `}function Zi(){let e=document.getElementById(`f-goal-type`).value;document.getElementById(`goal-spending-fields`).style.display=e===`spending`?``:`none`,document.getElementById(`goal-savings-fields`).style.display=e===`savings`?``:`none`,document.getElementById(`goal-income-fields`).style.display=e===`income`?``:`none`}function Qi(e){let t=document.getElementById(`f-goal-type`).value,n={id:e,name:document.getElementById(`f-goal-name`).value.trim(),type:t,status:document.getElementById(`f-goal-status`).value,deadline:document.getElementById(`f-goal-deadline`).value||null,notes:document.getElementById(`f-goal-notes`).value.trim()};return t===`spending`&&(n.category=document.getElementById(`f-goal-category`).value,n.targetMonthly=parseFloat(document.getElementById(`f-goal-target-monthly`).value)||0),t===`savings`&&(n.targetTotal=parseFloat(document.getElementById(`f-goal-target-total`).value)||0,n.currentSaved=parseFloat(document.getElementById(`f-goal-current-saved`).value)||0),t===`income`&&(n.targetMonthly=parseFloat(document.getElementById(`f-goal-target-monthly-inc`).value)||0),n}function $i(){window.openModal(`New Goal`,Xi(),()=>{let e=Qi(k(s.goals));e.name&&(s.goals.push(e),window.saveData(s),window.closeModal(),Yi())})}function ea(e){let t=s.goals.find(t=>t.id===e);window.openModal(`Edit Goal`,Xi(t),()=>{Object.assign(t,Qi(e)),window.saveData(s),window.closeModal(),Yi()})}function ta(e){confirm(`Delete this goal?`)&&(s.goals=s.goals.filter(t=>t.id!==e),window.saveData(s),Yi())}function na(e){let t=s.goals.find(t=>t.id===e);t&&(t.status=`achieved`,window.saveData(s),Yi())}var ra=null,ia=[{value:`add-income`,label:`Add income source`,icon:`💰`},{value:`remove-income`,label:`Remove income source`,icon:`➖`},{value:`reduce-income`,label:`Reduce income amount`,icon:`📉`},{value:`add-expense`,label:`Add new expense`,icon:`➕`},{value:`remove-expense`,label:`Remove expense`,icon:`✂️`},{value:`reduce-expense`,label:`Reduce expense amount`,icon:`📉`}];function aa(e){let t=window.getMonthData(window.selectedBudgetMonth),n=JSON.parse(JSON.stringify(t.income)),r=JSON.parse(JSON.stringify(t.expenses));return(e.adjustments||[]).forEach(e=>{if(e.type===`add-income`)n.push({id:-(e.id||0),name:e.name,amount:e.amount||0,frequency:e.frequency||`monthly`});else if(e.type===`remove-income`)n=n.filter(t=>t.id!==e.itemId);else if(e.type===`reduce-income`){let t=n.find(t=>t.id===e.itemId);t&&(t.amount=e.changeType===`percent`?Math.max(0,t.amount*(1-e.changeAmount/100)):Math.max(0,t.amount-(e.changeAmount||0)))}else if(e.type===`add-expense`)r.push({id:-(e.id||0),name:e.name,amount:e.amount||0,frequency:e.frequency||`monthly`,category:e.category||`Other`});else if(e.type===`remove-expense`)r=r.filter(t=>t.id!==e.itemId);else if(e.type===`reduce-expense`){let t=r.find(t=>t.id===e.itemId);t&&(t.amount=e.changeType===`percent`?Math.max(0,t.amount*(1-e.changeAmount/100)):Math.max(0,t.amount-(e.changeAmount||0)))}}),{income:n,expenses:r,totalIncome:O(n),totalExpenses:O(r),surplus:O(n)-O(r)}}function oa(){let e=s.scenarios,t=window.getMonthData(window.selectedBudgetMonth),n=O(t.income),r=O(t.expenses),i=n-r,a=`<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary" onclick="openAddScenario()">+ New Scenario</button>
  </div>`;e.length===0?a+=`<div class="empty"><div class="empty-icon">🔬</div>No scenarios yet. Create one to model income changes, expense cuts, or lifestyle adjustments.</div>`:e.forEach(e=>{let t=aa(e),o=t.totalIncome-n,s=t.totalExpenses-r,c=t.surplus-i,l=ra===e.id;a+=`
        <div class="scenario-card">
          <div class="scenario-card-header" onclick="toggleScenario(${e.id})">
            <div style="flex:1">
              <div style="font-weight:600;font-size:14px">${g(e.name)}</div>
              ${e.description?`<div style="font-size:12px;color:var(--text-muted);margin-top:2px">${g(e.description)}</div>`:``}
            </div>
            <div style="display:flex;align-items:center;gap:12px;flex-shrink:0">
              <div style="text-align:right">
                <div style="font-size:11px;color:var(--text-muted)">Surplus impact</div>
                <div style="font-size:14px;font-weight:700;color:${c>=0?`var(--success)`:`var(--danger)`}">${c>=0?`+`:``}${b(c)}/mo</div>
              </div>
              <div style="display:flex;gap:4px">
                <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openEditScenario(${e.id})">✏️</button>
                <button class="btn btn-danger-ghost btn-sm" onclick="event.stopPropagation();deleteScenario(${e.id})">🗑</button>
              </div>
              <span style="color:var(--text-muted);font-size:18px">${l?`▲`:`▼`}</span>
            </div>
          </div>
          <div class="scenario-card-body${l?` open`:``}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <div style="font-size:13px;font-weight:600">Adjustments (${(e.adjustments||[]).length})</div>
              <button class="btn btn-primary btn-sm" onclick="openAddAdjustment(${e.id})">+ Adjustment</button>
            </div>
            <div class="adj-list">
              ${(e.adjustments||[]).length===0?`<div style="font-size:13px;color:var(--text-muted);padding:8px 0">No adjustments yet. Add income or expense changes.</div>`:(e.adjustments||[]).map(t=>{let n=ia.find(e=>e.value===t.type)||ia[0],r=``;return t.type===`add-income`||t.type===`add-expense`?r=`${g(t.name)} · ${b(t.amount||0)}/${t.frequency||`mo`}${t.category?` · `+t.category:``}`:t.type===`remove-income`||t.type===`remove-expense`?r=g(t.itemName||`—`):(t.type===`reduce-income`||t.type===`reduce-expense`)&&(r=`${g(t.itemName)} · reduce by ${t.changeType===`percent`?t.changeAmount+`%`:b(t.changeAmount||0)}`),`<div class="adj-item">
                      <span class="adj-icon">${n.icon}</span>
                      <div style="flex:1">
                        <span style="font-weight:500">${n.label}</span>
                        <span style="color:var(--text-muted);margin-left:6px">${r}</span>
                      </div>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteAdjustment(${e.id},${t.id})">🗑</button>
                    </div>`}).join(``)}
            </div>
            <div class="scenario-compare">
              <div class="compare-col">
                <div class="compare-col-title">Current Budget</div>
                <div class="compare-row"><span>Monthly Income</span><span class="amount" style="color:var(--success)">${b(n)}</span></div>
                <div class="compare-row"><span>Monthly Expenses</span><span class="amount" style="color:var(--danger)">${b(r)}</span></div>
                <div class="compare-row"><span>Monthly Surplus</span><span class="amount" style="color:${i>=0?`var(--success)`:`var(--danger)`}">${b(i)}</span></div>
                <div class="compare-row"><span style="color:var(--text-muted);font-size:12px">Annual surplus</span><span style="color:var(--text-muted);font-size:12px">${b(i*12)}</span></div>
              </div>
              <div class="compare-col" style="border:2px solid var(--primary)">
                <div class="compare-col-title" style="color:var(--primary)">Scenario: ${g(e.name)}</div>
                <div class="compare-row">
                  <span>Monthly Income</span>
                  <span class="amount" style="color:var(--success)">${b(t.totalIncome)} ${o===0?``:`<small style="color:${o>0?`var(--success)`:`var(--danger)`}">(${o>0?`+`:``}${b(o)})</small>`}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Expenses</span>
                  <span class="amount" style="color:var(--danger)">${b(t.totalExpenses)} ${s===0?``:`<small style="color:${s<0?`var(--success)`:`var(--danger)`}">(${s>0?`+`:``}${b(s)})</small>`}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Surplus</span>
                  <span class="amount" style="color:${t.surplus>=0?`var(--success)`:`var(--danger)`};font-weight:700">${b(t.surplus)}</span>
                </div>
                <div class="compare-row">
                  <span style="font-size:12px">Annual surplus</span>
                  <span style="font-size:12px;font-weight:600;color:${t.surplus>=0?`var(--success)`:`var(--danger)`}">${b(t.surplus*12)} ${c===0?``:`<small>(${c>0?`+`:``}${b(c*12)}/yr)</small>`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>`}),document.getElementById(`scenarios-content`).innerHTML=a}function sa(e){ra=ra===e?null:e,oa()}function ca(e={}){return`
    <div class="form-group">
      <label class="form-label">Scenario Name</label>
      <input class="form-input" id="f-sc-name" type="text" maxlength="200" value="${_(e.name||``)}" placeholder="e.g. Pick up second job">
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input class="form-input" id="f-sc-desc" type="text" maxlength="200" value="${_(e.description||``)}" placeholder="Brief description of what you're testing">
    </div>
  `}function la(e,t={}){return{id:e,name:document.getElementById(`f-sc-name`).value.trim(),description:document.getElementById(`f-sc-desc`).value.trim(),adjustments:t.adjustments||[]}}function ua(){window.openModal(`New Scenario`,ca(),()=>{let e=la(k(s.scenarios));e.name&&(s.scenarios.push(e),window.saveData(s),window.closeModal(),oa())})}function da(e){let t=s.scenarios.find(t=>t.id===e);window.openModal(`Edit Scenario`,ca(t),()=>{let n=la(e,t);Object.assign(t,n),window.saveData(s),window.closeModal(),oa()})}function fa(e){confirm(`Delete this scenario?`)&&(s.scenarios=s.scenarios.filter(t=>t.id!==e),ra===e&&(ra=null),window.saveData(s),oa())}function pa(e){let t=window.getMonthData(window.selectedBudgetMonth),n=t.income.map(e=>`<option value="${e.id}">${g(e.name)} (${b(D(e))}/mo)</option>`).join(``),r=t.expenses.map(e=>`<option value="${e.id}">${g(e.name)} (${b(D(e))}/mo)</option>`).join(``);return`
    <div class="form-group">
      <label class="form-label">Adjustment Type</label>
      <select class="form-select" id="f-adj-type" onchange="toggleAdjFields()">
        ${ia.map(e=>`<option value="${e.value}">${e.icon} ${e.label}</option>`).join(``)}
      </select>
    </div>
    <div id="adj-add-income" style="display:block">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Description</label>
          <input class="form-input" id="f-adj-name" type="text" maxlength="200" placeholder="e.g. Weekend job">
        </div>
        <div class="form-group">
          <label class="form-label">Amount (AUD)</label>
          <input class="form-input" id="f-adj-amount" type="number" max="99999999" min="0" placeholder="e.g. 800">
        </div>
      </div>
      <div class="form-row" id="adj-add-income-extra">
        <div class="form-group">
          <label class="form-label">Frequency</label>
          <select class="form-select" id="f-adj-freq">
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="monthly" selected>Monthly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
        <div class="form-group" id="adj-cat-wrap" style="display:none">
          <label class="form-label">Category</label>
          <select class="form-select" id="f-adj-cat">
            ${expenseCategories().map(e=>`<option value="${e}">${e}</option>`).join(``)}
          </select>
        </div>
      </div>
    </div>
    <div id="adj-remove-income" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Income to Remove</label>
        <select class="form-select" id="f-adj-inc-sel">${n||`<option value="">No income sources</option>`}</select>
      </div>
    </div>
    <div id="adj-reduce-income" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Income to Reduce</label>
        <select class="form-select" id="f-adj-inc-reduce-sel">${n||`<option value="">No income sources</option>`}</select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Reduce by</label>
          <input class="form-input" id="f-adj-change-amount" type="number" max="99999999" min="0" placeholder="Amount">
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="form-select" id="f-adj-change-type-inc">
            <option value="flat">$ flat amount</option>
            <option value="percent">% percentage</option>
          </select>
        </div>
      </div>
    </div>
    <div id="adj-remove-expense" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Expense to Remove</label>
        <select class="form-select" id="f-adj-exp-sel">${r||`<option value="">No expenses</option>`}</select>
      </div>
    </div>
    <div id="adj-reduce-expense" style="display:none">
      <div class="form-group">
        <label class="form-label">Select Expense to Reduce</label>
        <select class="form-select" id="f-adj-exp-reduce-sel">${r||`<option value="">No expenses</option>`}</select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Reduce by</label>
          <input class="form-input" id="f-adj-change-amount-exp" type="number" max="99999999" min="0" placeholder="Amount">
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="form-select" id="f-adj-change-type-exp">
            <option value="flat">$ flat amount</option>
            <option value="percent">% percentage</option>
          </select>
        </div>
      </div>
    </div>
  `}function ma(){let e=document.getElementById(`f-adj-type`).value;document.getElementById(`adj-add-income`).style.display=e===`add-income`||e===`add-expense`?``:`none`,document.getElementById(`adj-add-income-extra`).style.display=e===`add-income`||e===`add-expense`?``:`none`,document.getElementById(`adj-cat-wrap`).style.display=e===`add-expense`?``:`none`,document.getElementById(`adj-remove-income`).style.display=e===`remove-income`?``:`none`,document.getElementById(`adj-reduce-income`).style.display=e===`reduce-income`?``:`none`,document.getElementById(`adj-remove-expense`).style.display=e===`remove-expense`?``:`none`,document.getElementById(`adj-reduce-expense`).style.display=e===`reduce-expense`?``:`none`}function ha(e){let t=s.scenarios.find(t=>t.id===e);t&&window.openModal(`Add Adjustment`,pa(t),()=>{let e=document.getElementById(`f-adj-type`).value,n=window.getMonthData(window.selectedBudgetMonth),r={id:k(t.adjustments||[]),type:e};if(e===`add-income`){if(r.name=document.getElementById(`f-adj-name`).value.trim(),r.amount=parseFloat(document.getElementById(`f-adj-amount`).value)||0,r.frequency=document.getElementById(`f-adj-freq`).value,!r.name)return}else if(e===`add-expense`){if(r.name=document.getElementById(`f-adj-name`).value.trim(),r.amount=parseFloat(document.getElementById(`f-adj-amount`).value)||0,r.frequency=document.getElementById(`f-adj-freq`).value,r.category=document.getElementById(`f-adj-cat`).value,!r.name)return}else if(e===`remove-income`){let e=document.getElementById(`f-adj-inc-sel`);r.itemId=parseInt(e.value),r.itemName=e.options[e.selectedIndex]?.text||``}else if(e===`reduce-income`){let e=document.getElementById(`f-adj-inc-reduce-sel`);r.itemId=parseInt(e.value),r.itemName=n.income.find(e=>e.id===r.itemId)?.name||``,r.changeAmount=parseFloat(document.getElementById(`f-adj-change-amount`).value)||0,r.changeType=document.getElementById(`f-adj-change-type-inc`).value}else if(e===`remove-expense`){let e=document.getElementById(`f-adj-exp-sel`);r.itemId=parseInt(e.value),r.itemName=e.options[e.selectedIndex]?.text||``}else if(e===`reduce-expense`){let e=document.getElementById(`f-adj-exp-reduce-sel`);r.itemId=parseInt(e.value),r.itemName=n.expenses.find(e=>e.id===r.itemId)?.name||``,r.changeAmount=parseFloat(document.getElementById(`f-adj-change-amount-exp`).value)||0,r.changeType=document.getElementById(`f-adj-change-type-exp`).value}t.adjustments||(t.adjustments=[]),t.adjustments.push(r),window.saveData(s),window.closeModal(),oa()})}function ga(e,t){let n=s.scenarios.find(t=>t.id===e);n&&(n.adjustments=(n.adjustments||[]).filter(e=>e.id!==t),window.saveData(s),oa())}var _a=`home_finance_colors_v1`,va={expense:{"Mortgage / Rent":`#6366f1`,Insurance:`#8b5cf6`,Utilities:`#06b6d4`,Groceries:`#10b981`,Transport:`#f59e0b`,"Childcare / Education":`#3b82f6`,Health:`#ef4444`,Entertainment:`#f97316`,Subscriptions:`#84cc16`,"Dining Out":`#14b8a6`,Clothing:`#ec4899`,"Personal Care":`#a855f7`,"Savings / Investment":`#22c55e`,Other:`#94a3b8`},income:`#10b981`,build:{contract:`#3b82f6`,extras:`#f59e0b`,furniture:`#8b5cf6`,appliances:`#ef4444`}};function ya(){try{let e=N(_a);if(!e)return JSON.parse(JSON.stringify(va));let t=JSON.parse(e);return t.expense||(t.expense={}),t.build||(t.build={}),t.income||(t.income=va.income),Ki().forEach(e=>{t.expense[e]||(t.expense[e]=va.expense[e]||`#94a3b8`)}),Object.keys(va.build).forEach(e=>{t.build[e]||(t.build[e]=va.build[e])}),t}catch{return JSON.parse(JSON.stringify(va))}}function ba(e){Xe(_a,JSON.stringify(e))}var xa=ya();Object.defineProperty(window,`colors`,{get(){return xa},set(e){xa=e},configurable:!0});function Sa(e,t,n){e===`expense`?xa.expense[t]=n:e===`income`?xa.income=n:e===`build`&&(xa.build[t]=n),ba(xa),renderBudget(),renderBuild(),renderDashboard()}function Ca(){return(s.householdProfile.members||[]).filter(e=>e.role===`adult`).length||1}function wa(){return(s.householdProfile.members||[]).filter(e=>e.role===`child`).length}function Ta(e){s.householdProfile.members.push({role:e||`adult`,age:null}),so(),renderSettings()}function Ea(e){let t=s.householdProfile.members[e];if(!t)return;let n=t.name||(t.role===`child`?`this child`:`this adult`);if(confirm(`Remove ${n} from the household?\n\nThis cannot be undone.`)){if(t.role===`child`&&t.name){let e=(s.kids?.profiles||[]).find(e=>e.name===t.name);e&&(s.kids.profiles=s.kids.profiles.filter(t=>t.id!==e.id),s.kids.chores=s.kids.chores.filter(t=>t.assignedTo!==e.id),s.kids.completions=s.kids.completions.filter(t=>t.kidId!==e.id),s.kids.redemptions=s.kids.redemptions.filter(t=>t.kidId!==e.id),s.meals?.lunchbox?.profiles&&(s.meals.lunchbox.profiles=s.meals.lunchbox.profiles.filter(t=>t.id!==e.id)),String(window.getDeviceProfile())===String(e.id)&&window.setDeviceProfile(`adult`))}s.householdProfile.members.splice(e,1),window.saveData(s),window.renderAll()}}function Da(e,t,n){let r=s.householdProfile.members[e];r&&(r[t]=n,so(),(t===`role`||t===`name`)&&renderSettings())}function Oa(e){s.householdProfile.pets.push({type:e||`dog`,name:``}),so(),renderSettings()}function ka(e){s.householdProfile.pets.splice(e,1),so(),renderSettings()}function Aa(e,t,n){let r=s.householdProfile.pets[e];r&&(r[t]=n,so())}function ja(e){s.householdProfile.cars=e,so()}function Ma(e,t,n){let r=t+n;return[{category:`Mortgage / Rent`,min:e*.2,max:e*.3,label:`20–30% of income`,source:`ABS / MoneySmart`,needs:!0},{category:`Groceries`,min:380+(t-1)*260+n*160,max:560+(t-1)*360+n*220,label:`$${Math.round(380+(t-1)*260+n*160)}–$${Math.round(560+(t-1)*360+n*220)}/month for ${r} ${r===1?`person`:`people`}`,source:`ABS HES 2022`,needs:!0},{category:`Transport`,min:e*.08,max:e*.15,label:`8–15% of income`,source:`ABS HES 2022`,needs:!0},{category:`Utilities`,min:180+t*25+n*15,max:360+t*40+n*25,label:`$${Math.round(180+t*25+n*15)}–$${Math.round(360+t*40+n*25)}/month`,source:`AER / ABS`,needs:!0},{category:`Insurance`,min:180+t*40+n*20,max:420+t*60+n*30,label:`$${Math.round(180+t*40+n*20)}–$${Math.round(420+t*60+n*30)}/month`,source:`APRA industry avg`,needs:!0},{category:`Health`,min:60*t+30*n,max:180*t+60*n,label:`$${60*t+30*n}–$${180*t+60*n}/month`,source:`AIHW / ABS`,needs:!0},...n>0?[{category:`Childcare / Education`,min:700*n,max:2200*n,label:`$700–$2,200/month per child (before subsidies)`,source:`ACCC Childcare Report`,needs:!0}]:[],{category:`Dining Out`,min:e*.02,max:e*.05,label:`2–5% of income`,source:`MoneySmart`,needs:!1},{category:`Entertainment`,min:e*.02,max:e*.05,label:`2–5% of income`,source:`MoneySmart`,needs:!1},{category:`Subscriptions`,min:30,max:120,label:`$30–$120/month`,source:`Industry average`,needs:!1},{category:`Clothing`,min:50*t+30*n,max:150*t+80*n,label:`$${50*t+30*n}–$${150*t+80*n}/month`,source:`ABS HES 2022`,needs:!1},{category:`Savings / Investment`,min:e*.1,max:e*.2,label:`10–20% of income (aim for 20%)`,source:`50/30/20 rule`,needs:!1}]}function Na(e,t,n){return e<t*.9?`under`:e>n*1.1?`over`:`within`}var Pa=`home_finance_ai_key`;function Fa(){return N(`home_finance_ai_key`)||``}function Ia(e){Xe(Pa,e)}function La(){let e=window.getLast6Months(),t={};return e.forEach(e=>{let n=window.getMonthData(e),r={},i={};n.expenses.forEach(t=>{let n=t.category||`Other`;r[n]=(r[n]||0)+D(t);let a=window.getActual(t.id,e);a>0&&(i[n]=(i[n]||0)+a)}),new Set([...Object.keys(r),...Object.keys(i)]).forEach(n=>{t[n]||(t[n]=[]),t[n].push({mo:e,budget:r[n]||0,actual:i[n]||0,hasActual:(i[n]||0)>0})})}),t}function Ra(e){let t=[];return Object.entries(e).forEach(([e,n])=>{let r=n.filter(e=>e.hasActual);if(r.length<2)return;let i=r.filter(e=>e.budget>0&&e.actual>e.budget*1.05).length,a=r.filter(e=>e.budget>0&&e.actual<e.budget*.92).length,o=r.reduce((e,t)=>e+(t.actual-t.budget),0)/r.length,s=n.slice(-3).filter(e=>e.hasActual),c=n.slice(0,3).filter(e=>e.hasActual),l=s.length?s.reduce((e,t)=>e+t.actual,0)/s.length:0,u=c.length?c.reduce((e,t)=>e+t.actual,0)/c.length:0,d=u>50?(l-u)/u:0;i>=3&&o>20?t.push({cat:e,level:`warning`,icon:`⚠️`,title:`Consistently over on ${e}`,body:`Over budget ${i}/${r.length} months, avg +${b(Math.abs(o))}/mo. Consider raising the budget or cutting back.`,months:r}):a>=4&&n[n.length-1]?.budget>0?t.push({cat:e,level:`good`,icon:`✅`,title:`Consistently under on ${e}`,body:`Under budget ${a}/${r.length} months, avg ${b(Math.abs(o))}/mo less. You may be able to reallocate this budget elsewhere.`,months:r}):d>.25&&l>50?t.push({cat:e,level:`warning`,icon:`📈`,title:`${e} trending up`,body:`Spending up ${Math.round(d*100)}% over recent months — now averaging ${b(l)}/mo. Worth keeping an eye on.`,months:r}):d<-.25&&u>50&&t.push({cat:e,level:`good`,icon:`📉`,title:`${e} trending down`,body:`Down ${Math.round(Math.abs(d)*100)}% recently — now ${b(l)}/mo. Nice improvement.`,months:r})}),t.sort((e,t)=>[`warning`,`alert`,`good`,`info`].indexOf(e.level)-[`warning`,`alert`,`good`,`info`].indexOf(t.level)).slice(0,6)}function za(){let e=window.getMonthData(window.selectedBudgetMonth);if(e.expenses.length===0)return``;let t={};e.expenses.forEach(e=>{let n=e.category||`Other`;t[n]||(t[n]={budget:0,actual:0}),t[n].budget+=D(e),t[n].actual+=window.getActual(e.id,window.selectedBudgetMonth)});let n=Object.entries(t).filter(([,e])=>e.budget>0||e.actual>0).sort((e,t)=>Math.max(t[1].budget,t[1].actual)-Math.max(e[1].budget,e[1].actual));if(!n.length)return``;let r=Math.max(...n.flatMap(([,e])=>[e.budget,e.actual]),1),i=n.map(([e,t])=>{let n=t.actual>0,i=(t.budget/r*100).toFixed(1),a=(t.actual/r*100).toFixed(1),o=t.actual-t.budget,s=n?o>5?`over`:o<-5?`under`:``:``,c=n?o>5?`<span class="spi-over">+${b(o)}</span>`:o<-5?`<span class="spi-under">${b(o)}</span>`:`<span class="spi-on">on track</span>`:`<span class="spi-no-actual">no actuals</span>`;return`<div class="spi-cat-row">
      <div class="spi-cat-label">${e}</div>
      <div class="spi-cat-bars">
        <div class="spi-bar-wrap"><div class="spi-bar-budget" style="width:${i}%"></div>${n?`<div class="spi-bar-actual ${s}" style="width:${a}%"></div>`:``}</div>
      </div>
      <div class="spi-cat-amounts"><span>${b(t.budget)}</span>${c}</div>
    </div>`}).join(``);return`<div class="spi-breakdown">
    <div class="spi-breakdown-header">
      <span style="font-size:13px;font-weight:700">Budget vs Actual — ${window.monthLabel(window.selectedBudgetMonth)}</span>
      <div style="display:flex;gap:14px;font-size:11px;color:var(--text-muted)">
        <span><span class="spi-legend spi-legend-budget"></span>Budget</span>
        <span><span class="spi-legend spi-legend-actual"></span>Actual</span>
      </div>
    </div>
    ${i}
  </div>`}function Ba(){let e=Ra(La()),t=za(),n={warning:{bg:`#fffbeb`,border:`#fcd34d`,title:`#92400e`},good:{bg:`#ecfeff`,border:`#86efac`,title:`#166534`},alert:{bg:`#fef2f2`,border:`#fca5a5`,title:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,title:`#475569`}};return`<div class="spi-section">
    <div class="spi-section-title">📊 Spending Patterns — Last 6 Months</div>
    ${t}
    ${e.length===0?`<div class="spi-empty-state">Add actuals in Monthly Budget over a few months to unlock pattern detection.</div>`:`<div class="spi-patterns-grid">${e.map(e=>{let t=n[e.level]||n.info,r=Math.max(...(e.months||[]).map(e=>e.actual),1),i=(e.months||[]).map(e=>`<div class="spi-spark-bar" style="height:${Math.max(Math.round(e.actual/r*20),e.hasActual?2:0)}px;background:${e.hasActual?e.actual>e.budget*1.05?`#ef4444`:e.actual<e.budget*.95?`#10b981`:`#2563eb`:`#e2e8f0`}"></div>`).join(``);return`<div class="spi-pattern-card" style="background:${t.bg};border:1.5px solid ${t.border}">
          <div class="spi-pattern-icon">${e.icon}</div>
          <div>
            <div class="spi-pattern-title" style="color:${t.title}">${g(e.title)}</div>
            <div class="spi-pattern-body">${g(e.body)}</div>
            <div class="spi-sparkline">${i}</div>
          </div>
        </div>`}).join(``)}</div>`}
  </div>`}function Va(){let e=window.getMonthData(window.selectedBudgetMonth),t=O(e.income),n=O(e.expenses),r=t-n,i=t>0?r/t*100:0,a={};e.expenses.forEach(e=>{let t=e.category||`Other`;a[t]=(a[t]||0)+D(e)});let o=Object.entries(a).sort((e,t)=>t[1]-e[1]),c=window.getLast6Months(),l=c.reduce((e,t)=>e+O(window.getMonthData(t).expenses),0)/6;c.reduce((e,t)=>e+O(window.getMonthData(t).income),0)/6;let u=[];if(i>=20?u.push({level:`good`,icon:`🌟`,title:`Excellent savings rate`,body:`You're saving ${Math.round(i)}% of income — above the recommended 20%. Keep it up and consider putting the surplus toward your goals.`}):i>=10?u.push({level:`ok`,icon:`📈`,title:`Decent savings rate`,body:`You're saving ${Math.round(i)}% of income. Pushing to 20% would mean an extra ${b(t*.2-r)}/month going toward your future.`}):i>0?u.push({level:`warning`,icon:`⚠️`,title:`Low savings rate`,body:`Only ${Math.round(i)}% of income is being saved (${b(r)}/month). Look for the biggest discretionary expense you can reduce.`}):t>0&&u.push({level:`alert`,icon:`🚨`,title:`Spending exceeds income`,body:`You're spending ${b(Math.abs(r))} more than you earn each month. This requires urgent attention — identify what can be cut immediately.`}),l>0){let e=n-l,t=Math.round(Math.abs(e)/l*100);e>l*.1?u.push({level:`warning`,icon:`📊`,title:`Expenses above your average`,body:`This month's expenses are ${t}% above your 6-month average (${b(l)}). The extra ${b(e)} could be a one-off — worth reviewing.`}):e<-l*.08&&l>0&&u.push({level:`good`,icon:`📊`,title:`Expenses below your average`,body:`Nice — this month you spent ${t}% less than your 6-month average. That's ${b(Math.abs(e))} extra in your pocket.`})}if(o.length>0){let[e,t]=o[0],r=n>0?Math.round(t/n*100):0;r>45&&e!==`Mortgage / Rent`&&u.push({level:`warning`,icon:`💸`,title:`${e} is dominating your budget`,body:`${e} makes up ${r}% of your total expenses (${b(t)}/month). Reducing this by 20% would save ${b(t*.2)}/month.`})}let d=a[`Dining Out`]||0;d>0&&n>0&&d/n>.08&&u.push({level:`ok`,icon:`🍽️`,title:`Dining out is notable`,body:`You're spending ${b(d)}/month dining out. Cooking at home 2–3 more times a week could save ${b(d*.35)}/month.`}),e.income.length===1&&t>0&&u.push({level:`info`,icon:`💡`,title:`Single income source`,body:`You rely on one income stream. Even a small side income (freelance, rental, etc.) would significantly improve your financial resilience.`});let f=s.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),p=s.buildContract.total-f;if(p>0&&r>0){let e=Math.round(p/r);u.push({level:`info`,icon:`🏗️`,title:`Build payments still ahead`,body:`You have ${b(p)} left in contract payments. At your current savings rate that represents ${e} month${e===1?``:`s`} of surplus — plan accordingly.`})}let m=(s.goals||[]).filter(e=>!e.achieved);return m.length>0&&r>0&&u.push({level:`good`,icon:`🎯`,title:`${m.length} active goal${m.length>1?`s`:``}`,body:`Your ${b(r)}/month surplus can work toward your goals. Review the Goals page to see progress and adjust contributions.`}),e.expenses.length===0&&u.push({level:`info`,icon:`📝`,title:`Add your expenses`,body:`Head to Monthly Budget and add your regular expenses to unlock personalised insights.`}),u}var Ha=`https://home-finance-proxy.fuscocl.workers.dev`;async function Ua(){let e=document.getElementById(`ai-run-btn`);e.disabled=!0,e.textContent=`Analysing…`;let t=window.getMonthData(window.selectedBudgetMonth),n=O(t.income),r=O(t.expenses),i=n-r,a=n>0?Math.round(i/n*100):0,o={};t.expenses.forEach(e=>{o[e.category||`Other`]=(o[e.category||`Other`]||0)+D(e)});let c=window.getLast6Months().map(e=>{let t=window.getMonthData(e);return{month:e,income:O(t.income),expenses:O(t.expenses)}}),l=Ma(n,Ca(),wa()).filter(e=>o[e.category]!==void 0).map(e=>({category:e.category,yourSpend:Math.round(o[e.category]||0),benchmarkMin:Math.round(e.min),benchmarkMax:Math.round(e.max),benchmarkLabel:e.label,status:Na(o[e.category]||0,e.min,e.max)})),u={month:window.monthLabel(window.selectedBudgetMonth),household:(function(){let e=s.householdProfile||{},t=e.members||[],n=t.filter(e=>e.role===`adult`),r=t.filter(e=>e.role===`child`);return{adults:n.length||2,children:r.length,totalPeople:t.length||2,memberAges:t.map(e=>({role:e.role,age:e.age})),pets:(e.pets||[]).map(e=>e.type),cars:e.cars||0}})(),monthlyIncome:n,monthlyExpenses:r,surplus:i,savingsRatePct:a,expensesByCategory:o,benchmarkComparisons:l,incomeStreams:t.income.map(e=>({name:e.name,monthlyAmount:D(e)})),last6MonthsTrend:c,activeGoals:(s.goals||[]).filter(e=>!e.achieved).map(e=>({name:e.name,type:e.type})),buildRemaining:s.buildContract.total-s.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),currency:`AUD`},d=`You are a friendly but direct personal finance advisor for an Australian family. Analyse their budget data and benchmark comparisons, then give 4-6 concise, specific, actionable insights.

Budget data for ${u.month}:
${JSON.stringify(u,null,2)}

Focus especially on:
- Where their spending is above or below Australian household benchmarks for their household size
- How their 50/30/20 split compares to the ideal
- Specific opportunities to improve based on the benchmark data
- What they're doing well compared to benchmarks

Format your response as a JSON array of insight objects, each with:
- "title": short headline (max 8 words)
- "body": 1-2 sentences with specific numbers from the data
- "level": one of "good", "ok", "warning", "alert", "info"
- "icon": a single relevant emoji
- "action": one-line actionable recommendation (optional)

Reply with ONLY the JSON array, no other text.`;try{let e=await fetch(Ha,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:1024,messages:[{role:`user`,content:d}]})});if(!e.ok){let t=await e.json().catch(()=>({}));throw Error(t.error?.message||`API error ${e.status}`)}let t=(await e.json()).content[0].text.trim();t=t.replace(/^```[a-z]*\n?/i,``).replace(/\n?```$/,``).trim(),Wa(JSON.parse(t),!0)}catch(e){let t=e.message;(t.includes(`Failed to fetch`)||t.includes(`NetworkError`)||t.includes(`CORS`))&&(t=`CORS blocked — the browser can't call the Anthropic API directly. We need a small proxy (Cloudflare Worker). Ask me to set it up — it takes 5 minutes and is free.`),document.getElementById(`ai-output`).innerHTML=`
      <div style="padding:16px 20px;background:var(--danger-light);border-radius:8px;color:var(--danger);font-size:13px">
        <strong>Error:</strong> ${t}
      </div>`}finally{e.disabled=!1,e.textContent=`✨ Generate AI Insights`}}function Wa(e,t){let n={good:{bg:`#ecfeff`,border:`#86efac`,icon_bg:`#dcfce7`,text:`#166534`},ok:{bg:`#eff6ff`,border:`#93c5fd`,icon_bg:`#dbeafe`,text:`#1e40af`},warning:{bg:`#fffbeb`,border:`#fcd34d`,icon_bg:`#fef3c7`,text:`#92400e`},alert:{bg:`#fef2f2`,border:`#fca5a5`,icon_bg:`#fee2e2`,text:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,icon_bg:`#f1f5f9`,text:`#475569`}},r=e.map(e=>{let t=n[e.level]||n.info;return`
      <div style="background:${t.bg};border:1.5px solid ${t.border};border-radius:12px;padding:16px 18px;display:flex;gap:14px;align-items:flex-start">
        <div style="width:38px;height:38px;border-radius:10px;background:${t.icon_bg};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${e.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:14px;color:${t.text};margin-bottom:4px">${g(e.title)}</div>
          <div style="font-size:13px;color:var(--text);line-height:1.5">${g(e.body)}</div>
          ${e.action?`<div style="margin-top:8px;font-size:12px;font-weight:600;color:${t.text}">→ ${g(e.action)}</div>`:``}
        </div>
      </div>`}).join(``);document.getElementById(`ai-output`).innerHTML=`
    <div style="display:flex;flex-direction:column;gap:12px">
      ${t?`<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-muted);margin-bottom:4px"><span>✨</span> Generated by Claude AI · ${window.monthLabel(window.selectedBudgetMonth)}</div>`:``}
      ${r}
    </div>`}function Ga(e,t,n,r){let i=Ma(e,t,n);t+n;let a=[`Mortgage / Rent`,`Insurance`,`Utilities`,`Groceries`,`Transport`,`Health`,`Childcare / Education`],o=[`Dining Out`,`Entertainment`,`Subscriptions`,`Clothing`,`Personal Care`],s=[`Savings / Investment`],c=Object.entries(r).filter(([e])=>a.includes(e)).reduce((e,[,t])=>e+t,0),l=Object.entries(r).filter(([e])=>o.includes(e)).reduce((e,[,t])=>e+t,0),u=Object.entries(r).filter(([e])=>s.includes(e)).reduce((e,[,t])=>e+t,0),d=e>0?Math.round(c/e*100):0,f=e>0?Math.round(l/e*100):0,p=e>0?Math.round(u/e*100):0;function m(e,t,n,r){let i=Math.min(t,100),a=t>n;return`
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
          <span style="font-weight:600">${e}</span>
          <span style="color:${a?`var(--danger)`:`var(--success)`};font-weight:600">
            ${t}% <span style="font-weight:400;color:var(--text-muted)">/ ${n}% target</span>
          </span>
        </div>
        <div style="height:8px;background:var(--surface2);border-radius:4px;overflow:hidden;position:relative">
          <div style="position:absolute;left:0;top:0;height:100%;width:${Math.min(n,100)}%;border-right:2px dashed #94a3b8;z-index:1"></div>
          <div style="height:100%;width:${i}%;background:${a?`var(--danger)`:r};border-radius:4px;opacity:0.85;transition:width .3s"></div>
        </div>
      </div>`}let h=i.filter(e=>r[e.category]!==void 0||e.category===`Savings / Investment`).map(e=>{let t=r[e.category]||0,n=Na(t,e.min,e.max),i=n===`under`?`#3b82f6`:n===`within`?`#10b981`:`#ef4444`,a=n===`under`?`Below avg`:n===`within`?`On track`:`Above avg`,o=e.max>0?Math.min(t/(e.max*1.5)*100,100):0,s=e.max>0?Math.min(e.max/(e.max*1.5)*100,100):0;return`
      <tr>
        <td style="border-left:3px solid ${xa.expense[e.category]||`#94a3b8`};font-weight:500">${e.category}</td>
        <td class="amount" style="font-weight:600">${t>0?b(t):`<span style="color:var(--text-muted)">—</span>`}</td>
        <td style="color:var(--text-muted);font-size:12px">${e.label}</td>
        <td style="min-width:100px">
          <div style="position:relative;height:8px;background:var(--surface2);border-radius:4px;overflow:hidden">
            <div style="position:absolute;left:0;top:0;height:100%;width:${s.toFixed(1)}%;background:#e2e8f0;border-radius:4px"></div>
            ${t>0?`<div style="position:absolute;left:0;top:0;height:100%;width:${o.toFixed(1)}%;background:${i};border-radius:4px;opacity:0.85"></div>`:``}
          </div>
        </td>
        <td><span style="font-size:11px;padding:2px 7px;border-radius:99px;background:${i}20;color:${i};font-weight:600;white-space:nowrap">${a}</span></td>
        <td style="font-size:11px;color:var(--text-muted)">${e.source}</td>
      </tr>`}).join(``);return`
    <div class="section" style="margin-bottom:20px">
      <div class="section-header">
        <div>
          <div class="section-title">Budget Benchmarks</div>
          <div class="section-subtitle">Australian household averages for ${t} adult${t===1?``:`s`}${n>0?` + ${n} child${n===1?``:`ren`}`:``} · Sources: ABS HES 2022, MoneySmart, ACCC</div>
        </div>
        <a href="/home-budget/#" onclick="activateTab('settings');return false"
           style="font-size:12px;color:var(--primary)">Edit household profile</a>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;padding:4px 20px 16px">
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">50/30/20 Rule</div>
          ${m(`Needs (housing, food, transport…)`,d,50,`#3b82f6`)}
          ${m(`Wants (dining, entertainment…)`,f,30,`#f59e0b`)}
          ${m(`Savings / investments`,p,20,`#10b981`)}
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Dashed line = target. ${e===0?`Add income to activate.`:``}</div>
        </div>
        <div style="font-size:12px;color:var(--text-muted)">
          <div style="font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px;color:var(--text-muted)">Your split vs 50/30/20</div>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            ${[{label:`Needs`,pct:d,target:50,amt:c,color:`#3b82f6`},{label:`Wants`,pct:f,target:30,amt:l,color:`#f59e0b`},{label:`Saving`,pct:p,target:20,amt:u,color:`#10b981`}].map(e=>`
              <div style="text-align:center;min-width:70px">
                <div style="font-size:22px;font-weight:800;color:${e.pct>e.target*1.1?`var(--danger)`:e.pct>=e.target*.8?e.color:`var(--text-muted)`}">${e.pct}%</div>
                <div style="font-size:11px;font-weight:600;color:var(--text-muted)">${e.label}</div>
                <div style="font-size:11px;color:var(--text-muted)">${b(e.amt)}</div>
              </div>`).join(``)}
          </div>
        </div>
      </div>

      ${h?`
      <div class="table-wrap">
        <table>
          <thead><tr><th>Category</th><th class="amount">Your spend</th><th>Benchmark range</th><th>Bar</th><th>Status</th><th>Source</th></tr></thead>
          <tbody>${h}</tbody>
        </table>
      </div>`:`<div style="padding:16px 20px;color:var(--text-muted);font-size:13px">Add expenses to see benchmark comparisons.</div>`}
    </div>`}function Ka(){Fa();let e=Va(),t=window.getMonthData(window.selectedBudgetMonth),n=O(t.income),r=O(t.expenses),i=n-r,a=n>0?Math.round(i/n*100):0,o=Ca(),c=wa(),l={};t.expenses.forEach(e=>{let t=e.category||`Other`;l[t]=(l[t]||0)+D(e)});let u=0;a>=20?u+=40:a>=10?u+=28:a>0&&(u+=14),t.income.length>1&&(u+=10),(s.goals||[]).some(e=>!e.achieved)&&(u+=15),s.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0)>0&&(u+=10),r>0&&r<n&&(u+=25);let d=u>=70?`#10b981`:u>=45?`#f59e0b`:`#ef4444`,f=u>=70?`Great shape`:u>=45?`On track`:`Needs attention`;document.getElementById(`insights-content`).innerHTML=`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap">
      <button class="btn btn-sm" onclick="prevInsightsMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${window.monthLabel(window.selectedBudgetMonth)}</span>
      <button class="btn btn-sm" onclick="nextInsightsMonth()" style="font-size:16px;padding:2px 10px">›</button>
    </div>

    <div class="cards" style="margin-bottom:24px">
      <div class="card" style="border-top:3px solid ${d}">
        <div class="card-label">Financial Health</div>
        <div class="card-value" style="color:${d}">${u}/100</div>
        <div class="card-sub">${f}</div>
      </div>
      <div class="card">
        <div class="card-label">Savings Rate</div>
        <div class="card-value ${a>=20?`green`:a>=10?`orange`:`red`}">${a}%</div>
        <div class="card-sub">${b(Math.max(i,0))}/month saved</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Surplus</div>
        <div class="card-value ${i>=0?`green`:`red`}">${b(Math.abs(i))}</div>
        <div class="card-sub">${i>=0?`available`:`overspending`}</div>
      </div>
      <div class="card">
        <div class="card-label">Income / Expenses</div>
        <div class="card-value">${b(n)}</div>
        <div class="card-sub">vs ${b(r)} out</div>
      </div>
    </div>

    ${Ga(n,o,c,l)}

    ${Ba()}

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;margin-top:4px">

      <!-- Smart insights -->
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">💡 Budget Health</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${qa(e)}
        </div>
      </div>

      <!-- AI insights panel -->
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">✨ AI Insights (Claude)</div>
        <div style="margin-bottom:12px">
          <button class="btn btn-primary" id="ai-run-btn" onclick="runAIInsights()" style="width:100%;justify-content:center">✨ Generate AI Insights</button>
        </div>
        <div id="ai-output">
          <div style="padding:32px 20px;text-align:center;color:var(--text-muted);font-size:13px;background:var(--surface2);border-radius:12px;border:1.5px dashed var(--border)">
            Click Generate to get personalised AI insights from Claude.
          </div>
        </div>
      </div>

    </div>
  `}function qa(e){let t={good:{bg:`#ecfeff`,border:`#86efac`,text:`#166534`},ok:{bg:`#eff6ff`,border:`#93c5fd`,text:`#1e40af`},warning:{bg:`#fffbeb`,border:`#fcd34d`,text:`#92400e`},alert:{bg:`#fef2f2`,border:`#fca5a5`,text:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,text:`#475569`}};return e.map(e=>{let n=t[e.level]||t.info;return`
      <div style="background:${n.bg};border:1.5px solid ${n.border};border-radius:10px;padding:14px 16px;display:flex;gap:12px;align-items:flex-start">
        <span style="font-size:20px;flex-shrink:0;line-height:1.3">${e.icon}</span>
        <div>
          <div style="font-weight:700;font-size:13px;color:${n.text};margin-bottom:3px">${g(e.title)}</div>
          <div style="font-size:12px;color:var(--text);line-height:1.5">${g(e.body)}</div>
        </div>
      </div>`}).join(``)}function Ja(){let[e,t]=window.selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t-2,1);window.selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,window.safeRender(Ka),window.safeRender(renderMoneyDashboard),window.safeRender(renderBudget)}function Ya(){let[e,t]=window.selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t,1);window.selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,window.safeRender(Ka),window.safeRender(renderMoneyDashboard),window.safeRender(renderBudget)}var Xa=`🏠.🏡.🏗️.🔑.💡.🔌.🚿.🛋️.🛏️.🪴.🍽️.🍕.🍔.🛒.🥗.🍷.☕.🍰.🥩.🧃.🚗.🚙.🚌.✈️.⛽.🚕.🏎️.🚲.🛵.🚂.👨‍👩‍👧.👶.📚.🏫.💊.🏥.💅.💆.🧴.👕.🎮.🎬.🎵.🏋️.📺.🎲.🏄.🎯.🎨.🎭.💰.💳.🏦.📈.💸.🪙.💎.📊.🏆.💼.📦.🛍️.🎁.🔧.🛠️.📱.💻.🧹.🧺.🖨️.🐕.🐈.🐠.🌱.☀️.❄️.🎄.🎂.⚽.🧸`.split(`.`);function Za(e,t){let n=document.createElement(`div`);n.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9999;display:flex;align-items:center;justify-content:center`,n.innerHTML=`
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;width:340px;max-width:95vw;box-shadow:0 8px 32px rgba(0,0,0,0.35)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <span style="font-weight:700;font-size:15px">Choose Icon</span>
        <button id="emoji-picker-close" style="background:none;border:none;cursor:pointer;font-size:20px;color:var(--text-muted);line-height:1">&times;</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:4px;max-height:220px;overflow-y:auto">
        ${Xa.map(t=>`
          <button data-emoji="${t}" style="font-size:20px;width:100%;aspect-ratio:1;border:2px solid ${t===e?`var(--primary)`:`transparent`};border-radius:6px;cursor:pointer;background:${t===e?`var(--primary)22`:`transparent`};transition:background .1s" title="${t}">${t}</button>
        `).join(``)}
      </div>
    </div>
  `,document.body.appendChild(n),n.querySelector(`#emoji-picker-close`).onclick=()=>document.body.removeChild(n),n.querySelectorAll(`[data-emoji]`).forEach(e=>{e.onclick=()=>{t(e.dataset.emoji),document.body.removeChild(n)}}),n.addEventListener(`click`,e=>{e.target===n&&document.body.removeChild(n)})}function Qa(){window.openModal(`Add Category Group`,`
    <div class="form-row">
      <div class="form-group" style="flex:0 0 auto">
        <label class="form-label">Icon</label>
        <button type="button" id="f-grp-icon-btn" style="width:56px;height:44px;font-size:24px;border:1px solid var(--border);border-radius:6px;background:var(--surface2);cursor:pointer" title="Choose icon">📦</button>
        <input type="hidden" id="f-grp-icon" value="📦">
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">Group Name</label>
        <input class="form-input" id="f-grp-name" type="text" maxlength="200" placeholder="e.g. Housing">
      </div>
    </div>
  `,()=>{let e=document.getElementById(`f-grp-icon`).value||`📦`,t=document.getElementById(`f-grp-name`).value.trim();if(!t)return;let n=k(s.categoryGroups);s.categoryGroups.push({id:n,name:t,icon:e,categories:[]}),window.logActivity(`Added category group`,t),window.saveData(s),window.closeModal(),renderSettings()}),document.getElementById(`f-grp-icon-btn`).addEventListener(`click`,()=>{let e=document.getElementById(`f-grp-icon`).value;Za(e,e=>{document.getElementById(`f-grp-icon`).value=e,document.getElementById(`f-grp-icon-btn`).textContent=e})})}function $a(e){let t=s.categoryGroups.find(t=>t.id===e);t&&Za(t.icon,t=>{to(e,`icon`,t);let n=document.getElementById(`grp-icon-btn-${e}`);n&&(n.textContent=t)})}function eo(e){let t=s.categoryGroups.find(t=>t.id===e);confirm(`Delete group "${t?t.name:``}"? Categories will become unassigned.`)&&(s.categoryGroups=s.categoryGroups.filter(t=>t.id!==e),window.logActivity(`Deleted category group`,t?t.name:``),window.saveData(s),renderSettings())}function to(e,t,n){let r=s.categoryGroups.find(t=>t.id===e);r&&(r[t]=n,window.saveData(s))}function no(e,t){if(!t)return;Ki().includes(t)||(s.expenseCategories||(s.expenseCategories=Ki().slice()),s.expenseCategories.push(t)),s.categoryGroups.forEach(e=>{e.categories=e.categories.filter(e=>e!==t)});let n=s.categoryGroups.find(t=>t.id===e);n&&n.categories.push(t),window.saveData(s),renderSettings()}function ro(e){let t=Ki(),n=new Set((s.categoryGroups||[]).filter(t=>t.id!==e).flatMap(e=>e.categories)),r=s.categoryGroups.find(t=>t.id===e),i=new Set(r?r.categories:[]),a=t.filter(e=>!i.has(e)&&!n.has(e));window.openModal(`Add Category to Group`,`
    ${a.length>0?`
    <div class="form-group" style="margin-bottom:16px">
      <label class="form-label">Pick an existing category</label>
      <div style="display:flex;flex-wrap:wrap;gap:6px" id="cat-pick-list">
        ${a.map(e=>`
          <button type="button" onclick="
            document.querySelectorAll('#cat-pick-list button').forEach(b=>b.style.background='');
            this.style.background='var(--primary)22';this.style.borderColor='var(--primary)';
            document.getElementById('f-cat-new').value='';
            document.getElementById('f-cat-selected').value=this.dataset.cat
          " data-cat="${e.replace(/"/g,`&quot;`)}" style="padding:5px 12px;border:1px solid var(--border);border-radius:20px;background:var(--surface2);font-size:13px;cursor:pointer">${e}</button>
        `).join(``)}
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="flex:1;height:1px;background:var(--border)"></div>
      <span style="font-size:12px;color:var(--text-muted)">or create new</span>
      <div style="flex:1;height:1px;background:var(--border)"></div>
    </div>
    `:`<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">All existing categories are already assigned. Create a new one below.</p>`}
    <div class="form-group">
      <label class="form-label">New category name</label>
      <input class="form-input" id="f-cat-new" type="text" maxlength="200" placeholder="e.g. Pet Care" oninput="
        if(this.value.trim()){
          document.querySelectorAll('#cat-pick-list button').forEach(b=>b.style.background='');
          document.getElementById('f-cat-selected').value='';
        }
      ">
    </div>
    <input type="hidden" id="f-cat-selected" value="">
  `,()=>{let t=document.getElementById(`f-cat-selected`).value,n=document.getElementById(`f-cat-new`).value.trim()||t;n&&(no(e,n),window.closeModal())})}function io(e,t){let n=s.categoryGroups.find(t=>t.id===e);n&&(n.categories=n.categories.filter(e=>e!==t),window.saveData(s),renderSettings())}var ao=!1,oo=null;function so(){ao||(oo=JSON.parse(JSON.stringify(s))),ao=!0;let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`flex`)}function co(){ao=!1,oo=null,window.saveData(s);let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`none`);let t=document.getElementById(`settings-save-btn`);if(t){let e=t.textContent;t.textContent=`Saved`,t.style.background=`#10b981`,setTimeout(()=>{t.textContent=e,t.style.background=``},1500)}window.renderAll()}function lo(){oo&&Object.assign(s,oo),ao=!1,oo=null;let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`none`),renderSettings()}function uo(e){ao&&(confirm(`You have unsaved changes in Settings. Save before leaving?`)?co():lo())}function fo(e,t){s.settings||(s.settings={}),s.settings[e]=t,so()}function po(){let e=document.getElementById(`settings-api-key`)?.value.trim();if(!e)return;Xe(`toto_ai_key`,e),Xe(`toto_ai_key_meta`,JSON.stringify({addedAt:new Date().toISOString(),prefix:e.slice(0,10),suffix:e.slice(-4)}));let t=document.getElementById(`api-key-status`);t&&(t.textContent=`✓ Key saved!`,t.style.color=`var(--success)`,setTimeout(()=>{t.textContent=``,t.style.color=``},2e3));let n=document.getElementById(`api-key-summary`);n&&(n.outerHTML=ho())}function mo(){confirm(`Remove saved API key? Toto and cost estimation will stop working.`)&&(Ze(`toto_ai_key`),Ze(`toto_ai_key_meta`),renderSettings())}function ho(){let e=N(`toto_ai_key`);if(!e)return`<div id="api-key-summary"></div>`;let t=JSON.parse(N(`toto_ai_key_meta`)||`{}`),n=t.addedAt?new Date(t.addedAt).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`}):`Unknown date`;return`
    <div id="api-key-summary" style="margin-top:14px;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;display:flex;align-items:center;gap:14px;max-width:480px">
      <div style="font-size:24px">🔑</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px">Active Key</div>
        <div style="font-size:13px;font-family:monospace;color:var(--text);word-break:break-all">${t.prefix?`${t.prefix}${`•`.repeat(20)}${t.suffix}`:`${e.slice(0,10)}${`•`.repeat(20)}${e.slice(-4)}`}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Added ${n} · Powers Toto chat, event cost estimation &amp; CSV import</div>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="removeApiKey()" style="color:var(--danger);flex-shrink:0">Remove</button>
    </div>`}function go(e){let t=document.getElementById(`sacc-body-${e}`),n=document.getElementById(`sacc-chev-${e}`);if(!t)return;let r=t.style.display!==`none`;t.style.display=r?`none`:`block`,n&&(n.textContent=r?`▼`:`▲`),r?_settingsOpen.delete(e):_settingsOpen.add(e)}function _o(){confirm(`Clear the entire activity log? This cannot be undone.`)&&(s.activityLog=[],window.saveData(s),renderSettings())}function vo(e){let t=document.getElementById(`new-cat-${e}`),n=(t.value||``).trim();if(!n){t.focus();return}let r=e===`expense`?s.expenseCategories:s.incomeCategories;if(r.includes(n)){alert(`That category already exists.`);return}r.push(n),window.logActivity(`Added ${e} category`,n),so(),t.value=``,renderSettings()}function yo(e,t){let n=e===`expense`?s.expenseCategories:s.incomeCategories;if(e===`expense`&&(s.budget.expenses.some(e=>e.category===t)||Object.values(s.budget.months||{}).some(e=>(e.expenses||[]).some(e=>e.category===t)))&&!confirm(`"${t}" is used by existing expenses. Remove anyway?`))return;let r=n.indexOf(t);r!==-1&&n.splice(r,1),window.logActivity(`Removed ${e} category`,t),so(),renderSettings()}function bo(e){let t=s.categoryGroups||DEFAULT_DATA.categoryGroups;s.budget.actuals[window.selectedBudgetMonth];let n=(s.colors||{}).expense||{},r=new Set(t.flatMap(e=>e.categories)),i=[...new Set(e.map(e=>e.category||`Other`))].filter(e=>!r.has(e)),a=i.length>0?[...t,{id:`ug`,name:`Ungrouped`,icon:`📋`,categories:i}]:t,o=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:4px;align-items:start">`;for(let t of a){let r=e.filter(e=>t.categories.includes(e.category||`Other`));if(r.length===0)continue;let i=r.reduce((e,t)=>e+D(t),0),a=r.reduce((e,t)=>e+window.getActual(t.id,window.selectedBudgetMonth),0),s=i>0?Math.round(a/i*100):0,c=Math.min(100,s),l=s>=100?`var(--danger)`:s>=80?`var(--warning)`:`var(--success)`,u=a>0,d=a>i&&u,f=r[0]&&r[0].category||`Other`,p=n[f]||window.colors.expense[f]||`#94a3b8`;o+=`
    <div style="background:var(--surface);border:1px solid ${d?`var(--danger)`:`var(--border)`};border-radius:10px;overflow:hidden">
      <!-- Always-visible title bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 14px;cursor:pointer;user-select:none;background:${p}22;border-bottom:3px solid ${p}" onclick="toggleGroupExpand('${t.id}')">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:20px">${t.icon}</span>
          <span style="font-weight:700;font-size:14px">${g(t.name)}</span>
          <span style="font-size:11px;color:var(--text-muted)">${r.length} item${r.length===1?``:`s`}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-weight:700;font-size:14px">${b(i)}<span style="font-size:11px;font-weight:400;color:var(--text-muted)">/mo</span></span>
          <span id="grp-arrow-${t.id}" style="color:var(--text-muted);font-size:11px;width:14px;text-align:center">▼</span>
        </div>
      </div>
      <!-- Always-visible progress bar -->
      <div style="padding:12px 14px;background:var(--surface2);border-top:1px solid var(--border)">
        <div style="background:var(--border);border-radius:99px;height:8px;overflow:hidden;margin-bottom:6px">
          <div style="height:100%;width:${c}%;background:${l};border-radius:99px"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:12px">
          <span style="color:${u?l:`var(--text-muted)`}">
            ${u?`${b(a)} spent · ${s}%${d?` — over budget!`:``}`:`No actuals entered yet`}
          </span>
          <span style="color:var(--text-muted)">${b(i)} budgeted</span>
        </div>
      </div>
      <!-- Collapsible items only -->
      <div id="grp-body-${t.id}" style="border-top:1px solid var(--border)">
        <div style="max-height:248px;overflow-y:auto">
        ${r.map(e=>{let t=D(e),r=window.getActual(e.id,window.selectedBudgetMonth),i=t>0?Math.min(100,Math.round(r/t*100)):0,a=n[e.category||`Other`]||window.colors.expense[e.category||`Other`]||`#94a3b8`,o=r>t&&r>0,s=o?`var(--danger)`:i>=80?`var(--warning)`:r>0?a:`var(--border)`;return r>0?`${b(r)}${b(t)}${i}`:`${b(t)}`,`
          <div class="expense-row" style="--row-color:${a};display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border)">
            <div style="width:4px;height:36px;border-radius:2px;background:${a};flex-shrink:0"></div>
            <div style="flex:1;min-width:0;cursor:pointer" onclick="event.stopPropagation();openEditExpense(${e.id})">
              <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g(e.name)}</div>
              <div style="font-size:11px;color:var(--text-muted)">${e.category||`Other`}${e.vendor?` · ${g(e.vendor)}`:``} · ${E(e)}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-right:4px">
              <div style="font-size:13px;font-weight:600">${b(t)}/mo</div>
              ${r>0?`<div style="font-size:11px;font-weight:600;color:${o?`var(--danger)`:i>=80?`var(--warning)`:`var(--success)`}">${b(r)} actual${o?` ▲`:``}</div>`:`<div style="font-size:11px;color:var(--text-muted);cursor:pointer" onclick="event.stopPropagation();window.editActual(${e.id})">+ add actual</div>`}
            </div>
            <div style="position:relative;flex-shrink:0;width:32px;height:32px;cursor:pointer"
                 onclick="event.stopPropagation();window.editActual(${e.id})"
                 onmouseenter="this.querySelector('svg').style.opacity='.25';this.querySelector('.ring-overlay').style.opacity='1'"
                 onmouseleave="this.querySelector('svg').style.opacity='1';this.querySelector('.ring-overlay').style.opacity='0'">
              <svg width="32" height="32" viewBox="0 0 36 36" style="transform:rotate(-90deg);transition:opacity .15s">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" stroke-width="3.5"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="${s}" stroke-width="3.5"
                  stroke-dasharray="${i} 100" stroke-linecap="round"/>
              </svg>
              <div class="ring-overlay" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;transition:opacity .15s">
                <span style="font-size:9px;font-weight:700;color:${s};line-height:1">${i}%</span>
              </div>
            </div>
          </div>`}).join(``)}
        </div>
      </div>
    </div>`}return o+=`</div>`,o}function xo(t){let n=(t.expenses||[]).filter(e=>!e.skipped);if(!n.length)return{segments:[],total:0};let r={};n.forEach(t=>{let n=t.category||`Other`,i=e(Number(t.amount)||0,t.frequency);i>0&&(r[n]=(r[n]||0)+i)});let i=Object.entries(r).map(([e,t])=>({name:e,amount:t})).sort((e,t)=>t.amount-e.amount),a=i.reduce((e,t)=>e+t.amount,0);if(a===0)return{segments:[],total:0};let o=i.slice(0,6),s=i.slice(6),c=[`#15803d`,`#16a34a`,`#22c55e`,`#65a30d`,`#84cc16`,`#a3e635`,`#94A3B8`],l=o.map((e,t)=>({name:e.name,amount:e.amount,pct:e.amount/a*100,color:c[t]||`#94A3B8`}));if(s.length){let e=s.reduce((e,t)=>e+t.amount,0);l.push({name:`Other`,amount:e,pct:e/a*100,color:c[6]})}return{segments:l,total:a}}var So={groceries:`GROC`,grocery:`GROC`,food:`FOOD`,rent:`RENT`,mortgage:`MORT`,fuel:`FUEL`,petrol:`FUEL`,transport:`TRSP`,dining:`DINE`,restaurants:`DINE`,"eating out":`DINE`,takeaway:`DINE`,utilities:`UTIL`,bills:`BILL`,electricity:`ELEC`,gas:`GAS`,water:`WATR`,internet:`NET`,phone:`PHNE`,subscriptions:`SUBS`,streaming:`SUBS`,insurance:`INSR`,health:`HLTH`,medical:`HLTH`,savings:`SAVE`,entertainment:`ENT`,travel:`TRVL`,holiday:`TRVL`,school:`EDU`,education:`EDU`,kids:`KIDS`,childcare:`KIDS`,pets:`PETS`,vehicle:`AUTO`,car:`AUTO`,household:`HSE`,clothing:`CLTH`,gifts:`GIFT`,charity:`GIVE`,other:`OTHR`};function Co(e){let t=(e||`other`).toLowerCase().trim();return So[t]?So[t]:(e||`OTHR`).replace(/[^A-Za-z]/g,``).toUpperCase().slice(0,4)||`OTHR`}function wo(e){let t=(e||``).toLowerCase();return t.includes(`groc`)||t.includes(`food`)||t.includes(`supermarket`)?`i-shopping-cart`:t.includes(`rent`)||t.includes(`mortgage`)||t.includes(`housing`)||t.includes(`home loan`)?`i-home`:t.includes(`petrol`)||t.includes(`fuel`)||t.includes(`transport`)||t.includes(`uber`)||t.includes(`parking`)||t.includes(`toll`)?`i-fuel`:t.includes(`dining`)||t.includes(`restaur`)||t.includes(`eat`)||t.includes(`takeaway`)?`i-utensils`:t.includes(`utilit`)||t.includes(`electric`)||t.includes(`gas`)||t.includes(`water`)||t.includes(`internet`)||t.includes(`phone`)||t.includes(`bill`)?`i-zap`:t.includes(`subscript`)||t.includes(`netflix`)||t.includes(`spotify`)||t.includes(`streaming`)?`i-receipt`:t.includes(`vehicle`)||t.includes(`car`)||t.includes(`rego`)||t.includes(`motor`)||t.includes(`auto`)?`i-car`:t.includes(`health`)||t.includes(`medic`)||t.includes(`pharm`)||t.includes(`doctor`)||t.includes(`dentist`)?`i-pill`:t.includes(`insur`)?`i-file-text`:t.includes(`school`)||t.includes(`education`)?`i-clipboard-check`:t.includes(`kid`)||t.includes(`child`)?`i-users`:t.includes(`pet`)?`i-paw`:t.includes(`saving`)||t.includes(`invest`)?`i-trophy`:t.includes(`travel`)||t.includes(`holiday`)?`i-palm-tree`:`i-receipt`}function To(){try{s.budget;let{income:e,expenses:t}=window.getMonthData(window.selectedBudgetMonth),n=O(e),r=O(t),i=n-r,a=t.reduce((e,t)=>e+window.getActual(t.id,window.selectedBudgetMonth),0),o=r-a,c=new Date(...selectedBudgetMonth.split(`-`).map((e,t)=>t===1?e:+e),0).getDate(),l=new Date().getDate();Math.round(l/c*100);let u=r>0?Math.round(a/r*100):0,d=window.prevMonthStr(window.selectedBudgetMonth),f=``;f+=`
    <div class="wallet-month-bar">
      <button class="wallet-month-btn" onclick="window.prevMonth()">&#8249;</button>
      <div class="wallet-month-label">${window.monthLabel(window.selectedBudgetMonth)}</div>
      <button class="wallet-month-btn" onclick="window.nextMonth()">&#8250;</button>
    </div>`,f+=`
    <div class="summary-hero" onclick="toggleBudgetDetail()">
      <div class="summary-hero-label">${i>=0?`Monthly surplus`:`Over budget`}</div>
      <div class="summary-hero-num">${b(Math.abs(i))}</div>
      <div class="summary-hero-sub">${b(n)} income · ${b(r)} expenses</div>
      <div class="summary-hero-expand" id="budget-expand-label">${Eo?`Hide details ▲`:`See breakdown ▼`}</div>
    </div>`,f+=`
    <div class="summary-mini-grid">
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:#10b981">${b(n)}</div>
        <div class="summary-mini-label">Income</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${b(r)}</div>
        <div class="summary-mini-label">Budgeted</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:${a>r?`#ef4444`:`#18181b`}">${b(a)}</div>
        <div class="summary-mini-label">Actual spent</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${u}%</div>
        <div class="summary-mini-label">of budget used</div>
      </div>
    </div>`;let p=xo({income:e,expenses:t});if(p.segments.length){let e=p.segments.map(e=>`<div style="background:${e.color};flex:${e.pct.toFixed(2)}"></div>`).join(``);p.segments.map(e=>`<div class="alloc-row">
        <div class="tdot" style="background:${e.color}"><svg viewBox="0 0 24 24"><use href="#${wo(e.name)}"/></svg></div>
        <div class="body">
          <div class="ticker">${Co(e.name)}</div>
          <div class="name">${g(e.name)}</div>
        </div>
        <div>
          <div class="pct">${Math.round(e.pct)}%</div>
          <div class="amt">${b(e.amount)}</div>
        </div>
      </div>`).join(``),f+=`<div class="alloc-section" style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:0" onclick="_allocExpanded=!_allocExpanded;renderBudget()">
        <div class="alloc-title" style="margin-bottom:0">Budget Allocation</div>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)">▼</span>
      </div>
      <div class="alloc-bar" style="margin-bottom:0">${e}</div>
      
      <div onclick="event.stopPropagation();_budgetDetailOpen=true;renderBudget();document.getElementById('budget-detail')?.scrollIntoView({behavior:'smooth',block:'start'})" style="margin-top:10px;text-align:center;font-size:12px;color:var(--iris-2);font-weight:500;cursor:pointer;font-family:var(--sans)">Manage income &amp; expenses in Detailed Breakdown ↓</div>
    </div>`}f+=`<div class="alloc-section" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:${Eo?`16px`:`0`}" onclick="toggleBudgetDetail()">
      <div class="alloc-title" style="margin-bottom:0">Detailed Breakdown</div>
      <div style="display:flex;align-items:center;gap:10px">
        <button onclick="event.stopPropagation();openCsvImport()" style="padding:5px 12px;border-radius:99px;background:var(--purple-soft);color:var(--purple);border:none;font-size:12px;font-weight:600;cursor:pointer">Import</button>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)" id="budget-expand-chevron">${Eo?`▲`:`▼`}</span>
      </div>
    </div>
    <div class="detail-panel ${Eo?`expanded`:`collapsed`}" id="budget-detail" style="margin:0 -4px">`,window.isMonthCustomized(window.selectedBudgetMonth)||(f+=`<div style="display:flex;align-items:center;justify-content:space-between;background:var(--primary-light);border:1px solid #bfdbfe;border-radius:8px;padding:10px 16px;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div>
        <span style="font-size:13px;font-weight:600;color:var(--primary)">Using default budget</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="window.copyMonthFromPrevious('${window.selectedBudgetMonth}')">
        Copy from ${window.monthLabel(d)}
      </button>
    </div>`),f+=renderBudgetForecast(window.selectedBudgetMonth,i),f+=renderBudgetSuggestions(window.selectedBudgetMonth),f+=`
    <div class="section" style="margin-bottom:20px">
      <div class="section-header">
        <div>
          <div class="section-title">Income</div>
          <div class="section-subtitle">${b(n)}/mo total</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddIncome()">+ Income</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Amount</th><th>Due</th><th>Repeats</th><th>Monthly</th><th></th></tr></thead>
          <tbody>
            ${e.length===0?`<tr><td colspan="6"><div class="empty"><div class="empty-icon">💵</div>Add your income sources</div></td></tr>`:e.map(e=>{let t=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():`<span style="color:var(--text-muted)">—</span>`,n=e.recurring===!1?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>`:``;return`<tr>
              <td style="font-weight:500;border-left:4px solid ${window.colors.income}">${g(e.name)}${n}</td>
              <td class="amount">${x(e.amount)}</td>
              <td>${t}</td>
              <td style="color:var(--text-muted)">${E(e)}</td>
              <td class="amount" style="color:var(--success)">${b(D(e))}/mo</td>
              <td class="actions">
                <button class="btn btn-ghost btn-sm" onclick="openEditIncome(${e.id})">✏️</button>
                <button class="btn btn-danger-ghost btn-sm" onclick="deleteIncome(${e.id})">🗑</button>
              </td>
            </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `;let m=[`all`,...Array.from(new Set(t.map(e=>e.category||`Other`))).sort()],h=window.expenseFilterCat===`all`?t:t.filter(e=>(e.category||`Other`)===window.expenseFilterCat),_=h.reduce((e,t)=>e+D(t),0),v=h.reduce((e,t)=>e+window.getActual(t.id,window.selectedBudgetMonth),0),y=_-v,S=window.expenseFilterCat!==`all`;f+=`
    <div class="section">
      <div class="section-header">
        <div>
          <div class="section-title">Expenses</div>
          <div class="section-subtitle">
            Budget: ${b(r)}/mo
            ${a>0?` · Actual: ${b(a)} · <span class="${o>=0?`var-under`:`var-over`}">${o>=0?`▼`:`▲`} ${b(Math.abs(o))}</span>`:``}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div style="display:flex;border:1px solid var(--border);border-radius:6px;overflow:hidden">
            <button onclick="setBudgetView('grouped')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;cursor:pointer;background:${window.budgetViewMode===`grouped`?`var(--primary)`:`var(--surface)`};color:${window.budgetViewMode===`grouped`?`#fff`:`var(--text-muted)`}">⊞ Groups</button>
            <button onclick="setBudgetView('table')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;border-left:1px solid var(--border);cursor:pointer;background:${window.budgetViewMode===`table`?`var(--primary)`:`var(--surface)`};color:${window.budgetViewMode===`table`?`#fff`:`var(--text-muted)`}">≡ Table</button>
          </div>
          ${window.budgetViewMode===`table`?`<select class="form-select" style="width:auto;padding:6px 10px;font-size:12px" onchange="window.setExpenseFilter(this.value)">
            ${m.map(e=>`<option value="${e}" ${window.expenseFilterCat===e?`selected`:``}>${e===`all`?`All categories`:e}</option>`).join(``)}
          </select>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddExpense()">+ Expense</button>
        </div>
      </div>

      <div style="padding:16px 20px">
      ${window.budgetViewMode===`grouped`?bo(t):`
        <div class="table-wrap" style="margin:0 -20px">
          <table>
            <thead>
              <tr>
                ${window.thSort(`name`,`Item`)}
                ${window.thSort(`category`,`Category`)}
                ${window.thSort(`frequency`,`Frequency`)}
                ${window.thSort(`due`,`Due`)}
                ${window.thSort(`budget`,`Budget/mo`)}
                <th>Actual <span style="font-weight:400;text-transform:none;letter-spacing:0;font-size:10px;color:var(--text-muted)">(click to edit)</span></th>
                ${window.thSort(`variance`,`Variance`)}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${h.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>${t.length===0?`Add your household expenses`:`No expenses in this category`}</div></td></tr>`:[...h].sort((e,t)=>{if(!window.expenseSortCol)return 0;let n,r;if(window.expenseSortCol===`name`)n=e.name.toLowerCase(),r=t.name.toLowerCase();else if(window.expenseSortCol===`category`)n=(e.category||`Other`).toLowerCase(),r=(t.category||`Other`).toLowerCase();else if(window.expenseSortCol===`frequency`)n=E(e),r=E(t);else if(window.expenseSortCol===`due`)n=e.dueDate||`￿`,r=t.dueDate||`￿`;else if(window.expenseSortCol===`budget`)n=D(e),r=D(t);else if(window.expenseSortCol===`actual`)n=window.getActual(e.id,window.selectedBudgetMonth),r=window.getActual(t.id,window.selectedBudgetMonth);else if(window.expenseSortCol===`variance`)n=D(e)-window.getActual(e.id,window.selectedBudgetMonth),r=D(t)-window.getActual(t.id,window.selectedBudgetMonth);else return 0;return n<r?window.expenseSortDir===`asc`?-1:1:n>r?window.expenseSortDir===`asc`?1:-1:0}).map(e=>{let t=D(e),n=window.getActual(e.id,window.selectedBudgetMonth),r=t-n,i=n>0,a;a=i?r>=0?`<span class="var-under">▼ ${b(r)}</span>`:`<span class="var-over">▲ ${b(Math.abs(r))}</span>`:`<span class="var-none">—</span>`;let o=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():`<span style="color:var(--text-muted)">—</span>`,s=window.colors.expense[e.category||`Other`]||`#94a3b8`,c=e.recurring===!1?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>`:``;return`<tr>
                        <td style="font-weight:500;border-left:4px solid ${s}">${g(e.name)}${c}${e.vendor?`<br><span style="font-size:11px;font-weight:400;color:var(--text-muted)">${g(e.vendor)}</span>`:``}</td>
                        <td><span style="display:inline-block;padding:2px 10px;border-radius:99px;background:${s};color:#fff;font-size:11px;font-weight:600;white-space:nowrap">${e.category||`Other`}</span></td>
                        <td style="color:var(--text-muted)">${E(e)}</td>
                        <td>${o}</td>
                        <td class="amount">${b(t)}</td>
                        <td class="actual-cell amount" id="actual-${e.id}" onclick="window.editActual(${e.id})">${i?b(n):`<span style="color:var(--text-muted);font-size:12px">+ add</span>`}</td>
                        <td>${a}</td>
                        <td class="actions">
                          <button class="btn btn-ghost btn-sm" onclick="openEditExpense(${e.id})">✏️</button>
                          <button class="btn btn-danger-ghost btn-sm" onclick="deleteExpense(${e.id})">🗑</button>
                        </td>
                      </tr>`}).join(``)}
            </tbody>
            ${h.length>0?`
            <tfoot>
              <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                <td colspan="4" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total ${S?window.expenseFilterCat:`all categories`}</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${b(_)}/mo</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${v>0?b(v):`—`}</td>
                <td style="padding:11px 16px;font-weight:700">${v>0?`<span class="${y>=0?`var-under`:`var-over`}">${y>=0?`▼`:`▲`} ${b(Math.abs(y))}</span>`:`—`}</td>
                <td></td>
              </tr>
            </tfoot>`:``}
          </table>
        </div>`}
      </div>
    </div>
  `,f+=`</div></div>`,document.getElementById(`budget-content`).innerHTML=f}catch(e){console.error(`renderBudget error:`,e);let t=document.getElementById(`budget-content`);t&&(t.innerHTML=`<div style="padding:24px;color:var(--alert);font-family:var(--mono);font-size:13px">Render error: ${g(e.message)}<br><small>${g(e.stack||``)}</small></div>`)}}var Eo=!1;function Do(){Eo=!Eo;let e=document.getElementById(`budget-detail`),t=document.getElementById(`budget-expand-label`),n=document.getElementById(`budget-expand-chevron`),r=e&&e.parentElement;e&&(e.classList.toggle(`collapsed`,!Eo),e.classList.toggle(`expanded`,Eo)),r&&(r.style.marginBottom=Eo?`16px`:`0`),t&&(t.textContent=Eo?`Hide details ▲`:`See breakdown ▼`),n&&(n.textContent=Eo?`▲`:`▼`)}function R(e,t,n){document.getElementById(`modal-title`).textContent=e,document.getElementById(`modal-body`).innerHTML=t,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" id="modal-save-btn">Save</button>
  `,window._modalSaveHandler=n,document.getElementById(`modal-save-btn`).onclick=()=>window._modalSaveHandler?.(),document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Oo(){window._pendingLogEntry=null,window._actualEditorRefresh=null,window._csvSuggestions=null,window._csvSuggestNames=null,document.getElementById(`modal-body`).innerHTML=``,document.getElementById(`modal-footer`).innerHTML=``,document.getElementById(`modal-overlay`).classList.add(`hidden`)}document.getElementById(`modal-overlay`).addEventListener(`click`,e=>{e.target===document.getElementById(`modal-overlay`)&&Oo()});function ko(){R(`Edit Contract Total`,`
    <div class="form-group">
      <label class="form-label">Fixed Price Contract Total (AUD)</label>
      <input class="form-input" id="f-contract-total" type="number" max="99999999" value="${s.buildContract.total}" min="0">
    </div>
  `,()=>{let e=parseFloat(document.getElementById(`f-contract-total`).value);!isNaN(e)&&e>0&&(window.logActivity(`Updated contract total`,b(e)),s.buildContract.total=e,window.saveData(s),Oo(),window.renderAll())})}function Ao(e={}){return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Stage Name</label>
        <input class="form-input" id="f-stage-name" type="text" maxlength="200" value="${_(e.name||``)}" placeholder="e.g. Base / Slab">
      </div>
      <div class="form-group">
        <label class="form-label">Amount (AUD)</label>
        <input class="form-input" id="f-stage-amount" type="number" max="99999999" value="${e.amount||``}" min="0">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Expected Date</label>
        <input class="form-input" id="f-stage-expected" type="date" value="${e.expectedDate||``}">
      </div>
      <div class="form-group">
        <label class="form-label">Paid Date</label>
        <input class="form-input" id="f-stage-paiddate" type="date" value="${e.paidDate||``}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Invoice / Ref</label>
        <input class="form-input" id="f-stage-ref" type="text" maxlength="200" value="${_(e.invoiceRef||``)}" placeholder="Optional">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="display:flex;align-items:center;gap:10px;padding-top:22px">
        <input type="checkbox" id="f-stage-paid" ${e.paid?`checked`:``}>
        <label for="f-stage-paid" style="font-size:13px;cursor:pointer">Mark as paid</label>
      </div>
      <div class="form-group">
        <label class="form-label">Funding</label>
        <select class="form-select" id="f-stage-funding">
          <option value="loan"       ${(e.funding||`loan`)===`loan`?`selected`:``}>Loan</option>
          <option value="own-funds"  ${e.funding===`own-funds`?`selected`:``}>Own Funds</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-stage-notes" type="text" maxlength="200" value="${e.notes||``}" placeholder="Optional">
    </div>
  `}function jo(e){return{id:e,name:document.getElementById(`f-stage-name`).value.trim(),amount:parseFloat(document.getElementById(`f-stage-amount`).value)||0,paid:document.getElementById(`f-stage-paid`).checked,expectedDate:document.getElementById(`f-stage-expected`).value,paidDate:document.getElementById(`f-stage-paiddate`).value,invoiceRef:document.getElementById(`f-stage-ref`).value.trim(),funding:document.getElementById(`f-stage-funding`).value,notes:document.getElementById(`f-stage-notes`).value.trim()}}function Mo(){R(`Add Contract Stage`,Ao(),()=>{let e=jo(k(s.buildContract.stages));e.name&&(window.logActivity(`Added build stage`,e.name),s.buildContract.stages.push(e),window.saveData(s),Oo(),window.renderAll())})}function No(e){let t=s.buildContract.stages.find(t=>t.id===e);R(`Edit Stage`,Ao(t),()=>{let n=jo(e);window.logActivity(`Edited build stage`,n.name||t.name),Object.assign(t,n),window.saveData(s),Oo(),window.renderAll()})}function Po(e){if(!confirm(`Delete this stage?`))return;let t=s.buildContract.stages.find(t=>t.id===e);window.logActivity(`Deleted build stage`,t?t.name:``),s.buildContract.stages=s.buildContract.stages.filter(t=>t.id!==e),window.saveData(s),window.renderAll()}function Fo(e={}){return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Variation Ref</label>
        <input class="form-input" id="f-var-ref" type="text" maxlength="200" value="${_(e.ref||``)}" placeholder="e.g. V001">
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-var-status">
          <option value="pending"  ${(e.status||`pending`)===`pending`?`selected`:``}>Pending</option>
          <option value="approved" ${e.status===`approved`?`selected`:``}>Approved</option>
          <option value="rejected" ${e.status===`rejected`?`selected`:``}>Rejected</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input class="form-input" id="f-var-name" type="text" maxlength="200" value="${_(e.name||``)}" placeholder="e.g. Tile upgrade — master bathroom">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Amount (AUD)</label>
        <input class="form-input" id="f-var-amount" type="number" max="99999999" value="${e.amount===void 0?``:e.amount}" placeholder="Use negative for credits">
      </div>
      <div class="form-group">
        <label class="form-label">Funding</label>
        <select class="form-select" id="f-var-funding">
          <option value="loan"      ${(e.funding||`loan`)===`loan`?`selected`:``}>Loan</option>
          <option value="own-funds" ${e.funding===`own-funds`?`selected`:``}>Own Funds</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Date Raised</label>
        <input class="form-input" id="f-var-raised" type="date" value="${e.dateRaised||``}">
      </div>
      <div class="form-group">
        <label class="form-label">Date Approved</label>
        <input class="form-input" id="f-var-approved" type="date" value="${e.dateApproved||``}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input class="form-input" id="f-var-notes" type="text" maxlength="200" value="${_(e.notes||``)}" placeholder="Optional">
    </div>
  `}function Io(e){return{id:e,ref:document.getElementById(`f-var-ref`).value.trim(),name:document.getElementById(`f-var-name`).value.trim(),amount:parseFloat(document.getElementById(`f-var-amount`).value)||0,status:document.getElementById(`f-var-status`).value,funding:document.getElementById(`f-var-funding`).value,dateRaised:document.getElementById(`f-var-raised`).value,dateApproved:document.getElementById(`f-var-approved`).value,notes:document.getElementById(`f-var-notes`).value.trim()}}function Lo(){R(`Add Variation`,Fo(),()=>{let e=Io(k(s.buildContract.variations));e.name&&(window.logActivity(`Added variation`,`${e.ref?e.ref+` · `:``}${e.name}`),s.buildContract.variations.push(e),window.saveData(s),renderBuild())})}function Ro(e){R(`Edit Variation`,Fo(s.buildContract.variations.find(t=>t.id===e)),()=>{let t=Io(e);if(!t.name)return;window.logActivity(`Edited variation`,`${t.ref?t.ref+` · `:``}${t.name}`);let n=s.buildContract.variations.findIndex(t=>t.id===e);n!==-1&&(s.buildContract.variations[n]=t),window.saveData(s),renderBuild()})}function zo(e){if(!confirm(`Delete this variation?`))return;let t=s.buildContract.variations.find(t=>t.id===e);window.logActivity(`Deleted variation`,t?t.name:``),s.buildContract.variations=s.buildContract.variations.filter(t=>t.id!==e),window.saveData(s),renderBuild()}var Bo=[{value:`not-quoted`,label:`Not Quoted`},{value:`quoted`,label:`Quoted`},{value:`approved`,label:`Approved`},{value:`partial`,label:`Partially Paid`},{value:`paid`,label:`Paid`}];function Vo(e={}){let t=e.status||(e.totalAmount?`approved`:`not-quoted`);return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-extra-name" type="text" maxlength="200" value="${_(e.name||``)}" placeholder="e.g. Solar">
      </div>
      <div class="form-group">
        <label class="form-label">Vendor / Contractor</label>
        <input class="form-input" id="f-extra-vendor" type="text" maxlength="200" value="${_(e.vendor||``)}" placeholder="Company name">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-extra-status">
          ${Bo.map(e=>`<option value="${e.value}" ${t===e.value?`selected`:``}>${e.label}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Due Date</label>
        <input class="form-input" id="f-extra-due" type="date" value="${e.dueDate||``}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Total Cost (AUD)</label>
        <input class="form-input" id="f-extra-total" type="number" max="99999999" value="${e.totalAmount||``}" min="0" placeholder="Leave blank if TBC">
      </div>
      <div class="form-group">
        <label class="form-label">Amount Paid (AUD)</label>
        <input class="form-input" id="f-extra-paid" type="number" max="99999999" value="${e.amountPaid||``}" min="0">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Funding</label>
        <select class="form-select" id="f-extra-funding">
          <option value="loan"      ${(e.funding||`loan`)===`loan`?`selected`:``}>Loan</option>
          <option value="own-funds" ${e.funding===`own-funds`?`selected`:``}>Own Funds</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <input class="form-input" id="f-extra-notes" type="text" maxlength="200" value="${_(e.notes||``)}" placeholder="Optional">
      </div>
    </div>
  `}function Ho(e){return{id:e,name:document.getElementById(`f-extra-name`).value.trim(),vendor:document.getElementById(`f-extra-vendor`).value.trim(),status:document.getElementById(`f-extra-status`).value,funding:document.getElementById(`f-extra-funding`).value,totalAmount:parseFloat(document.getElementById(`f-extra-total`).value)||0,amountPaid:parseFloat(document.getElementById(`f-extra-paid`).value)||0,dueDate:document.getElementById(`f-extra-due`).value,notes:document.getElementById(`f-extra-notes`).value.trim()}}function Uo(){R(`Add Outside Contract Item`,Vo(),()=>{let e=Ho(k(s.extras));e.name&&(window.logActivity(`Added extra item`,e.name),s.extras.push(e),window.saveData(s),Oo(),window.renderAll())})}function Wo(e){let t=s.extras.find(t=>t.id===e);R(`Edit Item`,Vo(t),()=>{let n=Ho(e);window.logActivity(`Edited extra item`,n.name||t.name),Object.assign(t,n),window.saveData(s),Oo(),window.renderAll()})}function Go(e){if(!confirm(`Delete this item?`))return;let t=s.extras.find(t=>t.id===e);window.logActivity(`Deleted extra item`,t?t.name:``),s.extras=s.extras.filter(t=>t.id!==e),window.saveData(s),window.renderAll()}function Ko(e={}){let t=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():``,n=[`weekly`,`fortnightly`,`monthly`,`quarterly`,`annually`,`custom`],r=e.frequency===`custom`;return`
    <div class="form-group">
      <label class="form-label">Source / Description</label>
      <input class="form-input" id="f-inc-name" type="text" maxlength="200" value="${_(e.name||``)}" placeholder="e.g. Salary — Chris">
    </div>
    <div class="form-group">
      <label class="form-label">Amount (AUD)</label>
      <input class="form-input" id="f-inc-amount" type="number" max="99999999" value="${e.amount||``}" min="0">
    </div>
    <div class="form-group">
      <label class="form-label">Frequency</label>
      <select class="form-select" id="f-inc-freq" onchange="toggleCustomFreq('inc')">
        ${n.map(t=>`<option value="${t}" ${(e.frequency||`monthly`)===t?`selected`:``}>${t===`custom`?`Custom`:t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join(``)}
      </select>
      <div id="f-inc-custom-wrap" style="display:${r?`flex`:`none`};align-items:center;gap:8px;margin-top:8px">
        <span style="font-size:13px;color:var(--text-muted);white-space:nowrap">Every</span>
        <input class="form-input" id="f-inc-custom-n" type="number" max="99999999" min="1" value="${e.customEvery||``}" style="width:70px" placeholder="e.g. 10">
        <select class="form-select" id="f-inc-custom-unit" style="flex:1">
          <option value="weeks" ${(e.customUnit||`weeks`)===`weeks`?`selected`:``}>weeks</option>
          <option value="months" ${e.customUnit===`months`?`selected`:``}>months</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Due Date</label>
      <input type="hidden" id="f-inc-duedate" value="${e.dueDate||``}">
      <div class="date-picker-wrap" id="dp-wrap">
        <div class="date-picker-trigger${e.dueDate?` has-value`:``}" id="dp-trigger" onclick="openDatePicker(event)">
          <span id="dp-display">${t||`Select a date`}</span>
          <span style="opacity:0.5;font-size:15px">&#128197;</span>
        </div>
        <div class="date-picker-popup hidden" id="dp-popup"></div>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:0">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none">
        <input type="checkbox" id="f-inc-recurring" ${e.recurring===!1?``:`checked`} style="width:16px;height:16px;cursor:pointer">
        <span style="font-size:13px;font-weight:500">Recurring — carry forward to future months</span>
      </label>
      <p style="font-size:12px;color:var(--text-muted);margin-top:4px;margin-left:24px">Uncheck for one-time income that shouldn't copy forward.</p>
    </div>
  `}function qo(e){let t=document.getElementById(`f-inc-freq`)?document.getElementById(`f-inc-freq`).value:`monthly`,n=document.getElementById(`f-inc-recurring`),r={id:e,name:document.getElementById(`f-inc-name`).value.trim(),amount:parseFloat(document.getElementById(`f-inc-amount`).value)||0,frequency:t,dueDate:document.getElementById(`f-inc-duedate`).value||null,recurring:n?n.checked:!0};return t===`custom`&&(r.customEvery=parseInt(document.getElementById(`f-inc-custom-n`).value)||1,r.customUnit=document.getElementById(`f-inc-custom-unit`).value),r}function Jo(){R(`Add Income`,Ko(),()=>{let e=qo(k(window.getMonthData(window.selectedBudgetMonth).income));e.name&&(window.logActivity(`Added income`,e.name),window.confirmScope(()=>{let t=window.ensureMonthOverride(window.selectedBudgetMonth);e.id=k(t.income),t.income.push(e),window.saveData(s),window.renderAll()},()=>{e.id=k(s.budget.income),s.budget.income.push(e),window.saveData(s),window.renderAll()}))})}function Yo(e){let t=window.getMonthData(window.selectedBudgetMonth).income.find(t=>t.id===e);R(`Edit Income`,Ko(t),()=>{let n=qo(e);window.logActivity(`Edited income`,n.name||t&&t.name||``),window.confirmScope(()=>{let t=window.ensureMonthOverride(window.selectedBudgetMonth),r=t.income.find(t=>t.id===e);r?Object.assign(r,n):t.income.push(n),window.saveData(s),window.renderAll()},()=>{let t=s.budget.income.find(t=>t.id===e);t&&Object.assign(t,n),window.saveData(s),window.renderAll()})})}function Xo(e){let t=window.getMonthData(window.selectedBudgetMonth).income.find(t=>t.id===e),n=t?t.name:`this income`;window.logActivity(`Deleted income`,n),window._scopePending=null,document.getElementById(`modal-title`).textContent=`Delete income`,document.getElementById(`modal-body`).innerHTML=`
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Delete <strong style="color:var(--text)">${n}</strong>? Apply to
      <strong style="color:var(--text)">${window.monthLabel(window.selectedBudgetMonth)}</strong> only,
      or remove from all months?
    </p>`,window._scopePending={onThisMonth:()=>{let t=window.ensureMonthOverride(window.selectedBudgetMonth);t.income=t.income.filter(t=>t.id!==e),window.saveData(s),window.renderAll()},onAllMonths:()=>{s.budget.income=s.budget.income.filter(t=>t.id!==e),s.budget.months&&Object.values(s.budget.months).forEach(t=>{t.income=t.income.filter(t=>t.id!==e)}),window.saveData(s),window.renderAll()}},document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="window.doScopeAll()">Remove from all months</button>
    <button class="btn btn-danger" onclick="window.doScopeMonth()">Delete from ${window.monthLabel(window.selectedBudgetMonth)}</button>
  `,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Zo(e={}){let t=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():``,n=[`weekly`,`fortnightly`,`monthly`,`quarterly`,`annually`,`custom`],r=e.frequency===`custom`;return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Description</label>
        <input class="form-input" id="f-exp-name" type="text" maxlength="200" value="${_(e.name||``)}" placeholder="e.g. Mortgage">
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="f-exp-cat">
          ${expenseCategories().map(t=>`<option value="${t}" ${(e.category||`Other`)===t?`selected`:``}>${t}</option>`).join(``)}
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Vendor <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="f-exp-vendor" type="text" maxlength="200" value="${_(e.vendor||``)}" placeholder="e.g. ANZ, Woolworths, Netflix">
    </div>
    <div class="form-group">
      <label class="form-label">Amount (AUD)</label>
      <input class="form-input" id="f-exp-amount" type="number" max="99999999" value="${e.amount||``}" min="0">
    </div>
    <div class="form-group">
      <label class="form-label">Frequency</label>
      <select class="form-select" id="f-exp-freq" onchange="toggleCustomFreq('exp')">
        ${n.map(t=>`<option value="${t}" ${(e.frequency||`monthly`)===t?`selected`:``}>${t===`custom`?`Custom`:t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join(``)}
      </select>
      <div id="f-exp-custom-wrap" style="display:${r?`flex`:`none`};align-items:center;gap:8px;margin-top:8px">
        <span style="font-size:13px;color:var(--text-muted);white-space:nowrap">Every</span>
        <input class="form-input" id="f-exp-custom-n" type="number" max="99999999" min="1" value="${e.customEvery||``}" style="width:70px" placeholder="e.g. 10">
        <select class="form-select" id="f-exp-custom-unit" style="flex:1">
          <option value="weeks" ${(e.customUnit||`weeks`)===`weeks`?`selected`:``}>weeks</option>
          <option value="months" ${e.customUnit===`months`?`selected`:``}>months</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Due Date</label>
      <input type="hidden" id="f-exp-duedate" value="${e.dueDate||``}">
      <div class="date-picker-wrap" id="dp-wrap">
        <div class="date-picker-trigger${e.dueDate?` has-value`:``}" id="dp-trigger" onclick="openDatePicker(event)">
          <span id="dp-display">${t||`Select a date`}</span>
          <span style="opacity:0.5;font-size:15px">&#128197;</span>
        </div>
        <div class="date-picker-popup hidden" id="dp-popup"></div>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:0">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none">
        <input type="checkbox" id="f-exp-recurring" ${e.recurring===!1?``:`checked`} style="width:16px;height:16px;cursor:pointer">
        <span style="font-size:13px;font-weight:500">Recurring — carry forward to future months</span>
      </label>
      <p style="font-size:12px;color:var(--text-muted);margin-top:4px;margin-left:24px">Uncheck for one-time expenses that shouldn't copy forward.</p>
    </div>
  `}function Qo(e){let t=document.getElementById(`f-exp-freq`)?document.getElementById(`f-exp-freq`).value:`monthly`,n=document.getElementById(`f-exp-recurring`),r={id:e,name:document.getElementById(`f-exp-name`).value.trim(),category:document.getElementById(`f-exp-cat`).value,vendor:(document.getElementById(`f-exp-vendor`)?.value||``).trim()||null,amount:parseFloat(document.getElementById(`f-exp-amount`).value)||0,frequency:t,dueDate:document.getElementById(`f-exp-duedate`).value||null,recurring:n?n.checked:!0};return t===`custom`&&(r.customEvery=parseInt(document.getElementById(`f-exp-custom-n`).value)||1,r.customUnit=document.getElementById(`f-exp-custom-unit`).value),r}function $o(e){let t=document.getElementById(`f-${e}-freq`).value,n=document.getElementById(`f-${e}-custom-wrap`);n&&(n.style.display=t===`custom`?`flex`:`none`)}function es(){R(`Add Expense`,Zo(),()=>{let e=Qo(k(window.getMonthData(window.selectedBudgetMonth).expenses));e.name&&(window.logActivity(`Added expense`,`${e.name} (${e.category||`Other`})`),window.confirmScope(()=>{let t=window.ensureMonthOverride(window.selectedBudgetMonth);e.id=k(t.expenses),t.expenses.push(e),window.saveData(s),window.renderAll()},()=>{if(e.id=k(s.budget.expenses),s.budget.expenses.push(e),window.isMonthCustomized(window.selectedBudgetMonth)){let t=s.budget.months[window.selectedBudgetMonth];t.expenses.push({...e,id:k(t.expenses)})}window.saveData(s),window.renderAll()}))})}function ts(e){let t=window.getMonthData(window.selectedBudgetMonth).expenses.find(t=>t.id===e);R(`Edit Expense`,Zo(t),()=>{let n=Qo(e);window.logActivity(`Edited expense`,`${n.name||t&&t.name||``} (${n.category||`Other`})`),window.confirmScope(()=>{let t=window.ensureMonthOverride(window.selectedBudgetMonth),r=t.expenses.find(t=>t.id===e);r?Object.assign(r,n):t.expenses.push(n),window.saveData(s),window.renderAll()},()=>{let t=s.budget.expenses.find(t=>t.id===e);if(t&&Object.assign(t,n),window.isMonthCustomized(window.selectedBudgetMonth)){let t=s.budget.months[window.selectedBudgetMonth].expenses.find(t=>t.id===e);t&&Object.assign(t,n)}window.saveData(s),window.renderAll()})});let n=document.createElement(`button`);n.className=`btn btn-danger`,n.textContent=`Delete`,n.style.marginRight=`auto`,n.onclick=()=>{Oo(),ns(e)};let r=document.getElementById(`modal-footer`);r.insertBefore(n,r.firstChild)}function ns(e){let t=window.getMonthData(window.selectedBudgetMonth).expenses.find(t=>t.id===e),n=t?t.name:`this expense`;window.logActivity(`Deleted expense`,n),window._scopePending={onThisMonth:()=>{let t=window.ensureMonthOverride(window.selectedBudgetMonth);t.expenses=t.expenses.filter(t=>t.id!==e),window.saveData(s),window.renderAll()},onAllMonths:()=>{s.budget.expenses=s.budget.expenses.filter(t=>t.id!==e),s.budget.months&&Object.values(s.budget.months).forEach(t=>{t.expenses=t.expenses.filter(t=>t.id!==e)}),window.saveData(s),window.renderAll()}},document.getElementById(`modal-title`).textContent=`Delete expense`,document.getElementById(`modal-body`).innerHTML=`
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Delete <strong style="color:var(--text)">${n}</strong>? Apply to
      <strong style="color:var(--text)">${window.monthLabel(window.selectedBudgetMonth)}</strong> only,
      or remove from all months?
    </p>`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="window.doScopeAll()">Remove from all months</button>
    <button class="btn btn-danger" onclick="window.doScopeMonth()">Delete from ${window.monthLabel(window.selectedBudgetMonth)}</button>
  `,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function rs(){return document.getElementById(`f-exp-duedate`)||document.getElementById(`f-inc-duedate`)}function is(e){e.stopPropagation();let t=document.getElementById(`dp-popup`);if(!t)return;let n=(rs()||{}).value||``;if(n)[window.dpViewYear,window.dpViewMonth]=n.split(`-`).map(Number);else{let e=new Date;window.dpViewYear=e.getFullYear(),window.dpViewMonth=e.getMonth()+1}t.classList.remove(`hidden`),as();function r(e){let n=document.getElementById(`dp-wrap`);n&&!n.contains(e.target)?t.classList.add(`hidden`):document.addEventListener(`click`,r,{once:!0})}document.addEventListener(`click`,r,{once:!0})}function as(){let e=document.getElementById(`dp-popup`);if(!e)return;let t=window.dpViewYear,n=window.dpViewMonth,r=new Date(t,n-1,1).getDay(),i=new Date(t,n,0).getDate(),a=new Date,o=(rs()||{}).value||``,s=`
    <div class="dp-nav">
      <button class="dp-nav-btn" onclick="dpPrevMonth(event)">&#8249;</button>
      <span class="dp-month-label">${new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</span>
      <button class="dp-nav-btn" onclick="dpNextMonth(event)">&#8250;</button>
    </div>
    <div class="dp-grid">
      ${[`S`,`M`,`T`,`W`,`T`,`F`,`S`].map(e=>`<div class="dp-day-hdr">${e}</div>`).join(``)}
  `;for(let e=0;e<r;e++)s+=`<div class="dp-day dp-other"></div>`;for(let e=1;e<=i;e++){let r=`${t}-${String(n).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,i=[`dp-day`,a.getFullYear()===t&&a.getMonth()+1===n&&a.getDate()===e?`dp-today`:``,o===r?`dp-selected`:``].filter(Boolean).join(` `);s+=`<div class="${i}" onclick="dpSelectDate('${r}',event)">${e}</div>`}s+=`</div>`,o&&(s+=`<div class="dp-clear"><button class="dp-clear-btn" onclick="dpClearDate(event)">Clear date</button></div>`),e.innerHTML=s}function os(e){e.stopPropagation(),window.dpViewMonth===1?(window.dpViewMonth=12,window.dpViewYear--):window.dpViewMonth--,as()}function ss(e){e.stopPropagation(),window.dpViewMonth===12?(window.dpViewMonth=1,window.dpViewYear++):window.dpViewMonth++,as()}function cs(e,t){t&&t.stopPropagation();let n=rs();n&&(n.value=e);let[r,i,a]=e.split(`-`);document.getElementById(`dp-display`).textContent=`${a}/${i}/${r}`,document.getElementById(`dp-trigger`).classList.add(`has-value`),document.getElementById(`dp-popup`).classList.add(`hidden`);let o=document.getElementById(`dp-repeats-wrap`);o&&(o.style.display=``)}function ls(e){e.stopPropagation();let t=rs();t&&(t.value=``),document.getElementById(`dp-display`).textContent=`Select a date`,document.getElementById(`dp-trigger`).classList.remove(`has-value`),document.getElementById(`dp-popup`).classList.add(`hidden`);let n=document.getElementById(`dp-repeats-wrap`);n&&(n.style.display=`none`)}var z=[],B=[];function us(){document.getElementById(`modal-title`).textContent=`Import Bank Transactions`,document.getElementById(`modal-body`).innerHTML=`
    <div style="padding:4px 0">
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">
        Upload a CSV exported from your bank. Works with ANZ, CBA, Westpac, NAB and most Australian banks.
        Transactions will be matched to your <strong>${window.monthLabel(window.selectedBudgetMonth)}</strong> budget categories.
      </p>
      <label style="display:flex;flex-direction:column;align-items:center;justify-content:center;
        border:2px dashed var(--border);border-radius:12px;padding:32px 16px;cursor:pointer;
        gap:8px;background:var(--surface2);transition:border-color 0.15s"
        onmouseover="this.style.borderColor='var(--primary)'"
        onmouseout="this.style.borderColor='var(--border)'">
        <span style="font-size:32px">📄</span>
        <span style="font-weight:600;font-size:14px">Choose CSV file</span>
        <span style="font-size:12px;color:var(--text-muted)">or drag and drop</span>
        <input type="file" accept=".csv,.txt" style="display:none" onchange="handleCsvFile(event)">
      </label>
      <div id="csv-parse-status" style="display:none;margin-top:12px;font-size:13px;color:var(--danger)"></div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`<button class="btn" onclick="window.closeModal()">Cancel</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function ds(e){function t(e){let t=[],n=``,r=!1;for(let i of e)i===`"`?r=!r:i===`,`&&!r?(t.push(n.trim()),n=``):n+=i;return t.push(n.trim()),t.map(e=>e.replace(/^"|"$/g,``).trim())}let n=e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>2);if(n.length<2)return null;let r=0;for(let e=0;e<Math.min(6,n.length);e++)if(/date/i.test(n[e])){r=e;break}let i=t(n[r]).map(e=>e.toLowerCase()),a=i.findIndex(e=>/date/.test(e)),o=i.findIndex(e=>/desc|detail|narrat|payee|merchant|particular/.test(e)),s=i.findIndex(e=>/^amount$|^amt$/.test(e)),c=i.findIndex(e=>/^debit$|withdrawal|^debit amount/.test(e)),l=i.findIndex(e=>/^category$/.test(e)),u=i.findIndex(e=>/^subcategory$/.test(e));if(a===-1||o===-1&&s===-1&&c===-1)return null;let d=[];for(let e=r+1;e<n.length;e++){let r=t(n[e]);if(r.length<2)continue;let i=(r[a]||``).trim(),f=o===-1?``:(r[o]||``).trim();if(!f)continue;let p=f.replace(/^(Visa Purchase|Eftpos Debit|Osko Deposit|Internet Deposit|Debit Interest|Direct Debit|Direct Credit)\s+/i,``).replace(/^\d{2}[A-Za-z]{3}[\d:]*\s+/,``).replace(/\s{2,}/g,` `).trim()||f,m=0;if(c!==-1){let e=parseFloat((r[c]||``).replace(/[^0-9.]/g,``));!isNaN(e)&&e>0&&(m=e)}else if(s!==-1){let e=parseFloat((r[s]||``).replace(/[^0-9.-]/g,``));!isNaN(e)&&e<0&&(m=Math.abs(e))}let h=[l===-1?``:(r[l]||``).trim(),u===-1?``:(r[u]||``).trim()].filter(Boolean).join(` > `)||``;m>0&&d.push({date:i,description:p,amount:m,bankCat:h})}return d.length?d:null}async function fs(e){let t=e.target.files[0];if(!t)return;let n=ds(await t.text()),r=document.getElementById(`csv-parse-status`);if(!n){r&&(r.textContent=`Couldn't detect transactions. Check it's a bank CSV with a header row containing 'Date'.`,r.style.display=``);return}z=n,ps()}function ps(){let e=!!window._secureGet(`toto_ai_key`),t=z.slice(0,5);document.getElementById(`modal-body`).innerHTML=`
    <div>
      <div style="background:var(--success-light);border:1px solid #6ee7b7;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:13px;color:#155e75">
        Found <strong>${z.length} expense transactions</strong> in your CSV
      </div>
      <div class="table-wrap" style="margin-bottom:16px">
        <table>
          <thead><tr><th>Date</th><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
          <tbody>
            ${t.map(e=>`<tr>
              <td style="color:var(--text-muted);font-size:12px;white-space:nowrap">${e.date}</td>
              <td style="font-weight:500">${g(e.description)}</td>
              <td class="amount">${x(e.amount)}</td>
            </tr>`).join(``)}
            ${z.length>5?`<tr><td colspan="3" style="text-align:center;color:var(--text-muted);font-size:12px;padding:8px">+ ${z.length-5} more rows…</td></tr>`:``}
          </tbody>
        </table>
      </div>
      ${e?``:`<div style="background:var(--warning-light);border:1px solid #fde68a;border-radius:8px;padding:10px 14px;font-size:13px;color:#92400e">
        ⚠ No API key — go to Settings › AI Assistant to enable auto-categorisation.
      </div>`}
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    ${e?`<button class="btn btn-primary" onclick="runCsvCategorise()">Categorise with AI →</button>`:`<button class="btn btn-primary" onclick="_renderCsvReview(null)">Assign Manually →</button>`}`}async function ms(){let e=window._secureGet(`toto_ai_key`);if(!e){hs(null);return}document.getElementById(`modal-body`).innerHTML=`
    <div style="text-align:center;padding:48px 16px">
      <div style="font-size:32px;margin-bottom:12px">🤖</div>
      <div style="font-weight:600;margin-bottom:6px">Categorising ${z.length} transactions…</div>
      <div style="font-size:12px;color:var(--text-muted)">Matching to your ${window.monthLabel(window.selectedBudgetMonth)} budget categories</div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=``;let t=window.getMonthData(window.selectedBudgetMonth).expenses.map(e=>`${e.id}: ${e.name}${e.category?` (`+e.category+`)`:``}`).join(`
`),n=z.some(e=>e.bankCat),r,i;if(window._csvSuggestions={},n){let e={};z.forEach((t,n)=>{let r=t.bankCat||`Other`;e[r]||(e[r]={bankCat:r,indices:[],sample:t.description}),e[r].indices.push(n)});let t=Object.values(e);r=t.map((e,t)=>({idx:t,bankCategory:e.bankCat,sample:e.sample})),i=e=>{let n={};return e.forEach(e=>{let r=t[e.idx];r&&r.indices.forEach(t=>{n[t]=e.expenseId,e.suggest&&(_csvSuggestions[t]=e.suggest)})}),n}}else{let e={};z.forEach((t,n)=>{let r=t.description.toUpperCase().replace(/\s+/g,` `).trim();e[r]||(e[r]={desc:t.description,indices:[]}),e[r].indices.push(n)});let t=Object.values(e);r=t.map((e,t)=>({idx:t,description:e.desc})),i=e=>{let n={};return e.forEach(e=>{let r=t[e.idx];r&&r.indices.forEach(t=>{n[t]=e.expenseId,e.suggest&&(_csvSuggestions[t]=e.suggest)})}),n}}let a=n?`bank categories`:`unique transaction descriptions`,o=`You are categorising Australian bank transactions for a family budget app.

The user's EXISTING budget expense categories (id: name):
${t||`(none yet)`}

Here are ${r.length} ${a} from their bank statement (${z.length} total transactions):
${JSON.stringify(r)}

For EACH item:
- If it matches an existing expense, use that expenseId
- If no existing expense fits, use expenseId -1 AND include a "suggest" field with a short category name to create (e.g. "Groceries", "Dining Out", "Transport", "Parking")
- For bank transfers, deposits, ATM withdrawals, fees → use expenseId -1 with NO suggest (genuinely skip these)

IMPORTANT: Return ONLY raw JSON array, no markdown, no code fences:
[{"idx":0,"expenseId":3},{"idx":1,"expenseId":-1,"suggest":"Dining Out"},{"idx":2,"expenseId":-1}]`;try{let t=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":e,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:4096,messages:[{role:`user`,content:o}]})});if(!t.ok)throw Error(`API error ${t.status}`);let n=(await t.json()).content[0].text.replace(/```[\w]*\n?/g,``).trim().match(/\[[\s\S]*\]/);if(!n)throw Error(`No JSON in response`);let r=JSON.parse(n[0]);hs(i(r))}catch(e){document.getElementById(`modal-body`).innerHTML=`
      <div style="padding:8px">
        <div style="color:var(--danger);margin-bottom:10px">⚠ ${e.message}</div>
        <p style="font-size:13px;color:var(--text-muted)">You can still assign categories manually below.</p>
      </div>`,document.getElementById(`modal-footer`).innerHTML=`
      <button class="btn" onclick="window.closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="_renderCsvReview(null)" style="margin-left:8px">Assign Manually →</button>`}}function hs(e){let t=window.getMonthData(window.selectedBudgetMonth).expenses,n=z.some(e=>e.bankCat),r=z.map((t,n)=>({...t,idx:n,expenseId:e?e[n]??-1:-1})),i={};r.forEach(e=>{let t=n?e.bankCat||`Other`:String(e.expenseId);i[t]||(i[t]={key:t,txns:[],total:0}),i[t].txns.push(e),i[t].total+=e.amount});let a={},o=-100,s=window._csvSuggestions||{};B=Object.values(i).map((t,r)=>{let i=-1,c=``;if(e){let e={};t.txns.forEach(t=>{let n=t.expenseId;n!=null&&n!==-1&&(e[n]=(e[n]||0)+1)});let n=Object.entries(e).sort((e,t)=>t[1]-e[1])[0];if(n&&(i=parseInt(n[0])),i===-1){let e={};t.txns.forEach(t=>{let n=s[t.idx];n&&(e[n]=(e[n]||0)+1)});let n=Object.entries(e).sort((e,t)=>t[1]-e[1])[0];n&&(c=n[0],a[c]||(a[c]=o--),i=a[c])}}return{gIdx:r,expenseId:i,suggest:c,total:Math.round(t.total*100)/100,count:t.txns.length,txns:t.txns,descs:[...new Set(t.txns.map(e=>e.description))].slice(0,4),label:n?t.key:null,checked:i!==-1}}).sort((e,t)=>t.total-e.total),window._csvSuggestNames={},Object.entries(a).forEach(([e,t])=>{window._csvSuggestNames[t]=e});function c(e,n){let r=`<option value="-1"${e===-1?` selected`:``}>— Skip —</option>`;return Object.entries(a).forEach(([t,n])=>{r+=`<option value="${n}"${e===n?` selected`:``}>➕ Create: ${g(t)}</option>`}),r+=t.map(t=>`<option value="${t.id}"${t.id===e?` selected`:``}>${g(t.name)}</option>`).join(``),r}let l=B.map((e,t)=>{let n=e.descs.join(`, `)+(e.count>e.descs.length?` +${e.count-e.descs.length} more`:``),r=e.label?`<div style="font-size:11px;font-weight:600;color:var(--primary);margin-bottom:2px">${g(e.label)}</div>`:``;return`<tr>
      <td style="width:36px;padding:6px 8px"><input type="checkbox" id="csv-chk-${t}" ${e.checked?`checked`:``} onchange="_csvToggle(${t},this.checked)"></td>
      <td>${r}<select style="font-size:12px;border:1px solid var(--border);border-radius:6px;padding:3px 6px;background:var(--surface);max-width:160px"
          onchange="_csvSetExpense(${t},+this.value)">${c(e.expenseId)}</select></td>
      <td style="font-size:12px;text-align:center;font-weight:600">${e.count}</td>
      <td style="font-size:11px;color:var(--text-muted);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escAttr(n)}">${g(n)}</td>
      <td class="amount" style="white-space:nowrap;font-weight:600">${x(e.total)}</td>
    </tr>`}).join(``),u=e?`<div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">🤖 Transactions grouped by category — review and adjust as needed.</div>`:``,d=B.filter(e=>e.checked&&e.expenseId!==-1).length,f=B.filter(e=>e.checked&&e.expenseId!==-1).reduce((e,t)=>e+t.count,0);document.getElementById(`modal-body`).innerHTML=`
    <div>
      ${u}
      <div class="table-wrap" style="max-height:340px;overflow-y:auto">
        <table>
          <thead><tr>
            <th style="width:36px"><input type="checkbox" checked onchange="_csvToggleAll(this.checked)"></th>
            <th>Category</th><th style="text-align:center">Txns</th><th>Descriptions</th><th style="text-align:right">Total</th>
          </tr></thead>
          <tbody>${l}</tbody>
        </table>
      </div>
    </div>`;let p=B.filter(e=>e.checked&&e.expenseId===-1).length;document.getElementById(`modal-footer`).innerHTML=`
    <div style="display:flex;flex-direction:column;gap:6px;width:100%">
      <div id="csv-pending-note" style="font-size:12px;color:var(--warning);text-align:right">${p>0?`${p} checked group${p===1?``:`s`} still need a category assigned`:``}</div>
      <div style="display:flex;justify-content:flex-end;gap:10px">
        <button class="btn" onclick="window.closeModal()">Cancel</button>
        <button class="btn btn-primary" id="csv-apply-btn" onclick="applyCsvImport()"${d===0?` disabled`:``}>
          Apply ${d} group${d===1?``:`s`} (${f} txns)
        </button>
      </div>
    </div>`}function gs(e,t){B[e].checked=t,ys()}function _s(e){B.forEach((t,n)=>{t.checked=e;let r=document.getElementById(`csv-chk-${n}`);r&&(r.checked=e)}),ys()}function vs(e,t){B[e].expenseId=t,B[e].checked=!0;let n=document.getElementById(`csv-chk-${e}`);n&&(n.checked=!0),ys()}function ys(){let e=B.filter(e=>e.checked&&e.expenseId!==-1),t=B.filter(e=>e.checked&&e.expenseId===-1),n=e.length,r=e.reduce((e,t)=>e+t.count,0),i=document.getElementById(`csv-apply-btn`);i&&(i.textContent=`Apply ${n} group${n===1?``:`s`} (${r} txns)`,i.disabled=n===0);let a=document.getElementById(`csv-pending-note`);a&&(a.textContent=t.length>0?`${t.length} checked group${t.length===1?``:`s`} still need a category assigned`:``)}function bs(){let e=B.filter(e=>e.checked&&e.expenseId!==-1);if(!e.length){window.closeModal();return}s.budget.actuals[window.selectedBudgetMonth]||(s.budget.actuals[window.selectedBudgetMonth]={});let t=window._csvSuggestNames||{},n={};e.forEach(e=>{let r=e.expenseId;if(r<-1&&t[r]){if(!n[r]){let e={id:nextId(s.budget.expenses),name:t[r],amount:0,frequency:`monthly`,category:t[r],dueDate:``,vendor:null};if(s.budget.expenses.push(e),window.isMonthCustomized(window.selectedBudgetMonth)){let t=s.budget.months[window.selectedBudgetMonth];t.expenses.push({...e,id:nextId(t.expenses)}),n[r]=t.expenses[t.expenses.length-1].id}else n[r]=e.id}r=n[r]}let i=window.getActualEntries(r,window.selectedBudgetMonth),a=i.length?Math.max(...i.map(e=>e.id))+1:1,o=e.descs.join(`, `)+(e.count>e.descs.length?` +${e.count-e.descs.length} more`:``);i.push({id:a,amount:e.total,date:e.txns[0].date,note:`${e.count} transactions: ${o}`}),s.budget.actuals[window.selectedBudgetMonth][r]=i}),window.saveData(s),window.closeModal(),window.renderAll()}function xs(){Cs(),document.getElementById(`qa-overlay`).classList.add(`open`),requestAnimationFrame(()=>document.getElementById(`qa-sheet`).classList.add(`open`))}function Ss(){document.getElementById(`qa-sheet`).classList.remove(`open`),document.getElementById(`qa-overlay`).classList.remove(`open`)}function Cs(){document.getElementById(`qa-sheet`).innerHTML=`
    <div class="qa-handle"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px 4px">
      <span style="font-size:17px;font-weight:700;color:var(--ink);font-family:var(--sans)">Quick Add</span>
      <button onclick="closeQuickAdd()" style="background:none;border:none;font-size:24px;color:var(--muted);cursor:pointer;line-height:1;padding:4px">×</button>
    </div>

    <div class="qah-input-label">What would you like to do?</div>
    <div class="qah-input-row">
      <input id="qah-text" type="text" class="qah-bare" placeholder="e.g. coffee $4.50 · dentist 3rd June 2pm · pay electricity"
        onkeydown="if(event.key==='Enter')_qahSendText()">
      <button class="qah-ai-send" onclick="_qahSendText()" title="Submit">↑</button>
    </div>

    <div class="qah-grid">
      <div class="qah-tile" onclick="_qahAction('event')">
        <div class="qah-tile-icon" style="background:#EEF2FF">📅</div>
        <div class="qah-tile-label">Create Event</div>
        <div class="qah-tile-sub">Planner</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('expense')">
        <div class="qah-tile-icon" style="background:#FEF9C3">💸</div>
        <div class="qah-tile-label">Log Expense</div>
        <div class="qah-tile-sub">Wallet</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('income')">
        <div class="qah-tile-icon" style="background:#ECFDF5">💰</div>
        <div class="qah-tile-label">Add Income</div>
        <div class="qah-tile-sub">Wallet</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('bill')">
        <div class="qah-tile-icon" style="background:#FFF7ED">🧾</div>
        <div class="qah-tile-label">Enter Bill</div>
        <div class="qah-tile-sub">Wallet</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('chore')">
        <div class="qah-tile-icon" style="background:#F0FDF4">🧹</div>
        <div class="qah-tile-label">Create Chore</div>
        <div class="qah-tile-sub">Home</div>
      </div>
      <div class="qah-tile" onclick="_qahAction('shopping')">
        <div class="qah-tile-icon" style="background:#F0F9FF">🛒</div>
        <div class="qah-tile-label">Shopping List</div>
        <div class="qah-tile-sub">Meals</div>
      </div>
    </div>

    <div class="qah-ask-row" onclick="_qahAction('ai')">
      <div class="qah-ask-icon">🐕</div>
      <div>
        <div class="qah-ask-label">Ask Toto</div>
        <div class="qah-ask-sub">Chat with your AI family assistant</div>
      </div>
    </div>
    <div style="height:max(12px,env(safe-area-inset-bottom))"></div>`,requestAnimationFrame(()=>document.getElementById(`qah-text`)?.focus())}function ws(e){Ss(),setTimeout(()=>{if(e===`event`)activateTab(`planner`),setTimeout(()=>openPlannerModal(null,new Date().toISOString().slice(0,10)),300);else if(e===`expense`){let e=window.getMonthData(window.selectedBudgetMonth).expenses,t=parseInt(window._secureGet(`toto_qa_last`)||`0`);_qaExpenseId=e.find(e=>e.id===t)?.id??e[0]?.id??null,_qaAmount=``,Ds(e),document.getElementById(`qa-overlay`).classList.add(`open`),requestAnimationFrame(()=>document.getElementById(`qa-sheet`).classList.add(`open`))}else e===`income`?(activateTab(`budget`),setTimeout(()=>openAddIncome(),300)):e===`bill`?(activateTab(`bills`),setTimeout(()=>openBillModal(),300)):e===`chore`?(activateTab(`kids`),setTimeout(()=>{typeof renderChoreMgmt==`function`&&renderChoreMgmt()},300)):e===`shopping`?(window._listsActiveType=`food`,window._listsView=`list`,activateTab(`lists`)):e===`ai`&&typeof toggleTotoAssistant==`function`&&toggleTotoAssistant()},320)}async function Ts(){let e=document.getElementById(`qah-text`)?.value.trim();if(!e){ws(`ai`);return}let t=document.querySelector(`.qah-ai-send`);t&&(t.textContent=`…`,t.disabled=!0);let n=`Today is ${new Date().toISOString().slice(0,10)}. The user typed: "${e}"

Parse this into a structured action. Return ONLY raw JSON, no markdown.

Respond with one of these shapes:
{"type":"event","title":"...","date":"YYYY-MM-DD","time":"HH:MM"}
{"type":"expense","amount":0.00,"note":"..."}
{"type":"income","name":"...","amount":0.00}
{"type":"bill","name":"...","amount":0.00,"dueDate":"YYYY-MM-DD"}
{"type":"chore","name":"..."}
{"type":"shopping","name":"...","qty":"..."}
{"type":"unknown"}

Rules:
- If it mentions an appointment, meeting, event, or a date/time → event
- If it mentions spending, buying, paid, cost, $amount with no income context → expense
- If it mentions salary, earned, received, payment in → income
- If it mentions a bill, subscription, due, invoice → bill
- If it mentions a chore, task, clean, tidy, fix → chore
- If it mentions grocery, buy at store, shopping item → shopping
- Dates like "3rd June" = 2026-06-03, "next Monday" = calculate from today
- Times like "2pm" = "14:00"
- If genuinely unclear → unknown`;try{let t=s.settings?.claudeApiKey,r=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:150,messages:[{role:`user`,content:n}]})})).json()).content?.[0]?.text?.trim()||`{"type":"unknown"}`,i=JSON.parse(r.replace(/```[\w]*\n?/g,``).trim());Ss(),await Es(i,e)}catch{Ss(),setTimeout(()=>{typeof toggleTotoAssistant==`function`&&toggleTotoAssistant(),setTimeout(()=>{let t=document.getElementById(`toto-input`)||document.querySelector(`.toto-msg-input`);t&&(t.value=e,t.focus())},400)},320)}}async function Es(e,t){let n=e=>new Promise(t=>setTimeout(t,e));if(e.type===`event`){activateTab(`planner`),await n(320),openPlannerModal(null,e.date||new Date().toISOString().slice(0,10)),await n(200);let r=document.getElementById(`pe-title`),i=document.getElementById(`pe-time`);if(r&&(r.value=e.title||t),i&&e.time&&(i.value=e.time),e.date){let t=document.getElementById(`pe-date`),n=document.getElementById(`pm-start-display`);t&&(t.value=e.date),n&&typeof _pmFmtDateShort==`function`&&(n.textContent=_pmFmtDateShort(e.date))}}else if(e.type===`expense`){let t=window.getMonthData(window.selectedBudgetMonth).expenses,n=parseInt(window._secureGet(`toto_qa_last`)||`0`);_qaExpenseId=t.find(e=>e.id===n)?.id??t[0]?.id??null,_qaAmount=e.amount?String(e.amount):``,Ds(t),document.getElementById(`qa-overlay`).classList.add(`open`),requestAnimationFrame(()=>{document.getElementById(`qa-sheet`).classList.add(`open`);let t=document.getElementById(`qa-note`);t&&e.note&&(t.value=e.note)})}else if(e.type===`income`){activateTab(`budget`),await n(320),openAddIncome(),await n(200);let t=document.getElementById(`inc-name`)||document.querySelector(`#modal-body [id*="name"]`),r=document.getElementById(`inc-amount`)||document.querySelector(`#modal-body [id*="amount"]`);t&&e.name&&(t.value=e.name),r&&e.amount&&(r.value=e.amount)}else if(e.type===`bill`){activateTab(`bills`),await n(320),openBillModal(),await n(200);let t=document.getElementById(`bill-name`),r=document.getElementById(`bill-amount`),i=document.getElementById(`bill-due`);t&&e.name&&(t.value=e.name),r&&e.amount&&(r.value=e.amount),i&&e.dueDate&&(i.value=e.dueDate)}else if(e.type===`chore`)activateTab(`kids`),await n(320);else if(e.type===`shopping`){window._listsActiveType=`food`,window._listsView=`list`,activateTab(`lists`),await n(320);let t=document.getElementById(`ls-quick-input`);t&&e.name&&(t.value=e.name,t.focus())}else{typeof toggleTotoAssistant==`function`&&toggleTotoAssistant(),await n(400);let e=document.getElementById(`toto-input`)||document.querySelector(`.toto-msg-input`);e&&(e.value=t,e.focus())}}function Ds(e){let t=e||window.getMonthData(window.selectedBudgetMonth).expenses,n=_qaAmount?`$${_qaAmount}`:`$0`,r=!_qaAmount,i=t.length?t.map(e=>`<button class="qa-cat${e.id===_qaExpenseId?` selected`:``}" onclick="_qaSelectCat(${e.id})">${g(e.name)}</button>`).join(``):`<span style="color:var(--text-muted);font-size:13px;padding:6px 4px">Add budget expenses first</span>`,a=[`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`.`,`0`,`⌫`];document.getElementById(`qa-sheet`).innerHTML=`
    <div class="qa-handle"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 20px 0">
      <span style="font-size:16px;font-weight:700">Log Spend</span>
      <button onclick="closeQuickAdd()" style="background:none;border:none;font-size:24px;color:var(--text-muted);cursor:pointer;line-height:1;padding:4px">×</button>
    </div>

    <div class="qa-amount-display${r?` zero`:``}" id="qa-display">${n}</div>

    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);padding:0 20px 8px">Category</div>
    <div class="qa-cats" id="qa-cats">${i}</div>

    <div class="qa-numpad">
      ${a.map(e=>`<button class="qa-key${e===`⌫`?` qa-key-del`:``}" onclick="_qaKey('${e}')">${e}</button>`).join(``)}
    </div>

    <div style="padding:0 16px 12px;display:flex;flex-direction:column;gap:10px">
      <input class="form-input" type="text" maxlength="200" id="qa-note" placeholder="Note (optional)"
        style="border-radius:12px" autocomplete="off">
      <button class="btn btn-primary" onclick="saveQuickAdd()"
        style="height:54px;font-size:16px;font-weight:700;border-radius:14px;background:#0891b2;border-color:#0891b2">
        Save Spend
      </button>
    </div>`}function Os(e){if(e===`⌫`)_qaAmount=_qaAmount.slice(0,-1);else if(e===`.`)_qaAmount.includes(`.`)||(_qaAmount+=(_qaAmount?``:`0`)+`.`);else{let t=_qaAmount.split(`.`);if(t[1]!==void 0&&t[1].length>=2||_qaAmount.replace(`.`,``).length>=6)return;_qaAmount===`0`&&e!==`.`?_qaAmount=e:_qaAmount+=e}let t=document.getElementById(`qa-display`);if(!t)return;let n=!_qaAmount;t.textContent=_qaAmount?`$${_qaAmount}`:`$0`,t.className=`qa-amount-display${n?` zero`:``}`}function ks(e){_qaExpenseId=e,document.querySelectorAll(`.qa-cat`).forEach(t=>{t.classList.toggle(`selected`,parseInt(t.getAttribute(`onclick`).match(/\d+/)[0])===e)})}function As(){let e=parseFloat(_qaAmount);if(!e||e<=0){let e=document.getElementById(`qa-display`);e&&(e.style.color=`var(--danger)`,setTimeout(()=>e.style.color=``,600));return}if(!_qaExpenseId){let e=document.getElementById(`qa-cats`);e&&(e.style.outline=`2px solid var(--danger)`,e.style.borderRadius=`8px`,setTimeout(()=>{e.style.outline=``},600));return}let t=document.getElementById(`qa-note`)?.value.trim()||``,n=new Date().toISOString().slice(0,10);s.budget.actuals[window.selectedBudgetMonth]||(s.budget.actuals[window.selectedBudgetMonth]={});let r=window.getActualEntries(_qaExpenseId,window.selectedBudgetMonth),i=r.length?Math.max(...r.map(e=>e.id))+1:1;r.push({id:i,amount:e,date:n,note:t}),s.budget.actuals[window.selectedBudgetMonth][_qaExpenseId]=r,window._secureSet(`toto_qa_last`,String(_qaExpenseId)),window.saveData(s),Ss(),window.renderAll();let a=document.getElementById(`qa-fab`);a&&(a.textContent=`✓`,a.style.background=`#10b981`,setTimeout(()=>{a.textContent=`+`,a.style.background=``},1800))}window.addEventListener(`resize`,()=>{document.querySelectorAll(`.section-pills-wrap`).forEach(_updatePillsOverflow)}),document.querySelectorAll(`.nav-item, .nav-text-item`).forEach(e=>{e.addEventListener(`click`,()=>activateTab(e.dataset.tab))});function js(){let e=window._activeProfile?.role===`child`;document.body.classList.toggle(`kid-mode`,e);let t=document.getElementById(`kid-banner-label`);t&&e&&(t.textContent=`${window._activeProfile.emoji||`😊`} ${window._activeProfile.name}'s view`);let n=window.getDeviceProfile(),r=document.getElementById(`header-switch-profile`);if(r){let t=n&&n!==`adult`;if(r.style.display=t?``:`none`,t)if(e)r.textContent=`👨‍👩‍👧 Parent`;else{let e=(s.kids?.profiles||[]).find(e=>e.id===n);r.textContent=e?`Back to ${e.name}`:`Switch`}}}function Ms(){let e=window.getDeviceProfile();if(window._activeProfile?.role===`child`)window.clearKidSession(),window._activeProfile=null,js(),window.renderAll();else if(e===`shared`)window.showProfileSelector();else if(e&&e!==`adult`){let t=(s.kids?.profiles||[]).find(t=>t.id===e);t&&(t.pinHash?(window._pinTargetId=t.id,window._pinBuffer=``,window._pinAttempts=0,window._showPinScreen(t)):(window._activeProfile={id:t.id,name:t.name,emoji:t.emoji,role:`child`},window.setKidSession(t.id),window._applyActiveProfile()))}}async function Ns(e,t){let n=(s.kids?.profiles||[]).find(t=>String(t.id)===String(e));!n||t.length!==4||(n.pinHash=await window._hashPin(t,window._getHouseholdOwnerUID()),window.saveData(s))}function Ps(e){let t=(s.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(delete t.pinHash,window.saveData(s))}function Fs(e){(s.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name)[e]&&(Ls=e,zs=``,V=``,Rs=`enter`,Bs(),document.getElementById(`adult-pin-modal`).classList.remove(`hidden`))}function Is(e){let t=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name);t[e]&&(delete t[e].pinHash,window.saveData(s),renderSettings())}var Ls=0,Rs=`enter`,zs=``,V=``;function Bs(){let e=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name)[Ls];if(!e)return;let t=Rs===`enter`,n=t?e.pinHash?`Change your PIN 🔢`:`Set your PIN 🔢`:`Confirm your PIN ✅`,r=t?`Pick 4 numbers — used on shared devices`:`Enter it again to confirm`,i=[0,1,2,3].map(e=>{let t=e<V.length;return`<div style="width:52px;height:60px;border:2px solid ${t?`#0891b2`:`#e2e8f0`};border-radius:10px;background:${t?`#ecfeff`:`#f8fafc`};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#0891b2">${t?`●`:``}</div>`}).join(``),a=[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<div></div>`:`<div onclick="_adultPinKey('${e}')" style="height:52px;border:1.5px solid #e2e8f0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;color:#374151;cursor:pointer;background:#fff;-webkit-tap-highlight-color:transparent;user-select:none">${e}</div>`).join(``);document.getElementById(`adult-pin-modal-body`).innerHTML=`
    <div style="font-size:40px;margin-bottom:12px">${t?`🔢`:`✅`}</div>
    <div style="font-size:18px;font-weight:700;color:#1e293b;margin-bottom:6px">${n}</div>
    <div style="font-size:13px;color:#64748b;margin-bottom:20px">${r}</div>
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px">${i}</div>
    <div id="adult-pin-error" style="font-size:13px;color:#ef4444;min-height:18px;margin-bottom:12px"></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:220px;margin:0 auto 20px">${a}</div>
    <button onclick="document.getElementById('adult-pin-modal').classList.add('hidden')" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`}function Vs(e){if(e===`⌫`){V=V.slice(0,-1),Bs();return}V.length>=4||(V+=e,Bs(),V.length===4&&Hs())}async function Hs(){if(Rs===`enter`)zs=V,V=``,Rs=`confirm`,Bs();else{if(V!==zs){V=``,zs=``,Rs=`enter`,Bs();let e=document.getElementById(`adult-pin-error`);e&&(e.textContent=`Those didn't match — try again`);return}let e=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name);e[Ls].pinHash=await window._hashPin(V,window._getHouseholdOwnerUID()),window.saveData(s),document.getElementById(`adult-pin-modal`).classList.add(`hidden`),renderSettings()}}function Us(e){let t=Number(e.age||0);return t<5?`tiny-tots`:t<8?`early-reader`:t<12?`independent`:`tween`}function Ws(){let e=new Date().getHours();return e<12?`Good morning`:e<17?`Good afternoon`:`Good evening`}function Gs(e){if(!e.triggerTime)return!0;let[t,n]=e.triggerTime.split(`:`).map(Number),r=new Date,i=r.getHours()*60+r.getMinutes(),a=t*60+(n||0),o=a+360;return i>=a&&i<o}function Ks(e){if(!e.triggerTime)return``;let[t]=e.triggerTime.split(`:`).map(Number);return t<12?`Available this morning`:t<17?`Available this afternoon`:`Available tonight`}function qs(){let e=document.getElementById(`child-view-overlay`);if(!e)return;let t=document.getElementById(`cv-confetti-wrap`);t&&t.remove(),t=document.createElement(`div`),t.id=`cv-confetti-wrap`,t.className=`cv2-confetti-wrap`,e.appendChild(t);let n=[`#5B4CF5`,`#7C3AED`,`#F59E0B`,`#10B981`,`#F43F5E`,`#FBBF24`];for(let e=0;e<60;e++){let r=document.createElement(`div`);r.className=`cv2-confetti-particle`,r.style.cssText=`
      left:${Math.random()*100}%;
      background:${n[e%n.length]};
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*8}px;
      animation-duration:${1.4+Math.random()*1.4}s;
      animation-delay:${Math.random()*.6}s;
    `,t.appendChild(r)}setTimeout(()=>{t.parentNode&&t.remove()},3500)}function Js(e){let t=(s.kids?.profiles||[]).find(t=>String(t.id)===String(e));if(!t)return;Zs=e,Qs=`today`;let n=s.kids,r=kidBalance(n,t.id),i=Us(t),a=i===`tiny-tots`,o=i===`tween`,c=_cvReadOnly,l=document.getElementById(`child-view-overlay`);document.getElementById(`cv-avatar`).textContent=t.emoji||`😊`,document.getElementById(`cv-name`).innerHTML=`<span class="ember-text">${g(t.name)}</span>`,document.getElementById(`cv-greeting`).textContent=Ws()+`!`;let u=(n.completions||[]).filter(e=>e.kidId===t.id&&e.status===`approved`&&new Date(e.completedAt||e.ts).toDateString()===new Date().toDateString()).reduce((e,t)=>e+((n.chores||[]).find(e=>e.id===t.choreId)?.points||0),0),d=document.getElementById(`cv-nudge`);u>0&&!a&&!c?(d.textContent=`You've earned ⭐ ${u} points today — keep going!`,d.style.display=``):d.style.display=`none`,l.className=l.className.replace(/cv2-age-\S+/g,``).trim(),i===`early-reader`&&l.classList.add(`cv2-age-early`),a&&l.classList.add(`cv2-age-tiny`),o&&l.classList.add(`cv2-age-tween`);let f=document.getElementById(`cv-nav`);f&&(f.style.display=a?`none`:``),document.getElementById(`cv-nav-today`)?.classList.add(`active`),document.getElementById(`cv-nav-calendar`)?.classList.remove(`active`),document.getElementById(`cv-nav-prizes`)?.classList.remove(`active`),Ys(t);let p=new Date().toISOString().slice(0,10),m=(s.routineAssignments||[]).filter(e=>{if(e.childId!==t.id)return!1;let n=(s.routines||[]).find(t=>t.id===e.routineId);return n&&_routineMatchesDate(n,p)}),h=_routineTodayKey(),_=``,v=0,y=0;m.length&&m.forEach(e=>{let n=(s.routines||[]).find(t=>t.id===e.routineId);if(!n)return;let r=e.completionState?.[h]||[],i=n.steps.length,o=i>0?Math.round(r.length/i*100):0,l=r.length===i&&i>0,u=Gs(n);y+=i,v+=r.length;let d=u?``:Ks(n),f=_assignmentStreak(e,i),p=_assignmentHistory(e,i,7).filter(e=>e.done===e.total&&e.total>0).length;if(_+=`<div class="cv2-card${u?``:` cv2-card--locked`}" style="margin-bottom:10px">
        <div class="cv2-routine-header">
          <div class="cv2-routine-title">
            <span>${n.emoji}</span>
            <span class="cv2-routine-name">${g(n.name)}</span>
            ${f>0&&!a?`<span style="font-size:11px;font-weight:700;color:#f59e0b;background:#fffbeb;border-radius:99px;padding:2px 8px">🔥 ${f}d</span>`:``}
          </div>
          ${u?`<span class="cv2-routine-frac">${r.length}/${i}${n.pointsPerCompletion>0?` · ⭐${n.pointsPerCompletion}`:``}</span>`:`<span class="cv2-routine-lock">🔒 ${g(d)}</span>`}
        </div>
        <div class="cv2-progress"><div class="cv2-progress-fill" style="width:${o}%"></div></div>
        ${p>0&&!a?`<div style="padding:4px 16px 0;font-size:11px;color:#94a3b8">Completed ${p} of the last 7 days</div>`:``}
        <div class="cv2-steps">`,i?n.steps.forEach(e=>{let i=r.includes(e.id),o=u&&!c,s=i?`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``;_+=`<div class="cv2-step" style="${o?``:`cursor:default`}"
            ${o?`onclick="_routineToggleStepKid(${JSON.stringify(n.id)},${JSON.stringify(e.id)},'${t.id}')"`:``}>
            <div class="cv2-step-check${i?` cv2-step-check--done`:``}">${s}</div>
            <span class="cv2-step-emoji">${e.emoji}</span>
            <span class="cv2-step-label${i?` cv2-step-label--done`:``}">${g(e.label)}</span>
            ${e.points>0&&!a?`<span class="cv2-step-pts">⭐ ${e.points}</span>`:``}
          </div>`}):_+=`<div style="padding:12px 16px;font-size:13px;color:#94a3b8;text-align:center">No steps added yet</div>`,_+=`</div>`,l){let t=_assignmentStreak(e,i),r=t>1?` · 🔥 ${t} day streak!`:``;_+=`<div class="cv2-routine-done">✓ All done! Great work${n.pointsPerCompletion>0&&!a?` · ⭐ ${n.pointsPerCompletion} bonus pts`:``}!${r}</div>`}else if(u){let t=_assignmentStreak(e,i);t>0&&!a&&(_+=`<div style="padding:4px 16px 8px;font-size:11px;font-weight:700;color:#f59e0b">🔥 ${t} day streak — keep it up!</div>`)}_+=`</div>`});let b=(n.chores||[]).filter(e=>(e.assignedTo===t.id||e.assignedTo===`all`)&&!e._isRoutine),x=(n.completions||[]).filter(e=>e.kidId===t.id&&e.status===`pending`);y+=b.length,v+=b.filter(e=>x.some(t=>t.choreId===e.id)).length;let S=``;b.length&&b.forEach(e=>{let n=x.some(t=>t.choreId===e.id);S+=`<div class="cv2-chore">
        <span class="cv2-chore-emoji">${e.emoji||`📋`}</span>
        <div class="cv2-chore-info">
          <div class="cv2-chore-name">${g(e.name)}</div>
          ${a?``:`<div class="cv2-chore-pts">⭐ ${e.points} · ${e.frequency}</div>`}
        </div>
        ${n?`<span class="cv2-chore-done-badge">${a?`⭐`:`Waiting ✓`}</span>`:c?`<span class="cv2-chore-done-badge" style="background:#F0EFF8;color:#A1A1AA">Not done</span>`:`<button class="cv2-chore-btn" onclick="markChoreChildView('${t.id}','${e.id}')">${a?`✅`:`Done ✓`}</button>`}
      </div>`});let C=_mealWeekKey(0),w=new Date().getDay()===0?6:new Date().getDay()-1,T=s.meals?.lunchbox?.plans?.[C]||{},ee=T[T[t.id]===void 0?(s.meals?.lunchbox?.profiles||[]).find(e=>e.name?.toLowerCase()===t.name?.toLowerCase())?.id??t.id:t.id]?.[w]||{},E=[`main`,`snack`,`fruit`,`drink`],te=E.map(e=>ee[e]).filter(Boolean),D={main:`🥪`,snack:`🍪`,fruit:`🍎`,drink:`🥤`},O=``;if(te.length){let e=``;E.forEach(t=>{ee[t]&&(e+=`<div class="cv2-lb-chip">${D[t]}${a?``:` `+g(ee[t])}</div>`)}),O=`<div class="cv2-group">
      <div class="cv2-group-heading">🥪 Lunchbox</div>
      <div class="cv2-card cv2-card--warm">
        <div class="cv2-lb-chips">${e}</div>
      </div>
    </div>`}let{events:k}=rc(t,p),A=[...k].sort((e,t)=>(e.time||`99:99`).localeCompare(t.time||`99:99`)),ne=``;A.length&&!a&&(ne=`<div class="cv2-group">
      <div class="cv2-group-heading">📅 Today's Events</div>
      <div class="cv2-card">${A.map(e=>`
      <div class="cv2-event-row">
        <span class="cv2-event-time">${e.time?ic(e.time):``}</span>
        <div class="cv2-event-bar"></div>
        <span class="cv2-event-emoji">${e.emoji}</span>
        <div class="cv2-event-body">
          <div class="cv2-event-title">${g(e.label)}</div>
          ${e.notes?`<div class="cv2-event-sub">${g(e.notes)}</div>`:``}
        </div>
      </div>`).join(``)}</div>
    </div>`);let re=(n.prizes||[]).filter(e=>r>=e.pointCost),ie=``;if(!a){let e=re.length?`<div style="display:flex;align-items:center;gap:10px;padding:14px 15px">
          <span style="font-size:28px">${re[0].emoji||`🎁`}</span>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:700;color:#18181B">You can afford ${re.length} prize${re.length>1?`s`:``}!</div>
            <div style="font-size:11px;color:#A1A1AA;margin-top:1px">⭐ ${r} pts · Tap to visit the Prize Store</div>
          </div>
          <span style="font-size:18px;color:#94a3b8">›</span>
        </div>`:`<div style="display:flex;align-items:center;gap:10px;padding:14px 15px">
          <span style="font-size:28px">🏆</span>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:700;color:#18181B">Prize Store</div>
            <div style="font-size:11px;color:#A1A1AA;margin-top:1px">⭐ ${r} pts · Keep earning!</div>
          </div>
          <span style="font-size:18px;color:#94a3b8">›</span>
        </div>`;ie=`<div class="cv2-group">
      <div class="cv2-group-heading">🏆 Prizes</div>
      <div class="cv2-card cv2-card--warm" style="cursor:pointer" onclick="_cvSwitchTab('prizes','${t.id}')">
        ${e}
      </div>
    </div>`}let j=(n.notifications||[]).filter(e=>e.kidId===t.id&&!e.read),ae=``;j.length&&!c&&(ae=j.map(e=>{let n=e.type===`prize_approved`;return`<div class="cv2-notif-bar ${n?`cv2-notif-bar--approved`:`cv2-notif-bar--declined`}">
        <span>${n?`${e.prizeEmoji} <strong>${g(e.prizeName)}</strong> approved! You can redeem it now.`:`${e.prizeEmoji} <strong>${g(e.prizeName)}</strong> request was declined.`}</span>
        <button class="cv2-notif-dismiss" onclick="_cvDismissNotif('${e.id}','${t.id}')">×</button>
      </div>`}).join(``));let oe=y>0&&v===y,M;oe&&!c?M=`<div class="cv2-celebration">
      <div class="cv2-celeb-emoji">${a?`🌟`:`🏆`}</div>
      <div class="cv2-celeb-title">${a?`🎉 Yay!`:`Amazing work, ${g(t.name)}!`}</div>
      <div class="cv2-celeb-sub">${a?`All done! You're a star!`:`You've finished everything for today. You're a superstar! ⭐`}</div>
    </div>
    ${ne}${O}${ie}`:(M=ae,i!==`tiny-tots`&&!c&&(M+=`<button class="cv2-week-shortcut" onclick="_cvSwitchTab('calendar','${t.id}')">📅 See my week →</button>`),m.length&&(M+=`<div class="cv2-group">
        <div class="cv2-group-heading">📋 My Routines</div>
        ${_}
      </div>`),b.length&&(M+=`<div class="cv2-group">
        <div class="cv2-group-heading">🧹 Chores</div>
        <div class="cv2-card">${S}</div>
      </div>`),M+=ne,M+=O,M+=ie),document.getElementById(`cv-content`).innerHTML=M,l.classList.remove(`hidden`),l.style.display=`flex`,oe&&!c&&qs()}function Ys(e){let t=document.getElementById(`cv-prizes-badge`);if(!t)return;let n=s.kids,r=kidBalance(n,e.id),i=(n.notifications||[]).filter(t=>t.kidId===e.id&&!t.read).length,a=(n.prizes||[]).filter(e=>r>=e.pointCost).length,o=i+(a>0&&i===0?a:0);o>0?(t.textContent=o>9?`9+`:String(o),t.style.display=``):t.style.display=`none`}function Xs(e){let t=s.kids,n=kidBalance(t,e.id),r=Us(e)===`tiny-tots`,i=_cvReadOnly,a=t.prizes||[],o=!1;(t.notifications||[]).filter(t=>t.kidId===e.id&&!t.read).forEach(e=>{e.read=!0,o=!0}),o&&window.saveData(s),Ys(e);let c=r?`${`⭐`.repeat(Math.min(n,10))}${n>10?`+`:``}`:`${n}`,l=`<div class="cv2-prizes-balance">
    <div class="cv2-prizes-balance-left">
      <div class="cv2-prizes-balance-pts">${r?c:`⭐ ${c}`}</div>
      <div class="cv2-prizes-balance-lbl">${r?`stars earned`:`points to spend`}</div>
    </div>
    <span class="cv2-prizes-balance-emoji">🏆</span>
  </div>`;l+=`<div class="cv2-group-heading" style="margin-bottom:8px">Prizes</div>`,a.length?(l+=`<div class="cv2-card cv2-card--warm" style="margin-bottom:18px">`,a.forEach(t=>{let a=n>=t.pointCost;l+=`<div class="cv2-prize">
        <span class="cv2-prize-emoji">${t.emoji||`🎁`}</span>
        <div class="cv2-prize-info">
          <div class="cv2-prize-name">${g(t.name)}</div>
          ${r?``:`<div class="cv2-prize-cost">⭐ ${t.pointCost} points</div>`}
        </div>
        <button class="cv2-prize-btn ${a?`cv2-prize-btn--can`:`cv2-prize-btn--cant`}"
          ${a&&!i?`onclick="_cvShowPrizeConfirm('${e.id}','${t.id}')"`:`disabled`}>
          ${a?r?`🎁`:`Redeem`:r?`🔒`:`⭐ ${t.pointCost}`}
        </button>
      </div>`}),l+=`</div>`):l+=`<div style="text-align:center;padding:24px 0;color:#A1A1AA;font-size:13px">No prizes set up yet</div>`;let u=(t.redemptions||[]).filter(t=>t.kidId===e.id).sort((e,t)=>(t.ts||t.requestedAt||0)>(e.ts||e.requestedAt||0)?1:-1).slice(0,8);u.length&&(l+=`<div class="cv2-group-heading" style="margin-bottom:8px">Recent</div>`,l+=`<div class="cv2-card">`,u.forEach(e=>{let t=a.find(t=>t.id===e.prizeId);if(!t)return;let n={approved:{label:`✓ Approved`,bg:`#f0fdf4`,color:`#15803d`},rejected:{label:`Declined`,bg:`#fef2f2`,color:`#b91c1c`},pending:{label:`⏳ Waiting`,bg:`#fffbeb`,color:`#854d0e`}},r=n[e.status]||n.pending,i=e.approvedAt||e.ts||e.requestedAt,o=i?new Date(i).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}):``;l+=`<div class="cv2-redeem-history-row">
        <span style="font-size:20px">${t.emoji||`🎁`}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:#18181B">${g(t.name)}</div>
          ${o?`<div style="font-size:11px;color:#94a3b8">${o}</div>`:``}
        </div>
        <span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:99px;background:${r.bg};color:${r.color}">${r.label}</span>
      </div>`}),l+=`</div>`);let d=document.getElementById(`cv-content`);d&&(d.innerHTML=l)}var Zs=null,Qs=`today`,$s=`7day`,ec=null,tc=new Set;function nc(e,t){t&&(Zs=t);let n=(s.kids?.profiles||[]).find(e=>String(e.id)===String(Zs));if(!n)return;let r=Us(n),i=document.getElementById(`cv-nav`);i&&(i.style.display=r===`tiny-tots`?`none`:``),document.getElementById(`cv-nav-today`)?.classList.toggle(`active`,e===`today`),document.getElementById(`cv-nav-calendar`)?.classList.toggle(`active`,e===`calendar`),document.getElementById(`cv-nav-prizes`)?.classList.toggle(`active`,e===`prizes`),e===`today`?Js(Zs):e===`prizes`?Xs(n):(ec=null,uc(n))}function rc(e,t){let n=(s.routineAssignments||[]).filter(t=>t.childId===e.id).map(e=>{let n=(s.routines||[]).find(t=>t.id===e.routineId);return n&&_routineMatchesDate(n,t)?{type:`routine`,routine:n,assignment:e,label:n.name,emoji:n.emoji,color:`#7C3AED`,tag:`Routine`,time:n.triggerTime||null}:null}).filter(Boolean),r=(s.childEvents||[]).filter(n=>{let r=Array.isArray(n.assignedTo)?n.assignedTo:[n.assignedTo];return r.includes(e.id)||r.includes(`all`)||n.isHouseholdWide?n.recurrence?_recurrenceMatchesDate(n.recurrence,t):n.date===t:!1}).map(e=>({type:`event`,label:e.title,emoji:e.emoji||`📅`,color:`#10b981`,tag:`Event`,notes:e.notes,time:e.time||null})),i=(s.planner?.events||[]).filter(e=>_plannerEvMemberIds(e).includes(`everyone`)?e.recurrence&&e.recurrence.type!==`one_time`?_recurrenceMatchesDate(e.recurrence,t):e.endDate&&e.endDate>e.date?t>=e.date&&t<=e.endDate:e.date===t:!1).map(e=>({type:`event`,label:e.title,emoji:PLANNER_CATS[e.category]?.emoji||`📅`,color:`#10b981`,tag:`Event`,notes:e.notes||``,time:e.time||null}));return{routines:n,events:[...r,...i],chores:(s.kids?.chores||[]).filter(t=>(t.assignedTo===e.id||t.assignedTo===`all`)&&!t._isRoutine).map(e=>({type:`chore`,label:e.name,emoji:e.emoji||`📋`,color:`#ec4899`,tag:`Chore`,time:null}))}}function ic(e){if(!e)return``;let[t,n]=e.split(`:`).map(Number);return`${t%12||12}:${String(n).padStart(2,`0`)} ${t>=12?`pm`:`am`}`}function ac(e){tc.has(e)?tc.delete(e):tc.add(e);let t=(s.kids?.profiles||[]).find(e=>String(e.id)===String(Zs));t&&($s===`7day`||Us(t)===`early-reader`?sc(t,new Date().toISOString().slice(0,10)):sc(t,ec))}function oc(e,t,n){if(_cvReadOnly)return;let r=_routineGetAssignment(e,Zs);if(!r)return;r.completionState||(r.completionState={});let i=n;r.completionState[i]||(r.completionState[i]=[]);let a=r.completionState[i].indexOf(t),o=a===-1;o?r.completionState[i].push(t):r.completionState[i].splice(a,1);let c=new Date().toISOString().slice(0,10);if(o&&n===c){let n=(s.routines||[]).find(t=>String(t.id)===String(e));if(n){let e=n.steps.find(e=>e.id===t);(e?.points||0)>0&&_routineAwardStepPoints(n,e,Zs);let a=n.steps.length;r.completionState[i].length===a&&a>0&&(n.pointsPerCompletion||0)>0&&_routineAwardPoints(n,Zs)}}window.saveData(s);let l=(s.kids?.profiles||[]).find(e=>String(e.id)===String(Zs));l&&sc(l,n)}function sc(e,t){let n=$s===`month`?`cv-day-panel`:`cv-schedule-panel`,r=document.getElementById(n);r&&(r.innerHTML=cc(e,t))}function cc(e,t){if(!t)return``;let{routines:n,events:r,chores:i}=rc(e,t),a=t;if(!n.length&&!r.length&&!i.length)return`<div style="text-align:center;padding:28px 0;color:#A1A1AA;font-size:13px">Nothing scheduled</div>`;let o=[...n.map(e=>({...e,sortKey:e.time||`23:59`})),...r.map(e=>({...e,sortKey:e.time||`23:59`}))].sort((e,t)=>e.sortKey.localeCompare(t.sortKey)),c=``;return o.length&&(c+=`<div class="cv-sched-section-hdr">Schedule</div>`,o.forEach(e=>{e.type===`routine`?c+=lc(e.routine,e.assignment,a):c+=`<div class="cv-sched-item">
          <div class="cv-sched-row">
            <span class="cv-sched-time">${e.time?ic(e.time):``}</span>
            <div class="cv-sched-color-bar" style="background:${e.color}"></div>
            <span class="cv-sched-emoji">${e.emoji}</span>
            <div class="cv-sched-body">
              <div class="cv-sched-title">${g(e.label)}</div>
              ${e.notes?`<div class="cv-sched-sub">${g(e.notes)}</div>`:``}
            </div>
            <span class="cv-sched-tag" style="background:${e.color}20;color:${e.color}">${e.tag}</span>
          </div>
        </div>`})),i.length&&(c+=`<div class="cv-sched-section-hdr">Chores</div>`,i.forEach(t=>{let n=(s.kids?.completions||[]).some(n=>n.kidId===e.id&&n.choreId===(s.kids?.chores||[]).find(e=>e.name===t.label)?.id&&n.status===`pending`);c+=`<div class="cv-sched-item">
        <div class="cv-sched-row">
          <span class="cv-sched-time"></span>
          <div class="cv-sched-color-bar" style="background:${t.color}"></div>
          <span class="cv-sched-emoji">${t.emoji}</span>
          <div class="cv-sched-body">
            <div class="cv-sched-title">${g(t.label)}</div>
          </div>
          ${n?`<span class="cv-sched-tag" style="background:#fef9c320;color:#854d0e">Waiting ✓</span>`:`<span class="cv-sched-tag" style="background:${t.color}20;color:${t.color}">Chore</span>`}
        </div>
      </div>`})),c}function lc(e,t,n){let r=t.completionState?.[n]||[],i=e.steps.length,a=i>0?Math.round(r.length/i*100):0,o=r.length===i&&i>0,s=tc.has(e.id),c=i>0?`
    <div class="cv-sched-progress">
      <div class="cv-sched-prog-bar"><div class="cv-sched-prog-fill" style="width:${a}%"></div></div>
      <span style="font-size:11px;color:#94a3b8;font-weight:600">${r.length}/${i}</span>
    </div>`:``,l=``;return s&&i>0&&(l=`<div class="cv-sched-steps">`,e.steps.forEach(t=>{let i=r.includes(t.id),a=!_cvReadOnly,o=i?`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``;l+=`<div class="cv-sched-step" ${a?`onclick="_cvToggleStepFromCal(${JSON.stringify(e.id)},${JSON.stringify(t.id)},'${n}')"`:`style="cursor:default"`}>
        <div class="cv-sched-step-check${i?` cv-sched-step-check--done`:``}">${o}</div>
        <span class="cv-sched-step-emoji">${t.emoji}</span>
        <span class="cv-sched-step-label${i?` cv-sched-step-label--done`:``}">${g(t.label)}</span>
        ${t.points>0?`<span class="cv-sched-step-pts">⭐ ${t.points}</span>`:``}
      </div>`}),l+=`</div>`,o&&(l+=`<div style="text-align:center;padding:8px;font-size:12px;font-weight:700;color:#5B4CF5;background:#f5f3ff">✓ All done! 🎉</div>`)),`<div class="cv-sched-item">
    <div class="cv-sched-row" style="cursor:pointer" onclick="_cvToggleRoutineExpand(${JSON.stringify(e.id)})">
      <span class="cv-sched-time">${e.triggerTime?ic(e.triggerTime):``}</span>
      <div class="cv-sched-color-bar" style="background:#7C3AED"></div>
      <span class="cv-sched-emoji">${e.emoji}</span>
      <div class="cv-sched-body">
        <div class="cv-sched-title">${g(e.name)}</div>
        ${o?`<div class="cv-sched-sub" style="color:#5B4CF5;font-weight:700">✓ Complete</div>`:e.triggerTime?`<div class="cv-sched-sub">${ic(e.triggerTime)}</div>`:``}
      </div>
      ${c}
      <button class="cv-sched-expand-btn">${s?`▲`:`▼`}</button>
    </div>
    ${l}
  </div>`}function uc(e){if(!e)return;let t=Us(e)===`early-reader`,n=t?`7day`:$s,r=new Date().toISOString().slice(0,10),i=document.getElementById(`cv-content`);if(!i)return;let a=``;t||(a+=`<div style="display:flex;gap:8px;margin-bottom:14px">
      <button class="cv2-nav-tab cv-cal-month-toggle" style="border-radius:99px;padding:6px 16px;flex:none;${n===`7day`?`color:#5B4CF5;border-bottom-color:#5B4CF5`:``}"
        onclick="_cvCalViewToggle('7day','${e.id}')">Week</button>
      <button class="cv2-nav-tab cv-cal-month-toggle" style="border-radius:99px;padding:6px 16px;flex:none;${n===`month`?`color:#5B4CF5;border-bottom-color:#5B4CF5`:``}"
        onclick="_cvCalViewToggle('month','${e.id}')">Month</button>
    </div>`),a+=n===`7day`?fc(e,r):mc(e,r),i.innerHTML=a}function dc(e,t){$s=e,ec=null;let n=(s.kids?.profiles||[]).find(e=>String(e.id)===String(t));n&&uc(n)}function fc(e,t){let n=[`S`,`M`,`T`,`W`,`T`,`F`,`S`],r=new Date(t+`T12:00:00`),i=`<div class="cv-week-strip">`;for(let a=0;a<7;a++){let o=new Date(r);o.setDate(r.getDate()+a);let s=o.toISOString().slice(0,10),c=s===t,{routines:l,events:u,chores:d}=rc(e,s),f=[...l,...u,...d].slice(0,3).map(e=>`<div class="cv-cal-dot" style="background:${e.color}"></div>`).join(``);i+=`<div class="cv-week-cell ${c?`cv-today`:``}" onclick="_cvWeekDayTap('${s}','${e.id}')">
      <div class="cv-week-dow">${n[o.getDay()]}</div>
      <div class="cv-week-date">${o.getDate()}</div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:3px">${f}</div>
    </div>`}i+=`</div>`;let a=new Date(t+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`});return i+=`<div style="font-size:13px;font-weight:700;color:#1e293b;margin:10px 0 2px">${g(a)}</div>`,i+=`<div id="cv-schedule-panel">${cc(e,t)}</div>`,i}function pc(e,t){let n=(s.kids?.profiles||[]).find(e=>String(e.id)===String(t));if(!n)return;tc.clear(),document.querySelectorAll(`.cv-week-cell`).forEach(t=>{t.classList.toggle(`cv-today`,t.getAttribute(`onclick`)?.includes(`'${e}'`))});let r=new Date(e+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`}),i=document.getElementById(`cv-schedule-panel`);i&&(i.previousElementSibling.textContent=r,i.innerHTML=cc(n,e))}function mc(e,t){let n=new Date(t+`T12:00:00`),r=n.getFullYear(),i=n.getMonth(),a=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],o=[`S`,`M`,`T`,`W`,`T`,`F`,`S`],s=new Date(r,i,1).getDay(),c=new Date(r,i+1,0).getDate(),l=ec||t,u=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
    <span style="font-size:14px;font-weight:800;color:#18181B">${a[i]} ${r}</span>
  </div>`;u+=`<div class="cv-cal-grid">`,o.forEach(e=>{u+=`<div class="cv-cal-day-hdr">${e}</div>`});for(let e=0;e<s;e++)u+=`<div class="cv-cal-cell cv-other"></div>`;for(let n=1;n<=c;n++){let a=`${r}-${String(i+1).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,o=a===t,s=a===l,{routines:c,events:d,chores:f}=rc(e,a),p=[...c,...d,...f].slice(0,3).map(e=>`<div class="cv-cal-dot" style="background:${e.color}"></div>`).join(``);u+=`<div class="cv-cal-cell ${o?`cv-today`:``} ${s&&!o?`cv-cal-cell--sel`:``}" onclick="_cvMonthDayTap('${a}','${e.id}')">
      <div class="cv-cal-cell-num">${n}</div>
      <div style="display:flex;flex-direction:column;align-items:center">${p}</div>
    </div>`}u+=`</div>`;let d=new Date(l+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`});return u+=`<div class="cv-month-day-panel">
    <div class="cv-month-day-panel-title">${g(d)}</div>
    <div id="cv-day-panel">${cc(e,l)}</div>
  </div>`,u}function hc(e,t){ec=e,tc.clear();let n=(s.kids?.profiles||[]).find(e=>String(e.id)===String(t));n&&uc(n)}function gc(e,t){hc(e,t)}function _c(e,t){let n=(s.kids?.notifications||[]).find(t=>t.id===e);n&&(n.read=!0),window.saveData(s),Js(t)}function vc(e,t){let n=(s.kids?.prizes||[]).find(e=>String(e.id)===String(t));if(!n)return;let r=`<div class="cv2-confirm">
    <div class="cv2-confirm-emoji">${n.emoji||`🎁`}</div>
    <div class="cv2-confirm-title">${g(n.name)}</div>
    <div class="cv2-confirm-cost">⭐ ${n.pointCost} points</div>
    <button class="cv2-confirm-send" onclick="redeemPrizeChildView('${e}','${t}')">
      Send request ✉️
    </button>
    <button class="cv2-confirm-cancel" onclick="_cvSwitchTab('prizes','${e}')">Cancel</button>
  </div>`;document.getElementById(`cv-content`).innerHTML=r}function yc(e,t){s.kids.completions.find(n=>n.kidId===e&&n.choreId===t&&n.status===`pending`)||(s.kids.completions.push({id:uid(),kidId:e,choreId:t,status:`pending`,ts:new Date().toISOString()}),window.saveData(s),Js(e))}function bc(e,t){s.kids.redemptions.push({id:uid(),kidId:e,prizeId:t,status:`pending`,ts:new Date().toISOString()}),window.saveData(s),nc(`prizes`,e)}function xc(e){let t=(s.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(window._activeProfile={id:t.id,name:t.name,emoji:t.emoji,role:`child`},window.setKidSession(t.id),Js(e))}function Sc(){let e=document.getElementById(`dev-tools-overlay`),t=document.getElementById(`dev-tools-sheet`),n=document.getElementById(`dev-tools-body`);if(!e||!t)return;let r=new Date().toISOString().slice(0,10);new Date(Date.now()+864e5).toISOString().slice(0,10),new Date(Date.now()+3*864e5).toISOString().slice(0,10),new Date(Date.now()+7*864e5).toISOString().slice(0,10),new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().slice(0,7),r.slice(0,7),n.innerHTML=[{label:`💰 Wallet — full budget`,desc:`Income, expenses, actuals, bills, goals, net worth`,fn:`_devLoadWallet`},{label:`👨‍👩‍👧 Kids zone`,desc:`Two kids, chores, prizes, completions, redemptions`,fn:`_devLoadKids`},{label:`📋 Routines`,desc:`Morning & evening routines with steps, assigned to kids`,fn:`_devLoadRoutines`},{label:`📅 Planner & events`,desc:`Events today, tomorrow, this week, recurring`,fn:`_devLoadPlanner`},{label:`🏠 Home — docs, vehicles, maintenance`,desc:`Documents expiring, vehicle rego, maintenance tasks`,fn:`_devLoadHome`},{label:`🍽 Meals & lunchbox`,desc:`This week's meal plan + kids lunchbox entries`,fn:`_devLoadMeals`},{label:`🌟 Load everything`,desc:`All of the above in one shot`,fn:`_devLoadAll`,primary:!0},{label:`🗑 Reset to empty`,desc:`Clears all state back to defaults`,fn:`_devReset`,danger:!0}].map(e=>`
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--hairline-soft)">
      <div>
        <div style="font-size:14px;font-weight:600;color:var(--ink)">${e.label}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px;font-family:var(--mono)">${e.desc}</div>
      </div>
      <button onclick="${e.fn}();_devToolsClose()" style="
        padding:8px 16px;border-radius:99px;border:none;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;
        background:${e.danger?`var(--alert-soft)`:e.primary?`var(--ink)`:`var(--purple-soft)`};
        color:${e.danger?`var(--alert)`:e.primary?`#fff`:`var(--purple)`};
      ">Load</button>
    </div>`).join(``)+`<div style="margin-top:16px;padding:12px;background:var(--hairline-soft);border-radius:12px">
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Current state</div>
      <div style="font-family:var(--mono);font-size:11px;color:var(--ink-soft);line-height:1.8">
        Bills: ${(s.bills||[]).length} ·
        Budget items: ${(s.budget?.expenses||[]).length} ·
        Goals: ${(s.goals||[]).length} ·
        Kids: ${(s.kids?.profiles||[]).length} ·
        Routines: ${(s.routines||[]).length} ·
        Events: ${(s.planner?.events||[]).length}
      </div>
    </div>`,e.style.display=`block`,t.style.display=`block`}function Cc(){document.getElementById(`dev-tools-overlay`).style.display=`none`,document.getElementById(`dev-tools-sheet`).style.display=`none`}function wc(){let e=new Date().toISOString().slice(0,7);new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().slice(0,7),s.budget.income=[{id:uid(),name:`Salary`,category:`Salary`,amount:8500,frequency:`monthly`},{id:uid(),name:`Freelance`,category:`Freelance / Contract`,amount:1200,frequency:`monthly`}],s.budget.expenses=[{id:uid(),name:`Mortgage`,category:`Mortgage / Rent`,amount:2800,frequency:`monthly`},{id:uid(),name:`Groceries`,category:`Groceries`,amount:900,frequency:`monthly`},{id:uid(),name:`Electricity`,category:`Utilities`,amount:220,frequency:`monthly`},{id:uid(),name:`Internet`,category:`Utilities`,amount:89,frequency:`monthly`},{id:uid(),name:`Car insurance`,category:`Insurance`,amount:180,frequency:`monthly`},{id:uid(),name:`Dining out`,category:`Dining Out`,amount:350,frequency:`monthly`},{id:uid(),name:`Netflix`,category:`Subscriptions`,amount:23,frequency:`monthly`},{id:uid(),name:`Spotify`,category:`Subscriptions`,amount:12,frequency:`monthly`},{id:uid(),name:`Gym`,category:`Health`,amount:75,frequency:`monthly`},{id:uid(),name:`Kids activities`,category:`Childcare / Education`,amount:280,frequency:`monthly`}];let t={};s.budget.expenses.forEach(e=>{t[e.id]=Math.round(parseFloat(e.amount)*(.4+Math.random()*.7))}),s.budget.actuals[e]=t;let n=e=>{let t=new Date;return t.setDate(t.getDate()+e),t.getDate()},r=e=>{let t=new Date;return t.setDate(t.getDate()+e),t.getMonth()+1};s.bills=[{id:uid(),name:`Electricity`,amount:180,dueDay:n(0),dueMonth:r(0),category:`Utilities`},{id:uid(),name:`Council rates`,amount:420,dueDay:n(1),dueMonth:r(1),category:`Other`},{id:uid(),name:`Phone plan`,amount:45,dueDay:n(2),dueMonth:r(2),category:`Utilities`},{id:uid(),name:`Water bill`,amount:185,dueDay:n(4),dueMonth:r(4),category:`Utilities`},{id:uid(),name:`Internet`,amount:89,dueDay:n(5),dueMonth:r(5),category:`Utilities`},{id:uid(),name:`Spotify`,amount:12,dueDay:n(6),dueMonth:r(6),category:`Subscriptions`},{id:uid(),name:`Home insurance`,amount:290,dueDay:n(14),dueMonth:r(14),category:`Insurance`}],s.goals=[{id:uid(),name:`Emergency fund`,type:`emergency`,targetAmount:25e3,currentAmount:11200,deadline:``},{id:uid(),name:`Europe holiday`,type:`holiday`,targetAmount:8e3,currentAmount:2400,deadline:`2026-12-01`},{id:uid(),name:`New car`,type:`vehicle`,targetAmount:35e3,currentAmount:7800,deadline:`2027-06-01`}],s.netWorth={assets:[{id:uid(),name:`Home`,category:`Property`,amount:85e4},{id:uid(),name:`Super`,category:`Super`,amount:142e3},{id:uid(),name:`Savings`,category:`Savings`,amount:28e3},{id:uid(),name:`Car`,category:`Vehicle`,amount:22e3}],liabilities:[{id:uid(),name:`Mortgage`,category:`Mortgage`,amount:52e4},{id:uid(),name:`Car loan`,category:`Loan`,amount:12e3}],snapshots:[],target:{amount:15e5,byYear:2040}},s.settings={...s.settings,adultName:`Robert Gentilcore`,householdName:`Gentilcore Family`},window.saveData(s),window.renderAll()}function Tc(){_routineTodayKey();let e=uid(),t=uid(),n=uid(),r=uid(),i=uid(),a=uid(),o=uid();s.kids={profiles:[{id:e,name:`Amy`,emoji:`🌸`,dob:`2015-03-14`,pinHash:null},{id:t,name:`Johnny`,emoji:`⚡`,dob:`2013-07-22`,pinHash:null}],chores:[{id:n,name:`Make bed`,emoji:`🛏️`,assignedTo:e,points:5,frequency:`Daily`},{id:r,name:`Tidy room`,emoji:`🧹`,assignedTo:e,points:10,frequency:`Daily`},{id:i,name:`Take out bins`,emoji:`🗑️`,assignedTo:t,points:15,frequency:`Weekly`}],prizes:[{id:a,name:`Extra screen time`,emoji:`📱`,pointCost:30},{id:o,name:`Movie night pick`,emoji:`🎬`,pointCost:50},{id:uid(),name:`Takeaway dinner choice`,emoji:`🍕`,pointCost:80}],completions:[{id:uid(),kidId:e,choreId:n,status:`approved`,ts:new Date().toISOString(),completedAt:new Date().toISOString()},{id:uid(),kidId:e,choreId:r,status:`pending`,ts:new Date().toISOString()},{id:uid(),kidId:t,choreId:i,status:`approved`,ts:new Date().toISOString(),completedAt:new Date().toISOString()}],redemptions:[{id:uid(),kidId:e,prizeId:a,status:`pending`,ts:new Date().toISOString()}],notifications:[],allowances:[]},s.childEvents=[{id:uid(),title:`Soccer training`,emoji:`⚽`,date:new Date().toISOString().slice(0,10),time:`17:00`,assignedTo:[t],isHouseholdWide:!1,createdBy:`dev`},{id:uid(),title:`Piano lesson`,emoji:`🎹`,date:new Date(Date.now()+864e5).toISOString().slice(0,10),time:`15:30`,assignedTo:[e],isHouseholdWide:!1,createdBy:`dev`},{id:uid(),title:`Family dinner`,emoji:`🍽️`,date:new Date(Date.now()+2*864e5).toISOString().slice(0,10),time:`19:00`,assignedTo:[],isHouseholdWide:!0,createdBy:`dev`}],window.saveData(s),window.renderAll()}function Ec(){let e=_routineTodayKey(),t=s.kids?.profiles?.[0],n=s.kids?.profiles?.[1],r=[{id:uid(),label:`Make bed`,emoji:`🛏️`,points:5,durationMin:2},{id:uid(),label:`Shower`,emoji:`🚿`,points:5,durationMin:10},{id:uid(),label:`Breakfast`,emoji:`🥣`,points:5,durationMin:15},{id:uid(),label:`Pack bag`,emoji:`🎒`,points:5,durationMin:5}],i=[{id:uid(),label:`Homework`,emoji:`📚`,points:10,durationMin:30},{id:uid(),label:`Tidy room`,emoji:`🧹`,points:5,durationMin:10},{id:uid(),label:`Brush teeth`,emoji:`🦷`,points:5,durationMin:3}],a=[{id:uid(),label:`Exercise`,emoji:`💪`,points:0,durationMin:30},{id:uid(),label:`Meditate`,emoji:`🧘`,points:0,durationMin:10},{id:uid(),label:`Plan the day`,emoji:`📋`,points:0,durationMin:5},{id:uid(),label:`Vitamins`,emoji:`💊`,points:0,durationMin:1}],o=[{id:uid(),label:`Tidy kitchen`,emoji:`🍽️`,points:0,durationMin:10},{id:uid(),label:`Review the day`,emoji:`🪞`,points:0,durationMin:5},{id:uid(),label:`Read`,emoji:`📖`,points:0,durationMin:20},{id:uid(),label:`Lights out`,emoji:`💤`,points:0,durationMin:0}],c=new Date().getHours(),l=uid(),u=uid(),d=uid(),f=uid(),p=[{id:l,name:`Morning`,emoji:`☀️`,ownerType:`adult`,ownerId:`dev`,sharedWith:[],steps:a,pointsPerCompletion:0,triggerTime:`07:00`,recurrence:{type:`weekdays`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[],completions:{}},{id:u,name:`Evening`,emoji:`🌙`,ownerType:`adult`,ownerId:`dev`,sharedWith:[],steps:o,pointsPerCompletion:0,triggerTime:`${String(c).padStart(2,`0`)}:00`,recurrence:{type:`daily`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[],completions:{}},{id:d,name:`Morning routine`,emoji:`🌤️`,ownerType:`household`,ownerId:`dev`,sharedWith:[],steps:r,pointsPerCompletion:10,triggerTime:`07:30`,recurrence:{type:`weekdays`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[]},{id:f,name:`Evening routine`,emoji:`🌙`,ownerType:`household`,ownerId:`dev`,sharedWith:[],steps:i,pointsPerCompletion:10,triggerTime:`${String(c).padStart(2,`0`)}:00`,recurrence:{type:`daily`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[]}];s.routines=[...(s.routines||[]).filter(e=>e.ownerType!==`adult`&&e.ownerType!==`household`),...p];let m=[];if(t){let n={id:uid(),routineId:d,childId:t.id,completionState:{}};n.completionState[e]=[r[0].id,r[1].id],m.push(n),m.push({id:uid(),routineId:f,childId:t.id,completionState:{}})}n&&(m.push({id:uid(),routineId:d,childId:n.id,completionState:{}}),m.push({id:uid(),routineId:f,childId:n.id,completionState:{}})),s.routineAssignments=[...s.routineAssignments||[],...m];let h=p[0];h.completions[e]=[a[0].id,a[1].id],window.saveData(s),window.renderAll()}function Dc(){let e=new Date().toISOString().slice(0,10),t=new Date(Date.now()+864e5).toISOString().slice(0,10),n=new Date(Date.now()+3*864e5).toISOString().slice(0,10),r=new Date(Date.now()+5*864e5).toISOString().slice(0,10),i=new Date(Date.now()+7*864e5).toISOString().slice(0,10),a=_plannerMembers(),o=a[0]?.id||`everyone`,c=a[1]?.id||o;s.planner={events:[{id:uid(),title:`School drop-off`,category:`family`,date:e,time:`08:30`,memberIds:[o],allDay:!1,recurrence:{type:`weekdays`,startDate:`2026-01-01`}},{id:uid(),title:`Team standup`,category:`work`,date:e,time:`09:00`,memberIds:[o],allDay:!1},{id:uid(),title:`Dentist appointment`,category:`health`,date:e,time:`14:00`,memberIds:[o],allDay:!1},{id:uid(),title:`Dinner reservation`,category:`social`,date:e,time:`19:30`,memberIds:[`everyone`],allDay:!1},{id:uid(),title:`Parent–teacher night`,category:`family`,date:t,time:`18:00`,memberIds:[o,c],allDay:!1},{id:uid(),title:`Grocery run`,category:`family`,date:t,time:`10:00`,memberIds:[o],allDay:!1},{id:uid(),title:`Weekend hike`,category:`social`,date:n,time:`08:00`,memberIds:[`everyone`],allDay:!1},{id:uid(),title:`Car service`,category:`home`,date:r,time:`09:00`,memberIds:[o],allDay:!1},{id:uid(),title:`Amy's birthday`,category:`family`,date:i,allDay:!0,memberIds:[`everyone`]}]},window.saveData(s),window.renderAll()}function Oc(){new Date().toISOString().slice(0,10);let e=new Date(Date.now()+14*864e5).toISOString().slice(0,10),t=new Date(Date.now()+60*864e5).toISOString().slice(0,10),n=new Date(Date.now()-7*864e5).toISOString().slice(0,10),r=new Date(Date.now()-30*864e5).toISOString().slice(0,10),i=new Date(Date.now()-90*864e5).toISOString().slice(0,10);s.documents=[{id:uid(),name:`Passport — Robert`,provider:`DFAT`,expiryDate:e},{id:uid(),name:`Home insurance`,provider:`NRMA`,expiryDate:t},{id:uid(),name:`Working with children check`,provider:`Service NSW`,expiryDate:r},{id:uid(),name:`First aid certificate`,provider:`St John`,expiryDate:n}],s.vehicles=[{id:uid(),name:`Tesla Model 3`,make:`Tesla`,model:`Model 3`,plate:`ABC123`,regoExpiry:t,insurance:{provider:`NRMA`,renewalDate:t}},{id:uid(),name:`Toyota RAV4`,make:`Toyota`,model:`RAV4`,plate:`XYZ789`,regoExpiry:n,insurance:{provider:`AAMI`,renewalDate:t}}],s.maintenance=[{id:uid(),name:`Gutter clean`,provider:`Jim's`,nextDue:i,frequency:`Biannual`,notes:`Both sides`},{id:uid(),name:`Car service — RAV4`,provider:`Toyota Service`,nextDue:r,frequency:`Annual`,notes:`15,000km service`},{id:uid(),name:`Termite inspection`,provider:`Rentokil`,nextDue:n,frequency:`Annual`,notes:``},{id:uid(),name:`HVAC filter`,provider:``,nextDue:e,frequency:`Quarterly`,notes:``},{id:uid(),name:`Smoke alarm test`,provider:``,nextDue:t,frequency:`Annual`,notes:``}],s.householdProfile={...s.householdProfile,members:[{role:`adult`,name:`Robert`,age:38,emoji:`👨`},{role:`adult`,name:`Sarah`,age:36,emoji:`👩`}]},window.saveData(s),window.renderAll()}function kc(){let e=typeof _mealWeekKey==`function`?_mealWeekKey(0):`week-0`,t={},n=[[`Porridge`,`Sandwich & apple`,`Chicken stir-fry`],[`Eggs on toast`,`Leftovers`,`Beef tacos`],[`Smoothie`,`Caesar salad`,`Pasta bolognese`],[`Avocado toast`,`Sushi`,`Lamb roast`],[`Cereal`,`Toasted sandwich`,`Fish & chips`],[`Pancakes`,`Fruit bowl`,`BBQ`],[`French toast`,`Cold cuts`,`Pizza night`]];for(let e=0;e<7;e++)t[e]={b:n[e][0],l:n[e][1],d:n[e][2]};s.meals||(s.meals={plan:{},shopping:[],lunchbox:{profiles:[],plans:{}},pantry:[]}),s.meals.plan[e]=t;let r=s.kids?.profiles?.[0];if(r){let t=typeof _mealWeekKey==`function`?_mealWeekKey(0):e;s.meals.lunchbox.plans||(s.meals.lunchbox.plans={}),s.meals.lunchbox.plans[t]||(s.meals.lunchbox.plans[t]={});let n=new Date().getDay()===0?6:new Date().getDay()-1;s.meals.lunchbox.plans[t][r.id]={},s.meals.lunchbox.plans[t][r.id][n]={main:`🥪 Vegemite sandwich`,snack:`🍫 Muesli bar`,fruit:`🍎 Apple`,drink:`💧 Water`}}s.lists||window._applyMigrations(s);let i=new Date().toISOString();s.lists.food.items=[{id:`dev-f1`,name:`Milk`,quantity:2,unit:`L`,notes:``,aisle:`dairy`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f2`,name:`Eggs`,quantity:1,unit:`dozen`,notes:`Free range`,aisle:`dairy`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f3`,name:`Chicken breast`,quantity:500,unit:`g`,notes:``,aisle:`meat`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f4`,name:`Spinach`,quantity:1,unit:`units`,notes:``,aisle:`produce`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f5`,name:`Bread`,quantity:1,unit:`units`,notes:`Sourdough`,aisle:`bakery`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f6`,name:`Pasta`,quantity:500,unit:`g`,notes:``,aisle:`pantry`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f7`,name:`Beer`,quantity:1,unit:`units`,notes:``,aisle:`drinks`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f8`,name:`Avocado`,quantity:2,unit:`units`,notes:``,aisle:`produce`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f9`,name:`Butter`,quantity:1,unit:`units`,notes:`Salted`,aisle:`dairy`,state:`got_it`,addedBy:`dev`,addedAt:i,stateChangedAt:i,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f10`,name:`Orange juice`,quantity:1,unit:`L`,notes:``,aisle:`drinks`,state:`got_it`,addedBy:`dev`,addedAt:i,stateChangedAt:i,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f11`,name:`Oat milk`,quantity:1,unit:`L`,notes:``,aisle:`dairy`,state:`not_found`,addedBy:`dev`,addedAt:i,stateChangedAt:i,mealTag:null,manualPrice:null,barcodeId:null}],s.lists.food.weeklyBudget=200,s.lists.food.favourites=[{name:`Milk`,addedCount:8,pinned:!0},{name:`Eggs`,addedCount:7,pinned:!0},{name:`Bread`,addedCount:6,pinned:!1},{name:`Chicken breast`,addedCount:5,pinned:!1},{name:`Butter`,addedCount:4,pinned:!1}],s.lists.wishlist.items=[{id:`dev-w1`,name:`AirPods Pro`,quantity:1,unit:`units`,notes:`Gen 2`,aisle:`other`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-w2`,name:`Standing desk mat`,quantity:1,unit:`units`,notes:``,aisle:`other`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-w3`,name:`Kindle Paperwhite`,quantity:1,unit:`units`,notes:``,aisle:`other`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null}],window.saveData(s),window.renderAll()}function Ac(){wc(),Tc(),Ec(),Dc(),Oc(),kc()}function jc(){if(!confirm(`Reset all data to empty defaults?`))return;let e=JSON.parse(JSON.stringify(DEFAULT_DATA));e.onboarded=!0,e.setupProgressDismissed=!1,_replaceState(e),window.saveData(e),window.renderAll()}var Mc=null,Nc=[{key:`main`,label:`Main`},{key:`snack`,label:`Snack`},{key:`fruit`,label:`Fruit`},{key:`drink`,label:`Drink`}],Pc=[`Nuts`,`Dairy`,`Gluten`,`Eggs`,`Soy`,`Seafood`,`Sesame`];function Fc(){let e=document.getElementById(`lunchbox-content`);if(!e)return;let t=s.meals.lunchbox,n=t.profiles||[];if(n.length===0){e.innerHTML=`
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon" style="font-size:48px">🍱</div>
        <p style="margin:12px 0">Set up your child's profile to start planning school lunches.</p>
        <button class="btn btn-primary" onclick="openLunchboxProfile()">+ Add Child</button>
      </div>`;return}(!Mc||!n.find(e=>e.id===Mc))&&(Mc=n[0].id);let r=n.find(e=>e.id===Mc),i=_mealWeekKey(0),a=_mealWeekDates(i).slice(0,5),o=(t.plans[i]||{})[Mc]||{},c=new Date().toISOString().slice(0,10),l=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`],u=n.map(e=>`<button class="lb-kid-tab${e.id===Mc?` active`:``}" onclick="_lbActiveKid=${e.id};renderLunchbox()">${g(e.name)}</button>`).join(``);a[0].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),a[4].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});let d=``;Nc.forEach(e=>{d+=`<div class="lb-label">${e.label}</div>`,a.forEach((t,n)=>{let r=(o[n]||{})[e.key]||``,a=t.toISOString().slice(0,10)===c;d+=`<div class="lb-cell${a?` today`:``}" onclick="openLunchboxEdit('${i}',${Mc},${n},'${e.key}')">
        ${r?`<span class="lb-cell-text">${g(r)}${s.settings?.showCalories&&(o[n]||{})[`cal_`+e.key]?`<br><span style="font-size:8px;color:var(--text-muted);font-weight:600">${o[n][`cal_`+e.key]} cal</span>`:``}</span>`:`<span class="lb-cell-plus">+</span>`}
      </div>`})});let f=(r.allergies||[]).map(e=>`<span class="lb-tag allergy">${g(e)}</span>`).join(``),p=(r.dislikes||[]).map(e=>`<span class="lb-tag dislike">${g(e)}</span>`).join(``),m=(r.favourites||[]).map(e=>`<span class="lb-tag fav">${g(e)}</span>`).join(``),h=!!localStorage.getItem(`toto_ai_key`),_=Object.values(o).reduce((e,t)=>e+Object.values(t||{}).filter(Boolean).length,0);e.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:16px">
      <div class="lb-kid-tabs">${u}
        <button class="lb-kid-tab" onclick="openLunchboxProfile()" style="border-style:dashed">+</button>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-sm" onclick="openLunchboxProfile(${r.id})">Edit profile</button>
      </div>
    </div>

    <div class="lb-profile-card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:15px;font-weight:700">${g(r.name)}</div>
        ${r.school?`<span style="font-size:12px;color:var(--text-muted)">${g(r.school)}</span>`:``}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${f||``}${p||``}${m||``}
        ${!f&&!p&&!m?`<span style="font-size:12px;color:var(--text-muted)">No preferences set — edit profile to add allergies, dislikes, favourites</span>`:``}
      </div>
      ${r.schoolRules?`<div style="font-size:11px;color:var(--text-muted);margin-top:6px">School rules: ${g(r.schoolRules)}</div>`:``}
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;align-items:center;gap:8px">
        <button class="btn btn-sm" onclick="_lbWeekOffset--;renderLunchbox()" style="font-size:16px;padding:2px 10px">‹</button>
        <span style="font-size:14px;font-weight:700;min-width:140px;text-align:center">
          This Week
        </span>
        <button class="btn btn-sm" onclick="_lbWeekOffset++;renderLunchbox()" style="font-size:16px;padding:2px 10px">›</button>
        
      </div>
      <div style="display:flex;gap:8px">
        ${h?`<button class="btn btn-primary btn-sm" id="lb-ai-btn" onclick="aiPlanLunchbox('${i}',${r.id})">Plan this week</button>`:``}
        ${_>0?`<button class="btn btn-sm" onclick="lbToShoppingList('${i}',${r.id})">Add to shopping list</button>`:``}
      </div>
    </div>

    <div style="overflow-x:auto">
      <div class="lb-grid" style="min-width:460px">
        <div class="lb-header"></div>
        ${a.map((e,t)=>`<div class="lb-header" style="${e.toISOString().slice(0,10)===c?`background:#0891b2;color:#fff`:``}">${l[t]}<div style="font-size:9px;opacity:0.7">${e.getDate()}/${e.getMonth()+1}</div></div>`).join(``)}
        ${d}
        ${s.settings?.showCalories?`<div class="lb-label" style="font-weight:800;font-size:9px">Total</div>`+a.map((e,t)=>{let n=o[t]||{},r=(n.cal_main||0)+(n.cal_snack||0)+(n.cal_fruit||0)+(n.cal_drink||0);return`<div style="background:var(--surface);padding:6px;text-align:center;font-size:10px;font-weight:700;color:${r>0?`var(--text)`:`var(--border)`}">${r>0?r:`—`}</div>`}).join(``):``}
      </div>
    </div>`}function Ic(e){let t=e?(s.meals.lunchbox.profiles||[]).find(t=>t.id===e):null;document.getElementById(`modal-title`).textContent=t?`Edit ${g(t.name)}`:`Add Child`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Child's Name</label>
      <input class="form-input" id="lb-name" type="text" maxlength="200" value="${t?_(t.name):``}" placeholder="e.g. Jake">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">School</label>
        <input class="form-input" id="lb-school" type="text" maxlength="200" value="${t?_(t.school||``):``}" placeholder="e.g. Emmaus Christian">
      </div>
      <div class="form-group">
        <label class="form-label">School Rules</label>
        <input class="form-input" id="lb-rules" type="text" maxlength="200" value="${t?_(t.schoolRules||``):``}" placeholder="e.g. Nut-free zone">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Allergies <span style="font-weight:400;color:var(--text-muted)">(click to toggle)</span></label>
      <div id="lb-allergies" style="display:flex;flex-wrap:wrap;gap:6px">
        ${Pc.map(e=>{let n=t&&(t.allergies||[]).includes(e);return`<button type="button" class="lb-tag${n?` allergy`:``}" style="cursor:pointer;${n?``:`background:var(--surface2);color:var(--text-muted);border:1px solid var(--border)`}"
            onclick="this.classList.toggle('allergy');if(!this.classList.contains('allergy')){this.style.background='var(--surface2)';this.style.color='var(--text-muted)';this.style.borderColor='var(--border)'}else{this.style.background='#fef2f2';this.style.color='#dc2626';this.style.borderColor='#fca5a5'}"
            data-val="${e}">${e}</button>`}).join(``)}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Dislikes <span style="font-weight:400;color:var(--text-muted)">(comma separated)</span></label>
      <input class="form-input" id="lb-dislikes" type="text" maxlength="200" value="${t?_((t.dislikes||[]).join(`, `)):``}" placeholder="e.g. mushrooms, brown bread, olives">
    </div>
    <div class="form-group">
      <label class="form-label">Favourites <span style="font-weight:400;color:var(--text-muted)">(comma separated)</span></label>
      <input class="form-input" id="lb-favs" type="text" maxlength="200" value="${t?_((t.favourites||[]).join(`, `)):``}" placeholder="e.g. wraps, cheese, strawberries, pasta">
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${t?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deleteLbProfile(${e})">Delete</button>`:``}
    <button class="btn" onclick="window.closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveLbProfile(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Lc(e){let t=document.getElementById(`lb-name`)?.value.trim();if(!t)return;let n=[...document.querySelectorAll(`#lb-allergies .allergy`)].map(e=>e.dataset.val),r=(document.getElementById(`lb-dislikes`)?.value||``).split(`,`).map(e=>e.trim()).filter(Boolean),i=(document.getElementById(`lb-favs`)?.value||``).split(`,`).map(e=>e.trim()).filter(Boolean),a={name:t,school:document.getElementById(`lb-school`)?.value.trim()||``,schoolRules:document.getElementById(`lb-rules`)?.value.trim()||``,allergies:n,dislikes:r,favourites:i},o=s.meals.lunchbox.profiles;if(e){let t=o.find(t=>t.id===e);t&&Object.assign(t,a)}else a.id=o.length?Math.max(...o.map(e=>e.id))+1:1,o.push(a),Mc=a.id;window.saveData(s),window.closeModal(),Fc()}function Rc(e){confirm(`Delete this child profile and their lunchbox plans?`)&&(s.meals.lunchbox.profiles=s.meals.lunchbox.profiles.filter(t=>t.id!==e),Object.keys(s.meals.lunchbox.plans).forEach(t=>{delete s.meals.lunchbox.plans[t][e]}),Mc=null,window.saveData(s),window.closeModal(),Fc())}function zc(e,t,n,r){let i=[`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`],a={main:`Main`,snack:`Snack`,fruit:`Fruit`,drink:`Drink`},o=(((s.meals.lunchbox.plans[e]||{})[t]||{})[n]||{})[r]||``,c=new Set;Object.values(s.meals.lunchbox.plans).forEach(e=>{Object.values(e).forEach(e=>{Object.values(e).forEach(e=>{e&&e[r]&&c.add(e[r])})})});let l=[...c].filter(e=>e!==o).slice(0,12);document.getElementById(`modal-title`).textContent=`${i[n]} · ${a[r]}`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">${a[r]}</label>
      <input class="form-input" id="lb-input" type="text" maxlength="200" value="${_(o)}" placeholder="e.g. ${r===`main`?`Ham & cheese wrap`:r===`snack`?`Muesli bar`:r===`fruit`?`Apple`:`Water`}" autocomplete="off">
    </div>
    ${l.length?`
    <div>
      <div class="form-label" style="margin-bottom:6px">Previous</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${l.map(e=>`<button style="padding:4px 12px;border-radius:99px;border:1px solid var(--border);background:var(--surface2);font-size:12px;cursor:pointer"
          onclick="document.getElementById('lb-input').value='${_(e)}'">${g(e)}</button>`).join(``)}
      </div>
    </div>`:``}`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn" onclick="_saveLbSlot('${e}',${t},${n},'${r}','')">Clear</button>
    <button class="btn btn-primary" onclick="_saveLbSlot('${e}',${t},${n},'${r}',document.getElementById('lb-input').value.trim())">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`),setTimeout(()=>{let e=document.getElementById(`lb-input`);e&&(e.focus(),e.select())},80)}function Bc(e,t,n,r,i){s.meals.lunchbox.plans[e]||(s.meals.lunchbox.plans[e]={}),s.meals.lunchbox.plans[e][t]||(s.meals.lunchbox.plans[e][t]={}),s.meals.lunchbox.plans[e][t][n]||(s.meals.lunchbox.plans[e][t][n]={}),s.meals.lunchbox.plans[e][t][n][r]=i,delete s.meals.lunchbox.plans[e][t][n][`cal_`+r],window.saveData(s),window.closeModal(),Fc(),i&&s.settings?.showCalories&&Vc(e,t,n,r,i)}async function Vc(e,t,n,r,i){let a=localStorage.getItem(`toto_ai_key`);if(!(!a||!i))try{let o=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":a,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:50,messages:[{role:`user`,content:`Estimate the calories in this school lunch item: "${i}". Return ONLY a number, nothing else. For example: 250`}]})});if(!o.ok)return;let c=await o.json(),l=parseInt(c.content[0].text.trim().replace(/[^0-9]/g,``));l>0&&l<3e3&&s.meals.lunchbox.plans[e]?.[t]?.[n]&&(s.meals.lunchbox.plans[e][t][n][`cal_`+r]=l,window.saveData(s),Fc())}catch{}}async function Hc(e,t){let n=localStorage.getItem(`toto_ai_key`);if(!n)return;let r=(s.meals.lunchbox.profiles||[]).find(e=>e.id===t);if(!r)return;let i=document.getElementById(`lb-ai-btn`);i&&(i.textContent=`Planning...`,i.disabled=!0);let a=`Plan 5 days (Monday to Friday) of school lunches for a child:

Name: ${r.name}
School: ${r.school||`not specified`}
Allergies: ${(r.allergies||[]).join(`, `)||`none`}
Dislikes: ${(r.dislikes||[]).join(`, `)||`none`}
Favourites: ${(r.favourites||[]).join(`, `)||`not specified`}
School rules: ${r.schoolRules||`none specified`}

Each day needs: main (sandwich/wrap/salad/pasta etc), snack, fruit, drink.
Keep it realistic — things a parent can prep in under 5 minutes.
Vary the options across the week. Respect all allergies strictly.
Use Australian food items and brands where relevant.

Return ONLY a JSON array, one object per day (Mon=0 to Fri=4).
${s.settings?.showCalories?`Include estimated calories for each item as cal_main, cal_snack, cal_fruit, cal_drink.`:``}
[{"day":0,"main":"Ham & cheese wrap","snack":"Muesli bar","fruit":"Apple","drink":"Water"${s.settings?.showCalories?`,"cal_main":320,"cal_snack":180,"cal_fruit":80,"cal_drink":0`:``}},{"day":1,...}]

No markdown, no code fences, just raw JSON.`;try{let r=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":n,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:1024,messages:[{role:`user`,content:a}]})});if(!r.ok)throw Error(`API ${r.status}`);let i=(await r.json()).content[0].text.replace(/```[\w]*\n?/g,``).trim().match(/\[[\s\S]*\]/);if(!i)throw Error(`No JSON`);let o=JSON.parse(i[0]);s.meals.lunchbox.plans[e]||(s.meals.lunchbox.plans[e]={}),s.meals.lunchbox.plans[e][t]||(s.meals.lunchbox.plans[e][t]={}),o.forEach(n=>{let r={main:n.main||``,snack:n.snack||``,fruit:n.fruit||``,drink:n.drink||``};n.cal_main&&(r.cal_main=n.cal_main),n.cal_snack&&(r.cal_snack=n.cal_snack),n.cal_fruit&&(r.cal_fruit=n.cal_fruit),n.cal_drink&&(r.cal_drink=n.cal_drink),s.meals.lunchbox.plans[e][t][n.day]=r}),window.saveData(s),Fc()}catch(e){console.error(`Lunchbox AI error:`,e),i&&(i.textContent=`Plan this week`,i.disabled=!1)}}function Uc(e,t){let n=(s.meals.lunchbox.plans[e]||{})[t]||{},r=new Set;Object.values(n).forEach(e=>{e.main&&r.add(e.main),e.snack&&r.add(e.snack),e.fruit&&r.add(e.fruit)}),s.lists||(s.lists={}),s.lists.food||(s.lists.food={items:[],weeklyBudget:200,budget:0,stores:[],favourites:[],history:[]});let i=s.lists.food.items,a=0;r.forEach(e=>{i.some(t=>t.name.toLowerCase()===e.toLowerCase()&&t.state===`active`)||(i.push({id:`si-lb-`+Date.now()+`-`+a,name:e,quantity:1,unit:`units`,notes:``,aisle:_inferAisle?_inferAisle(e):`other`,state:`active`,addedBy:`lunchbox`,addedAt:new Date().toISOString(),mealTag:`Lunchbox`,manualPrice:null,barcodeId:null}),a++)}),a>0&&(window.saveData(s),_listsActiveType=`food`,_listsView=`list`,activateTab(`lists`));let o=document.querySelector(`[onclick^="lbToShoppingList"]`);if(o){let e=o.textContent;o.textContent=`Added ${a} items`,o.style.color=`var(--success)`,setTimeout(()=>{o.textContent=e,o.style.color=``},2e3)}}var Wc=[],Gc=0,Kc=null;function qc(e){Wc=e,Gc=0,Jc()}function Jc(){if(Qc(),Gc>=Wc.length){Zc();return}let e=Wc[Gc];e.tab&&_activeTab()!==e.tab?(activateTab(e.tab),setTimeout(()=>Yc(e),500)):setTimeout(()=>Yc(e),100)}function Yc(e){let t=e.el?typeof e.el==`string`?document.querySelector(e.el):e.el:null,n=document.createElement(`div`);n.className=`guide-overlay`,n.onclick=()=>Zc(),document.body.appendChild(n);let r=null,i=null;t&&(t.scrollIntoView({behavior:`smooth`,block:`center`}),i=t.getBoundingClientRect(),r=document.createElement(`div`),r.className=`guide-spotlight guide-pulse`,r.style.cssText=`top:${i.top-6}px;left:${i.left-6}px;width:${i.width+12}px;height:${i.height+12}px;`,document.body.appendChild(r));let a=document.createElement(`div`);if(a.className=`guide-tooltip`,a.innerHTML=`
    <div class="guide-tooltip-step">Step ${Gc+1} of ${Wc.length}</div>
    <div class="guide-tooltip-title">${e.title}</div>
    <div class="guide-tooltip-text">${e.text}</div>
    <div class="guide-tooltip-actions">
      <button class="guide-tooltip-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="endGuide()">Skip</button>
      ${Gc<Wc.length-1?`<button class="guide-tooltip-btn" style="background:#0891b2;color:#fff" onclick="nextGuideStep()">Next</button>`:`<button class="guide-tooltip-btn" style="background:#0891b2;color:#fff" onclick="endGuide()">Done</button>`}
    </div>`,a.onclick=e=>e.stopPropagation(),document.body.appendChild(a),i){let e=a.offsetWidth,t=a.offsetHeight,n=i.bottom+14,r=i.left+i.width/2-e/2;r<12&&(r=12),r+e>window.innerWidth-12&&(r=window.innerWidth-e-12),n+t>window.innerHeight-12&&(n=i.top-t-14),a.style.top=n+`px`,a.style.left=r+`px`}else a.style.top=`50%`,a.style.left=`50%`,a.style.transform=`translate(-50%, -50%)`;if(Kc=()=>{n.remove(),r&&r.remove(),a.remove()},e.watchClick&&t){let e=()=>{t.removeEventListener(`click`,e),setTimeout(()=>Xc(),400)};t.addEventListener(`click`,e)}}function Xc(){Gc++,Jc()}function Zc(){Qc(),Wc=[],Gc=0}function Qc(){Kc&&(Kc(),Kc=null)}var $c={emergency:[{tab:`goals`,title:`Create an Emergency Fund`,text:`An emergency fund covers 3-6 months of expenses. Let's set one up as a savings goal.`,el:null},{tab:`goals`,title:`Tap "+ New Goal"`,text:`This button creates a new savings goal. Set the name to "Emergency Fund" and the target to your 3-month expenses.`,el:`[onclick*="openAddGoal"]`,watchClick:!0}],savings:[{tab:`budget`,title:`Improve your savings rate`,text:`Your savings rate is the gap between income and expenses. To improve it, you can either reduce expenses or increase income.`,el:null},{tab:`budget`,title:`Review your expenses`,text:`Look through your expenses below. Are there any you could reduce? Tap any expense to edit it.`,el:`#budget-content`}],tracking:[{tab:`budget`,title:`Track your actual spending`,text:`Recording what you actually spend helps you stay on track. You can import your bank statement or log spends manually.`,el:null},{tab:`budget`,title:`Import transactions`,text:`Tap "Import Transactions" to upload a bank CSV, or use the + button to log individual spends.`,el:`[onclick*="openCsvImport"]`,watchClick:!0}],netWorth:[{tab:`networth`,title:`Build your net worth picture`,text:`Add what you own (property, savings, super) as assets. Add what you owe (mortgage, loans, credit cards) as liabilities.`,el:null},{tab:`networth`,title:`Start adding`,text:`Use the buttons below to add your first asset or liability. Even rough numbers help build the picture.`,el:`#networth-content`}],goals:[{tab:`goals`,title:`Set a financial goal`,text:`Goals keep you motivated — a holiday fund, debt payoff, or savings target. Let's create your first one.`,el:null},{tab:`goals`,title:`Tap "+ New Goal"`,text:`Choose a goal type, set a target amount, and start tracking your progress.`,el:`[onclick*="openAddGoal"]`,watchClick:!0}]};function el(e){let t=$c[e];t&&qc(t)}var tl=!1;function nl(e){tl=!0;let t=document.getElementById(`cv-readonly-bar`),n=document.getElementById(`cv-signout-btn`);t&&(t.style.display=``),n&&(n.style.display=`none`),window.showChildView(e),setTimeout(()=>{_cvSwitchTab(`calendar`,e)},50)}function rl(){let e=Number(s.settings?.routineResetHour??0),t=new Date,n=new Date(t);n.setHours(e,0,0,0),t<n&&n.setDate(n.getDate()-1),n.toISOString().slice(0,10);let r=!1;(s.routineAssignments||[]).forEach(e=>{e.completionState&&Object.keys(e.completionState).forEach(e=>{})});let i=t.toISOString().slice(0,10);if(s.settings?.lastRoutineResetCheck!==i){if(s.settings||(s.settings={}),s.settings.lastRoutineResetCheck=i,s.kids?.completions){let e=s.kids.completions.length;s.kids.completions=s.kids.completions.filter(e=>e.status===`pending`?new Date(e.completedAt||e.ts||0).toISOString().slice(0,10)>=i:!0),s.kids.completions.length!==e&&(r=!0)}r=!0}r&&window.saveData(s)}function il(e,t){if(!e)return!0;let{type:n,days:r,intervalDays:i,startDate:a,endDate:o}=e;if(a&&t<a||o&&t>o)return!1;let s=new Date(t+`T12:00:00`),c=s.getDay();switch(n){case`daily`:return!0;case`weekdays`:return c>=1&&c<=5;case`weekends`:return c===0||c===6;case`specific_days`:return Array.isArray(r)&&r.includes(String(c));case`interval`:{if(!a||!i)return!1;let e=new Date(a+`T12:00:00`),t=Math.round((s-e)/864e5);return t>=0&&t%i===0}case`one_time`:return t===a;default:return!0}}function al(e,t){return!e||(e.pausePeriods||[]).some(e=>t>=e.from&&(!e.to||t<=e.to))||(e.skippedDates||[]).includes(t)?!1:il(e.recurrence||null,t)}var ol={morning:[{label:`Make bed`,emoji:`🛏`,durationMin:2},{label:`Shower`,emoji:`🚿`,durationMin:10},{label:`Breakfast`,emoji:`🍳`,durationMin:15},{label:`Exercise`,emoji:`💪`,durationMin:20},{label:`Meditate`,emoji:`🧘`,durationMin:10},{label:`Plan the day`,emoji:`📋`,durationMin:5},{label:`Read`,emoji:`📚`,durationMin:15},{label:`Vitamins`,emoji:`💊`,durationMin:1},{label:`Walk`,emoji:`🚶`,durationMin:20},{label:`Journaling`,emoji:`✍️`,durationMin:10}],evening:[{label:`Tidy kitchen`,emoji:`🍽`,durationMin:10},{label:`Prep tomorrow`,emoji:`👔`,durationMin:5},{label:`Family time`,emoji:`👨‍👩‍👧`,durationMin:30},{label:`Read`,emoji:`📚`,durationMin:20},{label:`Lights out`,emoji:`💤`,durationMin:0},{label:`Stretch`,emoji:`🤸`,durationMin:10},{label:`Review the day`,emoji:`🪞`,durationMin:5},{label:`Skincare`,emoji:`🧴`,durationMin:5},{label:`No screens`,emoji:`📵`,durationMin:0},{label:`Brush teeth`,emoji:`🦷`,durationMin:3}],general:[{label:`Drink water`,emoji:`💧`,durationMin:1},{label:`Check messages`,emoji:`📱`,durationMin:5},{label:`Quick tidy`,emoji:`🧹`,durationMin:5},{label:`Gratitude`,emoji:`🙏`,durationMin:3}]};function sl(e){let t=e||new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}function H(){return sl(new Date)}function cl(){return window._currentUser?.uid||`guest`}function ll(){let e=cl();return(s.routines||[]).filter(t=>t.ownerType===`adult`&&(t.ownerId===e||(t.sharedWith||[]).includes(e)))}function ul(){return(s.routines||[]).filter(e=>e.ownerType===`household`)}function dl(e){return e.ownerId===cl()}function fl(){return s.kids?.profiles||[]}function pl(){return Math.max(0,...(s.routines||[]).map(e=>e.id))+1}function ml(){return cl(),(s.householdProfile?.authorizedUsers||[]).filter(e=>e.uid!==window.uid)}function hl(e,t){return(s.routineAssignments||[]).find(n=>n.routineId===e&&n.childId===t)}function gl(e){return(e?.completionState?.[H()]||[]).length}function _l(e,t){if(!e)return 0;let n=0,r=new Date;for(;(e.completionState?.[sl(r)]||[]).length===t&&t>0;)n++,r.setDate(r.getDate()-1);return n}function vl(e,t,n){let r=[],i=new Date;for(let a=n-1;a>=0;a--){let n=new Date(i);n.setDate(i.getDate()-a);let o=sl(n),s=(e?.completionState?.[o]||[]).length;r.push({key:o,label:n.getDate(),done:s,total:t})}return r}function yl(e){return(e.completions?.[H()]||[]).length}function bl(e){let t=0,n=new Date;for(;(e.completions?.[sl(n)]||[]).length===e.steps.length&&e.steps.length>0;)t++,n.setDate(n.getDate()-1);return t}function xl(e,t){let n=[],r=new Date;for(let i=t-1;i>=0;i--){let t=new Date(r);t.setDate(r.getDate()-i);let a=sl(t),o=(e.completions?.[a]||[]).length;n.push({key:a,label:t.getDate(),done:o,total:e.steps.length})}return n}function Sl(e){let t=new Set(e.steps.map(e=>e.label.toLowerCase())),n=e.name.toLowerCase(),r;return r=n.includes(`morning`)?[...ol.morning,...ol.general]:n.includes(`evening`)||n.includes(`night`)||n.includes(`bed`)?[...ol.evening,...ol.general]:[...ol.morning,...ol.evening,...ol.general],r.filter(e=>!t.has(e.label.toLowerCase()))}function Cl(e){if(e.ownerType===`household`){if(e.ownerId!==`household`)throw Error(`Scope violation: household routine has ownerId="${e.ownerId}"`)}else if(e.ownerType===`adult`){if(!e.ownerId||e.ownerId===`household`)throw Error(`Scope violation: adult routine has ownerId="${e.ownerId}"`)}else throw Error(`Scope violation: unknown ownerType="${e.ownerType}"`)}function wl(e){(s.routines||[]).forEach(t=>{try{Cl(t)}catch(n){console.error(`[Routines] ${e}:`,n.message,t)}}),window.saveData(s)}function Tl(){let e=ll(),t=new Date().getHours();for(let n of e){let e=yl(n),r=n.steps.length;if(!r)continue;let[i]=(n.triggerTime||`00:00`).split(`:`).map(Number),a=bl(n);if(t>=i+1&&e===0)return{icon:n.emoji,text:`Your ${n.name} routine hasn't been started yet.`};if(a>0&&a%7==0)return{icon:`🔥`,text:`${a}-day streak on your ${n.name} routine — keep it up!`};if(e>0&&e===r-1)return{icon:n.emoji,text:`One step left in your ${n.name} routine!`}}return null}function El(){let e=new Date().toISOString().slice(0,10),t=ll().filter(t=>al(t,e));if(!t.length)return``;let n=new Date().getHours(),r=t.map(e=>{let t=yl(e),r=e.steps.length,i=r>0?Math.round(t/r*100):0,[a]=(e.triggerTime||`00:00`).split(`:`).map(Number),o=n>=a+1&&t===0&&r>0;return`<div class="routine-today-row">
      <div class="routine-today-emoji">${e.emoji}</div>
      <div class="routine-today-name">${g(e.name)}</div>
      ${o?`<span class="routine-today-nudge">Not started</span>`:``}
      <div class="routine-today-progress">
        <div class="routine-today-bar-wrap"><div class="routine-today-bar-fill" style="width:${i}%"></div></div>
        <span class="routine-today-frac">${t}/${r}</span>
      </div>
    </div>`}).join(``),i=Tl();return`${i?`<div class="routine-intel-nudge" onclick="activateTab('routines')" style="margin-bottom:8px">
    <div class="routine-intel-icon">${i.icon}</div>
    <div class="routine-intel-body"><div class="routine-intel-label">Routines</div>${g(i.text)}</div>
  </div>`:``}<div class="routines-today-card" onclick="activateTab('routines')">
    <div class="routines-today-header">
      <span class="routines-today-title">Routines</span>
      <span class="routines-today-link">View all →</span>
    </div>
    <div class="routines-today-rows">${r}</div>
  </div>`}var Dl=`mine`;Object.defineProperty(window,`_routineActiveTab`,{get(){return Dl},set(e){Dl=e},configurable:!0});function U(){let e=document.getElementById(`routines-content`);if(!e)return;let t=fl(),n=t.length>0,r=`<div class="page-header" style="margin-bottom:4px">
    <h1>Routines</h1>
    <p>Build consistent daily habits</p>
  </div>
  <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary btn-sm" onclick="_routineCreate()">＋ New routine</button>
  </div>`;n&&(r+=`<div class="routine-tab-bar">
      <button class="routine-tab${Dl===`mine`?` active`:``}" onclick="_routineSetTab('mine')">My Routines</button>
      <button class="routine-tab${Dl===`children`?` active`:``}" onclick="_routineSetTab('children')">Children's Routines</button>
    </div>`),r+=Dl===`children`&&n?Ll(t):kl(),e.innerHTML=r}function Ol(e){Dl=e,U()}function kl(){cl();let e=!1;(s.routines||[]).forEach(t=>{t.ownerType===`adult`&&t.ownerId===`guest`&&(t.ownerId=window.uid,e=!0)}),e&&wl(`lazy-window.uid-claim`);let t=new Date().toISOString().slice(0,10),n=ll().filter(e=>al(e,t)),r=H(),i=``;return n.length?(n.forEach(e=>{let t=dl(e),n=e.linkedType===`join`,a=!t&&(e.sharedWith||[]).includes(window.uid),o=e.completions?.[r]||[],s=e.steps.length,c=s>0?Math.round(o.length/s*100):0,l=o.length===s&&s>0,u=bl(e),d=e.steps.reduce((e,t)=>e+(t.durationMin||0),0),f=t&&!n,p=``;n?p=`<span class="routine-owner-badge routine-joined-badge">🔗 Joined</span>`:e.linkedType===`duplicate`?p=`<span class="routine-owner-badge">📋 Duplicated</span>`:a&&(p=`<span class="routine-owner-badge routine-shared-badge">👥 Shared with you</span>`);let m=e.steps.map((t,n)=>{let r=o.includes(t.id);return`<div class="routine-step"${f?` draggable="true" data-routine="${e.id}" data-step="${t.id}" data-idx="${n}"
          ondragstart="_routineDragStart(event)" ondragover="_routineDragOver(event)"
          ondrop="_routineDrop(event,${e.id})" ondragend="_routineDragEnd(event)"`:``}>
        ${f?`<span class="routine-step-grab" title="Drag to reorder">⠿</span>`:`<span style="width:18px;flex-shrink:0"></span>`}
        <div class="routine-step-check${r?` done`:``}" onclick="_routineToggleStep(${e.id},${t.id})">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span class="routine-step-emoji">${t.emoji}</span>
        <span class="routine-step-label${r?` done`:``}">${g(t.label)}</span>
        ${t.durationMin?`<span class="routine-step-dur">${t.durationMin}m</span>`:``}
        ${t.notes?`<span class="routine-step-dur" style="font-style:italic">${g(t.notes)}</span>`:``}
      </div>`}).join(``),h=(e.skippedDates||[]).includes(new Date().toISOString().slice(0,10)),_=f?`
      <button class="btn btn-sm btn-ghost" onclick="_routineSkipDay(${e.id})" title="${h?`Un-skip today`:`Skip today`}" style="${h?`color:#d97706`:``}">⏭</button>
      <button class="btn btn-sm btn-ghost" onclick="_routinePauseMenu(${e.id})" title="Pause">⏸</button>
      <button class="btn btn-sm btn-ghost" onclick="_routineEdit(${e.id})" title="Edit">✏️</button>
      <button class="btn btn-sm btn-ghost" style="color:#ef4444" onclick="_routineDelete(${e.id})" title="Delete">🗑</button>`:``,v=`<button class="btn btn-sm btn-secondary" onclick="_routineResetToday(${e.id})">↺ Reset today</button>
      <button class="btn btn-sm btn-secondary" onclick="_routineShowHistory(${e.id},null)">📅 History</button>`;f?v+=`<button class="btn btn-sm btn-secondary" onclick="_routineShareMenu(${e.id})">👥 Share</button>`:n?v+=`<button class="btn btn-sm btn-secondary" onclick="_routineDuplicateFromJoined(${e.id})">📋 Duplicate to mine</button>
        <button class="btn btn-sm btn-ghost" style="color:#ef4444;margin-left:auto" onclick="_routineLeave(${e.id})">Leave</button>`:a&&(v+=`<button class="btn btn-sm btn-secondary" onclick="_routineDuplicateTo(${e.id})">📋 Duplicate to mine</button>
        <button class="btn btn-sm btn-secondary" onclick="_routineJoin(${e.id})">🔗 Join (stay in sync)</button>`),i+=`<div class="routine-card">
      <div class="routine-card-header">
        <div class="routine-card-title">${e.emoji} ${g(e.name)}</div>
        <div style="display:flex;align-items:center;gap:2px;flex-wrap:wrap">
          ${u>0?`<span class="routine-streak" style="margin-right:4px">🔥 ${u}d</span>`:``}
          ${p?`<span style="margin-right:4px">${p}</span>`:``}
          ${_}
        </div>
      </div>
      <div class="routine-card-meta">${d?`${d}min · `:``}${e.triggerTime}${h?` · <span style="color:#d97706;font-weight:700">Skipped today</span>`:``}</div>
      <div class="routine-progress-row">
        <div class="routine-progress-bar-wrap"><div class="routine-progress-bar-fill" style="width:${c}%"></div></div>
        <span class="routine-progress-label">${o.length}/${s}</span>
      </div>
      <div class="routine-steps">${m}</div>
      ${l?`<div class="routine-all-done">✓ Complete — great work!</div>`:``}
      ${f?`<button class="routine-add-step-btn" onclick="_routineAddStep(${e.id})">+ Add step</button>`:``}
      ${f?Pl(e):``}
      <div class="routine-card-btns" style="margin-top:12px">${v}</div>
    </div>`}),i+=`<div class="routine-new-card" onclick="_routineCreate()">
    <span style="font-size:22px">＋</span>
    <span class="routine-new-card-label">Create new routine</span>
  </div>`,i):`<div style="text-align:center;padding:32px 20px;color:var(--text-muted)">
      <div style="font-size:40px;margin-bottom:12px">📋</div>
      <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px">No routines yet</div>
      <div style="font-size:13px">Tap ＋ New routine to get started.</div>
    </div>
    <div class="routine-new-card" onclick="_routineCreate()">
      <span style="font-size:22px">＋</span>
      <span class="routine-new-card-label">Create new routine</span>
    </div>`}var Al={},jl={};function Ml(e){Al[e]=!Al[e],U()}function Nl(e){jl[e]=!0,U()}function Pl(e){let t=Sl(e);if(!t.length)return``;let n=!Al[e.id],r=!!jl[e.id],i=r?t:t.slice(0,3),a=t.length-3,o=e.ownerType===`household`,s=i.map(t=>`
    <div class="routine-suggestion-row">
      <span class="routine-suggestion-emoji">${t.emoji}</span>
      <span class="routine-suggestion-label">${g(t.label)}</span>
      ${t.durationMin?`<span class="routine-suggestion-dur">${t.durationMin}m</span>`:``}
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;margin-left:auto">
        ${o?`<button class="btn btn-sm btn-ghost" style="padding:2px 7px;font-size:12px"
          onclick="event.stopPropagation();_routineEditSuggestion(${e.id},'${g(t.label).replace(/'/g,`\\'`)}','${t.emoji}',${t.durationMin})"
          title="Add with points">✏️</button>`:``}
        <span class="routine-suggestion-add"
          onclick="_routineAddSuggestion(${e.id},'${g(t.label).replace(/'/g,`\\'`)}','${t.emoji}',${t.durationMin})">+</span>
      </div>
    </div>`).join(``),c=!r&&a>0?`<button class="btn btn-sm btn-ghost" style="margin-top:4px;width:100%;font-size:12px" onclick="_routineExpandSugg(${e.id})">Show ${a} more ▼</button>`:``;return`<div class="routine-suggestions">
    <div class="routine-suggestions-toggle${n?` open`:``}" onclick="_routineToggleSugg(${e.id})">
      <span>Suggested steps (${t.length})</span><span class="chevron">▼</span>
    </div>
    <div class="routine-suggestions-list" style="display:${n?`flex`:`none`};flex-direction:column">
      ${s}${c}
    </div>
  </div>`}function Fl(e,t,n,r){window.openModal(`Add step`,`
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Label</label>
        <input class="form-input" id="rse-label" value="${g(t)}" maxlength="40"></div>
      <div><label class="form-label">Emoji</label>
        <input class="form-input" id="rse-emoji" value="${n}" maxlength="4" style="width:64px"></div>
    </div>
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Duration (min)</label>
        <input class="form-input" id="rse-dur" type="number" min="0" max="120" value="${r||0}"></div>
      <div style="flex:1"><label class="form-label">Points</label>
        <input class="form-input" id="rse-pts" type="number" min="0" max="999" placeholder="0"></div>
    </div>
    <div class="form-group"><label class="form-label">Notes (optional)</label>
      <input class="form-input" id="rse-notes" placeholder="e.g. 20 min walk or gym" maxlength="80">
    </div>
  `,()=>{Il(e,document.getElementById(`rse-label`)?.value.trim()||t,document.getElementById(`rse-emoji`)?.value.trim()||n,parseInt(document.getElementById(`rse-dur`)?.value)||0,parseInt(document.getElementById(`rse-pts`)?.value)||0,document.getElementById(`rse-notes`)?.value.trim()||``)})}function Il(e,t,n,r,i,a){let o=(s.routines||[]).find(t=>String(t.id)===String(e));if(!o)return;let c=new Set([...o.steps.map(e=>e.id),...Object.values(o.completions||{}).flat(),...(s.routineAssignments||[]).filter(t=>t.routineId===e).flatMap(e=>Object.values(e.completionState||{}).flat())]),l=Math.max(0,...c)+1;for(;c.has(l);)l++;o.steps.push({id:l,label:t,emoji:n,durationMin:r||0,points:i||0,notes:a||``}),tu(o.id,o.steps[o.steps.length-1]),window.saveData(s),U()}function Ll(e){let t=s.routineAssignments||[],n=ul(),r=H();if(!n.length)return`<div style="text-align:center;padding:32px 20px;color:var(--text-muted)">
      <div style="font-size:40px;margin-bottom:12px">👧</div>
      <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px">No children's routines yet</div>
      <div style="font-size:13px">Tap ＋ New routine to create one, then assign it to your children.</div>
    </div>
    <div class="routine-new-card" onclick="_routineCreate('child')">
      <span style="font-size:22px">＋</span>
      <span class="routine-new-card-label">Create children's routine</span>
    </div>`;let i=``;return n.forEach(n=>{let a=t.filter(e=>e.routineId===n.id),o=a.map(t=>({kid:e.find(e=>e.id===t.childId),assignment:t})).filter(e=>e.kid),s=n.steps.length,c=e.map(e=>{let t=a.some(t=>t.childId===e.id);return`<span class="routine-member-chip${t?` active`:``}"
        onclick="_routineToggleAssignment(${n.id},'${e.id}')"
        title="${t?`Remove`:`Assign`} ${g(e.name)}">
        ${e.emoji||`👤`} ${g(e.name)}
      </span>`}).join(``),l=o.length?o.map(({kid:e,assignment:t})=>{let n=t.completionState?.[r]||[],i=s>0?Math.round(n.length/s*100):0,a=_l(t,s),o=n.length===s&&s>0;return`<div style="display:flex;align-items:center;gap:8px;padding:4px 0">
            <span style="font-size:14px;width:22px;text-align:center;flex-shrink:0">${e.emoji||`👤`}</span>
            <span style="font-size:12px;font-weight:600;color:var(--text);flex-shrink:0;min-width:52px">${g(e.name)}</span>
            <div class="routine-progress-bar-wrap" style="flex:1">
              <div class="routine-progress-bar-fill" style="width:${i}%"></div>
            </div>
            <span class="routine-progress-label">${n.length}/${s}</span>
            ${a>0?`<span class="routine-streak" style="font-size:11px;padding:2px 7px">🔥${a}</span>`:``}
            ${o?`<span style="font-size:12px;color:var(--section-accent,#0891b2);font-weight:700">✓</span>`:``}
          </div>`}).join(``):`<div style="font-size:12px;color:var(--text-muted);padding:4px 0">No children assigned yet — tap a name above to assign.</div>`,u=n.steps.map((e,t)=>`
      <div class="routine-step" draggable="true"
          data-routine="${n.id}" data-step="${e.id}" data-idx="${t}"
          ondragstart="_routineDragStart(event)" ondragover="_routineDragOver(event)"
          ondrop="_routineDrop(event,${n.id})" ondragend="_routineDragEnd(event)">
        <span class="routine-step-grab">⠿</span>
        <span class="routine-step-emoji">${e.emoji}</span>
        <span class="routine-step-label">${g(e.label)}</span>
        ${e.durationMin?`<span class="routine-step-dur">${e.durationMin}m</span>`:``}
        ${e.notes?`<span class="routine-step-dur" style="font-style:italic">${g(e.notes)}</span>`:``}
        <div style="display:flex;align-items:center;gap:4px;margin-left:auto;flex-shrink:0">
          ${e.points>0?`<span style="font-size:10px;font-weight:700;background:#fef9c3;color:#854d0e;padding:2px 6px;border-radius:99px">⭐${e.points}</span>`:``}
          <button onclick="event.stopPropagation();_routineEditStep(${n.id},${e.id})"
            style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:13px;padding:0 3px;line-height:1" title="Edit step">✏️</button>
          <button onclick="event.stopPropagation();_routineDeleteStep(${n.id},${e.id},false)"
            style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:14px;padding:0 3px;line-height:1" title="Remove step">✕</button>
        </div>
      </div>`).join(``),d=(n.skippedDates||[]).includes(new Date().toISOString().slice(0,10));i+=`<div class="routine-card">
      <div class="routine-card-header">
        <div class="routine-card-title">${n.emoji} ${g(n.name)}</div>
        <div style="display:flex;align-items:center;gap:2px">
          <span style="font-size:11px;color:var(--text-muted);margin-right:4px">${n.triggerTime}</span>
          <button class="btn btn-sm btn-ghost" onclick="_routineSkipDay(${n.id})" title="${d?`Un-skip today`:`Skip today`}" style="${d?`color:#d97706`:``}">⏭</button>
          <button class="btn btn-sm btn-ghost" onclick="_routinePauseMenu(${n.id})" title="Pause">⏸</button>
          <button class="btn btn-sm btn-ghost" onclick="_routineEdit(${n.id})" title="Edit">✏️</button>
          <button class="btn btn-sm btn-ghost" style="color:#ef4444" onclick="_routineDeleteChild(${n.id})" title="Delete">🗑</button>
        </div>
      </div>
      ${d?`<div style="font-size:11px;color:#d97706;font-weight:700;margin-bottom:8px">⏭ Skipped today</div>`:``}

      <!-- Assigned children -->
      <div style="margin-bottom:12px">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Assigned to</div>
        <div class="routine-member-chips">${c}</div>
      </div>

      <!-- Per-child progress (only if assigned) -->
      ${o.length?`<div style="margin-bottom:12px">${l}</div>`:`<div style="margin-bottom:8px">${l}</div>`}

      <!-- Steps -->
      <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Steps</div>
      <div class="routine-steps">${u||`<div style="font-size:13px;color:var(--text-muted);padding:8px 0">No steps yet — add from suggestions or create your own.</div>`}</div>
      <button class="routine-add-step-btn" onclick="_routineAddStep(${n.id})">+ Add step</button>
      ${Pl(n)}

      <!-- Actions -->
      <div class="routine-card-btns" style="margin-top:12px">
        <button class="btn btn-sm btn-secondary" onclick="_routineResetTodayAllKids(${n.id})">↺ Reset today</button>
        <button class="btn btn-sm btn-secondary" onclick="_routineShowHistory(${n.id},null)">📅 History</button>
        ${n.pointsPerCompletion>0?`<span style="font-size:12px;color:var(--text-muted);align-self:center">⭐ ${n.pointsPerCompletion} pts</span>`:``}
      </div>
    </div>`}),i+=`<div class="routine-new-card" onclick="_routineCreate('child')">
    <span style="font-size:22px">＋</span>
    <span class="routine-new-card-label">Create children's routine</span>
  </div>`,i}function Rl(e){let t=(s.routines||[]).find(t=>String(t.id)===String(e));t&&confirm(`Delete "${t.name}"? All assignments and history will be removed.`)&&(s.routines=s.routines.filter(t=>t.id!==e),s.routineAssignments=(s.routineAssignments||[]).filter(t=>t.routineId!==e),window.saveData(s),U())}function zl(e,t){let n=(s.routines||[]).find(t=>String(t.id)===String(e));if(!n||n.ownerType!==`adult`)return;let r=H();n.completions||(n.completions={}),n.completions[r]||(n.completions[r]=[]);let i=n.completions[r].indexOf(t);i===-1?n.completions[r].push(t):n.completions[r].splice(i,1),window.saveData(s),U()}function Bl(e,t,n){let r=hl(e,n);if(!r)return;r.completionState||(r.completionState={});let i=H();r.completionState[i]||(r.completionState[i]=[]);let a=r.completionState[i].indexOf(t),o=a===-1;o?r.completionState[i].push(t):r.completionState[i].splice(a,1);let c=(s.routines||[]).find(t=>String(t.id)===String(e));if(c&&o){let e=c.steps.find(e=>e.id===t);(e?.points||0)>0&&Vl(c,e,n);let a=c.steps.length;r.completionState[i].length===a&&a>0&&(c.pointsPerCompletion||0)>0&&Hl(c,n)}window.saveData(s),window._activeProfile?.role===`child`?window.showChildView(n):U()}function Vl(e,t,n){if(!s.kids)return;s.kids.completions||(s.kids.completions=[]),s.kids.chores||(s.kids.chores=[]);let r=`routine-${e.id}-step-${t.id}`,i=s.kids.chores.find(e=>e.id===r);i?i.points=t.points:s.kids.chores.push({id:r,name:`${e.name}: ${t.label}`,emoji:t.emoji,points:t.points,frequency:`daily`,assignedTo:n,_isRoutine:!0,_isStep:!0});let a=new Date().toDateString();s.kids.completions.some(e=>e.choreId===r&&e.kidId===n&&new Date(e.completedAt).toDateString()===a&&e.status===`approved`)||s.kids.completions.push({id:window.uid(),choreId:r,kidId:n,completedAt:Date.now(),status:`approved`,_fromRoutine:!0})}function Hl(e,t){if(!s.kids)return;s.kids.completions||(s.kids.completions=[]);let n=`routine-${e.id}`;s.kids.chores||(s.kids.chores=[]);let r=s.kids.chores.find(e=>e.id===n);r?r.points=e.pointsPerCompletion:s.kids.chores.push({id:n,name:e.name,emoji:e.emoji,points:e.pointsPerCompletion,frequency:`daily`,assignedTo:t,_isRoutine:!0});let i=new Date().toDateString();s.kids.completions.some(e=>e.choreId===n&&e.kidId===t&&new Date(e.completedAt).toDateString()===i&&e.status===`approved`)||s.kids.completions.push({id:window.uid(),choreId:n,kidId:t,completedAt:Date.now(),status:`approved`,_fromRoutine:!0})}function Ul(e){let t=(s.routines||[]).find(t=>String(t.id)===String(e));t&&(delete t.completions[H()],window.saveData(s),U())}function Wl(e){let t=(s.routines||[]).find(t=>String(t.id)===String(e));if(!t)return;let n=new Date().toISOString().slice(0,10);t.skippedDates||(t.skippedDates=[]),t.skippedDates.includes(n)?t.skippedDates=t.skippedDates.filter(e=>e!==n):t.skippedDates.push(n),window.saveData(s),U()}function Gl(e){let t=(s.routines||[]).find(t=>String(t.id)===String(e));if(!t)return;t.pausePeriods||(t.pausePeriods=[]);let n=new Date().toISOString().slice(0,10),r=t.pausePeriods.filter(e=>!e.to||e.to>=n),i=r.length?`<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Active pauses</div>${r.map((n,r)=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:13px;border-bottom:1px solid var(--border)">
          <span style="flex:1">${n.from}${n.to?` → `+n.to:` (indefinite)`}${n.reason?` · `+g(n.reason):``}</span>
          <button class="btn btn-ghost btn-sm" style="color:#ef4444;padding:2px 6px" onclick="_routineRemovePause(${e},${t.pausePeriods.indexOf(n)})">Remove</button>
        </div>`).join(``)}</div>`:``;window.openModal(`Pause routine`,`
    ${i}
    <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Add pause period</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div><label class="form-label">From</label>
        <input class="form-input" id="rp-from" type="date" value="${n}" style="width:150px"></div>
      <div><label class="form-label">Until <span style="font-size:11px;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="rp-to" type="date" style="width:150px"></div>
    </div>
    <div class="form-group"><label class="form-label">Reason (optional)</label>
      <input class="form-input" id="rp-reason" placeholder="e.g. School holidays" maxlength="60"></div>
  `,()=>{let e=document.getElementById(`rp-from`)?.value;if(!e)return;let n=document.getElementById(`rp-to`)?.value||void 0,r=document.getElementById(`rp-reason`)?.value.trim()||void 0;t.pausePeriods.push({from:e,to:n,reason:r}),window.saveData(s),window.closeModal(),U()})}function Kl(e,t){let n=(s.routines||[]).find(t=>String(t.id)===String(e));!n||!n.pausePeriods||(n.pausePeriods.splice(t,1),window.saveData(s),window.closeModal(),U())}function ql(e,t){let n=hl(e,t);n&&(n.completionState&&delete n.completionState[H()],window.saveData(s),U())}function Jl(e){let t=H();(s.routineAssignments||[]).filter(t=>t.routineId===e).forEach(e=>{e.completionState&&delete e.completionState[t]}),window.saveData(s),U()}var Yl=null;Object.defineProperty(window,`_routineDragIdx`,{get(){return Yl},set(e){Yl=e},configurable:!0});function Xl(e){Yl=parseInt(e.currentTarget.dataset.idx),e.currentTarget.classList.add(`dragging`),e.dataTransfer.effectAllowed=`move`}function Zl(e){e.preventDefault(),e.dataTransfer.dropEffect=`move`,document.querySelectorAll(`.routine-step.drag-over`).forEach(e=>e.classList.remove(`drag-over`)),e.currentTarget.classList.add(`drag-over`)}function Ql(e,t){e.preventDefault();let n=parseInt(e.currentTarget.dataset.idx);if(Yl===null||Yl===n)return;let r=(s.routines||[]).find(e=>String(e.id)===String(t));if(!r)return;let i=r.steps.splice(Yl,1)[0];r.steps.splice(n,0,i),Yl=null,window.saveData(s),U()}function $l(e){e.currentTarget.classList.remove(`dragging`),document.querySelectorAll(`.routine-step.drag-over`).forEach(e=>e.classList.remove(`drag-over`)),Yl=null}function eu(e){let t=(s.routines||[]).find(t=>String(t.id)===String(e));if(!t)return;let n=t.ownerType===`household`;window.openModal(`Add step`,`
    <div class="form-group"><label class="form-label">Label</label>
      <input class="form-input" id="rs-label" placeholder="e.g. Meditate" maxlength="40">
    </div>
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Emoji</label>
        <input class="form-input" id="rs-emoji" placeholder="🧘" maxlength="4"></div>
      <div style="flex:1"><label class="form-label">Duration (min)</label>
        <input class="form-input" id="rs-dur" type="number" min="0" max="120" placeholder="10"></div>
    </div>
    ${n?`<div class="form-group"><label class="form-label">Points for this step <span style="font-size:11px;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="rs-pts" type="number" min="0" max="999" placeholder="0" style="width:90px"></div>`:``}
    <div class="form-group"><label class="form-label">Notes (optional)</label>
      <input class="form-input" id="rs-notes" placeholder="e.g. 20 min walk or gym" maxlength="80">
    </div>`,()=>{let r=document.getElementById(`rs-label`)?.value.trim();if(!r)return;let i=new Set([...t.steps.map(e=>e.id),...Object.values(t.completions||{}).flat(),...(s.routineAssignments||[]).filter(t=>t.routineId===e).flatMap(e=>Object.values(e.completionState||{}).flat())]),a=Math.max(0,...i)+1;for(;i.has(a);)a++;let o={id:a,label:r,emoji:document.getElementById(`rs-emoji`)?.value.trim()||`✅`,durationMin:parseInt(document.getElementById(`rs-dur`)?.value)||0,points:n&&parseInt(document.getElementById(`rs-pts`)?.value)||0,notes:document.getElementById(`rs-notes`)?.value.trim()||``};t.steps.push(o),tu(t.id,o),window.saveData(s),window.closeModal(),U()}),setTimeout(()=>document.getElementById(`rs-label`)?.focus(),100)}function tu(e,t){(s.routines||[]).forEach(n=>{if(n.linkedType===`join`&&n.linkedFrom===e&&!n.steps.some(e=>e.label===t.label)){let e=Math.max(0,...n.steps.map(e=>e.id),0)+1;n.steps.push({...t,id:e})}})}function nu(e,t){(s.routines||[]).forEach(n=>{n.linkedType===`join`&&n.linkedFrom===e&&(n.steps=n.steps.filter(e=>e.label!==t))})}function ru(e){let t=(s.routines||[]).find(t=>String(t.id)===String(e));if(!t)return;let n=t.ownerType===`household`,r=t.steps.map(t=>`
    <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:16px">${t.emoji}</span>
      <span style="flex:1;font-size:13px;font-weight:500">${g(t.label)}</span>
      <span style="font-size:11px;color:var(--text-muted)">${t.durationMin||0}m</span>
      ${n?`<span style="font-size:11px;color:var(--text-muted)">⭐${t.points||0}</span>`:``}
      <button class="btn btn-sm btn-ghost" style="color:#ef4444" onclick="_routineDeleteStep(${e},${t.id},true)">✕</button>
    </div>`).join(``),i=t.ownerType===`household`?`
    <div class="form-group"><label class="form-label">Points on completion</label>
      <input class="form-input" id="re-pts" type="number" min="0" max="999" value="${t.pointsPerCompletion||0}" style="width:90px">
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Awarded to the child when all steps are done</div>
    </div>`:``;window.openModal(`Edit: ${t.emoji} ${t.name}`,`
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Name</label>
        <input class="form-input" id="re-name" value="${g(t.name)}" maxlength="30"></div>
      <div><label class="form-label">Emoji</label>
        <input class="form-input" id="re-emoji" value="${t.emoji}" maxlength="4" style="width:64px"></div>
    </div>
    <div class="form-group"><label class="form-label">Trigger time</label>
      <input class="form-input" id="re-time" type="time" value="${t.triggerTime}" style="width:130px">
    </div>
    ${i}
    ${cu(t.recurrence)}
    <div class="form-group"><label class="form-label">Steps</label><div>${r}</div></div>
  `,()=>{let e=document.getElementById(`re-name`)?.value.trim(),n=document.getElementById(`re-emoji`)?.value.trim(),r=document.getElementById(`re-time`)?.value;if(e&&(t.name=e),n&&(t.emoji=n),r&&(t.triggerTime=r),t.ownerType===`household`){let e=parseInt(document.getElementById(`re-pts`)?.value);isNaN(e)||(t.pointsPerCompletion=e)}t.recurrence=du(),t.lastEditedBy=cl(),t.lastEditedAt=new Date().toISOString(),window.saveData(s),window.closeModal(),U()}),setTimeout(()=>{uu()},100)}function iu(e,t,n){let r=(s.routines||[]).find(t=>String(t.id)===String(e));if(!r)return;let i=r.steps.find(e=>e.id===t);r.steps=r.steps.filter(e=>e.id!==t),Object.keys(r.completions||{}).forEach(e=>{r.completions[e]=r.completions[e].filter(e=>e!==t)}),(s.routineAssignments||[]).filter(t=>t.routineId===e).forEach(e=>{Object.keys(e.completionState||{}).forEach(n=>{e.completionState[n]=e.completionState[n].filter(e=>e!==t)})}),i&&nu(r.id,i.label),window.saveData(s),n?(window.closeModal(),ru(e)):(window.closeModal(),U())}function au(e,t){let n=(s.routines||[]).find(t=>String(t.id)===String(e));if(!n)return;let r=n.steps.find(e=>e.id===t);if(!r)return;let i=n.ownerType===`household`;window.openModal(`Edit step`,`
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Label</label>
        <input class="form-input" id="rst-label" value="${g(r.label)}" maxlength="40"></div>
      <div><label class="form-label">Emoji</label>
        <input class="form-input" id="rst-emoji" value="${r.emoji}" maxlength="4" style="width:64px"></div>
    </div>
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Duration (min)</label>
        <input class="form-input" id="rst-dur" type="number" min="0" max="120" value="${r.durationMin||0}"></div>
      ${i?`<div style="flex:1"><label class="form-label">Points</label>
        <input class="form-input" id="rst-pts" type="number" min="0" max="999" value="${r.points||0}"></div>`:``}
    </div>
    <div class="form-group"><label class="form-label">Notes (optional)</label>
      <input class="form-input" id="rst-notes" value="${g(r.notes||``)}" maxlength="80">
    </div>
  `,()=>{let e=document.getElementById(`rst-label`)?.value.trim();e&&(r.label=e,r.emoji=document.getElementById(`rst-emoji`)?.value.trim()||r.emoji,r.durationMin=parseInt(document.getElementById(`rst-dur`)?.value)||0,r.notes=document.getElementById(`rst-notes`)?.value.trim()||``,i&&(r.points=parseInt(document.getElementById(`rst-pts`)?.value)||0),window.saveData(s),window.closeModal(),U())})}function ou(e){let t=(s.routines||[]).find(t=>String(t.id)===String(e));if(!t)return;let n=fl();if(!n.length){window.openModal(`Assign`,`<p style="color:var(--text-muted);font-size:13px">No children in this household yet.</p>`,()=>window.closeModal());return}let r=s.routineAssignments||[],i=n.map(t=>{let n=r.some(n=>n.routineId===e&&n.childId===t.id);return`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:22px">${t.emoji||`👤`}</span>
      <span style="flex:1;font-size:14px;font-weight:600">${g(t.name)}</span>
      <button class="btn btn-sm ${n?`btn-danger-ghost`:`btn-primary`}"
        onclick="_routineToggleAssignment(${e},'${t.id}')">
        ${n?`Remove`:`Assign`}
      </button>
    </div>`}).join(``);window.openModal(`${t.emoji} ${t.name} — Assigned to`,`
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Each child tracks their own progress independently.</p>
    ${i}
  `,()=>window.closeModal())}function su(e,t){s.routineAssignments||(s.routineAssignments=[]);let n=hl(e,t);n?(n.archivedCompletionState=JSON.parse(JSON.stringify(n.completionState||{})),n.archivedAt=new Date().toISOString(),s.routineAssignments=s.routineAssignments.filter(n=>!(n.routineId===e&&n.childId===t))):s.routineAssignments.push({id:window.uid(),routineId:e,childId:t,assignedBy:cl(),assignedAt:new Date().toISOString(),completionState:{},archivedCompletionState:null,childIds:[t]}),window.saveData(s),U()}function cu(e){let t=e?.type||`daily`,n=e?.startDate||new Date().toISOString().slice(0,10),r=e?.endDate||``,i=e?.intervalDays||2,a=e?.days||[];return`
    <div class="form-group">
      <label class="form-label">Repeat</label>
      <select class="form-input" id="rn-rec-type" onchange="_routineRecurrenceTypeChange()" style="width:100%;max-width:240px">
        <option value="daily"         ${t===`daily`?`selected`:``}>Every day</option>
        <option value="weekdays"      ${t===`weekdays`?`selected`:``}>Weekdays only (Mon–Fri)</option>
        <option value="weekends"      ${t===`weekends`?`selected`:``}>Weekends only</option>
        <option value="specific_days" ${t===`specific_days`?`selected`:``}>Specific days…</option>
        <option value="interval"      ${t===`interval`?`selected`:``}>Every N days…</option>
        <option value="one_time"      ${t===`one_time`?`selected`:``}>One time only</option>
      </select>
    </div>
    <div id="rn-rec-days" style="display:${t===`specific_days`?`flex`:`none`};gap:6px;flex-wrap:wrap;margin-bottom:12px">
      ${[[`1`,`Mon`],[`2`,`Tue`],[`3`,`Wed`],[`4`,`Thu`],[`5`,`Fri`],[`6`,`Sat`],[`0`,`Sun`]].map(([e,t])=>`<label style="display:flex;align-items:center;cursor:pointer;padding:5px 10px;border-radius:99px;border:1.5px solid ${a.includes(e)?`var(--primary)`:`var(--border)`};background:${a.includes(e)?`var(--primary-light)`:`transparent`};font-size:12px;font-weight:600">
        <input type="checkbox" value="${e}" name="rn-rec-dow" ${a.includes(e)?`checked`:``} style="display:none" onchange="_routineRecurrenceSummaryUpdate()"> ${t}
      </label>`).join(``)}
    </div>
    <div id="rn-rec-interval" style="display:${t===`interval`?`flex`:`none`};align-items:center;gap:8px;margin-bottom:12px">
      <label class="form-label" style="margin:0;white-space:nowrap">Every</label>
      <input class="form-input" id="rn-rec-interval-days" type="number" min="2" max="365" value="${i}" style="width:70px" oninput="_routineRecurrenceSummaryUpdate()">
      <span style="font-size:13px;color:var(--text-muted)">days</span>
    </div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px">
      <div><label class="form-label">Start date</label>
        <input class="form-input" id="rn-rec-start" type="date" value="${n}" style="width:150px"></div>
      <div><label class="form-label">End date <span style="font-size:11px;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="rn-rec-end" type="date" value="${r}" style="width:150px"></div>
    </div>
    <div id="rn-rec-summary" style="font-size:12px;color:var(--primary);font-weight:600;padding:8px 12px;background:var(--primary-light);border-radius:8px;margin-bottom:4px"></div>`}function lu(){let e=document.getElementById(`rn-rec-type`)?.value;e&&(document.getElementById(`rn-rec-days`).style.display=e===`specific_days`?`flex`:`none`,document.getElementById(`rn-rec-interval`).style.display=e===`interval`?`flex`:`none`,uu())}function uu(){let e=document.getElementById(`rn-rec-summary`);if(!e)return;let t=document.getElementById(`rn-rec-type`)?.value,n={daily:`Every day`,weekdays:`Mon – Fri`,weekends:`Sat & Sun`,one_time:`Once only`};if(n[t]){e.textContent=n[t];return}if(t===`specific_days`){let t=[...document.querySelectorAll(`input[name="rn-rec-dow"]:checked`)].map(e=>[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`][e.value]);e.textContent=t.length?t.join(`, `):`No days selected`}else t===`interval`&&(e.textContent=`Every ${document.getElementById(`rn-rec-interval-days`)?.value||2} days`)}function du(){let e=document.getElementById(`rn-rec-type`)?.value||`daily`,t=document.getElementById(`rn-rec-start`)?.value||new Date().toISOString().slice(0,10),n=document.getElementById(`rn-rec-end`)?.value||void 0,r={type:e,startDate:t};return n&&(r.endDate=n),e===`specific_days`&&(r.days=[...document.querySelectorAll(`input[name="rn-rec-dow"]:checked`)].map(e=>e.value)),e===`interval`&&(r.intervalDays=parseInt(document.getElementById(`rn-rec-interval-days`)?.value)||2),r}function fu(e){let t=e===`child`;window.openModal(`New routine`,`
    <div class="form-group">
      <label class="form-label">Routine type</label>
      <div class="routine-for-picklist">
        <label class="routine-for-option${t?``:` selected`}" id="rn-type-adult" onclick="_routineTypeSelect('adult')">
          <input type="radio" name="rn-type" value="adult" ${t?``:`checked`} style="display:none">
          <span class="routine-for-avatar">🧑</span>
          <span class="routine-for-name">Adult</span>
        </label>
        <label class="routine-for-option${t?` selected`:``}" id="rn-type-child" onclick="_routineTypeSelect('child')">
          <input type="radio" name="rn-type" value="child" ${t?`checked`:``} style="display:none">
          <span class="routine-for-avatar">👧</span>
          <span class="routine-for-name">Child</span>
        </label>
      </div>
    </div>
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Name</label>
        <input class="form-input" id="rn-name" placeholder="e.g. Morning, Bedtime" maxlength="30"></div>
      <div><label class="form-label">Emoji</label>
        <input class="form-input" id="rn-emoji" placeholder="📋" maxlength="4" style="width:64px"></div>
    </div>
    <div class="form-group"><label class="form-label">Trigger time</label>
      <input class="form-input" id="rn-time" type="time" value="${t?`19:30`:`08:00`}" style="width:130px">
    </div>
    <div class="form-group" id="rn-pts-group" style="display:${t?`block`:`none`}">
      <label class="form-label">Points on completion <span style="font-size:11px;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="rn-pts" type="number" min="0" max="999" placeholder="0" style="width:90px">
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Awarded when the child completes all steps</div>
    </div>
    ${cu(null)}
  `,()=>{let e=document.getElementById(`rn-name`)?.value.trim();if(!e)return;let t=document.querySelector(`input[name="rn-type"]:checked`)?.value||`adult`,n=document.getElementById(`rn-emoji`)?.value.trim()||`📋`,r=document.getElementById(`rn-time`)?.value||(t===`child`?`19:30`:`08:00`),i=parseInt(document.getElementById(`rn-pts`)?.value)||0,a=cl(),o=pl(),c=du();if(t===`adult`){let t={id:o,name:e,emoji:n,triggerTime:r,steps:[],completions:{},assignedTo:[],ownerType:`adult`,ownerId:a,sharedWith:[],linkedFrom:null,linkedType:null,pointsPerCompletion:0,recurrence:c,skippedDates:[],pausePeriods:[]};Cl(t),s.routines.push(t),wl(`create:adult`),window.closeModal(),Dl=`mine`}else{let t={id:o,name:e,emoji:n,triggerTime:r,steps:[],completions:{},assignedTo:[],ownerType:`household`,ownerId:`household`,sharedWith:[],linkedFrom:null,linkedType:null,pointsPerCompletion:i,createdBy:a,lastEditedBy:a,lastEditedAt:new Date().toISOString(),recurrence:c,skippedDates:[],pausePeriods:[]};Cl(t),s.routines.push(t),wl(`create:child`),window.closeModal(),Dl=`children`}U()}),setTimeout(()=>{document.getElementById(`rn-name`)?.focus(),uu()},100)}function pu(e){document.querySelectorAll(`input[name="rn-type"]`).forEach(t=>t.checked=t.value===e),document.getElementById(`rn-type-adult`)?.classList.toggle(`selected`,e===`adult`),document.getElementById(`rn-type-child`)?.classList.toggle(`selected`,e===`child`);let t=document.getElementById(`rn-time`);t&&(t.value=e===`child`?`19:30`:`08:00`);let n=document.getElementById(`rn-pts-group`);n&&(n.style.display=e===`child`?`block`:`none`)}function mu(e){let t=(s.routines||[]).find(t=>String(t.id)===String(e));t&&confirm(`Delete "${t.name}"? This cannot be undone.`)&&(s.routines=s.routines.filter(t=>t.id!==e),s.routineAssignments=(s.routineAssignments||[]).filter(t=>t.routineId!==e),window.saveData(s),U())}function hu(e){let t=(s.routines||[]).find(t=>String(t.id)===String(e));t&&confirm(`Leave "${t.name}"? Your completion history will be removed.`)&&(s.routines=s.routines.filter(t=>t.id!==e),window.saveData(s),U())}function gu(e,t){if(!confirm(`Unassign this child? Their completion history will be archived.`))return;let n=hl(e,t);n&&(n.archivedCompletionState=JSON.parse(JSON.stringify(n.completionState||{})),n.archivedAt=new Date().toISOString()),s.routineAssignments=(s.routineAssignments||[]).filter(n=>!(n.routineId===e&&n.childId===t)),(s.routineAssignments||[]).some(t=>t.routineId===e)||(s.routines=s.routines.filter(t=>t.id!==e)),window.saveData(s),U()}function _u(e){let t=(s.routines||[]).find(t=>String(t.id)===String(e));if(!t)return;let n=ml();if(!n.length){window.openModal(`Share routine`,`<p style="color:var(--text-muted);font-size:13px">No other adults have joined yet. Invite them via Settings → Household first.</p>`,()=>window.closeModal());return}let r=t.sharedWith||[],i=n.map(t=>{let n=r.includes(t.uid);return`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
      <span style="flex:1;font-size:14px;font-weight:500">${g(t.name||t.email||t.uid)}</span>
      <button class="btn btn-sm ${n?`btn-danger-ghost`:`btn-primary`}"
        onclick="_routineToggleShare(${e},'${t.uid}')">
        ${n?`Remove`:`Share`}
      </button>
    </div>`}).join(``);window.openModal(`Share: ${t.emoji} ${t.name}`,`
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Shared routines are view-only. The recipient can duplicate or join.</p>
    ${i}
  `,()=>window.closeModal())}function vu(e,t){let n=(s.routines||[]).find(t=>String(t.id)===String(e));if(!n)return;n.sharedWith||(n.sharedWith=[]);let r=n.sharedWith.indexOf(t);r===-1?n.sharedWith.push(t):n.sharedWith.splice(r,1),window.saveData(s),window.closeModal(),_u(e)}function yu(e){let t=(s.routines||[]).find(t=>t.id===e);if(!t)return;cl();let n={...JSON.parse(JSON.stringify(t)),id:pl(),ownerId:window.uid,ownerType:`adult`,sharedWith:[],completions:{},linkedFrom:e,linkedType:`duplicate`};s.routines.push(n),window.saveData(s),window.closeModal(),U()}function bu(e){let t=(s.routines||[]).find(t=>t.id===e);if(!t)return;if(cl(),(s.routines||[]).some(t=>t.linkedFrom===e&&t.linkedType===`join`&&t.ownerId===window.uid)){alert(`You have already joined this routine.`);return}let n={...JSON.parse(JSON.stringify(t)),id:pl(),ownerId:window.uid,ownerType:`adult`,sharedWith:[],completions:{},linkedFrom:e,linkedType:`join`};s.routines.push(n),window.saveData(s),window.closeModal(),U()}function xu(e){let t=(s.routines||[]).find(t=>t.id===e);t?.linkedFrom&&yu(t.linkedFrom)}function Su(e,t){let n=(s.routines||[]).find(t=>String(t.id)===String(e));if(!n)return;let r=n.steps.length,i,a,o;if(t){let s=hl(e,t),c=fl().find(e=>e.id===t);i=vl(s,r,90),a=_l(s,r),o=`${n.emoji} ${n.name} — ${c?.name||`Child`}`}else i=xl(n,90),a=bl(n),o=`${n.emoji} ${n.name} — History`;let c=i.filter(e=>e.done===e.total&&e.total>0).length,l=i.filter(e=>e.done>0&&e.done<e.total).length,u=i.map(e=>{let t=e.done===e.total&&e.total>0?`full`:e.done>0?`partial`:`empty`,n=e.done===e.total&&e.total>0?`✓`:e.done>0?`${e.done}`:``;return`<div class="routine-history-dot ${t}" title="${e.key}: ${e.done}/${e.total}">${n}</div>`}).join(``);window.openModal(o,`
    <div style="display:flex;gap:20px;margin-bottom:16px">
      <div style="text-align:center"><div style="font-size:28px;font-weight:900">🔥 ${a}</div><div style="font-size:11px;color:var(--text-muted);font-weight:600">Current streak</div></div>
      <div style="text-align:center"><div style="font-size:28px;font-weight:900;color:#10b981">${c}</div><div style="font-size:11px;color:var(--text-muted);font-weight:600">Full days (90d)</div></div>
      <div style="text-align:center"><div style="font-size:28px;font-weight:900;color:#f59e0b">${l}</div><div style="font-size:11px;color:var(--text-muted);font-weight:600">Partial days</div></div>
    </div>
    <div class="routine-history-label">Last 90 days</div>
    <div class="routine-history-grid">${u}</div>
    <div style="display:flex;gap:12px;margin-top:10px;font-size:11px;color:var(--text-muted)">
      <span><span style="display:inline-block;width:12px;height:12px;background:var(--section-accent,#0891b2);border-radius:3px;margin-right:4px;vertical-align:middle"></span>Complete</span>
      <span><span style="display:inline-block;width:12px;height:12px;background:var(--primary-light,#eff6ff);border:1.5px solid var(--section-accent,#0891b2);border-radius:3px;margin-right:4px;vertical-align:middle"></span>Partial</span>
      <span><span style="display:inline-block;width:12px;height:12px;background:var(--surface2);border-radius:3px;margin-right:4px;vertical-align:middle"></span>Missed</span>
    </div>
  `,()=>window.closeModal())}var Cu=`parent`,wu=`overview`;Object.defineProperty(window,`kidsView`,{get(){return Cu},set(e){Cu=e},configurable:!0}),Object.defineProperty(window,`kidsParentTab`,{get(){return wu},set(e){wu=e},configurable:!0});function Tu(){return Date.now().toString(36)+Math.random().toString(36).slice(2)}function W(){let e=document.getElementById(`kids-content`);if(!e)return;let t=s.kids;if(Cu===`parent`)Du(e,t,t.completions.filter(e=>e.status===`pending`).length+t.redemptions.filter(e=>e.status===`pending`).length);else{let n=t.profiles.find(e=>e.id===Cu);n?Mu(e,t,n):(Cu=`parent`,W())}}function Eu(e,t){return e.completions.filter(e=>e.kidId===t&&e.status===`approved`).reduce((t,n)=>t+(e.chores.find(e=>e.id===n.choreId)?.points||0),0)-e.redemptions.filter(e=>e.kidId===t&&e.status===`approved`).reduce((t,n)=>t+(e.prizes.find(e=>e.id===n.prizeId)?.pointCost||0),0)}function Du(e,t,n){let r=`
    <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
      <button class="btn btn-primary" style="padding:8px 14px;font-size:13px" onclick="openAddKidModal()">+ Add Kid</button>
    </div>
    <div style="display:flex;gap:4px;margin-bottom:24px;border-bottom:1px solid var(--border)">
      ${[{id:`overview`,label:`Overview`},{id:`chores`,label:`Chores`},{id:`prizes`,label:`Prize Shelf`},{id:`approvals`,label:`Approvals${n?` <span style="background:#ef4444;color:#fff;border-radius:99px;padding:1px 7px;font-size:11px;vertical-align:middle;margin-left:4px">${n}</span>`:``}`},{id:`events`,label:`📅 Events`}].map(e=>`<button onclick="kidsParentTab='${e.id}';renderKids()" style="padding:8px 16px;border:none;background:none;cursor:pointer;font-size:13px;font-weight:500;color:${wu===e.id?`#0891b2`:`#64748b`};border-bottom:2px solid ${wu===e.id?`#0891b2`:`transparent`};margin-bottom:-1px;transition:all 0.15s">${e.label}</button>`).join(``)}
    </div>`;wu===`overview`?r+=Ou(t):wu===`chores`?r+=ku(t):wu===`prizes`?r+=Au(t):wu===`approvals`?r+=ju(t):wu===`events`&&(r+=Nu()),e.innerHTML=r}function Ou(e){if(!e.profiles.length)return`
    <div style="text-align:center;padding:60px 20px">
      <div style="font-size:52px;margin-bottom:12px">👨‍👩‍👧‍👦</div>
      <p style="font-size:16px;font-weight:600;color:#1e293b;margin-bottom:8px">No kids added yet</p>
      <p style="color:#64748b;margin-bottom:20px">Add your kids to start assigning chores and prizes</p>
      <button class="btn btn-primary" onclick="openAddKidModal()">+ Add Kid</button>
    </div>`;let t=`<div class="kids-grid">`;return e.profiles.forEach(n=>{let r=Eu(e,n.id),i=e.chores.filter(e=>e.assignedTo===n.id||e.assignedTo===`all`).length,a=e.completions.filter(e=>e.kidId===n.id&&e.status===`pending`).length;t+=`
      <div class="kid-card" style="cursor:default">
        <button onclick="openEditKidModal('${n.id}')" style="position:absolute;top:10px;right:10px;background:none;border:none;cursor:pointer;color:#cbd5e1;font-size:14px;padding:2px 5px;border-radius:4px" title="Edit">✏️</button>
        <div onclick="kidsView='${n.id}';renderKids()" style="cursor:pointer">
          <div class="kid-avatar">${n.emoji}</div>
          <div class="kid-name">${g(n.name)}</div>
          <div class="kid-points">${r}</div>
          <div class="kid-points-label">⭐ points</div>
          <div style="display:flex;gap:10px;font-size:12px;color:#64748b;margin-top:4px">
            <span>📋 ${i}</span>
            ${a?`<span style="color:#f59e0b;font-weight:600">⏳ ${a}</span>`:``}
            ${n.savings?`<span style="color:#0891b2">💰 $${n.savings.toFixed(0)}</span>`:``}
          </div>
        </div>
        <button onclick="window.switchToKidMode('${n.id}')" style="width:100%;margin-top:10px;padding:8px;background:#ecfeff;border:1.5px solid #0891b2;border-radius:8px;font-size:12px;color:#0891b2;font-weight:600;cursor:pointer">
          Switch to ${g(n.name)}'s view →
        </button>
        <button onclick="viewChildToday('${n.id}')" style="width:100%;margin-top:6px;padding:7px;background:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;font-size:12px;color:#5B4CF5;font-weight:600;cursor:pointer">
          👁 View ${g(n.name)}'s Today
        </button>
        <button onclick="_cvViewCalendar('${n.id}')" style="width:100%;margin-top:6px;padding:7px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;font-size:12px;color:#15803d;font-weight:600;cursor:pointer">
          📅 View ${g(n.name)}'s Calendar
        </button>
        <button onclick="window.openPinSetup('${n.id}')" style="width:100%;margin-top:6px;padding:7px;background:${n.pinHash?`#f0fdf4`:`#fffbeb`};border:1px solid ${n.pinHash?`#bbf7d0`:`#fde68a`};border-radius:8px;font-size:12px;color:${n.pinHash?`#15803d`:`#854d0e`};font-weight:600;cursor:pointer">
          ${n.pinHash?`🔒 PIN set — change`:`🔓 Set PIN for login`}
        </button>
      </div>`}),t+=`</div>`,t}function ku(e){let t=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <span style="font-size:15px;font-weight:600">All Chores</span>
    <button class="btn btn-primary btn-sm" onclick="openChoreModal()">+ Add Chore</button>
  </div>`;if(!e.chores.length){let n=e.profiles[0],r=n?.name||`your child`,i=n?.emoji||`👦`,a=[{emoji:`🛏️`,label:`Make bed`},{emoji:`🍽️`,label:`Clear table`},{emoji:`🐕`,label:`Feed pet`}].map(e=>`<button onclick="openChoreModal()" style="padding:7px 14px;background:#fef9c3;border:1.5px solid #eab308;border-radius:99px;font-size:12px;font-weight:600;color:#854d0e;cursor:pointer">${e.emoji} ${e.label}</button>`).join(``);return t+`
      <div style="background:#fff;border:2px dashed #cbd5e1;border-radius:16px;padding:36px 24px;text-align:center;margin-top:8px">
        <div style="font-size:44px;margin-bottom:10px">${i}</div>
        <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:6px">${g(r)} has no chores yet</div>
        <div style="font-size:13px;color:#64748b;margin-bottom:18px">Add chores to help ${g(r)} earn coins and unlock prizes.</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px">
          ${a}
          <button onclick="openChoreModal()" style="padding:7px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:99px;font-size:12px;color:#64748b;cursor:pointer">+ Custom</button>
        </div>
        <button onclick="openChoreModal()" style="background:#eab308;color:#fff;border:none;border-radius:10px;padding:12px 28px;font-size:14px;font-weight:600;cursor:pointer">Add first chore →</button>
      </div>`}return e.chores.forEach(n=>{let r=n.assignedTo===`all`?`All kids`:e.profiles.find(e=>e.id===n.assignedTo)?.name||`?`;t+=`<div class="chore-item">
      <div class="chore-emoji">${n.emoji}</div>
      <div style="flex:1"><div class="chore-name">${g(n.name)}</div><div class="chore-meta">${g(r)} · ${n.frequency}</div></div>
      <div class="chore-pts">⭐ ${n.points}</div>
      <button onclick="openChoreModal('${n.id}')" class="btn btn-ghost btn-sm">✏️</button>
      <button onclick="deleteChore('${n.id}')" class="btn btn-ghost btn-sm" style="color:#ef4444">🗑</button>
    </div>`}),t}function Au(e){let t=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <span style="font-size:15px;font-weight:600">Prize Shelf</span>
    <button class="btn btn-primary btn-sm" onclick="openPrizeModal()">+ Add Prize</button>
  </div>`;return e.prizes.length?(e.prizes.forEach(e=>{t+=`<div class="prize-card">
      <div class="prize-icon">${e.emoji}</div>
      <div style="flex:1"><div class="prize-name">${g(e.name)}</div><div class="prize-desc">${g(e.description||e.type)}</div></div>
      <div class="prize-cost">⭐ ${e.pointCost}</div>
      <button onclick="openPrizeModal('${e.id}')" class="btn btn-ghost btn-sm">✏️</button>
      <button onclick="deletePrize('${e.id}')" class="btn btn-ghost btn-sm" style="color:#ef4444">🗑</button>
    </div>`}),t):t+`<div class="empty"><div class="empty-icon">🎁</div><p>No prizes yet — add something for the kids to work towards</p></div>`}function ju(e){let t=e.completions.filter(e=>e.status===`pending`),n=e.redemptions.filter(e=>e.status===`pending`);if(!t.length&&!n.length)return`<div style="text-align:center;padding:48px 20px"><div style="font-size:40px;margin-bottom:12px">✅</div><p style="font-weight:600;color:#1e293b">All caught up!</p><p style="color:#64748b;font-size:13px">No pending approvals</p></div>`;let r=``;return t.length&&(r+=`<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;margin-bottom:10px">Completed Chores</div>`,t.forEach(t=>{let n=e.profiles.find(e=>e.id===t.kidId),i=e.chores.find(e=>e.id===t.choreId);!n||!i||(r+=`<div class="chore-item pending-approval" style="margin-bottom:10px">
        <div class="chore-emoji">${i.emoji}</div>
        <div style="flex:1"><div class="chore-name">${g(i.name)}</div><div class="chore-meta">${n.emoji} ${g(n.name)} · ${new Date(t.completedAt).toLocaleDateString()}</div></div>
        <div class="chore-pts">⭐ ${i.points}</div>
        <button class="approve-btn" onclick="approveCompletion('${t.id}')">Approve</button>
        <button class="reject-btn" onclick="rejectCompletion('${t.id}')">Reject</button>
      </div>`)})),n.length&&(r+=`<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;margin:20px 0 10px">Prize Redemptions</div>`,n.forEach(t=>{let n=e.profiles.find(e=>e.id===t.kidId),i=e.prizes.find(e=>e.id===t.prizeId);!n||!i||(r+=`<div class="prize-card pending-redemption" style="margin-bottom:10px">
        <div class="prize-icon">${i.emoji}</div>
        <div style="flex:1"><div class="prize-name">${g(i.name)}</div><div class="prize-desc">${n.emoji} ${g(n.name)} wants this</div></div>
        <div class="prize-cost">⭐ ${i.pointCost}</div>
        <button class="approve-btn" onclick="approveRedemption('${t.id}')">Approve</button>
        <button class="reject-btn" onclick="rejectRedemption('${t.id}')">Reject</button>
      </div>`)})),r}function Mu(e,t,n){let r=Eu(t,n.id),i=t.chores.filter(e=>e.assignedTo===n.id||e.assignedTo===`all`),a=new Set(t.completions.filter(e=>e.kidId===n.id&&e.status===`pending`).map(e=>e.choreId)),o=new Date().toDateString(),s=new Set(t.completions.filter(e=>e.kidId===n.id&&e.status===`approved`&&new Date(e.completedAt).toDateString()===o).map(e=>e.choreId)),c=`
    <button onclick="kidsView='parent';kidsParentTab='overview';renderKids()" class="btn btn-ghost btn-sm" style="margin-bottom:16px">← Parent view</button>

    <div style="background:linear-gradient(135deg,#0891b2,#0e7490);border-radius:16px;padding:24px 28px;color:#fff;margin-bottom:24px;display:flex;align-items:center;gap:20px">
      <div style="font-size:48px;background:rgba(255,255,255,0.15);border-radius:50%;width:72px;height:72px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${n.emoji}</div>
      <div style="flex:1">
        <div style="font-size:13px;opacity:0.75">Hey there,</div>
        <div style="font-size:24px;font-weight:800">${g(n.name)}!</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:44px;font-weight:800;line-height:1">${r}</div>
        <div style="font-size:13px;opacity:0.75">⭐ points</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div>
        <div style="font-size:15px;font-weight:700;margin-bottom:12px">My Chores 📋</div>`;i.length?i.forEach(e=>{let t=a.has(e.id),r=s.has(e.id);c+=`<div class="chore-item ${t?`pending-approval`:r?`done-today`:``}">
        <div class="chore-emoji">${e.emoji}</div>
        <div style="flex:1"><div class="chore-name">${g(e.name)}</div><div class="chore-meta">${t?`⏳ Waiting...`:r?`✅ Done!`:e.frequency}</div></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <div class="chore-pts">⭐ ${e.points}</div>
          ${!t&&!r?`<button class="approve-btn" style="font-size:11px;padding:3px 9px" onclick="markChoreDone('${e.id}','${n.id}')">Done! 🙋</button>`:``}
        </div>
      </div>`}):c+=`<div style="color:#64748b;font-size:13px;padding:20px;text-align:center;background:#f8fafc;border-radius:10px">No chores assigned yet!</div>`,c+=`</div><div>
    <div style="background:linear-gradient(135deg,#ecfeff,#ccfbf1);border:1px solid #99f6e4;border-radius:12px;padding:16px 18px;margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#0891b2">💰 Savings Jar</div>
      <div style="font-size:28px;font-weight:800;color:#0e7490;margin:4px 0">$${(n.savings||0).toFixed(2)}</div>
      <button onclick="openSavingsModal('${n.id}')" style="background:none;border:1px solid #0891b2;color:#0891b2;border-radius:6px;padding:4px 12px;font-size:12px;cursor:pointer;font-weight:600">+ Add</button>
    </div>
    <div style="font-size:15px;font-weight:700;margin-bottom:12px">Prize Shelf 🎁</div>`,t.prizes.length?t.prizes.forEach(e=>{let i=r>=e.pointCost,a=t.redemptions.some(t=>t.prizeId===e.id&&t.kidId===n.id&&t.status===`pending`);c+=`<div class="prize-card ${i&&!a?`can-afford`:``} ${a?`pending-redemption`:``}">
        <div class="prize-icon">${e.emoji}</div>
        <div style="flex:1"><div class="prize-name">${g(e.name)}</div><div class="prize-desc">${a?`⏳ Pending...`:i?`✅ You can get this!`:`${e.pointCost-r} pts to go`}</div></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <div class="prize-cost">⭐ ${e.pointCost}</div>
          ${i&&!a?`<button onclick="requestRedemption('${e.id}','${n.id}')" style="background:#0891b2;color:#fff;border:none;border-radius:6px;padding:3px 9px;font-size:11px;cursor:pointer;font-weight:600">Redeem!</button>`:``}
        </div>
      </div>`}):c+=`<div style="color:#64748b;font-size:13px;padding:20px;text-align:center;background:#f8fafc;border-radius:10px">No prizes on the shelf yet!</div>`,c+=`</div></div>`,e.innerHTML=c}function Nu(){let e=s.childEvents||[],t=s.kids?.profiles||[],n=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <span style="font-size:15px;font-weight:600">Child Events</span>
    <button class="btn btn-primary btn-sm" onclick="_openChildEventModal()">+ Add Event</button>
  </div>`;return e.length?([...e].sort((e,t)=>(e.date||``).localeCompare(t.date||``)).forEach(e=>{let r=Array.isArray(e.assignedTo)?e.assignedTo:[e.assignedTo],i=e.isHouseholdWide||r.includes(`all`)?`All kids`:r.map(e=>t.find(t=>t.id===e)?.name||`?`).join(`, `),a=e.recurrence?` · 🔁 ${{daily:`Daily`,weekdays:`Weekdays`,weekends:`Weekends`,specific_days:`Selected days`,interval:`Every ${e.recurrence.intervalDays}d`,one_time:`Once`}[e.recurrence.type]||``}`:``;n+=`<div style="display:flex;align-items:center;gap:12px;padding:12px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:8px">
      <span style="font-size:22px">${e.emoji||`📅`}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:#18181B">${g(e.title)}</div>
        <div style="font-size:11px;color:#64748b">${e.date||``}${e.time?` · `+e.time:``}${a} · ${i}</div>
      </div>
      <button onclick="_openChildEventModal('${e.id}')" class="btn btn-ghost btn-sm">✏️</button>
      <button onclick="_deleteChildEvent('${e.id}')" class="btn btn-ghost btn-sm" style="color:#ef4444">🗑</button>
    </div>`}),n):n+`<div style="text-align:center;padding:40px 20px;color:#64748b">
      <div style="font-size:36px;margin-bottom:10px">📅</div>
      <div style="font-size:14px;font-weight:600;margin-bottom:6px">No events yet</div>
      <div style="font-size:13px">Add activities, appointments and school days for your kids</div>
    </div>`}var Pu=[`📅`,`⚽`,`🏊`,`🎓`,`🎂`,`🎨`,`🏃`,`🎭`,`🚌`,`🎡`,`🏖`,`🎪`];function Fu(e){let t=e?(s.childEvents||[]).find(t=>t.id===e):null,n=s.kids?.profiles||[];window.openModal(t?`Edit Event`:`Add Event`,`
    ${e?`<input type="hidden" id="ce-id" value="${e}">`:``}
    <div class="form-group" style="display:flex;gap:12px">
      <div style="flex:1"><label class="form-label">Title</label>
        <input class="form-input" id="ce-title" value="${_(t?.title||``)}" placeholder="e.g. Swimming lesson" autofocus maxlength="50"></div>
      <div><label class="form-label">Emoji</label>
        <input class="form-input" id="ce-emoji" value="${t?.emoji||`📅`}" maxlength="4" style="width:64px"></div>
    </div>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div class="form-group"><label class="form-label">Date</label>
        <input class="form-input" id="ce-date" type="date" value="${t?.date||new Date().toISOString().slice(0,10)}" style="width:150px"></div>
      <div class="form-group"><label class="form-label">Time (optional)</label>
        <input class="form-input" id="ce-time" type="time" value="${t?.time||``}" style="width:130px"></div>
    </div>
    <div class="form-group"><label class="form-label">Assign to</label>
      <select class="form-input" id="ce-who" style="max-width:240px">
        <option value="all" ${!t||t.isHouseholdWide||t.assignedTo===`all`||t.assignedTo?.includes?.(`all`)?`selected`:``}>All kids</option>
        ${n.map(e=>`<option value="${e.id}" ${Array.isArray(t?.assignedTo)&&t.assignedTo.includes(e.id)?`selected`:``}>${e.emoji||``} ${g(e.name)}</option>`).join(``)}
      </select>
    </div>
    ${_routineRecurrenceFormHtml(t?.recurrence||null)}
    <div class="form-group"><label class="form-label">Notes (optional)</label>
      <input class="form-input" id="ce-notes" value="${_(t?.notes||``)}" placeholder="e.g. Bring water bottle" maxlength="200"></div>
  `,()=>{let e=document.getElementById(`ce-title`)?.value.trim();if(!e)return;let t=document.getElementById(`ce-emoji`)?.value.trim()||`📅`,n=document.getElementById(`ce-date`)?.value,r=document.getElementById(`ce-time`)?.value||void 0,i=document.getElementById(`ce-who`)?.value,a=document.getElementById(`ce-notes`)?.value.trim()||``,o=_routineRecurrenceCollect(),c=document.getElementById(`ce-id`)?.value;if(s.childEvents||(s.childEvents=[]),c){let l=s.childEvents.find(e=>e.id===c);l&&Object.assign(l,{title:e,emoji:t,date:n,time:r,notes:a,recurrence:o,isHouseholdWide:i===`all`,assignedTo:i===`all`?`all`:[i]})}else s.childEvents.push({id:Tu(),title:e,emoji:t,date:n,time:r,notes:a,recurrence:o,assignedTo:i===`all`?`all`:[i],isHouseholdWide:i===`all`,createdBy:_routineCurrentUserId()});window.saveData(s),window.closeModal(),W()}),setTimeout(()=>{_routineRecurrenceSummaryUpdate()},100)}function Iu(e){confirm(`Delete this event?`)&&(s.childEvents=(s.childEvents||[]).filter(t=>t.id!==e),window.saveData(s),W())}function Lu(e,t){s.kids.completions.push({id:Tu(),choreId:e,kidId:t,completedAt:Date.now(),status:`pending`}),window.saveData(s),W()}function Ru(e){let t=s.kids.completions.find(t=>t.id===e);t&&(t.status=`approved`,t.approvedAt=Date.now()),window.saveData(s),W()}function zu(e){let t=s.kids.completions.find(t=>t.id===e);t&&(t.status=`rejected`),window.saveData(s),W()}function Bu(e,t){s.kids.redemptions.push({id:Tu(),prizeId:e,kidId:t,requestedAt:Date.now(),status:`pending`}),window.saveData(s),W()}function Vu(e){let t=s.kids.redemptions.find(t=>t.id===e);if(t){t.status=`approved`,t.approvedAt=Date.now();let e=(s.kids.prizes||[]).find(e=>e.id===t.prizeId);s.kids.notifications||(s.kids.notifications=[]),s.kids.notifications.push({id:Tu(),kidId:t.kidId,type:`prize_approved`,prizeId:t.prizeId,prizeName:e?.name||`Prize`,prizeEmoji:e?.emoji||`🎁`,ts:Date.now(),read:!1})}window.saveData(s),W()}function Hu(e){let t=s.kids.redemptions.find(t=>t.id===e);if(t){t.status=`rejected`;let e=(s.kids.prizes||[]).find(e=>e.id===t.prizeId);s.kids.notifications||(s.kids.notifications=[]),s.kids.notifications.push({id:Tu(),kidId:t.kidId,type:`prize_declined`,prizeId:t.prizeId,prizeName:e?.name||`Prize`,prizeEmoji:e?.emoji||`🎁`,ts:Date.now(),read:!1})}window.saveData(s),W()}function Uu(e){s.kids.chores=s.kids.chores.filter(t=>t.id!==e),window.saveData(s),W()}function Wu(e){s.kids.prizes=s.kids.prizes.filter(t=>t.id!==e),window.saveData(s),W()}var Gu=[`😊`,`🦁`,`🐯`,`🐻`,`🦊`,`🐸`,`🐧`,`🦋`,`🌟`,`🎈`,`🚀`,`⚡`],Ku=[`🧹`,`🍽`,`🐕`,`🛏`,`📚`,`🌿`,`🧺`,`🗑`,`🧽`,`🚿`,`🛒`,`🪴`],qu=[`🍦`,`🎬`,`🎮`,`🍕`,`🎁`,`💰`,`🏖`,`🎡`,`🎨`,`👟`,`📱`,`🎭`];function Ju(e,t){return`<div style="display:flex;flex-wrap:wrap;gap:6px" id="emoji-pick">
    ${e.map(e=>`<button type="button" onclick="pickEmoji(this)" data-e="${e}" style="font-size:22px;padding:5px 8px;border-radius:7px;border:2px solid ${e===t?`#0891b2`:`var(--border)`};background:${e===t?`#ecfeff`:`none`};cursor:pointer;transition:all 0.1s">${e}</button>`).join(``)}
  </div>`}function Yu(e){e.closest(`#emoji-pick`).querySelectorAll(`button`).forEach(e=>{e.style.borderColor=`var(--border)`,e.style.background=`none`}),e.style.borderColor=`#0891b2`,e.style.background=`#ecfeff`}function Xu(e){let t=document.querySelector(`#emoji-pick button[style*="#0891b2"]`);return t?t.dataset.e:e}function Zu(){Qu(null)}function Qu(e){let t=e?s.kids.profiles.find(t=>String(t.id)===String(e)):null;document.getElementById(`modal-title`).textContent=t?`Edit Kid`:`Add Kid`,document.getElementById(`modal-body`).innerHTML=`
    ${e?`<input type="hidden" id="k-id" value="${e}">`:``}
    <div class="form-group"><label class="form-label">Name</label><input class="form-input" id="k-name" value="${_(t?.name||``)}" placeholder="e.g. Emma" autofocus></div>
    <div class="form-group"><label class="form-label">Avatar</label>${Ju(Gu,t?.emoji||`😊`)}</div>
    <div class="form-group">
      <label class="form-label">Age</label>
      <input class="form-input" id="k-age" type="number" min="1" max="18" value="${_(String(t?.age||``))}" placeholder="e.g. 8">
      <div style="font-size:11px;color:var(--text-muted);margin-top:5px;line-height:1.5">
        Age determines how ${g(t?.name||`your child`)} sees their Today screen —
        larger tap targets and emoji-only for younger kids, a cleaner layout for tweens.
        You can update this any time.
      </div>
    </div>
    ${e?`<div style="margin-top:8px"><button class="btn btn-danger btn-sm" onclick="deleteKid('${e}')">Delete ${g(t.name)}</button></div>`:``}
  `,document.getElementById(`modal-footer`).innerHTML=`<button class="btn btn-ghost" onclick="window.closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveKid()">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function $u(){let e=document.getElementById(`k-name`).value.trim();if(!e)return;let t=parseInt(document.getElementById(`k-age`).value)||null,n=Xu(`😊`),r=document.getElementById(`k-id`)?.value;if(r){let i=s.kids.profiles.find(e=>String(e.id)===String(r));i&&Object.assign(i,{name:e,emoji:n,age:t})}else s.kids.profiles.push({id:Tu(),name:e,emoji:n,age:t,savings:0});window.saveData(s),window.closeModal(),W()}function ed(e){let t=s.kids.profiles.find(t=>String(t.id)===String(e));t&&confirm(`Remove ${t.name} from this household?\n\nThis will permanently delete their chores, prizes and points history. This cannot be undone.`)&&(s.kids.profiles=s.kids.profiles.filter(t=>t.id!==e),s.kids.chores=s.kids.chores.filter(t=>t.assignedTo!==e),s.kids.completions=s.kids.completions.filter(t=>t.kidId!==e),s.kids.redemptions=s.kids.redemptions.filter(t=>t.kidId!==e),s.meals?.lunchbox?.profiles&&(s.meals.lunchbox.profiles=s.meals.lunchbox.profiles.filter(t=>t.id!==e)),s.childEvents&&(s.childEvents=s.childEvents.filter(t=>{if(t.isHouseholdWide)return!0;let n=(Array.isArray(t.assignedTo)?t.assignedTo:[t.assignedTo]).filter(t=>t!==e);return n.length?(t.assignedTo=n,!0):!1})),window.getDeviceProfile()===e&&window.setDeviceProfile(`adult`),window.saveData(s),window.closeModal(),Cu=`parent`,W())}function td(e){let t=e?s.kids.chores.find(t=>t.id===e):null,n=s.kids.profiles;document.getElementById(`modal-title`).textContent=t?`Edit Chore`:`Add Chore`,document.getElementById(`modal-body`).innerHTML=`
    ${e?`<input type="hidden" id="c-id" value="${e}">`:``}
    <div class="form-group"><label class="form-label">Chore Name</label><input class="form-input" id="c-name" value="${_(t?.name||``)}" placeholder="e.g. Tidy bedroom" autofocus></div>
    <div class="form-group"><label class="form-label">Emoji</label>${Ju(Ku,t?.emoji||`🧹`)}</div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Points</label><input class="form-input" id="c-pts" type="number" max="99999999" min="1" value="${t?.points||10}"></div>
      <div class="form-group"><label class="form-label">Frequency</label><select class="form-select" id="c-freq"><option value="daily" ${t?.frequency===`daily`?`selected`:``}>Daily</option><option value="weekly" ${t?.frequency===`weekly`?`selected`:``}>Weekly</option><option value="once" ${t?.frequency===`once`?`selected`:``}>One-off</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Assign to</label><select class="form-select" id="c-who"><option value="all">All kids</option>${n.map(e=>`<option value="${e.id}" ${t?.assignedTo===e.id?`selected`:``}>${e.emoji} ${g(e.name)}</option>`).join(``)}</select></div>
  `,document.getElementById(`modal-footer`).innerHTML=`<button class="btn btn-ghost" onclick="window.closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveChore()">Save Chore</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function nd(){let e=document.getElementById(`c-name`).value.trim();if(!e)return;let t=parseInt(document.getElementById(`c-pts`).value)||10,n=document.getElementById(`c-freq`).value,r=document.getElementById(`c-who`).value,i=Xu(`🧹`),a=document.getElementById(`c-id`)?.value;if(a){let o=s.kids.chores.find(e=>e.id===a);o&&Object.assign(o,{name:e,emoji:i,points:t,frequency:n,assignedTo:r})}else s.kids.chores.push({id:Tu(),name:e,emoji:i,points:t,frequency:n,assignedTo:r});window.saveData(s),window.closeModal(),W()}function rd(e){let t=e?s.kids.prizes.find(t=>String(t.id)===String(e)):null;document.getElementById(`modal-title`).textContent=t?`Edit Prize`:`Add Prize`,document.getElementById(`modal-body`).innerHTML=`
    ${e?`<input type="hidden" id="p-id" value="${e}">`:``}
    <div class="form-group"><label class="form-label">Prize Name</label><input class="form-input" id="p-name" value="${_(t?.name||``)}" placeholder="e.g. Movie night" autofocus></div>
    <div class="form-group"><label class="form-label">Emoji</label>${Ju(qu,t?.emoji||`🎁`)}</div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Point Cost</label><input class="form-input" id="p-cost" type="number" max="99999999" min="1" value="${t?.pointCost||50}"></div>
      <div class="form-group"><label class="form-label">Type</label><select class="form-select" id="p-type"><option value="outing" ${t?.type===`outing`?`selected`:``}>Outing</option><option value="cash" ${t?.type===`cash`?`selected`:``}>Cash</option><option value="voucher" ${t?.type===`voucher`?`selected`:``}>Voucher</option><option value="custom" ${t?.type===`custom`?`selected`:``}>Custom</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Description (optional)</label><input class="form-input" id="p-desc" value="${_(t?.description||``)}" placeholder="e.g. Any movie of your choice"></div>
  `,document.getElementById(`modal-footer`).innerHTML=`<button class="btn btn-ghost" onclick="window.closeModal()">Cancel</button><button class="btn btn-primary" onclick="savePrize()">Save Prize</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function id(){let e=document.getElementById(`p-name`).value.trim();if(!e)return;let t=parseInt(document.getElementById(`p-cost`).value)||50,n=document.getElementById(`p-type`).value,r=document.getElementById(`p-desc`).value.trim(),i=Xu(`🎁`),a=document.getElementById(`p-id`)?.value;if(a){let o=s.kids.prizes.find(e=>e.id===a);o&&Object.assign(o,{name:e,emoji:i,pointCost:t,type:n,description:r})}else s.kids.prizes.push({id:Tu(),name:e,emoji:i,pointCost:t,type:n,description:r});window.saveData(s),window.closeModal(),W()}function ad(e){let t=s.kids.profiles.find(t=>t.id===e);t&&(document.getElementById(`modal-title`).textContent=`${t.emoji} ${t.name}'s Savings Jar`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group"><label class="form-label">Current balance: $${(t.savings||0).toFixed(2)}</label>
    <input class="form-input" id="s-amount" type="number" max="99999999" step="0.01" placeholder="Amount to add e.g. 5.00" autofocus></div>
    <div class="form-group"><label class="form-label">Note (optional)</label><input class="form-input" id="s-note" placeholder="e.g. Birthday money from Grandma"></div>
  `,document.getElementById(`modal-footer`).innerHTML=`<button class="btn btn-ghost" onclick="window.closeModal()">Cancel</button><button class="btn btn-primary" onclick="addSavings('${e}')">Add to Jar 💰</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`))}function od(e){let t=parseFloat(document.getElementById(`s-amount`).value)||0;if(!t)return;let n=s.kids.profiles.find(t=>t.id===e);n&&(n.savings=(n.savings||0)+t),window.saveData(s),window.closeModal(),W()}var sd=null,cd={};function ld(){return sd?Promise.resolve(sd):new Promise((e,t)=>{let n=indexedDB.open(`home_finance_receipts`,1);n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(`receipts`)||t.createObjectStore(`receipts`,{keyPath:`id`,autoIncrement:!0}).createIndex(`itemKey`,`itemKey`,{unique:!1})},n.onsuccess=t=>{sd=t.target.result,e(sd)},n.onerror=()=>t(n.error)})}async function ud(){let e=await ld();return new Promise(t=>{let n=e.transaction(`receipts`,`readonly`).objectStore(`receipts`).getAll();n.onsuccess=()=>{cd={},n.result.forEach(e=>{cd[e.itemKey]=(cd[e.itemKey]||0)+1}),t()}})}async function dd(e){let t=await ld();return new Promise(n=>{let r=t.transaction(`receipts`,`readonly`).objectStore(`receipts`).index(`itemKey`).getAll(e);r.onsuccess=()=>n(r.result)})}async function fd(e,t){let n=await ld();return new Promise((r,i)=>{let a=n.transaction(`receipts`,`readwrite`).objectStore(`receipts`).add({itemKey:e,fileName:t.name,fileType:t.type,fileSize:t.size,data:t,uploadedAt:new Date().toISOString()});a.onsuccess=()=>r(),a.onerror=()=>i(a.error)})}async function pd(e){let t=await ld();return new Promise(n=>{let r=t.transaction(`receipts`,`readwrite`);r.objectStore(`receipts`).delete(e),r.oncomplete=n})}function md(e){return e===`own-funds`?`<span class="badge" style="background:#ecfeff;color:#166534;border:1px solid #bbf7d0">Own Funds</span>`:`<span class="badge" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe">Loan</span>`}function hd(e,t){let n=cd[e]||0;return`<button class="attach-btn${n?` has-files`:``}" onclick="openReceiptsModal('${e}','${t.replace(/'/g,`\\'`)}')" title="${n?n+` receipt(s)`:`Add receipt`}">📎${n?` ${n}`:``}</button>`}function gd(e){return e>1048576?`${(e/1048576).toFixed(1)} MB`:`${Math.round(e/1024)} KB`}function _d(e){return e===`application/pdf`?`📄`:e.startsWith(`image/`)?`🖼️`:`📎`}async function vd(e,t){window.openModal(`Receipts — ${t}`,`<div style="padding:20px;text-align:center;color:var(--text-muted)">Loading…</div>`,()=>{}),document.getElementById(`modal-footer`).innerHTML=`<button class="btn btn-ghost" onclick="window.closeModal()">Close</button>`,await yd(e,t)}async function yd(e,t){let n=e,r=t.replace(/'/g,`\\'`),i=await dd(e),a=``;i.length?i.forEach(e=>{let t=e.type===`link`,i=t?`🔗`:_d(e.fileType),o=t?e.linkName||e.url:e.fileName,s=t?`<span style="color:var(--text-muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;max-width:260px">${e.url}</span>`:`<span>${gd(e.fileSize)} · ${new Date(e.uploadedAt).toLocaleDateString(`en-AU`)}</span>`,c=t?`<button class="btn btn-ghost btn-sm" onclick="window.open('${e.url.replace(/'/g,`\\'`).replace(/"/g,`&quot;`)}','_blank')">Open</button>`:`<button class="btn btn-ghost btn-sm" onclick="viewReceipt(${e.id})">View</button>`;a+=`
        <div class="receipt-row">
          <div class="receipt-icon">${i}</div>
          <div class="receipt-info">
            <div class="receipt-name">${o}</div>
            <div class="receipt-meta">${s} · ${new Date(e.uploadedAt).toLocaleDateString(`en-AU`)}</div>
          </div>
          ${c}
          <button class="btn btn-danger-ghost btn-sm" onclick="removeReceipt(${e.id},'${n}','${r}')" title="Delete">🗑</button>
        </div>`}):a+=`<div class="empty" style="padding:20px 0 16px"><div class="empty-icon">📎</div>No attachments yet</div>`,a+=`
    <div style="border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:10px">
      <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:10px">🔗 Add Link</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <input class="form-input" id="link-url" type="url" placeholder="https://drive.google.com/…" style="font-size:13px">
        <div style="display:flex;gap:8px">
          <input class="form-input" id="link-name" type="text" maxlength="200" placeholder="Label (optional — e.g. Invoice #1234)" style="font-size:13px;flex:1">
          <button class="btn btn-primary btn-sm" onclick="addLink('${n}','${r}')">Add</button>
        </div>
      </div>
    </div>`,a+=`
    <div class="drop-zone" id="drop-zone" onclick="document.getElementById('receipt-file-input').click()">
      <div class="drop-zone-icon">⬆️</div>
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:10px">Drop files here or click to upload</div>
      <div style="font-size:11px;color:var(--text-muted)">PDF, JPG, PNG, HEIC, WEBP</div>
      <input type="file" id="receipt-file-input" style="display:none" multiple accept=".pdf,.jpg,.jpeg,.png,.heic,.webp,image/*,application/pdf" onchange="uploadReceiptFiles('${n}','${r}')" onclick="event.stopPropagation()">
    </div>`,document.getElementById(`modal-body`).innerHTML=a;let o=document.getElementById(`drop-zone`);o.addEventListener(`dragover`,e=>{e.preventDefault(),o.classList.add(`drag-over`)}),o.addEventListener(`dragleave`,()=>o.classList.remove(`drag-over`)),o.addEventListener(`drop`,async n=>{n.preventDefault(),o.classList.remove(`drag-over`),await Sd(e,t,Array.from(n.dataTransfer.files))})}async function bd(e,t){let n=document.getElementById(`link-url`).value.trim();if(!n){document.getElementById(`link-url`).focus();return}let r=document.getElementById(`link-name`).value.trim(),i=await ld();await new Promise((t,a)=>{let o=i.transaction(`receipts`,`readwrite`).objectStore(`receipts`).add({itemKey:e,type:`link`,url:n,linkName:r,uploadedAt:new Date().toISOString()});o.onsuccess=t,o.onerror=()=>a(o.error)}),await ud(),renderBuild(),await yd(e,t)}async function xd(e,t){let n=document.getElementById(`receipt-file-input`);await Sd(e,t,Array.from(n.files))}async function Sd(e,t,n){for(let t of n)await fd(e,t);await ud(),renderBuild(),await yd(e,t)}async function Cd(e){let t=await ld(),n=await new Promise(n=>{let r=t.transaction(`receipts`,`readonly`).objectStore(`receipts`).get(e);r.onsuccess=()=>n(r.result)});if(n.type===`link`){window.open(n.url,`_blank`);return}let r=URL.createObjectURL(n.data);window.open(r,`_blank`),setTimeout(()=>URL.revokeObjectURL(r),15e3)}async function wd(e,t,n){confirm(`Delete this receipt?`)&&(await pd(e),await ud(),renderBuild(),await yd(t,n))}var Td=null;window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),Td=e;let t=document.getElementById(`install-btn`);t&&(t.style.display=`flex`)}),window.addEventListener(`appinstalled`,()=>{Td=null;let e=document.getElementById(`install-btn`);e&&(e.style.display=`none`)});function Ed(){Td&&(Td.prompt(),Td.userChoice.then(()=>{Td=null}))}var Dd={building:[{name:`Mortgage / Rent`,category:`Mortgage / Rent`,amount:3e3},{name:`Groceries`,category:`Groceries`,amount:1200},{name:`Utilities`,category:`Utilities`,amount:400},{name:`Transport`,category:`Transport`,amount:500},{name:`Insurance`,category:`Insurance`,amount:350},{name:`Entertainment`,category:`Entertainment`,amount:200}],mortgage:[{name:`Mortgage`,category:`Mortgage / Rent`,amount:3500},{name:`Groceries`,category:`Groceries`,amount:1200},{name:`Utilities`,category:`Utilities`,amount:400},{name:`Transport`,category:`Transport`,amount:500},{name:`Insurance`,category:`Insurance`,amount:350},{name:`Entertainment`,category:`Entertainment`,amount:200}],renting:[{name:`Rent`,category:`Mortgage / Rent`,amount:2500},{name:`Groceries`,category:`Groceries`,amount:1200},{name:`Utilities`,category:`Utilities`,amount:300},{name:`Transport`,category:`Transport`,amount:500},{name:`Insurance`,category:`Insurance`,amount:250},{name:`Entertainment`,category:`Entertainment`,amount:200}],own:[{name:`Groceries`,category:`Groceries`,amount:1200},{name:`Utilities`,category:`Utilities`,amount:400},{name:`Transport`,category:`Transport`,amount:500},{name:`Insurance`,category:`Insurance`,amount:400},{name:`Health`,category:`Health`,amount:300},{name:`Entertainment`,category:`Entertainment`,amount:300}]},G={step:1,adults:2,adultNames:[``,``],adultAges:[``,``],kids:0,kidProfiles:[],homeType:`mortgage`,incomes:[{name:``,amount:``,frequency:`Monthly`}],expenses:[],_emojiPickerOpen:null};function Od(){return G.kids>0?[1,2,3,4,5,6]:[1,2,4,5,6]}function kd(){return Od().indexOf(G.step)}function Ad(){G={step:1,adults:2,adultNames:[``,``],adultAges:[``,``],kids:0,kidProfiles:[],homeType:`mortgage`,incomes:[{name:``,amount:``,frequency:`Monthly`}],expenses:[],_emojiPickerOpen:null},document.getElementById(`onboarding-overlay`).style.display=`flex`,Ld()}function jd(){document.getElementById(`onboarding-overlay`).style.display=`none`}function Md(e){for(G.adults=e;G.adultNames.length<e;)G.adultNames.push(``);for(G.adultNames=G.adultNames.slice(0,e);G.adultAges.length<e;)G.adultAges.push(``);G.adultAges=G.adultAges.slice(0,e),Ld()}function Nd(e){G.kids=e,G.kidProfiles.length>e&&(G.kidProfiles=G.kidProfiles.slice(0,e)),Ld()}function Pd(e){G._emojiPickerOpen=G._emojiPickerOpen===e?null:e,Ld()}function Fd(e,t){G.kidProfiles[e].emoji=t,G._emojiPickerOpen=null,Ld()}function Id(e){G.expenses[e].skipped=!G.expenses[e].skipped,Ld()}function Ld(){let e=document.getElementById(`onboarding-card`),t=Od(),n=kd(),r=G.step,i=t.map((e,t)=>`<div class="ob-dot ${t<n?`done`:t===n?`active`:``}"></div>`).join(``),a=``,o=``,s=``;if(r===1)a=`
      <div style="text-align:center;font-size:52px;margin-bottom:16px">🏡</div>
      <div class="ob-title" style="text-align:center">Welcome to Toto</div>
      <div class="ob-subtitle" style="text-align:center">Your personal assistant for life.<br>Takes about 4 minutes to set up.</div>`,o=`
      <div class="ob-welcome-feature"><span>✅</span> Budget, bills &amp; net worth</div>
      <div class="ob-welcome-feature"><span>✅</span> Meal planner &amp; lunchbox</div>
      <div class="ob-welcome-feature"><span>✅</span> Kids' chores &amp; rewards</div>`,s=`
      <button class="ob-back" onclick="obSkip()">Skip setup</button>
      <button class="ob-next" onclick="obNext()">Let's get started →</button>`;else if(r===2){a=`
      <div class="ob-step-dots">${i}</div>
      <div class="ob-title">Your household 🏠</div>
      <div class="ob-subtitle">Tell us who's home so we can tailor Toto for you.</div>`;let e=[1,2,3].map(e=>`<button class="ob-option ${G.adults===e?`selected`:``}" onclick="obSetAdults(${e})">${e} adult${e>1?`s`:``}</button>`).join(``),t=G.adultNames.map((e,t)=>`
      <div style="display:grid;grid-template-columns:1fr 90px;gap:8px;margin-bottom:10px">
        <div>
          <div class="ob-input-label">Adult ${t+1} name</div>
          <input class="ob-input" placeholder="${t===0?`e.g. Chris`:`e.g. Sam`}" value="${_(e)}"
            oninput="_ob.adultNames[${t}]=this.value"
            style="${G._nameError&&!e.trim()?`border-color:#ef4444`:``}" required>
          ${G._nameError&&!e.trim()?`<div style="font-size:11px;color:#ef4444;margin-top:3px">Please enter a name</div>`:``}
        </div>
        <div>
          <div class="ob-input-label">Age (optional)</div>
          <input class="ob-input" type="number" min="18" max="99" placeholder="Age" value="${_(String(G.adultAges[t]||``))}"
            oninput="_ob.adultAges[${t}]=this.value">
        </div>
      </div>`).join(``),n=[0,1,2,3,`4+`].map(e=>{let t=e===`4+`?4:e;return`<button class="ob-option ${G.kids===t?`selected`:``}" onclick="obSetKids(${t})">${e===0?`No kids`:e+(e===1?` kid`:` kids`)}</button>`}).join(``);o=`
      <span class="ob-label">Adults in your household</span>
      <div class="ob-options">${e}</div>
      ${t}
      <span class="ob-label" style="margin-top:4px">Home situation</span>
      <div class="ob-options">${[{val:`renting`,label:`🏢 Renting`},{val:`mortgage`,label:`🏠 Mortgage`},{val:`building`,label:`🏗️ Building`},{val:`own`,label:`✅ Own outright`}].map(e=>`<button class="ob-option ${G.homeType===e.val?`selected`:``}" onclick="_ob.homeType='${e.val}';renderObStep()">${e.label}</button>`).join(``)}</div>
      <span class="ob-label">Kids</span>
      <div class="ob-options" style="margin-bottom:0">${n}</div>`,s=`
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obNext()">Continue →</button>`}else if(r===3)G.kidProfiles.length<G.kids&&(G.kidProfiles=Array.from({length:G.kids},(e,t)=>G.kidProfiles[t]||{name:``,age:``,emoji:KID_EMOJIS[t%KID_EMOJIS.length]})),a=`
      <div class="ob-step-dots">${i}</div>
      <div class="ob-title">Your kids 👶</div>
      <div class="ob-subtitle">We'll set up chores and lunchbox for each of them.</div>`,o=G.kidProfiles.map((e,t)=>{let n=G._emojiPickerOpen===t?`
        <div class="ob-emoji-picker">
          ${KID_EMOJIS.map(e=>`<button onclick="obPickEmoji(${t},'${e}')">${e}</button>`).join(``)}
        </div>`:``;return`
        <div style="margin-bottom:20px">
          <div class="ob-input-label" style="margin-bottom:8px">Kid ${t+1}</div>
          ${n}
          <div class="ob-kid-row">
            <button class="ob-emoji-btn" onclick="obToggleEmojiPicker(${t})" title="Pick emoji">${g(e.emoji)}</button>
            <div>
              <div class="ob-input-label">Name</div>
              <input class="ob-input" placeholder="Name" value="${_(e.name)}"
                oninput="_ob.kidProfiles[${t}].name=this.value">
            </div>
            <div>
              <div class="ob-input-label">Age</div>
              <input class="ob-input" type="number" min="0" max="17" placeholder="Age" value="${_(String(e.age))}"
                oninput="_ob.kidProfiles[${t}].age=this.value">
            </div>
          </div>
        </div>`}).join(``)+`
      <button class="ob-add-link" onclick="_ob.kidProfiles.push({name:'',age:'',emoji:KID_EMOJIS[_ob.kidProfiles.length%KID_EMOJIS.length]});renderObStep()">+ Add a child</button>`,s=`
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obNext()">Continue →</button>`;else if(r===4){a=`
      <div class="ob-step-dots">${i}</div>
      <div class="ob-title">Your income 💰</div>
      <div class="ob-subtitle">What's coming in each month?</div>`;let e=[`Weekly`,`Fortnightly`,`Monthly`,`Annual`];o=`
      ${G.incomes.map((t,n)=>{let r=G.adultNames[n]?`${G.adultNames[n]}'s salary`:n===0?`e.g. Salary`:`e.g. Partner salary`,i=e.map(e=>`<button class="ob-option ${t.frequency===e?`selected`:``}" style="padding:6px 14px;font-size:12px"
          onclick="_ob.incomes[${n}].frequency='${e}';renderObStep()">${e}</button>`).join(``);return`
        <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f1f5f9">
          <div style="margin-bottom:10px">
            <div class="ob-input-label">Income source</div>
            <input class="ob-input" placeholder="${_(r)}" value="${_(t.name)}"
              oninput="_ob.incomes[${n}].name=this.value">
          </div>
          <div style="margin-bottom:10px">
            <div class="ob-input-label">Amount ($)</div>
            <input class="ob-input" type="number" max="99999999" min="0" placeholder="0" value="${t.amount}"
              oninput="_ob.incomes[${n}].amount=this.value">
          </div>
          <div>
            <div class="ob-input-label">Frequency</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">${i}</div>
          </div>
        </div>`}).join(``)}
      ${G.incomes.length<4?`<button class="ob-add-link" onclick="_ob.incomes.push({name:'',amount:'',frequency:'Monthly'});renderObStep()">+ Add another income source</button>`:``}`,s=`
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obNext()">Continue →</button>`}else if(r===5)G.expenses.length||(G.expenses=Dd[G.homeType].map(e=>({...e,skipped:!1})),G.kids>0&&G.expenses.push({name:`Kids activities / sport`,category:`Childcare / Education`,amount:300,skipped:!1})),a=`
      <div class="ob-step-dots">${i}</div>
      <div class="ob-title">Your main expenses 📋</div>
      <div class="ob-subtitle">Biggest regular costs — adjust to match your situation.</div>`,o=`
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <p style="font-size:13px;color:#64748b;margin:0">Monthly amounts — adjust to match your actual spending.</p>
        <button class="ob-add-link" onclick="obSkipExpenses()" style="white-space:nowrap;margin-left:12px">Add this later</button>
      </div>
      ${G.expenses.map((e,t)=>`
      <div class="ob-expense-row ${e.skipped?`skipped`:``}">
        <div>
          <div class="ob-expense-name">${g(e.name)}</div>
          <div class="ob-expense-cat">${e.category}</div>
        </div>
        <div>
          <input class="ob-input" type="number" max="99999999" min="0" placeholder="0" value="${e.amount}"
            oninput="_ob.expenses[${t}].amount=parseFloat(this.value)||0"
            style="text-align:right" ${e.skipped?`disabled`:``}>
          <button class="ob-skip-toggle" onclick="obToggleExpenseSkip(${t})">
            ${e.skipped?`+ Include`:`✕ Skip this`}
          </button>
        </div>
      </div>`).join(``)}`,s=`
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obNext()">Continue →</button>`;else if(r===6){let e=G.incomes.reduce((e,t)=>{let n=parseFloat(t.amount)||0;return n?e+(t.frequency===`Weekly`?n*52/12:t.frequency===`Fortnightly`?n*26/12:t.frequency===`Annual`?n/12:n):e},0),t=G.expenses.filter(e=>!e.skipped).reduce((e,t)=>e+(parseFloat(t.amount)||0),0),n=G.adultNames.filter(e=>e),r=n.length>0?n.join(` & `):`${G.adults} adult${G.adults>1?`s`:``}`,i={renting:`Renting`,mortgage:`Mortgage`,building:`Building`,own:`Own outright`}[G.homeType]||``,c=[`
      <div class="ob-summary-member">
        <div class="ob-summary-avatar">👤</div>
        <div>
          <div style="font-size:14px;font-weight:600">${g(r)}</div>
          <div style="font-size:12px;color:#64748b">Adults · ${i}</div>
        </div>
      </div>`];G.kidProfiles.forEach(e=>{e.name&&c.push(`
        <div class="ob-summary-member">
          <div class="ob-summary-avatar">${g(e.emoji)}</div>
          <div>
            <div style="font-size:14px;font-weight:600">${g(e.name)}${e.age?`, age ${e.age}`:``}</div>
            <div style="font-size:12px;color:#64748b">Chores &amp; lunchbox ready</div>
          </div>
        </div>`)}),a=`
      <div style="text-align:center;font-size:48px;margin-bottom:12px">🎉</div>
      <div class="ob-title" style="text-align:center">You're all set!</div>
      <div class="ob-subtitle" style="text-align:center">Here's what Toto knows about your household</div>`,o=`
      <div style="background:#f8fafc;border-radius:12px;padding:16px;margin-bottom:16px;border:1px solid #e2e8f0">
        ${c.join(``)}
      </div>
      <div style="display:flex;gap:12px">
        <div style="flex:1;background:#f0fdf4;border-radius:10px;padding:14px;text-align:center">
          <div style="font-size:20px;font-weight:700;color:#16a34a">$${Math.round(e).toLocaleString()}</div>
          <div style="color:#64748b;font-size:11px">monthly income</div>
        </div>
        <div style="flex:1;background:#fff7ed;border-radius:10px;padding:14px;text-align:center">
          <div style="font-size:20px;font-weight:700;color:#ea580c">$${Math.round(t).toLocaleString()}</div>
          <div style="color:#64748b;font-size:11px">monthly expenses</div>
        </div>
      </div>`,s=`
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obFinish()">Take me to my dashboard →</button>`}e.innerHTML=`
    <div class="ob-header">${a}</div>
    <div class="ob-body">${o}</div>
    <div class="ob-footer">${s}</div>`}function Rd(){let e=Od(),t=kd();if(t>=e.length-1){Hd();return}if(G.step===2){if(G.adultNames.some(e=>!e.trim())){G._nameError=!0,Ld();return}G._nameError=!1}let n=e[t+1];n===3&&(G.kidProfiles=Array.from({length:G.kids},(e,t)=>G.kidProfiles[t]||{name:``,age:``,emoji:KID_EMOJIS[t%KID_EMOJIS.length]})),n===5&&!G.expenses.length&&(G.expenses=Dd[G.homeType].map(e=>({...e,skipped:!1})),G.kids>0&&G.expenses.push({name:`Kids activities / sport`,category:`Childcare / Education`,amount:300,skipped:!1})),G.step=n,Ld()}function zd(){let e=Od(),t=kd();t<=0||(G.step=e[t-1],Ld())}function Bd(){s.onboarded=!0,window.saveData(s),jd()}function Vd(){G.expenses=[];let e=Od(),t=kd();G.step=e[t+1],Ld()}function Hd(){s.householdProfile.members=[];for(let e=0;e<G.adults;e++)s.householdProfile.members.push({role:`adult`,name:G.adultNames[e]||``,age:G.adultAges[e]?parseInt(G.adultAges[e]):null});s.kids||(s.kids={profiles:[],chores:[],prizes:[],completions:[],redemptions:[]}),s.meals||(s.meals={}),s.meals.lunchbox||(s.meals.lunchbox={profiles:[]}),s.meals.lunchbox.profiles||(s.meals.lunchbox.profiles=[]),s.kids.profiles=[],s.meals.lunchbox.profiles=[],G.kidProfiles.forEach(e=>{if(s.householdProfile.members.push({role:`child`,name:e.name,age:e.age?parseInt(e.age):null,emoji:e.emoji}),!e.name)return;let t=nextId(s.kids.profiles);s.kids.profiles.push({id:t,name:e.name,age:e.age?parseInt(e.age):null,emoji:e.emoji}),s.meals.lunchbox.profiles.push({id:t,name:e.name,emoji:e.emoji})}),s.householdProfile.homeType=G.homeType;let e=window.ensureMonthOverride(window.selectedBudgetMonth);G.incomes.forEach((t,n)=>{let r=parseFloat(t.amount);if(!r)return;let i=t.frequency===`Weekly`?r*52/12:t.frequency===`Fortnightly`?r*26/12:t.frequency===`Annual`?r/12:r,a=t.name||(G.adultNames[n]?`${G.adultNames[n]}'s salary`:`Income ${n+1}`);e.income.push({id:nextId(e.income),name:a,amount:i,frequency:`monthly`,category:`Salary`})}),G.expenses.forEach(t=>{t.skipped||!t.amount||e.expenses.push({id:nextId(e.expenses),name:t.name,amount:t.amount,frequency:`monthly`,category:t.category,recurring:!0})}),s.onboarded=!0,window.saveData(s),jd(),window.renderAll()}document.getElementById(`btn-guest-mode`)?.addEventListener(`click`,()=>rf()),document.getElementById(`btn-google-signin`)?.addEventListener(`click`,()=>nf());function Ud(){document.getElementById(`sidebar`).classList.toggle(`collapsed`)}var Wd={};function Gd(e){let t=document.getElementById(`icon-group-${e}`),n=document.getElementById(`icon-group-${e}-children`),r=document.getElementById(`text-group-${e}`),i=document.getElementById(`text-group-${e}-children`),a=n&&n.classList.contains(`open`);t&&t.classList.toggle(`open`,!a),n&&n.classList.toggle(`open`,!a),r&&r.classList.toggle(`open`,!a),i&&i.classList.toggle(`open`,!a)}function Kd(e){for(let[t,n]of Object.entries(Wd))if(n.includes(e)){let e=document.getElementById(`icon-group-${t}-children`);e&&!e.classList.contains(`open`)&&Gd(t);return}}window.addEventListener(`unhandledrejection`,e=>{console.error(`[unhandledrejection]`,e.reason)}),window.addEventListener(`error`,e=>{console.error(`[uncaughtError]`,e.message,e.filename,e.lineno)});var qd=`toto_household_owner`,Jd=`toto_pending_household`;function Yd(){return sessionStorage.getItem(Jd)||Tf(qd)||K?.uid||null}function Xd(){let e=Yd();return e?fbStore.collection(`families`).doc(e):null}function Zd(e){Ef(qd,e),sessionStorage.removeItem(Jd)}var K=null,Qd=!1,$d=null;Object.defineProperty(window,`_fsUnsubscribe`,{get(){return $d},set(e){$d=e},configurable:!0});var ef=null;Object.defineProperty(window,`_pendingLogEntry`,{get(){return ef},set(e){ef=e},configurable:!0}),Object.defineProperty(window,`_currentUser`,{get(){return K},set(e){K=e},configurable:!0});function tf(e,t){ef={ts:new Date().toISOString(),name:K&&(K.displayName||K.email)||`Unknown`,photo:K&&K.photoURL||``,action:e,detail:t||``}}function nf(){let e=new fbAuth.GoogleAuthProvider;fbAuth.signInWithPopup(e).catch(e=>{let t=document.getElementById(`login-error`);t&&(t.textContent=e.message,t.style.display=``)})}async function rf(){Qd=!0;let e=document.getElementById(`login-overlay`);e&&e.classList.add(`hidden`),await Pf,s.onboarded||(s.onboarded=!0,q(s));let t=location.hash.slice(1);t&&document.getElementById(`tab-`+t)?(history.replaceState({tab:t},``,`#`+t),m(t)):rm(),If()}function af(){$d&&($d(),$d=null),yf=!1,J=null,Nf(),fbAuth.signOut()}function of(e){return e.budget||(e.budget={income:[],expenses:[],actuals:{},months:{}}),e.budget.actuals||(e.budget.actuals={}),e.budget.months||(e.budget.months={}),e.budget.suggestions||(e.budget.suggestions=[]),e.goals||(e.goals=[]),e.scenarios||(e.scenarios=[]),e.furniture||(e.furniture=[]),e.appliances||(e.appliances=[]),e.planner||(e.planner={events:[]}),e.lists||(e.lists={food:{items:[],budget:0,weeklyBudget:200,stores:[],favourites:[],history:[]},clothes:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},wishlist:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},home:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},pharmacy:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]}},e.meals&&e.meals.shopping&&e.meals.shopping.length&&(e.lists.food.items=e.meals.shopping.map(function(e,t){return{id:`si-`+t,name:e.name,quantity:1,unit:`units`,notes:``,aisle:e.cat||`other`,state:e.checked?`got_it`:`active`,addedBy:`migration`,addedAt:new Date().toISOString(),mealTag:null,manualPrice:null,barcodeId:null}}))),[`food`,`clothes`,`wishlist`,`home`,`pharmacy`].forEach(function(t){e.lists[t]||(e.lists[t]={items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]}),e.lists[t].items||(e.lists[t].items=[]),e.lists[t].stores||(e.lists[t].stores=[]),e.lists[t].favourites||(e.lists[t].favourites=[]),e.lists[t].history||(e.lists[t].history=[])}),e}function sf(){$d&&$d(),!Tf(qd)&&!sessionStorage.getItem(Jd)&&Zd(K.uid);let e=Xd();if(!e){console.error(`No household doc ref`);return}$d=e.onSnapshot(async t=>{if(t.exists){let e=of(t.data());Object.assign(s,e),Ef(lf,JSON.stringify(s))}else{let t=await fbStore.collection(`family`).doc(`shared`).get().catch(()=>null);if(t&&t.exists){let n=of(t.data());Object.assign(s,n),e.set(s).catch(()=>{}),Ef(lf,JSON.stringify(s))}else e.set(s).catch(()=>{})}ud().then(()=>{Qn();let e=location.hash.slice(1);e&&document.getElementById(`tab-`+e)?(history.replaceState({tab:e},``,`#`+e),m(e)):rm(),s.onboarded||(s.onboarded=!0,q(s));let t=sessionStorage.getItem(op),n=sessionStorage.getItem(`toto_post_invite_action`);t||n?(sessionStorage.removeItem(`toto_post_invite_action`),cp()):If()})},e=>{console.error(`Firestore sync error:`,e),rm()})}function cf(){fbAuth.onAuthStateChanged(e=>{if(Qd&&!e)return;K=e;let t=document.getElementById(`login-overlay`),n=document.getElementById(`header-avatar`),r=document.getElementById(`header-sign-out`);if(e)t&&t.classList.add(`hidden`),n&&(n.src=e.photoURL||``,n.style.display=`block`),r&&(r.style.display=`block`),sf();else{t&&t.classList.remove(`hidden`),n&&(n.style.display=`none`),r&&(r.style.display=`none`),$d&&($d(),$d=null);let e=sessionStorage.getItem(op),i=document.getElementById(`login-invite-banner`),a=document.getElementById(`login-tagline`);e&&i&&(i.style.display=`block`,a&&(a.style.display=`none`))}})}cf();var lf=`home_finance_v1`,uf=null,df={};function ff(e,t,n,r){df[e]={options:t,value:n,onChange:r};let i=t.find(e=>(e.value??e)===n)||t[0],a=i?.label??i?.value??i??``;return`<div class="cs-wrap">
    <button type="button" class="cs-trigger" id="cs-${e}" onclick="event.stopPropagation();_csOpen('${e}',this)">
      <span id="cs-label-${e}">${g(String(a))}</span>
      <span class="cs-chevron">▼</span>
    </button>
  </div>`}function pf(e,t){uf&&(uf.remove(),uf=null,document.querySelectorAll(`.cs-trigger.open`).forEach(e=>e.classList.remove(`open`)));let n=df[e];if(!n)return;t.classList.add(`open`);let r=t.getBoundingClientRect(),i=document.createElement(`div`);i.className=`cs-dropdown`,i.style.left=r.left+`px`,i.style.width=Math.max(r.width,180)+`px`;let a=window.innerHeight-r.bottom-8,o=r.top-8,s=Math.min(260,n.options.length*43);i.style.top=a>=s||a>=o?r.bottom+4+`px`:Math.max(8,r.top-s-4)+`px`,n.options.forEach(r=>{let a=r.value??r,o=r.label??r.value??r,s=document.createElement(`div`);s.className=`cs-option`+(a===n.value?` cs-selected`:``),s.textContent=o,s.addEventListener(`click`,r=>{r.stopPropagation(),n.value=a;let s=document.getElementById(`cs-label-`+e);s&&(s.textContent=o),n.onChange(a),i.remove(),uf=null,t.classList.remove(`open`)}),i.appendChild(s)}),document.body.appendChild(i),uf=i}document.addEventListener(`click`,()=>{uf&&(uf.remove(),uf=null,document.querySelectorAll(`.cs-trigger.open`).forEach(e=>e.classList.remove(`open`)))});function mf(e){e&&e.querySelectorAll(`select.form-select:not(.cs-upgraded)`).forEach(e=>{e.classList.add(`cs-upgraded`);let t=(e.id||`cs`+Math.random().toString(36).slice(2,7))+`__cs`,n=Array.from(e.options).map(e=>({value:e.value,label:e.text})),r=e.value||n[0]?.value||``;e.style.cssText=`position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;overflow:hidden`;let i=document.createElement(`div`);i.className=`cs-wrap`,i.innerHTML=ff(t,n,r,t=>{e.value=t,e.dispatchEvent(new Event(`change`,{bubbles:!0}))}),e.parentNode.insertBefore(i,e)})}(function(){let e=document.getElementById(`modal-overlay`);e&&new MutationObserver(()=>{e.classList.contains(`hidden`)||mf(document.getElementById(`modal-body`))}).observe(e,{attributes:!0,attributeFilter:[`class`]})})();var hf={buildContract:{total:79e4,stages:[{id:1,name:`Deposit`,amount:39500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:2,name:`Base / Slab`,amount:79e3,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:3,name:`Frame`,amount:118500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:4,name:`Lock-up / Enclosed`,amount:276500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:5,name:`Fixing / Fitout`,amount:197500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:6,name:`Practical Completion`,amount:79e3,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``}],variations:[]},extras:[{id:1,name:`Solar`,vendor:``,totalAmount:0,amountPaid:0,dueDate:``,notes:``},{id:2,name:`Landscaping`,vendor:``,totalAmount:0,amountPaid:0,dueDate:``,notes:``}],furniture:[],appliances:[],goals:[],scenarios:[],kids:{profiles:[],chores:[],prizes:[],completions:[],redemptions:[]},netWorth:{assets:[],liabilities:[],snapshots:[],target:{amount:0,byYear:0}},bills:[],subscriptions:[],planner:{events:[]},meals:{plan:{},shopping:[],lunchbox:{profiles:[],plans:{}},pantry:[]},vehicles:[],documents:[],maintenance:[],onboarded:!1,setupProgressDismissed:!1,activityLog:[],householdProfile:{members:[{role:`adult`,age:null},{role:`adult`,age:null}],pets:[],cars:1,invites:[],authorizedUsers:[]},expenseCategories:[`Mortgage / Rent`,`Insurance`,`Utilities`,`Groceries`,`Transport`,`Childcare / Education`,`Health`,`Entertainment`,`Subscriptions`,`Dining Out`,`Clothing`,`Personal Care`,`Savings / Investment`,`Other`],incomeCategories:[`Salary`,`Freelance / Contract`,`Rental Income`,`Government / Benefits`,`Investment`,`Other`],budget:{income:[],expenses:[],actuals:{},months:{}},settings:{autoFillMonths:!1},categoryGroups:[{id:1,name:`Housing`,icon:`🏠`,categories:[`Mortgage / Rent`,`Utilities`,`Insurance`]},{id:2,name:`Food & Dining`,icon:`🍽️`,categories:[`Groceries`,`Dining Out`]},{id:3,name:`Transport`,icon:`🚗`,categories:[`Transport`]},{id:4,name:`Family & Health`,icon:`👨‍👩‍👧`,categories:[`Childcare / Education`,`Health`,`Personal Care`]},{id:5,name:`Lifestyle`,icon:`🎮`,categories:[`Entertainment`,`Subscriptions`,`Clothing`]},{id:6,name:`Savings`,icon:`💰`,categories:[`Savings / Investment`]},{id:7,name:`Other`,icon:`📦`,categories:[`Other`]}],routines:[],routineAssignments:[],childEvents:[]};function gf(){try{let e=Tf(lf);if(!e)return JSON.parse(JSON.stringify(hf));let t=JSON.parse(e);t.budget.actuals||(t.budget.actuals={}),t.budget.months||(t.budget.months={}),t.budget.suggestions||(t.budget.suggestions=[]),t.goals||(t.goals=[]),t.scenarios||(t.scenarios=[]),t.netWorth||(t.netWorth={assets:[],liabilities:[],snapshots:[]}),t.netWorth.snapshots||(t.netWorth.snapshots=[]),t.netWorth.target||(t.netWorth.target={amount:0,byYear:0}),t.bills||(t.bills=[]),t.subscriptions||(t.subscriptions=[]),t.onboarded===void 0&&(t.onboarded=!0),t.planner||(t.planner={events:[]}),t.planner?.events&&t.planner.events.forEach(e=>{if(e.recurring||(e.recurring=`none`),!e.recurrence&&e.recurring&&e.recurring!==`none`){let t={weekly:{type:`interval`,intervalDays:7},fortnightly:{type:`interval`,intervalDays:14},monthly:{type:`interval`,intervalDays:30},quarterly:{type:`interval`,intervalDays:91},yearly:{type:`interval`,intervalDays:365}}[e.recurring];t&&(e.recurrence={...t,startDate:e.date||new Date().toISOString().slice(0,10)})}}),t.kids||(t.kids={profiles:[],chores:[],prizes:[],completions:[],redemptions:[]}),t.kids.profiles||(t.kids.profiles=[]),t.kids.chores||(t.kids.chores=[]),t.kids.prizes||(t.kids.prizes=[]),t.kids.completions||(t.kids.completions=[]),t.kids.redemptions||(t.kids.redemptions=[]);let n=new Map;if(t.kids.profiles.forEach(e=>{e.name&&n.set(e.name.toLowerCase(),e)}),n.size<t.kids.profiles.length&&(t.kids.profiles=Array.from(n.values())),t.furniture||(t.furniture=[]),t.appliances||(t.appliances=[]),t.activityLog||(t.activityLog=[]),!t.householdProfile)t.householdProfile={members:[{role:`adult`,age:null},{role:`adult`,age:null}],pets:[],cars:1};else if(`adults`in t.householdProfile){let e=t.householdProfile.adults||2,n=t.householdProfile.children||0;t.householdProfile={members:[...Array.from({length:e},()=>({role:`adult`,age:null})),...Array.from({length:n},()=>({role:`child`,age:null}))],pets:[],cars:1}}t.householdProfile.pets||(t.householdProfile.pets=[]),t.householdProfile.cars===void 0&&(t.householdProfile.cars=1),t.householdProfile.invites||(t.householdProfile.invites=[]),t.householdProfile.authorizedUsers||(t.householdProfile.authorizedUsers=[]),(t.householdProfile.members||[]).forEach((e,n)=>{if(!e.name)if(e.role===`child`){let r=(t.kids?.profiles||[])[n-(t.householdProfile.members||[]).filter((e,t)=>t<n&&e.role===`adult`).length];r?.name&&(e.name=r.name,!e.age&&r.age&&(e.age=r.age),!e.emoji&&r.emoji&&(e.emoji=r.emoji))}else{let r=(t.budget?.income||[])[(t.householdProfile.members||[]).filter((e,t)=>t<n&&e.role===`adult`).length];if(r?.name){let t=r.name.match(/^([^'\s]+)'s\s/i)||r.name.match(/^([^'\s]+)\s/);t&&(e.name=t[1])}}}),t.meals||(t.meals={plan:{},shopping:[]}),t.meals.plan||(t.meals.plan={}),t.meals.shopping||(t.meals.shopping=[]),t.meals.lunchbox||(t.meals.lunchbox={profiles:[],plans:{}}),t.meals.lunchbox.profiles||(t.meals.lunchbox.profiles=[]),t.meals.lunchbox.plans||(t.meals.lunchbox.plans={}),t.meals.pantry||(t.meals.pantry=[]),t.vehicles||(t.vehicles=[]),t.documents||(t.documents=[]),t.maintenance||(t.maintenance=[]),t.routines||(t.routines=[]),t.routineAssignments||(t.routineAssignments=[]);let r=new Set((t.routineAssignments||[]).map(e=>e.routineId));if(t.routines.forEach(e=>{if(e.completions||(e.completions={}),e.sharedWith||(e.sharedWith=[]),e.assignedTo||(e.assignedTo=[]),e.linkedFrom||(e.linkedFrom=null),e.linkedType||(e.linkedType=null),e.pointsPerCompletion===void 0&&(e.pointsPerCompletion=0),(e.steps||[]).forEach(e=>{e.points===void 0&&(e.points=0)}),e.skippedDates||(e.skippedDates=[]),e.pausePeriods||(e.pausePeriods=[]),e.recurrence||(e.recurrence={type:`daily`,startDate:(e.lastEditedAt||new Date().toISOString()).slice(0,10)}),(!e.ownerType||!e.ownerId)&&(r.has(e.id)?(e.ownerType=`household`,e.ownerId=`household`):(e.ownerType=`adult`,e.ownerId=`guest`)),r.has(e.id)&&e.ownerType!==`household`&&(e.ownerType=`household`,e.ownerId=`household`),e.ownerType===`adult`&&e.ownerId===`guest`&&e.steps?.length>0){let t=new Set([`Make bed`,`Shower`,`Breakfast`,`Exercise`,`Plan the day`,`Tidy kitchen`,`Prep tomorrow`,`Family time`,`Read`,`Lights out`]);e.steps.every(e=>t.has(e.label))&&(e.steps=[])}}),t.routineAssignments.forEach(e=>{if(!e.completionState){let n=t.routines.find(t=>t.id===e.routineId);e.completionState=n&&Object.keys(n.completions||{}).length?JSON.parse(JSON.stringify(n.completions)):{}}e.archivedCompletionState||(e.archivedCompletionState=null),e.childIds||(e.childIds=e.childId?[e.childId]:[])}),t.routines.forEach(e=>{e.ownerType===`household`&&(e.completions={})}),t.childEvents||(t.childEvents=[]),t.childEvents.forEach(e=>{e.recurrence||(e.recurrence=null),e.assignedTo||(e.assignedTo=[]),e.isHouseholdWide===void 0&&(e.isHouseholdWide=!1)}),t.settings||(t.settings={autoFillMonths:!1}),t.settings.notifStyle||(t.settings.notifStyle=`focus-timeline`),t.settings.routineResetHour===void 0&&(t.settings.routineResetHour=0),t.kids.notifications||(t.kids.notifications=[]),t.settings.typeAMode===void 0&&(t.settings.typeAMode=!1),t.settings.typeAStreak||(t.settings.typeAStreak=0),t.settings.typeALastReset||(t.settings.typeALastReset=``),t.settings.typeADismissedMission||(t.settings.typeADismissedMission=``),t.settings.typeAMissionShownDate||(t.settings.typeAMissionShownDate=``),t.settings.typeAMissionId||(t.settings.typeAMissionId=``),t.settings.typeALastResetDate||(t.settings.typeALastResetDate=``),t.categoryGroups||(t.categoryGroups=JSON.parse(JSON.stringify(hf.categoryGroups))),t.buildContract.variations||(t.buildContract.variations=[]),t.buildContract.stages.forEach(e=>{e.expectedDate||(e.expectedDate=``)}),t.expenseCategories||(t.expenseCategories=JSON.parse(JSON.stringify(hf.expenseCategories))),t.incomeCategories||(t.incomeCategories=JSON.parse(JSON.stringify(hf.incomeCategories))),t.budget&&t.budget.expenses){let e=new Date;t.budget.expenses.forEach(t=>{if(t.dueDay&&!t.dueDate){let n=e.getFullYear(),r=e.getMonth()+1,i=Math.min(t.dueDay,new Date(n,r,0).getDate());t.dueDate=`${n}-${String(r).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`,delete t.dueDay}t.frequency===`annual`&&(t.frequency=`annually`)})}return t}catch{return JSON.parse(JSON.stringify(hf))}}function q(e){if(A(e),ef&&(e.activityLog||(e.activityLog=[]),e.activityLog.unshift(ef),e.activityLog.length>200&&(e.activityLog.length=200),ef=null),Ef(lf,JSON.stringify(e)),K){let t=Xd();t&&t.set(e).catch(e=>{console.error(`Firestore save error:`,e)})}}window._saveData=q;var _f=`toto_device_profile`,vf=`toto_kid_session`,J=null,yf=!1,Y=0,bf=0,X=``,xf=null;Object.defineProperty(window,`_activeProfile`,{get(){return J},set(e){J=e},configurable:!0}),Object.defineProperty(window,`_deviceRoutingDone`,{get(){return yf},set(e){yf=e},configurable:!0}),Object.defineProperty(window,`_pinAttempts`,{get(){return Y},set(e){Y=e},configurable:!0}),Object.defineProperty(window,`_pinBuffer`,{get(){return X},set(e){X=e},configurable:!0}),Object.defineProperty(window,`_pinTargetId`,{get(){return xf},set(e){xf=e},configurable:!0});var Sf={};function Cf(){return window.Capacitor?.Plugins?.Preferences??null}async function wf(e){let t=Cf();for(let n of e)if(t)try{let{value:e}=await t.get({key:n});Sf[n]=e}catch{Sf[n]=localStorage.getItem(n)}else Sf[n]=localStorage.getItem(n)}function Tf(e){return e in Sf?Sf[e]:localStorage.getItem(e)}function Ef(e,t){Sf[e]=t,localStorage.setItem(e,t);let n=Cf();n&&n.set({key:e,value:t}).catch(()=>{})}function Df(e){delete Sf[e],localStorage.removeItem(e);let t=Cf();t&&t.remove({key:e}).catch(()=>{})}function Of(){return Tf(_f)}function kf(e){Ef(_f,e)}function Af(){Df(_f)}function jf(){return Tf(vf)}function Mf(e){Ef(vf,String(e))}function Nf(){Df(vf)}var Pf=wf([qd,_f,vf,lf,`toto_ai_key`,`toto_ai_key_meta`,`toto_qa_last`,`home_finance_colors_v1`]);async function Ff(e,t){let n=t||`toto-pin-`,r=await crypto.subtle.digest(`SHA-256`,new TextEncoder().encode(n+e));return Array.from(new Uint8Array(r)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}function If(){if(yf||!s.onboarded)return;yf=!0;let e=Of();if(!e){Lf();return}if(e===`adult`){J=null,Kf();return}if(e===`shared`){zf();return}let t=(s.kids?.profiles||[]).find(t=>t.id===e);if(!t){Af(),Lf();return}if(String(jf())===String(t.id)){J={id:t.id,name:t.name,emoji:t.emoji,role:`child`},qf();return}t.pinHash?(xf=t.id,X=``,Y=0,Hf(t)):(J={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Mf(t.id),qf())}function Lf(){let e=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name),t=s.kids?.profiles||[],n=``,r=e.length?e.map(e=>e.name).join(` / `):`Adult`;n+=`<div class="profile-card" onclick="assignDevice('adult')">
    <div class="profile-avatar">👤</div>
    <div style="flex:1">
      <div style="font-size:15px;font-weight:700;color:#1e293b">${g(r)}</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">Adult — opens straight to the full app</div>
    </div>
  </div>`,t.forEach(e=>{n+=`<div class="profile-card" onclick="assignDevice('${e.id}')">
      <div class="profile-avatar">${g(e.emoji||`😊`)}</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${g(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">Kid's device — ${e.pinHash?`requires PIN to open`:`no PIN set yet`}</div>
      </div>
    </div>`}),t.length||(n+=`<div style="padding:12px 16px;background:#fef9c3;border-radius:10px;font-size:13px;color:#854d0e">No kids set up yet. Add kids in the Kids tab first, then assign a device.</div>`),n+=`<div class="profile-card" onclick="assignDevice('shared')" style="border-style:dashed">
    <div class="profile-avatar">👨‍👩‍👧‍👦</div>
    <div style="flex:1">
      <div style="font-size:15px;font-weight:700;color:#1e293b">Everyone (shared)</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">Shows profile picker every time the app opens</div>
    </div>
  </div>`,document.getElementById(`profile-list`).innerHTML=n,document.getElementById(`profile-overlay-title`).textContent=`Who uses this device?`,document.getElementById(`profile-overlay-sub`).textContent=`Set it once — the app will open straight to the right view. You can change this any time in Settings.`,document.getElementById(`profile-overlay`).classList.remove(`hidden`)}function Rf(e){if(kf(e),yf=!0,document.getElementById(`profile-overlay`).classList.add(`hidden`),e===`adult`)J=null,Kf(),rm();else if(e===`shared`)zf();else{let t=(s.kids?.profiles||[]).find(t=>t.id===e);if(!t){J=null,js(),rm();return}t.pinHash?(xf=t.id,X=``,Y=0,Hf(t)):(J={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Mf(t.id),qf())}}function zf(){document.getElementById(`pin-overlay`).classList.add(`hidden`);let e=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name),t=s.kids?.profiles||[],n=``;e.forEach((e,t)=>{let r=!!e.pinHash;n+=`<div class="profile-card" onclick="_pickAdult(${t})">
      <div class="profile-avatar">🧑</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${g(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">${t===0?`Owner`:`Member`} · ${r?`PIN login`:`Tap to enter`}</div>
      </div>
      <div style="font-size:12px;color:#0891b2;font-weight:600">${r?`PIN →`:`Enter →`}</div>
    </div>`}),t.forEach(e=>{n+=`<div class="profile-card" onclick="_pickKid('${e.id}')">
      <div class="profile-avatar">${g(e.emoji||`😊`)}</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${g(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">Kid · ${e.pinHash?`PIN login`:`Tap to enter`}</div>
      </div>
      <div style="font-size:12px;color:#0891b2;font-weight:600">${e.pinHash?`PIN →`:`Enter →`}</div>
    </div>`}),document.getElementById(`profile-list`).innerHTML=n,document.getElementById(`profile-overlay-title`).textContent=`Who's using Toto?`,document.getElementById(`profile-overlay-sub`).textContent=`Tap your name to continue`,document.getElementById(`profile-overlay`).classList.remove(`hidden`)}function Bf(e){let t=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name)[e??0];if(t?.pinHash){xf=`adult:`+(e??0),X=``,Y=0,bf=0,Hf({emoji:`🧑`,name:t.name,_isAdult:!0,_memberIndex:e??0});return}J=null,Nf(),document.getElementById(`profile-overlay`).classList.add(`hidden`),qf()}function Vf(e){let t=(s.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(t.pinHash?(xf=e,X=``,Y=0,Hf(t)):(J={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Mf(t.id),document.getElementById(`profile-overlay`).classList.add(`hidden`),qf()))}function Hf(e){document.getElementById(`profile-overlay`).classList.add(`hidden`),document.getElementById(`pin-avatar`).textContent=e.emoji||(e._isAdult?`🧑`:`😊`),document.getElementById(`pin-greeting`).textContent=`Hi ${e.name}! 👋`,document.getElementById(`pin-sub`).textContent=`Enter your PIN to continue`,document.getElementById(`pin-error`).textContent=``,Uf(),Wf(),document.getElementById(`pin-overlay`).classList.remove(`hidden`)}function Uf(){let e=document.getElementById(`pin-dots`);e&&(e.innerHTML=[0,1,2,3].map(e=>`<div class="pin-dot ${e<X.length?`filled`:``}">${e<X.length?`●`:``}</div>`).join(``))}function Wf(){let e=document.getElementById(`pin-pad`);if(!e)return;let t=Date.now();if(t<bf){let n=Math.ceil((bf-t)/1e3);document.getElementById(`pin-error`).textContent=`Too many attempts — try again in ${n}s`,e.innerHTML=``,setTimeout(Wf,1e3);return}e.innerHTML=[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<div class="pin-key empty"></div>`:`<div class="pin-key" onclick="_pinKey('${e}')">${e}</div>`).join(``)}function Gf(e){if(!(Date.now()<bf)){if(e===`⌫`){X=X.slice(0,-1),Uf();return}X.length>=4||(X+=e,Uf(),X.length===4&&Hp())}}function Kf(){let e=document.getElementById(`header-switch-profile`);if(!e)return;let t=Of();e.style.display=t&&t!==`adult`?``:`none`}function qf(){Kf(),js(),J?.role===`child`?(window.kidsView=J.id,h(`kids`),Js(J.id)):document.querySelectorAll(`.nav-item, .nav-text-item`).forEach(e=>e.style.display=``),rm()}var Jf=`member`,Yf=null,Xf=null;function Zf(e){Jf=e;let t=document.getElementById(`inv-role-member`),n=document.getElementById(`inv-role-owner`);!t||!n||(e===`member`?(t.style.borderColor=`#0d9488`,t.style.background=`#f0fdfa`,t.style.color=`#0d9488`,n.style.borderColor=`var(--border)`,n.style.background=`var(--surface)`,n.style.color=`var(--text-muted)`):(n.style.borderColor=`#0d9488`,n.style.background=`#f0fdfa`,n.style.color=`#0d9488`,t.style.borderColor=`var(--border)`,t.style.background=`var(--surface)`,t.style.color=`var(--text-muted)`))}function Qf(e,t){let n=document.getElementById(`inv-email`),r=n?n.value.trim():``,i=(s.householdProfile.members||[]).find(e=>e.role===`adult`)?.name||`Someone`,a=new Date(Date.now()+10080*60*1e3).toISOString(),o={id:im(),email:r,role:Jf,inviterName:i,memberName:t||null,memberIdx:e??null,createdAt:new Date().toISOString(),expiresAt:a,status:`pending`};s.householdProfile.invites||(s.householdProfile.invites=[]),s.householdProfile.invites.push(o),q(s),Yf=o.id;let c=np(o.id),l=document.getElementById(`invite-link-wrap`),u=document.getElementById(`invite-form-wrap`),d=document.getElementById(`invite-link-display`);l&&(l.dataset.invEmail=r,l.dataset.invToken=o.id,l.style.display=`block`),u&&(u.style.display=`none`),d&&(d.textContent=c)}function $f(e){let t=(s.householdProfile.members||[])[e];if(!t)return;let n=(s.householdProfile.members||[]).find((e,t)=>e.role===`adult`&&t===0)?.name||`Someone`,r=new Date(Date.now()+10080*60*1e3).toISOString(),i={id:im(),email:``,role:`member`,inviterName:n,memberName:t.name||null,memberIdx:e,createdAt:new Date().toISOString(),expiresAt:r,status:`pending`};s.householdProfile.invites||(s.householdProfile.invites=[]),s.householdProfile.invites.push(i),q(s);let a=np(i.id),o=g(t.name||`this person`),c=document.createElement(`div`);c.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9000;display:flex;align-items:center;justify-content:center;padding:24px`,c.innerHTML=`<div style="background:#fff;border-radius:16px;padding:24px;max-width:400px;width:100%">
    <div style="font-size:18px;font-weight:700;margin-bottom:6px">Invite ${o} 🔗</div>
    <div style="font-size:13px;color:#64748b;margin-bottom:16px">Share this link with ${o}. It expires in 7 days.</div>
    <div style="font-size:12px;word-break:break-all;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-bottom:14px">${a}</div>
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <button onclick="navigator.clipboard.writeText('${a}').then(()=>{this.textContent='✓ Copied!';setTimeout(()=>this.textContent='📋 Copy link',2000)})"
        style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:13px;font-weight:600;cursor:pointer">📋 Copy link</button>
      <button onclick="window.open('mailto:?subject=Join+my+Toto+household&body=Hi!+I\\'ve+invited+you+to+join+my+Toto+household.+Click+here+to+accept:+${encodeURIComponent(a)}','_blank')"
        style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:13px;font-weight:600;cursor:pointer">✉️ Email</button>
    </div>
    <button onclick="this.closest('div[style*=\"position:fixed\"]').remove();renderSettings()"
      style="width:100%;padding:10px;border:none;border-radius:8px;background:#0d9488;color:#fff;font-size:14px;font-weight:700;cursor:pointer">Done</button>
  </div>`,document.body.appendChild(c),c.addEventListener(`click`,e=>{e.target===c&&(c.remove(),zi())})}function ep(e){if(!e)return;let t=(s.kids?.profiles||[]).find(t=>t.name&&t.name.toLowerCase()===e.toLowerCase());if(!t){s.kids||(s.kids={profiles:[],chores:[],prizes:[],completions:[],redemptions:[]});let n=(s.householdProfile.members||[]).find(t=>t.name&&t.name.toLowerCase()===e.toLowerCase()),r=k(s.kids.profiles);t={id:r,name:e,age:n?.age||null,emoji:n?.emoji||`🧒`},s.kids.profiles.push(t),s.meals?.lunchbox?.profiles||(s.meals||(s.meals={}),s.meals.lunchbox||(s.meals.lunchbox={profiles:[]})),s.meals.lunchbox.profiles.push({id:r,name:e,emoji:t.emoji}),q(s)}kp(t.id)}function tp(e){navigator.clipboard.writeText(np(e)).then(()=>{let e=event.target,t=e.textContent;e.textContent=`✓ Copied!`,setTimeout(()=>{e.textContent=t},2e3)})}function np(e){let t=Yd()||``;return window.location.origin+window.location.pathname+`?invite=`+e+`&h=`+t}function rp(){let e=document.getElementById(`invite-link-wrap`)?.dataset.invToken||Yf;e&&navigator.clipboard.writeText(np(e)).then(()=>{let e=event.target,t=e.textContent;e.textContent=`✓ Copied!`,setTimeout(()=>{e.textContent=t},2e3)})}function ip(){let e=document.getElementById(`invite-link-wrap`),t=e?.dataset.invToken||Yf,n=e?.dataset.invEmail||``;if(!t)return;let r=(s.householdProfile.invites||[]).find(e=>e.id===t)?.inviterName||`Your partner`,i=np(t),a=encodeURIComponent(`${r} invited you to join their Toto household`),o=encodeURIComponent(`Hi,\n\n${r} has invited you to join their Toto household — a shared family finance and planning app.\n\nClick the link below to accept the invite (expires in 7 days):\n\n${i}\n\nSee you there!`);window.open(`mailto:${n}?subject=${a}&body=${o}`,`_blank`)}function ap(e){if(!confirm(`Revoke this invite link?`))return;let t=(s.householdProfile.invites||[]).find(t=>t.id===e);t&&(t.status=`revoked`),q(s),zi()}var op=`toto_pending_invite`;function sp(){let e=new URLSearchParams(window.location.search),t=e.get(`invite`),n=e.get(`h`);t&&(sessionStorage.setItem(op,t),n&&sessionStorage.setItem(Jd,n),window.history.replaceState({},``,window.location.pathname+window.location.hash))}function cp(){let e=sessionStorage.getItem(op);if(!e)return;let t=(s.householdProfile.invites||[]).find(t=>t.id===e);if(!t){sessionStorage.removeItem(op);return}if(t.status!==`pending`||new Date(t.expiresAt)<new Date){sessionStorage.removeItem(op),bp(t);return}sessionStorage.removeItem(op),Xf=t,lp(t)}function lp(t){let n=s.householdProfile.members||[],r=n.filter(e=>e.role===`adult`),i=n.filter(e=>e.role===`child`),a=(()=>{let t=new Date,n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`,r=getOrCreateMonthData(n);return(r.income||[]).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)-(r.expenses||[]).filter(e=>!e.skipped).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)})(),o=[...r.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ecfeff,#ccfbf1);display:flex;align-items:center;justify-content:center;font-size:20px">👤</div>
        <div><div style="font-size:14px;font-weight:600">${g(e.name||`Adult`)}</div><div style="font-size:12px;color:#64748b">Adult · Owner</div></div>
      </div>`),...i.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#fef9c3,#fde68a);display:flex;align-items:center;justify-content:center;font-size:20px">${e.emoji||`🧒`}</div>
        <div><div style="font-size:14px;font-weight:600">${g(e.name||`Kid`)}</div><div style="font-size:12px;color:#64748b">Kid · age ${e.age||`?`}</div></div>
      </div>`)].join(``);xp(`
    <div style="text-align:center;font-size:56px;margin-bottom:20px;margin-top:8px">🏡</div>
    <div style="font-size:22px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:6px;line-height:1.3">${g(t.inviterName||`Someone`)} invited you to join their Toto household</div>
    <div style="font-size:14px;color:#64748b;text-align:center;margin-bottom:28px">You'll get shared access to budget, meals, kids &amp; home — everything in one place.</div>

    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:20px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin-bottom:12px">Your household</div>
      ${o}
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0">
        <div style="width:40px;height:40px;border-radius:50%;border:2px dashed #0d9488;display:flex;align-items:center;justify-content:center;font-size:20px;color:#0d9488">+</div>
        <div><div style="font-size:14px;font-weight:600;color:#0d9488">You — joining now</div><div style="font-size:12px;color:#64748b">New member</div></div>
      </div>
    </div>

    ${a===0?``:`
    <div style="display:flex;gap:12px;margin-bottom:20px">
      <div style="flex:1;background:#f0fdf4;border-radius:12px;padding:14px;text-align:center">
        <div style="font-size:20px;font-weight:700;color:#16a34a">$${Math.abs(a).toLocaleString()}</div>
        <div style="font-size:11px;color:#64748b;margin-top:2px">monthly ${a>=0?`surplus`:`deficit`}</div>
      </div>
    </div>`}

    ${t.email?`<div style="font-size:12px;color:#94a3b8;text-align:center;margin-bottom:16px">Invite sent to <strong style="color:#475569">${g(t.email)}</strong> · Expires ${new Date(t.expiresAt).toLocaleDateString()}</div>`:``}

    <button onclick="_acceptInviteAndContinue()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:10px">Accept invite →</button>
    <div style="text-align:center"><a href="#" onclick="event.preventDefault();_dismissInviteFlow()" style="font-size:13px;color:#94a3b8;text-decoration:none">Not you? Ignore this invite</a></div>
  `)}function up(){let t=Xf,n=K?.displayName?.split(` `)[0]||`there`,r=s.householdProfile.members||[],i=r.filter(e=>e.role===`adult`),a=r.filter(e=>e.role===`child`),o=(()=>{let t=new Date,n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`,r=getOrCreateMonthData(n);return(r.income||[]).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)-(r.expenses||[]).filter(e=>!e.skipped).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)})(),c=(s.goals||[]).length,l=[...i.map((e,t)=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ecfeff,#ccfbf1);display:flex;align-items:center;justify-content:center;font-size:20px">👤</div>
        <div>
          <div style="font-size:14px;font-weight:600">${g(e.name||`Adult`)}${t===i.length-1?` — <span style="color:#0d9488">that's you!</span>`:``}</div>
          <div style="font-size:12px;color:#64748b">${t===0?`Owner · set up the household`:`Member · just joined`}</div>
        </div>
      </div>`),...a.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#fef9c3,#fde68a);display:flex;align-items:center;justify-content:center;font-size:20px">${e.emoji||`🧒`}</div>
        <div><div style="font-size:14px;font-weight:600">${g(e.name||`Kid`)}</div><div style="font-size:12px;color:#64748b">Kid · age ${e.age||`?`}</div></div>
      </div>`)].join(``);xp(`
    <div style="text-align:center;font-size:56px;margin-bottom:12px;margin-top:8px">🎉</div>
    <div style="font-size:24px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:6px">You're in, ${g(n)}!</div>
    <div style="font-size:14px;color:#64748b;text-align:center;margin-bottom:24px">Welcome to ${g(t?.inviterName||`the`)}'s Toto household.</div>

    <div style="background:#f0fdfa;border:1px solid #ccfbf1;border-radius:16px;padding:20px;margin-bottom:20px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#0d9488;margin-bottom:10px">Your household</div>
      ${l}
    </div>

    <div style="display:flex;gap:12px;margin-bottom:24px">
      ${o===0?``:`<div style="flex:1;background:#f8fafc;border-radius:12px;padding:14px;text-align:center;border:1px solid #e2e8f0"><div style="font-size:20px;font-weight:700;color:#16a34a">$${Math.abs(o).toLocaleString()}</div><div style="font-size:11px;color:#64748b">monthly ${o>=0?`surplus`:`deficit`}</div></div>`}
      ${c>0?`<div style="flex:1;background:#f8fafc;border-radius:12px;padding:14px;text-align:center;border:1px solid #e2e8f0"><div style="font-size:20px;font-weight:700;color:#0d9488">${c}</div><div style="font-size:11px;color:#64748b">goal${c===1?``:`s`} tracked</div></div>`:``}
    </div>

    <button onclick="_showInviteA4()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer">Take a quick tour →</button>
  `)}var dp=0,fp=[{emoji:`💰`,title:`The Kitty`,desc:`Budget, bills, goals & net worth. See where the money goes each month.`},{emoji:`📅`,title:`Plan`,desc:`Weekly planner, meal plans & the kids' lunchboxes. One place for the week ahead.`},{emoji:`🏠`,title:`Home`,desc:`Documents, vehicles & maintenance reminders. Never miss a rego or warranty renewal.`}];function pp(){dp=0,mp()}function mp(){let e=fp[dp],t=fp.map((e,t)=>`<div style="width:${t===dp?20:8}px;height:8px;border-radius:99px;background:${t===dp?`#0d9488`:`#e2e8f0`};transition:all .2s"></div>`).join(``),n=dp===fp.length-1;xp(`
    <div style="margin-top:12px">
      <div style="text-align:center;font-size:64px;margin-bottom:16px">${e.emoji}</div>
      <div style="font-size:22px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:10px">${e.title}</div>
      <div style="font-size:15px;color:#64748b;text-align:center;margin-bottom:32px;line-height:1.6">${e.desc}</div>
      <div style="display:flex;justify-content:center;gap:6px;margin-bottom:32px">${t}</div>
      <button onclick="${n?`_showInviteIncomePrompt()`:`_inviteTourSlide++;_renderTourSlide()`}"
        style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:10px">
        ${n?`Done →`:`Next →`}
      </button>
      ${n?``:`<button onclick="_showInviteIncomePrompt()" style="width:100%;background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:8px">Skip tour</button>`}
    </div>
  `)}function hp(){xp(`
    <div style="text-align:center;margin-top:12px">
      <div style="font-size:56px;margin-bottom:16px">💰</div>
      <div style="font-size:20px;font-weight:800;color:#1e293b;margin-bottom:8px">One last thing</div>
      <div style="font-size:14px;color:#64748b;margin-bottom:24px;line-height:1.6">Want to add your income so the budget is complete? This is the one thing only you can fill in.</div>

      <div id="invite-income-form" style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:20px;text-align:left">
        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:12px">Your income source</div>
        <input id="inv-inc-name" type="text" placeholder="e.g. My salary" class="form-input" style="width:100%;margin-bottom:10px">
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="inv-inc-amount" type="number" placeholder="Amount $" class="form-input" style="flex:1">
          <select id="inv-inc-freq" class="form-select" style="flex:1">
            <option>Monthly</option>
            <option>Fortnightly</option>
            <option>Weekly</option>
            <option>Annual</option>
          </select>
        </div>
        <button onclick="_saveInviteIncome()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:10px;padding:11px;font-size:14px;font-weight:700;cursor:pointer">Add income &amp; go to dashboard →</button>
      </div>

      <button onclick="_finishInviteJourney()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px">Skip — I'll add it later</button>
    </div>
  `)}function gp(){let e=document.getElementById(`inv-inc-name`)?.value.trim()||``,t=parseFloat(document.getElementById(`inv-inc-amount`)?.value)||0,n=document.getElementById(`inv-inc-freq`)?.value||`Monthly`;(e||t)&&(s.budget.income||(s.budget.income=[]),s.budget.income.push({id:k(s.budget.income),name:e,amount:t,frequency:n}),q(s)),yp()}function _p(){let e=Xf;if(!K){sessionStorage.setItem(`toto_post_invite_action`,e?.id||``),nf();return}vp(e),up()}function vp(e){if(!e)return;e.status=`accepted`;let t=K,n=Yd();n&&Zd(n),s.householdProfile.authorizedUsers||(s.householdProfile.authorizedUsers=[]),s.householdProfile.authorizedUsers.some(e=>e.uid===t.uid)||s.householdProfile.authorizedUsers.push({uid:t.uid,name:t.displayName||``,email:t.email||``,role:e.role||`member`,joinedAt:new Date().toISOString()});let r=s.householdProfile.members||[],i=(t.displayName||``).split(` `)[0];i&&!r.some(e=>e.name===i)&&s.householdProfile.members.push({role:`adult`,name:i,age:null}),q(s)}function yp(){Xf=null,Sp(),rm(),If()}function bp(e){xp(`
    <div style="text-align:center;margin-top:40px">
      <div style="font-size:56px;margin-bottom:16px">⏰</div>
      <div style="font-size:20px;font-weight:800;color:#1e293b;margin-bottom:8px">This invite has expired</div>
      <div style="font-size:14px;color:#64748b;margin-bottom:24px">The 7-day window has passed. Ask ${g(e?.inviterName||`the household owner`)} to send a new invite link.</div>
      <button onclick="_dismissInviteFlow()" style="background:#0d9488;color:#fff;border:none;border-radius:12px;padding:12px 28px;font-size:14px;font-weight:700;cursor:pointer">OK</button>
    </div>
  `)}function xp(e){document.getElementById(`invite-flow-content`).innerHTML=e;let t=document.getElementById(`invite-flow-overlay`);t.classList.remove(`hidden`),t.style.display=`flex`,t.scrollTop=0}function Sp(){let e=document.getElementById(`invite-flow-overlay`);e.classList.add(`hidden`),e.style.display=``}var Cp=`toto_pin_hard_`,wp=`toto_pin_att_`,Tp=null,Z=`gate`,Ep=``,Q=``,Dp=0,Op=null;function kp(e){let t=(s.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(Tp=e,Q=``,Ep=``,Z=t.pinHash?`enter`:`gate`,jp(),document.getElementById(`pin-setup-overlay`).classList.remove(`hidden`))}function Ap(){Op&&(clearInterval(Op),Op=null),document.getElementById(`pin-setup-overlay`).classList.add(`hidden`),Tp=null}function jp(){let e=(s.kids?.profiles||[]).find(e=>String(e.id)===String(Tp));if(!e)return;let t=document.getElementById(`pso-screen`);if(!t)return;let n=e.emoji||`🧒`,r=g(e.name),i={gate:`#f8fafc`,hello:`linear-gradient(160deg,#f0fdfa,#ecfeff)`,enter:`#f8fafc`,confirm:`#f8fafc`,tour:`#f8fafc`};if(document.getElementById(`pin-setup-overlay`).style.background=i[Z]||`#f8fafc`,Z===`gate`)t.innerHTML=`
      <div style="font-size:56px;margin-bottom:16px">${n}</div>
      <div style="font-size:20px;font-weight:800;color:#1e293b;margin-bottom:8px">Setting up ${r}'s account</div>
      <div style="font-size:14px;color:#64748b;margin-bottom:8px;line-height:1.6">A parent needs to approve this first.</div>
      <div style="font-size:13px;color:#94a3b8;margin-bottom:28px">Hold the button below to confirm you're a parent.</div>

      <div style="position:relative;margin-bottom:20px">
        <button id="pso-hold-btn"
          onmousedown="_psoHoldStart()" ontouchstart="_psoHoldStart()"
          onmouseup="_psoHoldEnd()"    ontouchend="_psoHoldEnd()"
          onmouseleave="_psoHoldEnd()"
          style="width:100%;padding:16px;border:2px solid #0d9488;border-radius:12px;background:#f0fdfa;font-size:15px;font-weight:700;color:#0d9488;cursor:pointer;position:relative;overflow:hidden;user-select:none;-webkit-user-select:none">
          <div id="pso-hold-fill" style="position:absolute;inset:0;background:#0d9488;opacity:.12;transform:scaleX(0);transform-origin:left;transition:none;pointer-events:none"></div>
          <span>Hold to approve as parent</span>
        </button>
      </div>
      <button onclick="closePinSetupOverlay()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`;else if(Z===`hello`)t.innerHTML=`
      <div style="font-size:72px;margin-bottom:16px;animation:pso-bounce .6s ease">${n}</div>
      <div style="font-size:26px;font-weight:800;color:#0f172a;margin-bottom:8px">Hi ${r}! 👋</div>
      <div style="font-size:15px;color:#64748b;margin-bottom:28px">Welcome to your Toto.<br>Let's get you set up!</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:28px;text-align:left">
        <div style="display:flex;align-items:center;gap:12px;background:#fff;border-radius:12px;padding:14px;border:1px solid #e2e8f0">
          <span style="font-size:22px">📋</span>
          <span style="font-size:14px;font-weight:600;color:#374151">Your chores &amp; how to earn coins</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;background:#fff;border-radius:12px;padding:14px;border:1px solid #e2e8f0">
          <span style="font-size:22px">🏆</span>
          <span style="font-size:14px;font-weight:600;color:#374151">Prizes you can win</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;background:#fff;border-radius:12px;padding:14px;border:1px solid #e2e8f0">
          <span style="font-size:22px">🍱</span>
          <span style="font-size:14px;font-weight:600;color:#374151">Your lunchbox this week</span>
        </div>
      </div>
      <button onclick="_psoStep='enter';_psoRender()"
        style="width:100%;padding:15px;background:#0d9488;color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer">
        Let's go! →
      </button>`;else if(Z===`enter`||Z===`confirm`){let n=Z===`enter`,i=n?e.pinHash?`Change ${r}'s PIN`:`Choose your secret code 🔢`:`Type it again ✅`,a=n?`Pick 4 numbers only you know!`:`Just to make sure!`,o=[0,1,2,3].map(e=>{let t=e<Q.length;return`<div style="width:52px;height:60px;border:2px solid ${t?`#0d9488`:`#e2e8f0`};border-radius:10px;background:${t?`#f0fdfa`:`#f8fafc`};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#0d9488">${t?`●`:``}</div>`}).join(``),s=[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<div></div>`:`<div onclick="_psoKey('${e}')" style="height:52px;border:1.5px solid #e2e8f0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;color:#374151;cursor:pointer;background:#fff;-webkit-tap-highlight-color:transparent;user-select:none">${e}</div>`).join(``);t.innerHTML=`
      <div style="font-size:40px;margin-bottom:12px">${n?`🔢`:`✅`}</div>
      <div style="font-size:18px;font-weight:700;color:#1e293b;margin-bottom:6px">${i}</div>
      <div style="font-size:13px;color:#64748b;margin-bottom:20px">${a}</div>
      <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px">${o}</div>
      <div id="pso-error" style="font-size:13px;color:#ef4444;min-height:18px;margin-bottom:12px"></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:220px;margin:0 auto 20px">${s}</div>
      <button onclick="closePinSetupOverlay()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`}else if(Z===`tour`){let e=[{bg:`linear-gradient(160deg,#fef9c3,#fde68a)`,emoji:`⭐`,titleCol:`#92400e`,title:`Earn coins!`,body:`Do your chores to collect coins.<br>Save up for prizes!`,bodyCol:`#78350f`},{bg:`linear-gradient(160deg,#ede9fe,#ddd6fe)`,emoji:`🏆`,titleCol:`#5b21b6`,title:`Prize store`,body:`See what you can win and how<br>many coins you need.`,bodyCol:`#4c1d95`},{bg:`linear-gradient(160deg,#ecfeff,#cffafe)`,emoji:`🍱`,titleCol:`#0e7490`,title:`Lunchbox`,body:`See what's in your lunchbox<br>each day this week.`,bodyCol:`#155e75`}],n=e[Dp],r=Dp===e.length-1,i=e.map((e,t)=>`<div style="width:${t===Dp?20:8}px;height:8px;border-radius:99px;background:${t===Dp?`#0d9488`:`#e2e8f0`};transition:all .2s"></div>`).join(``);document.getElementById(`pin-setup-overlay`).style.background=n.bg,t.innerHTML=`
      <div style="font-size:72px;margin-bottom:16px">${n.emoji}</div>
      <div style="font-size:22px;font-weight:800;color:${n.titleCol};margin-bottom:10px">${n.title}</div>
      <div style="font-size:15px;color:${n.bodyCol};margin-bottom:32px;line-height:1.6">${n.body}</div>
      <div style="display:flex;justify-content:center;gap:6px;margin-bottom:28px">${i}</div>
      <button onclick="${r?`_psoTourDone()`:`_psoTourSlide++;_psoRender()`}"
        style="width:100%;padding:15px;background:#0d9488;color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin-bottom:10px">
        ${r?`Done! →`:`Next →`}
      </button>
      ${r?``:`<button onclick="_psoTourDone()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Skip</button>`}`}}function Mp(){if(Op)return;let e=0,t=document.getElementById(`pso-hold-fill`);t&&(t.style.transition=`none`,t.style.transform=`scaleX(0)`),Op=setInterval(()=>{e+=50;let n=Math.min(e/2e3,1);t&&(t.style.transition=`none`,t.style.transform=`scaleX(${n})`),e>=2e3&&(clearInterval(Op),Op=null,Z=`hello`,jp())},50)}function Np(){Op&&(clearInterval(Op),Op=null);let e=document.getElementById(`pso-hold-fill`);e&&(e.style.transition=`transform .3s`,e.style.transform=`scaleX(0)`)}function Pp(e){if(e===`⌫`){Q=Q.slice(0,-1),jp();return}Q.length>=4||(Q+=e,jp(),Q.length===4&&Fp())}async function Fp(){if(Z===`enter`)Ep=Q,Q=``,Z=`confirm`,jp();else if(Z===`confirm`){if(Q!==Ep){Q=``,Ep=``,Z=`enter`,jp();let e=document.getElementById(`pso-error`);e&&(e.textContent=`Those didn't match — try again 🙈`);return}await Ns(Tp,Q);let e=(s.kids?.profiles||[]).find(e=>String(e.id)===String(Tp));e&&!e._pinWasSet?(Dp=0,Z=`tour`,jp()):(Ap(),W(),zi()),e._pinWasSet=!0}}function Ip(){let e=(s.kids?.profiles||[]).find(e=>String(e.id)===String(Tp));Ap(),e&&Js(e.id)}function Lp(e){return parseInt(Tf(wp+e)||`0`)}function Rp(e){let t=Lp(e)+1;return Ef(wp+e,String(t)),t}function zp(e){Df(wp+e),Df(Cp+e)}function Bp(e){return Tf(Cp+e)===`1`}function Vp(e){Ef(Cp+e,`1`)}async function Hp(){let e=await Ff(X,Yd());if(typeof xf==`string`&&xf.startsWith(`adult:`)){let t=parseInt(xf.split(`:`)[1]),n=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name)[t];if(!n)return;e===n.pinHash?(Y=0,J=null,Nf(),document.getElementById(`pin-overlay`).classList.add(`hidden`),qf()):(Y++,X=``,Uf(),Y>=3?(bf=Date.now()+3e4,Y=0,Wf()):document.getElementById(`pin-error`).textContent=`Wrong PIN — ${3-Y} tr${3-Y==1?`y`:`ies`} left`);return}let t=(s.kids?.profiles||[]).find(e=>e.id===xf);if(t){if(Bp(t.id)){document.getElementById(`pin-error`).textContent=`PIN locked — ask mum or dad to reset it 🔒`,document.getElementById(`pin-pad`).innerHTML=``,Up(t);return}if(e===t.pinHash)zp(t.id),Y=0,J={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Mf(t.id),document.getElementById(`pin-overlay`).classList.add(`hidden`),qf();else if(X=``,Uf(),Y++,Rp(t.id)>=10)Vp(t.id),bf=0,document.getElementById(`pin-error`).textContent=`PIN locked — ask mum or dad to reset it 🔒`,document.getElementById(`pin-pad`).innerHTML=``,Up(t);else if(Y>=3)bf=Date.now()+3e4,Y=0,Wf();else{let e=3-Y;document.getElementById(`pin-error`).textContent=`Wrong PIN — ${e} try${e===1?``:`s`} left`}}}function Up(e){s.notifications||(s.notifications=[]),s.notifications.some(t=>t.type===`pin-lock`&&t.kidId===e.id)||(s.notifications.unshift({id:im(),type:`pin-lock`,kidId:e.id,msg:`${e.name}'s PIN has been locked after too many failed attempts. Reset it in Settings → Household.`,ts:new Date().toISOString(),read:!1}),q(s))}function Wp(e){zp(e),Y=0,bf=0,zi()}function Gp(e){return s.budget.months&&s.budget.months[e]||{income:s.budget.income,expenses:s.budget.expenses}}function Kp(e){return!!(s.budget.months&&s.budget.months[e])}function qp(e){return s.budget.months||(s.budget.months={}),s.budget.months[e]||(s.budget.months[e]={income:JSON.parse(JSON.stringify(s.budget.income)),expenses:JSON.parse(JSON.stringify(s.budget.expenses))}),s.budget.months[e]}function Jp(e){let[t,n]=e.split(`-`).map(Number),r=new Date(t,n-2,1);return`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,`0`)}`}function Yp(e){let t=Jp(e),n=Gp(t);s.budget.months||(s.budget.months={}),s.budget.months[e]={income:JSON.parse(JSON.stringify(n.income.filter(e=>e.recurring!==!1))),expenses:JSON.parse(JSON.stringify(n.expenses.filter(e=>e.recurring!==!1)))},tf(`Auto-filled`,`${dm(e)} copied from ${dm(t)}`),q(s),em(To),em(vi)}var Xp=null;Object.defineProperty(window,`_scopePending`,{get(){return Xp},set(e){Xp=e},configurable:!0});function Zp(e,t){Xp={onThisMonth:e,onAllMonths:t};let n=dm($);document.getElementById(`modal-title`).textContent=`Apply changes`,document.getElementById(`modal-body`).innerHTML=`
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Apply this change to <strong style="color:var(--text)">${n}</strong> only,
      or update the default for all months?
    </p>
    ${Kp($)?`<p style="font-size:12px;color:var(--primary);margin-top:10px;margin-bottom:0">
      <em>${n}</em> already has its own custom budget.</p>`:``}
  `,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="doScopeAll()">Apply to all months</button>
    <button class="btn btn-primary" onclick="doScopeMonth()">Apply to ${n}</button>
  `,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Qp(){Xp&&(Xp.onThisMonth(),Xp=null),Oo()}function $p(){Xp&&(Xp.onAllMonths(),Xp=null),Oo()}function em(e){try{e()}catch(t){let n=t?.message||String(t),r=t?.stack||``;console.error(`Render error in `+(e.name||`?`)+`: `+n+`
`+r),typeof Sentry<`u`&&Sentry.withScope(n=>{n.setTag(`renderer`,e.name||`anonymous`),Sentry.captureException(t)})}}var tm={today:[()=>Oi()],money:[()=>vi()],dashboard:[()=>Ri()],budget:[()=>To()],bills:[()=>gt()],networth:[()=>Ie()],goals:[()=>Yi()],scenarios:[()=>oa()],insights:[()=>Ka()],build:[()=>Gi()],settings:[()=>zi()],kids:[()=>W()],planner:[()=>F()],forecast:[()=>Bt()],meals:[()=>Tr()],lunchbox:[()=>Fc()],pantry:[()=>De()],vehicles:[()=>ne()],documents:[()=>de()],maintenance:[()=>ye()],routines:[()=>U()],lists:[()=>ei()]},nm=!1;function rm(){js(),em(Oi);let e=tm[f()];e&&e.forEach(e=>em(e)),nm||(nm=!0,window.Capacitor?.Plugins?.SplashScreen?.hide().catch(()=>{}))}a(rm),u(rm);function im(){return Date.now().toString(36)+Math.random().toString(36).slice(2)}o(gf()),sp(),setTimeout(()=>{try{rl()}catch{}},0);var $=new Date().toISOString().slice(0,7),am=`grouped`;Object.defineProperty(window,`budgetViewMode`,{get(){return am},set(e){am=e},configurable:!0}),Object.defineProperty(window,`selectedBudgetMonth`,{get(){return $},set(e){$=e},configurable:!0});var om=`all`;Object.defineProperty(window,`_billsSubsFilter`,{get(){return om},set(e){om=e},configurable:!0});var sm=new Date().getFullYear();Object.defineProperty(window,`dpViewYear`,{get(){return sm},set(e){sm=e},configurable:!0});var cm=new Date().getMonth()+1;Object.defineProperty(window,`dpViewMonth`,{get(){return cm},set(e){cm=e},configurable:!0});function lm(){let[e,t]=$.split(`-`).map(Number),n=new Date(e,t-2,1);$=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,To()}function um(){let[e,t]=$.split(`-`).map(Number),n=new Date(e,t,1);if($=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,s.settings&&s.settings.autoFillMonths&&!Kp($)){Yp($);return}To()}function dm(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}function fm(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`short`,year:`2-digit`})}function pm(){let e=[],t=new Date;for(let n=5;n>=0;n--){let r=new Date(t.getFullYear(),t.getMonth()-n,1);e.push(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,`0`)}`)}return e}function mm(e,t){let n=(s.budget.actuals[t]||{})[e];return n?typeof n==`number`?[{id:1,amount:n,date:``,note:``}]:Array.isArray(n)?n:[]:[]}function hm(e,t){return mm(e,t).reduce((e,t)=>e+(t.amount||0),0)}function gm(e,t,n){s.budget.actuals[t]||(s.budget.actuals[t]={});let r=mm(e,t);r.length===1&&!r[0].date&&!r[0].note?s.budget.actuals[t][e]=[{...r[0],amount:n}]:s.budget.actuals[t][e]=[{id:1,amount:n,date:``,note:``}],q(s)}function _m(e){let t=Gp($).expenses.find(t=>t.id===e);if(!t)return;let n=D(t);function r(){let t=mm(e,$),r=t.reduce((e,t)=>e+(t.amount||0),0),i=n>0?Math.round(r/n*100):0,a=i>=100?`var(--danger)`:i>=80?`var(--warning)`:`var(--success)`;return`
      <div style="background:var(--surface2);border-radius:8px;padding:12px 14px;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
          <span style="font-size:13px;color:var(--text-muted)">Budgeted this month</span>
          <span style="font-weight:700;font-size:15px">${b(n)}</span>
        </div>
        <div style="background:var(--border);border-radius:99px;height:8px;overflow:hidden;margin-bottom:6px">
          <div style="height:100%;width:${Math.min(100,i)}%;background:${a};border-radius:99px"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:12px">
          <span style="font-weight:600;color:${a}">${b(r)} spent · ${i}%</span>
          <span style="color:${i>=100?`var(--danger)`:`var(--text-muted)`}">${i>=100?`Over by `+b(r-n):b(n-r)+` remaining`}</span>
        </div>
      </div>
      ${t.length>0?`
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:8px">Entries</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${t.map((t,n)=>`
          <div style="display:flex;align-items:center;gap:10px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:8px 12px">
            <div style="flex:1">
              <span style="font-weight:600;font-size:13px">${b(t.amount)}</span>
              ${t.date?`<span style="font-size:12px;color:var(--text-muted);margin-left:8px">${C(t.date)}</span>`:``}
              ${t.note?`<span style="font-size:12px;color:var(--text-muted);margin-left:8px">— ${g(t.note)}</span>`:``}
            </div>
            <button onclick="removeActualEntry(${e},${n})" style="background:none;border:none;cursor:pointer;color:var(--danger);font-size:16px;line-height:1;padding:0 2px">&times;</button>
          </div>`).join(``)}
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 12px 0;font-size:13px;font-weight:700;border-top:1px solid var(--border);margin-top:8px">
          <span>Total</span><span>${b(r)}</span>
        </div>
      </div>`:`<p style="font-size:13px;color:var(--text-muted);margin-bottom:14px">No entries yet for ${dm($)}.</p>`}
      <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:8px">Add Entry</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
        <div style="flex:0 0 110px">
          <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:3px">Amount</label>
          <input type="number" max="99999999" id="ae-amount" class="form-input" placeholder="0.00" min="0" step="0.01" style="width:100%">
        </div>
        <div style="flex:0 0 140px">
          <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:3px">Date (optional)</label>
          <input type="date" id="ae-date" class="form-input" style="width:100%">
        </div>
        <div style="flex:1;min-width:120px">
          <label style="font-size:11px;color:var(--text-muted);display:block;margin-bottom:3px">Note (optional)</label>
          <input type="text" maxlength="200" id="ae-note" class="form-input" placeholder="e.g. Week 1 fill-up" style="width:100%">
        </div>
        <button class="btn btn-primary btn-sm" onclick="addActualEntry(${e})" style="flex-shrink:0;height:38px">Add</button>
      </div>
    `}document.getElementById(`modal-title`).textContent=`Actuals — ${t.name}`,document.getElementById(`modal-body`).innerHTML=`<div id="actual-editor-body">${r()}</div>`,document.getElementById(`modal-footer`).innerHTML=`<button class="btn btn-primary" onclick="closeModal();renderBudget()">Done</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function vm(e){let t=parseFloat(document.getElementById(`ae-amount`).value);if(!t||t<=0)return;let n=document.getElementById(`ae-date`).value||``,r=document.getElementById(`ae-note`).value.trim();s.budget.actuals[$]||(s.budget.actuals[$]={});let i=mm(e,$);i.push({id:i.length?Math.max(...i.map(e=>e.id))+1:1,amount:t,date:n,note:r}),s.budget.actuals[$][e]=i,q(s),window._actualEditorRefresh&&window._actualEditorRefresh()}function ym(e,t){if(!s.budget.actuals[$])return;let n=mm(e,$);n.splice(t,1),s.budget.actuals[$][e]=n,q(s),window._actualEditorRefresh&&window._actualEditorRefresh()}function bm(e){_m(e)}function xm(){let e=Gp($),t=O(e.income),n=O(e.expenses),r=t-n,i=t>0?r/t:null,a;a=t===0?10:i>=.2?20:i>=0?Math.round(i/.2*20):0;let o=pm().slice(3),c=0,l=0;o.forEach(e=>{let t=Gp(e);t.expenses.some(t=>mm(t.id,e).length>0)&&(c++,t.expenses.reduce((t,n)=>t+hm(n.id,e),0)<=O(t.expenses)&&l++)});let u=c===0?5:Math.round(c/3*10+l/c*10),d=(s.netWorth.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),f=(s.netWorth.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),p=d-f,m;if(d===0&&f===0)m=10;else if(p<=0)m=3;else{let e=f>0?f/d:0;m=e<.3?20:e<.6?15:e<.8?10:6}let h;if(n===0)h=10;else{let e=d/n;h=e>=6?20:e>=3?15:e>=1?8:d===0?5:3}let g=(s.goals||[]).filter(e=>e.status!==`achieved`),_;if(g.length===0)_=8;else{let e=g.reduce((e,t)=>e+Math.min((t.saved||0)/(t.target||1),1),0)/g.length;_=10+Math.round(e*10)}let v=a+u+m+h+_,y=v>=85?`A`:v>=70?`B`:v>=55?`C`:v>=40?`D`:`F`,x=v>=80?`#10b981`:v>=60?`#f59e0b`:v>=40?`#f97316`:`#ef4444`,S=[...[{score:a,tip:`Boost your savings rate — aim for 20%+ of income (currently ${t>0?Math.round((i||0)*100):0}%)`},{score:u,tip:`Log actuals monthly in the Budget tab to stay on track`},{score:m,tip:`Reduce liabilities or grow assets to strengthen your net worth`},{score:h,tip:`Build an emergency fund of 3–6 months expenses (${b(n*3)}–${b(n*6)})`},{score:_,tip:`Set specific savings goals in the Goals tab to stay focused`}]].sort((e,t)=>e.score-t.score)[0];return{total:v,grade:y,color:x,insight:S.score<12?S.tip:`Great shape — stay consistent and keep building your financial cushion.`,dimensions:[{label:`Savings Rate`,score:a,max:20},{label:`Budget Tracking`,score:u,max:20},{label:`Net Worth`,score:m,max:20},{label:`Emergency Buffer`,score:h,max:20},{label:`Goals`,score:_,max:20}]}}var Sm={Wallet:`#059669`,Plan:`#0891b2`,Home:`#7c3aed`};function Cm(e){return e?`<span style="font-size:10px;font-weight:700;color:${Sm[e]||`#71717a`};margin-right:6px">${e}</span>`:``}function wm(e){let t={red:`#ef4444`,amber:`#f59e0b`,green:`#10b981`,blue:`#0891b2`}[e.cls]||`#a1a1aa`,n=e.onclick?e.onclick:e.tab?`activateTab('${e.tab}')`:``;return`<div class="notif-tl-item">
    <div class="notif-tl-dot" style="background:${t}"></div>
    <div class="notif-tl-body"><div class="notif-tl-title">${Cm(e.section)}${e.title}</div>${e.sub?`<div class="notif-tl-sub">${e.sub}</div>`:``}</div>
    <div class="notif-tl-action" onclick="${n}">${e.action.replace(` →`,``)}</div>
  </div>`}function Tm(e){let t=[];return e===`budget`&&Gp($).expenses.forEach(e=>{let n=D(e),r=hm(e.id,$);n>0&&r/n>=.8&&r<n?t.push({cls:`amber`,text:`${g(e.name)} at ${Math.round(r/n*100)}% — ${b(n-r)} left`,tab:null}):n>0&&r>=n&&t.push({cls:`red`,text:`${g(e.name)} over budget by ${b(r-n)}`,tab:null})}),t.slice(0,2).map(e=>`<div class="notif-banner ${e.cls}">
      <div class="notif-banner-dot" style="background:${e.cls===`red`?`#ef4444`:`#f59e0b`}"></div>
      <div class="notif-banner-body" style="color:${e.cls===`red`?`#991b1b`:`#92400e`}">${e.text}</div>
    </div>`).join(``)}function Em(){let e=[],t=new Date,r=$,i=(s.householdProfile?.members||[]).filter(e=>e.role===`adult`),a=s.kids?.profiles||[],o=a.length>0,c=Math.max(1,i.length)+a.length,l=Gp(r),u=l.income.length>0,d=l.expenses.length>0,f=l.expenses.some(e=>mm(e.id,r).length>0),p=(u?30:0)+(d?30:0)+(f?40:0);e.push({key:`budget`,label:`Budget`,score:p,tip:u?d?f?`On track`:`Log actual spending this month`:`Add your expenses`:`Add your income sources`,tab:`budget`});let m=Cr(0),h=s.meals?.plan?.[m]||{},g=0,_=c===1?7:c<=3?14:21;for(let e=0;e<7;e++){let t=h[e]||{};c===1?t.d&&g++:c<=3?(t.l&&g++,t.d&&g++):(t.b&&g++,t.l&&g++,t.d&&g++)}let v=Math.round(g/_*80),y=s.lists?.food?.items||[],b=y.filter(e=>e.state===`active`).length,x=y.filter(e=>e.state===`got_it`).length,S=b>0||x>0,C=v+(S?20:0);e.push({key:`meals`,label:`Meals`,score:Math.min(100,C),tip:g===0?`Plan this week's meals`:g<_?`${g}/${_} meals planned`:S?`Meals sorted`:`Add items to your shopping list`,tab:`meals`});let w=s.maintenance||[],T=w.filter(e=>{let t=ve(e);return t!==null&&t<0}).length,ee=w.length===0?30:Math.max(0,100-T*25),E=s.vehicles||[],te=E.filter(e=>!!(e.regoExpiry&&Math.ceil((new Date(e.regoExpiry)-t)/864e5)<30||e.insurance?.renewalDate&&Math.ceil((new Date(e.insurance.renewalDate)-t)/864e5)<30)).length,D=s.documents||[],O=D.filter(e=>e.expiryDate&&Math.ceil((new Date(e.expiryDate)-t)/864e5)<30).length,k=E.length>0?.3:0,A=.3,ne=1-k-A,re=Math.max(0,Math.min(100,Math.round(ee*ne+(E.length>0?Math.max(0,100-te*30)*k:0)+(D.length>0?Math.max(0,100-O*20):50)*A)));if(e.push({key:`home`,label:`Home`,score:re,tip:T>0?`${T} maintenance overdue`:te>0?`Vehicle rego or insurance expiring`:O>0?`Documents expiring soon`:w.length===0?`Add maintenance items to track`:`Home is sorted`,tab:`maintenance`}),o){let t=s.meals?.lunchbox?.plans||{},n=Cr(0),r=0,i=a.length*20;a.forEach(e=>{let i=(t[n]||{})[e.id]||{};for(let e=0;e<5;e++){let t=i[e]||{};t.main&&r++,t.snack&&r++,t.fruit&&r++,t.drink&&r++}}),typeof H==`function`?H():new Date().toISOString().slice(0,10).replace(/-/g,``);let o=s.kids?.chores||[],c=s.kids?.completions||[],l=c.filter(e=>e.status===`pending`).length,u=c.filter(e=>e.status===`approved`&&e.completedAt?.startsWith(new Date().toISOString().slice(0,10))).length,d=o.length===0?50:Math.max(0,100-l*10+u*5),f=i>0?Math.round(r/i*100):50,p=Math.min(100,Math.round(f*.5+Math.min(100,d)*.5));e.push({key:`family`,label:`Family`,score:p,tip:r===0?`Plan school lunches this week`:l>0?`${l} chore approval${l===1?``:`s`} waiting`:`Family is sorted`,tab:`kids`})}let ie=s.goals||[],j=ie.filter(e=>e.status===`active`),ae=j.length>0?j.reduce((e,t)=>e+Math.min((t.saved||t.currentAmount||0)/(t.target||t.targetAmount||1),1),0)/j.length*100:0,oe=ie.length===0?20:Math.round(30+ae*.7);e.push({key:`goals`,label:`Goals`,score:Math.min(100,oe),tip:ie.length===0?`Set a savings or spending goal`:ae<30?`Make progress on your goals`:`Goals progressing well`,tab:`goals`});let M=typeof ll==`function`?ll():[];if(M.length>0){let t=typeof H==`function`?H():new Date().toISOString().slice(0,10).replace(/-/g,``),n=M.filter(e=>{let n=(e.completions?.[t]||[]).length;return e.steps.length>0&&n===e.steps.length}),r=Math.round(n.length/M.length*100),i=M.reduce((e,t)=>{let n=typeof bl==`function`?bl(t):0;return Math.max(e,n)},0),a=Math.min(40,Math.round(i/10*40)),o=Math.min(100,20+Math.round(r*.4)+a);e.push({key:`habits`,label:`Habits`,score:o,tip:n.length===0?`Complete a routine today`:i<3?`Keep your streak going`:`${i}-day streak — keep it up`,tab:`routines`})}let se=new Date().toISOString().slice(0,10),ce=new Date(Date.now()+7*864e5).toISOString().slice(0,10),le=(s.planner?.events||[]).filter(e=>e.date>=se&&e.date<=ce).length,ue=(s.bills||[]).filter(e=>{let t=n(e);return t!==null&&t<0}).length,de=(s.documents||[]).filter(e=>e.expiryDate&&new Date(e.expiryDate)<t).length,fe=Math.min(100,Math.round((le>0?40:10)+Math.max(0,30-ue*15)+Math.max(0,30-de*15)));return e.push({key:`plan`,label:`Plan`,score:fe,tip:ue>0?`${ue} bill${ue===1?``:`s`} overdue`:de>0?`${de} document${de===1?``:`s`} expired`:le===0?`Add something to your calendar`:`Plan looks good`,tab:`planner`}),{total:Math.round(e.reduce((e,t)=>e+t.score,0)/e.length),dims:e}}function Dm(){let e=Em();new Date().toISOString().slice(0,10);let t=s.settings?.typeADismissedMission||``,n=[...e.dims].sort((e,t)=>e.score-t.score),r=[];return n.forEach(e=>{if(e.key===`budget`&&e.score<70&&(Gp($).income.length?Gp($).expenses.length?r.push({id:`log-actuals`,title:`Log this month's actual spending`,sub:`Import a bank statement or add manually`,tab:`budget`,impact:30}):r.push({id:`add-expenses`,title:`Set up your monthly expenses`,sub:`List your regular costs`,tab:`budget`,impact:35}):r.push({id:`add-income`,title:`Add your income sources`,sub:`Takes about 1 minute`,tab:`budget`,impact:40})),e.key===`meals`&&e.score<70){let e=Cr(0),t=s.meals?.plan?.[e]||{},n=Object.values(t).filter(e=>e.d).length,i=(s.lists?.food?.items||[]).filter(e=>e.state===`active`).length;n<3?r.push({id:`plan-dinners`,title:`Plan this week's dinners`,sub:`Just the evening meals — takes 2 minutes`,tab:`meals`,impact:25}):i===0&&r.push({id:`shopping-list`,title:`Add items to your shopping list`,sub:`Start with essentials you need this week`,tab:`lists`,impact:15})}if(e.key===`home`&&e.score<70){let e=(s.maintenance||[]).filter(e=>{let t=ve(e);return t!==null&&t<0});e.length?r.push({id:`maint-overdue`,title:`Clear overdue: ${g(e[0].name)}`,sub:`Mark it done or reschedule`,tab:`maintenance`,impact:20}):(s.maintenance||[]).length||r.push({id:`setup-maint`,title:`Set up household maintenance`,sub:`Add items like gutters, pest control, smoke alarms`,tab:`maintenance`,impact:20})}if(e.key===`family`&&e.score<70){let e=(s.kids?.completions||[]).filter(e=>e.status===`pending`).length,t=s.kids?.profiles||[];e>0?r.push({id:`approve-chores`,title:`Review ${e} chore approval${e===1?``:`s`}`,sub:`Kids are waiting for your sign-off`,tab:`kids`,impact:20}):t.length>0&&r.push({id:`plan-lunchbox`,title:`Plan school lunches this week`,sub:`AI can do it in one tap`,tab:`lunchbox`,impact:18})}if(e.key===`goals`&&e.score<50&&((s.goals||[]).length||r.push({id:`add-goal`,title:`Set your first savings goal`,sub:`Holiday fund, emergency savings, or debt payoff`,tab:`goals`,impact:15})),e.key===`habits`&&e.score<70&&((typeof ll==`function`?ll():[]).length===0?r.push({id:`create-routine`,title:`Create your first daily routine`,sub:`Morning or evening — takes 2 minutes to set up`,tab:`routines`,impact:25}):r.push({id:`complete-routine`,title:`Complete a routine today`,sub:`Tap each step as you go`,tab:`today`,impact:20})),e.key===`plan`&&e.score<70){let e=new Date().toISOString().slice(0,10),t=new Date(Date.now()+7*864e5).toISOString().slice(0,10);(s.planner?.events||[]).filter(n=>n.date>=e&&n.date<=t).length===0?r.push({id:`add-event`,title:`Add something to your calendar`,sub:`Even one event this week helps keep life organised`,tab:`planner`,impact:15}):r.push({id:`review-bills`,title:`Review upcoming bills`,sub:`Make sure nothing catches you off guard`,tab:`bills`,impact:15})}}),r.filter(e=>e.id!==t).sort((e,t)=>t.impact-e.impact)[0]||null}function Om(e){s.settings||(s.settings={}),s.settings.typeADismissedMission=e,q(s);let t=document.querySelector(`.mission-lightbox`);t&&t.remove(),Oi()}function km(e){s.settings||(s.settings={}),s.settings.typeAMissionId=``,s.settings.typeAMissionShownDate=``,s.settings.typeADismissedMission=e,q(s);let t=document.querySelector(`.mission-lightbox`);t&&t.remove()}function Am(){let e=s.settings?.typeAMissionShownDate;if(!e)return 0;let t=Math.floor((new Date-new Date(e))/864e5);return Math.max(0,t)}function jm(e){if(document.querySelector(`.mission-lightbox`))return;let t=Am(),n=e.onclick?e.onclick:e.tab?`activateTab('${e.tab}')`:``,r=document.createElement(`div`);r.className=`mission-lightbox`,r.innerHTML=`
    <div class="mission-lightbox-card">
      <div class="mission-lightbox-icon">⚡</div>
      <div class="mission-lightbox-title">${e.title}</div>
      <div class="mission-lightbox-sub">${e.sub}</div>
      <div class="mission-lightbox-days">This has been waiting ${t} day${t===1?``:`s`}</div>
      <div class="mission-lightbox-actions">
        <button class="mission-lightbox-btn" style="background:rgba(255,255,255,0.2);color:#fff" onclick="dismissMission('${e.id}')">Skip</button>
        <button class="mission-lightbox-btn" style="background:#fff;color:#0891b2" onclick="completeMission('${e.id}');${n}">Do it now</button>
      </div>
    </div>`,r.addEventListener(`click`,t=>{t.target===r&&Om(e.id)}),document.body.appendChild(r)}function Mm(){if(!s.settings?.typeAMode)return;let e=Dm();if(!e)return;let t=new Date().toISOString().slice(0,10);if(s.settings.typeAMissionId!==e.id){s.settings.typeAMissionId=e.id,s.settings.typeAMissionShownDate=t,q(s);return}Am()>=1&&setTimeout(()=>jm(e),1500)}function Nm(){Em();let e=Gp($),t=e.expenses.reduce((e,t)=>e+hm(t.id,$),0),r=O(e.expenses),i=Cr(1),a=s.meals?.plan?.[i]||{},o=Object.values(a).reduce((e,t)=>e+ +!!t.b+ +!!t.l+ +!!t.d,0),c=(s.maintenance||[]).filter(e=>{let t=ve(e);return t!==null&&t<0}).length,l=(s.bills||[]).filter(e=>{let t=n(e);return t>=0&&t<=7}),u=(s.meals?.pantry||[]).filter(e=>e.status===`need`||e.status===`low`).length,d=document.createElement(`div`);d.className=`reset-overlay`,d.innerHTML=`
    <div class="reset-card">
      <div class="reset-header">
        <h2>Weekly Reset</h2>
        <p>5 minutes to get your week sorted</p>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 1 of 5</div>
        <div class="reset-step-title">Review this month's spending</div>
        <div class="reset-step-sub">${t>0?`You've spent ${b(t)} of ${b(r)} budgeted`:`No actuals logged yet this month`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('budget')">Review budget</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 2 of 5</div>
        <div class="reset-step-title">Plan next week's meals</div>
        <div class="reset-step-sub">${o>0?`${o}/21 meals planned`:`Nothing planned for next week yet`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();_mealWeekOffset=1;activateTab('meals')">Plan meals</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 3 of 5</div>
        <div class="reset-step-title">Check the pantry</div>
        <div class="reset-step-sub">${u>0?`${u} items need restocking`:(s.meals?.pantry||[]).length>0?`Pantry looks good`:`Not set up yet`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('pantry')">Stocktake</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 4 of 5</div>
        <div class="reset-step-title">Upcoming bills</div>
        <div class="reset-step-sub">${l.length>0?`${l.length} bill${l.length===1?``:`s`} due this week — ${b(l.reduce((e,t)=>e+(parseFloat(t.amount)||0),0))}`:`No bills due this week`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('bills')">Review bills</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 5 of 5</div>
        <div class="reset-step-title">Household maintenance</div>
        <div class="reset-step-sub">${c>0?`${c} item${c===1?``:`s`} overdue`:`Everything up to date`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('maintenance')">Check maintenance</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-footer">
        <button class="reset-step-btn" style="background:#0891b2;color:#fff;padding:10px 24px;font-size:14px" onclick="completeWeeklyReset()">Done — I'm reset</button>
      </div>
    </div>`,d.addEventListener(`click`,e=>{e.target===d&&d.remove()}),document.body.appendChild(d)}function Pm(){let e=document.querySelector(`.reset-overlay`);e&&e.remove(),s.settings||(s.settings={});let t=new Date().toISOString().slice(0,10),n=s.settings.typeALastResetDate||``;n&&Math.floor((new Date-new Date(n))/864e5)<=9?s.settings.typeAStreak=(s.settings.typeAStreak||0)+1:s.settings.typeAStreak=1,s.settings.typeALastResetDate=t,q(s),Oi()}function Fm(){let e=Em(),t=2*Math.PI*22,n=(e.total/100*t).toFixed(1),r=e.total>=80?`var(--good,#10b981)`:e.total>=60?`var(--iris-2)`:e.total>=40?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`,i=e.total>=80?`Crushing it — keep going`:e.total>=60?`Good shape — a few things to tidy`:e.total>=40?`Getting there — some gaps to fill`:`Just getting started`;return e.dims.map(e=>{let t=e.score>=75?`var(--good,#10b981)`:e.score>=50?`var(--iris-2)`:e.score>=30?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`,n=e.score>=75?`var(--good,#10b981)`:e.score>=50?`var(--iris-1)`:e.score>=30?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`;return`<div class="life-dim">
      <div class="life-dim-row">
        <span class="life-dim-name">${e.label}</span>
        <span class="life-dim-pct" style="color:${n}">${e.score}%</span>
      </div>
      <div class="life-dim-bar"><div class="life-dim-fill" style="width:${e.score}%;background:${t}"></div></div>
      <div class="life-dim-tip">
        ${e.tip}
        ${e.score<70&&e.tab?`<span style="color:var(--iris-1);font-weight:700;cursor:pointer" onclick="activateTab('${e.tab}')">Fix →</span>`:``}
      </div>
    </div>`}).join(``),`<div class="life-score-card">
    <div class="life-score-header" onclick="_typeADimsExpanded=!_typeADimsExpanded;renderToday()">
      <div class="life-score-ring">
        <svg viewBox="0 0 56 56" width="56" height="56">
          <circle cx="28" cy="28" r="22" fill="none" stroke="var(--hairline)" stroke-width="5"/>
          <circle cx="28" cy="28" r="22" fill="none" stroke="${r}" stroke-width="5"
            stroke-dasharray="${n} ${t}" stroke-linecap="round" transform="rotate(-90 28 28)"/>
        </svg>
        <div class="life-score-num" style="color:${r}">${e.total}</div>
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:16px;font-weight:800;color:var(--ink);letter-spacing:-.01em;font-family:var(--sans)">Life Score</div>
        <div style="font-size:12px;color:var(--ink-soft);margin-top:3px;font-family:var(--sans)">${i}</div>
        ${s.settings?.typeAStreak>1?`<div style="margin-top:5px;display:inline-flex;align-items:center;gap:5px;background:var(--amber-soft,#FFF7ED);border-radius:99px;padding:2px 10px"><span style="font-size:12px">🔥</span><span style="font-family:var(--mono);font-size:11px;font-weight:700;color:var(--ember,#f97316)">${s.settings.typeAStreak} week streak</span></div>`:``}
      </div>
      <span style="font-size:10px;color:var(--muted);flex-shrink:0">▼</span>
    </div>
    
  </div>`}function Im(){let e=Dm();if(!e)return``;let t=Am(),n=e.onclick?`onclick="${e.onclick}"`:e.tab?`onclick="activateTab('${e.tab}')"`:``;return`<div class="mission-card" ${n}>
    <div class="mission-label">${t>0?`Day ${t+1} — still waiting`:`Today's Mission`}</div>
    <div class="mission-title">${e.title}</div>
    <div class="mission-sub">${e.sub}</div>
    <div class="mission-actions">
      <button class="mission-btn" style="background:rgba(255,255,255,0.2);color:#fff" onclick="event.stopPropagation();dismissMission('${e.id}')">Not today</button>
      <button class="mission-btn" style="background:#fff;color:#0891b2" ${n}>Let's do it</button>
    </div>
  </div>`}function Lm(){let e=Gp($),t=s.householdProfile?.members||[],n=t.filter(e=>e.role===`adult`),r=t.filter(e=>e.role===`child`),i=[];if(i.push({id:`members`,label:`Add your household members`,done:n.length>0,tab:null}),i.push({id:`income`,label:`Set up income sources`,done:(e.income||[]).length>0,tab:`budget`}),i.push({id:`expenses`,label:`Add monthly expenses`,done:(e.expenses||[]).length>0,tab:`budget`}),r.length>0&&i.push({id:`kids`,label:`Add kids to your household`,done:!0,tab:null}),n.length>=2){let e=n[1]?.name||`your partner`,t=(s.householdProfile.authorizedUsers||[]).length>0||(s.householdProfile.invites||[]).some(e=>e.status===`accepted`);i.push({id:`invite`,label:`Invite ${e} to your household`,done:t,tab:`settings`,settingsSection:`household-access`})}if(i.push({id:`goals`,label:`Set your first savings goal`,done:(s.goals||[]).length>0,tab:`goals`}),i.push({id:`networth`,label:`Add your net worth (assets & debts)`,done:(s.netWorth?.assets||[]).length>0||(s.netWorth?.liabilities||[]).length>0,tab:`networth`}),i.push({id:`vehicles`,label:`Add your vehicles`,done:(s.vehicles||[]).length>0,tab:`vehicles`}),r.length>0){let e=r[0]?.name||`your child`;i.push({id:`chores`,label:`Set up ${g(e)}'s first chores`,done:(s.kids?.chores||[]).length>0,tab:`kids`})}return i}var Rm=!1;Object.defineProperty(window,`_spExpanded`,{get(){return Rm},set(e){Rm=e},configurable:!0});var zm=!1;Object.defineProperty(window,`_spDoneExpanded`,{get(){return zm},set(e){zm=e},configurable:!0});function Bm(){let e=document.getElementById(`setup-progress-card`);e&&(e.innerHTML=yi())}var Vm=null;Object.defineProperty(window,`expenseSortCol`,{get(){return Vm},set(e){Vm=e},configurable:!0});var Hm=`asc`;Object.defineProperty(window,`expenseSortDir`,{get(){return Hm},set(e){Hm=e},configurable:!0});var Um=`all`;Object.defineProperty(window,`expenseFilterCat`,{get(){return Um},set(e){Um=e},configurable:!0});function Wm(e){Um=e,To()}function Gm(e){Hm=Vm===e&&Hm===`asc`?`desc`:`asc`,Vm=e,To()}function Km(e,t,n=``){let r=Vm===e;return`<th class="sortable${r?` sort-active`:``}" onclick="sortExpenses('${e}')">${t}${n}<span class="sort-icon">${r?Hm===`asc`?`↑`:`↓`:`↕`}</span></th>`}function qm(e){let t=[`th`,`st`,`nd`,`rd`],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}var Jm=`plan`;Object.defineProperty(window,`_mealView`,{get(){return Jm},set(e){Jm=e},configurable:!0}),window._acceptInviteAndContinue=_p,window._addRecurrenceToDate=Zn,window._adultPinKey=Vs,window._adultPinSubmit=Hs,window._applyActiveProfile=qf,window._applyChildNav=js,window._applyMigrations=of,window._autoCreateRecurringEvents=Qn,window._briefIcon=Si,window._briefRow=Di,window._budgetAllocByCategory=xo,window._buildTotoContext=ur,window._capacitorPrefs=Cf,window._categoryIcon=wo,window._checkInviteOnLoad=sp,window._checkMissionEscalation=Mm,window._checkSettingsUnsaved=uo,window._chipClassFor=Ci,window._chipLabelFor=wi,window._copyInviteLinkForMember=tp,window._csOpen=pf,window._csvSetExpense=vs,window._csvToggle=gs,window._csvToggleAll=_s,window._csvUpdateApplyBtn=ys,window._cvAgeBracket=Us,window._cvCalViewToggle=dc,window._cvConfetti=qs,window._cvDismissNotif=_c,window._cvEventsForDate=rc,window._cvFmt12h=ic,window._cvMonthDayTap=hc,window._cvRefreshSchedulePanel=sc,window._cvRender7Day=fc,window._cvRenderCalendar=uc,window._cvRenderMonth=mc,window._cvRenderPrizesTab=Xs,window._cvRoutineAvailLabel=Ks,window._cvRoutineIsActive=Gs,window._cvRoutineSchedCard=lc,window._cvScheduleHtml=cc,window._cvShowDayDetail=gc,window._cvShowPrizeConfirm=vc,window._cvSwitchTab=nc,window._cvTimeGreeting=Ws,window._cvToggleRoutineExpand=ac,window._cvToggleStepFromCal=oc,window._cvUpdatePrizesBadge=Ys,window._cvWeekDayTap=pc,window._devLoadAll=Ac,window._devLoadHome=Oc,window._devLoadKids=Tc,window._devLoadMeals=kc,window._devLoadPlanner=Dc,window._devLoadRoutines=Ec,window._devLoadWallet=wc,window._devReset=jc,window._devToolsClose=Cc,window._devToolsOpen=Sc,window._dismissInviteFlow=Sp,window._docCatMeta=ue,window._ensureKidProfileAndPin=ep,window._ensureNWModals=We,window._estimateMealCalories=Fr,window._fetchAIBriefing=Li,window._finishInviteJourney=yp,window._getHouseholdDocRef=Xd,window._getHouseholdOwnerUID=Yd,window._getInviteUrl=np,window._getNthDayOfMonth=Jn,window._getPinTotalAttempts=Lp,window._handlePendingInvite=cp,window._hashPin=Ff,window._incPinTotalAttempts=Rp,window._inferAisle=yr,window._initAuthListener=cf,window._isPinHardLocked=Bp,window._listsAddFavourite=Zr,window._listsAddItem=Hr,window._listsAddUsual=Qr,window._listsArchive=Xr,window._listsClearTrolley=Yr,window._listsDeleteItem=Wr,window._listsOpenAddForm=Kr,window._listsQuickAdd=Gr,window._listsSaveForm=Jr,window._listsSetState=Ur,window._listsUpdateParsePreview=$r,window._maintDaysUntil=ve,window._maintNextDue=_e,window._markSettingsDirty=so,window._mealGetSuggestions=Nr,window._mealPill=Ar,window._mealPriceSlide=Mr,window._mealToggleFilter=jr,window._mealWeekDates=wr,window._mealWeekKey=Cr,window._missionDaysIgnored=Am,window._nextForecastMonth=zt,window._pantryToAisle=qr,window._parseShopInput=br,window._pickAdult=Bf,window._pickKid=Vf,window._pinKey=Gf,window._plannerCloseDaySheet=nn,window._plannerCloseDetail=un,window._plannerCloseLifeSheet=sn,window._plannerCloseShare=mn,window._plannerCopyShareUrl=gn,window._plannerEditFromDetail=fn,window._plannerEvMemberIds=At,window._plannerEvPrimaryMember=jt,window._plannerEvWhoLabel=Mt,window._plannerEventsForDate=Ft,window._plannerFmt12h=It,window._plannerGoToday=Xt,window._plannerHandleDaySheetClick=rn,window._plannerHandleDetailClick=dn,window._plannerHandleLifeSheetClick=cn,window._plannerHandleShareClick=hn,window._plannerMemberById=kt,window._plannerMembers=Ot,window._plannerNextMonth=Kt,window._plannerNudges=vn,window._plannerOpenDaySheet=en,window._plannerOpenDetail=ln,window._plannerOpenLifeSheet=on,window._plannerOpenModalFromSheet=an,window._plannerOpenShare=pn,window._plannerPrevMonth=Gt,window._plannerRecurrenceLabel=Nt,window._plannerRenderDaySheetList=tn,window._plannerSelectDay=qt,window._plannerSetView=Zt,window._plannerShareVia=_n,window._plannerToggleFilter=$t,window._plannerToggleSection=Qt,window._plannerVisibleEvents=Pt,window._pmDpClear=Vn,window._pmDpNext=Wn,window._pmDpOpen=Ln,window._pmDpOutsideClick=Rn,window._pmDpPrev=Un,window._pmDpRender=zn,window._pmDpSelect=Bn,window._pmDpToday=Hn,window._pmFmtDate=jn,window._pmFmtDateShort=Mn,window._pmHandleCatChange=In,window._pmRenderMemberPicker=Nn,window._pmToggleAllDay=Fn,window._pmToggleMember=Pn,window._prevForecastMonth=Rt,window._psoHoldEnd=Np,window._psoHoldStart=Mp,window._psoKey=Pp,window._psoRender=jp,window._psoSubmit=Fp,window._psoTourDone=Ip,window._pushAllEventsToBudget=qn,window._qaKey=Os,window._qaSelectCat=ks,window._qahAction=ws,window._qahApplyParsed=Es,window._qahSendText=Ts,window._recordInviteAcceptance=vp,window._refreshSetupProgress=Bm,window._renderAdultPinModal=Bs,window._renderApiKeySummary=ho,window._renderContextBanners=Tm,window._renderCsvPreview=ps,window._renderCsvReview=hs,window._renderInviteFlow=xp,window._renderLifeAreas=Ei,window._renderLifeScore=Fm,window._renderListItem=ri,window._renderListsDetail=ni,window._renderListsSelector=ti,window._renderMealPlan=Er,window._renderMissionCard=Im,window._renderNudgeSection=Xn,window._renderPinDots=Uf,window._renderPinPad=Wf,window._renderPlannerAgenda=Jt,window._renderPlannerEventRow=Wt,window._renderPlannerMonthGrid=Ht,window._renderPlannerWeekStrip=Ut,window._renderQAHub=Cs,window._renderQASheet=Ds,window._renderShoppingList=Ir,window._renderTourSlide=mp,window._renderWeekStrip=Ti,window._resetPinAttempts=zp,window._saveInviteIncome=gp,window._sectionTag=Cm,window._secureClear=Df,window._secureGet=Tf,window._securePrewarm=wf,window._secureSet=Ef,window.prefsGet=Tf,window.prefsSet=Ef,window.prefsClear=Df,window._setHouseholdOwner=Zd,window._setInviteRole=Zf,window._setPinHardLock=Vp,window._showInviteA1=lp,window._showInviteA3=up,window._showInviteA4=pp,window._showInviteExpired=bp,window._showInviteIncomePrompt=hp,window._showMissionLightbox=jm,window._showParentLockNotification=Up,window._showPinScreen=Hf,window._showToast=Vr,window._startFirestoreSync=sf,window._syncVehicleBill=j,window._tdCloseSheet=Mi,window._tdOpenHeadsUpSheet=ki,window._tdOpenSheet=ji,window._tdOpenSlippingSheet=Ai,window._tdToggleStep=Ni,window._ticker=Co,window._tlItem=wm,window._todayAllocSegments=xi,window._totoAppendMessage=dr,window._totoInitPanel=or,window._totoRemoveTyping=pr,window._totoSend=lr,window._totoSendSuggestion=sr,window._totoShowTyping=fr,window._updatePillsOverflow=p,window._updateSwitchBtn=Kf,window._verifyPin=Hp,window.activateTab=h,window.addActualEntry=vm,window.addCatToGroup=no,window.addCategory=vo,window.addHouseholdMember=Ta,window.addPet=Oa,window.addShopItem=Lr,window.addSubFromImport=lt,window.adjForm=pa,window.applianceForm=di,window.applianceFromForm=fi,window.applyCsvImport=bs,window.approveSuggestion=Sn,window.assignDevice=Rf,window.aud=b,window.audD=x,window.billCatIcon=pt,window.billDueBadge=mt,window.billMonthlyEquiv=ht,window.billsModal=yt,window.calcFinancialHealth=xm,window.calcLifeScore=Em,window.calcScenario=aa,window.cancelSettingsChanges=lo,window.clearActivityLog=_o,window.clearAdultPin=Is,window.clearCheckedShopItems=Br,window.clearDeviceProfile=Af,window.clearKidPin=Ps,window.clearKidSession=Nf,window.closeBillModal=xt,window.closeModal=Oo,window.closeNWModal=Ke,window.closeNWTargetModal=Ve,window.closePinSetupOverlay=Ap,window.closeQuickAdd=Ss,window.closeSubModal=at,window.closeTotoAssistant=ar,window.completeMission=km,window.completeWeeklyReset=Pm,window.confirmScope=Zp,window.copyInviteLink=rp,window.copyMonthFromPrevious=Yp,window.customSelect=ff,window.cyclePantryStatus=Oe,window.deleteAdjustment=ga,window.deleteAppliance=hi,window.deleteBill=wt,window.deleteCategoryGroup=eo,window.deleteDoc=me,window.deleteExpense=ns,window.deleteExtra=Go,window.deleteFurniture=ui,window.deleteGoal=ta,window.deleteIncome=Xo,window.deleteMaint=Se,window.deleteNWItem=Je,window.deletePantryItem=je,window.deletePlannerEvent=En,window.deleteScenario=fa,window.deleteService=se,window.deleteStage=Po,window.deleteSub=st,window.deleteVariation=zo,window.deleteVehicle=ae,window.detectSpendingPatterns=Ra,window.dismissMission=Om,window.dismissSubResult=ut,window.dismissSuggestion=Cn,window.doScopeAll=$p,window.doScopeMonth=Qp,window.dpClearDate=ls,window.dpDateInput=rs,window.dpNextMonth=ss,window.dpPrevMonth=os,window.dpSelectDate=cs,window.editActual=bm,window.ensureMonthOverride=qp,window.escAttr=_,window.escHtml=g,window.estimateAllEvents=Vt,window.estimatePlannerEvent=Dn,window.expenseCategories=Ki,window.expenseForm=Zo,window.expenseFromForm=Qo,window.exportData=Vi,window.extraForm=Vo,window.extraFromForm=Ho,window.fmtDate=C,window.fmtNW=S,window.freqDisplay=ee,window.freqDisplayItem=E,window.freqLabel=T,window.freqLabelItem=te,window.furnitureForm=oi,window.furnitureFromForm=si,window.generateInvite=Qf,window.generateMission=Dm,window.generateShoppingList=ii,window.generateSmartInsights=Va,window.generateSmartInsightsHTML=qa,window.getAIKey=Fa,window.getActual=hm,window.getActualEntries=mm,window.getBenchmarkStatus=Na,window.getBenchmarks=Ma,window.getCategoryHistoryData=La,window.getDeviceProfile=Of,window.getKidSession=jf,window.getLast6Months=pm,window.getMonthData=Gp,window.getSeasonalNudges=Yn,window.goToPlannerDay=Yt,window.goalForm=Xi,window.goalFromForm=Qi,window.goalProgress=Ji,window.guestMode=rf,window.handleCsvFile=fs,window.handleDeviceRouting=If,window.handleSubCSV=ct,window.importData=Hi,window.incomeCategories=qi,window.incomeForm=Ko,window.incomeFromForm=qo,window.inviteMember=$f,window.isMonthCustomized=Kp,window.isOverdue=w,window.itemMonthly=D,window.loadColors=ya,window.loadData=gf,window.logActivity=tf,window.markBillPaid=Tt,window.markChoreChildView=yc,window.markGoalAchieved=na,window.markMaintDone=Ce,window.monthLabel=dm,window.monthShortLabel=fm,window.monthlyTotal=O,window.nextId=k,window.nextInsightsMonth=Ya,window.nextMoneyMonth=_i,window.nextMonth=um,window.nwItemRow=Le,window.openActualEditor=_m,window.openAddAdjustment=ha,window.openAddAppliance=pi,window.openAddCatToGroup=ro,window.openAddCategoryGroup=Qa,window.openAddExpense=es,window.openAddExtra=Uo,window.openAddFurniture=ci,window.openAddGoal=$i,window.openAddIncome=Jo,window.openAddScenario=ua,window.openAddStage=Mo,window.openAddVariation=Lo,window.openBillModal=bt,window.openCsvImport=us,window.openDatePicker=is,window.openDocForm=fe,window.openEditAppliance=mi,window.openEditContractTotal=ko,window.openEditExpense=ts,window.openEditExtra=Wo,window.openEditFurniture=li,window.openEditGoal=ea,window.openEditIncome=Yo,window.openEditScenario=da,window.openEditStage=No,window.openEditVariation=Ro,window.openEmojiPickerModal=Za,window.openIconPickerForGroup=$a,window.openMaintForm=be,window.openMealEdit=kr,window.openModal=R,window.openNWModal=Ge,window.openNWTargetModal=Be,window.openNavGroupFor=Kd,window.openPantryForm=ke,window.openPinSetup=kp,window.openPlannerModal=An,window.openQuickAdd=xs,window.openServiceForm=oe,window.openSubModal=it,window.openTotoAssistant=ir,window.openVehicleForm=re,window.openWeeklyReset=Nm,window.ordinal=qm,window.pantryToShoppingList=Ne,window.parseBankCSV=ds,window.prevInsightsMonth=Ja,window.prevMoneyMonth=gi,window.prevMonth=lm,window.prevMonthStr=Jp,window.profileAdults=Ca,window.profileChildren=wa,window.quickAddMaint=we,window.quickAddPantry=Me,window.redeemPrizeChildView=bc,window.removeActualEntry=ym,window.removeApiKey=mo,window.removeCatFromGroup=io,window.removeCategory=yo,window.removeHouseholdMember=Ea,window.removePet=ka,window.removeShopItem=zr,window.renderAll=rm,window.renderBenchmarksSection=Ga,window.renderBills=gt,window.renderBudget=To,window.renderBudgetForecast=Kn,window.renderBudgetSuggestions=wn,window.renderBuild=Gi,window.renderCategoryBreakdown=za,window.renderDashboard=Ri,window.renderDocuments=de,window.renderDpCalendar=as,window.renderExpenseGroups=bo,window.renderForecast=Bt,window.renderGoals=Yi,window.renderInsightCards=Wa,window.renderInsights=Ka,window.renderLists=ei,window.renderLunchbox=Fc,window.renderMaintenance=ye,window.renderMeals=Tr,window.renderMoneyDashboard=vi,window.renderNWDebtCard=ze,window.renderNWTargetCard=Re,window.renderNWTrend=Ue,window.renderNetWorth=Ie,window.renderPantry=De,window.renderPlanner=F,window.renderRoutines=U,window.renderScenarios=oa,window.renderSettings=zi,window.renderSetupProgress=yi,window.renderSpendingPatterns=Ba,window.renderSubImportResults=rt,window.renderSubscriptions=vt,window.renderToday=Oi,window.renderVehicles=ne,window.resetAllData=Bi,window.resetKidPinLock=Wp,window.revokeInvite=ap,window.runAIInsights=Ua,window.runCsvCategorise=ms,window.safeRender=em,window.sanitiseState=A,window.saveAIKey=Ia,window.saveApiKey=po,window.saveBill=Ct,window.saveColors=ba,window.saveData=q,window.saveDoc=pe,window.saveMaint=xe,window.saveMealSlot=Pr,window.saveNWItem=qe,window.saveNWSnapshot=Ye,window.saveNWTarget=He,window.savePantryItem=Ae,window.savePlannerEvent=Gn,window.saveQuickAdd=As,window.saveService=M,window.saveSettingsChanges=co,window.saveSub=ot,window.saveVehicle=ie,window.scenarioForm=ca,window.scenarioFromForm=la,window.sendInviteEmail=ip,window.sendTotoMessage=cr,window.setActual=gm,window.setAdultPin=Fs,window.setBillsFilter=_t,window.setBudgetView=Wi,window.setDeviceProfile=kf,window.setExpenseFilter=Wm,window.setKidPin=Ns,window.setKidSession=Mf,window.setupProgressTasks=Lm,window.showChildView=Js,window.showDeviceSetup=Lf,window.showProfileSelector=zf,window.signInWithGoogle=nf,window.signOutUser=af,window.sortExpenses=Gm,window.stageForm=Ao,window.stageFromForm=jo,window.subCatIcon=$e,window.subMonthlyAmount=et,window.suggestEventToBudget=xn,window.switchProfile=Ms,window.switchToKidMode=xc,window.thSort=Km,window.toggleAdjFields=ma,window.toggleBillDayField=St,window.toggleBudgetDetail=Do,window.toggleCustomFreq=$o,window.toggleGoalFields=Zi,window.toggleGroupExpand=Ui,window.toggleInsightSheet=Pi,window.toggleNavGroup=Gd,window.togglePlannerCard=yn,window.togglePlannerEstimate=bn,window.toggleScenario=sa,window.toggleSettingsSection=go,window.toggleShopItem=Rr,window.toggleSidebar=Ud,window.toggleTotoAssistant=rr,window.uid=im,window.unpushEventFromBudget=Tn,window.updateCars=ja,window.updateCategoryGroup=to,window.updateColor=Sa,window.updateMember=Da,window.updatePet=Aa,window.updateSetting=fo,window.upgradeSelects=mf,window.variationForm=Fo,window.variationFromForm=Io,window.LB_ALLERGIES=Pc,window.LB_SLOTS=Nc,window._estimateLbCalories=Vc,window._lbActiveKid=Mc,window._lbWeekOffset=0,window._saveLbSlot=Bc,window.aiPlanLunchbox=Hc,window.deleteLbProfile=Rc,window.lbToShoppingList=Uc,window.openLunchboxEdit=zc,window.openLunchboxProfile=Ic,window.saveLbProfile=Lc,window.HEALTH_GUIDES=$c,window._cleanupGuide=Qc,window._cvReadOnly=tl,window._cvViewCalendar=nl,window._guideCleanup=Kc,window._guideIdx=Gc,window._guideSteps=Wc,window._highlightStep=Yc,window._recurrenceMatchesDate=_recurrenceMatchesDate,window._showGuideStep=Jc,window.endGuide=Zc,window.exitChildView=exitChildView,window.nextGuideStep=Xc,window.startGuide=qc,window.startHealthGuide=el,window.toggleHealthPopover=toggleHealthPopover,window.viewChildToday=viewChildToday,window.ROUTINE_SUGGESTIONS=ol,window.SUGG_PREVIEW=3,window._assignmentCompletedToday=gl,window._assignmentHistory=vl,window._assignmentStreak=_l,window._renderAdultRoutines=kl,window._renderChildRoutines=Ll,window._renderRoutinesTodayCard=El,window._renderSuggestionsSection=Pl,window._routineActiveTab=_routineActiveTab,window._routineAddStep=eu,window._routineAddSuggestion=Il,window._routineAssertScope=Cl,window._routineAvailableSuggestions=Sl,window._routineAwardPoints=Hl,window._routineAwardStepPoints=Vl,window._routineCheckDailyReset=rl,window._routineCompletedToday=yl,window._routineCreate=fu,window._routineCurrentUserId=cl,window._routineDateKey=sl,window._routineDelete=mu,window._routineDeleteChild=Rl,window._routineDeleteStep=iu,window._routineDragEnd=$l,window._routineDragIdx=_routineDragIdx,window._routineDragOver=Zl,window._routineDragStart=Xl,window._routineDrop=Ql,window._routineDuplicateFromJoined=xu,window._routineDuplicateTo=yu,window._routineEdit=ru,window._routineEditStep=au,window._routineEditSuggestion=Fl,window._routineExpandSugg=Nl,window._routineGetAssignment=hl,window._routineHistory=xl,window._routineIntelNudge=Tl,window._routineIsOwner=dl,window._routineJoin=bu,window._routineKids=fl,window._routineLeave=hu,window._routineManageAssignments=ou,window._routineMatchesDate=al,window._routineNextId=pl,window._routineOtherAdults=ml,window._routinePauseMenu=Gl,window._routinePropagateStepAdd=tu,window._routinePropagateStepDelete=nu,window._routineRecurrenceCollect=du,window._routineRecurrenceFormHtml=cu,window._routineRecurrenceSummaryUpdate=uu,window._routineRecurrenceTypeChange=lu,window._routineRemovePause=Kl,window._routineResetToday=Ul,window._routineResetTodayAllKids=Jl,window._routineResetTodayKid=ql,window._routineSaveValidated=wl,window._routineSetTab=Ol,window._routineShareMenu=_u,window._routineShowHistory=Su,window._routineSkipDay=Wl,window._routineStreak=bl,window._routineSuggCollapsed=_routineSuggCollapsed,window._routineSuggExpanded=_routineSuggExpanded,window._routineTodayKey=H,window._routineToggleAssignment=su,window._routineToggleShare=vu,window._routineToggleStep=zl,window._routineToggleStepKid=Bl,window._routineToggleSugg=Ml,window._routineTypeSelect=pu,window._routineUnassign=gu,window._routinesForCurrentUser=ll,window._routinesForHousehold=ul,window.CHILD_EVENT_EMOJIS=Pu,window.CHORE_EMOJIS=Ku,window.KID_EMOJIS=Gu,window.PRIZE_EMOJIS=qu,window._deleteChildEvent=Iu,window._openChildEventModal=Fu,window._renderChildEventsMgmt=Nu,window.addSavings=od,window.approveCompletion=Ru,window.approveRedemption=Vu,window.deleteChore=Uu,window.deleteKid=ed,window.deletePrize=Wu,window.emojiPicker=Ju,window.kidBalance=Eu,window.kidsParentTab=wu,window.kidsView=Cu,window.markChoreDone=Lu,window.openAddKidModal=Zu,window.openChoreModal=td,window.openEditKidModal=Qu,window.openPrizeModal=rd,window.openSavingsModal=ad,window.pickEmoji=Yu,window.pickedEmoji=Xu,window.rejectCompletion=zu,window.rejectRedemption=Hu,window.renderApprovals=ju,window.renderChoreMgmt=ku,window.renderKidView=Mu,window.renderKids=W,window.renderKidsOverview=Ou,window.renderKidsParent=Du,window.renderPrizeMgmt=Au,window.requestRedemption=Bu,window.saveChore=nd,window.saveKid=$u,window.savePrize=id,window.addLink=bd,window.attachBtn=hd,window.deleteReceiptById=pd,window.fileIcon=_d,window.fileSizeStr=gd,window.fundingBadge=md,window.getDB=ld,window.getReceipts=dd,window.installApp=Ed,window.openReceiptsModal=vd,window.refreshReceiptCounts=ud,window.removeReceipt=wd,window.renderReceiptsList=yd,window.saveReceipt=fd,window.uploadFiles=Sd,window.uploadReceiptFiles=xd,window.viewReceipt=Cd,window.OB_EXPENSE_PRESETS=Dd,window.hideOnboarding=jd,window.obBack=zd,window.obFinish=Hd,window.obNext=Rd,window.obPickEmoji=Fd,window.obSetAdults=Md,window.obSetKids=Nd,window.obSkip=Bd,window.obSkipExpenses=Vd,window.obStepPosition=kd,window.obStepSequence=Od,window.obToggleEmojiPicker=Pd,window.obToggleExpenseSkip=Id,window.renderObStep=Ld,window.showOnboarding=Ad;
//# sourceMappingURL=index-C72K-rX9.js.map
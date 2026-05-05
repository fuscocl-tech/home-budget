import"./firebase-DD2PS53O.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t){return t===`daily`?e*365/12:t===`weekly`?e*52/12:t===`fortnightly`?e*26/12:t===`quarterly`?e/3:t===`annually`||t===`annual`?e/12:e}function t(e){let t=new Date;t.setHours(0,0,0,0);let n=e.frequency||`Monthly`;if(n===`Monthly`){let n=parseInt(e.dueDay)||1,r=new Date(t.getFullYear(),t.getMonth(),n);return r<t&&(r=new Date(t.getFullYear(),t.getMonth()+1,n)),r}let r=e.lastPaid?new Date(e.lastPaid):e.startDate?new Date(e.startDate):t;r.setHours(0,0,0,0);let i={Weekly:7,Fortnightly:14,Quarterly:91,Annually:365}[n]||30,a=new Date(r);for(;a<=t;)a=new Date(a.getTime()+i*864e5);return a}function n(e){let n=new Date;n.setHours(0,0,0,0);let r=t(e);return Math.round((r-n)/864e5)}var r={};function i(e){r=e}var a=new Proxy({},{get(e,t){if(t!==`then`)return r[t]},set(e,t,n){return r[t]=n,!0},has(e,t){return t in r},ownKeys(){return Reflect.ownKeys(r)},getOwnPropertyDescriptor(e,t){let n=Object.getOwnPropertyDescriptor(r,t);return n?{...n,configurable:!0}:void 0}}),o={wallet:{navTab:`budget`,label:`Wallet`,tabs:[{tab:`budget`,label:`Budget`},{tab:`bills`,label:`Bills`},{tab:`networth`,label:`Net Worth`},{tab:`goals`,label:`Goals`},{tab:`insights`,label:`Insights`},{tab:`build`,label:`Build`}]},plan:{navTab:`planner`,label:`Plan`,tabs:[{tab:`planner`,label:`Planner`},{tab:`forecast`,label:`Forecast`},{tab:`meals`,label:`Meals`},{tab:`lunchbox`,label:`Lunchbox`},{tab:`pantry`,label:`Pantry`},{tab:`routines`,label:`Routines`},{tab:`lists`,label:`Lists`}]},home:{navTab:`documents`,label:`Home`,tabs:[{tab:`documents`,label:`Documents`},{tab:`vehicles`,label:`Vehicles`},{tab:`maintenance`,label:`Maintenance`},{tab:`kids`,label:`Kids`}]}};function s(e){for(let[t,n]of Object.entries(o))if(n.tabs.some(t=>t.tab===e))return t;return null}function c(){let e=document.querySelector(`.tab-panel.active`);return e?e.id.replace(`tab-`,``):`today`}function l(e){if(!e)return;let t=e.querySelector(`.section-pills`);if(!t)return;let n=t.scrollWidth-t.scrollLeft-t.clientWidth>4,r=t.scrollLeft>4;e.classList.toggle(`has-overflow-right`,n),e.classList.toggle(`has-overflow-left`,r)}function u(e){e===`subscriptions`&&(e=`bills`),e===`scenarios`&&(e=`insights`),e===`money`&&(e=`budget`),e===`dashboard`&&(e=`budget`),document.getElementById(`tab-`+e)||(e=`today`),typeof window._checkSettingsUnsaved==`function`&&c()===`settings`&&e!==`settings`&&window._checkSettingsUnsaved(e),document.querySelectorAll(`.nav-item, .nav-text-item, .bn-item`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.tab-panel`).forEach(e=>e.classList.remove(`active`));let t=document.getElementById(`tab-`+e);t&&t.classList.add(`active`);let n=s(e);if(n){let e=o[n].navTab;document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`))}else document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`));if(document.body.dataset.section=n||e,document.querySelectorAll(`.static-section-header`).forEach(e=>e.classList.remove(`active`)),n){let t=document.getElementById(n+`-section-header`);if(t){t.classList.add(`active`);let r=document.getElementById(n+`-header-date`);r&&(r.textContent=new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`})),t.querySelectorAll(`.section-pill`).forEach(t=>t.classList.toggle(`active`,t.dataset.pill===e)),requestAnimationFrame(()=>t.querySelectorAll(`.section-pills-wrap`).forEach(l))}}}function d(e){e===`subscriptions`&&(e=`bills`),e===`scenarios`&&(e=`insights`),e===`money`&&(e=`budget`),e===`dashboard`&&(e=`budget`),(location.hash.slice(1)||`today`)!==e&&history.pushState({tab:e},``,`#`+e),u(e)}window.addEventListener(`popstate`,e=>{u(e.state?.tab||location.hash.slice(1)||`today`)}),(function(){let e=location.hash.slice(1)||`today`;history.replaceState({tab:e},``,e===`today`?location.pathname+location.search:`#`+e)})();function f(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function p(e){return f(e).replace(/\\/g,`\\\\`)}var m=new Intl.NumberFormat(`en-AU`,{style:`currency`,currency:`AUD`,maximumFractionDigits:0}),h=new Intl.NumberFormat(`en-AU`,{style:`currency`,currency:`AUD`,minimumFractionDigits:2,maximumFractionDigits:2});function g(e){return m.format(e||0)}function _(e){return h.format(e||0)}function v(e){let t=Math.abs(e),n=t>=1e6?(t/1e6).toFixed(2)+`M`:t>=1e3?(t/1e3).toFixed(1)+`k`:t.toFixed(0);return(e<0?`-$`:`$`)+n}function y(e){if(!e)return`—`;let[t,n,r]=e.split(`-`);return`${r}/${n}/${t}`}function b(e){return e?new Date(e)<new Date:!1}function x(e){return{daily:`/day`,weekly:`/wk`,fortnightly:`/fn`,monthly:`/mo`,quarterly:`/qtr`,annually:`/yr`,annual:`/yr`}[e]||`/mo`}function S(e){return{daily:`Daily`,weekly:`Weekly`,fortnightly:`Fortnightly`,monthly:`Monthly`,quarterly:`Quarterly`,annually:`Annually`,annual:`Annually`,custom:`Custom`}[e]||`Monthly`}function C(e){return(e.frequency||`monthly`)===`custom`?`Every ${e.customEvery||1} ${e.customUnit||`weeks`}`:S(e.frequency||`monthly`)}function w(e){return(e.frequency||`monthly`)===`custom`?`/${e.customEvery||1}${e.customUnit===`months`?`mo`:`wk`}`:x(e.frequency||`monthly`)}function T(t){let n=t.frequency||`monthly`;if(n===`custom`){let e=t.customEvery||1;return t.customUnit===`months`?(t.amount||0)/e:(t.amount||0)*52/(e*12)}return e(t.amount||0,n)}function E(e){return e.reduce((e,t)=>e+T(t),0)}function D(e){return e.length?Math.max(...e.map(e=>e.id))+1:1}function ee(e){function t(e){if(!(!e||typeof e!=`object`))for(let n of Object.keys(e))typeof e[n]==`string`&&e[n].length>500?e[n]=e[n].slice(0,500):Array.isArray(e[n])?e[n].forEach(e=>t(e)):typeof e[n]==`object`&&e[n]!==null&&t(e[n])}t(e)}function O(){let e=a.vehicles||[];if(e.length===0){document.getElementById(`vehicles-content`).innerHTML=`
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
  </div>`;e.forEach(e=>{let n=new Date,r=[];if(e.regoExpiry){let t=Math.ceil((new Date(e.regoExpiry)-n)/864e5);t<0?r.push({cls:`red`,text:`Rego expired ${Math.abs(t)}d ago`}):t<=30?r.push({cls:`amber`,text:`Rego expires in ${t}d`}):r.push({cls:`green`,text:`Rego: ${new Date(e.regoExpiry).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}`})}if(e.insurance&&e.insurance.renewalDate){let t=Math.ceil((new Date(e.insurance.renewalDate)-n)/864e5);t<0?r.push({cls:`red`,text:`Insurance expired ${Math.abs(t)}d ago`}):t<=30?r.push({cls:`amber`,text:`Insurance renews in ${t}d`}):r.push({cls:`green`,text:`Insured until ${new Date(e.insurance.renewalDate).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`})}if(e.serviceInterval&&e.odometer&&e.services&&e.services.length>0){let t=e.services.sort((e,t)=>t.odometer-e.odometer)[0],n=e.odometer.reading-t.odometer,i=e.serviceInterval-n;i<=0?r.push({cls:`red`,text:`Service overdue by ${Math.abs(i).toLocaleString()}km`}):i<=2e3?r.push({cls:`amber`,text:`Service due in ${i.toLocaleString()}km`}):r.push({cls:`green`,text:`Next service in ${i.toLocaleString()}km`})}let i=r.map(e=>`<span class="veh-badge ${e.cls}">${e.text}</span>`).join(``),o=(e.services||[]).reduce((e,t)=>e+(t.cost||0),0),s=new Date;s.setFullYear(s.getFullYear()-1);let c=(e.services||[]).filter(e=>e.date&&new Date(e.date)>=s).reduce((e,t)=>e+(t.cost||0),0),l=(a.bills||[]).find(t=>t._vehicleRef===`vehicle_${e.id}_rego`),u=(a.bills||[]).find(t=>t._vehicleRef===`vehicle_${e.id}_insurance`),d=c+(l&&parseFloat(l.amount)||0)+(u&&parseFloat(u.amount)||0),p=Math.round(d/12);t+=`
      <div class="veh-card">
        <div class="veh-card-header">
          <div class="veh-icon">${e.fuel===`ev`?`⚡`:`🚗`}</div>
          <div style="flex:1;min-width:0">
            <div class="veh-name">${f(e.name)}</div>
            ${e.plate?`<span class="veh-plate">${f(e.plate)}${e.state?` · `+e.state:``}</span>`:``}
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
          ${e.insurance&&e.insurance.provider?`<div class="veh-stat"><div class="veh-stat-label">Insurer</div><div class="veh-stat-value">${f(e.insurance.provider)}</div></div>`:``}
          <div class="veh-stat"><div class="veh-stat-label">Services (all time)</div><div class="veh-stat-value">${g(o)}</div></div>
          ${d>0?`<div class="veh-stat"><div class="veh-stat-label">Annual Cost</div><div class="veh-stat-value">${g(d)}</div></div>`:``}
          ${p>0?`<div class="veh-stat"><div class="veh-stat-label">Monthly Cost</div><div class="veh-stat-value">${g(p)}/mo</div></div>`:``}
        </div>

        ${l||u?`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
          ${l?`<span style="font-size:11px;color:#0369a1;cursor:pointer;font-weight:600" onclick="activateTab('bills')">Rego bill: ${g(parseFloat(l.amount)||0)} →</span>`:``}
          ${u?`<span style="font-size:11px;color:#0369a1;cursor:pointer;font-weight:600" onclick="activateTab('bills')">Insurance bill: ${g(parseFloat(u.amount)||0)} →</span>`:``}
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
                    <td style="font-weight:500">${f(t.type||`—`)}</td>
                    <td>${t.odometer?t.odometer.toLocaleString()+` km`:`—`}</td>
                    <td style="color:var(--text-muted)">${f(t.provider||`—`)}</td>
                    <td class="amount">${t.cost?g(t.cost):`—`}</td>
                    <td><button class="btn btn-sm" style="color:var(--danger);font-size:11px" onclick="deleteService(${e.id},${t.id})">×</button></td>
                  </tr>`).join(``)}
                </tbody>
              </table></div>`}
        </div>
      </div>`}),document.getElementById(`vehicles-content`).innerHTML=t}function k(e){let t=e?(a.vehicles||[]).find(t=>t.id===e):null,n=!!t;document.getElementById(`modal-title`).textContent=n?`Edit ${t.name}`:`Add Vehicle`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Vehicle Name</label>
      <input class="form-input" id="vf-name" type="text" maxlength="200" value="${t?p(t.name):``}" placeholder="e.g. Mitsubishi Outlander">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Plate Number</label>
        <input class="form-input" id="vf-plate" type="text" maxlength="200" value="${t?p(t.plate||``):``}" placeholder="ABC123" style="text-transform:uppercase">
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
          <input class="form-input" id="vf-ins-provider" type="text" maxlength="200" value="${t&&t.insurance?p(t.insurance.provider||``):``}" placeholder="e.g. AAMI">
        </div>
        <div class="form-group">
          <label class="form-label">Policy Number</label>
          <input class="form-input" id="vf-ins-policy" type="text" maxlength="200" value="${t&&t.insurance?p(t.insurance.policyNo||``):``}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Renewal Date</label>
        <input class="form-input" id="vf-ins-renewal" type="date" value="${t&&t.insurance&&t.insurance.renewalDate||``}">
      </div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveVehicle(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function te(e){let t=document.getElementById(`vf-name`)?.value.trim();if(!t)return;let n={name:t,plate:(document.getElementById(`vf-plate`)?.value||``).trim().toUpperCase(),state:document.getElementById(`vf-state`)?.value||`SA`,fuel:document.getElementById(`vf-fuel`)?.value||`petrol`,regoExpiry:document.getElementById(`vf-rego`)?.value||``,odometer:{reading:parseInt(document.getElementById(`vf-odo`)?.value)||0,date:new Date().toISOString().slice(0,10)},serviceInterval:parseInt(document.getElementById(`vf-interval`)?.value)||1e4,insurance:{provider:document.getElementById(`vf-ins-provider`)?.value.trim()||``,policyNo:document.getElementById(`vf-ins-policy`)?.value.trim()||``,renewalDate:document.getElementById(`vf-ins-renewal`)?.value||``}};if(e){let t=a.vehicles.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=a.vehicles.length?Math.max(...a.vehicles.map(e=>e.id))+1:1,n.services=[],a.vehicles.push(n);a.bills||(a.bills=[]),A(n,`rego`,`Rego - ${n.name}`,n.regoExpiry,0,`Insurance`),n.insurance&&n.insurance.renewalDate&&A(n,`insurance`,`Insurance - ${n.name}`,n.insurance.renewalDate,0,`Insurance`),saveData(a),closeModal(),renderAll()}function A(e,t,n,r,i,o){if(!r)return;let s=`vehicle_${e.id||e.name}_${t}`,c=a.bills.find(e=>e._vehicleRef===s),l={name:n,amount:i||(c?c.amount:0),category:o,frequency:`Annual`,autopay:!1,startDate:r,_vehicleRef:s};c?Object.assign(c,l):(l.id=uid(),a.bills.push(l))}function ne(e){if(!confirm(`Delete this vehicle and all its service history?`))return;let t=`vehicle_${e}_`;a.bills=(a.bills||[]).filter(e=>!(e._vehicleRef&&e._vehicleRef.startsWith(t))),a.vehicles=a.vehicles.filter(t=>t.id!==e),saveData(a),renderAll()}function re(e){document.getElementById(`modal-title`).textContent=`Add Service Record`,document.getElementById(`modal-body`).innerHTML=`
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
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveService(${e})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function j(e){let t=a.vehicles.find(t=>t.id===e);if(!t)return;t.services||(t.services=[]);let n={id:t.services.length?Math.max(...t.services.map(e=>e.id))+1:1,date:document.getElementById(`sf-date`)?.value||``,odometer:parseInt(document.getElementById(`sf-odo`)?.value)||0,type:document.getElementById(`sf-type`)?.value||`Full service`,provider:document.getElementById(`sf-provider`)?.value.trim()||``,cost:parseFloat(document.getElementById(`sf-cost`)?.value)||0,notes:document.getElementById(`sf-notes`)?.value.trim()||``};if(t.services.push(n),n.odometer>(t.odometer?.reading||0)&&(t.odometer={reading:n.odometer,date:n.date}),n.cost>0&&n.date){let e=n.date.slice(0,7),r=getMonthData(e),i=r.expenses.find(e=>e.name&&e.name.toLowerCase().includes(t.name.toLowerCase()))||r.expenses.find(e=>(e.category||``).toLowerCase()===`transport`)||r.expenses.find(e=>(e.name||``).toLowerCase().includes(`car`));if(!i&&(i={id:D(a.budget.expenses),name:`Car - ${t.name}`,amount:0,frequency:`monthly`,category:`Transport`,dueDate:``,vendor:null},a.budget.expenses.push(i),isMonthCustomized(e))){let t=a.budget.months[e];i={...i,id:D(t.expenses)},t.expenses.push(i)}a.budget.actuals[e]||(a.budget.actuals[e]={});let o=getActualEntries(i.id,e);o.push({id:o.length?Math.max(...o.map(e=>e.id))+1:1,amount:n.cost,date:n.date,note:`${t.name}: ${n.type}${n.provider?` @ `+n.provider:``}`}),a.budget.actuals[e][i.id]=o}saveData(a),closeModal(),renderAll()}function ie(e,t){let n=a.vehicles.find(t=>t.id===e);n&&(n.services=(n.services||[]).filter(e=>e.id!==t),saveData(a),renderAll())}var M=[{key:`Insurance`,icon:`🛡️`,bg:`#eff6ff`},{key:`Identity`,icon:`🪪`,bg:`#ecfeff`},{key:`Warranty`,icon:`📦`,bg:`#fffbeb`},{key:`Financial`,icon:`🏦`,bg:`#faf5ff`},{key:`Medical`,icon:`🏥`,bg:`#fef2f2`},{key:`Property`,icon:`🏠`,bg:`#f0f9ff`},{key:`Vehicle`,icon:`🚗`,bg:`#f5f3ff`},{key:`Other`,icon:`📄`,bg:`#f8fafc`}],ae=``;function N(e){return M.find(t=>t.key===e)||M[M.length-1]}function oe(){let e=a.documents||[],t=new Date;ae.toLowerCase();let n=e,r=e.filter(e=>{if(!e.expiryDate)return!1;let n=Math.ceil((new Date(e.expiryDate)-t)/864e5);return n>=0&&n<=30}).length,i=e.filter(e=>e.expiryDate?new Date(e.expiryDate)<t:!1).length;t.toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`});let o=a.settings?.householdName||`Household`,s=(a.kids?.allowances?.length||0)+2,c=i===0&&r===0,l=`
    <div class="home-hero">
      <div>
        <div class="home-hero-label">Household</div>
        <div class="home-hero-val">${o}</div>
        <div class="home-hero-sub">${s} members</div>
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
    <input class="doc-search" type="text" maxlength="200" placeholder="Search documents…" value="${ae}" oninput="_docSearch=this.value;renderDocuments()" style="margin:0 20px;width:calc(100% - 40px)">`,d={};n.forEach(e=>{let t=e.category||`Other`;d[t]||(d[t]=[]),d[t].push(e)}),M.forEach(e=>{let n=d[e.key];!n||!n.length||(u+=`<div class="doc-cat-group">
      <div class="doc-cat-header">${e.icon} ${e.key} <span style="font-weight:400;text-transform:none">(${n.length})</span></div>`,n.sort((e,t)=>e.expiryDate&&t.expiryDate?new Date(e.expiryDate)-new Date(t.expiryDate):e.expiryDate?-1:1).forEach(n=>{let r=``;if(n.expiryDate){let e=Math.ceil((new Date(n.expiryDate)-t)/864e5);r=e<0?`<span class="veh-badge red" style="font-size:11px">Expired ${Math.abs(e)}d ago</span>`:e<=30?`<span class="veh-badge amber" style="font-size:11px">Expires in ${e}d</span>`:`<span class="veh-badge green" style="font-size:11px">${new Date(n.expiryDate).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}</span>`}let i=[n.provider?f(n.provider):``,n.reference?f(n.reference):``,n.storedAt?`📍 ${f(n.storedAt)}`:``].filter(Boolean);u+=`
        <div class="doc-card" onclick="openDocForm(${n.id})">
          <div class="doc-cat-icon" style="background:${e.bg}">${e.icon}</div>
          <div class="doc-card-body">
            <div class="doc-card-name">${f(n.name)}</div>
            ${i.length?`<div class="doc-card-sub">${i.join(` · `)}</div>`:``}
          </div>
          ${r}
        </div>`}),u+=`</div>`)}),n.length,document.getElementById(`documents-content`).innerHTML=u}function se(e){let t=e?(a.documents||[]).find(t=>t.id===e):null,n=!!t;document.getElementById(`modal-title`).textContent=n?`Edit Document`:`Add Document`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Document Name</label>
      <input class="form-input" id="df-name" type="text" maxlength="200" value="${t?p(t.name):``}" placeholder="e.g. Home & Contents Insurance">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="df-cat">
          ${M.map(e=>`<option value="${e.key}"${t&&t.category===e.key?` selected`:``}>${e.icon} ${e.key}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Provider / Issuer</label>
        <input class="form-input" id="df-provider" type="text" maxlength="200" value="${t?p(t.provider||``):``}" placeholder="e.g. AAMI, Medicare">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Reference / Policy No.</label>
        <input class="form-input" id="df-ref" type="text" maxlength="200" value="${t?p(t.reference||``):``}" placeholder="POL-12345">
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
        <input class="form-input" id="df-stored" type="text" maxlength="200" value="${t?p(t.storedAt||``):``}" placeholder="e.g. Filing cabinet, Google Drive, Email">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="df-notes" type="text" maxlength="200" value="${t?p(t.notes||``):``}" placeholder="e.g. $1000 excess, covers building + contents">
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${n?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deleteDoc(${e})">Delete</button>`:``}
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveDoc(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function ce(e){let t=document.getElementById(`df-name`)?.value.trim();if(!t)return;let n={name:t,category:document.getElementById(`df-cat`)?.value||`Other`,provider:document.getElementById(`df-provider`)?.value.trim()||``,reference:document.getElementById(`df-ref`)?.value.trim()||``,expiryDate:document.getElementById(`df-expiry`)?.value||``,renewalCost:parseFloat(document.getElementById(`df-cost`)?.value)||0,storedAt:document.getElementById(`df-stored`)?.value.trim()||``,notes:document.getElementById(`df-notes`)?.value.trim()||``};if(e){let t=a.documents.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=a.documents.length?Math.max(...a.documents.map(e=>e.id))+1:1,a.documents.push(n);if(n.expiryDate&&n.renewalCost>0){a.bills||(a.bills=[]);let t=`doc_${e||n.id}`,r=a.bills.find(e=>e._docRef===t),i={name:`${n.name}${n.provider?` - `+n.provider:``}`,amount:n.renewalCost,category:n.category===`Vehicle`?`Insurance`:n.category,frequency:`Annual`,autopay:!1,startDate:n.expiryDate,_docRef:t};r?Object.assign(r,i):(i.id=uid(),a.bills.push(i))}saveData(a),closeModal(),renderAll()}function le(e){if(!confirm(`Delete this document?`))return;let t=`doc_${e}`;a.bills=(a.bills||[]).filter(e=>e._docRef!==t),a.documents=a.documents.filter(t=>t.id!==e),saveData(a),closeModal(),renderAll()}var ue=[{key:`HVAC`,icon:`❄️`},{key:`Plumbing`,icon:`🚿`},{key:`Electrical`,icon:`💡`},{key:`Garden`,icon:`🌿`},{key:`Cleaning`,icon:`🧹`},{key:`Safety`,icon:`🔥`},{key:`Appliance`,icon:`🔧`},{key:`Exterior`,icon:`🏠`},{key:`Other`,icon:`📋`}],de=[{name:`Gutters Cleaned`,category:`Exterior`,intervalNum:6,intervalUnit:`months`,icon:`🏠`},{name:`Smoke Alarm Batteries`,category:`Safety`,intervalNum:12,intervalUnit:`months`,icon:`🔥`},{name:`Pest Control`,category:`Exterior`,intervalNum:12,intervalUnit:`months`,icon:`🐛`},{name:`AC Filter Cleaned`,category:`HVAC`,intervalNum:3,intervalUnit:`months`,icon:`❄️`},{name:`Hot Water System Flush`,category:`Plumbing`,intervalNum:12,intervalUnit:`months`,icon:`🚿`},{name:`Lawn Mowing`,category:`Garden`,intervalNum:2,intervalUnit:`weeks`,icon:`🌿`},{name:`Oven Clean`,category:`Cleaning`,intervalNum:6,intervalUnit:`months`,icon:`🧹`},{name:`Pool Maintenance`,category:`Exterior`,intervalNum:1,intervalUnit:`months`,icon:`🏊`},{name:`Drains / Septic`,category:`Plumbing`,intervalNum:2,intervalUnit:`years`,icon:`🚿`},{name:`Roof Inspection`,category:`Exterior`,intervalNum:2,intervalUnit:`years`,icon:`🏠`}];function fe(e){if(!e.lastDone)return null;let t=new Date(e.lastDone),n=e.intervalNum||1,r=e.intervalUnit||`months`;return r===`days`?t.setDate(t.getDate()+n):r===`weeks`?t.setDate(t.getDate()+n*7):r===`months`?t.setMonth(t.getMonth()+n):r===`years`&&t.setFullYear(t.getFullYear()+n),t}function pe(e){let t=fe(e);return t?Math.ceil((t-new Date)/864e5):null}function me(){let e=a.maintenance||[];if(e.length===0){let t=new Set(e.map(e=>e.name.toLowerCase())),n=de.filter(e=>!t.has(e.name.toLowerCase()));document.getElementById(`maintenance-content`).innerHTML=`
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
              <div class="maint-starter-name">${e.icon} ${f(e.name)}</div>
              <div class="maint-starter-sub">Every ${e.intervalNum} ${e.intervalUnit}</div>
            </button>`).join(``)}
        </div>
      </div>`:``}`;return}let t=[...e].map(e=>{let t=pe(e);return{...e,_days:t}}).sort((e,t)=>e._days===null&&t._days===null?0:e._days===null?1:t._days===null?-1:e._days-t._days),n=t.filter(e=>e._days!==null&&e._days<0).length,r=t.filter(e=>e._days!==null&&e._days>=0&&e._days<=14).length,i=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${n>0?`<span class="veh-badge red">${n} overdue</span>`:``}
        ${r>0?`<span class="veh-badge amber">${r} due soon</span>`:``}
        <span style="font-size:13px;color:var(--text-muted)">${e.length} item${e.length===1?``:`s`}</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openMaintForm()">+ Add Item</button>
    </div>`;if(t.forEach(e=>{let t=e._days,n=`ok`,r=``;t===null?(n=`ok`,r=e.lastDone?`Last done ${new Date(e.lastDone).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}`:`Never done`):t<0?(n=`overdue`,r=`Overdue by ${Math.abs(t)} day${Math.abs(t)===1?``:`s`}`):t<=14?(n=`due-soon`,r=t===0?`Due today`:`Due in ${t} day${t===1?``:`s`}`):r=`Due ${fe(e).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`;let a=ue.find(t=>t.key===e.category)||ue[ue.length-1],o=e.intervalNum?`Every ${e.intervalNum} ${e.intervalUnit}`:``;i+=`
      <div class="maint-item ${n}">
        <div class="maint-row">
          <div class="maint-icon">${a.icon}</div>
          <div class="maint-body">
            <div class="maint-name">${f(e.name)}</div>
            <div class="maint-sub">${[r,o,e.provider?f(e.provider):``].filter(Boolean).join(` · `)}</div>
          </div>
          <div class="maint-actions">
            <button class="maint-done-btn" onclick="event.stopPropagation();markMaintDone(${e.id})">✓ Done</button>
            <button class="btn btn-sm" onclick="openMaintForm(${e.id})">Edit</button>
          </div>
        </div>
        ${e.lastCost?`<div style="font-size:11px;color:var(--text-muted);margin-top:6px;padding-left:48px">Last cost: ${g(e.lastCost)}</div>`:``}
      </div>`}),e.length<3){let t=new Set(e.map(e=>e.name.toLowerCase())),n=de.filter(e=>!t.has(e.name.toLowerCase()));n.length&&(i+=`<div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add more</div>
        <div class="maint-starter">
          ${n.slice(0,6).map((e,t)=>`
            <button class="maint-starter-btn" onclick="quickAddMaint(${t})">
              <div class="maint-starter-name">${e.icon} ${f(e.name)}</div>
              <div class="maint-starter-sub">Every ${e.intervalNum} ${e.intervalUnit}</div>
            </button>`).join(``)}
        </div>
      </div>`)}document.getElementById(`maintenance-content`).innerHTML=i}function he(e){let t=e?(a.maintenance||[]).find(t=>t.id===e):null,n=!!t;document.getElementById(`modal-title`).textContent=n?`Edit ${t.name}`:`Add Maintenance Item`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="mf-name" type="text" maxlength="200" value="${t?p(t.name):``}" placeholder="e.g. Gutters Cleaned, Pest Control">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="mf-cat">
          ${ue.map(e=>`<option value="${e.key}"${t&&t.category===e.key?` selected`:``}>${e.icon} ${e.key}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Provider</label>
        <input class="form-input" id="mf-provider" type="text" maxlength="200" value="${t?p(t.provider||``):``}" placeholder="e.g. Jim's Mowing, DIY">
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
        <input class="form-input" id="mf-notes" type="text" maxlength="200" value="${t?p(t.notes||``):``}">
      </div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${n?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deleteMaint(${e})">Delete</button>`:``}
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveMaint(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function ge(e){let t=document.getElementById(`mf-name`)?.value.trim();if(!t)return;let n={name:t,category:document.getElementById(`mf-cat`)?.value||`Other`,provider:document.getElementById(`mf-provider`)?.value.trim()||``,intervalNum:parseInt(document.getElementById(`mf-interval-num`)?.value)||1,intervalUnit:document.getElementById(`mf-interval-unit`)?.value||`months`,lastDone:document.getElementById(`mf-last`)?.value||``,lastCost:parseFloat(document.getElementById(`mf-cost`)?.value)||0,notes:document.getElementById(`mf-notes`)?.value.trim()||``};if(e){let t=a.maintenance.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=a.maintenance.length?Math.max(...a.maintenance.map(e=>e.id))+1:1,a.maintenance.push(n);saveData(a),closeModal(),renderAll()}function _e(e){confirm(`Delete this maintenance item?`)&&(a.maintenance=a.maintenance.filter(t=>t.id!==e),saveData(a),closeModal(),renderAll())}function ve(e){let t=a.maintenance.find(t=>t.id===e);if(!t)return;let n=new Date().toISOString().slice(0,10);if(t.lastDone=n,t.lastCost>0){let e=n.slice(0,7),r=getMonthData(e),i=r.expenses.find(e=>(e.category||``).toLowerCase()===`other`&&(e.name||``).toLowerCase().includes(`maintenance`))||r.expenses.find(e=>(e.name||``).toLowerCase().includes(`maintenance`));if(!i&&(i={id:D(a.budget.expenses),name:`Home Maintenance`,amount:0,frequency:`monthly`,category:`Other`,dueDate:``,vendor:null},a.budget.expenses.push(i),isMonthCustomized(e))){let t=a.budget.months[e];i={...i,id:D(t.expenses)},t.expenses.push(i)}a.budget.actuals[e]||(a.budget.actuals[e]={});let o=getActualEntries(i.id,e);o.push({id:o.length?Math.max(...o.map(e=>e.id))+1:1,amount:t.lastCost,date:n,note:`${t.name}${t.provider?` - `+t.provider:``}`}),a.budget.actuals[e][i.id]=o}saveData(a),renderAll()}function ye(e){let t=de[e];if(!t)return;let n={id:a.maintenance.length?Math.max(...a.maintenance.map(e=>e.id))+1:1,name:t.name,category:t.category,provider:``,intervalNum:t.intervalNum,intervalUnit:t.intervalUnit,lastDone:``,lastCost:0,notes:``};a.maintenance.push(n),saveData(a),renderAll()}var be=[`Fridge`,`Freezer`,`Pantry`,`Fruit & Veg`,`Spices`,`Drinks`,`Cleaning`,`Other`],xe=[{name:`Milk`,cat:`Fridge`},{name:`Eggs`,cat:`Fridge`},{name:`Cheese`,cat:`Fridge`},{name:`Butter`,cat:`Fridge`},{name:`Yoghurt`,cat:`Fridge`},{name:`Chicken breast`,cat:`Freezer`},{name:`Mince`,cat:`Freezer`},{name:`Fish fillets`,cat:`Freezer`},{name:`Frozen veg`,cat:`Freezer`},{name:`Pasta`,cat:`Pantry`},{name:`Rice`,cat:`Pantry`},{name:`Tinned tomatoes`,cat:`Pantry`},{name:`Olive oil`,cat:`Pantry`},{name:`Flour`,cat:`Pantry`},{name:`Sugar`,cat:`Pantry`},{name:`Bread`,cat:`Pantry`},{name:`Cereal`,cat:`Pantry`},{name:`Onions`,cat:`Fruit & Veg`},{name:`Potatoes`,cat:`Fruit & Veg`},{name:`Bananas`,cat:`Fruit & Veg`},{name:`Apples`,cat:`Fruit & Veg`},{name:`Salt`,cat:`Spices`},{name:`Pepper`,cat:`Spices`},{name:`Garlic`,cat:`Spices`}];function Se(){let e=document.getElementById(`pantry-content`);if(!e)return;let t=a.meals.pantry||[];if(t.length===0){e.innerHTML=`
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon" style="font-size:48px">🥫</div>
        <p style="margin:12px 0">Track what's in your kitchen. Tap items you usually keep stocked.</p>
        <button class="btn btn-primary" onclick="openPantryForm()">+ Add Item</button>
      </div>
      <div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add common items</div>
        <div class="pantry-starter">
          ${xe.map(e=>`<button class="pantry-starter-btn" onclick="quickAddPantry('${p(e.name)}','${e.cat}')">${f(e.name)}</button>`).join(``)}
        </div>
      </div>`;return}let n={};be.forEach(e=>n[e]=[]),t.forEach(e=>{n[be.includes(e.cat)?e.cat:`Other`].push(e)});let r=t.filter(e=>e.status===`need`).length,i=t.filter(e=>e.status===`low`).length,o=`
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
    </div>`;if(be.forEach(e=>{let t=n[e];t.length&&(o+=`<div class="pantry-cat-header">${f(e)} (${t.length})</div>`,t.forEach(e=>{let t=e.status===`stocked`?`✓`:e.status===`low`?`!`:`✗`;e.status===`stocked`||e.status,o+=`<div class="pantry-item">
        <div class="pantry-status ${e.status}" onclick="cyclePantryStatus(${e.id})" title="Tap to change">${t}</div>
        <div class="pantry-body">
          <div class="pantry-name">${f(e.name)}</div>
          ${e.qty?`<div class="pantry-meta">${f(e.qty)}</div>`:``}
        </div>
        <div class="pantry-actions">
          <button class="btn btn-sm" style="font-size:11px" onclick="openPantryForm(${e.id})">Edit</button>
          <button class="btn btn-sm" style="font-size:11px;color:var(--danger)" onclick="deletePantryItem(${e.id})">×</button>
        </div>
      </div>`}))}),t.length<10){let e=new Set(t.map(e=>e.name.toLowerCase())),n=xe.filter(t=>!e.has(t.name.toLowerCase()));n.length&&(o+=`<div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add more</div>
        <div class="pantry-starter">
          ${n.slice(0,12).map(e=>`<button class="pantry-starter-btn" onclick="quickAddPantry('${p(e.name)}','${e.cat}')">${f(e.name)}</button>`).join(``)}
        </div>
      </div>`)}e.innerHTML=o}function Ce(e){let t=(a.meals.pantry||[]).find(t=>t.id===e);t&&(t.status={stocked:`low`,low:`need`,need:`stocked`}[t.status]||`stocked`,saveData(a),Se())}function we(e){let t=e?(a.meals.pantry||[]).find(t=>t.id===e):null;document.getElementById(`modal-title`).textContent=t?`Edit Item`:`Add Pantry Item`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="pf-name" type="text" maxlength="200" value="${t?p(t.name):``}" placeholder="e.g. Pasta, Milk, Chicken">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="pf-cat">
          ${be.map(e=>`<option value="${e}"${t&&t.cat===e?` selected`:``}>${e}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Quantity <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="pf-qty" type="text" maxlength="200" value="${t?p(t.qty||``):``}" placeholder="e.g. 2 bags, 1L, 500g">
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
    ${t?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deletePantryItem(${e});closeModal()">Delete</button>`:``}
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="savePantryItem(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Te(e){let t=document.getElementById(`pf-name`)?.value.trim();if(!t)return;let n={name:t,cat:document.getElementById(`pf-cat`)?.value||`Other`,qty:document.getElementById(`pf-qty`)?.value.trim()||``,status:document.querySelector(`input[name="pf-status"]:checked`)?.value||`stocked`},r=a.meals.pantry;if(e){let t=r.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=r.length?Math.max(...r.map(e=>e.id))+1:1,r.push(n);saveData(a),closeModal(),Se()}function Ee(e){a.meals.pantry=(a.meals.pantry||[]).filter(t=>t.id!==e),saveData(a),Se()}function De(e,t){let n=a.meals.pantry;n.push({id:n.length?Math.max(...n.map(e=>e.id))+1:1,name:e,cat:t,qty:``,status:`stocked`}),saveData(a),Se()}function Oe(){let e=(a.meals.pantry||[]).filter(e=>e.status===`need`||e.status===`low`);if(!e.length)return;a.lists||(a.lists={}),a.lists.food||(a.lists.food={items:[],weeklyBudget:200,budget:0,stores:[],favourites:[],history:[]});let t=a.lists.food.items,n={Fridge:`dairy`,Freezer:`frozen`,Pantry:`pantry`,"Fruit & Veg":`produce`,Spices:`pantry`,Drinks:`drinks`,Cleaning:`cleaning`,Other:`other`},r=0;e.forEach(e=>{t.some(t=>t.name.toLowerCase()===e.name.toLowerCase()&&t.state===`active`)||(t.push({id:`si-`+Date.now()+`-`+r,name:e.name,quantity:1,unit:`units`,notes:``,aisle:n[e.cat]||`other`,state:`active`,addedBy:`pantry`,addedAt:new Date().toISOString(),mealTag:`Pantry`,manualPrice:null,barcodeId:null}),r++)}),r>0&&(saveData(a),_listsActiveType=`food`,_listsView=`list`,activateTab(`lists`));let i=document.querySelector(`[onclick*="pantryToShoppingList"]`);if(i){let e=i.textContent;i.textContent=`Added ${r} items`,i.style.color=`var(--success)`,setTimeout(()=>{i.textContent=e,i.style.color=``},2e3)}}var ke=[`Cash & Savings`,`Investments`,`Property`,`Superannuation`,`Vehicle`,`Other`],Ae=[`Mortgage`,`Car Loan`,`Credit Card`,`Personal Loan`,`HECS/HELP`,`Other`];function je(){let e=document.getElementById(`networth-content`);if(!e)return;let t=a.netWorth,n=t.assets||[],r=t.liabilities||[],i=t.snapshots||[],o=n.reduce((e,t)=>e+(parseFloat(t.value)||0),0),s=r.reduce((e,t)=>e+(parseFloat(t.value)||0),0),c=o-s,l=``;if(i.length>=2){let e=c-i[i.length-2].netWorth;l=`<span class="${e>=0?`up`:`down`}">${e>=0?`+`:``}${v(e)}</span> vs last snapshot`}if(!n.length&&!r.length){e.innerHTML=`
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
      <div class="nw-hero-amount ${c>=0?`positive`:`negative`}">${v(c)}</div>
      ${l?`<div class="nw-hero-change">${l}</div>`:``}
    </div>

    ${Ne(c)}
    ${r.some(e=>e.rate)?Pe(r):``}
    ${i.length>1?Re(i):``}

    <div class="nw-cols">
      <div class="nw-col-card assets">
        <div class="nw-col-header">
          <span class="nw-col-title">Assets</span>
          <span class="nw-col-total">${v(o)}</span>
        </div>
        ${n.length?n.map(e=>Me(e,`asset`)).join(``):`<div class="nw-empty">No assets yet</div>`}
        <div class="nw-add-row">
          <button class="btn-outline" style="font-size:12px;padding:6px 14px" onclick="openNWModal('asset')">+ Add asset</button>
        </div>
      </div>
      <div class="nw-col-card liabilities">
        <div class="nw-col-header">
          <span class="nw-col-title">Liabilities</span>
          <span class="nw-col-total">${v(s)}</span>
        </div>
        ${r.length?r.map(e=>Me(e,`liability`)).join(``):`<div class="nw-empty">No liabilities yet</div>`}
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

  `}function Me(e,t){let n=e.category||``;if(t===`liability`&&e.rate){let t=parseFloat(e.value)||0,r=parseFloat(e.rate),i=t*r/1200;n+=n?` · `:``,n+=`${r}% p.a. · $${Math.round(i).toLocaleString()}/mo interest`}return`
    <div class="nw-item">
      <div style="flex:1;min-width:0">
        <div class="nw-item-name">${f(e.name)}</div>
        ${n?`<div class="nw-item-cat">${n}</div>`:``}
      </div>
      <div class="nw-item-value">${v(parseFloat(e.value)||0)}</div>
      <div class="nw-item-actions">
        <button class="icon-btn" title="Edit" onclick="openNWModal('${t}','${e.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteNWItem('${t}','${e.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>`}function Ne(e){let t=a.netWorth.target||{},n=parseFloat(t.amount)||0,r=parseInt(t.byYear)||0,i=new Date().getFullYear();if(!n||!r)return`
      <div class="nw-target-card">
        <div class="nw-target-header">
          <span class="nw-target-title">Your target</span>
          <button class="btn-outline" style="font-size:12px;padding:5px 12px" onclick="openNWTargetModal()">Set target</button>
        </div>
        <div class="nw-target-empty">
          <span style="font-size:28px">🎯</span>
          <span style="font-size:13px;color:#64748b">Set a net worth goal and track your progress towards it.</span>
        </div>
      </div>`;let o=Math.min(e/n*100,100),s=Math.max(n-e,0),c=Math.max(r-i,0),l=c*12,u=l>0?Math.ceil(s/l):0,d=e>=n,f=a.netWorth.snapshots||[],p=``;if(f.length>=2){let e=f[0],t=f[f.length-1],n=Math.max((new Date(t.date)-new Date(e.date))/(1e3*60*60*24*30.5),1),a=(t.netWorth-e.netWorth)/n;if(a>0&&s>0){let e=Math.ceil(s/a),t=i+Math.floor(e/12),n=t<=r;p=`<div class="nw-target-stat">
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
        <div class="nw-target-goal">${v(n)}</div>
        <div style="font-size:13px;color:#64748b">by ${r}</div>
      </div>
      <div class="nw-progress-track">
        <div class="nw-progress-fill ${d?`over`:``}" style="width:${o.toFixed(1)}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#94a3b8;margin-bottom:14px">
        <span>${o.toFixed(0)}% there</span>
        <span>${d?`🎉 Goal reached!`:v(s)+` to go`}</span>
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
    </div>`}function Pe(e){let t=e.filter(e=>e.rate);if(!t.length)return``;let n=t.reduce((e,t)=>e+(parseFloat(t.value)||0)*(parseFloat(t.rate)||0)/1200,0),r=t.map(e=>{let t=parseFloat(e.value)||0,n=parseFloat(e.rate)||0,r=parseFloat(e.monthlyPayment)||0,i=t*n/1200,a=``;if(r>0)if(r<=i)a=`<span class="nw-debt-payoff warn">⚠ Paying interest only</span>`;else{let e=n/1200,i=-Math.log(1-e*t/r)/Math.log(1+e);if(isFinite(i)&&i>0){let e=new Date;e.setMonth(e.getMonth()+Math.ceil(i));let n=e.toLocaleString(`default`,{month:`short`}),o=e.getFullYear();a=`<span class="nw-debt-payoff" title="${v(r*Math.ceil(i)-t)} total interest">Paid off ${n} ${o}</span>`}}return`<div class="nw-debt-row">
      <span class="nw-debt-name">${f(e.name)}</span>
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
    </div>`}function Fe(){let e=a.netWorth.target||{};document.getElementById(`nw-t-amount`).value=e.amount||``,document.getElementById(`nw-t-year`).value=e.byYear||``,document.getElementById(`nw-target-modal`).style.display=`flex`}function Ie(){document.getElementById(`nw-target-modal`).style.display=`none`}function Le(){let e=parseFloat(document.getElementById(`nw-t-amount`).value),t=parseInt(document.getElementById(`nw-t-year`).value);!e||!t||(a.netWorth.target||(a.netWorth.target={}),a.netWorth.target.amount=e,a.netWorth.target.byYear=t,saveData(a),je(),Ie())}function Re(e){let t=e.slice(-12),n=Math.max(...t.map(e=>Math.abs(e.netWorth)),1);return`
    <div class="nw-trend-card">
      <div class="nw-trend-title">Net Worth over time</div>
      <div class="nw-trend-chart">${t.map(e=>{let t=Math.round(Math.abs(e.netWorth)/n*70);return`<div class="nw-trend-bar-wrap">
      <div class="nw-trend-bar ${e.netWorth>=0?`pos`:`neg`}" style="height:${t}px"></div>
      <div class="nw-trend-label">${e.date?e.date.slice(0,7):``}</div>
    </div>`}).join(``)}</div>
    </div>`}function ze(){if(document.getElementById(`nw-modal`))return;let e=document.createElement(`div`);for(e.innerHTML=`
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
    </div>`;e.firstChild;)document.body.appendChild(e.firstChild)}function Be(e,t){ze();let n=a.netWorth,r=e===`asset`?n.assets:n.liabilities,i=e===`asset`?ke:Ae,o=t?r.find(e=>e.id===t):null,s=document.getElementById(`nw-modal`);if(!s)return;document.getElementById(`nw-modal-title`).textContent=(o?`Edit`:`Add`)+` `+(e===`asset`?`Asset`:`Liability`),document.getElementById(`nw-edit-id`).value=t||``,document.getElementById(`nw-edit-type`).value=e,document.getElementById(`nw-name`).value=o?o.name:``,document.getElementById(`nw-value`).value=o?o.value:``,document.getElementById(`nw-rate`).value=o&&o.rate?o.rate:``,document.getElementById(`nw-payment`).value=o&&o.monthlyPayment?o.monthlyPayment:``;let c=o?.category||i[0],l=document.getElementById(`nw-cat-wrap`);l&&(l.innerHTML=customSelect(`nw-cat`,i,c,e=>{_csStore[`nw-cat`].value=e}));let u=document.getElementById(`nw-debt-fields`);u&&(u.style.display=e===`liability`?`flex`:`none`),s.style.display=`flex`}function Ve(){let e=document.getElementById(`nw-modal`);e&&(e.style.display=`none`)}function He(){let e=document.getElementById(`nw-name`).value.trim(),t=parseFloat(document.getElementById(`nw-value`).value),n=_csStore[`nw-cat`]?.value||``,r=document.getElementById(`nw-edit-type`).value,i=document.getElementById(`nw-edit-id`).value,o=parseFloat(document.getElementById(`nw-rate`).value)||0,s=parseFloat(document.getElementById(`nw-payment`).value)||0;if(!e||isNaN(t))return;let c=r===`asset`?a.netWorth.assets:a.netWorth.liabilities,l={name:e,value:t,category:n};if(r===`liability`&&(o&&(l.rate=o),s&&(l.monthlyPayment=s)),i){let e=c.findIndex(e=>e.id===i);e!==-1&&(c[e]={...c[e],...l})}else c.push({id:uid(),...l});saveData(a),Ve(),je()}function Ue(e,t){let n=e===`asset`?a.netWorth.assets:a.netWorth.liabilities,r=n.findIndex(e=>e.id===t);r!==-1&&(n.splice(r,1),saveData(a),je())}function We(){let e=a.netWorth,t=(e.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0)-(e.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),n=new Date().toISOString().slice(0,10);e.snapshots||(e.snapshots=[]);let r=e.snapshots.findIndex(e=>e.date===n),i={date:n,netWorth:t,assets:(e.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),liabilities:(e.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0)};r===-1?e.snapshots.push(i):e.snapshots[r]=i,saveData(a),je()}function P(e){return window._secureGet(e)}function Ge(e,t){window._secureSet(e,t)}function Ke(e){window._secureClear(e)}var qe=[{label:`Mortgage / Rent`,icon:`🏠`},{label:`Electricity`,icon:`⚡`},{label:`Gas`,icon:`🔥`},{label:`Water`,icon:`💧`},{label:`Internet`,icon:`📡`},{label:`Phone`,icon:`📱`},{label:`Insurance`,icon:`🛡️`},{label:`Car Registration`,icon:`🚗`},{label:`Rates & Taxes`,icon:`🏛️`},{label:`Loan Repayment`,icon:`💳`},{label:`Education`,icon:`📚`},{label:`Subscriptions`,icon:`📺`},{label:`Health`,icon:`🏥`},{label:`Other`,icon:`📦`}],Je=[`Monthly`,`Fortnightly`,`Weekly`,`Quarterly`,`Annually`];function Ye(e){let t=qe.find(t=>t.label===e);return t?t.icon:`📦`}function Xe(e){if(e<0)return`<span class="bill-due-badge overdue">Overdue ${Math.abs(e)}d</span>`;if(e===0)return`<span class="bill-due-badge today">Due today</span>`;if(e<=7)return`<span class="bill-due-badge soon">Due in ${e}d</span>`;let t=new Date;return t.setDate(t.getDate()+e),`<span class="bill-due-badge ok">${t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}</span>`}function Ze(e){return(parseFloat(e.amount)||0)*({Weekly:52/12,Fortnightly:26/12,Monthly:1,Quarterly:1/3,Annually:1/12}[e.frequency||`Monthly`]||1)}function Qe(){let e=document.getElementById(`bills-content`);if(!e)return;let r=a.bills||[],i=a.subscriptions||[],o=_billsSubsFilter,s=`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,c=`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,l=r.reduce((e,t)=>e+Ze(t),0)+i.reduce((e,t)=>e+subMonthlyAmount(t),0),u=r.filter(e=>n(e)<0).length,d=r.filter(e=>{let t=n(e);return t>=0&&t<=7}).length,p=new Date;p.setHours(0,0,0,0);let m=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],h=Array.from({length:14},(e,n)=>{let i=new Date(p);i.setDate(i.getDate()+n);let a=r.filter(e=>t(e).toDateString()===i.toDateString()),o=[i.toDateString()===p.toDateString()&&`today`,a.length&&`has-bill`].filter(Boolean).join(` `);return`<div class="bills-day" title="${a.map(e=>e.name).join(`, `)}">
      <div class="bills-day-label">${m[i.getDay()]}</div>
      <div class="bills-day-num ${o}">${i.getDate()}</div>
      ${a.length?`<div class="bills-day-dot"></div>`:`<div style="height:5px"></div>`}
    </div>`}).join(``);function g(e){let t=n(e),r=t<0?`overdue`:t<=7?`due-soon`:``,i=(e.frequency||`Monthly`)===`Monthly`?``:` · ${e.frequency}`;return`<div class="bill-row ${r}">
      <div class="bill-icon">${Ye(e.category)}</div>
      <div class="bill-info">
        <div class="bill-name">${f(e.name)}<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;background:#fef3c7;color:#92400e;margin-left:6px">BILL</span>${e._vehicleRef?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#f0f9ff;color:#0369a1;margin-left:4px;cursor:pointer" onclick="event.stopPropagation();activateTab('vehicles')">Vehicle →</span>`:``}${e._docRef?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#f5f3ff;color:#6d28d9;margin-left:4px;cursor:pointer" onclick="event.stopPropagation();activateTab('documents')">Document →</span>`:``}</div>
        <div class="bill-meta">${e.category||``}${i}${e.autopay?` · Autopay ✓`:``}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="bill-amount">$${(parseFloat(e.amount)||0).toLocaleString()}</div>
        ${Xe(t)}
      </div>
      ${t>=0?`<button class="bill-paid-btn" onclick="markBillPaid('${e.id}')">✓ Paid</button>`:``}
      <div class="bill-actions">
        <button class="icon-btn" title="Edit" onclick="openBillModal('${e.id}')">${s}</button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteBill('${e.id}')">${c}</button>
      </div>
    </div>`}function _(e){let t=subMonthlyAmount(e),n=e.frequency===`Annual`?`$${parseFloat(e.amount).toLocaleString()}/yr`:e.frequency===`Weekly`?`$${parseFloat(e.amount).toFixed(2)}/wk`:`$${parseFloat(e.amount).toFixed(2)}/mo`,r=e.renewalDate?` · Renews ${e.renewalDate}`:``;return`<div class="bill-row">
      <div class="bill-icon">${subCatIcon(e.category)}</div>
      <div class="bill-info">
        <div class="bill-name">${f(e.name)}<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;background:#ede9fe;color:#5b21b6;margin-left:6px">SUB</span></div>
        <div class="bill-meta">${e.category||`Other`} · ${n}${r}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="bill-amount">$${t.toFixed(2)}<span style="font-size:11px;font-weight:400;color:#94a3b8">/mo</span></div>
      </div>
      <div class="bill-actions">
        <button class="icon-btn" title="Edit" onclick="openSubModal('${e.id}')">${s}</button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteSub('${e.id}')">${c}</button>
      </div>
    </div>`}let v=[...r].sort((e,t)=>n(e)-n(t)),y=v.filter(e=>n(e)<0),b=v.filter(e=>{let t=n(e);return t>=0&&t<=7}),x=v.filter(e=>{let t=n(e);return t>7&&t<=31}),S=v.filter(e=>n(e)>31),C=o===`all`||o===`bills`,w=o===`all`||o===`subs`,T=_subImportResults.filter(e=>!_subImportDismissed.has(e._key));e.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;gap:4px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:3px">
        <button onclick="setBillsFilter('all')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${o===`all`?`var(--primary)`:`transparent`};color:${o===`all`?`#fff`:`var(--text-muted)`}">All (${r.length+i.length})</button>
        <button onclick="setBillsFilter('bills')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${o===`bills`?`var(--primary)`:`transparent`};color:${o===`bills`?`#fff`:`var(--text-muted)`}">Bills (${r.length})</button>
        <button onclick="setBillsFilter('subs')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${o===`subs`?`var(--primary)`:`transparent`};color:${o===`subs`?`#fff`:`var(--text-muted)`}">Subscriptions (${i.length})</button>
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
      <div class="bills-strip">${h}</div>
    </div>`:``}

    ${T.length?renderSubImportResults(T):``}

    <div class="bills-upcoming">
      ${C?`
        ${y.length?`<div class="bills-upcoming-group">⚠ Overdue</div>${y.map(g).join(``)}`:``}
        ${b.length?`<div class="bills-upcoming-group">This week</div>${b.map(g).join(``)}`:``}
        ${x.length?`<div class="bills-upcoming-group">This month</div>${x.map(g).join(``)}`:``}
        ${S.length?`<div class="bills-upcoming-group">Later</div>${S.map(g).join(``)}`:``}
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
            value="${P(`toto_ai_key`)||``}"
            oninput="prefsSet('toto_ai_key', this.value)" style="flex:1;min-width:200px">
          <label class="sub-upload-btn" for="sub-csv-input">📎 Upload CSV</label>
          <input type="file" id="sub-csv-input" accept=".csv,.txt" style="display:none" onchange="handleSubCSV(event)">
        </div>
        <div id="sub-import-status" style="margin-top:10px;font-size:13px;color:rgba(255,255,255,0.7);display:none"></div>
      </div>
    </details>

    ${tt()}
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
                ${SUB_CATS.map(e=>`<option value="${e.label}">${e.icon} ${e.label}</option>`).join(``)}
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
    </div>`}function $e(e){_billsSubsFilter=e,Qe()}function et(){Qe()}function tt(e){let t=e?(a.bills||[]).find(t=>t.id===e):null,n=qe.map(e=>`<option value="${e.label}" ${t&&t.category===e.label?`selected`:``}>${e.icon} ${e.label}</option>`).join(``),r=Je.map(e=>`<option value="${e}" ${t&&t.frequency===e||(!t||!t.frequency)&&e===`Monthly`?`selected`:``}>${e}</option>`).join(``),i=`width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none`,o=`font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px`;return`
    <div id="bill-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,0.2);max-height:90vh;overflow-y:auto">
        <h3 id="bill-modal-title" style="font-size:17px;font-weight:700;margin-bottom:20px">Add Bill</h3>
        <input type="hidden" id="bill-edit-id">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="${o}">Bill name</label>
            <input id="bill-name" type="text" maxlength="200" placeholder="e.g. AGL Electricity" style="${i}" value="${t?p(t.name):``}">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="${o}">Category</label>
              <select id="bill-cat" style="${i};background:#fff">${n}</select>
            </div>
            <div>
              <label style="${o}">Frequency</label>
              <select id="bill-freq" style="${i};background:#fff" onchange="toggleBillDayField()">${r}</select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="${o}">Amount ($)</label>
              <input id="bill-amount" type="number" max="99999999" min="0" step="1" placeholder="0" style="${i}" value="${t?t.amount:``}">
            </div>
            <div id="bill-day-wrap">
              <label style="${o}">Day of month due</label>
              <input id="bill-day" type="number" min="1" max="31" placeholder="e.g. 15" style="${i}" value="${t&&t.dueDay?t.dueDay:``}">
            </div>
            <div id="bill-start-wrap" style="display:none">
              <label style="${o}">Next due date</label>
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
    </div>`}function nt(e){let t=e?(a.bills||[]).find(t=>t.id===e):null;Qe();let n=document.getElementById(`bill-modal`);n&&(document.getElementById(`bill-modal-title`).textContent=t?`Edit Bill`:`Add Bill`,document.getElementById(`bill-edit-id`).value=e||``,t&&(document.getElementById(`bill-name`).value=t.name||``,document.getElementById(`bill-cat`).value=t.category||qe[0].label,document.getElementById(`bill-freq`).value=t.frequency||`Monthly`,document.getElementById(`bill-amount`).value=t.amount||``,document.getElementById(`bill-day`).value=t.dueDay||``,document.getElementById(`bill-start`).value=t.startDate||``,document.getElementById(`bill-autopay`).checked=!!t.autopay),it(),n.style.display=`flex`)}function rt(){let e=document.getElementById(`bill-modal`);e&&(e.style.display=`none`)}function it(){let e=document.getElementById(`bill-freq`)?.value,t=document.getElementById(`bill-day-wrap`),n=document.getElementById(`bill-start-wrap`);if(!t||!n)return;let r=e===`Monthly`;t.style.display=r?`block`:`none`,n.style.display=r?`none`:`block`}function at(){let e=document.getElementById(`bill-name`).value.trim(),t=parseFloat(document.getElementById(`bill-amount`).value),n=document.getElementById(`bill-cat`).value,r=document.getElementById(`bill-freq`).value,i=parseInt(document.getElementById(`bill-day`).value)||null,o=document.getElementById(`bill-start`).value||null,s=document.getElementById(`bill-autopay`).checked,c=document.getElementById(`bill-edit-id`).value;if(!e||isNaN(t))return;let l={name:e,amount:t,category:n,frequency:r,autopay:s};if(r===`Monthly`?l.dueDay=i:l.startDate=o,a.bills||(a.bills=[]),c){let e=a.bills.findIndex(e=>e.id===c);e!==-1&&(a.bills[e]={...a.bills[e],...l})}else a.bills.push({id:uid(),...l});saveData(a),rt(),Qe()}function ot(e){a.bills=(a.bills||[]).filter(t=>t.id!==e),saveData(a),Qe()}function st(e){let t=(a.bills||[]).find(t=>t.id===e);t&&(t.lastPaid=new Date().toISOString().slice(0,10),saveData(a),Qe())}var ct=[{label:`Streaming`,icon:`📺`},{label:`Music`,icon:`🎵`},{label:`Software`,icon:`💻`},{label:`Fitness`,icon:`💪`},{label:`Gaming`,icon:`🎮`},{label:`News`,icon:`📰`},{label:`Insurance`,icon:`🛡️`},{label:`Education`,icon:`📚`},{label:`Other`,icon:`📦`}];function lt(e){let t=ct.find(t=>t.label===e);return t?t.icon:`📦`}function ut(e){let t=parseFloat(e.amount)||0;return e.frequency===`Annual`?t/12:e.frequency===`Weekly`?t*52/12:t}var dt=[],ft=new Set;function pt(e){let t=e.map(e=>`
    <div class="sub-result-row">
      <div class="sub-result-icon">${lt(e.category)}</div>
      <div class="sub-result-info">
        <div class="sub-result-name">${f(e.name)}</div>
        <div class="sub-result-meta">${f(e.category)} · ${e.frequency} · ${f(e.description||``)}</div>
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
  </div>`}function mt(e){let t=e?(a.subscriptions||[]).find(t=>t.id===e):null;document.getElementById(`sub-modal-title`).textContent=t?`Edit Subscription`:`Add Subscription`,document.getElementById(`sub-edit-id`).value=e||``,document.getElementById(`sub-name`).value=t?t.name:``,document.getElementById(`sub-cat`).value=t&&t.category||`Streaming`,document.getElementById(`sub-freq`).value=t&&t.frequency||`Monthly`,document.getElementById(`sub-amount`).value=t?t.amount:``,document.getElementById(`sub-renewal`).value=t&&t.renewalDate||``,document.getElementById(`sub-modal`).style.display=`flex`}function ht(){document.getElementById(`sub-modal`).style.display=`none`}function gt(){let e=document.getElementById(`sub-name`).value.trim(),t=parseFloat(document.getElementById(`sub-amount`).value),n=document.getElementById(`sub-cat`).value,r=document.getElementById(`sub-freq`).value,i=document.getElementById(`sub-renewal`).value,o=document.getElementById(`sub-edit-id`).value;if(!e||isNaN(t))return;a.subscriptions||(a.subscriptions=[]);let s={name:e,amount:t,category:n,frequency:r,renewalDate:i};if(o){let e=a.subscriptions.findIndex(e=>e.id===o);e!==-1&&(a.subscriptions[e]={...a.subscriptions[e],...s})}else a.subscriptions.push({id:uid(),...s});saveData(a),ht(),renderSubscriptions()}function _t(e){a.subscriptions=(a.subscriptions||[]).filter(t=>t.id!==e),saveData(a),renderSubscriptions()}async function vt(e){let t=e.target.files[0];if(!t)return;let n=P(`toto_ai_key`),r=document.getElementById(`sub-import-status`);if(!n){r&&(r.textContent=`⚠ Please enter your Anthropic API key above first.`,r.style.display=``);return}let i=(await t.text()).split(`
`).filter(e=>e.trim()).slice(0,200);r&&(r.innerHTML=`<span class="sub-spinner"></span> Analysing your transactions…`,r.style.display=``);let o=[...(a.bills||[]).map(e=>e.name),...(a.subscriptions||[]).map(e=>e.name),...(a.budget.expenses||[]).map(e=>e.name)].join(`, `),s=`You are a financial assistant analysing Australian bank statement transactions to find recurring subscriptions and bills.

CSV transactions (up to 200 rows):
${i.join(`
`)}

Already tracked by the user (skip these): ${o||`none`}

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
If nothing new found, return [].`;try{let t=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":n,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:1024,messages:[{role:`user`,content:s}]})});if(!t.ok)throw Error(`API error ${t.status}`);let i=(await t.json()).content[0].text.trim().match(/\[[\s\S]*\]/);if(!i)throw Error(`No JSON found in response`);dt=JSON.parse(i[0]).map((e,t)=>({...e,_key:`import_${Date.now()}_${t}`})),ft=new Set,r&&(r.style.display=`none`),e.target.value=``,renderSubscriptions()}catch(e){r&&(r.textContent=`⚠ ${e.message}`,r.style.display=``)}}function yt(e,t){let n=dt.find(t=>t._key===e);if(n){if(t===`subscription`)a.subscriptions||(a.subscriptions=[]),a.subscriptions.push({id:uid(),name:n.name,amount:n.amount,category:n.category,frequency:n.frequency}),saveData(a);else{let e=ensureMonthOverride(selectedBudgetMonth);e.expenses.push({id:D(e.expenses),name:n.name,amount:n.amount,frequency:`monthly`,category:`Subscriptions`,recurring:!0}),saveData(a)}ft.add(e),renderSubscriptions()}}function bt(e){ft.add(e),renderSubscriptions()}var F={work:{label:`Work`,emoji:`💼`,color:`#dbeafe`,text:`#1e40af`,financial:!1},study:{label:`Study`,emoji:`📚`,color:`#fef3c7`,text:`#92400e`,financial:!1},social:{label:`Social`,emoji:`🎉`,color:`#ede9fe`,text:`#5b21b6`,financial:!0},family:{label:`Family`,emoji:`👨‍👩‍👧`,color:`#fce7f3`,text:`#9d174d`,financial:!1},travel:{label:`Travel`,emoji:`✈️`,color:`#e0f2fe`,text:`#075985`,financial:!0},health:{label:`Health`,emoji:`🏥`,color:`#fef2f2`,text:`#991b1b`,financial:!0},finance:{label:`Finance`,emoji:`💰`,color:`#ecfeff`,text:`#155e75`,financial:!0},home:{label:`Home`,emoji:`🏠`,color:`#ecfeff`,text:`#166534`,financial:!0},school:{label:`School`,emoji:`🏫`,color:`#fff7ed`,text:`#9a3412`,financial:!0},other:{label:`Other`,emoji:`📦`,color:`#f1f5f9`,text:`#475569`,financial:!1}};new Date().toISOString().slice(0,7),new Date().toISOString().slice(0,10);var xt=new Set,St=[{dot:`#2563eb`,bg:`#dbeafe`,text:`#1e40af`},{dot:`#db2777`,bg:`#fce7f3`,text:`#9d174d`},{dot:`#d97706`,bg:`#fef3c7`,text:`#92400e`},{dot:`#7c3aed`,bg:`#ede9fe`,text:`#5b21b6`},{dot:`#16a34a`,bg:`#dcfce7`,text:`#166534`},{dot:`#0891b2`,bg:`#ecfeff`,text:`#155e75`},{dot:`#ea580c`,bg:`#ffedd5`,text:`#9a3412`},{dot:`#be185d`,bg:`#fdf2f8`,text:`#831843`}];function Ct(){let e=a.householdProfile?.members||[],t=a.kids?.profiles||[],n=[],r=0;return e.forEach((e,t)=>{let i=St[r%St.length];e.role===`adult`&&e.name&&(n.push({id:`adult-`+t,name:e.name,emoji:e.emoji||`🧑`,...i}),r++)}),t.forEach((e,t)=>{let i=St[r%St.length];n.push({id:e.id||`kid-`+t,name:e.name,emoji:e.emoji||`🧒`,...i}),r++}),n.length===0&&n.push({id:`adult-0`,name:`Everyone`,emoji:`👨‍👩‍👧`,...St[0]}),n}function wt(e){return!e||e===`everyone`?{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}:Ct().find(t=>t.id===e)||{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}}function Tt(e){return Array.isArray(e.memberIds)?e.memberIds:e.memberId?[e.memberId]:[`everyone`]}function Et(e){return wt(Tt(e).find(e=>e!==`everyone`)||`everyone`)}function Dt(e){let t=Tt(e);return t.includes(`everyone`)||t.length===0?`Everyone`:t.map(e=>wt(e).name).join(`, `)}function Ot(e){if(e.recurrence&&e.recurrence.type&&e.recurrence.type!==`one_time`){let t={daily:`Every day`,weekdays:`Mon–Fri`,weekends:`Sat & Sun`};if(t[e.recurrence.type])return t[e.recurrence.type];if(e.recurrence.type===`specific_days`)return(e.recurrence.days||[]).map(e=>[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`][e]).join(`, `)||`Specific days`;if(e.recurrence.type===`interval`)return`Every ${e.recurrence.intervalDays} days`}return e.recurring&&e.recurring!==`none`?{weekly:`Every week`,fortnightly:`Every 2 weeks`,monthly:`Every month`,quarterly:`Every 3 months`,yearly:`Annually`}[e.recurring]||e.recurring:``}function kt(){let e=a.planner?.events||[];return xt.size===0?e:e.filter(e=>{let t=Tt(e);return t.includes(`everyone`)?!0:[...xt].some(e=>t.includes(e))})}function At(e){return kt().filter(t=>t._recurringSourceId?t.date===e:t.recurrence&&t.recurrence.type!==`one_time`?_recurrenceMatchesDate(t.recurrence,e):t.endDate&&t.endDate>t.date?e>=t.date&&e<=t.endDate:t.date===e)}function jt(e){if(!e)return``;let[t,n]=e.split(`:`).map(Number);return`${t%12||12}:${String(n).padStart(2,`0`)}${t>=12?`pm`:`am`}`}var Mt=new Date().toISOString().slice(0,7);function Nt(){let[e,t]=Mt.split(`-`).map(Number),n=new Date(e,t-2,1);Mt=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,renderForecast()}function Pt(){let[e,t]=Mt.split(`-`).map(Number),n=new Date(e,t,1);Mt=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,renderForecast()}function Ft(){let e=document.getElementById(`forecast-content`);if(!e)return;let t=(a.planner?.events||[]).filter(e=>e.date&&e.date.startsWith(_forecastMonth)),n=getMonthData(_forecastMonth),r=E(n.income)-E(n.expenses),[i,o]=_forecastMonth.split(`-`).map(Number),s=new Date(i,o,0).getDate(),c=[],l=1;for(;l<=s;){new Date(i,o-1,l);let e=l;for(;e<s&&new Date(i,o-1,e+1).getDay()!==1;)e++;c.push({start:l,end:e,events:[]}),l=e+1}t.sort((e,t)=>e.date.localeCompare(t.date)).forEach(e=>{let t=parseInt(e.date.split(`-`)[2]),n=c.find(e=>t>=e.start&&t<=e.end);n&&n.events.push(e)}),t.filter(e=>e.estimates&&e.estimates.length>0);let u=t.filter(e=>!e.estimates||e.estimates.length===0),d=t.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),p=r-d,m=new Date(i,o-1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`}),h=!!P(`toto_ai_key`),_=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:8px">
        <button class="btn btn-sm" onclick="_prevForecastMonth()" style="font-size:16px;padding:2px 10px">‹</button>
        <span style="font-size:15px;font-weight:700;min-width:160px;text-align:center">${m}</span>
        <button class="btn btn-sm" onclick="_nextForecastMonth()" style="font-size:16px;padding:2px 10px">›</button>
      </div>
      ${h&&u.length>0?`
        <button class="btn btn-primary btn-sm" id="estimate-all-btn" onclick="estimateAllEvents()">
          Estimate all (${u.length} events)
        </button>`:``}
    </div>`;if(t.length===0){_+=`<div class="empty" style="margin-top:24px"><div class="empty-icon">📅</div><p>No events planned for ${m}. Add events in the Planner tab.</p>
      <button class="btn btn-primary" style="margin-top:12px" onclick="activateTab('planner')">Go to Planner</button></div>`,e.innerHTML=_;return}_+=`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px">
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Estimated Total</div>
        <div style="font-size:22px;font-weight:800;color:var(--danger)">${g(d)}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Budget Surplus</div>
        <div style="font-size:22px;font-weight:800;color:${r>=0?`var(--success)`:`var(--danger)`}">${g(Math.abs(r))}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">${p>=0?`Remaining After Events`:`Shortfall`}</div>
        <div style="font-size:22px;font-weight:800;color:${p>=0?`var(--success)`:`var(--danger)`}">${p>=0?``:`-`}${g(Math.abs(p))}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Events</div>
        <div style="font-size:22px;font-weight:800">${t.length}</div>
        ${u.length>0?`<div style="font-size:11px;color:var(--warning);margin-top:2px">${u.length} not yet estimated</div>`:``}
      </div>
    </div>`,c.forEach((e,t)=>{if(e.events.length===0)return;let n=e.events.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),r=new Date(i,o-1,e.start).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),a=new Date(i,o-1,e.end).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});_+=`
      <div class="section" style="margin-bottom:16px">
        <div class="section-header">
          <div>
            <div class="section-title">Week ${t+1}</div>
            <div class="section-subtitle">${r} – ${a}</div>
          </div>
          <span style="font-size:15px;font-weight:700;color:${n>0?`var(--danger)`:`var(--text-muted)`}">${n>0?g(n):`No estimates`}</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Event</th><th>Category</th><th class="amount">Estimated</th><th></th></tr></thead>
            <tbody>
              ${e.events.map(e=>{let t=F[e.category]||F.other,n=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),r=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`}),i=e.estimates&&e.estimates.length>0;return`<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${r}</td>
                  <td style="font-weight:500">${f(e.title)}</td>
                  <td><span style="display:inline-block;padding:2px 8px;border-radius:99px;background:${t.color};color:${t.text};font-size:11px;font-weight:600">${t.label}</span></td>
                  <td class="amount" style="font-weight:600;${i?``:`color:var(--text-muted)`}">${i?g(n):`—`}</td>
                  <td style="text-align:right">
                    ${i?`<details style="font-size:11px;color:var(--text-muted)"><summary style="cursor:pointer">breakdown</summary>
                          <div style="padding:4px 0">${e.estimates.filter(e=>e.accepted).map(e=>`<div style="display:flex;justify-content:space-between;gap:12px;padding:2px 0"><span>${f(e.name)}</span><span>${g(e.amount)}</span></div>`).join(``)}</div>
                        </details>`:h?`<button class="btn btn-sm" style="font-size:11px" onclick="estimatePlannerEvent('${e.id}')">Estimate</button>`:`<span style="font-size:11px;color:var(--text-muted)">No API key</span>`}
                  </td>
                </tr>`}).join(``)}
            </tbody>
          </table>
        </div>
      </div>`});let v={};t.forEach(e=>{(e.estimates||[]).filter(e=>e.accepted).forEach(e=>{let t=e.category||`Other`;v[t]=(v[t]||0)+(e.amount||0)})});let y=Object.entries(v).sort((e,t)=>t[1]-e[1]);y.length>0&&(_+=`
      <div class="section">
        <div class="section-header"><div class="section-title">By Category</div></div>
        <div style="padding:16px 20px">
          ${y.map(([e,t])=>{let n=d>0?t/d*100:0;return`<div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                <span style="font-weight:500">${e}</span>
                <span style="font-weight:600">${g(t)} <span style="font-weight:400;color:var(--text-muted)">${Math.round(n)}%</span></span>
              </div>
              <div style="height:6px;background:var(--border);border-radius:4px;overflow:hidden">
                <div style="height:100%;width:${n.toFixed(1)}%;background:#0891b2;border-radius:4px"></div>
              </div>
            </div>`}).join(``)}
        </div>
      </div>`),e.innerHTML=_}async function It(){let e=P(`toto_ai_key`);if(!e)return;let t=(a.planner?.events||[]).filter(e=>e.date&&e.date.startsWith(_forecastMonth)&&(!e.estimates||e.estimates.length===0));if(!t.length)return;let n=document.getElementById(`estimate-all-btn`);n&&(n.textContent=`⏳ Estimating…`,n.disabled=!0);let r=(a.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,i=(a.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,o=t.map(e=>({id:e.id,title:e.title,category:(F[e.category]||F.other).label,date:e.date,notes:e.notes||``})),s=`You are a family finance assistant for an Australian family (${r} adult${r>1?`s`:``}, ${i} child${i===1?``:`ren`}).

Estimate realistic costs for each of these events:
${JSON.stringify(o)}

Return ONLY a JSON array — one entry per event, each containing the event id and an items array:
[{"id":"event-id","items":[{"name":"Description","amount":150,"category":"Food & Dining"}]}]

Rules:
- Use realistic 2025 Australian dollar amounts
- Round to nearest $5 or $10
- Maximum 6 items per event
- Consider family size
- Categories: Transport, Accommodation, Food & Dining, Entertainment, Gifts, Clothing, Health, Education, Shopping, Other
- No markdown, no code fences, just raw JSON`;try{let t=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":e,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:4096,messages:[{role:`user`,content:s}]})});if(!t.ok)throw Error(`API ${t.status}`);let n=(await t.json()).content[0].text.replace(/```[\w]*\n?/g,``).trim().match(/\[[\s\S]*\]/);if(!n)throw Error(`No JSON`);JSON.parse(n[0]).forEach(e=>{let t=(a.planner?.events||[]).find(t=>t.id===e.id);t&&e.items&&(t.estimates=e.items.map((e,t)=>({id:`est-${Date.now()}-${t}`,name:e.name,amount:Number(e.amount)||0,category:e.category||`Other`,accepted:!0})))}),saveData(a),Ft()}catch(e){n&&(n.textContent=`Estimate all (${t.length} events)`,n.disabled=!1),console.error(`Batch estimate error:`,e)}}function I(){let e=document.getElementById(`planner-content`);if(!e)return;a.planner||(a.planner={events:[]});let t=new Date().toISOString().slice(0,10),n=Ct(),r={id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`},i=[...n,r],o=i.map(e=>e.name[0].toUpperCase()),s=i.map((e,t)=>{if(e.id===`everyone`)return`👨‍👩‍👧`;let n=e.name[0].toUpperCase();return o.filter(e=>e===n).length>1?(e.name[0]+(e.name[1]||``)).toUpperCase():n}),c=i.map((e,t)=>{let n=e.id===`everyone`,r=n?_plannerFilterMembers.size===0:_plannerFilterMembers.has(e.id),i=!r&&_plannerFilterMembers.size>0&&!n,a=n?`<span style="font-size:14px">👨‍👩‍👧</span>`:`<span>${s[t]}</span>`;return`<div class="pl-legend-chip ${r?`active`:``} ${i?`dimmed`:``}"
      onclick="_plannerToggleFilter('${e.id}')">
      <div class="pl-chip-avatar" style="background:${e.bg};color:${e.text}">${a}</div>
      <span>${e.name}</span>
    </div>`}).join(``),l=``;l=_plannerView===`month`?Lt():Rt();let u=new Date;u.setDate(u.getDate()+30);let d=u.toISOString().slice(0,10),p=kt().filter(e=>e.date>=t&&e.date<=d),m=0,h=Object.entries(F).map(([e,t])=>{let n=p.filter(t=>t.category===e);n.length&&(m+=n.length);let r=n[0],i=r?f(r.title)+(r.date?` · ${new Date(r.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`:``):`Nothing planned`;return`<div class="pl-life-tile" onclick="_plannerOpenLifeSheet('${e}')">
      <div class="pl-life-tile-top">
        <div class="pl-life-tile-icon" style="background:${t.color||`#F4F4F5`}">${t.emoji}</div>
        <div>
          <div class="pl-life-tile-name">${t.label}</div>
          <div class="pl-life-tile-count">${n.length} event${n.length===1?``:`s`}</div>
        </div>
      </div>
      <div class="pl-life-tile-next">${i}</div>
    </div>`}).join(``),g=pn(),_=g.map(e=>{let t=e.days<0?`Now!`:e.days===0?`Today!`:e.days===1?`Tomorrow`:`In ${e.days} days`,n=e.days<=0?`#ef4444`:e.days===1?`var(--good)`:e.days<=3?`#f59e0b`:`var(--iris-1)`;return`<div class="pl-nudge-tile">
      <div class="pl-nudge-tile-icon" style="background:${e.days<=0?`#FEF2F2`:e.days===1?`#ECFDF5`:e.days<=3?`#FFF7ED`:`#EEF2FF`}">${e.emoji}</div>
      <div class="pl-nudge-tile-body">
        <div class="pl-nudge-tile-title">${f(e.title)}</div>
        <div class="pl-nudge-tile-sub">${f(e.body)}</div>
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
        ${Ut(_plannerSelectedDay)}

        <!-- Life areas -->
        <div class="pl-section-card">
          <div class="pl-section-card-hdr" onclick="_plannerToggleSection('life-areas')">
            <div class="pl-section-card-title">
              Life Areas
              <span style="font-size:11px;font-weight:700;background:var(--iris-1);color:#fff;padding:1px 8px;border-radius:99px;letter-spacing:0">${m}</span>
            </div>
            <button class="pl-section-card-toggle">${v?`Hide`:`Show`}</button>
          </div>
          ${v?`<div class="pl-section-card-body"><div class="pl-life-grid">${h}</div></div>`:``}
        </div>

        <!-- Nudges -->
        ${g.length>0?`
        <div class="pl-section-card">
          <div class="pl-section-card-hdr" onclick="_plannerToggleSection('nudge')">
            <div class="pl-section-card-title">
              Heads up 🐕
              <span style="font-size:11px;font-weight:700;background:#f59e0b;color:#fff;padding:1px 8px;border-radius:99px;letter-spacing:0">${g.length}</span>
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

    </div>`}function Lt(){let[e,t]=_plannerMonth.split(`-`).map(Number),n=new Date().toISOString().slice(0,10),r=new Date(e,t-1,1).getDay(),i=r===0?6:r-1,a=new Date(e,t,0).getDate(),o=new Date(e,t-1,0).getDate(),s=[];for(let n=i-1;n>=0;n--){let r=o-n,i=t-1||12,a=i===12?e-1:e;s.push({dateStr:`${a}-${String(i).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`,day:r,muted:!0})}for(let n=1;n<=a;n++)s.push({dateStr:`${e}-${String(t).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,day:n,muted:!1});let c=s.length%7==0?0:7-s.length%7;for(let n=1;n<=c;n++){let r=t+1>12?1:t+1,i=r===1?e+1:e;s.push({dateStr:`${i}-${String(r).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,day:n,muted:!0})}return`<div class="pl-month-grid">${s.map(e=>{let t=e.dateStr===n,r=e.dateStr===_plannerSelectedDay,i=e.dateStr?At(e.dateStr):[],a=[...new Set(i.flatMap(e=>Tt(e)))].filter(e=>e!==`everyone`).slice(0,3).map(e=>`<div class="pl-cell-dot" style="background:${wt(e).dot}"></div>`).join(``),o=i.length>3?`<div style="font-size:8px;color:var(--text-muted);font-weight:600">+</div>`:``;return`<div class="pl-cal-cell ${e.muted?`muted`:``} ${t?`today`:``} ${r?`selected`:``}"
                 onclick="_plannerSelectDay('${e.dateStr}')">
      <div class="pl-cell-num">${e.day}</div>
      <div class="pl-cell-dots">${a}${o}</div>
    </div>`}).join(``)}</div>`}function Rt(){let e=new Date(_plannerSelectedDay+`T12:00:00`),t=e.getDay(),n=new Date(e);n.setDate(e.getDate()-(t===0?6:t-1));let r=new Date().toISOString().slice(0,10),i=[`S`,`M`,`T`,`W`,`T`,`F`,`S`];return`<div class="week-strip">${Array.from({length:7},(e,t)=>{let r=new Date(n);return r.setDate(n.getDate()+t),{date:r,dateStr:r.toISOString().slice(0,10)}}).map(({date:e,dateStr:t})=>{let n=t===r,a=t===_plannerSelectedDay,o=At(t),s=o.length>0,c=[...new Set(o.flatMap(e=>Tt(e)))].filter(e=>e!==`everyone`).slice(0,3),l=a?`rgba(255,255,255,0.6)`:c.length?wt(c[0]).dot:`#C4C2D4`;return`<div class="${a?`ws-day selected`+(n?` today-outline`:``):n?`ws-day today-outline`:`ws-day`}${s?` has`:``}" onclick="_plannerSelectDay('${t}')">
      <div class="ws-init">${i[e.getDay()]}</div>
      <div class="ws-num">${e.getDate()}</div>
      <div class="ws-dot" style="${s?`background:${l}`:``}"></div>
    </div>`}).join(``)}</div>`}function zt(e){let t=F[e.category]||F.other,n=_plannerExpanded.has(e.id),r=e.estimates||[],i=r.filter(e=>e.accepted),a=i.reduce((e,t)=>e+(t.amount||0),0),o=r.reduce((e,t)=>e+(t.amount||0),0),s=e.pushed?`<span class="planner-pushed-badge">✓ In budget</span>`:r.length>0?`<span style="font-size:12px;color:var(--text-muted)">$${a.toLocaleString(`en-AU`)}</span>`:``,c=Ot(e);c&&(s=`<span class="recurring-badge">🔄 ${c}</span> `+s);let l=``;return n&&(l=`<div class="planner-event-body">`,e.notes&&(l+=`<p class="planner-notes">${f(e.notes)}</p>`),r.length>0?(l+=r.map(t=>`
        <div class="planner-estimate-row">
          <div class="planner-estimate-check ${t.accepted?`accepted`:``}" onclick="togglePlannerEstimate('${e.id}','${t.id}')">
            ${t.accepted?`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`:``}
          </div>
          <div class="planner-estimate-name"><div>${f(t.name)}</div><div class="planner-estimate-cat">${f(t.category)}</div></div>
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
        <div class="planner-event-title">${f(e.title)}</div>
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
  </div>`}function Bt(){let[e,t]=_plannerMonth.split(`-`).map(Number),n=t===1?e-1:e,r=t===1?12:t-1;_plannerMonth=`${n}-${String(r).padStart(2,`0`)}`,_plannerSelectedDay=`${n}-${String(r).padStart(2,`0`)}-01`,I()}function Vt(){let[e,t]=_plannerMonth.split(`-`).map(Number),n=t===12?e+1:e,r=t===12?1:t+1;_plannerMonth=`${n}-${String(r).padStart(2,`0`)}`,_plannerSelectedDay=`${n}-${String(r).padStart(2,`0`)}-01`,I()}function Ht(e){_plannerSelectedDay=e,_plannerMonth=e.slice(0,7),I()}function Ut(e){let t=new Date(e+`T12:00:00`),n=e===new Date().toISOString().slice(0,10)?`Today`:t.toLocaleDateString(`en-AU`,{weekday:`long`}),r=t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`long`,year:`numeric`}),i=At(e).sort((e,t)=>e.allDay&&!t.allDay?-1:!e.allDay&&t.allDay?1:(e.time||`99:99`).localeCompare(t.time||`99:99`)),a=``;return a=i.length===0?`<div class="pl-agenda-empty">Nothing planned — enjoy the quiet ☀️<br><span style="color:var(--iris-1);cursor:pointer;font-weight:600;font-size:13px" onclick="openPlannerModal(null,'${e}')">+ Add an event</span></div>`:`<div class="pl-agenda-list">${i.map(t=>{let n=Et(t),r=F[t.category]||F.other,i=t.allDay||!t.time?`All day`:jt(t.time),a=Dt(t),o=new Date().getHours()*60+new Date().getMinutes(),s=t.time?parseInt(t.time.split(`:`)[0])*60+parseInt(t.time.split(`:`)[1]):-1,c=e===new Date().toISOString().slice(0,10)&&s>=0&&o>=s&&o<s+90,l=r.color||`#f1f5f9`,u=r.text||`#475569`;return`<div class="pl-agenda-ev">
        <div class="pl-agenda-time-col">
          <span class="pl-agenda-time">${i}</span>
        </div>
        <div class="pl-agenda-timeline">
          <div class="pl-agenda-dot${c?` now`:``}" style="color:${u};background:${c?u:l}"></div>
          <div class="pl-agenda-line"></div>
        </div>
        <div class="pl-agenda-card" style="background:${l};border-color:${u}22" onclick="_plannerOpenDetail('${t.id}')">
          <div class="pl-agenda-card-title">${f(t.title)}</div>
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
  </div>`}function Wt(e){_plannerMonth=e.slice(0,7),_plannerSelectedDay=e,activateTab(`planner`)}function Gt(){let e=new Date().toISOString().slice(0,10);_plannerMonth=e.slice(0,7),_plannerSelectedDay=e,I()}function Kt(e){_plannerView=e,_plannerCollapseState[`life-areas`]=e===`week`,_plannerCollapseState.nudge=e===`week`,I()}function qt(e){_plannerCollapseState[e]=!_plannerCollapseState[e],I()}function Jt(e){e===`everyone`?_plannerFilterMembers.clear():_plannerFilterMembers.has(e)?_plannerFilterMembers.delete(e):_plannerFilterMembers.add(e),I()}function Yt(e){let t=document.getElementById(`pl-day-sheet-overlay`);if(!t)return;let n=new Date(e+`T12:00:00`),r=new Date().toISOString().slice(0,10);document.getElementById(`pl-sheet-title`).textContent=e===r?`Today`:n.toLocaleDateString(`en-AU`,{weekday:`long`}),document.getElementById(`pl-sheet-date`).textContent=n.toLocaleDateString(`en-AU`,{day:`numeric`,month:`long`,year:`numeric`}),document.getElementById(`pl-sheet-add-btn`).dataset.date=e,Xt(e),t.classList.add(`open`)}function Xt(e){let t=At(e).sort((e,t)=>(e.time||`99:99`).localeCompare(t.time||`99:99`)),n=document.getElementById(`pl-sheet-list`);if(n){if(t.length===0){n.innerHTML=`<div class="pl-sheet-empty">Nothing planned. <span style="color:var(--primary);cursor:pointer;font-weight:600" onclick="_plannerOpenModalFromSheet()">Add an event →</span></div>`;return}n.innerHTML=t.map((e,t)=>{let n=Et(e),r=F[e.category]||F.other,i=Dt(e),a=e.allDay||!e.time?`All day`:jt(e.time);return`<div class="pl-sheet-ev" onclick="_plannerOpenDetail('${e.id}')">
      <div class="pl-sheet-ev-time">${a}</div>
      <div class="pl-sheet-ev-bar" style="background:${n.dot}"></div>
      <div style="flex:1;min-width:0">
        <div class="pl-sheet-ev-title">${f(e.title)}</div>
        <div class="pl-sheet-ev-meta">${i} · ${r.emoji} ${r.label}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4D4D8" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>`}).join(``)}}function Zt(){let e=document.getElementById(`pl-day-sheet-overlay`);e&&e.classList.remove(`open`)}function Qt(e){e.target===document.getElementById(`pl-day-sheet-overlay`)&&Zt()}function $t(){let e=document.getElementById(`pl-sheet-add-btn`)?.dataset?.date||_plannerSelectedDay;Zt(),Tn(null,e)}function en(e){let t=F[e];if(!t)return;let n=new Date().toISOString().slice(0,10),r=(a.planner?.events||[]).filter(t=>t.category===e&&t.date>=n).sort((e,t)=>e.date.localeCompare(t.date));document.getElementById(`pl-life-sheet-icon`).textContent=t.emoji,document.getElementById(`pl-life-sheet-title`).textContent=t.label,document.getElementById(`pl-life-sheet-count`).textContent=r.length+` upcoming`;let i=``;if(r.length===0)i=`<div class="pl-sheet-empty">No upcoming ${t.label.toLowerCase()} events.</div>`;else{let e=``;r.forEach(t=>{let n=t.date.slice(0,7);if(n!==e){let r=new Date(t.date+`T12:00:00`);i+=`<div class="pl-life-day-hdr">${r.toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</div>`,e=n}let r=Et(t),a=Dt(t),o=new Date(t.date+`T12:00:00`);i+=`<div class="pl-life-ev-row" onclick="_plannerCloseLifeSheet();_plannerOpenDetail('${t.id}')">
        <div class="pl-life-ev-date">${o.toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`})}</div>
        <div class="pl-life-ev-bar" style="background:${r.dot}"></div>
        <div class="pl-life-ev-content">
          <div class="pl-life-ev-title">${f(t.title)}</div>
          <div class="pl-life-ev-meta">${a}${t.time?` · `+jt(t.time):``}</div>
        </div>
      </div>`})}document.getElementById(`pl-life-sheet-list`).innerHTML=i,document.getElementById(`pl-life-overlay`).classList.add(`open`)}function tn(){document.getElementById(`pl-life-overlay`)?.classList.remove(`open`)}function nn(e){e.target===document.getElementById(`pl-life-overlay`)&&tn()}function rn(e){let t=(a.planner?.events||[]).find(t=>t.id===e);if(!t)return;_plannerDetailEvId=e;let n=Et(t),r=F[t.category]||F.other,i=Tt(t);document.getElementById(`pl-detail-title`).textContent=t.title,document.getElementById(`pl-detail-color-bar`).style.background=n.dot;let o=new Date(t.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}),s=t.allDay?`All day`:t.time?jt(t.time):``;!t.allDay&&t.endTime&&(s+=` – `+jt(t.endTime));let c=(i.includes(`everyone`)?[{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}]:i.map(e=>wt(e))).map(e=>`<span style="display:inline-flex;align-items:center;gap:5px;background:${e.bg};color:${e.text};padding:4px 10px;border-radius:99px;font-size:12px;font-weight:600">${e.emoji} ${e.name}</span>`).join(` `),l=(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),u=[{icon:`📅`,label:`Date`,value:o},s?{icon:`🕐`,label:`Time`,value:s}:null,t.location?{icon:`📍`,label:`Address`,value:f(t.location)}:null,{icon:`👥`,label:`Who`,value:`<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">${c}</div>`},{icon:r.emoji,label:`Category`,value:r.label},Ot(t)?{icon:`🔄`,label:`Repeats`,value:Ot(t)}:null,l>0?{icon:`💰`,label:`Est. cost`,value:`$${l.toLocaleString(`en-AU`)}`}:null,t.notes?{icon:`📝`,label:`Notes`,value:f(t.notes)}:null].filter(Boolean);document.getElementById(`pl-detail-body`).innerHTML=u.map(e=>`<div class="pl-detail-row">
      <div class="pl-detail-icon">${e.icon}</div>
      <div style="flex:1;min-width:0">
        <div class="pl-detail-row-label">${e.label}</div>
        <div class="pl-detail-row-value">${e.value}</div>
      </div>
    </div>`).join(``)+(r.financial?`<button class="planner-ai-btn" style="width:100%;justify-content:center;margin-top:16px" onclick="_plannerCloseDetail();estimatePlannerEvent('${e}')">✦ Estimate costs with AI</button>`:``)+`<button class="pl-detail-share-btn" onclick="_plannerOpenShare('${e}')">🔗 Share this event</button>`,document.getElementById(`pl-detail-overlay`).classList.add(`open`)}function an(){document.getElementById(`pl-detail-overlay`)?.classList.remove(`open`),_plannerDetailEvId=null}function on(e){e.target===document.getElementById(`pl-detail-overlay`)&&an()}function sn(){let e=_plannerDetailEvId;an(),e&&Tn(e)}function cn(e){let t=(a.planner?.events||[]).find(t=>t.id===e);if(!t)return;let n=`https://toto.app/event/${t.title.toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/(^-|-$)/g,``)}-${Math.random().toString(36).slice(2,10)}`,r=document.getElementById(`pl-share-sub`),i=document.getElementById(`pl-share-url`),o=document.getElementById(`pl-share-copy-btn`);r&&(r.textContent=t.title),i&&(i.textContent=n),o&&(o.textContent=`Copy`,o.classList.remove(`copied`)),document.getElementById(`pl-share-overlay`)?.classList.add(`open`)}function ln(){document.getElementById(`pl-share-overlay`)?.classList.remove(`open`)}function un(e){e.target===document.getElementById(`pl-share-overlay`)&&ln()}function dn(){let e=document.getElementById(`pl-share-url`)?.textContent;e&&navigator.clipboard?.writeText(e).catch(()=>{});let t=document.getElementById(`pl-share-copy-btn`);t&&(t.textContent=`Copied!`,t.classList.add(`copied`),setTimeout(()=>{t.textContent=`Copy`,t.classList.remove(`copied`)},2e3))}function fn(e){let t=document.getElementById(`pl-share-url`)?.textContent||``,n=(a.planner?.events||[]).find(e=>e.id===_plannerDetailEvId),r=n?`${n.title} — ${t}`:t;e===`sms`&&window.open(`sms:?body=${encodeURIComponent(r)}`),e===`whatsapp`&&window.open(`https://wa.me/?text=${encodeURIComponent(r)}`),e===`email`&&window.open(`mailto:?subject=${encodeURIComponent(n?.title||`Event`)}&body=${encodeURIComponent(r)}`)}function pn(){function e(e){return Math.ceil((e-new Date().setHours(0,0,0,0))/864e5)}function t(e,t,n,r){let i=new Date(e,t,1);for(;i.getDay()!==n;)i.setDate(i.getDate()+1);return i.setDate(i.getDate()+(r-1)*7),i}let n=new Date().getFullYear();return[{emoji:`🧾`,title:`EOFY`,days:e(new Date(n,5,30)),body:`Tax time — accountant fees, donations, prepayments`},{emoji:`🎄`,title:`Christmas`,days:e(new Date(n,11,25)),body:`Gifts, travel, food — start budgeting early`},{emoji:`💐`,title:`Mother's Day`,days:e(t(n,4,0,2)),body:`Gift, brunch or dinner for Mum`},{emoji:`👔`,title:`Father's Day`,days:e(t(n,8,0,1)),body:`Gift or outing for Dad`}].filter(e=>e.days>=-3&&e.days<=60).sort((e,t)=>e.days-t.days)}function mn(e){_plannerExpanded.has(e)?_plannerExpanded.delete(e):_plannerExpanded.add(e),I()}function hn(e,t){let n=(a.planner?.events||[]).find(t=>t.id===e);if(!n)return;let r=(n.estimates||[]).find(e=>e.id===t);r&&(r.accepted=!r.accepted,saveData(a),I())}function gn(e){let t=(a.planner?.events||[]).find(t=>t.id===e);if(!t)return;let n=(t.estimates||[]).filter(e=>e.accepted);if(!n.length)return;let r=t.date.slice(0,7);a.budget.suggestions||(a.budget.suggestions=[]),a.budget.suggestions=a.budget.suggestions.filter(e=>e.eventId!==t.id),n.forEach(e=>{a.budget.suggestions.push({id:`sug-`+Date.now()+`-`+Math.random().toString(36).slice(2,5),month:r,eventId:t.id,eventTitle:t.title,estId:e.id,name:e.name,amount:e.amount,category:e.category,status:`pending`})}),t.pushed=`suggested`,saveData(a),_plannerExpanded.add(e),I();let i=new Date(r+`-15`).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`});r===selectedBudgetMonth?safeRender(renderBudget):confirm(`${n.length} suggestion${n.length>1?`s`:``} sent to ${i} budget.\n\nGo to Monthly Budget to approve them?`)&&(selectedBudgetMonth=r,activateTab(`budget`))}function _n(e){let t=(a.budget.suggestions||[]).find(t=>t.id===e);if(!t)return;let n=ensureMonthOverride(t.month);n.expenses.push({id:D(n.expenses),name:`${t.name} (${t.eventTitle})`,amount:t.amount,frequency:`monthly`,category:t.category,recurring:!1,_plannerEventId:t.eventId}),t.status=`approved`;let r=(a.planner?.events||[]).find(e=>e.id===t.eventId);r&&(a.budget.suggestions||[]).filter(e=>e.eventId===r.id&&e.status===`pending`).length===0&&(r.pushed=!0),saveData(a),safeRender(renderBudget),safeRender(I)}function vn(e){let t=(a.budget.suggestions||[]).find(t=>t.id===e);if(!t)return;t.status=`dismissed`;let n=(a.planner?.events||[]).find(e=>e.id===t.eventId);n&&(a.budget.suggestions||[]).filter(e=>e.eventId===n.id&&e.status===`pending`).length===0&&(n.pushed=n.pushed===`suggested`?!1:n.pushed),saveData(a),safeRender(renderBudget)}function yn(e){let t=(a.budget?.suggestions||[]).filter(t=>t.month===e&&t.status===`pending`);if(!t.length)return``;let n={};t.forEach(e=>{n[e.eventTitle]||(n[e.eventTitle]=[]),n[e.eventTitle].push(e)});let r=t.map(e=>`
    <div class="suggestion-row">
      <span class="suggestion-event-tag">📅 ${f(e.eventTitle)}</span>
      <div style="flex:1;min-width:0">
        <div class="suggestion-name">${f(e.name)}</div>
        <div class="suggestion-cat">${e.category}</div>
      </div>
      <span class="suggestion-amount">${g(e.amount)}</span>
      <button class="suggestion-approve" onclick="approveSuggestion('${e.id}')">✓ Approve</button>
      <button class="suggestion-dismiss" onclick="dismissSuggestion('${e.id}')">✕</button>
    </div>`).join(``);return`<div class="suggestion-inbox">
    <div class="suggestion-inbox-header">
      <span style="font-size:16px">📥</span>
      <span class="suggestion-inbox-title">Suggested from Planner</span>
      <span class="suggestion-inbox-count">${t.length} pending</span>
    </div>
    ${r}
  </div>`}function bn(e){let t=(a.planner?.events||[]).find(t=>t.id===e);t&&(Object.values(a.budget.months||{}).forEach(t=>{t.expenses=(t.expenses||[]).filter(t=>t._plannerEventId!==e)}),a.budget.expenses=(a.budget.expenses||[]).filter(t=>t._plannerEventId!==e),a.budget.suggestions=(a.budget.suggestions||[]).filter(t=>t.eventId!==e),t.pushed=!1,saveData(a),I(),safeRender(renderBudget))}function xn(e){confirm(`Delete this event and remove it from the budget?`)&&(bn(e),a.planner.events=a.planner.events.filter(t=>t.id!==e),_plannerExpanded.delete(e),saveData(a),closeModal(),I())}async function Sn(e){let t=P(`toto_ai_key`);if(!t){alert(`Add your AI API key in Settings to use cost estimation.`);return}let n=(a.planner?.events||[]).find(t=>t.id===e);if(!n)return;let r=document.getElementById(`ai-btn-${e}`);r&&(r.disabled=!0,r.textContent=`✦ Estimating…`);let i=(a.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,o=(a.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,s=new Date(n.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`long`,year:`numeric`}),c=`You are a family finance assistant for an Australian family. Suggest realistic cost estimates for the following life event.

Event: ${n.title}
Category: ${(F[n.category]||F.other).label}
Date: ${s}
Notes: ${n.notes||`none provided`}
Family size: ${i} adult(s), ${o} child(ren)

Return ONLY a JSON array — no explanation, no markdown fences:
[{"name":"Item description","amount":150,"category":"Category"}]

Rules:
- Use realistic 2025 Australian dollar amounts
- Round to nearest $5 or $10
- Maximum 6 items
- Consider family size when relevant
- Use ONLY these categories: Transport, Accommodation, Food & Dining, Entertainment, Gifts, Clothing, Health, Education, Shopping, Other`;try{let r=((await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:512,messages:[{role:`user`,content:c}]})})).json()).content?.[0]?.text||``).match(/\[[\s\S]*?\]/);if(!r)throw Error(`No JSON array in response`);n.estimates=JSON.parse(r[0]).map((e,t)=>({id:`est-${Date.now()}-${t}`,name:e.name,amount:Number(e.amount)||0,category:e.category||`Other`,accepted:!0})),_plannerExpanded.add(e),saveData(a),I()}catch(e){console.error(`Planner estimate error:`,e),r&&(r.disabled=!1,r.innerHTML=`✦ Try again`),alert(`Could not estimate costs. Check your AI API key in Settings.`)}}var L=new Set,Cn=`start`,wn=new Date().toISOString().slice(0,7);function Tn(e,t){let n=e?(a.planner?.events||[]).find(t=>t.id===e):null,r=t||_plannerSelectedDay||new Date().toISOString().slice(0,10);L=new Set,Cn=`start`,wn=(n?.date||r).slice(0,7),n?Tt(n).forEach(e=>L.add(e)):_plannerFilterMembers.size>0&&_plannerFilterMembers.forEach(e=>L.add(e)),document.getElementById(`modal-title`).textContent=n?`Edit Event`:`Add Event`,document.getElementById(`modal-body`).innerHTML=`
    <!-- Who -->
    <div class="form-group">
      <label class="form-label">Who</label>
      <div id="pm-member-picker" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px"></div>
    </div>
    <!-- Title -->
    <div class="form-group">
      <label class="form-label">Title *</label>
      <input class="form-input" id="pe-title" placeholder="e.g. Mia's swimming lesson" value="${n?p(n.title):``}">
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
          <span id="pm-start-display">${Dn(n?n.date:r)}</span>
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
          <span id="pm-end-display">${n?.endDate?Dn(n.endDate):`Same day`}</span>
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
        ${Object.entries(F).map(([e,t])=>`<option value="${e}" ${(n?.category||`other`)===e?`selected`:``}>${t.emoji} ${t.label}</option>`).join(``)}
      </select>
    </div>
    <!-- Recurrence (shared engine) -->
    ${_routineRecurrenceFormHtml(n?.recurrence||{type:`one_time`,startDate:n?.date||r})}
    <!-- Address -->
    <div class="form-group">
      <label class="form-label">Address <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="pe-location" placeholder="e.g. 123 Main St, Sydney" value="${n?p(n.location||``):``}">
    </div>
    <!-- Notes -->
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(helps AI estimate costs)</span></label>
      <textarea class="form-input" id="pe-notes" rows="2" placeholder="e.g. Flying from Sydney, 5 nights, gift budget ~$100">${n?f(n.notes||``):``}</textarea>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${n?`<button class="btn btn-danger" onclick="deletePlannerEvent('${n.id}')">Delete</button>`:`<span></span>`}
    <div style="display:flex;gap:8px">
      <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="pm-save-btn" onclick="savePlannerEvent(${n?`'${n.id}'`:`null`})">Save</button>
    </div>`,document.getElementById(`modal-footer`).style.justifyContent=`space-between`,document.getElementById(`modal-overlay`).classList.remove(`hidden`),On(),An(),setTimeout(()=>{_routineRecurrenceSummaryUpdate()},100)}function En(e){return e?new Date(e+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`}):``}function Dn(e){return e?new Date(e+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}):``}function On(){let e=Ct(),t={id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`},n=document.getElementById(`pm-member-picker`);if(!n)return;n.innerHTML=[t,...e].map(e=>`<button type="button" style="display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:99px;font-size:12px;font-weight:600;border:2px solid ${(e.id===`everyone`?L.size===0:L.has(e.id))?e.dot:`transparent`};background:${e.bg};color:${e.text};cursor:pointer;transition:all .15s" onclick="_pmToggleMember('${e.id}')">
      ${e.emoji} ${e.name}
    </button>`).join(``);let r=[...L][0],i=r?e.find(e=>e.id===r):null,a=document.getElementById(`pm-save-btn`);a&&(a.style.background=i?i.dot:``)}function kn(e){e===`everyone`?L.clear():L.has(e)?L.delete(e):L.add(e),On()}function An(){let e=document.getElementById(`pe-allday`)?.checked,t=document.getElementById(`pm-start-time-col`),n=document.getElementById(`pm-end-time-col`);t&&(t.style.display=e?`none`:``),n&&(n.style.display=e?`none`:``)}function jn(){}function Mn(e){Cn=e;let t=e===`end`?`pm-end-trigger`:`pm-start-trigger`,n=document.getElementById(t);if(!n)return;let r=document.getElementById(`pm-dp-popover`);r||(r=document.createElement(`div`),r.id=`pm-dp-popover`,r.style.cssText=`display:none;position:fixed;width:260px;background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.16);padding:14px;z-index:9999`,document.body.appendChild(r),document.addEventListener(`click`,Nn)),wn=(document.getElementById(`pe-date`)?.value||new Date().toISOString().slice(0,10)).slice(0,7),Pn(r);let i=n.getBoundingClientRect();r.style.top=i.bottom+6+`px`,r.style.left=Math.max(8,Math.min(i.left,window.innerWidth-272))+`px`,r.style.display=`block`}function Nn(e){let t=document.getElementById(`pm-dp-popover`),n=document.getElementById(`pm-start-trigger`),r=document.getElementById(`pm-end-trigger`);t&&!t.contains(e.target)&&e.target!==n&&e.target!==r&&!n?.contains(e.target)&&!r?.contains(e.target)&&t&&(t.style.display=`none`)}function Pn(e){if(e||(e=document.getElementById(`pm-dp-popover`)),!e)return;let[t,n]=wn.split(`-`).map(Number),r=new Date().toISOString().slice(0,10),i=Cn===`end`?document.getElementById(`pe-end-date`)?.value||``:document.getElementById(`pe-date`)?.value||``,a=new Date(t,n-1,1).getDay(),o=a===0?6:a-1,s=new Date(t,n,0).getDate(),c=new Date(t,n-1,0).getDate(),l=new Date(t,n-1,15).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`}),u=[];for(let e=o-1;e>=0;e--)u.push({day:c-e,muted:!0,dateStr:null});for(let e=1;e<=s;e++){let r=`${t}-${String(n).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`;u.push({day:e,muted:!1,dateStr:r})}let d=u.length%7==0?0:7-u.length%7;for(let e=1;e<=d;e++)u.push({day:e,muted:!0,dateStr:null});let f=u.map(e=>{let t=e.dateStr&&e.dateStr===i,n=e.dateStr===r,a=t?`background:#2563eb;color:#fff;border-radius:50%`:n?`color:#2563eb;font-weight:700`:e.muted?`color:#d1d5db`:``;return`<button type="button" onclick="_pmDpSelect('${e.dateStr}')" ${e.dateStr?``:`disabled`} style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:12px;border:none;background:none;cursor:${e.dateStr?`pointer`:`default`};font-family:inherit;${a}">${e.day}</button>`}).join(``);e.innerHTML=`
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
    </div>`}function Fn(e){if(!e)return;let t=Cn===`end`?`pe-end-date`:`pe-date`,n=Cn===`end`?`pm-end-display`:`pm-start-display`,r=document.getElementById(t),i=document.getElementById(n);r&&(r.value=e),i&&(i.textContent=Dn(e),i.style.color=`#1e293b`),wn=e.slice(0,7),document.getElementById(`pm-dp-popover`).style.display=`none`}function In(){Fn(``);let e=Cn===`end`?`pm-end-display`:`pm-start-display`,t=document.getElementById(e);t&&(t.textContent=Cn===`end`?`Same day`:``,t.style.color=`#94a3b8`)}function Ln(){Fn(new Date().toISOString().slice(0,10))}function Rn(){let[e,t]=wn.split(`-`).map(Number),n=t===1?e-1:e,r=t===1?12:t-1;wn=`${n}-${String(r).padStart(2,`0`)}`,Pn()}function zn(){let[e,t]=wn.split(`-`).map(Number),n=t===12?e+1:e,r=t===12?1:t+1;wn=`${n}-${String(r).padStart(2,`0`)}`,Pn()}function Bn(e){let t=document.getElementById(`pe-title`).value.trim(),n=document.getElementById(`pe-cat`).value,r=document.getElementById(`pe-date`).value,i=document.getElementById(`pe-end-date`)?.value||``,o=document.getElementById(`pe-allday`)?.checked||!1,s=o?``:document.getElementById(`pe-time`)?.value||``,c=o?``:document.getElementById(`pe-end-time`)?.value||``,l=document.getElementById(`pe-notes`).value.trim(),u=document.getElementById(`pe-location`)?.value.trim()||``,d=_routineRecurrenceCollect(),f=(d.type,`none`),p=L.size>0?[...L]:[`everyone`];if(!t||!r){alert(`Title and date are required.`);return}if(a.planner||(a.planner={events:[]}),e){let m=a.planner.events.find(t=>t.id===e);m&&(m.title=t,m.category=n,m.date=r,m.endDate=i||r,m.allDay=o,m.time=s,m.endTime=c,m.notes=l,m.location=u,m.recurrence=d,m.recurring=f,m.memberIds=p)}else{let e=`ev-`+Date.now();a.planner.events.push({id:e,title:t,category:n,date:r,endDate:i||r,allDay:o,time:s,endTime:c,notes:l,location:u,recurrence:d,recurring:f,memberIds:p,estimates:[],pushed:!1}),_plannerExpanded.add(e),_plannerSelectedDay=r,_plannerMonth=r.slice(0,7)}saveData(a),closeModal(),I()}function Vn(e,t){let n=(a.planner?.events||[]).filter(t=>t.date?.slice(0,7)===e&&(t.estimates||[]).some(e=>e.accepted));if(n.length===0)return``;let r=n.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),i=t-r,o=n.filter(e=>!e.pushed),s=n.map(e=>{let t=F[e.category]||F.other,n=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),r=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});return`<div class="forecast-row">
      <span class="forecast-ev-name">${t.emoji} ${f(e.title)}</span>
      <span class="forecast-ev-date">${r}</span>
      <span class="forecast-ev-cost">${g(n)}</span>
      ${e.pushed?`<span class="forecast-pushed">✓ In budget</span>`:e.pushed===`suggested`?`<span class="forecast-pushed" style="color:#f59e0b">⏳ Pending</span>`:`<button class="forecast-unpushed" onclick="suggestEventToBudget('${e.id}')">+ Suggest</button>`}
    </div>`}).join(``);return`<div class="forecast-widget">
    <div class="forecast-header">
      <span class="forecast-header-title">📅 Planned Events — ${g(r)} this month</span>
      ${o.length>1?`<button class="forecast-push-all" onclick="_pushAllEventsToBudget('${e}')">Suggest all to budget</button>`:``}
    </div>
    ${s}
    <div class="forecast-total">
      <span class="forecast-total-label">Forecast surplus after events</span>
      <span style="font-weight:800;font-size:15px;color:${i>=0?`#10b981`:`#ef4444`}">${g(Math.abs(i))} ${i>=0?`surplus`:`deficit`}</span>
    </div>
  </div>`}function Hn(e){(a.planner?.events||[]).filter(t=>t.date?.slice(0,7)===e&&!t.pushed&&(t.estimates||[]).some(e=>e.accepted)).forEach(e=>gn(e.id)),renderBudget()}function Un(e,t,n,r){let i=0;for(let a=1;a<=31;a++){let o=new Date(e,t,a);if(o.getMonth()!==t)break;if(o.getDay()===n&&(i++,i===r))return o}}function Wn(){let e=new Date;e.setHours(0,0,0,0);let t=e.getFullYear(),n=t=>Math.ceil((t-e)/864e5);return[{d:new Date(t,3,25),emoji:`🌿`,title:`Anzac Day`,body:`Public holiday — any plans or travel?`},{d:new Date(t,5,30),emoji:`🧾`,title:`EOFY`,body:`Tax time — accountant fees, donations, prepayments`},{d:new Date(t,11,25),emoji:`🎄`,title:`Christmas`,body:`Gifts, travel, food — start budgeting early`},{d:new Date(t,11,26),emoji:`🛍️`,title:`Boxing Day`,body:`Sales, travel, family catch-ups`},{d:new Date(t+1,0,1),emoji:`🎆`,title:`New Year's`,body:`Celebrations, travel plans`},{d:Un(t,4,0,2),emoji:`💐`,title:`Mother's Day`,body:`Gift, brunch or dinner for Mum`},{d:Un(t,8,0,1),emoji:`👔`,title:`Father's Day`,body:`Gift or outing for Dad`},{d:Un(t,10,2,1),emoji:`🏆`,title:`Melbourne Cup`,body:`Event day — sweepstakes, lunch, outfits`},{d:new Date(t,3,6),emoji:`🎒`,title:`Term 1 Holidays`,body:`2 weeks — activities, childcare, day trips`},{d:new Date(t,6,5),emoji:`🎒`,title:`Term 2 Holidays`,body:`2 weeks — winter school holidays`},{d:new Date(t,8,19),emoji:`🎒`,title:`Term 3 Holidays`,body:`2 weeks — spring school holidays`},{d:new Date(t,11,18),emoji:`🎒`,title:`Summer Holidays`,body:`6 weeks — the big one, plan early`}].filter(e=>e.d).map(e=>({...e,days:n(e.d)})).filter(e=>e.days>=-3&&e.days<=45).sort((e,t)=>e.days-t.days).slice(0,4)}function Gn(){let e=Wn();return e.length===0?``:`<div class="nudge-section">
    <div class="diary-section-title">Heads up from Toto 🐕</div>
    <div class="nudge-row">${e.map(e=>{let t=e.days<0?`Now!`:e.days===0?`Today!`:e.days===1?`Tomorrow`:`In ${e.days} days`;return`<div class="nudge-card" onclick="openTotoAssistant();_totoSend('Help me plan for ${p(e.title)}')">
      <div class="nudge-card-icon">${e.emoji}</div>
      <div class="nudge-card-title">${f(e.title)}</div>
      <div class="nudge-card-days">${t}</div>
      <div class="nudge-card-body">${f(e.body)}</div>
    </div>`}).join(``)}</div>
  </div>`}function Kn(e,t){let n=new Date(e);switch(t){case`weekly`:n.setDate(n.getDate()+7);break;case`fortnightly`:n.setDate(n.getDate()+14);break;case`monthly`:n.setMonth(n.getMonth()+1);break;case`quarterly`:n.setMonth(n.getMonth()+3);break;case`yearly`:n.setFullYear(n.getFullYear()+1);break}return n}function qn(){if(!a.planner?.events)return;let e=a.planner.events,t=new Date;t.setHours(0,0,0,0);let n=!1,r={weekly:3,fortnightly:3,monthly:6,quarterly:12,yearly:24};e.filter(e=>e.recurring&&e.recurring!==`none`&&!e._recurringSourceId).forEach(i=>{let a=i.recurring,o=new Date(t);o.setMonth(o.getMonth()+(r[a]||12));let s=new Date(i.date+`T12:00:00`);for(;s<t;)s=Kn(s,a);let c=0;for(;s<=o&&c++<200;){let t=s.toISOString().slice(0,10);e.some(e=>e.date===t&&(e.id===i.id||e._recurringSourceId===i.id))||(e.push({id:`ev-`+Date.now()+`-r`+Math.random().toString(36).slice(2,6),title:i.title,category:i.category,date:t,notes:i.notes||``,recurring:a,_recurringSourceId:i.id,estimates:(i.estimates||[]).map(e=>({...e,id:`est-`+Date.now()+Math.random(),accepted:!0})),pushed:!1}),n=!0),s=Kn(s,a)}}),n&&saveData(a)}var Jn=!1,Yn=[],Xn=!1,Zn=[{icon:`📅`,text:`What should I plan for this month?`},{icon:`💸`,text:`Any upcoming events I should budget for?`},{icon:`🎒`,text:`Help me plan for school holidays`},{icon:`✈️`,text:`I have a trip coming up — what do I need to organise?`}];function Qn(){Jn?er():$n()}function $n(){Jn=!0,document.getElementById(`toto-panel`).classList.add(`open`),Yn.length===0&&tr()}function er(){Jn=!1,document.getElementById(`toto-panel`).classList.remove(`open`)}function tr(){let e=new Date().toISOString().slice(0,10),t=new Date;t.setDate(t.getDate()+7);let n=t.toISOString().slice(0,10),r=(a.planner?.events||[]).filter(t=>t.date>=e&&t.date<=n),i=[];r.slice(0,2).forEach(t=>{let n=PLANNER_CATS[t.category]||PLANNER_CATS.other,r=new Date(t.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`});n.financial&&(!t.estimates||t.estimates.length===0)?i.push({icon:n.emoji,text:`${f(t.title)} is ${r} — want me to estimate costs?`}):t.date===e&&i.push({icon:n.emoji,text:`You have "${f(t.title)}" today — anything to prepare?`})});let o=getSeasonalNudges().slice(0,2).map(e=>({icon:e.emoji,text:`Help me plan for ${f(e.title)} (${e.days<=0?`now!`:`in ${e.days} days`})`})),s=[...i,...o,...Zn].slice(0,4),c=document.getElementById(`toto-suggestions`);c.innerHTML=s.map(e=>`<button class="toto-suggestion" onclick="_totoSendSuggestion(this)">${e.icon} ${e.text}</button>`).join(``);let l=new Date().getHours(),u=l<12?`Good morning`:l<17?`Good afternoon`:`Good evening`,d=(a.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,p=(a.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,m=p>0?` and ${p} kid${p>1?`s`:``}`:``;or(`toto`,`${u}! 👋 I'm Toto, your family planning assistant. You have ${d} adult${d>1?`s`:``}${m} in your household.\n\nI can help you plan events, estimate costs, and make sure nothing slips through the cracks. What would you like to work on?`)}function nr(e){let t=e.textContent.trim();e.closest(`.toto-suggestions`).style.display=`none`,ir(t)}async function rr(){let e=document.getElementById(`toto-input`),t=e.value.trim();!t||Xn||(e.value=``,document.getElementById(`toto-suggestions`).style.display=`none`,ir(t))}async function ir(e){let t=P(`toto_ai_key`);if(!t){or(`toto`,`To chat with me, you'll need to add your AI API key in Settings. It only takes a second! ⚙️`);return}or(`user`,e),Yn.push({role:`user`,content:e}),Xn=!0,document.getElementById(`toto-send`).disabled=!0;let n=sr();try{let e=ar(),r=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:600,system:e,messages:Yn})})).json()).content?.[0]?.text||`Sorry, I couldn't get a response. Try again?`;Yn.push({role:`assistant`,content:r}),cr(n),or(`toto`,r)}catch{cr(n),or(`toto`,`Oops, something went wrong. Check your internet connection and try again.`)}finally{Xn=!1,document.getElementById(`toto-send`).disabled=!1,document.getElementById(`toto-input`).focus()}}function ar(){let e=new Date().toISOString().slice(0,10),t=new Date().toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}),n=(a.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,r=(a.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,i=new Date;i.setDate(i.getDate()+60);let o=(a.planner?.events||[]).filter(t=>t.date>=e&&t.date<=i.toISOString().slice(0,10)).sort((e,t)=>e.date.localeCompare(t.date)).slice(0,15).map(e=>{let t=PLANNER_CATS[e.category]||PLANNER_CATS.other,n=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`}),r=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0);return`- ${n}: ${e.title} (${t.label})${r>0?` — $`+r.toLocaleString(`en-AU`)+` budgeted`:``}${e.notes?` — Notes: `+e.notes:``}`}).join(`
`)||`None`,s=getMonthData(selectedBudgetMonth),c=monthlyTotal(s.income),l=monthlyTotal(s.expenses),u=c-l,d=(a.goals||[]).filter(e=>e.status!==`achieved`).slice(0,4).map(e=>`${e.name} ($${(e.saved||0).toLocaleString()}/$${(e.target||0).toLocaleString()})`).join(`, `)||`None`;return`You are Toto, a warm and practical AI assistant for a family finance and life planning app called Toto. You help Australian families plan their lives and stay on top of their money.

Today: ${t}
Family: ${n} adult${n>1?`s`:``}${r>0?`, ${r} child${r>1?`ren`:``}`:``}
Monthly budget: Income $${c.toLocaleString(`en-AU`)}, Expenses $${l.toLocaleString(`en-AU`)}, ${u>=0?`Surplus`:`Deficit`} $${Math.abs(u).toLocaleString(`en-AU`)}
Active goals: ${d}

Upcoming events (next 60 days):
${o}

Personality: friendly, warm, concise. Use Australian spelling and context. You can:
- Help plan upcoming events and what to organise
- Suggest realistic cost estimates for activities
- Spot things they might have forgotten (school holidays, gift buying, etc.)
- Give practical financial advice around upcoming events
- Keep responses to 3-5 sentences unless a list is genuinely helpful`}function or(e,t){let n=document.getElementById(`toto-messages`),r=document.createElement(`div`);r.className=`toto-msg ${e}`;let i=t.replace(/\n/g,`<br>`);e===`toto`?r.innerHTML=`<div class="toto-msg-avatar">🐕</div><div class="toto-msg-bubble">${i}</div>`:r.innerHTML=`<div class="toto-msg-bubble">${i}</div>`,n.appendChild(r),n.scrollTop=n.scrollHeight}function sr(){let e=document.getElementById(`toto-messages`),t=`toto-typing-`+Date.now(),n=document.createElement(`div`);return n.className=`toto-msg toto`,n.id=t,n.innerHTML=`<div class="toto-msg-avatar">🐕</div><div class="toto-msg-bubble"><div class="toto-typing"><span></span><span></span><span></span></div></div>`,e.appendChild(n),e.scrollTop=e.scrollHeight,t}function cr(e){document.getElementById(e)?.remove()}`serviceWorker`in navigator&&navigator.serviceWorker.register(`/home-budget/sw.js`,{scope:`/home-budget/`}).catch(e=>console.warn(`SW registration failed:`,e));var lr=[`Produce`,`Meat & Seafood`,`Dairy & Eggs`,`Pantry`,`Bakery`,`Frozen`,`Household`,`Other`],ur={Produce:`🥦`,"Meat & Seafood":`🥩`,"Dairy & Eggs":`🥛`,Pantry:`🥫`,Bakery:`🍞`,Frozen:`🧊`,Household:`🏠`,Other:`🛒`},dr={food:{label:`Food`,emoji:`🛒`,color:`#dcfce7`,text:`#166534`,aisles:!0,priceEst:!0},clothes:{label:`Clothes`,emoji:`👕`,color:`#dbeafe`,text:`#1e40af`,aisles:!1,priceEst:!1},wishlist:{label:`Wishlist`,emoji:`🎁`,color:`#fce7f3`,text:`#9d174d`,aisles:!1,priceEst:!1},home:{label:`Home & Garden`,emoji:`🛠`,color:`#fef3c7`,text:`#92400e`,aisles:!0,priceEst:!1},pharmacy:{label:`Pharmacy`,emoji:`💊`,color:`#ede9fe`,text:`#5b21b6`,aisles:!0,priceEst:!1}},fr={food:[{key:`produce`,emoji:`🥦`,label:`Produce`},{key:`dairy`,emoji:`🥛`,label:`Dairy & Eggs`},{key:`bakery`,emoji:`🍞`,label:`Bakery`},{key:`meat`,emoji:`🥩`,label:`Meat & Seafood`},{key:`pantry`,emoji:`🥫`,label:`Pantry`},{key:`frozen`,emoji:`🧊`,label:`Frozen`},{key:`health`,emoji:`🧴`,label:`Health & Beauty`},{key:`bathroom`,emoji:`🚿`,label:`Bathroom`},{key:`cleaning`,emoji:`🧹`,label:`Cleaning`},{key:`drinks`,emoji:`🍷`,label:`Drinks & Alcohol`},{key:`other`,emoji:`🛒`,label:`Uncategorised`}],home:[{key:`tools`,emoji:`🔨`,label:`Tools & Hardware`},{key:`garden`,emoji:`🌱`,label:`Garden`},{key:`cleaning`,emoji:`🧹`,label:`Cleaning`},{key:`other`,emoji:`🛒`,label:`Other`}],pharmacy:[{key:`medicine`,emoji:`💊`,label:`Medicine`},{key:`skincare`,emoji:`🧴`,label:`Skincare`},{key:`vitamins`,emoji:`💪`,label:`Vitamins`},{key:`other`,emoji:`🛒`,label:`Other`}]},pr={milk:`dairy`,cheese:`dairy`,butter:`dairy`,eggs:`dairy`,yoghurt:`dairy`,cream:`dairy`,bread:`bakery`,rolls:`bakery`,muffin:`bakery`,croissant:`bakery`,baguette:`bakery`,apple:`produce`,banana:`produce`,orange:`produce`,strawberry:`produce`,tomato:`produce`,lettuce:`produce`,spinach:`produce`,carrot:`produce`,broccoli:`produce`,potato:`produce`,onion:`produce`,garlic:`produce`,cucumber:`produce`,capsicum:`produce`,avocado:`produce`,lemon:`produce`,lime:`produce`,grapes:`produce`,mango:`produce`,pineapple:`produce`,watermelon:`produce`,chicken:`meat`,beef:`meat`,mince:`meat`,steak:`meat`,pork:`meat`,lamb:`meat`,salmon:`meat`,fish:`meat`,tuna:`meat`,prawn:`meat`,sausage:`meat`,bacon:`meat`,rice:`pantry`,pasta:`pantry`,flour:`pantry`,sugar:`pantry`,oil:`pantry`,vinegar:`pantry`,salt:`pantry`,pepper:`pantry`,sauce:`pantry`,stock:`pantry`,beans:`pantry`,lentils:`pantry`,chickpeas:`pantry`,cereal:`pantry`,oats:`pantry`,honey:`pantry`,jam:`pantry`,peanut:`pantry`,coffee:`pantry`,tea:`pantry`,biscuit:`pantry`,cracker:`pantry`,chocolate:`pantry`,chips:`pantry`,nuts:`pantry`,icecream:`frozen`,peas:`frozen`,corn:`frozen`,pizza:`frozen`,shampoo:`health`,conditioner:`health`,deodorant:`health`,sunscreen:`health`,moisturiser:`health`,makeup:`health`,lipstick:`health`,mascara:`health`,toothpaste:`bathroom`,toothbrush:`bathroom`,soap:`bathroom`,toilet:`bathroom`,razors:`bathroom`,tampons:`bathroom`,pads:`bathroom`,detergent:`cleaning`,bleach:`cleaning`,sponge:`cleaning`,dishwashing:`cleaning`,bins:`cleaning`,mop:`cleaning`,water:`drinks`,juice:`drinks`,beer:`drinks`,wine:`drinks`,spirits:`drinks`,softdrink:`drinks`,soda:`drinks`,kombucha:`drinks`};function mr(e){for(var t=e.toLowerCase(),n=Object.keys(pr),r=0;r<n.length;r++)if(t.indexOf(n[r])!==-1)return pr[n[r]];return`other`}function hr(e){var t=e.trim(),n=1,r=`units`,i=t,a=t.match(/^(\d+(?:\.\d+)?)\s*(kg|g|L|l|ml|dozen|doz)\s+(.+)$/i);if(a)n=parseFloat(a[1]),r=a[2].toLowerCase()===`l`?`L`:a[2].toLowerCase()===`doz`?`dozen`:a[2],i=a[3];else{var o=t.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);o?(n=parseFloat(o[1]),i=o[2]):/^dozen\s+/i.test(t)&&(n=1,r=`dozen`,i=t.replace(/^dozen\s+/i,``))}return i=i.charAt(0).toUpperCase()+i.slice(1),{qty:n,unit:r,name:i}}var gr=`food`,_r=`selector`;Object.defineProperty(window,`_listsActiveType`,{get(){return gr},set(e){gr=e},configurable:!0}),Object.defineProperty(window,`_listsView`,{get(){return _r},set(e){_r=e},configurable:!0});function vr(e){let t=new Date,n=t.getDay()===0?-6:1-t.getDay(),r=new Date(t);return r.setDate(t.getDate()+n+(e||0)*7),r.toISOString().slice(0,10)}function yr(e){let t=new Date(e+`T00:00:00`);return Array.from({length:7},(e,n)=>{let r=new Date(t);return r.setDate(t.getDate()+n),r})}function br(){_mealView===`shopping`?jr():xr()}function xr(){let e=vr(0),t=yr(e),n=a.meals.plan[e]||{},r=new Date().toISOString().slice(0,10),i=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],o=[{key:`b`,label:`Breakfast`},{key:`l`,label:`Lunch`},{key:`d`,label:`Dinner`}];t[0].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),t[6].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});let s=[];for(let e=0;e<7;e++){let t=n[e]||{};[`b`,`l`,`d`].forEach(e=>{t[e]&&s.push(t[e])})}let c=``;o.forEach(i=>{c+=`<div class="meal-grid-label">${i.label}</div>`,t.forEach((t,o)=>{let s=(n[o]||{})[i.key]||``,l=t.toISOString().slice(0,10)===r;c+=`<div class="meal-cell${l?` today`:``}" onclick="openMealEdit('${e}',${o},'${i.key}')">
        ${s?`<span class="meal-cell-text">${s}${a.settings?.showCalories&&(n[o]||{})[`cal_`+i.key]?`<br><span style="font-size:9px;color:var(--text-muted);font-weight:600">${n[o][`cal_`+i.key]} cal</span>`:``}</span>`:`<span class="meal-cell-plus">+</span>`}
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
        ${s.length>0?`<button class="btn btn-sm" id="gen-shop-btn" onclick="generateShoppingList('${e}')">🛒 Generate shopping list</button>`:``}
        <button class="btn btn-primary btn-sm" onclick="_listsActiveType='food';_listsView='list';activateTab('lists')">Shopping list →</button>
      </div>
    </div>

    <div style="overflow-x:auto;margin-bottom:8px">
      <div class="meal-grid" style="min-width:560px">
        <div class="meal-grid-corner"></div>
        ${t.map((e,t)=>`<div class="meal-grid-header${e.toISOString().slice(0,10)===r?` today`:``}"><div>${i[t]}</div><div style="font-size:10px;opacity:0.7">${e.getDate()}/${e.getMonth()+1}</div></div>`).join(``)}
        ${c}
        ${a.settings?.showCalories?`<div class="meal-grid-label" style="font-weight:800;font-size:9px">Total</div>`+t.map((e,t)=>{let r=n[t]||{},i=(r.cal_b||0)+(r.cal_l||0)+(r.cal_d||0);return`<div style="background:var(--surface);padding:6px;text-align:center;font-size:11px;font-weight:700;color:${i>0?i>2500?`var(--danger)`:i>2e3?`var(--warning)`:`var(--text)`:`var(--border)`}">${i>0?i.toLocaleString():`—`}</div>`}).join(``):``}
      </div>
    </div>
    <p style="font-size:12px;color:var(--text-muted);margin-top:6px">Tap any cell to add or change a meal.</p>`}var R={cuisine:`Any`,price:0,dietary:`Any`},Sr=[`Any`,`Italian`,`Asian`,`Mexican`,`Indian`,`Mediterranean`,`Thai`,`Japanese`,`Middle Eastern`,`Australian`],Cr=[`Any`,`Vegetarian`,`Vegan`,`Gluten-free`,`Quick (<30min)`,`Family-friendly`];function wr(e,t,n){let r=[`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`,`Sunday`],i={b:`Breakfast`,l:`Lunch`,d:`Dinner`},o=((a.meals.plan[e]||{})[t]||{})[n]||``,s=!!P(`toto_ai_key`),c=new Set;Object.values(a.meals.plan).forEach(e=>Object.values(e).forEach(e=>{typeof e==`object`&&[`b`,`l`,`d`].forEach(t=>{e[t]&&c.add(e[t])})}));let l=[...c].filter(e=>e!==o).slice(0,16);document.getElementById(`modal-title`).textContent=`${r[t]} · ${i[n]}`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Meal</label>
      <input class="form-input" id="meal-input" type="text" maxlength="200" value="${o.replace(/"/g,`&quot;`)}"
        placeholder="e.g. Pasta Bolognese, Chicken stir-fry…" autocomplete="off">
    </div>

    ${s?`
    <div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:16px;background:var(--surface2)">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:12px">✨ AI Suggestions</div>

      <div style="margin-bottom:10px">
        <div class="form-label" style="margin-bottom:5px">Cuisine</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px" id="meal-f-cuisine">
          ${Sr.map(e=>Tr(`cuisine`,e)).join(``)}
        </div>
      </div>

      <div style="margin-bottom:12px">
        <div class="form-label" style="display:flex;justify-content:space-between;margin-bottom:5px">
          <span>Meal budget (per serve)</span>
          <span id="meal-price-lbl" style="color:#0891b2;font-weight:700">${R.price>0?`$`+R.price:`Any`}</span>
        </div>
        <input type="range" min="0" max="200" step="5" value="${R.price}"
          style="width:100%;accent-color:#0891b2;cursor:pointer"
          oninput="_mealPriceSlide(+this.value)">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-top:2px">
          <span>Any price</span><span>$200</span>
        </div>
      </div>

      <div>
        <div class="form-label" style="margin-bottom:5px">Dietary / Style</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px" id="meal-f-dietary">
          ${Cr.map(e=>Tr(`dietary`,e)).join(``)}
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
    <button class="btn btn-primary" onclick="saveMealSlot('${e}',${t},'${n}',document.getElementById('meal-input').value.trim())">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`),setTimeout(()=>{let e=document.getElementById(`meal-input`);e&&(e.focus(),e.select())},80)}function Tr(e,t){let n=R[e]===t;return`<button data-filter="${e}" data-val="${t}"
    onclick="_mealToggleFilter('${e}','${t}')"
    style="padding:4px 10px;border-radius:99px;font-size:12px;cursor:pointer;white-space:nowrap;
      border:1.5px solid ${n?`#0891b2`:`var(--border)`};
      background:${n?`#ecfeff`:`var(--surface)`};
      color:${n?`#0891b2`:`var(--text)`}">${t}</button>`}function Er(e,t){R[e]=t,document.querySelectorAll(`[data-filter="${e}"]`).forEach(e=>{let n=e.dataset.val===t;e.style.borderColor=n?`#0891b2`:`var(--border)`,e.style.background=n?`#ecfeff`:`var(--surface)`,e.style.color=n?`#0891b2`:`var(--text)`})}function Dr(e){R.price=e;let t=document.getElementById(`meal-price-lbl`);t&&(t.textContent=e>0?`$${e}`:`Any`)}async function Or(e){let t=P(`toto_ai_key`);if(!t)return;let n=document.getElementById(`meal-suggest-btn`),r=document.getElementById(`meal-suggest-out`);n&&(n.textContent=`⏳ Thinking…`,n.disabled=!0),r&&(r.innerHTML=``);let i={b:`Breakfast`,l:`Lunch`,d:`Dinner`},a=[R.cuisine===`Any`?``:`Cuisine: ${R.cuisine}`,R.price>0?`Budget: up to $${R.price} per serve`:``,R.dietary===`Any`?``:`Style: ${R.dietary}`].filter(Boolean).join(`, `)||`No specific filters`,o=`Suggest 8 ${i[e]} meal ideas. Filters: ${a}.
Return ONLY a JSON array of meal names, no other text: ["Meal 1","Meal 2",...]`;try{let e=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:256,messages:[{role:`user`,content:o}]})})).json()).content[0].text.match(/\[[\s\S]*\]/);if(!e)throw Error(`No JSON`);let n=JSON.parse(e[0]);r&&(r.innerHTML=`<div style="display:flex;flex-wrap:wrap;gap:6px">
      ${n.map(e=>`<button style="padding:6px 12px;border-radius:99px;border:1px solid #0891b2;background:#ecfeff;color:#0891b2;font-size:12px;font-weight:500;cursor:pointer"
        onclick="document.getElementById('meal-input').value='${e.replace(/'/g,`\\'`)}'">${e}</button>`).join(``)}
    </div>`)}catch(e){r&&(r.innerHTML=`<span style="font-size:12px;color:var(--danger)">⚠ ${e.message}</span>`)}finally{n&&(n.textContent=`Get suggestions`,n.disabled=!1)}}function kr(e,t,n,r){a.meals.plan[e]||(a.meals.plan[e]={}),a.meals.plan[e][t]||(a.meals.plan[e][t]={b:``,l:``,d:``}),a.meals.plan[e][t][n]=r,delete a.meals.plan[e][t][`cal_`+n],saveData(a),closeModal(),xr(),r&&a.settings?.showCalories&&Ar(e,t,n,r)}async function Ar(e,t,n,r){let i=P(`toto_ai_key`);if(!(!i||!r))try{let o=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":i,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:50,messages:[{role:`user`,content:`Estimate the calories in this meal: "${r}". Return ONLY a number, nothing else. For example: 450`}]})});if(!o.ok)return;let s=await o.json(),c=parseInt(s.content[0].text.trim().replace(/[^0-9]/g,``));c>0&&c<5e3&&a.meals.plan[e]?.[t]&&(a.meals.plan[e][t][`cal_`+n]=c,saveData(a),xr())}catch{}}function jr(){let e=a.meals.shopping||[],t=e.filter(e=>e.checked).length,n=e.length-t,r={};lr.forEach(e=>r[e]=[]),e.forEach(e=>{r[lr.includes(e.cat)?e.cat:`Other`].push(e)});let i=``;lr.forEach(e=>{let t=r[e];t.length&&(i+=`
      <div style="margin-bottom:18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:4px">
          ${ur[e]} ${e}
        </div>
        ${t.map(e=>`
          <div class="shop-row">
            <input type="checkbox" ${e.checked?`checked`:``} onchange="toggleShopItem(${e.id},this.checked)"
              style="width:18px;height:18px;cursor:pointer;accent-color:#0891b2;flex-shrink:0">
            <span style="flex:1;font-size:14px;${e.checked?`text-decoration:line-through;color:var(--text-muted)`:``}">${f(e.name)}</span>
            ${e.qty?`<span style="font-size:12px;color:var(--text-muted);white-space:nowrap">${e.qty}</span>`:``}
            <button onclick="removeShopItem(${e.id})" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:18px;line-height:1;padding:2px 4px">×</button>
          </div>`).join(``)}
      </div>`)}),i||(i=`<div class="empty"><div class="empty-icon">🛒</div><p>No items yet — generate from your meal plan or add manually below.</p></div>`),document.getElementById(`meals-content`).innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px">
      <button class="btn btn-sm" onclick="_mealView='plan';renderMeals()">← Meal Plan</button>
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
            ${lr.map(e=>`<option value="${e}">${ur[e]} ${e}</option>`).join(``)}
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
    </div>`}function Mr(){let e=document.getElementById(`shop-name`)?.value.trim();if(!e)return;let t=document.getElementById(`shop-qty`)?.value.trim()||``,n=document.getElementById(`shop-cat`)?.value||`Other`,r=a.meals.shopping;r.push({id:r.length?Math.max(...r.map(e=>e.id))+1:1,name:e,qty:t,cat:n,checked:!1}),saveData(a),jr()}function Nr(e,t){let n=a.meals.shopping.find(t=>t.id===e);n&&(n.checked=t,saveData(a))}function Pr(e){a.meals.shopping=a.meals.shopping.filter(t=>t.id!==e),saveData(a),jr()}function Fr(){a.meals.shopping=a.meals.shopping.filter(e=>!e.checked),saveData(a),jr()}function Ir(e){var t=document.getElementById(`ls-toast`);t&&t.remove();var n=document.createElement(`div`);n.id=`ls-toast`,n.textContent=e,n.style.cssText=`position:fixed;bottom:96px;left:50%;transform:translateX(-50%) translateY(20px);background:#1a1814;color:#fff;padding:10px 18px;border-radius:99px;font-size:13px;font-weight:600;z-index:9999;opacity:0;transition:opacity .2s,transform .2s;pointer-events:none;white-space:nowrap;max-width:80vw;text-align:center;font-family:var(--sans,system-ui,sans-serif)`,document.body.appendChild(n),requestAnimationFrame(function(){n.style.opacity=`1`,n.style.transform=`translateX(-50%) translateY(0)`}),setTimeout(function(){n.style.opacity=`0`,n.style.transform=`translateX(-50%) translateY(10px)`,setTimeout(function(){n.parentNode&&n.remove()},300)},2400)}function Lr(e,t,n,r,i,o,s){a.lists||_applyMigrations(a);var c=a.lists[e];if(c){if(c.items.find(function(e){return e.state===`active`&&e.name.toLowerCase()===t.toLowerCase()}))return Ir(f(t)+` is already on your list`),!1;var l={id:`li-`+Date.now()+`-`+Math.random().toString(36).slice(2,6),name:t,quantity:n||1,unit:r||`units`,notes:o||``,aisle:i||(e===`food`?mr(t):`other`),state:`active`,addedBy:`user`,addedAt:new Date().toISOString(),stateChangedAt:null,mealTag:s||null,manualPrice:null,barcodeId:null};return c.items.push(l),Kr(e,t),saveData(a),!0}}function Rr(e,t,n){if(!(!a.lists||!a.lists[e])){var r=a.lists[e].items.find(function(e){return e.id===t});r&&(r.state=n,r.stateChangedAt=new Date().toISOString(),saveData(a),Yr())}}function zr(e,t){!a.lists||!a.lists[e]||(a.lists[e].items=a.lists[e].items.filter(function(e){return e.id!==t}),saveData(a),Yr())}function Br(e){var t=document.getElementById(`ls-quick-input`);if(t){var n=t.value.trim();if(n){var r=hr(n),i=e===`food`?mr(r.name):`other`;if(Lr(e,r.name,r.qty,r.unit,i,``,null)!==!1){t.value=``;var a=document.getElementById(`ls-parse-preview`);a&&(a.innerHTML=``),Yr()}}}}function Vr(e,t){let n=e===`food`,r=a.lists?.[e]?.items||[],i=t?r.find(e=>e.id===t):null,o=n?PANTRY_CATS:[`Other`],s=[`units`,`kg`,`g`,`L`,`ml`,`dozen`];document.getElementById(`modal-title`).textContent=i?`Edit Item`:`Add Item`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="lf-name" type="text" maxlength="200"
        value="${i?p(i.name):``}" placeholder="e.g. Pasta, Milk, Chicken">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="lf-cat">
          ${o.map(e=>`<option value="${e}"${i&&i.aisle===Hr(e)?` selected`:``}>${e}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Quantity <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="lf-qty" type="text" maxlength="200"
          value="${i?p(String(i.quantity||``)):``}" placeholder="e.g. 2 bags, 1L, 500g">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Unit</label>
      <select class="form-select" id="lf-unit">
        ${s.map(e=>`<option value="${e}"${i&&i.unit===e?` selected`:``}>${e}</option>`).join(``)}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="lf-notes" type="text" maxlength="200"
        value="${i?p(i.notes||``):``}" placeholder="e.g. Get the organic one, only if on sale">
    </div>
    <div class="form-group">
      <label class="form-label">Status</label>
      <div style="display:flex;gap:8px">
        ${[[`active`,`Still needed`,`#5B4CF5`],[`got_it`,`Got it`,`#10b981`],[`not_found`,`Not found`,`#ef4444`]].map(([e,t,n])=>{let r=(i?.state||`active`)===e;return`<label style="flex:1;cursor:pointer;text-align:center;padding:10px;border-radius:8px;border:2px solid ${r?n:`var(--border)`};background:${r?n+`15`:`var(--surface)`};font-size:12px;font-weight:600;color:${r?n:`var(--text-muted)`}">
            <input type="radio" name="lf-state" value="${e}" ${r?`checked`:``} style="display:none">${t}
          </label>`}).join(``)}
      </div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${i?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="_listsDeleteItem('${e}','${t}');closeModal()">Delete</button>`:``}
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="_listsSaveForm('${e}','${t||``}')">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Hr(e){return{Fridge:`dairy`,Freezer:`frozen`,Pantry:`pantry`,"Fruit & Veg":`produce`,Spices:`pantry`,Drinks:`drinks`,Cleaning:`cleaning`,Other:`other`}[e]||`other`}function Ur(e,t){let n=document.getElementById(`lf-name`)?.value.trim();if(!n)return;let r=document.getElementById(`lf-cat`)?.value||`Other`,i=document.getElementById(`lf-qty`)?.value.trim()||`1`,o=document.getElementById(`lf-unit`)?.value||`units`,s=document.getElementById(`lf-notes`)?.value.trim()||``,c=document.querySelector(`input[name="lf-state"]:checked`)?.value||`active`,l=parseFloat(i)||1,u=e===`food`?Hr(r):`other`;a.lists||(a.lists={}),a.lists[e]||(a.lists[e]={items:[],weeklyBudget:0,budget:0,stores:[],favourites:[],history:[]});let d=a.lists[e].items;if(t){let e=d.find(e=>e.id===t);e&&(e.name=n,e.quantity=l,e.unit=o,e.notes=s,e.aisle=u,e.state=c)}else{if(d.find(e=>e.name.toLowerCase()===n.toLowerCase()&&e.state===`active`)&&!confirm(`"${n}" is already on your list. Add another?`))return;d.push({id:`si-`+Date.now(),name:n,quantity:l,unit:o,notes:s,aisle:u,state:c,addedBy:_currentUser?.uid||`guest`,addedAt:new Date().toISOString(),mealTag:null,manualPrice:null,barcodeId:null}),Kr(e,n)}saveData(a),closeModal(),Yr()}function Wr(e){if(!(!a.lists||!a.lists[e])){var t=a.lists[e].items.filter(function(e){return e.state===`got_it`});t.length&&confirm(`Remove `+t.length+` trolley item`+(t.length===1?``:`s`)+`?`)&&(a.lists[e].items=a.lists[e].items.filter(function(e){return e.state!==`got_it`}),saveData(a),Yr())}}function Gr(e){if(!(!a.lists||!a.lists[e])){var t=a.lists[e];t.history||(t.history=[]),t.history.push({archivedAt:new Date().toISOString(),items:JSON.parse(JSON.stringify(t.items))}),t.items=[],saveData(a),Ir(`Shop archived!`),Yr()}}function Kr(e,t){if(!(!a.lists||!a.lists[e])){var n=a.lists[e].favourites,r=n.find(function(e){return e.name.toLowerCase()===t.toLowerCase()});r?r.addedCount=(r.addedCount||0)+1:n.push({name:t,addedCount:1,pinned:!1})}}function qr(e){if(!(!a.lists||!a.lists[e])){var t=a.lists[e].favourites,n=t.filter(function(e){return e.pinned}),r=n.length?n:t.sort(function(e,t){return(t.addedCount||0)-(e.addedCount||0)}).slice(0,5),i=0;r.forEach(function(t){a.lists[e].items.find(function(e){return e.state===`active`&&e.name.toLowerCase()===t.name.toLowerCase()})||(Lr(e,t.name,1,`units`,e===`food`?mr(t.name):`other`,``,null),i++)}),i?Yr():Ir(`All usual items are already on the list`)}}function Jr(){var e=document.getElementById(`ls-quick-input`),t=document.getElementById(`ls-parse-preview`);if(!(!e||!t)){var n=e.value.trim();if(!n){t.innerHTML=``;return}var r=hr(n),i=``;(r.qty!==1||r.unit!==`units`)&&(i+=`<span class="ls-parse-chip">`+f(String(r.qty))+` `+f(r.unit)+`</span>`),i+=`<span class="ls-parse-chip">`+f(r.name)+`</span>`,t.innerHTML=i}}function Yr(){var e=document.getElementById(`lists-content`);e&&(a.lists||_applyMigrations(a),_r===`selector`?Xr(e):Zr(e,gr))}function Xr(e){var t=`<div class="ls-screen">`;t+=`<div style="font-size:22px;font-weight:800;color:var(--ink,#1a1814);margin-bottom:4px">My Lists</div>`,t+=`<div style="font-size:13px;color:var(--muted,#8c8880);margin-bottom:20px">Tap a list to open it</div>`,t+=`<div class="ls-type-grid">`,Object.keys(dr).forEach(function(e){var n=dr[e],r=(a.lists&&a.lists[e]?a.lists[e]:{items:[]}).items.filter(function(e){return e.state===`active`}).length;t+=`<div class="ls-type-card" onclick="_listsActiveType='`+e+`';_listsView='list';renderLists()">`,t+=`<div class="ls-type-icon" style="background:`+n.color+`;color:`+n.text+`">`+n.emoji+`</div>`,t+=`<div class="ls-type-label">`+f(n.label)+`</div>`,t+=`<div class="ls-type-count">`+(r>0?r+` item`+(r===1?``:`s`):`Empty`)+`</div>`,t+=`</div>`}),t+=`</div>`,t+=`</div>`,e.innerHTML=t}function Zr(e,t){var n=dr[t],r=a.lists&&a.lists[t]?a.lists[t]:{items:[],weeklyBudget:0,favourites:[]},i=r.items||[],o=i.filter(function(e){return e.state===`active`}),s=i.filter(function(e){return e.state===`got_it`}),c=i.filter(function(e){return e.state===`not_found`}),l=`<div class="ls-screen">`;if(l+=`<button class="ls-back-btn" onclick="_listsView='selector';renderLists()">← Lists</button>`,l+=`<div class="ls-header">`,l+=`<div style="font-size:22px;margin-right:6px">`+n.emoji+`</div>`,l+=`<div class="ls-header-title">`+f(n.label)+`</div>`,l+=`<div class="ls-sync-dot"></div>`,l+=`<div class="ls-header-count">`+o.length+` to get</div>`,l+=`</div>`,r.weeklyBudget>0){var u=i.filter(function(e){return e.state===`got_it`&&e.manualPrice}).reduce(function(e,t){return e+(t.manualPrice||0)},0),d=Math.min(100,Math.round(u/r.weeklyBudget*100)),p=d>100?`over`:d>80?`warn`:``;l+=`<div class="ls-budget-bar-wrap">`,l+=`<div class="ls-budget-bar-meta"><span>$`+u.toFixed(0)+` spent</span><span>$`+r.weeklyBudget+` budget</span></div>`,l+=`<div class="ls-budget-bar"><div class="ls-budget-fill `+p+`" style="width:`+d+`%"></div></div>`,l+=`</div>`}var m=(r.favourites||[]).filter(function(e){return!o.find(function(t){return t.name.toLowerCase()===e.name.toLowerCase()})}).sort(function(e,t){return(t.addedCount||0)-(e.addedCount||0)}).slice(0,5);if(m.length>0&&(l+=`<div class="ls-fav-chips">`,m.forEach(function(e){l+=`<button class="ls-fav-chip" onclick="_listsAddItem('`+t+`','`+f(e.name).replace(/'/g,`\\'`)+`',1,'units','`+(t===`food`?mr(e.name):`other`)+`','',null);renderLists()">+ `+f(e.name)+`</button>`}),l+=`</div>`),(r.favourites||[]).length>0&&(l+=`<button class="ls-usual-btn" onclick="_listsAddUsual('`+t+`')">The usual →</button>`),l+=`<div class="ls-quick-add">`,l+=`<div class="ls-quick-add-row">`,l+=`<input class="ls-quick-input" id="ls-quick-input" type="text" placeholder="Add item…" autocomplete="off" oninput="_listsUpdateParsePreview()" onkeydown="if(event.key==='Enter')_listsQuickAdd('`+t+`')">`,l+=`<button class="ls-quick-add-btn" onclick="_listsQuickAdd('`+t+`')">Add</button>`,l+=`<button class="ls-quick-add-btn" style="background:var(--purple-soft);color:var(--iris-1);min-width:36px;padding:0 10px" onclick="_listsOpenAddForm('`+t+`')">⋯</button>`,l+=`</div>`,l+=`<div class="ls-parse-preview" id="ls-parse-preview"></div>`,l+=`</div>`,o.length>0)if(n.aisles){var h=fr[t]||[{key:`other`,emoji:`🛒`,label:`Other`}],g={};h.forEach(function(e){g[e.key]=[]}),o.forEach(function(e){var t=e.aisle&&g[e.aisle]!==void 0?e.aisle:`other`;g[t]||(g[t]=[]),g[t].push(e)}),h.forEach(function(e){!g[e.key]||!g[e.key].length||(l+=`<div class="ls-aisle-header">`+e.emoji+` `+f(e.label)+`</div>`,g[e.key].forEach(function(e){l+=Qr(t,e)}))})}else o.forEach(function(e){l+=Qr(t,e)});else l+=`<div style="text-align:center;padding:32px 0;color:var(--muted,#8c8880);font-size:14px">Nothing to get yet — add something above</div>`;s.length>0&&(l+=`<div class="ls-aisle-header">🛒 In the trolley</div>`,s.forEach(function(e){l+=Qr(t,e)})),c.length>0&&(l+=`<div class="ls-aisle-header">🚫 Not found</div>`,c.forEach(function(e){l+=Qr(t,e)})),l+=`<div class="ls-footer-row">`,s.length>0&&(l+=`<button class="ls-footer-btn" onclick="_listsClearTrolley('`+t+`')">Clear trolley (`+s.length+`)</button>`),o.length===0&&i.length>0&&(l+=`<button class="ls-footer-btn" style="background:var(--iris-2,#6366f1);color:#fff;border-color:var(--iris-2,#6366f1)" onclick="_listsArchive('`+t+`')">Archive this shop</button>`),l+=`</div>`,l+=`</div>`,e.innerHTML=l}function Qr(e,t){var n=t.state===`got_it`?`got-it`:t.state===`not_found`?`not-found`:``,r=t.state===`got_it`?`✓`:``,i=t.state===`active`?`got_it`:`active`,a=t.quantity&&t.unit&&t.unit!==`units`?t.quantity+` `+t.unit:t.quantity&&t.quantity!==1?`x`+t.quantity:``;f(t.id);var o=f(t.name),s=`<div class="ls-item `+n+`">`;return s+=`<button class="ls-item-check" onclick="_listsSetState('`+e+`','`+t.id+`','`+i+`')">`+r+`</button>`,s+=`<div class="ls-item-body">`,s+=`<div class="ls-item-name">`+o+`</div>`,a&&(s+=`<div class="ls-item-qty">`+f(a)+`</div>`),t.notes&&(s+=`<div class="ls-item-notes">`+f(t.notes)+`</div>`),s+=`</div>`,t.state===`active`?s+=`<button class="ls-item-notfound-btn" title="Not found" onclick="_listsSetState('`+e+`','`+t.id+`','not_found')">🚫</button>`:t.state===`not_found`&&(s+=`<button class="ls-item-notfound-btn" title="Mark active again" onclick="_listsSetState('`+e+`','`+t.id+`','active')">↩</button>`),s+=`<button class="ls-item-notfound-btn" title="Edit" onclick="_listsOpenAddForm('`+e+`','`+t.id+`')">✏️</button>`,s+=`<button class="ls-item-del" onclick="_listsDeleteItem('`+e+`','`+t.id+`')">×</button>`,s+=`</div>`,s}async function $r(e){let t=a.meals.plan[e]||{},n=[];for(let e=0;e<7;e++){let r=t[e]||{};[`b`,`l`,`d`].forEach(e=>{r[e]&&n.push(r[e])})}if(!n.length)return;let r=P(`toto_ai_key`);if(!r){gr=`food`,_r=`list`,activateTab(`lists`);return}let i=document.getElementById(`gen-shop-btn`);i&&(i.textContent=`⏳ Generating…`,i.disabled=!0);let o=`Generate a grocery shopping list for these meals: ${n.join(`, `)}.

Return ONLY a JSON array:
[{"name":"Chicken breast","qty":"500g","cat":"Meat & Seafood"},{"name":"Pasta","qty":"400g","cat":"Pantry"}]

Categories must be one of: Produce, Meat & Seafood, Dairy & Eggs, Pantry, Bakery, Frozen, Household, Other.
Combine quantities where sensible. No duplicates. No other text.`,s={Produce:`produce`,"Meat & Seafood":`meat`,"Dairy & Eggs":`dairy`,Pantry:`pantry`,Bakery:`bakery`,Frozen:`frozen`,Household:`cleaning`,Other:`other`};try{let e=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":r,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:1024,messages:[{role:`user`,content:o}]})})).json()).content[0].text.match(/\[[\s\S]*\]/);if(!e)throw Error(`No JSON`);let t=JSON.parse(e[0]);a.lists||(a.lists={}),a.lists.food||(a.lists.food={items:[],weeklyBudget:200,budget:0,stores:[],favourites:[],history:[]});let n=a.lists.food.items,i=0;t.forEach(e=>{n.some(t=>t.name.toLowerCase()===e.name.toLowerCase()&&t.state===`active`)||n.push({id:`si-meal-`+Date.now()+`-`+ i++,name:e.name,quantity:1,unit:`units`,notes:e.qty||``,aisle:s[e.cat]||(mr?mr(e.name):`other`),state:`active`,addedBy:`meals`,addedAt:new Date().toISOString(),mealTag:`Meal plan`,manualPrice:null,barcodeId:null})}),saveData(a),gr=`food`,_r=`list`,activateTab(`lists`)}catch{i&&(i.textContent=`🛒 Generate shopping list`,i.disabled=!1)}}var ei=[`Living Room`,`Dining Room`,`Kitchen`,`Master Bedroom`,`Bedroom 2`,`Bedroom 3`,`Study / Office`,`Bathroom`,`Laundry`,`Outdoor / Alfresco`,`Other`];function ti(e={}){let t=e.deliveryDate?(()=>{let[t,n,r]=e.deliveryDate.split(`-`);return`${r}/${n}/${t}`})():``;return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-furn-name" type="text" maxlength="200" value="${p(e.name||``)}" placeholder="e.g. 3-seater sofa">
      </div>
      <div class="form-group">
        <label class="form-label">Room</label>
        <select class="form-select" id="f-furn-room">
          <option value="">— Select room —</option>
          ${ei.map(t=>`<option value="${t}" ${e.room===t?`selected`:``}>${t}</option>`).join(``)}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Store / Vendor</label>
        <input class="form-input" id="f-furn-vendor" type="text" maxlength="200" value="${p(e.vendor||``)}" placeholder="e.g. Nick Scali">
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
      <input class="form-input" id="f-furn-notes" type="text" maxlength="200" value="${p(e.notes||``)}" placeholder="Optional — colour, dimensions, order number...">
    </div>
    <div class="form-group">
      <label class="form-label">Funding</label>
      <select class="form-select" id="f-furn-funding">
        <option value="own-funds" ${(e.funding||`own-funds`)===`own-funds`?`selected`:``}>Own Funds</option>
        <option value="loan"      ${e.funding===`loan`?`selected`:``}>Loan</option>
      </select>
    </div>
  `}function ni(e){return{id:e,name:document.getElementById(`f-furn-name`).value.trim(),room:document.getElementById(`f-furn-room`).value,vendor:document.getElementById(`f-furn-vendor`).value.trim(),price:parseFloat(document.getElementById(`f-furn-price`).value)||0,status:document.getElementById(`f-furn-status`).value,funding:document.getElementById(`f-furn-funding`).value,deliveryDate:document.getElementById(`f-exp-duedate`).value||null,notes:document.getElementById(`f-furn-notes`).value.trim()}}function ri(){openModal(`Add Furniture Item`,ti(),()=>{let e=ni(D(a.furniture));e.name&&(logActivity(`Added furniture`,e.name),a.furniture.push(e),saveData(a),closeModal(),renderAll())})}function ii(e){let t=a.furniture.find(t=>t.id===e);openModal(`Edit Furniture Item`,ti(t),()=>{let n=ni(e);logActivity(`Edited furniture`,n.name||t.name),Object.assign(t,n),saveData(a),closeModal(),renderAll()})}function ai(e){if(!confirm(`Delete this item?`))return;let t=a.furniture.find(t=>t.id===e);logActivity(`Deleted furniture`,t?t.name:``),a.furniture=a.furniture.filter(t=>t.id!==e),saveData(a),renderAll()}function oi(e={}){let t=e.deliveryDate?(()=>{let[t,n,r]=e.deliveryDate.split(`-`);return`${r}/${n}/${t}`})():``;return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-appl-name" type="text" maxlength="200" value="${p(e.name||``)}" placeholder="e.g. Dishwasher">
      </div>
      <div class="form-group">
        <label class="form-label">Room</label>
        <select class="form-select" id="f-appl-room">
          <option value="">— Select room —</option>
          ${ei.map(t=>`<option value="${t}" ${e.room===t?`selected`:``}>${t}</option>`).join(``)}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Store / Vendor</label>
        <input class="form-input" id="f-appl-vendor" type="text" maxlength="200" value="${p(e.vendor||``)}" placeholder="e.g. Harvey Norman">
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
      <input class="form-input" id="f-appl-notes" type="text" maxlength="200" value="${p(e.notes||``)}" placeholder="Optional — model number, colour, order reference...">
    </div>
    <div class="form-group">
      <label class="form-label">Funding</label>
      <select class="form-select" id="f-appl-funding">
        <option value="own-funds" ${(e.funding||`own-funds`)===`own-funds`?`selected`:``}>Own Funds</option>
        <option value="loan"      ${e.funding===`loan`?`selected`:``}>Loan</option>
      </select>
    </div>
  `}function si(e){return{id:e,name:document.getElementById(`f-appl-name`).value.trim(),room:document.getElementById(`f-appl-room`).value,vendor:document.getElementById(`f-appl-vendor`).value.trim(),price:parseFloat(document.getElementById(`f-appl-price`).value)||0,status:document.getElementById(`f-appl-status`).value,funding:document.getElementById(`f-appl-funding`).value,deliveryDate:document.getElementById(`f-exp-duedate`).value||null,notes:document.getElementById(`f-appl-notes`).value.trim()}}function ci(){openModal(`Add Appliance`,oi(),()=>{let e=si(D(a.appliances));e.name&&(logActivity(`Added appliance`,e.name),a.appliances.push(e),saveData(a),closeModal(),renderAll())})}function li(e){let t=a.appliances.find(t=>t.id===e);openModal(`Edit Appliance`,oi(t),()=>{let n=si(e);logActivity(`Edited appliance`,n.name||t.name),Object.assign(t,n),saveData(a),closeModal(),renderAll()})}function ui(e){if(!confirm(`Delete this item?`))return;let t=a.appliances.find(t=>t.id===e);logActivity(`Deleted appliance`,t?t.name:``),a.appliances=a.appliances.filter(t=>t.id!==e),saveData(a),renderAll()}function di(){let[e,t]=selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t-2,1);selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,safeRender(pi),safeRender(renderBudget)}function fi(){let[e,t]=selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t,1);selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,safeRender(pi),safeRender(renderBudget)}function pi(){let e=getMonthData(selectedBudgetMonth),t=e.income,n=e.expenses,r=E(t),i=E(n),o=r-i,s=r>0?Math.round(o/r*100):0,c={};n.forEach(e=>{let t=e.category||`Other`;c[t]=(c[t]||0)+T(e)});let l=Object.entries(c).sort((e,t)=>t[1]-e[1]),u=a.budget.actuals[selectedBudgetMonth]||{},d=n.reduce((e,t)=>e+getActual(t.id,selectedBudgetMonth),0),p=d>0,m=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
      <button class="btn btn-sm" onclick="prevMoneyMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${monthLabel(selectedBudgetMonth)}</span>
      <button class="btn btn-sm" onclick="nextMoneyMonth()" style="font-size:16px;padding:2px 10px">›</button>
      ${isMonthCustomized(selectedBudgetMonth)?`<span style="margin-left:8px;font-size:12px;padding:2px 10px;background:#dbeafe;color:#1d4ed8;border-radius:99px">Custom month</span>`:``}
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-label">Monthly Income</div>
        <div class="card-value green">${g(r)}</div>
        <div class="card-sub">${t.length} source${t.length===1?``:`s`}</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Expenses</div>
        <div class="card-value ${i>r?`red`:``}">${g(i)}</div>
        <div class="card-sub">${n.length} item${n.length===1?``:`s`}</div>
      </div>
      <div class="card">
        <div class="card-label">${o>=0?`Surplus`:`Deficit`}</div>
        <div class="card-value ${o>=0?`green`:`red`}">${g(Math.abs(o))}</div>
        <div class="card-sub">${o>=0?`left over each month`:`overspending each month`}</div>
      </div>
      <div class="card">
        <div class="card-label">Savings Rate</div>
        <div class="card-value ${s>=20?`green`:s>=10?`orange`:`red`}">${s}%</div>
        <div class="card-sub">of income remaining</div>
      </div>
    </div>
  `;if(m+=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-bottom:20px">`,m+=`
    <div class="section">
      <div class="section-header">
        <div class="section-title">Income</div>
        <span style="font-size:15px;font-weight:700;color:var(--success)">${g(r)}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Frequency</th><th class="amount">Monthly</th></tr></thead>
          <tbody>
            ${t.length===0?`<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:20px">No income added yet</td></tr>`:t.map(e=>{let t=r>0?Math.round(T(e)/r*100):0;return`<tr>
                    <td style="font-weight:500;border-left:4px solid #10b981">${f(e.name)}</td>
                    <td style="color:var(--text-muted);font-size:12px">${freqDisplayItem(e)}</td>
                    <td class="amount">${g(T(e))} <span style="color:var(--text-muted);font-size:11px">${t}%</span></td>
                  </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `,m+=`
    <div class="section">
      <div class="section-header">
        <div class="section-title">Expenses by Category</div>
        <span style="font-size:15px;font-weight:700;color:var(--danger)">${g(i)}</span>
      </div>
      <div style="padding:16px 20px">
        ${l.length===0?`<div style="color:var(--text-muted);text-align:center;padding:20px">No expenses added yet</div>`:l.map(([e,t])=>{let r=colors.expense[e]||`#94a3b8`,a=i>0?t/i*100:0,o=n.filter(t=>(t.category||`Other`)===e).reduce((e,t)=>e+(u[t.id]||0),0),s=n.some(t=>(t.category||`Other`)===e&&u[t.id]!==void 0);return`
                <div style="margin-bottom:16px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                    <span style="display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500">
                      <span style="width:11px;height:11px;border-radius:50%;background:${r};flex-shrink:0"></span>
                      ${e}
                    </span>
                    <span style="font-size:13px;font-weight:600">${g(t)}
                      <span style="font-weight:400;color:var(--text-muted);font-size:11px">${Math.round(a)}%</span>
                    </span>
                  </div>
                  <div style="height:7px;background:var(--surface2);border-radius:4px;overflow:hidden;position:relative">
                    <div style="height:100%;width:${a.toFixed(1)}%;background:${r};border-radius:4px;opacity:0.85"></div>
                    ${s?`<div style="position:absolute;top:0;height:100%;width:${Math.min(i>0?o/i*100:0,100).toFixed(1)}%;background:${r};border-radius:4px;border:1.5px solid #fff"></div>`:``}
                  </div>
                  ${s?`<div style="font-size:11px;color:var(--text-muted);margin-top:3px">Actual: ${g(o)}</div>`:``}
                </div>
              `}).join(``)}
      </div>
    </div>
  `,m+=`</div>`,p){let e=i-d;m+=`
      <div class="section" style="margin-bottom:20px">
        <div class="section-header">
          <div>
            <div class="section-title">Actuals — ${monthLabel(selectedBudgetMonth)}</div>
            <div class="section-subtitle">Recorded spending vs budget</div>
          </div>
          <div style="display:flex;gap:16px;align-items:center;font-size:13px;flex-wrap:wrap">
            <span>Budget: <strong>${g(i)}</strong></span>
            <span>Actual: <strong>${g(d)}</strong></span>
            <span style="font-weight:600;color:${e>=0?`var(--success)`:`var(--danger)`}">
              ${e>=0?`▼`:`▲`} ${g(Math.abs(e))} ${e>=0?`under`:`over`}
            </span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Expense</th><th>Category</th><th class="amount">Budget</th><th class="amount">Actual</th><th class="amount">Difference</th></tr></thead>
            <tbody>
              ${n.filter(e=>u[e.id]!==void 0).map(e=>{let t=T(e),n=u[e.id]||0,r=t-n,i=colors.expense[e.category||`Other`]||`#94a3b8`;return`<tr>
                    <td style="font-weight:500;border-left:4px solid ${i}">${f(e.name)}</td>
                    <td><span style="display:inline-block;padding:2px 9px;border-radius:99px;background:${i};color:#fff;font-size:11px;font-weight:600">${e.category||`Other`}</span></td>
                    <td class="amount">${g(t)}</td>
                    <td class="amount">${g(n)}</td>
                    <td class="amount" style="font-weight:600;color:${r>=0?`var(--success)`:`var(--danger)`}">
                      ${r>=0?`−`:`+`}${g(Math.abs(r))}
                    </td>
                  </tr>`}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `}let h=getLast6Months().map(e=>{let t=getMonthData(e);return{label:monthShortLabel(e),income:E(t.income),expenses:E(t.expenses),actual:Object.values(a.budget.actuals[e]||{}).reduce((e,t)=>e+t,0)}}),_=Math.max(...h.flatMap(e=>[e.income,e.expenses,e.actual]),1),v=524/h.length,y=v*.22,b=[0,.25,.5,.75,1].map(e=>{let t=148-e*136;return`<line x1="64" y1="${t}" x2="588" y2="${t}" stroke="#e2e8f0" stroke-width="1"/>
      <text x="59" y="${t+4}" text-anchor="end" font-size="9" fill="#94a3b8">${g(e*_)}</text>`}).join(``),x=h.map((e,t)=>{let n=64+t*v+v*.05,r=e.income>0?e.income/_*136:0,i=e.expenses>0?e.expenses/_*136:0,a=e.actual>0?e.actual/_*136:0,o=n+y+y/2+v*.04;return`
      <rect x="${n}"                        y="${148-r}" width="${y}" height="${r}" fill="#10b981" opacity="0.75" rx="2"/>
      <rect x="${n+y+v*.06}"       y="${148-i}" width="${y}" height="${i}" fill="#3b82f6" opacity="0.7"  rx="2"/>
      ${e.actual>0?`<rect x="${n+y*2+v*.12}" y="${148-a}" width="${y}" height="${a}" fill="${e.actual>e.expenses?`#ef4444`:`#f59e0b`}" opacity="0.85" rx="2"/>`:``}
      <text x="${o}" y="164" text-anchor="middle" font-size="10" fill="#64748b">${e.label}</text>
    `}).join(``);m+=`
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
          ${b}${x}
        </svg>
      </div>
    </div>
  `,document.getElementById(`money-content`).innerHTML=m}function mi(){if(a.setupProgressDismissed)return``;let e=setupProgressTasks(),t=e.filter(e=>e.done),n=e.filter(e=>!e.done),r=t.length,i=e.length,o=Math.round(r/i*100);if(r===i)return`<div class="td-card td-card-win" style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <span style="font-size:22px">🎉</span>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:700;color:var(--good)">Setup complete!</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px">Your household is fully configured.</div>
      </div>
      <button onclick="state.setupProgressDismissed=true;saveData(state);renderToday()" style="font-size:12px;color:var(--muted);background:none;border:none;cursor:pointer;font-weight:600;padding:0">Dismiss</button>
    </div>`;let s=2*Math.PI*22,c=`
    <div onclick="_spExpanded=!_spExpanded;_refreshSetupProgress()" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none">
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--ink)">Finish setting up Toto</div>
        <div style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:3px">${r} of ${i} complete</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <div style="position:relative;width:52px;height:52px">${`
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r="22" fill="none" stroke="var(--hairline)" stroke-width="4"/>
      <circle cx="26" cy="26" r="22" fill="none" stroke="var(--purple)" stroke-width="4"
        stroke-dasharray="${s.toFixed(1)}" stroke-dashoffset="${(s-o/100*s).toFixed(1)}"
        stroke-linecap="round" transform="rotate(-90 26 26)"/>
    </svg>
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:10px;font-weight:700;color:var(--purple)">${o}%</div>`}</div>
        <span style="font-size:10px;color:var(--muted-soft)">${_spExpanded?`▲`:`▼`}</span>
      </div>
    </div>
    <div style="background:var(--hairline);border-radius:99px;height:4px;margin-top:14px;overflow:hidden">
      <div style="width:${o}%;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--iris-2),var(--iris-3))"></div>
    </div>`;if(!_spExpanded)return`<div class="td-card" style="margin-bottom:10px">${c}</div>`;let l=n[0],u=n.map(e=>{let t=e===l,n=e.settingsSection?`activateTab('${e.tab}');setTimeout(()=>{const el=document.getElementById('acc-${e.settingsSection||``}');if(el&&!el.classList.contains('open')){el.querySelector('.acc-header')?.click();}el?.scrollIntoView({behavior:'smooth',block:'start'})},200)`:e.tab?`activateTab('${e.tab}')`:``,r=n?`onclick="${n}"`:``;return`<div style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;background:${t?`var(--purple-tint)`:`transparent`};border:1px solid ${t?`var(--purple-mid,#DDD6FE)`:`var(--hairline)`};cursor:${e.tab?`pointer`:`default`}" ${r}>
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
      <div onclick="_spDoneExpanded=!_spDoneExpanded;_refreshSetupProgress()" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:4px 0;margin-bottom:${_spDoneExpanded?`8px`:`0`}">
        <span style="font-size:12px;font-weight:600;color:var(--good)">${r} done</span>
        <span style="font-size:10px;color:var(--muted-soft)">${_spDoneExpanded?`▲`:`▼`}</span>
      </div>
      ${_spDoneExpanded?`<div style="display:flex;flex-direction:column;gap:5px">${d}</div>`:``}
    </div>`:``}
      <div style="text-align:center;margin-top:12px">
        <button onclick="state.setupProgressDismissed=true;saveData(state);renderToday()" style="font-size:12px;color:var(--muted);background:none;border:none;cursor:pointer">Dismiss · I'll do this later</button>
      </div>
    </div>`}var hi=[`#FF3B3B`,`#FF8A65`,`#FFB088`,`#FCD34D`,`#94A3B8`,`#27272a`];function gi(e){let t=(e.expenses||[]).filter(e=>!e.skipped).map(e=>({name:e.name||`Other`,amount:freqToMonthly(Number(e.amount)||0,e.frequency)})).filter(e=>e.amount>0).sort((e,t)=>t.amount-e.amount);if(!t.length)return{segments:[],total:0};let n=t.reduce((e,t)=>e+t.amount,0),r=t.slice(0,5),i=t.slice(5),a=r.map((e,t)=>({name:e.name,pct:e.amount/n*100,color:hi[t]||`#94A3B8`}));if(i.length){let e=i.reduce((e,t)=>e+t.amount,0);a.push({name:`Other`,pct:e/n*100,color:hi[5]})}return{segments:a,total:n}}function _i(e){let t=(e.title||``).toLowerCase();return t.includes(`dinner`)||t.includes(`lunch`)||t.includes(`meal`)?`i-chef-hat`:t.includes(`rego`)||t.includes(`vehicle`)?`i-car`:t.includes(`health:`)?`i-activity`:t.includes(`over budget`)?`i-zap`:t.includes(`left in budget`)||t.includes(`budget`)?`i-wallet`:t.includes(`bill`)||t.includes(`due`)?`i-receipt`:t.includes(`expir`)?`i-file-text`:t.includes(`overdue`)||t.includes(`maintenance`)?`i-clipboard-check`:e.section===`Plan`?`i-calendar`:e.section===`Home`?`i-home`:e.section===`Wallet`?`i-wallet`:`i-clipboard-check`}function vi(e){let t=e.section;return t===`Wallet`?`money`:t===`Plan`?`social`:t===`Home`?`work`:t===`Family`?`family`:`study`}function yi(e){return(e.section||`Task`).toLowerCase()}function bi(){let e=[`S`,`M`,`T`,`W`,`T`,`F`,`S`],t=new Date,n=t.getDay()===0?6:t.getDay()-1,r=new Date(t);r.setDate(t.getDate()-n);let i=new Set;(a.bills||[]).forEach(e=>{let t=e.dueDate||e.nextDue;t&&i.add(t.slice(0,10))}),(a.planner?.events||[]).forEach(e=>{e.date&&i.add(e.date.slice(0,10))}),(a.maintenance||[]).forEach(e=>{e.nextDue&&i.add(e.nextDue.slice(0,10))});let o=[];for(let n=0;n<7;n++){let a=new Date(r);a.setDate(r.getDate()+n);let s=a.toISOString().slice(0,10),c=a.toDateString()===t.toDateString(),l=a<t&&!c,u=a.getDay(),d=c?`ws-day today`:l?`ws-day past`:`ws-day`,f=i.has(s)?` has`:``;o.push(`<div class="${d}${f}"><div class="ws-init">${e[u]}</div><div class="ws-num">${a.getDate()}</div><div class="ws-dot"></div></div>`)}return`<div class="week-strip">${o.join(``)}</div>`}function xi(e){return`<div class="life-grid">`+[{cls:`money`,label:`Money`,match:e=>e.section===`Wallet`,icon:`<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>`,track:`#DDD6FE`,stroke:`#5B4CF5`},{cls:`family`,label:`Family`,match:e=>/kid|chore|family|riley|mia|child/i.test(e.title||``),icon:`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>`,track:`#A7F3D0`,stroke:`#10B981`},{cls:`work`,label:`Home`,match:e=>e.section===`Home`,icon:`<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,track:`#FDE9B0`,stroke:`#F59E0B`},{cls:`social`,label:`Plan`,match:e=>e.section===`Plan`,icon:`<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,track:`#FECDD3`,stroke:`#F43F5E`}].map(t=>{let n=(e||[]).filter(t.match),r=n.length,i=n.filter(e=>e.cls===`red`||e.cls===`amber`).length,a=(82-(r>0?Math.max(0,1-i/r):1)*82).toFixed(1);return`<div class="life-card ${t.cls}" onclick="activateTab('${t.cls===`money`?`budget`:t.cls===`family`?`kids`:t.cls===`work`?`documents`:`planner`}')">
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
    </div>`}).join(``)+`</div>`}function Si(e){let t=e.onclick?e.onclick:e.tab?`activateTab('${e.tab}')`:``,n=_i(e),r=[`red`,`amber`,`green`,`blue`].includes(e.cls)?e.cls:`grey`;return`<div class="brief-row"${t?` onclick="${t}"`:``}>
    <div class="brief-glyph ${r}"><svg viewBox="0 0 24 24"><use href="#${n}"/></svg></div>
    <div class="brief-body">
      <div class="t">${e.title||``}</div>
      ${e.sub?`<div class="s">${e.sub}</div>`:``}
    </div>
    <svg class="brief-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  </div>`}function Ci(){let e=document.getElementById(`today-content`);if(!e)return;let t=new Date,r=t.getHours(),i=t.toISOString().slice(0,10);function o(e){return e<5?`overnight`:e<12?`morning`:e<17?`afternoon`:e<21?`evening`:`night`}let s=o(r),c={morning:`Good morning,`,afternoon:`Good afternoon,`,evening:`Wind down,`,night:`Tomorrow at a glance —`,overnight:`Still up,`}[s]||`Hello,`,l=_currentUser?.displayName?.split(` `)[0]||a.settings?.adultName?.split(` `)[0]||a.settings?.adults?.[0]?.name?.split(` `)[0]||a.householdProfile?.members?.find(e=>e.role===`adult`)?.name?.split(` `)[0]||``,u=t.toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`}).toUpperCase(),d=[],p=(a.bills||[]).map(e=>({...e,days:n(e)})).filter(e=>e.days!==null&&e.days<=2).sort((e,t)=>e.days-t.days);(a.maintenance||[]).filter(e=>{let t=_maintDaysUntil(e);return t!==null&&t<0}),(a.documents||[]).filter(e=>e.expiryDate&&new Date(e.expiryDate)<t),(a.vehicles||[]).filter(e=>e.regoExpiry&&new Date(e.regoExpiry)<t);let m=[];(a.documents||[]).forEach(e=>{e.expiryDate&&new Date(e.expiryDate)<t&&m.push({label:f(e.name),sub:`Document expired`,cls:`alert`,tab:`documents`})}),(a.maintenance||[]).forEach(e=>{let t=_maintDaysUntil(e);t!==null&&t<0&&m.push({label:f(e.name),sub:`${Math.abs(t)}d overdue`,cls:`watch`,tab:`maintenance`})}),(a.vehicles||[]).forEach(e=>{e.regoExpiry&&new Date(e.regoExpiry)<t&&m.push({label:f(e.name)+` rego`,sub:`Expired`,cls:`alert`,tab:`vehicles`})});let h=p.length>0,g=m.length>0;if(h||g){let e=p.length===1?p[0].days===0?`due today`:p[0].days===1?`due tomorrow`:`due in ${p[0].days} days`:`bill${p.length===1?``:`s`} due soon`,t=h?`
      <div onclick="_tdOpenHeadsUpSheet()" style="flex:1;min-width:0;background:var(--purple-soft);border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(91,76,245,.15);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(91,76,245,.08);position:relative;overflow:hidden">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(91,76,245,.18) 0%,transparent 70%);pointer-events:none"></div>
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--iris-2);margin-bottom:6px">Heads Up</div>
          <div style="font-size:36px;font-weight:800;color:var(--iris-1);letter-spacing:-.05em;line-height:1">${p.length}</div>
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
      </div>`,n=g?`
      <div onclick="_tdOpenSlippingSheet()" style="flex:1;min-width:0;background:#FFF4EE;border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(249,115,22,.18);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(249,115,22,.06);position:relative;overflow:hidden">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.15) 0%,transparent 70%);pointer-events:none"></div>
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c2410c;margin-bottom:6px">Slipping</div>
          <div style="font-size:36px;font-weight:800;color:var(--ember);letter-spacing:-.05em;line-height:1">${m.length}</div>
          <div style="font-size:12px;color:#c2410c;margin-top:3px">item${m.length===1?``:`s`} overdue</div>
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
      </div>`;d.push({type:`priority`,urgency:p.length>0?3:g?2:0,html:`<div style="display:flex;gap:12px;margin-bottom:12px">${t}${n}</div>`})}let _=s===`evening`||s===`night`?new Date(t.getTime()+864e5).toISOString().slice(0,10):i,v=_===i?`Today`:`Tomorrow`,y=_plannerEventsForDate?_plannerEventsForDate(_):[];if(y.length>0){let e=t.getHours()*60+t.getMinutes(),n=y.slice(0,4).map((t,n,r)=>{let a=t.allDay||!t.time?`All day`:_plannerFmt12h?_plannerFmt12h(t.time):t.time,o=_plannerEvWhoLabel?_plannerEvWhoLabel(t):``,s=_plannerEvPrimaryMember?_plannerEvPrimaryMember(t):{dot:`var(--iris-2)`},c=PLANNER_CATS?PLANNER_CATS[t.category]||PLANNER_CATS.other:{emoji:`📅`,label:``},l=t.time?parseInt(t.time.split(`:`)[0])*60+parseInt(t.time.split(`:`)[1]):-1,u=_===i&&l>=0&&e>=l&&e<l+90,d=n===Math.min(y.length,4)-1,p=c.color||`#f1f5f9`,m=c.text||`#475569`;return m.replace(/^#/,``),`<div class="pl-agenda-ev" style="margin-bottom:${d?`0`:`8px`}">
        <div class="pl-agenda-time-col">
          <span class="pl-agenda-time">${a}</span>
        </div>
        <div class="pl-agenda-timeline">
          <div class="pl-agenda-dot${u?` now`:``}" style="color:${m};background:${u?m:p}"></div>
          ${d?``:`<div class="pl-agenda-line"></div>`}
        </div>
        <div class="pl-agenda-card" style="background:${p};border-color:${m}22" onclick="activateTab('planner');setTimeout(()=>_plannerOpenDetail&&_plannerOpenDetail('${t.id}'),120)">
          <div class="pl-agenda-card-title">${f(t.title)}</div>
          <div class="pl-agenda-card-meta">
            <span class="pl-agenda-who-dot" style="background:${s.dot}"></span>
            <span>${o}</span>
          </div>
          ${c.label?`<div class="pl-agenda-cat-pill" style="background:${m}1a;color:${m}">${c.emoji} ${c.label}</div>`:``}
        </div>
      </div>`}).join(``);d.push({type:`schedule`,urgency:1,html:`<div class="td-card td-card-schedule" style="padding:0;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;border-bottom:1px solid rgba(24,24,27,.06)">
          <div class="td-card-meta" style="margin-bottom:0"><span class="td-meta-label">${v}</span><span class="td-meta-count" style="margin-left:2px">${y.length}</span></div>
          <span style="font-size:12px;font-weight:600;color:var(--iris-2);cursor:pointer" onclick="activateTab('planner')">See all →</span>
        </div>
        <div style="padding:12px 16px">${n}</div>
      </div>`})}let b=getMonthData(selectedBudgetMonth),x=E(b.income),S=E(b.expenses),C=x-S,w=(b.expenses||[]).reduce((e,t)=>e+getActual(t.id,selectedBudgetMonth),0),T=new Date(t.getFullYear(),t.getMonth()+1,0).getDate()-t.getDate(),D=S>0?Math.min(100,Math.round(w/S*100)):0;if(x>0||S>0){let e=C>=0?``:`td-money-status-watch`,n=C>=0?`On track`:`Over budget`,r=Math.abs(C),i=[];p.forEach(e=>i.push(`<span class="td-money-flag td-money-flag-watch">${f(e.name)} due ${e.days===0?`today`:e.days===1?`tomorrow`:`in `+e.days+`d`}</span>`)),d.push({type:`money`,urgency:0,html:`<div class="td-card td-card-money">
        <div class="td-money-row">
          <div>
            <div class="td-card-meta"><span class="td-meta-label">${t.toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</span></div>
            <div class="money-amount"><span class="money-amount-currency">$</span>${r.toLocaleString(`en-AU`,{maximumFractionDigits:0})}<span class="money-amount-suffix">${C>=0?`left`:`over`}</span></div>
          </div>
          <span class="td-money-status ${e}">${n}</span>
        </div>
        <div class="td-money-bar"><div class="td-money-bar-fill" style="width:${D}%"></div></div>
        <div class="td-money-flags">${i.join(``)}<span class="td-money-flag">${T} days left</span></div>
      </div>`})}let ee=typeof _routinesForCurrentUser==`function`?_routinesForCurrentUser().filter(e=>_routineMatchesDate(e,i)):[];function O(e){if(!e.triggerTime)return!0;let[n,r]=e.triggerTime.split(`:`).map(Number),i=t.getHours()*60+t.getMinutes(),a=n*60+(r||0);return i>=a-90&&i<a+360}let k=ee.filter(O),te=typeof _routineTodayKey==`function`?_routineTodayKey():i.replace(/-/g,``),A=ee.filter(e=>!O(e)&&(e.completions?.[te]||[]).length>0),ne=[...new Set([...k,...A])];if(ne.length>0){let e=ne.map(e=>{let t=(e.completions?.[te]||[]).map(String),n=e.steps.length,r=t.length,i=n>0?Math.round(r/n*100):0,a=r===n&&n>0,o=O(e),s=e.triggerTime?`<span style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-left:6px">${e.triggerTime}</span>`:``,c=e.steps.map(n=>{let r=t.includes(String(n.id)),i=n.durationMin?`<span style="font-family:var(--mono);font-size:10px;color:var(--muted-soft);margin-left:auto;padding-left:8px;flex-shrink:0">${n.durationMin}m</span>`:``;return`<div class="td-routine-step ${r?`td-routine-step-done`:``}" onclick="_tdToggleStep('${e.id}','${n.id}')">
          <div class="td-routine-check ${r?`td-routine-check-done`:``}">
            ${r?`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``}
          </div>
          <span class="td-routine-step-emoji">${n.emoji||``}</span>
          <span class="td-routine-step-label ${r?`td-routine-step-label-done`:``}">${f(n.label)}</span>
          ${n.points?`<span class="td-routine-step-pts">+${n.points}</span>`:``}
          ${i}
        </div>`}).join(``);return`<div class="td-routine-card ${a?`td-routine-card-done`:o?`td-routine-card-active`:`td-routine-card-locked`}">
        <div class="td-routine-header">
          <span style="font-size:20px">${e.emoji||`📋`}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;color:var(--ink)">${f(e.name)}${s}</div>
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
      </div>`})}let re=new Date(t.getTime()+7*864e5).toISOString().slice(0,10),j=(a.planner?.events||[]).filter(e=>e.date>i&&e.date<=re).sort((e,t)=>e.date.localeCompare(t.date)).slice(0,3),ie=(a.bills||[]).map(e=>({...e,days:n(e)})).filter(e=>e.days!==null&&e.days>2&&e.days<=7);if(j.length+ie.length>0){let e=[...j.map(e=>{let t=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`}),n=!e.allDay&&e.time?_plannerFmt12h?_plannerFmt12h(e.time):e.time:``;return`<div class="td-up-row td-clickable" onclick="activateTab('planner');setTimeout(()=>_plannerOpenDetail&&_plannerOpenDetail('${e.id}'),120)">
          <div style="display:flex;flex-direction:column;gap:1px;min-width:60px;flex-shrink:0">
            <span class="td-up-date">${t}</span>
            ${n?`<span style="font-family:var(--mono);font-size:10px;color:var(--iris-2);font-weight:600">${n}</span>`:``}
          </div>
          <span class="td-up-title" style="flex:1">${f(e.title)}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hairline)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>`}),...ie.map(e=>`<div class="td-up-row td-clickable" onclick="activateTab('bills')">
        <span class="td-up-date">In ${e.days}d</span>
        <span class="td-up-title" style="flex:1">${f(e.name)} <span style="font-family:var(--mono);color:var(--muted)">$${parseFloat(e.amount).toFixed(0)}</span></span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hairline)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`)].slice(0,4).join(``);d.push({type:`upcoming`,urgency:0,html:`<div class="td-card">
        <div class="td-card-meta"><span class="td-meta-label">Coming up</span><span class="td-meta-count">${j.length+ie.length}</span></div>
        <div class="td-up-list">${e}</div>
      </div>`})}let M=(a.kids?.profiles||[]).map(e=>{let t=(a.routineAssignments||[]).filter(t=>t.childId===e.id),n=0;return t.forEach(e=>{let t=(a.routines||[]).find(t=>t.id===e.routineId);if(t){let r=_assignmentStreak?_assignmentStreak(e,t.steps.length):0;r>n&&(n=r)}}),{kid:e,streak:n}}).filter(e=>e.streak>=3);if(M.length>0){let e=M[0];d.push({type:`win`,urgency:0,html:`<div class="td-card td-card-win">
        <div class="td-card-meta"><span class="td-meta-label" style="color:var(--lime-deep)">Win</span></div>
        <div class="td-card-headline" style="font-family:var(--serif);font-style:italic">${f(e.kid.name)} did every routine. ${e.streak} days running.</div>
      </div>`})}{let e=a.lists&&a.lists.food?a.lists.food:{items:[]},t=(e.items||[]).filter(e=>e.state===`active`),n=(e.items||[]).filter(e=>e.state===`got_it`),r=a.kids,i=r?(r.completions||[]).filter(e=>e.status===`pending`).length+(r.redemptions||[]).filter(e=>e.status===`pending`).length:0,o=a.kids?.profiles?.length>0,s=`
      <div onclick="_listsActiveType='food';_listsView='list';activateTab('lists')" style="flex:1;min-width:0;background:var(--purple-soft);border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:130px;border:1px solid rgba(91,76,245,.12);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(91,76,245,.08)">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--iris-2);margin-bottom:6px">Shopping List</div>
          <div style="font-size:28px;font-weight:800;color:var(--iris-1);letter-spacing:-.04em;line-height:1">${t.length}</div>
          <div style="font-size:12px;color:var(--iris-2);margin-top:2px">${t.length===1?`item`:`items`}${n.length>0?` · ${n.length} in trolley`:``}</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--iris-1);margin-top:10px">View list →</div>
      </div>`,c=o?`
      <div onclick="activateTab('kids')" style="flex:1;min-width:0;background:${i>0?`#FFF7ED`:`#F0FDF4`};border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:130px;border:1px solid ${i>0?`rgba(249,115,22,.15)`:`rgba(16,185,129,.15)`};box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(22,20,15,.05)">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${i>0?`#c2410c`:`#059669`};margin-bottom:6px">Kids</div>
          <div style="font-size:28px;font-weight:800;color:${i>0?`var(--ember)`:`var(--good)`};letter-spacing:-.04em;line-height:1">${i>0?i:`✓`}</div>
          <div style="font-size:12px;color:${i>0?`#c2410c`:`#059669`};margin-top:2px">${i>0?`approval${i===1?``:`s`} pending`:`all clear`}</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:${i>0?`var(--ember)`:`var(--good)`};margin-top:10px">${i>0?`Review →`:`View kids →`}</div>
      </div>`:``;d.push({type:`lists`,urgency:+(i>0),html:`<div style="display:flex;gap:12px;margin-bottom:12px">${s}${c}</div>`})}function ae(){let e={overnight:`Quiet night.`,morning:`Quiet day ahead.`,afternoon:`Quiet afternoon.`,evening:`Quiet evening.`,night:`Nothing pressing tonight.`},t=[];if(y.length>=3?t.push(`${y.length} things on the calendar.`):y.length===0&&m.length===0&&p.length===0&&t.push(e[s]||`Quiet day ahead.`),p.length>0){let e=p[0];t.push(`${e.name} ${e.days===0?`is due today`:`is due tomorrow`}.`)}return t.length===0&&t.push(e[s]||`Quiet day ahead.`),t.slice(0,2).join(` `)}let N=ae(),oe={priority:0,schedule:1,money:2,lists:3,kids:4,slipping:5,upcoming:6,win:7};d.sort((e,t)=>(oe[e.type]??9)-(oe[t.type]??9));let se=d.map(e=>e.html).join(``),ce=d.length<=1?`<div class="td-calm">You're sorted.<br>See you tomorrow.</div>`:``,le=typeof mi==`function`?`<div id="setup-progress-card">${mi()}</div>`:``;if(e.innerHTML=`
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
      <div class="td-greeting-brief">${f(N)}</div>
    </div>

    ${le}
    ${a.settings?.typeAMode?`
      ${_renderLifeScore()}
      ${_renderMissionCard()}
    `:``}
    ${se}
    ${ce}
  `,a.settings?.typeAMode&&_checkMissionEscalation(),typeof Mi==`function`){let e=typeof calcFinancialHealth==`function`?calcFinancialHealth():null,n=typeof _mealWeekKey==`function`?_mealWeekKey(0):null,r=n&&a.meals?.plan?.[n]?.[t.getDay()===0?6:t.getDay()-1]||{};Mi(d.map(e=>({title:e.type})),C,T,r,e)}}function wi(){let e=(a.bills||[]).map(e=>({...e,days:n(e)})).filter(e=>e.days!==null&&e.days<=2).sort((e,t)=>e.days-t.days);if(!e.length)return;let t=e.reduce((e,t)=>e+(parseFloat(t.amount)||0),0);Ei(`Heads Up`,e.map(e=>{let t=e.days===0?`Due today`:e.days===1?`Tomorrow`:`In ${e.days} days`,n=e.days===0?`background:#FEF2F2;color:#b91c1c`:e.days===1?`background:#FFF4EE;color:#c2410c`:`background:var(--paper);color:var(--muted)`,r=e.amount?`$${parseFloat(e.amount).toLocaleString(`en-AU`,{minimumFractionDigits:2,maximumFractionDigits:2})}`:``,i=e.days===0?`box-shadow:0 0 0 3px rgba(239,68,68,.2)`:e.days===1?`box-shadow:0 0 0 3px rgba(249,115,22,.2)`:``;return`<div style="display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--hairline);gap:14px">
      <div style="width:8px;height:8px;border-radius:50%;background:${e.days===0?`#ef4444`:e.days===1?`var(--ember)`:`var(--iris-2)`};flex-shrink:0;${i}"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:var(--ink)">${f(e.name)}</div>
        ${e.notes?`<div style="font-size:11px;color:var(--muted);margin-top:2px;font-family:var(--mono)">${f(e.notes)}</div>`:``}
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
  </div>`)}function Ti(){let e=new Date,t=[];(a.documents||[]).forEach(n=>{n.expiryDate&&new Date(n.expiryDate)<e&&t.push({label:n.name,sub:`Documents`,badge:`Expired`,cls:`alert`,tab:`documents`})}),(a.maintenance||[]).forEach(e=>{let n=_maintDaysUntil(e);n!==null&&n<0&&t.push({label:e.name,sub:`Maintenance`,badge:`${Math.abs(n)}d overdue`,cls:`watch`,tab:`maintenance`})}),(a.vehicles||[]).forEach(n=>{n.regoExpiry&&new Date(n.regoExpiry)<e&&t.push({label:n.name+` rego`,sub:`Vehicles`,badge:`Expired`,cls:`alert`,tab:`vehicles`})}),t.length&&Ei(`Slipping`,t.map(e=>{let t=e.cls===`alert`?`#ef4444`:`var(--ember)`,n=e.cls===`alert`?`box-shadow:0 0 0 3px rgba(239,68,68,.15)`:`box-shadow:0 0 0 3px rgba(249,115,22,.18)`,r=e.cls===`alert`?`background:#FEF2F2;color:#b91c1c`:`background:#FFF4EE;color:#c2410c`;return`<div onclick="activateTab('${e.tab}');_tdCloseSheet()" style="display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--hairline);gap:14px;cursor:pointer">
      <div style="width:8px;height:8px;border-radius:50%;background:${t};flex-shrink:0;${n}"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:var(--ink)">${f(e.label)}</div>
        <div style="font-size:11px;color:var(--muted);margin-top:2px;font-family:var(--mono)">${e.sub}</div>
      </div>
      <div style="display:inline-block;font-family:var(--mono);font-size:10px;font-weight:700;border-radius:99px;padding:2px 8px;${r}">${e.badge}</div>
    </div>`}).join(``)+`<div style="padding:14px 18px;border-top:1px solid var(--hairline);display:flex;justify-content:flex-end">
    <button onclick="_tdCloseSheet()" style="background:linear-gradient(135deg,#ea6c0a,var(--ember));color:#fff;border:none;border-radius:99px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer">Done</button>
  </div>`)}function Ei(e,t){let n=document.getElementById(`td-sheet-overlay`);n||(n=document.createElement(`div`),n.id=`td-sheet-overlay`,n.style.cssText=`position:fixed;inset:0;z-index:1200;display:flex;flex-direction:column;justify-content:flex-end;background:rgba(0,0,0,.4)`,n.onclick=e=>{e.target===n&&Di()},document.body.appendChild(n)),n.innerHTML=`
    <div id="td-sheet-panel" style="background:var(--pearl);border-radius:24px 24px 0 0;max-height:80vh;display:flex;flex-direction:column;padding-bottom:env(safe-area-inset-bottom,16px)">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 18px 14px;border-bottom:1px solid var(--hairline);flex-shrink:0">
        <div style="width:36px;height:4px;background:var(--hairline);border-radius:99px;position:absolute;top:10px;left:50%;transform:translateX(-50%)"></div>
        <div style="font-size:17px;font-weight:800;color:var(--ink);letter-spacing:-.015em">${f(e)}</div>
        <button onclick="_tdCloseSheet()" style="background:var(--paper);border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:15px;color:var(--muted);display:flex;align-items:center;justify-content:center">×</button>
      </div>
      <div style="overflow-y:auto;flex:1">${t}</div>
    </div>`,n.style.display=`flex`}function Di(){let e=document.getElementById(`td-sheet-overlay`);e&&(e.style.display=`none`)}function Oi(e,t){let n=(a.routines||[]).find(t=>String(t.id)===String(e));if(!n)return;let r=_routineTodayKey();n.completions||(n.completions={}),n.completions[r]||(n.completions[r]=[]),n.completions[r]=n.completions[r].map(String);let i=String(t),o=n.completions[r].indexOf(i);o===-1?n.completions[r].push(i):n.completions[r].splice(o,1),saveData(a),Ci()}function ki(){let e=[],t=new Date,n=getMonthData(selectedBudgetMonth),r=E(n.income)-E(n.expenses);r<0&&e.push({headline:`Spending is ahead of budget this month.`,detail:`You're $${Math.abs(r).toFixed(0)} over.`,action:`budget`}),(a.documents||[]).filter(e=>e.expiryDate).forEach(n=>{let r=Math.ceil((new Date(n.expiryDate)-t)/864e5);r>=0&&r<=30&&e.push({headline:`${n.name} expires in ${r} day${r===1?``:`s`}.`,detail:`Keep it updated.`,action:`documents`})}),e.length===0&&e.push({headline:`All clear. Nothing to flag.`,detail:`Check back later.`,action:null});let i=e.map(e=>`<div style="padding:16px 0;border-bottom:1px solid var(--hairline)">
    <div style="font-family:var(--serif);font-style:italic;font-size:17px;font-weight:400;margin-bottom:4px;color:var(--ink)">${f(e.headline)}</div>
    <div style="font-size:13px;color:var(--muted)">${f(e.detail)}</div>
    ${e.action?`<button onclick="activateTab('${e.action}');closeQuickAdd&&closeQuickAdd()" style="margin-top:10px;padding:7px 14px;border-radius:99px;background:var(--ink);color:var(--pearl);font-size:12px;font-weight:500;border:none;cursor:pointer">View →</button>`:``}
  </div>`).join(``);typeof openModal==`function`&&openModal(`💡 Insights`,`<div style="padding:0 4px">${i}</div>`,null)}var Ai=``,ji=``;async function Mi(e,t,n,r,i){let o=P(`toto_ai_key`);if(!o)return;let s=new Date().toISOString().slice(0,10);if(Ai===s&&ji){let e=document.getElementById(`today-briefing-text`);e&&(e.textContent=ji);return}let c=e.filter(e=>e.cls===`red`).map(e=>e.title),l=e.filter(e=>e.cls===`amber`).map(e=>e.title),u=`You are Toto, a friendly family personal assistant app. Write a 2-sentence daily briefing for the user based on this context:

${[`Budget: ${g(Math.abs(t))} ${t>=0?`surplus`:`over budget`}, ${n} days left in the month`,`Health score: ${i.total}/100 (${i.grade})`,c.length?`Urgent: ${c.join(`, `)}`:``,l.length?`Coming up: ${l.join(`, `)}`:``,r.d?`Dinner tonight: ${r.d}`:`No dinner planned`,`${(a.goals||[]).filter(e=>e.status!==`achieved`).length} active goals`].filter(Boolean).join(`. `)}

Rules:
- Warm, conversational, like a helpful friend
- Lead with the most important thing
- Mention dinner if planned
- Keep it under 40 words
- No emojis, no bullet points, just flowing text
- Don't start with "Here's" or "Today"`;try{let e=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":o,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:100,messages:[{role:`user`,content:u}]})});if(!e.ok)return;let t=(await e.json()).content[0].text.trim().replace(/^["']|["']$/g,``);ji=t,Ai=s;let n=document.getElementById(`today-briefing-text`);n&&(n.textContent=t)}catch{}}function Ni(){let e=a,r=e.buildContract,i=(e.netWorth.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),o=(e.netWorth.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),s=i-o,c=e.netWorth.snapshots||[],l=``;if(c.length>=2){let e=s-c[c.length-2].netWorth;l=`<span class="${e>=0?`up`:`dn`}">${e>=0?`+`:``}${fmtNW(e)}</span> vs last snapshot`}let u=selectedBudgetMonth,d=getMonthData(u),p=E(d.income),m=E(d.expenses),h=p-m,_=(e.subscriptions||[]).reduce((e,t)=>e+subMonthlyAmount(t),0),v=(e.bills||[]).filter(e=>{let t=n(e);return t>=0&&t<=31}).reduce((e,t)=>e+(parseFloat(t.amount)||0),0),y=[...e.bills||[]].filter(e=>n(e)>=-1).sort((e,t)=>n(e)-n(t)).slice(0,5),b=(e.goals||[]).filter(e=>e.status!==`achieved`).slice(0,4),x=r.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),S=(r.variations||[]).filter(e=>e.status===`approved`).reduce((e,t)=>e+(t.amount||0),0),C=r.total+S,w=Math.round(x/C*100),T=r.stages.find(e=>!e.paid),D=((e.kids||{}).completions||[]).filter(e=>e.status===`pending`).length+((e.kids||{}).redemptions||[]).filter(e=>e.status===`pending`).length,ee=getLast6Months(),O=E(d.expenses),k=ee.map(e=>{let t=Object.values(a.budget.actuals[e]||{}).reduce((e,t)=>e+t,0);return{label:monthShortLabel(e),budget:O,actual:t}}),te=O>0||k.some(e=>e.actual>0),A=calcFinancialHealth(),ne=251.3,re=(A.total/100*ne).toFixed(1),j=A.dimensions.map(e=>{let t=Math.round(e.score/e.max*100),n=t>=75?`#10b981`:t>=50?`#f59e0b`:`#ef4444`;return`
      <div style="display:grid;grid-template-columns:130px 1fr 30px;align-items:center;gap:8px">
        <span style="font-size:12px;color:var(--text-muted);white-space:nowrap">${e.label}</span>
        <div style="height:6px;background:var(--border);border-radius:4px;overflow:hidden">
          <div style="height:100%;width:${t}%;background:${n};border-radius:4px;transition:width 0.4s"></div>
        </div>
        <span style="font-size:11px;font-weight:600;color:${n};text-align:right">${e.score}/${e.max}</span>
      </div>`}).join(``),ie=`
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
        <div style="display:flex;flex-direction:column;gap:10px">${j}</div>
      </div>
      <div style="padding:0 20px 14px;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:10px;margin-top:4px">
        💡 ${A.insight}
      </div>
    </div>`,M=``;if(te){let e=Math.max(...k.flatMap(e=>[e.budget,e.actual]),1),t=532/k.length,n=t*.28,r=t*.04;M=`<div class="db-widget">
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
        <text x="53" y="${n+4}" text-anchor="end" font-size="9" fill="#94a3b8">${g(t*e)}</text>`}).join(``)}${k.map((i,a)=>{let o=58+a*t+t*.08,s=i.budget>0?i.budget/e*140:0,c=i.actual>0?i.actual/e*140:0,l=i.actual>i.budget?`#ef4444`:`#10b981`;return`<rect x="${o}" y="${150-s}" width="${n}" height="${s}" fill="#2563eb" opacity="0.65" rx="2"/>
        <rect x="${o+n+r}" y="${150-c}" width="${n}" height="${c}" fill="${l}" opacity="0.8" rx="2"/>
        <text x="${o+n+r/2+n/2}" y="166" text-anchor="middle" font-size="10" fill="#64748b">${i.label}</text>`}).join(``)}</svg>
      </div>
    </div>`}let ae=`
    <!-- Hero row: net worth + 4 stats -->
    <div class="db-hero-row">
      <div class="db-nw-card" onclick="activateTab('networth')" style="cursor:pointer">
        <div>
          <div class="db-nw-label">Net Worth</div>
          <div class="db-nw-amount">${fmtNW(s)}</div>
          ${l?`<div class="db-nw-change">${l}</div>`:``}
        </div>
        <div style="font-size:12px;opacity:0.6;margin-top:12px">${g(i)} assets · ${g(o)} liabilities</div>
      </div>
      <div class="db-stats-col">
        <div class="db-stat">
          <div class="db-stat-val ${h>=0?`green`:`red`}">${g(Math.abs(h))}</div>
          <div class="db-stat-lbl">Monthly ${h>=0?`surplus`:`deficit`}</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val teal">$${Math.round(v).toLocaleString()}</div>
          <div class="db-stat-lbl">Bills this month</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val">$${Math.round(_).toLocaleString()}</div>
          <div class="db-stat-lbl">Subscriptions/mo</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val">${g(p)}</div>
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
    ${ie}

    <!-- Two-column widgets -->
    <div class="db-grid">
      <div>
        <!-- Upcoming bills -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Upcoming Bills</span>
            <button class="db-widget-link" onclick="activateTab('bills')">View all →</button>
          </div>
          ${y.length?y.map(e=>{let r=n(e),i=r<0?`<span class="bill-due-badge overdue">Overdue</span>`:r===0?`<span class="bill-due-badge today">Today</span>`:r<=7?`<span class="bill-due-badge soon">${r}d</span>`:`<span class="bill-due-badge ok">${t(e).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}</span>`;return`<div class="db-bill-row">
              <div class="db-bill-icon">${billCatIcon(e.category)}</div>
              <div class="db-bill-name">${f(e.name)}</div>
              ${i}
              <div class="db-bill-amount">${g(parseFloat(e.amount)||0)}</div>
            </div>`}).join(``):`<div class="db-empty-row">No upcoming bills — <button class="db-widget-link" onclick="activateTab('bills')">add one</button></div>`}
        </div>

        <!-- Goals -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Goals</span>
            <button class="db-widget-link" onclick="activateTab('goals')">View all →</button>
          </div>
          ${b.length?b.map(e=>{let t=Math.min(Math.round((e.saved||0)/(e.target||1)*100),100);return`<div class="db-goal-row">
              <div class="db-goal-top">
                <span class="db-goal-name">${e.emoji||`🎯`} ${f(e.name)}</span>
                <span class="db-goal-pct">${g(e.saved||0)} of ${g(e.target||0)} · ${t}%</span>
              </div>
              <div class="db-goal-bar"><div class="db-goal-fill" style="width:${t}%"></div></div>
            </div>`}).join(``):`<div class="db-empty-row">No active goals — <button class="db-widget-link" onclick="activateTab('goals')">add one</button></div>`}
        </div>
      </div>

      <div>
        <!-- Budget this month -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Budget · ${monthLabel(u)}</span>
            <button class="db-widget-link" onclick="activateTab('budget')">Edit →</button>
          </div>
          <div class="db-budget-row">
            <span class="db-budget-label">Income</span>
            <span class="db-budget-val" style="color:#10b981">${g(p)}</span>
          </div>
          <div class="db-budget-row">
            <span class="db-budget-label">Expenses</span>
            <span class="db-budget-val" style="color:#ef4444">${g(m)}</span>
          </div>
          <div class="db-budget-row" style="border-top:2px solid var(--border)">
            <span class="db-budget-label" style="font-weight:700">${h>=0?`Surplus`:`Deficit`}</span>
            <span class="db-budget-val" style="color:${h>=0?`#10b981`:`#ef4444`}">${g(Math.abs(h))}</span>
          </div>
        </div>

        ${D>0?`
        <!-- Kids pending approvals -->
        <div class="db-widget" style="border-color:#fde68a">
          <div class="db-widget-header" style="background:#fffbeb">
            <span class="db-widget-title">⭐ Kids Zone — ${D} pending approval${D===1?``:`s`}</span>
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
              <span style="font-weight:600">${g(x)} paid</span>
              <span style="color:#94a3b8">${w}% of ${g(C)}</span>
            </div>
            <div class="db-build-bar" style="margin:0 0 10px">
              <div class="db-build-fill" style="width:${w}%"></div>
            </div>
            ${T?`<div style="font-size:12px;color:#64748b">Next: <strong>${f(T.name)}</strong> — ${g(T.amount)}</div>`:`<div style="font-size:12px;color:#10b981;font-weight:600">✓ All stages paid</div>`}
          </div>
        </div>
      </div>
    </div>

    ${M}
  `;document.getElementById(`dashboard-content`).innerHTML=ae}function Pi(){function e(e){return e.replace(/[^a-z0-9]/gi,`_`)}function t(t,n,r,i){let a=`${t}_${e(n)}`;return`
      <div class="color-row">
        <div class="color-dot" id="dot-${a}" style="background:${i}"></div>
        <span>${r}</span>
        <input type="color" value="${i}"
          oninput="document.getElementById('dot-${a}').style.background=this.value"
          onchange="updateColor('${t}','${n}',this.value)">
      </div>`}let n=P(STORAGE_KEY),r=n?(n.length/1024).toFixed(1):0,i=n?`<span style="color:var(--success);font-weight:600">✓ Data found in device storage (${r} KB)</span>`:`<span style="color:var(--danger);font-weight:600">⚠ No data in device storage</span>`,o=a.activityLog||[];function s(e){let t=new Date(e);return t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})+` `+t.toLocaleTimeString(`en-AU`,{hour:`2-digit`,minute:`2-digit`})}function c(e){return e.photo?`<img src="${e.photo}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0" onerror="this.style.display='none'">`:`<div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${(e.name||`?`)[0].toUpperCase()}</div>`}let l={Added:`#10b981`,Edited:`#3b82f6`,Deleted:`#ef4444`,Updated:`#f59e0b`,Imported:`#8b5cf6`,Removed:`#ef4444`};function u(e){return l[e.split(` `)[0]]||`#94a3b8`}function d(e,t,n,r,i){let a=_settingsOpen.has(e);return`
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
      </div>`}let m={dog:`🐕`,cat:`🐈`,bird:`🐦`};new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`});let h=a.settings?.adultName||a.settings?.adults?.[0]?.name||`You`,g=a.settings?.email||``,_=`
    <div class="settings-profile" style="margin:0 0 8px">
      <div class="profile-avatar-lg">${h.charAt(0).toUpperCase()}</div>
      <div style="flex:1;min-width:0">
        <div class="profile-name">${f(h)}</div>
        ${g?`<div class="profile-email">${f(g)}</div>`:``}
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
            value="${P(`toto_ai_key`)||``}">
          <button class="btn btn-primary" onclick="saveApiKey()">Save</button>
        </div>
        <p id="api-key-status" style="font-size:12px;color:var(--text-muted);margin-top:6px"></p>
        ${_renderApiKeySummary()}
      </div>`)+d(`prefs`,`Budget Preferences`,`Controls how month-to-month budget data is managed`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" id="pref-autofill" ${(a.settings||{}).autoFillMonths?`checked`:``}
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
          ${[0,4,5,6].map(e=>{let t=e===0?`Midnight`:e===4?`4 am`:e===5?`5 am`:`6 am`,n=(a.settings?.routineResetHour??0)===e;return`<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;font-weight:${n?`700`:`500`};color:${n?`var(--primary)`:`var(--text)`}">
              <input type="radio" name="reset-hour" value="${e}" ${n?`checked`:``} style="accent-color:var(--primary)"
                onchange="state.settings.routineResetHour=${e};_markSettingsDirty();saveData(state);renderSettings()">
              ${t}
            </label>`}).join(``)}
        </div>
      </div>`)+d(`meals-prefs`,`Meal Preferences`,`Calorie tracking and meal display options`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(a.settings||{}).showCalories?`checked`:``}
            onchange="updateSetting('showCalories', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Show calorie estimates on meals</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">AI estimates calories for each meal. Shows per-meal calories and daily totals in the meal planner and lunchbox grids.</p>
          </div>
        </label>
      </div>`)+d(`typea`,`Type A Mode`,a.settings?.typeAMode?`Active — daily missions and life score`:`Off — turn on for guided organisation`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(a.settings||{}).typeAMode?`checked`:``}
            onchange="updateSetting('typeAMode', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Enable Type A Mode</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">Adds a Life Score, daily missions, and guided organisation to your Today screen. Toto takes the lead and tells you what to do next.</p>
          </div>
        </label>
        ${a.settings?.typeAMode?`
        <div style="margin-top:16px;padding:14px;background:var(--surface2);border-radius:10px">
          <div style="font-size:13px;font-weight:700;margin-bottom:8px">Current Life Score</div>
          <div style="font-size:28px;font-weight:900;color:#0891b2">${calcLifeScore().total}%</div>
          ${a.settings?.typeAStreak>0?`<div class="streak-badge" style="margin-top:8px">🔥 ${a.settings.typeAStreak} week streak</div>`:``}
        </div>`:``}
      </div>`)+d(`notif`,`Notification Style`,`Choose how Toto shows alerts on the Today screen`,`
      <div class="section-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px">
          ${[{val:`focus-timeline`,label:`Focus + Timeline`,desc:`One big card + chronological feed`},{val:`focus`,label:`Focus Card`,desc:`One urgent item at a time`},{val:`stack`,label:`Stack`,desc:`Card deck with count badge`},{val:`timeline`,label:`Timeline Only`,desc:`Chronological feed grouped by urgency`},{val:`banners`,label:`Banners`,desc:`Subtle alerts at the top`}].map(e=>`<label style="display:block;cursor:pointer;border:2px solid ${(a.settings?.notifStyle||`focus-timeline`)===e.val?`#0891b2`:`var(--border)`};border-radius:12px;padding:14px;background:${(a.settings?.notifStyle||`focus-timeline`)===e.val?`#ecfeff`:`var(--surface)`}">
            <input type="radio" name="notif-style" value="${e.val}" ${(a.settings?.notifStyle||`focus-timeline`)===e.val?`checked`:``} onchange="state.settings.notifStyle=this.value;_markSettingsDirty();renderSettings();renderToday()" style="display:none">
            <div style="font-size:13px;font-weight:700;margin-bottom:2px">${e.label}</div>
            <div style="font-size:11px;color:var(--text-muted)">${e.desc}</div>
          </label>`).join(``)}
        </div>
      </div>`)+d(`log`,`Activity Log`,`${o.length} recorded action${o.length===1?``:`s`} — synced across all devices`,`
      ${o.length===0?`<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No activity recorded yet. Changes you and your family make will appear here.</div>`:`<div style="max-height:400px;overflow-y:auto">
            ${o.slice(0,100).map(e=>`
              <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border)">
                ${c(e)}
                <div style="flex:1;min-width:0">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px">
                    <span style="font-weight:600;font-size:13px">${f(e.name)}</span>
                    <span style="display:inline-block;padding:2px 10px;border-radius:99px;font-size:11px;font-weight:600;color:#fff;background:${u(e.action)}">${f(e.action)}</span>
                    ${e.detail?`<span style="font-size:13px;color:var(--text)">${f(e.detail)}</span>`:``}
                  </div>
                  <div style="font-size:11px;color:var(--text-muted)">${s(e.ts)}</div>
                </div>
              </div>`).join(``)}
          </div>`}`,o.length>0?`<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();clearActivityLog()" style="color:var(--danger)">Clear log</button>`:``)+d(`data`,`Data &amp; Recovery`,i,`
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
      </div>`)+(()=>{let e=a.householdProfile.members||[],t=a.householdProfile.invites||[],n=a.householdProfile.authorizedUsers||[],r=m,i=e.map((r,i)=>{let o=r.role===`adult`,s=o&&i===0,c=r.emoji||(o?`🧑`:`🧒`),l=s?`Owner`:o?`Adult`:`Child`,u=s?`#fef9c3`:o?`#e0f2fe`:`#f0fdf4`,d=s?`#854d0e`:o?`#0369a1`:`#16a34a`,m=``;if(o){let a=e.slice(0,i).filter(e=>e.role===`adult`).length,o=!!r.pinHash,c=`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;margin-top:8px;background:${o?`#f0fdf4`:`var(--surface2)`};border-radius:8px;border:1px solid ${o?`#bbf7d0`:`var(--border)`}">
            <span style="font-size:16px">🔢</span>
            <div style="flex:1">
              <div style="font-size:12px;font-weight:600;color:${o?`#16a34a`:`var(--text)`}">Shared device PIN · ${o?`Set ✓`:`Not set`}</div>
              <div style="font-size:11px;color:var(--text-muted)">${o?`Required when signing in on a shared device`:`Optional — protects your profile on shared devices`}</div>
            </div>
            <button onclick="event.stopPropagation();setAdultPin(${a})" style="padding:6px 10px;border:1px solid ${o?`#bbf7d0`:`var(--border)`};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${o?`Change`:`Set PIN`}</button>
            ${o?`<button onclick="event.stopPropagation();clearAdultPin(${a})" style="padding:6px 10px;border:1px solid #fecaca;border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:#b91c1c;cursor:pointer">Remove</button>`:``}
          </div>`;if(s)m=`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
              <span style="font-size:16px">✅</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:#16a34a">Google login · Owner</div>
                <div style="font-size:11px;color:#64748b">Full access · Set up this household</div>
              </div>
            </div>`+c;else{let e=n.find(e=>e.name&&r.name&&e.name.toLowerCase().includes(r.name.toLowerCase().split(` `)[0])),a=t.find(e=>e.memberName===r.name&&e.status===`pending`&&new Date(e.expiresAt)>new Date),o=t.find(e=>e.memberName===r.name&&e.status===`accepted`);m=e||o?`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
                <span style="font-size:16px">✅</span>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:#16a34a">Google login · Member</div>
                  <div style="font-size:11px;color:#64748b">${f((e||{}).email||`Joined via invite`)}</div>
                </div>
              </div>`+c:a?`<div style="padding:10px 12px;background:#fef9c3;border-radius:8px;border:1px solid #fde68a">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:16px">⏳</span>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:#854d0e">Invite pending</div>
                    <div style="font-size:11px;color:#78350f">Expires ${new Date(a.expiresAt).toLocaleDateString()}${a.email?` · `+f(a.email):``}</div>
                  </div>
                </div>
                <div style="display:flex;gap:6px">
                  <button onclick="event.stopPropagation();_copyInviteLinkForMember('${a.id}')" style="flex:1;padding:6px;border:1px solid #fde68a;border-radius:6px;background:#fff;font-size:11px;font-weight:600;color:#854d0e;cursor:pointer">📋 Copy link</button>
                  <button onclick="event.stopPropagation();revokeInvite('${a.id}')" style="padding:6px 10px;border:1px solid #fecaca;border-radius:6px;background:#fff;font-size:11px;font-weight:600;color:#ef4444;cursor:pointer">Revoke</button>
                </div>
              </div>`+c:`<div style="padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:16px">🔗</span>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:var(--text)">No app access yet</div>
                    <div style="font-size:11px;color:var(--text-muted)">Send an invite link so ${f(r.name||`this person`)} can join</div>
                  </div>
                </div>
                <button onclick="event.stopPropagation();inviteMember(${i})" class="btn btn-primary btn-sm" style="width:100%">Invite to join →</button>
              </div>`+c}}else{let e=(a.kids?.profiles||[]).find(e=>e.name&&r.name&&e.name.toLowerCase()===r.name.toLowerCase()),t=!!e?.pinHash,n=!!(r.name&&r.name.trim());m=e&&_isPinHardLocked&&_isPinHardLocked(e.id)?`<div style="padding:10px 12px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:16px">🔒</span>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:#b91c1c">PIN locked</div>
                  <div style="font-size:11px;color:#64748b">Too many failed attempts</div>
                </div>
              </div>
              <button onclick="event.stopPropagation();resetKidPinLock(${e.id})" style="width:100%;padding:7px;border:1px solid #fecaca;border-radius:6px;background:#fff;font-size:12px;font-weight:600;color:#b91c1c;cursor:pointer">Reset PIN lock</button>
            </div>`:n?e?`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:${t?`#f0fdf4`:`var(--surface2)`};border-radius:8px;border:1px solid ${t?`#bbf7d0`:`var(--border)`}">
              <span style="font-size:16px">🔢</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:${t?`#16a34a`:`var(--text)`}">PIN login · ${t?`Set up ✓`:`Not set up`}</div>
                <div style="font-size:11px;color:var(--text-muted)">${t?`PIN is active — tap to change it`:`Set a PIN so `+f(r.name)+` can log in`}</div>
              </div>
              <button onclick="event.stopPropagation();openPinSetup(${e.id})" style="padding:6px 10px;border:1px solid ${t?`#bbf7d0`:`var(--border)`};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${t?`Change`:`Set PIN`}</button>
            </div>`:`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:var(--text)">PIN login · Not set up</div>
                <div style="font-size:11px;color:var(--text-muted)">Save changes first, then set a PIN for ${f(r.name)}</div>
              </div>
              <button onclick="event.stopPropagation();_ensureKidProfileAndPin('${p(r.name)}')" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">Set PIN</button>
            </div>`:`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="font-size:12px;color:var(--text-muted)">Enter a name above to enable PIN login</div>
            </div>`}return`
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)">
          <div style="display:flex;align-items:center;gap:12px;padding:14px 16px">
            <div style="width:42px;height:42px;border-radius:50%;background:${o?`linear-gradient(135deg,#ecfeff,#ccfbf1)`:`linear-gradient(135deg,#fef9c3,#fde68a)`};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${c}</div>
            <div style="flex:1;min-width:0">
              <input type="text" maxlength="50" class="form-input" style="font-weight:600;font-size:14px;width:100%;color:var(--text);padding:4px 8px;border-radius:6px"
                placeholder="Enter name…"
                value="${p(r.name||``)}"
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
          <div style="padding:0 16px 14px">${m}</div>
        </div>`}).join(``),o=`
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <span style="font-weight:600;font-size:13px">Pets</span>
          <div style="display:flex;gap:6px">
            <button class="btn btn-ghost btn-sm" onclick="addPet('dog')">+ Dog</button>
            <button class="btn btn-ghost btn-sm" onclick="addPet('cat')">+ Cat</button>
            <button class="btn btn-ghost btn-sm" onclick="addPet('other')">+ Other</button>
          </div>
        </div>
        ${(a.householdProfile.pets||[]).length===0?`<p style="color:var(--text-muted);font-size:13px">No pets added.</p>`:``}
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
          ${(a.householdProfile.pets||[]).map((e,t)=>`<div style="display:flex;align-items:center;gap:12px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 14px">
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
            value="${a.householdProfile.cars||0}" onchange="updateCars(parseInt(this.value)||0)">
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
            ${o}
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
        ${(a.categoryGroups||[]).map(e=>`
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
        ${(a.categoryGroups||[]).length===0?`<p style="color:var(--text-muted);font-size:13px">No groups yet.</p>`:``}
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
      </div>`);_+=d(`setup-checklist`,`✅ Setup Checklist`,`The setup progress card shown on your dashboard`,`<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Show on dashboard</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${a.setupProgressDismissed?`Currently hidden`:`Currently visible`}</div>
        </div>
        <button onclick="event.stopPropagation();state.setupProgressDismissed=${!a.setupProgressDismissed};saveData(state);_refreshSetupProgress();renderSettings()" class="btn btn-secondary btn-sm">
          ${a.setupProgressDismissed?`Show again`:`Hide`}
        </button>
      </div>
    </div>`);let v=getDeviceProfile(),y=a.kids?.profiles||[],b=v?v===`adult`?`Adult — opens straight to the full app`:v===`shared`?`Shared — shows profile picker on open`:(y.find(e=>e.id===v)?.name||`Unknown`)+` — kid device`:`Not configured`;_+=d(`this-device`,`📱 This Device`,`Assigned to: ${b}`,`<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Assigned to</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${f(b)}</div>
        </div>
        <button onclick="event.stopPropagation();showDeviceSetup()" class="btn btn-secondary btn-sm">Change</button>
      </div>
    </div>`),_+=`<div style="margin-top:24px;padding:16px;border:2px dashed #f59e0b;border-radius:12px;background:#fffbeb">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#92400e;margin-bottom:12px">⚠️ Dev Tools — Remove before release</div>
    <button onclick="showProfileSelector()" class="btn btn-secondary" style="width:100%">🔄 Open profile switcher (shared device)</button>
  </div>`,_+=`<div class="settings-save-bar" id="settings-save-bar" style="display:${_settingsDirty?`flex`:`none`}">
    <div class="unsaved-dot"></div>
    <div class="unsaved-text">Unsaved changes</div>
    <button class="btn" onclick="cancelSettingsChanges()">Cancel</button>
    <button class="btn btn-primary" id="settings-save-btn" onclick="saveSettingsChanges()">Save</button>
  </div>`,document.getElementById(`settings-content`).innerHTML=_}function Fi(){if(confirm(`This will permanently delete ALL household data — budget, kids, goals, everything — from this device and the cloud.

This cannot be undone. Are you sure?`)&&confirm(`Last chance. All data will be gone. Continue?`)){if(_currentUser&&fbStore){let e=_getHouseholdDocRef();e&&e.delete().catch(()=>{})}Ke(STORAGE_KEY),_secureClear(HOUSEHOLD_OWNER_KEY),_fsUnsubscribe&&(_fsUnsubscribe(),_fsUnsubscribe=null),fbAuth.signOut().then(()=>{window.location.reload()})}}function Ii(){let e=new Blob([JSON.stringify(a,null,2)],{type:`application/json`}),t=document.createElement(`a`);t.href=URL.createObjectURL(e),t.download=`home-budget-backup-${new Date().toISOString().slice(0,10)}.json`,t.click(),URL.revokeObjectURL(t.href)}function Li(e){let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target.result);if(!t.budget){alert(`Invalid backup file — missing budget data.`);return}if(!confirm(`This will replace ALL current data with the backup. Continue?`))return;Ge(STORAGE_KEY,JSON.stringify(t)),location.reload()}catch(e){alert(`Failed to read backup file: `+e.message)}},n.readAsText(t)}function Ri(e){let t=document.getElementById(`grp-body-${e}`),n=document.getElementById(`grp-arrow-${e}`);if(!t)return;let r=t.style.display!==`none`;t.style.display=r?`none`:`block`,n&&(n.textContent=r?`▼`:`▲`)}function zi(e){budgetViewMode=e,renderBudget()}function Bi(){let e=a.buildContract,t=e.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0);e.total-t;let n=e.stages.filter(e=>e.paid).length,r=e.stages.length,i=e.variations||[],o=i.filter(e=>e.status===`approved`).reduce((e,t)=>e+(t.amount||0),0),s=i.filter(e=>e.status===`pending`).reduce((e,t)=>e+(t.amount||0),0),c=e.total+o,l=`
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
          <div style="font-size:18px;font-weight:700">${g(e.total)}</div>
        </div>
        ${o===0?``:`
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Approved Variations</div>
          <div style="font-size:18px;font-weight:700;color:${o>0?`var(--danger)`:`var(--success)`}">${o>0?`+`:``}${g(o)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Revised Total</div>
          <div style="font-size:18px;font-weight:700;color:var(--primary)">${g(c)}</div>
        </div>`}
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Paid to Date</div>
          <div style="font-size:18px;font-weight:700;color:var(--success)">${g(t)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Remaining</div>
          <div style="font-size:18px;font-weight:700;color:var(--danger)">${g(c-t)}</div>
        </div>
        ${s>0?`
        <div style="background:#fffbeb;padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#92400e;margin-bottom:4px">Pending Variations</div>
          <div style="font-size:18px;font-weight:700;color:#d97706">+${g(s)}</div>
        </div>`:``}
      </div>

      <!-- Visual stage timeline -->
      <div style="padding:16px 20px;border-bottom:1px solid var(--border)">
        <div style="display:flex;gap:0;position:relative">
          ${e.stages.map((t,n)=>{let r=(t.amount/e.total*100).toFixed(0),i=!t.paid&&e.stages.slice(0,n).every(e=>e.paid),a=t.paid?`#dcfce7`:i?`#dbeafe`:`var(--surface2)`,o=t.paid?`#16a34a`:i?`var(--primary)`:`var(--border)`,s=t.paid?`#15803d`:i?`var(--primary)`:`var(--text-muted)`,c=t.paid?`✓`:i?`→`:`${n+1}`,l=t.paid&&t.paidDate?y(t.paidDate):t.expectedDate?`Exp. `+y(t.expectedDate):``,u=!t.paid&&t.expectedDate&&isOverdue(t.expectedDate);return`
            <div style="flex:1;min-width:0;border:1px solid ${u?`var(--danger)`:o};border-radius:8px;padding:10px 10px 8px;margin-right:${n<e.stages.length-1?`6px`:`0`};background:${u?`#fef2f2`:a};cursor:pointer;position:relative" onclick="openEditStage(${t.id})" title="Edit ${p(t.name)}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
                <span style="font-size:11px;font-weight:700;color:${u?`var(--danger)`:s};width:20px;height:20px;border-radius:50%;background:${t.paid?`#16a34a`:i?`var(--primary)`:`#94a3b8`};color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">${c}</span>
                <span style="font-size:11px;color:${u?`var(--danger)`:`var(--text-muted)`};font-weight:600">${r}%</span>
              </div>
              <div style="font-size:12px;font-weight:600;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px">${f(t.name)}</div>
              <div style="font-size:12px;font-weight:700;color:${t.paid?`#15803d`:`var(--text)`}">${g(t.amount)}</div>
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
                <td style="font-weight:500">${f(t.name)}</td>
                <td class="amount">${g(t.amount)}</td>
                <td style="color:var(--text-muted)">${n}%</td>
                <td>${i}</td>
                <td>${fundingBadge(t.funding||`loan`)}</td>
                <td>${t.expectedDate?y(t.expectedDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                <td>${y(t.paidDate)}</td>
                <td style="color:var(--text-muted)">${f(t.invoiceRef||`—`)}</td>
                <td class="actions">
                  ${attachBtn(`stage-${t.id}`,p(t.name))}
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
            ${i.length===0?`No variations yet`:`${i.filter(e=>e.status===`approved`).length} approved · ${i.filter(e=>e.status===`pending`).length} pending · ${o>=0?`+`:``}${g(o)} net impact`}
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddVariation()">+ Variation</button>
      </div>
      ${i.length===0?`<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No variations raised yet. Builder-initiated or owner-requested changes to the contract will appear here.</div>`:`<div class="table-wrap">
            <table>
              <thead><tr><th>Ref</th><th>Description</th><th>Amount</th><th>Status</th><th>Funding</th><th>Raised</th><th>Approved</th><th>Notes</th><th></th></tr></thead>
              <tbody>
                ${i.map(e=>`<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${f(e.ref||`—`)}</td>
                  <td style="font-weight:500">${f(e.name)}</td>
                  <td class="amount" style="color:${(e.amount||0)<0?`var(--success)`:`var(--danger)`};font-weight:600">${e.amount>0?`+`:``}${g(e.amount)}</td>
                  <td>${u[e.status]||u.pending}</td>
                  <td>${fundingBadge(e.funding||`loan`)}</td>
                  <td>${y(e.dateRaised)}</td>
                  <td>${y(e.dateApproved)}</td>
                  <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f(e.notes||`—`)}</td>
                  <td class="actions">
                    <button class="btn btn-ghost btn-sm" onclick="openEditVariation(${e.id})">✏️</button>
                    <button class="btn btn-danger-ghost btn-sm" onclick="deleteVariation(${e.id})">🗑</button>
                  </td>
                </tr>`).join(``)}
              </tbody>
              <tfoot>
                <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                  <td colspan="2" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Net approved variations</td>
                  <td class="amount" style="padding:11px 16px;font-weight:700;color:${o>=0?`var(--danger)`:`var(--success)`}">${o>0?`+`:``}${g(o)}</td>
                  <td colspan="6" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">Revised contract: <strong>${g(c)}</strong>${s>0?` · <span style="color:#d97706">+${g(s)} pending</span>`:``}</td>
                </tr>
              </tfoot>
            </table>
          </div>`}
    </div>
  `;let d=a.extras,m=d.reduce((e,t)=>e+(t.totalAmount||0),0),h=d.reduce((e,t)=>e+(t.amountPaid||0),0);l+=`
    <div class="section" style="border-left:4px solid ${colors.build.extras}">
      <div class="section-header">
        <div>
          <div class="section-title">Outside Contract</div>
          <div class="section-subtitle">Landscaping, solar, and other extras</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          ${m>0?`<span class="contract-total-badge">${g(h)} / ${g(m)}</span>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddExtra()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Vendor</th><th>Total Cost</th><th>Paid</th><th>Remaining</th><th>Due Date</th><th>Status</th><th>Funding</th><th></th></tr></thead>
          <tbody>
            ${d.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>No items yet. Add landscaping, solar, or other extras.</div></td></tr>`:d.map(e=>{let t=(e.totalAmount||0)-(e.amountPaid||0),n={"not-quoted":`<span class="badge unpaid">Not Quoted</span>`,quoted:`<span class="badge pending">Quoted</span>`,approved:`<span class="badge" style="background:#ede9fe;color:#5b21b6">Approved</span>`,partial:`<span class="badge partial">Partially Paid</span>`,paid:`<span class="badge paid">Paid</span>`},r=e.dueDate&&isOverdue(e.dueDate)&&e.status!==`paid`,i=n[e.status||`not-quoted`]+(r?` <span class="badge overdue">Overdue</span>`:``);return`<tr>
                <td style="font-weight:500">${f(e.name)}</td>
                <td>${e.vendor?f(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                <td class="amount">${e.totalAmount?g(e.totalAmount):`<span class="amount muted">TBC</span>`}</td>
                <td class="amount">${g(e.amountPaid)}</td>
                <td class="amount ${t>0?``:`muted`}">${t>0?g(t):`—`}</td>
                <td>${y(e.dueDate)}</td>
                <td>${i}</td>
                <td>${fundingBadge(e.funding||`loan`)}</td>
                <td class="actions">
                  ${attachBtn(`extra-${e.id}`,p(e.name))}
                  <button class="btn btn-ghost btn-sm" onclick="openEditExtra(${e.id})">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="deleteExtra(${e.id})">🗑</button>
                </td>
              </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `;let _=a.furniture,v=_.reduce((e,t)=>e+(t.price||0),0),b=_.filter(e=>e.status===`delivered`||e.status===`ordered`),x=_.filter(e=>e.status===`to-purchase`),S=b.reduce((e,t)=>e+(t.price||0),0),C=x.reduce((e,t)=>e+(t.price||0),0);l+=`
    <div class="section" style="border-left:4px solid ${colors.build.furniture}">
      <div class="section-header">
        <div>
          <div class="section-title">Furniture</div>
          <div class="section-subtitle">${_.length} items · ${g(S)} purchased · ${g(C)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${_.length>0?`
          <div style="display:flex;gap:6px">
            <span class="badge paid">${_.filter(e=>e.status===`delivered`).length} delivered</span>
            <span class="badge partial">${_.filter(e=>e.status===`ordered`).length} ordered</span>
            <span class="badge unpaid">${x.length} to buy</span>
          </div>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddFurniture()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${_.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">🛋️</div>No furniture items yet. Add sofas, beds, appliances and more.</div></td></tr>`:_.map(e=>{let t={"to-purchase":`<span class="badge unpaid">To Purchase</span>`,ordered:`<span class="badge partial">Ordered</span>`,delivered:`<span class="badge paid">Delivered</span>`},n=e.deliveryDate&&e.status!==`delivered`&&isOverdue(e.deliveryDate);return`<tr>
                    <td style="font-weight:500">${f(e.name)}</td>
                    <td style="color:var(--text-muted)">${f(e.room||`—`)}</td>
                    <td>${e.vendor?f(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td class="amount">${e.price?g(e.price):`<span class="amount muted">TBC</span>`}</td>
                    <td>${t[e.status]||t[`to-purchase`]}</td>
                    <td>${fundingBadge(e.funding||`own-funds`)}</td>
                    <td>${e.deliveryDate?n?`<span class="badge overdue">${y(e.deliveryDate)}</span>`:y(e.deliveryDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f(e.notes||`—`)}</td>
                    <td class="actions">
                      ${attachBtn(`furniture-${e.id}`,p(e.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditFurniture(${e.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteFurniture(${e.id})">🗑</button>
                    </td>
                  </tr>`}).join(``)}
          </tbody>
          ${_.length>0?`
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${g(v)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${g(S)} purchased · ${g(C)} still to buy
              </td>
            </tr>
          </tfoot>`:``}
        </table>
      </div>
    </div>
  `;let w=a.appliances,T=w.reduce((e,t)=>e+(t.price||0),0),E=w.filter(e=>e.status===`delivered`||e.status===`ordered`),D=w.filter(e=>e.status===`to-purchase`),ee=E.reduce((e,t)=>e+(t.price||0),0),O=D.reduce((e,t)=>e+(t.price||0),0);l+=`
    <div class="section" style="border-left:4px solid ${colors.build.appliances}">
      <div class="section-header">
        <div>
          <div class="section-title">Appliances</div>
          <div class="section-subtitle">${w.length} items · ${g(ee)} purchased · ${g(O)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${w.length>0?`
          <div style="display:flex;gap:6px">
            <span class="badge paid">${w.filter(e=>e.status===`delivered`).length} delivered</span>
            <span class="badge partial">${w.filter(e=>e.status===`ordered`).length} ordered</span>
            <span class="badge unpaid">${D.length} to buy</span>
          </div>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddAppliance()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${w.length===0?`<tr><td colspan="9"><div class="empty"><div class="empty-icon">🍳</div>No appliances yet. Add fridges, dishwashers, ovens and more.</div></td></tr>`:w.map(e=>{let t={"to-purchase":`<span class="badge unpaid">To Purchase</span>`,ordered:`<span class="badge partial">Ordered</span>`,delivered:`<span class="badge paid">Delivered</span>`},n=e.deliveryDate&&e.status!==`delivered`&&isOverdue(e.deliveryDate);return`<tr>
                    <td style="font-weight:500">${f(e.name)}</td>
                    <td style="color:var(--text-muted)">${f(e.room||`—`)}</td>
                    <td>${e.vendor?f(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td class="amount">${e.price?g(e.price):`<span class="amount muted">TBC</span>`}</td>
                    <td>${t[e.status]||t[`to-purchase`]}</td>
                    <td>${fundingBadge(e.funding||`own-funds`)}</td>
                    <td>${e.deliveryDate?n?`<span class="badge overdue">${y(e.deliveryDate)}</span>`:y(e.deliveryDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f(e.notes||`—`)}</td>
                    <td class="actions">
                      ${attachBtn(`appliance-${e.id}`,p(e.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditAppliance(${e.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteAppliance(${e.id})">🗑</button>
                    </td>
                  </tr>`}).join(``)}
          </tbody>
          ${w.length>0?`
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${g(T)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${g(ee)} purchased · ${g(O)} still to buy
              </td>
            </tr>
          </tfoot>`:``}
        </table>
      </div>
    </div>
  `,document.getElementById(`build-content`).innerHTML=l}function Vi(){return a.expenseCategories||DEFAULT_DATA.expenseCategories}function Hi(){return a.incomeCategories||DEFAULT_DATA.incomeCategories}function Ui(e){if(e.type===`spending`){let t=Object.keys(a.budget.actuals).sort().reverse(),n=null;for(let r of t){let t=(getMonthData(r).expenses||[]).filter(t=>(t.category||`Other`)===e.category).reduce((e,t)=>e+(a.budget.actuals[r]?.[t.id]||0),0);if(t>0){n=t;break}}let r=e.targetMonthly||0;if(n===null)return{pct:null,label:`No actuals yet`,actual:null,target:r};let i=r>0?Math.max(0,Math.min(100,n/r*100)):0,o=n<=r;return{pct:i,label:`${g(n)} actual vs ${g(r)} limit`,actual:n,target:r,ok:o}}if(e.type===`savings`){let t=e.currentSaved||0,n=e.targetTotal||1;return{pct:Math.min(100,t/n*100),label:`${g(t)} of ${g(n)} saved`,ok:t>=n}}if(e.type===`income`){let t=monthlyTotal(getMonthData(selectedBudgetMonth).income),n=e.targetMonthly||1;return{pct:Math.min(100,t/n*100),label:`${g(t)}/mo of ${g(n)}/mo target`,ok:t>=n}}return{pct:0,label:``,ok:!1}}function Wi(){let e=a.goals,t=e.filter(e=>e.status===`active`),n=e.filter(e=>e.status===`achieved`),r=``;e.length>0&&(r+=`
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
  </div>`,i.length===0){let e=getMonthData(selectedBudgetMonth),t=E(e.income)-E(e.expenses),n=t>0?`<div style="font-size:14px;color:#64748b;margin-bottom:4px">You have <strong style="color:#16a34a">${g(t)}</strong> surplus each month.</div>
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
              <div class="goal-card-title">${t.icon} ${f(e.name)}</div>
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
          ${e.notes?`<div style="font-size:12px;color:var(--text-muted);margin-top:8px">${f(e.notes)}</div>`:``}
        </div>`});document.getElementById(`goals-content`).innerHTML=r}function Gi(e={}){let t=e.type||`spending`;return`
    <div class="form-group">
      <label class="form-label">Goal Name</label>
      <input class="form-input" id="f-goal-name" type="text" maxlength="200" value="${p(e.name||``)}" placeholder="e.g. Cut dining out">
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
      <input class="form-input" id="f-goal-notes" type="text" maxlength="200" value="${p(e.notes||``)}" placeholder="Optional notes">
    </div>
  `}function Ki(){let e=document.getElementById(`f-goal-type`).value;document.getElementById(`goal-spending-fields`).style.display=e===`spending`?``:`none`,document.getElementById(`goal-savings-fields`).style.display=e===`savings`?``:`none`,document.getElementById(`goal-income-fields`).style.display=e===`income`?``:`none`}function qi(e){let t=document.getElementById(`f-goal-type`).value,n={id:e,name:document.getElementById(`f-goal-name`).value.trim(),type:t,status:document.getElementById(`f-goal-status`).value,deadline:document.getElementById(`f-goal-deadline`).value||null,notes:document.getElementById(`f-goal-notes`).value.trim()};return t===`spending`&&(n.category=document.getElementById(`f-goal-category`).value,n.targetMonthly=parseFloat(document.getElementById(`f-goal-target-monthly`).value)||0),t===`savings`&&(n.targetTotal=parseFloat(document.getElementById(`f-goal-target-total`).value)||0,n.currentSaved=parseFloat(document.getElementById(`f-goal-current-saved`).value)||0),t===`income`&&(n.targetMonthly=parseFloat(document.getElementById(`f-goal-target-monthly-inc`).value)||0),n}function Ji(){openModal(`New Goal`,Gi(),()=>{let e=qi(D(a.goals));e.name&&(a.goals.push(e),saveData(a),closeModal(),Wi())})}function Yi(e){let t=a.goals.find(t=>t.id===e);openModal(`Edit Goal`,Gi(t),()=>{Object.assign(t,qi(e)),saveData(a),closeModal(),Wi()})}function Xi(e){confirm(`Delete this goal?`)&&(a.goals=a.goals.filter(t=>t.id!==e),saveData(a),Wi())}function Zi(e){let t=a.goals.find(t=>t.id===e);t&&(t.status=`achieved`,saveData(a),Wi())}var Qi=null,$i=[{value:`add-income`,label:`Add income source`,icon:`💰`},{value:`remove-income`,label:`Remove income source`,icon:`➖`},{value:`reduce-income`,label:`Reduce income amount`,icon:`📉`},{value:`add-expense`,label:`Add new expense`,icon:`➕`},{value:`remove-expense`,label:`Remove expense`,icon:`✂️`},{value:`reduce-expense`,label:`Reduce expense amount`,icon:`📉`}];function ea(e){let t=getMonthData(selectedBudgetMonth),n=JSON.parse(JSON.stringify(t.income)),r=JSON.parse(JSON.stringify(t.expenses));return(e.adjustments||[]).forEach(e=>{if(e.type===`add-income`)n.push({id:-(e.id||0),name:e.name,amount:e.amount||0,frequency:e.frequency||`monthly`});else if(e.type===`remove-income`)n=n.filter(t=>t.id!==e.itemId);else if(e.type===`reduce-income`){let t=n.find(t=>t.id===e.itemId);t&&(t.amount=e.changeType===`percent`?Math.max(0,t.amount*(1-e.changeAmount/100)):Math.max(0,t.amount-(e.changeAmount||0)))}else if(e.type===`add-expense`)r.push({id:-(e.id||0),name:e.name,amount:e.amount||0,frequency:e.frequency||`monthly`,category:e.category||`Other`});else if(e.type===`remove-expense`)r=r.filter(t=>t.id!==e.itemId);else if(e.type===`reduce-expense`){let t=r.find(t=>t.id===e.itemId);t&&(t.amount=e.changeType===`percent`?Math.max(0,t.amount*(1-e.changeAmount/100)):Math.max(0,t.amount-(e.changeAmount||0)))}}),{income:n,expenses:r,totalIncome:E(n),totalExpenses:E(r),surplus:E(n)-E(r)}}function ta(){let e=a.scenarios,t=getMonthData(selectedBudgetMonth),n=E(t.income),r=E(t.expenses),i=n-r,o=`<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary" onclick="openAddScenario()">+ New Scenario</button>
  </div>`;e.length===0?o+=`<div class="empty"><div class="empty-icon">🔬</div>No scenarios yet. Create one to model income changes, expense cuts, or lifestyle adjustments.</div>`:e.forEach(e=>{let t=ea(e),a=t.totalIncome-n,s=t.totalExpenses-r,c=t.surplus-i,l=Qi===e.id;o+=`
        <div class="scenario-card">
          <div class="scenario-card-header" onclick="toggleScenario(${e.id})">
            <div style="flex:1">
              <div style="font-weight:600;font-size:14px">${f(e.name)}</div>
              ${e.description?`<div style="font-size:12px;color:var(--text-muted);margin-top:2px">${f(e.description)}</div>`:``}
            </div>
            <div style="display:flex;align-items:center;gap:12px;flex-shrink:0">
              <div style="text-align:right">
                <div style="font-size:11px;color:var(--text-muted)">Surplus impact</div>
                <div style="font-size:14px;font-weight:700;color:${c>=0?`var(--success)`:`var(--danger)`}">${c>=0?`+`:``}${g(c)}/mo</div>
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
              ${(e.adjustments||[]).length===0?`<div style="font-size:13px;color:var(--text-muted);padding:8px 0">No adjustments yet. Add income or expense changes.</div>`:(e.adjustments||[]).map(t=>{let n=$i.find(e=>e.value===t.type)||$i[0],r=``;return t.type===`add-income`||t.type===`add-expense`?r=`${f(t.name)} · ${g(t.amount||0)}/${t.frequency||`mo`}${t.category?` · `+t.category:``}`:t.type===`remove-income`||t.type===`remove-expense`?r=f(t.itemName||`—`):(t.type===`reduce-income`||t.type===`reduce-expense`)&&(r=`${f(t.itemName)} · reduce by ${t.changeType===`percent`?t.changeAmount+`%`:g(t.changeAmount||0)}`),`<div class="adj-item">
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
                <div class="compare-row"><span>Monthly Income</span><span class="amount" style="color:var(--success)">${g(n)}</span></div>
                <div class="compare-row"><span>Monthly Expenses</span><span class="amount" style="color:var(--danger)">${g(r)}</span></div>
                <div class="compare-row"><span>Monthly Surplus</span><span class="amount" style="color:${i>=0?`var(--success)`:`var(--danger)`}">${g(i)}</span></div>
                <div class="compare-row"><span style="color:var(--text-muted);font-size:12px">Annual surplus</span><span style="color:var(--text-muted);font-size:12px">${g(i*12)}</span></div>
              </div>
              <div class="compare-col" style="border:2px solid var(--primary)">
                <div class="compare-col-title" style="color:var(--primary)">Scenario: ${f(e.name)}</div>
                <div class="compare-row">
                  <span>Monthly Income</span>
                  <span class="amount" style="color:var(--success)">${g(t.totalIncome)} ${a===0?``:`<small style="color:${a>0?`var(--success)`:`var(--danger)`}">(${a>0?`+`:``}${g(a)})</small>`}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Expenses</span>
                  <span class="amount" style="color:var(--danger)">${g(t.totalExpenses)} ${s===0?``:`<small style="color:${s<0?`var(--success)`:`var(--danger)`}">(${s>0?`+`:``}${g(s)})</small>`}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Surplus</span>
                  <span class="amount" style="color:${t.surplus>=0?`var(--success)`:`var(--danger)`};font-weight:700">${g(t.surplus)}</span>
                </div>
                <div class="compare-row">
                  <span style="font-size:12px">Annual surplus</span>
                  <span style="font-size:12px;font-weight:600;color:${t.surplus>=0?`var(--success)`:`var(--danger)`}">${g(t.surplus*12)} ${c===0?``:`<small>(${c>0?`+`:``}${g(c*12)}/yr)</small>`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>`}),document.getElementById(`scenarios-content`).innerHTML=o}function na(e){Qi=Qi===e?null:e,ta()}function ra(e={}){return`
    <div class="form-group">
      <label class="form-label">Scenario Name</label>
      <input class="form-input" id="f-sc-name" type="text" maxlength="200" value="${p(e.name||``)}" placeholder="e.g. Pick up second job">
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input class="form-input" id="f-sc-desc" type="text" maxlength="200" value="${p(e.description||``)}" placeholder="Brief description of what you're testing">
    </div>
  `}function ia(e,t={}){return{id:e,name:document.getElementById(`f-sc-name`).value.trim(),description:document.getElementById(`f-sc-desc`).value.trim(),adjustments:t.adjustments||[]}}function aa(){openModal(`New Scenario`,ra(),()=>{let e=ia(D(a.scenarios));e.name&&(a.scenarios.push(e),saveData(a),closeModal(),ta())})}function oa(e){let t=a.scenarios.find(t=>t.id===e);openModal(`Edit Scenario`,ra(t),()=>{let n=ia(e,t);Object.assign(t,n),saveData(a),closeModal(),ta()})}function sa(e){confirm(`Delete this scenario?`)&&(a.scenarios=a.scenarios.filter(t=>t.id!==e),Qi===e&&(Qi=null),saveData(a),ta())}function ca(e){let t=getMonthData(selectedBudgetMonth),n=t.income.map(e=>`<option value="${e.id}">${f(e.name)} (${g(T(e))}/mo)</option>`).join(``),r=t.expenses.map(e=>`<option value="${e.id}">${f(e.name)} (${g(T(e))}/mo)</option>`).join(``);return`
    <div class="form-group">
      <label class="form-label">Adjustment Type</label>
      <select class="form-select" id="f-adj-type" onchange="toggleAdjFields()">
        ${$i.map(e=>`<option value="${e.value}">${e.icon} ${e.label}</option>`).join(``)}
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
  `}function la(){let e=document.getElementById(`f-adj-type`).value;document.getElementById(`adj-add-income`).style.display=e===`add-income`||e===`add-expense`?``:`none`,document.getElementById(`adj-add-income-extra`).style.display=e===`add-income`||e===`add-expense`?``:`none`,document.getElementById(`adj-cat-wrap`).style.display=e===`add-expense`?``:`none`,document.getElementById(`adj-remove-income`).style.display=e===`remove-income`?``:`none`,document.getElementById(`adj-reduce-income`).style.display=e===`reduce-income`?``:`none`,document.getElementById(`adj-remove-expense`).style.display=e===`remove-expense`?``:`none`,document.getElementById(`adj-reduce-expense`).style.display=e===`reduce-expense`?``:`none`}function ua(e){let t=a.scenarios.find(t=>t.id===e);t&&openModal(`Add Adjustment`,ca(t),()=>{let e=document.getElementById(`f-adj-type`).value,n=getMonthData(selectedBudgetMonth),r={id:D(t.adjustments||[]),type:e};if(e===`add-income`){if(r.name=document.getElementById(`f-adj-name`).value.trim(),r.amount=parseFloat(document.getElementById(`f-adj-amount`).value)||0,r.frequency=document.getElementById(`f-adj-freq`).value,!r.name)return}else if(e===`add-expense`){if(r.name=document.getElementById(`f-adj-name`).value.trim(),r.amount=parseFloat(document.getElementById(`f-adj-amount`).value)||0,r.frequency=document.getElementById(`f-adj-freq`).value,r.category=document.getElementById(`f-adj-cat`).value,!r.name)return}else if(e===`remove-income`){let e=document.getElementById(`f-adj-inc-sel`);r.itemId=parseInt(e.value),r.itemName=e.options[e.selectedIndex]?.text||``}else if(e===`reduce-income`){let e=document.getElementById(`f-adj-inc-reduce-sel`);r.itemId=parseInt(e.value),r.itemName=n.income.find(e=>e.id===r.itemId)?.name||``,r.changeAmount=parseFloat(document.getElementById(`f-adj-change-amount`).value)||0,r.changeType=document.getElementById(`f-adj-change-type-inc`).value}else if(e===`remove-expense`){let e=document.getElementById(`f-adj-exp-sel`);r.itemId=parseInt(e.value),r.itemName=e.options[e.selectedIndex]?.text||``}else if(e===`reduce-expense`){let e=document.getElementById(`f-adj-exp-reduce-sel`);r.itemId=parseInt(e.value),r.itemName=n.expenses.find(e=>e.id===r.itemId)?.name||``,r.changeAmount=parseFloat(document.getElementById(`f-adj-change-amount-exp`).value)||0,r.changeType=document.getElementById(`f-adj-change-type-exp`).value}t.adjustments||(t.adjustments=[]),t.adjustments.push(r),saveData(a),closeModal(),ta()})}function da(e,t){let n=a.scenarios.find(t=>t.id===e);n&&(n.adjustments=(n.adjustments||[]).filter(e=>e.id!==t),saveData(a),ta())}var fa=`home_finance_colors_v1`,pa={expense:{"Mortgage / Rent":`#6366f1`,Insurance:`#8b5cf6`,Utilities:`#06b6d4`,Groceries:`#10b981`,Transport:`#f59e0b`,"Childcare / Education":`#3b82f6`,Health:`#ef4444`,Entertainment:`#f97316`,Subscriptions:`#84cc16`,"Dining Out":`#14b8a6`,Clothing:`#ec4899`,"Personal Care":`#a855f7`,"Savings / Investment":`#22c55e`,Other:`#94a3b8`},income:`#10b981`,build:{contract:`#3b82f6`,extras:`#f59e0b`,furniture:`#8b5cf6`,appliances:`#ef4444`}};function ma(){try{let e=P(fa);if(!e)return JSON.parse(JSON.stringify(pa));let t=JSON.parse(e);return t.expense||(t.expense={}),t.build||(t.build={}),t.income||(t.income=pa.income),Vi().forEach(e=>{t.expense[e]||(t.expense[e]=pa.expense[e]||`#94a3b8`)}),Object.keys(pa.build).forEach(e=>{t.build[e]||(t.build[e]=pa.build[e])}),t}catch{return JSON.parse(JSON.stringify(pa))}}function ha(e){Ge(fa,JSON.stringify(e))}var ga=ma();function _a(e,t,n){e===`expense`?ga.expense[t]=n:e===`income`?ga.income=n:e===`build`&&(ga.build[t]=n),ha(ga),renderBudget(),renderBuild(),renderDashboard()}function va(){return(a.householdProfile.members||[]).filter(e=>e.role===`adult`).length||1}function ya(){return(a.householdProfile.members||[]).filter(e=>e.role===`child`).length}function ba(e){a.householdProfile.members.push({role:e||`adult`,age:null}),z(),renderSettings()}function xa(e){let t=a.householdProfile.members[e];if(!t)return;let n=t.name||(t.role===`child`?`this child`:`this adult`);if(confirm(`Remove ${n} from the household?\n\nThis cannot be undone.`)){if(t.role===`child`&&t.name){let e=(a.kids?.profiles||[]).find(e=>e.name===t.name);e&&(a.kids.profiles=a.kids.profiles.filter(t=>t.id!==e.id),a.kids.chores=a.kids.chores.filter(t=>t.assignedTo!==e.id),a.kids.completions=a.kids.completions.filter(t=>t.kidId!==e.id),a.kids.redemptions=a.kids.redemptions.filter(t=>t.kidId!==e.id),a.meals?.lunchbox?.profiles&&(a.meals.lunchbox.profiles=a.meals.lunchbox.profiles.filter(t=>t.id!==e.id)),String(getDeviceProfile())===String(e.id)&&setDeviceProfile(`adult`))}a.householdProfile.members.splice(e,1),saveData(a),renderAll()}}function Sa(e,t,n){let r=a.householdProfile.members[e];r&&(r[t]=n,z(),(t===`role`||t===`name`)&&renderSettings())}function Ca(e){a.householdProfile.pets.push({type:e||`dog`,name:``}),z(),renderSettings()}function wa(e){a.householdProfile.pets.splice(e,1),z(),renderSettings()}function Ta(e,t,n){let r=a.householdProfile.pets[e];r&&(r[t]=n,z())}function Ea(e){a.householdProfile.cars=e,z()}function Da(e,t,n){let r=t+n;return[{category:`Mortgage / Rent`,min:e*.2,max:e*.3,label:`20–30% of income`,source:`ABS / MoneySmart`,needs:!0},{category:`Groceries`,min:380+(t-1)*260+n*160,max:560+(t-1)*360+n*220,label:`$${Math.round(380+(t-1)*260+n*160)}–$${Math.round(560+(t-1)*360+n*220)}/month for ${r} ${r===1?`person`:`people`}`,source:`ABS HES 2022`,needs:!0},{category:`Transport`,min:e*.08,max:e*.15,label:`8–15% of income`,source:`ABS HES 2022`,needs:!0},{category:`Utilities`,min:180+t*25+n*15,max:360+t*40+n*25,label:`$${Math.round(180+t*25+n*15)}–$${Math.round(360+t*40+n*25)}/month`,source:`AER / ABS`,needs:!0},{category:`Insurance`,min:180+t*40+n*20,max:420+t*60+n*30,label:`$${Math.round(180+t*40+n*20)}–$${Math.round(420+t*60+n*30)}/month`,source:`APRA industry avg`,needs:!0},{category:`Health`,min:60*t+30*n,max:180*t+60*n,label:`$${60*t+30*n}–$${180*t+60*n}/month`,source:`AIHW / ABS`,needs:!0},...n>0?[{category:`Childcare / Education`,min:700*n,max:2200*n,label:`$700–$2,200/month per child (before subsidies)`,source:`ACCC Childcare Report`,needs:!0}]:[],{category:`Dining Out`,min:e*.02,max:e*.05,label:`2–5% of income`,source:`MoneySmart`,needs:!1},{category:`Entertainment`,min:e*.02,max:e*.05,label:`2–5% of income`,source:`MoneySmart`,needs:!1},{category:`Subscriptions`,min:30,max:120,label:`$30–$120/month`,source:`Industry average`,needs:!1},{category:`Clothing`,min:50*t+30*n,max:150*t+80*n,label:`$${50*t+30*n}–$${150*t+80*n}/month`,source:`ABS HES 2022`,needs:!1},{category:`Savings / Investment`,min:e*.1,max:e*.2,label:`10–20% of income (aim for 20%)`,source:`50/30/20 rule`,needs:!1}]}function Oa(e,t,n){return e<t*.9?`under`:e>n*1.1?`over`:`within`}var ka=`home_finance_ai_key`;function Aa(){return P(`home_finance_ai_key`)||``}function ja(e){Ge(ka,e)}function Ma(){let e=getLast6Months(),t={};return e.forEach(e=>{let n=getMonthData(e),r={},i={};n.expenses.forEach(t=>{let n=t.category||`Other`;r[n]=(r[n]||0)+T(t);let a=getActual(t.id,e);a>0&&(i[n]=(i[n]||0)+a)}),new Set([...Object.keys(r),...Object.keys(i)]).forEach(n=>{t[n]||(t[n]=[]),t[n].push({mo:e,budget:r[n]||0,actual:i[n]||0,hasActual:(i[n]||0)>0})})}),t}function Na(e){let t=[];return Object.entries(e).forEach(([e,n])=>{let r=n.filter(e=>e.hasActual);if(r.length<2)return;let i=r.filter(e=>e.budget>0&&e.actual>e.budget*1.05).length,a=r.filter(e=>e.budget>0&&e.actual<e.budget*.92).length,o=r.reduce((e,t)=>e+(t.actual-t.budget),0)/r.length,s=n.slice(-3).filter(e=>e.hasActual),c=n.slice(0,3).filter(e=>e.hasActual),l=s.length?s.reduce((e,t)=>e+t.actual,0)/s.length:0,u=c.length?c.reduce((e,t)=>e+t.actual,0)/c.length:0,d=u>50?(l-u)/u:0;i>=3&&o>20?t.push({cat:e,level:`warning`,icon:`⚠️`,title:`Consistently over on ${e}`,body:`Over budget ${i}/${r.length} months, avg +${g(Math.abs(o))}/mo. Consider raising the budget or cutting back.`,months:r}):a>=4&&n[n.length-1]?.budget>0?t.push({cat:e,level:`good`,icon:`✅`,title:`Consistently under on ${e}`,body:`Under budget ${a}/${r.length} months, avg ${g(Math.abs(o))}/mo less. You may be able to reallocate this budget elsewhere.`,months:r}):d>.25&&l>50?t.push({cat:e,level:`warning`,icon:`📈`,title:`${e} trending up`,body:`Spending up ${Math.round(d*100)}% over recent months — now averaging ${g(l)}/mo. Worth keeping an eye on.`,months:r}):d<-.25&&u>50&&t.push({cat:e,level:`good`,icon:`📉`,title:`${e} trending down`,body:`Down ${Math.round(Math.abs(d)*100)}% recently — now ${g(l)}/mo. Nice improvement.`,months:r})}),t.sort((e,t)=>[`warning`,`alert`,`good`,`info`].indexOf(e.level)-[`warning`,`alert`,`good`,`info`].indexOf(t.level)).slice(0,6)}function Pa(){let e=getMonthData(selectedBudgetMonth);if(e.expenses.length===0)return``;let t={};e.expenses.forEach(e=>{let n=e.category||`Other`;t[n]||(t[n]={budget:0,actual:0}),t[n].budget+=T(e),t[n].actual+=getActual(e.id,selectedBudgetMonth)});let n=Object.entries(t).filter(([,e])=>e.budget>0||e.actual>0).sort((e,t)=>Math.max(t[1].budget,t[1].actual)-Math.max(e[1].budget,e[1].actual));if(!n.length)return``;let r=Math.max(...n.flatMap(([,e])=>[e.budget,e.actual]),1),i=n.map(([e,t])=>{let n=t.actual>0,i=(t.budget/r*100).toFixed(1),a=(t.actual/r*100).toFixed(1),o=t.actual-t.budget,s=n?o>5?`over`:o<-5?`under`:``:``,c=n?o>5?`<span class="spi-over">+${g(o)}</span>`:o<-5?`<span class="spi-under">${g(o)}</span>`:`<span class="spi-on">on track</span>`:`<span class="spi-no-actual">no actuals</span>`;return`<div class="spi-cat-row">
      <div class="spi-cat-label">${e}</div>
      <div class="spi-cat-bars">
        <div class="spi-bar-wrap"><div class="spi-bar-budget" style="width:${i}%"></div>${n?`<div class="spi-bar-actual ${s}" style="width:${a}%"></div>`:``}</div>
      </div>
      <div class="spi-cat-amounts"><span>${g(t.budget)}</span>${c}</div>
    </div>`}).join(``);return`<div class="spi-breakdown">
    <div class="spi-breakdown-header">
      <span style="font-size:13px;font-weight:700">Budget vs Actual — ${monthLabel(selectedBudgetMonth)}</span>
      <div style="display:flex;gap:14px;font-size:11px;color:var(--text-muted)">
        <span><span class="spi-legend spi-legend-budget"></span>Budget</span>
        <span><span class="spi-legend spi-legend-actual"></span>Actual</span>
      </div>
    </div>
    ${i}
  </div>`}function Fa(){let e=Na(Ma()),t=Pa(),n={warning:{bg:`#fffbeb`,border:`#fcd34d`,title:`#92400e`},good:{bg:`#ecfeff`,border:`#86efac`,title:`#166534`},alert:{bg:`#fef2f2`,border:`#fca5a5`,title:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,title:`#475569`}};return`<div class="spi-section">
    <div class="spi-section-title">📊 Spending Patterns — Last 6 Months</div>
    ${t}
    ${e.length===0?`<div class="spi-empty-state">Add actuals in Monthly Budget over a few months to unlock pattern detection.</div>`:`<div class="spi-patterns-grid">${e.map(e=>{let t=n[e.level]||n.info,r=Math.max(...(e.months||[]).map(e=>e.actual),1),i=(e.months||[]).map(e=>`<div class="spi-spark-bar" style="height:${Math.max(Math.round(e.actual/r*20),e.hasActual?2:0)}px;background:${e.hasActual?e.actual>e.budget*1.05?`#ef4444`:e.actual<e.budget*.95?`#10b981`:`#2563eb`:`#e2e8f0`}"></div>`).join(``);return`<div class="spi-pattern-card" style="background:${t.bg};border:1.5px solid ${t.border}">
          <div class="spi-pattern-icon">${e.icon}</div>
          <div>
            <div class="spi-pattern-title" style="color:${t.title}">${f(e.title)}</div>
            <div class="spi-pattern-body">${f(e.body)}</div>
            <div class="spi-sparkline">${i}</div>
          </div>
        </div>`}).join(``)}</div>`}
  </div>`}function Ia(){let e=getMonthData(selectedBudgetMonth),t=E(e.income),n=E(e.expenses),r=t-n,i=t>0?r/t*100:0,o={};e.expenses.forEach(e=>{let t=e.category||`Other`;o[t]=(o[t]||0)+T(e)});let s=Object.entries(o).sort((e,t)=>t[1]-e[1]),c=getLast6Months(),l=c.reduce((e,t)=>e+E(getMonthData(t).expenses),0)/6;c.reduce((e,t)=>e+E(getMonthData(t).income),0)/6;let u=[];if(i>=20?u.push({level:`good`,icon:`🌟`,title:`Excellent savings rate`,body:`You're saving ${Math.round(i)}% of income — above the recommended 20%. Keep it up and consider putting the surplus toward your goals.`}):i>=10?u.push({level:`ok`,icon:`📈`,title:`Decent savings rate`,body:`You're saving ${Math.round(i)}% of income. Pushing to 20% would mean an extra ${g(t*.2-r)}/month going toward your future.`}):i>0?u.push({level:`warning`,icon:`⚠️`,title:`Low savings rate`,body:`Only ${Math.round(i)}% of income is being saved (${g(r)}/month). Look for the biggest discretionary expense you can reduce.`}):t>0&&u.push({level:`alert`,icon:`🚨`,title:`Spending exceeds income`,body:`You're spending ${g(Math.abs(r))} more than you earn each month. This requires urgent attention — identify what can be cut immediately.`}),l>0){let e=n-l,t=Math.round(Math.abs(e)/l*100);e>l*.1?u.push({level:`warning`,icon:`📊`,title:`Expenses above your average`,body:`This month's expenses are ${t}% above your 6-month average (${g(l)}). The extra ${g(e)} could be a one-off — worth reviewing.`}):e<-l*.08&&l>0&&u.push({level:`good`,icon:`📊`,title:`Expenses below your average`,body:`Nice — this month you spent ${t}% less than your 6-month average. That's ${g(Math.abs(e))} extra in your pocket.`})}if(s.length>0){let[e,t]=s[0],r=n>0?Math.round(t/n*100):0;r>45&&e!==`Mortgage / Rent`&&u.push({level:`warning`,icon:`💸`,title:`${e} is dominating your budget`,body:`${e} makes up ${r}% of your total expenses (${g(t)}/month). Reducing this by 20% would save ${g(t*.2)}/month.`})}let d=o[`Dining Out`]||0;d>0&&n>0&&d/n>.08&&u.push({level:`ok`,icon:`🍽️`,title:`Dining out is notable`,body:`You're spending ${g(d)}/month dining out. Cooking at home 2–3 more times a week could save ${g(d*.35)}/month.`}),e.income.length===1&&t>0&&u.push({level:`info`,icon:`💡`,title:`Single income source`,body:`You rely on one income stream. Even a small side income (freelance, rental, etc.) would significantly improve your financial resilience.`});let f=a.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),p=a.buildContract.total-f;if(p>0&&r>0){let e=Math.round(p/r);u.push({level:`info`,icon:`🏗️`,title:`Build payments still ahead`,body:`You have ${g(p)} left in contract payments. At your current savings rate that represents ${e} month${e===1?``:`s`} of surplus — plan accordingly.`})}let m=(a.goals||[]).filter(e=>!e.achieved);return m.length>0&&r>0&&u.push({level:`good`,icon:`🎯`,title:`${m.length} active goal${m.length>1?`s`:``}`,body:`Your ${g(r)}/month surplus can work toward your goals. Review the Goals page to see progress and adjust contributions.`}),e.expenses.length===0&&u.push({level:`info`,icon:`📝`,title:`Add your expenses`,body:`Head to Monthly Budget and add your regular expenses to unlock personalised insights.`}),u}var La=`https://home-finance-proxy.fuscocl.workers.dev`;async function Ra(){let e=document.getElementById(`ai-run-btn`);e.disabled=!0,e.textContent=`Analysing…`;let t=getMonthData(selectedBudgetMonth),n=E(t.income),r=E(t.expenses),i=n-r,o=n>0?Math.round(i/n*100):0,s={};t.expenses.forEach(e=>{s[e.category||`Other`]=(s[e.category||`Other`]||0)+T(e)});let c=getLast6Months().map(e=>{let t=getMonthData(e);return{month:e,income:E(t.income),expenses:E(t.expenses)}}),l=Da(n,va(),ya()).filter(e=>s[e.category]!==void 0).map(e=>({category:e.category,yourSpend:Math.round(s[e.category]||0),benchmarkMin:Math.round(e.min),benchmarkMax:Math.round(e.max),benchmarkLabel:e.label,status:Oa(s[e.category]||0,e.min,e.max)})),u={month:monthLabel(selectedBudgetMonth),household:(function(){let e=a.householdProfile||{},t=e.members||[],n=t.filter(e=>e.role===`adult`),r=t.filter(e=>e.role===`child`);return{adults:n.length||2,children:r.length,totalPeople:t.length||2,memberAges:t.map(e=>({role:e.role,age:e.age})),pets:(e.pets||[]).map(e=>e.type),cars:e.cars||0}})(),monthlyIncome:n,monthlyExpenses:r,surplus:i,savingsRatePct:o,expensesByCategory:s,benchmarkComparisons:l,incomeStreams:t.income.map(e=>({name:e.name,monthlyAmount:T(e)})),last6MonthsTrend:c,activeGoals:(a.goals||[]).filter(e=>!e.achieved).map(e=>({name:e.name,type:e.type})),buildRemaining:a.buildContract.total-a.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),currency:`AUD`},d=`You are a friendly but direct personal finance advisor for an Australian family. Analyse their budget data and benchmark comparisons, then give 4-6 concise, specific, actionable insights.

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

Reply with ONLY the JSON array, no other text.`;try{let e=await fetch(La,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:1024,messages:[{role:`user`,content:d}]})});if(!e.ok){let t=await e.json().catch(()=>({}));throw Error(t.error?.message||`API error ${e.status}`)}let t=(await e.json()).content[0].text.trim();t=t.replace(/^```[a-z]*\n?/i,``).replace(/\n?```$/,``).trim(),za(JSON.parse(t),!0)}catch(e){let t=e.message;(t.includes(`Failed to fetch`)||t.includes(`NetworkError`)||t.includes(`CORS`))&&(t=`CORS blocked — the browser can't call the Anthropic API directly. We need a small proxy (Cloudflare Worker). Ask me to set it up — it takes 5 minutes and is free.`),document.getElementById(`ai-output`).innerHTML=`
      <div style="padding:16px 20px;background:var(--danger-light);border-radius:8px;color:var(--danger);font-size:13px">
        <strong>Error:</strong> ${t}
      </div>`}finally{e.disabled=!1,e.textContent=`✨ Generate AI Insights`}}function za(e,t){let n={good:{bg:`#ecfeff`,border:`#86efac`,icon_bg:`#dcfce7`,text:`#166534`},ok:{bg:`#eff6ff`,border:`#93c5fd`,icon_bg:`#dbeafe`,text:`#1e40af`},warning:{bg:`#fffbeb`,border:`#fcd34d`,icon_bg:`#fef3c7`,text:`#92400e`},alert:{bg:`#fef2f2`,border:`#fca5a5`,icon_bg:`#fee2e2`,text:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,icon_bg:`#f1f5f9`,text:`#475569`}},r=e.map(e=>{let t=n[e.level]||n.info;return`
      <div style="background:${t.bg};border:1.5px solid ${t.border};border-radius:12px;padding:16px 18px;display:flex;gap:14px;align-items:flex-start">
        <div style="width:38px;height:38px;border-radius:10px;background:${t.icon_bg};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${e.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:14px;color:${t.text};margin-bottom:4px">${f(e.title)}</div>
          <div style="font-size:13px;color:var(--text);line-height:1.5">${f(e.body)}</div>
          ${e.action?`<div style="margin-top:8px;font-size:12px;font-weight:600;color:${t.text}">→ ${f(e.action)}</div>`:``}
        </div>
      </div>`}).join(``);document.getElementById(`ai-output`).innerHTML=`
    <div style="display:flex;flex-direction:column;gap:12px">
      ${t?`<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-muted);margin-bottom:4px"><span>✨</span> Generated by Claude AI · ${monthLabel(selectedBudgetMonth)}</div>`:``}
      ${r}
    </div>`}function Ba(e,t,n,r){let i=Da(e,t,n);t+n;let a=[`Mortgage / Rent`,`Insurance`,`Utilities`,`Groceries`,`Transport`,`Health`,`Childcare / Education`],o=[`Dining Out`,`Entertainment`,`Subscriptions`,`Clothing`,`Personal Care`],s=[`Savings / Investment`],c=Object.entries(r).filter(([e])=>a.includes(e)).reduce((e,[,t])=>e+t,0),l=Object.entries(r).filter(([e])=>o.includes(e)).reduce((e,[,t])=>e+t,0),u=Object.entries(r).filter(([e])=>s.includes(e)).reduce((e,[,t])=>e+t,0),d=e>0?Math.round(c/e*100):0,f=e>0?Math.round(l/e*100):0,p=e>0?Math.round(u/e*100):0;function m(e,t,n,r){let i=Math.min(t,100),a=t>n;return`
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
      </div>`}let h=i.filter(e=>r[e.category]!==void 0||e.category===`Savings / Investment`).map(e=>{let t=r[e.category]||0,n=Oa(t,e.min,e.max),i=n===`under`?`#3b82f6`:n===`within`?`#10b981`:`#ef4444`,a=n===`under`?`Below avg`:n===`within`?`On track`:`Above avg`,o=e.max>0?Math.min(t/(e.max*1.5)*100,100):0,s=e.max>0?Math.min(e.max/(e.max*1.5)*100,100):0;return`
      <tr>
        <td style="border-left:3px solid ${ga.expense[e.category]||`#94a3b8`};font-weight:500">${e.category}</td>
        <td class="amount" style="font-weight:600">${t>0?g(t):`<span style="color:var(--text-muted)">—</span>`}</td>
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
                <div style="font-size:11px;color:var(--text-muted)">${g(e.amt)}</div>
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
    </div>`}function Va(){Aa();let e=Ia(),t=getMonthData(selectedBudgetMonth),n=E(t.income),r=E(t.expenses),i=n-r,o=n>0?Math.round(i/n*100):0,s=va(),c=ya(),l={};t.expenses.forEach(e=>{let t=e.category||`Other`;l[t]=(l[t]||0)+T(e)});let u=0;o>=20?u+=40:o>=10?u+=28:o>0&&(u+=14),t.income.length>1&&(u+=10),(a.goals||[]).some(e=>!e.achieved)&&(u+=15),a.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0)>0&&(u+=10),r>0&&r<n&&(u+=25);let d=u>=70?`#10b981`:u>=45?`#f59e0b`:`#ef4444`,f=u>=70?`Great shape`:u>=45?`On track`:`Needs attention`;document.getElementById(`insights-content`).innerHTML=`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap">
      <button class="btn btn-sm" onclick="prevInsightsMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${monthLabel(selectedBudgetMonth)}</span>
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
        <div class="card-value ${o>=20?`green`:o>=10?`orange`:`red`}">${o}%</div>
        <div class="card-sub">${g(Math.max(i,0))}/month saved</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Surplus</div>
        <div class="card-value ${i>=0?`green`:`red`}">${g(Math.abs(i))}</div>
        <div class="card-sub">${i>=0?`available`:`overspending`}</div>
      </div>
      <div class="card">
        <div class="card-label">Income / Expenses</div>
        <div class="card-value">${g(n)}</div>
        <div class="card-sub">vs ${g(r)} out</div>
      </div>
    </div>

    ${Ba(n,s,c,l)}

    ${Fa()}

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;margin-top:4px">

      <!-- Smart insights -->
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">💡 Budget Health</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${Ha(e)}
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
  `}function Ha(e){let t={good:{bg:`#ecfeff`,border:`#86efac`,text:`#166534`},ok:{bg:`#eff6ff`,border:`#93c5fd`,text:`#1e40af`},warning:{bg:`#fffbeb`,border:`#fcd34d`,text:`#92400e`},alert:{bg:`#fef2f2`,border:`#fca5a5`,text:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,text:`#475569`}};return e.map(e=>{let n=t[e.level]||t.info;return`
      <div style="background:${n.bg};border:1.5px solid ${n.border};border-radius:10px;padding:14px 16px;display:flex;gap:12px;align-items:flex-start">
        <span style="font-size:20px;flex-shrink:0;line-height:1.3">${e.icon}</span>
        <div>
          <div style="font-weight:700;font-size:13px;color:${n.text};margin-bottom:3px">${f(e.title)}</div>
          <div style="font-size:12px;color:var(--text);line-height:1.5">${f(e.body)}</div>
        </div>
      </div>`}).join(``)}function Ua(){let[e,t]=selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t-2,1);selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,safeRender(Va),safeRender(renderMoneyDashboard),safeRender(renderBudget)}function Wa(){let[e,t]=selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t,1);selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,safeRender(Va),safeRender(renderMoneyDashboard),safeRender(renderBudget)}var Ga=`🏠.🏡.🏗️.🔑.💡.🔌.🚿.🛋️.🛏️.🪴.🍽️.🍕.🍔.🛒.🥗.🍷.☕.🍰.🥩.🧃.🚗.🚙.🚌.✈️.⛽.🚕.🏎️.🚲.🛵.🚂.👨‍👩‍👧.👶.📚.🏫.💊.🏥.💅.💆.🧴.👕.🎮.🎬.🎵.🏋️.📺.🎲.🏄.🎯.🎨.🎭.💰.💳.🏦.📈.💸.🪙.💎.📊.🏆.💼.📦.🛍️.🎁.🔧.🛠️.📱.💻.🧹.🧺.🖨️.🐕.🐈.🐠.🌱.☀️.❄️.🎄.🎂.⚽.🧸`.split(`.`);function Ka(e,t){let n=document.createElement(`div`);n.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9999;display:flex;align-items:center;justify-content:center`,n.innerHTML=`
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;width:340px;max-width:95vw;box-shadow:0 8px 32px rgba(0,0,0,0.35)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <span style="font-weight:700;font-size:15px">Choose Icon</span>
        <button id="emoji-picker-close" style="background:none;border:none;cursor:pointer;font-size:20px;color:var(--text-muted);line-height:1">&times;</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:4px;max-height:220px;overflow-y:auto">
        ${Ga.map(t=>`
          <button data-emoji="${t}" style="font-size:20px;width:100%;aspect-ratio:1;border:2px solid ${t===e?`var(--primary)`:`transparent`};border-radius:6px;cursor:pointer;background:${t===e?`var(--primary)22`:`transparent`};transition:background .1s" title="${t}">${t}</button>
        `).join(``)}
      </div>
    </div>
  `,document.body.appendChild(n),n.querySelector(`#emoji-picker-close`).onclick=()=>document.body.removeChild(n),n.querySelectorAll(`[data-emoji]`).forEach(e=>{e.onclick=()=>{t(e.dataset.emoji),document.body.removeChild(n)}}),n.addEventListener(`click`,e=>{e.target===n&&document.body.removeChild(n)})}function qa(){openModal(`Add Category Group`,`
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
  `,()=>{let e=document.getElementById(`f-grp-icon`).value||`📦`,t=document.getElementById(`f-grp-name`).value.trim();if(!t)return;let n=D(a.categoryGroups);a.categoryGroups.push({id:n,name:t,icon:e,categories:[]}),logActivity(`Added category group`,t),saveData(a),closeModal(),renderSettings()}),document.getElementById(`f-grp-icon-btn`).addEventListener(`click`,()=>{let e=document.getElementById(`f-grp-icon`).value;Ka(e,e=>{document.getElementById(`f-grp-icon`).value=e,document.getElementById(`f-grp-icon-btn`).textContent=e})})}function Ja(e){let t=a.categoryGroups.find(t=>t.id===e);t&&Ka(t.icon,t=>{Xa(e,`icon`,t);let n=document.getElementById(`grp-icon-btn-${e}`);n&&(n.textContent=t)})}function Ya(e){let t=a.categoryGroups.find(t=>t.id===e);confirm(`Delete group "${t?t.name:``}"? Categories will become unassigned.`)&&(a.categoryGroups=a.categoryGroups.filter(t=>t.id!==e),logActivity(`Deleted category group`,t?t.name:``),saveData(a),renderSettings())}function Xa(e,t,n){let r=a.categoryGroups.find(t=>t.id===e);r&&(r[t]=n,saveData(a))}function Za(e,t){if(!t)return;Vi().includes(t)||(a.expenseCategories||(a.expenseCategories=Vi().slice()),a.expenseCategories.push(t)),a.categoryGroups.forEach(e=>{e.categories=e.categories.filter(e=>e!==t)});let n=a.categoryGroups.find(t=>t.id===e);n&&n.categories.push(t),saveData(a),renderSettings()}function Qa(e){let t=Vi(),n=new Set((a.categoryGroups||[]).filter(t=>t.id!==e).flatMap(e=>e.categories)),r=a.categoryGroups.find(t=>t.id===e),i=new Set(r?r.categories:[]),o=t.filter(e=>!i.has(e)&&!n.has(e));openModal(`Add Category to Group`,`
    ${o.length>0?`
    <div class="form-group" style="margin-bottom:16px">
      <label class="form-label">Pick an existing category</label>
      <div style="display:flex;flex-wrap:wrap;gap:6px" id="cat-pick-list">
        ${o.map(e=>`
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
  `,()=>{let t=document.getElementById(`f-cat-selected`).value,n=document.getElementById(`f-cat-new`).value.trim()||t;n&&(Za(e,n),closeModal())})}function $a(e,t){let n=a.categoryGroups.find(t=>t.id===e);n&&(n.categories=n.categories.filter(e=>e!==t),saveData(a),renderSettings())}var eo=!1,to=null;function z(){eo||(to=JSON.parse(JSON.stringify(a))),eo=!0;let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`flex`)}function no(){eo=!1,to=null,saveData(a);let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`none`);let t=document.getElementById(`settings-save-btn`);if(t){let e=t.textContent;t.textContent=`Saved`,t.style.background=`#10b981`,setTimeout(()=>{t.textContent=e,t.style.background=``},1500)}renderAll()}function ro(){to&&Object.assign(a,to),eo=!1,to=null;let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`none`),renderSettings()}function io(e){eo&&(confirm(`You have unsaved changes in Settings. Save before leaving?`)?no():ro())}function ao(e,t){a.settings||(a.settings={}),a.settings[e]=t,z()}function oo(){let e=document.getElementById(`settings-api-key`)?.value.trim();if(!e)return;Ge(`toto_ai_key`,e),Ge(`toto_ai_key_meta`,JSON.stringify({addedAt:new Date().toISOString(),prefix:e.slice(0,10),suffix:e.slice(-4)}));let t=document.getElementById(`api-key-status`);t&&(t.textContent=`✓ Key saved!`,t.style.color=`var(--success)`,setTimeout(()=>{t.textContent=``,t.style.color=``},2e3));let n=document.getElementById(`api-key-summary`);n&&(n.outerHTML=co())}function so(){confirm(`Remove saved API key? Toto and cost estimation will stop working.`)&&(Ke(`toto_ai_key`),Ke(`toto_ai_key_meta`),renderSettings())}function co(){let e=P(`toto_ai_key`);if(!e)return`<div id="api-key-summary"></div>`;let t=JSON.parse(P(`toto_ai_key_meta`)||`{}`),n=t.addedAt?new Date(t.addedAt).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`}):`Unknown date`;return`
    <div id="api-key-summary" style="margin-top:14px;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;display:flex;align-items:center;gap:14px;max-width:480px">
      <div style="font-size:24px">🔑</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px">Active Key</div>
        <div style="font-size:13px;font-family:monospace;color:var(--text);word-break:break-all">${t.prefix?`${t.prefix}${`•`.repeat(20)}${t.suffix}`:`${e.slice(0,10)}${`•`.repeat(20)}${e.slice(-4)}`}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Added ${n} · Powers Toto chat, event cost estimation &amp; CSV import</div>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="removeApiKey()" style="color:var(--danger);flex-shrink:0">Remove</button>
    </div>`}function lo(e){let t=document.getElementById(`sacc-body-${e}`),n=document.getElementById(`sacc-chev-${e}`);if(!t)return;let r=t.style.display!==`none`;t.style.display=r?`none`:`block`,n&&(n.textContent=r?`▼`:`▲`),r?_settingsOpen.delete(e):_settingsOpen.add(e)}function uo(){confirm(`Clear the entire activity log? This cannot be undone.`)&&(a.activityLog=[],saveData(a),renderSettings())}function fo(e){let t=document.getElementById(`new-cat-${e}`),n=(t.value||``).trim();if(!n){t.focus();return}let r=e===`expense`?a.expenseCategories:a.incomeCategories;if(r.includes(n)){alert(`That category already exists.`);return}r.push(n),logActivity(`Added ${e} category`,n),z(),t.value=``,renderSettings()}function po(e,t){let n=e===`expense`?a.expenseCategories:a.incomeCategories;if(e===`expense`&&(a.budget.expenses.some(e=>e.category===t)||Object.values(a.budget.months||{}).some(e=>(e.expenses||[]).some(e=>e.category===t)))&&!confirm(`"${t}" is used by existing expenses. Remove anyway?`))return;let r=n.indexOf(t);r!==-1&&n.splice(r,1),logActivity(`Removed ${e} category`,t),z(),renderSettings()}function mo(e){let t=a.categoryGroups||DEFAULT_DATA.categoryGroups;a.budget.actuals[selectedBudgetMonth];let n=(a.colors||{}).expense||{},r=new Set(t.flatMap(e=>e.categories)),i=[...new Set(e.map(e=>e.category||`Other`))].filter(e=>!r.has(e)),o=i.length>0?[...t,{id:`ug`,name:`Ungrouped`,icon:`📋`,categories:i}]:t,s=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:4px;align-items:start">`;for(let t of o){let r=e.filter(e=>t.categories.includes(e.category||`Other`));if(r.length===0)continue;let i=r.reduce((e,t)=>e+T(t),0),a=r.reduce((e,t)=>e+getActual(t.id,selectedBudgetMonth),0),o=i>0?Math.round(a/i*100):0,c=Math.min(100,o),l=o>=100?`var(--danger)`:o>=80?`var(--warning)`:`var(--success)`,u=a>0,d=a>i&&u,p=r[0]&&r[0].category||`Other`,m=n[p]||colors.expense[p]||`#94a3b8`;s+=`
    <div style="background:var(--surface);border:1px solid ${d?`var(--danger)`:`var(--border)`};border-radius:10px;overflow:hidden">
      <!-- Always-visible title bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 14px;cursor:pointer;user-select:none;background:${m}22;border-bottom:3px solid ${m}" onclick="toggleGroupExpand('${t.id}')">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:20px">${t.icon}</span>
          <span style="font-weight:700;font-size:14px">${f(t.name)}</span>
          <span style="font-size:11px;color:var(--text-muted)">${r.length} item${r.length===1?``:`s`}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-weight:700;font-size:14px">${g(i)}<span style="font-size:11px;font-weight:400;color:var(--text-muted)">/mo</span></span>
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
            ${u?`${g(a)} spent · ${o}%${d?` — over budget!`:``}`:`No actuals entered yet`}
          </span>
          <span style="color:var(--text-muted)">${g(i)} budgeted</span>
        </div>
      </div>
      <!-- Collapsible items only -->
      <div id="grp-body-${t.id}" style="border-top:1px solid var(--border)">
        <div style="max-height:248px;overflow-y:auto">
        ${r.map(e=>{let t=T(e),r=getActual(e.id,selectedBudgetMonth),i=t>0?Math.min(100,Math.round(r/t*100)):0,a=n[e.category||`Other`]||colors.expense[e.category||`Other`]||`#94a3b8`,o=r>t&&r>0,s=o?`var(--danger)`:i>=80?`var(--warning)`:r>0?a:`var(--border)`;return r>0?`${g(r)}${g(t)}${i}`:`${g(t)}`,`
          <div class="expense-row" style="--row-color:${a};display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border)">
            <div style="width:4px;height:36px;border-radius:2px;background:${a};flex-shrink:0"></div>
            <div style="flex:1;min-width:0;cursor:pointer" onclick="event.stopPropagation();openEditExpense(${e.id})">
              <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f(e.name)}</div>
              <div style="font-size:11px;color:var(--text-muted)">${e.category||`Other`}${e.vendor?` · ${f(e.vendor)}`:``} · ${C(e)}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-right:4px">
              <div style="font-size:13px;font-weight:600">${g(t)}/mo</div>
              ${r>0?`<div style="font-size:11px;font-weight:600;color:${o?`var(--danger)`:i>=80?`var(--warning)`:`var(--success)`}">${g(r)} actual${o?` ▲`:``}</div>`:`<div style="font-size:11px;color:var(--text-muted);cursor:pointer" onclick="event.stopPropagation();editActual(${e.id})">+ add actual</div>`}
            </div>
            <div style="position:relative;flex-shrink:0;width:32px;height:32px;cursor:pointer"
                 onclick="event.stopPropagation();editActual(${e.id})"
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
    </div>`}return s+=`</div>`,s}function ho(t){let n=(t.expenses||[]).filter(e=>!e.skipped);if(!n.length)return{segments:[],total:0};let r={};n.forEach(t=>{let n=t.category||`Other`,i=e(Number(t.amount)||0,t.frequency);i>0&&(r[n]=(r[n]||0)+i)});let i=Object.entries(r).map(([e,t])=>({name:e,amount:t})).sort((e,t)=>t.amount-e.amount),a=i.reduce((e,t)=>e+t.amount,0);if(a===0)return{segments:[],total:0};let o=i.slice(0,6),s=i.slice(6),c=[`#15803d`,`#16a34a`,`#22c55e`,`#65a30d`,`#84cc16`,`#a3e635`,`#94A3B8`],l=o.map((e,t)=>({name:e.name,amount:e.amount,pct:e.amount/a*100,color:c[t]||`#94A3B8`}));if(s.length){let e=s.reduce((e,t)=>e+t.amount,0);l.push({name:`Other`,amount:e,pct:e/a*100,color:c[6]})}return{segments:l,total:a}}var go={groceries:`GROC`,grocery:`GROC`,food:`FOOD`,rent:`RENT`,mortgage:`MORT`,fuel:`FUEL`,petrol:`FUEL`,transport:`TRSP`,dining:`DINE`,restaurants:`DINE`,"eating out":`DINE`,takeaway:`DINE`,utilities:`UTIL`,bills:`BILL`,electricity:`ELEC`,gas:`GAS`,water:`WATR`,internet:`NET`,phone:`PHNE`,subscriptions:`SUBS`,streaming:`SUBS`,insurance:`INSR`,health:`HLTH`,medical:`HLTH`,savings:`SAVE`,entertainment:`ENT`,travel:`TRVL`,holiday:`TRVL`,school:`EDU`,education:`EDU`,kids:`KIDS`,childcare:`KIDS`,pets:`PETS`,vehicle:`AUTO`,car:`AUTO`,household:`HSE`,clothing:`CLTH`,gifts:`GIFT`,charity:`GIVE`,other:`OTHR`};function _o(e){let t=(e||`other`).toLowerCase().trim();return go[t]?go[t]:(e||`OTHR`).replace(/[^A-Za-z]/g,``).toUpperCase().slice(0,4)||`OTHR`}function vo(e){let t=(e||``).toLowerCase();return t.includes(`groc`)||t.includes(`food`)||t.includes(`supermarket`)?`i-shopping-cart`:t.includes(`rent`)||t.includes(`mortgage`)||t.includes(`housing`)||t.includes(`home loan`)?`i-home`:t.includes(`petrol`)||t.includes(`fuel`)||t.includes(`transport`)||t.includes(`uber`)||t.includes(`parking`)||t.includes(`toll`)?`i-fuel`:t.includes(`dining`)||t.includes(`restaur`)||t.includes(`eat`)||t.includes(`takeaway`)?`i-utensils`:t.includes(`utilit`)||t.includes(`electric`)||t.includes(`gas`)||t.includes(`water`)||t.includes(`internet`)||t.includes(`phone`)||t.includes(`bill`)?`i-zap`:t.includes(`subscript`)||t.includes(`netflix`)||t.includes(`spotify`)||t.includes(`streaming`)?`i-receipt`:t.includes(`vehicle`)||t.includes(`car`)||t.includes(`rego`)||t.includes(`motor`)||t.includes(`auto`)?`i-car`:t.includes(`health`)||t.includes(`medic`)||t.includes(`pharm`)||t.includes(`doctor`)||t.includes(`dentist`)?`i-pill`:t.includes(`insur`)?`i-file-text`:t.includes(`school`)||t.includes(`education`)?`i-clipboard-check`:t.includes(`kid`)||t.includes(`child`)?`i-users`:t.includes(`pet`)?`i-paw`:t.includes(`saving`)||t.includes(`invest`)?`i-trophy`:t.includes(`travel`)||t.includes(`holiday`)?`i-palm-tree`:`i-receipt`}function yo(){try{a.budget;let{income:e,expenses:t}=getMonthData(selectedBudgetMonth),n=E(e),r=E(t),i=n-r,o=t.reduce((e,t)=>e+getActual(t.id,selectedBudgetMonth),0),s=r-o,c=new Date(...selectedBudgetMonth.split(`-`).map((e,t)=>t===1?e:+e),0).getDate(),l=new Date().getDate();Math.round(l/c*100);let u=r>0?Math.round(o/r*100):0,d=prevMonthStr(selectedBudgetMonth),p=``;p+=`
    <div class="wallet-month-bar">
      <button class="wallet-month-btn" onclick="prevMonth()">&#8249;</button>
      <div class="wallet-month-label">${monthLabel(selectedBudgetMonth)}</div>
      <button class="wallet-month-btn" onclick="nextMonth()">&#8250;</button>
    </div>`,p+=`
    <div class="summary-hero" onclick="toggleBudgetDetail()">
      <div class="summary-hero-label">${i>=0?`Monthly surplus`:`Over budget`}</div>
      <div class="summary-hero-num">${g(Math.abs(i))}</div>
      <div class="summary-hero-sub">${g(n)} income · ${g(r)} expenses</div>
      <div class="summary-hero-expand" id="budget-expand-label">${B?`Hide details ▲`:`See breakdown ▼`}</div>
    </div>`,p+=`
    <div class="summary-mini-grid">
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:#10b981">${g(n)}</div>
        <div class="summary-mini-label">Income</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${g(r)}</div>
        <div class="summary-mini-label">Budgeted</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:${o>r?`#ef4444`:`#18181b`}">${g(o)}</div>
        <div class="summary-mini-label">Actual spent</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${u}%</div>
        <div class="summary-mini-label">of budget used</div>
      </div>
    </div>`;let m=ho({income:e,expenses:t});if(m.segments.length){let e=m.segments.map(e=>`<div style="background:${e.color};flex:${e.pct.toFixed(2)}"></div>`).join(``);m.segments.map(e=>`<div class="alloc-row">
        <div class="tdot" style="background:${e.color}"><svg viewBox="0 0 24 24"><use href="#${vo(e.name)}"/></svg></div>
        <div class="body">
          <div class="ticker">${_o(e.name)}</div>
          <div class="name">${f(e.name)}</div>
        </div>
        <div>
          <div class="pct">${Math.round(e.pct)}%</div>
          <div class="amt">${g(e.amount)}</div>
        </div>
      </div>`).join(``),p+=`<div class="alloc-section" style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:0" onclick="_allocExpanded=!_allocExpanded;renderBudget()">
        <div class="alloc-title" style="margin-bottom:0">Budget Allocation</div>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)">▼</span>
      </div>
      <div class="alloc-bar" style="margin-bottom:0">${e}</div>
      
      <div onclick="event.stopPropagation();_budgetDetailOpen=true;renderBudget();document.getElementById('budget-detail')?.scrollIntoView({behavior:'smooth',block:'start'})" style="margin-top:10px;text-align:center;font-size:12px;color:var(--iris-2);font-weight:500;cursor:pointer;font-family:var(--sans)">Manage income &amp; expenses in Detailed Breakdown ↓</div>
    </div>`}p+=`<div class="alloc-section" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:${B?`16px`:`0`}" onclick="toggleBudgetDetail()">
      <div class="alloc-title" style="margin-bottom:0">Detailed Breakdown</div>
      <div style="display:flex;align-items:center;gap:10px">
        <button onclick="event.stopPropagation();openCsvImport()" style="padding:5px 12px;border-radius:99px;background:var(--purple-soft);color:var(--purple);border:none;font-size:12px;font-weight:600;cursor:pointer">Import</button>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)" id="budget-expand-chevron">${B?`▲`:`▼`}</span>
      </div>
    </div>
    <div class="detail-panel ${B?`expanded`:`collapsed`}" id="budget-detail" style="margin:0 -4px">`,isMonthCustomized(selectedBudgetMonth)||(p+=`<div style="display:flex;align-items:center;justify-content:space-between;background:var(--primary-light);border:1px solid #bfdbfe;border-radius:8px;padding:10px 16px;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div>
        <span style="font-size:13px;font-weight:600;color:var(--primary)">Using default budget</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="copyMonthFromPrevious('${selectedBudgetMonth}')">
        Copy from ${monthLabel(d)}
      </button>
    </div>`),p+=renderBudgetForecast(selectedBudgetMonth,i),p+=renderBudgetSuggestions(selectedBudgetMonth),p+=`
    <div class="section" style="margin-bottom:20px">
      <div class="section-header">
        <div>
          <div class="section-title">Income</div>
          <div class="section-subtitle">${g(n)}/mo total</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddIncome()">+ Income</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Amount</th><th>Due</th><th>Repeats</th><th>Monthly</th><th></th></tr></thead>
          <tbody>
            ${e.length===0?`<tr><td colspan="6"><div class="empty"><div class="empty-icon">💵</div>Add your income sources</div></td></tr>`:e.map(e=>{let t=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():`<span style="color:var(--text-muted)">—</span>`,n=e.recurring===!1?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>`:``;return`<tr>
              <td style="font-weight:500;border-left:4px solid ${colors.income}">${f(e.name)}${n}</td>
              <td class="amount">${_(e.amount)}</td>
              <td>${t}</td>
              <td style="color:var(--text-muted)">${C(e)}</td>
              <td class="amount" style="color:var(--success)">${g(T(e))}/mo</td>
              <td class="actions">
                <button class="btn btn-ghost btn-sm" onclick="openEditIncome(${e.id})">✏️</button>
                <button class="btn btn-danger-ghost btn-sm" onclick="deleteIncome(${e.id})">🗑</button>
              </td>
            </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `;let h=[`all`,...Array.from(new Set(t.map(e=>e.category||`Other`))).sort()],v=expenseFilterCat===`all`?t:t.filter(e=>(e.category||`Other`)===expenseFilterCat),y=v.reduce((e,t)=>e+T(t),0),b=v.reduce((e,t)=>e+getActual(t.id,selectedBudgetMonth),0),x=y-b,S=expenseFilterCat!==`all`;p+=`
    <div class="section">
      <div class="section-header">
        <div>
          <div class="section-title">Expenses</div>
          <div class="section-subtitle">
            Budget: ${g(r)}/mo
            ${o>0?` · Actual: ${g(o)} · <span class="${s>=0?`var-under`:`var-over`}">${s>=0?`▼`:`▲`} ${g(Math.abs(s))}</span>`:``}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div style="display:flex;border:1px solid var(--border);border-radius:6px;overflow:hidden">
            <button onclick="setBudgetView('grouped')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;cursor:pointer;background:${budgetViewMode===`grouped`?`var(--primary)`:`var(--surface)`};color:${budgetViewMode===`grouped`?`#fff`:`var(--text-muted)`}">⊞ Groups</button>
            <button onclick="setBudgetView('table')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;border-left:1px solid var(--border);cursor:pointer;background:${budgetViewMode===`table`?`var(--primary)`:`var(--surface)`};color:${budgetViewMode===`table`?`#fff`:`var(--text-muted)`}">≡ Table</button>
          </div>
          ${budgetViewMode===`table`?`<select class="form-select" style="width:auto;padding:6px 10px;font-size:12px" onchange="setExpenseFilter(this.value)">
            ${h.map(e=>`<option value="${e}" ${expenseFilterCat===e?`selected`:``}>${e===`all`?`All categories`:e}</option>`).join(``)}
          </select>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddExpense()">+ Expense</button>
        </div>
      </div>

      <div style="padding:16px 20px">
      ${budgetViewMode===`grouped`?mo(t):`
        <div class="table-wrap" style="margin:0 -20px">
          <table>
            <thead>
              <tr>
                ${thSort(`name`,`Item`)}
                ${thSort(`category`,`Category`)}
                ${thSort(`frequency`,`Frequency`)}
                ${thSort(`due`,`Due`)}
                ${thSort(`budget`,`Budget/mo`)}
                <th>Actual <span style="font-weight:400;text-transform:none;letter-spacing:0;font-size:10px;color:var(--text-muted)">(click to edit)</span></th>
                ${thSort(`variance`,`Variance`)}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${v.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>${t.length===0?`Add your household expenses`:`No expenses in this category`}</div></td></tr>`:[...v].sort((e,t)=>{if(!expenseSortCol)return 0;let n,r;if(expenseSortCol===`name`)n=e.name.toLowerCase(),r=t.name.toLowerCase();else if(expenseSortCol===`category`)n=(e.category||`Other`).toLowerCase(),r=(t.category||`Other`).toLowerCase();else if(expenseSortCol===`frequency`)n=C(e),r=C(t);else if(expenseSortCol===`due`)n=e.dueDate||`￿`,r=t.dueDate||`￿`;else if(expenseSortCol===`budget`)n=T(e),r=T(t);else if(expenseSortCol===`actual`)n=getActual(e.id,selectedBudgetMonth),r=getActual(t.id,selectedBudgetMonth);else if(expenseSortCol===`variance`)n=T(e)-getActual(e.id,selectedBudgetMonth),r=T(t)-getActual(t.id,selectedBudgetMonth);else return 0;return n<r?expenseSortDir===`asc`?-1:1:n>r?expenseSortDir===`asc`?1:-1:0}).map(e=>{let t=T(e),n=getActual(e.id,selectedBudgetMonth),r=t-n,i=n>0,a;a=i?r>=0?`<span class="var-under">▼ ${g(r)}</span>`:`<span class="var-over">▲ ${g(Math.abs(r))}</span>`:`<span class="var-none">—</span>`;let o=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():`<span style="color:var(--text-muted)">—</span>`,s=colors.expense[e.category||`Other`]||`#94a3b8`,c=e.recurring===!1?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>`:``;return`<tr>
                        <td style="font-weight:500;border-left:4px solid ${s}">${f(e.name)}${c}${e.vendor?`<br><span style="font-size:11px;font-weight:400;color:var(--text-muted)">${f(e.vendor)}</span>`:``}</td>
                        <td><span style="display:inline-block;padding:2px 10px;border-radius:99px;background:${s};color:#fff;font-size:11px;font-weight:600;white-space:nowrap">${e.category||`Other`}</span></td>
                        <td style="color:var(--text-muted)">${C(e)}</td>
                        <td>${o}</td>
                        <td class="amount">${g(t)}</td>
                        <td class="actual-cell amount" id="actual-${e.id}" onclick="editActual(${e.id})">${i?g(n):`<span style="color:var(--text-muted);font-size:12px">+ add</span>`}</td>
                        <td>${a}</td>
                        <td class="actions">
                          <button class="btn btn-ghost btn-sm" onclick="openEditExpense(${e.id})">✏️</button>
                          <button class="btn btn-danger-ghost btn-sm" onclick="deleteExpense(${e.id})">🗑</button>
                        </td>
                      </tr>`}).join(``)}
            </tbody>
            ${v.length>0?`
            <tfoot>
              <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                <td colspan="4" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total ${S?expenseFilterCat:`all categories`}</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${g(y)}/mo</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${b>0?g(b):`—`}</td>
                <td style="padding:11px 16px;font-weight:700">${b>0?`<span class="${x>=0?`var-under`:`var-over`}">${x>=0?`▼`:`▲`} ${g(Math.abs(x))}</span>`:`—`}</td>
                <td></td>
              </tr>
            </tfoot>`:``}
          </table>
        </div>`}
      </div>
    </div>
  `,p+=`</div></div>`,document.getElementById(`budget-content`).innerHTML=p}catch(e){console.error(`renderBudget error:`,e);let t=document.getElementById(`budget-content`);t&&(t.innerHTML=`<div style="padding:24px;color:var(--alert);font-family:var(--mono);font-size:13px">Render error: ${f(e.message)}<br><small>${f(e.stack||``)}</small></div>`)}}var B=!1;function bo(){B=!B;let e=document.getElementById(`budget-detail`),t=document.getElementById(`budget-expand-label`),n=document.getElementById(`budget-expand-chevron`),r=e&&e.parentElement;e&&(e.classList.toggle(`collapsed`,!B),e.classList.toggle(`expanded`,B)),r&&(r.style.marginBottom=B?`16px`:`0`),t&&(t.textContent=B?`Hide details ▲`:`See breakdown ▼`),n&&(n.textContent=B?`▲`:`▼`)}function V(e,t,n){document.getElementById(`modal-title`).textContent=e,document.getElementById(`modal-body`).innerHTML=t,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" id="modal-save-btn">Save</button>
  `,window._modalSaveHandler=n,document.getElementById(`modal-save-btn`).onclick=()=>window._modalSaveHandler?.(),document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function H(){_pendingLogEntry=null,window._actualEditorRefresh=null,window._csvSuggestions=null,window._csvSuggestNames=null,document.getElementById(`modal-body`).innerHTML=``,document.getElementById(`modal-footer`).innerHTML=``,document.getElementById(`modal-overlay`).classList.add(`hidden`)}document.getElementById(`modal-overlay`).addEventListener(`click`,e=>{e.target===document.getElementById(`modal-overlay`)&&H()});function xo(){V(`Edit Contract Total`,`
    <div class="form-group">
      <label class="form-label">Fixed Price Contract Total (AUD)</label>
      <input class="form-input" id="f-contract-total" type="number" max="99999999" value="${a.buildContract.total}" min="0">
    </div>
  `,()=>{let e=parseFloat(document.getElementById(`f-contract-total`).value);!isNaN(e)&&e>0&&(logActivity(`Updated contract total`,g(e)),a.buildContract.total=e,saveData(a),H(),renderAll())})}function So(e={}){return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Stage Name</label>
        <input class="form-input" id="f-stage-name" type="text" maxlength="200" value="${p(e.name||``)}" placeholder="e.g. Base / Slab">
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
        <input class="form-input" id="f-stage-ref" type="text" maxlength="200" value="${p(e.invoiceRef||``)}" placeholder="Optional">
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
  `}function Co(e){return{id:e,name:document.getElementById(`f-stage-name`).value.trim(),amount:parseFloat(document.getElementById(`f-stage-amount`).value)||0,paid:document.getElementById(`f-stage-paid`).checked,expectedDate:document.getElementById(`f-stage-expected`).value,paidDate:document.getElementById(`f-stage-paiddate`).value,invoiceRef:document.getElementById(`f-stage-ref`).value.trim(),funding:document.getElementById(`f-stage-funding`).value,notes:document.getElementById(`f-stage-notes`).value.trim()}}function wo(){V(`Add Contract Stage`,So(),()=>{let e=Co(D(a.buildContract.stages));e.name&&(logActivity(`Added build stage`,e.name),a.buildContract.stages.push(e),saveData(a),H(),renderAll())})}function To(e){let t=a.buildContract.stages.find(t=>t.id===e);V(`Edit Stage`,So(t),()=>{let n=Co(e);logActivity(`Edited build stage`,n.name||t.name),Object.assign(t,n),saveData(a),H(),renderAll()})}function Eo(e){if(!confirm(`Delete this stage?`))return;let t=a.buildContract.stages.find(t=>t.id===e);logActivity(`Deleted build stage`,t?t.name:``),a.buildContract.stages=a.buildContract.stages.filter(t=>t.id!==e),saveData(a),renderAll()}function Do(e={}){return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Variation Ref</label>
        <input class="form-input" id="f-var-ref" type="text" maxlength="200" value="${p(e.ref||``)}" placeholder="e.g. V001">
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
      <input class="form-input" id="f-var-name" type="text" maxlength="200" value="${p(e.name||``)}" placeholder="e.g. Tile upgrade — master bathroom">
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
      <input class="form-input" id="f-var-notes" type="text" maxlength="200" value="${p(e.notes||``)}" placeholder="Optional">
    </div>
  `}function Oo(e){return{id:e,ref:document.getElementById(`f-var-ref`).value.trim(),name:document.getElementById(`f-var-name`).value.trim(),amount:parseFloat(document.getElementById(`f-var-amount`).value)||0,status:document.getElementById(`f-var-status`).value,funding:document.getElementById(`f-var-funding`).value,dateRaised:document.getElementById(`f-var-raised`).value,dateApproved:document.getElementById(`f-var-approved`).value,notes:document.getElementById(`f-var-notes`).value.trim()}}function ko(){V(`Add Variation`,Do(),()=>{let e=Oo(D(a.buildContract.variations));e.name&&(logActivity(`Added variation`,`${e.ref?e.ref+` · `:``}${e.name}`),a.buildContract.variations.push(e),saveData(a),renderBuild())})}function Ao(e){V(`Edit Variation`,Do(a.buildContract.variations.find(t=>t.id===e)),()=>{let t=Oo(e);if(!t.name)return;logActivity(`Edited variation`,`${t.ref?t.ref+` · `:``}${t.name}`);let n=a.buildContract.variations.findIndex(t=>t.id===e);n!==-1&&(a.buildContract.variations[n]=t),saveData(a),renderBuild()})}function jo(e){if(!confirm(`Delete this variation?`))return;let t=a.buildContract.variations.find(t=>t.id===e);logActivity(`Deleted variation`,t?t.name:``),a.buildContract.variations=a.buildContract.variations.filter(t=>t.id!==e),saveData(a),renderBuild()}var Mo=[{value:`not-quoted`,label:`Not Quoted`},{value:`quoted`,label:`Quoted`},{value:`approved`,label:`Approved`},{value:`partial`,label:`Partially Paid`},{value:`paid`,label:`Paid`}];function No(e={}){let t=e.status||(e.totalAmount?`approved`:`not-quoted`);return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-extra-name" type="text" maxlength="200" value="${p(e.name||``)}" placeholder="e.g. Solar">
      </div>
      <div class="form-group">
        <label class="form-label">Vendor / Contractor</label>
        <input class="form-input" id="f-extra-vendor" type="text" maxlength="200" value="${p(e.vendor||``)}" placeholder="Company name">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-extra-status">
          ${Mo.map(e=>`<option value="${e.value}" ${t===e.value?`selected`:``}>${e.label}</option>`).join(``)}
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
        <input class="form-input" id="f-extra-notes" type="text" maxlength="200" value="${p(e.notes||``)}" placeholder="Optional">
      </div>
    </div>
  `}function Po(e){return{id:e,name:document.getElementById(`f-extra-name`).value.trim(),vendor:document.getElementById(`f-extra-vendor`).value.trim(),status:document.getElementById(`f-extra-status`).value,funding:document.getElementById(`f-extra-funding`).value,totalAmount:parseFloat(document.getElementById(`f-extra-total`).value)||0,amountPaid:parseFloat(document.getElementById(`f-extra-paid`).value)||0,dueDate:document.getElementById(`f-extra-due`).value,notes:document.getElementById(`f-extra-notes`).value.trim()}}function Fo(){V(`Add Outside Contract Item`,No(),()=>{let e=Po(D(a.extras));e.name&&(logActivity(`Added extra item`,e.name),a.extras.push(e),saveData(a),H(),renderAll())})}function Io(e){let t=a.extras.find(t=>t.id===e);V(`Edit Item`,No(t),()=>{let n=Po(e);logActivity(`Edited extra item`,n.name||t.name),Object.assign(t,n),saveData(a),H(),renderAll()})}function Lo(e){if(!confirm(`Delete this item?`))return;let t=a.extras.find(t=>t.id===e);logActivity(`Deleted extra item`,t?t.name:``),a.extras=a.extras.filter(t=>t.id!==e),saveData(a),renderAll()}function Ro(e={}){let t=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():``,n=[`weekly`,`fortnightly`,`monthly`,`quarterly`,`annually`,`custom`],r=e.frequency===`custom`;return`
    <div class="form-group">
      <label class="form-label">Source / Description</label>
      <input class="form-input" id="f-inc-name" type="text" maxlength="200" value="${p(e.name||``)}" placeholder="e.g. Salary — Chris">
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
  `}function zo(e){let t=document.getElementById(`f-inc-freq`)?document.getElementById(`f-inc-freq`).value:`monthly`,n=document.getElementById(`f-inc-recurring`),r={id:e,name:document.getElementById(`f-inc-name`).value.trim(),amount:parseFloat(document.getElementById(`f-inc-amount`).value)||0,frequency:t,dueDate:document.getElementById(`f-inc-duedate`).value||null,recurring:n?n.checked:!0};return t===`custom`&&(r.customEvery=parseInt(document.getElementById(`f-inc-custom-n`).value)||1,r.customUnit=document.getElementById(`f-inc-custom-unit`).value),r}function Bo(){V(`Add Income`,Ro(),()=>{let e=zo(D(getMonthData(selectedBudgetMonth).income));e.name&&(logActivity(`Added income`,e.name),confirmScope(()=>{let t=ensureMonthOverride(selectedBudgetMonth);e.id=D(t.income),t.income.push(e),saveData(a),renderAll()},()=>{e.id=D(a.budget.income),a.budget.income.push(e),saveData(a),renderAll()}))})}function Vo(e){let t=getMonthData(selectedBudgetMonth).income.find(t=>t.id===e);V(`Edit Income`,Ro(t),()=>{let n=zo(e);logActivity(`Edited income`,n.name||t&&t.name||``),confirmScope(()=>{let t=ensureMonthOverride(selectedBudgetMonth),r=t.income.find(t=>t.id===e);r?Object.assign(r,n):t.income.push(n),saveData(a),renderAll()},()=>{let t=a.budget.income.find(t=>t.id===e);t&&Object.assign(t,n),saveData(a),renderAll()})})}function Ho(e){let t=getMonthData(selectedBudgetMonth).income.find(t=>t.id===e),n=t?t.name:`this income`;logActivity(`Deleted income`,n),_scopePending=null,document.getElementById(`modal-title`).textContent=`Delete income`,document.getElementById(`modal-body`).innerHTML=`
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Delete <strong style="color:var(--text)">${n}</strong>? Apply to
      <strong style="color:var(--text)">${monthLabel(selectedBudgetMonth)}</strong> only,
      or remove from all months?
    </p>`,_scopePending={onThisMonth:()=>{let t=ensureMonthOverride(selectedBudgetMonth);t.income=t.income.filter(t=>t.id!==e),saveData(a),renderAll()},onAllMonths:()=>{a.budget.income=a.budget.income.filter(t=>t.id!==e),a.budget.months&&Object.values(a.budget.months).forEach(t=>{t.income=t.income.filter(t=>t.id!==e)}),saveData(a),renderAll()}},document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="doScopeAll()">Remove from all months</button>
    <button class="btn btn-danger" onclick="doScopeMonth()">Delete from ${monthLabel(selectedBudgetMonth)}</button>
  `,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Uo(e={}){let t=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():``,n=[`weekly`,`fortnightly`,`monthly`,`quarterly`,`annually`,`custom`],r=e.frequency===`custom`;return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Description</label>
        <input class="form-input" id="f-exp-name" type="text" maxlength="200" value="${p(e.name||``)}" placeholder="e.g. Mortgage">
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
      <input class="form-input" id="f-exp-vendor" type="text" maxlength="200" value="${p(e.vendor||``)}" placeholder="e.g. ANZ, Woolworths, Netflix">
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
  `}function Wo(e){let t=document.getElementById(`f-exp-freq`)?document.getElementById(`f-exp-freq`).value:`monthly`,n=document.getElementById(`f-exp-recurring`),r={id:e,name:document.getElementById(`f-exp-name`).value.trim(),category:document.getElementById(`f-exp-cat`).value,vendor:(document.getElementById(`f-exp-vendor`)?.value||``).trim()||null,amount:parseFloat(document.getElementById(`f-exp-amount`).value)||0,frequency:t,dueDate:document.getElementById(`f-exp-duedate`).value||null,recurring:n?n.checked:!0};return t===`custom`&&(r.customEvery=parseInt(document.getElementById(`f-exp-custom-n`).value)||1,r.customUnit=document.getElementById(`f-exp-custom-unit`).value),r}function Go(e){let t=document.getElementById(`f-${e}-freq`).value,n=document.getElementById(`f-${e}-custom-wrap`);n&&(n.style.display=t===`custom`?`flex`:`none`)}function Ko(){V(`Add Expense`,Uo(),()=>{let e=Wo(D(getMonthData(selectedBudgetMonth).expenses));e.name&&(logActivity(`Added expense`,`${e.name} (${e.category||`Other`})`),confirmScope(()=>{let t=ensureMonthOverride(selectedBudgetMonth);e.id=D(t.expenses),t.expenses.push(e),saveData(a),renderAll()},()=>{if(e.id=D(a.budget.expenses),a.budget.expenses.push(e),isMonthCustomized(selectedBudgetMonth)){let t=a.budget.months[selectedBudgetMonth];t.expenses.push({...e,id:D(t.expenses)})}saveData(a),renderAll()}))})}function qo(e){let t=getMonthData(selectedBudgetMonth).expenses.find(t=>t.id===e);V(`Edit Expense`,Uo(t),()=>{let n=Wo(e);logActivity(`Edited expense`,`${n.name||t&&t.name||``} (${n.category||`Other`})`),confirmScope(()=>{let t=ensureMonthOverride(selectedBudgetMonth),r=t.expenses.find(t=>t.id===e);r?Object.assign(r,n):t.expenses.push(n),saveData(a),renderAll()},()=>{let t=a.budget.expenses.find(t=>t.id===e);if(t&&Object.assign(t,n),isMonthCustomized(selectedBudgetMonth)){let t=a.budget.months[selectedBudgetMonth].expenses.find(t=>t.id===e);t&&Object.assign(t,n)}saveData(a),renderAll()})});let n=document.createElement(`button`);n.className=`btn btn-danger`,n.textContent=`Delete`,n.style.marginRight=`auto`,n.onclick=()=>{H(),Jo(e)};let r=document.getElementById(`modal-footer`);r.insertBefore(n,r.firstChild)}function Jo(e){let t=getMonthData(selectedBudgetMonth).expenses.find(t=>t.id===e),n=t?t.name:`this expense`;logActivity(`Deleted expense`,n),_scopePending={onThisMonth:()=>{let t=ensureMonthOverride(selectedBudgetMonth);t.expenses=t.expenses.filter(t=>t.id!==e),saveData(a),renderAll()},onAllMonths:()=>{a.budget.expenses=a.budget.expenses.filter(t=>t.id!==e),a.budget.months&&Object.values(a.budget.months).forEach(t=>{t.expenses=t.expenses.filter(t=>t.id!==e)}),saveData(a),renderAll()}},document.getElementById(`modal-title`).textContent=`Delete expense`,document.getElementById(`modal-body`).innerHTML=`
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Delete <strong style="color:var(--text)">${n}</strong>? Apply to
      <strong style="color:var(--text)">${monthLabel(selectedBudgetMonth)}</strong> only,
      or remove from all months?
    </p>`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="doScopeAll()">Remove from all months</button>
    <button class="btn btn-danger" onclick="doScopeMonth()">Delete from ${monthLabel(selectedBudgetMonth)}</button>
  `,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Yo(){return document.getElementById(`f-exp-duedate`)||document.getElementById(`f-inc-duedate`)}function Xo(e){e.stopPropagation();let t=document.getElementById(`dp-popup`);if(!t)return;let n=(Yo()||{}).value||``;if(n)[dpViewYear,dpViewMonth]=n.split(`-`).map(Number);else{let e=new Date;dpViewYear=e.getFullYear(),dpViewMonth=e.getMonth()+1}t.classList.remove(`hidden`),Zo();function r(e){let n=document.getElementById(`dp-wrap`);n&&!n.contains(e.target)?t.classList.add(`hidden`):document.addEventListener(`click`,r,{once:!0})}document.addEventListener(`click`,r,{once:!0})}function Zo(){let e=document.getElementById(`dp-popup`);if(!e)return;let t=dpViewYear,n=dpViewMonth,r=new Date(t,n-1,1).getDay(),i=new Date(t,n,0).getDate(),a=new Date,o=(Yo()||{}).value||``,s=`
    <div class="dp-nav">
      <button class="dp-nav-btn" onclick="dpPrevMonth(event)">&#8249;</button>
      <span class="dp-month-label">${new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</span>
      <button class="dp-nav-btn" onclick="dpNextMonth(event)">&#8250;</button>
    </div>
    <div class="dp-grid">
      ${[`S`,`M`,`T`,`W`,`T`,`F`,`S`].map(e=>`<div class="dp-day-hdr">${e}</div>`).join(``)}
  `;for(let e=0;e<r;e++)s+=`<div class="dp-day dp-other"></div>`;for(let e=1;e<=i;e++){let r=`${t}-${String(n).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,i=[`dp-day`,a.getFullYear()===t&&a.getMonth()+1===n&&a.getDate()===e?`dp-today`:``,o===r?`dp-selected`:``].filter(Boolean).join(` `);s+=`<div class="${i}" onclick="dpSelectDate('${r}',event)">${e}</div>`}s+=`</div>`,o&&(s+=`<div class="dp-clear"><button class="dp-clear-btn" onclick="dpClearDate(event)">Clear date</button></div>`),e.innerHTML=s}function Qo(e){e.stopPropagation(),dpViewMonth===1?(dpViewMonth=12,dpViewYear--):dpViewMonth--,Zo()}function $o(e){e.stopPropagation(),dpViewMonth===12?(dpViewMonth=1,dpViewYear++):dpViewMonth++,Zo()}function es(e,t){t&&t.stopPropagation();let n=Yo();n&&(n.value=e);let[r,i,a]=e.split(`-`);document.getElementById(`dp-display`).textContent=`${a}/${i}/${r}`,document.getElementById(`dp-trigger`).classList.add(`has-value`),document.getElementById(`dp-popup`).classList.add(`hidden`);let o=document.getElementById(`dp-repeats-wrap`);o&&(o.style.display=``)}function ts(e){e.stopPropagation();let t=Yo();t&&(t.value=``),document.getElementById(`dp-display`).textContent=`Select a date`,document.getElementById(`dp-trigger`).classList.remove(`has-value`),document.getElementById(`dp-popup`).classList.add(`hidden`);let n=document.getElementById(`dp-repeats-wrap`);n&&(n.style.display=`none`)}var U=[],W=[];function ns(){document.getElementById(`modal-title`).textContent=`Import Bank Transactions`,document.getElementById(`modal-body`).innerHTML=`
    <div style="padding:4px 0">
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">
        Upload a CSV exported from your bank. Works with ANZ, CBA, Westpac, NAB and most Australian banks.
        Transactions will be matched to your <strong>${monthLabel(selectedBudgetMonth)}</strong> budget categories.
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
    </div>`,document.getElementById(`modal-footer`).innerHTML=`<button class="btn" onclick="closeModal()">Cancel</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function rs(e){function t(e){let t=[],n=``,r=!1;for(let i of e)i===`"`?r=!r:i===`,`&&!r?(t.push(n.trim()),n=``):n+=i;return t.push(n.trim()),t.map(e=>e.replace(/^"|"$/g,``).trim())}let n=e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>2);if(n.length<2)return null;let r=0;for(let e=0;e<Math.min(6,n.length);e++)if(/date/i.test(n[e])){r=e;break}let i=t(n[r]).map(e=>e.toLowerCase()),a=i.findIndex(e=>/date/.test(e)),o=i.findIndex(e=>/desc|detail|narrat|payee|merchant|particular/.test(e)),s=i.findIndex(e=>/^amount$|^amt$/.test(e)),c=i.findIndex(e=>/^debit$|withdrawal|^debit amount/.test(e)),l=i.findIndex(e=>/^category$/.test(e)),u=i.findIndex(e=>/^subcategory$/.test(e));if(a===-1||o===-1&&s===-1&&c===-1)return null;let d=[];for(let e=r+1;e<n.length;e++){let r=t(n[e]);if(r.length<2)continue;let i=(r[a]||``).trim(),f=o===-1?``:(r[o]||``).trim();if(!f)continue;let p=f.replace(/^(Visa Purchase|Eftpos Debit|Osko Deposit|Internet Deposit|Debit Interest|Direct Debit|Direct Credit)\s+/i,``).replace(/^\d{2}[A-Za-z]{3}[\d:]*\s+/,``).replace(/\s{2,}/g,` `).trim()||f,m=0;if(c!==-1){let e=parseFloat((r[c]||``).replace(/[^0-9.]/g,``));!isNaN(e)&&e>0&&(m=e)}else if(s!==-1){let e=parseFloat((r[s]||``).replace(/[^0-9.-]/g,``));!isNaN(e)&&e<0&&(m=Math.abs(e))}let h=[l===-1?``:(r[l]||``).trim(),u===-1?``:(r[u]||``).trim()].filter(Boolean).join(` > `)||``;m>0&&d.push({date:i,description:p,amount:m,bankCat:h})}return d.length?d:null}async function is(e){let t=e.target.files[0];if(!t)return;let n=rs(await t.text()),r=document.getElementById(`csv-parse-status`);if(!n){r&&(r.textContent=`Couldn't detect transactions. Check it's a bank CSV with a header row containing 'Date'.`,r.style.display=``);return}U=n,as()}function as(){let e=!!_secureGet(`toto_ai_key`),t=U.slice(0,5);document.getElementById(`modal-body`).innerHTML=`
    <div>
      <div style="background:var(--success-light);border:1px solid #6ee7b7;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:13px;color:#155e75">
        Found <strong>${U.length} expense transactions</strong> in your CSV
      </div>
      <div class="table-wrap" style="margin-bottom:16px">
        <table>
          <thead><tr><th>Date</th><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
          <tbody>
            ${t.map(e=>`<tr>
              <td style="color:var(--text-muted);font-size:12px;white-space:nowrap">${e.date}</td>
              <td style="font-weight:500">${f(e.description)}</td>
              <td class="amount">${_(e.amount)}</td>
            </tr>`).join(``)}
            ${U.length>5?`<tr><td colspan="3" style="text-align:center;color:var(--text-muted);font-size:12px;padding:8px">+ ${U.length-5} more rows…</td></tr>`:``}
          </tbody>
        </table>
      </div>
      ${e?``:`<div style="background:var(--warning-light);border:1px solid #fde68a;border-radius:8px;padding:10px 14px;font-size:13px;color:#92400e">
        ⚠ No API key — go to Settings › AI Assistant to enable auto-categorisation.
      </div>`}
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn" onclick="closeModal()">Cancel</button>
    ${e?`<button class="btn btn-primary" onclick="runCsvCategorise()">Categorise with AI →</button>`:`<button class="btn btn-primary" onclick="_renderCsvReview(null)">Assign Manually →</button>`}`}async function os(){let e=_secureGet(`toto_ai_key`);if(!e){ss(null);return}document.getElementById(`modal-body`).innerHTML=`
    <div style="text-align:center;padding:48px 16px">
      <div style="font-size:32px;margin-bottom:12px">🤖</div>
      <div style="font-weight:600;margin-bottom:6px">Categorising ${U.length} transactions…</div>
      <div style="font-size:12px;color:var(--text-muted)">Matching to your ${monthLabel(selectedBudgetMonth)} budget categories</div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=``;let t=getMonthData(selectedBudgetMonth).expenses.map(e=>`${e.id}: ${e.name}${e.category?` (`+e.category+`)`:``}`).join(`
`),n=U.some(e=>e.bankCat),r,i;if(window._csvSuggestions={},n){let e={};U.forEach((t,n)=>{let r=t.bankCat||`Other`;e[r]||(e[r]={bankCat:r,indices:[],sample:t.description}),e[r].indices.push(n)});let t=Object.values(e);r=t.map((e,t)=>({idx:t,bankCategory:e.bankCat,sample:e.sample})),i=e=>{let n={};return e.forEach(e=>{let r=t[e.idx];r&&r.indices.forEach(t=>{n[t]=e.expenseId,e.suggest&&(_csvSuggestions[t]=e.suggest)})}),n}}else{let e={};U.forEach((t,n)=>{let r=t.description.toUpperCase().replace(/\s+/g,` `).trim();e[r]||(e[r]={desc:t.description,indices:[]}),e[r].indices.push(n)});let t=Object.values(e);r=t.map((e,t)=>({idx:t,description:e.desc})),i=e=>{let n={};return e.forEach(e=>{let r=t[e.idx];r&&r.indices.forEach(t=>{n[t]=e.expenseId,e.suggest&&(_csvSuggestions[t]=e.suggest)})}),n}}let a=n?`bank categories`:`unique transaction descriptions`,o=`You are categorising Australian bank transactions for a family budget app.

The user's EXISTING budget expense categories (id: name):
${t||`(none yet)`}

Here are ${r.length} ${a} from their bank statement (${U.length} total transactions):
${JSON.stringify(r)}

For EACH item:
- If it matches an existing expense, use that expenseId
- If no existing expense fits, use expenseId -1 AND include a "suggest" field with a short category name to create (e.g. "Groceries", "Dining Out", "Transport", "Parking")
- For bank transfers, deposits, ATM withdrawals, fees → use expenseId -1 with NO suggest (genuinely skip these)

IMPORTANT: Return ONLY raw JSON array, no markdown, no code fences:
[{"idx":0,"expenseId":3},{"idx":1,"expenseId":-1,"suggest":"Dining Out"},{"idx":2,"expenseId":-1}]`;try{let t=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":e,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:4096,messages:[{role:`user`,content:o}]})});if(!t.ok)throw Error(`API error ${t.status}`);let n=(await t.json()).content[0].text.replace(/```[\w]*\n?/g,``).trim().match(/\[[\s\S]*\]/);if(!n)throw Error(`No JSON in response`);let r=JSON.parse(n[0]);ss(i(r))}catch(e){document.getElementById(`modal-body`).innerHTML=`
      <div style="padding:8px">
        <div style="color:var(--danger);margin-bottom:10px">⚠ ${e.message}</div>
        <p style="font-size:13px;color:var(--text-muted)">You can still assign categories manually below.</p>
      </div>`,document.getElementById(`modal-footer`).innerHTML=`
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="_renderCsvReview(null)" style="margin-left:8px">Assign Manually →</button>`}}function ss(e){let t=getMonthData(selectedBudgetMonth).expenses,n=U.some(e=>e.bankCat),r=U.map((t,n)=>({...t,idx:n,expenseId:e?e[n]??-1:-1})),i={};r.forEach(e=>{let t=n?e.bankCat||`Other`:String(e.expenseId);i[t]||(i[t]={key:t,txns:[],total:0}),i[t].txns.push(e),i[t].total+=e.amount});let a={},o=-100,s=window._csvSuggestions||{};W=Object.values(i).map((t,r)=>{let i=-1,c=``;if(e){let e={};t.txns.forEach(t=>{let n=t.expenseId;n!=null&&n!==-1&&(e[n]=(e[n]||0)+1)});let n=Object.entries(e).sort((e,t)=>t[1]-e[1])[0];if(n&&(i=parseInt(n[0])),i===-1){let e={};t.txns.forEach(t=>{let n=s[t.idx];n&&(e[n]=(e[n]||0)+1)});let n=Object.entries(e).sort((e,t)=>t[1]-e[1])[0];n&&(c=n[0],a[c]||(a[c]=o--),i=a[c])}}return{gIdx:r,expenseId:i,suggest:c,total:Math.round(t.total*100)/100,count:t.txns.length,txns:t.txns,descs:[...new Set(t.txns.map(e=>e.description))].slice(0,4),label:n?t.key:null,checked:i!==-1}}).sort((e,t)=>t.total-e.total),window._csvSuggestNames={},Object.entries(a).forEach(([e,t])=>{window._csvSuggestNames[t]=e});function c(e,n){let r=`<option value="-1"${e===-1?` selected`:``}>— Skip —</option>`;return Object.entries(a).forEach(([t,n])=>{r+=`<option value="${n}"${e===n?` selected`:``}>➕ Create: ${f(t)}</option>`}),r+=t.map(t=>`<option value="${t.id}"${t.id===e?` selected`:``}>${f(t.name)}</option>`).join(``),r}let l=W.map((e,t)=>{let n=e.descs.join(`, `)+(e.count>e.descs.length?` +${e.count-e.descs.length} more`:``),r=e.label?`<div style="font-size:11px;font-weight:600;color:var(--primary);margin-bottom:2px">${f(e.label)}</div>`:``;return`<tr>
      <td style="width:36px;padding:6px 8px"><input type="checkbox" id="csv-chk-${t}" ${e.checked?`checked`:``} onchange="_csvToggle(${t},this.checked)"></td>
      <td>${r}<select style="font-size:12px;border:1px solid var(--border);border-radius:6px;padding:3px 6px;background:var(--surface);max-width:160px"
          onchange="_csvSetExpense(${t},+this.value)">${c(e.expenseId)}</select></td>
      <td style="font-size:12px;text-align:center;font-weight:600">${e.count}</td>
      <td style="font-size:11px;color:var(--text-muted);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escAttr(n)}">${f(n)}</td>
      <td class="amount" style="white-space:nowrap;font-weight:600">${_(e.total)}</td>
    </tr>`}).join(``),u=e?`<div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">🤖 Transactions grouped by category — review and adjust as needed.</div>`:``,d=W.filter(e=>e.checked&&e.expenseId!==-1).length,p=W.filter(e=>e.checked&&e.expenseId!==-1).reduce((e,t)=>e+t.count,0);document.getElementById(`modal-body`).innerHTML=`
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
    </div>`;let m=W.filter(e=>e.checked&&e.expenseId===-1).length;document.getElementById(`modal-footer`).innerHTML=`
    <div style="display:flex;flex-direction:column;gap:6px;width:100%">
      <div id="csv-pending-note" style="font-size:12px;color:var(--warning);text-align:right">${m>0?`${m} checked group${m===1?``:`s`} still need a category assigned`:``}</div>
      <div style="display:flex;justify-content:flex-end;gap:10px">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="csv-apply-btn" onclick="applyCsvImport()"${d===0?` disabled`:``}>
          Apply ${d} group${d===1?``:`s`} (${p} txns)
        </button>
      </div>
    </div>`}function cs(e,t){W[e].checked=t,ds()}function ls(e){W.forEach((t,n)=>{t.checked=e;let r=document.getElementById(`csv-chk-${n}`);r&&(r.checked=e)}),ds()}function us(e,t){W[e].expenseId=t,W[e].checked=!0;let n=document.getElementById(`csv-chk-${e}`);n&&(n.checked=!0),ds()}function ds(){let e=W.filter(e=>e.checked&&e.expenseId!==-1),t=W.filter(e=>e.checked&&e.expenseId===-1),n=e.length,r=e.reduce((e,t)=>e+t.count,0),i=document.getElementById(`csv-apply-btn`);i&&(i.textContent=`Apply ${n} group${n===1?``:`s`} (${r} txns)`,i.disabled=n===0);let a=document.getElementById(`csv-pending-note`);a&&(a.textContent=t.length>0?`${t.length} checked group${t.length===1?``:`s`} still need a category assigned`:``)}function fs(){let e=W.filter(e=>e.checked&&e.expenseId!==-1);if(!e.length){closeModal();return}a.budget.actuals[selectedBudgetMonth]||(a.budget.actuals[selectedBudgetMonth]={});let t=window._csvSuggestNames||{},n={};e.forEach(e=>{let r=e.expenseId;if(r<-1&&t[r]){if(!n[r]){let e={id:nextId(a.budget.expenses),name:t[r],amount:0,frequency:`monthly`,category:t[r],dueDate:``,vendor:null};if(a.budget.expenses.push(e),isMonthCustomized(selectedBudgetMonth)){let t=a.budget.months[selectedBudgetMonth];t.expenses.push({...e,id:nextId(t.expenses)}),n[r]=t.expenses[t.expenses.length-1].id}else n[r]=e.id}r=n[r]}let i=getActualEntries(r,selectedBudgetMonth),o=i.length?Math.max(...i.map(e=>e.id))+1:1,s=e.descs.join(`, `)+(e.count>e.descs.length?` +${e.count-e.descs.length} more`:``);i.push({id:o,amount:e.total,date:e.txns[0].date,note:`${e.count} transactions: ${s}`}),a.budget.actuals[selectedBudgetMonth][r]=i}),saveData(a),closeModal(),renderAll()}function ps(){hs(),document.getElementById(`qa-overlay`).classList.add(`open`),requestAnimationFrame(()=>document.getElementById(`qa-sheet`).classList.add(`open`))}function ms(){document.getElementById(`qa-sheet`).classList.remove(`open`),document.getElementById(`qa-overlay`).classList.remove(`open`)}function hs(){document.getElementById(`qa-sheet`).innerHTML=`
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
    <div style="height:max(12px,env(safe-area-inset-bottom))"></div>`,requestAnimationFrame(()=>document.getElementById(`qah-text`)?.focus())}function gs(e){ms(),setTimeout(()=>{if(e===`event`)activateTab(`planner`),setTimeout(()=>openPlannerModal(null,new Date().toISOString().slice(0,10)),300);else if(e===`expense`){let e=getMonthData(selectedBudgetMonth).expenses,t=parseInt(_secureGet(`toto_qa_last`)||`0`);_qaExpenseId=e.find(e=>e.id===t)?.id??e[0]?.id??null,_qaAmount=``,ys(e),document.getElementById(`qa-overlay`).classList.add(`open`),requestAnimationFrame(()=>document.getElementById(`qa-sheet`).classList.add(`open`))}else e===`income`?(activateTab(`budget`),setTimeout(()=>openAddIncome(),300)):e===`bill`?(activateTab(`bills`),setTimeout(()=>openBillModal(),300)):e===`chore`?(activateTab(`kids`),setTimeout(()=>{typeof renderChoreMgmt==`function`&&renderChoreMgmt()},300)):e===`shopping`?(window._listsActiveType=`food`,window._listsView=`list`,activateTab(`lists`)):e===`ai`&&typeof toggleTotoAssistant==`function`&&toggleTotoAssistant()},320)}async function _s(){let e=document.getElementById(`qah-text`)?.value.trim();if(!e){gs(`ai`);return}let t=document.querySelector(`.qah-ai-send`);t&&(t.textContent=`…`,t.disabled=!0);let n=`Today is ${new Date().toISOString().slice(0,10)}. The user typed: "${e}"

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
- If genuinely unclear → unknown`;try{let t=a.settings?.claudeApiKey,r=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:150,messages:[{role:`user`,content:n}]})})).json()).content?.[0]?.text?.trim()||`{"type":"unknown"}`,i=JSON.parse(r.replace(/```[\w]*\n?/g,``).trim());ms(),await vs(i,e)}catch{ms(),setTimeout(()=>{typeof toggleTotoAssistant==`function`&&toggleTotoAssistant(),setTimeout(()=>{let t=document.getElementById(`toto-input`)||document.querySelector(`.toto-msg-input`);t&&(t.value=e,t.focus())},400)},320)}}async function vs(e,t){let n=e=>new Promise(t=>setTimeout(t,e));if(e.type===`event`){activateTab(`planner`),await n(320),openPlannerModal(null,e.date||new Date().toISOString().slice(0,10)),await n(200);let r=document.getElementById(`pe-title`),i=document.getElementById(`pe-time`);if(r&&(r.value=e.title||t),i&&e.time&&(i.value=e.time),e.date){let t=document.getElementById(`pe-date`),n=document.getElementById(`pm-start-display`);t&&(t.value=e.date),n&&typeof _pmFmtDateShort==`function`&&(n.textContent=_pmFmtDateShort(e.date))}}else if(e.type===`expense`){let t=getMonthData(selectedBudgetMonth).expenses,n=parseInt(_secureGet(`toto_qa_last`)||`0`);_qaExpenseId=t.find(e=>e.id===n)?.id??t[0]?.id??null,_qaAmount=e.amount?String(e.amount):``,ys(t),document.getElementById(`qa-overlay`).classList.add(`open`),requestAnimationFrame(()=>{document.getElementById(`qa-sheet`).classList.add(`open`);let t=document.getElementById(`qa-note`);t&&e.note&&(t.value=e.note)})}else if(e.type===`income`){activateTab(`budget`),await n(320),openAddIncome(),await n(200);let t=document.getElementById(`inc-name`)||document.querySelector(`#modal-body [id*="name"]`),r=document.getElementById(`inc-amount`)||document.querySelector(`#modal-body [id*="amount"]`);t&&e.name&&(t.value=e.name),r&&e.amount&&(r.value=e.amount)}else if(e.type===`bill`){activateTab(`bills`),await n(320),openBillModal(),await n(200);let t=document.getElementById(`bill-name`),r=document.getElementById(`bill-amount`),i=document.getElementById(`bill-due`);t&&e.name&&(t.value=e.name),r&&e.amount&&(r.value=e.amount),i&&e.dueDate&&(i.value=e.dueDate)}else if(e.type===`chore`)activateTab(`kids`),await n(320);else if(e.type===`shopping`){window._listsActiveType=`food`,window._listsView=`list`,activateTab(`lists`),await n(320);let t=document.getElementById(`ls-quick-input`);t&&e.name&&(t.value=e.name,t.focus())}else{typeof toggleTotoAssistant==`function`&&toggleTotoAssistant(),await n(400);let e=document.getElementById(`toto-input`)||document.querySelector(`.toto-msg-input`);e&&(e.value=t,e.focus())}}function ys(e){let t=e||getMonthData(selectedBudgetMonth).expenses,n=_qaAmount?`$${_qaAmount}`:`$0`,r=!_qaAmount,i=t.length?t.map(e=>`<button class="qa-cat${e.id===_qaExpenseId?` selected`:``}" onclick="_qaSelectCat(${e.id})">${f(e.name)}</button>`).join(``):`<span style="color:var(--text-muted);font-size:13px;padding:6px 4px">Add budget expenses first</span>`,a=[`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`.`,`0`,`⌫`];document.getElementById(`qa-sheet`).innerHTML=`
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
    </div>`}function bs(e){if(e===`⌫`)_qaAmount=_qaAmount.slice(0,-1);else if(e===`.`)_qaAmount.includes(`.`)||(_qaAmount+=(_qaAmount?``:`0`)+`.`);else{let t=_qaAmount.split(`.`);if(t[1]!==void 0&&t[1].length>=2||_qaAmount.replace(`.`,``).length>=6)return;_qaAmount===`0`&&e!==`.`?_qaAmount=e:_qaAmount+=e}let t=document.getElementById(`qa-display`);if(!t)return;let n=!_qaAmount;t.textContent=_qaAmount?`$${_qaAmount}`:`$0`,t.className=`qa-amount-display${n?` zero`:``}`}function xs(e){_qaExpenseId=e,document.querySelectorAll(`.qa-cat`).forEach(t=>{t.classList.toggle(`selected`,parseInt(t.getAttribute(`onclick`).match(/\d+/)[0])===e)})}function Ss(){let e=parseFloat(_qaAmount);if(!e||e<=0){let e=document.getElementById(`qa-display`);e&&(e.style.color=`var(--danger)`,setTimeout(()=>e.style.color=``,600));return}if(!_qaExpenseId){let e=document.getElementById(`qa-cats`);e&&(e.style.outline=`2px solid var(--danger)`,e.style.borderRadius=`8px`,setTimeout(()=>{e.style.outline=``},600));return}let t=document.getElementById(`qa-note`)?.value.trim()||``,n=new Date().toISOString().slice(0,10);a.budget.actuals[selectedBudgetMonth]||(a.budget.actuals[selectedBudgetMonth]={});let r=getActualEntries(_qaExpenseId,selectedBudgetMonth),i=r.length?Math.max(...r.map(e=>e.id))+1:1;r.push({id:i,amount:e,date:n,note:t}),a.budget.actuals[selectedBudgetMonth][_qaExpenseId]=r,_secureSet(`toto_qa_last`,String(_qaExpenseId)),saveData(a),ms(),renderAll();let o=document.getElementById(`qa-fab`);o&&(o.textContent=`✓`,o.style.background=`#10b981`,setTimeout(()=>{o.textContent=`+`,o.style.background=``},1800))}window.addEventListener(`resize`,()=>{document.querySelectorAll(`.section-pills-wrap`).forEach(_updatePillsOverflow)}),document.querySelectorAll(`.nav-item, .nav-text-item`).forEach(e=>{e.addEventListener(`click`,()=>activateTab(e.dataset.tab))});function Cs(){let e=_activeProfile?.role===`child`;document.body.classList.toggle(`kid-mode`,e);let t=document.getElementById(`kid-banner-label`);t&&e&&(t.textContent=`${_activeProfile.emoji||`😊`} ${_activeProfile.name}'s view`);let n=getDeviceProfile(),r=document.getElementById(`header-switch-profile`);if(r){let t=n&&n!==`adult`;if(r.style.display=t?``:`none`,t)if(e)r.textContent=`👨‍👩‍👧 Parent`;else{let e=(a.kids?.profiles||[]).find(e=>e.id===n);r.textContent=e?`Back to ${e.name}`:`Switch`}}}function ws(e){let t=Number(e.age||0);return t<5?`tiny-tots`:t<8?`early-reader`:t<12?`independent`:`tween`}function Ts(){let e=new Date().getHours();return e<12?`Good morning`:e<17?`Good afternoon`:`Good evening`}function Es(e){if(!e.triggerTime)return!0;let[t,n]=e.triggerTime.split(`:`).map(Number),r=new Date,i=r.getHours()*60+r.getMinutes(),a=t*60+(n||0),o=a+360;return i>=a&&i<o}function Ds(e){if(!e.triggerTime)return``;let[t]=e.triggerTime.split(`:`).map(Number);return t<12?`Available this morning`:t<17?`Available this afternoon`:`Available tonight`}function Os(){let e=document.getElementById(`child-view-overlay`);if(!e)return;let t=document.getElementById(`cv-confetti-wrap`);t&&t.remove(),t=document.createElement(`div`),t.id=`cv-confetti-wrap`,t.className=`cv2-confetti-wrap`,e.appendChild(t);let n=[`#5B4CF5`,`#7C3AED`,`#F59E0B`,`#10B981`,`#F43F5E`,`#FBBF24`];for(let e=0;e<60;e++){let r=document.createElement(`div`);r.className=`cv2-confetti-particle`,r.style.cssText=`
      left:${Math.random()*100}%;
      background:${n[e%n.length]};
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*8}px;
      animation-duration:${1.4+Math.random()*1.4}s;
      animation-delay:${Math.random()*.6}s;
    `,t.appendChild(r)}setTimeout(()=>{t.parentNode&&t.remove()},3500)}function ks(e){let t=(a.kids?.profiles||[]).find(t=>String(t.id)===String(e));if(!t)return;Ms=e,Ns=`today`;let n=a.kids,r=kidBalance(n,t.id),i=ws(t),o=i===`tiny-tots`,s=i===`tween`,c=_cvReadOnly,l=document.getElementById(`child-view-overlay`);document.getElementById(`cv-avatar`).textContent=t.emoji||`😊`,document.getElementById(`cv-name`).innerHTML=`<span class="ember-text">${f(t.name)}</span>`,document.getElementById(`cv-greeting`).textContent=Ts()+`!`;let u=(n.completions||[]).filter(e=>e.kidId===t.id&&e.status===`approved`&&new Date(e.completedAt||e.ts).toDateString()===new Date().toDateString()).reduce((e,t)=>e+((n.chores||[]).find(e=>e.id===t.choreId)?.points||0),0),d=document.getElementById(`cv-nudge`);u>0&&!o&&!c?(d.textContent=`You've earned ⭐ ${u} points today — keep going!`,d.style.display=``):d.style.display=`none`,l.className=l.className.replace(/cv2-age-\S+/g,``).trim(),i===`early-reader`&&l.classList.add(`cv2-age-early`),o&&l.classList.add(`cv2-age-tiny`),s&&l.classList.add(`cv2-age-tween`);let p=document.getElementById(`cv-nav`);p&&(p.style.display=o?`none`:``),document.getElementById(`cv-nav-today`)?.classList.add(`active`),document.getElementById(`cv-nav-calendar`)?.classList.remove(`active`),document.getElementById(`cv-nav-prizes`)?.classList.remove(`active`),As(t);let m=new Date().toISOString().slice(0,10),h=(a.routineAssignments||[]).filter(e=>{if(e.childId!==t.id)return!1;let n=(a.routines||[]).find(t=>t.id===e.routineId);return n&&_routineMatchesDate(n,m)}),g=_routineTodayKey(),_=``,v=0,y=0;h.length&&h.forEach(e=>{let n=(a.routines||[]).find(t=>t.id===e.routineId);if(!n)return;let r=e.completionState?.[g]||[],i=n.steps.length,s=i>0?Math.round(r.length/i*100):0,l=r.length===i&&i>0,u=Es(n);y+=i,v+=r.length;let d=u?``:Ds(n),p=_assignmentStreak(e,i),m=_assignmentHistory(e,i,7).filter(e=>e.done===e.total&&e.total>0).length;if(_+=`<div class="cv2-card${u?``:` cv2-card--locked`}" style="margin-bottom:10px">
        <div class="cv2-routine-header">
          <div class="cv2-routine-title">
            <span>${n.emoji}</span>
            <span class="cv2-routine-name">${f(n.name)}</span>
            ${p>0&&!o?`<span style="font-size:11px;font-weight:700;color:#f59e0b;background:#fffbeb;border-radius:99px;padding:2px 8px">🔥 ${p}d</span>`:``}
          </div>
          ${u?`<span class="cv2-routine-frac">${r.length}/${i}${n.pointsPerCompletion>0?` · ⭐${n.pointsPerCompletion}`:``}</span>`:`<span class="cv2-routine-lock">🔒 ${f(d)}</span>`}
        </div>
        <div class="cv2-progress"><div class="cv2-progress-fill" style="width:${s}%"></div></div>
        ${m>0&&!o?`<div style="padding:4px 16px 0;font-size:11px;color:#94a3b8">Completed ${m} of the last 7 days</div>`:``}
        <div class="cv2-steps">`,i?n.steps.forEach(e=>{let i=r.includes(e.id),a=u&&!c,s=i?`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``;_+=`<div class="cv2-step" style="${a?``:`cursor:default`}"
            ${a?`onclick="_routineToggleStepKid(${JSON.stringify(n.id)},${JSON.stringify(e.id)},'${t.id}')"`:``}>
            <div class="cv2-step-check${i?` cv2-step-check--done`:``}">${s}</div>
            <span class="cv2-step-emoji">${e.emoji}</span>
            <span class="cv2-step-label${i?` cv2-step-label--done`:``}">${f(e.label)}</span>
            ${e.points>0&&!o?`<span class="cv2-step-pts">⭐ ${e.points}</span>`:``}
          </div>`}):_+=`<div style="padding:12px 16px;font-size:13px;color:#94a3b8;text-align:center">No steps added yet</div>`,_+=`</div>`,l){let t=_assignmentStreak(e,i),r=t>1?` · 🔥 ${t} day streak!`:``;_+=`<div class="cv2-routine-done">✓ All done! Great work${n.pointsPerCompletion>0&&!o?` · ⭐ ${n.pointsPerCompletion} bonus pts`:``}!${r}</div>`}else if(u){let t=_assignmentStreak(e,i);t>0&&!o&&(_+=`<div style="padding:4px 16px 8px;font-size:11px;font-weight:700;color:#f59e0b">🔥 ${t} day streak — keep it up!</div>`)}_+=`</div>`});let b=(n.chores||[]).filter(e=>(e.assignedTo===t.id||e.assignedTo===`all`)&&!e._isRoutine),x=(n.completions||[]).filter(e=>e.kidId===t.id&&e.status===`pending`);y+=b.length,v+=b.filter(e=>x.some(t=>t.choreId===e.id)).length;let S=``;b.length&&b.forEach(e=>{let n=x.some(t=>t.choreId===e.id);S+=`<div class="cv2-chore">
        <span class="cv2-chore-emoji">${e.emoji||`📋`}</span>
        <div class="cv2-chore-info">
          <div class="cv2-chore-name">${f(e.name)}</div>
          ${o?``:`<div class="cv2-chore-pts">⭐ ${e.points} · ${e.frequency}</div>`}
        </div>
        ${n?`<span class="cv2-chore-done-badge">${o?`⭐`:`Waiting ✓`}</span>`:c?`<span class="cv2-chore-done-badge" style="background:#F0EFF8;color:#A1A1AA">Not done</span>`:`<button class="cv2-chore-btn" onclick="markChoreChildView('${t.id}','${e.id}')">${o?`✅`:`Done ✓`}</button>`}
      </div>`});let C=_mealWeekKey(0),w=new Date().getDay()===0?6:new Date().getDay()-1,T=a.meals?.lunchbox?.plans?.[C]||{},E=T[T[t.id]===void 0?(a.meals?.lunchbox?.profiles||[]).find(e=>e.name?.toLowerCase()===t.name?.toLowerCase())?.id??t.id:t.id]?.[w]||{},D=[`main`,`snack`,`fruit`,`drink`],ee=D.map(e=>E[e]).filter(Boolean),O={main:`🥪`,snack:`🍪`,fruit:`🍎`,drink:`🥤`},k=``;if(ee.length){let e=``;D.forEach(t=>{E[t]&&(e+=`<div class="cv2-lb-chip">${O[t]}${o?``:` `+f(E[t])}</div>`)}),k=`<div class="cv2-group">
      <div class="cv2-group-heading">🥪 Lunchbox</div>
      <div class="cv2-card cv2-card--warm">
        <div class="cv2-lb-chips">${e}</div>
      </div>
    </div>`}let{events:te}=Rs(t,m),A=[...te].sort((e,t)=>(e.time||`99:99`).localeCompare(t.time||`99:99`)),ne=``;A.length&&!o&&(ne=`<div class="cv2-group">
      <div class="cv2-group-heading">📅 Today's Events</div>
      <div class="cv2-card">${A.map(e=>`
      <div class="cv2-event-row">
        <span class="cv2-event-time">${e.time?zs(e.time):``}</span>
        <div class="cv2-event-bar"></div>
        <span class="cv2-event-emoji">${e.emoji}</span>
        <div class="cv2-event-body">
          <div class="cv2-event-title">${f(e.label)}</div>
          ${e.notes?`<div class="cv2-event-sub">${f(e.notes)}</div>`:``}
        </div>
      </div>`).join(``)}</div>
    </div>`);let re=(n.prizes||[]).filter(e=>r>=e.pointCost),j=``;if(!o){let e=re.length?`<div style="display:flex;align-items:center;gap:10px;padding:14px 15px">
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
        </div>`;j=`<div class="cv2-group">
      <div class="cv2-group-heading">🏆 Prizes</div>
      <div class="cv2-card cv2-card--warm" style="cursor:pointer" onclick="_cvSwitchTab('prizes','${t.id}')">
        ${e}
      </div>
    </div>`}let ie=(n.notifications||[]).filter(e=>e.kidId===t.id&&!e.read),M=``;ie.length&&!c&&(M=ie.map(e=>{let n=e.type===`prize_approved`;return`<div class="cv2-notif-bar ${n?`cv2-notif-bar--approved`:`cv2-notif-bar--declined`}">
        <span>${n?`${e.prizeEmoji} <strong>${f(e.prizeName)}</strong> approved! You can redeem it now.`:`${e.prizeEmoji} <strong>${f(e.prizeName)}</strong> request was declined.`}</span>
        <button class="cv2-notif-dismiss" onclick="_cvDismissNotif('${e.id}','${t.id}')">×</button>
      </div>`}).join(``));let ae=y>0&&v===y,N;ae&&!c?N=`<div class="cv2-celebration">
      <div class="cv2-celeb-emoji">${o?`🌟`:`🏆`}</div>
      <div class="cv2-celeb-title">${o?`🎉 Yay!`:`Amazing work, ${f(t.name)}!`}</div>
      <div class="cv2-celeb-sub">${o?`All done! You're a star!`:`You've finished everything for today. You're a superstar! ⭐`}</div>
    </div>
    ${ne}${k}${j}`:(N=M,i!==`tiny-tots`&&!c&&(N+=`<button class="cv2-week-shortcut" onclick="_cvSwitchTab('calendar','${t.id}')">📅 See my week →</button>`),h.length&&(N+=`<div class="cv2-group">
        <div class="cv2-group-heading">📋 My Routines</div>
        ${_}
      </div>`),b.length&&(N+=`<div class="cv2-group">
        <div class="cv2-group-heading">🧹 Chores</div>
        <div class="cv2-card">${S}</div>
      </div>`),N+=ne,N+=k,N+=j),document.getElementById(`cv-content`).innerHTML=N,l.classList.remove(`hidden`),l.style.display=`flex`,ae&&!c&&Os()}function As(e){let t=document.getElementById(`cv-prizes-badge`);if(!t)return;let n=a.kids,r=kidBalance(n,e.id),i=(n.notifications||[]).filter(t=>t.kidId===e.id&&!t.read).length,o=(n.prizes||[]).filter(e=>r>=e.pointCost).length,s=i+(o>0&&i===0?o:0);s>0?(t.textContent=s>9?`9+`:String(s),t.style.display=``):t.style.display=`none`}function js(e){let t=a.kids,n=kidBalance(t,e.id),r=ws(e)===`tiny-tots`,i=_cvReadOnly,o=t.prizes||[],s=!1;(t.notifications||[]).filter(t=>t.kidId===e.id&&!t.read).forEach(e=>{e.read=!0,s=!0}),s&&saveData(a),As(e);let c=r?`${`⭐`.repeat(Math.min(n,10))}${n>10?`+`:``}`:`${n}`,l=`<div class="cv2-prizes-balance">
    <div class="cv2-prizes-balance-left">
      <div class="cv2-prizes-balance-pts">${r?c:`⭐ ${c}`}</div>
      <div class="cv2-prizes-balance-lbl">${r?`stars earned`:`points to spend`}</div>
    </div>
    <span class="cv2-prizes-balance-emoji">🏆</span>
  </div>`;l+=`<div class="cv2-group-heading" style="margin-bottom:8px">Prizes</div>`,o.length?(l+=`<div class="cv2-card cv2-card--warm" style="margin-bottom:18px">`,o.forEach(t=>{let a=n>=t.pointCost;l+=`<div class="cv2-prize">
        <span class="cv2-prize-emoji">${t.emoji||`🎁`}</span>
        <div class="cv2-prize-info">
          <div class="cv2-prize-name">${f(t.name)}</div>
          ${r?``:`<div class="cv2-prize-cost">⭐ ${t.pointCost} points</div>`}
        </div>
        <button class="cv2-prize-btn ${a?`cv2-prize-btn--can`:`cv2-prize-btn--cant`}"
          ${a&&!i?`onclick="_cvShowPrizeConfirm('${e.id}','${t.id}')"`:`disabled`}>
          ${a?r?`🎁`:`Redeem`:r?`🔒`:`⭐ ${t.pointCost}`}
        </button>
      </div>`}),l+=`</div>`):l+=`<div style="text-align:center;padding:24px 0;color:#A1A1AA;font-size:13px">No prizes set up yet</div>`;let u=(t.redemptions||[]).filter(t=>t.kidId===e.id).sort((e,t)=>(t.ts||t.requestedAt||0)>(e.ts||e.requestedAt||0)?1:-1).slice(0,8);u.length&&(l+=`<div class="cv2-group-heading" style="margin-bottom:8px">Recent</div>`,l+=`<div class="cv2-card">`,u.forEach(e=>{let t=o.find(t=>t.id===e.prizeId);if(!t)return;let n={approved:{label:`✓ Approved`,bg:`#f0fdf4`,color:`#15803d`},rejected:{label:`Declined`,bg:`#fef2f2`,color:`#b91c1c`},pending:{label:`⏳ Waiting`,bg:`#fffbeb`,color:`#854d0e`}},r=n[e.status]||n.pending,i=e.approvedAt||e.ts||e.requestedAt,a=i?new Date(i).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}):``;l+=`<div class="cv2-redeem-history-row">
        <span style="font-size:20px">${t.emoji||`🎁`}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:#18181B">${f(t.name)}</div>
          ${a?`<div style="font-size:11px;color:#94a3b8">${a}</div>`:``}
        </div>
        <span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:99px;background:${r.bg};color:${r.color}">${r.label}</span>
      </div>`}),l+=`</div>`);let d=document.getElementById(`cv-content`);d&&(d.innerHTML=l)}var Ms=null,Ns=`today`,Ps=`7day`,Fs=null,Is=new Set;function Ls(e,t){t&&(Ms=t);let n=(a.kids?.profiles||[]).find(e=>String(e.id)===String(Ms));if(!n)return;let r=ws(n),i=document.getElementById(`cv-nav`);i&&(i.style.display=r===`tiny-tots`?`none`:``),document.getElementById(`cv-nav-today`)?.classList.toggle(`active`,e===`today`),document.getElementById(`cv-nav-calendar`)?.classList.toggle(`active`,e===`calendar`),document.getElementById(`cv-nav-prizes`)?.classList.toggle(`active`,e===`prizes`),e===`today`?ks(Ms):e===`prizes`?js(n):(Fs=null,Gs(n))}function Rs(e,t){let n=(a.routineAssignments||[]).filter(t=>t.childId===e.id).map(e=>{let n=(a.routines||[]).find(t=>t.id===e.routineId);return n&&_routineMatchesDate(n,t)?{type:`routine`,routine:n,assignment:e,label:n.name,emoji:n.emoji,color:`#7C3AED`,tag:`Routine`,time:n.triggerTime||null}:null}).filter(Boolean),r=(a.childEvents||[]).filter(n=>{let r=Array.isArray(n.assignedTo)?n.assignedTo:[n.assignedTo];return r.includes(e.id)||r.includes(`all`)||n.isHouseholdWide?n.recurrence?_recurrenceMatchesDate(n.recurrence,t):n.date===t:!1}).map(e=>({type:`event`,label:e.title,emoji:e.emoji||`📅`,color:`#10b981`,tag:`Event`,notes:e.notes,time:e.time||null})),i=(a.planner?.events||[]).filter(e=>_plannerEvMemberIds(e).includes(`everyone`)?e.recurrence&&e.recurrence.type!==`one_time`?_recurrenceMatchesDate(e.recurrence,t):e.endDate&&e.endDate>e.date?t>=e.date&&t<=e.endDate:e.date===t:!1).map(e=>({type:`event`,label:e.title,emoji:PLANNER_CATS[e.category]?.emoji||`📅`,color:`#10b981`,tag:`Event`,notes:e.notes||``,time:e.time||null}));return{routines:n,events:[...r,...i],chores:(a.kids?.chores||[]).filter(t=>(t.assignedTo===e.id||t.assignedTo===`all`)&&!t._isRoutine).map(e=>({type:`chore`,label:e.name,emoji:e.emoji||`📋`,color:`#ec4899`,tag:`Chore`,time:null}))}}function zs(e){if(!e)return``;let[t,n]=e.split(`:`).map(Number);return`${t%12||12}:${String(n).padStart(2,`0`)} ${t>=12?`pm`:`am`}`}function Bs(e){Is.has(e)?Is.delete(e):Is.add(e);let t=(a.kids?.profiles||[]).find(e=>String(e.id)===String(Ms));t&&(Ps===`7day`||ws(t)===`early-reader`?Hs(t,new Date().toISOString().slice(0,10)):Hs(t,Fs))}function Vs(e,t,n){if(_cvReadOnly)return;let r=_routineGetAssignment(e,Ms);if(!r)return;r.completionState||(r.completionState={});let i=n;r.completionState[i]||(r.completionState[i]=[]);let o=r.completionState[i].indexOf(t),s=o===-1;s?r.completionState[i].push(t):r.completionState[i].splice(o,1);let c=new Date().toISOString().slice(0,10);if(s&&n===c){let n=(a.routines||[]).find(t=>String(t.id)===String(e));if(n){let e=n.steps.find(e=>e.id===t);(e?.points||0)>0&&_routineAwardStepPoints(n,e,Ms);let a=n.steps.length;r.completionState[i].length===a&&a>0&&(n.pointsPerCompletion||0)>0&&_routineAwardPoints(n,Ms)}}saveData(a);let l=(a.kids?.profiles||[]).find(e=>String(e.id)===String(Ms));l&&Hs(l,n)}function Hs(e,t){let n=Ps===`month`?`cv-day-panel`:`cv-schedule-panel`,r=document.getElementById(n);r&&(r.innerHTML=Us(e,t))}function Us(e,t){if(!t)return``;let{routines:n,events:r,chores:i}=Rs(e,t),o=t;if(!n.length&&!r.length&&!i.length)return`<div style="text-align:center;padding:28px 0;color:#A1A1AA;font-size:13px">Nothing scheduled</div>`;let s=[...n.map(e=>({...e,sortKey:e.time||`23:59`})),...r.map(e=>({...e,sortKey:e.time||`23:59`}))].sort((e,t)=>e.sortKey.localeCompare(t.sortKey)),c=``;return s.length&&(c+=`<div class="cv-sched-section-hdr">Schedule</div>`,s.forEach(e=>{e.type===`routine`?c+=Ws(e.routine,e.assignment,o):c+=`<div class="cv-sched-item">
          <div class="cv-sched-row">
            <span class="cv-sched-time">${e.time?zs(e.time):``}</span>
            <div class="cv-sched-color-bar" style="background:${e.color}"></div>
            <span class="cv-sched-emoji">${e.emoji}</span>
            <div class="cv-sched-body">
              <div class="cv-sched-title">${f(e.label)}</div>
              ${e.notes?`<div class="cv-sched-sub">${f(e.notes)}</div>`:``}
            </div>
            <span class="cv-sched-tag" style="background:${e.color}20;color:${e.color}">${e.tag}</span>
          </div>
        </div>`})),i.length&&(c+=`<div class="cv-sched-section-hdr">Chores</div>`,i.forEach(t=>{let n=(a.kids?.completions||[]).some(n=>n.kidId===e.id&&n.choreId===(a.kids?.chores||[]).find(e=>e.name===t.label)?.id&&n.status===`pending`);c+=`<div class="cv-sched-item">
        <div class="cv-sched-row">
          <span class="cv-sched-time"></span>
          <div class="cv-sched-color-bar" style="background:${t.color}"></div>
          <span class="cv-sched-emoji">${t.emoji}</span>
          <div class="cv-sched-body">
            <div class="cv-sched-title">${f(t.label)}</div>
          </div>
          ${n?`<span class="cv-sched-tag" style="background:#fef9c320;color:#854d0e">Waiting ✓</span>`:`<span class="cv-sched-tag" style="background:${t.color}20;color:${t.color}">Chore</span>`}
        </div>
      </div>`})),c}function Ws(e,t,n){let r=t.completionState?.[n]||[],i=e.steps.length,a=i>0?Math.round(r.length/i*100):0,o=r.length===i&&i>0,s=Is.has(e.id),c=i>0?`
    <div class="cv-sched-progress">
      <div class="cv-sched-prog-bar"><div class="cv-sched-prog-fill" style="width:${a}%"></div></div>
      <span style="font-size:11px;color:#94a3b8;font-weight:600">${r.length}/${i}</span>
    </div>`:``,l=``;return s&&i>0&&(l=`<div class="cv-sched-steps">`,e.steps.forEach(t=>{let i=r.includes(t.id),a=!_cvReadOnly,o=i?`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``;l+=`<div class="cv-sched-step" ${a?`onclick="_cvToggleStepFromCal(${JSON.stringify(e.id)},${JSON.stringify(t.id)},'${n}')"`:`style="cursor:default"`}>
        <div class="cv-sched-step-check${i?` cv-sched-step-check--done`:``}">${o}</div>
        <span class="cv-sched-step-emoji">${t.emoji}</span>
        <span class="cv-sched-step-label${i?` cv-sched-step-label--done`:``}">${f(t.label)}</span>
        ${t.points>0?`<span class="cv-sched-step-pts">⭐ ${t.points}</span>`:``}
      </div>`}),l+=`</div>`,o&&(l+=`<div style="text-align:center;padding:8px;font-size:12px;font-weight:700;color:#5B4CF5;background:#f5f3ff">✓ All done! 🎉</div>`)),`<div class="cv-sched-item">
    <div class="cv-sched-row" style="cursor:pointer" onclick="_cvToggleRoutineExpand(${JSON.stringify(e.id)})">
      <span class="cv-sched-time">${e.triggerTime?zs(e.triggerTime):``}</span>
      <div class="cv-sched-color-bar" style="background:#7C3AED"></div>
      <span class="cv-sched-emoji">${e.emoji}</span>
      <div class="cv-sched-body">
        <div class="cv-sched-title">${f(e.name)}</div>
        ${o?`<div class="cv-sched-sub" style="color:#5B4CF5;font-weight:700">✓ Complete</div>`:e.triggerTime?`<div class="cv-sched-sub">${zs(e.triggerTime)}</div>`:``}
      </div>
      ${c}
      <button class="cv-sched-expand-btn">${s?`▲`:`▼`}</button>
    </div>
    ${l}
  </div>`}function Gs(e){if(!e)return;let t=ws(e)===`early-reader`,n=t?`7day`:Ps,r=new Date().toISOString().slice(0,10),i=document.getElementById(`cv-content`);if(!i)return;let a=``;t||(a+=`<div style="display:flex;gap:8px;margin-bottom:14px">
      <button class="cv2-nav-tab cv-cal-month-toggle" style="border-radius:99px;padding:6px 16px;flex:none;${n===`7day`?`color:#5B4CF5;border-bottom-color:#5B4CF5`:``}"
        onclick="_cvCalViewToggle('7day','${e.id}')">Week</button>
      <button class="cv2-nav-tab cv-cal-month-toggle" style="border-radius:99px;padding:6px 16px;flex:none;${n===`month`?`color:#5B4CF5;border-bottom-color:#5B4CF5`:``}"
        onclick="_cvCalViewToggle('month','${e.id}')">Month</button>
    </div>`),a+=n===`7day`?qs(e,r):Ys(e,r),i.innerHTML=a}function Ks(e,t){Ps=e,Fs=null;let n=(a.kids?.profiles||[]).find(e=>String(e.id)===String(t));n&&Gs(n)}function qs(e,t){let n=[`S`,`M`,`T`,`W`,`T`,`F`,`S`],r=new Date(t+`T12:00:00`),i=`<div class="cv-week-strip">`;for(let a=0;a<7;a++){let o=new Date(r);o.setDate(r.getDate()+a);let s=o.toISOString().slice(0,10),c=s===t,{routines:l,events:u,chores:d}=Rs(e,s),f=[...l,...u,...d].slice(0,3).map(e=>`<div class="cv-cal-dot" style="background:${e.color}"></div>`).join(``);i+=`<div class="cv-week-cell ${c?`cv-today`:``}" onclick="_cvWeekDayTap('${s}','${e.id}')">
      <div class="cv-week-dow">${n[o.getDay()]}</div>
      <div class="cv-week-date">${o.getDate()}</div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:3px">${f}</div>
    </div>`}i+=`</div>`;let a=new Date(t+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`});return i+=`<div style="font-size:13px;font-weight:700;color:#1e293b;margin:10px 0 2px">${f(a)}</div>`,i+=`<div id="cv-schedule-panel">${Us(e,t)}</div>`,i}function Js(e,t){let n=(a.kids?.profiles||[]).find(e=>String(e.id)===String(t));if(!n)return;Is.clear(),document.querySelectorAll(`.cv-week-cell`).forEach(t=>{t.classList.toggle(`cv-today`,t.getAttribute(`onclick`)?.includes(`'${e}'`))});let r=new Date(e+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`}),i=document.getElementById(`cv-schedule-panel`);i&&(i.previousElementSibling.textContent=r,i.innerHTML=Us(n,e))}function Ys(e,t){let n=new Date(t+`T12:00:00`),r=n.getFullYear(),i=n.getMonth(),a=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],o=[`S`,`M`,`T`,`W`,`T`,`F`,`S`],s=new Date(r,i,1).getDay(),c=new Date(r,i+1,0).getDate(),l=Fs||t,u=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
    <span style="font-size:14px;font-weight:800;color:#18181B">${a[i]} ${r}</span>
  </div>`;u+=`<div class="cv-cal-grid">`,o.forEach(e=>{u+=`<div class="cv-cal-day-hdr">${e}</div>`});for(let e=0;e<s;e++)u+=`<div class="cv-cal-cell cv-other"></div>`;for(let n=1;n<=c;n++){let a=`${r}-${String(i+1).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,o=a===t,s=a===l,{routines:c,events:d,chores:f}=Rs(e,a),p=[...c,...d,...f].slice(0,3).map(e=>`<div class="cv-cal-dot" style="background:${e.color}"></div>`).join(``);u+=`<div class="cv-cal-cell ${o?`cv-today`:``} ${s&&!o?`cv-cal-cell--sel`:``}" onclick="_cvMonthDayTap('${a}','${e.id}')">
      <div class="cv-cal-cell-num">${n}</div>
      <div style="display:flex;flex-direction:column;align-items:center">${p}</div>
    </div>`}u+=`</div>`;let d=new Date(l+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`});return u+=`<div class="cv-month-day-panel">
    <div class="cv-month-day-panel-title">${f(d)}</div>
    <div id="cv-day-panel">${Us(e,l)}</div>
  </div>`,u}function Xs(e,t){Fs=e,Is.clear();let n=(a.kids?.profiles||[]).find(e=>String(e.id)===String(t));n&&Gs(n)}function Zs(e,t){Xs(e,t)}function Qs(e,t){let n=(a.kids?.notifications||[]).find(t=>t.id===e);n&&(n.read=!0),saveData(a),ks(t)}function $s(e,t){let n=(a.kids?.prizes||[]).find(e=>String(e.id)===String(t));if(!n)return;let r=`<div class="cv2-confirm">
    <div class="cv2-confirm-emoji">${n.emoji||`🎁`}</div>
    <div class="cv2-confirm-title">${f(n.name)}</div>
    <div class="cv2-confirm-cost">⭐ ${n.pointCost} points</div>
    <button class="cv2-confirm-send" onclick="redeemPrizeChildView('${e}','${t}')">
      Send request ✉️
    </button>
    <button class="cv2-confirm-cancel" onclick="_cvSwitchTab('prizes','${e}')">Cancel</button>
  </div>`;document.getElementById(`cv-content`).innerHTML=r}function ec(e,t){a.kids.completions.find(n=>n.kidId===e&&n.choreId===t&&n.status===`pending`)||(a.kids.completions.push({id:uid(),kidId:e,choreId:t,status:`pending`,ts:new Date().toISOString()}),saveData(a),ks(e))}function tc(e,t){a.kids.redemptions.push({id:uid(),kidId:e,prizeId:t,status:`pending`,ts:new Date().toISOString()}),saveData(a),Ls(`prizes`,e)}function nc(e){let t=(a.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(_activeProfile={id:t.id,name:t.name,emoji:t.emoji,role:`child`},setKidSession(t.id),ks(e))}function rc(){let e=document.getElementById(`dev-tools-overlay`),t=document.getElementById(`dev-tools-sheet`),n=document.getElementById(`dev-tools-body`);if(!e||!t)return;let r=new Date().toISOString().slice(0,10);new Date(Date.now()+864e5).toISOString().slice(0,10),new Date(Date.now()+3*864e5).toISOString().slice(0,10),new Date(Date.now()+7*864e5).toISOString().slice(0,10),new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().slice(0,7),r.slice(0,7),n.innerHTML=[{label:`💰 Wallet — full budget`,desc:`Income, expenses, actuals, bills, goals, net worth`,fn:`_devLoadWallet`},{label:`👨‍👩‍👧 Kids zone`,desc:`Two kids, chores, prizes, completions, redemptions`,fn:`_devLoadKids`},{label:`📋 Routines`,desc:`Morning & evening routines with steps, assigned to kids`,fn:`_devLoadRoutines`},{label:`📅 Planner & events`,desc:`Events today, tomorrow, this week, recurring`,fn:`_devLoadPlanner`},{label:`🏠 Home — docs, vehicles, maintenance`,desc:`Documents expiring, vehicle rego, maintenance tasks`,fn:`_devLoadHome`},{label:`🍽 Meals & lunchbox`,desc:`This week's meal plan + kids lunchbox entries`,fn:`_devLoadMeals`},{label:`🌟 Load everything`,desc:`All of the above in one shot`,fn:`_devLoadAll`,primary:!0},{label:`🗑 Reset to empty`,desc:`Clears all state back to defaults`,fn:`_devReset`,danger:!0}].map(e=>`
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
        Bills: ${(a.bills||[]).length} ·
        Budget items: ${(a.budget?.expenses||[]).length} ·
        Goals: ${(a.goals||[]).length} ·
        Kids: ${(a.kids?.profiles||[]).length} ·
        Routines: ${(a.routines||[]).length} ·
        Events: ${(a.planner?.events||[]).length}
      </div>
    </div>`,e.style.display=`block`,t.style.display=`block`}function ic(){document.getElementById(`dev-tools-overlay`).style.display=`none`,document.getElementById(`dev-tools-sheet`).style.display=`none`}function ac(){let e=new Date().toISOString().slice(0,7);new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().slice(0,7),a.budget.income=[{id:uid(),name:`Salary`,category:`Salary`,amount:8500,frequency:`monthly`},{id:uid(),name:`Freelance`,category:`Freelance / Contract`,amount:1200,frequency:`monthly`}],a.budget.expenses=[{id:uid(),name:`Mortgage`,category:`Mortgage / Rent`,amount:2800,frequency:`monthly`},{id:uid(),name:`Groceries`,category:`Groceries`,amount:900,frequency:`monthly`},{id:uid(),name:`Electricity`,category:`Utilities`,amount:220,frequency:`monthly`},{id:uid(),name:`Internet`,category:`Utilities`,amount:89,frequency:`monthly`},{id:uid(),name:`Car insurance`,category:`Insurance`,amount:180,frequency:`monthly`},{id:uid(),name:`Dining out`,category:`Dining Out`,amount:350,frequency:`monthly`},{id:uid(),name:`Netflix`,category:`Subscriptions`,amount:23,frequency:`monthly`},{id:uid(),name:`Spotify`,category:`Subscriptions`,amount:12,frequency:`monthly`},{id:uid(),name:`Gym`,category:`Health`,amount:75,frequency:`monthly`},{id:uid(),name:`Kids activities`,category:`Childcare / Education`,amount:280,frequency:`monthly`}];let t={};a.budget.expenses.forEach(e=>{t[e.id]=Math.round(parseFloat(e.amount)*(.4+Math.random()*.7))}),a.budget.actuals[e]=t;let n=e=>{let t=new Date;return t.setDate(t.getDate()+e),t.getDate()},r=e=>{let t=new Date;return t.setDate(t.getDate()+e),t.getMonth()+1};a.bills=[{id:uid(),name:`Electricity`,amount:180,dueDay:n(0),dueMonth:r(0),category:`Utilities`},{id:uid(),name:`Council rates`,amount:420,dueDay:n(1),dueMonth:r(1),category:`Other`},{id:uid(),name:`Phone plan`,amount:45,dueDay:n(2),dueMonth:r(2),category:`Utilities`},{id:uid(),name:`Water bill`,amount:185,dueDay:n(4),dueMonth:r(4),category:`Utilities`},{id:uid(),name:`Internet`,amount:89,dueDay:n(5),dueMonth:r(5),category:`Utilities`},{id:uid(),name:`Spotify`,amount:12,dueDay:n(6),dueMonth:r(6),category:`Subscriptions`},{id:uid(),name:`Home insurance`,amount:290,dueDay:n(14),dueMonth:r(14),category:`Insurance`}],a.goals=[{id:uid(),name:`Emergency fund`,type:`emergency`,targetAmount:25e3,currentAmount:11200,deadline:``},{id:uid(),name:`Europe holiday`,type:`holiday`,targetAmount:8e3,currentAmount:2400,deadline:`2026-12-01`},{id:uid(),name:`New car`,type:`vehicle`,targetAmount:35e3,currentAmount:7800,deadline:`2027-06-01`}],a.netWorth={assets:[{id:uid(),name:`Home`,category:`Property`,amount:85e4},{id:uid(),name:`Super`,category:`Super`,amount:142e3},{id:uid(),name:`Savings`,category:`Savings`,amount:28e3},{id:uid(),name:`Car`,category:`Vehicle`,amount:22e3}],liabilities:[{id:uid(),name:`Mortgage`,category:`Mortgage`,amount:52e4},{id:uid(),name:`Car loan`,category:`Loan`,amount:12e3}],snapshots:[],target:{amount:15e5,byYear:2040}},a.settings={...a.settings,adultName:`Robert Gentilcore`,householdName:`Gentilcore Family`},saveData(a),renderAll()}function oc(){_routineTodayKey();let e=uid(),t=uid(),n=uid(),r=uid(),i=uid(),o=uid(),s=uid();a.kids={profiles:[{id:e,name:`Amy`,emoji:`🌸`,dob:`2015-03-14`,pinHash:null},{id:t,name:`Johnny`,emoji:`⚡`,dob:`2013-07-22`,pinHash:null}],chores:[{id:n,name:`Make bed`,emoji:`🛏️`,assignedTo:e,points:5,frequency:`Daily`},{id:r,name:`Tidy room`,emoji:`🧹`,assignedTo:e,points:10,frequency:`Daily`},{id:i,name:`Take out bins`,emoji:`🗑️`,assignedTo:t,points:15,frequency:`Weekly`}],prizes:[{id:o,name:`Extra screen time`,emoji:`📱`,pointCost:30},{id:s,name:`Movie night pick`,emoji:`🎬`,pointCost:50},{id:uid(),name:`Takeaway dinner choice`,emoji:`🍕`,pointCost:80}],completions:[{id:uid(),kidId:e,choreId:n,status:`approved`,ts:new Date().toISOString(),completedAt:new Date().toISOString()},{id:uid(),kidId:e,choreId:r,status:`pending`,ts:new Date().toISOString()},{id:uid(),kidId:t,choreId:i,status:`approved`,ts:new Date().toISOString(),completedAt:new Date().toISOString()}],redemptions:[{id:uid(),kidId:e,prizeId:o,status:`pending`,ts:new Date().toISOString()}],notifications:[],allowances:[]},a.childEvents=[{id:uid(),title:`Soccer training`,emoji:`⚽`,date:new Date().toISOString().slice(0,10),time:`17:00`,assignedTo:[t],isHouseholdWide:!1,createdBy:`dev`},{id:uid(),title:`Piano lesson`,emoji:`🎹`,date:new Date(Date.now()+864e5).toISOString().slice(0,10),time:`15:30`,assignedTo:[e],isHouseholdWide:!1,createdBy:`dev`},{id:uid(),title:`Family dinner`,emoji:`🍽️`,date:new Date(Date.now()+2*864e5).toISOString().slice(0,10),time:`19:00`,assignedTo:[],isHouseholdWide:!0,createdBy:`dev`}],saveData(a),renderAll()}function sc(){let e=_routineTodayKey(),t=a.kids?.profiles?.[0],n=a.kids?.profiles?.[1],r=[{id:uid(),label:`Make bed`,emoji:`🛏️`,points:5,durationMin:2},{id:uid(),label:`Shower`,emoji:`🚿`,points:5,durationMin:10},{id:uid(),label:`Breakfast`,emoji:`🥣`,points:5,durationMin:15},{id:uid(),label:`Pack bag`,emoji:`🎒`,points:5,durationMin:5}],i=[{id:uid(),label:`Homework`,emoji:`📚`,points:10,durationMin:30},{id:uid(),label:`Tidy room`,emoji:`🧹`,points:5,durationMin:10},{id:uid(),label:`Brush teeth`,emoji:`🦷`,points:5,durationMin:3}],o=[{id:uid(),label:`Exercise`,emoji:`💪`,points:0,durationMin:30},{id:uid(),label:`Meditate`,emoji:`🧘`,points:0,durationMin:10},{id:uid(),label:`Plan the day`,emoji:`📋`,points:0,durationMin:5},{id:uid(),label:`Vitamins`,emoji:`💊`,points:0,durationMin:1}],s=[{id:uid(),label:`Tidy kitchen`,emoji:`🍽️`,points:0,durationMin:10},{id:uid(),label:`Review the day`,emoji:`🪞`,points:0,durationMin:5},{id:uid(),label:`Read`,emoji:`📖`,points:0,durationMin:20},{id:uid(),label:`Lights out`,emoji:`💤`,points:0,durationMin:0}],c=new Date().getHours(),l=uid(),u=uid(),d=uid(),f=uid(),p=[{id:l,name:`Morning`,emoji:`☀️`,ownerType:`adult`,ownerId:`dev`,sharedWith:[],steps:o,pointsPerCompletion:0,triggerTime:`07:00`,recurrence:{type:`weekdays`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[],completions:{}},{id:u,name:`Evening`,emoji:`🌙`,ownerType:`adult`,ownerId:`dev`,sharedWith:[],steps:s,pointsPerCompletion:0,triggerTime:`${String(c).padStart(2,`0`)}:00`,recurrence:{type:`daily`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[],completions:{}},{id:d,name:`Morning routine`,emoji:`🌤️`,ownerType:`household`,ownerId:`dev`,sharedWith:[],steps:r,pointsPerCompletion:10,triggerTime:`07:30`,recurrence:{type:`weekdays`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[]},{id:f,name:`Evening routine`,emoji:`🌙`,ownerType:`household`,ownerId:`dev`,sharedWith:[],steps:i,pointsPerCompletion:10,triggerTime:`${String(c).padStart(2,`0`)}:00`,recurrence:{type:`daily`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[]}];a.routines=[...(a.routines||[]).filter(e=>e.ownerType!==`adult`&&e.ownerType!==`household`),...p];let m=[];if(t){let n={id:uid(),routineId:d,childId:t.id,completionState:{}};n.completionState[e]=[r[0].id,r[1].id],m.push(n),m.push({id:uid(),routineId:f,childId:t.id,completionState:{}})}n&&(m.push({id:uid(),routineId:d,childId:n.id,completionState:{}}),m.push({id:uid(),routineId:f,childId:n.id,completionState:{}})),a.routineAssignments=[...a.routineAssignments||[],...m];let h=p[0];h.completions[e]=[o[0].id,o[1].id],saveData(a),renderAll()}function cc(){let e=new Date().toISOString().slice(0,10),t=new Date(Date.now()+864e5).toISOString().slice(0,10),n=new Date(Date.now()+3*864e5).toISOString().slice(0,10),r=new Date(Date.now()+5*864e5).toISOString().slice(0,10),i=new Date(Date.now()+7*864e5).toISOString().slice(0,10),o=_plannerMembers(),s=o[0]?.id||`everyone`,c=o[1]?.id||s;a.planner={events:[{id:uid(),title:`School drop-off`,category:`family`,date:e,time:`08:30`,memberIds:[s],allDay:!1,recurrence:{type:`weekdays`,startDate:`2026-01-01`}},{id:uid(),title:`Team standup`,category:`work`,date:e,time:`09:00`,memberIds:[s],allDay:!1},{id:uid(),title:`Dentist appointment`,category:`health`,date:e,time:`14:00`,memberIds:[s],allDay:!1},{id:uid(),title:`Dinner reservation`,category:`social`,date:e,time:`19:30`,memberIds:[`everyone`],allDay:!1},{id:uid(),title:`Parent–teacher night`,category:`family`,date:t,time:`18:00`,memberIds:[s,c],allDay:!1},{id:uid(),title:`Grocery run`,category:`family`,date:t,time:`10:00`,memberIds:[s],allDay:!1},{id:uid(),title:`Weekend hike`,category:`social`,date:n,time:`08:00`,memberIds:[`everyone`],allDay:!1},{id:uid(),title:`Car service`,category:`home`,date:r,time:`09:00`,memberIds:[s],allDay:!1},{id:uid(),title:`Amy's birthday`,category:`family`,date:i,allDay:!0,memberIds:[`everyone`]}]},saveData(a),renderAll()}function lc(){new Date().toISOString().slice(0,10);let e=new Date(Date.now()+14*864e5).toISOString().slice(0,10),t=new Date(Date.now()+60*864e5).toISOString().slice(0,10),n=new Date(Date.now()-7*864e5).toISOString().slice(0,10),r=new Date(Date.now()-30*864e5).toISOString().slice(0,10),i=new Date(Date.now()-90*864e5).toISOString().slice(0,10);a.documents=[{id:uid(),name:`Passport — Robert`,provider:`DFAT`,expiryDate:e},{id:uid(),name:`Home insurance`,provider:`NRMA`,expiryDate:t},{id:uid(),name:`Working with children check`,provider:`Service NSW`,expiryDate:r},{id:uid(),name:`First aid certificate`,provider:`St John`,expiryDate:n}],a.vehicles=[{id:uid(),name:`Tesla Model 3`,make:`Tesla`,model:`Model 3`,plate:`ABC123`,regoExpiry:t,insurance:{provider:`NRMA`,renewalDate:t}},{id:uid(),name:`Toyota RAV4`,make:`Toyota`,model:`RAV4`,plate:`XYZ789`,regoExpiry:n,insurance:{provider:`AAMI`,renewalDate:t}}],a.maintenance=[{id:uid(),name:`Gutter clean`,provider:`Jim's`,nextDue:i,frequency:`Biannual`,notes:`Both sides`},{id:uid(),name:`Car service — RAV4`,provider:`Toyota Service`,nextDue:r,frequency:`Annual`,notes:`15,000km service`},{id:uid(),name:`Termite inspection`,provider:`Rentokil`,nextDue:n,frequency:`Annual`,notes:``},{id:uid(),name:`HVAC filter`,provider:``,nextDue:e,frequency:`Quarterly`,notes:``},{id:uid(),name:`Smoke alarm test`,provider:``,nextDue:t,frequency:`Annual`,notes:``}],a.householdProfile={...a.householdProfile,members:[{role:`adult`,name:`Robert`,age:38,emoji:`👨`},{role:`adult`,name:`Sarah`,age:36,emoji:`👩`}]},saveData(a),renderAll()}function uc(){let e=typeof _mealWeekKey==`function`?_mealWeekKey(0):`week-0`,t={},n=[[`Porridge`,`Sandwich & apple`,`Chicken stir-fry`],[`Eggs on toast`,`Leftovers`,`Beef tacos`],[`Smoothie`,`Caesar salad`,`Pasta bolognese`],[`Avocado toast`,`Sushi`,`Lamb roast`],[`Cereal`,`Toasted sandwich`,`Fish & chips`],[`Pancakes`,`Fruit bowl`,`BBQ`],[`French toast`,`Cold cuts`,`Pizza night`]];for(let e=0;e<7;e++)t[e]={b:n[e][0],l:n[e][1],d:n[e][2]};a.meals||(a.meals={plan:{},shopping:[],lunchbox:{profiles:[],plans:{}},pantry:[]}),a.meals.plan[e]=t;let r=a.kids?.profiles?.[0];if(r){let t=typeof _mealWeekKey==`function`?_mealWeekKey(0):e;a.meals.lunchbox.plans||(a.meals.lunchbox.plans={}),a.meals.lunchbox.plans[t]||(a.meals.lunchbox.plans[t]={});let n=new Date().getDay()===0?6:new Date().getDay()-1;a.meals.lunchbox.plans[t][r.id]={},a.meals.lunchbox.plans[t][r.id][n]={main:`🥪 Vegemite sandwich`,snack:`🍫 Muesli bar`,fruit:`🍎 Apple`,drink:`💧 Water`}}a.lists||_applyMigrations(a);let i=new Date().toISOString();a.lists.food.items=[{id:`dev-f1`,name:`Milk`,quantity:2,unit:`L`,notes:``,aisle:`dairy`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f2`,name:`Eggs`,quantity:1,unit:`dozen`,notes:`Free range`,aisle:`dairy`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f3`,name:`Chicken breast`,quantity:500,unit:`g`,notes:``,aisle:`meat`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f4`,name:`Spinach`,quantity:1,unit:`units`,notes:``,aisle:`produce`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f5`,name:`Bread`,quantity:1,unit:`units`,notes:`Sourdough`,aisle:`bakery`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f6`,name:`Pasta`,quantity:500,unit:`g`,notes:``,aisle:`pantry`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f7`,name:`Beer`,quantity:1,unit:`units`,notes:``,aisle:`drinks`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f8`,name:`Avocado`,quantity:2,unit:`units`,notes:``,aisle:`produce`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f9`,name:`Butter`,quantity:1,unit:`units`,notes:`Salted`,aisle:`dairy`,state:`got_it`,addedBy:`dev`,addedAt:i,stateChangedAt:i,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f10`,name:`Orange juice`,quantity:1,unit:`L`,notes:``,aisle:`drinks`,state:`got_it`,addedBy:`dev`,addedAt:i,stateChangedAt:i,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f11`,name:`Oat milk`,quantity:1,unit:`L`,notes:``,aisle:`dairy`,state:`not_found`,addedBy:`dev`,addedAt:i,stateChangedAt:i,mealTag:null,manualPrice:null,barcodeId:null}],a.lists.food.weeklyBudget=200,a.lists.food.favourites=[{name:`Milk`,addedCount:8,pinned:!0},{name:`Eggs`,addedCount:7,pinned:!0},{name:`Bread`,addedCount:6,pinned:!1},{name:`Chicken breast`,addedCount:5,pinned:!1},{name:`Butter`,addedCount:4,pinned:!1}],a.lists.wishlist.items=[{id:`dev-w1`,name:`AirPods Pro`,quantity:1,unit:`units`,notes:`Gen 2`,aisle:`other`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-w2`,name:`Standing desk mat`,quantity:1,unit:`units`,notes:``,aisle:`other`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-w3`,name:`Kindle Paperwhite`,quantity:1,unit:`units`,notes:``,aisle:`other`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null}],saveData(a),renderAll()}function dc(){ac(),oc(),sc(),cc(),lc(),uc()}function fc(){if(!confirm(`Reset all data to empty defaults?`))return;let e=JSON.parse(JSON.stringify(DEFAULT_DATA));e.onboarded=!0,e.setupProgressDismissed=!1,_replaceState(e),saveData(e),renderAll()}document.getElementById(`btn-guest-mode`)?.addEventListener(`click`,()=>Dc()),document.getElementById(`btn-google-signin`)?.addEventListener(`click`,()=>Ec());function pc(){document.getElementById(`sidebar`).classList.toggle(`collapsed`)}var mc={};function hc(e){let t=document.getElementById(`icon-group-${e}`),n=document.getElementById(`icon-group-${e}-children`),r=document.getElementById(`text-group-${e}`),i=document.getElementById(`text-group-${e}-children`),a=n&&n.classList.contains(`open`);t&&t.classList.toggle(`open`,!a),n&&n.classList.toggle(`open`,!a),r&&r.classList.toggle(`open`,!a),i&&i.classList.toggle(`open`,!a)}function gc(e){for(let[t,n]of Object.entries(mc))if(n.includes(e)){let e=document.getElementById(`icon-group-${t}-children`);e&&!e.classList.contains(`open`)&&hc(t);return}}window.addEventListener(`unhandledrejection`,e=>{console.error(`[unhandledrejection]`,e.reason)}),window.addEventListener(`error`,e=>{console.error(`[uncaughtError]`,e.message,e.filename,e.lineno)});var _c=`toto_household_owner`,vc=`toto_pending_household`;function yc(){return sessionStorage.getItem(vc)||Jc(_c)||G?.uid||null}function bc(){let e=yc();return e?fbStore.collection(`families`).doc(e):null}function xc(e){Yc(_c,e),sessionStorage.removeItem(vc)}var G=null,Sc=!1,Cc=null,wc=null;function Tc(e,t){wc={ts:new Date().toISOString(),name:G&&(G.displayName||G.email)||`Unknown`,photo:G&&G.photoURL||``,action:e,detail:t||``}}function Ec(){let e=new fbAuth.GoogleAuthProvider;fbAuth.signInWithPopup(e).catch(e=>{let t=document.getElementById(`login-error`);t&&(t.textContent=e.message,t.style.display=``)})}async function Dc(){Sc=!0;let e=document.getElementById(`login-overlay`);if(e&&e.classList.add(`hidden`),await rl,!a.onboarded)showOnboarding();else{let e=location.hash.slice(1);e&&document.getElementById(`tab-`+e)?(history.replaceState({tab:e},``,`#`+e),u(e)):renderAll(),al()}}function Oc(){Cc&&(Cc(),Cc=null),Hc=!1,q=null,nl(),fbAuth.signOut()}function kc(e){return e.budget||(e.budget={income:[],expenses:[],actuals:{},months:{}}),e.budget.actuals||(e.budget.actuals={}),e.budget.months||(e.budget.months={}),e.budget.suggestions||(e.budget.suggestions=[]),e.goals||(e.goals=[]),e.scenarios||(e.scenarios=[]),e.furniture||(e.furniture=[]),e.appliances||(e.appliances=[]),e.planner||(e.planner={events:[]}),e.lists||(e.lists={food:{items:[],budget:0,weeklyBudget:200,stores:[],favourites:[],history:[]},clothes:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},wishlist:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},home:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},pharmacy:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]}},e.meals&&e.meals.shopping&&e.meals.shopping.length&&(e.lists.food.items=e.meals.shopping.map(function(e,t){return{id:`si-`+t,name:e.name,quantity:1,unit:`units`,notes:``,aisle:e.cat||`other`,state:e.checked?`got_it`:`active`,addedBy:`migration`,addedAt:new Date().toISOString(),mealTag:null,manualPrice:null,barcodeId:null}}))),[`food`,`clothes`,`wishlist`,`home`,`pharmacy`].forEach(function(t){e.lists[t]||(e.lists[t]={items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]}),e.lists[t].items||(e.lists[t].items=[]),e.lists[t].stores||(e.lists[t].stores=[]),e.lists[t].favourites||(e.lists[t].favourites=[]),e.lists[t].history||(e.lists[t].history=[])}),e}function Ac(){Cc&&Cc(),!Jc(_c)&&!sessionStorage.getItem(vc)&&xc(G.uid);let e=bc();if(!e){console.error(`No household doc ref`);return}Cc=e.onSnapshot(async t=>{if(t.exists){let e=kc(t.data());Object.assign(a,e),Yc(Mc,JSON.stringify(a))}else{let t=await fbStore.collection(`family`).doc(`shared`).get().catch(()=>null);if(t&&t.exists){let n=kc(t.data());Object.assign(a,n),e.set(a).catch(()=>{}),Yc(Mc,JSON.stringify(a))}else e.set(a).catch(()=>{})}refreshReceiptCounts().then(()=>{qn();let e=location.hash.slice(1);if(e&&document.getElementById(`tab-`+e)?(history.replaceState({tab:e},``,`#`+e),u(e)):renderAll(),!a.onboarded)showOnboarding();else{let e=sessionStorage.getItem(kl),t=sessionStorage.getItem(`toto_post_invite_action`);e||t?(sessionStorage.removeItem(`toto_post_invite_action`),jl()):al()}})},e=>{console.error(`Firestore sync error:`,e),renderAll(),a.onboarded||showOnboarding()})}function jc(){fbAuth.onAuthStateChanged(e=>{if(Sc&&!e)return;G=e;let t=document.getElementById(`login-overlay`),n=document.getElementById(`header-avatar`),r=document.getElementById(`header-sign-out`);if(e)t&&t.classList.add(`hidden`),n&&(n.src=e.photoURL||``,n.style.display=`block`),r&&(r.style.display=`block`),Ac();else{t&&t.classList.remove(`hidden`),n&&(n.style.display=`none`),r&&(r.style.display=`none`),Cc&&(Cc(),Cc=null);let e=sessionStorage.getItem(kl),i=document.getElementById(`login-invite-banner`),a=document.getElementById(`login-tagline`);e&&i&&(i.style.display=`block`,a&&(a.style.display=`none`))}})}jc();var Mc=`home_finance_v1`,Nc=null,Pc={};function Fc(e,t,n,r){Pc[e]={options:t,value:n,onChange:r};let i=t.find(e=>(e.value??e)===n)||t[0],a=i?.label??i?.value??i??``;return`<div class="cs-wrap">
    <button type="button" class="cs-trigger" id="cs-${e}" onclick="event.stopPropagation();_csOpen('${e}',this)">
      <span id="cs-label-${e}">${f(String(a))}</span>
      <span class="cs-chevron">▼</span>
    </button>
  </div>`}function Ic(e,t){Nc&&(Nc.remove(),Nc=null,document.querySelectorAll(`.cs-trigger.open`).forEach(e=>e.classList.remove(`open`)));let n=Pc[e];if(!n)return;t.classList.add(`open`);let r=t.getBoundingClientRect(),i=document.createElement(`div`);i.className=`cs-dropdown`,i.style.left=r.left+`px`,i.style.width=Math.max(r.width,180)+`px`;let a=window.innerHeight-r.bottom-8,o=r.top-8,s=Math.min(260,n.options.length*43);i.style.top=a>=s||a>=o?r.bottom+4+`px`:Math.max(8,r.top-s-4)+`px`,n.options.forEach(r=>{let a=r.value??r,o=r.label??r.value??r,s=document.createElement(`div`);s.className=`cs-option`+(a===n.value?` cs-selected`:``),s.textContent=o,s.addEventListener(`click`,r=>{r.stopPropagation(),n.value=a;let s=document.getElementById(`cs-label-`+e);s&&(s.textContent=o),n.onChange(a),i.remove(),Nc=null,t.classList.remove(`open`)}),i.appendChild(s)}),document.body.appendChild(i),Nc=i}document.addEventListener(`click`,()=>{Nc&&(Nc.remove(),Nc=null,document.querySelectorAll(`.cs-trigger.open`).forEach(e=>e.classList.remove(`open`)))});function Lc(e){e&&e.querySelectorAll(`select.form-select:not(.cs-upgraded)`).forEach(e=>{e.classList.add(`cs-upgraded`);let t=(e.id||`cs`+Math.random().toString(36).slice(2,7))+`__cs`,n=Array.from(e.options).map(e=>({value:e.value,label:e.text})),r=e.value||n[0]?.value||``;e.style.cssText=`position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;overflow:hidden`;let i=document.createElement(`div`);i.className=`cs-wrap`,i.innerHTML=Fc(t,n,r,t=>{e.value=t,e.dispatchEvent(new Event(`change`,{bubbles:!0}))}),e.parentNode.insertBefore(i,e)})}(function(){let e=document.getElementById(`modal-overlay`);e&&new MutationObserver(()=>{e.classList.contains(`hidden`)||Lc(document.getElementById(`modal-body`))}).observe(e,{attributes:!0,attributeFilter:[`class`]})})();var Rc={buildContract:{total:79e4,stages:[{id:1,name:`Deposit`,amount:39500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:2,name:`Base / Slab`,amount:79e3,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:3,name:`Frame`,amount:118500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:4,name:`Lock-up / Enclosed`,amount:276500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:5,name:`Fixing / Fitout`,amount:197500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:6,name:`Practical Completion`,amount:79e3,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``}],variations:[]},extras:[{id:1,name:`Solar`,vendor:``,totalAmount:0,amountPaid:0,dueDate:``,notes:``},{id:2,name:`Landscaping`,vendor:``,totalAmount:0,amountPaid:0,dueDate:``,notes:``}],furniture:[],appliances:[],goals:[],scenarios:[],kids:{profiles:[],chores:[],prizes:[],completions:[],redemptions:[]},netWorth:{assets:[],liabilities:[],snapshots:[],target:{amount:0,byYear:0}},bills:[],subscriptions:[],planner:{events:[]},meals:{plan:{},shopping:[],lunchbox:{profiles:[],plans:{}},pantry:[]},vehicles:[],documents:[],maintenance:[],onboarded:!1,setupProgressDismissed:!1,activityLog:[],householdProfile:{members:[{role:`adult`,age:null},{role:`adult`,age:null}],pets:[],cars:1,invites:[],authorizedUsers:[]},expenseCategories:[`Mortgage / Rent`,`Insurance`,`Utilities`,`Groceries`,`Transport`,`Childcare / Education`,`Health`,`Entertainment`,`Subscriptions`,`Dining Out`,`Clothing`,`Personal Care`,`Savings / Investment`,`Other`],incomeCategories:[`Salary`,`Freelance / Contract`,`Rental Income`,`Government / Benefits`,`Investment`,`Other`],budget:{income:[],expenses:[],actuals:{},months:{}},settings:{autoFillMonths:!1},categoryGroups:[{id:1,name:`Housing`,icon:`🏠`,categories:[`Mortgage / Rent`,`Utilities`,`Insurance`]},{id:2,name:`Food & Dining`,icon:`🍽️`,categories:[`Groceries`,`Dining Out`]},{id:3,name:`Transport`,icon:`🚗`,categories:[`Transport`]},{id:4,name:`Family & Health`,icon:`👨‍👩‍👧`,categories:[`Childcare / Education`,`Health`,`Personal Care`]},{id:5,name:`Lifestyle`,icon:`🎮`,categories:[`Entertainment`,`Subscriptions`,`Clothing`]},{id:6,name:`Savings`,icon:`💰`,categories:[`Savings / Investment`]},{id:7,name:`Other`,icon:`📦`,categories:[`Other`]}],routines:[],routineAssignments:[],childEvents:[]};function zc(){try{let e=Jc(Mc);if(!e)return JSON.parse(JSON.stringify(Rc));let t=JSON.parse(e);t.budget.actuals||(t.budget.actuals={}),t.budget.months||(t.budget.months={}),t.budget.suggestions||(t.budget.suggestions=[]),t.goals||(t.goals=[]),t.scenarios||(t.scenarios=[]),t.netWorth||(t.netWorth={assets:[],liabilities:[],snapshots:[]}),t.netWorth.snapshots||(t.netWorth.snapshots=[]),t.netWorth.target||(t.netWorth.target={amount:0,byYear:0}),t.bills||(t.bills=[]),t.subscriptions||(t.subscriptions=[]),t.onboarded===void 0&&(t.onboarded=!0),t.planner||(t.planner={events:[]}),t.planner?.events&&t.planner.events.forEach(e=>{if(e.recurring||(e.recurring=`none`),!e.recurrence&&e.recurring&&e.recurring!==`none`){let t={weekly:{type:`interval`,intervalDays:7},fortnightly:{type:`interval`,intervalDays:14},monthly:{type:`interval`,intervalDays:30},quarterly:{type:`interval`,intervalDays:91},yearly:{type:`interval`,intervalDays:365}}[e.recurring];t&&(e.recurrence={...t,startDate:e.date||new Date().toISOString().slice(0,10)})}}),t.kids||(t.kids={profiles:[],chores:[],prizes:[],completions:[],redemptions:[]}),t.kids.profiles||(t.kids.profiles=[]),t.kids.chores||(t.kids.chores=[]),t.kids.prizes||(t.kids.prizes=[]),t.kids.completions||(t.kids.completions=[]),t.kids.redemptions||(t.kids.redemptions=[]);let n=new Map;if(t.kids.profiles.forEach(e=>{e.name&&n.set(e.name.toLowerCase(),e)}),n.size<t.kids.profiles.length&&(t.kids.profiles=Array.from(n.values())),t.furniture||(t.furniture=[]),t.appliances||(t.appliances=[]),t.activityLog||(t.activityLog=[]),!t.householdProfile)t.householdProfile={members:[{role:`adult`,age:null},{role:`adult`,age:null}],pets:[],cars:1};else if(`adults`in t.householdProfile){let e=t.householdProfile.adults||2,n=t.householdProfile.children||0;t.householdProfile={members:[...Array.from({length:e},()=>({role:`adult`,age:null})),...Array.from({length:n},()=>({role:`child`,age:null}))],pets:[],cars:1}}t.householdProfile.pets||(t.householdProfile.pets=[]),t.householdProfile.cars===void 0&&(t.householdProfile.cars=1),t.householdProfile.invites||(t.householdProfile.invites=[]),t.householdProfile.authorizedUsers||(t.householdProfile.authorizedUsers=[]),(t.householdProfile.members||[]).forEach((e,n)=>{if(!e.name)if(e.role===`child`){let r=(t.kids?.profiles||[])[n-(t.householdProfile.members||[]).filter((e,t)=>t<n&&e.role===`adult`).length];r?.name&&(e.name=r.name,!e.age&&r.age&&(e.age=r.age),!e.emoji&&r.emoji&&(e.emoji=r.emoji))}else{let r=(t.budget?.income||[])[(t.householdProfile.members||[]).filter((e,t)=>t<n&&e.role===`adult`).length];if(r?.name){let t=r.name.match(/^([^'\s]+)'s\s/i)||r.name.match(/^([^'\s]+)\s/);t&&(e.name=t[1])}}}),t.meals||(t.meals={plan:{},shopping:[]}),t.meals.plan||(t.meals.plan={}),t.meals.shopping||(t.meals.shopping=[]),t.meals.lunchbox||(t.meals.lunchbox={profiles:[],plans:{}}),t.meals.lunchbox.profiles||(t.meals.lunchbox.profiles=[]),t.meals.lunchbox.plans||(t.meals.lunchbox.plans={}),t.meals.pantry||(t.meals.pantry=[]),t.vehicles||(t.vehicles=[]),t.documents||(t.documents=[]),t.maintenance||(t.maintenance=[]),t.routines||(t.routines=[]),t.routineAssignments||(t.routineAssignments=[]);let r=new Set((t.routineAssignments||[]).map(e=>e.routineId));if(t.routines.forEach(e=>{if(e.completions||(e.completions={}),e.sharedWith||(e.sharedWith=[]),e.assignedTo||(e.assignedTo=[]),e.linkedFrom||(e.linkedFrom=null),e.linkedType||(e.linkedType=null),e.pointsPerCompletion===void 0&&(e.pointsPerCompletion=0),(e.steps||[]).forEach(e=>{e.points===void 0&&(e.points=0)}),e.skippedDates||(e.skippedDates=[]),e.pausePeriods||(e.pausePeriods=[]),e.recurrence||(e.recurrence={type:`daily`,startDate:(e.lastEditedAt||new Date().toISOString()).slice(0,10)}),(!e.ownerType||!e.ownerId)&&(r.has(e.id)?(e.ownerType=`household`,e.ownerId=`household`):(e.ownerType=`adult`,e.ownerId=`guest`)),r.has(e.id)&&e.ownerType!==`household`&&(e.ownerType=`household`,e.ownerId=`household`),e.ownerType===`adult`&&e.ownerId===`guest`&&e.steps?.length>0){let t=new Set([`Make bed`,`Shower`,`Breakfast`,`Exercise`,`Plan the day`,`Tidy kitchen`,`Prep tomorrow`,`Family time`,`Read`,`Lights out`]);e.steps.every(e=>t.has(e.label))&&(e.steps=[])}}),t.routineAssignments.forEach(e=>{if(!e.completionState){let n=t.routines.find(t=>t.id===e.routineId);e.completionState=n&&Object.keys(n.completions||{}).length?JSON.parse(JSON.stringify(n.completions)):{}}e.archivedCompletionState||(e.archivedCompletionState=null),e.childIds||(e.childIds=e.childId?[e.childId]:[])}),t.routines.forEach(e=>{e.ownerType===`household`&&(e.completions={})}),t.childEvents||(t.childEvents=[]),t.childEvents.forEach(e=>{e.recurrence||(e.recurrence=null),e.assignedTo||(e.assignedTo=[]),e.isHouseholdWide===void 0&&(e.isHouseholdWide=!1)}),t.settings||(t.settings={autoFillMonths:!1}),t.settings.notifStyle||(t.settings.notifStyle=`focus-timeline`),t.settings.routineResetHour===void 0&&(t.settings.routineResetHour=0),t.kids.notifications||(t.kids.notifications=[]),t.settings.typeAMode===void 0&&(t.settings.typeAMode=!1),t.settings.typeAStreak||(t.settings.typeAStreak=0),t.settings.typeALastReset||(t.settings.typeALastReset=``),t.settings.typeADismissedMission||(t.settings.typeADismissedMission=``),t.settings.typeAMissionShownDate||(t.settings.typeAMissionShownDate=``),t.settings.typeAMissionId||(t.settings.typeAMissionId=``),t.settings.typeALastResetDate||(t.settings.typeALastResetDate=``),t.categoryGroups||(t.categoryGroups=JSON.parse(JSON.stringify(Rc.categoryGroups))),t.buildContract.variations||(t.buildContract.variations=[]),t.buildContract.stages.forEach(e=>{e.expectedDate||(e.expectedDate=``)}),t.expenseCategories||(t.expenseCategories=JSON.parse(JSON.stringify(Rc.expenseCategories))),t.incomeCategories||(t.incomeCategories=JSON.parse(JSON.stringify(Rc.incomeCategories))),t.budget&&t.budget.expenses){let e=new Date;t.budget.expenses.forEach(t=>{if(t.dueDay&&!t.dueDate){let n=e.getFullYear(),r=e.getMonth()+1,i=Math.min(t.dueDay,new Date(n,r,0).getDate());t.dueDate=`${n}-${String(r).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`,delete t.dueDay}t.frequency===`annual`&&(t.frequency=`annually`)})}return t}catch{return JSON.parse(JSON.stringify(Rc))}}function K(e){if(ee(e),wc&&(e.activityLog||(e.activityLog=[]),e.activityLog.unshift(wc),e.activityLog.length>200&&(e.activityLog.length=200),wc=null),Yc(Mc,JSON.stringify(e)),G){let t=bc();t&&t.set(e).catch(e=>{console.error(`Firestore save error:`,e)})}}window._saveData=K;var Bc=`toto_device_profile`,Vc=`toto_kid_session`,q=null,Hc=!1,J=0,Uc=0,Y=``,Wc=null,Gc={};function Kc(){return window.Capacitor?.Plugins?.Preferences??null}async function qc(e){let t=Kc();for(let n of e)if(t)try{let{value:e}=await t.get({key:n});Gc[n]=e}catch{Gc[n]=localStorage.getItem(n)}else Gc[n]=localStorage.getItem(n)}function Jc(e){return e in Gc?Gc[e]:localStorage.getItem(e)}function Yc(e,t){Gc[e]=t,localStorage.setItem(e,t);let n=Kc();n&&n.set({key:e,value:t}).catch(()=>{})}function Xc(e){delete Gc[e],localStorage.removeItem(e);let t=Kc();t&&t.remove({key:e}).catch(()=>{})}function Zc(){return Jc(Bc)}function Qc(e){Yc(Bc,e)}function $c(){Xc(Bc)}function el(){return Jc(Vc)}function tl(e){Yc(Vc,String(e))}function nl(){Xc(Vc)}var rl=qc([_c,Bc,Vc,Mc,`toto_ai_key`,`toto_ai_key_meta`,`toto_qa_last`,`home_finance_colors_v1`]);async function il(e,t){let n=t||`toto-pin-`,r=await crypto.subtle.digest(`SHA-256`,new TextEncoder().encode(n+e));return Array.from(new Uint8Array(r)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}function al(){if(Hc||!a.onboarded)return;Hc=!0;let e=Zc();if(!e){ol();return}if(e===`adult`){q=null,hl();return}if(e===`shared`){cl();return}let t=(a.kids?.profiles||[]).find(t=>t.id===e);if(!t){$c(),ol();return}if(String(el())===String(t.id)){q={id:t.id,name:t.name,emoji:t.emoji,role:`child`},gl();return}t.pinHash?(Wc=t.id,Y=``,J=0,dl(t)):(q={id:t.id,name:t.name,emoji:t.emoji,role:`child`},tl(t.id),gl())}function ol(){let e=(a.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name),t=a.kids?.profiles||[],n=``,r=e.length?e.map(e=>e.name).join(` / `):`Adult`;n+=`<div class="profile-card" onclick="assignDevice('adult')">
    <div class="profile-avatar">👤</div>
    <div style="flex:1">
      <div style="font-size:15px;font-weight:700;color:#1e293b">${f(r)}</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">Adult — opens straight to the full app</div>
    </div>
  </div>`,t.forEach(e=>{n+=`<div class="profile-card" onclick="assignDevice('${e.id}')">
      <div class="profile-avatar">${f(e.emoji||`😊`)}</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${f(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">Kid's device — ${e.pinHash?`requires PIN to open`:`no PIN set yet`}</div>
      </div>
    </div>`}),t.length||(n+=`<div style="padding:12px 16px;background:#fef9c3;border-radius:10px;font-size:13px;color:#854d0e">No kids set up yet. Add kids in the Kids tab first, then assign a device.</div>`),n+=`<div class="profile-card" onclick="assignDevice('shared')" style="border-style:dashed">
    <div class="profile-avatar">👨‍👩‍👧‍👦</div>
    <div style="flex:1">
      <div style="font-size:15px;font-weight:700;color:#1e293b">Everyone (shared)</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">Shows profile picker every time the app opens</div>
    </div>
  </div>`,document.getElementById(`profile-list`).innerHTML=n,document.getElementById(`profile-overlay-title`).textContent=`Who uses this device?`,document.getElementById(`profile-overlay-sub`).textContent=`Set it once — the app will open straight to the right view. You can change this any time in Settings.`,document.getElementById(`profile-overlay`).classList.remove(`hidden`)}function sl(e){if(Qc(e),Hc=!0,document.getElementById(`profile-overlay`).classList.add(`hidden`),e===`adult`)q=null,hl(),renderAll();else if(e===`shared`)cl();else{let t=(a.kids?.profiles||[]).find(t=>t.id===e);if(!t){q=null,Cs(),renderAll();return}t.pinHash?(Wc=t.id,Y=``,J=0,dl(t)):(q={id:t.id,name:t.name,emoji:t.emoji,role:`child`},tl(t.id),gl())}}function cl(){document.getElementById(`pin-overlay`).classList.add(`hidden`);let e=(a.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name),t=a.kids?.profiles||[],n=``;e.forEach((e,t)=>{let r=!!e.pinHash;n+=`<div class="profile-card" onclick="_pickAdult(${t})">
      <div class="profile-avatar">🧑</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${f(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">${t===0?`Owner`:`Member`} · ${r?`PIN login`:`Tap to enter`}</div>
      </div>
      <div style="font-size:12px;color:#0891b2;font-weight:600">${r?`PIN →`:`Enter →`}</div>
    </div>`}),t.forEach(e=>{n+=`<div class="profile-card" onclick="_pickKid('${e.id}')">
      <div class="profile-avatar">${f(e.emoji||`😊`)}</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${f(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">Kid · ${e.pinHash?`PIN login`:`Tap to enter`}</div>
      </div>
      <div style="font-size:12px;color:#0891b2;font-weight:600">${e.pinHash?`PIN →`:`Enter →`}</div>
    </div>`}),document.getElementById(`profile-list`).innerHTML=n,document.getElementById(`profile-overlay-title`).textContent=`Who's using Toto?`,document.getElementById(`profile-overlay-sub`).textContent=`Tap your name to continue`,document.getElementById(`profile-overlay`).classList.remove(`hidden`)}function ll(e){let t=(a.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name)[e??0];if(t?.pinHash){Wc=`adult:`+(e??0),Y=``,J=0,Uc=0,dl({emoji:`🧑`,name:t.name,_isAdult:!0,_memberIndex:e??0});return}q=null,nl(),document.getElementById(`profile-overlay`).classList.add(`hidden`),gl()}function ul(e){let t=(a.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(t.pinHash?(Wc=e,Y=``,J=0,dl(t)):(q={id:t.id,name:t.name,emoji:t.emoji,role:`child`},tl(t.id),document.getElementById(`profile-overlay`).classList.add(`hidden`),gl()))}function dl(e){document.getElementById(`profile-overlay`).classList.add(`hidden`),document.getElementById(`pin-avatar`).textContent=e.emoji||(e._isAdult?`🧑`:`😊`),document.getElementById(`pin-greeting`).textContent=`Hi ${e.name}! 👋`,document.getElementById(`pin-sub`).textContent=`Enter your PIN to continue`,document.getElementById(`pin-error`).textContent=``,fl(),pl(),document.getElementById(`pin-overlay`).classList.remove(`hidden`)}function fl(){let e=document.getElementById(`pin-dots`);e&&(e.innerHTML=[0,1,2,3].map(e=>`<div class="pin-dot ${e<Y.length?`filled`:``}">${e<Y.length?`●`:``}</div>`).join(``))}function pl(){let e=document.getElementById(`pin-pad`);if(!e)return;let t=Date.now();if(t<Uc){let n=Math.ceil((Uc-t)/1e3);document.getElementById(`pin-error`).textContent=`Too many attempts — try again in ${n}s`,e.innerHTML=``,setTimeout(pl,1e3);return}e.innerHTML=[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<div class="pin-key empty"></div>`:`<div class="pin-key" onclick="_pinKey('${e}')">${e}</div>`).join(``)}function ml(e){if(!(Date.now()<Uc)){if(e===`⌫`){Y=Y.slice(0,-1),fl();return}Y.length>=4||(Y+=e,fl(),Y.length===4&&du())}}function hl(){let e=document.getElementById(`header-switch-profile`);if(!e)return;let t=Zc();e.style.display=t&&t!==`adult`?``:`none`}function gl(){hl(),Cs(),q?.role===`child`?(window.kidsView=q.id,d(`kids`),showChildView(q.id)):document.querySelectorAll(`.nav-item, .nav-text-item`).forEach(e=>e.style.display=``),renderAll()}var _l=`member`,vl=null,yl=null;function bl(e){_l=e;let t=document.getElementById(`inv-role-member`),n=document.getElementById(`inv-role-owner`);!t||!n||(e===`member`?(t.style.borderColor=`#0d9488`,t.style.background=`#f0fdfa`,t.style.color=`#0d9488`,n.style.borderColor=`var(--border)`,n.style.background=`var(--surface)`,n.style.color=`var(--text-muted)`):(n.style.borderColor=`#0d9488`,n.style.background=`#f0fdfa`,n.style.color=`#0d9488`,t.style.borderColor=`var(--border)`,t.style.background=`var(--surface)`,t.style.color=`var(--text-muted)`))}function xl(e,t){let n=document.getElementById(`inv-email`),r=n?n.value.trim():``,i=(a.householdProfile.members||[]).find(e=>e.role===`adult`)?.name||`Someone`,o=new Date(Date.now()+10080*60*1e3).toISOString(),s={id:uid(),email:r,role:_l,inviterName:i,memberName:t||null,memberIdx:e??null,createdAt:new Date().toISOString(),expiresAt:o,status:`pending`};a.householdProfile.invites||(a.householdProfile.invites=[]),a.householdProfile.invites.push(s),K(a),vl=s.id;let c=Tl(s.id),l=document.getElementById(`invite-link-wrap`),u=document.getElementById(`invite-form-wrap`),d=document.getElementById(`invite-link-display`);l&&(l.dataset.invEmail=r,l.dataset.invToken=s.id,l.style.display=`block`),u&&(u.style.display=`none`),d&&(d.textContent=c)}function Sl(e){let t=(a.householdProfile.members||[])[e];if(!t)return;let n=(a.householdProfile.members||[]).find((e,t)=>e.role===`adult`&&t===0)?.name||`Someone`,r=new Date(Date.now()+10080*60*1e3).toISOString(),i={id:uid(),email:``,role:`member`,inviterName:n,memberName:t.name||null,memberIdx:e,createdAt:new Date().toISOString(),expiresAt:r,status:`pending`};a.householdProfile.invites||(a.householdProfile.invites=[]),a.householdProfile.invites.push(i),K(a);let o=Tl(i.id),s=f(t.name||`this person`),c=document.createElement(`div`);c.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9000;display:flex;align-items:center;justify-content:center;padding:24px`,c.innerHTML=`<div style="background:#fff;border-radius:16px;padding:24px;max-width:400px;width:100%">
    <div style="font-size:18px;font-weight:700;margin-bottom:6px">Invite ${s} 🔗</div>
    <div style="font-size:13px;color:#64748b;margin-bottom:16px">Share this link with ${s}. It expires in 7 days.</div>
    <div style="font-size:12px;word-break:break-all;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-bottom:14px">${o}</div>
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <button onclick="navigator.clipboard.writeText('${o}').then(()=>{this.textContent='✓ Copied!';setTimeout(()=>this.textContent='📋 Copy link',2000)})"
        style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:13px;font-weight:600;cursor:pointer">📋 Copy link</button>
      <button onclick="window.open('mailto:?subject=Join+my+Toto+household&body=Hi!+I\\'ve+invited+you+to+join+my+Toto+household.+Click+here+to+accept:+${encodeURIComponent(o)}','_blank')"
        style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:13px;font-weight:600;cursor:pointer">✉️ Email</button>
    </div>
    <button onclick="this.closest('div[style*=\"position:fixed\"]').remove();renderSettings()"
      style="width:100%;padding:10px;border:none;border-radius:8px;background:#0d9488;color:#fff;font-size:14px;font-weight:700;cursor:pointer">Done</button>
  </div>`,document.body.appendChild(c),c.addEventListener(`click`,e=>{e.target===c&&(c.remove(),Pi())})}function Cl(e){if(!e)return;let t=(a.kids?.profiles||[]).find(t=>t.name&&t.name.toLowerCase()===e.toLowerCase());if(!t){a.kids||(a.kids={profiles:[],chores:[],prizes:[],completions:[],redemptions:[]});let n=(a.householdProfile.members||[]).find(t=>t.name&&t.name.toLowerCase()===e.toLowerCase()),r=D(a.kids.profiles);t={id:r,name:e,age:n?.age||null,emoji:n?.emoji||`🧒`},a.kids.profiles.push(t),a.meals?.lunchbox?.profiles||(a.meals||(a.meals={}),a.meals.lunchbox||(a.meals.lunchbox={profiles:[]})),a.meals.lunchbox.profiles.push({id:r,name:e,emoji:t.emoji}),K(a)}Ql(t.id)}function wl(e){navigator.clipboard.writeText(Tl(e)).then(()=>{let e=event.target,t=e.textContent;e.textContent=`✓ Copied!`,setTimeout(()=>{e.textContent=t},2e3)})}function Tl(e){let t=yc()||``;return window.location.origin+window.location.pathname+`?invite=`+e+`&h=`+t}function El(){let e=document.getElementById(`invite-link-wrap`)?.dataset.invToken||vl;e&&navigator.clipboard.writeText(Tl(e)).then(()=>{let e=event.target,t=e.textContent;e.textContent=`✓ Copied!`,setTimeout(()=>{e.textContent=t},2e3)})}function Dl(){let e=document.getElementById(`invite-link-wrap`),t=e?.dataset.invToken||vl,n=e?.dataset.invEmail||``;if(!t)return;let r=(a.householdProfile.invites||[]).find(e=>e.id===t)?.inviterName||`Your partner`,i=Tl(t),o=encodeURIComponent(`${r} invited you to join their Toto household`),s=encodeURIComponent(`Hi,\n\n${r} has invited you to join their Toto household — a shared family finance and planning app.\n\nClick the link below to accept the invite (expires in 7 days):\n\n${i}\n\nSee you there!`);window.open(`mailto:${n}?subject=${o}&body=${s}`,`_blank`)}function Ol(e){if(!confirm(`Revoke this invite link?`))return;let t=(a.householdProfile.invites||[]).find(t=>t.id===e);t&&(t.status=`revoked`),K(a),Pi()}var kl=`toto_pending_invite`;function Al(){let e=new URLSearchParams(window.location.search),t=e.get(`invite`),n=e.get(`h`);t&&(sessionStorage.setItem(kl,t),n&&sessionStorage.setItem(vc,n),window.history.replaceState({},``,window.location.pathname+window.location.hash))}function jl(){let e=sessionStorage.getItem(kl);if(!e)return;let t=(a.householdProfile.invites||[]).find(t=>t.id===e);if(!t){sessionStorage.removeItem(kl);return}if(t.status!==`pending`||new Date(t.expiresAt)<new Date){sessionStorage.removeItem(kl),Ul(t);return}sessionStorage.removeItem(kl),yl=t,Ml(t)}function Ml(t){let n=a.householdProfile.members||[],r=n.filter(e=>e.role===`adult`),i=n.filter(e=>e.role===`child`),o=(()=>{let t=new Date,n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`,r=getOrCreateMonthData(n);return(r.income||[]).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)-(r.expenses||[]).filter(e=>!e.skipped).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)})(),s=[...r.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ecfeff,#ccfbf1);display:flex;align-items:center;justify-content:center;font-size:20px">👤</div>
        <div><div style="font-size:14px;font-weight:600">${f(e.name||`Adult`)}</div><div style="font-size:12px;color:#64748b">Adult · Owner</div></div>
      </div>`),...i.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#fef9c3,#fde68a);display:flex;align-items:center;justify-content:center;font-size:20px">${e.emoji||`🧒`}</div>
        <div><div style="font-size:14px;font-weight:600">${f(e.name||`Kid`)}</div><div style="font-size:12px;color:#64748b">Kid · age ${e.age||`?`}</div></div>
      </div>`)].join(``);Wl(`
    <div style="text-align:center;font-size:56px;margin-bottom:20px;margin-top:8px">🏡</div>
    <div style="font-size:22px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:6px;line-height:1.3">${f(t.inviterName||`Someone`)} invited you to join their Toto household</div>
    <div style="font-size:14px;color:#64748b;text-align:center;margin-bottom:28px">You'll get shared access to budget, meals, kids &amp; home — everything in one place.</div>

    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:20px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin-bottom:12px">Your household</div>
      ${s}
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0">
        <div style="width:40px;height:40px;border-radius:50%;border:2px dashed #0d9488;display:flex;align-items:center;justify-content:center;font-size:20px;color:#0d9488">+</div>
        <div><div style="font-size:14px;font-weight:600;color:#0d9488">You — joining now</div><div style="font-size:12px;color:#64748b">New member</div></div>
      </div>
    </div>

    ${o===0?``:`
    <div style="display:flex;gap:12px;margin-bottom:20px">
      <div style="flex:1;background:#f0fdf4;border-radius:12px;padding:14px;text-align:center">
        <div style="font-size:20px;font-weight:700;color:#16a34a">$${Math.abs(o).toLocaleString()}</div>
        <div style="font-size:11px;color:#64748b;margin-top:2px">monthly ${o>=0?`surplus`:`deficit`}</div>
      </div>
    </div>`}

    ${t.email?`<div style="font-size:12px;color:#94a3b8;text-align:center;margin-bottom:16px">Invite sent to <strong style="color:#475569">${f(t.email)}</strong> · Expires ${new Date(t.expiresAt).toLocaleDateString()}</div>`:``}

    <button onclick="_acceptInviteAndContinue()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:10px">Accept invite →</button>
    <div style="text-align:center"><a href="#" onclick="event.preventDefault();_dismissInviteFlow()" style="font-size:13px;color:#94a3b8;text-decoration:none">Not you? Ignore this invite</a></div>
  `)}function Nl(){let t=yl,n=G?.displayName?.split(` `)[0]||`there`,r=a.householdProfile.members||[],i=r.filter(e=>e.role===`adult`),o=r.filter(e=>e.role===`child`),s=(()=>{let t=new Date,n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`,r=getOrCreateMonthData(n);return(r.income||[]).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)-(r.expenses||[]).filter(e=>!e.skipped).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)})(),c=(a.goals||[]).length,l=[...i.map((e,t)=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ecfeff,#ccfbf1);display:flex;align-items:center;justify-content:center;font-size:20px">👤</div>
        <div>
          <div style="font-size:14px;font-weight:600">${f(e.name||`Adult`)}${t===i.length-1?` — <span style="color:#0d9488">that's you!</span>`:``}</div>
          <div style="font-size:12px;color:#64748b">${t===0?`Owner · set up the household`:`Member · just joined`}</div>
        </div>
      </div>`),...o.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#fef9c3,#fde68a);display:flex;align-items:center;justify-content:center;font-size:20px">${e.emoji||`🧒`}</div>
        <div><div style="font-size:14px;font-weight:600">${f(e.name||`Kid`)}</div><div style="font-size:12px;color:#64748b">Kid · age ${e.age||`?`}</div></div>
      </div>`)].join(``);Wl(`
    <div style="text-align:center;font-size:56px;margin-bottom:12px;margin-top:8px">🎉</div>
    <div style="font-size:24px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:6px">You're in, ${f(n)}!</div>
    <div style="font-size:14px;color:#64748b;text-align:center;margin-bottom:24px">Welcome to ${f(t?.inviterName||`the`)}'s Toto household.</div>

    <div style="background:#f0fdfa;border:1px solid #ccfbf1;border-radius:16px;padding:20px;margin-bottom:20px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#0d9488;margin-bottom:10px">Your household</div>
      ${l}
    </div>

    <div style="display:flex;gap:12px;margin-bottom:24px">
      ${s===0?``:`<div style="flex:1;background:#f8fafc;border-radius:12px;padding:14px;text-align:center;border:1px solid #e2e8f0"><div style="font-size:20px;font-weight:700;color:#16a34a">$${Math.abs(s).toLocaleString()}</div><div style="font-size:11px;color:#64748b">monthly ${s>=0?`surplus`:`deficit`}</div></div>`}
      ${c>0?`<div style="flex:1;background:#f8fafc;border-radius:12px;padding:14px;text-align:center;border:1px solid #e2e8f0"><div style="font-size:20px;font-weight:700;color:#0d9488">${c}</div><div style="font-size:11px;color:#64748b">goal${c===1?``:`s`} tracked</div></div>`:``}
    </div>

    <button onclick="_showInviteA4()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer">Take a quick tour →</button>
  `)}var Pl=0,Fl=[{emoji:`💰`,title:`The Kitty`,desc:`Budget, bills, goals & net worth. See where the money goes each month.`},{emoji:`📅`,title:`Plan`,desc:`Weekly planner, meal plans & the kids' lunchboxes. One place for the week ahead.`},{emoji:`🏠`,title:`Home`,desc:`Documents, vehicles & maintenance reminders. Never miss a rego or warranty renewal.`}];function Il(){Pl=0,Ll()}function Ll(){let e=Fl[Pl],t=Fl.map((e,t)=>`<div style="width:${t===Pl?20:8}px;height:8px;border-radius:99px;background:${t===Pl?`#0d9488`:`#e2e8f0`};transition:all .2s"></div>`).join(``),n=Pl===Fl.length-1;Wl(`
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
  `)}function Rl(){Wl(`
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
  `)}function zl(){let e=document.getElementById(`inv-inc-name`)?.value.trim()||``,t=parseFloat(document.getElementById(`inv-inc-amount`)?.value)||0,n=document.getElementById(`inv-inc-freq`)?.value||`Monthly`;(e||t)&&(a.budget.income||(a.budget.income=[]),a.budget.income.push({id:D(a.budget.income),name:e,amount:t,frequency:n}),K(a)),Hl()}function Bl(){let e=yl;if(!G){sessionStorage.setItem(`toto_post_invite_action`,e?.id||``),Ec();return}Vl(e),Nl()}function Vl(e){if(!e)return;e.status=`accepted`;let t=G,n=yc();n&&xc(n),a.householdProfile.authorizedUsers||(a.householdProfile.authorizedUsers=[]),a.householdProfile.authorizedUsers.some(e=>e.uid===t.uid)||a.householdProfile.authorizedUsers.push({uid:t.uid,name:t.displayName||``,email:t.email||``,role:e.role||`member`,joinedAt:new Date().toISOString()});let r=a.householdProfile.members||[],i=(t.displayName||``).split(` `)[0];i&&!r.some(e=>e.name===i)&&a.householdProfile.members.push({role:`adult`,name:i,age:null}),K(a)}function Hl(){yl=null,Gl(),renderAll(),al()}function Ul(e){Wl(`
    <div style="text-align:center;margin-top:40px">
      <div style="font-size:56px;margin-bottom:16px">⏰</div>
      <div style="font-size:20px;font-weight:800;color:#1e293b;margin-bottom:8px">This invite has expired</div>
      <div style="font-size:14px;color:#64748b;margin-bottom:24px">The 7-day window has passed. Ask ${f(e?.inviterName||`the household owner`)} to send a new invite link.</div>
      <button onclick="_dismissInviteFlow()" style="background:#0d9488;color:#fff;border:none;border-radius:12px;padding:12px 28px;font-size:14px;font-weight:700;cursor:pointer">OK</button>
    </div>
  `)}function Wl(e){document.getElementById(`invite-flow-content`).innerHTML=e;let t=document.getElementById(`invite-flow-overlay`);t.classList.remove(`hidden`),t.style.display=`flex`,t.scrollTop=0}function Gl(){let e=document.getElementById(`invite-flow-overlay`);e.classList.add(`hidden`),e.style.display=``}var Kl=`toto_pin_hard_`,ql=`toto_pin_att_`,Jl=null,X=`gate`,Yl=``,Z=``,Xl=0,Zl=null;function Ql(e){let t=(a.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(Jl=e,Z=``,Yl=``,X=t.pinHash?`enter`:`gate`,eu(),document.getElementById(`pin-setup-overlay`).classList.remove(`hidden`))}function $l(){Zl&&(clearInterval(Zl),Zl=null),document.getElementById(`pin-setup-overlay`).classList.add(`hidden`),Jl=null}function eu(){let e=(a.kids?.profiles||[]).find(e=>String(e.id)===String(Jl));if(!e)return;let t=document.getElementById(`pso-screen`);if(!t)return;let n=e.emoji||`🧒`,r=f(e.name),i={gate:`#f8fafc`,hello:`linear-gradient(160deg,#f0fdfa,#ecfeff)`,enter:`#f8fafc`,confirm:`#f8fafc`,tour:`#f8fafc`};if(document.getElementById(`pin-setup-overlay`).style.background=i[X]||`#f8fafc`,X===`gate`)t.innerHTML=`
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
      <button onclick="closePinSetupOverlay()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`;else if(X===`hello`)t.innerHTML=`
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
      </button>`;else if(X===`enter`||X===`confirm`){let n=X===`enter`,i=n?e.pinHash?`Change ${r}'s PIN`:`Choose your secret code 🔢`:`Type it again ✅`,a=n?`Pick 4 numbers only you know!`:`Just to make sure!`,o=[0,1,2,3].map(e=>{let t=e<Z.length;return`<div style="width:52px;height:60px;border:2px solid ${t?`#0d9488`:`#e2e8f0`};border-radius:10px;background:${t?`#f0fdfa`:`#f8fafc`};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#0d9488">${t?`●`:``}</div>`}).join(``),s=[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<div></div>`:`<div onclick="_psoKey('${e}')" style="height:52px;border:1.5px solid #e2e8f0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;color:#374151;cursor:pointer;background:#fff;-webkit-tap-highlight-color:transparent;user-select:none">${e}</div>`).join(``);t.innerHTML=`
      <div style="font-size:40px;margin-bottom:12px">${n?`🔢`:`✅`}</div>
      <div style="font-size:18px;font-weight:700;color:#1e293b;margin-bottom:6px">${i}</div>
      <div style="font-size:13px;color:#64748b;margin-bottom:20px">${a}</div>
      <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px">${o}</div>
      <div id="pso-error" style="font-size:13px;color:#ef4444;min-height:18px;margin-bottom:12px"></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:220px;margin:0 auto 20px">${s}</div>
      <button onclick="closePinSetupOverlay()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`}else if(X===`tour`){let e=[{bg:`linear-gradient(160deg,#fef9c3,#fde68a)`,emoji:`⭐`,titleCol:`#92400e`,title:`Earn coins!`,body:`Do your chores to collect coins.<br>Save up for prizes!`,bodyCol:`#78350f`},{bg:`linear-gradient(160deg,#ede9fe,#ddd6fe)`,emoji:`🏆`,titleCol:`#5b21b6`,title:`Prize store`,body:`See what you can win and how<br>many coins you need.`,bodyCol:`#4c1d95`},{bg:`linear-gradient(160deg,#ecfeff,#cffafe)`,emoji:`🍱`,titleCol:`#0e7490`,title:`Lunchbox`,body:`See what's in your lunchbox<br>each day this week.`,bodyCol:`#155e75`}],n=e[Xl],r=Xl===e.length-1,i=e.map((e,t)=>`<div style="width:${t===Xl?20:8}px;height:8px;border-radius:99px;background:${t===Xl?`#0d9488`:`#e2e8f0`};transition:all .2s"></div>`).join(``);document.getElementById(`pin-setup-overlay`).style.background=n.bg,t.innerHTML=`
      <div style="font-size:72px;margin-bottom:16px">${n.emoji}</div>
      <div style="font-size:22px;font-weight:800;color:${n.titleCol};margin-bottom:10px">${n.title}</div>
      <div style="font-size:15px;color:${n.bodyCol};margin-bottom:32px;line-height:1.6">${n.body}</div>
      <div style="display:flex;justify-content:center;gap:6px;margin-bottom:28px">${i}</div>
      <button onclick="${r?`_psoTourDone()`:`_psoTourSlide++;_psoRender()`}"
        style="width:100%;padding:15px;background:#0d9488;color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin-bottom:10px">
        ${r?`Done! →`:`Next →`}
      </button>
      ${r?``:`<button onclick="_psoTourDone()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Skip</button>`}`}}function tu(){if(Zl)return;let e=0,t=document.getElementById(`pso-hold-fill`);t&&(t.style.transition=`none`,t.style.transform=`scaleX(0)`),Zl=setInterval(()=>{e+=50;let n=Math.min(e/2e3,1);t&&(t.style.transition=`none`,t.style.transform=`scaleX(${n})`),e>=2e3&&(clearInterval(Zl),Zl=null,X=`hello`,eu())},50)}function nu(){Zl&&(clearInterval(Zl),Zl=null);let e=document.getElementById(`pso-hold-fill`);e&&(e.style.transition=`transform .3s`,e.style.transform=`scaleX(0)`)}function ru(e){if(e===`⌫`){Z=Z.slice(0,-1),eu();return}Z.length>=4||(Z+=e,eu(),Z.length===4&&iu())}async function iu(){if(X===`enter`)Yl=Z,Z=``,X=`confirm`,eu();else if(X===`confirm`){if(Z!==Yl){Z=``,Yl=``,X=`enter`,eu();let e=document.getElementById(`pso-error`);e&&(e.textContent=`Those didn't match — try again 🙈`);return}await setKidPin(Jl,Z);let e=(a.kids?.profiles||[]).find(e=>String(e.id)===String(Jl));e&&!e._pinWasSet?(Xl=0,X=`tour`,eu()):($l(),renderKids(),Pi()),e._pinWasSet=!0}}function au(){let e=(a.kids?.profiles||[]).find(e=>String(e.id)===String(Jl));$l(),e&&showChildView(e.id)}function ou(e){return parseInt(Jc(ql+e)||`0`)}function su(e){let t=ou(e)+1;return Yc(ql+e,String(t)),t}function cu(e){Xc(ql+e),Xc(Kl+e)}function lu(e){return Jc(Kl+e)===`1`}function uu(e){Yc(Kl+e,`1`)}async function du(){let e=await il(Y,yc());if(typeof Wc==`string`&&Wc.startsWith(`adult:`)){let t=parseInt(Wc.split(`:`)[1]),n=(a.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name)[t];if(!n)return;e===n.pinHash?(J=0,q=null,nl(),document.getElementById(`pin-overlay`).classList.add(`hidden`),gl()):(J++,Y=``,fl(),J>=3?(Uc=Date.now()+3e4,J=0,pl()):document.getElementById(`pin-error`).textContent=`Wrong PIN — ${3-J} tr${3-J==1?`y`:`ies`} left`);return}let t=(a.kids?.profiles||[]).find(e=>e.id===Wc);if(t){if(lu(t.id)){document.getElementById(`pin-error`).textContent=`PIN locked — ask mum or dad to reset it 🔒`,document.getElementById(`pin-pad`).innerHTML=``,fu(t);return}if(e===t.pinHash)cu(t.id),J=0,q={id:t.id,name:t.name,emoji:t.emoji,role:`child`},tl(t.id),document.getElementById(`pin-overlay`).classList.add(`hidden`),gl();else if(Y=``,fl(),J++,su(t.id)>=10)uu(t.id),Uc=0,document.getElementById(`pin-error`).textContent=`PIN locked — ask mum or dad to reset it 🔒`,document.getElementById(`pin-pad`).innerHTML=``,fu(t);else if(J>=3)Uc=Date.now()+3e4,J=0,pl();else{let e=3-J;document.getElementById(`pin-error`).textContent=`Wrong PIN — ${e} try${e===1?``:`s`} left`}}}function fu(e){a.notifications||(a.notifications=[]),a.notifications.some(t=>t.type===`pin-lock`&&t.kidId===e.id)||(a.notifications.unshift({id:uid(),type:`pin-lock`,kidId:e.id,msg:`${e.name}'s PIN has been locked after too many failed attempts. Reset it in Settings → Household.`,ts:new Date().toISOString(),read:!1}),K(a))}function pu(e){cu(e),J=0,Uc=0,Pi()}function Q(e){return a.budget.months&&a.budget.months[e]||{income:a.budget.income,expenses:a.budget.expenses}}function mu(e){return!!(a.budget.months&&a.budget.months[e])}function hu(e){return a.budget.months||(a.budget.months={}),a.budget.months[e]||(a.budget.months[e]={income:JSON.parse(JSON.stringify(a.budget.income)),expenses:JSON.parse(JSON.stringify(a.budget.expenses))}),a.budget.months[e]}function gu(e){let[t,n]=e.split(`-`).map(Number),r=new Date(t,n-2,1);return`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,`0`)}`}function _u(e){let t=gu(e),n=Q(t);a.budget.months||(a.budget.months={}),a.budget.months[e]={income:JSON.parse(JSON.stringify(n.income.filter(e=>e.recurring!==!1))),expenses:JSON.parse(JSON.stringify(n.expenses.filter(e=>e.recurring!==!1)))},Tc(`Auto-filled`,`${wu(e)} copied from ${wu(t)}`),K(a),safeRender(yo),safeRender(pi)}var vu=null;function yu(e,t){vu={onThisMonth:e,onAllMonths:t};let n=wu($);document.getElementById(`modal-title`).textContent=`Apply changes`,document.getElementById(`modal-body`).innerHTML=`
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Apply this change to <strong style="color:var(--text)">${n}</strong> only,
      or update the default for all months?
    </p>
    ${mu($)?`<p style="font-size:12px;color:var(--primary);margin-top:10px;margin-bottom:0">
      <em>${n}</em> already has its own custom budget.</p>`:``}
  `,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="doScopeAll()">Apply to all months</button>
    <button class="btn btn-primary" onclick="doScopeMonth()">Apply to ${n}</button>
  `,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function bu(){vu&&(vu.onThisMonth(),vu=null),H()}function xu(){vu&&(vu.onAllMonths(),vu=null),H()}i(zc()),Al(),setTimeout(()=>{try{_routineCheckDailyReset()}catch{}},0);var $=new Date().toISOString().slice(0,7);new Date().getFullYear(),new Date().getMonth()+1;function Su(){let[e,t]=$.split(`-`).map(Number),n=new Date(e,t-2,1);$=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,yo()}function Cu(){let[e,t]=$.split(`-`).map(Number),n=new Date(e,t,1);if($=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,a.settings&&a.settings.autoFillMonths&&!mu($)){_u($);return}yo()}function wu(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}function Tu(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`short`,year:`2-digit`})}function Eu(){let e=[],t=new Date;for(let n=5;n>=0;n--){let r=new Date(t.getFullYear(),t.getMonth()-n,1);e.push(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,`0`)}`)}return e}function Du(e,t){let n=(a.budget.actuals[t]||{})[e];return n?typeof n==`number`?[{id:1,amount:n,date:``,note:``}]:Array.isArray(n)?n:[]:[]}function Ou(e,t){return Du(e,t).reduce((e,t)=>e+(t.amount||0),0)}function ku(e,t,n){a.budget.actuals[t]||(a.budget.actuals[t]={});let r=Du(e,t);r.length===1&&!r[0].date&&!r[0].note?a.budget.actuals[t][e]=[{...r[0],amount:n}]:a.budget.actuals[t][e]=[{id:1,amount:n,date:``,note:``}],K(a)}function Au(e){let t=Q($).expenses.find(t=>t.id===e);if(!t)return;let n=T(t);function r(){let t=Du(e,$),r=t.reduce((e,t)=>e+(t.amount||0),0),i=n>0?Math.round(r/n*100):0,a=i>=100?`var(--danger)`:i>=80?`var(--warning)`:`var(--success)`;return`
      <div style="background:var(--surface2);border-radius:8px;padding:12px 14px;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
          <span style="font-size:13px;color:var(--text-muted)">Budgeted this month</span>
          <span style="font-weight:700;font-size:15px">${g(n)}</span>
        </div>
        <div style="background:var(--border);border-radius:99px;height:8px;overflow:hidden;margin-bottom:6px">
          <div style="height:100%;width:${Math.min(100,i)}%;background:${a};border-radius:99px"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:12px">
          <span style="font-weight:600;color:${a}">${g(r)} spent · ${i}%</span>
          <span style="color:${i>=100?`var(--danger)`:`var(--text-muted)`}">${i>=100?`Over by `+g(r-n):g(n-r)+` remaining`}</span>
        </div>
      </div>
      ${t.length>0?`
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:8px">Entries</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${t.map((t,n)=>`
          <div style="display:flex;align-items:center;gap:10px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:8px 12px">
            <div style="flex:1">
              <span style="font-weight:600;font-size:13px">${g(t.amount)}</span>
              ${t.date?`<span style="font-size:12px;color:var(--text-muted);margin-left:8px">${y(t.date)}</span>`:``}
              ${t.note?`<span style="font-size:12px;color:var(--text-muted);margin-left:8px">— ${f(t.note)}</span>`:``}
            </div>
            <button onclick="removeActualEntry(${e},${n})" style="background:none;border:none;cursor:pointer;color:var(--danger);font-size:16px;line-height:1;padding:0 2px">&times;</button>
          </div>`).join(``)}
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 12px 0;font-size:13px;font-weight:700;border-top:1px solid var(--border);margin-top:8px">
          <span>Total</span><span>${g(r)}</span>
        </div>
      </div>`:`<p style="font-size:13px;color:var(--text-muted);margin-bottom:14px">No entries yet for ${wu($)}.</p>`}
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
    `}function i(){document.getElementById(`actual-editor-body`).innerHTML=r()}window._actualEditorRefresh=i,document.getElementById(`modal-title`).textContent=`Actuals — ${t.name}`,document.getElementById(`modal-body`).innerHTML=`<div id="actual-editor-body">${r()}</div>`,document.getElementById(`modal-footer`).innerHTML=`<button class="btn btn-primary" onclick="closeModal();renderBudget()">Done</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function ju(e){let t=parseFloat(document.getElementById(`ae-amount`).value);if(!t||t<=0)return;let n=document.getElementById(`ae-date`).value||``,r=document.getElementById(`ae-note`).value.trim();a.budget.actuals[$]||(a.budget.actuals[$]={});let i=Du(e,$);i.push({id:i.length?Math.max(...i.map(e=>e.id))+1:1,amount:t,date:n,note:r}),a.budget.actuals[$][e]=i,K(a),window._actualEditorRefresh&&window._actualEditorRefresh()}function Mu(e,t){if(!a.budget.actuals[$])return;let n=Du(e,$);n.splice(t,1),a.budget.actuals[$][e]=n,K(a),window._actualEditorRefresh&&window._actualEditorRefresh()}function Nu(e){Au(e)}function Pu(){let e=Q($),t=E(e.income),n=E(e.expenses),r=t-n,i=t>0?r/t:null,o;o=t===0?10:i>=.2?20:i>=0?Math.round(i/.2*20):0;let s=Eu().slice(3),c=0,l=0;s.forEach(e=>{let t=Q(e);t.expenses.some(t=>Du(t.id,e).length>0)&&(c++,t.expenses.reduce((t,n)=>t+Ou(n.id,e),0)<=E(t.expenses)&&l++)});let u=c===0?5:Math.round(c/3*10+l/c*10),d=(a.netWorth.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),f=(a.netWorth.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),p=d-f,m;if(d===0&&f===0)m=10;else if(p<=0)m=3;else{let e=f>0?f/d:0;m=e<.3?20:e<.6?15:e<.8?10:6}let h;if(n===0)h=10;else{let e=d/n;h=e>=6?20:e>=3?15:e>=1?8:d===0?5:3}let _=(a.goals||[]).filter(e=>e.status!==`achieved`),v;if(_.length===0)v=8;else{let e=_.reduce((e,t)=>e+Math.min((t.saved||0)/(t.target||1),1),0)/_.length;v=10+Math.round(e*10)}let y=o+u+m+h+v,b=y>=85?`A`:y>=70?`B`:y>=55?`C`:y>=40?`D`:`F`,x=y>=80?`#10b981`:y>=60?`#f59e0b`:y>=40?`#f97316`:`#ef4444`,S=[...[{score:o,tip:`Boost your savings rate — aim for 20%+ of income (currently ${t>0?Math.round((i||0)*100):0}%)`},{score:u,tip:`Log actuals monthly in the Budget tab to stay on track`},{score:m,tip:`Reduce liabilities or grow assets to strengthen your net worth`},{score:h,tip:`Build an emergency fund of 3–6 months expenses (${g(n*3)}–${g(n*6)})`},{score:v,tip:`Set specific savings goals in the Goals tab to stay focused`}]].sort((e,t)=>e.score-t.score)[0];return{total:y,grade:b,color:x,insight:S.score<12?S.tip:`Great shape — stay consistent and keep building your financial cushion.`,dimensions:[{label:`Savings Rate`,score:o,max:20},{label:`Budget Tracking`,score:u,max:20},{label:`Net Worth`,score:m,max:20},{label:`Emergency Buffer`,score:h,max:20},{label:`Goals`,score:v,max:20}]}}var Fu={Wallet:`#059669`,Plan:`#0891b2`,Home:`#7c3aed`};function Iu(e){return e?`<span style="font-size:10px;font-weight:700;color:${Fu[e]||`#71717a`};margin-right:6px">${e}</span>`:``}function Lu(e){let t={red:`#ef4444`,amber:`#f59e0b`,green:`#10b981`,blue:`#0891b2`}[e.cls]||`#a1a1aa`,n=e.onclick?e.onclick:e.tab?`activateTab('${e.tab}')`:``;return`<div class="notif-tl-item">
    <div class="notif-tl-dot" style="background:${t}"></div>
    <div class="notif-tl-body"><div class="notif-tl-title">${Iu(e.section)}${e.title}</div>${e.sub?`<div class="notif-tl-sub">${e.sub}</div>`:``}</div>
    <div class="notif-tl-action" onclick="${n}">${e.action.replace(` →`,``)}</div>
  </div>`}function Ru(e){let t=[];return e===`budget`&&Q($).expenses.forEach(e=>{let n=T(e),r=Ou(e.id,$);n>0&&r/n>=.8&&r<n?t.push({cls:`amber`,text:`${f(e.name)} at ${Math.round(r/n*100)}% — ${g(n-r)} left`,tab:null}):n>0&&r>=n&&t.push({cls:`red`,text:`${f(e.name)} over budget by ${g(r-n)}`,tab:null})}),t.slice(0,2).map(e=>`<div class="notif-banner ${e.cls}">
      <div class="notif-banner-dot" style="background:${e.cls===`red`?`#ef4444`:`#f59e0b`}"></div>
      <div class="notif-banner-body" style="color:${e.cls===`red`?`#991b1b`:`#92400e`}">${e.text}</div>
    </div>`).join(``)}function zu(){let e=[],t=new Date,r=$,i=(a.householdProfile?.members||[]).filter(e=>e.role===`adult`),o=a.kids?.profiles||[],s=o.length>0,c=Math.max(1,i.length)+o.length,l=Q(r),u=l.income.length>0,d=l.expenses.length>0,f=l.expenses.some(e=>Du(e.id,r).length>0),p=(u?30:0)+(d?30:0)+(f?40:0);e.push({key:`budget`,label:`Budget`,score:p,tip:u?d?f?`On track`:`Log actual spending this month`:`Add your expenses`:`Add your income sources`,tab:`budget`});let m=vr(0),h=a.meals?.plan?.[m]||{},g=0,_=c===1?7:c<=3?14:21;for(let e=0;e<7;e++){let t=h[e]||{};c===1?t.d&&g++:c<=3?(t.l&&g++,t.d&&g++):(t.b&&g++,t.l&&g++,t.d&&g++)}let v=Math.round(g/_*80),y=a.lists?.food?.items||[],b=y.filter(e=>e.state===`active`).length,x=y.filter(e=>e.state===`got_it`).length,S=b>0||x>0,C=v+(S?20:0);e.push({key:`meals`,label:`Meals`,score:Math.min(100,C),tip:g===0?`Plan this week's meals`:g<_?`${g}/${_} meals planned`:S?`Meals sorted`:`Add items to your shopping list`,tab:`meals`});let w=a.maintenance||[],T=w.filter(e=>{let t=pe(e);return t!==null&&t<0}).length,E=w.length===0?30:Math.max(0,100-T*25),D=a.vehicles||[],ee=D.filter(e=>!!(e.regoExpiry&&Math.ceil((new Date(e.regoExpiry)-t)/864e5)<30||e.insurance?.renewalDate&&Math.ceil((new Date(e.insurance.renewalDate)-t)/864e5)<30)).length,O=a.documents||[],k=O.filter(e=>e.expiryDate&&Math.ceil((new Date(e.expiryDate)-t)/864e5)<30).length,te=D.length>0?.3:0,A=.3,ne=1-te-A,re=Math.max(0,Math.min(100,Math.round(E*ne+(D.length>0?Math.max(0,100-ee*30)*te:0)+(O.length>0?Math.max(0,100-k*20):50)*A)));if(e.push({key:`home`,label:`Home`,score:re,tip:T>0?`${T} maintenance overdue`:ee>0?`Vehicle rego or insurance expiring`:k>0?`Documents expiring soon`:w.length===0?`Add maintenance items to track`:`Home is sorted`,tab:`maintenance`}),s){let t=a.meals?.lunchbox?.plans||{},n=vr(0),r=0,i=o.length*20;o.forEach(e=>{let i=(t[n]||{})[e.id]||{};for(let e=0;e<5;e++){let t=i[e]||{};t.main&&r++,t.snack&&r++,t.fruit&&r++,t.drink&&r++}}),typeof _routineTodayKey==`function`?_routineTodayKey():new Date().toISOString().slice(0,10).replace(/-/g,``);let s=a.kids?.chores||[],c=a.kids?.completions||[],l=c.filter(e=>e.status===`pending`).length,u=c.filter(e=>e.status===`approved`&&e.completedAt?.startsWith(new Date().toISOString().slice(0,10))).length,d=s.length===0?50:Math.max(0,100-l*10+u*5),f=i>0?Math.round(r/i*100):50,p=Math.min(100,Math.round(f*.5+Math.min(100,d)*.5));e.push({key:`family`,label:`Family`,score:p,tip:r===0?`Plan school lunches this week`:l>0?`${l} chore approval${l===1?``:`s`} waiting`:`Family is sorted`,tab:`kids`})}let j=a.goals||[],ie=j.filter(e=>e.status===`active`),M=ie.length>0?ie.reduce((e,t)=>e+Math.min((t.saved||t.currentAmount||0)/(t.target||t.targetAmount||1),1),0)/ie.length*100:0,ae=j.length===0?20:Math.round(30+M*.7);e.push({key:`goals`,label:`Goals`,score:Math.min(100,ae),tip:j.length===0?`Set a savings or spending goal`:M<30?`Make progress on your goals`:`Goals progressing well`,tab:`goals`});let N=typeof _routinesForCurrentUser==`function`?_routinesForCurrentUser():[];if(N.length>0){let t=typeof _routineTodayKey==`function`?_routineTodayKey():new Date().toISOString().slice(0,10).replace(/-/g,``),n=N.filter(e=>{let n=(e.completions?.[t]||[]).length;return e.steps.length>0&&n===e.steps.length}),r=Math.round(n.length/N.length*100),i=N.reduce((e,t)=>{let n=typeof _routineStreak==`function`?_routineStreak(t):0;return Math.max(e,n)},0),a=Math.min(40,Math.round(i/10*40)),o=Math.min(100,20+Math.round(r*.4)+a);e.push({key:`habits`,label:`Habits`,score:o,tip:n.length===0?`Complete a routine today`:i<3?`Keep your streak going`:`${i}-day streak — keep it up`,tab:`routines`})}let oe=new Date().toISOString().slice(0,10),se=new Date(Date.now()+7*864e5).toISOString().slice(0,10),ce=(a.planner?.events||[]).filter(e=>e.date>=oe&&e.date<=se).length,le=(a.bills||[]).filter(e=>{let t=n(e);return t!==null&&t<0}).length,ue=(a.documents||[]).filter(e=>e.expiryDate&&new Date(e.expiryDate)<t).length,de=Math.min(100,Math.round((ce>0?40:10)+Math.max(0,30-le*15)+Math.max(0,30-ue*15)));return e.push({key:`plan`,label:`Plan`,score:de,tip:le>0?`${le} bill${le===1?``:`s`} overdue`:ue>0?`${ue} document${ue===1?``:`s`} expired`:ce===0?`Add something to your calendar`:`Plan looks good`,tab:`planner`}),{total:Math.round(e.reduce((e,t)=>e+t.score,0)/e.length),dims:e}}function Bu(){let e=zu();new Date().toISOString().slice(0,10);let t=a.settings?.typeADismissedMission||``,n=[...e.dims].sort((e,t)=>e.score-t.score),r=[];return n.forEach(e=>{if(e.key===`budget`&&e.score<70&&(Q($).income.length?Q($).expenses.length?r.push({id:`log-actuals`,title:`Log this month's actual spending`,sub:`Import a bank statement or add manually`,tab:`budget`,impact:30}):r.push({id:`add-expenses`,title:`Set up your monthly expenses`,sub:`List your regular costs`,tab:`budget`,impact:35}):r.push({id:`add-income`,title:`Add your income sources`,sub:`Takes about 1 minute`,tab:`budget`,impact:40})),e.key===`meals`&&e.score<70){let e=vr(0),t=a.meals?.plan?.[e]||{},n=Object.values(t).filter(e=>e.d).length,i=(a.lists?.food?.items||[]).filter(e=>e.state===`active`).length;n<3?r.push({id:`plan-dinners`,title:`Plan this week's dinners`,sub:`Just the evening meals — takes 2 minutes`,tab:`meals`,impact:25}):i===0&&r.push({id:`shopping-list`,title:`Add items to your shopping list`,sub:`Start with essentials you need this week`,tab:`lists`,impact:15})}if(e.key===`home`&&e.score<70){let e=(a.maintenance||[]).filter(e=>{let t=pe(e);return t!==null&&t<0});e.length?r.push({id:`maint-overdue`,title:`Clear overdue: ${f(e[0].name)}`,sub:`Mark it done or reschedule`,tab:`maintenance`,impact:20}):(a.maintenance||[]).length||r.push({id:`setup-maint`,title:`Set up household maintenance`,sub:`Add items like gutters, pest control, smoke alarms`,tab:`maintenance`,impact:20})}if(e.key===`family`&&e.score<70){let e=(a.kids?.completions||[]).filter(e=>e.status===`pending`).length,t=a.kids?.profiles||[];e>0?r.push({id:`approve-chores`,title:`Review ${e} chore approval${e===1?``:`s`}`,sub:`Kids are waiting for your sign-off`,tab:`kids`,impact:20}):t.length>0&&r.push({id:`plan-lunchbox`,title:`Plan school lunches this week`,sub:`AI can do it in one tap`,tab:`lunchbox`,impact:18})}if(e.key===`goals`&&e.score<50&&((a.goals||[]).length||r.push({id:`add-goal`,title:`Set your first savings goal`,sub:`Holiday fund, emergency savings, or debt payoff`,tab:`goals`,impact:15})),e.key===`habits`&&e.score<70&&((typeof _routinesForCurrentUser==`function`?_routinesForCurrentUser():[]).length===0?r.push({id:`create-routine`,title:`Create your first daily routine`,sub:`Morning or evening — takes 2 minutes to set up`,tab:`routines`,impact:25}):r.push({id:`complete-routine`,title:`Complete a routine today`,sub:`Tap each step as you go`,tab:`today`,impact:20})),e.key===`plan`&&e.score<70){let e=new Date().toISOString().slice(0,10),t=new Date(Date.now()+7*864e5).toISOString().slice(0,10);(a.planner?.events||[]).filter(n=>n.date>=e&&n.date<=t).length===0?r.push({id:`add-event`,title:`Add something to your calendar`,sub:`Even one event this week helps keep life organised`,tab:`planner`,impact:15}):r.push({id:`review-bills`,title:`Review upcoming bills`,sub:`Make sure nothing catches you off guard`,tab:`bills`,impact:15})}}),r.filter(e=>e.id!==t).sort((e,t)=>t.impact-e.impact)[0]||null}function Vu(e){a.settings||(a.settings={}),a.settings.typeADismissedMission=e,K(a);let t=document.querySelector(`.mission-lightbox`);t&&t.remove(),Ci()}function Hu(e){a.settings||(a.settings={}),a.settings.typeAMissionId=``,a.settings.typeAMissionShownDate=``,a.settings.typeADismissedMission=e,K(a);let t=document.querySelector(`.mission-lightbox`);t&&t.remove()}function Uu(){let e=a.settings?.typeAMissionShownDate;if(!e)return 0;let t=Math.floor((new Date-new Date(e))/864e5);return Math.max(0,t)}function Wu(e){if(document.querySelector(`.mission-lightbox`))return;let t=Uu(),n=e.onclick?e.onclick:e.tab?`activateTab('${e.tab}')`:``,r=document.createElement(`div`);r.className=`mission-lightbox`,r.innerHTML=`
    <div class="mission-lightbox-card">
      <div class="mission-lightbox-icon">⚡</div>
      <div class="mission-lightbox-title">${e.title}</div>
      <div class="mission-lightbox-sub">${e.sub}</div>
      <div class="mission-lightbox-days">This has been waiting ${t} day${t===1?``:`s`}</div>
      <div class="mission-lightbox-actions">
        <button class="mission-lightbox-btn" style="background:rgba(255,255,255,0.2);color:#fff" onclick="dismissMission('${e.id}')">Skip</button>
        <button class="mission-lightbox-btn" style="background:#fff;color:#0891b2" onclick="completeMission('${e.id}');${n}">Do it now</button>
      </div>
    </div>`,r.addEventListener(`click`,t=>{t.target===r&&Vu(e.id)}),document.body.appendChild(r)}function Gu(){if(!a.settings?.typeAMode)return;let e=Bu();if(!e)return;let t=new Date().toISOString().slice(0,10);if(a.settings.typeAMissionId!==e.id){a.settings.typeAMissionId=e.id,a.settings.typeAMissionShownDate=t,K(a);return}Uu()>=1&&setTimeout(()=>Wu(e),1500)}function Ku(){zu();let e=Q($),t=e.expenses.reduce((e,t)=>e+Ou(t.id,$),0),r=E(e.expenses),i=vr(1),o=a.meals?.plan?.[i]||{},s=Object.values(o).reduce((e,t)=>e+ +!!t.b+ +!!t.l+ +!!t.d,0),c=(a.maintenance||[]).filter(e=>{let t=pe(e);return t!==null&&t<0}).length,l=(a.bills||[]).filter(e=>{let t=n(e);return t>=0&&t<=7}),u=(a.meals?.pantry||[]).filter(e=>e.status===`need`||e.status===`low`).length,d=document.createElement(`div`);d.className=`reset-overlay`,d.innerHTML=`
    <div class="reset-card">
      <div class="reset-header">
        <h2>Weekly Reset</h2>
        <p>5 minutes to get your week sorted</p>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 1 of 5</div>
        <div class="reset-step-title">Review this month's spending</div>
        <div class="reset-step-sub">${t>0?`You've spent ${g(t)} of ${g(r)} budgeted`:`No actuals logged yet this month`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('budget')">Review budget</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 2 of 5</div>
        <div class="reset-step-title">Plan next week's meals</div>
        <div class="reset-step-sub">${s>0?`${s}/21 meals planned`:`Nothing planned for next week yet`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();_mealWeekOffset=1;activateTab('meals')">Plan meals</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 3 of 5</div>
        <div class="reset-step-title">Check the pantry</div>
        <div class="reset-step-sub">${u>0?`${u} items need restocking`:(a.meals?.pantry||[]).length>0?`Pantry looks good`:`Not set up yet`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('pantry')">Stocktake</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 4 of 5</div>
        <div class="reset-step-title">Upcoming bills</div>
        <div class="reset-step-sub">${l.length>0?`${l.length} bill${l.length===1?``:`s`} due this week — ${g(l.reduce((e,t)=>e+(parseFloat(t.amount)||0),0))}`:`No bills due this week`}</div>
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
    </div>`,d.addEventListener(`click`,e=>{e.target===d&&d.remove()}),document.body.appendChild(d)}function qu(){let e=document.querySelector(`.reset-overlay`);e&&e.remove(),a.settings||(a.settings={});let t=new Date().toISOString().slice(0,10),n=a.settings.typeALastResetDate||``;n&&Math.floor((new Date-new Date(n))/864e5)<=9?a.settings.typeAStreak=(a.settings.typeAStreak||0)+1:a.settings.typeAStreak=1,a.settings.typeALastResetDate=t,K(a),Ci()}function Ju(){let e=zu(),t=2*Math.PI*22,n=(e.total/100*t).toFixed(1),r=e.total>=80?`var(--good,#10b981)`:e.total>=60?`var(--iris-2)`:e.total>=40?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`,i=e.total>=80?`Crushing it — keep going`:e.total>=60?`Good shape — a few things to tidy`:e.total>=40?`Getting there — some gaps to fill`:`Just getting started`;return e.dims.map(e=>{let t=e.score>=75?`var(--good,#10b981)`:e.score>=50?`var(--iris-2)`:e.score>=30?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`,n=e.score>=75?`var(--good,#10b981)`:e.score>=50?`var(--iris-1)`:e.score>=30?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`;return`<div class="life-dim">
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
        ${a.settings?.typeAStreak>1?`<div style="margin-top:5px;display:inline-flex;align-items:center;gap:5px;background:var(--amber-soft,#FFF7ED);border-radius:99px;padding:2px 10px"><span style="font-size:12px">🔥</span><span style="font-family:var(--mono);font-size:11px;font-weight:700;color:var(--ember,#f97316)">${a.settings.typeAStreak} week streak</span></div>`:``}
      </div>
      <span style="font-size:10px;color:var(--muted);flex-shrink:0">▼</span>
    </div>
    
  </div>`}function Yu(){let e=Bu();if(!e)return``;let t=Uu(),n=e.onclick?`onclick="${e.onclick}"`:e.tab?`onclick="activateTab('${e.tab}')"`:``;return`<div class="mission-card" ${n}>
    <div class="mission-label">${t>0?`Day ${t+1} — still waiting`:`Today's Mission`}</div>
    <div class="mission-title">${e.title}</div>
    <div class="mission-sub">${e.sub}</div>
    <div class="mission-actions">
      <button class="mission-btn" style="background:rgba(255,255,255,0.2);color:#fff" onclick="event.stopPropagation();dismissMission('${e.id}')">Not today</button>
      <button class="mission-btn" style="background:#fff;color:#0891b2" ${n}>Let's do it</button>
    </div>
  </div>`}function Xu(){let e=Q($),t=a.householdProfile?.members||[],n=t.filter(e=>e.role===`adult`),r=t.filter(e=>e.role===`child`),i=[];if(i.push({id:`members`,label:`Add your household members`,done:n.length>0,tab:null}),i.push({id:`income`,label:`Set up income sources`,done:(e.income||[]).length>0,tab:`budget`}),i.push({id:`expenses`,label:`Add monthly expenses`,done:(e.expenses||[]).length>0,tab:`budget`}),r.length>0&&i.push({id:`kids`,label:`Add kids to your household`,done:!0,tab:null}),n.length>=2){let e=n[1]?.name||`your partner`,t=(a.householdProfile.authorizedUsers||[]).length>0||(a.householdProfile.invites||[]).some(e=>e.status===`accepted`);i.push({id:`invite`,label:`Invite ${e} to your household`,done:t,tab:`settings`,settingsSection:`household-access`})}if(i.push({id:`goals`,label:`Set your first savings goal`,done:(a.goals||[]).length>0,tab:`goals`}),i.push({id:`networth`,label:`Add your net worth (assets & debts)`,done:(a.netWorth?.assets||[]).length>0||(a.netWorth?.liabilities||[]).length>0,tab:`networth`}),i.push({id:`vehicles`,label:`Add your vehicles`,done:(a.vehicles||[]).length>0,tab:`vehicles`}),r.length>0){let e=r[0]?.name||`your child`;i.push({id:`chores`,label:`Set up ${f(e)}'s first chores`,done:(a.kids?.chores||[]).length>0,tab:`kids`})}return i}function Zu(){let e=document.getElementById(`setup-progress-card`);e&&(e.innerHTML=mi())}var Qu=null,$u=`asc`;function ed(e){yo()}function td(e){$u=Qu===e&&$u===`asc`?`desc`:`asc`,Qu=e,yo()}function nd(e,t,n=``){let r=Qu===e;return`<th class="sortable${r?` sort-active`:``}" onclick="sortExpenses('${e}')">${t}${n}<span class="sort-icon">${r?$u===`asc`?`↑`:`↓`:`↕`}</span></th>`}function rd(e){let t=[`th`,`st`,`nd`,`rd`],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}window._acceptInviteAndContinue=Bl,window._addRecurrenceToDate=Kn,window._adultPinKey=_adultPinKey,window._adultPinSubmit=_adultPinSubmit,window._applyActiveProfile=gl,window._applyChildNav=Cs,window._applyMigrations=kc,window._assignmentCompletedToday=_assignmentCompletedToday,window._assignmentHistory=_assignmentHistory,window._assignmentStreak=_assignmentStreak,window._autoCreateRecurringEvents=qn,window._briefIcon=_i,window._briefRow=Si,window._budgetAllocByCategory=ho,window._buildTotoContext=ar,window._capacitorPrefs=Kc,window._categoryIcon=vo,window._checkInviteOnLoad=Al,window._checkMissionEscalation=Gu,window._checkSettingsUnsaved=io,window._chipClassFor=vi,window._chipLabelFor=yi,window._cleanupGuide=_cleanupGuide,window._copyInviteLinkForMember=wl,window._csOpen=Ic,window._csvSetExpense=us,window._csvToggle=cs,window._csvToggleAll=ls,window._csvUpdateApplyBtn=ds,window._cvAgeBracket=ws,window._cvCalViewToggle=Ks,window._cvConfetti=Os,window._cvDismissNotif=Qs,window._cvEventsForDate=Rs,window._cvFmt12h=zs,window._cvMonthDayTap=Xs,window._cvRefreshSchedulePanel=Hs,window._cvRender7Day=qs,window._cvRenderCalendar=Gs,window._cvRenderMonth=Ys,window._cvRenderPrizesTab=js,window._cvRoutineAvailLabel=Ds,window._cvRoutineIsActive=Es,window._cvRoutineSchedCard=Ws,window._cvScheduleHtml=Us,window._cvShowDayDetail=Zs,window._cvShowPrizeConfirm=$s,window._cvSwitchTab=Ls,window._cvTimeGreeting=Ts,window._cvToggleRoutineExpand=Bs,window._cvToggleStepFromCal=Vs,window._cvUpdatePrizesBadge=As,window._cvViewCalendar=_cvViewCalendar,window._cvWeekDayTap=Js,window._deleteChildEvent=_deleteChildEvent,window._devLoadAll=dc,window._devLoadHome=lc,window._devLoadKids=oc,window._devLoadMeals=uc,window._devLoadPlanner=cc,window._devLoadRoutines=sc,window._devLoadWallet=ac,window._devReset=fc,window._devToolsClose=ic,window._devToolsOpen=rc,window._dismissInviteFlow=Gl,window._docCatMeta=N,window._ensureKidProfileAndPin=Cl,window._ensureNWModals=ze,window._estimateLbCalories=_estimateLbCalories,window._estimateMealCalories=Ar,window._fetchAIBriefing=Mi,window._finishInviteJourney=Hl,window._getHouseholdDocRef=bc,window._getHouseholdOwnerUID=yc,window._getInviteUrl=Tl,window._getNthDayOfMonth=Un,window._getPinTotalAttempts=ou,window._handlePendingInvite=jl,window._hashPin=il,window._highlightStep=_highlightStep,window._incPinTotalAttempts=su,window._inferAisle=mr,window._initAuthListener=jc,window._isPinHardLocked=lu,window._listsAddFavourite=Kr,window._listsAddItem=Lr,window._listsAddUsual=qr,window._listsArchive=Gr,window._listsClearTrolley=Wr,window._listsDeleteItem=zr,window._listsOpenAddForm=Vr,window._listsQuickAdd=Br,window._listsSaveForm=Ur,window._listsSetState=Rr,window._listsUpdateParsePreview=Jr,window._maintDaysUntil=pe,window._maintNextDue=fe,window._markSettingsDirty=z,window._mealGetSuggestions=Or,window._mealPill=Tr,window._mealPriceSlide=Dr,window._mealToggleFilter=Er,window._mealWeekDates=yr,window._mealWeekKey=vr,window._missionDaysIgnored=Uu,window._nextForecastMonth=Pt,window._openChildEventModal=_openChildEventModal,window._pantryToAisle=Hr,window._parseShopInput=hr,window._pickAdult=ll,window._pickKid=ul,window._pinKey=ml,window._plannerCloseDaySheet=_plannerCloseDaySheet,window._plannerCloseDetail=an,window._plannerCloseLifeSheet=tn,window._plannerCloseShare=ln,window._plannerCopyShareUrl=dn,window._plannerEditFromDetail=sn,window._plannerEvMemberIds=Tt,window._plannerEvPrimaryMember=Et,window._plannerEvWhoLabel=Dt,window._plannerEventsForDate=At,window._plannerFmt12h=jt,window._plannerGoToday=Gt,window._plannerHandleDaySheetClick=Qt,window._plannerHandleDetailClick=on,window._plannerHandleLifeSheetClick=nn,window._plannerHandleShareClick=un,window._plannerMemberById=wt,window._plannerMembers=Ct,window._plannerNextMonth=Vt,window._plannerNudges=pn,window._plannerOpenDaySheet=Yt,window._plannerOpenDetail=rn,window._plannerOpenLifeSheet=en,window._plannerOpenModalFromSheet=$t,window._plannerOpenShare=cn,window._plannerPrevMonth=Bt,window._plannerRecurrenceLabel=Ot,window._plannerRenderDaySheetList=Xt,window._plannerSelectDay=Ht,window._plannerSetView=Kt,window._plannerShareVia=fn,window._plannerToggleFilter=Jt,window._plannerToggleSection=qt,window._plannerVisibleEvents=kt,window._pmDpClear=In,window._pmDpNext=zn,window._pmDpOpen=Mn,window._pmDpOutsideClick=Nn,window._pmDpPrev=Rn,window._pmDpRender=Pn,window._pmDpSelect=Fn,window._pmDpToday=Ln,window._pmFmtDate=En,window._pmFmtDateShort=Dn,window._pmHandleCatChange=jn,window._pmRenderMemberPicker=On,window._pmToggleAllDay=An,window._pmToggleMember=kn,window._prevForecastMonth=Nt,window._psoHoldEnd=nu,window._psoHoldStart=tu,window._psoKey=ru,window._psoRender=eu,window._psoSubmit=iu,window._psoTourDone=au,window._pushAllEventsToBudget=Hn,window._qaKey=bs,window._qaSelectCat=xs,window._qahAction=gs,window._qahApplyParsed=vs,window._qahSendText=_s,window._recordInviteAcceptance=Vl,window._recurrenceMatchesDate=_recurrenceMatchesDate,window._refreshSetupProgress=Zu,window._renderAdultPinModal=_renderAdultPinModal,window._renderAdultRoutines=_renderAdultRoutines,window._renderApiKeySummary=co,window._renderChildEventsMgmt=_renderChildEventsMgmt,window._renderChildRoutines=_renderChildRoutines,window._renderContextBanners=Ru,window._renderCsvPreview=as,window._renderCsvReview=ss,window._renderInviteFlow=Wl,window._renderLifeAreas=xi,window._renderLifeScore=Ju,window._renderListItem=Qr,window._renderListsDetail=Zr,window._renderListsSelector=Xr,window._renderMealPlan=xr,window._renderMissionCard=Yu,window._renderNudgeSection=Gn,window._renderPinDots=fl,window._renderPinPad=pl,window._renderPlannerAgenda=Ut,window._renderPlannerEventRow=zt,window._renderPlannerMonthGrid=Lt,window._renderPlannerWeekStrip=Rt,window._renderQAHub=hs,window._renderQASheet=ys,window._renderRoutinesTodayCard=_renderRoutinesTodayCard,window._renderShoppingList=jr,window._renderSuggestionsSection=_renderSuggestionsSection,window._renderTourSlide=Ll,window._renderWeekStrip=bi,window._resetPinAttempts=cu,window._routineAddStep=_routineAddStep,window._routineAddSuggestion=_routineAddSuggestion,window._routineAssertScope=_routineAssertScope,window._routineAvailableSuggestions=_routineAvailableSuggestions,window._routineAwardPoints=_routineAwardPoints,window._routineAwardStepPoints=_routineAwardStepPoints,window._routineCheckDailyReset=_routineCheckDailyReset,window._routineCompletedToday=_routineCompletedToday,window._routineCreate=_routineCreate,window._routineCurrentUserId=_routineCurrentUserId,window._routineDateKey=_routineDateKey,window._routineDelete=_routineDelete,window._routineDeleteChild=_routineDeleteChild,window._routineDeleteStep=_routineDeleteStep,window._routineDragEnd=_routineDragEnd,window._routineDragOver=_routineDragOver,window._routineDragStart=_routineDragStart,window._routineDrop=_routineDrop,window._routineDuplicateFromJoined=_routineDuplicateFromJoined,window._routineDuplicateTo=_routineDuplicateTo,window._routineEdit=_routineEdit,window._routineEditStep=_routineEditStep,window._routineEditSuggestion=_routineEditSuggestion,window._routineExpandSugg=_routineExpandSugg,window._routineGetAssignment=_routineGetAssignment,window._routineHistory=_routineHistory,window._routineIntelNudge=_routineIntelNudge,window._routineIsOwner=_routineIsOwner,window._routineJoin=_routineJoin,window._routineKids=_routineKids,window._routineLeave=_routineLeave,window._routineManageAssignments=_routineManageAssignments,window._routineMatchesDate=_routineMatchesDate,window._routineNextId=_routineNextId,window._routineOtherAdults=_routineOtherAdults,window._routinePauseMenu=_routinePauseMenu,window._routinePropagateStepAdd=_routinePropagateStepAdd,window._routinePropagateStepDelete=_routinePropagateStepDelete,window._routineRecurrenceCollect=_routineRecurrenceCollect,window._routineRecurrenceFormHtml=_routineRecurrenceFormHtml,window._routineRecurrenceSummaryUpdate=_routineRecurrenceSummaryUpdate,window._routineRecurrenceTypeChange=_routineRecurrenceTypeChange,window._routineRemovePause=_routineRemovePause,window._routineResetToday=_routineResetToday,window._routineResetTodayAllKids=_routineResetTodayAllKids,window._routineResetTodayKid=_routineResetTodayKid,window._routineSaveValidated=_routineSaveValidated,window._routineSetTab=_routineSetTab,window._routineShareMenu=_routineShareMenu,window._routineShowHistory=_routineShowHistory,window._routineSkipDay=_routineSkipDay,window._routineStreak=_routineStreak,window._routineTodayKey=_routineTodayKey,window._routineToggleAssignment=_routineToggleAssignment,window._routineToggleShare=_routineToggleShare,window._routineToggleStep=_routineToggleStep,window._routineToggleStepKid=_routineToggleStepKid,window._routineToggleSugg=_routineToggleSugg,window._routineTypeSelect=_routineTypeSelect,window._routineUnassign=_routineUnassign,window._routinesForCurrentUser=_routinesForCurrentUser,window._routinesForHousehold=_routinesForHousehold,window._saveInviteIncome=zl,window._saveLbSlot=_saveLbSlot,window._sectionTag=Iu,window._secureClear=Xc,window._secureGet=Jc,window._securePrewarm=qc,window._secureSet=Yc,window.prefsGet=Jc,window.prefsSet=Yc,window.prefsClear=Xc,window._setHouseholdOwner=xc,window._setInviteRole=bl,window._setPinHardLock=uu,window._showGuideStep=_showGuideStep,window._showInviteA1=Ml,window._showInviteA3=Nl,window._showInviteA4=Il,window._showInviteExpired=Ul,window._showInviteIncomePrompt=Rl,window._showMissionLightbox=Wu,window._showParentLockNotification=fu,window._showPinScreen=dl,window._showToast=Ir,window._startFirestoreSync=Ac,window._syncVehicleBill=A,window._tdCloseSheet=Di,window._tdOpenHeadsUpSheet=wi,window._tdOpenSheet=Ei,window._tdOpenSlippingSheet=Ti,window._tdToggleStep=Oi,window._ticker=_o,window._tlItem=Lu,window._todayAllocSegments=gi,window._totoAppendMessage=or,window._totoInitPanel=tr,window._totoRemoveTyping=cr,window._totoSend=ir,window._totoSendSuggestion=nr,window._totoShowTyping=sr,window._updateSwitchBtn=hl,window._verifyPin=du,window.addActualEntry=ju,window.addCatToGroup=Za,window.addCategory=fo,window.addHouseholdMember=ba,window.addLink=addLink,window.addPet=Ca,window.addSavings=addSavings,window.addShopItem=Mr,window.addSubFromImport=yt,window.adjForm=ca,window.aiPlanLunchbox=aiPlanLunchbox,window.applianceForm=oi,window.applianceFromForm=si,window.applyCsvImport=fs,window.approveCompletion=approveCompletion,window.approveRedemption=approveRedemption,window.approveSuggestion=_n,window.assignDevice=sl,window.attachBtn=attachBtn,window.aud=g,window.audD=_,window.billCatIcon=Ye,window.billDueBadge=Xe,window.billMonthlyEquiv=Ze,window.billsModal=tt,window.calcFinancialHealth=Pu,window.calcLifeScore=zu,window.calcScenario=ea,window.cancelSettingsChanges=ro,window.clearActivityLog=uo,window.clearAdultPin=clearAdultPin,window.clearCheckedShopItems=Fr,window.clearDeviceProfile=$c,window.clearKidPin=clearKidPin,window.clearKidSession=nl,window.closeBillModal=rt,window.closeModal=H,window.closeNWModal=Ve,window.closeNWTargetModal=Ie,window.closePinSetupOverlay=$l,window.closeQuickAdd=ms,window.closeSubModal=ht,window.closeTotoAssistant=er,window.completeMission=Hu,window.completeWeeklyReset=qu,window.confirmScope=yu,window.copyInviteLink=El,window.copyMonthFromPrevious=_u,window.customSelect=Fc,window.cyclePantryStatus=Ce,window.deleteAdjustment=da,window.deleteAppliance=ui,window.deleteBill=ot,window.deleteCategoryGroup=Ya,window.deleteChore=deleteChore,window.deleteDoc=le,window.deleteExpense=Jo,window.deleteExtra=Lo,window.deleteFurniture=ai,window.deleteGoal=Xi,window.deleteIncome=Ho,window.deleteKid=deleteKid,window.deleteLbProfile=deleteLbProfile,window.deleteMaint=_e,window.deleteNWItem=Ue,window.deletePantryItem=Ee,window.deletePlannerEvent=xn,window.deletePrize=deletePrize,window.deleteReceiptById=deleteReceiptById,window.deleteScenario=sa,window.deleteService=ie,window.deleteStage=Eo,window.deleteSub=_t,window.deleteVariation=jo,window.deleteVehicle=ne,window.detectSpendingPatterns=Na,window.dismissMission=Vu,window.dismissSubResult=bt,window.dismissSuggestion=vn,window.doScopeAll=xu,window.doScopeMonth=bu,window.dpClearDate=ts,window.dpDateInput=Yo,window.dpNextMonth=$o,window.dpPrevMonth=Qo,window.dpSelectDate=es,window.editActual=Nu,window.emojiPicker=emojiPicker,window.endGuide=endGuide,window.ensureMonthOverride=hu,window.escAttr=p,window.escHtml=f,window.estimateAllEvents=It,window.estimatePlannerEvent=Sn,window.exitChildView=exitChildView,window.expenseCategories=Vi,window.expenseForm=Uo,window.expenseFromForm=Wo,window.exportData=Ii,window.extraForm=No,window.extraFromForm=Po,window.fileIcon=fileIcon,window.fileSizeStr=fileSizeStr,window.fmtDate=y,window.fmtNW=v,window.freqDisplay=S,window.freqDisplayItem=C,window.freqLabel=x,window.freqLabelItem=w,window.fundingBadge=fundingBadge,window.furnitureForm=ti,window.furnitureFromForm=ni,window.generateInvite=xl,window.generateMission=Bu,window.generateShoppingList=$r,window.generateSmartInsights=Ia,window.generateSmartInsightsHTML=Ha,window.getAIKey=Aa,window.getActual=Ou,window.getActualEntries=Du,window.getBenchmarkStatus=Oa,window.getBenchmarks=Da,window.getCategoryHistoryData=Ma,window.getDB=getDB,window.getDeviceProfile=Zc,window.getKidSession=el,window.getLast6Months=Eu,window.getMonthData=Q,window.getReceipts=getReceipts,window.getSeasonalNudges=Wn,window.goToPlannerDay=Wt,window.goalForm=Gi,window.goalFromForm=qi,window.goalProgress=Ui,window.guestMode=Dc,window.handleCsvFile=is,window.handleDeviceRouting=al,window.handleSubCSV=vt,window.hideOnboarding=hideOnboarding,window.importData=Li,window.incomeCategories=Hi,window.incomeForm=Ro,window.incomeFromForm=zo,window.installApp=installApp,window.inviteMember=Sl,window.isMonthCustomized=mu,window.isOverdue=b,window.itemMonthly=T,window.kidBalance=kidBalance,window.lbToShoppingList=lbToShoppingList,window.loadColors=ma,window.loadData=zc,window.logActivity=Tc,window.markBillPaid=st,window.markChoreChildView=ec,window.markChoreDone=markChoreDone,window.markGoalAchieved=Zi,window.markMaintDone=ve,window.monthLabel=wu,window.monthShortLabel=Tu,window.monthlyTotal=E,window.nextGuideStep=nextGuideStep,window.nextId=D,window.nextInsightsMonth=Wa,window.nextMoneyMonth=fi,window.nextMonth=Cu,window.nwItemRow=Me,window.obBack=obBack,window.obFinish=obFinish,window.obNext=obNext,window.obPickEmoji=obPickEmoji,window.obSetAdults=obSetAdults,window.obSetKids=obSetKids,window.obSkip=obSkip,window.obSkipExpenses=obSkipExpenses,window.obStepPosition=obStepPosition,window.obStepSequence=obStepSequence,window.obToggleEmojiPicker=obToggleEmojiPicker,window.obToggleExpenseSkip=obToggleExpenseSkip,window.openActualEditor=Au,window.openAddAdjustment=ua,window.openAddAppliance=ci,window.openAddCatToGroup=Qa,window.openAddCategoryGroup=qa,window.openAddExpense=Ko,window.openAddExtra=Fo,window.openAddFurniture=ri,window.openAddGoal=Ji,window.openAddIncome=Bo,window.openAddKidModal=openAddKidModal,window.openAddScenario=aa,window.openAddStage=wo,window.openAddVariation=ko,window.openBillModal=nt,window.openChoreModal=openChoreModal,window.openCsvImport=ns,window.openDatePicker=Xo,window.openDocForm=se,window.openEditAppliance=li,window.openEditContractTotal=xo,window.openEditExpense=qo,window.openEditExtra=Io,window.openEditFurniture=ii,window.openEditGoal=Yi,window.openEditIncome=Vo,window.openEditKidModal=openEditKidModal,window.openEditScenario=oa,window.openEditStage=To,window.openEditVariation=Ao,window.openEmojiPickerModal=Ka,window.openIconPickerForGroup=Ja,window.openLunchboxEdit=openLunchboxEdit,window.openLunchboxProfile=openLunchboxProfile,window.openMaintForm=he,window.openMealEdit=wr,window.openModal=V,window.openNWModal=Be,window.openNWTargetModal=Fe,window.openNavGroupFor=gc,window.openPantryForm=we,window.openPinSetup=Ql,window.openPlannerModal=Tn,window.openPrizeModal=openPrizeModal,window.openQuickAdd=ps,window.openReceiptsModal=openReceiptsModal,window.openSavingsModal=openSavingsModal,window.openServiceForm=re,window.openSubModal=mt,window.openTotoAssistant=$n,window.openVehicleForm=k,window.openWeeklyReset=Ku,window.ordinal=rd,window.pantryToShoppingList=Oe,window.parseBankCSV=rs,window.pickEmoji=pickEmoji,window.pickedEmoji=pickedEmoji,window.prevInsightsMonth=Ua,window.prevMoneyMonth=di,window.prevMonth=Su,window.prevMonthStr=gu,window.profileAdults=va,window.profileChildren=ya,window.quickAddMaint=ye,window.quickAddPantry=De,window.redeemPrizeChildView=tc,window.refreshReceiptCounts=refreshReceiptCounts,window.rejectCompletion=rejectCompletion,window.rejectRedemption=rejectRedemption,window.removeActualEntry=Mu,window.removeApiKey=so,window.removeCatFromGroup=$a,window.removeCategory=po,window.removeHouseholdMember=xa,window.removePet=wa,window.removeReceipt=removeReceipt,window.removeShopItem=Pr,window.renderAll=renderAll,window.renderApprovals=renderApprovals,window.renderBenchmarksSection=Ba,window.renderBills=Qe,window.renderBudget=yo,window.renderBudgetForecast=Vn,window.renderBudgetSuggestions=yn,window.renderBuild=Bi,window.renderCategoryBreakdown=Pa,window.renderChoreMgmt=renderChoreMgmt,window.renderDashboard=Ni,window.renderDocuments=oe,window.renderDpCalendar=Zo,window.renderExpenseGroups=mo,window.renderForecast=Ft,window.renderGoals=Wi,window.renderInsightCards=za,window.renderInsights=Va,window.renderKidView=renderKidView,window.renderKids=renderKids,window.renderKidsOverview=renderKidsOverview,window.renderKidsParent=renderKidsParent,window.renderLists=Yr,window.renderLunchbox=renderLunchbox,window.renderMaintenance=me,window.renderMeals=br,window.renderMoneyDashboard=pi,window.renderNWDebtCard=Pe,window.renderNWTargetCard=Ne,window.renderNWTrend=Re,window.renderNetWorth=je,window.renderObStep=renderObStep,window.renderPantry=Se,window.renderPlanner=I,window.renderPrizeMgmt=renderPrizeMgmt,window.renderReceiptsList=renderReceiptsList,window.renderRoutines=renderRoutines,window.renderScenarios=ta,window.renderSettings=Pi,window.renderSetupProgress=mi,window.renderSpendingPatterns=Fa,window.renderSubImportResults=pt,window.renderSubscriptions=et,window.renderToday=Ci,window.renderVehicles=O,window.requestRedemption=requestRedemption,window.resetAllData=Fi,window.resetKidPinLock=pu,window.revokeInvite=Ol,window.runAIInsights=Ra,window.runCsvCategorise=os,window.safeRender=safeRender,window.sanitiseState=ee,window.saveAIKey=ja,window.saveApiKey=oo,window.saveBill=at,window.saveChore=saveChore,window.saveColors=ha,window.saveData=K,window.saveDoc=ce,window.saveKid=saveKid,window.saveLbProfile=saveLbProfile,window.saveMaint=ge,window.saveMealSlot=kr,window.saveNWItem=He,window.saveNWSnapshot=We,window.saveNWTarget=Le,window.savePantryItem=Te,window.savePlannerEvent=Bn,window.savePrize=savePrize,window.saveQuickAdd=Ss,window.saveReceipt=saveReceipt,window.saveService=j,window.saveSettingsChanges=no,window.saveSub=gt,window.saveVehicle=te,window.scenarioForm=ra,window.scenarioFromForm=ia,window.sendInviteEmail=Dl,window.sendTotoMessage=rr,window.setActual=ku,window.setAdultPin=setAdultPin,window.setBillsFilter=$e,window.setBudgetView=zi,window.setDeviceProfile=Qc,window.setExpenseFilter=ed,window.setKidPin=setKidPin,window.setKidSession=tl,window.setupProgressTasks=Xu,window.showChildView=showChildView,window.showDeviceSetup=ol,window.showOnboarding=showOnboarding,window.showProfileSelector=cl,window.signInWithGoogle=Ec,window.signOutUser=Oc,window.sortExpenses=td,window.stageForm=So,window.stageFromForm=Co,window.startGuide=startGuide,window.startHealthGuide=startHealthGuide,window.subCatIcon=lt,window.subMonthlyAmount=ut,window.suggestEventToBudget=gn,window.switchProfile=switchProfile,window.switchToKidMode=nc,window.thSort=nd,window.toggleAdjFields=la,window.toggleBillDayField=it,window.toggleBudgetDetail=bo,window.toggleCustomFreq=Go,window.toggleGoalFields=Ki,window.toggleGroupExpand=Ri,window.toggleHealthPopover=toggleHealthPopover,window.toggleInsightSheet=ki,window.toggleNavGroup=hc,window.togglePlannerCard=mn,window.togglePlannerEstimate=hn,window.toggleScenario=na,window.toggleSettingsSection=lo,window.toggleShopItem=Nr,window.toggleSidebar=pc,window.toggleTotoAssistant=Qn,window.uid=uid,window.unpushEventFromBudget=bn,window.updateCars=Ea,window.updateCategoryGroup=Xa,window.updateColor=_a,window.updateMember=Sa,window.updatePet=Ta,window.updateSetting=ao,window.upgradeSelects=Lc,window.uploadFiles=uploadFiles,window.uploadReceiptFiles=uploadReceiptFiles,window.variationForm=Do,window.variationFromForm=Oo,window.viewChildToday=viewChildToday,window.viewReceipt=viewReceipt;
//# sourceMappingURL=index-Bzf9WOj7.js.map
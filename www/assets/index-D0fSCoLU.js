import"./firebase-DD2PS53O.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t){return t===`daily`?e*365/12:t===`weekly`?e*52/12:t===`fortnightly`?e*26/12:t===`quarterly`?e/3:t===`annually`||t===`annual`?e/12:e}function t(e){let t=new Date;t.setHours(0,0,0,0);let n=e.frequency||`Monthly`;if(n===`Monthly`){let n=parseInt(e.dueDay)||1,r=new Date(t.getFullYear(),t.getMonth(),n);return r<t&&(r=new Date(t.getFullYear(),t.getMonth()+1,n)),r}let r=e.lastPaid?new Date(e.lastPaid):e.startDate?new Date(e.startDate):t;r.setHours(0,0,0,0);let i={Weekly:7,Fortnightly:14,Quarterly:91,Annually:365}[n]||30,a=new Date(r);for(;a<=t;)a=new Date(a.getTime()+i*864e5);return a}function n(e){let n=new Date;n.setHours(0,0,0,0);let r=t(e);return Math.round((r-n)/864e5)}var r={},i=new Set,a=new Set,o={},s=null,c=!1;function l(){c||(c=!0,requestAnimationFrame(u))}function u(){if(c=!1,!s)return;if(a.has(`__all__`)||a.size===0){a.clear(),s();return}let e=new Set(a);a.clear(),e.add(`today`),e.forEach(e=>{let t=o[e];t&&t.forEach(t=>{try{t()}catch(t){console.error(`render error in`,e,t)}})})}function d(){i.forEach(e=>{try{e(r)}catch(e){console.error(`store subscriber error:`,e)}})}function f(e){r=e,a.add(`__all__`),l(),d()}function p(e){r=e}var m=new Proxy({},{get(e,t){if(t!==`then`)return r[t]},set(e,t,n){return r[t]=n,!0},has(e,t){return t in r},ownKeys(){return Reflect.ownKeys(r)},getOwnPropertyDescriptor(e,t){let n=Object.getOwnPropertyDescriptor(r,t);return n?{...n,configurable:!0}:void 0}}),h={wallet:{navTab:`budget`,label:`Wallet`,tabs:[{tab:`budget`,label:`Budget`},{tab:`bills`,label:`Bills`},{tab:`networth`,label:`Net Worth`},{tab:`goals`,label:`Goals`},{tab:`insights`,label:`Insights`},{tab:`build`,label:`Build`}]},plan:{navTab:`planner`,label:`Plan`,tabs:[{tab:`planner`,label:`Planner`},{tab:`forecast`,label:`Forecast`},{tab:`meals`,label:`Meals`},{tab:`lunchbox`,label:`Lunchbox`},{tab:`pantry`,label:`Pantry`},{tab:`routines`,label:`Routines`},{tab:`lists`,label:`Lists`}]},home:{navTab:`documents`,label:`Home`,tabs:[{tab:`documents`,label:`Documents`},{tab:`vehicles`,label:`Vehicles`},{tab:`maintenance`,label:`Maintenance`},{tab:`kids`,label:`Kids`}]}};function g(e){for(let[t,n]of Object.entries(h))if(n.tabs.some(t=>t.tab===e))return t;return null}function _(){let e=document.querySelector(`.tab-panel.active`);return e?e.id.replace(`tab-`,``):`today`}function v(e){if(!e)return;let t=e.querySelector(`.section-pills`);if(!t)return;let n=t.scrollWidth-t.scrollLeft-t.clientWidth>4,r=t.scrollLeft>4;e.classList.toggle(`has-overflow-right`,n),e.classList.toggle(`has-overflow-left`,r)}function y(e){e===`subscriptions`&&(e=`bills`),e===`scenarios`&&(e=`insights`),e===`money`&&(e=`budget`),e===`dashboard`&&(e=`budget`),document.getElementById(`tab-`+e)||(e=`today`),typeof window._checkSettingsUnsaved==`function`&&_()===`settings`&&e!==`settings`&&window._checkSettingsUnsaved(e),document.querySelectorAll(`.nav-item, .nav-text-item, .bn-item`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.tab-panel`).forEach(e=>e.classList.remove(`active`));let t=document.getElementById(`tab-`+e);t&&t.classList.add(`active`);let n=g(e);if(n){let e=h[n].navTab;document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`))}else document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`));if(document.body.dataset.section=n||e,document.querySelectorAll(`.static-section-header`).forEach(e=>e.classList.remove(`active`)),n){let t=document.getElementById(n+`-section-header`);if(t){t.classList.add(`active`);let r=document.getElementById(n+`-header-date`);r&&(r.textContent=new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`})),t.querySelectorAll(`.section-pill`).forEach(t=>t.classList.toggle(`active`,t.dataset.pill===e)),requestAnimationFrame(()=>t.querySelectorAll(`.section-pills-wrap`).forEach(v))}}}function b(e){e===`subscriptions`&&(e=`bills`),e===`scenarios`&&(e=`insights`),e===`money`&&(e=`budget`),e===`dashboard`&&(e=`budget`),(location.hash.slice(1)||`today`)!==e&&history.pushState({tab:e},``,`#`+e),y(e)}window.addEventListener(`popstate`,e=>{y(e.state?.tab||location.hash.slice(1)||`today`)}),(function(){let e=location.hash.slice(1)||`today`;history.replaceState({tab:e},``,e===`today`?location.pathname+location.search:`#`+e)})();function x(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function S(e){return x(e).replace(/\\/g,`\\\\`)}var C=new Intl.NumberFormat(`en-AU`,{style:`currency`,currency:`AUD`,maximumFractionDigits:0}),ee=new Intl.NumberFormat(`en-AU`,{style:`currency`,currency:`AUD`,minimumFractionDigits:2,maximumFractionDigits:2});function w(e){return C.format(e||0)}function T(e){return ee.format(e||0)}function E(e){let t=Math.abs(e),n=t>=1e6?(t/1e6).toFixed(2)+`M`:t>=1e3?(t/1e3).toFixed(1)+`k`:t.toFixed(0);return(e<0?`-$`:`$`)+n}function D(e){if(!e)return`—`;let[t,n,r]=e.split(`-`);return`${r}/${n}/${t}`}function te(e){return e?new Date(e)<new Date:!1}function ne(e){return{daily:`/day`,weekly:`/wk`,fortnightly:`/fn`,monthly:`/mo`,quarterly:`/qtr`,annually:`/yr`,annual:`/yr`}[e]||`/mo`}function O(e){return{daily:`Daily`,weekly:`Weekly`,fortnightly:`Fortnightly`,monthly:`Monthly`,quarterly:`Quarterly`,annually:`Annually`,annual:`Annually`,custom:`Custom`}[e]||`Monthly`}function k(e){return(e.frequency||`monthly`)===`custom`?`Every ${e.customEvery||1} ${e.customUnit||`weeks`}`:O(e.frequency||`monthly`)}function re(e){return(e.frequency||`monthly`)===`custom`?`/${e.customEvery||1}${e.customUnit===`months`?`mo`:`wk`}`:ne(e.frequency||`monthly`)}function A(t){let n=t.frequency||`monthly`;if(n===`custom`){let e=t.customEvery||1;return t.customUnit===`months`?(t.amount||0)/e:(t.amount||0)*52/(e*12)}return e(t.amount||0,n)}function j(e){return e.reduce((e,t)=>e+A(t),0)}function M(e){return e.length?Math.max(...e.map(e=>e.id))+1:1}function ie(e){function t(e){if(!(!e||typeof e!=`object`))for(let n of Object.keys(e))typeof e[n]==`string`&&e[n].length>500?e[n]=e[n].slice(0,500):Array.isArray(e[n])?e[n].forEach(e=>t(e)):typeof e[n]==`object`&&e[n]!==null&&t(e[n])}t(e)}function ae(){let e=m.vehicles||[];if(e.length===0){document.getElementById(`vehicles-content`).innerHTML=`
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
  </div>`;e.forEach(e=>{let n=new Date,r=[];if(e.regoExpiry){let t=Math.ceil((new Date(e.regoExpiry)-n)/864e5);t<0?r.push({cls:`red`,text:`Rego expired ${Math.abs(t)}d ago`}):t<=30?r.push({cls:`amber`,text:`Rego expires in ${t}d`}):r.push({cls:`green`,text:`Rego: ${new Date(e.regoExpiry).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}`})}if(e.insurance&&e.insurance.renewalDate){let t=Math.ceil((new Date(e.insurance.renewalDate)-n)/864e5);t<0?r.push({cls:`red`,text:`Insurance expired ${Math.abs(t)}d ago`}):t<=30?r.push({cls:`amber`,text:`Insurance renews in ${t}d`}):r.push({cls:`green`,text:`Insured until ${new Date(e.insurance.renewalDate).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`})}if(e.serviceInterval&&e.odometer&&e.services&&e.services.length>0){let t=e.services.sort((e,t)=>t.odometer-e.odometer)[0],n=e.odometer.reading-t.odometer,i=e.serviceInterval-n;i<=0?r.push({cls:`red`,text:`Service overdue by ${Math.abs(i).toLocaleString()}km`}):i<=2e3?r.push({cls:`amber`,text:`Service due in ${i.toLocaleString()}km`}):r.push({cls:`green`,text:`Next service in ${i.toLocaleString()}km`})}let i=r.map(e=>`<span class="veh-badge ${e.cls}">${e.text}</span>`).join(``),a=(e.services||[]).reduce((e,t)=>e+(t.cost||0),0),o=new Date;o.setFullYear(o.getFullYear()-1);let s=(e.services||[]).filter(e=>e.date&&new Date(e.date)>=o).reduce((e,t)=>e+(t.cost||0),0),c=(m.bills||[]).find(t=>t._vehicleRef===`vehicle_${e.id}_rego`),l=(m.bills||[]).find(t=>t._vehicleRef===`vehicle_${e.id}_insurance`),u=s+(c&&parseFloat(c.amount)||0)+(l&&parseFloat(l.amount)||0),d=Math.round(u/12);t+=`
      <div class="veh-card">
        <div class="veh-card-header">
          <div class="veh-icon">${e.fuel===`ev`?`⚡`:`🚗`}</div>
          <div style="flex:1;min-width:0">
            <div class="veh-name">${x(e.name)}</div>
            ${e.plate?`<span class="veh-plate">${x(e.plate)}${e.state?` · `+e.state:``}</span>`:``}
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
          ${e.insurance&&e.insurance.provider?`<div class="veh-stat"><div class="veh-stat-label">Insurer</div><div class="veh-stat-value">${x(e.insurance.provider)}</div></div>`:``}
          <div class="veh-stat"><div class="veh-stat-label">Services (all time)</div><div class="veh-stat-value">${w(a)}</div></div>
          ${u>0?`<div class="veh-stat"><div class="veh-stat-label">Annual Cost</div><div class="veh-stat-value">${w(u)}</div></div>`:``}
          ${d>0?`<div class="veh-stat"><div class="veh-stat-label">Monthly Cost</div><div class="veh-stat-value">${w(d)}/mo</div></div>`:``}
        </div>

        ${c||l?`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
          ${c?`<span style="font-size:11px;color:#0369a1;cursor:pointer;font-weight:600" onclick="activateTab('bills')">Rego bill: ${w(parseFloat(c.amount)||0)} →</span>`:``}
          ${l?`<span style="font-size:11px;color:#0369a1;cursor:pointer;font-weight:600" onclick="activateTab('bills')">Insurance bill: ${w(parseFloat(l.amount)||0)} →</span>`:``}
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
                    <td style="font-weight:500">${x(t.type||`—`)}</td>
                    <td>${t.odometer?t.odometer.toLocaleString()+` km`:`—`}</td>
                    <td style="color:var(--text-muted)">${x(t.provider||`—`)}</td>
                    <td class="amount">${t.cost?w(t.cost):`—`}</td>
                    <td><button class="btn btn-sm" style="color:var(--danger);font-size:11px" onclick="deleteService(${e.id},${t.id})">×</button></td>
                  </tr>`).join(``)}
                </tbody>
              </table></div>`}
        </div>
      </div>`}),document.getElementById(`vehicles-content`).innerHTML=t}function N(e){let t=e?(m.vehicles||[]).find(t=>t.id===e):null,n=!!t;document.getElementById(`modal-title`).textContent=n?`Edit ${t.name}`:`Add Vehicle`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Vehicle Name</label>
      <input class="form-input" id="vf-name" type="text" maxlength="200" value="${t?S(t.name):``}" placeholder="e.g. Mitsubishi Outlander">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Plate Number</label>
        <input class="form-input" id="vf-plate" type="text" maxlength="200" value="${t?S(t.plate||``):``}" placeholder="ABC123" style="text-transform:uppercase">
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
          <input class="form-input" id="vf-ins-provider" type="text" maxlength="200" value="${t&&t.insurance?S(t.insurance.provider||``):``}" placeholder="e.g. AAMI">
        </div>
        <div class="form-group">
          <label class="form-label">Policy Number</label>
          <input class="form-input" id="vf-ins-policy" type="text" maxlength="200" value="${t&&t.insurance?S(t.insurance.policyNo||``):``}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Renewal Date</label>
        <input class="form-input" id="vf-ins-renewal" type="date" value="${t&&t.insurance&&t.insurance.renewalDate||``}">
      </div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveVehicle(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function oe(e){let t=document.getElementById(`vf-name`)?.value.trim();if(!t)return;let n={name:t,plate:(document.getElementById(`vf-plate`)?.value||``).trim().toUpperCase(),state:document.getElementById(`vf-state`)?.value||`SA`,fuel:document.getElementById(`vf-fuel`)?.value||`petrol`,regoExpiry:document.getElementById(`vf-rego`)?.value||``,odometer:{reading:parseInt(document.getElementById(`vf-odo`)?.value)||0,date:new Date().toISOString().slice(0,10)},serviceInterval:parseInt(document.getElementById(`vf-interval`)?.value)||1e4,insurance:{provider:document.getElementById(`vf-ins-provider`)?.value.trim()||``,policyNo:document.getElementById(`vf-ins-policy`)?.value.trim()||``,renewalDate:document.getElementById(`vf-ins-renewal`)?.value||``}};if(e){let t=m.vehicles.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=m.vehicles.length?Math.max(...m.vehicles.map(e=>e.id))+1:1,n.services=[],m.vehicles.push(n);m.bills||(m.bills=[]),se(n,`rego`,`Rego - ${n.name}`,n.regoExpiry,0,`Insurance`),n.insurance&&n.insurance.renewalDate&&se(n,`insurance`,`Insurance - ${n.name}`,n.insurance.renewalDate,0,`Insurance`),saveData(m),closeModal(),renderAll()}function se(e,t,n,r,i,a){if(!r)return;let o=`vehicle_${e.id||e.name}_${t}`,s=m.bills.find(e=>e._vehicleRef===o),c={name:n,amount:i||(s?s.amount:0),category:a,frequency:`Annual`,autopay:!1,startDate:r,_vehicleRef:o};s?Object.assign(s,c):(c.id=uid(),m.bills.push(c))}function ce(e){if(!confirm(`Delete this vehicle and all its service history?`))return;let t=`vehicle_${e}_`;m.bills=(m.bills||[]).filter(e=>!(e._vehicleRef&&e._vehicleRef.startsWith(t))),m.vehicles=m.vehicles.filter(t=>t.id!==e),saveData(m),renderAll()}function le(e){document.getElementById(`modal-title`).textContent=`Add Service Record`,document.getElementById(`modal-body`).innerHTML=`
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
    <button class="btn btn-primary" onclick="saveService(${e})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function ue(e){let t=m.vehicles.find(t=>t.id===e);if(!t)return;t.services||(t.services=[]);let n={id:t.services.length?Math.max(...t.services.map(e=>e.id))+1:1,date:document.getElementById(`sf-date`)?.value||``,odometer:parseInt(document.getElementById(`sf-odo`)?.value)||0,type:document.getElementById(`sf-type`)?.value||`Full service`,provider:document.getElementById(`sf-provider`)?.value.trim()||``,cost:parseFloat(document.getElementById(`sf-cost`)?.value)||0,notes:document.getElementById(`sf-notes`)?.value.trim()||``};if(t.services.push(n),n.odometer>(t.odometer?.reading||0)&&(t.odometer={reading:n.odometer,date:n.date}),n.cost>0&&n.date){let e=n.date.slice(0,7),r=getMonthData(e),i=r.expenses.find(e=>e.name&&e.name.toLowerCase().includes(t.name.toLowerCase()))||r.expenses.find(e=>(e.category||``).toLowerCase()===`transport`)||r.expenses.find(e=>(e.name||``).toLowerCase().includes(`car`));if(!i&&(i={id:M(m.budget.expenses),name:`Car - ${t.name}`,amount:0,frequency:`monthly`,category:`Transport`,dueDate:``,vendor:null},m.budget.expenses.push(i),isMonthCustomized(e))){let t=m.budget.months[e];i={...i,id:M(t.expenses)},t.expenses.push(i)}m.budget.actuals[e]||(m.budget.actuals[e]={});let a=getActualEntries(i.id,e);a.push({id:a.length?Math.max(...a.map(e=>e.id))+1:1,amount:n.cost,date:n.date,note:`${t.name}: ${n.type}${n.provider?` @ `+n.provider:``}`}),m.budget.actuals[e][i.id]=a}saveData(m),closeModal(),renderAll()}function de(e,t){let n=m.vehicles.find(t=>t.id===e);n&&(n.services=(n.services||[]).filter(e=>e.id!==t),saveData(m),renderAll())}var fe=[{key:`Insurance`,icon:`🛡️`,bg:`#eff6ff`},{key:`Identity`,icon:`🪪`,bg:`#ecfeff`},{key:`Warranty`,icon:`📦`,bg:`#fffbeb`},{key:`Financial`,icon:`🏦`,bg:`#faf5ff`},{key:`Medical`,icon:`🏥`,bg:`#fef2f2`},{key:`Property`,icon:`🏠`,bg:`#f0f9ff`},{key:`Vehicle`,icon:`🚗`,bg:`#f5f3ff`},{key:`Other`,icon:`📄`,bg:`#f8fafc`}],pe=``;function me(e){return fe.find(t=>t.key===e)||fe[fe.length-1]}function he(){let e=m.documents||[],t=new Date;pe.toLowerCase();let n=e,r=e.filter(e=>{if(!e.expiryDate)return!1;let n=Math.ceil((new Date(e.expiryDate)-t)/864e5);return n>=0&&n<=30}).length,i=e.filter(e=>e.expiryDate?new Date(e.expiryDate)<t:!1).length;t.toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`});let a=m.settings?.householdName||`Household`,o=(m.kids?.allowances?.length||0)+2,s=i===0&&r===0,c=`
    <div class="home-hero">
      <div>
        <div class="home-hero-label">Household</div>
        <div class="home-hero-val">${a}</div>
        <div class="home-hero-sub">${o} members</div>
      </div>
      <div class="home-hero-badge" style="${s?``:`background:#FFF8EC`}">
        <div class="home-hero-badge-val" style="${s?``:`color:#F59E0B`}">${s?`✓`:`!`}</div>
        <div class="home-hero-badge-label" style="${s?``:`color:#F59E0B`}">${s?`All good`:`${i+r} due`}</div>
      </div>
    </div>`;if(e.length===0){document.getElementById(`documents-content`).innerHTML=`
      
      ${c}
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon">📋</div>
        <p>No documents tracked yet. Add insurance policies, warranties, passports and more.</p>
        <button class="btn btn-primary" style="margin-top:12px" onclick="openDocForm()">+ Add Document</button>
      </div>`;return}let l=``+c+`
    <div class="toto-sec-header" style="margin-top:6px"><span class="toto-sec-title">Documents</span></div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin:8px 20px 16px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${i>0?`<span class="veh-badge red">${i} expired</span>`:``}
        ${r>0?`<span class="veh-badge amber">${r} expiring soon</span>`:``}
        <span style="font-size:13px;color:var(--text-muted)">${e.length} document${e.length===1?``:`s`}</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openDocForm()">+ Add Document</button>
    </div>
    <input class="doc-search" type="text" maxlength="200" placeholder="Search documents…" value="${pe}" oninput="_docSearch=this.value;renderDocuments()" style="margin:0 20px;width:calc(100% - 40px)">`,u={};n.forEach(e=>{let t=e.category||`Other`;u[t]||(u[t]=[]),u[t].push(e)}),fe.forEach(e=>{let n=u[e.key];!n||!n.length||(l+=`<div class="doc-cat-group">
      <div class="doc-cat-header">${e.icon} ${e.key} <span style="font-weight:400;text-transform:none">(${n.length})</span></div>`,n.sort((e,t)=>e.expiryDate&&t.expiryDate?new Date(e.expiryDate)-new Date(t.expiryDate):e.expiryDate?-1:1).forEach(n=>{let r=``;if(n.expiryDate){let e=Math.ceil((new Date(n.expiryDate)-t)/864e5);r=e<0?`<span class="veh-badge red" style="font-size:11px">Expired ${Math.abs(e)}d ago</span>`:e<=30?`<span class="veh-badge amber" style="font-size:11px">Expires in ${e}d</span>`:`<span class="veh-badge green" style="font-size:11px">${new Date(n.expiryDate).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}</span>`}let i=[n.provider?x(n.provider):``,n.reference?x(n.reference):``,n.storedAt?`📍 ${x(n.storedAt)}`:``].filter(Boolean);l+=`
        <div class="doc-card" onclick="openDocForm(${n.id})">
          <div class="doc-cat-icon" style="background:${e.bg}">${e.icon}</div>
          <div class="doc-card-body">
            <div class="doc-card-name">${x(n.name)}</div>
            ${i.length?`<div class="doc-card-sub">${i.join(` · `)}</div>`:``}
          </div>
          ${r}
        </div>`}),l+=`</div>`)}),n.length,document.getElementById(`documents-content`).innerHTML=l}function ge(e){let t=e?(m.documents||[]).find(t=>t.id===e):null,n=!!t;document.getElementById(`modal-title`).textContent=n?`Edit Document`:`Add Document`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Document Name</label>
      <input class="form-input" id="df-name" type="text" maxlength="200" value="${t?S(t.name):``}" placeholder="e.g. Home & Contents Insurance">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="df-cat">
          ${fe.map(e=>`<option value="${e.key}"${t&&t.category===e.key?` selected`:``}>${e.icon} ${e.key}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Provider / Issuer</label>
        <input class="form-input" id="df-provider" type="text" maxlength="200" value="${t?S(t.provider||``):``}" placeholder="e.g. AAMI, Medicare">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Reference / Policy No.</label>
        <input class="form-input" id="df-ref" type="text" maxlength="200" value="${t?S(t.reference||``):``}" placeholder="POL-12345">
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
        <input class="form-input" id="df-stored" type="text" maxlength="200" value="${t?S(t.storedAt||``):``}" placeholder="e.g. Filing cabinet, Google Drive, Email">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
      <input class="form-input" id="df-notes" type="text" maxlength="200" value="${t?S(t.notes||``):``}" placeholder="e.g. $1000 excess, covers building + contents">
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${n?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deleteDoc(${e})">Delete</button>`:``}
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveDoc(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function _e(e){let t=document.getElementById(`df-name`)?.value.trim();if(!t)return;let n={name:t,category:document.getElementById(`df-cat`)?.value||`Other`,provider:document.getElementById(`df-provider`)?.value.trim()||``,reference:document.getElementById(`df-ref`)?.value.trim()||``,expiryDate:document.getElementById(`df-expiry`)?.value||``,renewalCost:parseFloat(document.getElementById(`df-cost`)?.value)||0,storedAt:document.getElementById(`df-stored`)?.value.trim()||``,notes:document.getElementById(`df-notes`)?.value.trim()||``};if(e){let t=m.documents.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=m.documents.length?Math.max(...m.documents.map(e=>e.id))+1:1,m.documents.push(n);if(n.expiryDate&&n.renewalCost>0){m.bills||(m.bills=[]);let t=`doc_${e||n.id}`,r=m.bills.find(e=>e._docRef===t),i={name:`${n.name}${n.provider?` - `+n.provider:``}`,amount:n.renewalCost,category:n.category===`Vehicle`?`Insurance`:n.category,frequency:`Annual`,autopay:!1,startDate:n.expiryDate,_docRef:t};r?Object.assign(r,i):(i.id=uid(),m.bills.push(i))}saveData(m),closeModal(),renderAll()}function ve(e){if(!confirm(`Delete this document?`))return;let t=`doc_${e}`;m.bills=(m.bills||[]).filter(e=>e._docRef!==t),m.documents=m.documents.filter(t=>t.id!==e),saveData(m),closeModal(),renderAll()}var ye=[{key:`HVAC`,icon:`❄️`},{key:`Plumbing`,icon:`🚿`},{key:`Electrical`,icon:`💡`},{key:`Garden`,icon:`🌿`},{key:`Cleaning`,icon:`🧹`},{key:`Safety`,icon:`🔥`},{key:`Appliance`,icon:`🔧`},{key:`Exterior`,icon:`🏠`},{key:`Other`,icon:`📋`}],be=[{name:`Gutters Cleaned`,category:`Exterior`,intervalNum:6,intervalUnit:`months`,icon:`🏠`},{name:`Smoke Alarm Batteries`,category:`Safety`,intervalNum:12,intervalUnit:`months`,icon:`🔥`},{name:`Pest Control`,category:`Exterior`,intervalNum:12,intervalUnit:`months`,icon:`🐛`},{name:`AC Filter Cleaned`,category:`HVAC`,intervalNum:3,intervalUnit:`months`,icon:`❄️`},{name:`Hot Water System Flush`,category:`Plumbing`,intervalNum:12,intervalUnit:`months`,icon:`🚿`},{name:`Lawn Mowing`,category:`Garden`,intervalNum:2,intervalUnit:`weeks`,icon:`🌿`},{name:`Oven Clean`,category:`Cleaning`,intervalNum:6,intervalUnit:`months`,icon:`🧹`},{name:`Pool Maintenance`,category:`Exterior`,intervalNum:1,intervalUnit:`months`,icon:`🏊`},{name:`Drains / Septic`,category:`Plumbing`,intervalNum:2,intervalUnit:`years`,icon:`🚿`},{name:`Roof Inspection`,category:`Exterior`,intervalNum:2,intervalUnit:`years`,icon:`🏠`}];function xe(e){if(!e.lastDone)return null;let t=new Date(e.lastDone),n=e.intervalNum||1,r=e.intervalUnit||`months`;return r===`days`?t.setDate(t.getDate()+n):r===`weeks`?t.setDate(t.getDate()+n*7):r===`months`?t.setMonth(t.getMonth()+n):r===`years`&&t.setFullYear(t.getFullYear()+n),t}function Se(e){let t=xe(e);return t?Math.ceil((t-new Date)/864e5):null}function Ce(){let e=m.maintenance||[];if(e.length===0){let t=new Set(e.map(e=>e.name.toLowerCase())),n=be.filter(e=>!t.has(e.name.toLowerCase()));document.getElementById(`maintenance-content`).innerHTML=`
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
              <div class="maint-starter-name">${e.icon} ${x(e.name)}</div>
              <div class="maint-starter-sub">Every ${e.intervalNum} ${e.intervalUnit}</div>
            </button>`).join(``)}
        </div>
      </div>`:``}`;return}let t=[...e].map(e=>{let t=Se(e);return{...e,_days:t}}).sort((e,t)=>e._days===null&&t._days===null?0:e._days===null?1:t._days===null?-1:e._days-t._days),n=t.filter(e=>e._days!==null&&e._days<0).length,r=t.filter(e=>e._days!==null&&e._days>=0&&e._days<=14).length,i=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${n>0?`<span class="veh-badge red">${n} overdue</span>`:``}
        ${r>0?`<span class="veh-badge amber">${r} due soon</span>`:``}
        <span style="font-size:13px;color:var(--text-muted)">${e.length} item${e.length===1?``:`s`}</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openMaintForm()">+ Add Item</button>
    </div>`;if(t.forEach(e=>{let t=e._days,n=`ok`,r=``;t===null?(n=`ok`,r=e.lastDone?`Last done ${new Date(e.lastDone).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}`:`Never done`):t<0?(n=`overdue`,r=`Overdue by ${Math.abs(t)} day${Math.abs(t)===1?``:`s`}`):t<=14?(n=`due-soon`,r=t===0?`Due today`:`Due in ${t} day${t===1?``:`s`}`):r=`Due ${xe(e).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`;let a=ye.find(t=>t.key===e.category)||ye[ye.length-1],o=e.intervalNum?`Every ${e.intervalNum} ${e.intervalUnit}`:``;i+=`
      <div class="maint-item ${n}">
        <div class="maint-row">
          <div class="maint-icon">${a.icon}</div>
          <div class="maint-body">
            <div class="maint-name">${x(e.name)}</div>
            <div class="maint-sub">${[r,o,e.provider?x(e.provider):``].filter(Boolean).join(` · `)}</div>
          </div>
          <div class="maint-actions">
            <button class="maint-done-btn" onclick="event.stopPropagation();markMaintDone(${e.id})">✓ Done</button>
            <button class="btn btn-sm" onclick="openMaintForm(${e.id})">Edit</button>
          </div>
        </div>
        ${e.lastCost?`<div style="font-size:11px;color:var(--text-muted);margin-top:6px;padding-left:48px">Last cost: ${w(e.lastCost)}</div>`:``}
      </div>`}),e.length<3){let t=new Set(e.map(e=>e.name.toLowerCase())),n=be.filter(e=>!t.has(e.name.toLowerCase()));n.length&&(i+=`<div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add more</div>
        <div class="maint-starter">
          ${n.slice(0,6).map((e,t)=>`
            <button class="maint-starter-btn" onclick="quickAddMaint(${t})">
              <div class="maint-starter-name">${e.icon} ${x(e.name)}</div>
              <div class="maint-starter-sub">Every ${e.intervalNum} ${e.intervalUnit}</div>
            </button>`).join(``)}
        </div>
      </div>`)}document.getElementById(`maintenance-content`).innerHTML=i}function we(e){let t=e?(m.maintenance||[]).find(t=>t.id===e):null,n=!!t;document.getElementById(`modal-title`).textContent=n?`Edit ${t.name}`:`Add Maintenance Item`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="mf-name" type="text" maxlength="200" value="${t?S(t.name):``}" placeholder="e.g. Gutters Cleaned, Pest Control">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="mf-cat">
          ${ye.map(e=>`<option value="${e.key}"${t&&t.category===e.key?` selected`:``}>${e.icon} ${e.key}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Provider</label>
        <input class="form-input" id="mf-provider" type="text" maxlength="200" value="${t?S(t.provider||``):``}" placeholder="e.g. Jim's Mowing, DIY">
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
        <input class="form-input" id="mf-notes" type="text" maxlength="200" value="${t?S(t.notes||``):``}">
      </div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${n?`<button class="btn" style="color:var(--danger);margin-right:auto" onclick="deleteMaint(${e})">Delete</button>`:``}
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveMaint(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Te(e){let t=document.getElementById(`mf-name`)?.value.trim();if(!t)return;let n={name:t,category:document.getElementById(`mf-cat`)?.value||`Other`,provider:document.getElementById(`mf-provider`)?.value.trim()||``,intervalNum:parseInt(document.getElementById(`mf-interval-num`)?.value)||1,intervalUnit:document.getElementById(`mf-interval-unit`)?.value||`months`,lastDone:document.getElementById(`mf-last`)?.value||``,lastCost:parseFloat(document.getElementById(`mf-cost`)?.value)||0,notes:document.getElementById(`mf-notes`)?.value.trim()||``};if(e){let t=m.maintenance.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=m.maintenance.length?Math.max(...m.maintenance.map(e=>e.id))+1:1,m.maintenance.push(n);saveData(m),closeModal(),renderAll()}function Ee(e){confirm(`Delete this maintenance item?`)&&(m.maintenance=m.maintenance.filter(t=>t.id!==e),saveData(m),closeModal(),renderAll())}function De(e){let t=m.maintenance.find(t=>t.id===e);if(!t)return;let n=new Date().toISOString().slice(0,10);if(t.lastDone=n,t.lastCost>0){let e=n.slice(0,7),r=getMonthData(e),i=r.expenses.find(e=>(e.category||``).toLowerCase()===`other`&&(e.name||``).toLowerCase().includes(`maintenance`))||r.expenses.find(e=>(e.name||``).toLowerCase().includes(`maintenance`));if(!i&&(i={id:M(m.budget.expenses),name:`Home Maintenance`,amount:0,frequency:`monthly`,category:`Other`,dueDate:``,vendor:null},m.budget.expenses.push(i),isMonthCustomized(e))){let t=m.budget.months[e];i={...i,id:M(t.expenses)},t.expenses.push(i)}m.budget.actuals[e]||(m.budget.actuals[e]={});let a=getActualEntries(i.id,e);a.push({id:a.length?Math.max(...a.map(e=>e.id))+1:1,amount:t.lastCost,date:n,note:`${t.name}${t.provider?` - `+t.provider:``}`}),m.budget.actuals[e][i.id]=a}saveData(m),renderAll()}function Oe(e){let t=be[e];if(!t)return;let n={id:m.maintenance.length?Math.max(...m.maintenance.map(e=>e.id))+1:1,name:t.name,category:t.category,provider:``,intervalNum:t.intervalNum,intervalUnit:t.intervalUnit,lastDone:``,lastCost:0,notes:``};m.maintenance.push(n),saveData(m),renderAll()}var ke=[`Fridge`,`Freezer`,`Pantry`,`Fruit & Veg`,`Spices`,`Drinks`,`Cleaning`,`Other`],Ae=[{name:`Milk`,cat:`Fridge`},{name:`Eggs`,cat:`Fridge`},{name:`Cheese`,cat:`Fridge`},{name:`Butter`,cat:`Fridge`},{name:`Yoghurt`,cat:`Fridge`},{name:`Chicken breast`,cat:`Freezer`},{name:`Mince`,cat:`Freezer`},{name:`Fish fillets`,cat:`Freezer`},{name:`Frozen veg`,cat:`Freezer`},{name:`Pasta`,cat:`Pantry`},{name:`Rice`,cat:`Pantry`},{name:`Tinned tomatoes`,cat:`Pantry`},{name:`Olive oil`,cat:`Pantry`},{name:`Flour`,cat:`Pantry`},{name:`Sugar`,cat:`Pantry`},{name:`Bread`,cat:`Pantry`},{name:`Cereal`,cat:`Pantry`},{name:`Onions`,cat:`Fruit & Veg`},{name:`Potatoes`,cat:`Fruit & Veg`},{name:`Bananas`,cat:`Fruit & Veg`},{name:`Apples`,cat:`Fruit & Veg`},{name:`Salt`,cat:`Spices`},{name:`Pepper`,cat:`Spices`},{name:`Garlic`,cat:`Spices`}];function je(){let e=document.getElementById(`pantry-content`);if(!e)return;let t=m.meals.pantry||[];if(t.length===0){e.innerHTML=`
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon" style="font-size:48px">🥫</div>
        <p style="margin:12px 0">Track what's in your kitchen. Tap items you usually keep stocked.</p>
        <button class="btn btn-primary" onclick="openPantryForm()">+ Add Item</button>
      </div>
      <div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add common items</div>
        <div class="pantry-starter">
          ${Ae.map(e=>`<button class="pantry-starter-btn" onclick="quickAddPantry('${S(e.name)}','${e.cat}')">${x(e.name)}</button>`).join(``)}
        </div>
      </div>`;return}let n={};ke.forEach(e=>n[e]=[]),t.forEach(e=>{n[ke.includes(e.cat)?e.cat:`Other`].push(e)});let r=t.filter(e=>e.status===`need`).length,i=t.filter(e=>e.status===`low`).length,a=`
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
    </div>`;if(ke.forEach(e=>{let t=n[e];t.length&&(a+=`<div class="pantry-cat-header">${x(e)} (${t.length})</div>`,t.forEach(e=>{let t=e.status===`stocked`?`✓`:e.status===`low`?`!`:`✗`;e.status===`stocked`||e.status,a+=`<div class="pantry-item">
        <div class="pantry-status ${e.status}" onclick="cyclePantryStatus(${e.id})" title="Tap to change">${t}</div>
        <div class="pantry-body">
          <div class="pantry-name">${x(e.name)}</div>
          ${e.qty?`<div class="pantry-meta">${x(e.qty)}</div>`:``}
        </div>
        <div class="pantry-actions">
          <button class="btn btn-sm" style="font-size:11px" onclick="openPantryForm(${e.id})">Edit</button>
          <button class="btn btn-sm" style="font-size:11px;color:var(--danger)" onclick="deletePantryItem(${e.id})">×</button>
        </div>
      </div>`}))}),t.length<10){let e=new Set(t.map(e=>e.name.toLowerCase())),n=Ae.filter(t=>!e.has(t.name.toLowerCase()));n.length&&(a+=`<div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add more</div>
        <div class="pantry-starter">
          ${n.slice(0,12).map(e=>`<button class="pantry-starter-btn" onclick="quickAddPantry('${S(e.name)}','${e.cat}')">${x(e.name)}</button>`).join(``)}
        </div>
      </div>`)}e.innerHTML=a}function Me(e){let t=(m.meals.pantry||[]).find(t=>t.id===e);t&&(t.status={stocked:`low`,low:`need`,need:`stocked`}[t.status]||`stocked`,saveData(m),je())}function Ne(e){let t=e?(m.meals.pantry||[]).find(t=>t.id===e):null;document.getElementById(`modal-title`).textContent=t?`Edit Item`:`Add Pantry Item`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="pf-name" type="text" maxlength="200" value="${t?S(t.name):``}" placeholder="e.g. Pasta, Milk, Chicken">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="pf-cat">
          ${ke.map(e=>`<option value="${e}"${t&&t.cat===e?` selected`:``}>${e}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Quantity <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="pf-qty" type="text" maxlength="200" value="${t?S(t.qty||``):``}" placeholder="e.g. 2 bags, 1L, 500g">
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
    <button class="btn btn-primary" onclick="savePantryItem(${e||`null`})">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Pe(e){let t=document.getElementById(`pf-name`)?.value.trim();if(!t)return;let n={name:t,cat:document.getElementById(`pf-cat`)?.value||`Other`,qty:document.getElementById(`pf-qty`)?.value.trim()||``,status:document.querySelector(`input[name="pf-status"]:checked`)?.value||`stocked`},r=m.meals.pantry;if(e){let t=r.find(t=>t.id===e);t&&Object.assign(t,n)}else n.id=r.length?Math.max(...r.map(e=>e.id))+1:1,r.push(n);saveData(m),closeModal(),je()}function Fe(e){m.meals.pantry=(m.meals.pantry||[]).filter(t=>t.id!==e),saveData(m),je()}function Ie(e,t){let n=m.meals.pantry;n.push({id:n.length?Math.max(...n.map(e=>e.id))+1:1,name:e,cat:t,qty:``,status:`stocked`}),saveData(m),je()}function Le(){let e=(m.meals.pantry||[]).filter(e=>e.status===`need`||e.status===`low`);if(!e.length)return;m.lists||(m.lists={}),m.lists.food||(m.lists.food={items:[],weeklyBudget:200,budget:0,stores:[],favourites:[],history:[]});let t=m.lists.food.items,n={Fridge:`dairy`,Freezer:`frozen`,Pantry:`pantry`,"Fruit & Veg":`produce`,Spices:`pantry`,Drinks:`drinks`,Cleaning:`cleaning`,Other:`other`},r=0;e.forEach(e=>{t.some(t=>t.name.toLowerCase()===e.name.toLowerCase()&&t.state===`active`)||(t.push({id:`si-`+Date.now()+`-`+r,name:e.name,quantity:1,unit:`units`,notes:``,aisle:n[e.cat]||`other`,state:`active`,addedBy:`pantry`,addedAt:new Date().toISOString(),mealTag:`Pantry`,manualPrice:null,barcodeId:null}),r++)}),r>0&&(saveData(m),_listsActiveType=`food`,_listsView=`list`,activateTab(`lists`));let i=document.querySelector(`[onclick*="pantryToShoppingList"]`);if(i){let e=i.textContent;i.textContent=`Added ${r} items`,i.style.color=`var(--success)`,setTimeout(()=>{i.textContent=e,i.style.color=``},2e3)}}var Re=[`Cash & Savings`,`Investments`,`Property`,`Superannuation`,`Vehicle`,`Other`],ze=[`Mortgage`,`Car Loan`,`Credit Card`,`Personal Loan`,`HECS/HELP`,`Other`];function Be(){let e=document.getElementById(`networth-content`);if(!e)return;let t=m.netWorth,n=t.assets||[],r=t.liabilities||[],i=t.snapshots||[],a=n.reduce((e,t)=>e+(parseFloat(t.value)||0),0),o=r.reduce((e,t)=>e+(parseFloat(t.value)||0),0),s=a-o,c=``;if(i.length>=2){let e=s-i[i.length-2].netWorth;c=`<span class="${e>=0?`up`:`down`}">${e>=0?`+`:``}${E(e)}</span> vs last snapshot`}if(!n.length&&!r.length){e.innerHTML=`
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
      <div class="nw-hero-amount ${s>=0?`positive`:`negative`}">${E(s)}</div>
      ${c?`<div class="nw-hero-change">${c}</div>`:``}
    </div>

    ${He(s)}
    ${r.some(e=>e.rate)?Ue(r):``}
    ${i.length>1?qe(i):``}

    <div class="nw-cols">
      <div class="nw-col-card assets">
        <div class="nw-col-header">
          <span class="nw-col-title">Assets</span>
          <span class="nw-col-total">${E(a)}</span>
        </div>
        ${n.length?n.map(e=>Ve(e,`asset`)).join(``):`<div class="nw-empty">No assets yet</div>`}
        <div class="nw-add-row">
          <button class="btn-outline" style="font-size:12px;padding:6px 14px" onclick="openNWModal('asset')">+ Add asset</button>
        </div>
      </div>
      <div class="nw-col-card liabilities">
        <div class="nw-col-header">
          <span class="nw-col-title">Liabilities</span>
          <span class="nw-col-total">${E(o)}</span>
        </div>
        ${r.length?r.map(e=>Ve(e,`liability`)).join(``):`<div class="nw-empty">No liabilities yet</div>`}
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

  `}function Ve(e,t){let n=e.category||``;if(t===`liability`&&e.rate){let t=parseFloat(e.value)||0,r=parseFloat(e.rate),i=t*r/1200;n+=n?` · `:``,n+=`${r}% p.a. · $${Math.round(i).toLocaleString()}/mo interest`}return`
    <div class="nw-item">
      <div style="flex:1;min-width:0">
        <div class="nw-item-name">${x(e.name)}</div>
        ${n?`<div class="nw-item-cat">${n}</div>`:``}
      </div>
      <div class="nw-item-value">${E(parseFloat(e.value)||0)}</div>
      <div class="nw-item-actions">
        <button class="icon-btn" title="Edit" onclick="openNWModal('${t}','${e.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteNWItem('${t}','${e.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>`}function He(e){let t=m.netWorth.target||{},n=parseFloat(t.amount)||0,r=parseInt(t.byYear)||0,i=new Date().getFullYear();if(!n||!r)return`
      <div class="nw-target-card">
        <div class="nw-target-header">
          <span class="nw-target-title">Your target</span>
          <button class="btn-outline" style="font-size:12px;padding:5px 12px" onclick="openNWTargetModal()">Set target</button>
        </div>
        <div class="nw-target-empty">
          <span style="font-size:28px">🎯</span>
          <span style="font-size:13px;color:#64748b">Set a net worth goal and track your progress towards it.</span>
        </div>
      </div>`;let a=Math.min(e/n*100,100),o=Math.max(n-e,0),s=Math.max(r-i,0),c=s*12,l=c>0?Math.ceil(o/c):0,u=e>=n,d=m.netWorth.snapshots||[],f=``;if(d.length>=2){let e=d[0],t=d[d.length-1],n=Math.max((new Date(t.date)-new Date(e.date))/(1e3*60*60*24*30.5),1),a=(t.netWorth-e.netWorth)/n;if(a>0&&o>0){let e=Math.ceil(o/a),t=i+Math.floor(e/12),n=t<=r;f=`<div class="nw-target-stat">
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
        <div class="nw-target-goal">${E(n)}</div>
        <div style="font-size:13px;color:#64748b">by ${r}</div>
      </div>
      <div class="nw-progress-track">
        <div class="nw-progress-fill ${u?`over`:``}" style="width:${a.toFixed(1)}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#94a3b8;margin-bottom:14px">
        <span>${a.toFixed(0)}% there</span>
        <span>${u?`🎉 Goal reached!`:E(o)+` to go`}</span>
      </div>
      <div class="nw-target-stats">
        ${!u&&s>0?`<div class="nw-target-stat">
          <div class="nw-target-stat-val">${s} yr${s===1?``:`s`}</div>
          <div class="nw-target-stat-lbl">Time remaining</div>
        </div>`:``}
        ${!u&&l>0?`<div class="nw-target-stat">
          <div class="nw-target-stat-val">$${l.toLocaleString()}/mo</div>
          <div class="nw-target-stat-lbl">Required growth</div>
        </div>`:``}
        ${f}
      </div>
    </div>`}function Ue(e){let t=e.filter(e=>e.rate);if(!t.length)return``;let n=t.reduce((e,t)=>e+(parseFloat(t.value)||0)*(parseFloat(t.rate)||0)/1200,0),r=t.map(e=>{let t=parseFloat(e.value)||0,n=parseFloat(e.rate)||0,r=parseFloat(e.monthlyPayment)||0,i=t*n/1200,a=``;if(r>0)if(r<=i)a=`<span class="nw-debt-payoff warn">⚠ Paying interest only</span>`;else{let e=n/1200,i=-Math.log(1-e*t/r)/Math.log(1+e);if(isFinite(i)&&i>0){let e=new Date;e.setMonth(e.getMonth()+Math.ceil(i));let n=e.toLocaleString(`default`,{month:`short`}),o=e.getFullYear();a=`<span class="nw-debt-payoff" title="${E(r*Math.ceil(i)-t)} total interest">Paid off ${n} ${o}</span>`}}return`<div class="nw-debt-row">
      <span class="nw-debt-name">${x(e.name)}</span>
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
    </div>`}function We(){let e=m.netWorth.target||{};document.getElementById(`nw-t-amount`).value=e.amount||``,document.getElementById(`nw-t-year`).value=e.byYear||``,document.getElementById(`nw-target-modal`).style.display=`flex`}function Ge(){document.getElementById(`nw-target-modal`).style.display=`none`}function Ke(){let e=parseFloat(document.getElementById(`nw-t-amount`).value),t=parseInt(document.getElementById(`nw-t-year`).value);!e||!t||(m.netWorth.target||(m.netWorth.target={}),m.netWorth.target.amount=e,m.netWorth.target.byYear=t,saveData(m),Be(),Ge())}function qe(e){let t=e.slice(-12),n=Math.max(...t.map(e=>Math.abs(e.netWorth)),1);return`
    <div class="nw-trend-card">
      <div class="nw-trend-title">Net Worth over time</div>
      <div class="nw-trend-chart">${t.map(e=>{let t=Math.round(Math.abs(e.netWorth)/n*70);return`<div class="nw-trend-bar-wrap">
      <div class="nw-trend-bar ${e.netWorth>=0?`pos`:`neg`}" style="height:${t}px"></div>
      <div class="nw-trend-label">${e.date?e.date.slice(0,7):``}</div>
    </div>`}).join(``)}</div>
    </div>`}function Je(){if(document.getElementById(`nw-modal`))return;let e=document.createElement(`div`);for(e.innerHTML=`
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
    </div>`;e.firstChild;)document.body.appendChild(e.firstChild)}function Ye(e,t){Je();let n=m.netWorth,r=e===`asset`?n.assets:n.liabilities,i=e===`asset`?Re:ze,a=t?r.find(e=>e.id===t):null,o=document.getElementById(`nw-modal`);if(!o)return;document.getElementById(`nw-modal-title`).textContent=(a?`Edit`:`Add`)+` `+(e===`asset`?`Asset`:`Liability`),document.getElementById(`nw-edit-id`).value=t||``,document.getElementById(`nw-edit-type`).value=e,document.getElementById(`nw-name`).value=a?a.name:``,document.getElementById(`nw-value`).value=a?a.value:``,document.getElementById(`nw-rate`).value=a&&a.rate?a.rate:``,document.getElementById(`nw-payment`).value=a&&a.monthlyPayment?a.monthlyPayment:``;let s=a?.category||i[0],c=document.getElementById(`nw-cat-wrap`);c&&(c.innerHTML=customSelect(`nw-cat`,i,s,e=>{_csStore[`nw-cat`].value=e}));let l=document.getElementById(`nw-debt-fields`);l&&(l.style.display=e===`liability`?`flex`:`none`),o.style.display=`flex`}function Xe(){let e=document.getElementById(`nw-modal`);e&&(e.style.display=`none`)}function Ze(){let e=document.getElementById(`nw-name`).value.trim(),t=parseFloat(document.getElementById(`nw-value`).value),n=_csStore[`nw-cat`]?.value||``,r=document.getElementById(`nw-edit-type`).value,i=document.getElementById(`nw-edit-id`).value,a=parseFloat(document.getElementById(`nw-rate`).value)||0,o=parseFloat(document.getElementById(`nw-payment`).value)||0;if(!e||isNaN(t))return;let s=r===`asset`?m.netWorth.assets:m.netWorth.liabilities,c={name:e,value:t,category:n};if(r===`liability`&&(a&&(c.rate=a),o&&(c.monthlyPayment=o)),i){let e=s.findIndex(e=>e.id===i);e!==-1&&(s[e]={...s[e],...c})}else s.push({id:uid(),...c});saveData(m),Xe(),Be()}function Qe(e,t){let n=e===`asset`?m.netWorth.assets:m.netWorth.liabilities,r=n.findIndex(e=>e.id===t);r!==-1&&(n.splice(r,1),saveData(m),Be())}function $e(){let e=m.netWorth,t=(e.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0)-(e.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),n=new Date().toISOString().slice(0,10);e.snapshots||(e.snapshots=[]);let r=e.snapshots.findIndex(e=>e.date===n),i={date:n,netWorth:t,assets:(e.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),liabilities:(e.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0)};r===-1?e.snapshots.push(i):e.snapshots[r]=i,saveData(m),Be()}var et=[{label:`Mortgage / Rent`,icon:`🏠`},{label:`Electricity`,icon:`⚡`},{label:`Gas`,icon:`🔥`},{label:`Water`,icon:`💧`},{label:`Internet`,icon:`📡`},{label:`Phone`,icon:`📱`},{label:`Insurance`,icon:`🛡️`},{label:`Car Registration`,icon:`🚗`},{label:`Rates & Taxes`,icon:`🏛️`},{label:`Loan Repayment`,icon:`💳`},{label:`Education`,icon:`📚`},{label:`Subscriptions`,icon:`📺`},{label:`Health`,icon:`🏥`},{label:`Other`,icon:`📦`}],tt=[`Monthly`,`Fortnightly`,`Weekly`,`Quarterly`,`Annually`];function nt(e){let t=et.find(t=>t.label===e);return t?t.icon:`📦`}function rt(e){if(e<0)return`<span class="bill-due-badge overdue">Overdue ${Math.abs(e)}d</span>`;if(e===0)return`<span class="bill-due-badge today">Due today</span>`;if(e<=7)return`<span class="bill-due-badge soon">Due in ${e}d</span>`;let t=new Date;return t.setDate(t.getDate()+e),`<span class="bill-due-badge ok">${t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}</span>`}function it(e){return(parseFloat(e.amount)||0)*({Weekly:52/12,Fortnightly:26/12,Monthly:1,Quarterly:1/3,Annually:1/12}[e.frequency||`Monthly`]||1)}function at(){let e=document.getElementById(`bills-content`);if(!e)return;let r=m.bills||[],i=m.subscriptions||[],a=_billsSubsFilter,o=`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,s=`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,c=r.reduce((e,t)=>e+it(t),0)+i.reduce((e,t)=>e+subMonthlyAmount(t),0),l=r.filter(e=>n(e)<0).length,u=r.filter(e=>{let t=n(e);return t>=0&&t<=7}).length,d=new Date;d.setHours(0,0,0,0);let f=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],p=Array.from({length:14},(e,n)=>{let i=new Date(d);i.setDate(i.getDate()+n);let a=r.filter(e=>t(e).toDateString()===i.toDateString()),o=[i.toDateString()===d.toDateString()&&`today`,a.length&&`has-bill`].filter(Boolean).join(` `);return`<div class="bills-day" title="${a.map(e=>e.name).join(`, `)}">
      <div class="bills-day-label">${f[i.getDay()]}</div>
      <div class="bills-day-num ${o}">${i.getDate()}</div>
      ${a.length?`<div class="bills-day-dot"></div>`:`<div style="height:5px"></div>`}
    </div>`}).join(``);function h(e){let t=n(e),r=t<0?`overdue`:t<=7?`due-soon`:``,i=(e.frequency||`Monthly`)===`Monthly`?``:` · ${e.frequency}`;return`<div class="bill-row ${r}">
      <div class="bill-icon">${nt(e.category)}</div>
      <div class="bill-info">
        <div class="bill-name">${x(e.name)}<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;background:#fef3c7;color:#92400e;margin-left:6px">BILL</span>${e._vehicleRef?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#f0f9ff;color:#0369a1;margin-left:4px;cursor:pointer" onclick="event.stopPropagation();activateTab('vehicles')">Vehicle →</span>`:``}${e._docRef?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#f5f3ff;color:#6d28d9;margin-left:4px;cursor:pointer" onclick="event.stopPropagation();activateTab('documents')">Document →</span>`:``}</div>
        <div class="bill-meta">${e.category||``}${i}${e.autopay?` · Autopay ✓`:``}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="bill-amount">$${(parseFloat(e.amount)||0).toLocaleString()}</div>
        ${rt(t)}
      </div>
      ${t>=0?`<button class="bill-paid-btn" onclick="markBillPaid('${e.id}')">✓ Paid</button>`:``}
      <div class="bill-actions">
        <button class="icon-btn" title="Edit" onclick="openBillModal('${e.id}')">${o}</button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteBill('${e.id}')">${s}</button>
      </div>
    </div>`}function g(e){let t=subMonthlyAmount(e),n=e.frequency===`Annual`?`$${parseFloat(e.amount).toLocaleString()}/yr`:e.frequency===`Weekly`?`$${parseFloat(e.amount).toFixed(2)}/wk`:`$${parseFloat(e.amount).toFixed(2)}/mo`,r=e.renewalDate?` · Renews ${e.renewalDate}`:``;return`<div class="bill-row">
      <div class="bill-icon">${subCatIcon(e.category)}</div>
      <div class="bill-info">
        <div class="bill-name">${x(e.name)}<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;background:#ede9fe;color:#5b21b6;margin-left:6px">SUB</span></div>
        <div class="bill-meta">${e.category||`Other`} · ${n}${r}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="bill-amount">$${t.toFixed(2)}<span style="font-size:11px;font-weight:400;color:#94a3b8">/mo</span></div>
      </div>
      <div class="bill-actions">
        <button class="icon-btn" title="Edit" onclick="openSubModal('${e.id}')">${o}</button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteSub('${e.id}')">${s}</button>
      </div>
    </div>`}let _=[...r].sort((e,t)=>n(e)-n(t)),v=_.filter(e=>n(e)<0),y=_.filter(e=>{let t=n(e);return t>=0&&t<=7}),b=_.filter(e=>{let t=n(e);return t>7&&t<=31}),S=_.filter(e=>n(e)>31),C=a===`all`||a===`bills`,ee=a===`all`||a===`subs`,w=_subImportResults.filter(e=>!_subImportDismissed.has(e._key));e.innerHTML=`
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
        <div class="bills-stat-val">$${Math.round(c).toLocaleString()}</div>
        <div class="bills-stat-lbl">Monthly total</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val">$${Math.round(c*12).toLocaleString()}</div>
        <div class="bills-stat-lbl">Annual total</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val ${u>0?`warn`:`ok`}">${u}</div>
        <div class="bills-stat-lbl">Due this week</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val ${l>0?`danger`:`ok`}">${l}</div>
        <div class="bills-stat-lbl">Overdue</div>
      </div>
    </div>

    ${r.length&&C?`
    <div class="bills-timeline">
      <div class="bills-timeline-title">Next 14 days</div>
      <div class="bills-strip">${p}</div>
    </div>`:``}

    ${w.length?renderSubImportResults(w):``}

    <div class="bills-upcoming">
      ${C?`
        ${v.length?`<div class="bills-upcoming-group">⚠ Overdue</div>${v.map(h).join(``)}`:``}
        ${y.length?`<div class="bills-upcoming-group">This week</div>${y.map(h).join(``)}`:``}
        ${b.length?`<div class="bills-upcoming-group">This month</div>${b.map(h).join(``)}`:``}
        ${S.length?`<div class="bills-upcoming-group">Later</div>${S.map(h).join(``)}`:``}
        ${r.length?``:`<div style="padding:20px 0;color:var(--text-muted);font-size:13px">No bills yet — click <strong>+ Bill</strong> to add one.</div>`}
      `:``}
      ${ee?`
        ${i.length?`<div class="bills-upcoming-group">Subscriptions</div>${i.map(g).join(``)}`:`<div style="padding:20px 0;color:var(--text-muted);font-size:13px">No subscriptions yet — click <strong>+ Subscription</strong> to add one.</div>`}
      `:``}
    </div>

    <!-- Smart Import -->
    <details style="margin-top:24px;background:linear-gradient(135deg,#0f172a,#1e3a5f);border-radius:12px;padding:16px 20px;color:#fff">
      <summary style="cursor:pointer;font-size:13px;font-weight:700;list-style:none;display:flex;align-items:center;gap:8px">🤖 Smart Import — find subscriptions from bank CSV</summary>
      <div style="margin-top:14px">
        <div style="font-size:12px;color:rgba(255,255,255,0.65);margin-bottom:12px">Upload a bank statement CSV and AI will find subscriptions and bills you haven't tracked yet.</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <input type="text" maxlength="200" class="sub-api-input" id="sub-api-key" placeholder="Anthropic API key"
            value="${localStorage.getItem(`toto_ai_key`)||``}"
            oninput="localStorage.setItem('toto_ai_key', this.value)" style="flex:1;min-width:200px">
          <label class="sub-upload-btn" for="sub-csv-input">📎 Upload CSV</label>
          <input type="file" id="sub-csv-input" accept=".csv,.txt" style="display:none" onchange="handleSubCSV(event)">
        </div>
        <div id="sub-import-status" style="margin-top:10px;font-size:13px;color:rgba(255,255,255,0.7);display:none"></div>
      </div>
    </details>

    ${ct()}
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
    </div>`}function ot(e){_billsSubsFilter=e,at()}function st(){at()}function ct(e){let t=e?(m.bills||[]).find(t=>t.id===e):null,n=et.map(e=>`<option value="${e.label}" ${t&&t.category===e.label?`selected`:``}>${e.icon} ${e.label}</option>`).join(``),r=tt.map(e=>`<option value="${e}" ${t&&t.frequency===e||(!t||!t.frequency)&&e===`Monthly`?`selected`:``}>${e}</option>`).join(``),i=`width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none`,a=`font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px`;return`
    <div id="bill-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,0.2);max-height:90vh;overflow-y:auto">
        <h3 id="bill-modal-title" style="font-size:17px;font-weight:700;margin-bottom:20px">Add Bill</h3>
        <input type="hidden" id="bill-edit-id">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="${a}">Bill name</label>
            <input id="bill-name" type="text" maxlength="200" placeholder="e.g. AGL Electricity" style="${i}" value="${t?S(t.name):``}">
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
    </div>`}function lt(e){let t=e?(m.bills||[]).find(t=>t.id===e):null;at();let n=document.getElementById(`bill-modal`);n&&(document.getElementById(`bill-modal-title`).textContent=t?`Edit Bill`:`Add Bill`,document.getElementById(`bill-edit-id`).value=e||``,t&&(document.getElementById(`bill-name`).value=t.name||``,document.getElementById(`bill-cat`).value=t.category||et[0].label,document.getElementById(`bill-freq`).value=t.frequency||`Monthly`,document.getElementById(`bill-amount`).value=t.amount||``,document.getElementById(`bill-day`).value=t.dueDay||``,document.getElementById(`bill-start`).value=t.startDate||``,document.getElementById(`bill-autopay`).checked=!!t.autopay),dt(),n.style.display=`flex`)}function ut(){let e=document.getElementById(`bill-modal`);e&&(e.style.display=`none`)}function dt(){let e=document.getElementById(`bill-freq`)?.value,t=document.getElementById(`bill-day-wrap`),n=document.getElementById(`bill-start-wrap`);if(!t||!n)return;let r=e===`Monthly`;t.style.display=r?`block`:`none`,n.style.display=r?`none`:`block`}function ft(){let e=document.getElementById(`bill-name`).value.trim(),t=parseFloat(document.getElementById(`bill-amount`).value),n=document.getElementById(`bill-cat`).value,r=document.getElementById(`bill-freq`).value,i=parseInt(document.getElementById(`bill-day`).value)||null,a=document.getElementById(`bill-start`).value||null,o=document.getElementById(`bill-autopay`).checked,s=document.getElementById(`bill-edit-id`).value;if(!e||isNaN(t))return;let c={name:e,amount:t,category:n,frequency:r,autopay:o};if(r===`Monthly`?c.dueDay=i:c.startDate=a,m.bills||(m.bills=[]),s){let e=m.bills.findIndex(e=>e.id===s);e!==-1&&(m.bills[e]={...m.bills[e],...c})}else m.bills.push({id:uid(),...c});saveData(m),ut(),at()}function pt(e){m.bills=(m.bills||[]).filter(t=>t.id!==e),saveData(m),at()}function mt(e){let t=(m.bills||[]).find(t=>t.id===e);t&&(t.lastPaid=new Date().toISOString().slice(0,10),saveData(m),at())}var ht=[{label:`Streaming`,icon:`📺`},{label:`Music`,icon:`🎵`},{label:`Software`,icon:`💻`},{label:`Fitness`,icon:`💪`},{label:`Gaming`,icon:`🎮`},{label:`News`,icon:`📰`},{label:`Insurance`,icon:`🛡️`},{label:`Education`,icon:`📚`},{label:`Other`,icon:`📦`}];function gt(e){let t=ht.find(t=>t.label===e);return t?t.icon:`📦`}function _t(e){let t=parseFloat(e.amount)||0;return e.frequency===`Annual`?t/12:e.frequency===`Weekly`?t*52/12:t}var vt=[],yt=new Set;function bt(e){let t=e.map(e=>`
    <div class="sub-result-row">
      <div class="sub-result-icon">${gt(e.category)}</div>
      <div class="sub-result-info">
        <div class="sub-result-name">${x(e.name)}</div>
        <div class="sub-result-meta">${x(e.category)} · ${e.frequency} · ${x(e.description||``)}</div>
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
  </div>`}function xt(e){let t=e?(m.subscriptions||[]).find(t=>t.id===e):null;document.getElementById(`sub-modal-title`).textContent=t?`Edit Subscription`:`Add Subscription`,document.getElementById(`sub-edit-id`).value=e||``,document.getElementById(`sub-name`).value=t?t.name:``,document.getElementById(`sub-cat`).value=t&&t.category||`Streaming`,document.getElementById(`sub-freq`).value=t&&t.frequency||`Monthly`,document.getElementById(`sub-amount`).value=t?t.amount:``,document.getElementById(`sub-renewal`).value=t&&t.renewalDate||``,document.getElementById(`sub-modal`).style.display=`flex`}function St(){document.getElementById(`sub-modal`).style.display=`none`}function Ct(){let e=document.getElementById(`sub-name`).value.trim(),t=parseFloat(document.getElementById(`sub-amount`).value),n=document.getElementById(`sub-cat`).value,r=document.getElementById(`sub-freq`).value,i=document.getElementById(`sub-renewal`).value,a=document.getElementById(`sub-edit-id`).value;if(!e||isNaN(t))return;m.subscriptions||(m.subscriptions=[]);let o={name:e,amount:t,category:n,frequency:r,renewalDate:i};if(a){let e=m.subscriptions.findIndex(e=>e.id===a);e!==-1&&(m.subscriptions[e]={...m.subscriptions[e],...o})}else m.subscriptions.push({id:uid(),...o});saveData(m),St(),renderSubscriptions()}function wt(e){m.subscriptions=(m.subscriptions||[]).filter(t=>t.id!==e),saveData(m),renderSubscriptions()}async function Tt(e){let t=e.target.files[0];if(!t)return;let n=localStorage.getItem(`toto_ai_key`),r=document.getElementById(`sub-import-status`);if(!n){r&&(r.textContent=`⚠ Please enter your Anthropic API key above first.`,r.style.display=``);return}let i=(await t.text()).split(`
`).filter(e=>e.trim()).slice(0,200);r&&(r.innerHTML=`<span class="sub-spinner"></span> Analysing your transactions…`,r.style.display=``);let a=[...(m.bills||[]).map(e=>e.name),...(m.subscriptions||[]).map(e=>e.name),...(m.budget.expenses||[]).map(e=>e.name)].join(`, `),o=`You are a financial assistant analysing Australian bank statement transactions to find recurring subscriptions and bills.

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
If nothing new found, return [].`;try{let t=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":n,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:1024,messages:[{role:`user`,content:o}]})});if(!t.ok)throw Error(`API error ${t.status}`);let i=(await t.json()).content[0].text.trim().match(/\[[\s\S]*\]/);if(!i)throw Error(`No JSON found in response`);vt=JSON.parse(i[0]).map((e,t)=>({...e,_key:`import_${Date.now()}_${t}`})),yt=new Set,r&&(r.style.display=`none`),e.target.value=``,renderSubscriptions()}catch(e){r&&(r.textContent=`⚠ ${e.message}`,r.style.display=``)}}function Et(e,t){let n=vt.find(t=>t._key===e);if(n){if(t===`subscription`)m.subscriptions||(m.subscriptions=[]),m.subscriptions.push({id:uid(),name:n.name,amount:n.amount,category:n.category,frequency:n.frequency}),saveData(m);else{let e=ensureMonthOverride(selectedBudgetMonth);e.expenses.push({id:M(e.expenses),name:n.name,amount:n.amount,frequency:`monthly`,category:`Subscriptions`,recurring:!0}),saveData(m)}yt.add(e),renderSubscriptions()}}function Dt(e){yt.add(e),renderSubscriptions()}var P={work:{label:`Work`,emoji:`💼`,color:`#dbeafe`,text:`#1e40af`,financial:!1},study:{label:`Study`,emoji:`📚`,color:`#fef3c7`,text:`#92400e`,financial:!1},social:{label:`Social`,emoji:`🎉`,color:`#ede9fe`,text:`#5b21b6`,financial:!0},family:{label:`Family`,emoji:`👨‍👩‍👧`,color:`#fce7f3`,text:`#9d174d`,financial:!1},travel:{label:`Travel`,emoji:`✈️`,color:`#e0f2fe`,text:`#075985`,financial:!0},health:{label:`Health`,emoji:`🏥`,color:`#fef2f2`,text:`#991b1b`,financial:!0},finance:{label:`Finance`,emoji:`💰`,color:`#ecfeff`,text:`#155e75`,financial:!0},home:{label:`Home`,emoji:`🏠`,color:`#ecfeff`,text:`#166534`,financial:!0},school:{label:`School`,emoji:`🏫`,color:`#fff7ed`,text:`#9a3412`,financial:!0},other:{label:`Other`,emoji:`📦`,color:`#f1f5f9`,text:`#475569`,financial:!1}},Ot=new Date().toISOString().slice(0,7),F=new Date().toISOString().slice(0,10),kt=new Set,At=`week`,jt=new Set,Mt={"life-areas":!1,nudge:!1},Nt=null,Pt=[{dot:`#2563eb`,bg:`#dbeafe`,text:`#1e40af`},{dot:`#db2777`,bg:`#fce7f3`,text:`#9d174d`},{dot:`#d97706`,bg:`#fef3c7`,text:`#92400e`},{dot:`#7c3aed`,bg:`#ede9fe`,text:`#5b21b6`},{dot:`#16a34a`,bg:`#dcfce7`,text:`#166534`},{dot:`#0891b2`,bg:`#ecfeff`,text:`#155e75`},{dot:`#ea580c`,bg:`#ffedd5`,text:`#9a3412`},{dot:`#be185d`,bg:`#fdf2f8`,text:`#831843`}];function Ft(){let e=m.householdProfile?.members||[],t=m.kids?.profiles||[],n=[],r=0;return e.forEach((e,t)=>{let i=Pt[r%Pt.length];e.role===`adult`&&e.name&&(n.push({id:`adult-`+t,name:e.name,emoji:e.emoji||`🧑`,...i}),r++)}),t.forEach((e,t)=>{let i=Pt[r%Pt.length];n.push({id:e.id||`kid-`+t,name:e.name,emoji:e.emoji||`🧒`,...i}),r++}),n.length===0&&n.push({id:`adult-0`,name:`Everyone`,emoji:`👨‍👩‍👧`,...Pt[0]}),n}function It(e){return!e||e===`everyone`?{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}:Ft().find(t=>t.id===e)||{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}}function Lt(e){return Array.isArray(e.memberIds)?e.memberIds:e.memberId?[e.memberId]:[`everyone`]}function Rt(e){return It(Lt(e).find(e=>e!==`everyone`)||`everyone`)}function zt(e){let t=Lt(e);return t.includes(`everyone`)||t.length===0?`Everyone`:t.map(e=>It(e).name).join(`, `)}function Bt(e){if(e.recurrence&&e.recurrence.type&&e.recurrence.type!==`one_time`){let t={daily:`Every day`,weekdays:`Mon–Fri`,weekends:`Sat & Sun`};if(t[e.recurrence.type])return t[e.recurrence.type];if(e.recurrence.type===`specific_days`)return(e.recurrence.days||[]).map(e=>[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`][e]).join(`, `)||`Specific days`;if(e.recurrence.type===`interval`)return`Every ${e.recurrence.intervalDays} days`}return e.recurring&&e.recurring!==`none`?{weekly:`Every week`,fortnightly:`Every 2 weeks`,monthly:`Every month`,quarterly:`Every 3 months`,yearly:`Annually`}[e.recurring]||e.recurring:``}function Vt(){let e=m.planner?.events||[];return jt.size===0?e:e.filter(e=>{let t=Lt(e);return t.includes(`everyone`)?!0:[...jt].some(e=>t.includes(e))})}function Ht(e){return Vt().filter(t=>t._recurringSourceId?t.date===e:t.recurrence&&t.recurrence.type!==`one_time`?_recurrenceMatchesDate(t.recurrence,e):t.endDate&&t.endDate>t.date?e>=t.date&&e<=t.endDate:t.date===e)}function Ut(e){if(!e)return``;let[t,n]=e.split(`:`).map(Number);return`${t%12||12}:${String(n).padStart(2,`0`)}${t>=12?`pm`:`am`}`}var Wt=new Date().toISOString().slice(0,7);function Gt(){let[e,t]=Wt.split(`-`).map(Number),n=new Date(e,t-2,1);Wt=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,qt()}function Kt(){let[e,t]=Wt.split(`-`).map(Number),n=new Date(e,t,1);Wt=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,qt()}function qt(){let e=document.getElementById(`forecast-content`);if(!e)return;let t=(m.planner?.events||[]).filter(e=>e.date&&e.date.startsWith(Wt)),n=getMonthData(Wt),r=j(n.income)-j(n.expenses),[i,a]=Wt.split(`-`).map(Number),o=new Date(i,a,0).getDate(),s=[],c=1;for(;c<=o;){new Date(i,a-1,c);let e=c;for(;e<o&&new Date(i,a-1,e+1).getDay()!==1;)e++;s.push({start:c,end:e,events:[]}),c=e+1}t.sort((e,t)=>e.date.localeCompare(t.date)).forEach(e=>{let t=parseInt(e.date.split(`-`)[2]),n=s.find(e=>t>=e.start&&t<=e.end);n&&n.events.push(e)}),t.filter(e=>e.estimates&&e.estimates.length>0);let l=t.filter(e=>!e.estimates||e.estimates.length===0),u=t.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),d=r-u,f=new Date(i,a-1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`}),p=!!localStorage.getItem(`toto_ai_key`),h=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:8px">
        <button class="btn btn-sm" onclick="_prevForecastMonth()" style="font-size:16px;padding:2px 10px">‹</button>
        <span style="font-size:15px;font-weight:700;min-width:160px;text-align:center">${f}</span>
        <button class="btn btn-sm" onclick="_nextForecastMonth()" style="font-size:16px;padding:2px 10px">›</button>
      </div>
      ${p&&l.length>0?`
        <button class="btn btn-primary btn-sm" id="estimate-all-btn" onclick="estimateAllEvents()">
          Estimate all (${l.length} events)
        </button>`:``}
    </div>`;if(t.length===0){h+=`<div class="empty" style="margin-top:24px"><div class="empty-icon">📅</div><p>No events planned for ${f}. Add events in the Planner tab.</p>
      <button class="btn btn-primary" style="margin-top:12px" onclick="activateTab('planner')">Go to Planner</button></div>`,e.innerHTML=h;return}h+=`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px">
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Estimated Total</div>
        <div style="font-size:22px;font-weight:800;color:var(--danger)">${w(u)}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Budget Surplus</div>
        <div style="font-size:22px;font-weight:800;color:${r>=0?`var(--success)`:`var(--danger)`}">${w(Math.abs(r))}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">${d>=0?`Remaining After Events`:`Shortfall`}</div>
        <div style="font-size:22px;font-weight:800;color:${d>=0?`var(--success)`:`var(--danger)`}">${d>=0?``:`-`}${w(Math.abs(d))}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Events</div>
        <div style="font-size:22px;font-weight:800">${t.length}</div>
        ${l.length>0?`<div style="font-size:11px;color:var(--warning);margin-top:2px">${l.length} not yet estimated</div>`:``}
      </div>
    </div>`,s.forEach((e,t)=>{if(e.events.length===0)return;let n=e.events.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),r=new Date(i,a-1,e.start).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),o=new Date(i,a-1,e.end).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});h+=`
      <div class="section" style="margin-bottom:16px">
        <div class="section-header">
          <div>
            <div class="section-title">Week ${t+1}</div>
            <div class="section-subtitle">${r} – ${o}</div>
          </div>
          <span style="font-size:15px;font-weight:700;color:${n>0?`var(--danger)`:`var(--text-muted)`}">${n>0?w(n):`No estimates`}</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Event</th><th>Category</th><th class="amount">Estimated</th><th></th></tr></thead>
            <tbody>
              ${e.events.map(e=>{let t=P[e.category]||P.other,n=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),r=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`}),i=e.estimates&&e.estimates.length>0;return`<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${r}</td>
                  <td style="font-weight:500">${x(e.title)}</td>
                  <td><span style="display:inline-block;padding:2px 8px;border-radius:99px;background:${t.color};color:${t.text};font-size:11px;font-weight:600">${t.label}</span></td>
                  <td class="amount" style="font-weight:600;${i?``:`color:var(--text-muted)`}">${i?w(n):`—`}</td>
                  <td style="text-align:right">
                    ${i?`<details style="font-size:11px;color:var(--text-muted)"><summary style="cursor:pointer">breakdown</summary>
                          <div style="padding:4px 0">${e.estimates.filter(e=>e.accepted).map(e=>`<div style="display:flex;justify-content:space-between;gap:12px;padding:2px 0"><span>${x(e.name)}</span><span>${w(e.amount)}</span></div>`).join(``)}</div>
                        </details>`:p?`<button class="btn btn-sm" style="font-size:11px" onclick="estimatePlannerEvent('${e.id}')">Estimate</button>`:`<span style="font-size:11px;color:var(--text-muted)">No API key</span>`}
                  </td>
                </tr>`}).join(``)}
            </tbody>
          </table>
        </div>
      </div>`});let g={};t.forEach(e=>{(e.estimates||[]).filter(e=>e.accepted).forEach(e=>{let t=e.category||`Other`;g[t]=(g[t]||0)+(e.amount||0)})});let _=Object.entries(g).sort((e,t)=>t[1]-e[1]);_.length>0&&(h+=`
      <div class="section">
        <div class="section-header"><div class="section-title">By Category</div></div>
        <div style="padding:16px 20px">
          ${_.map(([e,t])=>{let n=u>0?t/u*100:0;return`<div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                <span style="font-weight:500">${e}</span>
                <span style="font-weight:600">${w(t)} <span style="font-weight:400;color:var(--text-muted)">${Math.round(n)}%</span></span>
              </div>
              <div style="height:6px;background:var(--border);border-radius:4px;overflow:hidden">
                <div style="height:100%;width:${n.toFixed(1)}%;background:#0891b2;border-radius:4px"></div>
              </div>
            </div>`}).join(``)}
        </div>
      </div>`),e.innerHTML=h}async function Jt(){let e=localStorage.getItem(`toto_ai_key`);if(!e)return;let t=(m.planner?.events||[]).filter(e=>e.date&&e.date.startsWith(Wt)&&(!e.estimates||e.estimates.length===0));if(!t.length)return;let n=document.getElementById(`estimate-all-btn`);n&&(n.textContent=`⏳ Estimating…`,n.disabled=!0);let r=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,i=(m.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,a=t.map(e=>({id:e.id,title:e.title,category:(P[e.category]||P.other).label,date:e.date,notes:e.notes||``})),o=`You are a family finance assistant for an Australian family (${r} adult${r>1?`s`:``}, ${i} child${i===1?``:`ren`}).

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
- No markdown, no code fences, just raw JSON`;try{let t=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":e,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:4096,messages:[{role:`user`,content:o}]})});if(!t.ok)throw Error(`API ${t.status}`);let n=(await t.json()).content[0].text.replace(/```[\w]*\n?/g,``).trim().match(/\[[\s\S]*\]/);if(!n)throw Error(`No JSON`);JSON.parse(n[0]).forEach(e=>{let t=(m.planner?.events||[]).find(t=>t.id===e.id);t&&e.items&&(t.estimates=e.items.map((e,t)=>({id:`est-${Date.now()}-${t}`,name:e.name,amount:Number(e.amount)||0,category:e.category||`Other`,accepted:!0})))}),saveData(m),qt()}catch(e){n&&(n.textContent=`Estimate all (${t.length} events)`,n.disabled=!1),console.error(`Batch estimate error:`,e)}}function I(){let e=document.getElementById(`planner-content`);if(!e)return;m.planner||(m.planner={events:[]});let t=new Date().toISOString().slice(0,10),n=Ft(),r={id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`},i=[...n,r],a=i.map(e=>e.name[0].toUpperCase()),o=i.map((e,t)=>{if(e.id===`everyone`)return`👨‍👩‍👧`;let n=e.name[0].toUpperCase();return a.filter(e=>e===n).length>1?(e.name[0]+(e.name[1]||``)).toUpperCase():n}),s=i.map((e,t)=>{let n=e.id===`everyone`,r=n?jt.size===0:jt.has(e.id),i=!r&&jt.size>0&&!n,a=n?`<span style="font-size:14px">👨‍👩‍👧</span>`:`<span>${o[t]}</span>`;return`<div class="pl-legend-chip ${r?`active`:``} ${i?`dimmed`:``}"
      onclick="_plannerToggleFilter('${e.id}')">
      <div class="pl-chip-avatar" style="background:${e.bg};color:${e.text}">${a}</div>
      <span>${e.name}</span>
    </div>`}).join(``),c=``;c=At===`month`?Yt():Xt();let l=new Date;l.setDate(l.getDate()+30);let u=l.toISOString().slice(0,10),d=Vt().filter(e=>e.date>=t&&e.date<=u),f=0,p=Object.entries(P).map(([e,t])=>{let n=d.filter(t=>t.category===e);n.length&&(f+=n.length);let r=n[0],i=r?x(r.title)+(r.date?` · ${new Date(r.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`:``):`Nothing planned`;return`<div class="pl-life-tile" onclick="_plannerOpenLifeSheet('${e}')">
      <div class="pl-life-tile-top">
        <div class="pl-life-tile-icon" style="background:${t.color||`#F4F4F5`}">${t.emoji}</div>
        <div>
          <div class="pl-life-tile-name">${t.label}</div>
          <div class="pl-life-tile-count">${n.length} event${n.length===1?``:`s`}</div>
        </div>
      </div>
      <div class="pl-life-tile-next">${i}</div>
    </div>`}).join(``),h=Tn(),g=h.map(e=>{let t=e.days<0?`Now!`:e.days===0?`Today!`:e.days===1?`Tomorrow`:`In ${e.days} days`,n=e.days<=0?`#ef4444`:e.days===1?`var(--good)`:e.days<=3?`#f59e0b`:`var(--iris-1)`;return`<div class="pl-nudge-tile">
      <div class="pl-nudge-tile-icon" style="background:${e.days<=0?`#FEF2F2`:e.days===1?`#ECFDF5`:e.days<=3?`#FFF7ED`:`#EEF2FF`}">${e.emoji}</div>
      <div class="pl-nudge-tile-body">
        <div class="pl-nudge-tile-title">${x(e.title)}</div>
        <div class="pl-nudge-tile-sub">${x(e.body)}</div>
      </div>
      <div class="pl-nudge-tile-day" style="color:${n}">${t}</div>
    </div>`}).join(``),_=Mt[`life-areas`],v=Mt.nudge,y=t.slice(0,7);new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`}),e.innerHTML=`
    <div style="position:relative;display:flex;flex-direction:column;height:100%;overflow:hidden">

      <!-- Month bar (wallet style) -->
      <div class="pl-month-bar">
        <button class="pl-nav-arrow" onclick="_plannerPrevMonth()">&#8249;</button>
        <div class="pl-month-label">${new Date(Ot+`-01`).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</div>
        <button class="pl-nav-arrow" onclick="_plannerNextMonth()">&#8250;</button>
      </div>

      <!-- Filter tile: view toggle + members + calendar strip -->
      <div class="pl-control-tile">
        <div class="pl-sub-bar">
          <div class="pl-view-toggle">
            <button class="pl-view-btn ${Ot===y&&F===t?`active`:``}" onclick="_plannerGoToday()">Today</button>
            <button class="pl-view-btn ${At===`week`?`active`:``}" onclick="_plannerSetView('week')">Week</button>
            <button class="pl-view-btn ${At===`month`?`active`:``}" onclick="_plannerSetView('month')">Month</button>
          </div>
          <button class="pl-add-btn" onclick="openPlannerModal(null,'${F||t}')">+</button>
        </div>
        <div class="pl-legend">${s}</div>
        ${At===`month`?`
          <div style="border-bottom:1px solid rgba(24,24,27,.06);padding:0 6px">
            <div class="pl-month-hdr">
              <div class="pl-month-hdr-cell">M</div><div class="pl-month-hdr-cell">T</div>
              <div class="pl-month-hdr-cell">W</div><div class="pl-month-hdr-cell">T</div>
              <div class="pl-month-hdr-cell">F</div><div class="pl-month-hdr-cell">S</div>
              <div class="pl-month-hdr-cell">S</div>
            </div>
            ${c}
          </div>`:c}
        <div style="height:10px"></div>
      </div>

      <!-- Scrollable body -->
      <div style="flex:1;overflow-y:auto;">

        <!-- Inline agenda (week + month view) -->
        ${tn(F)}

        <!-- Life areas -->
        <div class="pl-section-card">
          <div class="pl-section-card-hdr" onclick="_plannerToggleSection('life-areas')">
            <div class="pl-section-card-title">
              Life Areas
              <span style="font-size:11px;font-weight:700;background:var(--iris-1);color:#fff;padding:1px 8px;border-radius:99px;letter-spacing:0">${f}</span>
            </div>
            <button class="pl-section-card-toggle">${_?`Hide`:`Show`}</button>
          </div>
          ${_?`<div class="pl-section-card-body"><div class="pl-life-grid">${p}</div></div>`:``}
        </div>

        <!-- Nudges -->
        ${h.length>0?`
        <div class="pl-section-card">
          <div class="pl-section-card-hdr" onclick="_plannerToggleSection('nudge')">
            <div class="pl-section-card-title">
              Heads up 🐕
              <span style="font-size:11px;font-weight:700;background:#f59e0b;color:#fff;padding:1px 8px;border-radius:99px;letter-spacing:0">${h.length}</span>
            </div>
            <button class="pl-section-card-toggle">${v?`Hide`:`Show`}</button>
          </div>
          ${v?`<div class="pl-section-card-body">${g}</div>`:``}
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
            <button class="pl-sheet-add" id="pl-sheet-add-btn" data-date="${F}" onclick="_plannerOpenModalFromSheet()">+ Add</button>
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

    </div>`}function Yt(){let[e,t]=Ot.split(`-`).map(Number),n=new Date().toISOString().slice(0,10),r=new Date(e,t-1,1).getDay(),i=r===0?6:r-1,a=new Date(e,t,0).getDate(),o=new Date(e,t-1,0).getDate(),s=[];for(let n=i-1;n>=0;n--){let r=o-n,i=t-1||12,a=i===12?e-1:e;s.push({dateStr:`${a}-${String(i).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`,day:r,muted:!0})}for(let n=1;n<=a;n++)s.push({dateStr:`${e}-${String(t).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,day:n,muted:!1});let c=s.length%7==0?0:7-s.length%7;for(let n=1;n<=c;n++){let r=t+1>12?1:t+1,i=r===1?e+1:e;s.push({dateStr:`${i}-${String(r).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,day:n,muted:!0})}return`<div class="pl-month-grid">${s.map(e=>{let t=e.dateStr===n,r=e.dateStr===F,i=e.dateStr?Ht(e.dateStr):[],a=[...new Set(i.flatMap(e=>Lt(e)))].filter(e=>e!==`everyone`).slice(0,3).map(e=>`<div class="pl-cell-dot" style="background:${It(e).dot}"></div>`).join(``),o=i.length>3?`<div style="font-size:8px;color:var(--text-muted);font-weight:600">+</div>`:``;return`<div class="pl-cal-cell ${e.muted?`muted`:``} ${t?`today`:``} ${r?`selected`:``}"
                 onclick="_plannerSelectDay('${e.dateStr}')">
      <div class="pl-cell-num">${e.day}</div>
      <div class="pl-cell-dots">${a}${o}</div>
    </div>`}).join(``)}</div>`}function Xt(){let e=new Date(F+`T12:00:00`),t=e.getDay(),n=new Date(e);n.setDate(e.getDate()-(t===0?6:t-1));let r=new Date().toISOString().slice(0,10),i=[`S`,`M`,`T`,`W`,`T`,`F`,`S`];return`<div class="week-strip">${Array.from({length:7},(e,t)=>{let r=new Date(n);return r.setDate(n.getDate()+t),{date:r,dateStr:r.toISOString().slice(0,10)}}).map(({date:e,dateStr:t})=>{let n=t===r,a=t===F,o=Ht(t),s=o.length>0,c=[...new Set(o.flatMap(e=>Lt(e)))].filter(e=>e!==`everyone`).slice(0,3),l=a?`rgba(255,255,255,0.6)`:c.length?It(c[0]).dot:`#C4C2D4`;return`<div class="${a?`ws-day selected`+(n?` today-outline`:``):n?`ws-day today-outline`:`ws-day`}${s?` has`:``}" onclick="_plannerSelectDay('${t}')">
      <div class="ws-init">${i[e.getDay()]}</div>
      <div class="ws-num">${e.getDate()}</div>
      <div class="ws-dot" style="${s?`background:${l}`:``}"></div>
    </div>`}).join(``)}</div>`}function Zt(e){let t=P[e.category]||P.other,n=kt.has(e.id),r=e.estimates||[],i=r.filter(e=>e.accepted),a=i.reduce((e,t)=>e+(t.amount||0),0),o=r.reduce((e,t)=>e+(t.amount||0),0),s=e.pushed?`<span class="planner-pushed-badge">✓ In budget</span>`:r.length>0?`<span style="font-size:12px;color:var(--text-muted)">$${a.toLocaleString(`en-AU`)}</span>`:``,c=Bt(e);c&&(s=`<span class="recurring-badge">🔄 ${c}</span> `+s);let l=``;return n&&(l=`<div class="planner-event-body">`,e.notes&&(l+=`<p class="planner-notes">${x(e.notes)}</p>`),r.length>0?(l+=r.map(t=>`
        <div class="planner-estimate-row">
          <div class="planner-estimate-check ${t.accepted?`accepted`:``}" onclick="togglePlannerEstimate('${e.id}','${t.id}')">
            ${t.accepted?`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`:``}
          </div>
          <div class="planner-estimate-name"><div>${x(t.name)}</div><div class="planner-estimate-cat">${x(t.category)}</div></div>
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
        <div class="planner-event-title">${x(e.title)}</div>
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
  </div>`}function Qt(){let[e,t]=Ot.split(`-`).map(Number),n=t===1?e-1:e,r=t===1?12:t-1;Ot=`${n}-${String(r).padStart(2,`0`)}`,F=`${n}-${String(r).padStart(2,`0`)}-01`,I()}function $t(){let[e,t]=Ot.split(`-`).map(Number),n=t===12?e+1:e,r=t===12?1:t+1;Ot=`${n}-${String(r).padStart(2,`0`)}`,F=`${n}-${String(r).padStart(2,`0`)}-01`,I()}function en(e){F=e,Ot=e.slice(0,7),I()}function tn(e){let t=new Date(e+`T12:00:00`),n=e===new Date().toISOString().slice(0,10)?`Today`:t.toLocaleDateString(`en-AU`,{weekday:`long`}),r=t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`long`,year:`numeric`}),i=Ht(e).sort((e,t)=>e.allDay&&!t.allDay?-1:!e.allDay&&t.allDay?1:(e.time||`99:99`).localeCompare(t.time||`99:99`)),a=``;return a=i.length===0?`<div class="pl-agenda-empty">Nothing planned — enjoy the quiet ☀️<br><span style="color:var(--iris-1);cursor:pointer;font-weight:600;font-size:13px" onclick="openPlannerModal(null,'${e}')">+ Add an event</span></div>`:`<div class="pl-agenda-list">${i.map(t=>{let n=Rt(t),r=P[t.category]||P.other,i=t.allDay||!t.time?`All day`:Ut(t.time),a=zt(t),o=new Date().getHours()*60+new Date().getMinutes(),s=t.time?parseInt(t.time.split(`:`)[0])*60+parseInt(t.time.split(`:`)[1]):-1,c=e===new Date().toISOString().slice(0,10)&&s>=0&&o>=s&&o<s+90,l=r.color||`#f1f5f9`,u=r.text||`#475569`;return`<div class="pl-agenda-ev">
        <div class="pl-agenda-time-col">
          <span class="pl-agenda-time">${i}</span>
        </div>
        <div class="pl-agenda-timeline">
          <div class="pl-agenda-dot${c?` now`:``}" style="color:${u};background:${c?u:l}"></div>
          <div class="pl-agenda-line"></div>
        </div>
        <div class="pl-agenda-card" style="background:${l};border-color:${u}22" onclick="_plannerOpenDetail('${t.id}')">
          <div class="pl-agenda-card-title">${x(t.title)}</div>
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
  </div>`}function nn(e){Ot=e.slice(0,7),F=e,activateTab(`planner`)}function rn(){let e=new Date().toISOString().slice(0,10);Ot=e.slice(0,7),F=e,I()}function an(e){At=e,Mt[`life-areas`]=e===`week`,Mt.nudge=e===`week`,I()}function on(e){Mt[e]=!Mt[e],I()}function sn(e){e===`everyone`?jt.clear():jt.has(e)?jt.delete(e):jt.add(e),I()}function cn(e){let t=document.getElementById(`pl-day-sheet-overlay`);if(!t)return;let n=new Date(e+`T12:00:00`),r=new Date().toISOString().slice(0,10);document.getElementById(`pl-sheet-title`).textContent=e===r?`Today`:n.toLocaleDateString(`en-AU`,{weekday:`long`}),document.getElementById(`pl-sheet-date`).textContent=n.toLocaleDateString(`en-AU`,{day:`numeric`,month:`long`,year:`numeric`}),document.getElementById(`pl-sheet-add-btn`).dataset.date=e,ln(e),t.classList.add(`open`)}function ln(e){let t=Ht(e).sort((e,t)=>(e.time||`99:99`).localeCompare(t.time||`99:99`)),n=document.getElementById(`pl-sheet-list`);if(n){if(t.length===0){n.innerHTML=`<div class="pl-sheet-empty">Nothing planned. <span style="color:var(--primary);cursor:pointer;font-weight:600" onclick="_plannerOpenModalFromSheet()">Add an event →</span></div>`;return}n.innerHTML=t.map((e,t)=>{let n=Rt(e),r=P[e.category]||P.other,i=zt(e),a=e.allDay||!e.time?`All day`:Ut(e.time);return`<div class="pl-sheet-ev" onclick="_plannerOpenDetail('${e.id}')">
      <div class="pl-sheet-ev-time">${a}</div>
      <div class="pl-sheet-ev-bar" style="background:${n.dot}"></div>
      <div style="flex:1;min-width:0">
        <div class="pl-sheet-ev-title">${x(e.title)}</div>
        <div class="pl-sheet-ev-meta">${i} · ${r.emoji} ${r.label}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4D4D8" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>`}).join(``)}}function un(){let e=document.getElementById(`pl-day-sheet-overlay`);e&&e.classList.remove(`open`)}function dn(e){e.target===document.getElementById(`pl-day-sheet-overlay`)&&un()}function fn(){let e=document.getElementById(`pl-sheet-add-btn`)?.dataset?.date||F;un(),Ln(null,e)}function pn(e){let t=P[e];if(!t)return;let n=new Date().toISOString().slice(0,10),r=(m.planner?.events||[]).filter(t=>t.category===e&&t.date>=n).sort((e,t)=>e.date.localeCompare(t.date));document.getElementById(`pl-life-sheet-icon`).textContent=t.emoji,document.getElementById(`pl-life-sheet-title`).textContent=t.label,document.getElementById(`pl-life-sheet-count`).textContent=r.length+` upcoming`;let i=``;if(r.length===0)i=`<div class="pl-sheet-empty">No upcoming ${t.label.toLowerCase()} events.</div>`;else{let e=``;r.forEach(t=>{let n=t.date.slice(0,7);if(n!==e){let r=new Date(t.date+`T12:00:00`);i+=`<div class="pl-life-day-hdr">${r.toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</div>`,e=n}let r=Rt(t),a=zt(t),o=new Date(t.date+`T12:00:00`);i+=`<div class="pl-life-ev-row" onclick="_plannerCloseLifeSheet();_plannerOpenDetail('${t.id}')">
        <div class="pl-life-ev-date">${o.toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`})}</div>
        <div class="pl-life-ev-bar" style="background:${r.dot}"></div>
        <div class="pl-life-ev-content">
          <div class="pl-life-ev-title">${x(t.title)}</div>
          <div class="pl-life-ev-meta">${a}${t.time?` · `+Ut(t.time):``}</div>
        </div>
      </div>`})}document.getElementById(`pl-life-sheet-list`).innerHTML=i,document.getElementById(`pl-life-overlay`).classList.add(`open`)}function mn(){document.getElementById(`pl-life-overlay`)?.classList.remove(`open`)}function hn(e){e.target===document.getElementById(`pl-life-overlay`)&&mn()}function gn(e){let t=(m.planner?.events||[]).find(t=>t.id===e);if(!t)return;Nt=e;let n=Rt(t),r=P[t.category]||P.other,i=Lt(t);document.getElementById(`pl-detail-title`).textContent=t.title,document.getElementById(`pl-detail-color-bar`).style.background=n.dot;let a=new Date(t.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}),o=t.allDay?`All day`:t.time?Ut(t.time):``;!t.allDay&&t.endTime&&(o+=` – `+Ut(t.endTime));let s=(i.includes(`everyone`)?[{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}]:i.map(e=>It(e))).map(e=>`<span style="display:inline-flex;align-items:center;gap:5px;background:${e.bg};color:${e.text};padding:4px 10px;border-radius:99px;font-size:12px;font-weight:600">${e.emoji} ${e.name}</span>`).join(` `),c=(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),l=[{icon:`📅`,label:`Date`,value:a},o?{icon:`🕐`,label:`Time`,value:o}:null,t.location?{icon:`📍`,label:`Address`,value:x(t.location)}:null,{icon:`👥`,label:`Who`,value:`<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">${s}</div>`},{icon:r.emoji,label:`Category`,value:r.label},Bt(t)?{icon:`🔄`,label:`Repeats`,value:Bt(t)}:null,c>0?{icon:`💰`,label:`Est. cost`,value:`$${c.toLocaleString(`en-AU`)}`}:null,t.notes?{icon:`📝`,label:`Notes`,value:x(t.notes)}:null].filter(Boolean);document.getElementById(`pl-detail-body`).innerHTML=l.map(e=>`<div class="pl-detail-row">
      <div class="pl-detail-icon">${e.icon}</div>
      <div style="flex:1;min-width:0">
        <div class="pl-detail-row-label">${e.label}</div>
        <div class="pl-detail-row-value">${e.value}</div>
      </div>
    </div>`).join(``)+(r.financial?`<button class="planner-ai-btn" style="width:100%;justify-content:center;margin-top:16px" onclick="_plannerCloseDetail();estimatePlannerEvent('${e}')">✦ Estimate costs with AI</button>`:``)+`<button class="pl-detail-share-btn" onclick="_plannerOpenShare('${e}')">🔗 Share this event</button>`,document.getElementById(`pl-detail-overlay`).classList.add(`open`)}function _n(){document.getElementById(`pl-detail-overlay`)?.classList.remove(`open`),Nt=null}function vn(e){e.target===document.getElementById(`pl-detail-overlay`)&&_n()}function yn(){let e=Nt;_n(),e&&Ln(e)}function bn(e){let t=(m.planner?.events||[]).find(t=>t.id===e);if(!t)return;let n=`https://toto.app/event/${t.title.toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/(^-|-$)/g,``)}-${Math.random().toString(36).slice(2,10)}`,r=document.getElementById(`pl-share-sub`),i=document.getElementById(`pl-share-url`),a=document.getElementById(`pl-share-copy-btn`);r&&(r.textContent=t.title),i&&(i.textContent=n),a&&(a.textContent=`Copy`,a.classList.remove(`copied`)),document.getElementById(`pl-share-overlay`)?.classList.add(`open`)}function xn(){document.getElementById(`pl-share-overlay`)?.classList.remove(`open`)}function Sn(e){e.target===document.getElementById(`pl-share-overlay`)&&xn()}function Cn(){let e=document.getElementById(`pl-share-url`)?.textContent;e&&navigator.clipboard?.writeText(e).catch(()=>{});let t=document.getElementById(`pl-share-copy-btn`);t&&(t.textContent=`Copied!`,t.classList.add(`copied`),setTimeout(()=>{t.textContent=`Copy`,t.classList.remove(`copied`)},2e3))}function wn(e){let t=document.getElementById(`pl-share-url`)?.textContent||``,n=(m.planner?.events||[]).find(e=>e.id===Nt),r=n?`${n.title} — ${t}`:t;e===`sms`&&window.open(`sms:?body=${encodeURIComponent(r)}`),e===`whatsapp`&&window.open(`https://wa.me/?text=${encodeURIComponent(r)}`),e===`email`&&window.open(`mailto:?subject=${encodeURIComponent(n?.title||`Event`)}&body=${encodeURIComponent(r)}`)}function Tn(){function e(e){return Math.ceil((e-new Date().setHours(0,0,0,0))/864e5)}function t(e,t,n,r){let i=new Date(e,t,1);for(;i.getDay()!==n;)i.setDate(i.getDate()+1);return i.setDate(i.getDate()+(r-1)*7),i}let n=new Date().getFullYear();return[{emoji:`🧾`,title:`EOFY`,days:e(new Date(n,5,30)),body:`Tax time — accountant fees, donations, prepayments`},{emoji:`🎄`,title:`Christmas`,days:e(new Date(n,11,25)),body:`Gifts, travel, food — start budgeting early`},{emoji:`💐`,title:`Mother's Day`,days:e(t(n,4,0,2)),body:`Gift, brunch or dinner for Mum`},{emoji:`👔`,title:`Father's Day`,days:e(t(n,8,0,1)),body:`Gift or outing for Dad`}].filter(e=>e.days>=-3&&e.days<=60).sort((e,t)=>e.days-t.days)}function En(e){kt.has(e)?kt.delete(e):kt.add(e),I()}function Dn(e,t){let n=(m.planner?.events||[]).find(t=>t.id===e);if(!n)return;let r=(n.estimates||[]).find(e=>e.id===t);r&&(r.accepted=!r.accepted,saveData(m),I())}function On(e){let t=(m.planner?.events||[]).find(t=>t.id===e);if(!t)return;let n=(t.estimates||[]).filter(e=>e.accepted);if(!n.length)return;let r=t.date.slice(0,7);m.budget.suggestions||(m.budget.suggestions=[]),m.budget.suggestions=m.budget.suggestions.filter(e=>e.eventId!==t.id),n.forEach(e=>{m.budget.suggestions.push({id:`sug-`+Date.now()+`-`+Math.random().toString(36).slice(2,5),month:r,eventId:t.id,eventTitle:t.title,estId:e.id,name:e.name,amount:e.amount,category:e.category,status:`pending`})}),t.pushed=`suggested`,saveData(m),kt.add(e),I();let i=new Date(r+`-15`).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`});r===selectedBudgetMonth?safeRender(renderBudget):confirm(`${n.length} suggestion${n.length>1?`s`:``} sent to ${i} budget.\n\nGo to Monthly Budget to approve them?`)&&(selectedBudgetMonth=r,activateTab(`budget`))}function kn(e){let t=(m.budget.suggestions||[]).find(t=>t.id===e);if(!t)return;let n=ensureMonthOverride(t.month);n.expenses.push({id:M(n.expenses),name:`${t.name} (${t.eventTitle})`,amount:t.amount,frequency:`monthly`,category:t.category,recurring:!1,_plannerEventId:t.eventId}),t.status=`approved`;let r=(m.planner?.events||[]).find(e=>e.id===t.eventId);r&&(m.budget.suggestions||[]).filter(e=>e.eventId===r.id&&e.status===`pending`).length===0&&(r.pushed=!0),saveData(m),safeRender(renderBudget),safeRender(I)}function An(e){let t=(m.budget.suggestions||[]).find(t=>t.id===e);if(!t)return;t.status=`dismissed`;let n=(m.planner?.events||[]).find(e=>e.id===t.eventId);n&&(m.budget.suggestions||[]).filter(e=>e.eventId===n.id&&e.status===`pending`).length===0&&(n.pushed=n.pushed===`suggested`?!1:n.pushed),saveData(m),safeRender(renderBudget)}function jn(e){let t=(m.budget?.suggestions||[]).filter(t=>t.month===e&&t.status===`pending`);if(!t.length)return``;let n={};t.forEach(e=>{n[e.eventTitle]||(n[e.eventTitle]=[]),n[e.eventTitle].push(e)});let r=t.map(e=>`
    <div class="suggestion-row">
      <span class="suggestion-event-tag">📅 ${x(e.eventTitle)}</span>
      <div style="flex:1;min-width:0">
        <div class="suggestion-name">${x(e.name)}</div>
        <div class="suggestion-cat">${e.category}</div>
      </div>
      <span class="suggestion-amount">${w(e.amount)}</span>
      <button class="suggestion-approve" onclick="approveSuggestion('${e.id}')">✓ Approve</button>
      <button class="suggestion-dismiss" onclick="dismissSuggestion('${e.id}')">✕</button>
    </div>`).join(``);return`<div class="suggestion-inbox">
    <div class="suggestion-inbox-header">
      <span style="font-size:16px">📥</span>
      <span class="suggestion-inbox-title">Suggested from Planner</span>
      <span class="suggestion-inbox-count">${t.length} pending</span>
    </div>
    ${r}
  </div>`}function Mn(e){let t=(m.planner?.events||[]).find(t=>t.id===e);t&&(Object.values(m.budget.months||{}).forEach(t=>{t.expenses=(t.expenses||[]).filter(t=>t._plannerEventId!==e)}),m.budget.expenses=(m.budget.expenses||[]).filter(t=>t._plannerEventId!==e),m.budget.suggestions=(m.budget.suggestions||[]).filter(t=>t.eventId!==e),t.pushed=!1,saveData(m),I(),safeRender(renderBudget))}function Nn(e){confirm(`Delete this event and remove it from the budget?`)&&(Mn(e),m.planner.events=m.planner.events.filter(t=>t.id!==e),kt.delete(e),saveData(m),closeModal(),I())}async function Pn(e){let t=localStorage.getItem(`toto_ai_key`);if(!t){alert(`Add your AI API key in Settings to use cost estimation.`);return}let n=(m.planner?.events||[]).find(t=>t.id===e);if(!n)return;let r=document.getElementById(`ai-btn-${e}`);r&&(r.disabled=!0,r.textContent=`✦ Estimating…`);let i=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,a=(m.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,o=new Date(n.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`long`,year:`numeric`}),s=`You are a family finance assistant for an Australian family. Suggest realistic cost estimates for the following life event.

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
- Use ONLY these categories: Transport, Accommodation, Food & Dining, Entertainment, Gifts, Clothing, Health, Education, Shopping, Other`;try{let r=((await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:512,messages:[{role:`user`,content:s}]})})).json()).content?.[0]?.text||``).match(/\[[\s\S]*?\]/);if(!r)throw Error(`No JSON array in response`);n.estimates=JSON.parse(r[0]).map((e,t)=>({id:`est-${Date.now()}-${t}`,name:e.name,amount:Number(e.amount)||0,category:e.category||`Other`,accepted:!0})),kt.add(e),saveData(m),I()}catch(e){console.error(`Planner estimate error:`,e),r&&(r.disabled=!1,r.innerHTML=`✦ Try again`),alert(`Could not estimate costs. Check your AI API key in Settings.`)}}var L=new Set,Fn=`start`,In=new Date().toISOString().slice(0,7);function Ln(e,t){let n=e?(m.planner?.events||[]).find(t=>t.id===e):null,r=t||F||new Date().toISOString().slice(0,10);L=new Set,Fn=`start`,In=(n?.date||r).slice(0,7),n?Lt(n).forEach(e=>L.add(e)):jt.size>0&&jt.forEach(e=>L.add(e)),document.getElementById(`modal-title`).textContent=n?`Edit Event`:`Add Event`,document.getElementById(`modal-body`).innerHTML=`
    <!-- Who -->
    <div class="form-group">
      <label class="form-label">Who</label>
      <div id="pm-member-picker" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px"></div>
    </div>
    <!-- Title -->
    <div class="form-group">
      <label class="form-label">Title *</label>
      <input class="form-input" id="pe-title" placeholder="e.g. Mia's swimming lesson" value="${n?S(n.title):``}">
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
          <span id="pm-start-display">${zn(n?n.date:r)}</span>
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
          <span id="pm-end-display">${n?.endDate?zn(n.endDate):`Same day`}</span>
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
      <input class="form-input" id="pe-location" placeholder="e.g. 123 Main St, Sydney" value="${n?S(n.location||``):``}">
    </div>
    <!-- Notes -->
    <div class="form-group">
      <label class="form-label">Notes <span style="font-weight:400;color:var(--text-muted)">(helps AI estimate costs)</span></label>
      <textarea class="form-input" id="pe-notes" rows="2" placeholder="e.g. Flying from Sydney, 5 nights, gift budget ~$100">${n?x(n.notes||``):``}</textarea>
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    ${n?`<button class="btn btn-danger" onclick="deletePlannerEvent('${n.id}')">Delete</button>`:`<span></span>`}
    <div style="display:flex;gap:8px">
      <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="pm-save-btn" onclick="savePlannerEvent(${n?`'${n.id}'`:`null`})">Save</button>
    </div>`,document.getElementById(`modal-footer`).style.justifyContent=`space-between`,document.getElementById(`modal-overlay`).classList.remove(`hidden`),Bn(),Hn(),setTimeout(()=>{_routineRecurrenceSummaryUpdate()},100)}function Rn(e){return e?new Date(e+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`}):``}function zn(e){return e?new Date(e+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}):``}function Bn(){let e=Ft(),t={id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`},n=document.getElementById(`pm-member-picker`);if(!n)return;n.innerHTML=[t,...e].map(e=>`<button type="button" style="display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:99px;font-size:12px;font-weight:600;border:2px solid ${(e.id===`everyone`?L.size===0:L.has(e.id))?e.dot:`transparent`};background:${e.bg};color:${e.text};cursor:pointer;transition:all .15s" onclick="_pmToggleMember('${e.id}')">
      ${e.emoji} ${e.name}
    </button>`).join(``);let r=[...L][0],i=r?e.find(e=>e.id===r):null,a=document.getElementById(`pm-save-btn`);a&&(a.style.background=i?i.dot:``)}function Vn(e){e===`everyone`?L.clear():L.has(e)?L.delete(e):L.add(e),Bn()}function Hn(){let e=document.getElementById(`pe-allday`)?.checked,t=document.getElementById(`pm-start-time-col`),n=document.getElementById(`pm-end-time-col`);t&&(t.style.display=e?`none`:``),n&&(n.style.display=e?`none`:``)}function Un(){}function Wn(e){Fn=e;let t=e===`end`?`pm-end-trigger`:`pm-start-trigger`,n=document.getElementById(t);if(!n)return;let r=document.getElementById(`pm-dp-popover`);r||(r=document.createElement(`div`),r.id=`pm-dp-popover`,r.style.cssText=`display:none;position:fixed;width:260px;background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.16);padding:14px;z-index:9999`,document.body.appendChild(r),document.addEventListener(`click`,Gn)),In=(document.getElementById(`pe-date`)?.value||new Date().toISOString().slice(0,10)).slice(0,7),Kn(r);let i=n.getBoundingClientRect();r.style.top=i.bottom+6+`px`,r.style.left=Math.max(8,Math.min(i.left,window.innerWidth-272))+`px`,r.style.display=`block`}function Gn(e){let t=document.getElementById(`pm-dp-popover`),n=document.getElementById(`pm-start-trigger`),r=document.getElementById(`pm-end-trigger`);t&&!t.contains(e.target)&&e.target!==n&&e.target!==r&&!n?.contains(e.target)&&!r?.contains(e.target)&&t&&(t.style.display=`none`)}function Kn(e){if(e||(e=document.getElementById(`pm-dp-popover`)),!e)return;let[t,n]=In.split(`-`).map(Number),r=new Date().toISOString().slice(0,10),i=Fn===`end`?document.getElementById(`pe-end-date`)?.value||``:document.getElementById(`pe-date`)?.value||``,a=new Date(t,n-1,1).getDay(),o=a===0?6:a-1,s=new Date(t,n,0).getDate(),c=new Date(t,n-1,0).getDate(),l=new Date(t,n-1,15).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`}),u=[];for(let e=o-1;e>=0;e--)u.push({day:c-e,muted:!0,dateStr:null});for(let e=1;e<=s;e++){let r=`${t}-${String(n).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`;u.push({day:e,muted:!1,dateStr:r})}let d=u.length%7==0?0:7-u.length%7;for(let e=1;e<=d;e++)u.push({day:e,muted:!0,dateStr:null});let f=u.map(e=>{let t=e.dateStr&&e.dateStr===i,n=e.dateStr===r,a=t?`background:#2563eb;color:#fff;border-radius:50%`:n?`color:#2563eb;font-weight:700`:e.muted?`color:#d1d5db`:``;return`<button type="button" onclick="_pmDpSelect('${e.dateStr}')" ${e.dateStr?``:`disabled`} style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:12px;border:none;background:none;cursor:${e.dateStr?`pointer`:`default`};font-family:inherit;${a}">${e.day}</button>`}).join(``);e.innerHTML=`
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
    </div>`}function qn(e){if(!e)return;let t=Fn===`end`?`pe-end-date`:`pe-date`,n=Fn===`end`?`pm-end-display`:`pm-start-display`,r=document.getElementById(t),i=document.getElementById(n);r&&(r.value=e),i&&(i.textContent=zn(e),i.style.color=`#1e293b`),In=e.slice(0,7),document.getElementById(`pm-dp-popover`).style.display=`none`}function Jn(){qn(``);let e=Fn===`end`?`pm-end-display`:`pm-start-display`,t=document.getElementById(e);t&&(t.textContent=Fn===`end`?`Same day`:``,t.style.color=`#94a3b8`)}function Yn(){qn(new Date().toISOString().slice(0,10))}function Xn(){let[e,t]=In.split(`-`).map(Number),n=t===1?e-1:e,r=t===1?12:t-1;In=`${n}-${String(r).padStart(2,`0`)}`,Kn()}function Zn(){let[e,t]=In.split(`-`).map(Number),n=t===12?e+1:e,r=t===12?1:t+1;In=`${n}-${String(r).padStart(2,`0`)}`,Kn()}function Qn(e){let t=document.getElementById(`pe-title`).value.trim(),n=document.getElementById(`pe-cat`).value,r=document.getElementById(`pe-date`).value,i=document.getElementById(`pe-end-date`)?.value||``,a=document.getElementById(`pe-allday`)?.checked||!1,o=a?``:document.getElementById(`pe-time`)?.value||``,s=a?``:document.getElementById(`pe-end-time`)?.value||``,c=document.getElementById(`pe-notes`).value.trim(),l=document.getElementById(`pe-location`)?.value.trim()||``,u=_routineRecurrenceCollect(),d=(u.type,`none`),f=L.size>0?[...L]:[`everyone`];if(!t||!r){alert(`Title and date are required.`);return}if(m.planner||(m.planner={events:[]}),e){let p=m.planner.events.find(t=>t.id===e);p&&(p.title=t,p.category=n,p.date=r,p.endDate=i||r,p.allDay=a,p.time=o,p.endTime=s,p.notes=c,p.location=l,p.recurrence=u,p.recurring=d,p.memberIds=f)}else{let e=`ev-`+Date.now();m.planner.events.push({id:e,title:t,category:n,date:r,endDate:i||r,allDay:a,time:o,endTime:s,notes:c,location:l,recurrence:u,recurring:d,memberIds:f,estimates:[],pushed:!1}),kt.add(e),F=r,Ot=r.slice(0,7)}saveData(m),closeModal(),I()}function $n(e,t){let n=(m.planner?.events||[]).filter(t=>t.date?.slice(0,7)===e&&(t.estimates||[]).some(e=>e.accepted));if(n.length===0)return``;let r=n.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),i=t-r,a=n.filter(e=>!e.pushed),o=n.map(e=>{let t=P[e.category]||P.other,n=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),r=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});return`<div class="forecast-row">
      <span class="forecast-ev-name">${t.emoji} ${x(e.title)}</span>
      <span class="forecast-ev-date">${r}</span>
      <span class="forecast-ev-cost">${w(n)}</span>
      ${e.pushed?`<span class="forecast-pushed">✓ In budget</span>`:e.pushed===`suggested`?`<span class="forecast-pushed" style="color:#f59e0b">⏳ Pending</span>`:`<button class="forecast-unpushed" onclick="suggestEventToBudget('${e.id}')">+ Suggest</button>`}
    </div>`}).join(``);return`<div class="forecast-widget">
    <div class="forecast-header">
      <span class="forecast-header-title">📅 Planned Events — ${w(r)} this month</span>
      ${a.length>1?`<button class="forecast-push-all" onclick="_pushAllEventsToBudget('${e}')">Suggest all to budget</button>`:``}
    </div>
    ${o}
    <div class="forecast-total">
      <span class="forecast-total-label">Forecast surplus after events</span>
      <span style="font-weight:800;font-size:15px;color:${i>=0?`#10b981`:`#ef4444`}">${w(Math.abs(i))} ${i>=0?`surplus`:`deficit`}</span>
    </div>
  </div>`}function er(e){(m.planner?.events||[]).filter(t=>t.date?.slice(0,7)===e&&!t.pushed&&(t.estimates||[]).some(e=>e.accepted)).forEach(e=>On(e.id)),renderBudget()}function tr(e,t,n,r){let i=0;for(let a=1;a<=31;a++){let o=new Date(e,t,a);if(o.getMonth()!==t)break;if(o.getDay()===n&&(i++,i===r))return o}}function nr(){let e=new Date;e.setHours(0,0,0,0);let t=e.getFullYear(),n=t=>Math.ceil((t-e)/864e5);return[{d:new Date(t,3,25),emoji:`🌿`,title:`Anzac Day`,body:`Public holiday — any plans or travel?`},{d:new Date(t,5,30),emoji:`🧾`,title:`EOFY`,body:`Tax time — accountant fees, donations, prepayments`},{d:new Date(t,11,25),emoji:`🎄`,title:`Christmas`,body:`Gifts, travel, food — start budgeting early`},{d:new Date(t,11,26),emoji:`🛍️`,title:`Boxing Day`,body:`Sales, travel, family catch-ups`},{d:new Date(t+1,0,1),emoji:`🎆`,title:`New Year's`,body:`Celebrations, travel plans`},{d:tr(t,4,0,2),emoji:`💐`,title:`Mother's Day`,body:`Gift, brunch or dinner for Mum`},{d:tr(t,8,0,1),emoji:`👔`,title:`Father's Day`,body:`Gift or outing for Dad`},{d:tr(t,10,2,1),emoji:`🏆`,title:`Melbourne Cup`,body:`Event day — sweepstakes, lunch, outfits`},{d:new Date(t,3,6),emoji:`🎒`,title:`Term 1 Holidays`,body:`2 weeks — activities, childcare, day trips`},{d:new Date(t,6,5),emoji:`🎒`,title:`Term 2 Holidays`,body:`2 weeks — winter school holidays`},{d:new Date(t,8,19),emoji:`🎒`,title:`Term 3 Holidays`,body:`2 weeks — spring school holidays`},{d:new Date(t,11,18),emoji:`🎒`,title:`Summer Holidays`,body:`6 weeks — the big one, plan early`}].filter(e=>e.d).map(e=>({...e,days:n(e.d)})).filter(e=>e.days>=-3&&e.days<=45).sort((e,t)=>e.days-t.days).slice(0,4)}function rr(){let e=nr();return e.length===0?``:`<div class="nudge-section">
    <div class="diary-section-title">Heads up from Toto 🐕</div>
    <div class="nudge-row">${e.map(e=>{let t=e.days<0?`Now!`:e.days===0?`Today!`:e.days===1?`Tomorrow`:`In ${e.days} days`;return`<div class="nudge-card" onclick="openTotoAssistant();_totoSend('Help me plan for ${S(e.title)}')">
      <div class="nudge-card-icon">${e.emoji}</div>
      <div class="nudge-card-title">${x(e.title)}</div>
      <div class="nudge-card-days">${t}</div>
      <div class="nudge-card-body">${x(e.body)}</div>
    </div>`}).join(``)}</div>
  </div>`}function ir(e,t){let n=new Date(e);switch(t){case`weekly`:n.setDate(n.getDate()+7);break;case`fortnightly`:n.setDate(n.getDate()+14);break;case`monthly`:n.setMonth(n.getMonth()+1);break;case`quarterly`:n.setMonth(n.getMonth()+3);break;case`yearly`:n.setFullYear(n.getFullYear()+1);break}return n}function ar(){if(!m.planner?.events)return;let e=m.planner.events,t=new Date;t.setHours(0,0,0,0);let n=!1,r={weekly:3,fortnightly:3,monthly:6,quarterly:12,yearly:24};e.filter(e=>e.recurring&&e.recurring!==`none`&&!e._recurringSourceId).forEach(i=>{let a=i.recurring,o=new Date(t);o.setMonth(o.getMonth()+(r[a]||12));let s=new Date(i.date+`T12:00:00`);for(;s<t;)s=ir(s,a);let c=0;for(;s<=o&&c++<200;){let t=s.toISOString().slice(0,10);e.some(e=>e.date===t&&(e.id===i.id||e._recurringSourceId===i.id))||(e.push({id:`ev-`+Date.now()+`-r`+Math.random().toString(36).slice(2,6),title:i.title,category:i.category,date:t,notes:i.notes||``,recurring:a,_recurringSourceId:i.id,estimates:(i.estimates||[]).map(e=>({...e,id:`est-`+Date.now()+Math.random(),accepted:!0})),pushed:!1}),n=!0),s=ir(s,a)}}),n&&saveData(m)}var or=!1,sr=[],cr=!1,lr=[{icon:`📅`,text:`What should I plan for this month?`},{icon:`💸`,text:`Any upcoming events I should budget for?`},{icon:`🎒`,text:`Help me plan for school holidays`},{icon:`✈️`,text:`I have a trip coming up — what do I need to organise?`}];function ur(){or?fr():dr()}function dr(){or=!0,document.getElementById(`toto-panel`).classList.add(`open`),sr.length===0&&pr()}function fr(){or=!1,document.getElementById(`toto-panel`).classList.remove(`open`)}function pr(){let e=new Date().toISOString().slice(0,10),t=new Date;t.setDate(t.getDate()+7);let n=t.toISOString().slice(0,10),r=(m.planner?.events||[]).filter(t=>t.date>=e&&t.date<=n),i=[];r.slice(0,2).forEach(t=>{let n=PLANNER_CATS[t.category]||PLANNER_CATS.other,r=new Date(t.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`});n.financial&&(!t.estimates||t.estimates.length===0)?i.push({icon:n.emoji,text:`${x(t.title)} is ${r} — want me to estimate costs?`}):t.date===e&&i.push({icon:n.emoji,text:`You have "${x(t.title)}" today — anything to prepare?`})});let a=getSeasonalNudges().slice(0,2).map(e=>({icon:e.emoji,text:`Help me plan for ${x(e.title)} (${e.days<=0?`now!`:`in ${e.days} days`})`})),o=[...i,...a,...lr].slice(0,4),s=document.getElementById(`toto-suggestions`);s.innerHTML=o.map(e=>`<button class="toto-suggestion" onclick="_totoSendSuggestion(this)">${e.icon} ${e.text}</button>`).join(``);let c=new Date().getHours(),l=c<12?`Good morning`:c<17?`Good afternoon`:`Good evening`,u=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,d=(m.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,f=d>0?` and ${d} kid${d>1?`s`:``}`:``;vr(`toto`,`${l}! 👋 I'm Toto, your family planning assistant. You have ${u} adult${u>1?`s`:``}${f} in your household.\n\nI can help you plan events, estimate costs, and make sure nothing slips through the cracks. What would you like to work on?`)}function mr(e){let t=e.textContent.trim();e.closest(`.toto-suggestions`).style.display=`none`,gr(t)}async function hr(){let e=document.getElementById(`toto-input`),t=e.value.trim();!t||cr||(e.value=``,document.getElementById(`toto-suggestions`).style.display=`none`,gr(t))}async function gr(e){let t=localStorage.getItem(`toto_ai_key`);if(!t){vr(`toto`,`To chat with me, you'll need to add your AI API key in Settings. It only takes a second! ⚙️`);return}vr(`user`,e),sr.push({role:`user`,content:e}),cr=!0,document.getElementById(`toto-send`).disabled=!0;let n=yr();try{let e=_r(),r=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:600,system:e,messages:sr})})).json()).content?.[0]?.text||`Sorry, I couldn't get a response. Try again?`;sr.push({role:`assistant`,content:r}),br(n),vr(`toto`,r)}catch{br(n),vr(`toto`,`Oops, something went wrong. Check your internet connection and try again.`)}finally{cr=!1,document.getElementById(`toto-send`).disabled=!1,document.getElementById(`toto-input`).focus()}}function _r(){let e=new Date().toISOString().slice(0,10),t=new Date().toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}),n=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`).length||2,r=(m.householdProfile?.members||[]).filter(e=>e.role===`child`).length||0,i=new Date;i.setDate(i.getDate()+60);let a=(m.planner?.events||[]).filter(t=>t.date>=e&&t.date<=i.toISOString().slice(0,10)).sort((e,t)=>e.date.localeCompare(t.date)).slice(0,15).map(e=>{let t=PLANNER_CATS[e.category]||PLANNER_CATS.other,n=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`}),r=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0);return`- ${n}: ${e.title} (${t.label})${r>0?` — $`+r.toLocaleString(`en-AU`)+` budgeted`:``}${e.notes?` — Notes: `+e.notes:``}`}).join(`
`)||`None`,o=getMonthData(selectedBudgetMonth),s=monthlyTotal(o.income),c=monthlyTotal(o.expenses),l=s-c,u=(m.goals||[]).filter(e=>e.status!==`achieved`).slice(0,4).map(e=>`${e.name} ($${(e.saved||0).toLocaleString()}/$${(e.target||0).toLocaleString()})`).join(`, `)||`None`;return`You are Toto, a warm and practical AI assistant for a family finance and life planning app called Toto. You help Australian families plan their lives and stay on top of their money.

Today: ${t}
Family: ${n} adult${n>1?`s`:``}${r>0?`, ${r} child${r>1?`ren`:``}`:``}
Monthly budget: Income $${s.toLocaleString(`en-AU`)}, Expenses $${c.toLocaleString(`en-AU`)}, ${l>=0?`Surplus`:`Deficit`} $${Math.abs(l).toLocaleString(`en-AU`)}
Active goals: ${u}

Upcoming events (next 60 days):
${a}

Personality: friendly, warm, concise. Use Australian spelling and context. You can:
- Help plan upcoming events and what to organise
- Suggest realistic cost estimates for activities
- Spot things they might have forgotten (school holidays, gift buying, etc.)
- Give practical financial advice around upcoming events
- Keep responses to 3-5 sentences unless a list is genuinely helpful`}function vr(e,t){let n=document.getElementById(`toto-messages`),r=document.createElement(`div`);r.className=`toto-msg ${e}`;let i=t.replace(/\n/g,`<br>`);e===`toto`?r.innerHTML=`<div class="toto-msg-avatar">🐕</div><div class="toto-msg-bubble">${i}</div>`:r.innerHTML=`<div class="toto-msg-bubble">${i}</div>`,n.appendChild(r),n.scrollTop=n.scrollHeight}function yr(){let e=document.getElementById(`toto-messages`),t=`toto-typing-`+Date.now(),n=document.createElement(`div`);return n.className=`toto-msg toto`,n.id=t,n.innerHTML=`<div class="toto-msg-avatar">🐕</div><div class="toto-msg-bubble"><div class="toto-typing"><span></span><span></span><span></span></div></div>`,e.appendChild(n),e.scrollTop=e.scrollHeight,t}function br(e){document.getElementById(e)?.remove()}`serviceWorker`in navigator&&navigator.serviceWorker.register(`/home-budget/sw.js`,{scope:`/home-budget/`}).catch(e=>console.warn(`SW registration failed:`,e));var xr=[`Produce`,`Meat & Seafood`,`Dairy & Eggs`,`Pantry`,`Bakery`,`Frozen`,`Household`,`Other`],Sr={Produce:`🥦`,"Meat & Seafood":`🥩`,"Dairy & Eggs":`🥛`,Pantry:`🥫`,Bakery:`🍞`,Frozen:`🧊`,Household:`🏠`,Other:`🛒`},Cr={food:{label:`Food`,emoji:`🛒`,color:`#dcfce7`,text:`#166534`,aisles:!0,priceEst:!0},clothes:{label:`Clothes`,emoji:`👕`,color:`#dbeafe`,text:`#1e40af`,aisles:!1,priceEst:!1},wishlist:{label:`Wishlist`,emoji:`🎁`,color:`#fce7f3`,text:`#9d174d`,aisles:!1,priceEst:!1},home:{label:`Home & Garden`,emoji:`🛠`,color:`#fef3c7`,text:`#92400e`,aisles:!0,priceEst:!1},pharmacy:{label:`Pharmacy`,emoji:`💊`,color:`#ede9fe`,text:`#5b21b6`,aisles:!0,priceEst:!1}},wr={food:[{key:`produce`,emoji:`🥦`,label:`Produce`},{key:`dairy`,emoji:`🥛`,label:`Dairy & Eggs`},{key:`bakery`,emoji:`🍞`,label:`Bakery`},{key:`meat`,emoji:`🥩`,label:`Meat & Seafood`},{key:`pantry`,emoji:`🥫`,label:`Pantry`},{key:`frozen`,emoji:`🧊`,label:`Frozen`},{key:`health`,emoji:`🧴`,label:`Health & Beauty`},{key:`bathroom`,emoji:`🚿`,label:`Bathroom`},{key:`cleaning`,emoji:`🧹`,label:`Cleaning`},{key:`drinks`,emoji:`🍷`,label:`Drinks & Alcohol`},{key:`other`,emoji:`🛒`,label:`Uncategorised`}],home:[{key:`tools`,emoji:`🔨`,label:`Tools & Hardware`},{key:`garden`,emoji:`🌱`,label:`Garden`},{key:`cleaning`,emoji:`🧹`,label:`Cleaning`},{key:`other`,emoji:`🛒`,label:`Other`}],pharmacy:[{key:`medicine`,emoji:`💊`,label:`Medicine`},{key:`skincare`,emoji:`🧴`,label:`Skincare`},{key:`vitamins`,emoji:`💪`,label:`Vitamins`},{key:`other`,emoji:`🛒`,label:`Other`}]},Tr={milk:`dairy`,cheese:`dairy`,butter:`dairy`,eggs:`dairy`,yoghurt:`dairy`,cream:`dairy`,bread:`bakery`,rolls:`bakery`,muffin:`bakery`,croissant:`bakery`,baguette:`bakery`,apple:`produce`,banana:`produce`,orange:`produce`,strawberry:`produce`,tomato:`produce`,lettuce:`produce`,spinach:`produce`,carrot:`produce`,broccoli:`produce`,potato:`produce`,onion:`produce`,garlic:`produce`,cucumber:`produce`,capsicum:`produce`,avocado:`produce`,lemon:`produce`,lime:`produce`,grapes:`produce`,mango:`produce`,pineapple:`produce`,watermelon:`produce`,chicken:`meat`,beef:`meat`,mince:`meat`,steak:`meat`,pork:`meat`,lamb:`meat`,salmon:`meat`,fish:`meat`,tuna:`meat`,prawn:`meat`,sausage:`meat`,bacon:`meat`,rice:`pantry`,pasta:`pantry`,flour:`pantry`,sugar:`pantry`,oil:`pantry`,vinegar:`pantry`,salt:`pantry`,pepper:`pantry`,sauce:`pantry`,stock:`pantry`,beans:`pantry`,lentils:`pantry`,chickpeas:`pantry`,cereal:`pantry`,oats:`pantry`,honey:`pantry`,jam:`pantry`,peanut:`pantry`,coffee:`pantry`,tea:`pantry`,biscuit:`pantry`,cracker:`pantry`,chocolate:`pantry`,chips:`pantry`,nuts:`pantry`,icecream:`frozen`,peas:`frozen`,corn:`frozen`,pizza:`frozen`,shampoo:`health`,conditioner:`health`,deodorant:`health`,sunscreen:`health`,moisturiser:`health`,makeup:`health`,lipstick:`health`,mascara:`health`,toothpaste:`bathroom`,toothbrush:`bathroom`,soap:`bathroom`,toilet:`bathroom`,razors:`bathroom`,tampons:`bathroom`,pads:`bathroom`,detergent:`cleaning`,bleach:`cleaning`,sponge:`cleaning`,dishwashing:`cleaning`,bins:`cleaning`,mop:`cleaning`,water:`drinks`,juice:`drinks`,beer:`drinks`,wine:`drinks`,spirits:`drinks`,softdrink:`drinks`,soda:`drinks`,kombucha:`drinks`};function Er(e){for(var t=e.toLowerCase(),n=Object.keys(Tr),r=0;r<n.length;r++)if(t.indexOf(n[r])!==-1)return Tr[n[r]];return`other`}function Dr(e){var t=e.trim(),n=1,r=`units`,i=t,a=t.match(/^(\d+(?:\.\d+)?)\s*(kg|g|L|l|ml|dozen|doz)\s+(.+)$/i);if(a)n=parseFloat(a[1]),r=a[2].toLowerCase()===`l`?`L`:a[2].toLowerCase()===`doz`?`dozen`:a[2],i=a[3];else{var o=t.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);o?(n=parseFloat(o[1]),i=o[2]):/^dozen\s+/i.test(t)&&(n=1,r=`dozen`,i=t.replace(/^dozen\s+/i,``))}return i=i.charAt(0).toUpperCase()+i.slice(1),{qty:n,unit:r,name:i}}var Or=`food`,kr=`selector`;Object.defineProperty(window,`_listsActiveType`,{get(){return Or},set(e){Or=e},configurable:!0}),Object.defineProperty(window,`_listsView`,{get(){return kr},set(e){kr=e},configurable:!0});function Ar(e){let t=new Date,n=t.getDay()===0?-6:1-t.getDay(),r=new Date(t);return r.setDate(t.getDate()+n+(e||0)*7),r.toISOString().slice(0,10)}function jr(e){let t=new Date(e+`T00:00:00`);return Array.from({length:7},(e,n)=>{let r=new Date(t);return r.setDate(t.getDate()+n),r})}function Mr(){_mealView===`shopping`?Ur():Nr()}function Nr(){let e=Ar(0),t=jr(e),n=m.meals.plan[e]||{},r=new Date().toISOString().slice(0,10),i=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],a=[{key:`b`,label:`Breakfast`},{key:`l`,label:`Lunch`},{key:`d`,label:`Dinner`}];t[0].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),t[6].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});let o=[];for(let e=0;e<7;e++){let t=n[e]||{};[`b`,`l`,`d`].forEach(e=>{t[e]&&o.push(t[e])})}let s=``;a.forEach(i=>{s+=`<div class="meal-grid-label">${i.label}</div>`,t.forEach((t,a)=>{let o=(n[a]||{})[i.key]||``,c=t.toISOString().slice(0,10)===r;s+=`<div class="meal-cell${c?` today`:``}" onclick="openMealEdit('${e}',${a},'${i.key}')">
        ${o?`<span class="meal-cell-text">${o}${m.settings?.showCalories&&(n[a]||{})[`cal_`+i.key]?`<br><span style="font-size:9px;color:var(--text-muted);font-weight:600">${n[a][`cal_`+i.key]} cal</span>`:``}</span>`:`<span class="meal-cell-plus">+</span>`}
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
        ${s}
        ${m.settings?.showCalories?`<div class="meal-grid-label" style="font-weight:800;font-size:9px">Total</div>`+t.map((e,t)=>{let r=n[t]||{},i=(r.cal_b||0)+(r.cal_l||0)+(r.cal_d||0);return`<div style="background:var(--surface);padding:6px;text-align:center;font-size:11px;font-weight:700;color:${i>0?i>2500?`var(--danger)`:i>2e3?`var(--warning)`:`var(--text)`:`var(--border)`}">${i>0?i.toLocaleString():`—`}</div>`}).join(``):``}
      </div>
    </div>
    <p style="font-size:12px;color:var(--text-muted);margin-top:6px">Tap any cell to add or change a meal.</p>`}var R={cuisine:`Any`,price:0,dietary:`Any`},Pr=[`Any`,`Italian`,`Asian`,`Mexican`,`Indian`,`Mediterranean`,`Thai`,`Japanese`,`Middle Eastern`,`Australian`],Fr=[`Any`,`Vegetarian`,`Vegan`,`Gluten-free`,`Quick (<30min)`,`Family-friendly`];function Ir(e,t,n){let r=[`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`,`Sunday`],i={b:`Breakfast`,l:`Lunch`,d:`Dinner`},a=((m.meals.plan[e]||{})[t]||{})[n]||``,o=!!localStorage.getItem(`toto_ai_key`),s=new Set;Object.values(m.meals.plan).forEach(e=>Object.values(e).forEach(e=>{typeof e==`object`&&[`b`,`l`,`d`].forEach(t=>{e[t]&&s.add(e[t])})}));let c=[...s].filter(e=>e!==a).slice(0,16);document.getElementById(`modal-title`).textContent=`${r[t]} · ${i[n]}`,document.getElementById(`modal-body`).innerHTML=`
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
          ${Pr.map(e=>Lr(`cuisine`,e)).join(``)}
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
          ${Fr.map(e=>Lr(`dietary`,e)).join(``)}
        </div>
      </div>
      <div style="margin-bottom:12px"></div>

      <button class="btn btn-sm" id="meal-suggest-btn" onclick="_mealGetSuggestions('${n}')"
        style="width:100%;justify-content:center">Get suggestions</button>
      <div id="meal-suggest-out" style="margin-top:10px"></div>
    </div>`:``}

    ${c.length?`
    <div>
      <div class="form-label" style="margin-bottom:8px">Previous meals</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${c.map(e=>`<button style="padding:5px 12px;border-radius:99px;border:1px solid var(--border);background:var(--surface);font-size:12px;cursor:pointer"
          onclick="document.getElementById('meal-input').value='${e.replace(/'/g,`\\'`)}'">${e}</button>`).join(``)}
      </div>
    </div>`:``}`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn" onclick="saveMealSlot('${e}',${t},'${n}','')">Clear</button>
    <button class="btn btn-primary" onclick="saveMealSlot('${e}',${t},'${n}',document.getElementById('meal-input').value.trim())">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`),setTimeout(()=>{let e=document.getElementById(`meal-input`);e&&(e.focus(),e.select())},80)}function Lr(e,t){let n=R[e]===t;return`<button data-filter="${e}" data-val="${t}"
    onclick="_mealToggleFilter('${e}','${t}')"
    style="padding:4px 10px;border-radius:99px;font-size:12px;cursor:pointer;white-space:nowrap;
      border:1.5px solid ${n?`#0891b2`:`var(--border)`};
      background:${n?`#ecfeff`:`var(--surface)`};
      color:${n?`#0891b2`:`var(--text)`}">${t}</button>`}function Rr(e,t){R[e]=t,document.querySelectorAll(`[data-filter="${e}"]`).forEach(e=>{let n=e.dataset.val===t;e.style.borderColor=n?`#0891b2`:`var(--border)`,e.style.background=n?`#ecfeff`:`var(--surface)`,e.style.color=n?`#0891b2`:`var(--text)`})}function zr(e){R.price=e;let t=document.getElementById(`meal-price-lbl`);t&&(t.textContent=e>0?`$${e}`:`Any`)}async function Br(e){let t=localStorage.getItem(`toto_ai_key`);if(!t)return;let n=document.getElementById(`meal-suggest-btn`),r=document.getElementById(`meal-suggest-out`);n&&(n.textContent=`⏳ Thinking…`,n.disabled=!0),r&&(r.innerHTML=``);let i={b:`Breakfast`,l:`Lunch`,d:`Dinner`},a=[R.cuisine===`Any`?``:`Cuisine: ${R.cuisine}`,R.price>0?`Budget: up to $${R.price} per serve`:``,R.dietary===`Any`?``:`Style: ${R.dietary}`].filter(Boolean).join(`, `)||`No specific filters`,o=`Suggest 8 ${i[e]} meal ideas. Filters: ${a}.
Return ONLY a JSON array of meal names, no other text: ["Meal 1","Meal 2",...]`;try{let e=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:256,messages:[{role:`user`,content:o}]})})).json()).content[0].text.match(/\[[\s\S]*\]/);if(!e)throw Error(`No JSON`);let n=JSON.parse(e[0]);r&&(r.innerHTML=`<div style="display:flex;flex-wrap:wrap;gap:6px">
      ${n.map(e=>`<button style="padding:6px 12px;border-radius:99px;border:1px solid #0891b2;background:#ecfeff;color:#0891b2;font-size:12px;font-weight:500;cursor:pointer"
        onclick="document.getElementById('meal-input').value='${e.replace(/'/g,`\\'`)}'">${e}</button>`).join(``)}
    </div>`)}catch(e){r&&(r.innerHTML=`<span style="font-size:12px;color:var(--danger)">⚠ ${e.message}</span>`)}finally{n&&(n.textContent=`Get suggestions`,n.disabled=!1)}}function Vr(e,t,n,r){m.meals.plan[e]||(m.meals.plan[e]={}),m.meals.plan[e][t]||(m.meals.plan[e][t]={b:``,l:``,d:``}),m.meals.plan[e][t][n]=r,delete m.meals.plan[e][t][`cal_`+n],saveData(m),closeModal(),Nr(),r&&m.settings?.showCalories&&Hr(e,t,n,r)}async function Hr(e,t,n,r){let i=localStorage.getItem(`toto_ai_key`);if(!(!i||!r))try{let a=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":i,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:50,messages:[{role:`user`,content:`Estimate the calories in this meal: "${r}". Return ONLY a number, nothing else. For example: 450`}]})});if(!a.ok)return;let o=await a.json(),s=parseInt(o.content[0].text.trim().replace(/[^0-9]/g,``));s>0&&s<5e3&&m.meals.plan[e]?.[t]&&(m.meals.plan[e][t][`cal_`+n]=s,saveData(m),Nr())}catch{}}function Ur(){let e=m.meals.shopping||[],t=e.filter(e=>e.checked).length,n=e.length-t,r={};xr.forEach(e=>r[e]=[]),e.forEach(e=>{r[xr.includes(e.cat)?e.cat:`Other`].push(e)});let i=``;xr.forEach(e=>{let t=r[e];t.length&&(i+=`
      <div style="margin-bottom:18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:4px">
          ${Sr[e]} ${e}
        </div>
        ${t.map(e=>`
          <div class="shop-row">
            <input type="checkbox" ${e.checked?`checked`:``} onchange="toggleShopItem(${e.id},this.checked)"
              style="width:18px;height:18px;cursor:pointer;accent-color:#0891b2;flex-shrink:0">
            <span style="flex:1;font-size:14px;${e.checked?`text-decoration:line-through;color:var(--text-muted)`:``}">${x(e.name)}</span>
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
            ${xr.map(e=>`<option value="${e}">${Sr[e]} ${e}</option>`).join(``)}
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
    </div>`}function Wr(){let e=document.getElementById(`shop-name`)?.value.trim();if(!e)return;let t=document.getElementById(`shop-qty`)?.value.trim()||``,n=document.getElementById(`shop-cat`)?.value||`Other`,r=m.meals.shopping;r.push({id:r.length?Math.max(...r.map(e=>e.id))+1:1,name:e,qty:t,cat:n,checked:!1}),saveData(m),Ur()}function Gr(e,t){let n=m.meals.shopping.find(t=>t.id===e);n&&(n.checked=t,saveData(m))}function Kr(e){m.meals.shopping=m.meals.shopping.filter(t=>t.id!==e),saveData(m),Ur()}function qr(){m.meals.shopping=m.meals.shopping.filter(e=>!e.checked),saveData(m),Ur()}function Jr(e){var t=document.getElementById(`ls-toast`);t&&t.remove();var n=document.createElement(`div`);n.id=`ls-toast`,n.textContent=e,n.style.cssText=`position:fixed;bottom:96px;left:50%;transform:translateX(-50%) translateY(20px);background:#1a1814;color:#fff;padding:10px 18px;border-radius:99px;font-size:13px;font-weight:600;z-index:9999;opacity:0;transition:opacity .2s,transform .2s;pointer-events:none;white-space:nowrap;max-width:80vw;text-align:center;font-family:var(--sans,system-ui,sans-serif)`,document.body.appendChild(n),requestAnimationFrame(function(){n.style.opacity=`1`,n.style.transform=`translateX(-50%) translateY(0)`}),setTimeout(function(){n.style.opacity=`0`,n.style.transform=`translateX(-50%) translateY(10px)`,setTimeout(function(){n.parentNode&&n.remove()},300)},2400)}function Yr(e,t,n,r,i,a,o){m.lists||_applyMigrations(m);var s=m.lists[e];if(s){if(s.items.find(function(e){return e.state===`active`&&e.name.toLowerCase()===t.toLowerCase()}))return Jr(x(t)+` is already on your list`),!1;var c={id:`li-`+Date.now()+`-`+Math.random().toString(36).slice(2,6),name:t,quantity:n||1,unit:r||`units`,notes:a||``,aisle:i||(e===`food`?Er(t):`other`),state:`active`,addedBy:`user`,addedAt:new Date().toISOString(),stateChangedAt:null,mealTag:o||null,manualPrice:null,barcodeId:null};return s.items.push(c),ii(e,t),saveData(m),!0}}function Xr(e,t,n){if(!(!m.lists||!m.lists[e])){var r=m.lists[e].items.find(function(e){return e.id===t});r&&(r.state=n,r.stateChangedAt=new Date().toISOString(),saveData(m),si())}}function Zr(e,t){!m.lists||!m.lists[e]||(m.lists[e].items=m.lists[e].items.filter(function(e){return e.id!==t}),saveData(m),si())}function Qr(e){var t=document.getElementById(`ls-quick-input`);if(t){var n=t.value.trim();if(n){var r=Dr(n),i=e===`food`?Er(r.name):`other`;if(Yr(e,r.name,r.qty,r.unit,i,``,null)!==!1){t.value=``;var a=document.getElementById(`ls-parse-preview`);a&&(a.innerHTML=``),si()}}}}function $r(e,t){let n=e===`food`,r=m.lists?.[e]?.items||[],i=t?r.find(e=>e.id===t):null,a=n?PANTRY_CATS:[`Other`],o=[`units`,`kg`,`g`,`L`,`ml`,`dozen`];document.getElementById(`modal-title`).textContent=i?`Edit Item`:`Add Item`,document.getElementById(`modal-body`).innerHTML=`
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input class="form-input" id="lf-name" type="text" maxlength="200"
        value="${i?S(i.name):``}" placeholder="e.g. Pasta, Milk, Chicken">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="lf-cat">
          ${a.map(e=>`<option value="${e}"${i&&i.aisle===ei(e)?` selected`:``}>${e}</option>`).join(``)}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Quantity <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label>
        <input class="form-input" id="lf-qty" type="text" maxlength="200"
          value="${i?S(String(i.quantity||``)):``}" placeholder="e.g. 2 bags, 1L, 500g">
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
        value="${i?S(i.notes||``):``}" placeholder="e.g. Get the organic one, only if on sale">
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
    <button class="btn btn-primary" onclick="_listsSaveForm('${e}','${t||``}')">Save</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function ei(e){return{Fridge:`dairy`,Freezer:`frozen`,Pantry:`pantry`,"Fruit & Veg":`produce`,Spices:`pantry`,Drinks:`drinks`,Cleaning:`cleaning`,Other:`other`}[e]||`other`}function ti(e,t){let n=document.getElementById(`lf-name`)?.value.trim();if(!n)return;let r=document.getElementById(`lf-cat`)?.value||`Other`,i=document.getElementById(`lf-qty`)?.value.trim()||`1`,a=document.getElementById(`lf-unit`)?.value||`units`,o=document.getElementById(`lf-notes`)?.value.trim()||``,s=document.querySelector(`input[name="lf-state"]:checked`)?.value||`active`,c=parseFloat(i)||1,l=e===`food`?ei(r):`other`;m.lists||(m.lists={}),m.lists[e]||(m.lists[e]={items:[],weeklyBudget:0,budget:0,stores:[],favourites:[],history:[]});let u=m.lists[e].items;if(t){let e=u.find(e=>e.id===t);e&&(e.name=n,e.quantity=c,e.unit=a,e.notes=o,e.aisle=l,e.state=s)}else{if(u.find(e=>e.name.toLowerCase()===n.toLowerCase()&&e.state===`active`)&&!confirm(`"${n}" is already on your list. Add another?`))return;u.push({id:`si-`+Date.now(),name:n,quantity:c,unit:a,notes:o,aisle:l,state:s,addedBy:_currentUser?.uid||`guest`,addedAt:new Date().toISOString(),mealTag:null,manualPrice:null,barcodeId:null}),ii(e,n)}saveData(m),closeModal(),si()}function ni(e){if(!(!m.lists||!m.lists[e])){var t=m.lists[e].items.filter(function(e){return e.state===`got_it`});t.length&&confirm(`Remove `+t.length+` trolley item`+(t.length===1?``:`s`)+`?`)&&(m.lists[e].items=m.lists[e].items.filter(function(e){return e.state!==`got_it`}),saveData(m),si())}}function ri(e){if(!(!m.lists||!m.lists[e])){var t=m.lists[e];t.history||(t.history=[]),t.history.push({archivedAt:new Date().toISOString(),items:JSON.parse(JSON.stringify(t.items))}),t.items=[],saveData(m),Jr(`Shop archived!`),si()}}function ii(e,t){if(!(!m.lists||!m.lists[e])){var n=m.lists[e].favourites,r=n.find(function(e){return e.name.toLowerCase()===t.toLowerCase()});r?r.addedCount=(r.addedCount||0)+1:n.push({name:t,addedCount:1,pinned:!1})}}function ai(e){if(!(!m.lists||!m.lists[e])){var t=m.lists[e].favourites,n=t.filter(function(e){return e.pinned}),r=n.length?n:t.sort(function(e,t){return(t.addedCount||0)-(e.addedCount||0)}).slice(0,5),i=0;r.forEach(function(t){m.lists[e].items.find(function(e){return e.state===`active`&&e.name.toLowerCase()===t.name.toLowerCase()})||(Yr(e,t.name,1,`units`,e===`food`?Er(t.name):`other`,``,null),i++)}),i?si():Jr(`All usual items are already on the list`)}}function oi(){var e=document.getElementById(`ls-quick-input`),t=document.getElementById(`ls-parse-preview`);if(!(!e||!t)){var n=e.value.trim();if(!n){t.innerHTML=``;return}var r=Dr(n),i=``;(r.qty!==1||r.unit!==`units`)&&(i+=`<span class="ls-parse-chip">`+x(String(r.qty))+` `+x(r.unit)+`</span>`),i+=`<span class="ls-parse-chip">`+x(r.name)+`</span>`,t.innerHTML=i}}function si(){var e=document.getElementById(`lists-content`);e&&(m.lists||_applyMigrations(m),kr===`selector`?ci(e):li(e,Or))}function ci(e){var t=`<div class="ls-screen">`;t+=`<div style="font-size:22px;font-weight:800;color:var(--ink,#1a1814);margin-bottom:4px">My Lists</div>`,t+=`<div style="font-size:13px;color:var(--muted,#8c8880);margin-bottom:20px">Tap a list to open it</div>`,t+=`<div class="ls-type-grid">`,Object.keys(Cr).forEach(function(e){var n=Cr[e],r=(m.lists&&m.lists[e]?m.lists[e]:{items:[]}).items.filter(function(e){return e.state===`active`}).length;t+=`<div class="ls-type-card" onclick="_listsActiveType='`+e+`';_listsView='list';renderLists()">`,t+=`<div class="ls-type-icon" style="background:`+n.color+`;color:`+n.text+`">`+n.emoji+`</div>`,t+=`<div class="ls-type-label">`+x(n.label)+`</div>`,t+=`<div class="ls-type-count">`+(r>0?r+` item`+(r===1?``:`s`):`Empty`)+`</div>`,t+=`</div>`}),t+=`</div>`,t+=`</div>`,e.innerHTML=t}function li(e,t){var n=Cr[t],r=m.lists&&m.lists[t]?m.lists[t]:{items:[],weeklyBudget:0,favourites:[]},i=r.items||[],a=i.filter(function(e){return e.state===`active`}),o=i.filter(function(e){return e.state===`got_it`}),s=i.filter(function(e){return e.state===`not_found`}),c=`<div class="ls-screen">`;if(c+=`<button class="ls-back-btn" onclick="_listsView='selector';renderLists()">← Lists</button>`,c+=`<div class="ls-header">`,c+=`<div style="font-size:22px;margin-right:6px">`+n.emoji+`</div>`,c+=`<div class="ls-header-title">`+x(n.label)+`</div>`,c+=`<div class="ls-sync-dot"></div>`,c+=`<div class="ls-header-count">`+a.length+` to get</div>`,c+=`</div>`,r.weeklyBudget>0){var l=i.filter(function(e){return e.state===`got_it`&&e.manualPrice}).reduce(function(e,t){return e+(t.manualPrice||0)},0),u=Math.min(100,Math.round(l/r.weeklyBudget*100)),d=u>100?`over`:u>80?`warn`:``;c+=`<div class="ls-budget-bar-wrap">`,c+=`<div class="ls-budget-bar-meta"><span>$`+l.toFixed(0)+` spent</span><span>$`+r.weeklyBudget+` budget</span></div>`,c+=`<div class="ls-budget-bar"><div class="ls-budget-fill `+d+`" style="width:`+u+`%"></div></div>`,c+=`</div>`}var f=(r.favourites||[]).filter(function(e){return!a.find(function(t){return t.name.toLowerCase()===e.name.toLowerCase()})}).sort(function(e,t){return(t.addedCount||0)-(e.addedCount||0)}).slice(0,5);if(f.length>0&&(c+=`<div class="ls-fav-chips">`,f.forEach(function(e){c+=`<button class="ls-fav-chip" onclick="_listsAddItem('`+t+`','`+x(e.name).replace(/'/g,`\\'`)+`',1,'units','`+(t===`food`?Er(e.name):`other`)+`','',null);renderLists()">+ `+x(e.name)+`</button>`}),c+=`</div>`),(r.favourites||[]).length>0&&(c+=`<button class="ls-usual-btn" onclick="_listsAddUsual('`+t+`')">The usual →</button>`),c+=`<div class="ls-quick-add">`,c+=`<div class="ls-quick-add-row">`,c+=`<input class="ls-quick-input" id="ls-quick-input" type="text" placeholder="Add item…" autocomplete="off" oninput="_listsUpdateParsePreview()" onkeydown="if(event.key==='Enter')_listsQuickAdd('`+t+`')">`,c+=`<button class="ls-quick-add-btn" onclick="_listsQuickAdd('`+t+`')">Add</button>`,c+=`<button class="ls-quick-add-btn" style="background:var(--purple-soft);color:var(--iris-1);min-width:36px;padding:0 10px" onclick="_listsOpenAddForm('`+t+`')">⋯</button>`,c+=`</div>`,c+=`<div class="ls-parse-preview" id="ls-parse-preview"></div>`,c+=`</div>`,a.length>0)if(n.aisles){var p=wr[t]||[{key:`other`,emoji:`🛒`,label:`Other`}],h={};p.forEach(function(e){h[e.key]=[]}),a.forEach(function(e){var t=e.aisle&&h[e.aisle]!==void 0?e.aisle:`other`;h[t]||(h[t]=[]),h[t].push(e)}),p.forEach(function(e){!h[e.key]||!h[e.key].length||(c+=`<div class="ls-aisle-header">`+e.emoji+` `+x(e.label)+`</div>`,h[e.key].forEach(function(e){c+=ui(t,e)}))})}else a.forEach(function(e){c+=ui(t,e)});else c+=`<div style="text-align:center;padding:32px 0;color:var(--muted,#8c8880);font-size:14px">Nothing to get yet — add something above</div>`;o.length>0&&(c+=`<div class="ls-aisle-header">🛒 In the trolley</div>`,o.forEach(function(e){c+=ui(t,e)})),s.length>0&&(c+=`<div class="ls-aisle-header">🚫 Not found</div>`,s.forEach(function(e){c+=ui(t,e)})),c+=`<div class="ls-footer-row">`,o.length>0&&(c+=`<button class="ls-footer-btn" onclick="_listsClearTrolley('`+t+`')">Clear trolley (`+o.length+`)</button>`),a.length===0&&i.length>0&&(c+=`<button class="ls-footer-btn" style="background:var(--iris-2,#6366f1);color:#fff;border-color:var(--iris-2,#6366f1)" onclick="_listsArchive('`+t+`')">Archive this shop</button>`),c+=`</div>`,c+=`</div>`,e.innerHTML=c}function ui(e,t){var n=t.state===`got_it`?`got-it`:t.state===`not_found`?`not-found`:``,r=t.state===`got_it`?`✓`:``,i=t.state===`active`?`got_it`:`active`,a=t.quantity&&t.unit&&t.unit!==`units`?t.quantity+` `+t.unit:t.quantity&&t.quantity!==1?`x`+t.quantity:``;x(t.id);var o=x(t.name),s=`<div class="ls-item `+n+`">`;return s+=`<button class="ls-item-check" onclick="_listsSetState('`+e+`','`+t.id+`','`+i+`')">`+r+`</button>`,s+=`<div class="ls-item-body">`,s+=`<div class="ls-item-name">`+o+`</div>`,a&&(s+=`<div class="ls-item-qty">`+x(a)+`</div>`),t.notes&&(s+=`<div class="ls-item-notes">`+x(t.notes)+`</div>`),s+=`</div>`,t.state===`active`?s+=`<button class="ls-item-notfound-btn" title="Not found" onclick="_listsSetState('`+e+`','`+t.id+`','not_found')">🚫</button>`:t.state===`not_found`&&(s+=`<button class="ls-item-notfound-btn" title="Mark active again" onclick="_listsSetState('`+e+`','`+t.id+`','active')">↩</button>`),s+=`<button class="ls-item-notfound-btn" title="Edit" onclick="_listsOpenAddForm('`+e+`','`+t.id+`')">✏️</button>`,s+=`<button class="ls-item-del" onclick="_listsDeleteItem('`+e+`','`+t.id+`')">×</button>`,s+=`</div>`,s}async function di(e){let t=m.meals.plan[e]||{},n=[];for(let e=0;e<7;e++){let r=t[e]||{};[`b`,`l`,`d`].forEach(e=>{r[e]&&n.push(r[e])})}if(!n.length)return;let r=localStorage.getItem(`toto_ai_key`);if(!r){Or=`food`,kr=`list`,activateTab(`lists`);return}let i=document.getElementById(`gen-shop-btn`);i&&(i.textContent=`⏳ Generating…`,i.disabled=!0);let a=`Generate a grocery shopping list for these meals: ${n.join(`, `)}.

Return ONLY a JSON array:
[{"name":"Chicken breast","qty":"500g","cat":"Meat & Seafood"},{"name":"Pasta","qty":"400g","cat":"Pantry"}]

Categories must be one of: Produce, Meat & Seafood, Dairy & Eggs, Pantry, Bakery, Frozen, Household, Other.
Combine quantities where sensible. No duplicates. No other text.`,o={Produce:`produce`,"Meat & Seafood":`meat`,"Dairy & Eggs":`dairy`,Pantry:`pantry`,Bakery:`bakery`,Frozen:`frozen`,Household:`cleaning`,Other:`other`};try{let e=(await(await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":r,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:1024,messages:[{role:`user`,content:a}]})})).json()).content[0].text.match(/\[[\s\S]*\]/);if(!e)throw Error(`No JSON`);let t=JSON.parse(e[0]);m.lists||(m.lists={}),m.lists.food||(m.lists.food={items:[],weeklyBudget:200,budget:0,stores:[],favourites:[],history:[]});let n=m.lists.food.items,i=0;t.forEach(e=>{n.some(t=>t.name.toLowerCase()===e.name.toLowerCase()&&t.state===`active`)||n.push({id:`si-meal-`+Date.now()+`-`+ i++,name:e.name,quantity:1,unit:`units`,notes:e.qty||``,aisle:o[e.cat]||(Er?Er(e.name):`other`),state:`active`,addedBy:`meals`,addedAt:new Date().toISOString(),mealTag:`Meal plan`,manualPrice:null,barcodeId:null})}),saveData(m),Or=`food`,kr=`list`,activateTab(`lists`)}catch{i&&(i.textContent=`🛒 Generate shopping list`,i.disabled=!1)}}var fi=[`Living Room`,`Dining Room`,`Kitchen`,`Master Bedroom`,`Bedroom 2`,`Bedroom 3`,`Study / Office`,`Bathroom`,`Laundry`,`Outdoor / Alfresco`,`Other`];function pi(e={}){let t=e.deliveryDate?(()=>{let[t,n,r]=e.deliveryDate.split(`-`);return`${r}/${n}/${t}`})():``;return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-furn-name" type="text" maxlength="200" value="${S(e.name||``)}" placeholder="e.g. 3-seater sofa">
      </div>
      <div class="form-group">
        <label class="form-label">Room</label>
        <select class="form-select" id="f-furn-room">
          <option value="">— Select room —</option>
          ${fi.map(t=>`<option value="${t}" ${e.room===t?`selected`:``}>${t}</option>`).join(``)}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Store / Vendor</label>
        <input class="form-input" id="f-furn-vendor" type="text" maxlength="200" value="${S(e.vendor||``)}" placeholder="e.g. Nick Scali">
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
      <input class="form-input" id="f-furn-notes" type="text" maxlength="200" value="${S(e.notes||``)}" placeholder="Optional — colour, dimensions, order number...">
    </div>
    <div class="form-group">
      <label class="form-label">Funding</label>
      <select class="form-select" id="f-furn-funding">
        <option value="own-funds" ${(e.funding||`own-funds`)===`own-funds`?`selected`:``}>Own Funds</option>
        <option value="loan"      ${e.funding===`loan`?`selected`:``}>Loan</option>
      </select>
    </div>
  `}function mi(e){return{id:e,name:document.getElementById(`f-furn-name`).value.trim(),room:document.getElementById(`f-furn-room`).value,vendor:document.getElementById(`f-furn-vendor`).value.trim(),price:parseFloat(document.getElementById(`f-furn-price`).value)||0,status:document.getElementById(`f-furn-status`).value,funding:document.getElementById(`f-furn-funding`).value,deliveryDate:document.getElementById(`f-exp-duedate`).value||null,notes:document.getElementById(`f-furn-notes`).value.trim()}}function hi(){openModal(`Add Furniture Item`,pi(),()=>{let e=mi(M(m.furniture));e.name&&(logActivity(`Added furniture`,e.name),m.furniture.push(e),saveData(m),closeModal(),renderAll())})}function gi(e){let t=m.furniture.find(t=>t.id===e);openModal(`Edit Furniture Item`,pi(t),()=>{let n=mi(e);logActivity(`Edited furniture`,n.name||t.name),Object.assign(t,n),saveData(m),closeModal(),renderAll()})}function _i(e){if(!confirm(`Delete this item?`))return;let t=m.furniture.find(t=>t.id===e);logActivity(`Deleted furniture`,t?t.name:``),m.furniture=m.furniture.filter(t=>t.id!==e),saveData(m),renderAll()}function vi(e={}){let t=e.deliveryDate?(()=>{let[t,n,r]=e.deliveryDate.split(`-`);return`${r}/${n}/${t}`})():``;return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-appl-name" type="text" maxlength="200" value="${S(e.name||``)}" placeholder="e.g. Dishwasher">
      </div>
      <div class="form-group">
        <label class="form-label">Room</label>
        <select class="form-select" id="f-appl-room">
          <option value="">— Select room —</option>
          ${fi.map(t=>`<option value="${t}" ${e.room===t?`selected`:``}>${t}</option>`).join(``)}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Store / Vendor</label>
        <input class="form-input" id="f-appl-vendor" type="text" maxlength="200" value="${S(e.vendor||``)}" placeholder="e.g. Harvey Norman">
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
      <input class="form-input" id="f-appl-notes" type="text" maxlength="200" value="${S(e.notes||``)}" placeholder="Optional — model number, colour, order reference...">
    </div>
    <div class="form-group">
      <label class="form-label">Funding</label>
      <select class="form-select" id="f-appl-funding">
        <option value="own-funds" ${(e.funding||`own-funds`)===`own-funds`?`selected`:``}>Own Funds</option>
        <option value="loan"      ${e.funding===`loan`?`selected`:``}>Loan</option>
      </select>
    </div>
  `}function yi(e){return{id:e,name:document.getElementById(`f-appl-name`).value.trim(),room:document.getElementById(`f-appl-room`).value,vendor:document.getElementById(`f-appl-vendor`).value.trim(),price:parseFloat(document.getElementById(`f-appl-price`).value)||0,status:document.getElementById(`f-appl-status`).value,funding:document.getElementById(`f-appl-funding`).value,deliveryDate:document.getElementById(`f-exp-duedate`).value||null,notes:document.getElementById(`f-appl-notes`).value.trim()}}function bi(){openModal(`Add Appliance`,vi(),()=>{let e=yi(M(m.appliances));e.name&&(logActivity(`Added appliance`,e.name),m.appliances.push(e),saveData(m),closeModal(),renderAll())})}function xi(e){let t=m.appliances.find(t=>t.id===e);openModal(`Edit Appliance`,vi(t),()=>{let n=yi(e);logActivity(`Edited appliance`,n.name||t.name),Object.assign(t,n),saveData(m),closeModal(),renderAll()})}function Si(e){if(!confirm(`Delete this item?`))return;let t=m.appliances.find(t=>t.id===e);logActivity(`Deleted appliance`,t?t.name:``),m.appliances=m.appliances.filter(t=>t.id!==e),saveData(m),renderAll()}function Ci(){let[e,t]=selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t-2,1);selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,safeRender(Ti),safeRender(renderBudget)}function wi(){let[e,t]=selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t,1);selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,safeRender(Ti),safeRender(renderBudget)}function Ti(){let e=getMonthData(selectedBudgetMonth),t=e.income,n=e.expenses,r=j(t),i=j(n),a=r-i,o=r>0?Math.round(a/r*100):0,s={};n.forEach(e=>{let t=e.category||`Other`;s[t]=(s[t]||0)+A(e)});let c=Object.entries(s).sort((e,t)=>t[1]-e[1]),l=m.budget.actuals[selectedBudgetMonth]||{},u=n.reduce((e,t)=>e+getActual(t.id,selectedBudgetMonth),0),d=u>0,f=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
      <button class="btn btn-sm" onclick="prevMoneyMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${monthLabel(selectedBudgetMonth)}</span>
      <button class="btn btn-sm" onclick="nextMoneyMonth()" style="font-size:16px;padding:2px 10px">›</button>
      ${isMonthCustomized(selectedBudgetMonth)?`<span style="margin-left:8px;font-size:12px;padding:2px 10px;background:#dbeafe;color:#1d4ed8;border-radius:99px">Custom month</span>`:``}
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-label">Monthly Income</div>
        <div class="card-value green">${w(r)}</div>
        <div class="card-sub">${t.length} source${t.length===1?``:`s`}</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Expenses</div>
        <div class="card-value ${i>r?`red`:``}">${w(i)}</div>
        <div class="card-sub">${n.length} item${n.length===1?``:`s`}</div>
      </div>
      <div class="card">
        <div class="card-label">${a>=0?`Surplus`:`Deficit`}</div>
        <div class="card-value ${a>=0?`green`:`red`}">${w(Math.abs(a))}</div>
        <div class="card-sub">${a>=0?`left over each month`:`overspending each month`}</div>
      </div>
      <div class="card">
        <div class="card-label">Savings Rate</div>
        <div class="card-value ${o>=20?`green`:o>=10?`orange`:`red`}">${o}%</div>
        <div class="card-sub">of income remaining</div>
      </div>
    </div>
  `;if(f+=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-bottom:20px">`,f+=`
    <div class="section">
      <div class="section-header">
        <div class="section-title">Income</div>
        <span style="font-size:15px;font-weight:700;color:var(--success)">${w(r)}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Frequency</th><th class="amount">Monthly</th></tr></thead>
          <tbody>
            ${t.length===0?`<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:20px">No income added yet</td></tr>`:t.map(e=>{let t=r>0?Math.round(A(e)/r*100):0;return`<tr>
                    <td style="font-weight:500;border-left:4px solid #10b981">${x(e.name)}</td>
                    <td style="color:var(--text-muted);font-size:12px">${freqDisplayItem(e)}</td>
                    <td class="amount">${w(A(e))} <span style="color:var(--text-muted);font-size:11px">${t}%</span></td>
                  </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `,f+=`
    <div class="section">
      <div class="section-header">
        <div class="section-title">Expenses by Category</div>
        <span style="font-size:15px;font-weight:700;color:var(--danger)">${w(i)}</span>
      </div>
      <div style="padding:16px 20px">
        ${c.length===0?`<div style="color:var(--text-muted);text-align:center;padding:20px">No expenses added yet</div>`:c.map(([e,t])=>{let r=colors.expense[e]||`#94a3b8`,a=i>0?t/i*100:0,o=n.filter(t=>(t.category||`Other`)===e).reduce((e,t)=>e+(l[t.id]||0),0),s=n.some(t=>(t.category||`Other`)===e&&l[t.id]!==void 0);return`
                <div style="margin-bottom:16px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                    <span style="display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500">
                      <span style="width:11px;height:11px;border-radius:50%;background:${r};flex-shrink:0"></span>
                      ${e}
                    </span>
                    <span style="font-size:13px;font-weight:600">${w(t)}
                      <span style="font-weight:400;color:var(--text-muted);font-size:11px">${Math.round(a)}%</span>
                    </span>
                  </div>
                  <div style="height:7px;background:var(--surface2);border-radius:4px;overflow:hidden;position:relative">
                    <div style="height:100%;width:${a.toFixed(1)}%;background:${r};border-radius:4px;opacity:0.85"></div>
                    ${s?`<div style="position:absolute;top:0;height:100%;width:${Math.min(i>0?o/i*100:0,100).toFixed(1)}%;background:${r};border-radius:4px;border:1.5px solid #fff"></div>`:``}
                  </div>
                  ${s?`<div style="font-size:11px;color:var(--text-muted);margin-top:3px">Actual: ${w(o)}</div>`:``}
                </div>
              `}).join(``)}
      </div>
    </div>
  `,f+=`</div>`,d){let e=i-u;f+=`
      <div class="section" style="margin-bottom:20px">
        <div class="section-header">
          <div>
            <div class="section-title">Actuals — ${monthLabel(selectedBudgetMonth)}</div>
            <div class="section-subtitle">Recorded spending vs budget</div>
          </div>
          <div style="display:flex;gap:16px;align-items:center;font-size:13px;flex-wrap:wrap">
            <span>Budget: <strong>${w(i)}</strong></span>
            <span>Actual: <strong>${w(u)}</strong></span>
            <span style="font-weight:600;color:${e>=0?`var(--success)`:`var(--danger)`}">
              ${e>=0?`▼`:`▲`} ${w(Math.abs(e))} ${e>=0?`under`:`over`}
            </span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Expense</th><th>Category</th><th class="amount">Budget</th><th class="amount">Actual</th><th class="amount">Difference</th></tr></thead>
            <tbody>
              ${n.filter(e=>l[e.id]!==void 0).map(e=>{let t=A(e),n=l[e.id]||0,r=t-n,i=colors.expense[e.category||`Other`]||`#94a3b8`;return`<tr>
                    <td style="font-weight:500;border-left:4px solid ${i}">${x(e.name)}</td>
                    <td><span style="display:inline-block;padding:2px 9px;border-radius:99px;background:${i};color:#fff;font-size:11px;font-weight:600">${e.category||`Other`}</span></td>
                    <td class="amount">${w(t)}</td>
                    <td class="amount">${w(n)}</td>
                    <td class="amount" style="font-weight:600;color:${r>=0?`var(--success)`:`var(--danger)`}">
                      ${r>=0?`−`:`+`}${w(Math.abs(r))}
                    </td>
                  </tr>`}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `}let p=getLast6Months().map(e=>{let t=getMonthData(e);return{label:monthShortLabel(e),income:j(t.income),expenses:j(t.expenses),actual:Object.values(m.budget.actuals[e]||{}).reduce((e,t)=>e+t,0)}}),h=Math.max(...p.flatMap(e=>[e.income,e.expenses,e.actual]),1),g=524/p.length,_=g*.22,v=[0,.25,.5,.75,1].map(e=>{let t=148-e*136;return`<line x1="64" y1="${t}" x2="588" y2="${t}" stroke="#e2e8f0" stroke-width="1"/>
      <text x="59" y="${t+4}" text-anchor="end" font-size="9" fill="#94a3b8">${w(e*h)}</text>`}).join(``),y=p.map((e,t)=>{let n=64+t*g+g*.05,r=e.income>0?e.income/h*136:0,i=e.expenses>0?e.expenses/h*136:0,a=e.actual>0?e.actual/h*136:0,o=n+_+_/2+g*.04;return`
      <rect x="${n}"                        y="${148-r}" width="${_}" height="${r}" fill="#10b981" opacity="0.75" rx="2"/>
      <rect x="${n+_+g*.06}"       y="${148-i}" width="${_}" height="${i}" fill="#3b82f6" opacity="0.7"  rx="2"/>
      ${e.actual>0?`<rect x="${n+_*2+g*.12}" y="${148-a}" width="${_}" height="${a}" fill="${e.actual>e.expenses?`#ef4444`:`#f59e0b`}" opacity="0.85" rx="2"/>`:``}
      <text x="${o}" y="164" text-anchor="middle" font-size="10" fill="#64748b">${e.label}</text>
    `}).join(``);f+=`
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
          ${v}${y}
        </svg>
      </div>
    </div>
  `,document.getElementById(`money-content`).innerHTML=f}function Ei(){if(m.setupProgressDismissed)return``;let e=setupProgressTasks(),t=e.filter(e=>e.done),n=e.filter(e=>!e.done),r=t.length,i=e.length,a=Math.round(r/i*100);if(r===i)return`<div class="td-card td-card-win" style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <span style="font-size:22px">🎉</span>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:700;color:var(--good)">Setup complete!</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px">Your household is fully configured.</div>
      </div>
      <button onclick="state.setupProgressDismissed=true;saveData(state);renderToday()" style="font-size:12px;color:var(--muted);background:none;border:none;cursor:pointer;font-weight:600;padding:0">Dismiss</button>
    </div>`;let o=2*Math.PI*22,s=`
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
        stroke-dasharray="${o.toFixed(1)}" stroke-dashoffset="${(o-a/100*o).toFixed(1)}"
        stroke-linecap="round" transform="rotate(-90 26 26)"/>
    </svg>
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:10px;font-weight:700;color:var(--purple)">${a}%</div>`}</div>
        <span style="font-size:10px;color:var(--muted-soft)">${_spExpanded?`▲`:`▼`}</span>
      </div>
    </div>
    <div style="background:var(--hairline);border-radius:99px;height:4px;margin-top:14px;overflow:hidden">
      <div style="width:${a}%;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--iris-2),var(--iris-3))"></div>
    </div>`;if(!_spExpanded)return`<div class="td-card" style="margin-bottom:10px">${s}</div>`;let c=n[0],l=n.map(e=>{let t=e===c,n=e.settingsSection?`activateTab('${e.tab}');setTimeout(()=>{const el=document.getElementById('acc-${e.settingsSection||``}');if(el&&!el.classList.contains('open')){el.querySelector('.acc-header')?.click();}el?.scrollIntoView({behavior:'smooth',block:'start'})},200)`:e.tab?`activateTab('${e.tab}')`:``,r=n?`onclick="${n}"`:``;return`<div style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;background:${t?`var(--purple-tint)`:`transparent`};border:1px solid ${t?`var(--purple-mid,#DDD6FE)`:`var(--hairline)`};cursor:${e.tab?`pointer`:`default`}" ${r}>
      <div style="width:20px;height:20px;border-radius:50%;border:2px solid ${t?`var(--purple)`:`var(--hairline)`};flex-shrink:0"></div>
      <span style="font-size:13px;flex:1;color:var(--ink);font-weight:${t?`500`:`400`}">${e.label}</span>
      ${e.tab?`<span style="font-size:11px;color:${t?`var(--purple)`:`var(--muted-soft)`};font-weight:600">Go →</span>`:``}
    </div>`}).join(``),u=t.map(e=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;border:1px solid var(--good-soft)">
      <div style="width:20px;height:20px;border-radius:50%;background:var(--good);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;flex-shrink:0">✓</div>
      <span style="font-size:13px;flex:1;text-decoration:line-through;color:var(--muted)">${e.label}</span>
    </div>`).join(``);return`
    <div class="td-card" style="margin-bottom:10px">
      ${s}
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:14px">${l}</div>
      ${r>0?`
    <div style="margin-top:10px;border-top:1px solid var(--hairline-soft);padding-top:10px">
      <div onclick="_spDoneExpanded=!_spDoneExpanded;_refreshSetupProgress()" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:4px 0;margin-bottom:${_spDoneExpanded?`8px`:`0`}">
        <span style="font-size:12px;font-weight:600;color:var(--good)">${r} done</span>
        <span style="font-size:10px;color:var(--muted-soft)">${_spDoneExpanded?`▲`:`▼`}</span>
      </div>
      ${_spDoneExpanded?`<div style="display:flex;flex-direction:column;gap:5px">${u}</div>`:``}
    </div>`:``}
      <div style="text-align:center;margin-top:12px">
        <button onclick="state.setupProgressDismissed=true;saveData(state);renderToday()" style="font-size:12px;color:var(--muted);background:none;border:none;cursor:pointer">Dismiss · I'll do this later</button>
      </div>
    </div>`}var Di=[`#FF3B3B`,`#FF8A65`,`#FFB088`,`#FCD34D`,`#94A3B8`,`#27272a`];function Oi(e){let t=(e.expenses||[]).filter(e=>!e.skipped).map(e=>({name:e.name||`Other`,amount:freqToMonthly(Number(e.amount)||0,e.frequency)})).filter(e=>e.amount>0).sort((e,t)=>t.amount-e.amount);if(!t.length)return{segments:[],total:0};let n=t.reduce((e,t)=>e+t.amount,0),r=t.slice(0,5),i=t.slice(5),a=r.map((e,t)=>({name:e.name,pct:e.amount/n*100,color:Di[t]||`#94A3B8`}));if(i.length){let e=i.reduce((e,t)=>e+t.amount,0);a.push({name:`Other`,pct:e/n*100,color:Di[5]})}return{segments:a,total:n}}function ki(e){let t=(e.title||``).toLowerCase();return t.includes(`dinner`)||t.includes(`lunch`)||t.includes(`meal`)?`i-chef-hat`:t.includes(`rego`)||t.includes(`vehicle`)?`i-car`:t.includes(`health:`)?`i-activity`:t.includes(`over budget`)?`i-zap`:t.includes(`left in budget`)||t.includes(`budget`)?`i-wallet`:t.includes(`bill`)||t.includes(`due`)?`i-receipt`:t.includes(`expir`)?`i-file-text`:t.includes(`overdue`)||t.includes(`maintenance`)?`i-clipboard-check`:e.section===`Plan`?`i-calendar`:e.section===`Home`?`i-home`:e.section===`Wallet`?`i-wallet`:`i-clipboard-check`}function Ai(e){let t=e.section;return t===`Wallet`?`money`:t===`Plan`?`social`:t===`Home`?`work`:t===`Family`?`family`:`study`}function ji(e){return(e.section||`Task`).toLowerCase()}function Mi(){let e=[`S`,`M`,`T`,`W`,`T`,`F`,`S`],t=new Date,n=t.getDay()===0?6:t.getDay()-1,r=new Date(t);r.setDate(t.getDate()-n);let i=new Set;(m.bills||[]).forEach(e=>{let t=e.dueDate||e.nextDue;t&&i.add(t.slice(0,10))}),(m.planner?.events||[]).forEach(e=>{e.date&&i.add(e.date.slice(0,10))}),(m.maintenance||[]).forEach(e=>{e.nextDue&&i.add(e.nextDue.slice(0,10))});let a=[];for(let n=0;n<7;n++){let o=new Date(r);o.setDate(r.getDate()+n);let s=o.toISOString().slice(0,10),c=o.toDateString()===t.toDateString(),l=o<t&&!c,u=o.getDay(),d=c?`ws-day today`:l?`ws-day past`:`ws-day`,f=i.has(s)?` has`:``;a.push(`<div class="${d}${f}"><div class="ws-init">${e[u]}</div><div class="ws-num">${o.getDate()}</div><div class="ws-dot"></div></div>`)}return`<div class="week-strip">${a.join(``)}</div>`}function Ni(e){return`<div class="life-grid">`+[{cls:`money`,label:`Money`,match:e=>e.section===`Wallet`,icon:`<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>`,track:`#DDD6FE`,stroke:`#5B4CF5`},{cls:`family`,label:`Family`,match:e=>/kid|chore|family|riley|mia|child/i.test(e.title||``),icon:`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>`,track:`#A7F3D0`,stroke:`#10B981`},{cls:`work`,label:`Home`,match:e=>e.section===`Home`,icon:`<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,track:`#FDE9B0`,stroke:`#F59E0B`},{cls:`social`,label:`Plan`,match:e=>e.section===`Plan`,icon:`<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,track:`#FECDD3`,stroke:`#F43F5E`}].map(t=>{let n=(e||[]).filter(t.match),r=n.length,i=n.filter(e=>e.cls===`red`||e.cls===`amber`).length,a=(82-(r>0?Math.max(0,1-i/r):1)*82).toFixed(1);return`<div class="life-card ${t.cls}" onclick="activateTab('${t.cls===`money`?`budget`:t.cls===`family`?`kids`:t.cls===`work`?`documents`:`planner`}')">
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
    </div>`}).join(``)+`</div>`}function Pi(e){let t=e.onclick?e.onclick:e.tab?`activateTab('${e.tab}')`:``,n=ki(e),r=[`red`,`amber`,`green`,`blue`].includes(e.cls)?e.cls:`grey`;return`<div class="brief-row"${t?` onclick="${t}"`:``}>
    <div class="brief-glyph ${r}"><svg viewBox="0 0 24 24"><use href="#${n}"/></svg></div>
    <div class="brief-body">
      <div class="t">${e.title||``}</div>
      ${e.sub?`<div class="s">${e.sub}</div>`:``}
    </div>
    <svg class="brief-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  </div>`}function Fi(){let e=document.getElementById(`today-content`);if(!e)return;let t=new Date,r=t.getHours(),i=t.toISOString().slice(0,10);function a(e){return e<5?`overnight`:e<12?`morning`:e<17?`afternoon`:e<21?`evening`:`night`}let o=a(r),s={morning:`Good morning,`,afternoon:`Good afternoon,`,evening:`Wind down,`,night:`Tomorrow at a glance —`,overnight:`Still up,`}[o]||`Hello,`,c=_currentUser?.displayName?.split(` `)[0]||m.settings?.adultName?.split(` `)[0]||m.settings?.adults?.[0]?.name?.split(` `)[0]||m.householdProfile?.members?.find(e=>e.role===`adult`)?.name?.split(` `)[0]||``,l=t.toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`}).toUpperCase(),u=[],d=(m.bills||[]).map(e=>({...e,days:n(e)})).filter(e=>e.days!==null&&e.days<=2).sort((e,t)=>e.days-t.days);(m.maintenance||[]).filter(e=>{let t=_maintDaysUntil(e);return t!==null&&t<0}),(m.documents||[]).filter(e=>e.expiryDate&&new Date(e.expiryDate)<t),(m.vehicles||[]).filter(e=>e.regoExpiry&&new Date(e.regoExpiry)<t);let f=[];(m.documents||[]).forEach(e=>{e.expiryDate&&new Date(e.expiryDate)<t&&f.push({label:x(e.name),sub:`Document expired`,cls:`alert`,tab:`documents`})}),(m.maintenance||[]).forEach(e=>{let t=_maintDaysUntil(e);t!==null&&t<0&&f.push({label:x(e.name),sub:`${Math.abs(t)}d overdue`,cls:`watch`,tab:`maintenance`})}),(m.vehicles||[]).forEach(e=>{e.regoExpiry&&new Date(e.regoExpiry)<t&&f.push({label:x(e.name)+` rego`,sub:`Expired`,cls:`alert`,tab:`vehicles`})});let p=d.length>0,h=f.length>0;if(p||h){let e=d.length===1?d[0].days===0?`due today`:d[0].days===1?`due tomorrow`:`due in ${d[0].days} days`:`bill${d.length===1?``:`s`} due soon`,t=p?`
      <div onclick="_tdOpenHeadsUpSheet()" style="flex:1;min-width:0;background:var(--purple-soft);border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(91,76,245,.15);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(91,76,245,.08);position:relative;overflow:hidden">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(91,76,245,.18) 0%,transparent 70%);pointer-events:none"></div>
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--iris-2);margin-bottom:6px">Heads Up</div>
          <div style="font-size:36px;font-weight:800;color:var(--iris-1);letter-spacing:-.05em;line-height:1">${d.length}</div>
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
          <div style="font-size:36px;font-weight:800;color:var(--ember);letter-spacing:-.05em;line-height:1">${f.length}</div>
          <div style="font-size:12px;color:#c2410c;margin-top:3px">item${f.length===1?``:`s`} overdue</div>
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
      </div>`;u.push({type:`priority`,urgency:d.length>0?3:h?2:0,html:`<div style="display:flex;gap:12px;margin-bottom:12px">${t}${n}</div>`})}let g=o===`evening`||o===`night`?new Date(t.getTime()+864e5).toISOString().slice(0,10):i,_=g===i?`Today`:`Tomorrow`,v=_plannerEventsForDate?_plannerEventsForDate(g):[];if(v.length>0){let e=t.getHours()*60+t.getMinutes(),n=v.slice(0,4).map((t,n,r)=>{let a=t.allDay||!t.time?`All day`:_plannerFmt12h?_plannerFmt12h(t.time):t.time,o=_plannerEvWhoLabel?_plannerEvWhoLabel(t):``,s=_plannerEvPrimaryMember?_plannerEvPrimaryMember(t):{dot:`var(--iris-2)`},c=PLANNER_CATS?PLANNER_CATS[t.category]||PLANNER_CATS.other:{emoji:`📅`,label:``},l=t.time?parseInt(t.time.split(`:`)[0])*60+parseInt(t.time.split(`:`)[1]):-1,u=g===i&&l>=0&&e>=l&&e<l+90,d=n===Math.min(v.length,4)-1,f=c.color||`#f1f5f9`,p=c.text||`#475569`;return p.replace(/^#/,``),`<div class="pl-agenda-ev" style="margin-bottom:${d?`0`:`8px`}">
        <div class="pl-agenda-time-col">
          <span class="pl-agenda-time">${a}</span>
        </div>
        <div class="pl-agenda-timeline">
          <div class="pl-agenda-dot${u?` now`:``}" style="color:${p};background:${u?p:f}"></div>
          ${d?``:`<div class="pl-agenda-line"></div>`}
        </div>
        <div class="pl-agenda-card" style="background:${f};border-color:${p}22" onclick="activateTab('planner');setTimeout(()=>_plannerOpenDetail&&_plannerOpenDetail('${t.id}'),120)">
          <div class="pl-agenda-card-title">${x(t.title)}</div>
          <div class="pl-agenda-card-meta">
            <span class="pl-agenda-who-dot" style="background:${s.dot}"></span>
            <span>${o}</span>
          </div>
          ${c.label?`<div class="pl-agenda-cat-pill" style="background:${p}1a;color:${p}">${c.emoji} ${c.label}</div>`:``}
        </div>
      </div>`}).join(``);u.push({type:`schedule`,urgency:1,html:`<div class="td-card td-card-schedule" style="padding:0;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;border-bottom:1px solid rgba(24,24,27,.06)">
          <div class="td-card-meta" style="margin-bottom:0"><span class="td-meta-label">${_}</span><span class="td-meta-count" style="margin-left:2px">${v.length}</span></div>
          <span style="font-size:12px;font-weight:600;color:var(--iris-2);cursor:pointer" onclick="activateTab('planner')">See all →</span>
        </div>
        <div style="padding:12px 16px">${n}</div>
      </div>`})}let y=getMonthData(selectedBudgetMonth),b=j(y.income),S=j(y.expenses),C=b-S,ee=(y.expenses||[]).reduce((e,t)=>e+getActual(t.id,selectedBudgetMonth),0),w=new Date(t.getFullYear(),t.getMonth()+1,0).getDate()-t.getDate(),T=S>0?Math.min(100,Math.round(ee/S*100)):0;if(b>0||S>0){let e=C>=0?``:`td-money-status-watch`,n=C>=0?`On track`:`Over budget`,r=Math.abs(C),i=[];d.forEach(e=>i.push(`<span class="td-money-flag td-money-flag-watch">${x(e.name)} due ${e.days===0?`today`:e.days===1?`tomorrow`:`in `+e.days+`d`}</span>`)),u.push({type:`money`,urgency:0,html:`<div class="td-card td-card-money">
        <div class="td-money-row">
          <div>
            <div class="td-card-meta"><span class="td-meta-label">${t.toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</span></div>
            <div class="money-amount"><span class="money-amount-currency">$</span>${r.toLocaleString(`en-AU`,{maximumFractionDigits:0})}<span class="money-amount-suffix">${C>=0?`left`:`over`}</span></div>
          </div>
          <span class="td-money-status ${e}">${n}</span>
        </div>
        <div class="td-money-bar"><div class="td-money-bar-fill" style="width:${T}%"></div></div>
        <div class="td-money-flags">${i.join(``)}<span class="td-money-flag">${w} days left</span></div>
      </div>`})}let E=typeof _routinesForCurrentUser==`function`?_routinesForCurrentUser().filter(e=>_routineMatchesDate(e,i)):[];function D(e){if(!e.triggerTime)return!0;let[n,r]=e.triggerTime.split(`:`).map(Number),i=t.getHours()*60+t.getMinutes(),a=n*60+(r||0);return i>=a-90&&i<a+360}let te=E.filter(D),ne=typeof _routineTodayKey==`function`?_routineTodayKey():i.replace(/-/g,``),O=E.filter(e=>!D(e)&&(e.completions?.[ne]||[]).length>0),k=[...new Set([...te,...O])];if(k.length>0){let e=k.map(e=>{let t=(e.completions?.[ne]||[]).map(String),n=e.steps.length,r=t.length,i=n>0?Math.round(r/n*100):0,a=r===n&&n>0,o=D(e),s=e.triggerTime?`<span style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-left:6px">${e.triggerTime}</span>`:``,c=e.steps.map(n=>{let r=t.includes(String(n.id)),i=n.durationMin?`<span style="font-family:var(--mono);font-size:10px;color:var(--muted-soft);margin-left:auto;padding-left:8px;flex-shrink:0">${n.durationMin}m</span>`:``;return`<div class="td-routine-step ${r?`td-routine-step-done`:``}" onclick="_tdToggleStep('${e.id}','${n.id}')">
          <div class="td-routine-check ${r?`td-routine-check-done`:``}">
            ${r?`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``}
          </div>
          <span class="td-routine-step-emoji">${n.emoji||``}</span>
          <span class="td-routine-step-label ${r?`td-routine-step-label-done`:``}">${x(n.label)}</span>
          ${n.points?`<span class="td-routine-step-pts">+${n.points}</span>`:``}
          ${i}
        </div>`}).join(``);return`<div class="td-routine-card ${a?`td-routine-card-done`:o?`td-routine-card-active`:`td-routine-card-locked`}">
        <div class="td-routine-header">
          <span style="font-size:20px">${e.emoji||`📋`}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;color:var(--ink)">${x(e.name)}${s}</div>
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
      </div>`}).join(``);u.push({type:`kids`,urgency:0,html:`<div class="td-card td-card-kids" style="padding:16px 18px">
        <div class="td-card-meta" style="margin-bottom:10px"><span class="td-meta-label">My Routines</span><span class="td-meta-count">${k.length}</span></div>
        ${e}
      </div>`})}let re=new Date(t.getTime()+7*864e5).toISOString().slice(0,10),A=(m.planner?.events||[]).filter(e=>e.date>i&&e.date<=re).sort((e,t)=>e.date.localeCompare(t.date)).slice(0,3),M=(m.bills||[]).map(e=>({...e,days:n(e)})).filter(e=>e.days!==null&&e.days>2&&e.days<=7);if(A.length+M.length>0){let e=[...A.map(e=>{let t=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`}),n=!e.allDay&&e.time?_plannerFmt12h?_plannerFmt12h(e.time):e.time:``;return`<div class="td-up-row td-clickable" onclick="activateTab('planner');setTimeout(()=>_plannerOpenDetail&&_plannerOpenDetail('${e.id}'),120)">
          <div style="display:flex;flex-direction:column;gap:1px;min-width:60px;flex-shrink:0">
            <span class="td-up-date">${t}</span>
            ${n?`<span style="font-family:var(--mono);font-size:10px;color:var(--iris-2);font-weight:600">${n}</span>`:``}
          </div>
          <span class="td-up-title" style="flex:1">${x(e.title)}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hairline)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>`}),...M.map(e=>`<div class="td-up-row td-clickable" onclick="activateTab('bills')">
        <span class="td-up-date">In ${e.days}d</span>
        <span class="td-up-title" style="flex:1">${x(e.name)} <span style="font-family:var(--mono);color:var(--muted)">$${parseFloat(e.amount).toFixed(0)}</span></span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hairline)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`)].slice(0,4).join(``);u.push({type:`upcoming`,urgency:0,html:`<div class="td-card">
        <div class="td-card-meta"><span class="td-meta-label">Coming up</span><span class="td-meta-count">${A.length+M.length}</span></div>
        <div class="td-up-list">${e}</div>
      </div>`})}let ie=(m.kids?.profiles||[]).map(e=>{let t=(m.routineAssignments||[]).filter(t=>t.childId===e.id),n=0;return t.forEach(e=>{let t=(m.routines||[]).find(t=>t.id===e.routineId);if(t){let r=_assignmentStreak?_assignmentStreak(e,t.steps.length):0;r>n&&(n=r)}}),{kid:e,streak:n}}).filter(e=>e.streak>=3);if(ie.length>0){let e=ie[0];u.push({type:`win`,urgency:0,html:`<div class="td-card td-card-win">
        <div class="td-card-meta"><span class="td-meta-label" style="color:var(--lime-deep)">Win</span></div>
        <div class="td-card-headline" style="font-family:var(--serif);font-style:italic">${x(e.kid.name)} did every routine. ${e.streak} days running.</div>
      </div>`})}{let e=m.lists&&m.lists.food?m.lists.food:{items:[]},t=(e.items||[]).filter(e=>e.state===`active`),n=(e.items||[]).filter(e=>e.state===`got_it`),r=m.kids,i=r?(r.completions||[]).filter(e=>e.status===`pending`).length+(r.redemptions||[]).filter(e=>e.status===`pending`).length:0,a=m.kids?.profiles?.length>0,o=`
      <div onclick="_listsActiveType='food';_listsView='list';activateTab('lists')" style="flex:1;min-width:0;background:var(--purple-soft);border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:130px;border:1px solid rgba(91,76,245,.12);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(91,76,245,.08)">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--iris-2);margin-bottom:6px">Shopping List</div>
          <div style="font-size:28px;font-weight:800;color:var(--iris-1);letter-spacing:-.04em;line-height:1">${t.length}</div>
          <div style="font-size:12px;color:var(--iris-2);margin-top:2px">${t.length===1?`item`:`items`}${n.length>0?` · ${n.length} in trolley`:``}</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--iris-1);margin-top:10px">View list →</div>
      </div>`,s=a?`
      <div onclick="activateTab('kids')" style="flex:1;min-width:0;background:${i>0?`#FFF7ED`:`#F0FDF4`};border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:130px;border:1px solid ${i>0?`rgba(249,115,22,.15)`:`rgba(16,185,129,.15)`};box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(22,20,15,.05)">
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${i>0?`#c2410c`:`#059669`};margin-bottom:6px">Kids</div>
          <div style="font-size:28px;font-weight:800;color:${i>0?`var(--ember)`:`var(--good)`};letter-spacing:-.04em;line-height:1">${i>0?i:`✓`}</div>
          <div style="font-size:12px;color:${i>0?`#c2410c`:`#059669`};margin-top:2px">${i>0?`approval${i===1?``:`s`} pending`:`all clear`}</div>
        </div>
        <div style="font-size:12px;font-weight:700;color:${i>0?`var(--ember)`:`var(--good)`};margin-top:10px">${i>0?`Review →`:`View kids →`}</div>
      </div>`:``;u.push({type:`lists`,urgency:+(i>0),html:`<div style="display:flex;gap:12px;margin-bottom:12px">${o}${s}</div>`})}function ae(){let e={overnight:`Quiet night.`,morning:`Quiet day ahead.`,afternoon:`Quiet afternoon.`,evening:`Quiet evening.`,night:`Nothing pressing tonight.`},t=[];if(v.length>=3?t.push(`${v.length} things on the calendar.`):v.length===0&&f.length===0&&d.length===0&&t.push(e[o]||`Quiet day ahead.`),d.length>0){let e=d[0];t.push(`${e.name} ${e.days===0?`is due today`:`is due tomorrow`}.`)}return t.length===0&&t.push(e[o]||`Quiet day ahead.`),t.slice(0,2).join(` `)}let N=ae(),oe={priority:0,schedule:1,money:2,lists:3,kids:4,slipping:5,upcoming:6,win:7};u.sort((e,t)=>(oe[e.type]??9)-(oe[t.type]??9));let se=u.map(e=>e.html).join(``),ce=u.length<=1?`<div class="td-calm">You're sorted.<br>See you tomorrow.</div>`:``,le=typeof Ei==`function`?`<div id="setup-progress-card">${Ei()}</div>`:``;if(e.innerHTML=`
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
      <div class="td-greeting-date">${l}</div>
      <div class="td-greeting-line">
        ${s} <span class="iris-text">${c?c+`.`:`you.`}</span>
      </div>
      <div class="td-greeting-brief">${x(N)}</div>
    </div>

    ${le}
    ${m.settings?.typeAMode?`
      ${_renderLifeScore()}
      ${_renderMissionCard()}
    `:``}
    ${se}
    ${ce}
  `,m.settings?.typeAMode&&_checkMissionEscalation(),typeof Wi==`function`){let e=typeof calcFinancialHealth==`function`?calcFinancialHealth():null,n=typeof _mealWeekKey==`function`?_mealWeekKey(0):null,r=n&&m.meals?.plan?.[n]?.[t.getDay()===0?6:t.getDay()-1]||{};Wi(u.map(e=>({title:e.type})),C,w,r,e)}}function Ii(){let e=(m.bills||[]).map(e=>({...e,days:n(e)})).filter(e=>e.days!==null&&e.days<=2).sort((e,t)=>e.days-t.days);if(!e.length)return;let t=e.reduce((e,t)=>e+(parseFloat(t.amount)||0),0);Ri(`Heads Up`,e.map(e=>{let t=e.days===0?`Due today`:e.days===1?`Tomorrow`:`In ${e.days} days`,n=e.days===0?`background:#FEF2F2;color:#b91c1c`:e.days===1?`background:#FFF4EE;color:#c2410c`:`background:var(--paper);color:var(--muted)`,r=e.amount?`$${parseFloat(e.amount).toLocaleString(`en-AU`,{minimumFractionDigits:2,maximumFractionDigits:2})}`:``,i=e.days===0?`box-shadow:0 0 0 3px rgba(239,68,68,.2)`:e.days===1?`box-shadow:0 0 0 3px rgba(249,115,22,.2)`:``;return`<div style="display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--hairline);gap:14px">
      <div style="width:8px;height:8px;border-radius:50%;background:${e.days===0?`#ef4444`:e.days===1?`var(--ember)`:`var(--iris-2)`};flex-shrink:0;${i}"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:var(--ink)">${x(e.name)}</div>
        ${e.notes?`<div style="font-size:11px;color:var(--muted);margin-top:2px;font-family:var(--mono)">${x(e.notes)}</div>`:``}
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
  </div>`)}function Li(){let e=new Date,t=[];(m.documents||[]).forEach(n=>{n.expiryDate&&new Date(n.expiryDate)<e&&t.push({label:n.name,sub:`Documents`,badge:`Expired`,cls:`alert`,tab:`documents`})}),(m.maintenance||[]).forEach(e=>{let n=_maintDaysUntil(e);n!==null&&n<0&&t.push({label:e.name,sub:`Maintenance`,badge:`${Math.abs(n)}d overdue`,cls:`watch`,tab:`maintenance`})}),(m.vehicles||[]).forEach(n=>{n.regoExpiry&&new Date(n.regoExpiry)<e&&t.push({label:n.name+` rego`,sub:`Vehicles`,badge:`Expired`,cls:`alert`,tab:`vehicles`})}),t.length&&Ri(`Slipping`,t.map(e=>{let t=e.cls===`alert`?`#ef4444`:`var(--ember)`,n=e.cls===`alert`?`box-shadow:0 0 0 3px rgba(239,68,68,.15)`:`box-shadow:0 0 0 3px rgba(249,115,22,.18)`,r=e.cls===`alert`?`background:#FEF2F2;color:#b91c1c`:`background:#FFF4EE;color:#c2410c`;return`<div onclick="activateTab('${e.tab}');_tdCloseSheet()" style="display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--hairline);gap:14px;cursor:pointer">
      <div style="width:8px;height:8px;border-radius:50%;background:${t};flex-shrink:0;${n}"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:var(--ink)">${x(e.label)}</div>
        <div style="font-size:11px;color:var(--muted);margin-top:2px;font-family:var(--mono)">${e.sub}</div>
      </div>
      <div style="display:inline-block;font-family:var(--mono);font-size:10px;font-weight:700;border-radius:99px;padding:2px 8px;${r}">${e.badge}</div>
    </div>`}).join(``)+`<div style="padding:14px 18px;border-top:1px solid var(--hairline);display:flex;justify-content:flex-end">
    <button onclick="_tdCloseSheet()" style="background:linear-gradient(135deg,#ea6c0a,var(--ember));color:#fff;border:none;border-radius:99px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer">Done</button>
  </div>`)}function Ri(e,t){let n=document.getElementById(`td-sheet-overlay`);n||(n=document.createElement(`div`),n.id=`td-sheet-overlay`,n.style.cssText=`position:fixed;inset:0;z-index:1200;display:flex;flex-direction:column;justify-content:flex-end;background:rgba(0,0,0,.4)`,n.onclick=e=>{e.target===n&&zi()},document.body.appendChild(n)),n.innerHTML=`
    <div id="td-sheet-panel" style="background:var(--pearl);border-radius:24px 24px 0 0;max-height:80vh;display:flex;flex-direction:column;padding-bottom:env(safe-area-inset-bottom,16px)">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 18px 14px;border-bottom:1px solid var(--hairline);flex-shrink:0">
        <div style="width:36px;height:4px;background:var(--hairline);border-radius:99px;position:absolute;top:10px;left:50%;transform:translateX(-50%)"></div>
        <div style="font-size:17px;font-weight:800;color:var(--ink);letter-spacing:-.015em">${x(e)}</div>
        <button onclick="_tdCloseSheet()" style="background:var(--paper);border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:15px;color:var(--muted);display:flex;align-items:center;justify-content:center">×</button>
      </div>
      <div style="overflow-y:auto;flex:1">${t}</div>
    </div>`,n.style.display=`flex`}function zi(){let e=document.getElementById(`td-sheet-overlay`);e&&(e.style.display=`none`)}function Bi(e,t){let n=(m.routines||[]).find(t=>String(t.id)===String(e));if(!n)return;let r=_routineTodayKey();n.completions||(n.completions={}),n.completions[r]||(n.completions[r]=[]),n.completions[r]=n.completions[r].map(String);let i=String(t),a=n.completions[r].indexOf(i);a===-1?n.completions[r].push(i):n.completions[r].splice(a,1),saveData(m),Fi()}function Vi(){let e=[],t=new Date,n=getMonthData(selectedBudgetMonth),r=j(n.income)-j(n.expenses);r<0&&e.push({headline:`Spending is ahead of budget this month.`,detail:`You're $${Math.abs(r).toFixed(0)} over.`,action:`budget`}),(m.documents||[]).filter(e=>e.expiryDate).forEach(n=>{let r=Math.ceil((new Date(n.expiryDate)-t)/864e5);r>=0&&r<=30&&e.push({headline:`${n.name} expires in ${r} day${r===1?``:`s`}.`,detail:`Keep it updated.`,action:`documents`})}),e.length===0&&e.push({headline:`All clear. Nothing to flag.`,detail:`Check back later.`,action:null});let i=e.map(e=>`<div style="padding:16px 0;border-bottom:1px solid var(--hairline)">
    <div style="font-family:var(--serif);font-style:italic;font-size:17px;font-weight:400;margin-bottom:4px;color:var(--ink)">${x(e.headline)}</div>
    <div style="font-size:13px;color:var(--muted)">${x(e.detail)}</div>
    ${e.action?`<button onclick="activateTab('${e.action}');closeQuickAdd&&closeQuickAdd()" style="margin-top:10px;padding:7px 14px;border-radius:99px;background:var(--ink);color:var(--pearl);font-size:12px;font-weight:500;border:none;cursor:pointer">View →</button>`:``}
  </div>`).join(``);typeof openModal==`function`&&openModal(`💡 Insights`,`<div style="padding:0 4px">${i}</div>`,null)}var Hi=``,Ui=``;async function Wi(e,t,n,r,i){let a=localStorage.getItem(`toto_ai_key`);if(!a)return;let o=new Date().toISOString().slice(0,10);if(Hi===o&&Ui){let e=document.getElementById(`today-briefing-text`);e&&(e.textContent=Ui);return}let s=e.filter(e=>e.cls===`red`).map(e=>e.title),c=e.filter(e=>e.cls===`amber`).map(e=>e.title),l=`You are Toto, a friendly family personal assistant app. Write a 2-sentence daily briefing for the user based on this context:

${[`Budget: ${w(Math.abs(t))} ${t>=0?`surplus`:`over budget`}, ${n} days left in the month`,`Health score: ${i.total}/100 (${i.grade})`,s.length?`Urgent: ${s.join(`, `)}`:``,c.length?`Coming up: ${c.join(`, `)}`:``,r.d?`Dinner tonight: ${r.d}`:`No dinner planned`,`${(m.goals||[]).filter(e=>e.status!==`achieved`).length} active goals`].filter(Boolean).join(`. `)}

Rules:
- Warm, conversational, like a helpful friend
- Lead with the most important thing
- Mention dinner if planned
- Keep it under 40 words
- No emojis, no bullet points, just flowing text
- Don't start with "Here's" or "Today"`;try{let e=await fetch(CLAUDE_API,{method:`POST`,headers:{"x-api-key":a,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:100,messages:[{role:`user`,content:l}]})});if(!e.ok)return;let t=(await e.json()).content[0].text.trim().replace(/^["']|["']$/g,``);Ui=t,Hi=o;let n=document.getElementById(`today-briefing-text`);n&&(n.textContent=t)}catch{}}function Gi(){let e=m,r=e.buildContract,i=(e.netWorth.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),a=(e.netWorth.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),o=i-a,s=e.netWorth.snapshots||[],c=``;if(s.length>=2){let e=o-s[s.length-2].netWorth;c=`<span class="${e>=0?`up`:`dn`}">${e>=0?`+`:``}${fmtNW(e)}</span> vs last snapshot`}let l=selectedBudgetMonth,u=getMonthData(l),d=j(u.income),f=j(u.expenses),p=d-f,h=(e.subscriptions||[]).reduce((e,t)=>e+subMonthlyAmount(t),0),g=(e.bills||[]).filter(e=>{let t=n(e);return t>=0&&t<=31}).reduce((e,t)=>e+(parseFloat(t.amount)||0),0),_=[...e.bills||[]].filter(e=>n(e)>=-1).sort((e,t)=>n(e)-n(t)).slice(0,5),v=(e.goals||[]).filter(e=>e.status!==`achieved`).slice(0,4),y=r.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),b=(r.variations||[]).filter(e=>e.status===`approved`).reduce((e,t)=>e+(t.amount||0),0),S=r.total+b,C=Math.round(y/S*100),ee=r.stages.find(e=>!e.paid),T=((e.kids||{}).completions||[]).filter(e=>e.status===`pending`).length+((e.kids||{}).redemptions||[]).filter(e=>e.status===`pending`).length,E=getLast6Months(),D=j(u.expenses),te=E.map(e=>{let t=Object.values(m.budget.actuals[e]||{}).reduce((e,t)=>e+t,0);return{label:monthShortLabel(e),budget:D,actual:t}}),ne=D>0||te.some(e=>e.actual>0),O=calcFinancialHealth(),k=251.3,re=(O.total/100*k).toFixed(1),A=O.dimensions.map(e=>{let t=Math.round(e.score/e.max*100),n=t>=75?`#10b981`:t>=50?`#f59e0b`:`#ef4444`;return`
      <div style="display:grid;grid-template-columns:130px 1fr 30px;align-items:center;gap:8px">
        <span style="font-size:12px;color:var(--text-muted);white-space:nowrap">${e.label}</span>
        <div style="height:6px;background:var(--border);border-radius:4px;overflow:hidden">
          <div style="height:100%;width:${t}%;background:${n};border-radius:4px;transition:width 0.4s"></div>
        </div>
        <span style="font-size:11px;font-weight:600;color:${n};text-align:right">${e.score}/${e.max}</span>
      </div>`}).join(``),M=`
    <div class="db-widget" style="margin:0 24px 20px">
      <div class="db-widget-header">
        <span class="db-widget-title">Financial Health Score</span>
      </div>
      <div style="display:grid;grid-template-columns:120px 1fr;gap:20px;align-items:center;padding:16px 20px 12px">
        <div style="text-align:center">
          <svg viewBox="0 0 100 100" width="110" height="110" style="display:block;margin:0 auto">
            <g transform="rotate(-90 50 50)">
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" stroke-width="10"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="${O.color}" stroke-width="10"
                stroke-dasharray="${re} ${k}" stroke-linecap="round"/>
            </g>
            <text x="50" y="47" text-anchor="middle" font-size="24" font-weight="800" fill="${O.color}">${O.total}</text>
            <text x="50" y="63" text-anchor="middle" font-size="13" font-weight="600" fill="#94a3b8">Grade ${O.grade}</text>
          </svg>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">${A}</div>
      </div>
      <div style="padding:0 20px 14px;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:10px;margin-top:4px">
        💡 ${O.insight}
      </div>
    </div>`,ie=``;if(ne){let e=Math.max(...te.flatMap(e=>[e.budget,e.actual]),1),t=532/te.length,n=t*.28,r=t*.04;ie=`<div class="db-widget">
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
        <text x="53" y="${n+4}" text-anchor="end" font-size="9" fill="#94a3b8">${w(t*e)}</text>`}).join(``)}${te.map((i,a)=>{let o=58+a*t+t*.08,s=i.budget>0?i.budget/e*140:0,c=i.actual>0?i.actual/e*140:0,l=i.actual>i.budget?`#ef4444`:`#10b981`;return`<rect x="${o}" y="${150-s}" width="${n}" height="${s}" fill="#2563eb" opacity="0.65" rx="2"/>
        <rect x="${o+n+r}" y="${150-c}" width="${n}" height="${c}" fill="${l}" opacity="0.8" rx="2"/>
        <text x="${o+n+r/2+n/2}" y="166" text-anchor="middle" font-size="10" fill="#64748b">${i.label}</text>`}).join(``)}</svg>
      </div>
    </div>`}let ae=`
    <!-- Hero row: net worth + 4 stats -->
    <div class="db-hero-row">
      <div class="db-nw-card" onclick="activateTab('networth')" style="cursor:pointer">
        <div>
          <div class="db-nw-label">Net Worth</div>
          <div class="db-nw-amount">${fmtNW(o)}</div>
          ${c?`<div class="db-nw-change">${c}</div>`:``}
        </div>
        <div style="font-size:12px;opacity:0.6;margin-top:12px">${w(i)} assets · ${w(a)} liabilities</div>
      </div>
      <div class="db-stats-col">
        <div class="db-stat">
          <div class="db-stat-val ${p>=0?`green`:`red`}">${w(Math.abs(p))}</div>
          <div class="db-stat-lbl">Monthly ${p>=0?`surplus`:`deficit`}</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val teal">$${Math.round(g).toLocaleString()}</div>
          <div class="db-stat-lbl">Bills this month</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val">$${Math.round(h).toLocaleString()}</div>
          <div class="db-stat-lbl">Subscriptions/mo</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val">${w(d)}</div>
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
    ${M}

    <!-- Two-column widgets -->
    <div class="db-grid">
      <div>
        <!-- Upcoming bills -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Upcoming Bills</span>
            <button class="db-widget-link" onclick="activateTab('bills')">View all →</button>
          </div>
          ${_.length?_.map(e=>{let r=n(e),i=r<0?`<span class="bill-due-badge overdue">Overdue</span>`:r===0?`<span class="bill-due-badge today">Today</span>`:r<=7?`<span class="bill-due-badge soon">${r}d</span>`:`<span class="bill-due-badge ok">${t(e).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}</span>`;return`<div class="db-bill-row">
              <div class="db-bill-icon">${billCatIcon(e.category)}</div>
              <div class="db-bill-name">${x(e.name)}</div>
              ${i}
              <div class="db-bill-amount">${w(parseFloat(e.amount)||0)}</div>
            </div>`}).join(``):`<div class="db-empty-row">No upcoming bills — <button class="db-widget-link" onclick="activateTab('bills')">add one</button></div>`}
        </div>

        <!-- Goals -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Goals</span>
            <button class="db-widget-link" onclick="activateTab('goals')">View all →</button>
          </div>
          ${v.length?v.map(e=>{let t=Math.min(Math.round((e.saved||0)/(e.target||1)*100),100);return`<div class="db-goal-row">
              <div class="db-goal-top">
                <span class="db-goal-name">${e.emoji||`🎯`} ${x(e.name)}</span>
                <span class="db-goal-pct">${w(e.saved||0)} of ${w(e.target||0)} · ${t}%</span>
              </div>
              <div class="db-goal-bar"><div class="db-goal-fill" style="width:${t}%"></div></div>
            </div>`}).join(``):`<div class="db-empty-row">No active goals — <button class="db-widget-link" onclick="activateTab('goals')">add one</button></div>`}
        </div>
      </div>

      <div>
        <!-- Budget this month -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Budget · ${monthLabel(l)}</span>
            <button class="db-widget-link" onclick="activateTab('budget')">Edit →</button>
          </div>
          <div class="db-budget-row">
            <span class="db-budget-label">Income</span>
            <span class="db-budget-val" style="color:#10b981">${w(d)}</span>
          </div>
          <div class="db-budget-row">
            <span class="db-budget-label">Expenses</span>
            <span class="db-budget-val" style="color:#ef4444">${w(f)}</span>
          </div>
          <div class="db-budget-row" style="border-top:2px solid var(--border)">
            <span class="db-budget-label" style="font-weight:700">${p>=0?`Surplus`:`Deficit`}</span>
            <span class="db-budget-val" style="color:${p>=0?`#10b981`:`#ef4444`}">${w(Math.abs(p))}</span>
          </div>
        </div>

        ${T>0?`
        <!-- Kids pending approvals -->
        <div class="db-widget" style="border-color:#fde68a">
          <div class="db-widget-header" style="background:#fffbeb">
            <span class="db-widget-title">⭐ Kids Zone — ${T} pending approval${T===1?``:`s`}</span>
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
              <span style="font-weight:600">${w(y)} paid</span>
              <span style="color:#94a3b8">${C}% of ${w(S)}</span>
            </div>
            <div class="db-build-bar" style="margin:0 0 10px">
              <div class="db-build-fill" style="width:${C}%"></div>
            </div>
            ${ee?`<div style="font-size:12px;color:#64748b">Next: <strong>${x(ee.name)}</strong> — ${w(ee.amount)}</div>`:`<div style="font-size:12px;color:#10b981;font-weight:600">✓ All stages paid</div>`}
          </div>
        </div>
      </div>
    </div>

    ${ie}
  `;document.getElementById(`dashboard-content`).innerHTML=ae}function Ki(){function e(e){return e.replace(/[^a-z0-9]/gi,`_`)}function t(t,n,r,i){let a=`${t}_${e(n)}`;return`
      <div class="color-row">
        <div class="color-dot" id="dot-${a}" style="background:${i}"></div>
        <span>${r}</span>
        <input type="color" value="${i}"
          oninput="document.getElementById('dot-${a}').style.background=this.value"
          onchange="updateColor('${t}','${n}',this.value)">
      </div>`}let n=localStorage.getItem(STORAGE_KEY),r=n?(n.length/1024).toFixed(1):0,i=n?`<span style="color:var(--success);font-weight:600">✓ Data found in localStorage (${r} KB)</span>`:`<span style="color:var(--danger);font-weight:600">⚠ No data in localStorage</span>`,a=m.activityLog||[];function o(e){let t=new Date(e);return t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})+` `+t.toLocaleTimeString(`en-AU`,{hour:`2-digit`,minute:`2-digit`})}function s(e){return e.photo?`<img src="${e.photo}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0" onerror="this.style.display='none'">`:`<div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${(e.name||`?`)[0].toUpperCase()}</div>`}let c={Added:`#10b981`,Edited:`#3b82f6`,Deleted:`#ef4444`,Updated:`#f59e0b`,Imported:`#8b5cf6`,Removed:`#ef4444`};function l(e){return c[e.split(` `)[0]]||`#94a3b8`}function u(e,t,n,r,i){let a=_settingsOpen.has(e);return`
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
      </div>`}let d={dog:`🐕`,cat:`🐈`,bird:`🐦`};new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`});let f=m.settings?.adultName||m.settings?.adults?.[0]?.name||`You`,p=m.settings?.email||``,h=`
    <div class="settings-profile" style="margin:0 0 8px">
      <div class="profile-avatar-lg">${f.charAt(0).toUpperCase()}</div>
      <div style="flex:1;min-width:0">
        <div class="profile-name">${x(f)}</div>
        ${p?`<div class="profile-email">${x(p)}</div>`:``}
        <div style="margin-top:6px"><span class="t-chip work" style="font-size:10px">Admin</span></div>
      </div>
      <button onclick="fbAuth&&fbAuth.signOut().then(()=>location.reload())" style="background:none;border:none;cursor:pointer;color:var(--muted);font-size:12px;font-weight:600;padding:0;white-space:nowrap">Sign out</button>
    </div>
    <div class="toto-sec-header" style="margin-top:6px"><span class="toto-sec-title">Settings</span></div>`+u(`ai`,`🤖 AI Assistant (Toto)`,`Powers cost estimation, Toto chat, and CSV import analysis`,`
      <div class="section-body">
        <div style="margin-bottom:8px;font-size:13px;font-weight:600">Anthropic API Key</div>
        <div style="display:flex;gap:8px;align-items:center;max-width:480px">
          <input type="password" class="form-input" id="settings-api-key" style="flex:1"
            placeholder="sk-ant-api03-..."
            value="${localStorage.getItem(`toto_ai_key`)||``}">
          <button class="btn btn-primary" onclick="saveApiKey()">Save</button>
        </div>
        <p id="api-key-status" style="font-size:12px;color:var(--text-muted);margin-top:6px"></p>
        ${_renderApiKeySummary()}
      </div>`)+u(`prefs`,`Budget Preferences`,`Controls how month-to-month budget data is managed`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" id="pref-autofill" ${(m.settings||{}).autoFillMonths?`checked`:``}
            onchange="updateSetting('autoFillMonths', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Auto-fill new months from previous month</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">When you navigate forward to a month with no data, automatically copy all recurring items from the previous month.</p>
          </div>
        </label>
      </div>`)+u(`kids-prefs`,`👧 Kids & Routines`,`Daily reset time for routines and chores`,`
      <div class="section-body">
        <div style="margin-bottom:6px;font-size:13px;font-weight:600">Routine reset time</div>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Completed tasks reset each day at this time. Default is midnight (12:00 am).</p>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          ${[0,4,5,6].map(e=>{let t=e===0?`Midnight`:e===4?`4 am`:e===5?`5 am`:`6 am`,n=(m.settings?.routineResetHour??0)===e;return`<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;font-weight:${n?`700`:`500`};color:${n?`var(--primary)`:`var(--text)`}">
              <input type="radio" name="reset-hour" value="${e}" ${n?`checked`:``} style="accent-color:var(--primary)"
                onchange="state.settings.routineResetHour=${e};_markSettingsDirty();saveData(state);renderSettings()">
              ${t}
            </label>`}).join(``)}
        </div>
      </div>`)+u(`meals-prefs`,`Meal Preferences`,`Calorie tracking and meal display options`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(m.settings||{}).showCalories?`checked`:``}
            onchange="updateSetting('showCalories', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Show calorie estimates on meals</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">AI estimates calories for each meal. Shows per-meal calories and daily totals in the meal planner and lunchbox grids.</p>
          </div>
        </label>
      </div>`)+u(`typea`,`Type A Mode`,m.settings?.typeAMode?`Active — daily missions and life score`:`Off — turn on for guided organisation`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(m.settings||{}).typeAMode?`checked`:``}
            onchange="updateSetting('typeAMode', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Enable Type A Mode</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">Adds a Life Score, daily missions, and guided organisation to your Today screen. Toto takes the lead and tells you what to do next.</p>
          </div>
        </label>
        ${m.settings?.typeAMode?`
        <div style="margin-top:16px;padding:14px;background:var(--surface2);border-radius:10px">
          <div style="font-size:13px;font-weight:700;margin-bottom:8px">Current Life Score</div>
          <div style="font-size:28px;font-weight:900;color:#0891b2">${calcLifeScore().total}%</div>
          ${m.settings?.typeAStreak>0?`<div class="streak-badge" style="margin-top:8px">🔥 ${m.settings.typeAStreak} week streak</div>`:``}
        </div>`:``}
      </div>`)+u(`notif`,`Notification Style`,`Choose how Toto shows alerts on the Today screen`,`
      <div class="section-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px">
          ${[{val:`focus-timeline`,label:`Focus + Timeline`,desc:`One big card + chronological feed`},{val:`focus`,label:`Focus Card`,desc:`One urgent item at a time`},{val:`stack`,label:`Stack`,desc:`Card deck with count badge`},{val:`timeline`,label:`Timeline Only`,desc:`Chronological feed grouped by urgency`},{val:`banners`,label:`Banners`,desc:`Subtle alerts at the top`}].map(e=>`<label style="display:block;cursor:pointer;border:2px solid ${(m.settings?.notifStyle||`focus-timeline`)===e.val?`#0891b2`:`var(--border)`};border-radius:12px;padding:14px;background:${(m.settings?.notifStyle||`focus-timeline`)===e.val?`#ecfeff`:`var(--surface)`}">
            <input type="radio" name="notif-style" value="${e.val}" ${(m.settings?.notifStyle||`focus-timeline`)===e.val?`checked`:``} onchange="state.settings.notifStyle=this.value;_markSettingsDirty();renderSettings();renderToday()" style="display:none">
            <div style="font-size:13px;font-weight:700;margin-bottom:2px">${e.label}</div>
            <div style="font-size:11px;color:var(--text-muted)">${e.desc}</div>
          </label>`).join(``)}
        </div>
      </div>`)+u(`log`,`Activity Log`,`${a.length} recorded action${a.length===1?``:`s`} — synced across all devices`,`
      ${a.length===0?`<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No activity recorded yet. Changes you and your family make will appear here.</div>`:`<div style="max-height:400px;overflow-y:auto">
            ${a.slice(0,100).map(e=>`
              <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border)">
                ${s(e)}
                <div style="flex:1;min-width:0">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px">
                    <span style="font-weight:600;font-size:13px">${x(e.name)}</span>
                    <span style="display:inline-block;padding:2px 10px;border-radius:99px;font-size:11px;font-weight:600;color:#fff;background:${l(e.action)}">${x(e.action)}</span>
                    ${e.detail?`<span style="font-size:13px;color:var(--text)">${x(e.detail)}</span>`:``}
                  </div>
                  <div style="font-size:11px;color:var(--text-muted)">${o(e.ts)}</div>
                </div>
              </div>`).join(``)}
          </div>`}`,a.length>0?`<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();clearActivityLog()" style="color:var(--danger)">Clear log</button>`:``)+u(`data`,`Data &amp; Recovery`,i,`
      <div class="section-body">
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
          <button class="btn btn-secondary btn-sm" onclick="exportData()">Export JSON backup</button>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('import-file').click()">Import JSON backup</button>
          <input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)">
        </div>
        ${n?`<button class="btn btn-ghost btn-sm" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display?'':'none'">Show raw localStorage data</button>
          <pre style="display:none;margin-top:8px;background:var(--surface2);padding:12px;border-radius:8px;font-size:11px;overflow:auto;max-height:200px;white-space:pre-wrap;word-break:break-all">${n.replace(/</g,`&lt;`)}</pre>`:``}
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
          <div style="font-size:13px;font-weight:600;color:var(--danger);margin-bottom:4px">Danger zone</div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Permanently deletes all household data from this device and the cloud. Cannot be undone.</div>
          <button class="btn btn-sm" style="background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;font-weight:600" onclick="resetAllData()">Reset all data…</button>
        </div>
      </div>`)+(()=>{let e=m.householdProfile.members||[],t=m.householdProfile.invites||[],n=m.householdProfile.authorizedUsers||[],r=d,i=e.map((r,i)=>{let a=r.role===`adult`,o=a&&i===0,s=r.emoji||(a?`🧑`:`🧒`),c=o?`Owner`:a?`Adult`:`Child`,l=o?`#fef9c3`:a?`#e0f2fe`:`#f0fdf4`,u=o?`#854d0e`:a?`#0369a1`:`#16a34a`,d=``;if(a){let a=e.slice(0,i).filter(e=>e.role===`adult`).length,s=!!r.pinHash,c=`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;margin-top:8px;background:${s?`#f0fdf4`:`var(--surface2)`};border-radius:8px;border:1px solid ${s?`#bbf7d0`:`var(--border)`}">
            <span style="font-size:16px">🔢</span>
            <div style="flex:1">
              <div style="font-size:12px;font-weight:600;color:${s?`#16a34a`:`var(--text)`}">Shared device PIN · ${s?`Set ✓`:`Not set`}</div>
              <div style="font-size:11px;color:var(--text-muted)">${s?`Required when signing in on a shared device`:`Optional — protects your profile on shared devices`}</div>
            </div>
            <button onclick="event.stopPropagation();setAdultPin(${a})" style="padding:6px 10px;border:1px solid ${s?`#bbf7d0`:`var(--border)`};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${s?`Change`:`Set PIN`}</button>
            ${s?`<button onclick="event.stopPropagation();clearAdultPin(${a})" style="padding:6px 10px;border:1px solid #fecaca;border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:#b91c1c;cursor:pointer">Remove</button>`:``}
          </div>`;if(o)d=`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
              <span style="font-size:16px">✅</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:#16a34a">Google login · Owner</div>
                <div style="font-size:11px;color:#64748b">Full access · Set up this household</div>
              </div>
            </div>`+c;else{let e=n.find(e=>e.name&&r.name&&e.name.toLowerCase().includes(r.name.toLowerCase().split(` `)[0])),a=t.find(e=>e.memberName===r.name&&e.status===`pending`&&new Date(e.expiresAt)>new Date),o=t.find(e=>e.memberName===r.name&&e.status===`accepted`);d=e||o?`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
                <span style="font-size:16px">✅</span>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:#16a34a">Google login · Member</div>
                  <div style="font-size:11px;color:#64748b">${x((e||{}).email||`Joined via invite`)}</div>
                </div>
              </div>`+c:a?`<div style="padding:10px 12px;background:#fef9c3;border-radius:8px;border:1px solid #fde68a">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:16px">⏳</span>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:#854d0e">Invite pending</div>
                    <div style="font-size:11px;color:#78350f">Expires ${new Date(a.expiresAt).toLocaleDateString()}${a.email?` · `+x(a.email):``}</div>
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
                    <div style="font-size:11px;color:var(--text-muted)">Send an invite link so ${x(r.name||`this person`)} can join</div>
                  </div>
                </div>
                <button onclick="event.stopPropagation();inviteMember(${i})" class="btn btn-primary btn-sm" style="width:100%">Invite to join →</button>
              </div>`+c}}else{let e=(m.kids?.profiles||[]).find(e=>e.name&&r.name&&e.name.toLowerCase()===r.name.toLowerCase()),t=!!e?.pinHash,n=!!(r.name&&r.name.trim());d=e&&_isPinHardLocked&&_isPinHardLocked(e.id)?`<div style="padding:10px 12px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca">
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
                <div style="font-size:11px;color:var(--text-muted)">${t?`PIN is active — tap to change it`:`Set a PIN so `+x(r.name)+` can log in`}</div>
              </div>
              <button onclick="event.stopPropagation();openPinSetup(${e.id})" style="padding:6px 10px;border:1px solid ${t?`#bbf7d0`:`var(--border)`};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${t?`Change`:`Set PIN`}</button>
            </div>`:`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:var(--text)">PIN login · Not set up</div>
                <div style="font-size:11px;color:var(--text-muted)">Save changes first, then set a PIN for ${x(r.name)}</div>
              </div>
              <button onclick="event.stopPropagation();_ensureKidProfileAndPin('${S(r.name)}')" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">Set PIN</button>
            </div>`:`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="font-size:12px;color:var(--text-muted)">Enter a name above to enable PIN login</div>
            </div>`}return`
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)">
          <div style="display:flex;align-items:center;gap:12px;padding:14px 16px">
            <div style="width:42px;height:42px;border-radius:50%;background:${a?`linear-gradient(135deg,#ecfeff,#ccfbf1)`:`linear-gradient(135deg,#fef9c3,#fde68a)`};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${s}</div>
            <div style="flex:1;min-width:0">
              <input type="text" maxlength="50" class="form-input" style="font-weight:600;font-size:14px;width:100%;color:var(--text);padding:4px 8px;border-radius:6px"
                placeholder="Enter name…"
                value="${S(r.name||``)}"
                onchange="updateMember(${i},'name',this.value)">
              <div style="display:flex;align-items:center;gap:6px;margin-top:6px">
                <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:2px 7px;border-radius:99px;background:${l};color:${u};flex-shrink:0">${c}</span>
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
          <div style="padding:0 16px 14px">${d}</div>
        </div>`}).join(``),a=`
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <span style="font-weight:600;font-size:13px">Pets</span>
          <div style="display:flex;gap:6px">
            <button class="btn btn-ghost btn-sm" onclick="addPet('dog')">+ Dog</button>
            <button class="btn btn-ghost btn-sm" onclick="addPet('cat')">+ Cat</button>
            <button class="btn btn-ghost btn-sm" onclick="addPet('other')">+ Other</button>
          </div>
        </div>
        ${(m.householdProfile.pets||[]).length===0?`<p style="color:var(--text-muted);font-size:13px">No pets added.</p>`:``}
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
          ${(m.householdProfile.pets||[]).map((e,t)=>`<div style="display:flex;align-items:center;gap:12px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 14px">
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
            value="${m.householdProfile.cars||0}" onchange="updateCars(parseInt(this.value)||0)">
          <span style="color:var(--text-muted);font-size:13px">vehicle(s) registered to this household</span>
        </div>`;return u(`household`,`🏠 Household`,`People, pets, and access for everyone in your home`,`
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
        </div>`)})()+u(`cats`,`Expense &amp; Income Categories`,`Manage categories available in dropdowns`,`
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
      </div>`)+u(`groups`,`Expense Category Groups`,`Group categories for the grouped budget view`,`
      <div class="section-body">
        ${(m.categoryGroups||[]).map(e=>`
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
        ${(m.categoryGroups||[]).length===0?`<p style="color:var(--text-muted);font-size:13px">No groups yet.</p>`:``}
      </div>`,`<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openAddCategoryGroup()">+ Group</button>`)+u(`colours`,`Colours`,`Customise category and section colour accents`,`
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
      </div>`);h+=u(`setup-checklist`,`✅ Setup Checklist`,`The setup progress card shown on your dashboard`,`<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Show on dashboard</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${m.setupProgressDismissed?`Currently hidden`:`Currently visible`}</div>
        </div>
        <button onclick="event.stopPropagation();state.setupProgressDismissed=${!m.setupProgressDismissed};saveData(state);_refreshSetupProgress();renderSettings()" class="btn btn-secondary btn-sm">
          ${m.setupProgressDismissed?`Show again`:`Hide`}
        </button>
      </div>
    </div>`);let g=getDeviceProfile(),_=m.kids?.profiles||[],v=g?g===`adult`?`Adult — opens straight to the full app`:g===`shared`?`Shared — shows profile picker on open`:(_.find(e=>e.id===g)?.name||`Unknown`)+` — kid device`:`Not configured`;h+=u(`this-device`,`📱 This Device`,`Assigned to: ${v}`,`<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Assigned to</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${x(v)}</div>
        </div>
        <button onclick="event.stopPropagation();showDeviceSetup()" class="btn btn-secondary btn-sm">Change</button>
      </div>
    </div>`),h+=`<div style="margin-top:24px;padding:16px;border:2px dashed #f59e0b;border-radius:12px;background:#fffbeb">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#92400e;margin-bottom:12px">⚠️ Dev Tools — Remove before release</div>
    <button onclick="showProfileSelector()" class="btn btn-secondary" style="width:100%">🔄 Open profile switcher (shared device)</button>
  </div>`,h+=`<div class="settings-save-bar" id="settings-save-bar" style="display:${_settingsDirty?`flex`:`none`}">
    <div class="unsaved-dot"></div>
    <div class="unsaved-text">Unsaved changes</div>
    <button class="btn" onclick="cancelSettingsChanges()">Cancel</button>
    <button class="btn btn-primary" id="settings-save-btn" onclick="saveSettingsChanges()">Save</button>
  </div>`,document.getElementById(`settings-content`).innerHTML=h}function qi(){if(confirm(`This will permanently delete ALL household data — budget, kids, goals, everything — from this device and the cloud.

This cannot be undone. Are you sure?`)&&confirm(`Last chance. All data will be gone. Continue?`)){if(_currentUser&&fbStore){let e=_getHouseholdDocRef();e&&e.delete().catch(()=>{})}localStorage.removeItem(STORAGE_KEY),_secureClear(HOUSEHOLD_OWNER_KEY),_fsUnsubscribe&&(_fsUnsubscribe(),_fsUnsubscribe=null),fbAuth.signOut().then(()=>{window.location.reload()})}}function Ji(){let e=new Blob([JSON.stringify(m,null,2)],{type:`application/json`}),t=document.createElement(`a`);t.href=URL.createObjectURL(e),t.download=`home-budget-backup-${new Date().toISOString().slice(0,10)}.json`,t.click(),URL.revokeObjectURL(t.href)}function Yi(e){let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target.result);if(!t.budget){alert(`Invalid backup file — missing budget data.`);return}if(!confirm(`This will replace ALL current data with the backup. Continue?`))return;localStorage.setItem(STORAGE_KEY,JSON.stringify(t)),location.reload()}catch(e){alert(`Failed to read backup file: `+e.message)}},n.readAsText(t)}function Xi(e){let t=document.getElementById(`grp-body-${e}`),n=document.getElementById(`grp-arrow-${e}`);if(!t)return;let r=t.style.display!==`none`;t.style.display=r?`none`:`block`,n&&(n.textContent=r?`▼`:`▲`)}function Zi(e){budgetViewMode=e,renderBudget()}function Qi(){let e=m.buildContract,t=e.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0);e.total-t;let n=e.stages.filter(e=>e.paid).length,r=e.stages.length,i=e.variations||[],a=i.filter(e=>e.status===`approved`).reduce((e,t)=>e+(t.amount||0),0),o=i.filter(e=>e.status===`pending`).reduce((e,t)=>e+(t.amount||0),0),s=e.total+a,c=`
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
          <div style="font-size:18px;font-weight:700">${w(e.total)}</div>
        </div>
        ${a===0?``:`
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Approved Variations</div>
          <div style="font-size:18px;font-weight:700;color:${a>0?`var(--danger)`:`var(--success)`}">${a>0?`+`:``}${w(a)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Revised Total</div>
          <div style="font-size:18px;font-weight:700;color:var(--primary)">${w(s)}</div>
        </div>`}
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Paid to Date</div>
          <div style="font-size:18px;font-weight:700;color:var(--success)">${w(t)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Remaining</div>
          <div style="font-size:18px;font-weight:700;color:var(--danger)">${w(s-t)}</div>
        </div>
        ${o>0?`
        <div style="background:#fffbeb;padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#92400e;margin-bottom:4px">Pending Variations</div>
          <div style="font-size:18px;font-weight:700;color:#d97706">+${w(o)}</div>
        </div>`:``}
      </div>

      <!-- Visual stage timeline -->
      <div style="padding:16px 20px;border-bottom:1px solid var(--border)">
        <div style="display:flex;gap:0;position:relative">
          ${e.stages.map((t,n)=>{let r=(t.amount/e.total*100).toFixed(0),i=!t.paid&&e.stages.slice(0,n).every(e=>e.paid),a=t.paid?`#dcfce7`:i?`#dbeafe`:`var(--surface2)`,o=t.paid?`#16a34a`:i?`var(--primary)`:`var(--border)`,s=t.paid?`#15803d`:i?`var(--primary)`:`var(--text-muted)`,c=t.paid?`✓`:i?`→`:`${n+1}`,l=t.paid&&t.paidDate?D(t.paidDate):t.expectedDate?`Exp. `+D(t.expectedDate):``,u=!t.paid&&t.expectedDate&&isOverdue(t.expectedDate);return`
            <div style="flex:1;min-width:0;border:1px solid ${u?`var(--danger)`:o};border-radius:8px;padding:10px 10px 8px;margin-right:${n<e.stages.length-1?`6px`:`0`};background:${u?`#fef2f2`:a};cursor:pointer;position:relative" onclick="openEditStage(${t.id})" title="Edit ${S(t.name)}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
                <span style="font-size:11px;font-weight:700;color:${u?`var(--danger)`:s};width:20px;height:20px;border-radius:50%;background:${t.paid?`#16a34a`:i?`var(--primary)`:`#94a3b8`};color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">${c}</span>
                <span style="font-size:11px;color:${u?`var(--danger)`:`var(--text-muted)`};font-weight:600">${r}%</span>
              </div>
              <div style="font-size:12px;font-weight:600;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px">${x(t.name)}</div>
              <div style="font-size:12px;font-weight:700;color:${t.paid?`#15803d`:`var(--text)`}">${w(t.amount)}</div>
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
                <td style="font-weight:500">${x(t.name)}</td>
                <td class="amount">${w(t.amount)}</td>
                <td style="color:var(--text-muted)">${n}%</td>
                <td>${i}</td>
                <td>${fundingBadge(t.funding||`loan`)}</td>
                <td>${t.expectedDate?D(t.expectedDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                <td>${D(t.paidDate)}</td>
                <td style="color:var(--text-muted)">${x(t.invoiceRef||`—`)}</td>
                <td class="actions">
                  ${attachBtn(`stage-${t.id}`,S(t.name))}
                  <button class="btn btn-ghost btn-sm" onclick="openEditStage(${t.id})">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="deleteStage(${t.id})">🗑</button>
                </td>
              </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `,l={pending:`<span class="badge" style="background:#fef9c3;color:#854d0e;border:1px solid #fde047">Pending</span>`,approved:`<span class="badge paid">Approved</span>`,rejected:`<span class="badge" style="background:#fee2e2;color:#991b1b">Rejected</span>`};c+=`
    <div class="section" style="border-left:4px solid #8b5cf6">
      <div class="section-header">
        <div>
          <div class="section-title">Contract Variations</div>
          <div class="section-subtitle">
            ${i.length===0?`No variations yet`:`${i.filter(e=>e.status===`approved`).length} approved · ${i.filter(e=>e.status===`pending`).length} pending · ${a>=0?`+`:``}${w(a)} net impact`}
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddVariation()">+ Variation</button>
      </div>
      ${i.length===0?`<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No variations raised yet. Builder-initiated or owner-requested changes to the contract will appear here.</div>`:`<div class="table-wrap">
            <table>
              <thead><tr><th>Ref</th><th>Description</th><th>Amount</th><th>Status</th><th>Funding</th><th>Raised</th><th>Approved</th><th>Notes</th><th></th></tr></thead>
              <tbody>
                ${i.map(e=>`<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${x(e.ref||`—`)}</td>
                  <td style="font-weight:500">${x(e.name)}</td>
                  <td class="amount" style="color:${(e.amount||0)<0?`var(--success)`:`var(--danger)`};font-weight:600">${e.amount>0?`+`:``}${w(e.amount)}</td>
                  <td>${l[e.status]||l.pending}</td>
                  <td>${fundingBadge(e.funding||`loan`)}</td>
                  <td>${D(e.dateRaised)}</td>
                  <td>${D(e.dateApproved)}</td>
                  <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x(e.notes||`—`)}</td>
                  <td class="actions">
                    <button class="btn btn-ghost btn-sm" onclick="openEditVariation(${e.id})">✏️</button>
                    <button class="btn btn-danger-ghost btn-sm" onclick="deleteVariation(${e.id})">🗑</button>
                  </td>
                </tr>`).join(``)}
              </tbody>
              <tfoot>
                <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                  <td colspan="2" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Net approved variations</td>
                  <td class="amount" style="padding:11px 16px;font-weight:700;color:${a>=0?`var(--danger)`:`var(--success)`}">${a>0?`+`:``}${w(a)}</td>
                  <td colspan="6" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">Revised contract: <strong>${w(s)}</strong>${o>0?` · <span style="color:#d97706">+${w(o)} pending</span>`:``}</td>
                </tr>
              </tfoot>
            </table>
          </div>`}
    </div>
  `;let u=m.extras,d=u.reduce((e,t)=>e+(t.totalAmount||0),0),f=u.reduce((e,t)=>e+(t.amountPaid||0),0);c+=`
    <div class="section" style="border-left:4px solid ${colors.build.extras}">
      <div class="section-header">
        <div>
          <div class="section-title">Outside Contract</div>
          <div class="section-subtitle">Landscaping, solar, and other extras</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          ${d>0?`<span class="contract-total-badge">${w(f)} / ${w(d)}</span>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddExtra()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Vendor</th><th>Total Cost</th><th>Paid</th><th>Remaining</th><th>Due Date</th><th>Status</th><th>Funding</th><th></th></tr></thead>
          <tbody>
            ${u.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>No items yet. Add landscaping, solar, or other extras.</div></td></tr>`:u.map(e=>{let t=(e.totalAmount||0)-(e.amountPaid||0),n={"not-quoted":`<span class="badge unpaid">Not Quoted</span>`,quoted:`<span class="badge pending">Quoted</span>`,approved:`<span class="badge" style="background:#ede9fe;color:#5b21b6">Approved</span>`,partial:`<span class="badge partial">Partially Paid</span>`,paid:`<span class="badge paid">Paid</span>`},r=e.dueDate&&isOverdue(e.dueDate)&&e.status!==`paid`,i=n[e.status||`not-quoted`]+(r?` <span class="badge overdue">Overdue</span>`:``);return`<tr>
                <td style="font-weight:500">${x(e.name)}</td>
                <td>${e.vendor?x(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                <td class="amount">${e.totalAmount?w(e.totalAmount):`<span class="amount muted">TBC</span>`}</td>
                <td class="amount">${w(e.amountPaid)}</td>
                <td class="amount ${t>0?``:`muted`}">${t>0?w(t):`—`}</td>
                <td>${D(e.dueDate)}</td>
                <td>${i}</td>
                <td>${fundingBadge(e.funding||`loan`)}</td>
                <td class="actions">
                  ${attachBtn(`extra-${e.id}`,S(e.name))}
                  <button class="btn btn-ghost btn-sm" onclick="openEditExtra(${e.id})">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="deleteExtra(${e.id})">🗑</button>
                </td>
              </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `;let p=m.furniture,h=p.reduce((e,t)=>e+(t.price||0),0),g=p.filter(e=>e.status===`delivered`||e.status===`ordered`),_=p.filter(e=>e.status===`to-purchase`),v=g.reduce((e,t)=>e+(t.price||0),0),y=_.reduce((e,t)=>e+(t.price||0),0);c+=`
    <div class="section" style="border-left:4px solid ${colors.build.furniture}">
      <div class="section-header">
        <div>
          <div class="section-title">Furniture</div>
          <div class="section-subtitle">${p.length} items · ${w(v)} purchased · ${w(y)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${p.length>0?`
          <div style="display:flex;gap:6px">
            <span class="badge paid">${p.filter(e=>e.status===`delivered`).length} delivered</span>
            <span class="badge partial">${p.filter(e=>e.status===`ordered`).length} ordered</span>
            <span class="badge unpaid">${_.length} to buy</span>
          </div>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddFurniture()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${p.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">🛋️</div>No furniture items yet. Add sofas, beds, appliances and more.</div></td></tr>`:p.map(e=>{let t={"to-purchase":`<span class="badge unpaid">To Purchase</span>`,ordered:`<span class="badge partial">Ordered</span>`,delivered:`<span class="badge paid">Delivered</span>`},n=e.deliveryDate&&e.status!==`delivered`&&isOverdue(e.deliveryDate);return`<tr>
                    <td style="font-weight:500">${x(e.name)}</td>
                    <td style="color:var(--text-muted)">${x(e.room||`—`)}</td>
                    <td>${e.vendor?x(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td class="amount">${e.price?w(e.price):`<span class="amount muted">TBC</span>`}</td>
                    <td>${t[e.status]||t[`to-purchase`]}</td>
                    <td>${fundingBadge(e.funding||`own-funds`)}</td>
                    <td>${e.deliveryDate?n?`<span class="badge overdue">${D(e.deliveryDate)}</span>`:D(e.deliveryDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x(e.notes||`—`)}</td>
                    <td class="actions">
                      ${attachBtn(`furniture-${e.id}`,S(e.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditFurniture(${e.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteFurniture(${e.id})">🗑</button>
                    </td>
                  </tr>`}).join(``)}
          </tbody>
          ${p.length>0?`
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${w(h)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${w(v)} purchased · ${w(y)} still to buy
              </td>
            </tr>
          </tfoot>`:``}
        </table>
      </div>
    </div>
  `;let b=m.appliances,C=b.reduce((e,t)=>e+(t.price||0),0),ee=b.filter(e=>e.status===`delivered`||e.status===`ordered`),T=b.filter(e=>e.status===`to-purchase`),E=ee.reduce((e,t)=>e+(t.price||0),0),te=T.reduce((e,t)=>e+(t.price||0),0);c+=`
    <div class="section" style="border-left:4px solid ${colors.build.appliances}">
      <div class="section-header">
        <div>
          <div class="section-title">Appliances</div>
          <div class="section-subtitle">${b.length} items · ${w(E)} purchased · ${w(te)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${b.length>0?`
          <div style="display:flex;gap:6px">
            <span class="badge paid">${b.filter(e=>e.status===`delivered`).length} delivered</span>
            <span class="badge partial">${b.filter(e=>e.status===`ordered`).length} ordered</span>
            <span class="badge unpaid">${T.length} to buy</span>
          </div>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddAppliance()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${b.length===0?`<tr><td colspan="9"><div class="empty"><div class="empty-icon">🍳</div>No appliances yet. Add fridges, dishwashers, ovens and more.</div></td></tr>`:b.map(e=>{let t={"to-purchase":`<span class="badge unpaid">To Purchase</span>`,ordered:`<span class="badge partial">Ordered</span>`,delivered:`<span class="badge paid">Delivered</span>`},n=e.deliveryDate&&e.status!==`delivered`&&isOverdue(e.deliveryDate);return`<tr>
                    <td style="font-weight:500">${x(e.name)}</td>
                    <td style="color:var(--text-muted)">${x(e.room||`—`)}</td>
                    <td>${e.vendor?x(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td class="amount">${e.price?w(e.price):`<span class="amount muted">TBC</span>`}</td>
                    <td>${t[e.status]||t[`to-purchase`]}</td>
                    <td>${fundingBadge(e.funding||`own-funds`)}</td>
                    <td>${e.deliveryDate?n?`<span class="badge overdue">${D(e.deliveryDate)}</span>`:D(e.deliveryDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x(e.notes||`—`)}</td>
                    <td class="actions">
                      ${attachBtn(`appliance-${e.id}`,S(e.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditAppliance(${e.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteAppliance(${e.id})">🗑</button>
                    </td>
                  </tr>`}).join(``)}
          </tbody>
          ${b.length>0?`
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${w(C)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${w(E)} purchased · ${w(te)} still to buy
              </td>
            </tr>
          </tfoot>`:``}
        </table>
      </div>
    </div>
  `,document.getElementById(`build-content`).innerHTML=c}function $i(){return m.expenseCategories||DEFAULT_DATA.expenseCategories}function ea(){return m.incomeCategories||DEFAULT_DATA.incomeCategories}function ta(e){if(e.type===`spending`){let t=Object.keys(m.budget.actuals).sort().reverse(),n=null;for(let r of t){let t=(getMonthData(r).expenses||[]).filter(t=>(t.category||`Other`)===e.category).reduce((e,t)=>e+(m.budget.actuals[r]?.[t.id]||0),0);if(t>0){n=t;break}}let r=e.targetMonthly||0;if(n===null)return{pct:null,label:`No actuals yet`,actual:null,target:r};let i=r>0?Math.max(0,Math.min(100,n/r*100)):0,a=n<=r;return{pct:i,label:`${w(n)} actual vs ${w(r)} limit`,actual:n,target:r,ok:a}}if(e.type===`savings`){let t=e.currentSaved||0,n=e.targetTotal||1;return{pct:Math.min(100,t/n*100),label:`${w(t)} of ${w(n)} saved`,ok:t>=n}}if(e.type===`income`){let t=monthlyTotal(getMonthData(selectedBudgetMonth).income),n=e.targetMonthly||1;return{pct:Math.min(100,t/n*100),label:`${w(t)}/mo of ${w(n)}/mo target`,ok:t>=n}}return{pct:0,label:``,ok:!1}}function na(){let e=m.goals,t=e.filter(e=>e.status===`active`),n=e.filter(e=>e.status===`achieved`),r=``;e.length>0&&(r+=`
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
  </div>`,i.length===0){let e=getMonthData(selectedBudgetMonth),t=j(e.income)-j(e.expenses),n=t>0?`<div style="font-size:14px;color:#64748b;margin-bottom:4px">You have <strong style="color:#16a34a">${w(t)}</strong> surplus each month.</div>
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
              <div class="goal-card-title">${t.icon} ${x(e.name)}</div>
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
          ${e.notes?`<div style="font-size:12px;color:var(--text-muted);margin-top:8px">${x(e.notes)}</div>`:``}
        </div>`});document.getElementById(`goals-content`).innerHTML=r}function ra(e={}){let t=e.type||`spending`;return`
    <div class="form-group">
      <label class="form-label">Goal Name</label>
      <input class="form-input" id="f-goal-name" type="text" maxlength="200" value="${S(e.name||``)}" placeholder="e.g. Cut dining out">
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
      <input class="form-input" id="f-goal-notes" type="text" maxlength="200" value="${S(e.notes||``)}" placeholder="Optional notes">
    </div>
  `}function ia(){let e=document.getElementById(`f-goal-type`).value;document.getElementById(`goal-spending-fields`).style.display=e===`spending`?``:`none`,document.getElementById(`goal-savings-fields`).style.display=e===`savings`?``:`none`,document.getElementById(`goal-income-fields`).style.display=e===`income`?``:`none`}function aa(e){let t=document.getElementById(`f-goal-type`).value,n={id:e,name:document.getElementById(`f-goal-name`).value.trim(),type:t,status:document.getElementById(`f-goal-status`).value,deadline:document.getElementById(`f-goal-deadline`).value||null,notes:document.getElementById(`f-goal-notes`).value.trim()};return t===`spending`&&(n.category=document.getElementById(`f-goal-category`).value,n.targetMonthly=parseFloat(document.getElementById(`f-goal-target-monthly`).value)||0),t===`savings`&&(n.targetTotal=parseFloat(document.getElementById(`f-goal-target-total`).value)||0,n.currentSaved=parseFloat(document.getElementById(`f-goal-current-saved`).value)||0),t===`income`&&(n.targetMonthly=parseFloat(document.getElementById(`f-goal-target-monthly-inc`).value)||0),n}function oa(){openModal(`New Goal`,ra(),()=>{let e=aa(M(m.goals));e.name&&(m.goals.push(e),saveData(m),closeModal(),na())})}function sa(e){let t=m.goals.find(t=>t.id===e);openModal(`Edit Goal`,ra(t),()=>{Object.assign(t,aa(e)),saveData(m),closeModal(),na()})}function ca(e){confirm(`Delete this goal?`)&&(m.goals=m.goals.filter(t=>t.id!==e),saveData(m),na())}function la(e){let t=m.goals.find(t=>t.id===e);t&&(t.status=`achieved`,saveData(m),na())}var ua=null,da=[{value:`add-income`,label:`Add income source`,icon:`💰`},{value:`remove-income`,label:`Remove income source`,icon:`➖`},{value:`reduce-income`,label:`Reduce income amount`,icon:`📉`},{value:`add-expense`,label:`Add new expense`,icon:`➕`},{value:`remove-expense`,label:`Remove expense`,icon:`✂️`},{value:`reduce-expense`,label:`Reduce expense amount`,icon:`📉`}];function fa(e){let t=getMonthData(selectedBudgetMonth),n=JSON.parse(JSON.stringify(t.income)),r=JSON.parse(JSON.stringify(t.expenses));return(e.adjustments||[]).forEach(e=>{if(e.type===`add-income`)n.push({id:-(e.id||0),name:e.name,amount:e.amount||0,frequency:e.frequency||`monthly`});else if(e.type===`remove-income`)n=n.filter(t=>t.id!==e.itemId);else if(e.type===`reduce-income`){let t=n.find(t=>t.id===e.itemId);t&&(t.amount=e.changeType===`percent`?Math.max(0,t.amount*(1-e.changeAmount/100)):Math.max(0,t.amount-(e.changeAmount||0)))}else if(e.type===`add-expense`)r.push({id:-(e.id||0),name:e.name,amount:e.amount||0,frequency:e.frequency||`monthly`,category:e.category||`Other`});else if(e.type===`remove-expense`)r=r.filter(t=>t.id!==e.itemId);else if(e.type===`reduce-expense`){let t=r.find(t=>t.id===e.itemId);t&&(t.amount=e.changeType===`percent`?Math.max(0,t.amount*(1-e.changeAmount/100)):Math.max(0,t.amount-(e.changeAmount||0)))}}),{income:n,expenses:r,totalIncome:j(n),totalExpenses:j(r),surplus:j(n)-j(r)}}function pa(){let e=m.scenarios,t=getMonthData(selectedBudgetMonth),n=j(t.income),r=j(t.expenses),i=n-r,a=`<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary" onclick="openAddScenario()">+ New Scenario</button>
  </div>`;e.length===0?a+=`<div class="empty"><div class="empty-icon">🔬</div>No scenarios yet. Create one to model income changes, expense cuts, or lifestyle adjustments.</div>`:e.forEach(e=>{let t=fa(e),o=t.totalIncome-n,s=t.totalExpenses-r,c=t.surplus-i,l=ua===e.id;a+=`
        <div class="scenario-card">
          <div class="scenario-card-header" onclick="toggleScenario(${e.id})">
            <div style="flex:1">
              <div style="font-weight:600;font-size:14px">${x(e.name)}</div>
              ${e.description?`<div style="font-size:12px;color:var(--text-muted);margin-top:2px">${x(e.description)}</div>`:``}
            </div>
            <div style="display:flex;align-items:center;gap:12px;flex-shrink:0">
              <div style="text-align:right">
                <div style="font-size:11px;color:var(--text-muted)">Surplus impact</div>
                <div style="font-size:14px;font-weight:700;color:${c>=0?`var(--success)`:`var(--danger)`}">${c>=0?`+`:``}${w(c)}/mo</div>
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
              ${(e.adjustments||[]).length===0?`<div style="font-size:13px;color:var(--text-muted);padding:8px 0">No adjustments yet. Add income or expense changes.</div>`:(e.adjustments||[]).map(t=>{let n=da.find(e=>e.value===t.type)||da[0],r=``;return t.type===`add-income`||t.type===`add-expense`?r=`${x(t.name)} · ${w(t.amount||0)}/${t.frequency||`mo`}${t.category?` · `+t.category:``}`:t.type===`remove-income`||t.type===`remove-expense`?r=x(t.itemName||`—`):(t.type===`reduce-income`||t.type===`reduce-expense`)&&(r=`${x(t.itemName)} · reduce by ${t.changeType===`percent`?t.changeAmount+`%`:w(t.changeAmount||0)}`),`<div class="adj-item">
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
                <div class="compare-row"><span>Monthly Income</span><span class="amount" style="color:var(--success)">${w(n)}</span></div>
                <div class="compare-row"><span>Monthly Expenses</span><span class="amount" style="color:var(--danger)">${w(r)}</span></div>
                <div class="compare-row"><span>Monthly Surplus</span><span class="amount" style="color:${i>=0?`var(--success)`:`var(--danger)`}">${w(i)}</span></div>
                <div class="compare-row"><span style="color:var(--text-muted);font-size:12px">Annual surplus</span><span style="color:var(--text-muted);font-size:12px">${w(i*12)}</span></div>
              </div>
              <div class="compare-col" style="border:2px solid var(--primary)">
                <div class="compare-col-title" style="color:var(--primary)">Scenario: ${x(e.name)}</div>
                <div class="compare-row">
                  <span>Monthly Income</span>
                  <span class="amount" style="color:var(--success)">${w(t.totalIncome)} ${o===0?``:`<small style="color:${o>0?`var(--success)`:`var(--danger)`}">(${o>0?`+`:``}${w(o)})</small>`}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Expenses</span>
                  <span class="amount" style="color:var(--danger)">${w(t.totalExpenses)} ${s===0?``:`<small style="color:${s<0?`var(--success)`:`var(--danger)`}">(${s>0?`+`:``}${w(s)})</small>`}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Surplus</span>
                  <span class="amount" style="color:${t.surplus>=0?`var(--success)`:`var(--danger)`};font-weight:700">${w(t.surplus)}</span>
                </div>
                <div class="compare-row">
                  <span style="font-size:12px">Annual surplus</span>
                  <span style="font-size:12px;font-weight:600;color:${t.surplus>=0?`var(--success)`:`var(--danger)`}">${w(t.surplus*12)} ${c===0?``:`<small>(${c>0?`+`:``}${w(c*12)}/yr)</small>`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>`}),document.getElementById(`scenarios-content`).innerHTML=a}function ma(e){ua=ua===e?null:e,pa()}function ha(e={}){return`
    <div class="form-group">
      <label class="form-label">Scenario Name</label>
      <input class="form-input" id="f-sc-name" type="text" maxlength="200" value="${S(e.name||``)}" placeholder="e.g. Pick up second job">
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input class="form-input" id="f-sc-desc" type="text" maxlength="200" value="${S(e.description||``)}" placeholder="Brief description of what you're testing">
    </div>
  `}function ga(e,t={}){return{id:e,name:document.getElementById(`f-sc-name`).value.trim(),description:document.getElementById(`f-sc-desc`).value.trim(),adjustments:t.adjustments||[]}}function _a(){openModal(`New Scenario`,ha(),()=>{let e=ga(M(m.scenarios));e.name&&(m.scenarios.push(e),saveData(m),closeModal(),pa())})}function va(e){let t=m.scenarios.find(t=>t.id===e);openModal(`Edit Scenario`,ha(t),()=>{let n=ga(e,t);Object.assign(t,n),saveData(m),closeModal(),pa()})}function ya(e){confirm(`Delete this scenario?`)&&(m.scenarios=m.scenarios.filter(t=>t.id!==e),ua===e&&(ua=null),saveData(m),pa())}function ba(e){let t=getMonthData(selectedBudgetMonth),n=t.income.map(e=>`<option value="${e.id}">${x(e.name)} (${w(A(e))}/mo)</option>`).join(``),r=t.expenses.map(e=>`<option value="${e.id}">${x(e.name)} (${w(A(e))}/mo)</option>`).join(``);return`
    <div class="form-group">
      <label class="form-label">Adjustment Type</label>
      <select class="form-select" id="f-adj-type" onchange="toggleAdjFields()">
        ${da.map(e=>`<option value="${e.value}">${e.icon} ${e.label}</option>`).join(``)}
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
  `}function xa(){let e=document.getElementById(`f-adj-type`).value;document.getElementById(`adj-add-income`).style.display=e===`add-income`||e===`add-expense`?``:`none`,document.getElementById(`adj-add-income-extra`).style.display=e===`add-income`||e===`add-expense`?``:`none`,document.getElementById(`adj-cat-wrap`).style.display=e===`add-expense`?``:`none`,document.getElementById(`adj-remove-income`).style.display=e===`remove-income`?``:`none`,document.getElementById(`adj-reduce-income`).style.display=e===`reduce-income`?``:`none`,document.getElementById(`adj-remove-expense`).style.display=e===`remove-expense`?``:`none`,document.getElementById(`adj-reduce-expense`).style.display=e===`reduce-expense`?``:`none`}function Sa(e){let t=m.scenarios.find(t=>t.id===e);t&&openModal(`Add Adjustment`,ba(t),()=>{let e=document.getElementById(`f-adj-type`).value,n=getMonthData(selectedBudgetMonth),r={id:M(t.adjustments||[]),type:e};if(e===`add-income`){if(r.name=document.getElementById(`f-adj-name`).value.trim(),r.amount=parseFloat(document.getElementById(`f-adj-amount`).value)||0,r.frequency=document.getElementById(`f-adj-freq`).value,!r.name)return}else if(e===`add-expense`){if(r.name=document.getElementById(`f-adj-name`).value.trim(),r.amount=parseFloat(document.getElementById(`f-adj-amount`).value)||0,r.frequency=document.getElementById(`f-adj-freq`).value,r.category=document.getElementById(`f-adj-cat`).value,!r.name)return}else if(e===`remove-income`){let e=document.getElementById(`f-adj-inc-sel`);r.itemId=parseInt(e.value),r.itemName=e.options[e.selectedIndex]?.text||``}else if(e===`reduce-income`){let e=document.getElementById(`f-adj-inc-reduce-sel`);r.itemId=parseInt(e.value),r.itemName=n.income.find(e=>e.id===r.itemId)?.name||``,r.changeAmount=parseFloat(document.getElementById(`f-adj-change-amount`).value)||0,r.changeType=document.getElementById(`f-adj-change-type-inc`).value}else if(e===`remove-expense`){let e=document.getElementById(`f-adj-exp-sel`);r.itemId=parseInt(e.value),r.itemName=e.options[e.selectedIndex]?.text||``}else if(e===`reduce-expense`){let e=document.getElementById(`f-adj-exp-reduce-sel`);r.itemId=parseInt(e.value),r.itemName=n.expenses.find(e=>e.id===r.itemId)?.name||``,r.changeAmount=parseFloat(document.getElementById(`f-adj-change-amount-exp`).value)||0,r.changeType=document.getElementById(`f-adj-change-type-exp`).value}t.adjustments||(t.adjustments=[]),t.adjustments.push(r),saveData(m),closeModal(),pa()})}function Ca(e,t){let n=m.scenarios.find(t=>t.id===e);n&&(n.adjustments=(n.adjustments||[]).filter(e=>e.id!==t),saveData(m),pa())}var wa=`home_finance_colors_v1`,Ta={expense:{"Mortgage / Rent":`#6366f1`,Insurance:`#8b5cf6`,Utilities:`#06b6d4`,Groceries:`#10b981`,Transport:`#f59e0b`,"Childcare / Education":`#3b82f6`,Health:`#ef4444`,Entertainment:`#f97316`,Subscriptions:`#84cc16`,"Dining Out":`#14b8a6`,Clothing:`#ec4899`,"Personal Care":`#a855f7`,"Savings / Investment":`#22c55e`,Other:`#94a3b8`},income:`#10b981`,build:{contract:`#3b82f6`,extras:`#f59e0b`,furniture:`#8b5cf6`,appliances:`#ef4444`}};function Ea(){try{let e=localStorage.getItem(wa);if(!e)return JSON.parse(JSON.stringify(Ta));let t=JSON.parse(e);return t.expense||(t.expense={}),t.build||(t.build={}),t.income||(t.income=Ta.income),expenseCategories().forEach(e=>{t.expense[e]||(t.expense[e]=Ta.expense[e]||`#94a3b8`)}),Object.keys(Ta.build).forEach(e=>{t.build[e]||(t.build[e]=Ta.build[e])}),t}catch{return JSON.parse(JSON.stringify(Ta))}}function Da(e){localStorage.setItem(wa,JSON.stringify(e))}var Oa=Ea();function ka(e,t,n){e===`expense`?Oa.expense[t]=n:e===`income`?Oa.income=n:e===`build`&&(Oa.build[t]=n),Da(Oa),renderBudget(),renderBuild(),renderDashboard()}function Aa(){return(m.householdProfile.members||[]).filter(e=>e.role===`adult`).length||1}function ja(){return(m.householdProfile.members||[]).filter(e=>e.role===`child`).length}function Ma(e){m.householdProfile.members.push({role:e||`adult`,age:null}),ho(),renderSettings()}function Na(e){let t=m.householdProfile.members[e];if(!t)return;let n=t.name||(t.role===`child`?`this child`:`this adult`);if(confirm(`Remove ${n} from the household?\n\nThis cannot be undone.`)){if(t.role===`child`&&t.name){let e=(m.kids?.profiles||[]).find(e=>e.name===t.name);e&&(m.kids.profiles=m.kids.profiles.filter(t=>t.id!==e.id),m.kids.chores=m.kids.chores.filter(t=>t.assignedTo!==e.id),m.kids.completions=m.kids.completions.filter(t=>t.kidId!==e.id),m.kids.redemptions=m.kids.redemptions.filter(t=>t.kidId!==e.id),m.meals?.lunchbox?.profiles&&(m.meals.lunchbox.profiles=m.meals.lunchbox.profiles.filter(t=>t.id!==e.id)),String(getDeviceProfile())===String(e.id)&&setDeviceProfile(`adult`))}m.householdProfile.members.splice(e,1),saveData(m),renderAll()}}function Pa(e,t,n){let r=m.householdProfile.members[e];r&&(r[t]=n,ho(),(t===`role`||t===`name`)&&renderSettings())}function Fa(e){m.householdProfile.pets.push({type:e||`dog`,name:``}),ho(),renderSettings()}function Ia(e){m.householdProfile.pets.splice(e,1),ho(),renderSettings()}function La(e,t,n){let r=m.householdProfile.pets[e];r&&(r[t]=n,ho())}function Ra(e){m.householdProfile.cars=e,ho()}function za(e,t,n){let r=t+n;return[{category:`Mortgage / Rent`,min:e*.2,max:e*.3,label:`20–30% of income`,source:`ABS / MoneySmart`,needs:!0},{category:`Groceries`,min:380+(t-1)*260+n*160,max:560+(t-1)*360+n*220,label:`$${Math.round(380+(t-1)*260+n*160)}–$${Math.round(560+(t-1)*360+n*220)}/month for ${r} ${r===1?`person`:`people`}`,source:`ABS HES 2022`,needs:!0},{category:`Transport`,min:e*.08,max:e*.15,label:`8–15% of income`,source:`ABS HES 2022`,needs:!0},{category:`Utilities`,min:180+t*25+n*15,max:360+t*40+n*25,label:`$${Math.round(180+t*25+n*15)}–$${Math.round(360+t*40+n*25)}/month`,source:`AER / ABS`,needs:!0},{category:`Insurance`,min:180+t*40+n*20,max:420+t*60+n*30,label:`$${Math.round(180+t*40+n*20)}–$${Math.round(420+t*60+n*30)}/month`,source:`APRA industry avg`,needs:!0},{category:`Health`,min:60*t+30*n,max:180*t+60*n,label:`$${60*t+30*n}–$${180*t+60*n}/month`,source:`AIHW / ABS`,needs:!0},...n>0?[{category:`Childcare / Education`,min:700*n,max:2200*n,label:`$700–$2,200/month per child (before subsidies)`,source:`ACCC Childcare Report`,needs:!0}]:[],{category:`Dining Out`,min:e*.02,max:e*.05,label:`2–5% of income`,source:`MoneySmart`,needs:!1},{category:`Entertainment`,min:e*.02,max:e*.05,label:`2–5% of income`,source:`MoneySmart`,needs:!1},{category:`Subscriptions`,min:30,max:120,label:`$30–$120/month`,source:`Industry average`,needs:!1},{category:`Clothing`,min:50*t+30*n,max:150*t+80*n,label:`$${50*t+30*n}–$${150*t+80*n}/month`,source:`ABS HES 2022`,needs:!1},{category:`Savings / Investment`,min:e*.1,max:e*.2,label:`10–20% of income (aim for 20%)`,source:`50/30/20 rule`,needs:!1}]}function Ba(e,t,n){return e<t*.9?`under`:e>n*1.1?`over`:`within`}var Va=`home_finance_ai_key`;function Ha(){return localStorage.getItem(`home_finance_ai_key`)||``}function Ua(e){localStorage.setItem(Va,e)}function Wa(){let e=getLast6Months(),t={};return e.forEach(e=>{let n=getMonthData(e),r={},i={};n.expenses.forEach(t=>{let n=t.category||`Other`;r[n]=(r[n]||0)+A(t);let a=getActual(t.id,e);a>0&&(i[n]=(i[n]||0)+a)}),new Set([...Object.keys(r),...Object.keys(i)]).forEach(n=>{t[n]||(t[n]=[]),t[n].push({mo:e,budget:r[n]||0,actual:i[n]||0,hasActual:(i[n]||0)>0})})}),t}function Ga(e){let t=[];return Object.entries(e).forEach(([e,n])=>{let r=n.filter(e=>e.hasActual);if(r.length<2)return;let i=r.filter(e=>e.budget>0&&e.actual>e.budget*1.05).length,a=r.filter(e=>e.budget>0&&e.actual<e.budget*.92).length,o=r.reduce((e,t)=>e+(t.actual-t.budget),0)/r.length,s=n.slice(-3).filter(e=>e.hasActual),c=n.slice(0,3).filter(e=>e.hasActual),l=s.length?s.reduce((e,t)=>e+t.actual,0)/s.length:0,u=c.length?c.reduce((e,t)=>e+t.actual,0)/c.length:0,d=u>50?(l-u)/u:0;i>=3&&o>20?t.push({cat:e,level:`warning`,icon:`⚠️`,title:`Consistently over on ${e}`,body:`Over budget ${i}/${r.length} months, avg +${w(Math.abs(o))}/mo. Consider raising the budget or cutting back.`,months:r}):a>=4&&n[n.length-1]?.budget>0?t.push({cat:e,level:`good`,icon:`✅`,title:`Consistently under on ${e}`,body:`Under budget ${a}/${r.length} months, avg ${w(Math.abs(o))}/mo less. You may be able to reallocate this budget elsewhere.`,months:r}):d>.25&&l>50?t.push({cat:e,level:`warning`,icon:`📈`,title:`${e} trending up`,body:`Spending up ${Math.round(d*100)}% over recent months — now averaging ${w(l)}/mo. Worth keeping an eye on.`,months:r}):d<-.25&&u>50&&t.push({cat:e,level:`good`,icon:`📉`,title:`${e} trending down`,body:`Down ${Math.round(Math.abs(d)*100)}% recently — now ${w(l)}/mo. Nice improvement.`,months:r})}),t.sort((e,t)=>[`warning`,`alert`,`good`,`info`].indexOf(e.level)-[`warning`,`alert`,`good`,`info`].indexOf(t.level)).slice(0,6)}function Ka(){let e=getMonthData(selectedBudgetMonth);if(e.expenses.length===0)return``;let t={};e.expenses.forEach(e=>{let n=e.category||`Other`;t[n]||(t[n]={budget:0,actual:0}),t[n].budget+=A(e),t[n].actual+=getActual(e.id,selectedBudgetMonth)});let n=Object.entries(t).filter(([,e])=>e.budget>0||e.actual>0).sort((e,t)=>Math.max(t[1].budget,t[1].actual)-Math.max(e[1].budget,e[1].actual));if(!n.length)return``;let r=Math.max(...n.flatMap(([,e])=>[e.budget,e.actual]),1),i=n.map(([e,t])=>{let n=t.actual>0,i=(t.budget/r*100).toFixed(1),a=(t.actual/r*100).toFixed(1),o=t.actual-t.budget,s=n?o>5?`over`:o<-5?`under`:``:``,c=n?o>5?`<span class="spi-over">+${w(o)}</span>`:o<-5?`<span class="spi-under">${w(o)}</span>`:`<span class="spi-on">on track</span>`:`<span class="spi-no-actual">no actuals</span>`;return`<div class="spi-cat-row">
      <div class="spi-cat-label">${e}</div>
      <div class="spi-cat-bars">
        <div class="spi-bar-wrap"><div class="spi-bar-budget" style="width:${i}%"></div>${n?`<div class="spi-bar-actual ${s}" style="width:${a}%"></div>`:``}</div>
      </div>
      <div class="spi-cat-amounts"><span>${w(t.budget)}</span>${c}</div>
    </div>`}).join(``);return`<div class="spi-breakdown">
    <div class="spi-breakdown-header">
      <span style="font-size:13px;font-weight:700">Budget vs Actual — ${monthLabel(selectedBudgetMonth)}</span>
      <div style="display:flex;gap:14px;font-size:11px;color:var(--text-muted)">
        <span><span class="spi-legend spi-legend-budget"></span>Budget</span>
        <span><span class="spi-legend spi-legend-actual"></span>Actual</span>
      </div>
    </div>
    ${i}
  </div>`}function qa(){let e=Ga(Wa()),t=Ka(),n={warning:{bg:`#fffbeb`,border:`#fcd34d`,title:`#92400e`},good:{bg:`#ecfeff`,border:`#86efac`,title:`#166534`},alert:{bg:`#fef2f2`,border:`#fca5a5`,title:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,title:`#475569`}};return`<div class="spi-section">
    <div class="spi-section-title">📊 Spending Patterns — Last 6 Months</div>
    ${t}
    ${e.length===0?`<div class="spi-empty-state">Add actuals in Monthly Budget over a few months to unlock pattern detection.</div>`:`<div class="spi-patterns-grid">${e.map(e=>{let t=n[e.level]||n.info,r=Math.max(...(e.months||[]).map(e=>e.actual),1),i=(e.months||[]).map(e=>`<div class="spi-spark-bar" style="height:${Math.max(Math.round(e.actual/r*20),e.hasActual?2:0)}px;background:${e.hasActual?e.actual>e.budget*1.05?`#ef4444`:e.actual<e.budget*.95?`#10b981`:`#2563eb`:`#e2e8f0`}"></div>`).join(``);return`<div class="spi-pattern-card" style="background:${t.bg};border:1.5px solid ${t.border}">
          <div class="spi-pattern-icon">${e.icon}</div>
          <div>
            <div class="spi-pattern-title" style="color:${t.title}">${x(e.title)}</div>
            <div class="spi-pattern-body">${x(e.body)}</div>
            <div class="spi-sparkline">${i}</div>
          </div>
        </div>`}).join(``)}</div>`}
  </div>`}function Ja(){let e=getMonthData(selectedBudgetMonth),t=j(e.income),n=j(e.expenses),r=t-n,i=t>0?r/t*100:0,a={};e.expenses.forEach(e=>{let t=e.category||`Other`;a[t]=(a[t]||0)+A(e)});let o=Object.entries(a).sort((e,t)=>t[1]-e[1]),s=getLast6Months(),c=s.reduce((e,t)=>e+j(getMonthData(t).expenses),0)/6;s.reduce((e,t)=>e+j(getMonthData(t).income),0)/6;let l=[];if(i>=20?l.push({level:`good`,icon:`🌟`,title:`Excellent savings rate`,body:`You're saving ${Math.round(i)}% of income — above the recommended 20%. Keep it up and consider putting the surplus toward your goals.`}):i>=10?l.push({level:`ok`,icon:`📈`,title:`Decent savings rate`,body:`You're saving ${Math.round(i)}% of income. Pushing to 20% would mean an extra ${w(t*.2-r)}/month going toward your future.`}):i>0?l.push({level:`warning`,icon:`⚠️`,title:`Low savings rate`,body:`Only ${Math.round(i)}% of income is being saved (${w(r)}/month). Look for the biggest discretionary expense you can reduce.`}):t>0&&l.push({level:`alert`,icon:`🚨`,title:`Spending exceeds income`,body:`You're spending ${w(Math.abs(r))} more than you earn each month. This requires urgent attention — identify what can be cut immediately.`}),c>0){let e=n-c,t=Math.round(Math.abs(e)/c*100);e>c*.1?l.push({level:`warning`,icon:`📊`,title:`Expenses above your average`,body:`This month's expenses are ${t}% above your 6-month average (${w(c)}). The extra ${w(e)} could be a one-off — worth reviewing.`}):e<-c*.08&&c>0&&l.push({level:`good`,icon:`📊`,title:`Expenses below your average`,body:`Nice — this month you spent ${t}% less than your 6-month average. That's ${w(Math.abs(e))} extra in your pocket.`})}if(o.length>0){let[e,t]=o[0],r=n>0?Math.round(t/n*100):0;r>45&&e!==`Mortgage / Rent`&&l.push({level:`warning`,icon:`💸`,title:`${e} is dominating your budget`,body:`${e} makes up ${r}% of your total expenses (${w(t)}/month). Reducing this by 20% would save ${w(t*.2)}/month.`})}let u=a[`Dining Out`]||0;u>0&&n>0&&u/n>.08&&l.push({level:`ok`,icon:`🍽️`,title:`Dining out is notable`,body:`You're spending ${w(u)}/month dining out. Cooking at home 2–3 more times a week could save ${w(u*.35)}/month.`}),e.income.length===1&&t>0&&l.push({level:`info`,icon:`💡`,title:`Single income source`,body:`You rely on one income stream. Even a small side income (freelance, rental, etc.) would significantly improve your financial resilience.`});let d=m.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),f=m.buildContract.total-d;if(f>0&&r>0){let e=Math.round(f/r);l.push({level:`info`,icon:`🏗️`,title:`Build payments still ahead`,body:`You have ${w(f)} left in contract payments. At your current savings rate that represents ${e} month${e===1?``:`s`} of surplus — plan accordingly.`})}let p=(m.goals||[]).filter(e=>!e.achieved);return p.length>0&&r>0&&l.push({level:`good`,icon:`🎯`,title:`${p.length} active goal${p.length>1?`s`:``}`,body:`Your ${w(r)}/month surplus can work toward your goals. Review the Goals page to see progress and adjust contributions.`}),e.expenses.length===0&&l.push({level:`info`,icon:`📝`,title:`Add your expenses`,body:`Head to Monthly Budget and add your regular expenses to unlock personalised insights.`}),l}var Ya=`https://home-finance-proxy.fuscocl.workers.dev`;async function Xa(){let e=document.getElementById(`ai-run-btn`);e.disabled=!0,e.textContent=`Analysing…`;let t=getMonthData(selectedBudgetMonth),n=j(t.income),r=j(t.expenses),i=n-r,a=n>0?Math.round(i/n*100):0,o={};t.expenses.forEach(e=>{o[e.category||`Other`]=(o[e.category||`Other`]||0)+A(e)});let s=getLast6Months().map(e=>{let t=getMonthData(e);return{month:e,income:j(t.income),expenses:j(t.expenses)}}),c=za(n,Aa(),ja()).filter(e=>o[e.category]!==void 0).map(e=>({category:e.category,yourSpend:Math.round(o[e.category]||0),benchmarkMin:Math.round(e.min),benchmarkMax:Math.round(e.max),benchmarkLabel:e.label,status:Ba(o[e.category]||0,e.min,e.max)})),l={month:monthLabel(selectedBudgetMonth),household:(function(){let e=m.householdProfile||{},t=e.members||[],n=t.filter(e=>e.role===`adult`),r=t.filter(e=>e.role===`child`);return{adults:n.length||2,children:r.length,totalPeople:t.length||2,memberAges:t.map(e=>({role:e.role,age:e.age})),pets:(e.pets||[]).map(e=>e.type),cars:e.cars||0}})(),monthlyIncome:n,monthlyExpenses:r,surplus:i,savingsRatePct:a,expensesByCategory:o,benchmarkComparisons:c,incomeStreams:t.income.map(e=>({name:e.name,monthlyAmount:A(e)})),last6MonthsTrend:s,activeGoals:(m.goals||[]).filter(e=>!e.achieved).map(e=>({name:e.name,type:e.type})),buildRemaining:m.buildContract.total-m.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),currency:`AUD`},u=`You are a friendly but direct personal finance advisor for an Australian family. Analyse their budget data and benchmark comparisons, then give 4-6 concise, specific, actionable insights.

Budget data for ${l.month}:
${JSON.stringify(l,null,2)}

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

Reply with ONLY the JSON array, no other text.`;try{let e=await fetch(Ya,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:1024,messages:[{role:`user`,content:u}]})});if(!e.ok){let t=await e.json().catch(()=>({}));throw Error(t.error?.message||`API error ${e.status}`)}let t=(await e.json()).content[0].text.trim();t=t.replace(/^```[a-z]*\n?/i,``).replace(/\n?```$/,``).trim(),Za(JSON.parse(t),!0)}catch(e){let t=e.message;(t.includes(`Failed to fetch`)||t.includes(`NetworkError`)||t.includes(`CORS`))&&(t=`CORS blocked — the browser can't call the Anthropic API directly. We need a small proxy (Cloudflare Worker). Ask me to set it up — it takes 5 minutes and is free.`),document.getElementById(`ai-output`).innerHTML=`
      <div style="padding:16px 20px;background:var(--danger-light);border-radius:8px;color:var(--danger);font-size:13px">
        <strong>Error:</strong> ${t}
      </div>`}finally{e.disabled=!1,e.textContent=`✨ Generate AI Insights`}}function Za(e,t){let n={good:{bg:`#ecfeff`,border:`#86efac`,icon_bg:`#dcfce7`,text:`#166534`},ok:{bg:`#eff6ff`,border:`#93c5fd`,icon_bg:`#dbeafe`,text:`#1e40af`},warning:{bg:`#fffbeb`,border:`#fcd34d`,icon_bg:`#fef3c7`,text:`#92400e`},alert:{bg:`#fef2f2`,border:`#fca5a5`,icon_bg:`#fee2e2`,text:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,icon_bg:`#f1f5f9`,text:`#475569`}},r=e.map(e=>{let t=n[e.level]||n.info;return`
      <div style="background:${t.bg};border:1.5px solid ${t.border};border-radius:12px;padding:16px 18px;display:flex;gap:14px;align-items:flex-start">
        <div style="width:38px;height:38px;border-radius:10px;background:${t.icon_bg};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${e.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:14px;color:${t.text};margin-bottom:4px">${x(e.title)}</div>
          <div style="font-size:13px;color:var(--text);line-height:1.5">${x(e.body)}</div>
          ${e.action?`<div style="margin-top:8px;font-size:12px;font-weight:600;color:${t.text}">→ ${x(e.action)}</div>`:``}
        </div>
      </div>`}).join(``);document.getElementById(`ai-output`).innerHTML=`
    <div style="display:flex;flex-direction:column;gap:12px">
      ${t?`<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-muted);margin-bottom:4px"><span>✨</span> Generated by Claude AI · ${monthLabel(selectedBudgetMonth)}</div>`:``}
      ${r}
    </div>`}function Qa(e,t,n,r){let i=za(e,t,n);t+n;let a=[`Mortgage / Rent`,`Insurance`,`Utilities`,`Groceries`,`Transport`,`Health`,`Childcare / Education`],o=[`Dining Out`,`Entertainment`,`Subscriptions`,`Clothing`,`Personal Care`],s=[`Savings / Investment`],c=Object.entries(r).filter(([e])=>a.includes(e)).reduce((e,[,t])=>e+t,0),l=Object.entries(r).filter(([e])=>o.includes(e)).reduce((e,[,t])=>e+t,0),u=Object.entries(r).filter(([e])=>s.includes(e)).reduce((e,[,t])=>e+t,0),d=e>0?Math.round(c/e*100):0,f=e>0?Math.round(l/e*100):0,p=e>0?Math.round(u/e*100):0;function m(e,t,n,r){let i=Math.min(t,100),a=t>n;return`
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
      </div>`}let h=i.filter(e=>r[e.category]!==void 0||e.category===`Savings / Investment`).map(e=>{let t=r[e.category]||0,n=Ba(t,e.min,e.max),i=n===`under`?`#3b82f6`:n===`within`?`#10b981`:`#ef4444`,a=n===`under`?`Below avg`:n===`within`?`On track`:`Above avg`,o=e.max>0?Math.min(t/(e.max*1.5)*100,100):0,s=e.max>0?Math.min(e.max/(e.max*1.5)*100,100):0;return`
      <tr>
        <td style="border-left:3px solid ${Oa.expense[e.category]||`#94a3b8`};font-weight:500">${e.category}</td>
        <td class="amount" style="font-weight:600">${t>0?w(t):`<span style="color:var(--text-muted)">—</span>`}</td>
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
                <div style="font-size:11px;color:var(--text-muted)">${w(e.amt)}</div>
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
    </div>`}function $a(){Ha();let e=Ja(),t=getMonthData(selectedBudgetMonth),n=j(t.income),r=j(t.expenses),i=n-r,a=n>0?Math.round(i/n*100):0,o=Aa(),s=ja(),c={};t.expenses.forEach(e=>{let t=e.category||`Other`;c[t]=(c[t]||0)+A(e)});let l=0;a>=20?l+=40:a>=10?l+=28:a>0&&(l+=14),t.income.length>1&&(l+=10),(m.goals||[]).some(e=>!e.achieved)&&(l+=15),m.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0)>0&&(l+=10),r>0&&r<n&&(l+=25);let u=l>=70?`#10b981`:l>=45?`#f59e0b`:`#ef4444`,d=l>=70?`Great shape`:l>=45?`On track`:`Needs attention`;document.getElementById(`insights-content`).innerHTML=`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap">
      <button class="btn btn-sm" onclick="prevInsightsMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${monthLabel(selectedBudgetMonth)}</span>
      <button class="btn btn-sm" onclick="nextInsightsMonth()" style="font-size:16px;padding:2px 10px">›</button>
    </div>

    <div class="cards" style="margin-bottom:24px">
      <div class="card" style="border-top:3px solid ${u}">
        <div class="card-label">Financial Health</div>
        <div class="card-value" style="color:${u}">${l}/100</div>
        <div class="card-sub">${d}</div>
      </div>
      <div class="card">
        <div class="card-label">Savings Rate</div>
        <div class="card-value ${a>=20?`green`:a>=10?`orange`:`red`}">${a}%</div>
        <div class="card-sub">${w(Math.max(i,0))}/month saved</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Surplus</div>
        <div class="card-value ${i>=0?`green`:`red`}">${w(Math.abs(i))}</div>
        <div class="card-sub">${i>=0?`available`:`overspending`}</div>
      </div>
      <div class="card">
        <div class="card-label">Income / Expenses</div>
        <div class="card-value">${w(n)}</div>
        <div class="card-sub">vs ${w(r)} out</div>
      </div>
    </div>

    ${Qa(n,o,s,c)}

    ${qa()}

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;margin-top:4px">

      <!-- Smart insights -->
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">💡 Budget Health</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${eo(e)}
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
  `}function eo(e){let t={good:{bg:`#ecfeff`,border:`#86efac`,text:`#166534`},ok:{bg:`#eff6ff`,border:`#93c5fd`,text:`#1e40af`},warning:{bg:`#fffbeb`,border:`#fcd34d`,text:`#92400e`},alert:{bg:`#fef2f2`,border:`#fca5a5`,text:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,text:`#475569`}};return e.map(e=>{let n=t[e.level]||t.info;return`
      <div style="background:${n.bg};border:1.5px solid ${n.border};border-radius:10px;padding:14px 16px;display:flex;gap:12px;align-items:flex-start">
        <span style="font-size:20px;flex-shrink:0;line-height:1.3">${e.icon}</span>
        <div>
          <div style="font-weight:700;font-size:13px;color:${n.text};margin-bottom:3px">${x(e.title)}</div>
          <div style="font-size:12px;color:var(--text);line-height:1.5">${x(e.body)}</div>
        </div>
      </div>`}).join(``)}function to(){let[e,t]=selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t-2,1);selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,safeRender($a),safeRender(renderMoneyDashboard),safeRender(renderBudget)}function no(){let[e,t]=selectedBudgetMonth.split(`-`).map(Number),n=new Date(e,t,1);selectedBudgetMonth=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,safeRender($a),safeRender(renderMoneyDashboard),safeRender(renderBudget)}var ro=`🏠.🏡.🏗️.🔑.💡.🔌.🚿.🛋️.🛏️.🪴.🍽️.🍕.🍔.🛒.🥗.🍷.☕.🍰.🥩.🧃.🚗.🚙.🚌.✈️.⛽.🚕.🏎️.🚲.🛵.🚂.👨‍👩‍👧.👶.📚.🏫.💊.🏥.💅.💆.🧴.👕.🎮.🎬.🎵.🏋️.📺.🎲.🏄.🎯.🎨.🎭.💰.💳.🏦.📈.💸.🪙.💎.📊.🏆.💼.📦.🛍️.🎁.🔧.🛠️.📱.💻.🧹.🧺.🖨️.🐕.🐈.🐠.🌱.☀️.❄️.🎄.🎂.⚽.🧸`.split(`.`);function io(e,t){let n=document.createElement(`div`);n.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9999;display:flex;align-items:center;justify-content:center`,n.innerHTML=`
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;width:340px;max-width:95vw;box-shadow:0 8px 32px rgba(0,0,0,0.35)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <span style="font-weight:700;font-size:15px">Choose Icon</span>
        <button id="emoji-picker-close" style="background:none;border:none;cursor:pointer;font-size:20px;color:var(--text-muted);line-height:1">&times;</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:4px;max-height:220px;overflow-y:auto">
        ${ro.map(t=>`
          <button data-emoji="${t}" style="font-size:20px;width:100%;aspect-ratio:1;border:2px solid ${t===e?`var(--primary)`:`transparent`};border-radius:6px;cursor:pointer;background:${t===e?`var(--primary)22`:`transparent`};transition:background .1s" title="${t}">${t}</button>
        `).join(``)}
      </div>
    </div>
  `,document.body.appendChild(n),n.querySelector(`#emoji-picker-close`).onclick=()=>document.body.removeChild(n),n.querySelectorAll(`[data-emoji]`).forEach(e=>{e.onclick=()=>{t(e.dataset.emoji),document.body.removeChild(n)}}),n.addEventListener(`click`,e=>{e.target===n&&document.body.removeChild(n)})}function ao(){openModal(`Add Category Group`,`
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
  `,()=>{let e=document.getElementById(`f-grp-icon`).value||`📦`,t=document.getElementById(`f-grp-name`).value.trim();if(!t)return;let n=M(m.categoryGroups);m.categoryGroups.push({id:n,name:t,icon:e,categories:[]}),logActivity(`Added category group`,t),saveData(m),closeModal(),renderSettings()}),document.getElementById(`f-grp-icon-btn`).addEventListener(`click`,()=>{let e=document.getElementById(`f-grp-icon`).value;io(e,e=>{document.getElementById(`f-grp-icon`).value=e,document.getElementById(`f-grp-icon-btn`).textContent=e})})}function oo(e){let t=m.categoryGroups.find(t=>t.id===e);t&&io(t.icon,t=>{co(e,`icon`,t);let n=document.getElementById(`grp-icon-btn-${e}`);n&&(n.textContent=t)})}function so(e){let t=m.categoryGroups.find(t=>t.id===e);confirm(`Delete group "${t?t.name:``}"? Categories will become unassigned.`)&&(m.categoryGroups=m.categoryGroups.filter(t=>t.id!==e),logActivity(`Deleted category group`,t?t.name:``),saveData(m),renderSettings())}function co(e,t,n){let r=m.categoryGroups.find(t=>t.id===e);r&&(r[t]=n,saveData(m))}function lo(e,t){if(!t)return;expenseCategories().includes(t)||(m.expenseCategories||(m.expenseCategories=expenseCategories().slice()),m.expenseCategories.push(t)),m.categoryGroups.forEach(e=>{e.categories=e.categories.filter(e=>e!==t)});let n=m.categoryGroups.find(t=>t.id===e);n&&n.categories.push(t),saveData(m),renderSettings()}function uo(e){let t=expenseCategories(),n=new Set((m.categoryGroups||[]).filter(t=>t.id!==e).flatMap(e=>e.categories)),r=m.categoryGroups.find(t=>t.id===e),i=new Set(r?r.categories:[]),a=t.filter(e=>!i.has(e)&&!n.has(e));openModal(`Add Category to Group`,`
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
  `,()=>{let t=document.getElementById(`f-cat-selected`).value,n=document.getElementById(`f-cat-new`).value.trim()||t;n&&(lo(e,n),closeModal())})}function fo(e,t){let n=m.categoryGroups.find(t=>t.id===e);n&&(n.categories=n.categories.filter(e=>e!==t),saveData(m),renderSettings())}var po=!1,mo=null;function ho(){po||(mo=JSON.parse(JSON.stringify(m))),po=!0;let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`flex`)}function go(){po=!1,mo=null,saveData(m);let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`none`);let t=document.getElementById(`settings-save-btn`);if(t){let e=t.textContent;t.textContent=`Saved`,t.style.background=`#10b981`,setTimeout(()=>{t.textContent=e,t.style.background=``},1500)}renderAll()}function _o(){mo&&Object.assign(m,mo),po=!1,mo=null;let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`none`),renderSettings()}function vo(e){po&&(confirm(`You have unsaved changes in Settings. Save before leaving?`)?go():_o())}function yo(e,t){m.settings||(m.settings={}),m.settings[e]=t,ho()}function bo(){let e=document.getElementById(`settings-api-key`)?.value.trim();if(!e)return;localStorage.setItem(`toto_ai_key`,e),localStorage.setItem(`toto_ai_key_meta`,JSON.stringify({addedAt:new Date().toISOString(),prefix:e.slice(0,10),suffix:e.slice(-4)}));let t=document.getElementById(`api-key-status`);t&&(t.textContent=`✓ Key saved!`,t.style.color=`var(--success)`,setTimeout(()=>{t.textContent=``,t.style.color=``},2e3));let n=document.getElementById(`api-key-summary`);n&&(n.outerHTML=So())}function xo(){confirm(`Remove saved API key? Toto and cost estimation will stop working.`)&&(localStorage.removeItem(`toto_ai_key`),localStorage.removeItem(`toto_ai_key_meta`),renderSettings())}function So(){let e=localStorage.getItem(`toto_ai_key`);if(!e)return`<div id="api-key-summary"></div>`;let t=JSON.parse(localStorage.getItem(`toto_ai_key_meta`)||`{}`),n=t.addedAt?new Date(t.addedAt).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`}):`Unknown date`;return`
    <div id="api-key-summary" style="margin-top:14px;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;display:flex;align-items:center;gap:14px;max-width:480px">
      <div style="font-size:24px">🔑</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px">Active Key</div>
        <div style="font-size:13px;font-family:monospace;color:var(--text);word-break:break-all">${t.prefix?`${t.prefix}${`•`.repeat(20)}${t.suffix}`:`${e.slice(0,10)}${`•`.repeat(20)}${e.slice(-4)}`}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Added ${n} · Powers Toto chat, event cost estimation &amp; CSV import</div>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="removeApiKey()" style="color:var(--danger);flex-shrink:0">Remove</button>
    </div>`}function Co(e){let t=document.getElementById(`sacc-body-${e}`),n=document.getElementById(`sacc-chev-${e}`);if(!t)return;let r=t.style.display!==`none`;t.style.display=r?`none`:`block`,n&&(n.textContent=r?`▼`:`▲`),r?_settingsOpen.delete(e):_settingsOpen.add(e)}function wo(){confirm(`Clear the entire activity log? This cannot be undone.`)&&(m.activityLog=[],saveData(m),renderSettings())}function To(e){let t=document.getElementById(`new-cat-${e}`),n=(t.value||``).trim();if(!n){t.focus();return}let r=e===`expense`?m.expenseCategories:m.incomeCategories;if(r.includes(n)){alert(`That category already exists.`);return}r.push(n),logActivity(`Added ${e} category`,n),ho(),t.value=``,renderSettings()}function Eo(e,t){let n=e===`expense`?m.expenseCategories:m.incomeCategories;if(e===`expense`&&(m.budget.expenses.some(e=>e.category===t)||Object.values(m.budget.months||{}).some(e=>(e.expenses||[]).some(e=>e.category===t)))&&!confirm(`"${t}" is used by existing expenses. Remove anyway?`))return;let r=n.indexOf(t);r!==-1&&n.splice(r,1),logActivity(`Removed ${e} category`,t),ho(),renderSettings()}function Do(e){let t=m.categoryGroups||DEFAULT_DATA.categoryGroups;m.budget.actuals[selectedBudgetMonth];let n=(m.colors||{}).expense||{},r=new Set(t.flatMap(e=>e.categories)),i=[...new Set(e.map(e=>e.category||`Other`))].filter(e=>!r.has(e)),a=i.length>0?[...t,{id:`ug`,name:`Ungrouped`,icon:`📋`,categories:i}]:t,o=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:4px;align-items:start">`;for(let t of a){let r=e.filter(e=>t.categories.includes(e.category||`Other`));if(r.length===0)continue;let i=r.reduce((e,t)=>e+A(t),0),a=r.reduce((e,t)=>e+getActual(t.id,selectedBudgetMonth),0),s=i>0?Math.round(a/i*100):0,c=Math.min(100,s),l=s>=100?`var(--danger)`:s>=80?`var(--warning)`:`var(--success)`,u=a>0,d=a>i&&u,f=r[0]&&r[0].category||`Other`,p=n[f]||colors.expense[f]||`#94a3b8`;o+=`
    <div style="background:var(--surface);border:1px solid ${d?`var(--danger)`:`var(--border)`};border-radius:10px;overflow:hidden">
      <!-- Always-visible title bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 14px;cursor:pointer;user-select:none;background:${p}22;border-bottom:3px solid ${p}" onclick="toggleGroupExpand('${t.id}')">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:20px">${t.icon}</span>
          <span style="font-weight:700;font-size:14px">${x(t.name)}</span>
          <span style="font-size:11px;color:var(--text-muted)">${r.length} item${r.length===1?``:`s`}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-weight:700;font-size:14px">${w(i)}<span style="font-size:11px;font-weight:400;color:var(--text-muted)">/mo</span></span>
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
            ${u?`${w(a)} spent · ${s}%${d?` — over budget!`:``}`:`No actuals entered yet`}
          </span>
          <span style="color:var(--text-muted)">${w(i)} budgeted</span>
        </div>
      </div>
      <!-- Collapsible items only -->
      <div id="grp-body-${t.id}" style="border-top:1px solid var(--border)">
        <div style="max-height:248px;overflow-y:auto">
        ${r.map(e=>{let t=A(e),r=getActual(e.id,selectedBudgetMonth),i=t>0?Math.min(100,Math.round(r/t*100)):0,a=n[e.category||`Other`]||colors.expense[e.category||`Other`]||`#94a3b8`,o=r>t&&r>0,s=o?`var(--danger)`:i>=80?`var(--warning)`:r>0?a:`var(--border)`;return r>0?`${w(r)}${w(t)}${i}`:`${w(t)}`,`
          <div class="expense-row" style="--row-color:${a};display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border)">
            <div style="width:4px;height:36px;border-radius:2px;background:${a};flex-shrink:0"></div>
            <div style="flex:1;min-width:0;cursor:pointer" onclick="event.stopPropagation();openEditExpense(${e.id})">
              <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x(e.name)}</div>
              <div style="font-size:11px;color:var(--text-muted)">${e.category||`Other`}${e.vendor?` · ${x(e.vendor)}`:``} · ${k(e)}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-right:4px">
              <div style="font-size:13px;font-weight:600">${w(t)}/mo</div>
              ${r>0?`<div style="font-size:11px;font-weight:600;color:${o?`var(--danger)`:i>=80?`var(--warning)`:`var(--success)`}">${w(r)} actual${o?` ▲`:``}</div>`:`<div style="font-size:11px;color:var(--text-muted);cursor:pointer" onclick="event.stopPropagation();editActual(${e.id})">+ add actual</div>`}
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
    </div>`}return o+=`</div>`,o}function Oo(t){let n=(t.expenses||[]).filter(e=>!e.skipped);if(!n.length)return{segments:[],total:0};let r={};n.forEach(t=>{let n=t.category||`Other`,i=e(Number(t.amount)||0,t.frequency);i>0&&(r[n]=(r[n]||0)+i)});let i=Object.entries(r).map(([e,t])=>({name:e,amount:t})).sort((e,t)=>t.amount-e.amount),a=i.reduce((e,t)=>e+t.amount,0);if(a===0)return{segments:[],total:0};let o=i.slice(0,6),s=i.slice(6),c=[`#15803d`,`#16a34a`,`#22c55e`,`#65a30d`,`#84cc16`,`#a3e635`,`#94A3B8`],l=o.map((e,t)=>({name:e.name,amount:e.amount,pct:e.amount/a*100,color:c[t]||`#94A3B8`}));if(s.length){let e=s.reduce((e,t)=>e+t.amount,0);l.push({name:`Other`,amount:e,pct:e/a*100,color:c[6]})}return{segments:l,total:a}}var ko={groceries:`GROC`,grocery:`GROC`,food:`FOOD`,rent:`RENT`,mortgage:`MORT`,fuel:`FUEL`,petrol:`FUEL`,transport:`TRSP`,dining:`DINE`,restaurants:`DINE`,"eating out":`DINE`,takeaway:`DINE`,utilities:`UTIL`,bills:`BILL`,electricity:`ELEC`,gas:`GAS`,water:`WATR`,internet:`NET`,phone:`PHNE`,subscriptions:`SUBS`,streaming:`SUBS`,insurance:`INSR`,health:`HLTH`,medical:`HLTH`,savings:`SAVE`,entertainment:`ENT`,travel:`TRVL`,holiday:`TRVL`,school:`EDU`,education:`EDU`,kids:`KIDS`,childcare:`KIDS`,pets:`PETS`,vehicle:`AUTO`,car:`AUTO`,household:`HSE`,clothing:`CLTH`,gifts:`GIFT`,charity:`GIVE`,other:`OTHR`};function Ao(e){let t=(e||`other`).toLowerCase().trim();return ko[t]?ko[t]:(e||`OTHR`).replace(/[^A-Za-z]/g,``).toUpperCase().slice(0,4)||`OTHR`}function jo(e){let t=(e||``).toLowerCase();return t.includes(`groc`)||t.includes(`food`)||t.includes(`supermarket`)?`i-shopping-cart`:t.includes(`rent`)||t.includes(`mortgage`)||t.includes(`housing`)||t.includes(`home loan`)?`i-home`:t.includes(`petrol`)||t.includes(`fuel`)||t.includes(`transport`)||t.includes(`uber`)||t.includes(`parking`)||t.includes(`toll`)?`i-fuel`:t.includes(`dining`)||t.includes(`restaur`)||t.includes(`eat`)||t.includes(`takeaway`)?`i-utensils`:t.includes(`utilit`)||t.includes(`electric`)||t.includes(`gas`)||t.includes(`water`)||t.includes(`internet`)||t.includes(`phone`)||t.includes(`bill`)?`i-zap`:t.includes(`subscript`)||t.includes(`netflix`)||t.includes(`spotify`)||t.includes(`streaming`)?`i-receipt`:t.includes(`vehicle`)||t.includes(`car`)||t.includes(`rego`)||t.includes(`motor`)||t.includes(`auto`)?`i-car`:t.includes(`health`)||t.includes(`medic`)||t.includes(`pharm`)||t.includes(`doctor`)||t.includes(`dentist`)?`i-pill`:t.includes(`insur`)?`i-file-text`:t.includes(`school`)||t.includes(`education`)?`i-clipboard-check`:t.includes(`kid`)||t.includes(`child`)?`i-users`:t.includes(`pet`)?`i-paw`:t.includes(`saving`)||t.includes(`invest`)?`i-trophy`:t.includes(`travel`)||t.includes(`holiday`)?`i-palm-tree`:`i-receipt`}function Mo(){try{m.budget;let{income:e,expenses:t}=getMonthData(selectedBudgetMonth),n=j(e),r=j(t),i=n-r,a=t.reduce((e,t)=>e+getActual(t.id,selectedBudgetMonth),0),o=r-a,s=new Date(...selectedBudgetMonth.split(`-`).map((e,t)=>t===1?e:+e),0).getDate(),c=new Date().getDate();Math.round(c/s*100);let l=r>0?Math.round(a/r*100):0,u=prevMonthStr(selectedBudgetMonth),d=``;d+=`
    <div class="wallet-month-bar">
      <button class="wallet-month-btn" onclick="prevMonth()">&#8249;</button>
      <div class="wallet-month-label">${monthLabel(selectedBudgetMonth)}</div>
      <button class="wallet-month-btn" onclick="nextMonth()">&#8250;</button>
    </div>`,d+=`
    <div class="summary-hero" onclick="toggleBudgetDetail()">
      <div class="summary-hero-label">${i>=0?`Monthly surplus`:`Over budget`}</div>
      <div class="summary-hero-num">${w(Math.abs(i))}</div>
      <div class="summary-hero-sub">${w(n)} income · ${w(r)} expenses</div>
      <div class="summary-hero-expand" id="budget-expand-label">${No?`Hide details ▲`:`See breakdown ▼`}</div>
    </div>`,d+=`
    <div class="summary-mini-grid">
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:#10b981">${w(n)}</div>
        <div class="summary-mini-label">Income</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${w(r)}</div>
        <div class="summary-mini-label">Budgeted</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:${a>r?`#ef4444`:`#18181b`}">${w(a)}</div>
        <div class="summary-mini-label">Actual spent</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${l}%</div>
        <div class="summary-mini-label">of budget used</div>
      </div>
    </div>`;let f=Oo({income:e,expenses:t});if(f.segments.length){let e=f.segments.map(e=>`<div style="background:${e.color};flex:${e.pct.toFixed(2)}"></div>`).join(``);f.segments.map(e=>`<div class="alloc-row">
        <div class="tdot" style="background:${e.color}"><svg viewBox="0 0 24 24"><use href="#${jo(e.name)}"/></svg></div>
        <div class="body">
          <div class="ticker">${Ao(e.name)}</div>
          <div class="name">${x(e.name)}</div>
        </div>
        <div>
          <div class="pct">${Math.round(e.pct)}%</div>
          <div class="amt">${w(e.amount)}</div>
        </div>
      </div>`).join(``),d+=`<div class="alloc-section" style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:0" onclick="_allocExpanded=!_allocExpanded;renderBudget()">
        <div class="alloc-title" style="margin-bottom:0">Budget Allocation</div>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)">▼</span>
      </div>
      <div class="alloc-bar" style="margin-bottom:0">${e}</div>
      
      <div onclick="event.stopPropagation();_budgetDetailOpen=true;renderBudget();document.getElementById('budget-detail')?.scrollIntoView({behavior:'smooth',block:'start'})" style="margin-top:10px;text-align:center;font-size:12px;color:var(--iris-2);font-weight:500;cursor:pointer;font-family:var(--sans)">Manage income &amp; expenses in Detailed Breakdown ↓</div>
    </div>`}d+=`<div class="alloc-section" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:${No?`16px`:`0`}" onclick="toggleBudgetDetail()">
      <div class="alloc-title" style="margin-bottom:0">Detailed Breakdown</div>
      <div style="display:flex;align-items:center;gap:10px">
        <button onclick="event.stopPropagation();openCsvImport()" style="padding:5px 12px;border-radius:99px;background:var(--purple-soft);color:var(--purple);border:none;font-size:12px;font-weight:600;cursor:pointer">Import</button>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)" id="budget-expand-chevron">${No?`▲`:`▼`}</span>
      </div>
    </div>
    <div class="detail-panel ${No?`expanded`:`collapsed`}" id="budget-detail" style="margin:0 -4px">`,isMonthCustomized(selectedBudgetMonth)||(d+=`<div style="display:flex;align-items:center;justify-content:space-between;background:var(--primary-light);border:1px solid #bfdbfe;border-radius:8px;padding:10px 16px;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div>
        <span style="font-size:13px;font-weight:600;color:var(--primary)">Using default budget</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="copyMonthFromPrevious('${selectedBudgetMonth}')">
        Copy from ${monthLabel(u)}
      </button>
    </div>`),d+=renderBudgetForecast(selectedBudgetMonth,i),d+=renderBudgetSuggestions(selectedBudgetMonth),d+=`
    <div class="section" style="margin-bottom:20px">
      <div class="section-header">
        <div>
          <div class="section-title">Income</div>
          <div class="section-subtitle">${w(n)}/mo total</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddIncome()">+ Income</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Amount</th><th>Due</th><th>Repeats</th><th>Monthly</th><th></th></tr></thead>
          <tbody>
            ${e.length===0?`<tr><td colspan="6"><div class="empty"><div class="empty-icon">💵</div>Add your income sources</div></td></tr>`:e.map(e=>{let t=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():`<span style="color:var(--text-muted)">—</span>`,n=e.recurring===!1?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>`:``;return`<tr>
              <td style="font-weight:500;border-left:4px solid ${colors.income}">${x(e.name)}${n}</td>
              <td class="amount">${T(e.amount)}</td>
              <td>${t}</td>
              <td style="color:var(--text-muted)">${k(e)}</td>
              <td class="amount" style="color:var(--success)">${w(A(e))}/mo</td>
              <td class="actions">
                <button class="btn btn-ghost btn-sm" onclick="openEditIncome(${e.id})">✏️</button>
                <button class="btn btn-danger-ghost btn-sm" onclick="deleteIncome(${e.id})">🗑</button>
              </td>
            </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `;let p=[`all`,...Array.from(new Set(t.map(e=>e.category||`Other`))).sort()],h=expenseFilterCat===`all`?t:t.filter(e=>(e.category||`Other`)===expenseFilterCat),g=h.reduce((e,t)=>e+A(t),0),_=h.reduce((e,t)=>e+getActual(t.id,selectedBudgetMonth),0),v=g-_,y=expenseFilterCat!==`all`;d+=`
    <div class="section">
      <div class="section-header">
        <div>
          <div class="section-title">Expenses</div>
          <div class="section-subtitle">
            Budget: ${w(r)}/mo
            ${a>0?` · Actual: ${w(a)} · <span class="${o>=0?`var-under`:`var-over`}">${o>=0?`▼`:`▲`} ${w(Math.abs(o))}</span>`:``}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div style="display:flex;border:1px solid var(--border);border-radius:6px;overflow:hidden">
            <button onclick="setBudgetView('grouped')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;cursor:pointer;background:${budgetViewMode===`grouped`?`var(--primary)`:`var(--surface)`};color:${budgetViewMode===`grouped`?`#fff`:`var(--text-muted)`}">⊞ Groups</button>
            <button onclick="setBudgetView('table')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;border-left:1px solid var(--border);cursor:pointer;background:${budgetViewMode===`table`?`var(--primary)`:`var(--surface)`};color:${budgetViewMode===`table`?`#fff`:`var(--text-muted)`}">≡ Table</button>
          </div>
          ${budgetViewMode===`table`?`<select class="form-select" style="width:auto;padding:6px 10px;font-size:12px" onchange="setExpenseFilter(this.value)">
            ${p.map(e=>`<option value="${e}" ${expenseFilterCat===e?`selected`:``}>${e===`all`?`All categories`:e}</option>`).join(``)}
          </select>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddExpense()">+ Expense</button>
        </div>
      </div>

      <div style="padding:16px 20px">
      ${budgetViewMode===`grouped`?Do(t):`
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
              ${h.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>${t.length===0?`Add your household expenses`:`No expenses in this category`}</div></td></tr>`:[...h].sort((e,t)=>{if(!expenseSortCol)return 0;let n,r;if(expenseSortCol===`name`)n=e.name.toLowerCase(),r=t.name.toLowerCase();else if(expenseSortCol===`category`)n=(e.category||`Other`).toLowerCase(),r=(t.category||`Other`).toLowerCase();else if(expenseSortCol===`frequency`)n=k(e),r=k(t);else if(expenseSortCol===`due`)n=e.dueDate||`￿`,r=t.dueDate||`￿`;else if(expenseSortCol===`budget`)n=A(e),r=A(t);else if(expenseSortCol===`actual`)n=getActual(e.id,selectedBudgetMonth),r=getActual(t.id,selectedBudgetMonth);else if(expenseSortCol===`variance`)n=A(e)-getActual(e.id,selectedBudgetMonth),r=A(t)-getActual(t.id,selectedBudgetMonth);else return 0;return n<r?expenseSortDir===`asc`?-1:1:n>r?expenseSortDir===`asc`?1:-1:0}).map(e=>{let t=A(e),n=getActual(e.id,selectedBudgetMonth),r=t-n,i=n>0,a;a=i?r>=0?`<span class="var-under">▼ ${w(r)}</span>`:`<span class="var-over">▲ ${w(Math.abs(r))}</span>`:`<span class="var-none">—</span>`;let o=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():`<span style="color:var(--text-muted)">—</span>`,s=colors.expense[e.category||`Other`]||`#94a3b8`,c=e.recurring===!1?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>`:``;return`<tr>
                        <td style="font-weight:500;border-left:4px solid ${s}">${x(e.name)}${c}${e.vendor?`<br><span style="font-size:11px;font-weight:400;color:var(--text-muted)">${x(e.vendor)}</span>`:``}</td>
                        <td><span style="display:inline-block;padding:2px 10px;border-radius:99px;background:${s};color:#fff;font-size:11px;font-weight:600;white-space:nowrap">${e.category||`Other`}</span></td>
                        <td style="color:var(--text-muted)">${k(e)}</td>
                        <td>${o}</td>
                        <td class="amount">${w(t)}</td>
                        <td class="actual-cell amount" id="actual-${e.id}" onclick="editActual(${e.id})">${i?w(n):`<span style="color:var(--text-muted);font-size:12px">+ add</span>`}</td>
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
                <td colspan="4" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total ${y?expenseFilterCat:`all categories`}</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${w(g)}/mo</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${_>0?w(_):`—`}</td>
                <td style="padding:11px 16px;font-weight:700">${_>0?`<span class="${v>=0?`var-under`:`var-over`}">${v>=0?`▼`:`▲`} ${w(Math.abs(v))}</span>`:`—`}</td>
                <td></td>
              </tr>
            </tfoot>`:``}
          </table>
        </div>`}
      </div>
    </div>
  `,d+=`</div></div>`,document.getElementById(`budget-content`).innerHTML=d}catch(e){console.error(`renderBudget error:`,e);let t=document.getElementById(`budget-content`);t&&(t.innerHTML=`<div style="padding:24px;color:var(--alert);font-family:var(--mono);font-size:13px">Render error: ${x(e.message)}<br><small>${x(e.stack||``)}</small></div>`)}}var No=!1;function Po(){No=!No;let e=document.getElementById(`budget-detail`),t=document.getElementById(`budget-expand-label`),n=document.getElementById(`budget-expand-chevron`),r=e&&e.parentElement;e&&(e.classList.toggle(`collapsed`,!No),e.classList.toggle(`expanded`,No)),r&&(r.style.marginBottom=No?`16px`:`0`),t&&(t.textContent=No?`Hide details ▲`:`See breakdown ▼`),n&&(n.textContent=No?`▲`:`▼`)}function z(e,t,n){document.getElementById(`modal-title`).textContent=e,document.getElementById(`modal-body`).innerHTML=t,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" id="modal-save-btn">Save</button>
  `,window._modalSaveHandler=n,document.getElementById(`modal-save-btn`).onclick=()=>window._modalSaveHandler?.(),document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function B(){_pendingLogEntry=null,window._actualEditorRefresh=null,window._csvSuggestions=null,window._csvSuggestNames=null,document.getElementById(`modal-body`).innerHTML=``,document.getElementById(`modal-footer`).innerHTML=``,document.getElementById(`modal-overlay`).classList.add(`hidden`)}document.getElementById(`modal-overlay`).addEventListener(`click`,e=>{e.target===document.getElementById(`modal-overlay`)&&B()});function Fo(){z(`Edit Contract Total`,`
    <div class="form-group">
      <label class="form-label">Fixed Price Contract Total (AUD)</label>
      <input class="form-input" id="f-contract-total" type="number" max="99999999" value="${m.buildContract.total}" min="0">
    </div>
  `,()=>{let e=parseFloat(document.getElementById(`f-contract-total`).value);!isNaN(e)&&e>0&&(logActivity(`Updated contract total`,w(e)),m.buildContract.total=e,saveData(m),B(),renderAll())})}function Io(e={}){return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Stage Name</label>
        <input class="form-input" id="f-stage-name" type="text" maxlength="200" value="${S(e.name||``)}" placeholder="e.g. Base / Slab">
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
        <input class="form-input" id="f-stage-ref" type="text" maxlength="200" value="${S(e.invoiceRef||``)}" placeholder="Optional">
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
  `}function Lo(e){return{id:e,name:document.getElementById(`f-stage-name`).value.trim(),amount:parseFloat(document.getElementById(`f-stage-amount`).value)||0,paid:document.getElementById(`f-stage-paid`).checked,expectedDate:document.getElementById(`f-stage-expected`).value,paidDate:document.getElementById(`f-stage-paiddate`).value,invoiceRef:document.getElementById(`f-stage-ref`).value.trim(),funding:document.getElementById(`f-stage-funding`).value,notes:document.getElementById(`f-stage-notes`).value.trim()}}function Ro(){z(`Add Contract Stage`,Io(),()=>{let e=Lo(M(m.buildContract.stages));e.name&&(logActivity(`Added build stage`,e.name),m.buildContract.stages.push(e),saveData(m),B(),renderAll())})}function zo(e){let t=m.buildContract.stages.find(t=>t.id===e);z(`Edit Stage`,Io(t),()=>{let n=Lo(e);logActivity(`Edited build stage`,n.name||t.name),Object.assign(t,n),saveData(m),B(),renderAll()})}function Bo(e){if(!confirm(`Delete this stage?`))return;let t=m.buildContract.stages.find(t=>t.id===e);logActivity(`Deleted build stage`,t?t.name:``),m.buildContract.stages=m.buildContract.stages.filter(t=>t.id!==e),saveData(m),renderAll()}function Vo(e={}){return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Variation Ref</label>
        <input class="form-input" id="f-var-ref" type="text" maxlength="200" value="${S(e.ref||``)}" placeholder="e.g. V001">
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
      <input class="form-input" id="f-var-name" type="text" maxlength="200" value="${S(e.name||``)}" placeholder="e.g. Tile upgrade — master bathroom">
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
      <input class="form-input" id="f-var-notes" type="text" maxlength="200" value="${S(e.notes||``)}" placeholder="Optional">
    </div>
  `}function Ho(e){return{id:e,ref:document.getElementById(`f-var-ref`).value.trim(),name:document.getElementById(`f-var-name`).value.trim(),amount:parseFloat(document.getElementById(`f-var-amount`).value)||0,status:document.getElementById(`f-var-status`).value,funding:document.getElementById(`f-var-funding`).value,dateRaised:document.getElementById(`f-var-raised`).value,dateApproved:document.getElementById(`f-var-approved`).value,notes:document.getElementById(`f-var-notes`).value.trim()}}function Uo(){z(`Add Variation`,Vo(),()=>{let e=Ho(M(m.buildContract.variations));e.name&&(logActivity(`Added variation`,`${e.ref?e.ref+` · `:``}${e.name}`),m.buildContract.variations.push(e),saveData(m),renderBuild())})}function Wo(e){z(`Edit Variation`,Vo(m.buildContract.variations.find(t=>t.id===e)),()=>{let t=Ho(e);if(!t.name)return;logActivity(`Edited variation`,`${t.ref?t.ref+` · `:``}${t.name}`);let n=m.buildContract.variations.findIndex(t=>t.id===e);n!==-1&&(m.buildContract.variations[n]=t),saveData(m),renderBuild()})}function Go(e){if(!confirm(`Delete this variation?`))return;let t=m.buildContract.variations.find(t=>t.id===e);logActivity(`Deleted variation`,t?t.name:``),m.buildContract.variations=m.buildContract.variations.filter(t=>t.id!==e),saveData(m),renderBuild()}var Ko=[{value:`not-quoted`,label:`Not Quoted`},{value:`quoted`,label:`Quoted`},{value:`approved`,label:`Approved`},{value:`partial`,label:`Partially Paid`},{value:`paid`,label:`Paid`}];function qo(e={}){let t=e.status||(e.totalAmount?`approved`:`not-quoted`);return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input class="form-input" id="f-extra-name" type="text" maxlength="200" value="${S(e.name||``)}" placeholder="e.g. Solar">
      </div>
      <div class="form-group">
        <label class="form-label">Vendor / Contractor</label>
        <input class="form-input" id="f-extra-vendor" type="text" maxlength="200" value="${S(e.vendor||``)}" placeholder="Company name">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f-extra-status">
          ${Ko.map(e=>`<option value="${e.value}" ${t===e.value?`selected`:``}>${e.label}</option>`).join(``)}
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
        <input class="form-input" id="f-extra-notes" type="text" maxlength="200" value="${S(e.notes||``)}" placeholder="Optional">
      </div>
    </div>
  `}function Jo(e){return{id:e,name:document.getElementById(`f-extra-name`).value.trim(),vendor:document.getElementById(`f-extra-vendor`).value.trim(),status:document.getElementById(`f-extra-status`).value,funding:document.getElementById(`f-extra-funding`).value,totalAmount:parseFloat(document.getElementById(`f-extra-total`).value)||0,amountPaid:parseFloat(document.getElementById(`f-extra-paid`).value)||0,dueDate:document.getElementById(`f-extra-due`).value,notes:document.getElementById(`f-extra-notes`).value.trim()}}function Yo(){z(`Add Outside Contract Item`,qo(),()=>{let e=Jo(M(m.extras));e.name&&(logActivity(`Added extra item`,e.name),m.extras.push(e),saveData(m),B(),renderAll())})}function Xo(e){let t=m.extras.find(t=>t.id===e);z(`Edit Item`,qo(t),()=>{let n=Jo(e);logActivity(`Edited extra item`,n.name||t.name),Object.assign(t,n),saveData(m),B(),renderAll()})}function Zo(e){if(!confirm(`Delete this item?`))return;let t=m.extras.find(t=>t.id===e);logActivity(`Deleted extra item`,t?t.name:``),m.extras=m.extras.filter(t=>t.id!==e),saveData(m),renderAll()}function Qo(e={}){let t=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():``,n=[`weekly`,`fortnightly`,`monthly`,`quarterly`,`annually`,`custom`],r=e.frequency===`custom`;return`
    <div class="form-group">
      <label class="form-label">Source / Description</label>
      <input class="form-input" id="f-inc-name" type="text" maxlength="200" value="${S(e.name||``)}" placeholder="e.g. Salary — Chris">
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
  `}function $o(e){let t=document.getElementById(`f-inc-freq`)?document.getElementById(`f-inc-freq`).value:`monthly`,n=document.getElementById(`f-inc-recurring`),r={id:e,name:document.getElementById(`f-inc-name`).value.trim(),amount:parseFloat(document.getElementById(`f-inc-amount`).value)||0,frequency:t,dueDate:document.getElementById(`f-inc-duedate`).value||null,recurring:n?n.checked:!0};return t===`custom`&&(r.customEvery=parseInt(document.getElementById(`f-inc-custom-n`).value)||1,r.customUnit=document.getElementById(`f-inc-custom-unit`).value),r}function es(){z(`Add Income`,Qo(),()=>{let e=$o(M(getMonthData(selectedBudgetMonth).income));e.name&&(logActivity(`Added income`,e.name),confirmScope(()=>{let t=ensureMonthOverride(selectedBudgetMonth);e.id=M(t.income),t.income.push(e),saveData(m),renderAll()},()=>{e.id=M(m.budget.income),m.budget.income.push(e),saveData(m),renderAll()}))})}function ts(e){let t=getMonthData(selectedBudgetMonth).income.find(t=>t.id===e);z(`Edit Income`,Qo(t),()=>{let n=$o(e);logActivity(`Edited income`,n.name||t&&t.name||``),confirmScope(()=>{let t=ensureMonthOverride(selectedBudgetMonth),r=t.income.find(t=>t.id===e);r?Object.assign(r,n):t.income.push(n),saveData(m),renderAll()},()=>{let t=m.budget.income.find(t=>t.id===e);t&&Object.assign(t,n),saveData(m),renderAll()})})}function ns(e){let t=getMonthData(selectedBudgetMonth).income.find(t=>t.id===e),n=t?t.name:`this income`;logActivity(`Deleted income`,n),_scopePending=null,document.getElementById(`modal-title`).textContent=`Delete income`,document.getElementById(`modal-body`).innerHTML=`
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Delete <strong style="color:var(--text)">${n}</strong>? Apply to
      <strong style="color:var(--text)">${monthLabel(selectedBudgetMonth)}</strong> only,
      or remove from all months?
    </p>`,_scopePending={onThisMonth:()=>{let t=ensureMonthOverride(selectedBudgetMonth);t.income=t.income.filter(t=>t.id!==e),saveData(m),renderAll()},onAllMonths:()=>{m.budget.income=m.budget.income.filter(t=>t.id!==e),m.budget.months&&Object.values(m.budget.months).forEach(t=>{t.income=t.income.filter(t=>t.id!==e)}),saveData(m),renderAll()}},document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="doScopeAll()">Remove from all months</button>
    <button class="btn btn-danger" onclick="doScopeMonth()">Delete from ${monthLabel(selectedBudgetMonth)}</button>
  `,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function rs(e={}){let t=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():``,n=[`weekly`,`fortnightly`,`monthly`,`quarterly`,`annually`,`custom`],r=e.frequency===`custom`;return`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Description</label>
        <input class="form-input" id="f-exp-name" type="text" maxlength="200" value="${S(e.name||``)}" placeholder="e.g. Mortgage">
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
      <input class="form-input" id="f-exp-vendor" type="text" maxlength="200" value="${S(e.vendor||``)}" placeholder="e.g. ANZ, Woolworths, Netflix">
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
  `}function is(e){let t=document.getElementById(`f-exp-freq`)?document.getElementById(`f-exp-freq`).value:`monthly`,n=document.getElementById(`f-exp-recurring`),r={id:e,name:document.getElementById(`f-exp-name`).value.trim(),category:document.getElementById(`f-exp-cat`).value,vendor:(document.getElementById(`f-exp-vendor`)?.value||``).trim()||null,amount:parseFloat(document.getElementById(`f-exp-amount`).value)||0,frequency:t,dueDate:document.getElementById(`f-exp-duedate`).value||null,recurring:n?n.checked:!0};return t===`custom`&&(r.customEvery=parseInt(document.getElementById(`f-exp-custom-n`).value)||1,r.customUnit=document.getElementById(`f-exp-custom-unit`).value),r}function as(e){let t=document.getElementById(`f-${e}-freq`).value,n=document.getElementById(`f-${e}-custom-wrap`);n&&(n.style.display=t===`custom`?`flex`:`none`)}function os(){z(`Add Expense`,rs(),()=>{let e=is(M(getMonthData(selectedBudgetMonth).expenses));e.name&&(logActivity(`Added expense`,`${e.name} (${e.category||`Other`})`),confirmScope(()=>{let t=ensureMonthOverride(selectedBudgetMonth);e.id=M(t.expenses),t.expenses.push(e),saveData(m),renderAll()},()=>{if(e.id=M(m.budget.expenses),m.budget.expenses.push(e),isMonthCustomized(selectedBudgetMonth)){let t=m.budget.months[selectedBudgetMonth];t.expenses.push({...e,id:M(t.expenses)})}saveData(m),renderAll()}))})}function ss(e){let t=getMonthData(selectedBudgetMonth).expenses.find(t=>t.id===e);z(`Edit Expense`,rs(t),()=>{let n=is(e);logActivity(`Edited expense`,`${n.name||t&&t.name||``} (${n.category||`Other`})`),confirmScope(()=>{let t=ensureMonthOverride(selectedBudgetMonth),r=t.expenses.find(t=>t.id===e);r?Object.assign(r,n):t.expenses.push(n),saveData(m),renderAll()},()=>{let t=m.budget.expenses.find(t=>t.id===e);if(t&&Object.assign(t,n),isMonthCustomized(selectedBudgetMonth)){let t=m.budget.months[selectedBudgetMonth].expenses.find(t=>t.id===e);t&&Object.assign(t,n)}saveData(m),renderAll()})});let n=document.createElement(`button`);n.className=`btn btn-danger`,n.textContent=`Delete`,n.style.marginRight=`auto`,n.onclick=()=>{B(),cs(e)};let r=document.getElementById(`modal-footer`);r.insertBefore(n,r.firstChild)}function cs(e){let t=getMonthData(selectedBudgetMonth).expenses.find(t=>t.id===e),n=t?t.name:`this expense`;logActivity(`Deleted expense`,n),_scopePending={onThisMonth:()=>{let t=ensureMonthOverride(selectedBudgetMonth);t.expenses=t.expenses.filter(t=>t.id!==e),saveData(m),renderAll()},onAllMonths:()=>{m.budget.expenses=m.budget.expenses.filter(t=>t.id!==e),m.budget.months&&Object.values(m.budget.months).forEach(t=>{t.expenses=t.expenses.filter(t=>t.id!==e)}),saveData(m),renderAll()}},document.getElementById(`modal-title`).textContent=`Delete expense`,document.getElementById(`modal-body`).innerHTML=`
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Delete <strong style="color:var(--text)">${n}</strong>? Apply to
      <strong style="color:var(--text)">${monthLabel(selectedBudgetMonth)}</strong> only,
      or remove from all months?
    </p>`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="doScopeAll()">Remove from all months</button>
    <button class="btn btn-danger" onclick="doScopeMonth()">Delete from ${monthLabel(selectedBudgetMonth)}</button>
  `,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}document.getElementById(`btn-guest-mode`)?.addEventListener(`click`,()=>Cs()),document.getElementById(`btn-google-signin`)?.addEventListener(`click`,()=>Ss());function ls(){document.getElementById(`sidebar`).classList.toggle(`collapsed`)}var us={};function ds(e){let t=document.getElementById(`icon-group-${e}`),n=document.getElementById(`icon-group-${e}-children`),r=document.getElementById(`text-group-${e}`),i=document.getElementById(`text-group-${e}-children`),a=n&&n.classList.contains(`open`);t&&t.classList.toggle(`open`,!a),n&&n.classList.toggle(`open`,!a),r&&r.classList.toggle(`open`,!a),i&&i.classList.toggle(`open`,!a)}function fs(e){for(let[t,n]of Object.entries(us))if(n.includes(e)){let e=document.getElementById(`icon-group-${t}-children`);e&&!e.classList.contains(`open`)&&ds(t);return}}window.addEventListener(`unhandledrejection`,e=>{console.error(`[unhandledrejection]`,e.reason)}),window.addEventListener(`error`,e=>{console.error(`[uncaughtError]`,e.message,e.filename,e.lineno)});var ps=`toto_household_owner`,ms=`toto_pending_household`;function hs(){return sessionStorage.getItem(ms)||Gs(ps)||V?.uid||null}function gs(){let e=hs();return e?fbStore.collection(`families`).doc(e):null}function _s(e){Ks(ps,e),sessionStorage.removeItem(ms)}var V=null,vs=!1,ys=null,bs=null;function xs(e,t){bs={ts:new Date().toISOString(),name:V&&(V.displayName||V.email)||`Unknown`,photo:V&&V.photoURL||``,action:e,detail:t||``}}function Ss(){let e=new fbAuth.GoogleAuthProvider;fbAuth.signInWithPopup(e).catch(e=>{let t=document.getElementById(`login-error`);t&&(t.textContent=e.message,t.style.display=``)})}function Cs(){vs=!0;let e=document.getElementById(`login-overlay`);if(e&&e.classList.add(`hidden`),!m.onboarded)showOnboarding();else{let e=location.hash.slice(1);e&&document.getElementById(`tab-`+e)?(history.replaceState({tab:e},``,`#`+e),y(e)):renderAll(),tc()}}function ws(){ys&&(ys(),ys=null),zs=!1,U=null,$s(),fbAuth.signOut()}function Ts(e){return e.budget||(e.budget={income:[],expenses:[],actuals:{},months:{}}),e.budget.actuals||(e.budget.actuals={}),e.budget.months||(e.budget.months={}),e.budget.suggestions||(e.budget.suggestions=[]),e.goals||(e.goals=[]),e.scenarios||(e.scenarios=[]),e.furniture||(e.furniture=[]),e.appliances||(e.appliances=[]),e.planner||(e.planner={events:[]}),e.lists||(e.lists={food:{items:[],budget:0,weeklyBudget:200,stores:[],favourites:[],history:[]},clothes:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},wishlist:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},home:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},pharmacy:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]}},e.meals&&e.meals.shopping&&e.meals.shopping.length&&(e.lists.food.items=e.meals.shopping.map(function(e,t){return{id:`si-`+t,name:e.name,quantity:1,unit:`units`,notes:``,aisle:e.cat||`other`,state:e.checked?`got_it`:`active`,addedBy:`migration`,addedAt:new Date().toISOString(),mealTag:null,manualPrice:null,barcodeId:null}}))),[`food`,`clothes`,`wishlist`,`home`,`pharmacy`].forEach(function(t){e.lists[t]||(e.lists[t]={items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]}),e.lists[t].items||(e.lists[t].items=[]),e.lists[t].stores||(e.lists[t].stores=[]),e.lists[t].favourites||(e.lists[t].favourites=[]),e.lists[t].history||(e.lists[t].history=[])}),e}function Es(){ys&&ys(),!Gs(ps)&&!sessionStorage.getItem(ms)&&_s(V.uid);let e=gs();if(!e){console.error(`No household doc ref`);return}ys=e.onSnapshot(async t=>{if(t.exists){let e=Ts(t.data());Object.assign(m,e),localStorage.setItem(Os,JSON.stringify(m))}else{let t=await fbStore.collection(`family`).doc(`shared`).get().catch(()=>null);if(t&&t.exists){let n=Ts(t.data());Object.assign(m,n),e.set(m).catch(()=>{}),localStorage.setItem(Os,JSON.stringify(m))}else e.set(m).catch(()=>{})}refreshReceiptCounts().then(()=>{ar();let e=location.hash.slice(1);if(e&&document.getElementById(`tab-`+e)?(history.replaceState({tab:e},``,`#`+e),y(e)):renderAll(),!m.onboarded)showOnboarding();else{let e=sessionStorage.getItem(gl),t=sessionStorage.getItem(`toto_post_invite_action`);e||t?(sessionStorage.removeItem(`toto_post_invite_action`),vl()):tc()}})},e=>{console.error(`Firestore sync error:`,e),renderAll(),m.onboarded||showOnboarding()})}function Ds(){fbAuth.onAuthStateChanged(e=>{if(vs&&!e)return;V=e;let t=document.getElementById(`login-overlay`),n=document.getElementById(`header-avatar`),r=document.getElementById(`header-sign-out`);if(e)t&&t.classList.add(`hidden`),n&&(n.src=e.photoURL||``,n.style.display=`block`),r&&(r.style.display=`block`),Es();else{t&&t.classList.remove(`hidden`),n&&(n.style.display=`none`),r&&(r.style.display=`none`),ys&&(ys(),ys=null);let e=sessionStorage.getItem(gl),i=document.getElementById(`login-invite-banner`),a=document.getElementById(`login-tagline`);e&&i&&(i.style.display=`block`,a&&(a.style.display=`none`))}})}Ds();var Os=`home_finance_v1`,ks=null,As={};function js(e,t,n,r){As[e]={options:t,value:n,onChange:r};let i=t.find(e=>(e.value??e)===n)||t[0],a=i?.label??i?.value??i??``;return`<div class="cs-wrap">
    <button type="button" class="cs-trigger" id="cs-${e}" onclick="event.stopPropagation();_csOpen('${e}',this)">
      <span id="cs-label-${e}">${x(String(a))}</span>
      <span class="cs-chevron">▼</span>
    </button>
  </div>`}function Ms(e,t){ks&&(ks.remove(),ks=null,document.querySelectorAll(`.cs-trigger.open`).forEach(e=>e.classList.remove(`open`)));let n=As[e];if(!n)return;t.classList.add(`open`);let r=t.getBoundingClientRect(),i=document.createElement(`div`);i.className=`cs-dropdown`,i.style.left=r.left+`px`,i.style.width=Math.max(r.width,180)+`px`;let a=window.innerHeight-r.bottom-8,o=r.top-8,s=Math.min(260,n.options.length*43);i.style.top=a>=s||a>=o?r.bottom+4+`px`:Math.max(8,r.top-s-4)+`px`,n.options.forEach(r=>{let a=r.value??r,o=r.label??r.value??r,s=document.createElement(`div`);s.className=`cs-option`+(a===n.value?` cs-selected`:``),s.textContent=o,s.addEventListener(`click`,r=>{r.stopPropagation(),n.value=a;let s=document.getElementById(`cs-label-`+e);s&&(s.textContent=o),n.onChange(a),i.remove(),ks=null,t.classList.remove(`open`)}),i.appendChild(s)}),document.body.appendChild(i),ks=i}document.addEventListener(`click`,()=>{ks&&(ks.remove(),ks=null,document.querySelectorAll(`.cs-trigger.open`).forEach(e=>e.classList.remove(`open`)))});function Ns(e){e&&e.querySelectorAll(`select.form-select:not(.cs-upgraded)`).forEach(e=>{e.classList.add(`cs-upgraded`);let t=(e.id||`cs`+Math.random().toString(36).slice(2,7))+`__cs`,n=Array.from(e.options).map(e=>({value:e.value,label:e.text})),r=e.value||n[0]?.value||``;e.style.cssText=`position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;overflow:hidden`;let i=document.createElement(`div`);i.className=`cs-wrap`,i.innerHTML=js(t,n,r,t=>{e.value=t,e.dispatchEvent(new Event(`change`,{bubbles:!0}))}),e.parentNode.insertBefore(i,e)})}(function(){let e=document.getElementById(`modal-overlay`);e&&new MutationObserver(()=>{e.classList.contains(`hidden`)||Ns(document.getElementById(`modal-body`))}).observe(e,{attributes:!0,attributeFilter:[`class`]})})();var Ps=`https://wandering-mouse-3925.fuscocl.workers.dev`,Fs={buildContract:{total:79e4,stages:[{id:1,name:`Deposit`,amount:39500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:2,name:`Base / Slab`,amount:79e3,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:3,name:`Frame`,amount:118500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:4,name:`Lock-up / Enclosed`,amount:276500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:5,name:`Fixing / Fitout`,amount:197500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:6,name:`Practical Completion`,amount:79e3,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``}],variations:[]},extras:[{id:1,name:`Solar`,vendor:``,totalAmount:0,amountPaid:0,dueDate:``,notes:``},{id:2,name:`Landscaping`,vendor:``,totalAmount:0,amountPaid:0,dueDate:``,notes:``}],furniture:[],appliances:[],goals:[],scenarios:[],kids:{profiles:[],chores:[],prizes:[],completions:[],redemptions:[]},netWorth:{assets:[],liabilities:[],snapshots:[],target:{amount:0,byYear:0}},bills:[],subscriptions:[],planner:{events:[]},meals:{plan:{},shopping:[],lunchbox:{profiles:[],plans:{}},pantry:[]},vehicles:[],documents:[],maintenance:[],onboarded:!1,setupProgressDismissed:!1,activityLog:[],householdProfile:{members:[{role:`adult`,age:null},{role:`adult`,age:null}],pets:[],cars:1,invites:[],authorizedUsers:[]},expenseCategories:[`Mortgage / Rent`,`Insurance`,`Utilities`,`Groceries`,`Transport`,`Childcare / Education`,`Health`,`Entertainment`,`Subscriptions`,`Dining Out`,`Clothing`,`Personal Care`,`Savings / Investment`,`Other`],incomeCategories:[`Salary`,`Freelance / Contract`,`Rental Income`,`Government / Benefits`,`Investment`,`Other`],budget:{income:[],expenses:[],actuals:{},months:{}},settings:{autoFillMonths:!1},categoryGroups:[{id:1,name:`Housing`,icon:`🏠`,categories:[`Mortgage / Rent`,`Utilities`,`Insurance`]},{id:2,name:`Food & Dining`,icon:`🍽️`,categories:[`Groceries`,`Dining Out`]},{id:3,name:`Transport`,icon:`🚗`,categories:[`Transport`]},{id:4,name:`Family & Health`,icon:`👨‍👩‍👧`,categories:[`Childcare / Education`,`Health`,`Personal Care`]},{id:5,name:`Lifestyle`,icon:`🎮`,categories:[`Entertainment`,`Subscriptions`,`Clothing`]},{id:6,name:`Savings`,icon:`💰`,categories:[`Savings / Investment`]},{id:7,name:`Other`,icon:`📦`,categories:[`Other`]}],routines:[],routineAssignments:[],childEvents:[]};function Is(){try{let e=localStorage.getItem(Os);if(!e)return JSON.parse(JSON.stringify(Fs));let t=JSON.parse(e);t.budget.actuals||(t.budget.actuals={}),t.budget.months||(t.budget.months={}),t.budget.suggestions||(t.budget.suggestions=[]),t.goals||(t.goals=[]),t.scenarios||(t.scenarios=[]),t.netWorth||(t.netWorth={assets:[],liabilities:[],snapshots:[]}),t.netWorth.snapshots||(t.netWorth.snapshots=[]),t.netWorth.target||(t.netWorth.target={amount:0,byYear:0}),t.bills||(t.bills=[]),t.subscriptions||(t.subscriptions=[]),t.onboarded===void 0&&(t.onboarded=!0),t.planner||(t.planner={events:[]}),t.planner?.events&&t.planner.events.forEach(e=>{if(e.recurring||(e.recurring=`none`),!e.recurrence&&e.recurring&&e.recurring!==`none`){let t={weekly:{type:`interval`,intervalDays:7},fortnightly:{type:`interval`,intervalDays:14},monthly:{type:`interval`,intervalDays:30},quarterly:{type:`interval`,intervalDays:91},yearly:{type:`interval`,intervalDays:365}}[e.recurring];t&&(e.recurrence={...t,startDate:e.date||new Date().toISOString().slice(0,10)})}}),t.kids||(t.kids={profiles:[],chores:[],prizes:[],completions:[],redemptions:[]}),t.kids.profiles||(t.kids.profiles=[]),t.kids.chores||(t.kids.chores=[]),t.kids.prizes||(t.kids.prizes=[]),t.kids.completions||(t.kids.completions=[]),t.kids.redemptions||(t.kids.redemptions=[]);let n=new Map;if(t.kids.profiles.forEach(e=>{e.name&&n.set(e.name.toLowerCase(),e)}),n.size<t.kids.profiles.length&&(t.kids.profiles=Array.from(n.values())),t.furniture||(t.furniture=[]),t.appliances||(t.appliances=[]),t.activityLog||(t.activityLog=[]),!t.householdProfile)t.householdProfile={members:[{role:`adult`,age:null},{role:`adult`,age:null}],pets:[],cars:1};else if(`adults`in t.householdProfile){let e=t.householdProfile.adults||2,n=t.householdProfile.children||0;t.householdProfile={members:[...Array.from({length:e},()=>({role:`adult`,age:null})),...Array.from({length:n},()=>({role:`child`,age:null}))],pets:[],cars:1}}t.householdProfile.pets||(t.householdProfile.pets=[]),t.householdProfile.cars===void 0&&(t.householdProfile.cars=1),t.householdProfile.invites||(t.householdProfile.invites=[]),t.householdProfile.authorizedUsers||(t.householdProfile.authorizedUsers=[]),(t.householdProfile.members||[]).forEach((e,n)=>{if(!e.name)if(e.role===`child`){let r=(t.kids?.profiles||[])[n-(t.householdProfile.members||[]).filter((e,t)=>t<n&&e.role===`adult`).length];r?.name&&(e.name=r.name,!e.age&&r.age&&(e.age=r.age),!e.emoji&&r.emoji&&(e.emoji=r.emoji))}else{let r=(t.budget?.income||[])[(t.householdProfile.members||[]).filter((e,t)=>t<n&&e.role===`adult`).length];if(r?.name){let t=r.name.match(/^([^'\s]+)'s\s/i)||r.name.match(/^([^'\s]+)\s/);t&&(e.name=t[1])}}}),t.meals||(t.meals={plan:{},shopping:[]}),t.meals.plan||(t.meals.plan={}),t.meals.shopping||(t.meals.shopping=[]),t.meals.lunchbox||(t.meals.lunchbox={profiles:[],plans:{}}),t.meals.lunchbox.profiles||(t.meals.lunchbox.profiles=[]),t.meals.lunchbox.plans||(t.meals.lunchbox.plans={}),t.meals.pantry||(t.meals.pantry=[]),t.vehicles||(t.vehicles=[]),t.documents||(t.documents=[]),t.maintenance||(t.maintenance=[]),t.routines||(t.routines=[]),t.routineAssignments||(t.routineAssignments=[]);let r=new Set((t.routineAssignments||[]).map(e=>e.routineId));if(t.routines.forEach(e=>{if(e.completions||(e.completions={}),e.sharedWith||(e.sharedWith=[]),e.assignedTo||(e.assignedTo=[]),e.linkedFrom||(e.linkedFrom=null),e.linkedType||(e.linkedType=null),e.pointsPerCompletion===void 0&&(e.pointsPerCompletion=0),(e.steps||[]).forEach(e=>{e.points===void 0&&(e.points=0)}),e.skippedDates||(e.skippedDates=[]),e.pausePeriods||(e.pausePeriods=[]),e.recurrence||(e.recurrence={type:`daily`,startDate:(e.lastEditedAt||new Date().toISOString()).slice(0,10)}),(!e.ownerType||!e.ownerId)&&(r.has(e.id)?(e.ownerType=`household`,e.ownerId=`household`):(e.ownerType=`adult`,e.ownerId=`guest`)),r.has(e.id)&&e.ownerType!==`household`&&(e.ownerType=`household`,e.ownerId=`household`),e.ownerType===`adult`&&e.ownerId===`guest`&&e.steps?.length>0){let t=new Set([`Make bed`,`Shower`,`Breakfast`,`Exercise`,`Plan the day`,`Tidy kitchen`,`Prep tomorrow`,`Family time`,`Read`,`Lights out`]);e.steps.every(e=>t.has(e.label))&&(e.steps=[])}}),t.routineAssignments.forEach(e=>{if(!e.completionState){let n=t.routines.find(t=>t.id===e.routineId);e.completionState=n&&Object.keys(n.completions||{}).length?JSON.parse(JSON.stringify(n.completions)):{}}e.archivedCompletionState||(e.archivedCompletionState=null),e.childIds||(e.childIds=e.childId?[e.childId]:[])}),t.routines.forEach(e=>{e.ownerType===`household`&&(e.completions={})}),t.childEvents||(t.childEvents=[]),t.childEvents.forEach(e=>{e.recurrence||(e.recurrence=null),e.assignedTo||(e.assignedTo=[]),e.isHouseholdWide===void 0&&(e.isHouseholdWide=!1)}),t.settings||(t.settings={autoFillMonths:!1}),t.settings.notifStyle||(t.settings.notifStyle=`focus-timeline`),t.settings.routineResetHour===void 0&&(t.settings.routineResetHour=0),t.kids.notifications||(t.kids.notifications=[]),t.settings.typeAMode===void 0&&(t.settings.typeAMode=!1),t.settings.typeAStreak||(t.settings.typeAStreak=0),t.settings.typeALastReset||(t.settings.typeALastReset=``),t.settings.typeADismissedMission||(t.settings.typeADismissedMission=``),t.settings.typeAMissionShownDate||(t.settings.typeAMissionShownDate=``),t.settings.typeAMissionId||(t.settings.typeAMissionId=``),t.settings.typeALastResetDate||(t.settings.typeALastResetDate=``),t.categoryGroups||(t.categoryGroups=JSON.parse(JSON.stringify(Fs.categoryGroups))),t.buildContract.variations||(t.buildContract.variations=[]),t.buildContract.stages.forEach(e=>{e.expectedDate||(e.expectedDate=``)}),t.expenseCategories||(t.expenseCategories=JSON.parse(JSON.stringify(Fs.expenseCategories))),t.incomeCategories||(t.incomeCategories=JSON.parse(JSON.stringify(Fs.incomeCategories))),t.budget&&t.budget.expenses){let e=new Date;t.budget.expenses.forEach(t=>{if(t.dueDay&&!t.dueDate){let n=e.getFullYear(),r=e.getMonth()+1,i=Math.min(t.dueDay,new Date(n,r,0).getDate());t.dueDate=`${n}-${String(r).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`,delete t.dueDay}t.frequency===`annual`&&(t.frequency=`annually`)})}return t}catch{return JSON.parse(JSON.stringify(Fs))}}function H(e){if(ie(e),bs&&(e.activityLog||(e.activityLog=[]),e.activityLog.unshift(bs),e.activityLog.length>200&&(e.activityLog.length=200),bs=null),localStorage.setItem(Os,JSON.stringify(e)),V){let t=gs();t&&t.set(e).catch(e=>{console.error(`Firestore save error:`,e)})}}window._saveData=H;var Ls=`toto_device_profile`,Rs=`toto_kid_session`,U=null,zs=!1,W=0,Bs=0,G=``,Vs=null,Hs={};function Us(){return window.Capacitor?.Plugins?.Preferences??null}async function Ws(e){let t=Us();for(let n of e)if(t)try{let{value:e}=await t.get({key:n});Hs[n]=e}catch{Hs[n]=localStorage.getItem(n)}else Hs[n]=localStorage.getItem(n)}function Gs(e){return e in Hs?Hs[e]:localStorage.getItem(e)}function Ks(e,t){Hs[e]=t,localStorage.setItem(e,t);let n=Us();n&&n.set({key:e,value:t}).catch(()=>{})}function qs(e){delete Hs[e],localStorage.removeItem(e);let t=Us();t&&t.remove({key:e}).catch(()=>{})}function Js(){return Gs(Ls)}function Ys(e){Ks(Ls,e)}function Xs(){qs(Ls)}function Zs(){return Gs(Rs)}function Qs(e){Ks(Rs,String(e))}function $s(){qs(Rs)}Ws([ps,Ls,Rs]);async function ec(e,t){let n=t||`toto-pin-`,r=await crypto.subtle.digest(`SHA-256`,new TextEncoder().encode(n+e));return Array.from(new Uint8Array(r)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}function tc(){if(zs||!m.onboarded)return;zs=!0;let e=Js();if(!e){nc();return}if(e===`adult`){U=null,dc();return}if(e===`shared`){ic();return}let t=(m.kids?.profiles||[]).find(t=>t.id===e);if(!t){Xs(),nc();return}if(String(Zs())===String(t.id)){U={id:t.id,name:t.name,emoji:t.emoji,role:`child`},fc();return}t.pinHash?(Vs=t.id,G=``,W=0,sc(t)):(U={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Qs(t.id),fc())}function nc(){let e=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name),t=m.kids?.profiles||[],n=``,r=e.length?e.map(e=>e.name).join(` / `):`Adult`;n+=`<div class="profile-card" onclick="assignDevice('adult')">
    <div class="profile-avatar">👤</div>
    <div style="flex:1">
      <div style="font-size:15px;font-weight:700;color:#1e293b">${x(r)}</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">Adult — opens straight to the full app</div>
    </div>
  </div>`,t.forEach(e=>{n+=`<div class="profile-card" onclick="assignDevice('${e.id}')">
      <div class="profile-avatar">${x(e.emoji||`😊`)}</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${x(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">Kid's device — ${e.pinHash?`requires PIN to open`:`no PIN set yet`}</div>
      </div>
    </div>`}),t.length||(n+=`<div style="padding:12px 16px;background:#fef9c3;border-radius:10px;font-size:13px;color:#854d0e">No kids set up yet. Add kids in the Kids tab first, then assign a device.</div>`),n+=`<div class="profile-card" onclick="assignDevice('shared')" style="border-style:dashed">
    <div class="profile-avatar">👨‍👩‍👧‍👦</div>
    <div style="flex:1">
      <div style="font-size:15px;font-weight:700;color:#1e293b">Everyone (shared)</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">Shows profile picker every time the app opens</div>
    </div>
  </div>`,document.getElementById(`profile-list`).innerHTML=n,document.getElementById(`profile-overlay-title`).textContent=`Who uses this device?`,document.getElementById(`profile-overlay-sub`).textContent=`Set it once — the app will open straight to the right view. You can change this any time in Settings.`,document.getElementById(`profile-overlay`).classList.remove(`hidden`)}function rc(e){if(Ys(e),zs=!0,document.getElementById(`profile-overlay`).classList.add(`hidden`),e===`adult`)U=null,dc(),renderAll();else if(e===`shared`)ic();else{let t=(m.kids?.profiles||[]).find(t=>t.id===e);if(!t){U=null,pc(),renderAll();return}t.pinHash?(Vs=t.id,G=``,W=0,sc(t)):(U={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Qs(t.id),fc())}}function ic(){document.getElementById(`pin-overlay`).classList.add(`hidden`);let e=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name),t=m.kids?.profiles||[],n=``;e.forEach((e,t)=>{let r=!!e.pinHash;n+=`<div class="profile-card" onclick="_pickAdult(${t})">
      <div class="profile-avatar">🧑</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${x(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">${t===0?`Owner`:`Member`} · ${r?`PIN login`:`Tap to enter`}</div>
      </div>
      <div style="font-size:12px;color:#0891b2;font-weight:600">${r?`PIN →`:`Enter →`}</div>
    </div>`}),t.forEach(e=>{n+=`<div class="profile-card" onclick="_pickKid('${e.id}')">
      <div class="profile-avatar">${x(e.emoji||`😊`)}</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${x(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">Kid · ${e.pinHash?`PIN login`:`Tap to enter`}</div>
      </div>
      <div style="font-size:12px;color:#0891b2;font-weight:600">${e.pinHash?`PIN →`:`Enter →`}</div>
    </div>`}),document.getElementById(`profile-list`).innerHTML=n,document.getElementById(`profile-overlay-title`).textContent=`Who's using Toto?`,document.getElementById(`profile-overlay-sub`).textContent=`Tap your name to continue`,document.getElementById(`profile-overlay`).classList.remove(`hidden`)}function ac(e){let t=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name)[e??0];if(t?.pinHash){Vs=`adult:`+(e??0),G=``,W=0,Bs=0,sc({emoji:`🧑`,name:t.name,_isAdult:!0,_memberIndex:e??0});return}U=null,$s(),document.getElementById(`profile-overlay`).classList.add(`hidden`),fc()}function oc(e){let t=(m.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(t.pinHash?(Vs=e,G=``,W=0,sc(t)):(U={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Qs(t.id),document.getElementById(`profile-overlay`).classList.add(`hidden`),fc()))}function sc(e){document.getElementById(`profile-overlay`).classList.add(`hidden`),document.getElementById(`pin-avatar`).textContent=e.emoji||(e._isAdult?`🧑`:`😊`),document.getElementById(`pin-greeting`).textContent=`Hi ${e.name}! 👋`,document.getElementById(`pin-sub`).textContent=`Enter your PIN to continue`,document.getElementById(`pin-error`).textContent=``,cc(),lc(),document.getElementById(`pin-overlay`).classList.remove(`hidden`)}function cc(){let e=document.getElementById(`pin-dots`);e&&(e.innerHTML=[0,1,2,3].map(e=>`<div class="pin-dot ${e<G.length?`filled`:``}">${e<G.length?`●`:``}</div>`).join(``))}function lc(){let e=document.getElementById(`pin-pad`);if(!e)return;let t=Date.now();if(t<Bs){let n=Math.ceil((Bs-t)/1e3);document.getElementById(`pin-error`).textContent=`Too many attempts — try again in ${n}s`,e.innerHTML=``,setTimeout(lc,1e3);return}e.innerHTML=[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<div class="pin-key empty"></div>`:`<div class="pin-key" onclick="_pinKey('${e}')">${e}</div>`).join(``)}function uc(e){if(!(Date.now()<Bs)){if(e===`⌫`){G=G.slice(0,-1),cc();return}G.length>=4||(G+=e,cc(),G.length===4&&Ql())}}function dc(){let e=document.getElementById(`header-switch-profile`);if(!e)return;let t=Js();e.style.display=t&&t!==`adult`?``:`none`}function fc(){dc(),pc(),U?.role===`child`?(window.kidsView=U.id,b(`kids`),Ac(U.id)):document.querySelectorAll(`.nav-item, .nav-text-item`).forEach(e=>e.style.display=``),renderAll()}function pc(){let e=U?.role===`child`;document.body.classList.toggle(`kid-mode`,e);let t=document.getElementById(`kid-banner-label`);t&&e&&(t.textContent=`${U.emoji||`😊`} ${U.name}'s view`);let n=Js(),r=document.getElementById(`header-switch-profile`);if(r){let t=n&&n!==`adult`;if(r.style.display=t?``:`none`,t)if(e)r.textContent=`👨‍👩‍👧 Parent`;else{let e=(m.kids?.profiles||[]).find(e=>e.id===n);r.textContent=e?`Back to ${e.name}`:`Switch`}}}function mc(){let e=Js();if(U?.role===`child`)$s(),U=null,pc(),renderAll();else if(e===`shared`)ic();else if(e&&e!==`adult`){let t=(m.kids?.profiles||[]).find(t=>t.id===e);t&&(t.pinHash?(Vs=t.id,G=``,W=0,sc(t)):(U={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Qs(t.id),fc()))}}async function hc(e,t){let n=(m.kids?.profiles||[]).find(t=>String(t.id)===String(e));!n||t.length!==4||(n.pinHash=await ec(t,hs()),H(m))}function gc(e){let t=(m.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(delete t.pinHash,H(m))}function _c(e){(m.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name)[e]&&(yc=e,xc=``,K=``,bc=`enter`,Sc(),document.getElementById(`adult-pin-modal`).classList.remove(`hidden`))}function vc(e){let t=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name);t[e]&&(delete t[e].pinHash,H(m),Ki())}var yc=0,bc=`enter`,xc=``,K=``;function Sc(){let e=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name)[yc];if(!e)return;let t=bc===`enter`,n=t?e.pinHash?`Change your PIN 🔢`:`Set your PIN 🔢`:`Confirm your PIN ✅`,r=t?`Pick 4 numbers — used on shared devices`:`Enter it again to confirm`,i=[0,1,2,3].map(e=>{let t=e<K.length;return`<div style="width:52px;height:60px;border:2px solid ${t?`#0891b2`:`#e2e8f0`};border-radius:10px;background:${t?`#ecfeff`:`#f8fafc`};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#0891b2">${t?`●`:``}</div>`}).join(``),a=[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<div></div>`:`<div onclick="_adultPinKey('${e}')" style="height:52px;border:1.5px solid #e2e8f0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;color:#374151;cursor:pointer;background:#fff;-webkit-tap-highlight-color:transparent;user-select:none">${e}</div>`).join(``);document.getElementById(`adult-pin-modal-body`).innerHTML=`
    <div style="font-size:40px;margin-bottom:12px">${t?`🔢`:`✅`}</div>
    <div style="font-size:18px;font-weight:700;color:#1e293b;margin-bottom:6px">${n}</div>
    <div style="font-size:13px;color:#64748b;margin-bottom:20px">${r}</div>
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px">${i}</div>
    <div id="adult-pin-error" style="font-size:13px;color:#ef4444;min-height:18px;margin-bottom:12px"></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:220px;margin:0 auto 20px">${a}</div>
    <button onclick="document.getElementById('adult-pin-modal').classList.add('hidden')" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`}function Cc(e){if(e===`⌫`){K=K.slice(0,-1),Sc();return}K.length>=4||(K+=e,Sc(),K.length===4&&wc())}async function wc(){if(bc===`enter`)xc=K,K=``,bc=`confirm`,Sc();else{if(K!==xc){K=``,xc=``,bc=`enter`,Sc();let e=document.getElementById(`adult-pin-error`);e&&(e.textContent=`Those didn't match — try again`);return}let e=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name);e[yc].pinHash=await ec(K,hs()),H(m),document.getElementById(`adult-pin-modal`).classList.add(`hidden`),Ki()}}function Tc(e){let t=Number(e.age||0);return t<5?`tiny-tots`:t<8?`early-reader`:t<12?`independent`:`tween`}function Ec(){let e=new Date().getHours();return e<12?`Good morning`:e<17?`Good afternoon`:`Good evening`}function Dc(e){if(!e.triggerTime)return!0;let[t,n]=e.triggerTime.split(`:`).map(Number),r=new Date,i=r.getHours()*60+r.getMinutes(),a=t*60+(n||0),o=a+360;return i>=a&&i<o}function Oc(e){if(!e.triggerTime)return``;let[t]=e.triggerTime.split(`:`).map(Number);return t<12?`Available this morning`:t<17?`Available this afternoon`:`Available tonight`}function kc(){let e=document.getElementById(`child-view-overlay`);if(!e)return;let t=document.getElementById(`cv-confetti-wrap`);t&&t.remove(),t=document.createElement(`div`),t.id=`cv-confetti-wrap`,t.className=`cv2-confetti-wrap`,e.appendChild(t);let n=[`#5B4CF5`,`#7C3AED`,`#F59E0B`,`#10B981`,`#F43F5E`,`#FBBF24`];for(let e=0;e<60;e++){let r=document.createElement(`div`);r.className=`cv2-confetti-particle`,r.style.cssText=`
      left:${Math.random()*100}%;
      background:${n[e%n.length]};
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*8}px;
      animation-duration:${1.4+Math.random()*1.4}s;
      animation-delay:${Math.random()*.6}s;
    `,t.appendChild(r)}setTimeout(()=>{t.parentNode&&t.remove()},3500)}function Ac(e){let t=(m.kids?.profiles||[]).find(t=>String(t.id)===String(e));if(!t)return;Nc=e,Pc=`today`;let n=m.kids,r=kidBalance(n,t.id),i=Tc(t),a=i===`tiny-tots`,o=i===`tween`,s=_cvReadOnly,c=document.getElementById(`child-view-overlay`);document.getElementById(`cv-avatar`).textContent=t.emoji||`😊`,document.getElementById(`cv-name`).innerHTML=`<span class="ember-text">${x(t.name)}</span>`,document.getElementById(`cv-greeting`).textContent=Ec()+`!`;let l=(n.completions||[]).filter(e=>e.kidId===t.id&&e.status===`approved`&&new Date(e.completedAt||e.ts).toDateString()===new Date().toDateString()).reduce((e,t)=>e+((n.chores||[]).find(e=>e.id===t.choreId)?.points||0),0),u=document.getElementById(`cv-nudge`);l>0&&!a&&!s?(u.textContent=`You've earned ⭐ ${l} points today — keep going!`,u.style.display=``):u.style.display=`none`,c.className=c.className.replace(/cv2-age-\S+/g,``).trim(),i===`early-reader`&&c.classList.add(`cv2-age-early`),a&&c.classList.add(`cv2-age-tiny`),o&&c.classList.add(`cv2-age-tween`);let d=document.getElementById(`cv-nav`);d&&(d.style.display=a?`none`:``),document.getElementById(`cv-nav-today`)?.classList.add(`active`),document.getElementById(`cv-nav-calendar`)?.classList.remove(`active`),document.getElementById(`cv-nav-prizes`)?.classList.remove(`active`),jc(t);let f=new Date().toISOString().slice(0,10),p=(m.routineAssignments||[]).filter(e=>{if(e.childId!==t.id)return!1;let n=(m.routines||[]).find(t=>t.id===e.routineId);return n&&_routineMatchesDate(n,f)}),h=_routineTodayKey(),g=``,_=0,v=0;p.length&&p.forEach(e=>{let n=(m.routines||[]).find(t=>t.id===e.routineId);if(!n)return;let r=e.completionState?.[h]||[],i=n.steps.length,o=i>0?Math.round(r.length/i*100):0,c=r.length===i&&i>0,l=Dc(n);v+=i,_+=r.length;let u=l?``:Oc(n),d=_assignmentStreak(e,i),f=_assignmentHistory(e,i,7).filter(e=>e.done===e.total&&e.total>0).length;if(g+=`<div class="cv2-card${l?``:` cv2-card--locked`}" style="margin-bottom:10px">
        <div class="cv2-routine-header">
          <div class="cv2-routine-title">
            <span>${n.emoji}</span>
            <span class="cv2-routine-name">${x(n.name)}</span>
            ${d>0&&!a?`<span style="font-size:11px;font-weight:700;color:#f59e0b;background:#fffbeb;border-radius:99px;padding:2px 8px">🔥 ${d}d</span>`:``}
          </div>
          ${l?`<span class="cv2-routine-frac">${r.length}/${i}${n.pointsPerCompletion>0?` · ⭐${n.pointsPerCompletion}`:``}</span>`:`<span class="cv2-routine-lock">🔒 ${x(u)}</span>`}
        </div>
        <div class="cv2-progress"><div class="cv2-progress-fill" style="width:${o}%"></div></div>
        ${f>0&&!a?`<div style="padding:4px 16px 0;font-size:11px;color:#94a3b8">Completed ${f} of the last 7 days</div>`:``}
        <div class="cv2-steps">`,i?n.steps.forEach(e=>{let i=r.includes(e.id),o=l&&!s,c=i?`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``;g+=`<div class="cv2-step" style="${o?``:`cursor:default`}"
            ${o?`onclick="_routineToggleStepKid(${JSON.stringify(n.id)},${JSON.stringify(e.id)},'${t.id}')"`:``}>
            <div class="cv2-step-check${i?` cv2-step-check--done`:``}">${c}</div>
            <span class="cv2-step-emoji">${e.emoji}</span>
            <span class="cv2-step-label${i?` cv2-step-label--done`:``}">${x(e.label)}</span>
            ${e.points>0&&!a?`<span class="cv2-step-pts">⭐ ${e.points}</span>`:``}
          </div>`}):g+=`<div style="padding:12px 16px;font-size:13px;color:#94a3b8;text-align:center">No steps added yet</div>`,g+=`</div>`,c){let t=_assignmentStreak(e,i),r=t>1?` · 🔥 ${t} day streak!`:``;g+=`<div class="cv2-routine-done">✓ All done! Great work${n.pointsPerCompletion>0&&!a?` · ⭐ ${n.pointsPerCompletion} bonus pts`:``}!${r}</div>`}else if(l){let t=_assignmentStreak(e,i);t>0&&!a&&(g+=`<div style="padding:4px 16px 8px;font-size:11px;font-weight:700;color:#f59e0b">🔥 ${t} day streak — keep it up!</div>`)}g+=`</div>`});let y=(n.chores||[]).filter(e=>(e.assignedTo===t.id||e.assignedTo===`all`)&&!e._isRoutine),b=(n.completions||[]).filter(e=>e.kidId===t.id&&e.status===`pending`);v+=y.length,_+=y.filter(e=>b.some(t=>t.choreId===e.id)).length;let S=``;y.length&&y.forEach(e=>{let n=b.some(t=>t.choreId===e.id);S+=`<div class="cv2-chore">
        <span class="cv2-chore-emoji">${e.emoji||`📋`}</span>
        <div class="cv2-chore-info">
          <div class="cv2-chore-name">${x(e.name)}</div>
          ${a?``:`<div class="cv2-chore-pts">⭐ ${e.points} · ${e.frequency}</div>`}
        </div>
        ${n?`<span class="cv2-chore-done-badge">${a?`⭐`:`Waiting ✓`}</span>`:s?`<span class="cv2-chore-done-badge" style="background:#F0EFF8;color:#A1A1AA">Not done</span>`:`<button class="cv2-chore-btn" onclick="markChoreChildView('${t.id}','${e.id}')">${a?`✅`:`Done ✓`}</button>`}
      </div>`});let C=Ar(0),ee=new Date().getDay()===0?6:new Date().getDay()-1,w=m.meals?.lunchbox?.plans?.[C]||{},T=w[w[t.id]===void 0?(m.meals?.lunchbox?.profiles||[]).find(e=>e.name?.toLowerCase()===t.name?.toLowerCase())?.id??t.id:t.id]?.[ee]||{},E=[`main`,`snack`,`fruit`,`drink`],D=E.map(e=>T[e]).filter(Boolean),te={main:`🥪`,snack:`🍪`,fruit:`🍎`,drink:`🥤`},ne=``;if(D.length){let e=``;E.forEach(t=>{T[t]&&(e+=`<div class="cv2-lb-chip">${te[t]}${a?``:` `+x(T[t])}</div>`)}),ne=`<div class="cv2-group">
      <div class="cv2-group-heading">🥪 Lunchbox</div>
      <div class="cv2-card cv2-card--warm">
        <div class="cv2-lb-chips">${e}</div>
      </div>
    </div>`}let{events:O}=zc(t,f),k=[...O].sort((e,t)=>(e.time||`99:99`).localeCompare(t.time||`99:99`)),re=``;k.length&&!a&&(re=`<div class="cv2-group">
      <div class="cv2-group-heading">📅 Today's Events</div>
      <div class="cv2-card">${k.map(e=>`
      <div class="cv2-event-row">
        <span class="cv2-event-time">${e.time?Bc(e.time):``}</span>
        <div class="cv2-event-bar"></div>
        <span class="cv2-event-emoji">${e.emoji}</span>
        <div class="cv2-event-body">
          <div class="cv2-event-title">${x(e.label)}</div>
          ${e.notes?`<div class="cv2-event-sub">${x(e.notes)}</div>`:``}
        </div>
      </div>`).join(``)}</div>
    </div>`);let A=(n.prizes||[]).filter(e=>r>=e.pointCost),j=``;if(!a){let e=A.length?`<div style="display:flex;align-items:center;gap:10px;padding:14px 15px">
          <span style="font-size:28px">${A[0].emoji||`🎁`}</span>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:700;color:#18181B">You can afford ${A.length} prize${A.length>1?`s`:``}!</div>
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
    </div>`}let M=(n.notifications||[]).filter(e=>e.kidId===t.id&&!e.read),ie=``;M.length&&!s&&(ie=M.map(e=>{let n=e.type===`prize_approved`;return`<div class="cv2-notif-bar ${n?`cv2-notif-bar--approved`:`cv2-notif-bar--declined`}">
        <span>${n?`${e.prizeEmoji} <strong>${x(e.prizeName)}</strong> approved! You can redeem it now.`:`${e.prizeEmoji} <strong>${x(e.prizeName)}</strong> request was declined.`}</span>
        <button class="cv2-notif-dismiss" onclick="_cvDismissNotif('${e.id}','${t.id}')">×</button>
      </div>`}).join(``));let ae=v>0&&_===v,N;ae&&!s?N=`<div class="cv2-celebration">
      <div class="cv2-celeb-emoji">${a?`🌟`:`🏆`}</div>
      <div class="cv2-celeb-title">${a?`🎉 Yay!`:`Amazing work, ${x(t.name)}!`}</div>
      <div class="cv2-celeb-sub">${a?`All done! You're a star!`:`You've finished everything for today. You're a superstar! ⭐`}</div>
    </div>
    ${re}${ne}${j}`:(N=ie,i!==`tiny-tots`&&!s&&(N+=`<button class="cv2-week-shortcut" onclick="_cvSwitchTab('calendar','${t.id}')">📅 See my week →</button>`),p.length&&(N+=`<div class="cv2-group">
        <div class="cv2-group-heading">📋 My Routines</div>
        ${g}
      </div>`),y.length&&(N+=`<div class="cv2-group">
        <div class="cv2-group-heading">🧹 Chores</div>
        <div class="cv2-card">${S}</div>
      </div>`),N+=re,N+=ne,N+=j),document.getElementById(`cv-content`).innerHTML=N,c.classList.remove(`hidden`),c.style.display=`flex`,ae&&!s&&kc()}function jc(e){let t=document.getElementById(`cv-prizes-badge`);if(!t)return;let n=m.kids,r=kidBalance(n,e.id),i=(n.notifications||[]).filter(t=>t.kidId===e.id&&!t.read).length,a=(n.prizes||[]).filter(e=>r>=e.pointCost).length,o=i+(a>0&&i===0?a:0);o>0?(t.textContent=o>9?`9+`:String(o),t.style.display=``):t.style.display=`none`}function Mc(e){let t=m.kids,n=kidBalance(t,e.id),r=Tc(e)===`tiny-tots`,i=_cvReadOnly,a=t.prizes||[],o=!1;(t.notifications||[]).filter(t=>t.kidId===e.id&&!t.read).forEach(e=>{e.read=!0,o=!0}),o&&H(m),jc(e);let s=r?`${`⭐`.repeat(Math.min(n,10))}${n>10?`+`:``}`:`${n}`,c=`<div class="cv2-prizes-balance">
    <div class="cv2-prizes-balance-left">
      <div class="cv2-prizes-balance-pts">${r?s:`⭐ ${s}`}</div>
      <div class="cv2-prizes-balance-lbl">${r?`stars earned`:`points to spend`}</div>
    </div>
    <span class="cv2-prizes-balance-emoji">🏆</span>
  </div>`;c+=`<div class="cv2-group-heading" style="margin-bottom:8px">Prizes</div>`,a.length?(c+=`<div class="cv2-card cv2-card--warm" style="margin-bottom:18px">`,a.forEach(t=>{let a=n>=t.pointCost;c+=`<div class="cv2-prize">
        <span class="cv2-prize-emoji">${t.emoji||`🎁`}</span>
        <div class="cv2-prize-info">
          <div class="cv2-prize-name">${x(t.name)}</div>
          ${r?``:`<div class="cv2-prize-cost">⭐ ${t.pointCost} points</div>`}
        </div>
        <button class="cv2-prize-btn ${a?`cv2-prize-btn--can`:`cv2-prize-btn--cant`}"
          ${a&&!i?`onclick="_cvShowPrizeConfirm('${e.id}','${t.id}')"`:`disabled`}>
          ${a?r?`🎁`:`Redeem`:r?`🔒`:`⭐ ${t.pointCost}`}
        </button>
      </div>`}),c+=`</div>`):c+=`<div style="text-align:center;padding:24px 0;color:#A1A1AA;font-size:13px">No prizes set up yet</div>`;let l=(t.redemptions||[]).filter(t=>t.kidId===e.id).sort((e,t)=>(t.ts||t.requestedAt||0)>(e.ts||e.requestedAt||0)?1:-1).slice(0,8);l.length&&(c+=`<div class="cv2-group-heading" style="margin-bottom:8px">Recent</div>`,c+=`<div class="cv2-card">`,l.forEach(e=>{let t=a.find(t=>t.id===e.prizeId);if(!t)return;let n={approved:{label:`✓ Approved`,bg:`#f0fdf4`,color:`#15803d`},rejected:{label:`Declined`,bg:`#fef2f2`,color:`#b91c1c`},pending:{label:`⏳ Waiting`,bg:`#fffbeb`,color:`#854d0e`}},r=n[e.status]||n.pending,i=e.approvedAt||e.ts||e.requestedAt,o=i?new Date(i).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}):``;c+=`<div class="cv2-redeem-history-row">
        <span style="font-size:20px">${t.emoji||`🎁`}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:#18181B">${x(t.name)}</div>
          ${o?`<div style="font-size:11px;color:#94a3b8">${o}</div>`:``}
        </div>
        <span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:99px;background:${r.bg};color:${r.color}">${r.label}</span>
      </div>`}),c+=`</div>`);let u=document.getElementById(`cv-content`);u&&(u.innerHTML=c)}var Nc=null,Pc=`today`,Fc=`7day`,Ic=null,Lc=new Set;function Rc(e,t){t&&(Nc=t);let n=(m.kids?.profiles||[]).find(e=>String(e.id)===String(Nc));if(!n)return;let r=Tc(n),i=document.getElementById(`cv-nav`);i&&(i.style.display=r===`tiny-tots`?`none`:``),document.getElementById(`cv-nav-today`)?.classList.toggle(`active`,e===`today`),document.getElementById(`cv-nav-calendar`)?.classList.toggle(`active`,e===`calendar`),document.getElementById(`cv-nav-prizes`)?.classList.toggle(`active`,e===`prizes`),e===`today`?Ac(Nc):e===`prizes`?Mc(n):(Ic=null,Kc(n))}function zc(e,t){let n=(m.routineAssignments||[]).filter(t=>t.childId===e.id).map(e=>{let n=(m.routines||[]).find(t=>t.id===e.routineId);return n&&_routineMatchesDate(n,t)?{type:`routine`,routine:n,assignment:e,label:n.name,emoji:n.emoji,color:`#7C3AED`,tag:`Routine`,time:n.triggerTime||null}:null}).filter(Boolean),r=(m.childEvents||[]).filter(n=>{let r=Array.isArray(n.assignedTo)?n.assignedTo:[n.assignedTo];return r.includes(e.id)||r.includes(`all`)||n.isHouseholdWide?n.recurrence?_recurrenceMatchesDate(n.recurrence,t):n.date===t:!1}).map(e=>({type:`event`,label:e.title,emoji:e.emoji||`📅`,color:`#10b981`,tag:`Event`,notes:e.notes,time:e.time||null})),i=(m.planner?.events||[]).filter(e=>Lt(e).includes(`everyone`)?e.recurrence&&e.recurrence.type!==`one_time`?_recurrenceMatchesDate(e.recurrence,t):e.endDate&&e.endDate>e.date?t>=e.date&&t<=e.endDate:e.date===t:!1).map(e=>({type:`event`,label:e.title,emoji:P[e.category]?.emoji||`📅`,color:`#10b981`,tag:`Event`,notes:e.notes||``,time:e.time||null}));return{routines:n,events:[...r,...i],chores:(m.kids?.chores||[]).filter(t=>(t.assignedTo===e.id||t.assignedTo===`all`)&&!t._isRoutine).map(e=>({type:`chore`,label:e.name,emoji:e.emoji||`📋`,color:`#ec4899`,tag:`Chore`,time:null}))}}function Bc(e){if(!e)return``;let[t,n]=e.split(`:`).map(Number);return`${t%12||12}:${String(n).padStart(2,`0`)} ${t>=12?`pm`:`am`}`}function Vc(e){Lc.has(e)?Lc.delete(e):Lc.add(e);let t=(m.kids?.profiles||[]).find(e=>String(e.id)===String(Nc));t&&(Fc===`7day`||Tc(t)===`early-reader`?Uc(t,new Date().toISOString().slice(0,10)):Uc(t,Ic))}function Hc(e,t,n){if(_cvReadOnly)return;let r=_routineGetAssignment(e,Nc);if(!r)return;r.completionState||(r.completionState={});let i=n;r.completionState[i]||(r.completionState[i]=[]);let a=r.completionState[i].indexOf(t),o=a===-1;o?r.completionState[i].push(t):r.completionState[i].splice(a,1);let s=new Date().toISOString().slice(0,10);if(o&&n===s){let n=(m.routines||[]).find(t=>String(t.id)===String(e));if(n){let e=n.steps.find(e=>e.id===t);(e?.points||0)>0&&_routineAwardStepPoints(n,e,Nc);let a=n.steps.length;r.completionState[i].length===a&&a>0&&(n.pointsPerCompletion||0)>0&&_routineAwardPoints(n,Nc)}}H(m);let c=(m.kids?.profiles||[]).find(e=>String(e.id)===String(Nc));c&&Uc(c,n)}function Uc(e,t){let n=Fc===`month`?`cv-day-panel`:`cv-schedule-panel`,r=document.getElementById(n);r&&(r.innerHTML=Wc(e,t))}function Wc(e,t){if(!t)return``;let{routines:n,events:r,chores:i}=zc(e,t),a=t;if(!n.length&&!r.length&&!i.length)return`<div style="text-align:center;padding:28px 0;color:#A1A1AA;font-size:13px">Nothing scheduled</div>`;let o=[...n.map(e=>({...e,sortKey:e.time||`23:59`})),...r.map(e=>({...e,sortKey:e.time||`23:59`}))].sort((e,t)=>e.sortKey.localeCompare(t.sortKey)),s=``;return o.length&&(s+=`<div class="cv-sched-section-hdr">Schedule</div>`,o.forEach(e=>{e.type===`routine`?s+=Gc(e.routine,e.assignment,a):s+=`<div class="cv-sched-item">
          <div class="cv-sched-row">
            <span class="cv-sched-time">${e.time?Bc(e.time):``}</span>
            <div class="cv-sched-color-bar" style="background:${e.color}"></div>
            <span class="cv-sched-emoji">${e.emoji}</span>
            <div class="cv-sched-body">
              <div class="cv-sched-title">${x(e.label)}</div>
              ${e.notes?`<div class="cv-sched-sub">${x(e.notes)}</div>`:``}
            </div>
            <span class="cv-sched-tag" style="background:${e.color}20;color:${e.color}">${e.tag}</span>
          </div>
        </div>`})),i.length&&(s+=`<div class="cv-sched-section-hdr">Chores</div>`,i.forEach(t=>{let n=(m.kids?.completions||[]).some(n=>n.kidId===e.id&&n.choreId===(m.kids?.chores||[]).find(e=>e.name===t.label)?.id&&n.status===`pending`);s+=`<div class="cv-sched-item">
        <div class="cv-sched-row">
          <span class="cv-sched-time"></span>
          <div class="cv-sched-color-bar" style="background:${t.color}"></div>
          <span class="cv-sched-emoji">${t.emoji}</span>
          <div class="cv-sched-body">
            <div class="cv-sched-title">${x(t.label)}</div>
          </div>
          ${n?`<span class="cv-sched-tag" style="background:#fef9c320;color:#854d0e">Waiting ✓</span>`:`<span class="cv-sched-tag" style="background:${t.color}20;color:${t.color}">Chore</span>`}
        </div>
      </div>`})),s}function Gc(e,t,n){let r=t.completionState?.[n]||[],i=e.steps.length,a=i>0?Math.round(r.length/i*100):0,o=r.length===i&&i>0,s=Lc.has(e.id),c=i>0?`
    <div class="cv-sched-progress">
      <div class="cv-sched-prog-bar"><div class="cv-sched-prog-fill" style="width:${a}%"></div></div>
      <span style="font-size:11px;color:#94a3b8;font-weight:600">${r.length}/${i}</span>
    </div>`:``,l=``;return s&&i>0&&(l=`<div class="cv-sched-steps">`,e.steps.forEach(t=>{let i=r.includes(t.id),a=!_cvReadOnly,o=i?`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``;l+=`<div class="cv-sched-step" ${a?`onclick="_cvToggleStepFromCal(${JSON.stringify(e.id)},${JSON.stringify(t.id)},'${n}')"`:`style="cursor:default"`}>
        <div class="cv-sched-step-check${i?` cv-sched-step-check--done`:``}">${o}</div>
        <span class="cv-sched-step-emoji">${t.emoji}</span>
        <span class="cv-sched-step-label${i?` cv-sched-step-label--done`:``}">${x(t.label)}</span>
        ${t.points>0?`<span class="cv-sched-step-pts">⭐ ${t.points}</span>`:``}
      </div>`}),l+=`</div>`,o&&(l+=`<div style="text-align:center;padding:8px;font-size:12px;font-weight:700;color:#5B4CF5;background:#f5f3ff">✓ All done! 🎉</div>`)),`<div class="cv-sched-item">
    <div class="cv-sched-row" style="cursor:pointer" onclick="_cvToggleRoutineExpand(${JSON.stringify(e.id)})">
      <span class="cv-sched-time">${e.triggerTime?Bc(e.triggerTime):``}</span>
      <div class="cv-sched-color-bar" style="background:#7C3AED"></div>
      <span class="cv-sched-emoji">${e.emoji}</span>
      <div class="cv-sched-body">
        <div class="cv-sched-title">${x(e.name)}</div>
        ${o?`<div class="cv-sched-sub" style="color:#5B4CF5;font-weight:700">✓ Complete</div>`:e.triggerTime?`<div class="cv-sched-sub">${Bc(e.triggerTime)}</div>`:``}
      </div>
      ${c}
      <button class="cv-sched-expand-btn">${s?`▲`:`▼`}</button>
    </div>
    ${l}
  </div>`}function Kc(e){if(!e)return;let t=Tc(e)===`early-reader`,n=t?`7day`:Fc,r=new Date().toISOString().slice(0,10),i=document.getElementById(`cv-content`);if(!i)return;let a=``;t||(a+=`<div style="display:flex;gap:8px;margin-bottom:14px">
      <button class="cv2-nav-tab cv-cal-month-toggle" style="border-radius:99px;padding:6px 16px;flex:none;${n===`7day`?`color:#5B4CF5;border-bottom-color:#5B4CF5`:``}"
        onclick="_cvCalViewToggle('7day','${e.id}')">Week</button>
      <button class="cv2-nav-tab cv-cal-month-toggle" style="border-radius:99px;padding:6px 16px;flex:none;${n===`month`?`color:#5B4CF5;border-bottom-color:#5B4CF5`:``}"
        onclick="_cvCalViewToggle('month','${e.id}')">Month</button>
    </div>`),a+=n===`7day`?Jc(e,r):Xc(e,r),i.innerHTML=a}function qc(e,t){Fc=e,Ic=null;let n=(m.kids?.profiles||[]).find(e=>String(e.id)===String(t));n&&Kc(n)}function Jc(e,t){let n=[`S`,`M`,`T`,`W`,`T`,`F`,`S`],r=new Date(t+`T12:00:00`),i=`<div class="cv-week-strip">`;for(let a=0;a<7;a++){let o=new Date(r);o.setDate(r.getDate()+a);let s=o.toISOString().slice(0,10),c=s===t,{routines:l,events:u,chores:d}=zc(e,s),f=[...l,...u,...d].slice(0,3).map(e=>`<div class="cv-cal-dot" style="background:${e.color}"></div>`).join(``);i+=`<div class="cv-week-cell ${c?`cv-today`:``}" onclick="_cvWeekDayTap('${s}','${e.id}')">
      <div class="cv-week-dow">${n[o.getDay()]}</div>
      <div class="cv-week-date">${o.getDate()}</div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:3px">${f}</div>
    </div>`}i+=`</div>`;let a=new Date(t+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`});return i+=`<div style="font-size:13px;font-weight:700;color:#1e293b;margin:10px 0 2px">${x(a)}</div>`,i+=`<div id="cv-schedule-panel">${Wc(e,t)}</div>`,i}function Yc(e,t){let n=(m.kids?.profiles||[]).find(e=>String(e.id)===String(t));if(!n)return;Lc.clear(),document.querySelectorAll(`.cv-week-cell`).forEach(t=>{t.classList.toggle(`cv-today`,t.getAttribute(`onclick`)?.includes(`'${e}'`))});let r=new Date(e+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`}),i=document.getElementById(`cv-schedule-panel`);i&&(i.previousElementSibling.textContent=r,i.innerHTML=Wc(n,e))}function Xc(e,t){let n=new Date(t+`T12:00:00`),r=n.getFullYear(),i=n.getMonth(),a=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],o=[`S`,`M`,`T`,`W`,`T`,`F`,`S`],s=new Date(r,i,1).getDay(),c=new Date(r,i+1,0).getDate(),l=Ic||t,u=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
    <span style="font-size:14px;font-weight:800;color:#18181B">${a[i]} ${r}</span>
  </div>`;u+=`<div class="cv-cal-grid">`,o.forEach(e=>{u+=`<div class="cv-cal-day-hdr">${e}</div>`});for(let e=0;e<s;e++)u+=`<div class="cv-cal-cell cv-other"></div>`;for(let n=1;n<=c;n++){let a=`${r}-${String(i+1).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,o=a===t,s=a===l,{routines:c,events:d,chores:f}=zc(e,a),p=[...c,...d,...f].slice(0,3).map(e=>`<div class="cv-cal-dot" style="background:${e.color}"></div>`).join(``);u+=`<div class="cv-cal-cell ${o?`cv-today`:``} ${s&&!o?`cv-cal-cell--sel`:``}" onclick="_cvMonthDayTap('${a}','${e.id}')">
      <div class="cv-cal-cell-num">${n}</div>
      <div style="display:flex;flex-direction:column;align-items:center">${p}</div>
    </div>`}u+=`</div>`;let d=new Date(l+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`long`,day:`numeric`,month:`long`});return u+=`<div class="cv-month-day-panel">
    <div class="cv-month-day-panel-title">${x(d)}</div>
    <div id="cv-day-panel">${Wc(e,l)}</div>
  </div>`,u}function Zc(e,t){Ic=e,Lc.clear();let n=(m.kids?.profiles||[]).find(e=>String(e.id)===String(t));n&&Kc(n)}function Qc(e,t){Zc(e,t)}function $c(e,t){let n=(m.kids?.notifications||[]).find(t=>t.id===e);n&&(n.read=!0),H(m),Ac(t)}function el(e,t){let n=(m.kids?.prizes||[]).find(e=>String(e.id)===String(t));if(!n)return;let r=`<div class="cv2-confirm">
    <div class="cv2-confirm-emoji">${n.emoji||`🎁`}</div>
    <div class="cv2-confirm-title">${x(n.name)}</div>
    <div class="cv2-confirm-cost">⭐ ${n.pointCost} points</div>
    <button class="cv2-confirm-send" onclick="redeemPrizeChildView('${e}','${t}')">
      Send request ✉️
    </button>
    <button class="cv2-confirm-cancel" onclick="_cvSwitchTab('prizes','${e}')">Cancel</button>
  </div>`;document.getElementById(`cv-content`).innerHTML=r}function tl(e,t){m.kids.completions.find(n=>n.kidId===e&&n.choreId===t&&n.status===`pending`)||(m.kids.completions.push({id:uid(),kidId:e,choreId:t,status:`pending`,ts:new Date().toISOString()}),H(m),Ac(e))}function nl(e,t){m.kids.redemptions.push({id:uid(),kidId:e,prizeId:t,status:`pending`,ts:new Date().toISOString()}),H(m),Rc(`prizes`,e)}function rl(e){let t=(m.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(U={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Qs(t.id),Ac(e))}var il=`member`,al=null,ol=null;function sl(e){il=e;let t=document.getElementById(`inv-role-member`),n=document.getElementById(`inv-role-owner`);!t||!n||(e===`member`?(t.style.borderColor=`#0d9488`,t.style.background=`#f0fdfa`,t.style.color=`#0d9488`,n.style.borderColor=`var(--border)`,n.style.background=`var(--surface)`,n.style.color=`var(--text-muted)`):(n.style.borderColor=`#0d9488`,n.style.background=`#f0fdfa`,n.style.color=`#0d9488`,t.style.borderColor=`var(--border)`,t.style.background=`var(--surface)`,t.style.color=`var(--text-muted)`))}function cl(e,t){let n=document.getElementById(`inv-email`),r=n?n.value.trim():``,i=(m.householdProfile.members||[]).find(e=>e.role===`adult`)?.name||`Someone`,a=new Date(Date.now()+10080*60*1e3).toISOString(),o={id:uid(),email:r,role:il,inviterName:i,memberName:t||null,memberIdx:e??null,createdAt:new Date().toISOString(),expiresAt:a,status:`pending`};m.householdProfile.invites||(m.householdProfile.invites=[]),m.householdProfile.invites.push(o),H(m),al=o.id;let s=fl(o.id),c=document.getElementById(`invite-link-wrap`),l=document.getElementById(`invite-form-wrap`),u=document.getElementById(`invite-link-display`);c&&(c.dataset.invEmail=r,c.dataset.invToken=o.id,c.style.display=`block`),l&&(l.style.display=`none`),u&&(u.textContent=s)}function ll(e){let t=(m.householdProfile.members||[])[e];if(!t)return;let n=(m.householdProfile.members||[]).find((e,t)=>e.role===`adult`&&t===0)?.name||`Someone`,r=new Date(Date.now()+10080*60*1e3).toISOString(),i={id:uid(),email:``,role:`member`,inviterName:n,memberName:t.name||null,memberIdx:e,createdAt:new Date().toISOString(),expiresAt:r,status:`pending`};m.householdProfile.invites||(m.householdProfile.invites=[]),m.householdProfile.invites.push(i),H(m);let a=fl(i.id),o=x(t.name||`this person`),s=document.createElement(`div`);s.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9000;display:flex;align-items:center;justify-content:center;padding:24px`,s.innerHTML=`<div style="background:#fff;border-radius:16px;padding:24px;max-width:400px;width:100%">
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
  </div>`,document.body.appendChild(s),s.addEventListener(`click`,e=>{e.target===s&&(s.remove(),Ki())})}function ul(e){if(!e)return;let t=(m.kids?.profiles||[]).find(t=>t.name&&t.name.toLowerCase()===e.toLowerCase());if(!t){m.kids||(m.kids={profiles:[],chores:[],prizes:[],completions:[],redemptions:[]});let n=(m.householdProfile.members||[]).find(t=>t.name&&t.name.toLowerCase()===e.toLowerCase()),r=M(m.kids.profiles);t={id:r,name:e,age:n?.age||null,emoji:n?.emoji||`🧒`},m.kids.profiles.push(t),m.meals?.lunchbox?.profiles||(m.meals||(m.meals={}),m.meals.lunchbox||(m.meals.lunchbox={profiles:[]})),m.meals.lunchbox.profiles.push({id:r,name:e,emoji:t.emoji}),H(m)}zl(t.id)}function dl(e){navigator.clipboard.writeText(fl(e)).then(()=>{let e=event.target,t=e.textContent;e.textContent=`✓ Copied!`,setTimeout(()=>{e.textContent=t},2e3)})}function fl(e){let t=hs()||``;return window.location.origin+window.location.pathname+`?invite=`+e+`&h=`+t}function pl(){let e=document.getElementById(`invite-link-wrap`)?.dataset.invToken||al;e&&navigator.clipboard.writeText(fl(e)).then(()=>{let e=event.target,t=e.textContent;e.textContent=`✓ Copied!`,setTimeout(()=>{e.textContent=t},2e3)})}function ml(){let e=document.getElementById(`invite-link-wrap`),t=e?.dataset.invToken||al,n=e?.dataset.invEmail||``;if(!t)return;let r=(m.householdProfile.invites||[]).find(e=>e.id===t)?.inviterName||`Your partner`,i=fl(t),a=encodeURIComponent(`${r} invited you to join their Toto household`),o=encodeURIComponent(`Hi,\n\n${r} has invited you to join their Toto household — a shared family finance and planning app.\n\nClick the link below to accept the invite (expires in 7 days):\n\n${i}\n\nSee you there!`);window.open(`mailto:${n}?subject=${a}&body=${o}`,`_blank`)}function hl(e){if(!confirm(`Revoke this invite link?`))return;let t=(m.householdProfile.invites||[]).find(t=>t.id===e);t&&(t.status=`revoked`),H(m),Ki()}var gl=`toto_pending_invite`;function _l(){let e=new URLSearchParams(window.location.search),t=e.get(`invite`),n=e.get(`h`);t&&(sessionStorage.setItem(gl,t),n&&sessionStorage.setItem(ms,n),window.history.replaceState({},``,window.location.pathname+window.location.hash))}function vl(){let e=sessionStorage.getItem(gl);if(!e)return;let t=(m.householdProfile.invites||[]).find(t=>t.id===e);if(!t){sessionStorage.removeItem(gl);return}if(t.status!==`pending`||new Date(t.expiresAt)<new Date){sessionStorage.removeItem(gl),Al(t);return}sessionStorage.removeItem(gl),ol=t,yl(t)}function yl(t){let n=m.householdProfile.members||[],r=n.filter(e=>e.role===`adult`),i=n.filter(e=>e.role===`child`),a=(()=>{let t=new Date,n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`,r=getOrCreateMonthData(n);return(r.income||[]).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)-(r.expenses||[]).filter(e=>!e.skipped).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)})(),o=[...r.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ecfeff,#ccfbf1);display:flex;align-items:center;justify-content:center;font-size:20px">👤</div>
        <div><div style="font-size:14px;font-weight:600">${x(e.name||`Adult`)}</div><div style="font-size:12px;color:#64748b">Adult · Owner</div></div>
      </div>`),...i.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#fef9c3,#fde68a);display:flex;align-items:center;justify-content:center;font-size:20px">${e.emoji||`🧒`}</div>
        <div><div style="font-size:14px;font-weight:600">${x(e.name||`Kid`)}</div><div style="font-size:12px;color:#64748b">Kid · age ${e.age||`?`}</div></div>
      </div>`)].join(``);jl(`
    <div style="text-align:center;font-size:56px;margin-bottom:20px;margin-top:8px">🏡</div>
    <div style="font-size:22px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:6px;line-height:1.3">${x(t.inviterName||`Someone`)} invited you to join their Toto household</div>
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

    ${t.email?`<div style="font-size:12px;color:#94a3b8;text-align:center;margin-bottom:16px">Invite sent to <strong style="color:#475569">${x(t.email)}</strong> · Expires ${new Date(t.expiresAt).toLocaleDateString()}</div>`:``}

    <button onclick="_acceptInviteAndContinue()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:10px">Accept invite →</button>
    <div style="text-align:center"><a href="#" onclick="event.preventDefault();_dismissInviteFlow()" style="font-size:13px;color:#94a3b8;text-decoration:none">Not you? Ignore this invite</a></div>
  `)}function bl(){let t=ol,n=V?.displayName?.split(` `)[0]||`there`,r=m.householdProfile.members||[],i=r.filter(e=>e.role===`adult`),a=r.filter(e=>e.role===`child`),o=(()=>{let t=new Date,n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`,r=getOrCreateMonthData(n);return(r.income||[]).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)-(r.expenses||[]).filter(e=>!e.skipped).reduce((t,n)=>t+e(Number(n.amount)||0,n.frequency),0)})(),s=(m.goals||[]).length,c=[...i.map((e,t)=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ecfeff,#ccfbf1);display:flex;align-items:center;justify-content:center;font-size:20px">👤</div>
        <div>
          <div style="font-size:14px;font-weight:600">${x(e.name||`Adult`)}${t===i.length-1?` — <span style="color:#0d9488">that's you!</span>`:``}</div>
          <div style="font-size:12px;color:#64748b">${t===0?`Owner · set up the household`:`Member · just joined`}</div>
        </div>
      </div>`),...a.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#fef9c3,#fde68a);display:flex;align-items:center;justify-content:center;font-size:20px">${e.emoji||`🧒`}</div>
        <div><div style="font-size:14px;font-weight:600">${x(e.name||`Kid`)}</div><div style="font-size:12px;color:#64748b">Kid · age ${e.age||`?`}</div></div>
      </div>`)].join(``);jl(`
    <div style="text-align:center;font-size:56px;margin-bottom:12px;margin-top:8px">🎉</div>
    <div style="font-size:24px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:6px">You're in, ${x(n)}!</div>
    <div style="font-size:14px;color:#64748b;text-align:center;margin-bottom:24px">Welcome to ${x(t?.inviterName||`the`)}'s Toto household.</div>

    <div style="background:#f0fdfa;border:1px solid #ccfbf1;border-radius:16px;padding:20px;margin-bottom:20px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#0d9488;margin-bottom:10px">Your household</div>
      ${c}
    </div>

    <div style="display:flex;gap:12px;margin-bottom:24px">
      ${o===0?``:`<div style="flex:1;background:#f8fafc;border-radius:12px;padding:14px;text-align:center;border:1px solid #e2e8f0"><div style="font-size:20px;font-weight:700;color:#16a34a">$${Math.abs(o).toLocaleString()}</div><div style="font-size:11px;color:#64748b">monthly ${o>=0?`surplus`:`deficit`}</div></div>`}
      ${s>0?`<div style="flex:1;background:#f8fafc;border-radius:12px;padding:14px;text-align:center;border:1px solid #e2e8f0"><div style="font-size:20px;font-weight:700;color:#0d9488">${s}</div><div style="font-size:11px;color:#64748b">goal${s===1?``:`s`} tracked</div></div>`:``}
    </div>

    <button onclick="_showInviteA4()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer">Take a quick tour →</button>
  `)}var xl=0,Sl=[{emoji:`💰`,title:`The Kitty`,desc:`Budget, bills, goals & net worth. See where the money goes each month.`},{emoji:`📅`,title:`Plan`,desc:`Weekly planner, meal plans & the kids' lunchboxes. One place for the week ahead.`},{emoji:`🏠`,title:`Home`,desc:`Documents, vehicles & maintenance reminders. Never miss a rego or warranty renewal.`}];function Cl(){xl=0,wl()}function wl(){let e=Sl[xl],t=Sl.map((e,t)=>`<div style="width:${t===xl?20:8}px;height:8px;border-radius:99px;background:${t===xl?`#0d9488`:`#e2e8f0`};transition:all .2s"></div>`).join(``),n=xl===Sl.length-1;jl(`
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
  `)}function Tl(){jl(`
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
  `)}function El(){let e=document.getElementById(`inv-inc-name`)?.value.trim()||``,t=parseFloat(document.getElementById(`inv-inc-amount`)?.value)||0,n=document.getElementById(`inv-inc-freq`)?.value||`Monthly`;(e||t)&&(m.budget.income||(m.budget.income=[]),m.budget.income.push({id:M(m.budget.income),name:e,amount:t,frequency:n}),H(m)),kl()}function Dl(){let e=ol;if(!V){sessionStorage.setItem(`toto_post_invite_action`,e?.id||``),Ss();return}Ol(e),bl()}function Ol(e){if(!e)return;e.status=`accepted`;let t=V,n=hs();n&&_s(n),m.householdProfile.authorizedUsers||(m.householdProfile.authorizedUsers=[]),m.householdProfile.authorizedUsers.some(e=>e.uid===t.uid)||m.householdProfile.authorizedUsers.push({uid:t.uid,name:t.displayName||``,email:t.email||``,role:e.role||`member`,joinedAt:new Date().toISOString()});let r=m.householdProfile.members||[],i=(t.displayName||``).split(` `)[0];i&&!r.some(e=>e.name===i)&&m.householdProfile.members.push({role:`adult`,name:i,age:null}),H(m)}function kl(){ol=null,Ml(),renderAll(),tc()}function Al(e){jl(`
    <div style="text-align:center;margin-top:40px">
      <div style="font-size:56px;margin-bottom:16px">⏰</div>
      <div style="font-size:20px;font-weight:800;color:#1e293b;margin-bottom:8px">This invite has expired</div>
      <div style="font-size:14px;color:#64748b;margin-bottom:24px">The 7-day window has passed. Ask ${x(e?.inviterName||`the household owner`)} to send a new invite link.</div>
      <button onclick="_dismissInviteFlow()" style="background:#0d9488;color:#fff;border:none;border-radius:12px;padding:12px 28px;font-size:14px;font-weight:700;cursor:pointer">OK</button>
    </div>
  `)}function jl(e){document.getElementById(`invite-flow-content`).innerHTML=e;let t=document.getElementById(`invite-flow-overlay`);t.classList.remove(`hidden`),t.style.display=`flex`,t.scrollTop=0}function Ml(){let e=document.getElementById(`invite-flow-overlay`);e.classList.add(`hidden`),e.style.display=``}var Nl=`toto_pin_hard_`,Pl=`toto_pin_att_`,Fl=null,q=`gate`,Il=``,J=``,Ll=0,Rl=null;function zl(e){let t=(m.kids?.profiles||[]).find(t=>String(t.id)===String(e));t&&(Fl=e,J=``,Il=``,q=t.pinHash?`enter`:`gate`,Vl(),document.getElementById(`pin-setup-overlay`).classList.remove(`hidden`))}function Bl(){Rl&&(clearInterval(Rl),Rl=null),document.getElementById(`pin-setup-overlay`).classList.add(`hidden`),Fl=null}function Vl(){let e=(m.kids?.profiles||[]).find(e=>String(e.id)===String(Fl));if(!e)return;let t=document.getElementById(`pso-screen`);if(!t)return;let n=e.emoji||`🧒`,r=x(e.name),i={gate:`#f8fafc`,hello:`linear-gradient(160deg,#f0fdfa,#ecfeff)`,enter:`#f8fafc`,confirm:`#f8fafc`,tour:`#f8fafc`};if(document.getElementById(`pin-setup-overlay`).style.background=i[q]||`#f8fafc`,q===`gate`)t.innerHTML=`
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
      <button onclick="closePinSetupOverlay()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`;else if(q===`hello`)t.innerHTML=`
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
      </button>`;else if(q===`enter`||q===`confirm`){let n=q===`enter`,i=n?e.pinHash?`Change ${r}'s PIN`:`Choose your secret code 🔢`:`Type it again ✅`,a=n?`Pick 4 numbers only you know!`:`Just to make sure!`,o=[0,1,2,3].map(e=>{let t=e<J.length;return`<div style="width:52px;height:60px;border:2px solid ${t?`#0d9488`:`#e2e8f0`};border-radius:10px;background:${t?`#f0fdfa`:`#f8fafc`};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#0d9488">${t?`●`:``}</div>`}).join(``),s=[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<div></div>`:`<div onclick="_psoKey('${e}')" style="height:52px;border:1.5px solid #e2e8f0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;color:#374151;cursor:pointer;background:#fff;-webkit-tap-highlight-color:transparent;user-select:none">${e}</div>`).join(``);t.innerHTML=`
      <div style="font-size:40px;margin-bottom:12px">${n?`🔢`:`✅`}</div>
      <div style="font-size:18px;font-weight:700;color:#1e293b;margin-bottom:6px">${i}</div>
      <div style="font-size:13px;color:#64748b;margin-bottom:20px">${a}</div>
      <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px">${o}</div>
      <div id="pso-error" style="font-size:13px;color:#ef4444;min-height:18px;margin-bottom:12px"></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:220px;margin:0 auto 20px">${s}</div>
      <button onclick="closePinSetupOverlay()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Cancel</button>`}else if(q===`tour`){let e=[{bg:`linear-gradient(160deg,#fef9c3,#fde68a)`,emoji:`⭐`,titleCol:`#92400e`,title:`Earn coins!`,body:`Do your chores to collect coins.<br>Save up for prizes!`,bodyCol:`#78350f`},{bg:`linear-gradient(160deg,#ede9fe,#ddd6fe)`,emoji:`🏆`,titleCol:`#5b21b6`,title:`Prize store`,body:`See what you can win and how<br>many coins you need.`,bodyCol:`#4c1d95`},{bg:`linear-gradient(160deg,#ecfeff,#cffafe)`,emoji:`🍱`,titleCol:`#0e7490`,title:`Lunchbox`,body:`See what's in your lunchbox<br>each day this week.`,bodyCol:`#155e75`}],n=e[Ll],r=Ll===e.length-1,i=e.map((e,t)=>`<div style="width:${t===Ll?20:8}px;height:8px;border-radius:99px;background:${t===Ll?`#0d9488`:`#e2e8f0`};transition:all .2s"></div>`).join(``);document.getElementById(`pin-setup-overlay`).style.background=n.bg,t.innerHTML=`
      <div style="font-size:72px;margin-bottom:16px">${n.emoji}</div>
      <div style="font-size:22px;font-weight:800;color:${n.titleCol};margin-bottom:10px">${n.title}</div>
      <div style="font-size:15px;color:${n.bodyCol};margin-bottom:32px;line-height:1.6">${n.body}</div>
      <div style="display:flex;justify-content:center;gap:6px;margin-bottom:28px">${i}</div>
      <button onclick="${r?`_psoTourDone()`:`_psoTourSlide++;_psoRender()`}"
        style="width:100%;padding:15px;background:#0d9488;color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin-bottom:10px">
        ${r?`Done! →`:`Next →`}
      </button>
      ${r?``:`<button onclick="_psoTourDone()" style="font-size:13px;color:#94a3b8;background:none;border:none;cursor:pointer">Skip</button>`}`}}function Hl(){if(Rl)return;let e=0,t=document.getElementById(`pso-hold-fill`);t&&(t.style.transition=`none`,t.style.transform=`scaleX(0)`),Rl=setInterval(()=>{e+=50;let n=Math.min(e/2e3,1);t&&(t.style.transition=`none`,t.style.transform=`scaleX(${n})`),e>=2e3&&(clearInterval(Rl),Rl=null,q=`hello`,Vl())},50)}function Ul(){Rl&&(clearInterval(Rl),Rl=null);let e=document.getElementById(`pso-hold-fill`);e&&(e.style.transition=`transform .3s`,e.style.transform=`scaleX(0)`)}function Wl(e){if(e===`⌫`){J=J.slice(0,-1),Vl();return}J.length>=4||(J+=e,Vl(),J.length===4&&Gl())}async function Gl(){if(q===`enter`)Il=J,J=``,q=`confirm`,Vl();else if(q===`confirm`){if(J!==Il){J=``,Il=``,q=`enter`,Vl();let e=document.getElementById(`pso-error`);e&&(e.textContent=`Those didn't match — try again 🙈`);return}await hc(Fl,J);let e=(m.kids?.profiles||[]).find(e=>String(e.id)===String(Fl));e&&!e._pinWasSet?(Ll=0,q=`tour`,Vl()):(Bl(),renderKids(),Ki()),e._pinWasSet=!0}}function Kl(){let e=(m.kids?.profiles||[]).find(e=>String(e.id)===String(Fl));Bl(),e&&Ac(e.id)}function ql(e){return parseInt(Gs(Pl+e)||`0`)}function Jl(e){let t=ql(e)+1;return Ks(Pl+e,String(t)),t}function Yl(e){qs(Pl+e),qs(Nl+e)}function Xl(e){return Gs(Nl+e)===`1`}function Zl(e){Ks(Nl+e,`1`)}async function Ql(){let e=await ec(G,hs());if(typeof Vs==`string`&&Vs.startsWith(`adult:`)){let t=parseInt(Vs.split(`:`)[1]),n=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name)[t];if(!n)return;e===n.pinHash?(W=0,U=null,$s(),document.getElementById(`pin-overlay`).classList.add(`hidden`),fc()):(W++,G=``,cc(),W>=3?(Bs=Date.now()+3e4,W=0,lc()):document.getElementById(`pin-error`).textContent=`Wrong PIN — ${3-W} tr${3-W==1?`y`:`ies`} left`);return}let t=(m.kids?.profiles||[]).find(e=>e.id===Vs);if(t){if(Xl(t.id)){document.getElementById(`pin-error`).textContent=`PIN locked — ask mum or dad to reset it 🔒`,document.getElementById(`pin-pad`).innerHTML=``,$l(t);return}if(e===t.pinHash)Yl(t.id),W=0,U={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Qs(t.id),document.getElementById(`pin-overlay`).classList.add(`hidden`),fc();else if(G=``,cc(),W++,Jl(t.id)>=10)Zl(t.id),Bs=0,document.getElementById(`pin-error`).textContent=`PIN locked — ask mum or dad to reset it 🔒`,document.getElementById(`pin-pad`).innerHTML=``,$l(t);else if(W>=3)Bs=Date.now()+3e4,W=0,lc();else{let e=3-W;document.getElementById(`pin-error`).textContent=`Wrong PIN — ${e} try${e===1?``:`s`} left`}}}function $l(e){m.notifications||(m.notifications=[]),m.notifications.some(t=>t.type===`pin-lock`&&t.kidId===e.id)||(m.notifications.unshift({id:uid(),type:`pin-lock`,kidId:e.id,msg:`${e.name}'s PIN has been locked after too many failed attempts. Reset it in Settings → Household.`,ts:new Date().toISOString(),read:!1}),H(m))}function eu(e){Yl(e),W=0,Bs=0,Ki()}function Y(e){return m.budget.months&&m.budget.months[e]||{income:m.budget.income,expenses:m.budget.expenses}}function tu(e){return!!(m.budget.months&&m.budget.months[e])}function nu(e){return m.budget.months||(m.budget.months={}),m.budget.months[e]||(m.budget.months[e]={income:JSON.parse(JSON.stringify(m.budget.income)),expenses:JSON.parse(JSON.stringify(m.budget.expenses))}),m.budget.months[e]}function ru(e){let[t,n]=e.split(`-`).map(Number),r=new Date(t,n-2,1);return`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,`0`)}`}function iu(e){let t=ru(e),n=Y(t);m.budget.months||(m.budget.months={}),m.budget.months[e]={income:JSON.parse(JSON.stringify(n.income.filter(e=>e.recurring!==!1))),expenses:JSON.parse(JSON.stringify(n.expenses.filter(e=>e.recurring!==!1)))},xs(`Auto-filled`,`${bu(e)} copied from ${bu(t)}`),H(m),safeRender(Mo),safeRender(Ti)}var au=null;function ou(e,t){au={onThisMonth:e,onAllMonths:t};let n=bu(X);document.getElementById(`modal-title`).textContent=`Apply changes`,document.getElementById(`modal-body`).innerHTML=`
    <p style="font-size:14px;line-height:1.6;margin:0;color:var(--text-muted)">
      Apply this change to <strong style="color:var(--text)">${n}</strong> only,
      or update the default for all months?
    </p>
    ${tu(X)?`<p style="font-size:12px;color:var(--primary);margin-top:10px;margin-bottom:0">
      <em>${n}</em> already has its own custom budget.</p>`:``}
  `,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="doScopeAll()">Apply to all months</button>
    <button class="btn btn-primary" onclick="doScopeMonth()">Apply to ${n}</button>
  `,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function su(){au&&(au.onThisMonth(),au=null),B()}function cu(){au&&(au.onAllMonths(),au=null),B()}p(Is()),_l(),setTimeout(()=>{try{_routineCheckDailyReset()}catch{}},0);var X=new Date().toISOString().slice(0,7),lu=new Date().getFullYear(),uu=new Date().getMonth()+1;function du(){return document.getElementById(`f-exp-duedate`)||document.getElementById(`f-inc-duedate`)}function fu(e){e.stopPropagation();let t=document.getElementById(`dp-popup`);if(!t)return;let n=(du()||{}).value||``;if(n)[lu,uu]=n.split(`-`).map(Number);else{let e=new Date;lu=e.getFullYear(),uu=e.getMonth()+1}t.classList.remove(`hidden`),pu();function r(e){let n=document.getElementById(`dp-wrap`);n&&!n.contains(e.target)?t.classList.add(`hidden`):document.addEventListener(`click`,r,{once:!0})}document.addEventListener(`click`,r,{once:!0})}function pu(){let e=document.getElementById(`dp-popup`);if(!e)return;let t=lu,n=uu,r=new Date(t,n-1,1).getDay(),i=new Date(t,n,0).getDate(),a=new Date,o=(du()||{}).value||``,s=`
    <div class="dp-nav">
      <button class="dp-nav-btn" onclick="dpPrevMonth(event)">&#8249;</button>
      <span class="dp-month-label">${new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</span>
      <button class="dp-nav-btn" onclick="dpNextMonth(event)">&#8250;</button>
    </div>
    <div class="dp-grid">
      ${[`S`,`M`,`T`,`W`,`T`,`F`,`S`].map(e=>`<div class="dp-day-hdr">${e}</div>`).join(``)}
  `;for(let e=0;e<r;e++)s+=`<div class="dp-day dp-other"></div>`;for(let e=1;e<=i;e++){let r=`${t}-${String(n).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,i=[`dp-day`,a.getFullYear()===t&&a.getMonth()+1===n&&a.getDate()===e?`dp-today`:``,o===r?`dp-selected`:``].filter(Boolean).join(` `);s+=`<div class="${i}" onclick="dpSelectDate('${r}',event)">${e}</div>`}s+=`</div>`,o&&(s+=`<div class="dp-clear"><button class="dp-clear-btn" onclick="dpClearDate(event)">Clear date</button></div>`),e.innerHTML=s}function mu(e){e.stopPropagation(),uu===1?(uu=12,lu--):uu--,pu()}function hu(e){e.stopPropagation(),uu===12?(uu=1,lu++):uu++,pu()}function gu(e,t){t&&t.stopPropagation();let n=du();n&&(n.value=e);let[r,i,a]=e.split(`-`);document.getElementById(`dp-display`).textContent=`${a}/${i}/${r}`,document.getElementById(`dp-trigger`).classList.add(`has-value`),document.getElementById(`dp-popup`).classList.add(`hidden`);let o=document.getElementById(`dp-repeats-wrap`);o&&(o.style.display=``)}function _u(e){e.stopPropagation();let t=du();t&&(t.value=``),document.getElementById(`dp-display`).textContent=`Select a date`,document.getElementById(`dp-trigger`).classList.remove(`has-value`),document.getElementById(`dp-popup`).classList.add(`hidden`);let n=document.getElementById(`dp-repeats-wrap`);n&&(n.style.display=`none`)}function vu(){let[e,t]=X.split(`-`).map(Number),n=new Date(e,t-2,1);X=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,Mo()}function yu(){let[e,t]=X.split(`-`).map(Number),n=new Date(e,t,1);if(X=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,m.settings&&m.settings.autoFillMonths&&!tu(X)){iu(X);return}Mo()}function bu(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}function xu(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`short`,year:`2-digit`})}function Su(){let e=[],t=new Date;for(let n=5;n>=0;n--){let r=new Date(t.getFullYear(),t.getMonth()-n,1);e.push(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,`0`)}`)}return e}function Cu(e,t){let n=(m.budget.actuals[t]||{})[e];return n?typeof n==`number`?[{id:1,amount:n,date:``,note:``}]:Array.isArray(n)?n:[]:[]}function wu(e,t){return Cu(e,t).reduce((e,t)=>e+(t.amount||0),0)}function Tu(e,t,n){m.budget.actuals[t]||(m.budget.actuals[t]={});let r=Cu(e,t);r.length===1&&!r[0].date&&!r[0].note?m.budget.actuals[t][e]=[{...r[0],amount:n}]:m.budget.actuals[t][e]=[{id:1,amount:n,date:``,note:``}],H(m)}function Eu(e){let t=Y(X).expenses.find(t=>t.id===e);if(!t)return;let n=A(t);function r(){let t=Cu(e,X),r=t.reduce((e,t)=>e+(t.amount||0),0),i=n>0?Math.round(r/n*100):0,a=i>=100?`var(--danger)`:i>=80?`var(--warning)`:`var(--success)`;return`
      <div style="background:var(--surface2);border-radius:8px;padding:12px 14px;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
          <span style="font-size:13px;color:var(--text-muted)">Budgeted this month</span>
          <span style="font-weight:700;font-size:15px">${w(n)}</span>
        </div>
        <div style="background:var(--border);border-radius:99px;height:8px;overflow:hidden;margin-bottom:6px">
          <div style="height:100%;width:${Math.min(100,i)}%;background:${a};border-radius:99px"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:12px">
          <span style="font-weight:600;color:${a}">${w(r)} spent · ${i}%</span>
          <span style="color:${i>=100?`var(--danger)`:`var(--text-muted)`}">${i>=100?`Over by `+w(r-n):w(n-r)+` remaining`}</span>
        </div>
      </div>
      ${t.length>0?`
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:8px">Entries</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${t.map((t,n)=>`
          <div style="display:flex;align-items:center;gap:10px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:8px 12px">
            <div style="flex:1">
              <span style="font-weight:600;font-size:13px">${w(t.amount)}</span>
              ${t.date?`<span style="font-size:12px;color:var(--text-muted);margin-left:8px">${D(t.date)}</span>`:``}
              ${t.note?`<span style="font-size:12px;color:var(--text-muted);margin-left:8px">— ${x(t.note)}</span>`:``}
            </div>
            <button onclick="removeActualEntry(${e},${n})" style="background:none;border:none;cursor:pointer;color:var(--danger);font-size:16px;line-height:1;padding:0 2px">&times;</button>
          </div>`).join(``)}
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 12px 0;font-size:13px;font-weight:700;border-top:1px solid var(--border);margin-top:8px">
          <span>Total</span><span>${w(r)}</span>
        </div>
      </div>`:`<p style="font-size:13px;color:var(--text-muted);margin-bottom:14px">No entries yet for ${bu(X)}.</p>`}
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
    `}function i(){document.getElementById(`actual-editor-body`).innerHTML=r()}window._actualEditorRefresh=i,document.getElementById(`modal-title`).textContent=`Actuals — ${t.name}`,document.getElementById(`modal-body`).innerHTML=`<div id="actual-editor-body">${r()}</div>`,document.getElementById(`modal-footer`).innerHTML=`<button class="btn btn-primary" onclick="closeModal();renderBudget()">Done</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function Du(e){let t=parseFloat(document.getElementById(`ae-amount`).value);if(!t||t<=0)return;let n=document.getElementById(`ae-date`).value||``,r=document.getElementById(`ae-note`).value.trim();m.budget.actuals[X]||(m.budget.actuals[X]={});let i=Cu(e,X);i.push({id:i.length?Math.max(...i.map(e=>e.id))+1:1,amount:t,date:n,note:r}),m.budget.actuals[X][e]=i,H(m),window._actualEditorRefresh&&window._actualEditorRefresh()}function Ou(e,t){if(!m.budget.actuals[X])return;let n=Cu(e,X);n.splice(t,1),m.budget.actuals[X][e]=n,H(m),window._actualEditorRefresh&&window._actualEditorRefresh()}function ku(e){Eu(e)}var Z=[],Q=[];function Au(){document.getElementById(`modal-title`).textContent=`Import Bank Transactions`,document.getElementById(`modal-body`).innerHTML=`
    <div style="padding:4px 0">
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">
        Upload a CSV exported from your bank. Works with ANZ, CBA, Westpac, NAB and most Australian banks.
        Transactions will be matched to your <strong>${bu(X)}</strong> budget categories.
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
    </div>`,document.getElementById(`modal-footer`).innerHTML=`<button class="btn" onclick="closeModal()">Cancel</button>`,document.getElementById(`modal-overlay`).classList.remove(`hidden`)}function ju(e){function t(e){let t=[],n=``,r=!1;for(let i of e)i===`"`?r=!r:i===`,`&&!r?(t.push(n.trim()),n=``):n+=i;return t.push(n.trim()),t.map(e=>e.replace(/^"|"$/g,``).trim())}let n=e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>2);if(n.length<2)return null;let r=0;for(let e=0;e<Math.min(6,n.length);e++)if(/date/i.test(n[e])){r=e;break}let i=t(n[r]).map(e=>e.toLowerCase()),a=i.findIndex(e=>/date/.test(e)),o=i.findIndex(e=>/desc|detail|narrat|payee|merchant|particular/.test(e)),s=i.findIndex(e=>/^amount$|^amt$/.test(e)),c=i.findIndex(e=>/^debit$|withdrawal|^debit amount/.test(e)),l=i.findIndex(e=>/^category$/.test(e)),u=i.findIndex(e=>/^subcategory$/.test(e));if(a===-1||o===-1&&s===-1&&c===-1)return null;let d=[];for(let e=r+1;e<n.length;e++){let r=t(n[e]);if(r.length<2)continue;let i=(r[a]||``).trim(),f=o===-1?``:(r[o]||``).trim();if(!f)continue;let p=f.replace(/^(Visa Purchase|Eftpos Debit|Osko Deposit|Internet Deposit|Debit Interest|Direct Debit|Direct Credit)\s+/i,``).replace(/^\d{2}[A-Za-z]{3}[\d:]*\s+/,``).replace(/\s{2,}/g,` `).trim()||f,m=0;if(c!==-1){let e=parseFloat((r[c]||``).replace(/[^0-9.]/g,``));!isNaN(e)&&e>0&&(m=e)}else if(s!==-1){let e=parseFloat((r[s]||``).replace(/[^0-9.-]/g,``));!isNaN(e)&&e<0&&(m=Math.abs(e))}let h=[l===-1?``:(r[l]||``).trim(),u===-1?``:(r[u]||``).trim()].filter(Boolean).join(` > `)||``;m>0&&d.push({date:i,description:p,amount:m,bankCat:h})}return d.length?d:null}async function Mu(e){let t=e.target.files[0];if(!t)return;let n=ju(await t.text()),r=document.getElementById(`csv-parse-status`);if(!n){r&&(r.textContent=`Couldn't detect transactions. Check it's a bank CSV with a header row containing 'Date'.`,r.style.display=``);return}Z=n,Nu()}function Nu(){let e=!!localStorage.getItem(`toto_ai_key`),t=Z.slice(0,5);document.getElementById(`modal-body`).innerHTML=`
    <div>
      <div style="background:var(--success-light);border:1px solid #6ee7b7;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:13px;color:#155e75">
        Found <strong>${Z.length} expense transactions</strong> in your CSV
      </div>
      <div class="table-wrap" style="margin-bottom:16px">
        <table>
          <thead><tr><th>Date</th><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
          <tbody>
            ${t.map(e=>`<tr>
              <td style="color:var(--text-muted);font-size:12px;white-space:nowrap">${e.date}</td>
              <td style="font-weight:500">${x(e.description)}</td>
              <td class="amount">${T(e.amount)}</td>
            </tr>`).join(``)}
            ${Z.length>5?`<tr><td colspan="3" style="text-align:center;color:var(--text-muted);font-size:12px;padding:8px">+ ${Z.length-5} more rows…</td></tr>`:``}
          </tbody>
        </table>
      </div>
      ${e?``:`<div style="background:var(--warning-light);border:1px solid #fde68a;border-radius:8px;padding:10px 14px;font-size:13px;color:#92400e">
        ⚠ No API key — go to Settings › AI Assistant to enable auto-categorisation.
      </div>`}
    </div>`,document.getElementById(`modal-footer`).innerHTML=`
    <button class="btn" onclick="closeModal()">Cancel</button>
    ${e?`<button class="btn btn-primary" onclick="runCsvCategorise()">Categorise with AI →</button>`:`<button class="btn btn-primary" onclick="_renderCsvReview(null)">Assign Manually →</button>`}`}async function Pu(){let e=localStorage.getItem(`toto_ai_key`);if(!e){Fu(null);return}document.getElementById(`modal-body`).innerHTML=`
    <div style="text-align:center;padding:48px 16px">
      <div style="font-size:32px;margin-bottom:12px">🤖</div>
      <div style="font-weight:600;margin-bottom:6px">Categorising ${Z.length} transactions…</div>
      <div style="font-size:12px;color:var(--text-muted)">Matching to your ${bu(X)} budget categories</div>
    </div>`,document.getElementById(`modal-footer`).innerHTML=``;let t=Y(X).expenses.map(e=>`${e.id}: ${e.name}${e.category?` (`+e.category+`)`:``}`).join(`
`),n=Z.some(e=>e.bankCat),r,i;if(window._csvSuggestions={},n){let e={};Z.forEach((t,n)=>{let r=t.bankCat||`Other`;e[r]||(e[r]={bankCat:r,indices:[],sample:t.description}),e[r].indices.push(n)});let t=Object.values(e);r=t.map((e,t)=>({idx:t,bankCategory:e.bankCat,sample:e.sample})),i=e=>{let n={};return e.forEach(e=>{let r=t[e.idx];r&&r.indices.forEach(t=>{n[t]=e.expenseId,e.suggest&&(_csvSuggestions[t]=e.suggest)})}),n}}else{let e={};Z.forEach((t,n)=>{let r=t.description.toUpperCase().replace(/\s+/g,` `).trim();e[r]||(e[r]={desc:t.description,indices:[]}),e[r].indices.push(n)});let t=Object.values(e);r=t.map((e,t)=>({idx:t,description:e.desc})),i=e=>{let n={};return e.forEach(e=>{let r=t[e.idx];r&&r.indices.forEach(t=>{n[t]=e.expenseId,e.suggest&&(_csvSuggestions[t]=e.suggest)})}),n}}let a=n?`bank categories`:`unique transaction descriptions`,o=`You are categorising Australian bank transactions for a family budget app.

The user's EXISTING budget expense categories (id: name):
${t||`(none yet)`}

Here are ${r.length} ${a} from their bank statement (${Z.length} total transactions):
${JSON.stringify(r)}

For EACH item:
- If it matches an existing expense, use that expenseId
- If no existing expense fits, use expenseId -1 AND include a "suggest" field with a short category name to create (e.g. "Groceries", "Dining Out", "Transport", "Parking")
- For bank transfers, deposits, ATM withdrawals, fees → use expenseId -1 with NO suggest (genuinely skip these)

IMPORTANT: Return ONLY raw JSON array, no markdown, no code fences:
[{"idx":0,"expenseId":3},{"idx":1,"expenseId":-1,"suggest":"Dining Out"},{"idx":2,"expenseId":-1}]`;try{let t=await fetch(Ps,{method:`POST`,headers:{"x-api-key":e,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:4096,messages:[{role:`user`,content:o}]})});if(!t.ok)throw Error(`API error ${t.status}`);let n=(await t.json()).content[0].text.replace(/```[\w]*\n?/g,``).trim().match(/\[[\s\S]*\]/);if(!n)throw Error(`No JSON in response`);let r=JSON.parse(n[0]);Fu(i(r))}catch(e){document.getElementById(`modal-body`).innerHTML=`
      <div style="padding:8px">
        <div style="color:var(--danger);margin-bottom:10px">⚠ ${e.message}</div>
        <p style="font-size:13px;color:var(--text-muted)">You can still assign categories manually below.</p>
      </div>`,document.getElementById(`modal-footer`).innerHTML=`
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="_renderCsvReview(null)" style="margin-left:8px">Assign Manually →</button>`}}function Fu(e){let t=Y(X).expenses,n=Z.some(e=>e.bankCat),r=Z.map((t,n)=>({...t,idx:n,expenseId:e?e[n]??-1:-1})),i={};r.forEach(e=>{let t=n?e.bankCat||`Other`:String(e.expenseId);i[t]||(i[t]={key:t,txns:[],total:0}),i[t].txns.push(e),i[t].total+=e.amount});let a={},o=-100,s=window._csvSuggestions||{};Q=Object.values(i).map((t,r)=>{let i=-1,c=``;if(e){let e={};t.txns.forEach(t=>{let n=t.expenseId;n!=null&&n!==-1&&(e[n]=(e[n]||0)+1)});let n=Object.entries(e).sort((e,t)=>t[1]-e[1])[0];if(n&&(i=parseInt(n[0])),i===-1){let e={};t.txns.forEach(t=>{let n=s[t.idx];n&&(e[n]=(e[n]||0)+1)});let n=Object.entries(e).sort((e,t)=>t[1]-e[1])[0];n&&(c=n[0],a[c]||(a[c]=o--),i=a[c])}}return{gIdx:r,expenseId:i,suggest:c,total:Math.round(t.total*100)/100,count:t.txns.length,txns:t.txns,descs:[...new Set(t.txns.map(e=>e.description))].slice(0,4),label:n?t.key:null,checked:i!==-1}}).sort((e,t)=>t.total-e.total),window._csvSuggestNames={},Object.entries(a).forEach(([e,t])=>{window._csvSuggestNames[t]=e});function c(e,n){let r=`<option value="-1"${e===-1?` selected`:``}>— Skip —</option>`;return Object.entries(a).forEach(([t,n])=>{r+=`<option value="${n}"${e===n?` selected`:``}>➕ Create: ${x(t)}</option>`}),r+=t.map(t=>`<option value="${t.id}"${t.id===e?` selected`:``}>${x(t.name)}</option>`).join(``),r}let l=Q.map((e,t)=>{let n=e.descs.join(`, `)+(e.count>e.descs.length?` +${e.count-e.descs.length} more`:``),r=e.label?`<div style="font-size:11px;font-weight:600;color:var(--primary);margin-bottom:2px">${x(e.label)}</div>`:``;return`<tr>
      <td style="width:36px;padding:6px 8px"><input type="checkbox" id="csv-chk-${t}" ${e.checked?`checked`:``} onchange="_csvToggle(${t},this.checked)"></td>
      <td>${r}<select style="font-size:12px;border:1px solid var(--border);border-radius:6px;padding:3px 6px;background:var(--surface);max-width:160px"
          onchange="_csvSetExpense(${t},+this.value)">${c(e.expenseId)}</select></td>
      <td style="font-size:12px;text-align:center;font-weight:600">${e.count}</td>
      <td style="font-size:11px;color:var(--text-muted);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${S(n)}">${x(n)}</td>
      <td class="amount" style="white-space:nowrap;font-weight:600">${T(e.total)}</td>
    </tr>`}).join(``),u=e?`<div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">🤖 Transactions grouped by category — review and adjust as needed.</div>`:``,d=Q.filter(e=>e.checked&&e.expenseId!==-1).length,f=Q.filter(e=>e.checked&&e.expenseId!==-1).reduce((e,t)=>e+t.count,0);document.getElementById(`modal-body`).innerHTML=`
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
    </div>`;let p=Q.filter(e=>e.checked&&e.expenseId===-1).length;document.getElementById(`modal-footer`).innerHTML=`
    <div style="display:flex;flex-direction:column;gap:6px;width:100%">
      <div id="csv-pending-note" style="font-size:12px;color:var(--warning);text-align:right">${p>0?`${p} checked group${p===1?``:`s`} still need a category assigned`:``}</div>
      <div style="display:flex;justify-content:flex-end;gap:10px">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="csv-apply-btn" onclick="applyCsvImport()"${d===0?` disabled`:``}>
          Apply ${d} group${d===1?``:`s`} (${f} txns)
        </button>
      </div>
    </div>`}function Iu(e,t){Q[e].checked=t,zu()}function Lu(e){Q.forEach((t,n)=>{t.checked=e;let r=document.getElementById(`csv-chk-${n}`);r&&(r.checked=e)}),zu()}function Ru(e,t){Q[e].expenseId=t,Q[e].checked=!0;let n=document.getElementById(`csv-chk-${e}`);n&&(n.checked=!0),zu()}function zu(){let e=Q.filter(e=>e.checked&&e.expenseId!==-1),t=Q.filter(e=>e.checked&&e.expenseId===-1),n=e.length,r=e.reduce((e,t)=>e+t.count,0),i=document.getElementById(`csv-apply-btn`);i&&(i.textContent=`Apply ${n} group${n===1?``:`s`} (${r} txns)`,i.disabled=n===0);let a=document.getElementById(`csv-pending-note`);a&&(a.textContent=t.length>0?`${t.length} checked group${t.length===1?``:`s`} still need a category assigned`:``)}function Bu(){let e=Q.filter(e=>e.checked&&e.expenseId!==-1);if(!e.length){B();return}m.budget.actuals[X]||(m.budget.actuals[X]={});let t=window._csvSuggestNames||{},n={};e.forEach(e=>{let r=e.expenseId;if(r<-1&&t[r]){if(!n[r]){let e={id:M(m.budget.expenses),name:t[r],amount:0,frequency:`monthly`,category:t[r],dueDate:``,vendor:null};if(m.budget.expenses.push(e),tu(X)){let t=m.budget.months[X];t.expenses.push({...e,id:M(t.expenses)}),n[r]=t.expenses[t.expenses.length-1].id}else n[r]=e.id}r=n[r]}let i=Cu(r,X),a=i.length?Math.max(...i.map(e=>e.id))+1:1,o=e.descs.join(`, `)+(e.count>e.descs.length?` +${e.count-e.descs.length} more`:``);i.push({id:a,amount:e.total,date:e.txns[0].date,note:`${e.count} transactions: ${o}`}),m.budget.actuals[X][r]=i}),H(m),B(),renderAll()}var $=``,Vu=null;function Hu(){Wu(),document.getElementById(`qa-overlay`).classList.add(`open`),requestAnimationFrame(()=>document.getElementById(`qa-sheet`).classList.add(`open`))}function Uu(){document.getElementById(`qa-sheet`).classList.remove(`open`),document.getElementById(`qa-overlay`).classList.remove(`open`)}function Wu(){document.getElementById(`qa-sheet`).innerHTML=`
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
    <div style="height:max(12px,env(safe-area-inset-bottom))"></div>`,requestAnimationFrame(()=>document.getElementById(`qah-text`)?.focus())}function Gu(e){Uu(),setTimeout(()=>{if(e===`event`)b(`planner`),setTimeout(()=>Ln(null,new Date().toISOString().slice(0,10)),300);else if(e===`expense`){let e=Y(X).expenses,t=parseInt(localStorage.getItem(`toto_qa_last`)||`0`);Vu=e.find(e=>e.id===t)?.id??e[0]?.id??null,$=``,Ju(e),document.getElementById(`qa-overlay`).classList.add(`open`),requestAnimationFrame(()=>document.getElementById(`qa-sheet`).classList.add(`open`))}else e===`income`?(b(`budget`),setTimeout(()=>es(),300)):e===`bill`?(b(`bills`),setTimeout(()=>lt(),300)):e===`chore`?(b(`kids`),setTimeout(()=>{typeof renderChoreMgmt==`function`&&renderChoreMgmt()},300)):e===`shopping`?(window._listsActiveType=`food`,window._listsView=`list`,b(`lists`)):e===`ai`&&typeof ur==`function`&&ur()},320)}async function Ku(){let e=document.getElementById(`qah-text`)?.value.trim();if(!e){Gu(`ai`);return}let t=document.querySelector(`.qah-ai-send`);t&&(t.textContent=`…`,t.disabled=!0);let n=`Today is ${new Date().toISOString().slice(0,10)}. The user typed: "${e}"

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
- If genuinely unclear → unknown`;try{let t=m.settings?.claudeApiKey,r=(await(await fetch(Ps,{method:`POST`,headers:{"x-api-key":t,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:150,messages:[{role:`user`,content:n}]})})).json()).content?.[0]?.text?.trim()||`{"type":"unknown"}`,i=JSON.parse(r.replace(/```[\w]*\n?/g,``).trim());Uu(),await qu(i,e)}catch{Uu(),setTimeout(()=>{typeof ur==`function`&&ur(),setTimeout(()=>{let t=document.getElementById(`toto-input`)||document.querySelector(`.toto-msg-input`);t&&(t.value=e,t.focus())},400)},320)}}async function qu(e,t){let n=e=>new Promise(t=>setTimeout(t,e));if(e.type===`event`){b(`planner`),await n(320),Ln(null,e.date||new Date().toISOString().slice(0,10)),await n(200);let r=document.getElementById(`pe-title`),i=document.getElementById(`pe-time`);if(r&&(r.value=e.title||t),i&&e.time&&(i.value=e.time),e.date){let t=document.getElementById(`pe-date`),n=document.getElementById(`pm-start-display`);t&&(t.value=e.date),n&&typeof zn==`function`&&(n.textContent=zn(e.date))}}else if(e.type===`expense`){let t=Y(X).expenses,n=parseInt(localStorage.getItem(`toto_qa_last`)||`0`);Vu=t.find(e=>e.id===n)?.id??t[0]?.id??null,$=e.amount?String(e.amount):``,Ju(t),document.getElementById(`qa-overlay`).classList.add(`open`),requestAnimationFrame(()=>{document.getElementById(`qa-sheet`).classList.add(`open`);let t=document.getElementById(`qa-note`);t&&e.note&&(t.value=e.note)})}else if(e.type===`income`){b(`budget`),await n(320),es(),await n(200);let t=document.getElementById(`inc-name`)||document.querySelector(`#modal-body [id*="name"]`),r=document.getElementById(`inc-amount`)||document.querySelector(`#modal-body [id*="amount"]`);t&&e.name&&(t.value=e.name),r&&e.amount&&(r.value=e.amount)}else if(e.type===`bill`){b(`bills`),await n(320),lt(),await n(200);let t=document.getElementById(`bill-name`),r=document.getElementById(`bill-amount`),i=document.getElementById(`bill-due`);t&&e.name&&(t.value=e.name),r&&e.amount&&(r.value=e.amount),i&&e.dueDate&&(i.value=e.dueDate)}else if(e.type===`chore`)b(`kids`),await n(320);else if(e.type===`shopping`){window._listsActiveType=`food`,window._listsView=`list`,b(`lists`),await n(320);let t=document.getElementById(`ls-quick-input`);t&&e.name&&(t.value=e.name,t.focus())}else{typeof ur==`function`&&ur(),await n(400);let e=document.getElementById(`toto-input`)||document.querySelector(`.toto-msg-input`);e&&(e.value=t,e.focus())}}function Ju(e){let t=e||Y(X).expenses,n=$?`$${$}`:`$0`,r=!$,i=t.length?t.map(e=>`<button class="qa-cat${e.id===Vu?` selected`:``}" onclick="_qaSelectCat(${e.id})">${x(e.name)}</button>`).join(``):`<span style="color:var(--text-muted);font-size:13px;padding:6px 4px">Add budget expenses first</span>`,a=[`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`.`,`0`,`⌫`];document.getElementById(`qa-sheet`).innerHTML=`
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
    </div>`}function Yu(e){if(e===`⌫`)$=$.slice(0,-1);else if(e===`.`)$.includes(`.`)||($+=($?``:`0`)+`.`);else{let t=$.split(`.`);if(t[1]!==void 0&&t[1].length>=2||$.replace(`.`,``).length>=6)return;$===`0`&&e!==`.`?$=e:$+=e}let t=document.getElementById(`qa-display`);if(!t)return;let n=!$;t.textContent=$?`$${$}`:`$0`,t.className=`qa-amount-display${n?` zero`:``}`}function Xu(e){Vu=e,document.querySelectorAll(`.qa-cat`).forEach(t=>{t.classList.toggle(`selected`,parseInt(t.getAttribute(`onclick`).match(/\d+/)[0])===e)})}function Zu(){let e=parseFloat($);if(!e||e<=0){let e=document.getElementById(`qa-display`);e&&(e.style.color=`var(--danger)`,setTimeout(()=>e.style.color=``,600));return}if(!Vu){let e=document.getElementById(`qa-cats`);e&&(e.style.outline=`2px solid var(--danger)`,e.style.borderRadius=`8px`,setTimeout(()=>{e.style.outline=``},600));return}let t=document.getElementById(`qa-note`)?.value.trim()||``,n=new Date().toISOString().slice(0,10);m.budget.actuals[X]||(m.budget.actuals[X]={});let r=Cu(Vu,X),i=r.length?Math.max(...r.map(e=>e.id))+1:1;r.push({id:i,amount:e,date:n,note:t}),m.budget.actuals[X][Vu]=r,localStorage.setItem(`toto_qa_last`,String(Vu)),H(m),Uu(),renderAll();let a=document.getElementById(`qa-fab`);a&&(a.textContent=`✓`,a.style.background=`#10b981`,setTimeout(()=>{a.textContent=`+`,a.style.background=``},1800))}window.addEventListener(`resize`,()=>{document.querySelectorAll(`.section-pills-wrap`).forEach(v)}),document.querySelectorAll(`.nav-item, .nav-text-item`).forEach(e=>{e.addEventListener(`click`,()=>b(e.dataset.tab))});function Qu(){let e=Y(X),t=j(e.income),n=j(e.expenses),r=t-n,i=t>0?r/t:null,a;a=t===0?10:i>=.2?20:i>=0?Math.round(i/.2*20):0;let o=Su().slice(3),s=0,c=0;o.forEach(e=>{let t=Y(e);t.expenses.some(t=>Cu(t.id,e).length>0)&&(s++,t.expenses.reduce((t,n)=>t+wu(n.id,e),0)<=j(t.expenses)&&c++)});let l=s===0?5:Math.round(s/3*10+c/s*10),u=(m.netWorth.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),d=(m.netWorth.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),f=u-d,p;if(u===0&&d===0)p=10;else if(f<=0)p=3;else{let e=d>0?d/u:0;p=e<.3?20:e<.6?15:e<.8?10:6}let h;if(n===0)h=10;else{let e=u/n;h=e>=6?20:e>=3?15:e>=1?8:u===0?5:3}let g=(m.goals||[]).filter(e=>e.status!==`achieved`),_;if(g.length===0)_=8;else{let e=g.reduce((e,t)=>e+Math.min((t.saved||0)/(t.target||1),1),0)/g.length;_=10+Math.round(e*10)}let v=a+l+p+h+_,y=v>=85?`A`:v>=70?`B`:v>=55?`C`:v>=40?`D`:`F`,b=v>=80?`#10b981`:v>=60?`#f59e0b`:v>=40?`#f97316`:`#ef4444`,x=[...[{score:a,tip:`Boost your savings rate — aim for 20%+ of income (currently ${t>0?Math.round((i||0)*100):0}%)`},{score:l,tip:`Log actuals monthly in the Budget tab to stay on track`},{score:p,tip:`Reduce liabilities or grow assets to strengthen your net worth`},{score:h,tip:`Build an emergency fund of 3–6 months expenses (${w(n*3)}–${w(n*6)})`},{score:_,tip:`Set specific savings goals in the Goals tab to stay focused`}]].sort((e,t)=>e.score-t.score)[0];return{total:v,grade:y,color:b,insight:x.score<12?x.tip:`Great shape — stay consistent and keep building your financial cushion.`,dimensions:[{label:`Savings Rate`,score:a,max:20},{label:`Budget Tracking`,score:l,max:20},{label:`Net Worth`,score:p,max:20},{label:`Emergency Buffer`,score:h,max:20},{label:`Goals`,score:_,max:20}]}}var $u={Wallet:`#059669`,Plan:`#0891b2`,Home:`#7c3aed`};function ed(e){return e?`<span style="font-size:10px;font-weight:700;color:${$u[e]||`#71717a`};margin-right:6px">${e}</span>`:``}function td(e){let t={red:`#ef4444`,amber:`#f59e0b`,green:`#10b981`,blue:`#0891b2`}[e.cls]||`#a1a1aa`,n=e.onclick?e.onclick:e.tab?`activateTab('${e.tab}')`:``;return`<div class="notif-tl-item">
    <div class="notif-tl-dot" style="background:${t}"></div>
    <div class="notif-tl-body"><div class="notif-tl-title">${ed(e.section)}${e.title}</div>${e.sub?`<div class="notif-tl-sub">${e.sub}</div>`:``}</div>
    <div class="notif-tl-action" onclick="${n}">${e.action.replace(` →`,``)}</div>
  </div>`}function nd(e){let t=[];return e===`budget`&&Y(X).expenses.forEach(e=>{let n=A(e),r=wu(e.id,X);n>0&&r/n>=.8&&r<n?t.push({cls:`amber`,text:`${x(e.name)} at ${Math.round(r/n*100)}% — ${w(n-r)} left`,tab:null}):n>0&&r>=n&&t.push({cls:`red`,text:`${x(e.name)} over budget by ${w(r-n)}`,tab:null})}),t.slice(0,2).map(e=>`<div class="notif-banner ${e.cls}">
      <div class="notif-banner-dot" style="background:${e.cls===`red`?`#ef4444`:`#f59e0b`}"></div>
      <div class="notif-banner-body" style="color:${e.cls===`red`?`#991b1b`:`#92400e`}">${e.text}</div>
    </div>`).join(``)}function rd(){let e=[],t=new Date,r=X,i=(m.householdProfile?.members||[]).filter(e=>e.role===`adult`),a=m.kids?.profiles||[],o=a.length>0,s=Math.max(1,i.length)+a.length,c=Y(r),l=c.income.length>0,u=c.expenses.length>0,d=c.expenses.some(e=>Cu(e.id,r).length>0),f=(l?30:0)+(u?30:0)+(d?40:0);e.push({key:`budget`,label:`Budget`,score:f,tip:l?u?d?`On track`:`Log actual spending this month`:`Add your expenses`:`Add your income sources`,tab:`budget`});let p=Ar(0),h=m.meals?.plan?.[p]||{},g=0,_=s===1?7:s<=3?14:21;for(let e=0;e<7;e++){let t=h[e]||{};s===1?t.d&&g++:s<=3?(t.l&&g++,t.d&&g++):(t.b&&g++,t.l&&g++,t.d&&g++)}let v=Math.round(g/_*80),y=m.lists?.food?.items||[],b=y.filter(e=>e.state===`active`).length,x=y.filter(e=>e.state===`got_it`).length,S=b>0||x>0,C=v+(S?20:0);e.push({key:`meals`,label:`Meals`,score:Math.min(100,C),tip:g===0?`Plan this week's meals`:g<_?`${g}/${_} meals planned`:S?`Meals sorted`:`Add items to your shopping list`,tab:`meals`});let ee=m.maintenance||[],w=ee.filter(e=>{let t=Se(e);return t!==null&&t<0}).length,T=ee.length===0?30:Math.max(0,100-w*25),E=m.vehicles||[],D=E.filter(e=>!!(e.regoExpiry&&Math.ceil((new Date(e.regoExpiry)-t)/864e5)<30||e.insurance?.renewalDate&&Math.ceil((new Date(e.insurance.renewalDate)-t)/864e5)<30)).length,te=m.documents||[],ne=te.filter(e=>e.expiryDate&&Math.ceil((new Date(e.expiryDate)-t)/864e5)<30).length,O=E.length>0?.3:0,k=.3,re=1-O-k,A=Math.max(0,Math.min(100,Math.round(T*re+(E.length>0?Math.max(0,100-D*30)*O:0)+(te.length>0?Math.max(0,100-ne*20):50)*k)));if(e.push({key:`home`,label:`Home`,score:A,tip:w>0?`${w} maintenance overdue`:D>0?`Vehicle rego or insurance expiring`:ne>0?`Documents expiring soon`:ee.length===0?`Add maintenance items to track`:`Home is sorted`,tab:`maintenance`}),o){let t=m.meals?.lunchbox?.plans||{},n=Ar(0),r=0,i=a.length*20;a.forEach(e=>{let i=(t[n]||{})[e.id]||{};for(let e=0;e<5;e++){let t=i[e]||{};t.main&&r++,t.snack&&r++,t.fruit&&r++,t.drink&&r++}}),typeof _routineTodayKey==`function`?_routineTodayKey():new Date().toISOString().slice(0,10).replace(/-/g,``);let o=m.kids?.chores||[],s=m.kids?.completions||[],c=s.filter(e=>e.status===`pending`).length,l=s.filter(e=>e.status===`approved`&&e.completedAt?.startsWith(new Date().toISOString().slice(0,10))).length,u=o.length===0?50:Math.max(0,100-c*10+l*5),d=i>0?Math.round(r/i*100):50,f=Math.min(100,Math.round(d*.5+Math.min(100,u)*.5));e.push({key:`family`,label:`Family`,score:f,tip:r===0?`Plan school lunches this week`:c>0?`${c} chore approval${c===1?``:`s`} waiting`:`Family is sorted`,tab:`kids`})}let j=m.goals||[],M=j.filter(e=>e.status===`active`),ie=M.length>0?M.reduce((e,t)=>e+Math.min((t.saved||t.currentAmount||0)/(t.target||t.targetAmount||1),1),0)/M.length*100:0,ae=j.length===0?20:Math.round(30+ie*.7);e.push({key:`goals`,label:`Goals`,score:Math.min(100,ae),tip:j.length===0?`Set a savings or spending goal`:ie<30?`Make progress on your goals`:`Goals progressing well`,tab:`goals`});let N=typeof _routinesForCurrentUser==`function`?_routinesForCurrentUser():[];if(N.length>0){let t=typeof _routineTodayKey==`function`?_routineTodayKey():new Date().toISOString().slice(0,10).replace(/-/g,``),n=N.filter(e=>{let n=(e.completions?.[t]||[]).length;return e.steps.length>0&&n===e.steps.length}),r=Math.round(n.length/N.length*100),i=N.reduce((e,t)=>{let n=typeof _routineStreak==`function`?_routineStreak(t):0;return Math.max(e,n)},0),a=Math.min(40,Math.round(i/10*40)),o=Math.min(100,20+Math.round(r*.4)+a);e.push({key:`habits`,label:`Habits`,score:o,tip:n.length===0?`Complete a routine today`:i<3?`Keep your streak going`:`${i}-day streak — keep it up`,tab:`routines`})}let oe=new Date().toISOString().slice(0,10),se=new Date(Date.now()+7*864e5).toISOString().slice(0,10),ce=(m.planner?.events||[]).filter(e=>e.date>=oe&&e.date<=se).length,le=(m.bills||[]).filter(e=>{let t=n(e);return t!==null&&t<0}).length,ue=(m.documents||[]).filter(e=>e.expiryDate&&new Date(e.expiryDate)<t).length,de=Math.min(100,Math.round((ce>0?40:10)+Math.max(0,30-le*15)+Math.max(0,30-ue*15)));return e.push({key:`plan`,label:`Plan`,score:de,tip:le>0?`${le} bill${le===1?``:`s`} overdue`:ue>0?`${ue} document${ue===1?``:`s`} expired`:ce===0?`Add something to your calendar`:`Plan looks good`,tab:`planner`}),{total:Math.round(e.reduce((e,t)=>e+t.score,0)/e.length),dims:e}}function id(){let e=rd();new Date().toISOString().slice(0,10);let t=m.settings?.typeADismissedMission||``,n=[...e.dims].sort((e,t)=>e.score-t.score),r=[];return n.forEach(e=>{if(e.key===`budget`&&e.score<70&&(Y(X).income.length?Y(X).expenses.length?r.push({id:`log-actuals`,title:`Log this month's actual spending`,sub:`Import a bank statement or add manually`,tab:`budget`,impact:30}):r.push({id:`add-expenses`,title:`Set up your monthly expenses`,sub:`List your regular costs`,tab:`budget`,impact:35}):r.push({id:`add-income`,title:`Add your income sources`,sub:`Takes about 1 minute`,tab:`budget`,impact:40})),e.key===`meals`&&e.score<70){let e=Ar(0),t=m.meals?.plan?.[e]||{},n=Object.values(t).filter(e=>e.d).length,i=(m.lists?.food?.items||[]).filter(e=>e.state===`active`).length;n<3?r.push({id:`plan-dinners`,title:`Plan this week's dinners`,sub:`Just the evening meals — takes 2 minutes`,tab:`meals`,impact:25}):i===0&&r.push({id:`shopping-list`,title:`Add items to your shopping list`,sub:`Start with essentials you need this week`,tab:`lists`,impact:15})}if(e.key===`home`&&e.score<70){let e=(m.maintenance||[]).filter(e=>{let t=Se(e);return t!==null&&t<0});e.length?r.push({id:`maint-overdue`,title:`Clear overdue: ${x(e[0].name)}`,sub:`Mark it done or reschedule`,tab:`maintenance`,impact:20}):(m.maintenance||[]).length||r.push({id:`setup-maint`,title:`Set up household maintenance`,sub:`Add items like gutters, pest control, smoke alarms`,tab:`maintenance`,impact:20})}if(e.key===`family`&&e.score<70){let e=(m.kids?.completions||[]).filter(e=>e.status===`pending`).length,t=m.kids?.profiles||[];e>0?r.push({id:`approve-chores`,title:`Review ${e} chore approval${e===1?``:`s`}`,sub:`Kids are waiting for your sign-off`,tab:`kids`,impact:20}):t.length>0&&r.push({id:`plan-lunchbox`,title:`Plan school lunches this week`,sub:`AI can do it in one tap`,tab:`lunchbox`,impact:18})}if(e.key===`goals`&&e.score<50&&((m.goals||[]).length||r.push({id:`add-goal`,title:`Set your first savings goal`,sub:`Holiday fund, emergency savings, or debt payoff`,tab:`goals`,impact:15})),e.key===`habits`&&e.score<70&&((typeof _routinesForCurrentUser==`function`?_routinesForCurrentUser():[]).length===0?r.push({id:`create-routine`,title:`Create your first daily routine`,sub:`Morning or evening — takes 2 minutes to set up`,tab:`routines`,impact:25}):r.push({id:`complete-routine`,title:`Complete a routine today`,sub:`Tap each step as you go`,tab:`today`,impact:20})),e.key===`plan`&&e.score<70){let e=new Date().toISOString().slice(0,10),t=new Date(Date.now()+7*864e5).toISOString().slice(0,10);(m.planner?.events||[]).filter(n=>n.date>=e&&n.date<=t).length===0?r.push({id:`add-event`,title:`Add something to your calendar`,sub:`Even one event this week helps keep life organised`,tab:`planner`,impact:15}):r.push({id:`review-bills`,title:`Review upcoming bills`,sub:`Make sure nothing catches you off guard`,tab:`bills`,impact:15})}}),r.filter(e=>e.id!==t).sort((e,t)=>t.impact-e.impact)[0]||null}function ad(e){m.settings||(m.settings={}),m.settings.typeADismissedMission=e,H(m);let t=document.querySelector(`.mission-lightbox`);t&&t.remove(),Fi()}function od(e){m.settings||(m.settings={}),m.settings.typeAMissionId=``,m.settings.typeAMissionShownDate=``,m.settings.typeADismissedMission=e,H(m);let t=document.querySelector(`.mission-lightbox`);t&&t.remove()}function sd(){let e=m.settings?.typeAMissionShownDate;if(!e)return 0;let t=Math.floor((new Date-new Date(e))/864e5);return Math.max(0,t)}function cd(e){if(document.querySelector(`.mission-lightbox`))return;let t=sd(),n=e.onclick?e.onclick:e.tab?`activateTab('${e.tab}')`:``,r=document.createElement(`div`);r.className=`mission-lightbox`,r.innerHTML=`
    <div class="mission-lightbox-card">
      <div class="mission-lightbox-icon">⚡</div>
      <div class="mission-lightbox-title">${e.title}</div>
      <div class="mission-lightbox-sub">${e.sub}</div>
      <div class="mission-lightbox-days">This has been waiting ${t} day${t===1?``:`s`}</div>
      <div class="mission-lightbox-actions">
        <button class="mission-lightbox-btn" style="background:rgba(255,255,255,0.2);color:#fff" onclick="dismissMission('${e.id}')">Skip</button>
        <button class="mission-lightbox-btn" style="background:#fff;color:#0891b2" onclick="completeMission('${e.id}');${n}">Do it now</button>
      </div>
    </div>`,r.addEventListener(`click`,t=>{t.target===r&&ad(e.id)}),document.body.appendChild(r)}function ld(){if(!m.settings?.typeAMode)return;let e=id();if(!e)return;let t=new Date().toISOString().slice(0,10);if(m.settings.typeAMissionId!==e.id){m.settings.typeAMissionId=e.id,m.settings.typeAMissionShownDate=t,H(m);return}sd()>=1&&setTimeout(()=>cd(e),1500)}function ud(){rd();let e=Y(X),t=e.expenses.reduce((e,t)=>e+wu(t.id,X),0),r=j(e.expenses),i=Ar(1),a=m.meals?.plan?.[i]||{},o=Object.values(a).reduce((e,t)=>e+ +!!t.b+ +!!t.l+ +!!t.d,0),s=(m.maintenance||[]).filter(e=>{let t=Se(e);return t!==null&&t<0}).length,c=(m.bills||[]).filter(e=>{let t=n(e);return t>=0&&t<=7}),l=(m.meals?.pantry||[]).filter(e=>e.status===`need`||e.status===`low`).length,u=document.createElement(`div`);u.className=`reset-overlay`,u.innerHTML=`
    <div class="reset-card">
      <div class="reset-header">
        <h2>Weekly Reset</h2>
        <p>5 minutes to get your week sorted</p>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 1 of 5</div>
        <div class="reset-step-title">Review this month's spending</div>
        <div class="reset-step-sub">${t>0?`You've spent ${w(t)} of ${w(r)} budgeted`:`No actuals logged yet this month`}</div>
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
        <div class="reset-step-sub">${l>0?`${l} items need restocking`:(m.meals?.pantry||[]).length>0?`Pantry looks good`:`Not set up yet`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('pantry')">Stocktake</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 4 of 5</div>
        <div class="reset-step-title">Upcoming bills</div>
        <div class="reset-step-sub">${c.length>0?`${c.length} bill${c.length===1?``:`s`} due this week — ${w(c.reduce((e,t)=>e+(parseFloat(t.amount)||0),0))}`:`No bills due this week`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('bills')">Review bills</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-step">
        <div class="reset-step-num">Step 5 of 5</div>
        <div class="reset-step-title">Household maintenance</div>
        <div class="reset-step-sub">${s>0?`${s} item${s===1?``:`s`} overdue`:`Everything up to date`}</div>
        <div class="reset-step-actions">
          <button class="reset-step-btn" style="background:#0891b2;color:#fff" onclick="this.closest('.reset-overlay').remove();activateTab('maintenance')">Check maintenance</button>
          <button class="reset-step-btn" style="background:var(--surface2);color:var(--text-muted)" onclick="this.closest('.reset-step').style.opacity='0.4'">Skip</button>
        </div>
      </div>

      <div class="reset-footer">
        <button class="reset-step-btn" style="background:#0891b2;color:#fff;padding:10px 24px;font-size:14px" onclick="completeWeeklyReset()">Done — I'm reset</button>
      </div>
    </div>`,u.addEventListener(`click`,e=>{e.target===u&&u.remove()}),document.body.appendChild(u)}function dd(){let e=document.querySelector(`.reset-overlay`);e&&e.remove(),m.settings||(m.settings={});let t=new Date().toISOString().slice(0,10),n=m.settings.typeALastResetDate||``;n&&Math.floor((new Date-new Date(n))/864e5)<=9?m.settings.typeAStreak=(m.settings.typeAStreak||0)+1:m.settings.typeAStreak=1,m.settings.typeALastResetDate=t,H(m),Fi()}function fd(){let e=rd(),t=2*Math.PI*22,n=(e.total/100*t).toFixed(1),r=e.total>=80?`var(--good,#10b981)`:e.total>=60?`var(--iris-2)`:e.total>=40?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`,i=e.total>=80?`Crushing it — keep going`:e.total>=60?`Good shape — a few things to tidy`:e.total>=40?`Getting there — some gaps to fill`:`Just getting started`;return e.dims.map(e=>{let t=e.score>=75?`var(--good,#10b981)`:e.score>=50?`var(--iris-2)`:e.score>=30?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`,n=e.score>=75?`var(--good,#10b981)`:e.score>=50?`var(--iris-1)`:e.score>=30?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`;return`<div class="life-dim">
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
        ${m.settings?.typeAStreak>1?`<div style="margin-top:5px;display:inline-flex;align-items:center;gap:5px;background:var(--amber-soft,#FFF7ED);border-radius:99px;padding:2px 10px"><span style="font-size:12px">🔥</span><span style="font-family:var(--mono);font-size:11px;font-weight:700;color:var(--ember,#f97316)">${m.settings.typeAStreak} week streak</span></div>`:``}
      </div>
      <span style="font-size:10px;color:var(--muted);flex-shrink:0">▼</span>
    </div>
    
  </div>`}function pd(){let e=id();if(!e)return``;let t=sd(),n=e.onclick?`onclick="${e.onclick}"`:e.tab?`onclick="activateTab('${e.tab}')"`:``;return`<div class="mission-card" ${n}>
    <div class="mission-label">${t>0?`Day ${t+1} — still waiting`:`Today's Mission`}</div>
    <div class="mission-title">${e.title}</div>
    <div class="mission-sub">${e.sub}</div>
    <div class="mission-actions">
      <button class="mission-btn" style="background:rgba(255,255,255,0.2);color:#fff" onclick="event.stopPropagation();dismissMission('${e.id}')">Not today</button>
      <button class="mission-btn" style="background:#fff;color:#0891b2" ${n}>Let's do it</button>
    </div>
  </div>`}function md(){let e=Y(X),t=m.householdProfile?.members||[],n=t.filter(e=>e.role===`adult`),r=t.filter(e=>e.role===`child`),i=[];if(i.push({id:`members`,label:`Add your household members`,done:n.length>0,tab:null}),i.push({id:`income`,label:`Set up income sources`,done:(e.income||[]).length>0,tab:`budget`}),i.push({id:`expenses`,label:`Add monthly expenses`,done:(e.expenses||[]).length>0,tab:`budget`}),r.length>0&&i.push({id:`kids`,label:`Add kids to your household`,done:!0,tab:null}),n.length>=2){let e=n[1]?.name||`your partner`,t=(m.householdProfile.authorizedUsers||[]).length>0||(m.householdProfile.invites||[]).some(e=>e.status===`accepted`);i.push({id:`invite`,label:`Invite ${e} to your household`,done:t,tab:`settings`,settingsSection:`household-access`})}if(i.push({id:`goals`,label:`Set your first savings goal`,done:(m.goals||[]).length>0,tab:`goals`}),i.push({id:`networth`,label:`Add your net worth (assets & debts)`,done:(m.netWorth?.assets||[]).length>0||(m.netWorth?.liabilities||[]).length>0,tab:`networth`}),i.push({id:`vehicles`,label:`Add your vehicles`,done:(m.vehicles||[]).length>0,tab:`vehicles`}),r.length>0){let e=r[0]?.name||`your child`;i.push({id:`chores`,label:`Set up ${x(e)}'s first chores`,done:(m.kids?.chores||[]).length>0,tab:`kids`})}return i}function hd(){let e=document.getElementById(`setup-progress-card`);e&&(e.innerHTML=Ei())}var gd=null,_d=`asc`;function vd(e){Mo()}function yd(e){_d=gd===e&&_d===`asc`?`desc`:`asc`,gd=e,Mo()}function bd(e,t,n=``){let r=gd===e;return`<th class="sortable${r?` sort-active`:``}" onclick="sortExpenses('${e}')">${t}${n}<span class="sort-icon">${r?_d===`asc`?`↑`:`↓`:`↕`}</span></th>`}function xd(e){let t=[`th`,`st`,`nd`,`rd`],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}function Sd(){let e=document.getElementById(`dev-tools-overlay`),t=document.getElementById(`dev-tools-sheet`),n=document.getElementById(`dev-tools-body`);if(!e||!t)return;let r=new Date().toISOString().slice(0,10);new Date(Date.now()+864e5).toISOString().slice(0,10),new Date(Date.now()+3*864e5).toISOString().slice(0,10),new Date(Date.now()+7*864e5).toISOString().slice(0,10),new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().slice(0,7),r.slice(0,7),n.innerHTML=[{label:`💰 Wallet — full budget`,desc:`Income, expenses, actuals, bills, goals, net worth`,fn:`_devLoadWallet`},{label:`👨‍👩‍👧 Kids zone`,desc:`Two kids, chores, prizes, completions, redemptions`,fn:`_devLoadKids`},{label:`📋 Routines`,desc:`Morning & evening routines with steps, assigned to kids`,fn:`_devLoadRoutines`},{label:`📅 Planner & events`,desc:`Events today, tomorrow, this week, recurring`,fn:`_devLoadPlanner`},{label:`🏠 Home — docs, vehicles, maintenance`,desc:`Documents expiring, vehicle rego, maintenance tasks`,fn:`_devLoadHome`},{label:`🍽 Meals & lunchbox`,desc:`This week's meal plan + kids lunchbox entries`,fn:`_devLoadMeals`},{label:`🌟 Load everything`,desc:`All of the above in one shot`,fn:`_devLoadAll`,primary:!0},{label:`🗑 Reset to empty`,desc:`Clears all state back to defaults`,fn:`_devReset`,danger:!0}].map(e=>`
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
        Bills: ${(m.bills||[]).length} ·
        Budget items: ${(m.budget?.expenses||[]).length} ·
        Goals: ${(m.goals||[]).length} ·
        Kids: ${(m.kids?.profiles||[]).length} ·
        Routines: ${(m.routines||[]).length} ·
        Events: ${(m.planner?.events||[]).length}
      </div>
    </div>`,e.style.display=`block`,t.style.display=`block`}function Cd(){document.getElementById(`dev-tools-overlay`).style.display=`none`,document.getElementById(`dev-tools-sheet`).style.display=`none`}function wd(){let e=new Date().toISOString().slice(0,7);new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().slice(0,7),m.budget.income=[{id:uid(),name:`Salary`,category:`Salary`,amount:8500,frequency:`monthly`},{id:uid(),name:`Freelance`,category:`Freelance / Contract`,amount:1200,frequency:`monthly`}],m.budget.expenses=[{id:uid(),name:`Mortgage`,category:`Mortgage / Rent`,amount:2800,frequency:`monthly`},{id:uid(),name:`Groceries`,category:`Groceries`,amount:900,frequency:`monthly`},{id:uid(),name:`Electricity`,category:`Utilities`,amount:220,frequency:`monthly`},{id:uid(),name:`Internet`,category:`Utilities`,amount:89,frequency:`monthly`},{id:uid(),name:`Car insurance`,category:`Insurance`,amount:180,frequency:`monthly`},{id:uid(),name:`Dining out`,category:`Dining Out`,amount:350,frequency:`monthly`},{id:uid(),name:`Netflix`,category:`Subscriptions`,amount:23,frequency:`monthly`},{id:uid(),name:`Spotify`,category:`Subscriptions`,amount:12,frequency:`monthly`},{id:uid(),name:`Gym`,category:`Health`,amount:75,frequency:`monthly`},{id:uid(),name:`Kids activities`,category:`Childcare / Education`,amount:280,frequency:`monthly`}];let t={};m.budget.expenses.forEach(e=>{t[e.id]=Math.round(parseFloat(e.amount)*(.4+Math.random()*.7))}),m.budget.actuals[e]=t;let n=e=>{let t=new Date;return t.setDate(t.getDate()+e),t.getDate()},r=e=>{let t=new Date;return t.setDate(t.getDate()+e),t.getMonth()+1};m.bills=[{id:uid(),name:`Electricity`,amount:180,dueDay:n(0),dueMonth:r(0),category:`Utilities`},{id:uid(),name:`Council rates`,amount:420,dueDay:n(1),dueMonth:r(1),category:`Other`},{id:uid(),name:`Phone plan`,amount:45,dueDay:n(2),dueMonth:r(2),category:`Utilities`},{id:uid(),name:`Water bill`,amount:185,dueDay:n(4),dueMonth:r(4),category:`Utilities`},{id:uid(),name:`Internet`,amount:89,dueDay:n(5),dueMonth:r(5),category:`Utilities`},{id:uid(),name:`Spotify`,amount:12,dueDay:n(6),dueMonth:r(6),category:`Subscriptions`},{id:uid(),name:`Home insurance`,amount:290,dueDay:n(14),dueMonth:r(14),category:`Insurance`}],m.goals=[{id:uid(),name:`Emergency fund`,type:`emergency`,targetAmount:25e3,currentAmount:11200,deadline:``},{id:uid(),name:`Europe holiday`,type:`holiday`,targetAmount:8e3,currentAmount:2400,deadline:`2026-12-01`},{id:uid(),name:`New car`,type:`vehicle`,targetAmount:35e3,currentAmount:7800,deadline:`2027-06-01`}],m.netWorth={assets:[{id:uid(),name:`Home`,category:`Property`,amount:85e4},{id:uid(),name:`Super`,category:`Super`,amount:142e3},{id:uid(),name:`Savings`,category:`Savings`,amount:28e3},{id:uid(),name:`Car`,category:`Vehicle`,amount:22e3}],liabilities:[{id:uid(),name:`Mortgage`,category:`Mortgage`,amount:52e4},{id:uid(),name:`Car loan`,category:`Loan`,amount:12e3}],snapshots:[],target:{amount:15e5,byYear:2040}},m.settings={...m.settings,adultName:`Robert Gentilcore`,householdName:`Gentilcore Family`},H(m),renderAll()}function Td(){_routineTodayKey();let e=uid(),t=uid(),n=uid(),r=uid(),i=uid(),a=uid(),o=uid();m.kids={profiles:[{id:e,name:`Amy`,emoji:`🌸`,dob:`2015-03-14`,pinHash:null},{id:t,name:`Johnny`,emoji:`⚡`,dob:`2013-07-22`,pinHash:null}],chores:[{id:n,name:`Make bed`,emoji:`🛏️`,assignedTo:e,points:5,frequency:`Daily`},{id:r,name:`Tidy room`,emoji:`🧹`,assignedTo:e,points:10,frequency:`Daily`},{id:i,name:`Take out bins`,emoji:`🗑️`,assignedTo:t,points:15,frequency:`Weekly`}],prizes:[{id:a,name:`Extra screen time`,emoji:`📱`,pointCost:30},{id:o,name:`Movie night pick`,emoji:`🎬`,pointCost:50},{id:uid(),name:`Takeaway dinner choice`,emoji:`🍕`,pointCost:80}],completions:[{id:uid(),kidId:e,choreId:n,status:`approved`,ts:new Date().toISOString(),completedAt:new Date().toISOString()},{id:uid(),kidId:e,choreId:r,status:`pending`,ts:new Date().toISOString()},{id:uid(),kidId:t,choreId:i,status:`approved`,ts:new Date().toISOString(),completedAt:new Date().toISOString()}],redemptions:[{id:uid(),kidId:e,prizeId:a,status:`pending`,ts:new Date().toISOString()}],notifications:[],allowances:[]},m.childEvents=[{id:uid(),title:`Soccer training`,emoji:`⚽`,date:new Date().toISOString().slice(0,10),time:`17:00`,assignedTo:[t],isHouseholdWide:!1,createdBy:`dev`},{id:uid(),title:`Piano lesson`,emoji:`🎹`,date:new Date(Date.now()+864e5).toISOString().slice(0,10),time:`15:30`,assignedTo:[e],isHouseholdWide:!1,createdBy:`dev`},{id:uid(),title:`Family dinner`,emoji:`🍽️`,date:new Date(Date.now()+2*864e5).toISOString().slice(0,10),time:`19:00`,assignedTo:[],isHouseholdWide:!0,createdBy:`dev`}],H(m),renderAll()}function Ed(){let e=_routineTodayKey(),t=m.kids?.profiles?.[0],n=m.kids?.profiles?.[1],r=[{id:uid(),label:`Make bed`,emoji:`🛏️`,points:5,durationMin:2},{id:uid(),label:`Shower`,emoji:`🚿`,points:5,durationMin:10},{id:uid(),label:`Breakfast`,emoji:`🥣`,points:5,durationMin:15},{id:uid(),label:`Pack bag`,emoji:`🎒`,points:5,durationMin:5}],i=[{id:uid(),label:`Homework`,emoji:`📚`,points:10,durationMin:30},{id:uid(),label:`Tidy room`,emoji:`🧹`,points:5,durationMin:10},{id:uid(),label:`Brush teeth`,emoji:`🦷`,points:5,durationMin:3}],a=[{id:uid(),label:`Exercise`,emoji:`💪`,points:0,durationMin:30},{id:uid(),label:`Meditate`,emoji:`🧘`,points:0,durationMin:10},{id:uid(),label:`Plan the day`,emoji:`📋`,points:0,durationMin:5},{id:uid(),label:`Vitamins`,emoji:`💊`,points:0,durationMin:1}],o=[{id:uid(),label:`Tidy kitchen`,emoji:`🍽️`,points:0,durationMin:10},{id:uid(),label:`Review the day`,emoji:`🪞`,points:0,durationMin:5},{id:uid(),label:`Read`,emoji:`📖`,points:0,durationMin:20},{id:uid(),label:`Lights out`,emoji:`💤`,points:0,durationMin:0}],s=new Date().getHours(),c=uid(),l=uid(),u=uid(),d=uid(),f=[{id:c,name:`Morning`,emoji:`☀️`,ownerType:`adult`,ownerId:`dev`,sharedWith:[],steps:a,pointsPerCompletion:0,triggerTime:`07:00`,recurrence:{type:`weekdays`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[],completions:{}},{id:l,name:`Evening`,emoji:`🌙`,ownerType:`adult`,ownerId:`dev`,sharedWith:[],steps:o,pointsPerCompletion:0,triggerTime:`${String(s).padStart(2,`0`)}:00`,recurrence:{type:`daily`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[],completions:{}},{id:u,name:`Morning routine`,emoji:`🌤️`,ownerType:`household`,ownerId:`dev`,sharedWith:[],steps:r,pointsPerCompletion:10,triggerTime:`07:30`,recurrence:{type:`weekdays`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[]},{id:d,name:`Evening routine`,emoji:`🌙`,ownerType:`household`,ownerId:`dev`,sharedWith:[],steps:i,pointsPerCompletion:10,triggerTime:`${String(s).padStart(2,`0`)}:00`,recurrence:{type:`daily`,startDate:`2026-01-01`},skippedDates:[],pausePeriods:[]}];m.routines=[...(m.routines||[]).filter(e=>e.ownerType!==`adult`&&e.ownerType!==`household`),...f];let p=[];if(t){let n={id:uid(),routineId:u,childId:t.id,completionState:{}};n.completionState[e]=[r[0].id,r[1].id],p.push(n),p.push({id:uid(),routineId:d,childId:t.id,completionState:{}})}n&&(p.push({id:uid(),routineId:u,childId:n.id,completionState:{}}),p.push({id:uid(),routineId:d,childId:n.id,completionState:{}})),m.routineAssignments=[...m.routineAssignments||[],...p];let h=f[0];h.completions[e]=[a[0].id,a[1].id],H(m),renderAll()}function Dd(){let e=new Date().toISOString().slice(0,10),t=new Date(Date.now()+864e5).toISOString().slice(0,10),n=new Date(Date.now()+3*864e5).toISOString().slice(0,10),r=new Date(Date.now()+5*864e5).toISOString().slice(0,10),i=new Date(Date.now()+7*864e5).toISOString().slice(0,10),a=Ft(),o=a[0]?.id||`everyone`,s=a[1]?.id||o;m.planner={events:[{id:uid(),title:`School drop-off`,category:`family`,date:e,time:`08:30`,memberIds:[o],allDay:!1,recurrence:{type:`weekdays`,startDate:`2026-01-01`}},{id:uid(),title:`Team standup`,category:`work`,date:e,time:`09:00`,memberIds:[o],allDay:!1},{id:uid(),title:`Dentist appointment`,category:`health`,date:e,time:`14:00`,memberIds:[o],allDay:!1},{id:uid(),title:`Dinner reservation`,category:`social`,date:e,time:`19:30`,memberIds:[`everyone`],allDay:!1},{id:uid(),title:`Parent–teacher night`,category:`family`,date:t,time:`18:00`,memberIds:[o,s],allDay:!1},{id:uid(),title:`Grocery run`,category:`family`,date:t,time:`10:00`,memberIds:[o],allDay:!1},{id:uid(),title:`Weekend hike`,category:`social`,date:n,time:`08:00`,memberIds:[`everyone`],allDay:!1},{id:uid(),title:`Car service`,category:`home`,date:r,time:`09:00`,memberIds:[o],allDay:!1},{id:uid(),title:`Amy's birthday`,category:`family`,date:i,allDay:!0,memberIds:[`everyone`]}]},H(m),renderAll()}function Od(){new Date().toISOString().slice(0,10);let e=new Date(Date.now()+14*864e5).toISOString().slice(0,10),t=new Date(Date.now()+60*864e5).toISOString().slice(0,10),n=new Date(Date.now()-7*864e5).toISOString().slice(0,10),r=new Date(Date.now()-30*864e5).toISOString().slice(0,10),i=new Date(Date.now()-90*864e5).toISOString().slice(0,10);m.documents=[{id:uid(),name:`Passport — Robert`,provider:`DFAT`,expiryDate:e},{id:uid(),name:`Home insurance`,provider:`NRMA`,expiryDate:t},{id:uid(),name:`Working with children check`,provider:`Service NSW`,expiryDate:r},{id:uid(),name:`First aid certificate`,provider:`St John`,expiryDate:n}],m.vehicles=[{id:uid(),name:`Tesla Model 3`,make:`Tesla`,model:`Model 3`,plate:`ABC123`,regoExpiry:t,insurance:{provider:`NRMA`,renewalDate:t}},{id:uid(),name:`Toyota RAV4`,make:`Toyota`,model:`RAV4`,plate:`XYZ789`,regoExpiry:n,insurance:{provider:`AAMI`,renewalDate:t}}],m.maintenance=[{id:uid(),name:`Gutter clean`,provider:`Jim's`,nextDue:i,frequency:`Biannual`,notes:`Both sides`},{id:uid(),name:`Car service — RAV4`,provider:`Toyota Service`,nextDue:r,frequency:`Annual`,notes:`15,000km service`},{id:uid(),name:`Termite inspection`,provider:`Rentokil`,nextDue:n,frequency:`Annual`,notes:``},{id:uid(),name:`HVAC filter`,provider:``,nextDue:e,frequency:`Quarterly`,notes:``},{id:uid(),name:`Smoke alarm test`,provider:``,nextDue:t,frequency:`Annual`,notes:``}],m.householdProfile={...m.householdProfile,members:[{role:`adult`,name:`Robert`,age:38,emoji:`👨`},{role:`adult`,name:`Sarah`,age:36,emoji:`👩`}]},H(m),renderAll()}function kd(){let e=typeof Ar==`function`?Ar(0):`week-0`,t={},n=[[`Porridge`,`Sandwich & apple`,`Chicken stir-fry`],[`Eggs on toast`,`Leftovers`,`Beef tacos`],[`Smoothie`,`Caesar salad`,`Pasta bolognese`],[`Avocado toast`,`Sushi`,`Lamb roast`],[`Cereal`,`Toasted sandwich`,`Fish & chips`],[`Pancakes`,`Fruit bowl`,`BBQ`],[`French toast`,`Cold cuts`,`Pizza night`]];for(let e=0;e<7;e++)t[e]={b:n[e][0],l:n[e][1],d:n[e][2]};m.meals||(m.meals={plan:{},shopping:[],lunchbox:{profiles:[],plans:{}},pantry:[]}),m.meals.plan[e]=t;let r=m.kids?.profiles?.[0];if(r){let t=typeof Ar==`function`?Ar(0):e;m.meals.lunchbox.plans||(m.meals.lunchbox.plans={}),m.meals.lunchbox.plans[t]||(m.meals.lunchbox.plans[t]={});let n=new Date().getDay()===0?6:new Date().getDay()-1;m.meals.lunchbox.plans[t][r.id]={},m.meals.lunchbox.plans[t][r.id][n]={main:`🥪 Vegemite sandwich`,snack:`🍫 Muesli bar`,fruit:`🍎 Apple`,drink:`💧 Water`}}m.lists||Ts(m);let i=new Date().toISOString();m.lists.food.items=[{id:`dev-f1`,name:`Milk`,quantity:2,unit:`L`,notes:``,aisle:`dairy`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f2`,name:`Eggs`,quantity:1,unit:`dozen`,notes:`Free range`,aisle:`dairy`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f3`,name:`Chicken breast`,quantity:500,unit:`g`,notes:``,aisle:`meat`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f4`,name:`Spinach`,quantity:1,unit:`units`,notes:``,aisle:`produce`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f5`,name:`Bread`,quantity:1,unit:`units`,notes:`Sourdough`,aisle:`bakery`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f6`,name:`Pasta`,quantity:500,unit:`g`,notes:``,aisle:`pantry`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f7`,name:`Beer`,quantity:1,unit:`units`,notes:``,aisle:`drinks`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f8`,name:`Avocado`,quantity:2,unit:`units`,notes:``,aisle:`produce`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f9`,name:`Butter`,quantity:1,unit:`units`,notes:`Salted`,aisle:`dairy`,state:`got_it`,addedBy:`dev`,addedAt:i,stateChangedAt:i,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f10`,name:`Orange juice`,quantity:1,unit:`L`,notes:``,aisle:`drinks`,state:`got_it`,addedBy:`dev`,addedAt:i,stateChangedAt:i,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-f11`,name:`Oat milk`,quantity:1,unit:`L`,notes:``,aisle:`dairy`,state:`not_found`,addedBy:`dev`,addedAt:i,stateChangedAt:i,mealTag:null,manualPrice:null,barcodeId:null}],m.lists.food.weeklyBudget=200,m.lists.food.favourites=[{name:`Milk`,addedCount:8,pinned:!0},{name:`Eggs`,addedCount:7,pinned:!0},{name:`Bread`,addedCount:6,pinned:!1},{name:`Chicken breast`,addedCount:5,pinned:!1},{name:`Butter`,addedCount:4,pinned:!1}],m.lists.wishlist.items=[{id:`dev-w1`,name:`AirPods Pro`,quantity:1,unit:`units`,notes:`Gen 2`,aisle:`other`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-w2`,name:`Standing desk mat`,quantity:1,unit:`units`,notes:``,aisle:`other`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null},{id:`dev-w3`,name:`Kindle Paperwhite`,quantity:1,unit:`units`,notes:``,aisle:`other`,state:`active`,addedBy:`dev`,addedAt:i,stateChangedAt:null,mealTag:null,manualPrice:null,barcodeId:null}],H(m),renderAll()}function Ad(){wd(),Td(),Ed(),Dd(),Od(),kd()}function jd(){if(!confirm(`Reset all data to empty defaults?`))return;let e=JSON.parse(JSON.stringify(Fs));e.onboarded=!0,e.setupProgressDismissed=!1,f(e),H(e),renderAll()}window._acceptInviteAndContinue=Dl,window._addRecurrenceToDate=ir,window._adultPinKey=Cc,window._adultPinSubmit=wc,window._applyActiveProfile=fc,window._applyChildNav=pc,window._applyMigrations=Ts,window._assignmentCompletedToday=_assignmentCompletedToday,window._assignmentHistory=_assignmentHistory,window._assignmentStreak=_assignmentStreak,window._autoCreateRecurringEvents=ar,window._briefIcon=ki,window._briefRow=Pi,window._budgetAllocByCategory=Oo,window._buildTotoContext=_r,window._capacitorPrefs=Us,window._categoryIcon=jo,window._checkInviteOnLoad=_l,window._checkMissionEscalation=ld,window._checkSettingsUnsaved=vo,window._chipClassFor=Ai,window._chipLabelFor=ji,window._cleanupGuide=_cleanupGuide,window._copyInviteLinkForMember=dl,window._csOpen=Ms,window._csvSetExpense=Ru,window._csvToggle=Iu,window._csvToggleAll=Lu,window._csvUpdateApplyBtn=zu,window._cvAgeBracket=Tc,window._cvCalViewToggle=qc,window._cvConfetti=kc,window._cvDismissNotif=$c,window._cvEventsForDate=zc,window._cvFmt12h=Bc,window._cvMonthDayTap=Zc,window._cvRefreshSchedulePanel=Uc,window._cvRender7Day=Jc,window._cvRenderCalendar=Kc,window._cvRenderMonth=Xc,window._cvRenderPrizesTab=Mc,window._cvRoutineAvailLabel=Oc,window._cvRoutineIsActive=Dc,window._cvRoutineSchedCard=Gc,window._cvScheduleHtml=Wc,window._cvShowDayDetail=Qc,window._cvShowPrizeConfirm=el,window._cvSwitchTab=Rc,window._cvTimeGreeting=Ec,window._cvToggleRoutineExpand=Vc,window._cvToggleStepFromCal=Hc,window._cvUpdatePrizesBadge=jc,window._cvViewCalendar=_cvViewCalendar,window._cvWeekDayTap=Yc,window._deleteChildEvent=_deleteChildEvent,window._devLoadAll=Ad,window._devLoadHome=Od,window._devLoadKids=Td,window._devLoadMeals=kd,window._devLoadPlanner=Dd,window._devLoadRoutines=Ed,window._devLoadWallet=wd,window._devReset=jd,window._devToolsClose=Cd,window._devToolsOpen=Sd,window._dismissInviteFlow=Ml,window._docCatMeta=me,window._ensureKidProfileAndPin=ul,window._ensureNWModals=Je,window._estimateLbCalories=_estimateLbCalories,window._estimateMealCalories=Hr,window._fetchAIBriefing=Wi,window._finishInviteJourney=kl,window._getHouseholdDocRef=gs,window._getHouseholdOwnerUID=hs,window._getInviteUrl=fl,window._getNthDayOfMonth=tr,window._getPinTotalAttempts=ql,window._handlePendingInvite=vl,window._hashPin=ec,window._highlightStep=_highlightStep,window._incPinTotalAttempts=Jl,window._inferAisle=Er,window._initAuthListener=Ds,window._isPinHardLocked=Xl,window._listsAddFavourite=ii,window._listsAddItem=Yr,window._listsAddUsual=ai,window._listsArchive=ri,window._listsClearTrolley=ni,window._listsDeleteItem=Zr,window._listsOpenAddForm=$r,window._listsQuickAdd=Qr,window._listsSaveForm=ti,window._listsSetState=Xr,window._listsUpdateParsePreview=oi,window._maintDaysUntil=Se,window._maintNextDue=xe,window._markSettingsDirty=ho,window._mealGetSuggestions=Br,window._mealPill=Lr,window._mealPriceSlide=zr,window._mealToggleFilter=Rr,window._mealWeekDates=jr,window._mealWeekKey=Ar,window._missionDaysIgnored=sd,window._nextForecastMonth=Kt,window._openChildEventModal=_openChildEventModal,window._pantryToAisle=ei,window._parseShopInput=Dr,window._pickAdult=ac,window._pickKid=oc,window._pinKey=uc,window._plannerCloseDaySheet=_plannerCloseDaySheet,window._plannerCloseDetail=_n,window._plannerCloseLifeSheet=mn,window._plannerCloseShare=xn,window._plannerCopyShareUrl=Cn,window._plannerEditFromDetail=yn,window._plannerEvMemberIds=Lt,window._plannerEvPrimaryMember=Rt,window._plannerEvWhoLabel=zt,window._plannerEventsForDate=Ht,window._plannerFmt12h=Ut,window._plannerGoToday=rn,window._plannerHandleDaySheetClick=dn,window._plannerHandleDetailClick=vn,window._plannerHandleLifeSheetClick=hn,window._plannerHandleShareClick=Sn,window._plannerMemberById=It,window._plannerMembers=Ft,window._plannerNextMonth=$t,window._plannerNudges=Tn,window._plannerOpenDaySheet=cn,window._plannerOpenDetail=gn,window._plannerOpenLifeSheet=pn,window._plannerOpenModalFromSheet=fn,window._plannerOpenShare=bn,window._plannerPrevMonth=Qt,window._plannerRecurrenceLabel=Bt,window._plannerRenderDaySheetList=ln,window._plannerSelectDay=en,window._plannerSetView=an,window._plannerShareVia=wn,window._plannerToggleFilter=sn,window._plannerToggleSection=on,window._plannerVisibleEvents=Vt,window._pmDpClear=Jn,window._pmDpNext=Zn,window._pmDpOpen=Wn,window._pmDpOutsideClick=Gn,window._pmDpPrev=Xn,window._pmDpRender=Kn,window._pmDpSelect=qn,window._pmDpToday=Yn,window._pmFmtDate=Rn,window._pmFmtDateShort=zn,window._pmHandleCatChange=Un,window._pmRenderMemberPicker=Bn,window._pmToggleAllDay=Hn,window._pmToggleMember=Vn,window._prevForecastMonth=Gt,window._psoHoldEnd=Ul,window._psoHoldStart=Hl,window._psoKey=Wl,window._psoRender=Vl,window._psoSubmit=Gl,window._psoTourDone=Kl,window._pushAllEventsToBudget=er,window._qaKey=Yu,window._qaSelectCat=Xu,window._qahAction=Gu,window._qahApplyParsed=qu,window._qahSendText=Ku,window._recordInviteAcceptance=Ol,window._recurrenceMatchesDate=_recurrenceMatchesDate,window._refreshSetupProgress=hd,window._renderAdultPinModal=Sc,window._renderAdultRoutines=_renderAdultRoutines,window._renderApiKeySummary=So,window._renderChildEventsMgmt=_renderChildEventsMgmt,window._renderChildRoutines=_renderChildRoutines,window._renderContextBanners=nd,window._renderCsvPreview=Nu,window._renderCsvReview=Fu,window._renderInviteFlow=jl,window._renderLifeAreas=Ni,window._renderLifeScore=fd,window._renderListItem=ui,window._renderListsDetail=li,window._renderListsSelector=ci,window._renderMealPlan=Nr,window._renderMissionCard=pd,window._renderNudgeSection=rr,window._renderPinDots=cc,window._renderPinPad=lc,window._renderPlannerAgenda=tn,window._renderPlannerEventRow=Zt,window._renderPlannerMonthGrid=Yt,window._renderPlannerWeekStrip=Xt,window._renderQAHub=Wu,window._renderQASheet=Ju,window._renderRoutinesTodayCard=_renderRoutinesTodayCard,window._renderShoppingList=Ur,window._renderSuggestionsSection=_renderSuggestionsSection,window._renderTourSlide=wl,window._renderWeekStrip=Mi,window._resetPinAttempts=Yl,window._routineAddStep=_routineAddStep,window._routineAddSuggestion=_routineAddSuggestion,window._routineAssertScope=_routineAssertScope,window._routineAvailableSuggestions=_routineAvailableSuggestions,window._routineAwardPoints=_routineAwardPoints,window._routineAwardStepPoints=_routineAwardStepPoints,window._routineCheckDailyReset=_routineCheckDailyReset,window._routineCompletedToday=_routineCompletedToday,window._routineCreate=_routineCreate,window._routineCurrentUserId=_routineCurrentUserId,window._routineDateKey=_routineDateKey,window._routineDelete=_routineDelete,window._routineDeleteChild=_routineDeleteChild,window._routineDeleteStep=_routineDeleteStep,window._routineDragEnd=_routineDragEnd,window._routineDragOver=_routineDragOver,window._routineDragStart=_routineDragStart,window._routineDrop=_routineDrop,window._routineDuplicateFromJoined=_routineDuplicateFromJoined,window._routineDuplicateTo=_routineDuplicateTo,window._routineEdit=_routineEdit,window._routineEditStep=_routineEditStep,window._routineEditSuggestion=_routineEditSuggestion,window._routineExpandSugg=_routineExpandSugg,window._routineGetAssignment=_routineGetAssignment,window._routineHistory=_routineHistory,window._routineIntelNudge=_routineIntelNudge,window._routineIsOwner=_routineIsOwner,window._routineJoin=_routineJoin,window._routineKids=_routineKids,window._routineLeave=_routineLeave,window._routineManageAssignments=_routineManageAssignments,window._routineMatchesDate=_routineMatchesDate,window._routineNextId=_routineNextId,window._routineOtherAdults=_routineOtherAdults,window._routinePauseMenu=_routinePauseMenu,window._routinePropagateStepAdd=_routinePropagateStepAdd,window._routinePropagateStepDelete=_routinePropagateStepDelete,window._routineRecurrenceCollect=_routineRecurrenceCollect,window._routineRecurrenceFormHtml=_routineRecurrenceFormHtml,window._routineRecurrenceSummaryUpdate=_routineRecurrenceSummaryUpdate,window._routineRecurrenceTypeChange=_routineRecurrenceTypeChange,window._routineRemovePause=_routineRemovePause,window._routineResetToday=_routineResetToday,window._routineResetTodayAllKids=_routineResetTodayAllKids,window._routineResetTodayKid=_routineResetTodayKid,window._routineSaveValidated=_routineSaveValidated,window._routineSetTab=_routineSetTab,window._routineShareMenu=_routineShareMenu,window._routineShowHistory=_routineShowHistory,window._routineSkipDay=_routineSkipDay,window._routineStreak=_routineStreak,window._routineTodayKey=_routineTodayKey,window._routineToggleAssignment=_routineToggleAssignment,window._routineToggleShare=_routineToggleShare,window._routineToggleStep=_routineToggleStep,window._routineToggleStepKid=_routineToggleStepKid,window._routineToggleSugg=_routineToggleSugg,window._routineTypeSelect=_routineTypeSelect,window._routineUnassign=_routineUnassign,window._routinesForCurrentUser=_routinesForCurrentUser,window._routinesForHousehold=_routinesForHousehold,window._saveInviteIncome=El,window._saveLbSlot=_saveLbSlot,window._sectionTag=ed,window._secureClear=qs,window._secureGet=Gs,window._securePrewarm=Ws,window._secureSet=Ks,window._setHouseholdOwner=_s,window._setInviteRole=sl,window._setPinHardLock=Zl,window._showGuideStep=_showGuideStep,window._showInviteA1=yl,window._showInviteA3=bl,window._showInviteA4=Cl,window._showInviteExpired=Al,window._showInviteIncomePrompt=Tl,window._showMissionLightbox=cd,window._showParentLockNotification=$l,window._showPinScreen=sc,window._showToast=Jr,window._startFirestoreSync=Es,window._syncVehicleBill=se,window._tdCloseSheet=zi,window._tdOpenHeadsUpSheet=Ii,window._tdOpenSheet=Ri,window._tdOpenSlippingSheet=Li,window._tdToggleStep=Bi,window._ticker=Ao,window._tlItem=td,window._todayAllocSegments=Oi,window._totoAppendMessage=vr,window._totoInitPanel=pr,window._totoRemoveTyping=br,window._totoSend=gr,window._totoSendSuggestion=mr,window._totoShowTyping=yr,window._updateSwitchBtn=dc,window._verifyPin=Ql,window.addActualEntry=Du,window.addCatToGroup=lo,window.addCategory=To,window.addHouseholdMember=Ma,window.addLink=addLink,window.addPet=Fa,window.addSavings=addSavings,window.addShopItem=Wr,window.addSubFromImport=Et,window.adjForm=ba,window.aiPlanLunchbox=aiPlanLunchbox,window.applianceForm=vi,window.applianceFromForm=yi,window.applyCsvImport=Bu,window.approveCompletion=approveCompletion,window.approveRedemption=approveRedemption,window.approveSuggestion=kn,window.assignDevice=rc,window.attachBtn=attachBtn,window.aud=w,window.audD=T,window.billCatIcon=nt,window.billDueBadge=rt,window.billMonthlyEquiv=it,window.billsModal=ct,window.calcFinancialHealth=Qu,window.calcLifeScore=rd,window.calcScenario=fa,window.cancelSettingsChanges=_o,window.clearActivityLog=wo,window.clearAdultPin=vc,window.clearCheckedShopItems=qr,window.clearDeviceProfile=Xs,window.clearKidPin=gc,window.clearKidSession=$s,window.closeBillModal=ut,window.closeModal=B,window.closeNWModal=Xe,window.closeNWTargetModal=Ge,window.closePinSetupOverlay=Bl,window.closeQuickAdd=Uu,window.closeSubModal=St,window.closeTotoAssistant=fr,window.completeMission=od,window.completeWeeklyReset=dd,window.confirmScope=ou,window.copyInviteLink=pl,window.copyMonthFromPrevious=iu,window.customSelect=js,window.cyclePantryStatus=Me,window.deleteAdjustment=Ca,window.deleteAppliance=Si,window.deleteBill=pt,window.deleteCategoryGroup=so,window.deleteChore=deleteChore,window.deleteDoc=ve,window.deleteExpense=cs,window.deleteExtra=Zo,window.deleteFurniture=_i,window.deleteGoal=ca,window.deleteIncome=ns,window.deleteKid=deleteKid,window.deleteLbProfile=deleteLbProfile,window.deleteMaint=Ee,window.deleteNWItem=Qe,window.deletePantryItem=Fe,window.deletePlannerEvent=Nn,window.deletePrize=deletePrize,window.deleteReceiptById=deleteReceiptById,window.deleteScenario=ya,window.deleteService=de,window.deleteStage=Bo,window.deleteSub=wt,window.deleteVariation=Go,window.deleteVehicle=ce,window.detectSpendingPatterns=Ga,window.dismissMission=ad,window.dismissSubResult=Dt,window.dismissSuggestion=An,window.doScopeAll=cu,window.doScopeMonth=su,window.dpClearDate=_u,window.dpDateInput=du,window.dpNextMonth=hu,window.dpPrevMonth=mu,window.dpSelectDate=gu,window.editActual=ku,window.emojiPicker=emojiPicker,window.endGuide=endGuide,window.ensureMonthOverride=nu,window.escAttr=S,window.escHtml=x,window.estimateAllEvents=Jt,window.estimatePlannerEvent=Pn,window.exitChildView=exitChildView,window.expenseCategories=$i,window.expenseForm=rs,window.expenseFromForm=is,window.exportData=Ji,window.extraForm=qo,window.extraFromForm=Jo,window.fileIcon=fileIcon,window.fileSizeStr=fileSizeStr,window.fmtDate=D,window.fmtNW=E,window.freqDisplay=O,window.freqDisplayItem=k,window.freqLabel=ne,window.freqLabelItem=re,window.fundingBadge=fundingBadge,window.furnitureForm=pi,window.furnitureFromForm=mi,window.generateInvite=cl,window.generateMission=id,window.generateShoppingList=di,window.generateSmartInsights=Ja,window.generateSmartInsightsHTML=eo,window.getAIKey=Ha,window.getActual=wu,window.getActualEntries=Cu,window.getBenchmarkStatus=Ba,window.getBenchmarks=za,window.getCategoryHistoryData=Wa,window.getDB=getDB,window.getDeviceProfile=Js,window.getKidSession=Zs,window.getLast6Months=Su,window.getMonthData=Y,window.getReceipts=getReceipts,window.getSeasonalNudges=nr,window.goToPlannerDay=nn,window.goalForm=ra,window.goalFromForm=aa,window.goalProgress=ta,window.guestMode=Cs,window.handleCsvFile=Mu,window.handleDeviceRouting=tc,window.handleSubCSV=Tt,window.hideOnboarding=hideOnboarding,window.importData=Yi,window.incomeCategories=ea,window.incomeForm=Qo,window.incomeFromForm=$o,window.installApp=installApp,window.inviteMember=ll,window.isMonthCustomized=tu,window.isOverdue=te,window.itemMonthly=A,window.kidBalance=kidBalance,window.lbToShoppingList=lbToShoppingList,window.loadColors=Ea,window.loadData=Is,window.logActivity=xs,window.markBillPaid=mt,window.markChoreChildView=tl,window.markChoreDone=markChoreDone,window.markGoalAchieved=la,window.markMaintDone=De,window.monthLabel=bu,window.monthShortLabel=xu,window.monthlyTotal=j,window.nextGuideStep=nextGuideStep,window.nextId=M,window.nextInsightsMonth=no,window.nextMoneyMonth=wi,window.nextMonth=yu,window.nwItemRow=Ve,window.obBack=obBack,window.obFinish=obFinish,window.obNext=obNext,window.obPickEmoji=obPickEmoji,window.obSetAdults=obSetAdults,window.obSetKids=obSetKids,window.obSkip=obSkip,window.obSkipExpenses=obSkipExpenses,window.obStepPosition=obStepPosition,window.obStepSequence=obStepSequence,window.obToggleEmojiPicker=obToggleEmojiPicker,window.obToggleExpenseSkip=obToggleExpenseSkip,window.openActualEditor=Eu,window.openAddAdjustment=Sa,window.openAddAppliance=bi,window.openAddCatToGroup=uo,window.openAddCategoryGroup=ao,window.openAddExpense=os,window.openAddExtra=Yo,window.openAddFurniture=hi,window.openAddGoal=oa,window.openAddIncome=es,window.openAddKidModal=openAddKidModal,window.openAddScenario=_a,window.openAddStage=Ro,window.openAddVariation=Uo,window.openBillModal=lt,window.openChoreModal=openChoreModal,window.openCsvImport=Au,window.openDatePicker=fu,window.openDocForm=ge,window.openEditAppliance=xi,window.openEditContractTotal=Fo,window.openEditExpense=ss,window.openEditExtra=Xo,window.openEditFurniture=gi,window.openEditGoal=sa,window.openEditIncome=ts,window.openEditKidModal=openEditKidModal,window.openEditScenario=va,window.openEditStage=zo,window.openEditVariation=Wo,window.openEmojiPickerModal=io,window.openIconPickerForGroup=oo,window.openLunchboxEdit=openLunchboxEdit,window.openLunchboxProfile=openLunchboxProfile,window.openMaintForm=we,window.openMealEdit=Ir,window.openModal=z,window.openNWModal=Ye,window.openNWTargetModal=We,window.openNavGroupFor=fs,window.openPantryForm=Ne,window.openPinSetup=zl,window.openPlannerModal=Ln,window.openPrizeModal=openPrizeModal,window.openQuickAdd=Hu,window.openReceiptsModal=openReceiptsModal,window.openSavingsModal=openSavingsModal,window.openServiceForm=le,window.openSubModal=xt,window.openTotoAssistant=dr,window.openVehicleForm=N,window.openWeeklyReset=ud,window.ordinal=xd,window.pantryToShoppingList=Le,window.parseBankCSV=ju,window.pickEmoji=pickEmoji,window.pickedEmoji=pickedEmoji,window.prevInsightsMonth=to,window.prevMoneyMonth=Ci,window.prevMonth=vu,window.prevMonthStr=ru,window.profileAdults=Aa,window.profileChildren=ja,window.quickAddMaint=Oe,window.quickAddPantry=Ie,window.redeemPrizeChildView=nl,window.refreshReceiptCounts=refreshReceiptCounts,window.rejectCompletion=rejectCompletion,window.rejectRedemption=rejectRedemption,window.removeActualEntry=Ou,window.removeApiKey=xo,window.removeCatFromGroup=fo,window.removeCategory=Eo,window.removeHouseholdMember=Na,window.removePet=Ia,window.removeReceipt=removeReceipt,window.removeShopItem=Kr,window.renderAll=renderAll,window.renderApprovals=renderApprovals,window.renderBenchmarksSection=Qa,window.renderBills=at,window.renderBudget=Mo,window.renderBudgetForecast=$n,window.renderBudgetSuggestions=jn,window.renderBuild=Qi,window.renderCategoryBreakdown=Ka,window.renderChoreMgmt=renderChoreMgmt,window.renderDashboard=Gi,window.renderDocuments=he,window.renderDpCalendar=pu,window.renderExpenseGroups=Do,window.renderForecast=qt,window.renderGoals=na,window.renderInsightCards=Za,window.renderInsights=$a,window.renderKidView=renderKidView,window.renderKids=renderKids,window.renderKidsOverview=renderKidsOverview,window.renderKidsParent=renderKidsParent,window.renderLists=si,window.renderLunchbox=renderLunchbox,window.renderMaintenance=Ce,window.renderMeals=Mr,window.renderMoneyDashboard=Ti,window.renderNWDebtCard=Ue,window.renderNWTargetCard=He,window.renderNWTrend=qe,window.renderNetWorth=Be,window.renderObStep=renderObStep,window.renderPantry=je,window.renderPlanner=I,window.renderPrizeMgmt=renderPrizeMgmt,window.renderReceiptsList=renderReceiptsList,window.renderRoutines=renderRoutines,window.renderScenarios=pa,window.renderSettings=Ki,window.renderSetupProgress=Ei,window.renderSpendingPatterns=qa,window.renderSubImportResults=bt,window.renderSubscriptions=st,window.renderToday=Fi,window.renderVehicles=ae,window.requestRedemption=requestRedemption,window.resetAllData=qi,window.resetKidPinLock=eu,window.revokeInvite=hl,window.runAIInsights=Xa,window.runCsvCategorise=Pu,window.safeRender=safeRender,window.sanitiseState=ie,window.saveAIKey=Ua,window.saveApiKey=bo,window.saveBill=ft,window.saveChore=saveChore,window.saveColors=Da,window.saveData=H,window.saveDoc=_e,window.saveKid=saveKid,window.saveLbProfile=saveLbProfile,window.saveMaint=Te,window.saveMealSlot=Vr,window.saveNWItem=Ze,window.saveNWSnapshot=$e,window.saveNWTarget=Ke,window.savePantryItem=Pe,window.savePlannerEvent=Qn,window.savePrize=savePrize,window.saveQuickAdd=Zu,window.saveReceipt=saveReceipt,window.saveService=ue,window.saveSettingsChanges=go,window.saveSub=Ct,window.saveVehicle=oe,window.scenarioForm=ha,window.scenarioFromForm=ga,window.sendInviteEmail=ml,window.sendTotoMessage=hr,window.setActual=Tu,window.setAdultPin=_c,window.setBillsFilter=ot,window.setBudgetView=Zi,window.setDeviceProfile=Ys,window.setExpenseFilter=vd,window.setKidPin=hc,window.setKidSession=Qs,window.setupProgressTasks=md,window.showChildView=Ac,window.showDeviceSetup=nc,window.showOnboarding=showOnboarding,window.showProfileSelector=ic,window.signInWithGoogle=Ss,window.signOutUser=ws,window.sortExpenses=yd,window.stageForm=Io,window.stageFromForm=Lo,window.startGuide=startGuide,window.startHealthGuide=startHealthGuide,window.subCatIcon=gt,window.subMonthlyAmount=_t,window.suggestEventToBudget=On,window.switchProfile=mc,window.switchToKidMode=rl,window.thSort=bd,window.toggleAdjFields=xa,window.toggleBillDayField=dt,window.toggleBudgetDetail=Po,window.toggleCustomFreq=as,window.toggleGoalFields=ia,window.toggleGroupExpand=Xi,window.toggleHealthPopover=toggleHealthPopover,window.toggleInsightSheet=Vi,window.toggleNavGroup=ds,window.togglePlannerCard=En,window.togglePlannerEstimate=Dn,window.toggleScenario=ma,window.toggleSettingsSection=Co,window.toggleShopItem=Gr,window.toggleSidebar=ls,window.toggleTotoAssistant=ur,window.uid=uid,window.unpushEventFromBudget=Mn,window.updateCars=Ra,window.updateCategoryGroup=co,window.updateColor=ka,window.updateMember=Pa,window.updatePet=La,window.updateSetting=yo,window.upgradeSelects=Ns,window.uploadFiles=uploadFiles,window.uploadReceiptFiles=uploadReceiptFiles,window.variationForm=Vo,window.variationFromForm=Ho,window.viewChildToday=viewChildToday,window.viewReceipt=viewReceipt;
//# sourceMappingURL=index-D0fSCoLU.js.map
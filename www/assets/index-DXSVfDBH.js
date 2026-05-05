import{initializeApp as e}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{GoogleAuthProvider as t,getAuth as n,onAuthStateChanged as r,signInWithPopup as i,signOut as a}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";import{deleteDoc as o,doc as s,enableIndexedDbPersistence as c,getDoc as l,getFirestore as u,onSnapshot as d,setDoc as f}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var p=e(window.__FIREBASE_CONFIG__),m=n(p),h=u(p);c(h,{forceOwnership:!1}).catch(e=>{e.code!==`failed-precondition`&&e.code!==`unimplemented`&&console.warn(`Firestore persistence error:`,e.code)}),window.fbAuth={_auth:m,onAuthStateChanged:e=>r(m,e),signInWithPopup:e=>i(m,e),signOut:()=>a(m),GoogleAuthProvider:t,get currentUser(){return m.currentUser}},window.fbStore={_db:h,collection:e=>({doc:t=>({_ref:s(h,e,t),get:()=>l(s(h,e,t)),set:n=>f(s(h,e,t),n),delete:()=>o(s(h,e,t)),onSnapshot:(n,r)=>d(s(h,e,t),n,r)})})},window.__firebaseReady=!0,window.dispatchEvent(new Event(`firebase-ready`));function g(e,t){return t===`daily`?e*365/12:t===`weekly`?e*52/12:t===`fortnightly`?e*26/12:t===`quarterly`?e/3:t===`annually`||t===`annual`?e/12:e}function _(e){let t=new Date;t.setHours(0,0,0,0);let n=e.frequency||`Monthly`;if(n===`Monthly`){let n=parseInt(e.dueDay)||1,r=new Date(t.getFullYear(),t.getMonth(),n);return r<t&&(r=new Date(t.getFullYear(),t.getMonth()+1,n)),r}let r=e.lastPaid?new Date(e.lastPaid):e.startDate?new Date(e.startDate):t;r.setHours(0,0,0,0);let i={Weekly:7,Fortnightly:14,Quarterly:91,Annually:365}[n]||30,a=new Date(r);for(;a<=t;)a=new Date(a.getTime()+i*864e5);return a}function v(e){let t=new Date;t.setHours(0,0,0,0);let n=_(e);return Math.round((n-t)/864e5)}var y={},b=new Set;function x(e){return b.add(e),()=>b.delete(e)}function S(e){y=e}var C=new Proxy({},{get(e,t){if(t!==`then`)return y[t]},set(e,t,n){return y[t]=n,!0},has(e,t){return t in y},ownKeys(){return Reflect.ownKeys(y)},getOwnPropertyDescriptor(e,t){let n=Object.getOwnPropertyDescriptor(y,t);return n?{...n,configurable:!0}:void 0}}),w={wallet:{navTab:`budget`,label:`Wallet`,tabs:[{tab:`budget`,label:`Budget`},{tab:`bills`,label:`Bills`},{tab:`networth`,label:`Net Worth`},{tab:`goals`,label:`Goals`},{tab:`insights`,label:`Insights`},{tab:`build`,label:`Build`}]},plan:{navTab:`planner`,label:`Plan`,tabs:[{tab:`planner`,label:`Planner`},{tab:`forecast`,label:`Forecast`},{tab:`meals`,label:`Meals`},{tab:`lunchbox`,label:`Lunchbox`},{tab:`pantry`,label:`Pantry`},{tab:`routines`,label:`Routines`},{tab:`lists`,label:`Lists`}]},home:{navTab:`documents`,label:`Home`,tabs:[{tab:`documents`,label:`Documents`},{tab:`vehicles`,label:`Vehicles`},{tab:`maintenance`,label:`Maintenance`},{tab:`kids`,label:`Kids`}]}},T=()=>{};function ee(e){T=e}function E(e){for(let[t,n]of Object.entries(w))if(n.tabs.some(t=>t.tab===e))return t;return null}function te(){let e=document.querySelector(`.tab-panel.active`);return e?e.id.replace(`tab-`,``):`today`}function D(e){if(!e)return;let t=e.querySelector(`.section-pills`);if(!t)return;let n=t.scrollWidth-t.scrollLeft-t.clientWidth>4,r=t.scrollLeft>4;e.classList.toggle(`has-overflow-right`,n),e.classList.toggle(`has-overflow-left`,r)}function O(e){e===`subscriptions`&&(e=`bills`),e===`scenarios`&&(e=`insights`),e===`money`&&(e=`budget`),e===`dashboard`&&(e=`budget`),document.getElementById(`tab-`+e)||(e=`today`),typeof window._checkSettingsUnsaved==`function`&&te()===`settings`&&e!==`settings`&&window._checkSettingsUnsaved(e),document.querySelectorAll(`.nav-item, .nav-text-item, .bn-item`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.tab-panel`).forEach(e=>e.classList.remove(`active`));let t=document.getElementById(`tab-`+e);t&&t.classList.add(`active`);let n=E(e);if(n){let e=w[n].navTab;document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`))}else document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`));if(document.body.dataset.section=n||e,document.querySelectorAll(`.static-section-header`).forEach(e=>e.classList.remove(`active`)),n){let t=document.getElementById(n+`-section-header`);if(t){t.classList.add(`active`);let r=document.getElementById(n+`-header-date`);r&&(r.textContent=new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`})),t.querySelectorAll(`.section-pill`).forEach(t=>t.classList.toggle(`active`,t.dataset.pill===e)),requestAnimationFrame(()=>t.querySelectorAll(`.section-pills-wrap`).forEach(D))}}T()}function k(e){e===`subscriptions`&&(e=`bills`),e===`scenarios`&&(e=`insights`),e===`money`&&(e=`budget`),e===`dashboard`&&(e=`budget`),(location.hash.slice(1)||`today`)!==e&&history.pushState({tab:e},``,`#`+e),O(e)}window.addEventListener(`popstate`,e=>{O(e.state?.tab||location.hash.slice(1)||`today`)}),(function(){let e=location.hash.slice(1)||`today`;history.replaceState({tab:e},``,e===`today`?location.pathname+location.search:`#`+e)})(),window.addEventListener(`unhandledrejection`,e=>{console.error(`[unhandledrejection]`,e.reason)}),window.addEventListener(`error`,e=>{console.error(`[uncaughtError]`,e.message,e.filename,e.lineno)});var A=`toto_household_owner`,j=`toto_pending_household`;function M(){return sessionStorage.getItem(j)||Ce(A)||P?.uid||null}function N(){let e=M();return e?fbStore.collection(`families`).doc(e):null}function ne(e){we(A,e),sessionStorage.removeItem(j)}var P=null,F=null,I=null;function re(e){return e.budget||(e.budget={income:[],expenses:[],actuals:{},months:{}}),e.budget.actuals||(e.budget.actuals={}),e.budget.months||(e.budget.months={}),e.budget.suggestions||(e.budget.suggestions=[]),e.goals||(e.goals=[]),e.scenarios||(e.scenarios=[]),e.furniture||(e.furniture=[]),e.appliances||(e.appliances=[]),e.planner||(e.planner={events:[]}),e.lists||(e.lists={food:{items:[],budget:0,weeklyBudget:200,stores:[],favourites:[],history:[]},clothes:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},wishlist:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},home:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]},pharmacy:{items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]}},e.meals&&e.meals.shopping&&e.meals.shopping.length&&(e.lists.food.items=e.meals.shopping.map(function(e,t){return{id:`si-`+t,name:e.name,quantity:1,unit:`units`,notes:``,aisle:e.cat||`other`,state:e.checked?`got_it`:`active`,addedBy:`migration`,addedAt:new Date().toISOString(),mealTag:null,manualPrice:null,barcodeId:null}}))),[`food`,`clothes`,`wishlist`,`home`,`pharmacy`].forEach(function(t){e.lists[t]||(e.lists[t]={items:[],budget:0,weeklyBudget:0,stores:[],favourites:[],history:[]}),e.lists[t].items||(e.lists[t].items=[]),e.lists[t].stores||(e.lists[t].stores=[]),e.lists[t].favourites||(e.lists[t].favourites=[]),e.lists[t].history||(e.lists[t].history=[])}),e}function ie(){F&&F(),!Ce(A)&&!sessionStorage.getItem(j)&&ne(P.uid);let e=N();if(!e){console.error(`No household doc ref`);return}F=e.onSnapshot(async t=>{if(t.exists){let e=re(t.data());Object.assign(C,e),localStorage.setItem(L,JSON.stringify(C))}else{let t=await fbStore.collection(`family`).doc(`shared`).get().catch(()=>null);if(t&&t.exists){let n=re(t.data());Object.assign(C,n),e.set(C).catch(()=>{}),localStorage.setItem(L,JSON.stringify(C))}else e.set(C).catch(()=>{})}$r().then(()=>{Xi();let e=location.hash.slice(1);if(e&&document.getElementById(`tab-`+e)?(history.replaceState({tab:e},``,`#`+e),O(e)):Lr(),!C.onboarded)ui();else{let e=sessionStorage.getItem(Xe),t=sessionStorage.getItem(`toto_post_invite_action`);e||t?(sessionStorage.removeItem(`toto_post_invite_action`),Qe()):Ae()}})},e=>{console.error(`Firestore sync error:`,e),Lr(),C.onboarded||ui()})}function ae(){fbAuth.onAuthStateChanged(e=>{P=e;let t=document.getElementById(`login-overlay`),n=document.getElementById(`header-avatar`),r=document.getElementById(`header-sign-out`);if(e)t&&t.classList.add(`hidden`),n&&(n.src=e.photoURL||``,n.style.display=`block`),r&&(r.style.display=`block`),ie();else{t&&t.classList.remove(`hidden`),n&&(n.style.display=`none`),r&&(r.style.display=`none`),F&&(F(),F=null);let e=sessionStorage.getItem(Xe),i=document.getElementById(`login-invite-banner`),a=document.getElementById(`login-tagline`);e&&i&&(i.style.display=`block`,a&&(a.style.display=`none`))}})}window.__firebaseReady?ae():window.addEventListener(`firebase-ready`,ae,{once:!0});var L=`home_finance_v1`,oe=null,se={};function ce(e,t,n,r){se[e]={options:t,value:n,onChange:r};let i=t.find(e=>(e.value??e)===n)||t[0],a=i?.label??i?.value??i??``;return`<div class="cs-wrap">
    <button type="button" class="cs-trigger" id="cs-${e}" onclick="event.stopPropagation();_csOpen('${e}',this)">
      <span id="cs-label-${e}">${R(String(a))}</span>
      <span class="cs-chevron">▼</span>
    </button>
  </div>`}document.addEventListener(`click`,()=>{oe&&(oe.remove(),oe=null,document.querySelectorAll(`.cs-trigger.open`).forEach(e=>e.classList.remove(`open`)))});function le(e){e&&e.querySelectorAll(`select.form-select:not(.cs-upgraded)`).forEach(e=>{e.classList.add(`cs-upgraded`);let t=(e.id||`cs`+Math.random().toString(36).slice(2,7))+`__cs`,n=Array.from(e.options).map(e=>({value:e.value,label:e.text})),r=e.value||n[0]?.value||``;e.style.cssText=`position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;overflow:hidden`;let i=document.createElement(`div`);i.className=`cs-wrap`,i.innerHTML=ce(t,n,r,t=>{e.value=t,e.dispatchEvent(new Event(`change`,{bubbles:!0}))}),e.parentNode.insertBefore(i,e)})}(function(){let e=document.getElementById(`modal-overlay`);e&&new MutationObserver(()=>{e.classList.contains(`hidden`)||le(document.getElementById(`modal-body`))}).observe(e,{attributes:!0,attributeFilter:[`class`]})})();function R(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function z(e){return R(e).replace(/\\/g,`\\\\`)}function ue(e){function t(e){if(!(!e||typeof e!=`object`))for(let n of Object.keys(e))typeof e[n]==`string`&&e[n].length>500?e[n]=e[n].slice(0,500):Array.isArray(e[n])?e[n].forEach(e=>t(e)):typeof e[n]==`object`&&e[n]!==null&&t(e[n])}t(e)}var de=`https://wandering-mouse-3925.fuscocl.workers.dev`,fe={buildContract:{total:79e4,stages:[{id:1,name:`Deposit`,amount:39500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:2,name:`Base / Slab`,amount:79e3,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:3,name:`Frame`,amount:118500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:4,name:`Lock-up / Enclosed`,amount:276500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:5,name:`Fixing / Fitout`,amount:197500,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``},{id:6,name:`Practical Completion`,amount:79e3,paid:!1,paidDate:``,expectedDate:``,invoiceRef:``,funding:`loan`,notes:``}],variations:[]},extras:[{id:1,name:`Solar`,vendor:``,totalAmount:0,amountPaid:0,dueDate:``,notes:``},{id:2,name:`Landscaping`,vendor:``,totalAmount:0,amountPaid:0,dueDate:``,notes:``}],furniture:[],appliances:[],goals:[],scenarios:[],kids:{profiles:[],chores:[],prizes:[],completions:[],redemptions:[]},netWorth:{assets:[],liabilities:[],snapshots:[],target:{amount:0,byYear:0}},bills:[],subscriptions:[],planner:{events:[]},meals:{plan:{},shopping:[],lunchbox:{profiles:[],plans:{}},pantry:[]},vehicles:[],documents:[],maintenance:[],onboarded:!1,setupProgressDismissed:!1,activityLog:[],householdProfile:{members:[{role:`adult`,age:null},{role:`adult`,age:null}],pets:[],cars:1,invites:[],authorizedUsers:[]},expenseCategories:[`Mortgage / Rent`,`Insurance`,`Utilities`,`Groceries`,`Transport`,`Childcare / Education`,`Health`,`Entertainment`,`Subscriptions`,`Dining Out`,`Clothing`,`Personal Care`,`Savings / Investment`,`Other`],incomeCategories:[`Salary`,`Freelance / Contract`,`Rental Income`,`Government / Benefits`,`Investment`,`Other`],budget:{income:[],expenses:[],actuals:{},months:{}},settings:{autoFillMonths:!1},categoryGroups:[{id:1,name:`Housing`,icon:`🏠`,categories:[`Mortgage / Rent`,`Utilities`,`Insurance`]},{id:2,name:`Food & Dining`,icon:`🍽️`,categories:[`Groceries`,`Dining Out`]},{id:3,name:`Transport`,icon:`🚗`,categories:[`Transport`]},{id:4,name:`Family & Health`,icon:`👨‍👩‍👧`,categories:[`Childcare / Education`,`Health`,`Personal Care`]},{id:5,name:`Lifestyle`,icon:`🎮`,categories:[`Entertainment`,`Subscriptions`,`Clothing`]},{id:6,name:`Savings`,icon:`💰`,categories:[`Savings / Investment`]},{id:7,name:`Other`,icon:`📦`,categories:[`Other`]}],routines:[],routineAssignments:[],childEvents:[]};function pe(){try{let e=localStorage.getItem(L);if(!e)return JSON.parse(JSON.stringify(fe));let t=JSON.parse(e);t.budget.actuals||(t.budget.actuals={}),t.budget.months||(t.budget.months={}),t.budget.suggestions||(t.budget.suggestions=[]),t.goals||(t.goals=[]),t.scenarios||(t.scenarios=[]),t.netWorth||(t.netWorth={assets:[],liabilities:[],snapshots:[]}),t.netWorth.snapshots||(t.netWorth.snapshots=[]),t.netWorth.target||(t.netWorth.target={amount:0,byYear:0}),t.bills||(t.bills=[]),t.subscriptions||(t.subscriptions=[]),t.onboarded===void 0&&(t.onboarded=!0),t.planner||(t.planner={events:[]}),t.planner?.events&&t.planner.events.forEach(e=>{if(e.recurring||(e.recurring=`none`),!e.recurrence&&e.recurring&&e.recurring!==`none`){let t={weekly:{type:`interval`,intervalDays:7},fortnightly:{type:`interval`,intervalDays:14},monthly:{type:`interval`,intervalDays:30},quarterly:{type:`interval`,intervalDays:91},yearly:{type:`interval`,intervalDays:365}}[e.recurring];t&&(e.recurrence={...t,startDate:e.date||new Date().toISOString().slice(0,10)})}}),t.kids||(t.kids={profiles:[],chores:[],prizes:[],completions:[],redemptions:[]}),t.kids.profiles||(t.kids.profiles=[]),t.kids.chores||(t.kids.chores=[]),t.kids.prizes||(t.kids.prizes=[]),t.kids.completions||(t.kids.completions=[]),t.kids.redemptions||(t.kids.redemptions=[]);let n=new Map;if(t.kids.profiles.forEach(e=>{e.name&&n.set(e.name.toLowerCase(),e)}),n.size<t.kids.profiles.length&&(t.kids.profiles=Array.from(n.values())),t.furniture||(t.furniture=[]),t.appliances||(t.appliances=[]),t.activityLog||(t.activityLog=[]),!t.householdProfile)t.householdProfile={members:[{role:`adult`,age:null},{role:`adult`,age:null}],pets:[],cars:1};else if(`adults`in t.householdProfile){let e=t.householdProfile.adults||2,n=t.householdProfile.children||0;t.householdProfile={members:[...Array.from({length:e},()=>({role:`adult`,age:null})),...Array.from({length:n},()=>({role:`child`,age:null}))],pets:[],cars:1}}t.householdProfile.pets||(t.householdProfile.pets=[]),t.householdProfile.cars===void 0&&(t.householdProfile.cars=1),t.householdProfile.invites||(t.householdProfile.invites=[]),t.householdProfile.authorizedUsers||(t.householdProfile.authorizedUsers=[]),(t.householdProfile.members||[]).forEach((e,n)=>{if(!e.name)if(e.role===`child`){let r=(t.kids?.profiles||[])[n-(t.householdProfile.members||[]).filter((e,t)=>t<n&&e.role===`adult`).length];r?.name&&(e.name=r.name,!e.age&&r.age&&(e.age=r.age),!e.emoji&&r.emoji&&(e.emoji=r.emoji))}else{let r=(t.budget?.income||[])[(t.householdProfile.members||[]).filter((e,t)=>t<n&&e.role===`adult`).length];if(r?.name){let t=r.name.match(/^([^'\s]+)'s\s/i)||r.name.match(/^([^'\s]+)\s/);t&&(e.name=t[1])}}}),t.meals||(t.meals={plan:{},shopping:[]}),t.meals.plan||(t.meals.plan={}),t.meals.shopping||(t.meals.shopping=[]),t.meals.lunchbox||(t.meals.lunchbox={profiles:[],plans:{}}),t.meals.lunchbox.profiles||(t.meals.lunchbox.profiles=[]),t.meals.lunchbox.plans||(t.meals.lunchbox.plans={}),t.meals.pantry||(t.meals.pantry=[]),t.vehicles||(t.vehicles=[]),t.documents||(t.documents=[]),t.maintenance||(t.maintenance=[]),t.routines||(t.routines=[]),t.routineAssignments||(t.routineAssignments=[]);let r=new Set((t.routineAssignments||[]).map(e=>e.routineId));if(t.routines.forEach(e=>{if(e.completions||(e.completions={}),e.sharedWith||(e.sharedWith=[]),e.assignedTo||(e.assignedTo=[]),e.linkedFrom||(e.linkedFrom=null),e.linkedType||(e.linkedType=null),e.pointsPerCompletion===void 0&&(e.pointsPerCompletion=0),(e.steps||[]).forEach(e=>{e.points===void 0&&(e.points=0)}),e.skippedDates||(e.skippedDates=[]),e.pausePeriods||(e.pausePeriods=[]),e.recurrence||(e.recurrence={type:`daily`,startDate:(e.lastEditedAt||new Date().toISOString()).slice(0,10)}),(!e.ownerType||!e.ownerId)&&(r.has(e.id)?(e.ownerType=`household`,e.ownerId=`household`):(e.ownerType=`adult`,e.ownerId=`guest`)),r.has(e.id)&&e.ownerType!==`household`&&(e.ownerType=`household`,e.ownerId=`household`),e.ownerType===`adult`&&e.ownerId===`guest`&&e.steps?.length>0){let t=new Set([`Make bed`,`Shower`,`Breakfast`,`Exercise`,`Plan the day`,`Tidy kitchen`,`Prep tomorrow`,`Family time`,`Read`,`Lights out`]);e.steps.every(e=>t.has(e.label))&&(e.steps=[])}}),t.routineAssignments.forEach(e=>{if(!e.completionState){let n=t.routines.find(t=>t.id===e.routineId);e.completionState=n&&Object.keys(n.completions||{}).length?JSON.parse(JSON.stringify(n.completions)):{}}e.archivedCompletionState||(e.archivedCompletionState=null),e.childIds||(e.childIds=e.childId?[e.childId]:[])}),t.routines.forEach(e=>{e.ownerType===`household`&&(e.completions={})}),t.childEvents||(t.childEvents=[]),t.childEvents.forEach(e=>{e.recurrence||(e.recurrence=null),e.assignedTo||(e.assignedTo=[]),e.isHouseholdWide===void 0&&(e.isHouseholdWide=!1)}),t.settings||(t.settings={autoFillMonths:!1}),t.settings.notifStyle||(t.settings.notifStyle=`focus-timeline`),t.settings.routineResetHour===void 0&&(t.settings.routineResetHour=0),t.kids.notifications||(t.kids.notifications=[]),t.settings.typeAMode===void 0&&(t.settings.typeAMode=!1),t.settings.typeAStreak||(t.settings.typeAStreak=0),t.settings.typeALastReset||(t.settings.typeALastReset=``),t.settings.typeADismissedMission||(t.settings.typeADismissedMission=``),t.settings.typeAMissionShownDate||(t.settings.typeAMissionShownDate=``),t.settings.typeAMissionId||(t.settings.typeAMissionId=``),t.settings.typeALastResetDate||(t.settings.typeALastResetDate=``),t.categoryGroups||(t.categoryGroups=JSON.parse(JSON.stringify(fe.categoryGroups))),t.buildContract.variations||(t.buildContract.variations=[]),t.buildContract.stages.forEach(e=>{e.expectedDate||(e.expectedDate=``)}),t.expenseCategories||(t.expenseCategories=JSON.parse(JSON.stringify(fe.expenseCategories))),t.incomeCategories||(t.incomeCategories=JSON.parse(JSON.stringify(fe.incomeCategories))),t.budget&&t.budget.expenses){let e=new Date;t.budget.expenses.forEach(t=>{if(t.dueDay&&!t.dueDate){let n=e.getFullYear(),r=e.getMonth()+1,i=Math.min(t.dueDay,new Date(n,r,0).getDate());t.dueDate=`${n}-${String(r).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`,delete t.dueDay}t.frequency===`annual`&&(t.frequency=`annually`)})}return t}catch{return JSON.parse(JSON.stringify(fe))}}function me(e){if(ue(e),I&&(e.activityLog||(e.activityLog=[]),e.activityLog.unshift(I),e.activityLog.length>200&&(e.activityLog.length=200),I=null),localStorage.setItem(L,JSON.stringify(e)),P){let t=N();t&&t.set(e).catch(e=>{console.error(`Firestore save error:`,e)})}}window._saveData=me;var he=`toto_device_profile`,ge=`toto_kid_session`,B=null,_e=!1,ve=0,ye=``,be={};function xe(){return window.Capacitor?.Plugins?.Preferences??null}async function Se(e){let t=xe();for(let n of e)if(t)try{let{value:e}=await t.get({key:n});be[n]=e}catch{be[n]=localStorage.getItem(n)}else be[n]=localStorage.getItem(n)}function Ce(e){return e in be?be[e]:localStorage.getItem(e)}function we(e,t){be[e]=t,localStorage.setItem(e,t);let n=xe();n&&n.set({key:e,value:t}).catch(()=>{})}function Te(e){delete be[e],localStorage.removeItem(e);let t=xe();t&&t.remove({key:e}).catch(()=>{})}function Ee(){return Ce(he)}function De(){Te(he)}function Oe(){return Ce(ge)}function ke(e){we(ge,String(e))}Se([A,he,ge]);function Ae(){if(_e||!C.onboarded)return;_e=!0;let e=Ee();if(!e){je();return}if(e===`adult`){B=null,Ie();return}if(e===`shared`){Me();return}let t=(C.kids?.profiles||[]).find(t=>t.id===e);if(!t){De(),je();return}if(String(Oe())===String(t.id)){B={id:t.id,name:t.name,emoji:t.emoji,role:`child`},Le();return}t.pinHash?(t.id,ye=``,Ne(t)):(B={id:t.id,name:t.name,emoji:t.emoji,role:`child`},ke(t.id),Le())}function je(){let e=(C.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name),t=C.kids?.profiles||[],n=``,r=e.length?e.map(e=>e.name).join(` / `):`Adult`;n+=`<div class="profile-card" onclick="assignDevice('adult')">
    <div class="profile-avatar">👤</div>
    <div style="flex:1">
      <div style="font-size:15px;font-weight:700;color:#1e293b">${R(r)}</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">Adult — opens straight to the full app</div>
    </div>
  </div>`,t.forEach(e=>{n+=`<div class="profile-card" onclick="assignDevice('${e.id}')">
      <div class="profile-avatar">${R(e.emoji||`😊`)}</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${R(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">Kid's device — ${e.pinHash?`requires PIN to open`:`no PIN set yet`}</div>
      </div>
    </div>`}),t.length||(n+=`<div style="padding:12px 16px;background:#fef9c3;border-radius:10px;font-size:13px;color:#854d0e">No kids set up yet. Add kids in the Kids tab first, then assign a device.</div>`),n+=`<div class="profile-card" onclick="assignDevice('shared')" style="border-style:dashed">
    <div class="profile-avatar">👨‍👩‍👧‍👦</div>
    <div style="flex:1">
      <div style="font-size:15px;font-weight:700;color:#1e293b">Everyone (shared)</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">Shows profile picker every time the app opens</div>
    </div>
  </div>`,document.getElementById(`profile-list`).innerHTML=n,document.getElementById(`profile-overlay-title`).textContent=`Who uses this device?`,document.getElementById(`profile-overlay-sub`).textContent=`Set it once — the app will open straight to the right view. You can change this any time in Settings.`,document.getElementById(`profile-overlay`).classList.remove(`hidden`)}function Me(){document.getElementById(`pin-overlay`).classList.add(`hidden`);let e=(C.householdProfile?.members||[]).filter(e=>e.role===`adult`&&e.name),t=C.kids?.profiles||[],n=``;e.forEach((e,t)=>{let r=!!e.pinHash;n+=`<div class="profile-card" onclick="_pickAdult(${t})">
      <div class="profile-avatar">🧑</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${R(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">${t===0?`Owner`:`Member`} · ${r?`PIN login`:`Tap to enter`}</div>
      </div>
      <div style="font-size:12px;color:#0891b2;font-weight:600">${r?`PIN →`:`Enter →`}</div>
    </div>`}),t.forEach(e=>{n+=`<div class="profile-card" onclick="_pickKid('${e.id}')">
      <div class="profile-avatar">${R(e.emoji||`😊`)}</div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:#1e293b">${R(e.name)}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">Kid · ${e.pinHash?`PIN login`:`Tap to enter`}</div>
      </div>
      <div style="font-size:12px;color:#0891b2;font-weight:600">${e.pinHash?`PIN →`:`Enter →`}</div>
    </div>`}),document.getElementById(`profile-list`).innerHTML=n,document.getElementById(`profile-overlay-title`).textContent=`Who's using Toto?`,document.getElementById(`profile-overlay-sub`).textContent=`Tap your name to continue`,document.getElementById(`profile-overlay`).classList.remove(`hidden`)}function Ne(e){document.getElementById(`profile-overlay`).classList.add(`hidden`),document.getElementById(`pin-avatar`).textContent=e.emoji||(e._isAdult?`🧑`:`😊`),document.getElementById(`pin-greeting`).textContent=`Hi ${e.name}! 👋`,document.getElementById(`pin-sub`).textContent=`Enter your PIN to continue`,document.getElementById(`pin-error`).textContent=``,Pe(),Fe(),document.getElementById(`pin-overlay`).classList.remove(`hidden`)}function Pe(){let e=document.getElementById(`pin-dots`);e&&(e.innerHTML=[0,1,2,3].map(e=>`<div class="pin-dot ${e<ye.length?`filled`:``}">${e<ye.length?`●`:``}</div>`).join(``))}function Fe(){let e=document.getElementById(`pin-pad`);if(!e)return;let t=Date.now();if(t<ve){let n=Math.ceil((ve-t)/1e3);document.getElementById(`pin-error`).textContent=`Too many attempts — try again in ${n}s`,e.innerHTML=``,setTimeout(Fe,1e3);return}e.innerHTML=[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<div class="pin-key empty"></div>`:`<div class="pin-key" onclick="_pinKey('${e}')">${e}</div>`).join(``)}function Ie(){let e=document.getElementById(`header-switch-profile`);if(!e)return;let t=Ee();e.style.display=t&&t!==`adult`?``:`none`}function Le(){Ie(),Re(),B?.role===`child`?(window.kidsView=B.id,k(`kids`),We(B.id)):document.querySelectorAll(`.nav-item, .nav-text-item`).forEach(e=>e.style.display=``),Lr()}function Re(){let e=B?.role===`child`;document.body.classList.toggle(`kid-mode`,e);let t=document.getElementById(`kid-banner-label`);t&&e&&(t.textContent=`${B.emoji||`😊`} ${B.name}'s view`);let n=Ee(),r=document.getElementById(`header-switch-profile`);if(r){let t=n&&n!==`adult`;if(r.style.display=t?``:`none`,t)if(e)r.textContent=`👨‍👩‍👧 Parent`;else{let e=(C.kids?.profiles||[]).find(e=>e.id===n);r.textContent=e?`Back to ${e.name}`:`Switch`}}}function ze(e){let t=Number(e.age||0);return t<5?`tiny-tots`:t<8?`early-reader`:t<12?`independent`:`tween`}function Be(){let e=new Date().getHours();return e<12?`Good morning`:e<17?`Good afternoon`:`Good evening`}function Ve(e){if(!e.triggerTime)return!0;let[t,n]=e.triggerTime.split(`:`).map(Number),r=new Date,i=r.getHours()*60+r.getMinutes(),a=t*60+(n||0),o=a+360;return i>=a&&i<o}function He(e){if(!e.triggerTime)return``;let[t]=e.triggerTime.split(`:`).map(Number);return t<12?`Available this morning`:t<17?`Available this afternoon`:`Available tonight`}function Ue(){let e=document.getElementById(`child-view-overlay`);if(!e)return;let t=document.getElementById(`cv-confetti-wrap`);t&&t.remove(),t=document.createElement(`div`),t.id=`cv-confetti-wrap`,t.className=`cv2-confetti-wrap`,e.appendChild(t);let n=[`#5B4CF5`,`#7C3AED`,`#F59E0B`,`#10B981`,`#F43F5E`,`#FBBF24`];for(let e=0;e<60;e++){let r=document.createElement(`div`);r.className=`cv2-confetti-particle`,r.style.cssText=`
      left:${Math.random()*100}%;
      background:${n[e%n.length]};
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*8}px;
      animation-duration:${1.4+Math.random()*1.4}s;
      animation-delay:${Math.random()*.6}s;
    `,t.appendChild(r)}setTimeout(()=>{t.parentNode&&t.remove()},3500)}function We(e){let t=(C.kids?.profiles||[]).find(t=>String(t.id)===String(e));if(!t)return;Ke=e,qe=`today`;let n=C.kids,r=Vr(n,t.id),i=ze(t),a=i===`tiny-tots`,o=i===`tween`,s=fr,c=document.getElementById(`child-view-overlay`);document.getElementById(`cv-avatar`).textContent=t.emoji||`😊`,document.getElementById(`cv-name`).innerHTML=`<span class="ember-text">${R(t.name)}</span>`,document.getElementById(`cv-greeting`).textContent=Be()+`!`;let l=(n.completions||[]).filter(e=>e.kidId===t.id&&e.status===`approved`&&new Date(e.completedAt||e.ts).toDateString()===new Date().toDateString()).reduce((e,t)=>e+((n.chores||[]).find(e=>e.id===t.choreId)?.points||0),0),u=document.getElementById(`cv-nudge`);l>0&&!a&&!s?(u.textContent=`You've earned ⭐ ${l} points today — keep going!`,u.style.display=``):u.style.display=`none`,c.className=c.className.replace(/cv2-age-\S+/g,``).trim(),i===`early-reader`&&c.classList.add(`cv2-age-early`),a&&c.classList.add(`cv2-age-tiny`),o&&c.classList.add(`cv2-age-tween`);let d=document.getElementById(`cv-nav`);d&&(d.style.display=a?`none`:``),document.getElementById(`cv-nav-today`)?.classList.add(`active`),document.getElementById(`cv-nav-calendar`)?.classList.remove(`active`),document.getElementById(`cv-nav-prizes`)?.classList.remove(`active`),Ge(t);let f=new Date().toISOString().slice(0,10),p=(C.routineAssignments||[]).filter(e=>{if(e.childId!==t.id)return!1;let n=(C.routines||[]).find(t=>t.id===e.routineId);return n&&mr(n,f)}),m=X(),h=``,g=0,_=0;p.length&&p.forEach(e=>{let n=(C.routines||[]).find(t=>t.id===e.routineId);if(!n)return;let r=e.completionState?.[m]||[],i=n.steps.length,o=i>0?Math.round(r.length/i*100):0,c=r.length===i&&i>0,l=Ve(n);_+=i,g+=r.length;let u=l?``:He(n),d=Sr(e,i),f=Cr(e,i,7).filter(e=>e.done===e.total&&e.total>0).length;if(h+=`<div class="cv2-card${l?``:` cv2-card--locked`}" style="margin-bottom:10px">
        <div class="cv2-routine-header">
          <div class="cv2-routine-title">
            <span>${n.emoji}</span>
            <span class="cv2-routine-name">${R(n.name)}</span>
            ${d>0&&!a?`<span style="font-size:11px;font-weight:700;color:#f59e0b;background:#fffbeb;border-radius:99px;padding:2px 8px">🔥 ${d}d</span>`:``}
          </div>
          ${l?`<span class="cv2-routine-frac">${r.length}/${i}${n.pointsPerCompletion>0?` · ⭐${n.pointsPerCompletion}`:``}</span>`:`<span class="cv2-routine-lock">🔒 ${R(u)}</span>`}
        </div>
        <div class="cv2-progress"><div class="cv2-progress-fill" style="width:${o}%"></div></div>
        ${f>0&&!a?`<div style="padding:4px 16px 0;font-size:11px;color:#94a3b8">Completed ${f} of the last 7 days</div>`:``}
        <div class="cv2-steps">`,i?n.steps.forEach(e=>{let i=r.includes(e.id),o=l&&!s,c=i?`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``;h+=`<div class="cv2-step" style="${o?``:`cursor:default`}"
            ${o?`onclick="_routineToggleStepKid(${JSON.stringify(n.id)},${JSON.stringify(e.id)},'${t.id}')"`:``}>
            <div class="cv2-step-check${i?` cv2-step-check--done`:``}">${c}</div>
            <span class="cv2-step-emoji">${e.emoji}</span>
            <span class="cv2-step-label${i?` cv2-step-label--done`:``}">${R(e.label)}</span>
            ${e.points>0&&!a?`<span class="cv2-step-pts">⭐ ${e.points}</span>`:``}
          </div>`}):h+=`<div style="padding:12px 16px;font-size:13px;color:#94a3b8;text-align:center">No steps added yet</div>`,h+=`</div>`,c){let t=Sr(e,i),r=t>1?` · 🔥 ${t} day streak!`:``;h+=`<div class="cv2-routine-done">✓ All done! Great work${n.pointsPerCompletion>0&&!a?` · ⭐ ${n.pointsPerCompletion} bonus pts`:``}!${r}</div>`}else if(l){let t=Sr(e,i);t>0&&!a&&(h+=`<div style="padding:4px 16px 8px;font-size:11px;font-weight:700;color:#f59e0b">🔥 ${t} day streak — keep it up!</div>`)}h+=`</div>`});let v=(n.chores||[]).filter(e=>(e.assignedTo===t.id||e.assignedTo===`all`)&&!e._isRoutine),y=(n.completions||[]).filter(e=>e.kidId===t.id&&e.status===`pending`);_+=v.length,g+=v.filter(e=>y.some(t=>t.choreId===e.id)).length;let b=``;v.length&&v.forEach(e=>{let n=y.some(t=>t.choreId===e.id);b+=`<div class="cv2-chore">
        <span class="cv2-chore-emoji">${e.emoji||`📋`}</span>
        <div class="cv2-chore-info">
          <div class="cv2-chore-name">${R(e.name)}</div>
          ${a?``:`<div class="cv2-chore-pts">⭐ ${e.points} · ${e.frequency}</div>`}
        </div>
        ${n?`<span class="cv2-chore-done-badge">${a?`⭐`:`Waiting ✓`}</span>`:s?`<span class="cv2-chore-done-badge" style="background:#F0EFF8;color:#A1A1AA">Not done</span>`:`<button class="cv2-chore-btn" onclick="markChoreChildView('${t.id}','${e.id}')">${a?`✅`:`Done ✓`}</button>`}
      </div>`});let x=zn(0),S=new Date().getDay()===0?6:new Date().getDay()-1,w=C.meals?.lunchbox?.plans?.[x]||{},T=w[w[t.id]===void 0?(C.meals?.lunchbox?.profiles||[]).find(e=>e.name?.toLowerCase()===t.name?.toLowerCase())?.id??t.id:t.id]?.[S]||{},ee=[`main`,`snack`,`fruit`,`drink`],E=ee.map(e=>T[e]).filter(Boolean),te={main:`🥪`,snack:`🍪`,fruit:`🍎`,drink:`🥤`},D=``;if(E.length){let e=``;ee.forEach(t=>{T[t]&&(e+=`<div class="cv2-lb-chip">${te[t]}${a?``:` `+R(T[t])}</div>`)}),D=`<div class="cv2-group">
      <div class="cv2-group-heading">🥪 Lunchbox</div>
      <div class="cv2-card cv2-card--warm">
        <div class="cv2-lb-chips">${e}</div>
      </div>
    </div>`}let{events:O}=Je(t,f),k=[...O].sort((e,t)=>(e.time||`99:99`).localeCompare(t.time||`99:99`)),A=``;k.length&&!a&&(A=`<div class="cv2-group">
      <div class="cv2-group-heading">📅 Today's Events</div>
      <div class="cv2-card">${k.map(e=>`
      <div class="cv2-event-row">
        <span class="cv2-event-time">${e.time?Ye(e.time):``}</span>
        <div class="cv2-event-bar"></div>
        <span class="cv2-event-emoji">${e.emoji}</span>
        <div class="cv2-event-body">
          <div class="cv2-event-title">${R(e.label)}</div>
          ${e.notes?`<div class="cv2-event-sub">${R(e.notes)}</div>`:``}
        </div>
      </div>`).join(``)}</div>
    </div>`);let j=(n.prizes||[]).filter(e=>r>=e.pointCost),M=``;if(!a){let e=j.length?`<div style="display:flex;align-items:center;gap:10px;padding:14px 15px">
          <span style="font-size:28px">${j[0].emoji||`🎁`}</span>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:700;color:#18181B">You can afford ${j.length} prize${j.length>1?`s`:``}!</div>
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
        </div>`;M=`<div class="cv2-group">
      <div class="cv2-group-heading">🏆 Prizes</div>
      <div class="cv2-card cv2-card--warm" style="cursor:pointer" onclick="_cvSwitchTab('prizes','${t.id}')">
        ${e}
      </div>
    </div>`}let N=(n.notifications||[]).filter(e=>e.kidId===t.id&&!e.read),ne=``;N.length&&!s&&(ne=N.map(e=>{let n=e.type===`prize_approved`;return`<div class="cv2-notif-bar ${n?`cv2-notif-bar--approved`:`cv2-notif-bar--declined`}">
        <span>${n?`${e.prizeEmoji} <strong>${R(e.prizeName)}</strong> approved! You can redeem it now.`:`${e.prizeEmoji} <strong>${R(e.prizeName)}</strong> request was declined.`}</span>
        <button class="cv2-notif-dismiss" onclick="_cvDismissNotif('${e.id}','${t.id}')">×</button>
      </div>`}).join(``));let P=_>0&&g===_,F;P&&!s?F=`<div class="cv2-celebration">
      <div class="cv2-celeb-emoji">${a?`🌟`:`🏆`}</div>
      <div class="cv2-celeb-title">${a?`🎉 Yay!`:`Amazing work, ${R(t.name)}!`}</div>
      <div class="cv2-celeb-sub">${a?`All done! You're a star!`:`You've finished everything for today. You're a superstar! ⭐`}</div>
    </div>
    ${A}${D}${M}`:(F=ne,i!==`tiny-tots`&&!s&&(F+=`<button class="cv2-week-shortcut" onclick="_cvSwitchTab('calendar','${t.id}')">📅 See my week →</button>`),p.length&&(F+=`<div class="cv2-group">
        <div class="cv2-group-heading">📋 My Routines</div>
        ${h}
      </div>`),v.length&&(F+=`<div class="cv2-group">
        <div class="cv2-group-heading">🧹 Chores</div>
        <div class="cv2-card">${b}</div>
      </div>`),F+=A,F+=D,F+=M),document.getElementById(`cv-content`).innerHTML=F,c.classList.remove(`hidden`),c.style.display=`flex`,P&&!s&&Ue()}function Ge(e){let t=document.getElementById(`cv-prizes-badge`);if(!t)return;let n=C.kids,r=Vr(n,e.id),i=(n.notifications||[]).filter(t=>t.kidId===e.id&&!t.read).length,a=(n.prizes||[]).filter(e=>r>=e.pointCost).length,o=i+(a>0&&i===0?a:0);o>0?(t.textContent=o>9?`9+`:String(o),t.style.display=``):t.style.display=`none`}var Ke=null,qe=`today`;function Je(e,t){let n=(C.routineAssignments||[]).filter(t=>t.childId===e.id).map(e=>{let n=(C.routines||[]).find(t=>t.id===e.routineId);return n&&mr(n,t)?{type:`routine`,routine:n,assignment:e,label:n.name,emoji:n.emoji,color:`#7C3AED`,tag:`Routine`,time:n.triggerTime||null}:null}).filter(Boolean),r=(C.childEvents||[]).filter(n=>{let r=Array.isArray(n.assignedTo)?n.assignedTo:[n.assignedTo];return r.includes(e.id)||r.includes(`all`)||n.isHouseholdWide?n.recurrence?pr(n.recurrence,t):n.date===t:!1}).map(e=>({type:`event`,label:e.title,emoji:e.emoji||`📅`,color:`#10b981`,tag:`Event`,notes:e.notes,time:e.time||null})),i=(C.planner?.events||[]).filter(e=>Pi(e).includes(`everyone`)?e.recurrence&&e.recurrence.type!==`one_time`?pr(e.recurrence,t):e.endDate&&e.endDate>e.date?t>=e.date&&t<=e.endDate:e.date===t:!1).map(e=>({type:`event`,label:e.title,emoji:$[e.category]?.emoji||`📅`,color:`#10b981`,tag:`Event`,notes:e.notes||``,time:e.time||null}));return{routines:n,events:[...r,...i],chores:(C.kids?.chores||[]).filter(t=>(t.assignedTo===e.id||t.assignedTo===`all`)&&!t._isRoutine).map(e=>({type:`chore`,label:e.name,emoji:e.emoji||`📋`,color:`#ec4899`,tag:`Chore`,time:null}))}}function Ye(e){if(!e)return``;let[t,n]=e.split(`:`).map(Number);return`${t%12||12}:${String(n).padStart(2,`0`)} ${t>=12?`pm`:`am`}`}var Xe=`toto_pending_invite`;function Ze(){let e=new URLSearchParams(window.location.search),t=e.get(`invite`),n=e.get(`h`);t&&(sessionStorage.setItem(Xe,t),n&&sessionStorage.setItem(j,n),window.history.replaceState({},``,window.location.pathname+window.location.hash))}function Qe(){let e=sessionStorage.getItem(Xe);if(!e)return;let t=(C.householdProfile.invites||[]).find(t=>t.id===e);if(!t){sessionStorage.removeItem(Xe);return}if(t.status!==`pending`||new Date(t.expiresAt)<new Date){sessionStorage.removeItem(Xe),et(t);return}sessionStorage.removeItem(Xe),$e(t)}function $e(e){let t=C.householdProfile.members||[],n=t.filter(e=>e.role===`adult`),r=t.filter(e=>e.role===`child`),i=(()=>{let e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}`,n=getOrCreateMonthData(t);return(n.income||[]).reduce((e,t)=>e+g(Number(t.amount)||0,t.frequency),0)-(n.expenses||[]).filter(e=>!e.skipped).reduce((e,t)=>e+g(Number(t.amount)||0,t.frequency),0)})(),a=[...n.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ecfeff,#ccfbf1);display:flex;align-items:center;justify-content:center;font-size:20px">👤</div>
        <div><div style="font-size:14px;font-weight:600">${R(e.name||`Adult`)}</div><div style="font-size:12px;color:#64748b">Adult · Owner</div></div>
      </div>`),...r.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#fef9c3,#fde68a);display:flex;align-items:center;justify-content:center;font-size:20px">${e.emoji||`🧒`}</div>
        <div><div style="font-size:14px;font-weight:600">${R(e.name||`Kid`)}</div><div style="font-size:12px;color:#64748b">Kid · age ${e.age||`?`}</div></div>
      </div>`)].join(``);tt(`
    <div style="text-align:center;font-size:56px;margin-bottom:20px;margin-top:8px">🏡</div>
    <div style="font-size:22px;font-weight:800;color:#1e293b;text-align:center;margin-bottom:6px;line-height:1.3">${R(e.inviterName||`Someone`)} invited you to join their Toto household</div>
    <div style="font-size:14px;color:#64748b;text-align:center;margin-bottom:28px">You'll get shared access to budget, meals, kids &amp; home — everything in one place.</div>

    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:20px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin-bottom:12px">Your household</div>
      ${a}
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0">
        <div style="width:40px;height:40px;border-radius:50%;border:2px dashed #0d9488;display:flex;align-items:center;justify-content:center;font-size:20px;color:#0d9488">+</div>
        <div><div style="font-size:14px;font-weight:600;color:#0d9488">You — joining now</div><div style="font-size:12px;color:#64748b">New member</div></div>
      </div>
    </div>

    ${i===0?``:`
    <div style="display:flex;gap:12px;margin-bottom:20px">
      <div style="flex:1;background:#f0fdf4;border-radius:12px;padding:14px;text-align:center">
        <div style="font-size:20px;font-weight:700;color:#16a34a">$${Math.abs(i).toLocaleString()}</div>
        <div style="font-size:11px;color:#64748b;margin-top:2px">monthly ${i>=0?`surplus`:`deficit`}</div>
      </div>
    </div>`}

    ${e.email?`<div style="font-size:12px;color:#94a3b8;text-align:center;margin-bottom:16px">Invite sent to <strong style="color:#475569">${R(e.email)}</strong> · Expires ${new Date(e.expiresAt).toLocaleDateString()}</div>`:``}

    <button onclick="_acceptInviteAndContinue()" style="width:100%;background:#0d9488;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:10px">Accept invite →</button>
    <div style="text-align:center"><a href="#" onclick="event.preventDefault();_dismissInviteFlow()" style="font-size:13px;color:#94a3b8;text-decoration:none">Not you? Ignore this invite</a></div>
  `)}function et(e){tt(`
    <div style="text-align:center;margin-top:40px">
      <div style="font-size:56px;margin-bottom:16px">⏰</div>
      <div style="font-size:20px;font-weight:800;color:#1e293b;margin-bottom:8px">This invite has expired</div>
      <div style="font-size:14px;color:#64748b;margin-bottom:24px">The 7-day window has passed. Ask ${R(e?.inviterName||`the household owner`)} to send a new invite link.</div>
      <button onclick="_dismissInviteFlow()" style="background:#0d9488;color:#fff;border:none;border-radius:12px;padding:12px 28px;font-size:14px;font-weight:700;cursor:pointer">OK</button>
    </div>
  `)}function tt(e){document.getElementById(`invite-flow-content`).innerHTML=e;let t=document.getElementById(`invite-flow-overlay`);t.classList.remove(`hidden`),t.style.display=`flex`,t.scrollTop=0}var nt=`toto_pin_hard_`;function rt(e){return Ce(nt+e)===`1`}function V(e){return C.budget.months&&C.budget.months[e]||{income:C.budget.income,expenses:C.budget.expenses}}function it(e){return!!(C.budget.months&&C.budget.months[e])}function at(e){let[t,n]=e.split(`-`).map(Number),r=new Date(t,n-2,1);return`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,`0`)}`}S(pe()),Ze(),setTimeout(()=>{try{dr()}catch{}},0);var H=new Date().toISOString().slice(0,7),ot=`grouped`,st=new Set([`ai`,`household`]),ct=`all`;new Date().getFullYear(),new Date().getMonth()+1;function lt(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}function ut(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1).toLocaleDateString(`en-AU`,{month:`short`,year:`2-digit`})}function dt(){let e=[],t=new Date;for(let n=5;n>=0;n--){let r=new Date(t.getFullYear(),t.getMonth()-n,1);e.push(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,`0`)}`)}return e}function ft(e,t){let n=(C.budget.actuals[t]||{})[e];return n?typeof n==`number`?[{id:1,amount:n,date:``,note:``}]:Array.isArray(n)?n:[]:[]}function U(e,t){return ft(e,t).reduce((e,t)=>e+(t.amount||0),0)}var pt=new Intl.NumberFormat(`en-AU`,{style:`currency`,currency:`AUD`,maximumFractionDigits:0}),mt=new Intl.NumberFormat(`en-AU`,{style:`currency`,currency:`AUD`,minimumFractionDigits:2,maximumFractionDigits:2});function W(e){return pt.format(e||0)}function ht(e){return mt.format(e||0)}function G(e){if(!e)return`—`;let[t,n,r]=e.split(`-`);return`${r}/${n}/${t}`}function gt(e){return e?new Date(e)<new Date:!1}window.addEventListener(`resize`,()=>{document.querySelectorAll(`.section-pills-wrap`).forEach(D)}),document.querySelectorAll(`.nav-item, .nav-text-item`).forEach(e=>{e.addEventListener(`click`,()=>k(e.dataset.tab))});function _t(){let e=V(H),t=e.income,n=e.expenses,r=K(t),i=K(n),a=r-i,o=r>0?Math.round(a/r*100):0,s={};n.forEach(e=>{let t=e.category||`Other`;s[t]=(s[t]||0)+q(e)});let c=Object.entries(s).sort((e,t)=>t[1]-e[1]),l=C.budget.actuals[H]||{},u=n.reduce((e,t)=>e+U(t.id,H),0),d=u>0,f=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
      <button class="btn btn-sm" onclick="prevMoneyMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${lt(H)}</span>
      <button class="btn btn-sm" onclick="nextMoneyMonth()" style="font-size:16px;padding:2px 10px">›</button>
      ${it(H)?`<span style="margin-left:8px;font-size:12px;padding:2px 10px;background:#dbeafe;color:#1d4ed8;border-radius:99px">Custom month</span>`:``}
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-label">Monthly Income</div>
        <div class="card-value green">${W(r)}</div>
        <div class="card-sub">${t.length} source${t.length===1?``:`s`}</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Expenses</div>
        <div class="card-value ${i>r?`red`:``}">${W(i)}</div>
        <div class="card-sub">${n.length} item${n.length===1?``:`s`}</div>
      </div>
      <div class="card">
        <div class="card-label">${a>=0?`Surplus`:`Deficit`}</div>
        <div class="card-value ${a>=0?`green`:`red`}">${W(Math.abs(a))}</div>
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
        <span style="font-size:15px;font-weight:700;color:var(--success)">${W(r)}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Frequency</th><th class="amount">Monthly</th></tr></thead>
          <tbody>
            ${t.length===0?`<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:20px">No income added yet</td></tr>`:t.map(e=>{let t=r>0?Math.round(q(e)/r*100):0;return`<tr>
                    <td style="font-weight:500;border-left:4px solid #10b981">${R(e.name)}</td>
                    <td style="color:var(--text-muted);font-size:12px">${It(e)}</td>
                    <td class="amount">${W(q(e))} <span style="color:var(--text-muted);font-size:11px">${t}%</span></td>
                  </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `,f+=`
    <div class="section">
      <div class="section-header">
        <div class="section-title">Expenses by Category</div>
        <span style="font-size:15px;font-weight:700;color:var(--danger)">${W(i)}</span>
      </div>
      <div style="padding:16px 20px">
        ${c.length===0?`<div style="color:var(--text-muted);text-align:center;padding:20px">No expenses added yet</div>`:c.map(([e,t])=>{let r=J.expense[e]||`#94a3b8`,a=i>0?t/i*100:0,o=n.filter(t=>(t.category||`Other`)===e).reduce((e,t)=>e+(l[t.id]||0),0),s=n.some(t=>(t.category||`Other`)===e&&l[t.id]!==void 0);return`
                <div style="margin-bottom:16px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                    <span style="display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500">
                      <span style="width:11px;height:11px;border-radius:50%;background:${r};flex-shrink:0"></span>
                      ${e}
                    </span>
                    <span style="font-size:13px;font-weight:600">${W(t)}
                      <span style="font-weight:400;color:var(--text-muted);font-size:11px">${Math.round(a)}%</span>
                    </span>
                  </div>
                  <div style="height:7px;background:var(--surface2);border-radius:4px;overflow:hidden;position:relative">
                    <div style="height:100%;width:${a.toFixed(1)}%;background:${r};border-radius:4px;opacity:0.85"></div>
                    ${s?`<div style="position:absolute;top:0;height:100%;width:${Math.min(i>0?o/i*100:0,100).toFixed(1)}%;background:${r};border-radius:4px;border:1.5px solid #fff"></div>`:``}
                  </div>
                  ${s?`<div style="font-size:11px;color:var(--text-muted);margin-top:3px">Actual: ${W(o)}</div>`:``}
                </div>
              `}).join(``)}
      </div>
    </div>
  `,f+=`</div>`,d){let e=i-u;f+=`
      <div class="section" style="margin-bottom:20px">
        <div class="section-header">
          <div>
            <div class="section-title">Actuals — ${lt(H)}</div>
            <div class="section-subtitle">Recorded spending vs budget</div>
          </div>
          <div style="display:flex;gap:16px;align-items:center;font-size:13px;flex-wrap:wrap">
            <span>Budget: <strong>${W(i)}</strong></span>
            <span>Actual: <strong>${W(u)}</strong></span>
            <span style="font-weight:600;color:${e>=0?`var(--success)`:`var(--danger)`}">
              ${e>=0?`▼`:`▲`} ${W(Math.abs(e))} ${e>=0?`under`:`over`}
            </span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Expense</th><th>Category</th><th class="amount">Budget</th><th class="amount">Actual</th><th class="amount">Difference</th></tr></thead>
            <tbody>
              ${n.filter(e=>l[e.id]!==void 0).map(e=>{let t=q(e),n=l[e.id]||0,r=t-n,i=J.expense[e.category||`Other`]||`#94a3b8`;return`<tr>
                    <td style="font-weight:500;border-left:4px solid ${i}">${R(e.name)}</td>
                    <td><span style="display:inline-block;padding:2px 9px;border-radius:99px;background:${i};color:#fff;font-size:11px;font-weight:600">${e.category||`Other`}</span></td>
                    <td class="amount">${W(t)}</td>
                    <td class="amount">${W(n)}</td>
                    <td class="amount" style="font-weight:600;color:${r>=0?`var(--success)`:`var(--danger)`}">
                      ${r>=0?`−`:`+`}${W(Math.abs(r))}
                    </td>
                  </tr>`}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `}let p=dt().map(e=>{let t=V(e);return{label:ut(e),income:K(t.income),expenses:K(t.expenses),actual:Object.values(C.budget.actuals[e]||{}).reduce((e,t)=>e+t,0)}}),m=Math.max(...p.flatMap(e=>[e.income,e.expenses,e.actual]),1),h=524/p.length,g=h*.22,_=[0,.25,.5,.75,1].map(e=>{let t=148-e*136;return`<line x1="64" y1="${t}" x2="588" y2="${t}" stroke="#e2e8f0" stroke-width="1"/>
      <text x="59" y="${t+4}" text-anchor="end" font-size="9" fill="#94a3b8">${W(e*m)}</text>`}).join(``),v=p.map((e,t)=>{let n=64+t*h+h*.05,r=e.income>0?e.income/m*136:0,i=e.expenses>0?e.expenses/m*136:0,a=e.actual>0?e.actual/m*136:0,o=n+g+g/2+h*.04;return`
      <rect x="${n}"                        y="${148-r}" width="${g}" height="${r}" fill="#10b981" opacity="0.75" rx="2"/>
      <rect x="${n+g+h*.06}"       y="${148-i}" width="${g}" height="${i}" fill="#3b82f6" opacity="0.7"  rx="2"/>
      ${e.actual>0?`<rect x="${n+g*2+h*.12}" y="${148-a}" width="${g}" height="${a}" fill="${e.actual>e.expenses?`#ef4444`:`#f59e0b`}" opacity="0.85" rx="2"/>`:``}
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
          ${_}${v}
        </svg>
      </div>
    </div>
  `,document.getElementById(`money-content`).innerHTML=f}function vt(){let e=V(H),t=K(e.income),n=K(e.expenses),r=t-n,i=t>0?r/t:null,a;a=t===0?10:i>=.2?20:i>=0?Math.round(i/.2*20):0;let o=dt().slice(3),s=0,c=0;o.forEach(e=>{let t=V(e);t.expenses.some(t=>ft(t.id,e).length>0)&&(s++,t.expenses.reduce((t,n)=>t+U(n.id,e),0)<=K(t.expenses)&&c++)});let l=s===0?5:Math.round(s/3*10+c/s*10),u=(C.netWorth.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),d=(C.netWorth.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),f=u-d,p;if(u===0&&d===0)p=10;else if(f<=0)p=3;else{let e=d>0?d/u:0;p=e<.3?20:e<.6?15:e<.8?10:6}let m;if(n===0)m=10;else{let e=u/n;m=e>=6?20:e>=3?15:e>=1?8:u===0?5:3}let h=(C.goals||[]).filter(e=>e.status!==`achieved`),g;if(h.length===0)g=8;else{let e=h.reduce((e,t)=>e+Math.min((t.saved||0)/(t.target||1),1),0)/h.length;g=10+Math.round(e*10)}let _=a+l+p+m+g,v=_>=85?`A`:_>=70?`B`:_>=55?`C`:_>=40?`D`:`F`,y=_>=80?`#10b981`:_>=60?`#f59e0b`:_>=40?`#f97316`:`#ef4444`,b=[...[{score:a,tip:`Boost your savings rate — aim for 20%+ of income (currently ${t>0?Math.round((i||0)*100):0}%)`},{score:l,tip:`Log actuals monthly in the Budget tab to stay on track`},{score:p,tip:`Reduce liabilities or grow assets to strengthen your net worth`},{score:m,tip:`Build an emergency fund of 3–6 months expenses (${W(n*3)}–${W(n*6)})`},{score:g,tip:`Set specific savings goals in the Goals tab to stay focused`}]].sort((e,t)=>e.score-t.score)[0];return{total:_,grade:v,color:y,insight:b.score<12?b.tip:`Great shape — stay consistent and keep building your financial cushion.`,dimensions:[{label:`Savings Rate`,score:a,max:20},{label:`Budget Tracking`,score:l,max:20},{label:`Net Worth`,score:p,max:20},{label:`Emergency Buffer`,score:m,max:20},{label:`Goals`,score:g,max:20}]}}function yt(){let e=[],t=new Date,n=H,r=(C.householdProfile?.members||[]).filter(e=>e.role===`adult`),i=C.kids?.profiles||[],a=i.length>0,o=Math.max(1,r.length)+i.length,s=V(n),c=s.income.length>0,l=s.expenses.length>0,u=s.expenses.some(e=>ft(e.id,n).length>0),d=(c?30:0)+(l?30:0)+(u?40:0);e.push({key:`budget`,label:`Budget`,score:d,tip:c?l?u?`On track`:`Log actual spending this month`:`Add your expenses`:`Add your income sources`,tab:`budget`});let f=zn(0),p=C.meals?.plan?.[f]||{},m=0,h=o===1?7:o<=3?14:21;for(let e=0;e<7;e++){let t=p[e]||{};o===1?t.d&&m++:o<=3?(t.l&&m++,t.d&&m++):(t.b&&m++,t.l&&m++,t.d&&m++)}let g=Math.round(m/h*80),_=C.lists?.food?.items||[],y=_.filter(e=>e.state===`active`).length,b=_.filter(e=>e.state===`got_it`).length,x=y>0||b>0,S=g+(x?20:0);e.push({key:`meals`,label:`Meals`,score:Math.min(100,S),tip:m===0?`Plan this week's meals`:m<h?`${m}/${h} meals planned`:x?`Meals sorted`:`Add items to your shopping list`,tab:`meals`});let w=C.maintenance||[],T=w.filter(e=>{let t=tr(e);return t!==null&&t<0}).length,ee=w.length===0?30:Math.max(0,100-T*25),E=C.vehicles||[],te=E.filter(e=>!!(e.regoExpiry&&Math.ceil((new Date(e.regoExpiry)-t)/864e5)<30||e.insurance?.renewalDate&&Math.ceil((new Date(e.insurance.renewalDate)-t)/864e5)<30)).length,D=C.documents||[],O=D.filter(e=>e.expiryDate&&Math.ceil((new Date(e.expiryDate)-t)/864e5)<30).length,k=E.length>0?.3:0,A=.3,j=1-k-A,M=Math.max(0,Math.min(100,Math.round(ee*j+(E.length>0?Math.max(0,100-te*30)*k:0)+(D.length>0?Math.max(0,100-O*20):50)*A)));if(e.push({key:`home`,label:`Home`,score:M,tip:T>0?`${T} maintenance overdue`:te>0?`Vehicle rego or insurance expiring`:O>0?`Documents expiring soon`:w.length===0?`Add maintenance items to track`:`Home is sorted`,tab:`maintenance`}),a){let t=C.meals?.lunchbox?.plans||{},n=zn(0),r=0,a=i.length*20;i.forEach(e=>{let i=(t[n]||{})[e.id]||{};for(let e=0;e<5;e++){let t=i[e]||{};t.main&&r++,t.snack&&r++,t.fruit&&r++,t.drink&&r++}}),typeof X==`function`?X():new Date().toISOString().slice(0,10).replace(/-/g,``);let o=C.kids?.chores||[],s=C.kids?.completions||[],c=s.filter(e=>e.status===`pending`).length,l=s.filter(e=>e.status===`approved`&&e.completedAt?.startsWith(new Date().toISOString().slice(0,10))).length,u=o.length===0?50:Math.max(0,100-c*10+l*5),d=a>0?Math.round(r/a*100):50,f=Math.min(100,Math.round(d*.5+Math.min(100,u)*.5));e.push({key:`family`,label:`Family`,score:f,tip:r===0?`Plan school lunches this week`:c>0?`${c} chore approval${c===1?``:`s`} waiting`:`Family is sorted`,tab:`kids`})}let N=C.goals||[],ne=N.filter(e=>e.status===`active`),P=ne.length>0?ne.reduce((e,t)=>e+Math.min((t.saved||t.currentAmount||0)/(t.target||t.targetAmount||1),1),0)/ne.length*100:0,F=N.length===0?20:Math.round(30+P*.7);e.push({key:`goals`,label:`Goals`,score:Math.min(100,F),tip:N.length===0?`Set a savings or spending goal`:P<30?`Make progress on your goals`:`Goals progressing well`,tab:`goals`});let I=typeof vr==`function`?vr():[];if(I.length>0){let t=typeof X==`function`?X():new Date().toISOString().slice(0,10).replace(/-/g,``),n=I.filter(e=>{let n=(e.completions?.[t]||[]).length;return e.steps.length>0&&n===e.steps.length}),r=Math.round(n.length/I.length*100),i=I.reduce((e,t)=>{let n=typeof wr==`function`?wr(t):0;return Math.max(e,n)},0),a=Math.min(40,Math.round(i/10*40)),o=Math.min(100,20+Math.round(r*.4)+a);e.push({key:`habits`,label:`Habits`,score:o,tip:n.length===0?`Complete a routine today`:i<3?`Keep your streak going`:`${i}-day streak — keep it up`,tab:`routines`})}let re=new Date().toISOString().slice(0,10),ie=new Date(Date.now()+7*864e5).toISOString().slice(0,10),ae=(C.planner?.events||[]).filter(e=>e.date>=re&&e.date<=ie).length,L=(C.bills||[]).filter(e=>{let t=v(e);return t!==null&&t<0}).length,oe=(C.documents||[]).filter(e=>e.expiryDate&&new Date(e.expiryDate)<t).length,se=Math.min(100,Math.round((ae>0?40:10)+Math.max(0,30-L*15)+Math.max(0,30-oe*15)));return e.push({key:`plan`,label:`Plan`,score:se,tip:L>0?`${L} bill${L===1?``:`s`} overdue`:oe>0?`${oe} document${oe===1?``:`s`} expired`:ae===0?`Add something to your calendar`:`Plan looks good`,tab:`planner`}),{total:Math.round(e.reduce((e,t)=>e+t.score,0)/e.length),dims:e}}function bt(){let e=yt();new Date().toISOString().slice(0,10);let t=C.settings?.typeADismissedMission||``,n=[...e.dims].sort((e,t)=>e.score-t.score),r=[];return n.forEach(e=>{if(e.key===`budget`&&e.score<70&&(V(H).income.length?V(H).expenses.length?r.push({id:`log-actuals`,title:`Log this month's actual spending`,sub:`Import a bank statement or add manually`,tab:`budget`,impact:30}):r.push({id:`add-expenses`,title:`Set up your monthly expenses`,sub:`List your regular costs`,tab:`budget`,impact:35}):r.push({id:`add-income`,title:`Add your income sources`,sub:`Takes about 1 minute`,tab:`budget`,impact:40})),e.key===`meals`&&e.score<70){let e=zn(0),t=C.meals?.plan?.[e]||{},n=Object.values(t).filter(e=>e.d).length,i=(C.lists?.food?.items||[]).filter(e=>e.state===`active`).length;n<3?r.push({id:`plan-dinners`,title:`Plan this week's dinners`,sub:`Just the evening meals — takes 2 minutes`,tab:`meals`,impact:25}):i===0&&r.push({id:`shopping-list`,title:`Add items to your shopping list`,sub:`Start with essentials you need this week`,tab:`lists`,impact:15})}if(e.key===`home`&&e.score<70){let e=(C.maintenance||[]).filter(e=>{let t=tr(e);return t!==null&&t<0});e.length?r.push({id:`maint-overdue`,title:`Clear overdue: ${R(e[0].name)}`,sub:`Mark it done or reschedule`,tab:`maintenance`,impact:20}):(C.maintenance||[]).length||r.push({id:`setup-maint`,title:`Set up household maintenance`,sub:`Add items like gutters, pest control, smoke alarms`,tab:`maintenance`,impact:20})}if(e.key===`family`&&e.score<70){let e=(C.kids?.completions||[]).filter(e=>e.status===`pending`).length,t=C.kids?.profiles||[];e>0?r.push({id:`approve-chores`,title:`Review ${e} chore approval${e===1?``:`s`}`,sub:`Kids are waiting for your sign-off`,tab:`kids`,impact:20}):t.length>0&&r.push({id:`plan-lunchbox`,title:`Plan school lunches this week`,sub:`AI can do it in one tap`,tab:`lunchbox`,impact:18})}if(e.key===`goals`&&e.score<50&&((C.goals||[]).length||r.push({id:`add-goal`,title:`Set your first savings goal`,sub:`Holiday fund, emergency savings, or debt payoff`,tab:`goals`,impact:15})),e.key===`habits`&&e.score<70&&((typeof vr==`function`?vr():[]).length===0?r.push({id:`create-routine`,title:`Create your first daily routine`,sub:`Morning or evening — takes 2 minutes to set up`,tab:`routines`,impact:25}):r.push({id:`complete-routine`,title:`Complete a routine today`,sub:`Tap each step as you go`,tab:`today`,impact:20})),e.key===`plan`&&e.score<70){let e=new Date().toISOString().slice(0,10),t=new Date(Date.now()+7*864e5).toISOString().slice(0,10);(C.planner?.events||[]).filter(n=>n.date>=e&&n.date<=t).length===0?r.push({id:`add-event`,title:`Add something to your calendar`,sub:`Even one event this week helps keep life organised`,tab:`planner`,impact:15}):r.push({id:`review-bills`,title:`Review upcoming bills`,sub:`Make sure nothing catches you off guard`,tab:`bills`,impact:15})}}),r.filter(e=>e.id!==t).sort((e,t)=>t.impact-e.impact)[0]||null}function xt(e){C.settings||(C.settings={}),C.settings.typeADismissedMission=e,me(C);let t=document.querySelector(`.mission-lightbox`);t&&t.remove(),kt()}function St(){let e=C.settings?.typeAMissionShownDate;if(!e)return 0;let t=Math.floor((new Date-new Date(e))/864e5);return Math.max(0,t)}function Ct(e){if(document.querySelector(`.mission-lightbox`))return;let t=St(),n=e.onclick?e.onclick:e.tab?`activateTab('${e.tab}')`:``,r=document.createElement(`div`);r.className=`mission-lightbox`,r.innerHTML=`
    <div class="mission-lightbox-card">
      <div class="mission-lightbox-icon">⚡</div>
      <div class="mission-lightbox-title">${e.title}</div>
      <div class="mission-lightbox-sub">${e.sub}</div>
      <div class="mission-lightbox-days">This has been waiting ${t} day${t===1?``:`s`}</div>
      <div class="mission-lightbox-actions">
        <button class="mission-lightbox-btn" style="background:rgba(255,255,255,0.2);color:#fff" onclick="dismissMission('${e.id}')">Skip</button>
        <button class="mission-lightbox-btn" style="background:#fff;color:#0891b2" onclick="completeMission('${e.id}');${n}">Do it now</button>
      </div>
    </div>`,r.addEventListener(`click`,t=>{t.target===r&&xt(e.id)}),document.body.appendChild(r)}function wt(){if(!C.settings?.typeAMode)return;let e=bt();if(!e)return;let t=new Date().toISOString().slice(0,10);if(C.settings.typeAMissionId!==e.id){C.settings.typeAMissionId=e.id,C.settings.typeAMissionShownDate=t,me(C);return}St()>=1&&setTimeout(()=>Ct(e),1500)}function Tt(){let e=yt(),t=2*Math.PI*22,n=(e.total/100*t).toFixed(1),r=e.total>=80?`var(--good,#10b981)`:e.total>=60?`var(--iris-2)`:e.total>=40?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`,i=e.total>=80?`Crushing it — keep going`:e.total>=60?`Good shape — a few things to tidy`:e.total>=40?`Getting there — some gaps to fill`:`Just getting started`,a=Ai?`▲`:`▼`,o=e.dims.map(e=>{let t=e.score>=75?`var(--good,#10b981)`:e.score>=50?`var(--iris-2)`:e.score>=30?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`,n=e.score>=75?`var(--good,#10b981)`:e.score>=50?`var(--iris-1)`:e.score>=30?`var(--amber,#f59e0b)`:`var(--ember,#f97316)`;return`<div class="life-dim">
      <div class="life-dim-row">
        <span class="life-dim-name">${e.label}</span>
        <span class="life-dim-pct" style="color:${n}">${e.score}%</span>
      </div>
      <div class="life-dim-bar"><div class="life-dim-fill" style="width:${e.score}%;background:${t}"></div></div>
      <div class="life-dim-tip">
        ${e.tip}
        ${e.score<70&&e.tab?`<span style="color:var(--iris-1);font-weight:700;cursor:pointer" onclick="activateTab('${e.tab}')">Fix →</span>`:``}
      </div>
    </div>`}).join(``);return`<div class="life-score-card">
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
        ${C.settings?.typeAStreak>1?`<div style="margin-top:5px;display:inline-flex;align-items:center;gap:5px;background:var(--amber-soft,#FFF7ED);border-radius:99px;padding:2px 10px"><span style="font-size:12px">🔥</span><span style="font-family:var(--mono);font-size:11px;font-weight:700;color:var(--ember,#f97316)">${C.settings.typeAStreak} week streak</span></div>`:``}
      </div>
      <span style="font-size:10px;color:var(--muted);flex-shrink:0">${a}</span>
    </div>
    ${Ai?`
      <div style="margin-top:14px;border-top:1px solid var(--hairline-soft);padding-top:4px">
        ${o}
        <button onclick="openWeeklyReset()" style="margin-top:14px;width:100%;padding:10px;background:linear-gradient(135deg,var(--iris-1),var(--iris-2));color:#fff;border:none;border-radius:99px;font-size:13px;font-weight:700;cursor:pointer;font-family:var(--sans);letter-spacing:.01em">Weekly Reset — 5 minutes</button>
      </div>`:``}
  </div>`}function Et(){let e=bt();if(!e)return``;let t=St(),n=e.onclick?`onclick="${e.onclick}"`:e.tab?`onclick="activateTab('${e.tab}')"`:``;return`<div class="mission-card" ${n}>
    <div class="mission-label">${t>0?`Day ${t+1} — still waiting`:`Today's Mission`}</div>
    <div class="mission-title">${e.title}</div>
    <div class="mission-sub">${e.sub}</div>
    <div class="mission-actions">
      <button class="mission-btn" style="background:rgba(255,255,255,0.2);color:#fff" onclick="event.stopPropagation();dismissMission('${e.id}')">Not today</button>
      <button class="mission-btn" style="background:#fff;color:#0891b2" ${n}>Let's do it</button>
    </div>
  </div>`}function Dt(){let e=V(H),t=C.householdProfile?.members||[],n=t.filter(e=>e.role===`adult`),r=t.filter(e=>e.role===`child`),i=[];if(i.push({id:`members`,label:`Add your household members`,done:n.length>0,tab:null}),i.push({id:`income`,label:`Set up income sources`,done:(e.income||[]).length>0,tab:`budget`}),i.push({id:`expenses`,label:`Add monthly expenses`,done:(e.expenses||[]).length>0,tab:`budget`}),r.length>0&&i.push({id:`kids`,label:`Add kids to your household`,done:!0,tab:null}),n.length>=2){let e=n[1]?.name||`your partner`,t=(C.householdProfile.authorizedUsers||[]).length>0||(C.householdProfile.invites||[]).some(e=>e.status===`accepted`);i.push({id:`invite`,label:`Invite ${e} to your household`,done:t,tab:`settings`,settingsSection:`household-access`})}if(i.push({id:`goals`,label:`Set your first savings goal`,done:(C.goals||[]).length>0,tab:`goals`}),i.push({id:`networth`,label:`Add your net worth (assets & debts)`,done:(C.netWorth?.assets||[]).length>0||(C.netWorth?.liabilities||[]).length>0,tab:`networth`}),i.push({id:`vehicles`,label:`Add your vehicles`,done:(C.vehicles||[]).length>0,tab:`vehicles`}),r.length>0){let e=r[0]?.name||`your child`;i.push({id:`chores`,label:`Set up ${R(e)}'s first chores`,done:(C.kids?.chores||[]).length>0,tab:`kids`})}return i}function Ot(){if(C.setupProgressDismissed)return``;let e=Dt(),t=e.filter(e=>e.done);e.filter(e=>!e.done);let n=t.length,r=e.length,i=Math.round(n/r*100);if(n===r)return`<div class="td-card td-card-win" style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <span style="font-size:22px">🎉</span>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:700;color:var(--good)">Setup complete!</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px">Your household is fully configured.</div>
      </div>
      <button onclick="state.setupProgressDismissed=true;saveData(state);renderToday()" style="font-size:12px;color:var(--muted);background:none;border:none;cursor:pointer;font-weight:600;padding:0">Dismiss</button>
    </div>`;let a=2*Math.PI*22;return`<div class="td-card" style="margin-bottom:10px">${`
    <div onclick="_spExpanded=!_spExpanded;_refreshSetupProgress()" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none">
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--ink)">Finish setting up Toto</div>
        <div style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:3px">${n} of ${r} complete</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <div style="position:relative;width:52px;height:52px">${`
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r="22" fill="none" stroke="var(--hairline)" stroke-width="4"/>
      <circle cx="26" cy="26" r="22" fill="none" stroke="var(--purple)" stroke-width="4"
        stroke-dasharray="${a.toFixed(1)}" stroke-dashoffset="${(a-i/100*a).toFixed(1)}"
        stroke-linecap="round" transform="rotate(-90 26 26)"/>
    </svg>
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:10px;font-weight:700;color:var(--purple)">${i}%</div>`}</div>
        <span style="font-size:10px;color:var(--muted-soft)">▼</span>
      </div>
    </div>
    <div style="background:var(--hairline);border-radius:99px;height:4px;margin-top:14px;overflow:hidden">
      <div style="width:${i}%;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--iris-2),var(--iris-3))"></div>
    </div>`}</div>`}function kt(){let e=document.getElementById(`today-content`);if(!e)return;let t=new Date,n=t.getHours(),r=t.toISOString().slice(0,10);function i(e){return e<5?`overnight`:e<12?`morning`:e<17?`afternoon`:e<21?`evening`:`night`}let a=i(n),o={morning:`Good morning,`,afternoon:`Good afternoon,`,evening:`Wind down,`,night:`Tomorrow at a glance —`,overnight:`Still up,`}[a]||`Hello,`,s=P?.displayName?.split(` `)[0]||C.settings?.adultName?.split(` `)[0]||C.settings?.adults?.[0]?.name?.split(` `)[0]||C.householdProfile?.members?.find(e=>e.role===`adult`)?.name?.split(` `)[0]||``,c=t.toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`}).toUpperCase(),l=[],u=(C.bills||[]).map(e=>({...e,days:v(e)})).filter(e=>e.days!==null&&e.days<=2).sort((e,t)=>e.days-t.days);(C.maintenance||[]).filter(e=>{let t=tr(e);return t!==null&&t<0}),(C.documents||[]).filter(e=>e.expiryDate&&new Date(e.expiryDate)<t),(C.vehicles||[]).filter(e=>e.regoExpiry&&new Date(e.regoExpiry)<t);let d=[];(C.documents||[]).forEach(e=>{e.expiryDate&&new Date(e.expiryDate)<t&&d.push({label:R(e.name),sub:`Document expired`,cls:`alert`,tab:`documents`})}),(C.maintenance||[]).forEach(e=>{let t=tr(e);t!==null&&t<0&&d.push({label:R(e.name),sub:`${Math.abs(t)}d overdue`,cls:`watch`,tab:`maintenance`})}),(C.vehicles||[]).forEach(e=>{e.regoExpiry&&new Date(e.regoExpiry)<t&&d.push({label:R(e.name)+` rego`,sub:`Expired`,cls:`alert`,tab:`vehicles`})});let f=u.length>0,p=d.length>0;if(f||p){let e=u.length===1?u[0].days===0?`due today`:u[0].days===1?`due tomorrow`:`due in ${u[0].days} days`:`bill${u.length===1?``:`s`} due soon`,t=f?`
      <div onclick="_tdOpenHeadsUpSheet()" style="flex:1;min-width:0;background:var(--purple-soft);border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(91,76,245,.15);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(91,76,245,.08);position:relative;overflow:hidden">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(91,76,245,.18) 0%,transparent 70%);pointer-events:none"></div>
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--iris-2);margin-bottom:6px">Heads Up</div>
          <div style="font-size:36px;font-weight:800;color:var(--iris-1);letter-spacing:-.05em;line-height:1">${u.length}</div>
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
      </div>`,n=p?`
      <div onclick="_tdOpenSlippingSheet()" style="flex:1;min-width:0;background:#FFF4EE;border-radius:var(--r-lg);padding:16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;border:1px solid rgba(249,115,22,.18);box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 8px rgba(249,115,22,.06);position:relative;overflow:hidden">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.15) 0%,transparent 70%);pointer-events:none"></div>
        <div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c2410c;margin-bottom:6px">Slipping</div>
          <div style="font-size:36px;font-weight:800;color:var(--ember);letter-spacing:-.05em;line-height:1">${d.length}</div>
          <div style="font-size:12px;color:#c2410c;margin-top:3px">item${d.length===1?``:`s`} overdue</div>
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
      </div>`;l.push({type:`priority`,urgency:u.length>0?3:p?2:0,html:`<div style="display:flex;gap:12px;margin-bottom:12px">${t}${n}</div>`})}let m=a===`evening`||a===`night`?new Date(t.getTime()+864e5).toISOString().slice(0,10):r,h=m===r?`Today`:`Tomorrow`,g=Ri?Ri(m):[];if(g.length>0){let e=t.getHours()*60+t.getMinutes(),n=g.slice(0,4).map((t,n,i)=>{let a=t.allDay||!t.time?`All day`:zi?zi(t.time):t.time,o=Ii?Ii(t):``,s=Fi?Fi(t):{dot:`var(--iris-2)`},c=$?$[t.category]||$.other:{emoji:`📅`,label:``},l=t.time?parseInt(t.time.split(`:`)[0])*60+parseInt(t.time.split(`:`)[1]):-1,u=m===r&&l>=0&&e>=l&&e<l+90,d=n===Math.min(g.length,4)-1,f=c.color||`#f1f5f9`,p=c.text||`#475569`;return p.replace(/^#/,``),`<div class="pl-agenda-ev" style="margin-bottom:${d?`0`:`8px`}">
        <div class="pl-agenda-time-col">
          <span class="pl-agenda-time">${a}</span>
        </div>
        <div class="pl-agenda-timeline">
          <div class="pl-agenda-dot${u?` now`:``}" style="color:${p};background:${u?p:f}"></div>
          ${d?``:`<div class="pl-agenda-line"></div>`}
        </div>
        <div class="pl-agenda-card" style="background:${f};border-color:${p}22" onclick="activateTab('planner');setTimeout(()=>_plannerOpenDetail&&_plannerOpenDetail('${t.id}'),120)">
          <div class="pl-agenda-card-title">${R(t.title)}</div>
          <div class="pl-agenda-card-meta">
            <span class="pl-agenda-who-dot" style="background:${s.dot}"></span>
            <span>${o}</span>
          </div>
          ${c.label?`<div class="pl-agenda-cat-pill" style="background:${p}1a;color:${p}">${c.emoji} ${c.label}</div>`:``}
        </div>
      </div>`}).join(``);l.push({type:`schedule`,urgency:1,html:`<div class="td-card td-card-schedule" style="padding:0;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;border-bottom:1px solid rgba(24,24,27,.06)">
          <div class="td-card-meta" style="margin-bottom:0"><span class="td-meta-label">${h}</span><span class="td-meta-count" style="margin-left:2px">${g.length}</span></div>
          <span style="font-size:12px;font-weight:600;color:var(--iris-2);cursor:pointer" onclick="activateTab('planner')">See all →</span>
        </div>
        <div style="padding:12px 16px">${n}</div>
      </div>`})}let _=V(H),y=K(_.income),b=K(_.expenses),x=y-b,S=(_.expenses||[]).reduce((e,t)=>e+U(t.id,H),0),w=new Date(t.getFullYear(),t.getMonth()+1,0).getDate()-t.getDate(),T=b>0?Math.min(100,Math.round(S/b*100)):0;if(y>0||b>0){let e=x>=0?``:`td-money-status-watch`,n=x>=0?`On track`:`Over budget`,r=Math.abs(x),i=[];u.forEach(e=>i.push(`<span class="td-money-flag td-money-flag-watch">${R(e.name)} due ${e.days===0?`today`:e.days===1?`tomorrow`:`in `+e.days+`d`}</span>`)),l.push({type:`money`,urgency:0,html:`<div class="td-card td-card-money">
        <div class="td-money-row">
          <div>
            <div class="td-card-meta"><span class="td-meta-label">${t.toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</span></div>
            <div class="money-amount"><span class="money-amount-currency">$</span>${r.toLocaleString(`en-AU`,{maximumFractionDigits:0})}<span class="money-amount-suffix">${x>=0?`left`:`over`}</span></div>
          </div>
          <span class="td-money-status ${e}">${n}</span>
        </div>
        <div class="td-money-bar"><div class="td-money-bar-fill" style="width:${T}%"></div></div>
        <div class="td-money-flags">${i.join(``)}<span class="td-money-flag">${w} days left</span></div>
      </div>`})}let ee=typeof vr==`function`?vr().filter(e=>mr(e,r)):[];function E(e){if(!e.triggerTime)return!0;let[n,r]=e.triggerTime.split(`:`).map(Number),i=t.getHours()*60+t.getMinutes(),a=n*60+(r||0);return i>=a-90&&i<a+360}let te=ee.filter(E),D=typeof X==`function`?X():r.replace(/-/g,``),O=ee.filter(e=>!E(e)&&(e.completions?.[D]||[]).length>0),k=[...new Set([...te,...O])];if(k.length>0){let e=k.map(e=>{let t=(e.completions?.[D]||[]).map(String),n=e.steps.length,r=t.length,i=n>0?Math.round(r/n*100):0,a=r===n&&n>0,o=E(e),s=e.triggerTime?`<span style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-left:6px">${e.triggerTime}</span>`:``,c=e.steps.map(n=>{let r=t.includes(String(n.id)),i=n.durationMin?`<span style="font-family:var(--mono);font-size:10px;color:var(--muted-soft);margin-left:auto;padding-left:8px;flex-shrink:0">${n.durationMin}m</span>`:``;return`<div class="td-routine-step ${r?`td-routine-step-done`:``}" onclick="_tdToggleStep('${e.id}','${n.id}')">
          <div class="td-routine-check ${r?`td-routine-check-done`:``}">
            ${r?`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`:``}
          </div>
          <span class="td-routine-step-emoji">${n.emoji||``}</span>
          <span class="td-routine-step-label ${r?`td-routine-step-label-done`:``}">${R(n.label)}</span>
          ${n.points?`<span class="td-routine-step-pts">+${n.points}</span>`:``}
          ${i}
        </div>`}).join(``);return`<div class="td-routine-card ${a?`td-routine-card-done`:o?`td-routine-card-active`:`td-routine-card-locked`}">
        <div class="td-routine-header">
          <span style="font-size:20px">${e.emoji||`📋`}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;color:var(--ink)">${R(e.name)}${s}</div>
            <div style="height:3px;background:var(--hairline);border-radius:99px;margin-top:6px;overflow:hidden">
              <div style="width:${i}%;height:100%;border-radius:99px;background:${a?`var(--good)`:`linear-gradient(90deg,var(--iris-2),var(--iris-3))`}"></div>
            </div>
          </div>
          <span style="font-family:var(--mono);font-size:11px;color:${a?`var(--good)`:`var(--muted)`}">
            ${a?`✓ Done`:`${r}/${n}`}
          </span>
        </div>
        ${o&&n>0?`<div class="td-routine-steps">${c}</div>`:``}
        ${o?``:`<div style="font-size:11px;color:var(--muted-soft);padding:4px 0 2px;font-family:var(--mono)">${He?He(e):``}</div>`}
      </div>`}).join(``);l.push({type:`kids`,urgency:0,html:`<div class="td-card td-card-kids" style="padding:16px 18px">
        <div class="td-card-meta" style="margin-bottom:10px"><span class="td-meta-label">My Routines</span><span class="td-meta-count">${k.length}</span></div>
        ${e}
      </div>`})}let A=new Date(t.getTime()+7*864e5).toISOString().slice(0,10),j=(C.planner?.events||[]).filter(e=>e.date>r&&e.date<=A).sort((e,t)=>e.date.localeCompare(t.date)).slice(0,3),M=(C.bills||[]).map(e=>({...e,days:v(e)})).filter(e=>e.days!==null&&e.days>2&&e.days<=7);if(j.length+M.length>0){let e=[...j.map(e=>{let t=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`,month:`short`}),n=!e.allDay&&e.time?zi?zi(e.time):e.time:``;return`<div class="td-up-row td-clickable" onclick="activateTab('planner');setTimeout(()=>_plannerOpenDetail&&_plannerOpenDetail('${e.id}'),120)">
          <div style="display:flex;flex-direction:column;gap:1px;min-width:60px;flex-shrink:0">
            <span class="td-up-date">${t}</span>
            ${n?`<span style="font-family:var(--mono);font-size:10px;color:var(--iris-2);font-weight:600">${n}</span>`:``}
          </div>
          <span class="td-up-title" style="flex:1">${R(e.title)}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hairline)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>`}),...M.map(e=>`<div class="td-up-row td-clickable" onclick="activateTab('bills')">
        <span class="td-up-date">In ${e.days}d</span>
        <span class="td-up-title" style="flex:1">${R(e.name)} <span style="font-family:var(--mono);color:var(--muted)">$${parseFloat(e.amount).toFixed(0)}</span></span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hairline)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`)].slice(0,4).join(``);l.push({type:`upcoming`,urgency:0,html:`<div class="td-card">
        <div class="td-card-meta"><span class="td-meta-label">Coming up</span><span class="td-meta-count">${j.length+M.length}</span></div>
        <div class="td-up-list">${e}</div>
      </div>`})}let N=(C.kids?.profiles||[]).map(e=>{let t=(C.routineAssignments||[]).filter(t=>t.childId===e.id),n=0;return t.forEach(e=>{let t=(C.routines||[]).find(t=>t.id===e.routineId);if(t){let r=Sr?Sr(e,t.steps.length):0;r>n&&(n=r)}}),{kid:e,streak:n}}).filter(e=>e.streak>=3);if(N.length>0){let e=N[0];l.push({type:`win`,urgency:0,html:`<div class="td-card td-card-win">
        <div class="td-card-meta"><span class="td-meta-label" style="color:var(--lime-deep)">Win</span></div>
        <div class="td-card-headline" style="font-family:var(--serif);font-style:italic">${R(e.kid.name)} did every routine. ${e.streak} days running.</div>
      </div>`})}{let e=C.lists&&C.lists.food?C.lists.food:{items:[]},t=(e.items||[]).filter(e=>e.state===`active`),n=(e.items||[]).filter(e=>e.state===`got_it`),r=C.kids,i=r?(r.completions||[]).filter(e=>e.status===`pending`).length+(r.redemptions||[]).filter(e=>e.status===`pending`).length:0,a=C.kids?.profiles?.length>0,o=`
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
      </div>`:``;l.push({type:`lists`,urgency:+(i>0),html:`<div style="display:flex;gap:12px;margin-bottom:12px">${o}${s}</div>`})}function ne(){let e={overnight:`Quiet night.`,morning:`Quiet day ahead.`,afternoon:`Quiet afternoon.`,evening:`Quiet evening.`,night:`Nothing pressing tonight.`},t=[];if(g.length>=3?t.push(`${g.length} things on the calendar.`):g.length===0&&d.length===0&&u.length===0&&t.push(e[a]||`Quiet day ahead.`),u.length>0){let e=u[0];t.push(`${e.name} ${e.days===0?`is due today`:`is due tomorrow`}.`)}return t.length===0&&t.push(e[a]||`Quiet day ahead.`),t.slice(0,2).join(` `)}let F=ne(),I={priority:0,schedule:1,money:2,lists:3,kids:4,slipping:5,upcoming:6,win:7};l.sort((e,t)=>(I[e.type]??9)-(I[t.type]??9));let re=l.map(e=>e.html).join(``),ie=l.length<=1?`<div class="td-calm">You're sorted.<br>See you tomorrow.</div>`:``,ae=typeof Ot==`function`?`<div id="setup-progress-card">${Ot()}</div>`:``;if(e.innerHTML=`
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
      <div class="td-greeting-date">${c}</div>
      <div class="td-greeting-line">
        ${o} <span class="iris-text">${s?s+`.`:`you.`}</span>
      </div>
      <div class="td-greeting-brief">${R(F)}</div>
    </div>

    ${ae}
    ${C.settings?.typeAMode?`
      ${Tt()}
      ${Et()}
    `:``}
    ${re}
    ${ie}
  `,C.settings?.typeAMode&&wt(),typeof Mt==`function`){let e=typeof vt==`function`?vt():null,n=typeof zn==`function`?zn(0):null,r=n&&C.meals?.plan?.[n]?.[t.getDay()===0?6:t.getDay()-1]||{};Mt(l.map(e=>({title:e.type})),x,w,r,e)}}var At=``,jt=``;async function Mt(e,t,n,r,i){let a=localStorage.getItem(`toto_ai_key`);if(!a)return;let o=new Date().toISOString().slice(0,10);if(At===o&&jt){let e=document.getElementById(`today-briefing-text`);e&&(e.textContent=jt);return}let s=e.filter(e=>e.cls===`red`).map(e=>e.title),c=e.filter(e=>e.cls===`amber`).map(e=>e.title),l=`You are Toto, a friendly family personal assistant app. Write a 2-sentence daily briefing for the user based on this context:

${[`Budget: ${W(Math.abs(t))} ${t>=0?`surplus`:`over budget`}, ${n} days left in the month`,`Health score: ${i.total}/100 (${i.grade})`,s.length?`Urgent: ${s.join(`, `)}`:``,c.length?`Coming up: ${c.join(`, `)}`:``,r.d?`Dinner tonight: ${r.d}`:`No dinner planned`,`${(C.goals||[]).filter(e=>e.status!==`achieved`).length} active goals`].filter(Boolean).join(`. `)}

Rules:
- Warm, conversational, like a helpful friend
- Lead with the most important thing
- Mention dinner if planned
- Keep it under 40 words
- No emojis, no bullet points, just flowing text
- Don't start with "Here's" or "Today"`;try{let e=await fetch(de,{method:`POST`,headers:{"x-api-key":a,"anthropic-version":`2023-06-01`,"content-type":`application/json`},body:JSON.stringify({model:`claude-haiku-4-5-20251001`,max_tokens:100,messages:[{role:`user`,content:l}]})});if(!e.ok)return;let t=(await e.json()).content[0].text.trim().replace(/^["']|["']$/g,``);jt=t,At=o;let n=document.getElementById(`today-briefing-text`);n&&(n.textContent=t)}catch{}}function Nt(){let e=C,t=e.buildContract,n=(e.netWorth.assets||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),r=(e.netWorth.liabilities||[]).reduce((e,t)=>e+(parseFloat(t.value)||0),0),i=n-r,a=e.netWorth.snapshots||[],o=``;if(a.length>=2){let e=i-a[a.length-2].netWorth;o=`<span class="${e>=0?`up`:`dn`}">${e>=0?`+`:``}${Z(e)}</span> vs last snapshot`}let s=H,c=V(s),l=K(c.income),u=K(c.expenses),d=l-u,f=(e.subscriptions||[]).reduce((e,t)=>e+xi(t),0),p=(e.bills||[]).filter(e=>{let t=v(e);return t>=0&&t<=31}).reduce((e,t)=>e+(parseFloat(t.amount)||0),0),m=[...e.bills||[]].filter(e=>v(e)>=-1).sort((e,t)=>v(e)-v(t)).slice(0,5),h=(e.goals||[]).filter(e=>e.status!==`achieved`).slice(0,4),g=t.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),y=(t.variations||[]).filter(e=>e.status===`approved`).reduce((e,t)=>e+(t.amount||0),0),b=t.total+y,x=Math.round(g/b*100),S=t.stages.find(e=>!e.paid),w=((e.kids||{}).completions||[]).filter(e=>e.status===`pending`).length+((e.kids||{}).redemptions||[]).filter(e=>e.status===`pending`).length,T=dt(),ee=K(c.expenses),E=T.map(e=>{let t=Object.values(C.budget.actuals[e]||{}).reduce((e,t)=>e+t,0);return{label:ut(e),budget:ee,actual:t}}),te=ee>0||E.some(e=>e.actual>0),D=vt(),O=251.3,k=(D.total/100*O).toFixed(1),A=D.dimensions.map(e=>{let t=Math.round(e.score/e.max*100),n=t>=75?`#10b981`:t>=50?`#f59e0b`:`#ef4444`;return`
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
              <circle cx="50" cy="50" r="40" fill="none" stroke="${D.color}" stroke-width="10"
                stroke-dasharray="${k} ${O}" stroke-linecap="round"/>
            </g>
            <text x="50" y="47" text-anchor="middle" font-size="24" font-weight="800" fill="${D.color}">${D.total}</text>
            <text x="50" y="63" text-anchor="middle" font-size="13" font-weight="600" fill="#94a3b8">Grade ${D.grade}</text>
          </svg>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">${A}</div>
      </div>
      <div style="padding:0 20px 14px;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:10px;margin-top:4px">
        💡 ${D.insight}
      </div>
    </div>`,M=``;if(te){let e=Math.max(...E.flatMap(e=>[e.budget,e.actual]),1),t=532/E.length,n=t*.28,r=t*.04;M=`<div class="db-widget">
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
        <text x="53" y="${n+4}" text-anchor="end" font-size="9" fill="#94a3b8">${W(t*e)}</text>`}).join(``)}${E.map((i,a)=>{let o=58+a*t+t*.08,s=i.budget>0?i.budget/e*140:0,c=i.actual>0?i.actual/e*140:0,l=i.actual>i.budget?`#ef4444`:`#10b981`;return`<rect x="${o}" y="${150-s}" width="${n}" height="${s}" fill="#2563eb" opacity="0.65" rx="2"/>
        <rect x="${o+n+r}" y="${150-c}" width="${n}" height="${c}" fill="${l}" opacity="0.8" rx="2"/>
        <text x="${o+n+r/2+n/2}" y="166" text-anchor="middle" font-size="10" fill="#64748b">${i.label}</text>`}).join(``)}</svg>
      </div>
    </div>`}let N=`
    <!-- Hero row: net worth + 4 stats -->
    <div class="db-hero-row">
      <div class="db-nw-card" onclick="activateTab('networth')" style="cursor:pointer">
        <div>
          <div class="db-nw-label">Net Worth</div>
          <div class="db-nw-amount">${Z(i)}</div>
          ${o?`<div class="db-nw-change">${o}</div>`:``}
        </div>
        <div style="font-size:12px;opacity:0.6;margin-top:12px">${W(n)} assets · ${W(r)} liabilities</div>
      </div>
      <div class="db-stats-col">
        <div class="db-stat">
          <div class="db-stat-val ${d>=0?`green`:`red`}">${W(Math.abs(d))}</div>
          <div class="db-stat-lbl">Monthly ${d>=0?`surplus`:`deficit`}</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val teal">$${Math.round(p).toLocaleString()}</div>
          <div class="db-stat-lbl">Bills this month</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val">$${Math.round(f).toLocaleString()}</div>
          <div class="db-stat-lbl">Subscriptions/mo</div>
        </div>
        <div class="db-stat">
          <div class="db-stat-val">${W(l)}</div>
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
          ${m.length?m.map(e=>{let t=v(e),n=t<0?`<span class="bill-due-badge overdue">Overdue</span>`:t===0?`<span class="bill-due-badge today">Today</span>`:t<=7?`<span class="bill-due-badge soon">${t}d</span>`:`<span class="bill-due-badge ok">${_(e).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}</span>`;return`<div class="db-bill-row">
              <div class="db-bill-icon">${mi(e.category)}</div>
              <div class="db-bill-name">${R(e.name)}</div>
              ${n}
              <div class="db-bill-amount">${W(parseFloat(e.amount)||0)}</div>
            </div>`}).join(``):`<div class="db-empty-row">No upcoming bills — <button class="db-widget-link" onclick="activateTab('bills')">add one</button></div>`}
        </div>

        <!-- Goals -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Goals</span>
            <button class="db-widget-link" onclick="activateTab('goals')">View all →</button>
          </div>
          ${h.length?h.map(e=>{let t=Math.min(Math.round((e.saved||0)/(e.target||1)*100),100);return`<div class="db-goal-row">
              <div class="db-goal-top">
                <span class="db-goal-name">${e.emoji||`🎯`} ${R(e.name)}</span>
                <span class="db-goal-pct">${W(e.saved||0)} of ${W(e.target||0)} · ${t}%</span>
              </div>
              <div class="db-goal-bar"><div class="db-goal-fill" style="width:${t}%"></div></div>
            </div>`}).join(``):`<div class="db-empty-row">No active goals — <button class="db-widget-link" onclick="activateTab('goals')">add one</button></div>`}
        </div>
      </div>

      <div>
        <!-- Budget this month -->
        <div class="db-widget">
          <div class="db-widget-header">
            <span class="db-widget-title">Budget · ${lt(s)}</span>
            <button class="db-widget-link" onclick="activateTab('budget')">Edit →</button>
          </div>
          <div class="db-budget-row">
            <span class="db-budget-label">Income</span>
            <span class="db-budget-val" style="color:#10b981">${W(l)}</span>
          </div>
          <div class="db-budget-row">
            <span class="db-budget-label">Expenses</span>
            <span class="db-budget-val" style="color:#ef4444">${W(u)}</span>
          </div>
          <div class="db-budget-row" style="border-top:2px solid var(--border)">
            <span class="db-budget-label" style="font-weight:700">${d>=0?`Surplus`:`Deficit`}</span>
            <span class="db-budget-val" style="color:${d>=0?`#10b981`:`#ef4444`}">${W(Math.abs(d))}</span>
          </div>
        </div>

        ${w>0?`
        <!-- Kids pending approvals -->
        <div class="db-widget" style="border-color:#fde68a">
          <div class="db-widget-header" style="background:#fffbeb">
            <span class="db-widget-title">⭐ Kids Zone — ${w} pending approval${w===1?``:`s`}</span>
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
              <span style="font-weight:600">${W(g)} paid</span>
              <span style="color:#94a3b8">${x}% of ${W(b)}</span>
            </div>
            <div class="db-build-bar" style="margin:0 0 10px">
              <div class="db-build-fill" style="width:${x}%"></div>
            </div>
            ${S?`<div style="font-size:12px;color:#64748b">Next: <strong>${R(S.name)}</strong> — ${W(S.amount)}</div>`:`<div style="font-size:12px;color:#10b981;font-weight:600">✓ All stages paid</div>`}
          </div>
        </div>
      </div>
    </div>

    ${M}
  `;document.getElementById(`dashboard-content`).innerHTML=N}function Pt(){let e=C.buildContract,t=e.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0);e.total-t;let n=e.stages.filter(e=>e.paid).length,r=e.stages.length,i=e.variations||[],a=i.filter(e=>e.status===`approved`).reduce((e,t)=>e+(t.amount||0),0),o=i.filter(e=>e.status===`pending`).reduce((e,t)=>e+(t.amount||0),0),s=e.total+a,c=`
    <div class="section" style="border-left:4px solid ${J.build.contract}">
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
          <div style="font-size:18px;font-weight:700">${W(e.total)}</div>
        </div>
        ${a===0?``:`
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Approved Variations</div>
          <div style="font-size:18px;font-weight:700;color:${a>0?`var(--danger)`:`var(--success)`}">${a>0?`+`:``}${W(a)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Revised Total</div>
          <div style="font-size:18px;font-weight:700;color:var(--primary)">${W(s)}</div>
        </div>`}
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Paid to Date</div>
          <div style="font-size:18px;font-weight:700;color:var(--success)">${W(t)}</div>
        </div>
        <div style="background:var(--surface);padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:4px">Remaining</div>
          <div style="font-size:18px;font-weight:700;color:var(--danger)">${W(s-t)}</div>
        </div>
        ${o>0?`
        <div style="background:#fffbeb;padding:14px 20px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#92400e;margin-bottom:4px">Pending Variations</div>
          <div style="font-size:18px;font-weight:700;color:#d97706">+${W(o)}</div>
        </div>`:``}
      </div>

      <!-- Visual stage timeline -->
      <div style="padding:16px 20px;border-bottom:1px solid var(--border)">
        <div style="display:flex;gap:0;position:relative">
          ${e.stages.map((t,n)=>{let r=(t.amount/e.total*100).toFixed(0),i=!t.paid&&e.stages.slice(0,n).every(e=>e.paid),a=t.paid?`#dcfce7`:i?`#dbeafe`:`var(--surface2)`,o=t.paid?`#16a34a`:i?`var(--primary)`:`var(--border)`,s=t.paid?`#15803d`:i?`var(--primary)`:`var(--text-muted)`,c=t.paid?`✓`:i?`→`:`${n+1}`,l=t.paid&&t.paidDate?G(t.paidDate):t.expectedDate?`Exp. `+G(t.expectedDate):``,u=!t.paid&&t.expectedDate&&gt(t.expectedDate);return`
            <div style="flex:1;min-width:0;border:1px solid ${u?`var(--danger)`:o};border-radius:8px;padding:10px 10px 8px;margin-right:${n<e.stages.length-1?`6px`:`0`};background:${u?`#fef2f2`:a};cursor:pointer;position:relative" onclick="openEditStage(${t.id})" title="Edit ${z(t.name)}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
                <span style="font-size:11px;font-weight:700;color:${u?`var(--danger)`:s};width:20px;height:20px;border-radius:50%;background:${t.paid?`#16a34a`:i?`var(--primary)`:`#94a3b8`};color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">${c}</span>
                <span style="font-size:11px;color:${u?`var(--danger)`:`var(--text-muted)`};font-weight:600">${r}%</span>
              </div>
              <div style="font-size:12px;font-weight:600;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px">${R(t.name)}</div>
              <div style="font-size:12px;font-weight:700;color:${t.paid?`#15803d`:`var(--text)`}">${W(t.amount)}</div>
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
            ${e.stages.map(t=>{let n=(t.amount/e.total*100).toFixed(1),r=!t.paid&&t.expectedDate&&gt(t.expectedDate),i=t.paid?`<span class="badge paid">Paid</span>`:r?`<span class="badge overdue">Overdue</span>`:`<span class="badge unpaid">Upcoming</span>`;return`<tr>
                <td style="font-weight:500">${R(t.name)}</td>
                <td class="amount">${W(t.amount)}</td>
                <td style="color:var(--text-muted)">${n}%</td>
                <td>${i}</td>
                <td>${ei(t.funding||`loan`)}</td>
                <td>${t.expectedDate?G(t.expectedDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                <td>${G(t.paidDate)}</td>
                <td style="color:var(--text-muted)">${R(t.invoiceRef||`—`)}</td>
                <td class="actions">
                  ${ti(`stage-${t.id}`,z(t.name))}
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
            ${i.length===0?`No variations yet`:`${i.filter(e=>e.status===`approved`).length} approved · ${i.filter(e=>e.status===`pending`).length} pending · ${a>=0?`+`:``}${W(a)} net impact`}
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddVariation()">+ Variation</button>
      </div>
      ${i.length===0?`<div style="padding:24px 20px;text-align:center;color:var(--text-muted);font-size:13px">No variations raised yet. Builder-initiated or owner-requested changes to the contract will appear here.</div>`:`<div class="table-wrap">
            <table>
              <thead><tr><th>Ref</th><th>Description</th><th>Amount</th><th>Status</th><th>Funding</th><th>Raised</th><th>Approved</th><th>Notes</th><th></th></tr></thead>
              <tbody>
                ${i.map(e=>`<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${R(e.ref||`—`)}</td>
                  <td style="font-weight:500">${R(e.name)}</td>
                  <td class="amount" style="color:${(e.amount||0)<0?`var(--success)`:`var(--danger)`};font-weight:600">${e.amount>0?`+`:``}${W(e.amount)}</td>
                  <td>${l[e.status]||l.pending}</td>
                  <td>${ei(e.funding||`loan`)}</td>
                  <td>${G(e.dateRaised)}</td>
                  <td>${G(e.dateApproved)}</td>
                  <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${R(e.notes||`—`)}</td>
                  <td class="actions">
                    <button class="btn btn-ghost btn-sm" onclick="openEditVariation(${e.id})">✏️</button>
                    <button class="btn btn-danger-ghost btn-sm" onclick="deleteVariation(${e.id})">🗑</button>
                  </td>
                </tr>`).join(``)}
              </tbody>
              <tfoot>
                <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                  <td colspan="2" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Net approved variations</td>
                  <td class="amount" style="padding:11px 16px;font-weight:700;color:${a>=0?`var(--danger)`:`var(--success)`}">${a>0?`+`:``}${W(a)}</td>
                  <td colspan="6" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">Revised contract: <strong>${W(s)}</strong>${o>0?` · <span style="color:#d97706">+${W(o)} pending</span>`:``}</td>
                </tr>
              </tfoot>
            </table>
          </div>`}
    </div>
  `;let u=C.extras,d=u.reduce((e,t)=>e+(t.totalAmount||0),0),f=u.reduce((e,t)=>e+(t.amountPaid||0),0);c+=`
    <div class="section" style="border-left:4px solid ${J.build.extras}">
      <div class="section-header">
        <div>
          <div class="section-title">Outside Contract</div>
          <div class="section-subtitle">Landscaping, solar, and other extras</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          ${d>0?`<span class="contract-total-badge">${W(f)} / ${W(d)}</span>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddExtra()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Vendor</th><th>Total Cost</th><th>Paid</th><th>Remaining</th><th>Due Date</th><th>Status</th><th>Funding</th><th></th></tr></thead>
          <tbody>
            ${u.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>No items yet. Add landscaping, solar, or other extras.</div></td></tr>`:u.map(e=>{let t=(e.totalAmount||0)-(e.amountPaid||0),n={"not-quoted":`<span class="badge unpaid">Not Quoted</span>`,quoted:`<span class="badge pending">Quoted</span>`,approved:`<span class="badge" style="background:#ede9fe;color:#5b21b6">Approved</span>`,partial:`<span class="badge partial">Partially Paid</span>`,paid:`<span class="badge paid">Paid</span>`},r=e.dueDate&&gt(e.dueDate)&&e.status!==`paid`,i=n[e.status||`not-quoted`]+(r?` <span class="badge overdue">Overdue</span>`:``);return`<tr>
                <td style="font-weight:500">${R(e.name)}</td>
                <td>${e.vendor?R(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                <td class="amount">${e.totalAmount?W(e.totalAmount):`<span class="amount muted">TBC</span>`}</td>
                <td class="amount">${W(e.amountPaid)}</td>
                <td class="amount ${t>0?``:`muted`}">${t>0?W(t):`—`}</td>
                <td>${G(e.dueDate)}</td>
                <td>${i}</td>
                <td>${ei(e.funding||`loan`)}</td>
                <td class="actions">
                  ${ti(`extra-${e.id}`,z(e.name))}
                  <button class="btn btn-ghost btn-sm" onclick="openEditExtra(${e.id})">✏️</button>
                  <button class="btn btn-danger-ghost btn-sm" onclick="deleteExtra(${e.id})">🗑</button>
                </td>
              </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `;let p=C.furniture,m=p.reduce((e,t)=>e+(t.price||0),0),h=p.filter(e=>e.status===`delivered`||e.status===`ordered`),g=p.filter(e=>e.status===`to-purchase`),_=h.reduce((e,t)=>e+(t.price||0),0),v=g.reduce((e,t)=>e+(t.price||0),0);c+=`
    <div class="section" style="border-left:4px solid ${J.build.furniture}">
      <div class="section-header">
        <div>
          <div class="section-title">Furniture</div>
          <div class="section-subtitle">${p.length} items · ${W(_)} purchased · ${W(v)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${p.length>0?`
          <div style="display:flex;gap:6px">
            <span class="badge paid">${p.filter(e=>e.status===`delivered`).length} delivered</span>
            <span class="badge partial">${p.filter(e=>e.status===`ordered`).length} ordered</span>
            <span class="badge unpaid">${g.length} to buy</span>
          </div>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddFurniture()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${p.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">🛋️</div>No furniture items yet. Add sofas, beds, appliances and more.</div></td></tr>`:p.map(e=>{let t={"to-purchase":`<span class="badge unpaid">To Purchase</span>`,ordered:`<span class="badge partial">Ordered</span>`,delivered:`<span class="badge paid">Delivered</span>`},n=e.deliveryDate&&e.status!==`delivered`&&gt(e.deliveryDate);return`<tr>
                    <td style="font-weight:500">${R(e.name)}</td>
                    <td style="color:var(--text-muted)">${R(e.room||`—`)}</td>
                    <td>${e.vendor?R(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td class="amount">${e.price?W(e.price):`<span class="amount muted">TBC</span>`}</td>
                    <td>${t[e.status]||t[`to-purchase`]}</td>
                    <td>${ei(e.funding||`own-funds`)}</td>
                    <td>${e.deliveryDate?n?`<span class="badge overdue">${G(e.deliveryDate)}</span>`:G(e.deliveryDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${R(e.notes||`—`)}</td>
                    <td class="actions">
                      ${ti(`furniture-${e.id}`,z(e.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditFurniture(${e.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteFurniture(${e.id})">🗑</button>
                    </td>
                  </tr>`}).join(``)}
          </tbody>
          ${p.length>0?`
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${W(m)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${W(_)} purchased · ${W(v)} still to buy
              </td>
            </tr>
          </tfoot>`:``}
        </table>
      </div>
    </div>
  `;let y=C.appliances,b=y.reduce((e,t)=>e+(t.price||0),0),x=y.filter(e=>e.status===`delivered`||e.status===`ordered`),S=y.filter(e=>e.status===`to-purchase`),w=x.reduce((e,t)=>e+(t.price||0),0),T=S.reduce((e,t)=>e+(t.price||0),0);c+=`
    <div class="section" style="border-left:4px solid ${J.build.appliances}">
      <div class="section-header">
        <div>
          <div class="section-title">Appliances</div>
          <div class="section-subtitle">${y.length} items · ${W(w)} purchased · ${W(T)} remaining</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${y.length>0?`
          <div style="display:flex;gap:6px">
            <span class="badge paid">${y.filter(e=>e.status===`delivered`).length} delivered</span>
            <span class="badge partial">${y.filter(e=>e.status===`ordered`).length} ordered</span>
            <span class="badge unpaid">${S.length} to buy</span>
          </div>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddAppliance()">+ Item</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Room</th><th>Store / Vendor</th><th>Price</th><th>Status</th><th>Funding</th><th>Delivery Date</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${y.length===0?`<tr><td colspan="9"><div class="empty"><div class="empty-icon">🍳</div>No appliances yet. Add fridges, dishwashers, ovens and more.</div></td></tr>`:y.map(e=>{let t={"to-purchase":`<span class="badge unpaid">To Purchase</span>`,ordered:`<span class="badge partial">Ordered</span>`,delivered:`<span class="badge paid">Delivered</span>`},n=e.deliveryDate&&e.status!==`delivered`&&gt(e.deliveryDate);return`<tr>
                    <td style="font-weight:500">${R(e.name)}</td>
                    <td style="color:var(--text-muted)">${R(e.room||`—`)}</td>
                    <td>${e.vendor?R(e.vendor):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td class="amount">${e.price?W(e.price):`<span class="amount muted">TBC</span>`}</td>
                    <td>${t[e.status]||t[`to-purchase`]}</td>
                    <td>${ei(e.funding||`own-funds`)}</td>
                    <td>${e.deliveryDate?n?`<span class="badge overdue">${G(e.deliveryDate)}</span>`:G(e.deliveryDate):`<span style="color:var(--text-muted)">—</span>`}</td>
                    <td style="color:var(--text-muted);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${R(e.notes||`—`)}</td>
                    <td class="actions">
                      ${ti(`appliance-${e.id}`,z(e.name))}
                      <button class="btn btn-ghost btn-sm" onclick="openEditAppliance(${e.id})">✏️</button>
                      <button class="btn btn-danger-ghost btn-sm" onclick="deleteAppliance(${e.id})">🗑</button>
                    </td>
                  </tr>`}).join(``)}
          </tbody>
          ${y.length>0?`
          <tfoot>
            <tr style="background:var(--surface2);border-top:2px solid var(--border)">
              <td colspan="3" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total</td>
              <td class="amount" style="padding:11px 16px;font-weight:700">${W(b)}</td>
              <td colspan="4" style="padding:11px 16px;font-size:12px;color:var(--text-muted)">
                ${W(w)} purchased · ${W(T)} still to buy
              </td>
            </tr>
          </tfoot>`:``}
        </table>
      </div>
    </div>
  `,document.getElementById(`build-content`).innerHTML=c}function K(e){return e.reduce((e,t)=>e+q(t),0)}function Ft(e){return{daily:`Daily`,weekly:`Weekly`,fortnightly:`Fortnightly`,monthly:`Monthly`,quarterly:`Quarterly`,annually:`Annually`,annual:`Annually`,custom:`Custom`}[e]||`Monthly`}function It(e){return(e.frequency||`monthly`)===`custom`?`Every ${e.customEvery||1} ${e.customUnit||`weeks`}`:Ft(e.frequency||`monthly`)}function q(e){let t=e.frequency||`monthly`;if(t===`custom`){let t=e.customEvery||1;return e.customUnit===`months`?(e.amount||0)/t:(e.amount||0)*52/(t*12)}return g(e.amount||0,t)}function Lt(){return C.expenseCategories||fe.expenseCategories}function Rt(){return C.incomeCategories||fe.incomeCategories}var zt=[{value:`spending`,label:`Spending Limit`,icon:`📉`},{value:`savings`,label:`Savings Target`,icon:`🏦`},{value:`income`,label:`Income Target`,icon:`📈`}];function Bt(e){if(e.type===`spending`){let t=Object.keys(C.budget.actuals).sort().reverse(),n=null;for(let r of t){let t=(V(r).expenses||[]).filter(t=>(t.category||`Other`)===e.category).reduce((e,t)=>e+(C.budget.actuals[r]?.[t.id]||0),0);if(t>0){n=t;break}}let r=e.targetMonthly||0;if(n===null)return{pct:null,label:`No actuals yet`,actual:null,target:r};let i=r>0?Math.max(0,Math.min(100,n/r*100)):0,a=n<=r;return{pct:i,label:`${W(n)} actual vs ${W(r)} limit`,actual:n,target:r,ok:a}}if(e.type===`savings`){let t=e.currentSaved||0,n=e.targetTotal||1;return{pct:Math.min(100,t/n*100),label:`${W(t)} of ${W(n)} saved`,ok:t>=n}}if(e.type===`income`){let t=K(V(H).income),n=e.targetMonthly||1;return{pct:Math.min(100,t/n*100),label:`${W(t)}/mo of ${W(n)}/mo target`,ok:t>=n}}return{pct:0,label:``,ok:!1}}function Vt(){let e=C.goals,t=e.filter(e=>e.status===`active`),n=e.filter(e=>e.status===`achieved`),r=``;e.length>0&&(r+=`
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
  </div>`,i.length===0){let e=V(H),t=K(e.income)-K(e.expenses),n=t>0?`<div style="font-size:14px;color:#64748b;margin-bottom:4px">You have <strong style="color:#16a34a">${W(t)}</strong> surplus each month.</div>
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
      </div>`}else i.forEach(e=>{let t=zt.find(t=>t.value===e.type)||zt[0],n=Bt(e),i={active:`<span class="badge" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe">Active</span>`,achieved:`<span class="badge paid">Achieved</span>`,abandoned:`<span class="badge" style="background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0">Abandoned</span>`}[e.status]||``,a=e.deadline?(()=>{let[t,n,r]=e.deadline.split(`-`),i=Math.ceil((new Date(e.deadline)-new Date)/864e5),a=`${r}/${n}/${t}`;return i<0?`<span style="color:var(--danger)">${a} (overdue)</span>`:i<=30?`<span style="color:var(--warning,#f59e0b)">${a} (${i}d left)</span>`:a})():`—`,o=``;if(n.pct!==null){let t=e.type===`spending`?n.ok?`var(--success)`:`var(--danger)`:`var(--primary)`,r=e.type===`spending`?n.ok?`✓ Under limit`:`${Math.round(n.pct)}% of limit`:`${Math.round(n.pct)}%`;o=`
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
              <div class="goal-card-title">${t.icon} ${R(e.name)}</div>
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
          ${e.notes?`<div style="font-size:12px;color:var(--text-muted);margin-top:8px">${R(e.notes)}</div>`:``}
        </div>`});document.getElementById(`goals-content`).innerHTML=r}var Ht=null,Ut=[{value:`add-income`,label:`Add income source`,icon:`💰`},{value:`remove-income`,label:`Remove income source`,icon:`➖`},{value:`reduce-income`,label:`Reduce income amount`,icon:`📉`},{value:`add-expense`,label:`Add new expense`,icon:`➕`},{value:`remove-expense`,label:`Remove expense`,icon:`✂️`},{value:`reduce-expense`,label:`Reduce expense amount`,icon:`📉`}];function Wt(e){let t=V(H),n=JSON.parse(JSON.stringify(t.income)),r=JSON.parse(JSON.stringify(t.expenses));return(e.adjustments||[]).forEach(e=>{if(e.type===`add-income`)n.push({id:-(e.id||0),name:e.name,amount:e.amount||0,frequency:e.frequency||`monthly`});else if(e.type===`remove-income`)n=n.filter(t=>t.id!==e.itemId);else if(e.type===`reduce-income`){let t=n.find(t=>t.id===e.itemId);t&&(t.amount=e.changeType===`percent`?Math.max(0,t.amount*(1-e.changeAmount/100)):Math.max(0,t.amount-(e.changeAmount||0)))}else if(e.type===`add-expense`)r.push({id:-(e.id||0),name:e.name,amount:e.amount||0,frequency:e.frequency||`monthly`,category:e.category||`Other`});else if(e.type===`remove-expense`)r=r.filter(t=>t.id!==e.itemId);else if(e.type===`reduce-expense`){let t=r.find(t=>t.id===e.itemId);t&&(t.amount=e.changeType===`percent`?Math.max(0,t.amount*(1-e.changeAmount/100)):Math.max(0,t.amount-(e.changeAmount||0)))}}),{income:n,expenses:r,totalIncome:K(n),totalExpenses:K(r),surplus:K(n)-K(r)}}function Gt(){let e=C.scenarios,t=V(H),n=K(t.income),r=K(t.expenses),i=n-r,a=`<div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary" onclick="openAddScenario()">+ New Scenario</button>
  </div>`;e.length===0?a+=`<div class="empty"><div class="empty-icon">🔬</div>No scenarios yet. Create one to model income changes, expense cuts, or lifestyle adjustments.</div>`:e.forEach(e=>{let t=Wt(e),o=t.totalIncome-n,s=t.totalExpenses-r,c=t.surplus-i,l=Ht===e.id;a+=`
        <div class="scenario-card">
          <div class="scenario-card-header" onclick="toggleScenario(${e.id})">
            <div style="flex:1">
              <div style="font-weight:600;font-size:14px">${R(e.name)}</div>
              ${e.description?`<div style="font-size:12px;color:var(--text-muted);margin-top:2px">${R(e.description)}</div>`:``}
            </div>
            <div style="display:flex;align-items:center;gap:12px;flex-shrink:0">
              <div style="text-align:right">
                <div style="font-size:11px;color:var(--text-muted)">Surplus impact</div>
                <div style="font-size:14px;font-weight:700;color:${c>=0?`var(--success)`:`var(--danger)`}">${c>=0?`+`:``}${W(c)}/mo</div>
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
              ${(e.adjustments||[]).length===0?`<div style="font-size:13px;color:var(--text-muted);padding:8px 0">No adjustments yet. Add income or expense changes.</div>`:(e.adjustments||[]).map(t=>{let n=Ut.find(e=>e.value===t.type)||Ut[0],r=``;return t.type===`add-income`||t.type===`add-expense`?r=`${R(t.name)} · ${W(t.amount||0)}/${t.frequency||`mo`}${t.category?` · `+t.category:``}`:t.type===`remove-income`||t.type===`remove-expense`?r=R(t.itemName||`—`):(t.type===`reduce-income`||t.type===`reduce-expense`)&&(r=`${R(t.itemName)} · reduce by ${t.changeType===`percent`?t.changeAmount+`%`:W(t.changeAmount||0)}`),`<div class="adj-item">
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
                <div class="compare-row"><span>Monthly Income</span><span class="amount" style="color:var(--success)">${W(n)}</span></div>
                <div class="compare-row"><span>Monthly Expenses</span><span class="amount" style="color:var(--danger)">${W(r)}</span></div>
                <div class="compare-row"><span>Monthly Surplus</span><span class="amount" style="color:${i>=0?`var(--success)`:`var(--danger)`}">${W(i)}</span></div>
                <div class="compare-row"><span style="color:var(--text-muted);font-size:12px">Annual surplus</span><span style="color:var(--text-muted);font-size:12px">${W(i*12)}</span></div>
              </div>
              <div class="compare-col" style="border:2px solid var(--primary)">
                <div class="compare-col-title" style="color:var(--primary)">Scenario: ${R(e.name)}</div>
                <div class="compare-row">
                  <span>Monthly Income</span>
                  <span class="amount" style="color:var(--success)">${W(t.totalIncome)} ${o===0?``:`<small style="color:${o>0?`var(--success)`:`var(--danger)`}">(${o>0?`+`:``}${W(o)})</small>`}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Expenses</span>
                  <span class="amount" style="color:var(--danger)">${W(t.totalExpenses)} ${s===0?``:`<small style="color:${s<0?`var(--success)`:`var(--danger)`}">(${s>0?`+`:``}${W(s)})</small>`}</span>
                </div>
                <div class="compare-row">
                  <span>Monthly Surplus</span>
                  <span class="amount" style="color:${t.surplus>=0?`var(--success)`:`var(--danger)`};font-weight:700">${W(t.surplus)}</span>
                </div>
                <div class="compare-row">
                  <span style="font-size:12px">Annual surplus</span>
                  <span style="font-size:12px;font-weight:600;color:${t.surplus>=0?`var(--success)`:`var(--danger)`}">${W(t.surplus*12)} ${c===0?``:`<small>(${c>0?`+`:``}${W(c*12)}/yr)</small>`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>`}),document.getElementById(`scenarios-content`).innerHTML=a}var Kt=`home_finance_colors_v1`,qt={expense:{"Mortgage / Rent":`#6366f1`,Insurance:`#8b5cf6`,Utilities:`#06b6d4`,Groceries:`#10b981`,Transport:`#f59e0b`,"Childcare / Education":`#3b82f6`,Health:`#ef4444`,Entertainment:`#f97316`,Subscriptions:`#84cc16`,"Dining Out":`#14b8a6`,Clothing:`#ec4899`,"Personal Care":`#a855f7`,"Savings / Investment":`#22c55e`,Other:`#94a3b8`},income:`#10b981`,build:{contract:`#3b82f6`,extras:`#f59e0b`,furniture:`#8b5cf6`,appliances:`#ef4444`}};function Jt(){try{let e=localStorage.getItem(Kt);if(!e)return JSON.parse(JSON.stringify(qt));let t=JSON.parse(e);return t.expense||(t.expense={}),t.build||(t.build={}),t.income||(t.income=qt.income),Lt().forEach(e=>{t.expense[e]||(t.expense[e]=qt.expense[e]||`#94a3b8`)}),Object.keys(qt.build).forEach(e=>{t.build[e]||(t.build[e]=qt.build[e])}),t}catch{return JSON.parse(JSON.stringify(qt))}}var J=Jt();function Yt(){return(C.householdProfile.members||[]).filter(e=>e.role===`adult`).length||1}function Xt(){return(C.householdProfile.members||[]).filter(e=>e.role===`child`).length}function Zt(e,t,n){let r=t+n;return[{category:`Mortgage / Rent`,min:e*.2,max:e*.3,label:`20–30% of income`,source:`ABS / MoneySmart`,needs:!0},{category:`Groceries`,min:380+(t-1)*260+n*160,max:560+(t-1)*360+n*220,label:`$${Math.round(380+(t-1)*260+n*160)}–$${Math.round(560+(t-1)*360+n*220)}/month for ${r} ${r===1?`person`:`people`}`,source:`ABS HES 2022`,needs:!0},{category:`Transport`,min:e*.08,max:e*.15,label:`8–15% of income`,source:`ABS HES 2022`,needs:!0},{category:`Utilities`,min:180+t*25+n*15,max:360+t*40+n*25,label:`$${Math.round(180+t*25+n*15)}–$${Math.round(360+t*40+n*25)}/month`,source:`AER / ABS`,needs:!0},{category:`Insurance`,min:180+t*40+n*20,max:420+t*60+n*30,label:`$${Math.round(180+t*40+n*20)}–$${Math.round(420+t*60+n*30)}/month`,source:`APRA industry avg`,needs:!0},{category:`Health`,min:60*t+30*n,max:180*t+60*n,label:`$${60*t+30*n}–$${180*t+60*n}/month`,source:`AIHW / ABS`,needs:!0},...n>0?[{category:`Childcare / Education`,min:700*n,max:2200*n,label:`$700–$2,200/month per child (before subsidies)`,source:`ACCC Childcare Report`,needs:!0}]:[],{category:`Dining Out`,min:e*.02,max:e*.05,label:`2–5% of income`,source:`MoneySmart`,needs:!1},{category:`Entertainment`,min:e*.02,max:e*.05,label:`2–5% of income`,source:`MoneySmart`,needs:!1},{category:`Subscriptions`,min:30,max:120,label:`$30–$120/month`,source:`Industry average`,needs:!1},{category:`Clothing`,min:50*t+30*n,max:150*t+80*n,label:`$${50*t+30*n}–$${150*t+80*n}/month`,source:`ABS HES 2022`,needs:!1},{category:`Savings / Investment`,min:e*.1,max:e*.2,label:`10–20% of income (aim for 20%)`,source:`50/30/20 rule`,needs:!1}]}function Qt(e,t,n){return e<t*.9?`under`:e>n*1.1?`over`:`within`}var $t=`home_finance_ai_key`;function en(){return localStorage.getItem($t)||``}function tn(){let e=dt(),t={};return e.forEach(e=>{let n=V(e),r={},i={};n.expenses.forEach(t=>{let n=t.category||`Other`;r[n]=(r[n]||0)+q(t);let a=U(t.id,e);a>0&&(i[n]=(i[n]||0)+a)}),new Set([...Object.keys(r),...Object.keys(i)]).forEach(n=>{t[n]||(t[n]=[]),t[n].push({mo:e,budget:r[n]||0,actual:i[n]||0,hasActual:(i[n]||0)>0})})}),t}function nn(e){let t=[];return Object.entries(e).forEach(([e,n])=>{let r=n.filter(e=>e.hasActual);if(r.length<2)return;let i=r.filter(e=>e.budget>0&&e.actual>e.budget*1.05).length,a=r.filter(e=>e.budget>0&&e.actual<e.budget*.92).length,o=r.reduce((e,t)=>e+(t.actual-t.budget),0)/r.length,s=n.slice(-3).filter(e=>e.hasActual),c=n.slice(0,3).filter(e=>e.hasActual),l=s.length?s.reduce((e,t)=>e+t.actual,0)/s.length:0,u=c.length?c.reduce((e,t)=>e+t.actual,0)/c.length:0,d=u>50?(l-u)/u:0;i>=3&&o>20?t.push({cat:e,level:`warning`,icon:`⚠️`,title:`Consistently over on ${e}`,body:`Over budget ${i}/${r.length} months, avg +${W(Math.abs(o))}/mo. Consider raising the budget or cutting back.`,months:r}):a>=4&&n[n.length-1]?.budget>0?t.push({cat:e,level:`good`,icon:`✅`,title:`Consistently under on ${e}`,body:`Under budget ${a}/${r.length} months, avg ${W(Math.abs(o))}/mo less. You may be able to reallocate this budget elsewhere.`,months:r}):d>.25&&l>50?t.push({cat:e,level:`warning`,icon:`📈`,title:`${e} trending up`,body:`Spending up ${Math.round(d*100)}% over recent months — now averaging ${W(l)}/mo. Worth keeping an eye on.`,months:r}):d<-.25&&u>50&&t.push({cat:e,level:`good`,icon:`📉`,title:`${e} trending down`,body:`Down ${Math.round(Math.abs(d)*100)}% recently — now ${W(l)}/mo. Nice improvement.`,months:r})}),t.sort((e,t)=>[`warning`,`alert`,`good`,`info`].indexOf(e.level)-[`warning`,`alert`,`good`,`info`].indexOf(t.level)).slice(0,6)}function rn(){let e=V(H);if(e.expenses.length===0)return``;let t={};e.expenses.forEach(e=>{let n=e.category||`Other`;t[n]||(t[n]={budget:0,actual:0}),t[n].budget+=q(e),t[n].actual+=U(e.id,H)});let n=Object.entries(t).filter(([,e])=>e.budget>0||e.actual>0).sort((e,t)=>Math.max(t[1].budget,t[1].actual)-Math.max(e[1].budget,e[1].actual));if(!n.length)return``;let r=Math.max(...n.flatMap(([,e])=>[e.budget,e.actual]),1),i=n.map(([e,t])=>{let n=t.actual>0,i=(t.budget/r*100).toFixed(1),a=(t.actual/r*100).toFixed(1),o=t.actual-t.budget,s=n?o>5?`over`:o<-5?`under`:``:``,c=n?o>5?`<span class="spi-over">+${W(o)}</span>`:o<-5?`<span class="spi-under">${W(o)}</span>`:`<span class="spi-on">on track</span>`:`<span class="spi-no-actual">no actuals</span>`;return`<div class="spi-cat-row">
      <div class="spi-cat-label">${e}</div>
      <div class="spi-cat-bars">
        <div class="spi-bar-wrap"><div class="spi-bar-budget" style="width:${i}%"></div>${n?`<div class="spi-bar-actual ${s}" style="width:${a}%"></div>`:``}</div>
      </div>
      <div class="spi-cat-amounts"><span>${W(t.budget)}</span>${c}</div>
    </div>`}).join(``);return`<div class="spi-breakdown">
    <div class="spi-breakdown-header">
      <span style="font-size:13px;font-weight:700">Budget vs Actual — ${lt(H)}</span>
      <div style="display:flex;gap:14px;font-size:11px;color:var(--text-muted)">
        <span><span class="spi-legend spi-legend-budget"></span>Budget</span>
        <span><span class="spi-legend spi-legend-actual"></span>Actual</span>
      </div>
    </div>
    ${i}
  </div>`}function an(){let e=nn(tn()),t=rn(),n={warning:{bg:`#fffbeb`,border:`#fcd34d`,title:`#92400e`},good:{bg:`#ecfeff`,border:`#86efac`,title:`#166534`},alert:{bg:`#fef2f2`,border:`#fca5a5`,title:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,title:`#475569`}};return`<div class="spi-section">
    <div class="spi-section-title">📊 Spending Patterns — Last 6 Months</div>
    ${t}
    ${e.length===0?`<div class="spi-empty-state">Add actuals in Monthly Budget over a few months to unlock pattern detection.</div>`:`<div class="spi-patterns-grid">${e.map(e=>{let t=n[e.level]||n.info,r=Math.max(...(e.months||[]).map(e=>e.actual),1),i=(e.months||[]).map(e=>`<div class="spi-spark-bar" style="height:${Math.max(Math.round(e.actual/r*20),e.hasActual?2:0)}px;background:${e.hasActual?e.actual>e.budget*1.05?`#ef4444`:e.actual<e.budget*.95?`#10b981`:`#2563eb`:`#e2e8f0`}"></div>`).join(``);return`<div class="spi-pattern-card" style="background:${t.bg};border:1.5px solid ${t.border}">
          <div class="spi-pattern-icon">${e.icon}</div>
          <div>
            <div class="spi-pattern-title" style="color:${t.title}">${R(e.title)}</div>
            <div class="spi-pattern-body">${R(e.body)}</div>
            <div class="spi-sparkline">${i}</div>
          </div>
        </div>`}).join(``)}</div>`}
  </div>`}function on(){let e=V(H),t=K(e.income),n=K(e.expenses),r=t-n,i=t>0?r/t*100:0,a={};e.expenses.forEach(e=>{let t=e.category||`Other`;a[t]=(a[t]||0)+q(e)});let o=Object.entries(a).sort((e,t)=>t[1]-e[1]),s=dt(),c=s.reduce((e,t)=>e+K(V(t).expenses),0)/6;s.reduce((e,t)=>e+K(V(t).income),0)/6;let l=[];if(i>=20?l.push({level:`good`,icon:`🌟`,title:`Excellent savings rate`,body:`You're saving ${Math.round(i)}% of income — above the recommended 20%. Keep it up and consider putting the surplus toward your goals.`}):i>=10?l.push({level:`ok`,icon:`📈`,title:`Decent savings rate`,body:`You're saving ${Math.round(i)}% of income. Pushing to 20% would mean an extra ${W(t*.2-r)}/month going toward your future.`}):i>0?l.push({level:`warning`,icon:`⚠️`,title:`Low savings rate`,body:`Only ${Math.round(i)}% of income is being saved (${W(r)}/month). Look for the biggest discretionary expense you can reduce.`}):t>0&&l.push({level:`alert`,icon:`🚨`,title:`Spending exceeds income`,body:`You're spending ${W(Math.abs(r))} more than you earn each month. This requires urgent attention — identify what can be cut immediately.`}),c>0){let e=n-c,t=Math.round(Math.abs(e)/c*100);e>c*.1?l.push({level:`warning`,icon:`📊`,title:`Expenses above your average`,body:`This month's expenses are ${t}% above your 6-month average (${W(c)}). The extra ${W(e)} could be a one-off — worth reviewing.`}):e<-c*.08&&c>0&&l.push({level:`good`,icon:`📊`,title:`Expenses below your average`,body:`Nice — this month you spent ${t}% less than your 6-month average. That's ${W(Math.abs(e))} extra in your pocket.`})}if(o.length>0){let[e,t]=o[0],r=n>0?Math.round(t/n*100):0;r>45&&e!==`Mortgage / Rent`&&l.push({level:`warning`,icon:`💸`,title:`${e} is dominating your budget`,body:`${e} makes up ${r}% of your total expenses (${W(t)}/month). Reducing this by 20% would save ${W(t*.2)}/month.`})}let u=a[`Dining Out`]||0;u>0&&n>0&&u/n>.08&&l.push({level:`ok`,icon:`🍽️`,title:`Dining out is notable`,body:`You're spending ${W(u)}/month dining out. Cooking at home 2–3 more times a week could save ${W(u*.35)}/month.`}),e.income.length===1&&t>0&&l.push({level:`info`,icon:`💡`,title:`Single income source`,body:`You rely on one income stream. Even a small side income (freelance, rental, etc.) would significantly improve your financial resilience.`});let d=C.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0),f=C.buildContract.total-d;if(f>0&&r>0){let e=Math.round(f/r);l.push({level:`info`,icon:`🏗️`,title:`Build payments still ahead`,body:`You have ${W(f)} left in contract payments. At your current savings rate that represents ${e} month${e===1?``:`s`} of surplus — plan accordingly.`})}let p=(C.goals||[]).filter(e=>!e.achieved);return p.length>0&&r>0&&l.push({level:`good`,icon:`🎯`,title:`${p.length} active goal${p.length>1?`s`:``}`,body:`Your ${W(r)}/month surplus can work toward your goals. Review the Goals page to see progress and adjust contributions.`}),e.expenses.length===0&&l.push({level:`info`,icon:`📝`,title:`Add your expenses`,body:`Head to Monthly Budget and add your regular expenses to unlock personalised insights.`}),l}function sn(e,t,n,r){let i=Zt(e,t,n);t+n;let a=[`Mortgage / Rent`,`Insurance`,`Utilities`,`Groceries`,`Transport`,`Health`,`Childcare / Education`],o=[`Dining Out`,`Entertainment`,`Subscriptions`,`Clothing`,`Personal Care`],s=[`Savings / Investment`],c=Object.entries(r).filter(([e])=>a.includes(e)).reduce((e,[,t])=>e+t,0),l=Object.entries(r).filter(([e])=>o.includes(e)).reduce((e,[,t])=>e+t,0),u=Object.entries(r).filter(([e])=>s.includes(e)).reduce((e,[,t])=>e+t,0),d=e>0?Math.round(c/e*100):0,f=e>0?Math.round(l/e*100):0,p=e>0?Math.round(u/e*100):0;function m(e,t,n,r){let i=Math.min(t,100),a=t>n;return`
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
      </div>`}let h=i.filter(e=>r[e.category]!==void 0||e.category===`Savings / Investment`).map(e=>{let t=r[e.category]||0,n=Qt(t,e.min,e.max),i=n===`under`?`#3b82f6`:n===`within`?`#10b981`:`#ef4444`,a=n===`under`?`Below avg`:n===`within`?`On track`:`Above avg`,o=e.max>0?Math.min(t/(e.max*1.5)*100,100):0,s=e.max>0?Math.min(e.max/(e.max*1.5)*100,100):0;return`
      <tr>
        <td style="border-left:3px solid ${J.expense[e.category]||`#94a3b8`};font-weight:500">${e.category}</td>
        <td class="amount" style="font-weight:600">${t>0?W(t):`<span style="color:var(--text-muted)">—</span>`}</td>
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
                <div style="font-size:11px;color:var(--text-muted)">${W(e.amt)}</div>
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
    </div>`}function cn(){en();let e=on(),t=V(H),n=K(t.income),r=K(t.expenses),i=n-r,a=n>0?Math.round(i/n*100):0,o=Yt(),s=Xt(),c={};t.expenses.forEach(e=>{let t=e.category||`Other`;c[t]=(c[t]||0)+q(e)});let l=0;a>=20?l+=40:a>=10?l+=28:a>0&&(l+=14),t.income.length>1&&(l+=10),(C.goals||[]).some(e=>!e.achieved)&&(l+=15),C.buildContract.stages.filter(e=>e.paid).reduce((e,t)=>e+t.amount,0)>0&&(l+=10),r>0&&r<n&&(l+=25);let u=l>=70?`#10b981`:l>=45?`#f59e0b`:`#ef4444`,d=l>=70?`Great shape`:l>=45?`On track`:`Needs attention`;document.getElementById(`insights-content`).innerHTML=`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap">
      <button class="btn btn-sm" onclick="prevInsightsMonth()" style="font-size:16px;padding:2px 10px">‹</button>
      <span style="font-size:16px;font-weight:600;min-width:140px;text-align:center">${lt(H)}</span>
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
        <div class="card-sub">${W(Math.max(i,0))}/month saved</div>
      </div>
      <div class="card">
        <div class="card-label">Monthly Surplus</div>
        <div class="card-value ${i>=0?`green`:`red`}">${W(Math.abs(i))}</div>
        <div class="card-sub">${i>=0?`available`:`overspending`}</div>
      </div>
      <div class="card">
        <div class="card-label">Income / Expenses</div>
        <div class="card-value">${W(n)}</div>
        <div class="card-sub">vs ${W(r)} out</div>
      </div>
    </div>

    ${sn(n,o,s,c)}

    ${an()}

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;margin-top:4px">

      <!-- Smart insights -->
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">💡 Budget Health</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${ln(e)}
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
  `}function ln(e){let t={good:{bg:`#ecfeff`,border:`#86efac`,text:`#166534`},ok:{bg:`#eff6ff`,border:`#93c5fd`,text:`#1e40af`},warning:{bg:`#fffbeb`,border:`#fcd34d`,text:`#92400e`},alert:{bg:`#fef2f2`,border:`#fca5a5`,text:`#991b1b`},info:{bg:`#f8fafc`,border:`#cbd5e1`,text:`#475569`}};return e.map(e=>{let n=t[e.level]||t.info;return`
      <div style="background:${n.bg};border:1.5px solid ${n.border};border-radius:10px;padding:14px 16px;display:flex;gap:12px;align-items:flex-start">
        <span style="font-size:20px;flex-shrink:0;line-height:1.3">${e.icon}</span>
        <div>
          <div style="font-weight:700;font-size:13px;color:${n.text};margin-bottom:3px">${R(e.title)}</div>
          <div style="font-size:12px;color:var(--text);line-height:1.5">${R(e.body)}</div>
        </div>
      </div>`}).join(``)}var un=!1,dn=null;function fn(){un=!1,dn=null,me(C);let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`none`);let t=document.getElementById(`settings-save-btn`);if(t){let e=t.textContent;t.textContent=`Saved`,t.style.background=`#10b981`,setTimeout(()=>{t.textContent=e,t.style.background=``},1500)}Lr()}function pn(){dn&&Object.assign(C,dn),un=!1,dn=null;let e=document.getElementById(`settings-save-bar`);e&&(e.style.display=`none`),gn()}function mn(e){un&&(confirm(`You have unsaved changes in Settings. Save before leaving?`)?fn():pn())}function hn(){let e=localStorage.getItem(`toto_ai_key`);if(!e)return`<div id="api-key-summary"></div>`;let t=JSON.parse(localStorage.getItem(`toto_ai_key_meta`)||`{}`),n=t.addedAt?new Date(t.addedAt).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`}):`Unknown date`;return`
    <div id="api-key-summary" style="margin-top:14px;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;display:flex;align-items:center;gap:14px;max-width:480px">
      <div style="font-size:24px">🔑</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px">Active Key</div>
        <div style="font-size:13px;font-family:monospace;color:var(--text);word-break:break-all">${t.prefix?`${t.prefix}${`•`.repeat(20)}${t.suffix}`:`${e.slice(0,10)}${`•`.repeat(20)}${e.slice(-4)}`}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Added ${n} · Powers Toto chat, event cost estimation &amp; CSV import</div>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="removeApiKey()" style="color:var(--danger);flex-shrink:0">Remove</button>
    </div>`}function gn(){function e(e){return e.replace(/[^a-z0-9]/gi,`_`)}function t(t,n,r,i){let a=`${t}_${e(n)}`;return`
      <div class="color-row">
        <div class="color-dot" id="dot-${a}" style="background:${i}"></div>
        <span>${r}</span>
        <input type="color" value="${i}"
          oninput="document.getElementById('dot-${a}').style.background=this.value"
          onchange="updateColor('${t}','${n}',this.value)">
      </div>`}let n=localStorage.getItem(L),r=n?(n.length/1024).toFixed(1):0,i=n?`<span style="color:var(--success);font-weight:600">✓ Data found in localStorage (${r} KB)</span>`:`<span style="color:var(--danger);font-weight:600">⚠ No data in localStorage</span>`,a=C.activityLog||[];function o(e){let t=new Date(e);return t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})+` `+t.toLocaleTimeString(`en-AU`,{hour:`2-digit`,minute:`2-digit`})}function s(e){return e.photo?`<img src="${e.photo}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0" onerror="this.style.display='none'">`:`<div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${(e.name||`?`)[0].toUpperCase()}</div>`}let c={Added:`#10b981`,Edited:`#3b82f6`,Deleted:`#ef4444`,Updated:`#f59e0b`,Imported:`#8b5cf6`,Removed:`#ef4444`};function l(e){return c[e.split(` `)[0]]||`#94a3b8`}function u(e,t,n,r,i){let a=st.has(e);return`
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
      </div>`}let d={dog:`🐕`,cat:`🐈`,bird:`🐦`};new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`});let f=C.settings?.adultName||C.settings?.adults?.[0]?.name||`You`,p=C.settings?.email||``,m=`
    <div class="settings-profile" style="margin:0 0 8px">
      <div class="profile-avatar-lg">${f.charAt(0).toUpperCase()}</div>
      <div style="flex:1;min-width:0">
        <div class="profile-name">${R(f)}</div>
        ${p?`<div class="profile-email">${R(p)}</div>`:``}
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
        ${hn()}
      </div>`)+u(`prefs`,`Budget Preferences`,`Controls how month-to-month budget data is managed`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" id="pref-autofill" ${(C.settings||{}).autoFillMonths?`checked`:``}
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
          ${[0,4,5,6].map(e=>{let t=e===0?`Midnight`:e===4?`4 am`:e===5?`5 am`:`6 am`,n=(C.settings?.routineResetHour??0)===e;return`<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;font-weight:${n?`700`:`500`};color:${n?`var(--primary)`:`var(--text)`}">
              <input type="radio" name="reset-hour" value="${e}" ${n?`checked`:``} style="accent-color:var(--primary)"
                onchange="state.settings.routineResetHour=${e};_markSettingsDirty();saveData(state);renderSettings()">
              ${t}
            </label>`}).join(``)}
        </div>
      </div>`)+u(`meals-prefs`,`Meal Preferences`,`Calorie tracking and meal display options`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(C.settings||{}).showCalories?`checked`:``}
            onchange="updateSetting('showCalories', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Show calorie estimates on meals</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">AI estimates calories for each meal. Shows per-meal calories and daily totals in the meal planner and lunchbox grids.</p>
          </div>
        </label>
      </div>`)+u(`typea`,`Type A Mode`,C.settings?.typeAMode?`Active — daily missions and life score`:`Off — turn on for guided organisation`,`
      <div class="section-body">
        <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;user-select:none">
          <input type="checkbox" ${(C.settings||{}).typeAMode?`checked`:``}
            onchange="updateSetting('typeAMode', this.checked)"
            style="width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0">
          <div>
            <span style="font-size:13px;font-weight:600">Enable Type A Mode</span>
            <p style="font-size:12px;color:var(--text-muted);margin-top:3px">Adds a Life Score, daily missions, and guided organisation to your Today screen. Toto takes the lead and tells you what to do next.</p>
          </div>
        </label>
        ${C.settings?.typeAMode?`
        <div style="margin-top:16px;padding:14px;background:var(--surface2);border-radius:10px">
          <div style="font-size:13px;font-weight:700;margin-bottom:8px">Current Life Score</div>
          <div style="font-size:28px;font-weight:900;color:#0891b2">${yt().total}%</div>
          ${C.settings?.typeAStreak>0?`<div class="streak-badge" style="margin-top:8px">🔥 ${C.settings.typeAStreak} week streak</div>`:``}
        </div>`:``}
      </div>`)+u(`notif`,`Notification Style`,`Choose how Toto shows alerts on the Today screen`,`
      <div class="section-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px">
          ${[{val:`focus-timeline`,label:`Focus + Timeline`,desc:`One big card + chronological feed`},{val:`focus`,label:`Focus Card`,desc:`One urgent item at a time`},{val:`stack`,label:`Stack`,desc:`Card deck with count badge`},{val:`timeline`,label:`Timeline Only`,desc:`Chronological feed grouped by urgency`},{val:`banners`,label:`Banners`,desc:`Subtle alerts at the top`}].map(e=>`<label style="display:block;cursor:pointer;border:2px solid ${(C.settings?.notifStyle||`focus-timeline`)===e.val?`#0891b2`:`var(--border)`};border-radius:12px;padding:14px;background:${(C.settings?.notifStyle||`focus-timeline`)===e.val?`#ecfeff`:`var(--surface)`}">
            <input type="radio" name="notif-style" value="${e.val}" ${(C.settings?.notifStyle||`focus-timeline`)===e.val?`checked`:``} onchange="state.settings.notifStyle=this.value;_markSettingsDirty();renderSettings();renderToday()" style="display:none">
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
                    <span style="font-weight:600;font-size:13px">${R(e.name)}</span>
                    <span style="display:inline-block;padding:2px 10px;border-radius:99px;font-size:11px;font-weight:600;color:#fff;background:${l(e.action)}">${R(e.action)}</span>
                    ${e.detail?`<span style="font-size:13px;color:var(--text)">${R(e.detail)}</span>`:``}
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
      </div>`)+(()=>{let e=C.householdProfile.members||[],t=C.householdProfile.invites||[],n=C.householdProfile.authorizedUsers||[],r=d,i=e.map((r,i)=>{let a=r.role===`adult`,o=a&&i===0,s=r.emoji||(a?`🧑`:`🧒`),c=o?`Owner`:a?`Adult`:`Child`,l=o?`#fef9c3`:a?`#e0f2fe`:`#f0fdf4`,u=o?`#854d0e`:a?`#0369a1`:`#16a34a`,d=``;if(a){let a=e.slice(0,i).filter(e=>e.role===`adult`).length,s=!!r.pinHash,c=`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;margin-top:8px;background:${s?`#f0fdf4`:`var(--surface2)`};border-radius:8px;border:1px solid ${s?`#bbf7d0`:`var(--border)`}">
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
                  <div style="font-size:11px;color:#64748b">${R((e||{}).email||`Joined via invite`)}</div>
                </div>
              </div>`+c:a?`<div style="padding:10px 12px;background:#fef9c3;border-radius:8px;border:1px solid #fde68a">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:16px">⏳</span>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:#854d0e">Invite pending</div>
                    <div style="font-size:11px;color:#78350f">Expires ${new Date(a.expiresAt).toLocaleDateString()}${a.email?` · `+R(a.email):``}</div>
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
                    <div style="font-size:11px;color:var(--text-muted)">Send an invite link so ${R(r.name||`this person`)} can join</div>
                  </div>
                </div>
                <button onclick="event.stopPropagation();inviteMember(${i})" class="btn btn-primary btn-sm" style="width:100%">Invite to join →</button>
              </div>`+c}}else{let e=(C.kids?.profiles||[]).find(e=>e.name&&r.name&&e.name.toLowerCase()===r.name.toLowerCase()),t=!!e?.pinHash,n=!!(r.name&&r.name.trim());d=e&&rt&&rt(e.id)?`<div style="padding:10px 12px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca">
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
                <div style="font-size:11px;color:var(--text-muted)">${t?`PIN is active — tap to change it`:`Set a PIN so `+R(r.name)+` can log in`}</div>
              </div>
              <button onclick="event.stopPropagation();openPinSetup(${e.id})" style="padding:6px 10px;border:1px solid ${t?`#bbf7d0`:`var(--border)`};border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">${t?`Change`:`Set PIN`}</button>
            </div>`:`<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:16px">🔢</span>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:600;color:var(--text)">PIN login · Not set up</div>
                <div style="font-size:11px;color:var(--text-muted)">Save changes first, then set a PIN for ${R(r.name)}</div>
              </div>
              <button onclick="event.stopPropagation();_ensureKidProfileAndPin('${z(r.name)}')" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;background:var(--surface);font-size:11px;font-weight:600;color:var(--text);cursor:pointer">Set PIN</button>
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
                value="${z(r.name||``)}"
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
        ${(C.householdProfile.pets||[]).length===0?`<p style="color:var(--text-muted);font-size:13px">No pets added.</p>`:``}
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
          ${(C.householdProfile.pets||[]).map((e,t)=>`<div style="display:flex;align-items:center;gap:12px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 14px">
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
            value="${C.householdProfile.cars||0}" onchange="updateCars(parseInt(this.value)||0)">
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
          ${Lt().map(e=>`
            <span style="display:inline-flex;align-items:center;gap:6px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:5px 10px 5px 12px;font-size:13px">
              <span style="width:10px;height:10px;border-radius:50%;background:${J.expense[e]||`#94a3b8`};flex-shrink:0"></span>
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
          ${Rt().map(e=>`
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
        ${(C.categoryGroups||[]).map(e=>`
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
        ${(C.categoryGroups||[]).length===0?`<p style="color:var(--text-muted);font-size:13px">No groups yet.</p>`:``}
      </div>`,`<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openAddCategoryGroup()">+ Group</button>`)+u(`colours`,`Colours`,`Customise category and section colour accents`,`
      <div class="section-body">
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Expense Category Colours</div>
        <div class="color-grid" style="margin-bottom:24px">
          ${Lt().map(e=>t(`expense`,e,e,J.expense[e]||qt.expense[e]||`#94a3b8`)).join(``)}
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Income Colour</div>
        <div class="color-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,220px));margin-bottom:24px">
          ${t(`income`,`income`,`Income`,J.income)}
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">Build Cost Colours</div>
        <div class="color-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,220px))">
          ${t(`build`,`contract`,`Fixed Price Contract`,J.build.contract)}
          ${t(`build`,`extras`,`Outside Contract`,J.build.extras)}
          ${t(`build`,`furniture`,`Furniture`,J.build.furniture)}
          ${t(`build`,`appliances`,`Appliances`,J.build.appliances)}
        </div>
      </div>`);m+=u(`setup-checklist`,`✅ Setup Checklist`,`The setup progress card shown on your dashboard`,`<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Show on dashboard</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${C.setupProgressDismissed?`Currently hidden`:`Currently visible`}</div>
        </div>
        <button onclick="event.stopPropagation();state.setupProgressDismissed=${!C.setupProgressDismissed};saveData(state);_refreshSetupProgress();renderSettings()" class="btn btn-secondary btn-sm">
          ${C.setupProgressDismissed?`Show again`:`Hide`}
        </button>
      </div>
    </div>`);let h=Ee(),g=C.kids?.profiles||[],_=h?h===`adult`?`Adult — opens straight to the full app`:h===`shared`?`Shared — shows profile picker on open`:(g.find(e=>e.id===h)?.name||`Unknown`)+` — kid device`:`Not configured`;m+=u(`this-device`,`📱 This Device`,`Assigned to: ${_}`,`<div class="section-body">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
        <div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">Assigned to</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:2px">${R(_)}</div>
        </div>
        <button onclick="event.stopPropagation();showDeviceSetup()" class="btn btn-secondary btn-sm">Change</button>
      </div>
    </div>`),m+=`<div style="margin-top:24px;padding:16px;border:2px dashed #f59e0b;border-radius:12px;background:#fffbeb">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#92400e;margin-bottom:12px">⚠️ Dev Tools — Remove before release</div>
    <button onclick="showProfileSelector()" class="btn btn-secondary" style="width:100%">🔄 Open profile switcher (shared device)</button>
  </div>`,m+=`<div class="settings-save-bar" id="settings-save-bar" style="display:${un?`flex`:`none`}">
    <div class="unsaved-dot"></div>
    <div class="unsaved-text">Unsaved changes</div>
    <button class="btn" onclick="cancelSettingsChanges()">Cancel</button>
    <button class="btn btn-primary" id="settings-save-btn" onclick="saveSettingsChanges()">Save</button>
  </div>`,document.getElementById(`settings-content`).innerHTML=m}function _n(e){let t=C.categoryGroups||fe.categoryGroups;C.budget.actuals[H];let n=(C.colors||{}).expense||{},r=new Set(t.flatMap(e=>e.categories)),i=[...new Set(e.map(e=>e.category||`Other`))].filter(e=>!r.has(e)),a=i.length>0?[...t,{id:`ug`,name:`Ungrouped`,icon:`📋`,categories:i}]:t,o=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:4px;align-items:start">`;for(let t of a){let r=e.filter(e=>t.categories.includes(e.category||`Other`));if(r.length===0)continue;let i=r.reduce((e,t)=>e+q(t),0),a=r.reduce((e,t)=>e+U(t.id,H),0),s=i>0?Math.round(a/i*100):0,c=Math.min(100,s),l=s>=100?`var(--danger)`:s>=80?`var(--warning)`:`var(--success)`,u=a>0,d=a>i&&u,f=r[0]&&r[0].category||`Other`,p=n[f]||J.expense[f]||`#94a3b8`;o+=`
    <div style="background:var(--surface);border:1px solid ${d?`var(--danger)`:`var(--border)`};border-radius:10px;overflow:hidden">
      <!-- Always-visible title bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 14px;cursor:pointer;user-select:none;background:${p}22;border-bottom:3px solid ${p}" onclick="toggleGroupExpand('${t.id}')">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:20px">${t.icon}</span>
          <span style="font-weight:700;font-size:14px">${R(t.name)}</span>
          <span style="font-size:11px;color:var(--text-muted)">${r.length} item${r.length===1?``:`s`}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-weight:700;font-size:14px">${W(i)}<span style="font-size:11px;font-weight:400;color:var(--text-muted)">/mo</span></span>
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
            ${u?`${W(a)} spent · ${s}%${d?` — over budget!`:``}`:`No actuals entered yet`}
          </span>
          <span style="color:var(--text-muted)">${W(i)} budgeted</span>
        </div>
      </div>
      <!-- Collapsible items only -->
      <div id="grp-body-${t.id}" style="border-top:1px solid var(--border)">
        <div style="max-height:248px;overflow-y:auto">
        ${r.map(e=>{let t=q(e),r=U(e.id,H),i=t>0?Math.min(100,Math.round(r/t*100)):0,a=n[e.category||`Other`]||J.expense[e.category||`Other`]||`#94a3b8`,o=r>t&&r>0,s=o?`var(--danger)`:i>=80?`var(--warning)`:r>0?a:`var(--border)`;return r>0?`${W(r)}${W(t)}${i}`:`${W(t)}`,`
          <div class="expense-row" style="--row-color:${a};display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border)">
            <div style="width:4px;height:36px;border-radius:2px;background:${a};flex-shrink:0"></div>
            <div style="flex:1;min-width:0;cursor:pointer" onclick="event.stopPropagation();openEditExpense(${e.id})">
              <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${R(e.name)}</div>
              <div style="font-size:11px;color:var(--text-muted)">${e.category||`Other`}${e.vendor?` · ${R(e.vendor)}`:``} · ${It(e)}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-right:4px">
              <div style="font-size:13px;font-weight:600">${W(t)}/mo</div>
              ${r>0?`<div style="font-size:11px;font-weight:600;color:${o?`var(--danger)`:i>=80?`var(--warning)`:`var(--success)`}">${W(r)} actual${o?` ▲`:``}</div>`:`<div style="font-size:11px;color:var(--text-muted);cursor:pointer" onclick="event.stopPropagation();editActual(${e.id})">+ add actual</div>`}
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
    </div>`}return o+=`</div>`,o}function vn(e){let t=(e.expenses||[]).filter(e=>!e.skipped);if(!t.length)return{segments:[],total:0};let n={};t.forEach(e=>{let t=e.category||`Other`,r=g(Number(e.amount)||0,e.frequency);r>0&&(n[t]=(n[t]||0)+r)});let r=Object.entries(n).map(([e,t])=>({name:e,amount:t})).sort((e,t)=>t.amount-e.amount),i=r.reduce((e,t)=>e+t.amount,0);if(i===0)return{segments:[],total:0};let a=r.slice(0,6),o=r.slice(6),s=[`#15803d`,`#16a34a`,`#22c55e`,`#65a30d`,`#84cc16`,`#a3e635`,`#94A3B8`],c=a.map((e,t)=>({name:e.name,amount:e.amount,pct:e.amount/i*100,color:s[t]||`#94A3B8`}));if(o.length){let e=o.reduce((e,t)=>e+t.amount,0);c.push({name:`Other`,amount:e,pct:e/i*100,color:s[6]})}return{segments:c,total:i}}var yn={groceries:`GROC`,grocery:`GROC`,food:`FOOD`,rent:`RENT`,mortgage:`MORT`,fuel:`FUEL`,petrol:`FUEL`,transport:`TRSP`,dining:`DINE`,restaurants:`DINE`,"eating out":`DINE`,takeaway:`DINE`,utilities:`UTIL`,bills:`BILL`,electricity:`ELEC`,gas:`GAS`,water:`WATR`,internet:`NET`,phone:`PHNE`,subscriptions:`SUBS`,streaming:`SUBS`,insurance:`INSR`,health:`HLTH`,medical:`HLTH`,savings:`SAVE`,entertainment:`ENT`,travel:`TRVL`,holiday:`TRVL`,school:`EDU`,education:`EDU`,kids:`KIDS`,childcare:`KIDS`,pets:`PETS`,vehicle:`AUTO`,car:`AUTO`,household:`HSE`,clothing:`CLTH`,gifts:`GIFT`,charity:`GIVE`,other:`OTHR`};function bn(e){let t=(e||`other`).toLowerCase().trim();return yn[t]?yn[t]:(e||`OTHR`).replace(/[^A-Za-z]/g,``).toUpperCase().slice(0,4)||`OTHR`}function xn(e){let t=(e||``).toLowerCase();return t.includes(`groc`)||t.includes(`food`)||t.includes(`supermarket`)?`i-shopping-cart`:t.includes(`rent`)||t.includes(`mortgage`)||t.includes(`housing`)||t.includes(`home loan`)?`i-home`:t.includes(`petrol`)||t.includes(`fuel`)||t.includes(`transport`)||t.includes(`uber`)||t.includes(`parking`)||t.includes(`toll`)?`i-fuel`:t.includes(`dining`)||t.includes(`restaur`)||t.includes(`eat`)||t.includes(`takeaway`)?`i-utensils`:t.includes(`utilit`)||t.includes(`electric`)||t.includes(`gas`)||t.includes(`water`)||t.includes(`internet`)||t.includes(`phone`)||t.includes(`bill`)?`i-zap`:t.includes(`subscript`)||t.includes(`netflix`)||t.includes(`spotify`)||t.includes(`streaming`)?`i-receipt`:t.includes(`vehicle`)||t.includes(`car`)||t.includes(`rego`)||t.includes(`motor`)||t.includes(`auto`)?`i-car`:t.includes(`health`)||t.includes(`medic`)||t.includes(`pharm`)||t.includes(`doctor`)||t.includes(`dentist`)?`i-pill`:t.includes(`insur`)?`i-file-text`:t.includes(`school`)||t.includes(`education`)?`i-clipboard-check`:t.includes(`kid`)||t.includes(`child`)?`i-users`:t.includes(`pet`)?`i-paw`:t.includes(`saving`)||t.includes(`invest`)?`i-trophy`:t.includes(`travel`)||t.includes(`holiday`)?`i-palm-tree`:`i-receipt`}function Sn(){try{C.budget;let{income:e,expenses:t}=V(H),n=K(e),r=K(t),i=n-r,a=t.reduce((e,t)=>e+U(t.id,H),0),o=r-a,s=new Date(...H.split(`-`).map((e,t)=>t===1?e:+e),0).getDate(),c=new Date().getDate();Math.round(c/s*100);let l=r>0?Math.round(a/r*100):0,u=at(H),d=``;d+=`
    <div class="wallet-month-bar">
      <button class="wallet-month-btn" onclick="prevMonth()">&#8249;</button>
      <div class="wallet-month-label">${lt(H)}</div>
      <button class="wallet-month-btn" onclick="nextMonth()">&#8250;</button>
    </div>`,d+=`
    <div class="summary-hero" onclick="toggleBudgetDetail()">
      <div class="summary-hero-label">${i>=0?`Monthly surplus`:`Over budget`}</div>
      <div class="summary-hero-num">${W(Math.abs(i))}</div>
      <div class="summary-hero-sub">${W(n)} income · ${W(r)} expenses</div>
      <div class="summary-hero-expand" id="budget-expand-label">${Cn?`Hide details ▲`:`See breakdown ▼`}</div>
    </div>`,d+=`
    <div class="summary-mini-grid">
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:#10b981">${W(n)}</div>
        <div class="summary-mini-label">Income</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${W(r)}</div>
        <div class="summary-mini-label">Budgeted</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num" style="color:${a>r?`#ef4444`:`#18181b`}">${W(a)}</div>
        <div class="summary-mini-label">Actual spent</div>
      </div>
      <div class="summary-mini">
        <div class="summary-mini-num">${l}%</div>
        <div class="summary-mini-label">of budget used</div>
      </div>
    </div>`;let f=vn({income:e,expenses:t});if(f.segments.length){let e=f.segments.map(e=>`<div style="background:${e.color};flex:${e.pct.toFixed(2)}"></div>`).join(``),t=f.segments.map(e=>`<div class="alloc-row">
        <div class="tdot" style="background:${e.color}"><svg viewBox="0 0 24 24"><use href="#${xn(e.name)}"/></svg></div>
        <div class="body">
          <div class="ticker">${bn(e.name)}</div>
          <div class="name">${R(e.name)}</div>
        </div>
        <div>
          <div class="pct">${Math.round(e.pct)}%</div>
          <div class="amt">${W(e.amount)}</div>
        </div>
      </div>`).join(``);d+=`<div class="alloc-section" style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:${wn?`12px`:`0`}" onclick="_allocExpanded=!_allocExpanded;renderBudget()">
        <div class="alloc-title" style="margin-bottom:0">Budget Allocation</div>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)">${wn?`▲`:`▼`}</span>
      </div>
      <div class="alloc-bar" style="margin-bottom:${wn?`12px`:`0`}">${e}</div>
      ${wn?`<div class="alloc-list">${t}</div>`:``}
      <div onclick="event.stopPropagation();_budgetDetailOpen=true;renderBudget();document.getElementById('budget-detail')?.scrollIntoView({behavior:'smooth',block:'start'})" style="margin-top:10px;text-align:center;font-size:12px;color:var(--iris-2);font-weight:500;cursor:pointer;font-family:var(--sans)">Manage income &amp; expenses in Detailed Breakdown ↓</div>
    </div>`}d+=`<div class="alloc-section" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;margin-bottom:${Cn?`16px`:`0`}" onclick="toggleBudgetDetail()">
      <div class="alloc-title" style="margin-bottom:0">Detailed Breakdown</div>
      <div style="display:flex;align-items:center;gap:10px">
        <button onclick="event.stopPropagation();openCsvImport()" style="padding:5px 12px;border-radius:99px;background:var(--purple-soft);color:var(--purple);border:none;font-size:12px;font-weight:600;cursor:pointer">Import</button>
        <span style="font-size:11px;color:var(--muted);font-family:var(--mono)" id="budget-expand-chevron">${Cn?`▲`:`▼`}</span>
      </div>
    </div>
    <div class="detail-panel ${Cn?`expanded`:`collapsed`}" id="budget-detail" style="margin:0 -4px">`,it(H)||(d+=`<div style="display:flex;align-items:center;justify-content:space-between;background:var(--primary-light);border:1px solid #bfdbfe;border-radius:8px;padding:10px 16px;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div>
        <span style="font-size:13px;font-weight:600;color:var(--primary)">Using default budget</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="copyMonthFromPrevious('${H}')">
        Copy from ${lt(u)}
      </button>
    </div>`),d+=Ji(H,i),d+=qi(H),d+=`
    <div class="section" style="margin-bottom:20px">
      <div class="section-header">
        <div>
          <div class="section-title">Income</div>
          <div class="section-subtitle">${W(n)}/mo total</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openAddIncome()">+ Income</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Amount</th><th>Due</th><th>Repeats</th><th>Monthly</th><th></th></tr></thead>
          <tbody>
            ${e.length===0?`<tr><td colspan="6"><div class="empty"><div class="empty-icon">💵</div>Add your income sources</div></td></tr>`:e.map(e=>{let t=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():`<span style="color:var(--text-muted)">—</span>`,n=e.recurring===!1?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>`:``;return`<tr>
              <td style="font-weight:500;border-left:4px solid ${J.income}">${R(e.name)}${n}</td>
              <td class="amount">${ht(e.amount)}</td>
              <td>${t}</td>
              <td style="color:var(--text-muted)">${It(e)}</td>
              <td class="amount" style="color:var(--success)">${W(q(e))}/mo</td>
              <td class="actions">
                <button class="btn btn-ghost btn-sm" onclick="openEditIncome(${e.id})">✏️</button>
                <button class="btn btn-danger-ghost btn-sm" onclick="deleteIncome(${e.id})">🗑</button>
              </td>
            </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `;let p=[`all`,...Array.from(new Set(t.map(e=>e.category||`Other`))).sort()],m=Dn===`all`?t:t.filter(e=>(e.category||`Other`)===Dn),h=m.reduce((e,t)=>e+q(t),0),g=m.reduce((e,t)=>e+U(t.id,H),0),_=h-g,v=Dn!==`all`;d+=`
    <div class="section">
      <div class="section-header">
        <div>
          <div class="section-title">Expenses</div>
          <div class="section-subtitle">
            Budget: ${W(r)}/mo
            ${a>0?` · Actual: ${W(a)} · <span class="${o>=0?`var-under`:`var-over`}">${o>=0?`▼`:`▲`} ${W(Math.abs(o))}</span>`:``}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div style="display:flex;border:1px solid var(--border);border-radius:6px;overflow:hidden">
            <button onclick="setBudgetView('grouped')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;cursor:pointer;background:${ot===`grouped`?`var(--primary)`:`var(--surface)`};color:${ot===`grouped`?`#fff`:`var(--text-muted)`}">⊞ Groups</button>
            <button onclick="setBudgetView('table')" style="padding:5px 12px;font-size:12px;font-weight:600;border:none;border-left:1px solid var(--border);cursor:pointer;background:${ot===`table`?`var(--primary)`:`var(--surface)`};color:${ot===`table`?`#fff`:`var(--text-muted)`}">≡ Table</button>
          </div>
          ${ot===`table`?`<select class="form-select" style="width:auto;padding:6px 10px;font-size:12px" onchange="setExpenseFilter(this.value)">
            ${p.map(e=>`<option value="${e}" ${Dn===e?`selected`:``}>${e===`all`?`All categories`:e}</option>`).join(``)}
          </select>`:``}
          <button class="btn btn-primary btn-sm" onclick="openAddExpense()">+ Expense</button>
        </div>
      </div>

      <div style="padding:16px 20px">
      ${ot===`grouped`?_n(t):`
        <div class="table-wrap" style="margin:0 -20px">
          <table>
            <thead>
              <tr>
                ${On(`name`,`Item`)}
                ${On(`category`,`Category`)}
                ${On(`frequency`,`Frequency`)}
                ${On(`due`,`Due`)}
                ${On(`budget`,`Budget/mo`)}
                <th>Actual <span style="font-weight:400;text-transform:none;letter-spacing:0;font-size:10px;color:var(--text-muted)">(click to edit)</span></th>
                ${On(`variance`,`Variance`)}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${m.length===0?`<tr><td colspan="8"><div class="empty"><div class="empty-icon">📋</div>${t.length===0?`Add your household expenses`:`No expenses in this category`}</div></td></tr>`:[...m].sort((e,t)=>{if(!Y)return 0;let n,r;if(Y===`name`)n=e.name.toLowerCase(),r=t.name.toLowerCase();else if(Y===`category`)n=(e.category||`Other`).toLowerCase(),r=(t.category||`Other`).toLowerCase();else if(Y===`frequency`)n=It(e),r=It(t);else if(Y===`due`)n=e.dueDate||`￿`,r=t.dueDate||`￿`;else if(Y===`budget`)n=q(e),r=q(t);else if(Y===`actual`)n=U(e.id,H),r=U(t.id,H);else if(Y===`variance`)n=q(e)-U(e.id,H),r=q(t)-U(t.id,H);else return 0;return n<r?En===`asc`?-1:1:n>r?En===`asc`?1:-1:0}).map(e=>{let t=q(e),n=U(e.id,H),r=t-n,i=n>0,a;a=i?r>=0?`<span class="var-under">▼ ${W(r)}</span>`:`<span class="var-over">▲ ${W(Math.abs(r))}</span>`:`<span class="var-none">—</span>`;let o=e.dueDate?(()=>{let[t,n,r]=e.dueDate.split(`-`);return`${r}/${n}/${t}`})():`<span style="color:var(--text-muted)">—</span>`,s=J.expense[e.category||`Other`]||`#94a3b8`,c=e.recurring===!1?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;margin-left:6px;white-space:nowrap">one-time</span>`:``;return`<tr>
                        <td style="font-weight:500;border-left:4px solid ${s}">${R(e.name)}${c}${e.vendor?`<br><span style="font-size:11px;font-weight:400;color:var(--text-muted)">${R(e.vendor)}</span>`:``}</td>
                        <td><span style="display:inline-block;padding:2px 10px;border-radius:99px;background:${s};color:#fff;font-size:11px;font-weight:600;white-space:nowrap">${e.category||`Other`}</span></td>
                        <td style="color:var(--text-muted)">${It(e)}</td>
                        <td>${o}</td>
                        <td class="amount">${W(t)}</td>
                        <td class="actual-cell amount" id="actual-${e.id}" onclick="editActual(${e.id})">${i?W(n):`<span style="color:var(--text-muted);font-size:12px">+ add</span>`}</td>
                        <td>${a}</td>
                        <td class="actions">
                          <button class="btn btn-ghost btn-sm" onclick="openEditExpense(${e.id})">✏️</button>
                          <button class="btn btn-danger-ghost btn-sm" onclick="deleteExpense(${e.id})">🗑</button>
                        </td>
                      </tr>`}).join(``)}
            </tbody>
            ${m.length>0?`
            <tfoot>
              <tr style="background:var(--surface2);border-top:2px solid var(--border)">
                <td colspan="4" style="padding:11px 16px;font-size:13px;color:var(--text-muted);font-style:italic">Total ${v?Dn:`all categories`}</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${W(h)}/mo</td>
                <td class="amount" style="padding:11px 16px;font-weight:700">${g>0?W(g):`—`}</td>
                <td style="padding:11px 16px;font-weight:700">${g>0?`<span class="${_>=0?`var-under`:`var-over`}">${_>=0?`▼`:`▲`} ${W(Math.abs(_))}</span>`:`—`}</td>
                <td></td>
              </tr>
            </tfoot>`:``}
          </table>
        </div>`}
      </div>
    </div>
  `,d+=`</div></div>`,document.getElementById(`budget-content`).innerHTML=d}catch(e){console.error(`renderBudget error:`,e);let t=document.getElementById(`budget-content`);t&&(t.innerHTML=`<div style="padding:24px;color:var(--alert);font-family:var(--mono);font-size:13px">Render error: ${R(e.message)}<br><small>${R(e.stack||``)}</small></div>`)}}var Cn=!1,wn=!1;function Tn(){I=null,window._actualEditorRefresh=null,window._csvSuggestions=null,window._csvSuggestNames=null,document.getElementById(`modal-body`).innerHTML=``,document.getElementById(`modal-footer`).innerHTML=``,document.getElementById(`modal-overlay`).classList.add(`hidden`)}document.getElementById(`modal-overlay`).addEventListener(`click`,e=>{e.target===document.getElementById(`modal-overlay`)&&Tn()});var Y=null,En=`asc`,Dn=`all`;function On(e,t,n=``){let r=Y===e;return`<th class="sortable${r?` sort-active`:``}" onclick="sortExpenses('${e}')">${t}${n}<span class="sort-icon">${r?En===`asc`?`↑`:`↓`:`↕`}</span></th>`}var kn=`plan`,An=0,jn=[`Produce`,`Meat & Seafood`,`Dairy & Eggs`,`Pantry`,`Bakery`,`Frozen`,`Household`,`Other`],Mn={Produce:`🥦`,"Meat & Seafood":`🥩`,"Dairy & Eggs":`🥛`,Pantry:`🥫`,Bakery:`🍞`,Frozen:`🧊`,Household:`🏠`,Other:`🛒`},Nn={food:{label:`Food`,emoji:`🛒`,color:`#dcfce7`,text:`#166534`,aisles:!0,priceEst:!0},clothes:{label:`Clothes`,emoji:`👕`,color:`#dbeafe`,text:`#1e40af`,aisles:!1,priceEst:!1},wishlist:{label:`Wishlist`,emoji:`🎁`,color:`#fce7f3`,text:`#9d174d`,aisles:!1,priceEst:!1},home:{label:`Home & Garden`,emoji:`🛠`,color:`#fef3c7`,text:`#92400e`,aisles:!0,priceEst:!1},pharmacy:{label:`Pharmacy`,emoji:`💊`,color:`#ede9fe`,text:`#5b21b6`,aisles:!0,priceEst:!1}},Pn={food:[{key:`produce`,emoji:`🥦`,label:`Produce`},{key:`dairy`,emoji:`🥛`,label:`Dairy & Eggs`},{key:`bakery`,emoji:`🍞`,label:`Bakery`},{key:`meat`,emoji:`🥩`,label:`Meat & Seafood`},{key:`pantry`,emoji:`🥫`,label:`Pantry`},{key:`frozen`,emoji:`🧊`,label:`Frozen`},{key:`health`,emoji:`🧴`,label:`Health & Beauty`},{key:`bathroom`,emoji:`🚿`,label:`Bathroom`},{key:`cleaning`,emoji:`🧹`,label:`Cleaning`},{key:`drinks`,emoji:`🍷`,label:`Drinks & Alcohol`},{key:`other`,emoji:`🛒`,label:`Uncategorised`}],home:[{key:`tools`,emoji:`🔨`,label:`Tools & Hardware`},{key:`garden`,emoji:`🌱`,label:`Garden`},{key:`cleaning`,emoji:`🧹`,label:`Cleaning`},{key:`other`,emoji:`🛒`,label:`Other`}],pharmacy:[{key:`medicine`,emoji:`💊`,label:`Medicine`},{key:`skincare`,emoji:`🧴`,label:`Skincare`},{key:`vitamins`,emoji:`💪`,label:`Vitamins`},{key:`other`,emoji:`🛒`,label:`Other`}]},Fn={milk:`dairy`,cheese:`dairy`,butter:`dairy`,eggs:`dairy`,yoghurt:`dairy`,cream:`dairy`,bread:`bakery`,rolls:`bakery`,muffin:`bakery`,croissant:`bakery`,baguette:`bakery`,apple:`produce`,banana:`produce`,orange:`produce`,strawberry:`produce`,tomato:`produce`,lettuce:`produce`,spinach:`produce`,carrot:`produce`,broccoli:`produce`,potato:`produce`,onion:`produce`,garlic:`produce`,cucumber:`produce`,capsicum:`produce`,avocado:`produce`,lemon:`produce`,lime:`produce`,grapes:`produce`,mango:`produce`,pineapple:`produce`,watermelon:`produce`,chicken:`meat`,beef:`meat`,mince:`meat`,steak:`meat`,pork:`meat`,lamb:`meat`,salmon:`meat`,fish:`meat`,tuna:`meat`,prawn:`meat`,sausage:`meat`,bacon:`meat`,rice:`pantry`,pasta:`pantry`,flour:`pantry`,sugar:`pantry`,oil:`pantry`,vinegar:`pantry`,salt:`pantry`,pepper:`pantry`,sauce:`pantry`,stock:`pantry`,beans:`pantry`,lentils:`pantry`,chickpeas:`pantry`,cereal:`pantry`,oats:`pantry`,honey:`pantry`,jam:`pantry`,peanut:`pantry`,coffee:`pantry`,tea:`pantry`,biscuit:`pantry`,cracker:`pantry`,chocolate:`pantry`,chips:`pantry`,nuts:`pantry`,icecream:`frozen`,peas:`frozen`,corn:`frozen`,pizza:`frozen`,shampoo:`health`,conditioner:`health`,deodorant:`health`,sunscreen:`health`,moisturiser:`health`,makeup:`health`,lipstick:`health`,mascara:`health`,toothpaste:`bathroom`,toothbrush:`bathroom`,soap:`bathroom`,toilet:`bathroom`,razors:`bathroom`,tampons:`bathroom`,pads:`bathroom`,detergent:`cleaning`,bleach:`cleaning`,sponge:`cleaning`,dishwashing:`cleaning`,bins:`cleaning`,mop:`cleaning`,water:`drinks`,juice:`drinks`,beer:`drinks`,wine:`drinks`,spirits:`drinks`,softdrink:`drinks`,soda:`drinks`,kombucha:`drinks`};function In(e){for(var t=e.toLowerCase(),n=Object.keys(Fn),r=0;r<n.length;r++)if(t.indexOf(n[r])!==-1)return Fn[n[r]];return`other`}var Ln=`food`,Rn=`selector`;function zn(e){let t=new Date,n=t.getDay()===0?-6:1-t.getDay(),r=new Date(t);return r.setDate(t.getDate()+n+(e||0)*7),r.toISOString().slice(0,10)}function Bn(e){let t=new Date(e+`T00:00:00`);return Array.from({length:7},(e,n)=>{let r=new Date(t);return r.setDate(t.getDate()+n),r})}function Vn(){kn===`shopping`?Un():Hn()}function Hn(){let e=zn(An),t=Bn(e),n=C.meals.plan[e]||{},r=new Date().toISOString().slice(0,10),i=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],a=[{key:`b`,label:`Breakfast`},{key:`l`,label:`Lunch`},{key:`d`,label:`Dinner`}],o=t[0].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),s=t[6].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),c=[];for(let e=0;e<7;e++){let t=n[e]||{};[`b`,`l`,`d`].forEach(e=>{t[e]&&c.push(t[e])})}let l=``;a.forEach(i=>{l+=`<div class="meal-grid-label">${i.label}</div>`,t.forEach((t,a)=>{let o=(n[a]||{})[i.key]||``,s=t.toISOString().slice(0,10)===r;l+=`<div class="meal-cell${s?` today`:``}" onclick="openMealEdit('${e}',${a},'${i.key}')">
        ${o?`<span class="meal-cell-text">${o}${C.settings?.showCalories&&(n[a]||{})[`cal_`+i.key]?`<br><span style="font-size:9px;color:var(--text-muted);font-weight:600">${n[a][`cal_`+i.key]} cal</span>`:``}</span>`:`<span class="meal-cell-plus">+</span>`}
      </div>`})}),document.getElementById(`meals-content`).innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:8px">
        <button class="btn btn-sm" onclick="_mealWeekOffset--;renderMeals()" style="font-size:16px;padding:2px 10px">‹</button>
        <span style="font-size:15px;font-weight:600;min-width:150px;text-align:center">
          ${An===0?`This Week`:An===1?`Next Week`:An===-1?`Last Week`:`${o} – ${s}`}
        </span>
        <button class="btn btn-sm" onclick="_mealWeekOffset++;renderMeals()" style="font-size:16px;padding:2px 10px">›</button>
        ${An===0?``:`<button class="btn btn-sm" onclick="_mealWeekOffset=0;renderMeals()">This week</button>`}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${c.length>0?`<button class="btn btn-sm" id="gen-shop-btn" onclick="generateShoppingList('${e}')">🛒 Generate shopping list</button>`:``}
        <button class="btn btn-primary btn-sm" onclick="_listsActiveType='food';_listsView='list';activateTab('lists')">Shopping list →</button>
      </div>
    </div>

    <div style="overflow-x:auto;margin-bottom:8px">
      <div class="meal-grid" style="min-width:560px">
        <div class="meal-grid-corner"></div>
        ${t.map((e,t)=>`<div class="meal-grid-header${e.toISOString().slice(0,10)===r?` today`:``}"><div>${i[t]}</div><div style="font-size:10px;opacity:0.7">${e.getDate()}/${e.getMonth()+1}</div></div>`).join(``)}
        ${l}
        ${C.settings?.showCalories?`<div class="meal-grid-label" style="font-weight:800;font-size:9px">Total</div>`+t.map((e,t)=>{let r=n[t]||{},i=(r.cal_b||0)+(r.cal_l||0)+(r.cal_d||0);return`<div style="background:var(--surface);padding:6px;text-align:center;font-size:11px;font-weight:700;color:${i>0?i>2500?`var(--danger)`:i>2e3?`var(--warning)`:`var(--text)`:`var(--border)`}">${i>0?i.toLocaleString():`—`}</div>`}).join(``):``}
      </div>
    </div>
    <p style="font-size:12px;color:var(--text-muted);margin-top:6px">Tap any cell to add or change a meal.</p>`}function Un(){let e=C.meals.shopping||[],t=e.filter(e=>e.checked).length,n=e.length-t,r={};jn.forEach(e=>r[e]=[]),e.forEach(e=>{r[jn.includes(e.cat)?e.cat:`Other`].push(e)});let i=``;jn.forEach(e=>{let t=r[e];t.length&&(i+=`
      <div style="margin-bottom:18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:4px">
          ${Mn[e]} ${e}
        </div>
        ${t.map(e=>`
          <div class="shop-row">
            <input type="checkbox" ${e.checked?`checked`:``} onchange="toggleShopItem(${e.id},this.checked)"
              style="width:18px;height:18px;cursor:pointer;accent-color:#0891b2;flex-shrink:0">
            <span style="flex:1;font-size:14px;${e.checked?`text-decoration:line-through;color:var(--text-muted)`:``}">${R(e.name)}</span>
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
            ${jn.map(e=>`<option value="${e}">${Mn[e]} ${e}</option>`).join(``)}
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
    </div>`}function Wn(){var e=document.getElementById(`lists-content`);e&&(C.lists||re(C),Rn===`selector`?Gn(e):Kn(e,Ln))}function Gn(e){var t=`<div class="ls-screen">`;t+=`<div style="font-size:22px;font-weight:800;color:var(--ink,#1a1814);margin-bottom:4px">My Lists</div>`,t+=`<div style="font-size:13px;color:var(--muted,#8c8880);margin-bottom:20px">Tap a list to open it</div>`,t+=`<div class="ls-type-grid">`,Object.keys(Nn).forEach(function(e){var n=Nn[e],r=(C.lists&&C.lists[e]?C.lists[e]:{items:[]}).items.filter(function(e){return e.state===`active`}).length;t+=`<div class="ls-type-card" onclick="_listsActiveType='`+e+`';_listsView='list';renderLists()">`,t+=`<div class="ls-type-icon" style="background:`+n.color+`;color:`+n.text+`">`+n.emoji+`</div>`,t+=`<div class="ls-type-label">`+R(n.label)+`</div>`,t+=`<div class="ls-type-count">`+(r>0?r+` item`+(r===1?``:`s`):`Empty`)+`</div>`,t+=`</div>`}),t+=`</div>`,t+=`</div>`,e.innerHTML=t}function Kn(e,t){var n=Nn[t],r=C.lists&&C.lists[t]?C.lists[t]:{items:[],weeklyBudget:0,favourites:[]},i=r.items||[],a=i.filter(function(e){return e.state===`active`}),o=i.filter(function(e){return e.state===`got_it`}),s=i.filter(function(e){return e.state===`not_found`}),c=`<div class="ls-screen">`;if(c+=`<button class="ls-back-btn" onclick="_listsView='selector';renderLists()">← Lists</button>`,c+=`<div class="ls-header">`,c+=`<div style="font-size:22px;margin-right:6px">`+n.emoji+`</div>`,c+=`<div class="ls-header-title">`+R(n.label)+`</div>`,c+=`<div class="ls-sync-dot"></div>`,c+=`<div class="ls-header-count">`+a.length+` to get</div>`,c+=`</div>`,r.weeklyBudget>0){var l=i.filter(function(e){return e.state===`got_it`&&e.manualPrice}).reduce(function(e,t){return e+(t.manualPrice||0)},0),u=Math.min(100,Math.round(l/r.weeklyBudget*100)),d=u>100?`over`:u>80?`warn`:``;c+=`<div class="ls-budget-bar-wrap">`,c+=`<div class="ls-budget-bar-meta"><span>$`+l.toFixed(0)+` spent</span><span>$`+r.weeklyBudget+` budget</span></div>`,c+=`<div class="ls-budget-bar"><div class="ls-budget-fill `+d+`" style="width:`+u+`%"></div></div>`,c+=`</div>`}var f=(r.favourites||[]).filter(function(e){return!a.find(function(t){return t.name.toLowerCase()===e.name.toLowerCase()})}).sort(function(e,t){return(t.addedCount||0)-(e.addedCount||0)}).slice(0,5);if(f.length>0&&(c+=`<div class="ls-fav-chips">`,f.forEach(function(e){c+=`<button class="ls-fav-chip" onclick="_listsAddItem('`+t+`','`+R(e.name).replace(/'/g,`\\'`)+`',1,'units','`+(t===`food`?In(e.name):`other`)+`','',null);renderLists()">+ `+R(e.name)+`</button>`}),c+=`</div>`),(r.favourites||[]).length>0&&(c+=`<button class="ls-usual-btn" onclick="_listsAddUsual('`+t+`')">The usual →</button>`),c+=`<div class="ls-quick-add">`,c+=`<div class="ls-quick-add-row">`,c+=`<input class="ls-quick-input" id="ls-quick-input" type="text" placeholder="Add item…" autocomplete="off" oninput="_listsUpdateParsePreview()" onkeydown="if(event.key==='Enter')_listsQuickAdd('`+t+`')">`,c+=`<button class="ls-quick-add-btn" onclick="_listsQuickAdd('`+t+`')">Add</button>`,c+=`<button class="ls-quick-add-btn" style="background:var(--purple-soft);color:var(--iris-1);min-width:36px;padding:0 10px" onclick="_listsOpenAddForm('`+t+`')">⋯</button>`,c+=`</div>`,c+=`<div class="ls-parse-preview" id="ls-parse-preview"></div>`,c+=`</div>`,a.length>0)if(n.aisles){var p=Pn[t]||[{key:`other`,emoji:`🛒`,label:`Other`}],m={};p.forEach(function(e){m[e.key]=[]}),a.forEach(function(e){var t=e.aisle&&m[e.aisle]!==void 0?e.aisle:`other`;m[t]||(m[t]=[]),m[t].push(e)}),p.forEach(function(e){!m[e.key]||!m[e.key].length||(c+=`<div class="ls-aisle-header">`+e.emoji+` `+R(e.label)+`</div>`,m[e.key].forEach(function(e){c+=qn(t,e)}))})}else a.forEach(function(e){c+=qn(t,e)});else c+=`<div style="text-align:center;padding:32px 0;color:var(--muted,#8c8880);font-size:14px">Nothing to get yet — add something above</div>`;o.length>0&&(c+=`<div class="ls-aisle-header">🛒 In the trolley</div>`,o.forEach(function(e){c+=qn(t,e)})),s.length>0&&(c+=`<div class="ls-aisle-header">🚫 Not found</div>`,s.forEach(function(e){c+=qn(t,e)})),c+=`<div class="ls-footer-row">`,o.length>0&&(c+=`<button class="ls-footer-btn" onclick="_listsClearTrolley('`+t+`')">Clear trolley (`+o.length+`)</button>`),a.length===0&&i.length>0&&(c+=`<button class="ls-footer-btn" style="background:var(--iris-2,#6366f1);color:#fff;border-color:var(--iris-2,#6366f1)" onclick="_listsArchive('`+t+`')">Archive this shop</button>`),c+=`</div>`,c+=`</div>`,e.innerHTML=c}function qn(e,t){var n=t.state===`got_it`?`got-it`:t.state===`not_found`?`not-found`:``,r=t.state===`got_it`?`✓`:``,i=t.state===`active`?`got_it`:`active`,a=t.quantity&&t.unit&&t.unit!==`units`?t.quantity+` `+t.unit:t.quantity&&t.quantity!==1?`x`+t.quantity:``;R(t.id);var o=R(t.name),s=`<div class="ls-item `+n+`">`;return s+=`<button class="ls-item-check" onclick="_listsSetState('`+e+`','`+t.id+`','`+i+`')">`+r+`</button>`,s+=`<div class="ls-item-body">`,s+=`<div class="ls-item-name">`+o+`</div>`,a&&(s+=`<div class="ls-item-qty">`+R(a)+`</div>`),t.notes&&(s+=`<div class="ls-item-notes">`+R(t.notes)+`</div>`),s+=`</div>`,t.state===`active`?s+=`<button class="ls-item-notfound-btn" title="Not found" onclick="_listsSetState('`+e+`','`+t.id+`','not_found')">🚫</button>`:t.state===`not_found`&&(s+=`<button class="ls-item-notfound-btn" title="Mark active again" onclick="_listsSetState('`+e+`','`+t.id+`','active')">↩</button>`),s+=`<button class="ls-item-notfound-btn" title="Edit" onclick="_listsOpenAddForm('`+e+`','`+t.id+`')">✏️</button>`,s+=`<button class="ls-item-del" onclick="_listsDeleteItem('`+e+`','`+t.id+`')">×</button>`,s+=`</div>`,s}function Jn(){let e=C.vehicles||[];if(e.length===0){document.getElementById(`vehicles-content`).innerHTML=`
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
  </div>`;e.forEach(e=>{let n=new Date,r=[];if(e.regoExpiry){let t=Math.ceil((new Date(e.regoExpiry)-n)/864e5);t<0?r.push({cls:`red`,text:`Rego expired ${Math.abs(t)}d ago`}):t<=30?r.push({cls:`amber`,text:`Rego expires in ${t}d`}):r.push({cls:`green`,text:`Rego: ${new Date(e.regoExpiry).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}`})}if(e.insurance&&e.insurance.renewalDate){let t=Math.ceil((new Date(e.insurance.renewalDate)-n)/864e5);t<0?r.push({cls:`red`,text:`Insurance expired ${Math.abs(t)}d ago`}):t<=30?r.push({cls:`amber`,text:`Insurance renews in ${t}d`}):r.push({cls:`green`,text:`Insured until ${new Date(e.insurance.renewalDate).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`})}if(e.serviceInterval&&e.odometer&&e.services&&e.services.length>0){let t=e.services.sort((e,t)=>t.odometer-e.odometer)[0],n=e.odometer.reading-t.odometer,i=e.serviceInterval-n;i<=0?r.push({cls:`red`,text:`Service overdue by ${Math.abs(i).toLocaleString()}km`}):i<=2e3?r.push({cls:`amber`,text:`Service due in ${i.toLocaleString()}km`}):r.push({cls:`green`,text:`Next service in ${i.toLocaleString()}km`})}let i=r.map(e=>`<span class="veh-badge ${e.cls}">${e.text}</span>`).join(``),a=(e.services||[]).reduce((e,t)=>e+(t.cost||0),0),o=new Date;o.setFullYear(o.getFullYear()-1);let s=(e.services||[]).filter(e=>e.date&&new Date(e.date)>=o).reduce((e,t)=>e+(t.cost||0),0),c=(C.bills||[]).find(t=>t._vehicleRef===`vehicle_${e.id}_rego`),l=(C.bills||[]).find(t=>t._vehicleRef===`vehicle_${e.id}_insurance`),u=s+(c&&parseFloat(c.amount)||0)+(l&&parseFloat(l.amount)||0),d=Math.round(u/12);t+=`
      <div class="veh-card">
        <div class="veh-card-header">
          <div class="veh-icon">${e.fuel===`ev`?`⚡`:`🚗`}</div>
          <div style="flex:1;min-width:0">
            <div class="veh-name">${R(e.name)}</div>
            ${e.plate?`<span class="veh-plate">${R(e.plate)}${e.state?` · `+e.state:``}</span>`:``}
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
          ${e.insurance&&e.insurance.provider?`<div class="veh-stat"><div class="veh-stat-label">Insurer</div><div class="veh-stat-value">${R(e.insurance.provider)}</div></div>`:``}
          <div class="veh-stat"><div class="veh-stat-label">Services (all time)</div><div class="veh-stat-value">${W(a)}</div></div>
          ${u>0?`<div class="veh-stat"><div class="veh-stat-label">Annual Cost</div><div class="veh-stat-value">${W(u)}</div></div>`:``}
          ${d>0?`<div class="veh-stat"><div class="veh-stat-label">Monthly Cost</div><div class="veh-stat-value">${W(d)}/mo</div></div>`:``}
        </div>

        ${c||l?`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
          ${c?`<span style="font-size:11px;color:#0369a1;cursor:pointer;font-weight:600" onclick="activateTab('bills')">Rego bill: ${W(parseFloat(c.amount)||0)} →</span>`:``}
          ${l?`<span style="font-size:11px;color:#0369a1;cursor:pointer;font-weight:600" onclick="activateTab('bills')">Insurance bill: ${W(parseFloat(l.amount)||0)} →</span>`:``}
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
                    <td style="font-weight:500">${R(t.type||`—`)}</td>
                    <td>${t.odometer?t.odometer.toLocaleString()+` km`:`—`}</td>
                    <td style="color:var(--text-muted)">${R(t.provider||`—`)}</td>
                    <td class="amount">${t.cost?W(t.cost):`—`}</td>
                    <td><button class="btn btn-sm" style="color:var(--danger);font-size:11px" onclick="deleteService(${e.id},${t.id})">×</button></td>
                  </tr>`).join(``)}
                </tbody>
              </table></div>`}
        </div>
      </div>`}),document.getElementById(`vehicles-content`).innerHTML=t}var Yn=[{key:`Insurance`,icon:`🛡️`,bg:`#eff6ff`},{key:`Identity`,icon:`🪪`,bg:`#ecfeff`},{key:`Warranty`,icon:`📦`,bg:`#fffbeb`},{key:`Financial`,icon:`🏦`,bg:`#faf5ff`},{key:`Medical`,icon:`🏥`,bg:`#fef2f2`},{key:`Property`,icon:`🏠`,bg:`#f0f9ff`},{key:`Vehicle`,icon:`🚗`,bg:`#f5f3ff`},{key:`Other`,icon:`📄`,bg:`#f8fafc`}],Xn=``;function Zn(){let e=C.documents||[],t=new Date;Xn.toLowerCase();let n=e,r=e.filter(e=>{if(!e.expiryDate)return!1;let n=Math.ceil((new Date(e.expiryDate)-t)/864e5);return n>=0&&n<=30}).length,i=e.filter(e=>e.expiryDate?new Date(e.expiryDate)<t:!1).length;t.toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`});let a=C.settings?.householdName||`Household`,o=(C.kids?.allowances?.length||0)+2,s=i===0&&r===0,c=`
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
    <input class="doc-search" type="text" maxlength="200" placeholder="Search documents…" value="${Xn}" oninput="_docSearch=this.value;renderDocuments()" style="margin:0 20px;width:calc(100% - 40px)">`,u={};n.forEach(e=>{let t=e.category||`Other`;u[t]||(u[t]=[]),u[t].push(e)}),Yn.forEach(e=>{let n=u[e.key];!n||!n.length||(l+=`<div class="doc-cat-group">
      <div class="doc-cat-header">${e.icon} ${e.key} <span style="font-weight:400;text-transform:none">(${n.length})</span></div>`,n.sort((e,t)=>e.expiryDate&&t.expiryDate?new Date(e.expiryDate)-new Date(t.expiryDate):e.expiryDate?-1:1).forEach(n=>{let r=``;if(n.expiryDate){let e=Math.ceil((new Date(n.expiryDate)-t)/864e5);r=e<0?`<span class="veh-badge red" style="font-size:11px">Expired ${Math.abs(e)}d ago</span>`:e<=30?`<span class="veh-badge amber" style="font-size:11px">Expires in ${e}d</span>`:`<span class="veh-badge green" style="font-size:11px">${new Date(n.expiryDate).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}</span>`}let i=[n.provider?R(n.provider):``,n.reference?R(n.reference):``,n.storedAt?`📍 ${R(n.storedAt)}`:``].filter(Boolean);l+=`
        <div class="doc-card" onclick="openDocForm(${n.id})">
          <div class="doc-cat-icon" style="background:${e.bg}">${e.icon}</div>
          <div class="doc-card-body">
            <div class="doc-card-name">${R(n.name)}</div>
            ${i.length?`<div class="doc-card-sub">${i.join(` · `)}</div>`:``}
          </div>
          ${r}
        </div>`}),l+=`</div>`)}),n.length,document.getElementById(`documents-content`).innerHTML=l}var Qn=[{key:`HVAC`,icon:`❄️`},{key:`Plumbing`,icon:`🚿`},{key:`Electrical`,icon:`💡`},{key:`Garden`,icon:`🌿`},{key:`Cleaning`,icon:`🧹`},{key:`Safety`,icon:`🔥`},{key:`Appliance`,icon:`🔧`},{key:`Exterior`,icon:`🏠`},{key:`Other`,icon:`📋`}],$n=[{name:`Gutters Cleaned`,category:`Exterior`,intervalNum:6,intervalUnit:`months`,icon:`🏠`},{name:`Smoke Alarm Batteries`,category:`Safety`,intervalNum:12,intervalUnit:`months`,icon:`🔥`},{name:`Pest Control`,category:`Exterior`,intervalNum:12,intervalUnit:`months`,icon:`🐛`},{name:`AC Filter Cleaned`,category:`HVAC`,intervalNum:3,intervalUnit:`months`,icon:`❄️`},{name:`Hot Water System Flush`,category:`Plumbing`,intervalNum:12,intervalUnit:`months`,icon:`🚿`},{name:`Lawn Mowing`,category:`Garden`,intervalNum:2,intervalUnit:`weeks`,icon:`🌿`},{name:`Oven Clean`,category:`Cleaning`,intervalNum:6,intervalUnit:`months`,icon:`🧹`},{name:`Pool Maintenance`,category:`Exterior`,intervalNum:1,intervalUnit:`months`,icon:`🏊`},{name:`Drains / Septic`,category:`Plumbing`,intervalNum:2,intervalUnit:`years`,icon:`🚿`},{name:`Roof Inspection`,category:`Exterior`,intervalNum:2,intervalUnit:`years`,icon:`🏠`}];function er(e){if(!e.lastDone)return null;let t=new Date(e.lastDone),n=e.intervalNum||1,r=e.intervalUnit||`months`;return r===`days`?t.setDate(t.getDate()+n):r===`weeks`?t.setDate(t.getDate()+n*7):r===`months`?t.setMonth(t.getMonth()+n):r===`years`&&t.setFullYear(t.getFullYear()+n),t}function tr(e){let t=er(e);return t?Math.ceil((t-new Date)/864e5):null}function nr(){let e=C.maintenance||[];if(e.length===0){let t=new Set(e.map(e=>e.name.toLowerCase())),n=$n.filter(e=>!t.has(e.name.toLowerCase()));document.getElementById(`maintenance-content`).innerHTML=`
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
              <div class="maint-starter-name">${e.icon} ${R(e.name)}</div>
              <div class="maint-starter-sub">Every ${e.intervalNum} ${e.intervalUnit}</div>
            </button>`).join(``)}
        </div>
      </div>`:``}`;return}let t=[...e].map(e=>{let t=tr(e);return{...e,_days:t}}).sort((e,t)=>e._days===null&&t._days===null?0:e._days===null?1:t._days===null?-1:e._days-t._days),n=t.filter(e=>e._days!==null&&e._days<0).length,r=t.filter(e=>e._days!==null&&e._days>=0&&e._days<=14).length,i=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${n>0?`<span class="veh-badge red">${n} overdue</span>`:``}
        ${r>0?`<span class="veh-badge amber">${r} due soon</span>`:``}
        <span style="font-size:13px;color:var(--text-muted)">${e.length} item${e.length===1?``:`s`}</span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openMaintForm()">+ Add Item</button>
    </div>`;if(t.forEach(e=>{let t=e._days,n=`ok`,r=``;t===null?(n=`ok`,r=e.lastDone?`Last done ${new Date(e.lastDone).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`,year:`numeric`})}`:`Never done`):t<0?(n=`overdue`,r=`Overdue by ${Math.abs(t)} day${Math.abs(t)===1?``:`s`}`):t<=14?(n=`due-soon`,r=t===0?`Due today`:`Due in ${t} day${t===1?``:`s`}`):r=`Due ${er(e).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`;let a=Qn.find(t=>t.key===e.category)||Qn[Qn.length-1],o=e.intervalNum?`Every ${e.intervalNum} ${e.intervalUnit}`:``;i+=`
      <div class="maint-item ${n}">
        <div class="maint-row">
          <div class="maint-icon">${a.icon}</div>
          <div class="maint-body">
            <div class="maint-name">${R(e.name)}</div>
            <div class="maint-sub">${[r,o,e.provider?R(e.provider):``].filter(Boolean).join(` · `)}</div>
          </div>
          <div class="maint-actions">
            <button class="maint-done-btn" onclick="event.stopPropagation();markMaintDone(${e.id})">✓ Done</button>
            <button class="btn btn-sm" onclick="openMaintForm(${e.id})">Edit</button>
          </div>
        </div>
        ${e.lastCost?`<div style="font-size:11px;color:var(--text-muted);margin-top:6px;padding-left:48px">Last cost: ${W(e.lastCost)}</div>`:``}
      </div>`}),e.length<3){let t=new Set(e.map(e=>e.name.toLowerCase())),n=$n.filter(e=>!t.has(e.name.toLowerCase()));n.length&&(i+=`<div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add more</div>
        <div class="maint-starter">
          ${n.slice(0,6).map((e,t)=>`
            <button class="maint-starter-btn" onclick="quickAddMaint(${t})">
              <div class="maint-starter-name">${e.icon} ${R(e.name)}</div>
              <div class="maint-starter-sub">Every ${e.intervalNum} ${e.intervalUnit}</div>
            </button>`).join(``)}
        </div>
      </div>`)}document.getElementById(`maintenance-content`).innerHTML=i}var rr=[`Fridge`,`Freezer`,`Pantry`,`Fruit & Veg`,`Spices`,`Drinks`,`Cleaning`,`Other`],ir=[{name:`Milk`,cat:`Fridge`},{name:`Eggs`,cat:`Fridge`},{name:`Cheese`,cat:`Fridge`},{name:`Butter`,cat:`Fridge`},{name:`Yoghurt`,cat:`Fridge`},{name:`Chicken breast`,cat:`Freezer`},{name:`Mince`,cat:`Freezer`},{name:`Fish fillets`,cat:`Freezer`},{name:`Frozen veg`,cat:`Freezer`},{name:`Pasta`,cat:`Pantry`},{name:`Rice`,cat:`Pantry`},{name:`Tinned tomatoes`,cat:`Pantry`},{name:`Olive oil`,cat:`Pantry`},{name:`Flour`,cat:`Pantry`},{name:`Sugar`,cat:`Pantry`},{name:`Bread`,cat:`Pantry`},{name:`Cereal`,cat:`Pantry`},{name:`Onions`,cat:`Fruit & Veg`},{name:`Potatoes`,cat:`Fruit & Veg`},{name:`Bananas`,cat:`Fruit & Veg`},{name:`Apples`,cat:`Fruit & Veg`},{name:`Salt`,cat:`Spices`},{name:`Pepper`,cat:`Spices`},{name:`Garlic`,cat:`Spices`}];function ar(){let e=document.getElementById(`pantry-content`);if(!e)return;let t=C.meals.pantry||[];if(t.length===0){e.innerHTML=`
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon" style="font-size:48px">🥫</div>
        <p style="margin:12px 0">Track what's in your kitchen. Tap items you usually keep stocked.</p>
        <button class="btn btn-primary" onclick="openPantryForm()">+ Add Item</button>
      </div>
      <div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add common items</div>
        <div class="pantry-starter">
          ${ir.map(e=>`<button class="pantry-starter-btn" onclick="quickAddPantry('${z(e.name)}','${e.cat}')">${R(e.name)}</button>`).join(``)}
        </div>
      </div>`;return}let n={};rr.forEach(e=>n[e]=[]),t.forEach(e=>{n[rr.includes(e.cat)?e.cat:`Other`].push(e)});let r=t.filter(e=>e.status===`need`).length,i=t.filter(e=>e.status===`low`).length,a=`
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
    </div>`;if(rr.forEach(e=>{let t=n[e];t.length&&(a+=`<div class="pantry-cat-header">${R(e)} (${t.length})</div>`,t.forEach(e=>{let t=e.status===`stocked`?`✓`:e.status===`low`?`!`:`✗`;e.status===`stocked`||e.status,a+=`<div class="pantry-item">
        <div class="pantry-status ${e.status}" onclick="cyclePantryStatus(${e.id})" title="Tap to change">${t}</div>
        <div class="pantry-body">
          <div class="pantry-name">${R(e.name)}</div>
          ${e.qty?`<div class="pantry-meta">${R(e.qty)}</div>`:``}
        </div>
        <div class="pantry-actions">
          <button class="btn btn-sm" style="font-size:11px" onclick="openPantryForm(${e.id})">Edit</button>
          <button class="btn btn-sm" style="font-size:11px;color:var(--danger)" onclick="deletePantryItem(${e.id})">×</button>
        </div>
      </div>`}))}),t.length<10){let e=new Set(t.map(e=>e.name.toLowerCase())),n=ir.filter(t=>!e.has(t.name.toLowerCase()));n.length&&(a+=`<div style="margin-top:20px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">Quick-add more</div>
        <div class="pantry-starter">
          ${n.slice(0,12).map(e=>`<button class="pantry-starter-btn" onclick="quickAddPantry('${z(e.name)}','${e.cat}')">${R(e.name)}</button>`).join(``)}
        </div>
      </div>`)}e.innerHTML=a}var or=0,sr=null,cr=[{key:`main`,label:`Main`},{key:`snack`,label:`Snack`},{key:`fruit`,label:`Fruit`},{key:`drink`,label:`Drink`}];function lr(){let e=document.getElementById(`lunchbox-content`);if(!e)return;let t=C.meals.lunchbox,n=t.profiles||[];if(n.length===0){e.innerHTML=`
      <div class="empty" style="margin-top:24px">
        <div class="empty-icon" style="font-size:48px">🍱</div>
        <p style="margin:12px 0">Set up your child's profile to start planning school lunches.</p>
        <button class="btn btn-primary" onclick="openLunchboxProfile()">+ Add Child</button>
      </div>`;return}(!sr||!n.find(e=>e.id===sr))&&(sr=n[0].id);let r=n.find(e=>e.id===sr),i=zn(or),a=Bn(i).slice(0,5),o=(t.plans[i]||{})[sr]||{},s=new Date().toISOString().slice(0,10),c=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`],l=n.map(e=>`<button class="lb-kid-tab${e.id===sr?` active`:``}" onclick="_lbActiveKid=${e.id};renderLunchbox()">${R(e.name)}</button>`).join(``),u=a[0].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),d=a[4].toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),f=``;cr.forEach(e=>{f+=`<div class="lb-label">${e.label}</div>`,a.forEach((t,n)=>{let r=(o[n]||{})[e.key]||``,a=t.toISOString().slice(0,10)===s;f+=`<div class="lb-cell${a?` today`:``}" onclick="openLunchboxEdit('${i}',${sr},${n},'${e.key}')">
        ${r?`<span class="lb-cell-text">${R(r)}${C.settings?.showCalories&&(o[n]||{})[`cal_`+e.key]?`<br><span style="font-size:8px;color:var(--text-muted);font-weight:600">${o[n][`cal_`+e.key]} cal</span>`:``}</span>`:`<span class="lb-cell-plus">+</span>`}
      </div>`})});let p=(r.allergies||[]).map(e=>`<span class="lb-tag allergy">${R(e)}</span>`).join(``),m=(r.dislikes||[]).map(e=>`<span class="lb-tag dislike">${R(e)}</span>`).join(``),h=(r.favourites||[]).map(e=>`<span class="lb-tag fav">${R(e)}</span>`).join(``),g=!!localStorage.getItem(`toto_ai_key`),_=Object.values(o).reduce((e,t)=>e+Object.values(t||{}).filter(Boolean).length,0);e.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:16px">
      <div class="lb-kid-tabs">${l}
        <button class="lb-kid-tab" onclick="openLunchboxProfile()" style="border-style:dashed">+</button>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-sm" onclick="openLunchboxProfile(${r.id})">Edit profile</button>
      </div>
    </div>

    <div class="lb-profile-card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:15px;font-weight:700">${R(r.name)}</div>
        ${r.school?`<span style="font-size:12px;color:var(--text-muted)">${R(r.school)}</span>`:``}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${p||``}${m||``}${h||``}
        ${!p&&!m&&!h?`<span style="font-size:12px;color:var(--text-muted)">No preferences set — edit profile to add allergies, dislikes, favourites</span>`:``}
      </div>
      ${r.schoolRules?`<div style="font-size:11px;color:var(--text-muted);margin-top:6px">School rules: ${R(r.schoolRules)}</div>`:``}
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;align-items:center;gap:8px">
        <button class="btn btn-sm" onclick="_lbWeekOffset--;renderLunchbox()" style="font-size:16px;padding:2px 10px">‹</button>
        <span style="font-size:14px;font-weight:700;min-width:140px;text-align:center">
          ${or===0?`This Week`:or===1?`Next Week`:`${u} – ${d}`}
        </span>
        <button class="btn btn-sm" onclick="_lbWeekOffset++;renderLunchbox()" style="font-size:16px;padding:2px 10px">›</button>
        ${or===0?``:`<button class="btn btn-sm" onclick="_lbWeekOffset=0;renderLunchbox()">This week</button>`}
      </div>
      <div style="display:flex;gap:8px">
        ${g?`<button class="btn btn-primary btn-sm" id="lb-ai-btn" onclick="aiPlanLunchbox('${i}',${r.id})">Plan this week</button>`:``}
        ${_>0?`<button class="btn btn-sm" onclick="lbToShoppingList('${i}',${r.id})">Add to shopping list</button>`:``}
      </div>
    </div>

    <div style="overflow-x:auto">
      <div class="lb-grid" style="min-width:460px">
        <div class="lb-header"></div>
        ${a.map((e,t)=>`<div class="lb-header" style="${e.toISOString().slice(0,10)===s?`background:#0891b2;color:#fff`:``}">${c[t]}<div style="font-size:9px;opacity:0.7">${e.getDate()}/${e.getMonth()+1}</div></div>`).join(``)}
        ${f}
        ${C.settings?.showCalories?`<div class="lb-label" style="font-weight:800;font-size:9px">Total</div>`+a.map((e,t)=>{let n=o[t]||{},r=(n.cal_main||0)+(n.cal_snack||0)+(n.cal_fruit||0)+(n.cal_drink||0);return`<div style="background:var(--surface);padding:6px;text-align:center;font-size:10px;font-weight:700;color:${r>0?`var(--text)`:`var(--border)`}">${r>0?r:`—`}</div>`}).join(``):``}
      </div>
    </div>`}function ur(e){try{e()}catch(t){console.error(`Render error in `+e.name+`:`,t),typeof Sentry<`u`&&Sentry.withScope(n=>{n.setTag(`renderer`,e.name||`anonymous`),Sentry.captureException(t)})}}function dr(){let e=Number(C.settings?.routineResetHour??0),t=new Date,n=new Date(t);n.setHours(e,0,0,0),t<n&&n.setDate(n.getDate()-1),n.toISOString().slice(0,10);let r=!1;(C.routineAssignments||[]).forEach(e=>{e.completionState&&Object.keys(e.completionState).forEach(e=>{})});let i=t.toISOString().slice(0,10);if(C.settings?.lastRoutineResetCheck!==i){if(C.settings||(C.settings={}),C.settings.lastRoutineResetCheck=i,C.kids?.completions){let e=C.kids.completions.length;C.kids.completions=C.kids.completions.filter(e=>e.status===`pending`?new Date(e.completedAt||e.ts||0).toISOString().slice(0,10)>=i:!0),C.kids.completions.length!==e&&(r=!0)}r=!0}r&&me(C)}var fr=!1;function pr(e,t){if(!e)return!0;let{type:n,days:r,intervalDays:i,startDate:a,endDate:o}=e;if(a&&t<a||o&&t>o)return!1;let s=new Date(t+`T12:00:00`),c=s.getDay();switch(n){case`daily`:return!0;case`weekdays`:return c>=1&&c<=5;case`weekends`:return c===0||c===6;case`specific_days`:return Array.isArray(r)&&r.includes(String(c));case`interval`:{if(!a||!i)return!1;let e=new Date(a+`T12:00:00`),t=Math.round((s-e)/864e5);return t>=0&&t%i===0}case`one_time`:return t===a;default:return!0}}function mr(e,t){return!e||(e.pausePeriods||[]).some(e=>t>=e.from&&(!e.to||t<=e.to))||(e.skippedDates||[]).includes(t)?!1:pr(e.recurrence||null,t)}var hr={morning:[{label:`Make bed`,emoji:`🛏`,durationMin:2},{label:`Shower`,emoji:`🚿`,durationMin:10},{label:`Breakfast`,emoji:`🍳`,durationMin:15},{label:`Exercise`,emoji:`💪`,durationMin:20},{label:`Meditate`,emoji:`🧘`,durationMin:10},{label:`Plan the day`,emoji:`📋`,durationMin:5},{label:`Read`,emoji:`📚`,durationMin:15},{label:`Vitamins`,emoji:`💊`,durationMin:1},{label:`Walk`,emoji:`🚶`,durationMin:20},{label:`Journaling`,emoji:`✍️`,durationMin:10}],evening:[{label:`Tidy kitchen`,emoji:`🍽`,durationMin:10},{label:`Prep tomorrow`,emoji:`👔`,durationMin:5},{label:`Family time`,emoji:`👨‍👩‍👧`,durationMin:30},{label:`Read`,emoji:`📚`,durationMin:20},{label:`Lights out`,emoji:`💤`,durationMin:0},{label:`Stretch`,emoji:`🤸`,durationMin:10},{label:`Review the day`,emoji:`🪞`,durationMin:5},{label:`Skincare`,emoji:`🧴`,durationMin:5},{label:`No screens`,emoji:`📵`,durationMin:0},{label:`Brush teeth`,emoji:`🦷`,durationMin:3}],general:[{label:`Drink water`,emoji:`💧`,durationMin:1},{label:`Check messages`,emoji:`📱`,durationMin:5},{label:`Quick tidy`,emoji:`🧹`,durationMin:5},{label:`Gratitude`,emoji:`🙏`,durationMin:3}]};function gr(e){let t=e||new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}function X(){return gr(new Date)}function _r(){return P?.uid||`guest`}function vr(){let e=_r();return(C.routines||[]).filter(t=>t.ownerType===`adult`&&(t.ownerId===e||(t.sharedWith||[]).includes(e)))}function yr(){return(C.routines||[]).filter(e=>e.ownerType===`household`)}function br(e){return e.ownerId===_r()}function xr(){return C.kids?.profiles||[]}function Sr(e,t){if(!e)return 0;let n=0,r=new Date;for(;(e.completionState?.[gr(r)]||[]).length===t&&t>0;)n++,r.setDate(r.getDate()-1);return n}function Cr(e,t,n){let r=[],i=new Date;for(let a=n-1;a>=0;a--){let n=new Date(i);n.setDate(i.getDate()-a);let o=gr(n),s=(e?.completionState?.[o]||[]).length;r.push({key:o,label:n.getDate(),done:s,total:t})}return r}function wr(e){let t=0,n=new Date;for(;(e.completions?.[gr(n)]||[]).length===e.steps.length&&e.steps.length>0;)t++,n.setDate(n.getDate()-1);return t}function Tr(e){let t=new Set(e.steps.map(e=>e.label.toLowerCase())),n=e.name.toLowerCase(),r;return r=n.includes(`morning`)?[...hr.morning,...hr.general]:n.includes(`evening`)||n.includes(`night`)||n.includes(`bed`)?[...hr.evening,...hr.general]:[...hr.morning,...hr.evening,...hr.general],r.filter(e=>!t.has(e.label.toLowerCase()))}function Er(e){if(e.ownerType===`household`){if(e.ownerId!==`household`)throw Error(`Scope violation: household routine has ownerId="${e.ownerId}"`)}else if(e.ownerType===`adult`){if(!e.ownerId||e.ownerId===`household`)throw Error(`Scope violation: adult routine has ownerId="${e.ownerId}"`)}else throw Error(`Scope violation: unknown ownerType="${e.ownerType}"`)}function Dr(e){(C.routines||[]).forEach(t=>{try{Er(t)}catch(n){console.error(`[Routines] ${e}:`,n.message,t)}}),me(C)}var Or=`mine`;function kr(){let e=document.getElementById(`routines-content`);if(!e)return;let t=xr(),n=t.length>0,r=`<div class="page-header" style="margin-bottom:4px">
    <h1>Routines</h1>
    <p>Build consistent daily habits</p>
  </div>
  <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
    <button class="btn btn-primary btn-sm" onclick="_routineCreate()">＋ New routine</button>
  </div>`;n&&(r+=`<div class="routine-tab-bar">
      <button class="routine-tab${Or===`mine`?` active`:``}" onclick="_routineSetTab('mine')">My Routines</button>
      <button class="routine-tab${Or===`children`?` active`:``}" onclick="_routineSetTab('children')">Children's Routines</button>
    </div>`),r+=Or===`children`&&n?Fr(t):Ar(),e.innerHTML=r}function Ar(){let e=_r(),t=!1;(C.routines||[]).forEach(n=>{n.ownerType===`adult`&&n.ownerId===`guest`&&(n.ownerId=e,t=!0)}),t&&Dr(`lazy-uid-claim`);let n=new Date().toISOString().slice(0,10),r=vr().filter(e=>mr(e,n)),i=X(),a=``;return r.length?(r.forEach(t=>{let n=br(t),r=t.linkedType===`join`,o=!n&&(t.sharedWith||[]).includes(e),s=t.completions?.[i]||[],c=t.steps.length,l=c>0?Math.round(s.length/c*100):0,u=s.length===c&&c>0,d=wr(t),f=t.steps.reduce((e,t)=>e+(t.durationMin||0),0),p=n&&!r,m=``;r?m=`<span class="routine-owner-badge routine-joined-badge">🔗 Joined</span>`:t.linkedType===`duplicate`?m=`<span class="routine-owner-badge">📋 Duplicated</span>`:o&&(m=`<span class="routine-owner-badge routine-shared-badge">👥 Shared with you</span>`);let h=t.steps.map((e,n)=>{let r=s.includes(e.id);return`<div class="routine-step"${p?` draggable="true" data-routine="${t.id}" data-step="${e.id}" data-idx="${n}"
          ondragstart="_routineDragStart(event)" ondragover="_routineDragOver(event)"
          ondrop="_routineDrop(event,${t.id})" ondragend="_routineDragEnd(event)"`:``}>
        ${p?`<span class="routine-step-grab" title="Drag to reorder">⠿</span>`:`<span style="width:18px;flex-shrink:0"></span>`}
        <div class="routine-step-check${r?` done`:``}" onclick="_routineToggleStep(${t.id},${e.id})">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span class="routine-step-emoji">${e.emoji}</span>
        <span class="routine-step-label${r?` done`:``}">${R(e.label)}</span>
        ${e.durationMin?`<span class="routine-step-dur">${e.durationMin}m</span>`:``}
        ${e.notes?`<span class="routine-step-dur" style="font-style:italic">${R(e.notes)}</span>`:``}
      </div>`}).join(``),g=(t.skippedDates||[]).includes(new Date().toISOString().slice(0,10)),_=p?`
      <button class="btn btn-sm btn-ghost" onclick="_routineSkipDay(${t.id})" title="${g?`Un-skip today`:`Skip today`}" style="${g?`color:#d97706`:``}">⏭</button>
      <button class="btn btn-sm btn-ghost" onclick="_routinePauseMenu(${t.id})" title="Pause">⏸</button>
      <button class="btn btn-sm btn-ghost" onclick="_routineEdit(${t.id})" title="Edit">✏️</button>
      <button class="btn btn-sm btn-ghost" style="color:#ef4444" onclick="_routineDelete(${t.id})" title="Delete">🗑</button>`:``,v=`<button class="btn btn-sm btn-secondary" onclick="_routineResetToday(${t.id})">↺ Reset today</button>
      <button class="btn btn-sm btn-secondary" onclick="_routineShowHistory(${t.id},null)">📅 History</button>`;p?v+=`<button class="btn btn-sm btn-secondary" onclick="_routineShareMenu(${t.id})">👥 Share</button>`:r?v+=`<button class="btn btn-sm btn-secondary" onclick="_routineDuplicateFromJoined(${t.id})">📋 Duplicate to mine</button>
        <button class="btn btn-sm btn-ghost" style="color:#ef4444;margin-left:auto" onclick="_routineLeave(${t.id})">Leave</button>`:o&&(v+=`<button class="btn btn-sm btn-secondary" onclick="_routineDuplicateTo(${t.id})">📋 Duplicate to mine</button>
        <button class="btn btn-sm btn-secondary" onclick="_routineJoin(${t.id})">🔗 Join (stay in sync)</button>`),a+=`<div class="routine-card">
      <div class="routine-card-header">
        <div class="routine-card-title">${t.emoji} ${R(t.name)}</div>
        <div style="display:flex;align-items:center;gap:2px;flex-wrap:wrap">
          ${d>0?`<span class="routine-streak" style="margin-right:4px">🔥 ${d}d</span>`:``}
          ${m?`<span style="margin-right:4px">${m}</span>`:``}
          ${_}
        </div>
      </div>
      <div class="routine-card-meta">${f?`${f}min · `:``}${t.triggerTime}${g?` · <span style="color:#d97706;font-weight:700">Skipped today</span>`:``}</div>
      <div class="routine-progress-row">
        <div class="routine-progress-bar-wrap"><div class="routine-progress-bar-fill" style="width:${l}%"></div></div>
        <span class="routine-progress-label">${s.length}/${c}</span>
      </div>
      <div class="routine-steps">${h}</div>
      ${u?`<div class="routine-all-done">✓ Complete — great work!</div>`:``}
      ${p?`<button class="routine-add-step-btn" onclick="_routineAddStep(${t.id})">+ Add step</button>`:``}
      ${p?Pr(t):``}
      <div class="routine-card-btns" style="margin-top:12px">${v}</div>
    </div>`}),a+=`<div class="routine-new-card" onclick="_routineCreate()">
    <span style="font-size:22px">＋</span>
    <span class="routine-new-card-label">Create new routine</span>
  </div>`,a):`<div style="text-align:center;padding:32px 20px;color:var(--text-muted)">
      <div style="font-size:40px;margin-bottom:12px">📋</div>
      <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px">No routines yet</div>
      <div style="font-size:13px">Tap ＋ New routine to get started.</div>
    </div>
    <div class="routine-new-card" onclick="_routineCreate()">
      <span style="font-size:22px">＋</span>
      <span class="routine-new-card-label">Create new routine</span>
    </div>`}var jr={},Mr={},Nr=3;function Pr(e){let t=Tr(e);if(!t.length)return``;let n=!jr[e.id],r=!!Mr[e.id],i=r?t:t.slice(0,Nr),a=t.length-Nr,o=e.ownerType===`household`,s=i.map(t=>`
    <div class="routine-suggestion-row">
      <span class="routine-suggestion-emoji">${t.emoji}</span>
      <span class="routine-suggestion-label">${R(t.label)}</span>
      ${t.durationMin?`<span class="routine-suggestion-dur">${t.durationMin}m</span>`:``}
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;margin-left:auto">
        ${o?`<button class="btn btn-sm btn-ghost" style="padding:2px 7px;font-size:12px"
          onclick="event.stopPropagation();_routineEditSuggestion(${e.id},'${R(t.label).replace(/'/g,`\\'`)}','${t.emoji}',${t.durationMin})"
          title="Add with points">✏️</button>`:``}
        <span class="routine-suggestion-add"
          onclick="_routineAddSuggestion(${e.id},'${R(t.label).replace(/'/g,`\\'`)}','${t.emoji}',${t.durationMin})">+</span>
      </div>
    </div>`).join(``),c=!r&&a>0?`<button class="btn btn-sm btn-ghost" style="margin-top:4px;width:100%;font-size:12px" onclick="_routineExpandSugg(${e.id})">Show ${a} more ▼</button>`:``;return`<div class="routine-suggestions">
    <div class="routine-suggestions-toggle${n?` open`:``}" onclick="_routineToggleSugg(${e.id})">
      <span>Suggested steps (${t.length})</span><span class="chevron">▼</span>
    </div>
    <div class="routine-suggestions-list" style="display:${n?`flex`:`none`};flex-direction:column">
      ${s}${c}
    </div>
  </div>`}function Fr(e){let t=C.routineAssignments||[],n=yr(),r=X();if(!n.length)return`<div style="text-align:center;padding:32px 20px;color:var(--text-muted)">
      <div style="font-size:40px;margin-bottom:12px">👧</div>
      <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px">No children's routines yet</div>
      <div style="font-size:13px">Tap ＋ New routine to create one, then assign it to your children.</div>
    </div>
    <div class="routine-new-card" onclick="_routineCreate('child')">
      <span style="font-size:22px">＋</span>
      <span class="routine-new-card-label">Create children's routine</span>
    </div>`;let i=``;return n.forEach(n=>{let a=t.filter(e=>e.routineId===n.id),o=a.map(t=>({kid:e.find(e=>e.id===t.childId),assignment:t})).filter(e=>e.kid),s=n.steps.length,c=e.map(e=>{let t=a.some(t=>t.childId===e.id);return`<span class="routine-member-chip${t?` active`:``}"
        onclick="_routineToggleAssignment(${n.id},'${e.id}')"
        title="${t?`Remove`:`Assign`} ${R(e.name)}">
        ${e.emoji||`👤`} ${R(e.name)}
      </span>`}).join(``),l=o.length?o.map(({kid:e,assignment:t})=>{let n=t.completionState?.[r]||[],i=s>0?Math.round(n.length/s*100):0,a=Sr(t,s),o=n.length===s&&s>0;return`<div style="display:flex;align-items:center;gap:8px;padding:4px 0">
            <span style="font-size:14px;width:22px;text-align:center;flex-shrink:0">${e.emoji||`👤`}</span>
            <span style="font-size:12px;font-weight:600;color:var(--text);flex-shrink:0;min-width:52px">${R(e.name)}</span>
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
        <span class="routine-step-label">${R(e.label)}</span>
        ${e.durationMin?`<span class="routine-step-dur">${e.durationMin}m</span>`:``}
        ${e.notes?`<span class="routine-step-dur" style="font-style:italic">${R(e.notes)}</span>`:``}
        <div style="display:flex;align-items:center;gap:4px;margin-left:auto;flex-shrink:0">
          ${e.points>0?`<span style="font-size:10px;font-weight:700;background:#fef9c3;color:#854d0e;padding:2px 6px;border-radius:99px">⭐${e.points}</span>`:``}
          <button onclick="event.stopPropagation();_routineEditStep(${n.id},${e.id})"
            style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:13px;padding:0 3px;line-height:1" title="Edit step">✏️</button>
          <button onclick="event.stopPropagation();_routineDeleteStep(${n.id},${e.id},false)"
            style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:14px;padding:0 3px;line-height:1" title="Remove step">✕</button>
        </div>
      </div>`).join(``),d=(n.skippedDates||[]).includes(new Date().toISOString().slice(0,10));i+=`<div class="routine-card">
      <div class="routine-card-header">
        <div class="routine-card-title">${n.emoji} ${R(n.name)}</div>
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
      ${Pr(n)}

      <!-- Actions -->
      <div class="routine-card-btns" style="margin-top:12px">
        <button class="btn btn-sm btn-secondary" onclick="_routineResetTodayAllKids(${n.id})">↺ Reset today</button>
        <button class="btn btn-sm btn-secondary" onclick="_routineShowHistory(${n.id},null)">📅 History</button>
        ${n.pointsPerCompletion>0?`<span style="font-size:12px;color:var(--text-muted);align-self:center">⭐ ${n.pointsPerCompletion} pts</span>`:``}
      </div>
    </div>`}),i+=`<div class="routine-new-card" onclick="_routineCreate('child')">
    <span style="font-size:22px">＋</span>
    <span class="routine-new-card-label">Create children's routine</span>
  </div>`,i}var Ir={today:[kt],money:[_t],dashboard:[Nt],budget:[Sn],bills:[_i],networth:[ni],goals:[Vt],scenarios:[Gt],insights:[cn],build:[Pt],settings:[gn],kids:[Br],planner:[Hi],forecast:[Vi],meals:[Vn],lunchbox:[lr],pantry:[ar],vehicles:[Jn],documents:[Zn],maintenance:[nr],routines:[kr],lists:[Wn]};function Lr(){Re(),ur(kt);let e=Ir[te()];e&&e.forEach(e=>ur(e))}x(Lr),ee(Lr),window.activateTab=k,window._activateTabInternal=O,window._updatePillsOverflow=D,window._checkSettingsUnsaved=mn;var Rr=`parent`,zr=`overview`;function Br(){let e=document.getElementById(`kids-content`);if(!e)return;let t=C.kids;if(Rr===`parent`)Hr(e,t,t.completions.filter(e=>e.status===`pending`).length+t.redemptions.filter(e=>e.status===`pending`).length);else{let n=t.profiles.find(e=>e.id===Rr);n?qr(e,t,n):(Rr=`parent`,Br())}}function Vr(e,t){return e.completions.filter(e=>e.kidId===t&&e.status===`approved`).reduce((t,n)=>t+(e.chores.find(e=>e.id===n.choreId)?.points||0),0)-e.redemptions.filter(e=>e.kidId===t&&e.status===`approved`).reduce((t,n)=>t+(e.prizes.find(e=>e.id===n.prizeId)?.pointCost||0),0)}function Hr(e,t,n){let r=`
    <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
      <button class="btn btn-primary" style="padding:8px 14px;font-size:13px" onclick="openAddKidModal()">+ Add Kid</button>
    </div>
    <div style="display:flex;gap:4px;margin-bottom:24px;border-bottom:1px solid var(--border)">
      ${[{id:`overview`,label:`Overview`},{id:`chores`,label:`Chores`},{id:`prizes`,label:`Prize Shelf`},{id:`approvals`,label:`Approvals${n?` <span style="background:#ef4444;color:#fff;border-radius:99px;padding:1px 7px;font-size:11px;vertical-align:middle;margin-left:4px">${n}</span>`:``}`},{id:`events`,label:`📅 Events`}].map(e=>`<button onclick="kidsParentTab='${e.id}';renderKids()" style="padding:8px 16px;border:none;background:none;cursor:pointer;font-size:13px;font-weight:500;color:${zr===e.id?`#0891b2`:`#64748b`};border-bottom:2px solid ${zr===e.id?`#0891b2`:`transparent`};margin-bottom:-1px;transition:all 0.15s">${e.label}</button>`).join(``)}
    </div>`;zr===`overview`?r+=Ur(t):zr===`chores`?r+=Wr(t):zr===`prizes`?r+=Gr(t):zr===`approvals`?r+=Kr(t):zr===`events`&&(r+=Jr()),e.innerHTML=r}function Ur(e){if(!e.profiles.length)return`
    <div style="text-align:center;padding:60px 20px">
      <div style="font-size:52px;margin-bottom:12px">👨‍👩‍👧‍👦</div>
      <p style="font-size:16px;font-weight:600;color:#1e293b;margin-bottom:8px">No kids added yet</p>
      <p style="color:#64748b;margin-bottom:20px">Add your kids to start assigning chores and prizes</p>
      <button class="btn btn-primary" onclick="openAddKidModal()">+ Add Kid</button>
    </div>`;let t=`<div class="kids-grid">`;return e.profiles.forEach(n=>{let r=Vr(e,n.id),i=e.chores.filter(e=>e.assignedTo===n.id||e.assignedTo===`all`).length,a=e.completions.filter(e=>e.kidId===n.id&&e.status===`pending`).length;t+=`
      <div class="kid-card" style="cursor:default">
        <button onclick="openEditKidModal('${n.id}')" style="position:absolute;top:10px;right:10px;background:none;border:none;cursor:pointer;color:#cbd5e1;font-size:14px;padding:2px 5px;border-radius:4px" title="Edit">✏️</button>
        <div onclick="kidsView='${n.id}';renderKids()" style="cursor:pointer">
          <div class="kid-avatar">${n.emoji}</div>
          <div class="kid-name">${R(n.name)}</div>
          <div class="kid-points">${r}</div>
          <div class="kid-points-label">⭐ points</div>
          <div style="display:flex;gap:10px;font-size:12px;color:#64748b;margin-top:4px">
            <span>📋 ${i}</span>
            ${a?`<span style="color:#f59e0b;font-weight:600">⏳ ${a}</span>`:``}
            ${n.savings?`<span style="color:#0891b2">💰 $${n.savings.toFixed(0)}</span>`:``}
          </div>
        </div>
        <button onclick="switchToKidMode('${n.id}')" style="width:100%;margin-top:10px;padding:8px;background:#ecfeff;border:1.5px solid #0891b2;border-radius:8px;font-size:12px;color:#0891b2;font-weight:600;cursor:pointer">
          Switch to ${R(n.name)}'s view →
        </button>
        <button onclick="viewChildToday('${n.id}')" style="width:100%;margin-top:6px;padding:7px;background:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;font-size:12px;color:#5B4CF5;font-weight:600;cursor:pointer">
          👁 View ${R(n.name)}'s Today
        </button>
        <button onclick="_cvViewCalendar('${n.id}')" style="width:100%;margin-top:6px;padding:7px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;font-size:12px;color:#15803d;font-weight:600;cursor:pointer">
          📅 View ${R(n.name)}'s Calendar
        </button>
        <button onclick="openPinSetup('${n.id}')" style="width:100%;margin-top:6px;padding:7px;background:${n.pinHash?`#f0fdf4`:`#fffbeb`};border:1px solid ${n.pinHash?`#bbf7d0`:`#fde68a`};border-radius:8px;font-size:12px;color:${n.pinHash?`#15803d`:`#854d0e`};font-weight:600;cursor:pointer">
          ${n.pinHash?`🔒 PIN set — change`:`🔓 Set PIN for login`}
        </button>
      </div>`}),t+=`</div>`,t}function Wr(e){let t=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <span style="font-size:15px;font-weight:600">All Chores</span>
    <button class="btn btn-primary btn-sm" onclick="openChoreModal()">+ Add Chore</button>
  </div>`;if(!e.chores.length){let n=e.profiles[0],r=n?.name||`your child`,i=n?.emoji||`👦`,a=[{emoji:`🛏️`,label:`Make bed`},{emoji:`🍽️`,label:`Clear table`},{emoji:`🐕`,label:`Feed pet`}].map(e=>`<button onclick="openChoreModal()" style="padding:7px 14px;background:#fef9c3;border:1.5px solid #eab308;border-radius:99px;font-size:12px;font-weight:600;color:#854d0e;cursor:pointer">${e.emoji} ${e.label}</button>`).join(``);return t+`
      <div style="background:#fff;border:2px dashed #cbd5e1;border-radius:16px;padding:36px 24px;text-align:center;margin-top:8px">
        <div style="font-size:44px;margin-bottom:10px">${i}</div>
        <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:6px">${R(r)} has no chores yet</div>
        <div style="font-size:13px;color:#64748b;margin-bottom:18px">Add chores to help ${R(r)} earn coins and unlock prizes.</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px">
          ${a}
          <button onclick="openChoreModal()" style="padding:7px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:99px;font-size:12px;color:#64748b;cursor:pointer">+ Custom</button>
        </div>
        <button onclick="openChoreModal()" style="background:#eab308;color:#fff;border:none;border-radius:10px;padding:12px 28px;font-size:14px;font-weight:600;cursor:pointer">Add first chore →</button>
      </div>`}return e.chores.forEach(n=>{let r=n.assignedTo===`all`?`All kids`:e.profiles.find(e=>e.id===n.assignedTo)?.name||`?`;t+=`<div class="chore-item">
      <div class="chore-emoji">${n.emoji}</div>
      <div style="flex:1"><div class="chore-name">${R(n.name)}</div><div class="chore-meta">${R(r)} · ${n.frequency}</div></div>
      <div class="chore-pts">⭐ ${n.points}</div>
      <button onclick="openChoreModal('${n.id}')" class="btn btn-ghost btn-sm">✏️</button>
      <button onclick="deleteChore('${n.id}')" class="btn btn-ghost btn-sm" style="color:#ef4444">🗑</button>
    </div>`}),t}function Gr(e){let t=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <span style="font-size:15px;font-weight:600">Prize Shelf</span>
    <button class="btn btn-primary btn-sm" onclick="openPrizeModal()">+ Add Prize</button>
  </div>`;return e.prizes.length?(e.prizes.forEach(e=>{t+=`<div class="prize-card">
      <div class="prize-icon">${e.emoji}</div>
      <div style="flex:1"><div class="prize-name">${R(e.name)}</div><div class="prize-desc">${R(e.description||e.type)}</div></div>
      <div class="prize-cost">⭐ ${e.pointCost}</div>
      <button onclick="openPrizeModal('${e.id}')" class="btn btn-ghost btn-sm">✏️</button>
      <button onclick="deletePrize('${e.id}')" class="btn btn-ghost btn-sm" style="color:#ef4444">🗑</button>
    </div>`}),t):t+`<div class="empty"><div class="empty-icon">🎁</div><p>No prizes yet — add something for the kids to work towards</p></div>`}function Kr(e){let t=e.completions.filter(e=>e.status===`pending`),n=e.redemptions.filter(e=>e.status===`pending`);if(!t.length&&!n.length)return`<div style="text-align:center;padding:48px 20px"><div style="font-size:40px;margin-bottom:12px">✅</div><p style="font-weight:600;color:#1e293b">All caught up!</p><p style="color:#64748b;font-size:13px">No pending approvals</p></div>`;let r=``;return t.length&&(r+=`<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;margin-bottom:10px">Completed Chores</div>`,t.forEach(t=>{let n=e.profiles.find(e=>e.id===t.kidId),i=e.chores.find(e=>e.id===t.choreId);!n||!i||(r+=`<div class="chore-item pending-approval" style="margin-bottom:10px">
        <div class="chore-emoji">${i.emoji}</div>
        <div style="flex:1"><div class="chore-name">${R(i.name)}</div><div class="chore-meta">${n.emoji} ${R(n.name)} · ${new Date(t.completedAt).toLocaleDateString()}</div></div>
        <div class="chore-pts">⭐ ${i.points}</div>
        <button class="approve-btn" onclick="approveCompletion('${t.id}')">Approve</button>
        <button class="reject-btn" onclick="rejectCompletion('${t.id}')">Reject</button>
      </div>`)})),n.length&&(r+=`<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;margin:20px 0 10px">Prize Redemptions</div>`,n.forEach(t=>{let n=e.profiles.find(e=>e.id===t.kidId),i=e.prizes.find(e=>e.id===t.prizeId);!n||!i||(r+=`<div class="prize-card pending-redemption" style="margin-bottom:10px">
        <div class="prize-icon">${i.emoji}</div>
        <div style="flex:1"><div class="prize-name">${R(i.name)}</div><div class="prize-desc">${n.emoji} ${R(n.name)} wants this</div></div>
        <div class="prize-cost">⭐ ${i.pointCost}</div>
        <button class="approve-btn" onclick="approveRedemption('${t.id}')">Approve</button>
        <button class="reject-btn" onclick="rejectRedemption('${t.id}')">Reject</button>
      </div>`)})),r}function qr(e,t,n){let r=Vr(t,n.id),i=t.chores.filter(e=>e.assignedTo===n.id||e.assignedTo===`all`),a=new Set(t.completions.filter(e=>e.kidId===n.id&&e.status===`pending`).map(e=>e.choreId)),o=new Date().toDateString(),s=new Set(t.completions.filter(e=>e.kidId===n.id&&e.status===`approved`&&new Date(e.completedAt).toDateString()===o).map(e=>e.choreId)),c=`
    <button onclick="kidsView='parent';kidsParentTab='overview';renderKids()" class="btn btn-ghost btn-sm" style="margin-bottom:16px">← Parent view</button>

    <div style="background:linear-gradient(135deg,#0891b2,#0e7490);border-radius:16px;padding:24px 28px;color:#fff;margin-bottom:24px;display:flex;align-items:center;gap:20px">
      <div style="font-size:48px;background:rgba(255,255,255,0.15);border-radius:50%;width:72px;height:72px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${n.emoji}</div>
      <div style="flex:1">
        <div style="font-size:13px;opacity:0.75">Hey there,</div>
        <div style="font-size:24px;font-weight:800">${R(n.name)}!</div>
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
        <div style="flex:1"><div class="chore-name">${R(e.name)}</div><div class="chore-meta">${t?`⏳ Waiting...`:r?`✅ Done!`:e.frequency}</div></div>
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
        <div style="flex:1"><div class="prize-name">${R(e.name)}</div><div class="prize-desc">${a?`⏳ Pending...`:i?`✅ You can get this!`:`${e.pointCost-r} pts to go`}</div></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <div class="prize-cost">⭐ ${e.pointCost}</div>
          ${i&&!a?`<button onclick="requestRedemption('${e.id}','${n.id}')" style="background:#0891b2;color:#fff;border:none;border-radius:6px;padding:3px 9px;font-size:11px;cursor:pointer;font-weight:600">Redeem!</button>`:``}
        </div>
      </div>`}):c+=`<div style="color:#64748b;font-size:13px;padding:20px;text-align:center;background:#f8fafc;border-radius:10px">No prizes on the shelf yet!</div>`,c+=`</div></div>`,e.innerHTML=c}function Jr(){let e=C.childEvents||[],t=C.kids?.profiles||[],n=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
    <span style="font-size:15px;font-weight:600">Child Events</span>
    <button class="btn btn-primary btn-sm" onclick="_openChildEventModal()">+ Add Event</button>
  </div>`;return e.length?([...e].sort((e,t)=>(e.date||``).localeCompare(t.date||``)).forEach(e=>{let r=Array.isArray(e.assignedTo)?e.assignedTo:[e.assignedTo],i=e.isHouseholdWide||r.includes(`all`)?`All kids`:r.map(e=>t.find(t=>t.id===e)?.name||`?`).join(`, `),a=e.recurrence?` · 🔁 ${{daily:`Daily`,weekdays:`Weekdays`,weekends:`Weekends`,specific_days:`Selected days`,interval:`Every ${e.recurrence.intervalDays}d`,one_time:`Once`}[e.recurrence.type]||``}`:``;n+=`<div style="display:flex;align-items:center;gap:12px;padding:12px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:8px">
      <span style="font-size:22px">${e.emoji||`📅`}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600;color:#18181B">${R(e.title)}</div>
        <div style="font-size:11px;color:#64748b">${e.date||``}${e.time?` · `+e.time:``}${a} · ${i}</div>
      </div>
      <button onclick="_openChildEventModal('${e.id}')" class="btn btn-ghost btn-sm">✏️</button>
      <button onclick="_deleteChildEvent('${e.id}')" class="btn btn-ghost btn-sm" style="color:#ef4444">🗑</button>
    </div>`}),n):n+`<div style="text-align:center;padding:40px 20px;color:#64748b">
      <div style="font-size:36px;margin-bottom:10px">📅</div>
      <div style="font-size:14px;font-weight:600;margin-bottom:6px">No events yet</div>
      <div style="font-size:13px">Add activities, appointments and school days for your kids</div>
    </div>`}var Yr=[`😊`,`🦁`,`🐯`,`🐻`,`🦊`,`🐸`,`🐧`,`🦋`,`🌟`,`🎈`,`🚀`,`⚡`],Xr=null,Zr={};function Qr(){return Xr?Promise.resolve(Xr):new Promise((e,t)=>{let n=indexedDB.open(`home_finance_receipts`,1);n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(`receipts`)||t.createObjectStore(`receipts`,{keyPath:`id`,autoIncrement:!0}).createIndex(`itemKey`,`itemKey`,{unique:!1})},n.onsuccess=t=>{Xr=t.target.result,e(Xr)},n.onerror=()=>t(n.error)})}async function $r(){let e=await Qr();return new Promise(t=>{let n=e.transaction(`receipts`,`readonly`).objectStore(`receipts`).getAll();n.onsuccess=()=>{Zr={},n.result.forEach(e=>{Zr[e.itemKey]=(Zr[e.itemKey]||0)+1}),t()}})}function ei(e){return e===`own-funds`?`<span class="badge" style="background:#ecfeff;color:#166534;border:1px solid #bbf7d0">Own Funds</span>`:`<span class="badge" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe">Loan</span>`}function ti(e,t){let n=Zr[e]||0;return`<button class="attach-btn${n?` has-files`:``}" onclick="openReceiptsModal('${e}','${t.replace(/'/g,`\\'`)}')" title="${n?n+` receipt(s)`:`Add receipt`}">📎${n?` ${n}`:``}</button>`}window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault();let t=document.getElementById(`install-btn`);t&&(t.style.display=`flex`)}),window.addEventListener(`appinstalled`,()=>{let e=document.getElementById(`install-btn`);e&&(e.style.display=`none`)});function Z(e){let t=Math.abs(e),n=t>=1e6?(t/1e6).toFixed(2)+`M`:t>=1e3?(t/1e3).toFixed(1)+`k`:t.toFixed(0);return(e<0?`-$`:`$`)+n}function ni(){let e=document.getElementById(`networth-content`);if(!e)return;let t=C.netWorth,n=t.assets||[],r=t.liabilities||[],i=t.snapshots||[],a=n.reduce((e,t)=>e+(parseFloat(t.value)||0),0),o=r.reduce((e,t)=>e+(parseFloat(t.value)||0),0),s=a-o,c=``;if(i.length>=2){let e=s-i[i.length-2].netWorth;c=`<span class="${e>=0?`up`:`down`}">${e>=0?`+`:``}${Z(e)}</span> vs last snapshot`}if(!n.length&&!r.length){e.innerHTML=`
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
      <div class="nw-hero-amount ${s>=0?`positive`:`negative`}">${Z(s)}</div>
      ${c?`<div class="nw-hero-change">${c}</div>`:``}
    </div>

    ${ii(s)}
    ${r.some(e=>e.rate)?ai(r):``}
    ${i.length>1?oi(i):``}

    <div class="nw-cols">
      <div class="nw-col-card assets">
        <div class="nw-col-header">
          <span class="nw-col-title">Assets</span>
          <span class="nw-col-total">${Z(a)}</span>
        </div>
        ${n.length?n.map(e=>ri(e,`asset`)).join(``):`<div class="nw-empty">No assets yet</div>`}
        <div class="nw-add-row">
          <button class="btn-outline" style="font-size:12px;padding:6px 14px" onclick="openNWModal('asset')">+ Add asset</button>
        </div>
      </div>
      <div class="nw-col-card liabilities">
        <div class="nw-col-header">
          <span class="nw-col-title">Liabilities</span>
          <span class="nw-col-total">${Z(o)}</span>
        </div>
        ${r.length?r.map(e=>ri(e,`liability`)).join(``):`<div class="nw-empty">No liabilities yet</div>`}
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

  `}function ri(e,t){let n=e.category||``;if(t===`liability`&&e.rate){let t=parseFloat(e.value)||0,r=parseFloat(e.rate),i=t*r/1200;n+=n?` · `:``,n+=`${r}% p.a. · $${Math.round(i).toLocaleString()}/mo interest`}return`
    <div class="nw-item">
      <div style="flex:1;min-width:0">
        <div class="nw-item-name">${R(e.name)}</div>
        ${n?`<div class="nw-item-cat">${n}</div>`:``}
      </div>
      <div class="nw-item-value">${Z(parseFloat(e.value)||0)}</div>
      <div class="nw-item-actions">
        <button class="icon-btn" title="Edit" onclick="openNWModal('${t}','${e.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteNWItem('${t}','${e.id}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>`}function ii(e){let t=C.netWorth.target||{},n=parseFloat(t.amount)||0,r=parseInt(t.byYear)||0,i=new Date().getFullYear();if(!n||!r)return`
      <div class="nw-target-card">
        <div class="nw-target-header">
          <span class="nw-target-title">Your target</span>
          <button class="btn-outline" style="font-size:12px;padding:5px 12px" onclick="openNWTargetModal()">Set target</button>
        </div>
        <div class="nw-target-empty">
          <span style="font-size:28px">🎯</span>
          <span style="font-size:13px;color:#64748b">Set a net worth goal and track your progress towards it.</span>
        </div>
      </div>`;let a=Math.min(e/n*100,100),o=Math.max(n-e,0),s=Math.max(r-i,0),c=s*12,l=c>0?Math.ceil(o/c):0,u=e>=n,d=C.netWorth.snapshots||[],f=``;if(d.length>=2){let e=d[0],t=d[d.length-1],n=Math.max((new Date(t.date)-new Date(e.date))/(1e3*60*60*24*30.5),1),a=(t.netWorth-e.netWorth)/n;if(a>0&&o>0){let e=Math.ceil(o/a),t=i+Math.floor(e/12),n=t<=r;f=`<div class="nw-target-stat">
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
        <div class="nw-target-goal">${Z(n)}</div>
        <div style="font-size:13px;color:#64748b">by ${r}</div>
      </div>
      <div class="nw-progress-track">
        <div class="nw-progress-fill ${u?`over`:``}" style="width:${a.toFixed(1)}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#94a3b8;margin-bottom:14px">
        <span>${a.toFixed(0)}% there</span>
        <span>${u?`🎉 Goal reached!`:Z(o)+` to go`}</span>
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
    </div>`}function ai(e){let t=e.filter(e=>e.rate);if(!t.length)return``;let n=t.reduce((e,t)=>e+(parseFloat(t.value)||0)*(parseFloat(t.rate)||0)/1200,0),r=t.map(e=>{let t=parseFloat(e.value)||0,n=parseFloat(e.rate)||0,r=parseFloat(e.monthlyPayment)||0,i=t*n/1200,a=``;if(r>0)if(r<=i)a=`<span class="nw-debt-payoff warn">⚠ Paying interest only</span>`;else{let e=n/1200,i=-Math.log(1-e*t/r)/Math.log(1+e);if(isFinite(i)&&i>0){let e=new Date;e.setMonth(e.getMonth()+Math.ceil(i));let n=e.toLocaleString(`default`,{month:`short`}),o=e.getFullYear();a=`<span class="nw-debt-payoff" title="${Z(r*Math.ceil(i)-t)} total interest">Paid off ${n} ${o}</span>`}}return`<div class="nw-debt-row">
      <span class="nw-debt-name">${R(e.name)}</span>
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
    </div>`}function oi(e){let t=e.slice(-12),n=Math.max(...t.map(e=>Math.abs(e.netWorth)),1);return`
    <div class="nw-trend-card">
      <div class="nw-trend-title">Net Worth over time</div>
      <div class="nw-trend-chart">${t.map(e=>{let t=Math.round(Math.abs(e.netWorth)/n*70);return`<div class="nw-trend-bar-wrap">
      <div class="nw-trend-bar ${e.netWorth>=0?`pos`:`neg`}" style="height:${t}px"></div>
      <div class="nw-trend-label">${e.date?e.date.slice(0,7):``}</div>
    </div>`}).join(``)}</div>
    </div>`}var si={building:[{name:`Mortgage / Rent`,category:`Mortgage / Rent`,amount:3e3},{name:`Groceries`,category:`Groceries`,amount:1200},{name:`Utilities`,category:`Utilities`,amount:400},{name:`Transport`,category:`Transport`,amount:500},{name:`Insurance`,category:`Insurance`,amount:350},{name:`Entertainment`,category:`Entertainment`,amount:200}],mortgage:[{name:`Mortgage`,category:`Mortgage / Rent`,amount:3500},{name:`Groceries`,category:`Groceries`,amount:1200},{name:`Utilities`,category:`Utilities`,amount:400},{name:`Transport`,category:`Transport`,amount:500},{name:`Insurance`,category:`Insurance`,amount:350},{name:`Entertainment`,category:`Entertainment`,amount:200}],renting:[{name:`Rent`,category:`Mortgage / Rent`,amount:2500},{name:`Groceries`,category:`Groceries`,amount:1200},{name:`Utilities`,category:`Utilities`,amount:300},{name:`Transport`,category:`Transport`,amount:500},{name:`Insurance`,category:`Insurance`,amount:250},{name:`Entertainment`,category:`Entertainment`,amount:200}],own:[{name:`Groceries`,category:`Groceries`,amount:1200},{name:`Utilities`,category:`Utilities`,amount:400},{name:`Transport`,category:`Transport`,amount:500},{name:`Insurance`,category:`Insurance`,amount:400},{name:`Health`,category:`Health`,amount:300},{name:`Entertainment`,category:`Entertainment`,amount:300}]},Q={step:1,adults:2,adultNames:[``,``],adultAges:[``,``],kids:0,kidProfiles:[],homeType:`mortgage`,incomes:[{name:``,amount:``,frequency:`Monthly`}],expenses:[],_emojiPickerOpen:null};function ci(){return Q.kids>0?[1,2,3,4,5,6]:[1,2,4,5,6]}function li(){return ci().indexOf(Q.step)}function ui(){Q={step:1,adults:2,adultNames:[``,``],adultAges:[``,``],kids:0,kidProfiles:[],homeType:`mortgage`,incomes:[{name:``,amount:``,frequency:`Monthly`}],expenses:[],_emojiPickerOpen:null},document.getElementById(`onboarding-overlay`).style.display=`flex`,di()}function di(){let e=document.getElementById(`onboarding-card`),t=ci(),n=li(),r=Q.step,i=t.map((e,t)=>`<div class="ob-dot ${t<n?`done`:t===n?`active`:``}"></div>`).join(``),a=``,o=``,s=``;if(r===1)a=`
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
      <div class="ob-subtitle">Tell us who's home so we can tailor Toto for you.</div>`;let e=[1,2,3].map(e=>`<button class="ob-option ${Q.adults===e?`selected`:``}" onclick="obSetAdults(${e})">${e} adult${e>1?`s`:``}</button>`).join(``),t=Q.adultNames.map((e,t)=>`
      <div style="display:grid;grid-template-columns:1fr 90px;gap:8px;margin-bottom:10px">
        <div>
          <div class="ob-input-label">Adult ${t+1} name</div>
          <input class="ob-input" placeholder="${t===0?`e.g. Chris`:`e.g. Sam`}" value="${z(e)}"
            oninput="_ob.adultNames[${t}]=this.value"
            style="${Q._nameError&&!e.trim()?`border-color:#ef4444`:``}" required>
          ${Q._nameError&&!e.trim()?`<div style="font-size:11px;color:#ef4444;margin-top:3px">Please enter a name</div>`:``}
        </div>
        <div>
          <div class="ob-input-label">Age (optional)</div>
          <input class="ob-input" type="number" min="18" max="99" placeholder="Age" value="${z(String(Q.adultAges[t]||``))}"
            oninput="_ob.adultAges[${t}]=this.value">
        </div>
      </div>`).join(``),n=[0,1,2,3,`4+`].map(e=>{let t=e===`4+`?4:e;return`<button class="ob-option ${Q.kids===t?`selected`:``}" onclick="obSetKids(${t})">${e===0?`No kids`:e+(e===1?` kid`:` kids`)}</button>`}).join(``);o=`
      <span class="ob-label">Adults in your household</span>
      <div class="ob-options">${e}</div>
      ${t}
      <span class="ob-label" style="margin-top:4px">Home situation</span>
      <div class="ob-options">${[{val:`renting`,label:`🏢 Renting`},{val:`mortgage`,label:`🏠 Mortgage`},{val:`building`,label:`🏗️ Building`},{val:`own`,label:`✅ Own outright`}].map(e=>`<button class="ob-option ${Q.homeType===e.val?`selected`:``}" onclick="_ob.homeType='${e.val}';renderObStep()">${e.label}</button>`).join(``)}</div>
      <span class="ob-label">Kids</span>
      <div class="ob-options" style="margin-bottom:0">${n}</div>`,s=`
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obNext()">Continue →</button>`}else if(r===3)Q.kidProfiles.length<Q.kids&&(Q.kidProfiles=Array.from({length:Q.kids},(e,t)=>Q.kidProfiles[t]||{name:``,age:``,emoji:Yr[t%Yr.length]})),a=`
      <div class="ob-step-dots">${i}</div>
      <div class="ob-title">Your kids 👶</div>
      <div class="ob-subtitle">We'll set up chores and lunchbox for each of them.</div>`,o=Q.kidProfiles.map((e,t)=>{let n=Q._emojiPickerOpen===t?`
        <div class="ob-emoji-picker">
          ${Yr.map(e=>`<button onclick="obPickEmoji(${t},'${e}')">${e}</button>`).join(``)}
        </div>`:``;return`
        <div style="margin-bottom:20px">
          <div class="ob-input-label" style="margin-bottom:8px">Kid ${t+1}</div>
          ${n}
          <div class="ob-kid-row">
            <button class="ob-emoji-btn" onclick="obToggleEmojiPicker(${t})" title="Pick emoji">${R(e.emoji)}</button>
            <div>
              <div class="ob-input-label">Name</div>
              <input class="ob-input" placeholder="Name" value="${z(e.name)}"
                oninput="_ob.kidProfiles[${t}].name=this.value">
            </div>
            <div>
              <div class="ob-input-label">Age</div>
              <input class="ob-input" type="number" min="0" max="17" placeholder="Age" value="${z(String(e.age))}"
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
      ${Q.incomes.map((t,n)=>{let r=Q.adultNames[n]?`${Q.adultNames[n]}'s salary`:n===0?`e.g. Salary`:`e.g. Partner salary`,i=e.map(e=>`<button class="ob-option ${t.frequency===e?`selected`:``}" style="padding:6px 14px;font-size:12px"
          onclick="_ob.incomes[${n}].frequency='${e}';renderObStep()">${e}</button>`).join(``);return`
        <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f1f5f9">
          <div style="margin-bottom:10px">
            <div class="ob-input-label">Income source</div>
            <input class="ob-input" placeholder="${z(r)}" value="${z(t.name)}"
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
      ${Q.incomes.length<4?`<button class="ob-add-link" onclick="_ob.incomes.push({name:'',amount:'',frequency:'Monthly'});renderObStep()">+ Add another income source</button>`:``}`,s=`
      <button class="ob-back" onclick="obBack()">← Back</button>
      <button class="ob-next" onclick="obNext()">Continue →</button>`}else if(r===5)Q.expenses.length||(Q.expenses=si[Q.homeType].map(e=>({...e,skipped:!1})),Q.kids>0&&Q.expenses.push({name:`Kids activities / sport`,category:`Childcare / Education`,amount:300,skipped:!1})),a=`
      <div class="ob-step-dots">${i}</div>
      <div class="ob-title">Your main expenses 📋</div>
      <div class="ob-subtitle">Biggest regular costs — adjust to match your situation.</div>`,o=`
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <p style="font-size:13px;color:#64748b;margin:0">Monthly amounts — adjust to match your actual spending.</p>
        <button class="ob-add-link" onclick="obSkipExpenses()" style="white-space:nowrap;margin-left:12px">Add this later</button>
      </div>
      ${Q.expenses.map((e,t)=>`
      <div class="ob-expense-row ${e.skipped?`skipped`:``}">
        <div>
          <div class="ob-expense-name">${R(e.name)}</div>
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
      <button class="ob-next" onclick="obNext()">Continue →</button>`;else if(r===6){let e=Q.incomes.reduce((e,t)=>{let n=parseFloat(t.amount)||0;return n?e+(t.frequency===`Weekly`?n*52/12:t.frequency===`Fortnightly`?n*26/12:t.frequency===`Annual`?n/12:n):e},0),t=Q.expenses.filter(e=>!e.skipped).reduce((e,t)=>e+(parseFloat(t.amount)||0),0),n=Q.adultNames.filter(e=>e),r=n.length>0?n.join(` & `):`${Q.adults} adult${Q.adults>1?`s`:``}`,i={renting:`Renting`,mortgage:`Mortgage`,building:`Building`,own:`Own outright`}[Q.homeType]||``,c=[`
      <div class="ob-summary-member">
        <div class="ob-summary-avatar">👤</div>
        <div>
          <div style="font-size:14px;font-weight:600">${R(r)}</div>
          <div style="font-size:12px;color:#64748b">Adults · ${i}</div>
        </div>
      </div>`];Q.kidProfiles.forEach(e=>{e.name&&c.push(`
        <div class="ob-summary-member">
          <div class="ob-summary-avatar">${R(e.emoji)}</div>
          <div>
            <div style="font-size:14px;font-weight:600">${R(e.name)}${e.age?`, age ${e.age}`:``}</div>
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
    <div class="ob-footer">${s}</div>`}var fi=[{label:`Mortgage / Rent`,icon:`🏠`},{label:`Electricity`,icon:`⚡`},{label:`Gas`,icon:`🔥`},{label:`Water`,icon:`💧`},{label:`Internet`,icon:`📡`},{label:`Phone`,icon:`📱`},{label:`Insurance`,icon:`🛡️`},{label:`Car Registration`,icon:`🚗`},{label:`Rates & Taxes`,icon:`🏛️`},{label:`Loan Repayment`,icon:`💳`},{label:`Education`,icon:`📚`},{label:`Subscriptions`,icon:`📺`},{label:`Health`,icon:`🏥`},{label:`Other`,icon:`📦`}],pi=[`Monthly`,`Fortnightly`,`Weekly`,`Quarterly`,`Annually`];function mi(e){let t=fi.find(t=>t.label===e);return t?t.icon:`📦`}function hi(e){if(e<0)return`<span class="bill-due-badge overdue">Overdue ${Math.abs(e)}d</span>`;if(e===0)return`<span class="bill-due-badge today">Due today</span>`;if(e<=7)return`<span class="bill-due-badge soon">Due in ${e}d</span>`;let t=new Date;return t.setDate(t.getDate()+e),`<span class="bill-due-badge ok">${t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}</span>`}function gi(e){return(parseFloat(e.amount)||0)*({Weekly:52/12,Fortnightly:26/12,Monthly:1,Quarterly:1/3,Annually:1/12}[e.frequency||`Monthly`]||1)}function _i(){let e=document.getElementById(`bills-content`);if(!e)return;let t=C.bills||[],n=C.subscriptions||[],r=ct,i=`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,a=`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,o=t.reduce((e,t)=>e+gi(t),0)+n.reduce((e,t)=>e+xi(t),0),s=t.filter(e=>v(e)<0).length,c=t.filter(e=>{let t=v(e);return t>=0&&t<=7}).length,l=new Date;l.setHours(0,0,0,0);let u=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],d=Array.from({length:14},(e,n)=>{let r=new Date(l);r.setDate(r.getDate()+n);let i=t.filter(e=>_(e).toDateString()===r.toDateString()),a=[r.toDateString()===l.toDateString()&&`today`,i.length&&`has-bill`].filter(Boolean).join(` `);return`<div class="bills-day" title="${i.map(e=>e.name).join(`, `)}">
      <div class="bills-day-label">${u[r.getDay()]}</div>
      <div class="bills-day-num ${a}">${r.getDate()}</div>
      ${i.length?`<div class="bills-day-dot"></div>`:`<div style="height:5px"></div>`}
    </div>`}).join(``);function f(e){let t=v(e),n=t<0?`overdue`:t<=7?`due-soon`:``,r=(e.frequency||`Monthly`)===`Monthly`?``:` · ${e.frequency}`;return`<div class="bill-row ${n}">
      <div class="bill-icon">${mi(e.category)}</div>
      <div class="bill-info">
        <div class="bill-name">${R(e.name)}<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;background:#fef3c7;color:#92400e;margin-left:6px">BILL</span>${e._vehicleRef?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#f0f9ff;color:#0369a1;margin-left:4px;cursor:pointer" onclick="event.stopPropagation();activateTab('vehicles')">Vehicle →</span>`:``}${e._docRef?`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;background:#f5f3ff;color:#6d28d9;margin-left:4px;cursor:pointer" onclick="event.stopPropagation();activateTab('documents')">Document →</span>`:``}</div>
        <div class="bill-meta">${e.category||``}${r}${e.autopay?` · Autopay ✓`:``}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="bill-amount">$${(parseFloat(e.amount)||0).toLocaleString()}</div>
        ${hi(t)}
      </div>
      ${t>=0?`<button class="bill-paid-btn" onclick="markBillPaid('${e.id}')">✓ Paid</button>`:``}
      <div class="bill-actions">
        <button class="icon-btn" title="Edit" onclick="openBillModal('${e.id}')">${i}</button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteBill('${e.id}')">${a}</button>
      </div>
    </div>`}function p(e){let t=xi(e),n=e.frequency===`Annual`?`$${parseFloat(e.amount).toLocaleString()}/yr`:e.frequency===`Weekly`?`$${parseFloat(e.amount).toFixed(2)}/wk`:`$${parseFloat(e.amount).toFixed(2)}/mo`,r=e.renewalDate?` · Renews ${e.renewalDate}`:``;return`<div class="bill-row">
      <div class="bill-icon">${bi(e.category)}</div>
      <div class="bill-info">
        <div class="bill-name">${R(e.name)}<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;background:#ede9fe;color:#5b21b6;margin-left:6px">SUB</span></div>
        <div class="bill-meta">${e.category||`Other`} · ${n}${r}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="bill-amount">$${t.toFixed(2)}<span style="font-size:11px;font-weight:400;color:#94a3b8">/mo</span></div>
      </div>
      <div class="bill-actions">
        <button class="icon-btn" title="Edit" onclick="openSubModal('${e.id}')">${i}</button>
        <button class="icon-btn" style="color:#ef4444" title="Delete" onclick="deleteSub('${e.id}')">${a}</button>
      </div>
    </div>`}let m=[...t].sort((e,t)=>v(e)-v(t)),h=m.filter(e=>v(e)<0),g=m.filter(e=>{let t=v(e);return t>=0&&t<=7}),y=m.filter(e=>{let t=v(e);return t>7&&t<=31}),b=m.filter(e=>v(e)>31),x=r===`all`||r===`bills`,S=r===`all`||r===`subs`,w=Si.filter(e=>!Ci.has(e._key));e.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;gap:4px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:3px">
        <button onclick="setBillsFilter('all')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${r===`all`?`var(--primary)`:`transparent`};color:${r===`all`?`#fff`:`var(--text-muted)`}">All (${t.length+n.length})</button>
        <button onclick="setBillsFilter('bills')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${r===`bills`?`var(--primary)`:`transparent`};color:${r===`bills`?`#fff`:`var(--text-muted)`}">Bills (${t.length})</button>
        <button onclick="setBillsFilter('subs')" style="padding:5px 14px;font-size:12px;font-weight:600;border:none;border-radius:6px;cursor:pointer;background:${r===`subs`?`var(--primary)`:`transparent`};color:${r===`subs`?`#fff`:`var(--text-muted)`}">Subscriptions (${n.length})</button>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-secondary btn-sm" onclick="openSubModal()">+ Subscription</button>
        <button class="btn btn-primary btn-sm" onclick="openBillModal()">+ Bill</button>
      </div>
    </div>

    <div class="bills-summary">
      <div class="bills-stat">
        <div class="bills-stat-val">$${Math.round(o).toLocaleString()}</div>
        <div class="bills-stat-lbl">Monthly total</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val">$${Math.round(o*12).toLocaleString()}</div>
        <div class="bills-stat-lbl">Annual total</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val ${c>0?`warn`:`ok`}">${c}</div>
        <div class="bills-stat-lbl">Due this week</div>
      </div>
      <div class="bills-stat">
        <div class="bills-stat-val ${s>0?`danger`:`ok`}">${s}</div>
        <div class="bills-stat-lbl">Overdue</div>
      </div>
    </div>

    ${t.length&&x?`
    <div class="bills-timeline">
      <div class="bills-timeline-title">Next 14 days</div>
      <div class="bills-strip">${d}</div>
    </div>`:``}

    ${w.length?wi(w):``}

    <div class="bills-upcoming">
      ${x?`
        ${h.length?`<div class="bills-upcoming-group">⚠ Overdue</div>${h.map(f).join(``)}`:``}
        ${g.length?`<div class="bills-upcoming-group">This week</div>${g.map(f).join(``)}`:``}
        ${y.length?`<div class="bills-upcoming-group">This month</div>${y.map(f).join(``)}`:``}
        ${b.length?`<div class="bills-upcoming-group">Later</div>${b.map(f).join(``)}`:``}
        ${t.length?``:`<div style="padding:20px 0;color:var(--text-muted);font-size:13px">No bills yet — click <strong>+ Bill</strong> to add one.</div>`}
      `:``}
      ${S?`
        ${n.length?`<div class="bills-upcoming-group">Subscriptions</div>${n.map(p).join(``)}`:`<div style="padding:20px 0;color:var(--text-muted);font-size:13px">No subscriptions yet — click <strong>+ Subscription</strong> to add one.</div>`}
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

    ${vi()}
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
                ${yi.map(e=>`<option value="${e.label}">${e.icon} ${e.label}</option>`).join(``)}
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
    </div>`}function vi(e){let t=e?(C.bills||[]).find(t=>t.id===e):null,n=fi.map(e=>`<option value="${e.label}" ${t&&t.category===e.label?`selected`:``}>${e.icon} ${e.label}</option>`).join(``),r=pi.map(e=>`<option value="${e}" ${t&&t.frequency===e||(!t||!t.frequency)&&e===`Monthly`?`selected`:``}>${e}</option>`).join(``),i=`width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:14px;outline:none`,a=`font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:5px`;return`
    <div id="bill-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;border-radius:16px;padding:28px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,0.2);max-height:90vh;overflow-y:auto">
        <h3 id="bill-modal-title" style="font-size:17px;font-weight:700;margin-bottom:20px">Add Bill</h3>
        <input type="hidden" id="bill-edit-id">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="${a}">Bill name</label>
            <input id="bill-name" type="text" maxlength="200" placeholder="e.g. AGL Electricity" style="${i}" value="${t?z(t.name):``}">
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
    </div>`}var yi=[{label:`Streaming`,icon:`📺`},{label:`Music`,icon:`🎵`},{label:`Software`,icon:`💻`},{label:`Fitness`,icon:`💪`},{label:`Gaming`,icon:`🎮`},{label:`News`,icon:`📰`},{label:`Insurance`,icon:`🛡️`},{label:`Education`,icon:`📚`},{label:`Other`,icon:`📦`}];function bi(e){let t=yi.find(t=>t.label===e);return t?t.icon:`📦`}function xi(e){let t=parseFloat(e.amount)||0;return e.frequency===`Annual`?t/12:e.frequency===`Weekly`?t*52/12:t}var Si=[],Ci=new Set;function wi(e){let t=e.map(e=>`
    <div class="sub-result-row">
      <div class="sub-result-icon">${bi(e.category)}</div>
      <div class="sub-result-info">
        <div class="sub-result-name">${R(e.name)}</div>
        <div class="sub-result-meta">${R(e.category)} · ${e.frequency} · ${R(e.description||``)}</div>
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
  </div>`}var $={work:{label:`Work`,emoji:`💼`,color:`#dbeafe`,text:`#1e40af`,financial:!1},study:{label:`Study`,emoji:`📚`,color:`#fef3c7`,text:`#92400e`,financial:!1},social:{label:`Social`,emoji:`🎉`,color:`#ede9fe`,text:`#5b21b6`,financial:!0},family:{label:`Family`,emoji:`👨‍👩‍👧`,color:`#fce7f3`,text:`#9d174d`,financial:!1},travel:{label:`Travel`,emoji:`✈️`,color:`#e0f2fe`,text:`#075985`,financial:!0},health:{label:`Health`,emoji:`🏥`,color:`#fef2f2`,text:`#991b1b`,financial:!0},finance:{label:`Finance`,emoji:`💰`,color:`#ecfeff`,text:`#155e75`,financial:!0},home:{label:`Home`,emoji:`🏠`,color:`#ecfeff`,text:`#166534`,financial:!0},school:{label:`School`,emoji:`🏫`,color:`#fff7ed`,text:`#9a3412`,financial:!0},other:{label:`Other`,emoji:`📦`,color:`#f1f5f9`,text:`#475569`,financial:!1}},Ti=new Date().toISOString().slice(0,7),Ei=new Date().toISOString().slice(0,10),Di=`week`,Oi=new Set,ki={"life-areas":!1,nudge:!1},Ai=!1,ji=[{dot:`#2563eb`,bg:`#dbeafe`,text:`#1e40af`},{dot:`#db2777`,bg:`#fce7f3`,text:`#9d174d`},{dot:`#d97706`,bg:`#fef3c7`,text:`#92400e`},{dot:`#7c3aed`,bg:`#ede9fe`,text:`#5b21b6`},{dot:`#16a34a`,bg:`#dcfce7`,text:`#166534`},{dot:`#0891b2`,bg:`#ecfeff`,text:`#155e75`},{dot:`#ea580c`,bg:`#ffedd5`,text:`#9a3412`},{dot:`#be185d`,bg:`#fdf2f8`,text:`#831843`}];function Mi(){let e=C.householdProfile?.members||[],t=C.kids?.profiles||[],n=[],r=0;return e.forEach((e,t)=>{let i=ji[r%ji.length];e.role===`adult`&&e.name&&(n.push({id:`adult-`+t,name:e.name,emoji:e.emoji||`🧑`,...i}),r++)}),t.forEach((e,t)=>{let i=ji[r%ji.length];n.push({id:e.id||`kid-`+t,name:e.name,emoji:e.emoji||`🧒`,...i}),r++}),n.length===0&&n.push({id:`adult-0`,name:`Everyone`,emoji:`👨‍👩‍👧`,...ji[0]}),n}function Ni(e){return!e||e===`everyone`?{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}:Mi().find(t=>t.id===e)||{id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`}}function Pi(e){return Array.isArray(e.memberIds)?e.memberIds:e.memberId?[e.memberId]:[`everyone`]}function Fi(e){return Ni(Pi(e).find(e=>e!==`everyone`)||`everyone`)}function Ii(e){let t=Pi(e);return t.includes(`everyone`)||t.length===0?`Everyone`:t.map(e=>Ni(e).name).join(`, `)}function Li(){let e=C.planner?.events||[];return Oi.size===0?e:e.filter(e=>{let t=Pi(e);return t.includes(`everyone`)?!0:[...Oi].some(e=>t.includes(e))})}function Ri(e){return Li().filter(t=>t._recurringSourceId?t.date===e:t.recurrence&&t.recurrence.type!==`one_time`?pr(t.recurrence,e):t.endDate&&t.endDate>t.date?e>=t.date&&e<=t.endDate:t.date===e)}function zi(e){if(!e)return``;let[t,n]=e.split(`:`).map(Number);return`${t%12||12}:${String(n).padStart(2,`0`)}${t>=12?`pm`:`am`}`}var Bi=new Date().toISOString().slice(0,7);function Vi(){let e=document.getElementById(`forecast-content`);if(!e)return;let t=(C.planner?.events||[]).filter(e=>e.date&&e.date.startsWith(Bi)),n=V(Bi),r=K(n.income)-K(n.expenses),[i,a]=Bi.split(`-`).map(Number),o=new Date(i,a,0).getDate(),s=[],c=1;for(;c<=o;){new Date(i,a-1,c);let e=c;for(;e<o&&new Date(i,a-1,e+1).getDay()!==1;)e++;s.push({start:c,end:e,events:[]}),c=e+1}t.sort((e,t)=>e.date.localeCompare(t.date)).forEach(e=>{let t=parseInt(e.date.split(`-`)[2]),n=s.find(e=>t>=e.start&&t<=e.end);n&&n.events.push(e)}),t.filter(e=>e.estimates&&e.estimates.length>0);let l=t.filter(e=>!e.estimates||e.estimates.length===0),u=t.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),d=r-u,f=new Date(i,a-1).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`}),p=!!localStorage.getItem(`toto_ai_key`),m=`
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
    </div>`;if(t.length===0){m+=`<div class="empty" style="margin-top:24px"><div class="empty-icon">📅</div><p>No events planned for ${f}. Add events in the Planner tab.</p>
      <button class="btn btn-primary" style="margin-top:12px" onclick="activateTab('planner')">Go to Planner</button></div>`,e.innerHTML=m;return}m+=`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px">
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Estimated Total</div>
        <div style="font-size:22px;font-weight:800;color:var(--danger)">${W(u)}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Budget Surplus</div>
        <div style="font-size:22px;font-weight:800;color:${r>=0?`var(--success)`:`var(--danger)`}">${W(Math.abs(r))}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">${d>=0?`Remaining After Events`:`Shortfall`}</div>
        <div style="font-size:22px;font-weight:800;color:${d>=0?`var(--success)`:`var(--danger)`}">${d>=0?``:`-`}${W(Math.abs(d))}</div>
      </div>
      <div style="background:var(--surface2);border-radius:var(--radius);padding:16px 18px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:4px">Events</div>
        <div style="font-size:22px;font-weight:800">${t.length}</div>
        ${l.length>0?`<div style="font-size:11px;color:var(--warning);margin-top:2px">${l.length} not yet estimated</div>`:``}
      </div>
    </div>`,s.forEach((e,t)=>{if(e.events.length===0)return;let n=e.events.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),r=new Date(i,a-1,e.start).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`}),o=new Date(i,a-1,e.end).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});m+=`
      <div class="section" style="margin-bottom:16px">
        <div class="section-header">
          <div>
            <div class="section-title">Week ${t+1}</div>
            <div class="section-subtitle">${r} – ${o}</div>
          </div>
          <span style="font-size:15px;font-weight:700;color:${n>0?`var(--danger)`:`var(--text-muted)`}">${n>0?W(n):`No estimates`}</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Event</th><th>Category</th><th class="amount">Estimated</th><th></th></tr></thead>
            <tbody>
              ${e.events.map(e=>{let t=$[e.category]||$.other,n=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),r=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{weekday:`short`,day:`numeric`}),i=e.estimates&&e.estimates.length>0;return`<tr>
                  <td style="font-weight:600;color:var(--primary);white-space:nowrap">${r}</td>
                  <td style="font-weight:500">${R(e.title)}</td>
                  <td><span style="display:inline-block;padding:2px 8px;border-radius:99px;background:${t.color};color:${t.text};font-size:11px;font-weight:600">${t.label}</span></td>
                  <td class="amount" style="font-weight:600;${i?``:`color:var(--text-muted)`}">${i?W(n):`—`}</td>
                  <td style="text-align:right">
                    ${i?`<details style="font-size:11px;color:var(--text-muted)"><summary style="cursor:pointer">breakdown</summary>
                          <div style="padding:4px 0">${e.estimates.filter(e=>e.accepted).map(e=>`<div style="display:flex;justify-content:space-between;gap:12px;padding:2px 0"><span>${R(e.name)}</span><span>${W(e.amount)}</span></div>`).join(``)}</div>
                        </details>`:p?`<button class="btn btn-sm" style="font-size:11px" onclick="estimatePlannerEvent('${e.id}')">Estimate</button>`:`<span style="font-size:11px;color:var(--text-muted)">No API key</span>`}
                  </td>
                </tr>`}).join(``)}
            </tbody>
          </table>
        </div>
      </div>`});let h={};t.forEach(e=>{(e.estimates||[]).filter(e=>e.accepted).forEach(e=>{let t=e.category||`Other`;h[t]=(h[t]||0)+(e.amount||0)})});let g=Object.entries(h).sort((e,t)=>t[1]-e[1]);g.length>0&&(m+=`
      <div class="section">
        <div class="section-header"><div class="section-title">By Category</div></div>
        <div style="padding:16px 20px">
          ${g.map(([e,t])=>{let n=u>0?t/u*100:0;return`<div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                <span style="font-weight:500">${e}</span>
                <span style="font-weight:600">${W(t)} <span style="font-weight:400;color:var(--text-muted)">${Math.round(n)}%</span></span>
              </div>
              <div style="height:6px;background:var(--border);border-radius:4px;overflow:hidden">
                <div style="height:100%;width:${n.toFixed(1)}%;background:#0891b2;border-radius:4px"></div>
              </div>
            </div>`}).join(``)}
        </div>
      </div>`),e.innerHTML=m}function Hi(){let e=document.getElementById(`planner-content`);if(!e)return;C.planner||(C.planner={events:[]});let t=new Date().toISOString().slice(0,10),n=Mi(),r={id:`everyone`,name:`Everyone`,emoji:`👨‍👩‍👧`,dot:`#94a3b8`,bg:`#f1f5f9`,text:`#475569`},i=[...n,r],a=i.map(e=>e.name[0].toUpperCase()),o=i.map((e,t)=>{if(e.id===`everyone`)return`👨‍👩‍👧`;let n=e.name[0].toUpperCase();return a.filter(e=>e===n).length>1?(e.name[0]+(e.name[1]||``)).toUpperCase():n}),s=i.map((e,t)=>{let n=e.id===`everyone`,r=n?Oi.size===0:Oi.has(e.id),i=!r&&Oi.size>0&&!n,a=n?`<span style="font-size:14px">👨‍👩‍👧</span>`:`<span>${o[t]}</span>`;return`<div class="pl-legend-chip ${r?`active`:``} ${i?`dimmed`:``}"
      onclick="_plannerToggleFilter('${e.id}')">
      <div class="pl-chip-avatar" style="background:${e.bg};color:${e.text}">${a}</div>
      <span>${e.name}</span>
    </div>`}).join(``),c=``;c=Di===`month`?Ui():Wi();let l=new Date;l.setDate(l.getDate()+30);let u=l.toISOString().slice(0,10),d=Li().filter(e=>e.date>=t&&e.date<=u),f=0,p=Object.entries($).map(([e,t])=>{let n=d.filter(t=>t.category===e);n.length&&(f+=n.length);let r=n[0],i=r?R(r.title)+(r.date?` · ${new Date(r.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`})}`:``):`Nothing planned`;return`<div class="pl-life-tile" onclick="_plannerOpenLifeSheet('${e}')">
      <div class="pl-life-tile-top">
        <div class="pl-life-tile-icon" style="background:${t.color||`#F4F4F5`}">${t.emoji}</div>
        <div>
          <div class="pl-life-tile-name">${t.label}</div>
          <div class="pl-life-tile-count">${n.length} event${n.length===1?``:`s`}</div>
        </div>
      </div>
      <div class="pl-life-tile-next">${i}</div>
    </div>`}).join(``),m=Ki(),h=m.map(e=>{let t=e.days<0?`Now!`:e.days===0?`Today!`:e.days===1?`Tomorrow`:`In ${e.days} days`,n=e.days<=0?`#ef4444`:e.days===1?`var(--good)`:e.days<=3?`#f59e0b`:`var(--iris-1)`;return`<div class="pl-nudge-tile">
      <div class="pl-nudge-tile-icon" style="background:${e.days<=0?`#FEF2F2`:e.days===1?`#ECFDF5`:e.days<=3?`#FFF7ED`:`#EEF2FF`}">${e.emoji}</div>
      <div class="pl-nudge-tile-body">
        <div class="pl-nudge-tile-title">${R(e.title)}</div>
        <div class="pl-nudge-tile-sub">${R(e.body)}</div>
      </div>
      <div class="pl-nudge-tile-day" style="color:${n}">${t}</div>
    </div>`}).join(``),g=ki[`life-areas`],_=ki.nudge,v=t.slice(0,7);new Date().toLocaleDateString(`en-AU`,{weekday:`long`,month:`long`,day:`numeric`}),e.innerHTML=`
    <div style="position:relative;display:flex;flex-direction:column;height:100%;overflow:hidden">

      <!-- Month bar (wallet style) -->
      <div class="pl-month-bar">
        <button class="pl-nav-arrow" onclick="_plannerPrevMonth()">&#8249;</button>
        <div class="pl-month-label">${new Date(Ti+`-01`).toLocaleDateString(`en-AU`,{month:`long`,year:`numeric`})}</div>
        <button class="pl-nav-arrow" onclick="_plannerNextMonth()">&#8250;</button>
      </div>

      <!-- Filter tile: view toggle + members + calendar strip -->
      <div class="pl-control-tile">
        <div class="pl-sub-bar">
          <div class="pl-view-toggle">
            <button class="pl-view-btn ${Ti===v&&Ei===t?`active`:``}" onclick="_plannerGoToday()">Today</button>
            <button class="pl-view-btn ${Di===`week`?`active`:``}" onclick="_plannerSetView('week')">Week</button>
            <button class="pl-view-btn ${Di===`month`?`active`:``}" onclick="_plannerSetView('month')">Month</button>
          </div>
          <button class="pl-add-btn" onclick="openPlannerModal(null,'${Ei||t}')">+</button>
        </div>
        <div class="pl-legend">${s}</div>
        ${Di===`month`?`
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
        ${Gi(Ei)}

        <!-- Life areas -->
        <div class="pl-section-card">
          <div class="pl-section-card-hdr" onclick="_plannerToggleSection('life-areas')">
            <div class="pl-section-card-title">
              Life Areas
              <span style="font-size:11px;font-weight:700;background:var(--iris-1);color:#fff;padding:1px 8px;border-radius:99px;letter-spacing:0">${f}</span>
            </div>
            <button class="pl-section-card-toggle">${g?`Hide`:`Show`}</button>
          </div>
          ${g?`<div class="pl-section-card-body"><div class="pl-life-grid">${p}</div></div>`:``}
        </div>

        <!-- Nudges -->
        ${m.length>0?`
        <div class="pl-section-card">
          <div class="pl-section-card-hdr" onclick="_plannerToggleSection('nudge')">
            <div class="pl-section-card-title">
              Heads up 🐕
              <span style="font-size:11px;font-weight:700;background:#f59e0b;color:#fff;padding:1px 8px;border-radius:99px;letter-spacing:0">${m.length}</span>
            </div>
            <button class="pl-section-card-toggle">${_?`Hide`:`Show`}</button>
          </div>
          ${_?`<div class="pl-section-card-body">${h}</div>`:``}
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
            <button class="pl-sheet-add" id="pl-sheet-add-btn" data-date="${Ei}" onclick="_plannerOpenModalFromSheet()">+ Add</button>
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

    </div>`}function Ui(){let[e,t]=Ti.split(`-`).map(Number),n=new Date().toISOString().slice(0,10),r=new Date(e,t-1,1).getDay(),i=r===0?6:r-1,a=new Date(e,t,0).getDate(),o=new Date(e,t-1,0).getDate(),s=[];for(let n=i-1;n>=0;n--){let r=o-n,i=t-1||12,a=i===12?e-1:e;s.push({dateStr:`${a}-${String(i).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`,day:r,muted:!0})}for(let n=1;n<=a;n++)s.push({dateStr:`${e}-${String(t).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,day:n,muted:!1});let c=s.length%7==0?0:7-s.length%7;for(let n=1;n<=c;n++){let r=t+1>12?1:t+1,i=r===1?e+1:e;s.push({dateStr:`${i}-${String(r).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,day:n,muted:!0})}return`<div class="pl-month-grid">${s.map(e=>{let t=e.dateStr===n,r=e.dateStr===Ei,i=e.dateStr?Ri(e.dateStr):[],a=[...new Set(i.flatMap(e=>Pi(e)))].filter(e=>e!==`everyone`).slice(0,3).map(e=>`<div class="pl-cell-dot" style="background:${Ni(e).dot}"></div>`).join(``),o=i.length>3?`<div style="font-size:8px;color:var(--text-muted);font-weight:600">+</div>`:``;return`<div class="pl-cal-cell ${e.muted?`muted`:``} ${t?`today`:``} ${r?`selected`:``}"
                 onclick="_plannerSelectDay('${e.dateStr}')">
      <div class="pl-cell-num">${e.day}</div>
      <div class="pl-cell-dots">${a}${o}</div>
    </div>`}).join(``)}</div>`}function Wi(){let e=new Date(Ei+`T12:00:00`),t=e.getDay(),n=new Date(e);n.setDate(e.getDate()-(t===0?6:t-1));let r=new Date().toISOString().slice(0,10),i=[`S`,`M`,`T`,`W`,`T`,`F`,`S`];return`<div class="week-strip">${Array.from({length:7},(e,t)=>{let r=new Date(n);return r.setDate(n.getDate()+t),{date:r,dateStr:r.toISOString().slice(0,10)}}).map(({date:e,dateStr:t})=>{let n=t===r,a=t===Ei,o=Ri(t),s=o.length>0,c=[...new Set(o.flatMap(e=>Pi(e)))].filter(e=>e!==`everyone`).slice(0,3),l=a?`rgba(255,255,255,0.6)`:c.length?Ni(c[0]).dot:`#C4C2D4`;return`<div class="${a?`ws-day selected`+(n?` today-outline`:``):n?`ws-day today-outline`:`ws-day`}${s?` has`:``}" onclick="_plannerSelectDay('${t}')">
      <div class="ws-init">${i[e.getDay()]}</div>
      <div class="ws-num">${e.getDate()}</div>
      <div class="ws-dot" style="${s?`background:${l}`:``}"></div>
    </div>`}).join(``)}</div>`}function Gi(e){let t=new Date(e+`T12:00:00`),n=e===new Date().toISOString().slice(0,10)?`Today`:t.toLocaleDateString(`en-AU`,{weekday:`long`}),r=t.toLocaleDateString(`en-AU`,{day:`numeric`,month:`long`,year:`numeric`}),i=Ri(e).sort((e,t)=>e.allDay&&!t.allDay?-1:!e.allDay&&t.allDay?1:(e.time||`99:99`).localeCompare(t.time||`99:99`)),a=``;return a=i.length===0?`<div class="pl-agenda-empty">Nothing planned — enjoy the quiet ☀️<br><span style="color:var(--iris-1);cursor:pointer;font-weight:600;font-size:13px" onclick="openPlannerModal(null,'${e}')">+ Add an event</span></div>`:`<div class="pl-agenda-list">${i.map(t=>{let n=Fi(t),r=$[t.category]||$.other,i=t.allDay||!t.time?`All day`:zi(t.time),a=Ii(t),o=new Date().getHours()*60+new Date().getMinutes(),s=t.time?parseInt(t.time.split(`:`)[0])*60+parseInt(t.time.split(`:`)[1]):-1,c=e===new Date().toISOString().slice(0,10)&&s>=0&&o>=s&&o<s+90,l=r.color||`#f1f5f9`,u=r.text||`#475569`;return`<div class="pl-agenda-ev">
        <div class="pl-agenda-time-col">
          <span class="pl-agenda-time">${i}</span>
        </div>
        <div class="pl-agenda-timeline">
          <div class="pl-agenda-dot${c?` now`:``}" style="color:${u};background:${c?u:l}"></div>
          <div class="pl-agenda-line"></div>
        </div>
        <div class="pl-agenda-card" style="background:${l};border-color:${u}22" onclick="_plannerOpenDetail('${t.id}')">
          <div class="pl-agenda-card-title">${R(t.title)}</div>
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
  </div>`}function Ki(){function e(e){return Math.ceil((e-new Date().setHours(0,0,0,0))/864e5)}function t(e,t,n,r){let i=new Date(e,t,1);for(;i.getDay()!==n;)i.setDate(i.getDate()+1);return i.setDate(i.getDate()+(r-1)*7),i}let n=new Date().getFullYear();return[{emoji:`🧾`,title:`EOFY`,days:e(new Date(n,5,30)),body:`Tax time — accountant fees, donations, prepayments`},{emoji:`🎄`,title:`Christmas`,days:e(new Date(n,11,25)),body:`Gifts, travel, food — start budgeting early`},{emoji:`💐`,title:`Mother's Day`,days:e(t(n,4,0,2)),body:`Gift, brunch or dinner for Mum`},{emoji:`👔`,title:`Father's Day`,days:e(t(n,8,0,1)),body:`Gift or outing for Dad`}].filter(e=>e.days>=-3&&e.days<=60).sort((e,t)=>e.days-t.days)}function qi(e){let t=(C.budget?.suggestions||[]).filter(t=>t.month===e&&t.status===`pending`);if(!t.length)return``;let n={};t.forEach(e=>{n[e.eventTitle]||(n[e.eventTitle]=[]),n[e.eventTitle].push(e)});let r=t.map(e=>`
    <div class="suggestion-row">
      <span class="suggestion-event-tag">📅 ${R(e.eventTitle)}</span>
      <div style="flex:1;min-width:0">
        <div class="suggestion-name">${R(e.name)}</div>
        <div class="suggestion-cat">${e.category}</div>
      </div>
      <span class="suggestion-amount">${W(e.amount)}</span>
      <button class="suggestion-approve" onclick="approveSuggestion('${e.id}')">✓ Approve</button>
      <button class="suggestion-dismiss" onclick="dismissSuggestion('${e.id}')">✕</button>
    </div>`).join(``);return`<div class="suggestion-inbox">
    <div class="suggestion-inbox-header">
      <span style="font-size:16px">📥</span>
      <span class="suggestion-inbox-title">Suggested from Planner</span>
      <span class="suggestion-inbox-count">${t.length} pending</span>
    </div>
    ${r}
  </div>`}new Date().toISOString().slice(0,7);function Ji(e,t){let n=(C.planner?.events||[]).filter(t=>t.date?.slice(0,7)===e&&(t.estimates||[]).some(e=>e.accepted));if(n.length===0)return``;let r=n.reduce((e,t)=>e+(t.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),0),i=t-r,a=n.filter(e=>!e.pushed),o=n.map(e=>{let t=$[e.category]||$.other,n=(e.estimates||[]).filter(e=>e.accepted).reduce((e,t)=>e+(t.amount||0),0),r=new Date(e.date+`T12:00:00`).toLocaleDateString(`en-AU`,{day:`numeric`,month:`short`});return`<div class="forecast-row">
      <span class="forecast-ev-name">${t.emoji} ${R(e.title)}</span>
      <span class="forecast-ev-date">${r}</span>
      <span class="forecast-ev-cost">${W(n)}</span>
      ${e.pushed?`<span class="forecast-pushed">✓ In budget</span>`:e.pushed===`suggested`?`<span class="forecast-pushed" style="color:#f59e0b">⏳ Pending</span>`:`<button class="forecast-unpushed" onclick="suggestEventToBudget('${e.id}')">+ Suggest</button>`}
    </div>`}).join(``);return`<div class="forecast-widget">
    <div class="forecast-header">
      <span class="forecast-header-title">📅 Planned Events — ${W(r)} this month</span>
      ${a.length>1?`<button class="forecast-push-all" onclick="_pushAllEventsToBudget('${e}')">Suggest all to budget</button>`:``}
    </div>
    ${o}
    <div class="forecast-total">
      <span class="forecast-total-label">Forecast surplus after events</span>
      <span style="font-weight:800;font-size:15px;color:${i>=0?`#10b981`:`#ef4444`}">${W(Math.abs(i))} ${i>=0?`surplus`:`deficit`}</span>
    </div>
  </div>`}function Yi(e,t){let n=new Date(e);switch(t){case`weekly`:n.setDate(n.getDate()+7);break;case`fortnightly`:n.setDate(n.getDate()+14);break;case`monthly`:n.setMonth(n.getMonth()+1);break;case`quarterly`:n.setMonth(n.getMonth()+3);break;case`yearly`:n.setFullYear(n.getFullYear()+1);break}return n}function Xi(){if(!C.planner?.events)return;let e=C.planner.events,t=new Date;t.setHours(0,0,0,0);let n=!1,r={weekly:3,fortnightly:3,monthly:6,quarterly:12,yearly:24};e.filter(e=>e.recurring&&e.recurring!==`none`&&!e._recurringSourceId).forEach(i=>{let a=i.recurring,o=new Date(t);o.setMonth(o.getMonth()+(r[a]||12));let s=new Date(i.date+`T12:00:00`);for(;s<t;)s=Yi(s,a);let c=0;for(;s<=o&&c++<200;){let t=s.toISOString().slice(0,10);e.some(e=>e.date===t&&(e.id===i.id||e._recurringSourceId===i.id))||(e.push({id:`ev-`+Date.now()+`-r`+Math.random().toString(36).slice(2,6),title:i.title,category:i.category,date:t,notes:i.notes||``,recurring:a,_recurringSourceId:i.id,estimates:(i.estimates||[]).map(e=>({...e,id:`est-`+Date.now()+Math.random(),accepted:!0})),pushed:!1}),n=!0),s=Yi(s,a)}}),n&&me(C)}`serviceWorker`in navigator&&navigator.serviceWorker.register(`/home-budget/sw.js`,{scope:`/home-budget/`}).catch(e=>console.warn(`SW registration failed:`,e));
//# sourceMappingURL=index-DXSVfDBH.js.map
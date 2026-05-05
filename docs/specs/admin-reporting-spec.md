# TOTO Admin Reporting Dashboard — Product Spec

A private, owner-only web dashboard giving visibility into app usage, household demographics, feature adoption, retention, and product health — accessible only to authorised admin accounts via a separate URL with Firebase UID allowlist gating.

---

## 1. Overview

### What it is

A standalone admin web app (separate from the main TOTO PWA) that reads aggregated data from Firestore and presents it in a dark-mode reporting dashboard. Desktop-only. No end-user access — not linked from the app.

### What it answers

- **How many households are using TOTO?** Growth over time, actives, churn.
- **Who are our users?** Household size, kids vs no-kids, adult count, geo.
- **What features do they use?** Adoption per section, depth of engagement.
- **Are they coming back?** DAU/WAU/MAU, session frequency, streak data.
- **Where do they drop off?** Feature funnel, setup completion rates.
- **How is Type A Mode performing?** Adoption rate, average life score, mission completion.

### What it is NOT

- Not visible to end users — zero UI exposure in the main app.
- Not real-time — aggregated snapshots updated on a schedule, not live streaming.
- Not individual user surveillance — data is anonymised and aggregated at the household level.
- Not a customer support tool — no ability to edit user data from this interface.
- Not a separate mobile app — desktop web only, designed for 1200px+ screens.

---

## 2. Access Control

The dashboard must be inaccessible to anyone who isn't an authorised application owner. Three layers of protection.

### Layer 1 — Separate URL + no app link

- Hosted at a separate subdomain: `admin.toto.app` (or a path like `toto.app/admin`). Not linked from anywhere in the main app.
- Security-by-obscurity is not the primary defence — it just means the URL isn't discoverable from the app itself.

### Layer 2 — Firebase UID allowlist

- A Firestore collection `admin_users/{uid}` contains the allowlisted UIDs of application owners.
- On load, the dashboard checks `fbStore.collection('admin_users').doc(currentUser.uid).get()`. If the document doesn't exist → redirect to a blank denial page.
- New admin accounts added manually by editing Firestore directly — no self-serve registration.

### Layer 3 — Firestore security rules

- The `analytics_snapshots` and `admin_users` collections have Firestore rules that deny reads to any UID not in `admin_users`. Even if someone guesses the URL and is authenticated, they cannot read the data.
- Rule pattern: `allow read: if exists(/databases/$(database)/documents/admin_users/$(request.auth.uid));`
- The `families` collection (individual user data) is **never** read by the admin dashboard directly — only the pre-aggregated `analytics_snapshots` collection is read.

---

## 3. Data Model

No new data is collected from users without consent. All metrics are derived from the existing `families/{uid}` documents that already exist in Firestore. A scheduled Cloud Function aggregates them nightly into a separate collection.

### Source data: `families/{uid}` (already exists)

- `state.householdProfile` — member count, adult names, kids count
- `state.settings` — typeAMode, typeAStreak, language, setup dismissed
- `state.bills`, `state.budget`, `state.goals` — wallet feature usage
- `state.planner.events` — planner engagement (count, recency)
- `state.routines`, `state.routineAssignments` — routine adoption + streak
- `state.kids.profiles` — kids zone adoption
- `state.lists` — shopping list adoption
- `state.maintenance`, `state.vehicles`, `state.documents` — home section usage

### Output snapshots: `analytics_snapshots/{date}`

Aggregated nightly by a Firebase Cloud Function that reads all family documents and writes a single daily snapshot document. No raw user data is exposed.

- `totalHouseholds` — count of all family docs
- `activeThisWeek` — families with a Firestore update timestamp in last 7 days
- `featureAdoption` — % of households using each section (bills, planner, kids, lists etc)
- `demographics` — household size distribution, kids/no-kids split, avg adult count
- `typeAStats` — adoption rate, avg life score, avg streak, mission completion rate
- `setupFunnel` — % completing each setup step

### Event tracking (requires a small app change)

The current app has **no event tracking**. To get session frequency, DAU, and screen views, lightweight event writes are needed. Two options:

- A simple `analytics_events` Firestore subcollection under each family doc, written on key actions (session start, tab activate, feature used). Adds ~2KB/month per active household.
- **Recommended:** Integrate **Firebase Analytics** (free, already in the Firebase SDK bundle). Gives session data, screen views, and custom events without writing to Firestore — zero cost, no extra Firestore writes.

**Privacy:** Add a one-line disclosure to the app's sign-up flow: "We collect anonymous usage data to improve TOTO." No personal data (names, financial figures) is included in events.

---

## 4. Usage Reports (Reports 1–6)

Six core report sections accessible via the dashboard sidebar.

### Report 1: Overview

Top-line health metrics. First screen after login. Shows the state of the product at a glance.

**Metrics shown:**
- Total households
- Active this week (WAU)
- New this month
- 7-day retention
- Avg session / week
- Type A adoption %
- Growth chart (90 days)
- Feature adoption bar chart

---

### Report 2: Demographics

Who is using TOTO. Household composition breakdown.

**Metrics shown:**
- Household size distribution (1, 2, 3, 4, 5+)
- Kids vs no-kids split (donut chart)
- Avg number of kids per family household
- Adult-only households %
- Setup completion funnel
- Sign-in method (Google vs anonymous)

---

### Report 3: Engagement

How often and how deeply users engage. Session activity and retention cohorts.

**Metrics shown:**
- DAU / WAU / MAU trend
- Activity heatmap (day × hour)
- Sessions per household per week
- 30-day retention cohort table
- Avg screens per session
- Most active time of day

---

### Report 4: Feature Adoption

Which sections are being used and how deeply. Ranked by adoption rate.

**Metrics shown:**
- % households using each section
- Avg items per section (e.g. avg bills, avg events)
- Shopping list active households
- Planner events created this month
- Routine completion rate
- Kids zone activation %
- AI quick-add usage

---

### Report 5: Type A Mode

Deep dive into the Type A feature — the most differentiating part of the product.

**Metrics shown:**
- Type A enabled % (of all households)
- Average Life Score (current)
- Life Score distribution histogram
- Per-dimension average scores
- Weekly reset completion rate
- Average streak length
- Most common mission assigned
- Mission completion vs skip rate

---

### Report 6: Households (Raw Table)

Anonymised list of all households for debugging, support, and data auditing. No names or financial data.

**Columns shown:**
- Household ID (uid hash)
- Created date
- Last active
- Member count
- Features enabled (flags)
- Type A on/off
- Life Score
- Setup %

---

## 5. Data Reports (Reports 7–12)

Six additional reports that treat the data TOTO holds as the subject, not the user behaviour. Inspired by how Meta, Google, and Stripe report internally — understanding the completeness, quality, and commercial value of the data asset itself.

### Report 7: Data Completeness

How rich is each household's data profile? A household with income + expenses + goals + kids + planner + maintenance is a high-value user. One with only bills is shallow. This drives product decisions about where to invest onboarding energy.

**Metrics shown:**
- Data richness score per household (0–100)
- Score distribution histogram
- Average completeness by data category
- % households with income set up
- % with goals
- % with 3+ months of actuals
- Completeness vs retention correlation
- Households with only 1 data category (at-risk)

---

### Report 8: Financial Health Aggregate

Anonymised aggregate view of the financial patterns across all households. No individual data exposed — purely distribution and averages. Commercially valuable for partnerships, product direction, and understanding what financial stress looks like in the user base.

**Metrics shown:**
- Average monthly surplus/deficit
- Surplus vs deficit household split
- Top 5 expense categories by frequency
- Average household income band (bucketed, not exact)
- Average savings goal target amount
- Average net worth (households that set it up)
- Most common bill types tracked
- Average bills per household

---

### Report 9: Behavioural Cohorts

Segment users by how they use the product, not who they are. Four cohorts: **Power Users**, **Planners**, **Budgeters**, and **Drifters**. Knowing which cohort is growing — and what triggers cohort upgrades — is the most actionable product signal available.

**Metrics shown:**
- Cohort size + trend (Power / Planner / Budgeter / Drifter)
- Cohort definition criteria
- Cohort migration rate (Drifter → Budgeter etc)
- Feature combinations by cohort
- Type A adoption by cohort
- Retention rate by cohort
- Which features trigger cohort upgrades

---

### Report 10: Lifecycle & Churn

Where in the user journey do households go quiet? Day 1 → 7 → 30 → 90 cohort retention analysis. Which features are leading indicators of long-term retention? This is the most actionable report for reducing churn and improving onboarding.

**Metrics shown:**
- Cohort retention table (D1 / D7 / D30 / D90)
- Median time to first return visit
- Drop-off point analysis (where users go quiet)
- Feature correlation with 30-day retention
- Churned households — last feature used
- Re-activation rate (returned after 30d+ gap)
- Average household lifespan

---

### Report 11: Data & Privacy Audit

What data does TOTO hold, how old is it, and what would a privacy data request look like? Required for GDPR / Australian Privacy Act compliance. Meta reports extensively on this — number of data categories, data age, deletion rates. Essential before any commercial partnership or app store review.

**Metrics shown:**
- Data categories held per household (count)
- Average data age (days since last write)
- Stale households (no write in 90d+)
- Estimated data volume per household (KB)
- Authentication method breakdown
- Anonymous vs authenticated users
- Data deletion request readiness
- Oldest data in the system

---

### Report 12: Commercial Signal

Which users show the strongest signals of willingness to pay? Households with high data richness, Type A enabled, goals set, and consistent weekly engagement are the best monetisation candidates. This report is the bridge between product usage and revenue strategy.

**Metrics shown:**
- High-value user count (richness score > 70)
- Monetisation readiness score per household
- Features most correlated with payment intent
- Type A + high richness overlap (prime upsell cohort)
- Weekly reset completers (highest engagement signal)
- Estimated revenue potential at $X/mo price point
- Feature gap analysis (what would premium unlock)

---

## 6. Implementation Path

Three phases — data collection, aggregation, and the dashboard itself.

### Phase 1 — Add Firebase Analytics (1–2 hours)

The fastest way to get session data, screen views, and DAU/WAU/MAU without writing any Firestore data.

- Add `firebase-analytics-compat.js` to the existing Firebase SDK imports in `index.html`. Already included in the free Firebase plan.
- Call `firebase.analytics().logEvent('screen_view', {screen_name: tab})` inside `activateTab()`. That's one line.
- Firebase console gives DAU/WAU/MAU, session length, and screen flows automatically with no further code.
- Add a consent note to the sign-up screen: "We collect anonymous usage analytics to improve TOTO."

### Phase 2 — Nightly aggregation Cloud Function (1 day)

A Firebase Cloud Function that runs nightly, reads all `families/*` documents, and writes a single aggregated snapshot to `analytics_snapshots/{YYYY-MM-DD}`.

- Scheduled with `functions.pubsub.schedule('every 24 hours')`.
- Reads all family docs, counts households by type (kids/no-kids/solo), calculates feature adoption flags, averages Life Scores for Type A households.
- Writes one document per day — keeps history automatically. 365 documents per year at ~5KB each = negligible cost.
- Firestore security rules on `analytics_snapshots` restrict reads to `admin_users` UIDs only.

### Phase 3 — Admin dashboard (2–3 days)

A separate static HTML file (or lightweight React app) hosted at `admin.toto.app`. Reads from `analytics_snapshots`. Uses the same Firebase project and auth.

- Single HTML file approach mirrors the main app — no build step, deploy to Firebase Hosting.
- On load: check `admin_users/{uid}` → deny or allow. If allowed, load last 90 days of snapshots and render charts.
- Charts rendered with SVG (no library needed for bar/line charts at this scale) or a lightweight library like `Chart.js` (~60KB).
- Export buttons write CSV using `Blob` + `URL.createObjectURL` — no server needed.
- **Total Firebase cost:** Cloud Function runs once/day (~$0.00 on Spark plan). Firestore reads for the dashboard: ~100 reads per session (~$0.003). Effectively free.

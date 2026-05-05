# Toto — Feature Ideas

> **The vision:** "The first application someone interacts with when they wake up."

To achieve this, Toto must shift from a household *tracker* — something you open when you need to update something — to a household *briefing*: something that tells you what today looks like before the chaos starts.

---

## Priority Key

| Tag | Meaning |
|-----|---------|
| 🔴 Do first | Unlocks the vision |
| 🟡 Do next | High daily frequency |
| 🔵 Do later | High value, lower urgency |
| 🟢 Long-term | Differentiating |

---

## Why "First App" Requires a Different Approach

Toto is currently excellent at **tracking** — money, tasks, home, kids. But tracking is reactive. You open it when something needs updating. That's a weekly or monthly habit, not a daily one.

The apps people open first thing every morning share one trait: they **tell you something you need to know right now**. Weather tells you how to dress. Calendar tells you what's happening today. Messages tell you what you missed. They reduce cognitive load before the day begins.

| Toto today — reactive | Toto with vision — proactive |
|-----------------------|------------------------------|
| You open it to log a bill | You open it to see what today holds |
| You open it to check a goal | You open it to check tonight's dinner |
| You open it to update a chore | You open it because your kids need to |
| **Weekly or monthly habit** | **Daily — first thing every morning** |

> **The pattern:** Every feature idea below was evaluated against one question — does it create a reason to open Toto every single morning? The features that answer yes most strongly are marked "Do first".

---

## 🔴 1. The "Today" Screen — Morning Dashboard

*A single screen that tells you everything you need to start the day.*

The single most important addition. One screen — personalised per adult — that digests everything relevant to *today* and surfaces it in one place. It replaces five different mental checks people currently do across five different apps in the first 10 minutes of their morning.

- 🌤️ **Weather:** Temperature, conditions, and a simple note if it affects plans — "Mia has swimming, pack a towel"
- 📅 **Today's schedule:** Everyone's appointments, school events, and activities pulled from the shared calendar
- 🍝 **Tonight's dinner:** Pulled from the meal plan with a tap to view the recipe or shopping list
- 📋 **Kids' chores due today:** Which kid has what outstanding — tap to open their chore view
- 💸 **Financial alerts:** Bills due today or in the next 3 days, any budget category close to its limit
- ⏳ **Adult tasks with deadlines:** Any task due today for either adult, without revealing private details
- 🎉 **Celebrations:** Birthdays, anniversaries, countdowns — gives the screen a positive emotional tone
- ⚠️ **Gentle alerts:** Vehicle rego expiring, document due for renewal, upcoming project stage payment

> **This is the entry point.** Every other feature idea in this document feeds content into the Today screen. Build this first, even with placeholder sections, so users have a reason to open Toto every morning from day one. The other features fill it in over time.

---

## 🔴 2. Shared Family Calendar

*The most glaring gap — without this, people will always open their phone calendar first.*

Toto has a planner but not a true shared family calendar. This is the most significant missing feature given the vision. A shared calendar is the backbone of household coordination — it's what everyone needs to see every single morning.

- 👨‍👩‍👧‍👦 **Per-person colour coding:** Each household member has a colour — overlay everyone's events to see where the day gets complex
- 🔄 **Two-way sync with phone calendar:** Import from Google Calendar and Apple Calendar so users don't have to re-enter what's already there
- 🏫 **School term dates:** Add the school calendar so term breaks, pupil-free days, and events are visible to both adults automatically
- 🔁 **Recurring events:** Weekly sport, fortnightly piano lesson, monthly date night — set once, appears every time
- ☀️ **Feeds the Today screen:** Today's events pull directly from this calendar — it's the source of truth for the morning briefing
- 💸 **Budget-aware events:** Tag an event with a cost estimate ("Mia's school camp — $180") so it shows in the financial forecast

> **Why this can't be skipped:** Without a shared calendar, the Today screen has no schedule data. Without a schedule, Toto can't be a morning app — people will always open their phone calendar first, which means Toto is never first. The calendar and the Today screen are co-dependent.

---

## 🔴 3. Shared Shopping List

*The highest-frequency daily touchpoint in any household.*

A real-time shared shopping list is one of the most frequent daily interactions in any household. Right now Toto has a shopping list buried inside Meals but it's tied to the meal plan. A standalone, always-accessible list — available from the Today screen and the nav — would create a daily reason to open Toto even when nothing financial is happening.

- ⚡ **Quick-add from anywhere:** Add "milk" in two taps from the Today screen, without navigating to Meals
- 🍝 **Auto-populate from meal plan:** When tonight's dinner is set, the missing ingredients are automatically added to the list
- 🔄 **Real-time sync:** Both adults see additions and tick-offs instantly — no more "I already got that" moments
- 🏪 **Aisle grouping:** Group items by supermarket section (produce, dairy, bakery) to speed up the shop
- 📋 **Saved favourites:** Items bought regularly appear as quick-add suggestions — "the usual" list auto-loads
- 💰 **Estimated total:** Optional price estimates per item give a rough trolley total before checkout

---

## 🔴 4. Morning & Evening Routines

*Checklists that reset daily — especially for chaotic school mornings.*

School mornings are chaotic. A routine checklist that resets each day and is shared between both adults would be checked every single morning without fail. This is perhaps the purest expression of the "first app you open" vision — it literally helps you get out the door.

- 🎒 **Per-child school morning checklist:** Lunch packed, bag packed, signed permission form in bag, sports gear, instrument — customisable per child, resets every school day
- 👩‍💼 **Adult morning routine:** Personal checklist — "take medication", "check emails before 9am", "school payment due today" — private per adult
- 🌙 **Evening routine:** "Pack tomorrow's lunches", "check tomorrow's schedule", "put bins out" — prompts at a set time each evening
- 📅 **Day-aware variations:** Monday routine vs Friday routine can differ — "Music on Thursdays, pack recorder"
- 🔔 **Leave-time alert:** "School starts at 8:45 — leave in 12 minutes" calculated from home address and school location

> **Why this drives the morning habit:** A parent who opens Toto to tick off the school morning checklist is opening it every single day. Once that habit exists, the Today screen, shopping list, and everything else gets seen daily for free.

---

## 🟡 5. Health & Medical Hub

*Family health records, medication reminders, and appointment tracking.*

Families have a surprising amount of health admin — immunisation schedules, prescription refills, GP appointments, allergy records, insurance details. This information currently lives across a GP's patient portal, a notes app, the fridge, and memory. Centralising it in Toto would be genuinely useful and creates morning engagement through medication reminders.

- 💊 **Medication reminders:** Daily push notifications for prescriptions, vitamins, or supplements — morning reminders drive daily app opens
- 💉 **Vaccination records:** Per-person immunisation history with due-date reminders for next scheduled vaccines
- 🩺 **Appointment tracker:** GP, dentist, specialist visits stored per person and fed into the shared calendar
- 🚨 **Allergy & condition records:** Quick-reference card per family member — critical for school camps, emergencies, new carers
- 🔁 **Prescription refill reminders:** "Riley's asthma puffer is almost due for a refill" based on days supply entered at fill time
- 📋 **Linked to Home documents:** Health insurance card, Medicare card, and private health details stored in the existing Documents section

---

## 🟡 6. Family Noticeboard / Message Thread

*Household communication in one place, separate from personal messages.*

Household logistics currently pollute personal message threads. "Can you grab bread", "Don't forget Mia has swimming", "I paid the electricity" — these messages matter to the whole household but get lost in individual chats. A dedicated family thread keeps household communication visible to everyone who needs it, with a shared record.

- 💬 **Household thread:** A single shared message thread for all adults — not a replacement for iMessage, but a dedicated household channel
- 📌 **Pinned notes:** Important messages can be pinned to the top — "School is closed Friday", "Don't forget Sam's birthday dinner Saturday"
- ⚡ **Quick reactions:** Thumbs up / thumbs down / 👀 reactions so you can acknowledge without a full reply
- 🔗 **Linked to Toto items:** Share a bill, a chore, or an event directly into the thread — "This week's budget is tight, see here →"
- 👶 **Kid-visible announcements:** Optionally push a pinned note to kids' Today screens — "Family movie night tonight 🍿"

> **Scope note:** This should be a simple notice board, not a full chat app. The value is in the dedicated context — household messages that don't get buried in personal threads — not in feature parity with WhatsApp.

---

## 🟡 7. Pet Management

*Vet records, medication, and care reminders for family pets.*

Most families with children also have pets. Pets have their own admin — vet appointments, flea and worming schedules, medication, grooming, insurance. Currently completely absent from Toto. A Pets section under Home would be immediately relevant to a large portion of the target audience and creates recurring reminders that bring people back to the app.

- 🐶 **Pet profiles:** Name, breed, date of birth, microchip number, insurance details — one card per pet
- 💊 **Medication & treatment reminders:** Monthly flea and worming schedules with push reminders — drives regular app opens
- 🩺 **Vet appointment history:** Log of visits, vaccinations, and next due dates — linked to the shared calendar
- 📋 **Care notes:** Feeding schedule, dietary requirements, emergency vet contact — accessible to babysitters and pet sitters
- 💰 **Pet costs tracked:** Vet bills, food, grooming logged as a budget category — surfaces the true cost of pet ownership

---

## 🟡 8. Countdowns & Celebrations

*Emotional engagement — Toto should feel good to open, not just informative.*

Toto should feel good to open, not just informative. A countdowns feature on the Today screen gives it a positive emotional tone in the morning. "57 days until Bali 🌴" alongside the bills and chores changes how the app feels to start your day. Over time it becomes a place that makes you feel excited about your life, not just managed by it.

- 🌴 **Holiday countdown:** Linked to a calendar event — "57 days until Bali". The savings goal for that holiday can be linked too
- 🎂 **Birthday reminders:** Family birthdays surfaced 7 days ahead on the Today screen — never forget a birthday again
- 💍 **Anniversaries:** Wedding anniversary, dating anniversary — quietly noted on the Today screen the morning of
- 🏆 **Milestone celebrations:** When a savings goal is hit, a project stage is paid, or a budget category stays green for a month — a small celebration moment
- 🗓️ **Family bucket list:** A list of things the family wants to do — "Great Barrier Reef", "camping trip", "learn to ski". Tick them off as they happen

> **Why this matters for the vision:** People open Instagram and TikTok first thing because those apps make them feel something. Toto needs to compete with that emotional pull. Countdowns and celebrations give the app a positive, forward-looking energy that purely functional apps lack. It's the difference between a tool and something you actually want to open.

---

## 🔵 9. Receipt Capture & Real-Time Spending

*Close the gap between tracked and actual — without manual entry.*

Currently, actuals have to be entered manually or imported via CSV. This creates a lag between reality and the budget — and a budget you don't trust is a budget you stop checking. Camera-based receipt capture or bank feed integration would close that gap and make the Insights section genuinely reliable.

- 📸 **Camera receipt scan:** Point the camera at a receipt, AI extracts the merchant, total, and date, and suggests the right budget category
- 🏦 **Bank feed integration:** Connect a bank account (read-only) to automatically import and categorise transactions — the gold standard for real-time budgeting
- 🔔 **Spend alerts:** "You've spent 80% of your dining-out budget with 12 days left" — proactive, not retrospective
- 🤖 **Smart categorisation:** Learn from corrections over time — if you always move "Woolworths" from Groceries to Household, it remembers
- 📊 **Subscription detection:** Automatically flag recurring charges and surface unused subscriptions — "You haven't used this in 3 months"

> **Why later:** Bank feed integration requires open banking compliance, security infrastructure, and bank partnerships — significant engineering and legal lift. Receipt capture is simpler and can ship first as a bridge. Both are high-value; neither is quick to build correctly.

---

## 🔵 10. School & Activity Hub

*Permission slips, homework due dates, sports schedules — all in one place.*

Parents currently manage school life across a school app, email, a physical calendar on the fridge, and memory. Consolidating even a portion of this into Toto would create daily engagement from both parents — and potentially from older kids managing their own homework.

- 📝 **Permission slip tracker:** Log permission forms with due dates — "Riley's excursion form due Thursday" on the Today screen
- 📚 **Homework tracker:** Per-child homework log with subject, due date, and done/not-done status — older kids can manage their own
- ⚽ **Sports & activity schedule:** Training times, game days, required gear per activity — feeds directly into the shared calendar
- 🏫 **School term calendar:** Import school term dates so holidays, pupil-free days, and report days are visible to both parents
- 💰 **School cost tracker:** Excursions, sport fees, book lists, uniforms — log and track school costs as a budget category
- 📖 **Reading log:** For younger kids — track minutes read per day, tied to the chores/rewards system

---

## 🟢 11. Long-Term Vision Features

*Differentiating ideas that would make Toto genuinely unique.*

These features are further out but represent what could make Toto genuinely different from anything else on the market — the features that would make it impossible to replace.

- 🤖 **AI household advisor:** "Based on your spending this month, you're on track to overspend on dining out by $200. Want to adjust your meal plan?" — proactive, personalised suggestions rather than passive reporting
- 🏦 **Bank feed integration:** Read-only connection to transaction feeds that auto-categorises spending and makes the budget real-time
- 📱 **Smart home integration:** Connect to Google Home / Apple Home — "Leave for school in 10 minutes" triggered from the morning routine checklist
- 🌍 **Environmental tracking:** Household energy usage, water consumption, recycling habits — for families who care about sustainability alongside finances
- 📸 **Family memory / journal:** A private photo and note timeline of family moments — "On this day last year" — that makes Toto feel like a family record, not just a management tool
- 🤝 **Trusted contacts network:** Share a child's allergy card or emergency contacts with school, grandparents, or a babysitter — controlled sharing without giving full household access
- 💳 **Kids' pocket money & bank account:** Connect a kids' bank account (or virtual card) so chore earnings translate to real money, not just in-app points

> **The long-term vision in one sentence:** Toto becomes the operating system for family life — the single source of truth for time, money, health, home, and relationships. Not a collection of features, but a platform that makes the whole household run better.

---

## Suggested Build Order

| # | Feature | Why this order | Priority |
|---|---------|----------------|----------|
| 1 | Today screen (shell) | Entry point for everything — even with placeholder sections, it trains the daily habit | 🔴 Do first |
| 2 | Shared family calendar | Today screen needs schedule data to be useful — these are co-dependent | 🔴 Do first |
| 3 | Morning routines | Highest daily-open frequency of any feature — guaranteed morning engagement | 🔴 Do first |
| 4 | Shared shopping list | Daily use, simple to build, immediate value — fills the Today screen with live data | 🔴 Do first |
| 5 | Countdowns & celebrations | Emotional layer — makes the Today screen feel rewarding, not just functional | 🟡 Do next |
| 6 | Family noticeboard | Communication hub drives daily returns even when nothing else needs doing | 🟡 Do next |
| 7 | Health & medications | Medication reminders are a guaranteed daily open for affected households | 🟡 Do next |
| 8 | Pet management | High relevance for a large portion of the target audience — low build complexity | 🟡 Do next |
| 9 | School & activity hub | High engagement but requires more scope — do after daily habits are established | 🔵 Do later |
| 10 | Receipt capture | Valuable but technically complex — do after the core daily loop is working | 🔵 Do later |
| 11 | Bank feed integration | Highest value long-term but requires compliance infrastructure — plan early, build later | 🟢 Long-term |
| 12 | AI household advisor | Needs rich data history to be accurate — comes after the data layer is mature | 🟢 Long-term |

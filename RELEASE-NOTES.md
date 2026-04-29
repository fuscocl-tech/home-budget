# Toto — Release Notes

## 28 April 2026 · Session Build

### Child PIN Setup (C1–C5 flow)
- Full child onboarding PIN flow (C1 parent approval gate, C2 welcome screen, C3 PIN entry + confirm, C4/C5 mini tour) confirmed working end-to-end
- Removed trivial PIN rejection (1234, 0000 etc.) — not required

### Child Sign Out
- Added **Sign out** button to the child view header
- Signing out returns the user to the profile selection screen

### Shared Device — Profile Switcher
- Added Dev Tools button in Settings to open the profile switcher for testing (flagged for removal before release)
- Fixed button — was calling `switchProfile()` which gate-checks device mode; now calls `showProfileSelector()` directly

### Adult PINs on Shared Devices
- Adults can now set an optional 4-digit PIN from **Settings → Household → [adult member]**
- PIN is opt-in — adults without one tap straight through on the shared device selector
- Profile selector shows "PIN →" or "Tap to enter" per adult depending on PIN status
- Same numpad overlay, SHA-256 hashing, and rate-limiting as kids (3 attempts → 30s lockout)
- Fixed: duplicate `_verifyPin` function was silently overriding adult PIN logic — merged into single function

### Onboarding Modal Styling
- "Let's get started" button updated to pill shape with drop shadow, matching app button style
- Header gradient enriched; feature list rows updated to heavier weight

### Dev Tooling
- Added `npm run dev` — starts local dev server at port 3000
- Added `npm run sim` — copies `index.html` to `www/` and syncs to iOS in one command

## 27 April 2026 · Session Build

### Onboarding
- Built full 6-step onboarding flow from spec: welcome, household composition, kid profiles (with emoji picker), home type, income, and expenses
- Added "add later" escape hatch to expenses step
- Adult names made mandatory (non-optional)
- Fixed kid count display on step 2
- Added adult age capture

### Setup Progress Card
- New collapsible progress card on the dashboard post-onboarding
- Shows outstanding setup tasks with expand/collapse toggle
- Completed sections display in green

### Post-onboarding Empty States
- Goals, Net Worth, Kids, and Vehicles sections all have meaningful empty states with contextual call-to-action prompts

### Custom Select / Dropdown Component
- Replaced all native `<select>` elements with a custom fixed-position dropdown
- Auto-upgrades selects in modals via MutationObserver
- Consistent appearance across all forms including the vehicle modal

### Household Access & Device Profiles
- New device registration flow: first-time visitors prompted to assign a device role (Adult, Shared, or specific Child)
- Shared devices show a profile selector on each visit
- Child devices route directly to the child's PIN screen or session if already authenticated
- PIN setup overlay: full numeric keypad, SHA-256 hashing via WebCrypto, confirm step
- Child view overlay: full-screen interface showing points balance, assigned chores, and prize store
- "Done ✓" and "Redeem" actions available within child view
- Parent button in child header to exit back to adult view
- Remove household member: confirmation prompt + cleanup of associated kids data

### Bug Fixes
- Child view content was blank — missing `innerHTML` assignment now added
- Overlays (child view, PIN setup) were always visible — fixed with CSS `display:none !important` on `.hidden` class
- PIN setup and child assignment failed silently for kids created during onboarding due to `number` vs `string` ID type mismatch — fixed globally with `String()` coercion
- Device routing was re-firing on every Firestore sync — guarded with `_deviceRoutingDone` flag
- Net Worth modal add-asset/add-liability buttons were non-functional — fixed modal injection via `_ensureNWModals()`
- Section nav sticky positioning was broken inside scroll container — corrected to `top: 0`
- Kid card action buttons were being swallowed by parent `onclick` — restructured click targets
- Modal save handler was accumulating duplicate listeners — switched to single `onclick` assignment

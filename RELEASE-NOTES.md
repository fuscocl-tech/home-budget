# Toto — Release Notes

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

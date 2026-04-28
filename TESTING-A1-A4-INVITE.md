# A1–A4 Household Invite — Testing Checklist
**Feature:** Adult invite system (Settings → Household Access → A1 landing → A3 welcome → A4 tour)
**Date:** 28 April 2026
**Tester:**

---

## Legend
- [ ] Not tested
- [x] Pass
- [~] Pass with minor issue (note below)
- [!] Fail (note below)

---

## 1. Invite Generation (Owner side)

| # | Test | Result | Notes |
|---|------|--------|-------|
| 1.1 | Settings → Household Access accordion is visible | [ ] | |
| 1.2 | Email input and role buttons (Member / Owner) are displayed | [ ] | |
| 1.3 | Role toggle: clicking **Owner** highlights it and deselects Member | [ ] | |
| 1.4 | Role toggle: clicking **Member** switches back correctly | [ ] | |
| 1.5 | Click **Generate invite link** without an email — link still generates | [ ] | |
| 1.6 | Click **Generate invite link** with an email — link generates and email is referenced | [ ] | |
| 1.7 | Invite form hides and link panel appears after generation | [ ] | |
| 1.8 | Link panel shows a valid-looking URL containing `?invite=` | [ ] | |
| 1.9 | **Copy link** button copies the URL to clipboard | [ ] | |
| 1.10 | Copied URL contains the correct token (paste and verify) | [ ] | |
| 1.11 | **Send email** opens a mailto: with the invite link in the body | [ ] | |
| 1.12 | **Generate another** link resets the form | [ ] | |
| 1.13 | After generating, reload Settings — invite appears in **Pending invites** list | [ ] | |
| 1.14 | Pending invite shows the email and expiry date | [ ] | |
| 1.15 | **Revoke** button prompts confirmation and removes the invite | [ ] | |
| 1.16 | Generating a second invite creates a second entry (no overwrite) | [ ] | |

---

## 2. Login Screen — Invite Banner

| # | Test | Result | Notes |
|---|------|--------|-------|
| 2.1 | Open invite link in a **private/incognito** browser tab | [ ] | |
| 2.2 | The login screen shows the teal **"You've been invited!"** banner | [ ] | |
| 2.3 | The normal tagline ("Sign in to access your family budget") is hidden | [ ] | |
| 2.4 | Banner text is correct and readable | [ ] | |
| 2.5 | Opening the app normally (no `?invite=`) shows the normal login, no banner | [ ] | |
| 2.6 | After the page loads, the `?invite=` param is stripped from the browser URL bar | [ ] | |

---

## 3. A1 — Invite Landing Page

| # | Test | Result | Notes |
|---|------|--------|-------|
| 3.1 | After signing in via the invite link, the A1 landing appears (not the normal dashboard) | [ ] | |
| 3.2 | Household preview shows all adult members with 👤 avatar and name | [ ] | |
| 3.3 | Household preview shows kids with emoji and age | [ ] | |
| 3.4 | "You — joining now" row appears at the bottom of the member list | [ ] | |
| 3.5 | Monthly surplus tile displays if income/expenses are set up | [ ] | |
| 3.6 | Invitee email and expiry date are shown (if email was set) | [ ] | |
| 3.7 | Inviter's name is shown in the heading (e.g. "Chris invited you…") | [ ] | |
| 3.8 | **Accept invite →** button is visible and tappable | [ ] | |
| 3.9 | **Ignore this invite** link is visible | [ ] | |
| 3.10 | Clicking **Ignore this invite** closes the overlay and shows the app normally | [ ] | |

---

## 4. Invite Acceptance

| # | Test | Result | Notes |
|---|------|--------|-------|
| 4.1 | Clicking **Accept invite →** proceeds to A3 (You're in!) | [ ] | |
| 4.2 | After accepting, the invite status is marked **accepted** (no longer shows in Pending invites in Settings) | [ ] | |
| 4.3 | The accepting user's name appears in **Joined members** in Settings → Household Access | [ ] | |
| 4.4 | The accepting user is added to `householdProfile.members` (visible in Settings → Household Profile) | [ ] | |
| 4.5 | Using the same invite link a second time — should not duplicate the member | [ ] | |

---

## 5. A3 — "You're in!" Welcome Screen

| # | Test | Result | Notes |
|---|------|--------|-------|
| 5.1 | Screen shows the invitee's first name (e.g. "You're in, Sam!") | [ ] | |
| 5.2 | Inviter's name is shown in the subtitle (e.g. "Welcome to Chris's Toto household") | [ ] | |
| 5.3 | Household member list is shown in a teal card | [ ] | |
| 5.4 | The joining member's row is labelled "that's you!" | [ ] | |
| 5.5 | Surplus tile shows if income > expenses | [ ] | |
| 5.6 | Goals tile shows if there are saved goals | [ ] | |
| 5.7 | **Take a quick tour →** button advances to A4 | [ ] | |

---

## 6. A4 — Quick Tour

| # | Test | Result | Notes |
|---|------|--------|-------|
| 6.1 | First slide shows 💰 The Kitty | [ ] | |
| 6.2 | Progress dots: first dot is wide/teal, others are grey | [ ] | |
| 6.3 | **Next →** advances to the Plan slide (📅) | [ ] | |
| 6.4 | Progress dots update correctly on each slide | [ ] | |
| 6.5 | **Next →** on Plan advances to the Home slide (🏠) | [ ] | |
| 6.6 | Final slide shows **Done →** instead of **Next →** | [ ] | |
| 6.7 | **Skip tour** link appears on non-final slides and skips directly to income prompt | [ ] | |
| 6.8 | **Done →** on the last slide advances to the income prompt | [ ] | |

---

## 7. Income Prompt (Post-tour)

| # | Test | Result | Notes |
|---|------|--------|-------|
| 7.1 | Income prompt screen is shown after the tour | [ ] | |
| 7.2 | Name, amount, and frequency fields are present and functional | [ ] | |
| 7.3 | Frequency dropdown shows: Monthly, Fortnightly, Weekly, Annual | [ ] | |
| 7.4 | Filling in name + amount and clicking **Add income & go to dashboard →** saves income and closes the flow | [ ] | |
| 7.5 | New income source appears in Budget → Income after saving | [ ] | |
| 7.6 | **Skip — I'll add it later** closes the flow without saving anything | [ ] | |
| 7.7 | After completing the flow, the normal dashboard is shown (not onboarding or device routing) | [ ] | |

---

## 8. Expired Invite

| # | Test | Result | Notes |
|---|------|--------|-------|
| 8.1 | Manually set an invite's `expiresAt` to a past date in browser console | [ ] | |
| 8.2 | Opening the expired invite link shows the **"This invite has expired"** screen | [ ] | |
| 8.3 | Inviter's name is referenced in the expired message | [ ] | |
| 8.4 | **OK** button closes the overlay | [ ] | |

---

## 9. Setup Progress Card

| # | Test | Result | Notes |
|---|------|--------|-------|
| 9.1 | With 2+ adults and no invite accepted, "Invite [partner] to your household" appears as a to-do item | [ ] | |
| 9.2 | Clicking **Go →** on the invite task navigates to Settings | [ ] | |
| 9.3 | Settings scrolls to and opens the Household Access section | [ ] | |
| 9.4 | After an invite is accepted, the item is marked **Done** with a green tick | [ ] | |
| 9.5 | With only 1 adult, the invite task does not appear | [ ] | |

---

## 10. Edge Cases

| # | Test | Result | Notes |
|---|------|--------|-------|
| 10.1 | Open invite link on the **same device/account** as the owner — flow still runs without errors | [ ] | |
| 10.2 | Open a completely random/invalid `?invite=abc123` — no crash, graceful failure | [ ] | |
| 10.3 | Refresh the page mid-flow (e.g. during A3) — invite token is gone, app loads normally | [ ] | |
| 10.4 | Revoke an invite then try to open its link — expired/invalid screen shows | [ ] | |
| 10.5 | Generate 3+ invites — all appear in the Pending list without layout issues | [ ] | |

---

## Feedback & Issues

_Use this section to record bugs, observations, or requests found during testing._

| # | Screen | Description | Priority | Status |
|---|--------|-------------|----------|--------|
| | | | | |
| | | | | |
| | | | | |
| | | | | |

---

_Last updated:_

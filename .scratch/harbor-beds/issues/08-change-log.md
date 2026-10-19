# 08: Change log

**What to build:** A caseworker opens a shelter's change log and sees its last 24 hours: check-ins, check-outs, corrections, hold events (placed, claimed, cancelled, released, expired, extended) and Admin changes to settings. They use it to judge whether a count is current. Data older than 30 days is deleted automatically.

**Blocked by:** 03 (Undo, Correction and curfew reminder), 06 (Manage holds)

**Status:** ready-for-agent

- [ ] Each shelter on the board links to its change log
- [ ] The change log lists the last 24 hours of that shelter's actions, newest first, each with time, type and who ("Northside front desk", a caseworker's first name, or "Admin")
- [ ] Undone actions do not appear
- [ ] Corrections are clearly marked as a person checking the count
- [ ] Admin changes to capacity and eligibility rules appear when ticket 10 has landed (for example "Capacity changed 40 → 30, by Admin")
- [ ] Actions and ended holds older than 30 days are deleted automatically

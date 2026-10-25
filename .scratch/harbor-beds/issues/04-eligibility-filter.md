# 04: Eligibility filter

**What to build:** On the shelter board, the caseworker ticks checkboxes about the person (is a woman, has children with them, has a pet, can stay sober) and sees only shelters that can take them. Shelters with free beds come first. Eligible shelters with no free beds are greyed out below. Shelters that would refuse the person are hidden.

**Blocked by:** 01 (Shelter board)

**Status:** ready-for-agent

- [x] The four checkboxes are worded: "Is a woman", "Has children with them", "Has a pet", "Can stay sober"
- [x] With nothing ticked, only shelters that would take anyone are shown: not women only, not requiring sobriety. Shelters that don't accept children or pets are still shown, because nobody ticked those boxes
- [x] "Is a woman" adds women-only shelters, "Can stay sober" adds sobriety-required shelters, "Has children with them" shows only shelters that accept children, and "Has a pet" shows only shelters that accept pets
- [x] Eligible shelters with free beds are listed first, most free beds first
- [x] Eligible shelters with no free beds are greyed out below, still showing phone number and Last updated
- [x] Ineligible shelters are not shown
- [x] Nothing the caseworker ticks is saved

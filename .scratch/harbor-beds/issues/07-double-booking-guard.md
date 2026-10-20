# 07: Double-booking guard

**What to build:** When the front desk checks in a walk-in and every free bed is held for someone on the way, the app warns them first. The desk can still check the walk-in in. If they do, the hold that no longer has a bed becomes an uncovered hold, and the caseworker sees "Bed may be gone. Call the shelter."

**Blocked by:** 05 (Place and claim a hold)

**Status:** ready-for-agent

- [ ] Checking in a walk-in when the shelter has no free beds but has active holds shows: "All free beds are held for people on the way ({code}, from {name}, until {time}). Check in anyway?"
- [ ] The desk can cancel or confirm. The app never blocks the check in
- [ ] After an override, the hold stays active and is marked uncovered while occupied beds plus active holds exceed capacity
- [ ] An uncovered hold is shown to caseworkers, on the board and in the Holds list when ticket 06 has landed, as "Bed may be gone. Call the shelter."
- [ ] When a later check out frees a bed, the hold is covered again automatically

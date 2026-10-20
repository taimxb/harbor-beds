# 05: Place and claim a hold

**What to build:** From the shelter board, a caseworker taps "Hold bed" on a shelter with a free bed. They enter their first name, which the browser remembers, and get a 3-character hold code to give the person. The hold lasts one hour and counts against free beds. The shelter's front desk sees the hold live: "1 bed held, code K7Q, from Keisha, until 9:00 PM". When the person arrives, Check in asks "Here for a hold?" and the desk picks the hold, which claims it. If nobody arrives, the hold expires and the bed is free again. This ticket delivers the demo story.

**Blocked by:** 02 (Check in and out)

**Status:** ready-for-agent

- [ ] Hold bed appears only on shelters with at least one free bed
- [ ] Placing a hold asks for the caseworker's first name, remembered by the browser for next time. No information about the person is asked for or stored
- [ ] The hold code is 3 characters, using letters and digits that are easy to say on the phone, leaving out look-alikes such as 0/O and 1/I
- [ ] A hold code is unique among active holds and holds that expired in the last 3 hours
- [ ] An active hold lasts one hour and reduces the shelter's free beds by one
- [ ] The front desk screen lists the shelter's active holds live, with code, caseworker first name and expiry time
- [ ] With no active holds, Check in still takes a single tap
- [ ] With active holds, Check in asks "Here for a hold?" with one button per hold plus Walk-in. Choosing a hold claims it and checks the person in
- [ ] Claiming a hold is a front desk action and updates Last updated. Placing a hold does not
- [ ] When an hour passes without the hold being claimed, it expires and the bed counts as free again, without anyone reloading
- [ ] At the family shelter, one hold covers one family room

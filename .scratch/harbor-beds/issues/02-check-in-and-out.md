# 02: Check in and out

**What to build:** A role picker lets someone choose Caseworker, a shelter's front desk, or Admin. This stands in for sign in during the hackathon. The front desk screen for a shelter shows its free beds, a big Check in button and a Check out button. Each tap changes the count and the shelter's Last updated time. A caseworker watching the shelter board sees the change without reloading.

**Blocked by:** 01 (Shelter board)

**Status:** ready-for-agent

- [x] The role picker offers Caseworker, one front desk per shelter that is not closed, and Admin. The Admin option can lead to an empty placeholder until ticket 10
- [x] The front desk screen shows only its own shelter
- [x] Check in is the biggest button on the screen. One tap checks in, which increases occupied beds by one
- [x] Check out decreases occupied beds by one, and occupied beds never go below 0
- [x] Each check in and check out is recorded as a front desk action with a time and the shelter, attributed to "[Shelter] front desk"
- [x] Last updated is the time of the shelter's most recent front desk action
- [x] The caseworker board and the front desk screen update live, with a 30-second fallback refresh
- [x] The front desk screen is usable on a phone as well as a shelter computer

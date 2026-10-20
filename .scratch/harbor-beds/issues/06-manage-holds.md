# 06: Manage holds

**What to build:** Caseworkers get a Holds list of every active hold across the network, with their own holds first. Any caseworker can cancel or extend any hold. The front desk can extend or release its shelter's holds. An expired hold stays visible on the front desk screen for 3 hours, so a late arrival can still be recognized.

**Blocked by:** 05 (Place and claim a hold)

**Status:** ready-for-agent

- [ ] The caseworker Holds list shows each active hold's code, shelter, caseworker first name and time left. Holds matching the remembered first name are listed first
- [ ] Any caseworker can cancel any active hold, which ends it as cancelled and frees the bed
- [ ] Both caseworkers and the front desk can extend an active hold by 30 minutes, any number of times
- [ ] The front desk sees how many times each hold has been extended
- [ ] The front desk can release a hold, which ends it as released and frees the bed
- [ ] An expired hold stays on the front desk screen for 3 hours after expiry, shown as "expired 40 min ago, K7Q, from Keisha", then disappears. It never protects the bed
- [ ] Extensions and releases by the front desk are recorded as front desk actions. Extensions and cancellations by a caseworker are recorded with the caseworker's first name

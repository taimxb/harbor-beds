# 03: Undo, Correction and curfew reminder

**What to build:** Three small ways for the front desk to keep the count right. After any check in or check out, an "Undo" message is shown for 10 seconds. A small, out-of-the-way Correction control sets the number of occupied beds directly. At curfew, a banner reminds the desk to check out residents who have not returned.

**Blocked by:** 02 (Check in and out)

**Status:** ready-for-agent

- [ ] After a check in or check out, an Undo message is shown for 10 seconds. Tapping it reverses the action as if it never happened, and the action no longer appears as a front desk action
- [ ] The Correction control is visually separate from, and smaller than, Check in and Check out
- [ ] A Correction sets occupied beds to a number between 0 and capacity, and is recorded as a front desk action of type correction
- [ ] A Correction updates Last updated
- [ ] At the network curfew time, the front desk screen shows "It's {curfew}. Check out anyone who hasn't returned."
- [ ] The banner goes away when it is dismissed, or after the next check out

# 10: Shelter settings

**What to build:** Admin (Marcus) has a settings screen to add a shelter, edit its name, address, phone number, capacity and eligibility rules, close or reopen it, and set the network curfew. This replaces editing the Supabase table editor by hand. It must be simple enough for a volunteer who knows spreadsheets but not code.

**Blocked by:** 02 (Check in and out)

**Status:** ready-for-agent

- [ ] Choosing Admin in the role picker opens the settings screen
- [ ] Admin can add a shelter with name, address, phone number, capacity and the four eligibility rules
- [ ] Admin can edit any of those fields for an existing shelter
- [ ] Admin can close a shelter, which hides it from the caseworker board and the role picker but keeps its history, and can reopen it. There is no delete
- [ ] Admin can change the single network curfew time
- [ ] Changes to capacity and eligibility rules are recorded as actions attributed to "Admin"
- [ ] Lowering capacity below occupied beds is allowed, and free beds show as 0, never negative

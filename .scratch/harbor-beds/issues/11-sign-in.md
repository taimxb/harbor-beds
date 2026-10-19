# 11: Sign in

**What to build:** Real shared logins replace the role picker: one login per shelter for its front desk, one for all caseworkers, and one for Admin. The database itself enforces that a shelter's login changes only its own beds and holds. Admin can change a shelter's password when a front desk worker leaves.

**Blocked by:** 03 (Undo, Correction and curfew reminder), 06 (Manage holds), 07 (Double-booking guard), 08 (Change log), 09 (No-bed guidance), 10 (Shelter settings)

**Status:** ready-for-agent

- [ ] Signing in uses Supabase Auth with shared logins, as recorded in ADR 0002
- [ ] A shelter login sees and changes only its own shelter's counts and holds
- [ ] The caseworker login sees every shelter, and can place, cancel and extend holds but cannot check in or out
- [ ] The Admin login can use the settings screen. Shelter and caseworker logins cannot
- [ ] Database rules enforce these limits even if someone calls the database directly
- [ ] Admin can change any shelter's password from the settings screen
- [ ] The role picker is removed
- [ ] Nothing works without signing in

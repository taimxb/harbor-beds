# 01: Shelter board

**What to build:** A caseworker opens the website and sees every shelter in the network: its free beds, its eligibility rules (women only, accepts children, accepts pets, requires sobriety), its address and phone number, and when it was last updated. This ticket also sets up the project (Next.js with TypeScript, Supabase, deployed on Vercel) and loads invented sample data that later tickets build on. Free beds are capacity minus occupied beds. There are no holds yet.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] The project runs locally and deploys to Vercel, backed by a Supabase database
- [ ] Sample data has six invented shelters, about 210 beds in total and 20 to 60 each: two women only, one that accepts children (counted in family rooms), one that accepts pets named Northside, one that requires sobriety, and one with no rules
- [ ] Sample data uses invented names, addresses and phone numbers only. No real shelter details are committed
- [ ] A single network-wide curfew is stored, set to 9 PM
- [ ] The board lists every shelter that is not closed, with free beds, eligibility rules, address, phone number and Last updated
- [ ] Free beds are never shown below 0
- [ ] Last updated is shown as relative time (for example "10 min ago") and turns amber after 3 hours
- [ ] Times are shown in US Eastern time
- [ ] Nothing in the data model can hold information that identifies a person Harbor serves: no names, birth dates, phone numbers, photos or free-text notes about people

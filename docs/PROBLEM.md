# The problem we are solving

Everyone on the team, and every AI tool, reads this before building.

## Privacy rule

**Never store anything that identifies the people Harbor serves.** In Renee's words: "It cannot store anything that identifies the people we serve. Some of them are hiding from abusers. If that leaked, someone could get hurt."

No names, birth dates, phone numbers, photos or free-text notes about a person. The app stores beds, shelters, holds and staff actions only.

## The nonprofit

Harbor Housing Alliance is a network of six emergency shelters. Its caseworkers find a bed for people who need one tonight.

## Who will use what we build

| Who | Works for | Where and when | Device | What they need |
|---|---|---|---|---|
| Caseworker | Harbor, two offices | 9 AM to 9 PM | Office laptop | To find a bed this person can take, right now, and keep it until they arrive |
| Front desk | Each shelter | Around the clock, high turnover | Shelter computer, or their own phone at two shelters | To update beds in a couple of taps, without slowing intake |

Front desk staff are busiest at dinner (5 to 7 PM), which is when caseworkers call most. Training has to take under ten minutes.

## The one problem

In Renee's words: finding a bed someone can actually take means "30 minutes to an hour of phone calls", and sometimes the bed is gone by the time they get there.

## What we learned in the interview

- The last attempt, a shared Google Sheet, lasted three weeks. Updating it was too much work for front desk staff, the numbers went stale, and caseworkers went back to calling.
- Not every bed fits every person. Two shelters are women only, one takes families, one allows pets, and one requires sobriety. About half of caseworkers' calls go to shelters that could never take that person.
- Beds mostly open around noon (residents leave 7 to 9 AM and beds are cleaned by midday) and at 9 PM curfew, when unreturned residents' beds are released.
- A phone promise to hold a bed loses to someone standing at the desk.
- Six shelters, about 210 beds in total, between 20 and 60 per shelter.

## The demo story

The man with the dog, replayed:

1. **7:50 PM, Northside front desk.** A resident leaves. The desk taps "Check out" on their phone. Northside now shows one free bed, updated just now.
2. **8:00 PM, Keisha, caseworker.** A man with a dog needs a bed. She ticks "has a pet". Only Northside appears: one bed, updated 10 minutes ago. She taps "Hold bed", which keeps it for an hour.
3. **8:45 PM, Northside front desk.** Their screen has shown "1 bed held, incoming from Keisha, until 9:00 PM" the whole time, so the bed wasn't given to a walk-in. The man arrives and the desk checks him in to the held bed.

## Slices

In build order. Each slice depends only on the ones above it.

| # | Slice | What the user can do when it's done | Owner | Branch | Status |
|---|---|---|---|---|---|
| 1 | Shelter board | See every shelter, its free beds and who it accepts (from sample data) | | `feat/shelter-board` | Not started |
| 2 | Check in and out | Front desk taps one button to check a bed in or out. The count and "updated" time change | | `feat/check-in-out` | Not started |
| 3 | Eligibility filter | Caseworker ticks checkboxes (woman, children with them, pet, sobriety) and sees only shelters that can take this person, with free beds and how recently each was updated | | `feat/eligibility-filter` | Not started |
| 4 | Bed hold | Caseworker holds a bed for an hour. Front desk sees the hold and when it expires. The hold ends at check-in or when it expires | | `feat/bed-hold` | Not started |
| 5 | Double-booking guard | Front desk is warned before checking a walk-in into a bed that is held | | `feat/hold-guard` | Not started |
| 6 | Change log | Caseworker sees a shelter's recent check-ins, check-outs and holds, to judge whether a count is current | | `feat/change-log` | Not started |
| 7 | No-bed guidance | When nothing fits, caseworker sees each suitable shelter's phone number and "beds usually open around noon and at 9 PM" | | `feat/no-bed-guidance` | Not started |
| 8 | Shelter settings | Admin adds, edits and closes shelters (name, address, phone, capacity, eligibility rules) and sets the curfew | | `feat/shelter-settings` | Not started |
| 9 | Sign in | Shared logins per shelter, for caseworkers and for Admin. Each shelter changes only its own beds. Admin changes shelter passwords | | `feat/sign-in` | Not started |

## Decisions so far

- **A website, not an app.** It works on phones and laptops with no installs or app store.
- **Checkboxes, not AI, for eligibility.** Eligibility is four or five facts, checkboxes are faster during a call, and they keep a person's story out of any outside service.
- **Timestamps and a change log, not confirmations.** Asking the front desk to confirm counts adds the kind of work that killed the Google Sheet.
- **Lean toward caution.** A forgotten check-in sends someone to a bed that isn't there, which is worse than a forgotten check-out. Check-in is the biggest button on the front desk screen.
- **Count beds per shelter, not individual beds.** See [ADR 0001](adr/0001-count-beds-per-shelter.md). The family shelter counts by family: one hold or check in covers one family.
- **Shared logins.** One per shelter, one for caseworkers, one for Admin. See [ADR 0002](adr/0002-shared-logins.md). The hackathon build uses a role picker instead.
- **Holds** last one hour, and the caseworker or front desk can extend them by 30 minutes any number of times. A walk-in who would take a held bed gets a warning, not a block.
- **Time zone:** US Eastern (America/New_York).
- **Stack:** Next.js with TypeScript, Supabase, deployed on Vercel. Screens update live.
- **Keep little data.** The change log shows the last 24 hours, and anything older than 30 days is deleted. Sample data is invented, and real shelter details are never committed to the repo.
- **Words:** use the terms in [GLOSSARY.md](../GLOSSARY.md).

## Answered planning questions

- **How does the front desk recognize the person a hold is for?** By a three-character hold code that the caseworker gives the person. It identifies the hold, not the person.
- **What happens when a hold expires while the person is on the way?** The bed becomes free again. The expired hold stays visible to the front desk for 3 hours, so a late arrival can still be recognized if a bed is free. Extend the hold before it runs out to protect the bed.
- **How do people sign in?** With shared logins (slice 9). Each shelter sees and changes only its own beds, and caseworkers see every shelter.

## Not building

- **Photo verification.** Photos of beds can catch residents, which breaks the privacy rule, and it adds work for the front desk.
- **AI voice or text parsing for eligibility.** Checkboxes are quicker for four or five facts, cost nothing, and keep sensitive details out of an outside AI service.
- **Availability predictions.** There is no history of bed changes to learn from, and a wrong guess sends someone to a bed that isn't there. The noon and 9 PM pattern covers it.

## After the hackathon

- **Hosting:** Vercel and Supabase free plans, so it costs nothing. Check the free plans' limits (for example, whether an idle project gets paused) before handing over.
- **Who looks after it:** Marcus, Harbor's volunteer, who comes in on Thursdays and knows spreadsheets and some WordPress, not code. He needs a simple screen, or the Supabase table editor, to add a shelter, change bed counts and edit who a shelter accepts.
- **Code changes:** need a developer volunteer. The repository moves to a Harbor-owned GitHub account.
- **Training:** under ten minutes for front desk staff. Two buttons and a list of holds.

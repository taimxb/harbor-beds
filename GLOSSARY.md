# Harbor Beds

Harbor Beds helps Harbor Housing Alliance's caseworkers find a free bed tonight in one of its shelters that will take the person, and keep it until they arrive.

## People

**Caseworker**:
A Harbor staff member who finds a bed for a person who needs one tonight.
_Avoid_: Case manager, staff

**Front desk**:
The staff on duty at a shelter's desk, who check people in and out.
_Avoid_: Receptionist, staff, desk worker

**Admin**:
The person who maintains shelter settings (today, Marcus, Harbor's volunteer).
_Avoid_: Administrator, manager, superuser

**Walk-in**:
A person who arrives at a shelter without a hold.
_Avoid_: Drop-in

## Shelters and beds

**Shelter**:
One of Harbor's emergency shelters, with a fixed number of beds and its own eligibility rules.
_Avoid_: Site, location, facility

**Closed shelter**:
A shelter taken out of use. It is hidden from caseworkers and the front desk, but its history is kept and it can be reopened.
_Avoid_: Deleted, archived, inactive

**Capacity**:
The total number of beds a shelter has. At the family shelter, it is the number of family rooms.
_Avoid_: Size, total

**Family room**:
The unit counted at the family shelter instead of a bed. One family takes one family room.

**Occupied bed**:
A bed that someone has been checked in to.

**Free bed**:
A bed that is neither occupied nor held: capacity minus occupied beds minus active holds.
_Avoid_: Open bed, available bed, vacant bed

**Curfew**:
The single evening time, the same for every shelter, by which residents must return. Beds of residents who have not returned are checked out after it.
_Avoid_: Lockout, cutoff

**Network settings**:
Settings that apply to every shelter at once. Today, only the curfew.
_Avoid_: Global settings, config

**Eligibility rules**:
A shelter's four settings: women only, accepts children, accepts pets, requires sobriety.
_Avoid_: Criteria, restrictions, filters

## Movements

**Check in**:
Recording that a person has taken a bed at a shelter, either a walk-in or against a hold.
_Avoid_: Intake, admit, assign

**Check out**:
Recording that a bed has been freed, because a resident left or did not return by curfew.
_Avoid_: Discharge, release, vacate

**Correction**:
The front desk setting a shelter's occupied count directly, to fix drift from missed or doubled taps.
_Avoid_: Reset, adjustment, recount

**Last updated**:
The time of a shelter's most recent front desk action. A caseworker placing or cancelling a hold does not change it.
_Avoid_: Last modified, freshness

## Holds

**Hold**:
A caseworker's promise of one bed at one shelter for a person who is on the way, for a limited time.
_Avoid_: Reservation, booking, claim

**Hold code**:
A short code that identifies a hold, not a person. The caseworker gives it to the person, and the person says it at the front desk.
_Avoid_: Reference, PIN, ticket

**Active hold**:
A hold that has not yet ended. It counts against free beds.

**Uncovered hold**:
An active hold with no bed left behind it, because the front desk checked in a walk-in despite the warning.
_Avoid_: Broken hold, at-risk hold

**Extension**:
Adding 30 minutes to an active hold. A hold can be extended any number of times.

**Claimed**:
How a hold ends when the front desk checks the person in against it.

**Cancelled**:
How a hold ends when the caseworker withdraws it.

**Released**:
How a hold ends when the front desk withdraws it, for example because the person was refused.
_Avoid_: Using "release" for freeing a bed (that is a check out)

**Expired**:
How a hold ends when its time runs out. The bed becomes free again.

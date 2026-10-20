# Count beds per shelter, not individual beds

Each shelter stores a capacity and the app tracks counts. Free beds are capacity minus occupied beds minus active holds. There is no record per bed, and nobody picks "Bed 12". We chose this because front desk staff update beds during the dinner rush, and choosing a particular bed on every tap is the kind of extra work that killed Harbor's shared Google Sheet after three weeks. It also lets Marcus, the volunteer who maintains the data, edit one number per shelter instead of a list of beds. Nothing in the problem needs to know which bed a person is in.

## Consequences

- Counts can drift from reality, so the front desk has a Correction control to set the occupied count directly, and every Correction appears in the change log.
- The family shelter counts family rooms, not beds. One hold or one check in there covers one family.

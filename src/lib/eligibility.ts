import { freeBedsAt, type Shelter } from "./shelters";

// What the caseworker ticks about the person. Never saved anywhere.
export type PersonFacts = {
  isWoman: boolean;
  hasChildren: boolean;
  hasPet: boolean;
  canStaySober: boolean;
};

export const nothingTicked: PersonFacts = {
  isWoman: false,
  hasChildren: false,
  hasPet: false,
  canStaySober: false,
};

// Open shelters that would take the person: those with free beds, most free
// beds first, and those that are full. Ties keep the order they came in.
export function eligibleShelters(
  shelters: Shelter[],
  person: PersonFacts,
): { withFreeBeds: Shelter[]; noFreeBeds: Shelter[] } {
  const eligible = shelters.filter(
    (shelter) => shelter.closedAt === null && wouldTake(shelter, person),
  );
  return {
    withFreeBeds: eligible
      .filter((shelter) => freeBedsAt(shelter) > 0)
      .sort((a, b) => freeBedsAt(b) - freeBedsAt(a)),
    noFreeBeds: eligible.filter((shelter) => freeBedsAt(shelter) === 0),
  };
}

function wouldTake(shelter: Shelter, person: PersonFacts): boolean {
  return (
    (!shelter.womenOnly || person.isWoman) &&
    (!shelter.requiresSobriety || person.canStaySober) &&
    (!person.hasChildren || shelter.acceptsChildren) &&
    (!person.hasPet || shelter.acceptsPets)
  );
}

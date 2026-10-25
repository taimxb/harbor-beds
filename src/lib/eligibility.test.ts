import { describe, expect, it } from "vitest";
import { eligibleShelters, type PersonFacts } from "./eligibility";
import type { Shelter } from "./shelters";

const now = new Date("2026-10-21T20:00:00-04:00");

const shelter = (overrides: Partial<Shelter>): Shelter => ({
  id: "id",
  name: "Shelter",
  address: "1 Main Street",
  phone: "(617) 555-0100",
  capacity: 40,
  occupied: 30,
  womenOnly: false,
  acceptsChildren: false,
  acceptsPets: false,
  requiresSobriety: false,
  closedAt: null,
  lastUpdatedAt: now,
  ...overrides,
});

const nothingTicked: PersonFacts = {
  isWoman: false,
  hasChildren: false,
  hasPet: false,
  canStaySober: false,
};

const network = [
  shelter({ id: "downtown", name: "Downtown" }),
  shelter({ id: "harbor", name: "Harbor House", womenOnly: true }),
  shelter({ id: "maple", name: "Maple Family Center", acceptsChildren: true }),
  shelter({ id: "northside", name: "Northside", acceptsPets: true }),
  shelter({ id: "clearwater", name: "Clearwater", requiresSobriety: true }),
];

const names = (shelters: Shelter[]) => shelters.map((s) => s.name).sort();

describe("eligibleShelters", () => {
  it("with nothing ticked, keeps shelters that take anyone, including those accepting children or pets", () => {
    const { withFreeBeds } = eligibleShelters(network, nothingTicked);
    expect(names(withFreeBeds)).toEqual([
      "Downtown",
      "Maple Family Center",
      "Northside",
    ]);
  });

  it("adds women-only shelters for a woman", () => {
    const { withFreeBeds } = eligibleShelters(network, {
      ...nothingTicked,
      isWoman: true,
    });
    expect(names(withFreeBeds)).toEqual([
      "Downtown",
      "Harbor House",
      "Maple Family Center",
      "Northside",
    ]);
  });

  it("adds sobriety-required shelters for someone who can stay sober", () => {
    const { withFreeBeds } = eligibleShelters(network, {
      ...nothingTicked,
      canStaySober: true,
    });
    expect(names(withFreeBeds)).toEqual([
      "Clearwater",
      "Downtown",
      "Maple Family Center",
      "Northside",
    ]);
  });

  it("keeps only shelters that accept children for someone with children", () => {
    const { withFreeBeds } = eligibleShelters(network, {
      ...nothingTicked,
      hasChildren: true,
    });
    expect(names(withFreeBeds)).toEqual(["Maple Family Center"]);
  });

  it("keeps only shelters that accept pets for someone with a pet", () => {
    const { withFreeBeds } = eligibleShelters(network, {
      ...nothingTicked,
      hasPet: true,
    });
    expect(names(withFreeBeds)).toEqual(["Northside"]);
  });

  it("applies every tick together: a woman with children only fits the family shelter", () => {
    const { withFreeBeds } = eligibleShelters(network, {
      ...nothingTicked,
      isWoman: true,
      hasChildren: true,
    });
    expect(names(withFreeBeds)).toEqual(["Maple Family Center"]);
  });

  it("lists shelters with free beds first, most free beds first, and full shelters separately", () => {
    const { withFreeBeds, noFreeBeds } = eligibleShelters(
      [
        shelter({ id: "a", name: "Downtown", capacity: 60, occupied: 55 }),
        shelter({ id: "b", name: "Eastgate", capacity: 30, occupied: 30 }),
        shelter({ id: "c", name: "Harborview", capacity: 40, occupied: 32 }),
        shelter({ id: "d", name: "Northside", capacity: 30, occupied: 29 }),
        shelter({ id: "e", name: "Westend", capacity: 25, occupied: 27 }),
      ],
      nothingTicked,
    );
    expect(withFreeBeds.map((s) => s.name)).toEqual([
      "Harborview",
      "Downtown",
      "Northside",
    ]);
    expect(noFreeBeds.map((s) => s.name)).toEqual(["Eastgate", "Westend"]);
  });

  it("leaves out ineligible shelters even when they are full", () => {
    const { noFreeBeds } = eligibleShelters(
      [shelter({ name: "Rosewood", womenOnly: true, occupied: 40 })],
      nothingTicked,
    );
    expect(noFreeBeds).toEqual([]);
  });

  it("leaves out closed shelters", () => {
    const { withFreeBeds } = eligibleShelters(
      [shelter({ name: "Old Mill", closedAt: now })],
      nothingTicked,
    );
    expect(withFreeBeds).toEqual([]);
  });
});

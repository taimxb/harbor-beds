import { describe, expect, it } from "vitest";
import { sampleShelters } from "./sample-shelters";

describe("sample shelters", () => {
  it("has six shelters", () => {
    expect(sampleShelters).toHaveLength(6);
  });

  it("has between 20 and 60 beds per shelter, about 210 in total", () => {
    for (const shelter of sampleShelters) {
      expect(shelter.capacity).toBeGreaterThanOrEqual(20);
      expect(shelter.capacity).toBeLessThanOrEqual(60);
    }
    const total = sampleShelters.reduce((sum, s) => sum + s.capacity, 0);
    expect(total).toBeGreaterThanOrEqual(200);
    expect(total).toBeLessThanOrEqual(220);
  });

  it("matches Harbor's eligibility mix", () => {
    const count = (match: (s: (typeof sampleShelters)[number]) => boolean) =>
      sampleShelters.filter(match).length;
    expect(count((s) => s.womenOnly)).toBe(2);
    expect(count((s) => s.acceptsChildren)).toBe(1);
    expect(count((s) => s.acceptsPets)).toBe(1);
    expect(count((s) => s.requiresSobriety)).toBe(1);
    expect(
      count(
        (s) =>
          !s.womenOnly &&
          !s.acceptsChildren &&
          !s.acceptsPets &&
          !s.requiresSobriety,
      ),
    ).toBe(1);
  });

  it("includes Northside, the shelter that accepts pets", () => {
    const petShelter = sampleShelters.find((s) => s.acceptsPets);
    expect(petShelter?.name).toBe("Northside");
  });

  it("uses only fictional 555-01xx phone numbers", () => {
    for (const shelter of sampleShelters) {
      expect(shelter.phone).toMatch(/^\(\d{3}\) 555-01\d\d$/);
    }
  });
});

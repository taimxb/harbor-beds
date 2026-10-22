import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Shelter } from "@/lib/shelters";
import { ShelterBoard } from "./shelter-board";

const now = new Date("2026-10-21T20:00:00-04:00");
const minutesAgo = (minutes: number) =>
  new Date(now.getTime() - minutes * 60_000);

const shelter = (overrides: Partial<Shelter>): Shelter => ({
  id: "id",
  name: "Shelter",
  address: "1 Main Street",
  phone: "(617) 555-0100",
  capacity: 40,
  occupied: 0,
  womenOnly: false,
  acceptsChildren: false,
  acceptsPets: false,
  requiresSobriety: false,
  closedAt: null,
  lastUpdatedAt: now,
  ...overrides,
});

describe("ShelterBoard", () => {
  it("shows a shelter's free beds, eligibility rules, address, phone and last updated", () => {
    render(
      <ShelterBoard
        now={now}
        shelters={[
          shelter({
            id: "harbor-house",
            name: "Harbor House",
            address: "92 Wharf Street",
            phone: "(617) 555-0102",
            capacity: 40,
            occupied: 37,
            womenOnly: true,
            lastUpdatedAt: minutesAgo(10),
          }),
        ]}
      />,
    );

    const card = screen.getByRole("article", { name: "Harbor House" });
    expect(within(card).getByText("3 free beds")).toBeInTheDocument();
    expect(within(card).getByText("Women only")).toBeInTheDocument();
    expect(within(card).getByText("92 Wharf Street")).toBeInTheDocument();
    expect(within(card).getByText("(617) 555-0102")).toBeInTheDocument();
    expect(within(card).getByText(/10 min ago/)).toBeInTheDocument();
  });

  it("hides closed shelters", () => {
    render(
      <ShelterBoard
        now={now}
        shelters={[
          shelter({ id: "open", name: "Northside" }),
          shelter({ id: "closed", name: "Old Mill", closedAt: minutesAgo(60) }),
        ]}
      />,
    );

    expect(screen.getByRole("article", { name: "Northside" })).toBeInTheDocument();
    expect(screen.queryByRole("article", { name: "Old Mill" })).not.toBeInTheDocument();
  });

  it("flags a shelter not updated for 3 hours as possibly out of date", () => {
    render(
      <ShelterBoard
        now={now}
        shelters={[
          shelter({ id: "fresh", name: "Northside", lastUpdatedAt: minutesAgo(25) }),
          shelter({ id: "stale", name: "Rosewood", lastUpdatedAt: minutesAgo(240) }),
        ]}
      />,
    );

    const stale = screen.getByRole("article", { name: "Rosewood" });
    expect(within(stale).getByText(/4 hr ago/)).toBeInTheDocument();
    expect(within(stale).getByText("May be out of date")).toBeInTheDocument();
    const fresh = screen.getByRole("article", { name: "Northside" });
    expect(within(fresh).queryByText("May be out of date")).not.toBeInTheDocument();
  });

  it("shows each eligibility rule a shelter has", () => {
    render(
      <ShelterBoard
        now={now}
        shelters={[
          shelter({ id: "pets", name: "Northside", acceptsPets: true }),
          shelter({ id: "sober", name: "Clearwater", requiresSobriety: true }),
          shelter({ id: "none", name: "Downtown" }),
        ]}
      />,
    );

    const northside = screen.getByRole("article", { name: "Northside" });
    expect(within(northside).getByText("Accepts pets")).toBeInTheDocument();
    const clearwater = screen.getByRole("article", { name: "Clearwater" });
    expect(within(clearwater).getByText("Requires sobriety")).toBeInTheDocument();
    const downtown = screen.getByRole("article", { name: "Downtown" });
    expect(within(downtown).getByText("No eligibility rules")).toBeInTheDocument();
  });

  it("counts family rooms at the shelter that accepts children", () => {
    render(
      <ShelterBoard
        now={now}
        shelters={[
          shelter({
            id: "family",
            name: "Maple Family Center",
            acceptsChildren: true,
            capacity: 20,
            occupied: 19,
          }),
        ]}
      />,
    );

    const card = screen.getByRole("article", { name: "Maple Family Center" });
    expect(within(card).getByText("Accepts children")).toBeInTheDocument();
    expect(within(card).getByText("1 free family room")).toBeInTheDocument();
  });
});

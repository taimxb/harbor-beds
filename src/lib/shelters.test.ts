import { describe, expect, it } from "vitest";
import { freeBeds, lastUpdatedStatus } from "./shelters";

describe("freeBeds", () => {
  it("is capacity minus occupied beds minus active holds", () => {
    expect(freeBeds({ capacity: 40, occupied: 30, activeHolds: 2 })).toBe(8);
  });

  it("is never below 0, even when occupied beds exceed a lowered capacity", () => {
    expect(freeBeds({ capacity: 30, occupied: 35, activeHolds: 0 })).toBe(0);
  });
});

describe("lastUpdatedStatus", () => {
  const now = new Date("2026-10-21T20:00:00-04:00");
  const minutesAgo = (minutes: number) =>
    new Date(now.getTime() - minutes * 60_000);

  it("describes a recent update in minutes and is not stale", () => {
    expect(lastUpdatedStatus(minutesAgo(10), now)).toEqual({
      text: "10 min ago",
      stale: false,
    });
  });

  it("is stale from 3 hours, described in hours", () => {
    expect(lastUpdatedStatus(minutesAgo(180), now)).toEqual({
      text: "3 hr ago",
      stale: true,
    });
  });

  it("is not stale one minute before 3 hours", () => {
    expect(lastUpdatedStatus(minutesAgo(179), now).stale).toBe(false);
  });

  it("describes an update less than a minute old as just now", () => {
    expect(lastUpdatedStatus(new Date(now.getTime() - 30_000), now).text).toBe(
      "just now",
    );
  });
});

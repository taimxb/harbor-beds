import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Shelter } from "@/lib/shelters";
import { FrontDeskScreen } from "./front-desk-screen";

const now = new Date("2026-10-21T19:50:00-04:00");

const northside: Shelter = {
  id: "northside-id",
  name: "Northside",
  address: "418 Larch Avenue",
  phone: "(617) 555-0101",
  capacity: 30,
  occupied: 29,
  womenOnly: false,
  acceptsChildren: false,
  acceptsPets: true,
  requiresSobriety: false,
  closedAt: null,
  lastUpdatedAt: now,
};

const renderScreen = (
  overrides: Partial<Shelter> = {},
  actions: { checkIn?: () => Promise<void>; checkOut?: () => Promise<void> } = {},
) =>
  render(
    <FrontDeskScreen
      shelter={{ ...northside, ...overrides }}
      now={now}
      checkIn={actions.checkIn ?? vi.fn(async () => {})}
      checkOut={actions.checkOut ?? vi.fn(async () => {})}
    />,
  );

describe("FrontDeskScreen", () => {
  it("shows the shelter's free beds and when it was last updated", () => {
    renderScreen();

    expect(
      screen.getByRole("heading", { name: "Northside front desk" }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 free bed")).toBeInTheDocument();
    expect(screen.getByText("Updated just now")).toBeInTheDocument();
  });

  it("checks in with one tap", async () => {
    const checkIn = vi.fn(async () => {});
    renderScreen({}, { checkIn });

    fireEvent.click(screen.getByRole("button", { name: "Check in" }));

    await waitFor(() => expect(checkIn).toHaveBeenCalledTimes(1));
  });

  it("checks out with one tap", async () => {
    const checkOut = vi.fn(async () => {});
    renderScreen({}, { checkOut });

    fireEvent.click(screen.getByRole("button", { name: "Check out" }));

    await waitFor(() => expect(checkOut).toHaveBeenCalledTimes(1));
  });

  it("does not offer Check out when no beds are occupied", () => {
    renderScreen({ occupied: 0 });

    expect(screen.getByRole("button", { name: "Check out" })).toBeDisabled();
  });

  it("ignores a second tap while the first is still being saved", async () => {
    let finishSaving = () => {};
    const checkIn = vi.fn(
      () => new Promise<void>((resolve) => (finishSaving = resolve)),
    );
    renderScreen({}, { checkIn });
    const button = screen.getByRole("button", { name: "Check in" });

    fireEvent.click(button);
    fireEvent.click(button);
    await waitFor(() => expect(button).toBeDisabled());
    expect(checkIn).toHaveBeenCalledTimes(1);

    finishSaving();
    await waitFor(() => expect(button).toBeEnabled());
  });
});

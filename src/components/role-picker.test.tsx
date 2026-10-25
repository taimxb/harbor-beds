import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RolePicker } from "./role-picker";

const shelter = (id: string, name: string, closedAt: Date | null = null) => ({
  id,
  name,
  closedAt,
});

describe("RolePicker", () => {
  it("offers Caseworker, one front desk per open shelter, and Admin", () => {
    render(
      <RolePicker
        shelters={[
          shelter("northside-id", "Northside"),
          shelter("harbor-id", "Harbor House"),
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Caseworker" })).toHaveAttribute(
      "href",
      "/board",
    );
    expect(
      screen.getByRole("link", { name: "Northside front desk" }),
    ).toHaveAttribute("href", "/front-desk/northside-id");
    expect(
      screen.getByRole("link", { name: "Harbor House front desk" }),
    ).toHaveAttribute("href", "/front-desk/harbor-id");
    expect(screen.getByRole("link", { name: "Admin" })).toHaveAttribute(
      "href",
      "/admin",
    );
  });

  it("leaves out the front desk of a closed shelter", () => {
    render(
      <RolePicker
        shelters={[
          shelter("northside-id", "Northside"),
          shelter("old-mill-id", "Old Mill", new Date("2026-10-01")),
        ]}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Northside front desk" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Old Mill front desk" }),
    ).not.toBeInTheDocument();
  });
});

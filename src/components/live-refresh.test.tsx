import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LiveRefresh } from "./live-refresh";

const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh }) }));

let notifyChange = () => {};
const unsubscribe = vi.fn();
const subscribeToShelterChanges = vi.fn(
  (_shelterId: string | undefined, onChange: () => void) => {
    notifyChange = onChange;
    return unsubscribe;
  },
);
vi.mock("@/lib/shelter-changes", () => ({
  subscribeToShelterChanges: (shelterId: string | undefined, onChange: () => void) =>
    subscribeToShelterChanges(shelterId, onChange),
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("LiveRefresh", () => {
  it("refreshes the screen when a shelter changes", () => {
    render(<LiveRefresh shelterId="northside-id" />);

    expect(subscribeToShelterChanges).toHaveBeenCalledWith(
      "northside-id",
      expect.any(Function),
    );
    expect(refresh).not.toHaveBeenCalled();
    notifyChange();
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("also refreshes every 30 seconds, in case a live change is missed", () => {
    render(<LiveRefresh />);

    vi.advanceTimersByTime(29_999);
    expect(refresh).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(refresh).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(30_000);
    expect(refresh).toHaveBeenCalledTimes(2);
  });

  it("stops refreshing when the screen is closed", () => {
    const { unmount } = render(<LiveRefresh />);

    unmount();
    vi.advanceTimersByTime(60_000);

    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(refresh).not.toHaveBeenCalled();
  });
});

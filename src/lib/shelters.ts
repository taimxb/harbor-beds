export type Shelter = {
  id: string;
  name: string;
  address: string;
  phone: string;
  capacity: number;
  occupied: number;
  womenOnly: boolean;
  acceptsChildren: boolean;
  acceptsPets: boolean;
  requiresSobriety: boolean;
  closedAt: Date | null;
  lastUpdatedAt: Date;
};

export function freeBeds({
  capacity,
  occupied,
  activeHolds,
}: {
  capacity: number;
  occupied: number;
  activeHolds: number;
}): number {
  return Math.max(0, capacity - occupied - activeHolds);
}

export function freeBedsAt(shelter: Shelter): number {
  // Holds arrive in ticket 05.
  return freeBeds({ ...shelter, activeHolds: 0 });
}

// Last updated turns amber after this long with no front desk action.
const STALE_AFTER_MINUTES = 3 * 60;

export function lastUpdatedStatus(
  updatedAt: Date,
  now: Date,
): { text: string; stale: boolean } {
  const minutes = Math.floor((now.getTime() - updatedAt.getTime()) / 60_000);
  const stale = minutes >= STALE_AFTER_MINUTES;
  if (minutes < 1) return { text: "just now", stale };
  if (minutes < 60) return { text: `${minutes} min ago`, stale };
  return { text: `${Math.floor(minutes / 60)} hr ago`, stale };
}

// Harbor's shelters are all in US Eastern time, wherever the server runs.
export function formatClockTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
  });
}

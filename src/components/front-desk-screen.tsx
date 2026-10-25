"use client";

import { startTransition, useState, useTransition } from "react";
import {
  freeBeds,
  freeCountText,
  frontDeskName,
  lastUpdatedStatus,
  type Shelter,
} from "@/lib/shelters";

export function FrontDeskScreen({
  shelter,
  now,
  checkIn,
  checkOut,
}: {
  shelter: Shelter;
  now: Date;
  checkIn: () => Promise<void>;
  checkOut: () => Promise<void>;
}) {
  // Holds arrive in ticket 05.
  const free = freeBeds({ ...shelter, activeHolds: 0 });
  const lastUpdated = lastUpdatedStatus(shelter.lastUpdatedAt, now);
  const [failed, setFailed] = useState<string | null>(null);
  const [checkingOut, startCheckOut] = useTransition();

  // A tap that did not save must not look like it did.
  const save = async (label: string, action: () => Promise<void>) => {
    setFailed(null);
    try {
      await action();
    } catch {
      setFailed(`${label} did not save. Tap again.`);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{frontDeskName(shelter)}</h1>
      <p className="text-4xl font-bold">{freeCountText(free, shelter)}</p>
      <p className="text-sm text-zinc-500">Updated {lastUpdated.text}</p>
      {failed && (
        <p
          role="alert"
          className="rounded-lg bg-red-100 px-4 py-3 font-medium text-red-800 dark:bg-red-950 dark:text-red-200"
        >
          {failed}
        </p>
      )}
      {/* Never disabled: two walk-ins tapped in quick succession must both
          count. A doubled tap is the safer mistake (lean toward caution). */}
      <button
        type="button"
        onClick={() => startTransition(() => save("Check in", checkIn))}
        className="rounded-xl bg-emerald-700 px-6 py-10 text-3xl font-bold text-white hover:bg-emerald-800"
      >
        Check in
      </button>
      <button
        type="button"
        disabled={checkingOut || shelter.occupied === 0}
        onClick={() => startCheckOut(() => save("Check out", checkOut))}
        className="rounded-xl border-2 border-zinc-400 px-6 py-4 text-xl font-semibold hover:bg-zinc-100 disabled:opacity-40 dark:hover:bg-zinc-900"
      >
        Check out
      </button>
    </section>
  );
}

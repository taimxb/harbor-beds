"use client";

import { useTransition } from "react";
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
  const [pending, startTransition] = useTransition();

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{frontDeskName(shelter)}</h1>
      <p className="text-4xl font-bold">{freeCountText(free, shelter)}</p>
      <p className="text-sm text-zinc-500">Updated {lastUpdated.text}</p>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(checkIn)}
        className="rounded-xl bg-emerald-700 px-6 py-10 text-3xl font-bold text-white hover:bg-emerald-800 disabled:opacity-60"
      >
        Check in
      </button>
      <button
        type="button"
        disabled={pending || shelter.occupied === 0}
        onClick={() => startTransition(checkOut)}
        className="rounded-xl border-2 border-zinc-400 px-6 py-4 text-xl font-semibold hover:bg-zinc-100 disabled:opacity-40 dark:hover:bg-zinc-900"
      >
        Check out
      </button>
    </section>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { subscribeToShelterChanges } from "@/lib/shelter-changes";

// Refreshes anyway this often, in case a live change is missed. It also keeps
// relative times such as "10 min ago" current.
const FALLBACK_REFRESH_MS = 30_000;

// Re-renders the current screen with fresh data when a shelter changes.
export function LiveRefresh({ shelterId }: { shelterId?: string }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = subscribeToShelterChanges(shelterId, () =>
      router.refresh(),
    );
    const interval = setInterval(() => router.refresh(), FALLBACK_REFRESH_MS);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [shelterId, router]);

  return null;
}

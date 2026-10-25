import { connection } from "next/server";
import { Suspense } from "react";
import { LiveRefresh } from "@/components/live-refresh";
import { ShelterBoard } from "@/components/shelter-board";
import { listShelters } from "@/lib/shelter-repository";
import { formatClockTime } from "@/lib/shelters";

export default function BoardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <h1 className="mb-1 text-2xl font-bold">Shelter board</h1>
      <LiveRefresh />
      <Suspense fallback={<p className="text-zinc-500">Loading shelters…</p>}>
        <LiveShelterBoard />
      </Suspense>
    </main>
  );
}

async function LiveShelterBoard() {
  await connection();
  const shelters = await listShelters();
  const now = new Date();
  return (
    <>
      <p className="mb-4 text-sm text-zinc-500">As of {formatClockTime(now)}</p>
      <ShelterBoard shelters={shelters} now={now} />
    </>
  );
}

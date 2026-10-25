import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { FrontDeskScreen } from "@/components/front-desk-screen";
import { LiveRefresh } from "@/components/live-refresh";
import { getShelter } from "@/lib/shelter-repository";
import { checkIn, checkOut } from "./actions";

export default function FrontDeskPage({
  params,
}: PageProps<"/front-desk/[shelterId]">) {
  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-6">
      <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
        {params.then(({ shelterId }) => (
          <LiveFrontDesk shelterId={shelterId} />
        ))}
      </Suspense>
    </main>
  );
}

async function LiveFrontDesk({ shelterId }: { shelterId: string }) {
  await connection();
  const shelter = await getShelter(shelterId);
  // A closed shelter is hidden from its front desk too.
  if (!shelter || shelter.closedAt !== null) notFound();

  return (
    <>
      <LiveRefresh shelterId={shelter.id} />
      <FrontDeskScreen
        shelter={shelter}
        now={new Date()}
        checkIn={checkIn.bind(null, shelter.id)}
        checkOut={checkOut.bind(null, shelter.id)}
      />
    </>
  );
}

import { connection } from "next/server";
import { Suspense } from "react";
import { RolePicker } from "@/components/role-picker";
import { listShelters } from "@/lib/shelter-repository";

// Stands in for sign in until ticket 11.
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-6">
      <h1 className="mb-1 text-2xl font-bold">Harbor Beds</h1>
      <p className="mb-4 text-zinc-500">Who are you?</p>
      <Suspense fallback={<p className="text-zinc-500">Loading shelters…</p>}>
        <Roles />
      </Suspense>
    </main>
  );
}

async function Roles() {
  await connection();
  return <RolePicker shelters={await listShelters()} />;
}

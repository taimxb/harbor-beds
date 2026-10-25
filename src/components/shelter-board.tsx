import {
  freeBeds,
  freeCountText,
  lastUpdatedStatus,
  type Shelter,
} from "@/lib/shelters";

export function ShelterBoard({
  shelters,
  now,
}: {
  shelters: Shelter[];
  now: Date;
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {shelters
        .filter((shelter) => shelter.closedAt === null)
        .map((shelter) => (
          <li key={shelter.id}>
            <ShelterCard shelter={shelter} now={now} />
          </li>
        ))}
    </ul>
  );
}

function ShelterCard({ shelter, now }: { shelter: Shelter; now: Date }) {
  const headingId = `shelter-${shelter.id}`;
  // Holds arrive in ticket 05.
  const free = freeBeds({ ...shelter, activeHolds: 0 });
  const lastUpdated = lastUpdatedStatus(shelter.lastUpdatedAt, now);
  const rules = eligibilityRules(shelter);

  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h2 id={headingId} className="text-lg font-semibold">
        {shelter.name}
      </h2>
      <p
        className={`text-2xl font-bold ${free > 0 ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-500"}`}
      >
        {freeCountText(free, shelter)}
      </p>
      <ul className="flex flex-wrap gap-2 text-sm">
        {rules.length > 0 ? (
          rules.map((rule) => (
            <li
              key={rule}
              className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800"
            >
              {rule}
            </li>
          ))
        ) : (
          <li className="text-zinc-500">No eligibility rules</li>
        )}
      </ul>
      <div className="text-sm">
        <p>{shelter.address}</p>
        <p>{shelter.phone}</p>
      </div>
      <p
        className={`mt-auto text-sm ${lastUpdated.stale ? "font-medium text-amber-700 dark:text-amber-400" : "text-zinc-500"}`}
      >
        Updated {lastUpdated.text}
        {lastUpdated.stale && (
          <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs dark:bg-amber-950">
            May be out of date
          </span>
        )}
      </p>
    </article>
  );
}

function eligibilityRules(shelter: Shelter): string[] {
  return [
    shelter.womenOnly && "Women only",
    shelter.acceptsChildren && "Accepts children",
    shelter.acceptsPets && "Accepts pets",
    shelter.requiresSobriety && "Requires sobriety",
  ].filter((rule): rule is string => rule !== false);
}

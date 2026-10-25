"use client";

import { useId, useState } from "react";
import {
  eligibleShelters,
  nothingTicked,
  type PersonFacts,
} from "@/lib/eligibility";
import { freeBedsAt, lastUpdatedStatus, type Shelter } from "@/lib/shelters";

const personQuestions: { fact: keyof PersonFacts; label: string }[] = [
  { fact: "isWoman", label: "Is a woman" },
  { fact: "hasChildren", label: "Has children with them" },
  { fact: "hasPet", label: "Has a pet" },
  { fact: "canStaySober", label: "Can stay sober" },
];

export function ShelterBoard({
  shelters,
  now,
}: {
  shelters: Shelter[];
  now: Date;
}) {
  // Kept in memory only: what is ticked about a person is never saved.
  const [person, setPerson] = useState<PersonFacts>(nothingTicked);
  const { withFreeBeds, noFreeBeds } = eligibleShelters(shelters, person);

  return (
    <div className="flex flex-col gap-6">
      <fieldset className="flex flex-wrap gap-x-6 gap-y-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <legend className="px-1 text-sm font-medium">The person</legend>
        {personQuestions.map(({ fact, label }) => (
          <label key={fact} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="size-4"
              checked={person[fact]}
              onChange={(event) =>
                setPerson({ ...person, [fact]: event.target.checked })
              }
            />
            {label}
          </label>
        ))}
      </fieldset>
      {withFreeBeds.length === 0 && noFreeBeds.length === 0 && (
        <p className="text-zinc-500">
          No shelter can take this person.
        </p>
      )}
      {withFreeBeds.length > 0 && (
        <ShelterGroup title="Free beds" shelters={withFreeBeds} now={now} />
      )}
      {noFreeBeds.length > 0 && (
        <ShelterGroup
          title="No free beds"
          shelters={noFreeBeds}
          now={now}
          greyedOut
        />
      )}
    </div>
  );
}

function ShelterGroup({
  title,
  shelters,
  now,
  greyedOut = false,
}: {
  title: string;
  shelters: Shelter[];
  now: Date;
  greyedOut?: boolean;
}) {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className={greyedOut ? "opacity-60" : ""}>
      <h2 id={headingId} className="mb-2 text-sm font-medium text-zinc-500">
        {title}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shelters.map((shelter) => (
          <li key={shelter.id}>
            <ShelterCard shelter={shelter} now={now} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ShelterCard({ shelter, now }: { shelter: Shelter; now: Date }) {
  const headingId = `shelter-${shelter.id}`;
  const free = freeBedsAt(shelter);
  const lastUpdated = lastUpdatedStatus(shelter.lastUpdatedAt, now);
  const rules = eligibilityRules(shelter);

  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h3 id={headingId} className="text-lg font-semibold">
        {shelter.name}
      </h3>
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

// The family shelter (the one that accepts children) counts family rooms, not beds.
function freeCountText(free: number, shelter: Shelter): string {
  const unit = shelter.acceptsChildren ? "family room" : "bed";
  return `${free} free ${unit}${free === 1 ? "" : "s"}`;
}

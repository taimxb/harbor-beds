import Link from "next/link";
import { frontDeskName, type Shelter } from "@/lib/shelters";

// Stands in for sign in until ticket 11 replaces it with shared logins.
export function RolePicker({
  shelters,
}: {
  shelters: Pick<Shelter, "id" | "name" | "closedAt">[];
}) {
  const roles = [
    { label: "Caseworker", href: "/board" },
    ...shelters
      .filter((shelter) => shelter.closedAt === null)
      .map((shelter) => ({
        label: frontDeskName(shelter),
        href: `/front-desk/${shelter.id}`,
      })),
    { label: "Admin", href: "/admin" },
  ];

  return (
    <ul className="flex flex-col gap-2">
      {roles.map((role) => (
        <li key={role.href}>
          <Link
            href={role.href}
            className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 text-lg font-medium hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            {role.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

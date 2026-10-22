import type { Shelter } from "./shelters";
import { supabase } from "./supabase";

export async function listShelters(): Promise<Shelter[]> {
  const { data, error } = await supabase
    .from("shelters")
    .select(
      "id, name, address, phone, capacity, occupied, women_only, accepts_children, accepts_pets, requires_sobriety, closed_at, last_updated_at",
    )
    // Closed shelters are filtered out on the board, where it is tested.
    .order("name");
  if (error) throw new Error(`Could not load shelters: ${error.message}`);

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    address: row.address,
    phone: row.phone,
    capacity: row.capacity,
    occupied: row.occupied,
    womenOnly: row.women_only,
    acceptsChildren: row.accepts_children,
    acceptsPets: row.accepts_pets,
    requiresSobriety: row.requires_sobriety,
    closedAt: row.closed_at ? new Date(row.closed_at) : null,
    lastUpdatedAt: new Date(row.last_updated_at),
  }));
}

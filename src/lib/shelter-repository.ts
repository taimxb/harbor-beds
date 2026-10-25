import type { Shelter } from "./shelters";
import { supabase } from "./supabase";

const SHELTER_COLUMNS =
  "id, name, address, phone, capacity, occupied, women_only, accepts_children, accepts_pets, requires_sobriety, closed_at, last_updated_at";

// Postgres error for text that is not a valid uuid, such as a mistyped URL.
const INVALID_TEXT_REPRESENTATION = "22P02";

export type FrontDeskActionType = "check_in" | "check_out";

export async function listShelters(): Promise<Shelter[]> {
  const { data, error } = await supabase
    .from("shelters")
    .select(SHELTER_COLUMNS)
    // Closed shelters are filtered out on the board, where it is tested.
    .order("name");
  if (error) throw new Error(`Could not load shelters: ${error.message}`);

  return data.map(toShelter);
}

export async function getShelter(id: string): Promise<Shelter | null> {
  const { data, error } = await supabase
    .from("shelters")
    .select(SHELTER_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error?.code === INVALID_TEXT_REPRESENTATION) return null;
  if (error) throw new Error(`Could not load shelter: ${error.message}`);

  return data && toShelter(data);
}

// Changes the occupied count, records the action and moves Last updated, all
// in one database call. Check out at 0 occupied changes nothing.
export async function recordFrontDeskAction(
  shelterId: string,
  type: FrontDeskActionType,
): Promise<void> {
  const { error } = await supabase.rpc("record_front_desk_action", {
    p_shelter_id: shelterId,
    p_type: type,
  });
  if (error) throw new Error(`Could not record ${type}: ${error.message}`);
}

function toShelter(row: {
  id: string;
  name: string;
  address: string;
  phone: string;
  capacity: number;
  occupied: number;
  women_only: boolean;
  accepts_children: boolean;
  accepts_pets: boolean;
  requires_sobriety: boolean;
  closed_at: string | null;
  last_updated_at: string;
}): Shelter {
  return {
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
  };
}

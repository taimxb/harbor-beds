import { supabase } from "./supabase";

// Calls onChange whenever a shelter row changes (one shelter, or every shelter
// when shelterId is left out). Returns a function that stops listening.
export function subscribeToShelterChanges(
  shelterId: string | undefined,
  onChange: () => void,
): () => void {
  // A unique name, so a remount never reuses a channel that is still closing.
  const channel = supabase
    .channel(`shelters-${crypto.randomUUID()}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "shelters",
        ...(shelterId && { filter: `id=eq.${shelterId}` }),
      },
      onChange,
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}

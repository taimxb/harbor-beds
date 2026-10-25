-- Front desk actions: each check in and check out at a shelter.
-- Privacy rule: an action records a shelter, a type and a time, never a person.
-- Actions are attributed to "[Shelter] front desk" through shelter_id (ADR 0002).

create table public.front_desk_actions (
  id uuid primary key default gen_random_uuid(),
  shelter_id uuid not null references public.shelters (id),
  type text not null check (type in ('check_in', 'check_out')),
  created_at timestamptz not null default now()
);

create index front_desk_actions_shelter_id_created_at_idx
  on public.front_desk_actions (shelter_id, created_at desc);

-- No policies: record_front_desk_action is the only way to write.
alter table public.front_desk_actions enable row level security;

-- Changes the occupied count and records the action in one step, so taps from
-- two devices at once cannot overwrite each other. Check in is never capped at
-- capacity (lean toward caution). Check out at 0 occupied changes nothing and
-- records nothing. Returns the new action's id, or null if nothing was recorded.
create function public.record_front_desk_action(p_shelter_id uuid, p_type text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_occupied integer;
  v_action_id uuid;
  v_created_at timestamptz;
begin
  if p_type not in ('check_in', 'check_out') then
    raise exception 'Unknown front desk action: %', p_type;
  end if;

  select occupied into v_occupied
  from public.shelters
  where id = p_shelter_id and closed_at is null
  for update;

  if not found then
    raise exception 'No open shelter with id %', p_shelter_id;
  end if;

  if p_type = 'check_out' and v_occupied = 0 then
    return null;
  end if;

  insert into public.front_desk_actions (shelter_id, type)
  values (p_shelter_id, p_type)
  returning id, created_at into v_action_id, v_created_at;

  update public.shelters
  set
    occupied = occupied + case when p_type = 'check_in' then 1 else -1 end,
    last_updated_at = v_created_at
  where id = p_shelter_id;

  return v_action_id;
end;
$$;

-- Open to anyone until sign in (ticket 11) limits each shelter to its own beds.
revoke execute on function public.record_front_desk_action(uuid, text) from public;
grant execute on function public.record_front_desk_action(uuid, text) to anon, authenticated;

-- Screens update live when a shelter's count changes.
alter publication supabase_realtime add table public.shelters;

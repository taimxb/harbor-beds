-- Shelters and the network-wide settings.
-- Beds are counted per shelter, not stored individually (ADR 0001).
-- Privacy rule: nothing here may identify a person Harbor serves.
-- Every text column describes a shelter, never a person.

create table public.shelters (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  address text not null,
  phone text not null,
  -- At the family shelter (the one that accepts children), capacity counts family rooms.
  capacity integer not null check (capacity >= 0),
  occupied integer not null default 0 check (occupied >= 0),
  women_only boolean not null default false,
  accepts_children boolean not null default false,
  accepts_pets boolean not null default false,
  requires_sobriety boolean not null default false,
  closed_at timestamptz,
  -- Time of the shelter's most recent front desk action.
  last_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- A single row: one curfew for the whole network.
create table public.network_settings (
  id boolean primary key default true check (id),
  curfew time not null default '21:00'
);

insert into public.network_settings (id) values (true);

alter table public.shelters enable row level security;
alter table public.network_settings enable row level security;

-- Read-only access until sign in (ticket 11) replaces this with per-login rules.
create policy "Anyone can read shelters"
  on public.shelters for select
  to anon, authenticated
  using (true);

create policy "Anyone can read network settings"
  on public.network_settings for select
  to anon, authenticated
  using (true);

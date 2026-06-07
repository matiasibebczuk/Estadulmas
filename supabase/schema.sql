-- Estadulmas - Supabase schema
-- Run this file in Supabase SQL Editor before deploying the app.

create extension if not exists "pgcrypto";

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  match_date date not null,
  rival text not null check (length(trim(rival)) > 0),
  sulma_goals integer not null default 0 check (sulma_goals >= 0),
  rival_goals integer not null default 0 check (rival_goals >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.match_players (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  player_name text not null check (length(trim(player_name)) > 0),
  goals integer not null default 0 check (goals >= 0),
  assists integer not null default 0 check (assists >= 0),
  created_at timestamptz not null default now()
);

create index if not exists matches_match_date_idx on public.matches (match_date desc);
create index if not exists match_players_match_id_idx on public.match_players (match_id);
create index if not exists match_players_player_name_idx on public.match_players (lower(player_name));

alter table public.matches enable row level security;
alter table public.match_players enable row level security;

-- The production app uses SUPABASE_SERVICE_ROLE_KEY only from Next.js server code.
-- These RLS policies keep browser anon clients from reading or writing directly.
drop policy if exists "No anonymous match access" on public.matches;
drop policy if exists "No anonymous player access" on public.match_players;

create policy "No anonymous match access"
on public.matches
for all
to anon
using (false)
with check (false);

create policy "No anonymous player access"
on public.match_players
for all
to anon
using (false)
with check (false);

-- Optional: if you later add Supabase Auth users, grant access only to authenticated users.
drop policy if exists "Authenticated users can manage matches" on public.matches;
drop policy if exists "Authenticated users can manage match players" on public.match_players;

create policy "Authenticated users can manage matches"
on public.matches
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated users can manage match players"
on public.match_players
for all
to authenticated
using (true)
with check (true);

create or replace view public.player_totals as
select
  player_name,
  count(*)::integer as pj,
  coalesce(sum(goals), 0)::integer as goals,
  coalesce(sum(assists), 0)::integer as assists
from public.match_players
group by player_name;

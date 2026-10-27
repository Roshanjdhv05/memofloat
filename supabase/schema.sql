-- ============================================================
-- Supabase Schema for MemoFloat Download Counts
-- Run this script in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New query -> Paste and click Run
-- ============================================================

-- 1. Create table to store global app statistics/counters
create table if not exists public.app_stats (
    id text primary key,
    value bigint not null default 0,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.app_stats enable row level security;

-- 3. Seed initial download counter starting at 332 (or change to your preferred start)
insert into public.app_stats (id, value)
values ('downloads', 332)
on conflict (id) do nothing;

-- 4. Policy: Allow public read access (anon and authenticated users can view download count)
create policy "Allow public read access to app_stats"
    on public.app_stats
    for select
    to anon, authenticated
    using (true);

-- 5. Atomic RPC function to increment download counter safely across concurrent visitors
create or replace function public.increment_download_count()
returns bigint
language plpgsql
security definer
as $$
declare
    new_count bigint;
begin
    update public.app_stats
    set value = value + 1,
        updated_at = timezone('utc'::text, now())
    where id = 'downloads'
    returning value into new_count;

    return new_count;
end;
$$;

-- 6. Grant execute permission for the RPC function to anon and authenticated roles
grant execute on function public.increment_download_count() to anon, authenticated;

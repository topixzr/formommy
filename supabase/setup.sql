create table if not exists public.user_progress (user_id uuid primary key references auth.users(id) on delete cascade, state jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now());
alter table public.user_progress enable row level security;
grant select, insert, update on table public.user_progress to authenticated;
create policy "Users read own progress" on public.user_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users insert own progress" on public.user_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users update own progress" on public.user_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
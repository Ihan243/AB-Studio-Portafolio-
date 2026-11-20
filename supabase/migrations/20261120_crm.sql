-- Run in Supabase SQL Editor. Never expose the service_role key in client code.
create table if not exists public.crm_staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  added_at timestamptz not null default now()
);
create table if not exists public.crm_leads (
  id bigint generated always as identity primary key,
  submission_id uuid not null unique,
  name text not null check (char_length(name) between 2 and 120),
  email text not null,
  description text not null,
  service text not null default '',
  plan text not null default '',
  channel text not null check (channel in ('email','whatsapp')),
  modules jsonb not null default '[]'::jsonb,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new','contacted','proposal','won','lost')),
  estimated_value numeric(12,2) not null default 0 check (estimated_value >= 0),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists crm_leads_status_created_idx on public.crm_leads(status,created_at desc);
alter table public.crm_staff enable row level security;
alter table public.crm_leads enable row level security;
revoke all on public.crm_staff from anon;
revoke all on public.crm_leads from anon;
grant select on public.crm_staff to authenticated;
grant select, update on public.crm_leads to authenticated;
create policy "Staff can see their own membership" on public.crm_staff
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Staff can read leads" on public.crm_leads
  for select to authenticated using (exists (select 1 from public.crm_staff s where s.user_id = (select auth.uid())));
create policy "Staff can update leads" on public.crm_leads
  for update to authenticated using (exists (select 1 from public.crm_staff s where s.user_id = (select auth.uid())))
  with check (exists (select 1 from public.crm_staff s where s.user_id = (select auth.uid())));
-- ADMIN SETUP: Add a staff member manually from SQL Editor, never through the public site:
-- insert into public.crm_staff(user_id) values ('USER_UUID_FROM_AUTH_USERS');
-- Disable public user signups in Supabase Auth settings; invite staff through the dashboard.

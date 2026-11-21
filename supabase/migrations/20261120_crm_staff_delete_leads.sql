-- AB Studio CRM: let verified CRM staff delete individual leads.
-- RLS membership matches the existing staff-only read/update policies.
-- Safe to apply without deleting any existing rows.
alter table public.crm_leads enable row level security;
revoke delete on table public.crm_leads from public, anon;
grant delete on table public.crm_leads to authenticated;

drop policy if exists "Staff can delete leads" on public.crm_leads;
create policy "Staff can delete leads"
  on public.crm_leads
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.crm_staff s
      where s.user_id = (select auth.uid())
    )
  );

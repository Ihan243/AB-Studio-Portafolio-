-- AB Studio CRM: explicit Data API permissions for newer Supabase projects.
-- Apply once in Supabase SQL Editor; safe to run repeatedly.
-- Keep anonymous users without direct database permissions.
grant usage on schema public to service_role;
grant select, insert on table public.crm_leads to service_role;
grant usage, select on sequence public.crm_leads_id_seq to service_role;
-- The authenticated role uses its existing SELECT/UPDATE grants, still restricted by RLS.
-- Verify service role access without exposing secrets:
-- select has_table_privilege('service_role','public.crm_leads','INSERT');

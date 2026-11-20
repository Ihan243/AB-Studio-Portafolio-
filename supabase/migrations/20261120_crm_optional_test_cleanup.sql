-- Optional cleanup after confirming the CRM works in production.
-- Only removes deliberately created test records with example.com addresses.
-- Review the SELECT first to confirm the matching rows before the DELETE.
select id, name, email, source, created_at
from public.crm_leads
where email in ('prueba@example.com', 'prueba2@example.com', 'prueba3@example.com')
  and name ilike 'Cliente de prueba%'
  and (description ilike '%prueba%' or description ilike '%verificar%');

-- Once verified, run the deletion below separately:
-- delete from public.crm_leads
-- where email in ('prueba@example.com', 'prueba2@example.com', 'prueba3@example.com')
--   and name ilike 'Cliente de prueba%'
--   and (description ilike '%prueba%' or description ilike '%verificar%');

-- AB Studio CRM: durable, atomic intake throttling.
-- Apply this once in the same Supabase project before enabling production intake.
-- Only the server role can invoke the function; no public direct access.
create table if not exists public.crm_request_limits (
  fingerprint text not null,
  hour_bucket timestamptz not null,
  attempts integer not null default 1 check (attempts > 0),
  primary key (fingerprint, hour_bucket)
);
alter table public.crm_request_limits enable row level security;
revoke all on public.crm_request_limits from public, anon, authenticated;
grant usage on schema public to service_role;

create or replace function public.crm_rate_limit_check(p_fingerprint text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attempts integer;
  v_hour timestamptz := date_trunc('hour', now());
begin
  if length(p_fingerprint) <> 64 or p_fingerprint !~ '^[0-9a-f]{64}$' then
    raise exception 'Invalid rate limit identifier';
  end if;
  insert into public.crm_request_limits (fingerprint, hour_bucket, attempts)
  values (p_fingerprint, v_hour, 1)
  on conflict (fingerprint, hour_bucket)
  do update set attempts = public.crm_request_limits.attempts + 1
  returning attempts into v_attempts;
  return v_attempts <= 8;
end;
$$;

revoke all on function public.crm_rate_limit_check(text) from public, anon, authenticated;
grant execute on function public.crm_rate_limit_check(text) to service_role;

-- Limit data retention: run periodically in SQL Editor or schedule a database job:
-- delete from public.crm_request_limits where hour_bucket < now() - interval '2 days';
-- No raw IP addresses are stored; the API sends only keyed HMAC fingerprints.

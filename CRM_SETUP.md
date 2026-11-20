# AB Studio CRM — Setup

This is a **foundation**, not a production-ready CRM until all steps below pass.

1. Create a Supabase project owned by AB Studio. Enable secure email/password authentication and disable public signups.
2. Run `supabase/migrations/20261120_crm.sql`, then `supabase/migrations/20261120_crm_api_grants.sql` in SQL Editor (explicit Data API grants are required for new Supabase projects).
3. Invite your administrator in Supabase Authentication > Users. Retrieve their UUID and add it to `crm_staff` through the SQL Editor.
4. In **Vercel's environment variables**, configure `SUPABASE_URL`, server-only `SUPABASE_SECRET_KEY`, and **public** `SUPABASE_PUBLISHABLE_KEY` for the environments where you need the CRM. Never put the secret key into public HTML, frontend JavaScript, GitHub code, or the CRM setup screen.
5. At `/admin/`, the panel first uses the **static browser-safe** URL/publishable key in `public/admin/public-config.js` to avoid depending on a serverless API. It asks for **email and password** only. When rotating the publishable key or switching Supabase projects, update this public file and deploy. If that file is missing, the page attempts `/api/crm-public-config`, then a one-time browser setup. The admin never stores passwords, secret keys or access tokens in local storage.
6. Open `/api/inquiries` on the same Preview deployment and confirm `{ ok: true, service: 'crm-intake', configured: true }` before testing submissions. An API 404 means the route was not deployed; `configured: false` means that deployment does not have both server environment variables. Test an inquiry end-to-end using a safe test record; confirm it appears in the admin panel. Then test an unauthorized account, failed database calls, duplicated submissions, email/WhatsApp fallback, desktop and mobile layouts.
7. Add proper abuse controls (e.g. server-verified CAPTCHA / rate limiting), automated backups, access logging, retention/deletion procedures and notification delivery before inviting broad public traffic.

## What this foundation supports

- Public inquiry creation with contact details and explicit consent
- Server-side validation, honeypot and unique submission identifiers
- Team-only lead listing and updates through Supabase Auth and RLS
- Pipeline stages: new, contacted, proposal, won and lost
- Private notes, estimated deal value, and simple totals

## Safe Production Launch

- The public portfolio remains contact-only on Production until CRM intake is explicitly enabled. This avoids breaking WhatsApp/email when only Preview has Supabase credentials.
- Configure `SUPABASE_URL` and `SUPABASE_SECRET_KEY` for **Production** in the correct Vercel project. Keep the secret in Vercel, never the repository.
- Before enabling public collection, test unauthorized access against the *live Supabase project* and implement and verify server-side anti-spam protection (CAPTCHA/rate limiting), backups, and a privacy retention policy.
- Apply `supabase/migrations/20261120_crm_rate_limit.sql` to the live Supabase database, then verify the RPC is restricted to `service_role`. The API fails closed when the throttling RPC is missing.
- Verify the live no-login RLS check `node scripts/crm-live-rls-test.js` succeeds before inviting public traffic.
- In the correct **Production** project, configure `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and set both `CRM_RATE_LIMIT_ENABLED=true` and `CRM_CAPTURE_ENABLED=true`, then redeploy. The capture feature deliberately stays disabled unless *both* flags are enabled in Production.
- Throttling uses keyed fingerprints of email and, when available, client IP. It enforces up to 8 attempts per fingerprint per hour; it does not store raw IP addresses. Maintain regular deletion of old throttle buckets. This is baseline anti-abuse protection, not a guarantee against sophisticated bots.
- Verify an actual test inquiry is recorded once in Production, including a retry and a change from email to WhatsApp. Use `supabase/migrations/20261120_crm_optional_test_cleanup.sql` to review test records before optionally deleting them. When disabled, the form uses the existing WhatsApp/email flow and does not claim CRM storage.
- Verify a fresh, consenting test inquiry from the production URL appears in the authorized admin dashboard; then delete test records through the administrator.
- Preview requires credentials but not the Production launch flag, allowing end-to-end verification without changing the public website.

## Limitations

- The `SUPABASE_PUBLISHABLE_KEY` value must be entered in Vercel once per environment for automatic sign-in setup. The URL and publishable key are public, but the `SUPABASE_SECRET_KEY` is strictly server-only. Environment variables and schema must be configured in the user's own Supabase/Vercel accounts. Verify they are set in the same Vercel project that is deploying this PR.
- No email notifications, automatic follow-up reminders or customer/project management yet.
- The rate limit migration is not automatically applied by merging code; it must be run in the correct Supabase project before activation.
- Production availability and full integration testing must be confirmed in Vercel.
- The intake endpoint accepts the canonical domain, localhost and the current Vercel preview deployment hostname; update its allowlist before moving to a custom domain. A host allowlist is not a substitute for bot protection.
- This prototype loads at most the latest 200 leads and has no pagination or refresh-token lifecycle.

## CRM static configuration (404 recovery)

The production site had `/api/crm-public-config` return `404 NOT_FOUND` even though `/admin/` was available. To avoid blocking sign-in on serverless routing, the dashboard loads `/admin/public-config.js` before `/admin/crm.js`. That file includes only the **public** Supabase project URL and the **publishable** key (safe to expose with correct RLS). The optional API remains as a fallback. Do not copy the server `sb_secret_...` value into public files. Any future public key rotation requires updating this static file and deploying again.

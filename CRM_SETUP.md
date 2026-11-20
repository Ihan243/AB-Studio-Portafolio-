# AB Studio CRM — Setup

This is a **foundation**, not a production-ready CRM until all steps below pass.

1. Create a Supabase project owned by AB Studio. Enable secure email/password authentication and disable public signups.
2. Run `supabase/migrations/20261120_crm.sql`, then `supabase/migrations/20261120_crm_api_grants.sql` in SQL Editor (explicit Data API grants are required for new Supabase projects).
3. Invite your administrator in Supabase Authentication > Users. Retrieve their UUID and add it to `crm_staff` through the SQL Editor.
4. In **Vercel's server-side environment variables**, configure `SUPABASE_URL` and `SUPABASE_SECRET_KEY`. Never put the secret key into public HTML, frontend JavaScript, GitHub code, or the CRM setup screen.
5. At `/admin/`, enter your **public** project URL and publishable key, then log in using the invited staff account. The admin screen deliberately does not persist passwords, tokens, or project keys to local storage.
6. Open `/api/inquiries` on the same Preview deployment and confirm `{ ok: true, service: 'crm-intake', configured: true }` before testing submissions. An API 404 means the route was not deployed; `configured: false` means that deployment does not have both server environment variables. Test an inquiry end-to-end using a safe test record; confirm it appears in the admin panel. Then test an unauthorized account, failed database calls, duplicated submissions, email/WhatsApp fallback, desktop and mobile layouts.
7. Add proper abuse controls (e.g. server-verified CAPTCHA / rate limiting), automated backups, access logging, retention/deletion procedures and notification delivery before inviting broad public traffic.

## What this foundation supports

- Public inquiry creation with contact details and explicit consent
- Server-side validation, honeypot and unique submission identifiers
- Team-only lead listing and updates through Supabase Auth and RLS
- Pipeline stages: new, contacted, proposal, won and lost
- Private notes, estimated deal value, and simple totals

## Limitations

- Environment variables and schema must be configured in the user's own Supabase/Vercel accounts. Verify they are set in the same Vercel project that is deploying this PR.
- No email notifications, automatic follow-up reminders or customer/project management yet.
- Production availability and full integration testing must be confirmed in Vercel.
- The intake endpoint accepts the canonical domain, localhost and the current Vercel preview deployment hostname; update its allowlist before moving to a custom domain. A host allowlist is not a substitute for bot protection.
- This prototype loads at most the latest 200 leads and has no pagination or refresh-token lifecycle.

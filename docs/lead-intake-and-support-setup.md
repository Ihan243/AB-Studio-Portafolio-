# AB Studio — publishing a real inquiry backend

## Current public behavior (accurate as of this feature)
The website, Business Management quote configurator and contact form prepare **email or WhatsApp drafts** with the visitor's selections. Neither draft is sent automatically. No customer information is stored in a database by these forms. This is deliberate: without a verified sending domain and a securely configured backend, claiming successful on-site submission would mislead customers.

The estimate configurator is client-side math only. Published website starting rates: Basic $1,100; Professional $1,500; Premium $2,500. Published SEO: $200 setup + $30/month. Published dedicated CRM: Starter $900–$1,500 + $39/month, Growth $1,500–$3,000 + $89/month, Enterprise from $3,000 + $199+/month. The Business Management dashboard has **no automatic price** and must be scoped and quoted by modules. Third-party fees, taxes, hosting and optional maintenance are separate unless agreed.

## Required owner setup before changing the forms to direct submission

1. Choose the lead storage provider (for example Supabase/PostgreSQL), configure a production project and own its billing.
2. Choose a transactional mail provider, verify the AB Studio sending domain (including SPF/DKIM as required), and configure the sender and reply-to policies.
3. Create a Vercel serverless endpoint such as `POST /api/leads` (or an equivalent trusted backend). Keep database service-role and mail API secrets **only** in the Vercel server environment; never expose them in `public/`, frontend JavaScript, HTML, or GitHub.
4. Validate and normalize request data on the server (plan among Basic/Professional/Premium, optional modules from an allowlist, description length, email address if provided, body size, and URL origin as an additional signal). Use rate limiting and bot mitigation and do not rely on client validation alone.
5. Store only the information required for a quote and record creation date/source and consent where appropriate. Limit access to AB Studio staff, define retention/deletion and privacy notice, and avoid logging customer messages or access tokens by default.
6. Send an owner notification. Treat database write and notification as separate operations, with monitoring and retries. Never show a confirmation message unless an accepted request was actually recorded.
7. Add a client-side `fetch` submission UI with loading, network error, validation error, and a real success response. Keep email/WhatsApp as manual alternatives for visitors whose requests cannot be submitted.
8. Test spam, simultaneous requests, denied requests, mobile network failures, locale switching, keyboard accessibility, and privacy deletion. Document backups and restore tests before promising any recovery SLA.

## Contract and operations decisions still needed

Before promising the current CRM support tiers ($39/$89/$199+), define in writing:

- Exact monthly inclusions/exclusions and the number/type of minor fixes.
- Support hours, response-time targets, escalation, maintenance windows and vacation coverage.
- Which party pays hosting, database, transactional mail, messaging APIs, domain renewals and taxes.
- Backup schedule, retention, restore responsibility, and recovery objectives supported by the actual purchased hosting/database plan.
- Whether new features and API integration changes are separately scoped.
- Clear distinction between a customer-follow-up CRM and the operational Business Management add-on to a website.

Do not activate direct submission, promise a specific response SLA, or advertise "daily backup" until the required providers and staff workflow are actually configured.

# Enate Restaurant

## Reservation backend setup

Reservations use a Next.js API route and Neon Postgres. To enable them in Vercel:

1. In the Vercel project, open **Storage** and create/connect a Neon Postgres database.
2. Add the database connection string as `DATABASE_URL` for Production, Preview, and Development.
3. Add `ADMIN_PASSWORD`, a separate long random `ADMIN_SESSION_SECRET`, and `CRON_SECRET` environment variables.
4. Redeploy the site.

The first reservation automatically creates the `reservations` table. Guests can submit booking enquiries from the site. Sign in at `/admin` with `ADMIN_PASSWORD`, then open **Reservations** to view the enquiries.

Reservations more than one month old are removed automatically each day by the Vercel cron job. The same cleanup also runs whenever a booking is created or the reservation list is opened.

For local development, copy `.env.example` to `.env.local` and provide the same values.

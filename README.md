# Nikah Studio SaaS Wedding Builder

SaaS wedding website builder with one-time event pricing, plan-based feature limits, add-ons, and SEO-ready public pages.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- PostgreSQL + Prisma ORM

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start Postgres via Docker:
   ```bash
   docker compose up -d
   ```
3. Configure `.env` with your `DATABASE_URL`, for example:
   ```bash
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nikah?schema=public"
   ```
   Add Midtrans credentials for checkout:
   ```bash
   MIDTRANS_SERVER_KEY="YOUR_SERVER_KEY"
   MIDTRANS_IS_PRODUCTION="false"
   ```
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
5. Run the dev server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/config/pricing.ts`: pricing plans + feature caps
- `src/lib/features.ts`: feature flag derivation + limits
- `src/lib/seo.ts`: metadata helpers for wedding pages
- `src/app/[slug]`: public wedding pages + OG image
- `src/app/sitemap.ts`: sitemap generator
- `src/app/robots.ts`: robots.txt config

## Deployment (Fastest, Efficient Option)

Recommended: **Vercel + Neon (Postgres)** for fastest deploy and scaling.

1. Create a Neon database and copy the connection string.
2. Push Prisma schema:
   ```bash
   npx prisma migrate deploy
   ```
3. Create a Vercel project and set env vars:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SHOW_FOOTER_CREDIT`
4. Deploy:
   ```bash
   npx vercel
   ```

## Notes

- Wedding pages are indexable only when published.
- Dashboard routes are excluded from indexing.
- Payments are processed via Midtrans Snap and use Rupiah (IDR).

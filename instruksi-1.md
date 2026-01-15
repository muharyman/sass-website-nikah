You are building a SaaS Wedding Website Builder.

Tech stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma ORM

Core requirements:
1. Implement pricing plans:
   - Free, Basic, Premium, Exclusive
   - One-time payment per event (not subscription)

2. Each wedding event has:
   - owner_id
   - slug (unique)
   - plan_type (free | basic | premium | exclusive)
   - status (draft | published)
   - feature_flags (derived from plan + addons)

3. Implement feature limits:
   - RSVP limit
   - Gallery limit
   - Watermark visibility
   - Template access
   - Custom theme access
   - Guestbook access
   - Background music access
   - Export RSVP access
   - Custom domain access
   - QR check-in access

4. Add-on system:
   - Add-ons stored per event
   - Add-ons override plan limitations
   - Add-ons can be purchased after publish

5. Pages to implement:
   - /pricing (static marketing page)
   - /dashboard
   - /dashboard/events
   - /dashboard/events/[id]/editor
   - /dashboard/events/[id]/rsvp

6. Enforce limits:
   - Block UI actions when limits exceeded
   - Show upgrade or add-on prompt

7. Use clean architecture:
   - Separate domain logic (plan & feature checks)
   - Reusable feature guard utilities

Deliverables:
- Database schema (Prisma)
- Feature guard helper functions
- Pricing config file
- Basic UI components for pricing cards

You are building a SaaS Wedding Website Builder with strong SEO.

SEO requirements (MANDATORY):

1. Use Next.js App Router metadata API
   - Static metadata for marketing pages
   - Dynamic metadata for wedding pages based on slug

2. Wedding public pages:
   - URL format: /{slug}
   - Slug must be SEO-friendly and unique
   - Draft events must use noindex
   - Published events must be indexable

3. Implement Open Graph:
   - og:title
   - og:description
   - og:image (generated per wedding)
   - og:type = website

4. Sitemap:
   - Auto-generate sitemap.xml
   - Include:
     - Homepage
     - Pricing
     - Templates
     - All published wedding pages
   - Exclude drafts and dashboard routes

5. Robots.txt:
   - Allow public pages
   - Disallow /dashboard

6. Performance:
   - Use next/image for all images
   - Lazy-load galleries
   - Optimize OG image size (1200x630)

7. Content uniqueness:
   - Render bride name, groom name, date, city, and venue in HTML
   - Avoid duplicate content across wedding pages

8. Internal linking:
   - Add footer credit link (toggleable)
   - Link templates pages to homepage and pricing

Deliverables:
- SEO utility helpers
- Metadata generator for wedding pages
- Sitemap generator
- Robots.txt config

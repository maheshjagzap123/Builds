# Mahesh Builds

SEO-focused React/Vite website for Mahesh Builds — website, web application, mobile app and custom business software development in India.

## Local development

```powershell
npm install
npm run dev
```

## Production build

```powershell
npm run build
```

The build pipeline automatically:

1. Generates `public/sitemap.xml` from verified route data.
2. Generates a 1200×630 PNG social card at `public/assets/img/og-default.png`.
3. Builds the Vite application.
4. Prerenders all public service, local, industry, work and project routes into crawlable HTML.

## Contact form

The production form currently uses the public Formspree endpoint `https://formspree.io/f/mkjgbdlb`. You can optionally override it by copying `.env.example` to `.env.local` and changing `VITE_CONTACT_ENDPOINT`:

```text
VITE_CONTACT_ENDPOINT=https://your-form-endpoint.example
```

If the configured endpoint is unavailable, the form displays a real error and provides email and WhatsApp alternatives. It never displays a false sent state.

Before production launch, submit a test enquiry through the configured endpoint and verify receipt. Add server-side validation, rate limiting and/or spam protection at the endpoint.

## Public SEO routes

- `/`
- `/work` and `/work/:slug`
- `/services/website-development`
- `/services/web-application-development`
- `/services/business-software-development`
- `/services/mobile-app-development`
- `/website-development-pune`
- `/industries/:slug`

Unknown direct URLs are routed to the static `404.html` with a real 404 status through `public/_redirects` on compatible hosts.

## Deployment checklist

- Confirm `https://maheshbuilds.com` is the production domain; update the origin constants if it changes.
- Configure `VITE_CONTACT_ENDPOINT` in the production environment.
- Create and verify a domain mailbox before replacing the current Gmail address. Do not publish an unverified mailbox.
- Verify the host supports the `_redirects` syntax or configure its equivalent true-404 rule.
- Add the domain to Google Search Console and submit `https://maheshbuilds.com/sitemap.xml`.
- Validate Organization, Service, FAQ, CollectionPage and SoftwareApplication data using Google's Rich Results Test / Schema.org validator after deployment.
- Test one enquiry by endpoint, email and WhatsApp on a real phone.
- Replace honest project placeholders only with real screenshots and permission-cleared client evidence.
- Add real social profile URLs to Organization `sameAs` only after those profiles are confirmed.

## Content integrity

Do not invent clients, screenshots, testimonials, outcomes, statistics, technologies or project links. Unknown portfolio details remain omitted until verified.

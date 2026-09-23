# Mahesh Builds — Full Website Audit

**Reviewer role:** Potential client + UX/UI, SEO, performance, accessibility, conversion & code auditor
**Method:** Full source-code inspection + production build analysis. Rendered behaviour is inferred from code, CSS and the build output.
**Important:** No Lighthouse/PageSpeed scores are invented. Where a metric was not measured it is marked *"Not measured — code-based assessment only."*
**Status:** Audit only. No website code has been changed. Implementation should begin only after you approve.

---

## 1. Executive Summary

Mahesh Builds is a genuinely well-engineered React/Vite single-page site with a strong, distinctive visual identity — a "digital product studio" positioning, a cinematic preloader, a custom cursor, a proper dark/light theme system, smooth scrolling, and a 3D WebGL hero. The **craft is real and the code is defensive** (error boundary, preloader failsafe, reduced-motion handling). As a demonstration of front-end ability, it is impressive.

**But as a business tool that converts a real client, it has serious gaps.** The three issues that matter most:

1. **The contact form goes nowhere.** It is a client-side stub (`setTimeout`) with no backend/email wiring. Every "enquiry received" message is a lie — leads are silently lost. This is the single most damaging problem.
2. **There is no real portfolio yet — but there is now a clear plan for one.** Currently only one project is "active", and it is a placeholder that literally shows *"Full case study coming soon"* and *"To be documented as part of the full case study."* A studio whose entire pitch is "we build things" is showing a client zero finished work. **New direction (this revision):** build a proper Work ecosystem split into **Personal Projects** (real, verified: *TripWise*, *Paithani Marketplace*, *Milk Management System*) and a separate, future-ready **Client Projects** section that stays empty (with a professional empty state) until real, permission-cleared client work is provided. No fake clients, logos, testimonials, results or screenshots. See the fully specified architecture in **§18 Portfolio / Project Audit** and the routing/SEO plan in **§11–13**.
3. **The site is heavy and hard to find.** ~1.2 MB of JS (176 KB gzipped of `three.js` alone, purely for a decorative hero) plus hash-based routing, no `robots.txt`, no `sitemap.xml`, and no `og:image`. A studio selling websites should model best-practice performance and discoverability, and currently does not.

**Verdict in one line:** Technically impressive, commercially not ready to show clients until the form works and a real Work section (starting with the three verified personal projects) is live on crawlable URLs.

---

## 2. Website Understanding

| Area | Finding |
|---|---|
| Framework | React 18 + Vite 6 |
| Routing | Custom hash router (`useHashRoute`) — routes: `/` (home), `#/work`, `#/industries/:slug`. SPA, no server routing. `public/_redirects` sends all paths to `index.html`. **Target (see §11):** move Work + project detail pages to real crawlable paths (`/work`, `/work/tripwise`, etc.), not hash-only. |
| Animation libs | GSAP (+ ScrollTrigger), Framer Motion, Lenis (smooth scroll) |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` — hero background only, desktop only, lazy-loaded |
| Icons | `lucide-react` |
| Fonts | Manrope + Instrument Serif via Google Fonts (`preconnect` present) |
| Theme | `data-theme` on `<html>`, no-flash inline script in `index.html`, `localStorage('mb.theme')`, full semantic CSS token set for light/dark |
| Cursor | `CustomCursor` (dot + ring) + `CursorSpotlight` glow. Disabled on coarse pointer + reduced-motion. |
| Sections (home) | Hero → AgencyIntro → WhatWeBuild → WhenYouNeedUs → BuiltForBusinesses → Industries → WorkTeaser → Ecosystem → WhyUs → Maintenance → Process → Technology → FAQ → CTA → Contact |
| Forms | One contact/enquiry form — **client-side stub, no real submission** |
| Contact channels | Email `maheshjagzap03@gmail.com`, phone/`tel:` `+91 7588174528`. **No WhatsApp link, no LinkedIn/Instagram/GitHub.** |
| SEO base | `<title>`, meta description, canonical, OG tags, Twitter tags, Organization JSON-LD. **No `og:image`, no robots.txt, no sitemap.** |
| CSS | Single `main.css`, 4,005 lines / ~114 KB source (79 KB built, 14 KB gzipped) |
| Build | Succeeds in ~25s, no errors |

**Target audience (inferred from content):** Indian small-to-mid businesses, startups, institutes and local businesses needing websites, web apps, mobile apps and custom business software. Positioning is "one digital partner" / studio, not freelancer.

**Business purpose:** Generate qualified project enquiries. Everything should serve that. Right now the funnel ends in a dead form.

---

## 3. First-5-Seconds Test

- **What does it do?** Mostly clear — "We build digital products that move business forward" + a clear sub-line. Good.
- **Who is it for?** "Growing businesses" — a little generic, but acceptable.
- **What's offered?** Clear once you scroll (Websites, Web apps, Mobile, Business software, Automation, Maintenance).
- **Trustworthy?** *Partially.* Looks polished, but there is **no proof** — no client logos, no testimonials, no finished case study, no founder identity beyond a Gmail address.
- **Looks like a real business?** Looks like a real *portfolio/agency site*, but the Gmail address (not a `@maheshbuilds.com` address) and the empty work section undercut it.
- **Obvious next step?** Yes — "Start a Project" appears in nav, hero and repeatedly.
- **Confusing / flashy?** The ~5-second preloader (which replays on **every** refresh) plus a **spoken "Welcome to Mahesh Builds" voice** is the biggest friction. Flashy, and for a returning visitor or a busy client, mildly annoying.

**Strict assessment:** Strong first impression visually; weak on trust and slowed by an over-long, repeating intro.

---

## 4. Real Client POV

You land from Google/referral. The intro animation plays (and talks). You read a confident headline. You scroll — the services and "which problem do you have" framing is genuinely good and client-centric. Then you reach "What we've built" expecting proof and find **one card that says "case study coming soon."** You click "Start a Project", fill the form, hit submit, see "enquiry received" — and in reality **nothing was sent.**

That is the exact journey today, and it breaks at the two moments that decide a sale: *proof* and *contact*.

---

## 5. Trust Audit

| Signal | Present? | Notes |
|---|---|---|
| Clear business identity | Partial | Name + tagline good; no founder name/photo/story on the page |
| Clear services | ✅ Good | `WhatWeBuild` is excellent |
| Portfolio credibility | ❌ **Missing** | 1 placeholder project; real project hidden |
| Project outcomes/results | ❌ Missing | Placeholder says "outcome to be documented" |
| Testimonials / reviews | ❌ Missing | None anywhere |
| Client logos | ❌ Missing | None |
| Contact info | Partial | Email + phone, but Gmail (not domain email); no WhatsApp/social |
| Easy enquiry | ❌ **Broken** | Form doesn't submit |
| Professional copy | ✅ Good | Clean, benefit-led, few clichés |
| Consistent branding | ✅ Good | Strong system |
| Business legitimacy | Partial | No address/GST/registered-name/"about" — fine for a solo studio but adds no trust |

**Highest-value missing trust element — stated with the required *why*:**

> **Missing:** Real, provable built work (project → problem → solution → what it does).
> **Why it matters:** A client can currently see *that* you can style a page but cannot see *that you have actually built* working products. Proof of built work is the number-one thing that converts a services buyer.
> **Recommendation (revised — see §18):** Ship the Work ecosystem with the three **verified Personal Projects** (TripWise, Paithani Marketplace, Milk Management System) using only verified facts + clearly-labelled contextual supporting imagery, and feature them on the homepage teaser and a crawlable `/work` page. Add **real** client case studies/testimonials only when actual, permission-cleared client data is provided — never fabricated. Until then, the Client Projects section uses a professional empty state.

---

## 6. UX / UI Audit

| # | Issue | Severity |
|---|---|---|
| 1 | **Contact form is a non-functional stub** — shows success but sends nothing | **Critical** |
| 2 | **Work section has no real content** — one "coming soon" placeholder card | **Critical** |
| 3 | Preloader (~5s) replays on **every** page load; session-skip is disabled in code | **High** |
| 4 | Preloader triggers **speech synthesis** ("Welcome to Mahesh Builds") — unexpected audio, can feel intrusive/unprofessional in an office | **High** |
| 5 | Custom cursor `is-down` (click) state jumps the ring to the top-left corner (CSS reads `var(--rx)/var(--ry)` that JS never sets) | **High** |
| 6 | Placeholder copy leaks to users: "To be documented as part of the full case study" is shown verbatim in the case-study modal | **High** |
| 7 | Case-study modal has no focus trap (keyboard focus can leave the dialog) | **Medium** |
| 8 | Two competing hero CTAs of similar weight ("Start a Project" / "View What We've Built"), but the second leads to an empty section | **Medium** |
| 9 | No visible skip-link for keyboard users to bypass nav/intro | **Medium** |
| 10 | Empty/placeholder states are honest ("coming soon") but reduce confidence | **Medium** |
| 11 | Loading state on form ("Sending enquiry…") is fine; **no error state is ever reachable** because there's no real request | **Low** |

**What's genuinely good (do not "fix"):** typography scale, spacing tokens, section-head consistency, problem-first service framing, dark theme aesthetics, magnetic buttons, responsive grid breakdowns.

---

## 7. Mobile Audit

Assessment is code-based (CSS breakpoints + overflow lockdown). *Not measured on physical devices.*

**Good:**
- Explicit `overflow-x: clip` lockdown on `html, body, #root` — strong defence against horizontal scroll.
- Breakpoints at 1024 / 900 / 768 / 640 / 400 px; dedicated small-phone rules (`≤400px` drops font-size, shrinks logo, clamps hero).
- Custom cursor + spotlight correctly `display:none` on `pointer: coarse` and `hover: none`.
- Mobile menu: body scroll lock, `Escape` to close, `aria-expanded`, `tabIndex` gating. Solid.
- Scroll-reveal safety net forces content visible on touch if ScrollTrigger fails — good defensive touch.
- `viewport-fit=cover` + `env(safe-area-inset-*)` padding for notched phones.

**Concerns:**
- **Performance on mid/low-end Android** (the likely Indian SMB client device) is the real mobile risk: even though WebGL is skipped on `≤768px`, GSAP + Framer Motion + Lenis + a 5s preloader still run. *Not measured — code-based only.*
- Touch targets: burger and links look adequate; verify all tap targets ≥44px on device.
- The preloader voice will also fire on mobile (subject to autoplay policies) — may be blocked, may surprise.

**Rule applied:** a desktop-perfect / mobile-heavy site cannot get a positive overall score. Mobile here is *structurally* sound but *weight*-risky.

---

## 8. Animation Audit

| Animation | Purpose | Verdict | Reason |
|---|---|---|---|
| Preloader (4-frame cinematic, ~5s) | Brand intro | **MODIFY / REDUCE** | Delays content on every load; replays each refresh. Cut to ≤2s and run once per session (the code already has `WELCOME_KEY`, just disabled). |
| Preloader **voice** | "Delight" | **REMOVE** (or opt-in) | Unexpected audio is off-putting in professional/office contexts and adds nothing to conversion. |
| Hero headline reveal | Focus attention | **KEEP** | Short, purposeful, tied to content. |
| Hero WebGL background | Atmosphere | **MODIFY** | Beautiful but costs 176 KB gz of `three.js`. Consider a lighter canvas/CSS effect or load it even more conservatively. |
| Scroll reveals (RevealText/FadeUp) | Pacing | **KEEP** | Tasteful, staggered, reduced-motion aware. |
| Footer wordmark scrub | Polish | **KEEP** | Cheap, subtle. |
| Work card image scale-on-scroll | Polish | **KEEP** | Fine once real images exist. |
| Cursor spotlight glow | Decoration | **KEEP (desktop)** | Cheap; already disabled on touch/reduced-motion. |
| Custom cursor ring | Interactivity cue | **MODIFY** | Fix the click-state jump bug first (see §9). |
| Case-study modal clip reveal | Transition | **KEEP** | Good. |

Rule applied — *animation should support the message, not compete with it.* The only animations competing with the message are the **preloader length + voice**.

---

## 9. Cursor Audit — **Conclusion: MODIFY**

**Is it useful?** Marginally. It's decoration more than utility. It does add a nice "studio" feel and the `data-cursor="view"` label ("View") on cards is a genuinely good affordance.

**Does it work correctly?**
- Desktop: dot snaps, ring eases — good, frame-rate-independent easing is a nice touch.
- Clicking: **BUG** — `.cursor-ring.is-down` in CSS applies `translate3d(var(--rx,0), var(--ry,0), …)`, but the JS never sets `--rx/--ry` (it writes `ring.style.transform` directly). On mousedown the ring **teleports to the top-left corner** and snaps back on release. This is visible and looks broken.
- Text selection / forms / buttons: native cursor is hidden globally (`cursor: none !important` on `body.has-custom-cursor *`), so over inputs you lose the normal I-beam / text caret cursor. Minor but real UX cost — users lose the standard signal that text is selectable.
- Touch/tablet: correctly disabled (`pointer: coarse`, `hover: none`).
- Reduced-motion: correctly disabled.
- Performance: one rAF loop, cheap. Fine.

**Does it confuse what's clickable?** Slightly — a custom cursor that hides the native pointer removes the browser's built-in "this is a link" hand cursor. The `is-hover`/`is-view` states partly compensate.

**Recommendation:**
- **Fix the click-jump bug** (drop the `is-down` transform override, or set `--rx/--ry` from JS).
- **Restore native cursor over text inputs/textareas** so the I-beam shows.
- Keep it otherwise — it's on-brand and already well-gated for touch/accessibility.

---

## 10. Theme Audit — **Conclusion: KEEP (both themes are intentionally designed)**

This is the **strongest part of the build.** Full semantic-token system: light mode isn't an afterthought — it re-tints glows, switches the cursor spotlight from `screen` to `multiply` blend, darkens the accent/gold for contrast, adds a faint grid texture, and re-colours the cursor ring away from `difference` blend. That is real design, not a CSS filter hack.

| Check | Status |
|---|---|
| No-flash on load | ✅ Inline script sets `data-theme` before paint |
| Persistence | ✅ `localStorage('mb.theme')` |
| System preference | ✅ `prefers-color-scheme` fallback |
| Toggle accessibility | ✅ Real `<button>`, `aria-label`, `title`, `:focus-visible` outline |
| Accent contrast (light) | ✅ Deeper violet `#6a4bff`, gold darkened to `#b07d1a` |
| Cursor/spotlight per-theme | ✅ Handled explicitly |
| Image-overlay tags | ✅ Kept dark in both themes (they sit on photos) |

**Items to verify (not confirmed):**
- `--muted` (`#8a8a95` light / `#5f5f77` dark) on `--bg` may fall below WCAG AA 4.5:1 for small text. *Verify with a contrast checker.* This is the one likely contrast risk.
- Confirm form placeholder text contrast in light mode.

**Does the toggle add brand value?** Yes — for a studio selling craft, a well-executed theme system is itself a portfolio piece. Keep it.

---

## 11. SEO Audit

### Technical SEO
| Item | Status | Note |
|---|---|---|
| `<title>` | ✅ | Good, descriptive |
| Meta description | ✅ | Clear |
| Canonical | ✅ | `https://maheshbuilds.com/` |
| Open Graph | ⚠️ | Present but **no `og:image`** |
| Twitter card | ⚠️ | `summary_large_image` declared but **no `twitter:image`** — card will render broken/blank |
| Favicon / apple-touch | ✅ | Present |
| Structured data | ⚠️ | Organization JSON-LD present but thin — no `logo`, `sameAs`, `contactPoint`, `address` |
| robots.txt | ❌ **Missing** | |
| sitemap.xml | ❌ **Missing** | |
| Semantic HTML | ✅ mostly | Good `<section>/<h1>/<h2>` usage |
| Heading hierarchy | ⚠️ | Home `<h1>` is the hero; WorkPage also has `<h1>` — fine per "page", but this is one SPA so verify only one h1 renders per view |
| URL structure | ❌ | **Hash routing** (`#/work`) — hash fragments are not distinct crawlable URLs; all content lives at `/` |
| JS rendering | ⚠️ | Content is client-rendered; Google can render JS but it's slower/riskier than SSR/static |
| HTTPS | ✅ (assumed by canonical) | |

### On-page SEO
- **Only one real URL** to rank. Services, industries and work are sections/hash-routes, not indexable pages — so you cannot rank a page for "institute management system development" or "e-commerce website development Pune" because those pages don't exist as URLs.
- Image `alt` text: present on portfolio/case images (good), but many use the raw project title only.
- Content depth is good on the homepage but concentrated on one document.

**Biggest SEO problem:** *Everything is one hash-routed page.* Even with perfect tags, there's almost nothing for Google to index beyond the homepage. To rank for service/industry/local terms you need **real, static, crawlable pages** (either pre-rendered routes or a static export per service/industry).

### Work / Projects information architecture (new — required)
The new Work ecosystem (specified in full in §18) must be **crawlable**, not hash-only:

```text
/
├── /services
├── /work                         ← real crawlable Work landing
│   ├── Personal Projects          (grouped block)
│   │   ├── /work/tripwise
│   │   ├── /work/paithani-marketplace
│   │   └── /work/milk-management-system
│   ├── Client Projects            (grouped block — empty state for now)
│   │   ├── /work/<future-client-1>
│   │   ├── /work/<future-client-2>
│   │   └── /work/<future-client-3>
│   └── individual project detail pages
├── /contact
└── other existing routes
```

Requirements (implementation should follow the existing app architecture — don't add routes for their own sake):
- `/work` is a real crawlable URL, not dependent only on hash routing.
- Personal Projects and Client Projects are **visually and structurally distinct** blocks (never one undifferentiated grid).
- Substantial projects get their own crawlable, readable, SEO-friendly detail URL (`/work/tripwise`).
- Architecture is **scalable**: adding a client project later = add data + assets + route, not a Work-UI rewrite.

**How to make hash routes crawlable (options, pick per existing stack):** pre-render/SSG the Work + project pages at build (e.g. a small prerender step or `vite-plugin-*` SSG), or migrate to History-API routing served via the existing `_redirects` SPA fallback with pre-rendered HTML snapshots for the project URLs. Either way, each project URL must return meaningful, indexable HTML with its own title/description/canonical/OG (see §20).

### Per-page SEO metadata (Work + project pages)
- **Work page:** unique `<title>`, meta description, canonical (`/work`), OG + Twitter tags, and `CollectionPage`/`ItemList` structured data listing the projects.
- **Each project page:** unique title, unique meta description, canonical, `og:image` (project hero — real screenshot when available, else clearly-contextual supporting image), `CreativeWork`/`SoftwareApplication` structured data where appropriate, crawlable HTML, semantic headings, descriptive alt text, internal link back to `/work`, links to relevant `/services`, and a contact CTA.
- **Do not keyword-stuff or over-optimize** these pages — keep copy natural, human-readable, business-focused and specific to the actual project. Never add fake stats/claims for SEO.

---

## 12. Local SEO Audit

Goal: clients in India (Pune / Maharashtra) — institutes, local businesses.

**Current state:** The only geo signal is the hero eyebrow "India · Available Worldwide." Google has **no** structured location, no city, no service-area, no `LocalBusiness`/`address` schema, no Google Business Profile linkage.

**Recommended (sensible, not spammy) structure:**
- Add `LocalBusiness` (or keep `Organization` + `areaServed`) JSON-LD with `areaServed: "India"`, and if you operate from Pune, `address`/`addressRegion: Maharashtra`.
- Create a small number of **intent pages** (not city-stuffed): e.g. `/website-development`, `/business-software`, `/website-development-for-institutes`. Mention Pune/Maharashtra naturally in body + a footer "Serving businesses across Pune, Maharashtra and India."
- Add a real domain email and, ideally, a Google Business Profile; link it via `sameAs`.

**Do NOT** paste city names across every section — that reads as spam and can hurt you.

---

## 13. Google SERP Audit

**Today the result would render as:**

> **Mahesh Builds — Digital Products, Websites & Business Software**
> maheshbuilds.com
> Mahesh Builds designs and develops websites, web applications, mobile apps and custom business software for growing businesses.

- Trustworthy-looking? Reasonably — title and description are clean.
- Understandable service? Yes.
- Competitive? Only moderately — it's generic and undifferentiated ("for growing businesses"). No location, no proof, no unique hook.
- Social share (OG) would look **broken** — no image.

**Recommended title/description pattern:**
- Home `<title>`: `Mahesh Builds — Website & Software Development Studio in India`
- Description: emphasise *one* differentiator + a location/CTA, e.g. "Websites, web apps, mobile apps and custom business software for Indian businesses and institutes. Built end-to-end. Start a project →"
- Add `og:image` (1200×630) with the wordmark + tagline.

---

## 14. Performance Audit

*Build-measured (real) figures below; runtime metrics Not measured — code-based only.*

| Asset | Size | Gzipped |
|---|---|---|
| `three.js` | 683 KB | **176 KB** |
| `r3f` (fiber+drei) | 281 KB | 91 KB |
| `motion` (Framer) | 90 KB | 33 KB |
| `index` (app) | 130 KB | 41 KB |
| **JS total** | **~1.19 MB** | **~340 KB** |
| CSS | 79 KB | 14 KB |

**Findings:**
- **`three.js`/r3f (267 KB gzipped combined) exists only for a decorative desktop hero background.** This is the single biggest performance liability. Even lazy-loaded, it's a lot of code for atmosphere.
- Unoptimized images shipping in `public/`: `E-commerce.png` **591 KB**, `Img.jpg` **396 KB**, `Teacher.png` 144 KB, several `MajhiPaithani-*.JPG` 60–146 KB. Several of these belong to *hidden* projects/industries and may not even render — dead weight in the deploy. Convert to WebP/AVIF and drop unused ones.
- **New Work imagery must not create a new perf problem.** As the Work ecosystem (§18) adds project cards and galleries: optimize before use, prefer WebP/AVIF, ship responsive sizes, use **thumbnails on cards** and full-res only on detail/gallery views, lazy-load below-the-fold gallery images, cap hero image size, and set width/height (or aspect-ratio) to prevent CLS. Don't solve the "empty portfolio" problem by introducing heavy stock imagery.
- Fonts: 6 Manrope weights + Instrument Serif loaded via Google Fonts — trim to the weights actually used.
- `CaseStudyModal` cover image is missing `loading="lazy"`.

**Core Web Vitals (code-based reasoning only, Not measured):**
- **LCP:** at risk on mobile/slow networks due to JS weight + the preloader gating content behind a ~5s overlay + a 6.5s failsafe. The hero text is the LCP and it's hidden until the intro finishes.
- **CLS:** likely low — reveals use transforms, layout looks stable.
- **INP:** generally fine (light rAF loops), but heavy libs on low-end mobile could hurt.

**Highest-impact perf win:** drop/replace `three.js` for the hero, and shorten/session-gate the preloader so LCP isn't blocked.

---

## 15. Accessibility Audit

**Good:**
- `prefers-reduced-motion` respected across preloader, cursor, hero canvas, and a global reduce block.
- Theme toggle and mobile menu are proper buttons with `aria-label`/`aria-expanded`; `Escape` closes menu and modal.
- Case-study modal uses `role="dialog"` + `aria-modal`.
- Decorative layers marked `aria-hidden`.
- Focus-visible outlines exist on toggle and some interactive nodes.

**Gaps:**
| Issue | Severity |
|---|---|
| Preloader **audio** with no mute/controls, and content hidden behind an overlay for ~5s | High |
| No skip-to-content link | Medium |
| Modal lacks a focus trap and doesn't return focus to the trigger on close | Medium |
| Card "click to open case study" is an `<article>` with `onClick`, not a button/link — not keyboard-focusable/operable | Medium |
| `--muted` text contrast may fail AA (verify) | Medium |
| Native text cursor hidden over inputs (I-beam lost) | Low |

> Full WCAG conformance requires manual testing with a screen reader and keyboard, plus expert review — this is a code-level assessment.

---

## 16. Content / Copywriting Audit

**Strengths:** Copy is clean, concise, benefit-led, and — importantly — **problem-first** ("Need more leads?", "Too much manual work?"). It talks about the client's problems more than the developer's tools. That's the right instinct and better than most competitor sites. Grammar is solid. Few clichés.

**Weaknesses / examples:**
- **Placeholder text is user-visible:** `challenge: "To be documented as part of the full case study."` and `outcome: "Outcome to be documented after launch."` render in the modal. This reads as unfinished. *Fix by hiding placeholder projects or filling them.*
- **"India · Available Worldwide"** is fine but vague for local intent.
- **No founder voice / "why us" as a person.** For a solo/boutique studio, a short honest founder line ("I'm Mahesh, I design and build…") builds more trust than "we."
- The `Technology` list is very long (React, Angular, Java, C++, Flutter, Azure…). For a client this can read as *jack-of-all-trades* rather than focused. Consider trimming to what you actually ship.

**Client-question test:** "Does it talk too much about the developer?" — No, it's well-balanced. The problem isn't tone; it's *missing proof*.

---

## 17. Conversion Audit

| Can the client… | Today |
|---|---|
| Understand the service? | ✅ Yes |
| See previous work? | ❌ No (placeholder only) |
| Understand process? | ✅ Yes (Process section is good) |
| Understand pricing? | ⚠️ Budget ranges in the form only; no pricing/process page |
| Ask for a quote? | ⚠️ Form exists but **doesn't send** |
| Contact directly? | ✅ Email + phone visible |
| Send requirements? | ❌ Form is a dead stub |
| Know what happens after contacting? | ⚠️ "Free initial conversation — no sales pitch" is good; could be clearer on timeline |

**Conversion barriers (ranked):**
1. **Dead form** — highest-impact leak. Every submit is lost.
2. **No proof** — no reason to believe you can deliver.
3. **No WhatsApp** — for Indian SMB clients WhatsApp is often the preferred, lowest-friction channel; it's absent.
4. **Preloader delay/voice** — friction before the value is even seen.

CTAs themselves are well-placed (nav, hero, repeated, footer) — **don't add more**, just make the ones you have *work* and *point to real content*.

---

## 18. Portfolio / Project Audit — Work / Projects Ecosystem (revised direction)

### 18.0 Current state (the gap)
`projects.js` contains six entries, but:
- Only **`maheshbuilds`** is `active: true`, and it's explicitly a **placeholder** (`placeholder: true`, "case study coming soon", empty features/tech, "to be documented" everywhere).
- The remaining entries in the old `projects.js` (a "Majhi Paithani" entry and four "Concept Build" items) are `active: false` and hidden.
- Net effect: the Work section shows a client **zero finished, provable work.** This remains a **Critical** conversion/trust gap.

> **Classification override (authoritative — supersedes older audit data):** The current, confirmed classification is that **Paithani Marketplace is a Personal Project**, not a client project. Do **not** carry forward the older "Majhi Paithani = client project" assumption. Migrate any reusable written detail from the old `majhi-paithani` entry into the **personal** `paithani-marketplace` project (category: `personal`), and do not label it as client work unless Mahesh Builds explicitly provides that later. The three Personal Projects are **TripWise, Paithani Marketplace, Milk Management System** — nothing else, and no supporting imagery may be used to manufacture a client-project card.

### 18.1 New direction — two clearly separated categories
Replace the single undifferentiated portfolio with a **Work ecosystem** split into two visually and structurally distinct blocks:

```text
Work
│
├── Personal Projects        (built independently by Mahesh Builds)
│   ├── TripWise
│   ├── Paithani Marketplace
│   └── Milk Management System
│
└── Client Projects          (real client work — CURRENTLY NONE PUBLIC)
    ├── Future Client Project 1   ← to be provided
    ├── Future Client Project 2   ← to be provided
    └── Future Client Project 3   ← to be provided
```

- **Do not mix** personal and client projects into one grid.
- **Do not invent** any client project, client name, logo, testimonial, review, result, statistic, business outcome, screenshot or case study.
- Client Projects is a **future-ready** section with a professional empty state (see §18.5). Real client data is expected within days and will be added separately.

### 18.2 Personal Projects — verified content (use only what's below)

**These three are real and independently built by Mahesh Builds. Use only the verified facts here; anything not listed is `Content Required` / `To Be Provided`.**

#### A. TripWise
| Field | Value |
|---|---|
| Slug | `tripwise` |
| Type | Mobile Application |
| Category | Personal Project |
| Purpose | Travel planning, budgeting and group expense management app |
| Problem | Trip planning, budgeting, individual + group expenses, bill splitting, settlements and overall trip spend are scattered — TripWise unifies them |
| Target users | Solo travellers, friends travelling together, families, group travellers |
| Main areas | Trip planning · budget management · expense tracking · group expenses · bill splitting · settlement tracking · spending analysis |
| Platform | Mobile Application |
| Frontend | React Native |
| Backend | .NET API |
| Database | MSSQL, Supabase |
| Status | Project / MVP |
| Images now | Supporting travel imagery (travel planning, phone with travel UI, maps, destinations, group travel, passport/map/accessories) — **clearly labelled "Supporting visual", never "TripWise app screenshot"** |
| Images later | Actual TripWise mobile UI screenshots replace/supplement supporting images |

#### B. Paithani Marketplace
| Field | Value |
|---|---|
| Slug | `paithani-marketplace` |
| Type | Website / Web Application |
| Category | Personal Project |
| Purpose | Online Paithani saree marketplace — customers discover/buy sarees; sellers & artisans sell directly online |
| Problem | Creates a direct online connection between customers, sellers and Paithani artisans |
| Main users | Customers, sellers, artisans |
| Concept | Digital marketplace giving Paithani sarees an online selling/purchasing channel |
| Platform | Website / Web Application |
| Frontend / Backend / DB | `To Be Provided` (do not invent a stack) |
| Status | `To Be Provided` |
| Images now | Supporting Paithani/saree/handloom/online-shopping imagery — **never presented as actual project screenshots**; must communicate domain/context only |
| Images later | Actual marketplace screenshots replace supporting images |

#### C. Milk Management System
| Field | Value |
|---|---|
| Slug | `milk-management-system` |
| Type | Website / Web Application / Business Management Software |
| Category | Personal Project |
| Purpose | Manage dairy/milk collection operations; give farmers access to their daily milk records |
| Problem | Farmers need an easy way to view/track daily milk quantity, rate, amount and historical records |
| Farmer features | Daily quantity (litres), daily rate, daily amount, previous records, last 30 days, date-filtered records |
| Date filtering | Records reviewable by date — fields: Date · Milk Quantity (Litres) · Milk Rate · Daily Amount/Price |
| Modules / roles | Farmer · Milk Collector · Dairy Owner |
| Users | Farmers, milk collectors, dairy owners |
| Platform | Web Application |
| Frontend / Backend / DB | `To Be Provided` (do not invent a stack) |
| Status | `To Be Provided` |
| Images now | Supporting dairy/farming imagery (farmers, milk cans, dairy farms, cows, collection ops, rural business) — **contextual only, never "Milk Management System screenshot"** |
| Images later | Actual dashboard/module screenshots become the primary visuals |

### 18.3 Project data architecture (scalable, separated from UI)
Keep project data out of components. Follow the existing `src/data/*` pattern; a per-project structure keeps client additions to *data + assets + route*, not a UI rewrite.

```text
id
slug
name
category           // "personal" | "client"
type               // Mobile App | Website | Web Application | Business Software
shortDescription
overview
problem
solution
targetUsers[]
features[]
modules[]
technologies { frontend[], backend[], database[], apis[], hosting, integrations[] }
platform
status
images[]           // see §18.4 image data model
links { live, app, github, demo, caseStudy }
seo { title, description, ogImage, canonical }
```

### 18.4 Image data model — supporting vs actual (must be explicit)
The model must distinguish externally-sourced **supporting** imagery from real **project assets**, so temporary images can be swapped later without redesign. **UI priority: `screenshot` > `project-asset` > `supporting`.**

```text
images: [
  { type: "hero",    source: "supporting", url: "...", alt: "...", license: "...", attribution: "..." },
  { type: "gallery", source: "screenshot", path: "/assets/...", alt: "..." }
]
```
- `source` values: `screenshot` · `project-asset` · `supporting` · `external`.
- **Supporting image** = external stock/context image communicating the project's *industry/context* (a travel photo for TripWise, a saree photo for Paithani, a dairy-farmer photo for Milk Management). Label it as a *Supporting visual*.
- **Actual project asset** = a real screenshot/UI supplied by Mahesh Builds. Always takes visual priority once available.
- **Never disguise a supporting image as product UI:** no stock photo inside a phone frame captioned as a TripWise screenshot; no external e-commerce screenshot in a browser frame captioned as Paithani Marketplace; no dairy photo in a dashboard frame captioned as the Milk system; no fake UI overlaid on stock photos to imply real product UI. A clearly-labelled conceptual/contextual presentation is fine — misrepresentation is not.

### 18.4a Supporting-image themes per project (until real screenshots exist)
Use contextual imagery that communicates each project's **purpose/domain**. Label every one as a *Supporting visual* (or *Supporting Project Image*) — never as a screenshot. Source and license per §27b; alt text per the examples below.

| Project | Supporting-image themes | Should communicate |
|---|---|---|
| **TripWise** | Travel · trip planning · maps · destinations · group travel · travel budgeting · a phone showing a travel context | The purpose of a travel planning + group-expense app |
| **Paithani Marketplace** | Paithani sarees · Indian/silk sarees · traditional Maharashtrian textiles · handloom · saree artisans · online saree shopping / e-commerce browsing | The connection between customers, sellers and Paithani artisans in an online marketplace |
| **Milk Management System** | Dairy farming · farmers · milk collection · milk cans · dairy farms · cows · milk production · agricultural/rural business operations | The dairy / milk-management domain |

**Alt-text examples (supporting):** `TripWise travel planning supporting image` · `Paithani saree marketplace supporting image` · `Milk collection supporting image`.
**Alt-text examples (only when the image is a real screenshot):** `TripWise mobile dashboard` · `Paithani Marketplace product listing page` · `Milk Management System farmer dashboard`.

> **Supporting imagery is only for the three confirmed Personal Projects.** It must never be used to create a Client Projects card or to imply a client engagement (§18.5, §18.9).

### 18.5 Client Projects — professional empty state (no fake cards)
Because there are **no public client projects yet**, show an intentional empty state — not fake cards, not fictional entries:

```text
Client Projects

Real-world digital products and business solutions built for our clients.

Our client portfolio is growing.

Have a project in mind? Let's build it together.   [Start a Project →]
```
Copy can be refined later. It should read as *intentional*, not *unfinished*.

### 18.6 Future client project — standard structure & reusable template
Every future client project should capture the fields below. **Never fabricate missing fields** — mark them `Content Required` / `To Be Provided`.

Basic: Project Name · Client/Organization · Industry · Project Type · Platform · Status · Duration
Business: Purpose · Business Problem · Problem Solved · Target Users · Requirements
Solution: Overview · Key Features · Modules · User Roles · Key Workflows · Mahesh Builds' Role
Technical: Stack · Frontend · Backend · Database · APIs · Hosting/Deployment · Integrations
Proof: Screenshots · UI Gallery · Live/App/Demo links · Video
Case Study (only if real): Challenge · Approach · Solution · Process · Result/Outcome · Feedback · Testimonial

```text
Client Project

Name:
Client:
Industry:
Project Type:
Website/App:
Project Status:

Purpose:
Problem:
Solution:

Target Users:

Key Features:
-
Modules:
-
Technology:
Frontend:
Backend:
Database:
Other Technologies:

Mahesh Builds Role:
Project Duration:

Live Link:
App Link:
Demo Link:

Screenshots:
Supporting Images:

Challenge:
Approach:
Result:
Client Testimonial:

Client Logo Permission:
Screenshot Permission:

SEO Title:
SEO Description:
OG Image:
```

### 18.7 Client privacy / permission gate
Before publishing any client project, confirm written permission to publish each of: client/company name, logo, screenshots, website link, description, testimonial, results, case-study detail. If permission is missing, support an **anonymized** presentation ("A retail client…") and never expose confidential information.

### 18.8 Links
Per project, allow optional Live Website / Mobile App / GitHub / Demo / Case Study / other. **Never create fake links** — if a link isn't provided, leave it unavailable (hidden), not a dead `#`.

### 18.9 Target Work-page composition (visually complete before client work exists)
The Work page should feel finished even with the Client Projects section empty. Reference layout:

```text
WORK

Personal Projects
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ TripWise     │ │ Paithani     │ │ Milk         │
│ Travel img   │ │ Saree img    │ │ Dairy img    │  ← supporting visuals (labelled),
│ (supporting) │ │ (supporting) │ │ (supporting) │    swapped for real screenshots later
│ Mobile App   │ │ Web App      │ │ Web App      │
└──────────────┘ └──────────────┘ └──────────────┘

Client Projects
No public client projects yet.
Our client portfolio is growing.
[ Start a Project → ]
```

Adding real client projects later must be a data/asset/route addition — **no Work redesign**.

### 18.10 Standing rule — REAL PROOF vs CONTEXTUAL VISUALS
The site must always distinguish **real project proof** (screenshots/assets Mahesh Builds actually produced) from **contextual visuals** (licensed supporting stock that only conveys the domain). **Never** use a contextual image to imply Mahesh Builds created the pictured product, app, website, business or interface. When a real screenshot is provided, it takes priority (`screenshot > project-asset > supporting`) and the supporting image becomes secondary or is removed — no card/detail redesign required.

> **Immediate recommendation:** Retire the hollow `maheshbuilds` placeholder from the active view, stand up the `/work` ecosystem with the three verified personal projects (contextual supporting imagery, clearly labelled), and ship the Client Projects empty state. That alone moves Work from "empty/placeholder" to "authentic and credible" — with a scalable path to drop in real client work the moment it's provided.

---

## 19. Competitor Analysis

*General, well-known patterns of Indian freelance/boutique web studios and global agency sites. No specific competitor data is invented; treat as directional.*

Typical small Indian web-dev studios / freelancers usually show, above the fold or one scroll down: a portfolio grid with **live links**, **client testimonials**, a **WhatsApp button**, and often a **pricing/packages** section. Global boutique studios (Awwwards-style) lean on **case studies with results** and strong motion — which is where Mahesh Builds visually competes well.

| Dimension | Mahesh Builds | Typical competitor | Does the gap matter? |
|---|---|---|---|
| Homepage clarity | **Better** (problem-first) | Often feature-dumped | — (you win) |
| Motion / craft | **Better** | Usually basic | — (you win) |
| Theme system | **Much better** | Rare | Nice-to-have differentiator |
| Portfolio proof | **Worse now, closing** — Work ecosystem (§18) adds 3 real personal projects + future-ready client section | Live links + shots | **Yes — decisive** (personal projects give authentic proof even before client work lands) |
| Testimonials | **Worse** (none) | Common | **Yes** |
| WhatsApp/instant contact | **Worse** (none) | Standard in India | **Yes** |
| Working enquiry form | **Worse** (broken) | Usually works | **Yes — decisive** |
| Pricing/process transparency | Comparable/slightly worse | Mixed | Medium |
| Local SEO | **Worse** | Often city-targeted | **Yes** |
| Performance | **Worse** (heavy JS) | Often lighter | Medium |

**Takeaway:** You *out-design* typical competitors but *under-prove* and *under-convert* versus them. Close the proof/contact gaps and you'd be ahead on nearly every axis.

---

## 20. Real Client Journey Test

**A — "I need a website for my institute."** Sees strong services + an Industries → Education path. Once the Work ecosystem (§18) ships, the Personal Projects — especially the **Milk Management System** (a real role-based business app) and **Paithani Marketplace** — give tangible evidence of "we build real, workflow-driven systems," even before client work is public. Remaining unanswered until client data lands: *have you done this for a paying client, how much, how long?* Improved but not fully closed until Client Projects fill in.

**B — "I need a website for my local business."** Clear services, good problem framing. No local proof, no testimonial, no WhatsApp. Would want to message quickly and can't (no WhatsApp; form dead). **Might leave at contact.**

**C — "I need a custom web app."** Best-served persona — services, process, tech and "business software" framing are all strong. Still blocked by no shipped proof and dead form.

**D — "Found via Google."** Hard today — no sitemap/robots, one indexable URL, generic snippet, no location. Once the crawlable `/work` + per-project pages ship (§11, §18) with proper metadata and a sitemap, there are finally real, rankable URLs (e.g. `/work/milk-management-system`) for someone to discover. **Improves materially with the new architecture.**

For every scenario the exit points are the same today: **no proof** and **broken/limited contact.** The Work ecosystem directly attacks the "no proof" exit; the form fix + WhatsApp attacks the "contact" exit.

---

## 21. Code Quality Audit

**Client-visible problems:** dead form, placeholder project content, cursor click bug, preloader length/voice — all covered above.

**Developer/code-quality observations (mostly good):**
- ✅ Error boundary in `main.jsx` prevents blank-screen crashes.
- ✅ Preloader has multiple failsafes (missing refs, animation build failure, 6.5s hard timeout).
- ✅ Reduced-motion + coarse-pointer gating is consistent and thoughtful.
- ✅ Data separated into `src/data/*` — clean single source of truth.
- ✅ Sensible component/folder structure (layout / sections / animation / pages).
- ⚠️ **Dead/paused code:** `ERPSystems`, `BusinessProblems`, `Trust`, `MobileCapability`, `CaseStudyModal` placeholder path, and hidden projects — intentional but adds maintenance surface. The Work rebuild (§18) is the natural point to clean this up: introduce the new `category: "personal" | "client"` project data model, retire the placeholder, and reuse `CaseStudyModal`/detail patterns for the new project pages.
- ⚠️ 4,005-line single `main.css` — works, but hard to maintain; consider splitting per section.
- ⚠️ Hardcoded contact details repeated in `Contact.jsx` and `Footer.jsx` — centralize in `data`.
- ⚠️ Cards use `onClick` on non-interactive `<article>` (a11y + semantics).
- ⚠️ No test setup (not requested; noted only).

---

## 22. Security / Privacy Audit

**No critical frontend security issues found.**
- ✅ No exposed API keys/secrets in source (form is a stub, so no endpoint/keys yet).
- ✅ No `dangerouslySetInnerHTML` / raw HTML injection patterns seen.
- ✅ No third-party tracking/analytics scripts leaking data.
- ⚠️ Contact details (personal Gmail + personal phone) are in plain source — expected for a contact page, but the Gmail also weakens professionalism (use a domain address).
- ⚠️ When you wire the form to a real endpoint: use HTTPS, validate/sanitize server-side, add spam protection (honeypot/rate-limit), and if using a client SDK (EmailJS/Formspree) treat its public key as public and rate-limit it. External links added later should use `rel="noopener noreferrer"`.

---

## 23. Issue Severity Table (Scorecard)

| Category | Status | Severity | Evidence | Recommendation |
|---|---|---|---|---|
| First Impression | Good with issues | Medium | Strong headline; ~5s voiced preloader | Shorten + session-gate preloader; remove voice |
| Client Trust | Weak | **Critical** | No proof/testimonials; Gmail | Activate real case study; add testimonial; domain email |
| UX | Mixed | **Critical** | Dead form; empty work | Wire form; publish work |
| UI | Strong | Low | Consistent tokens/typography | Preserve |
| Mobile | Structurally OK | High | Overflow lockdown good; JS heavy | Reduce JS weight |
| SEO | Weak | **Critical** | Hash routing; no sitemap/robots/og:image | Real routes/pre-render; add sitemap+robots+og:image |
| Local SEO | Missing | High | Only "India" string | Add areaServed/address + intent pages |
| Performance | Heavy | High | three.js 176 KB gz; 591 KB PNG | Drop/replace three.js; optimize images |
| Accessibility | Partial | High | Preloader audio; no focus trap; onClick article | Fix per §15 |
| Content | Good | Medium | Placeholder text visible | Fill or hide placeholders |
| Conversion | Blocked | **Critical** | Form stub; no WhatsApp | Working form + WhatsApp |
| Portfolio | Empty (plan defined) | **Critical** | 1 placeholder active; no real Work | Build `/work` ecosystem: Personal Projects (TripWise, Paithani Marketplace, Milk Mgmt) + future-ready Client Projects empty state (§18) |
| Animation | Mostly good | Medium | Preloader too long/voiced | Reduce; keep rest |
| Cursor | Buggy | High | is-down jump; hidden I-beam | Fix click bug; restore text cursor |
| Theme | Excellent | Good | Full token system, no-flash | **Do not change** |
| Code Quality | Good | Low | Error boundary, failsafes | Minor cleanup |
| Security | OK | Low | No secrets/injection | Harden form on wiring |

---

## 24. MUST FIX (before showing any client)

1. **Wire the contact form to a real endpoint** (EmailJS/Formspree/serverless). Add a real error state. *Why: every lead is currently lost silently.*
2. **Build the real Work / Projects ecosystem (§18)** — replace the placeholder Work experience with a real, crawlable `/work` route that clearly separates **Personal Projects** (the three verified builds: TripWise, Paithani Marketplace, Milk Management System) from a **future-ready Client Projects** section (professional empty state, no fake content). Stand up the scalable project data + image model (`screenshot > project-asset > supporting`) and individual project detail pages where substantial. *Why: no proof = no sale, and this gives authentic proof without inventing anything.*
3. **Stop the preloader replaying every load + remove the voice.** Re-enable the existing session-once gate; cut duration; drop `speechSynthesis`. *Why: content delay + surprise audio hurts first impression and LCP.*
4. **Fix the cursor click-jump bug** (`.cursor-ring.is-down`). *Why: it looks broken to the exact audience judging your craft.*
5. **Add `og:image` + `twitter:image`** (site-wide, plus per-project OG images for Work pages). *Why: shared/previewed links currently look broken.*
6. **Make Work crawlable, not hash-only** — real `/work` and `/work/<slug>` URLs with per-page title/description/canonical/OG and semantic HTML (pre-render/SSG or History-API + snapshots per existing stack). *Why: hash routes don't rank; the new projects need indexable URLs.*

## 25. SHOULD FIX NEXT

7. Add a **WhatsApp contact** (click-to-chat). *Why: preferred low-friction channel for Indian SMB clients.*
8. Add **`robots.txt` + `sitemap.xml`** (include the new `/work` + project URLs) and a real domain email. *Why: discoverability + professionalism.*
9. **Reduce JS weight** — replace or further defer the `three.js` hero; ship a lighter effect. *Why: mobile LCP/INP + models best practice you're selling.*
10. **Optimize/prune images** (WebP/AVIF; drop unused hidden-project images; `E-commerce.png` 591 KB, `Img.jpg` 396 KB). Add `loading="lazy"` to the modal cover, and apply the Work image performance rules (thumbnails on cards, lazy galleries, width/height to avoid CLS — §14/§18.4).
11. **Accessibility:** add skip-link, modal focus trap + focus return, make project cards real buttons/links, verify `--muted` contrast.
12. Add **1–2 testimonials** (even short, named) — **only real ones, when provided.**
13. Restore the **native text cursor** over inputs/textarea.
14. **Image licensing hygiene:** for any external supporting image, verify commercial-use rights (prefer Unsplash / Pexels / Wikimedia Commons / public domain), record source URL + license + attribution-required flag, and if licensing can't be verified, **don't use it**. Keep a small source record per image (§Image Sourcing). Use descriptive, non-keyword-stuffed filenames + accurate alt text.

## 26. NICE TO HAVE

15. Pre-render/static-export per service & industry for SEO ranking pages.
16. A short **founder line** ("I'm Mahesh…") for boutique trust.
17. Trim the technology list to what you actually ship.
18. A lightweight pricing/process/"how we work" page.
19. Split `main.css` for maintainability; centralize contact details in `data`.

## 26b. FUTURE / CONTENT-DEPENDENT (unblocked only when Mahesh Builds provides real data)

- Add **real client projects** into the Client Projects section (using the §18.6 template).
- Add **real client screenshots**, and **client logos / testimonials / verified outcomes** — only with confirmed permission (§18.7).
- **Replace supporting imagery with actual project screenshots** for TripWise / Paithani Marketplace / Milk Management System as soon as real UI is provided (the `screenshot > project-asset > supporting` priority makes this a data swap, not a redesign).
- Fill any `To Be Provided` fields (stacks, status, durations) with verified information only — **never invent** client names, features, technologies, results, revenue, user counts, ratings or case-study outcomes. Missing info stays `Content Required` / `To Be Provided`.

## 27. DO NOT CHANGE (preserve — it's working)

- The **dark/light theme system** (semantic tokens, no-flash script, per-theme cursor/glow). Best-in-class here.
- **Typography, spacing scale, and section-head consistency.**
- **Problem-first copy** ("Need more leads?" etc.) — genuinely client-centric.
- **Reduced-motion + coarse-pointer gating** across components.
- **Error boundary + preloader failsafes.**
- The custom cursor's **overall concept and touch/a11y gating** (fix the bug, keep the idea).
- Scroll reveals, magnetic buttons, footer wordmark — tasteful and cheap.

**Design guardrails for the Work build (§18):** implement the Work ecosystem **inside the existing visual language** — do not redesign the site to add it. Preserve MB branding, the preloader concept (except the length/voice fixes already listed), typography, spacing, theme system, dark/light mode, animation language, custom-cursor concept, problem-first messaging, reduced-motion support and existing accessibility work. New project cards and detail pages should reuse existing tokens, section-head patterns and card/hover styles. Only touch what's needed for: Work/Projects, existing MUST-FIX items, SEO, performance and accessibility.

---

## 27b. Image Sourcing & Licensing (for supporting imagery)

Supporting images (used only until real screenshots exist — see §18.4) must be **legally reusable**.

**Preferred sources:** Unsplash · Pexels · Wikimedia Commons · public-domain repositories · official/government public-domain sources where licensing permits. **Never** use Google Images grabs, random-website images, copyrighted e-commerce product photos without a permitting licence, competitor screenshots, or another company's UI presented as Mahesh Builds work.

**Before using any external image:** identify the original source → verify commercial website use is permitted → check if attribution is required → record the source URL → add attribution where required → prefer clear reuse permissions. **If licensing can't be verified, don't use it — find another.**

**Per-image source record (keep this):**
```text
Project: TripWise
Image: travel-map-phone.jpg
Source: Pexels
Original URL: <source URL>
License: Verified (commercial use OK)
Attribution Required: No
Usage: Supporting visual
```

**Search starting points (select only appropriately-licensed images, not everything found):**
- TripWise / travel — [Pexels "travel app"](https://www.pexels.com/search/travel%20app/), [Pexels "travel phone"](https://www.pexels.com/search/travel%20phone/), Unsplash travel.
- Paithani / saree — [Unsplash "sari"](https://unsplash.com/s/photos/sari), Unsplash "saree"/"Indian saree", Wikimedia "Paithani", official Indian handloom resources where reuse is permitted.
- Milk Management / dairy — [Unsplash "dairy farmer"](https://unsplash.com/s/photos/dairy-farmer), [Unsplash "dairy farm"](https://unsplash.com/s/photos/dairy-farm), Unsplash "milk production"/"milking", Wikimedia Commons dairy farming.

**Image SEO & performance for every project image:** descriptive (non-stuffed) filename — e.g. `tripwise-dashboard-mobile.png`, `paithani-marketplace-product-saree.jpg` (not `best-website-development-company-india-...jpg`) — accurate alt text, responsive sizes, WebP/AVIF where practical, lazy-load below-the-fold, width/height (or aspect-ratio) to prevent CLS, thumbnails on cards / full-res only on detail-gallery.

*Content licensing note: external image licences must be honoured at implementation time; this document only records the sourcing rules, not the images themselves.*

---

## Change Impact Analysis (per key change)

**1. Contact form**
- **Current:** `setTimeout` stub shows success, sends nothing.
- **Problem:** All enquiries lost.
- **Impact:** Conversion (severe), Trust.
- **Recommended:** Wire to EmailJS/Formspree/serverless; add real error state; spam protection.
- **Risk:** Exposed public key abuse → mitigate with rate-limit/honeypot.
- **Priority:** Critical.

**2. Work / Projects ecosystem (§18)**
- **Current:** One hollow placeholder active; no real, differentiated Work.
- **Problem:** No proof of built work; Personal vs Client not separated; not crawlable.
- **Impact:** Trust, Conversion, SEO.
- **Recommended:** Build `/work` with distinct **Personal Projects** (TripWise, Paithani Marketplace, Milk Management System — verified data only) and a future-ready **Client Projects** empty state; scalable data + `screenshot > project-asset > supporting` image model; crawlable per-project detail pages with metadata; contextual supporting imagery clearly labelled (never faked as UI).
- **Risk:** (a) misrepresenting stock imagery as product screenshots — mitigate via the labelling/image-source rules (§18.4, §27b); (b) inventing missing project facts — mitigate by marking them `To Be Provided`; (c) client confidentiality — gate behind permission (§18.7).
- **Priority:** Critical.

**3. Preloader length + voice**
- **Current:** ~5s cinematic + spoken welcome, replays every load.
- **Problem:** Delays LCP; surprise audio; annoying on repeat.
- **Impact:** Performance, First impression, Accessibility.
- **Recommended:** Re-enable session-once; cut to ≤2s; remove voice (or make opt-in).
- **Risk:** Slightly less "wow" on first load — acceptable trade for conversion.
- **Priority:** High.

**4. Cursor click bug**
- **Current:** `is-down` reads unset `--rx/--ry` → ring jumps to 0,0.
- **Problem:** Looks broken on click.
- **Impact:** UX, Trust (craft perception).
- **Recommended:** Remove the transform override or set `--rx/--ry` from JS; restore I-beam over inputs.
- **Risk:** None material.
- **Priority:** High.

**5. three.js / performance**
- **Current:** 176 KB gz three.js + 91 KB gz r3f for a decorative hero.
- **Problem:** Heavy payload, mobile risk, contradicts the "we build fast sites" pitch.
- **Impact:** Performance, Mobile, SEO.
- **Recommended:** Replace with a CSS/lightweight-canvas effect, or defer far more aggressively.
- **Risk:** Loses a signature visual — mitigate with a lighter equivalent.
- **Priority:** High.

**6. SEO infra (routes/sitemap/robots/og:image)**
- **Current:** Hash SPA, no sitemap/robots, no og:image.
- **Problem:** Barely indexable; broken share previews.
- **Impact:** SEO, Local SEO, sharing.
- **Recommended:** Pre-render/static routes for key pages; add sitemap/robots/og:image; enrich JSON-LD with areaServed/logo/contactPoint.
- **Risk:** Routing refactor effort — do incrementally.
- **Priority:** High (Critical for discoverability).

---

## Final Client Verdict — direct

- **Would I immediately understand what it offers?** Yes.
- **Would I trust it enough to explore?** Partly today — the polish earns a look, but the empty Work section and Gmail address make me cautious. The planned Work ecosystem (three real personal projects) directly fixes the proof problem.
- **Would I understand the quality of the work?** Not yet — I can see you can *style*, not that you can *ship*. Once TripWise / Paithani Marketplace / Milk Management System are live as real project pages, I would.
- **Would I know how to contact them?** Yes (email/phone) — but the form silently fails and there's no WhatsApp.
- **What would make me hesitate?** No proof, no real testimonials, a broken-feeling contact flow.
- **What would make me leave?** Reaching "What we've built" and finding "coming soon", then a form that pretends to work.
- **Single biggest weakness:** The contact form doesn't actually send anything.
- **Biggest missed opportunity:** Three real, buildable personal projects (TripWise, Paithani Marketplace, Milk Management System) that can prove capability *right now* — currently not represented as real Work. (Do not fabricate any client work to fill the gap; the Client Projects empty state is the honest, professional stand-in until real client data arrives.)
- **What's currently unnecessary:** The spoken preloader voice, the full-length replaying intro, and ~267 KB (gz) of three.js for a background.
- **What must NOT change:** The theme system, the typography/spacing, and the problem-first copy — those are genuinely strong.

**Bottom line:** This is a talented build with a broken business core. Fix the form, publish one real case study, tame the intro, and fix the cursor bug — and it goes from "impressive demo" to "credible studio a client will actually contact."

---

## Exact Next-Step Plan (in order)

1. Wire the contact form to a real service + add error handling. *(Critical)*
2. Build the Work ecosystem (§18): scalable project data + image model → real crawlable `/work` with separated **Personal Projects** (TripWise, Paithani Marketplace, Milk Management System, verified data + labelled supporting imagery) and a **Client Projects** empty state → per-project detail pages. Retire the hollow placeholder. *(Critical)*
3. Make Work crawlable (real `/work` + `/work/<slug>` URLs, per-page metadata, semantic HTML) rather than hash-only. *(High)*
4. Re-enable preloader session-gate, shorten it, remove the voice. *(High)*
5. Fix the cursor `is-down` bug and restore the text cursor over inputs. *(High)*
6. Add `og:image` + `twitter:image` (site + per-project); add `robots.txt` + `sitemap.xml` (incl. Work URLs); enrich Organization JSON-LD (logo, areaServed, contactPoint) + add Work/project structured data. *(High)*
7. Add a WhatsApp click-to-chat contact + switch to a domain email. *(High)*
8. Reduce JS weight (replace/defer three.js) and optimize/prune images; apply Work image performance rules. *(High)*
9. Accessibility pass: skip-link, modal focus trap, keyboard-operable cards, verify `--muted` contrast. *(Medium)*
10. Content-dependent (when data provided): add real client projects (§18.6 template, permission-gated), replace supporting imagery with real screenshots, add real testimonials/outcomes. *(Future)*
11. Later: pre-render service/industry pages for real SEO ranking. *(Nice-to-have but high SEO value)*

*Awaiting your approval before implementing any of the above. This revision updated the audit document only — no website code has been changed.*

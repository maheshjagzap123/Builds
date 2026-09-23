# Mahesh Builds — Full Website Audit (Findings & Fixes)

**Date:** 23 September 2026
**Reviewer role:** Prospective client + UX/UI, SEO, performance, accessibility, conversion, and code auditor
**Method:** Full source inspection of the current codebase + a real production build (`npm run build`, exit 0). Rendered behaviour is reasoned from code, CSS, and build output. No physical-device or Lighthouse testing was performed.
**Rule followed:** No Lighthouse/PageSpeed scores are invented. Where a runtime number was not measured it is marked *"Not measured — code-based only."* Bundle sizes below are **real, measured** from the build.
**Status:** Audit only. No application/site code was changed. Implementation should start only after you approve.

> ### ⚠️ Note on the existing `AUDIT_REPORT.md`
> The repo already contains `AUDIT_REPORT.md`. Comparing it against the **current** code, it is **partially stale** — it lists several "Critical" issues that the current code has **already fixed**:
> - Contact form is **no longer** a fake `setTimeout` stub — it does real endpoint/`mailto` submission with honest status states.
> - Routing is **no longer** hash-based — it uses the History API with real crawlable paths + a build-time prerender step.
> - `robots.txt` and `sitemap.xml` now **exist**.
> - `og:image` / `twitter:image` are **present**.
> - The preloader **voice/speech synthesis** is **gone**.
> - The cursor "teleport on click" bug is **fixed**; the case-study modal was replaced by real `/work/:slug` pages.
>
> This document supersedes it and audits **only the current state**. Where something is already good, it is credited and marked **DO NOT CHANGE**.

---

## 1. Executive Summary

Mahesh Builds is a genuinely well-engineered React/Vite single-page site with a distinctive, confident visual identity: a cinematic preloader, a custom cursor, a properly-designed dark/light theme system, smooth scrolling, scroll-reveal animations, and a 3D WebGL hero. The engineering is **defensive and mature** — error boundary, preloader failsafe, consistent `prefers-reduced-motion` handling, touch-device gating, honest empty states, and a strict "no fabricated clients/stats/testimonials" content policy. As a demonstration of front-end craft, it is strong, and much of what a previous audit flagged has already been repaired.

**But as a commercial tool that must convert a real client, three gaps still matter most:**

1. **There is almost no proof of work.** The Work section shows **three personal projects**, and **two of them are essentially empty** (no features listed, no tech, no images, no live/GitHub links, status "To Be Provided"). There are **zero client projects, zero testimonials, zero outcomes, and zero screenshots** anywhere on the live site. A studio whose entire pitch is "we build things" currently shows a visitor very little *finished, verifiable* work. This is the single biggest conversion blocker.
2. **The contact path is fragile and Indian-buyer-unfriendly.** By default (no `VITE_CONTACT_ENDPOINT` set) the enquiry form hands off to the visitor's email client via `mailto:`. On many desktops without a configured mail client this **silently does nothing**, and there is **no WhatsApp option** — the lowest-friction channel for Indian SMB clients. The contact email is a **Gmail address**, not `@maheshbuilds.com`, which quietly lowers trust.
3. **The site is heavy for what it shows.** The production build ships **~1.19 MB of JS (~342 KB gzipped)**, of which **`three.js` + `react-three-fiber` alone are ~267 KB gzipped** — purely for a decorative desktop hero. First-time visitors also wait behind a **~5.5-second preloader** that gates the hero (the LCP element) at `opacity: 0`. A studio selling websites should model best-practice performance; right now it doesn't.

**One-line verdict:** Technically impressive and largely well-built, but **commercially not yet ready to show clients** until (a) the Work section proves real, finished work, (b) the contact path is made reliable and adds WhatsApp + a domain email, and (c) the hero weight and preloader length are cut so the page is fast and findable.

---

## 2. Website Understanding

| Area | Finding |
|---|---|
| Framework | React 18 + Vite 6 (SPA) |
| Routing | **Custom History-API router** (`src/lib/router.js`). Real paths: `/`, `/work`, `/work/:slug`, `/industries/:slug`. On-page links use `#anchor`. Legacy `#/route` hashes are upgraded to real paths. SPA fallback via `public/_redirects` (`/* /index.html 200` — Netlify-style). |
| SEO rendering | Build-time **prerender** (`scripts/prerender.mjs`) writes static HTML snapshots for `/`, `/work`, and each `/work/:slug`, with unique title/description/canonical/OG + crawlable `<h1>/<p>/<a>`. |
| Animation libs | GSAP (+ ScrollTrigger), Framer Motion, Lenis (smooth scroll) |
| 3D | `three` + `@react-three/fiber` + `@react-three/drei` — hero background only, **desktop-only, lazy-loaded** |
| Icons | `lucide-react` |
| Fonts | Manrope (6 weights) + Instrument Serif via Google Fonts (`preconnect` present) |
| Theme | `data-theme` on `<html>`, no-flash inline script in `index.html`, `localStorage('mb.theme')`, full semantic CSS token set for light/dark |
| Cursor | `CustomCursor` (dot + easing ring + hover label) + `CursorSpotlight` glow. Disabled on coarse pointer + reduced-motion. Native caret preserved over inputs. |
| Home sections (order) | Hero → AgencyIntro → WhatWeBuild → WhenYouNeedUs → BuiltForBusinesses → Industries → WorkTeaser → Ecosystem → WhyUs → Maintenance → Process → Technology → FAQ → CTA → Contact |
| Forms | One enquiry form — endpoint POST **or** `mailto:` fallback (honest, never fakes success) |
| Contact channels | Email `maheshjagzap03@gmail.com`, phone `+91 7588174528`. **No WhatsApp, no LinkedIn/Instagram/GitHub.** |
| SEO base | `<title>`, meta description, canonical, OG + Twitter tags, Organization JSON-LD (with `contactPoint`), `robots.txt`, generated `sitemap.xml` |
| CSS | Single `main.css`, ~4,470 lines (86.53 KB built / 15.39 KB gzip) |
| Build | Succeeds in ~16 s, no errors |

**Target audience (inferred from content):** Indian small-to-mid businesses, startups, institutes, and local businesses needing websites, web apps, mobile apps, and custom business software. Positioning is "one digital partner / studio," not "freelancer."

**Business purpose:** Generate qualified project enquiries. Every design decision should serve that goal.

**Dead code worth knowing about:** Four section components exist but are **never rendered** — `BusinessProblems.jsx`, `MobileCapability.jsx`, `Trust.jsx`, and `ERPSystems.jsx` (commented out in `App.jsx`). Notably, **`Trust.jsx` is the only place any stats live** (it computes "3+ live projects, 6 capability areas, 28+ technologies, 10+ industries" from real data) — and it's switched off, so the live site shows **no numbers at all**.

---

## 3. First-5-Seconds Test

- **What does it do?** Clear — "We build digital products that move business forward" plus a concrete sub-line naming websites, web apps, mobile apps, business software. Good.
- **Who is it for?** "Growing businesses" — acceptable but generic; no location/industry hook in the first view.
- **What's offered?** Clear once you scroll (six capability areas).
- **Trustworthy?** *Partially.* Polished and confident, but there is **no proof** — no finished case study, no client logo, no testimonial, no founder identity, and a **Gmail** contact address.
- **Looks like a real business?** Looks like a real *studio/portfolio* site. The empty Work section and Gmail address undercut it.
- **Obvious next step?** Yes — "Start a Project" is in the nav, hero, and repeated throughout.
- **Confusing / flashy?** The **~5.5s preloader** on first visit is the main friction. It's now once-per-session and respects reduced-motion (both good), but it still gates the hero on the first (most important) impression.

**Strict assessment:** Strong visual first impression; weak on proof/trust; slowed on first paint by the intro and JS weight.

---

## 4. Real Client POV

You arrive from Google/referral/Instagram. On first visit the cinematic intro plays for ~5 seconds. You read a confident, benefit-led headline and scroll. The **problem-first framing is genuinely good** ("Your business runs on spreadsheets." → "We turn the workflow into software."). You reach **"What we've built"** expecting proof — and find **three cards, two of which are placeholder tiles with no images, no live links, and "To Be Provided" details**. You click "Start a Project," fill the form, hit submit — and depending on your device either your email app opens pre-filled (fine) or **nothing visibly happens** (if no mail client is configured). There is **no WhatsApp** to fall back to.

The journey breaks at the two moments that decide a sale: **proof** and **frictionless contact**.

---

## 5. Client Trust Audit

| Signal | Present? | Notes |
|---|---|---|
| Clear business identity | Partial | Strong name + tagline; **no founder name/photo/story** on the page |
| Clear services | ✅ Good | `WhatWeBuild` is excellent and specific |
| Portfolio credibility | ❌ **Weak** | 3 personal projects; 2 are near-empty placeholders; 0 client work |
| Project outcomes/results | ❌ Missing | No results by policy — but also no *finished* narrative to point to |
| Testimonials / reviews | ❌ Missing | None anywhere (deliberate no-fabrication policy) |
| Client logos | ❌ Missing | None |
| Contact info | Partial | Email + phone visible, but **Gmail**, not a domain address; no WhatsApp/social |
| Easy enquiry | Partial | Form works, but default `mailto:` fallback can silently fail; no spam protection |
| Professional copy | ✅ Good | Clean, benefit-led, few clichés, grammatically solid |
| Consistent branding | ✅ Good | Strong, coherent system |
| Business legitimacy | Partial | No about/founder/location specifics — fine for a solo studio but adds no trust |

**Highest-value missing trust element — with the required *why*:**

> **Missing:** Real, provable, *finished* built work (project → problem → solution → what it does → live link/screenshot).
> **Why it matters:** A visitor can currently see *that you can style a page*, but cannot see *that you have shipped working products*. For a services buyer, proof of delivered work is the number-one trust driver ([Skydo](https://web.skydo.com/blog/freelance-web-developer-portfolio) and [Fonzi](https://fonzi.ai/blog/web-developer-portfolio) both note 3–6 documented case studies with problem/solution/role/tech/outcome as the minimum bar). *Content was rephrased for compliance with licensing restrictions.*
> **Recommendation:** Finish the three personal projects to a real standard — add real screenshots, a live/GitHub link where one exists, and a short Challenge → Approach → Result (or "what it does / who it's for" where no metric exists). Keep the Client Projects empty state until real, permission-cleared work exists. Never fabricate.

**Second-highest:** add a short **founder line** ("I'm Mahesh — I design and build…") with a photo. For a boutique studio, a real person converts better than an anonymous "we."

---

## 6. UX / UI Audit

| # | Issue | Severity |
|---|---|---|
| 1 | **Work has almost no real content** — 2 of 3 projects are placeholder tiles ("To Be Provided", no image, no link) | **Critical** |
| 2 | **Default contact = `mailto:` hand-off** that can silently fail if no mail client is configured; no WhatsApp alternative | **High** |
| 3 | **~5.5s preloader** gates the hero (LCP) at `opacity:0` on first visit | **High** |
| 4 | **Gmail contact address** (not `@maheshbuilds.com`) shown as the primary email — quiet trust cost | **High** |
| 5 | Four **dead section components** (`Trust`, `BusinessProblems`, `MobileCapability`, `ERPSystems`) ship in the bundle and confuse maintenance | **Medium** |
| 6 | **No skip-to-content link**; keyboard users must tab through the whole nav | **Medium** |
| 7 | **`--muted` text fails WCAG AA** contrast in both themes (see §10 & §15) | **Medium** |
| 8 | Two competing hero CTAs of similar weight; the secondary ("View What We've Built") leads to the weak Work section | **Medium** |
| 9 | **No dedicated pricing/process page** and no pricing on the site (only budget ranges inside the form) | **Medium** |
| 10 | Duplicate headline copy: "What we've built" is both the WorkTeaser `<h2>` and the WorkPage `<h1>` | **Low** |
| 11 | Redundant tech entries ("React" and "React.js" listed separately) | **Low** |

**Genuinely good — do not "fix":** typography scale, spacing tokens, section-head rhythm, problem-first service framing, dark-theme aesthetics, magnetic buttons, honest empty states, the whole-card-as-anchor pattern in `ProjectCard`, responsive grid breakdowns.

---

## 7. Mobile Audit

Assessment is code-based (CSS breakpoints + overflow lockdown). *Not measured on physical devices.*

**Good:**
- Explicit `overflow-x: clip` lockdown on `html, body, #root` — strong defence against horizontal scroll.
- Breakpoints at 1024 / 900 / 768 / 640 / 380 px, including dedicated very-small-phone rules (`≤380px` clamps hero + section headings).
- Custom cursor + spotlight correctly `display: none` on `pointer: coarse` **and** `hover: none` (belt-and-braces), and the native cursor is restored.
- Mobile menu: body scroll lock, `Escape` to close, `aria-expanded`, `tabIndex` gating on hidden links. Solid.
- WebGL hero is **skipped on `≤768px`** and on reduced-motion; Lenis smooth-scroll is **disabled on touch** (native scroll) — both correct calls.
- `viewport-fit=cover` set; landscape-phone hero rule present.

**Concerns:**
- **Performance on mid/low-end Android** (the likely Indian SMB device) is the real mobile risk. Even without WebGL, GSAP + Framer Motion + ScrollTrigger still parse/run, and the ~342 KB gz JS must download. *Not measured — code-based only.*
- **Touch targets:** verify the nav burger, footer links, and FAQ toggles are ≥44×44 px on device.
- **Preloader** still runs on mobile first-load (~5.5s) — heaviest cost on the slowest devices.

**Rule applied:** a desktop-perfect / mobile-heavy site cannot receive a positive overall score. Mobile here is *structurally sound* but *weight-risky*.

---

## 8. Animation Audit

Rule applied — *animation should support the message, not compete with it.*

| Animation | Purpose | Verdict | Reason |
|---|---|---|---|
| Preloader (4-frame cinematic, ~5.5s) | Brand intro | **REDUCE** | Now once-per-session + reduced-motion aware (good), but still gates the hero/LCP on first visit. Cut to ≤2–2.5s. |
| Preloader counter (0→100 over 3.4s) | Pacing | **REDUCE** | Tie to the shorter timeline. |
| Hero headline word reveal | Focus attention | **KEEP** | Short, purposeful, tied to content, reduced-motion aware. |
| Hero WebGL particle field (1,800 pts) | Atmosphere | **MODIFY** | Beautiful but costs ~267 KB gz of `three.js`+`r3f`. Replace with a lighter canvas/CSS/SVG effect, or gate even more aggressively. |
| Scroll reveals (`RevealText`, `FadeUp`) | Pacing | **KEEP** | Tasteful, staggered, `once: true`, reduced-motion aware. |
| Footer wordmark scrub | Polish | **KEEP** | Cheap, subtle. |
| Marquees (`AgencyIntro`, `Technology`) | Texture | **KEEP** | `aria-hidden`; CSS-driven. Verify they pause under reduced-motion via the global rule. |
| Cursor spotlight glow | Decoration | **KEEP (desktop)** | Cheap single rAF; disabled on touch/reduced-motion. |
| Custom cursor ring | Interactivity cue | **KEEP** | Click-jump bug already fixed; well-gated. |
| Magnetic buttons | Delight | **KEEP** | Desktop-only, reduced-motion aware. |
| Lenis smooth scroll | Feel | **KEEP** | Desktop-only; disabled on touch (correct). |

**The only animations competing with the message are the preloader length + the JS weight of the WebGL hero.** Everything else is proportionate.

---

## 9. Cursor Audit — **Conclusion: KEEP (with one small refinement)**

**Is it useful?** Partly. It's more decoration than utility, but the `data-cursor="view"` label ("View") on project cards is a **genuinely good affordance**, and the effect is on-brand for a studio selling craft.

**Does it work correctly?** (verified in `CustomCursor.jsx` + `main.css`)
- **Desktop:** dot snaps to pointer; ring eases with **frame-rate-independent** easing (feels the same at 60/120 Hz). Good.
- **Clicking:** the old "ring teleports to top-left on mousedown" bug is **fixed** — the press scale is composed into the same positioning transform in JS; CSS only scales the label.
- **Text selection / inputs:** the native caret is **preserved** — `body.has-custom-cursor input/textarea/[contenteditable]` is overridden to `cursor: text`. So users keep the I-beam signal. Good.
- **Touch/tablet:** correctly disabled via `pointer: coarse` **and** `hover: none`.
- **Reduced motion:** correctly disabled (JS guard + CSS `display: none`).
- **Performance:** two lightweight rAF loops (ring + spotlight). Fine.

**One real downside:** hiding the native pointer removes the browser's built-in **hand cursor over links/buttons**. The `is-hover`/`is-view` ring states partly compensate, but the standard "this is clickable" hint is weaker than default.

**Recommendation (small):** consider showing a subtle "pointer"-like treatment (e.g. filling the ring or a tiny arrow) on `[data-cursor="hover"]` links, so clickability reads as clearly as the native hand. Otherwise keep it — it's well-engineered and accessible. **This is a MODIFY-optional, not a REMOVE.**

---

## 10. Theme / Dark-Light Audit — **Conclusion: KEEP (both themes are intentionally designed)**

This is one of the **strongest parts of the build.** It's a full semantic-token system, not a filter hack. Light mode is genuinely re-designed: it re-tints the glows, swaps the cursor spotlight from `screen` to `multiply` blend, darkens the accent violet (`#8a7dff` → `#6a4bff`) and gold (`#ffd583` → `#b07d1a`) for contrast, hides the additive WebGL particles (which only read on dark) and leans on a faint grid instead, and drops `difference`/`mix-blend` tricks that would muddy a light nav/cursor.

| Check | Status |
|---|---|
| No-flash on load | ✅ Inline script sets `data-theme` before paint |
| Persistence | ✅ `localStorage('mb.theme')` |
| System preference | ✅ `prefers-color-scheme` fallback |
| Toggle accessibility | ✅ Real `<button>`, `aria-label`, `title`, `:focus-visible` outline |
| Per-theme cursor/spotlight/hero handling | ✅ Explicit |
| Image-overlay tags | ✅ Kept dark in both themes (they sit on photos) |

**Verified contrast problems (computed from tokens):**
- **`--muted` fails WCAG AA for normal text in *both* themes.** Dark `#5f5f77` on `#05060d` ≈ **3.3:1**; light `#8a8a95` on `#f6f6f4` ≈ **3.16:1** (AA needs 4.5:1 for normal text). Anywhere `--muted` is used for small text (meta labels, eyebrow captions, footnotes), it is below standard.
- **Light-mode gold `--accent-2` `#b07d1a` on `#f6f6f4` ≈ 3.35:1** — fine for *large* serif display text (AA large = 3:1) but **not** for small text.
- `--fg`, `--fg-dim`, and `--accent` all pass (`--accent` light ≈ 4.78:1). Good.

**Does the toggle add brand value?** **Yes.** For a studio selling craft, a well-executed theme system is itself a portfolio piece. Keep it — just fix `--muted`.

---

## 11. SEO Audit

### Technical SEO
| Item | Status | Note |
|---|---|---|
| `<title>` | ✅ | Descriptive |
| Meta description | ✅ | Clear |
| Canonical | ✅ | Present + per-route via prerender/`useDocumentMeta` |
| Open Graph | ✅ | Present |
| `og:image` / `twitter:image` | ⚠️ | Present, but points to **`logo.webp`**, not a dedicated **1200×630** share card — social previews will look small/cramped |
| Twitter card | ✅ | `summary_large_image` (needs the proper image above) |
| Favicon / apple-touch | ✅ | Present |
| Structured data | ⚠️ | Organization JSON-LD **with `contactPoint`** — good, but no `sameAs`, `address`, or `LocalBusiness`; no per-page `CreativeWork`/`ItemList`/`FAQPage` |
| robots.txt | ✅ | Allows all + sitemap reference |
| sitemap.xml | ✅ | **Generated** from data (15 URLs) |
| Prerendered HTML | ⚠️ | `/`, `/work`, `/work/:slug` are prerendered with unique meta + crawlable copy. **`/industries/:slug` are in the sitemap but NOT prerendered** — crawlers get the generic SPA shell for 10 advertised URLs |
| Semantic HTML | ✅ | Good `<section>/<h1>/<h2>/<h3>` usage |
| Heading hierarchy | ✅ | Exactly one `<h1>` per view (Hero on home; each route has its own single `<h1>`) |
| URL structure | ✅ | Real crawlable paths (no hash routing) |
| Client hydration | ⚠️ | App uses `createRoot().render()` (not `hydrateRoot`), so prerendered DOM is replaced on load. Fine for crawlers; see §20 |
| HTTPS | ✅ (assumed by canonical) | |

**Biggest SEO gaps now (much narrower than the old audit):**
1. **Industry pages aren't prerendered.** You advertise 10 `/industries/:slug` URLs in the sitemap, but they return the home shell to a non-JS crawl. Add them to `prerender.mjs` (the data + template already exist) so each becomes a real, indexable page — these are your best shot at ranking for "school management system development," "real estate website development," etc.
2. **No dedicated `og:image`.** Ship a 1200×630 share card (wordmark + tagline) so shared links look professional.
3. **Thin structured data.** Add `FAQPage` JSON-LD (you already have 8 real Q&As), `ItemList`/`CreativeWork` on `/work`, and `sameAs` once social profiles exist.

### On-page SEO
- Content depth on the homepage is strong; the new per-route pages (`/work`, `/work/:slug`, `/industries/:slug`) give you real URLs to target service/industry intent.
- Image `alt`: handled correctly in `ProjectCard`/`ProjectDetail` (real `alt` when an image exists; branded `aria-hidden` placeholder otherwise) — but there are currently **no real project images**, so there's no image SEO value yet.
- **Do not keyword-stuff.** Keep the per-page copy natural and specific to the actual project/industry.

---

## 12. Local SEO Audit

Goal: clients in India (Pune / Maharashtra) — institutes and local businesses.

**Current state:** the only geo signal is the hero eyebrow "India · Available Worldwide" and `areaServed: "IN"` in the Organization JSON-LD. There is **no city, no service-area detail, no `LocalBusiness`/`address` schema, no Google Business Profile linkage.**

**Recommended (sensible, not spammy):**
- Extend the JSON-LD with `areaServed: "India"` and, if you operate from Pune, `address`/`addressRegion: "Maharashtra"`. Consider `LocalBusiness` if you want map/local-pack visibility.
- Create a **small number of intent pages** (not city-stuffed): e.g. `/services/website-development`, `/services/business-software`, `/website-development-for-institutes`. Mention Pune/Maharashtra **naturally** in the body and a footer line like "Serving businesses across Pune, Maharashtra and India."
- Add a **domain email** and, ideally, a **Google Business Profile**; link socials via `sameAs`.

**Do NOT** paste city names across every section — that reads as spam and can hurt rankings.

---

## 13. Google SERP Audit

**Home result would render roughly as:**

> **Mahesh Builds — Digital Products, Websites & Business Software**
> maheshbuilds.com
> Mahesh Builds designs and develops websites, web applications, mobile apps and custom business software for growing businesses.

- Trustworthy-looking? Reasonably — clean title + description.
- Understandable service? Yes.
- Competitive? Only moderately — generic ("for growing businesses"), no location, no proof, no unique hook.
- Social share (OG)? Will look **small/weak** because the image is the logo, not a 1200×630 card.

**Recommended patterns:**
- Home `<title>`: `Mahesh Builds — Website & Software Development Studio in India`
- Home description: emphasise one differentiator + a location + CTA, e.g. "Websites, web apps, mobile apps and custom business software for Indian businesses and institutes — designed, built and maintained end-to-end. Start a project →"
- Per-industry `<title>`: `School & Institute Management Software Development | Mahesh Builds` (etc.), once those pages are prerendered.

---

## 14. Performance Audit

**Build-measured (real) figures — from `npm run build`:**

| Asset | Raw | Gzipped |
|---|---|---|
| `three.js` | 683.15 KB | **175.95 KB** |
| `r3f` (fiber + drei) | 280.80 KB | 90.70 KB |
| `motion` (Framer) | 90.40 KB | 33.37 KB |
| `index` (app) | 133.28 KB | 41.94 KB |
| `HeroScene` (chunk) | 1.53 KB | 0.78 KB |
| **JS total** | **~1.19 MB** | **~342 KB** |
| CSS | 86.53 KB | 15.39 KB |

**Findings:**
- **`three.js` + `r3f` = ~964 KB raw / ~267 KB gzipped exist only for a decorative desktop hero.** This is the single biggest performance liability. Even lazy-loaded and desktop-gated, it's a lot of code for atmosphere. **Highest-impact win: replace it with a lighter effect** (2D canvas/CSS/SVG particles or a static gradient+grid) and keep the identical look on light theme, where the particles are already hidden anyway.
- **Framer Motion (33 KB gz)** — confirm it's actually used; most animation here is GSAP. If Framer is only used incidentally, dropping it removes another ~33 KB gz.
- **Fonts:** 6 Manrope weights + Instrument Serif are loaded. Trim to the weights actually rendered (likely 400/500/600/700/800 at most).
- **Unused image assets in `public/assets/img/`** (e.g. `E-commerce.png` ~591 KB, `Img.jpg` ~396 KB, several `MajhiPaithani-*.JPG`) are not referenced by any live component — dead weight in the deploy. Remove or convert to WebP/AVIF before they're ever used.
- **When real project images arrive:** optimise first (WebP/AVIF), ship responsive sizes, use thumbnails on cards + full-res only on detail pages, lazy-load below-the-fold (already done in `ProjectCard`), and set width/height or aspect-ratio to prevent CLS.

**Core Web Vitals (code-based reasoning only — *Not measured*):**
- **LCP:** at risk on mobile/slow networks — the hero text (likely LCP) is hidden behind the preloader (`opacity:0` until "loaded", ~5.5s, 6.5s failsafe) and the app JS is heavy. Shortening the preloader and cutting `three.js` are the two biggest levers.
- **CLS:** likely low — reveals use transforms; layout looks stable.
- **INP:** generally fine (light rAF loops), but heavy libs on low-end Android could hurt.

---

## 15. Accessibility Audit

**Good:**
- `prefers-reduced-motion` respected consistently — preloader, hero, cursor, spotlight, magnetic buttons, and a **global CSS block** (`*{animation-duration:0.01ms!important;…}`).
- Theme toggle and mobile menu are proper `<button>`s with `aria-label`/`aria-expanded`; `Escape` closes the menu; hidden menu links are `tabIndex`-gated.
- Decorative layers (`grain`, hero grid/canvas, marquees, cursor nodes) are `aria-hidden`.
- Project cards are real anchors (keyboard-focusable), not click-only `<div>`s.
- Native text caret preserved over inputs despite the custom cursor.
- Form fields use proper `<label htmlFor>`; status region uses `role="status" aria-live="polite"`.

**Gaps:**
| Issue | Severity |
|---|---|
| **No skip-to-content link** — keyboard users tab through the full nav every time | Medium |
| **Inconsistent focus indicators** — `:focus-visible` styles exist only on `.theme-toggle`, `.pc-card`, `.eco-node`; form inputs use `outline:none` + a subtle border-color change only; nav/footer/FAQ/CTA rely on the browser default outline | Medium |
| **`--muted` text contrast fails AA** in both themes (see §10) | Medium |
| No visible focus ring designed for the main CTAs/nav links (functional but undesigned) | Low |
| Placeholder text uses browser default styling (verify contrast, esp. light theme) | Low |

> Full WCAG conformance requires manual testing with a screen reader + keyboard and expert review. This is a code-level assessment only.

---

## 16. Content / Copywriting Audit

**Strengths:** Copy is clean, concise, benefit-led, and — importantly — **problem-first** ("Your team handles everything manually." → "We automate the repetitive work."). It talks about the client's problems more than the developer's tools, which is the right instinct and better than most competitor sites. Grammar is solid; few clichés.

**Weaknesses / specific examples:**
- **Placeholder-grade project content is user-visible.** Paithani Marketplace and Milk Management System have empty features/tech and "To Be Provided" status. On `/work/:slug` this renders as thin, unfinished pages. *Fix by completing them or trimming to only what's real and framed as "in progress."*
- **No founder voice.** For a solo/boutique studio, a short honest first-person line ("I'm Mahesh — I design and build websites and software end-to-end.") builds more trust than the anonymous "we."
- **Technology list is long and slightly redundant** (React **and** React.js listed separately; Angular, Java, C++, Flutter, Azure all present). For a client this can read as *jack-of-all-trades*. Trim to what you actually ship, and de-dupe.
- **Some conceptual repetition:** Ecosystem (7 steps) and Process (8 steps) tell overlapping "idea → growth" stories; "maintenance/after launch" recurs across five places. Not wrong, but could be tightened.

**Client-question test — "Does it talk too much about the developer?"** No; it's well balanced. The content problem isn't tone — it's **missing proof**, not too many words about tech.

---

## 17. Conversion Audit

| Can the client… | Today |
|---|---|
| Understand the service? | ✅ Yes |
| See previous work? | ⚠️ Barely — 1 real-ish project, 2 placeholders, no images/links |
| Understand the process? | ✅ Yes (Process section is good) |
| Understand pricing? | ⚠️ Only budget ranges *inside* the form; no pricing/process page |
| Ask for a quote? | ✅ Form exists |
| Contact directly? | ⚠️ Email + phone visible, but Gmail; **no WhatsApp** |
| Send requirements? | ⚠️ Works via endpoint if configured; otherwise `mailto:` can silently fail |
| Know what happens after contacting? | ✅ "Free initial conversation — no sales pitch" is good |

**Conversion barriers (ranked):**
1. **Thin proof of work** — the biggest reason a visitor won't believe you can deliver.
2. **Fragile default contact path** — `mailto:` fallback + no backend by default means enquiries can be lost silently; **no WhatsApp** for the audience most likely to use it.
3. **Gmail address** — small but real credibility drag.
4. **Preloader delay** on first visit — friction before value is seen.

CTAs themselves are well-placed (nav, hero, repeated, footer). **Don't add more** — make the existing ones reliable and point them at real content.

---

## 18. Portfolio / Project Audit

**Current state (`src/data/projects.js`):** 3 personal projects, 0 client projects (by explicit, honest policy). The architecture is good — two clearly separated categories (Personal vs Client), a professional empty state for Client Projects, real anchors, lazy images, branded placeholders instead of fake screenshots.

**The problem is content depth, not architecture:**

| Project | State | Gap |
|---|---|---|
| **TripWise** | Reasonably complete (overview, purpose, problem, solution, 7 features, tech, role) | No screenshots, no live/store link, no outcome |
| **Paithani Marketplace** | **Near-empty** — features `[]`, tech empty, status TBD | Needs real content or an honest "in progress" frame |
| **Milk Management System** | Partial — 6 features + modules, but tech empty, status TBD | Needs tech + status + a screenshot |

**What a client should learn from each project (and can't yet):** *what it does, who it's for, what problem it solved, what you personally built, and proof it exists (screenshot/live link).* "Built with React and .NET" tells a client nothing about value — pair every tech line with a plain-language "what this enabled" sentence.

**Recommendation:** Finish all three to a consistent standard (real screenshots + live/GitHub link where available + Challenge → Approach → Result, or "what it does / who it's for" where no metric exists). Prioritise TripWise (closest to done). Keep the Client Projects empty state until real, permission-cleared work exists — **never fabricate**.

---

## 19. Competitor Analysis (factual, gap-focused)

Comparison to typical Indian freelance/small-agency web-dev sites and documented portfolio best practice. Sources: [orangemantra](https://orangemantra.com/blog/guide-on-determining-website-development-cost/), [codezion](https://www.codezion.com/blog/website-cost-in-india-2025/), [Skydo](https://web.skydo.com/blog/freelance-web-developer-portfolio), [Fonzi](https://fonzi.ai/blog/web-developer-portfolio), [Cisin](https://www.cisin.com/coffee-break/how-to-build-a-portfolio-website.html), [Webflow](https://webflow.com/blog/freelance-portfolio). *Content was rephrased for compliance with licensing restrictions.*

| Area | Mahesh Builds | Typical competitor | Does the gap matter? |
|---|---|---|---|
| Homepage clarity | **Stronger** — confident, problem-first | Often generic "we make websites" | Advantage — keep it |
| Branding / craft | **Stronger** — distinctive theme, cursor, motion | Usually templated | Advantage — keep it |
| Services clarity | **Strong** | Usually a plain list | Roughly even |
| Portfolio / case studies | **Weaker** — 2 placeholders, no images/links | 3–6 documented case studies with screenshots + outcomes | **Yes — biggest gap** |
| Testimonials / social proof | **Absent** | Usually 2–5 quotes, sometimes logos | **Yes** — but only add *real* ones |
| Live project links | **Absent** | Common | Yes — add where they exist |
| Pricing / process transparency | **Weaker** — no pricing page | Many publish "starting from" ranges (basic ₹20–60k, business ₹60k–1.5L, e-commerce ₹80k–5L+, custom apps ₹5L+) | Medium — a "how projects work + indicative ranges" page reduces unqualified enquiries |
| Contact flow | **Mixed** — form good, but `mailto:` fallback + no WhatsApp | WhatsApp + form + phone is standard in India | **Yes** — add WhatsApp |
| Domain email | **Weaker** — Gmail | Usually `name@domain` | Yes |
| SEO content depth | **Even/ahead** now (prerendered routes) | Varies | Slight advantage once industries prerender |
| Performance | **Weaker** — ~342 KB gz JS for a decorative hero | Templated sites are often lighter (or heavier + bloated) | Yes — you sell websites, so model speed |
| Mobile UX | **Even** structurally | Varies | Even |

**Net:** Mahesh Builds *out-designs* most competitors but *under-proves* itself. Close the proof, contact, and pricing gaps and it moves clearly ahead of the typical Indian freelance/small-agency site. **Don't copy competitors' clutter** — just fill the specific gaps that cost trust.

---

## 20. Code Quality Audit

**Client-visible vs developer-only issues are separated below.**

**Developer/code-quality (not visible to clients):**
- **Dead code ships:** `Trust.jsx`, `BusinessProblems.jsx`, `MobileCapability.jsx`, `ERPSystems.jsx` (+ `data/erp.js`, and unused `services.js` exports `industries`, `values`, `businessProblems`) are bundled but never rendered. Remove or clearly quarantine; they add maintenance confusion (e.g. two "05 —" eyebrows, two `industries` sources).
- **`createRoot` on prerendered markup:** `main.jsx` uses `ReactDOM.createRoot(...).render(...)` while `prerender.mjs` injects HTML into `#root`. React discards (doesn't hydrate) that markup on load. It's fine for crawlers and the preloader hides any flash, but `hydrateRoot` (or accepting it as non-hydrated) should be a conscious choice, documented.
- **Duplicated data source of truth:** industries exist both as a dead string array in `services.js` and as the live objects in `industries.js`.
- **`prerender.mjs` regex-parses `projects.js`** — works for controlled data but is brittle; a comment already acknowledges this.
- Overall structure is clean: sensible folders (`layout`/`sections`/`animation`/`work`/`three`), reusable animation primitives, a small dependency-free router and meta hook, an `ErrorBoundary`, and consistent reduced-motion/touch guards. **This is above-average code quality for a marketing site.**

**Client-visible (already covered above):** thin Work content, fragile default contact, `--muted` contrast, no skip link.

---

## 21. Security / Privacy Audit

- **No exposed secrets.** The only "sensitive" values are the studio's *own* public contact details (email/phone) — intentional. `VITE_CONTACT_ENDPOINT` is read from env, not hard-coded. Good.
- **No `dangerouslySetInnerHTML`** or obvious injection sinks in the audited components.
- **Form has no spam protection** and, by default, no backend — with a real endpoint configured you'll want a honeypot/rate-limit/captcha, and server-side validation. *(Flag, not a vulnerability.)*
- **`mailto:` exposes the address** to scrapers (harmless but worth knowing).
- **External links:** none audited that open in new tabs; if you add social links with `target="_blank"`, include `rel="noopener noreferrer"`.
- **No third-party trackers/analytics** currently — privacy-clean, but you'll likely want privacy-friendly analytics (e.g. Plausible) to measure the funnel.

No destructive testing was performed.

---

## 22. Issue Severity Table

| Category | Status | Severity | Evidence | Recommendation |
|---|---|---|---|---|
| First Impression | Good visual / weak trust | High | ~5.5s preloader gates hero; no proof in first scroll | Shorten preloader; surface a real project + proof early |
| Client Trust | Needs work | **Critical** | 2/3 projects placeholders; 0 testimonials/logos; Gmail | Finish projects; add founder line; domain email |
| UX | Good with gaps | High | Dead sections, weak Work, no skip link | Fix Work + contact; remove dead code |
| UI | Strong | Low | Consistent tokens, rhythm, components | Keep; fix `--muted` |
| Mobile | Structurally sound, weight-risky | Medium | Good breakpoints + gating; heavy JS | Cut JS; test on low-end Android |
| SEO | Solid, one real gap | Medium | Prerender/robots/sitemap present; industries not prerendered; logo-as-OG | Prerender industries; add 1200×630 OG; add FAQ/ItemList schema |
| Local SEO | Minimal | Medium | Only "India"; no city/LocalBusiness | Add areaServed/address + intent pages (no stuffing) |
| Performance | Heavy for purpose | High | 267 KB gz three+r3f for decorative hero; ~342 KB gz JS total | Replace WebGL hero; trim fonts; drop unused assets |
| Accessibility | Good base, real gaps | Medium | Reduced-motion ✅; no skip link; inconsistent focus; `--muted` fails AA | Add skip link + global `:focus-visible`; fix contrast |
| Content | Strong tone, thin proof | High | Benefit-first ✅; placeholder project copy visible | Finish project copy; add founder voice; trim tech list |
| Conversion | Leaky | **Critical** | `mailto:` can fail silently; no WhatsApp; Gmail | Add real endpoint + WhatsApp + domain email |
| Portfolio | Right shape, thin content | **Critical** | 2 near-empty projects; no images/links | Complete 3 personal projects with proof |
| Animation | Mostly proportionate | Medium | Preloader length + WebGL cost | Reduce preloader; lighten hero |
| Cursor | Well-built | Low / Good | Bugs fixed; gated; caret preserved | Keep; optional clickability cue |
| Theme | Excellent | Low / Good | Full token system, no-flash, per-theme handling | Keep; fix `--muted` only |
| Code Quality | Above average | Medium | Dead components/data; createRoot-on-prerender | Remove dead code; document hydration choice |
| Security | Clean | Low | No secrets/injection; no spam protection by default | Add honeypot/validation when endpoint is live |

---

## 23. Prioritised Action Plan

### 🔴 MUST FIX BEFORE SHOWING CLIENTS
1. **Complete the three personal projects** — real screenshots, live/GitHub link where one exists, and a short "what it does / who it's for / what I built" (+ result only if real). *Why: proof of finished work is the #1 conversion driver.*
2. **Make contact reliable** — configure a real `VITE_CONTACT_ENDPOINT` (Formspree/serverless), keep `mailto:` only as a true fallback, and **add a WhatsApp link** (`https://wa.me/917588174528`). *Why: the default path can silently drop leads; WhatsApp is the audience's preferred channel.*
3. **Switch the primary email to a domain address** (`hello@maheshbuilds.com`) and update JSON-LD + footer + form. *Why: Gmail quietly lowers perceived legitimacy.*

### 🟠 SHOULD FIX NEXT
4. **Cut first-paint weight:** shorten the preloader to ≤2–2.5s and replace the `three.js`/`r3f` WebGL hero with a lighter effect (~267 KB gz saved). *Why: LCP + mobile performance; you sell websites.*
5. **Fix `--muted` contrast** in both themes to ≥4.5:1 for normal text. *Why: WCAG AA + readability.*
6. **Prerender the 10 `/industries/:slug` pages** (already in the sitemap). *Why: unlock real ranking for service/industry intent.*
7. **Add a skip-to-content link + consistent `:focus-visible`** across nav/CTAs/form/FAQ. *Why: keyboard accessibility.*
8. **Add a dedicated 1200×630 `og:image`.** *Why: professional social sharing.*
9. **Add a short founder/about block** (name, photo, one-line story). *Why: boutique-studio trust.*

### 🟢 NICE TO HAVE
10. Remove/quarantine dead components + data; de-dupe the tech list; tighten Ecosystem vs Process overlap.
11. Add a light "how projects work + indicative ranges" page. *Why: fewer unqualified enquiries.*
12. Add `FAQPage` + `ItemList`/`CreativeWork` structured data.
13. Add privacy-friendly analytics to measure the funnel.
14. Optional cursor "clickability" cue on hover links.

### ⚪ DO NOT CHANGE (already working well — preserve)
- The **theme system** (token architecture, no-flash script, per-theme cursor/hero handling) — only fix `--muted`.
- The **custom cursor** engineering (frame-rate-independent easing, caret preservation, touch/reduced-motion gating, fixed click state).
- **Reduced-motion handling** across the app + the global CSS block.
- **Problem-first copywriting** and section framing.
- The **honest content policy** (no fake clients/stats/testimonials) and the **Personal vs Client** portfolio split with its professional empty state.
- The **History-API routing + build-time prerender** approach, `ErrorBoundary`, preloader failsafe, and mobile overflow lockdown.

---

## 24. Change Impact Analysis (per recommendation)

**1. Complete the 3 personal projects**
- *Current:* 2 of 3 are placeholder tiles with "To Be Provided" and no media/links.
- *Problem:* No finished, verifiable proof of work.
- *Impact:* Trust, Conversion, SEO (real images/alt/content).
- *Recommended:* Add screenshots (optimised WebP), live/GitHub links where they exist, and a short structured write-up.
- *Risk:* Low — additive content. Avoid stock images or invented outcomes.
- *Priority:* **Critical.**

**2. Reliable contact + WhatsApp**
- *Current:* `mailto:` fallback by default; no WhatsApp.
- *Problem:* Enquiries can silently fail; missing the preferred Indian channel.
- *Impact:* Conversion.
- *Recommended:* Real endpoint + honeypot; add `wa.me` button in nav/hero/contact/footer.
- *Risk:* Low; test the endpoint end-to-end before launch.
- *Priority:* **Critical.**

**3. Domain email**
- *Current:* `maheshjagzap03@gmail.com`.
- *Problem:* Lowers perceived legitimacy.
- *Impact:* Trust, Conversion.
- *Recommended:* `hello@maheshbuilds.com`; update JSON-LD/footer/form.
- *Risk:* Very low.
- *Priority:* **Critical/High.**

**4. Lighten hero + preloader**
- *Current:* ~267 KB gz three+r3f; ~5.5s intro gating LCP.
- *Problem:* Slow first paint, especially mobile.
- *Impact:* Performance, Mobile, SEO, First impression.
- *Recommended:* Lighter canvas/CSS/SVG hero; preloader ≤2–2.5s.
- *Risk:* Medium — preserve the visual identity; keep the light-theme look (particles already hidden there).
- *Priority:* **High.**

**5. Fix `--muted` contrast**
- *Current:* ~3.2–3.3:1 (both themes).
- *Problem:* Fails WCAG AA for normal text.
- *Impact:* Accessibility, readability.
- *Recommended:* Darken/lighten `--muted` to ≥4.5:1 (e.g. dark ~`#8f8fa6`, light ~`#6b6b78` — verify with a checker).
- *Risk:* Low; re-check the design rhythm after.
- *Priority:* **High/Medium.**

**6. Prerender industry pages**
- *Current:* In sitemap, not prerendered.
- *Problem:* 10 advertised URLs return the generic shell to crawlers.
- *Impact:* SEO.
- *Recommended:* Add industry routes to `prerender.mjs` (data + template exist).
- *Risk:* Low.
- *Priority:* **Medium/High.**

**7. Skip link + focus-visible**
- *Current:* No skip link; focus styles on 3 elements only.
- *Problem:* Keyboard nav is tedious and inconsistently visible.
- *Impact:* Accessibility.
- *Recommended:* Add skip link; add a global `:focus-visible` outline token.
- *Risk:* Very low.
- *Priority:* **Medium.**

**8. Dedicated OG image**
- *Current:* `logo.webp`.
- *Problem:* Weak social previews.
- *Impact:* SEO/sharing.
- *Recommended:* 1200×630 card.
- *Risk:* Very low.
- *Priority:* **Medium.**

**9. Founder/about block**
- *Current:* Anonymous "we."
- *Problem:* Less trust for a boutique studio.
- *Impact:* Trust, Conversion.
- *Recommended:* Short first-person intro + photo.
- *Risk:* Low.
- *Priority:* **Medium.**

**10. Remove dead code / de-dupe tech / tighten overlap**
- *Current:* 4 unused components + unused data; "React"+"React.js"; Ecosystem≈Process.
- *Problem:* Maintenance confusion; slight bundle waste; minor repetition.
- *Impact:* Code quality, clarity.
- *Recommended:* Delete/quarantine; de-dupe; tighten.
- *Risk:* Low — confirm nothing imports them (already verified unused).
- *Priority:* **Low/Nice-to-have.**

---

## 25. Final Client Verdict (direct, not polite)

**If I discovered Mahesh Builds today:**
- **Would I immediately understand what it offers?** Yes — the headline and services are clear.
- **Would I trust the brand enough to explore further?** Partly. It *looks* like a capable studio, but the empty Work section and Gmail address make me hesitate.
- **Would I understand the quality of the work?** Only from the site's *own* design — not from any shown project, because there are almost no finished ones.
- **Would I know how to contact them?** Yes (form/email/phone), but I'd want WhatsApp, and the `mailto:` fallback might fail me silently.
- **What would make me hesitate?** No proof of delivered work; no testimonials; Gmail; a slow first load.
- **What would make me leave?** Reaching "What we've built" and finding placeholder cards with no images or links.
- **What would make me contact them?** One or two genuinely finished, screenshot-backed projects with a live link, plus a WhatsApp button.

**Single biggest weakness:** *Thin, unfinished proof of work.* The site sells "we build things" but shows very little built.
**Biggest missed opportunity:** *The three real personal projects are under-told.* Fully documented (screenshots + links + short story), they'd carry the whole site.
**Currently unnecessary:** the `three.js` WebGL hero (~267 KB gz for decoration) and the full ~5.5s preloader — both cost speed for little commercial gain.
**Must NOT be changed:** the theme system, the (now-fixed, well-gated) custom cursor, reduced-motion handling, the honest no-fabrication content policy, the problem-first copy, and the routing/prerender architecture.

**Bottom line:** This is a technically impressive site that a developer would admire, but a normal client would leave at the Work section. It is close — the fixes are mostly *content and reliability*, not a redesign. **Do not rebuild it. Finish it.**

---

## 26. Exact Next-Step Plan (suggested order)

1. **Content sprint (you):** gather TripWise / Paithani / Milk Management screenshots, live/GitHub links, and a 4-line write-up each (what it does, who it's for, what you built, result-if-real).
2. **Contact reliability (code):** wire a real endpoint + honeypot; add WhatsApp button; swap to domain email everywhere.
3. **Performance (code):** shorten preloader; replace WebGL hero with a lighter effect; trim font weights; delete unused image assets.
4. **Accessibility (code):** fix `--muted`; add skip link + global `:focus-visible`.
5. **SEO (code):** prerender industry pages; add 1200×630 `og:image`; add `FAQPage`/`ItemList` schema; add `LocalBusiness`/address if applicable.
6. **Polish (code):** remove dead components/data; de-dupe tech list; add founder block; optional pricing/process page.

> Tell me which section to start on and I'll implement it. My recommendation: **#1 + #2 first** (proof + reliable contact) — they unblock actually showing the site to clients. I have not changed any code yet.

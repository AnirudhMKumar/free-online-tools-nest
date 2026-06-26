# Free Online Tools Nest — Project Knowledge Base

> This file is a comprehensive knowledge base designed to give any AI model full context about this project without needing to explore the codebase. It saves tokens by consolidating architecture, data models, patterns, completed work, and known issues in one place.
> **Last audited**: 2026-06-24

---

## 1. Project Overview

**What it is**: A collection of 77 free, browser-based utility tools (text, code, math, SEO, PDF, design, converters, calculators). All processing happens client-side — no server uploads, no signups, no ads. Includes a companion Chrome extension for quick tool access.

**Domain**: `https://freeonlinetoolsnest.com`  
**Deployed on**: Cloudflare Pages (via `wrangler pages deploy`)  
**Build**: 99 static pages, ~9s build time, 0 errors  
**GitHub**: (not public yet — codebase local only)

---

## 2. Tech Stack

| Layer | Technology | Version / Notes |
|-------|-----------|----------------|
| **Framework** | Astro | v6.4.6, static output |
| **UI Framework** | React 19 | v19.2.7, `client:load` for interactive tools |
| **CSS** | Tailwind CSS v4 | via `@tailwindcss/vite`, custom design tokens |
| **Build** | Vite (Astro built-in) | esbuild for JSX |
| **Sitemap** | `@astrojs/sitemap` | Auto-generated, lastmod enabled |
| **i18n** | Custom (no library) | English-only (was 8 locales, removed in Phase 9) |
| **PDF** | `pdf-lib` + `pdfjs-dist` | Client-side PDF processing |
| **QR** | `qrcode` | Client-side QR generation |
| **Markdown** | `marked` | Client-side MD→HTML rendering |
| **Hosting** | Cloudflare Pages | Custom domain + security headers |
| **Linting** | ESLint (`eslint-plugin-astro`) | Astro files only (partial coverage) |
| **Testing** | Vitest | v4.1.9, node environment, 7 unit tests |
| **Type Checking** | `astro check` (TypeScript strict) | 37 pre-existing errors (all in tool components) |
| **Node** | >=22.12.0 | Engine requirement |

### Why Astro + React?

- Astro generates fully static HTML (no server runtime needed)
- React `client:load` islands provide interactivity for tool UIs
- Zero JavaScript on pages that don't need it (SEO pages, category pages, blog)

---

## 3. Project Structure

```
freeonlinetoolsnest.com/
├── public/                       # Static assets (served as-is)
│   ├── _headers                  # Cloudflare Pages security headers
│   ├── robots.txt                # Search engine crawl rules
│   ├── favicon.svg / .ico        # Favicons
│   ├── og-default.png            # Default OG image
│   ├── og/                       # Per-category OG images
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   └── web-app-manifest-*.png
├── extension/                    # Chrome extension (Manifest v3)
│   ├── manifest.json
│   ├── popup.html                # Popup with search + category filter
│   ├── popup.js                  # 38 tools listed, category filtering
│   └── icons/
│       └── icon.svg
├── src/
│   ├── assets/                   # Static images used in components
│   ├── components/               # Shared UI components
│   │   ├── tools/                # 77 React tool components (one per tool)
│   │   ├── FAQSection.astro      # Accordion FAQ + JSON-LD
│   │   ├── SEOHead.astro         # Meta/OG/hreflang/JSON-LD head component
│   │   ├── Nav.astro             # Sticky nav + mobile hamburger
│   │   ├── Footer.astro          # 4-column footer + newsletter signup
│   │   ├── Hero.astro            # Homepage hero
│   │   ├── ToolCard.astro        # Tool card component
│   │   ├── CategoryCard.astro    # Category card component
│   │   ├── Breadcrumbs.astro     # Breadcrumb nav
│   │   ├── ShareBar.astro        # Share buttons
│   │   ├── FavoriteButton.tsx    # Client-side favorites (localStorage)
│   │   ├── FavoritesPage.tsx     # Favorites listing page
│   │   ├── CmdKSearch.tsx        # Command-K search modal
│   │   └── ErrorBanner.tsx       # Error display component
│   ├── content/                  # Astro content collections
│   │   └── blog/                 # Blog posts (.md files, 3 total)
│   ├── content.config.ts         # Content collection schema
│   ├── data/
│       │   └── tools.ts              # THE central file: categories + 77 tools + helpers
│   ├── helpers/
│   │   ├── utils.ts              # formatBytes(), escapeHtml()
│   │   └── utils.test.ts         # 7 unit tests (Vitest)
│   ├── hooks/
│   │   └── useCopyToClipboard.ts # Shared clipboard copy hook with feedback state
│   ├── i18n/
│   │   ├── ui.ts                 # English-only translation dictionary (~255 lines, was 1717)
│   │   └── utils.ts              # getLangFromUrl(), useTranslations()
│   ├── layouts/
│   │   ├── Layout.astro          # Base layout (HTML shell, SEOHead, Nav, Footer, favicon links, PWA manifest, dark mode flash prevention)
│   │   ├── ToolLayout.astro      # Tool page layout (breadcrumbs, sidebar, FAQ, JSON-LD)
│   │   └── BlogLayout.astro      # Blog post layout
│   ├── pages/
│   │   ├── blog/                 # Blog index + [slug] dynamic route (3 posts)
│   │   ├── categories/           # 7 category listing pages
│   │   ├── tools/                # 77 tool pages + index
│   │   ├── 404.astro             # Custom 404 (English hardcoded)
│   │   ├── 500.astro             # Custom 500 (English hardcoded)
│   │   ├── about.astro           # English about page (was redirect stub → real content)
│   │   ├── contact.astro         # English contact page (was redirect stub → real content)
│   │   ├── faq.astro             # English FAQ page (was redirect stub → real content)
│   │   ├── privacy-policy.astro  # English privacy policy (was redirect stub → real content)
│   │   ├── terms-and-conditions.astro # English terms (was redirect stub → real content)
│   │   ├── favorites/            # Favorites page
│   │   └── index.astro           # Real English homepage (was redirect to /en/)
│   ├── styles.css                # Tailwind v4 config + custom CSS
│   └── types/
│       └── index.ts              # TypeScript interfaces (Tool, Category, etc.)
├── astro.config.mjs              # Astro config (sitemap, tailwind — i18n config removed in Phase 9)
├── DESIGN.md                     # Vercel-inspired design system reference (736 lines)
├── eslint.config.js              # ESLint flat config (Astro only, partial coverage)
├── vitest.config.ts              # Vitest configuration (node env, globals)
├── tsconfig.json                 # extends astro/tsconfigs/strict
├── package.json
├── AGENTS.md                     # ← This file
├── .gitignore                    # dist/, .astro/, node_modules/, .playwright-mcp/, .omo/
└── .omo/                         # OpenCode session state (gitignored)
    └── plans/
        ├── backlink-directory-submissions.md   # Directory submission strategy (31 directories)
        └── show-hn-launch-draft.md             # Hacker News launch draft
```

---

## 4. Data Model (Central File: `src/data/tools.ts`)

### Tool Interface

```typescript
interface Tool {
  slug: string;           // URL slug (e.g., "image-compressor")
  name: string;           // Display name
  description: string;    // Short description (meta + card)
  longDescription: string; // Full description on tool page
  categorySlug: string;   // References Category.slug
  icon: string;           // Emoji icon
  featured: boolean;      // Show on homepage?
  keywords: string[];     // SEO keywords (rendered as tags + implicit ranking)
  metaTitle?: string;     // Custom <title> (falls back to auto-generated)
  metaDescription?: string; // Custom <description> (falls back to description)
  usageSteps?: UsageStep[]; // 3-step "How to use" guide
  faq?: FAQPair[];        // 2 FAQ items per tool
}

interface UsageStep {
  title: string;
  content: string;        // 2-3 sentences, includes long-tail keyword naturally
}

interface FAQPair {
  question: string;
  answer: string;         // 2-3 sentences
}
```

### Category Interface

```typescript
interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;           // Emoji
  color: string;          // Gradient hex color
  metaTitle?: string;
  metaDescription?: string;
  seoContent?: string;    // Paragraph for category pages
}
```

### SITE Constant (at bottom of tools.ts)

```typescript
export const SITE = {
  name: "Free Online Tools Nest",
  domain: "freeonlinetoolsnest.com",
  url: "https://freeonlinetoolsnest.com",
  description: "77 free online tools for text, code, math, and more. No uploads, no signups — everything runs in your browser, 100% private.",
  tagline: "Free tools for text, code, and math.",
};
```

### Categories (7)

| Slug | Name | Icon | # Tools |
|------|------|------|---------|
| `text-tools` | Text Tools | ✏️ | 15 |
| `developer-tools` | Developer Tools | ⚡ | 16 |
| `calculators` | Calculators | 🔢 | 10 |
| `converters` | Converters | 🔄 | 16 |
| `pdf-tools` | PDF Tools | 📄 | 5 |
| `seo-tools` | SEO Tools | 🔍 | 11 |
| `design-tools` | Design Tools | 🎨 | 4 |

### Helper Functions (all in tools.ts)

- `getToolsByCategory(categorySlug)` → Tool[]
- `getFeaturedTools()` → Tool[]
- `getToolBySlug(slug)` → Tool | undefined
- `getCategoryBySlug(slug)` → Category | undefined
- `getRelatedTools(currentSlug, limit=4)` → Tool[]
- `getAllToolSlugs()` → string[]

---

## 5. Complete Tool Inventory (77 Tools)

### Text Tools (15)
character-counter, word-counter, case-converter, text-analyzer, text-diff, text-summarizer, text-humanizer, grammar-checker, palindrome-checker, reverse-text, lorem-ipsum-generator, slug-generator, plagiarism-checker, readability-score, word-cloud-generator

### Developer Tools (16)
json-formatter, url-encoder-decoder, base64-encoder-decoder, html-formatter, regex-tester, password-generator, hash-generator, uuid-generator, password-strength-checker, css-minifier, html-entity-converter, binary-converter, jwt-decoder, sql-formatter, html-to-markdown, json-to-xml

### Calculators (10)
percentage-calculator, age-calculator, bmi-calculator, tip-calculator, date-difference-calculator, number-to-words, loan-calculator, discount-calculator, mortgage-calculator, random-number-generator

### Converters (16)
qr-code-generator, color-converter, markdown-to-html, csv-to-json, image-compressor, image-cropper, image-resizer, image-format-converter, image-filter, image-to-base64, unit-converter, json-to-csv, yaml-to-json, temperature-converter, lbs-to-kg-converter, epoch-converter

### PDF Tools (5)
pdf-merger, pdf-splitter, pdf-compressor, pdf-to-text, pdf-to-images

### SEO Tools (11)
meta-tag-generator, sitemap-generator, robots-txt-generator, keyword-density-checker, canonical-tag-generator, seo-length-checker, open-graph-preview-generator, alt-text-checker, serp-preview-generator, heading-structure-checker, schema-markup-generator

### Design Tools (4)
color-contrast-checker, color-palette-generator, gradient-generator, css-border-radius-generator

---

## 6. Page Architecture

### Tool Page Pattern

Every tool page follows this exact pattern (`src/pages/tools/[slug].astro`):

```astro
---
import ToolLayout from "../../layouts/ToolLayout.astro";
import ToolComponent from "../../components/tools/ToolComponent";
import { getToolBySlug, getCategoryBySlug } from "../../data/tools";

const tool = getToolBySlug("slug")!;
const category = getCategoryBySlug(tool.categorySlug)!;
---

<ToolLayout
  title={tool.name}
  description={tool.description}
  toolSlug={tool.slug}
  categorySlug={tool.categorySlug}
  categoryName={category.name}
  longDescription={tool.longDescription}
  keywords={tool.keywords}
>
  <ToolComponent client:load />
</ToolLayout>
```

### ToolLayout Renders (in order)

1. **Breadcrumbs**: Tools > Category > Tool Name
2. **JSON-LD**: WebApplication + BreadcrumbList structured data
3. **OG Image**: `/og/{categorySlug}.png` (per-category)
4. **H1 + longDescription**: Page header
5. **Tool component** (slot): The interactive React tool
6. **FavoriteButton** + **ShareBar**: Engagement widgets
7. **Keyword tags**: Displayed as styled pills
8. **How to Use section**: 3 numbered steps (from `tool.usageSteps`)
9. **Related tools sidebar**: 4 tools from same category
10. **FAQSection**: Accordion FAQ with FAQPage JSON-LD

### Homepage

- `/` → Real English homepage with Hero, Featured Tools grid, Category cards, Blog list, FAQ, JSON-LD
- No locale-prefixed homepages (`/en/`, `/es/`, etc. — all removed)

---

## 7. SEO Infrastructure (Already Implemented)

### Per-Page SEO
- **Custom metaTitle/metaDescription** on every tool (overrides auto-generated defaults)
- **Canonical URLs** on every page
- **OG tags** (title, description, image, type, locale, site_name) — `og:locale` hardcoded to `en_US`
- **Twitter Card** (summary_large_image)
- **Hreflang tags** removed (Phase 9 — English-only, no alternate locales)

### Structured Data (JSON-LD)
- **WebApplication** on every tool page
- **BreadcrumbList** on every tool page
- **FAQPage** on every tool page (auto-generated from FAQ data)
- **SiteNavigationElement** on homepage
- **Organization** on homepage
- **WebSite** + **SearchAction** on homepage (site search)

### Technical SEO
- **Sitemap**: Auto-generated by `@astrojs/sitemap`, includes all 99 pages
- **robots.txt**: Proper crawl directives
- **_headers**: Security headers + noindex for preview domains
- **OG images**: Per-category OG images in `public/og/`
- **Favicon**: Multi-format setup in `<head>` (`favicon-96x96.png` with `sizes="48x48 96x96"`, `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest` with PWA icons). PNG link includes explicit 48×48 size declaration for Google Search result favicon support.
- **Trailing slashes**: Enabled (`trailingSlash: "always"`)
- **Directory format**: `build.format: "directory"` (clean URLs)

### Content SEO
- Every tool has: description, longDescription, 5 keywords, metaTitle, metaDescription
- Every tool has: 3 usage steps + 2 FAQ items with long-tail keyword phrases
- 3 blog posts live (1 existing + 2 new)
- Category pages have seoContent paragraphs

---

## 8. i18n System

### Languages
English (default), Spanish, Portuguese, French, German, Hindi, Japanese, Arabic

### How It Works
- Routes prefixed with locale: `/en/tools/`, `/es/tools/`, etc.
- English is default: `/about/` = English, `/es/about/` = Spanish
- Translation dictionary in `src/i18n/ui.ts` — flat key-value pairs per locale
- `useTranslations(lang)` returns a `t(key)` function that looks up keys
- Falls back to the key name if missing (safe to add translations gradually)

### What's Translated
- Navigation, footer, hero, breadcrumbs, category names, about page content
- Contact page content, FAQ page content, privacy/terms pages
- 404/500 error pages (always English via `useTranslations("en")`)
- Newsletter subscription section
- **Tool content is NOT translated** — tools, usage steps, FAQ, meta are English only

### i18n URL Pattern
- `/en/about/` → English about page
- `/es/about/` → Spanish about page
- `/about/` → also English (default locale, redirects to `/en/about/`)
- Tool pages are single-locale: `/tools/image-compressor/` (always English)

> **Phase 9 update**: All non-English locales removed. The site is now English-only. `src/pages/[locale]/` deleted (6 files). `src/i18n/ui.ts` stripped to English (~255 lines). Root pages (index, about, contact, faq, privacy-policy, terms-and-conditions) converted from redirect stubs to real content. hreflang tags removed. Language switcher removed from footer. `og:locale` hardcoded to `en_US`. The i18n system still exists (`useTranslations` with `getLangFromUrl`) but always resolves to `"en"`.

---

## 9. Component Details

### Key Components

| Component | Type | Purpose |
|-----------|------|---------|
| **SEOHead.astro** | Astro | Injects `<title>`, meta, OG, Twitter, canonical, JSON-LD (hreflang removed in Phase 9) |
| **Nav.astro** | Astro | Sticky header with logo, category links, dark mode toggle, CmdK search trigger, hamburger on mobile |
| **Footer.astro** | Astro | 4-column: Tools (first 6), Categories (all 7), Company (About/Blog/Contact/Faq), Legal (Privacy/Terms) + newsletter signup section |
| **FAQSection.astro** | Astro | Accordion FAQ + auto-generates FAQPage JSON-LD |
| **ToolLayout.astro** | Astro | Wraps every tool page with all SEO, breadcrumbs, sidebar, FAQ |
| **ToolCard.astro** | Astro | Card for tool listings (icon, name, description, category badge) |
| **CategoryCard.astro** | Astro | Card for category listings (icon, name, description, tool count) |
| **FavoriteButton.tsx** | React | Toggle favorite, stored in localStorage, works offline |
| **FavoritesPage.tsx** | React | Lists favorited tools from localStorage |
| **CmdKSearch.tsx** | React | ⌘K search modal — fuzzy-search across all 77 tools |
| **ShareBar.astro** | Astro | Share buttons (copy link, social) |
| **Breadcrumbs.astro** | Astro | Breadcrumb navigation with JSON-LD |
| **Hero.astro** | Astro | Homepage hero with tagline and search |
| **ErrorBanner.tsx** | React | Error display component for tool UIs |

### Helper Hook

| File | Type | Purpose |
|------|------|---------|
| **useCopyToClipboard.ts** | React Hook | `useCopyToClipboard()` → `[copied, handleCopy]` — copies text to clipboard, `copied` resets after 2s |

### 77 React Tool Components (in `src/components/tools/`)

Each is a self-contained React client component with its own state and logic. They use:
- Browser APIs (Canvas, FileReader, URL, etc.)
- Client-side libraries (pdf-lib, pdfjs-dist, qrcode, marked)
- No server communication — all data stays in the browser

---

## 10. Design System

### CSS Framework
- Tailwind CSS v4 with `@theme` custom design tokens
- Custom color system: ink (text), body (secondary), mute (tertiary), canvas (background), hairline (borders)
- Dark mode via CSS custom properties (`.dark` class toggled on `<html>`)
- Fonts: Inter (sans-serif), JetBrains Mono (monospace)
- Stacked box-shadows for depth (card, card-hover, elevated, modal)

### Design Reference Document
- `DESIGN.md` at project root — Vercel-inspired design system specification
- 736 lines covering: colors (brand, surface, text, semantic, gradient), typography (display/body/caption families, size/weight/letter-spacing specs), spacing system (4px base), elevation (5 levels of stacked shadows), component specs (buttons, cards, inputs, nav), responsive breakpoints, and do's/don'ts

### Dark Mode
- Toggle in nav bar
- Persisted in localStorage
- Implemented via CSS custom properties (no Tailwind `dark:` variants needed)

---

## 11. Deployment & QA

### Cloudflare Pages
- **Project**: `freeonlinetoolsnest`
- **Branch**: `main`
- **Command**: `npm run deploy` (builds + deploys)
- **Custom domain**: `freeonlinetoolsnest.com`
- **Preview domain**: `*.freeonlinetoolsnest.pages.dev` (blocked from indexing via `_headers`)

### Build Stats
- **99 pages** generated (77 tools + 1 categories index + 7 categories + 4 blog + 404 + 500 + tools index + favorites + about + contact + faq + privacy-policy + terms-and-conditions + homepage)
- **~9s build time**
- **0 build errors**

### Testing
- **Vitest** (v4.1.9) — 7 unit tests for `formatBytes()` and `escapeHtml()` in `src/helpers/utils.test.ts`
- Run via `npm run test` (alias: `vitest run`)
- All tests pass in ~369ms

### Linting
- **ESLint** (v10.5.0) with `eslint-plugin-astro` — flat config covering `dist/**`, `.astro/**`, `node_modules/**`
- Run via `npm run lint` (alias: `eslint .`)
- **Partial coverage**: formats Astro files correctly, but lacks TypeScript/JSX parsers (`@typescript-eslint/parser` + `eslint-plugin-react` not configured) — 161 parsing errors on `.ts`/`.tsx` files
- `prettier` (v3.2.5) used for code formatting

### Type Checking
- Run via `npm run check` (alias: `astro check`)
- `tsconfig.json` extends `astro/tsconfigs/strict`
- **37 pre-existing errors** in complex tool components — all inherited, none from recent work

### Security Headers (via `public/_headers`)
```
# Preview domains → noindex
*.freeonlinetoolsnest.pages.dev/* → X-Robots-Tag: noindex
# Production domain → security headers only
freeonlinetoolsnest.com/* → X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy: strict-origin-when-cross-origin
```

---

## 12. Completed Work (History)

### Phase 1 — SEO Infrastructure
- Added JSON-LD structured data (WebApplication, BreadcrumbList, FAQPage, Organization, WebSite, SearchAction, SiteNavigationElement)
- Added hreflang tags to shared pages (about, contact, privacy, terms, faq)
- Created `robots.txt` with proper crawl directives
- Added per-category OG images (`/og/{categorySlug}.png`)
- Added `lastmod` to sitemap
- Updated `_headers` with security headers

### Phase 2 — Design Cleanup
- Removed GitHub icon from footer
- Added offerItem5/6/7 translations to about page for all 8 locales
- Created `DESIGN.md` — comprehensive Vercel-inspired design system reference

### Phase 3 — Content System
- Added `UsageStep` and `FAQPair` interfaces to data model
- Added `usageSteps: UsageStep[]` and `faq: FAQPair[]` as optional fields on Tool
- Built `ToolLayout.astro` "How to use" section (numbered steps)
- Built `FAQSection.astro` accordion component with auto-generated FAQPage JSON-LD
- Generated and inserted 3 usage steps + 2 FAQ items for all 62 tools
- Content uses long-tail keyword phrases naturally (e.g., "check color contrast WCAG online free tool")

### Phase 4 — Blog & Link Building
- Wrote 2 new blog posts (published, built, deployed):
  1. "How Our Image Compressor Works 100% in Your Browser" (technical deep-dive)
  2. "10 Free Online Tools Every Developer and Content Creator Should Bookmark in 2026" (listicle)
- Created directory submission plan (`.omo/plans/backlink-directory-submissions.md`) — 31 directories
- Created Hacker News Show HN launch draft (`.omo/plans/show-hn-launch-draft.md`)

### Phase 5 — QA Infrastructure & Polish
- **Newsletter signup form** added to footer (client-side, localStorage-based mock submission)
- **404/500 error pages localized** using `useTranslations("en")` with `err.*` translation keys
- **AsSeenOn.astro removed** — fake social proof section deleted entirely
- **Empty `src/tools/` directory deleted**
- **`src/hooks/useCopyToClipboard.ts`** created — shared clipboard hook with 2s feedback state
- **Unit testing infrastructure** added: Vitest configured, 7 tests for `formatBytes()` and `escapeHtml()`
- **ESLint configured** with `eslint-plugin-astro` (flat config, Astro files only)
- **TypeScript strict mode** enabled via `astro/tsconfigs/strict`
- **Build** confirmed at 130 pages, 0 errors, ~9s
- **Tests** confirmed at 7/7 passing
- **Deploy** to Cloudflare Pages successful
- **Commit and push** — all changes committed to `main`

### Phase 6 — Chrome Extension (ancillary)
- Built companion browser extension (Manifest v3)
- Popup with search + category filters for 38 tools
- Links directly to tool pages on the main site

### Phase 7 — SEO Keyword Update (all 62 tools)
- Created `seo-keyword-plan.md` with 62 target long-tail keywords (one per tool, user-curated for low difficulty)
- Updated every tool in `tools.ts` with: new `metaTitle` (under 60 chars), `metaDescription` (under 160 chars, action-oriented with keyword), reordered `keywords[]` (target keyword first + 4-5 semantic variants), 3 `usageSteps` (natural keyword inclusion), 2 `faq` items (keyword variant in question, 2-3 sentence answers)
- No changes to: slug, name, description, longDescription, categorySlug, icon, featured
- Used brace-matching merge script to safely replace 62 tool objects without regex corruption
- `tools.ts` grew from 2537 → 2892 lines
- **Verification**: 0 LSP errors, 62 tools present, build 131 pages 0 errors, tests 7/7 passing

### Phase 9 — Remove All Non-English Locales (English-Only Conversion)
- Stripped `src/i18n/ui.ts` from ~1800 lines (8 languages) to ~255 lines (English only)
- Simplified `src/i18n/utils.ts` — removed `getLocalePaths`, `getLocalePath`
- Deleted `src/pages/[locale]/` folder (6 files, 48 generated pages removed from build)
- Converted root-level pages from `<meta http-equiv="refresh">` redirect stubs to real content: index, about, contact, faq, privacy-policy, terms-and-conditions
- Removed language switcher dropdown + JS from `Footer.astro`
- Removed hreflang block from `SEOHead.astro`; hardcoded `og:locale` to `en_US`
- Removed `localePaths`/`xDefaultPath` from `Layout.astro` Props interface
- Removed i18n config block from `astro.config.mjs`; simplified sitemap filter
- Replaced `useTranslations("en")` with direct English strings in 404.astro and 500.astro
- **Build**: 83 pages (was 131), 0 errors, tests 7/7 passing
- **Deploy**: Committed to `main`, deployed to Cloudflare Pages
- **Live verification**: Homepage, all root pages, tool page (word counter), sitemap, locale 404s — all confirmed working

### Phase 8 — Favicon Investigation & Google Search Fix
- Investigated why favicon doesn't display in Google search results despite being properly wired in `Layout.astro`
- Launched 3 parallel background agents to cross-reference Google Search Central docs, current head tags, and favicon image files
- **Key finding**: Google reads favicon from homepage `<link rel="icon">` tags, NOT from sitemap. Requirement: ≥48×48px PNG/GIF/ICO (SVG not supported for search results). Site must be indexed first; Google caches favicons (changes take days-weeks)
- Updated `Layout.astro` favicon link: `sizes="96x96"` → `sizes="48x48 96x96"` for explicit Google compatibility
- Confirmed: `favicon-96x96.png` (96×96, 6153 bytes) meets Google's minimum; `favicon.ico` (15086 bytes) has 48×48 frame; `_headers` and `robots.txt` don't block favicon files

### Phase 10 — Tool Expansion (62 → 77 Tools)
- Added **15 new tools** across all 7 categories: plagiarism-checker, readability-score, word-cloud-generator (text); jwt-decoder, sql-formatter, html-to-markdown, json-to-xml (developer); random-number-generator (calculators); epoch-converter (converters); serp-preview-generator, heading-structure-checker, schema-markup-generator (seo); color-palette-generator, gradient-generator, css-border-radius-generator (design)
- Conducted 11-competitor analysis to select high-impact, client-side-feasible tools
- Built 15 React components + 15 Astro page files using existing patterns (ErrorBanner, useCopyToClipboard, CSS custom properties, ToolLayout)
- Updated `SITE` constant to reflect 77 tools
- Updated AGENTS.md counts: 84→99 pages, 62→77 tools across all categories
- **Build**: 99 pages, 0 errors, ~9s. **Tests**: 7/7 passing.
- **Deploy**: Committed to `main`, deployed to Cloudflare Pages

---

## 13. Known Issues & Gaps

### Content Gaps
- [ ] Tool content (names, descriptions, longDescriptions, usageSteps, faq) is **English only** — no translations exist for tool-level content
- [ ] No blog post sharing / social promotion has been done yet
- [ ] Chrome extension only lists 38 of 77 tools (not all)

### Technical Gaps
- [ ] **No CI/CD pipeline** (manual deploy via `npm run deploy`)
- [ ] **ESLint partial coverage** — `@typescript-eslint/parser` and `eslint-plugin-react` not configured; TS/JSX files produce 161 parsing errors
- [ ] Password tools categorized under "design-tools" (should be their own or under developer-tools)
- [ ] Image compressor uses Canvas API — can't match server-side compression ratios (noted in blog post)
- [ ] 37 pre-existing TypeScript errors in complex tool components (all inherited)
- [ ] No integration or E2E tests (only 7 unit tests)

### SEO Gaps
- [ ] Site is new — no backlinks, low domain authority
- [ ] Blog posts published but no promotion done yet
- [ ] No social media presence linked from site (Twitter handle in OG tags may be placeholder)
- [ ] No performance optimization (no lazy loading audit, no Core Web Vitals check)

### Design Gaps
- [ ] Dark mode might have incomplete coverage on some tool pages
- [ ] Mobile responsiveness not thoroughly tested across all 77 tools
- [ ] No loading states for tool components that do heavy processing (PDF tools, image tools)

### i18n Gaps
- [ ] Tool content is English-only (77 tools × titles, descriptions, keywords, meta, usageSteps, faq) — no translations exist for tool-level content
- [ ] Blog posts are English-only
- [ ] 404/500 pages hardcoded to English (static fallback limitation)

---

## 14. Files an AI Should Read First

For maximum context with minimum tokens, read in this order:

1. **`src/data/tools.ts`** — Central file: all categories, all 77 tools, SITE config, helper functions
2. **`src/layouts/ToolLayout.astro`** — Tool page layout (shows every rendered section)
3. **`src/components/FAQSection.astro`** — FAQ with JSON-LD (reused on every tool page)
4. **`src/components/SEOHead.astro`** — All meta/OG/JSON-LD injection
5. **`astro.config.mjs`** — Build config, sitemap, plugins
6. **`src/i18n/ui.ts`** — English-only translation dictionary (~255 lines, was 1717)
7. **`src/styles.css`** — Design tokens and dark mode
8. **`src/types/index.ts`** — TypeScript interfaces (but tools.ts has its own superset)
9. **`package.json`** — Dependencies and scripts
10. **`public/_headers`** — Security and indexing headers
11. **`DESIGN.md`** — Vercel-inspired design system reference (if working on UI/UX)
12. **`src/hooks/useCopyToClipboard.ts`** — Shared clipboard hook (if building new interactive tools)

---

## 15. Quick Reference

### Common Commands
```bash
npm run dev          # Local dev server (port 4321)
npm run build        # Static build → dist/
npm run preview      # Preview build locally
npm run deploy       # Build + deploy to Cloudflare Pages
npm run test         # Run Vitest unit tests (7 tests)
npm run lint         # Lint with ESLint (Astro files only)
npm run check        # TypeScript check with astro check
```

### Adding a New Tool
1. Add a React component in `src/components/tools/YourTool.tsx`
2. Add entry to `TOOLS` array in `src/data/tools.ts` (slug, name, description, etc.)
3. Add usageSteps (3) and faq (2) to the tool entry
4. Create `src/pages/tools/your-tool.astro` (19-line boilerplate)
5. Run `npm run build` to verify

### Key URLs (Production)
```
Homepage:        https://freeonlinetoolsnest.com/
All tools:       https://freeonlinetoolsnest.com/tools/
Blog:            https://freeonlinetoolsnest.com/blog/
Sitemap:         https://freeonlinetoolsnest.com/sitemap-index.xml
Any tool page:   https://freeonlinetoolsnest.com/tools/{slug}/
```

### Build Output (99 pages)
```
77 tool pages + 1 tools index
1 categories index + 7 category pages
4 blog (index + 3 posts)
1 homepage
5 root content pages (about, contact, faq, privacy-policy, terms-and-conditions)
2 error pages (404 + 500)
1 favorites page
= 99 total
```

### Page Count Breakdown (verified by build)
| Section | Count | Details |
|---------|-------|---------|
| Tools | 78 | 77 tools + 1 `/tools/index.html` |
| Categories | 8 | 1 categories index + 7 category listing pages |
| Blog | 4 | Index + 3 posts |
| Homepage | 1 | `/index.html` (real content, not redirect) |
| Root content pages | 5 | about, contact, faq, privacy-policy, terms-and-conditions |
| Error pages | 2 | 404, 500 |
| Favorites | 1 | `/favorites/index.html` |
| **Total** | **99** | |

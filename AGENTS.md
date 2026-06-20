# Free Online Tools Nest — Project Knowledge Base

> This file is a comprehensive knowledge base designed to give any AI model full context about this project without needing to explore the codebase. It saves tokens by consolidating architecture, data models, patterns, completed work, and known issues in one place.

---

## 1. Project Overview

**What it is**: A collection of 62 free, browser-based utility tools (text, code, math, SEO, PDF, design, converters, calculators). All processing happens client-side — no server uploads, no signups, no ads.

**Domain**: `https://freeonlinetoolsnest.com`  
**Deployed on**: Cloudflare Pages (via `wrangler pages deploy`)  
**Build**: 130 static pages, ~8s build time, 0 errors  
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
| **i18n** | Custom (no library) | 8 locales: en, es, pt, fr, de, hi, ja, ar |
| **PDF** | `pdf-lib` + `pdfjs-dist` | Client-side PDF processing |
| **QR** | `qrcode` | Client-side QR generation |
| **Markdown** | `marked` | Client-side MD→HTML rendering |
| **Hosting** | Cloudflare Pages | Custom domain + security headers |
| **Linting** | Prettier | Code formatting only (no ESLint) |
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
├── src/
│   ├── assets/                   # Static images used in components
│   ├── components/               # Shared UI components
│   │   ├── tools/                # 62 React tool components (one per tool)
│   │   ├── FAQSection.astro      # Accordion FAQ + JSON-LD
│   │   ├── SEOHead.astro         # Meta/OG/hreflang/JSON-LD head component
│   │   ├── Nav.astro             # Sticky nav + mobile hamburger
│   │   ├── Footer.astro          # 4-column footer
│   │   ├── Hero.astro            # Homepage hero
│   │   ├── ToolCard.astro        # Tool card component
│   │   ├── CategoryCard.astro    # Category card component
│   │   ├── Breadcrumbs.astro     # Breadcrumb nav
│   │   ├── ShareBar.astro        # Share buttons
│   │   ├── FavoriteButton.tsx    # Client-side favorites (localStorage)
│   │   ├── FavoritesPage.tsx     # Favorites listing page
│   │   ├── CmdKSearch.tsx        # Command-K search modal
│   │   ├── ErrorBanner.tsx       # Error display component
│   │   └── AsSeenOn.astro        # Social proof section
│   ├── content/                  # Astro content collections
│   │   └── blog/                 # Blog posts (.md files)
│   ├── content.config.ts         # Content collection schema
│   ├── data/
│   │   └── tools.ts              # THE central file: categories + 62 tools + helpers
│   ├── helpers/
│   │   └── utils.ts              # formatBytes(), escapeHtml()
│   ├── hooks/                    # (empty — no custom hooks yet)
│   ├── i18n/
│   │   ├── ui.ts                 # Translation dictionary (1705 lines, 8 languages)
│   │   └── utils.ts              # getLangFromUrl(), useTranslations(), getLocalePaths()
│   ├── layouts/
│   │   ├── Layout.astro          # Base layout (HTML shell, SEOHead, Nav, Footer)
│   │   ├── ToolLayout.astro      # Tool page layout (breadcrumbs, sidebar, FAQ, JSON-LD)
│   │   └── BlogLayout.astro      # Blog post layout
│   ├── pages/
│   │   ├── [locale]/             # 8 localized pages per locale
│   │   │   ├── about.astro
│   │   │   ├── contact.astro
│   │   │   ├── faq.astro
│   │   │   ├── index.astro       # Locale-specific homepage
│   │   │   ├── privacy-policy.astro
│   │   │   └── terms-and-conditions.astro
│   │   ├── blog/                 # Blog index + [slug] dynamic route
│   │   ├── categories/           # 7 category listing pages
│   │   ├── tools/                # 62 tool pages + index
│   │   ├── 404.astro             # Custom 404
│   │   ├── 500.astro             # Custom 500
│   │   ├── about.astro           # Default-locale about
│   │   ├── contact.astro         # Default-locale contact
│   │   ├── favorites/            # Favorites page
│   │   ├── index.astro           # Root homepage (redirects to /en/)
│   │   └── (privacy, terms)      # Default-locale legal pages
│   ├── styles.css                # Tailwind v4 config + custom CSS
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces (Tool, Category, etc.)
│   └── tools/                    # (empty — tools live in components/tools/)
├── astro.config.mjs              # Astro config (i18n, sitemap, tailwind)
├── package.json
├── AGENTS.md                     # ← This file
└── .omo/
    └── plans/
        ├── backlink-directory-submissions.md   # Directory submission strategy
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
  description: "62 free online tools for text, code, math, and more. No uploads, no signups — everything runs in your browser, 100% private.",
  tagline: "Free tools for text, code, and math.",
};
```

### Categories (7)

| Slug | Name | Icon | # Tools |
|------|------|------|---------|
| `text-tools` | Text Tools | ✏️ | 14 |
| `developer-tools` | Developer Tools | ⚡ | 12 |
| `calculators` | Calculators | 🔢 | 8 |
| `converters` | Converters | 🔄 | 7 |
| `pdf-tools` | PDF Tools | 📄 | 5 |
| `seo-tools` | SEO Tools | 🔍 | 8 |
| `design-tools` | Design Tools | 🎨 | 8 |

### Helper Functions (all in tools.ts)

- `getToolsByCategory(categorySlug)` → Tool[]
- `getFeaturedTools()` → Tool[]
- `getToolBySlug(slug)` → Tool | undefined
- `getCategoryBySlug(slug)` → Category | undefined
- `getRelatedTools(currentSlug, limit=4)` → Tool[]
- `getAllToolSlugs()` → string[]

---

## 5. Complete Tool Inventory (62 Tools)

### Text Tools (14)
character-counter, word-counter, case-converter, text-analyzer, text-diff, text-summarizer, text-humanizer, grammar-checker, palindrome-checker, reverse-text, lorem-ipsum-generator, markdown-to-html, number-to-words, slug-generator

### Developer Tools (12)
json-formatter, html-formatter, regex-tester, css-minifier, base64-encoder-decoder, url-encoder-decoder, uuid-generator, hash-generator, binary-converter, html-entity-converter, csv-to-json, yaml-to-json

### Calculators (8)
percentage-calculator, loan-calculator, discount-calculator, mortgage-calculator, tip-calculator, age-calculator, bmi-calculator, date-difference-calculator

### Converters (7)
unit-converter, temperature-converter, lbs-to-kg-converter, json-to-csv, color-converter, image-format-converter, image-to-base64

### PDF Tools (5)
pdf-merger, pdf-splitter, pdf-compressor, pdf-to-text, pdf-to-images

### SEO Tools (8)
meta-tag-generator, sitemap-generator, robots-txt-generator, keyword-density-checker, canonical-tag-generator, seo-length-checker, open-graph-preview-generator, alt-text-checker

### Design Tools (8)
qr-code-generator, image-resizer, image-cropper, image-filter, image-compressor, color-contrast-checker, password-generator, password-strength-checker

> Note: password-generator and password-strength-checker are in design-tools category (legacy categorization)

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

- `/` → redirects to `/en/`
- `/en/` → Hero + AsSeenOn + Featured Tools grid + Category cards + Blog list
- Each locale gets its own homepage at `/{locale}/`

---

## 7. SEO Infrastructure (Already Implemented)

### Per-Page SEO
- **Custom metaTitle/metaDescription** on every tool (overrides auto-generated defaults)
- **Canonical URLs** on every page
- **Hreflang tags** for all 8 locales on shared pages (about, contact, privacy, terms, faq)
- **OG tags** (title, description, image, type, locale, site_name)
- **Twitter Card** (summary_large_image)

### Structured Data (JSON-LD)
- **WebApplication** on every tool page
- **BreadcrumbList** on every tool page
- **FAQPage** on every tool page (auto-generated from FAQ data)
- **SiteNavigationElement** on homepage
- **Organization** on homepage
- **WebSite** + **SearchAction** on homepage (site search)

### Technical SEO
- **Sitemap**: Auto-generated by `@astrojs/sitemap`, includes all 130 pages
- **robots.txt**: Proper crawl directives
- **_headers**: Security headers + noindex for preview domains
- **OG images**: Per-category OG images in `public/og/`
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
- **Tool content is NOT translated** — tools, usage steps, FAQ, meta are English only

### i18n URL Pattern
- `/en/about/` → English about page
- `/es/about/` → Spanish about page
- `/about/` → also English (default locale, redirects to `/en/about/`)
- Tool pages are single-locale: `/tools/image-compressor/` (always English)

---

## 9. Component Details

### Key Components

| Component | Type | Purpose |
|-----------|------|---------|
| **SEOHead.astro** | Astro | Injects `<title>`, meta, OG, Twitter, canonical, hreflang, JSON-LD |
| **Nav.astro** | Astro | Sticky header with logo, category links, dark mode toggle, CmdK search trigger, hamburger on mobile |
| **Footer.astro** | Astro | 4-column: Tools (first 6), Categories (all 7), Company (About/Blog/Contact/Faq), Legal (Privacy/Terms) |
| **FAQSection.astro** | Astro | Accordion FAQ + auto-generates FAQPage JSON-LD |
| **ToolLayout.astro** | Astro | Wraps every tool page with all SEO, breadcrumbs, sidebar, FAQ |
| **ToolCard.astro** | Astro | Card for tool listings (icon, name, description, category badge) |
| **CategoryCard.astro** | Astro | Card for category listings (icon, name, description, tool count) |
| **FavoriteButton.tsx** | React | Toggle favorite, stored in localStorage, works offline |
| **FavoritesPage.tsx** | React | Lists favorited tools from localStorage |
| **CmdKSearch.tsx** | React | ⌘K search modal — fuzzy-search across all 62 tools |
| **ShareBar.astro** | Astro | Share buttons (copy link, social) |
| **Breadcrumbs.astro** | Astro | Breadcrumb navigation with JSON-LD |
| **Hero.astro** | Astro | Homepage hero with tagline and search |
| **AsSeenOn.astro** | Astro | Social proof (currently empty/placeholder) |

### 62 React Tool Components (in `src/components/tools/`)

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

### Dark Mode
- Toggle in nav bar
- Persisted in localStorage
- Implemented via CSS custom properties (no Tailwind `dark:` variants needed)

---

## 11. Deployment

### Cloudflare Pages
- **Project**: `freeonlinetoolsnest`
- **Branch**: `main`
- **Command**: `npm run deploy` (builds + deploys)
- **Custom domain**: `freeonlinetoolsnest.com`
- **Preview domain**: `*.freeonlinetoolsnest.pages.dev` (blocked from indexing via `_headers`)

### Build Stats
- **130 pages** generated (62 tools + 7 categories + 8 locales × 6 pages + blog index + 3 blog posts + 404 + 500 + tools index + favorites + 2 about + 2 contact + 2 faq + 2 privacy + 2 terms + 8 homepage)
- **~8s build time**
- **0 build errors**

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

---

## 13. Known Issues & Gaps

### Content Gaps
- [ ] Tool content (names, descriptions, longDescriptions, usageSteps, faq) is **English only** — no translations exist for tool-level content
- [ ] `AsSeenOn.astro` component is empty/placeholder
- [ ] No blog post sharing / social promotion has been done yet
- [ ] No email newsletter / lead capture mechanism

### Technical Gaps
- [ ] No automated tests (unit, integration, or E2E)
- [ ] No ESLint configured (only Prettier for formatting)
- [ ] No CI/CD pipeline (manual deploy via `npm run deploy`)
- [ ] `src/tools/` directory is empty (no tools stored there — all in `components/tools/`)
- [ ] `src/hooks/` directory is empty
- [ ] Password tools categorized under "design-tools" (should be their own or under developer-tools)
- [ ] Image compressor uses Canvas API — can't match server-side compression ratios (noted in blog post)

### SEO Gaps
- [ ] Site is new — no backlinks, low domain authority
- [ ] 2 blog posts published but no promotion done yet
- [ ] No social media presence linked from site (Twitter handle in OG tags may be placeholder)
- [ ] No analytics tracking (no GA, Plausible, or similar)
- [ ] No performance optimization (no lazy loading audit, no Core Web Vitals check)

### Design Gaps
- [ ] Dark mode might have incomplete coverage on some tool pages
- [ ] Mobile responsiveness not thoroughly tested across all 62 tools
- [ ] No loading states for tool components that do heavy processing (PDF tools, image tools)

### i18n Gaps
- [ ] Tool content is English-only (62 tools × titles, descriptions, keywords, meta, usageSteps, faq)
- [ ] Blog posts are English-only
- [ ] 404/500 pages might not be fully localized

---

## 14. Files an AI Should Read First

For maximum context with minimum tokens, read in this order:

1. **`src/data/tools.ts`** — Central file: all categories, all 62 tools, SITE config, helper functions
2. **`src/layouts/ToolLayout.astro`** — Tool page layout (shows every rendered section)
3. **`src/components/FAQSection.astro`** — FAQ with JSON-LD (reused on every tool page)
4. **`src/components/SEOHead.astro`** — All meta/OG/hreflang/JSON-LD injection
5. **`astro.config.mjs`** — Build config, i18n, plugins
6. **`src/i18n/ui.ts`** — Full translation dictionary (1705 lines)
7. **`src/styles.css`** — Design tokens and dark mode
8. **`src/types/index.ts`** — TypeScript interfaces (but tools.ts has its own superset)
9. **`package.json`** — Dependencies and scripts
10. **`public/_headers`** — Security and indexing headers

---

## 15. Quick Reference

### Common Commands
```bash
npm run dev          # Local dev server (port 4321)
npm run build        # Static build → dist/
npm run preview      # Preview build locally
npm run deploy       # Build + deploy to Cloudflare Pages
```

### Adding a New Tool
1. Add a React component in `src/components/tools/YourTool.tsx`
2. Add entry to `TOOLS` array in `src/data/tools.ts` (slug, name, description, etc.)
3. Add usageSteps (3) and faq (2) to the tool entry
4. Create `src/pages/tools/your-tool.astro` (19-line boilerplate)
5. Run `npm run build` to verify

### Key URLs (Production)
```
Homepage:        https://freeonlinetoolsnest.com/en/
All tools:       https://freeonlinetoolsnest.com/tools/
Blog:            https://freeonlinetoolsnest.com/blog/
Sitemap:         https://freeonlinetoolsnest.com/sitemap-index.xml
Any tool page:   https://freeonlinetoolsnest.com/tools/{slug}/
```

### Build Output (130 pages)
```
62 tool pages + 1 tools index
7 category pages
3 blog posts + 1 blog index
8 locale homepages
8 locales × 6 shared pages (about, contact, faq, privacy, terms, index)
404 + 500 error pages
Favorites page
= 130 total
```

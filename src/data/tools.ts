/**
 * Tool Registry — single source of truth for all tools on the site.
 * To add a new tool: append to the TOOLS array below and create
 * the corresponding page + React component.
 */

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string; // emoji or SVG path
  color: string; // gradient start color
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  categorySlug: string;
  icon: string;
  featured: boolean;
  keywords: string[];
}

// ── Categories ──────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  {
    slug: "text-tools",
    name: "Text Tools",
    description:
      "Transform, analyze, and format text with powerful utilities for writers and content creators.",
    icon: "✏️",
    color: "#007cf0",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description:
      "Format, encode, and validate code and data for faster development workflows.",
    icon: "⚡",
    color: "#7928ca",
  },
  {
    slug: "calculators",
    name: "Calculators",
    description:
      "Solve math problems and compute values with quick, precise calculators.",
    icon: "🔢",
    color: "#ff4d4d",
  },
  {
    slug: "converters",
    name: "Converters",
    description:
      "Convert between formats, units, and encodings instantly.",
    icon: "🔄",
    color: "#f9cb28",
  },
];

// ── Tools ───────────────────────────────────────────────────

export const TOOLS: Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, sentences, and paragraphs in any text instantly.",
    longDescription:
      "Paste or type your text to get an instant breakdown of word count, character count, sentence count, paragraph count, and estimated reading time. Perfect for writers, students, and content creators who need to meet word limits.",
    categorySlug: "text-tools",
    icon: "📝",
    featured: true,
    keywords: ["word count", "text counter", "character count", "reading time"],
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    description:
      "Count characters with and without spaces for social media limits.",
    longDescription:
      "Track character counts in real time — with and without spaces. Ideal for Twitter/X posts (280 chars), meta descriptions (160 chars), SMS messages (160 chars), and any platform with character limits.",
    categorySlug: "text-tools",
    icon: "🔤",
    featured: true,
    keywords: [
      "character count",
      "letter counter",
      "text length",
      "twitter character limit",
    ],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    description:
      "Convert text between uppercase, lowercase, title case, and more.",
    longDescription:
      "Transform text between uppercase, lowercase, title case, sentence case, and camelCase. Copy the result with one click. Useful for formatting headings, variable names, and content.",
    categorySlug: "text-tools",
    icon: "🔠",
    featured: false,
    keywords: [
      "uppercase converter",
      "lowercase converter",
      "title case",
      "text case changer",
    ],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text in paragraphs, sentences, or words.",
    longDescription:
      "Generate lorem ipsum placeholder text by paragraphs, sentences, or word count. Choose the amount and copy the output for mockups, wireframes, and design prototyping.",
    categorySlug: "text-tools",
    icon: "📄",
    featured: false,
    keywords: [
      "lorem ipsum",
      "placeholder text",
      "dummy text",
      "filler text generator",
    ],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data with syntax errors.",
    longDescription:
      "Paste minified or messy JSON and get a beautifully formatted, syntax-highlighted result. The formatter validates your JSON and highlights errors with line numbers so you can fix issues quickly.",
    categorySlug: "developer-tools",
    icon: "{ }",
    featured: true,
    keywords: [
      "json formatter",
      "json beautifier",
      "json validator",
      "json prettify",
    ],
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    description: "Encode or decode URLs and query strings for safe transmission.",
    longDescription:
      "Encode special characters in URLs to make them safe for transmission, or decode percent-encoded strings back to readable text. Supports full URL encoding and component-level encoding.",
    categorySlug: "developer-tools",
    icon: "🔗",
    featured: true,
    keywords: [
      "url encode",
      "url decode",
      "percent encoding",
      "urlencode online",
    ],
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 strings back to text.",
    longDescription:
      "Convert any text to a Base64-encoded string or decode a Base64 string back to its original text. Useful for encoding data for APIs, email attachments, and data URIs.",
    categorySlug: "developer-tools",
    icon: "🔐",
    featured: false,
    keywords: [
      "base64 encode",
      "base64 decode",
      "base64 converter",
      "binary to text",
    ],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description:
      "Calculate percentages, percentage change, and what percent X is of Y.",
    longDescription:
      "Three calculation modes: find a percentage of a number, find what percentage one number is of another, and calculate percentage increase or decrease between two values.",
    categorySlug: "calculators",
    icon: "%",
    featured: true,
    keywords: [
      "percentage calculator",
      "percent of number",
      "percentage change",
      "percentage increase",
    ],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate downloadable QR codes from any URL or text.",
    longDescription:
      "Enter any URL, text, or data and generate a high-quality QR code instantly. Customize the size and download as PNG. Perfect for marketing materials, business cards, and event tickets.",
    categorySlug: "converters",
    icon: "📱",
    featured: true,
    keywords: [
      "qr code generator",
      "create qr code",
      "qr code maker",
      "url to qr",
    ],
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    description: "Convert colors between HEX, RGB, and HSL formats instantly.",
    longDescription:
      "Enter a color in any format — HEX, RGB, or HSL — and get instant conversions to all other formats. See a live preview of the color and copy values with one click. Essential for web designers and developers.",
    categorySlug: "converters",
    icon: "🎨",
    featured: true,
    keywords: [
      "hex to rgb",
      "rgb to hex",
      "color converter",
      "hsl converter",
    ],
  },
];

// ── Helper functions ────────────────────────────────────────

export function getToolsByCategory(categorySlug: string): Tool[] {
  return TOOLS.filter((t) => t.categorySlug === categorySlug);
}

export function getFeaturedTools(): Tool[] {
  return TOOLS.filter((t) => t.featured);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getRelatedTools(currentSlug: string, limit = 4): Tool[] {
  const current = getToolBySlug(currentSlug);
  if (!current) return TOOLS.slice(0, limit);
  return TOOLS.filter(
    (t) => t.categorySlug === current.categorySlug && t.slug !== currentSlug
  ).slice(0, limit);
}

export function getAllToolSlugs(): string[] {
  return TOOLS.map((t) => t.slug);
}

export const SITE = {
  name: "Free Online Tools Nest",
  domain: "freeonlinetoolsnest.com",
  url: "https://freeonlinetoolsnest.com",
  description:
    "Free online tools for text, code, math, and conversions. Fast, private, and no sign-up required.",
  tagline: "Free tools for text, code, and math.",
};

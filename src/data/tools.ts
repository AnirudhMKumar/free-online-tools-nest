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
  metaTitle?: string;
  metaDescription?: string;
  seoContent?: string;
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
  metaTitle?: string;
  metaDescription?: string;
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
    metaTitle: "Free Online Text Tools — Case Converter & Word Counters",
    metaDescription: "A curated collection of text formatting and analyzing utilities. Change text cases, count characters, and generate dummy text locally in-browser.",
    seoContent: "Our text tools category is built for writers, editors, students, and SEO managers who need to manipulate and analyze text fast. From real-time word counting to text-case switching, every tool works in your browser. This ensures that whatever you write remains confidential, as no text data is ever sent across the network. Optimize your content production today."
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description:
      "Format, encode, and validate code and data for faster development workflows.",
    icon: "⚡",
    color: "#7928ca",
    metaTitle: "Online Developer Tools — JSON Formatter & Code Utilities",
    metaDescription: "Format, encode, and validate your code payloads. Access JSON beautifiers, URL/Base64 encoders, and Regex testers with total security.",
    seoContent: "Modern software development demands simple, fast, and secure tools. Our developer category offers robust client-side utilities to inspect and clean code payloads. Whether you are debugging a nested JSON payload or validating a regex pattern, you can run these processes locally. You don't have to worry about uploading sensitive API keys, configurations, or credentials to external servers."
  },
  {
    slug: "calculators",
    name: "Calculators",
    description:
      "Solve math problems and compute values with quick, precise calculators.",
    icon: "🔢",
    color: "#ff4d4d",
    metaTitle: "Free Online Calculators — Percentage and Math Solvers",
    metaDescription: "Quickly solve percentages, proportional shifts, and increase/decrease values with our online calculators. Instant math results.",
    seoContent: "Doing quick math shouldn't require firing up a heavy spreadsheet application. Our collection of online calculators gives you instant answers for common equations. The multi-mode percentage calculator simplifies everyday business, budgeting, and academic tasks by rendering precise answers as you type, with clear visual explanations."
  },
  {
    slug: "converters",
    name: "Converters",
    description:
      "Convert between formats, units, and encodings instantly.",
    icon: "🔄",
    color: "#f9cb28",
    metaTitle: "Online Converter Tools — Image Compressor & QR Generators",
    metaDescription: "Convert data, images, and color codes with high speed. Compress images client-side, make QR codes, and convert colors without uploads.",
    seoContent: "Transform inputs from one standard format to another using our online converter tools. This collection covers everyday web design and data conversions, including image compression, color code translation, and markdown compiling. Everything runs client-side to protect your assets and files from server-side security issues."
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
    metaTitle: "Word Counter Online — Free Word & Character Count Tool",
    metaDescription: "Instantly count words, characters, sentences, and paragraphs in your text. Analyze reading speed and length for blog posts, essays, and metadata."
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
    metaTitle: "Character Counter Online — Free Letter and Space Tracker",
    metaDescription: "Count characters with and without spaces in real-time. Make sure your copy fits Twitter (280 chars), SMS, and Google meta descriptions."
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
    metaTitle: "Case Converter Online — Change Text Case Instantly",
    metaDescription: "Convert text uppercase, lowercase, sentence case, title case, and camelCase. Copy your formatted text instantly with a single click."
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
    metaTitle: "Lorem Ipsum Generator Online — Free Dummy Text Creator",
    metaDescription: "Generate custom placeholder text in paragraphs, sentences, or word counts. Perfect for wireframes, graphic designs, and web layouts."
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
    metaTitle: "JSON Formatter Online — Prettify and Validate JSON Data",
    metaDescription: "Format, clean, and validate your JSON data in real-time. Detect syntax errors with line numbers and copy clean, syntax-highlighted code."
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
    metaTitle: "URL Encoder Decoder Online — Safely Encode URL Characters",
    metaDescription: "Convert special characters in query strings and URLs using percent-encoding, or decode encoded strings back to human-readable paths."
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
    metaTitle: "Base64 Encoder Decoder Online — Text and File Converter",
    metaDescription: "Quickly encode text to Base64 format or decode Base64 strings back to plain text. Completely client-side tool for developers."
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
    metaTitle: "Percentage Calculator Online — Solve Math Proportions Fast",
    metaDescription: "Easily calculate percentages, percentage differences, and percentage increases or decreases with our simple three-mode math calculator."
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
    metaTitle: "Online QR Code Generator — Create Custom Downloadable QR Codes",
    metaDescription: "Generate customizable QR codes from any web link, email, phone number, or text. Download your QR code as a PNG graphic for free."
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
    metaTitle: "Color Converter Online — Translate HEX, RGB, HSL Colors",
    metaDescription: "Convert color codes between HEX, RGB, and HSL formats instantly. Preview colors dynamically and copy values for design layouts."
  },
  {
    slug: "html-formatter",
    name: "HTML Formatter",
    description: "Format, beautify, and minify your HTML code instantly.",
    longDescription:
      "Clean up messy or minified HTML markup with customizable indent levels. Beautify your code for better readability, or minify it to reduce file size and optimize loading times.",
    categorySlug: "developer-tools",
    icon: "🌐",
    featured: true,
    keywords: ["html formatter", "beautify html", "html beautifier", "minify html", "format html online"],
    metaTitle: "HTML Formatter Online — Prettify and Minify HTML Markup",
    metaDescription: "Beautify messy HTML code with custom indent sizes or compress it into minified code to speed up page loads. Browser-based editor."
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test your regular expressions in real-time with syntax highlighting.",
    longDescription:
      "Write and test regular expressions against sample text. View match counts, highlight matched text, extract capture groups, and understand match coordinates instantly in your browser.",
    categorySlug: "developer-tools",
    icon: "🧪",
    featured: true,
    keywords: ["regex tester", "test regex", "regular expression online", "regex matcher", "javascript regex"],
    metaTitle: "Regex Tester Online — Validate Regular Expressions in Real-Time",
    metaDescription: "Test regular expressions against sample texts instantly. Highlight matches, see capture groups, and check positions inside your browser."
  },
  {
    slug: "markdown-to-html",
    name: "Markdown to HTML",
    description: "Convert Markdown syntax to clean, valid HTML markup.",
    longDescription:
      "Easily convert markdown text (including headings, lists, tables, links, and code blocks) to standard HTML code. View a live rich text preview of your rendered document and copy raw HTML with one click.",
    categorySlug: "converters",
    icon: "⬇️",
    featured: true,
    keywords: ["markdown to html", "md to html", "convert markdown", "markdown compiler"],
    metaTitle: "Markdown to HTML Converter Online — Clean Markup Compiler",
    metaDescription: "Convert markdown files and syntax into clean, semantic HTML code. View live rendered previews and copy raw code instantly."
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON",
    description: "Convert CSV spreadsheets or tables to structured JSON data.",
    longDescription:
      "Paste comma, semicolon, or tab-delimited values (CSV) and convert them to structured JSON arrays of objects. Features a clean table grid preview and allows custom separator settings, header options, and JSON formatting.",
    categorySlug: "converters",
    icon: "📊",
    featured: true,
    keywords: ["csv to json", "convert csv to json", "excel to json", "csv parser online"],
    metaTitle: "CSV to JSON Converter Online — Parse Tables to JSON",
    metaDescription: "Transform CSV text, comma-separated values, and Excel tables into structured JSON arrays of objects with custom delimiters."
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress and resize PNG, JPEG, and WebP images client-side.",
    longDescription:
      "Reduce image file sizes directly in your browser. Adjust compression quality, resize dimensions, choose output formats (JPEG, WebP, PNG), and compare before/after file sizes. 100% private with no server uploads.",
    categorySlug: "converters",
    icon: "🖼️",
    featured: true,
    keywords: ["image compressor", "compress jpeg", "png compressor", "reduce image size", "resize image online"],
    metaTitle: "Image Compressor Online — Reduce PNG, JPEG & WebP Sizes",
    metaDescription: "Reduce image file sizes directly in your web browser. Resize widths, change output formats, and compress images with 100% client-side privacy."
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

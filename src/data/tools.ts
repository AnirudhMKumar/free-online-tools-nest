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
  {
    slug: "pdf-tools",
    name: "PDF Tools",
    description:
      "Merge, split, compress, and convert PDF documents right in your browser.",
    icon: "📄",
    color: "#ee0000",
    metaTitle: "Free Online PDF Tools — Merge, Split, Convert PDFs",
    metaDescription: "Edit PDF documents online for free. Merge multiple PDFs, split pages, compress files, and extract text and images — all client-side with no uploads.",
    seoContent: "Working with PDF documents often requires desktop software or trusting online services with sensitive files. Our PDF tools category solves both problems: every tool runs entirely in your browser. Merge multiple PDFs into one document, split a PDF into individual pages, reduce file sizes, extract text, and convert pages to images. Your documents never leave your device."
  },
  {
    slug: "seo-tools",
    name: "SEO Tools",
    description:
      "Generate meta tags, check keyword density, create sitemaps, and optimize your site for search engines.",
    icon: "🔍",
    color: "#0070f3",
    metaTitle: "Free Online SEO Tools — Meta Tags, Sitemaps & More",
    metaDescription: "Optimize your website with our free SEO toolset. Generate meta tags, check keyword density, create sitemaps and robots.txt — all client-side.",
    seoContent: "Search engine optimization is critical for any website's success. Our SEO tools category provides everything you need to optimize your site: from meta tag generators and keyword density analyzers to sitemap and robots.txt generators. Every tool runs in your browser, so your data stays private."
  },
  {
    slug: "design-tools",
    name: "Design Tools",
    description:
      "Check color contrast, convert color formats, and analyze your designs for accessibility.",
    icon: "🎨",
    color: "#7928ca",
    metaTitle: "Free Online Design Tools — Color Contrast Checker & More",
    metaDescription: "Check WCAG color contrast ratios, preview design elements, and ensure your designs are accessible. Free online design tools.",
    seoContent: "Good design is accessible design. Our design tools category helps you check color contrast ratios for WCAG compliance, convert between color formats, and preview how your designs will look. All tools run client-side for speed and privacy."
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
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your exact age from date of birth in years, months, days, hours, and more.",
    longDescription:
      "Enter your date of birth and get your exact age in years, months, weeks, days, hours, minutes, and seconds. You can also calculate the age between any two dates. Perfect for birthdays, anniversaries, and determining precise age for forms.",
    categorySlug: "calculators",
    icon: "🎂",
    featured: true,
    keywords: [
      "age calculator",
      "how old am i",
      "date of birth calculator",
      "age from date of birth",
      "birthday calculator",
    ],
    metaTitle: "Age Calculator Online — Find Your Exact Age from Date of Birth",
    metaDescription: "Calculate your exact age from your date of birth in years, months, weeks, days, hours, minutes, and seconds. Free online age calculator."
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and see where you fall on the BMI scale.",
    longDescription:
      "Enter your height and weight to calculate your Body Mass Index (BMI). The result includes your BMI value, a visual indicator on the BMI scale, and weight category classification (underweight, normal, overweight, obese).",
    categorySlug: "calculators",
    icon: "⚕️",
    featured: true,
    keywords: [
      "bmi calculator",
      "body mass index",
      "bmi chart",
      "calculate bmi",
      "ideal weight calculator",
    ],
    metaTitle: "BMI Calculator Online — Calculate Your Body Mass Index Free",
    metaDescription: "Calculate your Body Mass Index (BMI) instantly. Enter height and weight to see your BMI value, weight category, and where you stand on the BMI scale."
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate the tip amount and split the bill among any number of people.",
    longDescription:
      "Easily calculate the tip for your bill. Enter the bill amount, choose a tip percentage (10%, 15%, 18%, 20%, or custom), and split among any number of people. See the tip amount per person and the total per person instantly.",
    categorySlug: "calculators",
    icon: "💵",
    featured: true,
    keywords: [
      "tip calculator",
      "gratuity calculator",
      "bill splitter",
      "tip per person",
      "restaurant bill calculator",
    ],
    metaTitle: "Tip Calculator Online — Split Bill and Calculate Gratuity Free",
    metaDescription: "Quickly calculate the tip for your restaurant bill and split among friends. Choose tip percentage, see per-person amounts, and never overpay again."
  },
  {
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    description: "Calculate the exact number of days, months, and years between two dates.",
    longDescription:
      "Pick any two dates and find the exact duration between them in years, months, weeks, and days. Perfect for calculating age, project timelines, countdowns, anniversaries, and days until an event.",
    categorySlug: "calculators",
    icon: "📅",
    featured: true,
    keywords: [
      "date difference calculator",
      "days between dates",
      "date calculator",
      "how many days",
      "days counter",
    ],
    metaTitle: "Date Difference Calculator — Days Between Dates Online",
    metaDescription: "Calculate the exact number of days, months, weeks, and years between any two dates. Free online date duration calculator."
  },
  {
    slug: "number-to-words",
    name: "Number to Words",
    description: "Convert any number to its English word representation (e.g., 123 → one hundred twenty-three).",
    longDescription:
      "Enter any number and get its English word form instantly. Supports whole numbers up to trillions. Perfect for writing checks, formal documents, invoices, and learning number spelling.",
    categorySlug: "calculators",
    icon: "🔢",
    featured: true,
    keywords: [
      "number to words",
      "numbers to text",
      "spell numbers",
      "number to english",
      "check writer",
    ],
    metaTitle: "Number to Words Converter Online — Spell Any Number in English",
    metaDescription: "Convert any number to English words instantly. Perfect for writing checks, invoices, and formal documents. Supports numbers up to trillions."
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

  // ── PDF Tools (5) ────────────────────────────────────────────
  {
    slug: "pdf-merger",
    name: "PDF Merger",
    description: "Combine multiple PDF files into a single document instantly.",
    longDescription:
      "Upload two or more PDF files and merge them into one cohesive document. Reorder pages before merging and download the combined result. Perfect for combining reports, invoices, contracts, and scanned documents.",
    categorySlug: "pdf-tools",
    icon: "📑",
    featured: true,
    keywords: ["merge pdf", "combine pdf", "join pdf files", "pdf merger online", "pdf combiner"],
    metaTitle: "PDF Merger Online — Merge Multiple PDFs into One Free",
    metaDescription: "Combine multiple PDF files into a single document online. Upload, reorder, and merge PDFs instantly in your browser — 100% free and private."
  },
  {
    slug: "pdf-splitter",
    name: "PDF Splitter",
    description: "Split a PDF file into individual pages or page ranges.",
    longDescription:
      "Upload a PDF and split it into separate pages. Choose to extract every page as an individual PDF, or select a specific page range. Ideal for extracting chapters, sections, or specific documents from larger PDF files.",
    categorySlug: "pdf-tools",
    icon: "✂️",
    featured: true,
    keywords: ["split pdf", "extract pdf pages", "pdf page separator", "pdf splitter online", "separate pdf pages"],
    metaTitle: "PDF Splitter Online — Split PDF Pages Instantly Free",
    metaDescription: "Split a PDF into individual pages or extract specific page ranges. Free online PDF splitter that runs entirely in your browser with no uploads."
  },
  {
    slug: "pdf-compressor",
    name: "PDF Compressor",
    description: "Reduce PDF file size by compressing images and content.",
    longDescription:
      "Upload a PDF and reduce its file size by compressing embedded images and removing redundant data. Choose compression level (low, medium, high) to balance quality vs file size. Perfect for making large PDFs email-friendly.",
    categorySlug: "pdf-tools",
    icon: "🗜️",
    featured: true,
    keywords: ["compress pdf", "reduce pdf size", "pdf compression online", "smaller pdf", "pdf optimizer"],
    metaTitle: "PDF Compressor Online — Reduce PDF File Size Free",
    metaDescription: "Compress PDF files to reduce their size. Choose compression level and download a smaller PDF — all client-side, no uploads, 100% free."
  },
  {
    slug: "pdf-to-text",
    name: "PDF to Text",
    description: "Extract and copy text content from PDF files.",
    longDescription:
      "Upload a PDF and extract all text content from every page. The extracted text preserves paragraph structure and is immediately copyable. Perfect for pulling quotes, research data, or content from PDFs for reuse.",
    categorySlug: "pdf-tools",
    icon: "📝",
    featured: false,
    keywords: ["pdf to text", "extract text from pdf", "pdf text extractor", "pdf reader online", "copy text from pdf"],
    metaTitle: "PDF to Text Converter Online — Extract Text from PDF Free",
    metaDescription: "Extract text content from PDF files instantly in your browser. Copy formatted text from any PDF without uploading to a server."
  },
  {
    slug: "pdf-to-images",
    name: "PDF to Images",
    description: "Convert PDF pages to high-quality PNG or JPEG images.",
    longDescription:
      "Upload a PDF and convert each page into a separate image file. Choose between PNG (lossless) and JPEG (smaller file) format, adjust image quality, and download individual pages or all pages as a ZIP. Perfect for creating thumbnails, presentations, or sharing PDF content as images.",
    categorySlug: "pdf-tools",
    icon: "🖼️",
    featured: false,
    keywords: ["pdf to image", "pdf to png", "pdf to jpg", "convert pdf to image", "pdf page to image"],
    metaTitle: "PDF to Image Converter Online — Convert PDF Pages to PNG/JPG",
    metaDescription: "Convert PDF pages to high-quality PNG or JPEG images. Free online PDF to image converter — choose quality, format, and download individually or as a ZIP."
  },

  // ── Image Tools (5) ─────────────────────────────────────────
  {
    slug: "image-cropper",
    name: "Image Cropper",
    description: "Crop any image to custom dimensions or preset aspect ratios.",
    longDescription:
      "Upload an image and crop it to your desired dimensions. Choose from preset aspect ratios (square, 16:9, 4:3, 3:2) or set custom width and height. Drag the crop area to frame the perfect shot before downloading.",
    categorySlug: "converters",
    icon: "✂️",
    featured: true,
    keywords: ["crop image", "image cropper online", "crop picture", "photo cropper", "crop jpeg online"],
    metaTitle: "Image Cropper Online — Crop Photos and Images Free",
    metaDescription: "Crop any image to custom dimensions or preset aspect ratios. Free online image cropper that works entirely in your browser."
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to exact dimensions while maintaining quality.",
    longDescription:
      "Upload an image and resize it to exact pixel dimensions. Maintain aspect ratio with a single click, set your own width and height, preview the result, then download your resized image. Perfect for social media images, thumbnails, and web graphics.",
    categorySlug: "converters",
    icon: "📏",
    featured: true,
    keywords: ["resize image", "image resizer online", "photo resizer", "change image size", "resize jpeg"],
    metaTitle: "Image Resizer Online — Resize Photos and Images Free",
    metaDescription: "Resize any image to exact pixel dimensions. Maintain aspect ratio, preview the result, and download — all client-side with no uploads."
  },
  {
    slug: "image-format-converter",
    name: "Image Format Converter",
    description: "Convert images between PNG, JPEG, WebP, and other formats.",
    longDescription:
      "Upload an image and convert it to your desired format. Supports PNG, JPEG, and WebP output. Adjust quality for JPEG and WebP. Perfect for converting screenshots, optimizing web images, and preparing assets for different platforms.",
    categorySlug: "converters",
    icon: "🔄",
    featured: true,
    keywords: ["convert image format", "png to jpg", "jpg to png", "webp converter", "image format changer"],
    metaTitle: "Image Format Converter Online — Convert PNG, JPEG, WebP Free",
    metaDescription: "Convert images between PNG, JPEG, and WebP formats instantly in your browser. Free online image format converter with quality controls."
  },
  {
    slug: "image-filter",
    name: "Image Filter",
    description: "Apply filters like grayscale, sepia, blur, and invert to images.",
    longDescription:
      "Upload an image and apply powerful filters with one click. Choose from grayscale, sepia, invert colors, blur, brightness, contrast, and saturation adjustments. Preview changes in real-time and download the filtered image.",
    categorySlug: "converters",
    icon: "🎨",
    featured: false,
    keywords: ["image filter", "photo filter online", "grayscale image", "sepia effect", "image editing online"],
    metaTitle: "Image Filter Online — Apply Filters to Photos Free",
    metaDescription: "Apply filters like grayscale, sepia, invert, blur, and adjust brightness/contrast to any image. Free online image filter — all client-side."
  },
  {
    slug: "image-to-base64",
    name: "Image to Base64",
    description: "Convert any image to a Base64 encoded data URI string.",
    longDescription:
      "Upload an image and instantly get its Base64-encoded data URI representation. Copy the string with one click for use in CSS backgrounds, HTML image sources, and data URIs. Perfect for web developers embedding images directly in code.",
    categorySlug: "converters",
    icon: "🔣",
    featured: false,
    keywords: ["image to base64", "base64 image encoder", "data uri generator", "image to data uri", "base64 encode image"],
    metaTitle: "Image to Base64 Converter Online — Encode Images to Data URI",
    metaDescription: "Convert any image to a Base64 data URI string instantly. Free online tool for web developers to embed images directly in HTML and CSS."
  },

  // ── Developer Tools (3) ─────────────────────────────────────
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords with customizable options.",
    longDescription:
      "Create strong random passwords with full control over length, character types (uppercase, lowercase, numbers, symbols), and exclusions. See password strength indicator and copy generated passwords with one click. Perfect for creating secure credentials for any account.",
    categorySlug: "developer-tools",
    icon: "🔑",
    featured: true,
    keywords: ["password generator", "strong password", "random password", "secure password generator", "password creator"],
    metaTitle: "Password Generator Online — Create Strong Secure Passwords",
    metaDescription: "Generate strong, random passwords with customizable length and character types. Free online password generator with strength indicator."
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes of any text.",
    longDescription:
      "Enter any text and generate cryptographic hash values using MD5, SHA-1, SHA-256, or SHA-512 algorithms. Compare two hashes, copy results with one click. Uses the Web Crypto API for secure, client-side hashing. Perfect for verifying file integrity, storing passwords, and data validation.",
    categorySlug: "developer-tools",
    icon: "#",
    featured: false,
    keywords: ["hash generator", "md5 generator", "sha256 hash", "sha512 hash", "hash calculator online"],
    metaTitle: "Hash Generator Online — Generate MD5, SHA-1, SHA-256, SHA-512",
    metaDescription: "Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) of any text instantly in your browser using the Web Crypto API."
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate random UUIDs (v4) for databases, APIs, and testing.",
    longDescription:
      "Generate one or more random UUID v4 identifiers instantly. Copy to clipboard with one click. Choose how many UUIDs to generate at once (1-100). Perfect for database primary keys, API identifiers, session tokens, and testing.",
    categorySlug: "developer-tools",
    icon: "🔢",
    featured: false,
    keywords: ["uuid generator", "guid generator", "generate uuid v4", "random uuid", "unique id generator"],
    metaTitle: "UUID Generator Online — Generate Random UUID v4 Free",
    metaDescription: "Generate random UUID v4 identifiers instantly in your browser. Copy to clipboard — perfect for database keys, API tokens, and testing."
  },

  // ── Text Tools (3) ──────────────────────────────────────────
  {
    slug: "text-diff",
    name: "Text Diff Checker",
    description: "Compare two texts side-by-side and highlight differences.",
    longDescription:
      "Paste two versions of text and see the differences highlighted instantly. Compare line by line with additions shown in green, deletions in red, and unchanged text in gray. Perfect for reviewing document changes, code diffs, and content edits.",
    categorySlug: "text-tools",
    icon: "📊",
    featured: true,
    keywords: ["text diff", "diff checker", "compare text online", "text comparison", "find text differences"],
    metaTitle: "Text Diff Checker Online — Compare Text Side by Side Free",
    metaDescription: "Compare two texts side by side and see highlighted differences. Free online diff checker — additions, deletions, and unchanged lines clearly marked."
  },
  {
    slug: "slug-generator",
    name: "URL Slug Generator",
    description: "Convert any text to a clean, URL-friendly slug.",
    longDescription:
      "Enter any text and convert it to a clean, SEO-friendly URL slug. The generator strips special characters, converts to lowercase, replaces spaces with hyphens, and removes diacritics. Perfect for creating blog post URLs, product links, and clean web paths.",
    categorySlug: "text-tools",
    icon: "🔗",
    featured: false,
    keywords: ["slug generator", "url slug", "seo friendly url", "text to slug", "url friendly text"],
    metaTitle: "URL Slug Generator Online — Create SEO-Friendly Slugs Free",
    metaDescription: "Convert any text to a clean, SEO-friendly URL slug instantly. Free online slug generator for blog posts, product pages, and web paths."
  },
  {
    slug: "text-summarizer",
    name: "Text Summarizer",
    description: "Summarize long articles and paragraphs into concise key points.",
    longDescription:
      "Paste long text and get a concise summary of the most important sentences. The summarizer uses extractive techniques — analyzing word frequency and sentence scoring — to identify and present the most meaningful content. Choose summary length (short, medium, long) to control detail level.",
    categorySlug: "text-tools",
    icon: "📋",
    featured: true,
    keywords: ["text summarizer", "summarize text", "article summarizer", "text summary generator", "ai text summarizer"],
    metaTitle: "Text Summarizer Online — Summarize Articles and Text Free",
    metaDescription: "Summarize long articles, documents, and paragraphs into concise key points. Free online extractive text summarizer with adjustable summary length."
  },

  // ── Combo Tools (2) ─────────────────────────────────────────
  {
    slug: "password-strength-checker",
    name: "Password Strength Checker",
    description: "Generate strong passwords and check password strength with detailed analysis.",
    longDescription:
      "Two tools in one: generate secure random passwords with full control over length and character types, and check the strength of any password with real-time analysis. The strength meter evaluates length, character variety, and patterns to give a score with actionable improvement tips.",
    categorySlug: "developer-tools",
    icon: "🛡️",
    featured: true,
    keywords: ["password strength", "password checker", "secure password", "password analyzer", "password test"],
    metaTitle: "Password Strength Checker & Generator Online — Test & Create Strong Passwords",
    metaDescription: "Check password strength in real-time and generate secure random passwords. Free online password strength analyzer with detailed feedback."
  },
  {
    slug: "text-analyzer",
    name: "Text Analyzer",
    description: "Analyze text with word count, character count, case conversion, and reading stats.",
    longDescription:
      "All-in-one text analysis tool. Count words, characters (with and without spaces), sentences, paragraphs, and estimate reading time. Instantly convert between uppercase, lowercase, title case, sentence case, and camelCase. Perfect for writers and content creators who need formatting and stats in one place.",
    categorySlug: "text-tools",
    icon: "📊",
    featured: true,
    keywords: ["text analyzer", "word counter", "character counter", "case converter", "text statistics"],
    metaTitle: "Text Analyzer Online — Word Count, Character Count & Case Converter",
    metaDescription: "Analyze text with instant word count, character count, reading stats, and case conversion. All-in-one text analysis tool for writers."
  },

  // ── SEO Tools (8) ──────────────────────────────────────────
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate SEO meta tags including title, description, and Open Graph tags.",
    longDescription:
      "Create optimized meta tags for your web pages. Enter your title, description, keywords, and OG image URL to generate complete meta tag HTML. Preview how your page will appear in search results and social media shares. Copy the generated code with one click.",
    categorySlug: "seo-tools",
    icon: "🏷️",
    featured: true,
    keywords: ["meta tag generator", "seo meta tags", "meta description", "meta title", "og tags generator"],
    metaTitle: "Meta Tag Generator Online — Create SEO Meta Tags Free",
    metaDescription: "Generate optimized meta title, description, Open Graph, and Twitter Card tags for your web pages. Preview search result snippets and copy code instantly."
  },
  {
    slug: "keyword-density-checker",
    name: "Keyword Density Checker",
    description: "Analyze keyword frequency and density in any text content.",
    longDescription:
      "Paste your content and instantly see keyword frequency, density percentages, and ranking. The analyzer breaks down single words and phrases, showing how often each appears and what percentage of the total text it represents. Perfect for SEO content optimization.",
    categorySlug: "seo-tools",
    icon: "📈",
    featured: true,
    keywords: ["keyword density", "keyword frequency", "seo analysis", "content optimization", "keyword analyzer"],
    metaTitle: "Keyword Density Checker Online — Analyze Content SEO Free",
    metaDescription: "Check keyword frequency and density in any text. Free online SEO content analyzer to optimize your writing for search engines."
  },
  {
    slug: "sitemap-generator",
    name: "Sitemap Generator",
    description: "Generate XML sitemaps for your website from a list of URLs.",
    longDescription:
      "Create SEO-friendly XML sitemaps by entering your page URLs. Set priority, change frequency, and last modified dates for each URL. The generator produces valid sitemap XML that you can submit to Google Search Console and other search engines.",
    categorySlug: "seo-tools",
    icon: "🗺️",
    featured: true,
    keywords: ["sitemap generator", "xml sitemap", "seo sitemap", "sitemap creator", "google sitemap"],
    metaTitle: "Sitemap Generator Online — Create XML Sitemaps Free",
    metaDescription: "Generate XML sitemaps for your website. Add URLs with priority, change frequency, and last modified dates. Copy valid sitemap XML for Google Search Console."
  },
  {
    slug: "robots-txt-generator",
    name: "Robots.txt Generator",
    description: "Create robots.txt files to control search engine crawling.",
    longDescription:
      "Generate a robots.txt file for your website. Add rules to allow or disallow specific user agents (search engine bots) from crawling certain paths. Include sitemap URLs and set crawl delays. Perfect for SEO professionals managing search engine access.",
    categorySlug: "seo-tools",
    icon: "🤖",
    featured: true,
    keywords: ["robots.txt generator", "robots txt", "search engine crawling", "seo robots", "crawl rules"],
    metaTitle: "Robots.txt Generator Online — Create Robots.txt Files Free",
    metaDescription: "Generate robots.txt files to control search engine crawlers. Add allow/disallow rules, sitemap references, and crawl delays. Free online SEO tool."
  },
  {
    slug: "open-graph-preview-generator",
    name: "Open Graph Preview Generator",
    description: "Generate and preview Open Graph meta tags for social media sharing.",
    longDescription:
      "Create Open Graph (OG) meta tags that control how your page appears when shared on Facebook, X/Twitter, LinkedIn, and other platforms. Set title, description, image URL, and page type. See a live preview of how your link will look in social feeds.",
    categorySlug: "seo-tools",
    icon: "🔗",
    featured: false,
    keywords: ["open graph", "og tags", "social media preview", "facebook share", "twitter card"],
    metaTitle: "Open Graph Preview Generator Online — Create Social Share Tags",
    metaDescription: "Generate Open Graph meta tags and preview how your page looks when shared on social media. Free OG tag generator for Facebook, X/Twitter, and LinkedIn."
  },
  {
    slug: "seo-length-checker",
    name: "SEO Length Checker",
    description: "Check if your title tags and meta descriptions meet recommended length limits.",
    longDescription:
      "Paste your title and meta description to instantly check if they meet SEO best practice length limits. See the character count, pixel width estimate, and whether your snippet will be truncated in search results. Get recommendations for optimal lengths.",
    categorySlug: "seo-tools",
    icon: "📏",
    featured: false,
    keywords: ["seo length checker", "title tag length", "meta description length", "seo snippet", "search preview"],
    metaTitle: "SEO Length Checker Online — Check Title & Meta Description Length",
    metaDescription: "Check if your title tags and meta descriptions meet recommended SEO length limits. See pixel width, character count, and search result preview."
  },
  {
    slug: "canonical-tag-generator",
    name: "Canonical Tag Generator",
    description: "Generate canonical link tags to prevent duplicate content issues.",
    longDescription:
      "Create canonical URL tags for your web pages to tell search engines which version is the master copy. Enter your canonical URL and optional hreflang tags for multi-language sites. Copy the generated HTML link tag with one click.",
    categorySlug: "seo-tools",
    icon: "🔗",
    featured: false,
    keywords: ["canonical tag", "rel canonical", "duplicate content", "canonical url", "seo canonical"],
    metaTitle: "Canonical Tag Generator Online — Prevent Duplicate Content",
    metaDescription: "Generate canonical link tags to prevent duplicate content issues. Free online SEO tool for creating rel=canonical tags with hreflang support."
  },
  {
    slug: "alt-text-checker",
    name: "Alt Text Checker",
    description: "Analyze HTML content for missing or empty image alt attributes.",
    longDescription:
      "Paste your HTML code and instantly find all images that are missing alt text or have empty alt attributes. The checker scans img tags and reports which ones need accessibility improvements. Essential for WCAG compliance and SEO.",
    categorySlug: "seo-tools",
    icon: "👁️",
    featured: false,
    keywords: ["alt text checker", "image alt text", "accessibility checker", "wcag compliance", "html analyzer"],
    metaTitle: "Alt Text Checker Online — Find Missing Image Alt Attributes",
    metaDescription: "Check HTML content for missing or empty image alt attributes. Free accessibility checker for WCAG compliance and SEO optimization."
  },

  // ── Design Tools (1) ────────────────────────────────────────
  {
    slug: "color-contrast-checker",
    name: "Color Contrast Checker",
    description: "Check WCAG contrast ratios between foreground and background colors.",
    longDescription:
      "Enter two colors (foreground and background) to instantly check their contrast ratio against WCAG 2.1 guidelines. See if your color combination passes AA and AAA requirements for normal text, large text, and UI components. Adjust colors interactively to find accessible combinations.",
    categorySlug: "design-tools",
    icon: "👁️",
    featured: true,
    keywords: ["color contrast checker", "wcag contrast", "accessibility contrast", "contrast ratio", "aa aaa compliance"],
    metaTitle: "Color Contrast Checker Online — WCAG Accessibility Checker",
    metaDescription: "Check color contrast ratios for WCAG 2.1 AA and AAA compliance. Free accessibility checker for foreground and background color combinations."
  },

  // ── Converter Tools (5) ─────────────────────────────────────
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Convert between units of length, weight, temperature, speed, and more.",
    longDescription:
      "Convert values between different measurement units. Supports length (meters, feet, inches, kilometers, miles), weight (kg, lbs, ounces, tons), temperature (Celsius, Fahrenheit, Kelvin), speed (km/h, mph, knots), and volume (liters, gallons, cups). Fast, accurate conversions with a clean interface.",
    categorySlug: "converters",
    icon: "📐",
    featured: true,
    keywords: ["unit converter", "length converter", "weight converter", "temperature converter", "metric to imperial"],
    metaTitle: "Unit Converter Online — Length, Weight, Temperature & More",
    metaDescription: "Convert between units of length, weight, temperature, speed, and volume. Free online unit converter with multiple measurement categories."
  },
  {
    slug: "json-to-csv",
    name: "JSON to CSV",
    description: "Convert JSON arrays and objects to CSV spreadsheet format.",
    longDescription:
      "Paste a JSON array or object and convert it to clean CSV format. Supports nested objects (flattened with dot notation), custom delimiters, and header customization. Preview the tabular data before copying the CSV output. Perfect for data migration and analysis.",
    categorySlug: "converters",
    icon: "📊",
    featured: false,
    keywords: ["json to csv", "json to excel", "convert json to csv", "json parser", "data converter"],
    metaTitle: "JSON to CSV Converter Online — Convert JSON to Spreadsheet",
    metaDescription: "Convert JSON arrays and objects to CSV format instantly. Free online JSON to CSV converter with nested object support and table preview."
  },
  {
    slug: "yaml-to-json",
    name: "YAML to JSON",
    description: "Convert YAML configuration files to JSON format instantly.",
    longDescription:
      "Paste YAML content and convert it to clean JSON format. Supports complex nested YAML structures, arrays, and multi-line strings. Perfect for developers migrating configuration files between formats. Copy the result with one click.",
    categorySlug: "converters",
    icon: "⬅️",
    featured: false,
    keywords: ["yaml to json", "yaml converter", "yaml to json online", "config converter", "yaml parser"],
    metaTitle: "YAML to JSON Converter Online — Convert YAML to JSON Free",
    metaDescription: "Convert YAML configuration files and data to JSON format instantly. Free online YAML to JSON converter for developers."
  },
  {
    slug: "temperature-converter",
    name: "Temperature Converter",
    description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin.",
    longDescription:
      "Convert temperature values between Celsius, Fahrenheit, and Kelvin scales instantly. Enter a value in any unit and see the equivalent in all others. Perfect for cooking, science, travel, and weather comparisons.",
    categorySlug: "converters",
    icon: "🌡️",
    featured: false,
    keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter", "temp converter"],
    metaTitle: "Temperature Converter Online — Celsius, Fahrenheit, Kelvin",
    metaDescription: "Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly. Free online temperature converter for cooking, science, and travel."
  },
  {
    slug: "lbs-to-kg-converter",
    name: "Lbs to Kg Converter",
    description: "Convert pounds to kilograms and kilograms to pounds instantly.",
    longDescription:
      "Convert weight between pounds (lbs) and kilograms (kg) with instant bidirectional conversion. Enter a value in either unit and see the result in both. Perfect for fitness tracking, shipping, cooking, and travel.",
    categorySlug: "converters",
    icon: "⚖️",
    featured: false,
    keywords: ["lbs to kg", "pounds to kilograms", "weight converter", "kg to lbs", "pound converter"],
    metaTitle: "Lbs to Kg Converter Online — Pounds to Kilograms Converter",
    metaDescription: "Convert pounds to kilograms and kilograms to pounds instantly. Free online weight converter for fitness, shipping, and everyday use."
  },

  // ── Calculators (3) ─────────────────────────────────────────
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate monthly payments, total interest, and amortization for any loan.",
    longDescription:
      "Enter loan amount, interest rate, and term to calculate monthly payments, total interest payable, and total cost. View a detailed amortization schedule showing the breakdown of principal vs interest for each payment. Perfect for mortgage, auto, and personal loan planning.",
    categorySlug: "calculators",
    icon: "🏦",
    featured: true,
    keywords: ["loan calculator", "monthly payment calculator", "amortization calculator", "mortgage calculator", "interest calculator"],
    metaTitle: "Loan Calculator Online — Monthly Payment & Amortization Schedule",
    metaDescription: "Calculate monthly loan payments, total interest, and view a full amortization schedule. Free online loan calculator for mortgages, auto loans, and personal loans."
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate sale prices, savings, and discount percentages instantly.",
    longDescription:
      "Calculate the final price after a discount. Enter the original price and discount percentage to see how much you save and the final price. Also calculate the discount percentage when you know the original and sale price. Perfect for shopping and budgeting.",
    categorySlug: "calculators",
    icon: "🏷️",
    featured: false,
    keywords: ["discount calculator", "sale price calculator", "percent off", "savings calculator", "shopping calculator"],
    metaTitle: "Discount Calculator Online — Calculate Sale Prices & Savings",
    metaDescription: "Calculate sale prices, discount amounts, and savings percentages instantly. Free online discount calculator for shopping and budgeting."
  },
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    description: "Estimate monthly mortgage payments with taxes, insurance, and PMI.",
    longDescription:
      "Calculate your monthly mortgage payment including principal, interest, property taxes, homeowners insurance, and PMI. Enter home price, down payment, interest rate, and loan term to get a complete monthly payment breakdown. Perfect for home buying planning.",
    categorySlug: "calculators",
    icon: "🏠",
    featured: false,
    keywords: ["mortgage calculator", "home loan calculator", "monthly payment", "mortgage estimator", "home buying"],
    metaTitle: "Mortgage Calculator Online — Estimate Monthly Payments Free",
    metaDescription: "Estimate monthly mortgage payments including principal, interest, taxes, insurance, and PMI. Free online mortgage calculator for home buyers."
  },

  // ── Developer Tools (3) ─────────────────────────────────────
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    description: "Minify and compress CSS code to reduce file size for production.",
    longDescription:
      "Paste your CSS code and compress it by removing whitespace, comments, and redundant properties. See the original vs minified size with compression ratio. Copy the minified output with one click. Essential for optimizing website performance.",
    categorySlug: "developer-tools",
    icon: "🎨",
    featured: false,
    keywords: ["css minifier", "compress css", "css optimizer", "minify css online", "css compressor"],
    metaTitle: "CSS Minifier Online — Compress and Minify CSS Code Free",
    metaDescription: "Minify CSS code by removing whitespace and comments. See compression ratio and copy minified output. Free online CSS minifier for web developers."
  },
  {
    slug: "html-entity-converter",
    name: "HTML Entity Converter",
    description: "Encode and decode HTML entities like &amp; &lt; &gt; and special characters.",
    longDescription:
      "Convert special characters to their HTML entity equivalents and vice versa. Encode text for safe HTML display (e.g., < → &lt;) or decode entities back to readable characters. Perfect for preparing content for web pages and email templates.",
    categorySlug: "developer-tools",
    icon: "🔣",
    featured: false,
    keywords: ["html entities", "html entity encode", "html entity decode", "special characters", "escape html"],
    metaTitle: "HTML Entity Converter Online — Encode & Decode HTML Entities",
    metaDescription: "Convert special characters to HTML entities and decode them back. Free online HTML entity encoder/decoder for web developers."
  },
  {
    slug: "binary-converter",
    name: "Binary Converter",
    description: "Convert numbers between binary, decimal, hexadecimal, and octal.",
    longDescription:
      "Convert numbers between binary (base-2), decimal (base-10), hexadecimal (base-16), and octal (base-8) formats. Enter a value in any base and see the equivalent in all others instantly. Perfect for programmers, students, and digital electronics enthusiasts.",
    categorySlug: "developer-tools",
    icon: "💻",
    featured: false,
    keywords: ["binary converter", "decimal to binary", "hex to decimal", "number base converter", "binary to hex"],
    metaTitle: "Binary Converter Online — Decimal, Hex, Octal Converter",
    metaDescription: "Convert numbers between binary, decimal, hexadecimal, and octal formats instantly. Free online number base converter for developers and students."
  },

  // ── Text Tools (4) ──────────────────────────────────────────
  {
    slug: "text-humanizer",
    name: "Text Humanizer",
    description: "Rewrite AI-generated text to sound more natural and human-like.",
    longDescription:
      "Paste AI-generated text and humanize it by adjusting vocabulary, sentence structure, and tone. The tool replaces overused AI phrases, varies sentence length, adds transitional phrases, and removes repetitive patterns. Choose from formal, casual, or professional tone. Make your AI content sound authentically human.",
    categorySlug: "text-tools",
    icon: "✍️",
    featured: true,
    keywords: ["text humanizer", "ai text humanizer", "humanize ai text", "rewrite text", "ai content humanizer"],
    metaTitle: "Text Humanizer Online — Make AI Text Sound Human Free",
    metaDescription: "Rewrite AI-generated text to sound natural and human-like. Free online text humanizer with tone selection. Make your content sound authentically human."
  },
  {
    slug: "grammar-checker",
    name: "Grammar Checker",
    description: "Check text for common grammar issues, punctuation, and spelling errors.",
    longDescription:
      "Paste your text and check for common grammar mistakes, punctuation errors, capitalization issues, and repeated words. The checker highlights potential issues and suggests corrections. Perfect for writers, students, and professionals who want clean, error-free content.",
    categorySlug: "text-tools",
    icon: "✓",
    featured: true,
    keywords: ["grammar checker", "spell check", "grammar fix", "writing assistant", "proofreading tool"],
    metaTitle: "Grammar Checker Online — Check Grammar & Spelling Free",
    metaDescription: "Check text for grammar mistakes, punctuation errors, and spelling issues. Free online grammar checker for clean, error-free writing."
  },
  {
    slug: "palindrome-checker",
    name: "Palindrome Checker",
    description: "Check if a word, phrase, or number reads the same forward and backward.",
    longDescription:
      "Enter any text to check if it's a palindrome — reading the same forwards and backwards (ignoring spaces, punctuation, and capitalization). See the reversed version, character-by-character comparison, and a clear pass/fail result. Fun for wordplay enthusiasts and programming practice.",
    categorySlug: "text-tools",
    icon: "🔄",
    featured: false,
    keywords: ["palindrome checker", "palindrome test", "word palindrome", "reverse text", "symmetrical text"],
    metaTitle: "Palindrome Checker Online — Test Words & Phrases Free",
    metaDescription: "Check if any word, phrase, or number is a palindrome. Free online palindrome checker with character-by-character comparison."
  },
  {
    slug: "reverse-text",
    name: "Reverse Text",
    description: "Reverse text, words, or individual characters in your text.",
    longDescription:
      "Reverse any text in multiple ways: reverse the entire string character by character, reverse the word order while keeping characters intact, or reverse both. Perfect for creating puzzles, testing, and text manipulation experiments.",
    categorySlug: "text-tools",
    icon: "↩️",
    featured: false,
    keywords: ["reverse text", "text reverser", "reverse string", "backwards text", "text flipper"],
    metaTitle: "Reverse Text Online — Reverse String, Words & Characters Free",
    metaDescription: "Reverse text by characters, words, or both. Free online text reverser for creating puzzles and text manipulation."
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
    "62 free online tools for text, code, math, and more. No uploads, no signups — everything runs in your browser, 100% private.",
  tagline: "Free tools for text, code, and math.",
};

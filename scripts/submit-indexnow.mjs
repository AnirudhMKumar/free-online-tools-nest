const host = "freeonlinetoolsnest.com";
const key = process.env.INDEXNOW_KEY || "freeonlinetoolsnest-20260706";
const keyLocation = `https://${host}/${key}.txt`;

const localizedSlugs = [
  "image-compressor",
  "json-formatter",
  "pdf-compressor",
  "pdf-merger",
  "word-counter",
  "qr-code-generator",
  "jwt-decoder",
  "epoch-converter",
  "word-cloud-generator",
  "grammar-checker",
  "csv-to-json",
  "json-to-csv",
  "unit-converter",
  "color-contrast-checker",
  "character-counter",
  "image-resizer",
  "image-cropper",
  "markdown-to-html",
  "password-generator",
  "regex-tester",
];

const categories = [
  "text-tools",
  "developer-tools",
  "calculators",
  "converters",
  "pdf-tools",
  "seo-tools",
  "design-tools",
];

const staticPages = ["about", "contact", "faq", "privacy-policy", "terms-and-conditions"];
const baseUrls = [
  "https://freeonlinetoolsnest.com/",
  "https://freeonlinetoolsnest.com/tools/",
  "https://freeonlinetoolsnest.com/categories/",
  ...categories.map((slug) => `https://freeonlinetoolsnest.com/categories/${slug}/`),
  ...localizedSlugs.map((slug) => `https://freeonlinetoolsnest.com/tools/${slug}/`),
];

const localizedUrls = ["es", "hi"].flatMap((locale) => [
  `https://freeonlinetoolsnest.com/${locale}/`,
  `https://freeonlinetoolsnest.com/${locale}/tools/`,
  `https://freeonlinetoolsnest.com/${locale}/categories/`,
  ...staticPages.map((page) => `https://freeonlinetoolsnest.com/${locale}/${page}/`),
  ...categories.map((slug) => `https://freeonlinetoolsnest.com/${locale}/categories/${slug}/`),
  ...localizedSlugs.map((slug) => `https://freeonlinetoolsnest.com/${locale}/tools/${slug}/`),
]);

const urlList = [...new Set([...baseUrls, ...localizedUrls])];

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (![200, 202].includes(response.status)) {
  const body = await response.text().catch(() => "");
  throw new Error(`IndexNow submission failed: ${response.status} ${response.statusText}\n${body}`);
}

process.stdout.write(`Submitted ${urlList.length} URLs to IndexNow (${response.status}).\n`);


const TOOLS = [
  { slug: "word-counter", name: "Word Counter", icon: "📝", cat: "text-tools" },
  { slug: "character-counter", name: "Character Counter", icon: "🔤", cat: "text-tools" },
  { slug: "case-converter", name: "Case Converter", icon: "🔠", cat: "text-tools" },
  { slug: "lorem-ipsum-generator", name: "Lorem Ipsum", icon: "📄", cat: "text-tools" },
  { slug: "text-diff", name: "Text Diff Checker", icon: "📊", cat: "text-tools" },
  { slug: "slug-generator", name: "Slug Generator", icon: "🔗", cat: "text-tools" },
  { slug: "text-summarizer", name: "Text Summarizer", icon: "📋", cat: "text-tools" },
  { slug: "json-formatter", name: "JSON Formatter", icon: "{ }", cat: "developer-tools" },
  { slug: "html-formatter", name: "HTML Formatter", icon: "🌐", cat: "developer-tools" },
  { slug: "regex-tester", name: "Regex Tester", icon: "🧪", cat: "developer-tools" },
  { slug: "url-encoder-decoder", name: "URL Encode/Decode", icon: "🔗", cat: "developer-tools" },
  { slug: "base64-encoder-decoder", name: "Base64 Encode/Decode", icon: "🔐", cat: "developer-tools" },
  { slug: "password-generator", name: "Password Generator", icon: "🔑", cat: "developer-tools" },
  { slug: "hash-generator", name: "Hash Generator", icon: "#", cat: "developer-tools" },
  { slug: "uuid-generator", name: "UUID Generator", icon: "🔢", cat: "developer-tools" },
  { slug: "percentage-calculator", name: "Percentage Calculator", icon: "%", cat: "calculators" },
  { slug: "age-calculator", name: "Age Calculator", icon: "🎂", cat: "calculators" },
  { slug: "bmi-calculator", name: "BMI Calculator", icon: "⚕️", cat: "calculators" },
  { slug: "tip-calculator", name: "Tip Calculator", icon: "💵", cat: "calculators" },
  { slug: "date-difference-calculator", name: "Date Difference", icon: "📅", cat: "calculators" },
  { slug: "number-to-words", name: "Number to Words", icon: "🔢", cat: "calculators" },
  { slug: "qr-code-generator", name: "QR Code Generator", icon: "📱", cat: "converters" },
  { slug: "color-converter", name: "Color Converter", icon: "🎨", cat: "converters" },
  { slug: "markdown-to-html", name: "Markdown to HTML", icon: "⬇️", cat: "converters" },
  { slug: "csv-to-json", name: "CSV to JSON", icon: "📊", cat: "converters" },
  { slug: "image-compressor", name: "Image Compressor", icon: "🖼️", cat: "converters" },
  { slug: "image-cropper", name: "Image Cropper", icon: "✂️", cat: "converters" },
  { slug: "image-resizer", name: "Image Resizer", icon: "📏", cat: "converters" },
  { slug: "image-format-converter", name: "Format Converter", icon: "🔄", cat: "converters" },
  { slug: "image-filter", name: "Image Filter", icon: "🎨", cat: "converters" },
  { slug: "image-to-base64", name: "Image to Base64", icon: "🔣", cat: "converters" },
  { slug: "pdf-merger", name: "PDF Merger", icon: "📑", cat: "pdf-tools" },
  { slug: "pdf-splitter", name: "PDF Splitter", icon: "✂️", cat: "pdf-tools" },
  { slug: "pdf-compressor", name: "PDF Compressor", icon: "🗜️", cat: "pdf-tools" },
  { slug: "pdf-to-text", name: "PDF to Text", icon: "📝", cat: "pdf-tools" },
  { slug: "pdf-to-images", name: "PDF to Images", icon: "🖼️", cat: "pdf-tools" },
];

const CATEGORIES = [
  { slug: "all", name: "All" },
  { slug: "text-tools", name: "Text" },
  { slug: "developer-tools", name: "Developer" },
  { slug: "calculators", name: "Calculators" },
  { slug: "converters", name: "Converters" },
  { slug: "pdf-tools", name: "PDF" },
];

let activeCat = "all";
let searchQuery = "";

function render() {
  const list = document.getElementById("tools-list");
  const noResults = document.getElementById("no-results");
  const q = searchQuery.toLowerCase().trim();

  const filtered = TOOLS.filter((t) => {
    const matchCat = activeCat === "all" || t.cat === activeCat;
    const matchSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.slug.includes(q);
    return matchCat && matchSearch;
  });

  if (!list) return;

  if (filtered.length === 0) {
    list.innerHTML = "";
    if (noResults) noResults.style.display = "";
    return;
  }

  if (noResults) noResults.style.display = "none";

  list.innerHTML = filtered
    .map(
      (t) =>
        `<a href="https://freeonlinetoolsnest.com/tools/${t.slug}/" target="_blank" rel="noopener noreferrer" class="tool-item">
          <span class="tool-icon">${t.icon}</span>
          <div>
            <div class="tool-name">${t.name}</div>
            <div class="tool-desc">${t.cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</div>
          </div>
        </a>`
    )
    .join("");
}

function initCategories() {
  const container = document.getElementById("categories");
  if (!container) return;
  container.innerHTML = CATEGORIES.map(
    (c) =>
      `<button data-cat="${c.slug}" class="${c.slug === "all" ? "active" : ""}">${c.name}</button>`
  ).join("");
  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCat = btn.dataset.cat || "all";
      render();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCategories();
  render();

  const search = document.getElementById("search");
  search?.addEventListener("input", (e) => {
    searchQuery = (e.target).value;
    render();
  });
});

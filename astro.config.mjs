// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const path = url.pathname;

        // Always include structural pages
        if (
          path === "/" ||
          path === "/tools/" ||
          path === "/categories/" ||
          path === "/blog/" ||
          path === "/about/"
        )
          return true;

        // All 7 category pages
        if (/^\/categories\/[\w-]+\/$/.test(path)) return true;

        // All 3 blog posts
        if (/^\/blog\/[\w-]+\/$/.test(path)) return true;

        // Content-rich tool pages (those with additionalContent sections)
        const contentRichSlugs = [
          "word-counter",
          "json-formatter",
          "qr-code-generator",
          "color-converter",
          "image-compressor",
          "pdf-merger",
          "pdf-compressor",
          "grammar-checker",
          "word-cloud-generator",
          "jwt-decoder",
          "epoch-converter",
        ];

        // Popular high-traffic-potential tools
        const popularSlugs = [
          "character-counter",
          "unit-converter",
          "csv-to-json",
          "password-generator",
        ];

        const toolSlug = path.match(/^\/tools\/([\w-]+)\/$/)?.[1];
        if (toolSlug && (contentRichSlugs.includes(toolSlug) || popularSlugs.includes(toolSlug)))
          return true;

        return false;
      },
    }),
  ],
  site: "https://freeonlinetoolsnest.com",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  vite: {
    esbuild: {
      jsxDev: false,
    },
    plugins: [tailwindcss()],
  },
  server: {
    host: true,
  },
});
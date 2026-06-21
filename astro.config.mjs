// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [react(), sitemap({
    lastmod: new Date(),
    filter: (page) => {
      const excludePaths = [
        'https://freeonlinetoolsnest.com/',
        'https://freeonlinetoolsnest.com/about/',
        'https://freeonlinetoolsnest.com/contact/',
        'https://freeonlinetoolsnest.com/faq/',
        'https://freeonlinetoolsnest.com/privacy-policy/',
        'https://freeonlinetoolsnest.com/terms-and-conditions/',
        'https://freeonlinetoolsnest.com/favorites/',
      ];
      return !excludePaths.includes(page);
    },
  })],
  site: "https://freeonlinetoolsnest.com",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "pt", "fr", "de", "hi", "ja", "ar"],
    routing: {
      prefixDefaultLocale: true,
    },
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
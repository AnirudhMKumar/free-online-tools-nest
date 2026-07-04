// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [react(), sitemap()],
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
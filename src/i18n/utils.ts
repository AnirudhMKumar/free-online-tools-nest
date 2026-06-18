/**
 * i18n Utilities — helpers that bridge translation strings with Astro pages.
 *
 * - getLangFromUrl(): extract the current locale from the URL
 * - useTranslations(): returns a t(key) function for string lookups
 * - getLocalePath(): computes a URL path for a target locale
 */

import { ui, defaultLang, type Lang, languages } from "./ui";

/**
 * Extract the current language from the URL pathname.
 * Works on both server (Astro.url) and client (window.location).
 *
 * Examples:
 *   /es/tools/case-converter/  → "es"
 *   /about                     → "en" (default)
 *   /                          → "en" (default)
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in languages) return lang as Lang;
  return defaultLang;
}

/**
 * Create a `t(key)` translation function for a given locale.
 *
 * Usage: `const t = useTranslations(lang);` then `t("nav.tools")`
 *
 * Falls back to the key name if the key is missing, so it's safe to
 * reference translation keys that haven't been added yet.
 */
export function useTranslations(lang: Lang) {
  return (key: string): string => {
    const dict = ui[lang] as Record<string, string> | undefined;
    return dict?.[key] ?? key;
  };
}

/**
 * Compute the URL path for a target locale from the current pathname.
 *
 * - English (default) removes the prefix: /es/about → /about
 * - Other locales replace or add the prefix: /about → /es/about
 *
 * Use this in the language switcher to build the target href.
 */
export function getLocalePath(
  pathname: string,
  targetLang: Lang,
  currentLang: Lang,
): string {
  // Strip trailing slash for easier manipulation, we'll re-add it
  const clean = pathname.replace(/\/$/, "");

  if (currentLang === defaultLang) {
    // Currently on English (no prefix) → prepend target unless also English
    if (targetLang === defaultLang) return pathname;
    return `/${targetLang}${clean}`;
  }

  // Currently on a prefixed locale
  const prefix = `/${currentLang}`;
  if (targetLang === defaultLang) {
    // Going to English → remove current prefix
    const rest = clean.startsWith(prefix) ? clean.slice(prefix.length) : clean;
    return rest || "/";
  }

  // Going from one non-English locale to another
  return clean.replace(prefix, `/${targetLang}`);
}

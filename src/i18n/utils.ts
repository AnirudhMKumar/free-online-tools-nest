/**
 * i18n Utilities — helpers that bridge translation strings with Astro pages.
 */

import { ui, defaultLang, type Lang, languages } from "./ui";

/**
 * Extract the current language from the URL pathname.
 * Now always returns "en" since we're English-only.
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

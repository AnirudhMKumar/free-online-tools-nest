/**
 * i18n Utilities — helpers that bridge translation strings with Astro pages.
 */

import { ui, defaultLang, type Lang, languages } from "./ui";
import { uiOverrides } from "./overrides";

export const enabledLocaleCodes = Object.keys(languages) as Lang[];
export const localizedLangs = enabledLocaleCodes.filter((lang) => lang !== defaultLang);

export function isLang(value: string | undefined): value is Lang {
  return Boolean(value && value in languages);
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (isLang(lang)) return lang;
  return defaultLang;
}

export function getLocalePrefix(lang: Lang): string {
  return lang === defaultLang ? "" : `/${lang}`;
}

export function localizePath(path: string, lang: Lang): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getLocalePrefix(lang)}${normalized}`;
}

export function getLocalizedUrlPath(lang: Lang, canonicalPath: string): string {
  return localizePath(canonicalPath, lang);
}

export function getDefaultAlternates(canonicalPath: string, langs: Lang[] = enabledLocaleCodes): Record<string, string> {
  const alternates: Record<string, string> = {};
  langs.forEach((lang) => {
    alternates[lang] = getLocalizedUrlPath(lang, canonicalPath);
  });
  alternates["x-default"] = canonicalPath;
  return alternates;
}

export function useTranslations(lang: Lang) {
  return (key: string): string => {
    const base = ui[defaultLang] as Record<string, string>;
    const own = (ui as Partial<Record<Lang, Record<string, string>>>)[lang];
    const overrides = uiOverrides[lang];
    return overrides?.[key] ?? own?.[key] ?? base[key] ?? key;
  };
}

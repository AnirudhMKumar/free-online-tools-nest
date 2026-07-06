import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { TOOLS, CATEGORIES } from "../data/tools";
import { getLocalizedCategories, getLocalizedTools } from "../data/localized";
import { defaultLang, type Lang } from "../i18n/ui";
import { useTranslations } from "../i18n/utils";

interface SearchResult {
  type: "tool" | "category";
  slug: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

interface Props {
  lang?: Lang;
}

function buildResults(lang: Lang): SearchResult[] {
  const prefix = lang === defaultLang ? "" : `/${lang}`;
  const tools = lang === defaultLang ? TOOLS : getLocalizedTools(lang);
  const categories = lang === defaultLang ? CATEGORIES : getLocalizedCategories(lang);

  return [
    ...tools.map((tool) => ({
      type: "tool" as const,
      slug: tool.slug,
      name: tool.name,
      description: tool.description,
      icon: tool.icon,
      url: `${prefix}/tools/${tool.slug}/`,
    })),
    ...categories.map((category) => ({
      type: "category" as const,
      slug: category.slug,
      name: category.name,
      description: category.description,
      icon: category.icon,
      url: `${prefix}/categories/${category.slug}/`,
    })),
  ];
}

export default function CmdKSearch({ lang = defaultLang }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const t = useTranslations(lang);
  const allResults = useMemo(() => buildResults(lang), [lang]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    function openHandler() {
      setOpen(true);
    }
    document.addEventListener("keydown", handler);
    document.addEventListener("open-cmdk", openHandler);
    return () => {
      document.removeEventListener("keydown", handler);
      document.removeEventListener("open-cmdk", openHandler);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const q = query.toLowerCase().trim();
  const matches = q
    ? allResults.filter(
        (result) =>
          result.name.toLowerCase().includes(q) ||
          result.description.toLowerCase().includes(q)
      ).slice(0, 10)
    : allResults.slice(0, 10);

  const navigate = useCallback((url: string) => {
    setOpen(false);
    window.location.href = url;
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && matches[selectedIndex]) {
      e.preventDefault();
      navigate(matches[selectedIndex].url);
    }
  }

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm">
      <div
        ref={overlayRef}
        className="w-full max-w-lg mx-4 bg-canvas rounded-xl shadow-modal border border-hairline overflow-hidden animate-[fade-in-up_150ms_ease-out]"
        role="dialog"
        aria-modal="true"
        aria-label={t("cmdk.searchTools")}
      >
        <div className="relative border-b border-hairline">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-mute pointer-events-none"
            width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder={t("cmdk.placeholder")}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={onKeyDown}
            className="w-full h-12 pl-12 pr-10 bg-transparent text-base text-ink placeholder:text-mute outline-none"
            aria-label={t("cmdk.searchTools")}
            autoComplete="off"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-mono text-mute bg-canvas-soft-2 px-1.5 py-0.5 rounded border border-hairline">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-80 overflow-y-auto p-2" role="listbox">
          {matches.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-mute">
              {t("cmdk.noResults").replace("{query}", query)}
            </div>
          ) : (
            matches.map((result, i) => (
              <button
                key={`${result.type}-${result.slug}`}
                role="option"
                aria-selected={i === selectedIndex}
                onClick={() => navigate(result.url)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors duration-75 cursor-pointer ${
                  i === selectedIndex
                    ? "bg-canvas-soft-2"
                    : "hover:bg-canvas-soft-2"
                }`}
              >
                <span className="text-lg shrink-0" aria-hidden="true">{result.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-ink">{result.name}</div>
                  <div className="text-xs text-mute truncate">{result.description}</div>
                </div>
                <span className="text-[10px] font-mono uppercase text-mute shrink-0 px-1.5 py-0.5 rounded bg-canvas-soft border border-hairline">
                  {result.type === "category" ? t("cmdk.category") : t("cmdk.tool")}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

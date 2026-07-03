import { useState, useEffect } from "react";

interface ToolData {
  slug: string;
  name: string;
  description: string;
  icon: string;
  categorySlug: string;
}

interface Props {
  data: string;
}

const STORAGE_KEY = "fotn-favorites";

function loadSlugs(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function formatCat(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/w/g, (l) => l.toUpperCase());
}

export default function FavoritesPage({ data }: Props) {
  const [allTools] = useState<ToolData[]>(() => {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  });
  const [favSlugs, setFavSlugs] = useState<string[]>([]);

  useEffect(() => {
    setFavSlugs(loadSlugs());
  }, []);

  const favorites = allTools.filter((t) => favSlugs.includes(t.slug));

  if (favorites.length === 0) {
    return (
      <div className="app-panel mx-auto max-w-xl px-6 py-12 text-center">
        <p className="text-4xl mb-4" aria-hidden="true">💔</p>
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--color-ink)" }}>
          No favorites yet
        </h2>
        <p className="text-body max-w-md mx-auto">
          Click the <strong>Save</strong> button on any tool page to bookmark it here for quick access.
        </p>
        <a href="/tools/" className="btn-primary btn-sm mt-6 inline-flex" style={{ textDecoration: "none" }}>
          Browse all tools
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((tool) => (
        <a key={tool.slug} href={`/tools/${tool.slug}/`} className="tool-card group">
          <span className="tool-card-icon" aria-hidden="true">{tool.icon}</span>
          <span className="tool-card-body">
            <span className="tool-card-title-row">
              <span className="tool-card-title">{tool.name}</span>
              <svg className="tool-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
            <span className="tool-card-description">{tool.description}</span>
            <span className="metadata-badge mt-auto w-fit">{formatCat(tool.categorySlug)}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

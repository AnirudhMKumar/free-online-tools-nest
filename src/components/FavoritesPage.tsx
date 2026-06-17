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
    .replace(/\b\w/g, (l) => l.toUpperCase());
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
      <div className="text-center py-16">
        <p className="text-4xl mb-4" aria-hidden="true">💔</p>
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--color-ink)" }}>
          No favorites yet
        </h2>
        <p className="text-body max-w-md mx-auto">
          Click the <strong>Save</strong> button on any tool page to bookmark it here for quick access.
        </p>
        <a
          href="/tools/"
          className="btn-primary btn-sm mt-6 inline-block"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", textDecoration: "none" }}
        >
          Browse all tools
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((tool) => (
        <a
          key={tool.slug}
          href={`/tools/${tool.slug}/`}
          className="block card p-4 sm:p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 no-underline group"
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">
              {tool.icon}
            </span>
            <div className="min-w-0">
              <h3
                className="text-base font-medium group-hover:text-link transition-colors duration-150"
                style={{ color: "var(--color-ink)", letterSpacing: "-0.28px" }}
              >
                {tool.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed line-clamp-2" style={{ color: "var(--color-body)" }}>
                {tool.description}
              </p>
              <span
                className="inline-block mt-3 text-xs px-2 py-0.5 rounded-full"
                style={{ color: "var(--color-mute)", backgroundColor: "var(--color-canvas-soft-2)" }}
              >
                {formatCat(tool.categorySlug)}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

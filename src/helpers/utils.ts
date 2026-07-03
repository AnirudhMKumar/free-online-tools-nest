/**
 * Shared utility functions for tool components.
 */

export const MAX_IMAGE_FILE_SIZE_BYTES = 15 * 1024 * 1024;
export const MAX_PDF_FILE_SIZE_BYTES = 50 * 1024 * 1024;
export const MAX_PDF_PAGE_COUNT = 150;
export const MAX_PDF_IMAGE_PAGE_COUNT = 50;

/**
 * Format bytes into a human-readable string.
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const unitIndex = Math.min(i, sizes.length - 1);
  return parseFloat((bytes / Math.pow(k, unitIndex)).toFixed(2)) + " " + sizes[unitIndex];
}

/**
 * Escape HTML entities to prevent XSS in HTML text and attribute contexts.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Remove active content from generated HTML before preview rendering.
 * This intentionally keeps common Markdown output tags while stripping scriptable sinks.
 */
export function sanitizeHtml(html: string): string {
  const blockedTags =
    "script|style|iframe|object|embed|form|input|button|textarea|select|option|meta|link|base|svg|math";

  return html
    .replace(new RegExp(`<\\s*(${blockedTags})\\b[^>]*>[\\s\\S]*?<\\s*\\/\\s*\\1\\s*>`, "gi"), "")
    .replace(new RegExp(`<\\s*\\/?\\s*(?:${blockedTags})\\b[^>]*>`, "gi"), "")
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s+(?:srcdoc|style)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s+(?:href|src|xlink:href|formaction)\s*=\s*"\s*(?:javascript:|vbscript:|data:text\/html)[^"]*"/gi, "")
    .replace(/\s+(?:href|src|xlink:href|formaction)\s*=\s*'\s*(?:javascript:|vbscript:|data:text\/html)[^']*'/gi, "")
    .replace(/\s+(?:href|src|xlink:href|formaction)\s*=\s*(?:javascript:|vbscript:|data:text\/html)[^\s>]*/gi, "");
}

export function createSearchResultStatusText(query: string): string {
  return `Search results for "${query}"`;
}

export function fileSizeLimitMessage(file: File, maxBytes: number, label: string): string | null {
  if (file.size <= maxBytes) return null;
  return `${label} is too large for safe in-browser processing. ${file.name} is ${formatBytes(file.size)}; the limit is ${formatBytes(maxBytes)}.`;
}

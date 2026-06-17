import { useState, useCallback } from "react";

/**
 * Shared hook for copying text to clipboard with feedback state.
 * Returns [copied, handleCopy] — copied resets to false after 2 seconds.
 */
export function useCopyToClipboard(): [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may fail in some contexts (e.g., HTTP pages)
      setCopied(false);
    }
  }, []);

  return [copied, handleCopy];
}

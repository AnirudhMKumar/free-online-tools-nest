/**
 * ErrorBanner — single responsibility error alert display.
 */

interface ErrorBannerProps {
  message: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <div
      className="px-4 py-3 rounded-lg text-sm"
      style={{ backgroundColor: "var(--color-error)", color: "#fff" }}
      role="alert"
    >
      {message}
    </div>
  );
}

import { describe, it, expect } from "vitest";
import { createSearchResultStatusText, escapeHtml, formatBytes, sanitizeHtml } from "./utils";

describe("formatBytes", () => {
  it("should format zero bytes correctly", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
  });

  it("should format bytes correctly", () => {
    expect(formatBytes(500)).toBe("500 Bytes");
  });

  it("should format kilobytes correctly", () => {
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1500)).toBe("1.46 KB");
  });

  it("should format megabytes correctly", () => {
    expect(formatBytes(1024 * 1024)).toBe("1 MB");
    expect(formatBytes(1024 * 1024 * 2.5)).toBe("2.5 MB");
  });

  it("should format gigabytes correctly", () => {
    expect(formatBytes(1024 * 1024 * 1024)).toBe("1 GB");
  });
});

describe("escapeHtml", () => {
  it("should escape basic HTML tags", () => {
    expect(escapeHtml("<div>")).toBe("&lt;div&gt;");
    expect(escapeHtml("<span>hello</span>")).toBe("&lt;span&gt;hello&lt;/span&gt;");
  });

  it("should escape ampersands", () => {
    expect(escapeHtml("a & b")).toBe("a &amp; b");
  });

  it("should pass normal strings unchanged", () => {
    expect(escapeHtml("hello world 123")).toBe("hello world 123");
  });

  it("should escape quotes for attribute contexts", () => {
    expect(escapeHtml(`"quoted" 'value'`)).toBe("&quot;quoted&quot; &#39;value&#39;");
  });
});

describe("sanitizeHtml", () => {
  it("should remove active tags and event handlers", () => {
    const dirty = `<h1 onclick="alert(1)">Hi</h1><script>alert(1)</script><img src="x" onerror="alert(1)">`;
    expect(sanitizeHtml(dirty)).toBe(`<h1>Hi</h1><img src="x">`);
  });

  it("should remove unsafe URL protocols", () => {
    expect(sanitizeHtml(`<a href="javascript:alert(1)">bad</a>`)).toBe(`<a>bad</a>`);
    expect(sanitizeHtml(`<img src='data:text/html,<svg onload=alert(1)>'>`)).toBe(`<img>`);
  });
});

describe("createSearchResultStatusText", () => {
  it("should keep user text as text, not HTML markup", () => {
    const query = `<img src=x onerror=alert(1)>`;
    expect(createSearchResultStatusText(query)).toBe(`Search results for "${query}"`);
  });
});

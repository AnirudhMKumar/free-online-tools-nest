import { describe, it, expect } from "vitest";
import { formatBytes, escapeHtml } from "./utils";

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
});

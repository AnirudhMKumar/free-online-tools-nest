import { useState, useCallback } from "react";

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState("2");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatHtmlString = useCallback((htmlStr: string, indentVal: string) => {
    if (!htmlStr.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      const indentChar = indentVal === "tab" ? "\t" : " ".repeat(parseInt(indentVal, 10));
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlStr, "text/html");

      // Check parser errors
      const parserError = doc.querySelector("parsererror");
      if (parserError) {
        throw new Error("Invalid HTML syntax or parser error.");
      }

      const selfClosing = [
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"
      ];

      const formatNode = (node: Node, depth: number): string => {
        const indent = indentChar.repeat(depth);

        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;
          const tagName = el.tagName.toLowerCase();

          // Build attributes
          let attrs = "";
          for (let i = 0; i < el.attributes.length; i++) {
            const attr = el.attributes[i];
            attrs += ` ${attr.name}="${attr.value}"`;
          }

          if (selfClosing.includes(tagName)) {
            return `${indent}<${tagName}${attrs}>\n`;
          }

          const children = Array.from(node.childNodes);
          const hasElements = children.some(c => c.nodeType === Node.ELEMENT_NODE);

          if (hasElements) {
            let inner = "";
            children.forEach(child => {
              inner += formatNode(child, depth + 1);
            });
            return `${indent}<${tagName}${attrs}>\n${inner}${indent}</${tagName}>\n`;
          } else {
            const textContent = el.textContent?.trim() || "";
            if (textContent) {
              return `${indent}<${tagName}${attrs}>${textContent}</${tagName}>\n`;
            } else {
              return `${indent}<${tagName}${attrs}></${tagName}>\n`;
            }
          }
        } else if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim() || "";
          return text ? `${indent}${text}\n` : "";
        } else if (node.nodeType === Node.COMMENT_NODE) {
          const comment = node.textContent?.trim() || "";
          return `${indent}<!-- ${comment} -->\n`;
        }
        return "";
      };

      let formatted = "";
      const isFullDoc = /<html/i.test(htmlStr) || /<body/i.test(htmlStr) || /<head/i.test(htmlStr);

      if (isFullDoc) {
        formatted = formatNode(doc.documentElement, 0);
      } else {
        const bodyChildren = Array.from(doc.body.childNodes);
        bodyChildren.forEach(child => {
          formatted += formatNode(child, 0);
        });
      }

      setOutput(formatted.trim());
      setError("");
    } catch (err: any) {
      setError(err?.message || "Failed to format HTML.");
      setOutput("");
    }
  }, []);

  const minifyHtmlString = useCallback((htmlStr: string) => {
    if (!htmlStr.trim()) {
      setOutput("");
      setError("");
      return;
    }
    // Remove comments and collapse whitespaces
    const minified = htmlStr
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
      .trim();
    setOutput(minified);
    setError("");
  }, []);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Card */}
        <div className="flex flex-col">
          <label htmlFor="html-input" className="block text-sm font-medium mb-2" style={{ color: "var(--color-ink)" }}>
            Source HTML
          </label>
          <textarea
            id="html-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<div class='hero'><h1>Hello World</h1><p>Messy HTML code here...</p></div>"
            rows={12}
            className="w-full p-4 border rounded-lg text-sm resize-y outline-none transition-colors duration-150 flex-1 min-h-[300px]"
            style={{
              backgroundColor: "var(--color-canvas-soft)",
              borderColor: "var(--color-hairline)",
              color: "var(--color-ink)",
              fontFamily: "var(--font-mono)",
            }}
            spellCheck={false}
          />
        </div>

        {/* Output Card */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
              Formatted HTML
            </span>
            {output && (
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs px-2.5 py-1.5 rounded transition-colors duration-150"
                style={{
                  color: copied ? "var(--color-success)" : "var(--color-link)",
                  backgroundColor: "var(--color-canvas-soft-2)",
                }}
              >
                {copied ? "Copied" : "Copy Output"}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Your beautified or minified HTML output will appear here..."
            rows={12}
            className="w-full p-4 border rounded-lg text-sm resize-y outline-none transition-colors duration-150 flex-1 min-h-[300px]"
            style={{
              backgroundColor: "var(--color-canvas-soft-2)",
              borderColor: error ? "var(--color-error)" : "var(--color-hairline)",
              color: "var(--color-ink)",
              fontFamily: "var(--font-mono)",
            }}
            spellCheck={false}
          />
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "var(--color-error)", color: "#fff" }} role="alert">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg border" style={{ borderColor: "var(--color-hairline)", backgroundColor: "var(--color-canvas)" }}>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="indent-size" className="text-xs font-medium" style={{ color: "var(--color-mute)" }}>
              Indentation:
            </label>
            <select
              id="indent-size"
              value={indentSize}
              onChange={(e) => setIndentSize(e.target.value)}
              className="text-xs px-2 py-1.5 rounded border outline-none"
              style={{
                backgroundColor: "var(--color-canvas)",
                borderColor: "var(--color-hairline)",
                color: "var(--color-ink)",
              }}
            >
              <option value="2">2 Spaces</option>
              <option value="4">4 Spaces</option>
              <option value="8">8 Spaces</option>
              <option value="tab">Tab</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => formatHtmlString(input, indentSize)}
              className="btn-primary btn-sm"
              style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
            >
              Beautify
            </button>
            <button
              type="button"
              onClick={() => minifyHtmlString(input)}
              className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 border"
              style={{
                backgroundColor: "var(--color-canvas)",
                borderColor: "var(--color-hairline)",
                color: "var(--color-body)",
              }}
            >
              Minify
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="text-xs px-3 py-1.5 rounded transition-colors duration-150 border"
          style={{
            borderColor: "var(--color-hairline)",
            color: "var(--color-mute)",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

import { useState, useCallback } from "react";
import ErrorBanner from "../ErrorBanner";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

const KEYWORDS_MAJOR = [
  "SELECT", "FROM", "WHERE", "SET", "VALUES", "INTO",
  "ORDER BY", "GROUP BY", "HAVING", "LIMIT", "OFFSET",
];

const KEYWORDS_MINOR = [
  "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN",
  "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "FULL OUTER JOIN",
  "CROSS JOIN", "ON", "AND", "OR", "UNION", "UNION ALL",
  "INSERT INTO", "UPDATE", "DELETE FROM", "CREATE TABLE",
  "ALTER TABLE", "DROP TABLE", "CREATE INDEX", "DROP INDEX",
];

const ALL_KEYWORDS = [...KEYWORDS_MAJOR, ...KEYWORDS_MINOR].sort(
  (a, b) => b.length - a.length
);

function formatSql(sql: string, indentSpaces: number): string {
  const indent = " ".repeat(indentSpaces);
  let upper = sql.toUpperCase();
  let result = sql;

  for (const kw of ALL_KEYWORDS) {
    const escaped = kw.replace(/ /g, "\\s+");
    const re = new RegExp(`\\b${escaped}\\b`, "gi");
    result = result.replace(re, `\n${kw}\n`);
  }

  const lines = result
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let depth = 0;
  const out: string[] = [];

  for (let line of lines) {
    const upperLine = line.toUpperCase();

    const isClosingParen = line.startsWith(")");
    const isMajor = KEYWORDS_MAJOR.some(
      (k) => upperLine === k || upperLine.startsWith(k + " ")
    );
    const isMinor = KEYWORDS_MINOR.some(
      (k) => upperLine === k || upperLine.startsWith(k + " ")
    );

    if (isClosingParen) depth = Math.max(0, depth - 1);

    if (isMajor) {
      out.push(line);
    } else if (isMinor) {
      out.push(indent.repeat(depth) + line);
    } else {
      out.push(indent.repeat(depth) + line);
    }

    const openCount = (line.match(/\(/g) || []).length;
    const closeCount = (line.match(/\)/g) || []).length;
    depth += openCount - closeCount;
    depth = Math.max(0, depth);
  }

  return out.join("\n");
}

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [error, setError] = useState("");
  const [copied, handleCopy] = useCopyToClipboard();

  const format = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const formatted = formatSql(input.trim(), indentSize);
      setOutput(formatted);
      setError("");
    } catch {
      setError("Failed to format SQL. Please check your query syntax.");
      setOutput("");
    }
  }, [input, indentSize]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="sql-input" className="block text-sm font-medium mb-2" style={{ color: "var(--color-ink)" }}>
          Paste your SQL query
        </label>
        <textarea
          id="sql-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT id, name, email FROM users WHERE status = 'active' ORDER BY created_at DESC;"
          rows={8}
          className="w-full p-4 border rounded-lg text-sm resize-y outline-none transition-colors duration-150"
          style={{
            backgroundColor: "var(--color-canvas-soft)",
            borderColor: "var(--color-hairline)",
            color: "var(--color-ink)",
            fontFamily: "var(--font-mono)",
          }}
          spellCheck={false}
        />
      </div>

      <ErrorBanner message={error} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={format}
          className="btn-primary btn-sm"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
        >
          Format
        </button>
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

        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="sql-indent" className="text-xs" style={{ color: "var(--color-mute)" }}>
            Indent
          </label>
          <select
            id="sql-indent"
            value={indentSize}
            onChange={(e) => setIndentSize(parseInt(e.target.value))}
            className="h-8 px-2 text-xs border rounded-md outline-none"
            style={{
              backgroundColor: "var(--color-canvas)",
              borderColor: "var(--color-hairline)",
              color: "var(--color-ink)",
            }}
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>Formatted SQL</span>
            <button
              type="button"
              onClick={() => handleCopy(output)}
              className="text-sm px-3 py-1 rounded-md transition-colors duration-150"
              style={{
                color: copied ? "var(--color-success)" : "var(--color-link)",
                backgroundColor: "var(--color-canvas-soft-2)",
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre
            className="p-4 rounded-lg text-sm overflow-x-auto max-h-96"
            style={{
              backgroundColor: "var(--color-canvas-soft-2)",
              color: "var(--color-ink)",
              fontFamily: "var(--font-mono)",
              lineHeight: "1.6",
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

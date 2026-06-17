import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import ErrorBanner from "../ErrorBanner";
import { formatBytes } from "../../helpers/utils";

interface PdfFileItem {
  id: string;
  file: File;
  size: number;
}

export default function PdfMerger() {
  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mergedSize, setMergedSize] = useState<number | null>(null);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    setError("");
    const items: PdfFileItem[] = Array.from(newFiles)
      .filter((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"))
      .map((f) => ({
        id: crypto.randomUUID(),
        file: f,
        size: f.size,
      }));
    if (items.length === 0) {
      setError("Please upload valid PDF files.");
      return;
    }
    setFiles((prev) => [...prev, ...items]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setMergedSize(null);
  }, []);

  const moveFile = useCallback((index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= files.length) return;
    setFiles((prev) => {
      const copy = [...prev];
      const tmp = copy[index];
      copy[index] = copy[target];
      copy[target] = tmp;
      return copy;
    });
    setMergedSize(null);
  }, [files.length]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
    e.target.value = "";
  }, [addFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  }, [addFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const mergePdfs = useCallback(async () => {
    if (files.length < 2) {
      setError("Please upload at least 2 PDF files to merge.");
      return;
    }
    setLoading(true);
    setError("");
    setMergedSize(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuf = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuf, { ignoreEncryption: true });
        const pageIndices = pdf.getPageIndices();
        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);
        for (const page of copiedPages) {
          mergedPdf.addPage(page);
        }
      }

      const pdfBytes = await mergedPdf.save();
      setMergedSize(pdfBytes.length);

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to merge PDFs.");
    } finally {
      setLoading(false);
    }
  }, [files]);

  const totalOriginalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {files.length === 0 && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[220px]"
          style={{
            borderColor: "var(--color-hairline)",
            backgroundColor: "var(--color-canvas-soft)",
          }}
          onClick={() => document.getElementById("pdf-merger-input")?.click()}
        >
          <span className="text-4xl mb-4">📄</span>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--color-ink)" }}>
            Drag & drop PDF files here, or click to browse
          </p>
          <p className="text-xs" style={{ color: "var(--color-mute)" }}>
            Select multiple PDF files to merge them into one document
          </p>
          <input
            id="pdf-merger-input"
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div
          className="border rounded-xl p-5 space-y-3"
          style={{ borderColor: "var(--color-hairline)", backgroundColor: "var(--color-canvas)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--color-mute)" }}>
              PDF Files ({files.length})
            </span>
            <span className="text-xs" style={{ color: "var(--color-body)" }}>
              Total: {formatBytes(totalOriginalSize)}
            </span>
          </div>

          {files.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm"
              style={{ backgroundColor: "var(--color-canvas-soft-2)" }}
            >
              {/* Reorder buttons */}
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveFile(index, -1)}
                  className="leading-none p-0.5 disabled:opacity-30 transition-opacity"
                  style={{ color: "var(--color-mute)" }}
                  aria-label="Move up"
                >
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M5 0L10 6H0z"/></svg>
                </button>
                <button
                  type="button"
                  disabled={index === files.length - 1}
                  onClick={() => moveFile(index, 1)}
                  className="leading-none p-0.5 disabled:opacity-30 transition-opacity"
                  style={{ color: "var(--color-mute)" }}
                  aria-label="Move down"
                >
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M5 6L0 0h10z"/></svg>
                </button>
              </div>

              {/* File info */}
              <span className="flex-1 truncate font-medium" style={{ color: "var(--color-ink)" }}>
                {item.file.name}
              </span>
              <span className="text-xs whitespace-nowrap" style={{ color: "var(--color-mute)" }}>
                {formatBytes(item.size)}
              </span>

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeFile(item.id)}
                className="text-xs font-medium px-2 py-1 rounded transition-colors"
                style={{ color: "var(--color-error)" }}
                aria-label={`Remove ${item.file.name}`}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add more + Merge buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => document.getElementById("pdf-merger-input")?.click()}
              className="btn-secondary btn-sm"
            >
              + Add More
            </button>
            <button
              type="button"
              onClick={mergePdfs}
              disabled={loading || files.length < 2}
              className="btn-primary btn-sm"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
                opacity: loading || files.length < 2 ? 0.6 : 1,
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Merging...
                </>
              ) : (
                "Merge PDFs"
              )}
            </button>
            {mergedSize !== null && (
              <span className="text-xs" style={{ color: "var(--color-success)" }}>
                Merged PDF: {formatBytes(mergedSize)} — Download started
              </span>
            )}
          </div>
        </div>
      )}

      <ErrorBanner message={error} />
    </div>
  );
}

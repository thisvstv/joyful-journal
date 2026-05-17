import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useRef, type DragEvent } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/Topbar";
import { isAuthenticated } from "@/lib/auth";
import {
  Upload as UploadIcon,
  Camera,
  FileText,
  X,
  ChevronDown,
  CheckCircle2,
  Image,
  File,
} from "lucide-react";

export const Route = createFileRoute("/upload")({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: UploadPage,
  head: () => ({
    meta: [
      { title: "Upload Documents — Vault Ledger" },
      { name: "description", content: "Upload your financial documents securely." },
    ],
  }),
});

const categories = [
  "Sales Invoice",
  "Purchase Receipt",
  "Bank Statement",
  "Tax Document",
  "Payroll Report",
  "Expense Report",
  "Contract",
  "Other",
];

interface FileEntry {
  id: string;
  name: string;
  size: number;
  category: string;
  status: "pending" | "uploading" | "done";
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [globalCategory, setGlobalCategory] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList) {
    const entries: FileEntry[] = Array.from(fileList).map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      category: globalCategory || "Other",
      status: "pending" as const,
    }));
    setFiles((prev) => [...prev, ...entries]);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function updateCategory(id: string, category: string) {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, category } : f)));
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
      e.target.value = "";
    }
  }

  function handleUploadAll() {
    setFiles((prev) =>
      prev.map((f) => (f.status === "pending" ? { ...f, status: "uploading" as const } : f)),
    );
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.status === "uploading" ? { ...f, status: "done" as const } : f)),
      );
    }, 1500);
  }

  const pendingCount = files.filter((f) => f.status === "pending").length;
  const doneCount = files.filter((f) => f.status === "done").length;

  return (
    <AppLayout>
      <PageShell>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Upload Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag &amp; drop files or use the camera to capture receipts on the go.
          </p>
        </div>

        {/* Drop Zone & Camera */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative col-span-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-colors ${
              dragOver
                ? "border-[var(--brand)] bg-[var(--brand-soft)]/20"
                : "border-border bg-card hover:border-muted-foreground/40"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
              <UploadIcon className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm font-medium">
              {dragOver ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              PDFs, images, or spreadsheets — up to 50MB each
            </p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.gif,.xls,.xlsx,.csv"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          <button
            onClick={() => cameraRef.current?.click()}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-12 hover:border-muted-foreground/40"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
              <Camera className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm font-medium">Take a photo</p>
            <p className="mt-1 text-xs text-muted-foreground">Capture a receipt or document</p>
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileSelect}
            />
          </button>
        </div>

        {/* Global category preset */}
        {files.length > 0 && (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground">
              Pre-set category for all:
            </span>
            <select
              value={globalCategory}
              onChange={(e) => {
                setGlobalCategory(e.target.value);
                setFiles((prev) =>
                  prev.map((f) =>
                    f.status === "pending" ? { ...f, category: e.target.value || "Other" } : f,
                  ),
                );
              }}
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
            >
              <option value="">Select category...</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-4 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="text-sm font-medium">
                {files.length} file{files.length > 1 ? "s" : ""}
                {doneCount > 0 && ` — ${doneCount} uploaded`}
              </span>
              {pendingCount > 0 && (
                <button
                  onClick={handleUploadAll}
                  className="rounded-lg bg-[var(--brand)] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
                >
                  Upload {pendingCount} file{pendingCount > 1 ? "s" : ""}
                </button>
              )}
            </div>
            <div className="divide-y divide-border">
              {files.map((f) => (
                <div key={f.id} className="flex items-center gap-4 px-5 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
                    {f.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                      <Image className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{f.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatSize(f.size)}
                      </span>
                    </div>
                    {f.status === "pending" && (
                      <select
                        value={f.category}
                        onChange={(e) => updateCategory(f.id, e.target.value)}
                        className="mt-1 h-7 rounded-md border border-border bg-background px-2 text-xs outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    )}
                    {f.status === "done" && (
                      <span className="mt-1 inline-flex items-center gap-1 text-xs text-[oklch(0.35_0.14_150)]">
                        <CheckCircle2 className="h-3 w-3" />
                        Uploaded — {f.category}
                      </span>
                    )}
                    {f.status === "uploading" && (
                      <div className="mt-1.5 h-1.5 w-32 rounded-full bg-secondary">
                        <div className="h-full w-2/3 animate-pulse rounded-full bg-[var(--brand)]" />
                      </div>
                    )}
                  </div>
                  {f.status === "pending" && (
                    <button
                      onClick={() => removeFile(f.id)}
                      className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {files.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-border px-6 py-10 text-center">
            <File className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              No files selected yet. Drag files above or click to browse.
            </p>
          </div>
        )}
      </PageShell>
    </AppLayout>
  );
}

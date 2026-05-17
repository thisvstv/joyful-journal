import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/Topbar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  FileText,
  Download,
  Filter,
  Search,
  MessageSquare,
  Paperclip,
  Send,
  X,
  Image,
} from "lucide-react";
import { isAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/history")({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: HistoryPage,
  head: () => ({
    meta: [
      { title: "Documents — Vault Ledger" },
      {
        name: "description",
        content: "Browse and filter all uploaded documents and their status.",
      },
    ],
  }),
});

interface DocRow {
  id: string;
  date: string;
  doc: string;
  category: string;
  status: string;
  tone: "pending" | "processing" | "approved" | "action";
}

const rows: DocRow[] = [
  {
    id: "d1",
    date: "Oct 31, 2026",
    doc: "October Invoice Pack.pdf",
    category: "Sales Invoice",
    status: "Processing",
    tone: "processing",
  },
  {
    id: "d2",
    date: "Oct 28, 2026",
    doc: "Vendor_Statement_Q4.pdf",
    category: "Bank Statement",
    status: "Approved",
    tone: "approved",
  },
  {
    id: "d3",
    date: "Oct 12, 2026",
    doc: "Receipt_2026-10-12.jpg",
    category: "Purchase Receipt",
    status: "Needs Action",
    tone: "action",
  },
  {
    id: "d4",
    date: "Oct 10, 2026",
    doc: "Bank_Statement_Oct.pdf",
    category: "Bank Statement",
    status: "Approved",
    tone: "approved",
  },
  {
    id: "d5",
    date: "Oct 05, 2026",
    doc: "Payroll_October.xlsx",
    category: "Payroll Report",
    status: "Pending",
    tone: "pending",
  },
  {
    id: "d6",
    date: "Oct 02, 2026",
    doc: "Q3_Tax_Return.pdf",
    category: "Tax Document",
    status: "Approved",
    tone: "approved",
  },
  {
    id: "d7",
    date: "Sep 28, 2026",
    doc: "Sep_Expense_Report.pdf",
    category: "Expense Report",
    status: "Approved",
    tone: "approved",
  },
  {
    id: "d8",
    date: "Sep 24, 2026",
    doc: "Bank_Statement_Sep.pdf",
    category: "Bank Statement",
    status: "Approved",
    tone: "approved",
  },
  {
    id: "d9",
    date: "Sep 18, 2026",
    doc: "Receipt_2026-09-15.jpg",
    category: "Purchase Receipt",
    status: "Needs Action",
    tone: "action",
  },
  {
    id: "d10",
    date: "Sep 12, 2026",
    doc: "Contract_Amend_3.pdf",
    category: "Contract",
    status: "Approved",
    tone: "approved",
  },
];

const statusStyles: Record<string, string> = {
  pending: "border border-border text-muted-foreground",
  processing: "border border-[var(--brand)]/20 bg-[var(--brand-soft)]/30 text-[var(--brand)]",
  approved: "bg-[oklch(0.94_0.08_150)] text-[oklch(0.35_0.14_150)]",
  action: "bg-destructive/10 text-destructive",
};

const categories = [...new Set(rows.map((r) => r.category))];
const statuses = ["All", "Pending", "Processing", "Approved", "Needs Action"];

const threadMessages = [
  {
    id: "m1",
    from: "Sarah J. (Accountant)",
    avatar: "SJ",
    time: "Oct 12, 2026 · 2:30 PM",
    text: "Hi — the receipt image you uploaded is a bit blurry around the total amount. Could you re-send a clearer photo?",
    attachment: null,
  },
  {
    id: "m2",
    from: "You",
    avatar: "ME",
    time: "Oct 12, 2026 · 2:45 PM",
    text: "Sure, let me grab a better photo right now.",
    attachment: null,
  },
  {
    id: "m3",
    from: "You",
    avatar: "ME",
    time: "Oct 12, 2026 · 3:10 PM",
    text: "Here's a clearer shot. Sorry about that!",
    attachment: { name: "Receipt_2026-10-12_v2.jpg", icon: Image },
  },
];

function HistoryPage() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocRow | null>(null);
  const [replyText, setReplyText] = useState("");

  const filtered = rows.filter((r) => {
    const matchSearch =
      !search ||
      r.doc.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "All" || r.category === filterCategory;
    const matchStatus =
      filterStatus === "All" ||
      (filterStatus === "Needs Action" ? r.status === "Needs Action" : r.status === filterStatus);
    const matchDateFrom = !filterDateFrom || r.date.localeCompare(filterDateFrom) >= 0;
    const matchDateTo = !filterDateTo || r.date.localeCompare(filterDateTo) <= 0;
    return matchSearch && matchCategory && matchStatus && matchDateFrom && matchDateTo;
  });

  const threadDoc =
    selectedDoc?.id === "d3" || selectedDoc?.id === "d9"
      ? { messages: threadMessages, title: selectedDoc.doc }
      : null;

  function clearFilters() {
    setFilterCategory("All");
    setFilterStatus("All");
    setFilterDateFrom("");
    setFilterDateTo("");
    setSearch("");
  }

  function handleSelectDoc(doc: DocRow) {
    setSelectedDoc(doc);
  }

  const hasActiveFilters =
    filterCategory !== "All" ||
    filterStatus !== "All" ||
    filterDateFrom !== "" ||
    filterDateTo !== "";

  return (
    <AppLayout>
      <PageShell>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Documents</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              All your uploaded documents and their current status.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documents..."
                className="h-10 w-56 rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
              />
            </div>
            <button
              onClick={() => setShowFilters((f) => !f)}
              className={`flex items-center gap-2 rounded-lg border px-4 text-sm font-medium ${
                showFilters || hasActiveFilters
                  ? "border-[var(--brand)] bg-[var(--brand-soft)] text-[var(--brand)]"
                  : "border-border bg-card hover:bg-secondary"
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="relative mt-3 sm:hidden">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
          />
        </div>

        {/* Filter bar */}
        {showFilters && (
          <div className="mt-4 flex flex-wrap items-end gap-4 rounded-2xl border border-border bg-card px-5 py-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="mt-1 h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mt-1 h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">From</label>
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="mt-1 h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">To</label>
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="mt-1 h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none"
              />
            </div>
            <button
              onClick={clearFilters}
              className="h-9 rounded-lg border border-border px-4 text-xs font-medium hover:bg-secondary"
            >
              Clear
            </button>
          </div>
        )}

        {/* Main content */}
        <div className="mt-6 flex gap-6">
          {/* Table */}
          <div
            className={`overflow-hidden rounded-2xl border border-border bg-card ${
              selectedDoc && !isMobile ? "flex-1" : "w-full"
            }`}
          >
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium sm:px-6">Date</th>
                  <th className="px-4 py-3 text-left font-medium sm:px-6">Document</th>
                  <th className="hidden px-4 py-3 text-left font-medium sm:table-cell sm:px-6">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left font-medium sm:px-6">Status</th>
                  <th className="px-4 py-3 sm:px-6" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.length > 0 ? (
                  filtered.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => handleSelectDoc(r)}
                      className={`cursor-pointer transition-colors hover:bg-secondary/40 ${
                        selectedDoc?.id === r.id ? "bg-[var(--brand-soft)]/20" : ""
                      }`}
                    >
                      <td className="px-4 py-4 text-xs text-muted-foreground sm:px-6 sm:text-sm">
                        {r.date}
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
                            <FileText className="h-4 w-4" />
                          </div>
                          <span className="truncate text-sm font-medium">{r.doc}</span>
                        </div>
                      </td>
                      <td className="hidden px-4 py-4 text-xs text-muted-foreground sm:table-cell sm:px-6 sm:text-sm">
                        {r.category}
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <span
                          className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium sm:px-2.5 sm:py-1 sm:text-xs ${statusStyles[r.tone]}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-end gap-1">
                          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectDoc(r);
                            }}
                            className={`rounded-md p-1.5 ${
                              selectedDoc?.id === r.id
                                ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                          >
                            <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-muted-foreground"
                    >
                      No documents match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Thread panel (split-view) */}
          {selectedDoc && !isMobile && (
            <div className="flex w-96 shrink-0 flex-col rounded-2xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
                    Thread
                  </div>
                  <div className="truncate text-sm font-medium">{selectedDoc.doc}</div>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="ml-2 rounded-md p-1 text-muted-foreground hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {threadDoc ? (
                <>
                  <div className="flex-1 space-y-4 overflow-y-auto p-5">
                    <div className="flex justify-center">
                      <span className="rounded-full bg-secondary px-3 py-1 text-[11px] text-muted-foreground">
                        Oct 12, 2026
                      </span>
                    </div>
                    {threadDoc.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex gap-3 ${m.from === "You" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`mt-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                            m.from === "You"
                              ? "bg-[var(--brand)]"
                              : "bg-gradient-to-br from-pink-300 to-purple-400"
                          }`}
                        >
                          {m.avatar}
                        </div>
                        <div className={`max-w-[80%] ${m.from === "You" ? "items-end" : ""}`}>
                          <div
                            className={`mb-1 text-[11px] ${m.from === "You" ? "text-right" : ""}`}
                          >
                            <span className="font-semibold">{m.from}</span>
                            <span className="text-muted-foreground"> · {m.time}</span>
                          </div>
                          <div
                            className={`rounded-2xl p-3 text-sm ${
                              m.from === "You"
                                ? "rounded-tr-sm bg-foreground text-background"
                                : "rounded-tl-sm bg-[var(--brand-soft)]"
                            }`}
                          >
                            {m.text}
                          </div>
                          {m.attachment && (
                            <div
                              className={`mt-2 inline-flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground ${
                                m.from === "You" ? "ml-auto" : ""
                              }`}
                            >
                              <m.attachment.icon className="h-3.5 w-3.5" />
                              {m.attachment.name}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border p-4">
                    <div className="relative">
                      <Paperclip className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Reply to thread..."
                        className="h-10 w-full rounded-full border border-border bg-background pl-10 pr-11 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
                      />
                      <button className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--brand)] text-white">
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center px-5 text-center text-sm text-muted-foreground">
                  No messages yet for this document.
                  <br />
                  Messages from your accountant will appear here.
                </div>
              )}
            </div>
          )}

          {/* Mobile: selected doc shows as bottom panel */}
          {selectedDoc && isMobile && (
            <div className="fixed inset-x-0 bottom-0 z-40 flex max-h-[60vh] flex-col rounded-t-2xl border border-border bg-card shadow-lg">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="min-w-0 flex-1 truncate text-sm font-medium">{selectedDoc.doc}</div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="ml-2 rounded-md p-1 text-muted-foreground hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {threadDoc ? (
                  threadDoc.messages.map((m) => (
                    <div key={m.id} className="mb-3">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-semibold">{m.from}</span> · {m.time}
                      </div>
                      <p className="mt-0.5 text-sm">{m.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-muted-foreground">
                    No messages yet for this document.
                  </p>
                )}
              </div>
              <div className="border-t border-border p-3">
                <input
                  placeholder="Reply..."
                  className="h-10 w-full rounded-full border border-border bg-background px-4 pr-11 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
                />
              </div>
            </div>
          )}
        </div>
      </PageShell>
    </AppLayout>
  );
}

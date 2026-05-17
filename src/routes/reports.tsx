import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/Topbar";
import { isAuthenticated } from "@/lib/auth";
import {
  Calendar,
  Download,
  FileText,
  MessageSquare,
  Paperclip,
  Send,
  FileSpreadsheet,
  FileBarChart,
  ScrollText,
  PieChart,
  Landmark,
  ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/reports")({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: Reports,
  head: () => ({
    meta: [
      { title: "Monthly Reports — Vault Ledger" },
      { name: "description", content: "View and download your finalized monthly reports." },
    ],
  }),
});

interface Report {
  id: string;
  name: string;
  icon: typeof FileText;
  date: string;
  status: "Finalized" | "In Progress";
  downloads: number;
}

const months = [
  { label: "October 2026", active: true },
  { label: "September 2026", active: false },
  { label: "August 2026", active: false },
];

const reports: Report[] = [
  {
    id: "tb",
    name: "Trial Balance",
    icon: ScrollText,
    date: "Oct 31, 2026",
    status: "Finalized",
    downloads: 2,
  },
  {
    id: "pl",
    name: "Income Statement (P&L)",
    icon: FileBarChart,
    date: "Oct 31, 2026",
    status: "Finalized",
    downloads: 1,
  },
  {
    id: "bs",
    name: "Balance Sheet",
    icon: Landmark,
    date: "Oct 31, 2026",
    status: "Finalized",
    downloads: 3,
  },
  {
    id: "cf",
    name: "Cash Flow Statement",
    icon: PieChart,
    date: "Oct 28, 2026",
    status: "Finalized",
    downloads: 0,
  },
  {
    id: "gl",
    name: "General Ledger Export",
    icon: FileSpreadsheet,
    date: "Oct 28, 2026",
    status: "Finalized",
    downloads: 1,
  },
  {
    id: "ar",
    name: "Accounts Receivable Aging",
    icon: FileText,
    date: "—",
    status: "In Progress",
    downloads: 0,
  },
];

function Reports() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  return (
    <AppLayout>
      <PageShell>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Monthly Reports</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View and download your finalized accounting reports.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary">
                <Calendar className="h-4 w-4" />
                {selectedMonth.label}
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <Download className="h-4 w-4" />
              Download All
            </button>
          </div>
        </div>

        {/* Report cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
                  <r.icon className="h-5 w-5" />
                </div>
                {r.status === "Finalized" ? (
                  <span className="rounded-full bg-[oklch(0.94_0.08_150)] px-2.5 py-0.5 text-[11px] font-medium text-[oklch(0.35_0.14_150)]">
                    Finalized
                  </span>
                ) : (
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    In Progress
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-sm font-semibold">{r.name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Generated {r.date}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs text-muted-foreground">{r.downloads} downloads</span>
                <button
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                    r.status === "Finalized"
                      ? "bg-[var(--brand)] text-white hover:opacity-90"
                      : "border border-border text-muted-foreground"
                  }`}
                  disabled={r.status !== "Finalized"}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Document Thread (Split-View Ticketing) */}
        <div className="mt-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
            <MessageSquare className="h-4 w-4" />
            Active Thread
          </div>
          <div className="mt-3 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-base font-semibold">Re: October Income Statement</div>
                <p className="text-xs text-muted-foreground">
                  Thread attached to report · 2 participants
                </p>
              </div>
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-card bg-gradient-to-br from-pink-300 to-purple-400" />
                <div className="h-8 w-8 rounded-full border-2 border-card bg-gradient-to-br from-slate-600 to-slate-800" />
              </div>
            </div>

            <div className="mt-4 max-h-64 space-y-4 overflow-y-auto">
              <div className="flex justify-center">
                <span className="rounded-full bg-secondary px-3 py-1 text-[11px] text-muted-foreground">
                  Today
                </span>
              </div>

              <div className="flex gap-3">
                <div className="mt-5 h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-orange-300 to-pink-400" />
                <div>
                  <div className="mb-1 text-xs">
                    <span className="font-semibold">Sarah J.</span>{" "}
                    <span className="text-muted-foreground">10:14 AM</span>
                  </div>
                  <div className="max-w-xs rounded-2xl rounded-tl-sm bg-[var(--brand-soft)] p-3 text-sm">
                    The October P&L is ready. I noticed the COGS line is higher than expected — can
                    you confirm the inventory numbers?
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground">
                    <FileText className="h-3.5 w-3.5 text-red-500" />
                    Oct_PL_Draft_v1.pdf
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="mb-1 text-xs text-muted-foreground">
                  10:22 AM <span className="font-semibold text-foreground">You</span>
                </div>
                <div className="max-w-xs rounded-2xl rounded-tr-sm bg-foreground p-3 text-sm text-background">
                  Sure, let me check with the warehouse team and get back to you by EOD.
                </div>
              </div>
            </div>

            <div className="relative mt-4">
              <Paperclip className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Reply to this thread..."
                className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-12 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
              />
              <button className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--brand)] text-white">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </PageShell>
    </AppLayout>
  );
}

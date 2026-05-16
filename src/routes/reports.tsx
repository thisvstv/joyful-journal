import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/Topbar";
import {
  Calendar,
  Download,
  FileText,
  MessageSquare,
  Paperclip,
  Send,
  MoreHorizontal,
  Info,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/reports")({
  component: Reports,
  head: () => ({
    meta: [
      { title: "Financial Reports — Vault Ledger" },
      { name: "description", content: "Overview and collaborative analysis for the quarter." },
    ],
  }),
});

const chartData = [
  { m: "Jun", Revenue: 78, Expenses: 52 },
  { m: "Jul", Revenue: 92, Expenses: 61 },
  { m: "Aug", Revenue: 110, Expenses: 70 },
  { m: "Sep", Revenue: 128, Expenses: 84 },
  { m: "Oct", Revenue: 152, Expenses: 96 },
];

function RevenueChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Revenue vs. Expenses</h3>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="oklch(0.92 0.01 250)" vertical={false} />
            <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "oklch(0.5 0.02 250)" }} />
            <YAxis tickFormatter={(v) => `$${v}k`} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "oklch(0.5 0.02 250)" }} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v: number) => `$${v}k`} />
            <Line type="monotone" dataKey="Revenue" stroke="oklch(0.45 0.22 265)" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="Expenses" stroke="oklch(0.78 0.08 255)" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[oklch(0.45_0.22_265)]" /> Revenue</span>
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.08_255)]" /> Expenses</span>
      </div>
    </div>
  );
}

function LiquidityCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Current Liquidity</h3>
        <Info className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="relative mx-auto mt-6 h-44 w-44">
        <div className="absolute inset-0 rounded-2xl bg-[var(--brand)]" />
        <div className="absolute right-0 top-0 h-1/3 w-1/2 rounded-tr-2xl bg-[var(--brand-deep)]" />
        <div className="absolute inset-4 flex flex-col items-center justify-center rounded-xl bg-card shadow-sm">
          <span className="text-[10px] font-medium tracking-widest text-muted-foreground">TOTAL CASH</span>
          <span className="mt-1 text-2xl font-bold">$1.24M</span>
        </div>
      </div>
      <div className="mt-6 space-y-2 text-sm">
        {[
          { dot: "bg-[var(--brand)]", label: "Operating", v: "65%" },
          { dot: "bg-[oklch(0.85_0.05_255)]", label: "Reserves", v: "20%" },
          { dot: "bg-[var(--brand-deep)]", label: "Investment", v: "15%" },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${r.dot}`} />{r.label}</span>
            <span className="font-medium text-muted-foreground">{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentReports() {
  const reports = [
    { name: "October Tax Summary", date: "Oct 31, 2023", status: "Under Review", tone: "review" },
    { name: "Q3 P&L Statement", date: "Oct 05, 2023", status: "Finalized", tone: "ok" },
    { name: "September Reconciliation", date: "Oct 02, 2023", status: "Finalized", tone: "ok" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Reports</h3>
        <button className="text-sm font-medium text-[var(--brand)] hover:underline">View All</button>
      </div>
      <div className="mt-5 divide-y divide-border">
        {reports.map((r) => (
          <div key={r.name} className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{r.name}</div>
              <div className="text-xs text-muted-foreground">Generated {r.date}</div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                r.tone === "ok"
                  ? "bg-[oklch(0.94_0.08_150)] text-[oklch(0.35_0.14_150)]"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {r.status}
            </span>
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActiveThread() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
            <MessageSquare className="h-3.5 w-3.5" />
            Active Thread
          </div>
          <div className="mt-1 text-base font-semibold">Re: October Tax Summary</div>
        </div>
        <div className="flex -space-x-2">
          <div className="h-8 w-8 rounded-full border-2 border-card bg-gradient-to-br from-pink-300 to-purple-400" />
          <div className="h-8 w-8 rounded-full border-2 border-card bg-gradient-to-br from-slate-600 to-slate-800" />
        </div>
      </div>

      <div className="mt-4 flex-1 space-y-4 overflow-y-auto">
        <div className="flex justify-center">
          <span className="rounded-full bg-secondary px-3 py-1 text-[11px] text-muted-foreground">Today</span>
        </div>

        <div className="flex gap-3">
          <div className="mt-5 h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-orange-300 to-pink-400" />
          <div>
            <div className="mb-1 text-xs">
              <span className="font-semibold">Sarah J.</span>{" "}
              <span className="text-muted-foreground">10:14 AM</span>
            </div>
            <div className="max-w-xs rounded-2xl rounded-tl-sm bg-[var(--brand-soft)] p-3 text-sm">
              The preliminary October summary is attached. Notice the slight increase in operational expenses line 4B. Let me know if you need the detailed breakdown.
            </div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground">
              <FileText className="h-3.5 w-3.5 text-red-500" />
              Oct_Tax_Draft_v1.pdf
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="mb-1 text-xs text-muted-foreground">
            10:22 AM <span className="font-semibold text-foreground">You</span>
          </div>
          <div className="max-w-xs rounded-2xl rounded-tr-sm bg-foreground p-3 text-sm text-background">
            Thanks Sarah. Yes, please send over the breakdown for 4B. I want to clear that before we finalize.
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <Paperclip className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Type a message..."
          className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-12 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
        />
        <button className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--brand)] text-white">
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Reports() {
  return (
    <AppLayout>
      <PageShell>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Financial Reports</h1>
            <p className="mt-1 text-sm text-muted-foreground">Overview and collaborative analysis for Q3</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary">
              <Calendar className="h-4 w-4" />
              This Quarter
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <Download className="h-4 w-4" />
              Export Full Report
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2"><RevenueChart /></div>
          <LiquidityCard />
          <div className="lg:col-span-2"><RecentReports /></div>
          <ActiveThread />
        </div>
      </PageShell>
    </AppLayout>
  );
}

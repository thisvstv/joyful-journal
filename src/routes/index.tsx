import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/Topbar";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  PiggyBank,
  ArrowUpRight,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Vault Ledger" },
      { name: "description", content: "Snapshot of your portfolio, cash flow and recent activity." },
    ],
  }),
});

const cashflow = [
  { m: "Apr", v: 84 },
  { m: "May", v: 96 },
  { m: "Jun", v: 110 },
  { m: "Jul", v: 132 },
  { m: "Aug", v: 124 },
  { m: "Sep", v: 158 },
  { m: "Oct", v: 184 },
];

const kpis = [
  { label: "Net Worth", value: "$1.24M", delta: "+4.2%", up: true, icon: Wallet },
  { label: "Monthly Revenue", value: "$184k", delta: "+12.1%", up: true, icon: TrendingUp },
  { label: "Monthly Expenses", value: "$96k", delta: "-2.4%", up: false, icon: Receipt },
  { label: "Cash Reserves", value: "$248k", delta: "+1.8%", up: true, icon: PiggyBank },
];

const activity = [
  { title: "October Tax Summary submitted for review", time: "2h ago", icon: Clock, tone: "review" },
  { title: "Sarah J. approved Q3 P&L Statement", time: "Yesterday", icon: CheckCircle2, tone: "ok" },
  { title: "September Reconciliation finalized", time: "3 days ago", icon: CheckCircle2, tone: "ok" },
  { title: "New document uploaded: Vendor_Contracts.pdf", time: "5 days ago", icon: FileText, tone: "muted" },
];

function Dashboard() {
  return (
    <AppLayout>
      <PageShell>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back — here's your financial pulse for this month.
            </p>
          </div>
          <Link
            to="/reports"
            className="flex items-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            View Reports
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{k.label}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
                  <k.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 text-2xl font-bold">{k.value}</div>
              <div
                className={`mt-1 flex items-center gap-1 text-xs ${
                  k.up ? "text-[oklch(0.5_0.16_150)]" : "text-[oklch(0.55_0.18_25)]"
                }`}
              >
                {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {k.delta} vs last month
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Cash Flow</h3>
                <p className="text-xs text-muted-foreground">Last 7 months</p>
              </div>
              <div className="flex gap-2 text-xs">
                {["7M", "1Y", "All"].map((t, i) => (
                  <button
                    key={t}
                    className={`rounded-md px-3 py-1.5 ${
                      i === 0
                        ? "bg-[var(--brand-soft)] font-semibold text-[var(--brand)]"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashflow} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.52 0.22 260)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="oklch(0.52 0.22 260)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.92 0.01 250)" vertical={false} />
                  <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "oklch(0.5 0.02 250)" }} />
                  <YAxis
                    tickFormatter={(v) => `$${v}k`}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "oklch(0.5 0.02 250)" }}
                  />
                  <Tooltip formatter={(v: number) => `$${v}k`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.45 0.22 265)" strokeWidth={2.5} fill="url(#cf)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <div className="mt-4 space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      a.tone === "ok"
                        ? "bg-[oklch(0.94_0.08_150)] text-[oklch(0.35_0.14_150)]"
                        : a.tone === "review"
                          ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                          : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageShell>
    </AppLayout>
  );
}

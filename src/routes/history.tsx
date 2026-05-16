import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/Topbar";
import { FileText, Download, Filter, Search as SearchIcon } from "lucide-react";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
  head: () => ({
    meta: [
      { title: "History — Vault Ledger" },
      { name: "description", content: "Complete audit log of reports, uploads and approvals." },
    ],
  }),
});

const rows = [
  { date: "Oct 31, 2023", doc: "October Tax Summary", actor: "Sarah J.", type: "Tax", status: "Under Review", tone: "review" },
  { date: "Oct 28, 2023", doc: "Vendor_Contracts.pdf", actor: "You", type: "Upload", status: "Stored", tone: "muted" },
  { date: "Oct 12, 2023", doc: "Payroll October Run", actor: "Marcus T.", type: "Payroll", status: "Finalized", tone: "ok" },
  { date: "Oct 05, 2023", doc: "Q3 P&L Statement", actor: "Sarah J.", type: "Report", status: "Finalized", tone: "ok" },
  { date: "Oct 02, 2023", doc: "September Reconciliation", actor: "Sarah J.", type: "Report", status: "Finalized", tone: "ok" },
  { date: "Sep 24, 2023", doc: "Bank_Statement_Sep.pdf", actor: "You", type: "Upload", status: "Stored", tone: "muted" },
  { date: "Sep 18, 2023", doc: "August Tax Filing", actor: "Sarah J.", type: "Tax", status: "Finalized", tone: "ok" },
  { date: "Sep 02, 2023", doc: "Investor_Update_Q3.pdf", actor: "You", type: "Upload", status: "Stored", tone: "muted" },
];

const tones: Record<string, string> = {
  ok: "bg-[oklch(0.94_0.08_150)] text-[oklch(0.35_0.14_150)]",
  review: "bg-[var(--brand-soft)] text-[var(--brand)]",
  muted: "border border-border text-muted-foreground",
};

function HistoryPage() {
  return (
    <AppLayout>
      <PageShell>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">History</h1>
            <p className="mt-1 text-sm text-muted-foreground">All document activity across your account.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search activity..."
                className="h-10 w-64 rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
              />
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium hover:bg-secondary">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Date</th>
                <th className="px-6 py-3 text-left font-medium">Document</th>
                <th className="px-6 py-3 text-left font-medium">Actor</th>
                <th className="px-6 py-3 text-left font-medium">Type</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.doc + r.date} className="hover:bg-secondary/40">
                  <td className="px-6 py-4 text-muted-foreground">{r.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{r.doc}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{r.actor}</td>
                  <td className="px-6 py-4 text-muted-foreground">{r.type}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tones[r.tone]}`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageShell>
    </AppLayout>
  );
}

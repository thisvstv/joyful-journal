import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/Topbar";
import { MessageSquare, BookOpen, Mail, Phone, ChevronRight, LifeBuoy } from "lucide-react";

export const Route = createFileRoute("/support")({
  component: SupportPage,
  head: () => ({
    meta: [
      { title: "Support — Vault Ledger" },
      { name: "description", content: "Get help from your dedicated advisor or browse resources." },
    ],
  }),
});

const faqs = [
  { q: "How do I upload a new financial document?", a: "Use the Upload Documents button in the sidebar. Drag-and-drop is also supported on every page." },
  { q: "When is my Q3 report finalized?", a: "Your advisor will mark it Finalized once both parties approve. You'll receive a notification." },
  { q: "Can I export reports as Excel?", a: "Yes. Click Export on any report and choose between PDF, XLSX or CSV formats." },
  { q: "Is my data encrypted?", a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Documents are stored in a SOC 2 Type II facility." },
];

function SupportPage() {
  return (
    <AppLayout>
      <PageShell>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Support</h1>
          <p className="mt-1 text-sm text-muted-foreground">We're here to help — usually within an hour.</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[
            { icon: MessageSquare, title: "Message your advisor", desc: "Sarah Jensen is online now.", cta: "Start a chat" },
            { icon: Mail, title: "Email support", desc: "Replies within 2 business hours.", cta: "support@vaultledger.com" },
            { icon: Phone, title: "Call us", desc: "Mon–Fri, 8am to 6pm ET.", cta: "+1 (415) 555-0142" },
          ].map((c) => (
            <button
              key={c.title}
              className="group flex flex-col items-start rounded-2xl border border-border bg-card p-6 text-left transition-shadow hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]">
                {c.cta} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <div className="flex items-center gap-2">
              <LifeBuoy className="h-5 w-5 text-[var(--brand)]" />
              <h3 className="text-lg font-semibold">Frequently asked</h3>
            </div>
            <div className="mt-4 divide-y divide-border">
              {faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                    {f.q}
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[var(--brand)]" />
              <h3 className="text-lg font-semibold">Resources</h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {["Getting started guide", "Security & compliance", "Tax preparation checklist", "Onboarding video (4 min)"].map((r) => (
                <li key={r}>
                  <a className="flex items-center justify-between rounded-lg p-2 -mx-2 hover:bg-secondary" href="#">
                    {r}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageShell>
    </AppLayout>
  );
}

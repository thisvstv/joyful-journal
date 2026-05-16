import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/Topbar";
import { Check, Shield, Bell, CreditCard } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings — Vault Ledger" },
      { name: "description", content: "Manage your profile, security and notification preferences." },
    ],
  }),
});

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        defaultValue={value}
        type={type}
        className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
      />
    </label>
  );
}

function Toggle({ on = false }: { on?: boolean }) {
  return (
    <button
      className={`relative h-6 w-11 rounded-full transition-colors ${
        on ? "bg-[var(--brand)]" : "bg-secondary"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function SettingsPage() {
  return (
    <AppLayout>
      <PageShell>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your account and preferences.</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <nav className="space-y-1">
            {[
              { label: "Profile", icon: Check, active: true },
              { label: "Security", icon: Shield },
              { label: "Notifications", icon: Bell },
              { label: "Billing", icon: CreditCard },
            ].map((s) => (
              <button
                key={s.label}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  s.active
                    ? "bg-[var(--brand-soft)] font-semibold text-[var(--brand)]"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <s.icon className="h-4 w-4" />
                {s.label}
              </button>
            ))}
          </nav>

          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">Profile</h3>
              <p className="text-sm text-muted-foreground">This is how your advisor will see you.</p>

              <div className="mt-5 flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-deep)]" />
                <div>
                  <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-secondary">
                    Change photo
                  </button>
                  <p className="mt-1 text-xs text-muted-foreground">PNG or JPG, up to 2MB.</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" value="Alex Morgan" />
                <Field label="Email" value="alex@morgancapital.com" type="email" />
                <Field label="Company" value="Morgan Capital LLC" />
                <Field label="Phone" value="+1 (415) 555-0199" type="tel" />
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary">
                  Cancel
                </button>
                <button className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  Save changes
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <div className="mt-4 divide-y divide-border">
                {[
                  { t: "Report status updates", d: "When a report changes to Under Review or Finalized.", on: true },
                  { t: "New thread messages", d: "When your advisor replies in a thread.", on: true },
                  { t: "Document approvals", d: "When you're tagged for sign-off.", on: false },
                  { t: "Weekly digest", d: "A summary of all activity, sent on Mondays.", on: true },
                ].map((n) => (
                  <div key={n.t} className="flex items-center justify-between py-4">
                    <div>
                      <div className="text-sm font-medium">{n.t}</div>
                      <div className="text-xs text-muted-foreground">{n.d}</div>
                    </div>
                    <Toggle on={n.on} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </PageShell>
    </AppLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

function Toggle({
  on = false,
  onChange,
  disabled = false,
  ariaLabel,
}: {
  on?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange?.(!on)}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-[var(--brand)]" : "bg-secondary"
        }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"
          }`}
      />
    </button>
  );
}

function SettingsPage() {
  const [showPasswordPanel, setShowPasswordPanel] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [channels, setChannels] = useState({
    email: true,
    sms: false,
    inApp: true,
  });
  const [events, setEvents] = useState({
    reportUpdates: true,
    approvals: false,
    threadMessages: true,
    weeklyDigest: true,
  });
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState("22:00");
  const [quietHoursEnd, setQuietHoursEnd] = useState("07:00");

  const sessions = [
    { device: "MacBook Pro", location: "San Francisco, US", lastActive: "Now", current: true },
    { device: "iPhone 15", location: "San Francisco, US", lastActive: "2h ago", current: false },
    { device: "Chrome on Windows", location: "Seattle, US", lastActive: "Yesterday", current: false },
  ];

  const invoices = [
    { id: "INV-2498", date: "2026-05-01", amount: "$120.00", status: "Paid" },
    { id: "INV-2412", date: "2026-04-01", amount: "$120.00", status: "Paid" },
  ];

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
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${s.active
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
              <p className="text-sm text-muted-foreground">Control delivery channels and event alerts.</p>

              <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div className="rounded-xl border border-border bg-background p-4">
                  <h4 className="text-sm font-semibold">Channels</h4>
                  <div className="mt-3 divide-y divide-border">
                    {[
                      { key: "email", label: "Email", on: channels.email },
                      { key: "sms", label: "SMS", on: channels.sms },
                      { key: "inApp", label: "In-app", on: channels.inApp },
                    ].map((channel) => (
                      <div key={channel.key} className="flex items-center justify-between py-3">
                        <span className="text-sm">{channel.label}</span>
                        <Toggle
                          on={channel.on}
                          ariaLabel={`Toggle ${channel.label}`}
                          onChange={(next) =>
                            setChannels((prev) => ({
                              ...prev,
                              [channel.key]: next,
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <h4 className="text-sm font-semibold">Events</h4>
                  <div className="mt-3 divide-y divide-border">
                    {[
                      {
                        key: "reportUpdates",
                        label: "Report updates",
                        help: "When report status changes.",
                        on: events.reportUpdates,
                      },
                      {
                        key: "approvals",
                        label: "Approvals",
                        help: "When you are requested to approve.",
                        on: events.approvals,
                      },
                      {
                        key: "threadMessages",
                        label: "Thread messages",
                        help: "When new replies are posted.",
                        on: events.threadMessages,
                      },
                      {
                        key: "weeklyDigest",
                        label: "Weekly digest",
                        help: "Summary delivered every Monday.",
                        on: events.weeklyDigest,
                      },
                    ].map((event) => (
                      <div key={event.key} className="flex items-center justify-between gap-4 py-3">
                        <div>
                          <div className="text-sm font-medium">{event.label}</div>
                          <div className="text-xs text-muted-foreground">{event.help}</div>
                        </div>
                        <Toggle
                          on={event.on}
                          ariaLabel={`Toggle ${event.label}`}
                          onChange={(next) =>
                            setEvents((prev) => ({
                              ...prev,
                              [event.key]: next,
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold">Quiet hours</h4>
                    <p className="text-xs text-muted-foreground">Pause non-critical notifications overnight.</p>
                  </div>
                  <Toggle
                    on={quietHoursEnabled}
                    ariaLabel="Toggle quiet hours"
                    onChange={setQuietHoursEnabled}
                  />
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="block text-xs font-medium text-muted-foreground">
                    Start
                    <input
                      type="time"
                      value={quietHoursStart}
                      onChange={(e) => setQuietHoursStart(e.target.value)}
                      disabled={!quietHoursEnabled}
                      className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    End
                    <input
                      type="time"
                      value={quietHoursEnd}
                      onChange={(e) => setQuietHoursEnd(e.target.value)}
                      disabled={!quietHoursEnabled}
                      className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </label>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">Security</h3>
              <p className="text-sm text-muted-foreground">Review account access and authentication controls.</p>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold">Change password</h4>
                      <p className="text-xs text-muted-foreground">Use a unique password with at least 12 characters.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPasswordPanel((prev) => !prev)}
                      className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary"
                    >
                      {showPasswordPanel ? "Close" : "Change password"}
                    </button>
                  </div>

                  {showPasswordPanel ? (
                    <div className="mt-4 rounded-lg border border-border bg-card p-4">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Field label="Current password" value="" type="password" />
                        <Field label="New password" value="" type="password" />
                        <Field label="Confirm password" value="" type="password" />
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowPasswordPanel(false)}
                          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                        >
                          Update password
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold">Two-factor authentication</h4>
                      <p className="text-xs text-muted-foreground">Add a second step to protect your account.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${twoFactorEnabled
                            ? "bg-[oklch(0.94_0.08_150)] text-[oklch(0.35_0.14_150)]"
                            : "border border-border text-muted-foreground"
                          }`}
                      >
                        {twoFactorEnabled ? "Enabled" : "Disabled"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTwoFactorEnabled((prev) => !prev)}
                        className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                      >
                        {twoFactorEnabled ? "Manage" : "Enable"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold">Active sessions</h4>
                      <p className="text-xs text-muted-foreground">Devices currently signed in to your account.</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary"
                    >
                      Sign out other sessions
                    </button>
                  </div>

                  <div className="mt-3 divide-y divide-border rounded-lg border border-border">
                    {sessions.length > 0 ? (
                      sessions.map((session) => (
                        <div key={`${session.device}-${session.location}`} className="flex items-center justify-between gap-3 px-3 py-2.5">
                          <div>
                            <div className="text-sm font-medium">
                              {session.device}
                              {session.current ? (
                                <span className="ml-2 rounded-full bg-[var(--brand-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand)]">
                                  Current
                                </span>
                              ) : null}
                            </div>
                            <div className="text-xs text-muted-foreground">{session.location}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{session.lastActive}</div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">
                        No active sessions found.
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold">Login alerts</h4>
                      <p className="text-xs text-muted-foreground">Get notified when a new device signs in.</p>
                    </div>
                    <Toggle on={loginAlerts} ariaLabel="Toggle login alerts" onChange={setLoginAlerts} />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">Billing</h3>
              <p className="text-sm text-muted-foreground">Review plan, payment details, and invoices.</p>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-border bg-background p-4">
                  <h4 className="text-sm font-semibold">Plan summary</h4>
                  <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <dt className="text-xs text-muted-foreground">Tier</dt>
                      <dd className="text-sm font-medium">Team</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Renewal date</dt>
                      <dd className="text-sm font-medium">June 1, 2026</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Seats</dt>
                      <dd className="text-sm font-medium">6 active</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold">Payment method</h4>
                      <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                    >
                      Update card
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold">Billing address</h4>
                    <button type="button" className="text-sm font-medium text-[var(--brand)] hover:underline">
                      Edit
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Morgan Capital LLC
                    <br />
                    548 Market St, Suite 72103
                    <br />
                    San Francisco, CA 94104
                    <br />
                    United States
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <h4 className="text-sm font-semibold">Recent invoices</h4>
                  <div className="mt-3 rounded-lg border border-border">
                    {invoices.length > 0 ? (
                      <div className="divide-y divide-border">
                        {invoices.map((invoice) => (
                          <div key={invoice.id} className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5">
                            <div className="min-w-0">
                              <div className="text-sm font-medium">{invoice.date}</div>
                              <div className="text-xs text-muted-foreground">{invoice.amount}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-[oklch(0.94_0.08_150)] px-2.5 py-1 text-xs font-medium text-[oklch(0.35_0.14_150)]">
                                {invoice.status}
                              </span>
                              <button
                                type="button"
                                className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">
                        No recent invoices yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </PageShell>
    </AppLayout>
  );
}

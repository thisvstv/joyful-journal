import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/Topbar";
import { useTheme } from "@/hooks/use-theme";
import { isAuthenticated, signOut, getProfile } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Profile — Vault Ledger" },
      {
        name: "description",
        content: "User account management, firm details, and application preferences.",
      },
    ],
  }),
});

function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfileState] = useState({ fullName: "", email: "", company: "", phone: "" });
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const p = getProfile();
    if (p) setProfileState(p);
  }, []);

  const initials = profile.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <AppLayout>
      <PageShell>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Profile Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            User account management, firm details, and application preferences.
          </p>
        </div>

        {/* User header */}
        <div className="mt-6 flex items-center gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-deep)] text-lg font-bold text-white">
            {initials}
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold">{profile.fullName || "User"}</div>
            <div className="text-sm text-muted-foreground">Senior Managing Partner</div>
          </div>
          <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary">
            Edit Profile
          </button>
        </div>

        {/* Two-column info */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Personal Information */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Personal Information</h3>
              <button className="text-xs font-medium text-[var(--brand)] hover:underline">
                Edit
              </button>
            </div>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-xs text-muted-foreground">Full Name</dt>
                <dd className="text-sm font-medium">{profile.fullName || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Email Address</dt>
                <dd className="text-sm font-medium">{profile.email || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Phone Number</dt>
                <dd className="text-sm font-medium">{profile.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Timezone</dt>
                <dd className="text-sm font-medium">Eastern Time (ET)</dd>
              </div>
            </dl>
          </div>

          {/* Firm Details */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Firm Details</h3>
              <span className="rounded-full bg-[oklch(0.94_0.08_150)] px-2.5 py-0.5 text-[11px] font-medium text-[oklch(0.35_0.14_150)]">
                Verified Entity
              </span>
            </div>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-xs text-muted-foreground">Firm Name</dt>
                <dd className="text-sm font-medium">{profile.company || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Account Type</dt>
                <dd className="text-sm font-medium">Institutional Ledger</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Headquarters Address</dt>
                <dd className="text-sm font-medium">
                  1200 Avenue of the Americas, Suite 4500
                  <br />
                  New York, NY 10036
                </dd>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--brand)]">
                  2FA Enabled
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  High Security Level
                </span>
              </div>
            </dl>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-8">
          <h2 className="text-xl font-bold tracking-tight">Account Settings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your security and application preferences.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div>
              <div className="text-sm font-semibold">Password &amp; Security</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Last updated 45 days ago</div>
            </div>
            <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary">
              Update
            </button>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div>
              <div className="text-sm font-semibold">Email Notifications</div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                Alerts for ledger updates and document uploads
              </div>
            </div>
            <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary">
              Configure
            </button>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div>
              <div className="text-sm font-semibold">Dark Mode</div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                Switch application to deep contrast mode
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isDark ? "bg-[var(--brand)]" : "bg-secondary"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  isDark ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <button
            onClick={() => {
              signOut();
              navigate({ to: "/login" });
            }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm text-sm font-medium text-destructive hover:bg-secondary"
          >
            Sign Out
          </button>
        </div>
      </PageShell>
    </AppLayout>
  );
}

import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/Topbar";
import { isAuthenticated } from "@/lib/auth";
import { FileText, CheckCircle2, AlertCircle, Shield, CreditCard, User } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: NotificationsPage,
  head: () => ({
    meta: [
      { title: "Notifications — Vault Ledger" },
      { name: "description", content: "View your notification history." },
    ],
  }),
});

const allNotifications = [
  {
    id: 1,
    icon: FileText,
    title: "Report Q2 finalized",
    description: "Your Q2 financial report has been finalized and is ready for review.",
    time: "Today, 9:42 AM",
    category: "Reports",
    unread: true,
  },
  {
    id: 2,
    icon: CheckCircle2,
    title: "Approval request",
    description: "Alex Thompson requested your approval on transaction #TX-2847.",
    time: "Today, 7:15 AM",
    category: "Approvals",
    unread: true,
  },
  {
    id: 3,
    icon: AlertCircle,
    title: "New message from support",
    description: "Support team responded to your ticket regarding document upload.",
    time: "Yesterday, 3:28 PM",
    category: "Messages",
    unread: false,
  },
  {
    id: 4,
    icon: Shield,
    title: "Security alert",
    description: "New sign-in from Chrome on Windows, Seattle, US.",
    time: "Yesterday, 11:02 AM",
    category: "Security",
    unread: false,
  },
  {
    id: 5,
    icon: CreditCard,
    title: "Invoice paid",
    description: "Invoice INV-2498 for $120.00 has been paid successfully.",
    time: "May 14, 2026",
    category: "Billing",
    unread: false,
  },
  {
    id: 6,
    icon: User,
    title: "Profile updated",
    description: "Your profile information was updated successfully.",
    time: "May 12, 2026",
    category: "Account",
    unread: false,
  },
  {
    id: 7,
    icon: FileText,
    title: "Weekly digest",
    description: "Your weekly summary for May 4–10 is ready. 3 reports finalized.",
    time: "May 11, 2026",
    category: "Reports",
    unread: false,
  },
  {
    id: 8,
    icon: CheckCircle2,
    title: "Document approved",
    description: "Q1 Audit Report has been approved by all parties.",
    time: "May 9, 2026",
    category: "Approvals",
    unread: false,
  },
];

function NotificationsPage() {
  const unreadCount = allNotifications.filter((n) => n.unread).length;

  return (
    <AppLayout>
      <PageShell>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Notifications</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "All caught up"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary">
              Mark all as read
            </button>
          )}
        </div>

        <div className="mt-6 space-y-2">
          {allNotifications.length > 0 ? (
            allNotifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-4 rounded-2xl border p-4 transition-colors ${
                  n.unread
                    ? "border-[var(--brand)]/20 bg-[var(--brand-soft)]/30"
                    : "border-border bg-card"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    n.unread ? "bg-[var(--brand-soft)]" : "bg-secondary"
                  }`}
                >
                  <n.icon
                    className={`h-5 w-5 ${
                      n.unread ? "text-[var(--brand)]" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{n.title}</span>
                    {n.unread && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" />
                    )}
                    <span className="ml-auto text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{n.description}</p>
                  <span className="mt-1.5 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {n.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          )}
        </div>
      </PageShell>
    </AppLayout>
  );
}

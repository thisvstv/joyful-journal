# Settings Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the Settings page with full Security, Notifications, and Billing sections while keeping a single-page layout and adding an account overview sidebar.

**Architecture:** All UI stays in `src/routes/settings.tsx` with in-file section markup and static data arrays that can later be replaced by API data. No routing changes or new components are introduced.

**Tech Stack:** React 19, TanStack Router, Tailwind CSS, lucide-react.

---

## File Structure

- Modify: `src/routes/settings.tsx`

---

### Task 1: Update icons and add static data sources

**Files:**

- Modify: `src/routes/settings.tsx`

- [ ] **Step 1: Update lucide-react imports**

```tsx
import {
  Check,
  Shield,
  Bell,
  CreditCard,
  Lock,
  Laptop,
  Smartphone,
  Mail,
  FileText,
  Download,
} from "lucide-react";
```

- [ ] **Step 2: Add static data under the route definition**

```tsx
const securitySessions = [
  {
    device: "MacBook Pro (Chrome)",
    location: "San Francisco, CA",
    lastActive: "Active now",
    icon: Laptop,
    current: true,
  },
  {
    device: "iPhone 14 Pro (Safari)",
    location: "New York, NY",
    lastActive: "2 days ago",
    icon: Smartphone,
    current: false,
  },
  {
    device: "Windows Desktop (Edge)",
    location: "Austin, TX",
    lastActive: "Oct 12, 2023",
    icon: Laptop,
    current: false,
  },
];

const notificationChannels = [
  { label: "Email", description: "Critical updates and summaries.", on: true, icon: Mail },
  { label: "SMS", description: "Urgent alerts for approvals.", on: false, icon: Smartphone },
  { label: "In-app", description: "Real-time notifications in the portal.", on: true, icon: Bell },
];

const notificationEvents = [
  {
    label: "Report status updates",
    description: "Under Review, Finalized, or Reopened.",
    on: true,
  },
  { label: "Approvals and sign-offs", description: "When you are needed to approve.", on: true },
  { label: "Thread messages", description: "Replies from your advisor.", on: true },
  { label: "Weekly digest", description: "Monday summary of activity.", on: false },
];

const quietHours = { enabled: false, start: "22:00", end: "06:00" };

const invoices = [
  { id: "INV-1032", date: "Oct 01, 2023", amount: "$2,400", status: "Paid" },
  { id: "INV-1017", date: "Sep 01, 2023", amount: "$2,400", status: "Paid" },
  { id: "INV-1001", date: "Aug 01, 2023", amount: "$2,400", status: "Paid" },
];
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/settings.tsx
git commit -m "feat: add settings section seed data"
```

---

### Task 2: Replace left column with account overview and quick actions

**Files:**

- Modify: `src/routes/settings.tsx`

- [ ] **Step 1: Replace the `<nav>` block with the new sidebar layout**

```tsx
<div className="space-y-6">
  <section className="rounded-2xl border border-border bg-card p-6">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-deep)]" />
      <div>
        <div className="text-sm font-semibold">Alex Morgan</div>
        <div className="text-xs text-muted-foreground">Morgan Capital LLC</div>
      </div>
    </div>
    <div className="mt-5 space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Plan</span>
        <span className="font-medium">Advisor Pro</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Renewal</span>
        <span className="font-medium">Nov 15, 2026</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Last login</span>
        <span className="font-medium">Today, 10:42 AM</span>
      </div>
    </div>
    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-medium text-[var(--brand)]">
      <Check className="h-3.5 w-3.5" />
      Verified account
    </div>
  </section>

  <section className="rounded-2xl border border-border bg-card p-6">
    <h3 className="text-lg font-semibold">Quick Actions</h3>
    <div className="mt-4 space-y-2">
      <button className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-secondary">
        <span className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-[var(--brand)]" />
          Enable two-factor authentication
        </span>
        <span className="text-xs text-muted-foreground">Recommended</span>
      </button>
      <button className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-secondary">
        <span className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-[var(--brand)]" />
          Update payment method
        </span>
        <span className="text-xs text-muted-foreground">Visa ending 4821</span>
      </button>
      <button className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-secondary">
        <span className="flex items-center gap-2">
          <Download className="h-4 w-4 text-[var(--brand)]" />
          Download invoices
        </span>
        <span className="text-xs text-muted-foreground">Last 90 days</span>
      </button>
    </div>
  </section>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/settings.tsx
git commit -m "feat: add account overview sidebar"
```

---

### Task 3: Add the Security section

**Files:**

- Modify: `src/routes/settings.tsx`

- [ ] **Step 1: Insert the Security section below Profile**

```tsx
<section className="rounded-2xl border border-border bg-card p-6">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold">Security</h3>
      <p className="text-sm text-muted-foreground">Protect access to your account.</p>
    </div>
    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-medium text-[var(--brand)]">
      <Shield className="h-3.5 w-3.5" />
      Recommended
    </div>
  </div>

  <div className="mt-5 grid gap-4 lg:grid-cols-2">
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Lock className="h-4 w-4 text-[var(--brand)]" />
          Change password
        </div>
        <button className="text-xs font-medium text-[var(--brand)] hover:underline">Update</button>
      </div>
      <div className="mt-3 grid gap-2">
        <input
          className="h-9 rounded-lg border border-border bg-card px-3 text-sm"
          placeholder="Current password"
          type="password"
        />
        <input
          className="h-9 rounded-lg border border-border bg-card px-3 text-sm"
          placeholder="New password"
          type="password"
        />
        <input
          className="h-9 rounded-lg border border-border bg-card px-3 text-sm"
          placeholder="Confirm new password"
          type="password"
        />
      </div>
    </div>

    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Two-factor authentication</div>
          <div className="text-xs text-muted-foreground">Add an extra layer of protection.</div>
        </div>
        <button className="rounded-lg bg-[var(--brand)] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
          Enable
        </button>
      </div>
      <div className="mt-4 text-xs text-muted-foreground">Status: Disabled</div>
    </div>
  </div>

  <div className="mt-5 grid gap-4 lg:grid-cols-2">
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Active sessions</div>
          <div className="text-xs text-muted-foreground">Devices currently signed in.</div>
        </div>
        <button className="text-xs font-medium text-[var(--brand)] hover:underline">
          Sign out others
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {securitySessions.map((s) => (
          <div key={s.device} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
                <s.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">{s.device}</div>
                <div className="text-xs text-muted-foreground">{s.location}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {s.lastActive}
              {s.current ? " (current)" : ""}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Login alerts</div>
          <div className="text-xs text-muted-foreground">Notify me about new sign-ins.</div>
        </div>
        <Toggle on={true} />
      </div>
      <div className="mt-4 text-xs text-muted-foreground">
        Email and in-app alerts for any new device.
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/settings.tsx
git commit -m "feat: add settings security section"
```

---

### Task 4: Rebuild Notifications section

**Files:**

- Modify: `src/routes/settings.tsx`

- [ ] **Step 1: Replace the existing Notifications section with the new layout**

```tsx
<section className="rounded-2xl border border-border bg-card p-6">
  <h3 className="text-lg font-semibold">Notifications</h3>
  <p className="text-sm text-muted-foreground">Choose how and when we reach you.</p>

  <div className="mt-5 grid gap-4 lg:grid-cols-2">
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-sm font-semibold">Channels</div>
      <div className="mt-3 space-y-3">
        {notificationChannels.map((c) => (
          <div key={c.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
                <c.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium">{c.label}</div>
                <div className="text-xs text-muted-foreground">{c.description}</div>
              </div>
            </div>
            <Toggle on={c.on} />
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-sm font-semibold">Events</div>
      <div className="mt-3 space-y-3">
        {notificationEvents.map((n) => (
          <div key={n.label} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{n.label}</div>
              <div className="text-xs text-muted-foreground">{n.description}</div>
            </div>
            <Toggle on={n.on} />
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="mt-4 rounded-xl border border-border bg-background p-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold">Quiet hours</div>
        <div className="text-xs text-muted-foreground">Pause non-urgent alerts overnight.</div>
      </div>
      <Toggle on={quietHours.enabled} />
    </div>
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <label className="block text-xs text-muted-foreground">
        Start
        <input
          className="mt-1 h-9 w-full rounded-lg border border-border bg-card px-3 text-sm disabled:opacity-60"
          type="time"
          defaultValue={quietHours.start}
          disabled={!quietHours.enabled}
        />
      </label>
      <label className="block text-xs text-muted-foreground">
        End
        <input
          className="mt-1 h-9 w-full rounded-lg border border-border bg-card px-3 text-sm disabled:opacity-60"
          type="time"
          defaultValue={quietHours.end}
          disabled={!quietHours.enabled}
        />
      </label>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/settings.tsx
git commit -m "feat: rebuild settings notifications section"
```

---

### Task 5: Add Billing section

**Files:**

- Modify: `src/routes/settings.tsx`

- [ ] **Step 1: Insert the Billing section after Notifications**

```tsx
<section className="rounded-2xl border border-border bg-card p-6">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold">Billing</h3>
      <p className="text-sm text-muted-foreground">Plan, payment method, and invoices.</p>
    </div>
    <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary">
      Manage billing
    </button>
  </div>

  <div className="mt-5 grid gap-4 lg:grid-cols-2">
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-background p-4">
        <div className="text-sm font-semibold">Plan summary</div>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-medium">Advisor Pro</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Seats</span>
            <span className="font-medium">12 seats</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Renews</span>
            <span className="font-medium">Nov 15, 2026</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CreditCard className="h-4 w-4 text-[var(--brand)]" />
            Payment method
          </div>
          <button className="text-xs font-medium text-[var(--brand)] hover:underline">
            Update
          </button>
        </div>
        <div className="mt-3 text-sm">Visa ending 4821</div>
        <div className="text-xs text-muted-foreground">Expires 04/28</div>
      </div>

      <div className="rounded-xl border border-border bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Billing address</div>
          <button className="text-xs font-medium text-[var(--brand)] hover:underline">Edit</button>
        </div>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <div>Morgan Capital LLC</div>
          <div>450 Mission St, Suite 1800</div>
          <div>San Francisco, CA 94105</div>
          <div>United States</div>
        </div>
      </div>
    </div>

    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Recent invoices</div>
        <button className="text-xs font-medium text-[var(--brand)] hover:underline">
          View all
        </button>
      </div>
      <div className="mt-3 space-y-3">
        {invoices.map((i) => (
          <div key={i.id} className="flex items-center justify-between text-sm">
            <div>
              <div className="font-medium">{i.id}</div>
              <div className="text-xs text-muted-foreground">{i.date}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-muted-foreground">{i.amount}</div>
              <span className="rounded-full bg-[oklch(0.94_0.08_150)] px-2.5 py-1 text-xs font-medium text-[oklch(0.35_0.14_150)]">
                {i.status}
              </span>
              <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/settings.tsx
git commit -m "feat: add billing section"
```

---

### Task 6: Manual verification

**Files:**

- Modify: none

- [ ] **Step 1: Run the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify layout and content**
- Confirm sidebar card and quick actions render cleanly.
- Confirm Security, Notifications, and Billing sections are visible and aligned.
- Check mobile layout at ~375px width.

- [ ] **Step 3: Optional lint check**

```bash
npm run lint
```

- [ ] **Step 4: Commit (if any adjustments were made)**

```bash
git add src/routes/settings.tsx
git commit -m "chore: polish settings layout"
```

---

## Self-review checklist

- Spec coverage: Security, Notifications, Billing sections are fully implemented with the required content and layout.
- No placeholders: all data and UI copy are concrete.
- Consistency: button styles and spacing match existing design language.

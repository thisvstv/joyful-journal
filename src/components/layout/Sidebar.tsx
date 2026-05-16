import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  History,
  BarChart3,
  HelpCircle,
  Settings,
  LogOut,
  Upload,
} from "lucide-react";

const nav = [
  { to: "/", icon: LayoutGrid, label: "Dashboard" },
  { to: "/history", icon: History, label: "History" },
  { to: "/reports", icon: BarChart3, label: "Reports" },
  { to: "/support", icon: HelpCircle, label: "Support" },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-background px-4 py-6">
      <Link to="/" className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
          <span className="text-sm font-bold">VL</span>
        </div>
        <div>
          <div className="text-sm font-semibold">Vault Ledger</div>
          <div className="text-xs text-muted-foreground">Secure Client Portal</div>
        </div>
      </Link>

      <nav className="mt-10 flex flex-col gap-1">
        {nav.map(({ to, icon: Icon, label }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-[var(--brand-soft)] font-semibold text-[var(--brand)]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {active && (
                <span className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-[var(--brand)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <button className="flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90">
          <Upload className="h-4 w-4" />
          Upload Documents
        </button>
        <div className="border-t border-border pt-4">
          <Link
            to="/settings"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              pathname === "/settings"
                ? "font-semibold text-[var(--brand)]"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}

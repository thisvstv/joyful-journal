import { Search, Moon, Bell } from "lucide-react";

export function Topbar({ placeholder = "Search reports, transactions..." }: { placeholder?: string }) {
  return (
    <div className="flex items-center gap-4 px-8 pt-6">
      <div className="relative flex-1 max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder={placeholder}
          className="h-11 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[var(--brand)]/30"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary">
          <Moon className="h-4 w-4" />
        </button>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="ml-2 h-9 w-px bg-border" />
        <div className="ml-2 h-10 w-10 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-deep)]" />
      </div>
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="px-8 pb-10 pt-4">{children}</div>;
}

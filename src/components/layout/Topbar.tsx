import {
  Search,
  Moon,
  Bell,
  Sun,
  User,
  Settings,
  LogOut,
  AlertCircle,
  FileText,
  CheckCircle2,
  Command,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";
import { signOut, getProfile } from "@/lib/auth";

const notifications = [
  {
    id: 1,
    icon: FileText,
    title: "Report Q2 finalized",
    description: "Your Q2 financial report has been finalized.",
    time: "5m ago",
    unread: true,
  },
  {
    id: 2,
    icon: CheckCircle2,
    title: "Approval request",
    description: "Alex requested your approval on a transaction.",
    time: "2h ago",
    unread: true,
  },
  {
    id: 3,
    icon: AlertCircle,
    title: "New message",
    description: "You have a new message from support.",
    time: "1d ago",
    unread: false,
  },
];

export function Topbar() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [profileName, setProfileName] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const p = getProfile();
    if (p?.fullName) setProfileName(p.fullName);
  }, []);

  function handleSignOut() {
    signOut();
    navigate({ to: "/login" });
  }

  const initials = profileName
    ? profileName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="flex items-center justify-between flex-1 gap-4">
      {/* Search - desktop */}
      <div className="relative hidden sm:block flex-1 max-w-md lg:max-w-lg">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search documents, reports..."
          className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-10 text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--brand)]/30 focus:shadow-sm"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </div>

      {/* Search - mobile icon */}
      <button
        onClick={() => setMobileSearchOpen((o) => !o)}
        className="flex sm:hidden h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary"
      >
        <Search className="h-4 w-4" />
      </button>

      {mobileSearchOpen && (
        <div className="absolute inset-x-0 top-16 z-50 border-b border-border bg-background px-4 pb-4 pt-2 sm:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              placeholder="Search..."
              className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
              onBlur={() => setMobileSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        <button
          onClick={toggleTheme}
          aria-pressed={!!isDark}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 sm:w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-[var(--brand-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--brand)]">
                  {unreadCount} new
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <DropdownMenuItem key={n.id} className="items-start gap-3 p-3 cursor-default">
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      n.unread ? "bg-[var(--brand-soft)]" : "bg-secondary"
                    }`}
                  >
                    <n.icon
                      className={`h-3.5 w-3.5 ${
                        n.unread ? "text-[var(--brand)]" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{n.title}</span>
                      {n.unread && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{n.description}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</p>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate({ to: "/notifications" })}
              className="justify-center text-xs text-muted-foreground"
            >
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mx-1 h-6 w-px bg-border" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-deep)] text-[11px] font-bold text-white ring-offset-background transition-shadow hover:ring-2 hover:ring-[var(--brand)]/30">
              {initials}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="text-xs font-normal text-muted-foreground">Account</div>
              <div className="text-sm font-medium">{profileName || "User"}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="px-4 sm:px-8 pb-10 pt-6">{children}</div>;
}

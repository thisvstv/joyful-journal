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

export function Topbar({
  placeholder = "Search reports, transactions...",
}: {
  placeholder?: string;
}) {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    const p = getProfile();
    if (p?.fullName) setProfileName(p.fullName);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

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
    <div className="flex items-center gap-2 sm:gap-4 flex-1">
      <div className="relative flex-1 max-w-2xl">
        <Search className="pointer-events-none absolute left-3 sm:left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder={placeholder}
          className="h-10 sm:h-11 w-full rounded-full border border-border bg-card pl-9 sm:pl-11 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[var(--brand)]/30"
        />
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={toggleTheme}
          aria-pressed={!!isDark}
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 sm:right-2.5 sm:top-2.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 sm:w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
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

        <div className="ml-1 sm:ml-2 h-9 w-px bg-border" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 sm:ml-2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-deep)] text-xs font-bold text-white ring-offset-background transition-shadow hover:ring-2 hover:ring-[var(--brand)]/30">
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
  return <div className="px-4 sm:px-8 pb-10 pt-4">{children}</div>;
}

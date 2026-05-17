import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { signIn, isAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Sign In — Vault Ledger" }],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const ok = signIn(email.trim(), password.trim());
    if (ok) {
      navigate({ to: "/" });
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-foreground text-background">
            <span className="text-lg font-bold">VL</span>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Vault Ledger</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to access your account.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
            />
          </label>

          {error ? (
            <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <button className="w-full rounded-lg bg-[var(--brand)] py-2.5 text-sm font-medium text-white hover:opacity-90">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

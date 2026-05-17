export function isAuthenticated() {
  if (typeof window === "undefined") return true; // allow on server
  return !!localStorage.getItem("auth_token");
}

export function signIn(email: string, password: string) {
  // Mock sign in: accept any non-empty credentials
  if (email && password) {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", "mock-token");
      localStorage.setItem(
        "profile",
        JSON.stringify({ fullName: email.split("@")[0], email, company: "", phone: "" }),
      );
    }
    return true;
  }
  return false;
}

export function signOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
}

export function getProfile() {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("profile");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setProfile(profile: Record<string, string>) {
  if (typeof window !== "undefined") {
    localStorage.setItem("profile", JSON.stringify(profile));
  }
}

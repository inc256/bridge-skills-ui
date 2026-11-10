import { useRouter } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { login, getCurrentUserRole } from "@/lib/api";

const ALLOWED_ROLES = ["admin", "super_admin", "staff"];

export function AdminAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const session = await login(email.trim(), password, keepSignedIn);

      const role = await getCurrentUserRole(session?.access);

      if (!role) {
        // Could not resolve role at all (endpoint missing / JWT has no claim).
        // Log this during setup so you can pinpoint the fix.
        console.warn("Could not determine user role after login.", session);
        setError("Unable to verify account permissions. Please try again.");
        setLoading(false);
        return;
      }

      if (!ALLOWED_ROLES.includes(role)) {
        setError("This account does not have admin access.");
        setLoading(false);
        return;
      }

      await router.navigate({ to: "/admin/dashboard" });
    } catch (err: unknown) {
      const message = err instanceof Error
        ? err.message
        : typeof err === "string"
          ? err
          : JSON.stringify(err) || "Unable to sign in. Please try again.";
      const status = typeof err === "object" && err !== null && "status" in err && typeof err.status === "number"
        ? err.status
        : undefined;
      setError(status ? `Sign-in failed (${status}): ${message}` : message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-screen">
      <section className="auth-image" aria-label="Students working together">
        <img src="/hero-5.webp" alt="Students working together" />
      </section>

      <section className="auth-form-section">
        <div className="auth-content">
          <h1>Join For Success</h1>
          <p className="auth-subtitle">
            Sign in to securely access the TechBridge admin portal.
          </p>

          <div className="auth-toggle" role="tablist" aria-label="Account action">
            <button type="button" className="active" role="tab" aria-selected="true">
              Log In
            </button>
            <button type="button" role="tab" aria-selected="false" disabled>
              Sign Up
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label htmlFor="admin-auth-email">Email</label>
              <input
                id="admin-auth-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@techbridgeskills.ug"
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="admin-auth-password">Password</label>
              <input
                id="admin-auth-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="auth-error" role="alert">
                <AlertCircle aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Please wait..." : "Log In"}
            </button>

            <div className="auth-options">
              <button
                className="auth-forgot"
                type="button"
                onClick={() => setError("Password reset functionality coming soon.")}
              >
                Forgot password?
              </button>
              <label className="auth-remember">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(event) => setKeepSignedIn(event.target.checked)}
                />
                Remember Me
              </label>
            </div>

            <div className="auth-divider">
              <span>Or Sign Up with</span>
            </div>

            <div className="auth-social-buttons">
              <button className="auth-social-button" type="button" aria-label="Continue with Google">
                <img src="/google-color-svgrepo-com.svg" alt="" aria-hidden="true" />
              </button>
              <button className="auth-social-button" type="button" aria-label="Continue with Apple">
                <img src="/apple-svgrepo-com.svg" alt="" aria-hidden="true" />
              </button>
            </div>

            <p className="auth-terms">
              By signing up, you agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
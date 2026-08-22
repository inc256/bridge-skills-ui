import { useRouter } from "@tanstack/react-router";
import { ArrowRight, Shield, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { login, register, getCurrentUserRole } from "@/lib/api";

const ALLOWED_ROLES = ["admin", "super_admin", "staff"];

export function AdminAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password2, setPassword2] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password || (isRegistering && (!firstName.trim() || !password2))) {
      setError("Please complete all required fields.");
      return;
    }
    if (isRegistering && password !== password2) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      if (isRegistering) {
        await register({ email: email.trim(), username: email.trim().split("@")[0], password, password2, first_name: firstName.trim(), last_name: lastName.trim(), role: "admin" });
      }
      const session = await login(email.trim(), password);

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
      setError(err instanceof Error ? err.message : "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7F2] flex items-center justify-center p-4">
      <div className="w-full max-w-[380px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">{isRegistering ? "Create Admin Account" : "Admin Sign In"}</h1>
          <p className="text-sm text-gray-400 mb-6">{isRegistering ? "Create an account for the admin portal." : "Enter your credentials to access the admin portal."}</p>

          {error && (
            <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegistering && (
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First name" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none" required autoComplete="given-name" />
                <input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Last name" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none" autoComplete="family-name" />
              </div>
            )}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@techbridgeskills.ug"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                required
                autoComplete="email"
              />
            </div>

            {isRegistering && <input type="password" value={password2} onChange={(event) => setPassword2(event.target.value)} placeholder="Confirm password" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none" required autoComplete="new-password" />}

            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {isRegistering ? "Creating account…" : "Signing in…"}
                </>
              ) : (
                <>
                  {isRegistering ? "Create account" : "Sign in"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
          <button type="button" onClick={() => { setIsRegistering((current) => !current); setError(null); }} className="mt-5 w-full text-sm font-medium text-primary hover:opacity-80">
            {isRegistering ? "Already have an account? Sign in" : "Create admin account"}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          TechBridge Skills Hub © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
// apps/student/src/components/student-auth-page.tsx
import { useRouter } from "@tanstack/react-router";
import { 
  ArrowRight, Mail, Lock, Eye, EyeOff,
  Shield, CheckCircle, AlertCircle, GraduationCap
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { getProfile, register } from "@/lib/api";

export function StudentAuthPage() {
  const router = useRouter();
  const { login: authLogin, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password2, setPassword2] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (!email.trim() || !password.trim() || (isRegistering && (!firstName.trim() || !password2.trim()))) {
        setError(isRegistering ? "Please complete all required fields." : "Please enter both email and password.");
        setLoading(false);
        return;
      }

      if (isRegistering && password !== password2) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      console.log("Attempting login for:", email.trim());
      
      try {
        if (isRegistering) {
          const session = await register({
            email: email.trim(),
            username: email.trim().split("@")[0],
            password,
            password2,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            role: "student",
          }, keepSignedIn);
          if (session?.access) {
            const profile = await getProfile();
            setUser(profile);
          } else {
            await authLogin(email.trim(), password, keepSignedIn);
          }
        } else {
          await authLogin(email.trim(), password, keepSignedIn);
        }
        console.log("Login successful, navigating to dashboard...");
        await router.navigate({ to: "/student/dashboard" });
      } catch (err: unknown) {
        console.error("Login error:", err);
        setError(err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : JSON.stringify(err) || "Unable to create your account. Please try again.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err instanceof Error ? err.message : "Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Don't render on server, show loading state
  if (!isClient) {
    return (
      <div className="flex h-dvh items-center justify-center overflow-hidden bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="auth-page relative flex h-dvh items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 px-2 py-2 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 sm:px-4 sm:py-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.08),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(74,222,128,0.05),transparent_50%)]" />
      <div className="absolute left-[-10rem] top-[-10rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-10rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-sky-400/5 blur-3xl" />

      <div className="auth-shell w-full max-w-md max-h-full">
        <div className="auth-card rounded-[32px] border border-gray-200 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 p-4 shadow-lg dark:border-gray-700 dark:from-gray-800/50 dark:via-gray-800 dark:to-gray-800/50 sm:p-6">
          <div className="auth-panel rounded-[28px] border border-gray-200 bg-white/95 p-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95 sm:p-6">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 sm:mb-3 sm:h-14 sm:w-14">
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400 sm:h-7 sm:w-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-[28px]">
                {isRegistering ? "Create student account" : "Student Sign In"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isRegistering ? "Start learning with TechBridge" : "Welcome back to your courses"}
              </p>
            </div>

            <form className="mt-4 space-y-3 sm:mt-5 sm:space-y-4" onSubmit={handleSubmit}>
              {isRegistering && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First name" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none" required autoComplete="given-name" />
                  <input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Last name" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none" autoComplete="family-name" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="student@example.com"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 pl-10 pr-12 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {isRegistering && (
                <input type="password" value={password2} onChange={(event) => setPassword2(event.target.value)} placeholder="Confirm password" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none" required autoComplete="new-password" />
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={keepSignedIn}
                    onChange={(event) => setKeepSignedIn(event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  Keep me signed in
                </label>
                <button 
                  type="button" 
                  className="font-medium text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-700 dark:hover:text-blue-300"
                  onClick={() => {
                    setError("Password reset functionality coming soon.");
                  }}
                >
                  Reset password
                </button>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70 shadow-sm hover:shadow-md"
              >
                  {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                    {isRegistering ? "Creating account…" : "Signing in…"}
                  </span>
                ) : (
                  <>
                    {isRegistering ? "Create account" : "Sign in"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-gray-200 pt-3 dark:border-gray-700 sm:mt-5 sm:gap-3 sm:pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isRegistering ? "Already have an account?" : "Don't have an account?"}
              </p>
              <button 
                type="button" 
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                onClick={() => {
                  setIsRegistering((current) => !current);
                  setError(null);
                }}
              >
                {isRegistering ? "Sign in" : "Create account"}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 sm:mt-4">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-blue-500" />
                Secure
              </span>
              <span className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
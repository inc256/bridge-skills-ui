import { useRouter } from "@tanstack/react-router";
import { ArrowRight, Mail, Lock, Eye, EyeOff, BriefcaseBusiness, AlertCircle } from "lucide-react";
import { useState } from "react";
import { login } from "@/lib/api";

export function TutorAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Validate inputs
      if (!email.trim() || !password.trim()) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
      }

      console.log("Attempting login for:", email.trim());
      
      // Call the login function
      const session = await login(email.trim(), password);
      
      if (!session) {
        setError("Invalid credentials. Please check your email and password.");
        setLoading(false);
        return;
      }

      if (!session.access) {
        setError("Authentication failed. No access token received.");
        setLoading(false);
        return;
      }

      console.log("Login successful, navigating to tutor dashboard...");
      await router.navigate({ to: "/tutor/dashboard" });
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Handle specific error messages
      const errorMessage = err.message || "Unable to sign in right now. Please try again.";
      
      if (errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
        setError("Invalid email or password. Please try again.");
      } else if (errorMessage.includes("NetworkError") || errorMessage.includes("fetch")) {
        setError("Network error. Please check your connection and try again.");
      } else if (errorMessage.includes("token not valid")) {
        setError("Authentication service error. Please try again later.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute left-[-10rem] top-[-10rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-10rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl -z-10" />

      {/* Centered Auth Card */}
      <div className="w-full max-w-md px-4">
        <div className="rounded-[32px] border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-800/50 dark:via-gray-800 dark:to-gray-800/50 p-6 shadow-lg sm:p-8">
          <div className="rounded-[28px] border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <BriefcaseBusiness className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-[28px] font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Sign in
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
              Instructor workspace
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
                    placeholder="instructor@example.com"
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

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
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
                    Signing in…
                  </span>
                ) : (
                  <>
                    Enter workspace
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
// apps/student/src/components/student-auth-page.tsx
import { useRouter } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
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
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (!email.trim() || !password.trim() || (isRegistering && !fullName.trim())) {
        setError(isRegistering ? "Please complete all required fields." : "Please enter both email and password.");
        setLoading(false);
        return;
      }

      try {
        if (isRegistering) {
          const [first_name, ...lastNameParts] = fullName.trim().split(/\s+/);
          const session = await register({
            email: email.trim(),
            username: email.trim().split("@")[0],
            password,
            password2: password,
            first_name,
            last_name: lastNameParts.join(" "),
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

  // Don't render on server, show loading state
  if (!isClient) {
    return (
      <div className="flex h-dvh items-center justify-center overflow-hidden bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600" />
      </div>
    );
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
            Ready to take the next step towards the bright feature with us? Create your account now!
          </p>

          <div className="auth-toggle" role="tablist" aria-label="Choose an account action">
            <button
              type="button"
              role="tab"
              aria-selected={!isRegistering}
              className={!isRegistering ? "active" : ""}
              onClick={() => {
                setIsRegistering(false);
                setError(null);
              }}
            >
              Log In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isRegistering}
              className={isRegistering ? "active" : ""}
              onClick={() => {
                setIsRegistering(true);
                setError(null);
              }}
            >
              Sign Up
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="auth-input-group">
                <label htmlFor="student-auth-name">Full Name</label>
                <input
                  id="student-auth-name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                />
              </div>
            )}

            <div className="auth-input-group">
              <label htmlFor="student-auth-email">Email</label>
              <input
                id="student-auth-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="student@gmail.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="student-auth-password">Password</label>
              <input
                id="student-auth-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••"
                autoComplete={isRegistering ? "new-password" : "current-password"}
                required
              />
            </div>

            {error && (
              <div className="auth-error" role="alert">
                <AlertCircle aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Please wait..." : isRegistering ? "Sign Up" : "Log In"}
            </button>

            <div className="auth-options">
              <button
                className="auth-forgot"
                type="button"
                onClick={() => setError("Password reset functionality coming soon.")}
                hidden={isRegistering}
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
              <span>{isRegistering ? "Or Log In with" : "Or Sign Up with"}</span>
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
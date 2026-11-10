import { useRouter } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { register } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export function TutorAuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Validate inputs
      if (!email.trim() || !password.trim() || (isRegistering && !fullName.trim())) {
        setError(isRegistering ? "Please complete all required fields." : "Please enter both email and password.");
        setLoading(false);
        return;
      }

      if (isRegistering) {
        const [first_name, ...lastNameParts] = fullName.trim().split(/\s+/);
        await register({
          email: email.trim(),
          username: email.trim().split("@")[0],
          password,
          password2: password,
          first_name,
          last_name: lastNameParts.join(" "),
          role: "instructor",
        });
      }

      const session = await login(email.trim(), password, rememberMe);
      
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

      await router.navigate({ to: "/tutor/dashboard" });
    } catch (err: unknown) {
      // Handle specific error messages
      const errorMessage = formatAuthError(err);
      const status = typeof err === "object" && err !== null && "status" in err && typeof err.status === "number"
        ? err.status
        : undefined;
      console.error(isRegistering ? "Registration error:" : "Login error:", errorMessage);
      
      if (isRegistering) {
        setError(`Account creation failed: ${errorMessage}`);
      } else if (status) {
        setError(`Sign-in failed (${status}): ${errorMessage}`);
      } else if (errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
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

  function formatAuthError(error: unknown) {
    const value = error instanceof Error ? error.message : error;
    if (typeof value === "string") {
      try {
        return formatAuthError(JSON.parse(value));
      } catch {
        return value;
      }
    }
    if (error && typeof error === "object") {
      const values = Object.entries(error as Record<string, unknown>).flatMap(([field, value]) => {
        const message = Array.isArray(value) ? value.join(", ") : String(value);
        return `${field}: ${message}`;
      });
      return values.join("; ") || "The server returned an unknown error.";
    }
    return "Unable to create your account. Please try again.";
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
                <label htmlFor="auth-name">Full Name</label>
                <input
                  id="auth-name"
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
              <label htmlFor="auth-email">Email</label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="student@gmail.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
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
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
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
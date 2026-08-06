import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";

export function StudentAuthPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(31,110,92,0.16),transparent_32%),linear-gradient(180deg,rgba(218,165,32,0.08),transparent_35%)]" />
      <div className="absolute left-[-5rem] top-24 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-[-4rem] right-[-2rem] -z-10 h-60 w-60 rounded-full bg-[var(--gold)]/15 blur-3xl" />

      <header className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Logo />
        <Link to="/" className="rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          Back home
        </Link>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-88px)] max-w-[1240px] gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-16">
        <section className="flex flex-col justify-center py-6 lg:py-0">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
            <GraduationCap className="h-3.5 w-3.5" />
            Student portal login
          </div>
          <h1 className="mt-6 max-w-xl text-[40px] font-semibold leading-[1.05] tracking-tight sm:text-[54px]">
            Keep learning without losing your pace.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-7 text-muted-foreground">
            This sign-in is built for learners. Resume your lessons, review saved resources, and track assignment deadlines from a student-only entry point.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Sparkles, label: "Continue live cohorts" },
              { icon: BookOpen, label: "Open saved study plans" },
              { icon: GraduationCap, label: "Track certificate progress" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card/80 px-4 py-4 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.65)]">
                <item.icon className="h-4 w-4 text-primary" />
                <p className="mt-3 text-sm text-foreground/85">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-border bg-gradient-to-br from-primary/12 via-background to-[var(--gold)]/10 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.7)] sm:p-8">
          <div className="rounded-[28px] border border-border bg-background/94 p-6 sm:p-8">
            <p className="text-sm font-medium text-muted-foreground">Secure learner access</p>
            <h2 className="mt-1 text-[28px] font-semibold tracking-tight">Sign in as a student</h2>

            <form className="mt-8 space-y-5">
              <label className="block text-sm font-medium text-foreground">
                Email
                <input
                  type="email"
                  defaultValue="ama.boateng@techbridge.io"
                  className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </label>

              <label className="block text-sm font-medium text-foreground">
                Password
                <input
                  type="password"
                  defaultValue="student-demo"
                  className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="inline-flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20" />
                  Keep me signed in on this device
                </label>
                <button type="button" className="font-medium text-primary transition-colors hover:text-primary/80">
                  Reset password
                </button>
              </div>

              <Link
                to="/student/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Enter student workspace <ArrowRight className="h-4 w-4" />
              </Link>
            </form>

            <p className="mt-5 text-xs leading-6 text-muted-foreground">
              Need a course first? You can still browse the catalog from the homepage before signing in.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
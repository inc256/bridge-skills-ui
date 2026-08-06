import { Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, BriefcaseBusiness, PlusSquare } from "lucide-react";
import { Logo } from "@/components/logo";

export function TutorAuthPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f5fbfb_0%,#ffffff_42%,#f7fafc_100%)] text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_38%)]" />
      <div className="absolute right-[-4rem] top-32 -z-10 h-72 w-72 rounded-full bg-sky-600/15 blur-3xl" />

      <header className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Logo />
        <Link to="/" className="rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          Back home
        </Link>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-88px)] max-w-[1240px] gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[0.98fr_1.02fr] lg:px-8 lg:pb-16">
        <section className="flex flex-col justify-center py-6 lg:py-0">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-600/20 bg-sky-600/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            Tutor workspace access
          </div>
          <h1 className="mt-6 max-w-xl text-[40px] font-semibold leading-[1.05] tracking-tight sm:text-[54px]">
            Teach, publish, and review from your own login flow.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-7 text-muted-foreground">
            This page is reserved for instructors. It leads directly into course operations, grading, analytics, and learner communication without mixing with student or admin sign-in.
          </p>

          <div className="mt-8 space-y-3">
            {[
              { icon: PlusSquare, title: "Course builder", copy: "Draft new lessons and update publishing status quickly." },
              { icon: BarChart3, title: "Performance insights", copy: "See engagement, progress, and completion trends after login." },
              { icon: BriefcaseBusiness, title: "Learner management", copy: "Handle assignments, messages, and cohorts from one workspace." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-sky-100 bg-white/90 p-4 shadow-[0_18px_40px_-34px_rgba(14,165,233,0.45)]">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-600/10 text-sky-700">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-[34px] border border-sky-100 bg-white p-6 shadow-[0_36px_90px_-50px_rgba(14,165,233,0.5)] sm:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Instructor sign in</p>
                <h2 className="mt-1 text-[30px] font-semibold tracking-tight">Welcome back, tutor</h2>
              </div>
              <div className="rounded-2xl bg-sky-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                Verified
              </div>
            </div>

            <form className="mt-8 space-y-5">
              <label className="block text-sm font-medium text-foreground">
                Instructor email
                <input
                  type="email"
                  defaultValue="priya.ramanathan@techbridge.io"
                  className="mt-2 w-full rounded-2xl border border-sky-100 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15"
                />
              </label>

              <label className="block text-sm font-medium text-foreground">
                Password
                <input
                  type="password"
                  defaultValue="tutor-demo"
                  className="mt-2 w-full rounded-2xl border border-sky-100 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" className="rounded-2xl border border-sky-100 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-sky-50">
                  Use SSO
                </button>
                <button type="button" className="rounded-2xl border border-sky-100 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-sky-50">
                  Reset password
                </button>
              </div>

              <Link
                to="/tutor/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
              >
                Enter tutor workspace <ArrowRight className="h-4 w-4" />
              </Link>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
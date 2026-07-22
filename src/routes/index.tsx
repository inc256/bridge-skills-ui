import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechBridge Skills Hub — Learn Practical Skills That Build Real Careers" },
      { name: "description", content: "A modern learning platform for networking, cybersecurity, software engineering and AI. Learn from expert tutors and earn industry-recognized certificates." },
      { property: "og:title", content: "TechBridge Skills Hub" },
      { property: "og:description", content: "Learn practical skills that build real careers." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#courses" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Courses</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/student" className="hidden sm:inline-flex items-center rounded-[14px] px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              Log in
            </Link>
            <Link to="/student/study" className="inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Sign up free <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute left-[-10%] bottom-[-20%] h-[420px] w-[420px] rounded-full bg-[var(--gold)]/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="animate-fade-up mx-auto max-w-3xl text-center">
            <h1 className="mt-6 text-[40px] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-[52px]">
              Build job ready tech skills <span className="text-primary">faster.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              Learn practical skills, choose your first course, and start your first lesson in minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/student/study" className="inline-flex items-center gap-2 rounded-[14px] bg-primary px-7 py-4 text-[16px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_14px_30px_-18px_rgba(31,110,92,0.8)]">
                Sign up free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">No credit card required.</p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Featured Courses"
              title="Start with these popular courses."
              description="Shortlisted picks to get momentum quickly."
              align="left"
            />
            <Link to="/student" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
              Browse all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--primary-dark)] px-8 py-16 text-center md:px-16 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 800 400" fill="none">
              <defs>
                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="800" height="400" fill="url(#dots)" />
            </svg>
          </div>
          <div className="relative">
            <h2 className="text-[36px] font-semibold tracking-tight text-white md:text-[48px]">
              Ready to start?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Create your account and begin your first lesson in minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/student/study" className="inline-flex items-center gap-2 rounded-[14px] bg-white px-6 py-3.5 text-[15px] font-medium text-[var(--primary-dark)] hover:bg-white/90 transition-colors">
                Sign up free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/student" className="inline-flex items-center gap-2 rounded-[14px] border border-white/20 px-6 py-3.5 text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
                View course catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
            <div className="max-w-md">
              <Logo />
              <p className="mt-3 text-sm text-muted-foreground">
                Practical, career-oriented tech education for the next generation of engineers.
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-3 text-sm md:justify-self-end md:text-right">
              <a href="#courses" className="text-muted-foreground transition-colors hover:text-foreground">Courses</a>
              <Link to="/student/study" className="text-muted-foreground transition-colors hover:text-foreground">Sign up</Link>
              <Link to="/student" className="text-muted-foreground transition-colors hover:text-foreground">Log in</Link>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Support</a>
            </nav>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <p className="text-xs text-muted-foreground">© 2026 TechBridge Skills Hub. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">Terms</a>
              <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title, description, align = "center" }: { eyebrow: string; title: string; description?: string; align?: "center" | "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <div className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground`}>
        {eyebrow}
      </div>
      <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-tight sm:text-[40px]">{title}</h2>
      {description && <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}

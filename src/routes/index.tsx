import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Award, BookOpen, Check, ChevronRight, Cpu, Globe, GraduationCap,
  Layers, Network, Play, Shield, Sparkles, Star, Users, Zap,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { CourseCard } from "@/components/course-card";
import { courses, learningPaths, testimonials, partners } from "@/lib/mock-data";

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

const pathIcons: Record<string, typeof Network> = {
  network: Network, shield: Shield, code: Layers, cpu: Cpu,
};

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#courses" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Courses</a>
            <a href="#paths" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Learning Paths</a>
            <a href="#tutor" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Become a Tutor</a>
            <a href="#why" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/student" className="hidden sm:inline-flex items-center rounded-[14px] px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              Log in
            </Link>
            <Link to="/student" className="inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Get started <ArrowRight className="h-3.5 w-3.5" />
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
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-primary/10 text-primary"><Sparkles className="h-2.5 w-2.5" /></span>
              New · AI Career Track now open for enrollment
            </div>
            <h1 className="mt-6 text-[44px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[56px]">
              Learn practical skills<br />that build <span className="text-primary">real careers.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
              Industry-designed courses in networking, cybersecurity, software engineering and AI — taught by
              engineers from the world's most respected technology teams.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/student" className="inline-flex items-center gap-2 rounded-[14px] bg-primary px-6 py-3.5 text-[15px] font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Explore courses <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#paths" className="inline-flex items-center gap-2 rounded-[14px] border border-border bg-card px-6 py-3.5 text-[15px] font-medium text-foreground hover:bg-secondary transition-colors">
                <Play className="h-4 w-4" /> View learning paths
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Free foundational courses</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Industry certificates</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Self-paced</span>
            </div>
          </div>

          {/* Hero illustration */}
          <div className="relative animate-fade-up" style={{ animationDelay: "80ms" }}>
            <div className="relative rounded-3xl border border-border bg-card p-6 shadow-[0_20px_60px_-30px_rgba(13,41,34,0.15)]">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center text-primary"><Network className="h-5 w-5" /></div>
                  <div>
                    <div className="text-[13px] font-semibold">Networking Essentials</div>
                    <div className="text-xs text-muted-foreground">Module 3 · Subnetting</div>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">62%</span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { t: "IPv4 addressing fundamentals", done: true },
                  { t: "Subnet masks and CIDR", done: true },
                  { t: "Hands-on: Build a /24 network", done: false, active: true },
                  { t: "Assignment: Design a subnet plan", done: false },
                ].map((l, i) => (
                  <div key={i} className={`flex items-center gap-3 rounded-xl border p-3 ${l.active ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className={`grid h-6 w-6 place-items-center rounded-full ${l.done ? "bg-primary text-primary-foreground" : l.active ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"}`}>
                      {l.done ? <Check className="h-3.5 w-3.5" /> : <Play className="h-3 w-3" />}
                    </div>
                    <span className={`text-sm ${l.done ? "text-muted-foreground line-through" : "font-medium text-foreground"}`}>{l.t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-secondary p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Module progress</span>
                  <span className="font-semibold">4 of 7 lessons</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-primary animate-progress" style={{ width: "58%" }} />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-[0_20px_60px_-30px_rgba(13,41,34,0.2)] sm:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--gold)]/15 grid place-items-center text-[var(--gold)]"><Award className="h-5 w-5" /></div>
                <div>
                  <div className="text-[13px] font-semibold">Certificate earned</div>
                  <div className="text-xs text-muted-foreground">Intro to Cybersecurity</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-4 hidden rounded-2xl border border-border bg-card p-4 shadow-[0_20px_60px_-30px_rgba(13,41,34,0.2)] md:block">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">248,304 learners</span>
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">active this month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by learners at
          </p>
          <div className="mt-6 grid grid-cols-3 items-center justify-items-center gap-8 opacity-70 md:grid-cols-6">
            {partners.map((p) => (
              <span key={p} className="text-[15px] font-semibold tracking-tight text-muted-foreground">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section id="paths" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Learning Paths"
          title="Structured tracks, real outcomes."
          description="Career-aligned paths curated by industry practitioners. Start with fundamentals and progress to advanced specializations."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {learningPaths.map((path) => {
            const Icon = pathIcons[path.icon];
            return (
              <div key={path.id} className="card-surface card-hover group p-6">
                <div className="h-12 w-12 rounded-2xl grid place-items-center" style={{ background: `${path.color}12`, color: path.color }}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[19px] font-semibold">{path.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{path.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <div className="text-xs text-muted-foreground">
                    {path.courses} courses · {path.hours}h
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Featured Courses"
              title="Hand-picked by our editors."
              description="Six of the most enrolled and highest-rated courses this quarter."
              align="left"
            />
            <Link to="/student" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
              Browse all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>

      {/* Why TechBridge */}
      <section id="why" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why TechBridge"
          title="A learning experience built for professionals."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GraduationCap, t: "Expert Tutors", d: "Learn from engineers currently building at Cisco, Stripe, DeepMind and more." },
            { icon: Award, t: "Industry Certificates", d: "Verifiable credentials trusted by hiring teams across the tech industry." },
            { icon: BookOpen, t: "Self-Paced Learning", d: "Study anywhere on any device. Pick up where you left off — always." },
            { icon: Zap, t: "Career Growth", d: "Curated paths mapped to real roles, from junior engineer to architect." },
          ].map(({ icon: Icon, t, d }, i) => (
            <div key={i} className="card-surface p-6">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
              <h3 className="mt-5 text-[17px] font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="How it works" title="Four steps to your next credential." />
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              { n: "01", t: "Choose your path", d: "Pick a learning path aligned with the role you want next." },
              { n: "02", t: "Learn at your pace", d: "Watch, read, and practice with hands-on labs and quizzes." },
              { n: "03", t: "Complete assessments", d: "Prove your skill with real assignments and reviewed projects." },
              { n: "04", t: "Earn your certificate", d: "Add verifiable credentials to your resume and LinkedIn." },
            ].map((s) => (
              <div key={s.n} className="relative">
                <div className="text-[13px] font-semibold text-primary">{s.n}</div>
                <div className="mt-3 h-px w-full bg-border" />
                <h3 className="mt-4 text-[17px] font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Tutor */}
      <section id="tutor" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="card-surface grid gap-10 overflow-hidden p-8 md:grid-cols-2 md:p-14 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              For instructors
            </div>
            <h2 className="mt-5 text-[38px] font-semibold leading-tight tracking-tight">
              Teach on TechBridge. Reach hundreds of thousands of learners.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our course builder gives you everything you need to design world-class curricula — modular
              lessons, hands-on labs, quizzes and assessments — with an audience already waiting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/tutor" className="inline-flex items-center gap-2 rounded-[14px] bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Apply to teach <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/tutor" className="inline-flex items-center gap-2 rounded-[14px] border border-border px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors">
                See the tutor portal
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 self-center">
            {[
              { n: "250K+", l: "Active learners" },
              { n: "1,240", l: "Expert tutors" },
              { n: "480+", l: "Courses" },
              { n: "94%", l: "Completion rate" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-background p-6">
                <div className="text-[28px] font-semibold tracking-tight">{s.n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Testimonials" title="Loved by learners worldwide." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card-surface p-7">
                <div className="flex gap-0.5 text-[var(--gold)]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-foreground">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {t.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
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
              Start learning today. Build the career you want.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Join 250,000+ learners who trust TechBridge to grow their careers in technology.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/student" className="inline-flex items-center gap-2 rounded-[14px] bg-white px-6 py-3.5 text-[15px] font-medium text-[var(--primary-dark)] hover:bg-white/90 transition-colors">
                Get started free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/tutor" className="inline-flex items-center gap-2 rounded-[14px] border border-white/20 px-6 py-3.5 text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
                Become a tutor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                Practical, career-oriented tech education for the next generation of engineers.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Globe className="h-3.5 w-3.5" /> English (US)
              </div>
            </div>
            {[
              { t: "Learn", l: ["Courses", "Learning paths", "Certificates", "For teams"] },
              { t: "Company", l: ["About", "Careers", "Press", "Contact"] },
              { t: "Resources", l: ["Blog", "Help center", "Trust", "Privacy"] },
            ].map((col) => (
              <div key={col.t}>
                <div className="text-[13px] font-semibold">{col.t}</div>
                <ul className="mt-4 space-y-2.5">
                  {col.l.map((li) => (
                    <li key={li}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{li}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">© 2026 TechBridge Skills Hub. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Cookies</a>
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

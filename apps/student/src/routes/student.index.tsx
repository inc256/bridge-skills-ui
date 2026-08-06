import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, ArrowRight, Clock, Flame, Calendar, ChevronRight, Target, BookOpen } from "lucide-react";
import { courses, activity, deadlines } from "@/lib/mock-data";
import { CourseCard } from "@/components/course-card";
import { CourseThumb } from "@/components/course-thumb";

export const Route = createFileRoute("/student/")({
  component: StudentDashboard,
});

function StudentDashboard() {
  const inProgress = courses.filter((c) => c.progress != null);
  const recommended = courses.filter((c) => c.progress == null);

  return (
    <div className="space-y-7">
      {/* Greeting */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Wednesday, 22 July</p>
          <h2 className="mt-1 text-[28px] font-semibold tracking-tight">Welcome back, Ama.</h2>
          <p className="mt-1 text-sm text-muted-foreground">You are on a 12-day streak. Resume your next lesson now.</p>
        </div>
        <Link to="/student/my-learning" className="inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Continue learning <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Flame, label: "Learning streak", value: "12", unit: "days", accent: "text-[var(--gold)]", bg: "bg-[var(--gold)]/10" },
          { icon: Clock, label: "Hours this week", value: "8.4", unit: "hrs", accent: "text-primary", bg: "bg-primary/10" },
          { icon: BookOpen, label: "Active courses", value: "3", unit: "courses", accent: "text-info", bg: "bg-info/10" },
        ].map((s) => (
          <div key={s.label} className="card-surface p-5">
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.bg} ${s.accent}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-[28px] font-semibold tracking-tight">
              {s.value}<span className="ml-1 text-sm font-normal text-muted-foreground">{s.unit}</span>
            </div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        {/* Continue learning */}
        <section className="card-surface p-5 sm:p-6">
          <SectionHead title="Continue learning" href="/student/my-learning" hrefLabel="View all" />
          <div className="mt-4 space-y-3">
            {inProgress.slice(0, 3).map((c) => (
              <Link
                key={c.id}
                to="/student/study/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col gap-3 rounded-2xl border border-border p-3 hover:border-primary/40 hover:bg-secondary/40 transition-colors sm:flex-row sm:gap-4"
              >
                <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-32">
                  <CourseThumb variant={c.image} color={c.color} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground">
                    <span>{c.category}</span>
                    <span className="hidden sm:inline">·</span>
                    <span>{c.instructor}</span>
                  </div>
                  <div className="mt-1 truncate text-sm font-semibold group-hover:text-primary transition-colors">{c.title}</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-foreground">{c.progress}%</span>
                  </div>
                </div>
                <ChevronRight className="hidden h-4 w-4 shrink-0 self-center text-muted-foreground group-hover:text-primary sm:block" />
              </Link>
            ))}
          </div>
        </section>

        {/* Weekly goal */}
        <section className="space-y-6">
          <div className="card-surface p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">Weekly goal</div>
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[32px] font-semibold tracking-tight">8.4</span>
              <span className="text-sm text-muted-foreground">/ 10 hrs</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary animate-progress" style={{ width: "84%" }} />
            </div>
            <div className="mt-6 grid grid-cols-7 gap-1.5">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="text-center">
                  <div className={`mx-auto h-8 w-full rounded-md ${i < 3 ? "bg-primary" : i === 3 ? "bg-primary/60" : "bg-secondary"}`} />
                  <div className="mt-1.5 text-[10px] text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">Certificates</div>
              <Award className="h-4 w-4 text-success" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">You have earned <span className="font-semibold text-foreground">5 certificates</span>. Keep progressing to unlock your next one.</p>
            <Link to="/student/certificates" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View certificates <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>

      {/* Deadlines + activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-surface p-5 sm:p-6">
          <SectionHead title="Upcoming deadlines" icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
          <ul className="mt-4 divide-y divide-border">
            {deadlines.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{d.title}</div>
                  <div className="text-xs text-muted-foreground">{d.course}</div>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${d.urgent ? "bg-destructive/10 text-destructive" : "bg-secondary text-foreground/80"}`}>
                  {d.due}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="card-surface p-5 sm:p-6">
          <SectionHead title="Recent activity" />
          <ul className="mt-4 space-y-4">
            {activity.slice(0, 4).map((a) => (
              <li key={a.id} className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm">{a.text}</div>
                  <div className="text-xs text-muted-foreground">{a.course} · {a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Recommended */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-[20px] font-semibold tracking-tight">Recommended for you</h3>
            <p className="mt-1 text-sm text-muted-foreground">Based on your interests in networking and cloud.</p>
          </div>
          <Link to="/student/explore" className="text-sm font-medium text-primary hover:underline">Explore all →</Link>
        </div>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.slice(0, 2).map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>
    </div>
  );
}

function SectionHead({ title, href, hrefLabel, icon }: { title: string; href?: string; hrefLabel?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-[16px] font-semibold">{title}{icon}</h3>
      {href && <Link to={href} className="text-xs font-medium text-primary hover:underline">{hrefLabel} →</Link>}
    </div>
  );
}

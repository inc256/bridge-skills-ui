import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Award, Clock, Users, Star, Check, ChevronRight, PlayCircle, Globe, Download } from "lucide-react";
import { courses, modules } from "@/lib/mock-data";
import { CourseThumb } from "@/components/course-thumb";

export const Route = createFileRoute("/student/course/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  component: CourseDetails,
  notFoundComponent: () => <div className="p-8">Course not found.</div>,
});

function CourseDetails() {
  const { course } = Route.useLoaderData();
  return (
    <div className="space-y-8">
      <nav className="text-xs text-muted-foreground">
        <Link to="/student/explore" className="hover:text-foreground">Explore</Link> / <span>{course.category}</span> / <span className="text-foreground">{course.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-3xl">
            <CourseThumb variant={course.image} color={course.color} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{course.category}</span>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">{course.level}</span>
            {course.certificate && <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 text-xs font-medium text-[var(--gold)]"><Award className="mr-1 inline h-3 w-3" />Certificate</span>}
          </div>
          <h1 className="mt-4 text-[36px] font-semibold leading-tight tracking-tight">{course.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{course.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" /> <span className="text-foreground font-semibold">{course.rating}</span> ({course.reviews.toLocaleString()} reviews)</span>
            <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.students.toLocaleString()} students</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration}</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" /> English + 6 subtitles</span>
          </div>

          {/* Learning outcomes */}
          <section className="mt-10 card-surface p-6">
            <h3 className="text-[18px] font-semibold">What you'll learn</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Design and configure IPv4 and IPv6 networks",
                "Implement secure routing and switching",
                "Diagnose and troubleshoot common outages",
                "Build cloud-connected hybrid infrastructures",
                "Automate operations with standard tooling",
                "Prepare for industry certification exams",
              ].map((t) => (
                <div key={t} className="flex gap-2.5 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t}</div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section className="mt-8">
            <div className="flex items-end justify-between">
              <h3 className="text-[18px] font-semibold">Curriculum</h3>
              <div className="text-xs text-muted-foreground">{course.modules} modules · {course.lessons} lessons · {course.duration}</div>
            </div>
            <div className="mt-4 space-y-3">
              {modules.map((m, i) => (
                <details key={m.id} className="group card-surface" open={i === 0}>
                  <summary className="flex cursor-pointer items-center justify-between gap-3 p-5">
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-muted-foreground">Module {i + 1}</div>
                      <div className="mt-0.5 truncate text-[15px] font-semibold">{m.title}</div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{m.lessons.length} lessons · {m.duration}</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                    </div>
                  </summary>
                  <ul className="divide-y divide-border border-t border-border">
                    {m.lessons.map((l) => (
                      <li key={l.id} className="flex items-center justify-between gap-3 px-5 py-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <PlayCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="min-w-0">
                            <div className="truncate text-sm">{l.title}</div>
                            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l.type}</div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{l.duration}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          {/* Instructor */}
          <section className="mt-8 card-surface p-6">
            <h3 className="text-[18px] font-semibold">Your instructor</h3>
            <div className="mt-4 flex gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-lg font-semibold">
                {course.instructor.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div>
                <div className="text-[15px] font-semibold">{course.instructor}</div>
                <div className="text-sm text-muted-foreground">{course.instructorTitle}</div>
                <p className="mt-3 text-sm text-muted-foreground">
                  15+ years designing and operating large-scale networks for enterprises and cloud providers.
                  Author of two books and speaker at Cisco Live.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="sticky top-24 card-surface p-6">
            <div className="text-[28px] font-semibold tracking-tight">{course.price}</div>
            <div className="text-xs text-muted-foreground">Full access · lifetime</div>
            <Link
              to="/student/study/$slug"
              params={{ slug: course.slug }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {course.progress != null ? "Continue learning" : "Enroll now"}
            </Link>
            <button className="mt-2 w-full rounded-[14px] border border-border px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors">
              Add to bookmarks
            </button>
            <div className="mt-6 space-y-3 text-sm">
              {[
                { l: "Skill level", v: course.level },
                { l: "Total duration", v: course.duration },
                { l: "Lessons", v: `${course.lessons}` },
                { l: "Certificate", v: course.certificate ? "Included" : "—" },
                { l: "Language", v: "English" },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between border-b border-border pb-2.5 last:border-0">
                  <span className="text-muted-foreground">{r.l}</span>
                  <span className="font-medium">{r.v}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground">
              <Download className="h-3.5 w-3.5" /> Download syllabus (PDF)
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

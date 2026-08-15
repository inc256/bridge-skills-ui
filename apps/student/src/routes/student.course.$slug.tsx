import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Award, Clock, Users, Star, Check, ChevronRight, PlayCircle, Globe, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { CourseThumb } from "@/components/course-thumb";
import { getCourse, getCourseModules } from "@/lib/api";
import type { Course } from "@/lib/api";

export const Route = createFileRoute("/student/course/$slug")({
  loader: async ({ params }) => {
    const course = await getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  component: CourseDetails,
  notFoundComponent: () => <div className="p-8">Course not found.</div>,
});

function CourseDetails() {
  const { course } = Route.useLoaderData();
  const [modules, setModules] = useState<any[]>([]);
  const raw = course.raw as Record<string, any>;

  const getYoutubeId = (url: string | undefined) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = getYoutubeId(course.introVideoUrl ?? raw?.intro_video_url ?? raw?.video_url ?? raw?.youtube_url);

  useEffect(() => {
    void getCourseModules(course.slug).then((data) => setModules(Array.isArray(data) ? data : []));
  }, [course.slug]);

  const courseDetails = [
    course.level ? { l: "Skill level", v: course.level } : null,
    course.duration ? { l: "Total duration", v: course.duration } : null,
    course.lessons > 0 ? { l: "Lessons", v: `${course.lessons}` } : null,
    course.certificate ? { l: "Certificate", v: "Included" } : null,
    course.language ? { l: "Language", v: course.language } : null,
  ].filter(Boolean) as Array<{ l: string; v: string }>;

  const instructorName = course.instructor || raw?.instructor?.name || raw?.instructor;
  const instructorBioText = course.instructorBio || raw?.instructor?.bio || raw?.instructor_bio || raw?.instructor_description;
  const accessLabel = raw?.access_label ?? raw?.access_type ?? raw?.access;
  const hasCourseStats = Boolean(course.rating > 0 || course.students > 0 || course.duration || course.language || course.subtitles);
  const hasLearningOutcomes = Boolean(course.learningOutcomes?.length || Array.isArray(raw?.learning_outcomes) || Array.isArray(raw?.outcomes));
  const hasCurriculum = modules.length > 0;
  const hasInstructor = Boolean(instructorName || instructorBioText);

  return (
    <div className="space-y-8">
      <nav className="text-xs text-muted-foreground">
        <Link to="/student/explore" className="hover:text-foreground">Explore</Link> / <span>{course.category}</span> / <span className="text-foreground">{course.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-3xl bg-black">
            {youtubeId ? (
              <iframe
                className="h-full w-full min-h-[240px]"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <CourseThumb variant={course.image} color={course.color} />
            )}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{course.category}</span>
            {course.level ? <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">{course.level}</span> : null}
            {course.certificate && <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 text-xs font-medium text-[var(--gold)]"><Award className="mr-1 inline h-3 w-3" />Certificate</span>}
          </div>
          <h1 className="mt-4 text-[36px] font-semibold leading-tight tracking-tight">{course.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{course.description}</p>

          {hasCourseStats && (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {course.rating > 0 && (
                <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" /> <span className="text-foreground font-semibold">{course.rating}</span> ({course.reviews.toLocaleString()} reviews)</span>
              )}
              {course.students > 0 && (
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.students.toLocaleString()} students</span>
              )}
              {course.duration && (
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration}</span>
              )}
              {(course.language || course.subtitles) && (
                <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />{course.language ? ` ${course.language}` : ""}{course.subtitles ? ` + ${course.subtitles} subtitles` : ""}</span>
              )}
            </div>
          )}

          {hasLearningOutcomes && (
            <section className="mt-10 card-surface p-6">
              <h3 className="text-[18px] font-semibold">What you'll learn</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(
                  course.learningOutcomes?.length
                    ? course.learningOutcomes
                    : Array.isArray(raw?.learning_outcomes)
                      ? raw.learning_outcomes
                      : Array.isArray(raw?.outcomes)
                        ? raw.outcomes
                        : []
                ).map((t: any, index: number) => (
                  <div key={`${String(t)}-${index}`} className="flex gap-2.5 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{typeof t === "string" ? t : t.label ?? t.title ?? JSON.stringify(t)}</div>
                ))}
              </div>
            </section>
          )}

          {hasCurriculum && (
            <section className="mt-8">
              <div className="flex items-end justify-between">
                <h3 className="text-[18px] font-semibold">Curriculum</h3>
                <div className="text-xs text-muted-foreground">{course.modules} modules · {course.lessons} lessons · {course.duration}</div>
              </div>
              <div className="mt-4 space-y-3">
                {modules.map((m, i) => (
                  <div key={m.id ?? i} className="card-surface p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-medium text-muted-foreground">Module {i + 1}</div>
                        <div className="mt-1 text-[15px] font-semibold">{m.title}</div>
                      </div>
                      <span className="text-xs text-muted-foreground">{m.lessons?.length ?? 0} lessons · {m.duration}</span>
                    </div>
                    {Array.isArray(m.lessons) && m.lessons.length > 0 ? (
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {m.lessons.map((l: any) => (
                          <li key={l.id ?? l.title} className="flex items-center justify-between gap-3">
                            <span>{l.title}</span>
                            <span>{l.duration}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasInstructor && (
            <section className="mt-8 card-surface p-6">
              <h3 className="text-[18px] font-semibold">Your instructor</h3>
              <div className="mt-4 flex gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-lg font-semibold">
                  {instructorName ? instructorName.split(" ").map((n: string) => n[0]).join("") : "?"}
                </div>
                <div>
                  {instructorName && <div className="text-[15px] font-semibold">{instructorName}</div>}
                  {course.instructorTitle && <div className="text-sm text-muted-foreground">{course.instructorTitle}</div>}
                  {instructorBioText && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {instructorBioText}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          <div className="sticky top-24 card-surface p-6">
            <div className="text-[28px] font-semibold tracking-tight">{course.price}</div>
            {accessLabel ? <div className="text-xs text-muted-foreground">{accessLabel}</div> : null}
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
              {courseDetails.map((r) => (
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

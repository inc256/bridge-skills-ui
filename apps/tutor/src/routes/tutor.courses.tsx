import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock3,
  Edit3,
  FileText,
  Grid2X2,
  List,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
  Users,
  X,
} from "lucide-react";
import {
  createTutorLesson,
  createTutorModule,
  deleteCourse,
  deleteTutorLesson,
  getCourseLessons,
  getCourseModules,
  getCourseReviews,
  getCourses,
} from "@/lib/api";
import type { Course } from "@/lib/api";
import { CourseThumb, resolveCourseThumbnail } from "@/components/course-thumb";
import { PageSkeleton } from "@/components/ui/page-skeleton";

export const Route = createFileRoute("/tutor/courses")({
  component: TutorCourses,
});

type CourseRecord = Course & {
  status?: string;
  students?: number;
  rating?: number;
  reviews?: number;
  duration?: string;
  pricing?: string;
  price?: string | number;
  total_lessons?: number;
};

type LessonRecord = {
  id?: string | number;
  slug?: string;
  title?: string;
  name?: string;
  description?: string;
  duration?: string | number;
  type?: string;
  is_published?: boolean;
  isPublished?: boolean;
};

type CourseModule = {
  id: string;
  title: string;
  description?: string;
  module_order?: number;
  lessons?: LessonRecord[];
  _persisted?: boolean;
};

type ReviewRecord = {
  id?: string | number;
  user?: { id?: string | number; full_name?: string; username?: string };
  rating?: number | string;
  comment?: string;
  content?: string;
};

type AssignmentForm = {
  title: string;
  description: string;
  instructions: string;
  duration: string;
  moduleId: string;
  isPublished: boolean;
};

const emptyAssignment: AssignmentForm = {
  title: "",
  description: "",
  instructions: "",
  duration: "30 min",
  moduleId: "",
  isPublished: true,
};

function getStatusColor(status?: string) {
  const styles: Record<string, string> = {
    published: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    draft: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    archived: "border-border bg-secondary text-muted-foreground",
  };
  return styles[status ?? ""] ?? styles.draft;
}

function getStatusLabel(status?: string) {
  if (status === "published") return "Published";
  if (status === "archived") return "Archived";
  return "Draft";
}

function safeSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function CourseStats({ courses }: { courses: CourseRecord[] }) {
  const published = courses.filter((course) => course.status === "published").length;
  const students = courses.reduce((total, course) => total + (Number(course.students) || 0), 0);
  const ratedCourses = courses.filter((course) => Number(course.rating) > 0);
  const rating = ratedCourses.length
    ? (
        ratedCourses.reduce((total, course) => total + Number(course.rating), 0) /
        ratedCourses.length
      ).toFixed(1)
    : "—";
  const stats = [
    {
      icon: BookOpen,
      label: "Total courses",
      value: courses.length,
      tone: "text-primary bg-primary/10",
    },
    {
      icon: Users,
      label: "Enrolled learners",
      value: students.toLocaleString(),
      tone: "text-sky-700 bg-sky-500/10 dark:text-sky-300",
    },
    {
      icon: Star,
      label: "Average rating",
      value: rating,
      tone: "text-amber-700 bg-amber-500/10 dark:text-amber-300",
    },
    {
      icon: ArrowUpRight,
      label: "Published",
      value: published,
      tone: "text-emerald-700 bg-emerald-500/10 dark:text-emerald-300",
    },
  ];

  return (
    <section aria-label="Course statistics" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map(({ icon: Icon, label, value, tone }) => (
        <article key={label} className="card-surface flex items-center gap-3 p-4 sm:p-5">
          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {value}
            </p>
            <p className="truncate text-xs text-muted-foreground">{label}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function AssignmentDialog({
  course,
  onClose,
  onCreated,
}: {
  course: CourseRecord;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState<AssignmentForm>(emptyAssignment);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [isLoadingModules, setIsLoadingModules] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void getCourseModules(course.slug)
      .then((items) => {
        if (!active) return;
        const existingModules = (Array.isArray(items) ? items : []) as CourseModule[];
        const persistedModules = existingModules.filter(
          (item) => item._persisted !== false && item.id !== "module-unassigned",
        );
        setModules(persistedModules);
        if (persistedModules[0]) {
          setForm((current) => ({ ...current, moduleId: persistedModules[0].id }));
        }
      })
      .catch((cause: unknown) => {
        console.error("Could not load course modules for assignment:", cause);
        if (active) setError("Could not load course modules. Close this form and try again.");
      })
      .finally(() => {
        if (active) setIsLoadingModules(false);
      });
    return () => {
      active = false;
    };
  }, [course.slug]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSaving, onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) return;
    setError(null);
    if (!form.title.trim()) {
      setError("Enter an assignment title.");
      return;
    }
    if (!form.instructions.trim()) {
      setError("Add instructions so learners know what to submit.");
      return;
    }

    setIsSaving(true);
    try {
      let moduleId = form.moduleId;
      let selectedModule = modules.find((item) => item.id === moduleId);
      if (!selectedModule) {
        const createdModule = await createTutorModule(course.slug, {
          course: course.id,
          title: "Assignments",
          description: "Course assignments",
          module_order: modules.length + 1,
          is_published: course.status === "published",
        });
        moduleId = String(createdModule?.id ?? createdModule?.module?.id ?? "");
        if (!moduleId) throw new Error("Could not create an assignment module for this course.");
        selectedModule = { id: moduleId, title: "Assignments", lessons: [] };
      }

      const lessonOrder = (selectedModule.lessons?.length ?? 0) + 1;
      const createdLesson = await createTutorLesson(course.slug, {
        title: form.title.trim(),
        slug: `${safeSlug(form.title)}-${Date.now().toString(36)}`,
        type: "assignment",
        description: form.description.trim(),
        content: form.instructions.trim(),
        duration: form.duration.trim() || "30 min",
        module: moduleId,
        lesson_order: lessonOrder,
        xp_reward: 10,
        is_free: false,
        is_drip: false,
        drip_after: 0,
        is_published: form.isPublished,
        video_url: "",
        video_source: "upload",
      });
      if (!createdLesson?.id && !createdLesson?.lesson?.id) {
        throw new Error(
          "The assignment could not be confirmed as saved. Please refresh the course before retrying.",
        );
      }
      onCreated();
    } catch (cause) {
      console.error("Could not add course assignment:", cause);
      setError(
        cause instanceof Error ? cause.message : "Could not add assignment. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="assignment-dialog-title"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-primary">{course.title}</p>
              <h2
                id="assignment-dialog-title"
                className="mt-0.5 text-lg font-semibold text-foreground"
              >
                Add an assignment
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Create a learner assignment in this course curriculum.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close assignment form"
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-foreground">
              Assignment title <span className="text-destructive">*</span>
            </span>
            <input
              autoFocus
              maxLength={160}
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="e.g. Build a secure network plan"
              className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-foreground">Short description</span>
            <input
              maxLength={240}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="A short overview of the task"
              className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-foreground">
              Instructions <span className="text-destructive">*</span>
            </span>
            <textarea
              rows={5}
              value={form.instructions}
              onChange={(event) =>
                setForm((current) => ({ ...current, instructions: event.target.value }))
              }
              placeholder="Explain the task, requirements, and what learners should submit."
              className="w-full resize-y rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <span className="block text-xs text-muted-foreground">
              Learners will see these instructions in the course lesson.
            </span>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-foreground">Course module</span>
              <div className="relative">
                <select
                  disabled={isLoadingModules || modules.length === 0}
                  value={form.moduleId}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, moduleId: event.target.value }))
                  }
                  className="w-full appearance-none rounded-xl border border-input bg-background px-3.5 py-2.5 pr-9 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
                >
                  {modules.length === 0 ? (
                    <option value="">A new Assignments module will be created</option>
                  ) : (
                    modules.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-foreground">Estimated time</span>
              <input
                maxLength={40}
                value={form.duration}
                onChange={(event) =>
                  setForm((current) => ({ ...current, duration: event.target.value }))
                }
                placeholder="e.g. 30 min"
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-secondary/40 p-3.5">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) =>
                setForm((current) => ({ ...current, isPublished: event.target.checked }))
              }
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span>
              <span className="block text-sm font-medium text-foreground">Publish assignment</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                Published assignments are visible to learners enrolled in this course.
              </span>
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/20 bg-destructive/5 px-3.5 py-3 text-sm text-destructive"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isLoadingModules}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {isSaving ? "Adding assignment…" : "Add assignment"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function TutorCourses() {
  const [courses, setCourses] = useState<CourseRecord[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseRecord | null>(null);
  const [lessons, setLessons] = useState<LessonRecord[]>([]);
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assignmentCourse, setAssignmentCourse] = useState<CourseRecord | null>(null);
  const [deletingCourseSlug, setDeletingCourseSlug] = useState<string | null>(null);
  const [deletingLessonId, setDeletingLessonId] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonRecord | null>(null);

  const loadCourses = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);
    try {
      const courseList = (await getCourses()) as CourseRecord[];
      try {
        const raw =
          typeof window !== "undefined"
            ? window.localStorage.getItem("bridge_skills_tutor_last_saved_course")
            : null;
        if (raw) {
          const saved = JSON.parse(raw) as CourseRecord;
          const index = courseList.findIndex((course) => course.slug === saved.slug);
          if (index >= 0) courseList[index] = { ...courseList[index], ...saved };
          else courseList.unshift(saved);
        }
      } catch {
        // Ignore invalid locally cached course drafts and keep server courses.
      }
      setCourses(courseList);
      setSelectedCourse((current) => {
        if (current)
          return courseList.find((course) => course.slug === current.slug) ?? courseList[0] ?? null;
        return courseList[0] ?? null;
      });
    } catch (cause) {
      console.error("Failed to load tutor courses:", cause);
      setError(cause instanceof Error ? cause.message : "Could not load your courses.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const loadCourseDetails = async (courseSlug: string) => {
    setIsDetailsLoading(true);
    try {
      const [lessonList, reviewList] = await Promise.all([
        getCourseLessons(courseSlug),
        getCourseReviews(courseSlug),
      ]);
      setLessons(Array.isArray(lessonList) ? lessonList : []);
      setReviews(Array.isArray(reviewList) ? reviewList : []);
    } catch (cause) {
      console.error("Failed to load selected course details:", cause);
      setLessons([]);
      setReviews([]);
    } finally {
      setIsDetailsLoading(false);
    }
  };

  useEffect(() => {
    void loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse?.slug) void loadCourseDetails(selectedCourse.slug);
    else {
      setLessons([]);
      setReviews([]);
    }
  }, [selectedCourse?.slug]);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery =
        !normalizedQuery ||
        [course.title, course.category, course.level].some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(normalizedQuery),
        );
      const matchesStatus = filterStatus === "all" || course.status === filterStatus;
      return matchesQuery && matchesStatus;
    });
  }, [courses, filterStatus, query]);

  const handleDeleteCourse = async (course: CourseRecord) => {
    if (
      !course.slug ||
      !window.confirm(`Delete "${course.title || "this course"}"? This action cannot be undone.`)
    )
      return;
    setDeletingCourseSlug(course.slug);
    try {
      await deleteCourse(course.slug);
      setCourses((current) => current.filter((item) => item.slug !== course.slug));
      setSelectedCourse((current) =>
        current?.slug === course.slug
          ? (courses.find((item) => item.slug !== course.slug) ?? null)
          : current,
      );
      if (typeof window !== "undefined") {
        const saved = window.localStorage.getItem("bridge_skills_tutor_last_saved_course");
        if (saved && (JSON.parse(saved) as CourseRecord)?.slug === course.slug) {
          window.localStorage.removeItem("bridge_skills_tutor_last_saved_course");
        }
      }
    } catch (cause) {
      window.alert(cause instanceof Error ? cause.message : "Unable to delete course.");
    } finally {
      setDeletingCourseSlug(null);
    }
  };

  const handleDeleteLesson = async (lesson: LessonRecord) => {
    const lessonId = String(lesson.id ?? "");
    if (!lessonId || lessonId.startsWith("lesson-") || deletingLessonId) return;
    if (!window.confirm(`Delete "${lesson.title ?? lesson.name ?? "this lesson"}"?`)) return;
    setDeletingLessonId(lessonId);
    try {
      await deleteTutorLesson(lessonId);
      setLessons((current) => current.filter((item) => String(item.id) !== lessonId));
    } catch (cause) {
      window.alert(cause instanceof Error ? cause.message : "Unable to delete lesson.");
    } finally {
      setDeletingLessonId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <PageSkeleton rows={4} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 px-1 pb-8 sm:space-y-8 sm:px-2">
      <header className="flex flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Tutor workspace{" "}
            <span aria-hidden="true">/</span> Course library
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            My courses
          </h1>
          <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">
            Build, organise, and support the learning experiences you create.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void loadCourses(true)}
            disabled={isRefreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} /> Refresh
          </button>
          <Link
            to="/tutor/builder"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> New course
          </Link>
        </div>
      </header>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {error}
        </div>
      )}
      <CourseStats courses={courses} />

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
        <section className="card-surface min-w-0 overflow-hidden">
          <div className="border-b border-border p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-foreground">Course library</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}{" "}
                  shown
                </p>
              </div>
              <div
                className="flex items-center rounded-xl border border-border bg-secondary/60 p-1"
                aria-label="Course layout"
              >
                <button
                  type="button"
                  aria-label="Show courses as cards"
                  aria-pressed={viewMode === "grid"}
                  onClick={() => setViewMode("grid")}
                  className={`rounded-lg p-2 transition ${viewMode === "grid" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Show courses as a list"
                  aria-pressed={viewMode === "list"}
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg p-2 transition ${viewMode === "list" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-[minmax(0,1fr)_160px]">
              <label className="relative block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, category, level…"
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </label>
              <select
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value)}
                aria-label="Filter by course status"
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="all">All statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-12 text-center sm:py-16">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {courses.length ? "No courses match these filters" : "Start your course library"}
              </h3>
              <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                {courses.length
                  ? "Try another search or choose a different status."
                  : "Create your first course and start sharing your expertise with learners."}
              </p>
              {!courses.length && (
                <Link
                  to="/tutor/builder"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  <Plus className="h-4 w-4" /> Create a course
                </Link>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4">
              {filteredCourses.map((course) => (
                <article
                  key={course.id}
                  className={`group overflow-hidden rounded-xl border transition ${selectedCourse?.slug === course.slug ? "border-primary/40 bg-primary/[0.03] shadow-sm" : "border-border hover:border-primary/25 hover:shadow-sm"}`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(course)}
                    aria-pressed={selectedCourse?.slug === course.slug}
                    className="block w-full text-left"
                  >
                    <div className="relative h-32 overflow-hidden bg-secondary">
                      {course.thumbnail ? (
                        <img
                          src={resolveCourseThumbnail(course.thumbnail) ?? undefined}
                          alt=""
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <CourseThumb
                          variant={course.image || "code"}
                          color={course.color}
                          title={course.title}
                          className="h-full"
                        />
                      )}
                      <span
                        className={`absolute left-3 top-3 inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusColor(course.status)}`}
                      >
                        {getStatusLabel(course.status)}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {course.title}
                      </h3>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {course.category} <span aria-hidden="true">·</span> {course.level}
                      </p>
                      <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {Number(course.students ?? 0).toLocaleString()}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          {Number(course.rating ?? 0).toFixed(1)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {course.lessons ?? 0} lessons
                        </span>
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center justify-between border-t border-border px-3 py-2">
                    <Link
                      to="/tutor/builder"
                      search={{ slug: course.slug }}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    >
                      <Edit3 className="h-3.5 w-3.5" /> Edit course
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleDeleteCourse(course)}
                      disabled={deletingCourseSlug === course.slug}
                      aria-label={`Delete ${course.title}`}
                      className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                    >
                      {deletingCourseSlug === course.slug ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`flex items-center gap-3 p-3 transition sm:gap-4 sm:px-4 ${selectedCourse?.slug === course.slug ? "bg-primary/[0.04]" : "hover:bg-secondary/40"}`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(course)}
                    aria-pressed={selectedCourse?.slug === course.slug}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-4"
                  >
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      {course.thumbnail ? (
                        <img
                          src={resolveCourseThumbnail(course.thumbnail) ?? undefined}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <CourseThumb
                          variant={course.image || "code"}
                          color={course.color}
                          title={course.title}
                          className="h-full"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {course.title}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {course.category} · {course.level}
                      </p>
                    </div>
                    <span
                      className={`hidden rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:inline-flex ${getStatusColor(course.status)}`}
                    >
                      {getStatusLabel(course.status)}
                    </span>
                    <span className="hidden items-center gap-1 text-xs text-muted-foreground md:inline-flex">
                      <Users className="h-3.5 w-3.5" />
                      {course.students ?? 0}
                    </span>
                    <span className="hidden items-center gap-1 text-xs text-muted-foreground lg:inline-flex">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {Number(course.rating ?? 0).toFixed(1)}
                    </span>
                  </button>
                  <Link
                    to="/tutor/builder"
                    search={{ slug: course.slug }}
                    aria-label={`Edit ${course.title}`}
                    className="rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleDeleteCourse(course)}
                    disabled={deletingCourseSlug === course.slug}
                    aria-label={`Delete ${course.title}`}
                    className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                  >
                    {deletingCourseSlug === course.slug ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <section className="card-surface overflow-hidden">
            {selectedCourse ? (
              <>
                <div className="relative h-36 bg-secondary">
                  {selectedCourse.thumbnail ? (
                    <img
                      src={resolveCourseThumbnail(selectedCourse.thumbnail) ?? undefined}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <CourseThumb
                      variant={selectedCourse.image || "code"}
                      color={selectedCourse.color}
                      title={selectedCourse.title}
                      className="h-full"
                    />
                  )}
                  <span
                    className={`absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusColor(selectedCourse.status)}`}
                  >
                    {getStatusLabel(selectedCourse.status)}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                    Selected course
                  </p>
                  <h2 className="mt-1 text-lg font-semibold leading-snug text-foreground">
                    {selectedCourse.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted-foreground">
                    {selectedCourse.description || "No course description added yet."}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                      {
                        label: "Learners",
                        value: Number(selectedCourse.students ?? 0).toLocaleString(),
                        icon: Users,
                      },
                      {
                        label: "Rating",
                        value: `${Number(selectedCourse.rating ?? 0).toFixed(1)} / 5`,
                        icon: Star,
                      },
                      {
                        label: "Lessons",
                        value: lessons.length || selectedCourse.lessons || 0,
                        icon: BookOpen,
                      },
                      { label: "Duration", value: selectedCourse.duration || "—", icon: Clock3 },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="rounded-xl bg-secondary/65 p-3">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <Icon className="h-3 w-3" />
                          {label}
                        </div>
                        <div className="mt-1 truncate text-sm font-semibold text-foreground">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      to="/tutor/builder"
                      search={{ slug: selectedCourse.slug }}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2.5 text-xs font-semibold text-foreground transition hover:bg-secondary"
                    >
                      <Edit3 className="h-3.5 w-3.5" /> Edit course
                    </Link>
                    <button
                      type="button"
                      onClick={() => setAssignmentCourse(selectedCourse)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add assignment
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/50" />
                <p className="mt-3 text-sm font-medium text-foreground">Select a course</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Choose a course to see its curriculum and details.
                </p>
              </div>
            )}
          </section>

          {selectedCourse && (
            <section className="card-surface overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Course curriculum</h2>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {lessons.length} lessons
                  </p>
                </div>
                {isDetailsLoading && (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                )}
              </div>
              <div className="max-h-72 overflow-y-auto p-2">
                {lessons.length ? (
                  lessons.slice(0, 8).map((lesson, index) => {
                    const isAssignment = String(lesson.type ?? "").toLowerCase() === "assignment";
                    return (
                      <div
                        key={lesson.id ?? lesson.slug ?? `${lesson.title}-${index}`}
                        className="group flex items-center gap-2 rounded-lg px-2 py-2.5 hover:bg-secondary/70"
                      >
                        <div
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${isAssignment ? "bg-amber-500/10 text-amber-700 dark:text-amber-300" : "bg-primary/10 text-primary"}`}
                        >
                          {isAssignment ? (
                            <FileText className="h-4 w-4" />
                          ) : (
                            <BookOpen className="h-4 w-4" />
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedLesson(lesson)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <p className="truncate text-xs font-medium text-foreground">
                            {lesson.title ?? lesson.name ?? "Untitled lesson"}
                          </p>
                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            {isAssignment ? "Assignment" : lesson.duration || "Course lesson"}
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDeleteLesson(lesson)}
                          disabled={deletingLessonId === String(lesson.id)}
                          aria-label={`Delete ${lesson.title ?? "lesson"}`}
                          className="rounded-md p-1.5 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive focus:opacity-100 group-hover:opacity-100 disabled:opacity-50"
                        >
                          {deletingLessonId === String(lesson.id) ? (
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-3 py-7 text-center">
                    <p className="text-xs text-muted-foreground">
                      {isDetailsLoading ? "Loading curriculum…" : "No lessons yet in this course."}
                    </p>
                    {!isDetailsLoading && (
                      <Link
                        to="/tutor/builder"
                        search={{ slug: selectedCourse.slug }}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        Add course content <ChevronRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
              {lessons.length > 8 && (
                <Link
                  to="/tutor/builder"
                  search={{ slug: selectedCourse.slug }}
                  className="block border-t border-border px-4 py-2.5 text-center text-xs font-semibold text-primary hover:bg-secondary/50"
                >
                  Manage all {lessons.length} lessons
                </Link>
              )}
            </section>
          )}

          {selectedCourse && (
            <section className="card-surface p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Recent reviews</h2>
                <span className="text-[10px] text-muted-foreground">{reviews.length} total</span>
              </div>
              {reviews.length ? (
                <ul className="mt-3 space-y-3">
                  {reviews.slice(0, 3).map((review, index) => (
                    <li
                      key={review.id ?? review.user?.id ?? index}
                      className="border-t border-border pt-3 first:border-0 first:pt-0"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs font-medium text-foreground">
                          {review.user?.full_name ?? review.user?.username ?? "Learner"}
                        </p>
                        <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                          <Star className="h-3 w-3 fill-current" />
                          {review.rating ?? "—"}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                        {review.comment ?? review.content ?? "No review text."}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">
                  No reviews have been posted yet.
                </p>
              )}
            </section>
          )}
        </aside>
      </div>

      {assignmentCourse && (
        <AssignmentDialog
          course={assignmentCourse}
          onClose={() => setAssignmentCourse(null)}
          onCreated={() => {
            const courseSlug = assignmentCourse.slug;
            setAssignmentCourse(null);
            void loadCourseDetails(courseSlug);
          }}
        />
      )}

      {selectedLesson && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedLesson(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="lesson-details-title"
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-primary">{selectedCourse?.title}</p>
                <h2
                  id="lesson-details-title"
                  className="mt-1 text-lg font-semibold text-foreground"
                >
                  {selectedLesson.title ?? selectedLesson.name ?? "Lesson details"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLesson(null)}
                aria-label="Close lesson details"
                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                {String(selectedLesson.type ?? "lesson")}
              </span>
              {selectedLesson.description && (
                <p className="leading-6 text-foreground">{selectedLesson.description}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Student submissions and grading are not exposed by the current API.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default TutorCourses;

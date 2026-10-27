import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle, FileText, Plus, RefreshCw, Search, X } from "lucide-react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { getCourseLessons, getCourses } from "@/lib/api";

export const Route = createFileRoute("/tutor/assignments")({ component: TutorAssignments });

type Assignment = {
  id: string;
  title: string;
  courseTitle: string;
  description: string;
  content: string;
  isPublished: boolean;
};

type AssignmentCourse = {
  slug?: string;
  title?: string;
};

type AssignmentLesson = {
  id?: string | number;
  slug?: string;
  type?: string;
  title?: string;
  description?: string;
  content?: string;
  is_published?: boolean;
  isPublished?: boolean;
};

function readLessons(payload: unknown, course: AssignmentCourse): Assignment[] {
  const envelope =
    payload && typeof payload === "object" ? (payload as { results?: unknown }) : null;
  const lessons = Array.isArray(payload)
    ? (payload as AssignmentLesson[])
    : Array.isArray(envelope?.results)
      ? (envelope.results as AssignmentLesson[])
      : [];
  return lessons
    .filter((lesson) => String(lesson.type ?? "").toLowerCase() === "assignment")
    .map((lesson) => ({
      id: String(lesson.id ?? lesson.slug),
      title: lesson.title ?? "Untitled assignment",
      courseTitle: course.title ?? "Course",
      description: lesson.description ?? "",
      content: lesson.content ?? "",
      isPublished: Boolean(lesson.is_published ?? lesson.isPublished ?? false),
    }));
}

function TutorAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Assignment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAssignments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const courses = (await getCourses()) as AssignmentCourse[];
      const results = await Promise.all(
        courses
          .filter((course): course is AssignmentCourse & { slug: string } => Boolean(course.slug))
          .map(async (course) => readLessons(await getCourseLessons(course.slug), course)),
      );
      setAssignments(results.flat());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load assignments.");
      setAssignments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadAssignments();
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return assignments;
    return assignments.filter((assignment) =>
      [assignment.title, assignment.courseTitle, assignment.description].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [assignments, query]);

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <PageSkeleton rows={4} />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Assignments</h2>
          <p className="mt-1 text-sm text-gray-500">
            Assignment lessons published in your courses.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => void loadAssignments()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <Link
            to="/tutor/courses"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Add to a course
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
          <p className="text-sm text-gray-500">Total assignments</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-2xl font-bold text-emerald-600">
            {assignments.filter((item) => item.isPublished).length}
          </p>
          <p className="text-sm text-gray-500">Published</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-2xl font-bold text-amber-600">
            {assignments.filter((item) => !item.isPublished).length}
          </p>
          <p className="text-sm text-gray-500">Drafts</p>
        </div>
      </div>

      <div className="relative rounded-xl border border-gray-200 bg-white p-3">
        <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search assignments or courses..."
          className="w-full rounded-lg bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <FileText className="mx-auto mb-3 h-12 w-12 text-gray-300" />
          <p className="font-medium text-gray-700">No assignment lessons found</p>
          <p className="mt-1 text-sm text-gray-400">
            Add an assignment to any course and it will appear here.
          </p>
          <Link
            to="/tutor/courses"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Choose a course
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((assignment) => (
            <article
              key={assignment.id}
              className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900">{assignment.title}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                      <BookOpen className="h-3.5 w-3.5" />
                      {assignment.courseTitle}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2 py-1 text-xs font-medium ${assignment.isPublished ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}
                >
                  {assignment.isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <p className="mt-4 line-clamp-2 text-sm text-gray-600">
                {assignment.description || "No assignment description provided."}
              </p>
              <button
                onClick={() => setSelected(assignment)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View assignment <CheckCircle className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-blue-600">{selected.courseTitle}</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">{selected.title}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 space-y-4 text-sm text-gray-700">
              <p>{selected.description || "No description provided."}</p>
              {selected.content && (
                <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4">
                  {selected.content}
                </div>
              )}
              <p className="text-xs text-gray-500">
                Student submissions and grading are not exposed by the current API.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TutorAssignments;

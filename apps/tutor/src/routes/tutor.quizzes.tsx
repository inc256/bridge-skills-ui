import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, RefreshCw, Search } from "lucide-react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { getCourses, getQuizAttempts, getQuizzesForCourse } from "@/lib/api";

export const Route = createFileRoute("/tutor/quizzes")({ component: TutorQuizzes });

type Quiz = {
  id: string;
  title: string;
  courseTitle: string;
  courseSlug: string;
  questionCount: number;
  attemptCount: number;
  averageScore: number | null;
  isPublished: boolean;
  duration: number | null;
  raw: any;
};

function items(payload: any) {
  return Array.isArray(payload) ? payload : payload?.results ?? payload?.quizzes ?? [];
}

function averageScore(attempts: any[]) {
  const scores = attempts.map((attempt) => Number(attempt.score ?? attempt.percentage ?? attempt.percent)).filter(Number.isFinite);
  return scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : null;
}

function TutorQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuizzes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const courses = await getCourses();
      const quizGroups = await Promise.all(courses.filter((course: any) => course.slug).map(async (course: any) => {
        const courseQuizzes = await getQuizzesForCourse(course.slug);
        return Promise.all(courseQuizzes.map(async (quiz: any) => {
          const id = String(quiz.id ?? quiz.uuid ?? quiz.slug);
          let attempts: any[] = [];
          try { attempts = await getQuizAttempts(id); } catch { /* attempts may be unavailable to tutors */ }
          return {
            id,
            title: quiz.title ?? quiz.name ?? "Untitled quiz",
            courseTitle: course.title ?? "Course",
            courseSlug: course.slug,
            questionCount: Number(quiz.question_count ?? quiz.questions_count ?? quiz.questions?.length ?? 0),
            attemptCount: Number(quiz.attempt_count ?? quiz.attempts_count ?? attempts.length),
            averageScore: averageScore(attempts),
            isPublished: Boolean(quiz.is_published ?? quiz.published ?? quiz.status === "published"),
            duration: quiz.duration == null ? null : Number(quiz.duration),
            raw: quiz,
          } as Quiz;
        }));
      }));
      setQuizzes(quizGroups.flat());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load quizzes.");
      setQuizzes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { void loadQuizzes(); }, []);

  const filtered = useMemo(() => quizzes.filter((quiz) => {
    if (status === "published" && !quiz.isPublished) return false;
    if (status === "draft" && quiz.isPublished) return false;
    const normalized = query.trim().toLowerCase();
    return !normalized || `${quiz.title} ${quiz.courseTitle}`.toLowerCase().includes(normalized);
  }), [quizzes, query, status]);

  if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center"><PageSkeleton rows={4} /></div>;

  const published = quizzes.filter((quiz) => quiz.isPublished).length;
  const attempts = quizzes.reduce((sum, quiz) => sum + quiz.attemptCount, 0);
  const scored = quizzes.filter((quiz) => quiz.averageScore !== null);
  const average = scored.length ? Math.round(scored.reduce((sum, quiz) => sum + (quiz.averageScore ?? 0), 0) / scored.length) : null;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Quizzes</h2><p className="mt-1 text-sm text-gray-500">Live quizzes and attempt history from your courses.</p></div><button onClick={() => void loadQuizzes()} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><RefreshCw className="h-4 w-4" /> Refresh</button></header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-2xl font-bold text-gray-900">{quizzes.length}</p><p className="text-sm text-gray-500">Total quizzes</p></div><div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-2xl font-bold text-emerald-600">{published}</p><p className="text-sm text-gray-500">Published</p></div><div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-2xl font-bold text-blue-600">{attempts}</p><p className="text-sm text-gray-500">Attempts</p></div><div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-2xl font-bold text-amber-600">{average == null ? "—" : `${average}%`}</p><p className="text-sm text-gray-500">Average score</p></div></div>
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search quizzes or courses..." className="w-full rounded-lg bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-200" /></div><div className="flex gap-2">{(["all", "published", "draft"] as const).map((value) => <button key={value} onClick={() => setStatus(value)} className={`rounded-lg px-3 py-2 text-sm font-medium capitalize ${status === value ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>{value}</button>)}</div></div>
      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      {filtered.length === 0 ? <div className="rounded-xl border border-gray-200 bg-white p-12 text-center"><HelpCircle className="mx-auto mb-3 h-12 w-12 text-gray-300" /><p className="font-medium text-gray-700">No quizzes found</p><p className="mt-1 text-sm text-gray-400">Create a quiz in Course Builder to see it here.</p></div> : <div className="space-y-3">{filtered.map((quiz) => { const isExpanded = expanded === quiz.id; return <article key={quiz.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white"><button onClick={() => setExpanded(isExpanded ? null : quiz.id)} className="flex w-full items-center justify-between gap-4 p-4 text-left hover:bg-gray-50"><div className="flex min-w-0 items-start gap-3"><div className={`rounded-lg p-2 ${quiz.isPublished ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}><HelpCircle className="h-5 w-5" /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-semibold text-gray-900">{quiz.title}</h3><span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${quiz.isPublished ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>{quiz.isPublished ? "Published" : "Draft"}</span></div><p className="mt-1 text-sm text-gray-500">{quiz.courseTitle} · {quiz.questionCount} questions · {quiz.attemptCount} attempts</p></div></div>{isExpanded ? <ChevronUp className="h-5 w-5 shrink-0 text-gray-400" /> : <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />}</button>{isExpanded && <div className="grid gap-3 border-t border-gray-100 bg-gray-50 p-4 sm:grid-cols-4"><div className="rounded-lg border border-gray-200 bg-white p-3"><p className="text-xs text-gray-500">Questions</p><p className="text-lg font-bold text-gray-900">{quiz.questionCount}</p></div><div className="rounded-lg border border-gray-200 bg-white p-3"><p className="text-xs text-gray-500">Attempts</p><p className="text-lg font-bold text-gray-900">{quiz.attemptCount}</p></div><div className="rounded-lg border border-gray-200 bg-white p-3"><p className="text-xs text-gray-500">Average score</p><p className="text-lg font-bold text-gray-900">{quiz.averageScore == null ? "—" : `${quiz.averageScore}%`}</p></div><div className="rounded-lg border border-gray-200 bg-white p-3"><p className="text-xs text-gray-500">Duration</p><p className="text-lg font-bold text-gray-900">{quiz.duration == null ? "—" : `${quiz.duration} min`}</p></div><div className="flex items-center gap-2 text-xs text-gray-500 sm:col-span-4"><CheckCircle className="h-4 w-4 text-emerald-600" /> Data loaded from the course quiz and attempt APIs.</div></div>}</article>; })}</div>}
    </div>
  );
}

export default TutorQuizzes;

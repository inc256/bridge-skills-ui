import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { AlertCircle, BookOpen, MessageCircle, Send, ThumbsUp } from "lucide-react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import {
  createCourseForumThread,
  createForumReply,
  getCourseForumThreads,
  getForumReplies,
  getMyEnrollments,
} from "@/lib/api";
import type { Course, ForumReply, ForumThread } from "@/lib/api";

export const Route = createFileRoute("/student/forum")({
  component: CourseForums,
});

function CourseForums() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseSlug, setCourseSlug] = useState("");
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadTitle, setThreadTitle] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    let cancelled = false;
    void getMyEnrollments()
      .then((enrollments) => {
        if (cancelled) return;
        const enrolledCourses = enrollments
          .filter((enrollment) => enrollment.course && enrollment.status !== "dropped")
          .map((enrollment) => enrollment.course as Course);
        setCourses(enrolledCourses);
        setCourseSlug((current) => current || enrolledCourses[0]?.slug || "");
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Could not load your enrolled courses.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!courseSlug) {
      setThreads([]);
      setSelectedThread(null);
      setReplies([]);
      return;
    }

    let cancelled = false;
    setError(null);
    setSelectedThread(null);
    setReplies([]);
    void getCourseForumThreads(courseSlug)
      .then((courseThreads) => {
        if (cancelled) return;
        setThreads(courseThreads);
        setSelectedThread(courseThreads[0] ?? null);
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setThreads([]);
          setError(loadError instanceof Error ? loadError.message : "Could not load the course forum.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [courseSlug]);

  useEffect(() => {
    if (!selectedThread) {
      setReplies([]);
      return;
    }
    let cancelled = false;
    setIsLoadingReplies(true);
    void getForumReplies(selectedThread.id)
      .then((threadReplies) => {
        if (!cancelled) setReplies(threadReplies);
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setReplies([]);
          setError(loadError instanceof Error ? loadError.message : "Could not load replies.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingReplies(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedThread]);

  async function handleCreateThread(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!courseSlug || !threadTitle.trim() || !threadContent.trim()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const created = await createCourseForumThread(courseSlug, {
        title: threadTitle.trim(),
        content: threadContent.trim(),
      });
      setThreads((current) => [created, ...current]);
      setSelectedThread(created);
      setThreadTitle("");
      setThreadContent("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not create your discussion.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCreateReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedThread || !replyContent.trim()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const created = await createForumReply(selectedThread.id, replyContent.trim());
      setReplies((current) => [...current, created]);
      setThreads((current) => current.map((thread) => thread.id === selectedThread.id
        ? { ...thread, replies_count: thread.replies_count + 1 }
        : thread));
      setSelectedThread((current) => current ? { ...current, replies_count: current.replies_count + 1 } : current);
      setReplyContent("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not post your reply.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <div className="mx-auto max-w-7xl p-4 sm:p-6"><PageSkeleton rows={4} /></div>;
  }

  const selectedCourse = courses.find((course) => course.slug === courseSlug);

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <header className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary"><MessageCircle className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Course forums</h1>
            <p className="mt-1 text-sm text-muted-foreground">Ask questions and share ideas with learners and instructors.</p>
          </div>
        </div>
        {courses.length > 0 && (
          <label className="mt-5 block max-w-xl space-y-1.5">
            <span className="text-sm font-medium">Choose a course</span>
            <select value={courseSlug} onChange={(event) => setCourseSlug(event.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm">
              {courses.map((course) => <option key={course.slug} value={course.slug}>{course.title}</option>)}
            </select>
          </label>
        )}
      </header>

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}
        </div>
      )}

      {courses.length === 0 ? (
        <section className="rounded-2xl border border-border bg-card p-10 text-center">
          <BookOpen className="mx-auto h-9 w-9 text-muted-foreground" />
          <h2 className="mt-3 text-lg font-semibold">Enroll in a course to join its forum</h2>
          <p className="mt-1 text-sm text-muted-foreground">Course discussions are available to enrolled learners.</p>
        </section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section className="space-y-4">
            <form onSubmit={handleCreateThread} className="space-y-3 rounded-2xl border border-border bg-card p-4 sm:p-5">
              <h2 className="font-semibold">Start a discussion</h2>
              <input value={threadTitle} onChange={(event) => setThreadTitle(event.target.value)} maxLength={160} required placeholder="Question or discussion title" className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm" />
              <textarea value={threadContent} onChange={(event) => setThreadContent(event.target.value)} required rows={4} placeholder="Add context so the community can help..." className="w-full resize-y rounded-xl border border-border bg-background px-3 py-2.5 text-sm" />
              <button disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50">
                <Send className="h-4 w-4" />Post discussion
              </button>
            </form>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h2 className="font-semibold">{selectedCourse?.title} discussions</h2>
                <p className="text-xs text-muted-foreground">{threads.length} topics</p>
              </div>
              {threads.length === 0 ? (
                <p className="p-5 text-sm text-muted-foreground">No discussions yet. Start the first one.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {threads.map((thread) => (
                    <li key={thread.id}>
                      <button type="button" onClick={() => setSelectedThread(thread)} className={`w-full p-4 text-left transition-colors hover:bg-muted/50 ${selectedThread?.id === thread.id ? "bg-primary/5" : ""}`}>
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-medium">{thread.title}</span>
                          <span className="shrink-0 text-xs text-muted-foreground">{thread.replies_count} replies</span>
                        </span>
                        <span className="mt-1 block line-clamp-2 text-sm text-muted-foreground">{thread.content}</span>
                        <span className="mt-2 block text-xs text-muted-foreground">{thread.author}{thread.pinned ? " · Pinned" : ""}{thread.is_locked ? " · Locked" : ""}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="flex min-h-[32rem] flex-col rounded-2xl border border-border bg-card">
            {selectedThread ? (
              <>
                <div className="border-b border-border p-4 sm:p-5">
                  <h2 className="text-lg font-semibold">{selectedThread.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">Posted by {selectedThread.author}</p>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{selectedThread.content}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground"><ThumbsUp className="h-3.5 w-3.5" />{selectedThread.views} views</span>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
                  <h3 className="text-sm font-semibold">Replies ({replies.length})</h3>
                  {isLoadingReplies ? <PageSkeleton rows={2} /> : replies.length === 0
                    ? <p className="text-sm text-muted-foreground">No replies yet.</p>
                    : replies.map((reply) => (
                      <article key={reply.id} className="rounded-xl bg-muted/40 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium">{reply.author.full_name || reply.author.username}</p>
                          {reply.is_solution && <span className="text-xs font-medium text-emerald-700">Solution</span>}
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{reply.content}</p>
                      </article>
                    ))}
                </div>
                {selectedThread.is_locked ? (
                  <p className="border-t border-border p-4 text-sm text-muted-foreground">This discussion is locked.</p>
                ) : (
                  <form onSubmit={handleCreateReply} className="flex gap-2 border-t border-border p-4">
                    <input value={replyContent} onChange={(event) => setReplyContent(event.target.value)} required placeholder="Write a reply..." className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm" />
                    <button disabled={isSubmitting} aria-label="Post reply" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-50"><Send className="h-4 w-4" /></button>
                  </form>
                )}
              </>
            ) : (
              <div className="grid flex-1 place-items-center p-8 text-center text-sm text-muted-foreground">Select a discussion to read the conversation.</div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowUpRight, BookOpen, CalendarDays } from "lucide-react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { getBlogPost, getBlogPosts } from "@/lib/api";
import type { BlogPost } from "@/lib/api";

export const Route = createFileRoute("/student/blog")({
  component: StudentBlog,
});

function StudentBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getBlogPosts()
      .then((postList) => {
        if (!cancelled) setPosts(postList);
      })
      .catch((loadError: unknown) => {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : "Could not load articles.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function openPost(post: BlogPost) {
    if (!post.slug) {
      setError("This article is missing its page link.");
      return;
    }
    setLoadingPost(true);
    setError(null);
    try {
      const detail = await getBlogPost(post.slug);
      setSelectedPost(detail);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not open this article.");
    } finally {
      setLoadingPost(false);
    }
  }

  if (loading) return <div className="mx-auto max-w-6xl p-4 sm:p-6"><PageSkeleton rows={4} /></div>;

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      <header className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary"><BookOpen className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">TechBridge articles</h1>
            <p className="mt-1 text-sm text-muted-foreground">Ideas, guidance, and updates from the TechBridge community.</p>
          </div>
        </div>
      </header>

      {error && <div role="alert" className="flex gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}

      {selectedPost ? (
        <article className="rounded-2xl border border-border bg-card p-5 sm:p-8">
          <button type="button" onClick={() => setSelectedPost(null)} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"><ArrowLeft className="h-4 w-4" />All articles</button>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{selectedPost.title}</h2>
          {selectedPost.publishedAt && <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />{new Date(selectedPost.publishedAt).toLocaleDateString()}</p>}
          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-muted-foreground">{String(selectedPost.raw?.content ?? selectedPost.raw?.body ?? selectedPost.summary)}</p>
          {selectedPost.raw?.url && <a href={String(selectedPost.raw.url)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">Read original <ArrowUpRight className="h-4 w-4" /></a>}
        </article>
      ) : loadingPost ? (
        <div className="rounded-2xl border border-border bg-card p-8"><PageSkeleton rows={3} /></div>
      ) : posts.length === 0 ? (
        <section className="rounded-2xl border border-border bg-card p-10 text-center">
          <BookOpen className="mx-auto h-9 w-9 text-muted-foreground" />
          <h2 className="mt-3 text-lg font-semibold">No articles published yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Check back soon for new stories and learning tips.</p>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <button key={post.id} type="button" onClick={() => void openPost(post)} className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:border-primary/40 hover:shadow-md">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">{post.publishedAt && <><CalendarDays className="h-3.5 w-3.5" />{new Date(post.publishedAt).toLocaleDateString()}</>}</span>
              <span className="mt-3 block text-lg font-semibold">{post.title}</span>
              <span className="mt-2 block line-clamp-4 text-sm leading-relaxed text-muted-foreground">{post.summary}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">Read article <ArrowUpRight className="h-4 w-4" /></span>
            </button>
          ))}
        </section>
      )}
    </main>
  );
}

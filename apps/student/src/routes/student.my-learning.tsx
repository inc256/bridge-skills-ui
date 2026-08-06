import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { courses } from "@/lib/mock-data";
import { CourseCard } from "@/components/course-card";

export const Route = createFileRoute("/student/my-learning")({
  component: MyLearning,
});

const tabs = ["In progress", "Completed", "Wishlist"] as const;

function MyLearning() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("In progress");
  const inProgress = courses.filter((c) => c.progress != null && c.progress < 100);
  const completed = courses.filter((c) => c.progress === 100);
  const wishlist = courses.filter((c) => c.progress == null);
  const list = tab === "In progress" ? inProgress : tab === "Completed" ? completed : wishlist;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight">My learning</h2>
        <p className="mt-1 text-sm text-muted-foreground">Continue where you left off, revisit completed courses, or plan what's next.</p>
      </div>

      <div className="flex flex-wrap items-center gap-1 rounded-[14px] border border-border bg-card p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-[10px] px-4 py-2 text-sm font-medium transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {t}
            <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${tab === t ? "bg-white/20" : "bg-secondary"}`}>
              {t === "In progress" ? inProgress.length : t === "Completed" ? completed.length : wishlist.length}
            </span>
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      ) : (
        <div className="card-surface flex flex-col items-center py-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-muted-foreground text-xl">📚</div>
          <h3 className="mt-4 text-[17px] font-semibold">Nothing here yet</h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">Your {tab.toLowerCase()} courses will appear here once you start learning.</p>
          <Link to="/student/explore" className="mt-5 inline-flex items-center rounded-[14px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Browse courses
          </Link>
        </div>
      )}
    </div>
  );
}

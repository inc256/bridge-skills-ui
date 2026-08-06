import { createFileRoute } from "@tanstack/react-router";
import { courses } from "@/lib/mock-data";
import { CourseCard } from "@/components/course-card";

export const Route = createFileRoute("/student/bookmarks")({
  component: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight">Bookmarks</h2>
        <p className="mt-1 text-sm text-muted-foreground">Courses and lessons you've saved for later.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.slice(0, 4).map((c) => <CourseCard key={c.id} course={c} />)}
      </div>
    </div>
  ),
});

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle } from "lucide-react";
import { CourseThumb } from "@/components/course-thumb";
import { getMockCourses, isMockCourseEnrolled } from "@/lib/mock-course-data";
import { setSelectedCourseSlug } from "@/lib/student-onboarding";

export const Route = createFileRoute("/student/study/")({
  component: StudyCoursePicker,
});

function StudyCoursePicker() {
  const availableCourses = getMockCourses().filter((course) => isMockCourseEnrolled(course.slug)).slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[24px] font-semibold tracking-tight">Choose a course to start studying</h2>
          <p className="mt-1 text-sm text-muted-foreground">Select one active course first, then continue with lessons.</p>
        </div>
        <Link to="/student/my-learning" className="inline-flex items-center gap-1.5 rounded-[14px] border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
          My learning <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {availableCourses.map((course) => (
          <Link
            key={course.id}
            to="/student/study/$slug"
            params={{ slug: course.slug }}
            onClick={() => setSelectedCourseSlug(course.slug)}
            className="group card-surface flex gap-3 p-3 transition-colors hover:border-primary/40 hover:bg-secondary/40"
          >
            <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl">
              <CourseThumb variant={course.image} color={course.color} thumbnail={course.thumbnail} title={course.title} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-medium text-muted-foreground">{course.category}</div>
              <div className="mt-1 truncate text-sm font-semibold group-hover:text-primary transition-colors">{course.title}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <PlayCircle className="h-3.5 w-3.5" />
                <span>{course.progress}% complete</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 self-center text-muted-foreground group-hover:text-primary" />
          </Link>
        ))}
      </div>

      <div className="card-surface p-4 text-sm text-muted-foreground">
        No active course yet? Go to <Link to="/student/explore" className="font-medium text-primary hover:underline">Explore</Link> and enroll in a course first.
      </div>
    </div>
  );
}

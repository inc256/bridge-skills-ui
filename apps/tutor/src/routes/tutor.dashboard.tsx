import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  TrendingUp,
  CircleCheck,
  Clock3,
  Clipboard,
  Plus,
} from "lucide-react";
import { CourseThumb } from "@/components/course-thumb";

export const Route = createFileRoute("/tutor/dashboard")({
  component: TutorDashboard,
});

const DASHBOARD_COURSES = [
  {
    id: "cloud-computing",
    title: "Diploma in Cloud Computing",
    instructor: "Pryankar Jenni",
    status: "PUBLISHED",
    image: "cloud",
    color: "#1F6E5C",
  },
  {
    id: "design-thinking",
    title: "Diploma in Design Thinking",
    instructor: "Kajjubi Henry",
    status: "DRAFT",
    image: "design",
    color: "#587267",
  },
];

const DASHBOARD_STATS = [
  { value: "2", label: "Published Courses", icon: CircleCheck },
  { value: "89", label: "Total Students", icon: Clock3 },
  { value: "2.5", suffix: "of 5", label: "Average Rating", icon: Clipboard },
  { value: "23K", label: "Total Earnings", icon: TrendingUp },
];

export function TutorDashboard() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="mx-auto w-full max-w-[1200px] px-1 pb-24 sm:px-2 lg:pb-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h1 className="text-[1.8rem] font-bold leading-[1.2] text-[#1a4d2e] dark:text-[#a7d8ae] sm:text-[2.8rem]">
            {greeting}, Mubarak
          </h1>
          <p className="mt-2 text-xs font-semibold leading-[1.4] text-foreground sm:text-base">
            Your teaching at a glance. Manage your courses, support learners, and track your impact.
          </p>
        </div>
        <Link
          to="/tutor/builder"
          className="hidden shrink-0 items-center justify-center gap-2 rounded-full bg-[#00b87c] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#009e6b] sm:inline-flex"
        >
          <Plus className="h-4 w-4" />
          Create a New Course
        </Link>
      </header>

      <section
        aria-label="Teaching overview"
        className="mb-6 grid grid-cols-2 gap-3 sm:mb-10 sm:grid-cols-4 sm:gap-5"
      >
        {DASHBOARD_STATS.map(({ value, suffix, label, icon: Icon }) => (
          <article
            key={label}
            className="flex min-h-[112px] flex-col justify-between rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm dark:border-[#293b30] dark:bg-[#111b16]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="text-[2rem] font-semibold leading-none tracking-[-1px] text-[#111827] dark:text-white">
                {value}
                {suffix && (
                  <span className="ml-1.5 text-base font-normal tracking-normal text-[#6b7280]">
                    {suffix}
                  </span>
                )}
              </div>
              <Icon className="h-6 w-6 shrink-0 text-[#00b87c]" aria-hidden="true" />
            </div>
            <p className="mt-2 text-xs font-semibold text-[#6b7280] dark:text-[#a6b8aa] sm:text-[0.95rem] sm:font-medium">
              {label}
            </p>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white dark:border-[#293b30] dark:bg-[#111b16]">
        <h2 className="border-b border-[#e5e7eb] px-4 py-4 text-base font-medium text-[#1a4d2e] dark:border-[#293b30] dark:text-[#a7d8ae] sm:px-6 sm:py-5 sm:text-[1.2rem]">
          My Courses
        </h2>

        <div>
          {DASHBOARD_COURSES.map((course) => (
            <Link
              key={course.id}
              to="/tutor/courses"
              className="group flex items-center border-b border-[#e5e7eb] px-4 py-4 transition hover:bg-[#f9fafb] last:border-b-0 dark:border-[#293b30] dark:hover:bg-[#17251d] sm:px-6 sm:py-5"
            >
              <div className="mr-3 h-[70px] w-[70px] shrink-0 overflow-hidden rounded-lg bg-[#eee] sm:mr-5 sm:h-[65px] sm:w-[100px]">
                <CourseThumb
                  variant={course.image}
                  color={course.color}
                  title={course.title}
                  className="h-full w-full"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[0.95rem] font-semibold text-[#111827] dark:text-white sm:text-[1.1rem]">
                  {course.title}
                </h3>
                <p className="mt-1 mb-[6px] text-xs text-[#6b7280] dark:text-[#a6b8aa] sm:text-[0.9rem] sm:mb-2">
                  By {course.instructor}
                </p>
                <span
                  className={
                    course.status === "PUBLISHED"
                      ? "inline-block rounded px-2 py-1 text-[0.65rem] font-semibold tracking-[0.5px] text-[#059669] bg-[#e6f7f0] dark:bg-[#173629] dark:text-[#86efac]"
                      : "inline-block rounded px-2 py-1 text-[0.65rem] font-semibold tracking-[0.5px] text-[#4b5563] bg-[#f3f4f6] dark:bg-[#293b30] dark:text-[#d1d5db]"
                  }
                >
                  {course.status}
                </span>
              </div>

              <ArrowRight className="ml-2 h-4 w-4 shrink-0 text-[#9ca3af] transition group-hover:translate-x-0.5 group-hover:text-[#00b87c] sm:h-[1.2rem] sm:w-[1.2rem] sm:p-0.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

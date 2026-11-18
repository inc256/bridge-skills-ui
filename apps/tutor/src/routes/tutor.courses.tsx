import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { CourseThumb } from "@/components/course-thumb";

export const Route = createFileRoute("/tutor/courses")({
  component: TutorCourses,
});

const MOCK_COURSES = [
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

export function TutorCourses() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-1 pb-24 sm:px-2 lg:pb-8">
      <section className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:border-[#293b30] dark:bg-[#111b16]">
        <h1 className="border-b border-[#e5e7eb] px-4 py-4 text-[1.2rem] font-normal text-[#2d5a45] dark:border-[#293b30] dark:text-[#a7d8ae] sm:px-[30px] sm:py-[24px] sm:text-[1.4rem]">
          My Courses
        </h1>

        <div>
          {MOCK_COURSES.map((course) => (
            <Link
              key={course.id}
              to="/tutor/builder"
              search={{ slug: course.id }}
              className="group flex items-center border-b border-[#e5e7eb] px-4 py-4 transition hover:bg-[#f9fafb] last:border-b-0 dark:border-[#293b30] dark:hover:bg-[#17251d] sm:px-[30px] sm:py-6"
            >
              <div className="mr-4 h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#eee] sm:h-[90px] sm:w-[140px] sm:mr-6">
                <CourseThumb
                  variant={course.image}
                  color={course.color}
                  title={course.title}
                  className="h-full w-full"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h2 className="truncate text-base font-semibold text-[#111827] dark:text-white sm:text-[1.25rem]">
                  {course.title}
                </h2>
                <p className="mt-1 mb-2 text-[0.85rem] text-[#6b7280] dark:text-[#a6b8aa] sm:mb-3 sm:text-base">
                  By {course.instructor}
                </p>
                <span
                  className={
                    course.status === "PUBLISHED"
                      ? "inline-block self-start rounded-md bg-[#e6f7f0] px-2 py-1 text-[0.7rem] font-semibold tracking-[0.5px] text-[#059669] dark:bg-[#173629] dark:text-[#86efac] sm:px-3 sm:py-[6px] sm:text-[0.8rem]"
                      : "inline-block self-start rounded-md bg-[#f3f4f6] px-2 py-1 text-[0.7rem] font-semibold tracking-[0.5px] text-[#4b5563] dark:bg-[#293b30] dark:text-[#d1d5db] sm:px-3 sm:py-[6px] sm:text-[0.8rem]"
                  }
                >
                  {course.status}
                </span>
              </div>

              <ChevronRight className="ml-2 h-5 w-5 shrink-0 text-[#6b7280] transition-transform group-hover:translate-x-1 group-hover:text-[#111827] dark:text-[#a6b8aa] sm:h-6 sm:w-6" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

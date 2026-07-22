import { Link } from "@tanstack/react-router";
import { Clock3, Layers3, Play, ShoppingCart, Signal, Users } from "lucide-react";
import type { Course } from "@/lib/mock-data";
import { CourseThumb } from "./course-thumb";

export function CourseCard({ course, href }: { course: Course; href?: string }) {
  const to = href ?? "/student/course/$slug";
  const isFree = course.price.toLowerCase() === "free" || course.price === "$0";
  const actionLabel = course.progress != null ? "Continue" : "Enroll";
  const ActionIcon = course.progress != null ? Play : ShoppingCart;
  const primaryInitials = course.instructor
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const secondaryInitials = course.category.slice(0, 2).toUpperCase();

  return (
    <Link
      to={to}
      params={{ slug: course.slug }}
      className="group mx-auto flex w-full max-w-[340px] flex-col overflow-hidden rounded-[24px] border border-[#e4f0ea] bg-white shadow-[0_2px_10px_rgba(26,110,80,0.02)] transition-all duration-150 hover:-translate-y-[3px] hover:border-[#b6d4c8] hover:shadow-[0_8px_24px_rgba(26,110,80,0.04)]"
    >
      <div className="relative h-[150px] flex-shrink-0 overflow-hidden bg-[#dcebe4]">
        <CourseThumb variant={course.image} color={course.color} title={course.title} className="h-full transition-transform duration-200 group-hover:scale-[1.02]" />
        <span className={`absolute right-3 top-3 z-[2] rounded-full px-3 py-[3px] text-[9px] font-semibold uppercase tracking-[0.3px] ${isFree ? "bg-[rgba(212,240,229,0.92)] text-[#0d5c47]" : "bg-[rgba(234,240,237,0.92)] text-[#2d4d42]"}`}>
          {isFree ? "Free" : "Premium"}
        </span>
        <span className="absolute bottom-3 left-3 z-[2] inline-flex items-center rounded-full bg-[rgba(255,255,255,0.85)] px-3 py-[2px] text-[9px] font-medium uppercase text-[#1a3d36]">
          <Signal className="mr-1 h-2.5 w-2.5" /> {course.level}
        </span>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-[1.2rem] pt-[1.1rem]">
        <div className="mb-0.5 flex items-start justify-between">
          <div className="text-[0.95rem] font-semibold text-[#0d2922]">
            {course.price === "Free" ? "$0" : course.price}
            <span className="ml-1 text-[0.65rem] font-normal text-[#4f7568]">· {course.modules} modules</span>
          </div>
        </div>

        <h3 className="mt-0.5 line-clamp-2 text-[1rem] font-medium text-[#0d2922]">
          {course.title}
        </h3>

        <p className="mb-2 mt-1 line-clamp-2 flex-1 text-[0.8rem] leading-[1.4] text-[#3d6b5d]">
          {course.description}
        </p>

        <div className="mb-1 flex flex-wrap gap-x-4 gap-y-1 text-[0.65rem] text-[#4f7568]">
          <span className="inline-flex items-center"><Users className="mr-1 h-3.5 w-3.5 text-[#2a7a66]" />{(course.students / 1000).toFixed(1)}k students</span>
          <span className="inline-flex items-center"><Clock3 className="mr-1 h-3.5 w-3.5 text-[#2a7a66]" />{course.duration}</span>
          <span className="inline-flex items-center"><Layers3 className="mr-1 h-3.5 w-3.5 text-[#2a7a66]" />{course.modules} modules</span>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-[#eaf3ef] pt-2.5">
          <div className="flex items-center gap-1">
            <div className="-mr-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#8dc0b0] text-[9px] font-semibold text-[#1a4a3d]">
              {primaryInitials}
            </div>
            <div className="-mr-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#b6d4c8] text-[9px] font-semibold text-[#1a4a3d]">
              {secondaryInitials}
            </div>
            <span className="ml-1 text-[0.6rem] text-[#3d6b5d]">+2 instructors</span>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#1f6e5c] px-4 py-1 text-[0.65rem] font-medium text-white transition-colors group-hover:bg-[#155a4a]">
            <ActionIcon className="h-3 w-3" /> {actionLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

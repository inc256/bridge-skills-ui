import { Link } from "@tanstack/react-router";
import { Award, Clock, Users, Star } from "lucide-react";
import type { Course } from "@/lib/mock-data";
import { CourseThumb } from "./course-thumb";

export function CourseCard({ course, href }: { course: Course; href?: string }) {
  const to = href ?? "/student/course/$slug";
  return (
    <Link
      to={to}
      params={{ slug: course.slug }}
      className="card-surface card-hover group flex flex-col overflow-hidden"
    >
      <CourseThumb variant={course.image} color={course.color} title={course.title} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="rounded-full bg-secondary px-2.5 py-1">{course.category}</span>
          <span className="rounded-full border border-border px-2.5 py-1">{course.level}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-[17px] font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{course.instructor}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
          <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{course.students.toLocaleString()}</span>
          <span className="inline-flex items-center gap-1.5 text-foreground"><Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />{course.rating}</span>
        </div>
        {course.certificate && (
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
            <Award className="h-3.5 w-3.5" /> Certificate on completion
          </div>
        )}
      </div>
    </Link>
  );
}

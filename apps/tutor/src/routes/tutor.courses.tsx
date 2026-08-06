import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, MoreHorizontal, Users, Star, Clock } from "lucide-react";
import { courses } from "@/lib/mock-data";
import { CourseThumb } from "@/components/course-thumb";

export const Route = createFileRoute("/tutor/courses")({
  component: TutorCourses,
});

const statusMap = ["Published", "Published", "Draft", "Published", "In review", "Published"];

function TutorCourses() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight">Your courses</h2>
          <p className="mt-1 text-sm text-muted-foreground">Create, edit, and monitor performance of every course you teach.</p>
        </div>
        <Link to="/tutor/builder" className="inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" />New course</Link>
      </div>

      <div className="card-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="py-3 pl-6">Course</th>
              <th className="py-3">Status</th>
              <th className="py-3">Students</th>
              <th className="py-3">Rating</th>
              <th className="py-3">Duration</th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr key={c.id} className="border-b border-border/60 last:border-0 text-sm hover:bg-secondary/30">
                <td className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg"><CourseThumb variant={c.image} color={c.color} /></div>
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.category} · {c.level}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    statusMap[i] === "Published" ? "bg-success/10 text-success" :
                    statusMap[i] === "Draft" ? "bg-secondary text-foreground/70" :
                    "bg-warning/10 text-warning"
                  }`}>{statusMap[i]}</span>
                </td>
                <td className="py-4 text-muted-foreground"><span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{c.students.toLocaleString()}</span></td>
                <td className="py-4 text-muted-foreground"><span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />{c.rating}</span></td>
                <td className="py-4 text-muted-foreground"><span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{c.duration}</span></td>
                <td className="py-4 pr-6 text-right"><button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

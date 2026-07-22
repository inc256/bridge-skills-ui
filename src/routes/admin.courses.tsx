import { createFileRoute } from "@tanstack/react-router";
import { Check, Archive, Star, MoreHorizontal } from "lucide-react";
import { courses } from "@/lib/mock-data";
import { CourseThumb } from "@/components/course-thumb";

export const Route = createFileRoute("/admin/courses")({
  component: () => (
    <div className="space-y-6">
      <div><h2 className="text-[28px] font-semibold tracking-tight">Course management</h2><p className="mt-1 text-sm text-muted-foreground">Approve, feature and archive courses across the catalog.</p></div>
      <div className="flex flex-wrap gap-2">
        {["All", "Pending review", "Published", "Featured", "Archived"].map((f, i) => (
          <button key={f} className={`rounded-full px-4 py-1.5 text-xs font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card"}`}>{f}</button>
        ))}
      </div>
      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="py-3 pl-6">Course</th><th className="py-3">Instructor</th><th className="py-3">Enrolled</th><th className="py-3">Status</th><th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr key={c.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/30">
                <td className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg"><CourseThumb variant={c.image} color={c.color} /></div>
                    <div className="min-w-0"><div className="truncate font-semibold">{c.title}</div><div className="text-xs text-muted-foreground">{c.category}</div></div>
                  </div>
                </td>
                <td className="py-4 text-muted-foreground">{c.instructor}</td>
                <td className="py-4 text-muted-foreground">{c.students.toLocaleString()}</td>
                <td className="py-4">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${i === 4 ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
                    {i === 4 ? "In review" : "Published"}
                  </span>
                </td>
                <td className="py-4 pr-6">
                  <div className="flex items-center justify-end gap-1">
                    <button title="Feature" className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><Star className="h-4 w-4" /></button>
                    <button title="Approve" className="grid h-8 w-8 place-items-center rounded-lg text-success hover:bg-secondary"><Check className="h-4 w-4" /></button>
                    <button title="Archive" className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><Archive className="h-4 w-4" /></button>
                    <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
});

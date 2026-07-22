import { createFileRoute } from "@tanstack/react-router";
import { Search, MessageSquare, MoreHorizontal } from "lucide-react";
import { students } from "@/lib/mock-data";

export const Route = createFileRoute("/tutor/students")({
  component: TutorStudents,
});

function TutorStudents() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight">Students</h2>
        <p className="mt-1 text-sm text-muted-foreground">Track progress, grades, and enrollment across your courses.</p>
      </div>

      <div className="card-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search students by name, email, or course…" className="w-full rounded-[14px] border border-border bg-background py-2.5 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" />
          </div>
          <select className="rounded-[14px] border border-border bg-background px-3 py-2.5 text-sm">
            <option>All courses</option>
          </select>
          <select className="rounded-[14px] border border-border bg-background px-3 py-2.5 text-sm">
            <option>All progress</option>
          </select>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="py-3 pl-6">Student</th>
              <th className="py-3">Course</th>
              <th className="py-3">Progress</th>
              <th className="py-3">Grade</th>
              <th className="py-3">Enrolled</th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-border/60 last:border-0 text-sm hover:bg-secondary/30">
                <td className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {s.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-muted-foreground">{s.course}</td>
                <td className="py-4">
                  <div className="flex w-32 items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium">{s.progress}%</span>
                  </div>
                </td>
                <td className="py-4"><span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">{s.grade}</span></td>
                <td className="py-4 text-xs text-muted-foreground">{s.enrolled}</td>
                <td className="py-4 pr-6 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button title="Message" className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><MessageSquare className="h-4 w-4" /></button>
                    <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

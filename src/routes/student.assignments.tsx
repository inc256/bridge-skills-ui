import { createFileRoute } from "@tanstack/react-router";
import { Calendar, FileText, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/student/assignments")({
  component: Assignments,
});

const assignments = [
  { id: 1, title: "Design a subnet plan for a small office", course: "Networking Essentials", due: "Fri, Nov 22", status: "In progress", type: "Design" },
  { id: 2, title: "Secure a vulnerable web application", course: "Ethical Hacking", due: "Wed, Nov 27", status: "Not started", type: "Project" },
  { id: 3, title: "Build a REST API with authentication", course: "TypeScript Full-Stack", due: "Nov 15", status: "Submitted", type: "Coding" },
  { id: 4, title: "Train a classifier on the MNIST dataset", course: "Applied ML", due: "Dec 04", status: "Graded · A", type: "Notebook" },
];

const statusStyles: Record<string, string> = {
  "In progress": "bg-warning/10 text-warning",
  "Not started": "bg-secondary text-foreground/70",
  "Submitted": "bg-info/10 text-info",
  "Graded · A": "bg-success/10 text-success",
};

function Assignments() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight">Assignments</h2>
        <p className="mt-1 text-sm text-muted-foreground">Track your projects and submissions across all courses.</p>
      </div>
      <div className="card-surface overflow-hidden">
        <ul className="divide-y divide-border">
          {assignments.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-4 p-5 hover:bg-secondary/40 transition-colors">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{a.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{a.course} · {a.type}</div>
              </div>
              <div className="hidden text-xs text-muted-foreground sm:inline-flex sm:items-center sm:gap-1.5"><Calendar className="h-3.5 w-3.5" /> Due {a.due}</div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[a.status]}`}>{a.status}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

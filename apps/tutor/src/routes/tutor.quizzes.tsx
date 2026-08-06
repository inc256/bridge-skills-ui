import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle, Plus } from "lucide-react";

export const Route = createFileRoute("/tutor/quizzes")({
  component: () => (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight">Quizzes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Author and grade knowledge checks for your courses.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" />New quiz</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { t: "OSI Model fundamentals", c: "Networking Essentials", q: 10, avg: 87 },
          { t: "Web Application Attacks", c: "Ethical Hacking", q: 14, avg: 74 },
          { t: "TypeScript type system", c: "Full-Stack TypeScript", q: 12, avg: 91 },
          { t: "Supervised learning basics", c: "Applied ML", q: 8, avg: 82 },
        ].map((q) => (
          <div key={q.t} className="card-surface p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><HelpCircle className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{q.t}</div>
                <div className="text-xs text-muted-foreground">{q.c}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
              <div><div className="text-muted-foreground">Questions</div><div className="text-sm font-semibold">{q.q}</div></div>
              <div><div className="text-muted-foreground">Avg. score</div><div className="text-sm font-semibold">{q.avg}%</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});

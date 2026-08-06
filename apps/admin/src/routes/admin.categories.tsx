import { createFileRoute } from "@tanstack/react-router";
import { Layers, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/admin/categories")({
  component: () => (
    <div className="space-y-6">
      <h2 className="text-[28px] font-semibold tracking-tight">Categories</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { n: "Networking", c: 42 }, { n: "Cybersecurity", c: 38 }, { n: "Software Engineering", c: 54 },
          { n: "Artificial Intelligence", c: 26 }, { n: "Cloud", c: 31 }, { n: "Design", c: 19 },
        ].map((cat) => (
          <div key={cat.n} className="card-surface p-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Layers className="h-5 w-5" /></div>
            <div className="min-w-0 flex-1"><div className="text-sm font-semibold">{cat.n}</div><div className="text-xs text-muted-foreground">{cat.c} courses</div></div>
            <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, Clock, Star } from "lucide-react";

export const Route = createFileRoute("/tutor/analytics")({
  component: Analytics,
});

function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight">Analytics</h2>
        <p className="mt-1 text-sm text-muted-foreground">Understand engagement, completion, and quiz performance across your catalog.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: Users, l: "Active learners", v: "3,842", d: "+12.4% MoM", c: "text-primary" },
          { i: Clock, l: "Watch time (mo)", v: "18,204h", d: "+8.1%", c: "text-info" },
          { i: TrendingUp, l: "Completion rate", v: "94%", d: "+2.3pt", c: "text-success" },
          { i: Star, l: "Avg. rating", v: "4.9", d: "1,240 reviews", c: "text-[var(--gold)]" },
        ].map((s) => (
          <div key={s.l} className="card-surface p-5">
            <div className={`grid h-10 w-10 place-items-center rounded-xl bg-secondary ${s.c}`}><s.i className="h-5 w-5" /></div>
            <div className="mt-4 text-[28px] font-semibold tracking-tight">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className="mt-1 text-[11px] font-medium text-success">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Completion by course</h3>
          <div className="mt-5 space-y-4">
            {[
              { t: "Full-Stack TypeScript", v: 92 },
              { t: "Networking Essentials", v: 84 },
              { t: "Ethical Hacking", v: 71 },
              { t: "Applied ML", v: 58 },
            ].map((r) => (
              <div key={r.t}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium">{r.t}</span>
                  <span className="text-muted-foreground">{r.v}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${r.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Popular lessons</h3>
          <ol className="mt-5 space-y-3">
            {[
              "Subnetting deep-dive",
              "OSPF in practice",
              "Building REST APIs with Express",
              "Intro to reinforcement learning",
              "Nmap reconnaissance basics",
            ].map((l, i) => (
              <li key={l} className="flex items-center gap-3 border-b border-border pb-3 last:border-0">
                <span className="text-xs font-semibold text-muted-foreground">0{i + 1}</span>
                <span className="flex-1 text-sm">{l}</span>
                <span className="text-xs text-muted-foreground">{(6200 - i * 800).toLocaleString()} views</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

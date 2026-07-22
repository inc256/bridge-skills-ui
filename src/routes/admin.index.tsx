import { createFileRoute } from "@tanstack/react-router";
import { Users, GraduationCap, BookOpen, Award, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Platform overview · Last 30 days</p>
        <h2 className="mt-1 text-[28px] font-semibold tracking-tight">Good afternoon, Elena.</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: GraduationCap, l: "Total learners", v: "248,304", d: "+4.2%", up: true },
          { i: Users, l: "Active tutors", v: "1,240", d: "+18", up: true },
          { i: BookOpen, l: "Published courses", v: "482", d: "+9", up: true },
          { i: Award, l: "Certificates issued", v: "38,204", d: "-1.1%", up: false },
        ].map((s) => (
          <div key={s.l} className="card-surface p-5">
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><s.i className="h-5 w-5" /></div>
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${s.up ? "text-success" : "text-destructive"}`}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{s.d}
              </span>
            </div>
            <div className="mt-4 text-[28px] font-semibold tracking-tight">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-semibold">Platform growth</h3>
              <p className="text-xs text-muted-foreground">New enrollments over time</p>
            </div>
            <div className="flex gap-1 rounded-[10px] border border-border p-1 text-xs">
              {["7d", "30d", "90d", "1y"].map((r, i) => (
                <button key={r} className={`rounded-md px-2.5 py-1 ${i === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{r}</button>
              ))}
            </div>
          </div>
          <AreaChart />
        </div>

        <div className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Top categories</h3>
          <ul className="mt-5 space-y-4">
            {[
              { t: "Networking", v: 32, s: "78,420" },
              { t: "Software Engineering", v: 28, s: "68,140" },
              { t: "Cybersecurity", v: 22, s: "54,802" },
              { t: "Artificial Intelligence", v: 18, s: "46,942" },
            ].map((r) => (
              <li key={r.t}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium">{r.t}</span>
                  <span className="text-muted-foreground">{r.s} learners</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${r.v * 3}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Pending approvals</h3>
          <ul className="mt-4 divide-y divide-border">
            {[
              { t: "Course: Advanced Kubernetes", by: "Sofia Marín", type: "Course" },
              { t: "Tutor application: Dr. Ethan Cole", by: "Applied 2h ago", type: "Tutor" },
              { t: "Course: Bug Bounty Fundamentals", by: "David Mensah", type: "Course" },
              { t: "Category: Data Engineering", by: "Elena Rossi", type: "Category" },
            ].map((p) => (
              <li key={p.t} className="flex items-center justify-between py-3.5">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{p.t}</div>
                  <div className="text-xs text-muted-foreground">{p.by}</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary">Review</button>
                  <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">Approve</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Recent activity</h3>
          <ul className="mt-4 space-y-4">
            {[
              { t: "New course published · Cloud Architect Certification", by: "Sofia Marín · 12m ago" },
              { t: "5,204 lessons watched in the last hour", by: "System · 1h ago" },
              { t: "Tutor verified · Amara Okafor", by: "Elena Rossi · 2h ago" },
              { t: "Homepage banner updated", by: "CMS · Yesterday" },
              { t: "482 certificates issued today", by: "System · Today" },
            ].map((a) => (
              <li key={a.t} className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <div className="text-sm">{a.t}</div>
                  <div className="text-xs text-muted-foreground">{a.by}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function AreaChart() {
  const data = [120, 180, 150, 220, 280, 260, 340, 380, 360, 420, 480, 460, 540, 620, 580, 700, 760, 820];
  const max = Math.max(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`).join(" ");
  const area = `0,100 ${points} 100,100`;
  return (
    <div className="mt-6">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-64 w-full">
        <defs>
          <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1F6E5C" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#1F6E5C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon fill="url(#g2)" points={area} />
        <polyline fill="none" stroke="#1F6E5C" strokeWidth="0.6" points={points} vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

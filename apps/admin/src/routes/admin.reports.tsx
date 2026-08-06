import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/reports")({
  component: Reports,
});

function Reports() {
  return (
    <div className="space-y-8">
      <div><h2 className="text-[28px] font-semibold tracking-tight">Reports</h2><p className="mt-1 text-sm text-muted-foreground">Comprehensive analytics across the platform.</p></div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Enrollments by month</h3>
          <BarChart />
        </div>
        <div className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Completion rate</h3>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Donut pct={78} label="Learners completing" />
            <div className="space-y-3 self-center text-sm">
              {[
                { l: "Completed", v: "78%", c: "bg-primary" },
                { l: "In progress", v: "16%", c: "bg-[var(--gold)]" },
                { l: "Dropped", v: "6%", c: "bg-secondary" },
              ].map((r) => (
                <div key={r.l} className="flex items-center gap-2 text-xs">
                  <span className={`h-2.5 w-2.5 rounded-full ${r.c}`} /><span>{r.l}</span><span className="ml-auto font-semibold">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="border-b border-border p-5">
          <h3 className="text-[16px] font-semibold">Top-performing courses</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="py-3 pl-6">Course</th><th className="py-3">Enrolled</th><th className="py-3">Completion</th><th className="py-3">Rating</th><th className="py-3 pr-6">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {[
              { t: "Full-Stack TypeScript", e: 15302, c: 92, r: 4.9, rev: "$48,204" },
              { t: "Networking Essentials", e: 12480, c: 84, r: 4.8, rev: "$38,410" },
              { t: "Cloud Architect Cert.", e: 9840, c: 79, r: 4.8, rev: "$31,204" },
              { t: "Ethical Hacking", e: 8920, c: 71, r: 4.9, rev: "$28,410" },
              { t: "Applied ML", e: 6740, c: 58, r: 4.7, rev: "$22,104" },
            ].map((r) => (
              <tr key={r.t} className="border-b border-border/60 last:border-0 hover:bg-secondary/30">
                <td className="py-4 pl-6 font-medium">{r.t}</td>
                <td className="py-4 text-muted-foreground">{r.e.toLocaleString()}</td>
                <td className="py-4">
                  <div className="flex w-28 items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${r.c}%` }} /></div>
                    <span className="text-xs">{r.c}%</span>
                  </div>
                </td>
                <td className="py-4 text-muted-foreground">{r.r}★</td>
                <td className="py-4 pr-6 font-semibold">{r.rev}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BarChart() {
  const data = [40, 55, 48, 62, 70, 82, 78, 95, 88, 102, 118, 124];
  const max = Math.max(...data);
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (
    <div className="mt-6">
      <div className="flex h-56 items-end gap-2">
        {data.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary" style={{ height: `${(v / max) * 100}%` }} />
            <span className="text-[10px] text-muted-foreground">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Donut({ pct, label }: { pct: number; label: string }) {
  const c = 2 * Math.PI * 40;
  return (
    <div className="relative mx-auto grid aspect-square place-items-center">
      <svg viewBox="0 0 100 100" className="h-40 w-40 -rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--secondary)" strokeWidth="10" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-primary)" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} />
      </svg>
      <div className="absolute text-center">
        <div className="text-[24px] font-semibold">{pct}%</div>
        <div className="text-[10px] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tutor/assignments")({
  component: () => (
    <div className="space-y-6">
      <h2 className="text-[28px] font-semibold tracking-tight">Assignments</h2>
      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="py-3 pl-6">Submission</th><th className="py-3">Student</th><th className="py-3">Course</th><th className="py-3">Submitted</th><th className="py-3 pr-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { t: "Final project · REST API", s: "Yuki Tanaka", c: "Full-Stack TS", d: "2h ago", st: "Needs review" },
              { t: "Lab: /24 network", s: "Chen Wei", c: "Networking", d: "5h ago", st: "Needs review" },
              { t: "Nmap recon report", s: "Marcus Reid", c: "Ethical Hacking", d: "Yesterday", st: "Graded · A-" },
              { t: "Classifier notebook", s: "Isabelle Laurent", c: "Applied ML", d: "3 days ago", st: "Graded · B+" },
            ].map((a) => (
              <tr key={a.t} className="border-b border-border/60 last:border-0 hover:bg-secondary/30">
                <td className="py-4 pl-6 font-medium">{a.t}</td>
                <td className="py-4 text-muted-foreground">{a.s}</td>
                <td className="py-4 text-muted-foreground">{a.c}</td>
                <td className="py-4 text-muted-foreground">{a.d}</td>
                <td className="py-4 pr-6"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${a.st.startsWith("Graded") ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{a.st}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
});

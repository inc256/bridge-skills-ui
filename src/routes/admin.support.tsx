import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/support")({
  component: () => (
    <div className="space-y-6">
      <h2 className="text-[28px] font-semibold tracking-tight">Support tickets</h2>
      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="py-3 pl-6">Ticket</th><th className="py-3">Requester</th><th className="py-3">Priority</th><th className="py-3">Status</th><th className="py-3 pr-6">Updated</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "#4820", t: "Cannot access course video", r: "Kwame Anane", p: "High", s: "Open", u: "2m ago" },
              { id: "#4819", t: "Certificate download not working", r: "Elena Rossi", p: "Medium", s: "Open", u: "1h ago" },
              { id: "#4818", t: "Payment refund request", r: "Yuki Tanaka", p: "Medium", s: "Pending", u: "3h ago" },
              { id: "#4817", t: "Instructor content copyright", r: "Legal team", p: "High", s: "Escalated", u: "Yesterday" },
              { id: "#4816", t: "Change registered email", r: "Marcus Reid", p: "Low", s: "Resolved", u: "2 days ago" },
            ].map((t) => (
              <tr key={t.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/30">
                <td className="py-4 pl-6"><div className="text-xs text-muted-foreground">{t.id}</div><div className="font-medium">{t.t}</div></td>
                <td className="py-4 text-muted-foreground">{t.r}</td>
                <td className="py-4"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${t.p === "High" ? "bg-destructive/10 text-destructive" : t.p === "Medium" ? "bg-warning/10 text-warning" : "bg-secondary text-foreground/70"}`}>{t.p}</span></td>
                <td className="py-4"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${t.s === "Resolved" ? "bg-success/10 text-success" : t.s === "Escalated" ? "bg-destructive/10 text-destructive" : "bg-secondary"}`}>{t.s}</span></td>
                <td className="py-4 pr-6 text-xs text-muted-foreground">{t.u}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
});

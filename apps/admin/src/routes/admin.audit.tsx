import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/audit")({
  component: () => (
    <div className="space-y-6">
      <h2 className="text-[28px] font-semibold tracking-tight">Audit log</h2>
      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="py-3 pl-6">Timestamp</th><th className="py-3">Actor</th><th className="py-3">Action</th><th className="py-3 pr-6">Target</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2026-07-22 14:20:41", "Elena Rossi", "APPROVED", "Course: Cloud Architect Certification"],
              ["2026-07-22 13:58:03", "System", "ISSUED_CERTIFICATE", "TBS-2026-PY-04812"],
              ["2026-07-22 13:12:11", "Amara Okafor", "PUBLISHED_COURSE", "Networking Essentials v2"],
              ["2026-07-22 11:44:00", "Elena Rossi", "VERIFIED_TUTOR", "Dr. Ethan Cole"],
              ["2026-07-22 09:03:22", "System", "USER_LOGIN", "ama.boateng@techbridge.io"],
            ].map(([ts, actor, action, target]) => (
              <tr key={ts} className="border-b border-border/60 last:border-0 hover:bg-secondary/30 font-mono text-xs">
                <td className="py-3 pl-6 text-muted-foreground">{ts}</td>
                <td className="py-3">{actor}</td>
                <td className="py-3"><span className="rounded-md bg-secondary px-2 py-0.5 font-semibold">{action}</span></td>
                <td className="py-3 pr-6 text-muted-foreground">{target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
});

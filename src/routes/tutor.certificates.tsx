import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tutor/certificates")({
  component: () => (
    <div className="space-y-6">
      <h2 className="text-[28px] font-semibold tracking-tight">Certificate templates</h2>
      <p className="text-sm text-muted-foreground">Manage the certificate templates issued when students complete your courses.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {["Networking Essentials", "Ethical Hacking", "Full-Stack TypeScript"].map((t) => (
          <div key={t} className="card-surface p-5">
            <div className="aspect-[4/3] rounded-2xl border border-border bg-[radial-gradient(circle_at_top_right,rgba(212,162,78,0.15),transparent),radial-gradient(circle_at_bottom_left,rgba(31,110,92,0.12),transparent)] p-4 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Certificate</div>
              <div className="mt-6 text-[15px] font-semibold text-primary">{t}</div>
            </div>
            <div className="mt-4 text-sm font-medium">{t}</div>
            <div className="text-xs text-muted-foreground">Active · 342 issued</div>
          </div>
        ))}
      </div>
    </div>
  ),
});

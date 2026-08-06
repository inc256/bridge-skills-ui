import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";

export const Route = createFileRoute("/admin/certificates")({
  component: () => (
    <div className="space-y-6">
      <div><h2 className="text-[28px] font-semibold tracking-tight">Certificates</h2><p className="mt-1 text-sm text-muted-foreground">Manage certificate templates and verification.</p></div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { l: "Certificates issued", v: "38,204" },
          { l: "Verified this month", v: "4,120" },
          { l: "Active templates", v: "42" },
        ].map((s) => (
          <div key={s.l} className="card-surface p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--gold)]/15 text-[var(--gold)]"><Award className="h-5 w-5" /></div>
            <div className="mt-3 text-[26px] font-semibold">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  ),
});

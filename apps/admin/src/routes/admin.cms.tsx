import { createFileRoute } from "@tanstack/react-router";
import { FileEdit, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/admin/cms")({
  component: () => (
    <div className="space-y-6">
      <div><h2 className="text-[28px] font-semibold tracking-tight">Content management</h2><p className="mt-1 text-sm text-muted-foreground">Manage the public marketing surface of TechBridge.</p></div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { t: "Homepage", d: "Hero, learning paths, featured courses, testimonials.", n: "5 sections" },
          { t: "Testimonials", d: "Curate learner stories shown on the marketing site.", n: "12 published" },
          { t: "Partners", d: "Manage the trusted-by logos.", n: "6 partners" },
          { t: "FAQs", d: "Support and product FAQs.", n: "34 entries" },
          { t: "Announcements", d: "Platform-wide banners and system notices.", n: "1 active" },
          { t: "Learning paths", d: "Configure track structure and metadata.", n: "4 paths" },
        ].map((s) => (
          <button key={s.t} className="card-surface card-hover flex items-center gap-4 p-5 text-left">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><FileEdit className="h-5 w-5" /></div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold">{s.t}</div>
              <div className="text-xs text-muted-foreground">{s.d}</div>
              <div className="mt-1 text-[11px] font-medium text-primary">{s.n}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  ),
});

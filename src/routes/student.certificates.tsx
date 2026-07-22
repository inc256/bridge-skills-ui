import { createFileRoute } from "@tanstack/react-router";
import { Award, Download, Share2, ExternalLink, Check } from "lucide-react";
import { certificates } from "@/lib/mock-data";

export const Route = createFileRoute("/student/certificates")({
  component: Certificates,
});

function Certificates() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight">Certificates</h2>
        <p className="mt-1 text-sm text-muted-foreground">Verifiable credentials from courses you've completed.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {certificates.map((c) => (
          <div key={c.id} className="card-surface overflow-hidden">
            <div className="relative border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(212,162,78,0.15),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(31,110,92,0.12),transparent_50%)] p-8">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Certificate of Completion</div>
                  <Award className="h-6 w-6 text-[var(--gold)]" />
                </div>
                <div className="mt-6 text-xs text-muted-foreground">This certifies that</div>
                <div className="mt-1 text-[22px] font-semibold tracking-tight">Ama Boateng</div>
                <div className="mt-4 text-xs text-muted-foreground">has successfully completed</div>
                <div className="mt-1 text-[18px] font-semibold text-primary">{c.title}</div>
                <div className="mt-6 flex items-end justify-between border-t border-border pt-4 text-[11px] text-muted-foreground">
                  <div>
                    <div>Issued {c.issued}</div>
                    <div>ID {c.credentialId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-foreground font-medium">{c.instructor}</div>
                    <div>Instructor · TechBridge</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div className="inline-flex items-center gap-2 text-xs text-success"><Check className="h-4 w-4" /> Verified credential</div>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-[14px] border border-border px-3 py-2 text-xs font-medium hover:bg-secondary"><Download className="h-3.5 w-3.5" /> Download</button>
                <button className="inline-flex items-center gap-1.5 rounded-[14px] border border-border px-3 py-2 text-xs font-medium hover:bg-secondary"><Share2 className="h-3.5 w-3.5" /> Share</button>
                <button className="inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"><ExternalLink className="h-3.5 w-3.5" /> Verify</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

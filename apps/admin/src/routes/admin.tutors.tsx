import { createFileRoute } from "@tanstack/react-router";
import { Check, X, Eye } from "lucide-react";
import { tutors } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/tutors")({
  component: () => (
    <div className="space-y-6">
      <div><h2 className="text-[28px] font-semibold tracking-tight">Tutors</h2><p className="mt-1 text-sm text-muted-foreground">Verify and manage instructors on the platform.</p></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((t) => (
          <div key={t.id} className="card-surface p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-semibold">
                {t.name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="truncate font-semibold">{t.name}</div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.status === "Verified" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{t.status}</span>
                </div>
                <div className="text-xs text-muted-foreground">{t.specialty}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
              <div><div className="text-sm font-semibold">{t.courses}</div><div className="text-[10px] text-muted-foreground">Courses</div></div>
              <div><div className="text-sm font-semibold">{t.students.toLocaleString()}</div><div className="text-[10px] text-muted-foreground">Students</div></div>
              <div><div className="text-sm font-semibold">{t.rating}</div><div className="text-[10px] text-muted-foreground">Rating</div></div>
            </div>
            {t.status === "Pending" ? (
              <div className="mt-4 flex gap-2">
                <button className="flex-1 inline-flex items-center justify-center gap-1 rounded-[14px] border border-border py-2 text-xs font-medium hover:bg-secondary"><X className="h-3.5 w-3.5" />Reject</button>
                <button className="flex-1 inline-flex items-center justify-center gap-1 rounded-[14px] bg-primary py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"><Check className="h-3.5 w-3.5" />Approve</button>
              </div>
            ) : (
              <button className="mt-4 w-full inline-flex items-center justify-center gap-1 rounded-[14px] border border-border py-2 text-xs font-medium hover:bg-secondary"><Eye className="h-3.5 w-3.5" />View profile</button>
            )}
          </div>
        ))}
      </div>
    </div>
  ),
});

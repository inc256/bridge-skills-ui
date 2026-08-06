import { createFileRoute } from "@tanstack/react-router";
import { Shield, Check } from "lucide-react";

export const Route = createFileRoute("/admin/roles")({
  component: () => (
    <div className="space-y-6">
      <div><h2 className="text-[28px] font-semibold tracking-tight">Roles & permissions</h2><p className="mt-1 text-sm text-muted-foreground">Define what each role can do on the platform.</p></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { r: "Super Admin", u: 4, perms: ["Full access", "Billing", "Roles"] },
          { r: "Content Manager", u: 12, perms: ["CMS", "Categories", "Announcements"] },
          { r: "Course Reviewer", u: 8, perms: ["Approve courses", "Verify tutors"] },
          { r: "Support Agent", u: 24, perms: ["Tickets", "Refunds"] },
        ].map((r) => (
          <div key={r.r} className="card-surface p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Shield className="h-5 w-5" /></div>
            <div className="mt-3 font-semibold">{r.r}</div>
            <div className="text-xs text-muted-foreground">{r.u} members</div>
            <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
              {r.perms.map((p) => <li key={p} className="flex items-center gap-1.5 text-xs"><Check className="h-3 w-3 text-success" />{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  ),
});

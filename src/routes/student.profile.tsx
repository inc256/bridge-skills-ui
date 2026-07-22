import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Award, Clock, Flame, Trophy, Globe } from "lucide-react";

export const Route = createFileRoute("/student/profile")({
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-8">
      <div className="card-surface overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-[var(--primary-dark)]" />
        <div className="-mt-12 flex flex-wrap items-end gap-5 px-6 pb-6">
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl border-4 border-card bg-primary text-primary-foreground text-2xl font-semibold shadow-soft">AB</div>
          <div className="min-w-0 flex-1 pt-2">
            <h1 className="text-[24px] font-semibold tracking-tight">Ama Boateng</h1>
            <p className="text-sm text-muted-foreground">Aspiring Cloud Engineer · Accra, Ghana</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> ama.boateng@techbridge.io</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Accra, GH</span>
              <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> amaboateng.dev</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-[14px] border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">Edit profile</button>
            <button className="rounded-[14px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Share profile</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <div className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Learning statistics</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { icon: Flame, l: "Streak", v: "12d", c: "text-[var(--gold)]" },
              { icon: Clock, l: "Learned", v: "148h", c: "text-primary" },
              { icon: Award, l: "Certificates", v: "5", c: "text-success" },
              { icon: Trophy, l: "Rank", v: "Top 3%", c: "text-info" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border p-4">
                <s.icon className={`h-4 w-4 ${s.c}`} />
                <div className="mt-2 text-[22px] font-semibold">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Achievements</h3>
          <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-6">
            {["First lesson", "7-day streak", "First certificate", "5 courses", "Perfect quiz", "Contributor"].map((a, i) => (
              <div key={a} className="text-center">
                <div className={`mx-auto grid aspect-square place-items-center rounded-2xl ${i < 4 ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="mt-2 text-[11px] leading-tight">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-surface p-6">
        <h3 className="text-[16px] font-semibold">Personal information</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            { l: "Full name", v: "Ama Boateng" },
            { l: "Email", v: "ama.boateng@techbridge.io" },
            { l: "Country", v: "Ghana" },
            { l: "Time zone", v: "GMT+0 · Accra" },
            { l: "Learning goal", v: "Cloud Architect Certification" },
            { l: "Member since", v: "March 2025" },
          ].map((r) => (
            <div key={r.l}>
              <label className="text-xs font-medium text-muted-foreground">{r.l}</label>
              <input defaultValue={r.v} className="mt-1 w-full rounded-[14px] border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

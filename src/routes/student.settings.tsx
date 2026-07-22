import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/student/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account, notifications, and preferences.</p>
      </div>

      {[
        {
          title: "Account", fields: [
            { l: "Email address", v: "ama.boateng@techbridge.io", t: "email" },
            { l: "Password", v: "••••••••", t: "password" },
            { l: "Two-factor auth", v: "Enabled", t: "text" },
          ]
        },
        {
          title: "Notifications", toggles: [
            { l: "Course updates from your tutors", d: true },
            { l: "New comments on your discussions", d: true },
            { l: "Weekly progress digest", d: false },
            { l: "Marketing emails", d: false },
          ]
        },
        {
          title: "Preferences", fields: [
            { l: "Language", v: "English (US)", t: "text" },
            { l: "Playback quality", v: "Auto (recommended)", t: "text" },
            { l: "Captions", v: "On", t: "text" },
            { l: "Theme", v: "Light", t: "text" },
          ]
        },
      ].map((s) => (
        <section key={s.title} className="card-surface p-6">
          <h3 className="text-[17px] font-semibold">{s.title}</h3>
          <div className="mt-5 space-y-4">
            {s.fields?.map((f) => (
              <div key={f.l} className="grid gap-3 sm:grid-cols-[220px_1fr] sm:items-center">
                <label className="text-sm text-muted-foreground">{f.l}</label>
                <input type={f.t} defaultValue={f.v} className="rounded-[14px] border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" />
              </div>
            ))}
            {s.toggles?.map((t) => (
              <div key={t.l} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                <span className="text-sm">{t.l}</span>
                <button className={`relative h-6 w-11 rounded-full transition-colors ${t.d ? "bg-primary" : "bg-secondary"}`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${t.d ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

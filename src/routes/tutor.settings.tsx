import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tutor/settings")({
  component: () => (
    <div className="space-y-6">
      <h2 className="text-[28px] font-semibold tracking-tight">Tutor settings</h2>
      <div className="card-surface p-6 space-y-4">
        {["Display name", "Public bio", "Payout details", "Notification preferences"].map((f) => (
          <div key={f} className="grid gap-3 sm:grid-cols-[200px_1fr] sm:items-center">
            <label className="text-sm text-muted-foreground">{f}</label>
            <input className="rounded-[14px] border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" placeholder={`Enter ${f.toLowerCase()}`} />
          </div>
        ))}
      </div>
    </div>
  ),
});

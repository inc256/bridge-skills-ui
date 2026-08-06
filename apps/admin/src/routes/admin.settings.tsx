import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({
  component: () => (
    <div className="space-y-6">
      <h2 className="text-[28px] font-semibold tracking-tight">Platform settings</h2>
      <div className="card-surface p-6 space-y-4">
        {["Platform name", "Support email", "Default currency", "Certificate signer"].map((f) => (
          <div key={f} className="grid gap-3 sm:grid-cols-[220px_1fr] sm:items-center">
            <label className="text-sm text-muted-foreground">{f}</label>
            <input defaultValue={f === "Platform name" ? "TechBridge Skills Hub" : ""} placeholder={`Enter ${f.toLowerCase()}`} className="rounded-[14px] border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" />
          </div>
        ))}
      </div>
    </div>
  ),
});

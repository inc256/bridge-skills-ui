import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, GripVertical, Plus, Video, FileText, Code, HelpCircle, Upload, Eye } from "lucide-react";

export const Route = createFileRoute("/tutor/builder")({
  component: Builder,
});

const steps = ["Course details", "Modules", "Lessons", "Quizzes", "Assignments", "Resources", "Preview", "Publish"];

function Builder() {
  const [step, setStep] = useState(2);
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight">Course builder</h2>
        <p className="mt-1 text-sm text-muted-foreground">Design your curriculum step by step. Autosaves as you go.</p>
      </div>

      {/* Stepper */}
      <div className="card-surface p-3">
        <ol className="flex flex-wrap gap-1">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={s} className="flex-1 min-w-[120px]">
                <button onClick={() => setStep(i)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                  active ? "bg-primary text-primary-foreground" : done ? "text-foreground hover:bg-secondary" : "text-muted-foreground hover:bg-secondary"
                }`}>
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                    active ? "bg-white/20" : done ? "bg-primary text-primary-foreground" : "border border-border"
                  }`}>{done ? <Check className="h-3 w-3" /> : i + 1}</span>
                  <span className="truncate">{s}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Modules & lessons */}
        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[17px] font-semibold">Curriculum structure</h3>
              <p className="text-xs text-muted-foreground">Drag to reorder modules and lessons.</p>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-[14px] border border-border px-3 py-2 text-xs font-medium hover:bg-secondary"><Plus className="h-3.5 w-3.5" />Add module</button>
          </div>

          <div className="mt-5 space-y-3">
            {[
              { t: "Foundations of Networking", n: 4, done: true },
              { t: "IP Addressing & Subnetting", n: 5, done: false, expanded: true },
              { t: "Routing & Switching", n: 3, done: false },
              { t: "Network Security Basics", n: 2, done: false },
            ].map((m, i) => (
              <div key={m.t} className={`rounded-2xl border p-4 ${m.expanded ? "border-primary/40 bg-primary/[0.03]" : "border-border"}`}>
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Module {i + 1}</div>
                    <div className="text-sm font-semibold">{m.t}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{m.n} lessons</span>
                </div>
                {m.expanded && (
                  <ul className="mt-4 space-y-2 border-t border-border pt-3">
                    {[
                      { i: Video, t: "IPv4 addressing fundamentals", d: "22:10" },
                      { i: Video, t: "Subnetting deep-dive", d: "34:05" },
                      { i: Code, t: "Hands-on: build a /24 network", d: "45 min" },
                      { i: FileText, t: "IPv6 essentials", d: "26:44" },
                      { i: HelpCircle, t: "Assignment: Design a subnet plan", d: "1h" },
                    ].map((l) => (
                      <li key={l.t} className="flex items-center gap-3 rounded-xl bg-background p-3 border border-border">
                        <GripVertical className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><l.i className="h-4 w-4" /></div>
                        <div className="min-w-0 flex-1 truncate text-sm">{l.t}</div>
                        <span className="text-xs text-muted-foreground">{l.d}</span>
                      </li>
                    ))}
                    <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"><Plus className="h-3.5 w-3.5" />Add lesson</button>
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lesson editor */}
        <div className="card-surface p-6">
          <h3 className="text-[17px] font-semibold">Lesson editor</h3>
          <div className="mt-5 space-y-4">
            <Field label="Lesson title" defaultValue="Subnetting deep-dive" />
            <Field label="Estimated duration" defaultValue="34 minutes" />

            <div>
              <label className="text-xs font-medium text-muted-foreground">Content type</label>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {[{ i: Video, l: "Video" }, { i: FileText, l: "Slides" }, { i: Code, l: "Code" }, { i: HelpCircle, l: "Quiz" }].map((t, i) => (
                  <button key={t.l} className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-xs font-medium transition-colors ${i === 0 ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-secondary"}`}>
                    <t.i className="h-4 w-4" /> {t.l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Video upload</label>
              <div className="mt-2 grid place-items-center rounded-2xl border-2 border-dashed border-border bg-secondary/30 p-8 text-center">
                <Upload className="h-6 w-6 text-muted-foreground" />
                <div className="mt-2 text-sm font-medium">Drop your video here</div>
                <div className="mt-0.5 text-xs text-muted-foreground">MP4 or MOV up to 2GB</div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <textarea rows={3} defaultValue="Learn how to divide networks into subnets efficiently using VLSM and CIDR." className="mt-1 w-full rounded-[14px] border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" />
            </div>

            <div className="flex items-center gap-2 border-t border-border pt-4">
              <button className="rounded-[14px] border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"><Eye className="mr-1.5 inline h-3.5 w-3.5" />Preview</button>
              <button className="ml-auto rounded-[14px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save lesson</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input defaultValue={defaultValue} className="mt-1 w-full rounded-[14px] border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" />
    </div>
  );
}

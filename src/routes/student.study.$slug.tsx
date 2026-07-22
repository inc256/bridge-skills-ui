import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Check, ChevronLeft, ChevronRight, Play, Pause, Volume2, Maximize, Settings, MessageSquare,
  FileText, Download, Bookmark, PenSquare, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { courses, modules } from "@/lib/mock-data";

export const Route = createFileRoute("/student/study/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug) ?? courses[0];
    if (!course) throw notFound();
    return { course };
  },
  component: StudyInterface,
});

function StudyInterface() {
  const { course } = Route.useLoaderData();
  const [tab, setTab] = useState<"notes" | "resources" | "discussion" | "quiz">("notes");

  const currentLesson = modules[1].lessons[1];
  const completed = modules.flatMap((m) => m.lessons).filter((l) => l.completed).length;
  const total = modules.flatMap((m) => m.lessons).length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="-mx-4 -my-6 sm:-mx-6 lg:-mx-8 lg:-my-8">
      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[340px_1fr]">
        <aside className="border-r border-border bg-card">
          <div className="border-b border-border p-5">
            <Link to="/student/course/$slug" params={{ slug: course.slug }} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-3.5 w-3.5" /> Course overview
            </Link>
            <h2 className="mt-3 text-[15px] font-semibold leading-snug">{course.title}</h2>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <span className="font-semibold text-foreground">{pct}%</span>
            </div>
          </div>
          <div className="max-h-[calc(100vh-14rem)] overflow-y-auto p-3">
            {modules.map((m, mi) => (
              <details key={m.id} open={mi === 1} className="group mb-1 rounded-xl">
                <summary className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5 hover:bg-secondary">
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Module {mi + 1}</div>
                    <div className="mt-0.5 truncate text-sm font-semibold">{m.title}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-1 space-y-0.5 pb-2">
                  {m.lessons.map((l) => {
                    const current = mi === 1 && l.id === "l6";
                    return (
                      <li key={l.id}>
                        <button className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          current ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                        }`}>
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            l.completed ? "bg-primary text-primary-foreground" : current ? "bg-primary/20 text-primary" : "border border-border text-muted-foreground"
                          }`}>
                            {l.completed ? <Check className="h-3 w-3" /> : <Play className="h-2.5 w-2.5 fill-current" />}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{l.title}</span>
                          <span className="text-[11px] text-muted-foreground">{l.duration}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </details>
            ))}
          </div>
        </aside>

        <div className="flex flex-col">
          <div className="bg-[var(--primary-dark)] px-6 pt-6">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#1F6E5C] to-[#0D2922]">
                <div className="text-center text-white">
                  <button className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-transform hover:scale-105">
                    <Play className="h-8 w-8 fill-white text-white" />
                  </button>
                  <div className="mt-4 text-sm text-white/80">Lesson 6 · Subnetting deep-dive</div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white" style={{ width: "34%" }} />
                </div>
                <div className="mt-3 flex items-center justify-between text-white/90 text-xs">
                  <div className="flex items-center gap-4">
                    <Pause className="h-4 w-4" />
                    <Volume2 className="h-4 w-4" />
                    <span>11:34 / 34:05</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Settings className="h-4 w-4" />
                    <Maximize className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-border bg-card px-6 py-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-medium text-muted-foreground">Module 2 · IP Addressing & Subnetting</div>
                <h1 className="mt-1 text-[22px] font-semibold leading-snug">{currentLesson.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <button title="Bookmark" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition-colors"><Bookmark className="h-4 w-4" /></button>
                <button title="Notes" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition-colors"><PenSquare className="h-4 w-4" /></button>
                <button className="inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  <Check className="h-4 w-4" /> Mark as complete
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-background px-6 py-6">
            <div className="flex flex-wrap gap-1 rounded-[14px] border border-border bg-card p-1">
              {[
                { k: "notes", l: "Notes", i: PenSquare },
                { k: "resources", l: "Resources", i: FileText },
                { k: "discussion", l: "Discussion", i: MessageSquare },
                { k: "quiz", l: "Quiz", i: Check },
              ].map(({ k, l, i: Icon }) => (
                <button
                  key={k}
                  onClick={() => setTab(k as typeof tab)}
                  className={`inline-flex items-center gap-2 rounded-[10px] px-4 py-2 text-sm font-medium transition-colors ${
                    tab === k ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {l}
                </button>
              ))}
            </div>

            <div className="mt-5">
              {tab === "notes" && (
                <div className="card-surface p-6">
                  <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Your notes</div>
                  <textarea
                    className="mt-3 min-h-[220px] w-full resize-y rounded-2xl border border-border bg-background p-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
                    placeholder="Write notes for this lesson… (auto-saved)"
                    defaultValue={"Key formula:\n  hosts = 2^(32 - prefix) - 2\n\nCIDR summarization is critical to reduce routing table size."}
                  />
                </div>
              )}
              {tab === "resources" && (
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "Subnetting cheat sheet (PDF)",
                    "IPv4 practice worksheet",
                    "Lab: build a /24 network",
                    "Reading: RFC 4632 (CIDR)",
                  ].map((r) => (
                    <div key={r} className="card-surface flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><FileText className="h-4 w-4" /></div>
                        <div className="text-sm font-medium">{r}</div>
                      </div>
                      <button className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary"><Download className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              )}
              {tab === "discussion" && (
                <div className="card-surface p-6">
                  <div className="space-y-5">
                    {[
                      { n: "Marcus Reid", t: "9h ago", m: "Great walkthrough of VLSM. The /27 example finally clicked for me." },
                      { n: "Yuki Tanaka", t: "1d ago", m: "Anyone got a good practice tool for subnetting drills? Something timed." },
                    ].map((c) => (
                      <div key={c.n} className="flex gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {c.n.split(" ").map((n: string) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="text-sm"><span className="font-semibold">{c.n}</span><span className="ml-2 text-xs text-muted-foreground">{c.t}</span></div>
                          <p className="mt-1 text-sm text-muted-foreground">{c.m}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-2 border-t border-border pt-5">
                    <input placeholder="Add to the discussion…" className="flex-1 rounded-[14px] border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" />
                    <button className="rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Post</button>
                  </div>
                </div>
              )}
              {tab === "quiz" && (
                <div className="card-surface p-6">
                  <div className="text-xs font-medium uppercase tracking-widest text-primary">Quick check</div>
                  <h4 className="mt-2 text-[17px] font-semibold">How many usable hosts are in a /27 subnet?</h4>
                  <div className="mt-5 space-y-2">
                    {["30", "32", "62", "254"].map((o) => (
                      <label key={o} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-3.5 hover:border-primary/40 hover:bg-secondary/40">
                        <input type="radio" name="q" className="h-4 w-4 accent-primary" />
                        <span className="text-sm">{o}</span>
                      </label>
                    ))}
                  </div>
                  <button className="mt-5 rounded-[14px] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Submit answer</button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border bg-card px-6 py-4">
            <button className="inline-flex items-center gap-2 rounded-[14px] border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"><ChevronLeft className="h-4 w-4" />Previous</button>
            <div className="text-xs text-muted-foreground">Lesson 6 of {total} · Est. 34 min</div>
            <button className="inline-flex items-center gap-2 rounded-[14px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Next lesson <ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

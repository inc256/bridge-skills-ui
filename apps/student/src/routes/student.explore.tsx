import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";
import { courses } from "@/lib/mock-data";
import { CourseCard } from "@/components/course-card";

export const Route = createFileRoute("/student/explore")({
  component: Explore,
});

const categories = ["All", "Networking", "Cybersecurity", "Software Engineering", "Artificial Intelligence"];
const levels = ["Any level", "Beginner", "Intermediate", "Advanced"];

function Explore() {
  const [cat, setCat] = useState("All");
  const [level, setLevel] = useState("Any level");
  const [q, setQ] = useState("");

  const filtered = courses.filter(
    (c) => (cat === "All" || c.category === cat) && (level === "Any level" || c.level === level) && c.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight">Explore courses</h2>
        <p className="mt-1 text-sm text-muted-foreground">Browse 480+ courses taught by industry experts.</p>
      </div>

      <div className="card-surface p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by topic, tool or instructor…"
              className="w-full rounded-[14px] border border-border bg-background py-3 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
            />
          </div>
          <FilterMenu label={level} options={levels} onChange={setLevel} />
          <button className="inline-flex items-center gap-2 rounded-[14px] border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors">
            <SlidersHorizontal className="h-4 w-4" /> More filters
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                cat === c ? "bg-primary text-primary-foreground" : "border border-border bg-background text-foreground/80 hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{filtered.length}</span> results</p>
        <div className="text-sm text-muted-foreground">Sort by <span className="font-medium text-foreground">Most popular</span></div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
      </div>
    </div>
  );
}

function FilterMenu({ label, options, onChange }: { label: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((s) => !s)} className="inline-flex w-full items-center justify-between gap-2 rounded-[14px] border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors lg:w-52">
        {label} <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_40px_-20px_rgba(13,41,34,0.15)]">
          {options.map((o) => (
            <button key={o} onClick={() => { onChange(o); setOpen(false); }} className="block w-full px-4 py-2.5 text-left text-sm hover:bg-secondary">
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowUpRight, BriefcaseBusiness, CalendarDays, GraduationCap, MapPin, Search } from "lucide-react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { getJobs, getScholarships } from "@/lib/api";

export const Route = createFileRoute("/student/opportunities")({
  component: Opportunities,
});

type Opportunity = {
  id?: string | number;
  title?: string;
  name?: string;
  description?: string;
  summary?: string;
  company?: string;
  organization?: string;
  location?: string;
  type?: string;
  apply_url?: string;
  application_url?: string;
  deadline?: string;
  due_date?: string;
  amount?: string | number;
  salary?: string;
  eligibility?: string;
  is_active?: boolean;
};

function Opportunities() {
  const [tab, setTab] = useState<"jobs" | "scholarships">("jobs");
  const [jobs, setJobs] = useState<Opportunity[]>([]);
  const [scholarships, setScholarships] = useState<Opportunity[]>([]);
  const [jobType, setJobType] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    void Promise.all([getJobs(tab === "jobs" && jobType !== "all" ? jobType : undefined), getScholarships()])
      .then(([jobList, scholarshipList]) => {
        if (cancelled) return;
        setJobs(jobList);
        setScholarships(scholarshipList);
      })
      .catch((loadError: unknown) => {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : "Could not load opportunities.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [jobType, tab]);

  const items = useMemo(() => {
    const source = tab === "jobs" ? jobs : scholarships;
    const normalizedQuery = query.trim().toLowerCase();
    return source.filter((item) => {
      if (item.is_active === false) return false;
      if (tab === "jobs" && jobType !== "all" && item.type !== jobType) return false;
      const searchable = `${item.title ?? item.name ?? ""} ${item.company ?? item.organization ?? ""} ${item.location ?? ""} ${item.description ?? item.summary ?? ""}`.toLowerCase();
      return !normalizedQuery || searchable.includes(normalizedQuery);
    });
  }, [jobs, jobType, query, scholarships, tab]);

  if (loading) return <div className="mx-auto max-w-7xl p-4 sm:p-6"><PageSkeleton rows={4} /></div>;

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <header className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary"><BriefcaseBusiness className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Opportunities</h1>
            <p className="mt-1 text-sm text-muted-foreground">Discover active jobs and scholarships from TechBridge.</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => setTab("jobs")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium ${tab === "jobs" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}><BriefcaseBusiness className="h-4 w-4" />Jobs</button>
          <button type="button" onClick={() => setTab("scholarships")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium ${tab === "scholarships" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}><GraduationCap className="h-4 w-4" />Scholarships</button>
        </div>
      </header>

      {error && <div role="alert" className="flex gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${tab}...`} className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm" />
        </label>
        {tab === "jobs" && (
          <select value={jobType} onChange={(event) => setJobType(event.target.value)} aria-label="Filter jobs by type" className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
            <option value="all">All job types</option>
            <option value="full_time">Full time</option>
            <option value="part_time">Part time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        )}
      </div>

      {items.length === 0 ? (
        <section className="rounded-2xl border border-border bg-card p-10 text-center">
          {tab === "jobs" ? <BriefcaseBusiness className="mx-auto h-9 w-9 text-muted-foreground" /> : <GraduationCap className="mx-auto h-9 w-9 text-muted-foreground" />}
          <h2 className="mt-3 text-lg font-semibold">No {tab} found</h2>
          <p className="mt-1 text-sm text-muted-foreground">Try changing your search or check back later.</p>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const title = item.title || item.name || (tab === "jobs" ? "Job opportunity" : "Scholarship");
            const link = item.apply_url || item.application_url;
            return (
              <article key={item.id ?? `${title}-${index}`} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">{item.type?.replaceAll("_", " ") || (tab === "jobs" ? "Opportunity" : "Scholarship")}</p>
                    <h2 className="mt-1 text-lg font-semibold">{title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{item.company || item.organization || ""}</p>
                  </div>
                  {tab === "jobs" ? <BriefcaseBusiness className="h-5 w-5 shrink-0 text-muted-foreground" /> : <GraduationCap className="h-5 w-5 shrink-0 text-muted-foreground" />}
                </div>
                <p className="mt-4 line-clamp-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{item.description || item.summary || item.eligibility || "See the opportunity details for eligibility and application instructions."}</p>
                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  {item.location && <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{item.location}</p>}
                  {(item.deadline || item.due_date) && <p className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />Deadline: {item.deadline || item.due_date}</p>}
                  {item.amount && <p className="font-medium text-foreground">Award: {item.amount}</p>}
                  {item.salary && <p className="font-medium text-foreground">Salary: {item.salary}</p>}
                </div>
                {link && <a href={link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Apply <ArrowUpRight className="h-4 w-4" /></a>}
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

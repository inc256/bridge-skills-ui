// apps/student/src/routes/student.explore.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  Clock,
  Filter,
  Play,
  Search,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CourseThumb } from "@/components/course-thumb";
import { courses as demoCourses } from "@/lib/mock-data";
import type { Course } from "@/lib/mock-data";

export const Route = createFileRoute("/student/explore")({
  component: Explore,
});

// Types
const categories = ["All", ...new Set(demoCourses.map((course) => course.category))];
const levels = ["Any level", "Beginner", "Intermediate", "Advanced"];
const sortOptions = ["Most popular", "Highest rated", "Newest", "Most students"];
const DEMO_ENROLLED_SLUGS = new Set(["networking-essentials", "product-design-systems", "cloud-architect-aws"]);
const DEMO_SAVED_SLUGS = ["ethical-hacking", "applied-machine-learning"];
type CourseTab = "my-courses" | "all" | "saved" | "recommended";

function Explore() {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(demoCourses);
  const [cat, setCat] = useState("All");
  const [level, setLevel] = useState("Any level");
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("Most popular");
  const [activeTab, setActiveTab] = useState<CourseTab>("my-courses");
  const [savedSlugs, setSavedSlugs] = useState<Set<string>>(() => new Set(DEMO_SAVED_SLUGS));
  const [showFilters, setShowFilters] = useState(true);

  // Filter and sort courses
  useEffect(() => {
    let filtered = [...demoCourses];

    // Search filter
    if (q) {
      const query = q.toLowerCase();
      filtered = filtered.filter(c => 
        c.title?.toLowerCase().includes(query) ||
        c.instructor?.toLowerCase().includes(query) ||
        c.category?.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (cat !== "All") {
      filtered = filtered.filter(c => 
        c.category?.toLowerCase().includes(cat.toLowerCase())
      );
    }

    // Level filter
    if (level !== "Any level") {
      filtered = filtered.filter(c => 
        c.level?.toLowerCase() === level.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case "Most popular":
        filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
        break;
      case "Highest rated":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "Newest":
        // If we had a date field, we'd sort by it
        break;
      case "Most students":
        filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  }, [q, cat, level, sortBy]);

  const clearFilters = () => {
    setQ("");
    setCat("All");
    setLevel("Any level");
    setSortBy("Most popular");
  };

  const hasActiveFilters = q || cat !== "All" || level !== "Any level";
  const myCourses = filteredCourses.filter((course) => DEMO_ENROLLED_SLUGS.has(course.slug));
  const savedCourses = filteredCourses.filter((course) => savedSlugs.has(course.slug));
  const recommendedCourses = filteredCourses
    .filter((course) => !DEMO_ENROLLED_SLUGS.has(course.slug))
    .sort((a, b) => b.rating - a.rating || b.students - a.students)
    .slice(0, 3);
  const visibleCourses = activeTab === "my-courses"
    ? myCourses
    : activeTab === "saved"
      ? savedCourses
      : activeTab === "recommended"
        ? recommendedCourses
        : filteredCourses;
  const toggleSaved = (slug: string) => {
    setSavedSlugs((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Explore courses</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Browse {demoCourses.length} courses taught by industry experts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
            {visibleCourses.length} results
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-xl border border-border bg-card p-3 shadow-sm sm:rounded-2xl sm:p-4 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search courses"
              enterKeyHint="search"
              placeholder="Search by topic, tool or instructor…"
              className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-10 text-base text-foreground transition-all placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary sm:py-3 sm:text-sm"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Clear course search"
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <FilterMenu 
              fullWidth
              label={level} 
              options={levels} 
              onChange={setLevel} 
              icon={<ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            />
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls="course-category-filters"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary active:scale-95 touch-manipulation sm:w-auto sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
            >
              <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div id="course-category-filters" className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1 sm:mt-4 sm:flex-wrap sm:overflow-visible">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition-all active:scale-95 touch-manipulation sm:px-4 sm:py-1.5 sm:text-xs ${
                  cat === c
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-background text-muted-foreground hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] sm:text-xs text-muted-foreground">Active filters:</span>
            {q && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] text-primary sm:text-xs">
                Search: {q}
                <button onClick={() => setQ("")} className="hover:text-primary-dark">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {cat !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] text-primary sm:text-xs">
                {cat}
                <button onClick={() => setCat("All")} className="hover:text-primary-dark">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {level !== "Any level" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] text-primary sm:text-xs">
                {level}
                <button onClick={() => setLevel("Any level")} className="hover:text-primary-dark">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button 
              onClick={clearFilters}
              className="text-[10px] text-muted-foreground hover:text-foreground sm:text-xs"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Course tabs */}
      <div className="mx-auto flex max-w-[1000px] items-center justify-start gap-5 overflow-x-auto border-b border-border sm:justify-center sm:gap-10 lg:gap-12" role="tablist" aria-label="Course collections">
        {[
          { id: "my-courses" as const, label: "My Courses", count: myCourses.length },
          { id: "all" as const, label: "All Courses", count: filteredCourses.length },
          { id: "saved" as const, label: "Saved Courses", count: savedCourses.length },
          { id: "recommended" as const, label: "Recommended Courses", count: recommendedCourses.length },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative shrink-0 whitespace-nowrap border-b-[3px] px-1 pb-3 text-xs font-medium transition-colors sm:text-sm ${
              activeTab === tab.id
                ? "border-primary font-semibold text-primary"
                : "border-transparent text-foreground hover:text-primary"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground sm:text-sm">
          <span className="font-semibold text-foreground">{visibleCourses.length}</span> results
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground sm:text-xs">Sort by</span>
          <FilterMenu 
            label={sortBy} 
            options={sortOptions} 
            onChange={setSortBy}
            icon={<ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
          />
        </div>
      </div>

      {/* Course Grid */}
      {visibleCourses.length === 0 ? (
        <div className="text-center py-12 sm:py-16 md:py-20">
          <Search className="mx-auto mb-3 h-12 w-12 text-muted-foreground sm:h-16 sm:w-16" />
          <p className="font-medium text-foreground">
            {activeTab === "my-courses"
              ? "No courses in your learning list"
              : activeTab === "saved"
                ? "No saved courses yet"
                : activeTab === "recommended"
                  ? "No recommended courses match these filters"
                  : "No courses found"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Try adjusting your search or filters</p>
          <button 
            onClick={clearFilters}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1080px] grid-cols-2 gap-3 px-1 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {visibleCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              isEnrolled={DEMO_ENROLLED_SLUGS.has(course.slug)}
              isSaved={savedSlugs.has(course.slug)}
              onToggleSaved={toggleSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Filter Menu Component
function FilterMenu({ 
  label, 
  options, 
  onChange,
  icon,
  fullWidth = false,
}: { 
  label: string; 
  options: string[]; 
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${fullWidth ? "w-full sm:w-auto" : ""}`}>
      <button 
        onClick={() => setOpen(!open)} 
        className={`inline-flex items-center justify-between gap-1.5 rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary active:scale-95 touch-manipulation sm:gap-2 sm:px-4 sm:py-3 sm:text-sm sm:min-w-[120px] ${
          fullWidth ? "w-full sm:w-auto" : ""
        }`}
      >
        <span className="truncate">{label}</span>
        {icon || <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
      </button>
      
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-1 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg sm:mt-2 sm:w-52">
            {options.map((o) => (
              <button
                key={o}
                onClick={() => { 
                  onChange(o); 
                  setOpen(false); 
                }}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors hover:bg-secondary sm:px-4 sm:py-2.5 sm:text-sm ${
                  o === label ? "bg-secondary font-medium text-primary" : "text-foreground"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Course Card Component
function CourseCard({ 
  course, 
  isEnrolled,
  isSaved,
  onToggleSaved,
}: { 
  course: Course; 
  isEnrolled: boolean;
  isSaved: boolean;
  onToggleSaved: (slug: string) => void;
}) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-[10px] border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-hover">
      <div className="relative h-[105px] shrink-0 overflow-hidden bg-secondary sm:h-[140px]">
        <CourseThumb
          variant={course.image}
          color={course.color}
          title={course.title}
          className="h-full transition-transform duration-200 group-hover:scale-[1.02]"
        />
        <button
          type="button"
          onClick={() => onToggleSaved(course.slug)}
          aria-label={isSaved ? `Remove ${course.title} from saved courses` : `Save ${course.title}`}
          aria-pressed={isSaved}
          className="absolute right-2.5 top-2.5 z-10 grid h-[30px] w-[30px] place-items-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-sm transition hover:scale-105"
        >
          {isSaved
            ? <BookmarkCheck className="h-3.5 w-3.5" aria-hidden="true" />
            : <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
        <span className="absolute bottom-2.5 left-2.5 z-[2] rounded px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary-foreground shadow-sm" style={{ backgroundColor: "var(--primary-dark)" }}>
          {course.level}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <div className="mb-1 flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:justify-between sm:gap-2">
          <h3 className="line-clamp-2 min-h-9 w-full min-w-0 text-sm font-semibold text-foreground sm:min-h-0 sm:w-auto sm:flex-1 sm:truncate sm:text-[15px]">
            {course.title}
          </h3>
          <span className="max-w-full truncate rounded bg-secondary px-2 py-0.5 text-[9px] font-semibold text-primary sm:shrink-0 sm:text-[10px]">
            {course.category}
          </span>
        </div>
        <p className="mb-3 truncate text-[10px] text-muted-foreground sm:text-[11px]">Instructor: {course.instructor}</p>

        <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium text-muted-foreground sm:gap-3 sm:text-[11px]">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" aria-hidden="true" />
            {new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(course.students)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Play className="h-3 w-3 text-teal-500" aria-hidden="true" />
            {course.lessons} Lessons
          </span>
          <span className="hidden items-center gap-1 sm:inline-flex">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {course.duration}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-foreground">{course.price}</span>
          {isEnrolled ? (
            <Link
              to="/student/study/$slug"
              params={{ slug: course.slug }}
              className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-2 text-[10px] font-semibold text-primary-foreground transition-colors hover:bg-primary-dark sm:gap-1.5 sm:px-3 sm:text-xs"
            >
              Continue
            </Link>
          ) : (
            <Link
              to="/student/course/$slug"
              params={{ slug: course.slug }}
              className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-2 text-[10px] font-semibold text-primary-foreground transition-colors hover:bg-primary-dark sm:gap-1.5 sm:px-3 sm:text-xs"
            >
              {course.price.toLowerCase() === "free" ? "Enroll" : "Buy Course"}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default Explore;
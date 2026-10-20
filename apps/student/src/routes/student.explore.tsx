// apps/student/src/routes/student.explore.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Search, SlidersHorizontal, ChevronDown, X, Filter, Sparkles, TrendingUp, Clock, Users, Star } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { getCourses, getMyEnrollments } from "@/lib/api";
import type { Course } from "@/lib/api";
import { resolveCourseThumbnail } from "@/components/course-thumb";

export const Route = createFileRoute("/student/explore")({
  component: Explore,
});

// Types
const categories = ["All", "Networking", "Cybersecurity", "Software Engineering", "Artificial Intelligence", "Cloud Computing", "Data Science"];
const levels = ["Any level", "Beginner", "Intermediate", "Advanced"];
const sortOptions = ["Most popular", "Highest rated", "Newest", "Most students"];

function Explore() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [cat, setCat] = useState("All");
  const [level, setLevel] = useState("Any level");
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("Most popular");
  const [isLoading, setIsLoading] = useState(true);
  const [enrolled, setEnrolled] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load courses
  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load courses:', err);
        setError('Could not load courses. Please try again.');
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadCourses();
  }, []);

  // Load enrollments
  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const data = await getMyEnrollments();
        const enrolledSlugs = new Set(
          (Array.isArray(data) ? data : [])
            .filter((e: any) => e.course?.slug)
            .map((e: any) => e.course.slug)
        );
        setEnrolled(enrolledSlugs);
      } catch (err) {
        console.error('Failed to load enrollments:', err);
      }
    };
    loadEnrollments();
  }, []);

  // Filter and sort courses
  useEffect(() => {
    let filtered = [...courses];

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
  }, [courses, q, cat, level, sortBy]);

  const clearFilters = () => {
    setQ("");
    setCat("All");
    setLevel("Any level");
    setSortBy("Most popular");
  };

  const hasActiveFilters = q || cat !== "All" || level !== "Any level";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-xs sm:text-sm text-gray-500">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-xl">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-700 mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Explore courses</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Browse {filteredCourses.length || courses.length} courses taught by industry experts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {filteredCourses.length} results
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by topic, tool or instructor…"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 sm:py-3 pl-9 sm:pl-10 pr-3 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <FilterMenu 
              label={level} 
              options={levels} 
              onChange={setLevel} 
              icon={<ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            />
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors active:scale-95 touch-manipulation"
            >
              <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all active:scale-95 touch-manipulation ${
                cat === c 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] sm:text-xs text-gray-500">Active filters:</span>
            {q && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs">
                Search: {q}
                <button onClick={() => setQ("")} className="hover:text-blue-900">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {cat !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs">
                {cat}
                <button onClick={() => setCat("All")} className="hover:text-blue-900">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {level !== "Any level" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs">
                {level}
                <button onClick={() => setLevel("Any level")} className="hover:text-blue-900">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button 
              onClick={clearFilters}
              className="text-[10px] sm:text-xs text-gray-400 hover:text-gray-600"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{filteredCourses.length}</span> results
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-gray-400">Sort by</span>
          <FilterMenu 
            label={sortBy} 
            options={sortOptions} 
            onChange={setSortBy}
            icon={<ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
          />
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 sm:py-16 md:py-20">
          <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No courses found</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          <button 
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              isEnrolled={enrolled.has(course.slug)}
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
  icon 
}: { 
  label: string; 
  options: string[]; 
  onChange: (v: string) => void;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)} 
        className="inline-flex items-center justify-between gap-1.5 sm:gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors min-w-[100px] sm:min-w-[120px] active:scale-95 touch-manipulation"
      >
        <span className="truncate">{label}</span>
        {icon || <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
      </button>
      
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-1 sm:mt-2 w-48 sm:w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            {options.map((o) => (
              <button
                key={o}
                onClick={() => { 
                  onChange(o); 
                  setOpen(false); 
                }}
                className={`block w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm hover:bg-gray-50 transition-colors ${
                  o === label ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
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
}: { 
  course: Course; 
  thumbnail?: string | null;
  isEnrolled: boolean;
}) {
  const getLevelColor = (level?: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-emerald-50 text-emerald-600',
      intermediate: 'bg-amber-50 text-amber-600',
      advanced: 'bg-red-50 text-red-600'
    };
    return colors[level?.toLowerCase() ?? ""] || 'bg-gray-50 text-gray-600';
  };

  return (
    <Link
  to="/student/course/$slug"
  params={{ slug: course.slug }}
  className="block bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation group"
>
  {/* Course Image */}
  <div className={`h-32 sm:h-36 md:h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold relative overflow-hidden`}>
    {resolveCourseThumbnail(course.thumbnail) ? (
      <img
        src={resolveCourseThumbnail(course.thumbnail) ?? undefined}
        alt={course.title}
        className="h-full w-full object-cover"
      />
    ) : (
      course.title?.[0]?.toUpperCase() || 'C'
    )}
    {course.progress !== undefined && course.progress > 0 && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div 
          className="h-full bg-white transition-all duration-1000" 
          style={{ width: `${Math.min(course.progress, 100)}%` }} 
        />
      </div>
    )}
  </div>

  {/* Course Info */}
  <div className="p-3 sm:p-4">
    <div className="flex items-start justify-between gap-2">
      <h4 className="font-semibold text-gray-900 truncate text-sm sm:text-base flex-1">
        {course.title}
      </h4>
      <span className={`text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${getLevelColor(course.level)}`}>
        {course.level || 'Beginner'}
      </span>
    </div>
    
    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
      {course.instructor || 'Instructor'} · {course.category || 'Course'}
    </p>

    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500">
      <span className="flex items-center gap-0.5 sm:gap-1">
        <Users className="h-3 w-3" />
        {course.students || 0}
      </span>
      <span className="flex items-center gap-0.5 sm:gap-1">
        <Star className="h-3 w-3 text-amber-400 fill-current" />
        {course.rating?.toFixed(1) || '0.0'}
      </span>
      <span className="flex items-center gap-0.5 sm:gap-1">
        <Clock className="h-3 w-3" />
        {course.duration || 'TBD'}
      </span>
    </div>

    <div className="flex items-center justify-between mt-3 pt-2 sm:pt-3 border-t border-gray-100">
      <span className="text-xs sm:text-sm font-semibold text-gray-900">
        {course.price || "Price unavailable"}
      </span>
      <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${
        isEnrolled ? "bg-emerald-50 text-emerald-600" : "bg-blue-600 text-white"
      }`}>
        {isEnrolled ? "✓ Enrolled" : course.price.toLowerCase() === "free" ? "View course" : "Buy course"}
      </span>
    </div>
  </div>
</Link>
  );
}

export default Explore;
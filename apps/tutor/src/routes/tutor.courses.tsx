// apps/tutor/src/routes/tutor/courses.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  Plus, 
  Users, 
  Star, 
  Clock,
  BookOpen,
  TrendingUp,
  Search,
  LayoutGrid,
  List,
  Edit,
  Trash2,
  RefreshCw
} from "lucide-react";
import { useEffect, useState } from "react";
import { deleteCourse, deleteTutorLesson, getCourseLessons, getCourseReviews, getCourses } from "@/lib/api";

export const Route = createFileRoute("/tutor/courses")({
  component: TutorCourses,
});

// ============================================================
// 1. CUSTOM HOOKS
// ============================================================

function useCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load courses with optimistic saved course
  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      const courseList = await getCourses();
      
      // Apply optimistic saved course if present
      try {
        const raw = typeof window !== "undefined" 
          ? window.localStorage.getItem("bridge_skills_tutor_last_saved_course") 
          : null;
        if (raw) {
          const saved = JSON.parse(raw);
          const existsIdx = courseList.findIndex((c: any) => c.slug === saved.slug);
          if (existsIdx >= 0) {
            courseList[existsIdx] = { ...courseList[existsIdx], ...saved };
          } else {
            courseList.unshift(saved);
          }
        }
      } catch {}

      setCourses(courseList);
      setFilteredCourses(courseList);
      setSelectedCourse(courseList[0] ?? null);
      setIsLoading(false);
    })();
  }, []);

  const deleteCourseHandler = async (course: any) => {
    if (!course?.slug) return;
    const confirmed = window.confirm(`Delete "${course.title || "this course"}"? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteCourse(course.slug);
      const remaining = courses.filter((item) => item.slug !== course.slug);
      setCourses(remaining);
      setFilteredCourses(remaining);
      setSelectedCourse((current: any) => 
        current?.slug === course.slug ? remaining[0] ?? null : current
      );
      
      // Remove from localStorage if it was the saved course
      if (typeof window !== "undefined") {
        const saved = window.localStorage.getItem("bridge_skills_tutor_last_saved_course");
        if (saved && JSON.parse(saved)?.slug === course.slug) {
          window.localStorage.removeItem("bridge_skills_tutor_last_saved_course");
        }
      }
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to delete course.");
    }
  };

  return {
    courses,
    setCourses,
    filteredCourses,
    setFilteredCourses,
    selectedCourse,
    setSelectedCourse,
    isLoading,
    deleteCourse: deleteCourseHandler,
  };
}

function useCourseDetails(courseSlug: string | undefined) {
  const [lessons, setLessons] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [deletingLessonId, setDeletingLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (!courseSlug) {
      setLessons([]);
      setReviews([]);
      return;
    }

    void (async () => {
      const [lessonList, reviewList] = await Promise.all([
        getCourseLessons(courseSlug),
        getCourseReviews(courseSlug),
      ]);
      setLessons(lessonList);
      setReviews(reviewList);
    })();
  }, [courseSlug]);

  const deleteLesson = async (lesson: any) => {
    const lessonId = String(lesson?.id ?? "");
    if (!lessonId || lessonId.startsWith("lesson-") || deletingLessonId) return;
    if (!window.confirm(`Delete "${lesson.title ?? lesson.name ?? "this lesson"}"?`)) return;

    setDeletingLessonId(lessonId);
    try {
      await deleteTutorLesson(lessonId);
      setLessons((current) => current.filter((item) => String(item.id) !== lessonId));
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to delete lesson.");
    } finally {
      setDeletingLessonId(null);
    }
  };

  return {
    lessons,
    reviews,
    deletingLessonId,
    deleteLesson,
  };
}

function useCourseFilters(courses: any[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [filteredCourses, setFilteredCourses] = useState<any[]>(courses);

  useEffect(() => {
    let filtered = courses;
    
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(c.category ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterStatus !== "all") {
      filtered = filtered.filter(c => c.status === filterStatus);
    }
    
    setFilteredCourses(filtered);
  }, [searchQuery, filterStatus, courses]);

  return {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    viewMode,
    setViewMode,
    filteredCourses,
  };
}

// ============================================================
// 2. HELPER FUNCTIONS
// ============================================================

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-600 border-emerald-200",
    draft: "bg-amber-50 text-amber-600 border-amber-200",
    archived: "bg-gray-50 text-gray-600 border-gray-200"
  };
  return colors[status] || colors.draft;
}

function getStatusBadge(status: string): string {
  const labels: Record<string, string> = {
    published: "Published",
    draft: "Draft",
    archived: "Archived"
  };
  return labels[status] || "Draft";
}

function getStats(courses: any[]) {
  return [
    {
      icon: BookOpen,
      value: courses.length,
      label: "Total Courses",
      color: "blue"
    },
    {
      icon: Users,
      value: courses.reduce((sum, c) => sum + (c.students || 0), 0),
      label: "Total Students",
      color: "emerald"
    },
    {
      icon: Star,
      value: courses.length > 0 
        ? (courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length).toFixed(1)
        : "0.0",
      label: "Avg. Rating",
      color: "amber"
    },
    {
      icon: TrendingUp,
      value: courses.filter(c => c.status === "published").length,
      label: "Published",
      color: "purple"
    }
  ];
}

const colorClasses: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  purple: "bg-purple-50 text-purple-600"
};

// ============================================================
// 3. COMPONENTS
// ============================================================

// 3.1 Loading Spinner
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading courses...</p>
      </div>
    </div>
  );
}

// 3.2 Stats Cards
function StatsCards({ courses }: { courses: any[] }) {
  const stats = getStats(courses);
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClass = colorClasses[stat.color];
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 3.3 Filter Bar
function FilterBar({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  viewMode,
  setViewMode,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterStatus: string;
  setFilterStatus: (s: string) => void;
  viewMode: "table" | "grid";
  setViewMode: (m: "table" | "grid") => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          
          <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-200">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "table" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3.4 Course Table Row
function CourseTableRow({
  course,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  isDeleting,
}: {
  course: any;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  isDeleting: boolean;
}) {
  return (
    <tr
      onClick={onSelect}
      className={`cursor-pointer border-b border-gray-100 text-sm transition-colors ${
        isSelected ? "bg-blue-50/50" : "hover:bg-gray-50"
      }`}
    >
      <td className="py-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                {course.title?.[0]?.toUpperCase() || 'C'}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="truncate font-semibold text-gray-900">{course.title}</div>
            <div className="text-xs text-gray-400">{course.category} · {course.level}</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 hidden sm:table-cell">
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
          {getStatusBadge(course.status)}
        </span>
      </td>
      <td className="py-3 px-4 hidden md:table-cell text-gray-600">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-gray-400" />
          {course.students?.toLocaleString() || 0}
        </span>
      </td>
      <td className="py-3 px-4 hidden lg:table-cell text-gray-600">
        <span className="inline-flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-amber-400 fill-current" />
          {course.rating || 0}
        </span>
      </td>
      <td className="py-3 px-4 hidden xl:table-cell text-gray-600">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-gray-400" />
          {course.duration || "—"}
        </span>
      </td>
      <td className="py-3 px-4 sm:px-6 text-right">
        <div className="flex items-center justify-end gap-1">
          <Link
            to="/tutor/builder"
            search={{ slug: course.slug }}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
            onClick={onDelete}
            disabled={isDeleting}
            title="Delete course"
          >
            {isDeleting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </button>
        </div>
      </td>
    </tr>
  );
}

// 3.5 Course Grid Card
function CourseGridCard({
  course,
  isSelected,
  onSelect,
}: {
  course: any;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
        isSelected ? "border-blue-500 bg-blue-50/50" : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
              {course.title?.[0]?.toUpperCase() || 'C'}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 truncate">{course.title}</div>
          <div className="text-xs text-gray-400">{course.category} · {course.level}</div>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-gray-400" />
              {course.students || 0}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-current" />
              {course.rating || 0}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
              {getStatusBadge(course.status)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3.6 Course List
function CourseList({
  courses,
  viewMode,
  selectedCourse,
  onSelectCourse,
  onDeleteCourse,
  deletingSlug,
}: {
  courses: any[];
  viewMode: "table" | "grid";
  selectedCourse: any;
  onSelectCourse: (c: any) => void;
  onDeleteCourse: (c: any) => void;
  deletingSlug: string | null;
}) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No courses found</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or create a new course</p>
      </div>
    );
  }

  if (viewMode === "table") {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="py-3 px-4 sm:px-6">Course</th>
              <th className="py-3 px-4 hidden sm:table-cell">Status</th>
              <th className="py-3 px-4 hidden md:table-cell">Students</th>
              <th className="py-3 px-4 hidden lg:table-cell">Rating</th>
              <th className="py-3 px-4 hidden xl:table-cell">Duration</th>
              <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <CourseTableRow
                key={c.id}
                course={c}
                isSelected={selectedCourse?.id === c.id}
                onSelect={() => onSelectCourse(c)}
                onEdit={(e) => e.stopPropagation()}
                onDelete={(e) => {
                  e.stopPropagation();
                  onDeleteCourse(c);
                }}
                isDeleting={deletingSlug === c.slug}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {courses.map((c) => (
        <CourseGridCard
          key={c.id}
          course={c}
          isSelected={selectedCourse?.id === c.id}
          onSelect={() => onSelectCourse(c)}
        />
      ))}
    </div>
  );
}

// 3.7 Course Details Sidebar
function CourseDetailsSidebar({
  course,
  lessons,
  reviews,
  onDeleteLesson,
  deletingLessonId,
}: {
  course: any;
  lessons: any[];
  reviews: any[];
  onDeleteLesson: (lesson: any) => void;
  deletingLessonId: string | null;
}) {
  return (
    <aside className="space-y-6">
      {/* Course Details */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>
        {course ? (
          <div className="mt-4 space-y-4">
            <div>
              <div className="text-sm font-semibold text-gray-900">{course.title}</div>
              <div className="text-sm text-gray-500 mt-1">{course.description}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-xs text-gray-500">Students</div>
                <div className="font-semibold text-gray-900">{course.students?.toLocaleString() || 0}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-xs text-gray-500">Rating</div>
                <div className="font-semibold text-gray-900">{course.rating || 0} ★</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-xs text-gray-500">Duration</div>
                <div className="font-semibold text-gray-900">{course.duration || "—"}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-xs text-gray-500">Lessons</div>
                <div className="font-semibold text-gray-900">{lessons.length || course.lessons || 0}</div>
              </div>
            </div>
            <Link
              to="/tutor/builder"
              search={{ slug: course.slug }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
              Edit Course
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">Select a course from the table to view details.</p>
        )}
      </section>

      {/* Lessons */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900">Lessons</h3>
        {course ? (
          lessons.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {lessons.slice(0, 5).map((lesson) => (
                <li key={lesson.id ?? lesson.slug ?? lesson.title} className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-gray-900 truncate">{lesson.title ?? lesson.name ?? "Untitled lesson"}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{lesson.duration ?? lesson.estimated_duration ?? "Unknown duration"}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteLesson(lesson)}
                    disabled={deletingLessonId === String(lesson.id)}
                    className="shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
                    title="Delete lesson"
                  >
                    {deletingLessonId === String(lesson.id) ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </li>
              ))}
              {lessons.length > 5 && (
                <p className="text-xs text-gray-400 text-center">+ {lessons.length - 5} more lessons</p>
              )}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-gray-500">No lessons available yet for this course.</p>
          )
        ) : (
          <p className="mt-4 text-sm text-gray-500">Choose a course to load lessons.</p>
        )}
      </section>

      {/* Recent Reviews */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
        {course ? (
          reviews.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {reviews.slice(0, 4).map((review) => (
                <li key={review.id ?? review.user?.id ?? JSON.stringify(review)} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-sm text-gray-900">
                      {review.user?.full_name ?? review.user?.username ?? "Learner"}
                    </div>
                    <div className="text-xs text-amber-600 font-medium">
                      {review.rating ?? "—"} ★
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{review.comment ?? review.content ?? "No review text."}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-gray-500">No reviews have been posted yet.</p>
          )
        ) : (
          <p className="mt-4 text-sm text-gray-500">Choose a course to load reviews.</p>
        )}
      </section>
    </aside>
  );
}

// ============================================================
// 4. MAIN COMPONENT
// ============================================================

function TutorCourses() {
  // Hooks
  const {
    courses,
    filteredCourses,
    selectedCourse,
    setSelectedCourse,
    isLoading,
    deleteCourse: deleteCourseHandler,
  } = useCourses();

  const {
    lessons,
    reviews,
    deletingLessonId,
    deleteLesson,
  } = useCourseDetails(selectedCourse?.slug);

  const {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    viewMode,
    setViewMode,
    filteredCourses: searchFilteredCourses,
  } = useCourseFilters(courses);

  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  // Wrapper for delete course to manage loading state
  const handleDeleteCourse = async (course: any) => {
    setDeletingSlug(course.slug);
    await deleteCourseHandler(course);
    setDeletingSlug(null);
  };

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Courses</h2>
          <p className="text-sm text-gray-500 mt-1">
            Create, edit, and monitor performance of every course you teach.
          </p>
        </div>
        <Link
          to="/tutor/builder"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Course
        </Link>
      </div>

      {/* Stats Cards */}
      <StatsCards courses={courses} />

      {/* Filters & Search */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Content */}
      <div className={`grid gap-6 ${selectedCourse ? "lg:grid-cols-[1.5fr_0.9fr]" : "lg:grid-cols-1"}`}>
        {/* Course List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <CourseList
            courses={searchFilteredCourses}
            viewMode={viewMode}
            selectedCourse={selectedCourse}
            onSelectCourse={setSelectedCourse}
            onDeleteCourse={handleDeleteCourse}
            deletingSlug={deletingSlug}
          />
        </div>

        {/* Sidebar - Course Details */}
        {selectedCourse && (
          <CourseDetailsSidebar
            course={selectedCourse}
            lessons={lessons}
            reviews={reviews}
            onDeleteLesson={deleteLesson}
            deletingLessonId={deletingLessonId}
          />
        )}
      </div>
    </div>
  );
}

export default TutorCourses;
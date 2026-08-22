// apps/student/src/routes/student.my-learning.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, ChevronRight, Clock, Star, Users, Play, CheckCircle, Heart, Sparkles, TrendingUp } from "lucide-react";
import { getMyEnrollments, getWishlistCourses } from "@/lib/api";
import type { Course } from "@/lib/api";

export const Route = createFileRoute("/student/my-learning")({
  component: MyLearning,
});

interface Enrollment {
  id: string;
  course: Course | null;
  status: string;
  progress: number;
  enrolledAt: string;
}

const tabs = [
  { key: "in-progress", label: "In Progress", icon: Play },
  { key: "completed", label: "Completed", icon: CheckCircle },
  { key: "wishlist", label: "Wishlist", icon: Heart },
];

function MyLearning() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [wishlistCourses, setWishlistCourses] = useState<Course[]>([]);
  const [tab, setTab] = useState<string>("in-progress");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Load enrollments
        const enrollmentData = await getMyEnrollments();
        setEnrollments(Array.isArray(enrollmentData) ? enrollmentData : []);
        
        // Load wishlist
        try {
          const wishlistData = await getWishlistCourses();
          setWishlistCourses(Array.isArray(wishlistData) ? wishlistData : []);
        } catch (e) {
          console.error('Failed to load wishlist:', e);
          setWishlistCourses([]);
        }
      } catch (err) {
        console.error('Failed to load learning data:', err);
        setError('Could not load your courses. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Process enrollments to get courses with progress
  const courses = enrollments
    .filter((e) => e.course)
    .map((e) => ({
      ...(e.course as Course),
      progress: e.progress ?? (e.course as Course)?.progress ?? 0,
      enrollmentStatus: e.status,
      enrolledAt: e.enrolledAt,
    }));

  const inProgress = courses.filter((c) => (c.progress ?? 0) < 100);
  const completed = courses.filter((c) => (c.progress ?? 0) >= 100);
  const wishlist = wishlistCourses;

  const getTabContent = () => {
    switch (tab) {
      case "in-progress":
        return { items: inProgress, emptyMessage: "No courses in progress", emptySub: "Enroll in a course to start learning" };
      case "completed":
        return { items: completed, emptyMessage: "No completed courses yet", emptySub: "Complete a course to see it here" };
      case "wishlist":
        return { items: wishlist, emptyMessage: "Your wishlist is empty", emptySub: "Save courses you're interested in" };
      default:
        return { items: [], emptyMessage: "No courses", emptySub: "" };
    }
  };

  const { items: displayItems, emptyMessage, emptySub } = getTabContent();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs sm:text-sm text-gray-500">Loading your courses...</p>
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
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">My Learning</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Continue where you left off, revisit completed courses, or plan what's next
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {inProgress.length + completed.length} total
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-1.5 sm:p-2 shadow-sm overflow-x-auto">
        <div className="flex gap-0.5 sm:gap-1 min-w-max">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.key;
            const count = t.key === "in-progress" ? inProgress.length : 
                         t.key === "completed" ? completed.length : 
                         wishlist.length;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all active:scale-95 touch-manipulation ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span className="hidden xs:inline">{t.label}</span>
                <span className="inline xs:hidden">{t.label.split(" ")[0]}</span>
                <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Course Grid */}
      {displayItems.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-12 md:p-16 text-center shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4">
              {tab === "in-progress" ? "📚" : tab === "completed" ? "🎓" : "❤️"}
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{emptyMessage}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{emptySub}</p>
            <Link 
              to="/student/explore" 
              className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors active:scale-95 touch-manipulation"
            >
              Browse courses
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {displayItems.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              tab={tab}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Course Card Component
function CourseCard({ course, tab }: { course: Course; tab: string }) {
  const progress = course.progress || 0;
  const isCompleted = progress >= 100;
  const isInProgress = progress > 0 && progress < 100;

  const getLevelColor = (level?: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-emerald-50 text-emerald-600',
      intermediate: 'bg-amber-50 text-amber-600',
      advanced: 'bg-red-50 text-red-600'
    };
    return colors[level?.toLowerCase() ?? ""] || 'bg-gray-50 text-gray-600';
  };

  const getStatusBadge = () => {
    if (isCompleted) {
      return { text: 'Completed', className: 'bg-emerald-50 text-emerald-600' };
    }
    if (isInProgress) {
      return { text: 'In Progress', className: 'bg-blue-50 text-blue-600' };
    }
    return { text: 'Not Started', className: 'bg-gray-50 text-gray-600' };
  };

  const status = getStatusBadge();

  return (
    <Link
      to="/student/study/$slug"
      params={{ slug: course.slug }}
      className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation"
    >
      {/* Course Image */}
      <div className={`h-32 sm:h-36 md:h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold relative overflow-hidden`}>
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        ) : (
          course.title?.[0]?.toUpperCase() || 'C'
        )}
        {tab !== "wishlist" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-white transition-all duration-1000" 
              style={{ width: `${Math.min(progress, 100)}%` }} 
            />
          </div>
        )}
        {tab === "wishlist" && (
          <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
            <Heart className="h-4 w-4 text-white fill-white" />
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

        {tab !== "wishlist" && (
          <div className="mt-2 sm:mt-3">
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mb-0.5">
              <span>Progress</span>
              <span className="font-semibold text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 sm:h-2 overflow-hidden rounded-full bg-gray-200">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  isCompleted ? 'bg-emerald-500' : 'bg-blue-600'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }} 
              />
            </div>
          </div>
        )}

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
          <span className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${status.className}`}>
            {status.text}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-gray-900">
            {course.price || 'Free'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MyLearning;
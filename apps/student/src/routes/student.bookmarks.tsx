// apps/student/src/routes/student.bookmarks.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { BookMarked, Trash2, Heart, BookOpen, Sparkles, TrendingUp, Clock, Users, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getLocalWishlistCourses, removeLocalWishlist } from "@/lib/api";
import type { Course } from "@/lib/api";

export const Route = createFileRoute("/student/bookmarks")({
  component: Bookmarks,
});

interface WishlistItem {
  id: string;
  course: Course;
  created_at?: string;
}

function Bookmarks() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    const loadBookmarks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = getLocalWishlistCourses();
        // If the API returns courses directly, wrap them in wishlist items
        if (Array.isArray(data)) {
          const wishlistItems = data.map((course, index) => ({
            id: course.id || `item-${index}`,
            course: course,
            created_at: new Date().toISOString()
          }));
          setItems(wishlistItems);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error('Failed to load bookmarks:', err);
        setError('Could not load bookmarks. Please try again.');
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadBookmarks();
  }, []);

  const handleRemove = async (courseSlug: string) => {
    setRemoving(courseSlug);
    try {
      removeLocalWishlist(courseSlug);
      setItems(prev => prev.filter(item => item.course.slug !== courseSlug));
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
    } finally {
      setRemoving(null);
    }
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-emerald-50 text-emerald-600',
      intermediate: 'bg-amber-50 text-amber-600',
      advanced: 'bg-red-50 text-red-600'
    };
    return colors[level?.toLowerCase()] || 'bg-gray-50 text-gray-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-xs sm:text-sm text-gray-500">Loading bookmarks...</p>
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
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Bookmarks</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Courses you've saved to study later
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Heart className="h-3 w-3 text-blue-500 fill-blue-500" />
            {items.length} saved
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <BookMarked className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{items.length}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {items.reduce((sum, item) => sum + (item.course.students || 0), 0)}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">Students</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {items.length > 0 
                    ? (items.reduce((sum, item) => sum + (item.course.rating || 0), 0) / items.length).toFixed(1)
                    : '0.0'}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">Avg. Rating</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {items.reduce((sum, item) => sum + (item.course.lessons || 0), 0)}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">Lessons</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks Grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-12 md:p-16 text-center shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4">
              📚
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">No bookmarks yet</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Browse courses and click the heart icon to save them here
            </p>
            <Link 
              to="/student/explore" 
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Explore courses
              <Heart className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {items.map((item) => {
            const course = item.course;
            const isRemoving = removing === course.slug;
            
            return (
              <div 
                key={item.id} 
                className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation relative"
              >
                {/* Course Image */}
                <div className="h-32 sm:h-36 md:h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold relative">
                  {course.title?.[0]?.toUpperCase() || 'C'}
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(course.slug)}
                    disabled={isRemoving}
                    className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-all hover:scale-110 active:scale-95 touch-manipulation disabled:opacity-50"
                    title="Remove bookmark"
                  >
                    {isRemoving ? (
                      <div className="h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />
                    )}
                  </button>
                  
                  {/* Heart Badge */}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
                    <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-900 truncate text-sm sm:text-base flex-1">
                      {course.title}
                    </h4>
                    <span className={`text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${getLevelColor(course.level || 'Beginner')}`}>
                      {course.level || 'Beginner'}
                    </span>
                  </div>
                  
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                    {course.instructor || 'Instructor'} · {course.category || 'Course'}
                  </p>

                  <p className="text-xs text-gray-600 mt-1.5 sm:mt-2 line-clamp-2 min-h-[2.5rem]">
                    {course.description || 'Learn the fundamentals of this subject'}
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
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.lessons || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                      {course.price || 'Free'}
                    </span>
                    <Link
                      to="/student/courses/$slug"
                      params={{ slug: course.slug }}
                      className="text-[10px] sm:text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
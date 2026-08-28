// apps/student/src/routes/student.paths.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { BookOpen, Compass, Sparkles, ChevronRight, Clock, Users, Star, Award, Target, Zap, TrendingUp, Calendar, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getLearningPaths } from "@/lib/api";

export const Route = createFileRoute("/student/paths")({
  component: LearningPaths,
});

interface LearningPath {
  id?: string;
  slug?: string;
  title: string;
  name?: string;
  description: string;
  summary?: string;
  courses?: any[];
  course_count?: number;
  duration?: string;
  level?: string;
  category?: string;
  students?: number;
  rating?: number;
  steps?: number;
  completed?: number;
  featured?: boolean;
  skills?: string[];
}

function LearningPaths() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  useEffect(() => {
    const loadPaths = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getLearningPaths();
        setPaths(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load learning paths:', err);
        setError('Could not load learning paths. Please try again.');
        setPaths([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadPaths();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-xs sm:text-sm text-gray-500">Loading learning paths...</p>
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
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Learning Paths</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Follow guided tracks that combine courses, projects, and milestones
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {paths.length} paths
          </span>
        </div>
      </div>

      {/* Paths Grid */}
      {paths.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-12 md:p-16 text-center shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4">
              🧭
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">No learning paths available</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Check back later for new guided learning tracks
            </p>
            <Link 
              to="/student/explore" 
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Explore courses
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {paths.map((path, index) => {
            const isFeatured = path.featured || index === 0;
            const progress = path.completed || 0;
            const totalSteps = path.steps || path.courses?.length || path.course_count || 5;
            const progressPercent = Math.min(100, Math.round((progress / totalSteps) * 100));

            return (
              <div 
                key={path.slug || path.id || index}
                className={`bg-white rounded-xl sm:rounded-2xl border ${
                  isFeatured ? 'border-blue-300 shadow-md' : 'border-gray-200 shadow-sm'
                } overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-1.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-white flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" />
                      Featured Path
                    </span>
                    <span className="text-[10px] text-blue-200">Recommended</span>
                  </div>
                )}

                <div className="p-4 sm:p-5 md:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                          <Compass className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {path.category || 'Learning Path'}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {path.title || path.name || 'Guided Pathway'}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${
                        path.level?.toLowerCase() === 'beginner' ? 'bg-emerald-50 text-emerald-600' :
                        path.level?.toLowerCase() === 'intermediate' ? 'bg-amber-50 text-amber-600' :
                        path.level?.toLowerCase() === 'advanced' ? 'bg-red-50 text-red-600' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {path.level || 'All Levels'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {path.description || path.summary || 'A recommended route for your next career milestone.'}
                  </p>

                  {/* Progress */}
                  {progress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mb-0.5">
                        <span>Progress</span>
                        <span className="font-semibold text-gray-700">{progressPercent}%</span>
                      </div>
                      <div className="h-1.5 sm:h-2 overflow-hidden rounded-full bg-gray-200">
                        <div 
                          className="h-full rounded-full bg-blue-600 transition-all duration-1000"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                      <BookOpen className="h-3.5 w-3.5" />
                      {path.courses?.length || path.course_count || 0} courses
                    </span>
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      {path.duration || 'Flexible'}
                    </span>
                    {path.students !== undefined && (
                      <span className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                        <Users className="h-3.5 w-3.5" />
                        {path.students.toLocaleString()}
                      </span>
                    )}
                    {path.rating !== undefined && (
                      <span className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-current" />
                        {path.rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  {/* Skills */}
                  {path.skills && path.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {path.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-[8px] sm:text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {skill}
                        </span>
                      ))}
                      {path.skills.length > 3 && (
                        <span className="text-[8px] sm:text-[10px] px-2 py-0.5 text-gray-400">
                          +{path.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <Link
                    to={`/student/path/$slug`}
                    params={{ slug: path.slug || path.id || 'path' }}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors active:scale-95 touch-manipulation"
                  >
                    {progress > 0 ? 'Continue Path' : 'Start Path'}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LearningPaths;
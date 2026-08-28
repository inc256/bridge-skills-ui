// apps/tutor/src/routes/tutor/quizzes.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useState, useEffect } from "react";
import { 
  HelpCircle, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  Clock,
  Users,
  Star,
  TrendingUp,
  Edit,
  Eye,
  BarChart3,
  Search,
  Filter,
  X,
  Play,
  Pause,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

// API imports - adjust based on your actual API
import { getCourses } from "@/lib/api";

export const Route = createFileRoute("/tutor/quizzes")({
  component: TutorQuizzes,
});

// Types
interface Quiz {
  id: number | string;
  title: string;
  course: string;
  courseId?: string | number;
  questions: number;
  attempts: number;
  avgScore: number;
  passScore: number;
  isPublished: boolean;
  duration?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  lastAttempt?: string;
  createdAt?: string;
}

function TutorQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [expanded, setExpanded] = useState<string | number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockQuizzes: Quiz[] = [
        { 
          id: 1, 
          title: 'Network Fundamentals Quiz', 
          course: 'Networking Essentials',
          questions: 15, 
          attempts: 342, 
          avgScore: 74, 
          passScore: 70, 
          isPublished: true,
          duration: 30,
          difficulty: 'medium',
          lastAttempt: '2026-08-04'
        },
        { 
          id: 2, 
          title: 'OSI Model Deep Dive', 
          course: 'Networking Essentials', 
          questions: 10, 
          attempts: 189, 
          avgScore: 81, 
          passScore: 70, 
          isPublished: true,
          duration: 20,
          difficulty: 'medium',
          lastAttempt: '2026-08-03'
        },
        { 
          id: 3, 
          title: 'Subnetting Challenge', 
          course: 'Networking Essentials', 
          questions: 20, 
          attempts: 95, 
          avgScore: 62, 
          passScore: 75, 
          isPublished: false,
          duration: 45,
          difficulty: 'hard',
          lastAttempt: '2026-08-01'
        },
        { 
          id: 4, 
          title: 'Web Application Security', 
          course: 'Ethical Hacking', 
          questions: 12, 
          attempts: 156, 
          avgScore: 68, 
          passScore: 70, 
          isPublished: true,
          duration: 25,
          difficulty: 'hard',
          lastAttempt: '2026-08-02'
        },
        { 
          id: 5, 
          title: 'TypeScript Types Mastery', 
          course: 'Full-Stack TypeScript', 
          questions: 8, 
          attempts: 78, 
          avgScore: 85, 
          passScore: 80, 
          isPublished: false,
          duration: 15,
          difficulty: 'easy',
          lastAttempt: '2026-07-30'
        },
      ];
      setQuizzes(mockQuizzes);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter quizzes
  const filteredQuizzes = quizzes.filter(q => {
    // Status filter
    if (filterStatus === "published" && !q.isPublished) return false;
    if (filterStatus === "draft" && q.isPublished) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return q.title.toLowerCase().includes(query) ||
             q.course.toLowerCase().includes(query);
    }
    
    return true;
  });

  // Calculate stats
  const totalQuizzes = quizzes.length;
  const totalAttempts = quizzes.reduce((sum, q) => sum + q.attempts, 0);
  const avgScore = quizzes.length > 0 
    ? Math.round(quizzes.reduce((sum, q) => sum + q.avgScore, 0) / quizzes.length)
    : 0;
  const publishedCount = quizzes.filter(q => q.isPublished).length;
  const draftCount = quizzes.filter(q => !q.isPublished).length;

  const statsCards = [
    {
      icon: HelpCircle,
      value: totalQuizzes,
      label: 'Total Quizzes',
      subtext: `${publishedCount} published, ${draftCount} draft`,
      color: 'blue'
    },
    {
      icon: Users,
      value: totalAttempts.toLocaleString(),
      label: 'Total Attempts',
      subtext: 'All time',
      color: 'emerald'
    },
    {
      icon: Star,
      value: avgScore + '%',
      label: 'Avg. Score',
      subtext: 'Across all quizzes',
      color: 'purple'
    },
    {
      icon: TrendingUp,
      value: publishedCount > 0 ? Math.round((publishedCount / totalQuizzes) * 100) + '%' : '0%',
      label: 'Published Rate',
      subtext: `${publishedCount} live quizzes`,
      color: 'amber'
    }
  ];

  const statColorMap = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600'
  };

  const getDifficultyColor = (difficulty?: string) => {
    const colors = {
      easy: 'bg-green-50 text-green-600 border-green-200',
      medium: 'bg-amber-50 text-amber-600 border-amber-200',
      hard: 'bg-red-50 text-red-600 border-red-200'
    };
    return colors[difficulty as keyof typeof colors] || colors.medium;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const toggleExpand = (id: string | number) => {
    setExpanded(expanded === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-sm text-gray-500">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Quizzes</h2>
          <p className="text-sm text-gray-500 mt-1">
            Author and manage knowledge checks for your courses
          </p>
        </div>
        <Link
          to="/tutor/quiz-builder"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Quiz
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClass = statColorMap[stat.color as keyof typeof statColorMap];
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">{stat.subtext}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search quizzes by title or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("published")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === "published"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setFilterStatus("draft")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === "draft"
                  ? "bg-amber-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Draft
            </button>
          </div>
        </div>
      </div>

      {/* Quiz List */}
      <div className="space-y-3">
        {filteredQuizzes.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No quizzes found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or create a new quiz</p>
            <Link
              to="/tutor/quiz-builder"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Create Quiz
            </Link>
          </div>
        ) : (
          filteredQuizzes.map((quiz) => {
            const isExpanded = expanded === quiz.id;
            const difficultyColor = getDifficultyColor(quiz.difficulty);
            const scoreColor = getScoreColor(quiz.avgScore);

            return (
              <div key={quiz.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Quiz Header - Clickable to expand */}
                <div 
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpand(quiz.id)}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      quiz.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {quiz.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                            quiz.isPublished 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                              : 'bg-amber-50 text-amber-600 border-amber-200'
                          }`}>
                            {quiz.isPublished ? (
                              <><CheckCircle className="w-3 h-3 mr-1" /> Published</>
                            ) : (
                              <><Pause className="w-3 h-3 mr-1" /> Draft</>
                            )}
                          </span>
                          {quiz.difficulty && (
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${difficultyColor}`}>
                              {quiz.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {quiz.course}
                        <span className="mx-2">·</span>
                        <span className="text-gray-400">{quiz.questions} questions</span>
                        <span className="mx-2">·</span>
                        <span className="text-gray-400">{quiz.attempts} attempts</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className={`text-sm font-bold ${scoreColor}`}>
                        {quiz.avgScore}% avg
                      </p>
                      <p className="text-xs text-gray-400">Pass: {quiz.passScore}%</p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                        <p className="text-xs text-gray-500">Questions</p>
                        <p className="text-lg font-bold text-gray-900">{quiz.questions}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                        <p className="text-xs text-gray-500">Attempts</p>
                        <p className="text-lg font-bold text-gray-900">{quiz.attempts}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                        <p className="text-xs text-gray-500">Avg. Score</p>
                        <p className={`text-lg font-bold ${scoreColor}`}>{quiz.avgScore}%</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                        <p className="text-xs text-gray-500">Pass Rate</p>
                        <p className="text-lg font-bold text-gray-900">
                          {Math.round((quiz.avgScore / quiz.passScore) * 100)}%
                        </p>
                      </div>
                    </div>

                    {quiz.lastAttempt && (
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                        <Clock className="w-3 h-3" />
                        Last attempt: {new Date(quiz.lastAttempt).toLocaleDateString()}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/tutor/quiz-builder?quizId=${quiz.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Quiz
                      </Link>
                      <Link
                        to={`/tutor/quiz-results?quizId=${quiz.id}`}
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <BarChart3 className="w-4 h-4" />
                        View Results
                      </Link>
                      {quiz.isPublished && (
                        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Preview
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Tip Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800">
              <strong>💡 Tip:</strong> Full quiz builder with question editor is available in the{' '}
              <a 
                href="https://techbridge-tutor.vercel.app/tutor/quizzes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-700 font-semibold hover:underline"
              >
                elearning platform
              </a>
              . This panel shows quiz analytics and management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorQuizzes;
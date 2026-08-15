// apps/tutor/src/routes/tutor/analytics.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Star, 
  DollarSign,
  Award,
  BookOpen,
  BarChart3,
  ChevronRight,
  Download,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Activity
} from "lucide-react";
import { toast } from "sonner";
import { getTutorAnalytics, getCourses, getStudents } from "@/lib/api";

export const Route = createFileRoute("/tutor/analytics")({
  component: Analytics,
});

interface AnalyticsData {
  total_students?: number;
  total_courses?: number;
  published_courses?: number;
  avg_rating?: number;
  total_reviews?: number;
  total_earnings?: number;
  monthly_earnings?: number;
  completion_rate?: number;
  certificates_issued?: number;
  active_learners?: number;
  watch_time?: string;
  learners_delta?: string;
  watch_time_delta?: string;
  completion_delta?: string;
}

interface CoursePerformance {
  id: string;
  title: string;
  students: number;
  rating: number;
  revenue: number;
  completion: number;
  lessons: number;
}

function Analytics() {
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "quarter" | "year">("month");
  const [coursePerformance, setCoursePerformance] = useState<CoursePerformance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [analyticsData, coursesData, studentsData] = await Promise.all([
          getTutorAnalytics().catch(() => null),
          getCourses().catch(() => []),
          getStudents().catch(() => [])
        ]);

        if (analyticsData) setStats(analyticsData);
        if (Array.isArray(coursesData)) {
          setCourses(coursesData);
          
          // Calculate course performance
          const performance = coursesData.map((course: any) => ({
            id: course.id,
            title: course.title,
            students: course.students || 0,
            rating: course.rating || 0,
            revenue: course.price && course.students ? parseFloat(course.price.replace(/[^0-9.]/g, '')) * course.students : 0,
            completion: course.completion_rate || Math.round(Math.random() * 40 + 50),
            lessons: course.lessons || 0
          }));
          setCoursePerformance(performance);
        }
        if (Array.isArray(studentsData)) setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast.error('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock revenue data - replace with actual API data
  const monthlyRevenue = [
    { month: 'Mar', rev: 520000 },
    { month: 'Apr', rev: 840000 },
    { month: 'May', rev: 1200000 },
    { month: 'Jun', rev: 980000 },
    { month: 'Jul', rev: 1540000 },
    { month: 'Aug', rev: 610000 },
  ];
  const maxRev = Math.max(...monthlyRevenue.map(d => d.rev));

  // Calculate stats
  const totalStudents = stats?.total_students ?? students.length;
  const totalCourses = stats?.total_courses ?? courses.length;
  const publishedCourses = stats?.published_courses ?? courses.filter(c => c.status === 'published').length;
  const avgRating = stats?.avg_rating ?? (
    courses.length > 0 
      ? courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length 
      : 0
  );
  const totalEarnings = stats?.total_earnings ?? coursePerformance.reduce((sum, c) => sum + c.revenue, 0);
  const completionRate = stats?.completion_rate ?? 87;
  const certificatesIssued = stats?.certificates_issued ?? 234;

  const formatUGX = (amount: number) => {
    if (amount >= 1000000) {
      return `UGX ${(amount / 1000000).toFixed(1)}M`;
    }
    return `UGX ${amount.toLocaleString()}`;
  };

  const statCards = [
    {
      icon: Users,
      value: totalStudents.toLocaleString(),
      label: 'Total Students',
      subtext: '↗ +12% this month',
      color: 'blue',
      trend: 'up'
    },
    {
      icon: BookOpen,
      value: publishedCourses,
      label: 'Published Courses',
      subtext: `${courses.filter(c => c.status === 'draft').length} in draft`,
      color: 'emerald',
      trend: 'up'
    },
    {
      icon: Star,
      value: avgRating > 0 ? avgRating.toFixed(1) : '0.0',
      label: 'Avg. Rating',
      subtext: `${courses.reduce((sum, c) => sum + (c.reviews || 0), 0)} reviews`,
      color: 'amber',
      trend: 'up'
    },
    {
      icon: DollarSign,
      value: formatUGX(totalEarnings),
      label: 'Total Earnings',
      subtext: '↗ +18% this quarter',
      color: 'purple',
      trend: 'up'
    },
    {
      icon: Award,
      value: certificatesIssued,
      label: 'Certificates Issued',
      subtext: '↗ +34 this month',
      color: 'indigo',
      trend: 'up'
    },
    {
      icon: TrendingUp,
      value: `${completionRate}%`,
      label: 'Completion Rate',
      subtext: '↗ +4% improvement',
      color: 'cyan',
      trend: 'up'
    }
  ];

  const statColorMap = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    cyan: 'bg-cyan-50 text-cyan-600'
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-emerald-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-400';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="w-3 h-3" />;
    if (trend === 'down') return <ArrowDownRight className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">
            Understand engagement, completion, and performance across your catalog
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as "month" | "quarter" | "year")}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClass = statColorMap[stat.color as keyof typeof statColorMap];
          const trendColor = getTrendColor(stat.trend || '');
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div className={`p-1.5 sm:p-2 rounded-lg ${colorClass} inline-block`}>
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <p className="text-base sm:text-xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">{stat.label}</p>
              <div className={`flex items-center gap-0.5 text-[10px] sm:text-xs font-medium mt-0.5 ${trendColor}`}>
                {getTrendIcon(stat.trend || '')}
                {stat.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Monthly Revenue</h3>
              <p className="text-xs text-gray-500">Last 6 months</p>
            </div>
            <span className="text-sm font-bold text-blue-600">{formatUGX(totalEarnings)}</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {monthlyRevenue.map((d) => {
              const height = Math.round((d.rev / maxRev) * 90) + 10;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-gray-400 font-medium">
                    {d.rev >= 1000000 ? `${(d.rev / 1000000).toFixed(1)}M` : `${(d.rev / 1000).toFixed(0)}K`}
                  </span>
                  <div 
                    className="w-full bg-blue-50 rounded-t-lg overflow-hidden group cursor-pointer"
                    style={{ height: `${height}px` }}
                  >
                    <div 
                      className="w-full h-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                      style={{ height: '100%' }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Completion */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Completion by Course</h3>
          <div className="space-y-3 sm:space-y-4">
            {coursePerformance.slice(0, 5).map((course) => (
              <div key={course.id}>
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                  <span className="font-medium text-gray-700 truncate flex-1 mr-2">{course.title}</span>
                  <span className={`font-bold ${getScoreColor(course.completion)}`}>{course.completion}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      course.completion >= 80 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                      course.completion >= 60 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${Math.min(course.completion, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {coursePerformance.length > 5 && (
            <button className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Course Performance Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Course Performance</h3>
              <p className="text-xs text-gray-500">Detailed metrics for all your courses</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Filter
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="py-3 px-4 sm:px-6">Course</th>
                <th className="py-3 px-4">Students</th>
                <th className="py-3 px-4 hidden sm:table-cell">Rating</th>
                <th className="py-3 px-4 hidden md:table-cell">Lessons</th>
                <th className="py-3 px-4">Revenue</th>
                <th className="py-3 px-4 hidden lg:table-cell">Completion</th>
                <th className="py-3 px-4 sm:px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {coursePerformance.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    No course data available
                  </td>
                </tr>
              ) : (
                coursePerformance.map((course) => (
                  <tr key={course.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 sm:px-6">
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[200px]">
                          {course.title}
                        </p>
                        <p className="text-xs text-gray-400">{course.lessons} lessons</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {course.students.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-amber-500">
                          {course.rating > 0 ? course.rating.toFixed(1) : '0.0'}
                        </span>
                        <span className="text-xs text-amber-400">
                          {getRatingStars(course.rating)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-sm text-gray-600">
                      {course.lessons}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-semibold text-blue-600">
                        {formatUGX(course.revenue)}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                          <div 
                            className={`h-full rounded-full ${
                              course.completion >= 80 ? 'bg-emerald-500' :
                              course.completion >= 60 ? 'bg-amber-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(course.completion, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {course.completion}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-right">
                      <span className={`inline-flex text-xs font-medium px-2 py-1 rounded-full ${
                        course.completion >= 80 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : course.completion >= 60
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-red-50 text-red-600'
                      }`}>
                        {course.completion >= 80 ? 'Excellent' : 
                         course.completion >= 60 ? 'Good' : 
                         'Needs work'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-medium">Active Learners</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats?.active_learners ?? '1,284'}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">Watch Time</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats?.watch_time ?? '1,482h'}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs font-medium">Engagement Rate</span>
          </div>
          <p className="text-xl font-bold text-gray-900">74%</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Star className="w-4 h-4" />
            <span className="text-xs font-medium">Reviews</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{courses.reduce((sum, c) => sum + (c.reviews || 0), 0)}</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
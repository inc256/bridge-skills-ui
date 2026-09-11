// apps/tutor/src/routes/tutor/dashboard.tsx
import { useState, useEffect } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  UserCheck,
  ArrowUpRight,
  GraduationCap,
  ChevronRight,
  Star,
  DollarSign,
  Plus,
  FileText,
  ClipboardCheck,
  BarChart3,
  MessageSquare,
} from 'lucide-react';
import { 
  getCourses, 
  getStudents, 
  getTutorAnalytics,
  getProfile,
} from '../lib/api';
import { CourseThumb } from '@/components/course-thumb';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createFileRoute('/tutor/dashboard')({
  component: TutorDashboard,
});

function TutorDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [profileData, analyticsData, coursesData, studentsData] = await Promise.all([
          getProfile(),
          getTutorAnalytics(),
          getCourses(),
          getStudents(),
        ]);

        if (profileData) setProfile(profileData);
        if (analyticsData) setAnalytics(analyticsData);
        if (Array.isArray(coursesData)) setCourses(coursesData);
        if (Array.isArray(studentsData)) setStudents(studentsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserName = () => {
    if (profile?.first_name) return profile.first_name;
    if (profile?.full_name) return profile.full_name;
    if (profile?.username) return profile.username;
    return 'Instructor';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-5xl space-y-6 px-4">
            <div className="space-y-2"><Skeleton className="h-8 w-64" /><Skeleton className="h-4 w-80" /></div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-28 w-full" />)}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
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
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalStudents = analytics?.total_students ?? students.length;
  const publishedCourses = analytics?.published_courses ?? courses.filter(c => c.status === 'published').length;
  const totalCourses = analytics?.total_courses ?? courses.length;
  
  const avgRating = analytics?.avg_rating ?? (
    courses.length > 0 
      ? courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length 
      : 0
  );
  
  const totalEarnings = analytics?.total_earnings ?? courses.reduce((sum, c) => {
    if (c.price && c.students) {
      let price = 0;
      if (typeof c.price === 'string') {
        const cleanPrice = c.price.replace(/[^0-9.]/g, '');
        price = parseFloat(cleanPrice) || 0;
      } else if (typeof c.price === 'number') {
        price = c.price;
      }
      return sum + (price * (c.students || 0));
    }
    return sum;
  }, 0);

  const formatUGX = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const statCards = [
    {
      icon: BookOpen,
      value: totalCourses,
      label: 'Total Courses',
      subtext: `${publishedCourses} published`,
      color: 'blue'
    },
    {
      icon: Users,
      value: totalStudents.toLocaleString(),
      label: 'Total Students',
      subtext: 'all time',
      color: 'emerald'
    },
    {
      icon: Star,
      value: avgRating > 0 ? avgRating.toFixed(1) : '0.0',
      label: 'Avg Rating',
      subtext: '/ 5.0',
      color: 'amber'
    },
    {
      icon: TrendingUp,
      value: formatUGX(totalEarnings),
      label: 'Total Earnings',
      subtext: 'all courses',
      color: 'purple'
    }
  ];

  const recentStudents = students.slice(0, 5);
  const myCourses = courses.slice(0, 5);

  const quickActions = [
    {
      icon: Plus,
      label: 'Create Course',
      description: 'Build a new course',
      path: '/tutor/builder',
      color: 'blue'
    },
    {
      icon: FileText,
      label: 'Manage Lessons',
      description: 'Add video/text lessons',
      path: '/tutor/courses',
      color: 'indigo'
    },
    {
      icon: ClipboardCheck,
      label: 'Create Quiz',
      description: 'Test student knowledge',
      path: '/tutor/quizzes',
      color: 'purple'
    },
    {
      icon: Users,
      label: 'View Students',
      description: 'See who enrolled',
      path: '/tutor/students',
      color: 'emerald'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      description: 'Track performance',
      path: '/tutor/analytics',
      color: 'orange'
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      description: 'Communicate with students',
      path: '/tutor/messages',
      color: 'pink'
    }
  ];

  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100',
    pink: 'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100'
  };

  const statColorMap = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      published: 'text-emerald-600 bg-emerald-50',
      draft: 'text-amber-600 bg-amber-50',
      archived: 'text-gray-600 bg-gray-50'
    };
    return colors[status] || colors.draft;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header - Without Blue Background */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-UG', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {getGreeting()}, {getUserName()}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here's your instructor workspace overview
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const colorClass = statColorMap[stat.color as keyof typeof statColorMap];
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl ${colorClass}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.subtext}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* My Courses Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">My Courses</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Your published and draft courses</p>
            </div>
            <Link 
              to="/tutor/courses" 
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Manage all <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-400">No courses yet.</p>
              <Link
                to="/tutor/builder"
                className="inline-block mt-3 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Create First Course
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                  onClick={() => navigate({ to: '/tutor/courses' })}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                    <CourseThumb
                      variant={course.image || 'code'}
                      color={course.color}
                      thumbnail={course.thumbnail}
                      title={course.title}
                      className="h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{course.title || 'Untitled'}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-400">
                      <span>{course.students || 0} students</span>
                      <span className="hidden xs:inline">·</span>
                      <span>{course.total_lessons || course.lessons || 0} lessons</span>
                      <span className="hidden xs:inline">·</span>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                        <span>{Number(course.rating || course.avg_rating || 0).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(course.status)}`}>
                      {course.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {course.pricing === 'free' ? 'FREE' : formatUGX(Number(course.price || 0))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage your courses and students</p>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
              {quickActions.length} actions
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const colorClass = colorMap[action.color as keyof typeof colorMap];
              return (
                <Link
                  key={action.label}
                  to={action.path}
                  className={`group rounded-xl border-2 ${colorClass} p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2.5 rounded-xl bg-white/60 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {action.label}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Students & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Students */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Students</h3>
              <Link to="/tutor/students" className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>
            {recentStudents.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <UserCheck className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-400">No students enrolled yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {student.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'S'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{student.name || 'Student'}</p>
                      <p className="text-xs text-gray-400 truncate">{student.course || 'No course'}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(student.progress || 0, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{student.progress || 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-medium">Total Students</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-medium">Courses</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalCourses}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl">
                <div className="flex items-center gap-2 text-purple-600 mb-1">
                  <Star className="w-4 h-4" />
                  <span className="text-xs font-medium">Avg Rating</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{avgRating > 0 ? avgRating.toFixed(1) : '0.0'}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs font-medium">Earnings</span>
                </div>
                <p className="text-base sm:text-2xl font-bold text-gray-900 break-words">
                  {formatUGX(totalEarnings)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorDashboard;
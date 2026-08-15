// apps/student/src/routes/student.dashboard.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, ArrowRight, Flame, Calendar, ChevronRight, Target, BookOpen, Sparkles, TrendingUp, Clock, Eye, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { getCourses, getMeStats, getMyEnrollments, getMyCertificates, getProfile } from "@/lib/api";

export const Route = createFileRoute("/student/dashboard")({
  component: Dashboard,
});

interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  category: string;
  level: string;
  students: number;
  rating: number;
  progress?: number;
  status?: string;
}

interface Stats {
  streak: number;
  weekly_hours: number;
  weekly_goal_hours: number;
  courses_completed: number;
  level: number;
  xp: number;
  total_students?: number;
  total_courses?: number;
}

interface Enrollment {
  id: string;
  course: Course | null;
  status: string;
  progress: number;
  enrolledAt: string;
}

interface Certificate {
  id: string;
  title: string;
  issued: string;
  credentialId: string;
  instructor: string;
}

function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [stats, setStats] = useState<Stats>({
    streak: 0,
    weekly_hours: 0,
    weekly_goal_hours: 10,
    courses_completed: 0,
    level: 0,
    xp: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        try {
          const profile = await getProfile();
          setUser(profile);
        } catch (e) {
          console.error('Profile fetch failed:', e);
        }

        let courseList: Course[] = [];
        try {
          const data = await getCourses();
          courseList = Array.isArray(data) ? data : [];
          setCourses(courseList);
        } catch (e) {
          console.error('Courses fetch failed:', e);
          setCourses([]);
        }

        try {
          const statsData = await getMeStats();
          if (statsData) {
            setStats({
              streak: statsData.streak_days || 0,
              weekly_hours: statsData.weekly_hours || 0,
              weekly_goal_hours: statsData.weekly_goal_hours || 10,
              courses_completed: statsData.courses_completed || 0,
              level: statsData.level || 0,
              xp: statsData.xp || 0,
              total_students: statsData.total_students || 0,
              total_courses: statsData.total_courses || 0
            });
          }
        } catch (e) {
          console.error('Stats fetch failed:', e);
        }

        try {
          const enrollmentData = await getMyEnrollments();
          setEnrollments(Array.isArray(enrollmentData) ? enrollmentData : []);
        } catch (e) {
          console.error('Enrollments fetch failed:', e);
          setEnrollments([]);
        }

        try {
          const certData = await getMyCertificates();
          setCertificates(Array.isArray(certData) ? certData : []);
        } catch (e) {
          console.error('Certificates fetch failed:', e);
          setCertificates([]);
        }

      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const today = new Date();
  const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][today.getDay()];
  const monthName = today.toLocaleString('default', { month: 'long' });
  const h = today.getHours();
  const greeting = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const name = user?.first_name || user?.username || 'Student';

  const inProgress = enrollments.filter((e: Enrollment) => 
    e.status === 'active' || ((e.progress || 0) > 0 && (e.progress || 0) < 100)
  );

  const recommended = courses.filter((c: Course) => (c.progress ?? 0) <= 0);

  const weeklyGoal = stats.weekly_goal_hours || 10;
  const weeklyProgress = Math.min(100, Math.round(((stats.weekly_hours || 0) / weeklyGoal) * 100));

  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs sm:text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Header - Mobile Optimized */}
      <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate">
            {dayName}, {today.getDate()} {monthName}
          </p>
          <h2 className="mt-0.5 sm:mt-1 text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
            {greeting}, {name}! 👋
          </h2>
          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs md:text-sm text-gray-500">
            {stats.streak > 0 
              ? `🔥 ${stats.streak}-day learning streak!`
              : 'Start your learning journey today!'}
          </p>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {[
          { icon: Flame, label: "Streak", value: stats.streak || 0, unit: "days", color: "orange" },
          { icon: TrendingUp, label: "Level", value: stats.level || 0, unit: "lvl", color: "blue" },
          { icon: BookOpen, label: "In progress", value: inProgress.length, unit: "courses", color: "emerald" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 hover:shadow-md transition-all active:scale-[0.98] touch-manipulation">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl inline-flex ${
                s.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                s.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                'bg-emerald-50 text-emerald-600'
              }`}>
                <s.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{s.value}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500">{s.unit}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 truncate">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-4 sm:gap-6">
        {/* Continue Learning Section */}
        <section className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Continue learning</h3>
            <Link to="/student/my-learning" className="text-[10px] sm:text-xs font-medium text-blue-600 hover:text-blue-700 active:text-blue-800">
              View all →
            </Link>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {inProgress.length === 0 ? (
              <div className="text-center py-6 sm:py-8 md:py-10">
                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-xs sm:text-sm text-gray-500">No courses in progress</p>
                <Link to="/student/explore" className="inline-block mt-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Browse courses →
                </Link>
              </div>
            ) : (
              inProgress.slice(0, 3).map((e: Enrollment) => {
                const course = e.course;
                const progress = e.progress || 0;
                if (!course) return null;
                return (
                  <Link
                    key={course.id}
                    to="/student/study/$slug"
                    params={{ slug: course.slug }}
                    className="group flex flex-col xs:flex-row gap-2 sm:gap-3 rounded-xl border border-gray-200 p-2.5 sm:p-3 hover:border-blue-300 hover:bg-blue-50/50 active:bg-blue-100/50 transition-all active:scale-[0.98] touch-manipulation"
                  >
                    <div className="w-full xs:w-20 sm:w-24 md:w-28 h-20 xs:h-16 sm:h-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                      {course.title?.[0]?.toUpperCase() || 'C'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-medium text-gray-500">
                        <span className="truncate max-w-[80px] xs:max-w-full">{course.category || 'Course'}</span>
                        <span className="hidden xs:inline">·</span>
                        <span className="truncate hidden xs:inline">{course.instructor || 'Instructor'}</span>
                      </div>
                      <div className="mt-0.5 sm:mt-1 truncate text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </div>
                      <div className="mt-1.5 sm:mt-2 flex items-center gap-2">
                        <div className="h-1 sm:h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                          <div className="h-full rounded-full bg-blue-600 transition-all duration-1000" style={{ width: `${Math.min(progress, 100)}%` }} />
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-900 min-w-[32px] text-right">{Math.round(progress)}%</span>
                      </div>
                    </div>
                    <ChevronRight className="hidden xs:block h-4 w-4 shrink-0 self-center text-gray-400 group-hover:text-blue-600" />
                  </Link>
                );
              })
            )}
          </div>
        </section>

        <section className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Weekly Goal */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Weekly goal</div>
              <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
            </div>
            <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stats.weekly_hours || 0}</span>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">/ {weeklyGoal} hrs</span>
            </div>
            <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-blue-600 transition-all duration-1000" style={{ width: `${weeklyProgress}%` }} />
            </div>
            <div className="mt-3 sm:mt-4 grid grid-cols-7 gap-1 sm:gap-1.5">
              {DAYS.map((d, i) => (
                <div key={i} className="text-center">
                  <div className={`mx-auto h-6 sm:h-7 md:h-8 w-full rounded-md transition-colors ${
                    i < Math.min(3, Math.ceil((stats.weekly_hours || 0) / 2)) ? 'bg-blue-600' : 
                    i === 3 ? 'bg-blue-400' : 'bg-gray-200'
                  }`} />
                  <div className="mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] text-gray-500">{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Certificates</div>
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
            </div>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500">
              {certificates.length > 0 ? (
                <>You have earned <span className="font-semibold text-gray-900">{certificates.length}</span> certificate{certificates.length > 1 ? 's' : ''}</>
              ) : (
                'Complete a course to earn your first certificate'
              )}
            </p>
            <Link to="/student/certificates" className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-blue-600 hover:text-blue-700 active:text-blue-800">
              View certificates <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Link>
          </div>
        </section>
      </div>

      {/* Upcoming Deadlines & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <section className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
              Upcoming deadlines
            </h3>
          </div>
          <ul className="mt-2 sm:mt-3 divide-y divide-gray-100">
            {inProgress.length === 0 ? (
              <li className="py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-500">No active courses</li>
            ) : (
              inProgress.slice(0, 3).map((e: Enrollment) => {
                const course = e.course;
                const progress = e.progress || 0;
                if (!course) return null;
                return (
                  <li key={course.id} className="flex items-center justify-between gap-2 sm:gap-4 py-2.5 sm:py-3">
                    <div className="min-w-0">
                      <div className="truncate text-xs sm:text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">In progress</div>
                    </div>
                    <span className="shrink-0 rounded-full bg-gray-100 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-gray-700">
                      {Math.round(progress)}%
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </section>

        <section className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
              Recent activity
            </h3>
          </div>
          <ul className="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
            {courses.length === 0 ? (
              <li className="text-center text-xs sm:text-sm text-gray-500 py-3 sm:py-4">No recent activity</li>
            ) : (
              courses.slice(0, 4).map((course: Course) => (
                <li key={course.id} className="flex gap-2 sm:gap-3">
                  <div className="mt-0.5 h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-blue-500" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm text-gray-900 truncate">{course.title}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 truncate">{course.category || 'Course'} · {course.level || 'All levels'}</div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

      {/* Recommended Courses */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Recommended for you</h3>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5">Based on your progress and interests</p>
          </div>
          <Link to="/student/explore" className="text-[10px] sm:text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700 active:text-blue-800 whitespace-nowrap">
            Explore all →
          </Link>
        </div>
        <div className="mt-3 sm:mt-4 md:mt-5 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {recommended.length === 0 ? (
            <div className="col-span-full text-center py-6 sm:py-8 md:py-10 text-gray-500">
              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-xs sm:text-sm">No recommendations available</p>
            </div>
          ) : (
            recommended.slice(0, 3).map((c: Course) => (
              <div key={c.id} className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-all active:scale-[0.98] touch-manipulation group">
                <div className="h-32 xs:h-36 sm:h-40 md:h-44 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold">
                  {c.title?.[0]?.toUpperCase() || 'C'}
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{c.title}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">{c.category || 'Course'} · {c.level || 'All levels'}</p>
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <span className="text-[10px] sm:text-xs font-medium text-gray-500">{c.students || 0} students</span>
                    <Link 
                      to="/student/courses/$slug" 
                      params={{ slug: c.slug }}
                      className="text-[10px] sm:text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700 group-hover:underline active:text-blue-800"
                    >
                      View course →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
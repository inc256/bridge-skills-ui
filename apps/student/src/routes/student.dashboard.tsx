// apps/student/src/routes/student.dashboard.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { 
  Award, ArrowRight, Flame, Calendar, ChevronRight, Target, 
  BookOpen, Sparkles, TrendingUp, Clock, Eye, Play, 
  GraduationCap, Trophy, Zap, BarChart3, Users, Star,
  Bell, MessageSquare, Settings, HelpCircle, Search
} from "lucide-react";
import { useState, useEffect } from "react";
import { getCourses, getMeStats, getMyEnrollments, getMyCertificates, getProfile } from "@/lib/api";
import type { Course } from "@/lib/api";
import { resolveCourseThumbnail } from "@/components/course-thumb";

export const Route = createFileRoute("/student/dashboard")({
  component: Dashboard,
});

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

function getLocalStudyProgress(courseSlug: string) {
  if (typeof window === "undefined") return 0;
  try {
    const state = JSON.parse(window.localStorage.getItem(`bridge-study-${courseSlug}`) ?? "{}") as { progress?: number };
    const progress = Number(state.progress ?? 0);
    return Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : 0;
  } catch {
    return 0;
  }
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

  const inProgress = enrollments
    .map((enrollment: Enrollment) => ({
      ...enrollment,
      progress: Math.max(enrollment.progress || 0, getLocalStudyProgress(enrollment.course?.slug ?? "")),
    }))
    .filter((e: Enrollment) =>
      e.status === 'active' || ((e.progress || 0) > 0 && (e.progress || 0) < 100)
    );

  const recommended = courses.filter((c: Course) => (c.progress ?? 0) <= 0);
  const completedCourses = enrollments.filter((e: Enrollment) => (e.progress || 0) >= 100);

  const weeklyGoal = stats.weekly_goal_hours || 10;
  const weeklyProgress = Math.min(100, Math.round(((stats.weekly_hours || 0) / weeklyGoal) * 100));

  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-xs sm:text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm sm:text-base text-blue-100 font-medium">
                  {dayName}, {today.getDate()} {monthName}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1">
                  {greeting}, {name}!
                </h2>
                <p className="mt-1 text-blue-100 text-sm sm:text-base">
                  {stats.streak > 0 
                    ? `🔥 ${stats.streak}-day learning streak! Keep it up!`
                    : 'Start your learning journey today!'}
                </p>
              </div>
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.xp || 0}</p>
                  <p className="text-xs text-blue-100">XP</p>
                </div>
                <div className="h-10 w-px bg-white/20"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.level || 0}</p>
                  <p className="text-xs text-blue-100">Level</p>
                </div>
                <div className="h-10 w-px bg-white/20"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.courses_completed || 0}</p>
                  <p className="text-xs text-blue-100">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              icon: Flame, 
              label: "Learning Streak", 
              value: stats.streak || 0, 
              unit: "days", 
              color: "orange",
              bgColor: "bg-orange-50",
              textColor: "text-orange-600",
              iconColor: "text-orange-500"
            },
            { 
              icon: Trophy, 
              label: "Courses Completed", 
              value: stats.courses_completed || 0, 
              unit: "courses", 
              color: "amber",
              bgColor: "bg-amber-50",
              textColor: "text-amber-600",
              iconColor: "text-amber-500"
            },
            { 
              icon: BookOpen, 
              label: "In Progress", 
              value: inProgress.length, 
              unit: "courses", 
              color: "blue",
              bgColor: "bg-blue-50",
              textColor: "text-blue-600",
              iconColor: "text-blue-500"
            },
            { 
              icon: Award, 
              label: "Certificates", 
              value: certificates.length, 
              unit: "earned", 
              color: "emerald",
              bgColor: "bg-emerald-50",
              textColor: "text-emerald-600",
              iconColor: "text-emerald-500"
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{stat.unit}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Column - Continue Learning (spans 2 cols) */}
          <div className="xl:col-span-2 space-y-6">
            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Continue Learning</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Pick up where you left off</p>
                </div>
                <Link 
                  to="/student/my-learning" 
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              
              <div className="space-y-3">
                {inProgress.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No courses in progress</p>
                    <Link to="/student/explore" className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
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
                        className="group flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all active:scale-[0.98]"
                      >
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden shrink-0">
                          {resolveCourseThumbnail(course.thumbnail) ? (
                            <img src={resolveCourseThumbnail(course.thumbnail) ?? undefined} alt={course.title} className="h-full w-full object-cover" />
                          ) : (
                            course.title?.[0]?.toUpperCase() || 'C'
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="truncate">{course.category || 'Course'}</span>
                            <span>·</span>
                            <span className="truncate">{course.instructor || 'Instructor'}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {course.title}
                          </h4>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-gray-200">
                              <div className="h-full rounded-full bg-blue-600 transition-all duration-1000" style={{ width: `${Math.min(progress, 100)}%` }} />
                            </div>
                            <span className="text-xs font-semibold text-gray-900 min-w-[32px] text-right">
                              {Math.round(progress)}%
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </Link>
                    );
                  })
                )}
              </div>
            </section>

            {/* Recommended Courses */}
            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Recommended for You</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Based on your learning preferences</p>
                </div>
                <Link to="/student/explore" className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Explore all
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommended.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No recommendations available</p>
                  </div>
                ) : (
                  recommended.slice(0, 3).map((c: Course) => (
                    <Link
                      key={c.id}
                      to="/student/course/$slug"
                      params={{ slug: c.slug }}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 active:scale-[0.98]"
                    >
                      <div className="h-36 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                        {resolveCourseThumbnail(c.thumbnail) ? (
                          <img src={resolveCourseThumbnail(c.thumbnail) ?? undefined} alt={c.title} className="h-full w-full object-cover" />
                        ) : (
                          c.title?.[0]?.toUpperCase() || 'C'
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 truncate text-sm">{c.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{c.category || 'Course'} · {c.level || 'All levels'}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs font-medium text-gray-500">{c.students || 0} students</span>
                          <span className="text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors flex items-center gap-1">
                            View course
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* Quick Actions */}
            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Search, label: "Explore", to: "/student/explore", color: "blue" },
                  { icon: BookOpen, label: "My Learning", to: "/student/my-learning", color: "purple" },
                  { icon: Award, label: "Certificates", to: "/student/certificates", color: "amber" },
                  { icon: Settings, label: "Settings", to: "/student/settings", color: "gray" },
                ].map((action) => (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-gray-50 transition-colors active:scale-[0.98]"
                  >
                    <action.icon className={`h-5 w-5 text-${action.color}-500`} />
                    <span className="text-xs font-medium text-gray-700">{action.label}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Certificates Preview */}
            <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Recent Certificates</h3>
                <Award className="h-4 w-4 text-amber-500" />
              </div>
              {certificates.length > 0 ? (
                <div className="space-y-2">
                  {certificates.slice(0, 2).map((cert) => (
                    <div key={cert.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Award className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{cert.title}</p>
                        <p className="text-xs text-gray-500 truncate">{cert.instructor}</p>
                      </div>
                    </div>
                  ))}
                  {certificates.length > 2 && (
                    <Link to="/student/certificates" className="block text-center text-xs text-blue-600 hover:text-blue-700 font-medium pt-1">
                      View all {certificates.length} certificates →
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No certificates yet</p>
                  <p className="text-xs text-gray-400 mt-1">Complete a course to earn one!</p>
                </div>
              )}
            </section>

            {/* Help & Support */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">Need help?</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Check our FAQs or contact support</p>
                  <Link to="/student" className="inline-block mt-2 text-xs font-medium text-blue-600 hover:text-blue-700">
                    Get support →
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
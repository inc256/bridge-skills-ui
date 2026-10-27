import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  FileText,
  MessageSquare,
  Plus,
  Star,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { getCourses, getProfile, getStudents, getTutorAnalytics } from "../lib/api";
import { CourseThumb } from "@/components/course-thumb";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardProfile = {
  first_name?: string | null;
  full_name?: string | null;
  username?: string | null;
};

type DashboardAnalytics = {
  total_students?: number;
  published_courses?: number;
  total_courses?: number;
  avg_rating?: number;
  total_earnings?: number;
};

type DashboardCourse = {
  id: string | number;
  title?: string;
  image?: string;
  color?: string;
  thumbnail?: string | null;
  students?: number;
  total_lessons?: number;
  lessons?: number;
  rating?: number;
  avg_rating?: number;
  status?: string;
  pricing?: string;
  price?: string | number;
};

type DashboardStudent = {
  id?: string | number;
  name?: string;
  course?: string;
  progress?: number;
};

export const Route = createFileRoute("/tutor/dashboard")({
  component: TutorDashboard,
});

export function TutorDashboard() {
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [courses, setCourses] = useState<DashboardCourse[]>([]);
  const [students, setStudents] = useState<DashboardStudent[]>([]);
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
      } catch (fetchError) {
        console.error("Error fetching dashboard data:", fetchError);
        setError("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getUserName = () => {
    if (profile?.first_name) return profile.first_name;
    if (profile?.full_name) return profile.full_name;
    if (profile?.username) return profile.username;
    return "Instructor";
  };

  if (isLoading) {
    return (
      <div
        className="mx-auto w-full max-w-[1440px] space-y-6 px-1 pb-8 sm:px-2"
        aria-label="Loading tutor dashboard"
      >
        <div className="card-surface space-y-3 p-6">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-8 w-64 max-w-full" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-36 w-full rounded-xl" />
          ))}
        </div>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.8fr)]">
          <Skeleton className="h-80 w-full rounded-xl" />
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-lg items-center justify-center px-4">
        <div className="card-surface w-full p-7 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-destructive/10 text-destructive">
            <ArrowUpRight className="h-6 w-6 rotate-45" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-lg font-semibold text-foreground">Dashboard unavailable</h1>
          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const totalStudents = analytics?.total_students ?? students.length;
  const publishedCourses =
    analytics?.published_courses ??
    courses.filter((course) => course.status === "published").length;
  const totalCourses = analytics?.total_courses ?? courses.length;
  const avgRating =
    analytics?.avg_rating ??
    (courses.length > 0
      ? courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length
      : 0);
  const totalEarnings =
    analytics?.total_earnings ??
    courses.reduce((sum, course) => {
      if (course.price && course.students) {
        const price =
          typeof course.price === "string"
            ? parseFloat(course.price.replace(/[^0-9.]/g, "")) || 0
            : typeof course.price === "number"
              ? course.price
              : 0;
        return sum + price * course.students;
      }
      return sum;
    }, 0);

  const formatGHS = (amount: number) => `GHS ${Number(amount || 0).toLocaleString()}`;
  const formatCoursePrice = (course: DashboardCourse) => {
    if (course.pricing === "free" || !course.price || course.price === "Free") return "Free";
    return typeof course.price === "number" ? formatGHS(course.price) : course.price;
  };
  const statCards = [
    {
      icon: BookOpen,
      value: totalCourses,
      label: "Total courses",
      subtext: `${publishedCourses} published`,
      color: "green",
    },
    {
      icon: Users,
      value: totalStudents.toLocaleString(),
      label: "Total students",
      subtext: "Across your courses",
      color: "blue",
    },
    {
      icon: Star,
      value: avgRating > 0 ? avgRating.toFixed(1) : "0.0",
      label: "Average rating",
      subtext: "Out of 5.0",
      color: "amber",
    },
    {
      icon: TrendingUp,
      value: formatGHS(totalEarnings),
      label: "Total earnings",
      subtext: "Across all courses",
      color: "purple",
    },
  ];
  const recentStudents = students.slice(0, 6);
  const myCourses = courses.slice(0, 5);
  const quickActions = [
    {
      icon: Plus,
      label: "Create course",
      description: "Build a new learning experience",
      path: "/tutor/builder",
    },
    {
      icon: FileText,
      label: "Manage courses",
      description: "Edit lessons and course content",
      path: "/tutor/courses",
    },
    {
      icon: ClipboardCheck,
      label: "Create quiz",
      description: "Check learner understanding",
      path: "/tutor/quizzes",
    },
    {
      icon: Users,
      label: "View students",
      description: "Follow learner progress",
      path: "/tutor/students",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      description: "Review teaching performance",
      path: "/tutor/analytics",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      description: "Connect with your learners",
      path: "/tutor/messages",
    },
  ];
  const accentMap = {
    green: "bg-primary/10 text-primary",
    blue: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    purple: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  };

  const getStatusColor = (status: string | undefined) => {
    const colors: Record<string, string> = {
      published: "text-emerald-700 bg-emerald-500/10 dark:text-emerald-300",
      draft: "text-amber-700 bg-amber-500/10 dark:text-amber-300",
      archived: "text-muted-foreground bg-secondary",
    };
    return colors[status] || colors.draft;
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 px-1 pb-8 sm:space-y-8 sm:px-2">
      <header className="flex flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:p-7">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Tutor workspace
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={new Date().toISOString()}>
              {new Date().toLocaleDateString("en-UG", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </time>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {getGreeting()}, {getUserName()}
          </h1>
          <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">
            Your teaching at a glance. Manage your courses, support learners, and track your impact.
          </p>
        </div>
        <Link
          to="/tutor/builder"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Create a course
        </Link>
      </header>

      <section
        aria-label="Teaching overview"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const colorClass = accentMap[stat.color as keyof typeof accentMap];
          return (
            <article key={stat.label} className="card-surface min-w-0 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${colorClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
              </div>
              <p className="mt-4 truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{stat.subtext}</p>
            </article>
          );
        })}
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.8fr)]">
        <section className="card-surface min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-base font-semibold text-foreground">Your courses</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Keep your learning content up to date.
              </p>
            </div>
            <Link
              to="/tutor/courses"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-primary transition hover:bg-primary/5"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-10 text-center sm:py-14">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                Your first course starts here
              </h3>
              <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                Create a course to start building your teaching library and reaching learners.
              </p>
              <Link
                to="/tutor/builder"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" /> Create your first course
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {myCourses.map((course) => (
                <Link
                  key={course.id}
                  to="/tutor/courses"
                  className="group flex min-w-0 items-center gap-3 px-4 py-3.5 transition hover:bg-secondary/50 sm:gap-4 sm:px-5"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border/70 sm:h-14 sm:w-14">
                    <CourseThumb
                      variant={course.image || "code"}
                      color={course.color}
                      thumbnail={course.thumbnail}
                      title={course.title}
                      className="h-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground transition group-hover:text-primary">
                      {course.title || "Untitled"}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
                      <span>{course.students || 0} students</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.total_lessons || course.lessons || 0} lessons</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {Number(course.rating || course.avg_rating || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusColor(course.status)}`}
                    >
                      {course.status === "published"
                        ? "Published"
                        : course.status === "archived"
                          ? "Archived"
                          : "Draft"}
                    </span>
                    <p className="text-[11px] font-medium text-muted-foreground">
                      {formatCoursePrice(course)}
                    </p>
                  </div>
                  <ChevronRight className="hidden h-4 w-4 shrink-0 text-muted-foreground/50 transition group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="card-surface p-4 sm:p-5">
          <div className="mb-3">
            <h2 className="text-base font-semibold text-foreground">Teaching tools</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Get to your next task quickly.</p>
          </div>
          <div className="space-y-1">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.path}
                  className="group flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-secondary/70"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{action.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{action.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <section className="card-surface overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">Recent learners</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              See how your students are progressing.
            </p>
          </div>
          <Link
            to="/tutor/students"
            className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-primary transition hover:bg-primary/5"
          >
            View students <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {recentStudents.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-9 text-center">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
              <UserCheck className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">
              Your learner community is growing
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Enrolled students will appear here as they join your courses.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border sm:grid sm:grid-cols-2 sm:divide-y-0">
            {recentStudents.map((student, index) => {
              const progress = Math.min(100, Math.max(0, Number(student.progress) || 0));
              const initials =
                student.name
                  ?.split(" ")
                  .filter(Boolean)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "S";
              return (
                <div
                  key={student.id ?? index}
                  className="flex min-w-0 items-center gap-3 px-4 py-3.5 sm:border-b sm:border-border sm:px-5"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {student.name || "Student"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {student.course || "Enrolled learner"}
                    </p>
                  </div>
                  <div className="w-24 shrink-0">
                    <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>Progress</span>
                      <span className="font-medium text-foreground">{progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-[width]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default TutorDashboard;

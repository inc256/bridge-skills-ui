import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, ArrowRight, Bookmark, Trophy, Calendar, ChevronRight, Target, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { CourseCard } from "@/components/course-card";
import { CourseThumb } from "@/components/course-thumb";
import { getBlogPosts, getCourses, getMe, getMeStats, getMyCertificates, getMyEnrollments, getNotifications, getLocalWishlistCourses } from "@/lib/api";
import type { BlogPost, Course } from "@/lib/api";
import { getLocalStudyProgress } from "@/lib/study-progress";

export const Route = createFileRoute("/student/")({
  component: StudentDashboard,
});

function StudentDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<any>({ streak_days: 0, courses_completed: 0, xp: 0, level: 0, weekly_hours: 0, weekly_goal_hours: 10 });
  const [certificates, setCertificates] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    void (async () => {
      const [courseList, statsData, certificateList, notificationList, blogList, enrollmentList, userData] = await Promise.all([
        getCourses(),
        getMeStats(),
        getMyCertificates().catch((error) => {
          console.error("Failed to load dashboard certificates:", error);
          return [];
        }),
        getNotifications(),
        getBlogPosts(),
        getMyEnrollments(),
        getMe(),
      ]);
      setCourses(courseList);
      setStats(statsData ?? { streak_days: 0, courses_completed: 0, xp: 0, level: 0, weekly_hours: 0, weekly_goal_hours: 10 });
      setCertificates(certificateList);
      setNotifications(notificationList);
      setBlogPosts(blogList);
      setEnrollments(enrollmentList);
      setUser(userData);
    })();
  }, []);

  const enrollmentProgress = new Map<string, number>();
  for (const enrollment of enrollments) {
    const slug = enrollment.course?.slug;
    if (!slug) continue;
    const progress = enrollment.status === "completed"
      ? 100
      : Math.min(100, Math.max(0, Number(enrollment.progress) || 0));
    enrollmentProgress.set(slug, Math.max(enrollmentProgress.get(slug) ?? 0, progress));
  }
  const coursesWithProgress = courses.map((course) => ({
    ...course,
    progress: Math.max(
      Number(course.progress) || 0,
      enrollmentProgress.get(course.slug) ?? 0,
      getLocalStudyProgress(course.slug),
    ),
  }));
  const inProgress = coursesWithProgress.filter((c) => (c.progress ?? 0) > 0 && (c.progress ?? 0) < 100);
  const inProgressCount = enrollments.filter((enrollment) => {
    const progress = Math.max(
      enrollment.status === "completed" ? 100 : enrollment.progress ?? 0,
      getLocalStudyProgress(enrollment.course?.slug ?? ""),
    );
    return enrollment.status === "active" || (progress > 0 && progress < 100);
  }).length;
  const completedCount = enrollments.filter((enrollment) =>
    enrollment.status === "completed"
    || Math.max(enrollment.progress ?? 0, getLocalStudyProgress(enrollment.course?.slug ?? "")) >= 100
  ).length;
  const savedCoursesCount = getLocalWishlistCourses().length;
  const recommended = coursesWithProgress.filter((c) => (c.progress ?? 0) <= 0);
  const showRecommendedFirst = enrollments.length === 0;
  const weeklyGoal = stats.weekly_goal_hours ?? 10;
  const weeklyProgress = Number(stats.weekly_hours ?? 0) > 0 ? Math.min(100, Math.round(((stats.weekly_hours ?? 0) / weeklyGoal) * 100)) : 0;

  const recommendedSection = (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-[20px] font-semibold tracking-tight">Recommended for you</h3>
          <p className="mt-1 text-sm text-muted-foreground">Based on your current learning progress.</p>
        </div>
        <Link to="/student/explore" className="text-sm font-medium text-primary hover:underline">Explore all →</Link>
      </div>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.slice(0, 2).map((c) => <CourseCard key={c.id} course={c} />)}
      </div>
    </section>
  );

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h2 className="mt-1 text-[28px] font-semibold tracking-tight">Welcome back, {user?.first_name ?? user?.full_name?.split(" ")[0] ?? "Learner"}.</h2>
          <p className="mt-1 text-sm text-muted-foreground">You are on a {stats.streak_days}-day streak. Resume your next lesson now.</p>
        </div>
        <Link to="/student/my-learning" className="inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Continue learning <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <section aria-label="Learning overview" className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {[
          { icon: Trophy, label: "Courses completed", value: completedCount, unit: "courses", to: "/student/my-learning", accent: "text-amber-600", bg: "bg-amber-500/10" },
          { icon: BookOpen, label: "In progress", value: inProgressCount, unit: "courses", to: "/student/my-learning", accent: "text-primary", bg: "bg-primary/10" },
          { icon: Award, label: "Claimed certificates", value: certificates.length, unit: "certificates", to: "/student/certificates", accent: "text-emerald-600", bg: "bg-emerald-500/10" },
          { icon: Bookmark, label: "Saved", value: savedCoursesCount, unit: "courses", to: "/student/bookmarks", accent: "text-sky-600", bg: "bg-sky-500/10" },
        ].map((s) => (
          <Link key={s.label} to={s.to} className="card-surface group p-4 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft sm:p-5">
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.bg} ${s.accent}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-[28px] font-semibold tracking-tight">
              {s.value}<span className="ml-1 text-sm font-normal text-muted-foreground">{s.unit}</span>
            </div>
            <div className="text-xs font-medium text-muted-foreground">{s.label}</div>
          </Link>
        ))}
      </section>

      {showRecommendedFirst && recommendedSection}

      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        <section className="card-surface p-5 sm:p-6">
          <SectionHead title="Continue learning" href="/student/my-learning" hrefLabel="View all" />
          <div className="mt-4 space-y-3">
            {inProgress.slice(0, 3).map((c) => (
              <Link
                key={c.id}
                to="/student/study/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col gap-3 rounded-2xl border border-border p-3 hover:border-primary/40 hover:bg-secondary/40 transition-colors sm:flex-row sm:gap-4"
              >
                <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-32">
                  <CourseThumb variant={c.image} color={c.color} thumbnail={c.thumbnail} title={c.title} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground">
                    <span>{c.category}</span>
                    <span className="hidden sm:inline">·</span>
                    <span>{c.instructor}</span>
                  </div>
                  <div className="mt-1 truncate text-sm font-semibold group-hover:text-primary transition-colors">{c.title}</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-foreground">{c.progress}%</span>
                  </div>
                </div>
                <ChevronRight className="hidden h-4 w-4 shrink-0 self-center text-muted-foreground group-hover:text-primary sm:block" />
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="card-surface p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">Weekly goal</div>
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[32px] font-semibold tracking-tight">{stats.weekly_hours ?? 0}</span>
              <span className="text-sm text-muted-foreground">/ {weeklyGoal} hrs</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary animate-progress" style={{ width: `${weeklyProgress}%` }} />
            </div>
            <div className="mt-6 grid grid-cols-7 gap-1.5">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="text-center">
                  <div className={`mx-auto h-8 w-full rounded-md ${i < 3 ? "bg-primary" : i === 3 ? "bg-primary/60" : "bg-secondary"}`} />
                  <div className="mt-1.5 text-[10px] text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">Certificates</div>
              <Award className="h-4 w-4 text-success" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">You have earned <span className="font-semibold text-foreground">{certificates.length} certificates</span>. Keep progressing to unlock your next one.</p>
            <Link to="/student/certificates" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View certificates <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-surface p-5 sm:p-6">
          <SectionHead title="Upcoming deadlines" icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
          <ul className="mt-4 divide-y divide-border">
            {enrollments.slice(0, 3).map((item, index) => (
              <li key={item.id ?? index} className="flex items-center justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{item.course?.title ?? item.course ?? "Enrollment"}</div>
                  <div className="text-xs text-muted-foreground">{item.status ?? "active"}</div>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground/80">
                  {item.progress ?? 0}%
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="card-surface p-5 sm:p-6">
          <SectionHead title="Recent activity" />
          <ul className="mt-4 space-y-4">
            {notifications.slice(0, 4).map((notification, index) => (
              <li key={notification.id ?? index} className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm">{notification.title ?? notification.message ?? notification.body ?? "Activity updated"}</div>
                  <div className="text-xs text-muted-foreground">{notification.course?.title ?? notification.created_at ?? notification.type ?? "Recently updated"}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {!showRecommendedFirst && recommendedSection}
    </div>
  );
}

function SectionHead({ title, href, hrefLabel, icon }: { title: string; href?: string; hrefLabel?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-[16px] font-semibold">{title}{icon}</h3>
      {href && <Link to={href} className="text-xs font-medium text-primary hover:underline">{hrefLabel} →</Link>}
    </div>
  );
}

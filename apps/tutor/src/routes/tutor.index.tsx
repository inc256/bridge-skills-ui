import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, BookOpen, Star, DollarSign, ArrowUpRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getCourses, getStudents, getTutorAnalytics, getNotifications } from "@/lib/api";

export const Route = createFileRoute("/tutor/")({
  component: TutorDashboard,
});

function TutorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    void (async () => {
      const [analytics, courseList, studentList, notificationList] = await Promise.all([
        getTutorAnalytics(),
        getCourses(),
        getStudents(),
        getNotifications(),
      ]);
      setStats(analytics);
      setCourses(courseList);
      setStudents(studentList);
      setNotifications(notificationList);
    })();
  }, []);

  const statItems = [
    { i: Users, l: "Enrolled students", v: (stats?.enrolled_students ?? students.length).toLocaleString(), d: stats?.enrollment_change ? `${stats.enrollment_change > 0 ? "+" : ""}${stats.enrollment_change}%` : "Live" },
    { i: BookOpen, l: "Published courses", v: (stats?.published_courses ?? courses.length).toLocaleString(), d: `${Math.max(0, courses.length - 1)} active` },
    { i: Star, l: "Avg. rating", v: Number(stats?.avg_rating ?? (courses.reduce((sum, course) => sum + (course.rating ?? 0), 0) / Math.max(courses.length, 1))).toFixed(1), d: `${students.length} learners` },
    { i: DollarSign, l: "Revenue (mo)", v: stats?.monthly_revenue ? `GHS ${Number(stats.monthly_revenue).toLocaleString()}` : "Live", d: stats?.monthly_revenue ? "Updated" : "Pending" },
  ];

  const chartData = Array.isArray(stats?.enrollment_series) && stats.enrollment_series.length > 0
    ? stats.enrollment_series
    : Array.from({ length: 8 }, (_, index) => Math.max(20, students.length + index * 8));
  const chartMax = Math.max(...chartData);
  const chartPoints = chartData.map((value: number, index: number) => `${(index / (chartData.length - 1)) * 100},${100 - (value / chartMax) * 100}`).join(" ");
  const chartArea = `0,100 ${chartPoints} 100,100`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Instructor overview</p>
          <h2 className="mt-1 text-[28px] font-semibold tracking-tight">Good afternoon, Priya.</h2>
        </div>
        <Link to="/tutor/builder" className="inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> New course
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statItems.map((s) => (
          <div key={s.l} className="card-surface p-5">
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><s.i className="h-5 w-5" /></div>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-success"><ArrowUpRight className="h-3 w-3" />{s.d}</span>
            </div>
            <div className="mt-4 text-[28px] font-semibold tracking-tight">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-semibold">Student enrollments</h3>
              <p className="text-xs text-muted-foreground">Live data from the backend</p>
            </div>
            <select className="rounded-[10px] border border-border bg-background px-3 py-1.5 text-xs">
              <option>All courses</option>
            </select>
          </div>
          <div className="mt-6">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-56 w-full">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1F6E5C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1F6E5C" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon fill="url(#g1)" points={chartArea} />
              <polyline fill="none" stroke="#1F6E5C" strokeWidth="0.6" points={chartPoints} vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              {chartData.map((value: number, index: number) => <span key={`${value}-${index}`}>W{index + 1}</span>)}
            </div>
          </div>
        </div>

        <div className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Latest updates</h3>
          <ul className="mt-4 space-y-4">
            {notifications.slice(0, 3).map((item, index) => (
              <li key={item.id ?? index} className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {(item.title || item.message || "U").slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{item.title ?? item.message ?? "Update"}</div>
                  <div className="truncate text-xs text-muted-foreground">{item.created_at ?? item.type ?? "Recently received"}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-surface p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold">Recent students</h3>
            <Link to="/tutor/students" className="text-xs font-medium text-primary hover:underline">View all →</Link>
          </div>
          <table className="mt-4 w-full">
            <thead>
              <tr className="border-b border-border text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="pb-2">Student</th><th className="pb-2">Course</th><th className="pb-2 text-right">Progress</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((s) => (
                <tr key={s.id} className="border-b border-border/60 last:border-0 text-sm">
                  <td className="py-3">
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.email}</div>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground">{s.course}</td>
                  <td className="py-3">
                    <div className="ml-auto flex w-24 items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${s.progress ?? 0}%` }} />
                      </div>
                      <span className="text-xs font-medium">{s.progress ?? 0}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card-surface p-6">
          <h3 className="text-[16px] font-semibold">Your courses</h3>
          <ul className="mt-4 space-y-4">
            {courses.slice(0, 4).map((c) => (
              <li key={c.id} className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 rounded-xl" style={{ background: c.color }} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{(c.students ?? 0).toLocaleString()} students · {c.rating ?? 0}★</div>
                </div>
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">Published</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

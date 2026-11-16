// apps/student/src/routes/student.dashboard.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Clock3,
  MoreVertical,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { CourseThumb } from "@/components/course-thumb";
import { certificates as mockCertificates, courses as mockCourses } from "@/lib/mock-data";
import type { Course } from "@/lib/mock-data";

export const Route = createFileRoute("/student/dashboard")({
  component: Dashboard,
});

interface Stats {
  xp: number;
}

interface Enrollment {
  id: string;
  course: Course;
  status: string;
  progress: number;
  lastActive: string;
  timeLeft: string;
}

type Certificate = (typeof mockCertificates)[number];
type DashboardTab = "in-progress" | "completed" | "saved";

interface DashboardCourse {
  course: Course;
  progress: number;
  badge: string;
  action: string;
  actionDetail: string;
  destination: "study" | "course";
}

const MOCK_STATS: Stats = {
  xp: 23,
};

const MOCK_ENROLLMENTS: Enrollment[] = [
  { id: "mock-networking", course: mockCourses[0], status: "active", progress: 95, lastActive: "Today", timeLeft: "4 hrs 20 mins" },
  { id: "mock-design", course: mockCourses[5], status: "active", progress: 65, lastActive: "3 days ago", timeLeft: "11 hrs 2 mins" },
  { id: "mock-cloud", course: mockCourses[4], status: "completed", progress: 100, lastActive: "Last week", timeLeft: "Completed" },
];

const MOCK_SAVED_COURSES = [mockCourses[1], mockCourses[3]];
const MOCK_RECOMMENDED_COURSES = [...mockCourses]
  .filter((course) => !MOCK_ENROLLMENTS.some((enrollment) => enrollment.course.slug === course.slug))
  .sort((a, b) => b.rating - a.rating || b.students - a.students)
  .slice(0, 3);
const MOCK_STUDENT_NAME = "Mubarak";

function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("in-progress");
  const enrollments = MOCK_ENROLLMENTS;
  const certificates: Certificate[] = mockCertificates;
  const stats = MOCK_STATS;

  const today = new Date();
  const h = today.getHours();
  const greeting = h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
  const name = MOCK_STUDENT_NAME;

  const inProgress = enrollments.filter((enrollment) => enrollment.status === "active");
  const completed = enrollments.filter((enrollment) => enrollment.status === "completed");
  const tabs: { id: DashboardTab; desktopLabel: string; mobileLabel: string; count: number }[] = [
    { id: "in-progress", desktopLabel: "Courses in Progress", mobileLabel: "In Progress", count: inProgress.length },
    { id: "completed", desktopLabel: "Completed Courses", mobileLabel: "Completed", count: completed.length },
    { id: "saved", desktopLabel: "Saved Courses", mobileLabel: "Saved", count: MOCK_SAVED_COURSES.length },
  ];

  const displayedCourses: DashboardCourse[] = activeTab === "in-progress"
    ? inProgress.map((enrollment) => ({
        course: enrollment.course,
        progress: enrollment.progress,
        badge: `LAST ACTIVE: ${enrollment.lastActive}`,
        action: "Continue Learning",
        actionDetail: `${enrollment.timeLeft} Left`,
        destination: "study",
      }))
    : activeTab === "completed"
      ? completed.map((enrollment) => ({
          course: enrollment.course,
          progress: enrollment.progress,
          badge: "COMPLETED",
          action: "Review Course",
          actionDetail: enrollment.course.duration,
          destination: "study",
        }))
      : MOCK_SAVED_COURSES.map((course) => ({
          course,
          progress: course.progress ?? 0,
          badge: "SAVED COURSE",
          action: "View Course",
          actionDetail: `${course.duration} total`,
          destination: "course",
        }));

  const statsCards = [
    { label: "Courses Completed", value: completed.length, detail: `of ${enrollments.length}`, icon: CheckCircle2 },
    { label: "In Progress", value: inProgress.length, detail: "", icon: Clock3 },
    { label: "Certificates", value: certificates.length, detail: `of ${mockCourses.length}`, icon: BookMarked },
    { label: "Total XP", value: stats.xp, detail: "", icon: TrendingUp },
  ];

  return (
    <div className="student-dashboard">
      <div className="student-dashboard-content">
        <section className="student-welcome">
          <h2>{greeting}, {name}</h2>
          <p>Continue your academic journey from where you left off!</p>
        </section>

        <section className="student-stats-grid" aria-label="Learning overview">
          {statsCards.map(({ label, value, detail, icon: Icon }) => (
            <article key={label} className="student-stat-card">
              <div className="student-stat-top">
                <p className="student-stat-number">
                  {value}
                  {detail && <span>{detail}</span>}
                </p>
                <Icon className="student-stat-icon" aria-hidden="true" />
              </div>
              <p className="student-stat-label">{label}</p>
            </article>
          ))}
        </section>

        <div className="student-dashboard-tabs" role="tablist" aria-label="Your courses">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`student-tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="student-course-panel"
              className={`student-dashboard-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="student-tab-desktop">{tab.desktopLabel} ({tab.count})</span>
              <span className="student-tab-mobile">{tab.mobileLabel} ({tab.count})</span>
            </button>
          ))}
        </div>

        <section
          id="student-course-panel"
          className="student-course-list"
          role="tabpanel"
          aria-labelledby={`student-tab-${activeTab}`}
        >
          {displayedCourses.length === 0 ? (
            <div className="student-empty-courses">
              <BookOpen aria-hidden="true" />
              <p>No courses in this section yet.</p>
              <Link to="/student/explore">Explore courses <ArrowRight aria-hidden="true" /></Link>
            </div>
          ) : displayedCourses.map((item) => {
            const { course } = item;
            const continueLink = item.destination === "study"
              ? (
                  <Link
                    to="/student/study/$slug"
                    params={{ slug: course.slug }}
                    className="student-continue-button"
                  >
                    {item.action}
                    <span>{item.actionDetail}</span>
                  </Link>
                )
              : (
                  <Link
                    to="/student/course/$slug"
                    params={{ slug: course.slug }}
                    className="student-continue-button"
                  >
                    {item.action}
                    <span>{item.actionDetail}</span>
                  </Link>
                );

            return (
              <article key={course.id} className="student-course-card">
                <div className="student-course-top-row">
                  <div className="student-course-image">
                    <CourseThumb variant={course.image} color={course.color} title={course.title} className="h-full w-full" />
                  </div>
                  <div className="student-course-info">
                    <h3>{course.title}</h3>
                    <p>By {course.instructor}</p>
                    <span className="student-course-badge">{item.badge}</span>
                  </div>
                </div>
                <div className="student-course-progress">
                  <div
                    className="student-progress-track"
                    role="progressbar"
                    aria-label={`${course.title} progress`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(item.progress)}
                  >
                    <div className="student-progress-fill" style={{ width: `${Math.min(item.progress, 100)}%` }} />
                  </div>
                  <span>{Math.round(item.progress)}%</span>
                </div>
                <div className="student-course-actions">
                  {continueLink}
                  <Link
                    to="/student/course/$slug"
                    params={{ slug: course.slug }}
                    className="student-course-more"
                    aria-label={`View ${course.title} details`}
                  >
                    <MoreVertical aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-10 space-y-4" aria-labelledby="student-recommended-courses-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 id="student-recommended-courses-heading" className="text-xl font-semibold text-foreground">
                Recommended courses
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Highly rated courses you haven’t enrolled in yet.
              </p>
            </div>
            <Link
              to="/student/explore"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
            >
              Explore all courses <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_RECOMMENDED_COURSES.map((course) => (
              <Link
                key={course.id}
                to="/student/course/$slug"
                params={{ slug: course.slug }}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="relative h-36 overflow-hidden bg-secondary">
                  <CourseThumb
                    variant={course.image}
                    color={course.color}
                    title={course.title}
                    className="h-full w-full transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                    Recommended
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="line-clamp-2 min-h-10 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {course.title}
                    </h4>
                    <span className="shrink-0 rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold text-primary">
                      {course.level}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">By {course.instructor}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs font-medium text-muted-foreground">{course.price}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      View course <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
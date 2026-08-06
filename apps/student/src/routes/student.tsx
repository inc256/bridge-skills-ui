import { createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Compass, BookOpen, Award, Bookmark, ClipboardList, User, Settings, PlayCircle, GraduationCap,
} from "lucide-react";
import { useEffect } from "react";
import { PortalShell } from "@/components/portal-shell";
import { StudentAuthPage } from "@/components/student-auth-page";
import { hasSelectedCourse } from "@/lib/student-onboarding";

export const Route = createFileRoute("/student")({
  head: () => ({ meta: [{ title: "Dashboard — TechBridge" }, { name: "description", content: "Your learning dashboard on TechBridge." }] }),
  component: StudentLayout,
});

function StudentLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const normalizedPath = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const isAuthPage = normalizedPath === "/student";

  useEffect(() => {
    if (isAuthPage) {
      return;
    }

    const allowedWithoutCourse = ["/student/study", "/student/explore", "/student/course"];
    const canContinue = allowedWithoutCourse.some(
      (path) => normalizedPath === path || normalizedPath.startsWith(`${path}/`),
    );

    if (!hasSelectedCourse() && !canContinue) {
      void navigate({ to: "/student/study", replace: true });
    }
  }, [isAuthPage, navigate, normalizedPath]);

  if (isAuthPage) {
    return <StudentAuthPage />;
  }

  return (
    <PortalShell
      accent="student"
      title="Your Learning"
      user={{ name: "Ama Boateng", role: "Learner", initials: "AB" }}
      nav={[
        { label: "Dashboard", to: "/student/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Explore", to: "/student/explore", icon: <Compass className="h-4 w-4" /> },
        { label: "My Learning", to: "/student/my-learning", icon: <BookOpen className="h-4 w-4" />, badge: 4 },
        { label: "Study", to: "/student/study", icon: <PlayCircle className="h-4 w-4" /> },
        { label: "Certificates", to: "/student/certificates", icon: <Award className="h-4 w-4" /> },
        { label: "Bookmarks", to: "/student/bookmarks", icon: <Bookmark className="h-4 w-4" /> },
        { label: "Assignments", to: "/student/assignments", icon: <ClipboardList className="h-4 w-4" />, badge: 2 },
        { label: "Profile", to: "/student/profile", icon: <User className="h-4 w-4" /> },
        { label: "Settings", to: "/student/settings", icon: <Settings className="h-4 w-4" /> },
      ]}
    />
  );
}

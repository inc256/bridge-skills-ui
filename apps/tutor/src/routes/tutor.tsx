import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, PlusSquare, Users, ClipboardList, HelpCircle, BarChart3, MessageCircle, Award, Settings } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { TutorAuthPage } from "@/components/tutor-auth-page";

export const Route = createFileRoute("/tutor")({
  head: () => ({ meta: [{ title: "Tutor — TechBridge" }, { name: "description", content: "Tutor dashboard: manage your courses and students on TechBridge." }] }),
  component: TutorLayout,
});

function TutorLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const normalizedPath = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (normalizedPath === "/tutor") {
    return <TutorAuthPage />;
  }

  return (
    <PortalShell
      accent="tutor"
      title="Tutor workspace"
      user={{ name: "Priya Ramanathan", role: "Instructor · Verified", initials: "PR" }}
      nav={[
        { label: "Dashboard", to: "/tutor/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Courses", to: "/tutor/courses", icon: <BookOpen className="h-4 w-4" />, badge: 8 },
        { label: "Course Builder", to: "/tutor/builder", icon: <PlusSquare className="h-4 w-4" /> },
        { label: "Students", to: "/tutor/students", icon: <Users className="h-4 w-4" /> },
        { label: "Assignments", to: "/tutor/assignments", icon: <ClipboardList className="h-4 w-4" />, badge: 12 },
        { label: "Quizzes", to: "/tutor/quizzes", icon: <HelpCircle className="h-4 w-4" /> },
        { label: "Analytics", to: "/tutor/analytics", icon: <BarChart3 className="h-4 w-4" /> },
        { label: "Messages", to: "/tutor/messages", icon: <MessageCircle className="h-4 w-4" />, badge: 3 },
        { label: "Certificates", to: "/tutor/certificates", icon: <Award className="h-4 w-4" /> },
        { label: "Settings", to: "/tutor/settings", icon: <Settings className="h-4 w-4" /> },
      ]}
    />
  );
}

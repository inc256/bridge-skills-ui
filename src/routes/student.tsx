import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard, Compass, BookOpen, GraduationCap, Award, Bookmark, ClipboardList, User, Settings, PlayCircle,
} from "lucide-react";
import { PortalShell } from "@/components/portal-shell";

export const Route = createFileRoute("/student")({
  head: () => ({ meta: [{ title: "Dashboard — TechBridge" }, { name: "description", content: "Your learning dashboard on TechBridge." }] }),
  component: StudentLayout,
});

function StudentLayout() {
  return (
    <PortalShell
      accent="student"
      title="Your Learning"
      user={{ name: "Ama Boateng", role: "Learner", initials: "AB" }}
      nav={[
        { label: "Dashboard", to: "/student", icon: <LayoutDashboard className="h-4 w-4" /> },
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

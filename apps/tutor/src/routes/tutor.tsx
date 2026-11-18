// apps/tutor/src/routes/tutor.tsx
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  BookOpen, 
  PlusSquare, 
  Users, 
  Award, 
  Settings,
} from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { TutorAuthPage } from "@/components/tutor-auth-page";

const NAV_SECTIONS = [
  {
    label: "",
    items: [
      { label: "Dashboard", to: "/tutor/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    ],
  },
  {
    label: "",
    items: [
      { label: "Courses", to: "/tutor/courses", icon: <BookOpen className="h-4 w-4" />, dividerAfter: true },
      { label: "Course Builder", to: "/tutor/builder", icon: <PlusSquare className="h-4 w-4" /> },
    ],
  },
  {
    label: "",
    items: [
      { label: "Students", to: "/tutor/students", icon: <Users className="h-4 w-4" />, dividerAfter: true },
    ],
  },
  {
    label: "",
    items: [
      { label: "Certificates", to: "/tutor/certificates", icon: <Award className="h-4 w-4" /> },
      { label: "Settings", to: "/tutor/settings", icon: <Settings className="h-4 w-4" /> },
    ],
  },
];

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
      nav={NAV_SECTIONS.flatMap((section) => section.items)}
      navSections={NAV_SECTIONS}
    />
  );
}
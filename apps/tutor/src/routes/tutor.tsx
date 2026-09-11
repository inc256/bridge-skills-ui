// apps/tutor/src/routes/tutor.tsx
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  BookOpen, 
  PlusSquare, 
  Users, 
  ClipboardList, 
  HelpCircle, 
  BarChart3, 
  MessageCircle, 
  Award, 
  Settings,
  Sparkles,
  Gauge
} from "lucide-react";
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
      nav={[
        // Quick Access Section
        { 
          label: "Dashboard", 
          to: "/tutor/dashboard", 
          icon: <LayoutDashboard className="h-4 w-4" />,
          section: "quick-access"
        },
        
        // Courses Section
        { 
          label: "My Courses", 
          to: "/tutor/courses", 
          icon: <BookOpen className="h-4 w-4" />,
          section: "courses"
        },
        { 
          label: "Course Builder", 
          to: "/tutor/builder", 
          icon: <PlusSquare className="h-4 w-4" />,
          section: "courses"
        },
        
        // Students Section
        { 
          label: "Students", 
          to: "/tutor/students", 
          icon: <Users className="h-4 w-4" />,
          section: "students"
        },
        { 
          label: "Assignments", 
          to: "/tutor/assignments", 
          icon: <ClipboardList className="h-4 w-4" />,
          section: "students"
        },
        
        // Analytics Section
        { 
          label: "Quizzes", 
          to: "/tutor/quizzes", 
          icon: <HelpCircle className="h-4 w-4" />,
          section: "analytics"
        },
        // { 
        //   label: "Analytics", 
        //   to: "/tutor/analytics", 
        //   icon: <BarChart3 className="h-4 w-4" />,
        //   section: "analytics"
        // },
        
        // Communication Section
        // { 
        //   label: "Messages", 
        //   to: "/tutor/messages", 
        //   icon: <MessageCircle className="h-4 w-4" />,
        //   section: "communication"
        // },
        { 
          label: "Certificates", 
          to: "/tutor/certificates", 
          icon: <Award className="h-4 w-4" />,
          section: "communication"
        },
        
        // Settings Section
        { 
          label: "Settings", 
          to: "/tutor/settings", 
          icon: <Settings className="h-4 w-4" />,
          section: "settings"
        },
      ]}
    />
  );
}
// apps/student/src/routes/student.tsx
import { createFileRoute, useRouterState, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Award, 
  BarChart3, 
  Settings, 
  Bell,
  HelpCircle,
  MessageCircle,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  User,
  Users,
  FileText,
  Play,
  CheckCircle,
  Zap,
  Sparkles,
  Target,
  Compass,
  Library,
  BookMarked,
  FolderOpen,
  Globe,
  Server,
  Database,
  Cloud,
  Lock,
  UserCog,
} from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { StudentAuthPage } from "@/components/student-auth-page";
import { apiRequest, logout as apiLogout } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/student")({
  head: () => ({
    meta: [
      { title: "Student — TechBridge" },
      { name: "description", content: "Student dashboard for TechBridge Skills Hub." },
    ],
  }),
  component: StudentLayout,
});

const ALLOWED_ROLES = ["student", "user"];

function getInitials(name: string) {
  if (!name) return "ST";
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
  return initials || "ST";
}

// Navigation sections with categories - matching tutor style
const NAV_SECTIONS = [
  {
    label: "Quick Access",
    icon: <Zap className="w-3.5 h-3.5" />,
    items: [
      { label: "Dashboard", to: "/student/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    ]
  },
  {
    label: "Courses",
    icon: <BookOpen className="w-3.5 h-3.5" />,
    items: [
      { label: "Browse Courses", to: "/student/explore", icon: <Library className="h-4 w-4" /> },
      { label: "My Courses", to: "/student/my-learning", icon: <BookMarked className="h-4 w-4" /> },
      // { label: "My Assignments", to: "/student/assignments", icon: <FileText className="h-4 w-4" /> },
      // { label: "Learning Paths", to: "/student/paths", icon: <HelpCircle className="h-4 w-4" /> },
    ]
  },
  {
    label: "Progress",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    items: [
      // { label: "Certificates", to: "/student/certificates", icon: <Award className="h-4 w-4" /> },
      { label: "Bookmarks", to: "/student/bookmarks", icon: <Star className="h-4 w-4" /> },
    ]
  },
  {
    label: "Settings",
    icon: <Settings className="w-3.5 h-3.5" />,
    items: [
      // { label: "Settings", to: "/student/settings", icon: <Settings className="h-4 w-4" /> },
      { label: "Account", to: "/student/profile", icon: <User className="h-4 w-4" /> },
    ]
  }
];

// Flatten nav items for the PortalShell prop
const FLAT_NAV = NAV_SECTIONS.flatMap(section => section.items);

function StudentLayout() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const normalizedPath = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  
  const { user, isLoading } = useAuth();
  const [checking, setChecking] = useState(true);

  const onLoginPage = normalizedPath === "/student";

  useEffect(() => {
    // No need to check auth on the login page itself.
    if (onLoginPage) {
      setChecking(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        // If user is already loaded from auth context, use it
        if (user) {
          // Check if user has the correct role
          if (!ALLOWED_ROLES.includes(user.role ?? "")) {
            await router.navigate({ to: "/student" });
          }
          if (!cancelled) setChecking(false);
          return;
        }

        // Otherwise fetch from API
        try {
          const me = await apiRequest<any>('/auth/me/');
          if (cancelled) return;

          if (!me || !ALLOWED_ROLES.includes(me.role)) {
            await router.navigate({ to: "/student" });
            return;
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          if (!cancelled) {
            await router.navigate({ to: "/student" });
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (!cancelled) {
          await router.navigate({ to: "/student" });
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [onLoginPage, router, user]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    await router.navigate({ to: "/student" });
  };

  // If at /student, show login page
  if (onLoginPage) {
    return <StudentAuthPage />;
  }

  // Still verifying the session
  if (checking || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-emerald-600"></div>
          <span>Loading your dashboard…</span>
        </div>
      </div>
    );
  }

  // Auth check failed and redirect is in flight
  if (!user) {
    return null;
  }

  // Prepare user data for PortalShell
  const displayName = user.full_name || user.username || user.email || "Student";
  const studentUser = {
    name: displayName,
    role: "Student",
    initials: getInitials(displayName),
  };

  // For all other /student/* routes, show the PortalShell
  return (
    <PortalShell
      accent="student"
      title="Student Dashboard"
      user={studentUser}
      nav={FLAT_NAV}
      navSections={NAV_SECTIONS}
      onLogout={handleLogout}
    />
  );
}

export default StudentLayout;
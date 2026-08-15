import { createFileRoute, useRouterState, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  Layers,
  Award,
  BarChart3,
  LifeBuoy,
  FileEdit,
  Settings,
  Shield,
  History,
  Briefcase,
  Bell,
  HelpCircle,
  FileText,
  UserCheck,
  ClipboardList,
  Sparkles,
  Megaphone,
  TrendingUp,
  MessageCircle,
  Layout,
  Key,
  Activity,
  Cog,
  BookMarked,
  FolderOpen,
  Library,
  PenTool,
  Zap,
  Star,
  Globe,
  Server,
  Database,
  Cloud,
  Lock,
  UserCog,
} from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { AdminAuthPage } from "@/components/admin-auth-page";
import { apiRequest, logout as apiLogout } from "@/lib/api";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — TechBridge" },
      { name: "description", content: "Super admin dashboard for TechBridge Skills Hub." },
    ],
  }),
  component: AdminLayout,
});

const ALLOWED_ROLES = ["admin", "super_admin", "staff"];

function getInitials(name: string) {
  if (!name) return "AD";
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
  return initials || "AD";
}

// Navigation sections with categories
const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
      { label: "CMS", to: "/admin/cms", icon: <Layout className="h-4 w-4" /> },
    ]
  },
  {
    label: "Content",
    items: [
      { label: "Courses", to: "/admin/courses", icon: <BookOpen className="h-4 w-4" /> },
      { label: "Lessons", to: "/admin/lessons", icon: <FileText className="h-4 w-4" /> },
      { label: "Quizzes", to: "/admin/quizzes", icon: <HelpCircle className="h-4 w-4" /> },
      { label: "Categories", to: "/admin/categories", icon: <Layers className="h-4 w-4" /> },
      { label: "Blog", to: "/admin/blog", icon: <FileEdit className="h-4 w-4" /> },
    ]
  },
  {
    label: "Users",
    items: [
      { label: "Students", to: "/admin/students", icon: <GraduationCap className="h-4 w-4" /> },
      { label: "Tutors", to: "/admin/tutors", icon: <Users className="h-4 w-4" /> },
      { label: "Enrollments", to: "/admin/enrollments", icon: <UserCheck className="h-4 w-4" /> },
      { label: "Certificates", to: "/admin/certificates", icon: <Award className="h-4 w-4" /> },
    ]
  },
  {
    label: "Platform",
    items: [
      { label: "Jobs", to: "/admin/jobs", icon: <Briefcase className="h-4 w-4" /> },
      { label: "Notifications", to: "/admin/notifications", icon: <Bell className="h-4 w-4" /> },
      { label: "Support", to: "/admin/support", icon: <MessageCircle className="h-4 w-4" /> },
      { label: "Reports", to: "/admin/reports", icon: <BarChart3 className="h-4 w-4" /> },
    ]
  },
  {
    label: "System",
    items: [
      { label: "Roles", to: "/admin/roles", icon: <Shield className="h-4 w-4" /> },
      { label: "Audit Logs", to: "/admin/auditlogs", icon: <Activity className="h-4 w-4" /> },
      { label: "Settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
    ]
  }
];

// Flatten nav items for the PortalShell prop
const FLAT_NAV = NAV_SECTIONS.flatMap(section => section.items);

function AdminLayout() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const normalizedPath = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  const [user, setUser] = useState<{ name: string; role: string; initials: string } | null>(null);
  const [checking, setChecking] = useState(true);

  const onLoginPage = normalizedPath === "/admin";

  useEffect(() => {
    // No need to check auth on the login page itself.
    if (onLoginPage) {
      setChecking(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const me = await apiRequest<any>('/auth/me/');
        if (cancelled) return;

        if (!me || !ALLOWED_ROLES.includes(me.role)) {
          await router.navigate({ to: "/admin" });
          return;
        }

        const displayName = me.full_name || me.username || me.email || "Admin";
        setUser({
          name: displayName,
          role: me.role,
          initials: getInitials(displayName),
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        if (!cancelled) {
          await router.navigate({ to: "/admin" });
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [onLoginPage, router]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    // Clear user state and redirect to login
    setUser(null);
    await router.navigate({ to: "/admin" });
  };

  // If at /admin, show login page
  if (onLoginPage) {
    return <AdminAuthPage />;
  }

  // Still verifying the session — avoid rendering the shell with no user yet
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
          <span>Checking your session…</span>
        </div>
      </div>
    );
  }

  // Auth check failed and redirect is in flight
  if (!user) {
    return null;
  }

  // For all other /admin/* routes, show the PortalShell
  return (
    <PortalShell
      accent="admin"
      title="Platform administration"
      user={user}
      nav={FLAT_NAV}
      navSections={NAV_SECTIONS}
      onLogout={handleLogout}
    />
  );
}
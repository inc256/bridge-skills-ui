// apps/student/src/routes/student.tsx
import { createFileRoute, useRouterState, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BarChart3, FileText, LayoutDashboard, Library, MessageCircle, User } from "lucide-react";
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

const NAV_SECTIONS = [
  {
    label: "",
    items: [
      { label: "Dashboard", to: "/student/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
      { label: "Courses", to: "/student/explore", icon: <Library className="h-4 w-4" /> },
    ],
  },
  {
    label: "Courses",
    dividerBefore: true,
    items: [
      { label: "Forums", to: "/student/forum", icon: <MessageCircle className="h-4 w-4" /> },
      { label: "Assignments", to: "/student/assignments", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    label: "Profile",
    dividerBefore: true,
    items: [
      { label: "Stats & Activities", to: "/student/achievements", icon: <BarChart3 className="h-4 w-4" /> },
      { label: "Profile", to: "/student/profile", icon: <User className="h-4 w-4" /> },
    ],
  },
];

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
      nav={NAV_SECTIONS.flatMap((section) => section.items)}
      navSections={NAV_SECTIONS}
      onLogout={handleLogout}
    />
  );
}

export default StudentLayout;
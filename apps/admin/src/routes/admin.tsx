import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, GraduationCap, Users, BookOpen, Layers, Award, BarChart3, LifeBuoy, FileEdit, Settings, Shield, History } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { AdminAuthPage } from "@/components/admin-auth-page";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — TechBridge" }, { name: "description", content: "Super admin dashboard for TechBridge Skills Hub." }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const normalizedPath = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (normalizedPath === "/admin") {
    return <AdminAuthPage />;
  }

  return (
    <PortalShell
      accent="admin"
      title="Platform administration"
      user={{ name: "Elena Rossi", role: "Super Admin", initials: "ER" }}
      nav={[
        { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Students", to: "/admin/students", icon: <GraduationCap className="h-4 w-4" /> },
        { label: "Tutors", to: "/admin/tutors", icon: <Users className="h-4 w-4" />, badge: 3 },
        { label: "Courses", to: "/admin/courses", icon: <BookOpen className="h-4 w-4" />, badge: 5 },
        { label: "Categories", to: "/admin/categories", icon: <Layers className="h-4 w-4" /> },
        { label: "Certificates", to: "/admin/certificates", icon: <Award className="h-4 w-4" /> },
        { label: "Reports", to: "/admin/reports", icon: <BarChart3 className="h-4 w-4" /> },
        { label: "Support", to: "/admin/support", icon: <LifeBuoy className="h-4 w-4" />, badge: 7 },
        { label: "CMS", to: "/admin/cms", icon: <FileEdit className="h-4 w-4" /> },
        { label: "Roles", to: "/admin/roles", icon: <Shield className="h-4 w-4" /> },
        { label: "Audit Logs", to: "/admin/audit", icon: <History className="h-4 w-4" /> },
        { label: "Settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
      ]}
    />
  );
}

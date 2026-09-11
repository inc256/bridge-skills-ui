// apps/tutor/src/components/portal-shell.tsx
import { Link, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import { 
  ChevronDown, 
  Menu, 
  X, 
  LogOut, 
  User, 
  ChevronUp,
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
  Gauge,
  GraduationCap,
  Zap
} from "lucide-react";
import { useState, type ReactNode, useRef, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/lib/auth";

export type NavItem = { 
  label: string; 
  to: string; 
  icon: ReactNode; 
  badge?: string | number;
  section?: string;
};

export function PortalShell({
  nav,
  title,
  accent = "student",
}: {
  nav: NavItem[];
  title: string;
  accent?: "student" | "tutor" | "admin";
}) {
  const auth = useAuth();
  const router = useRouter();
  const { user, logout, isLoading } = auth || { user: null, logout: async () => {}, isLoading: false };
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isNavigating = useRouterState({ select: (s) => s.status === "pending" });
  const accentLabel = accent === "student" ? "Student" : accent === "tutor" ? "Tutor" : "Admin";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      void router.navigate({ to: "/tutor" });
    }
  }, [isLoading, router, user]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizePath = (path: string) => {
    if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
    return path;
  };

  const isActiveItem = (to: string) => {
    const currentPath = normalizePath(pathname);
    const targetPath = normalizePath(to);
    if (currentPath === targetPath) return true;

    const hasChildItems = nav.some((item) => {
      const navPath = normalizePath(item.to);
      return navPath !== targetPath && navPath.startsWith(`${targetPath}/`);
    });

    if (hasChildItems) return false;
    return currentPath.startsWith(`${targetPath}/`);
  };

  // Get user information with fallbacks
  const getUserInitials = () => {
    if (!user) return "U";
    if (user.full_name) {
      const names = user.full_name.split(" ");
      if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    if (user.first_name && user.last_name) {
      return (user.first_name[0] + user.last_name[0]).toUpperCase();
    }
    if (user.first_name) return user.first_name[0].toUpperCase();
    if (user.username) return user.username[0].toUpperCase();
    return "U";
  };

  const getUserName = () => {
    if (!user) return "User";
    // Try to get the most complete name
    if (user.full_name) return user.full_name;
    if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
    if (user.first_name) return user.first_name;
    if (user.username) return user.username;
    return "User";
  };

  const getUserDisplayName = () => {
    if (!user) return "User";
    // For display in header, use first name or username
    if (user.first_name) return user.first_name;
    if (user.username) return user.username;
    if (user.full_name) return user.full_name.split(" ")[0];
    return "User";
  };

  const getUserRole = () => {
    if (!user) return "Unknown";
    if (user.role === "admin" || user.role === "Administrator") return "Administrator";
    if (user.role === "instructor" || user.role === "Instructor") return "Instructor · Verified";
    if (user.role === "student" || user.role === "Student") return "Student";
    return user.role || "User";
  };

  const getUserEmail = () => {
    return user?.email || "";
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  // Define navigation sections
  const navSections = [
    {
      id: "quick-access",
      label: "Quick Access",
      icon: <Zap className="w-3.5 h-3.5" />,
      items: nav.filter(item => item.section === "quick-access")
    },
    {
      id: "courses",
      label: "Courses",
      icon: <BookOpen className="w-3.5 h-3.5" />,
      items: nav.filter(item => item.section === "courses")
    },
    {
      id: "students",
      label: "Students",
      icon: <Users className="w-3.5 h-3.5" />,
      items: nav.filter(item => item.section === "students")
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-3.5 h-3.5" />,
      items: nav.filter(item => item.section === "analytics")
    },
    {
      id: "communication",
      label: "Communication",
      icon: <MessageCircle className="w-3.5 h-3.5" />,
      items: nav.filter(item => item.section === "communication")
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-3.5 h-3.5" />,
      items: nav.filter(item => item.section === "settings")
    }
  ].filter(section => section.items.length > 0);

  const getSectionIcon = (sectionId: string) => {
    const icons: Record<string, ReactNode> = {
      "quick-access": <Zap className="w-3.5 h-3.5" />,
      "courses": <BookOpen className="w-3.5 h-3.5" />,
      "students": <Users className="w-3.5 h-3.5" />,
      "analytics": <BarChart3 className="w-3.5 h-3.5" />,
      "communication": <MessageCircle className="w-3.5 h-3.5" />,
      "settings": <Settings className="w-3.5 h-3.5" />
    };
    return icons[sectionId] || <Sparkles className="w-3.5 h-3.5" />;
  };

  // Render navigation items
  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const active = isActiveItem(item.to);
      return (
        <li key={item.to}>
          <Link
            to={item.to}
            onClick={() => setMobileNavOpen(false)}
            className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground/70 hover:bg-secondary hover:text-foreground hover:translate-x-0.5"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className={`grid h-5 w-5 place-items-center transition-transform duration-200 ${
                active ? "text-primary-foreground" : "text-muted-foreground group-hover:scale-110"
              }`}>
                {item.icon}
              </span>
              {item.label}
            </span>
            {item.badge != null && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                active ? "bg-white/20 text-white" : "bg-secondary text-foreground"
              }`}>
                {item.badge}
              </span>
            )}
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden animate-in fade-in duration-200"
            aria-label="Close navigation menu"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] border-r border-border bg-sidebar lg:hidden animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-primary/10 p-1.5">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-bold text-foreground">TechBridge</span>
                <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {accentLabel}
                </span>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="px-3 py-2">
              <div className="flex items-center gap-3 rounded-xl p-3 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  {getUserInitials()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">{getUserName()}</div>
                  <div className="truncate text-xs text-muted-foreground">{getUserRole()}</div>
                </div>
              </div>
            </div>

            <nav className="max-h-[calc(100vh-14rem)] overflow-y-auto px-3 pb-4">
              {navSections.map((section) => (
                <div key={section.id} className="mt-3 first:mt-0">
                  <div className="flex items-center gap-1.5 px-3 py-1.5">
                    <span className="text-muted-foreground/60">{section.icon}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                      {section.label}
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {renderNavItems(section.items)}
                  </ul>
                </div>
              ))}
            </nav>
            
            {/* Mobile User Section */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-border p-3 bg-sidebar">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-[270px] border-r border-border bg-sidebar lg:flex lg:flex-col">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-primary/10 p-2">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="text-sm font-bold text-foreground">TechBridge</span>
              <span className="block text-[10px] font-medium text-muted-foreground">
                {accentLabel} Portal
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {navSections.map((section) => (
            <div key={section.id} className="mt-4 first:mt-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5">
                <span className="text-muted-foreground/50">{section.icon}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {section.label}
                </span>
              </div>
              <ul className="space-y-0.5">
                {renderNavItems(section.items)}
              </ul>
            </div>
          ))}
        </nav>

        {/* Desktop User Section with Dropup Menu */}
        <div className="border-t border-border p-3 relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-3 rounded-xl p-2 hover:bg-secondary transition-all duration-200 group"
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all">
              {getUserInitials()}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="truncate text-sm font-medium text-foreground">{getUserName()}</div>
              <div className="truncate text-xs text-muted-foreground">{getUserRole()}</div>
            </div>
            <ChevronUp className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Dropup Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-1 bg-white dark:bg-gray-900 rounded-xl border border-border shadow-xl overflow-hidden z-50 animate-in slide-in-from-bottom-2 duration-200">
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground text-lg font-semibold">
                    {getUserInitials()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">{getUserName()}</div>
                    <div className="truncate text-xs text-muted-foreground">{getUserEmail()}</div>
                    <div className="truncate text-xs text-muted-foreground mt-0.5">{getUserRole()}</div>
                  </div>
                </div>
              </div>
              <div className="p-1">
                <Link
                  to="/tutor/settings"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  Profile Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-border bg-background/80 px-3 sm:px-6 backdrop-blur-md">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-card lg:hidden hover:bg-secondary transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
            <h1 className="truncate text-base sm:text-lg font-semibold text-foreground">{title}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden xs:inline-block text-xs sm:text-sm text-muted-foreground">
              {getUserDisplayName()}
            </span>
            <div className="h-5 w-px bg-border hidden xs:block" />
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] sm:text-xs font-semibold ring-2 ring-primary/5">
              {getUserInitials()}
            </div>
          </div>
        </header>
        <div className="relative">
          {isNavigating && (
            <div className="absolute inset-0 z-20 flex min-h-[calc(100vh-4rem)] items-start justify-center bg-background/80 pt-20 backdrop-blur-[2px]" role="status" aria-live="polite">
              <div className="sticky top-20 flex items-center gap-3 rounded-xl border border-border bg-card/95 px-4 py-3 text-sm font-medium text-foreground shadow-lg">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary" aria-hidden="true" />
                Loading page...
              </div>
            </div>
          )}
          <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-[1400px] px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
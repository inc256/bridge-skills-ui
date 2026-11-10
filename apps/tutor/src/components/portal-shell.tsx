// apps/tutor/src/components/portal-shell.tsx
import { Link, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import { 
  ChevronDown, 
  Menu, 
  X, 
  LogOut, 
  User, 
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
  Zap,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
} from "lucide-react";
import { useState, type ReactNode, useRef, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeSelect } from "@/components/theme-provider";
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
  const [desktopNavCollapsed, setDesktopNavCollapsed] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const headerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      void router.navigate({ to: "/tutor" });
    }
  }, [isLoading, router, user]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerMenuRef.current && !headerMenuRef.current.contains(event.target as Node)) {
        setHeaderMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHeaderMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
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
    setHeaderMenuOpen(false);
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
  const renderNavItems = (items: NavItem[], collapsed = false) => {
    return items.map((item) => {
      const active = isActiveItem(item.to);
      return (
        <li key={item.to}>
          <Link
            to={item.to}
            onClick={() => setMobileNavOpen(false)}
            aria-current={active ? "page" : undefined}
            aria-label={collapsed ? item.label : undefined}
            title={collapsed ? item.label : undefined}
            className="portal-sidebar-link"
          >
            {item.icon}
            <span className="portal-sidebar-link-label">{item.label}</span>
            {!collapsed && item.badge != null && <span className="ml-auto text-xs">{item.badge}</span>}
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
          <aside className="portal-sidebar portal-mobile-sidebar fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] border-r lg:hidden animate-in slide-in-from-left duration-300">
            <div className="portal-sidebar-brand-row">
              <button
                onClick={() => setMobileNavOpen(false)}
                className="portal-sidebar-close"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="portal-sidebar-profile">
              <div className="portal-sidebar-avatar-wrap">
                <div className="portal-sidebar-avatar">{getUserInitials()}</div>
                <Link to="/tutor/settings" onClick={() => setMobileNavOpen(false)} className="portal-sidebar-avatar-edit" aria-label="Edit profile">
                  <Pencil className="h-3 w-3" />
                </Link>
              </div>
              <div className="portal-sidebar-profile-name">{getUserName()}</div>
              <div className="portal-sidebar-profile-role">{getUserRole()}</div>
            </div>

            <nav className="portal-sidebar-nav max-h-[calc(100vh-14rem)]">
              {navSections.map((section) => (
                <div key={section.id} className="portal-sidebar-section">
                  <div className="portal-sidebar-section-title">{section.label}</div>
                  <ul className="space-y-0.5">
                    {renderNavItems(section.items)}
                  </ul>
                </div>
              ))}
            </nav>
            
            {/* Mobile User Section */}
            <div className="portal-sidebar-footer">
              <button
                onClick={handleLogout}
                className="portal-sidebar-logout"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className={`portal-sidebar fixed inset-y-0 left-0 z-30 hidden border-r lg:flex lg:flex-col ${desktopNavCollapsed ? "is-collapsed w-[82px]" : "w-[300px]"}`}>
        <div className="portal-sidebar-brand-row">
          <button type="button" className="portal-sidebar-toggle" onClick={() => setDesktopNavCollapsed((collapsed) => !collapsed)} aria-label={desktopNavCollapsed ? "Expand navigation" : "Collapse navigation"} title={desktopNavCollapsed ? "Expand navigation" : "Collapse navigation"}>
            {desktopNavCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
        </div>
        <div className="portal-sidebar-profile">
          <div className="portal-sidebar-avatar-wrap">
            <div className="portal-sidebar-avatar">{getUserInitials()}</div>
            <Link to="/tutor/settings" className="portal-sidebar-avatar-edit" aria-label="Edit profile" title="Edit profile">
              <Pencil className="h-3 w-3" />
            </Link>
          </div>
          <div className="portal-sidebar-profile-name">{getUserName()}</div>
          <div className="portal-sidebar-profile-role">{getUserRole()}</div>
        </div>

        <nav className="portal-sidebar-nav">
          {navSections.map((section) => (
            <div key={section.id} className="portal-sidebar-section">
              <div className="portal-sidebar-section-title">{section.label}</div>
              <ul className="space-y-0.5">
                {renderNavItems(section.items, desktopNavCollapsed)}
              </ul>
            </div>
          ))}
        </nav>

        {/* Desktop User Section with Dropup Menu */}
        <div className="portal-sidebar-footer">
          <button type="button" onClick={handleLogout} className={`portal-sidebar-logout mt-2 ${desktopNavCollapsed ? "is-collapsed" : ""}`} aria-label="Logout" title={desktopNavCollapsed ? "Logout" : undefined}>
            <LogOut className="h-4 w-4" />
            <span className="portal-sidebar-logout-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={desktopNavCollapsed ? "lg:pl-[82px]" : "lg:pl-[300px]"}>
        <header className="portal-top-app-bar sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b px-3 sm:px-6 backdrop-blur-md">
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
            <ThemeSelect />
            <span className="hidden xs:inline-block text-xs sm:text-sm text-muted-foreground">
              {getUserDisplayName()}
            </span>
            <div className="relative" ref={headerMenuRef}>
              <button
                type="button"
                onClick={() => setHeaderMenuOpen((open) => !open)}
                aria-label="Open profile menu"
                aria-haspopup="true"
                aria-expanded={headerMenuOpen}
                className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary ring-2 ring-primary/10 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {getUserInitials()}
              </button>
              {headerMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="border-b border-border bg-secondary/40 p-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {getUserInitials()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{getUserName()}</p>
                        <p className="truncate text-xs text-muted-foreground">{getUserEmail() || getUserRole()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5">
                    <Link to="/tutor/settings" onClick={() => setHeaderMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition hover:bg-secondary">
                      <User className="h-4 w-4 text-muted-foreground" /> Profile & settings
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      className="portal-logout-menu-item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                </div>
              )}
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
          <main className="portal-mobile-nav-main mx-auto min-h-[calc(100vh-4rem)] max-w-[1400px] px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
        <nav className="portal-mobile-bottom-nav" aria-label="Main navigation">
          {[
            { label: "Home", to: "/tutor/dashboard", icon: <Home /> },
            { label: "Builder", to: "/tutor/builder", icon: <PlusSquare /> },
            { label: "Students", to: "/tutor/students", icon: <Users /> },
            { label: "Settings", to: "/tutor/settings", icon: <Settings /> },
          ].map((item) => {
            const active = isActiveItem(item.to);
            return (
              <Link key={item.to} to={item.to} aria-current={active ? "page" : undefined} className="portal-mobile-bottom-nav-item">
                <span className="portal-mobile-bottom-nav-icon">{item.icon}</span>
                <span className="portal-mobile-bottom-nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <Toaster />
      </div>
    </div>
  );
}
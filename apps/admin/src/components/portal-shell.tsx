// apps/tutor/src/components/portal-shell.tsx
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
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
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
} from "lucide-react";
import { useState, type ReactNode, useRef, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeSelect } from "@/components/theme-provider";

export type NavItem = { 
  label: string; 
  to: string; 
  icon: ReactNode; 
  badge?: string | number;
  section?: string;
};

export type NavSection = { 
  label: string; 
  items: NavItem[];
  icon?: ReactNode;
};

export function PortalShell({
  nav,
  navSections,
  title,
  user,
  accent = "tutor",
  onLogout,
}: {
  nav?: NavItem[];
  navSections?: NavSection[];
  title: string;
  user?: { name: string; role: string; initials: string; email?: string } | null;
  accent?: "student" | "tutor" | "admin";
  onLogout?: () => void;
}) {
  const safeUser = user ?? { name: "Loading…", role: "User", initials: "…" };
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isNavigating = useRouterState({ select: (s) => s.status === "pending" });
  
  const accentLabel = accent === "student" ? "Student" : accent === "tutor" ? "Tutor" : "Admin";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [desktopNavCollapsed, setDesktopNavCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const headerMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (headerMenuRef.current && !headerMenuRef.current.contains(event.target as Node)) {
        setHeaderMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setUserMenuOpen(false);
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
    return currentPath.startsWith(`${targetPath}/`);
  };

  // Get user information
  const getUserInitials = () => {
    return safeUser.initials || "U";
  };

  const getUserName = () => {
    return safeUser.name || "User";
  };

  const getUserDisplayName = () => {
    if (!safeUser?.name) return "User";
    const firstName = safeUser.name.split(" ")[0];
    return firstName || "User";
  };

  const getUserRole = () => {
    return safeUser.role || "User";
  };

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    }
    setUserMenuOpen(false);
    setHeaderMenuOpen(false);
  };

  // Get accent color classes
  const accentColors = {
    admin: {
      primary: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
      primaryText: 'text-blue-600 dark:text-blue-400',
      primaryBg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
      ring: 'ring-blue-200 dark:ring-blue-800',
    },
    tutor: {
      primary: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600',
      primaryText: 'text-purple-600 dark:text-purple-400',
      primaryBg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
      ring: 'ring-purple-200 dark:ring-purple-800',
    },
    student: {
      primary: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600',
      primaryText: 'text-green-600 dark:text-green-400',
      primaryBg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      hover: 'hover:bg-green-50 dark:hover:bg-green-900/20',
      ring: 'ring-green-200 dark:ring-green-800',
    },
  };

  const accentStyle = accentColors[accent] || accentColors.tutor;

  // Build sections from nav or use provided navSections
  const defaultSections: NavSection[] = [
    {
      label: "Quick Access",
      icon: <Zap className="w-3.5 h-3.5" />,
      items: nav?.filter(item => item.section === "quick-access") || []
    },
    {
      label: "Courses",
      icon: <BookOpen className="w-3.5 h-3.5" />,
      items: nav?.filter(item => item.section === "courses") || []
    },
    {
      label: "Students",
      icon: <Users className="w-3.5 h-3.5" />,
      items: nav?.filter(item => item.section === "students") || []
    },
    {
      label: "Analytics",
      icon: <BarChart3 className="w-3.5 h-3.5" />,
      items: nav?.filter(item => item.section === "analytics") || []
    },
    {
      label: "Communication",
      icon: <MessageCircle className="w-3.5 h-3.5" />,
      items: nav?.filter(item => item.section === "communication") || []
    },
    {
      label: "Settings",
      icon: <Settings className="w-3.5 h-3.5" />,
      items: nav?.filter(item => item.section === "settings") || []
    }
  ].filter(section => section.items.length > 0);

  const sections = navSections || defaultSections;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                <div className="portal-sidebar-avatar">
                  {getUserInitials()}
                </div>
                <Link to="/admin/settings" onClick={() => setMobileNavOpen(false)} className="portal-sidebar-avatar-edit" aria-label="Edit profile">
                  <Pencil className="h-3 w-3" />
                </Link>
              </div>
              <div className="portal-sidebar-profile-name">{getUserName()}</div>
              <div className="portal-sidebar-profile-role">{getUserRole()}</div>
            </div>

            <nav className="portal-sidebar-nav">
              {sections.map((section) => (
                <div key={section.label} className="portal-sidebar-section">
                  <div className="portal-sidebar-section-title">{section.label}</div>
                  <ul className="space-y-0.5">
                    {section.items.map((item) => {
                      const active = isActiveItem(item.to);
                      return (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            onClick={() => setMobileNavOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className="portal-sidebar-link"
                          >
                            {item.icon}
                            <span className="portal-sidebar-link-label">{item.label}</span>
                            {item.badge != null && <span className="ml-auto text-xs">{item.badge}</span>}
                          </Link>
                        </li>
                      );
                    })}
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
            <Link to="/admin/settings" className="portal-sidebar-avatar-edit" aria-label="Edit profile" title="Edit profile">
              <Pencil className="h-3 w-3" />
            </Link>
          </div>
          <div className="portal-sidebar-profile-name">{getUserName()}</div>
          <div className="portal-sidebar-profile-role">{getUserRole()}</div>
        </div>

        <nav className="portal-sidebar-nav">
          {sections.map((section) => (
            <div key={section.label} className="portal-sidebar-section">
              <div className="portal-sidebar-section-title">{section.label}</div>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActiveItem(item.to);
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        aria-current={active ? "page" : undefined}
                        aria-label={desktopNavCollapsed ? item.label : undefined}
                        title={desktopNavCollapsed ? item.label : undefined}
                        className="portal-sidebar-link"
                      >
                        {item.icon}
                        <span className="portal-sidebar-link-label">{item.label}</span>
                        {!desktopNavCollapsed && item.badge != null && <span className="ml-auto text-xs">{item.badge}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Desktop User Section with Dropup Menu */}
        <div className="portal-sidebar-footer relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="portal-sidebar-user-button w-full flex items-center gap-3 rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
            aria-label="Open account menu"
          >
            <div className={`grid h-9 w-9 place-items-center rounded-full ${accentStyle.primary} text-white text-sm font-semibold ring-2 ${accentStyle.ring} group-hover:ring-4 transition-all`}>
              {getUserInitials()}
            </div>
            <div className="portal-sidebar-user-copy min-w-0 flex-1 text-left">
              <div className="truncate text-sm font-medium text-gray-900 dark:text-white">{getUserName()}</div>
              <div className="truncate text-xs text-gray-500 dark:text-gray-400">{getUserRole()}</div>
            </div>
            <ChevronUp className={`portal-sidebar-user-chevron h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Dropup Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50 animate-in slide-in-from-bottom-2 duration-200">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`grid h-12 w-12 place-items-center rounded-full ${accentStyle.primary} text-white text-lg font-semibold`}>
                    {getUserInitials()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-gray-900 dark:text-white">{getUserName()}</div>
                    <div className="truncate text-xs text-gray-500 dark:text-gray-400 capitalize">{getUserRole()}</div>
                  </div>
                </div>
              </div>
              <div className="p-1">
                <Link
                  to="/admin/settings"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  Profile Settings
                </Link>
              </div>
            </div>
          )}
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
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="truncate text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeSelect />
            <span className="hidden xs:inline-block text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {getUserDisplayName()}
            </span>
            <div className="relative" ref={headerMenuRef}>
              <button
                type="button"
                onClick={() => setHeaderMenuOpen((open) => !open)}
                aria-label="Open profile menu"
                aria-haspopup="true"
                aria-expanded={headerMenuOpen}
                className={`grid h-9 w-9 place-items-center rounded-full ${accentStyle.primaryBg} ${accentStyle.primaryText} text-xs font-semibold ring-2 ${accentStyle.ring} transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2`}
              >
                {getUserInitials()}
              </button>
              {headerMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 dark:border-gray-700 dark:bg-gray-800">
                  <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${accentStyle.primary} text-sm font-semibold text-white`}>
                        {getUserInitials()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{getUserName()}</p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.email || getUserRole()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5">
                    <Link to="/admin/settings" onClick={() => setHeaderMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                      <User className="h-4 w-4 text-gray-500 dark:text-gray-400" /> Profile & settings
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
            <div className="absolute inset-0 z-20 flex min-h-[calc(100vh-4rem)] items-start justify-center bg-gray-50/80 pt-20 backdrop-blur-[2px] dark:bg-gray-900/80" role="status" aria-live="polite">
              <div className="sticky top-20 flex items-center gap-3 rounded-xl border border-gray-200 bg-white/95 px-4 py-3 text-sm font-medium text-gray-700 shadow-lg dark:border-gray-700 dark:bg-gray-800/95 dark:text-gray-200">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400" aria-hidden="true" />
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
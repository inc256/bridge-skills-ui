// apps/student/src/components/portal-shell.tsx
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { 
  ChevronDown, 
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Menu, 
  X, 
  LogOut, 
  User, 
  Home,
  ChevronUp,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  ClipboardList,
  HelpCircle,
  BarChart3,
  MessageCircle,
  Award,
  Settings,
  Sparkles,
  Zap,
  Compass,
  Library,
  BookMarked,
  Star,
  TrendingUp,
  Target,
  Bell,
  FileText,
  Play,
  CheckCircle,
  Calendar,
  Clock,
  Search,
} from "lucide-react";
import { useState, type CSSProperties, type ReactNode, useRef, useEffect } from "react";
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
  icon?: ReactNode;
  dividerBefore?: boolean;
  items: NavItem[]; 
};

export function PortalShell({
  nav,
  navSections,
  title,
  user,
  accent = "student",
  onLogout,
}: {
  nav: NavItem[];
  navSections?: NavSection[];
  title: string;
  user?: { name: string; role: string; initials: string; email?: string } | null;
  accent?: "student" | "tutor" | "admin";
  onLogout?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isNavigating = useRouterState({ select: (s) => s.status === "pending" });
  const accentLabel = accent === "student" ? "Student" : accent === "tutor" ? "Tutor" : "Admin";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const isStudentDashboard = accent === "student" && pathname.replace(/\/$/, "") === "/student/dashboard";
  const isStudentExplore = accent === "student" && pathname.replace(/\/$/, "") === "/student/explore";
  const isStudentAssignments = accent === "student" && pathname.replace(/\/$/, "") === "/student/assignments";
  const isStudentAchievements = accent === "student" && pathname.replace(/\/$/, "") === "/student/achievements";
  const isStudentCourseDetails = accent === "student" && /^\/student\/course\/[^/]+$/.test(pathname.replace(/\/$/, ""));
  const isStudentForum = accent === "student" && pathname.startsWith("/student/forum");
  const isStudyPage = pathname.startsWith("/student/study/");
  const [desktopNavCollapsed, setDesktopNavCollapsed] = useState(isStudyPage);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const headerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDesktopNavCollapsed(isStudyPage);
  }, [isStudyPage]);

  // Defensive fallback
  const safeUser = user ?? { name: "Loading…", role: accentLabel, initials: "…" };

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

  // Accent color configurations
  const accentColors = {
    student: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      primaryBg: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      border: 'border-blue-200',
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-50',
      ring: 'ring-blue-500',
      light: 'text-blue-700 bg-blue-50',
      iconBg: 'bg-blue-100 text-blue-600'
    },
    tutor: {
      primary: 'bg-purple-600 hover:bg-purple-700 text-white',
      primaryBg: 'bg-purple-600',
      primaryHover: 'hover:bg-purple-700',
      text: 'text-purple-600',
      border: 'border-purple-200',
      bg: 'bg-purple-50',
      hover: 'hover:bg-purple-50',
      ring: 'ring-purple-500',
      light: 'text-purple-700 bg-purple-50',
      iconBg: 'bg-purple-100 text-purple-600'
    },
    admin: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      primaryBg: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      border: 'border-blue-200',
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-50',
      ring: 'ring-blue-500',
      light: 'text-blue-700 bg-blue-50',
      iconBg: 'bg-blue-100 text-blue-600'
    }
  };

  const accentStyle = accentColors[accent] || accentColors.student;

  // Use sections if provided, otherwise use flat nav
  const sections = navSections || [{ label: "Navigation", items: nav }];
  const studentMobileNav = [
    { label: "Home", to: "/student/dashboard", icon: <Home aria-hidden="true" /> },
    { label: "Courses", to: "/student/explore", icon: <BookOpen aria-hidden="true" /> },
    { label: "Forums", to: "/student/forum", icon: <MessageCircle aria-hidden="true" /> },
    { label: "Profile", to: "/student/profile", icon: <User aria-hidden="true" /> },
  ];

  // Render navigation items
  const renderNavItems = (items: NavItem[], collapsed = false) => {
    return items.map((item) => {
      const active = isActiveItem(item.to);
      return (
        <li key={item.to}>
          <Link
            to={item.to}
            onClick={() => setMobileNavOpen(false)}
            title={collapsed ? item.label : undefined}
            aria-label={collapsed ? item.label : undefined}
            className={`${accent === "student" ? "student-nav-item" : ""} flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${
              collapsed ? "justify-center px-2.5" : "justify-between px-3"
            } ${
              active
                ? `${accentStyle.primary} shadow-sm`
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-0.5"
            }`}
          >
            <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
              <span className={`grid h-5 w-5 place-items-center transition-transform duration-200 ${
                active ? "text-white" : "text-gray-400 dark:text-gray-500 group-hover:scale-110"
              }`}>
                {item.icon}
              </span>
              {!collapsed && item.label}
            </span>
            {!collapsed && item.badge != null && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                active ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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
    <div className={`min-h-screen ${accent === "student" ? "student-portal-shell" : "bg-gray-50 dark:bg-gray-900"}`}>
      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden animate-in fade-in duration-200"
            aria-label="Close navigation menu"
          />
          <aside className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] border-r border-gray-200 dark:border-gray-700 lg:hidden animate-in slide-in-from-left duration-300 overflow-y-auto ${
            accent === "student" ? "student-sidebar student-mobile-sidebar" : "bg-white dark:bg-gray-800"
          }`}>
            <div className={`student-mobile-header flex items-center px-4 pt-4 pb-2 ${
              accent === "student" ? "justify-end" : "justify-between"
            }`}>
              {accent !== "student" && (
                <div className="flex items-center gap-2">
                  <div className={`rounded-xl ${accentStyle.iconBg} p-1.5`}>
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">TechBridge</span>
                  <span className={`text-[10px] font-medium ${accentStyle.text} ${accentStyle.bg} px-2 py-0.5 rounded-full`}>
                    {accentLabel}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close navigation"
                className="student-mobile-close grid h-9 w-9 place-items-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:bg-white dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {accent === "student" ? (
              <div className="student-sidebar-profile">
                <div className="student-sidebar-avatar-wrap">
                  <div className="student-sidebar-avatar">{safeUser.initials}</div>
                  <Link
                    to="/student/profile"
                    onClick={() => setMobileNavOpen(false)}
                    className="student-avatar-edit"
                    aria-label="Edit profile"
                    title="Edit profile"
                  >
                    <Pencil aria-hidden="true" />
                  </Link>
                </div>
                <div className="student-sidebar-name" title={safeUser.name}>{safeUser.name}</div>
              </div>
            ) : (
              <div className="px-3 py-2">
                <div className={`flex items-center gap-3 rounded-xl p-3 ${accentStyle.bg} dark:bg-opacity-10`}>
                  <div className={`grid h-10 w-10 place-items-center rounded-full ${accentStyle.primaryBg} text-white text-sm font-semibold`}>
                    {safeUser.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-gray-900 dark:text-white">{safeUser.name}</div>
                    <div className="truncate text-xs text-gray-500 dark:text-gray-400">{safeUser.role}</div>
                  </div>
                </div>
              </div>
            )}

            <nav className={`max-h-[calc(100vh-14rem)] overflow-y-auto px-3 pb-4 ${
              accent === "student" ? "student-sidebar-nav" : ""
            }`}>
              {sections.map((section) => (
                <div key={section.label || section.items[0]?.to} className="student-nav-section mt-3 first:mt-0">
                  {section.dividerBefore && <div className="student-nav-divider" />}
                  {section.label && <div className="flex items-center gap-1.5 px-3 py-1.5">
                    {section.icon && (
                      <span className="text-gray-400 dark:text-gray-500">{section.icon}</span>
                    )}
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {section.label}
                    </span>
                  </div>}
                  <ul className="space-y-0.5">
                    {renderNavItems(section.items)}
                  </ul>
                </div>
              ))}
            </nav>
            
            {/* Mobile User Section */}
            <div className={`absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 ${
              accent === "student" ? "student-sidebar-footer" : ""
            }`}>
              <button
                onClick={onLogout}
                className="portal-sidebar-logout justify-center"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 hidden border-r border-gray-200 transition-[width] duration-200 dark:border-gray-700 lg:flex lg:flex-col overflow-y-auto ${
        accent === "student" ? "student-sidebar" : ""
      } ${
        accent !== "student" ? "bg-white dark:bg-gray-800" : ""
      } ${
        desktopNavCollapsed ? "w-[72px]" : accent === "student" ? "w-[280px]" : "w-[270px]"
      }`}>
        <div className={`student-brand-row flex items-center pt-4 pb-3 ${
          accent === "student"
            ? desktopNavCollapsed ? "justify-center px-2" : "justify-end px-4"
            : desktopNavCollapsed ? "flex-col gap-3 px-2" : "justify-between gap-2 px-4"
        }`}>
          {accent !== "student" && (
            <div className={`flex items-center ${desktopNavCollapsed ? "justify-center" : "gap-2"}`}>
              <div className={`rounded-xl ${accentStyle.iconBg} p-2`}>
                <GraduationCap className="h-6 w-6" />
              </div>
              {!desktopNavCollapsed && <div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">TechBridge</span>
                <span className={`block text-[10px] font-medium ${accentStyle.text}`}>
                  {accentLabel} Portal
                </span>
              </div>}
            </div>
          )}
          <button
            type="button"
            onClick={() => setDesktopNavCollapsed((collapsed) => !collapsed)}
            aria-label={desktopNavCollapsed ? "Expand navigation" : "Collapse navigation"}
            title={desktopNavCollapsed ? "Expand navigation" : "Collapse navigation"}
            aria-expanded={!desktopNavCollapsed}
            className={`student-collapse-button grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white ${
              accent === "student" ? "is-student" : ""
            }`}
          >
            {desktopNavCollapsed
              ? <PanelLeftOpen className="h-[18px] w-[18px]" strokeWidth={1.8} />
              : <PanelLeftClose className="h-[18px] w-[18px]" strokeWidth={1.8} />}
          </button>
        </div>

        {accent === "student" && (
          <div className={`student-sidebar-profile ${desktopNavCollapsed ? "is-collapsed" : ""}`}>
            <div className="student-sidebar-avatar-wrap">
              <div className="student-sidebar-avatar">{safeUser.initials}</div>
              <Link
                to="/student/profile"
                className="student-avatar-edit"
                aria-label="Edit profile"
                title="Edit profile"
              >
                <Pencil aria-hidden="true" />
              </Link>
            </div>
            {!desktopNavCollapsed && (
              <div className="student-sidebar-name" title={safeUser.name}>{safeUser.name}</div>
            )}
          </div>
        )}

        <nav className={`flex-1 overflow-y-auto pb-4 ${desktopNavCollapsed ? "px-2" : "px-3"}`}>
          {sections.map((section) => (
            <div key={section.label || section.items[0]?.to} className="student-nav-section mt-4 first:mt-0">
              {section.dividerBefore && <div className="student-nav-divider" />}
              {section.label && !desktopNavCollapsed && <div
                title={desktopNavCollapsed ? section.label : undefined}
                className="flex items-center gap-1.5 px-3 py-1.5"
              >
                {section.icon && (
                  <span className="text-gray-400 dark:text-gray-500">{section.icon}</span>
                )}
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {section.label}
                </span>
              </div>}
              <ul className="space-y-0.5">
                {renderNavItems(section.items, desktopNavCollapsed)}
              </ul>
            </div>
          ))}
        </nav>

        {/* Desktop User Section with Dropup Menu */}
        <div className={`relative border-t border-gray-200 dark:border-gray-700 ${desktopNavCollapsed ? "p-2" : "p-3"} ${
          accent === "student" ? "student-sidebar-footer" : ""
        }`} ref={userMenuRef}>
          {accent === "student" ? (
            <button
              type="button"
              onClick={onLogout}
              title={desktopNavCollapsed ? "Logout" : undefined}
              aria-label="Logout"
              className={`portal-sidebar-logout ${desktopNavCollapsed ? "is-collapsed" : ""}`}
            >
              <LogOut className="h-5 w-5" />
              {!desktopNavCollapsed && <span>Logout</span>}
            </button>
          ) : (
            <>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={`flex w-full items-center rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group ${
              desktopNavCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className={`grid h-9 w-9 place-items-center rounded-full ${accentStyle.primaryBg} text-white text-sm font-semibold ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ${accentStyle.ring} transition-all`}>
              {safeUser.initials}
            </div>
            {!desktopNavCollapsed && <div className="min-w-0 flex-1 text-left">
              <div className="truncate text-sm font-medium text-gray-900 dark:text-white">{safeUser.name}</div>
              <div className="truncate text-xs text-gray-500 dark:text-gray-400">{safeUser.role}</div>
            </div>}
            {!desktopNavCollapsed && <ChevronUp className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />}
          </button>

          {/* User Dropup Menu */}
          {userMenuOpen && (
            <div className={`absolute bottom-full mb-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50 animate-in slide-in-from-bottom-2 duration-200 ${
              desktopNavCollapsed ? "left-1 right-1" : "left-3 right-3"
            }`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`grid h-12 w-12 place-items-center rounded-full ${accentStyle.primaryBg} text-white text-lg font-semibold`}>
                    {safeUser.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-gray-900 dark:text-white">{safeUser.name}</div>
                    <div className="truncate text-xs text-gray-500 dark:text-gray-400">{safeUser.role}</div>
                  </div>
                </div>
              </div>
              <div className="p-1">
                <Link
                  to="/student/profile"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  My Account
                </Link>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="portal-logout-menu-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className={desktopNavCollapsed ? "lg:pl-[72px]" : accent === "student" ? "lg:pl-[280px]" : "lg:pl-[270px]"}>
        <header className="student-top-app-bar sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b px-3 sm:px-6 backdrop-blur-md">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <button
              onClick={() => setMobileNavOpen(true)}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-colors lg:hidden ${
                accent === "student"
                  ? "student-mobile-menu-button"
                  : "border-gray-200 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
            <h1 className={`truncate text-base font-semibold sm:text-lg ${accent === "student" ? "text-white" : "text-gray-900 dark:text-white"}`}>{title}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {accent === "student" && (
              <label className="student-header-search hidden md:flex">
                <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
                <input type="search" aria-label="Search courses" placeholder="What do you want to learn?" />
              </label>
            )}
            <div className={accent === "student" ? "student-theme-control" : ""}>
              <ThemeSelect />
            </div>
            <span className={`hidden xs:inline-block text-xs sm:text-sm ${accent === "student" ? "text-white/75" : "text-gray-500 dark:text-gray-400"}`}>
              {safeUser.name.split(' ')[0]}
            </span>
            <div className="relative" ref={headerMenuRef}>
              <button
                type="button"
                onClick={() => setHeaderMenuOpen((open) => !open)}
                aria-label="Open profile menu"
                aria-haspopup="true"
                aria-expanded={headerMenuOpen}
                className={`grid h-9 w-9 place-items-center rounded-full ${accentStyle.iconBg} text-xs font-semibold ring-2 ring-offset-2 ${accent === "student" ? "student-header-avatar" : "ring-offset-white dark:ring-offset-gray-900"} transition hover:scale-105 focus-visible:outline-none focus-visible:ring-primary ${accentStyle.ring}`}
              >
                {safeUser.initials}
              </button>
              {headerMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="border-b border-border bg-secondary/40 p-4">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${accentStyle.iconBg} text-sm font-semibold`}>
                        {safeUser.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{safeUser.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{safeUser.email || safeUser.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5">
                    <Link to="/student/profile" onClick={() => setHeaderMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition hover:bg-secondary">
                      <User className="h-4 w-4 text-muted-foreground" /> My account
                    </Link>
                    <Link to="/student/settings" onClick={() => setHeaderMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition hover:bg-secondary">
                      <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setHeaderMenuOpen(false);
                        onLogout?.();
                      }}
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
                Loading page....
              </div>
            </div>
          )}
          <main
            className={`${isStudentDashboard
              ? "student-dashboard-main"
              : isStudentCourseDetails
                ? "mx-auto min-h-[calc(100vh-4rem)] max-w-[1400px] px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 student-course-details-main"
              : isStudentForum
                ? "student-forum-main"
              : isStudyPage
                ? "student-study-main-shell"
              : "mx-auto min-h-[calc(100vh-4rem)] max-w-[1400px] px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
            } ${accent === "student" && !isStudentForum ? "student-mobile-main" : ""
            } ${isStudentExplore ? "student-explore-main" : ""} ${isStudentAssignments ? "student-assignments-main" : ""} ${isStudentAchievements ? "student-achievements-main" : ""}`}
            style={{
              "--portal-sidebar-width": desktopNavCollapsed ? "72px" : accent === "student" ? "280px" : "270px",
            } as CSSProperties}
          >
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
      {accent === "student" && (
        <nav className="student-bottom-nav" aria-label="Main navigation">
          {studentMobileNav.map((item) => {
            const active = isActiveItem(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`student-bottom-nav-item ${active ? "active" : ""}`}
              >
                <span className="student-bottom-nav-icon">{item.icon}</span>
                <span className="student-bottom-nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
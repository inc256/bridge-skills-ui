// apps/student/src/components/portal-shell.tsx
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
  Clock
} from "lucide-react";
import { useState, type ReactNode, useRef, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";

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
  user?: { name: string; role: string; initials: string } | null;
  accent?: "student" | "tutor" | "admin";
  onLogout?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isNavigating = useRouterState({ select: (s) => s.status === "pending" });
  const accentLabel = accent === "student" ? "Student" : accent === "tutor" ? "Tutor" : "Admin";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Defensive fallback
  const safeUser = user ?? { name: "Loading…", role: accentLabel, initials: "…" };

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
                ? `${accentStyle.primary} shadow-sm`
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-0.5"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className={`grid h-5 w-5 place-items-center transition-transform duration-200 ${
                active ? "text-white" : "text-gray-400 dark:text-gray-500 group-hover:scale-110"
              }`}>
                {item.icon}
              </span>
              {item.label}
            </span>
            {item.badge != null && (
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden animate-in fade-in duration-200"
            aria-label="Close navigation menu"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 lg:hidden animate-in slide-in-from-left duration-300 overflow-y-auto">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <div className="flex items-center gap-2">
                <div className={`rounded-xl ${accentStyle.iconBg} p-1.5`}>
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">TechBridge</span>
                <span className={`text-[10px] font-medium ${accentStyle.text} ${accentStyle.bg} px-2 py-0.5 rounded-full`}>
                  {accentLabel}
                </span>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
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

            <nav className="max-h-[calc(100vh-14rem)] overflow-y-auto px-3 pb-4">
              {sections.map((section) => (
                <div key={section.label} className="mt-3 first:mt-0">
                  <div className="flex items-center gap-1.5 px-3 py-1.5">
                    {section.icon && (
                      <span className="text-gray-400 dark:text-gray-500">{section.icon}</span>
                    )}
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
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
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-[270px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 lg:flex lg:flex-col overflow-y-auto">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <div className={`rounded-xl ${accentStyle.iconBg} p-2`}>
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 dark:text-white">TechBridge</span>
              <span className={`block text-[10px] font-medium ${accentStyle.text}`}>
                {accentLabel} Portal
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {sections.map((section) => (
            <div key={section.label} className="mt-4 first:mt-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5">
                {section.icon && (
                  <span className="text-gray-400 dark:text-gray-500">{section.icon}</span>
                )}
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
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
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-3 rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
          >
            <div className={`grid h-9 w-9 place-items-center rounded-full ${accentStyle.primaryBg} text-white text-sm font-semibold ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ${accentStyle.ring} transition-all`}>
              {safeUser.initials}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="truncate text-sm font-medium text-gray-900 dark:text-white">{safeUser.name}</div>
              <div className="truncate text-xs text-gray-500 dark:text-gray-400">{safeUser.role}</div>
            </div>
            <ChevronUp className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Dropup Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50 animate-in slide-in-from-bottom-2 duration-200">
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
                  to="/student/settings"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
        <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 sm:px-6 backdrop-blur-md">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
            <h1 className="truncate text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden xs:inline-block text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {safeUser.name.split(' ')[0]}
            </span>
            <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 hidden xs:block" />
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${accentStyle.iconBg} flex items-center justify-center text-[10px] sm:text-xs font-semibold ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ${accentStyle.ring}`}>
              {safeUser.initials}
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
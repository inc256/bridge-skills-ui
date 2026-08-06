import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, Search, ChevronDown, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "./logo";

export type NavItem = { label: string; to: string; icon: ReactNode; badge?: string | number };

export function PortalShell({
  nav,
  title,
  user,
  accent = "student",
}: {
  nav: NavItem[];
  title: string;
  user: { name: string; role: string; initials: string };
  accent?: "student" | "tutor" | "admin";
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const accentLabel = accent === "student" ? "Student" : accent === "tutor" ? "Tutor" : "Admin";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const normalizePath = (path: string) => {
    if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
    return path;
  };

  const isActiveItem = (to: string) => {
    const currentPath = normalizePath(pathname);
    const targetPath = normalizePath(to);
    if (currentPath === targetPath) return true;

    // If this item has child tabs in the nav, keep it exact-only to avoid parent tabs always staying active.
    const hasChildItems = nav.some((item) => {
      const navPath = normalizePath(item.to);
      return navPath !== targetPath && navPath.startsWith(`${targetPath}/`);
    });

    if (hasChildItems) return false;
    return currentPath.startsWith(`${targetPath}/`);
  };

  return (
    <div className="min-h-screen bg-background">
      {mobileNavOpen && (
        <>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-label="Close navigation menu"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[290px] border-r border-border bg-sidebar lg:hidden">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <Logo />
              <button
                onClick={() => setMobileNavOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-4 pt-4 pb-2">
              <div className="rounded-xl bg-secondary px-3 py-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                {accentLabel} Portal
              </div>
            </div>
            <nav className="max-h-[calc(100vh-9.5rem)] overflow-y-auto px-3 pb-4">
              <ul className="space-y-0.5">
                {nav.map((item) => {
                  const active = isActiveItem(item.to);
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setMobileNavOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`grid h-5 w-5 place-items-center ${active ? "text-primary-foreground" : "text-muted-foreground"}`}>
                            {item.icon}
                          </span>
                          {item.label}
                        </span>
                        {item.badge != null && (
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? "bg-white/20 text-white" : "bg-secondary text-foreground"}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </>
      )}

      <aside className="fixed inset-y-0 left-0 hidden w-[260px] border-r border-border bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo />
        </div>
        <div className="px-4 pt-4 pb-2">
          <div className="rounded-xl bg-secondary px-3 py-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {accentLabel} Portal
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          <ul className="space-y-0.5">
            {nav.map((item) => {
              const active = isActiveItem(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`grid h-5 w-5 place-items-center ${active ? "text-primary-foreground" : "text-muted-foreground"}`}>
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                    {item.badge != null && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? "bg-white/20 text-white" : "bg-secondary text-foreground"}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-secondary transition-colors">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              {user.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <div className="truncate text-xs text-muted-foreground">{user.role}</div>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-card lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
            <h1 className="truncate text-lg font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search courses, lessons, students…"
                className="w-72 rounded-[14px] border border-border bg-secondary/60 py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
              />
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--gold)]" />
            </button>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold lg:hidden">
              {user.initials}
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

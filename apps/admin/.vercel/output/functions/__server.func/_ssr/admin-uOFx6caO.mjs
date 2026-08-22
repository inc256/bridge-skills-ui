import { r as __toESM } from "../_runtime.mjs";
import { d as isAccessTokenExpired, l as getStoredSession, n as clearStoredSession, p as logout, t as apiRequest } from "./api-aCKu3ccm.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as Outlet, g as Link, l as useRouterState, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as GraduationCap, I as LayoutDashboard, K as FileText, L as Layers, N as LogOut, O as MessageCircle, St as Award, _ as Settings, _t as Briefcase, a as User, bt as Bell, c as UserCheck, h as Shield, i as Users, k as Menu, kt as Activity, lt as ChevronUp, mt as ChartColumn, n as X, ot as CircleQuestionMark, q as FilePen, t as Zap, yt as BookOpen } from "../_libs/lucide-react.mjs";
import { t as AdminAuthPage } from "./admin-auth-page-CLR6iEqw.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-uOFx6caO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function PortalShell({ nav, navSections, title, user, accent = "tutor", onLogout }) {
	const safeUser = user ?? {
		name: "Loading…",
		role: "User",
		initials: "…"
	};
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const accentLabel = accent === "student" ? "Student" : accent === "tutor" ? "Tutor" : "Admin";
	const [mobileNavOpen, setMobileNavOpen] = (0, import_react.useState)(false);
	const [userMenuOpen, setUserMenuOpen] = (0, import_react.useState)(false);
	const userMenuRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const handleClickOutside = (event) => {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target)) setUserMenuOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const normalizePath = (path) => {
		if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
		return path;
	};
	const isActiveItem = (to) => {
		const currentPath = normalizePath(pathname);
		const targetPath = normalizePath(to);
		if (currentPath === targetPath) return true;
		return currentPath.startsWith(`${targetPath}/`);
	};
	const getUserInitials = () => {
		return safeUser.initials || "U";
	};
	const getUserName = () => {
		return safeUser.name || "User";
	};
	const getUserDisplayName = () => {
		if (!safeUser?.name) return "User";
		return safeUser.name.split(" ")[0] || "User";
	};
	const getUserRole = () => {
		return safeUser.role || "User";
	};
	const handleLogout = async () => {
		if (onLogout) onLogout();
		setUserMenuOpen(false);
	};
	const accentColors = {
		admin: {
			primary: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
			primaryText: "text-blue-600 dark:text-blue-400",
			primaryBg: "bg-blue-50 dark:bg-blue-900/20",
			border: "border-blue-200 dark:border-blue-800",
			hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
			ring: "ring-blue-200 dark:ring-blue-800"
		},
		tutor: {
			primary: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
			primaryText: "text-purple-600 dark:text-purple-400",
			primaryBg: "bg-purple-50 dark:bg-purple-900/20",
			border: "border-purple-200 dark:border-purple-800",
			hover: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
			ring: "ring-purple-200 dark:ring-purple-800"
		},
		student: {
			primary: "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
			primaryText: "text-green-600 dark:text-green-400",
			primaryBg: "bg-green-50 dark:bg-green-900/20",
			border: "border-green-200 dark:border-green-800",
			hover: "hover:bg-green-50 dark:hover:bg-green-900/20",
			ring: "ring-green-200 dark:ring-green-800"
		}
	};
	const accentStyle = accentColors[accent] || accentColors.tutor;
	const defaultSections = [
		{
			label: "Quick Access",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-3.5 h-3.5" }),
			items: nav?.filter((item) => item.section === "quick-access") || []
		},
		{
			label: "Courses",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-3.5 h-3.5" }),
			items: nav?.filter((item) => item.section === "courses") || []
		},
		{
			label: "Students",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5" }),
			items: nav?.filter((item) => item.section === "students") || []
		},
		{
			label: "Analytics",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-3.5 h-3.5" }),
			items: nav?.filter((item) => item.section === "analytics") || []
		},
		{
			label: "Communication",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-3.5 h-3.5" }),
			items: nav?.filter((item) => item.section === "communication") || []
		},
		{
			label: "Settings",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-3.5 h-3.5" }),
			items: nav?.filter((item) => item.section === "settings") || []
		}
	].filter((section) => section.items.length > 0);
	const sections = navSections || defaultSections;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-gray-50 dark:bg-gray-900",
		children: [
			mobileNavOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setMobileNavOpen(false),
				className: "fixed inset-0 z-40 bg-black/40 lg:hidden animate-in fade-in duration-200",
				"aria-label": "Close navigation menu"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 lg:hidden animate-in slide-in-from-left duration-300 overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 pt-4 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `rounded-xl ${accentStyle.primaryBg} p-1.5`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: `h-5 w-5 ${accentStyle.primaryText}` })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold text-gray-900 dark:text-white",
									children: "TechBridge"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] font-medium ${accentStyle.primaryText} ${accentStyle.primaryBg} px-2 py-0.5 rounded-full`,
									children: accentLabel
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMobileNavOpen(false),
							className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-3 rounded-xl p-3 ${accentStyle.primaryBg}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid h-10 w-10 place-items-center rounded-full ${accentStyle.primary} text-white text-sm font-semibold`,
								children: getUserInitials()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-semibold text-gray-900 dark:text-white",
									children: getUserName()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-gray-500 dark:text-gray-400",
									children: getUserRole()
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "max-h-[calc(100vh-14rem)] overflow-y-auto px-3 pb-4",
						children: sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 first:mt-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 px-3 py-1.5",
								children: [section.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gray-400 dark:text-gray-500",
									children: section.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500",
									children: section.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-0.5",
								children: section.items.map((item) => {
									const active = isActiveItem(item.to);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: item.to,
										onClick: () => setMobileNavOpen(false),
										className: `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active ? `${accentStyle.primary} text-white shadow-sm` : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-0.5"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `grid h-5 w-5 place-items-center transition-transform duration-200 ${active ? "text-white" : "text-gray-400 dark:text-gray-500"}`,
												children: item.icon
											}), item.label]
										}), item.badge != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`,
											children: item.badge
										})]
									}) }, item.to);
								})
							})]
						}, section.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleLogout,
							className: "w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Logout"]
						})
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 hidden w-[270px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 lg:flex lg:flex-col overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 pt-4 pb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `rounded-xl ${accentStyle.primaryBg} p-2`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: `h-6 w-6 ${accentStyle.primaryText}` })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-gray-900 dark:text-white",
								children: "TechBridge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `block text-[10px] font-medium ${accentStyle.primaryText}`,
								children: [accentLabel, " Portal"]
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 px-3 pb-4 overflow-y-auto",
						children: sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 first:mt-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 px-3 py-1.5",
								children: [section.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gray-400 dark:text-gray-500",
									children: section.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500",
									children: section.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-0.5",
								children: section.items.map((item) => {
									const active = isActiveItem(item.to);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: item.to,
										className: `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active ? `${accentStyle.primary} text-white shadow-sm` : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-0.5"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `grid h-5 w-5 place-items-center transition-transform duration-200 ${active ? "text-white" : "text-gray-400 dark:text-gray-500"}`,
												children: item.icon
											}), item.label]
										}), item.badge != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`,
											children: item.badge
										})]
									}) }, item.to);
								})
							})]
						}, section.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-gray-200 dark:border-gray-700 p-3 relative",
						ref: userMenuRef,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setUserMenuOpen(!userMenuOpen),
							className: "w-full flex items-center gap-3 rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid h-9 w-9 place-items-center rounded-full ${accentStyle.primary} text-white text-sm font-semibold ring-2 ${accentStyle.ring} group-hover:ring-4 transition-all`,
									children: getUserInitials()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium text-gray-900 dark:text-white",
										children: getUserName()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-gray-500 dark:text-gray-400",
										children: getUserRole()
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: `h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}` })
							]
						}), userMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-full left-3 right-3 mb-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50 animate-in slide-in-from-bottom-2 duration-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 border-b border-gray-200 dark:border-gray-700",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `grid h-12 w-12 place-items-center rounded-full ${accentStyle.primary} text-white text-lg font-semibold`,
										children: getUserInitials()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-semibold text-gray-900 dark:text-white",
											children: getUserName()
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-xs text-gray-500 dark:text-gray-400 capitalize",
											children: getUserRole()
										})]
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/tutor/settings",
									className: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
									onClick: () => setUserMenuOpen(false),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-gray-400 dark:text-gray-500" }), "Profile Settings"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleLogout,
									className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Logout"]
								})]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-[270px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 sm:px-6 backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMobileNavOpen(true),
								className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
								"aria-label": "Open navigation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4 text-gray-600 dark:text-gray-300" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-base sm:text-lg font-semibold text-gray-900 dark:text-white",
								children: title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden xs:inline-block text-xs sm:text-sm text-gray-500 dark:text-gray-400",
									children: getUserDisplayName()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-px bg-gray-300 dark:bg-gray-600 hidden xs:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-7 h-7 sm:w-8 sm:h-8 rounded-full ${accentStyle.primaryBg} flex items-center justify-center ${accentStyle.primaryText} text-[10px] sm:text-xs font-semibold ring-2 ${accentStyle.ring}`,
									children: getUserInitials()
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
				]
			})
		]
	});
}
var ALLOWED_ROLES = [
	"admin",
	"super_admin",
	"staff"
];
function getInitials(name) {
	if (!name) return "AD";
	return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "AD";
}
var NAV_SECTIONS = [
	{
		label: "Main",
		items: [{
			label: "Dashboard",
			to: "/admin/dashboard",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4" })
		}]
	},
	{
		label: "Content",
		items: [
			{
				label: "Courses",
				to: "/admin/courses",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" })
			},
			{
				label: "Lessons",
				to: "/admin/lessons",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
			},
			{
				label: "Quizzes",
				to: "/admin/quizzes",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" })
			},
			{
				label: "Categories",
				to: "/admin/categories",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-4 w-4" })
			},
			{
				label: "Blog",
				to: "/admin/blog",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, { className: "h-4 w-4" })
			}
		]
	},
	{
		label: "Users",
		items: [
			{
				label: "Students",
				to: "/admin/students",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4" })
			},
			{
				label: "Tutors",
				to: "/admin/tutors",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
			},
			{
				label: "Enrollments",
				to: "/admin/enrollments",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-4 w-4" })
			},
			{
				label: "Certificates",
				to: "/admin/certificates",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4" })
			}
		]
	},
	{
		label: "Platform",
		items: [
			{
				label: "Jobs",
				to: "/admin/jobs",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4" })
			},
			{
				label: "Notifications",
				to: "/admin/notifications",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" })
			},
			{
				label: "Support",
				to: "/admin/support",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
			},
			{
				label: "Reports",
				to: "/admin/reports",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4" })
			}
		]
	},
	{
		label: "System",
		items: [
			{
				label: "Roles",
				to: "/admin/roles",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" })
			},
			{
				label: "Audit Logs",
				to: "/admin/auditlogs",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" })
			},
			{
				label: "Settings",
				to: "/admin/settings",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" })
			}
		]
	}
];
var FLAT_NAV = NAV_SECTIONS.flatMap((section) => section.items);
function AdminLayout() {
	const router = useRouter();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const normalizedPath = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
	const [user, setUser] = (0, import_react.useState)(null);
	const [checking, setChecking] = (0, import_react.useState)(true);
	const onLoginPage = normalizedPath === "/admin";
	(0, import_react.useEffect)(() => {
		if (onLoginPage) {
			setChecking(false);
			return;
		}
		const session = getStoredSession();
		if (!session?.access || isAccessTokenExpired(session.access)) {
			clearStoredSession();
			setChecking(false);
			router.navigate({ to: "/admin" });
			return;
		}
		let cancelled = false;
		(async () => {
			try {
				const me = await apiRequest("/auth/me/");
				if (cancelled) return;
				if (!me || !ALLOWED_ROLES.includes(me.role)) {
					await router.navigate({ to: "/admin" });
					return;
				}
				const displayName = me.full_name || me.username || me.email || "Admin";
				setUser({
					name: displayName,
					role: me.role,
					initials: getInitials(displayName)
				});
			} catch (error) {
				console.error("Auth check failed:", error);
				if (!cancelled) await router.navigate({ to: "/admin" });
			} finally {
				if (!cancelled) setChecking(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [onLoginPage, router]);
	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout error:", error);
		}
		setUser(null);
		await router.navigate({ to: "/admin" });
	};
	if (onLoginPage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAuthPage, {});
	if (checking) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Checking your session…" })]
		})
	});
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		accent: "admin",
		title: "Platform administration",
		user,
		nav: FLAT_NAV,
		navSections: NAV_SECTIONS,
		onLogout: handleLogout
	});
}
//#endregion
export { AdminLayout as component };

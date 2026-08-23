import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./auth-CQ-yvO7i.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as LayoutDashboard, O as MessageCircle, R as GraduationCap, Y as ClipboardList, Z as CircleQuestionMark, a as Users, dt as BookOpen, j as LogOut, k as Menu, mt as Award, n as X, o as User, ot as ChartColumn, p as SquarePlus, t as Zap, tt as ChevronUp, v as Settings } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as TutorAuthPage } from "./tutor-auth-page-D-NMvntN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-COB0eShr.js
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
function PortalShell({ nav, title, accent = "student" }) {
	const { user, logout } = useAuth() || {
		user: null,
		logout: async () => {}
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
		if (nav.some((item) => {
			const navPath = normalizePath(item.to);
			return navPath !== targetPath && navPath.startsWith(`${targetPath}/`);
		})) return false;
		return currentPath.startsWith(`${targetPath}/`);
	};
	const getUserInitials = () => {
		if (!user) return "U";
		if (user.full_name) {
			const names = user.full_name.split(" ");
			if (names.length >= 2) return (names[0][0] + names[1][0]).toUpperCase();
			return names[0][0].toUpperCase();
		}
		if (user.first_name && user.last_name) return (user.first_name[0] + user.last_name[0]).toUpperCase();
		if (user.first_name) return user.first_name[0].toUpperCase();
		if (user.username) return user.username[0].toUpperCase();
		return "U";
	};
	const getUserName = () => {
		if (!user) return "User";
		if (user.full_name) return user.full_name;
		if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
		if (user.first_name) return user.first_name;
		if (user.username) return user.username;
		return "User";
	};
	const getUserDisplayName = () => {
		if (!user) return "User";
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
	const navSections = [
		{
			id: "quick-access",
			label: "Quick Access",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-3.5 h-3.5" }),
			items: nav.filter((item) => item.section === "quick-access")
		},
		{
			id: "courses",
			label: "Courses",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-3.5 h-3.5" }),
			items: nav.filter((item) => item.section === "courses")
		},
		{
			id: "students",
			label: "Students",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5" }),
			items: nav.filter((item) => item.section === "students")
		},
		{
			id: "analytics",
			label: "Analytics",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-3.5 h-3.5" }),
			items: nav.filter((item) => item.section === "analytics")
		},
		{
			id: "communication",
			label: "Communication",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-3.5 h-3.5" }),
			items: nav.filter((item) => item.section === "communication")
		},
		{
			id: "settings",
			label: "Settings",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-3.5 h-3.5" }),
			items: nav.filter((item) => item.section === "settings")
		}
	].filter((section) => section.items.length > 0);
	const renderNavItems = (items) => {
		return items.map((item) => {
			const active = isActiveItem(item.to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: () => setMobileNavOpen(false),
				className: `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:bg-secondary hover:text-foreground hover:translate-x-0.5"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `grid h-5 w-5 place-items-center transition-transform duration-200 ${active ? "text-primary-foreground" : "text-muted-foreground group-hover:scale-110"}`,
						children: item.icon
					}), item.label]
				}), item.badge != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? "bg-white/20 text-white" : "bg-secondary text-foreground"}`,
					children: item.badge
				})]
			}) }, item.to);
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			mobileNavOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setMobileNavOpen(false),
				className: "fixed inset-0 z-40 bg-black/40 lg:hidden animate-in fade-in duration-200",
				"aria-label": "Close navigation menu"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] border-r border-border bg-sidebar lg:hidden animate-in slide-in-from-left duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 pt-4 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-xl bg-primary/10 p-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5 text-primary" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold text-foreground",
									children: "TechBridge"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full",
									children: accentLabel
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMobileNavOpen(false),
							className: "p-2 rounded-lg hover:bg-secondary transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5 text-muted-foreground" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl p-3 bg-gradient-to-r from-primary/10 to-primary/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold",
								children: getUserInitials()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-semibold text-foreground",
									children: getUserName()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-muted-foreground",
									children: getUserRole()
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "max-h-[calc(100vh-14rem)] overflow-y-auto px-3 pb-4",
						children: navSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 first:mt-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 px-3 py-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/60",
									children: section.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70",
									children: section.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-0.5",
								children: renderNavItems(section.items)
							})]
						}, section.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 left-0 right-0 border-t border-border p-3 bg-sidebar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleLogout,
							className: "w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Logout"]
						})
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 hidden w-[270px] border-r border-border bg-sidebar lg:flex lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 pt-4 pb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl bg-primary/10 p-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-6 w-6 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-foreground",
								children: "TechBridge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-[10px] font-medium text-muted-foreground",
								children: [accentLabel, " Portal"]
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 overflow-y-auto px-3 pb-4",
						children: navSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 first:mt-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 px-3 py-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/50",
									children: section.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60",
									children: section.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-0.5",
								children: renderNavItems(section.items)
							})]
						}, section.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border p-3 relative",
						ref: userMenuRef,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setUserMenuOpen(!userMenuOpen),
							className: "w-full flex items-center gap-3 rounded-xl p-2 hover:bg-secondary transition-all duration-200 group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all",
									children: getUserInitials()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium text-foreground",
										children: getUserName()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: getUserRole()
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: `h-4 w-4 text-muted-foreground transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}` })
							]
						}), userMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-full left-3 right-3 mb-1 bg-white dark:bg-gray-900 rounded-xl border border-border shadow-xl overflow-hidden z-50 animate-in slide-in-from-bottom-2 duration-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 border-b border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground text-lg font-semibold",
										children: getUserInitials()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "truncate text-sm font-semibold text-foreground",
												children: getUserName()
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "truncate text-xs text-muted-foreground",
												children: getUserEmail()
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "truncate text-xs text-muted-foreground mt-0.5",
												children: getUserRole()
											})
										]
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/tutor/settings",
									className: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors",
									onClick: () => setUserMenuOpen(false),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground" }), "Profile Settings"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleLogout,
									className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors",
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
						className: "sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-border bg-background/80 px-3 sm:px-6 backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMobileNavOpen(true),
								className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-card lg:hidden hover:bg-secondary transition-colors",
								"aria-label": "Open navigation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-base sm:text-lg font-semibold text-foreground",
								children: title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden xs:inline-block text-xs sm:text-sm text-muted-foreground",
									children: getUserDisplayName()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-px bg-border hidden xs:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] sm:text-xs font-semibold ring-2 ring-primary/5",
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
function TutorLayout() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if ((pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname) === "/tutor") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorAuthPage, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		accent: "tutor",
		title: "Tutor workspace",
		nav: [
			{
				label: "Dashboard",
				to: "/tutor/dashboard",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4" }),
				section: "quick-access"
			},
			{
				label: "My Courses",
				to: "/tutor/courses",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }),
				section: "courses"
			},
			{
				label: "Course Builder",
				to: "/tutor/builder",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePlus, { className: "h-4 w-4" }),
				section: "courses"
			},
			{
				label: "Students",
				to: "/tutor/students",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
				section: "students"
			},
			{
				label: "Assignments",
				to: "/tutor/assignments",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-4 w-4" }),
				section: "students"
			},
			{
				label: "Quizzes",
				to: "/tutor/quizzes",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" }),
				section: "analytics"
			},
			{
				label: "Analytics",
				to: "/tutor/analytics",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4" }),
				section: "analytics"
			},
			{
				label: "Messages",
				to: "/tutor/messages",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }),
				section: "communication"
			},
			{
				label: "Certificates",
				to: "/tutor/certificates",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4" }),
				section: "communication"
			},
			{
				label: "Settings",
				to: "/tutor/settings",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }),
				section: "settings"
			}
		]
	});
}
//#endregion
export { TutorLayout as component };

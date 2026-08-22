import { r as __toESM } from "../_runtime.mjs";
import { A as verifyCertificate, D as markNotificationsRead, O as removeFromWishlist, T as logout, _ as getProfile, a as getAssignments, d as getMe, f as getMeStats, g as getPaymentHistory, h as getNotifications, i as enrollInCourse, l as getCourses, m as getMyEnrollments, p as getMyCertificates, t as apiRequest, u as getLearningPaths, x as getWishlistCourses } from "./api-DKKeFvOu.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Clock, B as Heart, C as RefreshCw, E as Moon, G as Flame, I as Linkedin, K as FileText, L as Library, M as Mail, N as LogOut, P as Lock, Q as Compass, R as LayoutDashboard, S as Rocket, U as Github, V as GraduationCap, W as Funnel, X as Download, Y as ExternalLink, Z as CreditCard, _t as ArrowRight, a as Users, at as ChevronUp, b as Settings, c as Trophy, ct as ChevronDown, d as Target, dt as Calendar, f as Sun, gt as Award, h as Sparkles, ht as Bell, it as CircleAlert, j as MapPin, k as Menu, l as TrendingUp, lt as Check, m as SquarePen, mt as BookMarked, n as X, o as User, ot as ChevronRight, p as Star, pt as BookOpen, rt as CircleCheckBig, s as Twitter, t as Zap, tt as CircleQuestionMark, u as Trash2, ut as Camera, v as Shield, w as Play, x as Search, y as Share2 } from "../_libs/lucide-react.mjs";
import { n as StudentAuthPage, r as useAuth, t as AuthProvider } from "./student-auth-page-DaH5UVo5.mjs";
import { t as Route$14 } from "./student.course._slug-CJggBQf4.mjs";
import { t as Route$15 } from "./student.study._slug-Bqd8WHPN.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C7P06I7I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DKdlUa2-.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary font-semibold text-2xl",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-[14px] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Return home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Try refreshing the page or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-[14px] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-[14px] border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Student Portal — TechBridge Skills Hub" },
			{
				name: "description",
				content: "TechBridge Skills Hub student learning platform."
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$2 = () => import("./routes-C86OFm2O.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Student Portal — TechBridge" }, {
		name: "description",
		content: "Student application for the TechBridge learning experience."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
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
function PortalShell({ nav, navSections, title, user, accent = "student", onLogout }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const accentLabel = accent === "student" ? "Student" : accent === "tutor" ? "Tutor" : "Admin";
	const [mobileNavOpen, setMobileNavOpen] = (0, import_react.useState)(false);
	const [userMenuOpen, setUserMenuOpen] = (0, import_react.useState)(false);
	const userMenuRef = (0, import_react.useRef)(null);
	const safeUser = user ?? {
		name: "Loading…",
		role: accentLabel,
		initials: "…"
	};
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
	const accentColors = {
		student: {
			primary: "bg-blue-600 hover:bg-blue-700 text-white",
			primaryBg: "bg-blue-600",
			primaryHover: "hover:bg-blue-700",
			text: "text-blue-600",
			border: "border-blue-200",
			bg: "bg-blue-50",
			hover: "hover:bg-blue-50",
			ring: "ring-blue-500",
			light: "text-blue-700 bg-blue-50",
			iconBg: "bg-blue-100 text-blue-600"
		},
		tutor: {
			primary: "bg-purple-600 hover:bg-purple-700 text-white",
			primaryBg: "bg-purple-600",
			primaryHover: "hover:bg-purple-700",
			text: "text-purple-600",
			border: "border-purple-200",
			bg: "bg-purple-50",
			hover: "hover:bg-purple-50",
			ring: "ring-purple-500",
			light: "text-purple-700 bg-purple-50",
			iconBg: "bg-purple-100 text-purple-600"
		},
		admin: {
			primary: "bg-blue-600 hover:bg-blue-700 text-white",
			primaryBg: "bg-blue-600",
			primaryHover: "hover:bg-blue-700",
			text: "text-blue-600",
			border: "border-blue-200",
			bg: "bg-blue-50",
			hover: "hover:bg-blue-50",
			ring: "ring-blue-500",
			light: "text-blue-700 bg-blue-50",
			iconBg: "bg-blue-100 text-blue-600"
		}
	};
	const accentStyle = accentColors[accent] || accentColors.student;
	const sections = navSections || [{
		label: "Navigation",
		items: nav
	}];
	const renderNavItems = (items) => {
		return items.map((item) => {
			const active = isActiveItem(item.to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: () => setMobileNavOpen(false),
				className: `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active ? `${accentStyle.primary} shadow-sm` : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-0.5"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `grid h-5 w-5 place-items-center transition-transform duration-200 ${active ? "text-white" : "text-gray-400 dark:text-gray-500 group-hover:scale-110"}`,
						children: item.icon
					}), item.label]
				}), item.badge != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`,
					children: item.badge
				})]
			}) }, item.to);
		});
	};
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
									className: `rounded-xl ${accentStyle.iconBg} p-1.5`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold text-gray-900 dark:text-white",
									children: "TechBridge"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] font-medium ${accentStyle.text} ${accentStyle.bg} px-2 py-0.5 rounded-full`,
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
							className: `flex items-center gap-3 rounded-xl p-3 ${accentStyle.bg} dark:bg-opacity-10`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid h-10 w-10 place-items-center rounded-full ${accentStyle.primaryBg} text-white text-sm font-semibold`,
								children: safeUser.initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-semibold text-gray-900 dark:text-white",
									children: safeUser.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-gray-500 dark:text-gray-400",
									children: safeUser.role
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
								children: renderNavItems(section.items)
							})]
						}, section.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onLogout,
							className: "w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors",
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
								className: `rounded-xl ${accentStyle.iconBg} p-2`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-gray-900 dark:text-white",
								children: "TechBridge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `block text-[10px] font-medium ${accentStyle.text}`,
								children: [accentLabel, " Portal"]
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 overflow-y-auto px-3 pb-4",
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
								children: renderNavItems(section.items)
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
									className: `grid h-9 w-9 place-items-center rounded-full ${accentStyle.primaryBg} text-white text-sm font-semibold ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ${accentStyle.ring} transition-all`,
									children: safeUser.initials
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium text-gray-900 dark:text-white",
										children: safeUser.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-gray-500 dark:text-gray-400",
										children: safeUser.role
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: `h-4 w-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}` })
							]
						}), userMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-full left-3 right-3 mb-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50 animate-in slide-in-from-bottom-2 duration-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 border-b border-gray-200 dark:border-gray-700",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `grid h-12 w-12 place-items-center rounded-full ${accentStyle.primaryBg} text-white text-lg font-semibold`,
										children: safeUser.initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-semibold text-gray-900 dark:text-white",
											children: safeUser.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-xs text-gray-500 dark:text-gray-400",
											children: safeUser.role
										})]
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/student/settings",
									className: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
									onClick: () => setUserMenuOpen(false),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-gray-400 dark:text-gray-500" }), "Profile Settings"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setUserMenuOpen(false);
										if (onLogout) onLogout();
									},
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-base sm:text-lg font-semibold text-gray-900 dark:text-white",
								children: title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden xs:inline-block text-xs sm:text-sm text-gray-500 dark:text-gray-400",
									children: safeUser.name.split(" ")[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-px bg-gray-300 dark:bg-gray-600 hidden xs:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-7 h-7 sm:w-8 sm:h-8 rounded-full ${accentStyle.iconBg} flex items-center justify-center text-[10px] sm:text-xs font-semibold ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ${accentStyle.ring}`,
									children: safeUser.initials
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
var Route$11 = createFileRoute("/student")({
	head: () => ({ meta: [{ title: "Student — TechBridge" }, {
		name: "description",
		content: "Student dashboard for TechBridge Skills Hub."
	}] }),
	component: StudentLayout
});
var ALLOWED_ROLES = ["student", "user"];
function getInitials(name) {
	if (!name) return "ST";
	return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "ST";
}
var NAV_SECTIONS = [
	{
		label: "Quick Access",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-3.5 h-3.5" }),
		items: [{
			label: "Dashboard",
			to: "/student/dashboard",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4" })
		}]
	},
	{
		label: "Courses",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-3.5 h-3.5" }),
		items: [
			{
				label: "Browse Courses",
				to: "/student/explore",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, { className: "h-4 w-4" })
			},
			{
				label: "My Courses",
				to: "/student/my-learning",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "h-4 w-4" })
			},
			{
				label: "My Assignments",
				to: "/student/assignments",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
			},
			{
				label: "Learning Paths",
				to: "/student/paths",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" })
			}
		]
	},
	{
		label: "Progress",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3.5 h-3.5" }),
		items: [{
			label: "Certificates",
			to: "/student/certificates",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4" })
		}, {
			label: "Bookmarks",
			to: "/student/bookmarks",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4" })
		}]
	},
	{
		label: "Settings",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-3.5 h-3.5" }),
		items: [{
			label: "Settings",
			to: "/student/settings",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" })
		}, {
			label: "Account",
			to: "/student/profile",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" })
		}]
	}
];
var FLAT_NAV = NAV_SECTIONS.flatMap((section) => section.items);
function StudentLayout() {
	const router = useRouter();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const normalizedPath = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
	const { user, isLoading } = useAuth();
	const [checking, setChecking] = (0, import_react.useState)(true);
	const onLoginPage = normalizedPath === "/student";
	(0, import_react.useEffect)(() => {
		if (onLoginPage) {
			setChecking(false);
			return;
		}
		let cancelled = false;
		(async () => {
			try {
				if (user) {
					if (!ALLOWED_ROLES.includes(user.role)) await router.navigate({ to: "/student" });
					if (!cancelled) setChecking(false);
					return;
				}
				try {
					const me = await apiRequest("/auth/me/");
					if (cancelled) return;
					if (!me || !ALLOWED_ROLES.includes(me.role)) {
						await router.navigate({ to: "/student" });
						return;
					}
				} catch (error) {
					console.error("Auth check failed:", error);
					if (!cancelled) await router.navigate({ to: "/student" });
				}
			} catch (error) {
				console.error("Auth check failed:", error);
				if (!cancelled) await router.navigate({ to: "/student" });
			} finally {
				if (!cancelled) setChecking(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		onLoginPage,
		router,
		user
	]);
	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout error:", error);
		}
		await router.navigate({ to: "/student" });
	};
	if (onLoginPage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAuthPage, {});
	if (checking || isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading your dashboard…" })]
		})
	});
	if (!user) return null;
	const displayName = user.full_name || user.username || user.email || "Student";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		accent: "student",
		title: "Student Dashboard",
		user: {
			name: displayName,
			role: "Student",
			initials: getInitials(displayName)
		},
		nav: FLAT_NAV,
		navSections: NAV_SECTIONS,
		onLogout: handleLogout
	});
}
var $$splitComponentImporter$1 = () => import("./student.index-uQnxPZ-w.mjs");
var Route$10 = createFileRoute("/student/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var Route$9 = createFileRoute("/student/assignments")({ component: Assignments });
var statusConfig = {
	"pending": {
		label: "Pending",
		className: "bg-amber-50 text-amber-600 border-amber-200",
		icon: CircleAlert
	},
	"submitted": {
		label: "Submitted",
		className: "bg-blue-50 text-blue-600 border-blue-200",
		icon: Clock
	},
	"graded": {
		label: "Graded",
		className: "bg-emerald-50 text-emerald-600 border-emerald-200",
		icon: CircleCheckBig
	},
	"in-progress": {
		label: "In Progress",
		className: "bg-purple-50 text-purple-600 border-purple-200",
		icon: FileText
	},
	"not-started": {
		label: "Not Started",
		className: "bg-gray-50 text-gray-600 border-gray-200",
		icon: CircleAlert
	}
};
var filterOptions = [
	{
		key: "all",
		label: "All"
	},
	{
		key: "pending",
		label: "Pending"
	},
	{
		key: "submitted",
		label: "Submitted"
	},
	{
		key: "graded",
		label: "Graded"
	},
	{
		key: "in-progress",
		label: "In Progress"
	}
];
function Assignments() {
	const [assignments, setAssignments] = (0, import_react.useState)([]);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const loadAssignments = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const data = await getAssignments();
				const mappedData = (Array.isArray(data) ? data : []).map((a) => ({
					...a,
					status: a.status?.toLowerCase() || "pending",
					score: a.score || null,
					maxScore: a.max_score || 100,
					due: a.due || a.due_date || "TBD",
					type: a.type || "Assignment",
					course: a.course || "Course"
				}));
				setAssignments(mappedData);
			} catch (err) {
				console.error("Failed to load assignments:", err);
				setError("Could not load assignments. Please try again.");
				setAssignments([]);
			} finally {
				setIsLoading(false);
			}
		};
		loadAssignments();
	}, []);
	const filteredAssignments = assignments.filter((a) => filter === "all" || a.status === filter).filter((a) => {
		if (!searchQuery) return true;
		const query = searchQuery.toLowerCase();
		return a.title?.toLowerCase().includes(query) || a.course?.toLowerCase().includes(query) || a.type?.toLowerCase().includes(query);
	});
	const stats = {
		total: assignments.length,
		pending: assignments.filter((a) => a.status === "pending").length,
		submitted: assignments.filter((a) => a.status === "submitted").length,
		graded: assignments.filter((a) => a.status === "graded").length,
		inProgress: assignments.filter((a) => a.status === "in-progress").length
	};
	const statsCards = [
		{
			label: "Total",
			value: stats.total,
			color: "blue"
		},
		{
			label: "Pending",
			value: stats.pending,
			color: "amber"
		},
		{
			label: "Submitted",
			value: stats.submitted,
			color: "purple"
		},
		{
			label: "Graded",
			value: stats.graded,
			color: "emerald"
		}
	];
	const colorMap = {
		blue: "bg-blue-50 text-blue-600",
		amber: "bg-amber-50 text-amber-600",
		purple: "bg-purple-50 text-purple-600",
		emerald: "bg-emerald-50 text-emerald-600"
	};
	const getStatusIcon = (status) => {
		const config = statusConfig[status];
		if (!config) return FileText;
		return config.icon;
	};
	const getStatusBadge = (status) => {
		const config = statusConfig[status];
		if (!config) return statusConfig["pending"];
		return config;
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-gray-500",
				children: "Loading assignments..."
			})]
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh] px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md p-6 bg-red-50 rounded-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-red-500 text-4xl mb-4",
					children: "⚠️"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-700 mb-2",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => window.location.reload(),
					className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
					children: "Try again"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900",
					children: "Assignments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 mt-0.5",
					children: "Track your projects and submissions across all courses"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full",
						children: [assignments.length, " total"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4",
				children: statsCards.map((stat) => {
					const colorClass = colorMap[stat.color];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] touch-manipulation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-1.5 sm:p-2 rounded-lg ${colorClass}`,
								children: [
									stat.label === "Total" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
									stat.label === "Pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
									stat.label === "Submitted" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
									stat.label === "Graded" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900",
								children: stat.value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: stat.label
							})] })]
						})
					}, stat.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search assignments...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "w-full rounded-xl border border-gray-200 bg-gray-50 py-2 sm:py-2.5 pl-9 sm:pl-10 pr-3 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1 sm:gap-1.5 overflow-x-auto pb-1",
						children: filterOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setFilter(opt.key),
							className: `px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap active:scale-95 touch-manipulation ${filter === opt.key ? "bg-blue-600 text-white shadow-sm" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`,
							children: [opt.label, opt.key !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `ml-1 sm:ml-1.5 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] ${filter === opt.key ? "bg-white/20" : "bg-gray-200"}`,
								children: stats[opt.key] || 0
							})]
						}, opt.key))
					})]
				})
			}),
			filteredAssignments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-12 md:p-16 text-center shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4",
							children: "📝"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900",
							children: "No assignments found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-gray-500 mt-1",
							children: searchQuery ? "Try adjusting your search or filters" : "Assignments will appear here when available"
						}),
						(searchQuery || filter !== "all") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSearchQuery("");
								setFilter("all");
							},
							className: "mt-4 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium",
							children: "Clear all filters"
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-gray-100",
					children: filteredAssignments.map((a) => {
						const StatusIcon = getStatusIcon(a.status);
						const statusBadge = getStatusBadge(a.status);
						const isGraded = a.status === "graded";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 hover:bg-gray-50/50 transition-colors active:bg-gray-100/50 touch-manipulation",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `p-2 sm:p-2.5 rounded-xl flex-shrink-0 ${a.status === "graded" ? "bg-emerald-50 text-emerald-600" : a.status === "submitted" ? "bg-blue-50 text-blue-600" : a.status === "pending" ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-600"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { className: "h-4 w-4 sm:h-5 sm:w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-1.5 sm:gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm sm:text-base font-semibold text-gray-900 truncate",
											children: a.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full border ${statusBadge.className}`,
											children: statusBadge.label
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-1 sm:gap-3 text-[10px] sm:text-xs text-gray-500 mt-0.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.course || "Course" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden xs:inline",
												children: "·"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.type || "Assignment" }),
											isGraded && a.score !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden xs:inline",
												children: "·"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-emerald-600",
												children: [
													"Score: ",
													a.score,
													"/",
													a.maxScore || 100
												]
											})] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 sm:gap-4 flex-shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[10px] sm:text-xs text-gray-400",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3 sm:h-3.5 sm:w-3.5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden xs:inline",
												children: "Due"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.due || "TBD" })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-gray-300" })]
								})
							]
						}, a.id);
					})
				})
			})
		]
	});
}
var Route$8 = createFileRoute("/student/bookmarks")({ component: Bookmarks });
function Bookmarks() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [removing, setRemoving] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const loadBookmarks = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const data = await getWishlistCourses();
				if (Array.isArray(data)) {
					const wishlistItems = data.map((course, index) => ({
						id: course.id || `item-${index}`,
						course,
						created_at: (/* @__PURE__ */ new Date()).toISOString()
					}));
					setItems(wishlistItems);
				} else setItems([]);
			} catch (err) {
				console.error("Failed to load bookmarks:", err);
				setError("Could not load bookmarks. Please try again.");
				setItems([]);
			} finally {
				setIsLoading(false);
			}
		};
		loadBookmarks();
	}, []);
	const handleRemove = async (courseSlug) => {
		setRemoving(courseSlug);
		try {
			await removeFromWishlist(courseSlug);
			setItems((prev) => prev.filter((item) => item.course.slug !== courseSlug));
		} catch (err) {
			console.error("Failed to remove bookmark:", err);
		} finally {
			setRemoving(null);
		}
	};
	const getLevelColor = (level) => {
		return {
			beginner: "bg-emerald-50 text-emerald-600",
			intermediate: "bg-amber-50 text-amber-600",
			advanced: "bg-red-50 text-red-600"
		}[level?.toLowerCase()] || "bg-gray-50 text-gray-600";
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-gray-500",
				children: "Loading bookmarks..."
			})]
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh] px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md p-6 bg-red-50 rounded-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-red-500 text-4xl mb-4",
					children: "⚠️"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-700 mb-2",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => window.location.reload(),
					className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
					children: "Try again"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900",
					children: "Bookmarks"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 mt-0.5",
					children: "Courses you've saved to study later"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 text-blue-500 fill-blue-500" }),
							items.length,
							" saved"
						]
					})
				})]
			}),
			items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 rounded-lg bg-blue-50 text-blue-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg sm:text-xl font-bold text-gray-900",
								children: items.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: "Total"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 rounded-lg bg-emerald-50 text-emerald-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg sm:text-xl font-bold text-gray-900",
								children: items.reduce((sum, item) => sum + (item.course.students || 0), 0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: "Students"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 rounded-lg bg-purple-50 text-purple-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg sm:text-xl font-bold text-gray-900",
								children: items.length > 0 ? (items.reduce((sum, item) => sum + (item.course.rating || 0), 0) / items.length).toFixed(1) : "0.0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: "Avg. Rating"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 rounded-lg bg-amber-50 text-amber-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg sm:text-xl font-bold text-gray-900",
								children: items.reduce((sum, item) => sum + (item.course.lessons || 0), 0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: "Lessons"
							})] })]
						})
					})
				]
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-12 md:p-16 text-center shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4",
							children: "📚"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900",
							children: "No bookmarks yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-gray-500 mt-1",
							children: "Browse courses and click the heart icon to save them here"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/student/explore",
							className: "mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors",
							children: ["Explore courses", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3.5 w-3.5" })]
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6",
				children: items.map((item) => {
					const course = item.course;
					const isRemoving = removing === course.slug;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-32 sm:h-36 md:h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold relative",
							children: [
								course.title?.[0]?.toUpperCase() || "C",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleRemove(course.slug),
									disabled: isRemoving,
									className: "absolute top-2 right-2 p-1.5 sm:p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-all hover:scale-110 active:scale-95 touch-manipulation disabled:opacity-50",
									title: "Remove bookmark",
									children: isRemoving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full p-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3.5 w-3.5 text-red-500 fill-red-500" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 sm:p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-semibold text-gray-900 truncate text-sm sm:text-base flex-1",
										children: course.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${getLevelColor(course.level)}`,
										children: course.level || "Beginner"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate",
									children: [
										course.instructor || "Instructor",
										" · ",
										course.category || "Course"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-600 mt-1.5 sm:mt-2 line-clamp-2 min-h-[2.5rem]",
									children: course.description || "Learn the fundamentals of this subject"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-0.5 sm:gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }), course.students || 0]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-0.5 sm:gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 text-amber-400 fill-current" }), course.rating?.toFixed(1) || "0.0"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-0.5 sm:gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), course.duration || "TBD"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-0.5 sm:gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3 w-3" }), course.lessons || 0]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mt-3 pt-2 sm:pt-3 border-t border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs sm:text-sm font-semibold text-gray-900",
										children: course.price || "Free"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/student/courses/$slug",
										params: { slug: course.slug },
										className: "text-[10px] sm:text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors",
										children: "View Details →"
									})]
								})
							]
						})]
					}, item.id);
				})
			})
		]
	});
}
var Route$7 = createFileRoute("/student/certificates")({ component: Certificates });
var BGCSS = [
	"from-amber-50 to-amber-100/50",
	"from-blue-50 to-blue-100/50",
	"from-emerald-50 to-emerald-100/50",
	"from-purple-50 to-purple-100/50",
	"from-rose-50 to-rose-100/50",
	"from-cyan-50 to-cyan-100/50"
];
function Certificates() {
	const [certificates, setCertificates] = (0, import_react.useState)([]);
	const [user, setUser] = (0, import_react.useState)(null);
	const [verifyInput, setVerifyInput] = (0, import_react.useState)("");
	const [verifyStatus, setVerifyStatus] = (0, import_react.useState)(null);
	const [verifying, setVerifying] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const loadData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const [certificateList, userData] = await Promise.all([getMyCertificates(), getMe().catch(() => null)]);
				setCertificates(Array.isArray(certificateList) ? certificateList : []);
				setUser(userData);
			} catch (err) {
				console.error("Failed to load certificates:", err);
				setError("Could not load certificates. Please try again.");
				setCertificates([]);
			} finally {
				setIsLoading(false);
			}
		};
		loadData();
	}, []);
	const handleVerify = async () => {
		if (!verifyInput.trim()) return;
		setVerifying(true);
		setVerifyStatus(null);
		try {
			const response = await verifyCertificate(verifyInput.trim());
			if (response?.valid) setVerifyStatus({
				valid: true,
				message: `Certificate "${response.certificate?.course_title || response.certificate?.title}" is valid.`,
				data: response.certificate
			});
			else setVerifyStatus({
				valid: false,
				message: response?.detail || "Certificate not found. Please check the ID and try again."
			});
		} catch (err) {
			setVerifyStatus({
				valid: false,
				message: "Verification failed. Please try again later."
			});
		} finally {
			setVerifying(false);
		}
	};
	const formatDate = (dateString) => {
		if (!dateString) return "Recent";
		try {
			return new Date(dateString).toLocaleDateString("en-US", {
				month: "short",
				year: "numeric"
			});
		} catch {
			return dateString;
		}
	};
	const handleDownload = (cert) => {
		if (cert.pdf_url) {
			window.open(cert.pdf_url, "_blank");
			return;
		}
		const w = window.open("", "_blank");
		if (w) {
			const name = cert.user_name || cert.student_name || cert.recipient_name || user?.full_name || "Learner";
			const title = cert.title || cert.course_title || "Certificate";
			const issued = formatDate(cert.issued_at || cert.issued || (/* @__PURE__ */ new Date()).toISOString());
			const id = cert.credentialId || cert.number || "TBS-2024";
			w.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Certificate</title>
            <style>
              body{font-family:Georgia,serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f5f5f0}
              .c{border:3px solid #2563EB;padding:60px;max-width:700px;text-align:center;background:#fff;border-radius:20px}
              .gold{color:#D4A24E}
              .blue{color:#2563EB}
            </style>
          </head>
          <body>
            <div class="c">
              <p style="font-size:11px;color:#9CA3AF;letter-spacing:.15em;text-transform:uppercase;margin-bottom:30px">Certificate of Completion</p>
              <p style="color:#6B7280;margin:0">This certifies that</p>
              <p style="font-size:36px;font-weight:700;margin:10px 0">${name}</p>
              <p style="color:#6B7280;margin:0">has successfully completed</p>
              <p style="font-size:22px;font-weight:700;color:#2563EB;margin:10px 0">${title}</p>
              <p style="color:#6B7280;font-size:12px;margin-top:30px;border-top:1px solid #e5e7eb;padding-top:20px">
                Issued ${issued} | ID: ${id}
              </p>
            </div>
            <script>window.print();<\/script>
          </body>
        </html>
      `);
			w.document.close();
		}
	};
	const handleShare = async (cert) => {
		const title = cert.title || cert.course_title || "Certificate";
		const id = cert.credentialId || cert.number || "TBS-2024";
		const text = `I earned a TechBridge certificate in "${title}"! ID: ${id}`;
		if (navigator.share) try {
			await navigator.share({
				title: "My Certificate",
				text,
				url: window.location.origin + "/verify/" + id
			});
		} catch (e) {}
		else try {
			await navigator.clipboard?.writeText(text);
		} catch {}
	};
	const getUserName = () => {
		if (user?.full_name) return user.full_name;
		if (user?.first_name && user?.last_name) return `${user.first_name} ${user.last_name}`;
		if (user?.first_name) return user.first_name;
		if (user?.username) return user.username;
		return "Learner";
	};
	const userName = getUserName();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-gray-500",
				children: "Loading certificates..."
			})]
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh] px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md p-6 bg-red-50 rounded-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-red-500 text-4xl mb-4",
					children: "⚠️"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-700 mb-2",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => window.location.reload(),
					className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
					children: "Try again"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900",
					children: "Certificates"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 mt-0.5",
					children: "Verifiable credentials from courses you've completed"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full",
						children: [certificates.length, " certificates"]
					})
				})]
			}),
			certificates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 rounded-lg bg-blue-50 text-blue-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg sm:text-xl font-bold text-gray-900",
								children: certificates.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: "Total"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 rounded-lg bg-emerald-50 text-emerald-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg sm:text-xl font-bold text-gray-900",
								children: certificates.filter((c) => c.is_valid !== false).length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: "Verified"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 rounded-lg bg-purple-50 text-purple-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg sm:text-xl font-bold text-gray-900",
								children: certificates.reduce((sum, c) => sum + (c.verify_count || 0), 0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: "Verifications"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 rounded-lg bg-amber-50 text-amber-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg sm:text-xl font-bold text-gray-900",
								children: certificates.filter((c) => {
									const date = new Date(c.issued_at || c.issued || Date.now());
									const thirtyDaysAgo = /* @__PURE__ */ new Date();
									thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
									return date >= thirtyDaysAgo;
								}).length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: "Last 30 days"
							})] })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 sm:h-5 sm:w-5 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm sm:text-base font-semibold text-gray-900",
							children: "Verify a Certificate"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-gray-500 mb-3",
						children: "Enter a certificate ID to confirm its authenticity"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: verifyInput,
								onChange: (e) => {
									setVerifyInput(e.target.value);
									setVerifyStatus(null);
								},
								onKeyDown: (e) => e.key === "Enter" && handleVerify(),
								placeholder: "Enter certificate ID e.g. TBS-2024-001",
								className: "w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 sm:py-3 pl-9 sm:pl-10 pr-3 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleVerify,
							disabled: verifying || !verifyInput.trim(),
							className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 touch-manipulation min-w-[100px]",
							children: verifying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }), "Verifying..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), "Verify"] })
						})]
					}),
					verifyStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `mt-3 rounded-xl p-3 sm:p-4 text-xs sm:text-sm flex items-start gap-2 ${verifyStatus.valid ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`,
						children: [verifyStatus.valid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 flex-shrink-0 mt-0.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: verifyStatus.message })]
					})
				]
			}),
			certificates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-12 md:p-16 text-center shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4",
							children: "🏅"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900",
							children: "No certificates yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-gray-500 mt-1",
							children: "Complete a course to earn your first certificate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/student/explore",
							className: "mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors",
							children: ["Explore courses", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })]
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6",
				children: certificates.map((cert, index) => {
					const bgClass = BGCSS[index % BGCSS.length];
					const title = cert.title || cert.course_title || "Certificate";
					const issued = formatDate(cert.issued_at || cert.issued || (/* @__PURE__ */ new Date()).toISOString());
					const id = cert.credentialId || cert.number || "TBS-2024";
					const name = cert.user_name || cert.student_name || cert.recipient_name || userName;
					const instructor = cert.instructor || "TechBridge Instructor";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `p-4 sm:p-6 bg-gradient-to-br ${bgClass}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400",
											children: "Certificate of Completion"
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5 sm:h-6 sm:w-6 text-amber-500" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] sm:text-xs text-gray-500",
										children: "This certifies that"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-0.5",
										children: name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] sm:text-xs text-gray-500 mt-2",
										children: "has successfully completed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base sm:text-lg md:text-xl font-semibold text-blue-600 mt-0.5",
										children: title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-end justify-between gap-2 mt-4 pt-3 border-t border-gray-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] sm:text-xs text-gray-400",
											children: ["Issued ", issued]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] sm:text-xs text-gray-400",
											children: ["ID: ", id]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs sm:text-sm font-medium text-gray-700",
												children: instructor
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] sm:text-xs text-gray-400",
												children: "TechBridge Skills Hub"
											})]
										})]
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 bg-gray-50/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-[10px] sm:text-xs text-emerald-600",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verified credential" }),
									cert.verify_count !== void 0 && cert.verify_count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-gray-400 text-[10px]",
										children: [
											"· ",
											cert.verify_count,
											" verifications"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-1.5 sm:gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleDownload(cert),
										className: "inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium hover:bg-gray-50 transition-colors active:scale-95 touch-manipulation",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden xs:inline",
											children: "Download"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleShare(cert),
										className: "inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium hover:bg-gray-50 transition-colors active:scale-95 touch-manipulation",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden xs:inline",
											children: "Share"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											const url = `https://verify.techbridge.com/${id}`;
											window.open(url, "_blank");
										},
										className: "inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-white hover:bg-blue-700 transition-colors active:scale-95 touch-manipulation",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden xs:inline",
											children: "Verify"
										})]
									})
								]
							})]
						})]
					}, cert.id || index);
				})
			})
		]
	});
}
var Route$6 = createFileRoute("/student/dashboard")({ component: Dashboard });
function Dashboard() {
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [enrollments, setEnrollments] = (0, import_react.useState)([]);
	const [certificates, setCertificates] = (0, import_react.useState)([]);
	const [stats, setStats] = (0, import_react.useState)({
		streak: 0,
		weekly_hours: 0,
		weekly_goal_hours: 10,
		courses_completed: 0,
		level: 0,
		xp: 0
	});
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [user, setUser] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function load() {
			setIsLoading(true);
			try {
				try {
					const profile = await getProfile();
					setUser(profile);
				} catch (e) {
					console.error("Profile fetch failed:", e);
				}
				let courseList = [];
				try {
					const data = await getCourses();
					courseList = Array.isArray(data) ? data : [];
					setCourses(courseList);
				} catch (e) {
					console.error("Courses fetch failed:", e);
					setCourses([]);
				}
				try {
					const statsData = await getMeStats();
					if (statsData) setStats({
						streak: statsData.streak_days || 0,
						weekly_hours: statsData.weekly_hours || 0,
						weekly_goal_hours: statsData.weekly_goal_hours || 10,
						courses_completed: statsData.courses_completed || 0,
						level: statsData.level || 0,
						xp: statsData.xp || 0,
						total_students: statsData.total_students || 0,
						total_courses: statsData.total_courses || 0
					});
				} catch (e) {
					console.error("Stats fetch failed:", e);
				}
				try {
					const enrollmentData = await getMyEnrollments();
					setEnrollments(Array.isArray(enrollmentData) ? enrollmentData : []);
				} catch (e) {
					console.error("Enrollments fetch failed:", e);
					setEnrollments([]);
				}
				try {
					const certData = await getMyCertificates();
					setCertificates(Array.isArray(certData) ? certData : []);
				} catch (e) {
					console.error("Certificates fetch failed:", e);
					setCertificates([]);
				}
			} catch (error) {
				console.error("Error loading dashboard:", error);
			} finally {
				setIsLoading(false);
			}
		}
		load();
	}, []);
	const today = /* @__PURE__ */ new Date();
	const dayName = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	][today.getDay()];
	const monthName = today.toLocaleString("default", { month: "long" });
	const h = today.getHours();
	const greeting = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
	const name = user?.first_name || user?.username || "Student";
	const inProgress = enrollments.filter((e) => e.status === "active" || (e.progress || 0) > 0 && (e.progress || 0) < 100);
	const recommended = courses.filter((c) => (c.progress ?? 0) <= 0);
	enrollments.filter((e) => (e.progress || 0) >= 100);
	const weeklyGoal = stats.weekly_goal_hours || 10;
	const weeklyProgress = Math.min(100, Math.round((stats.weekly_hours || 0) / weeklyGoal * 100));
	const DAYS = [
		"M",
		"T",
		"W",
		"T",
		"F",
		"S",
		"S"
	];
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-gray-500",
				children: "Loading your dashboard..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-gray-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm sm:text-base text-blue-100 font-medium",
										children: [
											dayName,
											", ",
											today.getDate(),
											" ",
											monthName
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-2xl sm:text-3xl lg:text-4xl font-bold mt-1",
										children: [
											greeting,
											", ",
											name,
											"! 👋"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-blue-100 text-sm sm:text-base",
										children: stats.streak > 0 ? `🔥 ${stats.streak}-day learning streak! Keep it up!` : "Start your learning journey today!"
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-2xl font-bold",
												children: stats.xp || 0
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-blue-100",
												children: "XP"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-px bg-white/20" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-2xl font-bold",
												children: stats.level || 0
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-blue-100",
												children: "Level"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-px bg-white/20" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-2xl font-bold",
												children: stats.courses_completed || 0
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-blue-100",
												children: "Completed"
											})]
										})
									]
								})]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						{
							icon: Flame,
							label: "Learning Streak",
							value: stats.streak || 0,
							unit: "days",
							color: "orange",
							bgColor: "bg-orange-50",
							textColor: "text-orange-600",
							iconColor: "text-orange-500"
						},
						{
							icon: Trophy,
							label: "Courses Completed",
							value: stats.courses_completed || 0,
							unit: "courses",
							color: "amber",
							bgColor: "bg-amber-50",
							textColor: "text-amber-600",
							iconColor: "text-amber-500"
						},
						{
							icon: BookOpen,
							label: "In Progress",
							value: inProgress.length,
							unit: "courses",
							color: "blue",
							bgColor: "bg-blue-50",
							textColor: "text-blue-600",
							iconColor: "text-blue-500"
						},
						{
							icon: Award,
							label: "Certificates",
							value: certificates.length,
							unit: "earned",
							color: "emerald",
							bgColor: "bg-emerald-50",
							textColor: "text-emerald-600",
							iconColor: "text-emerald-500"
						}
					].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-2xl font-bold text-gray-900",
									children: stat.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 mt-0.5",
									children: stat.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-gray-400 mt-0.5",
									children: stat.unit
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-2 rounded-lg ${stat.bgColor}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(stat.icon, { className: `h-4 w-4 ${stat.iconColor}` })
							})]
						})
					}, stat.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 xl:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "xl:col-span-2 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold text-gray-900",
									children: "Continue Learning"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 mt-0.5",
									children: "Pick up where you left off"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/student/my-learning",
									className: "text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1",
									children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: inProgress.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center py-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-gray-500",
											children: "No courses in progress"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/student/explore",
											className: "inline-block mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium",
											children: "Browse courses →"
										})
									]
								}) : inProgress.slice(0, 3).map((e) => {
									const course = e.course;
									const progress = e.progress || 0;
									if (!course) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/student/study/$slug",
										params: { slug: course.slug },
										className: "group flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all active:scale-[0.98]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden shrink-0",
												children: course.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: course.thumbnail,
													alt: course.title,
													className: "h-full w-full object-cover"
												}) : course.title?.[0]?.toUpperCase() || "C"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 text-xs text-gray-500",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "truncate",
																children: course.category || "Course"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "truncate",
																children: course.instructor || "Instructor"
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors",
														children: course.title
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-2 flex items-center gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex-1 h-1.5 overflow-hidden rounded-full bg-gray-200",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "h-full rounded-full bg-blue-600 transition-all duration-1000",
																style: { width: `${Math.min(progress, 100)}%` }
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs font-semibold text-gray-900 min-w-[32px] text-right",
															children: [Math.round(progress), "%"]
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" })
										]
									}, course.id);
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end justify-between gap-2 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold text-gray-900",
									children: "Recommended for You"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 mt-0.5",
									children: "Based on your learning preferences"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/student/explore",
									className: "text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1",
									children: ["Explore all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
								children: recommended.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-full text-center py-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500",
										children: "No recommendations available"
									})]
								}) : recommended.slice(0, 3).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/student/course/$slug",
									params: { slug: c.slug },
									className: "group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 active:scale-[0.98]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-36 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden",
										children: c.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: c.thumbnail,
											alt: c.title,
											className: "h-full w-full object-cover"
										}) : c.title?.[0]?.toUpperCase() || "C"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-semibold text-gray-900 truncate text-sm",
												children: c.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-gray-500 mt-0.5 truncate",
												children: [
													c.category || "Course",
													" · ",
													c.level || "All levels"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mt-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-medium text-gray-500",
													children: [c.students || 0, " students"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors flex items-center gap-1",
													children: ["View course", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3 group-hover:translate-x-0.5 transition-transform" })]
												})]
											})
										]
									})]
								}, c.id))
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-semibold text-gray-900",
											children: "Weekly Goal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4 text-blue-600" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-2xl font-bold text-gray-900",
											children: stats.weekly_hours || 0
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm text-gray-500",
											children: [
												"/ ",
												weeklyGoal,
												" hrs"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 h-2 overflow-hidden rounded-full bg-gray-200",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-blue-600 transition-all duration-1000",
											style: { width: `${weeklyProgress}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 grid grid-cols-7 gap-1",
										children: DAYS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-8 w-full rounded-md transition-colors ${i < Math.min(3, Math.ceil((stats.weekly_hours || 0) / 2)) ? "bg-blue-600" : i === 3 ? "bg-blue-400" : "bg-gray-200"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 text-[10px] text-gray-500",
												children: d
											})]
										}, i))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-gray-900 mb-3",
									children: "Quick Actions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [
										{
											icon: Search,
											label: "Explore",
											to: "/student/explore",
											color: "blue"
										},
										{
											icon: BookOpen,
											label: "My Learning",
											to: "/student/my-learning",
											color: "purple"
										},
										{
											icon: Award,
											label: "Certificates",
											to: "/student/certificates",
											color: "amber"
										},
										{
											icon: Settings,
											label: "Settings",
											to: "/student/settings",
											color: "gray"
										}
									].map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: action.to,
										className: "flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-gray-50 transition-colors active:scale-[0.98]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(action.icon, { className: `h-5 w-5 text-${action.color}-500` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium text-gray-700",
											children: action.label
										})]
									}, action.label))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold text-gray-900",
										children: "Recent Certificates"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4 text-amber-500" })]
								}), certificates.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [certificates.slice(0, 2).map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5 text-amber-500" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium text-gray-900 truncate",
												children: cert.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500 truncate",
												children: cert.instructor
											})]
										})]
									}, cert.id)), certificates.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/student/certificates",
										className: "block text-center text-xs text-blue-600 hover:text-blue-700 font-medium pt-1",
										children: [
											"View all ",
											certificates.length,
											" certificates →"
										]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500",
										children: "No certificates yet"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400 mt-1",
										children: "Complete a course to earn one!"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
								className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4 sm:p-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-2 rounded-lg bg-blue-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-5 w-5 text-blue-600" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-sm font-semibold text-gray-900",
												children: "Need help?"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-600 mt-0.5",
												children: "Check our FAQs or contact support"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/student/help",
												className: "inline-block mt-2 text-xs font-medium text-blue-600 hover:text-blue-700",
												children: "Get support →"
											})
										]
									})]
								})
							})
						]
					})]
				})
			]
		})
	});
}
var Route$5 = createFileRoute("/student/explore")({ component: Explore });
var categories = [
	"All",
	"Networking",
	"Cybersecurity",
	"Software Engineering",
	"Artificial Intelligence",
	"Cloud Computing",
	"Data Science"
];
var levels = [
	"Any level",
	"Beginner",
	"Intermediate",
	"Advanced"
];
var sortOptions = [
	"Most popular",
	"Highest rated",
	"Newest",
	"Most students"
];
function Explore() {
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [filteredCourses, setFilteredCourses] = (0, import_react.useState)([]);
	const [cat, setCat] = (0, import_react.useState)("All");
	const [level, setLevel] = (0, import_react.useState)("Any level");
	const [q, setQ] = (0, import_react.useState)("");
	const [sortBy, setSortBy] = (0, import_react.useState)("Most popular");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [enrolled, setEnrolled] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [enrolling, setEnrolling] = (0, import_react.useState)(null);
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const loadCourses = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const data = await getCourses();
				setCourses(Array.isArray(data) ? data : []);
			} catch (err) {
				console.error("Failed to load courses:", err);
				setError("Could not load courses. Please try again.");
				setCourses([]);
			} finally {
				setIsLoading(false);
			}
		};
		loadCourses();
	}, []);
	(0, import_react.useEffect)(() => {
		const loadEnrollments = async () => {
			try {
				const data = await getMyEnrollments();
				const enrolledSlugs = new Set((Array.isArray(data) ? data : []).filter((e) => e.course?.slug).map((e) => e.course.slug));
				setEnrolled(enrolledSlugs);
			} catch (err) {
				console.error("Failed to load enrollments:", err);
			}
		};
		loadEnrollments();
	}, []);
	(0, import_react.useEffect)(() => {
		let filtered = [...courses];
		if (q) {
			const query = q.toLowerCase();
			filtered = filtered.filter((c) => c.title?.toLowerCase().includes(query) || c.instructor?.toLowerCase().includes(query) || c.category?.toLowerCase().includes(query) || c.description?.toLowerCase().includes(query));
		}
		if (cat !== "All") filtered = filtered.filter((c) => c.category?.toLowerCase().includes(cat.toLowerCase()));
		if (level !== "Any level") filtered = filtered.filter((c) => c.level?.toLowerCase() === level.toLowerCase());
		switch (sortBy) {
			case "Most popular":
				filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
				break;
			case "Highest rated":
				filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
				break;
			case "Newest": break;
			case "Most students":
				filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
				break;
			default: break;
		}
		setFilteredCourses(filtered);
	}, [
		courses,
		q,
		cat,
		level,
		sortBy
	]);
	const handleEnroll = async (course) => {
		if (enrolled.has(course.slug)) return;
		setEnrolling(course.slug);
		try {
			await enrollInCourse(course.slug);
			setEnrolled((prev) => /* @__PURE__ */ new Set([...prev, course.slug]));
		} catch (err) {
			console.error("Enrollment failed:", err);
		} finally {
			setEnrolling(null);
		}
	};
	const clearFilters = () => {
		setQ("");
		setCat("All");
		setLevel("Any level");
		setSortBy("Most popular");
	};
	const hasActiveFilters = q || cat !== "All" || level !== "Any level";
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-gray-500",
				children: "Loading courses..."
			})]
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh] px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md p-6 bg-red-50 rounded-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-red-500 text-4xl mb-4",
					children: "⚠️"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-700 mb-2",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => window.location.reload(),
					className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
					children: "Try again"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900",
					children: "Explore courses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs sm:text-sm text-gray-500 mt-0.5",
					children: [
						"Browse ",
						filteredCourses.length || courses.length,
						" courses taught by industry experts"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full",
						children: [filteredCourses.length, " results"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col lg:flex-row lg:items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search by topic, tool or instructor…",
								className: "w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 sm:py-3 pl-9 sm:pl-10 pr-3 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterMenu, {
								label: level,
								options: levels,
								onChange: setLevel,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setShowFilters(!showFilters),
								className: "inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors active:scale-95 touch-manipulation",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden xs:inline",
									children: "Filters"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2",
						children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCat(c),
							className: `px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all active:scale-95 touch-manipulation ${cat === c ? "bg-blue-600 text-white shadow-sm" : "border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
							children: c
						}, c))
					}),
					hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: "Active filters:"
							}),
							q && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs",
								children: [
									"Search: ",
									q,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQ(""),
										className: "hover:text-blue-900",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
									})
								]
							}),
							cat !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs",
								children: [cat, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCat("All"),
									className: "hover:text-blue-900",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
								})]
							}),
							level !== "Any level" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs",
								children: [level, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setLevel("Any level"),
									className: "hover:text-blue-900",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: clearFilters,
								className: "text-[10px] sm:text-xs text-gray-400 hover:text-gray-600",
								children: "Clear all"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs sm:text-sm text-gray-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-gray-900",
						children: filteredCourses.length
					}), " results"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] sm:text-xs text-gray-400",
						children: "Sort by"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterMenu, {
						label: sortBy,
						options: sortOptions,
						onChange: setSortBy,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
					})]
				})]
			}),
			filteredCourses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-12 sm:py-16 md:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gray-500 font-medium",
						children: "No courses found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-gray-400 mt-1",
						children: "Try adjusting your search or filters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: clearFilters,
						className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm",
						children: "Clear all filters"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6",
				children: filteredCourses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard$1, {
					course,
					isEnrolled: enrolled.has(course.slug),
					isEnrolling: enrolling === course.slug,
					onEnroll: () => handleEnroll(course)
				}, course.id))
			})
		]
	});
}
function FilterMenu({ label, options, onChange, icon }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen(!open),
			className: "inline-flex items-center justify-between gap-1.5 sm:gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors min-w-[100px] sm:min-w-[120px] active:scale-95 touch-manipulation",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: label
			}), icon || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-40",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute right-0 z-50 mt-1 sm:mt-2 w-48 sm:w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					onChange(o);
					setOpen(false);
				},
				className: `block w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm hover:bg-gray-50 transition-colors ${o === label ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"}`,
				children: o
			}, o))
		})] })]
	});
}
function CourseCard$1({ course, isEnrolled, isEnrolling, onEnroll }) {
	const getLevelColor = (level) => {
		return {
			beginner: "bg-emerald-50 text-emerald-600",
			intermediate: "bg-amber-50 text-amber-600",
			advanced: "bg-red-50 text-red-600"
		}[level?.toLowerCase() ?? ""] || "bg-gray-50 text-gray-600";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/student/course/$slug",
		params: { slug: course.slug },
		className: "block bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `h-32 sm:h-36 md:h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold relative overflow-hidden`,
			children: [course.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: course.thumbnail,
				alt: course.title,
				className: "h-full w-full object-cover"
			}) : course.title?.[0]?.toUpperCase() || "C", course.progress !== void 0 && course.progress > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 left-0 right-0 h-1 bg-black/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-white transition-all duration-1000",
					style: { width: `${Math.min(course.progress, 100)}%` }
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3 sm:p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold text-gray-900 truncate text-sm sm:text-base flex-1",
						children: course.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${getLevelColor(course.level)}`,
						children: course.level || "Beginner"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate",
					children: [
						course.instructor || "Instructor",
						" · ",
						course.category || "Course"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-0.5 sm:gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }), course.students || 0]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-0.5 sm:gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 text-amber-400 fill-current" }), course.rating?.toFixed(1) || "0.0"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-0.5 sm:gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), course.duration || "TBD"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mt-3 pt-2 sm:pt-3 border-t border-gray-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs sm:text-sm font-semibold text-gray-900",
						children: course.price || "Free"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (event) => {
							event.preventDefault();
							event.stopPropagation();
							onEnroll();
						},
						disabled: isEnrolled || isEnrolling,
						className: `px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 touch-manipulation ${isEnrolled ? "bg-emerald-50 text-emerald-600 cursor-default" : isEnrolling ? "bg-gray-100 text-gray-400 cursor-wait" : "bg-blue-600 text-white hover:bg-blue-700"}`,
						children: isEnrolled ? "✓ Enrolled" : isEnrolling ? "Enrolling…" : "Enroll"
					})]
				})
			]
		})]
	});
}
var Route$4 = createFileRoute("/student/my-learning")({ component: MyLearning });
var tabs = [
	{
		key: "in-progress",
		label: "In Progress",
		icon: Play
	},
	{
		key: "completed",
		label: "Completed",
		icon: CircleCheckBig
	},
	{
		key: "wishlist",
		label: "Wishlist",
		icon: Heart
	}
];
function MyLearning() {
	const [enrollments, setEnrollments] = (0, import_react.useState)([]);
	const [wishlistCourses, setWishlistCourses] = (0, import_react.useState)([]);
	const [tab, setTab] = (0, import_react.useState)("in-progress");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const loadData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const enrollmentData = await getMyEnrollments();
				setEnrollments(Array.isArray(enrollmentData) ? enrollmentData : []);
				try {
					const wishlistData = await getWishlistCourses();
					setWishlistCourses(Array.isArray(wishlistData) ? wishlistData : []);
				} catch (e) {
					console.error("Failed to load wishlist:", e);
					setWishlistCourses([]);
				}
			} catch (err) {
				console.error("Failed to load learning data:", err);
				setError("Could not load your courses. Please try again.");
			} finally {
				setIsLoading(false);
			}
		};
		loadData();
	}, []);
	const courses = enrollments.filter((e) => e.course).map((e) => ({
		...e.course,
		progress: e.progress ?? e.course?.progress ?? 0,
		enrollmentStatus: e.status,
		enrolledAt: e.enrolledAt
	}));
	const inProgress = courses.filter((c) => (c.progress ?? 0) < 100);
	const completed = courses.filter((c) => (c.progress ?? 0) >= 100);
	const wishlist = wishlistCourses;
	const getTabContent = () => {
		switch (tab) {
			case "in-progress": return {
				items: inProgress,
				emptyMessage: "No courses in progress",
				emptySub: "Enroll in a course to start learning"
			};
			case "completed": return {
				items: completed,
				emptyMessage: "No completed courses yet",
				emptySub: "Complete a course to see it here"
			};
			case "wishlist": return {
				items: wishlist,
				emptyMessage: "Your wishlist is empty",
				emptySub: "Save courses you're interested in"
			};
			default: return {
				items: [],
				emptyMessage: "No courses",
				emptySub: ""
			};
		}
	};
	const { items: displayItems, emptyMessage, emptySub } = getTabContent();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-gray-500",
				children: "Loading your courses..."
			})]
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh] px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md p-6 bg-red-50 rounded-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-red-500 text-4xl mb-4",
					children: "⚠️"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-700 mb-2",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => window.location.reload(),
					className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
					children: "Try again"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900",
					children: "My Learning"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 mt-0.5",
					children: "Continue where you left off, revisit completed courses, or plan what's next"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full",
						children: [inProgress.length + completed.length, " total"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-1.5 sm:p-2 shadow-sm overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-0.5 sm:gap-1 min-w-max",
					children: tabs.map((t) => {
						const Icon = t.icon;
						const isActive = tab === t.key;
						const count = t.key === "in-progress" ? inProgress.length : t.key === "completed" ? completed.length : wishlist.length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setTab(t.key),
							className: `flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all active:scale-95 touch-manipulation ${isActive ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-3.5 w-3.5 sm:h-4 sm:w-4 ${isActive ? "text-white" : "text-gray-400"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden xs:inline",
									children: t.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline xs:hidden",
									children: t.label.split(" ")[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"}`,
									children: count
								})
							]
						}, t.key);
					})
				})
			}),
			displayItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-12 md:p-16 text-center shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4",
							children: tab === "in-progress" ? "📚" : tab === "completed" ? "🎓" : "❤️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900",
							children: emptyMessage
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-gray-500 mt-1",
							children: emptySub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/student/explore",
							className: "mt-4 sm:mt-5 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors active:scale-95 touch-manipulation",
							children: ["Browse courses", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })]
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6",
				children: displayItems.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, {
					course,
					tab
				}, course.id))
			})
		]
	});
}
function CourseCard({ course, tab }) {
	const progress = course.progress || 0;
	const isCompleted = progress >= 100;
	const isInProgress = progress > 0 && progress < 100;
	const getLevelColor = (level) => {
		return {
			beginner: "bg-emerald-50 text-emerald-600",
			intermediate: "bg-amber-50 text-amber-600",
			advanced: "bg-red-50 text-red-600"
		}[level?.toLowerCase() ?? ""] || "bg-gray-50 text-gray-600";
	};
	const getStatusBadge = () => {
		if (isCompleted) return {
			text: "Completed",
			className: "bg-emerald-50 text-emerald-600"
		};
		if (isInProgress) return {
			text: "In Progress",
			className: "bg-blue-50 text-blue-600"
		};
		return {
			text: "Not Started",
			className: "bg-gray-50 text-gray-600"
		};
	};
	const status = getStatusBadge();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/student/study/$slug",
		params: { slug: course.slug },
		className: "group bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `h-32 sm:h-36 md:h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold relative overflow-hidden`,
			children: [
				course.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: course.thumbnail,
					alt: course.title,
					className: "h-full w-full object-cover"
				}) : course.title?.[0]?.toUpperCase() || "C",
				tab !== "wishlist" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-0 left-0 right-0 h-1 bg-black/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-white transition-all duration-1000",
						style: { width: `${Math.min(progress, 100)}%` }
					})
				}),
				tab === "wishlist" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 text-white fill-white" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3 sm:p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold text-gray-900 truncate text-sm sm:text-base flex-1",
						children: course.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${getLevelColor(course.level)}`,
						children: course.level || "Beginner"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate",
					children: [
						course.instructor || "Instructor",
						" · ",
						course.category || "Course"
					]
				}),
				tab !== "wishlist" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 sm:mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mb-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-gray-700",
							children: [Math.round(progress), "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 sm:h-2 overflow-hidden rounded-full bg-gray-200",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-full rounded-full transition-all duration-1000 ${isCompleted ? "bg-emerald-500" : "bg-blue-600"}`,
							style: { width: `${Math.min(progress, 100)}%` }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-0.5 sm:gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }), course.students || 0]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-0.5 sm:gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 text-amber-400 fill-current" }), course.rating?.toFixed(1) || "0.0"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-0.5 sm:gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), course.duration || "TBD"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mt-3 pt-2 sm:pt-3 border-t border-gray-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${status.className}`,
						children: status.text
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs sm:text-sm font-semibold text-gray-900",
						children: course.price || "Free"
					})]
				})
			]
		})]
	});
}
var Route$3 = createFileRoute("/student/paths")({ component: LearningPaths });
function LearningPaths() {
	const [paths, setPaths] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [selectedPath, setSelectedPath] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const loadPaths = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const data = await getLearningPaths();
				setPaths(Array.isArray(data) ? data : []);
			} catch (err) {
				console.error("Failed to load learning paths:", err);
				setError("Could not load learning paths. Please try again.");
				setPaths([]);
			} finally {
				setIsLoading(false);
			}
		};
		loadPaths();
	}, []);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-gray-500",
				children: "Loading learning paths..."
			})]
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh] px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md p-6 bg-red-50 rounded-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-red-500 text-4xl mb-4",
					children: "⚠️"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-700 mb-2",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => window.location.reload(),
					className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
					children: "Try again"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900",
				children: "Learning Paths"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-gray-500 mt-0.5",
				children: "Follow guided tracks that combine courses, projects, and milestones"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full",
					children: [paths.length, " paths"]
				})
			})]
		}), paths.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-12 md:p-16 text-center shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4",
						children: "🧭"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base sm:text-lg font-semibold text-gray-900",
						children: "No learning paths available"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-gray-500 mt-1",
						children: "Check back later for new guided learning tracks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/student/explore",
						className: "mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors",
						children: ["Explore courses", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
					})
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6",
			children: paths.map((path, index) => {
				const isFeatured = path.featured || index === 0;
				const progress = path.completed || 0;
				const totalSteps = path.steps || path.courses?.length || path.course_count || 5;
				const progressPercent = Math.min(100, Math.round(progress / totalSteps * 100));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `bg-white rounded-xl sm:rounded-2xl border ${isFeatured ? "border-blue-300 shadow-md" : "border-gray-200 shadow-sm"} overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation`,
					children: [isFeatured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-1.5 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-white flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), "Featured Path"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-blue-200",
							children: "Recommended"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 sm:p-5 md:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-1.5 rounded-lg bg-blue-50 text-blue-600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider",
											children: path.category || "Learning Path"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1.5 text-base sm:text-lg font-semibold text-gray-900 truncate",
										children: path.title || path.name || "Guided Pathway"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${path.level?.toLowerCase() === "beginner" ? "bg-emerald-50 text-emerald-600" : path.level?.toLowerCase() === "intermediate" ? "bg-amber-50 text-amber-600" : path.level?.toLowerCase() === "advanced" ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"}`,
										children: path.level || "All Levels"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2",
								children: path.description || path.summary || "A recommended route for your next career milestone."
							}),
							progress > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mb-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-gray-700",
										children: [progressPercent, "%"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 sm:h-2 overflow-hidden rounded-full bg-gray-200",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-blue-600 transition-all duration-1000",
										style: { width: `${progressPercent}%` }
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3 sm:gap-4 mt-3 pt-3 border-t border-gray-100",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-[10px] sm:text-xs text-gray-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }),
											path.courses?.length || path.course_count || 0,
											" courses"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-[10px] sm:text-xs text-gray-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }), path.duration || "Flexible"]
									}),
									path.students !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-[10px] sm:text-xs text-gray-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5" }), path.students.toLocaleString()]
									}),
									path.rating !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-[10px] sm:text-xs text-gray-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 text-amber-400 fill-current" }), path.rating.toFixed(1)]
									})
								]
							}),
							path.skills && path.skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-1 mt-3",
								children: [path.skills.slice(0, 3).map((skill, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8px] sm:text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full",
									children: skill
								}, i)), path.skills.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[8px] sm:text-[10px] px-2 py-0.5 text-gray-400",
									children: [
										"+",
										path.skills.length - 3,
										" more"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: `/student/path/$slug`,
								params: { slug: path.slug || path.id || "path" },
								className: "mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors active:scale-95 touch-manipulation",
								children: [progress > 0 ? "Continue Path" : "Start Path", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
							})
						]
					})]
				}, path.slug || path.id || index);
			})
		})]
	});
}
var Route$2 = createFileRoute("/student/profile")({ component: Account });
async function patchProfile$1(data) {
	return await apiRequest("/auth/me/", {
		method: "PATCH",
		body: JSON.stringify(data)
	});
}
function Account() {
	const { user } = useAuth();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		first_name: "",
		last_name: "",
		bio: "",
		headline: "",
		phone: "",
		website: "",
		linkedin: "",
		twitter: "",
		github: "",
		location: "",
		learning_goal: ""
	});
	(0, import_react.useEffect)(() => {
		const loadData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const profileData = await getMe().catch(() => null);
				if (profileData) {
					setProfile(profileData);
					setFormData({
						first_name: profileData.first_name || "",
						last_name: profileData.last_name || "",
						bio: profileData.bio || "",
						headline: profileData.headline || "",
						phone: profileData.phone || "",
						website: profileData.website || "",
						linkedin: profileData.linkedin || "",
						twitter: profileData.twitter || "",
						github: profileData.github || "",
						location: profileData.location || profileData.country || "",
						learning_goal: profileData.learning_goal || ""
					});
				}
			} catch (err) {
				console.error("Failed to load profile:", err);
				setError("Could not load profile. Please try again.");
			} finally {
				setIsLoading(false);
			}
		};
		loadData();
	}, []);
	const handleSave = async (e) => {
		e.preventDefault();
		setIsSaving(true);
		setError(null);
		setSuccess(null);
		try {
			const updated = await patchProfile$1({
				first_name: formData.first_name,
				last_name: formData.last_name,
				bio: formData.bio,
				headline: formData.headline,
				phone: formData.phone,
				website: formData.website,
				linkedin: formData.linkedin,
				twitter: formData.twitter,
				github: formData.github,
				location: formData.location,
				learning_goal: formData.learning_goal
			});
			setProfile(updated);
			setSuccess("Profile updated successfully!");
			setIsEditing(false);
			setTimeout(() => setSuccess(null), 3e3);
		} catch (err) {
			setError("Failed to update profile. Please try again.");
			console.error("Profile update error:", err);
		} finally {
			setIsSaving(false);
		}
	};
	const getInitials = () => {
		if (profile?.full_name) {
			const names = profile.full_name.split(" ");
			if (names.length >= 2) return (names[0][0] + names[1][0]).toUpperCase();
			return names[0][0].toUpperCase();
		}
		if (profile?.first_name) return profile.first_name[0]?.toUpperCase() || "U";
		return "U";
	};
	const stats = [
		{
			icon: Award,
			label: "XP",
			value: profile?.xp || 0,
			color: "from-amber-400 to-amber-600",
			bg: "bg-amber-50"
		},
		{
			icon: TrendingUp,
			label: "Level",
			value: profile?.level || 1,
			color: "from-blue-400 to-blue-600",
			bg: "bg-blue-50"
		},
		{
			icon: GraduationCap,
			label: "Courses",
			value: profile?.courses_completed || 0,
			color: "from-emerald-400 to-emerald-600",
			bg: "bg-emerald-50"
		},
		{
			icon: Flame,
			label: "Streak",
			value: `${profile?.streak_days || 0}d`,
			color: "from-orange-400 to-orange-600",
			bg: "bg-orange-50"
		}
	];
	const socialLinks = [
		{
			key: "linkedin",
			icon: Linkedin,
			label: "LinkedIn",
			color: "text-blue-600"
		},
		{
			key: "twitter",
			icon: Twitter,
			label: "Twitter",
			color: "text-sky-500"
		},
		{
			key: "github",
			icon: Github,
			label: "GitHub",
			color: "text-gray-700"
		}
	];
	const getSocialLink = (key) => {
		return profile?.[key];
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: "Loading your profile..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 p-4 sm:p-6 md:p-8 max-w-5xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 opacity-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-purple-400 rounded-full blur-3xl" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex flex-col sm:flex-row sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl sm:text-3xl font-bold text-white",
							children: "My Account"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-blue-100 mt-1 text-sm",
							children: "Manage your personal information and public profile"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3",
							children: !isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setIsEditing(true),
								className: "flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all hover:scale-105 active:scale-95 border border-white/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "Edit Profile"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setIsEditing(false),
									className: "flex items-center gap-2 px-4 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), "Cancel"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleSave,
									disabled: isSaving,
									className: "flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-medium disabled:opacity-50",
									children: isSaving ? "Saving..." : "Save"
								})]
							})
						})]
					})]
				}),
				success && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-600 flex items-center gap-2 animate-in slide-in-from-top duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-5 w-5" }), success]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative bg-white rounded-2xl shadow-xl border border-gray-100/50 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-4 right-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium",
								children: profile?.role || "Student"
							}), profile?.is_email_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-3 py-1 bg-emerald-500/30 backdrop-blur-sm rounded-full text-xs text-white font-medium flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3 w-3" }), " Verified"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative px-6 pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "-mt-16 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative group",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-xl",
									children: [getInitials(), isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-6 w-6 text-white" })
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0 pb-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl sm:text-3xl font-bold text-gray-900 truncate",
										children: profile?.full_name || profile?.username || "Student"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-gray-500 text-sm truncate",
										children: profile?.headline || "Student at TechBridge"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400",
										children: [profile?.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }),
												" ",
												profile.email
											]
										}), profile?.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
												" ",
												profile.location
											]
										})]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6",
							children: stats.map((stat, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `${stat.bg} rounded-xl p-3 border border-gray-100/50 hover:shadow-md transition-all hover:-translate-y-0.5`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `p-1.5 rounded-lg bg-gradient-to-br ${stat.color} text-white`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(stat.icon, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-bold text-gray-900",
										children: stat.value
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-gray-500",
										children: stat.label
									})] })]
								})
							}, index))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl shadow-xl border border-gray-100/50 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-blue-600" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-gray-900",
							children: "About Me"
						})]
					}), isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSave,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "First Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: formData.first_name,
									onChange: (e) => setFormData({
										...formData,
										first_name: e.target.value
									}),
									className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Last Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: formData.last_name,
									onChange: (e) => setFormData({
										...formData,
										last_name: e.target.value
									}),
									className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Headline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: formData.headline,
								onChange: (e) => setFormData({
									...formData,
									headline: e.target.value
								}),
								className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all",
								placeholder: "e.g. Aspiring Network Engineer · Kampala"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Bio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: formData.bio,
								onChange: (e) => setFormData({
									...formData,
									bio: e.target.value
								}),
								rows: 4,
								className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y",
								placeholder: "Tell the community about yourself..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Location"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: formData.location,
									onChange: (e) => setFormData({
										...formData,
										location: e.target.value
									}),
									className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all",
									placeholder: "Kampala, Uganda"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Learning Goal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: formData.learning_goal,
									onChange: (e) => setFormData({
										...formData,
										learning_goal: e.target.value
									}),
									className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all",
									placeholder: "e.g. Become a certified network engineer"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: formData.phone,
									onChange: (e) => setFormData({
										...formData,
										phone: e.target.value
									}),
									className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all",
									placeholder: "+256 7XX XXX XXX"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Website"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: formData.website,
									onChange: (e) => setFormData({
										...formData,
										website: e.target.value
									}),
									className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all",
									placeholder: "https://yoursite.com"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Social Links"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: formData.linkedin,
										onChange: (e) => setFormData({
											...formData,
											linkedin: e.target.value
										}),
										className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all",
										placeholder: "LinkedIn URL"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: formData.twitter,
										onChange: (e) => setFormData({
											...formData,
											twitter: e.target.value
										}),
										className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all",
										placeholder: "Twitter/X URL"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: formData.github || "",
										onChange: (e) => setFormData({
											...formData,
											github: e.target.value
										}),
										className: "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all",
										placeholder: "GitHub URL"
									})
								]
							})] }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), error]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500",
								children: profile?.bio || "No bio yet. Tell the community about yourself!"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400",
										children: "Location"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-900",
										children: profile?.location || "Not set"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400",
										children: "Learning Goal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-900",
										children: profile?.learning_goal || "Not set"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400",
										children: "Phone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-900",
										children: profile?.phone || "Not set"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400",
										children: "Website"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-900",
										children: profile?.website || "Not set"
									})] })
								]
							}),
							socialLinks.some((link) => getSocialLink(link.key)) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 border-t border-gray-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-400 mb-3",
									children: "Connect with me"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-3",
									children: socialLinks.map((link) => {
										const url = getSocialLink(link.key);
										if (!url) return null;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: url,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all hover:scale-105",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(link.icon, { className: `h-5 w-5 ${link.color}` })
										}, link.key);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 border-t border-gray-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-400",
									children: "Member since"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-gray-900",
									children: profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric"
									}) : "Recent"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl shadow-md border border-gray-100/50 p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl inline-block mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5 text-blue-600" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-gray-700",
								children: "My Courses"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl shadow-md border border-gray-100/50 p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl inline-block mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5 text-emerald-600" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-gray-700",
								children: "Certificates"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl shadow-md border border-gray-100/50 p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl inline-block mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-purple-600" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-gray-700",
								children: "Progress"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl shadow-md border border-gray-100/50 p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl inline-block mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-5 w-5 text-amber-600" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-gray-700",
								children: "Goals"
							})]
						})
					]
				})
			]
		})
	});
}
var Route$1 = createFileRoute("/student/settings")({ component: Settings$1 });
async function patchProfile(data) {
	return await apiRequest("/auth/me/", {
		method: "PATCH",
		body: JSON.stringify(data)
	});
}
function Settings$1() {
	const { user, logout } = useAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("security");
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [payments, setPayments] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	const [passwordData, setPasswordData] = (0, import_react.useState)({
		old_password: "",
		new_password: "",
		confirm: ""
	});
	const [notifPrefs, setNotifPrefs] = (0, import_react.useState)({
		email_enrolled: true,
		email_cert: true,
		email_streak: true,
		email_news: false,
		push_enrolled: true,
		push_cert: true
	});
	(0, import_react.useEffect)(() => {
		const loadData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const [profileData, notificationList, paymentList] = await Promise.all([
					getMe().catch(() => null),
					getNotifications().catch(() => []),
					getPaymentHistory().catch(() => [])
				]);
				if (profileData) setProfile(profileData);
				setNotifications(Array.isArray(notificationList) ? notificationList : []);
				setPayments(Array.isArray(paymentList) ? paymentList : []);
			} catch (err) {
				console.error("Failed to load settings:", err);
				setError("Could not load settings. Please try again.");
			} finally {
				setIsLoading(false);
			}
		};
		loadData();
	}, []);
	const handlePasswordChange = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		if (passwordData.new_password !== passwordData.confirm) {
			setError("Passwords do not match");
			return;
		}
		if (passwordData.new_password.length < 8) {
			setError("Password must be at least 8 characters");
			return;
		}
		setIsSaving(true);
		try {
			await patchProfile({
				old_password: passwordData.old_password,
				new_password: passwordData.new_password
			});
			setSuccess("Password changed successfully!");
			setPasswordData({
				old_password: "",
				new_password: "",
				confirm: ""
			});
			setTimeout(() => setSuccess(null), 3e3);
		} catch (err) {
			setError("Failed to change password. Please check your current password.");
			console.error("Password change error:", err);
		} finally {
			setIsSaving(false);
		}
	};
	const handleMarkAllRead = async () => {
		try {
			await markNotificationsRead();
			setNotifications([]);
		} catch (err) {
			console.error("Failed to mark notifications read:", err);
		}
	};
	const handleLogout = async () => {
		await logout();
	};
	const tabs = [
		{
			id: "security",
			label: "Security",
			icon: Lock
		},
		{
			id: "notifications",
			label: "Notifications",
			icon: Bell
		},
		{
			id: "payments",
			label: "Payments",
			icon: CreditCard
		},
		{
			id: "preferences",
			label: "Preferences",
			icon: Settings
		}
	];
	const activeTabData = tabs.find((t) => t.id === activeTab);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-gray-500",
				children: "Loading settings..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col xs:flex-row xs:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate",
						children: "Settings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] sm:text-xs md:text-sm text-gray-500 truncate",
						children: "Manage your security, notifications, and preferences"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 flex-shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1 whitespace-nowrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-3 w-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden xs:inline",
								children: profile?.role || "Student"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline xs:hidden",
								children: profile?.role?.charAt(0) || "S"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:hidden relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setMobileMenuOpen(!mobileMenuOpen),
					className: "w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [activeTabData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-blue-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(activeTabData.icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-gray-900",
							children: activeTabData?.label || "Security"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 text-gray-400 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}` })]
				}), mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden",
					children: tabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setActiveTab(tab.id);
								setMobileMenuOpen(false);
							},
							className: `flex items-center gap-2 w-full px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${isActive ? "text-blue-600" : "text-gray-400"}` }),
								tab.label,
								isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 ml-auto text-blue-600" })
							]
						}, tab.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden sm:block bg-white rounded-xl border border-gray-200 p-1.5 overflow-x-auto shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-0.5 min-w-max",
					children: tabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab(tab.id),
							className: `flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 touch-manipulation ${isActive ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-3.5 w-3.5 sm:h-4 sm:w-4 ${isActive ? "text-white" : "text-gray-400"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden xs:inline",
									children: tab.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline xs:hidden",
									children: tab.label.charAt(0)
								})
							]
						}, tab.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 sm:space-y-6",
				children: [
					activeTab === "security" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 sm:space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-amber-500 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Change Password" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handlePasswordChange,
									className: "space-y-3 sm:space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1",
											children: "Current Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											value: passwordData.old_password,
											onChange: (e) => setPasswordData({
												...passwordData,
												old_password: e.target.value
											}),
											className: "w-full rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											required: true
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1",
											children: "New Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											value: passwordData.new_password,
											onChange: (e) => setPasswordData({
												...passwordData,
												new_password: e.target.value
											}),
											className: "w-full rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											placeholder: "At least 8 characters",
											required: true
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1",
											children: "Confirm Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											value: passwordData.confirm,
											onChange: (e) => setPasswordData({
												...passwordData,
												confirm: e.target.value
											}),
											className: "w-full rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											required: true
										})] }),
										error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-red-600 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "break-words",
												children: error
											})]
										}),
										success && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-emerald-600 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "break-words",
												children: success
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-end",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												disabled: isSaving,
												className: "w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium disabled:opacity-50 active:scale-95 touch-manipulation",
												children: isSaving ? "Updating..." : "Update Password"
											})
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 text-emerald-500 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Account Status" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2 sm:space-y-3",
										children: [
											{
												label: "Email verified",
												value: "✓ Verified",
												color: "text-emerald-600"
											},
											{
												label: "Account status",
												value: "Active ✓",
												color: "text-emerald-600"
											},
											{
												label: "2-Factor Authentication",
												value: "Disabled",
												color: "text-gray-500"
											}
										].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col xs:flex-row xs:justify-between gap-1 py-2 border-b border-gray-100 last:border-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs sm:text-sm text-gray-500",
												children: item.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-xs sm:text-sm font-semibold ${item.color} break-all`,
												children: item.value
											})]
										}, item.label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "mt-4 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium",
										children: "Enable 2-Factor Authentication →"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleLogout,
									className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium active:scale-95 touch-manipulation",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Sign Out of All Devices"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-[10px] text-gray-400 mt-2",
									children: "This will sign you out of all active sessions"
								})]
							})
						]
					}),
					activeTab === "notifications" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 sm:space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3 sm:mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5 text-purple-500 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Notification Preferences" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleMarkAllRead,
									className: "text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors active:scale-95 touch-manipulation",
									children: "Mark all read"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3 sm:space-y-4",
								children: [
									{
										key: "email_enrolled",
										label: "Course enrollment confirmations",
										desc: "Email when you enroll in a course"
									},
									{
										key: "email_cert",
										label: "Certificate issued",
										desc: "Email when you earn a certificate"
									},
									{
										key: "email_streak",
										label: "Streak reminders",
										desc: "Reminder when your streak is at risk"
									},
									{
										key: "email_news",
										label: "Platform news & updates",
										desc: "Monthly newsletter and announcements"
									}
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-3 border-b border-gray-100 last:border-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs sm:text-sm font-medium text-gray-900 break-words",
											children: item.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] sm:text-xs text-gray-500 break-words",
											children: item.desc
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "relative inline-flex items-center cursor-pointer flex-shrink-0 self-start xs:self-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: notifPrefs[item.key],
											onChange: (e) => setNotifPrefs({
												...notifPrefs,
												[item.key]: e.target.checked
											}),
											className: "sr-only peer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" })]
									})]
								}, item.key))
							})]
						}), notifications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4",
								children: "Recent Notifications"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 sm:space-y-3",
								children: notifications.slice(0, 5).map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-1.5 sm:p-2 bg-blue-50 rounded-lg text-blue-600 flex-shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs sm:text-sm font-semibold text-gray-900 break-words",
												children: item.title || item.message || "Update"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] sm:text-xs text-gray-500 break-words",
												children: item.body || item.detail || "New notification"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0",
											children: item.created_at ? new Date(item.created_at).toLocaleDateString() : "Today"
										})
									]
								}, item.id || index))
							})]
						})]
					}),
					activeTab === "payments" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5 text-blue-500 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment History" })]
						}), payments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-6 sm:py-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm sm:text-base text-gray-500 font-medium",
									children: "No payment history"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] sm:text-xs text-gray-400 mt-1",
									children: "Your payment history will appear here"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 sm:space-y-3",
							children: payments.slice(0, 5).map((payment, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col xs:flex-row xs:items-center justify-between gap-2 p-2.5 sm:p-3 bg-gray-50 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm font-semibold text-gray-900 break-words",
										children: payment.provider || payment.method || "Payment"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] sm:text-xs text-gray-500",
										children: payment.status || "Completed"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left xs:text-right flex-shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm font-semibold text-gray-900",
										children: payment.amount || payment.total || "—"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] sm:text-xs text-gray-400",
										children: payment.date || "Today"
									})]
								})]
							}, payment.id || index))
						})]
					}),
					activeTab === "preferences" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5 text-gray-500 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "App Preferences" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 sm:space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-2 border-b border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm font-medium text-gray-900",
										children: "Theme"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] sm:text-xs text-gray-500",
										children: "Choose your preferred theme"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium border border-blue-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-3.5 w-3.5 inline mr-1" }), "Light"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium border border-transparent",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-3.5 w-3.5 inline mr-1" }), "Dark"]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-2 border-b border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm font-medium text-gray-900",
										children: "Language"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] sm:text-xs text-gray-500",
										children: "Select your preferred language"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "English" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "French" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Spanish" })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-2 border-b border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm font-medium text-gray-900",
										children: "Timezone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] sm:text-xs text-gray-500",
										children: "Your local timezone"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "UTC+3 (EAT)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "UTC+0 (GMT)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "UTC-5 (EST)" })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm font-medium text-gray-900",
										children: "Auto-play videos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] sm:text-xs text-gray-500",
										children: "Automatically play course videos"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "relative inline-flex items-center cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											defaultChecked: true,
											className: "sr-only peer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-6 bg-blue-600 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" })]
									})]
								})
							]
						})]
					})
				]
			})
		]
	});
}
var $$splitComponentImporter = () => import("./student.study.index-CRYRw4Oz.mjs");
var Route = createFileRoute("/student/study/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var StudentRoute = Route$11.update({
	id: "/student",
	path: "/student",
	getParentRoute: () => Route$13
});
var StudentIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => StudentRoute
});
var StudentAssignmentsRoute = Route$9.update({
	id: "/assignments",
	path: "/assignments",
	getParentRoute: () => StudentRoute
});
var StudentBookmarksRoute = Route$8.update({
	id: "/bookmarks",
	path: "/bookmarks",
	getParentRoute: () => StudentRoute
});
var StudentCertificatesRoute = Route$7.update({
	id: "/certificates",
	path: "/certificates",
	getParentRoute: () => StudentRoute
});
var StudentDashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => StudentRoute
});
var StudentExploreRoute = Route$5.update({
	id: "/explore",
	path: "/explore",
	getParentRoute: () => StudentRoute
});
var StudentMyLearningRoute = Route$4.update({
	id: "/my-learning",
	path: "/my-learning",
	getParentRoute: () => StudentRoute
});
var StudentPathsRoute = Route$3.update({
	id: "/paths",
	path: "/paths",
	getParentRoute: () => StudentRoute
});
var StudentProfileRoute = Route$2.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => StudentRoute
});
var StudentSettingsRoute = Route$1.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => StudentRoute
});
var StudentCourseSlugRoute = Route$14.update({
	id: "/course/$slug",
	path: "/course/$slug",
	getParentRoute: () => StudentRoute
});
var StudentStudyIndexRoute = Route.update({
	id: "/study/",
	path: "/study/",
	getParentRoute: () => StudentRoute
});
var StudentRouteChildren = {
	StudentAssignmentsRoute,
	StudentBookmarksRoute,
	StudentCertificatesRoute,
	StudentDashboardRoute,
	StudentExploreRoute,
	StudentMyLearningRoute,
	StudentPathsRoute,
	StudentProfileRoute,
	StudentSettingsRoute,
	StudentIndexRoute,
	StudentCourseSlugRoute,
	StudentStudySlugRoute: Route$15.update({
		id: "/study/$slug",
		path: "/study/$slug",
		getParentRoute: () => StudentRoute
	}),
	StudentStudyIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	StudentRoute: StudentRoute._addFileChildren(StudentRouteChildren)
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

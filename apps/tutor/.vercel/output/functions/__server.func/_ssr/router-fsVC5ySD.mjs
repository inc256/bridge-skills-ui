import { r as __toESM } from "../_runtime.mjs";
import { C as patchCourse, D as updateTutorModule, E as updateTutorLesson, a as deleteCourse, c as generateCourseTitle, d as getCourseLessons, f as getCourseModules, g as getProfile, i as createTutorModule, l as getCourse, m as getCourses, n as createCourse, o as deleteTutorLesson, p as getCourseReviews, r as createTutorLesson, s as generateCourseDescription, u as getCourseCategories, v as getStudents, w as patchProfile, y as getTutorAnalytics } from "./api-D9XJEAL8.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as AuthProvider } from "./auth-CzSgaZ2L.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as CircleCheckBig, A as Mail, B as FileText, C as Plus, D as MessageSquare, E as Minus, F as Link$1, G as Download, H as Eye, I as LayoutGrid, J as Clock, K as DollarSign, M as Lock, N as List, P as ListChecks, Q as CirclePlay, R as GraduationCap, S as RefreshCw, T as Pause, V as FileQuestionMark, W as Ellipsis, X as ClipboardCheck, Z as CircleQuestionMark, _ as Share2, _t as ArrowDownRight, a as Users, at as Check, b as Search, c as Upload, ct as Briefcase, d as Target, dt as BookOpen, et as CircleAlert, f as Star, ft as Bell, g as Shield, h as Sparkles, ht as ArrowUpRight, i as Video, it as ChevronDown, l as TrendingUp, m as SquarePen, mt as Award, n as X, nt as ChevronRight, o as User, ot as ChartColumn, pt as Banknote, q as CreditCard, r as Volume2, rt as ChevronLeft, s as UserCheck, st as Camera, tt as ChevronUp, u as Trash2, ut as Book, vt as Activity, w as Play, x as Save, z as Funnel } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-fsVC5ySD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DpDLL9au.css";
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
			{ title: "TechBridge Skills Hub — Learn Practical Skills That Build Real Careers" },
			{
				name: "description",
				content: "TechBridge Skills Hub is a modern learning platform for networking, cybersecurity, software engineering, and AI. Learn from expert tutors and earn industry certificates."
			},
			{
				property: "og:title",
				content: "TechBridge Skills Hub"
			},
			{
				property: "og:description",
				content: "Learn practical skills that build real careers."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
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
var $$splitComponentImporter$3 = () => import("./routes-BH_FXrPo.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Tutor Portal — TechBridge" }, {
		name: "description",
		content: "Tutor application for the TechBridge instructor workspace."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./tutor-CxwwF7n5.mjs");
var Route$11 = createFileRoute("/tutor")({
	head: () => ({ meta: [{ title: "Tutor — TechBridge" }, {
		name: "description",
		content: "Tutor dashboard: manage your courses and students on TechBridge."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./tutor.index-ge3RjqEZ.mjs");
var Route$10 = createFileRoute("/tutor/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var Route$9 = createFileRoute("/tutor/analytics")({ component: Analytics });
function Analytics() {
	const [stats, setStats] = (0, import_react.useState)(null);
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [students, setStudents] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [selectedPeriod, setSelectedPeriod] = (0, import_react.useState)("month");
	const [coursePerformance, setCoursePerformance] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const [analyticsData, coursesData, studentsData] = await Promise.all([
					getTutorAnalytics().catch(() => null),
					getCourses().catch(() => []),
					getStudents().catch(() => [])
				]);
				if (analyticsData) setStats(analyticsData);
				if (Array.isArray(coursesData)) {
					setCourses(coursesData);
					const performance = coursesData.map((course) => ({
						id: course.id,
						title: course.title,
						students: course.students || 0,
						rating: course.rating || 0,
						revenue: course.price && course.students ? parseFloat(course.price.replace(/[^0-9.]/g, "")) * course.students : 0,
						completion: course.completion_rate || Math.round(Math.random() * 40 + 50),
						lessons: course.lessons || 0
					}));
					setCoursePerformance(performance);
				}
				if (Array.isArray(studentsData)) setStudents(studentsData);
			} catch (error) {
				console.error("Error fetching analytics:", error);
				toast.error("Failed to load analytics data");
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);
	const monthlyRevenue = [
		{
			month: "Mar",
			rev: 52e4
		},
		{
			month: "Apr",
			rev: 84e4
		},
		{
			month: "May",
			rev: 12e5
		},
		{
			month: "Jun",
			rev: 98e4
		},
		{
			month: "Jul",
			rev: 154e4
		},
		{
			month: "Aug",
			rev: 61e4
		}
	];
	const maxRev = Math.max(...monthlyRevenue.map((d) => d.rev));
	const totalStudents = stats?.total_students ?? students.length;
	stats?.total_courses ?? courses.length;
	const publishedCourses = stats?.published_courses ?? courses.filter((c) => c.status === "published").length;
	const avgRating = stats?.avg_rating ?? (courses.length > 0 ? courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length : 0);
	const totalEarnings = stats?.total_earnings ?? coursePerformance.reduce((sum, c) => sum + c.revenue, 0);
	const completionRate = stats?.completion_rate ?? 87;
	const certificatesIssued = stats?.certificates_issued ?? 234;
	const formatUGX = (amount) => {
		if (amount >= 1e6) return `UGX ${(amount / 1e6).toFixed(1)}M`;
		return `UGX ${amount.toLocaleString()}`;
	};
	const statCards = [
		{
			icon: Users,
			value: totalStudents.toLocaleString(),
			label: "Total Students",
			subtext: "↗ +12% this month",
			color: "blue",
			trend: "up"
		},
		{
			icon: BookOpen,
			value: publishedCourses,
			label: "Published Courses",
			subtext: `${courses.filter((c) => c.status === "draft").length} in draft`,
			color: "emerald",
			trend: "up"
		},
		{
			icon: Star,
			value: avgRating > 0 ? avgRating.toFixed(1) : "0.0",
			label: "Avg. Rating",
			subtext: `${courses.reduce((sum, c) => sum + (c.reviews || 0), 0)} reviews`,
			color: "amber",
			trend: "up"
		},
		{
			icon: DollarSign,
			value: formatUGX(totalEarnings),
			label: "Total Earnings",
			subtext: "↗ +18% this quarter",
			color: "purple",
			trend: "up"
		},
		{
			icon: Award,
			value: certificatesIssued,
			label: "Certificates Issued",
			subtext: "↗ +34 this month",
			color: "indigo",
			trend: "up"
		},
		{
			icon: TrendingUp,
			value: `${completionRate}%`,
			label: "Completion Rate",
			subtext: "↗ +4% improvement",
			color: "cyan",
			trend: "up"
		}
	];
	const statColorMap = {
		blue: "bg-blue-50 text-blue-600",
		emerald: "bg-emerald-50 text-emerald-600",
		amber: "bg-amber-50 text-amber-600",
		purple: "bg-purple-50 text-purple-600",
		indigo: "bg-indigo-50 text-indigo-600",
		cyan: "bg-cyan-50 text-cyan-600"
	};
	const getTrendColor = (trend) => {
		if (trend === "up") return "text-emerald-600";
		if (trend === "down") return "text-red-600";
		return "text-gray-400";
	};
	const getTrendIcon = (trend) => {
		if (trend === "up") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3 h-3" });
		if (trend === "down") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "w-3 h-3" });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-3 h-3" });
	};
	const getScoreColor = (score) => {
		if (score >= 80) return "text-emerald-600";
		if (score >= 60) return "text-amber-600";
		return "text-red-600";
	};
	const getRatingStars = (rating) => {
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= .5;
		const stars = [];
		for (let i = 0; i < 5; i++) if (i < fullStars) stars.push("★");
		else if (i === fullStars && hasHalfStar) stars.push("★");
		else stars.push("☆");
		return stars.join("");
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: "Loading analytics..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-4 sm:p-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl sm:text-3xl font-bold text-gray-900",
					children: "Analytics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 mt-1",
					children: "Understand engagement, completion, and performance across your catalog"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: selectedPeriod,
						onChange: (e) => setSelectedPeriod(e.target.value),
						className: "px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "month",
								children: "This Month"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "quarter",
								children: "This Quarter"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "year",
								children: "This Year"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4 text-gray-600" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4",
				children: statCards.map((stat, index) => {
					const Icon = stat.icon;
					const colorClass = statColorMap[stat.color];
					const trendColor = getTrendColor(stat.trend || "");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-1.5 sm:p-2 rounded-lg ${colorClass} inline-block`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-3 h-3 sm:w-4 sm:h-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base sm:text-xl font-bold text-gray-900 mt-2",
								children: stat.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs text-gray-500",
								children: stat.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center gap-0.5 text-[10px] sm:text-xs font-medium mt-0.5 ${trendColor}`,
								children: [getTrendIcon(stat.trend || ""), stat.subtext]
							})
						]
					}, index);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900",
							children: "Monthly Revenue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500",
							children: "Last 6 months"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold text-blue-600",
							children: formatUGX(totalEarnings)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end justify-between gap-2 h-48",
						children: monthlyRevenue.map((d) => {
							const height = Math.round(d.rev / maxRev * 90) + 10;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex flex-col items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-gray-400 font-medium",
										children: d.rev >= 1e6 ? `${(d.rev / 1e6).toFixed(1)}M` : `${(d.rev / 1e3).toFixed(0)}K`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full bg-blue-50 rounded-t-lg overflow-hidden group cursor-pointer",
										style: { height: `${height}px` },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-full h-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 group-hover:opacity-80",
											style: { height: "100%" }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] sm:text-xs text-gray-500 font-medium",
										children: d.month
									})
								]
							}, d.month);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900 mb-4",
							children: "Completion by Course"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3 sm:space-y-4",
							children: coursePerformance.slice(0, 5).map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs sm:text-sm mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-gray-700 truncate flex-1 mr-2",
									children: course.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `font-bold ${getScoreColor(course.completion)}`,
									children: [course.completion, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full bg-gray-100 rounded-full h-1.5 sm:h-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-full rounded-full transition-all duration-1000 ${course.completion >= 80 ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : course.completion >= 60 ? "bg-gradient-to-r from-amber-500 to-amber-600" : "bg-gradient-to-r from-red-500 to-red-600"}`,
									style: { width: `${Math.min(course.completion, 100)}%` }
								})
							})] }, course.id))
						}),
						coursePerformance.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1",
							children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-xl border border-gray-200 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 sm:p-6 border-b border-gray-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900",
							children: "Course Performance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500",
							children: "Detailed metrics for all your courses"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "w-3 h-3" }), "Filter"]
							})
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-gray-200 bg-gray-50/80 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 sm:px-6",
									children: "Course"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Students"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 hidden sm:table-cell",
									children: "Rating"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 hidden md:table-cell",
									children: "Lessons"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Revenue"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 hidden lg:table-cell",
									children: "Completion"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 sm:px-6 text-right",
									children: "Status"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: coursePerformance.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "text-center py-8 text-gray-400",
							children: "No course data available"
						}) }) : coursePerformance.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 sm:px-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[200px]",
										children: course.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-gray-400",
										children: [course.lessons, " lessons"]
									})] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-sm text-gray-600",
									children: course.students.toLocaleString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 hidden sm:table-cell",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-bold text-amber-500",
											children: course.rating > 0 ? course.rating.toFixed(1) : "0.0"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-amber-400",
											children: getRatingStars(course.rating)
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 hidden md:table-cell text-sm text-gray-600",
									children: course.lessons
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-blue-600",
										children: formatUGX(course.revenue)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 hidden lg:table-cell",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-16 bg-gray-100 rounded-full h-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `h-full rounded-full ${course.completion >= 80 ? "bg-emerald-500" : course.completion >= 60 ? "bg-amber-500" : "bg-red-500"}`,
												style: { width: `${Math.min(course.completion, 100)}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-medium text-gray-600",
											children: [course.completion, "%"]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 sm:px-6 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `inline-flex text-xs font-medium px-2 py-1 rounded-full ${course.completion >= 80 ? "bg-emerald-50 text-emerald-600" : course.completion >= 60 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`,
										children: course.completion >= 80 ? "Excellent" : course.completion >= 60 ? "Good" : "Needs work"
									})
								})
							]
						}, course.id)) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-blue-600 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium",
								children: "Active Learners"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-bold text-gray-900",
							children: stats?.active_learners ?? "1,284"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-emerald-600 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium",
								children: "Watch Time"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-bold text-gray-900",
							children: stats?.watch_time ?? "1,482h"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-purple-600 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium",
								children: "Engagement Rate"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-bold text-gray-900",
							children: "74%"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-amber-600 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium",
								children: "Reviews"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-bold text-gray-900",
							children: courses.reduce((sum, c) => sum + (c.reviews || 0), 0)
						})]
					})
				]
			})
		]
	});
}
var Route$8 = createFileRoute("/tutor/assignments")({ component: TutorAssignments });
function TutorAssignments() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [grading, setGrading] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)("");
	const [feedback, setFeedback] = (0, import_react.useState)("");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedSubmission, setSelectedSubmission] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [submissions, setSubmissions] = (0, import_react.useState)([
		{
			id: 1,
			student: "Sarah Namukasa",
			assignment: "Build a REST API",
			course: "Full-Stack Development",
			submitted: "2026-08-03",
			status: "pending",
			score: null,
			feedback: ""
		},
		{
			id: 2,
			student: "Moses Otim",
			assignment: "Network Topology Lab",
			course: "Networking Fundamentals",
			submitted: "2026-08-02",
			status: "pending",
			score: null,
			feedback: ""
		},
		{
			id: 3,
			student: "Anita Akello",
			assignment: "Build a REST API",
			course: "Full-Stack Development",
			submitted: "2026-08-01",
			status: "graded",
			score: 88,
			feedback: "Great work! Clean code and good API design."
		},
		{
			id: 4,
			student: "Ibrahim Ssekandi",
			assignment: "SQL Queries Lab",
			course: "Database Design",
			submitted: "2026-07-30",
			status: "graded",
			score: 92,
			feedback: "Excellent query optimization!"
		},
		{
			id: 5,
			student: "Lydia Nakato",
			assignment: "Network Topology Lab",
			course: "Networking Fundamentals",
			submitted: "2026-07-28",
			status: "graded",
			score: 75,
			feedback: "Good effort, review subnetting concepts."
		},
		{
			id: 6,
			student: "David Okello",
			assignment: "Nmap Recon Report",
			course: "Ethical Hacking",
			submitted: "2026-08-04",
			status: "needs_review",
			score: null,
			feedback: ""
		}
	]);
	const pendingCount = submissions.filter((s) => s.status === "pending").length;
	const needsReviewCount = submissions.filter((s) => s.status === "needs_review").length;
	const gradedCount = submissions.filter((s) => s.status === "graded").length;
	const totalSubmissions = submissions.length;
	const filteredSubmissions = submissions.filter((s) => {
		if (filter !== "all" && s.status !== filter) return false;
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			return s.student.toLowerCase().includes(query) || s.assignment.toLowerCase().includes(query) || s.course.toLowerCase().includes(query);
		}
		return true;
	});
	const handleGradeSubmit = (submissionId) => {
		if (!score) {
			toast.error("Please enter a score");
			return;
		}
		const numScore = parseInt(score);
		if (isNaN(numScore) || numScore < 0 || numScore > 100) {
			toast.error("Score must be between 0 and 100");
			return;
		}
		setSubmissions((prev) => prev.map((s) => s.id === submissionId ? {
			...s,
			status: "graded",
			score: numScore,
			feedback: feedback || s.feedback
		} : s));
		toast.success(`Assignment graded! Score: ${numScore}/100`);
		setGrading(null);
		setScore("");
		setFeedback("");
	};
	const handleViewSubmission = (submission) => {
		setSelectedSubmission(submission);
	};
	const statsCards = [
		{
			icon: FileText,
			value: totalSubmissions,
			label: "Total Submissions",
			subtext: "All time",
			color: "blue"
		},
		{
			icon: Clock,
			value: pendingCount + needsReviewCount,
			label: "Pending Review",
			subtext: "Need your attention",
			color: "amber"
		},
		{
			icon: CircleCheckBig,
			value: gradedCount,
			label: "Graded",
			subtext: "Completed",
			color: "emerald"
		},
		{
			icon: Users,
			value: Math.round(gradedCount / Math.max(totalSubmissions, 1) * 100) + "%",
			label: "Completion Rate",
			subtext: "Graded vs total",
			color: "purple"
		}
	];
	const statColorMap = {
		blue: "bg-blue-50 text-blue-600",
		amber: "bg-amber-50 text-amber-600",
		emerald: "bg-emerald-50 text-emerald-600",
		purple: "bg-purple-50 text-purple-600"
	};
	const getStatusBadge = (status) => {
		const config = {
			pending: {
				label: "Pending Review",
				className: "bg-amber-50 text-amber-600 border-amber-200",
				icon: CircleAlert
			},
			needs_review: {
				label: "Needs Review",
				className: "bg-orange-50 text-orange-600 border-orange-200",
				icon: CircleAlert
			},
			graded: {
				label: "Graded",
				className: "bg-emerald-50 text-emerald-600 border-emerald-200",
				icon: CircleCheckBig
			}
		};
		return config[status] || config.pending;
	};
	const getFilterTabs = () => {
		return [
			{
				key: "all",
				label: "All",
				count: totalSubmissions
			},
			{
				key: "pending",
				label: "Pending",
				count: pendingCount
			},
			{
				key: "needs_review",
				label: "Needs Review",
				count: needsReviewCount
			},
			{
				key: "graded",
				label: "Graded",
				count: gradedCount
			}
		];
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: "Loading assignments..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-4 sm:p-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl sm:text-3xl font-bold text-gray-900",
					children: "Assignments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 mt-1",
					children: "Review and grade student submissions across all your courses"
				})] }), pendingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-medium text-amber-600",
						children: [pendingCount, " pending review"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
				children: statsCards.map((stat, index) => {
					const Icon = stat.icon;
					const colorClass = statColorMap[stat.color];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-2 rounded-lg ${colorClass}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg sm:text-xl font-bold text-gray-900",
									children: stat.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-gray-500",
									children: stat.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] sm:text-xs text-gray-400",
									children: stat.subtext
								})
							] })]
						})
					}, index);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl border border-gray-200 p-2 sm:p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1",
					children: getFilterTabs().map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilter(tab.key),
						className: `px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === tab.key ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`,
						children: [tab.label, tab.count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `ml-1.5 text-xs px-2 py-0.5 rounded-full ${filter === tab.key ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"}`,
							children: tab.count
						})]
					}, tab.key))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl border border-gray-200 p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search assignments, students, or courses...",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						className: "w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: filteredSubmissions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl border border-gray-200 p-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-16 h-16 text-gray-300 mx-auto mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gray-500 font-medium",
							children: "No submissions found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-400 mt-1",
							children: "Try adjusting your filters or search"
						})
					]
				}) : filteredSubmissions.map((submission) => {
					const statusConfig = getStatusBadge(submission.status);
					const StatusIcon = statusConfig.icon;
					const isGrading = grading === submission.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `p-2 rounded-lg flex-shrink-0 ${submission.status === "graded" ? "bg-emerald-50 text-emerald-600" : submission.status === "needs_review" ? "bg-orange-50 text-orange-600" : "bg-amber-50 text-amber-600"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col sm:flex-row sm:items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-semibold text-gray-900 truncate",
												children: submission.assignment
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusConfig.className}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { className: "w-3 h-3" }), statusConfig.label]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-gray-500 mt-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium",
													children: submission.student
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mx-2",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-gray-400",
													children: submission.course
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mx-2",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-gray-400 text-xs",
													children: ["Submitted ", new Date(submission.submitted).toLocaleDateString()]
												})
											]
										}),
										submission.status === "graded" && submission.score !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-bold text-emerald-600",
												children: [
													"Score: ",
													submission.score,
													"/100"
												]
											}), submission.feedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-gray-400 truncate max-w-[200px]",
												children: [
													"\"",
													submission.feedback,
													"\""
												]
											})]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2 flex-shrink-0",
								children: submission.status === "graded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleViewSubmission(submission),
									className: "px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" }), "View"]
								}) }) : isGrading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											value: score,
											onChange: (e) => setScore(e.target.value),
											placeholder: "Score",
											min: "0",
											max: "100",
											className: "w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleGradeSubmit(submission.id),
											className: "px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium",
											children: "Save"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setGrading(null);
												setScore("");
												setFeedback("");
											},
											className: "px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleViewSubmission(submission),
									className: "p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setGrading(submission.id);
										setScore("");
										setFeedback("");
									},
									className: "px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium",
									children: "Grade"
								})] })
							})]
						}), isGrading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-4 border-t border-gray-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Feedback (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: feedback,
								onChange: (e) => setFeedback(e.target.value),
								rows: 2,
								placeholder: "Provide feedback to the student...",
								className: "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
							})]
						})]
					}, submission.id);
				})
			}),
			selectedSubmission && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50",
				onClick: () => setSelectedSubmission(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-gray-900",
							children: "Submission Details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedSubmission(null),
							className: "text-gray-400 hover:text-gray-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500",
										children: "Assignment"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-gray-900",
										children: selectedSubmission.assignment
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500",
										children: "Student"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-gray-900",
										children: selectedSubmission.student
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500",
										children: "Course"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-gray-900",
										children: selectedSubmission.course
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500",
										children: "Submitted"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-gray-900",
										children: new Date(selectedSubmission.submitted).toLocaleDateString()
									})] })
								]
							}),
							selectedSubmission.status === "graded" && selectedSubmission.score !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-emerald-50 rounded-xl p-4 border border-emerald-200",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-600",
										children: "Score"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-2xl font-bold text-emerald-600",
										children: [selectedSubmission.score, "/100"]
									}),
									selectedSubmission.feedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-gray-500",
											children: "Feedback"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-gray-700 mt-1",
											children: selectedSubmission.feedback
										})]
									})
								]
							}),
							selectedSubmission.status !== "graded" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-amber-50 rounded-xl p-4 border border-amber-200",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-600",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-amber-600",
										children: "Pending Review"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setSelectedSubmission(null);
											setGrading(selectedSubmission.id);
											setScore("");
											setFeedback("");
										},
										className: "mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium",
										children: "Grade This Submission"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pt-4 border-t border-gray-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" }), "Download Submission"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-4 h-4" }), "Message Student"]
								})]
							})
						]
					})]
				})
			})
		]
	});
}
var Route$7 = createFileRoute("/tutor/builder")({ component: Builder });
var steps = [
	"Details",
	"Outcomes",
	"Curriculum",
	"Resources",
	"Preview"
];
var savedCourseKey = "bridge_skills_tutor_last_saved_course";
var LESSON_TYPES = [
	"text",
	"video",
	"audio",
	"document",
	"assignment",
	"quiz"
];
var MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
function normalizeLessonType(value) {
	const type = String(value ?? "video").toLowerCase();
	if (type === "article" || type === "reading") return "text";
	if (type === "project" || type === "live") return "assignment";
	return LESSON_TYPES.includes(type) ? type : "video";
}
function validateLesson(lesson, type) {
	const has = (value) => Boolean(value && (value instanceof File || value.trim()));
	if (!lesson.title.trim()) return "title is required.";
	if (type === "text" || type === "assignment" || type === "quiz") {
		if (!has(lesson.content)) return `${type} lessons require content.`;
	}
	if (type === "video" && !has(lesson.videoUrl) && !has(lesson.videoFile)) return "video lessons require a video URL or video file.";
	if (type === "audio" && !has(lesson.audioFile)) return "audio lessons require an audio file.";
	if (type === "document" && !has(lesson.pdfFile) && !has(lesson.pptFile)) return "document lessons require a PDF or PowerPoint file.";
	return null;
}
function LessonField({ label, value, placeholder, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-gray-500",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: value ?? "",
			onChange: (event) => onChange(event.target.value),
			placeholder,
			className: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
		})]
	});
}
function LessonFileField({ label, value, accept, onChange }) {
	const fileName = value instanceof File ? value.name : value?.split("/").pop();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-gray-500",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:border-blue-400 hover:bg-blue-50",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4 shrink-0 text-blue-600" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 truncate",
					children: fileName ?? "Choose file"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept,
					className: "sr-only",
					onChange: (event) => {
						const file = event.target.files?.[0];
						if (file) onChange(file);
					}
				})
			]
		})]
	});
}
function mediaPayload(value) {
	return value instanceof File ? value : void 0;
}
function oversizedUpload(value) {
	return value instanceof File && value.size > MAX_UPLOAD_BYTES ? value : null;
}
function readSavedCourse(slug) {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(savedCourseKey);
		const saved = raw ? JSON.parse(raw) : null;
		return saved?.slug === slug ? saved : null;
	} catch {
		return null;
	}
}
function Builder() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [titleSuggestion, setTitleSuggestion] = (0, import_react.useState)(null);
	const [descriptionSuggestion, setDescriptionSuggestion] = (0, import_react.useState)(null);
	const [aiBusy, setAiBusy] = (0, import_react.useState)(false);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [title, setTitle] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [courseTimeline, setCourseTimeline] = (0, import_react.useState)("");
	const [thumbnailUrl, setThumbnailUrl] = (0, import_react.useState)("");
	const [thumbnailFile, setThumbnailFile] = (0, import_react.useState)(null);
	const [categoryId, setCategoryId] = (0, import_react.useState)(null);
	const [level, setLevel] = (0, import_react.useState)("beginner");
	const [language, setLanguage] = (0, import_react.useState)("English");
	const [status, setStatus] = (0, import_react.useState)("draft");
	const [pricing, setPricing] = (0, import_react.useState)("free");
	const [price, setPrice] = (0, import_react.useState)("0");
	const [subtitle, setSubtitle] = (0, import_react.useState)("");
	const [modules, setModules] = (0, import_react.useState)([]);
	const [originalLessonIds, setOriginalLessonIds] = (0, import_react.useState)([]);
	const [isEdit, setIsEdit] = (0, import_react.useState)(false);
	const [originalSlug, setOriginalSlug] = (0, import_react.useState)(null);
	const [savedDraft, setSavedDraft] = (0, import_react.useState)(null);
	const [outcomes, setOutcomes] = (0, import_react.useState)([]);
	const [requirements, setRequirements] = (0, import_react.useState)([]);
	const [newOutcome, setNewOutcome] = (0, import_react.useState)("");
	const [newRequirement, setNewRequirement] = (0, import_react.useState)("");
	const [newResourceLabel, setNewResourceLabel] = (0, import_react.useState)("");
	const [newResourceUrl, setNewResourceUrl] = (0, import_react.useState)("");
	const [resources, setResources] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [loadingCourse, setLoadingCourse] = (0, import_react.useState)(false);
	const [expandedModules, setExpandedModules] = (0, import_react.useState)({});
	function looksPersistedId(id) {
		return typeof id === "string" && id.length >= 20 && !id.startsWith("module-") && !id.startsWith("lesson-");
	}
	(0, import_react.useEffect)(() => {
		(async () => {
			const result = await getCourseCategories();
			setCategories(result);
			setCategoryId(result[0]?.id ?? null);
		})();
	}, []);
	(0, import_react.useEffect)(() => {
		setSlug((current) => {
			if (isEdit) return current;
			if (!current || current === "new-course" || current === slugify(title) || current.startsWith("new-course")) return slugify(title);
			return current;
		});
	}, [title, isEdit]);
	(0, import_react.useEffect)(() => {
		try {
			if (typeof window === "undefined") return;
			const editSlug = new URLSearchParams(window.location.search).get("slug");
			if (!editSlug) return;
			setIsEdit(true);
			setOriginalSlug(editSlug);
			setLoadingCourse(true);
			(async () => {
				try {
					const [serverCourse, serverModules] = await Promise.all([getCourse(editSlug), getCourseModules(editSlug)]);
					const savedCourse = readSavedCourse(editSlug);
					if (!serverCourse && !savedCourse) {
						toast.error("Course not found");
						setLoadingCourse(false);
						return;
					}
					const course = {
						...serverCourse ?? {},
						...savedCourse ?? {}
					};
					const curriculum = Array.isArray(serverModules) && serverModules.length > 0 ? serverModules : Array.isArray(course.modules) && course.modules.length > 0 ? course.modules : [];
					if (!course) {
						toast.error("Course not found");
						setLoadingCourse(false);
						return;
					}
					if (course.title) setTitle(course.title);
					if (course.slug) setSlug(course.slug);
					if (course.subtitle) setSubtitle(course.subtitle);
					if (course.description) setDescription(course.description ?? course.subtitle ?? "");
					if (course.thumbnail) setThumbnailUrl(String(course.thumbnail));
					if (course.duration) setCourseTimeline(String(course.duration));
					if (course.category && typeof course.category === "object") setCategoryId(course.category.id ?? course.category);
					else if (course.category_id) setCategoryId(course.category_id);
					if (course.level) setLevel(String(course.level).toLowerCase());
					if (course.language) setLanguage(course.language);
					if (course.status) setStatus(course.status);
					if (course.price) {
						const raw = Number(course.price ?? 0);
						if (raw > 0) {
							setPricing("paid");
							setPrice(String(raw));
						} else {
							setPricing("free");
							setPrice("0");
						}
					}
					if (Array.isArray(course.outcomes)) setOutcomes(course.outcomes);
					if (Array.isArray(course.requirements)) setRequirements(course.requirements);
					if (Array.isArray(curriculum) && curriculum.length > 0) {
						setOriginalLessonIds(curriculum.flatMap((module) => Array.isArray(module.lessons) ? module.lessons.filter((lesson) => lesson._persisted ?? looksPersistedId(lesson.id)).map((lesson) => String(lesson.id)) : []));
						setModules(curriculum.map((m) => ({
							id: m.id || getNewId(),
							title: m.title || "Module",
							description: m.description || "",
							_persisted: m._persisted ?? looksPersistedId(m.id),
							lessons: Array.isArray(m.lessons) ? m.lessons.map((l) => ({
								id: l.id || getNewId(),
								title: l.title || "Lesson",
								slug: l.slug || void 0,
								description: l.description ?? "",
								content: l.content ?? "",
								duration: l.duration || "15 min",
								type: normalizeLessonType(l.type),
								videoUrl: l.video_url || l.videoUrl || "",
								videoFile: l.video_file || l.videoFile || "",
								pdfFile: l.pdf_file || l.pdfFile || "",
								audioFile: l.audio_file || l.audioFile || "",
								pptFile: l.ppt_file || l.pptFile || "",
								thumbnail: l.thumbnail || "",
								subtitleVtt: l.subtitle_vtt || l.subtitleVtt || "",
								xpReward: Number(l.xp_reward ?? l.xpReward ?? 10),
								isFree: Boolean(l.is_free ?? l.isFree),
								isDrip: Boolean(l.is_drip ?? l.isDrip),
								dripAfter: Number(l.drip_after ?? l.dripAfter ?? 0),
								isPublished: l.is_published !== false,
								_persisted: l._persisted ?? looksPersistedId(l.id)
							})) : []
						})));
						setExpandedModules(Object.fromEntries(curriculum.map((m, index) => [String(m.id || index), index === 0])));
					}
					if (Array.isArray(course.resources)) setResources(course.resources.map((r) => ({
						id: r.id || getNewId(),
						label: r.label || r.title || "Resource",
						url: r.url || r.link || "#",
						type: r.type || "Link"
					})));
					toast.success("Course loaded successfully");
				} catch (error) {
					console.error("Error loading course:", error);
					toast.error("Failed to load course data");
				} finally {
					setLoadingCourse(false);
				}
			})();
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		try {
			const raw = window.localStorage.getItem("bridge_skills_tutor_course_draft");
			if (!raw) return;
			const draft = JSON.parse(raw);
			setSavedDraft(draft ?? null);
			if (draft?.thumbnailUrl) setThumbnailUrl(String(draft.thumbnailUrl));
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (isEdit) return;
		const draft = {
			title,
			slug,
			subtitle,
			description,
			courseTimeline,
			thumbnailUrl: thumbnailUrl.startsWith("blob:") ? "" : thumbnailUrl,
			categoryId,
			level,
			language,
			pricing,
			price,
			status,
			modules,
			outcomes,
			requirements,
			resources
		};
		window.localStorage.setItem("bridge_skills_tutor_course_draft", JSON.stringify(draft));
	}, [
		title,
		slug,
		subtitle,
		description,
		courseTimeline,
		thumbnailUrl,
		categoryId,
		level,
		language,
		pricing,
		price,
		status,
		modules,
		outcomes,
		requirements,
		resources,
		isEdit
	]);
	function slugify(value) {
		return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 64);
	}
	async function handleGenerate() {
		setAiBusy(true);
		try {
			const [titleResponse, descriptionResponse] = await Promise.all([generateCourseTitle(prompt), generateCourseDescription(prompt)]);
			setTitleSuggestion(titleResponse?.title ?? titleResponse?.suggestion ?? null);
			setDescriptionSuggestion(descriptionResponse?.description ?? descriptionResponse?.result ?? null);
		} finally {
			setAiBusy(false);
		}
	}
	function getNewId() {
		return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Math.random().toString(36).slice(2, 10);
	}
	function handleAddModule() {
		const moduleId = `module-${getNewId()}`;
		setModules((prev) => [...prev, {
			id: moduleId,
			title: "New module",
			description: "Describe what this module covers.",
			lessons: [],
			_persisted: false
		}]);
		setExpandedModules((current) => ({
			...current,
			[moduleId]: true
		}));
		setStep(2);
	}
	function handleRemoveModule(index) {
		setModules((prev) => prev.filter((_, idx) => idx !== index));
	}
	function handleUpdateModule(index, patch) {
		setModules((prev) => prev.map((module, idx) => idx === index ? {
			...module,
			...patch
		} : module));
	}
	function handleAddLesson(moduleIndex) {
		setModules((prev) => prev.map((module, idx) => idx === moduleIndex ? {
			...module,
			lessons: [...module.lessons, {
				id: `lesson-${getNewId()}`,
				title: "New lesson",
				duration: "15 min",
				type: "video",
				videoUrl: "",
				description: "",
				content: "",
				videoFile: "",
				pdfFile: "",
				audioFile: "",
				pptFile: "",
				thumbnail: "",
				subtitleVtt: "",
				xpReward: 10,
				isFree: false,
				isDrip: false,
				dripAfter: 0,
				isPublished: true,
				_persisted: false
			}]
		} : module));
	}
	function handleUpdateLesson(moduleIndex, lessonIndex, patch) {
		setModules((prev) => prev.map((module, idx) => idx === moduleIndex ? {
			...module,
			lessons: module.lessons.map((lesson, lessonIdx) => lessonIdx === lessonIndex ? {
				...lesson,
				...patch
			} : lesson)
		} : module));
	}
	function handleRemoveLesson(moduleIndex, lessonIndex) {
		setModules((prev) => prev.map((module, idx) => idx === moduleIndex ? {
			...module,
			lessons: module.lessons.filter((_, lessonIdx) => lessonIdx !== lessonIndex)
		} : module));
	}
	function handleAddOutcome() {
		if (!newOutcome.trim()) return;
		setOutcomes((prev) => [...prev, newOutcome.trim()]);
		setNewOutcome("");
	}
	function handleAddRequirement() {
		if (!newRequirement.trim()) return;
		setRequirements((prev) => [...prev, newRequirement.trim()]);
		setNewRequirement("");
	}
	function handleRemoveOutcome(index) {
		setOutcomes((prev) => prev.filter((_, idx) => idx !== index));
	}
	function handleRemoveRequirement(index) {
		setRequirements((prev) => prev.filter((_, idx) => idx !== index));
	}
	function handleAddResource() {
		if (!newResourceLabel.trim() || !newResourceUrl.trim()) return;
		setResources((prev) => [...prev, {
			id: `resource-${getNewId()}`,
			label: newResourceLabel.trim(),
			url: newResourceUrl.trim(),
			type: "Link"
		}]);
		setNewResourceLabel("");
		setNewResourceUrl("");
	}
	function restoreDraft() {
		if (!savedDraft) return;
		const draft = savedDraft;
		if (draft?.title) setTitle(draft.title);
		if (draft?.slug) setSlug(draft.slug);
		if (draft?.subtitle) setSubtitle(draft.subtitle);
		if (draft?.description) setDescription(draft.description);
		if (draft?.categoryId) setCategoryId(draft.categoryId);
		if (draft?.level) setLevel(draft.level);
		if (draft?.language) setLanguage(draft.language);
		if (draft?.pricing) setPricing(draft.pricing);
		if (draft?.price) setPrice(draft.price);
		if (draft?.status) setStatus(draft.status);
		if (Array.isArray(draft?.modules)) setModules(draft.modules);
		if (Array.isArray(draft?.outcomes)) setOutcomes(draft.outcomes);
		if (Array.isArray(draft?.requirements)) setRequirements(draft.requirements);
		if (Array.isArray(draft?.resources)) setResources(draft.resources);
		try {
			window.localStorage.removeItem("bridge_skills_tutor_course_draft");
		} catch {}
		setSavedDraft(null);
		toast.success("Draft restored");
	}
	function discardDraft() {
		try {
			window.localStorage.removeItem("bridge_skills_tutor_course_draft");
		} catch {}
		setSavedDraft(null);
		toast.info("Draft discarded");
	}
	function handleRemoveResource(index) {
		setResources((prev) => prev.filter((_, idx) => idx !== index));
	}
	function handleGenerateOutline() {
		if (!title.trim()) {
			setError("Set a course title first to generate an outline.");
			return;
		}
		setError(null);
		const base = title.trim();
		setModules([
			{
				id: `module-${getNewId()}`,
				title: `Introduction to ${base}`,
				description: `Set the stage with objectives and what learners will accomplish in this course.`,
				_persisted: false,
				lessons: [{
					id: `lesson-${getNewId()}`,
					title: `Why ${base} matters`,
					duration: "12 min",
					type: "video",
					description: "",
					content: "",
					_persisted: false
				}, {
					id: `lesson-${getNewId()}`,
					title: `Course overview and outcomes`,
					duration: "15 min",
					type: "text",
					description: "",
					content: "",
					_persisted: false
				}]
			},
			{
				id: `module-${getNewId()}`,
				title: `Core ${base} concepts`,
				description: `Bring together the main knowledge areas with clear examples and exercises.`,
				_persisted: false,
				lessons: [{
					id: `lesson-${getNewId()}`,
					title: `Core idea #1`,
					duration: "18 min",
					type: "video",
					description: "",
					content: "",
					_persisted: false
				}, {
					id: `lesson-${getNewId()}`,
					title: `Core idea #2`,
					duration: "18 min",
					type: "video",
					description: "",
					content: "",
					_persisted: false
				}]
			},
			{
				id: `module-${getNewId()}`,
				title: `Practice and assessment`,
				description: `Help learners apply skills through guided practice and review.`,
				_persisted: false,
				lessons: [{
					id: `lesson-${getNewId()}`,
					title: `Hands-on exercise`,
					duration: "25 min",
					type: "assignment",
					description: "",
					content: "",
					_persisted: false
				}, {
					id: `lesson-${getNewId()}`,
					title: `Final review`,
					duration: "10 min",
					type: "quiz",
					description: "",
					content: "",
					_persisted: false
				}]
			}
		]);
		if (outcomes.length === 0) setOutcomes([`Explain the fundamentals of ${base}`, `Apply core skills in realistic scenarios`]);
		if (requirements.length === 0) setRequirements([`Basic familiarity with the course topic`, `A browser and a willingness to practice`]);
		setStep(2);
		toast.success("Outline generated");
	}
	async function handleSave(event) {
		event.preventDefault();
		setError(null);
		setSaving(true);
		try {
			const newSlug = slug || slugify(title);
			if (!title.trim()) throw new Error("Course title is required.");
			if (!description.trim()) throw new Error("Course description is required.");
			if (!courseTimeline.trim()) throw new Error("Total course timeline is required.");
			if (modules.length === 0) throw new Error("Add at least one module to build a complete course.");
			if (modules.reduce((sum, module) => sum + module.lessons.length, 0) === 0) throw new Error("Add at least one lesson to your curriculum.");
			for (const module of modules) for (const [lessonIndex, lesson] of module.lessons.entries()) {
				const message = validateLesson(lesson, normalizeLessonType(lesson.type));
				if (message) throw new Error(`Lesson ${lessonIndex + 1} in "${module.title}": ${message}`);
				const oversized = [
					lesson.videoFile,
					lesson.pdfFile,
					lesson.audioFile,
					lesson.pptFile,
					lesson.thumbnail,
					lesson.subtitleVtt
				].map(oversizedUpload).find(Boolean);
				if (oversized) throw new Error(`"${oversized.name}" is too large. Files must be smaller than 4 MB for this API.`);
			}
			const oversizedThumbnail = oversizedUpload(thumbnailFile);
			if (oversizedThumbnail) throw new Error(`"${oversizedThumbnail.name}" is too large. Files must be smaller than 4 MB for this API.`);
			const payload = {
				title: title.trim(),
				slug: newSlug,
				subtitle: subtitle.trim() || void 0,
				description: description.trim(),
				duration: courseTimeline.trim() || void 0,
				thumbnail: thumbnailFile ?? void 0,
				category: categoryId ?? 1,
				level,
				language,
				status,
				pricing,
				price: pricing === "free" ? "0" : price.trim() || "0",
				outcomes: outcomes.length > 0 ? outcomes : void 0,
				requirements: requirements.length > 0 ? requirements : void 0
			};
			let saved = null;
			if (isEdit) {
				saved = await patchCourse(originalSlug ?? newSlug, payload);
				toast.success("Course updated successfully!");
			} else {
				saved = await createCourse(payload);
				toast.success("Course created successfully!");
			}
			const storedThumbnail = saved?.thumbnail ?? saved?.thumbnail_url;
			if (storedThumbnail) {
				setThumbnailUrl(String(storedThumbnail));
				setThumbnailFile(null);
			}
			const courseSlug = saved?.slug ?? newSlug;
			const persistedModules = await Promise.all(modules.map(async (module, moduleIndex) => {
				const isPersistedModule = module._persisted ?? looksPersistedId(module.id);
				const data = {
					course: saved?.id,
					title: module.title.trim(),
					description: module.description.trim(),
					module_order: moduleIndex + 1,
					is_published: status === "published"
				};
				if (isPersistedModule) {
					await updateTutorModule(module.id, data);
					return {
						...module,
						id: module.id,
						_persisted: true
					};
				}
				const createdModule = await createTutorModule(courseSlug, data);
				const moduleId = String(createdModule?.id ?? createdModule?.module?.id ?? "");
				if (!moduleId) throw new Error(`Unable to create module "${module.title}".`);
				return {
					...module,
					id: moduleId,
					_persisted: true
				};
			}));
			const lessonPayloads = persistedModules.flatMap((module, moduleIndex) => module.lessons.map((lesson, lessonIndex) => {
				const videoUrl = lesson.videoUrl?.trim() || "";
				const type = normalizeLessonType(lesson.type);
				return {
					id: lesson.id,
					_persisted: lesson._persisted ?? looksPersistedId(lesson.id),
					title: lesson.title.trim(),
					slug: lesson.slug || `${slugify(lesson.title)}-${moduleIndex + 1}-${lessonIndex + 1}`,
					type,
					...videoUrl ? {
						video_url: videoUrl,
						video_source: /youtube\.com|youtu\.be/i.test(videoUrl) ? "youtube" : void 0
					} : {},
					video_file: mediaPayload(lesson.videoFile),
					pdf_file: mediaPayload(lesson.pdfFile),
					audio_file: mediaPayload(lesson.audioFile),
					ppt_file: mediaPayload(lesson.pptFile),
					thumbnail: mediaPayload(lesson.thumbnail),
					subtitle_vtt: mediaPayload(lesson.subtitleVtt),
					description: lesson.description ?? "",
					content: lesson.content ?? "",
					module: module.id,
					duration: 0,
					xp_reward: Math.max(0, Number(lesson.xpReward ?? 10)),
					is_free: Boolean(lesson.isFree ?? (moduleIndex === 0 && lessonIndex === 0)),
					is_drip: Boolean(lesson.isDrip),
					drip_after: Math.max(0, Number(lesson.dripAfter ?? 0)),
					is_published: lesson.isPublished ?? status === "published",
					lesson_order: lessonIndex + 1
				};
			}));
			await Promise.all(lessonPayloads.map(async (lesson) => {
				const { id, _persisted, ...payload } = lesson;
				if (isEdit && _persisted) await updateTutorLesson(id, payload);
				else await createTutorLesson(courseSlug, payload);
			}));
			if (isEdit) {
				const currentLessonIds = new Set(lessonPayloads.filter((lesson) => lesson._persisted).map((lesson) => String(lesson.id)));
				await Promise.all(originalLessonIds.filter((id) => !currentLessonIds.has(id)).map((id) => deleteTutorLesson(id)));
			}
			const categoryName = categories.find((item) => item.id === categoryId)?.name ?? "General";
			const savedCourse = {
				...saved ?? {},
				...payload,
				thumbnail: storedThumbnail ?? thumbnailUrl ?? "",
				duration: saved?.duration ?? courseTimeline,
				id: saved?.id ?? originalSlug ?? newSlug,
				slug: saved?.slug ?? newSlug,
				category: typeof saved?.category === "object" ? saved.category?.name ?? categoryName : saved?.category ?? categoryName,
				modules: persistedModules,
				resources
			};
			if (typeof window !== "undefined") window.localStorage.setItem(savedCourseKey, JSON.stringify(savedCourse));
			if (typeof window !== "undefined") try {
				window.localStorage.removeItem("bridge_skills_tutor_course_draft");
			} catch {}
			navigate({ to: "/tutor/courses" });
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unable to save course.";
			setError(message);
			toast.error(message);
		} finally {
			setSaving(false);
		}
	}
	const getLessonTypeIcon = (type) => {
		return {
			video: Video,
			text: FileText,
			quiz: FileQuestionMark,
			assignment: Briefcase,
			audio: Volume2,
			document: BookOpen
		}[type] || FileText;
	};
	const getStatusBadgeColor = (status) => {
		return status === "published" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-amber-50 text-amber-600 border-amber-200";
	};
	if (loadingCourse) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: "Loading course data..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-6 p-4 sm:p-6 max-w-7xl mx-auto",
		onSubmit: handleSave,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl sm:text-3xl font-bold text-gray-900",
					children: isEdit ? "Edit Course" : "Course Builder"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 mt-1",
					children: isEdit ? "Update your course details and curriculum" : "Design your curriculum step by step and publish a new course"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [isEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200",
						children: ["Editing: ", originalSlug]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(status)}`,
						children: status === "published" ? "Published" : "Draft"
					})]
				})]
			}),
			!isEdit && savedDraft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-blue-50 border border-blue-200 rounded-xl p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 bg-blue-100 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-4 h-4 text-blue-600" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-gray-900",
							children: "Saved draft found"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500",
							children: "From a previous session"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 w-full sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: restoreDraft,
							className: "flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium",
							children: "Restore draft"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: discardDraft,
							className: "flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium",
							children: "Discard"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl border border-gray-200 p-3 sm:p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 sm:flex sm:flex-wrap gap-1",
					children: steps.map((s, i) => {
						const done = i < step;
						const active = i === step;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 min-w-[80px] sm:min-w-[120px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setStep(i),
								className: `flex w-full items-center gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-medium transition-colors ${active ? "bg-blue-600 text-white" : done ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid h-4 w-4 sm:h-5 sm:w-5 shrink-0 place-items-center rounded-full text-[8px] sm:text-[10px] font-bold ${active ? "bg-white/20 text-white" : done ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-400"}`,
									children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-2 w-2 sm:h-3 sm:w-3" }) : i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: s
								})]
							})
						}, s);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.5fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-6",
					children: [step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 bg-blue-50 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-5 h-5 text-blue-600" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-gray-900",
							children: "Course Details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500",
							children: "Capture the metadata learners need to discover your course"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-gray-700",
										children: "Course Title *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: title,
										onChange: (event) => setTitle(event.target.value),
										className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
										placeholder: "e.g. Networking fundamentals for engineers"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-gray-700",
											children: "Course Slug"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: slug,
											onChange: (event) => setSlug(slugify(event.target.value)),
											className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											placeholder: "networking-fundamentals",
											disabled: isEdit
										}),
										isEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-gray-400",
											children: "Slug cannot be changed when editing"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-gray-700",
									children: "Subtitle"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: subtitle,
									onChange: (event) => setSubtitle(event.target.value),
									className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
									placeholder: "A short supporting summary for the course"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-gray-700",
									children: "Description *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: description,
									onChange: (event) => setDescription(event.target.value),
									rows: 4,
									className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y",
									placeholder: "Write a short summary of what this course covers"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-gray-700",
										children: "Total course timeline *"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: courseTimeline,
										onChange: (event) => setCourseTimeline(event.target.value),
										className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
										placeholder: "e.g. 8 weeks or 24 hours"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-gray-500",
										children: "This is the learner-facing course duration. Individual lessons do not need a duration."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-gray-700",
									children: "Course Thumbnail"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
										"Upload image",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											className: "sr-only",
											onChange: (event) => {
												const file = event.target.files?.[0] ?? null;
												if (!file) return;
												setThumbnailFile(file);
												setThumbnailUrl(URL.createObjectURL(file));
											}
										})
									]
								})]
							}),
							thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-lg border border-gray-200 bg-gray-50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: thumbnailUrl,
										alt: "Course thumbnail preview",
										className: "h-40 w-full object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-3 py-2 text-xs text-gray-500",
										children: thumbnailFile?.name ?? "Current course thumbnail"
									}),
									thumbnailFile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "border-t border-gray-200 px-3 py-2 text-xs text-amber-700",
										children: "Uploaded to the course bucket when you save."
									})
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-gray-700",
											children: "Category"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: categoryId ?? "",
											onChange: (event) => setCategoryId(Number(event.target.value)),
											className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: category.id,
												children: category.name
											}, category.id))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-gray-700",
											children: "Level"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: level,
											onChange: (event) => setLevel(event.target.value),
											className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "beginner",
													children: "Beginner"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "intermediate",
													children: "Intermediate"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "advanced",
													children: "Advanced"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-gray-700",
											children: "Language"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: language,
											onChange: (event) => setLanguage(event.target.value),
											className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											placeholder: "English"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-gray-700",
											children: "Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: status,
											onChange: (event) => setStatus(event.target.value),
											className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "draft",
												children: "Draft"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "published",
												children: "Published"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-gray-700",
											children: "Pricing"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: pricing,
											onChange: (event) => setPricing(event.target.value),
											className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "free",
												children: "Free"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "paid",
												children: "Paid"
											})]
										})]
									}),
									pricing === "paid" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-gray-700",
											children: "Price (UGX)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: "0",
											step: "1000",
											value: price,
											onChange: (event) => setPrice(event.target.value),
											className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											placeholder: "0"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold text-gray-900",
											children: "AI Assistant"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-gray-600",
											children: "Describe your course topic"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: prompt,
											onChange: (event) => setPrompt(event.target.value),
											className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
											placeholder: "e.g. A beginner course on cybersecurity fundamentals"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2 mt-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => void handleGenerate(),
											disabled: aiBusy,
											className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50",
											children: aiBusy ? "Generating..." : "Generate Suggestions"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleGenerateOutline,
											className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium",
											children: "Generate Outline"
										})]
									}),
									(titleSuggestion || descriptionSuggestion) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 space-y-2",
										children: [titleSuggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-white rounded-lg p-3 border border-gray-200",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-gray-500",
													children: "Suggested Title"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-medium text-gray-900",
													children: titleSuggestion
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setTitle(titleSuggestion),
													className: "px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
													children: "Use"
												})]
											})
										}), descriptionSuggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-white rounded-lg p-3 border border-gray-200",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-gray-500",
														children: "Suggested Description"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm text-gray-600",
														children: descriptionSuggestion
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setDescription(descriptionSuggestion),
													className: "px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0",
													children: "Use"
												})]
											})
										})]
									})
								]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600",
								children: error
							})
						]
					})] }) : step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 bg-indigo-50 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-5 h-5 text-indigo-600" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-gray-900",
							children: "Outcomes & Requirements"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500",
							children: "Define what learners will gain and what they need before starting"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-gray-200 rounded-xl p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "w-4 h-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold text-gray-900",
											children: "Learning Outcomes"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs bg-gray-100 px-2 py-1 rounded-full",
										children: outcomes.length
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: outcomes.map((outcome, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 bg-gray-50 rounded-lg p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-semibold text-blue-600",
												children: index + 1
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-gray-700 flex-1",
												children: outcome
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => handleRemoveOutcome(index),
												className: "text-gray-400 hover:text-red-500 transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
											})
										]
									}, index))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newOutcome,
										onChange: (event) => setNewOutcome(event.target.value),
										onKeyDown: (e) => e.key === "Enter" && handleAddOutcome(),
										className: "flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
										placeholder: "Add a learning outcome"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleAddOutcome,
										className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap",
										children: "Add"
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-gray-200 rounded-xl p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Book, { className: "w-4 h-4 text-purple-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold text-gray-900",
											children: "Requirements"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs bg-gray-100 px-2 py-1 rounded-full",
										children: requirements.length
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: requirements.map((requirement, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 bg-gray-50 rounded-lg p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-semibold text-purple-600",
												children: index + 1
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-gray-700 flex-1",
												children: requirement
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => handleRemoveRequirement(index),
												className: "text-gray-400 hover:text-red-500 transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
											})
										]
									}, index))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newRequirement,
										onChange: (event) => setNewRequirement(event.target.value),
										onKeyDown: (e) => e.key === "Enter" && handleAddRequirement(),
										className: "flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
										placeholder: "Add a requirement"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleAddRequirement,
										className: "px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium whitespace-nowrap",
										children: "Add"
									})]
								})
							]
						})]
					})] }) : step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 bg-emerald-50 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Book, { className: "w-5 h-5 text-emerald-600" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-gray-900",
							children: "Curriculum"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500",
							children: "Add modules and lessons to structure the course"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [modules.map((module, moduleIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-gray-200 rounded-xl p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setExpandedModules((current) => ({
											...current,
											[module.id]: !current[module.id]
										})),
										className: "mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50",
										"aria-label": `${expandedModules[module.id] ? "Collapse" : "Expand"} ${module.title}`,
										children: expandedModules[module.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium text-gray-700",
												children: "Module Title"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: module.title,
												onChange: (event) => handleUpdateModule(moduleIndex, { title: event.target.value }),
												className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium text-gray-700",
												children: "Module Description"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												value: module.description,
												onChange: (event) => handleUpdateModule(moduleIndex, { description: event.target.value }),
												rows: 2,
												className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleAddLesson(moduleIndex),
											className: "px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium",
											children: "+ Lesson"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleRemoveModule(moduleIndex),
											className: "px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium",
											children: "Remove"
										})]
									})
								]
							}), expandedModules[module.id] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 space-y-3 border-t border-gray-100 pt-4",
								children: module.lessons.map((lesson, lessonIndex) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-gray-50 rounded-lg p-4 border border-gray-200",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3 mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(getLessonTypeIcon(lesson.type), { className: "w-4 h-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-sm font-medium text-gray-700",
													children: ["Lesson ", lessonIndex + 1]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => handleRemoveLesson(moduleIndex, lessonIndex),
												className: "text-gray-400 hover:text-red-500 transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-gray-500",
														children: "Title"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: lesson.title,
														onChange: (event) => handleUpdateLesson(moduleIndex, lessonIndex, { title: event.target.value }),
														className: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-gray-500",
														children: "Type"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: lesson.type,
														onChange: (event) => handleUpdateLesson(moduleIndex, lessonIndex, { type: normalizeLessonType(event.target.value) }),
														className: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "document",
																children: "Document"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "text",
																children: "Text"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "video",
																children: "Video"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "audio",
																children: "Audio"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "assignment",
																children: "Assignment"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "quiz",
																children: "Quiz"
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "space-y-1 sm:col-span-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-gray-500",
														children: "Description / content (HTML)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														value: lesson.content ?? "",
														onChange: (event) => handleUpdateLesson(moduleIndex, lessonIndex, { content: event.target.value }),
														rows: 3,
														className: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
														placeholder: "Add lesson instructions, transcript, or notes"
													})]
												}),
												lesson.type === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonField, {
													label: "Video URL",
													value: lesson.videoUrl,
													placeholder: "https://youtube.com/...",
													onChange: (value) => handleUpdateLesson(moduleIndex, lessonIndex, { videoUrl: value })
												}),
												lesson.type !== "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonField, {
													label: "Video URL (supplementary)",
													value: lesson.videoUrl,
													placeholder: "https://...",
													onChange: (value) => handleUpdateLesson(moduleIndex, lessonIndex, { videoUrl: value })
												}),
												lesson.type === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonFileField, {
													label: "Video file",
													value: lesson.videoFile,
													accept: "video/*",
													onChange: (value) => handleUpdateLesson(moduleIndex, lessonIndex, { videoFile: value })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonFileField, {
													label: "Audio file (optional)",
													value: lesson.audioFile,
													accept: "audio/*",
													onChange: (value) => handleUpdateLesson(moduleIndex, lessonIndex, { audioFile: value })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonFileField, {
													label: "PDF file (optional)",
													value: lesson.pdfFile,
													accept: "application/pdf",
													onChange: (value) => handleUpdateLesson(moduleIndex, lessonIndex, { pdfFile: value })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonFileField, {
													label: "PowerPoint file (optional)",
													value: lesson.pptFile,
													accept: ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation",
													onChange: (value) => handleUpdateLesson(moduleIndex, lessonIndex, { pptFile: value })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonFileField, {
													label: "Lesson thumbnail (optional)",
													value: lesson.thumbnail,
													accept: "image/*",
													onChange: (value) => handleUpdateLesson(moduleIndex, lessonIndex, { thumbnail: value })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonFileField, {
													label: "Subtitles VTT (optional)",
													value: lesson.subtitleVtt,
													accept: ".vtt,text/vtt",
													onChange: (value) => handleUpdateLesson(moduleIndex, lessonIndex, { subtitleVtt: value })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex items-center gap-2 text-xs text-gray-600 sm:col-span-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "checkbox",
															checked: lesson.isDrip ?? false,
															onChange: (event) => handleUpdateLesson(moduleIndex, lessonIndex, { isDrip: event.target.checked })
														}),
														" Release after enrollment day ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "number",
															min: "0",
															value: lesson.dripAfter ?? 0,
															onChange: (event) => handleUpdateLesson(moduleIndex, lessonIndex, { dripAfter: Number(event.target.value) }),
															className: "w-20 rounded border border-gray-200 px-2 py-1"
														})
													]
												})
											]
										})]
									}, lesson.id);
								})
							})]
						}, module.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleAddModule,
							className: "w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-600 hover:text-blue-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 inline mr-2" }), "Add Module"]
						})]
					})] }) : step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 bg-orange-50 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, { className: "w-5 h-5 text-orange-600" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-gray-900",
							children: "Resources"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500",
							children: "Attach supporting materials and links"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-gray-700",
										children: "Resource Label"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newResourceLabel,
										onChange: (event) => setNewResourceLabel(event.target.value),
										className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
										placeholder: "e.g. Course Workbook"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-gray-700",
										children: "URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newResourceUrl,
										onChange: (event) => setNewResourceUrl(event.target.value),
										className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
										placeholder: "https://..."
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleAddResource,
								className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4 inline mr-2" }), "Add Resource"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: resources.map((resource, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-gray-900",
											children: resource.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: resource.url,
											target: "_blank",
											rel: "noreferrer",
											className: "text-sm text-blue-600 hover:underline truncate block",
											children: resource.url
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleRemoveResource(index),
										className: "text-gray-400 hover:text-red-500 transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
									})]
								}, resource.id))
							})
						]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 bg-purple-50 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-5 h-5 text-purple-600" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-gray-900",
							children: "Preview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500",
							children: "Review the course before saving"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadgeColor(status)}`,
												children: status === "published" ? "Published" : "Draft"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-600",
												children: pricing === "free" ? "Free" : `Paid • UGX ${Number(price).toLocaleString()}`
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xl font-bold text-gray-900 mt-2",
											children: title || "Course Title"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-gray-600",
											children: subtitle || "Course subtitle"
										})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-white/80 rounded-lg p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-gray-500",
											children: "Category"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-gray-900",
											children: categories.find((item) => item.id === categoryId)?.name ?? "General"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-white/80 rounded-lg p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-gray-500",
											children: "Level"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-gray-900",
											children: level.charAt(0).toUpperCase() + level.slice(1)
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 bg-white/80 rounded-lg p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: "Description"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-600 mt-1",
										children: description || "No description provided"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid grid-cols-3 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white/80 rounded-lg p-2 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500",
												children: "Modules"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-lg font-bold text-gray-900",
												children: modules.length
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white/80 rounded-lg p-2 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500",
												children: "Lessons"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-lg font-bold text-gray-900",
												children: modules.reduce((sum, m) => sum + m.lessons.length, 0)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white/80 rounded-lg p-2 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500",
												children: "Course timeline"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-lg font-bold text-gray-900",
												children: courseTimeline || "TBD"
											})]
										})
									]
								}),
								outcomes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 bg-white/80 rounded-lg p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: "Learning Outcomes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mt-1 space-y-1",
										children: [outcomes.slice(0, 3).map((outcome, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "text-sm text-gray-600",
											children: ["• ", outcome]
										}, i)), outcomes.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "text-sm text-gray-400",
											children: [
												"+ ",
												outcomes.length - 3,
												" more"
											]
										})]
									})]
								})
							]
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 pt-4 border-t border-gray-200",
						children: [
							step > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setStep((prev) => Math.max(prev - 1, 0)),
								className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" }), "Back"]
							}),
							step < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setStep((prev) => Math.min(prev + 1, steps.length - 1)),
								className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1 ml-auto",
								children: ["Next Step", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })]
							}),
							step === steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: saving,
								className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ml-auto disabled:opacity-50 flex items-center gap-2",
								children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4 animate-spin" }), isEdit ? "Updating..." : "Creating..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), isEdit ? "Update Course" : "Create Course"] })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4 h-fit sticky top-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-4 h-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-gray-900",
							children: "Draft Summary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-gray-900",
										children: status === "published" ? "Published" : "Draft"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-xs font-medium px-2 py-1 rounded-full ${pricing === "free" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`,
										children: pricing === "free" ? "Free" : `UGX ${Number(price).toLocaleString()}`
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-gray-900",
										children: title || "Untitled Course"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: subtitle || "No subtitle"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-gray-50 rounded-lg p-2 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-gray-500",
											children: "Modules"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-bold text-gray-900",
											children: modules.length
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-gray-50 rounded-lg p-2 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-gray-500",
											children: "Lessons"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-bold text-gray-900",
											children: modules.reduce((sum, m) => sum + m.lessons.length, 0)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-gray-50 rounded-lg p-2 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-gray-500",
											children: "Course timeline"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-bold text-gray-900",
											children: courseTimeline || "TBD"
										})]
									})
								]
							}),
							modules.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-gray-200 rounded-lg p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-gray-500 mb-2",
									children: "Latest Modules"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [modules.slice(0, 3).map((module) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gray-700 truncate",
											children: module.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-gray-400",
											children: [module.lessons.length, " lessons"]
										})]
									}, module.id)), modules.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-gray-400",
										children: [
											"+ ",
											modules.length - 3,
											" more modules"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleAddModule,
								className: "w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-600 hover:text-blue-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 inline mr-1" }), "Add Module"]
							})
						]
					})]
				})]
			})
		]
	});
}
var Route$6 = createFileRoute("/tutor/certificates")({ component: TutorCertificates });
function TutorCertificates() {
	const [certificates, setCertificates] = (0, import_react.useState)([]);
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [students, setStudents] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [filterStatus, setFilterStatus] = (0, import_react.useState)("all");
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const [coursesData, studentsData] = await Promise.all([getCourses().catch(() => []), getStudents().catch(() => [])]);
				setCourses(coursesData);
				setStudents(studentsData);
				const certs = studentsData.filter((s) => s.progress >= 100).map((s, index) => ({
					id: `cert-${index}`,
					certificate_number: `TBS-${String(index + 1).padStart(6, "0")}`,
					course_title: s.course || "Course Completion",
					student_name: s.name || "Student",
					student_email: s.email || "",
					issued_at: s.enrolled || (/* @__PURE__ */ new Date()).toISOString(),
					status: "valid",
					score: Math.round(70 + Math.random() * 30)
				}));
				setCertificates(certs);
			} catch (error) {
				console.error("Error fetching data:", error);
				toast.error("Failed to load certificates");
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);
	const filteredCerts = certificates.filter((c) => {
		if (filterStatus === "valid" && c.status !== "valid") return false;
		if (filterStatus === "pending" && c.status !== "pending") return false;
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			const certNumber = c.certificate_number?.toLowerCase() || "";
			const courseTitle = c.course_title?.toLowerCase() || "";
			const studentName = c.student_name?.toLowerCase() || "";
			return certNumber.includes(query) || courseTitle.includes(query) || studentName.includes(query);
		}
		return true;
	});
	const totalIssued = certificates.length;
	const validCerts = certificates.filter((c) => c.status === "valid").length;
	const recentIssued = certificates.filter((c) => {
		const issuedDate = new Date(c.issued_at);
		const thirtyDaysAgo = /* @__PURE__ */ new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
		return issuedDate >= thirtyDaysAgo;
	}).length;
	const templates = courses.filter((c) => c.status === "published").slice(0, 4).map((course, index) => ({
		id: course.id || index,
		name: course.title,
		description: `Certificate for ${course.title}`,
		issued_count: Math.floor(Math.random() * 100) + 50,
		is_active: true,
		color: [
			"#3B82F6",
			"#8B5CF6",
			"#10B981",
			"#F59E0B"
		][index % 4]
	}));
	const statCards = [
		{
			icon: Award,
			value: totalIssued,
			label: "Total Issued",
			subtext: `${recentIssued} in last 30 days`,
			color: "blue"
		},
		{
			icon: FileText,
			value: courses.filter((c) => c.status === "published").length,
			label: "Active Templates",
			subtext: `${courses.length} total courses`,
			color: "emerald"
		},
		{
			icon: Users,
			value: students.length,
			label: "Total Students",
			subtext: `${validCerts} certified`,
			color: "purple"
		},
		{
			icon: Sparkles,
			value: students.length > 0 ? Math.round(validCerts / Math.max(students.length, 1) * 100) + "%" : "0%",
			label: "Certification Rate",
			subtext: "Students with certificates",
			color: "amber"
		}
	];
	const statColorMap = {
		blue: "bg-blue-50 text-blue-600",
		emerald: "bg-emerald-50 text-emerald-600",
		purple: "bg-purple-50 text-purple-600",
		amber: "bg-amber-50 text-amber-600"
	};
	const getStatusBadge = (status) => {
		const config = {
			valid: {
				label: "Valid",
				className: "bg-emerald-50 text-emerald-600 border-emerald-200"
			},
			expired: {
				label: "Expired",
				className: "bg-red-50 text-red-600 border-red-200"
			},
			pending: {
				label: "Pending",
				className: "bg-amber-50 text-amber-600 border-amber-200"
			}
		};
		return config[status] || config.valid;
	};
	const formatDate = (dateString) => {
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) return "—";
			return date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		} catch {
			return "—";
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: "Loading certificates..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-4 sm:p-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl sm:text-3xl font-bold text-gray-900",
					children: "Certificates"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 mt-1",
					children: "Manage certificates issued to students who complete your courses"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium border border-blue-200",
						children: [totalIssued, " issued"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
				children: statCards.map((stat, index) => {
					const Icon = stat.icon;
					const colorClass = statColorMap[stat.color];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-2 rounded-lg ${colorClass}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg sm:text-xl font-bold text-gray-900",
									children: stat.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-gray-500",
									children: stat.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] sm:text-xs text-gray-400",
									children: stat.subtext
								})
							] })]
						})
					}, index);
				})
			}),
			templates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-xl border border-gray-200 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 sm:p-6 border-b border-gray-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900",
							children: "Certificate Templates"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500",
							children: "Templates available for your courses"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full",
							children: [templates.filter((t) => t.is_active).length, " active"]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 sm:p-6",
					children: templates.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `border rounded-xl p-4 transition-all ${template.is_active ? "border-gray-200 hover:border-blue-300 hover:shadow-md" : "border-gray-200 opacity-60"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "aspect-[4/3] rounded-lg p-4 text-center relative overflow-hidden",
							style: {
								background: `linear-gradient(135deg, ${template.color}15, ${template.color}05)`,
								border: `1px solid ${template.color}30`
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 opacity-5",
								style: { background: `radial-gradient(circle at center, ${template.color}, transparent 70%)` }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold uppercase tracking-widest text-gray-400",
										children: "Certificate"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 text-sm font-semibold",
										style: { color: template.color },
										children: template.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 w-12 h-0.5 mx-auto",
										style: { background: template.color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 text-[10px] text-gray-400",
										children: [template.issued_count.toLocaleString(), " issued"]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-gray-900 truncate",
									children: template.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] font-medium px-2 py-0.5 rounded-full ${template.is_active ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400"}`,
									children: template.is_active ? "Active" : "Inactive"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400 mt-1 truncate",
								children: template.description
							})]
						})]
					}, template.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-xl border border-gray-200 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 sm:p-6 border-b border-gray-200",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base sm:text-lg font-semibold text-gray-900",
								children: "Recent Certificates"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500",
								children: "Certificates issued to students"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Search certificates...",
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value),
										className: "pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full sm:w-48"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: filterStatus,
									onChange: (e) => setFilterStatus(e.target.value),
									className: "px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "all",
											children: "All Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "valid",
											children: "Valid"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "pending",
											children: "Pending"
										})
									]
								})]
							})]
						})
					}),
					filteredCerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-16 h-16 text-gray-300 mx-auto mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-gray-500 font-medium",
								children: "No certificates found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-400 mt-1",
								children: searchQuery ? "Try adjusting your search" : "Certificates will appear when students complete your courses"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-gray-200 bg-gray-50/80 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4 sm:px-6",
										children: "Certificate"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4 hidden sm:table-cell",
										children: "Student"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4 hidden md:table-cell",
										children: "Course"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4 hidden lg:table-cell",
										children: "Issued"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4 sm:px-6 text-right",
										children: "Actions"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredCerts.slice(0, 10).map((cert) => {
								const statusConfig = getStatusBadge(cert.status);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4 sm:px-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center flex-shrink-0",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-4 h-4 text-amber-600" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-sm font-medium text-gray-900",
													children: ["#", cert.certificate_number || "N/A"]
												}) })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4 hidden sm:table-cell",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-gray-700",
												children: cert.student_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-400",
												children: cert.student_email
											})] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4 hidden md:table-cell text-sm text-gray-600",
											children: cert.course_title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4 hidden lg:table-cell text-sm text-gray-500",
											children: formatDate(cert.issued_at)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${statusConfig.className}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3 h-3 mr-1" }), statusConfig.label]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-4 sm:px-6 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-end gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: "p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors",
														title: "Download PDF",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: "p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors",
														title: "View Certificate",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: "p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors",
														title: "Share",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-4 h-4" })
													})
												]
											})
										})
									]
								}, cert.id);
							}) })]
						})
					}),
					filteredCerts.length > 10 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 text-center border-t border-gray-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "text-sm text-blue-600 hover:text-blue-700 font-medium",
							children: [
								"View all ",
								filteredCerts.length,
								" certificates"
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 bg-blue-50 rounded-lg inline-block mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-5 h-5 text-blue-600" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-gray-900",
								children: "New Template"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400",
								children: "Create certificate template"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 bg-emerald-50 rounded-lg inline-block mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-5 h-5 text-emerald-600" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-gray-900",
								children: "Bulk Issue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400",
								children: "Issue multiple certificates"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 bg-purple-50 rounded-lg inline-block mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5 text-purple-600" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-gray-900",
								children: "Email Templates"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400",
								children: "Customize email notifications"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 bg-amber-50 rounded-lg inline-block mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5 text-amber-600" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-gray-900",
								children: "Settings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400",
								children: "Configure certificate options"
							})
						]
					})
				]
			})
		]
	});
}
var Route$5 = createFileRoute("/tutor/courses")({ component: TutorCourses });
function useCourses() {
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [filteredCourses, setFilteredCourses] = (0, import_react.useState)([]);
	const [selectedCourse, setSelectedCourse] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		(async () => {
			setIsLoading(true);
			const courseList = await getCourses();
			try {
				const raw = typeof window !== "undefined" ? window.localStorage.getItem("bridge_skills_tutor_last_saved_course") : null;
				if (raw) {
					const saved = JSON.parse(raw);
					const existsIdx = courseList.findIndex((c) => c.slug === saved.slug);
					if (existsIdx >= 0) courseList[existsIdx] = {
						...courseList[existsIdx],
						...saved
					};
					else courseList.unshift(saved);
				}
			} catch {}
			setCourses(courseList);
			setFilteredCourses(courseList);
			setSelectedCourse(courseList[0] ?? null);
			setIsLoading(false);
		})();
	}, []);
	const deleteCourseHandler = async (course) => {
		if (!course?.slug) return;
		if (!window.confirm(`Delete "${course.title || "this course"}"? This action cannot be undone.`)) return;
		try {
			await deleteCourse(course.slug);
			const remaining = courses.filter((item) => item.slug !== course.slug);
			setCourses(remaining);
			setFilteredCourses(remaining);
			setSelectedCourse((current) => current?.slug === course.slug ? remaining[0] ?? null : current);
			if (typeof window !== "undefined") {
				const saved = window.localStorage.getItem("bridge_skills_tutor_last_saved_course");
				if (saved && JSON.parse(saved)?.slug === course.slug) window.localStorage.removeItem("bridge_skills_tutor_last_saved_course");
			}
		} catch (error) {
			window.alert(error instanceof Error ? error.message : "Unable to delete course.");
		}
	};
	return {
		courses,
		setCourses,
		filteredCourses,
		setFilteredCourses,
		selectedCourse,
		setSelectedCourse,
		isLoading,
		deleteCourse: deleteCourseHandler
	};
}
function useCourseDetails(courseSlug) {
	const [lessons, setLessons] = (0, import_react.useState)([]);
	const [reviews, setReviews] = (0, import_react.useState)([]);
	const [deletingLessonId, setDeletingLessonId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!courseSlug) {
			setLessons([]);
			setReviews([]);
			return;
		}
		(async () => {
			const [lessonList, reviewList] = await Promise.all([getCourseLessons(courseSlug), getCourseReviews(courseSlug)]);
			setLessons(lessonList);
			setReviews(reviewList);
		})();
	}, [courseSlug]);
	const deleteLesson = async (lesson) => {
		const lessonId = String(lesson?.id ?? "");
		if (!lessonId || lessonId.startsWith("lesson-") || deletingLessonId) return;
		if (!window.confirm(`Delete "${lesson.title ?? lesson.name ?? "this lesson"}"?`)) return;
		setDeletingLessonId(lessonId);
		try {
			await deleteTutorLesson(lessonId);
			setLessons((current) => current.filter((item) => String(item.id) !== lessonId));
		} catch (error) {
			window.alert(error instanceof Error ? error.message : "Unable to delete lesson.");
		} finally {
			setDeletingLessonId(null);
		}
	};
	return {
		lessons,
		reviews,
		deletingLessonId,
		deleteLesson
	};
}
function useCourseFilters(courses) {
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [filterStatus, setFilterStatus] = (0, import_react.useState)("all");
	const [viewMode, setViewMode] = (0, import_react.useState)("table");
	const [filteredCourses, setFilteredCourses] = (0, import_react.useState)(courses);
	(0, import_react.useEffect)(() => {
		let filtered = courses;
		if (searchQuery) filtered = filtered.filter((c) => c.title?.toLowerCase().includes(searchQuery.toLowerCase()) || String(c.category ?? "").toLowerCase().includes(searchQuery.toLowerCase()));
		if (filterStatus !== "all") filtered = filtered.filter((c) => c.status === filterStatus);
		setFilteredCourses(filtered);
	}, [
		searchQuery,
		filterStatus,
		courses
	]);
	return {
		searchQuery,
		setSearchQuery,
		filterStatus,
		setFilterStatus,
		viewMode,
		setViewMode,
		filteredCourses
	};
}
function getStatusColor(status) {
	const colors = {
		published: "bg-emerald-50 text-emerald-600 border-emerald-200",
		draft: "bg-amber-50 text-amber-600 border-amber-200",
		archived: "bg-gray-50 text-gray-600 border-gray-200"
	};
	return colors[status] || colors.draft;
}
function getStatusBadge(status) {
	return {
		published: "Published",
		draft: "Draft",
		archived: "Archived"
	}[status] || "Draft";
}
function getStats(courses) {
	return [
		{
			icon: BookOpen,
			value: courses.length,
			label: "Total Courses",
			color: "blue"
		},
		{
			icon: Users,
			value: courses.reduce((sum, c) => sum + (c.students || 0), 0),
			label: "Total Students",
			color: "emerald"
		},
		{
			icon: Star,
			value: courses.length > 0 ? (courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length).toFixed(1) : "0.0",
			label: "Avg. Rating",
			color: "amber"
		},
		{
			icon: TrendingUp,
			value: courses.filter((c) => c.status === "published").length,
			label: "Published",
			color: "purple"
		}
	];
}
var colorClasses = {
	blue: "bg-blue-50 text-blue-600",
	emerald: "bg-emerald-50 text-emerald-600",
	amber: "bg-amber-50 text-amber-600",
	purple: "bg-purple-50 text-purple-600"
};
function LoadingSpinner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: "Loading courses..."
			})]
		})
	});
}
function StatsCards({ courses }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
		children: getStats(courses).map((stat, index) => {
			const Icon = stat.icon;
			const colorClass = colorClasses[stat.color];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `p-2 rounded-lg ${colorClass}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg sm:text-xl font-bold text-gray-900",
						children: stat.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-gray-500",
						children: stat.label
					})] })]
				})
			}, index);
		})
	});
}
function FilterBar({ searchQuery, setSearchQuery, filterStatus, setFilterStatus, viewMode, setViewMode }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "Search courses...",
					value: searchQuery,
					onChange: (e) => setSearchQuery(e.target.value),
					className: "w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: filterStatus,
					onChange: (e) => setFilterStatus(e.target.value),
					className: "px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "published",
							children: "Published"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "draft",
							children: "Draft"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "archived",
							children: "Archived"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setViewMode("table"),
						className: `p-2 rounded-lg transition-colors ${viewMode === "table" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setViewMode("grid"),
						className: `p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "w-4 h-4" })
					})]
				})]
			})]
		})
	});
}
function CourseTableRow({ course, isSelected, onSelect, onEdit, onDelete, isDeleting }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		onClick: onSelect,
		className: `cursor-pointer border-b border-gray-100 text-sm transition-colors ${isSelected ? "bg-blue-50/50" : "hover:bg-gray-50"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-12 w-16 shrink-0 overflow-hidden rounded-lg",
						children: course.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: course.thumbnail,
							alt: course.title,
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full w-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold",
							children: course.title?.[0]?.toUpperCase() || "C"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate font-semibold text-gray-900",
							children: course.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-gray-400",
							children: [
								course.category,
								" · ",
								course.level
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-4 hidden sm:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`,
					children: getStatusBadge(course.status)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-4 hidden md:table-cell text-gray-600",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5 text-gray-400" }), course.students?.toLocaleString() || 0]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-4 hidden lg:table-cell text-gray-600",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 text-amber-400 fill-current" }), course.rating || 0]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-4 hidden xl:table-cell text-gray-600",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-gray-400" }), course.duration || "—"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-4 sm:px-6 text-right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tutor/builder",
						search: { slug: course.slug },
						className: "p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors",
						onClick: onEdit,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50",
						onClick: onDelete,
						disabled: isDeleting,
						title: "Delete course",
						children: isDeleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
					})]
				})
			})
		]
	});
}
function CourseGridCard({ course, isSelected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		onClick: onSelect,
		className: `cursor-pointer rounded-xl border-2 p-4 transition-all ${isSelected ? "border-blue-500 bg-blue-50/50" : "border-gray-200 hover:border-blue-300"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-16 w-20 shrink-0 overflow-hidden rounded-lg",
				children: course.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: course.thumbnail,
					alt: course.title,
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full w-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold",
					children: course.title?.[0]?.toUpperCase() || "C"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold text-gray-900 truncate",
						children: course.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-gray-400",
						children: [
							course.category,
							" · ",
							course.level
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mt-2 text-xs text-gray-600",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3 h-3 text-gray-400" }), course.students || 0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3 h-3 text-amber-400 fill-current" }), course.rating || 0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`,
								children: getStatusBadge(course.status)
							})
						]
					})
				]
			})]
		})
	});
}
function CourseList({ courses, viewMode, selectedCourse, onSelectCourse, onDeleteCourse, deletingSlug }) {
	if (courses.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-16 h-16 text-gray-300 mx-auto mb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-gray-500",
				children: "No courses found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-400 mt-1",
				children: "Try adjusting your filters or create a new course"
			})
		]
	});
	if (viewMode === "table") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-gray-200 bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wider text-gray-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 px-4 sm:px-6",
						children: "Course"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 px-4 hidden sm:table-cell",
						children: "Status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 px-4 hidden md:table-cell",
						children: "Students"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 px-4 hidden lg:table-cell",
						children: "Rating"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 px-4 hidden xl:table-cell",
						children: "Duration"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 px-4 sm:px-6 text-right",
						children: "Actions"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseTableRow, {
				course: c,
				isSelected: selectedCourse?.id === c.id,
				onSelect: () => onSelectCourse(c),
				onEdit: (e) => e.stopPropagation(),
				onDelete: (e) => {
					e.stopPropagation();
					onDeleteCourse(c);
				},
				isDeleting: deletingSlug === c.slug
			}, c.id)) })]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4",
		children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseGridCard, {
			course: c,
			isSelected: selectedCourse?.id === c.id,
			onSelect: () => onSelectCourse(c)
		}, c.id))
	});
}
function CourseDetailsSidebar({ course, lessons, reviews, onDeleteLesson, deletingLessonId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bg-white rounded-xl border border-gray-200 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold text-gray-900",
					children: "Course Details"
				}), course ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold text-gray-900",
							children: course.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-gray-500 mt-1",
							children: course.description
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-gray-50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-gray-500",
										children: "Students"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-gray-900",
										children: course.students?.toLocaleString() || 0
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-gray-50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-gray-500",
										children: "Rating"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-semibold text-gray-900",
										children: [course.rating || 0, " ★"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-gray-50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-gray-500",
										children: "Duration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-gray-900",
										children: course.duration || "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-gray-50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-gray-500",
										children: "Lessons"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-gray-900",
										children: lessons.length || course.lessons || 0
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/tutor/builder",
							search: { slug: course.slug },
							className: "w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-4 h-4" }), "Edit Course"]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-gray-500",
					children: "Select a course from the table to view details."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bg-white rounded-xl border border-gray-200 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold text-gray-900",
					children: "Lessons"
				}), course ? lessons.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3",
					children: [lessons.slice(0, 5).map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-sm text-gray-900 truncate",
								children: lesson.title ?? lesson.name ?? "Untitled lesson"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-gray-500 mt-0.5",
								children: lesson.duration ?? lesson.estimated_duration ?? "Unknown duration"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onDeleteLesson(lesson),
							disabled: deletingLessonId === String(lesson.id),
							className: "shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600 disabled:opacity-50",
							title: "Delete lesson",
							children: deletingLessonId === String(lesson.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					}, lesson.id ?? lesson.slug ?? lesson.title)), lessons.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-gray-400 text-center",
						children: [
							"+ ",
							lessons.length - 5,
							" more lessons"
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-gray-500",
					children: "No lessons available yet for this course."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-gray-500",
					children: "Choose a course to load lessons."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bg-white rounded-xl border border-gray-200 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold text-gray-900",
					children: "Recent Reviews"
				}), course ? reviews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: reviews.slice(0, 4).map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "p-3 bg-gray-50 rounded-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-sm text-gray-900",
								children: review.user?.full_name ?? review.user?.username ?? "Learner"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-amber-600 font-medium",
								children: [review.rating ?? "—", " ★"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-gray-600",
							children: review.comment ?? review.content ?? "No review text."
						})]
					}, review.id ?? review.user?.id ?? JSON.stringify(review)))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-gray-500",
					children: "No reviews have been posted yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-gray-500",
					children: "Choose a course to load reviews."
				})]
			})
		]
	});
}
function TutorCourses() {
	const { courses, filteredCourses, selectedCourse, setSelectedCourse, isLoading, deleteCourse: deleteCourseHandler } = useCourses();
	const { lessons, reviews, deletingLessonId, deleteLesson } = useCourseDetails(selectedCourse?.slug);
	const { searchQuery, setSearchQuery, filterStatus, setFilterStatus, viewMode, setViewMode, filteredCourses: searchFilteredCourses } = useCourseFilters(courses);
	const [deletingSlug, setDeletingSlug] = (0, import_react.useState)(null);
	const handleDeleteCourse = async (course) => {
		setDeletingSlug(course.slug);
		await deleteCourseHandler(course);
		setDeletingSlug(null);
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-4 sm:p-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl sm:text-3xl font-bold text-gray-900",
					children: "Your Courses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 mt-1",
					children: "Create, edit, and monitor performance of every course you teach."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tutor/builder",
					className: "inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), "New Course"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsCards, { courses }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterBar, {
				searchQuery,
				setSearchQuery,
				filterStatus,
				setFilterStatus,
				viewMode,
				setViewMode
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `grid gap-6 ${selectedCourse ? "lg:grid-cols-[1.5fr_0.9fr]" : "lg:grid-cols-1"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white rounded-xl border border-gray-200 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseList, {
						courses: searchFilteredCourses,
						viewMode,
						selectedCourse,
						onSelectCourse: setSelectedCourse,
						onDeleteCourse: handleDeleteCourse,
						deletingSlug
					})
				}), selectedCourse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseDetailsSidebar, {
					course: selectedCourse,
					lessons,
					reviews,
					onDeleteLesson: deleteLesson,
					deletingLessonId
				})]
			})
		]
	});
}
var Route$4 = createFileRoute("/tutor/dashboard")({ component: TutorDashboard });
function TutorDashboard() {
	const navigate = useNavigate();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [analytics, setAnalytics] = (0, import_react.useState)(null);
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [students, setStudents] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const [profileData, analyticsData, coursesData, studentsData] = await Promise.all([
					getProfile().catch(() => null),
					getTutorAnalytics().catch(() => null),
					getCourses().catch(() => []),
					getStudents().catch(() => [])
				]);
				if (profileData) setProfile(profileData);
				if (analyticsData) setAnalytics(analyticsData);
				if (Array.isArray(coursesData)) setCourses(coursesData);
				if (Array.isArray(studentsData)) setStudents(studentsData);
			} catch (err) {
				console.error("Error fetching dashboard data:", err);
				setError("Failed to load dashboard data");
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);
	const getGreeting = () => {
		const hour = (/* @__PURE__ */ new Date()).getHours();
		if (hour < 12) return "Good morning";
		if (hour < 17) return "Good afternoon";
		return "Good evening";
	};
	const getUserName = () => {
		if (profile?.first_name) return profile.first_name;
		if (profile?.full_name) return profile.full_name;
		if (profile?.username) return profile.username;
		return "Instructor";
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: "Loading dashboard..."
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
					children: "Retry"
				})
			]
		})
	});
	const totalStudents = analytics?.total_students ?? students.length;
	const publishedCourses = analytics?.published_courses ?? courses.filter((c) => c.status === "published").length;
	const totalCourses = analytics?.total_courses ?? courses.length;
	const avgRating = analytics?.avg_rating ?? (courses.length > 0 ? courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length : 0);
	const totalEarnings = analytics?.total_earnings ?? courses.reduce((sum, c) => {
		if (c.price && c.students) {
			let price = 0;
			if (typeof c.price === "string") {
				const cleanPrice = c.price.replace(/[^0-9.]/g, "");
				price = parseFloat(cleanPrice) || 0;
			} else if (typeof c.price === "number") price = c.price;
			return sum + price * (c.students || 0);
		}
		return sum;
	}, 0);
	const formatUGX = (amount) => {
		return `UGX ${amount.toLocaleString()}`;
	};
	const statCards = [
		{
			icon: BookOpen,
			value: totalCourses,
			label: "Total Courses",
			subtext: `${publishedCourses} published`,
			color: "blue"
		},
		{
			icon: Users,
			value: totalStudents.toLocaleString(),
			label: "Total Students",
			subtext: "all time",
			color: "emerald"
		},
		{
			icon: Star,
			value: avgRating > 0 ? avgRating.toFixed(1) : "0.0",
			label: "Avg Rating",
			subtext: "/ 5.0",
			color: "amber"
		},
		{
			icon: TrendingUp,
			value: formatUGX(totalEarnings),
			label: "Total Earnings",
			subtext: "all courses",
			color: "purple"
		}
	];
	const recentStudents = students.slice(0, 5);
	const myCourses = courses.slice(0, 5);
	const quickActions = [
		{
			icon: Plus,
			label: "Create Course",
			description: "Build a new course",
			path: "/tutor/builder",
			color: "blue"
		},
		{
			icon: FileText,
			label: "Manage Lessons",
			description: "Add video/text lessons",
			path: "/tutor/courses",
			color: "indigo"
		},
		{
			icon: ClipboardCheck,
			label: "Create Quiz",
			description: "Test student knowledge",
			path: "/tutor/quizzes",
			color: "purple"
		},
		{
			icon: Users,
			label: "View Students",
			description: "See who enrolled",
			path: "/tutor/students",
			color: "emerald"
		},
		{
			icon: ChartColumn,
			label: "Analytics",
			description: "Track performance",
			path: "/tutor/analytics",
			color: "orange"
		},
		{
			icon: MessageSquare,
			label: "Messages",
			description: "Communicate with students",
			path: "/tutor/messages",
			color: "pink"
		}
	];
	const colorMap = {
		blue: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
		indigo: "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100",
		purple: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
		emerald: "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100",
		orange: "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100",
		pink: "bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100"
	};
	const statColorMap = {
		blue: "bg-blue-50 text-blue-600",
		emerald: "bg-emerald-50 text-emerald-600",
		amber: "bg-amber-50 text-amber-600",
		purple: "bg-purple-50 text-purple-600"
	};
	const getStatusColor = (status) => {
		const colors = {
			published: "text-emerald-600 bg-emerald-50",
			draft: "text-amber-600 bg-amber-50",
			archived: "text-gray-600 bg-gray-50"
		};
		return colors[status] || colors.draft;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-gray-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500",
							children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-UG", {
								weekday: "long",
								day: "numeric",
								month: "long"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-2xl sm:text-3xl font-bold text-gray-900 mt-1",
							children: [
								getGreeting(),
								", ",
								getUserName(),
								" 👋"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500 mt-1",
							children: "Here's your instructor workspace overview"
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
					children: statCards.map((stat, index) => {
						const Icon = stat.icon;
						const colorClass = statColorMap[stat.color];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `p-2.5 rounded-xl ${colorClass}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3 h-3" }), stat.subtext]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate",
									children: stat.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-gray-500 mt-0.5 font-medium",
									children: stat.label
								})]
							})]
						}, index);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900",
							children: "My Courses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-gray-500 mt-0.5",
							children: "Your published and draft courses"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/tutor/courses",
							className: "text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1",
							children: ["Manage all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3 sm:w-4 sm:h-4" })]
						})]
					}), courses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-8 sm:py-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-400",
								children: "No courses yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/tutor/builder",
								className: "inline-block mt-3 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium",
								children: "Create First Course"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: myCourses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer",
							onClick: () => navigate({ to: "/tutor/courses" }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0 flex items-center justify-center text-white shadow-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "w-6 h-6 sm:w-7 sm:h-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-gray-900 truncate",
										children: course.title || "Untitled"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-400",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [course.students || 0, " students"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden xs:inline",
												children: "·"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [course.total_lessons || course.lessons || 0, " lessons"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden xs:inline",
												children: "·"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3 h-3 text-amber-400 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Number(course.rating || course.avg_rating || 0).toFixed(1) })]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right flex-shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(course.status)}`,
										children: course.status === "published" ? "Published" : "Draft"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400 mt-1",
										children: course.pricing === "free" ? "FREE" : formatUGX(Number(course.price || 0))
									})]
								})
							]
						}, course.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4 sm:mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900",
							children: "Quick Actions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-gray-500 mt-0.5",
							children: "Manage your courses and students"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] sm:text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full",
							children: [quickActions.length, " actions"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4",
						children: quickActions.map((action) => {
							const Icon = action.icon;
							const colorClass = colorMap[action.color];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: action.path,
								className: `group rounded-xl border-2 ${colorClass} p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-2.5 rounded-xl bg-white/60 group-hover:scale-110 transition-transform duration-300",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors",
										children: action.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-600 transition-colors",
										children: action.description
									})] })]
								})
							}, action.label);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base sm:text-lg font-semibold text-gray-900",
								children: "Recent Students"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/tutor/students",
								className: "text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1",
								children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3 sm:w-4 sm:h-4" })]
							})]
						}), recentStudents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-8 sm:py-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-400",
								children: "No students enrolled yet"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: recentStudents.map((student) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0",
										children: student.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "S"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-gray-900 truncate",
											children: student.name || "Student"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-gray-400 truncate",
											children: student.course || "No course"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-16 sm:w-20 bg-gray-200 rounded-full h-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000",
												style: { width: `${Math.min(student.progress || 0, 100)}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-medium text-gray-600",
											children: [student.progress || 0, "%"]
										})]
									})
								]
							}, student.id))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base sm:text-lg font-semibold text-gray-900 mb-4",
							children: "Quick Stats"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 sm:gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-blue-600 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium",
											children: "Total Students"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl sm:text-2xl font-bold text-gray-900",
										children: totalStudents
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-indigo-600 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium",
											children: "Courses"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl sm:text-2xl font-bold text-gray-900",
										children: totalCourses
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-purple-600 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium",
											children: "Avg Rating"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl sm:text-2xl font-bold text-gray-900",
										children: avgRating > 0 ? avgRating.toFixed(1) : "0.0"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-emerald-600 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium",
											children: "Earnings"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base sm:text-2xl font-bold text-gray-900 break-words",
										children: formatUGX(totalEarnings)
									})]
								})
							]
						})]
					})]
				})
			]
		})
	});
}
var $$splitComponentImporter = () => import("./tutor.messages-UkbqgThW.mjs");
var Route$3 = createFileRoute("/tutor/messages")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route$2 = createFileRoute("/tutor/quizzes")({ component: TutorQuizzes });
function TutorQuizzes() {
	const [quizzes, setQuizzes] = (0, import_react.useState)([]);
	const [expanded, setExpanded] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [filterStatus, setFilterStatus] = (0, import_react.useState)("all");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIsLoading(true);
		setTimeout(() => {
			setQuizzes([
				{
					id: 1,
					title: "Network Fundamentals Quiz",
					course: "Networking Essentials",
					questions: 15,
					attempts: 342,
					avgScore: 74,
					passScore: 70,
					isPublished: true,
					duration: 30,
					difficulty: "medium",
					lastAttempt: "2026-08-04"
				},
				{
					id: 2,
					title: "OSI Model Deep Dive",
					course: "Networking Essentials",
					questions: 10,
					attempts: 189,
					avgScore: 81,
					passScore: 70,
					isPublished: true,
					duration: 20,
					difficulty: "medium",
					lastAttempt: "2026-08-03"
				},
				{
					id: 3,
					title: "Subnetting Challenge",
					course: "Networking Essentials",
					questions: 20,
					attempts: 95,
					avgScore: 62,
					passScore: 75,
					isPublished: false,
					duration: 45,
					difficulty: "hard",
					lastAttempt: "2026-08-01"
				},
				{
					id: 4,
					title: "Web Application Security",
					course: "Ethical Hacking",
					questions: 12,
					attempts: 156,
					avgScore: 68,
					passScore: 70,
					isPublished: true,
					duration: 25,
					difficulty: "hard",
					lastAttempt: "2026-08-02"
				},
				{
					id: 5,
					title: "TypeScript Types Mastery",
					course: "Full-Stack TypeScript",
					questions: 8,
					attempts: 78,
					avgScore: 85,
					passScore: 80,
					isPublished: false,
					duration: 15,
					difficulty: "easy",
					lastAttempt: "2026-07-30"
				}
			]);
			setIsLoading(false);
		}, 800);
	}, []);
	const filteredQuizzes = quizzes.filter((q) => {
		if (filterStatus === "published" && !q.isPublished) return false;
		if (filterStatus === "draft" && q.isPublished) return false;
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			return q.title.toLowerCase().includes(query) || q.course.toLowerCase().includes(query);
		}
		return true;
	});
	const totalQuizzes = quizzes.length;
	const totalAttempts = quizzes.reduce((sum, q) => sum + q.attempts, 0);
	const avgScore = quizzes.length > 0 ? Math.round(quizzes.reduce((sum, q) => sum + q.avgScore, 0) / quizzes.length) : 0;
	const publishedCount = quizzes.filter((q) => q.isPublished).length;
	const statsCards = [
		{
			icon: CircleQuestionMark,
			value: totalQuizzes,
			label: "Total Quizzes",
			subtext: `${publishedCount} published, ${quizzes.filter((q) => !q.isPublished).length} draft`,
			color: "blue"
		},
		{
			icon: Users,
			value: totalAttempts.toLocaleString(),
			label: "Total Attempts",
			subtext: "All time",
			color: "emerald"
		},
		{
			icon: Star,
			value: avgScore + "%",
			label: "Avg. Score",
			subtext: "Across all quizzes",
			color: "purple"
		},
		{
			icon: TrendingUp,
			value: publishedCount > 0 ? Math.round(publishedCount / totalQuizzes * 100) + "%" : "0%",
			label: "Published Rate",
			subtext: `${publishedCount} live quizzes`,
			color: "amber"
		}
	];
	const statColorMap = {
		blue: "bg-blue-50 text-blue-600",
		emerald: "bg-emerald-50 text-emerald-600",
		purple: "bg-purple-50 text-purple-600",
		amber: "bg-amber-50 text-amber-600"
	};
	const getDifficultyColor = (difficulty) => {
		const colors = {
			easy: "bg-green-50 text-green-600 border-green-200",
			medium: "bg-amber-50 text-amber-600 border-amber-200",
			hard: "bg-red-50 text-red-600 border-red-200"
		};
		return colors[difficulty] || colors.medium;
	};
	const getScoreColor = (score) => {
		if (score >= 80) return "text-emerald-600";
		if (score >= 60) return "text-amber-600";
		return "text-red-600";
	};
	const toggleExpand = (id) => {
		setExpanded(expanded === id ? null : id);
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: "Loading quizzes..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-4 sm:p-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl sm:text-3xl font-bold text-gray-900",
					children: "Quizzes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 mt-1",
					children: "Author and manage knowledge checks for your courses"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tutor/quiz-builder",
					className: "inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), "New Quiz"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
				children: statsCards.map((stat, index) => {
					const Icon = stat.icon;
					const colorClass = statColorMap[stat.color];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-2 rounded-lg ${colorClass}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg sm:text-xl font-bold text-gray-900",
									children: stat.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-gray-500",
									children: stat.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] sm:text-xs text-gray-400",
									children: stat.subtext
								})
							] })]
						})
					}, index);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl border border-gray-200 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search quizzes by title or course...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFilterStatus("all"),
								className: `px-3 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === "all" ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
								children: "All"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFilterStatus("published"),
								className: `px-3 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === "published" ? "bg-emerald-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
								children: "Published"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFilterStatus("draft"),
								className: `px-3 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === "draft" ? "bg-amber-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
								children: "Draft"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: filteredQuizzes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl border border-gray-200 p-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "w-16 h-16 text-gray-300 mx-auto mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gray-500 font-medium",
							children: "No quizzes found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-400 mt-1",
							children: "Try adjusting your filters or create a new quiz"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/tutor/quiz-builder",
							className: "inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 inline mr-1" }), "Create Quiz"]
						})
					]
				}) : filteredQuizzes.map((quiz) => {
					const isExpanded = expanded === quiz.id;
					const difficultyColor = getDifficultyColor(quiz.difficulty);
					const scoreColor = getScoreColor(quiz.avgScore);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors",
							onClick: () => toggleExpand(quiz.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `p-2 rounded-lg flex-shrink-0 ${quiz.isPublished ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold text-gray-900 truncate",
											children: quiz.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${quiz.isPublished ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-amber-50 text-amber-600 border-amber-200"}`,
												children: quiz.isPublished ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3 h-3 mr-1" }), " Published"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-3 h-3 mr-1" }), " Draft"] })
											}), quiz.difficulty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-xs font-medium px-2 py-0.5 rounded-full border ${difficultyColor}`,
												children: quiz.difficulty
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-gray-500 mt-1",
										children: [
											quiz.course,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mx-2",
												children: "·"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-gray-400",
												children: [quiz.questions, " questions"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mx-2",
												children: "·"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-gray-400",
												children: [quiz.attempts, " attempts"]
											})
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 flex-shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: `text-sm font-bold ${scoreColor}`,
										children: [quiz.avgScore, "% avg"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-gray-400",
										children: [
											"Pass: ",
											quiz.passScore,
											"%"
										]
									})]
								}), isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "w-5 h-5 text-gray-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-5 h-5 text-gray-400" })]
							})]
						}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-gray-100 p-4 bg-gray-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white rounded-lg p-3 text-center border border-gray-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500",
												children: "Questions"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-lg font-bold text-gray-900",
												children: quiz.questions
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white rounded-lg p-3 text-center border border-gray-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500",
												children: "Attempts"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-lg font-bold text-gray-900",
												children: quiz.attempts
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white rounded-lg p-3 text-center border border-gray-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500",
												children: "Avg. Score"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: `text-lg font-bold ${scoreColor}`,
												children: [quiz.avgScore, "%"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white rounded-lg p-3 text-center border border-gray-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500",
												children: "Pass Rate"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-lg font-bold text-gray-900",
												children: [Math.round(quiz.avgScore / quiz.passScore * 100), "%"]
											})]
										})
									]
								}),
								quiz.lastAttempt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs text-gray-400 mb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }),
										"Last attempt: ",
										new Date(quiz.lastAttempt).toLocaleDateString()
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: `/tutor/quiz-builder?quizId=${quiz.id}`,
											className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-4 h-4" }), "Edit Quiz"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: `/tutor/quiz-results?quizId=${quiz.id}`,
											className: "px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-4 h-4" }), "View Results"]
										}),
										quiz.isPublished && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4" }), "Preview"]
										})
									]
								})
							]
						})]
					}, quiz.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-amber-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "💡 Tip:" }),
							" Full quiz builder with question editor is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://techbridge-tutor.vercel.app/tutor/quizzes",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-amber-700 font-semibold hover:underline",
								children: "elearning platform"
							}),
							". This panel shows quiz analytics and management."
						]
					}) })]
				})
			})
		]
	});
}
var Route$1 = createFileRoute("/tutor/settings")({ component: TutorSettings });
var TABS = [
	{
		id: "profile",
		label: "Profile",
		icon: User
	},
	{
		id: "payout",
		label: "Payout Info",
		icon: CreditCard
	},
	{
		id: "security",
		label: "Security",
		icon: Lock
	},
	{
		id: "notifs",
		label: "Notifications",
		icon: Bell
	}
];
function TutorSettings() {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [analytics, setAnalytics] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("profile");
	const [passwordData, setPasswordData] = (0, import_react.useState)({
		old_password: "",
		new_password: "",
		confirm: ""
	});
	const [notifications, setNotifications] = (0, import_react.useState)({
		email_enrolled: true,
		email_review: true,
		email_payout: true,
		email_news: false
	});
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			try {
				const [profileData, analyticsData] = await Promise.all([getProfile().catch(() => null), getTutorAnalytics().catch(() => null)]);
				setProfile(profileData);
				setAnalytics(analyticsData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unable to load profile.");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	async function handleSave(event) {
		event.preventDefault();
		setError(null);
		setSuccess(null);
		setSaving(true);
		try {
			const updated = await patchProfile({
				headline: profile.headline,
				bio: profile.bio,
				expertise: profile.expertise,
				experience: profile.experience,
				momo_number: profile.momo_number,
				momo_provider: profile.momo_provider,
				bank_name: profile.bank_name,
				bank_account: profile.bank_account,
				bank_account_name: profile.bank_account_name,
				phone: profile.phone,
				website: profile.website,
				linkedin: profile.linkedin,
				twitter: profile.twitter,
				youtube: profile.youtube
			});
			setProfile(updated);
			toast.success("Profile updated successfully!");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unable to save settings.";
			setError(message);
			toast.error(message);
		} finally {
			setSaving(false);
		}
	}
	async function handlePasswordChange(event) {
		event.preventDefault();
		setError(null);
		setSuccess(null);
		if (passwordData.new_password !== passwordData.confirm) {
			toast.error("Passwords do not match");
			return;
		}
		if (passwordData.new_password.length < 8) {
			toast.error("Password must be at least 8 characters");
			return;
		}
		setSaving(true);
		try {
			await patchProfile({
				old_password: passwordData.old_password,
				new_password: passwordData.new_password
			});
			setPasswordData({
				old_password: "",
				new_password: "",
				confirm: ""
			});
			toast.success("Password changed successfully!");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unable to change password.";
			toast.error(message);
		} finally {
			setSaving(false);
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: "Loading settings..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-4 sm:p-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl sm:text-3xl font-bold text-gray-900",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500 mt-1",
				children: "Manage your instructor profile, payout details, and account security"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl border border-gray-200 p-2 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 min-w-max",
					children: TABS.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab(tab.id),
							className: `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${isActive ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}` }), tab.label]
						}, tab.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-xl border border-gray-200 overflow-hidden",
				children: [
					activeTab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 sm:p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSave,
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-gray-200",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold",
												children: profile?.first_name?.[0] || profile?.username?.[0] || "T"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-3.5 h-3.5" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-lg font-semibold text-gray-900",
													children: profile?.full_name || profile?.username || "Tutor"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-gray-500",
													children: profile?.email
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-2 mt-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200",
															children: "Instructor"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-3 h-3" }),
																analytics?.avg_rating || profile?.avg_rating || "0.0",
																" ★"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3 h-3" }),
																(analytics?.total_students || profile?.total_students || 0).toLocaleString(),
																" students"
															]
														})
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											disabled: saving,
											className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), saving ? "Saving..." : "Save Profile"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-medium text-gray-700 mb-1.5",
										children: "First Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: profile?.first_name || "",
										onChange: (e) => setProfile({
											...profile,
											first_name: e.target.value
										}),
										className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
										placeholder: "First name"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-medium text-gray-700 mb-1.5",
										children: "Last Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: profile?.last_name || "",
										onChange: (e) => setProfile({
											...profile,
											last_name: e.target.value
										}),
										className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
										placeholder: "Last name"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1.5",
									children: "Professional Headline"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: profile?.headline || "",
									onChange: (e) => setProfile({
										...profile,
										headline: e.target.value
									}),
									className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
									placeholder: "e.g. Network Engineer · CCNA · 8 years experience"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1.5",
									children: "Bio / About"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: profile?.bio || "",
									onChange: (e) => setProfile({
										...profile,
										bio: e.target.value
									}),
									rows: 4,
									className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y",
									placeholder: "Tell students about your expertise and teaching style..."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1.5",
									children: "Expertise"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: profile?.expertise || "",
									onChange: (e) => setProfile({
										...profile,
										expertise: e.target.value
									}),
									className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
									placeholder: "e.g. Networking, Cisco, Cloud Computing"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1.5",
									children: "Experience"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: profile?.experience || "",
									onChange: (e) => setProfile({
										...profile,
										experience: e.target.value
									}),
									rows: 2,
									className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y",
									placeholder: "e.g. 8 years as a network engineer at MTN Uganda..."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-gray-200 pt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-semibold text-gray-900 mb-4",
										children: "Contact & Social"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-sm font-medium text-gray-700 mb-1.5",
												children: "Phone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: profile?.phone || "",
												onChange: (e) => setProfile({
													...profile,
													phone: e.target.value
												}),
												className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
												placeholder: "+256 7XX XXX XXX"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-sm font-medium text-gray-700 mb-1.5",
												children: "Website"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: profile?.website || "",
												onChange: (e) => setProfile({
													...profile,
													website: e.target.value
												}),
												className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
												placeholder: "https://yoursite.com"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-sm font-medium text-gray-700 mb-1.5",
												children: "LinkedIn"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: profile?.linkedin || "",
												onChange: (e) => setProfile({
													...profile,
													linkedin: e.target.value
												}),
												className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
												placeholder: "linkedin.com/in/..."
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-sm font-medium text-gray-700 mb-1.5",
												children: "Twitter"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: profile?.twitter || "",
												onChange: (e) => setProfile({
													...profile,
													twitter: e.target.value
												}),
												className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
												placeholder: "@username"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-sm font-medium text-gray-700 mb-1.5",
												children: "YouTube"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: profile?.youtube || "",
												onChange: (e) => setProfile({
													...profile,
													youtube: e.target.value
												}),
												className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
												placeholder: "youtube.com/channel/..."
											})] })
										]
									})]
								})
							]
						})
					}),
					activeTab === "payout" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 sm:p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: "Total Earnings"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xl font-bold text-blue-600",
										children: ["UGX ", (analytics?.total_earnings || profile?.total_revenue || 0).toLocaleString()]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: "Total Students"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl font-bold text-emerald-600",
										children: (analytics?.total_students || profile?.total_students || 0).toLocaleString()
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: "Courses"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl font-bold text-purple-600",
										children: (analytics?.total_courses || profile?.total_courses || 0).toLocaleString()
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: "Rating"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xl font-bold text-amber-600",
										children: [analytics?.avg_rating || profile?.avg_rating || "0.0", " ★"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSave,
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-2 bg-amber-50 rounded-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-5 h-5 text-amber-600" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-semibold text-gray-900",
										children: "Mobile Money (MoMo)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: "Primary payout method for Uganda"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-medium text-gray-700 mb-1.5",
										children: "MoMo Provider"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: profile?.momo_provider || "mtn",
										onChange: (e) => setProfile({
											...profile,
											momo_provider: e.target.value
										}),
										className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "mtn",
												children: "MTN Mobile Money"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "airtel",
												children: "Airtel Money"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "vodafone",
												children: "Vodafone Cash"
											})
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-medium text-gray-700 mb-1.5",
										children: "MoMo Phone Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: profile?.momo_number || "",
										onChange: (e) => setProfile({
											...profile,
											momo_number: e.target.value
										}),
										className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
										placeholder: "+256 7XX XXX XXX"
									})] })]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-gray-200 pt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-2 bg-blue-50 rounded-lg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "w-5 h-5 text-blue-600" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-sm font-semibold text-gray-900",
											children: "Bank Account (Optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-gray-500",
											children: "For larger payouts via bank transfer"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-sm font-medium text-gray-700 mb-1.5",
												children: "Bank Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: profile?.bank_name || "",
												onChange: (e) => setProfile({
													...profile,
													bank_name: e.target.value
												}),
												className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
												placeholder: "e.g. Stanbic Bank Uganda"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-sm font-medium text-gray-700 mb-1.5",
												children: "Account Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: profile?.bank_account || "",
												onChange: (e) => setProfile({
													...profile,
													bank_account: e.target.value
												}),
												className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
												placeholder: "Account number"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-sm font-medium text-gray-700 mb-1.5",
												children: "Account Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: profile?.bank_account_name || "",
												onChange: (e) => setProfile({
													...profile,
													bank_account_name: e.target.value
												}),
												className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
												placeholder: "Name on the account"
											})] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-emerald-50 border border-emerald-200 rounded-lg p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-emerald-800",
											children: "Secure"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-emerald-700",
											children: "Your payout details are encrypted and only used for processing earnings withdrawals."
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: saving,
										className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), saving ? "Saving..." : "Save Payout Info"]
									})
								})
							]
						})]
					}),
					activeTab === "security" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 sm:p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handlePasswordChange,
							className: "space-y-6 max-w-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-2 bg-amber-50 rounded-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5 text-amber-600" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-semibold text-gray-900",
										children: "Change Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: "Update your account password"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1.5",
									children: "Current Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: passwordData.old_password,
									onChange: (e) => setPasswordData({
										...passwordData,
										old_password: e.target.value
									}),
									className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1.5",
									children: "New Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: passwordData.new_password,
									onChange: (e) => setPasswordData({
										...passwordData,
										new_password: e.target.value
									}),
									className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
									placeholder: "Min. 8 characters",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-gray-700 mb-1.5",
									children: "Confirm Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: passwordData.confirm,
									onChange: (e) => setPasswordData({
										...passwordData,
										confirm: e.target.value
									}),
									className: "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-blue-50 border border-blue-200 rounded-lg p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-blue-800",
											children: "Password Requirements"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "text-xs text-blue-700 mt-1 space-y-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Minimum 8 characters" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Include uppercase and lowercase letters" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Include at least one number" })
											]
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: saving,
										className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4" }), saving ? "Updating..." : "Update Password"]
									})
								})
							]
						})
					}),
					activeTab === "notifs" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 bg-purple-50 rounded-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-5 h-5 text-purple-600" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-semibold text-gray-900",
									children: "Email Notifications"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500",
									children: "Manage your email notification preferences"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: [
									{
										key: "email_enrolled",
										label: "New student enrolled",
										description: "Get notified when a student joins your course"
									},
									{
										key: "email_review",
										label: "New course review",
										description: "Email when a student leaves a rating"
									},
									{
										key: "email_payout",
										label: "Payout processed",
										description: "Confirm when your earnings are transferred"
									},
									{
										key: "email_news",
										label: "Platform news & updates",
										description: "Monthly product updates from TechBridge"
									}
								].map(({ key, label, description }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-900",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: description
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "relative inline-flex items-center cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: notifications[key],
											onChange: (e) => setNotifications({
												...notifications,
												[key]: e.target.checked
											}),
											className: "sr-only peer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })]
									})]
								}, key))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-blue-800",
										children: "Email Preferences"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-blue-700",
										children: "You can unsubscribe from any notification at any time."
									})] })]
								})
							})
						]
					})
				]
			})
		]
	});
}
var Route = createFileRoute("/tutor/students")({ component: TutorStudents });
function TutorStudents() {
	const [students, setStudents] = (0, import_react.useState)([]);
	const [filteredStudents, setFilteredStudents] = (0, import_react.useState)([]);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [filterCourse, setFilterCourse] = (0, import_react.useState)("all");
	const [filterProgress, setFilterProgress] = (0, import_react.useState)("all");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [selectedStudent, setSelectedStudent] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchStudents = async () => {
			setIsLoading(true);
			const data = await getStudents();
			setStudents(data);
			setFilteredStudents(data);
			setIsLoading(false);
		};
		fetchStudents();
	}, []);
	(0, import_react.useEffect)(() => {
		let filtered = students;
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter((s) => s.name?.toLowerCase().includes(query) || s.email?.toLowerCase().includes(query) || s.course?.toLowerCase().includes(query));
		}
		if (filterCourse !== "all") filtered = filtered.filter((s) => s.course === filterCourse);
		if (filterProgress === "high") filtered = filtered.filter((s) => s.progress >= 70);
		else if (filterProgress === "medium") filtered = filtered.filter((s) => s.progress >= 40 && s.progress < 70);
		else if (filterProgress === "low") filtered = filtered.filter((s) => s.progress < 40);
		setFilteredStudents(filtered);
	}, [
		searchQuery,
		filterCourse,
		filterProgress,
		students
	]);
	const uniqueCourses = [...new Set(students.map((s) => s.course).filter(Boolean))];
	const totalStudents = students.length;
	const avgProgress = students.length > 0 ? Math.round(students.reduce((sum, s) => sum + (s.progress || 0), 0) / students.length) : 0;
	const completedStudents = students.filter((s) => s.progress >= 100).length;
	const activeStudents = students.filter((s) => s.progress > 0 && s.progress < 100).length;
	const statCards = [
		{
			icon: Users,
			value: totalStudents,
			label: "Total Students",
			subtext: "Enrolled across all courses",
			color: "blue"
		},
		{
			icon: GraduationCap,
			value: avgProgress + "%",
			label: "Avg. Progress",
			subtext: "Overall completion rate",
			color: "emerald"
		},
		{
			icon: Award,
			value: completedStudents,
			label: "Completed",
			subtext: "Finished all content",
			color: "purple"
		},
		{
			icon: UserCheck,
			value: activeStudents,
			label: "Active Learners",
			subtext: "Currently enrolled",
			color: "orange"
		}
	];
	const statColorMap = {
		blue: "bg-blue-50 text-blue-600",
		emerald: "bg-emerald-50 text-emerald-600",
		purple: "bg-purple-50 text-purple-600",
		orange: "bg-orange-50 text-orange-600"
	};
	const getProgressColor = (progress) => {
		if (progress >= 80) return "text-emerald-600";
		if (progress >= 50) return "text-amber-600";
		return "text-red-600";
	};
	const getProgressBarColor = (progress) => {
		if (progress >= 80) return "bg-gradient-to-r from-emerald-500 to-emerald-600";
		if (progress >= 50) return "bg-gradient-to-r from-amber-500 to-amber-600";
		return "bg-gradient-to-r from-red-500 to-red-600";
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: "Loading students..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-4 sm:p-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl sm:text-3xl font-bold text-gray-900",
					children: "Students"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 mt-1",
					children: "Track progress, grades, and enrollment across your courses"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
				children: statCards.map((stat, index) => {
					const Icon = stat.icon;
					const colorClass = statColorMap[stat.color];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-2 rounded-lg ${colorClass}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg sm:text-xl font-bold text-gray-900",
									children: stat.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-gray-500",
									children: stat.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] sm:text-xs text-gray-400",
									children: stat.subtext
								})
							] })]
						})
					}, index);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl border border-gray-200 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search students by name, email, or course...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: filterCourse,
							onChange: (e) => setFilterCourse(e.target.value),
							className: "px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All Courses"
							}), uniqueCourses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: course,
								children: course
							}, course))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: filterProgress,
							onChange: (e) => setFilterProgress(e.target.value),
							className: "px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All Progress"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "high",
									children: "High (≥70%)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "medium",
									children: "Medium (40-69%)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "low",
									children: "Low (<40%)"
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-xl border border-gray-200 overflow-hidden",
				children: filteredStudents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-16 h-16 text-gray-300 mx-auto mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gray-500",
							children: "No students found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-400 mt-1",
							children: "Try adjusting your filters"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-gray-200 bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wider text-gray-500",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 sm:px-6",
									children: "Student"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 hidden sm:table-cell",
									children: "Course"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Progress"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 hidden md:table-cell",
									children: "Grade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 hidden lg:table-cell",
									children: "Enrolled"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 sm:px-6 text-right",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredStudents.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer",
							onClick: () => setSelectedStudent(s),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 sm:px-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0",
											children: s.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "S"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-sm text-gray-900",
											children: s.name || "Student"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-gray-400 truncate max-w-[120px] sm:max-w-[200px]",
											children: s.email
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 hidden sm:table-cell",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-3.5 h-3.5 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-gray-600",
											children: s.course || "No course"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-20 sm:w-24 bg-gray-200 rounded-full h-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `h-full rounded-full transition-all duration-1000 ${getProgressBarColor(s.progress || 0)}`,
												style: { width: `${Math.min(s.progress || 0, 100)}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `text-xs font-medium ${getProgressColor(s.progress || 0)}`,
											children: [s.progress || 0, "%"]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 hidden md:table-cell",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${s.grade === "A" ? "bg-emerald-50 text-emerald-600" : s.grade === "B" ? "bg-blue-50 text-blue-600" : s.grade === "C" ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-600"}`,
										children: s.grade || "—"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 hidden lg:table-cell",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-xs text-gray-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), s.enrolled || "Recently"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 sm:px-6 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors",
											onClick: (e) => e.stopPropagation(),
											title: "Message student",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-4 h-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors",
											onClick: (e) => e.stopPropagation(),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "w-4 h-4" })
										})]
									})
								})
							]
						}, s.id)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-gray-500",
					children: [
						"Showing ",
						filteredStudents.length,
						" of ",
						students.length,
						" students"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50",
							children: "Previous"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium",
							children: "1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm",
							children: "Next"
						})
					]
				})]
			}),
			selectedStudent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50",
				onClick: () => setSelectedStudent(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl max-w-md w-full p-6 shadow-xl",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold text-gray-900",
								children: "Student Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedStudent(null),
								className: "text-gray-400 hover:text-gray-600",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold",
								children: selectedStudent.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "S"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-gray-900",
								children: selectedStudent.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500",
								children: selectedStudent.email
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-2 border-b border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-gray-500",
										children: "Course"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-gray-900",
										children: selectedStudent.course
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-2 border-b border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-gray-500",
										children: "Progress"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-24 bg-gray-200 rounded-full h-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `h-full rounded-full ${getProgressBarColor(selectedStudent.progress || 0)}`,
												style: { width: `${Math.min(selectedStudent.progress || 0, 100)}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-medium text-gray-900",
											children: [selectedStudent.progress || 0, "%"]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-2 border-b border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-gray-500",
										children: "Grade"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-gray-900",
										children: selectedStudent.grade || "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-gray-500",
										children: "Enrolled"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-gray-900",
										children: selectedStudent.enrolled || "Recently"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-4 h-4 inline mr-2" }), "Message"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium",
								children: "View Progress"
							})]
						})
					]
				})
			})
		]
	});
}
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var TutorRoute = Route$11.update({
	id: "/tutor",
	path: "/tutor",
	getParentRoute: () => Route$13
});
var TutorIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => TutorRoute
});
var TutorRouteChildren = {
	TutorAnalyticsRoute: Route$9.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => TutorRoute
	}),
	TutorAssignmentsRoute: Route$8.update({
		id: "/assignments",
		path: "/assignments",
		getParentRoute: () => TutorRoute
	}),
	TutorBuilderRoute: Route$7.update({
		id: "/builder",
		path: "/builder",
		getParentRoute: () => TutorRoute
	}),
	TutorCertificatesRoute: Route$6.update({
		id: "/certificates",
		path: "/certificates",
		getParentRoute: () => TutorRoute
	}),
	TutorCoursesRoute: Route$5.update({
		id: "/courses",
		path: "/courses",
		getParentRoute: () => TutorRoute
	}),
	TutorDashboardRoute: Route$4.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => TutorRoute
	}),
	TutorMessagesRoute: Route$3.update({
		id: "/messages",
		path: "/messages",
		getParentRoute: () => TutorRoute
	}),
	TutorQuizzesRoute: Route$2.update({
		id: "/quizzes",
		path: "/quizzes",
		getParentRoute: () => TutorRoute
	}),
	TutorSettingsRoute: Route$1.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => TutorRoute
	}),
	TutorStudentsRoute: Route.update({
		id: "/students",
		path: "/students",
		getParentRoute: () => TutorRoute
	}),
	TutorIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	TutorRoute: TutorRoute._addFileChildren(TutorRouteChildren)
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

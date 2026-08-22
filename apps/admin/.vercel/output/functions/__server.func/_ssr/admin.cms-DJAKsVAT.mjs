import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as GraduationCap, K as FileText, L as Layers, O as MessageCircle, St as Award, T as PanelsTopLeft, X as ExternalLink, _ as Settings, _t as Briefcase, bt as Bell, i as Users, m as Sparkles, pt as ChartNoAxesColumn, u as TrendingUp, ut as ChevronRight, v as Server, yt as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.cms-DJAKsVAT.js
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		key: "courses",
		icon: BookOpen,
		label: "Courses",
		desc: "Create, edit, publish and delete courses",
		color: "#3B82F6",
		bg: "#EFF6FF",
		to: "/admin/courses",
		badge: "Featured"
	},
	{
		key: "students",
		icon: Users,
		label: "Students",
		desc: "View, add and manage student accounts",
		color: "#16a34a",
		bg: "#F0FDF4",
		to: "/admin/students",
		badge: "Core"
	},
	{
		key: "tutors",
		icon: GraduationCap,
		label: "Instructors",
		desc: "Manage instructor accounts and profiles",
		color: "#2563EB",
		bg: "#DBEAFE",
		to: "/admin/tutors",
		badge: "Core"
	},
	{
		key: "certificates",
		icon: Award,
		label: "Certificates",
		desc: "View and verify all issued certificates",
		color: "#F59E0B",
		bg: "#FFF7ED",
		to: "/admin/certificates",
		badge: "Verified"
	},
	{
		key: "categories",
		icon: Layers,
		label: "Categories",
		desc: "Manage course categories and tags",
		color: "#8B5CF6",
		bg: "#EDE9FE",
		to: "/admin/categories",
		badge: "Organize"
	},
	{
		key: "reports",
		icon: ChartNoAxesColumn,
		label: "Analytics",
		desc: "Platform-wide reports and daily stats",
		color: "#14B8A6",
		bg: "#F0FDFA",
		to: "/admin/reports",
		badge: "Insights"
	},
	{
		key: "support",
		icon: MessageCircle,
		label: "Support",
		desc: "View and manage support tickets",
		color: "#F97316",
		bg: "#FFF7ED",
		to: "/admin/support",
		badge: "Help"
	},
	{
		key: "blog",
		icon: FileText,
		label: "Blog Posts",
		desc: "Create, edit, and publish blog content",
		color: "#EC4899",
		bg: "#FDF2F8",
		to: "/admin/blog",
		badge: "Content"
	},
	{
		key: "jobs",
		icon: Briefcase,
		label: "Jobs & Careers",
		desc: "Post and manage job opportunities",
		color: "#F97316",
		bg: "#FFFBEB",
		to: "/admin/jobs",
		badge: "Careers"
	},
	{
		key: "enrollments",
		icon: TrendingUp,
		label: "Enrollments",
		desc: "Manage student course enrollments",
		color: "#8B5CF6",
		bg: "#EDE9FE",
		to: "/admin/enrollments",
		badge: "Active"
	},
	{
		key: "quizzes",
		icon: Sparkles,
		label: "Quizzes",
		desc: "Create and manage quizzes with questions",
		color: "#7C3AED",
		bg: "#EDE9FE",
		to: "/admin/quizzes",
		badge: "Interactive"
	},
	{
		key: "lessons",
		icon: Layers,
		label: "Lessons",
		desc: "Manage lessons across all courses",
		color: "#06B6D4",
		bg: "#ECFEFF",
		to: "/admin/lessons",
		badge: "Content"
	},
	{
		key: "notifications",
		icon: Bell,
		label: "Notifications",
		desc: "Send and manage system notifications",
		color: "#EF4444",
		bg: "#FEF2F2",
		to: "/admin/notifications",
		badge: "Alerts"
	},
	{
		key: "content",
		icon: PanelsTopLeft,
		label: "Content Management",
		desc: "Manage homepage, testimonials, FAQs",
		color: "#7C3AED",
		bg: "#EDE9FE",
		to: "/admin/content",
		badge: "CMS"
	}
];
function SectionCard({ section, onClick }) {
	const Icon = section.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-300 dark:hover:border-blue-700 w-full",
		children: [section.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute top-3 right-3 text-[8px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
			children: section.badge
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3 sm:gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-105",
					style: { background: section.bg },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "h-5 w-5 sm:h-6 sm:w-6",
						style: { color: section.color }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm sm:text-base font-semibold text-gray-900 dark:text-white",
						children: section.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2",
						children: section.desc
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500 shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-0.5" })
			]
		})]
	});
}
function AdminCMS() {
	const navigate = useNavigate();
	const mainSections = SECTIONS.slice(0, 11);
	const adminSections = SECTIONS.slice(11);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col xs:flex-row xs:items-center justify-between gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelsTopLeft, { className: "h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Content Management" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full",
								children: [SECTIONS.length, " sections"]
							})
						]
					}) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-3 sm:mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm sm:text-base font-semibold text-gray-900 dark:text-white",
						children: "Main Content"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full",
						children: mainSections.length
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
				children: mainSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					section,
					onClick: () => navigate({ to: section.to })
				}, section.key))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-3 sm:mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm sm:text-base font-semibold text-gray-900 dark:text-white",
						children: "Admin & Settings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full",
						children: adminSections.length
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
				children: adminSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					section,
					onClick: () => navigate({ to: section.to })
				}, section.key))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm sm:text-base font-semibold text-gray-900 dark:text-white",
								children: "External Admin Links"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full",
								children: "Developer Tools"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 sm:p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2 sm:gap-3",
						children: [
							[
								"Django Admin",
								"https://techbridge-backend-rust.vercel.app/admin/",
								"Database"
							],
							[
								"API Swagger Docs",
								"https://techbridge-backend-rust.vercel.app/api/docs/",
								"API"
							],
							[
								"Admin portal",
								"https://techbridge-admin.vercel.app/admin/dashboard",
								"Frontend"
							],
							[
								"Backend admin",
								"https://techbridge-backend-rust.vercel.app/admin/",
								"Database"
							]
						].map(([label, url, badge]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: url,
							target: "_blank",
							rel: "noreferrer",
							className: "group inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all no-underline",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" }),
								label,
								badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-[8px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
									children: badge
								})
							]
						}, label))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-xs text-gray-400 dark:text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-700",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "TechBridge Skills Hub CMS v1.0 · All data is live and synced with the backend API" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      ` })
		]
	});
}
//#endregion
export { AdminCMS as component };

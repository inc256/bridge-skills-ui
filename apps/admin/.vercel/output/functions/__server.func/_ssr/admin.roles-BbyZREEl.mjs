import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-CQnbhjJo.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { R as Key, Tt as ArrowRight, X as ExternalLink, _ as Settings, ct as CircleAlert, ft as Check, g as ShieldCheck, h as Shield, i as Users, p as Star, s as UserCog, x as RefreshCw } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.roles-BbyZREEl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getUsersByRole(role) {
	try {
		return (await apiRequest(`/users/?role=${role}&page_size=1`))?.count || 0;
	} catch (error) {
		console.error(`Error fetching ${role} count:`, error);
		return 0;
	}
}
var ROLE_DEFS = [
	{
		role: "admin",
		label: "Administrator",
		color: "#7C3AED",
		bg: "#EDE9FE",
		icon: ShieldCheck,
		description: "Full platform control with all administrative privileges",
		perms: [
			"Full platform access",
			"Manage all users",
			"Approve/reject courses",
			"View analytics & reports",
			"Manage categories",
			"Issue certificates",
			"System settings"
		],
		capabilities: [
			"User Management",
			"Content Moderation",
			"System Configuration"
		]
	},
	{
		role: "instructor",
		label: "Instructor",
		color: "#2563EB",
		bg: "#DBEAFE",
		icon: UserCog,
		description: "Create and manage courses, assess students",
		perms: [
			"Create & publish courses",
			"Manage own lessons",
			"View enrolled students",
			"Grade assignments",
			"Create quizzes",
			"View own analytics",
			"Issue course certificates"
		],
		capabilities: [
			"Course Creation",
			"Student Assessment",
			"Content Management"
		]
	},
	{
		role: "student",
		label: "Student",
		color: "#16a34a",
		bg: "#F0FDF4",
		icon: Users,
		description: "Learn, progress, and earn certificates",
		perms: [
			"Enroll in courses",
			"Watch lessons",
			"Take quizzes",
			"Download certificates",
			"Leave reviews",
			"Save bookmarks",
			"Track progress"
		],
		capabilities: [
			"Learning",
			"Progress Tracking",
			"Certificate Earning"
		]
	}
];
function StatCard({ icon: Icon, value, label, color = "blue", iconColor = "blue" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 text-${iconColor}-600 dark:text-${iconColor}-400` })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xl sm:text-2xl font-bold text-gray-900 dark:text-white",
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-gray-500 dark:text-gray-400",
				children: label
			})] })]
		})
	});
}
function RoleCard({ role, count }) {
	const Icon = role.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-5 sm:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-xl",
						style: { background: role.bg },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-6 w-6 sm:h-7 sm:w-7",
							style: { color: role.color }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base sm:text-lg font-bold text-gray-900 dark:text-white",
									children: role.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
									children: role.role
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-semibold",
								style: { color: role.color },
								children: [
									count.toLocaleString(),
									" ",
									role.role,
									"s"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500 dark:text-gray-400 mt-1",
								children: role.description
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-gray-100 dark:border-gray-700",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider",
							children: "Permissions"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-1.5",
						children: role.perms.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "h-3.5 w-3.5 flex-shrink-0",
								style: { color: role.color }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p })]
						}, p))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 px-4 sm:px-5 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-gray-500 dark:text-gray-400",
							children: ["Capabilities: ", role.capabilities.join(" · ")]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `https://techbridge-backend-rust.vercel.app/admin/accounts/user/?role=${role.role}`,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline",
						children: ["Manage", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
					})]
				})
			})
		]
	});
}
function AdminRoles() {
	const [counts, setCounts] = (0, import_react.useState)({
		admin: 0,
		instructor: 0,
		student: 0
	});
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const loadCounts = () => {
		setBusy(true);
		setError(null);
		Promise.all([
			getUsersByRole("admin"),
			getUsersByRole("instructor"),
			getUsersByRole("student")
		]).then(([admin, instructor, student]) => {
			setCounts({
				admin,
				instructor,
				student
			});
		}).catch((err) => {
			console.error("Failed to load role counts:", err);
			setError(err.message || "Failed to load role counts");
		}).finally(() => setBusy(false));
	};
	(0, import_react.useEffect)(() => {
		loadCounts();
	}, []);
	const totalUsers = counts.admin + counts.instructor + counts.student;
	if (busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center items-center min-h-[400px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Roles & Permissions" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full",
							children: [totalUsers, " users"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: "Platform role definitions and user counts"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: loadCounts,
					className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden xs:inline",
						children: "Refresh"
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-400 flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: ShieldCheck,
						value: counts.admin.toLocaleString(),
						label: "Administrators",
						color: "purple",
						iconColor: "purple"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: UserCog,
						value: counts.instructor.toLocaleString(),
						label: "Instructors",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						value: counts.student.toLocaleString(),
						label: "Students",
						color: "green",
						iconColor: "green"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: ROLE_DEFS.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
					role,
					count: counts[role.role] || 0
				}, role.role))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm sm:text-base font-semibold text-gray-900 dark:text-white",
							children: "Quick Actions"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 sm:p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3",
						children: ROLE_DEFS.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `https://techbridge-backend-rust.vercel.app/admin/accounts/user/?role=${role.role}`,
							target: "_blank",
							rel: "noreferrer",
							className: "group inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" }),
								"Manage ",
								role.label,
								"s",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" })
							]
						}, role.role))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
        .border-3 {
          border-width: 3px;
        }
      ` })
		]
	});
}
//#endregion
export { AdminRoles as component };

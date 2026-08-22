import { r as __toESM } from "../_runtime.mjs";
import { h as getNotifications, m as getCourses, v as getStudents, y as getTutorAnalytics } from "./api-D_B9Fj0E.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as DollarSign, S as Plus, d as Star, i as Users, mt as ArrowUpRight, ut as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor.index-B4FtBAuU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TutorDashboard() {
	const [stats, setStats] = (0, import_react.useState)(null);
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [students, setStudents] = (0, import_react.useState)([]);
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		(async () => {
			const [analytics, courseList, studentList, notificationList] = await Promise.all([
				getTutorAnalytics(),
				getCourses(),
				getStudents(),
				getNotifications()
			]);
			setStats(analytics);
			setCourses(courseList);
			setStudents(studentList);
			setNotifications(notificationList);
		})();
	}, []);
	const statItems = [
		{
			i: Users,
			l: "Enrolled students",
			v: (stats?.enrolled_students ?? students.length).toLocaleString(),
			d: stats?.enrollment_change ? `${stats.enrollment_change > 0 ? "+" : ""}${stats.enrollment_change}%` : "Live"
		},
		{
			i: BookOpen,
			l: "Published courses",
			v: (stats?.published_courses ?? courses.length).toLocaleString(),
			d: `${Math.max(0, courses.length - 1)} active`
		},
		{
			i: Star,
			l: "Avg. rating",
			v: Number(stats?.avg_rating ?? courses.reduce((sum, course) => sum + (course.rating ?? 0), 0) / Math.max(courses.length, 1)).toFixed(1),
			d: `${students.length} learners`
		},
		{
			i: DollarSign,
			l: "Revenue (mo)",
			v: stats?.monthly_revenue ? `GHS ${Number(stats.monthly_revenue).toLocaleString()}` : "Live",
			d: stats?.monthly_revenue ? "Updated" : "Pending"
		}
	];
	const chartData = Array.isArray(stats?.enrollment_series) && stats.enrollment_series.length > 0 ? stats.enrollment_series : Array.from({ length: 8 }, (_, index) => Math.max(20, students.length + index * 8));
	const chartMax = Math.max(...chartData);
	const chartPoints = chartData.map((value, index) => `${index / (chartData.length - 1) * 100},${100 - value / chartMax * 100}`).join(" ");
	const chartArea = `0,100 ${chartPoints} 100,100`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Instructor overview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-[28px] font-semibold tracking-tight",
					children: "Good afternoon, Priya."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tutor/builder",
					className: "inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New course"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: statItems.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.i, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-0.5 text-xs font-semibold text-success",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" }), s.d]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 text-[28px] font-semibold tracking-tight",
							children: s.v
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: s.l
						})
					]
				}, s.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.6fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[16px] font-semibold",
							children: "Student enrollments"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Live data from the backend"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "rounded-[10px] border border-border bg-background px-3 py-1.5 text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All courses" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 100 100",
							preserveAspectRatio: "none",
							className: "h-56 w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "g1",
									x1: "0",
									x2: "0",
									y1: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "#1F6E5C",
										stopOpacity: "0.25"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "#1F6E5C",
										stopOpacity: "0"
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
									fill: "url(#g1)",
									points: chartArea
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
									fill: "none",
									stroke: "#1F6E5C",
									strokeWidth: "0.6",
									points: chartPoints,
									vectorEffect: "non-scaling-stroke"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex justify-between text-[10px] text-muted-foreground",
							children: chartData.map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["W", index + 1] }, `${value}-${index}`))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[16px] font-semibold",
						children: "Latest updates"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-4",
						children: notifications.slice(0, 3).map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold",
								children: (item.title || item.message || "U").slice(0, 2).toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: item.title ?? item.message ?? "Update"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-muted-foreground",
									children: item.created_at ?? item.type ?? "Recently received"
								})]
							})]
						}, item.id ?? index))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[16px] font-semibold",
							children: "Recent students"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/tutor/students",
							className: "text-xs font-medium text-primary hover:underline",
							children: "View all →"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "mt-4 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2",
									children: "Student"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2",
									children: "Course"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-right",
									children: "Progress"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: students.slice(0, 5).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60 last:border-0 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: s.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: s.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 text-xs text-muted-foreground",
									children: s.course
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ml-auto flex w-24 items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 flex-1 overflow-hidden rounded-full bg-secondary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full bg-primary",
												style: { width: `${s.progress ?? 0}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-medium",
											children: [s.progress ?? 0, "%"]
										})]
									})
								})
							]
						}, s.id)) })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[16px] font-semibold",
						children: "Your courses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-4",
						children: courses.slice(0, 4).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 shrink-0 rounded-xl",
									style: { background: c.color }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-semibold",
										children: c.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											(c.students ?? 0).toLocaleString(),
											" students · ",
											c.rating ?? 0,
											"★"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success",
									children: "Published"
								})
							]
						}, c.id))
					})]
				})]
			})
		]
	});
}
//#endregion
export { TutorDashboard as component };

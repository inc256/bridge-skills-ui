import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-C-LJEmCZ.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { $ as Download, At as Activity, Ct as Award, D as Minus, Dt as ArrowDown, S as RefreshCw, a as Users, bt as BookOpen, ct as CircleCheckBig, d as TrendingUp, gt as Calendar, ht as ChartColumn, lt as CircleAlert, wt as ArrowUp } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reports-DBB5bsls.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ icon: Icon, value, label, sublabel, color = "blue", iconColor = "blue", trend }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 text-${iconColor}-600 dark:text-${iconColor}-400` })
			}), trend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-1 text-xs font-medium ${trend.direction === "up" ? "text-green-600 dark:text-green-400" : trend.direction === "down" ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`,
				children: [
					trend.direction === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3 w-3" }),
					trend.direction === "down" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-3 w-3" }),
					trend.direction === "neutral" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" }),
					trend.value,
					"%"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-gray-500 dark:text-gray-400",
					children: label
				}),
				sublabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-gray-400 dark:text-gray-500",
					children: sublabel
				})
			]
		})]
	});
}
function Chart({ data, title, valueKey, color, icon: Icon }) {
	const maxValue = Math.max(...data.map((d) => d[valueKey] || 0), 1);
	const total = data.reduce((sum, d) => sum + (d[valueKey] || 0), 0);
	const avg = Math.round(total / (data.length || 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `p-2 rounded-lg bg-${color}-50 dark:bg-${color}-900/20`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 text-${color}-600 dark:text-${color}-400` })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm sm:text-base font-semibold text-gray-900 dark:text-white",
					children: title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Total: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-gray-900 dark:text-white",
					children: total.toLocaleString()
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Avg: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-gray-900 dark:text-white",
					children: avg
				})] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-end gap-1.5 sm:gap-2 h-[140px] sm:h-[160px]",
			children: data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full text-center text-gray-400 dark:text-gray-500 py-8",
				children: "No data available"
			}) : data.map((d, i) => {
				const val = d[valueKey] || 0;
				const height = Math.max(8, Math.round(val / maxValue * 100));
				const opacity = .5 + i / data.length * .5;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col items-center gap-1 group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] sm:text-[9px] font-medium text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity",
							children: val
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full rounded-sm transition-all duration-300 group-hover:scale-y-105 origin-bottom",
							style: {
								height: `${height}%`,
								background: `linear-gradient(180deg, ${color} 0%, ${color}cc 100%)`,
								opacity,
								minHeight: "4px"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[7px] sm:text-[8px] text-gray-400 dark:text-gray-500",
							children: d.date?.slice(5) || ""
						})
					]
				}, i);
			})
		})]
	});
}
function Reports() {
	const [stats, setStats] = (0, import_react.useState)(null);
	const [daily, setDaily] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const loadData = () => {
		setBusy(true);
		setError(null);
		Promise.all([apiRequest("/analytics/stats/"), apiRequest("/analytics/daily/")]).then(([s, d]) => {
			setStats(s);
			setDaily((d.data || []).slice(0, 14).reverse());
		}).catch((err) => {
			console.error("Failed to load reports:", err);
			setError(err.message || "Failed to load reports");
		}).finally(() => setBusy(false));
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	if (busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center items-center min-h-[400px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
	});
	const totEnroll = daily.reduce((s, d) => s + (d.new_enrollments || 0), 0);
	const totUsers = daily.reduce((s, d) => s + (d.new_users || 0), 0);
	const totCerts = daily.reduce((s, d) => s + (d.certificates_issued || 0), 0);
	const totLessons = daily.reduce((s, d) => s + (d.lesson_completions || 0), 0);
	daily.reduce((s, d) => s + (d.active_users || 0), 0);
	const last7 = daily.slice(0, 7);
	const prev7 = daily.slice(7, 14);
	const calcTrend = (key) => {
		const lastSum = last7.reduce((s, d) => s + (d[key] || 0), 0);
		const prevSum = prev7.reduce((s, d) => s + (d[key] || 0), 0);
		if (prevSum === 0) return {
			value: 0,
			direction: "neutral"
		};
		const change = Math.round((lastSum - prevSum) / prevSum * 100);
		return {
			value: Math.abs(change),
			direction: change > 0 ? "up" : change < 0 ? "down" : "neutral"
		};
	};
	const userTrend = calcTrend("new_users");
	const enrollTrend = calcTrend("new_enrollments");
	const lessonTrend = calcTrend("lesson_completions");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reports & Analytics" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: "Live platform analytics — last 14 days"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 sm:gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: loadData,
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden xs:inline",
							children: "Refresh"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden xs:inline",
							children: "Export"
						})]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-400",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5 inline mr-2" }), error]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						value: stats?.users?.total?.toLocaleString() || "0",
						label: "Total Users",
						sublabel: `${stats?.users?.students || 0} students`,
						color: "blue",
						iconColor: "blue",
						trend: userTrend
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: BookOpen,
						value: stats?.courses?.published?.toLocaleString() || "0",
						label: "Published Courses",
						sublabel: `${stats?.courses?.draft || 0} drafts`,
						color: "green",
						iconColor: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: TrendingUp,
						value: stats?.enrollments?.total?.toLocaleString() || "0",
						label: "Total Enrollments",
						sublabel: `${stats?.enrollments?.active || 0} active`,
						color: "purple",
						iconColor: "purple",
						trend: enrollTrend
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Award,
						value: stats?.certificates?.toLocaleString() || "0",
						label: "Certificates Issued",
						sublabel: "All time",
						color: "orange",
						iconColor: "orange"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400",
								children: totUsers.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500 dark:text-gray-400 mt-1",
								children: "New Users (14d)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-[10px] text-gray-400 dark:text-gray-500",
								children: [
									userTrend.direction === "up" ? "↑" : userTrend.direction === "down" ? "↓" : "→",
									" ",
									userTrend.value,
									"%"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400",
								children: totEnroll.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500 dark:text-gray-400 mt-1",
								children: "New Enrollments (14d)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-[10px] text-gray-400 dark:text-gray-500",
								children: [
									enrollTrend.direction === "up" ? "↑" : enrollTrend.direction === "down" ? "↓" : "→",
									" ",
									enrollTrend.value,
									"%"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400",
								children: totLessons.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500 dark:text-gray-400 mt-1",
								children: "Lesson Completions (14d)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-[10px] text-gray-400 dark:text-gray-500",
								children: [
									lessonTrend.direction === "up" ? "↑" : lessonTrend.direction === "down" ? "↓" : "→",
									" ",
									lessonTrend.value,
									"%"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400",
								children: totCerts.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500 dark:text-gray-400 mt-1",
								children: "Certificates (14d)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[10px] text-gray-400 dark:text-gray-500",
								children: totCerts > 0 ? "↑ Active" : "—"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:gap-6 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chart, {
						data: daily,
						title: "New Users",
						valueKey: "new_users",
						color: "#3B82F6",
						icon: Users
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chart, {
						data: daily,
						title: "New Enrollments",
						valueKey: "new_enrollments",
						color: "#8B5CF6",
						icon: TrendingUp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chart, {
						data: daily,
						title: "Lesson Completions",
						valueKey: "lesson_completions",
						color: "#10B981",
						icon: CircleCheckBig
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chart, {
						data: daily,
						title: "Certificates Issued",
						valueKey: "certificates_issued",
						color: "#F59E0B",
						icon: Award
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-blue-600 dark:text-blue-400" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm sm:text-base font-semibold text-gray-900 dark:text-white",
									children: "Daily Activity Log"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full",
									children: [daily.length, " days"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-blue-500" }), "Users"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-purple-500" }), "Enrollments"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-500" }), "Lessons"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-amber-500" }), "Certs"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), "Date"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }), "New Users"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), "Enrollments"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3 w-3" }), "Lessons"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3 w-3" }), "Certs"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3 w-3" }), "Active"]
										})
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: daily.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								className: "py-8 sm:py-12 text-center text-gray-500 dark:text-gray-400",
								children: "No daily stats available"
							}) }) : [...daily].reverse().map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4 font-medium text-gray-900 dark:text-white",
										children: d.date
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4 font-semibold text-blue-600 dark:text-blue-400",
										children: d.new_users || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4 font-semibold text-purple-600 dark:text-purple-400",
										children: d.new_enrollments || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4 font-semibold text-emerald-600 dark:text-emerald-400",
										children: d.lesson_completions || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4 font-semibold text-amber-600 dark:text-amber-400",
										children: d.certificates_issued || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4 text-gray-600 dark:text-gray-300",
										children: d.active_users || 0
									})
								]
							}, i)) })]
						})
					}),
					daily.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
							children: [
								"Showing ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-gray-700 dark:text-gray-300",
									children: daily.length
								}),
								" days of data"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Total Users: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-gray-700 dark:text-gray-300",
								children: totUsers.toLocaleString()
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Total Enrollments: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-gray-700 dark:text-gray-300",
								children: totEnroll.toLocaleString()
							})] })]
						})]
					})
				]
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
export { Reports as component };

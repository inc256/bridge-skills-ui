import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-CG9AIe4t.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { G as Funnel, at as CircleX, it as Clock, kt as Activity, l as TriangleAlert, n as X, x as RefreshCw, y as Search, z as Info } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.auditlogs-COGKMPxy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getAuditLogs(params = {}) {
	try {
		const query = new URLSearchParams();
		if (params.search) query.append("search", params.search);
		if (params.limit) query.append("limit", String(params.limit));
		const data = await apiRequest(`/audit/logs/${query.toString() ? `?${query.toString()}` : ""}`);
		return data?.results || data || [];
	} catch (error) {
		console.error("Error fetching audit logs:", error);
		return [];
	}
}
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
function LogRow({ log, index }) {
	const getSeverityColor = (severity) => {
		const map = {
			"info": {
				bg: "bg-blue-100 dark:bg-blue-900/30",
				text: "text-blue-700 dark:text-blue-400",
				dot: "bg-blue-500",
				icon: Info
			},
			"warning": {
				bg: "bg-yellow-100 dark:bg-yellow-900/30",
				text: "text-yellow-700 dark:text-yellow-400",
				dot: "bg-yellow-500",
				icon: TriangleAlert
			},
			"error": {
				bg: "bg-red-100 dark:bg-red-900/30",
				text: "text-red-700 dark:text-red-400",
				dot: "bg-red-500",
				icon: CircleX
			}
		};
		return map[severity] || map["info"];
	};
	const getCategoryColor = (category) => {
		return {
			"auth": "#16a34a",
			"security": "#DC2626",
			"system": "#7C3AED",
			"user": "#2563EB",
			"course": "#F59E0B",
			"payment": "#8B5CF6"
		}[category] || "#6B7280";
	};
	const severityColors = getSeverityColor(log.severity);
	const SeverityIcon = severityColors.icon;
	const formattedDate = log.ts ? new Date(log.ts).toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	}) : "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500" }), formattedDate]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium px-2 py-1 rounded-full",
					style: {
						color: getCategoryColor(log.category),
						backgroundColor: `${getCategoryColor(log.category)}15`
					},
					children: log.category || "system"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "text-xs font-mono font-semibold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300 whitespace-nowrap",
					children: log.action
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden sm:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[10px] font-bold text-blue-700 dark:text-blue-400",
						children: log.actor?.[0]?.toUpperCase() || "?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-gray-600 dark:text-gray-300 truncate max-w-[120px]",
						children: log.actor
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden md:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px] block",
					children: log.target
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium ${severityColors.bg} ${severityColors.text}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityIcon, { className: "h-3 w-3" }), log.severity || "info"]
				})
			})
		]
	});
}
function AdminAuditLogs() {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [filterCategory, setFilterCategory] = (0, import_react.useState)("all");
	const [filterSeverity, setFilterSeverity] = (0, import_react.useState)("all");
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const loadLogs = (0, import_react.useCallback)(async () => {
		setBusy(true);
		setError(null);
		try {
			const results = await getAuditLogs({ limit: 100 });
			if (results.length > 0) setLogs(results);
			else {
				const SAMPLE = [
					{
						ts: (/* @__PURE__ */ new Date()).toISOString(),
						actor: "admin@techbridgeskills.ug",
						action: "USER_LOGIN",
						target: "Admin TechBridge",
						severity: "info",
						category: "auth"
					},
					{
						ts: (/* @__PURE__ */ new Date(Date.now() - 6e4)).toISOString(),
						actor: "john.kiggundu@techbridgeskills.ug",
						action: "USER_LOGIN",
						target: "John Kiggundu",
						severity: "info",
						category: "auth"
					},
					{
						ts: (/* @__PURE__ */ new Date(Date.now() - 12e4)).toISOString(),
						actor: "sarah.namukasa@gmail.com",
						action: "USER_LOGIN",
						target: "Sarah Namukasa",
						severity: "info",
						category: "auth"
					},
					{
						ts: (/* @__PURE__ */ new Date(Date.now() - 3e5)).toISOString(),
						actor: "system",
						action: "PLATFORM_DAILY_STATS",
						target: "14 days seeded",
						severity: "info",
						category: "system"
					},
					{
						ts: (/* @__PURE__ */ new Date(Date.now() - 6e5)).toISOString(),
						actor: "admin@techbridgeskills.ug",
						action: "COURSE_CREATED",
						target: "Advanced Networking",
						severity: "info",
						category: "course"
					},
					{
						ts: (/* @__PURE__ */ new Date(Date.now() - 9e5)).toISOString(),
						actor: "admin@techbridgeskills.ug",
						action: "USER_ROLE_CHANGE",
						target: "john.kiggundu@techbridgeskills.ug",
						severity: "warning",
						category: "user"
					}
				];
				setLogs(SAMPLE);
			}
		} catch (err) {
			console.error("Failed to load audit logs:", err);
			setError(err.message || "Failed to load audit logs");
		} finally {
			setBusy(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		loadLogs();
	}, [loadLogs]);
	const filteredLogs = logs.filter((log) => {
		const matchesSearch = !search || log.actor?.toLowerCase().includes(search.toLowerCase()) || log.action?.toLowerCase().includes(search.toLowerCase()) || log.target?.toLowerCase().includes(search.toLowerCase());
		const matchesCategory = filterCategory === "all" || log.category === filterCategory;
		const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity;
		return matchesSearch && matchesCategory && matchesSeverity;
	});
	const categories = ["all", ...new Set(logs.map((l) => l.category).filter(Boolean))];
	const severities = ["all", ...new Set(logs.map((l) => l.severity).filter(Boolean))];
	const totalLogs = logs.length;
	const infoCount = logs.filter((l) => l.severity === "info").length;
	const warningCount = logs.filter((l) => l.severity === "warning").length;
	const errorCount = logs.filter((l) => l.severity === "error").length;
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Audit Logs" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full",
							children: [totalLogs, " entries"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: "Track every significant action on the platform"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 sm:gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowFilters(!showFilters),
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden xs:inline",
								children: "Filters"
							}),
							(filterCategory !== "all" || filterSeverity !== "all") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-1 w-2 h-2 rounded-full bg-blue-500" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: loadLogs,
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden xs:inline",
							children: "Refresh"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Activity,
						value: totalLogs,
						label: "Total Logs",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Info,
						value: infoCount,
						label: "Info",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: TriangleAlert,
						value: warningCount,
						label: "Warnings",
						color: "yellow",
						iconColor: "yellow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleX,
						value: errorCount,
						label: "Errors",
						color: "red",
						iconColor: "red"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 sm:p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search by actor, action, or target...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
							}),
							search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSearch(""),
								className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
							})
						]
					})
				}), showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1",
									children: "Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: filterCategory,
									onChange: (e) => setFilterCategory(e.target.value),
									className: "w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
									children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: cat,
										children: cat === "all" ? "All Categories" : cat
									}, cat))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1",
									children: "Severity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: filterSeverity,
									onChange: (e) => setFilterSeverity(e.target.value),
									className: "w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
									children: severities.map((sev) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: sev,
										children: sev === "all" ? "All Severities" : sev
									}, sev))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setFilterCategory("all");
										setFilterSeverity("all");
									},
									className: "px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
									children: "Clear Filters"
								})
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), "Timestamp"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Action"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell",
									children: "Actor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell",
									children: "Target"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Severity"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							className: "py-8 sm:py-12 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500 dark:text-gray-400",
										children: "No audit logs found"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
										children: search ? "Try adjusting your search or filters" : "Logs will appear here when actions are recorded"
									})
								]
							})
						}) }) : filteredLogs.map((log, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogRow, {
							log,
							index
						}, index)) })]
					})
				}), filteredLogs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
						children: [
							"Showing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-gray-700 dark:text-gray-300",
								children: filteredLogs.length
							}),
							" of",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-gray-700 dark:text-gray-300",
								children: logs.length
							}),
							" log entries"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-blue-500" }), "Info"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-yellow-500" }), "Warning"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500" }), "Error"]
							})
						]
					})]
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
export { AdminAuditLogs as component };

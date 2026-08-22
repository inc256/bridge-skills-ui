import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-CG9AIe4t.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { C as Phone, D as MessageSquare, M as Mail, U as Globe, V as Headphones, X as ExternalLink, a as User, ct as CircleAlert, f as Tag, i as Users, it as Clock, n as X, st as CircleCheckBig, x as RefreshCw, y as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.support-D37c9DWH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getAdminNotifications() {
	try {
		const data = await apiRequest("/notifications/");
		return Array.isArray(data) ? data : data?.results || [];
	} catch (error) {
		console.error("Error fetching notifications:", error);
		return [];
	}
}
function StatCard({ icon: Icon, value, label, color = "blue", iconColor = "blue", subtext, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all ${onClick ? "cursor-pointer hover:border-blue-400 dark:hover:border-blue-500" : ""}`,
		onClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 sm:gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 sm:h-5 sm:w-5 text-${iconColor}-600 dark:text-${iconColor}-400` })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl sm:text-2xl font-bold text-gray-900 dark:text-white",
						children: value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
						children: label
					}),
					subtext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500",
						children: subtext
					})
				]
			})]
		})
	});
}
function TicketCard({ ticket, index, onReply }) {
	const getStatusColor = (status) => {
		const map = {
			"Open": {
				bg: "bg-red-100 dark:bg-red-900/30",
				text: "text-red-700 dark:text-red-400",
				dot: "bg-red-500"
			},
			"Pending": {
				bg: "bg-yellow-100 dark:bg-yellow-900/30",
				text: "text-yellow-700 dark:text-yellow-400",
				dot: "bg-yellow-500"
			},
			"Resolved": {
				bg: "bg-green-100 dark:bg-green-900/30",
				text: "text-green-700 dark:text-green-400",
				dot: "bg-green-500"
			},
			"Closed": {
				bg: "bg-gray-100 dark:bg-gray-700",
				text: "text-gray-700 dark:text-gray-400",
				dot: "bg-gray-500"
			}
		};
		return map[status] || map["Open"];
	};
	const getPriorityColor = (priority) => {
		const map = {
			"High": "text-red-600 dark:text-red-400",
			"Medium": "text-yellow-600 dark:text-yellow-400",
			"Low": "text-gray-500 dark:text-gray-400"
		};
		return map[priority] || map["Medium"];
	};
	const statusColors = getStatusColor(ticket.status);
	const priorityColor = getPriorityColor(ticket.priority);
	const formattedDate = ticket.updated || ticket.timestamp || ticket.created_at || "—";
	const ticketId = ticket.id || `#${String(index + 1).padStart(4, "0")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-start gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 mb-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-medium ${statusColors.bg} ${statusColors.text}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${statusColors.dot}` }), ticket.status || "Open"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `text-[10px] sm:text-xs font-medium ${priorityColor}`,
								children: ["● ", ticket.priority || "Medium"]
							}),
							ticket.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full",
								children: ticket.category
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate",
						children: ticket.title || "Untitled Ticket"
					}),
					ticket.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2",
						children: ticket.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }), ticket.user || ticket.requester || "Unknown"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), formattedDate]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3 w-3" }), ticketId]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 flex-shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onReply(ticket),
					className: "inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden xs:inline",
						children: "Reply"
					})]
				}), ticket.status !== "Closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
				})]
			})]
		})
	});
}
function SupportPage() {
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [filteredTickets, setFilteredTickets] = (0, import_react.useState)([]);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [toast, setToast] = (0, import_react.useState)(null);
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 3500);
	};
	const loadTickets = (0, import_react.useCallback)(async () => {
		setBusy(true);
		try {
			const formattedTickets = (await getAdminNotifications()).map((item) => ({
				id: item.id || `TICKET-${Math.random().toString(36).substr(2, 9)}`,
				title: item.title || "Support Ticket",
				status: item.status || "Open",
				priority: item.priority || "Medium",
				user: item.user || item.requester || "Unknown",
				requester: item.requester || item.user,
				updated: item.updated_at || item.created_at || (/* @__PURE__ */ new Date()).toISOString(),
				timestamp: item.created_at || item.updated_at,
				created_at: item.created_at,
				message: item.message || item.content || "",
				category: item.category || item.type || "General"
			}));
			setTickets(formattedTickets);
			applyFilters(formattedTickets, filter, search);
		} catch (err) {
			console.error("Failed to load tickets:", err);
			showToast(err.message || "Failed to load support tickets", false);
		} finally {
			setBusy(false);
		}
	}, []);
	const applyFilters = (data, filterType, searchTerm) => {
		let filtered = data;
		if (filterType !== "All") filtered = filtered.filter((t) => t.status === filterType);
		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter((t) => t.title.toLowerCase().includes(term) || t.message && t.message.toLowerCase().includes(term) || t.user && t.user.toLowerCase().includes(term) || t.requester && t.requester.toLowerCase().includes(term));
		}
		setFilteredTickets(filtered);
	};
	(0, import_react.useEffect)(() => {
		loadTickets();
	}, [loadTickets]);
	(0, import_react.useEffect)(() => {
		applyFilters(tickets, filter, search);
	}, [
		filter,
		search,
		tickets
	]);
	const handleReply = (ticket) => {
		showToast(`Opening reply for ticket: ${ticket.title}`, true);
	};
	const getStatusCount = (status) => {
		return tickets.filter((t) => t.status === status).length;
	};
	const openCount = getStatusCount("Open");
	const pendingCount = getStatusCount("Pending");
	const resolvedCount = getStatusCount("Resolved");
	const closedCount = getStatusCount("Closed");
	const totalCount = tickets.length;
	if (busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center items-center min-h-[400px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-0",
		children: [
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `
          fixed top-4 sm:top-6 left-4 right-4 sm:left-auto sm:right-6 z-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white text-xs sm:text-sm font-medium shadow-lg
          ${toast.ok ? "bg-green-500" : "bg-red-500"}
          animate-slide-in
        `,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: toast.msg
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setToast(null),
						className: "text-white/80 hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Support Center" }),
						openCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium text-white bg-red-600 dark:bg-red-500 px-2.5 py-0.5 rounded-full animate-pulse",
							children: [openCount, " open"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: [
						totalCount,
						" tickets · ",
						openCount,
						" open · ",
						pendingCount,
						" pending"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 sm:gap-3 w-full xs:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: loadTickets,
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 xs:flex-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden xs:inline",
							children: "Refresh"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						value: totalCount,
						label: "Total Tickets",
						color: "blue",
						iconColor: "blue",
						onClick: () => setFilter("All")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleAlert,
						value: openCount,
						label: "Open",
						color: "red",
						iconColor: "red",
						subtext: "Needs attention",
						onClick: () => setFilter("Open")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Clock,
						value: pendingCount,
						label: "Pending",
						color: "yellow",
						iconColor: "yellow",
						onClick: () => setFilter("Pending")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleCheckBig,
						value: resolvedCount,
						label: "Resolved",
						color: "green",
						iconColor: "green",
						onClick: () => setFilter("Resolved")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-3 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search tickets by title, message, or user...",
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5 sm:gap-2 flex-wrap w-full sm:w-auto",
						children: [
							"All",
							"Open",
							"Pending",
							"Resolved",
							"Closed"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setFilter(f),
							className: `px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors flex-1 sm:flex-none ${filter === f ? "bg-blue-600 text-white dark:bg-blue-500 shadow-sm" : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
							children: [f, f !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `ml-1 px-1.5 py-0.5 rounded-full text-[8px] ${filter === f ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"}`,
								children: f === "Open" ? openCount : f === "Pending" ? pendingCount : f === "Resolved" ? resolvedCount : closedCount
							})]
						}, f))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: filteredTickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3",
								children: search ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-8 w-8 text-gray-400 dark:text-gray-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "h-8 w-8 text-gray-400 dark:text-gray-500" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-gray-600 dark:text-gray-400",
								children: search ? "No tickets match your search" : "No support tickets found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
								children: search ? "Try a different search term" : "Tickets will appear here when users create support requests"
							})
						]
					})
				}) : filteredTickets.map((ticket, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCard, {
					ticket,
					index,
					onReply: handleReply
				}, ticket.id || index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-gray-900 dark:text-white",
								children: "Email Support"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:support@techbridgeskills.ug",
								className: "text-xs text-blue-600 dark:text-blue-400 hover:underline",
								children: "support@techbridgeskills.ug"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-gray-900 dark:text-white",
								children: "Phone / WhatsApp"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:+256700000000",
								className: "text-xs text-blue-600 dark:text-blue-400 hover:underline",
								children: "+256 700 000 000"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-gray-900 dark:text-white",
								children: "Help Center"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#",
								className: "text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1",
								children: ["docs.techbridgeskills.ug", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
							})] })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
        .border-3 {
          border-width: 3px;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      ` })
		]
	});
}
//#endregion
export { SupportPage as component };

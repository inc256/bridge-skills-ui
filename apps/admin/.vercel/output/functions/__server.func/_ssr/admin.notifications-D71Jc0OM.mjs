import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-aCKu3ccm.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { B as Info, Ct as Award, S as RefreshCw, Y as Eye, a as Users, at as Clock, b as Search, bt as BookOpen, ct as CircleCheckBig, dt as ChevronRight, kt as Archive, lt as CircleAlert, m as Star, n as X, xt as Bell } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.notifications-D71Jc0OM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getNotifications() {
	try {
		const data = await apiRequest("/notifications/");
		return {
			notifications: data?.notifications || data?.results || data || [],
			unread: data?.unread || 0
		};
	} catch (error) {
		console.error("Error fetching notifications:", error);
		return {
			notifications: [],
			unread: 0
		};
	}
}
async function markAllRead() {
	return apiRequest("/notifications/read/", { method: "POST" });
}
async function markNotificationRead(id) {
	return apiRequest(`/notifications/${id}/read/`, { method: "POST" });
}
function StatCard({ icon: Icon, value, label, color = "blue", iconColor = "blue", subtext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 sm:gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2 sm:p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 sm:h-5 sm:w-5 text-${iconColor}-600 dark:text-${iconColor}-400` })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg sm:text-2xl font-bold text-gray-900 dark:text-white",
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
function NotificationItem({ notification, onMarkRead }) {
	const TYPE_ICONS = {
		course: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }),
		certificate: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4" }),
		streak: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4" }),
		enrollment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
		assignment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4" }),
		review: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4" }),
		announcement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }),
		system: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" })
	};
	const TYPE_COLORS = {
		course: {
			bg: "bg-blue-50 dark:bg-blue-900/20",
			text: "text-blue-700 dark:text-blue-400",
			border: "border-blue-200 dark:border-blue-800"
		},
		certificate: {
			bg: "bg-orange-50 dark:bg-orange-900/20",
			text: "text-orange-700 dark:text-orange-400",
			border: "border-orange-200 dark:border-orange-800"
		},
		streak: {
			bg: "bg-yellow-50 dark:bg-yellow-900/20",
			text: "text-yellow-700 dark:text-yellow-400",
			border: "border-yellow-200 dark:border-yellow-800"
		},
		enrollment: {
			bg: "bg-green-50 dark:bg-green-900/20",
			text: "text-green-700 dark:text-green-400",
			border: "border-green-200 dark:border-green-800"
		},
		assignment: {
			bg: "bg-purple-50 dark:bg-purple-900/20",
			text: "text-purple-700 dark:text-purple-400",
			border: "border-purple-200 dark:border-purple-800"
		},
		review: {
			bg: "bg-pink-50 dark:bg-pink-900/20",
			text: "text-pink-700 dark:text-pink-400",
			border: "border-pink-200 dark:border-pink-800"
		},
		announcement: {
			bg: "bg-cyan-50 dark:bg-cyan-900/20",
			text: "text-cyan-700 dark:text-cyan-400",
			border: "border-cyan-200 dark:border-cyan-800"
		},
		system: {
			bg: "bg-gray-50 dark:bg-gray-700/20",
			text: "text-gray-700 dark:text-gray-400",
			border: "border-gray-200 dark:border-gray-700"
		}
	};
	const colors = TYPE_COLORS[notification.type] || TYPE_COLORS.system;
	const icon = TYPE_ICONS[notification.type] || TYPE_ICONS.system;
	const formattedDate = notification.created_at ? new Date(notification.created_at).toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}) : "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-start gap-3 sm:gap-4 p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700/50 last:border-0 transition-all duration-200 ${notification.is_read ? "hover:bg-gray-50 dark:hover:bg-gray-700/30" : "bg-blue-50/30 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20"}`,
		children: [
			!notification.is_read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2 animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2 rounded-lg shrink-0 ${colors.bg} ${colors.text}`,
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 mb-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`,
							children: notification.type
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), formattedDate]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-sm ${notification.is_read ? "font-normal" : "font-semibold"} text-gray-900 dark:text-white`,
						children: notification.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5",
						children: notification.message
					}),
					notification.link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: notification.link,
						className: "text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 mt-1.5 font-medium",
						children: ["View Details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1 shrink-0",
				children: !notification.is_read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onMarkRead(notification.id),
					className: "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400",
					title: "Mark as read",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
				})
			})
		]
	});
}
function AdminNotifications() {
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [unread, setUnread] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 3500);
	};
	const loadNotifications = (0, import_react.useCallback)(() => {
		setBusy(true);
		getNotifications().then((data) => {
			setNotifications(data.notifications);
			setUnread(data.unread);
		}).catch((err) => {
			console.error("Error loading notifications:", err);
			showToast(err.message || "Failed to load notifications", false);
		}).finally(() => setBusy(false));
	}, []);
	(0, import_react.useEffect)(() => {
		loadNotifications();
	}, [loadNotifications]);
	const handleMarkAllRead = async () => {
		try {
			await markAllRead();
			showToast("All notifications marked as read ✅");
			loadNotifications();
		} catch (err) {
			showToast(err.message || "Failed to mark all as read", false);
		}
	};
	const handleMarkRead = async (id) => {
		try {
			await markNotificationRead(id);
			setNotifications((prev) => prev.map((n) => n.id === id ? {
				...n,
				is_read: true
			} : n));
			setUnread((prev) => Math.max(0, prev - 1));
		} catch (err) {
			showToast(err.message || "Failed to mark as read", false);
		}
	};
	const filteredNotifications = notifications.filter((n) => {
		const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.message.toLowerCase().includes(search.toLowerCase());
		const matchesFilter = filter === "all" || filter === "unread" && !n.is_read || filter === "read" && n.is_read;
		return matchesSearch && matchesFilter;
	});
	const totalNotifications = notifications.length;
	const unreadCount = notifications.filter((n) => !n.is_read).length;
	const readCount = notifications.filter((n) => n.is_read).length;
	const typeCounts = notifications.reduce((acc, n) => {
		acc[n.type] = (acc[n.type] || 0) + 1;
		return acc;
	}, {});
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Notifications" }),
						unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 px-2.5 py-0.5 rounded-full",
							children: [unread, " new"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: [
						totalNotifications,
						" notifications · ",
						unread,
						" unread · ",
						readCount,
						" read"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 sm:gap-3 w-full xs:w-auto",
					children: [unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleMarkAllRead,
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow-md flex-1 xs:flex-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden xs:inline",
								children: "Mark All Read"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "xs:hidden",
								children: "Mark Read"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: loadNotifications,
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 xs:flex-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden xs:inline",
							children: "Refresh"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Bell,
						value: totalNotifications,
						label: "Total",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleCheckBig,
						value: unreadCount,
						label: "Unread",
						color: "yellow",
						iconColor: "yellow",
						subtext: "Needs attention"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Eye,
						value: readCount,
						label: "Read",
						color: "green",
						iconColor: "green",
						subtext: "Already viewed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Archive,
						value: Object.keys(typeCounts).length,
						label: "Categories",
						color: "purple",
						iconColor: "purple"
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
								placeholder: "Search notifications by title or message...",
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
							"all",
							"unread",
							"read"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setFilter(f),
							className: `px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors flex-1 sm:flex-none ${filter === f ? "bg-blue-600 text-white dark:bg-blue-500 shadow-sm" : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
							children: [f.charAt(0).toUpperCase() + f.slice(1), f === "unread" && unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 bg-white/20 text-white px-1.5 py-0.5 rounded-full text-[8px]",
								children: unread
							})]
						}, f))
					})]
				})
			}),
			filteredNotifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3",
							children: search ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-8 w-8 text-gray-400 dark:text-gray-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-8 w-8 text-gray-400 dark:text-gray-500" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-gray-600 dark:text-gray-400",
							children: search ? "No notifications match your search" : "No notifications yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
							children: search ? "Try a different search term" : "Notifications will appear here when you receive them"
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden",
				children: [filteredNotifications.map((notification) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationItem, {
					notification,
					onMarkRead: handleMarkRead
				}, notification.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
						children: [
							"Showing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-gray-700 dark:text-gray-300",
								children: filteredNotifications.length
							}),
							" of",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-gray-700 dark:text-gray-300",
								children: notifications.length
							}),
							" notifications"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-blue-500" }), "Unread"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" }), "Read"]
						})]
					})]
				})]
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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      ` })
		]
	});
}
//#endregion
export { AdminNotifications as component };

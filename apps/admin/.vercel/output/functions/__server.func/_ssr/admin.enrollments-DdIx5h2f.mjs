import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-CG9AIe4t.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as Mail, St as Award, a as User, ct as CircleAlert, d as Trash2, ht as Calendar, i as Users, it as Clock, n as X, o as UserPlus, st as CircleCheckBig, u as TrendingUp, w as Pen, y as Search, yt as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.enrollments-DdIx5h2f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getEnrollments(params = {}) {
	const query = new URLSearchParams();
	if (params.status) query.append("status", params.status);
	if (params.user) query.append("user", params.user);
	if (params.page_size) query.append("page_size", String(params.page_size));
	return await apiRequest(`/enrollments/admin/${query.toString() ? `?${query.toString()}` : ""}`);
}
async function adminEnroll(data) {
	return apiRequest("/enrollments/admin/enroll/", {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function updateEnrollment(id, data) {
	return apiRequest(`/enrollments/admin/${id}/`, {
		method: "PATCH",
		body: JSON.stringify(data)
	});
}
async function deleteEnrollment(id) {
	return apiRequest(`/enrollments/admin/${id}/`, { method: "DELETE" });
}
async function getUsers(params = {}) {
	const query = new URLSearchParams();
	if (params.page_size) query.append("page_size", String(params.page_size));
	return (await apiRequest(`/users/${query.toString() ? `?${query.toString()}` : ""}`))?.results || [];
}
async function getCourses(params = {}) {
	const query = new URLSearchParams();
	if (params.page_size) query.append("page_size", String(params.page_size));
	return (await apiRequest(`/courses/${query.toString() ? `?${query.toString()}` : ""}`))?.results || [];
}
function Modal({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 mt-auto sm:mt-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10 rounded-t-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 sm:p-6",
				children
			})]
		})
	});
}
function StatCard({ icon: Icon, value, label, color = "blue", iconColor = "blue" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 sm:gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2 sm:p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 sm:h-5 sm:w-5 text-${iconColor}-600 dark:text-${iconColor}-400` })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg sm:text-2xl font-bold text-gray-900 dark:text-white",
					children: value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
					children: label
				})]
			})]
		})
	});
}
function getDisplayName(user) {
	if (!user) return "Unknown Student";
	const name = user.full_name || user.name || user.username || user.email || "";
	if (name && name.trim()) return name.trim();
	if (user.first_name || user.last_name) {
		const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
		if (fullName) return fullName;
	}
	return "Unknown Student";
}
function getInitials(user) {
	const name = getDisplayName(user);
	if (name === "Unknown Student") return "?";
	const parts = name.split(" ");
	if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
	return name.slice(0, 2).toUpperCase();
}
function getUserEmail(user) {
	if (!user) return "—";
	return user.email || "—";
}
function EnrollmentRow({ enrollment, onEditStatus, onDelete }) {
	const getStatusColor = (status) => {
		return {
			"active": {
				bg: "bg-green-100 dark:bg-green-900/30",
				text: "text-green-700 dark:text-green-400",
				dot: "bg-green-500"
			},
			"completed": {
				bg: "bg-blue-100 dark:bg-blue-900/30",
				text: "text-blue-700 dark:text-blue-400",
				dot: "bg-blue-500"
			},
			"dropped": {
				bg: "bg-red-100 dark:bg-red-900/30",
				text: "text-red-700 dark:text-red-400",
				dot: "bg-red-500"
			}
		}[status] || {
			bg: "bg-gray-100 dark:bg-gray-700",
			text: "text-gray-700 dark:text-gray-400",
			dot: "bg-gray-500"
		};
	};
	const statusColors = getStatusColor(enrollment.status);
	const displayName = getDisplayName(enrollment.user);
	const initials = getInitials(enrollment.user);
	const userEmail = getUserEmail(enrollment.user);
	const enrolledDate = enrollment.enrolled_at ? new Date(enrollment.enrolled_at).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}) : "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-sm",
							children: initials
						}), enrollment.status === "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-gray-900 dark:text-white truncate",
							children: displayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3 text-gray-400 dark:text-gray-500 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500 dark:text-gray-400 truncate",
								children: userEmail
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden md:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]",
						children: enrollment.course?.title || "—"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium ${statusColors.bg} ${statusColors.text}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${statusColors.dot}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize",
						children: enrollment.status
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden lg:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 sm:w-24 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full transition-all duration-700 ease-out",
							style: {
								width: `${Math.min(enrollment.progress || 0, 100)}%`,
								background: enrollment.progress >= 80 ? "#10B981" : enrollment.progress >= 50 ? "#3B82F6" : "#F59E0B"
							}
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-medium text-gray-600 dark:text-gray-400 min-w-[32px]",
						children: [parseFloat(String(enrollment.progress || 0)).toFixed(0), "%"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden xl:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 capitalize",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500" }), enrollment.source || "—"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden 2xl:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500" }), enrolledDate]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onEditStatus(enrollment),
						className: "p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400",
						title: "Update Status",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onDelete(enrollment),
						className: "p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400",
						title: "Remove Enrollment",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
					})]
				})
			})
		]
	});
}
function AdminEnrollments() {
	const [enrollments, setEnrollments] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [modal, setModal] = (0, import_react.useState)(null);
	const [users, setUsers] = (0, import_react.useState)([]);
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)({
		user_id: "",
		course_id: "",
		source: "admin"
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [editEnr, setEditEnr] = (0, import_react.useState)(null);
	const [editStatus, setEditStatus] = (0, import_react.useState)("");
	const [loadingUsersCourses, setLoadingUsersCourses] = (0, import_react.useState)(true);
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 3500);
	};
	const loadEnrollments = (0, import_react.useCallback)(() => {
		setBusy(true);
		getEnrollments({
			status: filter !== "all" ? filter : void 0,
			user: search || void 0,
			page_size: 100
		}).then((data) => {
			const results = data?.results || [];
			setEnrollments(results);
			setTotal(data?.count || 0);
		}).catch((err) => {
			console.error("Error loading enrollments:", err);
			showToast(err.message || "Failed to load enrollments", false);
		}).finally(() => setBusy(false));
	}, [filter, search]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(loadEnrollments, 300);
		return () => clearTimeout(t);
	}, [loadEnrollments]);
	(0, import_react.useEffect)(() => {
		setLoadingUsersCourses(true);
		Promise.all([getUsers({ page_size: 100 }), getCourses({ page_size: 100 })]).then(([usersData, coursesData]) => {
			setUsers(usersData || []);
			setCourses(coursesData || []);
		}).catch((err) => {
			console.error("Error loading users/courses:", err);
		}).finally(() => {
			setLoadingUsersCourses(false);
		});
	}, []);
	const enrollUser = async () => {
		if (!form.user_id || !form.course_id) {
			showToast("Please select both a student and a course", false);
			return;
		}
		setSaving(true);
		try {
			await adminEnroll(form);
			showToast("Student enrolled successfully! 🎉");
			setModal(null);
			loadEnrollments();
		} catch (ex) {
			showToast(ex.message || "Failed to enroll student", false);
		} finally {
			setSaving(false);
		}
	};
	const updateStatus = async () => {
		if (!editEnr) return;
		try {
			await updateEnrollment(editEnr.id, { status: editStatus });
			showToast("Status updated successfully! ✅");
			setModal(null);
			loadEnrollments();
		} catch (ex) {
			showToast(ex.message || "Failed to update status", false);
		}
	};
	const deleteEnrollmentHandler = async (enrollment) => {
		const studentName = getDisplayName(enrollment.user);
		if (!window.confirm(`Remove "${studentName}" from "${enrollment.course?.title || "this course"}"?`)) return;
		try {
			await deleteEnrollment(enrollment.id);
			showToast("Enrollment removed successfully!");
			loadEnrollments();
		} catch (ex) {
			showToast(ex.message || "Failed to remove enrollment", false);
		}
	};
	const openStatusModal = (enrollment) => {
		setEditEnr(enrollment);
		setEditStatus(enrollment.status);
		setModal("status");
	};
	const handleFormChange = (key) => (e) => {
		setForm((prev) => ({
			...prev,
			[key]: e.target.value
		}));
	};
	const totalEnrollments = enrollments.length;
	const activeEnrollments = enrollments.filter((e) => e.status === "active").length;
	const completedEnrollments = enrollments.filter((e) => e.status === "completed").length;
	const droppedEnrollments = enrollments.filter((e) => e.status === "dropped").length;
	let avgProgress = 0;
	if (totalEnrollments > 0) {
		const totalProgress = enrollments.reduce((sum, e) => {
			return sum + (typeof e.progress === "number" ? e.progress : 0);
		}, 0);
		avgProgress = Math.round(totalProgress / totalEnrollments);
	}
	const students = users.filter((u) => u.role === "student");
	(0, import_react.useEffect)(() => {
		if (enrollments.length > 0) {
			console.log("Enrollment data sample:", enrollments[0]);
			console.log("User data sample:", enrollments[0].user);
		}
	}, [enrollments]);
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enrollments" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full",
						children: [total, " total"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: "Manage student course enrollments and track progress"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setModal("enroll"),
					className: "w-full xs:w-auto inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium transition-colors shadow-sm hover:shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enroll User" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						value: totalEnrollments,
						label: "Total",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleCheckBig,
						value: activeEnrollments,
						label: "Active",
						color: "green",
						iconColor: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Clock,
						value: completedEnrollments,
						label: "Completed",
						color: "purple",
						iconColor: "purple"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleAlert,
						value: droppedEnrollments,
						label: "Dropped",
						color: "red",
						iconColor: "red"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: TrendingUp,
						value: isNaN(avgProgress) ? 0 : avgProgress + "%",
						label: "Avg Progress",
						color: "orange",
						iconColor: "orange"
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
								placeholder: "Search by student name or email...",
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
							"active",
							"completed",
							"dropped"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilter(f),
							className: `px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors flex-1 sm:flex-none ${filter === f ? "bg-blue-600 text-white dark:bg-blue-500 shadow-sm" : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
							children: f.charAt(0).toUpperCase() + f.slice(1)
						}, f))
					})]
				})
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
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }), "Student"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3 w-3" }), "Course"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell",
									children: "Progress"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell",
									children: "Source"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden 2xl:table-cell",
									children: "Enrolled"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: enrollments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "py-8 sm:py-12 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-8 w-8 text-gray-400 dark:text-gray-500" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-600 dark:text-gray-400",
										children: "No enrollments found"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
										children: "Click \"Enroll User\" to add a new enrollment"
									})
								]
							})
						}) }) : enrollments.map((enrollment) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnrollmentRow, {
							enrollment,
							onEditStatus: openStatusModal,
							onDelete: deleteEnrollmentHandler
						}, enrollment.id)) })]
					})
				}), enrollments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
						children: [
							"Showing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-gray-700 dark:text-gray-300",
								children: enrollments.length
							}),
							" of",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-gray-700 dark:text-gray-300",
								children: total
							}),
							" enrollments"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-green-500" }), "Active"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-blue-500" }), "Completed"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500" }), "Dropped"]
							})
						]
					})]
				})]
			}),
			modal === "enroll" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Enroll User in Course",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: ["Student ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							loadingUsersCourses ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-center py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-5 w-5 border-2 border-gray-200 dark:border-gray-700 border-t-blue-600" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.user_id,
								onChange: handleFormChange("user_id"),
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— Select student —"
								}), students.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: u.id,
									children: [
										getDisplayName(u),
										" (",
										getUserEmail(u),
										")"
									]
								}, u.id))]
							}),
							!loadingUsersCourses && students.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-yellow-600 dark:text-yellow-400 mt-1.5 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), "No students available. Create a student account first."]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: ["Course ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							loadingUsersCourses ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-center py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-5 w-5 border-2 border-gray-200 dark:border-gray-700 border-t-blue-600" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.course_id,
								onChange: handleFormChange("course_id"),
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— Select course —"
								}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.title
								}, c.id))]
							}),
							!loadingUsersCourses && courses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-yellow-600 dark:text-yellow-400 mt-1.5 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), "No courses available. Create a course first."]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Source"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: form.source,
							onChange: handleFormChange("source"),
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
							children: [
								"admin",
								"free",
								"paid",
								"coupon"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s.charAt(0).toUpperCase() + s.slice(1)
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: enrollUser,
								disabled: saving || loadingUsersCourses || students.length === 0 || courses.length === 0,
								className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving || loadingUsersCourses || students.length === 0 || courses.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
								children: saving ? "Enrolling..." : "Enroll Now"
							})]
						})
					]
				})
			}),
			modal === "status" && editEnr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Update Enrollment Status",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm",
									children: getInitials(editEnr.user)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-gray-900 dark:text-white",
									children: getDisplayName(editEnr.user)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-gray-500 dark:text-gray-400",
									children: [
										getUserEmail(editEnr.user),
										" → ",
										editEnr.course?.title || "Course"
									]
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: editStatus,
							onChange: (e) => setEditStatus(e.target.value),
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
							children: [
								"active",
								"completed",
								"dropped"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s.charAt(0).toUpperCase() + s.slice(1)
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: updateStatus,
								className: "px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md",
								children: "Update Status"
							})]
						})
					]
				})
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
      ` })
		]
	});
}
//#endregion
export { AdminEnrollments as component };

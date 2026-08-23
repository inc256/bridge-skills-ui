import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-aCKu3ccm.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Ct as Award, S as RefreshCw, T as Pen, a as Users, b as Search, d as TrendingUp, gt as Calendar, l as UserCheck, n as X, s as UserPlus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.students-DGsQVP-s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Modal({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-gray-900 dark:text-white",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6",
				children
			})]
		})
	});
}
function StatCard({ icon: Icon, value, label, color = "blue" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 text-${color}-600 dark:text-${color}-400` })
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
function StudentRow({ student, index, onEdit }) {
	const getRoleColor = (role) => {
		const roleLower = role?.toLowerCase() || "student";
		if (roleLower === "admin") return {
			bg: "bg-purple-100 dark:bg-purple-900/30",
			text: "text-purple-700 dark:text-purple-400"
		};
		if (roleLower === "instructor" || roleLower === "tutor") return {
			bg: "bg-blue-100 dark:bg-blue-900/30",
			text: "text-blue-700 dark:text-blue-400"
		};
		return {
			bg: "bg-green-100 dark:bg-green-900/30",
			text: "text-green-700 dark:text-green-400"
		};
	};
	const getInitials = (name) => {
		if (!name) return "?";
		return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
	};
	const colors = getRoleColor(student.role);
	const initials = getInitials(student.full_name || student.username || student.name || "?");
	const displayName = student.full_name || student.name || student.username || "Unknown";
	const joinedDate = student.created_at ? new Date(student.created_at).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}) : "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 border-b border-gray-100 dark:border-gray-700/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `
            w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0
            ${colors.bg} ${colors.text}
          `,
						children: initials
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-gray-900 dark:text-white truncate",
							children: displayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500 dark:text-gray-400 truncate sm:hidden",
							children: student.email || "—"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden sm:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-600 dark:text-gray-300 truncate max-w-[150px]",
					children: student.email || "—"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden md:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `
          inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
          ${colors.bg} ${colors.text}
        `,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `
            w-1.5 h-1.5 rounded-full mr-1.5
            ${student.role === "admin" ? "bg-purple-500" : student.role === "instructor" ? "bg-blue-500" : "bg-green-500"}
          ` }), student.role || "student"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden lg:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium text-gray-900 dark:text-white",
							children: [student.xp || 0, " XP"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-gray-400 dark:text-gray-500",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-gray-600 dark:text-gray-300",
							children: ["Lv ", student.level || 1]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden xl:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }), joinedDate]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onEdit(student),
						className: "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400",
						title: "View Details",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { size: 16 })
					})
				})
			})
		]
	});
}
function AdminStudents() {
	const [users, setUsers] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [q, setQ] = (0, import_react.useState)("");
	const [toast, setToast] = (0, import_react.useState)(null);
	const [modal, setModal] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		email: "",
		first_name: "",
		last_name: "",
		username: "",
		password: "",
		password2: "",
		role: "student"
	});
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 3500);
	};
	const load = (0, import_react.useCallback)(() => {
		setBusy(true);
		const params = new URLSearchParams();
		params.append("role", "student");
		params.append("page_size", "50");
		if (q) params.append("search", q);
		apiRequest(`/users/?${params.toString()}`).then((r) => {
			const results = r?.results || r || [];
			setUsers(results);
			setTotal(r?.count || results.length || 0);
		}).catch((err) => {
			console.error("Load error:", err);
			showToast("Failed to load students: " + err.message, false);
		}).finally(() => setBusy(false));
	}, [q]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(load, 400);
		return () => clearTimeout(t);
	}, [load]);
	const openAdd = () => {
		setForm({
			email: "",
			first_name: "",
			last_name: "",
			username: "",
			password: "",
			password2: "",
			role: "student"
		});
		setModal("add");
	};
	const openEdit = (u) => {
		setEditing(u);
		setForm({
			email: u.email,
			first_name: u.first_name || "",
			last_name: u.last_name || "",
			username: u.username,
			password: "",
			password2: "",
			role: u.role
		});
		setModal("edit");
	};
	const saveAdd = async () => {
		if (!form.email || !form.password) {
			showToast("Email and password required", false);
			return;
		}
		if (form.password !== form.password2) {
			showToast("Passwords do not match", false);
			return;
		}
		setSaving(true);
		try {
			await apiRequest("/auth/register/", {
				method: "POST",
				body: JSON.stringify({
					email: form.email,
					password: form.password,
					username: form.username || form.email.split("@")[0],
					first_name: form.first_name,
					last_name: form.last_name,
					role: "student"
				})
			});
			showToast("Student added successfully!");
			setModal(null);
			load();
		} catch (ex) {
			console.error("Add error:", ex);
			showToast(ex.message || "Failed to add student", false);
		} finally {
			setSaving(false);
		}
	};
	const handleChange = (key) => (e) => {
		setForm((p) => ({
			...p,
			[key]: e.target.value
		}));
	};
	const totalStudents = users.length;
	const activeStudents = users.filter((u) => u.is_verified !== false).length;
	const totalXP = users.reduce((sum, u) => sum + (u.xp || 0), 0);
	const avgXP = totalStudents > 0 ? Math.round(totalXP / totalStudents) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto",
		children: [
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `
          fixed top-6 right-6 z-50 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg
          ${toast.ok ? "bg-green-500" : "bg-red-500"}
          animate-slide-in
        `,
				children: toast.msg
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white",
					children: "Students"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-gray-500 dark:text-gray-400 mt-1",
					children: [total, " students registered on the platform"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 sm:gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: load,
						className: "inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							size: 16,
							className: busy ? "animate-spin" : ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Refresh"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: openAdd,
						className: "inline-flex items-center gap-2 px-3 sm:px-5 py-2 border border-transparent rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Student" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						value: totalStudents,
						label: "Total Students",
						color: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: UserCheck,
						value: activeStudents,
						label: "Active Students",
						color: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Award,
						value: totalXP.toLocaleString(),
						label: "Total XP Earned",
						color: "purple"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: TrendingUp,
						value: avgXP,
						label: "Average XP",
						color: "orange"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 16,
						className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search by name or email…",
						className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
							className: "bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Student"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell",
									children: "Role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell",
									children: "XP / Level"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell",
									children: "Joined"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 6,
							className: "py-12 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "inline-block w-8 h-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-gray-500 dark:text-gray-400",
								children: "Loading students..."
							})]
						}) }) : users.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 6,
							className: "py-12 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-gray-500 dark:text-gray-400",
									children: "No students found"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
									children: "Try adjusting your search or add a new student"
								})
							]
						}) }) : users.map((u, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentRow, {
							student: u,
							index,
							onEdit: openEdit
						}, u.id || index)) })]
					})
				}), !busy && users.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-gray-500 dark:text-gray-400",
						children: [
							"Showing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: users.length
							}),
							" of ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: total
							}),
							" students"
						]
					})
				})]
			}),
			modal === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Add Student",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: "First name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.first_name,
								onChange: handleChange("first_name"),
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: "Last name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.last_name,
								onChange: handleChange("last_name"),
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Username"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.username,
							onChange: handleChange("username"),
							placeholder: "e.g. sarah.namukasa",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: form.email,
							onChange: handleChange("email"),
							placeholder: "student@example.com",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: ["Password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: form.password,
							onChange: handleChange("password"),
							placeholder: "Min. 8 characters",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: ["Confirm password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: form.password2,
							onChange: handleChange("password2"),
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: saveAdd,
								disabled: saving,
								className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
								children: saving ? "Adding..." : "Add Student"
							})]
						})
					]
				})
			}),
			modal === "edit" && editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Student Details",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl font-bold text-blue-700 dark:text-blue-400",
								children: (editing.full_name?.[0] || editing.username?.[0] || "?").toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-semibold text-gray-900 dark:text-white",
								children: editing.full_name || editing.username || "Unknown"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500 dark:text-gray-400",
								children: editing.email
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: "Role"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-900 dark:text-white capitalize",
										children: editing.role || "student"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: "XP"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-900 dark:text-white",
										children: editing.xp || 0
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: "Level"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-900 dark:text-white",
										children: editing.level || 1
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: "Streak"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium text-gray-900 dark:text-white",
										children: [editing.streak_days || 0, " days"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500 dark:text-gray-400",
								children: "Joined"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-gray-900 dark:text-white",
								children: editing.created_at ? new Date(editing.created_at).toLocaleDateString("en-US", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric"
								}) : "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Close"
							})
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
      ` })
		]
	});
}
//#endregion
export { AdminStudents as component };

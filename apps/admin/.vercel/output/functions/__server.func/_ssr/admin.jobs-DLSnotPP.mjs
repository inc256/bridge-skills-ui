import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-aCKu3ccm.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as Mail, S as Plus, St as Award, X as ExternalLink, _t as Briefcase, d as Trash2, gt as Building2, ht as Calendar, j as MapPin, n as X, st as CircleCheckBig, u as TrendingUp, w as Pen, x as RefreshCw, y as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.jobs-DLSnotPP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getJobs(params = {}) {
	const query = new URLSearchParams();
	if (params.page_size) query.append("page_size", String(params.page_size));
	return await apiRequest(`/features/jobs/${query.toString() ? `?${query.toString()}` : ""}`);
}
async function createJob(data) {
	return apiRequest("/features/jobs/", {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function updateJob(id, data) {
	return apiRequest(`/features/jobs/${id}/`, {
		method: "PATCH",
		body: JSON.stringify(data)
	});
}
function Modal({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 mt-auto sm:mt-0",
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
function StatCard({ icon: Icon, value, label, color = "blue", iconColor = "blue", subtext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 sm:gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2 sm:p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 sm:h-5 sm:w-5 text-${iconColor}-600 dark:${iconColor}-400` })
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
function JobCard({ job, onEdit, onDelete, onToggleActive }) {
	const getTypeColor = (type) => {
		const map = {
			"full_time": {
				bg: "bg-blue-100 dark:bg-blue-900/30",
				text: "text-blue-700 dark:text-blue-400",
				dot: "bg-blue-500"
			},
			"part_time": {
				bg: "bg-green-100 dark:bg-green-900/30",
				text: "text-green-700 dark:text-green-400",
				dot: "bg-green-500"
			},
			"contract": {
				bg: "bg-yellow-100 dark:bg-yellow-900/30",
				text: "text-yellow-700 dark:text-yellow-400",
				dot: "bg-yellow-500"
			},
			"internship": {
				bg: "bg-purple-100 dark:bg-purple-900/30",
				text: "text-purple-700 dark:text-purple-400",
				dot: "bg-purple-500"
			},
			"remote": {
				bg: "bg-cyan-100 dark:bg-cyan-900/30",
				text: "text-cyan-700 dark:text-cyan-400",
				dot: "bg-cyan-500"
			}
		};
		return map[type] || map["full_time"];
	};
	const typeColors = getTypeColor(job.job_type);
	const formattedDate = job.created_at ? new Date(job.created_at).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}) : "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4 text-blue-600 dark:text-blue-400" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-gray-900 dark:text-white truncate",
							children: job.title
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-gray-600 dark:text-gray-400",
							children: job.company_name
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1 shrink-0",
					children: [!job.is_active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] sm:text-[10px] font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 h-1 rounded-full bg-red-500" }), "Inactive"]
					}), job.is_featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] sm:text-[10px] font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
						children: "⭐ Featured"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-medium ${typeColors.bg} ${typeColors.text}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${typeColors.dot}` }), job.job_type?.replace("_", " ") || "Full time"]
					}),
					job.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), job.location]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), formattedDate]
					})
				]
			}),
			job.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 flex-1",
				children: job.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 mt-2",
				children: [job.apply_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: job.apply_url,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }), "Apply URL"]
				}), job.apply_email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3" }), job.apply_email]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onToggleActive(job),
						className: `flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${job.is_active ? "border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20" : "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"}`,
						children: job.is_active ? "Deactivate" : "Activate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onEdit(job),
						className: "p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400",
						title: "Edit",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onDelete(job),
						className: "p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400",
						title: "Delete",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
					})
				]
			})
		]
	});
}
function AdminJobs() {
	const [jobs, setJobs] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [modal, setModal] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		company_name: "",
		description: "",
		requirements: "",
		location: "",
		job_type: "full_time",
		apply_url: "",
		apply_email: "",
		is_active: true,
		is_featured: false
	});
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 3500);
	};
	const loadJobs = (0, import_react.useCallback)(() => {
		setBusy(true);
		getJobs({ page_size: 50 }).then((data) => {
			setJobs(data?.results || []);
			setTotal(data?.count || 0);
		}).catch((err) => {
			console.error("Error loading jobs:", err);
			showToast(err.message || "Failed to load jobs", false);
		}).finally(() => setBusy(false));
	}, []);
	(0, import_react.useEffect)(() => {
		loadJobs();
	}, [loadJobs]);
	const openAddModal = () => {
		setForm({
			title: "",
			company_name: "",
			description: "",
			requirements: "",
			location: "",
			job_type: "full_time",
			apply_url: "",
			apply_email: "",
			is_active: true,
			is_featured: false
		});
		setEditId(null);
		setModal("form");
	};
	const openEditModal = (job) => {
		setForm({
			title: job.title || "",
			company_name: job.company_name || "",
			description: job.description || "",
			requirements: job.requirements || "",
			location: job.location || "",
			job_type: job.job_type || "full_time",
			apply_url: job.apply_url || "",
			apply_email: job.apply_email || "",
			is_active: job.is_active !== void 0 ? job.is_active : true,
			is_featured: job.is_featured || false
		});
		setEditId(job.id);
		setModal("form");
	};
	const saveJob = async () => {
		if (!form.title.trim() || !form.company_name.trim()) {
			showToast("Title and company name are required", false);
			return;
		}
		setSaving(true);
		try {
			if (editId) {
				await updateJob(editId, form);
				showToast("Job updated successfully! ✅");
			} else {
				await createJob(form);
				showToast("Job posted successfully! 🎉");
			}
			setModal(null);
			loadJobs();
		} catch (ex) {
			showToast(ex.message || "Failed to save job", false);
		} finally {
			setSaving(false);
		}
	};
	const deleteJob = async (job) => {
		if (!window.confirm(`Delete "${job.title}" at ${job.company_name}?`)) return;
		try {
			await deleteJob(job.id);
			showToast("Job deleted successfully!");
			loadJobs();
		} catch (ex) {
			showToast(ex.message || "Failed to delete job", false);
		}
	};
	const toggleActive = async (job) => {
		try {
			await updateJob(job.id, { is_active: !job.is_active });
			showToast(`Job ${job.is_active ? "deactivated" : "activated"} successfully!`);
			loadJobs();
		} catch (ex) {
			showToast(ex.message || "Failed to update status", false);
		}
	};
	const handleChange = (key) => (e) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
	};
	const filteredJobs = jobs.filter((job) => {
		const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.company_name.toLowerCase().includes(search.toLowerCase()) || job.description && job.description.toLowerCase().includes(search.toLowerCase());
		const matchesFilter = filter === "all" || filter === "active" && job.is_active || filter === "inactive" && !job.is_active;
		return matchesSearch && matchesFilter;
	});
	const totalJobs = jobs.length;
	const activeJobs = jobs.filter((j) => j.is_active).length;
	const featuredJobs = jobs.filter((j) => j.is_featured).length;
	const jobTypes = jobs.reduce((acc, j) => {
		acc[j.job_type] = (acc[j.job_type] || 0) + 1;
		return acc;
	}, {});
	const mostCommonType = Object.entries(jobTypes).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jobs & Careers" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full",
							children: [totalJobs, " total"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: "Post and manage job opportunities for platform learners"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 sm:gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: loadJobs,
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden xs:inline",
							children: "Refresh"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: openAddModal,
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Post Job" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Briefcase,
						value: totalJobs,
						label: "Total Jobs",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleCheckBig,
						value: activeJobs,
						label: "Active",
						color: "green",
						iconColor: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Award,
						value: featuredJobs,
						label: "Featured",
						color: "yellow",
						iconColor: "yellow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: TrendingUp,
						value: mostCommonType.replace("_", " "),
						label: "Most Common Type",
						color: "purple",
						iconColor: "purple",
						subtext: "Job type"
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
								placeholder: "Search jobs by title, company, or description...",
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
							"inactive"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilter(f),
							className: `px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors flex-1 sm:flex-none ${filter === f ? "bg-blue-600 text-white dark:bg-blue-500 shadow-sm" : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
							children: f.charAt(0).toUpperCase() + f.slice(1)
						}, f))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
				children: filteredJobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-8 w-8 text-gray-400 dark:text-gray-500" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-gray-600 dark:text-gray-400",
								children: search ? "No jobs match your search" : "No jobs posted yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
								children: search ? "Try a different search term" : "Click \"Post Job\" to create your first job listing"
							})
						]
					})
				}) : filteredJobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobCard, {
					job,
					onEdit: openEditModal,
					onDelete: deleteJob,
					onToggleActive: toggleActive
				}, job.id))
			}),
			modal === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: editId ? "Edit Job" : "Post New Job",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: ["Job Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.title,
							onChange: handleChange("title"),
							placeholder: "e.g. Network Engineer",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: ["Company Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.company_name,
							onChange: handleChange("company_name"),
							placeholder: "e.g. MTN Uganda",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: "Job Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.job_type,
								onChange: handleChange("job_type"),
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
								children: [
									"full_time",
									"part_time",
									"contract",
									"internship",
									"remote"
								].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t,
									children: t.replace("_", " ").toUpperCase()
								}, t))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: "Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.location,
								onChange: handleChange("location"),
								placeholder: "Kampala, Uganda",
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: ["Description ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.description,
							onChange: handleChange("description"),
							rows: 3,
							placeholder: "Job description...",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Requirements"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.requirements,
							onChange: handleChange("requirements"),
							rows: 2,
							placeholder: "Skills and qualifications required...",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: "Apply URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.apply_url,
								onChange: handleChange("apply_url"),
								placeholder: "https://apply.example.com",
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: "Apply Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: form.apply_email,
								onChange: handleChange("apply_email"),
								placeholder: "hr@company.com",
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.is_active,
									onChange: handleChange("is_active"),
									className: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								}), "Active"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.is_featured,
									onChange: handleChange("is_featured"),
									className: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								}), "Featured"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: saveJob,
								disabled: saving,
								className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
								children: saving ? "Saving..." : editId ? "Update Job" : "Post Job"
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
export { AdminJobs as component };

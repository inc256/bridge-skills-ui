import { r as __toESM } from "../_runtime.mjs";
import { i as getCategories, t as apiRequest$1 } from "./api-aCKu3ccm.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { C as Plus, Q as Ellipsis, T as Pen, a as Users, at as Clock, b as Search, bt as BookOpen, f as Trash2, kt as Archive, m as Star, n as X, pt as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.courses-CtOcat8b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function apiRequest(path, options = {}) {
	return apiRequest$1(path, options);
}
async function getFullCourses() {
	try {
		const data = await apiRequest("/courses/");
		return Array.isArray(data) ? data : data?.results ?? [];
	} catch (error) {
		console.error("Error fetching courses:", error);
		return [];
	}
}
async function createCourse(data) {
	return apiRequest("/courses/create/", {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function updateCourse(slug, data) {
	return apiRequest(`/courses/${slug}/`, {
		method: "PATCH",
		body: JSON.stringify(data)
	});
}
async function deleteCourse(slug) {
	return apiRequest(`/courses/${slug}/`, { method: "DELETE" });
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
function StatCard({ icon: Icon, value, label, color = "blue", iconColor = "blue", subtext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 text-${iconColor}-600 dark:text-${iconColor}-400` })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl sm:text-2xl font-bold text-gray-900 dark:text-white",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-gray-500 dark:text-gray-400",
					children: label
				}),
				subtext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-gray-400 dark:text-gray-500",
					children: subtext
				})
			] })]
		})
	});
}
function AdminCourses() {
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [cats, setCats] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [toast, setToast] = (0, import_react.useState)(null);
	const [modal, setModal] = (0, import_react.useState)(null);
	const [active, setActive] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [openDropdown, setOpenDropdown] = (0, import_react.useState)(null);
	const dropdownRef = (0, import_react.useRef)(null);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		slug: "",
		subtitle: "",
		description: "",
		level: "beginner",
		pricing: "free",
		price: "0",
		language: "English",
		status: "draft",
		has_certificate: false,
		category: ""
	});
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 3500);
	};
	const loadData = (0, import_react.useCallback)(() => {
		setBusy(true);
		Promise.all([getFullCourses(), getCategories()]).then(([coursesData, categoriesData]) => {
			const enrichedCourses = (coursesData || []).map((c) => ({
				id: c.id || c.slug,
				slug: c.slug,
				title: c.title || "Untitled",
				instructor: c.instructor?.full_name || c.instructor || "—",
				category: c.category?.name || c.category || "General",
				category_id: c.category?.id || "",
				level: c.level || "beginner",
				status: c.status || "draft",
				pricing: c.pricing || "free",
				price: c.price || "0",
				total_students: c.total_students || c.students || 0,
				total_lessons: c.total_lessons || 0,
				avg_rating: c.avg_rating || 0,
				is_featured: c.is_featured || false,
				description: c.description || "",
				subtitle: c.subtitle || "",
				has_certificate: c.has_certificate || false,
				created_at: c.created_at,
				updated_at: c.updated_at
			}));
			setCourses(enrichedCourses);
			setTotal(enrichedCourses.length);
			setCats(categoriesData || []);
		}).catch((err) => {
			console.error("Load error:", err);
			showToast("Failed to load courses", false);
		}).finally(() => setBusy(false));
	}, []);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	(0, import_react.useEffect)(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setOpenDropdown(null);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const openAddModal = () => {
		setForm({
			title: "",
			slug: "",
			subtitle: "",
			description: "",
			level: "beginner",
			pricing: "free",
			price: "0",
			language: "English",
			status: "draft",
			has_certificate: false,
			category: ""
		});
		setActive(null);
		setModal("add");
	};
	const openEditModal = (course) => {
		setActive(course);
		setForm({
			title: course.title || "",
			slug: course.slug || "",
			subtitle: course.subtitle || "",
			description: course.description || "",
			level: course.level || "beginner",
			pricing: course.pricing || "free",
			price: course.price?.toString() || "0",
			language: course.language || "English",
			status: course.status || "draft",
			has_certificate: course.has_certificate || false,
			category: course.category_id || ""
		});
		setModal("edit");
		setOpenDropdown(null);
	};
	const saveCourse = async () => {
		if (!form.title.trim()) {
			showToast("Title is required", false);
			return;
		}
		setSaving(true);
		try {
			const payload = {
				title: form.title,
				slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
				subtitle: form.subtitle,
				description: form.description,
				level: form.level,
				pricing: form.pricing,
				price: parseFloat(form.price || "0"),
				language: form.language,
				status: form.status,
				has_certificate: form.has_certificate,
				category: form.category || void 0
			};
			if (modal === "add") {
				await createCourse(payload);
				showToast("Course created successfully! 🎉");
			} else if (active) {
				await updateCourse(active.slug, payload);
				showToast("Course updated successfully! ✅");
			}
			setModal(null);
			loadData();
		} catch (ex) {
			console.error("Save error:", ex);
			showToast(ex.message || "Failed to save course", false);
		} finally {
			setSaving(false);
		}
	};
	const deleteCourseHandler = async (course) => {
		if (!window.confirm(`Delete "${course.title}"? This cannot be undone.`)) return;
		try {
			await deleteCourse(course.slug);
			showToast("Course deleted successfully");
			loadData();
		} catch {
			showToast("Failed to delete course", false);
		}
		setOpenDropdown(null);
	};
	const handleAction = async (action, course) => {
		setOpenDropdown(null);
		switch (action) {
			case "edit":
				openEditModal(course);
				return;
			case "delete":
				await deleteCourseHandler(course);
				return;
			case "feature":
				try {
					await updateCourse(course.slug, { is_featured: true });
					showToast(`"${course.title}" featured! ⭐`);
					loadData();
				} catch (err) {
					showToast("Failed to feature course", false);
				}
				return;
			case "unfeature":
				try {
					await updateCourse(course.slug, { is_featured: false });
					showToast(`"${course.title}" unfeatured`);
					loadData();
				} catch (err) {
					showToast("Failed to unfeature course", false);
				}
				return;
			case "approve":
				try {
					await updateCourse(course.slug, { status: "published" });
					showToast(`"${course.title}" approved! ✅`);
					loadData();
				} catch (err) {
					showToast("Failed to approve course", false);
				}
				return;
			case "publish":
				try {
					await updateCourse(course.slug, { status: "published" });
					showToast(`"${course.title}" published! 🚀`);
					loadData();
				} catch (err) {
					showToast("Failed to publish course", false);
				}
				return;
			case "archive":
				try {
					await updateCourse(course.slug, { status: "archived" });
					showToast(`"${course.title}" archived`);
					loadData();
				} catch (err) {
					showToast("Failed to archive course", false);
				}
				return;
			default: return;
		}
	};
	const toggleDropdown = (e, courseId) => {
		e.preventDefault();
		e.stopPropagation();
		setOpenDropdown(openDropdown === courseId ? null : courseId);
	};
	const handleChange = (key) => (e) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setForm((p) => ({
			...p,
			[key]: value
		}));
	};
	const getStatusColor = (status) => {
		const statusMap = {
			"published": {
				bg: "bg-green-100 dark:bg-green-900/30",
				text: "text-green-700 dark:text-green-400",
				dot: "bg-green-500"
			},
			"draft": {
				bg: "bg-yellow-100 dark:bg-yellow-900/30",
				text: "text-yellow-700 dark:text-yellow-400",
				dot: "bg-yellow-500"
			},
			"archived": {
				bg: "bg-gray-100 dark:bg-gray-700",
				text: "text-gray-700 dark:text-gray-400",
				dot: "bg-gray-500"
			},
			"pending": {
				bg: "bg-orange-100 dark:bg-orange-900/30",
				text: "text-orange-700 dark:text-orange-400",
				dot: "bg-orange-500"
			},
			"in_review": {
				bg: "bg-purple-100 dark:bg-purple-900/30",
				text: "text-purple-700 dark:text-purple-400",
				dot: "bg-purple-500"
			}
		};
		return statusMap[status] || statusMap["draft"];
	};
	const getStatusLabel = (status) => {
		return {
			"published": "Published",
			"draft": "Draft",
			"archived": "Archived",
			"pending": "Pending",
			"in_review": "In Review"
		}[status] || status || "Draft";
	};
	const getLevelLabel = (level) => {
		return {
			"beginner": "Beginner",
			"intermediate": "Intermediate",
			"advanced": "Advanced"
		}[level] || level || "Beginner";
	};
	const totalCourses = courses.length;
	const publishedCourses = courses.filter((c) => c.status === "published").length;
	const pendingCourses = courses.filter((c) => c.status === "pending" || c.status === "in_review").length;
	courses.filter((c) => c.is_featured).length;
	const totalStudents = courses.reduce((sum, c) => sum + (c.total_students || 0), 0);
	const searchedCourses = courses.filter((c) => {
		if (filter === "All") return true;
		if (filter === "Pending review") return c.status === "pending" || c.status === "in_review";
		if (filter === "Published") return c.status === "published";
		if (filter === "Featured") return c.is_featured;
		if (filter === "Archived") return c.status === "archived";
		return true;
	}).filter((c) => {
		if (!search) return true;
		const term = search.toLowerCase();
		return (c.title || "").toLowerCase().includes(term) || (c.instructor || "").toLowerCase().includes(term) || (c.category || "").toLowerCase().includes(term);
	});
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Course Management" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full",
							children: [totalCourses, " courses"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: "Manage content, publishing, and course settings"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 sm:gap-3 w-full xs:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: openAddModal,
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow-md flex-1 xs:flex-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New Course" })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: BookOpen,
						value: totalCourses,
						label: "Total Courses",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Check,
						value: publishedCourses,
						label: "Published",
						color: "green",
						iconColor: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Clock,
						value: pendingCourses,
						label: "Pending Review",
						color: "yellow",
						iconColor: "yellow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						value: totalStudents.toLocaleString(),
						label: "Total Students",
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
								placeholder: "Search courses by title, instructor, or category...",
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
							"Pending review",
							"Published",
							"Featured",
							"Archived"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilter(f),
							className: `px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors flex-1 sm:flex-none ${filter === f ? "bg-blue-600 text-white dark:bg-blue-500 shadow-sm" : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
							children: f
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3 w-3" }), "Course"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell",
									children: "Instructor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell",
									children: "Level"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell",
									children: "Students"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell",
									children: "Price"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: searchedCourses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "py-8 sm:py-12 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500 dark:text-gray-400",
										children: search ? "No courses match your search" : "No courses found"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
										children: search ? "Try a different search term" : "Click \"New Course\" to create one"
									})
								]
							})
						}) }) : searchedCourses.map((course) => {
							const statusColors = getStatusColor(course.status);
							const isFeatured = course.is_featured;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 flex items-center justify-center shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5 text-blue-600 dark:text-blue-400" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm font-semibold text-gray-900 dark:text-white truncate",
														children: course.title
													}), isFeatured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 text-yellow-500 fill-yellow-500 flex-shrink-0" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-gray-500 dark:text-gray-400 truncate",
													children: course.category || "General"
												})]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4 hidden md:table-cell",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-gray-600 dark:text-gray-300",
											children: course.instructor || "—"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4 hidden sm:table-cell",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
											children: getLevelLabel(course.level)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4 hidden lg:table-cell",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-gray-600 dark:text-gray-300",
											children: (course.total_students || 0).toLocaleString()
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium ${statusColors.bg} ${statusColors.text}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${statusColors.dot}` }), getStatusLabel(course.status)]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4 hidden sm:table-cell",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-sm font-semibold ${course.pricing === "free" ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-300"}`,
											children: course.pricing === "free" ? "FREE" : `UGX ${Number(course.price || 0).toLocaleString()}`
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-3 sm:py-4 sm:px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											ref: dropdownRef,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: (e) => toggleDropdown(e, course.id),
												className: "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
											}), openDropdown === course.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 min-w-[160px]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => handleAction("edit", course),
														className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-4 w-4" }), " Edit"]
													}),
													course.is_featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => handleAction("unfeature", course),
														className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 text-yellow-500" }), " Unfeature"]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => handleAction("feature", course),
														className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4" }), " Feature"]
													}),
													(course.status === "pending" || course.status === "in_review") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => handleAction("approve", course),
														className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Approve"]
													}),
													course.status === "draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => handleAction("publish", course),
														className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Publish"]
													}),
													course.status !== "archived" && course.status !== "published" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => handleAction("archive", course),
														className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "h-4 w-4" }), " Archive"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-gray-200 dark:border-gray-700 my-1" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => handleAction("delete", course),
														className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete"]
													})
												]
											})]
										})
									})
								]
							}, course.id);
						}) })]
					})
				}), searchedCourses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
						children: [
							"Showing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-gray-700 dark:text-gray-300",
								children: searchedCourses.length
							}),
							" of",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-gray-700 dark:text-gray-300",
								children: courses.length
							}),
							" courses"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-green-500" }), "Published"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-yellow-500" }), "Draft"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-orange-500" }), "Pending"]
							})
						]
					})]
				})]
			}),
			(modal === "add" || modal === "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: modal === "add" ? "Create New Course" : "Edit Course",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: ["Course Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.title,
							onChange: handleChange("title"),
							placeholder: "e.g. Networking Essentials",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Slug (URL)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.slug,
							onChange: handleChange("slug"),
							placeholder: "auto-generated from title",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Subtitle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.subtitle,
							onChange: handleChange("subtitle"),
							placeholder: "Short description",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.description,
							onChange: handleChange("description"),
							rows: 3,
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "Level"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: form.level,
									onChange: handleChange("level"),
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
									children: [
										"beginner",
										"intermediate",
										"advanced"
									].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: l,
										children: l.charAt(0).toUpperCase() + l.slice(1)
									}, l))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: form.status,
									onChange: handleChange("status"),
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
									children: [
										"draft",
										"published",
										"archived",
										"pending"
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s.charAt(0).toUpperCase() + s.slice(1)
									}, s))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "Pricing"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: form.pricing,
									onChange: handleChange("pricing"),
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
									children: [
										"free",
										"paid",
										"subscription"
									].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p,
										children: p.charAt(0).toUpperCase() + p.slice(1)
									}, p))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "Price (UGX)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: form.price,
									onChange: handleChange("price"),
									placeholder: "0",
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.category || "",
							onChange: handleChange("category"),
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "— No category —"
							}), cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: form.has_certificate,
								onChange: handleChange("has_certificate"),
								className: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							}), "Issue certificate on completion"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: saveCourse,
								disabled: saving,
								className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
								children: saving ? "Saving..." : modal === "add" ? "Create Course" : "Save Changes"
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
export { AdminCourses as component };

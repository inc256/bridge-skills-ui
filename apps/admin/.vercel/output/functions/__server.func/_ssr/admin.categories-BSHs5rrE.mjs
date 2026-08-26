import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-C-LJEmCZ.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { C as Plus, T as Pen, a as Users, b as Search, bt as BookOpen, ct as CircleCheckBig, d as TrendingUp, f as Trash2, n as X, p as Tag } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.categories-BSHs5rrE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getCategories() {
	try {
		const data = await apiRequest("/courses/categories/");
		return Array.isArray(data) ? data : data?.results || [];
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
}
async function createCategory(data) {
	return apiRequest("/courses/categories/", {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function updateCategory(id, data) {
	return apiRequest(`/courses/categories/${id}/`, {
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
function CategoryCard({ category, onEdit, onDelete }) {
	const courseCount = category.course_count || category.total_courses || 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 dark:bg-blue-900/20 text-2xl",
				children: {
					"Networking": "🌐",
					"Cybersecurity": "🔒",
					"Software Engineering": "💻",
					"Artificial Intelligence": "🤖",
					"Cloud Computing": "☁️",
					"Design": "🎨",
					"Data Science": "📊",
					"Machine Learning": "🧠",
					"Web Development": "🌐",
					"Mobile Development": "📱",
					"Blockchain": "⛓️",
					"DevOps": "⚙️",
					"Database": "🗄️",
					"UI/UX": "🎯"
				}[category.name] || "📚"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold truncate text-gray-900 dark:text-white",
							children: category.name
						}), category.is_featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
							children: "★ Featured"
						})]
					}),
					category.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2",
						children: category.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5 mt-2",
						children: [
							category.is_active !== false && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-0.5 text-[8px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 h-1 rounded-full bg-green-500" }), "Active"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-0.5 text-[8px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-2.5 w-2.5" }),
									courseCount,
									" ",
									courseCount === 1 ? "course" : "courses"
								]
							}),
							category.students && category.students > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-0.5 text-[8px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-2.5 w-2.5" }), category.students]
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-700",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onEdit(category),
				className: "flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden xs:inline",
					children: "Edit"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onDelete(category),
				className: "flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden xs:inline",
					children: "Delete"
				})]
			})]
		})]
	});
}
function AdminCategories() {
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [modal, setModal] = (0, import_react.useState)(null);
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		description: "",
		is_featured: false,
		is_active: true
	});
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 3500);
	};
	const loadCategories = (0, import_react.useCallback)(async () => {
		setBusy(true);
		setError(null);
		try {
			const results = await getCategories();
			setCategories(results || []);
		} catch (err) {
			console.error("Failed to load categories:", err);
			setError(err.message || "Failed to load categories");
			showToast("Failed to load categories", false);
		} finally {
			setBusy(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		loadCategories();
	}, [loadCategories]);
	const openAddModal = () => {
		setForm({
			name: "",
			description: "",
			is_featured: false,
			is_active: true
		});
		setEditingCategory(null);
		setModal("add");
	};
	const openEditModal = (category) => {
		setEditingCategory(category);
		setForm({
			name: category.name,
			description: category.description || "",
			is_featured: category.is_featured || false,
			is_active: category.is_active !== void 0 ? category.is_active : true
		});
		setModal("edit");
	};
	const saveCategory = async () => {
		if (!form.name?.trim()) {
			showToast("Category name is required", false);
			return;
		}
		setSaving(true);
		try {
			if (editingCategory) {
				await updateCategory(editingCategory.id, form);
				showToast("Category updated successfully!");
			} else {
				await createCategory(form);
				showToast("Category created successfully!");
			}
			setModal(null);
			loadCategories();
		} catch (err) {
			showToast(err.message || "Failed to save category", false);
		} finally {
			setSaving(false);
		}
	};
	const deleteCategory = async (category) => {
		if (!window.confirm(`Delete category "${category.name}"? This may affect courses.`)) return;
		try {
			await deleteCategory(category.id);
			showToast("Category deleted successfully!");
			loadCategories();
		} catch (err) {
			showToast(err.message || "Failed to delete category", false);
		}
	};
	const handleChange = (key) => (e) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
	};
	const filteredCategories = categories.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()));
	const totalCategories = categories.length;
	const activeCategories = categories.filter((c) => c.is_active !== false).length;
	const featuredCategories = categories.filter((c) => c.is_featured).length;
	const totalCourses = categories.reduce((sum, c) => sum + (c.course_count || c.total_courses || 0), 0);
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white",
					children: "Categories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: [
						totalCategories,
						" categories · ",
						totalCourses,
						" total courses"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 sm:gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: openAddModal,
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm w-full xs:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Category" })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2 sm:gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Tag,
						value: totalCategories,
						label: "Total Categories",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleCheckBig,
						value: activeCategories,
						label: "Active",
						color: "green",
						iconColor: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: TrendingUp,
						value: featuredCategories,
						label: "Featured",
						color: "purple",
						iconColor: "purple"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search categories by name or description...",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							className: "w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						}),
						searchTerm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearchTerm(""),
							className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
						})
					]
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 sm:p-4 text-sm text-red-700 dark:text-red-400",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Error:" }),
					" ",
					error
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
				children: filteredCategories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-full text-center py-8 sm:py-12",
					children: searchTerm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500 dark:text-gray-400",
							children: "No categories match your search"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
							children: "Try a different search term"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500 dark:text-gray-400",
							children: "No categories found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
							children: "Click \"Add Category\" to create your first one"
						})
					] })
				}) : filteredCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
					category,
					onEdit: openEditModal,
					onDelete: deleteCategory
				}, category.id))
			}),
			(modal === "add" || modal === "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: modal === "add" ? "Add Category" : "Edit Category",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: ["Category Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.name || "",
							onChange: handleChange("name"),
							placeholder: "e.g. Cloud Computing",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.description || "",
							onChange: handleChange("description"),
							rows: 3,
							placeholder: "Brief description of the category...",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.is_featured || false,
									onChange: handleChange("is_featured"),
									className: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								}), "Featured Category"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.is_active !== false,
									onChange: handleChange("is_active"),
									className: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								}), "Active"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: saveCategory,
								disabled: saving,
								className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
								children: saving ? "Saving..." : modal === "edit" ? "Update Category" : "Add Category"
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
export { AdminCategories as component };

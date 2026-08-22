import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-CG9AIe4t.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { K as FileText, L as Layers, S as Plus, W as Gift, d as Trash2, n as X, ot as CircleQuestionMark, r as Video, rt as CloudUpload, st as CircleCheckBig, w as Pen, x as RefreshCw, y as Search, yt as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.lessons-D7cctaL8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getCourses() {
	try {
		return (await apiRequest("/courses/"))?.results || [];
	} catch (error) {
		console.error("Error fetching courses:", error);
		return [];
	}
}
async function getLessonsForCourse(courseSlug) {
	try {
		const data = await apiRequest(`/lessons/admin/course/${courseSlug}/`);
		return data?.results || data || [];
	} catch (error) {
		console.error("Error fetching lessons:", error);
		return [];
	}
}
async function createLesson(courseSlug, data) {
	return apiRequest(`/lessons/admin/course/${courseSlug}/`, {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function updateLesson(lessonId, data) {
	return apiRequest(`/lessons/admin/${lessonId}/`, {
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
var TYPE_ICONS = {
	video: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
	text: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
	quiz: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
	assignment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
};
var TYPE_COLORS = {
	video: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
	text: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
	quiz: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
	assignment: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
};
var BLANK = {
	title: "",
	type: "video",
	video_url: "",
	video_source: "youtube",
	description: "",
	content: "",
	xp_reward: 10,
	is_free: false,
	is_published: true,
	lesson_order: "",
	duration: 0
};
function AdminLessons() {
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [selCourse, setSelCourse] = (0, import_react.useState)(null);
	const [lessons, setLessons] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [modal, setModal] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(BLANK);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [loadingCourses, setLoadingCourses] = (0, import_react.useState)(true);
	const [courseSearch, setCourseSearch] = (0, import_react.useState)("");
	const [showCourseDropdown, setShowCourseDropdown] = (0, import_react.useState)(false);
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 3500);
	};
	(0, import_react.useEffect)(() => {
		setLoadingCourses(true);
		getCourses().then((results) => {
			setCourses(results);
			if (results.length > 0) {
				setSelCourse(results[0]);
				loadLessons(results[0]);
			}
		}).catch((err) => {
			console.error("Failed to load courses:", err);
			showToast("Failed to load courses. Please check your authentication.", false);
		}).finally(() => setLoadingCourses(false));
	}, []);
	const loadLessons = (0, import_react.useCallback)(async (course) => {
		if (!course) return;
		setBusy(true);
		try {
			const results = await getLessonsForCourse(course.slug);
			setLessons(results);
		} catch (error) {
			console.error("Error loading lessons:", error);
			showToast(error.message || "Failed to load lessons", false);
		} finally {
			setBusy(false);
		}
	}, []);
	const pickCourse = (course) => {
		setSelCourse(course);
		loadLessons(course);
		setSearchTerm("");
		setCourseSearch("");
		setShowCourseDropdown(false);
	};
	const openAdd = () => {
		setForm(BLANK);
		setEditId(null);
		setModal("form");
	};
	const openEdit = (lesson) => {
		setForm({
			title: lesson.title,
			type: lesson.type,
			video_url: lesson.video_url || "",
			video_source: lesson.video_source || "youtube",
			description: lesson.description || "",
			content: lesson.content || "",
			xp_reward: lesson.xp_reward,
			is_free: lesson.is_free,
			is_published: lesson.is_published,
			lesson_order: lesson.lesson_order?.toString() || "",
			duration: lesson.duration
		});
		setEditId(lesson.id);
		setModal("form");
	};
	const saveLesson = async () => {
		if (!form.title.trim()) {
			showToast("Title required", false);
			return;
		}
		if (!selCourse) {
			showToast("Please select a course first", false);
			return;
		}
		setSaving(true);
		try {
			const body = {
				...form,
				xp_reward: parseInt(form.xp_reward) || 10,
				duration: parseInt(form.duration) || 0,
				lesson_order: form.lesson_order ? parseInt(form.lesson_order) : void 0
			};
			if (editId) {
				await updateLesson(editId, body);
				showToast("Lesson updated successfully!");
			} else {
				await createLesson(selCourse.slug, body);
				showToast("Lesson created successfully!");
			}
			setModal(null);
			loadLessons(selCourse);
		} catch (ex) {
			showToast(ex.message || "Failed to save lesson", false);
		} finally {
			setSaving(false);
		}
	};
	const deleteLesson = async (lesson) => {
		if (!window.confirm(`Delete "${lesson.title}"?`)) return;
		try {
			await deleteLesson(lesson.id);
			showToast("Lesson deleted successfully!");
			if (selCourse) loadLessons(selCourse);
		} catch (error) {
			showToast(error.message || "Failed to delete lesson", false);
		}
	};
	const handleChange = (key) => (e) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setForm((p) => ({
			...p,
			[key]: value
		}));
	};
	const formatDuration = (seconds) => {
		if (!seconds) return "—";
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${String(secs).padStart(2, "0")}`;
	};
	const filteredLessons = lessons.filter((l) => l.title.toLowerCase().includes(searchTerm.toLowerCase()) || l.type.toLowerCase().includes(searchTerm.toLowerCase()));
	const filteredCourses = courses.filter((c) => c.title.toLowerCase().includes(courseSearch.toLowerCase()));
	const totalLessons = lessons.length;
	const publishedLessons = lessons.filter((l) => l.is_published).length;
	const freeLessons = lessons.filter((l) => l.is_free).length;
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
					children: "Lessons"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: "Manage lessons for your courses"
				})] }), selCourse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openAdd,
					className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm w-full xs:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Lesson" })]
				})]
			}),
			selCourse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2 sm:gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Layers,
						value: totalLessons,
						label: "Total Lessons",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleCheckBig,
						value: publishedLessons,
						label: "Published",
						color: "green",
						iconColor: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Gift,
						value: freeLessons,
						label: "Free Lessons",
						color: "purple",
						iconColor: "purple"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4 text-blue-600 dark:text-blue-400" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-gray-700 dark:text-gray-300",
									children: "Select Course"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full",
									children: [courses.length, " available"]
								})
							]
						}), selCourse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-gray-400 dark:text-gray-500",
							children: [lessons.length, " lessons in selected course"]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 sm:p-4",
					children: loadingCourses ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center py-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-6 w-6 border-2 border-gray-200 dark:border-gray-700 border-t-blue-600" })
					}) : courses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-8 w-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500 dark:text-gray-400",
								children: "No courses available"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
								children: "Create a course first to manage lessons"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mb-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Search courses...",
									value: courseSearch,
									onChange: (e) => {
										setCourseSearch(e.target.value);
										setShowCourseDropdown(true);
									},
									onFocus: () => setShowCourseDropdown(true),
									className: "w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								}),
								courseSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCourseSearch(""),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-[200px] overflow-y-auto custom-scrollbar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2",
								children: filteredCourses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-full text-center py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500 dark:text-gray-400",
										children: "No courses match your search"
									})
								}) : filteredCourses.map((course) => {
									const isSelected = selCourse?.id === course.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => pickCourse(course),
										className: `
                            group relative p-3 rounded-xl text-left transition-all duration-200
                            ${isSelected ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 dark:border-blue-400 shadow-sm" : "bg-gray-50 dark:bg-gray-700/30 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-sm"}
                          `,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `
                                text-sm font-medium truncate
                                ${isSelected ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"}
                              `,
													children: course.title
												}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-blue-600 dark:text-blue-400 mt-0.5",
													children: [lessons.length, " lessons"]
												})]
											}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3 w-3 text-white" })
												})
											})]
										}), !isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-r from-blue-500/5 to-transparent" })]
									}, course.id);
								})
							})
						}),
						filteredCourses.length < courses.length && courseSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-xs text-gray-400 dark:text-gray-500",
							children: [
								"Showing ",
								filteredCourses.length,
								" of ",
								courses.length,
								" courses"
							]
						})
					] })
				})]
			}),
			selCourse ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-white",
								children: selCourse.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full",
								children: [lessons.length, " lessons"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1 sm:flex-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Search lessons...",
									value: searchTerm,
									onChange: (e) => setSearchTerm(e.target.value),
									className: "w-full sm:w-40 md:w-48 pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => selCourse && loadLessons(selCourse),
								className: "p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400",
								title: "Refresh",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4 w-4 ${busy ? "animate-spin" : ""}` })
							})]
						})]
					}),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center py-10 sm:py-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
					}) : filteredLessons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-10 sm:py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500 dark:text-gray-400",
								children: searchTerm ? "No lessons match your search" : "No lessons yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
								children: searchTerm ? "Try a different search term" : "Click \"Add Lesson\" to create the first one"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-gray-100 dark:divide-gray-700",
						children: filteredLessons.map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-gray-400 dark:text-gray-500 min-w-[24px] sm:min-w-[28px] text-center",
										children: lesson.lesson_order || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `p-1.5 sm:p-2 rounded-lg ${TYPE_COLORS[lesson.type] || TYPE_COLORS.video}`,
										children: TYPE_ICONS[lesson.type] || TYPE_ICONS.video
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-1.5 sm:gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-semibold text-gray-900 dark:text-white truncate",
												children: lesson.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap gap-1",
												children: [lesson.is_free && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] sm:text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded",
													children: "FREE"
												}), !lesson.is_published && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] sm:text-[10px] font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded",
													children: "DRAFT"
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "capitalize",
													children: lesson.type
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden xs:inline",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden xs:inline",
													children: formatDuration(lesson.duration)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden xs:inline",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "hidden xs:inline",
													children: [lesson.xp_reward, " XP"]
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-0.5 sm:gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => openEdit(lesson),
											className: "p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400",
											title: "Edit",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => deleteLesson(lesson),
											className: "p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400",
											title: "Delete",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
										})]
									})
								]
							})
						}, lesson.id))
					}),
					!busy && filteredLessons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
							children: [
								"Showing ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: filteredLessons.length
								}),
								" of ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: lessons.length
								}),
								" lessons"
							]
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-12 w-12 sm:h-16 sm:w-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-medium text-gray-700 dark:text-gray-300",
						children: "Select a course to manage lessons"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gray-500 dark:text-gray-400 mt-1",
						children: "Choose a course from the list above to view and manage its lessons"
					})
				]
			}),
			modal === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: editId ? "Edit Lesson" : "New Lesson",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: ["Lesson Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.title,
							onChange: handleChange("title"),
							placeholder: "e.g. Introduction to Networking",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: "Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.type,
								onChange: handleChange("type"),
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "video",
										children: "Video"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "text",
										children: "Text"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "quiz",
										children: "Quiz"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "assignment",
										children: "Assignment"
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: "Video Source"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.video_source,
								onChange: handleChange("video_source"),
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "youtube",
										children: "YouTube"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "vimeo",
										children: "Vimeo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "upload",
										children: "Upload"
									})
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Video URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.video_url,
							onChange: handleChange("video_url"),
							placeholder: "https://youtu.be/...",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.description,
							onChange: handleChange("description"),
							rows: 2,
							placeholder: "Brief description of the lesson...",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
						})] }),
						form.type === "text" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Content (HTML)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.content,
							onChange: handleChange("content"),
							rows: 4,
							placeholder: "<p>Write your lesson content here...</p>",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "Order"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: form.lesson_order,
									onChange: handleChange("lesson_order"),
									placeholder: "auto",
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "Duration (sec)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: form.duration,
									onChange: handleChange("duration"),
									placeholder: "0",
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "XP Reward"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: form.xp_reward,
									onChange: handleChange("xp_reward"),
									placeholder: "10",
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.is_free,
									onChange: handleChange("is_free"),
									className: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								}), "Free preview"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.is_published,
									onChange: handleChange("is_published"),
									className: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								}), "Published"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: saveLesson,
								disabled: saving,
								className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
								children: saving ? "Saving..." : editId ? "Update Lesson" : "Create Lesson"
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

        /* Custom scrollbar for course selector */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      ` })
		]
	});
}
//#endregion
export { AdminLessons as component };

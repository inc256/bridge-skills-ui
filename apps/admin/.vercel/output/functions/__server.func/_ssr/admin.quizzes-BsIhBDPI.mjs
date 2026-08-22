import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-CQnbhjJo.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { L as Layers, S as Plus, St as Award, d as Trash2, i as Users, it as Clock, mt as ChartColumn, n as X, ot as CircleQuestionMark, st as CircleCheckBig, w as Pen, y as Search, yt as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.quizzes-BsIhBDPI.js
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
async function getQuizzesByCourse(courseSlug) {
	try {
		const data = await apiRequest(`/quizzes/course/${courseSlug}/`);
		return data?.results || data || [];
	} catch (error) {
		console.error("Error fetching quizzes:", error);
		return [];
	}
}
async function createQuiz(courseSlug, data) {
	return apiRequest(`/quizzes/course/${courseSlug}/`, {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function updateQuiz(quizId, data) {
	return apiRequest(`/quizzes/${quizId}/`, {
		method: "PATCH",
		body: JSON.stringify(data)
	});
}
async function getQuestions(quizId) {
	try {
		const data = await apiRequest(`/quizzes/${quizId}/questions/`);
		return data?.results || data || [];
	} catch (error) {
		console.error("Error fetching questions:", error);
		return [];
	}
}
async function createQuestion(quizId, data) {
	return apiRequest(`/quizzes/${quizId}/questions/`, {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function createAnswer(questionId, data) {
	return apiRequest(`/quizzes/questions/${questionId}/answers/`, {
		method: "POST",
		body: JSON.stringify(data)
	});
}
function Modal({ title, onClose, children, wide = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 mt-auto sm:mt-0 ${wide ? "max-w-4xl" : "max-w-2xl"}`,
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
function QuizCard({ quiz, onEdit, onDelete, onManageQuestions }) {
	const isActive = quiz.is_active;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-800",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3 sm:gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2 sm:p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-5 w-5 sm:h-6 sm:w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-1.5 sm:gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate",
								children: quiz.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] sm:text-[10px] font-medium ${isActive ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-gray-400"}` }), isActive ? "Active" : "Inactive"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-1",
							children: quiz.description || "No description"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3 w-3" }),
										"Pass: ",
										quiz.pass_score,
										"%"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
										"Max ",
										quiz.max_attempts,
										" attempts"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-3 w-3" }),
										quiz.question_count || 0,
										" questions"
									]
								}),
								quiz.time_limit > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
										quiz.time_limit,
										" min"
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 sm:gap-2 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onManageQuestions(quiz),
							className: "px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap",
							children: "Questions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onEdit(quiz),
							className: "p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400",
							title: "Edit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onDelete(quiz),
							className: "p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400",
							title: "Delete",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
						})
					]
				})
			]
		})
	});
}
function QuestionList({ questions, onDelete }) {
	if (questions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500 dark:text-gray-400",
				children: "No questions yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-gray-400 dark:text-gray-500",
				children: "Add your first question below"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: questions.map((qn, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3 sm:p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-bold text-gray-400 dark:text-gray-500 min-w-[24px] mt-0.5",
						children: ["#", index + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-gray-900 dark:text-white",
										children: qn.text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded",
										children: qn.qtype
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded",
										children: [qn.points, " pts"]
									})
								]
							}),
							qn.answers && qn.answers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 space-y-1",
								children: qn.answers.map((answer, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs",
									children: [answer.is_correct ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5 text-green-600 dark:text-green-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-3.5 w-3.5 rounded-full border-2 border-gray-300 dark:border-gray-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: answer.is_correct ? "text-green-700 dark:text-green-400 font-medium" : "text-gray-600 dark:text-gray-400",
										children: answer.text
									})]
								}, answer.id || i))
							}),
							qn.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-gray-400 dark:text-gray-500",
								children: ["💡 Hint: ", qn.hint]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onDelete(qn),
						className: "shrink-0 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
					})
				]
			})
		}, qn.id))
	});
}
function AdminQuizzes() {
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [selCourse, setSelCourse] = (0, import_react.useState)(null);
	const [quizzes, setQuizzes] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [modal, setModal] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		description: "",
		pass_score: 70,
		time_limit: 0,
		max_attempts: 3,
		shuffle_questions: false,
		show_answers: true,
		is_active: true
	});
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [selQuiz, setSelQuiz] = (0, import_react.useState)(null);
	const [questions, setQuestions] = (0, import_react.useState)([]);
	const [qForm, setQForm] = (0, import_react.useState)({
		qtype: "mcq_single",
		text: "",
		explanation: "",
		hint: "",
		points: 1,
		order: 1
	});
	const [answers, setAnswers] = (0, import_react.useState)([
		{
			text: "",
			is_correct: false
		},
		{
			text: "",
			is_correct: false
		},
		{
			text: "",
			is_correct: true
		},
		{
			text: "",
			is_correct: false
		}
	]);
	const [qSaving, setQSaving] = (0, import_react.useState)(false);
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
				loadQuizzes(results[0]);
			}
		}).catch(() => showToast("Failed to load courses", false)).finally(() => setLoadingCourses(false));
	}, []);
	const loadQuizzes = (0, import_react.useCallback)(async (course) => {
		if (!course) return;
		setBusy(true);
		try {
			const results = await getQuizzesByCourse(course.slug);
			setQuizzes(results);
		} catch (error) {
			showToast(error.message || "Failed to load quizzes", false);
		} finally {
			setBusy(false);
		}
	}, []);
	const pickCourse = (course) => {
		setSelCourse(course);
		loadQuizzes(course);
		setCourseSearch("");
		setShowCourseDropdown(false);
	};
	const openAdd = () => {
		setForm({
			title: "",
			description: "",
			pass_score: 70,
			time_limit: 0,
			max_attempts: 3,
			shuffle_questions: false,
			show_answers: true,
			is_active: true
		});
		setEditId(null);
		setModal("quiz");
	};
	const openEdit = (quiz) => {
		setForm({
			title: quiz.title || "",
			description: quiz.description || "",
			pass_score: quiz.pass_score || 70,
			time_limit: quiz.time_limit || 0,
			max_attempts: quiz.max_attempts || 3,
			shuffle_questions: quiz.shuffle_questions || false,
			show_answers: quiz.show_answers !== void 0 ? quiz.show_answers : true,
			is_active: quiz.is_active !== void 0 ? quiz.is_active : true
		});
		setEditId(quiz.id);
		setModal("quiz");
	};
	const saveQuiz = async () => {
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
			if (editId) {
				await updateQuiz(editId, form);
				showToast("Quiz updated successfully!");
			} else {
				await createQuiz(selCourse.slug, form);
				showToast("Quiz created successfully!");
			}
			setModal(null);
			loadQuizzes(selCourse);
		} catch (ex) {
			showToast(ex.message || "Failed to save quiz", false);
		} finally {
			setSaving(false);
		}
	};
	const deleteQuiz = async (quiz) => {
		if (!window.confirm(`Delete quiz "${quiz.title}"?`)) return;
		try {
			await deleteQuiz(quiz.id);
			showToast("Quiz deleted successfully!");
			if (selCourse) loadQuizzes(selCourse);
		} catch (error) {
			showToast(error.message || "Failed to delete quiz", false);
		}
	};
	const openQuestions = async (quiz) => {
		setSelQuiz(quiz);
		try {
			const results = await getQuestions(quiz.id);
			setQuestions(results);
		} catch {
			setQuestions([]);
		}
		setModal("questions");
	};
	const addQuestion = async () => {
		if (!qForm.text.trim()) {
			showToast("Question text required", false);
			return;
		}
		if (!selQuiz) {
			showToast("No quiz selected", false);
			return;
		}
		setQSaving(true);
		try {
			const response = await createQuestion(selQuiz.id, { ...qForm });
			const qid = response.data?.id || response.id;
			if ([
				"mcq_single",
				"mcq_multi",
				"true_false"
			].includes(qForm.qtype)) for (const ans of answers.filter((a) => a.text.trim())) await createAnswer(qid, ans);
			showToast("Question added successfully!");
			const results = await getQuestions(selQuiz.id);
			setQuestions(results);
			setQForm({
				qtype: "mcq_single",
				text: "",
				explanation: "",
				hint: "",
				points: 1,
				order: questions.length + 1
			});
			setAnswers([
				{
					text: "",
					is_correct: false
				},
				{
					text: "",
					is_correct: false
				},
				{
					text: "",
					is_correct: true
				},
				{
					text: "",
					is_correct: false
				}
			]);
		} catch (ex) {
			showToast(ex.message || "Failed to add question", false);
		} finally {
			setQSaving(false);
		}
	};
	const deleteQuestion = async (question) => {
		if (!selQuiz) return;
		try {
			await deleteQuestion(selQuiz.id, question.id);
			showToast("Question deleted!");
			const results = await getQuestions(selQuiz.id);
			setQuestions(results);
		} catch (error) {
			showToast(error.message || "Failed to delete question", false);
		}
	};
	const handleChange = (key) => (e) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setForm((p) => ({
			...p,
			[key]: value
		}));
	};
	const handleQChange = (key) => (e) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setQForm((p) => ({
			...p,
			[key]: value
		}));
	};
	const updateAnswer = (index, key, value) => {
		setAnswers((prev) => {
			const newAnswers = [...prev];
			newAnswers[index] = {
				...newAnswers[index],
				[key]: value
			};
			return newAnswers;
		});
	};
	const totalQuizzes = quizzes.length;
	const activeQuizzes = quizzes.filter((q) => q.is_active).length;
	const totalQuestions = quizzes.reduce((sum, q) => sum + (q.question_count || 0), 0);
	const filteredCourses = courses.filter((c) => c.title.toLowerCase().includes(courseSearch.toLowerCase()));
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
					children: "Quizzes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: "Create and manage quizzes for your courses"
				})] }), selCourse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openAdd,
					className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm w-full xs:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Quiz" })]
				})]
			}),
			selCourse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2 sm:gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Layers,
						value: totalQuizzes,
						label: "Total Quizzes",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleCheckBig,
						value: activeQuizzes,
						label: "Active",
						color: "green",
						iconColor: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: ChartColumn,
						value: totalQuestions,
						label: "Total Questions",
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
							children: [quizzes.length, " quizzes in selected course"]
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
								children: "Create a course first to manage quizzes"
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
													children: [quizzes.length, " quizzes"]
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
			selCourse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
				}) : quizzes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-medium text-gray-700 dark:text-gray-300",
							children: "No quizzes yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500 dark:text-gray-400 mt-1",
							children: "Click \"Add Quiz\" to create your first quiz"
						})
					]
				}) : quizzes.map((quiz) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizCard, {
					quiz,
					onEdit: openEdit,
					onDelete: deleteQuiz,
					onManageQuestions: openQuestions
				}, quiz.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-12 w-12 sm:h-16 sm:w-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-medium text-gray-700 dark:text-gray-300",
						children: "Select a course to manage quizzes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gray-500 dark:text-gray-400 mt-1",
						children: "Choose a course from the list above to view and manage its quizzes"
					})
				]
			}),
			modal === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: editId ? "Edit Quiz" : "New Quiz",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: ["Quiz Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.title,
							onChange: handleChange("title"),
							placeholder: "e.g. CCNA Exam Prep Quiz",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.description,
							onChange: handleChange("description"),
							rows: 2,
							placeholder: "Brief description of the quiz...",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "Pass Score (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: form.pass_score,
									onChange: handleChange("pass_score"),
									placeholder: "70",
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "Time Limit (min)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: form.time_limit,
									onChange: handleChange("time_limit"),
									placeholder: "0=unlimited",
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "Max Attempts"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: form.max_attempts,
									onChange: handleChange("max_attempts"),
									placeholder: "3",
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-4",
							children: [
								["shuffle_questions", "Shuffle questions"],
								["show_answers", "Show answers after"],
								["is_active", "Active"]
							].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!form[key],
									onChange: handleChange(key),
									className: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								}), label]
							}, key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: saveQuiz,
								disabled: saving,
								className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
								children: saving ? "Saving..." : editId ? "Update Quiz" : "Create Quiz"
							})]
						})
					]
				})
			}),
			modal === "questions" && selQuiz && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: `Questions — ${selQuiz.title}`,
				onClose: () => setModal(null),
				wide: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-bold text-gray-900 dark:text-white",
							children: [
								"Current Questions (",
								questions.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-gray-400 dark:text-gray-500",
							children: [questions.filter((q) => q.answers?.some((a) => a.is_correct)).length, " have correct answers"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionList, {
						questions,
						onDelete: deleteQuestion
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-gray-200 dark:border-gray-700 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-gray-900 dark:text-white mb-3",
							children: "Add New Question"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
											children: "Question Type"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: qForm.qtype,
											onChange: handleQChange("qtype"),
											className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
											children: [
												"mcq_single",
												"mcq_multi",
												"true_false",
												"fill_blank",
												"short"
											].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: t,
												children: t.replace("_", " ").toUpperCase()
											}, t))
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
											children: "Points"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											value: qForm.points,
											onChange: handleQChange("points"),
											placeholder: "1",
											className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
											children: "Order"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											value: qForm.order,
											onChange: handleQChange("order"),
											placeholder: "1",
											className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: ["Question Text ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-500",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: qForm.text,
									onChange: handleQChange("text"),
									rows: 2,
									placeholder: "What does OSI stand for?",
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
									children: "Hint (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: qForm.hint,
									onChange: handleQChange("hint"),
									placeholder: "Think about networking layers...",
									className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								})] }),
								[
									"mcq_single",
									"mcq_multi",
									"true_false"
								].includes(qForm.qtype) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",
									children: [
										"Answer choices (tick the correct one",
										qForm.qtype === "mcq_multi" ? "s" : "",
										"):"
									]
								}), answers.map((answer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: qForm.qtype === "mcq_multi" ? "checkbox" : "radio",
										name: "correct",
										checked: answer.is_correct,
										onChange: (e) => {
											if (qForm.qtype !== "mcq_multi") setAnswers((prev) => prev.map((a, i) => ({
												...a,
												is_correct: i === index
											})));
											else updateAnswer(index, "is_correct", e.target.checked);
										},
										className: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: answer.text,
										onChange: (e) => updateAnswer(index, "text", e.target.value),
										placeholder: `Option ${index + 1}`,
										className: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									})]
								}, index))] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: addQuestion,
										disabled: qSaving,
										className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${qSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
										children: qSaving ? "Adding..." : "Add Question"
									})
								})
							]
						})]
					})]
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
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

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
export { AdminQuizzes as component };

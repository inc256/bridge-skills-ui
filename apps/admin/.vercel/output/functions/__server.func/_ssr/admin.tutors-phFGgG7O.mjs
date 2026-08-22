import { r as __toESM } from "../_runtime.mjs";
import { c as getTutors } from "./api-CG9AIe4t.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { $ as DollarSign, C as Phone, J as Eye, M as Mail, St as Award, c as UserCheck, dt as ChevronDown, ft as Check, ht as Calendar, i as Users, it as Clock, lt as ChevronUp, n as X, p as Star, u as TrendingUp, x as RefreshCw, y as Search, yt as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tutors-phFGgG7O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function StatCard({ icon: Icon, value, label, color = "blue", subtext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 sm:gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2 sm:p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 sm:h-5 sm:w-5 text-${color}-600 dark:text-${color}-400` })
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
						className: "text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 hidden sm:block",
						children: subtext
					})
				]
			})]
		})
	});
}
function TutorCard({ tutor, onViewProfile, onApprove, onReject }) {
	const getStatusColor = (status) => {
		if (status === "Verified") return {
			bg: "bg-green-100 dark:bg-green-900/30",
			text: "text-green-700 dark:text-green-400",
			dot: "bg-green-500"
		};
		return {
			bg: "bg-yellow-100 dark:bg-yellow-900/30",
			text: "text-yellow-700 dark:text-yellow-400",
			dot: "bg-yellow-500"
		};
	};
	const getInitials = (name) => {
		if (!name) return "T";
		return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
	};
	const statusColors = getStatusColor(tutor.status);
	const initials = getInitials(tutor.name);
	const isPending = tutor.status === "Pending";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `
          w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0
          ${statusColors.bg} ${statusColors.text}
        `,
					children: initials
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-1.5 sm:gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate font-semibold text-sm sm:text-base text-gray-900 dark:text-white",
							children: tutor.name || "Unnamed Tutor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `shrink-0 inline-flex items-center gap-1 rounded-full px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-medium ${statusColors.bg} ${statusColors.text}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${statusColors.dot}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden xs:inline",
									children: tutor.status || "Pending"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "xs:hidden",
									children: tutor.status === "Verified" ? "✓" : "⏳"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate",
						children: tutor.specialty || "Instructor"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 sm:mt-4 grid grid-cols-3 gap-1.5 sm:gap-2 border-t border-gray-100 dark:border-gray-700 pt-3 sm:pt-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs sm:text-sm font-semibold text-gray-900 dark:text-white",
						children: tutor.courses || 0
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400",
						children: "Courses"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs sm:text-sm font-semibold text-gray-900 dark:text-white",
						children: (tutor.students ?? 0).toLocaleString()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400",
						children: "Students"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs sm:text-sm font-semibold text-gray-900 dark:text-white",
						children: tutor.rating ? `${tutor.rating}★` : "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400",
						children: "Rating"
					})] })
				]
			}),
			isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 sm:mt-4 flex gap-1.5 sm:gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onReject?.(tutor),
					className: "flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-red-200 dark:border-red-800 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3 sm:h-3.5 sm:w-3.5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden xs:inline",
							children: "Reject"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "xs:hidden",
							children: "✕"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onApprove?.(tutor),
					className: "flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-white transition-colors shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 sm:h-3.5 sm:w-3.5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden xs:inline",
							children: "Approve"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "xs:hidden",
							children: "✓"
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onViewProfile(tutor),
				className: "mt-3 sm:mt-4 w-full inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3 sm:h-3.5 sm:w-3.5" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden xs:inline",
						children: "View Profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "xs:hidden",
						children: "Profile"
					})
				]
			})
		]
	});
}
function AdminTutors() {
	const [tutors, setTutors] = (0, import_react.useState)([]);
	const [filteredTutors, setFilteredTutors] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [selectedTutor, setSelectedTutor] = (0, import_react.useState)(null);
	const [showProfileModal, setShowProfileModal] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [showMobileFilters, setShowMobileFilters] = (0, import_react.useState)(false);
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 3500);
	};
	const loadTutors = (0, import_react.useCallback)(() => {
		setBusy(true);
		getTutors().then((results) => {
			const enrichedTutors = results.map((t) => ({
				...t,
				email: t.email || `${t.name?.toLowerCase().replace(/\s/g, ".")}@techbridgeskills.ug` || "Not provided",
				expertise: t.expertise || t.specialty || "Network Engineer · CCNA · 8 yrs experience",
				experience: t.experience || "Not provided",
				joined: t.joined || "2026",
				revenue: t.revenue || "UGX 0",
				momo: t.momo || "—"
			}));
			setTutors(enrichedTutors);
			setTotal(enrichedTutors.length);
			applyFilters(enrichedTutors, search, filter);
		}).catch((err) => {
			console.error("Error loading tutors:", err);
			showToast("Failed to load tutors: " + err.message, false);
		}).finally(() => setBusy(false));
	}, []);
	const applyFilters = (data, searchTerm, filterType) => {
		let filtered = data || tutors || [];
		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter((t) => (t.name || "").toLowerCase().includes(term) || (t.specialty || "").toLowerCase().includes(term) || (t.email || "").toLowerCase().includes(term));
		}
		if (filterType === "pending") filtered = filtered.filter((t) => t.status === "Pending");
		else if (filterType === "verified") filtered = filtered.filter((t) => t.status === "Verified");
		setFilteredTutors(filtered);
	};
	(0, import_react.useEffect)(() => {
		loadTutors();
	}, [loadTutors]);
	(0, import_react.useEffect)(() => {
		applyFilters(tutors, search, filter);
	}, [
		search,
		filter,
		tutors
	]);
	const handleViewProfile = (tutor) => {
		setSelectedTutor(tutor);
		setShowProfileModal(true);
	};
	const handleApprove = (tutor) => {
		showToast(`✅ ${tutor.name} approved successfully!`);
		const updatedTutors = tutors.map((t) => t.id === tutor.id ? {
			...t,
			status: "Verified"
		} : t);
		setTutors(updatedTutors);
		applyFilters(updatedTutors, search, filter);
	};
	const handleReject = (tutor) => {
		showToast(`❌ ${tutor.name} rejected`, false);
		const updatedTutors = tutors.filter((t) => t.id !== tutor.id);
		setTutors(updatedTutors);
		applyFilters(updatedTutors, search, filter);
	};
	const stats = {
		total,
		pending: tutors.filter((t) => t.status === "Pending").length,
		verified: tutors.filter((t) => t.status === "Verified").length
	};
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
					children: "Tutors"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: [
						total,
						" tutors · ",
						stats.pending,
						" pending"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: loadTutors,
					className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full xs:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refresh" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2 sm:gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						value: stats.total,
						label: "Total",
						color: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Clock,
						value: stats.pending,
						label: "Pending",
						color: "yellow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: UserCheck,
						value: stats.verified,
						label: "Verified",
						color: "green"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 sm:space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search tutors...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 sm:py-2.5 pl-9 pr-3 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowMobileFilters(!showMobileFilters),
						className: "flex items-center justify-between w-full sm:hidden px-3 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Filter: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium capitalize",
							children: filter
						})] }), showMobileFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 16 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `${showMobileFilters ? "flex" : "hidden"} sm:flex gap-1.5 sm:gap-2 flex-wrap`,
						children: [
							"all",
							"pending",
							"verified"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setFilter(f);
								setShowMobileFilters(false);
							},
							className: `flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs md:text-sm font-medium transition-colors ${filter === f ? "bg-blue-600 text-white dark:bg-blue-500 shadow-sm" : "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
							children: f.charAt(0).toUpperCase() + f.slice(1)
						}, f))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
				children: filteredTutors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-full text-center py-8 sm:py-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-2 sm:mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500 dark:text-gray-400",
							children: "No tutors found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
							children: "Try adjusting your search"
						})
					]
				}) : filteredTutors.map((tutor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorCard, {
					tutor,
					onViewProfile: handleViewProfile,
					onApprove: handleApprove,
					onReject: handleReject
				}, tutor.id))
			}),
			showProfileModal && selectedTutor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Tutor Profile",
				onClose: () => setShowProfileModal(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 sm:space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-base sm:text-xl font-bold text-blue-700 dark:text-blue-400",
								children: selectedTutor.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "T"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-1.5 sm:gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm sm:text-lg font-bold truncate text-gray-900 dark:text-white",
										children: selectedTutor.name || "Unnamed Tutor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `shrink-0 rounded-full px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-medium ${selectedTutor.status === "Verified" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"}`,
										children: selectedTutor.status || "Pending"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate",
									children: selectedTutor.specialty || "Instructor"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 sm:h-5 sm:w-5 text-blue-500 dark:text-blue-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate",
											children: selectedTutor.email || "Not provided"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4 sm:h-5 sm:w-5 text-purple-500 dark:text-purple-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
											children: "Expertise"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate",
											children: selectedTutor.expertise || selectedTutor.specialty || "Not specified"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 sm:h-5 sm:w-5 text-green-500 dark:text-green-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
											children: "Experience"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate",
											children: selectedTutor.experience || "Not provided"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 sm:h-5 sm:w-5 text-orange-500 dark:text-orange-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
											children: "Joined"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs sm:text-sm font-medium text-gray-900 dark:text-white",
											children: selectedTutor.joined || "Not available"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mx-auto mb-0.5 sm:mb-1" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-base sm:text-xl font-bold text-blue-600 dark:text-blue-400",
											children: (selectedTutor.students ?? 0).toLocaleString()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[8px] sm:text-xs text-gray-500 dark:text-gray-400",
											children: "Students"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400 mx-auto mb-0.5 sm:mb-1" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-base sm:text-xl font-bold text-yellow-600 dark:text-yellow-400",
											children: selectedTutor.rating ? `${selectedTutor.rating}★` : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[8px] sm:text-xs text-gray-500 dark:text-gray-400",
											children: "Rating"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 mx-auto mb-0.5 sm:mb-1" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-base sm:text-xl font-bold text-purple-600 dark:text-purple-400",
											children: selectedTutor.courses || 0
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[8px] sm:text-xs text-gray-500 dark:text-gray-400",
											children: "Courses"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400 mx-auto mb-0.5 sm:mb-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs sm:text-xl font-bold text-green-600 dark:text-green-400",
										children: selectedTutor.revenue || "UGX 0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[8px] sm:text-xs text-gray-500 dark:text-gray-400",
										children: "Revenue"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center p-2 sm:p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-0.5 sm:mb-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs sm:text-xl font-bold text-indigo-600 dark:text-indigo-400",
										children: selectedTutor.momo || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[8px] sm:text-xs text-gray-500 dark:text-gray-400",
										children: "MoMo"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowProfileModal(false),
								className: "w-full inline-flex items-center justify-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-colors shadow-sm",
								children: "Close Profile"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        /* Mobile responsive breakpoints */
        @media (max-width: 480px) {
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
        }
        
        @media (min-width: 481px) {
          .xs\\:inline { display: none; }
          .xs\\:hidden { display: inline; }
        }

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

        /* Better touch targets on mobile */
        @media (max-width: 640px) {
          button, 
          input,
          .touch-target {
            min-height: 44px;
          }
        }
      ` })
		]
	});
}
//#endregion
export { AdminTutors as component };

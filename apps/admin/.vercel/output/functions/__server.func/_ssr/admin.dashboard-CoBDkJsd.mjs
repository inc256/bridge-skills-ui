import { r as __toESM } from "../_runtime.mjs";
import { a as getCoursesWithPagination, c as getRecentUsers, r as getAnalyticsDailyActivity, s as getDashboardStats } from "./api-CQnbhjJo.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Dt as ArrowDownRight, H as GraduationCap, Q as Download, St as Award, i as Users, n as X, o as UserPlus, u as TrendingUp, wt as ArrowUpRight, yt as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dashboard-CoBDkJsd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getGreeting = () => {
	const hour = (/* @__PURE__ */ new Date()).getHours();
	if (hour < 12) return "morning";
	if (hour < 18) return "afternoon";
	return "evening";
};
var getInitials = (user) => {
	return (user.first_name?.[0] || user.full_name?.[0] || user.username?.[0] || "?").toUpperCase();
};
var getDisplayName = (user) => {
	return user.full_name || user.name || user.username || "User";
};
var getUserRole = (user) => {
	return user?.role || user?.user_type || user?.type || "student";
};
var getRoleDisplay = (role) => {
	return {
		admin: "Admin",
		instructor: "Instructor",
		tutor: "Instructor",
		student: "Student",
		learner: "Student"
	}[role?.toLowerCase()] || "Student";
};
var getRoleColor = (role) => {
	return {
		admin: "purple",
		instructor: "blue",
		tutor: "blue",
		student: "green",
		learner: "green"
	}[role?.toLowerCase()] || "green";
};
var getCoursePrice = (course) => {
	if (course?.pricing === "paid" || course?.is_paid === true || course?.price && Number(course.price) > 0 || course?.amount && Number(course.amount) > 0) {
		const price = Number(course?.price || course?.amount || 0);
		if (price > 0) return {
			display: `UGX ${price.toLocaleString()}`,
			color: "text-blue-600 dark:text-blue-400",
			isPaid: true
		};
	}
	return {
		display: "FREE",
		color: "text-green-600 dark:text-green-400",
		isPaid: false
	};
};
var formatDate = (dateStr) => {
	if (!dateStr) return "";
	try {
		return new Date(dateStr).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric"
		});
	} catch {
		return dateStr;
	}
};
var StatCard = ({ icon: Icon, value, label, subtitle, trend, color, onClick }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm transition-all duration-200 ${onClick ? `cursor-pointer hover:shadow-lg ${{
			blue: "hover:border-blue-300 dark:hover:border-blue-700",
			purple: "hover:border-purple-300 dark:hover:border-purple-700",
			green: "hover:border-green-300 dark:hover:border-green-700",
			orange: "hover:border-orange-300 dark:hover:border-orange-700",
			red: "hover:border-red-300 dark:hover:border-red-700",
			teal: "hover:border-teal-300 dark:hover:border-teal-700"
		}[color]} hover:scale-[1.02]` : "hover:shadow-md"}`,
		onClick,
		role: onClick ? "button" : void 0,
		tabIndex: onClick ? 0 : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2.5 rounded-xl ${{
					blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
					purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
					green: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
					orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
					red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
					teal: "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400"
				}[color]}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}), trend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `inline-flex items-center gap-0.5 text-xs font-semibold ${trend.direction === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`,
				children: [
					trend.direction === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "h-3 w-3" }),
					trend.value,
					"%"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-3xl font-bold tracking-tight text-gray-900 dark:text-white",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-medium text-gray-600 dark:text-gray-300",
					children: label
				}),
				subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-gray-400 dark:text-gray-500 mt-0.5",
					children: subtitle
				})
			]
		})]
	});
};
var MiniBar = ({ label, value, max, color, suffix = "" }) => {
	const percentage = max > 0 ? Math.min(100, Math.round(value / max * 100)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between text-sm mb-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-gray-600 dark:text-gray-300",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-semibold text-gray-900 dark:text-white",
			children: [value.toLocaleString(), suffix]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full transition-all duration-700 ease-out",
			style: {
				width: `${percentage}%`,
				backgroundColor: color
			}
		})
	})] });
};
var UserAvatar = ({ user, size = "md" }) => {
	const sizes = {
		sm: "w-8 h-8 text-xs",
		md: "w-9 h-9 text-sm",
		lg: "w-11 h-11 text-base"
	};
	const color = getRoleColor(getUserRole(user));
	const initials = getInitials(user);
	const colorClasses = {
		purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
		blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
		green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${sizes[size]} rounded-full flex items-center justify-center font-bold shrink-0 ${colorClasses[color] || colorClasses.green}`,
		children: initials
	});
};
var StatusBadge = ({ status }) => {
	const info = {
		published: {
			label: "Published",
			color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
		},
		draft: {
			label: "Draft",
			color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
		},
		active: {
			label: "Active",
			color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
		},
		pending: {
			label: "Pending",
			color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
		},
		archived: {
			label: "Archived",
			color: "bg-gray-100 dark:bg-gray-700/30 text-gray-600 dark:text-gray-400"
		},
		completed: {
			label: "Completed",
			color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
		}
	}[status?.toLowerCase()] || {
		label: status || "Unknown",
		color: "bg-gray-100 dark:bg-gray-700/30 text-gray-600 dark:text-gray-400"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `text-xs font-semibold px-2.5 py-1 rounded-full ${info.color}`,
		children: info.label
	});
};
var Modal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity",
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] pointer-events-auto transition-all duration-300 scale-100",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold text-gray-900 dark:text-white",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 sm:p-6 overflow-y-auto max-h-[calc(85vh-80px)]",
				children
			})]
		})
	})] });
};
function AdminDashboard() {
	const [stats, setStats] = (0, import_react.useState)(null);
	const [dailyActivity, setDailyActivity] = (0, import_react.useState)([]);
	const [recentUsers, setRecentUsers] = (0, import_react.useState)([]);
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [modalTitle, setModalTitle] = (0, import_react.useState)("");
	const [modalData, setModalData] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		Promise.allSettled([
			getDashboardStats(),
			getAnalyticsDailyActivity(),
			getRecentUsers(6),
			getCoursesWithPagination(5)
		]).then(([statsResult, dailyResult, usersResult, coursesResult]) => {
			if (statsResult.status === "fulfilled") setStats(statsResult.value);
			if (dailyResult.status === "fulfilled") {
				const dailyPayload = dailyResult.value;
				const data = Array.isArray(dailyPayload) ? dailyPayload : dailyPayload?.results || [];
				setDailyActivity(data.slice(0, 7).reverse());
			}
			if (usersResult.status === "fulfilled") setRecentUsers(usersResult.value?.results || []);
			if (coursesResult.status === "fulfilled") setCourses(coursesResult.value?.results || []);
		}).catch((error) => console.error("Error fetching dashboard data:", error)).finally(() => setIsLoading(false));
	}, []);
	const totalUsers = stats?.users?.total || 0;
	const totalLearners = stats?.users?.students || 0;
	const activeTutors = stats?.users?.instructors || 0;
	const admins = stats?.users?.admins || 0;
	const publishedCourses = stats?.courses?.published || 0;
	const draftCourses = stats?.courses?.draft || 0;
	const activeEnrollments = stats?.enrollments?.active || 0;
	const completedEnrollments = stats?.enrollments?.completed || 0;
	const certificatesIssued = stats?.certificates || 0;
	const blogPosts = stats?.blog_posts || 0;
	const maxBar = Math.max(totalLearners || 1, activeTutors || 1, admins || 1);
	const maxDailyValue = dailyActivity.length > 0 ? Math.max(...dailyActivity.map((d) => d.new_users || 0), 1) : 1;
	const openModal = (title, data) => {
		setModalTitle(title);
		setModalData(data);
		setModalOpen(true);
	};
	const getLearners = () => recentUsers.filter((u) => {
		const role = getUserRole(u);
		return role === "student" || role === "learner";
	});
	const getInstructors = () => recentUsers.filter((u) => {
		const role = getUserRole(u);
		return role === "instructor" || role === "tutor";
	});
	const getPublishedCourses = () => courses.filter((c) => c.is_published || c.status === "published");
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center min-h-[400px] gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-gray-500 dark:text-gray-400",
			children: "Loading dashboard..."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gray-500 dark:text-gray-400",
						children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
							weekday: "long",
							day: "numeric",
							month: "long",
							year: "numeric"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1",
						children: [
							"Good ",
							getGreeting(),
							", ",
							"Admin",
							". 👋"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gray-500 dark:text-gray-400 mt-1",
						children: "Here's what's happening on your platform today."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), "Export"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium text-white transition-colors shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), "Add User"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: GraduationCap,
						value: totalLearners.toLocaleString(),
						label: "Total Learners",
						subtitle: `${totalUsers} total users`,
						color: "blue",
						onClick: () => openModal("All Learners", getLearners())
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						value: activeTutors.toLocaleString(),
						label: "Instructors",
						subtitle: `${admins} admins`,
						color: "purple",
						onClick: () => openModal("All Instructors", getInstructors())
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: BookOpen,
						value: publishedCourses.toLocaleString(),
						label: "Published Courses",
						subtitle: `${draftCourses} drafts`,
						color: "green",
						onClick: () => openModal("Published Courses", getPublishedCourses())
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Award,
						value: certificatesIssued.toLocaleString(),
						label: "Certificates Issued",
						color: "orange",
						onClick: () => openModal("Certificates Issued", [{
							id: 1,
							name: "Certificate 1",
							date: (/* @__PURE__ */ new Date()).toISOString()
						}])
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 md:gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-semibold text-gray-900 dark:text-white",
								children: "User Breakdown"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-gray-500 dark:text-gray-400",
								children: ["Total: ", totalUsers]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBar, {
									label: "Students",
									value: totalLearners,
									max: totalUsers || maxBar,
									color: "#3B82F6"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBar, {
									label: "Instructors",
									value: activeTutors,
									max: totalUsers || maxBar,
									color: "#8B5CF6"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBar, {
									label: "Admins",
									value: admins,
									max: totalUsers || maxBar,
									color: "#10B981"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-bold text-gray-900 dark:text-white",
										children: draftCourses
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: "Draft Courses"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-bold text-amber-500",
										children: activeEnrollments
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: "Active Enrollments"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-bold text-emerald-500",
										children: completedEnrollments
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: "Completed"
									})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-semibold text-gray-900 dark:text-white",
								children: "Daily Activity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-gray-500 dark:text-gray-400",
								children: "Last 7 days"
							})]
						}),
						dailyActivity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center py-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500 dark:text-gray-400",
								children: "No activity data available"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end gap-1.5 h-[140px]",
							children: dailyActivity.map((day, index) => {
								const value = day.new_users || 0;
								const percentage = value / maxDailyValue * 100;
								const height = Math.max(12, percentage * .9 + 10);
								const opacity = .5 + index / dailyActivity.length * .5;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 flex flex-col items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-semibold text-blue-600 dark:text-blue-400",
											children: value
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-full relative group",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-full rounded-md transition-all duration-300 hover:opacity-100 cursor-pointer",
												style: {
													height: `${height}px`,
													background: `linear-gradient(180deg, #3B82F6, #60A5FA)`,
													opacity,
													boxShadow: "0 2px 8px rgba(59, 130, 246, 0.25)"
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none",
													children: [value, " new users"]
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] sm:text-[9px] text-gray-500 dark:text-gray-400 font-medium",
											children: formatDate(day.date || "")
										})
									]
								}, index);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-gray-500 dark:text-gray-400",
								children: [
									"Total: ",
									dailyActivity.reduce((sum, d) => sum + (d.new_users || 0), 0),
									" new users"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), dailyActivity[dailyActivity.length - 1]?.new_users > dailyActivity[0]?.new_users ? "↑ Growing" : "→ Stable"]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 dark:text-gray-400",
									children: "Blog Posts"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg font-bold text-gray-900 dark:text-white",
									children: blogPosts
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 dark:text-gray-400 text-right",
									children: "Platform Health"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 mt-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-2 w-2 rounded-full bg-green-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium text-green-600 dark:text-green-400",
										children: "Operational"
									})]
								})] })]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold text-gray-900 dark:text-white",
							children: "Recent Users"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-gray-500 dark:text-gray-400",
							children: ["Latest ", recentUsers.length]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: recentUsers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center py-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500 dark:text-gray-400",
								children: "No users found"
							})
						}) : recentUsers.map((user, index) => {
							const role = getUserRole(user);
							const roleDisplay = getRoleDisplay(role);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
										user,
										size: "md"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium truncate text-gray-900 dark:text-white",
											children: getDisplayName(user)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-gray-500 dark:text-gray-400 truncate",
											children: user.email || ""
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-xs font-medium px-2.5 py-1 rounded-full ${role === "admin" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" : role === "instructor" || role === "tutor" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"}`,
											children: roleDisplay
										})
									})
								]
							}, user.id || index);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold text-gray-900 dark:text-white",
							children: "Top Courses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-gray-500 dark:text-gray-400",
							children: "Most popular"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: courses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center py-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500 dark:text-gray-400",
								children: "No courses available"
							})
						}) : courses.map((course, index) => {
							const priceInfo = getCoursePrice(course);
							const students = course.total_students || course.students || 0;
							const lessons = course.total_lessons || course.modules || 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1 h-8 rounded-full bg-blue-500" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium truncate text-gray-900 dark:text-white",
												children: course.title || "Untitled Course"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: course.status || "draft" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [students, " students"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [lessons, " lessons"] }),
												course.avg_rating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-0.5",
													children: ["★ ", Number(course.avg_rating).toFixed(1)]
												})] })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-xs font-semibold ${priceInfo.color} whitespace-nowrap`,
										children: priceInfo.display
									})
								]
							}, course.id || index);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				isOpen: modalOpen,
				onClose: () => setModalOpen(false),
				title: modalTitle,
				children: modalData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gray-500 dark:text-gray-400",
						children: "No items found"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: modalData.map((item, index) => {
						const isUser = item.full_name || item.username || item.email;
						const isCourse = item.title || item.slug;
						const isCertificate = item.name && !item.title && !item.full_name;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-900 dark:text-white truncate",
										children: item.full_name || item.name || item.title || `Item ${index + 1}`
									}),
									isUser && item.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400 truncate",
										children: item.email
									}),
									isUser && item.role && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: ["Role: ", getRoleDisplay(item.role)]
									}),
									isCourse && item.price && item.price > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: ["Price: UGX ", Number(item.price).toLocaleString()]
									}),
									isCertificate && item.date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: ["Issued: ", new Date(item.date).toLocaleDateString()]
									}),
									isCourse && item.total_students !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-gray-500 dark:text-gray-400",
										children: [item.total_students, " students"]
									})
								]
							}), item.status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })]
						}, item.id || index);
					})
				})
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };

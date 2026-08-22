import { r as __toESM } from "../_runtime.mjs";
import { a as getBlogPosts, c as getCourses, d as getMeStats, f as getMyCertificates, m as getNotifications, p as getMyEnrollments, u as getMe } from "./api-CAuas8Gr.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Clock, G as Flame, _ as ShoppingCart, _t as ArrowRight, a as Users, d as Target, dt as Calendar, et as Clock3, g as Signal, gt as Award, ot as ChevronRight, pt as BookOpen, w as Play, z as Layers } from "../_libs/lucide-react.mjs";
import { t as CourseThumb } from "./course-thumb-BLEjkbjf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.index-1R0C3KjA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CourseCard({ course, href }) {
	const to = href ?? "/student/course/$slug";
	const isFree = course.price.toLowerCase() === "free" || course.price === "$0";
	const actionLabel = course.progress != null ? "Continue" : "Enroll";
	const ActionIcon = course.progress != null ? Play : ShoppingCart;
	const primaryInitials = course.instructor.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
	const secondaryInitials = course.category.slice(0, 2).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		params: { slug: course.slug },
		className: "group mx-auto flex w-full max-w-[340px] flex-col overflow-hidden rounded-[24px] border border-[#e4f0ea] bg-white shadow-[0_2px_10px_rgba(26,110,80,0.02)] transition-all duration-150 hover:-translate-y-[3px] hover:border-[#b6d4c8] hover:shadow-[0_8px_24px_rgba(26,110,80,0.04)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-[150px] flex-shrink-0 overflow-hidden bg-[#dcebe4]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseThumb, {
					variant: course.image,
					color: course.color,
					thumbnail: course.thumbnail,
					title: course.title,
					className: "h-full transition-transform duration-200 group-hover:scale-[1.02]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `absolute right-3 top-3 z-[2] rounded-full px-3 py-[3px] text-[9px] font-semibold uppercase tracking-[0.3px] ${isFree ? "bg-[rgba(212,240,229,0.92)] text-[#0d5c47]" : "bg-[rgba(234,240,237,0.92)] text-[#2d4d42]"}`,
					children: isFree ? "Free" : "Premium"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute bottom-3 left-3 z-[2] inline-flex items-center rounded-full bg-[rgba(255,255,255,0.85)] px-3 py-[2px] text-[9px] font-medium uppercase text-[#1a3d36]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, { className: "mr-1 h-2.5 w-2.5" }),
						" ",
						course.level
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/10 to-transparent" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-[1.2rem] pt-[1.1rem]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-0.5 flex items-start justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[0.95rem] font-semibold text-[#0d2922]",
						children: [course.price === "Free" ? "$0" : course.price, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-1 text-[0.65rem] font-normal text-[#4f7568]",
							children: [
								"· ",
								course.modules,
								" modules"
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-0.5 line-clamp-2 text-[1rem] font-medium text-[#0d2922]",
					children: course.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 mt-1 line-clamp-2 flex-1 text-[0.8rem] leading-[1.4] text-[#3d6b5d]",
					children: course.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex flex-wrap gap-x-4 gap-y-1 text-[0.65rem] text-[#4f7568]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mr-1 h-3.5 w-3.5 text-[#2a7a66]" }),
								(course.students / 1e3).toFixed(1),
								"k students"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "mr-1 h-3.5 w-3.5 text-[#2a7a66]" }), course.duration]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "mr-1 h-3.5 w-3.5 text-[#2a7a66]" }),
								course.modules,
								" modules"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center justify-between border-t border-[#eaf3ef] pt-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "-mr-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#8dc0b0] text-[9px] font-semibold text-[#1a4a3d]",
								children: primaryInitials
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "-mr-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#b6d4c8] text-[9px] font-semibold text-[#1a4a3d]",
								children: secondaryInitials
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-[0.6rem] text-[#3d6b5d]",
								children: "+2 instructors"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-[#1f6e5c] px-4 py-1 text-[0.65rem] font-medium text-white transition-colors group-hover:bg-[#155a4a]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, { className: "h-3 w-3" }),
							" ",
							actionLabel
						]
					})]
				})
			]
		})]
	});
}
function StudentDashboard() {
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [stats, setStats] = (0, import_react.useState)({
		streak_days: 0,
		courses_completed: 0,
		xp: 0,
		level: 0,
		weekly_hours: 0,
		weekly_goal_hours: 10
	});
	const [certificates, setCertificates] = (0, import_react.useState)([]);
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [blogPosts, setBlogPosts] = (0, import_react.useState)([]);
	const [enrollments, setEnrollments] = (0, import_react.useState)([]);
	const [user, setUser] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		(async () => {
			const [courseList, statsData, certificateList, notificationList, blogList, enrollmentList, userData] = await Promise.all([
				getCourses(),
				getMeStats(),
				getMyCertificates(),
				getNotifications(),
				getBlogPosts(),
				getMyEnrollments(),
				getMe()
			]);
			setCourses(courseList);
			setStats(statsData ?? {
				streak_days: 0,
				courses_completed: 0,
				xp: 0,
				level: 0,
				weekly_hours: 0,
				weekly_goal_hours: 10
			});
			setCertificates(certificateList);
			setNotifications(notificationList);
			setBlogPosts(blogList);
			setEnrollments(enrollmentList);
			setUser(userData);
		})();
	}, []);
	const inProgress = courses.filter((c) => (c.progress ?? 0) > 0 && (c.progress ?? 0) < 100);
	const recommended = courses.filter((c) => (c.progress ?? 0) <= 0);
	const weeklyGoal = stats.weekly_goal_hours ?? 10;
	const weeklyProgress = Number(stats.weekly_hours ?? 0) > 0 ? Math.min(100, Math.round((stats.weekly_hours ?? 0) / weeklyGoal * 100)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-1 text-[28px] font-semibold tracking-tight",
						children: [
							"Welcome back, ",
							user?.first_name ?? user?.full_name?.split(" ")[0] ?? "Learner",
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"You are on a ",
							stats.streak_days,
							"-day streak. Resume your next lesson now."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/student/my-learning",
					className: "inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors",
					children: ["Continue learning ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					{
						icon: Flame,
						label: "Learning streak",
						value: String(stats.streak_days),
						unit: "days",
						accent: "text-[var(--gold)]",
						bg: "bg-[var(--gold)]/10"
					},
					{
						icon: Clock,
						label: "XP level",
						value: String(stats.level),
						unit: "lvl",
						accent: "text-primary",
						bg: "bg-primary/10"
					},
					{
						icon: BookOpen,
						label: "Completed courses",
						value: String(stats.courses_completed),
						unit: "courses",
						accent: "text-info",
						bg: "bg-info/10"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-10 w-10 place-items-center rounded-xl ${s.bg} ${s.accent}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 text-[28px] font-semibold tracking-tight",
							children: [s.value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-sm font-normal text-muted-foreground",
								children: s.unit
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: s.label
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.55fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card-surface p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
						title: "Continue learning",
						href: "/student/my-learning",
						hrefLabel: "View all"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: inProgress.slice(0, 3).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/student/study/$slug",
							params: { slug: c.slug },
							className: "group flex flex-col gap-3 rounded-2xl border border-border p-3 hover:border-primary/40 hover:bg-secondary/40 transition-colors sm:flex-row sm:gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-32",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseThumb, {
										variant: c.image,
										color: c.color,
										thumbnail: c.thumbnail,
										title: c.title
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.category }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden sm:inline",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.instructor })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 truncate text-sm font-semibold group-hover:text-primary transition-colors",
											children: c.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-1.5 flex-1 overflow-hidden rounded-full bg-secondary",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full rounded-full bg-primary",
													style: { width: `${c.progress}%` }
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-semibold text-foreground",
												children: [c.progress, "%"]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "hidden h-4 w-4 shrink-0 self-center text-muted-foreground group-hover:text-primary sm:block" })
							]
						}, c.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[13px] font-semibold text-muted-foreground uppercase tracking-widest",
									children: "Weekly goal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4 text-primary" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[32px] font-semibold tracking-tight",
									children: stats.weekly_hours ?? 0
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted-foreground",
									children: [
										"/ ",
										weeklyGoal,
										" hrs"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 h-2 overflow-hidden rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary animate-progress",
									style: { width: `${weeklyProgress}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid grid-cols-7 gap-1.5",
								children: [
									"M",
									"T",
									"W",
									"T",
									"F",
									"S",
									"S"
								].map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mx-auto h-8 w-full rounded-md ${i < 3 ? "bg-primary" : i === 3 ? "bg-primary/60" : "bg-secondary"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1.5 text-[10px] text-muted-foreground",
										children: d
									})]
								}, i))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[13px] font-semibold text-muted-foreground uppercase tracking-widest",
									children: "Certificates"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4 text-success" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: [
									"You have earned ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-foreground",
										children: [certificates.length, " certificates"]
									}),
									". Keep progressing to unlock your next one."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/student/certificates",
								className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline",
								children: ["View certificates ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card-surface p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
						title: "Upcoming deadlines",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-muted-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-border",
						children: enrollments.slice(0, 3).map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-4 py-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: item.course?.title ?? item.course ?? "Enrollment"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: item.status ?? "active"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground/80",
								children: [item.progress ?? 0, "%"]
							})]
						}, item.id ?? index))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card-surface p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Recent activity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-4",
						children: notifications.slice(0, 4).map((notification, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm",
									children: notification.title ?? notification.message ?? notification.body ?? "Activity updated"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: notification.course?.title ?? notification.created_at ?? notification.type ?? "Recently updated"
								})]
							})]
						}, notification.id ?? index))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[20px] font-semibold tracking-tight",
					children: "Recommended for you"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Based on your current learning progress."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/student/explore",
					className: "text-sm font-medium text-primary hover:underline",
					children: "Explore all →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: recommended.slice(0, 2).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c }, c.id))
			})] })
		]
	});
}
function SectionHead({ title, href, hrefLabel, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "flex items-center gap-2 text-[16px] font-semibold",
			children: [title, icon]
		}), href && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: href,
			className: "text-xs font-medium text-primary hover:underline",
			children: [hrefLabel, " →"]
		})]
	});
}
//#endregion
export { StudentDashboard as component };

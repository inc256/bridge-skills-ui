import { r as __toESM } from "../_runtime.mjs";
import { S as initiatePayment, c as getCourseModules, i as enrollInCourse, n as checkCourseEnrollment } from "./api-C11h0hEw.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as LoaderCircle, H as Globe, Z as Download, _t as Award, a as Users, et as Clock, p as Star, rt as CirclePlay, ut as Check } from "../_libs/lucide-react.mjs";
import { t as Route } from "./student.course._slug-bmvhQe_D.mjs";
import { t as CourseThumb } from "./course-thumb-BLEjkbjf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.course._slug-C4xEpW8b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CourseDetails() {
	const navigate = useNavigate();
	const { course } = Route.useLoaderData();
	const [modules, setModules] = (0, import_react.useState)([]);
	const [enrolled, setEnrolled] = (0, import_react.useState)(course.progress != null);
	const [enrolling, setEnrolling] = (0, import_react.useState)(false);
	const [enrollmentError, setEnrollmentError] = (0, import_react.useState)(null);
	const raw = course.raw;
	const getYoutubeId = (url) => {
		if (!url) return null;
		const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/);
		return match ? match[1] : null;
	};
	const youtubeId = getYoutubeId(course.introVideoUrl ?? raw?.intro_video_url ?? raw?.video_url ?? raw?.youtube_url);
	(0, import_react.useEffect)(() => {
		getCourseModules(course.slug).then((data) => setModules(Array.isArray(data) ? data : []));
	}, [course.slug]);
	(0, import_react.useEffect)(() => {
		checkCourseEnrollment(course.slug).then((result) => {
			if (result) setEnrolled(Boolean(result.enrolled ?? result.is_enrolled ?? result.status === "active"));
		});
	}, [course.slug]);
	const isFree = course.price.toLowerCase() === "free" || Number(raw?.price ?? 0) === 0;
	async function handleAccessCourse() {
		if (enrolled) return;
		setEnrolling(true);
		setEnrollmentError(null);
		try {
			if (isFree) {
				await enrollInCourse(course.slug);
				setEnrolled(true);
				navigate({
					to: "/student/study/$slug",
					params: { slug: course.slug }
				});
				return;
			}
			const payment = await initiatePayment("stripe", {
				course: course.slug,
				course_slug: course.slug,
				amount: raw?.price ?? course.price
			});
			const redirectUrl = payment?.checkout_url ?? payment?.payment_url ?? payment?.url;
			if (redirectUrl) {
				window.location.assign(redirectUrl);
				return;
			}
			if (payment?.enrolled || payment?.status === "paid" || payment?.status === "succeeded") {
				setEnrolled(true);
				navigate({
					to: "/student/study/$slug",
					params: { slug: course.slug }
				});
				return;
			}
			throw new Error("Payment was not started. Please try again.");
		} catch (error) {
			setEnrollmentError(error instanceof Error ? error.message : "Unable to enroll in this course.");
		} finally {
			setEnrolling(false);
		}
	}
	const courseDetails = [
		course.level ? {
			l: "Skill level",
			v: course.level
		} : null,
		course.duration ? {
			l: "Total duration",
			v: course.duration
		} : null,
		course.lessons > 0 ? {
			l: "Lessons",
			v: `${course.lessons}`
		} : null,
		course.certificate ? {
			l: "Certificate",
			v: "Included"
		} : null,
		course.language ? {
			l: "Language",
			v: course.language
		} : null
	].filter(Boolean);
	const instructorName = course.instructor || raw?.instructor?.name || raw?.instructor;
	const instructorBioText = course.instructorBio || raw?.instructor?.bio || raw?.instructor_bio || raw?.instructor_description;
	const accessLabel = raw?.access_label ?? raw?.access_type ?? raw?.access;
	const hasCourseStats = Boolean(course.rating > 0 || course.students > 0 || course.duration || course.language || course.subtitles);
	const hasLearningOutcomes = Boolean(course.learningOutcomes?.length || Array.isArray(raw?.learning_outcomes) || Array.isArray(raw?.outcomes));
	const hasCurriculum = modules.length > 0;
	const curriculumLessonCount = modules.reduce((total, module) => total + (Array.isArray(module.lessons) ? module.lessons.length : 0), 0);
	const curriculumDurationMinutes = modules.reduce((total, module) => total + (module.lessons ?? []).reduce((sum, lesson) => {
		const match = String(lesson.duration ?? "").match(/(\d+)\s*(h|m)/i);
		return sum + (match ? Number(match[1]) * (match[2].toLowerCase() === "h" ? 60 : 1) : 0);
	}, 0), 0);
	const curriculumDuration = curriculumDurationMinutes >= 60 ? `${Math.floor(curriculumDurationMinutes / 60)}h${curriculumDurationMinutes % 60 ? ` ${curriculumDurationMinutes % 60}m` : ""}` : curriculumDurationMinutes ? `${curriculumDurationMinutes} min` : course.duration;
	const hasInstructor = Boolean(instructorName || instructorBioText);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/student/explore",
					className: "hover:text-foreground",
					children: "Explore"
				}),
				" / ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: course.category }),
				" / ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-foreground",
					children: course.title
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[1.6fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-3xl bg-black",
					children: youtubeId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						className: "h-full w-full min-h-[240px]",
						src: `https://www.youtube.com/embed/${youtubeId}`,
						title: course.title,
						allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
						allowFullScreen: true
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseThumb, {
						variant: course.image,
						color: course.color,
						thumbnail: course.thumbnail,
						title: course.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
							children: course.category
						}),
						course.level ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-border px-3 py-1 text-xs font-medium",
							children: course.level
						}) : null,
						course.certificate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-[var(--gold)]/15 px-3 py-1 text-xs font-medium text-[var(--gold)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "mr-1 inline h-3 w-3" }), "Certificate"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-[36px] font-semibold leading-tight tracking-tight",
					children: course.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[15px] leading-relaxed text-muted-foreground",
					children: course.description
				}),
				hasCourseStats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground",
					children: [
						course.rating > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground font-semibold",
									children: course.rating
								}),
								" (",
								course.reviews.toLocaleString(),
								" reviews)"
							]
						}),
						course.students > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
								" ",
								course.students.toLocaleString(),
								" students"
							]
						}),
						course.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
								" ",
								course.duration
							]
						}),
						(course.language || course.subtitles) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }),
								course.language ? ` ${course.language}` : "",
								course.subtitles ? ` + ${course.subtitles} subtitles` : ""
							]
						})
					]
				}),
				hasLearningOutcomes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10 card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[18px] font-semibold",
						children: "What you'll learn"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: (course.learningOutcomes?.length ? course.learningOutcomes : Array.isArray(raw?.learning_outcomes) ? raw.learning_outcomes : Array.isArray(raw?.outcomes) ? raw.outcomes : []).map((t, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), typeof t === "string" ? t : t.label ?? t.title ?? JSON.stringify(t)]
						}, `${String(t)}-${index}`))
					})]
				}),
				hasCurriculum && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[18px] font-semibold",
							children: "Curriculum"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								modules.length,
								" module",
								modules.length === 1 ? "" : "s",
								" · ",
								curriculumLessonCount,
								" lessons · ",
								curriculumDuration
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: modules.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-medium text-muted-foreground",
									children: [
										"Module ",
										i + 1,
										": ",
										m.title
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										m.lessons?.length ?? 0,
										" lessons · ",
										m.duration
									]
								})]
							}), Array.isArray(m.lessons) && m.lessons.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2 text-sm text-muted-foreground",
								children: m.lessons.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.duration })]
								}, l.id ?? l.title))
							}) : null]
						}, m.id ?? i))
					})]
				}),
				hasInstructor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8 card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[18px] font-semibold",
						children: "Your instructor"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-lg font-semibold",
							children: instructorName ? instructorName.split(" ").map((n) => n[0]).join("") : "?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							instructorName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[15px] font-semibold",
								children: instructorName
							}),
							course.instructorTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: course.instructorTitle
							}),
							instructorBioText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: instructorBioText
							})
						] })]
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-24 card-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[28px] font-semibold tracking-tight",
						children: course.price
					}),
					accessLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: accessLabel
					}) : null,
					enrolled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/student/study/$slug",
						params: { slug: course.slug },
						className: "mt-5 flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4" }), " Continue learning"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void handleAccessCourse(),
						disabled: enrolling,
						className: "mt-5 flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:cursor-wait disabled:opacity-60",
						children: [enrolling && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), enrolling ? "Processing..." : isFree ? "Enroll and start" : "Pay and enroll"]
					}),
					enrollmentError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-destructive",
						children: enrollmentError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mt-2 w-full rounded-[14px] border border-border px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors",
						children: "Add to bookmarks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3 text-sm",
						children: courseDetails.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-2.5 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: r.l
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: r.v
							})]
						}, r.l))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "mt-4 inline-flex w-full items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Download syllabus (PDF)"]
					})
				]
			}) })]
		})]
	});
}
//#endregion
export { CourseDetails as component };

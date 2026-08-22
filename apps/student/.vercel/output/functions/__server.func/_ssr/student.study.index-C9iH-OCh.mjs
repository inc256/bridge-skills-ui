import { r as __toESM } from "../_runtime.mjs";
import { p as getMyEnrollments } from "./api-CAuas8Gr.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _t as ArrowRight, nt as CirclePlay } from "../_libs/lucide-react.mjs";
import { t as CourseThumb } from "./course-thumb-BLEjkbjf.mjs";
import { t as setSelectedCourseSlug } from "./student-onboarding-CGj2r6iI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.study.index-C9iH-OCh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudyCoursePicker() {
	const [enrollments, setEnrollments] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getMyEnrollments().then(setEnrollments);
	}, []);
	const availableCourses = enrollments.filter((item) => item?.course && (item.progress ?? 0) > 0).slice(0, 4).map((item) => {
		const course = item.course ?? {};
		return {
			...course,
			category: typeof course.category === "string" ? course.category : course.category?.name ?? "General",
			color: typeof course.color === "string" ? course.color : "#3B82F6",
			image: typeof course.image === "string" ? course.image : "code",
			progress: item.progress
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[24px] font-semibold tracking-tight",
					children: "Choose a course to start studying"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Select one active course first, then continue with lessons."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/student/my-learning",
					className: "inline-flex items-center gap-1.5 rounded-[14px] border border-border px-4 py-2 text-sm font-medium hover:bg-secondary",
					children: ["My learning ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: availableCourses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/student/study/$slug",
					params: { slug: course.slug },
					onClick: () => setSelectedCourseSlug(course.slug),
					className: "group card-surface flex gap-3 p-3 transition-colors hover:border-primary/40 hover:bg-secondary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 w-28 shrink-0 overflow-hidden rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseThumb, {
								variant: course.image,
								color: course.color,
								thumbnail: course.thumbnail,
								title: course.title
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-medium text-muted-foreground",
									children: course.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 truncate text-sm font-semibold group-hover:text-primary transition-colors",
									children: course.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [course.progress, "% complete"] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 shrink-0 self-center text-muted-foreground group-hover:text-primary" })
					]
				}, course.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-4 text-sm text-muted-foreground",
				children: [
					"No active course yet? Go to ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/student/explore",
						className: "font-medium text-primary hover:underline",
						children: "Explore"
					}),
					" and enroll in a course first."
				]
			})
		]
	});
}
//#endregion
export { StudyCoursePicker as component };

//#region node_modules/.nitro/vite/services/ssr/assets/student-onboarding-CGj2r6iI.js
var SELECTED_COURSE_STORAGE_KEY = "tb-selected-course-slug";
function setSelectedCourseSlug(slug) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(SELECTED_COURSE_STORAGE_KEY, slug);
}
//#endregion
export { setSelectedCourseSlug as t };

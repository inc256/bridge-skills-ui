const SELECTED_COURSE_STORAGE_KEY = "tb-selected-course-slug";

export function getSelectedCourseSlug(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SELECTED_COURSE_STORAGE_KEY);
}

export function setSelectedCourseSlug(slug: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SELECTED_COURSE_STORAGE_KEY, slug);
}

export function clearSelectedCourseSlug(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SELECTED_COURSE_STORAGE_KEY);
}

export function hasSelectedCourse(): boolean {
  return Boolean(getSelectedCourseSlug());
}

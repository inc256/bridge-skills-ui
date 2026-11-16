import { getStoredSession } from "./api";

export type LocalStudyState = {
  currentLessonId?: string;
  progress?: number;
  positions?: Record<string, number>;
  completedLessonIds?: string[];
};

function getStudentId() {
  return getStoredSession()?.user?.id;
}

function getStudyStorageKey(courseSlug: string, studentId: string) {
  return `bridge-study-${studentId}-${courseSlug}`;
}

export function getLocalStudyState(courseSlug: string): LocalStudyState {
  if (typeof window === "undefined") return {};
  try {
    const studentId = getStudentId();
    const key = getStudyStorageKey(courseSlug, String(studentId ?? "anonymous"));
    const savedState = window.localStorage.getItem(key);
    if (savedState) return JSON.parse(savedState) as LocalStudyState;

    const legacyState = window.localStorage.getItem(`bridge-study-${courseSlug}`);
    const legacyOwner = window.localStorage.getItem("bridge-study-owner");
    if (!studentId || !legacyState || (legacyOwner && legacyOwner !== String(studentId))) return {};
    window.localStorage.setItem(key, legacyState);
    window.localStorage.setItem("bridge-study-owner", String(studentId));
    return JSON.parse(legacyState) as LocalStudyState;
  } catch {
    return {};
  }
}

export function saveLocalStudyState(courseSlug: string, update: Partial<LocalStudyState>) {
  if (typeof window === "undefined") return;
  const studentId = String(getStudentId() ?? "anonymous");
  const current = getLocalStudyState(courseSlug);
  window.localStorage.setItem(
    getStudyStorageKey(courseSlug, studentId),
    JSON.stringify({ ...current, ...update }),
  );
  if (studentId !== "anonymous" && !window.localStorage.getItem("bridge-study-owner")) {
    window.localStorage.setItem("bridge-study-owner", studentId);
  }
}

export function saveLocalLessonPosition(courseSlug: string, lessonId: string, position: number) {
  const state = getLocalStudyState(courseSlug);
  saveLocalStudyState(courseSlug, {
    positions: { ...(state.positions ?? {}), [lessonId]: Math.max(0, Math.floor(position)) },
  });
}

export function getLocalStudyProgress(courseSlug: string) {
  const progress = Number(getLocalStudyState(courseSlug).progress ?? 0);
  return Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : 0;
}

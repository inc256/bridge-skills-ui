export type Course = {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  instructorTitle?: string;
  category: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  reviews: number;
  certificate: boolean;
  price: string;
  image: string;
  thumbnail?: string | null;
  color: string;
  description: string;
  modules: number;
  lessons: number;
  status?: string;
  progress?: number;
};

export type CourseCategory = {
  id: number;
  name: string;
  slug: string;
};

export type TutorProfile = {
  id: string;
  username: string;
  email: string;
  full_name: string;
  first_name: string;
  last_name: string;
  headline: string;
  bio: string;
  expertise: string;
  experience: string;
  momo_number: string;
  momo_provider: string;
  bank_name: string;
  bank_account: string;
  bank_account_name: string;
  phone: string;
  website: string;
  linkedin: string;
  twitter: string;
  youtube: string;
};

const API_BASE = (import.meta.env?.VITE_API_BASE_URL as string | undefined) ?? "https://techbridge-backend-rust.vercel.app/api/v1";

// Maps the backend's lowercase lesson `type` enum to the label used by the
// builder's <select> options. Keep this in sync with the reverse mapping in
// builder.tsx's handleSave (display -> backend).
const LESSON_TYPE_TO_DISPLAY: Record<string, string> = {
  video: "Video",
  text: "Article",
  reading: "Article",
  quiz: "Quiz",
  assignment: "Project",
  project: "Project",
  live: "Project",
};

function toDisplayLessonType(rawType: string | undefined | null): string {
  if (!rawType) return "Video";
  return LESSON_TYPE_TO_DISPLAY[String(rawType).toLowerCase()] ?? "Video";
}

// The DB stores lesson duration as an integer number of seconds. The builder
// UI (and handleSave's parser) work in a human string like "15 min" / "1h 30m".
// Without this conversion, editing an existing course shows the raw seconds
// value (e.g. "900") in the Duration field.
function formatDurationSeconds(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(Number(totalSeconds) || 0));
  const totalMinutes = Math.round(seconds / 60);
  if (totalMinutes <= 0) return "0 min";
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
}

function lessonDurationSeconds(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, value);
  const text = String(value ?? "").trim().toLowerCase();
  const hours = Number(text.match(/(\d+(?:\.\d+)?)\s*h/)?.[1] ?? 0);
  const minutes = Number(text.match(/(\d+(?:\.\d+)?)\s*m/)?.[1] ?? 0);
  if (hours || minutes) return hours * 3600 + minutes * 60;
  const numeric = Number(text);
  return Number.isFinite(numeric) ? Math.max(0, numeric) : 0;
}

async function getCourseDuration(slug: string, fallback: string) {
  try {
    const lessons = await getCourseLessons(slug);
    const totalSeconds = lessons.reduce((sum: number, lesson: any) => sum + lessonDurationSeconds(lesson?.duration), 0);
    return lessons.length > 0 ? formatDurationSeconds(totalSeconds) : fallback;
  } catch {
    return fallback;
  }
}

function getStorageKey() {
  return "bridge_skills_tutor_session";
}

function readSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(getStorageKey());
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(session: any | null) {
  if (typeof window === "undefined") return;
  if (session) {
    window.localStorage.setItem(getStorageKey(), JSON.stringify(session));
  } else {
    window.localStorage.removeItem(getStorageKey());
  }
}

// Cheap, synchronous, no-network check for whether a session is present.
// Use this to decide whether it's worth calling an authenticated endpoint
// at all (e.g. on app boot) instead of firing the request and catching the
// guaranteed 401 when the user is simply logged out.
export function hasStoredSession(): boolean {
  return Boolean(readSession()?.access);
}

export function getStoredSession() {
  return readSession();
}

export function clearStoredSession() {
  writeSession(null);
}

export function isAccessTokenExpired(token: string | undefined) {
  if (!token) return true;
  try {
    const payload = token.split(".")[1];
    if (!payload) return true;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=")));
    return typeof decoded?.exp === "number" && decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

async function refreshToken(): Promise<boolean> {
  const session = readSession();
  if (!session?.refresh) return false;

  try {
    const refreshResponse = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: session.refresh }),
    });

    if (!refreshResponse.ok) return false;
    const data = await refreshResponse.json();
    if (data?.access) {
      writeSession({ ...session, access: data.access, refresh: data.refresh ?? session.refresh });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function apiRequest<T>(path: string, init: RequestInit = {}, retried = false): Promise<T> {
  const headers = new Headers(init.headers);
  
  // Only add Authorization header if we have a session AND it's not a login request
  const session = readSession();
  const isLoginPath = path.includes("/auth/login/") || path.includes("/login/");
  
  if (session?.access && !isLoginPath) {
    headers.set("Authorization", `Bearer ${session.access}`);
  }
  
  if (!headers.has("Content-Type") && init.body && typeof init.body === "string") {
    headers.set("Content-Type", "application/json");
  }

  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  console.log(`API Request: ${init.method || 'GET'} ${url}`);
  
  const response = await fetch(url, { 
    ...init, 
    headers 
  });
  
  if (!response.ok) {
    // Don't try to refresh token on login failures
    if (response.status === 401 && !retried && !isLoginPath && !path.includes("/auth/token/refresh/")) {
      const refreshed = await refreshToken();
      if (refreshed) {
        return apiRequest<T>(path, init, true);
      }
      clearStoredSession();
    }

    // Read the body exactly once, as text - a Response's body stream can only
    // be consumed a single time. Trying response.json() and, on failure,
    // falling back to response.text() throws ("body stream already read")
    // because the failed .json() call already consumed the stream. That
    // secondary TypeError was masking the real error detail from the server
    // (e.g. an HTML 500 page, which isn't valid JSON).
    let detail = "Request failed";
    try {
      const rawText = await response.text();
      try {
        const payload = JSON.parse(rawText);
        const rawDetail = typeof payload === "string" ? payload : payload?.detail ?? payload?.message ?? payload;
        detail = typeof rawDetail === "string" ? rawDetail : JSON.stringify(rawDetail);
      } catch {
        // Not JSON (e.g. an HTML error page) - fall back to the raw text.
        detail = rawText || detail;
      }
    } catch {
      // Body couldn't be read at all - keep the default message.
    }
    const httpError = new Error(detail || `Request failed with ${response.status}`) as Error & { status?: number };
    if (detail === "Request failed") {
      httpError.message = `Request failed with ${response.status}`;
    }
    httpError.status = response.status;
    throw httpError;
  }
  
  if (response.status === 204) return null as T;
  return (await response.json()) as T;
}

export async function login(email: string, password: string) {
  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  if (!cleanEmail || !cleanPassword) {
    throw new Error("Email and password are required");
  }

  // Guess the right field from the input shape instead of always trying
  // both. Previously this fired up to two /auth/login/ requests per click
  // (email, then username) regardless of outcome - including retrying
  // after a 500, which never helps (a server error isn't "wrong field
  // shape") and needlessly doubles django-axes' failed-attempt counter,
  // which can lock the account out from normal use alone.
  const looksLikeEmail = cleanEmail.includes("@");
  const primaryField = looksLikeEmail ? "email" : "username";
  const fallbackField = looksLikeEmail ? "username" : "email";

  async function attempt(field: "email" | "username") {
    const session = await apiRequest<any>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ [field]: cleanEmail, password: cleanPassword }),
    });
    if (session?.access) {
      writeSession(session);
    }
    return session;
  }

  try {
    return await attempt(primaryField);
  } catch (primaryError: any) {
    // Only retry with the other field shape on an actual 400 (validation
    // error - "wrong field for this endpoint"). Any other status (401
    // wrong password, 403/423 locked out, 500 server error) means
    // retrying won't help and only adds another failed attempt on record.
    if (primaryError?.status !== 400) {
      throw primaryError;
    }
    try {
      return await attempt(fallbackField);
    } catch {
      throw primaryError;
    }
  }
}

// Rest of your api.ts functions remain the same...

export async function logout() {
  try {
    await apiRequest("/auth/logout/", { method: "POST" });
  } catch {}
  writeSession(null);
}

export async function getCourses() {
  try {
    const payload = await apiRequest<any>("/courses/mine/");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return await Promise.all(list.map(async (item: any) => ({
      id: item?.id ?? item?.slug,
      slug: item?.slug,
      title: item?.title,
      instructor: item?.instructor?.full_name ?? "Instructor",
      instructorTitle: item?.instructor?.headline ?? "Instructor",
      category: item?.category?.name ?? "General",
      level: (item?.level || "beginner").toLowerCase() === "advanced" ? "Advanced" : (item?.level || "beginner").toLowerCase() === "intermediate" ? "Intermediate" : "Beginner",
      duration: await getCourseDuration(item?.slug, item?.duration ?? "8h"),
      students: item?.total_students ?? 0,
      rating: Number(item?.avg_rating ?? 0),
      reviews: Number(item?.total_reviews ?? 0),
      certificate: Boolean(item?.has_certificate ?? true),
      price: item?.price ? `GHS ${Number(item.price).toLocaleString()}` : "Free",
      status: item?.status ?? "draft",
      image: item?.title?.toLowerCase().includes("network") ? "network" : item?.title?.toLowerCase().includes("security") ? "security" : "code",
      thumbnail: item?.thumbnail ?? item?.thumbnail_url ?? null,
      color: "#3B82F6",
      description: item?.subtitle ?? "",
      modules: Number(item?.total_modules ?? item?.module_count ?? item?.sections_count ?? item?.modules_count ?? 0),
      lessons: Number(item?.total_lessons ?? item?.lesson_count ?? item?.lessons_count ?? 0),
      raw: item,
    })));
  } catch {
    return [];
  }
}

export async function getStudents() {
  const normalizeStudent = (item: any, index: number, fallbackCourse: any = {}) => {
    const user = item?.user ?? item?.student ?? item?.learner ?? item?.profile ?? item?.user_detail ?? item ?? {};
    const course = item?.course ?? item?.course_detail ?? item?.course_data ?? fallbackCourse ?? {};
    const progressValue = typeof item?.progress === "object"
      ? item.progress?.percentage ?? item.progress?.progress ?? item.progress?.completion_percentage
      : item?.progress ?? item?.completion_percentage ?? item?.completion;
    const enrolledAt = item?.enrolled_at ?? item?.created_at ?? item?.joined_at;
    return {
      id: item?.id ?? user?.id ?? `student-${index}`,
      name: user?.full_name || [user?.first_name, user?.last_name].filter(Boolean).join(" ") || user?.username || user?.email || "Student",
      email: user?.email || "",
      avatar: user?.avatar ?? user?.profile_picture ?? null,
      course: course?.title || item?.course_title || item?.course_name || fallbackCourse?.title || "Course",
      courseSlug: course?.slug || item?.course_slug || fallbackCourse?.slug,
      progress: Math.min(100, Math.max(0, Number(progressValue ?? 0))),
      grade: item?.grade ?? item?.final_grade ?? "—",
      status: item?.status ?? "active",
      enrolled: enrolledAt ? new Date(enrolledAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Recently",
      raw: item,
    };
  };

  try {
    const payload = await apiRequest<any>("/enrollments/");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    const directStudents = list.length > 0 ? list.map((item: any, index: number) => normalizeStudent(item, index)) : [];
    if (directStudents.length > 0) return directStudents;

    const courses = await getCourses();
    const embeddedStudents = courses.flatMap((course: any) => {
      const raw = course?.raw ?? {};
      const records = Array.isArray(course?.students) ? course.students
        : Array.isArray(raw.enrollments) ? raw.enrollments
          : Array.isArray(raw.students) ? raw.students
            : Array.isArray(raw.learners) ? raw.learners
              : Array.isArray(raw.enrolled_students) ? raw.enrolled_students
                : Array.isArray(raw.participants) ? raw.participants
                  : [];

      return records.length > 0
        ? records.map((item: any, idx: number) => normalizeStudent(item, idx, course))
        : [];
    });

    const deduped = embeddedStudents.filter((student: any, index: number, arr: any[]) =>
      arr.findIndex((entry: any) => entry.id === student.id) === index,
    );
    return deduped.map((student: any, index: number) => ({ ...student, id: student.id || `student-${index}` }));
  } catch {
    return [];
  }
}

export async function getTutorAnalytics() {
  try {
    return await apiRequest<any>("/auth/me/stats/");
  } catch {
    return null;
  }
}

export async function getCourseCategories() {
  try {
    const payload = await apiRequest<any>("/courses/categories/");
    return Array.isArray(payload) ? payload : payload?.results ?? [];
  } catch {
    return [];
  }
}

export async function createCourse(course: {
  title: string;
  slug: string;
  description: string;
  subtitle?: string;
  category: number;
  level: string;
  language?: string;
  status?: string;
  pricing: string;
  price: string;
  outcomes?: string[];
  requirements?: string[];
  thumbnail?: File | null;
}) {
  const body = course.thumbnail instanceof File
    ? Object.entries(course).reduce((form, [key, value]) => {
      if (value === undefined || value === null || value === "") return form;
      form.append(key, Array.isArray(value) ? JSON.stringify(value) : value instanceof File ? value : String(value));
      return form;
    }, new FormData())
    : JSON.stringify(course);
  return await apiRequest<any>("/courses/create/", {
    method: "POST",
    body,
  });
}

export async function patchCourse(slug: string, data: Record<string, any>) {
  const body = data.thumbnail instanceof File
    ? Object.entries(data).reduce((form, [key, value]) => {
      if (value === undefined || value === null || value === "") return form;
      form.append(key, Array.isArray(value) ? JSON.stringify(value) : value instanceof File ? value : String(value));
      return form;
    }, new FormData())
    : JSON.stringify(data);
  return await apiRequest<any>(`/courses/${slug}/`, {
    method: "PATCH",
    body,
  });
}

export async function deleteCourse(slug: string) {
  return await apiRequest<void>(`/courses/${slug}/`, {
    method: "DELETE",
  });
}

export async function getCourse(slug: string) {
  try {
    const payload = await apiRequest<any>(`/courses/${slug}/`);
    return payload ?? null;
  } catch {
    return null;
  }
}

export async function getCourseLessons(courseSlug: string) {
  const readItems = (payload: any) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.results)) return payload.results;
    if (Array.isArray(payload?.lessons)) return payload.lessons;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  };

  try {
    const adminPayload = await apiRequest<any>(`/lessons/admin/course/${courseSlug}/`);
    return readItems(adminPayload);
  } catch {
    try {
    const payload = await apiRequest<any>(`/lessons/course/${courseSlug}/`);
    return readItems(payload);
    } catch {
      return [];
    }
  }
}

export async function getCourseReviews(courseSlug: string) {
  try {
    const payload = await apiRequest<any>(`/courses/${courseSlug}/reviews/`);
    return Array.isArray(payload) ? payload : payload?.results ?? [];
  } catch {
    return [];
  }
}

export async function getProfile() {
  return await apiRequest<any>("/auth/me/");
}

export async function patchProfile(data: Record<string, any>) {
  return await apiRequest<any>("/auth/me/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function getNotifications() {
  try {
    const payload = await apiRequest<any>("/notifications/");
    return (Array.isArray(payload) ? payload : payload?.results ?? []) as any[];
  } catch {
    return [];
  }
}

export async function getForumThreads(courseSlug: string) {
  try {
    const payload = await apiRequest<any>(`/forums/${courseSlug}/threads/`);
    return (Array.isArray(payload) ? payload : payload?.results ?? []) as any[];
  } catch {
    return [];
  }
}

export async function getAIProviders() {
  try {
    return await apiRequest<any>("/ai/providers/");
  } catch {
    return null;
  }
}

export async function generateCourseTitle(prompt: string) {
  try {
    return await apiRequest<any>("/ai/course/title/", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
  } catch {
    return null;
  }
}

export async function generateCourseDescription(prompt: string) {
  try {
    return await apiRequest<any>("/ai/course/desc/", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
  } catch {
    return null;
  }
}

export async function getCourseModules(slug: string) {
  try {
    const [modulePayload, lessonPayload] = await Promise.all([
      apiRequest<any>(`/lessons/modules/course/${slug}/`).catch(() => null),
      apiRequest<any>(`/lessons/admin/course/${slug}/`).catch(() => apiRequest<any>(`/lessons/course/${slug}/`)),
    ]);
    const moduleItems = Array.isArray(modulePayload) ? modulePayload : modulePayload?.results ?? modulePayload?.modules ?? modulePayload?.data ?? [];
    const payload = lessonPayload;
    const lessons = Array.isArray(payload) ? payload : payload?.results ?? [];
    // `_persisted: true` marks modules that already exist in the DB (real
    // char(32) ids) so the builder doesn't have to guess from id shape.
    const groups = new Map<string, any>(moduleItems.map((module: any, index: number) => [String(module.id), {
      ...module,
      id: String(module.id),
      title: module.title ?? `Module ${index + 1}`,
      description: module.description ?? "",
      module_order: Number(module.module_order ?? index + 1),
      lessons: [],
      _persisted: true,
    }]));
    lessons.forEach((lesson: any, index: number) => {
      const sourceModule = lesson?.module ?? lesson?.section ?? lesson?.chapter;
      const moduleId = String(typeof sourceModule === "string"
        ? sourceModule : sourceModule?.id ?? lesson?.module_id ?? lesson?.section_id ?? "module-unassigned");
      const group = groups.get(moduleId) ?? {
        id: moduleId,
        title: (typeof sourceModule === "object" ? sourceModule?.title ?? sourceModule?.name : undefined) ?? lesson?.module_title ?? "Course lessons",
        description: typeof sourceModule === "object" ? sourceModule?.description ?? "" : "",
        module_order: Number(lesson?.module_order ?? groups.size + 1),
        lessons: [],
        // This synthetic "unassigned" group isn't a real module row, so it
        // must NOT be treated as persisted - it needs to be created on save.
        _persisted: false,
      };
      group.lessons.push({
        id: lesson?.id ?? lesson?.slug ?? `lesson-${index + 1}`,
        title: lesson?.title ?? lesson?.name ?? `Lesson ${index + 1}`,
        // Preserve slug/description/content so a plain save doesn't
        // regenerate the slug or wipe out lesson content that the builder
        // UI has no fields for editing.
        slug: lesson?.slug ?? undefined,
        description: lesson?.description ?? "",
        content: lesson?.content ?? "",
        duration: typeof lesson?.duration === "number"
          ? formatDurationSeconds(lesson.duration)
          : lesson?.duration ?? lesson?.length ?? "15 min",
        type: toDisplayLessonType(lesson?.type ?? lesson?.lesson_type),
        videoUrl: lesson?.video_url_resolved ?? lesson?.video_url ?? lesson?.video?.url ?? "",
        _persisted: true,
      });
      groups.set(moduleId, group);
    });
    return Array.from(groups.values()).sort((left, right) => left.module_order - right.module_order);
  } catch {
    return [];
  }
}

export async function createTutorModule(courseSlug: string, data: Record<string, any>) {
  return await apiRequest<any>(`/lessons/modules/course/${courseSlug}/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTutorModule(moduleId: string, data: Record<string, any>) {
  return await apiRequest<any>(`/lessons/modules/${moduleId}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function createTutorLesson(courseSlug: string, data: Record<string, any>) {
  return await apiRequest<any>(`/lessons/admin/course/${courseSlug}/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTutorLesson(lessonId: string, data: Record<string, any>) {
  return await apiRequest<any>(`/lessons/admin/${lessonId}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteTutorLesson(lessonId: string) {
  return await apiRequest<void>(`/lessons/admin/${lessonId}/`, {
    method: "DELETE",
  });
}

export async function register(payload: {
  email: string;
  username: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}) {
  return await apiRequest<any>("/auth/register/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
const API_BASE = (import.meta.env?.VITE_API_BASE_URL as string | undefined) ?? "https://techbridge-backend-rust.vercel.app/api/v1";
const SUPABASE_MEDIA_URL = "https://xcxuhqghaddopvzhapgw.supabase.co/storage/v1/object/public/media";

export function resolveCourseMedia(value: unknown, folder: "audio" | "pdf" | "ppt") {
  const media = typeof value === "string"
    ? value.trim()
    : typeof value === "object" && value !== null
      ? String((value as { url?: unknown; path?: unknown; file?: unknown; name?: unknown }).url
        ?? (value as { path?: unknown }).path
        ?? (value as { file?: unknown }).file
        ?? (value as { name?: unknown }).name
        ?? "").trim()
      : "";
  if (!media) return "";
  if (/^https?:\/\/[^/]+\/storage\/v1\/s3\/media\//i.test(media)) {
    return media.replace(/\/storage\/v1\/s3\/media\//i, "/storage/v1/object/public/media/");
  }
  if (/^https?:\/\/[^/]+\/storage\/v1\/object\/public\/media\//i.test(media)) return media;
  if (/^https?:\/\//i.test(media) && !/\/media\//i.test(media)) return media;
  const filename = media.split(/[?#]/, 1)[0].replace(/\\/g, "/").split("/").pop();
  if (!filename) return "";
  let decodedFilename = filename;
  try {
    decodedFilename = decodeURIComponent(filename);
  } catch {
  }
  return `${SUPABASE_MEDIA_URL}/courses/${folder}/${encodeURIComponent(decodedFilename)}`;
}

type ApiEnvelope<T> = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
};

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  role?: string;
  avatar?: string | null;
  xp?: number;
  level?: number;
  streak_days?: number;
  courses_completed?: number;
  is_super_admin?: boolean;
};

export type AuthSession = {
  access: string;
  refresh: string;
  user: AuthUser;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  category: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
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
  progress?: number;
  modules: number;
  lessons: number;
  language?: string;
  instructorBio?: string;
  learningOutcomes?: string[];
  subtitles?: number;
  introVideoUrl?: string;
  raw?: Record<string, unknown>;
};

export type Certificate = {
  id: string;
  title: string;
  issued: string;
  credentialId: string;
  instructor: string;
};

export type QuizChoice = {
  id: string;
  label: string;
  value?: string;
  raw?: any;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  type: string;
  choices: QuizChoice[];
  raw?: any;
};

export type Quiz = {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  raw?: any;
};

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  publishedAt?: string;
  slug?: string;
  raw?: any;
};

export type Assignment = {
  id: string;
  title: string;
  course: string;
  due: string;
  status: string;
  type: string;
  raw?: any;
};

function getStorageKey() {
  return "bridge_skills_student_session";
}

function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(getStorageKey())
      ?? window.sessionStorage.getItem(getStorageKey());
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession | null, keepSignedIn?: boolean) {
  if (typeof window === "undefined") return;
  if (session) {
    const persist = keepSignedIn ?? (window.localStorage.getItem(getStorageKey()) !== null);
    const storage = persist ? window.localStorage : window.sessionStorage;
    const otherStorage = persist ? window.sessionStorage : window.localStorage;
    storage.setItem(getStorageKey(), JSON.stringify(session));
    otherStorage.removeItem(getStorageKey());
  } else {
    window.localStorage.removeItem(getStorageKey());
    window.sessionStorage.removeItem(getStorageKey());
  }
}

let refreshInFlight: Promise<boolean> | null = null;
let lessonCompletionEndpointUnavailable = false;
let lessonSyncEndpointUnavailable = false;
let lessonProgressEndpointUnavailable = false;

export function getStoredSession() {
  return readSession();
}

export function clearStoredSession() {
  writeSession(null);
  if (typeof window !== "undefined" && !window.location.pathname.replace(/\/$/, "").endsWith("/student")) {
    window.location.assign("/student");
  }
}

export function isAccessTokenExpired(token: string | undefined) {
  if (!token) return true;
  try {
    const payload = token.split(".")[1];
    if (!payload) return true;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=")));
    return typeof decoded?.exp === "number" && decoded.exp * 1000 <= Date.now() + 30_000;
  } catch {
    return true;
  }
}

async function refreshToken(): Promise<boolean> {
    if (refreshInFlight) return refreshInFlight;
    refreshInFlight = refreshTokenInternal();
    try {
      return await refreshInFlight;
    } finally {
      refreshInFlight = null;
    }
  }

  async function refreshTokenInternal(): Promise<boolean> {
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

export async function apiRequest<T>(path: string, init: RequestInit = {}, retried = false): Promise<T> {
  const headers = new Headers(init.headers);
  
  // Check if this is an auth path - don't send auth header for login/register
  const isAuthPath = path.includes("/auth/login/") || 
                     path.includes("/auth/register/") || 
                     path.includes("/auth/token/");
  
  let session = readSession();

  if (!isAuthPath && session?.access && isAccessTokenExpired(session.access) && session.refresh) {
    await refreshToken();
    session = readSession();
  }

  if (!isAuthPath && !session?.access) {
    const authError = new Error("Your student session has expired. Please sign in again.") as Error & { status?: number };
    authError.status = 401;
    throw authError;
  }
  
  // Only add Authorization header if we have a session AND it's not an auth path
  if (session?.access && !isAuthPath) {
    headers.set("Authorization", `Bearer ${session.access}`);
  }
  
  if (!headers.has("Content-Type") && init.body && typeof init.body === "string") {
    headers.set("Content-Type", "application/json");
  }

  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  console.log(`API Request: ${init.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, {
      ...init,
      headers,
    });

    if (!response.ok) {
      // Don't try to refresh token on login/register failures
      if (response.status === 401 && !retried && !isAuthPath && !path.includes("/auth/token/refresh/")) {
        console.log("Token expired, attempting refresh...");
        const refreshed = await refreshToken();
        if (refreshed) {
          console.log("Token refreshed, retrying request...");
          return apiRequest<T>(path, init, true);
        }
        clearStoredSession();
        const authError = new Error("Your student session has expired. Please sign in again.") as Error & { status?: number };
        authError.status = 401;
        throw authError;
      }

      let detail = "Request failed";
      try {
        const payload = await response.clone().json();
        detail = typeof payload === "string" ? payload : payload?.detail ?? payload?.message ?? JSON.stringify(payload);
      } catch {
        try {
          detail = await response.clone().text();
        } catch {
          detail = "Request failed";
        }
      }
      const requestError = new Error(detail || `Request failed with ${response.status}`) as Error & { status?: number };
      requestError.status = response.status;
      throw requestError;
    }

    if (response.status === 204) {
      return null as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    const status = (error as { status?: number })?.status;
    const isKnownLessonPersistenceFailure = status === 500
      && /^\/lessons\/[^/]+\/(complete|sync|progress)\/$/.test(path);
    if (!isKnownLessonPersistenceFailure) {
      console.error(`API Request failed for ${path}:`, error);
    }
    throw error;
  }
}

export async function getProfile() {
  try {
    return await apiRequest<any>("/auth/me/");
  } catch {
    return null;
  }
}

export async function patchProfile(data: Record<string, any>) {
  try {
    return await apiRequest<any>("/auth/me/", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  } catch {
    return null;
  }
}

export async function login(email: string, password: string, keepSignedIn = true) {
  try {
    console.log("Attempting login for:", email);
    
    // Clean inputs
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    
    if (!cleanEmail || !cleanPassword) {
      throw new Error("Email and password are required");
    }
    
    // Try with email field first
    try {
      const session = await apiRequest<AuthSession>("/auth/login/", {
        method: "POST",
        body: JSON.stringify({ 
          email: cleanEmail, 
          password: cleanPassword 
        }),
      });
      
      if (session?.access) {
        writeSession(session, keepSignedIn);
        console.log("Login successful with email");
        return session;
      }
      return null;
    } catch (emailError: any) {
      console.log("Email login failed, trying username...", emailError.message);
      
      // If email fails, try with username
      try {
        const session = await apiRequest<AuthSession>("/auth/login/", {
          method: "POST",
          body: JSON.stringify({ 
            username: cleanEmail, 
            password: cleanPassword 
          }),
        });
        
        if (session?.access) {
          writeSession(session, keepSignedIn);
          console.log("Login successful with username");
          return session;
        }
        return null;
      } catch (usernameError) {
        console.error("Username login failed too");
        throw emailError; // Throw the original error
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function logout() {
  try {
    await apiRequest("/auth/logout/", { method: "POST" });
  } catch {
    // ignore logout failures and clear locally
  }
  writeSession(null);
}

export async function register(payload: { 
  email: string; 
  username: string; 
  password: string; 
  password2: string; 
  first_name?: string; 
  last_name?: string; 
  role?: string 
}, keepSignedIn = true) {
  try {
    console.log("Attempting registration for:", payload.email);
    
    const resp = await apiRequest<any>("/auth/register/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    
    console.log("Registration response:", resp);
      if (resp?.access) {
        writeSession(resp as AuthSession, keepSignedIn);
      }
    return resp;
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
}

function titleCase(value: string) {
  const lower = (value || "").toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function formatCourseDuration(value: unknown) {
  const duration = String(value ?? "").trim();
  if (!duration) return "";
  const seconds = Number(duration);
  if (!Number.isFinite(seconds)) return duration;
  if (seconds <= 0) return "";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function normalizeLevel(value: string | undefined) {
  const level = (value || "beginner").toLowerCase();
  if (level === "advanced") return "Advanced" as const;
  if (level === "intermediate") return "Intermediate" as const;
  return "Beginner" as const;
}

function deriveThumbVariant(title: string, category: string) {
  const text = `${title} ${category}`.toLowerCase();
  if (text.includes("security") || text.includes("hacking")) return "security";
  if (text.includes("cloud") || text.includes("network")) return "network";
  if (text.includes("design") || text.includes("product")) return "design";
  if (text.includes("ai") || text.includes("machine") || text.includes("learning")) return "ai";
  if (text.includes("code") || text.includes("software") || text.includes("typescript")) return "code";
  return "code";
}

function deriveColor(category: string) {
  const name = category?.toLowerCase() ?? "";
  if (name.includes("cloud")) return "#1F6E5C";
  if (name.includes("security")) return "#0D2922";
  if (name.includes("ai") || name.includes("machine")) return "#D4A24E";
  if (name.includes("design")) return "#587267";
  return "#15803D";
}

function normalizeCourse(item: any): Course {
  const category = item?.category?.name ?? item?.category;
  const instructor = item?.instructor?.full_name ?? item?.instructor?.username ?? item?.instructor;
  const instructorTitle = item?.instructor?.headline ?? item?.instructor?.role;
  const rawModules = Array.isArray(item?.modules) ? item.modules : Array.isArray(item?.sections) ? item.sections : [];
  const lessons = Number(item?.total_lessons ?? item?.lesson_count ?? item?.lessons_count ?? (Array.isArray(item?.lessons) ? item.lessons.length : 0)) || 0;
  const moduleCount = Number(item?.total_modules ?? item?.module_count ?? item?.sections_count ?? item?.modules_count ?? rawModules.length) || 0;
  const students = Number(item?.total_students ?? item?.students ?? 0) || 0;
  const rating = Number(item?.avg_rating ?? item?.rating ?? 0) || 0;
  const reviews = Number(item?.total_reviews ?? item?.reviews ?? 0) || 0;
  const currency = String(item?.currency ?? item?.price_currency ?? "UGX").toUpperCase();
  const rawPrice = Number(item?.price ?? item?.amount ?? 0);
  const price = item?.pricing === "free" || rawPrice <= 0
    ? "Free"
    : rawPrice > 0
      ? `${currency} ${rawPrice.toLocaleString()}`
      : "";

  const introVideoUrl = item?.intro_video_url ?? item?.video_url ?? item?.youtube_url ?? item?.course_video_url ?? item?.preview_video_url;

  return {
    id: item?.id ?? item?.slug ?? `${item?.title ?? "course"}-${Math.random()}`,
    slug: item?.slug ?? item?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ?? "course",
    title: item?.title ?? "",
    instructor: instructor ?? "",
    instructorTitle: instructorTitle ?? "",
    category: category ?? "",
    level: item?.level ? normalizeLevel(item?.level) : undefined,
    duration: formatCourseDuration(item?.duration),
    students,
    rating,
    reviews,
    certificate: Boolean(item?.has_certificate),
    price,
    image: deriveThumbVariant(item?.title ?? "", category ?? ""),
    thumbnail: item?.thumbnail ?? item?.thumbnail_url ?? item?.thumbnail_url_resolved ?? item?.cover_image ?? item?.image ?? null,
    color: deriveColor(category ?? ""),
    description: String(item?.description ?? "").trim() || String(item?.subtitle ?? "").trim(),
    modules: Math.max(0, moduleCount),
    lessons,
    language: item?.language ?? item?.course_language ?? undefined,
    subtitles: Number(item?.subtitle_count ?? item?.subtitles ?? 0) || undefined,
    instructorBio: item?.instructor?.bio ?? item?.instructor_bio ?? item?.instructor_description ?? undefined,
    learningOutcomes: Array.isArray(item?.learning_outcomes)
      ? item.learning_outcomes
      : Array.isArray(item?.outcomes)
        ? item.outcomes
        : undefined,
    introVideoUrl: introVideoUrl ? String(introVideoUrl) : undefined,
    progress: item?.progress,
    raw: item,
  };
}

function normalizeQuizChoice(choice: any): QuizChoice {
  if (choice == null) {
    return { id: String(Math.random()), label: "Unknown", raw: choice };
  }

  const label = typeof choice === "string"
    ? choice
    : choice?.label ?? choice?.text ?? choice?.name ?? String(choice);
  const id = typeof choice === "string"
    ? choice
    : choice?.id?.toString() ?? choice?.value?.toString() ?? label;

  return {
    id,
    label,
    value: choice?.value ?? choice?.id,
    raw: choice,
  };
}

function normalizeQuizQuestion(item: any): QuizQuestion {
  const choices = Array.isArray(item?.choices)
    ? item.choices.map(normalizeQuizChoice)
    : Array.isArray(item?.options)
      ? item.options.map(normalizeQuizChoice)
      : [];

  return {
    id: item?.id?.toString() ?? item?.question?.toString() ?? `question-${Math.random()}`,
    prompt: item?.question ?? item?.prompt ?? item?.text ?? "Question",
    type: item?.type ?? (choices.length ? "multiple_choice" : "open_ended"),
    choices,
    raw: item,
  };
}

function normalizeQuiz(item: any): Quiz {
  return {
    id: item?.id?.toString() ?? item?.slug ?? `${item?.title ?? "quiz"}-${Math.random()}`,
    title: item?.title ?? item?.name ?? "Quick check",
    description: item?.description ?? item?.summary ?? "",
    questions: Array.isArray(item?.questions) ? item.questions.map(normalizeQuizQuestion) : [],
    raw: item,
  };
}

function normalizeBlogPost(item: any): BlogPost {
  return {
    id: item?.id?.toString() ?? item?.slug ?? `${item?.title ?? "post"}-${Math.random()}`,
    title: item?.title ?? item?.headline ?? "Blog post",
    summary: item?.summary ?? item?.excerpt ?? item?.description ?? "",
    publishedAt: item?.published_at ?? item?.date ?? item?.created_at,
    slug: item?.slug,
    raw: item,
  };
}

function normalizeAssignment(item: any): Assignment {
  return {
    id: item?.id?.toString() ?? `${item?.title ?? "assignment"}-${Math.random()}`,
    title: item?.title ?? item?.name ?? "Assignment",
    course: item?.course?.title ?? item?.course ?? item?.course_name ?? "Course",
    due: item?.due_date ?? item?.due ?? item?.deadline ?? "TBD",
    status: item?.status ?? item?.state ?? "Pending",
    type: item?.type ?? item?.assignment_type ?? "Task",
    raw: item,
  };
}

// ===================== COURSE FUNCTIONS =====================

export async function getCourses(query?: string | URLSearchParams): Promise<Course[]> {
  try {
    const queryString = query ? `?${String(query)}` : "";
    const payload = await apiRequest<ApiEnvelope<any> | any>(`/courses/${queryString}`);
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return (list as any[]).map(normalizeCourse);
  } catch {
    return [];
  }
}

export async function getCourse(slug: string): Promise<Course | null> {
  try {
    const course = await apiRequest<any>(`/courses/${slug}/`);
    return normalizeCourse(course);
  } catch {
    return null;
  }
}

// ===================== ENROLLMENT FUNCTIONS =====================

export async function getMyEnrollments() {
  try {
    const payload = await apiRequest<ApiEnvelope<any> | any>("/enrollments/");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return (list as any[]).map((item) => {
      const courseData = item?.course ?? item?.course_detail ?? item?.course_data ?? item?.enrolled_course;
      const progress = typeof item?.progress === "object"
        ? item.progress?.percentage ?? item.progress?.progress ?? item.progress?.completion_percentage
        : item?.progress ?? item?.completion_percentage ?? item?.completion;
      return {
        id: item?.id,
        course: courseData ? normalizeCourse(courseData) : null,
        status: item?.status,
        progress: Number(progress ?? courseData?.progress ?? 0),
        enrolledAt: item?.enrolled_at ?? item?.created_at,
      };
    });
  } catch {
    return [];
  }
}

export async function checkCourseEnrollment(courseSlug: string) {
  try {
    return await apiRequest<any>(`/enrollments/${courseSlug}/check/`);
  } catch {
    return null;
  }
}

// ===================== CERTIFICATE FUNCTIONS =====================

export async function getMyCertificates(): Promise<Certificate[]> {
  try {
    const payload = await apiRequest<ApiEnvelope<any> | any>("/certificates/mine/");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return (list as any[]).map((item, index) => ({
      id: item?.id ?? `${index}`,
      title: item?.course?.title ?? item?.title ?? "Certificate",
      issued: item?.issued_at ? new Date(item.issued_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Recent",
      credentialId: item?.credential_id ?? item?.credentialId ?? `TBS-${index + 1}`,
      instructor: item?.instructor?.full_name ?? item?.instructor ?? "TechBridge",
    }));
  } catch {
    return [];
  }
}

// ===================== WISHLIST FUNCTIONS =====================

export async function getWishlistCourses(): Promise<Course[]> {
  try {
    const payload = await apiRequest<ApiEnvelope<any> | any>("/courses/wishlist/");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return (list as any[]).map((item) => normalizeCourse(item?.course ?? item));
  } catch {
    return [];
  }
}

// ===================== FEATURES FUNCTIONS =====================

export async function getLearningPaths() {
  try {
    const payload = await apiRequest<ApiEnvelope<any> | any>("/features/learning-paths/");
    return (Array.isArray(payload) ? payload : payload?.results ?? []) as any[];
  } catch {
    return [];
  }
}

export async function getJobs() {
  try {
    const payload = await apiRequest<ApiEnvelope<any> | any>("/features/jobs/");
    return (Array.isArray(payload) ? payload : payload?.results ?? []) as any[];
  } catch {
    return [];
  }
}

export async function getScholarships() {
  try {
    const payload = await apiRequest<ApiEnvelope<any> | any>("/features/scholarships/");
    return (Array.isArray(payload) ? payload : payload?.results ?? []) as any[];
  } catch {
    return [];
  }
}

// ===================== BLOG FUNCTIONS =====================

export async function getBlogPosts(query?: string | URLSearchParams): Promise<BlogPost[]> {
  try {
    const queryText = query ? String(query).replace(/^\?/, "") : "";
    const payload = await apiRequest<ApiEnvelope<any> | any>(`/blog/${queryText ? `?${queryText}` : ""}`);
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return (list as any[]).map(normalizeBlogPost);
  } catch {
    return [];
  }
}

// ===================== ASSIGNMENT FUNCTIONS =====================

export async function getAssignments(): Promise<Assignment[]> {
  try {
    const payload = await apiRequest<ApiEnvelope<any> | any>("/assignments/");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return (list as any[]).map(normalizeAssignment);
  } catch {
    return [];
  }
}

// ===================== NOTIFICATION FUNCTIONS =====================

export async function getNotifications() {
  try {
    const payload = await apiRequest<ApiEnvelope<any> | any>("/notifications/");
    return (Array.isArray(payload) ? payload : payload?.results ?? []) as any[];
  } catch {
    return [];
  }
}

export async function markNotificationsRead() {
  try {
    return await apiRequest<any>("/notifications/read/", { method: "POST" });
  } catch {
    return null;
  }
}

// ===================== GAMIFICATION FUNCTIONS =====================

export async function getGamificationSummary() {
  try {
    const payload = await apiRequest<any>("/gamification/badges/mine/");
    return payload;
  } catch {
    return null;
  }
}

export async function getLeaderboard() {
  try {
    const payload = await apiRequest<any>("/gamification/leaderboard/");
    return (Array.isArray(payload) ? payload : payload?.results ?? []) as any[];
  } catch {
    return [];
  }
}

// ===================== QUIZ FUNCTIONS =====================

export async function getQuizzesForCourse(courseSlug: string): Promise<Quiz[]> {
  try {
    const payload = await apiRequest<any>(`/quizzes/course/${courseSlug}/`);
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return (list as any[]).map(normalizeQuiz);
  } catch {
    return [];
  }
}

export async function getQuiz(quizId: string): Promise<Quiz | null> {
  try {
    const quiz = await apiRequest<any>(`/quizzes/${quizId}/`);
    return normalizeQuiz(quiz);
  } catch {
    return null;
  }
}

export async function submitQuizAnswers(quizId: string, answers: Record<string, unknown>) {
  try {
    return await apiRequest<any>(`/quizzes/${quizId}/submit/`, {
      method: "POST",
      body: JSON.stringify(answers),
    });
  } catch {
    return null;
  }
}

// ===================== PAYMENT FUNCTIONS =====================

export async function getPaymentHistory() {
  try {
    const payload = await apiRequest<any>("/payments/history/");
    return (Array.isArray(payload) ? payload : payload?.results ?? []) as any[];
  } catch {
    return [];
  }
}

export async function initiatePayment(provider: "mtn" | "stripe", payload: Record<string, unknown>) {
  try {
    return await apiRequest<any>(`/payments/${provider}/`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch {
    return null;
  }
}

// ===================== CERTIFICATE VERIFICATION =====================

export async function verifyCertificate(number: string) {
  try {
    return await apiRequest<any>(`/certificates/verify/${number}/`);
  } catch {
    return null;
  }
}

// ===================== LESSON FUNCTIONS =====================

export async function markLessonComplete(lessonId: string) {
  if (lessonCompletionEndpointUnavailable) return null;
  try {
    const response = await apiRequest<any>(`/lessons/${lessonId}/complete/`, {
      method: "POST",
      body: JSON.stringify({}),
    });
    return response ?? { success: true };
  } catch (error) {
    if ((error as { status?: number })?.status && (error as { status?: number }).status! >= 500) {
      lessonCompletionEndpointUnavailable = true;
    }
    return null;
  }
}

export async function syncLessonProgress(lessonId: string, position: number, watchTime: number) {
  if (lessonSyncEndpointUnavailable) return null;
  try {
    return await apiRequest<any>(`/lessons/${lessonId}/sync/`, {
      method: "POST",
      body: JSON.stringify({ position, watch_time: watchTime }),
    });
  } catch (error) {
    if ((error as { status?: number })?.status && (error as { status?: number }).status! >= 500) {
      lessonSyncEndpointUnavailable = true;
    }
    return null;
  }
}

export async function getLessonProgress(lessonId: string) {
  if (lessonProgressEndpointUnavailable) return null;
  try {
    return await apiRequest<any>(`/lessons/${lessonId}/progress/`);
  } catch (error) {
    if ((error as { status?: number })?.status && (error as { status?: number }).status! >= 500) {
      lessonProgressEndpointUnavailable = true;
    }
    return null;
  }
}

// ===================== USER FUNCTIONS =====================

export async function getMeStats() {
  try {
    const stats = await apiRequest<any>("/auth/me/stats/");
    return stats;
  } catch {
    return null;
  }
}

export async function getMe() {
  try {
    return await apiRequest<any>("/auth/me/");
  } catch {
    return null;
  }
}

// ===================== COURSE MODULES =====================

export async function getCourseModules(slug: string) {
  const readOrder = (item: any, keys: string[], fallback: number) => {
    for (const key of keys) {
        const value = Number(item?.[key]);
      if (Number.isFinite(value)) return value;
    }
      const titleMatch = String(item?.title ?? item?.name ?? "").match(/(?:module|lesson)\s*(?:[-:.#]\s*)?(\d+)/i)
        ?? String(item?.title ?? item?.name ?? "").match(/^\s*(\d+)[.):\s]/);
      if (titleMatch) return Number(titleMatch[1]);
    return fallback;
  };
  const formatLessonDuration = (value: any) => {
    if (value === null || value === undefined || value === "") return "";
    if (typeof value === "string" && /[a-z]/i.test(value)) return value;
    const seconds = Number(value);
    if (!Number.isFinite(seconds) || seconds <= 0) return "";
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };
  const readItems = (payload: any) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.results)) return payload.results;
    if (Array.isArray(payload?.modules)) return payload.modules;
    if (Array.isArray(payload?.sections)) return payload.sections;
    if (Array.isArray(payload?.lessons)) return payload.lessons;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  };
  const getPersistedModuleTitle = (lesson: any) => {
    if (lesson?.module_title) return String(lesson.module_title);
    const rawContent = String(lesson?.content ?? lesson?.body ?? lesson?.text ?? "");
    const marker = rawContent.match(/\[\[bridge-module:([^\]]+)\]\]/i);
    if (!marker) return "";
    try {
      return decodeURIComponent(marker[1]);
    } catch {
      return marker[1];
    }
  };
  const normalizeLesson = (lesson: any, index: number) => ({
    ...lesson,
    id: String(lesson?.id ?? lesson?.slug ?? `lesson-${index + 1}`),
    title: lesson?.title ?? lesson?.name ?? `Lesson ${index + 1}`,
    duration: formatLessonDuration(lesson?.duration ?? lesson?.length ?? lesson?.estimated_duration),
    video_url: lesson?.video_url_resolved
      ?? lesson?.video_url
      ?? lesson?.video?.url
      ?? lesson?.content_url
      ?? lesson?.media_url
      ?? "",
    audio_file: resolveCourseMedia(lesson?.audio_file ?? lesson?.audio_url ?? lesson?.audio, "audio"),
    pdf_file: resolveCourseMedia(lesson?.pdf_file ?? lesson?.pdf_url ?? lesson?.pdf, "pdf"),
    ppt_file: resolveCourseMedia(lesson?.ppt_file ?? lesson?.ppt_url ?? lesson?.ppt ?? lesson?.powerpoint, "ppt"),
    ...(() => {
      const rawContent = String(lesson?.content ?? lesson?.body ?? lesson?.text ?? lesson?.description ?? "");
      const marker = rawContent.match(/\[\[bridge-module:([^\]]+)\]\]/);
      return {
        moduleTitle: lesson?.module_title ?? (marker ? (() => {
          try {
            return decodeURIComponent(marker[1]);
          } catch {
            return marker[1];
          }
        })() : ""),
        content: rawContent.replace(/\[\[bridge-module:[^\]]+\]\]\s*/i, "").trim(),
      };
    })(),
    completed: Boolean(lesson?.completed ?? lesson?.is_completed),
  });

  const normalizeModules = (items: any[]) => items
    .map((module, index) => ({
      ...module,
      id: String(module?.id ?? module?.slug ?? `module-${index + 1}`),
      title: module?.title ?? module?.name ?? `Module ${index + 1}`,
      description: module?.description ?? "",
      module_order: readOrder(module, ["module_order", "order", "position", "sequence", "module_number", "module_index", "sort_order", "index", "number"], Number.MAX_SAFE_INTEGER - index),
      lessons: (Array.isArray(module?.lessons) ? module.lessons : Array.isArray(module?.lesson_set) ? module.lesson_set : [])
        .map(normalizeLesson)
        .sort((left: any, right: any) => readOrder(left, ["lesson_order", "order", "position", "sequence", "lesson_number", "lesson_index", "sort_order", "index", "number"], 0)
          - readOrder(right, ["lesson_order", "order", "position", "sequence", "lesson_number", "lesson_index", "sort_order", "index", "number"], 0)),
    }))
    .sort((left, right) => left.module_order - right.module_order);

  const groupLessons = (lessons: any[]) => {
    const groups = new Map<string, any>();
    const unassignedLessons: any[] = [];
    [...lessons]
      .sort((left, right) => readOrder(left, ["lesson_order", "order", "position", "sequence", "lesson_number"], 0)
        - readOrder(right, ["lesson_order", "order", "position", "sequence", "lesson_number"], 0))
      .forEach((lesson, index) => {
      const sourceModule = lesson?.module ?? lesson?.section ?? lesson?.chapter;
      const moduleId = typeof sourceModule === "string"
        ? sourceModule
        : sourceModule?.id ?? lesson?.module_id ?? lesson?.section_id;
      if (!moduleId) {
        unassignedLessons.push(normalizeLesson(lesson, index));
        return;
      }
      const moduleTitle = (typeof sourceModule === "object" ? sourceModule?.title ?? sourceModule?.name : undefined)
        ?? lesson?.module_title
        ?? getPersistedModuleTitle(lesson);
      const existing = groups.get(moduleId);
      const group = existing ?? {
        id: String(moduleId),
        title: moduleTitle ?? lesson?.section_title ?? "Course module",
        description: sourceModule?.description ?? "",
        module_order: readOrder(typeof sourceModule === "object" ? sourceModule : lesson,
          ["module_order", "order", "position", "sequence", "module_number"],
          readOrder(lesson, ["module_order"], groups.size + 1)),
        lessons: [],
      };
      group.lessons.push(normalizeLesson(lesson, index));
      groups.set(moduleId, group);
      });
    if (unassignedLessons.length > 0) {
      groups.set("module-unassigned", {
        id: "module-unassigned",
        title: "Course lessons",
        description: "These lessons have not been assigned to a course module yet.",
        module_order: Number.MAX_SAFE_INTEGER,
        lessons: unassignedLessons,
      });
    }
    return Array.from(groups.values()).sort((left, right) => left.module_order - right.module_order);
  };

  let lessons: any[] = [];
  let courseModules: any[] = [];
  try {
    const [lessonPayload, coursePayload] = await Promise.all([
      apiRequest<any>(`/lessons/course/${slug}/`).catch(() => null),
      apiRequest<any>(`/courses/${slug}/`).catch(() => null),
    ]);
    lessons = readItems(lessonPayload);
    courseModules = readItems(coursePayload).filter((item: any) => Array.isArray(item?.lessons) || Array.isArray(item?.lesson_set) || item?.module_order !== undefined);
  } catch {}

  const normalizedModules = normalizeModules(courseModules);
  const groupedLessons = groupLessons(lessons);
  if (normalizedModules.length === 0) return groupedLessons;

  const lessonsByModule = new Map(groupedLessons.map((module) => [String(module.id), module.lessons]));
  return normalizedModules.map((module) => ({
    ...module,
    lessons: lessonsByModule.get(String(module.id)) ?? module.lessons,
  }));
}

// ===================== ENROLLMENT PROGRESS =====================

export async function getEnrollmentProgress(enrollmentId: string) {
  try {
    return await apiRequest<any>(`/enrollments/${enrollmentId}/progress/`);
  } catch {
    return null;
  }
}

// ===================== REVIEW FUNCTIONS =====================

export async function getCourseReviews(courseSlug: string) {
  try {
    const payload = await apiRequest<any>(`/courses/${courseSlug}/reviews/`);
    return (Array.isArray(payload) ? payload : payload?.results ?? []) as any[];
  } catch {
    return [];
  }
}

export async function createCourseReview(courseSlug: string, data: { rating: number; comment: string }) {
  try {
    return await apiRequest<any>(`/courses/${courseSlug}/reviews/`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch {
    return null;
  }
}

// ===================== WISHLIST MANAGEMENT =====================

export async function addToWishlist(courseSlug: string) {
  try {
    const response = await apiRequest<any>(`/courses/${courseSlug}/wishlist/`, {
      method: "POST",
    });
    return response ?? { success: true };
  } catch {
    return null;
  }
}

export async function removeFromWishlist(courseSlug: string) {
  try {
    const response = await apiRequest<any>(`/courses/${courseSlug}/wishlist/`, {
      method: "POST",
    });
    return response ?? { success: true };
  } catch {
    return null;
  }
}

// ===================== ENROLLMENT MANAGEMENT =====================

export async function enrollInCourse(courseSlug: string) {
  return await apiRequest<any>(`/enrollments/${courseSlug}/enroll/`, { method: "POST" });
}

// ===================== CERTIFICATE DOWNLOAD =====================

export async function downloadCertificate(certificateId: string) {
  try {
    const response = await apiRequest<any>(`/certificates/${certificateId}/download/`, {
      method: "GET",
    });
    return response;
  } catch {
    return null;
  }
}

export function sortCourseModules<T extends { title?: unknown; name?: unknown; module_order?: unknown; order?: unknown; position?: unknown; sequence?: unknown; module_number?: unknown }>(modules: T[]) {
  return modules
    .map((module, index) => ({ module, index }))
    .sort((left, right) => {
      const getPriority = (value: T) => {
        const title = String(value.title ?? value.name ?? "").toLowerCase();
        if (/\b(introduction|intro|welcome|get started)\b/.test(title)) return 0;
        if (/\b(conclusion|summary|final|wrap[- ]?up)\b/.test(title)) return Number.MAX_SAFE_INTEGER;
        return null;
      };
      const leftPriority = getPriority(left.module);
      const rightPriority = getPriority(right.module);
      if (leftPriority !== null || rightPriority !== null) return (leftPriority ?? 1) - (rightPriority ?? 1);
      const leftOrder = Number(left.module.module_order ?? left.module.order ?? left.module.position ?? left.module.sequence ?? left.module.module_number);
      const rightOrder = Number(right.module.module_order ?? right.module.order ?? right.module.position ?? right.module.sequence ?? right.module.module_number);
      return (Number.isFinite(leftOrder) ? leftOrder : left.index) - (Number.isFinite(rightOrder) ? rightOrder : right.index);
    })
    .map(({ module }) => module);
}

const LOCAL_WISHLIST_KEY = "bridge-student-wishlist";

export function getLocalWishlistCourses(): Course[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(window.localStorage.getItem(LOCAL_WISHLIST_KEY) ?? "[]");
    return Array.isArray(saved) ? saved as Course[] : [];
  } catch {
    return [];
  }
}

export function toggleLocalWishlist(course: Course) {
  const current = getLocalWishlistCourses();
  const exists = current.some((item) => item.slug === course.slug);
  const next = exists ? current.filter((item) => item.slug !== course.slug) : [...current, course];
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(next));
  }
  return !exists;
}

export function removeLocalWishlist(courseSlug: string) {
  const next = getLocalWishlistCourses().filter((item) => item.slug !== courseSlug);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(next));
  }
}
// api.ts - Admin portal API client (enhanced, auth-safe version)

export type Course = {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  category: string;
  level?: string;
  duration: string;
  students: number;
  rating?: number;
  reviews?: number;
  certificate?: boolean;
  price?: string;
  image: string;
  thumbnail?: string | null;
  color: string;
  description: string;
  progress?: number;
  modules: number;
};

export type Tutor = {
  id: string;
  name: string;
  specialty: string;
  students: number;
  courses: number;
  rating: number;
  status: string;
};

export type User = {
  id: string;
  full_name: string;
  username: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
  created_at?: string;
  is_verified?: boolean;
  avatar?: string;
};

export type CourseDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  instructor_id?: string;
  category: string;
  category_id?: string;
  level: string;
  duration: string;
  total_students: number;
  students: number;
  total_lessons: number;
  modules: number;
  lessons: number;
  avg_rating: number;
  rating: number;
  reviews: number;
  pricing: "free" | "paid";
  is_paid: boolean;
  price: number;
  amount: number;
  status: "published" | "draft" | "archived";
  is_published: boolean;
  image: string;
  color: string;
  certificate: boolean;
  created_at: string;
  updated_at: string;
};

export type DashboardStats = {
  users: {
    total: number;
    students: number;
    instructors: number;
    admins: number;
  };
  courses: {
    total: number;
    published: number;
    draft: number;
    archived: number;
  };
  enrollments: {
    total: number;
    active: number;
    completed: number;
    dropped: number;
  };
  certificates: number;
  blog_posts: number;
  revenue?: {
    total: number;
    monthly: number;
    yearly: number;
  };
};

export type DailyActivity = {
  date: string;
  day?: string;
  new_users: number;
  count?: number;
  new_enrollments?: number;
  active_users?: number;
};

const API_BASE = (import.meta.env?.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8001/api/v1";

// If your backend's TokenObtainPairSerializer expects "username" instead of
// "email", change this. Confirm once with curl rather than guessing:
//   curl -i -X POST $API_BASE/auth/login/ -H "Content-Type: application/json" \
//     -d '{"email":"admin@example.com","password":"..."}'
const LOGIN_IDENTIFIER_FIELD: "email" | "username" = "email";

function formatTotalDuration(totalSeconds: number, fallback: string) {
  if (!totalSeconds) return fallback;
  const totalMinutes = Math.round(totalSeconds / 60);
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
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
    const payload = await apiRequest<any>(`/lessons/admin/course/${slug}/`);
    const lessons = Array.isArray(payload) ? payload : payload?.results ?? payload?.lessons ?? payload?.data ?? [];
    const totalSeconds = lessons.reduce((sum: number, lesson: any) => sum + lessonDurationSeconds(lesson?.duration), 0);
    return lessons.length > 0 ? formatTotalDuration(totalSeconds, "0 min") : fallback;
  } catch {
    return fallback;
  }
}

function getStorageKey() {
  return "bridge_skills_admin_session";
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

// Paths that must NEVER get a Bearer header attached, and must never trigger
// a refresh-and-retry on 401. SimpleJWT's JWTAuthentication raises 401
// "Given token not valid for any token type" if an Authorization header is
// present and invalid — even on AllowAny views — so a stale/expired session
// sitting in localStorage can silently break login/refresh unless these are
// explicitly excluded from ever carrying a token.
const PUBLIC_PATHS = ["/auth/login/", "/auth/register/", "/auth/token/"];

function isPublicPath(path: string) {
  return PUBLIC_PATHS.some((p) => path.includes(p));
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

/**
 * EXPORTED authenticated API request function.
 * Attaches the Authorization header automatically for non-public paths,
 * refreshes and retries once on 401, and safely reads the error body even
 * when JSON parsing fails (via response.clone()).
 */
export async function apiRequest<T>(path: string, init: RequestInit = {}, retried = false): Promise<T> {
  const headers = new Headers(init.headers);
  const isAuthPath = isPublicPath(path);
  const session = readSession();

  if (session?.access && !isAuthPath) headers.set("Authorization", `Bearer ${session.access}`);
  if (!headers.has("Content-Type") && init.body && typeof init.body === "string") headers.set("Content-Type", "application/json");

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path.startsWith("/") ? path : `/${path}`}`, { ...init, headers });
  } catch (networkError) {
    console.error(`Network error for ${path}:`, networkError);
    throw new Error("Unable to reach the server. Check your connection and try again.");
  }

  if (!response.ok) {
    if (response.status === 401 && !retried && !isAuthPath) {
      const refreshed = await refreshToken();
      if (refreshed) {
        return apiRequest<T>(path, init, true);
      }
    }

    let detail = "Request failed";
    try {
      // clone() is required: once .json() or .text() consumes the body
      // stream, calling the other on the same response object will throw.
      const payload = await response.clone().json();
      detail = typeof payload === "string" ? payload : payload?.detail ?? payload?.message ?? JSON.stringify(payload);
    } catch {
      try {
        detail = await response.clone().text();
      } catch {
        detail = `Request failed with ${response.status}`;
      }
    }
    throw new Error(detail || `Request failed with ${response.status}`);
  }
  if (response.status === 204) return null as T;
  return (await response.json()) as T;
}

/**
 * Decodes a JWT payload without verifying the signature (client-side only,
 * for reading claims like role/user_id). Never trust this for security
 * decisions server-side — it's just for UI branching.
 */
export function decodeJwt(token: string): any | null {
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

/**
 * Single-attempt login using LOGIN_IDENTIFIER_FIELD. Throws with the real
 * server-provided error message on failure — callers should surface
 * err.message directly rather than a generic fallback.
 */
export async function login(identifier: string, password: string) {
  const cleanIdentifier = identifier.trim();
  const cleanPassword = password.trim();

  if (!cleanIdentifier || !cleanPassword) {
    throw new Error("Email and password are required");
  }

  const body =
    LOGIN_IDENTIFIER_FIELD === "email"
      ? { email: cleanIdentifier, password: cleanPassword }
      : { username: cleanIdentifier, password: cleanPassword };

  const session = await apiRequest<any>("/auth/login/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!session?.access) {
    throw new Error("Login response did not include an access token.");
  }

  writeSession(session);
  return session;
}

/**
 * Fetches the profile of the currently authenticated user.
 * ADJUST THIS PATH to match your backend — common options:
 *   "/auth/me/"  "/users/me/"  "/auth/user/"  "/accounts/profile/"
 * Check your Network tab or backend urls.py to confirm.
 */
export async function getCurrentUser() {
  return apiRequest<any>("/auth/me/");
}

/**
 * Resolves the current user's role, trying the JWT claims first
 * (no extra network request) and falling back to a profile fetch.
 */
export async function getCurrentUserRole(accessToken?: string): Promise<string | null> {
  if (accessToken) {
    const claims = decodeJwt(accessToken);
    if (claims?.role) return claims.role;
  }
  try {
    const me = await getCurrentUser();
    return me?.role ?? null;
  } catch {
    return null;
  }
}

export async function logout() {
  try {
    await apiRequest("/auth/logout/", { method: "POST" });
  } catch {}
  writeSession(null);
}

// ===================== ENHANCED API FUNCTIONS =====================

/**
 * Get dashboard statistics with proper typing and fallbacks
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await apiRequest<any>("/analytics/stats/");
    const data = response?.data || response;

    return {
      users: {
        total: data?.users?.total || data?.learners || 0,
        students: data?.users?.students || data?.learners || 0,
        instructors: data?.users?.instructors || data?.tutors || 0,
        admins: data?.users?.admins || 0,
      },
      courses: {
        total: data?.courses?.total || data?.courses || 0,
        published: data?.courses?.published || 0,
        draft: data?.courses?.draft || 0,
        archived: data?.courses?.archived || 0,
      },
      enrollments: {
        total: data?.enrollments?.total || 0,
        active: data?.enrollments?.active || 0,
        completed: data?.enrollments?.completed || 0,
        dropped: data?.enrollments?.dropped || 0,
      },
      certificates: data?.certificates || 0,
      blog_posts: data?.blog_posts || 0,
      revenue: data?.revenue || undefined,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      users: { total: 0, students: 0, instructors: 0, admins: 0 },
      courses: { total: 0, published: 0, draft: 0, archived: 0 },
      enrollments: { total: 0, active: 0, completed: 0, dropped: 0 },
      certificates: 0,
      blog_posts: 0,
    };
  }
}

/**
 * Get daily activity data with proper formatting
 */
export async function getAnalyticsDailyActivity(): Promise<DailyActivity[]> {
  try {
    const response = await apiRequest<any>("/analytics/daily/");
    const data = Array.isArray(response) ? response : (response?.data || response?.results || []);

    return data.map((item: any) => ({
      date: item?.date || item?.day || "",
      day: item?.day || item?.date || "",
      new_users: Number(item?.new_users || item?.count || 0),
      count: Number(item?.count || item?.new_users || 0),
      new_enrollments: Number(item?.new_enrollments || 0),
      active_users: Number(item?.active_users || 0),
    }));
  } catch (error) {
    console.error("Error fetching daily activity:", error);
    return [];
  }
}

/**
 * Get users with pagination and proper role mapping
 */
export async function getUsers(pageSize?: number, page: number = 1) {
  try {
    const url = pageSize ? `/users/?page_size=${pageSize}&page=${page}` : "/users/";
    const payload = await apiRequest<any>(url);
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    const total = payload?.count ?? list.length;

    return {
      results: list.map(
        (item: any): User => ({
          id: item?.id || "",
          full_name: item?.full_name || item?.name || item?.username || "User",
          username: item?.username || "",
          email: item?.email || "",
          role: item?.role || item?.user_type || item?.type || "student",
          first_name: item?.first_name || "",
          last_name: item?.last_name || "",
          created_at: item?.created_at || "",
          is_verified: item?.is_verified || false,
          avatar: item?.avatar || "",
        })
      ),
      total,
      page,
      pageSize: pageSize || list.length,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { results: [], total: 0, page: 1, pageSize: 0 };
  }
}

/**
 * Get recent users with enhanced data
 */
export async function getRecentUsers(pageSize: number = 6): Promise<{ results: User[]; total: number }> {
  try {
    const payload = await apiRequest<any>(`/users/?page_size=${pageSize}&ordering=-created_at`);
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    const total = payload?.count ?? list.length;

    return {
      results: list.map(
        (item: any): User => ({
          id: item?.id || "",
          full_name: item?.full_name || item?.name || item?.username || "User",
          username: item?.username || "",
          email: item?.email || "",
          role: item?.role || item?.user_type || item?.type || "student",
          first_name: item?.first_name || "",
          last_name: item?.last_name || "",
          created_at: item?.created_at || "",
          is_verified: item?.is_verified || false,
          avatar: item?.avatar || "",
        })
      ),
      total,
    };
  } catch (error) {
    console.error("Error fetching recent users:", error);
    return { results: [], total: 0 };
  }
}

/**
 * Get students (users with role student)
 */
export async function getStudents() {
  try {
    const payload = await apiRequest<any>("/users/?role=student");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return list.map(
      (item: any): User => ({
        id: item?.id || "",
        full_name: item?.full_name || item?.name || item?.username || "Student",
        username: item?.username || "",
        email: item?.email || "",
        role: "student",
        first_name: item?.first_name || "",
        last_name: item?.last_name || "",
        created_at: item?.created_at || "",
        is_verified: item?.is_verified || false,
        avatar: item?.avatar || "",
      })
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

/**
 * Get instructors (users with role instructor)
 */
export async function getInstructors() {
  try {
    const payload = await apiRequest<any>("/users/?role=instructor");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return list.map(
      (item: any): User => ({
        id: item?.id || "",
        full_name: item?.full_name || item?.name || item?.username || "Instructor",
        username: item?.username || "",
        email: item?.email || "",
        role: "instructor",
        first_name: item?.first_name || "",
        last_name: item?.last_name || "",
        created_at: item?.created_at || "",
        is_verified: item?.is_verified || false,
        avatar: item?.avatar || "",
      })
    );
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return [];
  }
}

/**
 * Get courses with pagination and complete data
 */
export async function getCoursesWithPagination(pageSize: number = 5, page: number = 1) {
  try {
    const payload = await apiRequest<any>(`/courses/?page_size=${pageSize}&page=${page}&ordering=-total_students`);
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    const total = payload?.count ?? list.length;

    return {
      results: await Promise.all(list.map(
        async (item: any): Promise<CourseDetail> => ({
          id: item?.id || item?.slug || "",
          slug: item?.slug || "",
          title: item?.title || "Untitled Course",
          description: item?.description || "",
          instructor: item?.instructor?.full_name || item?.instructor_name || "Instructor",
          instructor_id: item?.instructor?.id || "",
          category: item?.category?.name || item?.category_name || "General",
          category_id: item?.category?.id || "",
          level: item?.level || "All Levels",
          duration: await getCourseDuration(item?.slug || item?.id, item?.duration || "0 hours"),
          total_students: Number(item?.total_students || item?.students || 0),
          students: Number(item?.students || item?.total_students || 0),
          total_lessons: Number(item?.total_lessons || item?.lessons || item?.modules || 0),
          modules: Number(item?.modules || item?.total_lessons || 0),
          lessons: Number(item?.lessons || item?.total_lessons || 0),
          avg_rating: Number(item?.avg_rating || item?.rating || 0),
          rating: Number(item?.rating || item?.avg_rating || 0),
          reviews: Number(item?.reviews || 0),
          pricing: item?.pricing === "paid" || (item?.price && item.price > 0) ? "paid" : "free",
          is_paid: item?.is_paid || (item?.price && item.price > 0) || false,
          price: Number(item?.price || item?.amount || 0),
          amount: Number(item?.amount || item?.price || 0),
          status: item?.status || (item?.is_published ? "published" : "draft"),
          is_published: item?.is_published || item?.status === "published",
          image: item?.image || "network",
          color: item?.color || "#1F6E5C",
          certificate: item?.certificate || false,
          created_at: item?.created_at || "",
          updated_at: item?.updated_at || "",
        })
      )),
      total,
      page,
      pageSize,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { results: [], total: 0, page: 1, pageSize };
  }
}

/**
 * Get all courses (simplified version)
 */
export async function getCourses() {
  try {
    const payload = await apiRequest<any>("/courses/");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return await Promise.all(list.map(
      async (item: any): Promise<Course> => ({
        id: item?.id || item?.slug || "",
        slug: item?.slug || "",
        title: item?.title || "Untitled Course",
        instructor: item?.instructor?.full_name || item?.instructor_name || "Instructor",
        category: item?.category?.name || item?.category_name || "General",
        level: item?.level || "All Levels",
        duration: await getCourseDuration(item?.slug || item?.id, item?.duration || "0 hours"),
        students: Number(item?.total_students || item?.students || 0),
        rating: Number(item?.avg_rating || item?.rating || 0),
        reviews: Number(item?.reviews || 0),
        certificate: item?.certificate || false,
        price: item?.price || "Free",
        image: item?.image || "network",
        color: item?.color || "#1F6E5C",
        description: item?.description || "",
        progress: item?.progress || 0,
        modules: Number(item?.modules || item?.total_lessons || 0),
      })
    ));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

/**
 * Get course by ID with full details
 */
export async function getCourseById(courseId: string): Promise<CourseDetail | null> {
  try {
    const payload = await apiRequest<any>(`/courses/${courseId}/`);
    const item = payload?.data || payload;

    if (!item) return null;

    return {
      id: item?.id || item?.slug || "",
      slug: item?.slug || "",
      title: item?.title || "Untitled Course",
      description: item?.description || "",
      instructor: item?.instructor?.full_name || item?.instructor_name || "Instructor",
      instructor_id: item?.instructor?.id || "",
      category: item?.category?.name || item?.category_name || "General",
      category_id: item?.category?.id || "",
      level: item?.level || "All Levels",
      duration: await getCourseDuration(item?.slug || item?.id, item?.duration || "0 hours"),
      total_students: Number(item?.total_students || item?.students || 0),
      students: Number(item?.students || item?.total_students || 0),
      total_lessons: Number(item?.total_lessons || item?.lessons || item?.modules || 0),
      modules: Number(item?.modules || item?.total_lessons || 0),
      lessons: Number(item?.lessons || item?.total_lessons || 0),
      avg_rating: Number(item?.avg_rating || item?.rating || 0),
      rating: Number(item?.rating || item?.avg_rating || 0),
      reviews: Number(item?.reviews || 0),
      pricing: item?.pricing === "paid" || (item?.price && item.price > 0) ? "paid" : "free",
      is_paid: item?.is_paid || (item?.price && item.price > 0) || false,
      price: Number(item?.price || item?.amount || 0),
      amount: Number(item?.amount || item?.price || 0),
      status: item?.status || (item?.is_published ? "published" : "draft"),
      is_published: item?.is_published || item?.status === "published",
      image: item?.image || "network",
      color: item?.color || "#1F6E5C",
      certificate: item?.certificate || false,
      created_at: item?.created_at || "",
      updated_at: item?.updated_at || "",
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

/**
 * Get tutors with their stats
 */
export async function getTutors(): Promise<Tutor[]> {
  try {
    const payload = await apiRequest<any>("/users/?role=instructor");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return list.map(
      (item: any): Tutor => ({
        id: item?.id || "",
        name: item?.full_name || item?.name || item?.username || "Tutor",
        specialty: item?.headline || item?.specialty || "Instructor",
        students: Number(item?.total_students || item?.students || 0),
        courses: Number(item?.courses_count || item?.courses || 0),
        rating: Number(item?.avg_rating || item?.rating || 0),
        status: item?.is_verified ? "Verified" : "Pending",
      })
    );
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return [];
  }
}

/**
 * Get categories with course counts
 */
export async function getCategories() {
  try {
    const payload = await apiRequest<any>("/categories/");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    const totalStudents = list.reduce((sum: number, cat: any) => sum + Number(cat?.total_students || 0), 0) || 1;

    return list.map((item: any) => ({
      id: item?.id || "",
      name: item?.name || "Uncategorized",
      students: Number(item?.total_students || 0),
      courses: Number(item?.courses_count || 0),
      percentage: totalStudents > 0 ? Math.round((Number(item?.total_students || 0) / totalStudents) * 100) : 0,
      color: item?.color || "#3B82F6",
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Get pending approvals
 */
export async function getPendingApprovals() {
  try {
    const payload = await apiRequest<any>("/approvals/pending/");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return list.map((item: any) => ({
      id: item?.id || "",
      title: item?.title || item?.name || "Item",
      submittedBy: item?.submitted_by?.full_name || item?.submitted_by || "User",
      type: item?.type || "General",
      timestamp: item?.created_at || item?.timestamp || new Date().toISOString(),
      status: item?.status || "pending",
    }));
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
    return [];
  }
}

/**
 * Get admin notifications
 */
export async function getAdminNotifications() {
  try {
    const payload = await apiRequest<any>("/notifications/");
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return list.map((item: any) => ({
      id: item?.id || "",
      title: item?.title || "Notification",
      message: item?.message || "",
      type: item?.type || "info",
      read: item?.read || false,
      created_at: item?.created_at || new Date().toISOString(),
      link: item?.link || "",
    }));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

/**
 * Get growth data for charts
 */
export async function getGrowthData(period: string = "30d") {
  try {
    const payload = await apiRequest<any>(`/analytics/growth/?period=${period}`);
    if (Array.isArray(payload)) return payload.map((v: any) => Number(v));
    if (payload?.data && Array.isArray(payload.data)) return payload.data.map((v: any) => Number(v));
    return [];
  } catch (error) {
    console.error("Error fetching growth data:", error);
    return [];
  }
}

/**
 * Get revenue data
 */
export async function getRevenueData(period: string = "30d") {
  try {
    const payload = await apiRequest<any>(`/analytics/revenue/?period=${period}`);
    return payload?.data || payload || [];
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return [];
  }
}

/**
 * Search users with filters
 */
export async function searchUsers(query: string, role?: string) {
  try {
    const url = role
      ? `/users/?search=${encodeURIComponent(query)}&role=${role}`
      : `/users/?search=${encodeURIComponent(query)}`;
    const payload = await apiRequest<any>(url);
    const list = Array.isArray(payload) ? payload : payload?.results ?? [];
    return list.map(
      (item: any): User => ({
        id: item?.id || "",
        full_name: item?.full_name || item?.name || item?.username || "User",
        username: item?.username || "",
        email: item?.email || "",
        role: item?.role || item?.user_type || item?.type || "student",
        first_name: item?.first_name || "",
        last_name: item?.last_name || "",
        created_at: item?.created_at || "",
        is_verified: item?.is_verified || false,
        avatar: item?.avatar || "",
      })
    );
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
}

/**
 * Utility function to get user role display name
 */
export function getRoleDisplayName(role: string): string {
  if (!role) return "Student";
  const roleLower = role.toLowerCase();
  if (roleLower === "admin") return "Admin";
  if (roleLower === "instructor" || roleLower === "tutor") return "Instructor";
  if (roleLower === "student" || roleLower === "learner") return "Student";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

/**
 * Utility function to get role color
 */
export function getRoleColor(role: string): string {
  if (!role) return "green";
  const roleLower = role.toLowerCase();
  if (roleLower === "admin") return "purple";
  if (roleLower === "instructor" || roleLower === "tutor") return "blue";
  if (roleLower === "student" || roleLower === "learner") return "green";
  return "gray";
}

/**
 * Utility function to format price
 */
export function formatPrice(price: number, currency: string = "UGX"): string {
  if (!price || price <= 0) return "FREE";
  return `${currency} ${price.toLocaleString()}`;
}

/**
 * Utility function to check if course is paid
 */
export function isCoursePaid(course: any): boolean {
  return (
    course?.pricing === "paid" ||
    course?.is_paid === true ||
    (course?.price && Number(course.price) > 0) ||
    (course?.amount && Number(course.amount) > 0)
  );
}

/**
 * Utility function to get course price display
 */
export function getCoursePriceDisplay(course: any): { display: string; color: string; isFree: boolean } {
  const isPaid = isCoursePaid(course);

  if (isPaid) {
    const price = Number(course?.price || course?.amount || 0);
    if (price > 0) {
      return {
        display: formatPrice(price),
        color: "text-blue-600 dark:text-blue-400",
        isFree: false,
      };
    }
  }
  return {
    display: "FREE",
    color: "text-green-600 dark:text-green-400",
    isFree: true,
  };
}
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

const API_BASE = (import.meta.env?.VITE_API_BASE_URL as string | undefined) ?? "/api/v1";

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
    }

    let detail = "Request failed";
    try {
      const payload = await response.json();
      detail = typeof payload === "string" ? payload : payload?.detail ?? payload?.message ?? JSON.stringify(payload);
    } catch {
      detail = await response.text();
    }
    throw new Error(detail || `Request failed with ${response.status}`);
  }
  
  if (response.status === 204) return null as T;
  return (await response.json()) as T;
}

export async function login(email: string, password: string) {
  try {
    console.log("Attempting login for:", email);
    
    // Clean the email
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    
    if (!cleanEmail || !cleanPassword) {
      throw new Error("Email and password are required");
    }
    
    // First try with email field
    try {
      const session = await apiRequest<any>("/auth/login/", {
        method: "POST",
        body: JSON.stringify({ 
          email: cleanEmail, 
          password: cleanPassword 
        }),
      });
      
      console.log("Login successful with email");
      
      if (session?.access) {
        writeSession(session);
      }
      
      return session;
    } catch (emailError: any) {
      console.log("Email login failed, trying username...", emailError.message);
      
      // If email fails, try with username
      try {
        const session = await apiRequest<any>("/auth/login/", {
          method: "POST",
          body: JSON.stringify({ 
            username: cleanEmail, 
            password: cleanPassword 
          }),
        });
        
        console.log("Login successful with username");
        
        if (session?.access) {
          writeSession(session);
        }
        
        return session;
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
    return list.map((item: any) => ({
      id: item?.id ?? item?.slug,
      slug: item?.slug,
      title: item?.title,
      instructor: item?.instructor?.full_name ?? "Instructor",
      instructorTitle: item?.instructor?.headline ?? "Instructor",
      category: item?.category?.name ?? "General",
      level: (item?.level || "beginner").toLowerCase() === "advanced" ? "Advanced" : (item?.level || "beginner").toLowerCase() === "intermediate" ? "Intermediate" : "Beginner",
      duration: item?.duration ?? "8h",
      students: item?.total_students ?? 0,
      rating: Number(item?.avg_rating ?? 0),
      reviews: Number(item?.total_reviews ?? 0),
      certificate: Boolean(item?.has_certificate ?? true),
      price: item?.price ? `GHS ${Number(item.price).toLocaleString()}` : "Free",
      status: item?.status ?? "draft",
      image: item?.title?.toLowerCase().includes("network") ? "network" : item?.title?.toLowerCase().includes("security") ? "security" : "code",
      color: "#3B82F6",
      description: item?.subtitle ?? "",
      modules: Number(item?.total_modules ?? item?.module_count ?? item?.sections_count ?? item?.modules_count ?? 0),
      lessons: Number(item?.total_lessons ?? item?.lesson_count ?? item?.lessons_count ?? 0),
      raw: item,
    }));
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
    if (list.length > 0) return list.map((item: any, index: number) => normalizeStudent(item, index));

    const courses = await getCourses();
    const embeddedStudents = courses.flatMap((course: any) => {
      const raw = course.raw ?? {};
      const records = raw.enrollments ?? raw.students ?? raw.learners ?? raw.enrolled_students ?? [];
      return Array.isArray(records) ? records.map((item: any) => normalizeStudent(item, 0, course)) : [];
    });
    return embeddedStudents.map((student, index) => ({ ...student, id: student.id || `student-${index}` }));
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
}) {
  return await apiRequest<any>("/courses/create/", {
    method: "POST",
    body: JSON.stringify(course),
  });
}

export async function patchCourse(slug: string, data: Record<string, any>) {
  return await apiRequest<any>(`/courses/${slug}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
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
    const payload = await apiRequest<any>(`/courses/${slug}/sections/`);
    const sections = Array.isArray(payload) ? payload : payload?.results ?? payload?.sections ?? [];
    if (sections.some((section: any) => Array.isArray(section?.lessons) && section.lessons.length > 0)) return sections;
  } catch {}

  try {
    let payload: any;
    try {
      payload = await apiRequest<any>(`/lessons/admin/course/${slug}/`);
    } catch {
      payload = await apiRequest<any>(`/lessons/course/${slug}/`);
    }
    const lessons = Array.isArray(payload) ? payload : payload?.results ?? [];
    const groups = new Map<string, any>();
    lessons.forEach((lesson: any, index: number) => {
      const sourceModule = lesson?.module ?? lesson?.section ?? lesson?.chapter;
      const moduleId = String(sourceModule?.id ?? lesson?.module_id ?? lesson?.section_id ?? "module-1");
      const group = groups.get(moduleId) ?? {
        id: moduleId,
        title: sourceModule?.title ?? sourceModule?.name ?? lesson?.module_title ?? "Course lessons",
        description: sourceModule?.description ?? "",
        lessons: [],
      };
      group.lessons.push({
        id: lesson?.id ?? lesson?.slug ?? `lesson-${index + 1}`,
        title: lesson?.title ?? lesson?.name ?? `Lesson ${index + 1}`,
        duration: lesson?.duration ?? lesson?.length ?? "15 min",
        type: lesson?.type ?? lesson?.lesson_type ?? "Video",
        videoUrl: lesson?.video_url_resolved ?? lesson?.video_url ?? lesson?.video?.url ?? "",
      });
      groups.set(moduleId, group);
    });
    return Array.from(groups.values());
  } catch {
    return [];
  }
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
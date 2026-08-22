//#region node_modules/.nitro/vite/services/ssr/assets/api-CQnbhjJo.js
var API_BASE = "https://techbridge-backend-rust.vercel.app/api/v1";
function formatTotalDuration(totalSeconds, fallback) {
	if (!totalSeconds) return fallback;
	const totalMinutes = Math.round(totalSeconds / 60);
	if (totalMinutes < 60) return `${totalMinutes} min`;
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}
function lessonDurationSeconds(value) {
	if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, value);
	const text = String(value ?? "").trim().toLowerCase();
	const hours = Number(text.match(/(\d+(?:\.\d+)?)\s*h/)?.[1] ?? 0);
	const minutes = Number(text.match(/(\d+(?:\.\d+)?)\s*m/)?.[1] ?? 0);
	if (hours || minutes) return hours * 3600 + minutes * 60;
	const numeric = Number(text);
	return Number.isFinite(numeric) ? Math.max(0, numeric) : 0;
}
async function getCourseDuration(slug, fallback) {
	try {
		const payload = await apiRequest(`/lessons/admin/course/${slug}/`);
		const lessons = Array.isArray(payload) ? payload : payload?.results ?? payload?.lessons ?? payload?.data ?? [];
		const totalSeconds = lessons.reduce((sum, lesson) => sum + lessonDurationSeconds(lesson?.duration), 0);
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
function writeSession(session) {
	if (typeof window === "undefined") return;
	if (session) window.localStorage.setItem(getStorageKey(), JSON.stringify(session));
	else window.localStorage.removeItem(getStorageKey());
}
function getStoredSession() {
	return readSession();
}
function clearStoredSession() {
	writeSession(null);
}
function isAccessTokenExpired(token) {
	if (!token) return true;
	try {
		const payload = token.split(".")[1];
		if (!payload) return true;
		const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
		const decoded = JSON.parse(atob(normalized.padEnd(normalized.length + (4 - normalized.length % 4) % 4, "=")));
		return typeof decoded?.exp === "number" && decoded.exp * 1e3 <= Date.now();
	} catch {
		return true;
	}
}
var PUBLIC_PATHS = [
	"/auth/login/",
	"/auth/register/",
	"/auth/token/"
];
function isPublicPath(path) {
	return PUBLIC_PATHS.some((p) => path.includes(p));
}
async function refreshToken() {
	const session = readSession();
	if (!session?.refresh) return false;
	try {
		const refreshResponse = await fetch(`${API_BASE}/auth/token/refresh/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refresh: session.refresh })
		});
		if (!refreshResponse.ok) return false;
		const data = await refreshResponse.json();
		if (data?.access) {
			writeSession({
				...session,
				access: data.access,
				refresh: data.refresh ?? session.refresh
			});
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
async function apiRequest(path, init = {}, retried = false) {
	const headers = new Headers(init.headers);
	const isAuthPath = isPublicPath(path);
	const session = readSession();
	if (session?.access && !isAuthPath) headers.set("Authorization", `Bearer ${session.access}`);
	if (!headers.has("Content-Type") && init.body && typeof init.body === "string") headers.set("Content-Type", "application/json");
	let response;
	try {
		response = await fetch(`${API_BASE}${path.startsWith("/") ? path : `/${path}`}`, {
			...init,
			headers
		});
	} catch (networkError) {
		console.error(`Network error for ${path}:`, networkError);
		throw new Error("Unable to reach the server. Check your connection and try again.");
	}
	if (!response.ok) {
		if (response.status === 401 && !retried && !isAuthPath) {
			if (await refreshToken()) return apiRequest(path, init, true);
			clearStoredSession();
		}
		let detail = "Request failed";
		try {
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
	if (response.status === 204) return null;
	return await response.json();
}
/**
* Decodes a JWT payload without verifying the signature (client-side only,
* for reading claims like role/user_id). Never trust this for security
* decisions server-side — it's just for UI branching.
*/
function decodeJwt(token) {
	try {
		const normalized = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
		const padded = normalized.padEnd(normalized.length + (4 - normalized.length % 4) % 4, "=");
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
async function login(identifier, password) {
	const cleanIdentifier = identifier.trim();
	const cleanPassword = password.trim();
	if (!cleanIdentifier || !cleanPassword) throw new Error("Email and password are required");
	const session = await apiRequest("/auth/login/", {
		method: "POST",
		body: JSON.stringify({
			email: cleanIdentifier,
			password: cleanPassword
		})
	});
	if (!session?.access) throw new Error("Login response did not include an access token.");
	writeSession(session);
	return session;
}
async function register(payload) {
	return await apiRequest("/auth/register/", {
		method: "POST",
		body: JSON.stringify(payload)
	});
}
/**
* Fetches the profile of the currently authenticated user.
* ADJUST THIS PATH to match your backend — common options:
*   "/auth/me/"  "/users/me/"  "/auth/user/"  "/accounts/profile/"
* Check your Network tab or backend urls.py to confirm.
*/
async function getCurrentUser() {
	return apiRequest("/auth/me/");
}
/**
* Resolves the current user's role, trying the JWT claims first
* (no extra network request) and falling back to a profile fetch.
*/
async function getCurrentUserRole(accessToken) {
	if (accessToken) {
		const claims = decodeJwt(accessToken);
		if (claims?.role) return claims.role;
	}
	try {
		return (await getCurrentUser())?.role ?? null;
	} catch {
		return null;
	}
}
async function logout() {
	try {
		await apiRequest("/auth/logout/", { method: "POST" });
	} catch {}
	writeSession(null);
}
/**
* Get dashboard statistics with proper typing and fallbacks
*/
async function getDashboardStats() {
	try {
		const response = await apiRequest("/analytics/stats/");
		const data = response?.data || response;
		return {
			users: {
				total: data?.users?.total || data?.learners || 0,
				students: data?.users?.students || data?.learners || 0,
				instructors: data?.users?.instructors || data?.tutors || 0,
				admins: data?.users?.admins || 0
			},
			courses: {
				total: data?.courses?.total || data?.courses || 0,
				published: data?.courses?.published || 0,
				draft: data?.courses?.draft || 0,
				archived: data?.courses?.archived || 0
			},
			enrollments: {
				total: data?.enrollments?.total || 0,
				active: data?.enrollments?.active || 0,
				completed: data?.enrollments?.completed || 0,
				dropped: data?.enrollments?.dropped || 0
			},
			certificates: data?.certificates || 0,
			blog_posts: data?.blog_posts || 0,
			revenue: data?.revenue || void 0
		};
	} catch (error) {
		console.error("Error fetching dashboard stats:", error);
		return {
			users: {
				total: 0,
				students: 0,
				instructors: 0,
				admins: 0
			},
			courses: {
				total: 0,
				published: 0,
				draft: 0,
				archived: 0
			},
			enrollments: {
				total: 0,
				active: 0,
				completed: 0,
				dropped: 0
			},
			certificates: 0,
			blog_posts: 0
		};
	}
}
/**
* Get daily activity data with proper formatting
*/
async function getAnalyticsDailyActivity() {
	try {
		const response = await apiRequest("/analytics/daily/");
		return (Array.isArray(response) ? response : response?.data || response?.results || []).map((item) => ({
			date: item?.date || item?.day || "",
			day: item?.day || item?.date || "",
			new_users: Number(item?.new_users || item?.count || 0),
			count: Number(item?.count || item?.new_users || 0),
			new_enrollments: Number(item?.new_enrollments || 0),
			active_users: Number(item?.active_users || 0)
		}));
	} catch (error) {
		console.error("Error fetching daily activity:", error);
		return [];
	}
}
/**
* Get recent users with enhanced data
*/
async function getRecentUsers(pageSize = 6) {
	try {
		const payload = await apiRequest(`/users/?page_size=${pageSize}&ordering=-created_at`);
		const list = Array.isArray(payload) ? payload : payload?.results ?? [];
		const total = payload?.count ?? list.length;
		return {
			results: list.map((item) => ({
				id: item?.id || "",
				full_name: item?.full_name || item?.name || item?.username || "User",
				username: item?.username || "",
				email: item?.email || "",
				role: item?.role || item?.user_type || item?.type || "student",
				first_name: item?.first_name || "",
				last_name: item?.last_name || "",
				created_at: item?.created_at || "",
				is_verified: item?.is_verified || false,
				avatar: item?.avatar || ""
			})),
			total
		};
	} catch (error) {
		console.error("Error fetching recent users:", error);
		return {
			results: [],
			total: 0
		};
	}
}
/**
* Get courses with pagination and complete data
*/
async function getCoursesWithPagination(pageSize = 5, page = 1) {
	try {
		const payload = await apiRequest(`/courses/?page_size=${pageSize}&page=${page}&ordering=-total_students`);
		const list = Array.isArray(payload) ? payload : payload?.results ?? [];
		const total = payload?.count ?? list.length;
		return {
			results: await Promise.all(list.map(async (item) => ({
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
				pricing: item?.pricing === "paid" || item?.price && item.price > 0 ? "paid" : "free",
				is_paid: item?.is_paid || item?.price && item.price > 0 || false,
				price: Number(item?.price || item?.amount || 0),
				amount: Number(item?.amount || item?.price || 0),
				status: item?.status || (item?.is_published ? "published" : "draft"),
				is_published: item?.is_published || item?.status === "published",
				image: item?.image || "network",
				color: item?.color || "#1F6E5C",
				certificate: item?.certificate || false,
				created_at: item?.created_at || "",
				updated_at: item?.updated_at || ""
			}))),
			total,
			page,
			pageSize
		};
	} catch (error) {
		console.error("Error fetching courses:", error);
		return {
			results: [],
			total: 0,
			page: 1,
			pageSize
		};
	}
}
/**
* Get tutors with their stats
*/
async function getTutors() {
	try {
		const payload = await apiRequest("/users/?role=instructor");
		return (Array.isArray(payload) ? payload : payload?.results ?? []).map((item) => ({
			id: item?.id || "",
			name: item?.full_name || item?.name || item?.username || "Tutor",
			specialty: item?.headline || item?.specialty || "Instructor",
			students: Number(item?.total_students || item?.students || 0),
			courses: Number(item?.courses_count || item?.courses || 0),
			rating: Number(item?.avg_rating || item?.rating || 0),
			status: item?.is_verified ? "Verified" : "Pending"
		}));
	} catch (error) {
		console.error("Error fetching tutors:", error);
		return [];
	}
}
/**
* Get categories with course counts
*/
async function getCategories() {
	try {
		const payload = await apiRequest("/categories/");
		const list = Array.isArray(payload) ? payload : payload?.results ?? [];
		const totalStudents = list.reduce((sum, cat) => sum + Number(cat?.total_students || 0), 0) || 1;
		return list.map((item) => ({
			id: item?.id || "",
			name: item?.name || "Uncategorized",
			students: Number(item?.total_students || 0),
			courses: Number(item?.courses_count || 0),
			percentage: totalStudents > 0 ? Math.round(Number(item?.total_students || 0) / totalStudents * 100) : 0,
			color: item?.color || "#3B82F6"
		}));
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
}
//#endregion
export { getCoursesWithPagination as a, getRecentUsers as c, isAccessTokenExpired as d, login as f, getCategories as i, getStoredSession as l, register as m, clearStoredSession as n, getCurrentUserRole as o, logout as p, getAnalyticsDailyActivity as r, getDashboardStats as s, apiRequest as t, getTutors as u };

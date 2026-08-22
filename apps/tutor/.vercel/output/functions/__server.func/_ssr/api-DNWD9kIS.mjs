//#region node_modules/.nitro/vite/services/ssr/assets/api-DNWD9kIS.js
var API_BASE = "https://techbridge-backend-rust.vercel.app/api/v1";
var LESSON_TYPE_TO_DISPLAY = {
	video: "Video",
	text: "Article",
	reading: "Article",
	quiz: "Quiz",
	assignment: "Project",
	project: "Project",
	live: "Project"
};
function toDisplayLessonType(rawType) {
	if (!rawType) return "Video";
	return LESSON_TYPE_TO_DISPLAY[String(rawType).toLowerCase()] ?? "Video";
}
function formatDurationSeconds(totalSeconds) {
	const seconds = Math.max(0, Math.round(Number(totalSeconds) || 0));
	const totalMinutes = Math.round(seconds / 60);
	if (totalMinutes <= 0) return "0 min";
	if (totalMinutes < 60) return `${totalMinutes} min`;
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
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
		const lessons = await getCourseLessons(slug);
		const totalSeconds = lessons.reduce((sum, lesson) => sum + lessonDurationSeconds(lesson?.duration), 0);
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
async function apiRequest(path, init = {}, retried = false) {
	const headers = new Headers(init.headers);
	const session = readSession();
	const isLoginPath = path.includes("/auth/login/") || path.includes("/login/");
	if (session?.access && !isLoginPath) headers.set("Authorization", `Bearer ${session.access}`);
	if (!headers.has("Content-Type") && init.body && typeof init.body === "string") headers.set("Content-Type", "application/json");
	const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
	console.log(`API Request: ${init.method || "GET"} ${url}`);
	const response = await fetch(url, {
		...init,
		headers
	});
	if (!response.ok) {
		if (response.status === 401 && !retried && !isLoginPath && !path.includes("/auth/token/refresh/")) {
			if (await refreshToken()) return apiRequest(path, init, true);
			clearStoredSession();
		}
		let detail = "Request failed";
		try {
			const rawText = await response.text();
			try {
				const payload = JSON.parse(rawText);
				detail = typeof payload === "string" ? payload : payload?.detail ?? payload?.message ?? JSON.stringify(payload);
			} catch {
				detail = rawText || detail;
			}
		} catch {}
		const httpError = new Error(detail || `Request failed with ${response.status}`);
		if (detail === "Request failed") httpError.message = `Request failed with ${response.status}`;
		httpError.status = response.status;
		throw httpError;
	}
	if (response.status === 204) return null;
	return await response.json();
}
async function login(email, password) {
	const cleanEmail = email.trim();
	const cleanPassword = password.trim();
	if (!cleanEmail || !cleanPassword) throw new Error("Email and password are required");
	const looksLikeEmail = cleanEmail.includes("@");
	const primaryField = looksLikeEmail ? "email" : "username";
	const fallbackField = looksLikeEmail ? "username" : "email";
	async function attempt(field) {
		const session = await apiRequest("/auth/login/", {
			method: "POST",
			body: JSON.stringify({
				[field]: cleanEmail,
				password: cleanPassword
			})
		});
		if (session?.access) writeSession(session);
		return session;
	}
	try {
		return await attempt(primaryField);
	} catch (primaryError) {
		if (primaryError?.status !== 400) throw primaryError;
		try {
			return await attempt(fallbackField);
		} catch {
			throw primaryError;
		}
	}
}
async function logout() {
	try {
		await apiRequest("/auth/logout/", { method: "POST" });
	} catch {}
	writeSession(null);
}
async function getCourses() {
	try {
		const payload = await apiRequest("/courses/mine/");
		const list = Array.isArray(payload) ? payload : payload?.results ?? [];
		return await Promise.all(list.map(async (item) => ({
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
			raw: item
		})));
	} catch {
		return [];
	}
}
async function getStudents() {
	const normalizeStudent = (item, index, fallbackCourse = {}) => {
		const user = item?.user ?? item?.student ?? item?.learner ?? item?.profile ?? item?.user_detail ?? item ?? {};
		const course = item?.course ?? item?.course_detail ?? item?.course_data ?? fallbackCourse ?? {};
		const progressValue = typeof item?.progress === "object" ? item.progress?.percentage ?? item.progress?.progress ?? item.progress?.completion_percentage : item?.progress ?? item?.completion_percentage ?? item?.completion;
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
			enrolled: enrolledAt ? new Date(enrolledAt).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric"
			}) : "Recently",
			raw: item
		};
	};
	try {
		const payload = await apiRequest("/enrollments/");
		const list = Array.isArray(payload) ? payload : payload?.results ?? [];
		const directStudents = list.length > 0 ? list.map((item, index) => normalizeStudent(item, index)) : [];
		if (directStudents.length > 0) return directStudents;
		return (await getCourses()).flatMap((course) => {
			const raw = course?.raw ?? {};
			const records = Array.isArray(course?.students) ? course.students : Array.isArray(raw.enrollments) ? raw.enrollments : Array.isArray(raw.students) ? raw.students : Array.isArray(raw.learners) ? raw.learners : Array.isArray(raw.enrolled_students) ? raw.enrolled_students : Array.isArray(raw.participants) ? raw.participants : [];
			return records.length > 0 ? records.map((item, idx) => normalizeStudent(item, idx, course)) : [];
		}).filter((student, index, arr) => arr.findIndex((entry) => entry.id === student.id) === index).map((student, index) => ({
			...student,
			id: student.id || `student-${index}`
		}));
	} catch {
		return [];
	}
}
async function getTutorAnalytics() {
	try {
		return await apiRequest("/auth/me/stats/");
	} catch {
		return null;
	}
}
async function getCourseCategories() {
	try {
		const payload = await apiRequest("/courses/categories/");
		return Array.isArray(payload) ? payload : payload?.results ?? [];
	} catch {
		return [];
	}
}
async function createCourse(course) {
	return await apiRequest("/courses/create/", {
		method: "POST",
		body: course.thumbnail instanceof File ? Object.entries(course).reduce((form, [key, value]) => {
			if (value === void 0 || value === null || value === "") return form;
			form.append(key, Array.isArray(value) ? JSON.stringify(value) : value instanceof File ? value : String(value));
			return form;
		}, new FormData()) : JSON.stringify(course)
	});
}
async function patchCourse(slug, data) {
	const body = data.thumbnail instanceof File ? Object.entries(data).reduce((form, [key, value]) => {
		if (value === void 0 || value === null || value === "") return form;
		form.append(key, Array.isArray(value) ? JSON.stringify(value) : value instanceof File ? value : String(value));
		return form;
	}, new FormData()) : JSON.stringify(data);
	return await apiRequest(`/courses/${slug}/`, {
		method: "PATCH",
		body
	});
}
async function deleteCourse(slug) {
	return await apiRequest(`/courses/${slug}/`, { method: "DELETE" });
}
async function getCourse(slug) {
	try {
		return await apiRequest(`/courses/${slug}/`) ?? null;
	} catch {
		return null;
	}
}
async function getCourseLessons(courseSlug) {
	const readItems = (payload) => {
		if (Array.isArray(payload)) return payload;
		if (Array.isArray(payload?.results)) return payload.results;
		if (Array.isArray(payload?.lessons)) return payload.lessons;
		if (Array.isArray(payload?.data)) return payload.data;
		return [];
	};
	try {
		return readItems(await apiRequest(`/lessons/admin/course/${courseSlug}/`));
	} catch {
		try {
			return readItems(await apiRequest(`/lessons/course/${courseSlug}/`));
		} catch {
			return [];
		}
	}
}
async function getCourseReviews(courseSlug) {
	try {
		const payload = await apiRequest(`/courses/${courseSlug}/reviews/`);
		return Array.isArray(payload) ? payload : payload?.results ?? [];
	} catch {
		return [];
	}
}
async function getProfile() {
	return await apiRequest("/auth/me/");
}
async function patchProfile(data) {
	return await apiRequest("/auth/me/", {
		method: "PATCH",
		body: JSON.stringify(data)
	});
}
async function getNotifications() {
	try {
		const payload = await apiRequest("/notifications/");
		return Array.isArray(payload) ? payload : payload?.results ?? [];
	} catch {
		return [];
	}
}
async function generateCourseTitle(prompt) {
	try {
		return await apiRequest("/ai/course/title/", {
			method: "POST",
			body: JSON.stringify({ prompt })
		});
	} catch {
		return null;
	}
}
async function generateCourseDescription(prompt) {
	try {
		return await apiRequest("/ai/course/desc/", {
			method: "POST",
			body: JSON.stringify({ prompt })
		});
	} catch {
		return null;
	}
}
async function getCourseModules(slug) {
	try {
		const [modulePayload, lessonPayload] = await Promise.all([apiRequest(`/lessons/modules/course/${slug}/`).catch(() => null), apiRequest(`/lessons/admin/course/${slug}/`).catch(() => apiRequest(`/lessons/course/${slug}/`))]);
		const moduleItems = Array.isArray(modulePayload) ? modulePayload : modulePayload?.results ?? modulePayload?.modules ?? modulePayload?.data ?? [];
		const payload = lessonPayload;
		const lessons = Array.isArray(payload) ? payload : payload?.results ?? [];
		const groups = new Map(moduleItems.map((module, index) => [String(module.id), {
			...module,
			id: String(module.id),
			title: module.title ?? `Module ${index + 1}`,
			description: module.description ?? "",
			module_order: Number(module.module_order ?? index + 1),
			lessons: [],
			_persisted: true
		}]));
		lessons.forEach((lesson, index) => {
			const sourceModule = lesson?.module ?? lesson?.section ?? lesson?.chapter;
			const moduleId = String(typeof sourceModule === "string" ? sourceModule : sourceModule?.id ?? lesson?.module_id ?? lesson?.section_id ?? "module-unassigned");
			const group = groups.get(moduleId) ?? {
				id: moduleId,
				title: (typeof sourceModule === "object" ? sourceModule?.title ?? sourceModule?.name : void 0) ?? lesson?.module_title ?? "Course lessons",
				description: typeof sourceModule === "object" ? sourceModule?.description ?? "" : "",
				module_order: Number(lesson?.module_order ?? groups.size + 1),
				lessons: [],
				_persisted: false
			};
			group.lessons.push({
				id: lesson?.id ?? lesson?.slug ?? `lesson-${index + 1}`,
				title: lesson?.title ?? lesson?.name ?? `Lesson ${index + 1}`,
				slug: lesson?.slug ?? void 0,
				description: lesson?.description ?? "",
				content: lesson?.content ?? "",
				duration: typeof lesson?.duration === "number" ? formatDurationSeconds(lesson.duration) : lesson?.duration ?? lesson?.length ?? "15 min",
				type: toDisplayLessonType(lesson?.type ?? lesson?.lesson_type),
				videoUrl: lesson?.video_url_resolved ?? lesson?.video_url ?? lesson?.video?.url ?? "",
				_persisted: true
			});
			groups.set(moduleId, group);
		});
		return Array.from(groups.values()).sort((left, right) => left.module_order - right.module_order);
	} catch {
		return [];
	}
}
async function createTutorModule(courseSlug, data) {
	return await apiRequest(`/lessons/modules/course/${courseSlug}/`, {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function updateTutorModule(moduleId, data) {
	return await apiRequest(`/lessons/modules/${moduleId}/`, {
		method: "PATCH",
		body: JSON.stringify(data)
	});
}
async function createTutorLesson(courseSlug, data) {
	return await apiRequest(`/lessons/admin/course/${courseSlug}/`, {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function updateTutorLesson(lessonId, data) {
	return await apiRequest(`/lessons/admin/${lessonId}/`, {
		method: "PATCH",
		body: JSON.stringify(data)
	});
}
async function deleteTutorLesson(lessonId) {
	return await apiRequest(`/lessons/admin/${lessonId}/`, { method: "DELETE" });
}
async function register(payload) {
	return await apiRequest("/auth/register/", {
		method: "POST",
		body: JSON.stringify(payload)
	});
}
//#endregion
export { patchCourse as C, updateTutorModule as D, updateTutorLesson as E, logout as S, register as T, getStoredSession as _, deleteCourse as a, isAccessTokenExpired as b, generateCourseTitle as c, getCourseLessons as d, getCourseModules as f, getProfile as g, getNotifications as h, createTutorModule as i, getCourse as l, getCourses as m, createCourse as n, deleteTutorLesson as o, getCourseReviews as p, createTutorLesson as r, generateCourseDescription as s, clearStoredSession as t, getCourseCategories as u, getStudents as v, patchProfile as w, login as x, getTutorAnalytics as y };

//#region node_modules/.nitro/vite/services/ssr/assets/api-Ch5RiuZ6.js
var API_BASE = "https://techbridge-backend-rust.vercel.app/api/v1";
function getStorageKey() {
	return "bridge_skills_student_session";
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
	const isAuthPath = path.includes("/auth/login/") || path.includes("/auth/register/") || path.includes("/auth/token/");
	const session = readSession();
	if (session?.access && !isAuthPath) headers.set("Authorization", `Bearer ${session.access}`);
	if (!headers.has("Content-Type") && init.body && typeof init.body === "string") headers.set("Content-Type", "application/json");
	const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
	console.log(`API Request: ${init.method || "GET"} ${url}`);
	try {
		const response = await fetch(url, {
			...init,
			headers
		});
		if (!response.ok) {
			if (response.status === 401 && !retried && !isAuthPath && !path.includes("/auth/token/refresh/")) {
				console.log("Token expired, attempting refresh...");
				if (await refreshToken()) {
					console.log("Token refreshed, retrying request...");
					return apiRequest(path, init, true);
				}
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
					detail = "Request failed";
				}
			}
			throw new Error(detail || `Request failed with ${response.status}`);
		}
		if (response.status === 204) return null;
		return await response.json();
	} catch (error) {
		console.error(`API Request failed for ${path}:`, error);
		throw error;
	}
}
async function getProfile() {
	try {
		return await apiRequest("/auth/me/");
	} catch {
		return null;
	}
}
async function login(email, password) {
	try {
		console.log("Attempting login for:", email);
		const cleanEmail = email.trim();
		const cleanPassword = password.trim();
		if (!cleanEmail || !cleanPassword) throw new Error("Email and password are required");
		try {
			const session = await apiRequest("/auth/login/", {
				method: "POST",
				body: JSON.stringify({
					email: cleanEmail,
					password: cleanPassword
				})
			});
			if (session?.access) {
				writeSession(session);
				console.log("Login successful with email");
				return session;
			}
			return null;
		} catch (emailError) {
			console.log("Email login failed, trying username...", emailError.message);
			try {
				const session = await apiRequest("/auth/login/", {
					method: "POST",
					body: JSON.stringify({
						username: cleanEmail,
						password: cleanPassword
					})
				});
				if (session?.access) {
					writeSession(session);
					console.log("Login successful with username");
					return session;
				}
				return null;
			} catch (usernameError) {
				console.error("Username login failed too");
				throw emailError;
			}
		}
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
}
async function logout() {
	try {
		await apiRequest("/auth/logout/", { method: "POST" });
	} catch {}
	writeSession(null);
}
async function register(payload) {
	try {
		console.log("Attempting registration for:", payload.email);
		const resp = await apiRequest("/auth/register/", {
			method: "POST",
			body: JSON.stringify(payload)
		});
		console.log("Registration response:", resp);
		return resp;
	} catch (err) {
		console.error("Registration error:", err);
		throw err;
	}
}
function normalizeLevel(value) {
	const level = (value || "beginner").toLowerCase();
	if (level === "advanced") return "Advanced";
	if (level === "intermediate") return "Intermediate";
	return "Beginner";
}
function deriveThumbVariant(title, category) {
	const text = `${title} ${category}`.toLowerCase();
	if (text.includes("security") || text.includes("hacking")) return "security";
	if (text.includes("cloud") || text.includes("network")) return "network";
	if (text.includes("design") || text.includes("product")) return "design";
	if (text.includes("ai") || text.includes("machine") || text.includes("learning")) return "ai";
	if (text.includes("code") || text.includes("software") || text.includes("typescript")) return "code";
	return "code";
}
function deriveColor(category) {
	const name = category?.toLowerCase() ?? "";
	if (name.includes("cloud")) return "#1F6E5C";
	if (name.includes("security")) return "#0D2922";
	if (name.includes("ai") || name.includes("machine")) return "#D4A24E";
	if (name.includes("design")) return "#587267";
	return "#3B82F6";
}
function formatTotalDuration(totalSeconds, fallback = "") {
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
function readLessonItems(payload) {
	if (Array.isArray(payload)) return payload;
	return payload?.results ?? payload?.lessons ?? payload?.data ?? [];
}
async function getCourseDuration(slug, fallback) {
	try {
		const lessons = readLessonItems(await apiRequest(`/lessons/course/${slug}/`));
		const totalSeconds = lessons.reduce((sum, lesson) => sum + lessonDurationSeconds(lesson?.duration), 0);
		return lessons.length > 0 ? formatTotalDuration(totalSeconds, "0 min") : fallback;
	} catch {
		return fallback;
	}
}
function normalizeCourse(item) {
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
	const price = item?.pricing === "free" || rawPrice <= 0 ? "Free" : rawPrice > 0 ? `${currency} ${rawPrice.toLocaleString()}` : "";
	const introVideoUrl = item?.intro_video_url ?? item?.video_url ?? item?.youtube_url ?? item?.course_video_url ?? item?.preview_video_url;
	return {
		id: item?.id ?? item?.slug ?? `${item?.title ?? "course"}-${Math.random()}`,
		slug: item?.slug ?? item?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ?? "course",
		title: item?.title ?? "",
		instructor: instructor ?? "",
		instructorTitle: instructorTitle ?? "",
		category: category ?? "",
		level: item?.level ? normalizeLevel(item?.level) : void 0,
		duration: item?.duration ?? "",
		students,
		rating,
		reviews,
		certificate: Boolean(item?.has_certificate),
		price,
		image: deriveThumbVariant(item?.title ?? "", category ?? ""),
		thumbnail: item?.thumbnail ?? item?.thumbnail_url ?? null,
		color: deriveColor(category ?? ""),
		description: item?.subtitle ?? item?.description ?? "",
		modules: Math.max(0, moduleCount),
		lessons,
		language: item?.language ?? item?.course_language ?? void 0,
		subtitles: Number(item?.subtitle_count ?? item?.subtitles ?? 0) || void 0,
		instructorBio: item?.instructor?.bio ?? item?.instructor_bio ?? item?.instructor_description ?? void 0,
		learningOutcomes: Array.isArray(item?.learning_outcomes) ? item.learning_outcomes : Array.isArray(item?.outcomes) ? item.outcomes : void 0,
		introVideoUrl: introVideoUrl ? String(introVideoUrl) : void 0,
		progress: item?.progress,
		raw: item
	};
}
function normalizeQuizChoice(choice) {
	if (choice == null) return {
		id: String(Math.random()),
		label: "Unknown",
		raw: choice
	};
	const label = typeof choice === "string" ? choice : choice?.label ?? choice?.text ?? choice?.name ?? String(choice);
	return {
		id: typeof choice === "string" ? choice : choice?.id?.toString() ?? choice?.value?.toString() ?? label,
		label,
		value: choice?.value ?? choice?.id,
		raw: choice
	};
}
function normalizeQuizQuestion(item) {
	const choices = Array.isArray(item?.choices) ? item.choices.map(normalizeQuizChoice) : Array.isArray(item?.options) ? item.options.map(normalizeQuizChoice) : [];
	return {
		id: item?.id?.toString() ?? item?.question?.toString() ?? `question-${Math.random()}`,
		prompt: item?.question ?? item?.prompt ?? item?.text ?? "Question",
		type: item?.type ?? (choices.length ? "multiple_choice" : "open_ended"),
		choices,
		raw: item
	};
}
function normalizeQuiz(item) {
	return {
		id: item?.id?.toString() ?? item?.slug ?? `${item?.title ?? "quiz"}-${Math.random()}`,
		title: item?.title ?? item?.name ?? "Quick check",
		description: item?.description ?? item?.summary ?? "",
		questions: Array.isArray(item?.questions) ? item.questions.map(normalizeQuizQuestion) : [],
		raw: item
	};
}
function normalizeBlogPost(item) {
	return {
		id: item?.id?.toString() ?? item?.slug ?? `${item?.title ?? "post"}-${Math.random()}`,
		title: item?.title ?? item?.headline ?? "Blog post",
		summary: item?.summary ?? item?.excerpt ?? item?.description ?? "",
		publishedAt: item?.published_at ?? item?.date ?? item?.created_at,
		slug: item?.slug,
		raw: item
	};
}
function normalizeAssignment(item) {
	return {
		id: item?.id?.toString() ?? `${item?.title ?? "assignment"}-${Math.random()}`,
		title: item?.title ?? item?.name ?? "Assignment",
		course: item?.course?.title ?? item?.course ?? item?.course_name ?? "Course",
		due: item?.due_date ?? item?.due ?? item?.deadline ?? "TBD",
		status: item?.status ?? item?.state ?? "Pending",
		type: item?.type ?? item?.assignment_type ?? "Task",
		raw: item
	};
}
async function getCourses(query) {
	try {
		const payload = await apiRequest(`/courses/${query ? `?${String(query)}` : ""}`);
		const list = Array.isArray(payload) ? payload : payload?.results ?? [];
		return await Promise.all(list.map(async (item) => {
			const course = normalizeCourse(item);
			return {
				...course,
				duration: await getCourseDuration(course.slug, course.duration)
			};
		}));
	} catch {
		return [];
	}
}
async function getCourse(slug) {
	try {
		const normalized = normalizeCourse(await apiRequest(`/courses/${slug}/`));
		return {
			...normalized,
			duration: await getCourseDuration(slug, normalized.duration)
		};
	} catch {
		return null;
	}
}
async function getMyEnrollments() {
	try {
		const payload = await apiRequest("/enrollments/");
		return (Array.isArray(payload) ? payload : payload?.results ?? []).map((item) => {
			const courseData = item?.course ?? item?.course_detail ?? item?.course_data ?? item?.enrolled_course;
			const progress = typeof item?.progress === "object" ? item.progress?.percentage ?? item.progress?.progress ?? item.progress?.completion_percentage : item?.progress ?? item?.completion_percentage ?? item?.completion;
			return {
				id: item?.id,
				course: courseData ? normalizeCourse(courseData) : null,
				status: item?.status,
				progress: Number(progress ?? courseData?.progress ?? 0),
				enrolledAt: item?.enrolled_at ?? item?.created_at
			};
		});
	} catch {
		return [];
	}
}
async function checkCourseEnrollment(courseSlug) {
	try {
		return await apiRequest(`/enrollments/${courseSlug}/check/`);
	} catch {
		return null;
	}
}
async function getMyCertificates() {
	try {
		const payload = await apiRequest("/certificates/mine/");
		return (Array.isArray(payload) ? payload : payload?.results ?? []).map((item, index) => ({
			id: item?.id ?? `${index}`,
			title: item?.course?.title ?? item?.title ?? "Certificate",
			issued: item?.issued_at ? new Date(item.issued_at).toLocaleDateString("en-US", {
				month: "short",
				year: "numeric"
			}) : "Recent",
			credentialId: item?.credential_id ?? item?.credentialId ?? `TBS-${index + 1}`,
			instructor: item?.instructor?.full_name ?? item?.instructor ?? "TechBridge"
		}));
	} catch {
		return [];
	}
}
async function getWishlistCourses() {
	try {
		const payload = await apiRequest("/courses/wishlist/");
		return (Array.isArray(payload) ? payload : payload?.results ?? []).map((item) => normalizeCourse(item?.course ?? item));
	} catch {
		return [];
	}
}
async function getLearningPaths() {
	try {
		const payload = await apiRequest("/features/learning-paths/");
		return Array.isArray(payload) ? payload : payload?.results ?? [];
	} catch {
		return [];
	}
}
async function getBlogPosts(query) {
	try {
		const queryText = query ? String(query).replace(/^\?/, "") : "";
		const payload = await apiRequest(`/blog/${queryText ? `?${queryText}` : ""}`);
		return (Array.isArray(payload) ? payload : payload?.results ?? []).map(normalizeBlogPost);
	} catch {
		return [];
	}
}
async function getAssignments() {
	try {
		const payload = await apiRequest("/assignments/");
		return (Array.isArray(payload) ? payload : payload?.results ?? []).map(normalizeAssignment);
	} catch {
		return [];
	}
}
async function getNotifications() {
	try {
		const payload = await apiRequest("/notifications/");
		return Array.isArray(payload) ? payload : payload?.results ?? [];
	} catch {
		return [];
	}
}
async function markNotificationsRead() {
	try {
		return await apiRequest("/notifications/read/", { method: "POST" });
	} catch {
		return null;
	}
}
async function getQuizzesForCourse(courseSlug) {
	try {
		const payload = await apiRequest(`/quizzes/course/${courseSlug}/`);
		return (Array.isArray(payload) ? payload : payload?.results ?? []).map(normalizeQuiz);
	} catch {
		return [];
	}
}
async function getQuiz(quizId) {
	try {
		return normalizeQuiz(await apiRequest(`/quizzes/${quizId}/`));
	} catch {
		return null;
	}
}
async function submitQuizAnswers(quizId, answers) {
	try {
		return await apiRequest(`/quizzes/${quizId}/submit/`, {
			method: "POST",
			body: JSON.stringify(answers)
		});
	} catch {
		return null;
	}
}
async function getPaymentHistory() {
	try {
		const payload = await apiRequest("/payments/history/");
		return Array.isArray(payload) ? payload : payload?.results ?? [];
	} catch {
		return [];
	}
}
async function initiatePayment(provider, payload) {
	try {
		return await apiRequest(`/payments/${provider}/`, {
			method: "POST",
			body: JSON.stringify(payload)
		});
	} catch {
		return null;
	}
}
async function verifyCertificate(number) {
	try {
		return await apiRequest(`/certificates/verify/${number}/`);
	} catch {
		return null;
	}
}
async function markLessonComplete(lessonId) {
	try {
		return await apiRequest(`/lessons/${lessonId}/complete/`, { method: "POST" });
	} catch {
		return null;
	}
}
async function getMeStats() {
	try {
		return await apiRequest("/auth/me/stats/");
	} catch {
		return null;
	}
}
async function getMe() {
	try {
		return await apiRequest("/auth/me/");
	} catch {
		return null;
	}
}
async function getCourseModules(slug) {
	const formatLessonDuration = (value) => {
		if (value === null || value === void 0 || value === "") return "";
		if (typeof value === "string" && /[a-z]/i.test(value)) return value;
		const seconds = Number(value);
		if (!Number.isFinite(seconds) || seconds <= 0) return "";
		const minutes = Math.round(seconds / 60);
		if (minutes < 60) return `${minutes} min`;
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
	};
	const readItems = (payload) => {
		if (Array.isArray(payload)) return payload;
		if (Array.isArray(payload?.results)) return payload.results;
		if (Array.isArray(payload?.modules)) return payload.modules;
		if (Array.isArray(payload?.sections)) return payload.sections;
		if (Array.isArray(payload?.lessons)) return payload.lessons;
		if (Array.isArray(payload?.data)) return payload.data;
		return [];
	};
	const getPersistedModuleTitle = (lesson) => {
		if (lesson?.module_title) return String(lesson.module_title);
		const marker = String(lesson?.content ?? lesson?.body ?? lesson?.text ?? "").match(/\[\[bridge-module:([^\]]+)\]\]/i);
		if (!marker) return "";
		try {
			return decodeURIComponent(marker[1]);
		} catch {
			return marker[1];
		}
	};
	const normalizeLesson = (lesson, index) => ({
		...lesson,
		id: String(lesson?.id ?? lesson?.slug ?? `lesson-${index + 1}`),
		title: lesson?.title ?? lesson?.name ?? `Lesson ${index + 1}`,
		duration: formatLessonDuration(lesson?.duration ?? lesson?.length ?? lesson?.estimated_duration),
		video_url: lesson?.video_url_resolved ?? lesson?.video_url ?? lesson?.video?.url ?? lesson?.content_url ?? lesson?.media_url ?? "",
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
				content: rawContent.replace(/\[\[bridge-module:[^\]]+\]\]\s*/i, "").trim()
			};
		})(),
		completed: Boolean(lesson?.completed ?? lesson?.is_completed)
	});
	const normalizeModules = (items) => items.map((module, index) => ({
		...module,
		id: String(module?.id ?? module?.slug ?? `module-${index + 1}`),
		title: module?.title ?? module?.name ?? `Module ${index + 1}`,
		description: module?.description ?? "",
		module_order: Number(module?.module_order ?? module?.order ?? index + 1),
		lessons: (Array.isArray(module?.lessons) ? module.lessons : Array.isArray(module?.lesson_set) ? module.lesson_set : []).map(normalizeLesson)
	})).sort((left, right) => left.module_order - right.module_order);
	const groupLessons = (lessons) => {
		const groups = /* @__PURE__ */ new Map();
		const unassignedLessons = [];
		[...lessons].sort((left, right) => Number(left?.lesson_order ?? left?.order ?? 0) - Number(right?.lesson_order ?? right?.order ?? 0)).forEach((lesson, index) => {
			const sourceModule = lesson?.module ?? lesson?.section ?? lesson?.chapter;
			const moduleId = typeof sourceModule === "string" ? sourceModule : sourceModule?.id ?? lesson?.module_id ?? lesson?.section_id;
			if (!moduleId) {
				unassignedLessons.push(normalizeLesson(lesson, index));
				return;
			}
			const moduleTitle = (typeof sourceModule === "object" ? sourceModule?.title ?? sourceModule?.name : void 0) ?? lesson?.module_title ?? getPersistedModuleTitle(lesson);
			const group = groups.get(moduleId) ?? {
				id: String(moduleId),
				title: moduleTitle ?? lesson?.section_title ?? "Course module",
				description: sourceModule?.description ?? "",
				module_order: Number((typeof sourceModule === "object" ? sourceModule?.module_order ?? sourceModule?.order : void 0) ?? lesson?.module_order ?? groups.size + 1),
				lessons: []
			};
			group.lessons.push(normalizeLesson(lesson, index));
			groups.set(moduleId, group);
		});
		if (unassignedLessons.length > 0) groups.set("module-unassigned", {
			id: "module-unassigned",
			title: "Course lessons",
			description: "These lessons have not been assigned to a course module yet.",
			module_order: Number.MAX_SAFE_INTEGER,
			lessons: unassignedLessons
		});
		return Array.from(groups.values()).sort((left, right) => left.module_order - right.module_order);
	};
	let lessons = [];
	let courseModules = [];
	try {
		const [lessonPayload, coursePayload] = await Promise.all([apiRequest(`/lessons/course/${slug}/`).catch(() => null), apiRequest(`/courses/${slug}/`).catch(() => null)]);
		lessons = readItems(lessonPayload);
		courseModules = readItems(coursePayload).filter((item) => Array.isArray(item?.lessons) || Array.isArray(item?.lesson_set) || item?.module_order !== void 0);
	} catch {}
	const normalizedModules = normalizeModules(courseModules);
	const groupedLessons = groupLessons(lessons);
	if (normalizedModules.length === 0) return groupedLessons;
	const lessonsByModule = new Map(groupedLessons.map((module) => [String(module.id), module.lessons]));
	return normalizedModules.map((module) => ({
		...module,
		lessons: lessonsByModule.get(String(module.id)) ?? module.lessons
	}));
}
async function removeFromWishlist(courseSlug) {
	try {
		return await apiRequest(`/courses/${courseSlug}/wishlist/`, { method: "DELETE" });
	} catch {
		return null;
	}
}
async function enrollInCourse(courseSlug) {
	return await apiRequest(`/enrollments/${courseSlug}/enroll/`, { method: "POST" });
}
//#endregion
export { submitQuizAnswers as A, isAccessTokenExpired as C, markNotificationsRead as D, markLessonComplete as E, register as O, initiatePayment as S, logout as T, getProfile as _, getAssignments as a, getStoredSession as b, getCourseModules as c, getMe as d, getMeStats as f, getPaymentHistory as g, getNotifications as h, enrollInCourse as i, verifyCertificate as j, removeFromWishlist as k, getCourses as l, getMyEnrollments as m, checkCourseEnrollment as n, getBlogPosts as o, getMyCertificates as p, clearStoredSession as r, getCourse as s, apiRequest as t, getLearningPaths as u, getQuiz as v, login as w, getWishlistCourses as x, getQuizzesForCourse as y };

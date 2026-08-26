import { r as __toESM } from "../_runtime.mjs";
import { A as submitQuizAnswers, E as markLessonComplete, v as getQuiz, y as getQuizzesForCourse } from "./api-C11h0hEw.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Maximize, D as Minimize, K as FileText, O as MessageSquare, P as Lock, T as Pause, X as ExternalLink, Z as Download, b as Settings, ct as ChevronLeft, i as Volume2, lt as ChevronDown, m as SquarePen, pt as Bookmark, q as FileSpreadsheet, r as VolumeX, st as ChevronRight, ut as Check, w as Play } from "../_libs/lucide-react.mjs";
import { t as Route } from "./student.study._slug-BzQrWOLL.mjs";
import { t as setSelectedCourseSlug } from "./student-onboarding-CGj2r6iI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.study._slug-BTZcKVwO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudyInterface() {
	const { course, modules: initialModules } = Route.useLoaderData();
	const [tab, setTab] = (0, import_react.useState)("notes");
	const [showOutline, setShowOutline] = (0, import_react.useState)(true);
	const [modules, setModules] = (0, import_react.useState)(initialModules ?? []);
	const [quizzes, setQuizzes] = (0, import_react.useState)([]);
	const [activeQuiz, setActiveQuiz] = (0, import_react.useState)(null);
	const [quizAnswers, setQuizAnswers] = (0, import_react.useState)({});
	const [quizResult, setQuizResult] = (0, import_react.useState)(null);
	const [loadingQuiz, setLoadingQuiz] = (0, import_react.useState)(false);
	const [collapsedSections, setCollapsedSections] = (0, import_react.useState)({
		notes: false,
		resources: false,
		discussion: false,
		quiz: false
	});
	const notesDefault = typeof (course.raw?.notes ?? course.raw?.default_notes) === "string" ? String(course.raw?.notes ?? course.raw?.default_notes) : "";
	const resources = Array.isArray(course.raw?.resources) ? course.raw.resources : Array.isArray(course.raw?.materials) ? course.raw.materials : [];
	const discussionThreads = Array.isArray(course.raw?.discussion) ? course.raw.discussion : Array.isArray(course.raw?.forum_threads) ? course.raw.forum_threads : [];
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [currentTime, setCurrentTime] = (0, import_react.useState)(0);
	const [volume, setVolume] = (0, import_react.useState)(1);
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
	const [playbackRate, setPlaybackRate] = (0, import_react.useState)(1);
	const [showSettings, setShowSettings] = (0, import_react.useState)(false);
	const [isSeeking, setIsSeeking] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [isYouTubeReady, setIsYouTubeReady] = (0, import_react.useState)(false);
	const [youtubePlayer, setYoutubePlayer] = (0, import_react.useState)(null);
	const [isYouTube, setIsYouTube] = (0, import_react.useState)(false);
	const videoRef = (0, import_react.useRef)(null);
	const playerContainerRef = (0, import_react.useRef)(null);
	const youtubeContainerRef = (0, import_react.useRef)(null);
	const progressHoverRef = (0, import_react.useRef)(null);
	const settingsRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setModules(Array.isArray(initialModules) ? initialModules : []);
		setSelectedCourseSlug(course.slug);
		getQuizzesForCourse(course.slug).then(setQuizzes);
		if (!window.YT) {
			const tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
		}
		return () => {
			if (youtubePlayer && typeof youtubePlayer.destroy === "function") youtubePlayer.destroy();
		};
	}, [course.slug, initialModules]);
	const orderedModules = (0, import_react.useMemo)(() => [...modules].sort((left, right) => {
		return Number(left?.module_order ?? left?.order ?? Number.MAX_SAFE_INTEGER) - Number(right?.module_order ?? right?.order ?? Number.MAX_SAFE_INTEGER);
	}), [modules]);
	const lessonList = (0, import_react.useMemo)(() => orderedModules.flatMap((module) => Array.isArray(module.lessons) ? module.lessons : []), [orderedModules]);
	const [currentLessonId, setCurrentLessonId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (lessonList.length > 0) {
			const firstIncomplete = lessonList.find((lesson) => !lesson.completed);
			setCurrentLessonId(firstIncomplete?.id ?? lessonList[0]?.id);
		}
	}, [lessonList]);
	const currentLesson = (0, import_react.useMemo)(() => {
		if (!currentLessonId) return null;
		return lessonList.find((l) => l.id === currentLessonId);
	}, [currentLessonId, lessonList]);
	const currentLessonIndex = (0, import_react.useMemo)(() => lessonList.findIndex((l) => l.id === currentLessonId), [currentLessonId, lessonList]);
	const nextLessonIndex = (0, import_react.useMemo)(() => {
		const index = lessonList.findIndex((lesson) => !lesson.completed);
		return index === -1 ? lessonList.length : index;
	}, [lessonList]);
	const completed = lessonList.filter((lesson) => lesson.completed === true).length;
	const total = lessonList.length;
	const pct = total ? Math.round(completed / total * 100) : 0;
	const getVideoInfo = (url) => {
		if (!url) return null;
		const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[&#?]|$)/i);
		if (youtubeMatch) return {
			type: "youtube",
			videoId: youtubeMatch[1]
		};
		if (/(?:youtube\.com|youtu\.be)/i.test(url)) return null;
		if (/\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url) || url.includes("cloudfront.net") || url.includes("storage.googleapis.com") || /^https?:\/\//i.test(url)) return {
			type: "direct",
			url
		};
		return null;
	};
	const lessonContent = currentLesson?.content ?? currentLesson?.description ?? "";
	const lessonType = String(currentLesson?.type ?? "video").toLowerCase();
	const audioUrl = currentLesson?.audio_file ?? currentLesson?.audio_url ?? "";
	const documentUrls = [currentLesson?.pdf_file ? {
		label: "PDF document",
		url: currentLesson.pdf_file
	} : null, currentLesson?.ppt_file ? {
		label: "PowerPoint slides",
		url: currentLesson.ppt_file
	} : null].filter(Boolean);
	const lessonResources = [...Array.isArray(currentLesson?.resources) ? currentLesson.resources : resources, ...documentUrls];
	const videoUrl = currentLesson?.video_url ?? currentLesson?.video_url_resolved ?? currentLesson?.video?.url ?? currentLesson?.content_url ?? "";
	const dbDuration = currentLesson?.duration || currentLesson?.estimated_duration || currentLesson?.video_duration || 0;
	const videoInfo = (0, import_react.useMemo)(() => getVideoInfo(videoUrl), [videoUrl]);
	const hasYouTubeMethods = (player) => Boolean(player && typeof player.getDuration === "function" && typeof player.getCurrentTime === "function");
	(0, import_react.useEffect)(() => {
		if (videoInfo?.type !== "youtube" || !youtubeContainerRef.current) return;
		let cancelled = false;
		let retryTimer;
		let playerInstance = null;
		const loadYouTubePlayer = () => {
			if (cancelled || !youtubeContainerRef.current) return;
			if (window.YT && window.YT.Player) try {
				playerInstance = new window.YT.Player(youtubeContainerRef.current, {
					height: "100%",
					width: "100%",
					videoId: videoInfo.videoId,
					playerVars: {
						controls: 1,
						disablekb: 0,
						fs: 1,
						rel: 0,
						modestbranding: 1,
						autoplay: 0
					},
					events: {
						onReady: (event) => {
							if (!hasYouTubeMethods(event.target)) {
								setError("YouTube player could not be loaded for this lesson.");
								return;
							}
							setIsYouTubeReady(true);
							setYoutubePlayer(event.target);
							if (dbDuration > 0) setDuration(dbDuration);
							else setDuration(event.target.getDuration());
							setIsYouTube(true);
						},
						onStateChange: (event) => {
							const state = event.data;
							setIsPlaying(state === window.YT.PlayerState.PLAYING);
							setIsLoading(state === window.YT.PlayerState.BUFFERING);
							if (state === window.YT.PlayerState.ENDED) {
								setIsPlaying(false);
								setProgress(100);
							}
						},
						onError: () => setError("YouTube player error. Please try another lesson.")
					}
				});
			} catch {
				setError("This lesson has an invalid YouTube video link.");
				setIsLoading(false);
			}
			else retryTimer = setTimeout(loadYouTubePlayer, 100);
		};
		loadYouTubePlayer();
		return () => {
			cancelled = true;
			if (retryTimer) clearTimeout(retryTimer);
			if (playerInstance && typeof playerInstance.destroy === "function") playerInstance.destroy();
			setIsYouTubeReady(false);
			setYoutubePlayer(null);
			setIsYouTube(false);
		};
	}, [videoInfo, dbDuration]);
	(0, import_react.useEffect)(() => {
		if (!hasYouTubeMethods(youtubePlayer) || !isYouTubeReady) return;
		const interval = setInterval(() => {
			try {
				const current = youtubePlayer.getCurrentTime();
				const dur = youtubePlayer.getDuration();
				if (dur > 0) {
					setCurrentTime(current);
					setProgress(current / dur * 100);
				}
			} catch (e) {}
		}, 250);
		return () => clearInterval(interval);
	}, [youtubePlayer, isYouTubeReady]);
	const togglePlay = () => {
		if (videoInfo?.type === "youtube" && youtubePlayer && isYouTubeReady) {
			if (isPlaying) youtubePlayer.pauseVideo();
			else youtubePlayer.playVideo();
			return;
		}
		if (!videoRef.current) return;
		if (isPlaying) videoRef.current.pause();
		else videoRef.current.play().catch((err) => {
			setError("Unable to play video. Please try again.");
			console.error("Play error:", err);
		});
	};
	const handleTimeUpdate = () => {
		if (!videoRef.current || videoInfo?.type === "youtube") return;
		const current = videoRef.current.currentTime;
		const dur = videoRef.current.duration || 0;
		setCurrentTime(current);
		setProgress(dur ? current / dur * 100 : 0);
	};
	const handleLoadedMetadata = () => {
		if (!videoRef.current) return;
		if (dbDuration > 0) setDuration(dbDuration);
		else setDuration(videoRef.current.duration);
		setIsLoading(false);
	};
	const handleSeek = (e) => {
		if (videoInfo?.type === "youtube" && youtubePlayer && isYouTubeReady) {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const newTime = x * youtubePlayer.getDuration();
			youtubePlayer.seekTo(newTime, true);
			setProgress(x * 100);
			return;
		}
		if (!videoRef.current) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const newTime = x * videoRef.current.duration;
		videoRef.current.currentTime = newTime;
		setProgress(x * 100);
	};
	const handleVolumeChange = (e) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
		if (videoInfo?.type === "youtube" && youtubePlayer && isYouTubeReady) {
			youtubePlayer.setVolume(newVolume * 100);
			if (newVolume === 0) setIsMuted(true);
			else setIsMuted(false);
		} else if (videoRef.current) {
			videoRef.current.volume = newVolume;
			videoRef.current.muted = newVolume === 0;
			setIsMuted(newVolume === 0);
		}
	};
	const toggleMute = () => {
		if (videoInfo?.type === "youtube" && youtubePlayer && isYouTubeReady) {
			const newMuted = !isMuted;
			if (newMuted) youtubePlayer.mute();
			else {
				youtubePlayer.unMute();
				youtubePlayer.setVolume(volume * 100);
			}
			setIsMuted(newMuted);
			return;
		}
		if (!videoRef.current) return;
		const newMuted = !isMuted;
		videoRef.current.muted = newMuted;
		setIsMuted(newMuted);
	};
	const toggleFullscreen = () => {
		if (!playerContainerRef.current) return;
		if (!document.fullscreenElement) {
			playerContainerRef.current.requestFullscreen();
			setIsFullscreen(true);
		} else {
			document.exitFullscreen();
			setIsFullscreen(false);
		}
	};
	const changePlaybackRate = (rate) => {
		setPlaybackRate(rate);
		if (videoInfo?.type === "youtube" && youtubePlayer && isYouTubeReady) youtubePlayer.setPlaybackRate(rate);
		else if (videoRef.current) videoRef.current.playbackRate = rate;
		setShowSettings(false);
	};
	const formatTime = (seconds) => {
		if (!seconds || isNaN(seconds) || seconds === Infinity) return "0:00";
		const hours = Math.floor(seconds / 3600);
		const mins = Math.floor(seconds % 3600 / 60);
		const secs = Math.floor(seconds % 60);
		if (hours > 0) return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};
	const handlePreviousLesson = () => {
		if (currentLessonIndex > 0) {
			const prevLesson = lessonList[currentLessonIndex - 1];
			setCurrentLessonId(prevLesson.id);
			resetPlayer();
		}
	};
	const handleNextLesson = () => {
		if (currentLessonIndex < lessonList.length - 1) {
			const nextLesson = lessonList[currentLessonIndex + 1];
			setCurrentLessonId(nextLesson.id);
			resetPlayer();
		}
	};
	const resetPlayer = () => {
		setIsPlaying(false);
		setProgress(0);
		setCurrentTime(0);
		setError(null);
		setIsLoading(false);
		if (youtubePlayer && isYouTubeReady) {
			youtubePlayer.seekTo(0);
			youtubePlayer.pauseVideo();
		}
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			videoRef.current.pause();
		}
	};
	const startQuiz = async (quizId) => {
		setLoadingQuiz(true);
		const quiz = await getQuiz(quizId);
		setActiveQuiz(quiz);
		setQuizAnswers({});
		setQuizResult(null);
		setLoadingQuiz(false);
	};
	const submitQuiz = async () => {
		if (!activeQuiz) return;
		setLoadingQuiz(true);
		const payload = { answers: activeQuiz.questions.reduce((acc, question) => {
			if (quizAnswers[question.id]) acc[question.id] = quizAnswers[question.id];
			return acc;
		}, {}) };
		const result = await submitQuizAnswers(activeQuiz.id, payload);
		setQuizResult(result);
		setLoadingQuiz(false);
	};
	const handleMarkComplete = async () => {
		if (!currentLesson) return;
		if ((await markLessonComplete(currentLesson.id))?.completed) setModules((prevModules) => prevModules.map((mod) => ({
			...mod,
			lessons: (mod.lessons ?? []).map((l) => l.id === currentLesson.id ? {
				...l,
				completed: true
			} : l)
		})));
	};
	(0, import_react.useEffect)(() => {
		const handleClickOutside = (event) => {
			if (settingsRef.current && !settingsRef.current.contains(event.target)) setShowSettings(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const toggleSection = (section) => {
		setCollapsedSections((prev) => ({
			...prev,
			[section]: !prev[section]
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-4 -my-6 sm:-mx-6 lg:-mx-8 lg:-my-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[340px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "order-2 border-r border-border bg-card lg:order-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/student/course/$slug",
							params: { slug: course.slug },
							className: "inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" }), " Course overview"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 sm:mt-3 text-sm sm:text-[15px] font-semibold leading-snug line-clamp-2",
							children: course.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 flex-1 overflow-hidden rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary transition-all",
									style: { width: `${pct}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground whitespace-nowrap",
								children: [pct, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowOutline((s) => !s),
							className: "mt-4 inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-[12px] border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary lg:hidden",
							children: [
								showOutline ? "Hide" : "Show",
								" lesson outline ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-3 w-3 transition-transform ${showOutline ? "rotate-180" : ""}` })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `p-2 sm:p-3 lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto ${showOutline ? "block" : "hidden lg:block"}`,
					children: orderedModules.map((m, mi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						open: mi === 0,
						className: "group mb-1 rounded-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "flex cursor-pointer items-center justify-between gap-2 rounded-xl px-2 sm:px-3 py-2.5 hover:bg-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
									children: [
										"Module ",
										mi + 1,
										": ",
										m.title
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 truncate text-xs sm:text-sm font-semibold",
									children: m.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 space-y-0.5 pb-2",
							children: (Array.isArray(m.lessons) ? m.lessons : []).map((l) => {
								const lessonIndex = lessonList.findIndex((lesson) => lesson.id === l.id);
								const isCurrent = l.id === currentLessonId;
								const isLocked = !l.completed && lessonIndex > nextLessonIndex;
								const lessonDuration = l.duration || l.estimated_duration || l.video_duration || 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									disabled: isLocked,
									onClick: () => {
										if (isLocked) return;
										setCurrentLessonId(l.id);
										resetPlayer();
									},
									className: `flex w-full items-center gap-2 sm:gap-3 rounded-lg px-2 sm:px-3 py-2 text-left text-xs sm:text-sm transition-colors ${isCurrent ? "bg-primary/10 text-primary" : isLocked ? "cursor-not-allowed opacity-45" : "hover:bg-secondary"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid h-5 w-5 shrink-0 place-items-center rounded-full ${l.completed ? "bg-primary text-primary-foreground" : isCurrent ? "bg-primary/20 text-primary" : "border border-border text-muted-foreground"}`,
											children: l.completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3 w-3 fill-current" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 flex-1 truncate",
											children: l.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] sm:text-[11px] text-muted-foreground whitespace-nowrap",
											children: lessonDuration > 0 ? formatTime(lessonDuration) : l.duration || "0:00"
										})
									]
								}) }, l.id);
							})
						})]
					}, m.id ?? `${m.title}-${mi}`))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-1 flex flex-col lg:order-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-[#0A1A15] px-0 pt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: playerContainerRef,
							className: "relative aspect-video w-full overflow-hidden bg-[#0A1A15] text-white",
							children: lessonType === "audio" && audioUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#0A1A15] p-6 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-20 w-20 place-items-center rounded-full bg-[#2ECC71]/15 text-[#2ECC71]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-9 w-9" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full max-w-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-3 text-center text-sm text-white/70",
										children: "Audio lesson"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
										className: "w-full",
										controls: true,
										src: audioUrl
									})]
								})]
							}) : lessonType === "document" && documentUrls.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0A1A15] p-6 text-center text-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-12 w-12 text-[#2ECC71]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: "Open the lesson document"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-white/60",
										children: "Choose a file to view or download."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap justify-center gap-2",
										children: documentUrls.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: file.url,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), file.label]
										}, file.url))
									})
								]
							}) : videoInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: videoInfo.type === "youtube" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								ref: youtubeContainerRef,
								className: "absolute inset-0 h-full w-full bg-[#0A1A15]"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
									ref: videoRef,
									src: videoInfo.url,
									className: "absolute inset-0 h-full w-full object-contain bg-[#0A1A15]",
									onTimeUpdate: handleTimeUpdate,
									onLoadedMetadata: handleLoadedMetadata,
									onPlay: () => setIsPlaying(true),
									onPause: () => setIsPlaying(false),
									onEnded: () => {
										setIsPlaying(false);
										setProgress(100);
									},
									onWaiting: () => setIsLoading(true),
									onCanPlay: () => setIsLoading(false),
									onError: () => setError("Error loading video. Please try again.")
								}),
								isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex items-center justify-center bg-[#0A1A15]/80",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-3 border-white/30 border-t-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] sm:text-xs text-white/60",
											children: "Loading video..."
										})]
									})
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex flex-col items-center justify-center bg-[#0A1A15]/95 p-4 sm:p-6 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "max-w-xs sm:max-w-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mb-3 text-3xl sm:text-4xl",
												children: "⚠️"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs sm:text-sm text-white/90",
												children: error
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setError(null),
												className: "mt-4 rounded-full bg-white/10 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-white/80 hover:bg-white/20 transition-colors",
												children: "Dismiss"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1A15]/90 via-[#0A1A15]/40 to-transparent p-2 sm:p-3 pt-6 sm:pt-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "group relative h-1 cursor-pointer rounded-full bg-white/20 hover:h-1.5 transition-all duration-200",
										onClick: handleSeek,
										ref: progressHoverRef,
										onMouseMove: (e) => {
											if (!progressHoverRef.current) return;
											const rect = progressHoverRef.current.getBoundingClientRect();
											const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
											const time = x * (videoRef.current?.duration || 0);
											const tooltip = document.getElementById("progress-tooltip");
											if (tooltip) {
												tooltip.textContent = formatTime(time);
												tooltip.style.left = `${x * 100}%`;
												tooltip.classList.remove("opacity-0");
											}
										},
										onMouseLeave: () => {
											const tooltip = document.getElementById("progress-tooltip");
											if (tooltip) tooltip.classList.add("opacity-0");
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full bg-[#2ECC71] transition-all duration-150",
												style: { width: `${progress}%` }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute top-1/2 -translate-y-1/2 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[#2ECC71] opacity-0 group-hover:opacity-100 transition-opacity duration-200",
												style: { left: `calc(${progress}% - 4px)` }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												id: "progress-tooltip",
												className: "absolute -top-7 sm:-top-8 -translate-x-1/2 rounded bg-[#0A1A15]/90 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-medium opacity-0 transition-opacity pointer-events-none whitespace-nowrap",
												children: "0:00"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 sm:mt-3 flex items-center justify-between text-white/90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 sm:gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: togglePlay,
													className: "rounded-full p-1 sm:p-1.5 hover:bg-white/10 transition-colors",
													"aria-label": isPlaying ? "Pause" : "Play",
													children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-3.5 w-3.5 sm:h-5 sm:w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5 sm:h-5 sm:w-5 fill-current" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: toggleMute,
													className: "rounded-full p-1 sm:p-1.5 hover:bg-white/10 transition-colors",
													"aria-label": isMuted ? "Unmute" : "Mute",
													children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-3 w-3 sm:h-4 sm:w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-3 w-3 sm:h-4 sm:w-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "range",
													min: "0",
													max: "1",
													step: "0.01",
													value: isMuted ? 0 : volume,
													onChange: handleVolumeChange,
													className: "hidden sm:block w-12 sm:w-16 accent-[#2ECC71]",
													style: {
														background: `linear-gradient(to right, #2ECC71 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`,
														height: "3px",
														borderRadius: "2px",
														cursor: "pointer",
														WebkitAppearance: "none"
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "hidden xs:inline text-[10px] sm:text-xs font-mono text-white/70",
													children: [
														formatTime(currentTime),
														" / ",
														formatTime(dbDuration || duration)
													]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 sm:gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "hidden md:inline text-[8px] sm:text-[10px] text-white/50 font-mono",
													children: [playbackRate, "x"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													ref: settingsRef,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setShowSettings(!showSettings),
														className: "rounded-full p-1 sm:p-1.5 hover:bg-white/10 transition-colors",
														"aria-label": "Settings",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-3 w-3 sm:h-4 sm:w-4" })
													}), showSettings && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "absolute bottom-full right-0 mb-2 rounded-lg bg-[#1A2A25] border border-white/10 p-1.5 sm:p-2 min-w-[120px] sm:min-w-[140px] shadow-xl",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-[8px] sm:text-[10px] font-medium uppercase tracking-wider text-white/40 px-2 pb-1.5",
															children: "Speed"
														}), [
															.5,
															.75,
															1,
															1.25,
															1.5,
															2
														].map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => changePlaybackRate(rate),
															className: `w-full rounded px-2 sm:px-3 py-1 sm:py-1.5 text-left text-[10px] sm:text-xs transition-colors ${playbackRate === rate ? "bg-[#2ECC71]/20 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "flex items-center justify-between",
																children: [
																	rate,
																	"x",
																	playbackRate === rate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#2ECC71]" })
																]
															})
														}, rate))]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: toggleFullscreen,
													className: "rounded-full p-1 sm:p-1.5 hover:bg-white/10 transition-colors",
													"aria-label": isFullscreen ? "Exit fullscreen" : "Fullscreen",
													children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize, { className: "h-3 w-3 sm:h-4 sm:w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "h-3 w-3 sm:h-4 sm:w-4" })
												})
											]
										})]
									})]
								})
							] }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0A1A15] to-[#1A2A25]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 sm:h-7 sm:w-7 fill-white/30 text-white/30" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 sm:mt-3 text-xs sm:text-sm text-white/40",
									children: currentLesson ? lessonType === "text" ? "Read the lesson content below" : "No media available" : "No lesson selected"
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-border bg-card px-3 sm:px-6 py-2.5 sm:py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-2 sm:gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: currentLesson ? `Lesson ${currentLessonIndex + 1} of ${total}` : "Course Overview"
										}),
										dbDuration > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-border hidden xs:inline",
											children: "•"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden xs:inline",
													children: "⏱"
												}),
												" ",
												formatTime(dbDuration)
											]
										})] }),
										currentLesson?.completed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-border hidden sm:inline",
											children: "•"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-green-600 text-[10px] sm:text-xs flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), " Completed"]
										})] })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-0.5 sm:mt-1 text-base sm:text-xl lg:text-2xl font-semibold leading-snug truncate",
									children: currentLesson?.title ?? "No active lesson"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 sm:gap-1.5 shrink-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										title: "Bookmark",
										className: "grid h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										title: "Notes",
										className: "grid h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleMarkComplete,
										disabled: !currentLesson || currentLesson.completed,
										className: "inline-flex items-center justify-center gap-1 rounded-xl bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 sm:h-4 sm:w-4" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden xs:inline",
												children: currentLesson?.completed ? "Completed" : "Mark complete"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "xs:hidden",
												children: currentLesson?.completed ? "✓" : "Done"
											})
										]
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 bg-background px-3 sm:px-4 lg:px-6 py-4 sm:py-5 lg:py-6",
						children: [
							lessonContent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "mb-4 sm:mb-5 card-surface p-4 sm:p-5 lg:p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground",
									children: "Lesson content"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "prose prose-sm mt-2 sm:mt-3 max-w-none text-xs sm:text-sm leading-6 sm:leading-7 text-foreground/80",
									dangerouslySetInnerHTML: { __html: lessonContent }
								})]
							}),
							(lessonType === "assignment" || lessonType === "quiz") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: lessonType === "assignment" ? "Ready to submit your work?" : "Ready to test your knowledge?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-xs text-muted-foreground",
									children: lessonType === "assignment" ? "Review the instructions, then submit your completed work." : "Start the quiz when you are ready."
								})] }), lessonType === "assignment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/student/assignments",
									className: "inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
									children: ["Submit assignment", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setTab("quiz"),
									className: "inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
									children: ["Start quiz", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 overflow-x-auto rounded-[14px] border border-border bg-card p-1",
								children: [
									{
										k: "notes",
										l: "Notes",
										i: SquarePen
									},
									{
										k: "resources",
										l: "Resources",
										i: FileText
									},
									{
										k: "discussion",
										l: "Discussion",
										i: MessageSquare
									},
									{
										k: "quiz",
										l: "Quiz",
										i: Check
									}
								].map(({ k, l, i: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setTab(k),
									className: `inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-[10px] px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium transition-colors ${tab === k ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden xs:inline",
											children: l
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "xs:hidden",
											children: l.charAt(0)
										})
									]
								}, k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 sm:mt-5 space-y-4 sm:space-y-5",
								children: [
									tab === "notes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "card-surface p-4 sm:p-5 lg:p-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => toggleSection("notes"),
											className: "flex w-full items-center justify-between text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground",
												children: "Your notes"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs sm:text-sm text-muted-foreground mt-0.5",
												children: collapsedSections.notes ? "Click to expand" : "Add your personal notes here"
											})] }), collapsedSections.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" })]
										}), !collapsedSections.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											className: "mt-3 min-h-[180px] sm:min-h-[220px] w-full resize-y rounded-2xl border border-border bg-background p-3 sm:p-4 text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary",
											placeholder: notesDefault ? "Add notes for this lesson…" : "Write notes for this lesson…",
											defaultValue: typeof notesDefault === "string" ? notesDefault : ""
										})]
									}),
									tab === "resources" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "card-surface p-4 sm:p-5 lg:p-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => toggleSection("resources"),
											className: "flex w-full items-center justify-between text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground",
												children: "Resources"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs sm:text-sm text-muted-foreground mt-0.5",
												children: collapsedSections.resources ? "Click to expand" : `${lessonResources.length} resource${lessonResources.length !== 1 ? "s" : ""} available`
											})] }), collapsedSections.resources ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" })]
										}), !collapsedSections.resources && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 grid gap-3 sm:grid-cols-1 lg:grid-cols-2",
											children: lessonResources.length ? lessonResources.map((r, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-3 rounded-xl border border-border p-3 sm:p-4 hover:bg-secondary/30 transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 sm:gap-3 min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs sm:text-sm font-medium leading-snug truncate",
														children: typeof r === "string" ? r : r.title ?? r.name ?? JSON.stringify(r)
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "grid h-7 w-7 sm:h-9 sm:w-9 place-items-center rounded-full border border-border hover:bg-secondary transition-colors shrink-0",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3 sm:h-4 sm:w-4" })
												})]
											}, index)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "col-span-full rounded-2xl border border-border bg-background p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground text-center",
												children: "No resources are available for this course right now."
											})
										})]
									}),
									tab === "discussion" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "card-surface p-4 sm:p-5 lg:p-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => toggleSection("discussion"),
											className: "flex w-full items-center justify-between text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground",
												children: "Discussion"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs sm:text-sm text-muted-foreground mt-0.5",
												children: collapsedSections.discussion ? "Click to expand" : `${discussionThreads.length} post${discussionThreads.length !== 1 ? "s" : ""}`
											})] }), collapsedSections.discussion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" })]
										}), !collapsedSections.discussion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 space-y-4 sm:space-y-5",
											children: discussionThreads.length ? discussionThreads.map((item, index) => {
												const author = item.author ?? item.user ?? item.posted_by ?? "Learner";
												const time = item.updated_at ? new Date(item.updated_at).toLocaleDateString() : item.time ?? "Recently";
												const message = item.message ?? item.body ?? item.text ?? "No message provided.";
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-2 sm:gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-semibold",
														children: String(author).split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-xs sm:text-sm flex flex-wrap items-center gap-1 sm:gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-semibold",
																children: author
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] sm:text-xs text-muted-foreground",
																children: time
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground break-words",
															children: message
														})]
													})]
												}, `${author}-${index}`);
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs sm:text-sm text-muted-foreground text-center py-4",
												children: "No discussion posts are available for this lesson yet."
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 sm:mt-6 flex flex-col gap-2 border-t border-border pt-4 sm:pt-5 sm:flex-row",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												placeholder: "Add to the discussion…",
												className: "flex-1 rounded-[14px] border border-border bg-background px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "rounded-[14px] bg-primary px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-primary-foreground hover:bg-primary/90 whitespace-nowrap",
												children: "Post"
											})]
										})] })]
									}),
									tab === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "card-surface p-4 sm:p-5 lg:p-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => toggleSection("quiz"),
											className: "flex w-full items-center justify-between text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] sm:text-xs font-medium uppercase tracking-widest text-primary",
												children: "Quiz"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "mt-0.5 sm:mt-1 text-sm sm:text-[17px] font-semibold",
												children: activeQuiz ? activeQuiz.title : "Practice quiz"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [loadingQuiz && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full bg-secondary px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-foreground/80",
													children: "Loading…"
												}), collapsedSections.quiz ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" })]
											})]
										}), !collapsedSections.quiz && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!activeQuiz && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-4 sm:mt-5 space-y-3 sm:space-y-4",
											children: quizzes.length ? quizzes.map((quiz) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => void startQuiz(quiz.id),
												className: "w-full rounded-2xl border border-border bg-background px-3 sm:px-4 py-3 sm:py-4 text-left transition hover:border-primary/40 hover:bg-secondary/40",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs sm:text-sm font-medium",
														children: quiz.title ?? quiz.name ?? "Course quiz"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] sm:text-xs text-muted-foreground",
														children: "Start →"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 sm:mt-2 text-[11px] sm:text-sm text-muted-foreground line-clamp-2",
													children: quiz.description ?? quiz.summary ?? "Test your understanding before moving on."
												})]
											}, quiz.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-2xl border border-border bg-background p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground text-center",
												children: "No quizzes are available for this course yet."
											})
										}), activeQuiz && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 sm:mt-5 space-y-4 sm:space-y-5",
											children: [
												activeQuiz.questions.length ? activeQuiz.questions.map((question, qi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-2xl border border-border p-3 sm:p-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs sm:text-sm font-semibold",
														children: `Q${qi + 1}. ${question.prompt}`
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mt-2 sm:mt-3 space-y-1.5 sm:space-y-2",
														children: question.choices.length ? question.choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "flex cursor-pointer items-center gap-2 sm:gap-3 rounded-2xl border border-border px-2 sm:px-3 py-2 sm:py-3 hover:border-primary/40 hover:bg-secondary/40 transition-colors",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "radio",
																name: question.id,
																value: choice.value ?? choice.id,
																checked: quizAnswers[question.id] === (choice.value ?? choice.id),
																onChange: () => setQuizAnswers((prev) => ({
																	...prev,
																	[question.id]: choice.value ?? choice.id
																})),
																className: "h-3.5 w-3.5 sm:h-4 sm:w-4 accent-primary shrink-0"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-xs sm:text-sm",
																children: choice.label
															})]
														}, choice.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-xs sm:text-sm text-muted-foreground",
															children: "No answer choices available for this question."
														})
													})]
												}, question.id ?? qi)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "rounded-2xl border border-border bg-background p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground text-center",
													children: "This quiz does not contain any questions yet."
												}),
												quizResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-2xl border border-success/20 bg-success/5 p-3 sm:p-4 text-xs sm:text-sm text-success",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-semibold",
															children: "Quiz submitted!"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "mt-1",
															children: quizResult?.message ?? "Your answers have been submitted."
														}),
														quizResult?.score !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "mt-2 font-bold",
															children: [
																"Score: ",
																quizResult.score,
																"%"
															]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap gap-2 sm:gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: submitQuiz,
														disabled: loadingQuiz,
														className: "inline-flex items-center justify-center rounded-[14px] bg-primary px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed",
														children: "Submit answers"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => {
															setActiveQuiz(null);
															setQuizAnswers({});
															setQuizResult(null);
														},
														className: "inline-flex items-center justify-center rounded-[14px] border border-border bg-card px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-secondary",
														children: "Back to quizzes"
													})]
												})
											]
										})] })]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 border-t border-border bg-card px-3 sm:px-6 py-3 sm:py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handlePreviousLesson,
								disabled: currentLessonIndex === 0,
								className: "inline-flex items-center gap-1 sm:gap-2 rounded-[14px] border border-border px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden xs:inline",
										children: "Previous"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "xs:hidden",
										children: "Prev"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10px] sm:text-xs text-muted-foreground text-center px-2",
								children: [total > 0 && currentLesson ? `Lesson ${currentLessonIndex + 1} of ${total}` : "Lesson overview", dbDuration > 0 && ` · ${formatTime(dbDuration)}`]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleNextLesson,
								disabled: currentLessonIndex === lessonList.length - 1,
								className: "inline-flex items-center gap-1 sm:gap-2 rounded-[14px] bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden xs:inline",
										children: "Next lesson"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "xs:hidden",
										children: "Next"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
								]
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { StudyInterface as component };

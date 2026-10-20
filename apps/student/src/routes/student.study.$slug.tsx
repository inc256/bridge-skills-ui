import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Check, ChevronLeft, ChevronRight, Play, Pause, Volume2, Maximize, Settings, MessageSquare,
  FileText, Download, Bookmark, ChevronDown, Minimize, VolumeX, FileSpreadsheet, ExternalLink,
  Lock, ChevronUp,
} from "lucide-react";
import { useEffect, useState, useMemo, useRef } from "react";
import { getCourse, getCourseModules, getLessonProgress, getQuizzesForCourse, getQuiz, markLessonComplete, resolveCourseMedia, sortCourseModules, submitQuizAnswers, syncLessonProgress } from "@/lib/api";
import { setSelectedCourseSlug } from "@/lib/student-onboarding";
import { getLocalStudyState, saveLocalLessonPosition, saveLocalStudyState } from "@/lib/study-progress";
import { AudioPlayer } from "@/components/audio-player";
import { PdfViewer } from "@/components/pdf-viewer";
import { PptViewer } from "@/components/ppt-viewer";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/student/study/$slug")({
  loader: async ({ params }) => {
    const [course, modules] = await Promise.all([getCourse(params.slug), getCourseModules(params.slug)]);
    if (!course) throw notFound();
    return { course, modules };
  },
  component: StudyInterface,
});

function StudyInterface() {
  const { course, modules: initialModules } = Route.useLoaderData();
  const isMobile = useIsMobile();
  const [tab, setTab] = useState<"resources" | "discussion">("resources");
  const [showOutline, setShowOutline] = useState(true);
  const [modules, setModules] = useState<any[]>(initialModules ?? []);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<any>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isYouTubeReady, setIsYouTubeReady] = useState(false);
  const [youtubePlayer, setYoutubePlayer] = useState<any>(null);
  const [isYouTube, setIsYouTube] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionError, setCompletionError] = useState<string | null>(null);
  const [xpRewardMessage, setXpRewardMessage] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<{ label: string; url: string; type: "pdf" | "ppt" | "audio" } | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [savedPosition, setSavedPosition] = useState(0);
  const navigationExpanded = isMobile || showOutline;

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const youtubeContainerRef = useRef<HTMLDivElement>(null);
  const progressHoverRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const lastSyncedProgressRef = useRef(0);
  const lastKnownPositionRef = useRef(0);

  useEffect(() => {
    setModules(Array.isArray(initialModules) ? sortCourseModules(initialModules) : []);
    setSelectedCourseSlug(course.slug);
    void getQuizzesForCourse(course.slug).then(setQuizzes);

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    return () => {
      if (youtubePlayer && typeof youtubePlayer.destroy === 'function') {
        youtubePlayer.destroy();
      }
    };
  }, [course.slug, initialModules]);

  const modulePriority = (title: unknown) => {
    const normalizedTitle = String(title ?? "").toLowerCase();
    if (/\b(introduction|intro|welcome|get started)\b/.test(normalizedTitle)) return 0;
    if (/\b(conclusion|summary|final|wrap[- ]?up)\b/.test(normalizedTitle)) return Number.MAX_SAFE_INTEGER;
    return null;
  };

  const orderedModules = useMemo(() => modules
    .map((module, index) => ({ module, index }))
    .sort((left, right) => {
      const leftPriority = modulePriority(left.module?.title ?? left.module?.name);
      const rightPriority = modulePriority(right.module?.title ?? right.module?.name);
      if (leftPriority !== null || rightPriority !== null) {
        return (leftPriority ?? 1) - (rightPriority ?? 1);
      }
      const leftOrder = Number(left.module?.module_order ?? left.module?.order ?? left.module?.position ?? left.module?.sequence ?? left.module?.module_number ?? left.module?.module_index ?? left.module?.sort_order ?? left.module?.index ?? left.module?.number);
      const rightOrder = Number(right.module?.module_order ?? right.module?.order ?? right.module?.position ?? right.module?.sequence ?? right.module?.module_number ?? right.module?.module_index ?? right.module?.sort_order ?? right.module?.index ?? right.module?.number);
      return (Number.isFinite(leftOrder) ? leftOrder : Number.MAX_SAFE_INTEGER - left.index)
        - (Number.isFinite(rightOrder) ? rightOrder : Number.MAX_SAFE_INTEGER - right.index);
    })
    .map(({ module }) => ({
      ...module,
      lessons: (Array.isArray(module.lessons) ? module.lessons : [])
        .map((lesson: any, lessonIndex: number) => ({ lesson, lessonIndex }))
        .sort((left: { lesson: any; lessonIndex: number }, right: { lesson: any; lessonIndex: number }) => {
          const leftOrder = Number(left.lesson?.lesson_order ?? left.lesson?.order ?? left.lesson?.position ?? left.lesson?.sequence ?? left.lesson?.lesson_number ?? left.lesson?.lesson_index ?? left.lesson?.sort_order ?? left.lesson?.index ?? left.lesson?.number);
          const rightOrder = Number(right.lesson?.lesson_order ?? right.lesson?.order ?? right.lesson?.position ?? right.lesson?.sequence ?? right.lesson?.lesson_number ?? right.lesson?.lesson_index ?? right.lesson?.sort_order ?? right.lesson?.index ?? right.lesson?.number);
          return (Number.isFinite(leftOrder) ? leftOrder : left.lessonIndex) - (Number.isFinite(rightOrder) ? rightOrder : right.lessonIndex);
        })
        .map(({ lesson }: { lesson: any }) => lesson),
    })), [modules]);

  const lessonList = useMemo(() => orderedModules.flatMap((module) => module.lessons), [orderedModules]);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (lessonList.length > 0) {
      const savedLessonId = getLocalStudyState(course.slug).currentLessonId;
      const firstIncomplete = lessonList.find((lesson: any) => !lesson.completed);
      const savedLesson = lessonList.find((lesson: any) => lesson.id === savedLessonId);
      setCurrentLessonId(savedLesson?.id ?? firstIncomplete?.id ?? lessonList[0]?.id);
    }
  }, [course.slug, lessonList]);

  useEffect(() => {
    if (orderedModules.length === 0) return;
    setExpandedModules((current) => current.size > 0
      ? current
      : new Set([String(orderedModules[0].id ?? `${orderedModules[0].title}-0`)]));
  }, [orderedModules]);

  useEffect(() => {
    setSelectedResource(null);
    const localState = currentLessonId ? getLocalStudyState(course.slug) : {};
    const localPosition = currentLessonId ? Number(localState.positions?.[currentLessonId] ?? 0) : 0;
    setSavedPosition(Number.isFinite(localPosition) ? localPosition : 0);
    lastKnownPositionRef.current = Number.isFinite(localPosition) ? localPosition : 0;
    lastSyncedProgressRef.current = 0;
    setCompletionError(null);
    setXpRewardMessage(null);
    if (!currentLessonId) return;
    saveLocalStudyState(course.slug, { currentLessonId });

    let cancelled = false;
    void getLessonProgress(currentLessonId).then((lessonProgress) => {
      if (cancelled) return;
      const position = Number(lessonProgress?.position ?? lessonProgress?.last_position ?? lessonProgress?.current_time ?? 0);
      if (Number.isFinite(position) && position > 0) {
        const latestPosition = Math.max(localPosition, position);
        setSavedPosition(latestPosition);
        lastKnownPositionRef.current = latestPosition;
        saveLocalLessonPosition(course.slug, currentLessonId, latestPosition);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [course.slug, currentLessonId]);

  const currentLesson = useMemo(() => {
    if (!currentLessonId) return null;
    return lessonList.find((l: any) => l.id === currentLessonId);
  }, [currentLessonId, lessonList]);

  useEffect(() => {
    if (!currentLessonId) return;
    const syncLatestPosition = () => {
      const position = lastKnownPositionRef.current;
      if (position > 0) void syncLessonProgress(currentLessonId, position, position);
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") syncLatestPosition();
    };
    window.addEventListener("pagehide", syncLatestPosition);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      syncLatestPosition();
      window.removeEventListener("pagehide", syncLatestPosition);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentLessonId]);

  const currentLessonIndex = useMemo(() => lessonList.findIndex((l: any) => l.id === currentLessonId), [currentLessonId, lessonList]);
  const nextLessonIndex = useMemo(() => {
    const index = lessonList.findIndex((lesson: any) => !lesson.completed);
    return index === -1 ? lessonList.length : index;
  }, [lessonList]);

  const completed = lessonList.filter((lesson: any) => lesson.completed === true).length;
  const total = lessonList.length;
  const pct = total === 0
    ? 0
    : completed === total
      ? 100
      : currentLessonIndex >= 0
        ? Math.round((currentLessonIndex / total) * 100)
        : 0;

  useEffect(() => {
    if (currentLessonIndex >= 0) {
      saveLocalStudyState(course.slug, { progress: pct });
    }
  }, [course.slug, currentLessonIndex, pct]);

  // Get lesson type - this comes from the database field
  const lessonType = currentLesson?.type?.toLowerCase() || "video";

  const getVideoInfo = (url: string | undefined) => {
    if (!url) return null;
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[&#?]|$)/i);
    if (youtubeMatch) {
      return { type: "youtube" as const, videoId: youtubeMatch[1] };
    }
    if (/(?:youtube\.com|youtu\.be)/i.test(url)) return null;
    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|mkv)$/i;
    if (videoExtensions.test(url) || url.includes('cloudfront.net') || url.includes('storage.googleapis.com') || /^https?:\/\//i.test(url)) {
      return { type: 'direct' as const, url };
    }
    return null;
  };

  const lessonContent = currentLesson?.content ?? currentLesson?.description ?? "";
  const audioUrl = resolveCourseMedia(currentLesson?.audio_file ?? currentLesson?.audio_url, "audio");
  const videoUrl = currentLesson?.video_url ?? currentLesson?.video_url_resolved ?? currentLesson?.video?.url ?? currentLesson?.content_url ?? "";
  const videoInfo = useMemo(() => getVideoInfo(videoUrl), [videoUrl]);
  const dbDuration = currentLesson?.duration || currentLesson?.estimated_duration || currentLesson?.video_duration || 0;

  const inferResourceType = (url: string): 'pdf' | 'ppt' | 'audio' | 'video' | 'link' => {
    if (/\.(pdf)(?:[?#]|$)/i.test(url) || /\/pdf\//i.test(url)) return 'pdf';
    if (/\.(pptx?)(?:[?#]|$)/i.test(url) || /\/ppt\//i.test(url)) return 'ppt';
    if (/\.(mp3|wav|m4a|aac|flac|ogg)(?:[?#]|$)/i.test(url) || /\/audio\//i.test(url)) return 'audio';
    if (/(youtube|youtu\.be|vimeo)/i.test(url) || /\.(mp4|webm|mov)(?:[?#]|$)/i.test(url)) return 'video';
    return 'link';
  };

  const resolveResourceUrl = (url: string, type: 'pdf' | 'ppt' | 'audio' | 'video' | 'link') =>
    type === 'pdf' || type === 'ppt' || type === 'audio' ? resolveCourseMedia(url, type) : url;

  // Resources - includes all extra files and links
  const resources = useMemo(() => {
    const allResources: Array<{ label: string; url: string; type: 'pdf' | 'ppt' | 'audio' | 'video' | 'link' | 'doc' }> = [];

    // PDF files
    if (currentLesson?.pdf_file) {
      allResources.push({ label: 'PDF Document', url: resolveCourseMedia(currentLesson.pdf_file, "pdf"), type: 'pdf' });
    }

    // PPT files
    if (currentLesson?.ppt_file) {
      allResources.push({ label: 'PowerPoint Slides', url: resolveCourseMedia(currentLesson.ppt_file, "ppt"), type: 'ppt' });
    }

    if (audioUrl) {
      allResources.push({ label: 'Audio lesson', url: audioUrl, type: 'audio' });
    }

    // Additional video resources (not the main lesson video)
    if (currentLesson?.additional_video_url) {
      allResources.push({ label: 'Additional Video', url: currentLesson.additional_video_url, type: 'video' });
    }

    // Generic resources from course
    if (Array.isArray(course.raw?.resources)) {
      course.raw.resources.forEach((r: any) => {
        if (typeof r === 'string') {
          const type = inferResourceType(r);
          allResources.push({ label: r, url: resolveResourceUrl(r, type), type });
        } else if (r.url) {
          const type = inferResourceType(r.url);
          allResources.push({ label: r.title || r.name || 'Resource', url: resolveResourceUrl(r.url, type), type });
        }
      });
    }

    // Course materials
    if (Array.isArray(course.raw?.materials)) {
      course.raw.materials.forEach((r: any) => {
        if (typeof r === 'string') {
          const type = inferResourceType(r);
          allResources.push({ label: r, url: resolveResourceUrl(r, type), type });
        } else if (r.url) {
          const type = inferResourceType(r.url);
          allResources.push({ label: r.title || r.name || 'Material', url: resolveResourceUrl(r.url, type), type });
        }
      });
    }

    // Lesson resources
    if (Array.isArray(currentLesson?.resources)) {
      currentLesson.resources.forEach((r: any) => {
        if (typeof r === 'string') {
          const type = inferResourceType(r);
          allResources.push({ label: r, url: resolveResourceUrl(r, type), type });
        } else if (r.url) {
          const type = inferResourceType(r.url);
          allResources.push({ label: r.title || r.name || 'Resource', url: resolveResourceUrl(r.url, type), type });
        }
      });
    }

    // Remove duplicates by URL
    const seen = new Set();
    return allResources.filter(r => r.url).filter(r => {
      if (seen.has(r.url)) return false;
      seen.add(r.url);
      return true;
    });
  }, [currentLesson, course.raw]);

  const selectResource = (resource: { label: string; url: string; type: string }) => {
    if (resource.type === "pdf" || resource.type === "ppt") {
      setSelectedResource({ label: resource.label, url: resource.url, type: resource.type });
    }
  };

  const hasYouTubeMethods = (player: any): player is { getDuration: () => number; getCurrentTime: () => number } =>
    Boolean(player && typeof player.getDuration === "function" && typeof player.getCurrentTime === "function");

  // YouTube API integration
  useEffect(() => {
    if (videoInfo?.type !== 'youtube' || !youtubeContainerRef.current) return;

    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let playerInstance: any = null;

    const loadYouTubePlayer = () => {
      if (cancelled || !youtubeContainerRef.current) return;
      if (window.YT && window.YT.Player) {
        try {
          playerInstance = new window.YT.Player(youtubeContainerRef.current, {
            height: '100%',
            width: '100%',
            videoId: videoInfo.videoId,
            playerVars: {
              controls: 1,
              disablekb: 0,
              fs: 1,
              rel: 0,
              modestbranding: 1,
              autoplay: 0,
            },
            events: {
              onReady: (event: any) => {
                if (!hasYouTubeMethods(event.target)) {
                  setError('YouTube player could not be loaded for this lesson.');
                  return;
                }
                setIsYouTubeReady(true);
                setYoutubePlayer(event.target);
                if (dbDuration > 0) {
                  setDuration(dbDuration);
                } else {
                  setDuration(event.target.getDuration());
                }
                if (savedPosition > 0) {
                  event.target.seekTo(savedPosition, true);
                  setCurrentTime(savedPosition);
                  lastKnownPositionRef.current = savedPosition;
                }
                setIsYouTube(true);
              },
              onStateChange: (event: any) => {
                const state = event.data;
                setIsPlaying(state === window.YT.PlayerState.PLAYING);
                setIsLoading(state === window.YT.PlayerState.BUFFERING);
                if (state === window.YT.PlayerState.ENDED) {
                  setIsPlaying(false);
                  setProgress(100);
                }
              },
              onError: () => setError('YouTube player error. Please try another lesson.'),
            },
          });
        } catch {
          setError('This lesson has an invalid YouTube video link.');
          setIsLoading(false);
        }
      } else {
        retryTimer = setTimeout(loadYouTubePlayer, 100);
      }
    };

    loadYouTubePlayer();

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      if (playerInstance && typeof playerInstance.destroy === 'function') {
        playerInstance.destroy();
      }
      setIsYouTubeReady(false);
      setYoutubePlayer(null);
      setIsYouTube(false);
    };
  }, [videoInfo, dbDuration, savedPosition]);

  useEffect(() => {
    if (videoInfo?.type !== "direct" || !videoRef.current || savedPosition <= 0) return;
    videoRef.current.currentTime = savedPosition;
    setCurrentTime(savedPosition);
    if (videoRef.current.duration > 0) {
      setProgress((savedPosition / videoRef.current.duration) * 100);
    }
  }, [videoInfo, savedPosition]);

  // YouTube progress tracking
  useEffect(() => {
    if (!hasYouTubeMethods(youtubePlayer) || !isYouTubeReady) return;

    const interval = setInterval(() => {
      try {
        const current = youtubePlayer.getCurrentTime();
        const dur = youtubePlayer.getDuration();
        if (dur > 0) {
          setCurrentTime(current);
          lastKnownPositionRef.current = current;
          setProgress((current / dur) * 100);
          if (currentLesson) {
            saveLocalLessonPosition(course.slug, currentLesson.id, current);
            if (current - lastSyncedProgressRef.current >= 10) {
              lastSyncedProgressRef.current = current;
              void syncLessonProgress(currentLesson.id, current, current);
            }
          }
        }
      } catch (e) {
        // Handle errors silently
      }
    }, 250);

    return () => clearInterval(interval);
  }, [youtubePlayer, isYouTubeReady, currentLesson]);

  const togglePlay = () => {
    if (videoInfo?.type === 'youtube' && youtubePlayer && isYouTubeReady) {
      if (isPlaying) {
        youtubePlayer.pauseVideo();
      } else {
        youtubePlayer.playVideo();
      }
      return;
    }
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => {
        setError('Unable to play video. Please try again.');
        console.error('Play error:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || videoInfo?.type === 'youtube') return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(current);
    lastKnownPositionRef.current = current;
    setProgress(dur ? (current / dur) * 100 : 0);
    if (currentLesson) {
      saveLocalLessonPosition(course.slug, currentLesson.id, current);
      if (current - lastSyncedProgressRef.current >= 10) {
        lastSyncedProgressRef.current = current;
        void syncLessonProgress(currentLesson.id, current, current);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    if (dbDuration > 0) {
      setDuration(dbDuration);
    } else {
      setDuration(videoRef.current.duration);
    }
    if (savedPosition > 0) {
      videoRef.current.currentTime = savedPosition;
      setCurrentTime(savedPosition);
      setProgress((savedPosition / (videoRef.current.duration || dbDuration)) * 100);
    }
    setIsLoading(false);
  };

  const completeCurrentLesson = async () => {
    if (!currentLesson || currentLesson.completed) return true;
    if (isCompleting) return false;
    setIsCompleting(true);
    setCompletionError(null);
    try {
      const response = await markLessonComplete(currentLesson.id);
      if (!response) throw new Error("Unable to save lesson progress.");
      setModules((prevModules) => prevModules.map((mod) => ({
        ...mod,
        lessons: (mod.lessons ?? []).map((lesson: any) =>
          lesson.id === currentLesson.id ? { ...lesson, completed: true } : lesson
        ),
      })));
      const lessonXp = Math.max(0, Number(currentLesson.xp_reward ?? currentLesson.xp ?? 0));
      setXpRewardMessage(`Lesson complete. +${lessonXp} XP`);
      return true;
    } catch (completionFailure) {
      setCompletionError(completionFailure instanceof Error ? completionFailure.message : "Unable to save lesson progress.");
      setXpRewardMessage("XP was not awarded because the backend completion request failed. Please try again after the learning service is restored.");
      return false;
    } finally {
      setIsCompleting(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoInfo?.type === 'youtube' && youtubePlayer && isYouTubeReady) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const duration = youtubePlayer.getDuration();
      const newTime = x * duration;
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoInfo?.type === 'youtube' && youtubePlayer && isYouTubeReady) {
      youtubePlayer.setVolume(newVolume * 100);
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    } else if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoInfo?.type === 'youtube' && youtubePlayer && isYouTubeReady) {
      const newMuted = !isMuted;
      if (newMuted) {
        youtubePlayer.mute();
      } else {
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

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (videoInfo?.type === 'youtube' && youtubePlayer && isYouTubeReady) {
      youtubePlayer.setPlaybackRate(rate);
    } else if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSettings(false);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || seconds === Infinity) return "0:00";
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = lessonList[currentLessonIndex - 1];
      setCurrentLessonId(prevLesson.id);
      resetPlayer();
    }
  };

  const handleNextLesson = async () => {
    if (currentLessonIndex < lessonList.length - 1) {
      const completedCurrentLesson = await completeCurrentLesson();
      if (!completedCurrentLesson) {
        setCompletionError("Lesson progress could not be saved because the learning service is unavailable. You can continue, and progress will retry when the service recovers.");
      }
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

  const startQuiz = async (quizId: string) => {
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
    const payload = {
      answers: activeQuiz.questions.reduce((acc: Record<string, string>, question: any) => {
        if (quizAnswers[question.id]) acc[question.id] = quizAnswers[question.id];
        return acc;
      }, {})
    };
    const result = await submitQuizAnswers(activeQuiz.id, payload);
    setQuizResult(result);
    setLoadingQuiz(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Render the main showcase based on lesson type
  const renderShowcase = () => {
    // Audio type
    if (lessonType === "audio" && audioUrl) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#071a35] p-6 text-white">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-[#60A5FA]/15 text-[#60A5FA]">
            <Volume2 className="h-9 w-9" />
          </div>
          <div className="w-full max-w-xl">
            <div className="mb-3 text-center text-sm text-white/70">Audio lesson</div>
            <AudioPlayer src={audioUrl} />
          </div>
        </div>
      );
    }

    // Document type
    if (lessonType === "document") {
      const docResources = resources.filter(r => r.type === 'pdf' || r.type === 'ppt');
      if (docResources.length > 0) {
        const activeDocument = selectedResource?.type === "pdf" || selectedResource?.type === "ppt"
          ? selectedResource
          : docResources[0];
        return (
          <div className="absolute inset-0 flex flex-col bg-[#071a35] text-white">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">{activeDocument.label}</p>
                <p className="text-xs text-white/60">Lesson document</p>
              </div>
              <a href={activeDocument.url} target="_blank" rel="noreferrer" className="shrink-0 text-xs text-blue-300 hover:text-white">
                Open separately
              </a>
            </div>
            <div className="min-h-0 flex-1 bg-white">
              {activeDocument.type === "pdf" ? (
                <PdfViewer fileUrl={activeDocument.url} />
              ) : (
                <PptViewer fileUrl={activeDocument.url} />
              )}
            </div>
            {docResources.length > 1 && (
              <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
                {docResources.map((file) => (
                  <button
                    key={file.url}
                    type="button"
                    onClick={() => selectResource(file)}
                    className={`rounded-lg px-3 py-1.5 text-xs ${file.url === activeDocument.url ? "bg-blue-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
                  >
                    {file.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      }
      // Fallback for document type with no specific doc resources
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#071a35] p-6 text-center text-white">
          <FileSpreadsheet className="h-12 w-12 text-[#60A5FA]" />
          <div>
            <p className="font-medium">Document lesson</p>
            <p className="mt-1 text-sm text-white/60">Check the resources tab for materials.</p>
          </div>
        </div>
      );
    }

    // Quiz type - show in main player
    if (lessonType === "quiz") {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#071a35] text-white overflow-y-auto">
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-white/50">Quiz</span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">Ready</span>
            </div>
            {quizzes.length > 0 ? (
              <div className="space-y-3">
                {quizzes.map((quiz) => (
                  <button
                    key={quiz.id}
                    onClick={() => void startQuiz(quiz.id)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{quiz.title ?? quiz.name ?? "Course quiz"}</span>
                      <span className="text-xs text-white/50">Start →</span>
                    </div>
                    <p className="mt-1 text-sm text-white/60 line-clamp-2">{quiz.description ?? quiz.summary ?? "Test your understanding."}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-white/60">No quizzes available.</div>
            )}
            {activeQuiz && (
              <div className="mt-4 space-y-4">
                {activeQuiz.questions.map((question: any, qi: number) => (
                  <div key={question.id ?? qi} className="rounded-2xl border border-white/10 p-4">
                    <div className="text-sm font-semibold">{`Q${qi + 1}. ${question.prompt}`}</div>
                    <div className="mt-3 space-y-2">
                      {question.choices.map((choice: any) => (
                        <label key={choice.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 px-3 py-2 hover:bg-white/5 transition">
                          <input
                            type="radio"
                            name={question.id}
                            value={choice.value ?? choice.id}
                            checked={quizAnswers[question.id] === (choice.value ?? choice.id)}
                            onChange={() => setQuizAnswers((prev) => ({ ...prev, [question.id]: choice.value ?? choice.id }))}
                            className="h-4 w-4 accent-primary shrink-0"
                          />
                          <span className="text-sm">{choice.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                {quizResult && (
                  <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-4 text-sm text-blue-300">
                    <div className="font-semibold">Quiz submitted!</div>
                    <div className="mt-1">{quizResult?.message ?? "Your answers have been submitted."}</div>
                    {quizResult?.score !== undefined && (
                      <div className="mt-2 font-bold">Score: {quizResult.score}%</div>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={submitQuiz}
                    disabled={loadingQuiz}
                    className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                  >
                    Submit answers
                  </button>
                  <button
                    onClick={() => {
                      setActiveQuiz(null);
                      setQuizAnswers({});
                      setQuizResult(null);
                    }}
                    className="rounded-xl border border-white/10 px-5 py-2 text-sm font-medium hover:bg-white/5"
                  >
                    Back to quizzes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Assignment type
    if (lessonType === "assignment") {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#071a35] p-6 text-white text-center">
          <div className="text-5xl mb-2 text-white/20">
            <FileText className="h-16 w-16" />
          </div>
          <h3 className="text-xl font-semibold">📝 Assignment</h3>
          <p className="text-white/60 text-sm max-w-md">
            {currentLesson?.description || "Complete the assignment and submit your work."}
          </p>
          <div className="flex gap-3 mt-2">
            <button className="bg-primary text-white px-5 py-2 rounded-xl text-sm">
              <Download className="h-4 w-4 inline mr-1" /> Submit work
            </button>
            {resources.length > 0 && (
              <button className="border border-white/20 px-5 py-2 rounded-xl text-sm text-white/70">
                <FileText className="h-4 w-4 inline mr-1" /> Instructions
              </button>
            )}
          </div>
        </div>
      );
    }

    // Text/Article type
    if (lessonType === "text") {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071a35] p-8 text-white overflow-y-auto">
          <div className="max-w-3xl w-full">
            <div className="flex items-center gap-2 mb-4 text-white/40">
              <FileText className="h-5 w-5" />
              <span className="text-xs uppercase tracking-wider">Text / Article</span>
            </div>
            <div className="prose prose-invert prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: lessonContent || currentLesson?.description || "No content available for this lesson." }} />
            </div>
          </div>
        </div>
      );
    }

    // Video type (default) - with YouTube or direct video
    if (videoInfo) {
      return (
        <>
          {videoInfo.type === 'youtube' ? (
            <div ref={youtubeContainerRef} className="absolute inset-0 h-full w-full bg-[#071a35]" />
          ) : (
            <>
              <video
                ref={videoRef}
                src={videoInfo.url}
                className="absolute inset-0 h-full w-full object-contain bg-[#071a35]"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setIsPlaying(false);
                  setProgress(100);
                  if (currentLesson) saveLocalLessonPosition(course.slug, currentLesson.id, videoRef.current?.duration ?? currentTime);
                  if (currentLesson) void syncLessonProgress(currentLesson.id, videoRef.current?.duration ?? currentTime, videoRef.current?.duration ?? currentTime);
                }}
                onWaiting={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
                onError={() => setError('Error loading video. Please try again.')}
              />

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#071a35]/80">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-3 border-white/30 border-t-white" />
                    <span className="text-[10px] sm:text-xs text-white/60">Loading video...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071a35]/95 p-4 sm:p-6 text-center">
                  <div className="max-w-xs sm:max-w-sm">
                    <div className="mb-3 text-3xl sm:text-4xl">⚠️</div>
                    <p className="text-xs sm:text-sm text-white/90">{error}</p>
                    <button 
                      onClick={() => setError(null)}
                      className="mt-4 rounded-full bg-white/10 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-white/80 hover:bg-white/20 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071a35]/90 via-[#071a35]/40 to-transparent p-2 sm:p-3 pt-6 sm:pt-8">
                <div 
                  className="group relative h-1 cursor-pointer rounded-full bg-white/20 hover:h-1.5 transition-all duration-200"
                  onClick={handleSeek}
                  ref={progressHoverRef}
                  onMouseMove={(e) => {
                    if (!progressHoverRef.current) return;
                    const rect = progressHoverRef.current.getBoundingClientRect();
                    const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
                    const duration = videoRef.current?.duration || 0;
                    const time = x * duration;
                    const tooltip = document.getElementById('progress-tooltip');
                    if (tooltip) {
                      tooltip.textContent = formatTime(time);
                      tooltip.style.left = `${x * 100}%`;
                      tooltip.classList.remove('opacity-0');
                    }
                  }}
                  onMouseLeave={() => {
                    const tooltip = document.getElementById('progress-tooltip');
                    if (tooltip) tooltip.classList.add('opacity-0');
                  }}
                >
                  <div 
                    className="h-full rounded-full bg-[#60A5FA] transition-all duration-150"
                    style={{ width: `${progress}%` }} 
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[#60A5FA] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ left: `calc(${progress}% - 4px)` }}
                  />
                  <div 
                    id="progress-tooltip"
                    className="absolute -top-7 sm:-top-8 -translate-x-1/2 rounded bg-[#071a35]/90 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-medium opacity-0 transition-opacity pointer-events-none whitespace-nowrap"
                  >
                    0:00
                  </div>
                </div>
                
                <div className="mt-2 sm:mt-3 flex items-center justify-between text-white/90">
                  <div className="flex items-center gap-1 sm:gap-3">
                    <button 
                      onClick={togglePlay}
                      className="rounded-full p-1 sm:p-1.5 hover:bg-white/10 transition-colors"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      ) : (
                        <Play className="h-3.5 w-3.5 sm:h-5 sm:w-5 fill-current" />
                      )}
                    </button>
                    
                    <button 
                      onClick={toggleMute}
                      className="rounded-full p-1 sm:p-1.5 hover:bg-white/10 transition-colors"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </button>
                    
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="hidden sm:block w-12 sm:w-16 accent-primary"
                      style={{
                        height: '3px',
                        borderRadius: '2px',
                        cursor: 'pointer',
                      }}
                    />
                    
                    <span className="hidden xs:inline text-[10px] sm:text-xs font-mono text-white/70">
                      {formatTime(currentTime)} / {formatTime(dbDuration || duration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="hidden md:inline text-[8px] sm:text-[10px] text-white/50 font-mono">
                      {playbackRate}x
                    </span>
                    
                    <div className="relative" ref={settingsRef}>
                      <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="rounded-full p-1 sm:p-1.5 hover:bg-white/10 transition-colors"
                        aria-label="Settings"
                      >
                        <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      
                      {showSettings && (
                        <div className="absolute bottom-full right-0 mb-2 rounded-lg bg-[#1A2A25] border border-white/10 p-1.5 sm:p-2 min-w-[120px] sm:min-w-[140px] shadow-xl">
                          <div className="text-[8px] sm:text-[10px] font-medium uppercase tracking-wider text-white/40 px-2 pb-1.5">Speed</div>
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => changePlaybackRate(rate)}
                              className={`w-full rounded px-2 sm:px-3 py-1 sm:py-1.5 text-left text-[10px] sm:text-xs transition-colors ${
                                playbackRate === rate 
                                  ? 'bg-[#60A5FA]/20 text-white'
                                  : 'text-white/60 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <span className="flex items-center justify-between">
                                {rate}x
                                {playbackRate === rate && (
                                  <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#60A5FA]" />
                                )}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={toggleFullscreen}
                      className="rounded-full p-1 sm:p-1.5 hover:bg-white/10 transition-colors"
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                    >
                      {isFullscreen ? (
                        <Minimize className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Maximize className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      );
    }

    // Fallback
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#052e16] to-[#14532d]">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 flex items-center justify-center">
          <Play className="h-5 w-5 sm:h-7 sm:w-7 fill-white/30 text-white/30" />
        </div>
        <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/40">
          {currentLesson ? `No media available for "${lessonType}" type` : 'No lesson selected'}
        </div>
      </div>
    );
  };

  return (
    <div className="-mx-4 -my-6 sm:-mx-6 lg:-mx-8 lg:-my-8">
      <div className={`grid min-h-[calc(100vh-4rem)] grid-cols-1 ${navigationExpanded ? "lg:grid-cols-[340px_1fr]" : "lg:grid-cols-[56px_1fr]"}`}>
        <aside className="order-2 border-r border-border bg-card shadow-[1px_0_0_rgba(15,23,42,0.02)] lg:order-1 lg:sticky lg:top-0 lg:h-[calc(100vh-4rem)]">
          {navigationExpanded ? <>
          <div className="border-b border-border bg-card px-4 py-4 sm:px-5 sm:py-5">
            <Link to="/student/course/$slug" params={{ slug: course.slug }} className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground">
              <ChevronLeft className="h-3.5 w-3.5" /> Course overview
            </Link>
            <h2 className="mt-3 text-base font-semibold leading-snug tracking-tight line-clamp-2">{course.title}</h2>
            <div className="mt-4 rounded-xl border border-border/80 bg-background/60 p-3">
              <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                <span>Course progress</span>
                <span className="font-semibold text-foreground">{pct}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <button
              onClick={() => setShowOutline((s) => !s)}
              aria-expanded={showOutline}
              className="mt-4 hidden w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary lg:inline-flex"
            >
              Collapse navigation <ChevronLeft className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="p-2 sm:p-3 lg:h-[calc(100vh-18rem)] lg:overflow-y-auto">
            {orderedModules.map((m, mi) => (
                <details
                  key={m.id ?? `${m.title}-${mi}`}
                  open={expandedModules.has(String(m.id ?? `${m.title}-${mi}`))}
                  onToggle={(event) => {
                    const moduleId = String(m.id ?? `${m.title}-${mi}`);
                    const isOpen = event.currentTarget.open;
                    setExpandedModules((current) => {
                      const next = new Set(current);
                      if (isOpen) next.add(moduleId);
                      else next.delete(moduleId);
                      return next;
                    });
                  }}
                  className="group mb-1 rounded-xl"
                >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-xl border border-transparent px-2.5 py-3 transition-colors hover:border-border hover:bg-secondary [&::-webkit-details-marker]:hidden">
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Module {mi + 1}</div>
                    <div className="mt-1 truncate text-xs sm:text-sm font-semibold">{m.title}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[10px] font-medium text-muted-foreground">{m.lessons?.filter((lesson: any) => lesson.completed).length ?? 0}/{m.lessons?.length ?? 0}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                  </div>
                </summary>
                <ul className="mt-1 space-y-0.5 border-l border-border/80 pb-2 pl-2">
                  {(Array.isArray(m.lessons) ? m.lessons : []).map((l: any) => {
                    const lessonIndex = lessonList.findIndex((lesson: any) => lesson.id === l.id);
                    const isCurrent = l.id === currentLessonId;
                    const isLocked = !l.completed && lessonIndex > nextLessonIndex;
                    const lessonDuration = l.duration || l.estimated_duration || l.video_duration || 0;
                    const lessonTypeDisplay = l.type?.toLowerCase() || 'video';
                    return (
                      <li key={l.id}>
                        <button
                          disabled={isLocked}
                          onClick={() => {
                            if (isLocked) return;
                            setCurrentLessonId(l.id);
                            resetPlayer();
                          }}
                          className={`flex w-full items-center gap-2 sm:gap-3 rounded-lg px-2 sm:px-3 py-2 text-left text-xs sm:text-sm transition-colors ${
                            isCurrent ? "bg-primary/10 font-medium text-primary ring-1 ring-inset ring-primary/10" : isLocked ? "cursor-not-allowed opacity-45" : "hover:bg-secondary"
                          }`}
                        >
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            l.completed ? "bg-primary text-primary-foreground" : isCurrent ? "bg-primary/20 text-primary" : "border border-border text-muted-foreground"
                          }`}>
                            {l.completed ? <Check className="h-3 w-3" /> : isLocked ? <Lock className="h-3 w-3" /> : 
                              lessonTypeDisplay === 'text' ? <FileText className="h-3 w-3" /> :
                              lessonTypeDisplay === 'audio' ? <Volume2 className="h-3 w-3" /> :
                              lessonTypeDisplay === 'document' ? <FileSpreadsheet className="h-3 w-3" /> :
                              lessonTypeDisplay === 'quiz' ? <Check className="h-3 w-3" /> :
                              lessonTypeDisplay === 'assignment' ? <FileText className="h-3 w-3" /> :
                              <Play className="h-3 w-3 fill-current" />
                            }
                          </span>
                          <span className="min-w-0 flex-1 truncate">{l.title}</span>
                          <span className="rounded bg-secondary/80 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                            {lessonTypeDisplay}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-muted-foreground whitespace-nowrap">
                            {lessonDuration > 0 ? formatTime(lessonDuration) : ""}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </details>
            ))}
          </div>
          </> : (
            <button
              type="button"
              onClick={() => setShowOutline(true)}
              title="Expand course navigation"
              aria-label="Expand course navigation"
              className="flex h-12 w-full items-center justify-center border-b border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:h-16"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </aside>

        <div className="order-1 flex flex-col lg:order-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-card px-3 sm:px-6 py-3 sm:py-4">
            <button
              onClick={handlePreviousLesson}
              disabled={currentLessonIndex <= 0}
              className="inline-flex items-center gap-1 sm:gap-2 rounded-[14px] border border-border px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Previous</span>
              <span className="xs:hidden">Prev</span>
            </button>
            <div className="text-[10px] sm:text-xs text-muted-foreground text-center px-2">
              {total > 0 && currentLesson ? `Lesson ${currentLessonIndex + 1} of ${total}` : "Lesson overview"}
              {dbDuration > 0 && ` · ${formatTime(dbDuration)}`}
            </div>
            <button
              onClick={handleNextLesson}
              disabled={isCompleting || currentLessonIndex < 0 || currentLessonIndex >= lessonList.length - 1}
              className="inline-flex items-center gap-1 sm:gap-2 rounded-[14px] bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden xs:inline">Next lesson</span>
              <span className="xs:hidden">Next</span>
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>

          {/* Video Player Section */}
          <div className="bg-[#071a35] px-0 pt-0">
            <div
              ref={playerContainerRef}
              className={`relative w-full overflow-hidden bg-[#071a35] text-white ${
                lessonType === "document"
                  ? "aspect-[16/9] min-h-0"
                  : ["text", "quiz", "assignment", "audio"].includes(lessonType)
                    ? "min-h-[560px] sm:aspect-video"
                  : "aspect-video"
              }`}
            >
              {renderShowcase()}
            </div>
          </div>

          {/* Lesson Info Bar */}
          <div className="border-b border-border bg-card px-3 sm:px-6 py-2.5 sm:py-4">
            <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                  <span className="font-medium">
                    {currentLesson ? `Lesson ${currentLessonIndex + 1} of ${total}` : "Course Overview"}
                  </span>
                  <span className="text-border hidden xs:inline">•</span>
                  <span className="flex items-center gap-1">
                    <span className="hidden xs:inline">⏱</span> {dbDuration > 0 ? formatTime(dbDuration) : "N/A"}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    {lessonType}
                  </span>
                  {currentLesson?.completed && (
                    <>
                      <span className="text-border hidden sm:inline">•</span>
                      <span className="text-green-600 text-[10px] sm:text-xs flex items-center gap-1">
                        <Check className="h-3 w-3" /> Completed
                      </span>
                    </>
                  )}
                </div>
                <h1 className="mt-0.5 sm:mt-1 text-base sm:text-xl lg:text-2xl font-semibold leading-snug truncate">
                  {currentLesson?.title ?? "No active lesson"}
                </h1>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button 
                  title="Bookmark" 
                  className="grid h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition-colors"
                >
                  <Bookmark className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                </button>
              </div>
            </div>
            {completionError && (
              <div className="border-b border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 sm:px-6">
                {completionError}
              </div>
            )}
            {xpRewardMessage && (
              <div className="border-b border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 sm:px-6">
                {xpRewardMessage}
              </div>
            )}
          </div>

          <div className="flex-1 bg-background px-3 sm:px-4 lg:px-6 py-4 sm:py-5 lg:py-6">
            {lessonContent && lessonType !== 'video' && lessonType !== 'text' && (
              <article className="mb-4 sm:mb-5 card-surface p-4 sm:p-5 lg:p-6">
                <div className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">Lesson content</div>
                <div className="prose prose-sm mt-2 sm:mt-3 max-w-none text-xs sm:text-sm leading-6 sm:leading-7 text-foreground/80" dangerouslySetInnerHTML={{ __html: lessonContent }} />
              </article>
            )}

            {(lessonType === "assignment") && (
              <div className="mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
                <div>
                  <div className="text-sm font-semibold">Ready to submit your work?</div>
                  <div className="mt-1 text-xs text-muted-foreground">Review the instructions, then submit your completed work.</div>
                </div>
                <Link to="/student/assignments" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Submit assignment <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
            
            <div className="flex gap-1 overflow-x-auto rounded-[14px] border border-border bg-card p-1">
              {[
                { k: "resources", l: "Resources", i: FileText },
                { k: "discussion", l: "Discussion", i: MessageSquare },
              ].map(({ k, l, i: Icon }) => (
                <button
                  key={k}
                  onClick={() => setTab(k as typeof tab)}
                  className={`inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-[10px] px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium transition-colors ${
                    tab === k ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> 
                  <span>{l}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 sm:mt-5 space-y-4 sm:space-y-5">
              {tab === "resources" && (
                <div className="card-surface p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">Resources</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        {resources.length} resource{resources.length !== 1 ? 's' : ''} available
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>

                  <div className="mt-3 space-y-2">
                    {resources.length ? resources.map((r, index) => (
                      <a
                        key={`${r.url}-${index}`}
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="resource-item flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 hover:border-primary/40 transition-colors hover:bg-secondary/30"
                      >
                        <span className="w-5 text-center">
                          {r.type === 'pdf' && <FileText className="h-4 w-4 text-red-500" />}
                          {r.type === 'ppt' && <FileText className="h-4 w-4 text-orange-500" />}
                          {r.type === 'audio' && <Volume2 className="h-4 w-4 text-emerald-500" />}
                          {r.type === 'video' && <Play className="h-4 w-4 text-purple-400" />}
                          {r.type === 'link' && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                          {r.type === 'doc' && <FileText className="h-4 w-4 text-blue-400" />}
                          {!['pdf', 'ppt', 'video', 'link', 'doc'].includes(r.type) && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                        </span>
                        <span className="text-sm flex-1 truncate">{r.label}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          {r.type === 'pdf' ? 'PDF' : r.type === 'ppt' ? 'PPT' : r.type === 'audio' ? 'Audio' : r.type === 'video' ? 'Video' : 'Link'}
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </a>
                    )) : (
                      <div className="rounded-2xl border border-border bg-background p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground text-center">
                        No resources are available for this lesson right now.
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {tab === "discussion" && (
                <div className="card-surface p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">Discussion</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        Join the conversation
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-3 space-y-4 sm:space-y-5">
                    {Array.isArray(course.raw?.discussion) && course.raw.discussion.length ? course.raw.discussion.map((item: any, index: number) => {
                      const author = item.author ?? item.user ?? item.posted_by ?? "Learner";
                      const time = item.updated_at ? new Date(item.updated_at).toLocaleDateString() : item.time ?? "Recently";
                      const message = item.message ?? item.body ?? item.text ?? "No message provided.";
                      const initials = String(author).split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
                      return (
                        <div key={`${author}-${index}`} className="flex gap-2 sm:gap-3">
                          <div className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-semibold">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm flex flex-wrap items-center gap-1 sm:gap-2">
                              <span className="font-semibold">{author}</span>
                              <span className="text-[10px] sm:text-xs text-muted-foreground">{time}</span>
                            </div>
                            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground break-words">{message}</p>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-xs sm:text-sm text-muted-foreground text-center py-4">
                        No discussion posts are available for this lesson yet.
                      </div>
                    )}
                  </div>
                  <div className="mt-4 sm:mt-6 flex flex-col gap-2 border-t border-border pt-4 sm:pt-5 sm:flex-row">
                    <input 
                      placeholder="Add to the discussion…" 
                      className="flex-1 rounded-[14px] border border-border bg-background px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" 
                    />
                    <button className="rounded-[14px] bg-primary px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Type declarations for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
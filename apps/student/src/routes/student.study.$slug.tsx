import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Check, ChevronLeft, ChevronRight, Play, Pause, Volume2, Maximize, Settings, MessageSquare,
  FileText, Download, Bookmark, PenSquare, ChevronDown, Minimize, VolumeX, FileSpreadsheet, ExternalLink,
  Lock, ChevronUp,
} from "lucide-react";
import { useEffect, useState, useMemo, useRef } from "react";
import { getCourse, getCourseModules, getQuizzesForCourse, getQuiz, markLessonComplete, submitQuizAnswers } from "@/lib/api";
import { setSelectedCourseSlug } from "@/lib/student-onboarding";

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
  const [tab, setTab] = useState<"notes" | "resources" | "discussion" | "quiz">("notes");
  const [showOutline, setShowOutline] = useState(true);
  const [modules, setModules] = useState<any[]>(initialModules ?? []);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<any>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    notes: false,
    resources: false,
    discussion: false,
    quiz: false,
  });
  
  const notesDefault = typeof (course.raw?.notes ?? course.raw?.default_notes) === "string"
    ? String(course.raw?.notes ?? course.raw?.default_notes)
    : "";
  const resources = Array.isArray(course.raw?.resources)
    ? course.raw.resources
    : Array.isArray(course.raw?.materials)
      ? course.raw.materials
      : [];
  const discussionThreads = Array.isArray(course.raw?.discussion)
    ? course.raw.discussion
    : Array.isArray(course.raw?.forum_threads)
      ? course.raw.forum_threads
      : [];

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
  const [isSeeking, setIsSeeking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isYouTubeReady, setIsYouTubeReady] = useState(false);
  const [youtubePlayer, setYoutubePlayer] = useState<any>(null);
  const [isYouTube, setIsYouTube] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const youtubeContainerRef = useRef<HTMLDivElement>(null);
  const progressHoverRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure modules from loader are always an array
    setModules(Array.isArray(initialModules) ? initialModules : []);
    setSelectedCourseSlug(course.slug);
    void getQuizzesForCourse(course.slug).then(setQuizzes);

    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Cleanup
    return () => {
      if (youtubePlayer && typeof youtubePlayer.destroy === 'function') {
        youtubePlayer.destroy();
      }
    };
  }, [course.slug, initialModules]);

  const orderedModules = useMemo(() => [...modules].sort((left, right) => {
    const leftOrder = Number(left?.module_order ?? left?.order ?? Number.MAX_SAFE_INTEGER);
    const rightOrder = Number(right?.module_order ?? right?.order ?? Number.MAX_SAFE_INTEGER);
    return leftOrder - rightOrder;
  }), [modules]);
  const lessonList = useMemo(() => orderedModules.flatMap((module) => Array.isArray(module.lessons) ? module.lessons : []), [orderedModules]);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (lessonList.length > 0) {
      const firstIncomplete = lessonList.find((lesson: any) => !lesson.completed);
      setCurrentLessonId(firstIncomplete?.id ?? lessonList[0]?.id);
    }
  }, [lessonList]);

  const currentLesson = useMemo(() => {
    if (!currentLessonId) return null;
    return lessonList.find((l: any) => l.id === currentLessonId);
  }, [currentLessonId, lessonList]);

  const currentLessonIndex = useMemo(() => lessonList.findIndex((l: any) => l.id === currentLessonId), [currentLessonId, lessonList]);
  const nextLessonIndex = useMemo(() => {
    const index = lessonList.findIndex((lesson: any) => !lesson.completed);
    return index === -1 ? lessonList.length : index;
  }, [lessonList]);

  const completed = lessonList.filter((lesson: any) => lesson.completed === true).length;
  const total = lessonList.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  // Video URL detection
  const getVideoInfo = (url: string | undefined) => {
    if (!url) return null;

    const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[&#?]|$)/i);
    if (youtubeMatch) {
      return { type: "youtube" as const, videoId: youtubeMatch[1] };
    }

    // Do not pass malformed YouTube values to the YouTube API as direct media.
    if (/(?:youtube\.com|youtu\.be)/i.test(url)) return null;

    // Check if it's a direct video URL
    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|mkv)$/i;
    if (videoExtensions.test(url) || url.includes('cloudfront.net') || url.includes('storage.googleapis.com') || /^https?:\/\//i.test(url)) {
      return { type: 'direct' as const, url };
    }

    return null;
  };

  const lessonContent = currentLesson?.content ?? currentLesson?.description ?? "";
  const lessonType = String(currentLesson?.type ?? "video").toLowerCase();
  const audioUrl = currentLesson?.audio_file ?? currentLesson?.audio_url ?? "";
  const documentUrls = [
    currentLesson?.pdf_file ? { label: "PDF document", url: currentLesson.pdf_file } : null,
    currentLesson?.ppt_file ? { label: "PowerPoint slides", url: currentLesson.ppt_file } : null,
  ].filter(Boolean) as Array<{ label: string; url: string }>;
  const lessonResources = [
    ...(Array.isArray(currentLesson?.resources) ? currentLesson.resources : resources),
    ...documentUrls,
  ];
  const videoUrl = currentLesson?.video_url
    ?? currentLesson?.video_url_resolved
    ?? currentLesson?.video?.url
    ?? currentLesson?.content_url
    ?? "";
  
  // Get duration from database if available
  const dbDuration = currentLesson?.duration || currentLesson?.estimated_duration || currentLesson?.video_duration || 0;
  
  const videoInfo = useMemo(() => getVideoInfo(videoUrl), [videoUrl]);
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
  }, [videoInfo, dbDuration]);

  // YouTube progress tracking
  useEffect(() => {
    if (!hasYouTubeMethods(youtubePlayer) || !isYouTubeReady) return;

    const interval = setInterval(() => {
      try {
        const current = youtubePlayer.getCurrentTime();
        const dur = youtubePlayer.getDuration();
        if (dur > 0) {
          setCurrentTime(current);
          setProgress((current / dur) * 100);
        }
      } catch (e) {
        // Handle errors silently
      }
    }, 250);

    return () => clearInterval(interval);
  }, [youtubePlayer, isYouTubeReady]);

  // Video player functions
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
    setProgress(dur ? (current / dur) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    if (dbDuration > 0) {
      setDuration(dbDuration);
    } else {
      setDuration(videoRef.current.duration);
    }
    setIsLoading(false);
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
    }, {})};
    const result = await submitQuizAnswers(activeQuiz.id, payload);
    setQuizResult(result);
    setLoadingQuiz(false);
  };

  const handleMarkComplete = async () => {
    if (!currentLesson) return;
    const response = await markLessonComplete(currentLesson.id);
    if (response?.completed) {
      setModules((prevModules) =>
        prevModules.map((mod) => ({
          ...mod,
          lessons: (mod.lessons ?? []).map((l: any) =>
            l.id === currentLesson.id ? { ...l, completed: true } : l
          ),
        }))
      );
    }
  };

  // Click outside settings to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="-mx-4 -my-6 sm:-mx-6 lg:-mx-8 lg:-my-8">
      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[340px_1fr]">
        <aside className="order-2 border-r border-border bg-card lg:order-1">
          <div className="border-b border-border p-4 sm:p-5">
            <Link to="/student/course/$slug" params={{ slug: course.slug }} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-3.5 w-3.5" /> Course overview
            </Link>
            <h2 className="mt-2 sm:mt-3 text-sm sm:text-[15px] font-semibold leading-snug line-clamp-2">{course.title}</h2>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="font-semibold text-foreground whitespace-nowrap">{pct}%</span>
            </div>
            <button
              onClick={() => setShowOutline((s) => !s)}
              className="mt-4 inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-[12px] border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary lg:hidden"
            >
              {showOutline ? "Hide" : "Show"} lesson outline <ChevronDown className={`h-3 w-3 transition-transform ${showOutline ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className={`p-2 sm:p-3 lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto ${showOutline ? "block" : "hidden lg:block"}`}>
            {orderedModules.map((m, mi) => (
              <details key={m.id ?? `${m.title}-${mi}`} open={mi === 0} className="group mb-1 rounded-xl">
                <summary className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-2 sm:px-3 py-2.5 hover:bg-secondary">
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Module {mi + 1}: {m.title}</div>
                    <div className="mt-0.5 truncate text-xs sm:text-sm font-semibold">{m.title}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-1 space-y-0.5 pb-2">
                  {(Array.isArray(m.lessons) ? m.lessons : []).map((l: any) => {
                    const lessonIndex = lessonList.findIndex((lesson: any) => lesson.id === l.id);
                    const isCurrent = l.id === currentLessonId;
                    const isLocked = !l.completed && lessonIndex > nextLessonIndex;
                    const lessonDuration = l.duration || l.estimated_duration || l.video_duration || 0;
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
                            isCurrent ? "bg-primary/10 text-primary" : isLocked ? "cursor-not-allowed opacity-45" : "hover:bg-secondary"
                          }`}
                        >
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            l.completed ? "bg-primary text-primary-foreground" : isCurrent ? "bg-primary/20 text-primary" : "border border-border text-muted-foreground"
                          }`}>
                            {l.completed ? <Check className="h-3 w-3" /> : isLocked ? <Lock className="h-3 w-3" /> : <Play className="h-3 w-3 fill-current" />}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{l.title}</span>
                          <span className="text-[10px] sm:text-[11px] text-muted-foreground whitespace-nowrap">
                            {lessonDuration > 0 ? formatTime(lessonDuration) : l.duration || "0:00"}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </details>
            ))}
          </div>
        </aside>

        <div className="order-1 flex flex-col lg:order-2">
          {/* Video Player Section */}
          <div className="bg-[#0A1A15] px-0 pt-0">
            <div 
              ref={playerContainerRef} 
              className="relative aspect-video w-full overflow-hidden bg-[#0A1A15] text-white"
            >
              {lessonType === "audio" && audioUrl ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#0A1A15] p-6 text-white">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-[#2ECC71]/15 text-[#2ECC71]"><Volume2 className="h-9 w-9" /></div>
                  <div className="w-full max-w-xl"><div className="mb-3 text-center text-sm text-white/70">Audio lesson</div><audio className="w-full" controls src={audioUrl} /></div>
                </div>
              ) : lessonType === "document" && documentUrls.length > 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0A1A15] p-6 text-center text-white">
                  <FileSpreadsheet className="h-12 w-12 text-[#2ECC71]" />
                  <div><p className="font-medium">Open the lesson document</p><p className="mt-1 text-sm text-white/60">Choose a file to view or download.</p></div>
                  <div className="flex flex-wrap justify-center gap-2">{documentUrls.map((file) => <a key={file.url} href={file.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20"><ExternalLink className="h-4 w-4" />{file.label}</a>)}</div>
                </div>
              ) : videoInfo ? (
                <>
                  {videoInfo.type === 'youtube' ? (
                    <div ref={youtubeContainerRef} className="absolute inset-0 h-full w-full bg-[#0A1A15]" />
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        src={videoInfo.url}
                        className="absolute inset-0 h-full w-full object-contain bg-[#0A1A15]"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => {
                          setIsPlaying(false);
                          setProgress(100);
                        }}
                        onWaiting={() => setIsLoading(true)}
                        onCanPlay={() => setIsLoading(false)}
                        onError={() => setError('Error loading video. Please try again.')}
                      />

                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0A1A15]/80">
                          <div className="flex flex-col items-center gap-3">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-3 border-white/30 border-t-white" />
                            <span className="text-[10px] sm:text-xs text-white/60">Loading video...</span>
                          </div>
                        </div>
                      )}

                      {error && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A1A15]/95 p-4 sm:p-6 text-center">
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

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1A15]/90 via-[#0A1A15]/40 to-transparent p-2 sm:p-3 pt-6 sm:pt-8">
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
                            className="h-full rounded-full bg-[#2ECC71] transition-all duration-150" 
                            style={{ width: `${progress}%` }} 
                          />
                          <div 
                            className="absolute top-1/2 -translate-y-1/2 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[#2ECC71] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ left: `calc(${progress}% - 4px)` }}
                          />
                          <div 
                            id="progress-tooltip"
                            className="absolute -top-7 sm:-top-8 -translate-x-1/2 rounded bg-[#0A1A15]/90 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-medium opacity-0 transition-opacity pointer-events-none whitespace-nowrap"
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
                              className="hidden sm:block w-12 sm:w-16 accent-[#2ECC71]"
                              style={{
                                background: `linear-gradient(to right, #2ECC71 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`,
                                height: '3px',
                                borderRadius: '2px',
                                cursor: 'pointer',
                                WebkitAppearance: 'none'
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
                                          ? 'bg-[#2ECC71]/20 text-white' 
                                          : 'text-white/60 hover:text-white hover:bg-white/5'
                                      }`}
                                    >
                                      <span className="flex items-center justify-between">
                                        {rate}x
                                        {playbackRate === rate && (
                                          <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#2ECC71]" />
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
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0A1A15] to-[#1A2A25]">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <Play className="h-5 w-5 sm:h-7 sm:w-7 fill-white/30 text-white/30" />
                  </div>
                  <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/40">
                    {currentLesson ? (lessonType === "text" ? "Read the lesson content below" : "No media available") : 'No lesson selected'}
                  </div>
                </div>
              )}
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
                  {dbDuration > 0 && (
                    <>
                      <span className="text-border hidden xs:inline">•</span>
                      <span className="flex items-center gap-1">
                        <span className="hidden xs:inline">⏱</span> {formatTime(dbDuration)}
                      </span>
                    </>
                  )}
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
                <button 
                  title="Notes" 
                  className="grid h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition-colors"
                >
                  <PenSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                </button>
                <button 
                  onClick={handleMarkComplete} 
                  disabled={!currentLesson || currentLesson.completed} 
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="h-3 w-3 sm:h-4 sm:w-4" /> 
                  <span className="hidden xs:inline">{currentLesson?.completed ? 'Completed' : 'Mark complete'}</span>
                  <span className="xs:hidden">{currentLesson?.completed ? '✓' : 'Done'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-background px-3 sm:px-4 lg:px-6 py-4 sm:py-5 lg:py-6">
            {lessonContent && (
              <article className="mb-4 sm:mb-5 card-surface p-4 sm:p-5 lg:p-6">
                <div className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">Lesson content</div>
                <div className="prose prose-sm mt-2 sm:mt-3 max-w-none text-xs sm:text-sm leading-6 sm:leading-7 text-foreground/80" dangerouslySetInnerHTML={{ __html: lessonContent }} />
              </article>
            )}

            {(lessonType === "assignment" || lessonType === "quiz") && (
              <div className="mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
                <div><div className="text-sm font-semibold">{lessonType === "assignment" ? "Ready to submit your work?" : "Ready to test your knowledge?"}</div><div className="mt-1 text-xs text-muted-foreground">{lessonType === "assignment" ? "Review the instructions, then submit your completed work." : "Start the quiz when you are ready."}</div></div>
                {lessonType === "assignment" ? <Link to="/student/assignments" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Submit assignment<ChevronRight className="h-4 w-4" /></Link> : <button type="button" onClick={() => setTab("quiz")} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Start quiz<ChevronRight className="h-4 w-4" /></button>}
              </div>
            )}
            
            <div className="flex gap-1 overflow-x-auto rounded-[14px] border border-border bg-card p-1">
              {[
                { k: "notes", l: "Notes", i: PenSquare },
                { k: "resources", l: "Resources", i: FileText },
                { k: "discussion", l: "Discussion", i: MessageSquare },
                { k: "quiz", l: "Quiz", i: Check },
              ].map(({ k, l, i: Icon }) => (
                <button
                  key={k}
                  onClick={() => setTab(k as typeof tab)}
                  className={`inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-[10px] px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium transition-colors ${
                    tab === k ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> 
                  <span className="hidden xs:inline">{l}</span>
                  <span className="xs:hidden">{l.charAt(0)}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 sm:mt-5 space-y-4 sm:space-y-5">
              {tab === "notes" && (
                <div className="card-surface p-4 sm:p-5 lg:p-6">
                  <button
                    onClick={() => toggleSection('notes')}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div>
                      <div className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">Your notes</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        {collapsedSections.notes ? 'Click to expand' : 'Add your personal notes here'}
                      </div>
                    </div>
                    {collapsedSections.notes ? (
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    )}
                  </button>
                  {!collapsedSections.notes && (
                    <textarea
                      className="mt-3 min-h-[180px] sm:min-h-[220px] w-full resize-y rounded-2xl border border-border bg-background p-3 sm:p-4 text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
                      placeholder={notesDefault ? "Add notes for this lesson…" : "Write notes for this lesson…"}
                      defaultValue={typeof notesDefault === "string" ? notesDefault : ""}
                    />
                  )}
                </div>
              )}
              
              {tab === "resources" && (
                <div className="card-surface p-4 sm:p-5 lg:p-6">
                  <button
                    onClick={() => toggleSection('resources')}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div>
                      <div className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">Resources</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        {collapsedSections.resources ? 'Click to expand' : `${lessonResources.length} resource${lessonResources.length !== 1 ? 's' : ''} available`}
                      </div>
                    </div>
                    {collapsedSections.resources ? (
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    )}
                  </button>
                  {!collapsedSections.resources && (
                    <div className="mt-3 grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
                      {lessonResources.length ? lessonResources.map((r: any, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3 sm:p-4 hover:bg-secondary/30 transition-colors">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </div>
                            <div className="text-xs sm:text-sm font-medium leading-snug truncate">
                              {typeof r === "string" ? r : r.title ?? r.name ?? JSON.stringify(r)}
                            </div>
                          </div>
                          <button className="grid h-7 w-7 sm:h-9 sm:w-9 place-items-center rounded-full border border-border hover:bg-secondary transition-colors shrink-0">
                            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      )) : (
                        <div className="col-span-full rounded-2xl border border-border bg-background p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground text-center">
                          No resources are available for this course right now.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {tab === "discussion" && (
                <div className="card-surface p-4 sm:p-5 lg:p-6">
                  <button
                    onClick={() => toggleSection('discussion')}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div>
                      <div className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">Discussion</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        {collapsedSections.discussion ? 'Click to expand' : `${discussionThreads.length} post${discussionThreads.length !== 1 ? 's' : ''}`}
                      </div>
                    </div>
                    {collapsedSections.discussion ? (
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    )}
                  </button>
                  {!collapsedSections.discussion && (
                    <>
                      <div className="mt-3 space-y-4 sm:space-y-5">
                        {discussionThreads.length ? discussionThreads.map((item: any, index: number) => {
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
                    </>
                  )}
                </div>
              )}
              
              {tab === "quiz" && (
                <div className="card-surface p-4 sm:p-5 lg:p-6">
                  <button
                    onClick={() => toggleSection('quiz')}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div>
                      <div className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-primary">Quiz</div>
                      <h4 className="mt-0.5 sm:mt-1 text-sm sm:text-[17px] font-semibold">
                        {activeQuiz ? activeQuiz.title : "Practice quiz"}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      {loadingQuiz && <span className="rounded-full bg-secondary px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-foreground/80">Loading…</span>}
                      {collapsedSections.quiz ? (
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {!collapsedSections.quiz && (
                    <>
                      {!activeQuiz && (
                        <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                          {quizzes.length ? quizzes.map((quiz) => (
                            <button
                              key={quiz.id}
                              onClick={() => void startQuiz(quiz.id)}
                              className="w-full rounded-2xl border border-border bg-background px-3 sm:px-4 py-3 sm:py-4 text-left transition hover:border-primary/40 hover:bg-secondary/40"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-medium">{quiz.title ?? quiz.name ?? "Course quiz"}</span>
                                <span className="text-[10px] sm:text-xs text-muted-foreground">Start →</span>
                              </div>
                              <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm text-muted-foreground line-clamp-2">{quiz.description ?? quiz.summary ?? "Test your understanding before moving on."}</p>
                            </button>
                          )) : (
                            <div className="rounded-2xl border border-border bg-background p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground text-center">
                              No quizzes are available for this course yet.
                            </div>
                          )}
                        </div>
                      )}

                      {activeQuiz && (
                        <div className="mt-4 sm:mt-5 space-y-4 sm:space-y-5">
                          {activeQuiz.questions.length ? activeQuiz.questions.map((question: any, qi: number) => (
                            <div key={question.id ?? qi} className="rounded-2xl border border-border p-3 sm:p-4">
                              <div className="text-xs sm:text-sm font-semibold">{`Q${qi + 1}. ${question.prompt}`}</div>
                              <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                                {question.choices.length ? question.choices.map((choice: any) => (
                                  <label key={choice.id} className="flex cursor-pointer items-center gap-2 sm:gap-3 rounded-2xl border border-border px-2 sm:px-3 py-2 sm:py-3 hover:border-primary/40 hover:bg-secondary/40 transition-colors">
                                    <input
                                      type="radio"
                                      name={question.id}
                                      value={choice.value ?? choice.id}
                                      checked={quizAnswers[question.id] === (choice.value ?? choice.id)}
                                      onChange={() => setQuizAnswers((prev) => ({ ...prev, [question.id]: choice.value ?? choice.id }))}
                                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 accent-primary shrink-0"
                                    />
                                    <span className="text-xs sm:text-sm">{choice.label}</span>
                                  </label>
                                )) : (
                                  <div className="text-xs sm:text-sm text-muted-foreground">No answer choices available for this question.</div>
                                )}
                              </div>
                            </div>
                          )) : (
                            <div className="rounded-2xl border border-border bg-background p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground text-center">
                              This quiz does not contain any questions yet.
                            </div>
                          )}

                          {quizResult && (
                            <div className="rounded-2xl border border-success/20 bg-success/5 p-3 sm:p-4 text-xs sm:text-sm text-success">
                              <div className="font-semibold">Quiz submitted!</div>
                              <div className="mt-1">{quizResult?.message ?? "Your answers have been submitted."}</div>
                              {quizResult?.score !== undefined && (
                                <div className="mt-2 font-bold">Score: {quizResult.score}%</div>
                              )}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            <button
                              onClick={submitQuiz}
                              disabled={loadingQuiz}
                              className="inline-flex items-center justify-center rounded-[14px] bg-primary px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              Submit answers
                            </button>
                            <button
                              onClick={() => {
                                setActiveQuiz(null);
                                setQuizAnswers({});
                                setQuizResult(null);
                              }}
                              className="inline-flex items-center justify-center rounded-[14px] border border-border bg-card px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-secondary"
                            >
                              Back to quizzes
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-card px-3 sm:px-6 py-3 sm:py-4">
            <button 
              onClick={handlePreviousLesson}
              disabled={currentLessonIndex === 0}
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
              disabled={currentLessonIndex === lessonList.length - 1}
              className="inline-flex items-center gap-1 sm:gap-2 rounded-[14px] bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden xs:inline">Next lesson</span>
              <span className="xs:hidden">Next</span>
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
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
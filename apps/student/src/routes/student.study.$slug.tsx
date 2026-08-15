import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Check, ChevronLeft, ChevronRight, Play, Pause, Volume2, Maximize, Settings, MessageSquare,
  FileText, Download, Bookmark, PenSquare, ChevronDown, Minimize, VolumeX,
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
  const notesDefault = course.raw?.notes ?? course.raw?.default_notes ?? "";
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

  const lessonList = useMemo(() => modules.flatMap((module) => Array.isArray(module.lessons) ? module.lessons : []), [modules]);
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

  const completed = lessonList.filter((lesson: any) => lesson.completed === true).length;
  const total = lessonList.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  // Video URL detection
  const getVideoInfo = (url: string | undefined) => {
    if (!url) return null;
    
    // YouTube URL patterns
    const youtubePatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^&\s]+)/,
      /youtube\.com\/shorts\/([^&\s]+)/,
    ];

    for (const pattern of youtubePatterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          type: 'youtube' as const,
          videoId: match[1],
        };
      }
    }

    // Check if it's a direct video URL
    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|mkv)$/i;
    if (videoExtensions.test(url) || url.includes('cloudfront.net') || url.includes('storage.googleapis.com')) {
      return { type: 'direct' as const, url };
    }

    return null;
  };

  const videoInfo = currentLesson?.video_url ? getVideoInfo(currentLesson.video_url) : null;

  // YouTube API integration
  useEffect(() => {
    if (videoInfo?.type !== 'youtube' || !youtubeContainerRef.current) return;

    const loadYouTubePlayer = () => {
      if (window.YT && window.YT.Player) {
        const player = new window.YT.Player(youtubeContainerRef.current, {
          height: '100%',
          width: '100%',
          videoId: videoInfo.videoId,
          playerVars: {
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
          },
          events: {
            onReady: (event: any) => {
              setIsYouTubeReady(true);
              setYoutubePlayer(event.target);
              setDuration(event.target.getDuration());
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
            onError: (error: any) => {
              setError('YouTube player error. Please try again.');
              console.error('YouTube error:', error);
            },
          },
        });
      } else {
        setTimeout(loadYouTubePlayer, 100);
      }
    };

    loadYouTubePlayer();

    return () => {
      if (youtubePlayer && typeof youtubePlayer.destroy === 'function') {
        youtubePlayer.destroy();
      }
      setIsYouTubeReady(false);
      setYoutubePlayer(null);
    };
  }, [videoInfo]);

  // YouTube progress tracking
  useEffect(() => {
    if (!youtubePlayer || !isYouTubeReady) return;

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
    setDuration(videoRef.current.duration);
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

  return (
    <div className="-mx-4 -my-6 sm:-mx-6 lg:-mx-8 lg:-my-8">
      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[340px_1fr]">
        <aside className="order-2 border-r border-border bg-card lg:order-1">
          <div className="border-b border-border p-5">
            <Link to="/student/course/$slug" params={{ slug: course.slug }} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-3.5 w-3.5" /> Course overview
            </Link>
            <h2 className="mt-3 text-[15px] font-semibold leading-snug">{course.title}</h2>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="font-semibold text-foreground">{pct}%</span>
            </div>
            <button
              onClick={() => setShowOutline((s) => !s)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-[12px] border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary lg:hidden"
            >
              {showOutline ? "Hide" : "Show"} lesson outline <ChevronDown className={`h-3 w-3 transition-transform ${showOutline ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className={`p-3 lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto ${showOutline ? "block" : "hidden lg:block"}`}>
            {modules.map((m, mi) => (
              <details key={m.id ?? `${m.title}-${mi}`} open={mi === 0} className="group mb-1 rounded-xl">
                <summary className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5 hover:bg-secondary">
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Module {mi + 1}</div>
                    <div className="mt-0.5 truncate text-sm font-semibold">{m.title}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-1 space-y-0.5 pb-2">
                  {(Array.isArray(m.lessons) ? m.lessons : []).map((l: any) => {
                    const isCurrent = l.id === currentLessonId;
                    return (
                      <li key={l.id}>
                        <button onClick={() => {
                          setCurrentLessonId(l.id);
                          resetPlayer();
                        }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          isCurrent ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                        }`}
                        >
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs ${
                            l.completed ? "bg-primary text-primary-foreground" : isCurrent ? "bg-primary/20 text-primary" : "border border-border text-muted-foreground"
                          }`}>
                            {l.completed ? <Check className="h-3 w-3" /> : currentLessonIndex + 1}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{l.title}</span>
                          <span className="text-[11px] text-muted-foreground">{l.duration}</span>
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
          <div className="bg-[var(--primary-dark)] px-4 pt-4 sm:px-6 sm:pt-6">
            <div ref={playerContainerRef} className="relative aspect-video overflow-hidden rounded-2xl bg-black text-white">
              {videoInfo ? (
                <>
                  {videoInfo.type === 'youtube' ? (
                    <div ref={youtubeContainerRef} className="absolute inset-0 h-full w-full" />
                  ) : (
                    <video
                      ref={videoRef}
                      src={videoInfo.url}
                      className="absolute inset-0 h-full w-full object-contain"
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
                  )}

                  {/* Loading overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                    </div>
                  )}

                  {/* Error overlay */}
                  {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
                      <p className="text-white/90">{error}</p>
                      <button 
                        onClick={() => setError(null)}
                        className="mt-4 rounded-full bg-white/20 px-4 py-2 text-sm hover:bg-white/30"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {/* Controls */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div 
                      className="group relative h-1 cursor-pointer overflow-hidden rounded-full bg-white/30 hover:h-1.5 transition-all"
                      onClick={handleSeek}
                      ref={progressHoverRef}
                      onMouseMove={(e) => {
                        if (!progressHoverRef.current) return;
                        const rect = progressHoverRef.current.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width;
                        const duration = videoInfo.type === 'youtube' 
                          ? (youtubePlayer?.getDuration() || 0)
                          : (videoRef.current?.duration || 0);
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
                        className="h-full rounded-full bg-white transition-all" 
                        style={{ width: `${progress}%` }} 
                      />
                      <div 
                        id="progress-tooltip"
                        className="absolute -top-8 -translate-x-1/2 rounded bg-black/80 px-2 py-1 text-xs opacity-0 transition-opacity pointer-events-none"
                      >
                        0:00
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between text-xs text-white/90">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <button 
                          onClick={togglePlay}
                          className="rounded-full p-1 hover:bg-white/20 transition-colors"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                        </button>
                        
                        <button 
                          onClick={toggleMute}
                          className="rounded-full p-1 hover:bg-white/20 transition-colors"
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                        
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="hidden w-16 sm:block accent-white"
                          style={{
                            background: `linear-gradient(to right, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%)`
                          }}
                        />
                        
                        <span className="hidden sm:inline">{formatTime(currentTime)} / {formatTime(duration)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="relative" ref={settingsRef}>
                          <button 
                            onClick={() => setShowSettings(!showSettings)}
                            className="rounded-full p-1 hover:bg-white/20 transition-colors"
                            aria-label="Settings"
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                          
                          {showSettings && (
                            <div className="absolute bottom-full right-0 mb-2 rounded-lg bg-black/90 p-2 min-w-[140px]">
                              <div className="text-xs font-medium text-white/60 px-2 pb-1">Speed</div>
                              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                <button
                                  key={rate}
                                  onClick={() => changePlaybackRate(rate)}
                                  className={`w-full rounded px-2 py-1 text-left text-xs hover:bg-white/20 transition-colors ${
                                    playbackRate === rate ? 'text-white' : 'text-white/70'
                                  }`}
                                >
                                  {rate}x {playbackRate === rate && '✓'}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <button 
                          onClick={toggleFullscreen}
                          className="rounded-full p-1 hover:bg-white/20 transition-colors"
                          aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                        >
                          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1F6E5C] to-[#0D2922]">
                  <Play className="h-12 w-12 fill-white/40 text-white/40" />
                  <div className="mt-3 text-sm text-white/60">
                    {currentLesson ? 'No video available' : 'No lesson selected'}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-b border-border bg-card px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-medium text-muted-foreground">{currentLesson ? `Lesson ${currentLessonIndex + 1} of ${total}` : "Course Overview"}</div>
                <h1 className="mt-1 text-[22px] font-semibold leading-snug">{currentLesson?.title ?? "No active lesson"}</h1>
              </div>
              <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                <button 
                  title="Bookmark" 
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition-colors"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
                <button 
                  title="Notes" 
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary transition-colors"
                >
                  <PenSquare className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleMarkComplete} 
                  disabled={!currentLesson || currentLesson.completed} 
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-[14px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="h-4 w-4" /> {currentLesson?.completed ? 'Completed' : 'Mark as complete'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-background px-4 py-5 sm:px-6 sm:py-6">
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
                  className={`inline-flex shrink-0 items-center gap-2 rounded-[10px] px-4 py-2 text-sm font-medium transition-colors ${
                    tab === k ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {l}
                </button>
              ))}
            </div>

            <div className="mt-5">
              {tab === "notes" && (
                <div className="card-surface p-5 sm:p-6">
                  <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Your notes</div>
                  <textarea
                    className="mt-3 min-h-[220px] w-full resize-y rounded-2xl border border-border bg-background p-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
                    placeholder={notesDefault ? "Add notes for this lesson…" : "Write notes for this lesson…"}
                    defaultValue={notesDefault}
                  />
                </div>
              )}
              {tab === "resources" && (
                <div className="grid gap-3 md:grid-cols-2">
                  {resources.length ? resources.map((r, index) => (
                    <div key={index} className="card-surface flex items-center justify-between gap-3 p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><FileText className="h-4 w-4" /></div>
                        <div className="text-sm font-medium leading-snug">{typeof r === "string" ? r : r.title ?? r.name ?? JSON.stringify(r)}</div>
                      </div>
                      <button className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary"><Download className="h-4 w-4" /></button>
                    </div>
                  )) : (
                    <div className="rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground">No resources are available for this course right now.</div>
                  )}
                </div>
              )}
              {tab === "discussion" && (
                <div className="card-surface p-5 sm:p-6">
                  <div className="space-y-5">
                    {discussionThreads.length ? discussionThreads.map((item: any, index: number) => {
                      const author = item.author ?? item.user ?? item.posted_by ?? "Learner";
                      const time = item.updated_at ? new Date(item.updated_at).toLocaleDateString() : item.time ?? "Recently";
                      const message = item.message ?? item.body ?? item.text ?? "No message provided.";
                      const initials = String(author).split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
                      return (
                        <div key={`${author}-${index}`} className="flex gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            {initials}
                          </div>
                          <div>
                            <div className="text-sm"><span className="font-semibold">{author}</span><span className="ml-2 text-xs text-muted-foreground">{time}</span></div>
                            <p className="mt-1 text-sm text-muted-foreground">{message}</p>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-sm text-muted-foreground">No discussion posts are available for this lesson yet.</div>
                    )}
                  </div>
                  <div className="mt-6 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row">
                    <input placeholder="Add to the discussion…" className="flex-1 rounded-[14px] border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" />
                    <button className="rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Post</button>
                  </div>
                </div>
              )}
              {tab === "quiz" && (
                <div className="card-surface p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-widest text-primary">Quiz</div>
                      <h4 className="mt-2 text-[17px] font-semibold">{activeQuiz ? activeQuiz.title : "Practice quiz"}</h4>
                    </div>
                    {loadingQuiz && <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground/80">Loading…</span>}
                  </div>

                  {!activeQuiz && (
                    <div className="mt-5 space-y-4">
                      {quizzes.length ? quizzes.map((quiz) => (
                        <button
                          key={quiz.id}
                          onClick={() => void startQuiz(quiz.id)}
                          className="w-full rounded-2xl border border-border bg-background px-4 py-4 text-left text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-secondary/40"
                        >
                          <div className="flex items-center justify-between">
                            <span>{quiz.title ?? quiz.name ?? "Course quiz"}</span>
                            <span className="text-xs text-muted-foreground">Start →</span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{quiz.description ?? quiz.summary ?? "Test your understanding before moving on."}</p>
                        </button>
                      )) : (
                        <div className="rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground">No quizzes are available for this course yet.</div>
                      )}
                    </div>
                  )}

                  {activeQuiz && (
                    <div className="mt-5 space-y-5">
                      {activeQuiz.questions.length ? activeQuiz.questions.map((question: any, qi: number) => (
                        <div key={question.id ?? qi} className="rounded-2xl border border-border p-4">
                          <div className="text-sm font-semibold">{`Q${qi + 1}. ${question.prompt}`}</div>
                          <div className="mt-3 space-y-2">
                            {question.choices.length ? question.choices.map((choice: any) => (
                              <label key={choice.id} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border px-3 py-3 hover:border-primary/40 hover:bg-secondary/40 transition-colors">
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={choice.value ?? choice.id}
                                  checked={quizAnswers[question.id] === (choice.value ?? choice.id)}
                                  onChange={() => setQuizAnswers((prev) => ({ ...prev, [question.id]: choice.value ?? choice.id }))}
                                  className="h-4 w-4 accent-primary"
                                />
                                <span className="text-sm">{choice.label}</span>
                              </label>
                            )) : (
                              <div className="text-sm text-muted-foreground">No answer choices available for this question.</div>
                            )}
                          </div>
                        </div>
                      )) : (
                        <div className="rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground">This quiz does not contain any questions yet.</div>
                      )}

                      {quizResult && (
                        <div className="rounded-2xl border border-success/20 bg-success/5 p-4 text-sm text-success">
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
                          className="inline-flex items-center justify-center rounded-[14px] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          Submit answers
                        </button>
                        <button
                          onClick={() => {
                            setActiveQuiz(null);
                            setQuizAnswers({});
                            setQuizResult(null);
                          }}
                          className="inline-flex items-center justify-center rounded-[14px] border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-secondary"
                        >
                          Back to quizzes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-card px-4 py-4 sm:px-6">
            <button 
              onClick={handlePreviousLesson}
              disabled={currentLessonIndex === 0}
              className="inline-flex items-center gap-2 rounded-[14px] border border-border px-4 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <div className="text-xs text-muted-foreground">{total > 0 && currentLesson ? `Lesson ${currentLessonIndex + 1} of ${total}` : "Lesson overview"} · Est. {currentLesson?.duration ?? "0 min"}</div>
            <button 
              onClick={handleNextLesson}
              disabled={currentLessonIndex === lessonList.length - 1}
              className="inline-flex items-center gap-2 rounded-[14px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next lesson <ChevronRight className="h-4 w-4" />
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
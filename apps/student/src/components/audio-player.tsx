import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AudioPlayer({ src, onError }: { src: string; onError?: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const syncTime = () => setCurrentTime(audio.currentTime);
    const syncDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const stop = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    audio.addEventListener("ended", stop);
    return () => {
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
      audio.removeEventListener("ended", stop);
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      if (audio.ended) audio.currentTime = 0;
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  };

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(event.target.value);
    if (audioRef.current) audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (value: number) => {
    if (!Number.isFinite(value)) return "0:00";
    return `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_12px_30px_-18px_rgba(37,99,235,0.45)]">
      <audio ref={audioRef} src={src} preload="metadata" onError={onError} />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-95"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
        </button>
        <span className="w-10 shrink-0 text-xs tabular-nums text-blue-900/65">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.01"
          value={currentTime}
          onChange={seek}
          aria-label="Audio progress"
          className="h-1.5 min-w-0 flex-1 cursor-pointer accent-primary"
        />
        <span className="w-10 shrink-0 text-right text-xs tabular-nums text-blue-900/65">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

const SUPABASE_MEDIA_URL = "https://xcxuhqghaddopvzhapgw.supabase.co/storage/v1/object/public/media";
const SUPABASE_THUMBNAIL_PREFIX = `${SUPABASE_MEDIA_URL}/courses/thumbnails/`;
const API_BASE = (import.meta.env?.VITE_API_BASE_URL as string | undefined) ?? "https://techbridge-backend-rust.vercel.app/api/v1";

export function resolveCourseThumbnail(value?: string | null) {
  const thumbnail = typeof value === "string" ? value.trim() : "";
  if (!thumbnail) return null;
  if (/^https?:\/\/[^/]+\/storage\/v1\/s3\/media\//i.test(thumbnail)) {
    return thumbnail.replace(/\/storage\/v1\/s3\/media\//i, "/storage/v1/object/public/media/");
  }
  if (/^(?:https?:|blob:|data:)/i.test(thumbnail)) return thumbnail;
  if (/^\/?(?:media|api\/)/i.test(thumbnail)) {
    const origin = API_BASE.startsWith("/")
      ? (typeof window === "undefined" ? "" : window.location.origin)
      : new URL(API_BASE).origin;
    return `${origin}/${thumbnail.replace(/^\/+/, "")}`;
  }
  if (thumbnail.startsWith(SUPABASE_THUMBNAIL_PREFIX)) return thumbnail;

  const filename = thumbnail
    .split(/[?#]/, 1)[0]
    .replace(/\\/g, "/")
    .split("/")
    .pop();
  if (!filename) return null;

  return `${SUPABASE_THUMBNAIL_PREFIX}${encodeURIComponent(filename)}`;
}

// Abstract, elegant SVG course thumbnails — no external assets.
export function CourseThumb({ variant, color = "#15803D", thumbnail, title, className }: { variant: string; color?: string; thumbnail?: string | null; title?: string; className?: string }) {
  const bg = typeof color === "string" && color.trim() ? color.trim() : "#15803D";
  const safeThumbnail = resolveCourseThumbnail(thumbnail);

  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? "aspect-[16/10]"}`}
      style={{ backgroundColor: bg }}
    >
      {safeThumbnail ? <img src={safeThumbnail} alt={title ?? "Course thumbnail"} className="absolute inset-0 h-full w-full object-cover" /> : null}
      {!safeThumbnail && <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full opacity-90">
        {variant === "network" && (
          <g stroke="white" strokeOpacity="0.35" fill="none">
            <circle cx="80" cy="80" r="6" fill="white" fillOpacity="0.9" />
            <circle cx="200" cy="50" r="6" fill="white" fillOpacity="0.9" />
            <circle cx="320" cy="90" r="6" fill="white" fillOpacity="0.9" />
            <circle cx="120" cy="180" r="6" fill="white" fillOpacity="0.9" />
            <circle cx="280" cy="200" r="6" fill="white" fillOpacity="0.9" />
            <circle cx="200" cy="130" r="8" fill="white" />
            <line x1="80" y1="80" x2="200" y2="130" />
            <line x1="200" y1="50" x2="200" y2="130" />
            <line x1="320" y1="90" x2="200" y2="130" />
            <line x1="120" y1="180" x2="200" y2="130" />
            <line x1="280" y1="200" x2="200" y2="130" />
          </g>
        )}
        {variant === "security" && (
          <g fill="none" stroke="white" strokeOpacity="0.4">
            <path d="M200 40 L280 80 L280 150 Q280 200 200 220 Q120 200 120 150 L120 80 Z" fill="white" fillOpacity="0.08" strokeWidth="1.5" />
            <path d="M170 130 L195 155 L240 105" stroke="white" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {variant === "code" && (
          <g fill="white" fillOpacity="0.9" fontFamily="ui-monospace, monospace" fontSize="14">
            <text x="40" y="70" opacity="0.5">const</text>
            <text x="90" y="70">learn = () =&gt; &#123;</text>
            <text x="60" y="105">return</text>
            <text x="130" y="105" opacity="0.8">"skills"</text>
            <text x="40" y="140">&#125;</text>
            <rect x="40" y="170" width="80" height="4" rx="2" opacity="0.5" />
            <rect x="40" y="185" width="180" height="4" rx="2" opacity="0.3" />
            <rect x="40" y="200" width="130" height="4" rx="2" opacity="0.3" />
          </g>
        )}
        {variant === "ai" && (
          <g fill="none" stroke="white" strokeOpacity="0.45">
            {Array.from({ length: 5 }).map((_, i) => (
              <circle key={i} cx="80" cy={50 + i * 40} r="5" fill="white" fillOpacity="0.9" />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <circle key={i} cx="200" cy={70 + i * 40} r="5" fill="white" fillOpacity="0.9" />
            ))}
            {Array.from({ length: 3 }).map((_, i) => (
              <circle key={i} cx="320" cy={90 + i * 40} r="5" fill="white" fillOpacity="0.9" />
            ))}
            {Array.from({ length: 5 }).map((_, i) =>
              Array.from({ length: 4 }).map((_, j) => (
                <line key={`${i}-${j}`} x1="80" y1={50 + i * 40} x2="200" y2={70 + j * 40} strokeOpacity="0.15" />
              ))
            )}
            {Array.from({ length: 4 }).map((_, i) =>
              Array.from({ length: 3 }).map((_, j) => (
                <line key={`b${i}-${j}`} x1="200" y1={70 + i * 40} x2="320" y2={90 + j * 40} strokeOpacity="0.15" />
              ))
            )}
          </g>
        )}
        {variant === "cloud" && (
          <g fill="white" fillOpacity="0.9">
            <path d="M100 160 Q100 130 130 125 Q140 90 180 90 Q220 90 230 125 Q270 125 270 160 Q270 190 240 190 L130 190 Q100 190 100 160 Z" fill="white" fillOpacity="0.85" />
            <rect x="150" y="205" width="60" height="4" rx="2" fill="white" fillOpacity="0.4" />
          </g>
        )}
        {variant === "design" && (
          <g fill="white" fillOpacity="0.85">
            <rect x="60" y="60" width="80" height="80" rx="16" />
            <circle cx="230" cy="100" r="42" />
            <rect x="290" y="60" width="80" height="80" rx="40" fillOpacity="0.5" />
            <rect x="60" y="170" width="310" height="10" rx="5" fillOpacity="0.35" />
          </g>
        )}
      </svg>}
      {title && (
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="text-[11px] font-medium uppercase tracking-widest text-white/70">TechBridge</div>
        </div>
      )}
    </div>
  );
}

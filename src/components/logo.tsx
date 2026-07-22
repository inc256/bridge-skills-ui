import { Link } from "@tanstack/react-router";

export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  const color = variant === "light" ? "text-white" : "text-foreground";
  return (
    <Link to="/" className={`flex items-center gap-2 ${color}`}>
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-primary text-primary-foreground">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M3 6 L10 2 L17 6 L17 14 L10 18 L3 14 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M7 9 L10 11 L13 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 11 V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight">TechBridge<span className="text-muted-foreground font-medium"> · Skills Hub</span></span>
    </Link>
  );
}

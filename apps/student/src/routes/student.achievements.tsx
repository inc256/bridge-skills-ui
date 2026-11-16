import { createFileRoute } from "@tanstack/react-router";
import { Award, BookOpen, CheckCircle2, Clock3, Cloud, Flame, X, type LucideIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/student/achievements")({
  component: Achievements,
});

interface DemoCertificate {
  id: string;
  title: string;
  date: string;
  kind: "design" | "cloud";
}

const certificates: DemoCertificate[] = [
  { id: "figma", title: "Introduction to Figma", date: "2 Nov 2026", kind: "design" },
  { id: "cloud", title: "Diploma in Cloud Computer", date: "22 Feb 2026", kind: "cloud" },
];

const weekdayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const learningDays = new Set([9, 10, 11, 12, 13]);
const streakDays = new Set([9, 13]);

function getCalendarDays() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  return Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(year, month, index - firstWeekday + 1);
    const inCurrentMonth = date.getMonth() === month;
    return {
      key: date.getTime(),
      day: date.getDate(),
      inCurrentMonth,
      learning: inCurrentMonth && learningDays.has(date.getDate()),
      streak: inCurrentMonth && streakDays.has(date.getDate()),
    };
  });
}

function escapeHtml(value: string) {
  const escapedCharacters: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (character) => escapedCharacters[character] ?? character);
}

function downloadCertificate(certificate: DemoCertificate) {
  const title = escapeHtml(certificate.title);
  const date = escapeHtml(certificate.date);
  const contents = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} - TechBridge Certificate</title>
<style>
body{margin:0;padding:40px;background:#f4f8f5;font-family:Arial,sans-serif;color:#173c2c}
main{max-width:900px;margin:5vh auto;padding:64px 32px;border:8px double #047857;background:#fff;text-align:center}
.brand{color:#047857;font-size:14px;font-weight:bold;letter-spacing:4px;text-transform:uppercase}
h1{margin:40px 0 16px;font-family:Georgia,serif;font-size:42px}
.name{margin:30px 0;color:#047857;font-size:30px;font-weight:bold}
.date{margin-top:48px;color:#666;font-size:14px}
</style>
</head>
<body>
<main>
<div class="brand">TechBridge Skills Hub</div>
<h1>Certificate of Completion</h1>
<p>This certificate is awarded for completing</p>
<div class="name">${title}</div>
<div class="date">Issued ${date}</div>
</main>
</body>
</html>`;
  const url = URL.createObjectURL(new Blob([contents], { type: "text/html" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${certificate.id}-certificate.html`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Achievements() {
  const [previewCertificate, setPreviewCertificate] = useState<DemoCertificate | null>(null);
  const calendarDays = getCalendarDays();

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5">
      <section className="grid grid-cols-2 gap-3 min-[601px]:gap-4 xl:grid-cols-4" aria-label="Learning statistics">
        <StatCard value="3" label="Courses In Progress" icon={Clock3} />
        <StatCard value="0" suffix="of 2" label="Courses Completed" icon={CheckCircle2} />
        <StatCard value="2" suffix="of 8" label="Assignments Completed" icon={BookOpen} />
        <StatCard value="3" suffix="Days" label="Current Streak" icon={Flame} accent />
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]">
        <section className="flex flex-col rounded-xl border border-border bg-card p-4 sm:p-5" aria-labelledby="learning-calendar-title">
          <h2 id="learning-calendar-title" className="mb-5 text-sm font-medium text-muted-foreground">
            Days Spent Learning
          </h2>
          <div className="mb-3 grid grid-cols-7 text-center text-xs font-medium text-muted-foreground sm:text-sm">
            {weekdayNames.map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium sm:gap-2 sm:text-base">
            {calendarDays.map((calendarDay) => (
              <span
                key={calendarDay.key}
                className={`grid h-9 place-items-center rounded-md sm:h-10 ${
                  !calendarDay.inCurrentMonth
                    ? "text-gray-400 dark:text-gray-600"
                    : calendarDay.streak
                      ? "bg-[#065f46] text-white"
                      : calendarDay.learning
                        ? "bg-[#a7f3d0] text-[#047857] dark:bg-emerald-900 dark:text-emerald-100"
                        : "text-foreground"
                }`}
              >
                {calendarDay.day}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-4 sm:p-5" aria-labelledby="certificates-title">
          <h2 id="certificates-title" className="mb-4 border-b border-border pb-3 text-base font-semibold text-foreground sm:mb-5 sm:pb-4 sm:text-lg">
            Certificates
          </h2>
          <div className="flex flex-col">
            {certificates.map((certificate, index) => (
              <div key={certificate.id} className={`flex flex-wrap items-center gap-3 py-4 sm:gap-4 ${
                index < certificates.length - 1 ? "border-b border-border" : ""
              }`}>
                <div className={`grid h-[50px] w-20 shrink-0 place-items-center overflow-hidden rounded-md ${
                  certificate.kind === "design"
                    ? "bg-gradient-to-br from-emerald-100 via-cyan-100 to-indigo-200 text-emerald-800"
                    : "bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 text-blue-800"
                }`} aria-hidden="true">
                  {certificate.kind === "design" ? <Award className="h-7 w-7" /> : <Cloud className="h-7 w-7" />}
                </div>
                <div className="min-w-[140px] flex-1">
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">{certificate.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{certificate.date}</p>
                </div>
                <div className="flex w-full justify-end gap-2 sm:w-auto sm:gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPreviewCertificate(certificate)}
                    className="rounded-md bg-[#10b981] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#059669] sm:px-6"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadCertificate(certificate)}
                    className="rounded-md bg-[#047857] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#065f46] sm:px-6"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-border bg-card p-4 sm:p-5" aria-labelledby="weekly-goal-title">
        <h2 id="weekly-goal-title" className="text-base font-semibold text-foreground sm:text-lg">Weekly Goal</h2>
        <div className="flex flex-col items-start gap-5 pt-4 sm:flex-row sm:items-center sm:justify-between sm:py-3">
          <div className="flex items-center gap-5 sm:gap-7">
            <div className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-full border-4 border-[#10b981] sm:h-[100px] sm:w-[100px]">
              <div className="h-[30px] w-[30px] rounded-full border-[3px] border-[#047857]" />
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <h3 className="text-base font-semibold text-foreground sm:text-lg">4 of 5 Lessons to Complete</h3>
              <p className="mb-1 text-sm text-muted-foreground">1 more lesson to hit weekly target.</p>
              <div className="flex gap-2" aria-label="4 of 5 weekly lessons completed">
                {[1, 2, 3, 4, 5].map((lesson) => (
                  <span
                    key={lesson}
                    className={`grid h-7 w-7 place-items-center text-xs font-semibold text-white ${
                      lesson <= 4 ? "bg-[#065f46]" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
                  >
                    {lesson}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex h-[120px] w-[120px] shrink-0 self-end items-center justify-center rounded-full border-[6px] border-gray-300 border-r-[#047857] border-t-[#047857] sm:self-auto dark:border-gray-600 dark:border-r-emerald-400 dark:border-t-emerald-400" aria-hidden="true">
            <div className="h-[90px] w-[90px] rounded-full border-4 border-dashed border-[#047857]/50 dark:border-emerald-400/50" />
          </div>
        </div>
      </section>

      {previewCertificate && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/50 p-4" onClick={() => setPreviewCertificate(null)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-preview-title"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-xl rounded-2xl border-8 border-double border-[#047857] bg-card p-8 text-center shadow-2xl sm:p-12"
          >
            <button
              type="button"
              onClick={() => setPreviewCertificate(null)}
              aria-label="Close certificate preview"
              className="absolute right-3 top-3 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </button>
            <Award className="mx-auto h-10 w-10 text-[#047857]" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[#047857]">TechBridge Skills Hub</p>
            <h2 id="certificate-preview-title" className="mt-5 text-2xl font-semibold text-foreground">Certificate of Completion</h2>
            <p className="mt-4 text-sm text-muted-foreground">Awarded for completing</p>
            <p className="mt-2 text-xl font-semibold text-[#047857]">{previewCertificate.title}</p>
            <p className="mt-6 text-sm text-muted-foreground">Issued {previewCertificate.date}</p>
          </section>
        </div>
      )}
    </div>
  );
}

function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
  accent = false,
}: {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  accent?: boolean;
}) {
  return (
    <article className="flex min-h-[122px] flex-col rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-2 flex items-start justify-between">
        <p className="text-4xl font-semibold leading-none text-foreground">
          {value}
          {suffix && <span className="ml-1 text-lg font-normal text-muted-foreground">{suffix}</span>}
        </p>
        <Icon className={`h-6 w-6 ${accent ? "text-[#10b981]" : "text-[#047857] dark:text-emerald-400"}`} aria-hidden="true" />
      </div>
      <p className="mt-auto text-sm font-medium text-muted-foreground">{label}</p>
    </article>
  );
}

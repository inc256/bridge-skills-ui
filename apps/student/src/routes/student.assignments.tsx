import { createFileRoute } from "@tanstack/react-router";
import { EllipsisVertical, FileText } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/student/assignments")({
  component: Assignments,
});

type AssignmentStatus = "pending" | "submitted" | "assessed" | "declined";
type AssignmentTab = "all" | "completed" | "assessed";

interface AssignmentWithStatus {
  id: string;
  title: string;
  course: string;
  due: string;
  status: AssignmentStatus;
  type: string;
}

function dueIn(days: number, hours = 0, minutes = 0) {
  const duration = (days * 24 * 60 + hours * 60 + minutes) * 60_000;
  return new Date(Date.now() + duration).toISOString();
}

const demoAssignments: AssignmentWithStatus[] = [
  {
    id: "design-thinking-module-3",
    course: "Diploma in Design Thinking",
    type: "Module 3",
    title: "The End of Module Assignment.",
    due: dueIn(30),
    status: "pending",
  },
  {
    id: "intro-to-it-module-1",
    course: "Introduction to IT",
    type: "Module 1",
    title: "Check Assignment.",
    due: dueIn(-30),
    status: "declined",
  },
  {
    id: "advanced-javascript-module-2",
    course: "Advanced Javascript Course",
    type: "Module 2",
    title: "Assignment Check.",
    due: dueIn(3, 2, 31),
    status: "submitted",
  },
  {
    id: "web-development-module-4",
    course: "Web Development",
    type: "Module 4",
    title: "Build a Responsive Landing Page.",
    due: dueIn(6),
    status: "pending",
  },
  {
    id: "design-thinking-module-2",
    course: "Diploma in Design Thinking",
    type: "Module 2",
    title: "Create a User Journey Map.",
    due: dueIn(-2),
    status: "assessed",
  },
  {
    id: "javascript-module-1",
    course: "Advanced Javascript Course",
    type: "Module 1",
    title: "JavaScript Functions Practice.",
    due: dueIn(10),
    status: "submitted",
  },
  {
    id: "ux-module-5",
    course: "UX Fundamentals",
    type: "Module 5",
    title: "Complete an Accessibility Audit.",
    due: dueIn(12),
    status: "pending",
  },
  {
    id: "product-design-module-1",
    course: "Product Design",
    type: "Module 1",
    title: "Write a Project Proposal.",
    due: dueIn(20),
    status: "pending",
  },
  {
    id: "design-thinking-module-6",
    course: "Diploma in Design Thinking",
    type: "Module 6",
    title: "Final Project Reflection.",
    due: dueIn(14),
    status: "pending",
  },
  {
    id: "it-module-4",
    course: "Introduction to IT",
    type: "Module 4",
    title: "IT Security Fundamentals.",
    due: dueIn(8),
    status: "pending",
  },
];

function getTimeLeft(due: string) {
  if (!due || due.toLowerCase() === "tbd") {
    return { label: "DUE DATE: TBD", expired: false };
  }

  const dueTime = new Date(due).getTime();
  if (!Number.isFinite(dueTime)) {
    return { label: `DUE: ${due}`, expired: false };
  }

  const difference = dueTime - Date.now();
  const totalMinutes = Math.floor(Math.abs(difference) / 60_000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  const parts = [
    days ? `${days} DAY${days === 1 ? "" : "S"}` : "",
    hours ? `${hours} HR` : "",
    minutes || (!days && !hours) ? `${minutes} MIN` : "",
  ].filter(Boolean);

  return {
    label: `TIME LEFT: ${difference < 0 ? "-" : ""}${parts.join(" ")}`,
    expired: difference < 0,
  };
}

function DocumentThumbnail() {
  return (
    <div className="flex h-[85px] w-[65px] shrink-0 flex-col gap-[3px] overflow-hidden rounded border border-gray-300 bg-white p-1.5 sm:h-20 sm:w-[60px] sm:p-1" aria-hidden="true">
      <span className="mb-[2px] h-[2px] w-3/5 rounded bg-blue-400 sm:bg-blue-600" />
      <span className="h-[2px] w-full rounded bg-gray-400" />
      <span className="h-[2px] w-full rounded bg-gray-400" />
      <span className="h-[2px] w-[70%] rounded bg-gray-400" />
      <span className="h-[2px] w-full rounded bg-gray-400" />
      <span className="h-[2px] w-2/5 rounded bg-gray-400" />
      <span className="h-[2px] w-full rounded bg-gray-400" />
      <span className="h-[2px] w-[70%] rounded bg-gray-400" />
      <span className="h-[2px] w-full rounded bg-gray-400" />
    </div>
  );
}

function Assignments() {
  const assignments = demoAssignments;
  const [activeTab, setActiveTab] = useState<AssignmentTab>("all");

  const completedCount = assignments.filter((assignment) => assignment.status === "submitted").length;
  const assessedCount = assignments.filter((assignment) => assignment.status === "assessed").length;
  const tabs: { key: AssignmentTab; label: string; count: number }[] = [
    { key: "all", label: "All Assignments", count: assignments.length },
    { key: "completed", label: "Completed", count: completedCount },
    { key: "assessed", label: "Assessed", count: assessedCount },
  ];
  const visibleAssignments = assignments.filter((assignment) => (
    activeTab === "all"
    || (activeTab === "completed" && assignment.status === "submitted")
    || (activeTab === "assessed" && assignment.status === "assessed")
  ));

  return (
    <div className="mx-auto w-full max-w-[700px] px-2 sm:max-w-[1200px] sm:px-0">
      <div className="mb-6 flex justify-center overflow-x-auto border-b border-gray-200 dark:border-border" role="group" aria-label="Assignment status">
        <div className="flex w-full items-center justify-center gap-0 sm:w-auto sm:gap-12 lg:gap-24">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              aria-pressed={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex-1 whitespace-nowrap px-1 pb-3 pt-1 text-[14px] font-medium transition-colors sm:flex-none sm:px-0 sm:pb-4 sm:text-base ${
                activeTab === tab.key
                    ? "font-semibold text-[#013a23] after:absolute after:-bottom-px after:left-1/2 after:h-[3px] after:w-[60px] after:-translate-x-1/2 after:rounded-t after:bg-[#013a23] dark:text-emerald-300 dark:after:bg-emerald-300 sm:after:inset-x-0 sm:after:left-0 sm:after:w-auto sm:after:translate-x-0"
                    : "text-gray-500 hover:text-gray-800 dark:text-muted-foreground dark:hover:text-foreground"
              }`}
            >
              {tab.key === "all" ? (
                <>
                  <span className="sm:hidden">All ({tab.count})</span>
                  <span className="hidden sm:inline">{tab.label} ({tab.count})</span>
                </>
              ) : (
                `${tab.label} (${tab.count})`
              )}
            </button>
          ))}
        </div>
      </div>

      {visibleAssignments.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-card px-6 py-14 text-center">
          <FileText className="mx-auto h-9 w-9 text-muted-foreground" aria-hidden="true" />
          <h1 className="mt-3 text-lg font-semibold text-foreground">No assignments found</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {activeTab === "all" ? "Assignments will appear here when available." : "There are no assignments in this section yet."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:gap-4">
          {visibleAssignments.map((assignment) => {
            const due = getTimeLeft(assignment.due);
            const actionLabel = assignment.status === "pending"
              ? "Submit"
              : assignment.status === "declined"
                ? "Declined"
                : assignment.status === "assessed"
                  ? "Assessed"
                  : "Submitted";
            const actionClass = assignment.status === "pending"
              ? "bg-[#013a23] text-white hover:bg-[#024b2e]"
              : assignment.status === "declined"
                ? "bg-[#ff0000] text-white"
                : "border-2 border-[#013a23] bg-transparent text-[#013a23] dark:border-emerald-300 dark:text-emerald-300";

            return (
              <article
                key={assignment.id}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-card px-4 py-4 transition-shadow hover:shadow-md dark:border-border sm:gap-5 sm:px-5"
              >
                <DocumentThumbnail />
                <div className="flex min-w-0 flex-1 flex-col justify-center sm:min-w-[180px]">
                  <h2 className="mb-1 text-base font-bold text-foreground sm:text-lg">
                    {assignment.course || "Course"}
                  </h2>
                  <p className={`mb-2 text-sm ${
                    assignment.status === "submitted"
                      ? "text-muted-foreground sm:text-blue-600 sm:underline dark:sm:text-blue-400"
                      : "text-muted-foreground"
                  }`}>
                    {assignment.type}: {assignment.title}
                  </p>
                  <span className={`inline-flex self-start rounded px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide sm:text-xs ${
                    due.expired
                      ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                      : "bg-green-100 text-green-700 dark:bg-emerald-950 dark:text-emerald-300"
                  }`}>
                    {due.label}
                  </span>
                </div>
                <div className="mt-2.5 flex w-full items-center justify-end gap-3 sm:mt-0 sm:w-auto sm:gap-4">
                  <button
                    type="button"
                    disabled={assignment.status !== "pending"}
                    className={`min-w-[110px] rounded-md px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-default sm:min-w-[160px] sm:rounded-lg sm:px-6 sm:py-3 sm:text-base ${actionClass}`}
                  >
                    {actionLabel}
                  </button>
                  <span className="grid h-9 w-7 shrink-0 place-items-center text-foreground" aria-hidden="true">
                    <EllipsisVertical className="h-5 w-5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Assignments;

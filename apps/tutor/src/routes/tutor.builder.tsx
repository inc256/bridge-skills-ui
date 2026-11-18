import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, GripVertical, Plus, Trash2, Upload } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/tutor/builder")({
  component: Builder,
});

const steps = ["Details", "Outcomes", "Curriculum", "Resources", "Preview"];

const mockCourse = {
  name: "",
  subtitle: "",
  description: "",
  timeline: "",
  thumbnail: "",
  category: "",
  level: "Fundamental",
  status: "Draft",
  pricing: "Free",
  language: "English",
};

function Builder() {
  const [step, setStep] = useState(0);
  const [course, setCourse] = useState(mockCourse);
  const [outcomes, setOutcomes] = useState([
    "Understand core cloud computing concepts",
    "Deploy and manage cloud-based applications",
  ]);
  const [requirements, setRequirements] = useState([
    "Basic computer literacy",
  ]);
  const [newOutcome, setNewOutcome] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Cloud Computing Foundations",
      lessons: ["Introduction to Cloud Computing", "Cloud Service Models"],
    },
  ]);
  const [resources, setResources] = useState([
    { id: 1, label: "Cloud Computing Guide", url: "https://example.com/cloud-guide" },
  ]);
  const [newResourceLabel, setNewResourceLabel] = useState("");
  const [newResourceUrl, setNewResourceUrl] = useState("");

  const progress = 10 + step * 20;

  const update = (field: keyof typeof mockCourse, value: string) => {
    setCourse((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] px-1 pb-24 sm:px-2 lg:pb-8">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <div className="min-w-0 flex-1">
          <nav
            aria-label="Course setup steps"
            className="mb-6 flex gap-2 overflow-x-auto rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-[#293b30] dark:bg-[#111b16]"
          >
            {steps.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(index)}
                className={`shrink-0 rounded-lg px-4 py-2.5 text-[15px] font-medium transition sm:px-6 ${
                  step === index
                    ? "bg-[#00c17a] text-white"
                    : "text-[#00c17a] hover:bg-[#f0fdf4] dark:hover:bg-[#17251d]"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {step === 0 ? (
            <section className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] dark:border-[#293b30] dark:bg-[#111b16] sm:p-8">
              <h1 className="mb-6 border-b border-[#e5e7eb] pb-4 text-[20px] font-medium text-[#00c17a] dark:border-[#293b30]">
                Details
              </h1>

              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-[#1f2937] dark:text-[#e5e7eb]">Course Name</span>
                  <input
                    value={course.name}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder="e.g Networking Security"
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#00c17a] focus:ring-[3px] focus:ring-[#00c17a]/10 dark:border-[#293b30] dark:bg-[#111b16] dark:text-white"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-[#1f2937] dark:text-[#e5e7eb]">Subtitle</span>
                  <input
                    value={course.subtitle}
                    onChange={(event) => update("subtitle", event.target.value)}
                    placeholder="A short supporting summary"
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#00c17a] focus:ring-[3px] focus:ring-[#00c17a]/10 dark:border-[#293b30] dark:bg-[#111b16] dark:text-white"
                  />
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm text-[#1f2937] dark:text-[#e5e7eb]">Description</span>
                  <textarea
                    value={course.description}
                    onChange={(event) => update("description", event.target.value)}
                    placeholder="Write a short summary of what the course covers"
                    className="min-h-[100px] w-full resize-y rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#00c17a] focus:ring-[3px] focus:ring-[#00c17a]/10 dark:border-[#293b30] dark:bg-[#111b16] dark:text-white"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-[#1f2937] dark:text-[#e5e7eb]">Course Timeline</span>
                  <input
                    value={course.timeline}
                    onChange={(event) => update("timeline", event.target.value)}
                    placeholder="e.g 2 Weeks"
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#00c17a] focus:ring-[3px] focus:ring-[#00c17a]/10 dark:border-[#293b30] dark:bg-[#111b16] dark:text-white"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-[#1f2937] dark:text-[#e5e7eb]">Thumbnail</span>
                  <input
                    value={course.thumbnail}
                    onChange={(event) => update("thumbnail", event.target.value)}
                    placeholder="Upload Image"
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#00c17a] focus:ring-[3px] focus:ring-[#00c17a]/10 dark:border-[#293b30] dark:bg-[#111b16] dark:text-white"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-[#1f2937] dark:text-[#e5e7eb]">Category</span>
                  <input
                    value={course.category}
                    onChange={(event) => update("category", event.target.value)}
                    placeholder="e.g Artificial Intelligence"
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#00c17a] focus:ring-[3px] focus:ring-[#00c17a]/10 dark:border-[#293b30] dark:bg-[#111b16] dark:text-white"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-[#1f2937] dark:text-[#e5e7eb]">Level</span>
                  <input
                    value={course.level}
                    onChange={(event) => update("level", event.target.value)}
                    placeholder="Fundamental"
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#00c17a] focus:ring-[3px] focus:ring-[#00c17a]/10 dark:border-[#293b30] dark:bg-[#111b16] dark:text-white"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-[#1f2937] dark:text-[#e5e7eb]">Status</span>
                  <input
                    value={course.status}
                    onChange={(event) => update("status", event.target.value)}
                    placeholder="Draft"
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#00c17a] focus:ring-[3px] focus:ring-[#00c17a]/10 dark:border-[#293b30] dark:bg-[#111b16] dark:text-white"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-[#1f2937] dark:text-[#e5e7eb]">Pricing</span>
                  <input
                    value={course.pricing}
                    onChange={(event) => update("pricing", event.target.value)}
                    placeholder="Free"
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#00c17a] focus:ring-[3px] focus:ring-[#00c17a]/10 dark:border-[#293b30] dark:bg-[#111b16] dark:text-white"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-[#1f2937] dark:text-[#e5e7eb]">Language</span>
                  <input
                    value={course.language}
                    onChange={(event) => update("language", event.target.value)}
                    placeholder="English"
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#00c17a] focus:ring-[3px] focus:ring-[#00c17a]/10 dark:border-[#293b30] dark:bg-[#111b16] dark:text-white"
                  />
                </label>
              </div>
            </section>
          ) : (
            <section className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-[#293b30] dark:bg-[#111b16] sm:p-8">
              <h1 className="border-b border-[#e5e7eb] pb-4 text-[20px] font-medium text-[#00c17a] dark:border-[#293b30]">
                {steps[step]}
              </h1>

              {step === 1 && (
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h2 className="mb-3 text-sm font-semibold text-[#1f2937] dark:text-white">What students will learn</h2>
                    <div className="space-y-2">
                      {outcomes.map((outcome, index) => (
                        <div key={outcome} className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-3 py-2.5 dark:border-[#293b30]">
                          <span className="flex-1 text-sm text-[#1f2937] dark:text-[#e5e7eb]">{outcome}</span>
                          <button type="button" aria-label="Remove outcome" onClick={() => setOutcomes((items) => items.filter((_, itemIndex) => itemIndex !== index))} className="text-[#9ca3af] hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <input value={newOutcome} onChange={(event) => setNewOutcome(event.target.value)} placeholder="Add a learning outcome" className="min-w-0 flex-1 rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#00c17a] dark:border-[#293b30] dark:bg-[#111b16] dark:text-white" />
                      <button type="button" onClick={() => { if (newOutcome.trim()) { setOutcomes((items) => [...items, newOutcome.trim()]); setNewOutcome(""); } }} className="grid h-10 w-10 place-items-center rounded-lg bg-[#00c17a] text-white"><Plus className="h-4 w-4" /></button>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-3 text-sm font-semibold text-[#1f2937] dark:text-white">Requirements</h2>
                    <div className="space-y-2">
                      {requirements.map((requirement, index) => (
                        <div key={requirement} className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-3 py-2.5 dark:border-[#293b30]">
                          <span className="flex-1 text-sm text-[#1f2937] dark:text-[#e5e7eb]">{requirement}</span>
                          <button type="button" aria-label="Remove requirement" onClick={() => setRequirements((items) => items.filter((_, itemIndex) => itemIndex !== index))} className="text-[#9ca3af] hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <input value={newRequirement} onChange={(event) => setNewRequirement(event.target.value)} placeholder="Add a requirement" className="min-w-0 flex-1 rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#00c17a] dark:border-[#293b30] dark:bg-[#111b16] dark:text-white" />
                      <button type="button" onClick={() => { if (newRequirement.trim()) { setRequirements((items) => [...items, newRequirement.trim()]); setNewRequirement(""); } }} className="grid h-10 w-10 place-items-center rounded-lg bg-[#00c17a] text-white"><Plus className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="mt-6 space-y-3">
                  {modules.map((module, moduleIndex) => (
                    <div key={module.id} className="rounded-xl border border-[#e5e7eb] dark:border-[#293b30]">
                      <div className="flex items-center gap-3 border-b border-[#e5e7eb] px-4 py-3 dark:border-[#293b30]">
                        <GripVertical className="h-4 w-4 text-[#9ca3af]" />
                        <input value={module.title} onChange={(event) => setModules((items) => items.map((item, index) => index === moduleIndex ? { ...item, title: event.target.value } : item))} className="min-w-0 flex-1 rounded-md border border-transparent bg-transparent px-2 py-1 text-sm font-semibold text-[#1f2937] outline-none focus:border-[#00c17a] dark:text-white" />
                        <button type="button" aria-label="Remove module" onClick={() => setModules((items) => items.filter((_, index) => index !== moduleIndex))} className="text-[#9ca3af] hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <div className="space-y-2 p-3">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson} className="flex items-center gap-3 rounded-lg bg-[#f9fafb] px-3 py-2.5 dark:bg-[#17251d]">
                            <span className="grid h-7 w-7 place-items-center rounded-md bg-[#e6f7f0] text-xs font-semibold text-[#059669]">{lessonIndex + 1}</span>
                            <span className="flex-1 text-sm text-[#4b5563] dark:text-[#d1d5db]">{lesson}</span>
                            <button type="button" aria-label="Remove lesson" onClick={() => setModules((items) => items.map((item, index) => index === moduleIndex ? { ...item, lessons: item.lessons.filter((_, indexToRemove) => indexToRemove !== lessonIndex) } : item))} className="text-[#9ca3af] hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => setModules((items) => items.map((item, index) => index === moduleIndex ? { ...item, lessons: [...item.lessons, "New lesson"] } : item))} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#00c17a]/50 px-3 py-2 text-sm font-medium text-[#00a86b] hover:bg-[#f0fdf4] dark:hover:bg-[#17251d]"><Plus className="h-4 w-4" /> Add lesson</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => setModules((items) => [...items, { id: Date.now(), title: "New Module", lessons: [] }])} className="inline-flex items-center gap-2 rounded-lg bg-[#00c17a] px-4 py-2.5 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Add module</button>
                </div>
              )}

              {step === 3 && (
                <div className="mt-6 space-y-4">
                  <label className="flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-[#00c17a]/50 bg-[#f0fdf4] px-6 py-8 text-center text-sm text-[#059669] dark:bg-[#17251d]">
                    <Upload className="mb-2 h-6 w-6" />
                    Upload course resources
                    <input type="file" className="sr-only" />
                  </label>
                  <div className="space-y-2">
                    {resources.map((resource) => (
                      <div key={resource.id} className="flex items-center gap-3 rounded-lg border border-[#e5e7eb] px-3 py-3 dark:border-[#293b30]">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[#1f2937] dark:text-white">{resource.label}</p>
                          <p className="truncate text-xs text-[#6b7280] dark:text-[#a6b8aa]">{resource.url}</p>
                        </div>
                        <button type="button" aria-label="Remove resource" onClick={() => setResources((items) => items.filter((item) => item.id !== resource.id))} className="text-[#9ca3af] hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]">
                    <input value={newResourceLabel} onChange={(event) => setNewResourceLabel(event.target.value)} placeholder="Resource name" className="rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#00c17a] dark:border-[#293b30] dark:bg-[#111b16] dark:text-white" />
                    <input value={newResourceUrl} onChange={(event) => setNewResourceUrl(event.target.value)} placeholder="Resource URL" className="rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#00c17a] dark:border-[#293b30] dark:bg-[#111b16] dark:text-white" />
                    <button type="button" onClick={() => { if (newResourceLabel.trim()) { setResources((items) => [...items, { id: Date.now(), label: newResourceLabel.trim(), url: newResourceUrl.trim() || "#" }]); setNewResourceLabel(""); setNewResourceUrl(""); } }} className="rounded-lg bg-[#00c17a] px-4 py-2.5 text-sm font-semibold text-white"><Plus className="mx-auto h-4 w-4" /></button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="mt-6">
                  <div className="rounded-xl border border-[#e5e7eb] p-5 dark:border-[#293b30]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#059669]">{course.status}</p>
                    <h2 className="mt-2 text-xl font-semibold text-[#1f2937] dark:text-white">{course.name || "Untitled Course"}</h2>
                    <p className="mt-1 text-sm text-[#6b7280] dark:text-[#a6b8aa]">{course.subtitle || "Add a subtitle to introduce your course."}</p>
                    <p className="mt-4 text-sm leading-6 text-[#4b5563] dark:text-[#d1d5db]">{course.description || "No description added yet."}</p>
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[["Category", course.category || "Not set"], ["Level", course.level], ["Timeline", course.timeline || "Not set"], ["Language", course.language]].map(([label, value]) => (
                        <div key={label} className="rounded-lg bg-[#f9fafb] p-3 dark:bg-[#17251d]">
                          <p className="text-[11px] text-[#9ca3af]">{label}</p>
                          <p className="mt-1 text-sm font-medium text-[#1f2937] dark:text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          <div className="mt-6 flex items-center justify-between rounded-xl border border-[#e5e7eb] bg-white px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-[#293b30] dark:bg-[#111b16]">
            <span className="text-[15px] text-[#6b7280] dark:text-[#a6b8aa]">
              {step + 1} of {steps.length} Steps
            </span>
            <button
              type="button"
              onClick={() => setStep((current) => Math.min(current + 1, steps.length - 1))}
              disabled={step === steps.length - 1}
              className="inline-flex items-center gap-2 rounded-lg bg-[#00c17a] px-6 py-2.5 text-base font-medium text-white transition hover:bg-[#00a86b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <aside className="order-first h-fit rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] dark:border-[#293b30] dark:bg-[#111b16] md:order-none md:w-[320px] md:flex-shrink-0 md:p-6">
          <div>
            <p className="text-[14px] font-normal text-[#6b7280] dark:text-[#a6b8aa]">Courses Overview</p>
            <h2 className="mt-1 text-[18px] font-medium text-[#1f2937] dark:text-white">
              Untitled Course
            </h2>
          </div>
          <p className="mt-3 border-b border-[#e5e7eb] pb-4 text-[13px] leading-[1.5] text-[#6b7280] dark:border-[#293b30] dark:text-[#a6b8aa]">
            {course.subtitle || "Add a subtitle to introduce your course."}
          </p>

          <div className="mt-4 flex h-6 items-center gap-3">
            <svg
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
              className="h-4 flex-1 overflow-visible"
              aria-hidden="true"
            >
              <path
                d="M 0 8 Q 12.5 0, 25 8 T 50 8 T 75 8 T 100 8 T 125 8 T 150 8 T 175 8 T 200 8"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 0 8 Q 12.5 0, 25 8 T 50 8"
                fill="none"
                stroke="#00c17a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${progress / 100 * 50} 300`}
              />
            </svg>
            <span className="min-w-[30px] text-[13px] font-medium text-[#6b7280] dark:text-[#a6b8aa]">
              {progress}%
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[#f0fdf4] px-3 py-4 dark:bg-[#17251d]">
              <span className="text-[13px] text-[#6b7280] dark:text-[#a6b8aa]">Modules</span>
              <span className="text-[18px] font-medium text-[#1f2937] dark:text-white">0</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[#f0fdf4] px-3 py-4 dark:bg-[#17251d]">
              <span className="text-[13px] text-[#6b7280] dark:text-[#a6b8aa]">Lessons</span>
              <span className="text-[18px] font-medium text-[#1f2937] dark:text-white">0</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

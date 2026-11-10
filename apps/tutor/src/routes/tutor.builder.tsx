// apps/tutor/src/routes/tutor/builder.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Check,
  Plus,
  Upload,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  BookOpen,
  Star,
  Clock,
  Trash2,
  Eye,
  X,
  Link as LinkIcon,
  Video,
  FileQuestion,
  Briefcase,
  Book,
  Target,
  ListChecks,
  Save,
  RefreshCw,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  createCourse,
  patchCourse,
  getCourse,
  getCourseModules,
  getCourseCategories,
  createTutorModule,
  updateTutorModule,
  deleteTutorModule,
  createTutorLesson,
  updateTutorLesson,
  deleteTutorLesson,
  resolveTutorMedia,
} from "@/lib/api";

export const Route = createFileRoute("/tutor/builder")({
  component: Builder,
});

const steps = ["Details", "Outcomes", "Curriculum", "Resources", "Preview"];
const savedCourseKey = "bridge_skills_tutor_last_saved_course";

type BuilderLesson = {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  content?: string;
  duration: string;
  type: "text" | "video" | "audio" | "document" | "assignment" | "quiz";
  videoUrl?: string;
  videoFile?: string | File;
  pdfFile?: string | File;
  audioFile?: string | File;
  pptFile?: string | File;
  thumbnail?: string | File;
  subtitleVtt?: string | File;
  xpReward?: number;
  isFree?: boolean;
  isDrip?: boolean;
  dripAfter?: number;
  isPublished?: boolean;
  // True once this lesson exists in the DB. Set explicitly at load/creation
  // time instead of being guessed from the shape of `id` at save time.
  _persisted?: boolean;
};

type BuilderModule = {
  id: string;
  title: string;
  description: string;
  lessons: BuilderLesson[];
  _persisted?: boolean;
};

const LESSON_TYPES = ["video", "text", "audio", "document", "quiz", "assignment"] as const;
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

function normalizeLessonType(value: unknown): BuilderLesson["type"] {
  const type = String(value ?? "video").toLowerCase();
  if (type === "article" || type === "reading") return "text";
  if (type === "project" || type === "live") return "assignment";
  return LESSON_TYPES.includes(type as BuilderLesson["type"])
    ? (type as BuilderLesson["type"])
    : "video";
}

function validateLesson(lesson: BuilderLesson, type: BuilderLesson["type"]) {
  const has = (value?: string | File) => Boolean(value && (value instanceof File || value.trim()));
  if (!lesson.title.trim()) return "title is required.";
  if (type === "text" || type === "assignment" || type === "quiz") {
    if (!has(lesson.content)) return `${type} lessons require content.`;
  }
  if (type === "video" && !has(lesson.videoUrl) && !has(lesson.videoFile))
    return "video lessons require a video URL or video file.";
  if (type === "audio" && !has(lesson.audioFile)) return "audio lessons require an audio file.";
  if (type === "document" && !has(lesson.pdfFile) && !has(lesson.pptFile))
    return "document lessons require a PDF or PowerPoint file.";
  return null;
}

function LessonField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value?: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-1">
      <span className="text-xs text-gray-500">{label}</span>
      <input
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
      />
    </label>
  );
}

function LessonFileField({
  label,
  value,
  accept,
  onChange,
}: {
  label: string;
  value?: string | File;
  accept: string;
  onChange: (value: File) => void;
}) {
  const fileName = value instanceof File ? value.name : value?.split("/").pop();
  return (
    <label className="space-y-1">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:border-blue-400 hover:bg-blue-50">
        <Upload className="h-4 w-4 shrink-0 text-blue-600" />
        <span className="min-w-0 truncate">{fileName ?? "Choose file"}</span>
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onChange(file);
          }}
        />
      </span>
    </label>
  );
}

function mediaPayload(value?: string | File) {
  return value instanceof File ? value : undefined;
}

function oversizedUpload(value?: string | File | null) {
  return value instanceof File && value.size > MAX_UPLOAD_BYTES ? value : null;
}

function readSavedCourse(slug: string) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(savedCourseKey);
    const saved = raw ? JSON.parse(raw) : null;
    return saved?.slug === slug ? saved : null;
  } catch {
    return null;
  }
}

function Builder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [courseTimeline, setCourseTimeline] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [level, setLevel] = useState("beginner");
  const [language, setLanguage] = useState("English");
  const [status, setStatus] = useState("draft");
  const [pricing, setPricing] = useState("free");
  const [price, setPrice] = useState("0");
  const [subtitle, setSubtitle] = useState("");
  const [modules, setModules] = useState<BuilderModule[]>([]);
  const [originalLessonIds, setOriginalLessonIds] = useState<string[]>([]);
  const [originalModuleIds, setOriginalModuleIds] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [savedDraft, setSavedDraft] = useState<any | null>(null);
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newOutcome, setNewOutcome] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newResourceLabel, setNewResourceLabel] = useState("");
  const [newResourceUrl, setNewResourceUrl] = useState("");
  const [resources, setResources] = useState<
    Array<{ id: string; label: string; url: string; type: string }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false);
  const [expandedLessons, setExpandedLessons] = useState<Record<string, string | null>>({});
  const [quickLessonDrafts, setQuickLessonDrafts] = useState<
    Record<string, { title: string; type: BuilderLesson["type"] }>
  >({});

  // Fallback heuristic for drafts saved before `_persisted` existed (e.g. an
  // old draft sitting in localStorage). Once every draft has gone through a
  // load/save cycle this can be removed - `_persisted` should always be set.
  function looksPersistedId(id: unknown) {
    if (typeof id !== "string" && typeof id !== "number") return false;
    const value = String(id);
    return value.length > 0 && !value.startsWith("module-") && !value.startsWith("lesson-");
  }

  // Load categories
  useEffect(() => {
    void (async () => {
      const result = await getCourseCategories();
      setCategories(result);
      setCategoryId(result[0]?.id ?? null);
    })();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    setSlug((current) => {
      if (isEdit) return current;
      if (
        !current ||
        current === "new-course" ||
        current === slugify(title) ||
        current.startsWith("new-course")
      ) {
        return slugify(title);
      }
      return current;
    });
  }, [title, isEdit]);

  // Load course for editing
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const editSlug = params.get("slug");
      if (!editSlug) return;

      setIsEdit(true);
      setOriginalSlug(editSlug);
      setLoadingCourse(true);

      void (async () => {
        try {
          const [serverCourse, serverModules] = await Promise.all([
            getCourse(editSlug),
            getCourseModules(editSlug),
          ]);
          const savedCourse = readSavedCourse(editSlug);
          if (!serverCourse && !savedCourse) {
            toast.error("Course not found");
            setLoadingCourse(false);
            return;
          }
          const course = serverCourse ?? savedCourse;
          const curriculum =
            Array.isArray(serverModules) && serverModules.length > 0
              ? serverModules
              : Array.isArray(course.modules) && course.modules.length > 0
                ? course.modules
                : [];
          if (!course) {
            toast.error("Course not found");
            setLoadingCourse(false);
            return;
          }

          // Populate all fields with course data
          if (course.title) setTitle(course.title);
          if (course.slug) setSlug(course.slug);
          if (course.subtitle) setSubtitle(course.subtitle);
          if (course.description) setDescription(course.description ?? course.subtitle ?? "");
          if (course.thumbnail || course.thumbnail_url || course.cover_image || course.image) {
            setThumbnailUrl(
              resolveTutorMedia(
                course.thumbnail ?? course.thumbnail_url ?? course.cover_image ?? course.image,
                "thumbnails",
              ),
            );
          }
          const timeline = [
            course.duration,
            course.course_timeline,
            course.total_course_timeline,
            course.total_duration,
            course.timeline,
          ].find((value) => value !== null && value !== undefined && String(value).trim() !== "");
          if (timeline !== undefined) setCourseTimeline(String(timeline));
          if (course.category && typeof course.category === "object") {
            setCategoryId(course.category.id ?? course.category);
          } else if (course.category_id) {
            setCategoryId(course.category_id);
          }
          if (course.level) setLevel(String(course.level).toLowerCase());
          if (course.language) setLanguage(course.language);
          if (course.status) setStatus(course.status);

          // Handle pricing
          if (course.price) {
            const raw = Number(course.price ?? 0);
            if (raw > 0) {
              setPricing("paid");
              setPrice(String(raw));
            } else {
              setPricing("free");
              setPrice("0");
            }
          }

          // Handle arrays
          if (Array.isArray(course.outcomes)) setOutcomes(course.outcomes);
          if (Array.isArray(course.requirements)) setRequirements(course.requirements);

          // Handle modules and lessons if they exist
          if (Array.isArray(curriculum) && curriculum.length > 0) {
            setOriginalModuleIds(
              curriculum
                .filter((module: any) => module._persisted ?? looksPersistedId(module.id))
                .map((module: any) => String(module.id)),
            );
            setOriginalLessonIds(
              curriculum.flatMap((module: any) =>
                Array.isArray(module.lessons)
                  ? module.lessons
                      .filter((lesson: any) => lesson._persisted ?? looksPersistedId(lesson.id))
                      .map((lesson: any) => String(lesson.id))
                  : [],
              ),
            );
            setModules(
              curriculum.map((m: any) => ({
                id: m.id || getNewId(),
                title: m.title || "Module",
                description: m.description || "",
                _persisted: m._persisted ?? looksPersistedId(m.id),
                lessons: Array.isArray(m.lessons)
                  ? m.lessons.map((l: any) => ({
                      id: l.id || getNewId(),
                      title: l.title || "Lesson",
                      slug: l.slug || undefined,
                      description: l.description ?? "",
                      content: l.content ?? "",
                      duration: l.duration || "15 min",
                      type: normalizeLessonType(l.type),
                      videoUrl: l.video_url || l.videoUrl || "",
                      videoFile: l.video_file || l.videoFile || "",
                      pdfFile: resolveTutorMedia(l.pdf_file || l.pdfFile, "pdf"),
                      audioFile: resolveTutorMedia(l.audio_file || l.audioFile, "audio"),
                      pptFile: resolveTutorMedia(l.ppt_file || l.pptFile, "ppt"),
                      thumbnail: resolveTutorMedia(l.thumbnail, "thumbnails"),
                      subtitleVtt: l.subtitle_vtt || l.subtitleVtt || "",
                      xpReward: Number(l.xp_reward ?? l.xpReward ?? 10),
                      isFree: Boolean(l.is_free ?? l.isFree),
                      isDrip: Boolean(l.is_drip ?? l.isDrip),
                      dripAfter: Number(l.drip_after ?? l.dripAfter ?? 0),
                      isPublished: l.is_published !== false,
                      _persisted: l._persisted ?? looksPersistedId(l.id),
                    }))
                  : [],
              })),
            );
            setExpandedLessons(
              Object.fromEntries(curriculum.map((m: any) => [String(m.id), null])),
            );
          }

          // Handle resources if they exist
          if (Array.isArray(course.resources)) {
            setResources(
              course.resources.map((r: any) => ({
                id: r.id || getNewId(),
                label: r.label || r.title || "Resource",
                url: r.url || r.link || "#",
                type: r.type || "Link",
              })),
            );
          }

          toast.success("Course loaded successfully");
        } catch (error) {
          console.error("Error loading course:", error);
          toast.error("Failed to load course data");
        } finally {
          setLoadingCourse(false);
        }
      })();
    } catch {
      // ignore
    }
  }, []);

  // Load saved draft
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("bridge_skills_tutor_course_draft");
      if (!raw) return;
      const draft = JSON.parse(raw);
      setSavedDraft(draft ?? null);
      if (draft?.thumbnailUrl) setThumbnailUrl(String(draft.thumbnailUrl));
    } catch {
      // ignore draft parse errors
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isEdit) return; // Don't auto-save when editing existing course

    const draft = {
      title,
      slug,
      subtitle,
      description,
      courseTimeline,
      thumbnailUrl: thumbnailUrl.startsWith("blob:") ? "" : thumbnailUrl,
      categoryId,
      level,
      language,
      pricing,
      price,
      status,
      modules,
      outcomes,
      requirements,
      resources,
    };
    window.localStorage.setItem("bridge_skills_tutor_course_draft", JSON.stringify(draft));
  }, [
    title,
    slug,
    subtitle,
    description,
    courseTimeline,
    thumbnailUrl,
    categoryId,
    level,
    language,
    pricing,
    price,
    status,
    modules,
    outcomes,
    requirements,
    resources,
    isEdit,
  ]);

  useEffect(() => {
    if (typeof window === "undefined" || saving) return;
    const hasDraft = Boolean(
      title.trim() || description.trim() || modules.length || resources.length,
    );
    if (!hasDraft) return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [title, description, modules.length, resources.length, saving]);

  function slugify(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 64);
  }

  function getNewId() {
    return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10);
  }

  function handleAddModule() {
    const moduleId = `module-${getNewId()}`;
    setModules((prev) => [
      ...prev,
      {
        id: moduleId,
        title: "New module",
        description: "Describe what this module covers.",
        lessons: [],
        _persisted: false,
      },
    ]);
    setExpandedLessons((current) => ({ ...current, [moduleId]: null }));
    setStep(2);
  }

  function handleRemoveModule(index: number) {
    const module = modules[index];
    if (!module || !window.confirm(`Remove "${module.title}" and all of its lessons?`)) return;
    setModules((prev) => prev.filter((_, idx) => idx !== index));
    setExpandedLessons((current) => {
      const next = { ...current };
      delete next[module.id];
      return next;
    });
  }

  function handleUpdateModule(index: number, patch: Partial<BuilderModule>) {
    setModules((prev) =>
      prev.map((module, idx) => (idx === index ? { ...module, ...patch } : module)),
    );
  }

  function createLesson(
    title = "New lesson",
    type: BuilderLesson["type"] = "video",
  ): BuilderLesson {
    return {
      id: `lesson-${getNewId()}`,
      title,
      duration: "15 min",
      type,
      videoUrl: "",
      description: "",
      content: "",
      videoFile: "",
      pdfFile: "",
      audioFile: "",
      pptFile: "",
      thumbnail: "",
      subtitleVtt: "",
      xpReward: 10,
      isFree: false,
      isDrip: false,
      dripAfter: 0,
      isPublished: true,
      _persisted: false,
    };
  }

  function handleAddLesson(
    moduleIndex: number,
    lessonTitle?: string,
    lessonType?: BuilderLesson["type"],
  ) {
    const newLesson = createLesson(lessonTitle?.trim() || "New lesson", lessonType ?? "video");
    setModules((prev) =>
      prev.map((module, idx) =>
        idx === moduleIndex
          ? {
              ...module,
              lessons: [...module.lessons, newLesson],
            }
          : module,
      ),
    );
    setExpandedLessons((current) =>
      Object.fromEntries(Object.keys(current).map((moduleId) => [moduleId, null])),
    );
  }

  function toggleLesson(moduleId: string, lessonId: string) {
    setExpandedLessons((current) => ({
      ...current,
      [moduleId]: current[moduleId] === lessonId ? null : lessonId,
    }));
  }

  function updateQuickLesson(
    moduleId: string,
    patch: Partial<{ title: string; type: BuilderLesson["type"] }>,
  ) {
    setQuickLessonDrafts((current) => {
      const draft = current[moduleId] ?? { title: "", type: "video" as const };
      return {
        ...current,
        [moduleId]: { title: patch.title ?? draft.title, type: patch.type ?? draft.type },
      };
    });
  }

  function addQuickLesson(moduleIndex: number) {
    const module = modules[moduleIndex];
    const draft = quickLessonDrafts[module?.id ?? ""] ?? { title: "", type: "video" as const };
    if (!draft.title.trim()) return;
    handleAddLesson(moduleIndex, draft.title, draft.type);
    setQuickLessonDrafts((current) => ({ ...current, [module.id]: { title: "", type: "video" } }));
  }

  function handleUpdateLesson(
    moduleIndex: number,
    lessonIndex: number,
    patch: Partial<BuilderLesson>,
  ) {
    setModules((prev) =>
      prev.map((module, idx) =>
        idx === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.map((lesson, lessonIdx) =>
                lessonIdx === lessonIndex ? { ...lesson, ...patch } : lesson,
              ),
            }
          : module,
      ),
    );
  }

  function handleRemoveLesson(moduleIndex: number, lessonIndex: number) {
    setModules((prev) =>
      prev.map((module, idx) =>
        idx === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.filter((_, lessonIdx) => lessonIdx !== lessonIndex),
            }
          : module,
      ),
    );
    setExpandedLessons((current) => {
      const moduleId = modules[moduleIndex]?.id;
      if (moduleId && current[moduleId] === modules[moduleIndex]?.lessons[lessonIndex]?.id) {
        return { ...current, [moduleId]: null };
      }
      return current;
    });
  }

  function handleAddOutcome() {
    if (!newOutcome.trim()) return;
    setOutcomes((prev) => [...prev, newOutcome.trim()]);
    setNewOutcome("");
  }

  function handleAddRequirement() {
    if (!newRequirement.trim()) return;
    setRequirements((prev) => [...prev, newRequirement.trim()]);
    setNewRequirement("");
  }

  function handleRemoveOutcome(index: number) {
    setOutcomes((prev) => prev.filter((_, idx) => idx !== index));
  }

  function handleRemoveRequirement(index: number) {
    setRequirements((prev) => prev.filter((_, idx) => idx !== index));
  }

  function handleAddResource() {
    if (!newResourceLabel.trim() || !newResourceUrl.trim()) return;
    setResources((prev) => [
      ...prev,
      {
        id: `resource-${getNewId()}`,
        label: newResourceLabel.trim(),
        url: newResourceUrl.trim(),
        type: "Link",
      },
    ]);
    setNewResourceLabel("");
    setNewResourceUrl("");
  }

  function restoreDraft() {
    if (!savedDraft) return;
    const draft = savedDraft;
    if (draft?.title) setTitle(draft.title);
    if (draft?.slug) setSlug(draft.slug);
    if (draft?.subtitle) setSubtitle(draft.subtitle);
    if (draft?.description) setDescription(draft.description);
    if (draft?.categoryId) setCategoryId(draft.categoryId);
    if (draft?.level) setLevel(draft.level);
    if (draft?.language) setLanguage(draft.language);
    if (draft?.pricing) setPricing(draft.pricing);
    if (draft?.price) setPrice(draft.price);
    if (draft?.status) setStatus(draft.status);
    if (Array.isArray(draft?.modules)) setModules(draft.modules);
    if (Array.isArray(draft?.outcomes)) setOutcomes(draft.outcomes);
    if (Array.isArray(draft?.requirements)) setRequirements(draft.requirements);
    if (Array.isArray(draft?.resources)) setResources(draft.resources);
    try {
      window.localStorage.removeItem("bridge_skills_tutor_course_draft");
    } catch {}
    setSavedDraft(null);
    toast.success("Draft restored");
  }

  function discardDraft() {
    try {
      window.localStorage.removeItem("bridge_skills_tutor_course_draft");
    } catch {}
    setSavedDraft(null);
    toast.info("Draft discarded");
  }

  function handleRemoveResource(index: number) {
    setResources((prev) => prev.filter((_, idx) => idx !== index));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setError(null);
    setSaving(true);

    try {
      const newSlug = slug || slugify(title);

      // Validation
      if (!title.trim()) {
        throw new Error("Course title is required.");
      }
      if (!description.trim()) {
        throw new Error("Course description is required.");
      }
      if (!courseTimeline.trim()) {
        throw new Error("Total course timeline is required.");
      }
      if (modules.length === 0) {
        throw new Error("Add at least one module to build a complete course.");
      }
      const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
      if (totalLessons === 0) {
        throw new Error("Add at least one lesson to your curriculum.");
      }
      for (const module of modules) {
        for (const [lessonIndex, lesson] of module.lessons.entries()) {
          const message = validateLesson(lesson, normalizeLessonType(lesson.type));
          if (message)
            throw new Error(`Lesson ${lessonIndex + 1} in "${module.title}": ${message}`);
          const oversized = [
            lesson.videoFile,
            lesson.pdfFile,
            lesson.audioFile,
            lesson.pptFile,
            lesson.thumbnail,
            lesson.subtitleVtt,
          ]
            .map(oversizedUpload)
            .find(Boolean);
          if (oversized)
            throw new Error(
              `"${oversized.name}" is too large. Files must be smaller than 4 MB for this API.`,
            );
        }
      }
      const oversizedThumbnail = oversizedUpload(thumbnailFile ?? undefined);
      if (oversizedThumbnail)
        throw new Error(
          `"${oversizedThumbnail.name}" is too large. Files must be smaller than 4 MB for this API.`,
        );

      const payload = {
        title: title.trim(),
        slug: newSlug,
        subtitle: subtitle.trim() || undefined,
        description: description.trim(),
        duration: courseTimeline.trim() || undefined,
        thumbnail: thumbnailFile ?? undefined,
        category: categoryId ?? 1,
        level,
        language,
        status,
        pricing,
        price: pricing === "free" ? "0" : price.trim() || "0",
        outcomes: outcomes.length > 0 ? outcomes : undefined,
        requirements: requirements.length > 0 ? requirements : undefined,
      };

      let saved: any = null;

      if (isEdit) {
        // Update existing course
        const targetSlug = originalSlug ?? newSlug;
        saved = await patchCourse(targetSlug, payload);
        toast.success("Course updated successfully!");
      } else {
        // Create new course
        saved = await createCourse(payload);
        setIsEdit(true);
        setOriginalSlug(saved?.slug ?? newSlug);
        toast.success("Course created successfully!");
      }

      const storedThumbnail = resolveTutorMedia(
        saved?.thumbnail ?? saved?.thumbnail_url,
        "thumbnails",
      );
      if (storedThumbnail) {
        setThumbnailUrl(String(storedThumbnail));
        setThumbnailFile(null);
      }

      const courseSlug = saved?.slug ?? newSlug;
      const persistedModules: BuilderModule[] = [];
      for (const [moduleIndex, module] of modules.entries()) {
        const isPersistedModule = module._persisted ?? looksPersistedId(module.id);
        const data = {
          course: saved?.id,
          title: module.title.trim(),
          description: module.description.trim(),
          module_order: moduleIndex + 1,
          is_published: status === "published",
        };
        if (isPersistedModule) {
          await updateTutorModule(module.id, data);
          persistedModules.push({ ...module, id: String(module.id), _persisted: true });
          setModules([...persistedModules, ...modules.slice(moduleIndex + 1)]);
          continue;
        }
        const createdModule = await createTutorModule(courseSlug, data);
        const moduleId = String(createdModule?.id ?? createdModule?.module?.id ?? "");
        if (!moduleId) throw new Error(`Unable to create module "${module.title}".`);
        persistedModules.push({ ...module, id: moduleId, _persisted: true });
        setModules([...persistedModules, ...modules.slice(moduleIndex + 1)]);
      }
      setModules(persistedModules);

      const lessonPayloads = persistedModules.flatMap((module, moduleIndex) =>
        module.lessons.map((lesson, lessonIndex) => {
          const videoUrl = lesson.videoUrl?.trim() || "";
          const type = normalizeLessonType(lesson.type);
          return {
            id: lesson.id,
            _persisted: lesson._persisted ?? looksPersistedId(lesson.id),
            title: lesson.title.trim(),
            slug: lesson.slug || `${slugify(lesson.title)}-${moduleIndex + 1}-${lessonIndex + 1}`,
            type,
            // These database columns are non-null even for non-video lessons.
            video_url: videoUrl,
            video_source:
              videoUrl && /youtube\.com|youtu\.be/i.test(videoUrl) ? "youtube" : "upload",
            video_file: mediaPayload(lesson.videoFile),
            pdf_file: mediaPayload(lesson.pdfFile),
            audio_file: mediaPayload(lesson.audioFile),
            ppt_file: mediaPayload(lesson.pptFile),
            thumbnail: mediaPayload(lesson.thumbnail),
            subtitle_vtt: mediaPayload(lesson.subtitleVtt),
            // Preserve existing content/description instead of wiping them -
            // the builder UI doesn't expose fields to edit these, so blanking
            // them here would destroy real lesson content on every save.
            description: lesson.description ?? "",
            content: lesson.content ?? "",
            module: module.id,
            duration: lesson.duration ?? "15 min",
            xp_reward: Math.max(0, Number(lesson.xpReward ?? 10)),
            is_free: Boolean(lesson.isFree ?? (moduleIndex === 0 && lessonIndex === 0)),
            is_drip: Boolean(lesson.isDrip),
            drip_after: Math.max(0, Number(lesson.dripAfter ?? 0)),
            is_published: lesson.isPublished ?? status === "published",
            lesson_order: lessonIndex + 1,
          };
        }),
      );

      const reconciledModules = persistedModules.map((module) => ({
        ...module,
        lessons: [...module.lessons],
      }));
      for (const lesson of lessonPayloads) {
        const { id, _persisted, ...payload } = lesson;
        let persistedId = id;
        if (isEdit && _persisted) {
          await updateTutorLesson(id, payload);
        } else {
          const createdLesson = await createTutorLesson(courseSlug, payload);
          const lessonId = String(createdLesson?.id ?? createdLesson?.lesson?.id ?? "");
          if (!lessonId) throw new Error(`Unable to create lesson "${lesson.title}".`);
          persistedId = lessonId;
        }
        const module = reconciledModules.find((item) => item.id === String(lesson.module));
        const lessonIndex = module?.lessons.findIndex((item) => item.id === id) ?? -1;
        if (module && lessonIndex >= 0) {
          module.lessons[lessonIndex] = {
            ...module.lessons[lessonIndex],
            id: persistedId,
            _persisted: true,
          };
        }
        setModules(reconciledModules.map((item) => ({ ...item, lessons: [...item.lessons] })));
      }
      setModules(reconciledModules);

      if (isEdit) {
        const currentLessonIds = new Set(
          lessonPayloads.filter((lesson) => lesson._persisted).map((lesson) => String(lesson.id)),
        );
        await Promise.all(
          originalLessonIds
            .filter((id) => !currentLessonIds.has(id))
            .map((id) => deleteTutorLesson(id)),
        );
        const currentModuleIds = new Set(persistedModules.map((module) => String(module.id)));
        await Promise.all(
          originalModuleIds
            .filter((id) => !currentModuleIds.has(id))
            .map((id) => deleteTutorModule(id)),
        );
      }

      const categoryName = categories.find((item) => item.id === categoryId)?.name ?? "General";
      const savedCourse = {
        ...(saved ?? {}),
        ...payload,
        thumbnail: storedThumbnail ?? thumbnailUrl ?? "",
        duration: saved?.duration ?? courseTimeline,
        id: saved?.id ?? originalSlug ?? newSlug,
        slug: saved?.slug ?? newSlug,
        category:
          typeof saved?.category === "object"
            ? (saved.category?.name ?? categoryName)
            : (saved?.category ?? categoryName),
        modules: persistedModules,
        resources,
      };

      if (typeof window !== "undefined") {
        window.localStorage.setItem(savedCourseKey, JSON.stringify(savedCourse));
      }

      // Clear draft
      if (typeof window !== "undefined") {
        try {
          window.localStorage.removeItem("bridge_skills_tutor_course_draft");
        } catch {}
      }

      // Navigate to courses page
      navigate({ to: "/tutor/courses" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to save course.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  const getLessonTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      video: Video,
      text: FileText,
      quiz: FileQuestion,
      assignment: Briefcase,
      audio: Volume2,
      document: BookOpen,
    };
    return icons[type] || FileText;
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "published"
      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
      : "bg-amber-50 text-amber-600 border-amber-200";
  };

  const handleSetStep = (nextStep: number) => {
    setStep(Math.max(0, Math.min(steps.length - 1, nextStep)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
  const checklist = [
    {
      label: "Course basics",
      complete: Boolean(title.trim() && description.trim() && courseTimeline.trim()),
      step: 0,
    },
    { label: "Course thumbnail", complete: Boolean(thumbnailUrl), step: 0 },
    { label: "Learning outcomes", complete: outcomes.length > 0, step: 1 },
    { label: "Curriculum modules", complete: modules.length > 0, step: 2 },
    { label: "Course lessons", complete: totalLessons > 0, step: 2 },
    { label: "Ready to publish", complete: status === "published", step: 4 },
  ];
  const completionPercent = Math.round(
    (checklist.filter((item) => item.complete).length / checklist.length) * 100,
  );
  const stepCompletion = [
    Boolean(title.trim() && description.trim() && courseTimeline.trim()),
    outcomes.length > 0,
    modules.length > 0 && totalLessons > 0,
    resources.length > 0,
    status === "published",
  ];

  if (loadingCourse) {
    return (
      <div className="mx-auto max-w-[1440px] space-y-6 px-2 py-6 sm:px-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-28 w-full md:col-span-2" />
        </div>
      </div>
    );
  }

  return (
    <form
      className="tutor-builder-mobile-form mx-auto w-full max-w-[1440px] space-y-5 px-1 pb-24 sm:space-y-6 sm:px-2 lg:pb-8"
      onSubmit={handleSave}
    >
      <header className="sticky top-0 z-30 -mx-1 border-b border-border bg-background/95 px-1 py-3 backdrop-blur-md sm:-mx-2 sm:px-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">
              Tutor workspace <span className="mx-1.5">/</span>{" "}
              {isEdit ? "Course editor" : "Course builder"}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {isEdit ? "Edit course" : "Build a course"}
              </h1>
              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusBadgeColor(status)}`}
              >
                {status === "published" ? "Published" : "Draft"}
              </span>
            </div>
            <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
              {isEdit
                ? `Update your course${originalSlug ? ` · ${originalSlug}` : ""}`
                : "Plan your course, structure the curriculum, and prepare to publish."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground sm:inline-flex">
              <span
                className={`h-1.5 w-1.5 rounded-full ${saving ? "animate-pulse bg-amber-500" : "bg-primary"}`}
              />
              {saving ? "Saving course…" : "Draft workspace"}
            </span>
            {isEdit && (
              <span className="hidden rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground md:inline-flex">
                Editing course
              </span>
            )}
          </div>
        </div>

        {/* Draft Restore Banner - Only show for new courses */}
        {!isEdit && savedDraft && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Saved draft found</p>
                  <p className="text-xs text-muted-foreground">From a previous session</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={restoreDraft}
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:flex-none"
                >
                  Restore draft
                </button>
                <button
                  type="button"
                  onClick={discardDraft}
                  className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:flex-none"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
            <span>Course setup progress</span>
            <span>{completionPercent}% complete</span>
          </div>
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <nav aria-label="Course setup steps" className="flex gap-1 overflow-x-auto pb-1">
            {steps.map((s, i) => {
              const done = stepCompletion[i];
              const active = i === step;
              return (
                <button
                  key={s}
                  type="button"
                  aria-current={active ? "step" : undefined}
                  onClick={() => handleSetStep(i)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : done
                        ? "border-primary/20 bg-primary/5 text-primary"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                      active
                        ? "bg-white/20 text-white"
                        : done
                          ? "bg-primary text-primary-foreground"
                          : "border border-current/30"
                    }`}
                  >
                    {done ? <Check className="h-2 w-2 sm:h-3 sm:w-3" /> : i + 1}
                  </span>
                  <span>{s}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        {/* Left Column - Form Content */}
        <div className="card-surface min-w-0 space-y-6 p-4 sm:p-6 lg:p-7">
          {step === 0 ? (
            // Details Step
            <>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>
                  <p className="text-sm text-gray-500">
                    Capture the metadata learners need to discover your course
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5">
                    <span className="text-sm font-medium text-gray-700">Course Title *</span>
                    <input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="e.g. Networking fundamentals for engineers"
                    />
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-sm font-medium text-gray-700">Course Slug</span>
                    <input
                      value={slug}
                      onChange={(event) => setSlug(slugify(event.target.value))}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="networking-fundamentals"
                      disabled={isEdit}
                    />
                    {isEdit && (
                      <p className="text-xs text-gray-400">Slug cannot be changed when editing</p>
                    )}
                  </label>
                </div>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-gray-700">Subtitle</span>
                  <input
                    value={subtitle}
                    onChange={(event) => setSubtitle(event.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="A short supporting summary for the course"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-gray-700">Description *</span>
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                    placeholder="Write a short summary of what this course covers"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-gray-700">Total course timeline *</span>
                  <input
                    value={courseTimeline}
                    onChange={(event) => setCourseTimeline(event.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="e.g. 8 weeks or 24 hours"
                  />
                  <span className="text-xs text-gray-500">
                    This is the learner-facing course duration. Individual lessons do not need a
                    duration.
                  </span>
                </label>

                <div className="space-y-3">
                  <span className="text-sm font-medium text-gray-700">Course Thumbnail</span>
                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100">
                    <Upload className="h-4 w-4" />
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) => {
                        const file = event.target.files?.[0] ?? null;
                        if (!file) return;
                        setThumbnailFile(file);
                        setThumbnailUrl(URL.createObjectURL(file));
                      }}
                    />
                  </label>
                </div>
                {thumbnailUrl ? (
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                    <img
                      src={thumbnailUrl}
                      alt="Course thumbnail preview"
                      className="h-40 w-full object-cover"
                    />
                    <p className="px-3 py-2 text-xs text-gray-500">
                      {thumbnailFile?.name ?? "Current course thumbnail"}
                    </p>
                    {thumbnailFile && (
                      <p className="border-t border-gray-200 px-3 py-2 text-xs text-amber-700">
                        Uploaded to the course bucket when you save.
                      </p>
                    )}
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="space-y-1.5">
                    <span className="text-sm font-medium text-gray-700">Category</span>
                    <select
                      value={categoryId ?? ""}
                      onChange={(event) => setCategoryId(Number(event.target.value))}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-sm font-medium text-gray-700">Level</span>
                    <select
                      value={level}
                      onChange={(event) => setLevel(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-sm font-medium text-gray-700">Language</span>
                    <input
                      value={language}
                      onChange={(event) => setLanguage(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="English"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="space-y-1.5">
                    <span className="text-sm font-medium text-gray-700">Status</span>
                    <select
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-sm font-medium text-gray-700">Pricing</span>
                    <select
                      value={pricing}
                      onChange={(event) => setPricing(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="free">Free</option>
                      <option value="paid">Paid</option>
                    </select>
                  </label>

                  {pricing === "paid" && (
                    <label className="space-y-1.5">
                      <span className="text-sm font-medium text-gray-700">Price (UGX)</span>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="0"
                      />
                    </label>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
              </div>
            </>
          ) : step === 1 ? (
            // Outcomes & Requirements Step
            <>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Target className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Outcomes & Requirements</h3>
                  <p className="text-sm text-gray-500">
                    Define what learners will gain and what they need before starting
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Outcomes */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ListChecks className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-900">Learning Outcomes</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {outcomes.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {outcomes.map((outcome, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                      >
                        <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                        <span className="text-sm text-gray-700 flex-1">{outcome}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveOutcome(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input
                      value={newOutcome}
                      onChange={(event) => setNewOutcome(event.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddOutcome()}
                      className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Add a learning outcome"
                    />
                    <button
                      type="button"
                      onClick={handleAddOutcome}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Requirements */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Book className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-gray-900">Requirements</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {requirements.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {requirements.map((requirement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                      >
                        <span className="text-sm font-semibold text-purple-600">{index + 1}</span>
                        <span className="text-sm text-gray-700 flex-1">{requirement}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRequirement(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input
                      value={newRequirement}
                      onChange={(event) => setNewRequirement(event.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddRequirement()}
                      className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Add a requirement"
                    />
                    <button
                      type="button"
                      onClick={handleAddRequirement}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : step === 2 ? (
            // Curriculum Step
            <>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Book className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Curriculum</h3>
                  <p className="text-sm text-gray-500">
                    Add modules and lessons to structure the course
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {modules.map((module, moduleIndex) => (
                  <div
                    key={module.id}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            value={module.title}
                            onChange={(event) =>
                              handleUpdateModule(moduleIndex, { title: event.target.value })
                            }
                            className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1 text-base font-semibold text-gray-900 outline-none transition-colors hover:border-gray-200 focus:border-blue-500 focus:bg-white"
                            aria-label="Module title"
                          />
                          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                            {module.lessons.length}{" "}
                            {module.lessons.length === 1 ? "lesson" : "lessons"}
                          </span>
                        </div>
                        <textarea
                          value={module.description}
                          onChange={(event) =>
                            handleUpdateModule(moduleIndex, { description: event.target.value })
                          }
                          rows={1}
                          className="mt-1 w-full resize-y rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm text-gray-500 outline-none transition-colors hover:border-gray-200 focus:border-blue-500 focus:bg-white"
                          placeholder="Describe what this module covers"
                          aria-label="Module description"
                        />
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleAddLesson(moduleIndex)}
                          className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700"
                          aria-label={`Add lesson to ${module.title}`}
                          title="Add lesson"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveModule(moduleIndex)}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-600 transition-colors hover:bg-red-50"
                          aria-label={`Remove ${module.title}`}
                          title="Remove module"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {module.lessons.length === 0 && (
                        <p className="rounded-lg border border-dashed border-gray-200 px-3 py-4 text-center text-sm text-gray-500">
                          No lessons yet. Add one below.
                        </p>
                      )}
                      {module.lessons.map((lesson, lessonIndex) => {
                        const LessonIcon = getLessonTypeIcon(lesson.type);
                        const isExpanded = expandedLessons[module.id] === lesson.id;
                        return (
                          <div
                            key={lesson.id}
                            className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-shadow hover:shadow-sm"
                          >
                            <div
                              className={`flex items-center gap-2 p-2 ${isExpanded ? "bg-blue-50/60" : ""}`}
                            >
                              <button
                                type="button"
                                onClick={() => toggleLesson(module.id, lesson.id)}
                                className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-gray-500 transition-colors hover:bg-white hover:text-blue-600"
                                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${lesson.title}`}
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                              <LessonIcon className="h-4 w-4 shrink-0 text-blue-600" />
                              <input
                                value={lesson.title}
                                onChange={(event) =>
                                  handleUpdateLesson(moduleIndex, lessonIndex, {
                                    title: event.target.value,
                                  })
                                }
                                className="min-w-0 flex-1 bg-transparent px-1 py-1 text-sm font-medium text-gray-800 outline-none"
                                aria-label={`Lesson ${lessonIndex + 1} title`}
                              />
                              <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[11px] font-medium capitalize text-gray-600">
                                {lesson.type}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveLesson(moduleIndex, lessonIndex)}
                                className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                aria-label={`Remove ${lesson.title}`}
                                title="Remove lesson"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            {isExpanded && (
                              <div className="animate-in slide-in-from-top-2 border-t border-gray-200 bg-white p-4 duration-200">
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <LessonField
                                    label="Lesson title"
                                    value={lesson.title}
                                    placeholder="Lesson title"
                                    onChange={(value) =>
                                      handleUpdateLesson(moduleIndex, lessonIndex, { title: value })
                                    }
                                  />
                                  <label className="space-y-1">
                                    <span className="text-xs text-gray-500">Lesson type</span>
                                    <select
                                      value={lesson.type}
                                      onChange={(event) =>
                                        handleUpdateLesson(moduleIndex, lessonIndex, {
                                          type: normalizeLessonType(event.target.value),
                                        })
                                      }
                                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                      <option value="video">Video</option>
                                      <option value="text">Text / Article</option>
                                      <option value="audio">Audio</option>
                                      <option value="document">Document</option>
                                      <option value="quiz">Quiz</option>
                                      <option value="assignment">Assignment</option>
                                    </select>
                                  </label>
                                  <LessonField
                                    label="Duration"
                                    value={lesson.duration}
                                    placeholder="15 min"
                                    onChange={(value) =>
                                      handleUpdateLesson(moduleIndex, lessonIndex, {
                                        duration: value,
                                      })
                                    }
                                  />
                                  <LessonField
                                    label="Video URL"
                                    value={lesson.videoUrl}
                                    placeholder="https://youtube.com/..."
                                    onChange={(value) =>
                                      handleUpdateLesson(moduleIndex, lessonIndex, {
                                        videoUrl: value,
                                      })
                                    }
                                  />
                                  <label className="space-y-1 sm:col-span-2">
                                    <span className="text-xs text-gray-500">
                                      Description / content (HTML)
                                    </span>
                                    <textarea
                                      value={lesson.content ?? ""}
                                      onChange={(event) =>
                                        handleUpdateLesson(moduleIndex, lessonIndex, {
                                          content: event.target.value,
                                          description: event.target.value,
                                        })
                                      }
                                      rows={3}
                                      className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                      placeholder="Add lesson instructions, transcript, or notes"
                                    />
                                  </label>
                                  <LessonFileField
                                    label="Video file"
                                    value={lesson.videoFile}
                                    accept="video/*"
                                    onChange={(value) =>
                                      handleUpdateLesson(moduleIndex, lessonIndex, {
                                        videoFile: value,
                                      })
                                    }
                                  />
                                  <LessonFileField
                                    label="PDF file"
                                    value={lesson.pdfFile}
                                    accept=".pdf,application/pdf"
                                    onChange={(value) =>
                                      handleUpdateLesson(moduleIndex, lessonIndex, {
                                        pdfFile: value,
                                      })
                                    }
                                  />
                                  <LessonFileField
                                    label="Audio file"
                                    value={lesson.audioFile}
                                    accept="audio/*"
                                    onChange={(value) =>
                                      handleUpdateLesson(moduleIndex, lessonIndex, {
                                        audioFile: value,
                                      })
                                    }
                                  />
                                  <LessonFileField
                                    label="PowerPoint file"
                                    value={lesson.pptFile}
                                    accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                    onChange={(value) =>
                                      handleUpdateLesson(moduleIndex, lessonIndex, {
                                        pptFile: value,
                                      })
                                    }
                                  />
                                  <LessonFileField
                                    label="Lesson thumbnail"
                                    value={lesson.thumbnail}
                                    accept="image/*"
                                    onChange={(value) =>
                                      handleUpdateLesson(moduleIndex, lessonIndex, {
                                        thumbnail: value,
                                      })
                                    }
                                  />
                                  <LessonFileField
                                    label="Subtitles (VTT)"
                                    value={lesson.subtitleVtt}
                                    accept=".vtt,text/vtt"
                                    onChange={(value) =>
                                      handleUpdateLesson(moduleIndex, lessonIndex, {
                                        subtitleVtt: value,
                                      })
                                    }
                                  />
                                  <label className="flex flex-wrap items-center gap-2 text-xs text-gray-600 sm:col-span-2">
                                    <input
                                      type="checkbox"
                                      checked={lesson.isDrip ?? false}
                                      onChange={(event) =>
                                        handleUpdateLesson(moduleIndex, lessonIndex, {
                                          isDrip: event.target.checked,
                                        })
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                    />{" "}
                                    Release after enrollment day{" "}
                                    <input
                                      type="number"
                                      min="0"
                                      value={lesson.dripAfter ?? 0}
                                      onChange={(event) =>
                                        handleUpdateLesson(moduleIndex, lessonIndex, {
                                          dripAfter: Number(event.target.value),
                                        })
                                      }
                                      className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-sm"
                                    />
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 flex flex-col gap-2 rounded-lg border border-dashed border-blue-200 bg-blue-50/40 p-3 sm:flex-row">
                      <input
                        value={quickLessonDrafts[module.id]?.title ?? ""}
                        onChange={(event) =>
                          updateQuickLesson(module.id, { title: event.target.value })
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            addQuickLesson(moduleIndex);
                          }
                        }}
                        className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Quick-add lesson title"
                        aria-label="New lesson title"
                      />
                      <select
                        value={quickLessonDrafts[module.id]?.type ?? "video"}
                        onChange={(event) =>
                          updateQuickLesson(module.id, {
                            type: normalizeLessonType(event.target.value),
                          })
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        aria-label="New lesson type"
                      >
                        <option value="video">Video</option>
                        <option value="text">Text</option>
                        <option value="audio">Audio</option>
                        <option value="document">Document</option>
                        <option value="quiz">Quiz</option>
                        <option value="assignment">Assignment</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => addQuickLesson(moduleIndex)}
                        className="inline-flex items-center justify-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4" /> Add lesson
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddModule}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Module
                </button>
              </div>
            </>
          ) : step === 3 ? (
            // Resources Step
            <>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <LinkIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
                  <p className="text-sm text-gray-500">Attach supporting materials and links</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1">
                    <span className="text-sm font-medium text-gray-700">Resource Label</span>
                    <input
                      value={newResourceLabel}
                      onChange={(event) => setNewResourceLabel(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="e.g. Course Workbook"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-sm font-medium text-gray-700">URL</span>
                    <input
                      value={newResourceUrl}
                      onChange={(event) => setNewResourceUrl(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="https://..."
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleAddResource}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Add Resource
                </button>

                <div className="space-y-2">
                  {resources.map((resource, index) => (
                    <div
                      key={resource.id}
                      className="flex items-center justify-between gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{resource.label}</p>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-600 hover:underline truncate block"
                        >
                          {resource.url}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveResource(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Preview Step
            <>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                  <p className="text-sm text-gray-500">Review the course before saving</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadgeColor(status)}`}
                        >
                          {status === "published" ? "Published" : "Draft"}
                        </span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                          {pricing === "free"
                            ? "Free"
                            : `Paid • UGX ${Number(price).toLocaleString()}`}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mt-2">
                        {title || "Course Title"}
                      </h4>
                      <p className="text-sm text-gray-600">{subtitle || "Course subtitle"}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm font-medium text-gray-900">
                        {categories.find((item) => item.id === categoryId)?.name ?? "General"}
                      </p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Level</p>
                      <p className="text-sm font-medium text-gray-900">
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {description || "No description provided"}
                    </p>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="bg-white/80 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Modules</p>
                      <p className="text-lg font-bold text-gray-900">{modules.length}</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Lessons</p>
                      <p className="text-lg font-bold text-gray-900">
                        {modules.reduce((sum, m) => sum + m.lessons.length, 0)}
                      </p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Course timeline</p>
                      <p className="text-lg font-bold text-gray-900">{courseTimeline || "TBD"}</p>
                    </div>
                  </div>

                  {outcomes.length > 0 && (
                    <div className="mt-3 bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Learning Outcomes</p>
                      <ul className="mt-1 space-y-1">
                        {outcomes.slice(0, 3).map((outcome, i) => (
                          <li key={i} className="text-sm text-gray-600">
                            • {outcome}
                          </li>
                        ))}
                        {outcomes.length > 3 && (
                          <li className="text-sm text-gray-400">+ {outcomes.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 hidden flex-wrap items-center gap-3 border-t border-border pt-5 lg:flex">
            {step > 0 && (
              <button
                type="button"
                onClick={() => handleSetStep(step - 1)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            )}
            <span className="mx-auto hidden items-center gap-2 text-xs font-medium text-muted-foreground md:inline-flex">
              Step {step + 1} of {steps.length}
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              {steps[step]}
            </span>
            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={() => handleSetStep(step + 1)}
                className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Next step
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
            {step === steps.length - 1 && (
              <button
                type="submit"
                disabled={saving}
                className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    {isEdit ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isEdit ? "Update Course" : "Create Course"}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Summary */}
        <aside className="sticky top-36 hidden h-fit flex-col gap-4 xl:flex">
          <section className="card-surface p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Course overview
            </p>
            <div className="mt-3 flex items-start justify-between gap-3 border-b border-border pb-4">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-foreground">
                  {title || "Untitled course"}
                </h2>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                  {subtitle || "Add a subtitle to introduce your course."}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${pricing === "free" ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-700 dark:text-amber-300"}`}
              >
                {pricing === "free" ? "Free" : `UGX ${Number(price).toLocaleString()}`}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Modules", value: modules.length },
                { label: "Lessons", value: totalLessons },
                { label: "Timeline", value: courseTimeline || "—" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="min-w-0 rounded-xl bg-secondary/70 p-2.5 text-center"
                >
                  <p className="truncate text-[10px] text-muted-foreground">{item.label}</p>
                  <p className="mt-1 truncate text-sm font-semibold text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="card-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-foreground">Course checklist</h2>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {completionPercent}%
              </span>
            </div>
            <div className="mt-3 space-y-1">
              {checklist.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSetStep(item.step)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition hover:bg-secondary"
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${item.complete ? "bg-primary" : "bg-border"}`}
                  />
                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">
                    {item.label}
                  </span>
                  <span className="text-[10px] font-semibold text-muted-foreground">
                    {item.complete ? "Done" : "Add"}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={() => {
              handleAddModule();
              handleSetStep(2);
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
          >
            <Plus className="h-4 w-4" /> Add a module
          </button>
        </aside>
      </div>

      <div className="tutor-builder-mobile-actions fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-card/95 px-3 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md lg:hidden">
        {step > 0 && (
          <button
            type="button"
            onClick={() => handleSetStep(step - 1)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
        )}
        <span className="min-w-0 flex-1 truncate text-center text-[11px] font-medium text-muted-foreground">
          Step {step + 1} of {steps.length} · {steps[step]}
        </span>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => handleSetStep(step + 1)}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={saving}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isEdit ? "Update" : "Create"}
          </button>
        )}
      </div>
    </form>
  );
}

export default Builder;

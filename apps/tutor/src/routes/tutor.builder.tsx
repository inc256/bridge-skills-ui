// apps/tutor/src/routes/tutor/builder.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { 
  Check, 
  Plus, 
  Upload, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
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
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { createCourse, patchCourse, getCourse, getCourseModules, getCourseCategories, createTutorModule, updateTutorModule, createTutorLesson, updateTutorLesson, deleteTutorLesson, generateCourseDescription, generateCourseTitle } from "@/lib/api";

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
  type: string;
  videoUrl?: string;
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
  const [prompt, setPrompt] = useState("");
  const [titleSuggestion, setTitleSuggestion] = useState<string | null>(null);
  const [descriptionSuggestion, setDescriptionSuggestion] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
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
  const [isEdit, setIsEdit] = useState(false);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [savedDraft, setSavedDraft] = useState<any | null>(null);
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newOutcome, setNewOutcome] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newResourceLabel, setNewResourceLabel] = useState("");
  const [newResourceUrl, setNewResourceUrl] = useState("");
  const [resources, setResources] = useState<Array<{ id: string; label: string; url: string; type: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false);

  // Fallback heuristic for drafts saved before `_persisted` existed (e.g. an
  // old draft sitting in localStorage). Once every draft has gone through a
  // load/save cycle this can be removed - `_persisted` should always be set.
  function looksPersistedId(id: unknown) {
    return typeof id === "string" && id.length >= 20 && !id.startsWith("module-") && !id.startsWith("lesson-");
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
      if (!current || current === "new-course" || current === slugify(title) || current.startsWith("new-course")) {
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
          const course = { ...(serverCourse ?? {}), ...(savedCourse ?? {}) };
          const curriculum = Array.isArray(serverModules) && serverModules.length > 0
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
          if (course.thumbnail) setThumbnailUrl(String(course.thumbnail));
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
            setOriginalLessonIds(curriculum.flatMap((module: any) => Array.isArray(module.lessons)
              ? module.lessons
                  .filter((lesson: any) => (lesson._persisted ?? looksPersistedId(lesson.id)))
                  .map((lesson: any) => String(lesson.id))
              : []));
            setModules(curriculum.map((m: any) => ({
              id: m.id || getNewId(),
              title: m.title || "Module",
              description: m.description || "",
              _persisted: m._persisted ?? looksPersistedId(m.id),
              lessons: Array.isArray(m.lessons) ? m.lessons.map((l: any) => ({
                id: l.id || getNewId(),
                title: l.title || "Lesson",
                slug: l.slug || undefined,
                description: l.description ?? "",
                content: l.content ?? "",
                duration: l.duration || "15 min",
                type: l.type || "Video",
                videoUrl: l.video_url || l.videoUrl || "",
                _persisted: l._persisted ?? looksPersistedId(l.id),
              })) : []
            })));
          }
          
          // Handle resources if they exist
          if (Array.isArray(course.resources)) {
            setResources(course.resources.map((r: any) => ({
              id: r.id || getNewId(),
              label: r.label || r.title || "Resource",
              url: r.url || r.link || "#",
              type: r.type || "Link"
            })));
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
  }, [title, slug, subtitle, description, thumbnailUrl, categoryId, level, language, pricing, price, status, modules, outcomes, requirements, resources, isEdit]);

  function slugify(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 64);
  }

  async function handleGenerate() {
    setAiBusy(true);
    try {
      const [titleResponse, descriptionResponse] = await Promise.all([
        generateCourseTitle(prompt),
        generateCourseDescription(prompt),
      ]);
      setTitleSuggestion(titleResponse?.title ?? titleResponse?.suggestion ?? null);
      setDescriptionSuggestion(descriptionResponse?.description ?? descriptionResponse?.result ?? null);
    } finally {
      setAiBusy(false);
    }
  }

  function getNewId() {
    return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10);
  }

  function estimateDuration() {
    const total = modules.reduce((moduleSum, module) => {
      return moduleSum + module.lessons.reduce((lessonSum, lesson) => {
        if (typeof lesson.duration === "number" && Number.isFinite(lesson.duration)) {
          return lessonSum + Math.round(lesson.duration / 60);
        }
        const match = String(lesson.duration ?? "").match(/(\d+(?:\.\d+)?)\s*(h|m)?/i);
        if (!match) return lessonSum + 15;
        const value = Number(match[1]);
        return lessonSum + (match[2]?.toLowerCase() === "h" ? value * 60 : value);
      }, 0);
    }, 0);
    if (total === 0) return "TBD";
    if (total < 60) return `${total} min`;
    return `${Math.round(total / 60)}h ${total % 60}m`;
  }

  function handleAddModule() {
    setModules((prev) => [
      ...prev,
      {
        id: `module-${getNewId()}`,
        title: "New module",
        description: "Describe what this module covers.",
        lessons: [],
        _persisted: false,
      },
    ]);
    setStep(2);
  }

  function handleRemoveModule(index: number) {
    setModules((prev) => prev.filter((_, idx) => idx !== index));
  }

  function handleUpdateModule(index: number, patch: Partial<BuilderModule>) {
    setModules((prev) => prev.map((module, idx) => (idx === index ? { ...module, ...patch } : module)));
  }

  function handleAddLesson(moduleIndex: number) {
    setModules((prev) =>
      prev.map((module, idx) =>
        idx === moduleIndex
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: `lesson-${getNewId()}`,
                  title: "New lesson",
                  duration: "15 min",
                  type: "Video",
                  videoUrl: "",
                  description: "",
                  content: "",
                  _persisted: false,
                },
              ],
            }
          : module,
      ),
    );
  }

  function handleUpdateLesson(moduleIndex: number, lessonIndex: number, patch: Partial<BuilderLesson>) {
    setModules((prev) =>
      prev.map((module, idx) =>
        idx === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.map((lesson, lessonIdx) => (lessonIdx === lessonIndex ? { ...lesson, ...patch } : lesson)),
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

  function handleGenerateOutline() {
    if (!title.trim()) {
      setError("Set a course title first to generate an outline.");
      return;
    }

    setError(null);
    const base = title.trim();
    setModules([
      {
        id: `module-${getNewId()}`,
        title: `Introduction to ${base}`,
        description: `Set the stage with objectives and what learners will accomplish in this course.`,
        _persisted: false,
        lessons: [
          { id: `lesson-${getNewId()}`, title: `Why ${base} matters`, duration: "12 min", type: "Video", description: "", content: "", _persisted: false },
          { id: `lesson-${getNewId()}`, title: `Course overview and outcomes`, duration: "15 min", type: "Article", description: "", content: "", _persisted: false },
        ],
      },
      {
        id: `module-${getNewId()}`,
        title: `Core ${base} concepts`,
        description: `Bring together the main knowledge areas with clear examples and exercises.`,
        _persisted: false,
        lessons: [
          { id: `lesson-${getNewId()}`, title: `Core idea #1`, duration: "18 min", type: "Video", description: "", content: "", _persisted: false },
          { id: `lesson-${getNewId()}`, title: `Core idea #2`, duration: "18 min", type: "Video", description: "", content: "", _persisted: false },
        ],
      },
      {
        id: `module-${getNewId()}`,
        title: `Practice and assessment`,
        description: `Help learners apply skills through guided practice and review.`,
        _persisted: false,
        lessons: [
          { id: `lesson-${getNewId()}`, title: `Hands-on exercise`, duration: "25 min", type: "Project", description: "", content: "", _persisted: false },
          { id: `lesson-${getNewId()}`, title: `Final review`, duration: "10 min", type: "Quiz", description: "", content: "", _persisted: false },
        ],
      },
    ]);

    if (outcomes.length === 0) {
      setOutcomes([
        `Explain the fundamentals of ${base}`,
        `Apply core skills in realistic scenarios`,
      ]);
    }
    if (requirements.length === 0) {
      setRequirements([`Basic familiarity with the course topic`, `A browser and a willingness to practice`]);
    }
    setStep(2);
    toast.success("Outline generated");
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      if (modules.length === 0) {
        throw new Error("Add at least one module to build a complete course.");
      }
      const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
      if (totalLessons === 0) {
        throw new Error("Add at least one lesson to your curriculum.");
      }

      const payload = {
        title: title.trim(),
        slug: newSlug,
        subtitle: subtitle.trim() || undefined,
        description: description.trim(),
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
        toast.success("Course created successfully!");
      }

      const courseSlug = saved?.slug ?? newSlug;
      const persistedModules = await Promise.all(modules.map(async (module, moduleIndex) => {
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
          return { ...module, id: module.id, _persisted: true };
        }
        const createdModule = await createTutorModule(courseSlug, data);
        const moduleId = String(createdModule?.id ?? createdModule?.module?.id ?? "");
        if (!moduleId) throw new Error(`Unable to create module "${module.title}".`);
        return { ...module, id: moduleId, _persisted: true };
      }));

      const lessonPayloads = persistedModules.flatMap((module, moduleIndex) =>
        module.lessons.map((lesson, lessonIndex) => {
          const videoUrl = lesson.videoUrl?.trim() || "";
          const type = (() => {
            const type = lesson.type.toLowerCase();
            if (type === "article" || type === "reading") return "text";
            if (type === "project" || type === "live") return "assignment";
            return type;
          })();
          return {
          id: lesson.id,
          _persisted: lesson._persisted ?? looksPersistedId(lesson.id),
          title: lesson.title.trim(),
          slug: lesson.slug || `${slugify(lesson.title)}-${moduleIndex + 1}-${lessonIndex + 1}`,
          type,
          ...(videoUrl ? {
            video_url: videoUrl,
            video_source: /youtube\.com|youtu\.be/i.test(videoUrl) ? "youtube" : undefined,
          } : {}),
          // Preserve existing content/description instead of wiping them -
          // the builder UI doesn't expose fields to edit these, so blanking
          // them here would destroy real lesson content on every save.
          description: lesson.description ?? "",
          content: lesson.content ?? "",
          module: module.id,
          is_drip: false,
          drip_after: 0,
          duration: (() => {
            const value = String(lesson.duration ?? "").trim().toLowerCase();
            const hours = value.match(/(\d+(?:\.\d+)?)\s*h/);
            const minutes = value.match(/(\d+(?:\.\d+)?)\s*m/);
            if (hours || minutes) {
              return Math.round((hours ? Number(hours[1]) * 3600 : 0) + (minutes ? Number(minutes[1]) * 60 : 0));
            }
            return Number.parseInt(value, 10) || 0;
          })(),
          xp_reward: 10,
          is_free: moduleIndex === 0 && lessonIndex === 0,
          is_published: status === "published",
          lesson_order: lessonIndex + 1,
          };
        }),
      );

      await Promise.all(lessonPayloads.map(async (lesson) => {
        const { id, _persisted, ...payload } = lesson;
        if (isEdit && _persisted) {
          await updateTutorLesson(id, payload);
        } else {
          await createTutorLesson(courseSlug, payload);
        }
      }));

      if (isEdit) {
        const currentLessonIds = new Set(
          lessonPayloads
            .filter((lesson) => lesson._persisted)
            .map((lesson) => String(lesson.id)),
        );
        await Promise.all(
          originalLessonIds
            .filter((id) => !currentLessonIds.has(id))
            .map((id) => deleteTutorLesson(id)),
        );
      }

      const categoryName = categories.find((item) => item.id === categoryId)?.name ?? "General";
      const savedCourse = {
        ...(saved ?? {}),
        ...payload,
        thumbnail: saved?.thumbnail ?? "",
        id: saved?.id ?? originalSlug ?? newSlug,
        slug: saved?.slug ?? newSlug,
        category: typeof saved?.category === "object" ? saved.category?.name ?? categoryName : saved?.category ?? categoryName,
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
      Video: Video,
      Article: FileText,
      Quiz: FileQuestion,
      Project: Briefcase,
    };
    return icons[type] || FileText;
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "published" 
      ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
      : "bg-amber-50 text-amber-600 border-amber-200";
  };

  if (loadingCourse) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading course data...</p>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto" onSubmit={handleSave}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {isEdit ? "Edit Course" : "Course Builder"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEdit ? "Update your course details and curriculum" : "Design your curriculum step by step and publish a new course"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
              Editing: {originalSlug}
            </span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(status)}`}>
            {status === "published" ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* Draft Restore Banner - Only show for new courses */}
      {!isEdit && savedDraft && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Saved draft found</p>
                <p className="text-xs text-gray-500">From a previous session</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                type="button" 
                onClick={restoreDraft} 
                className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Restore draft
              </button>
              <button 
                type="button" 
                onClick={discardDraft} 
                className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stepper */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-1">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={s} className="flex-1 min-w-[80px] sm:min-w-[120px]">
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className={`flex w-full items-center gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-medium transition-colors ${
                    active 
                      ? "bg-blue-600 text-white" 
                      : done 
                        ? "bg-blue-50 text-blue-600" 
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <span className={`grid h-4 w-4 sm:h-5 sm:w-5 shrink-0 place-items-center rounded-full text-[8px] sm:text-[10px] font-bold ${
                    active 
                      ? "bg-white/20 text-white" 
                      : done 
                        ? "bg-blue-600 text-white" 
                        : "border border-gray-300 text-gray-400"
                  }`}>
                    {done ? <Check className="h-2 w-2 sm:h-3 sm:w-3" /> : i + 1}
                  </span>
                  <span className="truncate">{s}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Left Column - Form Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-6">
          {step === 0 ? (
            // Details Step
            <>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>
                  <p className="text-sm text-gray-500">Capture the metadata learners need to discover your course</p>
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
                    <img src={thumbnailUrl} alt="Course thumbnail preview" className="h-40 w-full object-cover" />
                    <p className="px-3 py-2 text-xs text-gray-500">{thumbnailFile?.name ?? "Current course thumbnail"}</p>
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

                {/* AI Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-900">AI Assistant</span>
                  </div>
                  <label className="space-y-1.5">
                    <span className="text-sm text-gray-600">Describe your course topic</span>
                    <input
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="e.g. A beginner course on cybersecurity fundamentals"
                    />
                  </label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => void handleGenerate()}
                      disabled={aiBusy}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      {aiBusy ? "Generating..." : "Generate Suggestions"}
                    </button>
                    <button
                      type="button"
                      onClick={handleGenerateOutline}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Generate Outline
                    </button>
                  </div>

                  {(titleSuggestion || descriptionSuggestion) && (
                    <div className="mt-3 space-y-2">
                      {titleSuggestion && (
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs text-gray-500">Suggested Title</p>
                              <p className="text-sm font-medium text-gray-900">{titleSuggestion}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setTitle(titleSuggestion)}
                              className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              Use
                            </button>
                          </div>
                        </div>
                      )}
                      {descriptionSuggestion && (
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">Suggested Description</p>
                              <p className="text-sm text-gray-600">{descriptionSuggestion}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setDescription(descriptionSuggestion)}
                              className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                            >
                              Use
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
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
                  <p className="text-sm text-gray-500">Define what learners will gain and what they need before starting</p>
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
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{outcomes.length}</span>
                  </div>
                  <div className="space-y-2">
                    {outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
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
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{requirements.length}</span>
                  </div>
                  <div className="space-y-2">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
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
                  <p className="text-sm text-gray-500">Add modules and lessons to structure the course</p>
                </div>
              </div>

              <div className="space-y-4">
                {modules.map((module, moduleIndex) => (
                  <div key={module.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <label className="space-y-1">
                          <span className="text-sm font-medium text-gray-700">Module Title</span>
                          <input
                            value={module.title}
                            onChange={(event) => handleUpdateModule(moduleIndex, { title: event.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          />
                        </label>
                        <label className="space-y-1">
                          <span className="text-sm font-medium text-gray-700">Module Description</span>
                          <textarea
                            value={module.description}
                            onChange={(event) => handleUpdateModule(moduleIndex, { description: event.target.value })}
                            rows={2}
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                          />
                        </label>
                      </div>
                      <div className="flex lg:flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddLesson(moduleIndex)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          + Lesson
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveModule(moduleIndex)}
                          className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const LessonIcon = getLessonTypeIcon(lesson.type);
                        return (
                          <div key={lesson.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-2">
                                <LessonIcon className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-gray-700">Lesson {lessonIndex + 1}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveLesson(moduleIndex, lessonIndex)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <label className="space-y-1">
                                <span className="text-xs text-gray-500">Title</span>
                                <input
                                  value={lesson.title}
                                  onChange={(event) => handleUpdateLesson(moduleIndex, lessonIndex, { title: event.target.value })}
                                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                              </label>
                              <label className="space-y-1">
                                <span className="text-xs text-gray-500">Duration</span>
                                <input
                                  value={lesson.duration}
                                  onChange={(event) => handleUpdateLesson(moduleIndex, lessonIndex, { duration: event.target.value })}
                                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                              </label>
                              <label className="space-y-1">
                                <span className="text-xs text-gray-500">Type</span>
                                <select
                                  value={lesson.type}
                                  onChange={(event) => handleUpdateLesson(moduleIndex, lessonIndex, { type: event.target.value })}
                                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                >
                                  <option value="Video">Video</option>
                                  <option value="Article">Article</option>
                                  <option value="Quiz">Quiz</option>
                                  <option value="Project">Project</option>
                                </select>
                              </label>
                              <label className="space-y-1">
                                <span className="text-xs text-gray-500">Video URL</span>
                                <input
                                  value={(lesson as any).videoUrl ?? ""}
                                  onChange={(event) => handleUpdateLesson(moduleIndex, lessonIndex, { videoUrl: event.target.value })}
                                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                  placeholder="https://..."
                                />
                              </label>
                            </div>
                          </div>
                        );
                      })}
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
                    <div key={resource.id} className="flex items-center justify-between gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{resource.label}</p>
                        <a href={resource.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate block">
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
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadgeColor(status)}`}>
                          {status === "published" ? "Published" : "Draft"}
                        </span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                          {pricing === "free" ? "Free" : `Paid • UGX ${Number(price).toLocaleString()}`}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mt-2">{title || "Course Title"}</h4>
                      <p className="text-sm text-gray-600">{subtitle || "Course subtitle"}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm font-medium text-gray-900">{categories.find((item) => item.id === categoryId)?.name ?? "General"}</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Level</p>
                      <p className="text-sm font-medium text-gray-900">{level.charAt(0).toUpperCase() + level.slice(1)}</p>
                    </div>
                  </div>

                  <div className="mt-3 bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-sm text-gray-600 mt-1">{description || "No description provided"}</p>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="bg-white/80 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Modules</p>
                      <p className="text-lg font-bold text-gray-900">{modules.length}</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Lessons</p>
                      <p className="text-lg font-bold text-gray-900">{modules.reduce((sum, m) => sum + m.lessons.length, 0)}</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-lg font-bold text-gray-900">{estimateDuration()}</p>
                    </div>
                  </div>

                  {outcomes.length > 0 && (
                    <div className="mt-3 bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Learning Outcomes</p>
                      <ul className="mt-1 space-y-1">
                        {outcomes.slice(0, 3).map((outcome, i) => (
                          <li key={i} className="text-sm text-gray-600">• {outcome}</li>
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
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1 ml-auto"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            {step === steps.length - 1 && (
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ml-auto disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {isEdit ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {isEdit ? "Update Course" : "Create Course"}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4 h-fit sticky top-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Draft Summary</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-semibold text-gray-900">{status === "published" ? "Published" : "Draft"}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${pricing === "free" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                  {pricing === "free" ? "Free" : `UGX ${Number(price).toLocaleString()}`}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-900">{title || "Untitled Course"}</p>
                <p className="text-xs text-gray-500">{subtitle || "No subtitle"}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500">Modules</p>
                <p className="text-lg font-bold text-gray-900">{modules.length}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500">Lessons</p>
                <p className="text-lg font-bold text-gray-900">{modules.reduce((sum, m) => sum + m.lessons.length, 0)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-lg font-bold text-gray-900">{estimateDuration()}</p>
              </div>
            </div>

            {modules.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">Latest Modules</p>
                <div className="space-y-2">
                  {modules.slice(0, 3).map((module) => (
                    <div key={module.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 truncate">{module.title}</span>
                      <span className="text-xs text-gray-400">{module.lessons.length} lessons</span>
                    </div>
                  ))}
                  {modules.length > 3 && (
                    <p className="text-xs text-gray-400">+ {modules.length - 3} more modules</p>
                  )}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleAddModule}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Add Module
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Builder;
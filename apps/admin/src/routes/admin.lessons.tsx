import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { 
  Plus, Edit2, Trash2, RefreshCw, X, Video, FileText, HelpCircle, 
  UploadCloud, BookOpen, Search, CheckCircle, Gift,
  Layers, ChevronDown, ChevronUp, Filter, Volume2
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/lessons")({
  component: AdminLessons,
});

// ===================== TYPES =====================

interface Course {
  id: string;
  slug: string;
  title: string;
  description?: string;
  total_lessons?: number;
  is_published?: boolean;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'audio' | 'document' | 'quiz' | 'assignment';
  video_url?: string;
  video_file?: string;
  pdf_file?: string;
  audio_file?: string;
  ppt_file?: string;
  thumbnail?: string;
  subtitle_vtt?: string;
  video_source?: string;
  description?: string;
  content?: string;
  xp_reward: number;
  is_free: boolean;
  is_published: boolean;
  lesson_order?: number;
  duration: number;
  created_at?: string;
  updated_at?: string;
}

interface LessonFormData {
  title: string;
  type: 'video' | 'text' | 'audio' | 'document' | 'quiz' | 'assignment';
  video_url: string;
  video_file: string;
  pdf_file: string;
  audio_file: string;
  ppt_file: string;
  thumbnail: string;
  subtitle_vtt: string;
  video_source: string;
  description: string;
  content: string;
  xp_reward: number;
  is_free: boolean;
  is_published: boolean;
  is_drip: boolean;
  drip_after: number;
  lesson_order: string;
  duration: number;
}

interface Toast {
  msg: string;
  ok: boolean;
}

// ===================== API FUNCTIONS =====================

// Now using the authenticated apiRequest from lib/api.ts
async function getCourses(): Promise<Course[]> {
  try {
    const data = await apiRequest<any>('/courses/');
    return data?.results || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

async function getLessonsForCourse(courseSlug: string): Promise<Lesson[]> {
  try {
    const data = await apiRequest<any>(`/lessons/admin/course/${courseSlug}/`);
    return data?.results || data || [];
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
}

async function createLesson(courseSlug: string, data: Partial<LessonFormData>): Promise<Lesson> {
  return apiRequest<Lesson>(`/lessons/admin/course/${courseSlug}/`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function updateLesson(lessonId: string, data: Partial<LessonFormData>): Promise<Lesson> {
  return apiRequest<Lesson>(`/lessons/admin/${lessonId}/`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

async function deleteLesson(lessonId: string): Promise<void> {
  return apiRequest<void>(`/lessons/admin/${lessonId}/`, {
    method: 'DELETE'
  });
}

// ===================== COMPONENTS =====================

// Modal Component
interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 mt-auto sm:mt-0">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10 rounded-t-2xl">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  color?: string;
  iconColor?: string;
}

function StatCard({ icon: Icon, value, label, color = "blue", iconColor = "blue" }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`p-2 sm:p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`}>
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${iconColor}-600 dark:text-${iconColor}-400`} />
        </div>
        <div className="min-w-0">
          <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

// Lesson Type Icon
const TYPE_ICONS: Record<string, React.ReactNode> = {
  video: <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
  text: <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
  audio: <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
  document: <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
  quiz: <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
  assignment: <UploadCloud className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
};

const TYPE_COLORS: Record<string, string> = {
  video: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  text: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  quiz: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  assignment: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
};

const BLANK: LessonFormData = {
  title: '',
  type: 'video',
  video_url: '',
  video_file: '',
  pdf_file: '',
  audio_file: '',
  ppt_file: '',
  thumbnail: '',
  subtitle_vtt: '',
  video_source: 'youtube',
  description: '',
  content: '',
  xp_reward: 10,
  is_free: false,
  is_published: true,
  is_drip: false,
  drip_after: 0,
  lesson_order: '',
  duration: 0
};

// ===================== MAIN COMPONENT =====================

function AdminLessons() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selCourse, setSelCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [modal, setModal] = useState<'form' | null>(null);
  const [form, setForm] = useState<LessonFormData>(BLANK);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [courseSearch, setCourseSearch] = useState('');
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const showToast = (msg: string, ok: boolean = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  // Load courses on mount
  useEffect(() => {
    setLoadingCourses(true);
    getCourses()
      .then(results => {
        setCourses(results);
        // Auto-select first course if available
        if (results.length > 0) {
          setSelCourse(results[0]);
          loadLessons(results[0]);
        }
      })
      .catch((err) => {
        console.error('Failed to load courses:', err);
        showToast('Failed to load courses. Please check your authentication.', false);
      })
      .finally(() => setLoadingCourses(false));
  }, []);

  // Load lessons when course is selected
  const loadLessons = useCallback(async (course: Course) => {
    if (!course) return;
    setBusy(true);
    try {
      const results = await getLessonsForCourse(course.slug);
      setLessons(results);
    } catch (error: any) {
      console.error('Error loading lessons:', error);
      showToast(error.message || 'Failed to load lessons', false);
    } finally {
      setBusy(false);
    }
  }, []);

  const pickCourse = (course: Course) => {
    setSelCourse(course);
    loadLessons(course);
    setSearchTerm('');
    setCourseSearch('');
    setShowCourseDropdown(false);
  };

  const openAdd = () => {
    setForm(BLANK);
    setEditId(null);
    setModal('form');
  };

  const openEdit = (lesson: Lesson) => {
    setForm({
      title: lesson.title,
      type: lesson.type,
      video_url: lesson.video_url || '',
      video_file: lesson.video_file || '',
      pdf_file: lesson.pdf_file || '',
      audio_file: lesson.audio_file || '',
      ppt_file: lesson.ppt_file || '',
      thumbnail: lesson.thumbnail || '',
      subtitle_vtt: lesson.subtitle_vtt || '',
      video_source: lesson.video_source || 'youtube',
      description: lesson.description || '',
      content: lesson.content || '',
      xp_reward: lesson.xp_reward,
      is_free: lesson.is_free,
      is_published: lesson.is_published,
      is_drip: Boolean((lesson as any).is_drip),
      drip_after: Number((lesson as any).drip_after || 0),
      lesson_order: lesson.lesson_order?.toString() || '',
      duration: lesson.duration
    });
    setEditId(lesson.id);
    setModal('form');
  };

  const saveLesson = async () => {
    if (!form.title.trim()) {
      showToast('Title required', false);
      return;
    }
    if (!selCourse) {
      showToast('Please select a course first', false);
      return;
    }
    const has = (value: string) => Boolean(value.trim());
    if ((form.type === 'text' || form.type === 'assignment' || form.type === 'quiz') && !has(form.content)) {
      showToast(`${form.type} lessons require content`, false);
      return;
    }
    if (form.type === 'video' && !has(form.video_url) && !has(form.video_file)) {
      showToast('Video lessons require a video URL or file', false);
      return;
    }
    if (form.type === 'audio' && !has(form.audio_file)) {
      showToast('Audio lessons require an audio file', false);
      return;
    }
    if (form.type === 'document' && !has(form.pdf_file) && !has(form.ppt_file)) {
      showToast('Document lessons require a PDF or PowerPoint file', false);
      return;
    }

    setSaving(true);
    try {
      const body: any = {
        ...form,
        xp_reward: parseInt(form.xp_reward as any) || 10,
        duration: parseInt(form.duration as any) || 0,
        lesson_order: form.lesson_order ? parseInt(form.lesson_order) : undefined
      };
      
      if (editId) {
        await updateLesson(editId, body);
        showToast('Lesson updated successfully!');
      } else {
        await createLesson(selCourse.slug, body);
        showToast('Lesson created successfully!');
      }
      setModal(null);
      loadLessons(selCourse);
    } catch (ex: any) {
      showToast(ex.message || 'Failed to save lesson', false);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLesson = async (lesson: Lesson) => {
    if (!window.confirm(`Delete "${lesson.title}"?`)) return;
    try {
      await deleteLesson(lesson.id);
      showToast('Lesson deleted successfully!');
      if (selCourse) loadLessons(selCourse);
    } catch (error: any) {
      showToast(error.message || 'Failed to delete lesson', false);
    }
  };

  const handleChange = (key: keyof LessonFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(p => ({ ...p, [key]: value }));
  };

  const formatDuration = (seconds: number): string => {
    if (!seconds) return '—';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  // Filter lessons by search
  const filteredLessons = lessons.filter(l =>
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter courses for dropdown
  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(courseSearch.toLowerCase())
  );

  // Calculate stats
  const totalLessons = lessons.length;
  const publishedLessons = lessons.filter(l => l.is_published).length;
  const freeLessons = lessons.filter(l => l.is_free).length;

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-0">
      {/* Toast Notification */}
      {toast && (
        <div className={`
          fixed top-4 sm:top-6 left-4 right-4 sm:left-auto sm:right-6 z-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white text-xs sm:text-sm font-medium shadow-lg
          ${toast.ok ? 'bg-green-500' : 'bg-red-500'}
          animate-slide-in
        `}>
          <div className="flex items-center gap-2">
            <span className="flex-1">{toast.msg}</span>
            <button onClick={() => setToast(null)} className="text-white/80 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Lessons</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            Manage lessons for your courses
          </p>
        </div>
        {selCourse && (
          <button
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm w-full xs:w-auto"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Add Lesson</span>
          </button>
        )}
      </div>

      {/* Stats Row - Only show when course is selected */}
      {selCourse && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <StatCard icon={Layers} value={totalLessons} label="Total Lessons" color="blue" iconColor="blue" />
          <StatCard icon={CheckCircle} value={publishedLessons} label="Published" color="green" iconColor="green" />
          <StatCard icon={Gift} value={freeLessons} label="Free Lessons" color="purple" iconColor="purple" />
        </div>
      )}

      {/* Course Selector - Modern Professional Design with Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Select Course</h3>
              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {courses.length} available
              </span>
            </div>
            {selCourse && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {lessons.length} lessons in selected course
              </span>
            )}
          </div>
        </div>
        
        <div className="p-3 sm:p-4">
          {loadingCourses ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-6">
              <BookOpen className="h-8 w-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No courses available</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Create a course first to manage lessons</p>
            </div>
          ) : (
            <>
              {/* Course Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={courseSearch}
                  onChange={(e) => {
                    setCourseSearch(e.target.value);
                    setShowCourseDropdown(true);
                  }}
                  onFocus={() => setShowCourseDropdown(true)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                {courseSearch && (
                  <button
                    onClick={() => setCourseSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Course Grid - Scrollable */}
              <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                  {filteredCourses.length === 0 ? (
                    <div className="col-span-full text-center py-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">No courses match your search</p>
                    </div>
                  ) : (
                    filteredCourses.map((course) => {
                      const isSelected = selCourse?.id === course.id;
                      
                      return (
                        <button
                          key={course.id}
                          onClick={() => pickCourse(course)}
                          className={`
                            group relative p-3 rounded-xl text-left transition-all duration-200
                            ${isSelected 
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 dark:border-blue-400 shadow-sm' 
                              : 'bg-gray-50 dark:bg-gray-700/30 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-sm'
                            }
                          `}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className={`
                                text-sm font-medium truncate
                                ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}
                              `}>
                                {course.title}
                              </p>
                              {isSelected && (
                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                                  {lessons.length} lessons
                                </p>
                              )}
                            </div>
                            {isSelected && (
                              <div className="shrink-0">
                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                  <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                          {!isSelected && (
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-r from-blue-500/5 to-transparent" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Show count of filtered courses */}
              {filteredCourses.length < courses.length && courseSearch && (
                <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  Showing {filteredCourses.length} of {courses.length} courses
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lessons List */}
      {selCourse ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* List Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-white">
                {selCourse.title}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {lessons.length} lessons
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-40 md:w-48 pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => selCourse && loadLessons(selCourse)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
                title="Refresh"
              >
                <RefreshCw className={`h-4 w-4 ${busy ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Lessons Content */}
          {busy ? (
            <div className="flex justify-center py-10 sm:py-16">
              <PageSkeleton rows={5} />
            </div>
          ) : filteredLessons.length === 0 ? (
            <div className="py-10 sm:py-16 text-center">
              <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {searchTerm ? 'No lessons match your search' : 'No lessons yet'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {searchTerm ? 'Try a different search term' : 'Click "Add Lesson" to create the first one'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredLessons.map((lesson) => (
                <div key={lesson.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4">
                    {/* Order Number */}
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 min-w-[24px] sm:min-w-[28px] text-center">
                      {lesson.lesson_order || '—'}
                    </span>

                    {/* Type Icon */}
                    <div className={`p-1.5 sm:p-2 rounded-lg ${TYPE_COLORS[lesson.type] || TYPE_COLORS.video}`}>
                      {TYPE_ICONS[lesson.type] || TYPE_ICONS.video}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {lesson.title}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {lesson.is_free && (
                            <span className="text-[8px] sm:text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                              FREE
                            </span>
                          )}
                          {!lesson.is_published && (
                            <span className="text-[8px] sm:text-[10px] font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded">
                              DRAFT
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                        <span className="capitalize">{lesson.type}</span>
                        <span className="hidden xs:inline">·</span>
                        <span className="hidden xs:inline">{formatDuration(lesson.duration)}</span>
                        <span className="hidden xs:inline">·</span>
                        <span className="hidden xs:inline">{lesson.xp_reward} XP</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <button
                        onClick={() => openEdit(lesson)}
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLesson(lesson)}
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer with count */}
          {!busy && filteredLessons.length > 0 && (
            <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium">{filteredLessons.length}</span> of <span className="font-medium">{lessons.length}</span> lessons
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm">
          <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-base font-medium text-gray-700 dark:text-gray-300">Select a course to manage lessons</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose a course from the list above to view and manage its lessons
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal === 'form' && (
        <Modal title={editId ? 'Edit Lesson' : 'New Lesson'} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Lesson Title <span className="text-red-500">*</span>
              </label>
              <input
                value={form.title}
                onChange={handleChange('title')}
                placeholder="e.g. Introduction to Networking"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Type and Video Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
                <select
                  value={form.type}
                  onChange={handleChange('type')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="video">Video</option>
                  <option value="text">Text</option>
                  <option value="audio">Audio</option>
                  <option value="document">Document</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Video Source</label>
                <select
                  value={form.video_source}
                  onChange={handleChange('video_source')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                  <option value="upload">Upload</option>
                </select>
              </div>
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Video URL</label>
              <input
                value={form.video_url}
                onChange={handleChange('video_url')}
                placeholder="https://youtu.be/..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(['video_file', 'audio_file', 'pdf_file', 'ppt_file', 'thumbnail', 'subtitle_vtt'] as const).map((key) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{key.replace('_', ' ')}</label>
                  <input value={form[key]} onChange={handleChange(key)} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={handleChange('description')}
                rows={2}
                placeholder="Brief description of the lesson..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>

            {/* Content (for text type) */}
            {(['text', 'assignment', 'quiz'].includes(form.type)) && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Content (HTML)</label>
                <textarea
                  value={form.content}
                  onChange={handleChange('content')}
                  rows={4}
                  placeholder="<p>Write your lesson content here...</p>"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                />
              </div>
            )}

            {/* Order, Duration, XP */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Order</label>
                <input
                  type="number"
                  value={form.lesson_order}
                  onChange={handleChange('lesson_order')}
                  placeholder="auto"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Duration (sec)</label>
                <input
                  type="number"
                  value={form.duration}
                  onChange={handleChange('duration')}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">XP Reward</label>
                <input
                  type="number"
                  value={form.xp_reward}
                  onChange={handleChange('xp_reward')}
                  placeholder="10"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_free}
                  onChange={handleChange('is_free')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Free preview
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={handleChange('is_published')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Published
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2 justify-end">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveLesson}
                disabled={saving}
                className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                  saving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                {saving ? 'Saving...' : (editId ? 'Update Lesson' : 'Create Lesson')}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Custom CSS for animations and scrollbar */}
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
        .border-3 {
          border-width: 3px;
        }

        /* Custom scrollbar for course selector */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
}
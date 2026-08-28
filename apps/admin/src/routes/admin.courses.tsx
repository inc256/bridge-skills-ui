import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { 
  Check, Archive, Star, MoreHorizontal, Plus, Search, Edit2, Trash2, RefreshCw, X, BookOpen,
  Users, Award, Clock, TrendingUp, Filter, Eye, EyeOff,
  Tag, DollarSign, GraduationCap, Layers, Calendar, AlertCircle
} from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { apiRequest as sharedApiRequest, getCategories } from "@/lib/api";

export const Route = createFileRoute("/admin/courses")({
  component: AdminCourses,
});

// ===================== TYPES =====================

interface Category {
  id: string;
  name: string;
  slug?: string;
}

interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  category: string;
  category_id: string;
  language?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published' | 'archived' | 'pending' | 'in_review';
  pricing: 'free' | 'paid' | 'subscription';
  price: string | number;
  total_students: number;
  total_lessons: number;
  avg_rating: number;
  is_featured: boolean;
  description: string;
  subtitle: string;
  has_certificate: boolean;
  created_at: string;
  updated_at: string;
}

interface Toast {
  msg: string;
  ok: boolean;
}

interface CourseForm {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  pricing: 'free' | 'paid' | 'subscription';
  price: string;
  language: string;
  status: 'draft' | 'published' | 'archived' | 'pending';
  has_certificate: boolean;
  category: string;
}

// ===================== API FUNCTIONS =====================

async function apiRequest<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  return sharedApiRequest<T>(path, options);
}

async function getFullCourses(): Promise<Course[]> {
  try {
    const data = await apiRequest<any>('/courses/');
    const list = Array.isArray(data) ? data : data?.results ?? [];
    return list;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

async function createCourse(data: any): Promise<Course> {
  return apiRequest<Course>('/courses/create/', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function updateCourse(slug: string, data: any): Promise<Course> {
  return apiRequest<Course>(`/courses/${slug}/`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

async function deleteCourse(slug: string): Promise<void> {
  return apiRequest<void>(`/courses/${slug}/`, {
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
  subtext?: string;
}

function StatCard({ icon: Icon, value, label, color = "blue", iconColor = "blue", subtext }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`}>
          <Icon className={`h-5 w-5 text-${iconColor}-600 dark:text-${iconColor}-400`} />
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
          {subtext && <p className="text-[10px] text-gray-400 dark:text-gray-500">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const [cats, setCats] = useState<Category[]>([]);
  const [busy, setBusy] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [toast, setToast] = useState<Toast | null>(null);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [active, setActive] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<CourseForm>({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    level: 'beginner',
    pricing: 'free',
    price: '0',
    language: 'English',
    status: 'draft',
    has_certificate: false,
    category: ''
  });

  const showToast = (msg: string, ok: boolean = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = useCallback(() => {
    setBusy(true);
    Promise.all([
      getFullCourses(),
      getCategories(),
    ]).then(([coursesData, categoriesData]) => {
      const enrichedCourses = (coursesData || []).map((c: any) => ({
        id: c.id || c.slug,
        slug: c.slug,
        title: c.title || 'Untitled',
        instructor: c.instructor?.full_name || c.instructor || '—',
        category: c.category?.name || c.category || 'General',
        category_id: c.category?.id || '',
        level: c.level || 'beginner',
        status: c.status || 'draft',
        pricing: c.pricing || 'free',
        price: c.price || '0',
        total_students: c.total_students || c.students || 0,
        total_lessons: c.total_lessons || 0,
        avg_rating: c.avg_rating || 0,
        is_featured: c.is_featured || false,
        description: c.description || '',
        subtitle: c.subtitle || '',
        has_certificate: c.has_certificate || false,
        created_at: c.created_at,
        updated_at: c.updated_at
      }));
      setCourses(enrichedCourses);
      setTotal(enrichedCourses.length);
      setCats(categoriesData || []);
    }).catch((err) => {
      console.error('Load error:', err);
      showToast('Failed to load courses', false);
    })
      .finally(() => setBusy(false));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAddModal = () => {
    setForm({
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      level: 'beginner',
      pricing: 'free',
      price: '0',
      language: 'English',
      status: 'draft',
      has_certificate: false,
      category: ''
    });
    setActive(null);
    setModal('add');
  };

  const openEditModal = (course: Course) => {
    setActive(course);
    setForm({
      title: course.title || '',
      slug: course.slug || '',
      subtitle: course.subtitle || '',
      description: course.description || '',
      level: course.level || 'beginner',
      pricing: course.pricing || 'free',
      price: course.price?.toString() || '0',
      language: course.language || 'English',
      status: course.status === 'in_review' ? 'draft' : course.status || 'draft',
      has_certificate: course.has_certificate || false,
      category: course.category_id || ''
    });
    setModal('edit');
    setOpenDropdown(null);
  };

  const saveCourse = async () => {
    if (!form.title.trim()) {
      showToast('Title is required', false);
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        subtitle: form.subtitle,
        description: form.description,
        level: form.level,
        pricing: form.pricing,
        price: parseFloat(form.price || '0'),
        language: form.language,
        status: form.status,
        has_certificate: form.has_certificate,
        category: form.category || undefined
      };

      if (modal === 'add') {
        await createCourse(payload);
        showToast('Course created successfully! 🎉');
      } else if (active) {
        await updateCourse(active.slug, payload);
        showToast('Course updated successfully! ✅');
      }
      setModal(null);
      loadData();
    } catch (ex: any) {
      console.error('Save error:', ex);
      showToast(ex.message || 'Failed to save course', false);
    } finally {
      setSaving(false);
    }
  };

  const deleteCourseHandler = async (course: Course) => {
    if (!window.confirm(`Delete "${course.title}"? This cannot be undone.`)) return;
    try {
      await deleteCourse(course.slug);
      showToast('Course deleted successfully');
      loadData();
    } catch {
      showToast('Failed to delete course', false);
    }
    setOpenDropdown(null);
  };

  const handleAction = async (action: string, course: Course) => {
    setOpenDropdown(null);
    
    switch(action) {
      case 'edit':
        openEditModal(course);
        return;
      case 'delete':
        await deleteCourseHandler(course);
        return;
      case 'feature':
        try {
          await updateCourse(course.slug, { is_featured: true });
          showToast(`"${course.title}" featured! ⭐`);
          loadData();
        } catch (err) {
          showToast('Failed to feature course', false);
        }
        return;
      case 'unfeature':
        try {
          await updateCourse(course.slug, { is_featured: false });
          showToast(`"${course.title}" unfeatured`);
          loadData();
        } catch (err) {
          showToast('Failed to unfeature course', false);
        }
        return;
      case 'approve':
        try {
          await updateCourse(course.slug, { status: 'published' });
          showToast(`"${course.title}" approved! ✅`);
          loadData();
        } catch (err) {
          showToast('Failed to approve course', false);
        }
        return;
      case 'publish':
        try {
          await updateCourse(course.slug, { status: 'published' });
          showToast(`"${course.title}" published! 🚀`);
          loadData();
        } catch (err) {
          showToast('Failed to publish course', false);
        }
        return;
      case 'archive':
        try {
          await updateCourse(course.slug, { status: 'archived' });
          showToast(`"${course.title}" archived`);
          loadData();
        } catch (err) {
          showToast('Failed to archive course', false);
        }
        return;
      default:
        return;
    }
  };

  const toggleDropdown = (e: React.MouseEvent, courseId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(openDropdown === courseId ? null : courseId);
  };

  const handleChange = (key: keyof CourseForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(p => ({ ...p, [key]: value }));
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; dot: string }> = {
      'published': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
      'draft': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', dot: 'bg-yellow-500' },
      'archived': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-400', dot: 'bg-gray-500' },
      'pending': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', dot: 'bg-orange-500' },
      'in_review': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', dot: 'bg-purple-500' }
    };
    return statusMap[status] || statusMap['draft'];
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      'published': 'Published',
      'draft': 'Draft',
      'archived': 'Archived',
      'pending': 'Pending',
      'in_review': 'In Review'
    };
    return map[status] || status || 'Draft';
  };

  const getLevelLabel = (level: string) => {
    const map: Record<string, string> = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };
    return map[level] || level || 'Beginner';
  };

  // Calculate stats
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(c => c.status === 'published').length;
  const pendingCourses = courses.filter(c => c.status === 'pending' || c.status === 'in_review').length;
  const featuredCourses = courses.filter(c => c.is_featured).length;
  const totalStudents = courses.reduce((sum, c) => sum + (c.total_students || 0), 0);

  // Filter and search
  const filteredCourses = courses.filter(c => {
    if (filter === 'All') return true;
    if (filter === 'Pending review') return c.status === 'pending' || c.status === 'in_review';
    if (filter === 'Published') return c.status === 'published';
    if (filter === 'Featured') return c.is_featured;
    if (filter === 'Archived') return c.status === 'archived';
    return true;
  });

  const searchedCourses = filteredCourses.filter(c => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (c.title || '').toLowerCase().includes(term) ||
           (c.instructor || '').toLowerCase().includes(term) ||
           (c.category || '').toLowerCase().includes(term);
  });

  if (busy) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <PageSkeleton rows={5} />
      </div>
    );
  }

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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            <span>Course Management</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {totalCourses} courses
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            Manage content, publishing, and course settings
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full xs:w-auto">
          <button 
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow-md flex-1 xs:flex-none"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>New Course</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={BookOpen} value={totalCourses} label="Total Courses" color="blue" iconColor="blue" />
        <StatCard icon={Check} value={publishedCourses} label="Published" color="green" iconColor="green" />
        <StatCard icon={Clock} value={pendingCourses} label="Pending Review" color="yellow" iconColor="yellow" />
        <StatCard icon={Users} value={totalStudents.toLocaleString()} label="Total Students" color="purple" iconColor="purple" />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search courses by title, instructor, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex gap-1.5 sm:gap-2 flex-wrap w-full sm:w-auto">
            {["All", "Pending review", "Published", "Featured", "Archived"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors flex-1 sm:flex-none ${
                  filter === f 
                    ? "bg-blue-600 text-white dark:bg-blue-500 shadow-sm" 
                    : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-3 w-3" />
                    Course
                  </span>
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Instructor
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Level
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  Students
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Price
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {searchedCourses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 sm:py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <BookOpen className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {search ? 'No courses match your search' : 'No courses found'}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {search ? 'Try a different search term' : 'Click "New Course" to create one'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                searchedCourses.map((course) => {
                  const statusColors = getStatusColor(course.status);
                  const isFeatured = course.is_featured;
                  
                  return (
                    <tr key={course.id} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group">
                      <td className="py-3 px-3 sm:py-4 sm:px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 flex items-center justify-center shrink-0">
                            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                {course.title}
                              </p>
                              {isFeatured && (
                                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {course.category || 'General'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden md:table-cell">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {course.instructor || '—'}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden sm:table-cell">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {getLevelLabel(course.level)}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden lg:table-cell">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {(course.total_students || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:py-4 sm:px-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`} />
                          {getStatusLabel(course.status)}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden sm:table-cell">
                        <span className={`text-sm font-semibold ${
                          course.pricing === 'free' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {course.pricing === 'free' ? 'FREE' : `UGX ${Number(course.price || 0).toLocaleString()}`}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:py-4 sm:px-4">
                        <div className="relative" ref={dropdownRef}>
                          <button 
                            onClick={(e) => toggleDropdown(e, course.id)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                          {openDropdown === course.id && (
                            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 min-w-[160px]">
                              <button 
                                onClick={() => handleAction('edit', course)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                              >
                                <Edit2 className="h-4 w-4" /> Edit
                              </button>
                              {course.is_featured ? (
                                <button 
                                  onClick={() => handleAction('unfeature', course)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                                >
                                  <Star className="h-4 w-4 text-yellow-500" /> Unfeature
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleAction('feature', course)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                                >
                                  <Star className="h-4 w-4" /> Feature
                                </button>
                              )}
                              {(course.status === 'pending' || course.status === 'in_review') && (
                                <button 
                                  onClick={() => handleAction('approve', course)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left"
                                >
                                  <Check className="h-4 w-4" /> Approve
                                </button>
                              )}
                              {course.status === 'draft' && (
                                <button 
                                  onClick={() => handleAction('publish', course)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left"
                                >
                                  <Check className="h-4 w-4" /> Publish
                                </button>
                              )}
                              {course.status !== 'archived' && course.status !== 'published' && (
                                <button 
                                  onClick={() => handleAction('archive', course)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                                >
                                  <Archive className="h-4 w-4" /> Archive
                                </button>
                              )}
                              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                              <button 
                                onClick={() => handleAction('delete', course)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                              >
                                <Trash2 className="h-4 w-4" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer with count */}
        {searchedCourses.length > 0 && (
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium text-gray-700 dark:text-gray-300">{searchedCourses.length}</span> of{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">{courses.length}</span> courses
            </p>
            <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Published
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                Draft
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                Pending
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(modal === 'add' || modal === 'edit') && (
        <Modal title={modal === 'add' ? 'Create New Course' : 'Edit Course'} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input 
                value={form.title} 
                onChange={handleChange('title')} 
                placeholder="e.g. Networking Essentials"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Slug (URL)</label>
              <input 
                value={form.slug} 
                onChange={handleChange('slug')} 
                placeholder="auto-generated from title"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Subtitle</label>
              <input 
                value={form.subtitle} 
                onChange={handleChange('subtitle')} 
                placeholder="Short description"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
              <textarea 
                value={form.description} 
                onChange={handleChange('description')} 
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Level</label>
                <select 
                  value={form.level} 
                  onChange={handleChange('level')} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  {['beginner', 'intermediate', 'advanced'].map(l => (
                    <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                <select 
                  value={form.status} 
                  onChange={handleChange('status')} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  {['draft', 'published', 'archived', 'pending'].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Pricing</label>
                <select 
                  value={form.pricing} 
                  onChange={handleChange('pricing')} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  {['free', 'paid', 'subscription'].map(p => (
                    <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Price (UGX)</label>
                <input 
                  type="number" 
                  value={form.price} 
                  onChange={handleChange('price')} 
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
              <select 
                value={form.category || ''} 
                onChange={handleChange('category')} 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="">— No category —</option>
                {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input 
                type="checkbox" 
                checked={form.has_certificate} 
                onChange={handleChange('has_certificate')} 
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Issue certificate on completion
            </label>
            <div className="flex gap-3 pt-2 justify-end">
              <button 
                onClick={() => setModal(null)} 
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveCourse} 
                disabled={saving}
                className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                  saving 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                {saving ? 'Saving...' : (modal === 'add' ? 'Create Course' : 'Save Changes')}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Custom CSS */}
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
      `}</style>
    </div>
  );
}
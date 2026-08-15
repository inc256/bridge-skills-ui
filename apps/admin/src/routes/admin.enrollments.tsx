import { createFileRoute } from "@tanstack/react-router";
import { 
  Plus, RefreshCw, Search, Trash2, Edit2, X, TrendingUp, 
  Users, BookOpen, CheckCircle, Clock, AlertCircle, Filter,
  UserPlus, GraduationCap, Calendar, ChevronDown, User,
  Mail, Award, Zap
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/enrollments")({
  component: AdminEnrollments,
});

// ===================== TYPES =====================

interface User {
  id: string;
  full_name?: string;
  username: string;
  email: string;
  role?: string;
  first_name?: string;
  last_name?: string;
}

interface Course {
  id: string;
  title: string;
  slug?: string;
  description?: string;
}

interface Enrollment {
  id: string;
  status: 'active' | 'completed' | 'dropped';
  progress: number;
  source: string;
  enrolled_at: string;
  user: User;
  course: Course;
}

interface Toast {
  msg: string;
  ok: boolean;
}

interface EnrollmentForm {
  user_id: string;
  course_id: string;
  source: string;
}

// ===================== API FUNCTIONS =====================

async function getEnrollments(params: { status?: string; user?: string; page_size?: number } = {}): Promise<{ results: Enrollment[]; count: number }> {
  const query = new URLSearchParams();
  if (params.status) query.append('status', params.status);
  if (params.user) query.append('user', params.user);
  if (params.page_size) query.append('page_size', String(params.page_size));
  const url = `/enrollments/admin/${query.toString() ? `?${query.toString()}` : ''}`;
  const data = await apiRequest<any>(url);
  return data;
}

async function adminEnroll(data: EnrollmentForm): Promise<Enrollment> {
  return apiRequest<Enrollment>('/enrollments/admin/enroll/', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function updateEnrollment(id: string, data: { status: string }): Promise<Enrollment> {
  return apiRequest<Enrollment>(`/enrollments/admin/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

async function deleteEnrollment(id: string): Promise<void> {
  return apiRequest<void>(`/enrollments/admin/${id}/`, {
    method: 'DELETE'
  });
}

async function getUsers(params: { page_size?: number } = {}): Promise<User[]> {
  const query = new URLSearchParams();
  if (params.page_size) query.append('page_size', String(params.page_size));
  const data = await apiRequest<any>(`/users/${query.toString() ? `?${query.toString()}` : ''}`);
  return data?.results || [];
}

async function getCourses(params: { page_size?: number } = {}): Promise<Course[]> {
  const query = new URLSearchParams();
  if (params.page_size) query.append('page_size', String(params.page_size));
  const data = await apiRequest<any>(`/courses/${query.toString() ? `?${query.toString()}` : ''}`);
  return data?.results || [];
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

// Helper: Get display name from user object
function getDisplayName(user: any): string {
  if (!user) return 'Unknown Student';
  
  // Try different possible name fields
  const name = user.full_name || user.name || user.username || user.email || '';
  
  if (name && name.trim()) {
    return name.trim();
  }
  
  // Try first_name + last_name
  if (user.first_name || user.last_name) {
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    const fullName = `${firstName} ${lastName}`.trim();
    if (fullName) return fullName;
  }
  
  return 'Unknown Student';
}

// Helper: Get initials from user
function getInitials(user: any): string {
  const name = getDisplayName(user);
  if (name === 'Unknown Student') return '?';
  
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// Helper: Get user email
function getUserEmail(user: any): string {
  if (!user) return '—';
  return user.email || '—';
}

// ===================== ENROLLMENT ROW COMPONENT =====================

interface EnrollmentRowProps {
  enrollment: Enrollment;
  onEditStatus: (enrollment: Enrollment) => void;
  onDelete: (enrollment: Enrollment) => void;
}

function EnrollmentRow({ enrollment, onEditStatus, onDelete }: EnrollmentRowProps) {
  const getStatusColor = (status: string) => {
    const map: Record<string, { bg: string; text: string; dot: string }> = {
      'active': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
      'completed': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' },
      'dropped': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', dot: 'bg-red-500' },
    };
    return map[status] || { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-400', dot: 'bg-gray-500' };
  };

  const statusColors = getStatusColor(enrollment.status);
  const displayName = getDisplayName(enrollment.user);
  const initials = getInitials(enrollment.user);
  const userEmail = getUserEmail(enrollment.user);
  const enrolledDate = enrollment.enrolled_at ? new Date(enrollment.enrolled_at).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }) : '—';

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group">
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-sm">
              {initials}
            </div>
            {enrollment.status === 'active' && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {displayName}
            </p>
            <div className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden md:table-cell">
        <div className="flex items-center gap-2">
          <BookOpen className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
            {enrollment.course?.title || '—'}
          </p>
        </div>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`} />
          <span className="capitalize">{enrollment.status}</span>
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <div className="w-20 sm:w-24 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ 
                width: `${Math.min(enrollment.progress || 0, 100)}%`,
                background: enrollment.progress >= 80 ? '#10B981' : enrollment.progress >= 50 ? '#3B82F6' : '#F59E0B'
              }}
            />
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 min-w-[32px]">
            {parseFloat(String(enrollment.progress || 0)).toFixed(0)}%
          </span>
        </div>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden xl:table-cell">
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 capitalize">
          <Award className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
          {enrollment.source || '—'}
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden 2xl:table-cell">
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
          {enrolledDate}
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onEditStatus(enrollment)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Update Status"
          >
            <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          <button
            onClick={() => onDelete(enrollment)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            title="Remove Enrollment"
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'dropped'>('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'enroll' | 'status' | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<EnrollmentForm>({ user_id: '', course_id: '', source: 'admin' });
  const [saving, setSaving] = useState(false);
  const [editEnr, setEditEnr] = useState<Enrollment | null>(null);
  const [editStatus, setEditStatus] = useState<string>('');
  const [loadingUsersCourses, setLoadingUsersCourses] = useState(true);

  const showToast = (msg: string, ok: boolean = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const loadEnrollments = useCallback(() => {
    setBusy(true);
    const params: { status?: string; user?: string; page_size: number } = {
      status: filter !== 'all' ? filter : undefined,
      user: search || undefined,
      page_size: 100
    };
    getEnrollments(params)
      .then(data => {
        const results = data?.results || [];
        setEnrollments(results);
        setTotal(data?.count || 0);
      })
      .catch((err: any) => {
        console.error('Error loading enrollments:', err);
        showToast(err.message || 'Failed to load enrollments', false);
      })
      .finally(() => setBusy(false));
  }, [filter, search]);

  useEffect(() => {
    const t = setTimeout(loadEnrollments, 300);
    return () => clearTimeout(t);
  }, [loadEnrollments]);

  useEffect(() => {
    setLoadingUsersCourses(true);
    Promise.all([
      getUsers({ page_size: 100 }),
      getCourses({ page_size: 100 })
    ]).then(([usersData, coursesData]) => {
      setUsers(usersData || []);
      setCourses(coursesData || []);
    }).catch((err) => {
      console.error('Error loading users/courses:', err);
    }).finally(() => {
      setLoadingUsersCourses(false);
    });
  }, []);

  const enrollUser = async () => {
    if (!form.user_id || !form.course_id) {
      showToast('Please select both a student and a course', false);
      return;
    }
    setSaving(true);
    try {
      await adminEnroll(form);
      showToast('Student enrolled successfully! 🎉');
      setModal(null);
      loadEnrollments();
    } catch (ex: any) {
      showToast(ex.message || 'Failed to enroll student', false);
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async () => {
    if (!editEnr) return;
    try {
      await updateEnrollment(editEnr.id, { status: editStatus });
      showToast('Status updated successfully! ✅');
      setModal(null);
      loadEnrollments();
    } catch (ex: any) {
      showToast(ex.message || 'Failed to update status', false);
    }
  };

  const deleteEnrollmentHandler = async (enrollment: Enrollment) => {
    const studentName = getDisplayName(enrollment.user);
    if (!window.confirm(`Remove "${studentName}" from "${enrollment.course?.title || 'this course'}"?`)) return;
    try {
      await deleteEnrollment(enrollment.id);
      showToast('Enrollment removed successfully!');
      loadEnrollments();
    } catch (ex: any) {
      showToast(ex.message || 'Failed to remove enrollment', false);
    }
  };

  const openStatusModal = (enrollment: Enrollment) => {
    setEditEnr(enrollment);
    setEditStatus(enrollment.status);
    setModal('status');
  };

  const handleFormChange = (key: keyof EnrollmentForm) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
  };

  // Calculate stats with safe fallbacks
  const totalEnrollments = enrollments.length;
  const activeEnrollments = enrollments.filter(e => e.status === 'active').length;
  const completedEnrollments = enrollments.filter(e => e.status === 'completed').length;
  const droppedEnrollments = enrollments.filter(e => e.status === 'dropped').length;
  
  // Safe average progress calculation
  let avgProgress = 0;
  if (totalEnrollments > 0) {
    const totalProgress = enrollments.reduce((sum, e) => {
      const progress = typeof e.progress === 'number' ? e.progress : 0;
      return sum + progress;
    }, 0);
    avgProgress = Math.round(totalProgress / totalEnrollments);
  }

  // Filter students (only role: student)
  const students = users.filter(u => u.role === 'student');

  // Debug: Log enrollment data to see structure
  useEffect(() => {
    if (enrollments.length > 0) {
      console.log('Enrollment data sample:', enrollments[0]);
      console.log('User data sample:', enrollments[0].user);
    }
  }, [enrollments]);

  if (busy) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
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
            <span>Enrollments</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {total} total
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            Manage student course enrollments and track progress
          </p>
        </div>
        <button 
          onClick={() => setModal('enroll')}
          className="w-full xs:w-auto inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium transition-colors shadow-sm hover:shadow-md"
        >
          <UserPlus className="h-4 w-4" />
          <span>Enroll User</span>
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        <StatCard icon={Users} value={totalEnrollments} label="Total" color="blue" iconColor="blue" />
        <StatCard icon={CheckCircle} value={activeEnrollments} label="Active" color="green" iconColor="green" />
        <StatCard icon={Clock} value={completedEnrollments} label="Completed" color="purple" iconColor="purple" />
        <StatCard icon={AlertCircle} value={droppedEnrollments} label="Dropped" color="red" iconColor="red" />
        <StatCard icon={TrendingUp} value={isNaN(avgProgress) ? 0 : avgProgress + '%'} label="Avg Progress" color="orange" iconColor="orange" />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by student name or email..."
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
            {(['all', 'active', 'completed', 'dropped'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors flex-1 sm:flex-none ${
                  filter === f
                    ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-sm'
                    : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3 w-3" />
                    Student
                  </span>
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-3 w-3" />
                    Course
                  </span>
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  Progress
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
                  Source
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden 2xl:table-cell">
                  Enrolled
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 sm:py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3">
                        <Users className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No enrollments found</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Click "Enroll User" to add a new enrollment</p>
                    </div>
                  </td>
                </tr>
              ) : (
                enrollments.map((enrollment) => (
                  <EnrollmentRow
                    key={enrollment.id}
                    enrollment={enrollment}
                    onEditStatus={openStatusModal}
                    onDelete={deleteEnrollmentHandler}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer with count */}
        {enrollments.length > 0 && (
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium text-gray-700 dark:text-gray-300">{enrollments.length}</span> of{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">{total}</span> enrollments
            </p>
            <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Active
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Completed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Dropped
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Enroll Modal */}
      {modal === 'enroll' && (
        <Modal title="Enroll User in Course" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Student <span className="text-red-500">*</span>
              </label>
              {loadingUsersCourses ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
                </div>
              ) : (
                <select
                  value={form.user_id}
                  onChange={handleFormChange('user_id')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="">— Select student —</option>
                  {students.map((u) => (
                    <option key={u.id} value={u.id}>
                      {getDisplayName(u)} ({getUserEmail(u)})
                    </option>
                  ))}
                </select>
              )}
              {!loadingUsersCourses && students.length === 0 && (
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  No students available. Create a student account first.
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Course <span className="text-red-500">*</span>
              </label>
              {loadingUsersCourses ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
                </div>
              ) : (
                <select
                  value={form.course_id}
                  onChange={handleFormChange('course_id')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="">— Select course —</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              )}
              {!loadingUsersCourses && courses.length === 0 && (
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  No courses available. Create a course first.
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Source</label>
              <select
                value={form.source}
                onChange={handleFormChange('source')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                {['admin', 'free', 'paid', 'coupon'].map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-2 justify-end">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={enrollUser}
                disabled={saving || loadingUsersCourses || students.length === 0 || courses.length === 0}
                className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                  saving || loadingUsersCourses || students.length === 0 || courses.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                {saving ? 'Enrolling...' : 'Enroll Now'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Update Status Modal */}
      {modal === 'status' && editEnr && (
        <Modal title="Update Enrollment Status" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(editEnr.user)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {getDisplayName(editEnr.user)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {getUserEmail(editEnr.user)} → {editEnr.course?.title || 'Course'}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                {['active', 'completed', 'dropped'].map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-2 justify-end">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={updateStatus}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
              >
                Update Status
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
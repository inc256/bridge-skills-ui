import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Search, UserPlus, RefreshCw, X, Edit2, Users, Mail, Calendar, Award, TrendingUp } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/students")({
  component: AdminStudents,
});

// ===================== TYPES =====================

interface Student {
  id: string;
  full_name: string;
  username: string;
  name?: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
  created_at?: string;
  is_verified?: boolean;
  xp?: number;
  level?: number;
  streak_days?: number;
  avatar?: string;
}

interface Toast {
  msg: string;
  ok: boolean;
}

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password2: string;
  role: string;
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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
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
}

function StatCard({ icon: Icon, value, label, color = "blue" }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`}>
          <Icon className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

// Student Row Component
interface StudentRowProps {
  student: Student;
  index: number;
  onEdit: (student: Student) => void;
}

function StudentRow({ student, index, onEdit }: StudentRowProps) {
  const getRoleColor = (role: string) => {
    const roleLower = role?.toLowerCase() || 'student';
    if (roleLower === 'admin') return { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400' };
    if (roleLower === 'instructor' || roleLower === 'tutor') return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' };
    return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' };
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const colors = getRoleColor(student.role);
  const initials = getInitials(student.full_name || student.username || student.name || '?');
  const displayName = student.full_name || student.name || student.username || 'Unknown';
  const joinedDate = student.created_at ? new Date(student.created_at).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }) : '—';

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 border-b border-gray-100 dark:border-gray-700/50">
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <div className="flex items-center gap-3">
          <div className={`
            w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0
            ${colors.bg} ${colors.text}
          `}>
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {displayName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate sm:hidden">
              {student.email || '—'}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden sm:table-cell">
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[150px]">
          {student.email || '—'}
        </p>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden md:table-cell">
        <span className={`
          inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
          ${colors.bg} ${colors.text}
        `}>
          <span className={`
            w-1.5 h-1.5 rounded-full mr-1.5
            ${student.role === 'admin' ? 'bg-purple-500' : 
              student.role === 'instructor' ? 'bg-blue-500' : 
              'bg-green-500'}
          `} />
          {student.role || 'student'}
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {student.xp || 0} XP
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Lv {student.level || 1}
          </span>
        </div>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden xl:table-cell">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-3.5 w-3.5" />
          {joinedDate}
        </div>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onEdit(student)} 
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="View Details"
          >
            <Edit2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminStudents() {
  const [users, setUsers] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(true);
  const [q, setQ] = useState('');
  const [toast, setToast] = useState<Toast | null>(null);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Student | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormData>({ 
    email: '', 
    first_name: '', 
    last_name: '', 
    username: '', 
    password: '', 
    password2: '', 
    role: 'student' 
  });

  const showToast = (msg: string, ok: boolean = true) => { 
    setToast({ msg, ok }); 
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(() => {
    setBusy(true);
    const params = new URLSearchParams();
    params.append('role', 'student');
    params.append('page_size', '50');
    if (q) params.append('search', q);

    apiRequest(`/users/?${params.toString()}`)
      .then((r: any) => { 
        const results = r?.results || r || [];
        setUsers(results); 
        setTotal(r?.count || results.length || 0);
      })
      .catch((err: Error) => {
        console.error('Load error:', err);
        showToast('Failed to load students: ' + err.message, false);
      })
      .finally(() => setBusy(false));
  }, [q]);

  useEffect(() => { 
    const t = setTimeout(load, 400); 
    return () => clearTimeout(t);
  }, [load]);

  const openAdd = () => {
    setForm({ email: '', first_name: '', last_name: '', username: '', password: '', password2: '', role: 'student' });
    setModal('add');
  };

  const openEdit = (u: Student) => {
    setEditing(u);
    setForm({ 
      email: u.email, 
      first_name: u.first_name || '', 
      last_name: u.last_name || '', 
      username: u.username, 
      password: '', 
      password2: '', 
      role: u.role 
    });
    setModal('edit');
  };

  const saveAdd = async () => {
    if (!form.email || !form.password) { 
      showToast('Email and password required', false); 
      return; 
    }
    if (form.password !== form.password2) { 
      showToast('Passwords do not match', false); 
      return; 
    }
    setSaving(true);
    try {
      await apiRequest('/auth/register/', {
        method: 'POST',
        body: JSON.stringify({ 
          email: form.email,
          password: form.password,
          username: form.username || form.email.split('@')[0],
          first_name: form.first_name,
          last_name: form.last_name,
          role: 'student'
        }),
      });
      showToast('Student added successfully!');
      setModal(null);
      load();
    } catch (ex: any) {
      console.error('Add error:', ex);
      showToast(ex.message || 'Failed to add student', false);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, [key]: e.target.value }));
  };

  // Calculate stats
  const totalStudents = users.length;
  const activeStudents = users.filter(u => u.is_verified !== false).length;
  const totalXP = users.reduce((sum, u) => sum + (u.xp || 0), 0);
  const avgXP = totalStudents > 0 ? Math.round(totalXP / totalStudents) : 0;

  return (
    <div className="space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`
          fixed top-6 right-6 z-50 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg
          ${toast.ok ? 'bg-green-500' : 'bg-red-500'}
          animate-slide-in
        `}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Students</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {total} students registered on the platform
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={load} 
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={16} className={busy ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button 
            onClick={openAdd} 
            className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 border border-transparent rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
          >
            <UserPlus size={16} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={Users} value={totalStudents} label="Total Students" color="blue" />
        <StatCard icon={UserCheck} value={activeStudents} label="Active Students" color="green" />
        <StatCard icon={Award} value={totalXP.toLocaleString()} label="Total XP Earned" color="purple" />
        <StatCard icon={TrendingUp} value={avgXP} label="Average XP" color="orange" />
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
            placeholder="Search by name or email…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Email
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Role
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  XP / Level
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
                  Joined
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {busy ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <PageSkeleton rows={5} />
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Loading students...</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">No students found</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or add a new student</p>
                  </td>
                </tr>
              ) : (
                users.map((u, index) => (
                  <StudentRow 
                    key={u.id || index} 
                    student={u} 
                    index={index} 
                    onEdit={openEdit} 
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer with count */}
        {!busy && users.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">{users.length}</span> of <span className="font-medium">{total}</span> students
            </p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {modal === 'add' && (
        <Modal title="Add Student" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">First name</label>
                <input 
                  value={form.first_name} 
                  onChange={handleChange('first_name')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Last name</label>
                <input 
                  value={form.last_name} 
                  onChange={handleChange('last_name')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Username</label>
              <input 
                value={form.username} 
                onChange={handleChange('username')} 
                placeholder="e.g. sarah.namukasa"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                value={form.email} 
                onChange={handleChange('email')} 
                placeholder="student@example.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password <span className="text-red-500">*</span></label>
              <input 
                type="password" 
                value={form.password} 
                onChange={handleChange('password')} 
                placeholder="Min. 8 characters"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Confirm password <span className="text-red-500">*</span></label>
              <input 
                type="password" 
                value={form.password2} 
                onChange={handleChange('password2')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="flex gap-3 pt-2 justify-end">
              <button 
                onClick={() => setModal(null)} 
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveAdd} 
                disabled={saving}
                className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                  saving 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                {saving ? 'Adding...' : 'Add Student'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {modal === 'edit' && editing && (
        <Modal title="Student Details" onClose={() => setModal(null)}>
          <div className="space-y-3">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl font-bold text-blue-700 dark:text-blue-400">
                {(editing.full_name?.[0] || editing.username?.[0] || '?').toUpperCase()}
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {editing.full_name || editing.username || 'Unknown'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{editing.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{editing.role || 'student'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">XP</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{editing.xp || 0}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{editing.level || 1}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Streak</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{editing.streak_days || 0} days</p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {editing.created_at ? new Date(editing.created_at).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : '—'}
              </p>
            </div>
            
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setModal(null)} 
                className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Custom CSS for animations */}
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
      `}</style>
    </div>
  );
}

// Import missing icons
import { UserCheck } from "lucide-react";
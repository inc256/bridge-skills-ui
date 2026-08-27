import { createFileRoute } from "@tanstack/react-router";
import { 
  Layers, Edit2, RefreshCw, MoreHorizontal, Plus, X, 
  Search, BookOpen, Tag, TrendingUp, Users, Calendar,
  CheckCircle, Trash2, Filter, Grid3x3, List
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

// ===================== TYPES =====================

interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  course_count?: number;
  total_courses?: number;
  students?: number;
  is_featured?: boolean;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  icon?: string;
}

interface Toast {
  msg: string;
  ok: boolean;
}

// ===================== API FUNCTIONS =====================

async function getCategories(): Promise<Category[]> {
  try {
    const data = await apiRequest<any>('/courses/categories/');
    const list = Array.isArray(data) ? data : data?.results || [];
    return list;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

async function createCategory(data: Partial<Category>): Promise<Category> {
  return apiRequest<Category>('/courses/categories/', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function updateCategory(id: string, data: Partial<Category>): Promise<Category> {
  return apiRequest<Category>(`/courses/categories/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

async function deleteCategory(id: string): Promise<void> {
  return apiRequest<void>(`/courses/categories/${id}/`, {
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

// Category Card Component
interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const courseCount = category.course_count || category.total_courses || 0;
  const iconMap: Record<string, string> = {
    'Networking': '🌐',
    'Cybersecurity': '🔒',
    'Software Engineering': '💻',
    'Artificial Intelligence': '🤖',
    'Cloud Computing': '☁️',
    'Design': '🎨',
    'Data Science': '📊',
    'Machine Learning': '🧠',
    'Web Development': '🌐',
    'Mobile Development': '📱',
    'Blockchain': '⛓️',
    'DevOps': '⚙️',
    'Database': '🗄️',
    'UI/UX': '🎯'
  };
  
  const icon = iconMap[category.name] || '📚';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 dark:bg-blue-900/20 text-2xl">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold truncate text-gray-900 dark:text-white">
              {category.name}
            </div>
            {category.is_featured && (
              <span className="shrink-0 text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                ★ Featured
              </span>
            )}
          </div>
          {category.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {category.description}
            </p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {category.is_active !== false && (
              <span className="inline-flex items-center gap-0.5 text-[8px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                <span className="w-1 h-1 rounded-full bg-green-500" />
                Active
              </span>
            )}
            <span className="inline-flex items-center gap-0.5 text-[8px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
              <BookOpen className="h-2.5 w-2.5" />
              {courseCount} {courseCount === 1 ? 'course' : 'courses'}
            </span>
            {category.students && category.students > 0 && (
              <span className="inline-flex items-center gap-0.5 text-[8px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                <Users className="h-2.5 w-2.5" />
                {category.students}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button 
          onClick={() => onEdit(category)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Edit2 className="h-3.5 w-3.5" />
          <span className="hidden xs:inline">Edit</span>
        </button>
        <button 
          onClick={() => onDelete(category)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="hidden xs:inline">Delete</span>
        </button>
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [busy, setBusy] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Category>>({
    name: '',
    description: '',
    is_featured: false,
    is_active: true
  });

  const showToast = (msg: string, ok: boolean = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const loadCategories = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const results = await getCategories();
      setCategories(results || []);
    } catch (err: any) {
      console.error('Failed to load categories:', err);
      setError(err.message || 'Failed to load categories');
      showToast('Failed to load categories', false);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const openAddModal = () => {
    setForm({ name: '', description: '', is_featured: false, is_active: true });
    setEditingCategory(null);
    setModal('add');
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description || '',
      is_featured: category.is_featured || false,
      is_active: category.is_active !== undefined ? category.is_active : true
    });
    setModal('edit');
  };

  const saveCategory = async () => {
    if (!form.name?.trim()) {
      showToast('Category name is required', false);
      return;
    }

    setSaving(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, form);
        showToast('Category updated successfully!');
      } else {
        await createCategory(form);
        showToast('Category created successfully!');
      }
      setModal(null);
      loadCategories();
    } catch (err: any) {
      showToast(err.message || 'Failed to save category', false);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    if (!window.confirm(`Delete category "${category.name}"? This may affect courses.`)) return;
    try {
      await deleteCategory(category.id);
      showToast('Category deleted successfully!');
      loadCategories();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete category', false);
    }
  };

  const handleChange = (key: keyof Category) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // Filter categories by search
  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate stats
  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.is_active !== false).length;
  const featuredCategories = categories.filter(c => c.is_featured).length;
  const totalCourses = categories.reduce((sum, c) => sum + (c.course_count || c.total_courses || 0), 0);

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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            {totalCategories} categories · {totalCourses} total courses
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm w-full xs:w-auto"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        <StatCard icon={Tag} value={totalCategories} label="Total Categories" color="blue" iconColor="blue" />
        <StatCard icon={CheckCircle} value={activeCategories} label="Active" color="green" iconColor="green" />
        <StatCard icon={TrendingUp} value={featuredCategories} label="Featured" color="purple" iconColor="purple" />
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search categories by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 sm:p-4 text-sm text-red-700 dark:text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-8 sm:py-12">
            {searchTerm ? (
              <>
                <Search className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No categories match your search</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try a different search term</p>
              </>
            ) : (
              <>
                <Tag className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No categories found</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Click "Add Category" to create your first one</p>
              </>
            )}
          </div>
        ) : (
          filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={openEditModal}
              onDelete={handleDeleteCategory}
            />
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {(modal === 'add' || modal === 'edit') && (
        <Modal title={modal === 'add' ? 'Add Category' : 'Edit Category'} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.name || ''}
                onChange={handleChange('name')}
                placeholder="e.g. Cloud Computing"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
              <textarea
                value={form.description || ''}
                onChange={handleChange('description')}
                rows={3}
                placeholder="Brief description of the category..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_featured || false}
                  onChange={handleChange('is_featured')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Featured Category
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_active !== false}
                  onChange={handleChange('is_active')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Active
              </label>
            </div>
            <div className="flex gap-3 pt-2 justify-end">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveCategory}
                disabled={saving}
                className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                  saving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                {saving ? 'Saving...' : (modal === 'edit' ? 'Update Category' : 'Add Category')}
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
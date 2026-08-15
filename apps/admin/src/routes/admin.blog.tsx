import { createFileRoute } from "@tanstack/react-router";
import { 
  Plus, Edit2, Trash2, RefreshCw, X, FileText, Eye, 
  Clock, CheckCircle, AlertCircle, TrendingUp, Users,
  Calendar, Filter, Search, BookOpen, ArrowUpRight
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlog,
});

// ===================== TYPES =====================

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  author_name?: string;
  views: number;
  created_at: string;
  updated_at?: string;
}

interface Toast {
  msg: string;
  ok: boolean;
}

interface BlogForm {
  title: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
}

// ===================== API FUNCTIONS =====================

async function getBlogPosts(params: { status?: string; page_size?: number } = {}): Promise<BlogPost[]> {
  const query = new URLSearchParams();
  if (params.status) query.append('status', params.status);
  if (params.page_size) query.append('page_size', String(params.page_size));
  const url = `/blog/${query.toString() ? `?${query.toString()}` : ''}`;
  const data = await apiRequest<any>(url);
  return data?.results || [];
}

async function getBlogPost(slug: string): Promise<BlogPost> {
  return apiRequest<BlogPost>(`/blog/${slug}/`);
}

async function createBlogPost(data: BlogForm): Promise<BlogPost> {
  return apiRequest<BlogPost>('/blog/', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function updateBlogPost(slug: string, data: Partial<BlogForm>): Promise<BlogPost> {
  return apiRequest<BlogPost>(`/blog/${slug}/`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

async function deleteBlogPost(slug: string): Promise<void> {
  return apiRequest<void>(`/blog/${slug}/`, {
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
      <div className="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 mt-auto sm:mt-0">
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
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`p-2 sm:p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`}>
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${iconColor}-600 dark:text-${iconColor}-400`} />
        </div>
        <div className="min-w-0">
          <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{label}</p>
          {subtext && <p className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}

// Blog Post Card Component
interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
  onPublishToggle: (post: BlogPost) => void;
}

function BlogPostCard({ post, onEdit, onDelete, onPublishToggle }: BlogPostCardProps) {
  const getStatusColor = (status: string) => {
    const map: Record<string, { bg: string; text: string; dot: string }> = {
      'published': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
      'draft': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', dot: 'bg-yellow-500' },
      'archived': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-400', dot: 'bg-gray-500' },
    };
    return map[status] || map['draft'];
  };

  const statusColors = getStatusColor(post.status);
  const formattedDate = post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : '—';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`} />
              {post.status}
            </span>
            {post.is_featured && (
              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                ⭐ Featured
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {post.author_name || 'Admin'}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views || 0} views
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button 
            onClick={() => onPublishToggle(post)}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-colors ${
              post.status === 'published'
                ? 'border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white'
            }`}
          >
            {post.status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
          <button 
            onClick={() => onEdit(post)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Edit"
          >
            <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          <button 
            onClick={() => onDelete(post)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);
  const [modal, setModal] = useState<'form' | null>(null);
  const [form, setForm] = useState<BlogForm>({
    title: '',
    excerpt: '',
    content: '',
    status: 'draft',
    is_featured: false
  });
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [search, setSearch] = useState('');

  const showToast = (msg: string, ok: boolean = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const loadPosts = useCallback(() => {
    setBusy(true);
    const params: { status?: string; page_size: number } = {
      status: filter !== 'all' ? filter : undefined,
      page_size: 50
    };
    getBlogPosts(params)
      .then(results => {
        setPosts(results || []);
        setTotal(results?.length || 0);
      })
      .catch((err: any) => {
        console.error('Error loading posts:', err);
        showToast(err.message || 'Failed to load posts', false);
      })
      .finally(() => setBusy(false));
  }, [filter]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const openAddModal = () => {
    setForm({ title: '', excerpt: '', content: '', status: 'draft', is_featured: false });
    setEditSlug(null);
    setModal('form');
  };

  const openEditModal = (post: BlogPost) => {
    setForm({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      status: post.status || 'draft',
      is_featured: post.is_featured || false
    });
    setEditSlug(post.slug);
    setModal('form');
  };

  const savePost = async () => {
    if (!form.title.trim()) {
      showToast('Title is required', false);
      return;
    }
    if (!form.content.trim()) {
      showToast('Content is required', false);
      return;
    }
    setSaving(true);
    try {
      if (editSlug) {
        await updateBlogPost(editSlug, form);
        showToast('Post updated successfully! ✅');
      } else {
        await createBlogPost(form);
        showToast('Post created successfully! 🎉');
      }
      setModal(null);
      loadPosts();
    } catch (ex: any) {
      showToast(ex.message || 'Failed to save post', false);
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (post: BlogPost) => {
    if (!window.confirm(`Delete "${post.title}"? This action cannot be undone.`)) return;
    try {
      await deleteBlogPost(post.slug);
      showToast('Post deleted successfully!');
      loadPosts();
    } catch (ex: any) {
      showToast(ex.message || 'Failed to delete post', false);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const newStatus = post.status === 'published' ? 'draft' : 'published';
      await updateBlogPost(post.slug, { status: newStatus });
      showToast(`Post ${newStatus === 'published' ? 'published' : 'unpublished'} successfully!`);
      loadPosts();
    } catch (ex: any) {
      showToast(ex.message || 'Failed to update status', false);
    }
  };

  const handleChange = (key: keyof BlogForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // Filter posts by search
  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.excerpt && p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  // Calculate stats
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const draftPosts = posts.filter(p => p.status === 'draft').length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

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
            <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            <span>Blog Posts</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {totalPosts} total
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            Create, manage, and publish blog content
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={loadPosts}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">Refresh</span>
          </button>
          <button 
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow-md"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <StatCard icon={FileText} value={totalPosts} label="Total Posts" color="blue" iconColor="blue" />
        <StatCard icon={CheckCircle} value={publishedPosts} label="Published" color="green" iconColor="green" />
        <StatCard icon={Clock} value={draftPosts} label="Drafts" color="yellow" iconColor="yellow" />
        <StatCard icon={Eye} value={totalViews.toLocaleString()} label="Total Views" color="purple" iconColor="purple" />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search posts by title or excerpt..."
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
            {(['all', 'published', 'draft', 'archived'] as const).map((f) => (
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

      {/* Posts List */}
      <div className="space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3">
                <FileText className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {search ? 'No posts match your search' : 'No blog posts yet'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {search ? 'Try a different search term' : 'Click "New Post" to create your first blog post'}
              </p>
            </div>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              onEdit={openEditModal}
              onDelete={deletePost}
              onPublishToggle={togglePublish}
            />
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal === 'form' && (
        <Modal title={editSlug ? 'Edit Post' : 'New Blog Post'} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                value={form.title}
                onChange={handleChange('title')}
                placeholder="e.g. Top 5 Networking Skills in 2026"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={handleChange('excerpt')}
                rows={2}
                placeholder="Short summary shown in blog listings..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Content <span className="text-red-500">*</span> <span className="text-gray-400 text-[10px]">(HTML supported)</span>
              </label>
              <textarea
                value={form.content}
                onChange={handleChange('content')}
                rows={8}
                placeholder="<p>Start writing your blog post here...</p>"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={handleChange('status')}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  {['draft', 'published', 'archived'].map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer pt-3">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={handleChange('is_featured')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Featured post
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
                onClick={savePost}
                disabled={saving}
                className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                  saving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                {saving ? 'Saving...' : (editSlug ? 'Update Post' : 'Create Post')}
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
import { createFileRoute } from "@tanstack/react-router";
import { 
  Plus, Edit2, Trash2, RefreshCw, X, Briefcase, MapPin, ExternalLink,
  Building2, Calendar, Clock, CheckCircle, AlertCircle, Filter,
  Search, Award, Users, TrendingUp, Eye, Link2, Mail
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/jobs")({
  component: AdminJobs,
});

// ===================== TYPES =====================

interface Job {
  id: string;
  title: string;
  company_name: string;
  description: string;
  requirements?: string;
  location?: string;
  job_type: 'full_time' | 'part_time' | 'contract' | 'internship' | 'remote';
  apply_url?: string;
  apply_email?: string;
  is_active: boolean;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

interface Toast {
  msg: string;
  ok: boolean;
}

interface JobForm {
  title: string;
  company_name: string;
  description: string;
  requirements: string;
  location: string;
  job_type: 'full_time' | 'part_time' | 'contract' | 'internship' | 'remote';
  apply_url: string;
  apply_email: string;
  is_active: boolean;
  is_featured: boolean;
}

// ===================== API FUNCTIONS =====================

async function getJobs(params: { page_size?: number } = {}): Promise<{ results: Job[]; count: number }> {
  const query = new URLSearchParams();
  if (params.page_size) query.append('page_size', String(params.page_size));
  const url = `/features/jobs/${query.toString() ? `?${query.toString()}` : ''}`;
  const data = await apiRequest<any>(url);
  return data;
}

async function createJob(data: JobForm): Promise<Job> {
  return apiRequest<Job>('/features/jobs/', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function updateJob(id: string, data: Partial<JobForm>): Promise<Job> {
  return apiRequest<Job>(`/features/jobs/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

async function deleteJob(id: string): Promise<void> {
  return apiRequest<void>(`/features/jobs/${id}/`, {
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
      <div className="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 mt-auto sm:mt-0">
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
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${iconColor}-600 dark:${iconColor}-400`} />
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

// Job Card Component
interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
  onToggleActive: (job: Job) => void;
}

function JobCard({ job, onEdit, onDelete, onToggleActive }: JobCardProps) {
  const getTypeColor = (type: string) => {
    const map: Record<string, { bg: string; text: string; dot: string }> = {
      'full_time': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' },
      'part_time': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
      'contract': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', dot: 'bg-yellow-500' },
      'internship': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', dot: 'bg-purple-500' },
      'remote': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-400', dot: 'bg-cyan-500' },
    };
    return map[type] || map['full_time'];
  };

  const typeColors = getTypeColor(job.job_type);
  const formattedDate = job.created_at ? new Date(job.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : '—';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
              {job.title}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Building2 className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {job.company_name}
            </p>
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          {!job.is_active && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] sm:text-[10px] font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
              <span className="w-1 h-1 rounded-full bg-red-500" />
              Inactive
            </span>
          )}
          {job.is_featured && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] sm:text-[10px] font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
              ⭐ Featured
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-medium ${typeColors.bg} ${typeColors.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${typeColors.dot}`} />
          {job.job_type?.replace('_', ' ') || 'Full time'}
        </span>
        {job.location && (
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.location}
          </span>
        )}
        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formattedDate}
        </span>
      </div>

      {job.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 flex-1">
          {job.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 mt-2">
        {job.apply_url && (
          <a 
            href={job.apply_url} 
            target="_blank" 
            rel="noreferrer"
            className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Apply URL
          </a>
        )}
        {job.apply_email && (
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {job.apply_email}
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => onToggleActive(job)}
          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            job.is_active
              ? 'border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
              : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white'
          }`}
        >
          {job.is_active ? 'Deactivate' : 'Activate'}
        </button>
        <button
          onClick={() => onEdit(job)}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          title="Edit"
        >
          <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
        <button
          onClick={() => onDelete(job)}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);
  const [modal, setModal] = useState<'form' | null>(null);
  const [form, setForm] = useState<JobForm>({
    title: '',
    company_name: '',
    description: '',
    requirements: '',
    location: '',
    job_type: 'full_time',
    apply_url: '',
    apply_email: '',
    is_active: true,
    is_featured: false
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const showToast = (msg: string, ok: boolean = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const loadJobs = useCallback(() => {
    setBusy(true);
    getJobs({ page_size: 50 })
      .then(data => {
        setJobs(data?.results || []);
        setTotal(data?.count || 0);
      })
      .catch((err: any) => {
        console.error('Error loading jobs:', err);
        showToast(err.message || 'Failed to load jobs', false);
      })
      .finally(() => setBusy(false));
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const openAddModal = () => {
    setForm({
      title: '',
      company_name: '',
      description: '',
      requirements: '',
      location: '',
      job_type: 'full_time',
      apply_url: '',
      apply_email: '',
      is_active: true,
      is_featured: false
    });
    setEditId(null);
    setModal('form');
  };

  const openEditModal = (job: Job) => {
    setForm({
      title: job.title || '',
      company_name: job.company_name || '',
      description: job.description || '',
      requirements: job.requirements || '',
      location: job.location || '',
      job_type: job.job_type || 'full_time',
      apply_url: job.apply_url || '',
      apply_email: job.apply_email || '',
      is_active: job.is_active !== undefined ? job.is_active : true,
      is_featured: job.is_featured || false
    });
    setEditId(job.id);
    setModal('form');
  };

  const saveJob = async () => {
    if (!form.title.trim() || !form.company_name.trim()) {
      showToast('Title and company name are required', false);
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        await updateJob(editId, form);
        showToast('Job updated successfully! ✅');
      } else {
        await createJob(form);
        showToast('Job posted successfully! 🎉');
      }
      setModal(null);
      loadJobs();
    } catch (ex: any) {
      showToast(ex.message || 'Failed to save job', false);
    } finally {
      setSaving(false);
    }
  };

  const deleteJob = async (job: Job) => {
    if (!window.confirm(`Delete "${job.title}" at ${job.company_name}?`)) return;
    try {
      await deleteJob(job.id);
      showToast('Job deleted successfully!');
      loadJobs();
    } catch (ex: any) {
      showToast(ex.message || 'Failed to delete job', false);
    }
  };

  const toggleActive = async (job: Job) => {
    try {
      await updateJob(job.id, { is_active: !job.is_active });
      showToast(`Job ${job.is_active ? 'deactivated' : 'activated'} successfully!`);
      loadJobs();
    } catch (ex: any) {
      showToast(ex.message || 'Failed to update status', false);
    }
  };

  const handleChange = (key: keyof JobForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // Filter jobs by search and status
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                          job.company_name.toLowerCase().includes(search.toLowerCase()) ||
                          (job.description && job.description.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && job.is_active) ||
                         (filter === 'inactive' && !job.is_active);
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(j => j.is_active).length;
  const featuredJobs = jobs.filter(j => j.is_featured).length;
  const jobTypes = jobs.reduce((acc: Record<string, number>, j) => {
    acc[j.job_type] = (acc[j.job_type] || 0) + 1;
    return acc;
  }, {});

  const mostCommonType = Object.entries(jobTypes).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

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
            <Briefcase className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            <span>Jobs & Careers</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {totalJobs} total
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            Post and manage job opportunities for platform learners
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={loadJobs}
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
            <span>Post Job</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <StatCard icon={Briefcase} value={totalJobs} label="Total Jobs" color="blue" iconColor="blue" />
        <StatCard icon={CheckCircle} value={activeJobs} label="Active" color="green" iconColor="green" />
        <StatCard icon={Award} value={featuredJobs} label="Featured" color="yellow" iconColor="yellow" />
        <StatCard icon={TrendingUp} value={mostCommonType.replace('_', ' ')} label="Most Common Type" color="purple" iconColor="purple" subtext="Job type" />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or description..."
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
            {(['all', 'active', 'inactive'] as const).map((f) => (
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

      {/* Jobs Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3">
                <Briefcase className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {search ? 'No jobs match your search' : 'No jobs posted yet'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {search ? 'Try a different search term' : 'Click "Post Job" to create your first job listing'}
              </p>
            </div>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={openEditModal}
              onDelete={deleteJob}
              onToggleActive={toggleActive}
            />
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal === 'form' && (
        <Modal title={editId ? 'Edit Job' : 'Post New Job'} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                value={form.title}
                onChange={handleChange('title')}
                placeholder="e.g. Network Engineer"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.company_name}
                onChange={handleChange('company_name')}
                placeholder="e.g. MTN Uganda"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Job Type</label>
                <select
                  value={form.job_type}
                  onChange={handleChange('job_type')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  {['full_time', 'part_time', 'contract', 'internship', 'remote'].map(t => (
                    <option key={t} value={t}>{t.replace('_', ' ').toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
                <input
                  value={form.location}
                  onChange={handleChange('location')}
                  placeholder="Kampala, Uganda"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={handleChange('description')}
                rows={3}
                placeholder="Job description..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Requirements</label>
              <textarea
                value={form.requirements}
                onChange={handleChange('requirements')}
                rows={2}
                placeholder="Skills and qualifications required..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Apply URL</label>
                <input
                  value={form.apply_url}
                  onChange={handleChange('apply_url')}
                  placeholder="https://apply.example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Apply Email</label>
                <input
                  type="email"
                  value={form.apply_email}
                  onChange={handleChange('apply_email')}
                  placeholder="hr@company.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={handleChange('is_active')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Active
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={handleChange('is_featured')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Featured
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
                onClick={saveJob}
                disabled={saving}
                className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                  saving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                {saving ? 'Saving...' : (editId ? 'Update Job' : 'Post Job')}
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
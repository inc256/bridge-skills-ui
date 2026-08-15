import { createFileRoute } from "@tanstack/react-router";
import { 
  Award, Search, RefreshCw, Plus, Shield, Download, Ban, 
  RotateCcw, Trash2, X, Users, BookOpen, Calendar, CheckCircle,
  AlertCircle, FileCheck, TrendingUp, User, Mail, Filter
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/certificates")({
  component: AdminCertificates,
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
}

interface Certificate {
  id: string;
  number: string;
  user_id: string;
  user_name: string;
  course_id: string;
  course_title: string;
  issued_at: string;
  is_valid: boolean;
  verify_count: number;
  revoked_at?: string;
  revoked_reason?: string;
}

interface Stats {
  total: number;
  valid: number;
  revoked: number;
}

interface Toast {
  msg: string;
  ok: boolean;
}

interface IssueForm {
  user_id: string;
  course_id: string;
  number: string;
}

// ===================== API FUNCTIONS =====================

async function getCertificatesAdmin(params: { search?: string; valid?: string; page_size?: number } = {}): Promise<{ results: Certificate[]; count: number }> {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.valid) query.append('valid', params.valid);
  if (params.page_size) query.append('page_size', String(params.page_size));
  
  const url = `/certificates/admin/${query.toString() ? `?${query.toString()}` : ''}`;
  return apiRequest<any>(url);
}

async function getCertificateStats(): Promise<Stats> {
  return apiRequest<Stats>('/certificates/admin/stats/');
}

async function verifyCertificate(number: string): Promise<any> {
  return apiRequest<any>(`/certificates/verify/${number}/`);
}

async function issueCertificate(data: IssueForm): Promise<any> {
  return apiRequest<any>('/certificates/admin/issue/', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function revokeCertificate(id: string, data: { reason: string }): Promise<any> {
  return apiRequest<any>(`/certificates/admin/${id}/revoke/`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function restoreCertificate(id: string): Promise<any> {
  return apiRequest<any>(`/certificates/admin/${id}/restore/`, {
    method: 'POST'
  });
}

async function deleteCertificate(id: string): Promise<void> {
  return apiRequest<void>(`/certificates/admin/${id}/delete/`, {
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

// Helper: Get display name from user object
function getDisplayName(user: any): string {
  if (!user) return 'Unknown Student';
  
  const name = user.full_name || user.name || user.username || user.email || '';
  if (name && name.trim()) {
    return name.trim();
  }
  
  if (user.first_name || user.last_name) {
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    const fullName = `${firstName} ${lastName}`.trim();
    if (fullName) return fullName;
  }
  
  return 'Unknown Student';
}

// Helper: Get user email
function getUserEmail(user: any): string {
  if (!user) return '—';
  return user.email || '—';
}

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

// Certificate Row Component
interface CertificateRowProps {
  certificate: Certificate;
  onDownload: (certificate: Certificate) => void;
  onRevoke: (certificate: Certificate) => void;
  onRestore: (certificate: Certificate) => void;
  onDelete: (certificate: Certificate) => void;
}

function CertificateRow({ certificate, onDownload, onRevoke, onRestore, onDelete }: CertificateRowProps) {
  const formatDate = (date: string) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group">
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <span className="font-mono text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
          {certificate.number}
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shadow-sm shrink-0">
            {certificate.user_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'}
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {certificate.user_name}
          </span>
        </div>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden md:table-cell">
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
          <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[180px]">
            {certificate.course_title}
          </span>
        </div>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden lg:table-cell">
        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
          {formatDate(certificate.issued_at)}
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium ${
          certificate.is_valid 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${certificate.is_valid ? 'bg-green-500' : 'bg-red-500'}`} />
          {certificate.is_valid ? 'Valid' : 'Revoked'}
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden xl:table-cell">
        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
          {certificate.verify_count || 0} verifications
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button 
            onClick={() => onDownload(certificate)} 
            title="Download/Print"
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          {certificate.is_valid ? (
            <button 
              onClick={() => onRevoke(certificate)} 
              title="Revoke"
              className="p-1.5 sm:p-2 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400"
            >
              <Ban className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          ) : (
            <button 
              onClick={() => onRestore(certificate)} 
              title="Restore"
              className="p-1.5 sm:p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            >
              <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          )}
          <button 
            onClick={() => onDelete(certificate)} 
            title="Delete permanently"
            className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<Stats | null>(null);
  const [busy, setBusy] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'valid' | 'revoked'>('all');
  const [modal, setModal] = useState<'verify' | 'issue' | 'revoke' | null>(null);
  const [verNum, setVerNum] = useState('');
  const [verBusy, setVerBusy] = useState(false);
  const [verRes, setVerRes] = useState<{ ok: boolean; data?: any; msg?: string } | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [issueForm, setIssueForm] = useState<IssueForm>({ user_id: '', course_id: '', number: '' });
  const [issueBusy, setIssueBusy] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState<Certificate | null>(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [loadingUsersCourses, setLoadingUsersCourses] = useState(true);

  const showToast = (msg: string, ok: boolean = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const loadCertificates = useCallback(async () => {
    setBusy(true);
    try {
      const params: { search?: string; valid?: string; page_size: number } = {
        search: search || undefined,
        valid: filter === 'valid' ? '1' : filter === 'revoked' ? '0' : undefined,
        page_size: 100,
      };
      const [certsData, statsData] = await Promise.all([
        getCertificatesAdmin(params),
        getCertificateStats()
      ]);
      setCertificates(certsData?.results || []);
      setTotal(certsData?.count || 0);
      setStats(statsData);
    } catch (err: any) {
      console.error('Load error:', err);
      showToast(err.message || 'Failed to load certificates', false);
    } finally {
      setBusy(false);
    }
  }, [search, filter]);

  useEffect(() => {
    const t = setTimeout(loadCertificates, 400);
    return () => clearTimeout(t);
  }, [loadCertificates]);

  useEffect(() => {
    setLoadingUsersCourses(true);
    Promise.all([
      getUsers({ page_size: 100 }),
      getCourses({ page_size: 50 })
    ]).then(([usersData, coursesData]) => {
      setUsers(usersData || []);
      setCourses(coursesData || []);
    }).catch((err) => {
      console.error('Error loading users/courses:', err);
    }).finally(() => {
      setLoadingUsersCourses(false);
    });
  }, []);

  const verifyCertificateHandler = async () => {
    if (!verNum.trim()) return;
    setVerBusy(true);
    setVerRes(null);
    try {
      const data = await verifyCertificate(verNum.trim());
      setVerRes({ ok: true, data });
    } catch (err: any) {
      setVerRes({ ok: false, msg: err.message || 'Certificate not found.' });
    } finally {
      setVerBusy(false);
    }
  };

  const issueCertificateHandler = async () => {
    if (!issueForm.user_id || !issueForm.course_id) {
      showToast('Please select both a student and a course', false);
      return;
    }
    setIssueBusy(true);
    try {
      const data = await issueCertificate(issueForm);
      showToast(data?.created ? 'Certificate issued successfully! 🎉' : 'Certificate already exists');
      setModal(null);
      setIssueForm({ user_id: '', course_id: '', number: '' });
      loadCertificates();
    } catch (err: any) {
      showToast(err.message || 'Failed to issue certificate', false);
    } finally {
      setIssueBusy(false);
    }
  };

  const revokeCertificateHandler = async () => {
    if (!revokeTarget) return;
    try {
      await revokeCertificate(revokeTarget.id, { reason: revokeReason });
      showToast(`Certificate ${revokeTarget.number} revoked`);
      setModal(null);
      setRevokeTarget(null);
      setRevokeReason('');
      loadCertificates();
    } catch (err: any) {
      showToast(err.message || 'Failed to revoke certificate', false);
    }
  };

  const restoreCertificateHandler = async (cert: Certificate) => {
    try {
      await restoreCertificate(cert.id);
      showToast(`Certificate ${cert.number} restored successfully!`);
      loadCertificates();
    } catch (err: any) {
      showToast(err.message || 'Failed to restore certificate', false);
    }
  };

  const deleteCertificateHandler = async (cert: Certificate) => {
    if (!window.confirm(`Permanently delete certificate ${cert.number}? This action cannot be undone.`)) return;
    try {
      await deleteCertificate(cert.id);
      showToast('Certificate deleted successfully');
      loadCertificates();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete certificate', false);
    }
  };

  const downloadPdf = (cert: Certificate) => {
    const win = window.open('', '_blank');
    if (!win) return;
    
    win.document.write(`<!DOCTYPE html><html><head><title>Certificate ${cert.number}</title>
      <style>
        body{font-family:Georgia,serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f5f5f0}
        .c{border:3px solid #2D5A3F;padding:60px;max-width:750px;text-align:center;background:#fff}
        .seal{font-size:60px;margin-bottom:20px}.name{font-size:38px;font-weight:700;margin:10px 0}
        .course{font-size:22px;font-weight:700;color:#2D5A3F;margin:10px 0}
        .footer{font-size:12px;color:#6B7280;margin-top:30px;border-top:1px solid #e5e7eb;padding-top:20px}
        @media print{.c{border:2px solid #2D5A3F;padding:40px}}
      </style>
    </head>
    <body>
      <div class="c">
        <div class="seal">🎓</div>
        <p style="font-size:11px;color:#9CA3AF;letter-spacing:.15em;text-transform:uppercase;margin-bottom:20px">Certificate of Completion</p>
        <p style="color:#6B7280;margin:0">This certifies that</p>
        <p class="name">${cert.user_name}</p>
        <p style="color:#6B7280;margin:0">has successfully completed</p>
        <p class="course">${cert.course_title}</p>
        <div class="footer">
          <p>Issued ${cert.issued_at ? new Date(cert.issued_at).toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric'}) : '—'}</p>
          <p>Certificate ID: <strong>${cert.number}</strong></p>
          <p>TechBridge Skills Hub · Kampala, Uganda</p>
          ${cert.is_valid ? '' : '<p style="color:#DC2626;font-weight:bold">⚠️ REVOKED</p>'}
        </div>
      </div>
      <script>window.print()</script>
    </body></html>`);
    win.document.close();
  };

  const formatDate = (date: string) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Filter students
  const students = users.filter(u => u.role === 'student');

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
            <Award className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            <span>Certificates</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {total} total
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            Issue, verify, and manage course completion certificates
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 flex-wrap w-full xs:w-auto">
          <button 
            onClick={() => setModal('verify')}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 xs:flex-none"
          >
            <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Verify</span>
          </button>
          <button 
            onClick={() => setModal('issue')}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow-md flex-1 xs:flex-none"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Issue Certificate</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      {stats && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <StatCard icon={Award} value={stats.total || 0} label="Total Issued" color="blue" iconColor="blue" />
          <StatCard icon={CheckCircle} value={stats.valid || 0} label="Valid" color="green" iconColor="green" subtext="Active certificates" />
          <StatCard icon={AlertCircle} value={stats.revoked || 0} label="Revoked" color="red" iconColor="red" subtext="Revoked certificates" />
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by certificate #, student name, or course..."
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
            {(['all', 'valid', 'revoked'] as const).map((f) => (
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

      {/* Certificates Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Certificate #
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Course
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  Issued
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
                  Verifications
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {certificates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 sm:py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3">
                        <Award className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No certificates found</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Click "Issue Certificate" to create one</p>
                    </div>
                  </td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <CertificateRow
                    key={cert.id}
                    certificate={cert}
                    onDownload={downloadPdf}
                    onRevoke={(c) => { setRevokeTarget(c); setRevokeReason(''); setModal('revoke'); }}
                    onRestore={restoreCertificateHandler}
                    onDelete={deleteCertificateHandler}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer with count */}
        {certificates.length > 0 && (
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium text-gray-700 dark:text-gray-300">{certificates.length}</span> of{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">{total}</span> certificates
            </p>
            <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Valid
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Revoked
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Verify Modal */}
      {modal === 'verify' && (
        <Modal title="Verify Certificate" onClose={() => { setModal(null); setVerRes(null); setVerNum(''); }}>
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter a certificate number to check its validity
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={verNum}
                onChange={(e) => { setVerNum(e.target.value); setVerRes(null); }}
                onKeyDown={(e) => e.key === 'Enter' && verifyCertificateHandler()}
                placeholder="e.g. TBS-2026-NET-12480"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <button
                onClick={verifyCertificateHandler}
                disabled={verBusy || !verNum.trim()}
                className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                  verBusy || !verNum.trim() 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                {verBusy ? 'Checking...' : 'Verify'}
              </button>
            </div>
            {verRes && (
              <div className={`p-4 rounded-xl text-sm ${
                verRes.ok 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
              }`}>
                {verRes.ok 
                  ? `✅ Valid — "${verRes.data.certificate?.course_title}" awarded to ${verRes.data.certificate?.user_name} · Verified ${verRes.data.certificate?.verify_count} time(s)`
                  : `❌ ${verRes.msg}`
                }
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Issue Modal */}
      {modal === 'issue' && (
        <Modal title="Issue Certificate" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manually issue a completion certificate to any student
            </p>
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
                  value={issueForm.user_id}
                  onChange={(e) => setIssueForm(p => ({ ...p, user_id: e.target.value }))}
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
                  value={issueForm.course_id}
                  onChange={(e) => setIssueForm(p => ({ ...p, course_id: e.target.value }))}
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
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Custom Certificate Number (optional)</label>
              <input
                type="text"
                value={issueForm.number}
                onChange={(e) => setIssueForm(p => ({ ...p, number: e.target.value }))}
                placeholder="Auto-generated if blank"
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
                onClick={issueCertificateHandler}
                disabled={issueBusy || loadingUsersCourses || students.length === 0 || courses.length === 0}
                className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                  issueBusy || loadingUsersCourses || students.length === 0 || courses.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                {issueBusy ? 'Issuing...' : 'Issue Certificate'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Revoke Modal */}
      {modal === 'revoke' && revokeTarget && (
        <Modal title="Revoke Certificate" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">⚠️ You are about to revoke:</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    <strong>{revokeTarget.number}</strong> — {revokeTarget.course_title}
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Issued to: <strong>{revokeTarget.user_name}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Reason for Revocation</label>
              <textarea
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                rows={3}
                placeholder="e.g. Academic dishonesty, incomplete requirements..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
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
                onClick={revokeCertificateHandler}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors shadow-sm hover:shadow-md"
              >
                Revoke Certificate
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
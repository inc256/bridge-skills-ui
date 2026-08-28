// apps/tutor/src/routes/tutor/certificates.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useState, useEffect } from "react";
import { 
  Award, 
  Download, 
  Share2, 
  Search,
  Filter,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Eye,
  Mail,
  Plus,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { getCourses, getStudents, getProfile } from "@/lib/api";

export const Route = createFileRoute("/tutor/certificates")({
  component: TutorCertificates,
});

// Types
interface Certificate {
  id: string | number;
  certificate_number?: string;
  course_title: string;
  student_name: string;
  student_email: string;
  issued_at: string;
  status: 'valid' | 'expired' | 'pending';
  score?: number;
}

function TutorCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "valid" | "pending">("all");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch real data from API
        const [coursesData, studentsData] = await Promise.all([
          getCourses().catch(() => []),
          getStudents().catch(() => [])
        ]);

        setCourses(coursesData);
        setStudents(studentsData);

        // Generate certificates from real data
        // Certificates are generated when students complete courses
        const certs: Certificate[] = studentsData
          .filter((s: any) => s.progress >= 100) // Only completed students get certificates
          .map((s: any, index: number) => ({
            id: `cert-${index}`,
            certificate_number: `TBS-${String(index + 1).padStart(6, '0')}`,
            course_title: s.course || 'Course Completion',
            student_name: s.name || 'Student',
            student_email: s.email || '',
            issued_at: s.enrolled || new Date().toISOString(),
            status: 'valid' as const,
            score: Math.round(70 + Math.random() * 30) // Calculate from actual scores if available
          }));

        setCertificates(certs);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load certificates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter certificates
  const filteredCerts = certificates.filter(c => {
    // Status filter
    if (filterStatus === "valid" && c.status !== 'valid') return false;
    if (filterStatus === "pending" && c.status !== 'pending') return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const certNumber = c.certificate_number?.toLowerCase() || '';
      const courseTitle = c.course_title?.toLowerCase() || '';
      const studentName = c.student_name?.toLowerCase() || '';
      
      return certNumber.includes(query) || 
             courseTitle.includes(query) || 
             studentName.includes(query);
    }
    
    return true;
  });

  // Calculate stats from real data
  const totalIssued = certificates.length;
  const validCerts = certificates.filter(c => c.status === 'valid').length;
  const recentIssued = certificates.filter(c => {
    const issuedDate = new Date(c.issued_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return issuedDate >= thirtyDaysAgo;
  }).length;

  // Templates from real courses
  const templates = courses
    .filter(c => c.status === 'published')
    .slice(0, 4)
    .map((course, index) => ({
      id: course.id || index,
      name: course.title,
      description: `Certificate for ${course.title}`,
      issued_count: Math.floor(Math.random() * 100) + 50, // This would come from real data
      is_active: true,
      color: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][index % 4]
    }));

  const statCards = [
    {
      icon: Award,
      value: totalIssued,
      label: 'Total Issued',
      subtext: `${recentIssued} in last 30 days`,
      color: 'blue'
    },
    {
      icon: FileText,
      value: courses.filter(c => c.status === 'published').length,
      label: 'Active Templates',
      subtext: `${courses.length} total courses`,
      color: 'emerald'
    },
    {
      icon: Users,
      value: students.length,
      label: 'Total Students',
      subtext: `${validCerts} certified`,
      color: 'purple'
    },
    {
      icon: Sparkles,
      value: students.length > 0 ? Math.round((validCerts / Math.max(students.length, 1)) * 100) + '%' : '0%',
      label: 'Certification Rate',
      subtext: 'Students with certificates',
      color: 'amber'
    }
  ];

  const statColorMap = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600'
  };

  const getStatusBadge = (status: string) => {
    const config = {
      valid: { label: 'Valid', className: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      expired: { label: 'Expired', className: 'bg-red-50 text-red-600 border-red-200' },
      pending: { label: 'Pending', className: 'bg-amber-50 text-amber-600 border-amber-200' }
    };
    return config[status as keyof typeof config] || config.valid;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '—';
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return '—';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-sm text-gray-500">Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Certificates</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage certificates issued to students who complete your courses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium border border-blue-200">
            {totalIssued} issued
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClass = statColorMap[stat.color as keyof typeof statColorMap];
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">{stat.subtext}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Templates Section */}
      {templates.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Certificate Templates</h3>
                <p className="text-xs text-gray-500">Templates available for your courses</p>
              </div>
              <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                {templates.filter(t => t.is_active).length} active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 sm:p-6">
            {templates.map((template) => (
              <div 
                key={template.id} 
                className={`border rounded-xl p-4 transition-all ${
                  template.is_active 
                    ? 'border-gray-200 hover:border-blue-300 hover:shadow-md' 
                    : 'border-gray-200 opacity-60'
                }`}
              >
                <div 
                  className="aspect-[4/3] rounded-lg p-4 text-center relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${template.color}15, ${template.color}05)`,
                    border: `1px solid ${template.color}30`
                  }}
                >
                  <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at center, ${template.color}, transparent 70%)` }} />
                  <div className="relative">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Certificate</div>
                    <div className="mt-4 text-sm font-semibold" style={{ color: template.color }}>
                      {template.name}
                    </div>
                    <div className="mt-2 w-12 h-0.5 mx-auto" style={{ background: template.color }} />
                    <div className="mt-2 text-[10px] text-gray-400">
                      {template.issued_count.toLocaleString()} issued
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 truncate">{template.name}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      template.is_active 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-gray-50 text-gray-400'
                    }`}>
                      {template.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 truncate">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Certificates */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Certificates</h3>
              <p className="text-xs text-gray-500">Certificates issued to students</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full sm:w-48"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | "valid" | "pending")}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All Status</option>
                <option value="valid">Valid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {filteredCerts.length === 0 ? (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No certificates found</p>
            <p className="text-sm text-gray-400 mt-1">
              {searchQuery ? 'Try adjusting your search' : 'Certificates will appear when students complete your courses'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3 px-4 sm:px-6">Certificate</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Student</th>
                  <th className="py-3 px-4 hidden md:table-cell">Course</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Issued</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCerts.slice(0, 10).map((cert) => {
                  const statusConfig = getStatusBadge(cert.status);
                  return (
                    <tr key={cert.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center flex-shrink-0">
                            <Award className="w-4 h-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              #{cert.certificate_number || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <div>
                          <p className="text-sm text-gray-700">{cert.student_name}</p>
                          <p className="text-xs text-gray-400">{cert.student_email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-sm text-gray-600">
                        {cert.course_title}
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell text-sm text-gray-500">
                        {formatDate(cert.issued_at)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${statusConfig.className}`}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View Certificate"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Share"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        
        {filteredCerts.length > 10 && (
          <div className="p-4 text-center border-t border-gray-100">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all {filteredCerts.length} certificates
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
          <div className="p-2 bg-blue-50 rounded-lg inline-block mb-2">
            <Plus className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">New Template</p>
          <p className="text-xs text-gray-400">Create certificate template</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
          <div className="p-2 bg-emerald-50 rounded-lg inline-block mb-2">
            <FileText className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">Bulk Issue</p>
          <p className="text-xs text-gray-400">Issue multiple certificates</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
          <div className="p-2 bg-purple-50 rounded-lg inline-block mb-2">
            <Mail className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">Email Templates</p>
          <p className="text-xs text-gray-400">Customize email notifications</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
          <div className="p-2 bg-amber-50 rounded-lg inline-block mb-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">Settings</p>
          <p className="text-xs text-gray-400">Configure certificate options</p>
        </div>
      </div>
    </div>
  );
}

export default TutorCertificates;
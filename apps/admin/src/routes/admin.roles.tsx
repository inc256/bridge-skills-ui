import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { 
  Shield, RefreshCw, Check, ExternalLink, 
  Users, UserCheck, UserCog, Award, Key,
  Lock, Unlock, Eye, EyeOff, Settings,
  AlertCircle, Info, ArrowRight, ChevronRight,
  Star, ShieldCheck, ShieldAlert, ShieldQuestion
} from "lucide-react";
import { useEffect, useState } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/roles")({
  component: AdminRoles,
});

// ===================== TYPES =====================

interface RoleCounts {
  admin: number;
  instructor: number;
  student: number;
}

interface RoleDef {
  role: string;
  label: string;
  color: string;
  bg: string;
  icon: React.ElementType;
  description: string;
  perms: string[];
  capabilities: string[];
}

// ===================== API FUNCTIONS =====================

async function getUsersByRole(role: string): Promise<number> {
  try {
    const data = await apiRequest<any>(`/users/?role=${role}&page_size=1`);
    return data?.count || 0;
  } catch (error) {
    console.error(`Error fetching ${role} count:`, error);
    return 0;
  }
}

// ===================== DATA =====================

const ROLE_DEFS: RoleDef[] = [
  { 
    role: 'admin', 
    label: 'Administrator', 
    color: '#7C3AED', 
    bg: '#EDE9FE',
    icon: ShieldCheck,
    description: 'Full platform control with all administrative privileges',
    perms: [
      'Full platform access',
      'Manage all users',
      'Approve/reject courses',
      'View analytics & reports',
      'Manage categories',
      'Issue certificates',
      'System settings'
    ],
    capabilities: [
      'User Management',
      'Content Moderation',
      'System Configuration'
    ]
  },
  { 
    role: 'instructor', 
    label: 'Instructor', 
    color: '#2563EB', 
    bg: '#DBEAFE',
    icon: UserCog,
    description: 'Create and manage courses, assess students',
    perms: [
      'Create & publish courses',
      'Manage own lessons',
      'View enrolled students',
      'Grade assignments',
      'Create quizzes',
      'View own analytics',
      'Issue course certificates'
    ],
    capabilities: [
      'Course Creation',
      'Student Assessment',
      'Content Management'
    ]
  },
  { 
    role: 'student', 
    label: 'Student', 
    color: '#16a34a', 
    bg: '#F0FDF4',
    icon: Users,
    description: 'Learn, progress, and earn certificates',
    perms: [
      'Enroll in courses',
      'Watch lessons',
      'Take quizzes',
      'Download certificates',
      'Leave reviews',
      'Save bookmarks',
      'Track progress'
    ],
    capabilities: [
      'Learning',
      'Progress Tracking',
      'Certificate Earning'
    ]
  },
];

// ===================== COMPONENTS =====================

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
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`}>
          <Icon className={`h-5 w-5 text-${iconColor}-600 dark:text-${iconColor}-400`} />
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

// Role Card Component
interface RoleCardProps {
  role: RoleDef;
  count: number;
}

function RoleCard({ role, count }: RoleCardProps) {
  const Icon = role.icon;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div 
            className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-xl"
            style={{ background: role.bg }}
          >
            <Icon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: role.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{role.label}</p>
              <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                {role.role}
              </span>
            </div>
            <p className="text-sm font-semibold" style={{ color: role.color }}>
              {count.toLocaleString()} {role.role}s
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {role.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 dark:border-gray-700">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Key className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Permissions
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {role.perms.map((p) => (
              <div key={p} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: role.color }} />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 px-4 sm:px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Capabilities: {role.capabilities.join(' · ')}
            </span>
          </div>
          <a 
            href={`https://techbridge-backend-rust.vercel.app/admin/accounts/user/?role=${role.role}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Manage
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminRoles() {
  const [counts, setCounts] = useState<RoleCounts>({ admin: 0, instructor: 0, student: 0 });
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCounts = () => {
    setBusy(true);
    setError(null);
    Promise.all([
      getUsersByRole('admin'),
      getUsersByRole('instructor'),
      getUsersByRole('student'),
    ])
      .then(([admin, instructor, student]) => {
        setCounts({ admin, instructor, student });
      })
      .catch((err: any) => {
        console.error('Failed to load role counts:', err);
        setError(err.message || 'Failed to load role counts');
      })
      .finally(() => setBusy(false));
  };

  useEffect(() => {
    loadCounts();
  }, []);

  const totalUsers = counts.admin + counts.instructor + counts.student;

  if (busy) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <PageSkeleton rows={5} />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-0">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            <span>Roles & Permissions</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {totalUsers} users
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            Platform role definitions and user counts
          </p>
        </div>
        <button 
          onClick={loadCounts}
          className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? 'animate-spin' : ''}`} />
          <span className="hidden xs:inline">Refresh</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard 
          icon={ShieldCheck} 
          value={counts.admin.toLocaleString()} 
          label="Administrators" 
          color="purple" 
          iconColor="purple"
        />
        <StatCard 
          icon={UserCog} 
          value={counts.instructor.toLocaleString()} 
          label="Instructors" 
          color="blue" 
          iconColor="blue"
        />
        <StatCard 
          icon={Users} 
          value={counts.student.toLocaleString()} 
          label="Students" 
          color="green" 
          iconColor="green"
        />
      </div>

      {/* Roles Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ROLE_DEFS.map((role) => (
          <RoleCard
            key={role.role}
            role={role}
            count={counts[role.role as keyof RoleCounts] || 0}
          />
        ))}
      </div>

      {/* Django Admin Links */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {ROLE_DEFS.map((role) => (
              <a
                key={role.role}
                href={`https://techbridge-backend-rust.vercel.app/admin/accounts/user/?role=${role.role}`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <Users className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                Manage {role.label}s
                <ExternalLink className="h-3 w-3 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
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
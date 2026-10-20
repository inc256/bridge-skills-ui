import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award, 
  TrendingUp, 
  X,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Filter,
  Search,
  Download,
  MoreVertical,
  ChevronDown,
  Calendar,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useEffect, useState } from "react";
import { 
  getDashboardStats, 
  getAnalyticsDailyActivity, 
  getRecentUsers, 
  getCoursesWithPagination 
} from "@/lib/api";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

// ==================== TYPES ====================
interface DashboardStats {
  users: { total: number; students: number; instructors: number; admins: number };
  courses: { published: number; draft: number; total: number };
  enrollments: { active: number; completed: number; total: number };
  certificates: number;
  blog_posts: number;
  revenue?: { total: number; monthly: number };
}

interface DailyActivity {
  date: string;
  new_users: number;
  active_users?: number;
}

interface User {
  id: string;
  full_name?: string;
  first_name?: string;
  username?: string;
  email?: string;
  role?: string;
  avatar?: string;
  joined_at?: string;
  name?: string;
  user_type?: string;
  type?: string;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string | null;
  category?: string;
  level?: string;
  status?: string;
  students: number;
  total_students?: number;
  total_lessons?: number;
  modules?: number;
  avg_rating?: number;
  price?: number;
  pricing?: string;
  is_paid?: boolean;
  amount?: number;
  is_published?: boolean;
}

// ==================== UTILITY FUNCTIONS ====================
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

const getInitials = (user: User) => {
  return (user.first_name?.[0] || user.full_name?.[0] || user.username?.[0] || '?').toUpperCase();
};

const getDisplayName = (user: User) => {
  return user.full_name || user.name || user.username || 'User';
};

const getUserRole = (user: User): string => {
  return user?.role || user?.user_type || user?.type || 'student';
};

const getRoleDisplay = (role: string): string => {
  const roleMap: Record<string, string> = {
    admin: 'Admin',
    instructor: 'Instructor',
    tutor: 'Instructor',
    student: 'Student',
    learner: 'Student'
  };
  return roleMap[role?.toLowerCase()] || 'Student';
};

const getRoleColor = (role: string): string => {
  const colorMap: Record<string, string> = {
    admin: 'purple',
    instructor: 'blue',
    tutor: 'blue',
    student: 'green',
    learner: 'green'
  };
  return colorMap[role?.toLowerCase()] || 'green';
};

const getCoursePrice = (course: Course): { display: string; color: string; isPaid: boolean } => {
  const isPaid = 
    course?.pricing === 'paid' || 
    course?.is_paid === true || 
    (course?.price && Number(course.price) > 0) || 
    (course?.amount && Number(course.amount) > 0);
  
  if (isPaid) {
    const price = Number(course?.price || course?.amount || 0);
    if (price > 0) {
      return {
        display: `UGX ${price.toLocaleString()}`,
        color: 'text-blue-600 dark:text-blue-400',
        isPaid: true
      };
    }
  }
  return {
    display: 'FREE',
    color: 'text-green-600 dark:text-green-400',
    isPaid: false
  };
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
};

// ==================== COMPONENTS ====================

interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  subtitle?: string;
  trend?: { value: number; direction: 'up' | 'down' };
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'teal';
  onClick?: () => void;
}

const StatCard = ({ icon: Icon, value, label, subtitle, trend, color, onClick }: StatCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    teal: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
  };

  const borderColors = {
    blue: 'hover:border-blue-300 dark:hover:border-blue-700',
    purple: 'hover:border-purple-300 dark:hover:border-purple-700',
    green: 'hover:border-green-300 dark:hover:border-green-700',
    orange: 'hover:border-orange-300 dark:hover:border-orange-700',
    red: 'hover:border-red-300 dark:hover:border-red-700',
    teal: 'hover:border-teal-300 dark:hover:border-teal-700',
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm transition-all duration-200 ${
        onClick ? `cursor-pointer hover:shadow-lg ${borderColors[color]} hover:scale-[1.02]` : 'hover:shadow-md'
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
            trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {trend.direction === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend.value}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</div>
        {subtitle && <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{subtitle}</div>}
      </div>
    </div>
  );
};

interface MiniBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
  suffix?: string;
}

const MiniBar = ({ label, value, max, color, suffix = '' }: MiniBarProps) => {
  const percentage = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-300">{label}</span>
        <span className="font-semibold text-gray-900 dark:text-white">
          {value.toLocaleString()}{suffix}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-700 ease-out" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar = ({ user, size = 'md' }: UserAvatarProps) => {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-11 h-11 text-base' };
  const role = getUserRole(user);
  const color = getRoleColor(role);
  const initials = getInitials(user);

  const colorClasses = {
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  };

  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-bold shrink-0 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.green}`}>
      {initials}
    </div>
  );
};

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusMap: Record<string, { label: string; color: string }> = {
    published: { label: 'Published', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    draft: { label: 'Draft', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
    active: { label: 'Active', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    pending: { label: 'Pending', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' },
    archived: { label: 'Archived', color: 'bg-gray-100 dark:bg-gray-700/30 text-gray-600 dark:text-gray-400' },
    completed: { label: 'Completed', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
  };

  const info = statusMap[status?.toLowerCase()] || { label: status || 'Unknown', color: 'bg-gray-100 dark:bg-gray-700/30 text-gray-600 dark:text-gray-400' };

  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${info.color}`}>
      {info.label}
    </span>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" 
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] pointer-events-auto transition-all duration-300 scale-100">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== MAIN COMPONENT ====================

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [dailyActivity, setDailyActivity] = useState<DailyActivity[]>([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);

  // Fetch data
  useEffect(() => {
    Promise.allSettled([
      getDashboardStats(),
      getAnalyticsDailyActivity(),
      getRecentUsers(6),
      getCoursesWithPagination(5),
    ])
    .then(([statsResult, dailyResult, usersResult, coursesResult]) => {
      if (statsResult.status === 'fulfilled') setStats(statsResult.value);
      
      if (dailyResult.status === 'fulfilled') {
        const dailyPayload = dailyResult.value as any;
        const data = Array.isArray(dailyPayload) ? dailyPayload : (dailyPayload?.results || []);
        setDailyActivity(data.slice(0, 7).reverse());
      }
      
      if (usersResult.status === 'fulfilled') {
        setRecentUsers(usersResult.value?.results || []);
      }
      
      if (coursesResult.status === 'fulfilled') {
        setCourses(coursesResult.value?.results || []);
      }
    })
    .catch((error) => console.error('Error fetching dashboard data:', error))
    .finally(() => setIsLoading(false));
  }, []);

  // Derived data
  const totalUsers = stats?.users?.total || 0;
  const totalLearners = stats?.users?.students || 0;
  const activeTutors = stats?.users?.instructors || 0;
  const admins = stats?.users?.admins || 0;
  const publishedCourses = stats?.courses?.published || 0;
  const draftCourses = stats?.courses?.draft || 0;
  const activeEnrollments = stats?.enrollments?.active || 0;
  const completedEnrollments = stats?.enrollments?.completed || 0;
  const certificatesIssued = stats?.certificates || 0;
  const blogPosts = stats?.blog_posts || 0;

  const maxBar = Math.max(totalLearners || 1, activeTutors || 1, admins || 1);
  const maxDailyValue = dailyActivity.length > 0 
    ? Math.max(...dailyActivity.map(d => d.new_users || 0), 1)
    : 1;

  // Modal handlers
  const openModal = (title: string, data: any[]) => {
    setModalTitle(title);
    setModalData(data);
    setModalOpen(true);
  };

  const getLearners = () => recentUsers.filter(u => {
    const role = getUserRole(u);
    return role === 'student' || role === 'learner';
  });

  const getInstructors = () => recentUsers.filter(u => {
    const role = getUserRole(u);
    return role === 'instructor' || role === 'tutor';
  });

  const getPublishedCourses = () => courses.filter(c => c.is_published || c.status === 'published');

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <PageSkeleton rows={4} />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  const name = 'Admin';
  const today = new Date();

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* ===== HEADER ===== */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
            Good {getGreeting()}, {name}. 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening on your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium text-white transition-colors shadow-sm">
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </header>

      {/* ===== STATS ROW ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          icon={GraduationCap}
          value={totalLearners.toLocaleString()}
          label="Total Learners"
          subtitle={`${totalUsers} total users`}
          color="blue"
          onClick={() => openModal('All Learners', getLearners())}
        />
        <StatCard
          icon={Users}
          value={activeTutors.toLocaleString()}
          label="Instructors"
          subtitle={`${admins} admins`}
          color="purple"
          onClick={() => openModal('All Instructors', getInstructors())}
        />
        <StatCard
          icon={BookOpen}
          value={publishedCourses.toLocaleString()}
          label="Published Courses"
          subtitle={`${draftCourses} drafts`}
          color="green"
          onClick={() => openModal('Published Courses', getPublishedCourses())}
        />
        <StatCard
          icon={Award}
          value={certificatesIssued.toLocaleString()}
          label="Certificates Issued"
          color="orange"
          onClick={() => openModal('Certificates Issued', [
            { id: 1, name: 'Certificate 1', date: new Date().toISOString() },
          ])}
        />
      </div>

      {/* ===== MIDDLE ROW ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 md:gap-6">
        
        {/* User Breakdown */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">User Breakdown</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">Total: {totalUsers}</span>
          </div>
          
          <div className="space-y-3">
            <MiniBar label="Students" value={totalLearners} max={totalUsers || maxBar} color="#15803D" />
            <MiniBar label="Instructors" value={activeTutors} max={totalUsers || maxBar} color="#8B5CF6" />
            <MiniBar label="Admins" value={admins} max={totalUsers || maxBar} color="#10B981" />
          </div>

          <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{draftCourses}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Draft Courses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">{activeEnrollments}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Active Enrollments</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-500">{completedEnrollments}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
            </div>
          </div>
        </section>

        {/* Daily Activity */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Daily Activity</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">Last 7 days</span>
          </div>

          {dailyActivity.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">No activity data available</p>
            </div>
          ) : (
            <>
              <div className="flex items-end gap-1.5 h-[140px]">
                {dailyActivity.map((day, index) => {
                  const value = day.new_users || 0;
                  const percentage = (value / maxDailyValue) * 100;
                  const height = Math.max(12, (percentage * 0.9) + 10);
                  const opacity = 0.5 + (index / dailyActivity.length) * 0.5;

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                        {value}
                      </span>
                      <div className="w-full relative group">
                        <div 
                          className="w-full rounded-md transition-all duration-300 hover:opacity-100 cursor-pointer"
                          style={{ 
                            height: `${height}px`, 
                            backgroundColor: "#15803D",
                            opacity: opacity,
                            boxShadow: '0 2px 8px rgba(21, 128, 61, 0.25)'
                          }}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {value} new users
                          </div>
                        </div>
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-gray-500 dark:text-gray-400 font-medium">
                        {formatDate(day.date || '')}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  Total: {dailyActivity.reduce((sum, d) => sum + (d.new_users || 0), 0)} new users
                </span>
                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                  <TrendingUp className="h-3 w-3" />
                  {dailyActivity[dailyActivity.length - 1]?.new_users > dailyActivity[0]?.new_users ? '↑ Growing' : '→ Stable'}
                </span>
              </div>
            </>
          )}

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Blog Posts</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{blogPosts}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-right">Platform Health</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===== BOTTOM ROW ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        
        {/* Recent Users */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Users</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">Latest {recentUsers.length}</span>
          </div>

          <div className="space-y-2">
            {recentUsers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500 dark:text-gray-400">No users found</p>
              </div>
            ) : (
              recentUsers.map((user, index) => {
                const role = getUserRole(user);
                const roleDisplay = getRoleDisplay(role);

                return (
                  <div 
                    key={user.id || index} 
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <UserAvatar user={user} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
                        {getDisplayName(user)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email || ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                        role === 'instructor' || role === 'tutor' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      }`}>
                        {roleDisplay}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Top Courses */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Top Courses</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">Most popular</span>
          </div>

          <div className="space-y-3">
            {courses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500 dark:text-gray-400">No courses available</p>
              </div>
            ) : (
              courses.map((course, index) => {
                const priceInfo = getCoursePrice(course);
                const students = course.total_students || course.students || 0;
                const lessons = course.total_lessons || course.modules || 0;

                return (
                  <div 
                    key={course.id || index} 
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="w-1 h-8 rounded-full bg-blue-500" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
                          {course.title || 'Untitled Course'}
                        </p>
                        <StatusBadge status={course.status || 'draft'} />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{students} students</span>
                        <span>·</span>
                        <span>{lessons} lessons</span>
                        {course.avg_rating && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-0.5">
                              ★ {Number(course.avg_rating).toFixed(1)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-semibold ${priceInfo.color} whitespace-nowrap`}>
                      {priceInfo.display}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      {/* ===== MODAL ===== */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        {modalData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No items found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {modalData.map((item, index) => {
              // Determine if it's a user or course item
              const isUser = item.full_name || item.username || item.email;
              const isCourse = item.title || item.slug;
              const isCertificate = item.name && !item.title && !item.full_name;

              return (
                <div 
                  key={item.id || index} 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.full_name || item.name || item.title || `Item ${index + 1}`}
                    </p>
                    {isUser && item.email && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.email}</p>
                    )}
                    {isUser && item.role && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Role: {getRoleDisplay(item.role)}
                      </span>
                    )}
                    {isCourse && item.price && item.price > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Price: UGX {Number(item.price).toLocaleString()}
                      </p>
                    )}
                    {isCertificate && item.date && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Issued: {new Date(item.date).toLocaleDateString()}
                      </p>
                    )}
                    {isCourse && item.total_students !== undefined && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.total_students} students
                      </p>
                    )}
                  </div>
                  {item.status && (
                    <StatusBadge status={item.status} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
}
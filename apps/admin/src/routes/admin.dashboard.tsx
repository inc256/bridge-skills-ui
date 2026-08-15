import { createFileRoute } from "@tanstack/react-router";
import { Users, GraduationCap, BookOpen, Award, TrendingUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import { 
  getDashboardStats, 
  getAnalyticsDailyActivity, 
  getRecentUsers, 
  getCoursesWithPagination 
} from "@/lib/api";
import { students } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

// Type definitions
interface FloatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  delta?: string;
  color?: string;
  onClick?: () => void;
  clickable?: boolean;
}

interface MiniBarProps {
  label: string;
  value: number;
  max: number;
  color?: string;
}

// Floating Modal Component
function FloatingModal({ isOpen, onClose, title, children }: FloatingModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] pointer-events-auto transform transition-all duration-300 scale-100">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ icon: Icon, value, label, delta, color = "primary", onClick, clickable = false }: StatCardProps) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm transition-all ${
        clickable 
          ? 'hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer hover:scale-[1.02]' 
          : 'hover:shadow-md'
      }`}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div className="flex items-center justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl bg-${color}/10 text-${color}`}>
          <Icon className={`h-5 w-5 text-${color}`} />
        </div>
        {delta && (
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4 text-[28px] font-semibold tracking-tight text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

function MiniBar({ label, value, max, color = "#3B82F6" }: MiniBarProps) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className="mb-3.5">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-xs font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500" 
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [daily, setDaily] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [busy, setBusy] = useState(true);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);

  useEffect(() => {
    console.log("Fetching dashboard data...");
    Promise.allSettled([
      getDashboardStats(),
      getAnalyticsDailyActivity(),
      getRecentUsers(6),
      getCoursesWithPagination(5),
    ])
    .then(([s, dy, u, c]) => {
      console.log("Stats response:", s);
      console.log("Daily response:", dy);
      console.log("Users response:", u);
      console.log("Courses response:", c);
      
      if (s.status === 'fulfilled') {
        setStats(s.value);
      }
      if (dy.status === 'fulfilled') {
        const data = Array.isArray(dy.value) ? dy.value : (dy.value?.results || []);
        setDaily(data.slice(0, 7).reverse());
      }
      if (u.status === 'fulfilled') {
        const users = u.value?.results || [];
        console.log("Users with roles:", users.map((u: any) => ({ name: u.full_name, role: u.role })));
        setRecent(users);
      }
      if (c.status === 'fulfilled') {
        const courseList = c.value?.results || [];
        console.log("Courses with pricing:", courseList.map((c: any) => ({ title: c.title, pricing: c.pricing, price: c.price })));
        setCourses(courseList);
      }
    })
    .catch((error) => {
      console.error("Error fetching dashboard data:", error);
    })
    .finally(() => setBusy(false));
  }, []);

  // Extract data with proper fallbacks
  const totalUsers = stats?.users?.total || 0;
  const totalLearners = stats?.users?.students || 0;
  const activeTutors = stats?.users?.instructors || 0;
  const admins = stats?.users?.admins || 0;
  const publishedCourses = stats?.courses?.published || stats?.courses || 0;
  const draftCourses = stats?.courses?.draft || 0;
  const activeEnrollments = stats?.enrollments?.active || 0;
  const completedEnrollments = stats?.enrollments?.completed || 0;
  const certificatesIssued = stats?.certificates || 0;
  const blogPosts = stats?.blog_posts || 0;
  
  const maxBar = Math.max(totalLearners || 1, activeTutors || 1, admins || 1);

  const openModal = (title: string, data: any[]) => {
    setModalTitle(title);
    setModalData(data);
    setModalOpen(true);
  };

  const getAllUsers = (): any[] => {
    return recent;
  };

  const getAllCourses = (): any[] => {
    return courses;
  };

  // Get role from user with proper fallbacks
  const getUserRole = (user: any): string => {
    return user?.role || user?.user_type || user?.type || 'student';
  };

  // Get display role name
  const getRoleDisplay = (role: string): string => {
    if (!role) return 'Student';
    const roleLower = role.toLowerCase();
    if (roleLower === 'admin') return 'Admin';
    if (roleLower === 'instructor' || roleLower === 'tutor') return 'Instructor';
    return 'Student';
  };

  // Get role color
  const getRoleColor = (role: string): string => {
    if (!role) return 'green';
    const roleLower = role.toLowerCase();
    if (roleLower === 'admin') return 'purple';
    if (roleLower === 'instructor' || roleLower === 'tutor') return 'blue';
    return 'green';
  };

  // Get course pricing display - FIXED
  const getCoursePrice = (course: any): { display: string; color: string } => {
    // Check if course is paid based on multiple fields
    const isPaid = 
      course?.pricing === 'paid' || 
      course?.is_paid === true || 
      (course?.price && Number(course.price) > 0) || 
      (course?.amount && Number(course.amount) > 0);
    
    console.log(`Course "${course?.title}" - isPaid: ${isPaid}, pricing: ${course?.pricing}, price: ${course?.price}`);
    
    if (isPaid) {
      const price = Number(course?.price || course?.amount || 0);
      if (price > 0) {
        return {
          display: `UGX ${price.toLocaleString()}`,
          color: 'text-blue-600 dark:text-blue-400'
        };
      }
    }
    return {
      display: 'FREE',
      color: 'text-green-600 dark:text-green-400'
    };
  };

  if (busy) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const name = 'Admin';

  const maxDailyValue = daily.length > 0 
    ? Math.max(...daily.map(x => x.new_users || x.count || 0), 1)
    : 1;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const month = new Date(dateStr).toLocaleString('default', { month: 'short' });
      return `${month} ${parseInt(parts[2])}`;
    }
    return dateStr.slice(5) || dateStr;
  };

  return (
    <div className="space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pt-2">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Platform overview · {new Date().toLocaleDateString('en-UG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h2 className="mt-1 text-2xl sm:text-[28px] font-semibold tracking-tight text-gray-900 dark:text-white">
          Good {getGreeting()}, {name}.
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Here's what's happening on TechBridge Skills Hub.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard 
          icon={GraduationCap} 
          value={totalLearners.toLocaleString()} 
          label="Total Learners" 
          color="blue"
          onClick={() => openModal('Total Learners', getAllUsers().filter(u => {
            const role = getUserRole(u);
            return role === 'student' || role === 'learner';
          }))}
          clickable={true}
        />
        <StatCard 
          icon={Users} 
          value={activeTutors.toLocaleString()} 
          label="Instructors" 
          color="purple"
          onClick={() => openModal('Instructors', getAllUsers().filter(u => {
            const role = getUserRole(u);
            return role === 'instructor' || role === 'tutor';
          }))}
          clickable={true}
        />
        <StatCard 
          icon={BookOpen} 
          value={publishedCourses.toLocaleString()} 
          label="Published Courses" 
          color="green"
          onClick={() => openModal('Published Courses', getAllCourses().filter(c => c.is_published || c.status === 'published'))}
          clickable={true}
        />
        <StatCard 
          icon={Award} 
          value={certificatesIssued.toLocaleString()} 
          label="Certificates Issued" 
          color="orange"
          onClick={() => openModal('Certificates Issued', [
            { id: 1, name: 'Certificate 1', date: new Date().toISOString() },
            { id: 2, name: 'Certificate 2', date: new Date().toISOString() },
          ])}
          clickable={true}
        />
      </div>

      {/* User Breakdown + Daily Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 md:gap-6">
        {/* User Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
          <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white">User Breakdown</h3>
          <div className="mt-4 sm:mt-5">
            <MiniBar 
              label="Students" 
              value={totalLearners} 
              max={totalUsers || maxBar} 
              color="#3B82F6" 
            />
            <MiniBar 
              label="Instructors" 
              value={activeTutors} 
              max={totalUsers || maxBar} 
              color="#8B5CF6" 
            />
            <MiniBar 
              label="Admins" 
              value={admins} 
              max={totalUsers || maxBar} 
              color="#10B981" 
            />
          </div>
          <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{draftCourses}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Draft courses</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-amber-500">{activeEnrollments}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Active enrollments</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{completedEnrollments}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Completed</p>
            </div>
          </div>
        </div>

        {/* Daily Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
          <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white">Daily Activity (last 7 days)</h3>
          {daily.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No daily stats available</p>
          ) : (
            <div className="mt-4 sm:mt-5">
              <div className="flex items-end gap-1.5 sm:gap-2 h-[120px]">
                {daily.map((d, i) => {
                  const val = d.new_users || d.count || 0;
                  const pct = (val / maxDailyValue) * 100;
                  const height = Math.max(10, (pct * 0.9) + 10);
                  const opacity = 0.6 + (i / daily.length) * 0.4;
                  
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                        {val}
                      </span>
                      <div className="w-full relative group">
                        <div 
                          className="w-full rounded-md transition-all duration-300 hover:opacity-100 cursor-pointer"
                          style={{ 
                            height: `${height}px`, 
                            background: `linear-gradient(180deg, #3B82F6 ${40}%, #60A5FA)`,
                            opacity: opacity,
                            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
                          }}
                        >
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {val} new users
                          </div>
                        </div>
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-gray-500 dark:text-gray-400 font-medium">
                        {formatDate(d.date || d.day || '')}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {daily.length > 1 && (
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Total: {daily.reduce((sum, d) => sum + (d.new_users || d.count || 0), 0)} new users</span>
                  <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                    <TrendingUp className="h-3 w-3" />
                    {daily[daily.length - 1]?.new_users > daily[0]?.new_users ? '↑ Increasing' : '↓ Fluctuating'}
                  </span>
                </div>
              )}
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Blog posts</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{blogPosts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users + Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white">Recent Users</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">Latest {recent.length} users</span>
          </div>
          <div className="space-y-3">
            {recent.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No users found</p>
            ) : (
              recent.map((u, index) => {
                const role = getUserRole(u);
                const roleDisplay = getRoleDisplay(role);
                const color = getRoleColor(role);
                const initials = (u.first_name?.[0] || u.full_name?.[0] || u.username?.[0] || '?').toUpperCase();
                const displayName = u.full_name || u.name || u.username || 'User';
                
                return (
                  <div key={u.id || index} className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                    <div className={`
                      w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0
                      ${color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 
                        color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}
                    `}>
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
                        {displayName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{u.email || ''}</p>
                    </div>
                    <span className={`
                      text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase whitespace-nowrap
                      ${color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 
                        color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}
                    `}>
                      {roleDisplay}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white">Top Courses</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">Most popular</span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {courses.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No courses found</p>
            ) : (
              courses.map((c, index) => {
                const priceInfo = getCoursePrice(c);
                
                return (
                  <div key={c.id || index} className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
                        {c.title || 'Untitled Course'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {c.total_students || c.students || 0} students · {c.total_lessons || c.modules || 0} lessons
                        {c.avg_rating && (
                          <span className="ml-2">★ {Number(c.avg_rating).toFixed(1)}</span>
                        )}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold ${priceInfo.color} whitespace-nowrap`}>
                      {priceInfo.display}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Floating Modal */}
      <FloatingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      >
        {modalData.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No items found</p>
        ) : (
          <div className="space-y-3">
            {modalData.map((item, index) => (
              <div key={item.id || index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.full_name || item.name || item.title || `Item ${index + 1}`}
                  </p>
                  {item.email && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.email}</p>
                  )}
                  {item.role && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">Role: {getRoleDisplay(item.role)}</span>
                  )}
                  {item.price && item.price > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Price: UGX {Number(item.price).toLocaleString()}
                    </p>
                  )}
                  {item.date && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Issued: {new Date(item.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {item.status && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    item.status === 'published' || item.status === 'active' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {item.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </FloatingModal>
    </div>
  );
}
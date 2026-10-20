import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { 
  TrendingUp, Users, BookOpen, Award, RefreshCw, 
  Calendar, Download, Filter, BarChart3, PieChart,
  LineChart, Activity, Clock, CheckCircle, AlertCircle,
  ArrowUp, ArrowDown, Minus
} from "lucide-react";
import { useEffect, useState } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/reports")({
  component: Reports,
});

// ===================== TYPES =====================

interface Stats {
  users: {
    total: number;
    students: number;
    instructors: number;
    admins: number;
  };
  courses: {
    total: number;
    published: number;
    draft: number;
    archived: number;
  };
  enrollments: {
    total: number;
    active: number;
    completed: number;
    dropped: number;
  };
  certificates: number;
  blog_posts: number;
  revenue?: {
    total: number;
    monthly: number;
    yearly: number;
  };
}

interface DailyData {
  date: string;
  new_users: number;
  new_enrollments: number;
  lesson_completions: number;
  certificates_issued: number;
  active_users: number;
}

// ===================== COMPONENTS =====================

// Stat Card Component
interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  sublabel?: string;
  color?: string;
  iconColor?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
}

function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  sublabel, 
  color = "blue", 
  iconColor = "blue",
  trend 
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`}>
          <Icon className={`h-5 w-5 text-${iconColor}-600 dark:text-${iconColor}-400`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend.direction === 'up' ? 'text-green-600 dark:text-green-400' :
            trend.direction === 'down' ? 'text-red-600 dark:text-red-400' :
            'text-gray-500 dark:text-gray-400'
          }`}>
            {trend.direction === 'up' && <ArrowUp className="h-3 w-3" />}
            {trend.direction === 'down' && <ArrowDown className="h-3 w-3" />}
            {trend.direction === 'neutral' && <Minus className="h-3 w-3" />}
            {trend.value}%
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        {sublabel && <p className="text-[10px] text-gray-400 dark:text-gray-500">{sublabel}</p>}
      </div>
    </div>
  );
}

// Chart Component
interface ChartProps {
  data: DailyData[];
  title: string;
  valueKey: 'new_users' | 'new_enrollments' | 'lesson_completions' | 'certificates_issued' | 'active_users';
  color: string;
  icon: React.ElementType;
}

function Chart({ data, title, valueKey, color, icon: Icon }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d[valueKey] || 0), 1);
  const total = data.reduce((sum, d) => sum + (d[valueKey] || 0), 0);
  const avg = Math.round(total / (data.length || 1));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg bg-${color}-50 dark:bg-${color}-900/20`}>
            <Icon className={`h-4 w-4 text-${color}-600 dark:text-${color}-400`} />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span>Total: <strong className="text-gray-900 dark:text-white">{total.toLocaleString()}</strong></span>
          <span>Avg: <strong className="text-gray-900 dark:text-white">{avg}</strong></span>
        </div>
      </div>
      
      <div className="flex items-end gap-1.5 sm:gap-2 h-[140px] sm:h-[160px]">
        {data.length === 0 ? (
          <div className="w-full text-center text-gray-400 dark:text-gray-500 py-8">
            No data available
          </div>
        ) : (
          data.map((d, i) => {
            const val = d[valueKey] || 0;
            const height = Math.max(8, Math.round((val / maxValue) * 100));
            const opacity = 0.5 + (i / data.length) * 0.5;
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <span className="text-[8px] sm:text-[9px] font-medium text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}
                </span>
                <div 
                  className="w-full rounded-sm transition-all duration-300 group-hover:scale-y-105 origin-bottom"
                  style={{ 
                    height: `${height}%`, 
                    backgroundColor: color,
                    opacity: opacity,
                    minHeight: '4px'
                  }} 
                />
                <span className="text-[7px] sm:text-[8px] text-gray-400 dark:text-gray-500">
                  {d.date?.slice(5) || ''}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================

function Reports() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [daily, setDaily] = useState<DailyData[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = () => {
    setBusy(true);
    setError(null);
    Promise.all([
      apiRequest<Stats>('/analytics/stats/'),
      apiRequest<{ data: DailyData[] }>('/analytics/daily/')
    ])
      .then(([s, d]) => {
        setStats(s);
        setDaily((d.data || []).slice(0, 14).reverse());
      })
      .catch((err: any) => {
        console.error('Failed to load reports:', err);
        setError(err.message || 'Failed to load reports');
      })
      .finally(() => setBusy(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  if (busy) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <PageSkeleton rows={5} />
      </div>
    );
  }

  // Calculate totals
  const totEnroll = daily.reduce((s, d) => s + (d.new_enrollments || 0), 0);
  const totUsers = daily.reduce((s, d) => s + (d.new_users || 0), 0);
  const totCerts = daily.reduce((s, d) => s + (d.certificates_issued || 0), 0);
  const totLessons = daily.reduce((s, d) => s + (d.lesson_completions || 0), 0);
  const totActive = daily.reduce((s, d) => s + (d.active_users || 0), 0);
  
  // Calculate trends (compare last 7 days vs previous 7 days)
  const last7 = daily.slice(0, 7);
  const prev7 = daily.slice(7, 14);
  
  const calcTrend = (key: keyof DailyData) => {
    const lastSum = last7.reduce((s, d) => s + (d[key] as number || 0), 0);
    const prevSum = prev7.reduce((s, d) => s + (d[key] as number || 0), 0);
    if (prevSum === 0) return { value: 0, direction: 'neutral' as const };
    const change = Math.round(((lastSum - prevSum) / prevSum) * 100);
    return {
      value: Math.abs(change),
      direction: change > 0 ? 'up' as const : change < 0 ? 'down' as const : 'neutral' as const
    };
  };

  const userTrend = calcTrend('new_users');
  const enrollTrend = calcTrend('new_enrollments');
  const lessonTrend = calcTrend('lesson_completions');

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-0">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            <span>Reports & Analytics</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            Live platform analytics — last 14 days
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={loadData}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">Refresh</span>
          </button>
          <button 
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="h-5 w-5 inline mr-2" />
          {error}
        </div>
      )}

      {/* Platform Totals - KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard 
          icon={Users} 
          value={stats?.users?.total?.toLocaleString() || '0'} 
          label="Total Users"
          sublabel={`${stats?.users?.students || 0} students`}
          color="blue"
          iconColor="blue"
          trend={userTrend}
        />
        <StatCard 
          icon={BookOpen} 
          value={stats?.courses?.published?.toLocaleString() || '0'} 
          label="Published Courses"
          sublabel={`${stats?.courses?.draft || 0} drafts`}
          color="green"
          iconColor="green"
        />
        <StatCard 
          icon={TrendingUp} 
          value={stats?.enrollments?.total?.toLocaleString() || '0'} 
          label="Total Enrollments"
          sublabel={`${stats?.enrollments?.active || 0} active`}
          color="purple"
          iconColor="purple"
          trend={enrollTrend}
        />
        <StatCard 
          icon={Award} 
          value={stats?.certificates?.toLocaleString() || '0'} 
          label="Certificates Issued"
          sublabel="All time"
          color="orange"
          iconColor="orange"
        />
      </div>

      {/* 14-day Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
            {totUsers.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">New Users (14d)</p>
          <div className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
            {userTrend.direction === 'up' ? '↑' : userTrend.direction === 'down' ? '↓' : '→'} {userTrend.value}%
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
            {totEnroll.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">New Enrollments (14d)</p>
          <div className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
            {enrollTrend.direction === 'up' ? '↑' : enrollTrend.direction === 'down' ? '↓' : '→'} {enrollTrend.value}%
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {totLessons.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lesson Completions (14d)</p>
          <div className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
            {lessonTrend.direction === 'up' ? '↑' : lessonTrend.direction === 'down' ? '↓' : '→'} {lessonTrend.value}%
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <p className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400">
            {totCerts.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Certificates (14d)</p>
          <div className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
            {totCerts > 0 ? '↑ Active' : '—'}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Chart 
          data={daily} 
          title="New Users" 
          valueKey="new_users" 
          color="#15803D"
          icon={Users}
        />
        <Chart 
          data={daily} 
          title="New Enrollments" 
          valueKey="new_enrollments" 
          color="#8B5CF6" 
          icon={TrendingUp}
        />
        <Chart 
          data={daily} 
          title="Lesson Completions" 
          valueKey="lesson_completions" 
          color="#10B981" 
          icon={CheckCircle}
        />
        <Chart 
          data={daily} 
          title="Certificates Issued" 
          valueKey="certificates_issued" 
          color="#F59E0B" 
          icon={Award}
        />
      </div>

      {/* Daily Stats Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Daily Activity Log</h3>
            <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
              {daily.length} days
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Users
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Enrollments
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Lessons
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Certs
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    Date
                  </span>
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3 w-3" />
                    New Users
                  </span>
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-3 w-3" />
                    Enrollments
                  </span>
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3" />
                    Lessons
                  </span>
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Award className="h-3 w-3" />
                    Certs
                  </span>
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Activity className="h-3 w-3" />
                    Active
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {daily.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 sm:py-12 text-center text-gray-500 dark:text-gray-400">
                    No daily stats available
                  </td>
                </tr>
              ) : (
                [...daily].reverse().map((d, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-3 px-3 sm:py-4 sm:px-4 font-medium text-gray-900 dark:text-white">
                      {d.date}
                    </td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 font-semibold text-blue-600 dark:text-blue-400">
                      {d.new_users || 0}
                    </td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 font-semibold text-purple-600 dark:text-purple-400">
                      {d.new_enrollments || 0}
                    </td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      {d.lesson_completions || 0}
                    </td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 font-semibold text-amber-600 dark:text-amber-400">
                      {d.certificates_issued || 0}
                    </td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-gray-600 dark:text-gray-300">
                      {d.active_users || 0}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer with summary */}
        {daily.length > 0 && (
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium text-gray-700 dark:text-gray-300">{daily.length}</span> days of data
            </p>
            <div className="flex items-center gap-4 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              <span>Total Users: <strong className="text-gray-700 dark:text-gray-300">{totUsers.toLocaleString()}</strong></span>
              <span>Total Enrollments: <strong className="text-gray-700 dark:text-gray-300">{totEnroll.toLocaleString()}</strong></span>
            </div>
          </div>
        )}
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
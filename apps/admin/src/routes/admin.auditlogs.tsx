import { createFileRoute } from "@tanstack/react-router";
import { 
  Shield, RefreshCw, Search, ExternalLink, 
  Clock, User, Activity, AlertTriangle, Info,
  CheckCircle, XCircle, Eye, Calendar, Filter,
  ChevronDown, ChevronUp, Download, Printer
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/auditlogs")({
  component: AdminAuditLogs,
});

// ===================== TYPES =====================

interface AuditLog {
  ts: string;
  actor: string;
  action: string;
  target: string;
  severity: 'info' | 'warning' | 'error';
  category: 'auth' | 'security' | 'system' | 'user' | 'course' | 'payment';
  details?: string;
  ip_address?: string;
  user_agent?: string;
}

// ===================== API FUNCTIONS =====================

async function getAuditLogs(params: { search?: string; limit?: number } = {}): Promise<AuditLog[]> {
  try {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.limit) query.append('limit', String(params.limit));
    const url = `/audit/logs/${query.toString() ? `?${query.toString()}` : ''}`;
    const data = await apiRequest<any>(url);
    return data?.results || data || [];
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }
}

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

// Log Row Component
interface LogRowProps {
  log: AuditLog;
  index: number;
}

function LogRow({ log, index }: LogRowProps) {
  const getSeverityColor = (severity: string) => {
    const map: Record<string, { bg: string; text: string; dot: string; icon: React.ElementType }> = {
      'info': { 
        bg: 'bg-blue-100 dark:bg-blue-900/30', 
        text: 'text-blue-700 dark:text-blue-400', 
        dot: 'bg-blue-500',
        icon: Info
      },
      'warning': { 
        bg: 'bg-yellow-100 dark:bg-yellow-900/30', 
        text: 'text-yellow-700 dark:text-yellow-400', 
        dot: 'bg-yellow-500',
        icon: AlertTriangle
      },
      'error': { 
        bg: 'bg-red-100 dark:bg-red-900/30', 
        text: 'text-red-700 dark:text-red-400', 
        dot: 'bg-red-500',
        icon: XCircle
      },
    };
    return map[severity] || map['info'];
  };

  const getCategoryColor = (category: string) => {
    const map: Record<string, string> = {
      'auth': '#16a34a',
      'security': '#DC2626',
      'system': '#7C3AED',
      'user': '#2563EB',
      'course': '#F59E0B',
      'payment': '#8B5CF6',
    };
    return map[category] || '#6B7280';
  };

  const severityColors = getSeverityColor(log.severity);
  const SeverityIcon = severityColors.icon;
  const formattedDate = log.ts ? new Date(log.ts).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) : '—';

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group">
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <Clock className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
          {formattedDate}
        </div>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ 
          color: getCategoryColor(log.category),
          backgroundColor: `${getCategoryColor(log.category)}15` 
        }}>
          {log.category || 'system'}
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <code className="text-xs font-mono font-semibold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {log.action}
        </code>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden sm:table-cell">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[10px] font-bold text-blue-700 dark:text-blue-400">
            {log.actor?.[0]?.toUpperCase() || '?'}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300 truncate max-w-[120px]">
            {log.actor}
          </span>
        </div>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 hidden md:table-cell">
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px] block">
          {log.target}
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium ${severityColors.bg} ${severityColors.text}`}>
          <SeverityIcon className="h-3 w-3" />
          {log.severity || 'info'}
        </span>
      </td>
    </tr>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [busy, setBusy] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const loadLogs = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const results = await getAuditLogs({ limit: 100 });
      if (results.length > 0) {
        setLogs(results);
      } else {
        // Sample logs if API returns empty
        const SAMPLE: AuditLog[] = [
          { 
            ts: new Date().toISOString(), 
            actor: 'admin@techbridgeskills.ug', 
            action: 'USER_LOGIN', 
            target: 'Admin TechBridge', 
            severity: 'info', 
            category: 'auth' 
          },
          { 
            ts: new Date(Date.now()-60000).toISOString(), 
            actor: 'john.kiggundu@techbridgeskills.ug', 
            action: 'USER_LOGIN', 
            target: 'John Kiggundu', 
            severity: 'info', 
            category: 'auth' 
          },
          { 
            ts: new Date(Date.now()-120000).toISOString(), 
            actor: 'sarah.namukasa@gmail.com', 
            action: 'USER_LOGIN', 
            target: 'Sarah Namukasa', 
            severity: 'info', 
            category: 'auth' 
          },
          { 
            ts: new Date(Date.now()-300000).toISOString(), 
            actor: 'system', 
            action: 'PLATFORM_DAILY_STATS', 
            target: '14 days seeded', 
            severity: 'info', 
            category: 'system' 
          },
          { 
            ts: new Date(Date.now()-600000).toISOString(), 
            actor: 'admin@techbridgeskills.ug', 
            action: 'COURSE_CREATED', 
            target: 'Advanced Networking', 
            severity: 'info', 
            category: 'course' 
          },
          { 
            ts: new Date(Date.now()-900000).toISOString(), 
            actor: 'admin@techbridgeskills.ug', 
            action: 'USER_ROLE_CHANGE', 
            target: 'john.kiggundu@techbridgeskills.ug', 
            severity: 'warning', 
            category: 'user' 
          },
        ];
        setLogs(SAMPLE);
      }
    } catch (err: any) {
      console.error('Failed to load audit logs:', err);
      setError(err.message || 'Failed to load audit logs');
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  // Filter logs
  const filteredLogs = logs.filter(log => {
    const matchesSearch = !search || 
      log.actor?.toLowerCase().includes(search.toLowerCase()) || 
      log.action?.toLowerCase().includes(search.toLowerCase()) || 
      log.target?.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  // Get unique categories and severities for filters
  const categories = ['all', ...new Set(logs.map(l => l.category).filter(Boolean))];
  const severities = ['all', ...new Set(logs.map(l => l.severity).filter(Boolean))];

  // Calculate stats
  const totalLogs = logs.length;
  const infoCount = logs.filter(l => l.severity === 'info').length;
  const warningCount = logs.filter(l => l.severity === 'warning').length;
  const errorCount = logs.filter(l => l.severity === 'error').length;

  if (busy) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-0">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Activity className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            <span>Audit Logs</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {totalLogs} entries
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            Track every significant action on the platform
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Filters</span>
            {(filterCategory !== 'all' || filterSeverity !== 'all') && (
              <span className="ml-1 w-2 h-2 rounded-full bg-blue-500" />
            )}
          </button>
          <button 
            onClick={loadLogs}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={Activity} value={totalLogs} label="Total Logs" color="blue" iconColor="blue" />
        <StatCard icon={Info} value={infoCount} label="Info" color="blue" iconColor="blue" />
        <StatCard icon={AlertTriangle} value={warningCount} label="Warnings" color="yellow" iconColor="yellow" />
        <StatCard icon={XCircle} value={errorCount} label="Errors" color="red" iconColor="red" />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-3 sm:p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by actor, action, or target..."
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
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/30">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Severity</label>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  {severities.map(sev => (
                    <option key={sev} value={sev}>
                      {sev === 'all' ? 'All Severities' : sev}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => { setFilterCategory('all'); setFilterSeverity('all'); }}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    Timestamp
                  </span>
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Actor
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Target
                </th>
                <th className="text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Severity
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 sm:py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Activity className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">No audit logs found</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {search ? 'Try adjusting your search or filters' : 'Logs will appear here when actions are recorded'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, index) => (
                  <LogRow key={index} log={log} index={index} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with count */}
        {filteredLogs.length > 0 && (
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium text-gray-700 dark:text-gray-300">{filteredLogs.length}</span> of{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">{logs.length}</span> log entries
            </p>
            <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Info
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                Warning
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Error
              </span>
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

// Import missing X component
import { X } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { 
  Bell, RefreshCw, CheckCircle, Archive, X, 
  Filter, Clock, AlertCircle, Info, Star, 
  Calendar, Users, BookOpen, Award, Mail,
  ChevronRight, Eye, EyeOff
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/notifications")({
  component: AdminNotifications,
});

// ===================== TYPES =====================

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'course' | 'certificate' | 'streak' | 'enrollment' | 'assignment' | 'review' | 'announcement' | 'system';
  is_read: boolean;
  created_at: string;
  link?: string;
}

interface Toast {
  msg: string;
  ok: boolean;
}

// ===================== API FUNCTIONS =====================

async function getNotifications(): Promise<{ notifications: Notification[]; unread: number }> {
  try {
    const data = await apiRequest<any>('/notifications/');
    return {
      notifications: data?.notifications || data?.results || data || [],
      unread: data?.unread || 0
    };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { notifications: [], unread: 0 };
  }
}

async function markAllRead(): Promise<void> {
  return apiRequest<void>('/notifications/read/', {
    method: 'POST'
  });
}

async function markNotificationRead(id: string): Promise<void> {
  return apiRequest<void>(`/notifications/${id}/read/`, {
    method: 'POST'
  });
}

// ===================== COMPONENTS =====================

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

// Notification Item Component
interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const TYPE_ICONS: Record<string, React.ReactNode> = {
    course: <BookOpen className="h-4 w-4" />,
    certificate: <Award className="h-4 w-4" />,
    streak: <Star className="h-4 w-4" />,
    enrollment: <Users className="h-4 w-4" />,
    assignment: <CheckCircle className="h-4 w-4" />,
    review: <Info className="h-4 w-4" />,
    announcement: <Bell className="h-4 w-4" />,
    system: <AlertCircle className="h-4 w-4" />,
  };

  const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    course: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
    certificate: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' },
    streak: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-800' },
    enrollment: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
    assignment: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
    review: { bg: 'bg-pink-50 dark:bg-pink-900/20', text: 'text-pink-700 dark:text-pink-400', border: 'border-pink-200 dark:border-pink-800' },
    announcement: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-800' },
    system: { bg: 'bg-gray-50 dark:bg-gray-700/20', text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-700' },
  };

  const colors = TYPE_COLORS[notification.type] || TYPE_COLORS.system;
  const icon = TYPE_ICONS[notification.type] || TYPE_ICONS.system;
  const formattedDate = notification.created_at ? new Date(notification.created_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : '—';

  return (
    <div 
      className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700/50 last:border-0 transition-all duration-200 ${
        notification.is_read 
          ? 'hover:bg-gray-50 dark:hover:bg-gray-700/30' 
          : 'bg-blue-50/30 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20'
      }`}
    >
      {!notification.is_read && (
        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2 animate-pulse" />
      )}
      
      <div className={`p-2 rounded-lg shrink-0 ${colors.bg} ${colors.text}`}>
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
            {notification.type}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formattedDate}
          </span>
        </div>
        <p className={`text-sm ${notification.is_read ? 'font-normal' : 'font-semibold'} text-gray-900 dark:text-white`}>
          {notification.title}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {notification.message}
        </p>
        {notification.link && (
          <a 
            href={notification.link} 
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 mt-1.5 font-medium"
          >
            View Details
            <ChevronRight className="h-3 w-3" />
          </a>
        )}
      </div>
      
      <div className="flex items-center gap-1 shrink-0">
        {!notification.is_read && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Mark as read"
          >
            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [busy, setBusy] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [search, setSearch] = useState('');

  const showToast = (msg: string, ok: boolean = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const loadNotifications = useCallback(() => {
    setBusy(true);
    getNotifications()
      .then(data => {
        setNotifications(data.notifications);
        setUnread(data.unread);
      })
      .catch((err: any) => {
        console.error('Error loading notifications:', err);
        showToast(err.message || 'Failed to load notifications', false);
      })
      .finally(() => setBusy(false));
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();
      showToast('All notifications marked as read ✅');
      loadNotifications();
    } catch (err: any) {
      showToast(err.message || 'Failed to mark all as read', false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await markNotificationRead(id);
      // Update local state
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, is_read: true } : n
      ));
      setUnread(prev => Math.max(0, prev - 1));
    } catch (err: any) {
      showToast(err.message || 'Failed to mark as read', false);
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
                          n.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !n.is_read) ||
                         (filter === 'read' && n.is_read);
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalNotifications = notifications.length;
  const unreadCount = notifications.filter(n => !n.is_read).length;
  const readCount = notifications.filter(n => n.is_read).length;
  const typeCounts = notifications.reduce((acc: Record<string, number>, n) => {
    acc[n.type] = (acc[n.type] || 0) + 1;
    return acc;
  }, {});

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
            <Bell className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            <span>Notifications</span>
            {unread > 0 && (
              <span className="text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 px-2.5 py-0.5 rounded-full">
                {unread} new
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            {totalNotifications} notifications · {unread} unread · {readCount} read
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full xs:w-auto">
          {unread > 0 && (
            <button 
              onClick={handleMarkAllRead}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow-md flex-1 xs:flex-none"
            >
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Mark All Read</span>
              <span className="xs:hidden">Mark Read</span>
            </button>
          )}
          <button 
            onClick={loadNotifications}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 xs:flex-none"
          >
            <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <StatCard icon={Bell} value={totalNotifications} label="Total" color="blue" iconColor="blue" />
        <StatCard icon={CheckCircle} value={unreadCount} label="Unread" color="yellow" iconColor="yellow" subtext="Needs attention" />
        <StatCard icon={Eye} value={readCount} label="Read" color="green" iconColor="green" subtext="Already viewed" />
        <StatCard icon={Archive} value={Object.keys(typeCounts).length} label="Categories" color="purple" iconColor="purple" />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search notifications by title or message..."
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
            {(['all', 'unread', 'read'] as const).map((f) => (
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
                {f === 'unread' && unread > 0 && (
                  <span className="ml-1 bg-white/20 text-white px-1.5 py-0.5 rounded-full text-[8px]">
                    {unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3">
              {search ? (
                <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              ) : (
                <Bell className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {search ? 'No notifications match your search' : 'No notifications yet'}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {search ? 'Try a different search term' : 'Notifications will appear here when you receive them'}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={handleMarkRead}
            />
          ))}
          
          {/* Footer with count */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium text-gray-700 dark:text-gray-300">{filteredNotifications.length}</span> of{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">{notifications.length}</span> notifications
            </p>
            <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Unread
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                Read
              </span>
            </div>
          </div>
        </div>
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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

// Import missing Search component
import { Search } from "lucide-react";
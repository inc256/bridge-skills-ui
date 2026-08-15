import { createFileRoute } from "@tanstack/react-router";
import { 
  Headphones, ExternalLink, MessageCircle, Mail, Phone, Globe, RefreshCw,
  Filter, Search, Clock, User, Tag, AlertCircle, CheckCircle,
  XCircle, Clock as ClockIcon, ArrowUpRight, Users, MessageSquare,
  Plus, ChevronRight, Send, Paperclip, Smile
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/support")({
  component: SupportPage,
});

// ===================== TYPES =====================

interface Ticket {
  id: string;
  title: string;
  status: 'Open' | 'Pending' | 'Resolved' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  user: string;
  requester?: string;
  updated?: string;
  timestamp?: string;
  created_at?: string;
  message?: string;
  category?: string;
}

interface Toast {
  msg: string;
  ok: boolean;
}

// ===================== API FUNCTIONS =====================

async function getAdminNotifications(): Promise<Ticket[]> {
  try {
    const data = await apiRequest<any>('/notifications/');
    return Array.isArray(data) ? data : data?.results || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
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
  subtext?: string;
  onClick?: () => void;
}

function StatCard({ icon: Icon, value, label, color = "blue", iconColor = "blue", subtext, onClick }: StatCardProps) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all ${onClick ? 'cursor-pointer hover:border-blue-400 dark:hover:border-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`}>
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${iconColor}-600 dark:text-${iconColor}-400`} />
        </div>
        <div className="min-w-0">
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{label}</p>
          {subtext && <p className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}

// Ticket Card Component
interface TicketCardProps {
  ticket: Ticket;
  index: number;
  onReply: (ticket: Ticket) => void;
}

function TicketCard({ ticket, index, onReply }: TicketCardProps) {
  const getStatusColor = (status: string) => {
    const map: Record<string, { bg: string; text: string; dot: string }> = {
      'Open': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', dot: 'bg-red-500' },
      'Pending': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', dot: 'bg-yellow-500' },
      'Resolved': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
      'Closed': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-400', dot: 'bg-gray-500' },
    };
    return map[status] || map['Open'];
  };

  const getPriorityColor = (priority: string) => {
    const map: Record<string, string> = {
      'High': 'text-red-600 dark:text-red-400',
      'Medium': 'text-yellow-600 dark:text-yellow-400',
      'Low': 'text-gray-500 dark:text-gray-400',
    };
    return map[priority] || map['Medium'];
  };

  const statusColors = getStatusColor(ticket.status);
  const priorityColor = getPriorityColor(ticket.priority);
  const formattedDate = ticket.updated || ticket.timestamp || ticket.created_at || '—';
  const ticketId = ticket.id || `#${String(index + 1).padStart(4, '0')}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`} />
              {ticket.status || 'Open'}
            </span>
            <span className={`text-[10px] sm:text-xs font-medium ${priorityColor}`}>
              ● {ticket.priority || 'Medium'}
            </span>
            {ticket.category && (
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {ticket.category}
              </span>
            )}
          </div>
          <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
            {ticket.title || 'Untitled Ticket'}
          </p>
          {ticket.message && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {ticket.message}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {ticket.user || ticket.requester || 'Unknown'}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="h-3 w-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {ticketId}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={() => onReply(ticket)}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow-md"
          >
            <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Reply</span>
          </button>
          {ticket.status !== 'Closed' && (
            <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================

function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<'All' | 'Open' | 'Pending' | 'Resolved' | 'Closed'>('All');
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (msg: string, ok: boolean = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const loadTickets = useCallback(async () => {
    setBusy(true);
    try {
      const data = await getAdminNotifications();
      // Transform notifications to ticket format if needed
      const formattedTickets = data.map((item: any) => ({
        id: item.id || `TICKET-${Math.random().toString(36).substr(2, 9)}`,
        title: item.title || 'Support Ticket',
        status: item.status || 'Open',
        priority: item.priority || 'Medium',
        user: item.user || item.requester || 'Unknown',
        requester: item.requester || item.user,
        updated: item.updated_at || item.created_at || new Date().toISOString(),
        timestamp: item.created_at || item.updated_at,
        created_at: item.created_at,
        message: item.message || item.content || '',
        category: item.category || item.type || 'General',
      }));
      setTickets(formattedTickets);
      applyFilters(formattedTickets, filter, search);
    } catch (err: any) {
      console.error('Failed to load tickets:', err);
      showToast(err.message || 'Failed to load support tickets', false);
    } finally {
      setBusy(false);
    }
  }, []);

  const applyFilters = (data: Ticket[], filterType: string, searchTerm: string) => {
    let filtered = data;
    
    if (filterType !== 'All') {
      filtered = filtered.filter(t => t.status === filterType);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(term) ||
        (t.message && t.message.toLowerCase().includes(term)) ||
        (t.user && t.user.toLowerCase().includes(term)) ||
        (t.requester && t.requester.toLowerCase().includes(term))
      );
    }
    
    setFilteredTickets(filtered);
  };

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  useEffect(() => {
    applyFilters(tickets, filter, search);
  }, [filter, search, tickets]);

  const handleReply = (ticket: Ticket) => {
    showToast(`Opening reply for ticket: ${ticket.title}`, true);
    // In a real implementation, this would open a reply modal
  };

  const getStatusCount = (status: string) => {
    return tickets.filter(t => t.status === status).length;
  };

  const openCount = getStatusCount('Open');
  const pendingCount = getStatusCount('Pending');
  const resolvedCount = getStatusCount('Resolved');
  const closedCount = getStatusCount('Closed');
  const totalCount = tickets.length;

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
            <Headphones className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            <span>Support Center</span>
            {openCount > 0 && (
              <span className="text-sm font-medium text-white bg-red-600 dark:bg-red-500 px-2.5 py-0.5 rounded-full animate-pulse">
                {openCount} open
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            {totalCount} tickets · {openCount} open · {pendingCount} pending
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full xs:w-auto">
          <button 
            onClick={loadTickets}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 xs:flex-none"
          >
            <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatCard 
          icon={Users} 
          value={totalCount} 
          label="Total Tickets" 
          color="blue" 
          iconColor="blue"
          onClick={() => setFilter('All')}
        />
        <StatCard 
          icon={AlertCircle} 
          value={openCount} 
          label="Open" 
          color="red" 
          iconColor="red"
          subtext="Needs attention"
          onClick={() => setFilter('Open')}
        />
        <StatCard 
          icon={ClockIcon} 
          value={pendingCount} 
          label="Pending" 
          color="yellow" 
          iconColor="yellow"
          onClick={() => setFilter('Pending')}
        />
        <StatCard 
          icon={CheckCircle} 
          value={resolvedCount} 
          label="Resolved" 
          color="green" 
          iconColor="green"
          onClick={() => setFilter('Resolved')}
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search tickets by title, message, or user..."
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
            {['All', 'Open', 'Pending', 'Resolved', 'Closed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors flex-1 sm:flex-none ${
                  filter === f
                    ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-sm'
                    : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {f}
                {f !== 'All' && (
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[8px] ${
                    filter === f 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {f === 'Open' ? openCount : f === 'Pending' ? pendingCount : f === 'Resolved' ? resolvedCount : closedCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-3">
        {filteredTickets.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center shadow-sm">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3">
                {search ? (
                  <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                ) : (
                  <Headphones className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                )}
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {search ? 'No tickets match your search' : 'No support tickets found'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {search ? 'Try a different search term' : 'Tickets will appear here when users create support requests'}
              </p>
            </div>
          </div>
        ) : (
          filteredTickets.map((ticket, index) => (
            <TicketCard
              key={ticket.id || index}
              ticket={ticket}
              index={index}
              onReply={handleReply}
            />
          ))
        )}
      </div>

      {/* Contact Channels */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Email Support</p>
              <a href="mailto:support@techbridgeskills.ug" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                support@techbridgeskills.ug
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Phone / WhatsApp</p>
              <a href="tel:+256700000000" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                +256 700 000 000
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Help Center</p>
              <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                docs.techbridgeskills.ug
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

// Import missing X component
import { X } from "lucide-react";
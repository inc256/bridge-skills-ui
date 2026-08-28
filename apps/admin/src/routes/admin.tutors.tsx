import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Check, X, Eye, Search, RefreshCw, Users, BookOpen, Star, User, Mail, Award, Calendar, Phone, DollarSign, TrendingUp, UserCheck, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { getTutors } from "@/lib/api";

export const Route = createFileRoute("/admin/tutors")({
  component: AdminTutors,
});

// ===================== TYPES =====================

interface Tutor {
  id: string;
  name: string;
  specialty: string;
  students: number;
  courses: number;
  rating: number;
  status: string;
  email?: string;
  expertise?: string;
  experience?: string;
  joined?: string;
  revenue?: string;
  momo?: string;
}

interface Toast {
  msg: string;
  ok: boolean;
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
  subtext?: string;
}

function StatCard({ icon: Icon, value, label, color = "blue", subtext }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`p-2 sm:p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`}>
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <div className="min-w-0">
          <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{label}</p>
          {subtext && <p className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 hidden sm:block">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}

// Tutor Card Component
interface TutorCardProps {
  tutor: Tutor;
  onViewProfile: (tutor: Tutor) => void;
  onApprove?: (tutor: Tutor) => void;
  onReject?: (tutor: Tutor) => void;
}

function TutorCard({ tutor, onViewProfile, onApprove, onReject }: TutorCardProps) {
  const getStatusColor = (status: string) => {
    if (status === "Verified") {
      return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' };
    }
    return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', dot: 'bg-yellow-500' };
  };

  const getInitials = (name: string) => {
    if (!name) return 'T';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const statusColors = getStatusColor(tutor.status);
  const initials = getInitials(tutor.name);
  const isPending = tutor.status === "Pending";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-800">
      <div className="flex items-start gap-3">
        <div className={`
          w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0
          ${statusColors.bg} ${statusColors.text}
        `}>
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <div className="truncate font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
              {tutor.name || 'Unnamed Tutor'}
            </div>
            <span className={`shrink-0 inline-flex items-center gap-1 rounded-full px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-medium ${statusColors.bg} ${statusColors.text}`}>
              <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${statusColors.dot}`} />
              <span className="hidden xs:inline">{tutor.status || 'Pending'}</span>
              <span className="xs:hidden">{tutor.status === 'Verified' ? '✓' : '⏳'}</span>
            </span>
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">{tutor.specialty || 'Instructor'}</div>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-1.5 sm:gap-2 border-t border-gray-100 dark:border-gray-700 pt-3 sm:pt-4 text-center">
        <div>
          <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{tutor.courses || 0}</div>
          <div className="text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400">Courses</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{(tutor.students ?? 0).toLocaleString()}</div>
          <div className="text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400">Students</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
            {tutor.rating ? `${tutor.rating}★` : '—'}
          </div>
          <div className="text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400">Rating</div>
        </div>
      </div>

      {isPending ? (
        <div className="mt-3 sm:mt-4 flex gap-1.5 sm:gap-2">
          <button 
            onClick={() => onReject?.(tutor)}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-red-200 dark:border-red-800 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="hidden xs:inline">Reject</span>
            <span className="xs:hidden">✕</span>
          </button>
          <button 
            onClick={() => onApprove?.(tutor)}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-white transition-colors shadow-sm"
          >
            <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="hidden xs:inline">Approve</span>
            <span className="xs:hidden">✓</span>
          </button>
        </div>
      ) : (
        <button 
          onClick={() => onViewProfile(tutor)}
          className="mt-3 sm:mt-4 w-full inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="hidden xs:inline">View Profile</span>
          <span className="xs:hidden">Profile</span>
        </button>
      )}
    </div>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([]);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified'>('all');
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const showToast = (msg: string, ok: boolean = true) => { 
    setToast({ msg, ok }); 
    setTimeout(() => setToast(null), 3500);
  };

  const loadTutors = useCallback(() => {
    setBusy(true);
    getTutors()
      .then((results: Tutor[]) => {
        const enrichedTutors = results.map(t => ({
          ...t,
          email: t.email || `${t.name?.toLowerCase().replace(/\s/g, '.')}@techbridgeskills.ug` || 'Not provided',
          expertise: t.expertise || t.specialty || 'Network Engineer · CCNA · 8 yrs experience',
          experience: t.experience || 'Not provided',
          joined: t.joined || '2026',
          revenue: t.revenue || 'UGX 0',
          momo: t.momo || '—'
        }));
        setTutors(enrichedTutors);
        setTotal(enrichedTutors.length);
        applyFilters(enrichedTutors, search, filter);
      })
      .catch((err: Error) => {
        console.error('Error loading tutors:', err);
        showToast('Failed to load tutors: ' + err.message, false);
      })
      .finally(() => setBusy(false));
  }, []);

  const applyFilters = (data: Tutor[], searchTerm: string, filterType: 'all' | 'pending' | 'verified') => {
    let filtered = data || tutors || [];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        (t.name || '').toLowerCase().includes(term) ||
        (t.specialty || '').toLowerCase().includes(term) ||
        (t.email || '').toLowerCase().includes(term)
      );
    }
    
    if (filterType === 'pending') {
      filtered = filtered.filter(t => t.status === 'Pending');
    } else if (filterType === 'verified') {
      filtered = filtered.filter(t => t.status === 'Verified');
    }
    
    setFilteredTutors(filtered);
  };

  useEffect(() => {
    loadTutors();
  }, [loadTutors]);

  useEffect(() => {
    applyFilters(tutors, search, filter);
  }, [search, filter, tutors]);

  const handleViewProfile = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setShowProfileModal(true);
  };

  const handleApprove = (tutor: Tutor) => {
    showToast(`✅ ${tutor.name} approved successfully!`);
    const updatedTutors = tutors.map(t => 
      t.id === tutor.id ? { ...t, status: 'Verified' } : t
    );
    setTutors(updatedTutors);
    applyFilters(updatedTutors, search, filter);
  };

  const handleReject = (tutor: Tutor) => {
    showToast(`❌ ${tutor.name} rejected`, false);
    const updatedTutors = tutors.filter(t => t.id !== tutor.id);
    setTutors(updatedTutors);
    applyFilters(updatedTutors, search, filter);
  };

  const stats = {
    total: total,
    pending: tutors.filter(t => t.status === 'Pending').length,
    verified: tutors.filter(t => t.status === 'Verified').length,
  };

  if (busy) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <PageSkeleton rows={5} />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-0">
      {/* Toast Notification - Mobile Optimized */}
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

      {/* Header - Mobile Optimized */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Tutors</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            {total} tutors · {stats.pending} pending
          </p>
        </div>
        <button 
          onClick={loadTutors}
          className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full xs:w-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${busy ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Row - Mobile Optimized */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        <StatCard 
          icon={Users} 
          value={stats.total} 
          label="Total" 
          color="blue"
        />
        <StatCard 
          icon={Clock} 
          value={stats.pending} 
          label="Pending" 
          color="yellow"
        />
        <StatCard 
          icon={UserCheck} 
          value={stats.verified} 
          label="Verified" 
          color="green"
        />
      </div>

      {/* Search and Filter - Mobile Optimized */}
      <div className="space-y-2 sm:space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search tutors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 sm:py-2.5 pl-9 pr-3 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center justify-between w-full sm:hidden px-3 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300"
        >
          <span>Filter: <span className="font-medium capitalize">{filter}</span></span>
          {showMobileFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {/* Filter Buttons */}
        <div className={`${showMobileFilters ? 'flex' : 'hidden'} sm:flex gap-1.5 sm:gap-2 flex-wrap`}>
          {(['all', 'pending', 'verified'] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setShowMobileFilters(false);
              }}
              className={`flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs md:text-sm font-medium transition-colors ${
                filter === f 
                  ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-sm' 
                  : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tutors Grid - Mobile Optimized */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTutors.length === 0 ? (
          <div className="col-span-full text-center py-8 sm:py-12">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-2 sm:mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No tutors found</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search</p>
          </div>
        ) : (
          filteredTutors.map((tutor) => (
            <TutorCard 
              key={tutor.id} 
              tutor={tutor}
              onViewProfile={handleViewProfile}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>

      {/* View Profile Modal - Mobile Optimized */}
      {showProfileModal && selectedTutor && (
        <Modal title="Tutor Profile" onClose={() => setShowProfileModal(false)}>
          <div className="space-y-4 sm:space-y-6">
            {/* Profile Header - Mobile Optimized */}
            <div className="flex items-center gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-base sm:text-xl font-bold text-blue-700 dark:text-blue-400">
                {selectedTutor.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'T'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h3 className="text-sm sm:text-lg font-bold truncate text-gray-900 dark:text-white">
                    {selectedTutor.name || 'Unnamed Tutor'}
                  </h3>
                  <span className={`shrink-0 rounded-full px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-medium ${
                    selectedTutor.status === 'Verified' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {selectedTutor.status || 'Pending'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{selectedTutor.specialty || 'Instructor'}</p>
              </div>
            </div>

            {/* Info Grid - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 dark:text-blue-400" />
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Email</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                    {selectedTutor.email || 'Not provided'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 dark:text-purple-400" />
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Expertise</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                    {selectedTutor.expertise || selectedTutor.specialty || 'Not specified'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 dark:text-green-400" />
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Experience</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                    {selectedTutor.experience || 'Not provided'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 dark:text-orange-400" />
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Joined</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                    {selectedTutor.joined || 'Not available'}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid - Mobile Optimized */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mx-auto mb-0.5 sm:mb-1" />
                <div className="text-base sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                  {(selectedTutor.students ?? 0).toLocaleString()}
                </div>
                <div className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400">Students</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400 mx-auto mb-0.5 sm:mb-1" />
                <div className="text-base sm:text-xl font-bold text-yellow-600 dark:text-yellow-400">
                  {selectedTutor.rating ? `${selectedTutor.rating}★` : '—'}
                </div>
                <div className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400">Rating</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 mx-auto mb-0.5 sm:mb-1" />
                <div className="text-base sm:text-xl font-bold text-purple-600 dark:text-purple-400">
                  {selectedTutor.courses || 0}
                </div>
                <div className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400">Courses</div>
              </div>
            </div>

            {/* Financial Info - Mobile Optimized */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400 mx-auto mb-0.5 sm:mb-1" />
                <div className="text-xs sm:text-xl font-bold text-green-600 dark:text-green-400">
                  {selectedTutor.revenue || 'UGX 0'}
                </div>
                <div className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400">Revenue</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-0.5 sm:mb-1" />
                <div className="text-xs sm:text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  {selectedTutor.momo || '—'}
                </div>
                <div className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400">MoMo</div>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => setShowProfileModal(false)}
                className="w-full inline-flex items-center justify-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-colors shadow-sm"
              >
                Close Profile
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Custom CSS for animations and mobile optimizations */}
      <style>{`
        /* Mobile responsive breakpoints */
        @media (max-width: 480px) {
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
        }
        
        @media (min-width: 481px) {
          .xs\\:inline { display: none; }
          .xs\\:hidden { display: inline; }
        }

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

        /* Better touch targets on mobile */
        @media (max-width: 640px) {
          button, 
          input,
          .touch-target {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}
// apps/student/src/routes/student.assignments.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, FileText, ChevronRight, Clock, CheckCircle, AlertCircle, Filter, Search, TrendingUp, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { getAssignments } from "@/lib/api";
import type { Assignment } from "@/lib/api";

export const Route = createFileRoute("/student/assignments")({
  component: Assignments,
});

interface AssignmentWithStatus extends Assignment {
  status: "pending" | "submitted" | "graded" | "in-progress" | "not-started";
  score?: number | null;
  maxScore?: number;
  due: string;
  type: string;
  course: string;
}

const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
  "pending": { 
    label: "Pending", 
    className: "bg-amber-50 text-amber-600 border-amber-200",
    icon: AlertCircle
  },
  "submitted": { 
    label: "Submitted", 
    className: "bg-blue-50 text-blue-600 border-blue-200",
    icon: Clock
  },
  "graded": { 
    label: "Graded", 
    className: "bg-emerald-50 text-emerald-600 border-emerald-200",
    icon: CheckCircle
  },
  "in-progress": { 
    label: "In Progress", 
    className: "bg-purple-50 text-purple-600 border-purple-200",
    icon: FileText
  },
  "not-started": { 
    label: "Not Started", 
    className: "bg-gray-50 text-gray-600 border-gray-200",
    icon: AlertCircle
  }
};

const filterOptions = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "submitted", label: "Submitted" },
  { key: "graded", label: "Graded" },
  { key: "in-progress", label: "In Progress" },
];

function Assignments() {
  const [assignments, setAssignments] = useState<AssignmentWithStatus[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssignments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAssignments();
        // Map API data to our format with status
        const mappedData = (Array.isArray(data) ? data : []).map((a: any) => ({
          ...a,
          status: a.status?.toLowerCase() || "pending",
          score: a.score || null,
          maxScore: a.max_score || 100,
          due: a.due || a.due_date || "TBD",
          type: a.type || "Assignment",
          course: a.course || "Course"
        }));
        setAssignments(mappedData);
      } catch (err) {
        console.error('Failed to load assignments:', err);
        setError('Could not load assignments. Please try again.');
        setAssignments([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadAssignments();
  }, []);

  // Filter assignments
  const filteredAssignments = assignments
    .filter(a => filter === "all" || a.status === filter)
    .filter(a => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return a.title?.toLowerCase().includes(query) ||
             a.course?.toLowerCase().includes(query) ||
             a.type?.toLowerCase().includes(query);
    });

  // Statistics
  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === "pending").length,
    submitted: assignments.filter(a => a.status === "submitted").length,
    graded: assignments.filter(a => a.status === "graded").length,
    inProgress: assignments.filter(a => a.status === "in-progress").length,
  };

  const statsCards = [
    { label: "Total", value: stats.total, color: "blue" },
    { label: "Pending", value: stats.pending, color: "amber" },
    { label: "Submitted", value: stats.submitted, color: "purple" },
    { label: "Graded", value: stats.graded, color: "emerald" },
  ];

  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status];
    if (!config) return FileText;
    return config.icon;
  };

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status];
    if (!config) return statusConfig["pending"];
    return config;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs sm:text-sm text-gray-500">Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-xl">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-700 mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Assignments</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Track your projects and submissions across all courses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {assignments.length} total
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {statsCards.map((stat) => {
          const colorClass = colorMap[stat.color as keyof typeof colorMap];
          return (
            <div key={stat.label} className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] touch-manipulation">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`p-1.5 sm:p-2 rounded-lg ${colorClass}`}>
                  {stat.label === "Total" && <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  {stat.label === "Pending" && <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  {stat.label === "Submitted" && <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  {stat.label === "Graded" && <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                </div>
                <div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 sm:py-2.5 pl-9 sm:pl-10 pr-3 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-1 sm:gap-1.5 overflow-x-auto pb-1">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap active:scale-95 touch-manipulation ${
                  filter === opt.key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {opt.label}
                {opt.key !== "all" && (
                  <span className={`ml-1 sm:ml-1.5 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] ${
                    filter === opt.key ? "bg-white/20" : "bg-gray-200"
                  }`}>
                    {stats[opt.key as keyof typeof stats] || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assignments List */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-12 md:p-16 text-center shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4">
              📝
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">No assignments found</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {searchQuery ? "Try adjusting your search or filters" : "Assignments will appear here when available"}
            </p>
            {(searchQuery || filter !== "all") && (
              <button 
                onClick={() => { setSearchQuery(""); setFilter("all"); }}
                className="mt-4 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <ul className="divide-y divide-gray-100">
            {filteredAssignments.map((a) => {
              const StatusIcon = getStatusIcon(a.status);
              const statusBadge = getStatusBadge(a.status);
              const isGraded = a.status === "graded";
              
              return (
                <li 
                  key={a.id} 
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 hover:bg-gray-50/50 transition-colors active:bg-gray-100/50 touch-manipulation"
                >
                  <div className={`p-2 sm:p-2.5 rounded-xl flex-shrink-0 ${
                    a.status === "graded" ? "bg-emerald-50 text-emerald-600" :
                    a.status === "submitted" ? "bg-blue-50 text-blue-600" :
                    a.status === "pending" ? "bg-amber-50 text-amber-600" :
                    "bg-gray-50 text-gray-600"
                  }`}>
                    <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                        {a.title}
                      </span>
                      <span className={`text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full border ${statusBadge.className}`}>
                        {statusBadge.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-3 text-[10px] sm:text-xs text-gray-500 mt-0.5">
                      <span>{a.course || "Course"}</span>
                      <span className="hidden xs:inline">·</span>
                      <span>{a.type || "Assignment"}</span>
                      {isGraded && a.score !== null && (
                        <>
                          <span className="hidden xs:inline">·</span>
                          <span className="font-semibold text-emerald-600">
                            Score: {a.score}/{a.maxScore || 100}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span className="hidden xs:inline">Due</span>
                      <span>{a.due || "TBD"}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Assignments;
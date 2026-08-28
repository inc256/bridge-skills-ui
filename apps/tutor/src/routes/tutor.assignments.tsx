// apps/tutor/src/routes/tutor/assignments.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useState, useEffect } from "react";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users,
  BookOpen,
  TrendingUp,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Star,
  MessageSquare,
  Eye,
  Download,
  X
} from "lucide-react";
import { toast } from "sonner";

// API imports - adjust based on your actual API
import { getStudents, getCourses } from "@/lib/api";

export const Route = createFileRoute("/tutor/assignments")({
  component: TutorAssignments,
});

// Types
interface Submission {
  id: number | string;
  student: string;
  studentId?: string;
  assignment: string;
  assignmentId?: string;
  course: string;
  courseId?: string;
  submitted: string;
  status: 'pending' | 'graded' | 'needs_review';
  score: number | null;
  feedback?: string;
  file?: string;
}

function TutorAssignments() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded' | 'needs_review'>('all');
  const [grading, setGrading] = useState<string | number | null>(null);
  const [score, setScore] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API calls
  const [submissions, setSubmissions] = useState<Submission[]>([
    { 
      id: 1, 
      student: 'Sarah Namukasa', 
      assignment: 'Build a REST API', 
      course: 'Full-Stack Development',
      submitted: '2026-08-03', 
      status: 'pending', 
      score: null,
      feedback: ''
    },
    { 
      id: 2, 
      student: 'Moses Otim', 
      assignment: 'Network Topology Lab', 
      course: 'Networking Fundamentals',
      submitted: '2026-08-02', 
      status: 'pending', 
      score: null,
      feedback: ''
    },
    { 
      id: 3, 
      student: 'Anita Akello', 
      assignment: 'Build a REST API', 
      course: 'Full-Stack Development',
      submitted: '2026-08-01', 
      status: 'graded', 
      score: 88,
      feedback: 'Great work! Clean code and good API design.'
    },
    { 
      id: 4, 
      student: 'Ibrahim Ssekandi', 
      assignment: 'SQL Queries Lab', 
      course: 'Database Design',
      submitted: '2026-07-30', 
      status: 'graded', 
      score: 92,
      feedback: 'Excellent query optimization!'
    },
    { 
      id: 5, 
      student: 'Lydia Nakato', 
      assignment: 'Network Topology Lab', 
      course: 'Networking Fundamentals',
      submitted: '2026-07-28', 
      status: 'graded', 
      score: 75,
      feedback: 'Good effort, review subnetting concepts.'
    },
    { 
      id: 6, 
      student: 'David Okello', 
      assignment: 'Nmap Recon Report', 
      course: 'Ethical Hacking',
      submitted: '2026-08-04', 
      status: 'needs_review', 
      score: null,
      feedback: ''
    },
  ]);

  // Calculate stats
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const needsReviewCount = submissions.filter(s => s.status === 'needs_review').length;
  const gradedCount = submissions.filter(s => s.status === 'graded').length;
  const totalSubmissions = submissions.length;

  // Filter submissions
  const filteredSubmissions = submissions.filter(s => {
    // Status filter
    if (filter !== 'all' && s.status !== filter) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return s.student.toLowerCase().includes(query) ||
             s.assignment.toLowerCase().includes(query) ||
             s.course.toLowerCase().includes(query);
    }
    
    return true;
  });

  const handleGradeSubmit = (submissionId: string | number) => {
    if (!score) {
      toast.error('Please enter a score');
      return;
    }

    const numScore = parseInt(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      toast.error('Score must be between 0 and 100');
      return;
    }

    // Update the submission
    setSubmissions(prev => prev.map(s => 
      s.id === submissionId 
        ? { 
            ...s, 
            status: 'graded', 
            score: numScore,
            feedback: feedback || s.feedback
          } 
        : s
    ));

    toast.success(`Assignment graded! Score: ${numScore}/100`);
    setGrading(null);
    setScore('');
    setFeedback('');
  };

  const handleViewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  const statsCards = [
    {
      icon: FileText,
      value: totalSubmissions,
      label: 'Total Submissions',
      subtext: 'All time',
      color: 'blue'
    },
    {
      icon: Clock,
      value: pendingCount + needsReviewCount,
      label: 'Pending Review',
      subtext: 'Need your attention',
      color: 'amber'
    },
    {
      icon: CheckCircle,
      value: gradedCount,
      label: 'Graded',
      subtext: 'Completed',
      color: 'emerald'
    },
    {
      icon: Users,
      value: Math.round(gradedCount / Math.max(totalSubmissions, 1) * 100) + '%',
      label: 'Completion Rate',
      subtext: 'Graded vs total',
      color: 'purple'
    }
  ];

  const statColorMap = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { 
        label: 'Pending Review', 
        className: 'bg-amber-50 text-amber-600 border-amber-200',
        icon: AlertCircle
      },
      needs_review: { 
        label: 'Needs Review', 
        className: 'bg-orange-50 text-orange-600 border-orange-200',
        icon: AlertCircle
      },
      graded: { 
        label: 'Graded', 
        className: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        icon: CheckCircle
      }
    };
    return config[status as keyof typeof config] || config.pending;
  };

  const getFilterTabs = () => {
    const tabs = [
      { key: 'all', label: 'All', count: totalSubmissions },
      { key: 'pending', label: 'Pending', count: pendingCount },
      { key: 'needs_review', label: 'Needs Review', count: needsReviewCount },
      { key: 'graded', label: 'Graded', count: gradedCount }
    ];
    return tabs;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-sm text-gray-500">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Assignments</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and grade student submissions across all your courses
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-600">
              {pendingCount} pending review
            </span>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {statsCards.map((stat, index) => {
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

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 sm:p-3">
        <div className="flex flex-wrap gap-1">
          {getFilterTabs().map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === tab.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${
                  filter === tab.key
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search assignments, students, or courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No submissions found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search</p>
          </div>
        ) : (
          filteredSubmissions.map((submission) => {
            const statusConfig = getStatusBadge(submission.status);
            const StatusIcon = statusConfig.icon;
            const isGrading = grading === submission.id;

            return (
              <div
                key={submission.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Icon & Content */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      submission.status === 'graded' 
                        ? 'bg-emerald-50 text-emerald-600'
                        : submission.status === 'needs_review'
                        ? 'bg-orange-50 text-orange-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {submission.assignment}
                        </p>
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusConfig.className}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">{submission.student}</span>
                        <span className="mx-2">·</span>
                        <span className="text-gray-400">{submission.course}</span>
                        <span className="mx-2">·</span>
                        <span className="text-gray-400 text-xs">
                          Submitted {new Date(submission.submitted).toLocaleDateString()}
                        </span>
                      </p>
                      {submission.status === 'graded' && submission.score !== null && (
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-sm font-bold text-emerald-600">
                            Score: {submission.score}/100
                          </span>
                          {submission.feedback && (
                            <span className="text-xs text-gray-400 truncate max-w-[200px]">
                              "{submission.feedback}"
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {submission.status === 'graded' ? (
                      <>
                        <button
                          onClick={() => handleViewSubmission(submission)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </>
                    ) : isGrading ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={score}
                          onChange={(e) => setScore(e.target.value)}
                          placeholder="Score"
                          min="0"
                          max="100"
                          className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <button
                          onClick={() => handleGradeSubmit(submission.id)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setGrading(null);
                            setScore('');
                            setFeedback('');
                          }}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleViewSubmission(submission)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setGrading(submission.id);
                            setScore('');
                            setFeedback('');
                          }}
                          className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Grade
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expandable feedback section for grading */}
                {isGrading && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Feedback (optional)
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={2}
                      placeholder="Provide feedback to the student..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedSubmission(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Submission Details</h3>
              <button onClick={() => setSelectedSubmission(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Assignment</p>
                  <p className="font-semibold text-gray-900">{selectedSubmission.assignment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student</p>
                  <p className="font-semibold text-gray-900">{selectedSubmission.student}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Course</p>
                  <p className="font-semibold text-gray-900">{selectedSubmission.course}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedSubmission.submitted).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedSubmission.status === 'graded' && selectedSubmission.score !== null && (
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-2xl font-bold text-emerald-600">{selectedSubmission.score}/100</p>
                  {selectedSubmission.feedback && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Feedback</p>
                      <p className="text-sm text-gray-700 mt-1">{selectedSubmission.feedback}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedSubmission.status !== 'graded' && (
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-amber-600">Pending Review</p>
                  <button
                    onClick={() => {
                      setSelectedSubmission(null);
                      setGrading(selectedSubmission.id);
                      setScore('');
                      setFeedback('');
                    }}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Grade This Submission
                  </button>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Submission
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TutorAssignments;
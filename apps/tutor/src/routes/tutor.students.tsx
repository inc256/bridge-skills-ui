// apps/tutor/src/routes/tutor/students.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  Search, 
  MessageSquare, 
  MoreHorizontal, 
  Users, 
  UserCheck,
  GraduationCap,
  Award,
  ChevronRight,
  Filter,
  Download,
  Mail,
  UserPlus,
  ArrowUpRight,
  Clock,
  BookOpen,
  Star
} from "lucide-react";
import { useEffect, useState } from "react";
import { getStudents } from "@/lib/api";

export const Route = createFileRoute("/tutor/students")({
  component: TutorStudents,
});

function TutorStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterProgress, setFilterProgress] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      const data = await getStudents();
      setStudents(data);
      setFilteredStudents(data);
      setIsLoading(false);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    let filtered = students;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name?.toLowerCase().includes(query) ||
        s.email?.toLowerCase().includes(query) ||
        s.course?.toLowerCase().includes(query)
      );
    }

    // Course filter
    if (filterCourse !== "all") {
      filtered = filtered.filter(s => s.course === filterCourse);
    }

    // Progress filter
    if (filterProgress === "high") {
      filtered = filtered.filter(s => s.progress >= 70);
    } else if (filterProgress === "medium") {
      filtered = filtered.filter(s => s.progress >= 40 && s.progress < 70);
    } else if (filterProgress === "low") {
      filtered = filtered.filter(s => s.progress < 40);
    }

    setFilteredStudents(filtered);
  }, [searchQuery, filterCourse, filterProgress, students]);

  // Get unique courses for filter
  const uniqueCourses = [...new Set(students.map(s => s.course).filter(Boolean))];

  // Calculate stats
  const totalStudents = students.length;
  const avgProgress = students.length > 0 
    ? Math.round(students.reduce((sum, s) => sum + (s.progress || 0), 0) / students.length)
    : 0;
  const completedStudents = students.filter(s => s.progress >= 100).length;
  const activeStudents = students.filter(s => s.progress > 0 && s.progress < 100).length;

  const statCards = [
    {
      icon: Users,
      value: totalStudents,
      label: "Total Students",
      subtext: "Enrolled across all courses",
      color: "blue"
    },
    {
      icon: GraduationCap,
      value: avgProgress + "%",
      label: "Avg. Progress",
      subtext: "Overall completion rate",
      color: "emerald"
    },
    {
      icon: Award,
      value: completedStudents,
      label: "Completed",
      subtext: "Finished all content",
      color: "purple"
    },
    {
      icon: UserCheck,
      value: activeStudents,
      label: "Active Learners",
      subtext: "Currently enrolled",
      color: "orange"
    }
  ];

  const statColorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600"
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-emerald-600";
    if (progress >= 50) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return "bg-gradient-to-r from-emerald-500 to-emerald-600";
    if (progress >= 50) return "bg-gradient-to-r from-amber-500 to-amber-600";
    return "bg-gradient-to-r from-red-500 to-red-600";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Students</h2>
          <p className="text-sm text-gray-500 mt-1">
            Track progress, grades, and enrollment across your courses
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat, index) => {
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

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name, email, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="all">All Courses</option>
              {uniqueCourses.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            
            <select
              value={filterProgress}
              onChange={(e) => setFilterProgress(e.target.value)}
              className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="all">All Progress</option>
              <option value="high">High (≥70%)</option>
              <option value="medium">Medium (40-69%)</option>
              <option value="low">Low (&lt;40%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No students found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3 px-4 sm:px-6">Student</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Course</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4 hidden md:table-cell">Grade</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Enrolled</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr 
                    key={s.id} 
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedStudent(s)}
                  >
                    <td className="py-3 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {s.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "S"}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-gray-900">{s.name || "Student"}</div>
                          <div className="text-xs text-gray-400 truncate max-w-[120px] sm:max-w-[200px]">{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm text-gray-600">{s.course || "No course"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${getProgressBarColor(s.progress || 0)}`}
                            style={{ width: `${Math.min(s.progress || 0, 100)}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${getProgressColor(s.progress || 0)}`}>
                          {s.progress || 0}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        s.grade === "A" ? "bg-emerald-50 text-emerald-600" :
                        s.grade === "B" ? "bg-blue-50 text-blue-600" :
                        s.grade === "C" ? "bg-amber-50 text-amber-600" :
                        "bg-gray-50 text-gray-600"
                      }`}>
                        {s.grade || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {s.enrolled || "Recently"}
                      </div>
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          title="Message student"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination / Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          Showing {filteredStudents.length} of {students.length} students
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50">
            Previous
          </button>
          <span className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium">1</span>
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            Next
          </button>
        </div>
      </div>

      {/* Student Detail Modal - Simplified inline view */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedStudent(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Student Details</h3>
              <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                {selectedStudent.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "S"}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedStudent.name}</p>
                <p className="text-sm text-gray-500">{selectedStudent.email}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Course</span>
                <span className="text-sm font-medium text-gray-900">{selectedStudent.course}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Progress</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-full rounded-full ${getProgressBarColor(selectedStudent.progress || 0)}`}
                      style={{ width: `${Math.min(selectedStudent.progress || 0, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{selectedStudent.progress || 0}%</span>
                </div>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Grade</span>
                <span className="text-sm font-medium text-gray-900">{selectedStudent.grade || "—"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Enrolled</span>
                <span className="text-sm font-medium text-gray-900">{selectedStudent.enrolled || "Recently"}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Message
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                View Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TutorStudents;
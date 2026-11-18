import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Mail, MoreVertical, Phone, Search } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/tutor/students")({
  component: TutorStudents,
});

const MOCK_STUDENTS = [
  {
    id: "100056",
    name: "Johan Richard",
    email: "johan.richard@example.com",
    phone: "+256 700 100 056",
    course: "Diploma in Cloud Computing",
    gender: "Male",
    age: 17,
  },
  {
    id: "106076",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+256 700 106 076",
    course: "Diploma in Software Engineering",
    gender: "Male",
    age: 27,
  },
  {
    id: "111576",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+256 700 111 576",
    course: "Introduction to Python",
    gender: "Female",
    age: 22,
  },
];

function StudentAvatar() {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-[#fcd34d]">
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="32" fill="#fcd34d" />
        <path d="M32 36C39.732 36 46 29.732 46 22C46 14.268 39.732 8 32 8C24.268 8 18 14.268 18 22C18 29.732 24.268 36 32 36Z" fill="#9ca3af" />
        <path d="M10 64C10 51.85 19.85 42 32 42C44.15 42 54 51.85 54 64" fill="#4b5563" />
        <rect x="20" y="20" width="10" height="8" rx="2" fill="#111827" />
        <rect x="34" y="20" width="10" height="8" rx="2" fill="#111827" />
        <path d="M30 24H34M20 24H14M44 24H50" stroke="#111827" strokeWidth="2" />
      </svg>
    </span>
  );
}

function TutorStudents() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [progressFilter, setProgressFilter] = useState("all");

  const courses = useMemo(
    () => Array.from(new Set(MOCK_STUDENTS.map((student) => student.course))),
    [],
  );

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return MOCK_STUDENTS.filter((student) => {
      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query);
      const matchesCourse =
        courseFilter === "all" || student.course === courseFilter;
      const matchesProgress =
        progressFilter === "all" ||
        (progressFilter === "progress" && student.age < 20) ||
        (progressFilter === "completed" && student.age >= 20);
      return matchesSearch && matchesCourse && matchesProgress;
    });
  }, [search, courseFilter, progressFilter]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-1 pb-24 sm:px-2 lg:pb-8">
      <section className="flex flex-col gap-4 rounded-2xl border border-[#d1d5db] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:border-[#293b30] dark:bg-[#111b16] md:flex-row md:items-center">
        <label className="relative flex min-w-0 flex-1 items-center">
          <Search className="absolute left-4 h-5 w-5 text-[#1f2937] dark:text-[#d1d5db]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Students by name, email, or course...."
            className="w-full rounded-lg border border-[#d1d5db] py-3 pl-12 pr-4 text-base text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#9ca3af] dark:border-[#34493a] dark:bg-[#111b16] dark:text-white"
          />
        </label>

        <div className="flex w-full gap-4 md:w-auto">
          <label className="relative flex-1 md:w-[180px] md:flex-none">
            <select
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
              className="h-[48px] w-full appearance-none rounded-lg border border-[#d1d5db] bg-[#e5e7eb] pl-5 pr-10 text-base font-semibold text-[#6b7280] outline-none dark:border-[#34493a] dark:bg-[#24352a] dark:text-[#d1d5db]"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1f2937] dark:text-[#d1d5db]" />
          </label>

          <label className="relative flex-1 md:w-[180px] md:flex-none">
            <select
              value={progressFilter}
              onChange={(event) => setProgressFilter(event.target.value)}
              className="h-[48px] w-full appearance-none rounded-lg border border-[#d1d5db] bg-[#e5e7eb] pl-5 pr-10 text-base font-semibold text-[#6b7280] outline-none dark:border-[#34493a] dark:bg-[#24352a] dark:text-[#d1d5db]"
            >
              <option value="all">All Progress</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1f2937] dark:text-[#d1d5db]" />
          </label>
        </div>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-[#d1d5db] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:border-[#293b30] dark:bg-[#111b16]">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="text-[#0f763f] dark:text-[#86efac]">
              <th className="w-[10%] px-6 py-4 text-[15px] font-medium">Id</th>
              <th className="w-[25%] px-6 py-4 text-[15px] font-medium">Student</th>
              <th className="w-[30%] px-6 py-4 text-[15px] font-medium">Course</th>
              <th className="w-[10%] px-6 py-4 text-[15px] font-medium">Gender</th>
              <th className="w-[10%] px-6 py-4 text-[15px] font-medium">Age</th>
              <th className="w-[15%] px-6 py-4 text-[15px] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="border-t border-[#d1d5db] text-[15px] text-[#6b7280] transition hover:bg-[#f9fafb] dark:border-[#293b30] dark:text-[#a6b8aa] dark:hover:bg-[#17251d]"
              >
                <td className="px-6 py-4">{student.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <StudentAvatar />
                    <span className="font-semibold text-[#1f2937] dark:text-white">
                      {student.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-[250px] truncate" title={student.course}>
                    {student.course}
                  </div>
                </td>
                <td className="px-6 py-4">{student.gender}</td>
                <td className="px-6 py-4">{student.age}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      title={`Call ${student.name}`}
                      aria-label={`Call ${student.name}`}
                      className="text-[#6b7280] transition hover:text-[#1f2937] dark:text-[#a6b8aa] dark:hover:text-white"
                    >
                      <Phone className="h-[22px] w-[22px]" />
                    </button>
                    <a
                      href={`mailto:${student.email}`}
                      title={`Email ${student.name}`}
                      aria-label={`Email ${student.name}`}
                      className="text-[#6b7280] transition hover:text-[#1f2937] dark:text-[#a6b8aa] dark:hover:text-white"
                    >
                      <Mail className="h-[22px] w-[22px]" />
                    </a>
                    <button
                      type="button"
                      title={`More actions for ${student.name}`}
                      aria-label={`More actions for ${student.name}`}
                      className="text-[#6b7280] transition hover:text-[#1f2937] dark:text-[#a6b8aa] dark:hover:text-white"
                    >
                      <MoreVertical className="h-[22px] w-[22px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div className="border-t border-[#d1d5db] px-6 py-12 text-center text-sm text-[#6b7280] dark:border-[#293b30] dark:text-[#a6b8aa]">
            No students found
          </div>
        )}
      </section>
    </div>
  );
}

export default TutorStudents;

import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Pencil, Search, Trash2, MoreVertical } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/tutor/certificates")({
  component: TutorCertificates,
});

const MOCK_CERTIFICATES = [
  { id: "CERT-001", course: "Diploma in Cloud Computing", students: 17, status: "Active" },
  { id: "CERT-002", course: "Diploma in Software Engineering", students: 27, status: "Active" },
  { id: "CERT-003", course: "Introduction to Python", students: 22, status: "Draft" },
];

function TutorCertificates() {
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [progressFilter, setProgressFilter] = useState("all");
  const [certificates, setCertificates] = useState(MOCK_CERTIFICATES);

  const courses = useMemo(
    () => Array.from(new Set(certificates.map((certificate) => certificate.course))),
    [certificates],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return certificates.filter((certificate) => {
      const matchesQuery =
        !normalized ||
        certificate.id.toLowerCase().includes(normalized) ||
        certificate.course.toLowerCase().includes(normalized);
      const matchesCourse =
        courseFilter === "all" || certificate.course === courseFilter;
      const matchesProgress =
        progressFilter === "all" ||
        (progressFilter === "active" && certificate.status === "Active") ||
        (progressFilter === "draft" && certificate.status === "Draft");
      return matchesQuery && matchesCourse && matchesProgress;
    });
  }, [certificates, query, courseFilter, progressFilter]);

  const deleteCertificate = (id: string) => {
    setCertificates((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-1 pb-24 sm:px-2 lg:pb-8">
      <section className="flex flex-col gap-4 rounded-xl border border-[#d1d5db] bg-white p-5 dark:border-[#293b30] dark:bg-[#111b16] md:flex-row md:items-center">
        <label className="relative flex min-w-0 flex-1 items-center">
          <Search className="absolute left-4 h-6 w-6 text-[#1f2937] dark:text-[#d1d5db]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Students by name, email, or course...."
            className="w-full rounded-lg border border-[#d1d5db] py-3 pl-12 pr-4 text-base text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#9ca3af] dark:border-[#34493a] dark:bg-[#111b16] dark:text-white"
          />
        </label>

        <div className="flex w-full gap-4 md:w-auto">
          <label className="relative flex-1 md:w-[180px] md:flex-none">
            <select
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
              className="h-[48px] w-full appearance-none rounded-lg border border-[#d1d5db] bg-[#f3f4f6] pl-5 pr-10 text-base font-semibold text-[#6b7280] outline-none dark:border-[#34493a] dark:bg-[#24352a] dark:text-[#d1d5db]"
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
              className="h-[48px] w-full appearance-none rounded-lg border border-[#d1d5db] bg-[#f3f4f6] pl-5 pr-10 text-base font-semibold text-[#6b7280] outline-none dark:border-[#34493a] dark:bg-[#24352a] dark:text-[#d1d5db]"
            >
              <option value="all">All Progress</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1f2937] dark:text-[#d1d5db]" />
          </label>
        </div>
      </section>

      <section className="overflow-x-auto rounded-xl border border-[#d1d5db] bg-white dark:border-[#293b30] dark:bg-[#111b16]">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="text-[#374151] dark:text-[#d1d5db]">
              <th className="w-[15%] px-6 py-[18px] text-[16px] font-medium">Id</th>
              <th className="w-[55%] px-6 py-[18px] text-[16px] font-medium">Course</th>
              <th className="w-[15%] px-6 py-[18px] text-[16px] font-medium">Students</th>
              <th className="w-[15%] px-6 py-[18px] text-[16px] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((certificate) => (
              <tr
                key={certificate.id}
                className="border-t border-[#d1d5db] text-[15px] text-[#6b7280] transition hover:bg-[#f9fafb] dark:border-[#293b30] dark:text-[#a6b8aa] dark:hover:bg-[#17251d]"
              >
                <td className="px-6 py-[18px] font-medium">{certificate.id}</td>
                <td className="px-6 py-[18px]">
                  <div className="max-w-[400px] truncate font-medium" title={certificate.course}>
                    {certificate.course}
                  </div>
                </td>
                <td className="px-6 py-[18px]">{certificate.students}</td>
                <td className="px-6 py-[18px]">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      title={`Edit ${certificate.id}`}
                      aria-label={`Edit ${certificate.id}`}
                      className="text-[#6b7280] transition hover:text-[#1f2937] dark:text-[#a6b8aa] dark:hover:text-white"
                    >
                      <Pencil className="h-[22px] w-[22px]" />
                    </button>
                    <button
                      type="button"
                      title={`Delete ${certificate.id}`}
                      aria-label={`Delete ${certificate.id}`}
                      onClick={() => deleteCertificate(certificate.id)}
                      className="text-[#9ca3af] transition hover:text-red-500"
                    >
                      <Trash2 className="h-[22px] w-[22px]" />
                    </button>
                    <button
                      type="button"
                      title={`More actions for ${certificate.id}`}
                      aria-label={`More actions for ${certificate.id}`}
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

        {filtered.length === 0 && (
          <div className="border-t border-[#d1d5db] px-6 py-12 text-center text-sm text-[#6b7280] dark:border-[#293b30] dark:text-[#a6b8aa]">
            No certificates found
          </div>
        )}
      </section>
    </div>
  );
}

export default TutorCertificates;

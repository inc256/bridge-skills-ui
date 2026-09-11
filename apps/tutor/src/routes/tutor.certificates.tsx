import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Award, CheckCircle, Download, Plus, RefreshCw, Search, ShieldCheck, X } from "lucide-react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { getCourses, getMyCertificates, getTutorEnrollments, issueCertificate } from "@/lib/api";

export const Route = createFileRoute("/tutor/certificates")({ component: TutorCertificates });

type Certificate = {
  id: string;
  number: string;
  courseTitle: string;
  recipient: string;
  issuedAt: string;
  isValid: boolean;
  pdfUrl?: string;
};

function normalizeCertificate(item: any, index: number): Certificate {
  const user = item?.user ?? item?.student ?? item?.recipient ?? {};
  const recipient = item?.student_name ?? item?.recipient_name ?? item?.user_name ?? user?.full_name ?? user?.email ?? "Certificate holder";
  return {
    id: String(item?.id ?? item?.number ?? index),
    number: String(item?.number ?? item?.certificate_number ?? item?.credential_id ?? item?.credentialId ?? "Unavailable"),
    courseTitle: item?.course_title ?? item?.course?.title ?? item?.title ?? "Course completion",
    recipient,
    issuedAt: item?.issued_at ?? item?.issued ?? item?.created_at ?? "",
    isValid: item?.is_valid ?? item?.status !== "revoked",
    pdfUrl: item?.pdf_url,
  };
}

function formatDate(value: string) {
  if (!value) return "Not available";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function TutorCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [isIssuing, setIsIssuing] = useState(false);

  const loadCertificates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, courseList, enrollmentList] = await Promise.all([
        getMyCertificates(),
        getCourses(),
        getTutorEnrollments().catch(() => []),
      ]);
      setCertificates(data.map(normalizeCertificate));
      setCourses(courseList);
      setEnrollments(enrollmentList);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load certificates.");
      setCertificates([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { void loadCertificates(); }, []);

  const courseId = (course: any) => String(course?.id ?? course?.raw?.id ?? "");
  const enrollmentCourseId = (enrollment: any) => String(enrollment?.course_id ?? enrollment?.course?.id ?? enrollment?.course?.course_id ?? "");
  const enrollmentUserId = (enrollment: any) => String(enrollment?.user_id ?? enrollment?.user?.id ?? enrollment?.student_id ?? enrollment?.student?.id ?? "");
  const enrollmentName = (enrollment: any) => {
    const user = enrollment?.user ?? enrollment?.student ?? {};
    return user?.full_name ?? ([user?.first_name, user?.last_name].filter(Boolean).join(" ") || user?.username || user?.email || "Student");
  };
  const selectedCourse = courses.find((course) => courseId(course) === selectedCourseId);
  const availableEnrollments = enrollments.filter((enrollment) => enrollmentCourseId(enrollment) === selectedCourseId);

  const handleIssue = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enrollment = availableEnrollments.find((item) => String(item?.id ?? "") === selectedEnrollmentId);
    const userId = enrollmentUserId(enrollment);
    if (!selectedCourseId || !selectedEnrollmentId || !userId) {
      setError("Choose a course and an enrollment with a student before issuing a certificate.");
      return;
    }
    setIsIssuing(true);
    setError(null);
    try {
      await issueCertificate({
        course_id: selectedCourseId,
        enrollment_id: selectedEnrollmentId,
        user_id: userId,
        ...(certificateNumber.trim() ? { number: certificateNumber.trim() } : {}),
      });
      setShowIssueForm(false);
      setSelectedEnrollmentId("");
      setCertificateNumber("");
      await loadCertificates();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Certificate could not be issued.");
    } finally {
      setIsIssuing(false);
    }
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return certificates;
    return certificates.filter((certificate) => [certificate.number, certificate.courseTitle, certificate.recipient].some((value) => value.toLowerCase().includes(normalized)));
  }, [certificates, query]);

  const download = (certificate: Certificate) => {
    if (certificate.pdfUrl) {
      window.open(certificate.pdfUrl, "_blank", "noopener,noreferrer");
      return;
    }
    window.print();
  };

  if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center"><PageSkeleton rows={4} /></div>;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Certificates</h2><p className="mt-1 text-sm text-gray-500">Certificates returned by your authenticated TechBridge account.</p></div><button onClick={() => void loadCertificates()} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><RefreshCw className="h-4 w-4" /> Refresh</button></header>
      <div className="flex justify-end"><button onClick={() => setShowIssueForm(true)} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"><Plus className="h-4 w-4" /> Add certificate</button></div>
      {showIssueForm && <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5"><div className="mb-4 flex items-center justify-between"><div><h3 className="font-semibold text-gray-900">Issue course certificate</h3><p className="mt-1 text-xs text-gray-500">Select an existing enrollment so the certificate keeps its course, student, and enrollment relationships.</p></div><button type="button" onClick={() => setShowIssueForm(false)} className="rounded-lg p-2 text-gray-400 hover:bg-white"><X className="h-4 w-4" /></button></div><form onSubmit={handleIssue} className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-medium text-gray-700">Course<select value={selectedCourseId} onChange={(event) => { setSelectedCourseId(event.target.value); setSelectedEnrollmentId(""); }} className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm" required><option value="">Select a course</option>{courses.map((course) => <option key={courseId(course)} value={courseId(course)}>{course.title}</option>)}</select></label><label className="text-sm font-medium text-gray-700">Enrollment<select value={selectedEnrollmentId} onChange={(event) => setSelectedEnrollmentId(event.target.value)} className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm" required disabled={!selectedCourseId}><option value="">{selectedCourse ? (availableEnrollments.length ? "Select a student enrollment" : "No enrollments found") : "Select a course first"}</option>{availableEnrollments.map((enrollment) => <option key={enrollment.id} value={enrollment.id}>{enrollmentName(enrollment)}{enrollment.status ? ` (${enrollment.status})` : ""}</option>)}</select></label><label className="text-sm font-medium text-gray-700 sm:col-span-2">Certificate number <span className="font-normal text-gray-400">(optional)</span><input value={certificateNumber} onChange={(event) => setCertificateNumber(event.target.value)} placeholder="Leave blank to let the backend generate one" className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm" maxLength={50} /></label><div className="flex justify-end gap-2 sm:col-span-2"><button type="button" onClick={() => setShowIssueForm(false)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700">Cancel</button><button type="submit" disabled={isIssuing || !availableEnrollments.length} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{isIssuing ? "Issuing..." : "Issue certificate"}</button></div></form></div>}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3"><div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-2xl font-bold text-gray-900">{certificates.length}</p><p className="text-sm text-gray-500">Certificates</p></div><div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-2xl font-bold text-emerald-600">{certificates.filter((certificate) => certificate.isValid).length}</p><p className="text-sm text-gray-500">Valid</p></div><div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-2xl font-bold text-gray-700">{new Set(certificates.map((certificate) => certificate.courseTitle)).size}</p><p className="text-sm text-gray-500">Courses represented</p></div></div>
      <div className="relative rounded-xl border border-gray-200 bg-white p-3"><Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by certificate number, course, or recipient..." className="w-full rounded-lg bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-200" /></div>
      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      {filtered.length === 0 ? <div className="rounded-xl border border-gray-200 bg-white p-12 text-center"><Award className="mx-auto mb-3 h-12 w-12 text-gray-300" /><p className="font-medium text-gray-700">No certificates found</p><p className="mt-1 text-sm text-gray-400">The backend returns certificates available to the signed-in account.</p></div> : <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white"><table className="w-full min-w-[680px] text-left"><thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-5 py-3">Certificate</th><th className="px-5 py-3">Course</th><th className="px-5 py-3">Recipient</th><th className="px-5 py-3">Issued</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Action</th></tr></thead><tbody>{filtered.map((certificate) => <tr key={certificate.id} className="border-b border-gray-100 last:border-0"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="rounded-lg bg-amber-50 p-2 text-amber-600"><Award className="h-4 w-4" /></div><span className="font-medium text-gray-900">{certificate.number}</span></div></td><td className="px-5 py-4 text-sm text-gray-700">{certificate.courseTitle}</td><td className="px-5 py-4 text-sm text-gray-700">{certificate.recipient}</td><td className="px-5 py-4 text-sm text-gray-500">{formatDate(certificate.issuedAt)}</td><td className="px-5 py-4"><span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${certificate.isValid ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>{certificate.isValid ? <CheckCircle className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}{certificate.isValid ? "Valid" : "Revoked"}</span></td><td className="px-5 py-4 text-right"><button onClick={() => download(certificate)} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"><Download className="h-4 w-4" /> Download</button></td></tr>)}</tbody></table></div>}
    </div>
  );
}

export default TutorCertificates;

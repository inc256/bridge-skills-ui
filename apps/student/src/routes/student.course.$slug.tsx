import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Award, Clock, Users, Star, Check, ChevronRight, PlayCircle, Globe, Download, RefreshCw } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { CourseThumb } from "@/components/course-thumb";
import { jsPDF } from "jspdf";
import { checkCourseEnrollment, enrollInCourse, getCourse, getCourseModules, getLocalWishlistCourses, getPaymentStatus, getStoredSession, initiatePayment, sortCourseModules, toggleLocalWishlist } from "@/lib/api";
import type { Course } from "@/lib/api";

function isSuccessfulPaymentStatus(status: unknown) {
  return ["paid", "success", "succeeded", "successful", "completed"].includes(String(status ?? "").toLowerCase());
}

function getPendingPaymentStorageKey(courseSlug: string) {
  const userId = getStoredSession()?.user?.id ?? "guest";
  return `bridge_student_pending_payment:${userId}:${courseSlug}`;
}

async function refreshPayment(reference: string, courseSlug: string) {
  const response = await getPaymentStatus(reference);
  const payment = response?.payment ?? response?.data?.payment ?? response?.data ?? response;
  const status = String(payment?.status ?? payment?.payment_status ?? response?.status ?? response?.payment_status ?? "pending");
  const paymentConfirmed = response?.enrolled === true
    || payment?.enrolled === true
    || isSuccessfulPaymentStatus(status);

  if (!paymentConfirmed) return { status, enrolled: false };

  const enrollment = await checkCourseEnrollment(courseSlug);
  const enrolled = Boolean(
    enrollment?.enrolled
      ?? enrollment?.is_enrolled
      ?? ["active", "completed"].includes(String(enrollment?.status ?? "").toLowerCase()),
  );
  return { status, enrolled };
}

export const Route = createFileRoute("/student/course/$slug")({
  loader: async ({ params }) => {
    const course = await getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  component: CourseDetails,
  notFoundComponent: () => <div className="p-8">Course not found.</div>,
});

function CourseDetails() {
  const navigate = useNavigate();
  const { course } = Route.useLoaderData();
  const [modules, setModules] = useState<any[]>([]);
  const [enrolled, setEnrolled] = useState(course.progress != null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"mobile_money" | "card">("mobile_money");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);
  const raw = course.raw as Record<string, any>;

  const getYoutubeId = (url: string | undefined) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = getYoutubeId(course.introVideoUrl ?? raw?.intro_video_url ?? raw?.video_url ?? raw?.youtube_url);

  useEffect(() => {
    void getCourseModules(course.slug).then((data) => setModules(Array.isArray(data) ? sortCourseModules(data) : []));
  }, [course.slug]);

  useEffect(() => {
    void checkCourseEnrollment(course.slug).then((result) => {
      if (result) setEnrolled(Boolean(result.enrolled ?? result.is_enrolled ?? result.status === "active"));
    });
    const wishlist = getLocalWishlistCourses();
    setIsBookmarked(wishlist.some((item) => item.slug === course.slug));
  }, [course.slug]);

  async function handleBookmark() {
    setBookmarking(true);
    setEnrollmentError(null);
    try {
      const nextBookmarked = toggleLocalWishlist(course);
      setIsBookmarked(nextBookmarked);
    } catch (error) {
      setEnrollmentError(error instanceof Error ? error.message : "Unable to update bookmarks right now.");
    } finally {
      setBookmarking(false);
    }
  }

  function downloadSyllabus() {
    const pdf = new jsPDF();
    const margin = 18;
    const lineWidth = 174;
    let y = 20;
    const write = (text: string, size = 11, gap = 6) => {
      pdf.setFontSize(size);
      const lines = pdf.splitTextToSize(text, lineWidth);
      pdf.text(lines, margin, y);
      y += lines.length * (size * 0.45) + gap;
      if (y > 275) {
        pdf.addPage();
        y = 20;
      }
    };

    write(course.title, 20, 10);
    write(course.description || "Course syllabus", 11, 10);
    courseDetails.forEach(({ l, v }) => write(`${l}: ${v}`, 10, 4));
    if (course.learningOutcomes?.length) {
      write("Outcomes", 14, 6);
      course.learningOutcomes.forEach((outcome: string) => write(`• ${outcome}`, 10, 3));
    }
    if (course.requirements?.length) {
      write("Requirements", 14, 6);
      course.requirements.forEach((requirement: string) => write(`• ${requirement}`, 10, 3));
    }
    if (modules.length) {
      write("Course curriculum", 14, 6);
      modules.forEach((module, index) => {
        write(`Module ${index + 1}: ${module.title}`, 12, 4);
        (module.lessons ?? []).forEach((lesson: any) => write(`• ${lesson.title}${lesson.duration ? ` (${lesson.duration})` : ""}`, 10, 3));
      });
    }
    pdf.save(`${course.slug}-syllabus.pdf`);
  }

  const rawPrice = raw?.price ?? raw?.amount;
  const numericPrice = rawPrice == null ? Number.NaN : Number(rawPrice);
  const isFree = course.price.toLowerCase() === "free"
    || String(raw?.pricing ?? "").toLowerCase() === "free"
    || raw?.is_free === true
    || (Number.isFinite(numericPrice) && numericPrice <= 0);

  useEffect(() => {
    const storageKey = getPendingPaymentStorageKey(course.slug);
    const reference = window.localStorage.getItem(storageKey);
    if (!reference) return;

    let cancelled = false;
    setPaymentReference(reference);
    setCheckingPayment(true);
    void refreshPayment(reference, course.slug)
      .then(({ status, enrolled: hasEnrollment }) => {
        if (cancelled) return;
        setPaymentStatus(status);
        if (hasEnrollment) {
          window.localStorage.removeItem(storageKey);
          setEnrolled(true);
          navigate({ to: "/student/study/$slug", params: { slug: course.slug } });
        } else if (isSuccessfulPaymentStatus(status)) {
          setEnrollmentError("Payment is confirmed, but course access is still being activated. Check the payment status again shortly.");
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setEnrollmentError(error instanceof Error ? error.message : "Unable to check payment status.");
        }
      })
      .finally(() => {
        if (!cancelled) setCheckingPayment(false);
      });

    return () => {
      cancelled = true;
    };
  }, [course.slug, navigate]);

  async function handleAccessCourse() {
    if (enrolled) return;
    if (!isFree) {
      setShowPaymentForm(true);
      return;
    }
    setEnrolling(true);
    setEnrollmentError(null);
    try {
      await enrollInCourse(course.slug);
      setEnrolled(true);
      navigate({ to: "/student/study/$slug", params: { slug: course.slug } });
    } catch (error) {
      setEnrollmentError(error instanceof Error ? error.message : "Unable to enroll in this course.");
    } finally {
      setEnrolling(false);
    }
  }

  async function handleStartPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnrolling(true);
    setEnrollmentError(null);
    setPaymentReference(null);
    setPaymentStatus(null);
    try {
      const courseId = typeof raw?.id === "string" ? raw.id.trim() : "";
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(courseId)) {
        throw new Error("This course is missing a valid payment identifier. Please contact support.");
      }
      if (paymentMethod === "mobile_money" && !phoneNumber.trim()) {
        throw new Error("Enter the mobile money phone number for this payment.");
      }
      const response = await initiatePayment("makypay", {
        course_id: courseId,
        method: paymentMethod,
        ...(paymentMethod === "mobile_money" ? { phone_number: phoneNumber.trim() } : {}),
      });
      const payment = response?.payment ?? response?.data?.payment ?? response?.data ?? response;
      const redirectUrl = payment?.redirect_url ?? response?.redirect_url;
      const reference = payment?.reference
        ?? payment?.payment_reference
        ?? response?.reference
        ?? response?.payment_reference;
      const paymentReferenceValue = typeof reference === "string" ? reference.trim() : "";
      if (!paymentReferenceValue) throw new Error("Payment was not started: the payment service did not return a reference.");
      window.localStorage.setItem(getPendingPaymentStorageKey(course.slug), paymentReferenceValue);
      setPaymentReference(paymentReferenceValue);
      setPaymentStatus(String(payment?.status ?? payment?.payment_status ?? response?.status ?? response?.payment_status ?? "pending"));

      if (paymentMethod === "card" && (typeof redirectUrl !== "string" || !redirectUrl)) {
        throw new Error("The payment service did not return a secure card checkout link. Your payment reference is saved so you can check its status.");
      }
      if (typeof redirectUrl === "string" && redirectUrl) {
        window.location.assign(redirectUrl);
        return;
      }

      const result = await refreshPayment(paymentReferenceValue, course.slug);
      setPaymentStatus(result.status);
      if (result.enrolled) {
        window.localStorage.removeItem(getPendingPaymentStorageKey(course.slug));
        setEnrolled(true);
        navigate({ to: "/student/study/$slug", params: { slug: course.slug } });
      } else if (isSuccessfulPaymentStatus(result.status)) {
        setEnrollmentError("Payment is confirmed, but course access is still being activated. Check the payment status again shortly.");
      }
    } catch (error) {
      setEnrollmentError(error instanceof Error ? error.message : "Unable to start this payment.");
    } finally {
      setEnrolling(false);
    }
  }

  async function handleRefreshPaymentStatus() {
    if (!paymentReference) return;
    setCheckingPayment(true);
    setEnrollmentError(null);
    try {
      const result = await refreshPayment(paymentReference, course.slug);
      setPaymentStatus(result.status);
      if (result.enrolled) {
        window.localStorage.removeItem(getPendingPaymentStorageKey(course.slug));
        setEnrolled(true);
        navigate({ to: "/student/study/$slug", params: { slug: course.slug } });
      } else if (isSuccessfulPaymentStatus(result.status)) {
        setEnrollmentError("Payment is confirmed, but course access is still being activated. Check the payment status again shortly.");
      }
    } catch (error) {
      setEnrollmentError(error instanceof Error ? error.message : "Unable to check payment status.");
    } finally {
      setCheckingPayment(false);
    }
  }

  const courseDetails = [
    course.level ? { l: "Skill level", v: course.level } : null,
    course.duration ? { l: "Total duration", v: course.duration } : null,
    course.lessons > 0 ? { l: "Lessons", v: `${course.lessons}` } : null,
    course.certificate ? { l: "Certificate", v: "Included" } : null,
    course.language ? { l: "Language", v: course.language } : null,
  ].filter(Boolean) as Array<{ l: string; v: string }>;

  const instructorName = course.instructor || raw?.instructor?.name || raw?.instructor;
  const instructorBioText = course.instructorBio || raw?.instructor?.bio || raw?.instructor_bio || raw?.instructor_description;
  const accessLabel = raw?.access_label ?? raw?.access_type ?? raw?.access;
  const hasCourseStats = Boolean(course.rating > 0 || course.students > 0 || course.duration || course.language || course.subtitles);
  const courseOutcomes = course.learningOutcomes ?? [];
  const courseRequirements = course.requirements ?? [];
  const hasCurriculum = modules.length > 0;
  const curriculumLessonCount = modules.reduce((total, module) => total + (Array.isArray(module.lessons) ? module.lessons.length : 0), 0);
  const curriculumDurationMinutes = modules.reduce((total, module) => total + (module.lessons ?? []).reduce((sum: number, lesson: any) => {
    const match = String(lesson.duration ?? "").match(/(\d+)\s*(h|m)/i);
    return sum + (match ? Number(match[1]) * (match[2].toLowerCase() === "h" ? 60 : 1) : 0);
  }, 0), 0);
  const curriculumDuration = curriculumDurationMinutes >= 60
    ? `${Math.floor(curriculumDurationMinutes / 60)}h${curriculumDurationMinutes % 60 ? ` ${curriculumDurationMinutes % 60}m` : ""}`
    : curriculumDurationMinutes ? `${curriculumDurationMinutes} min` : course.duration;
  const hasInstructor = Boolean(instructorName || instructorBioText);

  return (
    <div className="space-y-8">
      <nav className="text-xs text-muted-foreground">
        <Link to="/student/explore" className="hover:text-foreground">Explore</Link> / <span>{course.category}</span> / <span className="text-foreground">{course.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-3xl bg-black">
            {youtubeId ? (
              <iframe
                className="h-full w-full min-h-[240px]"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <CourseThumb variant={course.image} color={course.color} thumbnail={course.thumbnail} title={course.title} />
            )}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{course.category}</span>
            {course.level ? <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">{course.level}</span> : null}
            {course.certificate && <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 text-xs font-medium text-[var(--gold)]"><Award className="mr-1 inline h-3 w-3" />Certificate</span>}
          </div>
          <h1 className="mt-4 text-[36px] font-semibold leading-tight tracking-tight">{course.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{course.description}</p>

          {hasCourseStats && (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {course.rating > 0 && (
                <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" /> <span className="text-foreground font-semibold">{course.rating}</span> ({course.reviews.toLocaleString()} reviews)</span>
              )}
              {course.students > 0 && (
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.students.toLocaleString()} students</span>
              )}
              {course.duration && (
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration}</span>
              )}
              {(course.language || course.subtitles) && (
                <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />{course.language ? ` ${course.language}` : ""}{course.subtitles ? ` + ${course.subtitles} subtitles` : ""}</span>
              )}
            </div>
          )}

          <section className="mt-10 card-surface p-6">
            <h3 className="text-[18px] font-semibold">Outcomes &amp; Requirements</h3>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-foreground">What you will learn</h4>
                {courseOutcomes.length > 0 ? (
                  <ul className="mt-3 space-y-3">
                    {courseOutcomes.map((outcome, index) => (
                      <li key={`${outcome}-${index}`} className="flex gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">No outcomes have been added yet.</p>
                )}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Requirements</h4>
                {courseRequirements.length > 0 ? (
                  <ul className="mt-3 space-y-3">
                    {courseRequirements.map((requirement, index) => (
                      <li key={`${requirement}-${index}`} className="flex gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">No prerequisites are required.</p>
                )}
              </div>
            </div>
          </section>

          {hasCurriculum && (
            <section className="mt-8">
              <div className="flex items-end justify-between">
                <h3 className="text-[18px] font-semibold">Curriculum</h3>
                <div className="text-xs text-muted-foreground">{modules.length} module{modules.length === 1 ? "" : "s"} · {curriculumLessonCount} lessons · {curriculumDuration}</div>
              </div>
              <div className="mt-4 space-y-3">
                {modules.map((m, i) => (
                  <div key={m.id ?? i} className="card-surface p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-medium text-muted-foreground">Module {i + 1}: {m.title}</div>
                      </div>
                      <span className="text-xs text-muted-foreground">{m.lessons?.length ?? 0} lessons · {m.duration}</span>
                    </div>
                    {Array.isArray(m.lessons) && m.lessons.length > 0 ? (
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {m.lessons.map((l: any) => (
                          <li key={l.id ?? l.title} className="flex items-center justify-between gap-3">
                            <span>{l.title}</span>
                            <span>{l.duration}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasInstructor && (
            <section className="mt-8 card-surface p-6">
              <h3 className="text-[18px] font-semibold">Your instructor</h3>
              <div className="mt-4 flex gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-lg font-semibold">
                  {instructorName ? instructorName.split(" ").map((n: string) => n[0]).join("") : "?"}
                </div>
                <div>
                  {instructorName && <div className="text-[15px] font-semibold">{instructorName}</div>}
                  {course.instructorTitle && <div className="text-sm text-muted-foreground">{course.instructorTitle}</div>}
                  {instructorBioText && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {instructorBioText}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          <div className="sticky top-24 card-surface p-6">
            <div className="text-[28px] font-semibold tracking-tight">{course.price || "Price unavailable"}</div>
            {accessLabel ? <div className="text-xs text-muted-foreground">{accessLabel}</div> : null}
            {enrolled ? (
              <Link
                to="/student/study/$slug"
                params={{ slug: course.slug }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <PlayCircle className="h-4 w-4" /> Continue learning
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => void handleAccessCourse()}
                disabled={enrolling}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:cursor-wait disabled:opacity-60"
              >
                {enrolling && <span className="skeleton h-4 w-16 rounded" aria-hidden="true" />}
                {enrolling ? "Processing..." : isFree ? "Enroll and start" : "Pay and enroll"}
              </button>
            )}
            {!isFree && !enrolled && showPaymentForm && !paymentReference && (
              <form onSubmit={(event) => void handleStartPayment(event)} className="mt-4 space-y-3 rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-semibold">Choose a payment method</p>
                <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-border p-3 text-sm">
                  <input type="radio" name="payment-method" checked={paymentMethod === "mobile_money"} onChange={() => setPaymentMethod("mobile_money")} className="mt-0.5" />
                  <span><span className="block font-medium">Mobile money</span><span className="text-xs text-muted-foreground">Approve the payment on your phone.</span></span>
                </label>
                <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-border p-3 text-sm">
                  <input type="radio" name="payment-method" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="mt-0.5" />
                  <span><span className="block font-medium">Card</span><span className="text-xs text-muted-foreground">Continue to the secure card checkout.</span></span>
                </label>
                {paymentMethod === "mobile_money" && (
                  <label className="block space-y-1 text-sm font-medium">
                    <span>Mobile money phone number</span>
                    <input type="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required placeholder="256700000000" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-normal" />
                  </label>
                )}
                <button type="submit" disabled={enrolling} className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
                  {enrolling ? "Starting payment..." : `Continue · ${course.price || "Price unavailable"}`}
                </button>
              </form>
            )}
            {paymentReference && (
              <div className="mt-4 space-y-2 rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-semibold">Payment {paymentStatus || "pending"}</p>
                <p className="break-all text-xs text-muted-foreground">Reference: {paymentReference}</p>
                <button type="button" onClick={() => void handleRefreshPaymentStatus()} disabled={checkingPayment} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted disabled:opacity-50">
                  <RefreshCw className={`h-3.5 w-3.5 ${checkingPayment ? "animate-spin" : ""}`} />Check payment status
                </button>
              </div>
            )}
            {enrollmentError && <p className="mt-3 text-xs text-destructive">{enrollmentError}</p>}
            <button
              type="button"
              onClick={() => void handleBookmark()}
              disabled={bookmarking}
              className="mt-2 w-full rounded-[14px] border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-60"
            >
              {bookmarking ? "Updating..." : isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            </button>
            <div className="mt-6 space-y-3 text-sm">
              {courseDetails.map((r) => (
                <div key={r.l} className="flex items-center justify-between border-b border-border pb-2.5 last:border-0">
                  <span className="text-muted-foreground">{r.l}</span>
                  <span className="font-medium">{r.v}</span>
                </div>
              ))}
            </div>
            <button type="button" onClick={downloadSyllabus} className="mt-4 inline-flex w-full items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground">
              <Download className="h-3.5 w-3.5" /> Download syllabus (PDF)
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

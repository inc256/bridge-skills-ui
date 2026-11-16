import type { Course, Quiz } from "@/lib/api";
import { courses as courseCatalog } from "@/lib/mock-data";

export type MockLesson = {
  id: string;
  title: string;
  type: "text" | "quiz";
  duration: string;
  content: string;
  video_url?: string;
  completed: boolean;
  xp_reward: number;
};

export type MockModule = {
  id: string;
  title: string;
  duration: string;
  lessons: MockLesson[];
};

type ModuleSeed = {
  title: string;
  duration: string;
  lessonTitles: [string, string];
};

const curriculum: Record<string, ModuleSeed[]> = {
  "networking-essentials": [
    { title: "Foundations of Networking", duration: "1h 20m", lessonTitles: ["How devices communicate", "The OSI model in practice"] },
    { title: "IP Addressing & Subnetting", duration: "1h 45m", lessonTitles: ["IPv4 address fundamentals", "Subnetting a small network"] },
    { title: "Routing & Network Design", duration: "1h 30m", lessonTitles: ["Choosing a route", "Building a resilient network"] },
  ],
  "ethical-hacking": [
    { title: "Security Foundations", duration: "1h 10m", lessonTitles: ["Thinking like a defender", "Scope and authorization"] },
    { title: "Reconnaissance & Discovery", duration: "1h 35m", lessonTitles: ["Mapping an application", "Identifying exposed services"] },
    { title: "Testing & Reporting", duration: "1h 25m", lessonTitles: ["Validating a finding safely", "Writing a clear security report"] },
  ],
  "typescript-fullstack": [
    { title: "TypeScript Foundations", duration: "1h 15m", lessonTitles: ["Types that model real data", "Narrowing and reusable types"] },
    { title: "Building an API", duration: "1h 40m", lessonTitles: ["Designing typed endpoints", "Validating incoming data"] },
    { title: "React & Production Patterns", duration: "1h 35m", lessonTitles: ["Typed React components", "Connecting a full-stack feature"] },
  ],
  "applied-machine-learning": [
    { title: "Preparing Data", duration: "1h 20m", lessonTitles: ["Exploring a dataset", "Building a reliable data split"] },
    { title: "Training Models", duration: "1h 45m", lessonTitles: ["Selecting a baseline model", "Evaluating model performance"] },
    { title: "Putting Models to Work", duration: "1h 30m", lessonTitles: ["Improving a model responsibly", "Planning a model deployment"] },
  ],
  "cloud-architect-aws": [
    { title: "Cloud Architecture Basics", duration: "1h 15m", lessonTitles: ["Designing for cloud workloads", "Choosing the right architecture"] },
    { title: "Resilience & Security", duration: "1h 40m", lessonTitles: ["Building highly available systems", "Applying least-privilege access"] },
    { title: "Cost & Operations", duration: "1h 30m", lessonTitles: ["Making costs visible", "Monitoring a cloud service"] },
  ],
  "product-design-systems": [
    { title: "Design System Foundations", duration: "1h 5m", lessonTitles: ["When a team needs a system", "Establishing design principles"] },
    { title: "Tokens & Components", duration: "1h 30m", lessonTitles: ["Creating useful design tokens", "Building flexible components"] },
    { title: "Documentation & Governance", duration: "1h 20m", lessonTitles: ["Writing component guidance", "Keeping a system healthy"] },
  ],
};

const defaultEnrolledSlugs = courseCatalog
  .filter((course) => course.progress !== undefined)
  .map((course) => course.slug);
const enrollmentStorageKey = "bridge-student-demo-enrollments";
const wishlistStorageKey = "bridge-student-wishlist";

function createModules(slug: string, courseTitle: string): MockModule[] {
  return (curriculum[slug] ?? []).map((module, moduleIndex) => {
    const moduleId = `mock-${slug}-module-${moduleIndex + 1}`;
    const lessonTitles = [...module.lessonTitles, `Knowledge check: ${module.title}`];
    return {
      id: moduleId,
      title: module.title,
      duration: module.duration,
      lessons: lessonTitles.map((title, lessonIndex) => {
        const isQuiz = lessonIndex === 2;
        const lessonId = `${moduleId}-lesson-${lessonIndex + 1}`;
        return {
          id: lessonId,
          title,
          type: isQuiz ? "quiz" : "text",
          duration: isQuiz ? "5 min" : `${12 + lessonIndex * 4} min`,
          content: isQuiz
            ? `<p>Review the key ideas from <strong>${module.title}</strong>, then take the short knowledge check.</p>`
            : `<p>This demo lesson introduces <strong>${title}</strong> as part of ${courseTitle}.</p><p>Work through the key ideas, connect them to a practical example, and use the lesson list to continue at your own pace.</p>`,
          completed: moduleIndex === 0 && lessonIndex === 0,
          xp_reward: isQuiz ? 30 : 20,
        };
      }),
    };
  });
}

function createQuizzes(slug: string, modules: MockModule[]): Quiz[] {
  return modules.map((module, index) => ({
    id: `${slug}-quiz-${index + 1}`,
    title: `Knowledge check: ${module.title}`,
    description: `Review the main ideas from ${module.title}.`,
    questions: [{
      id: `${slug}-question-${index + 1}`,
      prompt: `Which approach best supports the work covered in ${module.title}?`,
      type: "multiple_choice",
      choices: [
        { id: "apply", value: "apply", label: "Apply the idea to a realistic example" },
        { id: "skip", value: "skip", label: "Skip the fundamentals and guess" },
        { id: "ignore", value: "ignore", label: "Ignore feedback and verification" },
      ],
    }],
  }));
}

export function getMockCourses(): Course[] {
  return courseCatalog.map((course) => getMockCourse(course.slug)).filter((course): course is Course => course !== null);
}

export function getMockCourse(slug: string): Course | null {
  const seed = courseCatalog.find((course) => course.slug === slug);
  if (!seed) return null;
  const modules = createModules(seed.slug, seed.title);
  return {
    ...seed,
    modules: modules.length,
    lessons: modules.reduce((count, module) => count + module.lessons.length, 0),
    language: "English",
    instructorBio: `${seed.instructor} brings practical experience in ${seed.category.toLowerCase()} and focuses on clear, hands-on teaching.`,
    learningOutcomes: [
      `Explain the core concepts behind ${seed.title}.`,
      "Apply the techniques in a practical scenario.",
      "Plan a next step for continued learning.",
    ],
    requirements: ["No prior experience is required.", "A computer and curiosity to learn."],
    raw: { is_free: true, resources: [] },
  };
}

export function getMockCourseModules(slug: string): MockModule[] {
  const course = courseCatalog.find((item) => item.slug === slug);
  return course ? createModules(slug, course.title) : [];
}

export function getMockQuizzesForCourse(slug: string): Quiz[] {
  return createQuizzes(slug, getMockCourseModules(slug));
}

export function getMockQuiz(quizId: string): Quiz | null {
  return courseCatalog
    .flatMap((course) => getMockQuizzesForCourse(course.slug))
    .find((quiz) => quiz.id === quizId) ?? null;
}

export function scoreMockQuiz(quiz: Quiz, answers: Record<string, string>) {
  const correctAnswers = quiz.questions.filter((question) => answers[question.id] === "apply").length;
  const score = quiz.questions.length ? Math.round((correctAnswers / quiz.questions.length) * 100) : 0;
  return {
    score,
    message: `${correctAnswers} of ${quiz.questions.length} answers correct.`,
  };
}

export function getMockEnrolledCourseSlugs() {
  const enrolled = new Set(defaultEnrolledSlugs);
  if (typeof window === "undefined") return enrolled;
  try {
    const saved = JSON.parse(window.localStorage.getItem(enrollmentStorageKey) ?? "[]");
    if (Array.isArray(saved)) {
      saved.filter((slug): slug is string => typeof slug === "string").forEach((slug) => enrolled.add(slug));
    }
  } catch {
    return enrolled;
  }
  return enrolled;
}

export function enrollInMockCourse(slug: string) {
  if (typeof window === "undefined") return;
  const enrolled = getMockEnrolledCourseSlugs();
  enrolled.add(slug);
  window.localStorage.setItem(enrollmentStorageKey, JSON.stringify([...enrolled]));
}

export function isMockCourseEnrolled(slug: string) {
  return getMockEnrolledCourseSlugs().has(slug);
}

export function getMockWishlistCourses(): Course[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(window.localStorage.getItem(wishlistStorageKey) ?? "[]");
    return Array.isArray(saved) ? saved as Course[] : [];
  } catch {
    return [];
  }
}

export function toggleMockWishlist(course: Course) {
  const current = getMockWishlistCourses();
  const exists = current.some((item) => item.slug === course.slug);
  const next = exists ? current.filter((item) => item.slug !== course.slug) : [...current, course];
  if (typeof window !== "undefined") window.localStorage.setItem(wishlistStorageKey, JSON.stringify(next));
  return !exists;
}

export type Course = {
  id: string;
  title: string;
  slug: string;
  instructor: string;
  instructorTitle: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  students: number;
  rating: number;
  reviews: number;
  certificate: boolean;
  price: string;
  image: string;
  color: string;
  description: string;
  progress?: number;
  modules: number;
  lessons: number;
};

export const courses: Course[] = [
  {
    id: "c1",
    slug: "networking-essentials",
    title: "Networking Essentials: From Cables to the Cloud",
    instructor: "Amara Okafor",
    instructorTitle: "Senior Network Engineer, Cisco",
    category: "Networking",
    level: "Beginner",
    duration: "42h",
    students: 12480,
    rating: 4.8,
    reviews: 2140,
    certificate: true,
    price: "Free",
    image: "network",
    color: "#1F6E5C",
    description: "Master the fundamentals of computer networking — protocols, routing, switching, and troubleshooting real infrastructure.",
    progress: 62,
    modules: 8,
    lessons: 54,
  },
  {
    id: "c2",
    slug: "ethical-hacking",
    title: "Ethical Hacking & Penetration Testing",
    instructor: "David Mensah",
    instructorTitle: "Lead Security Researcher",
    category: "Cybersecurity",
    level: "Intermediate",
    duration: "36h",
    students: 8920,
    rating: 4.9,
    reviews: 1580,
    certificate: true,
    price: "Free",
    image: "security",
    color: "#0D2922",
    description: "Learn offensive security techniques used by professional penetration testers to secure modern applications.",
    progress: 24,
    modules: 10,
    lessons: 68,
  },
  {
    id: "c3",
    slug: "typescript-fullstack",
    title: "Full-Stack TypeScript with Node & React",
    instructor: "Priya Ramanathan",
    instructorTitle: "Staff Engineer, Stripe",
    category: "Software Engineering",
    level: "Intermediate",
    duration: "58h",
    students: 15302,
    rating: 4.9,
    reviews: 3210,
    certificate: true,
    price: "Free",
    image: "code",
    color: "#3B82F6",
    description: "Build production-grade full-stack applications using TypeScript, Node.js, and modern React patterns.",
    progress: 88,
    modules: 12,
    lessons: 96,
  },
  {
    id: "c4",
    slug: "applied-machine-learning",
    title: "Applied Machine Learning with Python",
    instructor: "Dr. Ethan Cole",
    instructorTitle: "AI Researcher, DeepMind",
    category: "Artificial Intelligence",
    level: "Advanced",
    duration: "48h",
    students: 6740,
    rating: 4.7,
    reviews: 890,
    certificate: true,
    price: "Free",
    image: "ai",
    color: "#D4A24E",
    description: "Practical machine learning: from data preprocessing to deploying real-world models with scikit-learn and PyTorch.",
    modules: 9,
    lessons: 72,
  },
  {
    id: "c5",
    slug: "cloud-architect-aws",
    title: "Cloud Architect Certification (AWS)",
    instructor: "Sofia Marín",
    instructorTitle: "Principal Solutions Architect",
    category: "Networking",
    level: "Advanced",
    duration: "52h",
    students: 9840,
    rating: 4.8,
    reviews: 1720,
    certificate: true,
    price: "Free",
    image: "cloud",
    color: "#1F6E5C",
    description: "Design resilient, cost-optimized cloud architectures on AWS aligned with the Well-Architected Framework.",
    modules: 11,
    lessons: 84,
  },
  {
    id: "c6",
    slug: "product-design-systems",
    title: "Designing Scalable Product Design Systems",
    instructor: "Noah Bergström",
    instructorTitle: "Design Lead, Linear",
    category: "Software Engineering",
    level: "Intermediate",
    duration: "28h",
    students: 5210,
    rating: 4.9,
    reviews: 640,
    certificate: true,
    price: "Free",
    image: "design",
    color: "#587267",
    description: "Build and maintain a design system that scales across teams — tokens, components, documentation, and governance.",
    modules: 7,
    lessons: 42,
  },
];

export const learningPaths = [
  { id: "p1", title: "Networking", description: "From cabling to enterprise cloud networks", courses: 12, hours: 180, icon: "network", color: "#1F6E5C" },
  { id: "p2", title: "Cybersecurity", description: "Defensive and offensive security tracks", courses: 14, hours: 210, icon: "shield", color: "#0D2922" },
  { id: "p3", title: "Software Engineering", description: "Full-stack, systems, and architecture", courses: 18, hours: 260, icon: "code", color: "#3B82F6" },
  { id: "p4", title: "Artificial Intelligence", description: "ML, deep learning, and applied AI", courses: 10, hours: 165, icon: "cpu", color: "#D4A24E" },
];

export const testimonials = [
  { name: "Kwame Anane", role: "Software Engineer, Andela", quote: "TechBridge gave me a structured way to close the gap between tutorials and real production engineering. The certificate opened doors immediately." },
  { name: "Elena Rossi", role: "Cloud Consultant", quote: "The cloud architect path was the closest thing I found to a real mentor. Every lesson felt intentional — nothing filler." },
  { name: "Rahul Verma", role: "Security Analyst, Tata", quote: "The pen-testing labs are excellent. I refer teammates to TechBridge courses regularly for onboarding." },
];

export const partners = ["Cisco", "Microsoft", "Google Cloud", "IBM", "Oracle", "Red Hat"];

export const activity = [
  { id: 1, type: "lesson", text: "Completed lesson · Subnetting IPv4 networks", time: "2h ago", course: "Networking Essentials" },
  { id: 2, type: "quiz", text: "Scored 92% on OSI Model quiz", time: "Yesterday", course: "Networking Essentials" },
  { id: 3, type: "cert", text: "Earned certificate · Intro to Python", time: "2 days ago", course: "Python Foundations" },
  { id: 4, type: "assignment", text: "Submitted assignment · REST API design", time: "3 days ago", course: "TypeScript Full-Stack" },
];

export const deadlines = [
  { id: 1, title: "Final project · Secure Web App", course: "Ethical Hacking", due: "Fri, Nov 22", urgent: true },
  { id: 2, title: "Module 6 Quiz", course: "TypeScript Full-Stack", due: "Mon, Nov 25", urgent: false },
  { id: 3, title: "Peer review · Network diagram", course: "Networking Essentials", due: "Wed, Nov 27", urgent: false },
];

export const certificates = [
  { id: 1, title: "Python Foundations", issued: "Aug 2026", credentialId: "TBS-2026-PY-04812", instructor: "Priya Ramanathan" },
  { id: 2, title: "Intro to Cybersecurity", issued: "Jun 2026", credentialId: "TBS-2026-SEC-02184", instructor: "David Mensah" },
  { id: 3, title: "Cloud Fundamentals", issued: "Mar 2026", credentialId: "TBS-2026-CLD-00921", instructor: "Sofia Marín" },
];

export const students = [
  { id: 1, name: "Aisha Bello", email: "aisha.b@techbridge.io", course: "Networking Essentials", progress: 82, grade: "A", enrolled: "Sep 12" },
  { id: 2, name: "Marcus Reid", email: "marcus.r@techbridge.io", course: "Ethical Hacking", progress: 45, grade: "B+", enrolled: "Oct 02" },
  { id: 3, name: "Yuki Tanaka", email: "yuki.t@techbridge.io", course: "TypeScript Full-Stack", progress: 96, grade: "A+", enrolled: "Aug 21" },
  { id: 4, name: "Isabelle Laurent", email: "isabelle.l@techbridge.io", course: "Applied ML", progress: 12, grade: "—", enrolled: "Nov 04" },
  { id: 5, name: "Omar Haddad", email: "omar.h@techbridge.io", course: "Cloud Architect", progress: 67, grade: "A-", enrolled: "Sep 30" },
  { id: 6, name: "Chen Wei", email: "chen.w@techbridge.io", course: "Networking Essentials", progress: 38, grade: "B", enrolled: "Oct 18" },
];

export const tutors = [
  { id: 1, name: "Amara Okafor", specialty: "Networking", students: 4820, courses: 6, rating: 4.9, status: "Verified" },
  { id: 2, name: "David Mensah", specialty: "Cybersecurity", students: 3210, courses: 4, rating: 4.8, status: "Verified" },
  { id: 3, name: "Priya Ramanathan", specialty: "Software Engineering", students: 6104, courses: 8, rating: 4.9, status: "Verified" },
  { id: 4, name: "Dr. Ethan Cole", specialty: "Artificial Intelligence", students: 2080, courses: 3, rating: 4.7, status: "Pending" },
  { id: 5, name: "Sofia Marín", specialty: "Cloud", students: 3860, courses: 5, rating: 4.8, status: "Verified" },
];

export const modules = [
  {
    id: "m1", title: "Foundations of Networking", duration: "4h 20m", completed: true, lessons: [
      { id: "l1", title: "What is a network?", type: "video", duration: "12:40", completed: true },
      { id: "l2", title: "Network topologies", type: "video", duration: "18:22", completed: true },
      { id: "l3", title: "The OSI model in practice", type: "reading", duration: "15 min", completed: true },
      { id: "l4", title: "Quiz: Foundations", type: "quiz", duration: "10 min", completed: true },
    ],
  },
  {
    id: "m2", title: "IP Addressing & Subnetting", duration: "6h 10m", completed: false, lessons: [
      { id: "l5", title: "IPv4 addressing fundamentals", type: "video", duration: "22:10", completed: true },
      { id: "l6", title: "Subnetting deep-dive", type: "video", duration: "34:05", completed: true, current: true },
      { id: "l7", title: "Hands-on: build a /24 network", type: "lab", duration: "45 min", completed: false },
      { id: "l8", title: "IPv6 essentials", type: "video", duration: "26:44", completed: false },
      { id: "l9", title: "Assignment: Design a subnet plan", type: "assignment", duration: "1h", completed: false },
    ],
  },
  {
    id: "m3", title: "Routing & Switching", duration: "7h 30m", completed: false, lessons: [
      { id: "l10", title: "Static vs dynamic routing", type: "video", duration: "24:00", completed: false },
      { id: "l11", title: "OSPF in practice", type: "video", duration: "40:15", completed: false },
      { id: "l12", title: "VLANs explained", type: "video", duration: "18:32", completed: false },
    ],
  },
  {
    id: "m4", title: "Network Security Basics", duration: "5h 45m", completed: false, lessons: [
      { id: "l13", title: "Firewalls and ACLs", type: "video", duration: "22:18", completed: false },
      { id: "l14", title: "Common attack vectors", type: "reading", duration: "20 min", completed: false },
    ],
  },
];

// apps/student/src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { StudentAuthPage } from "@/components/student-auth-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Portal — TechBridge" },
      { name: "description", content: "Student application for the TechBridge learning experience." },
    ],
  }),
  component: StudentAuthPage,
});
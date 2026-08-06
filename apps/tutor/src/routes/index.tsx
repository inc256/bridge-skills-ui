import { createFileRoute } from "@tanstack/react-router";
import { TutorAuthPage } from "@/components/tutor-auth-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tutor Portal — TechBridge" },
      { name: "description", content: "Tutor application for the TechBridge instructor workspace." },
    ],
  }),
  component: TutorAuthPage,
});

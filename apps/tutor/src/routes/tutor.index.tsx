import { createFileRoute } from "@tanstack/react-router";
import { TutorDashboard } from "./tutor.dashboard";

export const Route = createFileRoute("/tutor/")({
  component: TutorDashboard,
});

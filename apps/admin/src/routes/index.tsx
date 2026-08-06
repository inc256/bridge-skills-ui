import { createFileRoute } from "@tanstack/react-router";
import { AdminAuthPage } from "@/components/admin-auth-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Admin Portal — TechBridge" },
      { name: "description", content: "Admin application for the TechBridge operations workspace." },
    ],
  }),
  component: AdminAuthPage,
});

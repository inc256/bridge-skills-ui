import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/student/study/")({
  component: () => (
    <div className="card-surface p-12 text-center">
      <h2 className="text-[22px] font-semibold">Pick a course to study</h2>
      <p className="mt-2 text-sm text-muted-foreground">Head to My Learning and continue where you left off.</p>
    </div>
  ),
});

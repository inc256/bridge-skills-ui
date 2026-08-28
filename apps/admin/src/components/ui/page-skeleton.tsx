import { Skeleton } from "./skeleton";

export function PageSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-6 p-4 sm:p-6" aria-busy="true" aria-label="Loading content">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => <Skeleton key={index} className="h-28 w-full" />)}
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, index) => <Skeleton key={index} className="h-20 w-full" />)}
      </div>
    </div>
  );
}

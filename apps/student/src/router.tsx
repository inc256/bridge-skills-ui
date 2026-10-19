import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { PageSkeleton } from "./components/ui/page-skeleton";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: PageSkeleton,
    defaultPendingMs: 250,
  });

  return router;
};

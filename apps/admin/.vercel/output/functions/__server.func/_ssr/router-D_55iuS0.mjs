import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D_55iuS0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DWRvXV12.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary font-semibold text-2xl",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-[14px] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Return home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Try refreshing the page or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-[14px] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-[14px] border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$23 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TechBridge Skills Hub — Learn Practical Skills That Build Real Careers" },
			{
				name: "description",
				content: "TechBridge Skills Hub is a modern learning platform for networking, cybersecurity, software engineering, and AI. Learn from expert tutors and earn industry certificates."
			},
			{
				property: "og:title",
				content: "TechBridge Skills Hub"
			},
			{
				property: "og:description",
				content: "Learn practical skills that build real careers."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$23.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$22 = () => import("./routes-DP8Yw5q8.mjs");
var Route$22 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Admin Portal — TechBridge" }, {
		name: "description",
		content: "Admin application for the TechBridge operations workspace."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./admin-uOFx6caO.mjs");
var Route$21 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin — TechBridge" }, {
		name: "description",
		content: "Super admin dashboard for TechBridge Skills Hub."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin.index-BCpppw50.mjs");
var Route$20 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./admin.audit-B6g5Ykj1.mjs");
var Route$19 = createFileRoute("/admin/audit")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./admin.auditlogs-BXrZrBW1.mjs");
var Route$18 = createFileRoute("/admin/auditlogs")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./admin.blog-C6Ai_1Xq.mjs");
var Route$17 = createFileRoute("/admin/blog")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./admin.categories-cWvx-hS3.mjs");
var Route$16 = createFileRoute("/admin/categories")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./admin.certificates-Cwa7PV69.mjs");
var Route$15 = createFileRoute("/admin/certificates")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./admin.cms-DJAKsVAT.mjs");
var Route$14 = createFileRoute("/admin/cms")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./admin.content-BOOWvAqk.mjs");
var Route$13 = createFileRoute("/admin/content")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./admin.courses-CtOcat8b.mjs");
var Route$12 = createFileRoute("/admin/courses")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./admin.dashboard-Dxx7sY78.mjs");
var Route$11 = createFileRoute("/admin/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./admin.enrollments-Cu6sSL4j.mjs");
var Route$10 = createFileRoute("/admin/enrollments")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin.jobs-DLSnotPP.mjs");
var Route$9 = createFileRoute("/admin/jobs")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin.lessons-iTEWfu2q.mjs");
var Route$8 = createFileRoute("/admin/lessons")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./admin.notifications-D71Jc0OM.mjs");
var Route$7 = createFileRoute("/admin/notifications")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin.quizzes-0sy5Yyir.mjs");
var Route$6 = createFileRoute("/admin/quizzes")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin.reports-DLGmAFyh.mjs");
var Route$5 = createFileRoute("/admin/reports")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.roles-Bcvhr5Q4.mjs");
var Route$4 = createFileRoute("/admin/roles")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.settings-CBxFHEOd.mjs");
var Route$3 = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.students-DGsQVP-s.mjs");
var Route$2 = createFileRoute("/admin/students")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.support-DvtN-eKw.mjs");
var Route$1 = createFileRoute("/admin/support")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.tutors-B4jqPrpp.mjs");
var Route = createFileRoute("/admin/tutors")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$23
});
var AdminRoute = Route$21.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$23
});
var AdminIndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminAuditRoute: Route$19.update({
		id: "/audit",
		path: "/audit",
		getParentRoute: () => AdminRoute
	}),
	AdminAuditlogsRoute: Route$18.update({
		id: "/auditlogs",
		path: "/auditlogs",
		getParentRoute: () => AdminRoute
	}),
	AdminBlogRoute: Route$17.update({
		id: "/blog",
		path: "/blog",
		getParentRoute: () => AdminRoute
	}),
	AdminCategoriesRoute: Route$16.update({
		id: "/categories",
		path: "/categories",
		getParentRoute: () => AdminRoute
	}),
	AdminCertificatesRoute: Route$15.update({
		id: "/certificates",
		path: "/certificates",
		getParentRoute: () => AdminRoute
	}),
	AdminCmsRoute: Route$14.update({
		id: "/cms",
		path: "/cms",
		getParentRoute: () => AdminRoute
	}),
	AdminContentRoute: Route$13.update({
		id: "/content",
		path: "/content",
		getParentRoute: () => AdminRoute
	}),
	AdminCoursesRoute: Route$12.update({
		id: "/courses",
		path: "/courses",
		getParentRoute: () => AdminRoute
	}),
	AdminDashboardRoute: Route$11.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => AdminRoute
	}),
	AdminEnrollmentsRoute: Route$10.update({
		id: "/enrollments",
		path: "/enrollments",
		getParentRoute: () => AdminRoute
	}),
	AdminJobsRoute: Route$9.update({
		id: "/jobs",
		path: "/jobs",
		getParentRoute: () => AdminRoute
	}),
	AdminLessonsRoute: Route$8.update({
		id: "/lessons",
		path: "/lessons",
		getParentRoute: () => AdminRoute
	}),
	AdminNotificationsRoute: Route$7.update({
		id: "/notifications",
		path: "/notifications",
		getParentRoute: () => AdminRoute
	}),
	AdminQuizzesRoute: Route$6.update({
		id: "/quizzes",
		path: "/quizzes",
		getParentRoute: () => AdminRoute
	}),
	AdminReportsRoute: Route$5.update({
		id: "/reports",
		path: "/reports",
		getParentRoute: () => AdminRoute
	}),
	AdminRolesRoute: Route$4.update({
		id: "/roles",
		path: "/roles",
		getParentRoute: () => AdminRoute
	}),
	AdminSettingsRoute: Route$3.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AdminRoute
	}),
	AdminStudentsRoute: Route$2.update({
		id: "/students",
		path: "/students",
		getParentRoute: () => AdminRoute
	}),
	AdminSupportRoute: Route$1.update({
		id: "/support",
		path: "/support",
		getParentRoute: () => AdminRoute
	}),
	AdminTutorsRoute: Route.update({
		id: "/tutors",
		path: "/tutors",
		getParentRoute: () => AdminRoute
	}),
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren)
};
var routeTree = Route$23._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

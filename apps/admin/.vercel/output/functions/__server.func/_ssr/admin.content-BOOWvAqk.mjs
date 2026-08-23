import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { R as Layers, V as House, a as Users, dt as ChevronRight, j as Megaphone, st as CircleQuestionMark, vt as Briefcase } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.content-BOOWvAqk.js
var import_jsx_runtime = require_jsx_runtime();
var CONTENT_SECTIONS = [
	{
		key: "homepage",
		icon: House,
		label: "Homepage",
		desc: "Hero, learning paths, featured courses, testimonials.",
		count: "5 sections",
		color: "#3B82F6",
		bg: "#EFF6FF"
	},
	{
		key: "testimonials",
		icon: Users,
		label: "Testimonials",
		desc: "Curate learner stories shown on the marketing site.",
		count: "12 published",
		color: "#16a34a",
		bg: "#F0FDF4"
	},
	{
		key: "partners",
		icon: Briefcase,
		label: "Partners",
		desc: "Manage the trusted-by logos.",
		count: "6 partners",
		color: "#8B5CF6",
		bg: "#EDE9FE"
	},
	{
		key: "faqs",
		icon: CircleQuestionMark,
		label: "FAQs",
		desc: "Support and product FAQs.",
		count: "34 entries",
		color: "#F59E0B",
		bg: "#FFF7ED"
	},
	{
		key: "announcements",
		icon: Megaphone,
		label: "Announcements",
		desc: "Platform-wide banners and system notices.",
		count: "1 active",
		color: "#EF4444",
		bg: "#FEF2F2"
	},
	{
		key: "learning_paths",
		icon: Layers,
		label: "Learning paths",
		desc: "Configure track structure and metadata.",
		count: "4 paths",
		color: "#14B8A6",
		bg: "#F0FDFA"
	}
];
function AdminContent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-[28px] font-semibold tracking-tight",
			children: "Content management"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Manage the public marketing surface of TechBridge."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: CONTENT_SECTIONS.map((s) => {
				const Icon = s.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "card-surface card-hover flex items-center gap-4 p-5 text-left transition-all hover:shadow-md hover:border-primary/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
							style: { background: s.bg },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-5 w-5",
								style: { color: s.color }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: s.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: s.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-[11px] font-medium",
									style: { color: s.color },
									children: s.count
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground shrink-0" })
					]
				}, s.key);
			})
		})]
	});
}
//#endregion
export { AdminContent as component };

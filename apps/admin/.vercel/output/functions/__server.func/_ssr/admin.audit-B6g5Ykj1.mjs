import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.audit-B6g5Ykj1.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "space-y-6",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-[28px] font-semibold tracking-tight",
		children: "Audit log"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "card-surface overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border bg-secondary/40 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pl-6",
						children: "Timestamp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3",
						children: "Actor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3",
						children: "Action"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-6",
						children: "Target"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
				[
					"2026-07-22 14:20:41",
					"Elena Rossi",
					"APPROVED",
					"Course: Cloud Architect Certification"
				],
				[
					"2026-07-22 13:58:03",
					"System",
					"ISSUED_CERTIFICATE",
					"TBS-2026-PY-04812"
				],
				[
					"2026-07-22 13:12:11",
					"Amara Okafor",
					"PUBLISHED_COURSE",
					"Networking Essentials v2"
				],
				[
					"2026-07-22 11:44:00",
					"Elena Rossi",
					"VERIFIED_TUTOR",
					"Dr. Ethan Cole"
				],
				[
					"2026-07-22 09:03:22",
					"System",
					"USER_LOGIN",
					"ama.boateng@techbridge.io"
				]
			].map(([ts, actor, action, target]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border/60 last:border-0 hover:bg-secondary/30 font-mono text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pl-6 text-muted-foreground",
						children: ts
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3",
						children: actor
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-md bg-secondary px-2 py-0.5 font-semibold",
							children: action
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-6 text-muted-foreground",
						children: target
					})
				]
			}, ts)) })]
		})
	})]
});
//#endregion
export { SplitComponent as component };

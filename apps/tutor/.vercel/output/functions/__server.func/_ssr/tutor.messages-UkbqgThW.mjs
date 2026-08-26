import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as Send } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor.messages-UkbqgThW.js
var import_jsx_runtime = require_jsx_runtime();
var threads = [
	{
		n: "Marcus Reid",
		m: "Quick question about the assignment…",
		t: "2m",
		unread: true
	},
	{
		n: "Yuki Tanaka",
		m: "Thanks for the feedback!",
		t: "1h",
		unread: false
	},
	{
		n: "Chen Wei",
		m: "Can we schedule office hours?",
		t: "3h",
		unread: true
	},
	{
		n: "Aisha Bello",
		m: "The subnetting quiz was tough.",
		t: "1d",
		unread: false
	}
];
function Messages() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-4 -my-6 sm:-mx-6 lg:-mx-8 lg:-my-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[320px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "border-r border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[16px] font-semibold",
						children: "Messages"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: threads.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: `flex cursor-pointer items-start gap-3 border-b border-border p-4 hover:bg-secondary/50 ${i === 0 ? "bg-secondary/70" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold",
							children: t.n.split(" ").map((n) => n[0]).join("")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-semibold",
									children: t.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-muted-foreground",
									children: t.t
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs text-muted-foreground",
								children: t.m
							})]
						}),
						t.unread && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" })
					]
				}, t.n)) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col bg-background",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border bg-card px-6 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: "Marcus Reid"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Ethical Hacking · Active now"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-4 overflow-y-auto p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-w-md rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5 text-sm",
									children: "Hi Priya — I finished the recon assignment but I'm getting inconsistent Nmap results."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "max-w-md rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground",
									children: [
										"That's usually rate-limiting. Try adding ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs",
											children: "-T2"
										}),
										" and share the output."
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-w-md rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5 text-sm",
									children: "Ah that worked. Thanks!"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border bg-card p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Type a message…",
								className: "flex-1 rounded-[14px] border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), "Send"]
							})]
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { Messages as component };

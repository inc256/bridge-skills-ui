import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Ct as Award, Ot as ArrowDownRight, Tt as ArrowUpRight, U as GraduationCap, a as Users, bt as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-BCpppw50.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Platform overview · Last 30 days"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 text-[28px] font-semibold tracking-tight",
				children: "Good afternoon, Elena."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						i: GraduationCap,
						l: "Total learners",
						v: "248,304",
						d: "+4.2%",
						up: true
					},
					{
						i: Users,
						l: "Active tutors",
						v: "1,240",
						d: "+18",
						up: true
					},
					{
						i: BookOpen,
						l: "Published courses",
						v: "482",
						d: "+9",
						up: true
					},
					{
						i: Award,
						l: "Certificates issued",
						v: "38,204",
						d: "-1.1%",
						up: false
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.i, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `inline-flex items-center gap-0.5 text-xs font-semibold ${s.up ? "text-success" : "text-destructive"}`,
								children: [s.up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "h-3 w-3" }), s.d]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 text-[28px] font-semibold tracking-tight",
							children: s.v
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: s.l
						})
					]
				}, s.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.6fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[16px] font-semibold",
							children: "Platform growth"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "New enrollments over time"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 rounded-[10px] border border-border p-1 text-xs",
							children: [
								"7d",
								"30d",
								"90d",
								"1y"
							].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `rounded-md px-2.5 py-1 ${i === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`,
								children: r
							}, r))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaChart, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[16px] font-semibold",
						children: "Top categories"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-4",
						children: [
							{
								t: "Networking",
								v: 32,
								s: "78,420"
							},
							{
								t: "Software Engineering",
								v: 28,
								s: "68,140"
							},
							{
								t: "Cybersecurity",
								v: 22,
								s: "54,802"
							},
							{
								t: "Artificial Intelligence",
								v: 18,
								s: "46,942"
							}
						].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: r.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [r.s, " learners"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 overflow-hidden rounded-full bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary",
								style: { width: `${r.v * 3}%` }
							})
						})] }, r.t))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[16px] font-semibold",
						children: "Pending approvals"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-border",
						children: [
							{
								t: "Course: Advanced Kubernetes",
								by: "Sofia Marín",
								type: "Course"
							},
							{
								t: "Tutor application: Dr. Ethan Cole",
								by: "Applied 2h ago",
								type: "Tutor"
							},
							{
								t: "Course: Bug Bounty Fundamentals",
								by: "David Mensah",
								type: "Course"
							},
							{
								t: "Category: Data Engineering",
								by: "Elena Rossi",
								type: "Category"
							}
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between py-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: p.t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: p.by
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary",
									children: "Review"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90",
									children: "Approve"
								})]
							})]
						}, p.t))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[16px] font-semibold",
						children: "Recent activity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-4",
						children: [
							{
								t: "New course published · Cloud Architect Certification",
								by: "Sofia Marín · 12m ago"
							},
							{
								t: "5,204 lessons watched in the last hour",
								by: "System · 1h ago"
							},
							{
								t: "Tutor verified · Amara Okafor",
								by: "Elena Rossi · 2h ago"
							},
							{
								t: "Homepage banner updated",
								by: "CMS · Yesterday"
							},
							{
								t: "482 certificates issued today",
								by: "System · Today"
							}
						].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm",
								children: a.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: a.by
							})] })]
						}, a.t))
					})]
				})]
			})
		]
	});
}
function AreaChart() {
	const data = [
		120,
		180,
		150,
		220,
		280,
		260,
		340,
		380,
		360,
		420,
		480,
		460,
		540,
		620,
		580,
		700,
		760,
		820
	];
	const max = Math.max(...data);
	const points = data.map((v, i) => `${i / (data.length - 1) * 100},${100 - v / max * 100}`).join(" ");
	const area = `0,100 ${points} 100,100`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			preserveAspectRatio: "none",
			className: "h-64 w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "g2",
					x1: "0",
					x2: "0",
					y1: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#1F6E5C",
						stopOpacity: "0.28"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#1F6E5C",
						stopOpacity: "0"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					fill: "url(#g2)",
					points: area
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
					fill: "none",
					stroke: "#1F6E5C",
					strokeWidth: "0.6",
					points,
					vectorEffect: "non-scaling-stroke"
				})
			]
		})
	});
}
//#endregion
export { AdminDashboard as component };

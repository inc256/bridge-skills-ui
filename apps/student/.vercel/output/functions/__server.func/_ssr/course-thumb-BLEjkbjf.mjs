import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/course-thumb-BLEjkbjf.js
var import_jsx_runtime = require_jsx_runtime();
function CourseThumb({ variant, color = "#3B82F6", thumbnail, title, className }) {
	const bg = typeof color === "string" && color.trim() ? color.trim() : "#3B82F6";
	const safeThumbnail = typeof thumbnail === "string" && thumbnail.trim() ? thumbnail.trim() : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative w-full overflow-hidden ${className ?? "aspect-[16/10]"}`,
		style: { background: `linear-gradient(135deg, ${bg} 0%, ${shade(bg, -15)} 100%)` },
		children: [
			safeThumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: safeThumbnail,
				alt: title ?? "Course thumbnail",
				className: "absolute inset-0 h-full w-full object-cover"
			}) : null,
			!safeThumbnail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 400 250",
				className: "absolute inset-0 h-full w-full opacity-90",
				children: [
					variant === "network" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						stroke: "white",
						strokeOpacity: "0.35",
						fill: "none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "80",
								cy: "80",
								r: "6",
								fill: "white",
								fillOpacity: "0.9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "200",
								cy: "50",
								r: "6",
								fill: "white",
								fillOpacity: "0.9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "320",
								cy: "90",
								r: "6",
								fill: "white",
								fillOpacity: "0.9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "120",
								cy: "180",
								r: "6",
								fill: "white",
								fillOpacity: "0.9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "280",
								cy: "200",
								r: "6",
								fill: "white",
								fillOpacity: "0.9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "200",
								cy: "130",
								r: "8",
								fill: "white"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "80",
								y1: "80",
								x2: "200",
								y2: "130"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "200",
								y1: "50",
								x2: "200",
								y2: "130"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "320",
								y1: "90",
								x2: "200",
								y2: "130"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "120",
								y1: "180",
								x2: "200",
								y2: "130"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "280",
								y1: "200",
								x2: "200",
								y2: "130"
							})
						]
					}),
					variant === "security" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: "none",
						stroke: "white",
						strokeOpacity: "0.4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M200 40 L280 80 L280 150 Q280 200 200 220 Q120 200 120 150 L120 80 Z",
							fill: "white",
							fillOpacity: "0.08",
							strokeWidth: "1.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M170 130 L195 155 L240 105",
							stroke: "white",
							strokeOpacity: "0.9",
							strokeWidth: "3",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})]
					}),
					variant === "code" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: "white",
						fillOpacity: "0.9",
						fontFamily: "ui-monospace, monospace",
						fontSize: "14",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: "40",
								y: "70",
								opacity: "0.5",
								children: "const"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: "90",
								y: "70",
								children: "learn = () => {"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: "60",
								y: "105",
								children: "return"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: "130",
								y: "105",
								opacity: "0.8",
								children: "\"skills\""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: "40",
								y: "140",
								children: "}"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "40",
								y: "170",
								width: "80",
								height: "4",
								rx: "2",
								opacity: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "40",
								y: "185",
								width: "180",
								height: "4",
								rx: "2",
								opacity: "0.3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "40",
								y: "200",
								width: "130",
								height: "4",
								rx: "2",
								opacity: "0.3"
							})
						]
					}),
					variant === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: "none",
						stroke: "white",
						strokeOpacity: "0.45",
						children: [
							Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "80",
								cy: 50 + i * 40,
								r: "5",
								fill: "white",
								fillOpacity: "0.9"
							}, i)),
							Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "200",
								cy: 70 + i * 40,
								r: "5",
								fill: "white",
								fillOpacity: "0.9"
							}, i)),
							Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "320",
								cy: 90 + i * 40,
								r: "5",
								fill: "white",
								fillOpacity: "0.9"
							}, i)),
							Array.from({ length: 5 }).map((_, i) => Array.from({ length: 4 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "80",
								y1: 50 + i * 40,
								x2: "200",
								y2: 70 + j * 40,
								strokeOpacity: "0.15"
							}, `${i}-${j}`))),
							Array.from({ length: 4 }).map((_, i) => Array.from({ length: 3 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "200",
								y1: 70 + i * 40,
								x2: "320",
								y2: 90 + j * 40,
								strokeOpacity: "0.15"
							}, `b${i}-${j}`)))
						]
					}),
					variant === "cloud" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: "white",
						fillOpacity: "0.9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M100 160 Q100 130 130 125 Q140 90 180 90 Q220 90 230 125 Q270 125 270 160 Q270 190 240 190 L130 190 Q100 190 100 160 Z",
							fill: "white",
							fillOpacity: "0.85"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "150",
							y: "205",
							width: "60",
							height: "4",
							rx: "2",
							fill: "white",
							fillOpacity: "0.4"
						})]
					}),
					variant === "design" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: "white",
						fillOpacity: "0.85",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "60",
								y: "60",
								width: "80",
								height: "80",
								rx: "16"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "230",
								cy: "100",
								r: "42"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "290",
								y: "60",
								width: "80",
								height: "80",
								rx: "40",
								fillOpacity: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "60",
								y: "170",
								width: "310",
								height: "10",
								rx: "5",
								fillOpacity: "0.35"
							})
						]
					})
				]
			}),
			title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 bottom-0 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-medium uppercase tracking-widest text-white/70",
					children: "TechBridge"
				})
			})
		]
	});
}
function shade(hex, percent) {
	const raw = typeof hex === "string" ? hex.replace("#", "").trim() : "";
	const num = Number.isFinite(Number.parseInt(raw, 16)) ? parseInt(raw, 16) : 3900150;
	return `rgb(${Math.max(0, Math.min(255, (num >> 16) + percent))}, ${Math.max(0, Math.min(255, (num >> 8 & 255) + percent))}, ${Math.max(0, Math.min(255, (num & 255) + percent))})`;
}
//#endregion
export { CourseThumb as t };

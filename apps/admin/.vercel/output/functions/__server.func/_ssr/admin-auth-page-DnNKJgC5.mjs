import { r as __toESM } from "../_runtime.mjs";
import { f as login, m as register, o as getCurrentUserRole } from "./api-CQnbhjJo.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as Eye, Tt as ArrowRight, Y as EyeOff } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth-page-DnNKJgC5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Logo({ variant = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: `flex items-center gap-2 ${variant === "light" ? "text-white" : "text-foreground"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-8 w-8 place-items-center rounded-[10px] bg-primary text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 20 20",
				fill: "none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M3 6 L10 2 L17 6 L17 14 L10 18 L3 14 Z",
						stroke: "currentColor",
						strokeWidth: "1.6",
						strokeLinejoin: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M7 9 L10 11 L13 9",
						stroke: "currentColor",
						strokeWidth: "1.6",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M10 11 V15",
						stroke: "currentColor",
						strokeWidth: "1.6",
						strokeLinecap: "round"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-[15px] font-semibold tracking-tight",
			children: ["TechBridge", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground font-medium",
				children: " · Skills Hub"
			})]
		})]
	});
}
var ALLOWED_ROLES = [
	"admin",
	"super_admin",
	"staff"
];
function AdminAuthPage() {
	const router = useRouter();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [isRegistering, setIsRegistering] = (0, import_react.useState)(false);
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [password2, setPassword2] = (0, import_react.useState)("");
	async function handleSubmit(event) {
		event.preventDefault();
		if (!email.trim() || !password || isRegistering && (!firstName.trim() || !password2)) {
			setError("Please complete all required fields.");
			return;
		}
		if (isRegistering && password !== password2) {
			setError("Passwords do not match.");
			return;
		}
		setError(null);
		setLoading(true);
		try {
			if (isRegistering) await register({
				email: email.trim(),
				username: email.trim().split("@")[0],
				password,
				password2,
				first_name: firstName.trim(),
				last_name: lastName.trim(),
				role: "admin"
			});
			const session = await login(email.trim(), password);
			const role = await getCurrentUserRole(session?.access);
			if (!role) {
				console.warn("Could not determine user role after login.", session);
				setError("Unable to verify account permissions. Please try again.");
				setLoading(false);
				return;
			}
			if (!ALLOWED_ROLES.includes(role)) {
				setError("This account does not have admin access.");
				setLoading(false);
				return;
			}
			await router.navigate({ to: "/admin/dashboard" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Invalid email or password.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#F5F7F2] flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-[380px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center mb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl border border-gray-100 p-8 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[22px] font-bold text-gray-900 mb-1",
							children: isRegistering ? "Create Admin Account" : "Admin Sign In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-400 mb-6",
							children: isRegistering ? "Create an account for the admin portal." : "Enter your credentials to access the admin portal."
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "flex flex-col gap-4",
							children: [
								isRegistering && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: firstName,
										onChange: (event) => setFirstName(event.target.value),
										placeholder: "First name",
										className: "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none",
										required: true,
										autoComplete: "given-name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: lastName,
										onChange: (event) => setLastName(event.target.value),
										placeholder: "Last name",
										className: "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none",
										autoComplete: "family-name"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "admin@techbridgeskills.ug",
									className: "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15",
									required: true,
									autoComplete: "email"
								})] }),
								isRegistering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: password2,
									onChange: (event) => setPassword2(event.target.value),
									placeholder: "Confirm password",
									className: "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none",
									required: true,
									autoComplete: "new-password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: showPassword ? "text" : "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "••••••••",
										className: "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15",
										required: true,
										autoComplete: "current-password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPassword(!showPassword),
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors",
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: loading,
									className: "mt-2 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" }), isRegistering ? "Creating account…" : "Signing in…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isRegistering ? "Create account" : "Sign in", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setIsRegistering((current) => !current);
								setError(null);
							},
							className: "mt-5 w-full text-sm font-medium text-primary hover:opacity-80",
							children: isRegistering ? "Already have an account? Sign in" : "Create admin account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-xs text-gray-400 mt-5",
					children: ["TechBridge Skills Hub © ", (/* @__PURE__ */ new Date()).getFullYear()]
				})
			]
		})
	});
}
//#endregion
export { AdminAuthPage as t };

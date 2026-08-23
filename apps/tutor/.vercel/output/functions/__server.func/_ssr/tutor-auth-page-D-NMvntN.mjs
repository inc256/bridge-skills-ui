import { r as __toESM } from "../_runtime.mjs";
import { T as register, x as login } from "./api-DR-_p2Q5.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Mail, H as Eye, M as Lock, U as EyeOff, et as CircleAlert, gt as ArrowRight, lt as BriefcaseBusiness } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-auth-page-D-NMvntN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TutorAuthPage() {
	const router = useRouter();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [rememberMe, setRememberMe] = (0, import_react.useState)(false);
	const [isRegistering, setIsRegistering] = (0, import_react.useState)(false);
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [password2, setPassword2] = (0, import_react.useState)("");
	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setLoading(true);
		try {
			if (!email.trim() || !password.trim() || isRegistering && (!firstName.trim() || !password2.trim())) {
				setError(isRegistering ? "Please complete all required fields." : "Please enter both email and password.");
				setLoading(false);
				return;
			}
			if (isRegistering && password !== password2) {
				setError("Passwords do not match.");
				setLoading(false);
				return;
			}
			console.log(isRegistering ? "Attempting registration for:" : "Attempting login for:", email.trim());
			if (isRegistering) await register({
				email: email.trim(),
				username: email.trim().split("@")[0],
				password,
				password2,
				first_name: firstName.trim(),
				last_name: lastName.trim(),
				role: "instructor"
			});
			const session = await login(email.trim(), password);
			if (!session) {
				setError("Invalid credentials. Please check your email and password.");
				setLoading(false);
				return;
			}
			if (!session.access) {
				setError("Authentication failed. No access token received.");
				setLoading(false);
				return;
			}
			console.log("Login successful, navigating to tutor dashboard...");
			await router.navigate({ to: "/tutor/dashboard" });
		} catch (err) {
			const errorMessage = formatAuthError(err);
			console.error(isRegistering ? "Registration error:" : "Login error:", errorMessage);
			if (isRegistering) setError(`Account creation failed: ${errorMessage}`);
			else if (errorMessage.includes("401") || errorMessage.includes("Unauthorized")) setError("Invalid email or password. Please try again.");
			else if (errorMessage.includes("NetworkError") || errorMessage.includes("fetch")) setError("Network error. Please check your connection and try again.");
			else if (errorMessage.includes("token not valid")) setError("Authentication service error. Please try again later.");
			else setError(errorMessage);
		} finally {
			setLoading(false);
		}
	}
	function formatAuthError(error) {
		const value = error instanceof Error ? error.message : error;
		if (typeof value === "string") try {
			return formatAuthError(JSON.parse(value));
		} catch {
			return value;
		}
		if (error && typeof error === "object") return Object.entries(error).flatMap(([field, value]) => {
			return `${field}: ${Array.isArray(value) ? value.join(", ") : String(value)}`;
		}).join("; ") || "The server returned an unknown error.";
		return "Unable to create your account. Please try again.";
	}
	const togglePasswordVisibility = () => setShowPassword(!showPassword);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.05),transparent_50%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[-10rem] top-[-10rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-blue-500/5 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-10rem] right-[-10rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-blue-500/5 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl -z-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl -z-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-md px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-[32px] border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-800/50 dark:via-gray-800 dark:to-gray-800/50 p-6 shadow-lg sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[28px] border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 p-6 sm:p-8 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-center mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, { className: "h-8 w-8 text-blue-600 dark:text-blue-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-[28px] font-bold tracking-tight text-gray-900 dark:text-white text-center",
								children: isRegistering ? "Create tutor account" : "Sign in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500 dark:text-gray-400 mt-1 text-center",
								children: isRegistering ? "Create your instructor workspace" : "Instructor workspace"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-6 space-y-4",
								onSubmit: handleSubmit,
								children: [
									isRegistering && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: firstName,
											onChange: (event) => setFirstName(event.target.value),
											placeholder: "First name",
											className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none",
											required: true,
											autoComplete: "given-name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: lastName,
											onChange: (event) => setLastName(event.target.value),
											placeholder: "Last name",
											className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none",
											autoComplete: "family-name"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-sm font-medium text-gray-700 dark:text-gray-300",
										children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative mt-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											value: email,
											onChange: (event) => setEmail(event.target.value),
											placeholder: "instructor@example.com",
											className: "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all",
											required: true,
											autoComplete: "email"
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-sm font-medium text-gray-700 dark:text-gray-300",
										children: ["Password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative mt-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: showPassword ? "text" : "password",
												value: password,
												onChange: (event) => setPassword(event.target.value),
												placeholder: "Enter your password",
												className: "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 pl-10 pr-12 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all",
												required: true,
												autoComplete: "current-password"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: togglePasswordVisibility,
												className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300",
												children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
											})
										]
									})] }),
									isRegistering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: password2,
										onChange: (event) => setPassword2(event.target.value),
										placeholder: "Confirm password",
										className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none",
										required: true,
										autoComplete: "new-password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: rememberMe,
												onChange: (e) => setRememberMe(e.target.checked),
												className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
											}), "Keep me signed in"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "font-medium text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-700 dark:hover:text-blue-300",
											onClick: () => {
												setError("Password reset functionality coming soon.");
											},
											children: "Reset password"
										})]
									}),
									error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400 flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: loading,
										className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70 shadow-sm hover:shadow-md",
										children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" }), "Signing in…"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isRegistering ? "Create account" : "Enter workspace", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setIsRegistering((current) => !current);
									setError(null);
								},
								className: "mt-5 w-full text-sm font-medium text-blue-600 hover:text-blue-700",
								children: isRegistering ? "Already have an account? Sign in" : "Create tutor account"
							})
						]
					})
				})
			})
		]
	});
}
//#endregion
export { TutorAuthPage as t };

import { r as __toESM } from "../_runtime.mjs";
import { C as isAccessTokenExpired, T as logout, _ as getProfile, b as getStoredSession, r as clearStoredSession, w as login } from "./api-DKKeFvOu.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as EyeOff, M as Mail, P as Lock, V as GraduationCap, _t as ArrowRight, it as CircleAlert, q as Eye, rt as CircleCheckBig, v as Shield } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-auth-page-DaH5UVo5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isClient, setIsClient] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIsClient(true);
		const loadUser = async () => {
			const session = getStoredSession();
			if (!session?.access || isAccessTokenExpired(session.access)) {
				clearStoredSession();
				setUser(null);
				setIsLoading(false);
				return;
			}
			try {
				const profile = await getProfile();
				setUser(profile);
			} catch (error) {
				console.error("Failed to load user profile:", error);
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};
		loadUser();
	}, []);
	const login$1 = async (email, password) => {
		const session = await login(email, password);
		try {
			const profile = await getProfile();
			setUser(profile);
			return session;
		} catch (error) {
			console.error("Failed to load profile after login:", error);
			return session;
		}
	};
	const logout$1 = async () => {
		await logout();
		setUser(null);
	};
	if (!isClient) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user: null,
			setUser: () => {},
			login: async () => ({}),
			logout: async () => {},
			isLoading: false,
			isAuthenticated: false
		},
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			setUser,
			login: login$1,
			logout: logout$1,
			isLoading,
			isAuthenticated: !!user
		},
		children
	});
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (context === void 0) {
		if (typeof window === "undefined") return {
			user: null,
			setUser: () => {},
			login: async () => ({}),
			logout: async () => {},
			isLoading: false,
			isAuthenticated: false
		};
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
function StudentAuthPage() {
	const router = useRouter();
	const { login: authLogin } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [isClient, setIsClient] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIsClient(true);
	}, []);
	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setLoading(true);
		try {
			if (!email.trim() || !password.trim()) {
				setError("Please enter both email and password.");
				setLoading(false);
				return;
			}
			console.log("Attempting login for:", email.trim());
			try {
				await authLogin(email.trim(), password);
				console.log("Login successful, navigating to dashboard...");
				await router.navigate({ to: "/student/dashboard" });
			} catch (err) {
				console.error("Login error:", err);
				setError(err.message || "Invalid credentials. Please try again.");
				setLoading(false);
			}
		} catch (err) {
			console.error("Auth error:", err);
			setError(err.message || "Unable to sign in right now. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	const togglePasswordVisibility = () => setShowPassword(!showPassword);
	if (!isClient) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-gray-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.05),transparent_50%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[-10rem] top-[-10rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-blue-500/5 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-10rem] right-[-10rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-sky-400/5 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-md px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-[32px] border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 dark:from-gray-800/50 dark:via-gray-800 dark:to-gray-800/50 p-6 shadow-lg sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[28px] border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 p-6 sm:p-8 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-8 w-8 text-blue-600 dark:text-blue-400" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-[28px] font-bold tracking-tight text-gray-900 dark:text-white",
										children: "Student Sign In"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500 dark:text-gray-400 mt-1",
										children: "Welcome back to your courses"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-6 space-y-4",
								onSubmit: handleSubmit,
								children: [
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
											placeholder: "student@example.com",
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
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
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sign in", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-gray-500 dark:text-gray-400",
									children: "Don't have an account?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1",
									onClick: () => {
										setError("Registration is currently disabled. Please contact support.");
									},
									children: ["Create account", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5 text-blue-500" }), "Secure"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-px h-3 bg-gray-300 dark:bg-gray-600" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5 text-blue-500" }), "Verified"]
									})
								]
							})
						]
					})
				})
			})
		]
	});
}
//#endregion
export { StudentAuthPage as n, useAuth as r, AuthProvider as t };

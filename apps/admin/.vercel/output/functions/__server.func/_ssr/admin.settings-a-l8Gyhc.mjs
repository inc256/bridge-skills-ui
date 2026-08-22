import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-aCKu3ccm.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as Link, M as Mail, P as Lock, U as Globe, X as ExternalLink, _ as Settings, a as User, at as CircleX, et as Database, h as Shield, m as Sparkles, n as X, nt as Code, st as CircleCheckBig, tt as CreditCard, ut as ChevronRight, v as Server, vt as Bot, z as Info } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-a-l8Gyhc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Section({ title, children, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden mb-4 sm:mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex items-center gap-2",
			children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-gray-500 dark:text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-gray-900 dark:text-white",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 sm:p-6",
			children
		})]
	});
}
function ConfigRow({ label, value, note, ok, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex flex-col sm:flex-row sm:items-center justify-between py-2.5 sm:py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-gray-700 dark:text-gray-300",
				children: label
			}), note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-gray-400 dark:text-gray-500 mt-0.5",
				children: note
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mt-1 sm:mt-0",
			children: [ok !== void 0 && (ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 text-red-500 dark:text-red-400 flex-shrink-0" })), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-sm ${typeof value === "string" && value.startsWith("http") ? "font-mono text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}`,
				children: typeof value === "boolean" ? value ? "Enabled" : "Disabled" : value || "—"
			})]
		})]
	});
}
function TabButton({ id, label, icon: Icon, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-all ${active ? "bg-blue-600 text-white dark:bg-blue-500 shadow-sm" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 flex-shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: label
			}),
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 ml-auto" })
		]
	});
}
function AdminSettings() {
	const [tab, setTab] = (0, import_react.useState)("profile");
	const [config, setConfig] = (0, import_react.useState)(null);
	const [cfgBusy, setCfgBusy] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [user, setUser] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		first_name: "",
		last_name: "",
		bio: "",
		headline: "",
		phone: "",
		website: "",
		linkedin: "",
		twitter: ""
	});
	const [pw, setPw] = (0, import_react.useState)({
		old_password: "",
		new_password: "",
		confirm: ""
	});
	const [envForm, setEnvForm] = (0, import_react.useState)({});
	const [emailTest, setEmailTest] = (0, import_react.useState)({
		to: "",
		result: null,
		busy: false
	});
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 4e3);
	};
	const loadUser = async () => {
		try {
			const data = await apiRequest("/auth/me/");
			setUser(data);
			if (data) setForm({
				first_name: data.first_name || "",
				last_name: data.last_name || "",
				bio: data.bio || "",
				headline: data.headline || "",
				phone: data.phone || "",
				website: data.website || "",
				linkedin: data.linkedin || "",
				twitter: data.twitter || ""
			});
		} catch (err) {
			console.error("Failed to load user:", err);
			showToast("Failed to load user profile", false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadUser();
	}, []);
	(0, import_react.useEffect)(() => {
		if (tab !== "profile" && tab !== "security" && !config) loadConfig();
	}, [tab]);
	const loadConfig = () => {
		setCfgBusy(true);
		apiRequest("/settings/").then((r) => {
			setConfig(r);
			setEnvForm({});
		}).catch(() => showToast("Could not load platform configuration", false)).finally(() => setCfgBusy(false));
	};
	const saveProfile = async (e) => {
		e.preventDefault();
		setSaving(true);
		try {
			const data = await apiRequest("/auth/me/", {
				method: "PATCH",
				body: JSON.stringify(form)
			});
			setUser(data);
			showToast("Profile updated successfully! ✅");
		} catch {
			showToast("Failed to save profile", false);
		} finally {
			setSaving(false);
		}
	};
	const changePassword = async (e) => {
		e.preventDefault();
		if (pw.new_password !== pw.confirm) {
			showToast("Passwords do not match", false);
			return;
		}
		if (pw.new_password.length < 8) {
			showToast("Password must be at least 8 characters", false);
			return;
		}
		setSaving(true);
		try {
			await apiRequest("/auth/me/password/", {
				method: "POST",
				body: JSON.stringify({
					old_password: pw.old_password,
					new_password: pw.new_password
				})
			});
			showToast("Password changed successfully! 🔒");
			setPw({
				old_password: "",
				new_password: "",
				confirm: ""
			});
		} catch (ex) {
			showToast(ex.message || "Incorrect current password", false);
		} finally {
			setSaving(false);
		}
	};
	const saveEnvSettings = async () => {
		if (Object.keys(envForm).length === 0) {
			showToast("No changes to save", false);
			return;
		}
		setSaving(true);
		try {
			const r = await apiRequest("/settings/update/", {
				method: "PATCH",
				body: JSON.stringify(envForm)
			});
			showToast(r.message || "Settings saved successfully! ✅");
			setEnvForm({});
			loadConfig();
		} catch (ex) {
			showToast(ex.message || "Failed to save settings", false);
		} finally {
			setSaving(false);
		}
	};
	const testEmailFn = async () => {
		setEmailTest((p) => ({
			...p,
			busy: true,
			result: null
		}));
		try {
			await apiRequest("/settings/test-email/", {
				method: "POST",
				body: JSON.stringify({ to: emailTest.to || user?.email })
			});
			setEmailTest((p) => ({
				...p,
				busy: false,
				result: {
					ok: true,
					msg: "Test email sent successfully! 📧"
				}
			}));
		} catch (ex) {
			setEmailTest((p) => ({
				...p,
				busy: false,
				result: {
					ok: false,
					msg: ex.message || "Failed to send test email"
				}
			}));
		}
	};
	const handleEnvChange = (key) => (e) => {
		setEnvForm((p) => ({
			...p,
			[key]: e.target.value
		}));
	};
	const handleFormChange = (key) => (e) => {
		setForm((p) => ({
			...p,
			[key]: e.target.value
		}));
	};
	const handlePasswordChange = (key) => (e) => {
		setPw((p) => ({
			...p,
			[key]: e.target.value
		}));
	};
	const TABS = [
		{
			id: "profile",
			label: "My Profile",
			icon: User
		},
		{
			id: "security",
			label: "Security",
			icon: Lock
		},
		{
			id: "platform",
			label: "Platform Info",
			icon: Globe
		},
		{
			id: "email",
			label: "Email Config",
			icon: Mail
		},
		{
			id: "database",
			label: "Database",
			icon: Database
		},
		{
			id: "payments",
			label: "Payments",
			icon: CreditCard
		},
		{
			id: "ai",
			label: "AI Providers",
			icon: Bot
		},
		{
			id: "api",
			label: "API & CORS",
			icon: Shield
		}
	];
	if (toast) setTimeout(() => setToast(null), 4e3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto",
		children: [
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `
          fixed top-4 sm:top-6 left-4 right-4 sm:left-auto sm:right-6 z-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white text-xs sm:text-sm font-medium shadow-lg
          ${toast.ok ? "bg-green-500" : "bg-red-500"}
          animate-slide-in
        `,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: toast.msg
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setToast(null),
						className: "text-white/80 hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Settings" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: "Manage your profile, platform configuration, and integrations"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col lg:flex-row gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:w-56 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:hidden mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: tab,
							onChange: (e) => setTab(e.target.value),
							className: "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
							children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t.id,
								children: t.label
							}, t.id))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden lg:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3.5",
							children: "Settings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1",
							children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								id: t.id,
								label: t.label,
								icon: t.icon,
								active: tab === t.id,
								onClick: () => setTab(t.id)
							}, t.id))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [
						tab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 sm:space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-gray-900 dark:text-white",
								children: "My Profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
								title: "Personal Information",
								icon: User,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-sm",
										children: (user?.full_name || user?.first_name || "?")[0].toUpperCase()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base font-bold text-gray-900 dark:text-white",
										children: user?.full_name || user?.username
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-gray-500 dark:text-gray-400",
										children: [
											user?.email,
											" · ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-green-600 dark:text-green-400 font-semibold capitalize",
												children: user?.role
											})
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: saveProfile,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "First Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.first_name,
												onChange: handleFormChange("first_name"),
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Last Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.last_name,
												onChange: handleFormChange("last_name"),
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
											children: "Headline / Role"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: form.headline,
											onChange: handleFormChange("headline"),
											placeholder: "e.g. Platform Administrator",
											className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
											children: "Bio"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: form.bio,
											onChange: handleFormChange("bio"),
											rows: 3,
											placeholder: "Brief description of your role…",
											className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Phone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.phone,
												onChange: handleFormChange("phone"),
												placeholder: "+256 7XX XXX XXX",
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Website"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.website,
												onChange: handleFormChange("website"),
												placeholder: "https://…",
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "LinkedIn"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.linkedin,
												onChange: handleFormChange("linkedin"),
												placeholder: "linkedin.com/in/…",
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Twitter/X"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.twitter,
												onChange: handleFormChange("twitter"),
												placeholder: "@username",
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-end",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												disabled: saving,
												className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
												children: saving ? "Saving..." : "Save Profile"
											})
										})
									]
								})]
							})]
						}),
						tab === "security" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 sm:space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold text-gray-900 dark:text-white",
									children: "Security"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
									title: "Change Password",
									icon: Lock,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: changePassword,
										className: "space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Current Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												value: pw.old_password,
												onChange: handlePasswordChange("old_password"),
												required: true,
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "New Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												value: pw.new_password,
												onChange: handlePasswordChange("new_password"),
												required: true,
												placeholder: "Min. 8 characters",
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Confirm New Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												value: pw.confirm,
												onChange: handlePasswordChange("confirm"),
												required: true,
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-end",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													disabled: saving,
													className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
													children: saving ? "Updating..." : "Update Password"
												})
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
									title: "Account Security",
									icon: Shield,
									children: [
										[
											"Email Verified",
											user?.is_email_verified,
											user?.is_email_verified ? "Your email is verified" : "Email not verified"
										],
										[
											"Account Verified",
											user?.is_verified,
											user?.is_verified ? "Account is verified" : "Account pending verification"
										],
										[
											"Role",
											void 0,
											user?.role + " — full platform access"
										],
										[
											"Last Login",
											void 0,
											user?.updated_at ? new Date(user.updated_at).toLocaleString() : "—"
										]
									].map(([k, status, note]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
										label: k,
										value: note,
										ok: status
									}, k))
								})
							]
						}),
						tab === "platform" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 sm:space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-gray-900 dark:text-white",
								children: "Platform Information"
							}), cfgBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center py-16",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
							}) : config ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
									title: "Platform Identity",
									icon: Globe,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Platform Name",
											value: config.platform?.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Platform URL",
											value: config.platform?.url
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Currency",
											value: config.platform?.currency
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Timezone",
											value: config.platform?.time_zone
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Debug Mode",
											value: config.platform?.debug ? "ON (dev)" : "OFF (prod)",
											ok: !config.platform?.debug
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
									title: "Update Platform Settings",
									icon: Server,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-gray-500 dark:text-gray-400 mb-4",
										children: "Changes are written to the .env file. Restart the server to apply."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Platform Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: envForm.PLATFORM_NAME ?? config.platform?.name ?? "",
												onChange: handleEnvChange("PLATFORM_NAME"),
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Platform URL"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: envForm.PLATFORM_URL ?? config.platform?.url ?? "",
												onChange: handleEnvChange("PLATFORM_URL"),
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Currency"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: envForm.PLATFORM_CURRENCY ?? config.platform?.currency ?? "",
												onChange: handleEnvChange("PLATFORM_CURRENCY"),
												placeholder: "UGX",
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-end",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: saveEnvSettings,
													disabled: saving,
													className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
													children: saving ? "Saving..." : "Save to .env"
												})
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
									title: "System Info",
									icon: Info,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Django Version",
											value: config.stats?.django_version
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Python Version",
											value: config.stats?.python_version
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Total Users",
											value: config.stats?.total_users
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: ".env File",
											value: config.stats?.env_file_exists ? "Found ✓" : "Missing ✗",
											ok: config.stats?.env_file_exists
										})
									]
								})
							] }) : null]
						}),
						tab === "email" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 sm:space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-gray-900 dark:text-white",
								children: "Email Configuration"
							}), cfgBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center py-16",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
							}) : config ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
									title: "Current Email Settings",
									icon: Mail,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Backend",
											value: config.email?.backend?.split(".").pop() || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Host",
											value: config.email?.host || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Port",
											value: config.email?.port || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "TLS",
											value: config.email?.use_tls ? "Enabled" : "Disabled",
											ok: config.email?.use_tls
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "From",
											value: config.email?.from_email || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Username",
											value: config.email?.host_user || "— (not configured)",
											ok: !!config.email?.host_user
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
									title: "Update Email Settings",
									icon: Server,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Backend"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: envForm.EMAIL_BACKEND ?? config.email?.backend ?? "",
												onChange: handleEnvChange("EMAIL_BACKEND"),
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "django.core.mail.backends.console.EmailBackend",
														children: "Console (dev — prints to terminal)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "django.core.mail.backends.smtp.EmailBackend",
														children: "SMTP (production)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "django.core.mail.backends.dummy.EmailBackend",
														children: "Dummy (silent)"
													})
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
													children: "SMTP Host"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: envForm.EMAIL_HOST ?? config.email?.host ?? "",
													onChange: handleEnvChange("EMAIL_HOST"),
													placeholder: "smtp.gmail.com",
													className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
													children: "SMTP Port"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													value: envForm.EMAIL_PORT ?? String(config.email?.port ?? 587),
													onChange: handleEnvChange("EMAIL_PORT"),
													placeholder: "587",
													className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Username/Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: envForm.EMAIL_HOST_USER ?? config.email?.host_user ?? "",
												onChange: handleEnvChange("EMAIL_HOST_USER"),
												placeholder: "your@gmail.com",
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "From Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: envForm.DEFAULT_FROM_EMAIL ?? config.email?.from_email ?? "",
												onChange: handleEnvChange("DEFAULT_FROM_EMAIL"),
												placeholder: "TechBridge <noreply@…>",
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500 dark:text-gray-400",
												children: "Note: Email password must be set directly in the .env file (SMTP passwords are never shown for security)."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-end",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: saveEnvSettings,
													disabled: saving,
													className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
													children: saving ? "Saving..." : "Save Email Settings"
												})
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
									title: "Test Email",
									icon: Mail,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: emailTest.to,
											onChange: (e) => setEmailTest((p) => ({
												...p,
												to: e.target.value
											})),
											placeholder: `Send test to ${user?.email || "your email"}`,
											className: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: testEmailFn,
											disabled: emailTest.busy,
											className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${emailTest.busy ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
											children: emailTest.busy ? "Sending…" : "Send Test"
										})]
									}), emailTest.result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `mt-3 p-3 rounded-lg text-sm ${emailTest.result.ok ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"}`,
										children: emailTest.result.msg
									})]
								})
							] }) : null]
						}),
						tab === "database" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 sm:space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-gray-900 dark:text-white",
								children: "Database"
							}), cfgBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center py-16",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
							}) : config ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
									title: "Database Connection",
									icon: Database,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Engine",
											value: config.database?.engine || "—",
											ok: !!config.database?.engine
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Database",
											value: config.database?.name || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
											label: "Status",
											value: "Connected ✓",
											ok: true
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
									title: "Switch Database",
									icon: Server,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-gray-500 dark:text-gray-400 mb-4",
										children: [
											"Current: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: config.database?.engine }),
											". To switch to MySQL or PostgreSQL, update the .env file and restart."
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Database Engine"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: envForm.DB_ENGINE ?? config.database?.engine ?? "sqlite3",
												onChange: handleEnvChange("DB_ENGINE"),
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "sqlite3",
														children: "SQLite3 (local dev — no setup needed)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "mysql",
														children: "MySQL (cPanel / DigitalOcean / AWS RDS)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "postgresql",
														children: "PostgreSQL (Heroku / Supabase / Railway)"
													})
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500 dark:text-gray-400",
												children: "For MySQL/PostgreSQL, also set DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT in the .env file directly."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-end",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: saveEnvSettings,
													disabled: saving,
													className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
													children: saving ? "Saving..." : "Save DB Engine"
												})
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-300",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "💡 Migration guide:" }),
										" After switching, run ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded text-blue-800 dark:text-blue-300 font-mono text-xs",
											children: "python manage.py migrate"
										}),
										" in the backend folder."
									]
								})
							] }) : null]
						}),
						tab === "payments" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 sm:space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-gray-900 dark:text-white",
								children: "Payment Gateways"
							}), cfgBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center py-16",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
							}) : config ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								title: "Gateway Status",
								icon: CreditCard,
								children: [
									[
										"MTN Mobile Money",
										config.payments?.mtn_momo_configured,
										"Set MTN_MOMO_SUBSCRIPTION_KEY, MTN_MOMO_API_USER, MTN_MOMO_API_KEY in .env"
									],
									[
										"Airtel Money",
										config.payments?.airtel_money_configured,
										"Set AIRTEL_MONEY_CLIENT_ID, AIRTEL_MONEY_CLIENT_SECRET in .env"
									],
									[
										"Stripe (Cards)",
										config.payments?.stripe_configured,
										"Set STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY in .env"
									],
									[
										"Flutterwave (Africa)",
										config.payments?.flutterwave_configured,
										"Set FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_SECRET_KEY in .env"
									]
								].map(([name, configured, help]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-700 dark:text-gray-300",
										children: name
									}), !configured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400 dark:text-gray-500 mt-0.5",
										children: help
									})] }), configured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 mt-1 sm:mt-0",
										children: "✓ Configured"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 mt-1 sm:mt-0",
										children: "✗ Not configured"
									})]
								}, name))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 text-sm text-yellow-800 dark:text-yellow-300",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "🔑 API Keys:" }),
									" Payment keys must be set directly in the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded text-yellow-800 dark:text-yellow-300 font-mono text-xs",
										children: ".env"
									}),
									" file (never via the UI for security). Edit ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded text-yellow-800 dark:text-yellow-300 font-mono text-xs",
										children: "techbridge_backend/.env"
									}),
									" and restart the server."
								]
							})] }) : null]
						}),
						tab === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 sm:space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-gray-900 dark:text-white",
								children: "AI Providers"
							}), cfgBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center py-16",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
							}) : config ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
								title: "AI Provider Status",
								icon: Bot,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
									label: "Default Provider",
									value: config.ai?.default_provider || "—"
								}), [
									[
										"OpenAI (GPT-4)",
										config.ai?.openai_configured,
										"Set OPENAI_API_KEY in .env"
									],
									[
										"Anthropic (Claude)",
										config.ai?.anthropic_configured,
										"Set ANTHROPIC_API_KEY in .env"
									],
									[
										"Google Gemini",
										config.ai?.gemini_configured,
										"Set GEMINI_API_KEY in .env"
									]
								].map(([name, ok, help]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-700 dark:text-gray-300",
										children: name
									}), !ok && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400 dark:text-gray-500 mt-0.5",
										children: help
									})] }), ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 mt-1 sm:mt-0",
										children: "✓ Configured"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 mt-1 sm:mt-0",
										children: "✗ Not set"
									})]
								}, name))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								title: "Set Default AI Provider",
								icon: Sparkles,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row gap-3 items-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 w-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
											children: "Default Provider"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: envForm.AI_DEFAULT_PROVIDER ?? config.ai?.default_provider ?? "openai",
											onChange: handleEnvChange("AI_DEFAULT_PROVIDER"),
											className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
											children: [
												"openai",
												"anthropic",
												"gemini",
												"mistral",
												"groq",
												"openrouter"
											].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: p,
												children: p.charAt(0).toUpperCase() + p.slice(1)
											}, p))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: saveEnvSettings,
										disabled: saving,
										className: `w-full sm:w-auto px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
										children: saving ? "Saving..." : "Save"
									})]
								})
							})] }) : null]
						}),
						tab === "api" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 sm:space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-gray-900 dark:text-white",
								children: "API & CORS"
							}), cfgBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center py-16",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
							}) : config ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
									title: "CORS Configuration",
									icon: Shield,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
										label: "Allow All Origins",
										value: config.cors?.allow_all_origins ? "Yes (development)" : "No (restricted)",
										ok: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigRow, {
										label: "Frontend URL",
										value: config.cors?.frontend_url || "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
									title: "Update CORS Settings",
									icon: Link,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
												children: "Frontend URL (React portal)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: envForm.FRONTEND_URL ?? config.cors?.frontend_url ?? "",
												onChange: handleEnvChange("FRONTEND_URL"),
												placeholder: "http://localhost:3000",
												className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-500 dark:text-gray-400",
												children: "CORS_ALLOW_ALL_ORIGINS=True is recommended for development. For production, set it to False and list specific origins."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-end",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: saveEnvSettings,
													disabled: saving,
													className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
													children: saving ? "Saving..." : "Save CORS Settings"
												})
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
									title: "API Quick Links",
									icon: Code,
									children: [
										["Swagger UI (all endpoints)", "https://techbridge-backend-rust.vercel.app/api/docs/"],
										["ReDoc documentation", "https://techbridge-backend-rust.vercel.app/api/redoc/"],
										["Health check", "https://techbridge-backend-rust.vercel.app/api/health/"],
										["Django Admin (full DB)", "https://techbridge-backend-rust.vercel.app/admin/"],
										["API v1 root", "https://techbridge-backend-rust.vercel.app/api/v1/"]
									].map(([label, url]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-gray-700 dark:text-gray-300",
											children: label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: url,
											target: "_blank",
											rel: "noreferrer",
											className: "flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 sm:mt-0",
											children: [
												url.toString().replace("https://techbridge-backend-rust.vercel.app", ""),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
											]
										})]
									}, label))
								})
							] }) : null]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
        .border-3 {
          border-width: 3px;
        }
      ` })
		]
	});
}
//#endregion
export { AdminSettings as component };

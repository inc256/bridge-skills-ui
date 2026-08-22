import { r as __toESM } from "../_runtime.mjs";
import { t as apiRequest } from "./api-CG9AIe4t.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Q as Download, S as Plus, St as Award, b as RotateCcw, ct as CircleAlert, d as Trash2, h as Shield, ht as Calendar, n as X, st as CircleCheckBig, xt as Ban, y as Search, yt as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.certificates-2L3K_nPX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getCertificatesAdmin(params = {}) {
	const query = new URLSearchParams();
	if (params.search) query.append("search", params.search);
	if (params.valid) query.append("valid", params.valid);
	if (params.page_size) query.append("page_size", String(params.page_size));
	return apiRequest(`/certificates/admin/${query.toString() ? `?${query.toString()}` : ""}`);
}
async function getCertificateStats() {
	return apiRequest("/certificates/admin/stats/");
}
async function verifyCertificate(number) {
	return apiRequest(`/certificates/verify/${number}/`);
}
async function issueCertificate(data) {
	return apiRequest("/certificates/admin/issue/", {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function revokeCertificate(id, data) {
	return apiRequest(`/certificates/admin/${id}/revoke/`, {
		method: "POST",
		body: JSON.stringify(data)
	});
}
async function restoreCertificate(id) {
	return apiRequest(`/certificates/admin/${id}/restore/`, { method: "POST" });
}
async function deleteCertificate(id) {
	return apiRequest(`/certificates/admin/${id}/delete/`, { method: "DELETE" });
}
async function getUsers(params = {}) {
	const query = new URLSearchParams();
	if (params.page_size) query.append("page_size", String(params.page_size));
	return (await apiRequest(`/users/${query.toString() ? `?${query.toString()}` : ""}`))?.results || [];
}
async function getCourses(params = {}) {
	const query = new URLSearchParams();
	if (params.page_size) query.append("page_size", String(params.page_size));
	return (await apiRequest(`/courses/${query.toString() ? `?${query.toString()}` : ""}`))?.results || [];
}
function getDisplayName(user) {
	if (!user) return "Unknown Student";
	const name = user.full_name || user.name || user.username || user.email || "";
	if (name && name.trim()) return name.trim();
	if (user.first_name || user.last_name) {
		const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
		if (fullName) return fullName;
	}
	return "Unknown Student";
}
function getUserEmail(user) {
	if (!user) return "—";
	return user.email || "—";
}
function Modal({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 mt-auto sm:mt-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10 rounded-t-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 sm:p-6",
				children
			})]
		})
	});
}
function StatCard({ icon: Icon, value, label, color = "blue", iconColor = "blue", subtext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 sm:gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2 sm:p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 sm:h-5 sm:w-5 text-${iconColor}-600 dark:text-${iconColor}-400` })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg sm:text-2xl font-bold text-gray-900 dark:text-white",
						children: value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
						children: label
					}),
					subtext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500",
						children: subtext
					})
				]
			})]
		})
	});
}
function CertificateRow({ certificate, onDownload, onRevoke, onRestore, onDelete }) {
	const formatDate = (date) => {
		if (!date) return "—";
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400",
					children: certificate.number
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shadow-sm shrink-0",
						children: certificate.user_name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium text-gray-900 dark:text-white truncate",
						children: certificate.user_name
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden md:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-gray-600 dark:text-gray-300 truncate max-w-[180px]",
						children: certificate.course_title
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden lg:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500" }), formatDate(certificate.issued_at)]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium ${certificate.is_valid ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${certificate.is_valid ? "bg-green-500" : "bg-red-500"}` }), certificate.is_valid ? "Valid" : "Revoked"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4 hidden xl:table-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5 text-gray-400 dark:text-gray-500" }),
						certificate.verify_count || 0,
						" verifications"
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 px-3 sm:py-4 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-0.5 sm:gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onDownload(certificate),
							title: "Download/Print",
							className: "p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
						}),
						certificate.is_valid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onRevoke(certificate),
							title: "Revoke",
							className: "p-1.5 sm:p-2 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onRestore(certificate),
							title: "Restore",
							className: "p-1.5 sm:p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-gray-400 hover:text-green-600 dark:hover:text-green-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onDelete(certificate),
							title: "Delete permanently",
							className: "p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
						})
					]
				})
			})
		]
	});
}
function AdminCertificates() {
	const [certificates, setCertificates] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [stats, setStats] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [modal, setModal] = (0, import_react.useState)(null);
	const [verNum, setVerNum] = (0, import_react.useState)("");
	const [verBusy, setVerBusy] = (0, import_react.useState)(false);
	const [verRes, setVerRes] = (0, import_react.useState)(null);
	const [users, setUsers] = (0, import_react.useState)([]);
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [issueForm, setIssueForm] = (0, import_react.useState)({
		user_id: "",
		course_id: "",
		number: ""
	});
	const [issueBusy, setIssueBusy] = (0, import_react.useState)(false);
	const [revokeTarget, setRevokeTarget] = (0, import_react.useState)(null);
	const [revokeReason, setRevokeReason] = (0, import_react.useState)("");
	const [loadingUsersCourses, setLoadingUsersCourses] = (0, import_react.useState)(true);
	const showToast = (msg, ok = true) => {
		setToast({
			msg,
			ok
		});
		setTimeout(() => setToast(null), 3500);
	};
	const loadCertificates = (0, import_react.useCallback)(async () => {
		setBusy(true);
		try {
			const params = {
				search: search || void 0,
				valid: filter === "valid" ? "1" : filter === "revoked" ? "0" : void 0,
				page_size: 100
			};
			const [certsData, statsData] = await Promise.all([getCertificatesAdmin(params), getCertificateStats()]);
			setCertificates(certsData?.results || []);
			setTotal(certsData?.count || 0);
			setStats(statsData);
		} catch (err) {
			console.error("Load error:", err);
			showToast(err.message || "Failed to load certificates", false);
		} finally {
			setBusy(false);
		}
	}, [search, filter]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(loadCertificates, 400);
		return () => clearTimeout(t);
	}, [loadCertificates]);
	(0, import_react.useEffect)(() => {
		setLoadingUsersCourses(true);
		Promise.all([getUsers({ page_size: 100 }), getCourses({ page_size: 50 })]).then(([usersData, coursesData]) => {
			setUsers(usersData || []);
			setCourses(coursesData || []);
		}).catch((err) => {
			console.error("Error loading users/courses:", err);
		}).finally(() => {
			setLoadingUsersCourses(false);
		});
	}, []);
	const verifyCertificateHandler = async () => {
		if (!verNum.trim()) return;
		setVerBusy(true);
		setVerRes(null);
		try {
			const data = await verifyCertificate(verNum.trim());
			setVerRes({
				ok: true,
				data
			});
		} catch (err) {
			setVerRes({
				ok: false,
				msg: err.message || "Certificate not found."
			});
		} finally {
			setVerBusy(false);
		}
	};
	const issueCertificateHandler = async () => {
		if (!issueForm.user_id || !issueForm.course_id) {
			showToast("Please select both a student and a course", false);
			return;
		}
		setIssueBusy(true);
		try {
			const data = await issueCertificate(issueForm);
			showToast(data?.created ? "Certificate issued successfully! 🎉" : "Certificate already exists");
			setModal(null);
			setIssueForm({
				user_id: "",
				course_id: "",
				number: ""
			});
			loadCertificates();
		} catch (err) {
			showToast(err.message || "Failed to issue certificate", false);
		} finally {
			setIssueBusy(false);
		}
	};
	const revokeCertificateHandler = async () => {
		if (!revokeTarget) return;
		try {
			await revokeCertificate(revokeTarget.id, { reason: revokeReason });
			showToast(`Certificate ${revokeTarget.number} revoked`);
			setModal(null);
			setRevokeTarget(null);
			setRevokeReason("");
			loadCertificates();
		} catch (err) {
			showToast(err.message || "Failed to revoke certificate", false);
		}
	};
	const restoreCertificateHandler = async (cert) => {
		try {
			await restoreCertificate(cert.id);
			showToast(`Certificate ${cert.number} restored successfully!`);
			loadCertificates();
		} catch (err) {
			showToast(err.message || "Failed to restore certificate", false);
		}
	};
	const deleteCertificateHandler = async (cert) => {
		if (!window.confirm(`Permanently delete certificate ${cert.number}? This action cannot be undone.`)) return;
		try {
			await deleteCertificate(cert.id);
			showToast("Certificate deleted successfully");
			loadCertificates();
		} catch (err) {
			showToast(err.message || "Failed to delete certificate", false);
		}
	};
	const downloadPdf = (cert) => {
		const win = window.open("", "_blank");
		if (!win) return;
		win.document.write(`<!DOCTYPE html><html><head><title>Certificate ${cert.number}</title>
      <style>
        body{font-family:Georgia,serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f5f5f0}
        .c{border:3px solid #2D5A3F;padding:60px;max-width:750px;text-align:center;background:#fff}
        .seal{font-size:60px;margin-bottom:20px}.name{font-size:38px;font-weight:700;margin:10px 0}
        .course{font-size:22px;font-weight:700;color:#2D5A3F;margin:10px 0}
        .footer{font-size:12px;color:#6B7280;margin-top:30px;border-top:1px solid #e5e7eb;padding-top:20px}
        @media print{.c{border:2px solid #2D5A3F;padding:40px}}
      </style>
    </head>
    <body>
      <div class="c">
        <div class="seal">🎓</div>
        <p style="font-size:11px;color:#9CA3AF;letter-spacing:.15em;text-transform:uppercase;margin-bottom:20px">Certificate of Completion</p>
        <p style="color:#6B7280;margin:0">This certifies that</p>
        <p class="name">${cert.user_name}</p>
        <p style="color:#6B7280;margin:0">has successfully completed</p>
        <p class="course">${cert.course_title}</p>
        <div class="footer">
          <p>Issued ${cert.issued_at ? new Date(cert.issued_at).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric"
		}) : "—"}</p>
          <p>Certificate ID: <strong>${cert.number}</strong></p>
          <p>TechBridge Skills Hub · Kampala, Uganda</p>
          ${cert.is_valid ? "" : "<p style=\"color:#DC2626;font-weight:bold\">⚠️ REVOKED</p>"}
        </div>
      </div>
      <script>window.print()<\/script>
    </body></html>`);
		win.document.close();
	};
	const students = users.filter((u) => u.role === "student");
	if (busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center items-center min-h-[400px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-0",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Certificates" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full",
							children: [total, " total"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1",
					children: "Issue, verify, and manage course completion certificates"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 sm:gap-3 flex-wrap w-full xs:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setModal("verify"),
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 xs:flex-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden xs:inline",
							children: "Verify"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setModal("issue"),
						className: "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow-md flex-1 xs:flex-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Issue Certificate" })]
					})]
				})]
			}),
			stats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2 sm:gap-3 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Award,
						value: stats.total || 0,
						label: "Total Issued",
						color: "blue",
						iconColor: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleCheckBig,
						value: stats.valid || 0,
						label: "Valid",
						color: "green",
						iconColor: "green",
						subtext: "Active certificates"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleAlert,
						value: stats.revoked || 0,
						label: "Revoked",
						color: "red",
						iconColor: "red",
						subtext: "Revoked certificates"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-3 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search by certificate #, student name, or course...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
							}),
							search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSearch(""),
								className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5 sm:gap-2 flex-wrap w-full sm:w-auto",
						children: [
							"all",
							"valid",
							"revoked"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilter(f),
							className: `px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors flex-1 sm:flex-none ${filter === f ? "bg-blue-600 text-white dark:bg-blue-500 shadow-sm" : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
							children: f.charAt(0).toUpperCase() + f.slice(1)
						}, f))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Certificate #"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Student"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell",
									children: "Course"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell",
									children: "Issued"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell",
									children: "Verifications"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-3 px-3 sm:py-4 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: certificates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "py-8 sm:py-12 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-8 w-8 text-gray-400 dark:text-gray-500" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-gray-600 dark:text-gray-400",
										children: "No certificates found"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
										children: "Click \"Issue Certificate\" to create one"
									})
								]
							})
						}) }) : certificates.map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificateRow, {
							certificate: cert,
							onDownload: downloadPdf,
							onRevoke: (c) => {
								setRevokeTarget(c);
								setRevokeReason("");
								setModal("revoke");
							},
							onRestore: restoreCertificateHandler,
							onDelete: deleteCertificateHandler
						}, cert.id)) })]
					})
				}), certificates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400",
						children: [
							"Showing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-gray-700 dark:text-gray-300",
								children: certificates.length
							}),
							" of",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-gray-700 dark:text-gray-300",
								children: total
							}),
							" certificates"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-green-500" }), "Valid"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500" }), "Revoked"]
						})]
					})]
				})]
			}),
			modal === "verify" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Verify Certificate",
				onClose: () => {
					setModal(null);
					setVerRes(null);
					setVerNum("");
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500 dark:text-gray-400",
							children: "Enter a certificate number to check its validity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: verNum,
								onChange: (e) => {
									setVerNum(e.target.value);
									setVerRes(null);
								},
								onKeyDown: (e) => e.key === "Enter" && verifyCertificateHandler(),
								placeholder: "e.g. TBS-2026-NET-12480",
								className: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: verifyCertificateHandler,
								disabled: verBusy || !verNum.trim(),
								className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${verBusy || !verNum.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
								children: verBusy ? "Checking..." : "Verify"
							})]
						}),
						verRes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `p-4 rounded-xl text-sm ${verRes.ok ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"}`,
							children: verRes.ok ? `✅ Valid — "${verRes.data.certificate?.course_title}" awarded to ${verRes.data.certificate?.user_name} · Verified ${verRes.data.certificate?.verify_count} time(s)` : `❌ ${verRes.msg}`
						})
					]
				})
			}),
			modal === "issue" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Issue Certificate",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500 dark:text-gray-400",
							children: "Manually issue a completion certificate to any student"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: ["Student ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							loadingUsersCourses ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-center py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-5 w-5 border-2 border-gray-200 dark:border-gray-700 border-t-blue-600" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: issueForm.user_id,
								onChange: (e) => setIssueForm((p) => ({
									...p,
									user_id: e.target.value
								})),
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— Select student —"
								}), students.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: u.id,
									children: [
										getDisplayName(u),
										" (",
										getUserEmail(u),
										")"
									]
								}, u.id))]
							}),
							!loadingUsersCourses && students.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-yellow-600 dark:text-yellow-400 mt-1.5 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), "No students available. Create a student account first."]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
								children: ["Course ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							loadingUsersCourses ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-center py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-5 w-5 border-2 border-gray-200 dark:border-gray-700 border-t-blue-600" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: issueForm.course_id,
								onChange: (e) => setIssueForm((p) => ({
									...p,
									course_id: e.target.value
								})),
								className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— Select course —"
								}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.title
								}, c.id))]
							}),
							!loadingUsersCourses && courses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-yellow-600 dark:text-yellow-400 mt-1.5 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), "No courses available. Create a course first."]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Custom Certificate Number (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: issueForm.number,
							onChange: (e) => setIssueForm((p) => ({
								...p,
								number: e.target.value
							})),
							placeholder: "Auto-generated if blank",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: issueCertificateHandler,
								disabled: issueBusy || loadingUsersCourses || students.length === 0 || courses.length === 0,
								className: `px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${issueBusy || loadingUsersCourses || students.length === 0 || courses.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md"}`,
								children: issueBusy ? "Issuing..." : "Issue Certificate"
							})]
						})
					]
				})
			}),
			modal === "revoke" && revokeTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Revoke Certificate",
				onClose: () => setModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-yellow-800 dark:text-yellow-400",
										children: "⚠️ You are about to revoke:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-yellow-700 dark:text-yellow-300 mt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: revokeTarget.number }),
											" — ",
											revokeTarget.course_title
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-yellow-700 dark:text-yellow-300",
										children: ["Issued to: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: revokeTarget.user_name })]
									})
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
							children: "Reason for Revocation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: revokeReason,
							onChange: (e) => setRevokeReason(e.target.value),
							rows: 3,
							placeholder: "e.g. Academic dishonesty, incomplete requirements...",
							className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setModal(null),
								className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: revokeCertificateHandler,
								className: "px-5 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors shadow-sm hover:shadow-md",
								children: "Revoke Certificate"
							})]
						})
					]
				})
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
export { AdminCertificates as component };

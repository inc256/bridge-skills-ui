import { r as __toESM } from "../_runtime.mjs";
import { S as logout, _ as getStoredSession, b as isAccessTokenExpired, g as getProfile, t as clearStoredSession, x as login } from "./api-D9XJEAL8.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CzSgaZ2L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
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
		} catch (error) {
			console.error("Failed to load profile after login:", error);
		}
		return session;
	};
	const logout$1 = async () => {
		await logout();
		setUser(null);
		window.location.href = "/tutor";
	};
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
	if (context === void 0) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
//#endregion
export { useAuth as n, AuthProvider as t };

import { c as getCourseModules, s as getCourse } from "./api-BK_0zLtj.mjs";
import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.study._slug-KASv4aU4.js
var $$splitComponentImporter = () => import("./student.study._slug-Dm-DNG02.mjs");
var Route = createFileRoute("/student/study/$slug")({
	loader: async ({ params }) => {
		const [course, modules] = await Promise.all([getCourse(params.slug), getCourseModules(params.slug)]);
		if (!course) throw notFound();
		return {
			course,
			modules
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

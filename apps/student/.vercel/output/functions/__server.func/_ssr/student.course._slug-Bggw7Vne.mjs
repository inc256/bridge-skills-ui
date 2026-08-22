import { s as getCourse } from "./api-BK_0zLtj.mjs";
import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.course._slug-Bggw7Vne.js
var $$splitNotFoundComponentImporter = () => import("./student.course._slug-CnMRHIjs.mjs");
var $$splitComponentImporter = () => import("./student.course._slug-DZR7sio2.mjs");
var Route = createFileRoute("/student/course/$slug")({
	loader: async ({ params }) => {
		const course = await getCourse(params.slug);
		if (!course) throw notFound();
		return { course };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };

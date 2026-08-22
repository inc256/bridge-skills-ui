import { s as getCourse } from "./api-DKKeFvOu.mjs";
import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.course._slug-CJggBQf4.js
var $$splitNotFoundComponentImporter = () => import("./student.course._slug-CnMRHIjs.mjs");
var $$splitComponentImporter = () => import("./student.course._slug-qDaSk7UZ.mjs");
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

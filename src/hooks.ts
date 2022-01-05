import cookie from "cookie";
import { v4 as uuid } from "@lukeed/uuid";
import type { Handle } from "@sveltejs/kit";
import { minify } from "html-minifier-terser";
import { prerendering } from "$app/env";

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || "");
	request.locals.userid = cookies.userid || uuid();

	// TODO https://github.com/sveltejs/kit/issues/1046
	const method = request.url.searchParams.get("_method");
	if (method) {
		request.method = method.toUpperCase();
	}

	const response = await resolve(request);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers["set-cookie"] = cookie.serialize("userid", request.locals.userid, {
			path: "/",
			httpOnly: true,
		});
	}

	// even worth it?
	if (prerendering && response.headers["content-type"] === "text/html") {
		response.body = await minify(response.body as string, {
			collapseBooleanAttributes: true,
			collapseWhitespace: true,
			decodeEntities: true,
			html5: true,
			ignoreCustomComments: [], // [/^#/],
			minifyCSS: true,
			minifyJS: true,
			removeAttributeQuotes: true,
			removeComments: true,
			removeOptionalTags: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			sortAttributes: true,
			sortClassName: true,
		});
	}

	return response;
};

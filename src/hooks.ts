import cookie from "cookie";
import { v4 as uuid } from "@lukeed/uuid";
import type { Handle } from "@sveltejs/kit";
import { minify } from "html-minifier-terser";
import { prerendering } from "$app/env";

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// even worth it?
	if (prerendering && response.headers.get("content-type")?.startsWith("text/html")) {
		const body = await response.text();

		const minified = await minify(body as string, {
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

		return new Response(minified, response);
	}

	return response;
};

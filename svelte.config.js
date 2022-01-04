import path from "path";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

const dev = process.env.NODE_ENV === "development";

const post_ids = [];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				outputStyle: "compressed",
			},
		}),
	],

	kit: {
		/** @type {import('vite').UserConfig} */
		vite: {
			resolve: {
				alias: {
					src: path.resolve("./src"),
				},
			},
			server: {
				fs: {
					deny: ["README.md"],
				},
			},
		},
		adapter: adapter({
			// pages: "build",
			// assets: "build",
			// fallback: null,
		}),
		prerender: {
			entries: post_ids.map((id) => `/blog/${id}`),
		},
		paths: {
			base: dev ? "" : "/homepage",
		},
	},
};

export default config;

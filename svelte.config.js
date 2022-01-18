import path from "path";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

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
			// server: {
			// 	fs: {
			// 		deny: ["README.md"],
			// 	},
			// },
		},

		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "404.html",
			precompress: false,
		}),

		// this is the problem causing html files not to be generated
		// need to include "*"
		prerender: {
			entries: ["*", ...post_ids.map((id) => `/blog/${id}`)],
			crawl: true,
		},
	},
};

export default config;

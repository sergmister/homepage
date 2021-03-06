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
			// fallback: "404.html", // something going on with how the page is being fetched
			precompress: false,
		}),

		// this is the problem causing html files not to be generated
		// need to include "*"
		prerender: {
			entries: ["*", ...post_ids.map((id) => `/blog/${id}`)],
			crawl: true,
			default: true,
			enabled: true,
		},
	},
};

export default config;

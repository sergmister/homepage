// implement https://github.com/sveltejs/kit/issues/1922 ??

import { createRequire } from "module";
const require = createRequire(import.meta.url);

import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";
import katex from "katex";
import type { RequestHandler } from "@sveltejs/kit";

import { posts } from "src/list";
import type { PostData } from "src/global";

const md = new MarkdownIt({ html: true });

md.use(require("markdown-it-highlightjs"));

md.use(require("markdown-it-task-lists"));

md.use(require("markdown-it-texmath"), {
	engine: katex,
	delimiters: "dollars",
	// katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
});

export const get: RequestHandler = async (request) => {
	const { slug } = request.params;

	if (!slug || typeof slug !== "string") {
		return {
			status: 400,
			error: "invalid post",
		};
	}

	let post = posts.find((p) => p.id === slug);

	if (post === undefined) {
		return {
			status: 404,
			error: "post not found",
		};
	}

	let data: string;

	try {
		// is './' okay?
		data = await fs.promises.readFile(path.join("./blog", `${slug}.md`), "utf-8");
	} catch {
		return {
			status: 404,
			error: "post md file not found",
		};
	}

	const html = md.render(data);

	return {
		status: 200,
		body: {
			html,
			...post,
		} as PostData,
	};
};

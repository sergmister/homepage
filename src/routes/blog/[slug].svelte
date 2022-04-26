<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import type { PostData } from "src/global";

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		const response = await fetch(`/api/blog/${params.slug}`);
		if (!response.ok) {
			return { error: response.statusText };
		}
		const props = (await response.json()) as PostData;
		return { props };
	};
</script>

<script lang="ts">
	import type { Tag } from "src/list";

	export let html: string;
	export let id: string;
	export let title: string;
	export let date: string;
	export let author: string;
	export let tags: Tag[];

	let dateObject = new Date(date);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<!-- TODO: make math and images scroll, not expand width of the whole page -->

<div class="container">
	<div class="title">
		<h1>{title}</h1>
		<p>{author} • {dateObject.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</p>
	</div>
	<div class="markdown-container">
		{@html html}
	</div>
</div>

<style lang="scss">
	.container {
	}

	.title {
		margin: 0.4em;

		h1 {
			text-align: center;
			margin-bottom: 0.4em;
		}

		p {
			text-align: center;
			font-style: italic;
			opacity: 0.8;
			margin-top: 0.2em;
		}
	}

	.markdown-container {
		overflow-wrap: break-word;
		text-rendering: optimizeLegibility;

		:global(.center_image) {
			display: block;
			width: min(100%, 600px);
			margin-left: auto;
			margin-right: auto;
			border-radius: 5%;
		}
	}
</style>

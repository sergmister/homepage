<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		const response = await fetch(`/api/blog/${params.slug}`);
		if (!response.ok) {
			return;
		}
		const props = await response.json();
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
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="container">
	<div class="title">
		<h1>{title}</h1>
	</div>
	<div class="markdown-container">
		{@html html}
	</div>
</div>

<style lang="scss">
	.container {
	}

	.title {
		h1 {
			text-align: center;
		}
	}

	.markdown-container {
		overflow-wrap: break-word;
		text-rendering: optimizeLegibility;
	}
</style>

<script lang="ts" context="module">
	import type { ErrorLoadInput } from "@sveltejs/kit";

	export function load({ error, status }: ErrorLoadInput) {
		return {
			props: { error, status },
		};
	}
</script>

<script lang="ts">
	export let error: Error | undefined;
	export let status: number | undefined;
</script>

<h1>{status}</h1>
<pre>{error?.message}</pre>

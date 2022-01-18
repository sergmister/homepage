<script lang="ts">
	import { page } from "$app/stores";
	import "src/app.scss";
	import Navbar from "$lib/Navbar.svelte";
</script>

{#if $page.url.pathname === "/"}
	<style lang="scss">
		html,
		body {
			height: 100%;
		}
	</style>

	<div class="landing-container">
		<span />
		<slot />
		<Navbar />
		<span />
	</div>
{:else}
	<header>
		<Navbar />
	</header>

	<main>
		<slot />
	</main>
{/if}

<style lang="scss">
	.landing-container {
		display: flex;
		min-height: 100%;
		padding: 24px 12px;
		flex-direction: column;
		align-items: center;
		// justify-content: center;

		span {
			display: block;
			flex: 1 1;
		}
	}

	header {
		display: block;
		position: static;
		margin-top: 16px;

		@media screen and (min-width: 1400px) {
			position: sticky;
			top: 28px;
			left: 20px;
			float: left;
			margin: 0;
			width: 192px;
		}
	}

	main {
		max-width: 920px;
		margin: 28px auto;
		padding: 0 12px;
	}
</style>
